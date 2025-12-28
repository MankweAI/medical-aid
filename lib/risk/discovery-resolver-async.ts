/**
 * Discovery Health Database Resolver
 * 
 * Async resolver that fetches data from Supabase instead of local files.
 * Includes caching for build-time performance.
 */

import {
    Procedure,
    PlanDeductibleRule,
    RiskAudit,
    ProcedureContext,
    DiscoveryPlan
} from '@/types/schemes/discovery';
import { DiscoveryRiskEngine } from '@/utils/risk/engines/discovery';
import {
    getDiscoveryPlanById,
    getDiscoveryPlanBySlug,
    getDiscoveryPlanSlugs,
    getDiscoveryProcedures,
    getDiscoveryProcedureById
} from '@/utils/db';

// ============================================================================
// CACHING LAYER (For build-time performance)
// ============================================================================

let plansCache: Map<string, DiscoveryPlan> = new Map();
let proceduresCache: Map<string, Procedure> = new Map();
let slugToIdCache: Map<string, string> = new Map();
let cacheInitialized = false;

/**
 * Initialize cache from database (call once at build time)
 */
export async function initializeResolver(): Promise<void> {
    if (cacheInitialized) return;

    // Load all plans and procedures into cache
    const [planSlugs, procedures] = await Promise.all([
        getDiscoveryPlanSlugs(),
        getDiscoveryProcedures()
    ]);

    // Build slug-to-id mapping
    for (const { id, slug } of planSlugs) {
        slugToIdCache.set(slug, id);
    }

    // Cache procedures
    for (const proc of procedures) {
        proceduresCache.set(proc.id, proc);
    }

    cacheInitialized = true;
    console.log(`[Resolver] Initialized with ${planSlugs.length} plans, ${procedures.length} procedures`);
}

// ============================================================================
// ASYNC REPOSITORIES
// ============================================================================

export const ProcedureRepositoryAsync = {
    getById: async (slug: string): Promise<Procedure | undefined> => {
        // Check cache first
        if (proceduresCache.has(slug)) {
            return proceduresCache.get(slug);
        }
        // Fetch from DB
        const proc = await getDiscoveryProcedureById(slug);
        if (proc) {
            proceduresCache.set(slug, proc);
        }
        return proc || undefined;
    },

    getAll: async (): Promise<Procedure[]> => {
        if (proceduresCache.size > 0) {
            return Array.from(proceduresCache.values());
        }
        const procedures = await getDiscoveryProcedures();
        procedures.forEach(p => proceduresCache.set(p.id, p));
        return procedures;
    }
};

export const PlanRuleRepositoryAsync = {
    getPlanIdFromSlug: async (slug: string): Promise<string | undefined> => {
        if (slugToIdCache.has(slug)) {
            return slugToIdCache.get(slug);
        }
        const result = await getDiscoveryPlanBySlug(slug);
        if (result) {
            slugToIdCache.set(slug, result.id);
            return result.id;
        }
        return undefined;
    },

    getPlanById: async (planId: string): Promise<DiscoveryPlan | undefined> => {
        if (plansCache.has(planId)) {
            return plansCache.get(planId);
        }
        const plan = await getDiscoveryPlanById(planId);
        if (plan) {
            plansCache.set(planId, plan);
        }
        return plan || undefined;
    },

    getRuleForPlan: async (planId: string): Promise<PlanDeductibleRule | undefined> => {
        const plan = await PlanRuleRepositoryAsync.getPlanById(planId);
        if (!plan) return undefined;
        return mapToPlanDeductibleRule(plan);
    },

    getAllSlugs: async (): Promise<{ id: string; slug: string; series: string }[]> => {
        return getDiscoveryPlanSlugs();
    }
};

// ============================================================================
// MAPPER: DiscoveryPlan → PlanDeductibleRule
// ============================================================================

