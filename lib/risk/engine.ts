// lib/risk/engine.ts
import { ProcedureRepository, PlanRuleRepository } from './repositories';
import { RiskAudit, PlanComparison } from '@/types/risk';

export const RiskEngine = {
    /**
     * Core Calculation Logic
     * Determines the liability based on 2026 Rules
     */
    calculateLiability: (procedureId: string, planId: string): number => {
        const procedure = ProcedureRepository.getById(procedureId);
        const plan = PlanRuleRepository.getById(planId);

        if (!procedure || !plan) return 0;

        // RULE 1: Scope Logic
        if (procedure.category === 'scope') {
            return plan.deductibles.scope_penalty || 0;
        }

        // RULE 2: Smart Plan Logic
        if (plan.network_type === 'smart') {
            return 7750; // Hardcoded 2026 Smart Deductible
        }

        return plan.deductibles.default;
    },

    /**
     * Generates the Full Audit Object for the Page
     */
    generateFullAudit: (procedureSlug: string, planSlug: string): RiskAudit | null => {
        const procedure = ProcedureRepository.getById(procedureSlug);
        const plan = PlanRuleRepository.getById(planSlug);

        if (!procedure || !plan) return null;

        const liability = RiskEngine.calculateLiability(procedureSlug, planSlug);

        return {
            procedure,
            plan,
            liability,
            breakdown: {
                base_rate: procedure.base_cost_estimate,
                scheme_pays: procedure.base_cost_estimate - liability,
                shortfall: liability
            },
            meta: {
                is_trap: liability > 0,
                coverage_percent: Math.round(((procedure.base_cost_estimate - liability) / procedure.base_cost_estimate) * 100),
                warning_label: liability > 0 ? "Upfront Co-Payment Required" : null
            }
        };
    },

    /**
     * Generates the Comparison List for the Dropdown
     */
    compareAllPlans: (procedureSlug: string, currentPlanSlug: string): PlanComparison[] => {
        const allPlans = PlanRuleRepository.getAllRules();

        return allPlans.map(plan => {
            const liability = RiskEngine.calculateLiability(procedureSlug, plan.plan_id);
            return {
                plan_name: plan.plan_name,
                slug: plan.plan_id,
                liability,
                is_current: plan.plan_id === currentPlanSlug
            };
        });
    }
};