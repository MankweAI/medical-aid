// utils/procedure-logic.ts
import { Plan } from './types';
import { PLAN_PROCEDURE_RULES } from '@/data/procedures';

export interface SurgeryAudit {
    annualPremium: number;
    upfrontDeductible: number;
    potentialPenalties: number;
    totalYearlyCost: number;
    verdict: 'Cost-Effective' | 'High-Risk';
}

export const auditSurgeryCost = (procedureId: string, plan: Plan): SurgeryAudit => {
    const rules = PLAN_PROCEDURE_RULES[plan.id] || { base_deductible: 0 };

    const annualPremium = plan.price * 12;
    const upfrontDeductible = rules.base_deductible || 0;

    // Logic for "The Stacking Penalty" (e.g., Scope + Facility Penalty) [cite: 37, 39]
    let potentialPenalties = 0;
    if (procedureId.includes('scope') && plan.id.includes('smart')) {
        potentialPenalties = rules.scope_penalty || 0;
    }

    const totalYearlyCost = annualPremium + upfrontDeductible + potentialPenalties;

    return {
        annualPremium,
        upfrontDeductible,
        potentialPenalties,
        totalYearlyCost,
        verdict: upfrontDeductible > 5000 ? 'High-Risk' : 'Cost-Effective'
    };
};