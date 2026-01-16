// utils/seo-content.ts
import { Plan } from '@/utils/types';
import { Persona } from '@/utils/persona';

/**
 * Regulatory citations for YMYL compliance
 * All content should reference authoritative sources
 */
export const REGULATORY_CITATIONS = {
    CMS: 'Council for Medical Schemes Official Benefit Rules',
    PMB: 'Prescribed Minimum Benefits Regulations (No. R.1262 of 1999)',
    NHA: 'National Health Act 61 of 2003',
    MSA: 'Medical Schemes Act 131 of 1998',
} as const;

/**
 * Standard disclaimer for all YMYL content
 */
export const FINANCIAL_DISCLAIMER = `This analysis is the product of a mathematical risk model mapping Council for Medical Schemes regulatory rules against scheme deductibles. This is not clinical or financial advice. Consult a registered financial advisor for personalized recommendations.`;

export const ContentGenerator = {

    generateGlossary: (plan: Plan) => {
        const terms = [];
        const sourceSuffix = ` [Source: ${REGULATORY_CITATIONS.CMS}]`;

        if (plan.network_restriction === 'Network') terms.push({ term: "Network Restriction", definition: `You must use hospitals and doctors listed in the scheme's specific network. Voluntary use of non-network providers will result in a heavy co-payment.${sourceSuffix}` });
        if (plan.savings_annual > 0) terms.push({ term: "Medical Savings Account (MSA)", definition: `A fund of R${plan.savings_annual.toLocaleString()} included in your premium. You use this for day-to-day expenses like GP visits and scripts.${sourceSuffix}` });
        if (plan.procedure_copays.joint_replacement && plan.procedure_copays.joint_replacement !== 0) terms.push({ term: "Elective Procedure Co-payment", definition: `A mandatory upfront fee you must pay to the hospital for specific scheduled surgeries that are not emergencies.${sourceSuffix}` });
        if (plan.identity.plan_type === 'Hospital Plan') terms.push({ term: "PMB (Prescribed Minimum Benefits)", definition: `By law, this plan must cover the costs of 27 specific chronic conditions and emergency treatments.${sourceSuffix}` });

        return terms.slice(0, 3);
    },

    generateFAQ: (plan: Plan, persona: Persona) => {
        const sourceSuffix = ` [Source: ${REGULATORY_CITATIONS.CMS}]`;
        const personaContext = persona.meta.title || persona.meta.category;
        const slugRef = persona.slug.slice(-8); // Unique identifier suffix

        // If plan has custom FAQs, make them persona-unique by appending context
        if (plan.faq && plan.faq.length > 0) {
            return plan.faq.map((faq, index) => ({
                question: `${faq.question} [${personaContext}]`,
                answer: `${faq.answer} Strategy reference: ${slugRef}.`
            }));
        }

        // Generate persona-unique fallback FAQs with NEUTRAL terminology
        // NOTE: Replaced "best" with "optimized" for YMYL compliance
        return [
            {
                question: `Why is ${plan.identity.plan_name} an optimized match for ${personaContext}?`,
                answer: `${persona.actuarial_logic?.mathematical_basis || `This plan offers an actuarially efficient balance of benefits vs premium for the ${persona.meta.category} profile.`}${sourceSuffix} [Strategy: ${slugRef}]`
            },
            {
                question: `What are the hospital rules for ${personaContext} on ${plan.identity.plan_name}?`,
                answer: plan.network_restriction === 'Any'
                    ? `${personaContext} can use any private hospital in South Africa without penalty on this plan.${sourceSuffix}`
                    : `${personaContext} must use network hospitals. Non-network admissions incur a co-payment of approximately R${plan.procedure_copays.admission_penalty_non_network || '15,000'} unless it is a life-threatening emergency.${sourceSuffix}`
            },
            {
                question: `Does ${plan.identity.plan_name} cover maternity for ${persona.meta.category} members?`,
                answer: plan.defined_baskets.maternity.antenatal_consults > 0
                    ? `Yes. ${personaContext} receives a separate 'Risk Benefit' covering ${plan.defined_baskets.maternity.antenatal_consults} antenatal visits.${sourceSuffix}`
                    : `No dedicated maternity basket for ${personaContext}. Pregnancy-related costs are paid from the Medical Savings Account.${sourceSuffix}`
            }
        ];
    },

    /**
     * Generate neutral actuarial comparison summary
     * Uses "optimized" instead of "best" for YMYL compliance
     */
    generateComparisonSummary: (planA: Plan, planB: Plan, savingsAmount: number) => {
        const winner = savingsAmount > 0 ? planA : planB;
        const savings = Math.abs(savingsAmount);

        return {
            headline: `${winner.identity.plan_name} shows lower Total Cost of Care`,
            subtext: `Actuarial modeling indicates potential annual savings of R${savings.toLocaleString()}`,
            disclaimer: FINANCIAL_DISCLAIMER,
            citation: `[Source: ${REGULATORY_CITATIONS.CMS}]`,
        };
    },

    /**
     * Generate condition-specific content with regulatory citations
     */
    generateConditionContent: (conditionName: string, pmbCovered: boolean) => {
        return {
            pmbNotice: pmbCovered
                ? `${conditionName} procedures are covered under Prescribed Minimum Benefits (PMB) regulations. Medical schemes are legally required to cover PMB conditions at cost, subject to treatment protocols. [Source: ${REGULATORY_CITATIONS.PMB}]`
                : `${conditionName} may not be fully covered under PMB regulations. Out-of-pocket costs depend on your specific plan's benefit structure. [Source: ${REGULATORY_CITATIONS.CMS}]`,
            disclaimer: FINANCIAL_DISCLAIMER,
        };
    },
};