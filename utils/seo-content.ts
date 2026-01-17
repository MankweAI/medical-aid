// utils/seo-content.ts
import { Plan } from '@/utils/types';
import { Persona } from '@/utils/persona';
import { ConditionSlug, CONDITIONS } from '@/utils/condition-mapping';

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

/**
 * Condition-specific glossary terms
 * Maps conditions to their relevant technical jargon definitions
 */
const CONDITION_GLOSSARY: Record<ConditionSlug, { term: string; definition: string }[]> = {
    'digestive-disorders': [
        { term: 'Gastroscopy', definition: 'A scope procedure to examine the oesophagus, stomach, and duodenum. Often done as a day procedure with sedation.' },
        { term: 'Colonoscopy', definition: 'An endoscopic examination of the large bowel. Requires bowel preparation and is typically done under sedation.' },
        { term: 'PMB Condition', definition: 'Gastro-intestinal conditions like GERD and ulcers are covered under Prescribed Minimum Benefits when diagnosed by a GIT specialist.' },
    ],
    'joint-care': [
        { term: 'Internal Prosthesis Limit', definition: 'A rand-value cap on what the scheme will pay for artificial joints. Any excess is your out-of-pocket cost.' },
        { term: 'Designated Service Provider (DSP)', definition: 'A hospital or surgeon in the scheme\'s network. Using non-DSP providers triggers co-payments.' },
        { term: 'Pre-authorization', definition: 'Mandatory approval from your scheme before joint surgery. Without it, your claim may be rejected.' },
    ],
    'knee-injuries': [
        { term: 'Arthroscopy', definition: 'Keyhole surgery to diagnose and treat knee problems. Often done as a day procedure.' },
        { term: 'ACL Reconstruction', definition: 'Surgery to rebuild the anterior cruciate ligament using a graft. Requires extensive rehabilitation.' },
        { term: 'Prosthesis Co-payment', definition: 'An upfront fee you pay toward the artificial components used in knee replacement surgery.' },
    ],
    'hip-conditions': [
        { term: 'Hip Arthroplasty', definition: 'Total or partial hip replacement surgery. One of the most common orthopaedic procedures.' },
        { term: 'Rehabilitation Gap', definition: 'The difference between what your scheme covers for physiotherapy and the actual cost of full recovery.' },
        { term: 'Above Threshold Benefit (ATB)', definition: 'Additional funds that become available after your savings and gap are depleted.' },
    ],
    'spinal-conditions': [
        { term: 'Laminectomy', definition: 'Surgical removal of part of the vertebra to relieve pressure on the spinal cord or nerves.' },
        { term: 'Spinal Fusion', definition: 'A procedure that permanently joins two or more vertebrae. Often involves metal hardware.' },
        { term: 'Hardware Limit', definition: 'The maximum your scheme will pay for screws, rods, and cages used in spinal surgery.' },
    ],
    'eye-health': [
        { term: 'Cataract Extraction', definition: 'Removal of the clouded natural lens and replacement with an artificial intraocular lens (IOL).' },
        { term: 'IOL Limit', definition: 'The maximum the scheme pays for the artificial lens. Premium lenses (multifocal) often exceed this limit.' },
        { term: 'Optical Benefit', definition: 'A separate allocation for glasses, contact lenses, and routine eye exams.' },
    ],
    'maternity-care': [
        { term: 'Antenatal Benefit', definition: 'Covered consultations with an obstetrician or midwife during pregnancy, typically 8-12 visits.' },
        { term: 'Caesarean Section', definition: 'Surgical delivery of a baby. Medical schemes cover medically necessary C-sections, but elective may have limitations.' },
        { term: 'Neonatal ICU', definition: 'Intensive care for premature or ill newborns. This is a PMB condition and must be covered in full.' },
    ],
    'dental-conditions': [
        { term: 'Dental Benefit', definition: 'Annual rand-value limit for non-hospital dental work like fillings, extractions, and cleanings.' },
        { term: 'Wisdom Tooth Extraction', definition: 'Removal of third molars. In-hospital extraction may require pre-authorization.' },
        { term: 'Orthodontic Limit', definition: 'The maximum your scheme pays towards braces or aligners over a lifetime.' },
    ],
    'nasal-sinus-conditions': [
        { term: 'Septoplasty', definition: 'Surgery to straighten a deviated septum. Often combined with turbinate reduction.' },
        { term: 'FESS (Functional Endoscopic Sinus Surgery)', definition: 'Minimally invasive surgery to improve sinus drainage and treat chronic sinusitis.' },
        { term: 'Day Surgery', definition: 'A procedure where you are discharged the same day. No overnight hospital stay required.' },
    ],
    'cancer-care': [
        { term: 'Oncology Benefit', definition: 'A dedicated pool of funds for cancer treatment including chemo, radiation, and targeted therapy.' },
        { term: 'Biological Therapy', definition: 'Advanced treatment using immunotherapy or molecularly targeted drugs. Often subject to treatment protocols.' },
        { term: 'PMB Cancer Coverage', definition: 'Diagnosis and treatment of cancer is a Prescribed Minimum Benefit. Schemes must cover to a prescribed extent.' },
    ],
    'imaging-diagnostics': [
        { term: 'MRI (Magnetic Resonance Imaging)', definition: 'Advanced imaging for soft tissue. Often requires pre-authorization for non-emergency scans.' },
        { term: 'CT Scan', definition: 'X-ray based imaging for bones and organs. May have co-payments on certain plans.' },
        { term: 'Radiology Gap', definition: 'The difference between what the radiologist charges and what your scheme pays. Often 100-200% above tariff.' },
    ],
    'general-surgery': [
        { term: 'Appendectomy', definition: 'Emergency removal of the appendix. Covered in full as a PMB emergency.' },
        { term: 'Hernia Repair', definition: 'Surgical correction of an abdominal wall defect. Often done laparoscopically.' },
        { term: 'Anaesthetist Gap', definition: 'The difference between the anaesthetist\'s fee and the scheme tariff. A common surprise cost.' },
    ],
};

