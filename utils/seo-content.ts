import { Plan } from '@/utils/types';
import { Persona } from '@/utils/persona';
import { PLANS } from '@/data/plans';
import { PERSONAS } from '@/data/personas';
import { PricingEngine } from '@/utils/engine'; // Import Engine for accurate pricing

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
        if (plan.faq && plan.faq.length > 0) {
            return plan.faq;
        }
        return [
            { question: `Why is ${plan.identity.plan_name} recommended for ${persona.meta.category}?`, answer: persona.actuarial_logic?.mathematical_basis || `This plan offers the optimal balance of benefits vs premium for the ${persona.meta.category} profile.` },
            { question: "What happens if I use a non-network hospital?", answer: plan.network_restriction === 'Any' ? "Nothing. This plan allows you to use any private hospital in South Africa without penalty." : `You will be liable for a co-payment (typically R${plan.procedure_copays.admission_penalty_non_network || '15,000'}) unless it is a life-threatening emergency.` },
            { question: "Is maternity covered on this plan?", answer: plan.defined_baskets.maternity.antenatal_consults > 0 ? `Yes. It includes a separate 'Risk Benefit' for ${plan.defined_baskets.maternity.antenatal_consults} antenatal visits and 2 ultrasounds, so you don't use your savings.` : "No specific maternity basket. All pregnancy-related costs will be paid from your Savings Account or out of pocket." }
        ];
    },

    // 3. CROSS-SCHEME SMART PIVOT (ROBUST VERSION)
    getSmartPivot: (currentPlan: Plan, currentPersona: Persona) => {

        // HELPER: Find the best persona for a plan ID
        // This logic is now reused to validate candidates
        const findBestPersona = (targetPlanId: string) => {
            const candidates = PERSONAS.filter(p => p.actuarial_logic?.target_plan_id === targetPlanId);

            // 1. Exact Category Match
            const exact = candidates.find(p => p.meta.category === currentPersona.meta.category);
            if (exact) return exact;

            // 2. Compatible Match
            const allowedCategories = COMPATIBILITY_MAP[currentPersona.meta.category] || [];
            const compatible = candidates.find(p => allowedCategories.includes(p.meta.category));
            if (compatible) return compatible;

            // 3. Any Match (Fallback for sparse data)
            return candidates.length > 0 ? candidates[0] : null;
        };

        // A. CALCULATE REAL-WORLD COST
        // We must calculate the actual premium for the user's income/family
        // to ensure the sort order is actuarially correct.
        const calculatedLadder = PLANS.map(p => {
            const financials = PricingEngine.calculateProfile(
                p.contributions[0],
                currentPersona.defaults.family_composition,
                currentPersona.defaults.income
            );
            return {
                plan: p,
                realCost: financials.monthlyPremium,
                linkedPersona: findBestPersona(p.id) // Pre-fetch persona to check validity
            };
        });

        // B. FILTER INVALID CANDIDATES
        // 1. Remove the current plan itself
        // 2. Remove plans that don't have a linked Persona (we can't route to them)
        const validLadder = calculatedLadder.filter(item =>
            item.plan.id !== currentPlan.id &&
            item.linkedPersona !== null
        );

        // C. SORT BY PRICE (Low to High)
        validLadder.sort((a, b) => a.realCost - b.realCost);

        // D. FIND PIVOT POINTS
        // We look for the current plan's price point in this new valid ladder
        // Note: currentPlan isn't in validLadder, so we find the insertion index
        const currentCost = PricingEngine.calculateProfile(
            currentPlan.contributions[0],
            currentPersona.defaults.family_composition,
            currentPersona.defaults.income
        ).monthlyPremium;

        // Find the index where the current plan *would* fit
        let insertionIndex = validLadder.findIndex(item => item.realCost >= currentCost);
        if (insertionIndex === -1) insertionIndex = validLadder.length; // It's the most expensive

        // E. SELECT NEIGHBORS
        const cheaperOption = insertionIndex > 0 ? validLadder[insertionIndex - 1] : null;
        const richerOption = insertionIndex < validLadder.length ? validLadder[insertionIndex] : null;

        return {
            cheaper: cheaperOption ? { plan: cheaperOption.plan, persona: cheaperOption.linkedPersona! } : null,
            richer: richerOption ? { plan: richerOption.plan, persona: richerOption.linkedPersona! } : null
        };
    }
};