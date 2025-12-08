import { Plan } from '@/utils/types';
import { Persona } from '@/utils/persona';
import { PLANS } from '@/data/plans';
import { PERSONAS } from '@/data/personas';

// COMPATIBILITY MATRIX (Who can talk to whom?)
const COMPATIBILITY_MAP: Record<string, string[]> = {
    'Student': ['Budget', 'Savings', 'Family'],
    'Family': ['Maternity', 'Savings', 'Budget', 'Student'],
    'Savings': ['Family', 'Budget', 'Student'],
    'Maternity': ['Family'],
    'Chronic': ['Senior', 'Comprehensive'],
    'Senior': ['Chronic', 'Comprehensive'],
    'Budget': ['Student', 'Family', 'Savings']
};

export const ContentGenerator = {

    generateGlossary: (plan: Plan) => {
        const terms = [];
        if (plan.network_restriction === 'Network') terms.push({ term: "Network Restriction", definition: "You must use hospitals and doctors listed in the scheme's specific network. Voluntary use of non-network providers will result in a heavy co-payment." });
        if (plan.savings_annual > 0) terms.push({ term: "Medical Savings Account (MSA)", definition: `A fund of R${plan.savings_annual.toLocaleString()} included in your premium. You use this for day-to-day expenses like GP visits and scripts.` });
        if (plan.procedure_copays.joint_replacement && plan.procedure_copays.joint_replacement !== 0) terms.push({ term: "Elective Procedure Co-payment", definition: "A mandatory upfront fee you must pay to the hospital for specific scheduled surgeries (like hip/knee replacements) that are not emergencies." });
        if (plan.identity.plan_type === 'Hospital Plan') terms.push({ term: "PMB (Prescribed Minimum Benefits)", definition: "By law, this plan must cover the costs of 27 specific chronic conditions and emergency treatments, even though it is a basic Hospital Plan." });
        return terms.slice(0, 3);
    },

    generateFAQ: (plan: Plan, persona: Persona) => {
        return [
            { question: `Why is ${plan.identity.plan_name} recommended for ${persona.meta.category}?`, answer: persona.actuarial_logic?.mathematical_basis || `This plan offers the optimal balance of benefits vs premium for the ${persona.meta.category} profile.` },
            { question: "What happens if I use a non-network hospital?", answer: plan.network_restriction === 'Any' ? "Nothing. This plan allows you to use any private hospital in South Africa without penalty." : `You will be liable for a co-payment (typically R${plan.procedure_copays.admission_penalty_non_network || '15,000'}) unless it is a life-threatening emergency.` },
            { question: "Is maternity covered on this plan?", answer: plan.defined_baskets.maternity.antenatal_consults > 0 ? `Yes. It includes a separate 'Risk Benefit' for ${plan.defined_baskets.maternity.antenatal_consults} antenatal visits and 2 ultrasounds, so you don't use your savings.` : "No specific maternity basket. All pregnancy-related costs will be paid from your Savings Account or out of pocket." }
        ];
    },

    // 3. CROSS-SCHEME SMART PIVOT
    getSmartPivot: (currentPlan: Plan, currentPersona: Persona) => {
        // A. Sort ALL plans by price (The "Market Ladder")
        const marketLadder = PLANS.sort((a, b) => a.price - b.price);

        const currentIndex = marketLadder.findIndex(p => p.id === currentPlan.id);

        // Find immediate neighbors in the market
        const cheaperPlan = currentIndex > 0 ? marketLadder[currentIndex - 1] : null;
        const richerPlan = currentIndex < marketLadder.length - 1 ? marketLadder[currentIndex + 1] : null;

        // B. The Matchmaker (Finds the best persona for the new plan)
        const findBestPersona = (targetPlanId: string) => {
            const candidates = PERSONAS.filter(p => p.actuarial_logic?.target_plan_id === targetPlanId);

            // 1. Exact Category Match
            const exact = candidates.find(p => p.meta.category === currentPersona.meta.category);
            if (exact) return exact;

            // 2. Compatible Match
            const allowedCategories = COMPATIBILITY_MAP[currentPersona.meta.category] || [];
            const compatible = candidates.find(p => allowedCategories.includes(p.meta.category));
            if (compatible) return compatible;

            // 3. No Match
            return null;
        };

        return {
            cheaper: cheaperPlan ? { plan: cheaperPlan, persona: findBestPersona(cheaperPlan.id) } : null,
            richer: richerPlan ? { plan: richerPlan, persona: findBestPersona(richerPlan.id) } : null
        };
    }
};