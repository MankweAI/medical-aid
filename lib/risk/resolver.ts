import { PlanRuleRepository, ProcedureRepository } from '@/lib/risk/repositories';
import { RiskAudit } from '@/types/risk';
import { DiscoveryRiskEngine } from '@/utils/risk/engines/discovery';
import { CLASSIC_SMART_2026, ESSENTIAL_SMART_2026, ESSENTIAL_DYNAMIC_SMART_2026 } from '@/data/discovery/smart-series-plans';
import { ProcedureContext, DiscoveryPlan } from '@/types/schemes/discovery';

// 1. Map Slugs to Actual Plan Objects
const DISCOVERY_PLAN_MAP: Record<string, DiscoveryPlan> = {
    'discovery-smart-classic-2026': CLASSIC_SMART_2026,
    'discovery-smart-essential-2026': ESSENTIAL_SMART_2026,
    'discovery-smart-essential-dynamic-2026': ESSENTIAL_DYNAMIC_SMART_2026,
};

export class RiskResolver {

    /**
     * The Universal Adapter: 
     * Takes a generic request -> Runs specific engine -> Returns generic result
     */
    static resolve(planSlug: string, procedureSlug: string): RiskAudit {

        // A. Identify the Scheme (Simple check based on slug prefix for now)
        if (planSlug.includes('discovery')) {
            return this.resolveDiscovery(planSlug, procedureSlug);
        }

        throw new Error(`Scheme engine not found for plan: ${planSlug}`);
    }

    private static resolveDiscovery(planSlug: string, procedureSlug: string): RiskAudit {
        // 1. Get the Specific Plan & Generic Procedure
        const plan = DISCOVERY_PLAN_MAP[planSlug];
        const genericProcedure = ProcedureRepository.getById(procedureSlug);

        if (!plan || !genericProcedure) throw new Error('Plan or Procedure not found');

        // 2. Build the Specific Context (Defaulting to "Standard/Safe" scenario)
        const context: ProcedureContext = {
            procedureName: genericProcedure.label, // Fuzzy match string
            memberAge: 35, // Default adult
            facilityType: "Day Clinic", // Default to preferred site to show "Best Case" or "Standard"
            facilityInNetwork: true,
            networkType: plan.daySurgeryNetwork,
            healthcareProfessionalHasPaymentArrangement: true,
            isPrescribedMinimumBenefit: false,
            isEmergency: false
        };

        // 3. RUN THE ENGINE
        const result = DiscoveryRiskEngine.evaluate(plan, context);

        // 4. ADAPTER: Convert Specific Result -> Generic UI Object (RiskAudit)
        return {
            liability: result.memberLiability,
            procedure: genericProcedure,
            // We verify the Generic Plan Rule exists for metadata, 
            // but we use the ENGINE'S calculated numbers.
            plan: PlanRuleRepository.getRuleForPlan(planSlug)!,

            breakdown: {
                base_rate: result.totalEstimatedCost,
                scheme_pays: result.schemePays,
                shortfall: result.memberLiability,
                deductibles: {
                    total_deductible: result.memberLiability
                },
                // We map the specific matrix into the generic variants bucket 
                // so the UI Toggles still work.
                scope_variants: this.simulateDiscoveryVariants(plan, context)
            },

            meta: {
                is_trap: result.memberLiability > 5000,
                coverage_percent: (result.schemePays / (result.schemePays + result.memberLiability)) * 100,
                warning_label: result.warnings[0] || null
            }
        };
    }

    /**
     * Helper to pre-calculate the "Toggle" values for the UI
     * (Hospital vs Day Clinic) by re-running the engine twice.
     */
    private static simulateDiscoveryVariants(plan: DiscoveryPlan, baseContext: ProcedureContext) {
        // Run as Day Clinic
        const dayAudit = DiscoveryRiskEngine.evaluate(plan, { ...baseContext, facilityType: 'Day Clinic' });

        // Run as Hospital
        const hospAudit = DiscoveryRiskEngine.evaluate(plan, { ...baseContext, facilityType: 'Hospital' });

        return {
            day_clinic_single: dayAudit.memberLiability,
            day_clinic_combo: dayAudit.memberLiability, // Simplified for now
            hospital_network_single: hospAudit.memberLiability,
            hospital_network_combo: hospAudit.memberLiability,
            hospital_non_network_single: hospAudit.memberLiability + (plan.hospitalBenefit.outOfNetworkUpfrontPayment || 0),
            hospital_non_network_combo: 0,
            rooms_single: 0,
            rooms_combo: 0,
            penalty_outside_day_surgery: 0
        };
    }
}