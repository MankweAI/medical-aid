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

];