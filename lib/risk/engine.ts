// lib/risk/engine.ts
import { ProcedureRepository, PlanRuleRepository } from './repositories';
import { RiskAudit, PlanComparison } from '@/types/risk';

export const RiskEngine = {
    calculateLiability: (procedureId: string, planId: string): number => {
        const procedure = ProcedureRepository.getById(procedureId);
        const plan = PlanRuleRepository.getRuleForPlan(planId);

        if (!procedure || !plan) return 0;

        // GATE 1: Exclusion Check
        if (plan.available_procedure_ids && !plan.available_procedure_ids.includes(procedureId)) {
            return procedure.base_cost_estimate;
        }

        const d = plan.deductibles;

        // GATE 2: Scope Matrix Logic
        if (procedure.category === 'scope') {
            const s = d.scope_structure;
            const isCombo = procedure.scope_complexity === 'combo';
            // Return "Hospital Network" rate as the headline risk
            return isCombo ? s.hospital_network_combo : s.hospital_network_single;
        }

        // GATE 3: Explicit Surgical Checks (The "Waterfall")
        if (procedureId === 'hip-replacement' && d.hip_replacement_penalty !== undefined) return d.hip_replacement_penalty;
        if (procedureId === 'knee-replacement' && d.knee_replacement_penalty !== undefined) return d.knee_replacement_penalty;
        if (procedureId === 'cataract-surgery' && d.cataract_penalty !== undefined) return d.cataract_penalty;
        if (procedureId === 'spinal-surgery' && d.spinal_surgery_penalty !== undefined) return d.spinal_surgery_penalty;
        if (procedureId === 'tonsillectomy' && d.tonsillectomy_penalty !== undefined) return d.tonsillectomy_penalty;
        if (procedureId === 'caesarean-section' && d.caesarean_section_penalty !== undefined) return d.caesarean_section_penalty;

        // GATE 4: Plan Default
        return d.default;
    },

    // ... (audit() and compareAllPlans() remain largely the same, just removed the overrides check)
    // Be sure to update audit() to pass the full scope_variants object as previously agreed.
    audit: (planSlug: string, procedureSlug: string): RiskAudit => {
        const procedure = ProcedureRepository.getById(procedureSlug);
        const plan = PlanRuleRepository.getRuleForPlan(planSlug);

        if (!procedure || !plan) throw new Error("Invalid combination");

        const liability = RiskEngine.calculateLiability(procedureSlug, planSlug);
        const isExclusion = plan.available_procedure_ids ? !plan.available_procedure_ids.includes(procedureSlug) : false;
        const finalLiability = (liability > 100000 && liability !== procedure.base_cost_estimate) ? procedure.base_cost_estimate : liability;

        // Populate Scope Variants
        let scopeVariants = undefined;

        console.log("------------------------------------------------------------------");
        console.log("procedure", procedure.category);
        console.log("plan", plan.available_procedure_ids);
        console.log("------------------------------------------------------------------");

        if (procedure.category === 'scope') {
            const s = plan.deductibles.scope_structure;
            scopeVariants = {
                day_clinic: s.day_clinic_single,
                day_clinic_combo: s.day_clinic_combo,
                hospital_network: s.hospital_network_single,
                hospital_network_combo: s.hospital_network_combo,
                hospital_non_network: s.hospital_non_network_single,
                hospital_non_network_combo: s.hospital_non_network_combo,
                rooms: s.rooms_single,
                rooms_combo: s.rooms_combo
            };
        }

        return {
            procedure,
            plan,
            liability: finalLiability,
            breakdown: {
                base_rate: procedure.base_cost_estimate,
                scheme_pays: Math.max(0, procedure.base_cost_estimate - finalLiability),
                shortfall: finalLiability,
                deductibles: { total_deductible: finalLiability },
                scope_variants: scopeVariants
            },
            meta: {
                is_trap: finalLiability > 0,
                coverage_percent: Math.max(0, Math.round(((procedure.base_cost_estimate - finalLiability) / procedure.base_cost_estimate) * 100)),
                warning_label: isExclusion ? "Procedure Not Covered" : finalLiability > 0 ? "Upfront Co-Payment Required" : null
            }
        };
    },

    compareAllPlans: (procedureSlug: string, currentPlanSlug: string): PlanComparison[] => {
        const allPlans = PlanRuleRepository.getAllRules();
        return allPlans
            .filter(plan => plan.available_procedure_ids && plan.available_procedure_ids.includes(procedureSlug))
            .map(plan => {
                const liability = RiskEngine.calculateLiability(procedureSlug, plan.plan_id);
                const cleanLiability = liability > 500000 ? -1 : liability;
                return {
                    plan_name: plan.plan_name,
                    slug: plan.plan_id,
                    liability: cleanLiability,
                    is_current: plan.plan_id === currentPlanSlug
                };
            })
            .sort((a, b) => a.liability - b.liability);
    }
};