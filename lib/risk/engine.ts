// lib/risk/engine.ts
import { ProcedureRepository, PlanRuleRepository } from './repositories';
import { RiskAudit, PlanComparison } from '@/types/risk';

export const RiskEngine = {
    /**
     * Core Calculation Logic
     * Determines the member liability based on 2026 Actuarial Rules
     */
    calculateLiability: (procedureId: string, planId: string): number => {
        const procedure = ProcedureRepository.getById(procedureId);
        const plan = PlanRuleRepository.getRuleForPlan(planId);

        if (!procedure || !plan) return 0;

        // CHECK 1: Exclusion Logic (Actuarial Gate)
        // If the plan doesn't explicitly list this procedure ID, it is not covered.
        // We returns the full base cost as the liability.
        if (!plan.available_procedure_ids.includes(procedureId)) {
            return procedure.base_cost_estimate;
        }

        // CHECK 2: Category-Specific Deductibles
        // We now map specific procedure categories to their defined 2026 penalties
        switch (procedure.category) {
            case 'scope':
                return plan.deductibles.scope_penalty;
            case 'major_joint':
                return plan.deductibles.joint_penalty;
            case 'ophthalmology':
                return plan.deductibles.cataract_penalty;
            case 'spinal':
                // Spinal usually falls under the general plan deductible if no specific penalty exists
                return plan.deductibles.default;
            default:
                return plan.deductibles.default;
        }
    },

    /**
     * Generates the Full Audit Object for the Page
     * Matches the interface expected by page.tsx
     */
    audit: (planSlug: string, procedureSlug: string): RiskAudit => {
        const procedure = ProcedureRepository.getById(procedureSlug);
        const plan = PlanRuleRepository.getRuleForPlan(planSlug);

        if (!procedure || !plan) {
            throw new Error(`Audit failed: Invalid combination ${planSlug} / ${procedureSlug}`);
        }

        const liability = RiskEngine.calculateLiability(procedureSlug, planSlug);
        const isExclusion = !plan.available_procedure_ids.includes(procedureSlug);

        // Safety Check for "999999" Exclusion flags from Repositories
        const finalLiability = (liability > 100000 && liability !== procedure.base_cost_estimate)
            ? procedure.base_cost_estimate // Cap at base cost if it's a flag value
            : liability;

        return {
            procedure,
            plan,
            liability: finalLiability,
            breakdown: {
                base_rate: procedure.base_cost_estimate,
                scheme_pays: Math.max(0, procedure.base_cost_estimate - finalLiability),
                shortfall: finalLiability,
                deductibles: {
                    total_deductible: finalLiability
                }
            },
            meta: {
                is_trap: finalLiability > 0,
                coverage_percent: Math.max(0, Math.round(((procedure.base_cost_estimate - finalLiability) / procedure.base_cost_estimate) * 100)),
                warning_label: isExclusion
                    ? "Procedure Not Covered on this Plan"
                    : finalLiability > 0
                        ? "Upfront Co-Payment Required"
                        : null
            }
        };
    },

    /**
     * Generates the Comparison List for the Dropdown
     * Filters out plans that don't cover the procedure
     */
    compareAllPlans: (procedureSlug: string, currentPlanSlug: string): PlanComparison[] => {
        const allPlans = PlanRuleRepository.getAllRules();

        return allPlans
            .filter(plan => plan.available_procedure_ids.includes(procedureSlug)) // Only compare relevant plans
            .map(plan => {
                const liability = RiskEngine.calculateLiability(procedureSlug, plan.plan_id);

                // Handle the repository "999999" flag for comparisons
                const cleanLiability = liability > 500000 ? -1 : liability; // -1 indicates "Exclusion/PMB Only" in UI

                return {
                    plan_name: plan.plan_name,
                    slug: plan.plan_id,
                    liability: cleanLiability,
                    is_current: plan.plan_id === currentPlanSlug
                };
            })
            .sort((a, b) => a.liability - b.liability); // Sort by cheapest option
    }
};