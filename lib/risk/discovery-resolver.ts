import {
    Procedure,
    PlanDeductibleRule,
    RiskAudit,
    ProcedureContext,
    DiscoveryPlan // Now available in types/schemes/discovery
} from '@/types/schemes/discovery';
import { DiscoveryRiskEngine } from '@/utils/risk/engines/discovery';
import {
    CLASSIC_SMART_2026,
    ESSENTIAL_SMART_2026,
    ESSENTIAL_DYNAMIC_SMART_2026
} from '@/data/discovery/smart-series-plans';

// Import centralized procedure data
import { ALL_PROCEDURES } from '@/data/discovery/procedures';

// ============================================================================
// 1. DATA: PROCEDURE REPOSITORY (Now uses centralized data)
// ============================================================================

/**
 * All procedures are now imported from data/discovery/procedures/
 * This enables scaling to 20+ procedures across categories:
 * - Scopes (3): Gastroscopy, Colonoscopy, Bi-Directional Scopes
 * - Dental (2): Dental Surgery, Wisdom Teeth Extraction
 * - Ophthalmology (3): Cataract, Vitrectomy, Laser Eye Surgery
 * - ENT (4): Tonsillectomy, Adenoidectomy, Grommets, Septoplasty
 * - Major Joints (4): Hip, Knee, Shoulder Replacement, ACL
 */
const PROCEDURES: Procedure[] = ALL_PROCEDURES;

// ============================================================================
// 2. SINGLE SOURCE OF TRUTH: DISCOVERY_PLAN_MAP
// ============================================================================

const DISCOVERY_PLAN_MAP: Record<string, DiscoveryPlan> = {
    'discovery-smart-classic-2026': CLASSIC_SMART_2026,
    'discovery-smart-essential-2026': ESSENTIAL_SMART_2026,
    'discovery-smart-essential-dynamic-2026': ESSENTIAL_DYNAMIC_SMART_2026
};

// ============================================================================
// 3. MAPPER: DiscoveryPlan → PlanDeductibleRule
// ============================================================================

/**
 * Maps a DiscoveryPlan to a PlanDeductibleRule for UI consumption.
 * This ensures we have a single source of truth (smart-series-plans.ts).
 */
function mapToPlanDeductibleRule(plan: DiscoveryPlan): PlanDeductibleRule {
    // Find the first scope benefit to extract deductible values
    const scopeBenefit = plan.scopesBenefit?.[0];

    return {
        plan_id: plan.planId,
        plan_name: plan.planName,
        plan_series: plan.series.toLowerCase() as 'smart' | 'core' | 'saver' | 'priority' | 'comprehensive' | 'coastal',
        network_type: plan.hospitalNetwork.includes('Smart') ? 'smart' : 'any',
        available_procedure_ids: PROCEDURES.map(p => p.id), // All procedures available by default
        deductibles: {
            default: plan.hospitalBenefit.outOfNetworkUpfrontPayment || 0,
            penalty_non_network: plan.hospitalBenefit.outOfNetworkUpfrontPayment || 0,
            scopes_location_benefits: {
                day_clinic: scopeBenefit?.daySurgeryNetworkDayClinicCopayment || 0,
                hospital_network: scopeBenefit?.hospitalAccountCopayment || 0,
                hospital_non_network: scopeBenefit?.outOfNetworkUpfrontPayment || plan.hospitalBenefit.outOfNetworkUpfrontPayment || 0
            }
        }
    };
}

// ============================================================================
// 4. EXPORTS: REPOSITORIES
// ============================================================================

export const ProcedureRepository = {
    getById: (slug: string) => PROCEDURES.find(p => p.id === slug),
    getAll: () => PROCEDURES,
    getByCategory: (category: string) => PROCEDURES.filter(p => p.category === category)
};

export const PlanRuleRepository = {
    getRuleForPlan: (planId: string) => {
        const plan = DISCOVERY_PLAN_MAP[planId];
        return plan ? mapToPlanDeductibleRule(plan) : undefined;
    },
    getAllRules: () => Object.values(DISCOVERY_PLAN_MAP).map(mapToPlanDeductibleRule)
};

// ============================================================================
// 5. RISK RESOLVER (Orchestrator)
// ============================================================================

export class RiskResolver {

