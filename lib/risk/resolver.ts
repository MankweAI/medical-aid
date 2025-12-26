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

// ============================================================================
// 1. DATA: PROCEDURE REPOSITORY
// ============================================================================

const PROCEDURES: Procedure[] = [
    {
        id: "gastroscopy",
        label: "Gastroscopy",
        medical_term: "Upper GI Endoscopy",
        category: "scope",
        base_cost_estimate: 8500,
        risk_notes: "Must use Day Clinic to avoid high deductibles.",
        scope_complexity: "single",
        cpt_code: "43235",
        common_diagnoses: [
            { code: "K21.9", label: "Gastro-oesophageal reflux disease" },
            { code: "K25", label: "Gastric ulcer" },
            { code: "D50", label: "Iron deficiency anaemia" }
        ],
        description: "A gastroscopy involves using a camera to inspect the oesophagus, stomach, and duodenum. It is strictly classified as an upper-gastrointestinal endoscopic procedure."
    },
    {
        id: "colonoscopy",
        label: "Colonoscopy",
        medical_term: "Lower GI Endoscopy",
        category: "scope",
        base_cost_estimate: 9500,
        risk_notes: "Must use Day Clinic.",
        scope_complexity: "single",
        cpt_code: "45378",
        common_diagnoses: [
            { code: "Z12.11", label: "Screening for malignant neoplasm" },
            { code: "K50", label: "Crohn's disease" },
            { code: "K57", label: "Diverticular disease" }
        ],
        description: "A colonoscopy involves the examination of the large bowel and the distal part of the small bowel. It is classified as a lower-gastrointestinal endoscopic procedure."
    },
    {
        id: "cataract-surgery",
        label: "Cataract Surgery",
        medical_term: "Phacoemulsification",
        category: "ophthalmology",
        base_cost_estimate: 28000,
        risk_notes: "Strict network lists apply.",
        scope_complexity: "single",
        cpt_code: "66984",
        common_diagnoses: [
            { code: "H26.9", label: "Unspecified cataract" },
            { code: "H25.1", label: "Senile nuclear cataract" }
        ],
        description: "Surgical removal of the lens of the eye and replacement with an intraocular lens."
    },
    {
        id: "tonsillectomy",
        label: "Tonsillectomy",
        medical_term: "Tonsillectomy",
        category: "general",
        base_cost_estimate: 35000,
        risk_notes: "Day Surgery Network rules apply.",
        scope_complexity: "single",
        cpt_code: "42826",
        common_diagnoses: [
            { code: "J35.0", label: "Chronic tonsillitis" }
        ],
        description: "Surgical removal of the tonsils."
    }
];

// ============================================================================
// 2. DATA: PLAN RULE REPOSITORY (Generic Metadata)
// ============================================================================

const GENERIC_PLAN_METADATA: PlanDeductibleRule[] = [
    {
        plan_id: "discovery-smart-classic-2026",
        plan_name: "Classic Smart",
        plan_series: "smart",
        network_type: "smart",
        available_procedure_ids: ["gastroscopy", "colonoscopy", "cataract-surgery", "tonsillectomy"],
        deductibles: {
            default: 7750,
            penalty_non_network: 12650,
            scopes_location_benefits: {
                day_clinic: 0,
                hospital_network: 5450,
                hospital_non_network: 12650
            }
        }
    },
    {
        plan_id: "discovery-smart-essential-2026",
        plan_name: "Essential Smart",
        plan_series: "smart",
        network_type: "smart",
        available_procedure_ids: ["gastroscopy", "colonoscopy", "cataract-surgery", "tonsillectomy"],
        deductibles: {
            default: 7750,
            penalty_non_network: 12650,
            scopes_location_benefits: {
                day_clinic: 0,
                hospital_network: 5450,
                hospital_non_network: 12650
            }
        }
    },
    {
        plan_id: "discovery-smart-essential-dynamic-2026",
        plan_name: "Essential Dynamic Smart",
        plan_series: "smart",
        network_type: "smart",
        available_procedure_ids: ["gastroscopy", "colonoscopy", "cataract-surgery"],
        deductibles: {
            default: 7750,
            penalty_non_network: 15300,
            scopes_location_benefits: {
                day_clinic: 0,
                hospital_network: 5450,
                hospital_non_network: 15300
            }
        }
    }
];

// ============================================================================
// 3. EXPORTS: REPOSITORIES
// ============================================================================

export const ProcedureRepository = {
    getById: (slug: string) => PROCEDURES.find(p => p.id === slug),
    getAll: () => PROCEDURES,
    getByCategory: (category: string) => PROCEDURES.filter(p => p.category === category)
};

export const PlanRuleRepository = {
    getRuleForPlan: (planId: string) => GENERIC_PLAN_METADATA.find(r => r.plan_id === planId),
    getAllRules: () => GENERIC_PLAN_METADATA
};

// ============================================================================
// 4. RISK RESOLVER (Orchestrator)
// ============================================================================

const DISCOVERY_PLAN_MAP: Record<string, DiscoveryPlan> = {
    'discovery-smart-classic-2026': CLASSIC_SMART_2026,
    'discovery-smart-essential-2026': ESSENTIAL_SMART_2026,
    'discovery-smart-essential-dynamic-2026': ESSENTIAL_DYNAMIC_SMART_2026
};

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
            // Fallback for demo? Or Error?
            // For now, we error because the Engine needs a DiscoveryPlan object.
            throw new Error(`Engine configuration missing for plan: ${planSlug}`);
        }

        // 3. Build Context (Default "Audit" Scenario: Hospital, Network, Payment Arranged)
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


        // 6. Return Mapped RiskAudit
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
            meta: {
                is_trap: result.memberLiability > 5000,
                coverage_percent: 100, // Dummy
                warning_label: result.warnings[0] || null
            }
        };
    }
}