// data/plans.ts
import { Plan } from '@/utils/types';

export const PLANS: Plan[] = [
    // 1. BESTMED BEAT 1 NETWORK (The Student Starter)
    {
        id: 'bestmed-beat1-network-2026',
        price: 2269,
        savings_annual: 0,
        identity: {
            scheme_name: 'Bestmed',
            plan_name: 'Beat1',
            plan_series: 'Beat Series',
            plan_type: 'Hospital Plan'
        },
        contributions: [
            {
                pricing_model: 'Fixed',
                pricing_matrix: {
                    main: 2269,
                    adult: 1764,
                    child: 956
                },
                msa_structure: {
                    type: 'None',
                    value: 0
                }
            }
        ],
        network_restriction: 'Network',
        network_details: {
            hospitals: 'Network',
            gps: 'Any',
            specialists: 'Any'
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 0
        },
        limits: {
            oncology: {
                status: 'Limited',
                value: 9999999,
                copay_percentage: 0
            },
            casualty: {
                status: 'No Benefit',
                value: 0
            },
            internal_prosthesis: {
                sublimit: 99764
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 6,
                ultrasounds_2d: 2,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2092,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 0,
            mri_scan: 2600,
            joint_replacement: 'Excluded',
            admission_penalty_non_network: 15025
        },
        gap_cover_rating: 'Mandatory',
        red_flag: 'No out-of-hospital benefits - GP visits and acute medicine for member\'s account',
        faq: [
            {
                question: 'Will I have to pay upfront if I need a colonoscopy or gastroscopy?',
                answer: 'Yes, there is a R2,000 co-payment for each scope procedure (colonoscopy, gastroscopy, cystoscopy, hysteroscopy, sigmoidoscopy). This co-payment does not apply if the procedure is for a Prescribed Minimum Benefit (PMB) condition.'
            },
            {
                question: 'What happens if I go to a hospital that\'s not in the network?',
                answer: 'If you voluntarily choose a non-network hospital on the Beat1 Network option, you will incur a maximum co-payment of R15,025. You can avoid this by selecting the standard (non-network) option at R2,523 per month instead of R2,269.'
            },
            {
                question: 'Will my depression or anxiety medication be covered?',
                answer: 'Only if your condition is listed on the Chronic Disease List (CDL). Beat1 covers only CDL and PMB chronic conditions. Non-CDL chronic medicine has no benefit and must be paid out-of-pocket.'
            },
            {
                question: 'If I need an MRI or CT scan, will I have to pay extra?',
                answer: 'Yes, there is a R2,600 co-payment per scan for MRI, CT, and nuclear/isotope studies. The co-payment does not apply to confirmed PMB conditions. There is also a family annual limit of R20,920 for all specialised imaging combined.'
            },
            {
                question: 'Can I go to my GP for a flu or regular checkup without paying?',
                answer: 'No. Beat1 is a hospital plan - general out-of-hospital GP visits are for your own account. The only GP visits covered are the 6 antenatal consultations during pregnancy, and preventative screenings like Pap smears or PSA tests where the consultation is paid from available benefits.'
            },
            {
                question: 'Do I need to pay anything extra if I have cancer treatment?',
                answer: 'Oncology is covered at 100% Scheme tariff with no annual limit, but Essential ICON protocols apply, meaning you must use designated or preferred oncology providers. If you go outside the ICON network, you may face significant out-of-pocket costs.'
            },
            {
                question: 'If I need a knee or hip replacement, how much will I pay?',
                answer: 'Joint replacement surgery is excluded except for PMB conditions. If it qualifies as a PMB, coverage is limited to R51,686 for knee/shoulder and R41,918 for hip/major joints, subject to the overall prosthesis limit of R99,764 per family per year.'
            },
            {
                question: 'What if I get injured and go to casualty but I\'m not admitted to hospital?',
                answer: 'There is no casualty facility benefit on Beat1. This is a pure hospital plan, so you are only covered if you are admitted to hospital. If you are treated and discharged from the emergency room without admission, the costs are for your own account.'
            }
        ]
    }
    ,

    // 2. BONITAS BONCAP (The Income Banded Starter)
    {
        id: "bonitas-boncap-network-2026",
        price: 1730, // Income Band 1 Rate
        savings_annual: 0,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "BonCap",
            plan_series: "BonCap",
            plan_type: "Capitation"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    { min: 0, max: 11930, main: 1730, adult: 1730, child: 815 },
                    { min: 11931, max: 19350, main: 2111, adult: 2111, child: 971 },
                    { min: 19351, max: 0, main: 4177, adult: 4177, child: 1585 }
                ],
                msa_structure: { type: "None", value: 0 }
            }
        ],
        network_restriction: "Strict Network",
        network_details: {
            hospitals: "BonCap Network",
            gps: "BonCap Network",
            specialists: "Network (Referral Required)"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "Unlimited (Subject to Protocol)"
        },
        limits: {
            oncology: { status: "PMB Only", value: 0 },
            casualty: { status: "No Benefit", value: 0 },
            internal_prosthesis: { sublimit: 0 } // Excluded
        },
        defined_baskets: {
            maternity: { antenatal_consults: 6, ultrasounds_2d: 2, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 0 }
        },
        chronic_conditions: 28,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 2000,
            joint_replacement: "Excluded",
            admission_penalty_non_network: "30%"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Strict Network: You must use specific BonCap GPs and Hospitals. 30% co-payment for non-compliance.",
        faq: [
            { question: "Can I go to any GP?", answer: "No, you must use a GP on the BonCap network. Visits to non-network GPs are for your own account." },
            { question: "Is cancer covered?", answer: "Only Prescribed Minimum Benefit (PMB) cancers are covered, and you must use State facilities or the designated network." }
        ]
    },

    // 3. DISCOVERY CLASSIC SAVER (The Savings Optimised)
    {
        id: "discovery-classic-saver-any-2026",
        price: 4850,
        savings_annual: 11640,
        identity: {
            scheme_name: "Discovery Health",
            plan_name: "Classic Saver",
            plan_series: "Saver Series",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 4850, adult: 3825, child: 1943 },
                msa_structure: { type: "Percentage", value: 20 }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any Private Hospital",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200,
            specialist_out_hospital: 100,
            gp_network_consults: "Paid from Savings"
        },
        limits: {
            oncology: { status: "Unlimited", value: 9999999, copay_percentage: 20 },
            casualty: { status: "Savings", value: 0 },
            internal_prosthesis: { sublimit: 0 }
        },
        defined_baskets: {
            maternity: { antenatal_consults: 8, ultrasounds_2d: 2, paediatrician_visits: 2 },
            preventative: { vaccinations: true, contraceptives: 0 }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 6500, // Day surgery deductible
            scope_out_hospital: 0,
            mri_scan: 3500,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Recommended",
        red_flag: "Day Surgery Deductible: R6,500 upfront if you use a hospital instead of a Day Clinic for scopes.",
        faq: [
            { question: "Does my savings account expire?", answer: "No, unused savings carry over to the next year." },
            { question: "Are specialists covered in full?", answer: "Only up to 200% of the scheme rate. Many specialists charge 300%+, so Gap Cover is recommended." }
        ]
    },

    // 4. FEDHEALTH FLEXIFED SAVVY (The Digital Youth Plan)
    {
        id: "fedhealth-flexifedsavvy-hospital-2026",
        price: 1155,
        savings_annual: 0,
        identity: {
            scheme_name: "Fedhealth",
            plan_name: "flexiFED Savvy",
            plan_series: "flexiFED",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 1155, adult: 1155, child: 495 },
                msa_structure: { type: "None", value: 0 }
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Fedhealth Network",
            gps: "Unlimited Virtual / 3 Physical",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "Unlimited Virtual"
        },
        limits: {
            oncology: { status: "PMB Only", value: 0 },
            casualty: { status: "Trauma Only", value: 3000 },
            internal_prosthesis: { sublimit: 0 }
        },
        defined_baskets: {
            maternity: { antenatal_consults: 0, ultrasounds_2d: 0, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 0 }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "Excluded",
            admission_penalty_non_network: "40%"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Age Restricted (Under 35). Elective C-Section Copay R9,330. Strict Network.",
        faq: [
            { question: "Can I see a doctor in person?", answer: "Yes, but you are limited to 3 face-to-face visits per year. You have unlimited virtual (video) consultations." },
            { question: "What happens when I turn 35?", answer: "You will be migrated to a standard flexiFED plan, which will likely have a higher premium." }
        ]
    }
];