function mapToPlanDeductibleRule(plan: DiscoveryPlan): PlanDeductibleRule {
    const scopeBenefit = plan.scopesBenefit?.[0];

    return {
        plan_id: plan.planId,
        plan_name: plan.planName,
        plan_series: plan.series.toLowerCase() as 'smart' | 'core' | 'saver' | 'priority' | 'comprehensive' | 'coastal',
        network_type: plan.hospitalNetwork.includes('Smart') ? 'smart' : 'any',
        available_procedure_ids: [], // Will be populated dynamically
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
// ASYNC RISK RESOLVER
// ============================================================================

export class RiskResolverAsync {

    /**
     * Main Resolver Method (Async)
     */
    static async resolve(planSlug: string, procedureSlug: string): Promise<RiskAudit> {

        // 1. Get plan ID from slug (handles both slug and full ID)
        let planId = planSlug;
        if (!planSlug.startsWith('discovery-')) {
            const resolvedId = await PlanRuleRepositoryAsync.getPlanIdFromSlug(planSlug);
            if (!resolvedId) {
                throw new Error(`Could not resolve plan slug '${planSlug}'`);
            }
            planId = resolvedId;
        }

        // 2. Get the Procedure
        const procedure = await ProcedureRepositoryAsync.getById(procedureSlug);
        if (!procedure) {
            throw new Error(`Could not resolve procedure '${procedureSlug}'`);
        }

        // 3. Get the full Plan
        const specificPlan = await PlanRuleRepositoryAsync.getPlanById(planId);
        if (!specificPlan) {
            throw new Error(`Could not resolve plan '${planId}'`);
        }

        // 4. Get plan metadata for UI
        const planMeta = await PlanRuleRepositoryAsync.getRuleForPlan(planId);
        if (!planMeta) {
            throw new Error(`Could not get plan metadata for '${planId}'`);
        }

        // 5. Verify the procedure has benefit data
        const hasScopeBenefit = procedure.category === 'scope' && specificPlan.scopesBenefit?.some(
            s => s.procedureName.toLowerCase() === procedure.label.toLowerCase()
        );

        const hasDentalBenefit = procedure.category === 'dental' &&
            specificPlan.dentalBenefit?.some(d => d.benefitType === 'Severe Dental and Oral Surgery');

        const usesHospitalBenefitFallback = ['ophthalmology', 'ent', 'major_joint', 'general', 'spinal', 'maternity'].includes(procedure.category);

        const hasBenefitData = hasScopeBenefit || hasDentalBenefit || usesHospitalBenefitFallback;

        if (!hasBenefitData) {
            throw new Error(
                `Procedure '${procedure.label}' (category: ${procedure.category}) is not supported.`
            );
        }

        // 6. Build Context
        const context: ProcedureContext = {
            procedureName: procedure.label,
            procedureCode: procedure.cpt_code,
            memberAge: 35,
            facilityType: "Hospital",
            facilityInNetwork: true,
            networkType: specificPlan.hospitalNetwork,
            healthcareProfessionalHasPaymentArrangement: true,
            isPrescribedMinimumBenefit: false,
            isEmergency: false
        };

        // 7. Run Engine
        const result = DiscoveryRiskEngine.evaluate(specificPlan, context);

        // 8. Calculate Variants
        const dayClinicContext = { ...context, facilityType: "Day Clinic" as const };
        const dayResult = DiscoveryRiskEngine.evaluate(specificPlan, dayClinicContext);

        const hospContext = { ...context, facilityType: "Hospital" as const };
        const hospResult = DiscoveryRiskEngine.evaluate(specificPlan, hospContext);

        const nonNetContext = { ...context, facilityType: "Hospital" as const, facilityInNetwork: false };
        const nonNetResult = DiscoveryRiskEngine.evaluate(specificPlan, nonNetContext);

        // 9. Extract Scope-Specific Insights
        let scopeInsights = undefined;
        if (procedure.category === 'scope') {
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

        // 10. Extract Dental-Specific Insights
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

        // 11. Return RiskAudit
        return {
            procedure: procedure,
            plan: planMeta,
            liability: result.memberLiability,
            breakdown: {
                base_rate: procedure.base_cost_estimate,
                scheme_pays: result.totalEstimatedCost - result.memberLiability,
                shortfall: result.memberLiability,
                deductibles: {
                    total_deductible: result.memberLiability
                },
                scope_variants: {
                    day_clinic: dayResult.memberLiability,
                    day_clinic_combo: dayResult.memberLiability,
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
                coverage_percent: 100,
                warning_label: result.warnings[0] || null
            }
        };
    }
}