    /**
     * Main Resolver Method
     */
    static resolve(planSlug: string, procedureSlug: string): RiskAudit {

        // 1. Get the Generic Procedure
        const procedure = ProcedureRepository.getById(procedureSlug);
        const planMeta = PlanRuleRepository.getRuleForPlan(planSlug);

        if (!procedure || !planMeta) {
            throw new Error(`Could not resolve plan '${planSlug}' or procedure '${procedureSlug}'`);
        }

        // 2. Identify and Fetch Specific Engine Plan
        // Since we are "Discovery" focused, we check our map
        const specificPlan = DISCOVERY_PLAN_MAP[planSlug];

        if (!specificPlan) {
            throw new Error(`Engine configuration missing for plan: ${planSlug}`);
        }

        // 3. Verify the procedure has benefit data or is in a supported category
        // Procedures can be resolved if they have explicit benefit data OR are in a category
        // that uses hospital/day surgery benefits (fallback behavior)
        const hasScopeBenefit = procedure.category === 'scope' && specificPlan.scopesBenefit?.some(
            s => s.procedureName.toLowerCase() === procedure.label.toLowerCase()
        );

        // Check for dental surgery benefit
        const hasDentalBenefit = procedure.category === 'dental' &&
            specificPlan.dentalBenefit?.some(d => d.benefitType === 'Severe Dental and Oral Surgery');

        // Categories that use hospital/day surgery benefits as fallback
        // These will use base hospital copayments until specific benefit data is added
        const usesHospitalBenefitFallback = ['ophthalmology', 'ent', 'major_joint', 'general', 'spinal', 'maternity'].includes(procedure.category);

        const hasBenefitData = hasScopeBenefit || hasDentalBenefit || usesHospitalBenefitFallback;

        if (!hasBenefitData) {
            throw new Error(
                `Procedure '${procedure.label}' (category: ${procedure.category}) is not supported. ` +
                `Only procedures with configured benefits in the data source can be resolved.`
            );
        }

        // 4. Build Context (Default "Audit" Scenario: Hospital, Network, Payment Arranged)
        const context: ProcedureContext = {
            procedureName: procedure.label, // Fuzzy matching name
            procedureCode: procedure.cpt_code,
            memberAge: 35,
            facilityType: "Hospital", // Worst case (Standard Benefit)
            facilityInNetwork: true,
            networkType: specificPlan.hospitalNetwork,
            healthcareProfessionalHasPaymentArrangement: true,
            isPrescribedMinimumBenefit: false,
            isEmergency: false
        };

        // 4. Run Engine
        const result = DiscoveryRiskEngine.evaluate(specificPlan, context);

        // 5. Calculate Variants (Day Clinic vs Hospital) for the Waterfall
        // We run the engine multiple times to build the comparison matrix.
        const dayClinicContext = { ...context, facilityType: "Day Clinic" as const };
        const dayResult = DiscoveryRiskEngine.evaluate(specificPlan, dayClinicContext);

        const hospContext = { ...context, facilityType: "Hospital" as const };
        const hospResult = DiscoveryRiskEngine.evaluate(specificPlan, hospContext);

        const nonNetContext = { ...context, facilityType: "Hospital" as const, facilityInNetwork: false };
        const nonNetResult = DiscoveryRiskEngine.evaluate(specificPlan, nonNetContext);

        // 6. Extract Scope-Specific Insights (for Gastroscopy, Colonoscopy, etc.)
        let scopeInsights = undefined;
        if (procedure.category === 'scope') {
            // Find matching scope benefit from the plan
            const scopeBenefit = specificPlan.scopesBenefit?.find(
                s => s.procedureName.toLowerCase() === procedure.label.toLowerCase()
            );

            if (scopeBenefit) {
                scopeInsights = {
                    reducedHospitalCopayment: scopeBenefit.valueBasedNetworkReduction?.reducedHospitalCopayment,
                    reducedDayClinicCopayment: scopeBenefit.valueBasedNetworkReduction?.reducedDayClinicCopayment,
                    inRoomsSingleScopeCopayment: scopeBenefit.inRoomsScopesCopayment?.singleScope,
                    inRoomsBiDirectionalCopayment: scopeBenefit.inRoomsScopesCopayment?.biDirectionalScopes,
                    outOfNetworkPenalty: scopeBenefit.outOfNetworkUpfrontPayment,
                    pmbExemptionCondition: scopeBenefit.prescribedMinimumBenefitExemption?.condition,
                    pmbExemptionNoCopayment: scopeBenefit.prescribedMinimumBenefitExemption?.noCopaymentRequired,
                };
            }
        }

        // 7. Extract Dental-Specific Insights (for Dental Surgery)
        let dentalInsights = undefined;
        if (procedure.category === 'dental') {
            const dentalBenefit = specificPlan.dentalBenefit?.find(
                d => d.benefitType === 'Severe Dental and Oral Surgery'
            );

            if (dentalBenefit) {
                dentalInsights = {
                    hospitalCopayment: dentalBenefit.dentalTreatmentInHospital?.upfrontPayment?.hospitalAccount,
                    dayClinicCopayment: dentalBenefit.dentalTreatmentInHospital?.upfrontPayment?.dayClinicAccount,
                    ageGroup: dentalBenefit.dentalTreatmentInHospital?.upfrontPayment?.ageGroup,
                    requiresApproval: dentalBenefit.dentalTreatmentInHospital?.requiresApproval,
                    anaesthetistCoverage: dentalBenefit.severeDentalAndOralSurgery?.anaesthetistCoverage,
                    coveredOnPlan: dentalBenefit.dentalTreatmentInHospital?.coveredOnPlans?.includes(specificPlan.planName as any),
                };
            }
        }

        // 8. Return Mapped RiskAudit
        return {
            procedure: procedure,
            plan: planMeta, // The generic metadata for the UI text
            liability: result.memberLiability,
            breakdown: {
                base_rate: procedure.base_cost_estimate,
                scheme_pays: result.totalEstimatedCost - result.memberLiability, // Approximate
                shortfall: result.memberLiability,
                deductibles: {
                    total_deductible: result.memberLiability
                },
                scope_variants: {
                    day_clinic: dayResult.memberLiability,
                    day_clinic_combo: dayResult.memberLiability, // Engine doesn't support combo yet
                    hospital_network: hospResult.memberLiability,
                    hospital_network_combo: hospResult.memberLiability,
                    hospital_non_network: nonNetResult.memberLiability,
                    hospital_non_network_combo: nonNetResult.memberLiability
                }
            },
            scope_insights: scopeInsights,
            dental_insights: dentalInsights,
            meta: {
                is_trap: result.memberLiability > 5000,
                coverage_percent: 100, // Dummy
                warning_label: result.warnings[0] || null
            }
        };
    }
}