/**
 * Condition-specific FAQs for People Also Ask sections
 */
const CONDITION_FAQS: Record<ConditionSlug, { question: string; answer: string }[]> = {
    'digestive-disorders': [
        { question: 'Is a gastroscopy covered by medical aid?', answer: `Gastroscopy is a PMB-level diagnostic procedure when medically indicated. Your scheme must cover it at a Designated Service Provider, but you may face co-payments at non-DSP facilities. [Source: ${REGULATORY_CITATIONS.PMB}]` },
        { question: 'What is the waiting period for colonoscopy?', answer: `Most schemes have a 3-month general waiting period for new members. Pre-existing conditions may have a 12-month exclusion. [Source: ${REGULATORY_CITATIONS.MSA}]` },
        { question: 'Will I have an anaesthetist gap for my scope?', answer: `Yes, anaesthetist gaps are common. The specialist may charge above the scheme tariff, leaving you with an out-of-pocket payment of R1,000 to R5,000. [Source: ${REGULATORY_CITATIONS.CMS}]` },
    ],
    'joint-care': [
        { question: 'How much does a hip replacement cost on medical aid?', answer: `A hip replacement typically costs R150,000 to R250,000. Your out-of-pocket depends on your internal prosthesis limit and whether you use a DSP hospital. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'What is an internal prosthesis limit?', answer: `This is the maximum rand amount your scheme pays for artificial joints. If the prosthesis costs R80,000 and your limit is R50,000, you pay the R30,000 difference. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'Is knee replacement a PMB condition?', answer: `Total knee replacement for severe osteoarthritis is typically covered under PMB. However, schemes may only cover "functional" prostheses, not premium options. [Source: ${REGULATORY_CITATIONS.PMB}]` },
    ],
    'knee-injuries': [
        { question: 'Is ACL reconstruction covered by medical aid?', answer: `ACL reconstruction is covered as an orthopaedic admission. Co-payments depend on your plan type and whether you use a network hospital. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'What is the recovery time for knee arthroscopy?', answer: `Most patients return to normal activities in 2-4 weeks. Physiotherapy is often needed but may have benefit limits on your plan. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'Will I need pre-authorization for knee surgery?', answer: `Yes, all elective orthopaedic procedures require pre-authorization. Your surgeon's rooms typically handle this for you. [Source: ${REGULATORY_CITATIONS.CMS}]` },
    ],
    'hip-conditions': [
        { question: 'What is the gap for hip replacement surgery?', answer: `The hip prosthesis gap can range from R20,000 to R80,000 depending on your plan's internal prosthesis limit and the type of implant used. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'How long is hospital stay for hip replacement?', answer: `Typically 3-5 days. Some day-surgery options exist for healthy patients with strong home support. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'Does medical aid cover hip replacement rehabilitation?', answer: `Physiotherapy is usually covered from your day-to-day or savings benefit, but limits apply. Budget for 12-20 sessions post-surgery. [Source: ${REGULATORY_CITATIONS.CMS}]` },
    ],
    'spinal-conditions': [
        { question: 'Is spinal fusion covered by medical aid?', answer: `Spinal fusion is covered when medically necessary. However, hardware limits may apply, and you should confirm your scheme's specific spinal surgery protocol. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'What is the co-payment for back surgery?', answer: `Back surgery co-payments vary by plan from R0 on comprehensive plans to R25,000+ on hospital plans. Always get a pre-authorization quote. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'How much does a laminectomy cost?', answer: `A laminectomy typically costs R60,000 to R120,000 depending on complexity. Your out-of-pocket depends on whether you use a DSP provider. [Source: ${REGULATORY_CITATIONS.CMS}]` },
    ],
    'eye-health': [
        { question: 'Is cataract surgery covered by medical aid?', answer: `Cataract surgery is a PMB condition when visual impairment affects daily function. Basic monofocal IOLs are covered; premium lenses incur a gap. [Source: ${REGULATORY_CITATIONS.PMB}]` },
        { question: 'What is the limit for eye glasses on medical aid?', answer: `Optical benefits range from R1,500 to R5,000 per year depending on your plan. Some plans cover frames and lenses separately. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'Does medical aid cover LASIK?', answer: `LASIK is generally not covered as it is considered cosmetic. Some executive plans offer a contribution of R5,000 to R15,000. [Source: ${REGULATORY_CITATIONS.CMS}]` },
    ],
    'maternity-care': [
        { question: 'Is maternity covered from day one on medical aid?', answer: `Most schemes have a 10-12 month waiting period for planned maternity. Emergency delivery is a PMB and is covered immediately. [Source: ${REGULATORY_CITATIONS.MSA}]` },
        { question: 'What does antenatal benefit cover?', answer: `Antenatal benefits typically cover 8-12 obstetrician visits, blood tests, and 2-4 ultrasounds during your pregnancy. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'Is a C-section covered by medical aid?', answer: `Medically necessary C-sections are covered in full. Elective C-sections may require co-payment or pre-authorization on some plans. [Source: ${REGULATORY_CITATIONS.CMS}]` },
    ],
    'dental-conditions': [
        { question: 'How much dental is covered per year?', answer: `Dental benefits range from R1,500 to R15,000 annually depending on your plan. Some work (like in-hospital wisdom teeth) comes from hospital benefit. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'Is wisdom teeth removal covered by medical aid?', answer: `Basic extractions come from dental benefit. Impacted wisdom teeth requiring general anaesthesia are typically covered from hospital benefit. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'Does medical aid pay for braces?', answer: `Orthodontics often have a lifetime limit of R10,000 to R20,000 for children under 18. Adult orthodontics is rarely covered. [Source: ${REGULATORY_CITATIONS.CMS}]` },
    ],
    'nasal-sinus-conditions': [
        { question: 'Is sinus surgery covered by medical aid?', answer: `FESS and septoplasty are covered when medically indicated. Pre-authorization is required and you may face a day-surgery co-payment. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'What is the waiting period for ENT surgery?', answer: `General waiting period is 3 months. Pre-existing sinus conditions may have a 12-month exclusion for new members. [Source: ${REGULATORY_CITATIONS.MSA}]` },
        { question: 'Will I pay a gap for septoplasty?', answer: `Gaps are common for ENT surgeons charging above scheme tariff. Expect R2,000 to R8,000 depending on the specialist. [Source: ${REGULATORY_CITATIONS.CMS}]` },
    ],
    'cancer-care': [
        { question: 'Is cancer treatment covered by medical aid?', answer: `Cancer is a Prescribed Minimum Benefit. Schemes must cover diagnosis and treatment to a defined extent. This includes chemo, radiation, and surgery. [Source: ${REGULATORY_CITATIONS.PMB}]` },
        { question: 'What is an oncology benefit limit?', answer: `Oncology benefits range from R500,000 to unlimited on comprehensive plans. This covers approved cancer protocols only. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'Is immunotherapy covered by medical aid?', answer: `Biological therapies and immunotherapy are typically covered when part of an approved protocol. Non-approved drugs may require ex-gratia application. [Source: ${REGULATORY_CITATIONS.PMB}]` },
    ],
    'imaging-diagnostics': [
        { question: 'Does medical aid cover MRI scans?', answer: `MRI is covered when medically indicated and pre-authorized. Non-authorized scans may be rejected or subject to 100% co-payment. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'Why is there a gap on radiology?', answer: `Radiologists often charge 200-400% of the scheme tariff. The gap is the difference between their fee and what your scheme pays. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'Is a CT scan a PMB?', answer: `CT scans for PMB conditions (like cancer staging or stroke) are covered. Elective or routine scans may have co-payments. [Source: ${REGULATORY_CITATIONS.PMB}]` },
    ],
    'general-surgery': [
        { question: 'Is appendix surgery covered by medical aid?', answer: `Appendectomy is an emergency procedure and a PMB. It is covered in full at any hospital, even for new members. [Source: ${REGULATORY_CITATIONS.PMB}]` },
        { question: 'What is the co-payment for hernia repair?', answer: `Hernia repair co-payments range from R0 on comprehensive plans to R5,000-R15,000 on hospital plans. Network providers reduce costs. [Source: ${REGULATORY_CITATIONS.CMS}]` },
        { question: 'How do I avoid a surgeon gap?', answer: `Use a surgeon who charges at the scheme tariff or participates in your network. Ask the scheme for a "Tariff Charging" specialist list. [Source: ${REGULATORY_CITATIONS.CMS}]` },
    ],
};

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

    /**
     * Generate condition-specific glossary for Strategy Hub pages
     * Defines technical jargon relevant to the medical condition
     */
    generateConditionGlossary: (conditionSlug: ConditionSlug) => {
        const glossary = CONDITION_GLOSSARY[conditionSlug] || CONDITION_GLOSSARY['general-surgery'];
        const conditionDef = CONDITIONS[conditionSlug];

        // Add regulatory citation to each term
        return glossary.map(item => ({
            term: item.term,
            definition: `${item.definition} [Source: ${REGULATORY_CITATIONS.CMS}]`,
        }));
    },

    /**
     * Generate condition-specific FAQs for People Also Ask sections
     * Targets high-volume, low-competition "jargon" queries
     */
    generateConditionFAQ: (conditionSlug: ConditionSlug) => {
        return CONDITION_FAQS[conditionSlug] || CONDITION_FAQS['general-surgery'];
    },

    /**
     * Generate audit-specific FAQs for Liability Audit pages
     * Clears transactional friction around "hidden cost" fears
     */
    generateAuditFAQ: (conditionSlug: ConditionSlug, schemeName: string, planName: string) => {
        const conditionDef = CONDITIONS[conditionSlug];
        const sourceSuffix = ` [Source: ${REGULATORY_CITATIONS.CMS}]`;

        return [
            {
                question: `What is my out-of-pocket for ${conditionDef.label} on ${planName}?`,
                answer: `Your out-of-pocket depends on the procedure, surgeon fees, and whether you use a DSP provider. The liability waterfall on this page shows the estimated breakdown.${sourceSuffix}`,
            },
            {
                question: `Will I have a gap for the anaesthetist on ${schemeName}?`,
                answer: `Anaesthetist gaps are common across all schemes. Specialists often charge 150-200% of the scheme tariff. Budget R2,000 to R5,000 for most procedures.${sourceSuffix}`,
            },
            {
                question: `Does ${planName} cover ${conditionDef.label} procedures in full?`,
                answer: `PMB-level procedures are covered at DSP facilities. Non-PMB elective procedures may have co-payments shown in the waterfall analysis above.${sourceSuffix}`,
            },
        ];
    },

    generateFAQ: (plan: Plan, persona: Persona) => {
        const sourceSuffix = ` [Source: ${REGULATORY_CITATIONS.CMS}]`;
        const personaContext = persona.meta.title || persona.meta.category;
        const slugRef = persona.slug.slice(-8);

        if (plan.faq && plan.faq.length > 0) {
            return plan.faq.map((faq, index) => ({
                question: `${faq.question} [${personaContext}]`,
                answer: `${faq.answer} Strategy reference: ${slugRef}.`
            }));
        }

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

    generateComparisonSummary: (planA: Plan, planB: Plan, savingsAmount: number) => {
        const winner = savingsAmount > 0 ? planA : planB;
        const savings = Math.abs(savingsAmount);

        // Detect Intra-Scheme Comparison (Same Scheme)
        // e.g., Discovery Classic vs Discovery Essential
        const isSameScheme = planA.identity.scheme_name === planB.identity.scheme_name;

        let headline = `${winner.identity.plan_name} shows lower Total Cost of Care`;
        let subtext = `Actuarial modeling indicates potential annual savings of R${savings.toLocaleString()}`;

        if (isSameScheme) {
            // "Upgrade" scenario: User chose deeper coverage (winner might be more expensive but safer)
            // But here 'winner' is purely mathematical TCO winner.
            // If the cheaper option wins TCO, it's a "Safe Downgrade?"
            // If the expensive option wins TCO (rare, means gap cover is effectively cheaper), it's "Value Upgrade"

            if (savings > 5000) {
                headline = `Potential "Safe Downgrade" Opportunity`;
                subtext = `Switching to ${winner.identity.plan_name} could save R${savings.toLocaleString()} while maintaining core PMB coverage.`;
            } else {
                headline = `Network Efficiency Optimization`;
                subtext = `${winner.identity.plan_name} offers a more efficient structure for this condition.`;
            }
        }

        return {
            headline,
            subtext,
            disclaimer: FINANCIAL_DISCLAIMER,
            citation: `[Source: ${REGULATORY_CITATIONS.CMS}]`,
        };
    },

    /**
     * Generate tailored advice for Upgrade/Downgrade vs Brand Switch
     */
    generateComparisonInsight: (planA: Plan, planB: Plan, conditionSlug: ConditionSlug) => {
        const isSameScheme = planA.identity.scheme_name === planB.identity.scheme_name;
        const conditionDef = CONDITIONS[conditionSlug];

        if (isSameScheme) {
            return {
                type: 'INTRA-SCHEME',
                title: 'Upgrade vs Downgrade Analysis',
                content: `Since both ${planA.identity.plan_name} and ${planB.identity.plan_name} belong to the same scheme, your choice comes down to **Network Freedom vs Premium Savings**. ${planA.network_restriction !== planB.network_restriction ? 'One plan restricts you to specific hospitals.' : ''} Review the **Above Threshold Benefit** differences closely for ${conditionDef.label}.`
            };
        }

        return {
            type: 'CROSS-SCHEME',
            title: 'Scheme Comparison Strategy',
            content: `Comparing **${planA.identity.scheme_name}** vs **${planB.identity.scheme_name}** requires looking at solvency ratios and global rate increases. Ideally, choose the scheme with the most stable risk pool for ${conditionDef.label} patients.`
        };
    },

    generateConditionContent: (conditionName: string, pmbCovered: boolean) => {
        return {
            pmbNotice: pmbCovered
                ? `${conditionName} procedures are covered under Prescribed Minimum Benefits (PMB) regulations. Medical schemes are legally required to cover PMB conditions at cost, subject to treatment protocols. [Source: ${REGULATORY_CITATIONS.PMB}]`
                : `${conditionName} may not be fully covered under PMB regulations. Out-of-pocket costs depend on your specific plan's benefit structure. [Source: ${REGULATORY_CITATIONS.CMS}]`,
            disclaimer: FINANCIAL_DISCLAIMER,
        };
    },

    /**
     * Generate generic comparison FAQs for Gateway Pages
     * Focused on high-level plan selection criteria
     */
    generateGenericComparisonFaqs: (planA: Plan, planB: Plan) => {
        // Cast to any to access properties that might be on the mock object but not strictly on the Plan type
        const pA = planA as any;
        const pB = planB as any;

        return [
            {
                question: `Which plan is cheaper: ${planA.identity.plan_name} or ${planB.identity.plan_name}?`,
                answer: pA.annualPremium < pB.annualPremium
                    ? `${planA.identity.plan_name} has a lower annual premium of R${pA.annualPremium.toLocaleString()}. However, always compare the Medical Savings Account allocation to calculate real value.`
                    : `${planB.identity.plan_name} is more affordable annually at R${pB.annualPremium.toLocaleString()}. Ensure you check if this lower premium comes with restrictive network hospitals.`
            },
            {
                question: `Do I need Gap Cover for ${planA.identity.scheme_name}?`,
                answer: `Yes, Gap Cover is highly recommended. Both ${planA.identity.scheme_name} and ${planB.identity.scheme_name} pay specialists at a set tariff (100% or 200%). Private specialists often charge 300% to 500%, leaving you liable for the shortfall.`
            },
            {
                question: `What is the main difference between ${planA.identity.plan_name} and ${planB.identity.plan_name}?`,
                answer: `The primary difference often lies in the Hospital Network rules and the Savings Account amount. Review the "Sticker Price Battle" above to see the exact MSA difference.`
            }
        ];
    },

    /**
     * Generate generic glossary terms for Gateway Pages
     */
    generateGenericGlossary: () => {
        const sourceSuffix = ` [Source: ${REGULATORY_CITATIONS.CMS}]`;
        return [
            { term: 'Medical Savings Account (MSA)', definition: `A portion of your monthly premium held by the scheme to pay for day-to-day expenses like GP visits and scripts.${sourceSuffix}` },
            { term: 'Gap Cover', definition: `An independent insurance policy that covers the shortfall between what your medical scheme pays and what private doctors charge.${sourceSuffix}` },
            { term: 'Network Hospital', definition: `A list of hospitals designated by the scheme. Using a non-network hospital for elective surgery will result in a co-payment.${sourceSuffix}` },
            { term: 'Prescribed Minimum Benefits (PMB)', definition: `A set of defined benefits to ensure that all medical scheme members have access to certain minimum health services, regardless of the benefit option they have selected.${sourceSuffix}` }
        ];
    }
};
