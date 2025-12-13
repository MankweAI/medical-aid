// data/plans.ts
import { Plan } from '@/utils/types';

export const PLANS: Plan[] = [

    {
        id: "bestmed-beat1-network-2026",
        price: 2269,
        savings_annual: 0,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Beat 1 Network",
            plan_series: "Beat Series",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 2269,
                    adult: 1764,
                    child: 956
                },
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 0
        },
        limits: {
            oncology: {
                status: "Unlimited",
                value: 9999999,
                copay_percentage: 0
            },
            casualty: {
                status: "No Benefit",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 51686
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
            joint_replacement: "Excluded",
            admission_penalty_non_network: 15025
        },
        gap_cover_rating: "Mandatory",
        red_flag: "No out-of-hospital benefits. Joint replacements excluded (PMB only). Strict network penalties.",
        faq: [
            {
                question: "Will I have to pay upfront if I need a colonoscopy or gastroscopy?",
                answer: "Yes, there is a R2,000 co-payment for each scope procedure (colonoscopy, gastroscopy, cystoscopy, hysteroscopy, sigmoidoscopy). This co-payment does not apply if the procedure is for a Prescribed Minimum Benefit (PMB) condition."
            },
            {
                question: "What happens if I go to a hospital that's not in the network?",
                answer: "If you voluntarily choose a non-network hospital on the Beat 1 Network option, you will incur a maximum co-payment of R15,025. You can avoid this by selecting the standard (non-network) option at R2,523 per month instead of R2,269."
            },
            {
                question: "Will my depression or anxiety medication be covered?",
                answer: "Only if your condition is listed on the Chronic Disease List (CDL). Beat 1 covers only CDL and PMB chronic conditions. Non-CDL chronic medicine has no benefit and must be paid out-of-pocket."
            },
            {
                question: "If I need an MRI or CT scan, will I have to pay extra?",
                answer: "Yes, there is a R2,600 co-payment per scan for MRI, CT, and nuclear/isotope studies. The co-payment does not apply to confirmed PMB conditions. There is also a family annual limit of R20,920 for all specialised imaging combined."
            },
            {
                question: "Can I go to my GP for a flu or regular checkup without paying?",
                answer: "No. Beat 1 is a hospital plan - general out-of-hospital GP visits are for your own account. The only GP visits covered are the 6 antenatal consultations during pregnancy, and preventative screenings like Pap smears or PSA tests."
            },
            {
                question: "Do I need to pay anything extra if I have cancer treatment?",
                answer: "Oncology is covered at 100% Scheme tariff, but Essential ICON protocols apply, meaning you must use designated or preferred oncology providers. If you go outside the ICON network, you may face significant out-of-pocket costs."
            },
            {
                question: "If I need a knee or hip replacement, how much will I pay?",
                answer: "Joint replacement surgery is excluded except for PMB conditions. If it qualifies as a PMB, coverage is limited to R51,686 for knee/shoulder and R41,918 for hip/major joints, subject to the overall prosthesis limit of R99,764 per family per year."
            },
            {
                question: "What if I get injured and go to casualty but I'm not admitted to hospital?",
                answer: "There is no casualty facility benefit on Beat 1. This is a pure hospital plan, so you are only covered if you are admitted to hospital. If you are treated and discharged from the emergency room without admission, the costs are for your own account."
            }
        ]
    },

    {
        id: "bestmed-beat2-network-2026",
        price: 2775,
        savings_annual: 5328,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Beat2",
            plan_series: "Beat Series",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 2775,
                    adult: 2156,
                    child: 1167
                },
                msa_structure: {
                    type: "Fixed",
                    value: 444
                }
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 0
        },
        limits: {
            oncology: {
                status: "Unlimited",
                value: 9999999,
                copay_percentage: 0
            },
            casualty: {
                status: "Savings",
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
                contraceptives: 2301,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 0,
            mri_scan: 2100,
            joint_replacement: 51686,
            admission_penalty_non_network: 15025
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Emergency casualty paid from savings only - no risk benefit for trauma unit visits",
        faq: [
            {
                question: "Do I have to pay for casualty visits upfront?",
                answer: "Yes. Beat2 does not provide a specific casualty benefit from the Scheme's risk pool. Emergency room visits where a procedure room is used are paid entirely from your medical savings account at 100% Scheme tariff. You must ensure sufficient savings balance or pay the shortfall out-of-pocket."
            },
            {
                question: "What happens if I need a knee replacement?",
                answer: "Joint replacement surgery is excluded except for PMB conditions. If your knee replacement qualifies as a PMB, the prosthesis is subject to the overall family prosthesis limit of R99,764 per year, with a specific sub-limit of R51,686 for knee and shoulder replacements. Hip and other major joints have a sub-limit of R41,918."
            },
            {
                question: "Will my depression medication be covered?",
                answer: "Only if depression qualifies as a Prescribed Minimum Benefit (PMB) condition. Beat2 covers CDL and PMB chronic medicines only - the plan lists 27 CDL conditions including Bipolar Disorder and Schizophrenia. Non-CDL chronic conditions receive no benefit. Depression medication would need PMB authorization or be paid from savings."
            },
            {
                question: "Do I pay upfront if I need a gastroscopy?",
                answer: "Yes, there is a R2,000 co-payment for gastroscopies and colonoscopies unless the procedure relates to a confirmed PMB condition. Additionally, if the scope is performed in an acute hospital rather than a day hospital, a R2,872 day-procedure co-payment applies."
            },
            {
                question: "What if I use a hospital outside the network?",
                answer: "If you have selected the Beat2 Network option and voluntarily choose a non-network hospital, you will incur a R15,025 co-payment. The network option requires you to use specific contracted hospitals - the standard option allows any hospital but costs R309 more per month (R3,084 vs R2,775)."
            },
            {
                question: "Am I covered for cancer treatment?",
                answer: "Yes. Oncology is covered at 100% Scheme tariff with no annual limit stated, subject to Essential ICON protocols, pre-authorization, and use of designated or preferred service providers. However, biological medicine during hospitalization is limited to R18,215 per family per year."
            },
            {
                question: "Will I need to pay extra for an MRI scan?",
                answer: "Yes. MRI scans have a combined in-hospital and out-of-hospital limit of R23,012 per family per year, plus a R2,100 co-payment per scan. The co-payment does not apply if the scan is for a confirmed PMB condition. PET scans are only covered for PMBs."
            },
            {
                question: "Does the plan cover my child's paediatrician visits after birth?",
                answer: "Paediatrician visits are not specifically listed as a risk benefit for postnatal care. The maternity benefit covers 6 antenatal consultations and 2 ultrasounds during pregnancy, plus confinement at 100% Scheme tariff. Postnatal paediatrician consults would be paid from your medical savings account."
            },
            {
                question: "Can I see any GP or do I need to use a network doctor?",
                answer: "You can see any GP - there is no nominated GP requirement on Beat2. However, GP consultations including emergency unit visits are paid from your savings account, not from the Scheme's risk benefit. Members on the network option must use Scheme-contracted pharmacies and network hospitals."
            },
            {
                question: "What if my savings run out mid-year?",
                answer: "Once your medical savings account (R5,328 annual allocation for main member on network option) is depleted, you pay out-of-pocket for day-to-day expenses like GP visits, specialist consultations, acute medication, and basic pathology. Only specific risk benefits (like in-hospital procedures, oncology, dialysis, and PMB conditions) continue without affecting savings."
            }
        ]
    },

    {
        id: "bestmed-beat3-network-2026",
        price: 4062,
        savings_annual: 7308,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Beat3",
            plan_series: "Beat",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 4062,
                    adult: 2898,
                    child: 1434
                },
                msa_structure: {
                    type: "Fixed",
                    value: 609
                }
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Any",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: 0
        },
        limits: {
            oncology: {
                status: "Unlimited",
                value: 9999999,
                copay_percentage: 0
            },
            casualty: {
                status: "Savings",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 100818
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 9,
                ultrasounds_2d: 2,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2510,
                wellness_screening: true
            }
        },
        chronic_conditions: 32,
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 0,
            mri_scan: 2000,
            joint_replacement: 0,
            admission_penalty_non_network: 15025
        },
        gap_cover_rating: "Recommended",
        red_flag: "Internal prosthesis limits are strict (e.g., R42,221 for hip prosthesis sub-limit) despite the overall family limit of R100,818.",
        faq: [
            {
                question: "What happens if I use a non-network hospital?",
                answer: "If you voluntarily use a hospital outside the Beat Network, you will be liable for a co-payment of R15,025, unless it is a medical emergency."
            },
            {
                question: "Is my emergency room visit covered by the scheme?",
                answer: "No, casualty and emergency room visits are paid from your Savings Account. There is no separate risk benefit for this unless you are admitted."
            },
            {
                question: "Do I have to pay upfront for a gastroscopy or colonoscopy?",
                answer: "Yes, there is a procedure-specific co-payment of R2,000 for scopes (gastroscopies, colonoscopies, etc.). However, this may be waived if performed in a doctor's rooms."
            },
            {
                question: "How much cover do I have for a hip replacement?",
                answer: "While the overall family limit for internal prosthesis is R100,818, a specific sub-limit of R42,221 applies to the hip prosthesis itself."
            },
            {
                question: "Are my contraceptives covered?",
                answer: "Yes, female contraceptives are covered up to R2,510 per beneficiary per annum (for oral/injectable/implantable) or R3,795 for an IUD every 5 years."
            },
            {
                question: "Is there a co-payment for MRI or CT scans?",
                answer: "Yes, a co-payment of R2,000 applies per scan, unless it is for a confirmed Prescribed Minimum Benefit (PMB) condition."
            },
            {
                question: "Does this plan cover biological medicines?",
                answer: "Yes, biological medicine during hospitalisation is covered at 100% Scheme tariff, but limited to R24,286 per family per annum."
            },
            {
                question: "Are day-to-day GP visits covered by the scheme risk?",
                answer: "No, GP consultations are paid from your Savings Account. Once your savings are depleted, you must pay out-of-pocket."
            }
        ]
    },

    {
        id: "bestmed-beat3-plus-any-2026",
        price: 5042,
        savings_annual: 15132,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Beat3 Plus",
            plan_series: "Beat Series",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 5042,
                    adult: 3746,
                    child: 1902
                },
                msa_structure: {
                    type: "Fixed",
                    value: 15132
                }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 0
        },
        limits: {
            oncology: {
                status: "Unlimited",
                value: 9999999,
                copay_percentage: 0
            },
            casualty: {
                status: "Savings",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 100818
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 9,
                ultrasounds_2d: 2,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2510,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 2000,
            mri_scan: 2000,
            joint_replacement: 52241,
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Recommended",
        red_flag: "Joint replacement excluded except PMBs - up to R52,241 co-pay applies",
        faq: [
            {
                question: "Do I need to pay upfront for a colonoscopy or gastroscopy?",
                answer: "Yes, there is a R2,000 co-payment per scope procedure (colonoscopy, gastroscopy, cystoscopy, hysteroscopy, or sigmoidoscopy) unless your condition qualifies as a Prescribed Minimum Benefit (PMB). The co-payment does not apply to confirmed PMB cases."
            },
            {
                question: "Will I be covered if I need a knee replacement?",
                answer: "Joint replacement surgery is excluded on Beat3 Plus except for PMB conditions. If your knee replacement qualifies as a PMB, it will be covered but subject to prosthesis limits of R52,241 for knee and shoulder replacements. Hip and other major joints have a limit of R42,221."
            },
            {
                question: "Are my emergency room visits covered or do they come from my savings?",
                answer: "Emergency unit visits where a procedure room was used are paid from your savings account, not from Scheme risk. This means you'll deplete your Medical Savings Account (MSA) when visiting casualty facilities. In-hospital admissions for emergencies are covered from risk."
            },
            {
                question: "What happens if I need an MRI or CT scan?",
                answer: "MRI and CT scans are covered at 100% Scheme tariff with a combined in-hospital and out-of-hospital family limit of R36,610 per year. You will pay a R2,000 co-payment per scan unless your condition is a confirmed PMB. Pre-authorisation is required."
            },
            {
                question: "Will my depression or anxiety medication be covered?",
                answer: "Only if your mental health condition is on the Chronic Disease List (CDL). Beat3 Plus covers 27 CDL conditions including bipolar disorder and schizophrenia, but does not include depression or generalized anxiety disorder. You would need to pay for these medications from your savings account."
            },
            {
                question: "Is my oncology treatment fully covered if I get cancer?",
                answer: "Yes, oncology is covered at 100% Scheme tariff with no annual limit, but you must use designated or preferred service providers and follow Essential ICON protocols. Pre-authorisation is mandatory for all cancer treatment."
            },
            {
                question: "Can I use any GP or do I have to choose from a network?",
                answer: "You can use any GP of your choice - there is no network restriction on Beat3 Plus. However, all GP consultations are paid from your savings account at 100% Scheme tariff, not from Scheme risk."
            },
            {
                question: "What if my savings run out before the end of the year?",
                answer: "Once your R15,132 annual savings account is depleted, you'll pay out-of-pocket for day-to-day expenses like GP visits, specialist consultations, basic pathology, and acute medication until the next year. Your in-hospital benefits and chronic medication (CDL) continue to be covered from Scheme risk."
            },
            {
                question: "Do I have to pay anything extra if I go to a day clinic instead of a full hospital?",
                answer: "If your day procedure is done in a day hospital by a DSP provider, there's no additional co-payment. However, if the day procedure is done in an acute hospital that is not a day hospital, you'll pay a R2,872 co-payment per event unless arranged with the Scheme beforehand."
            },
            {
                question: "Are my chronic medications for high blood pressure and diabetes fully covered?",
                answer: "Yes, both hypertension (CDL 20) and diabetes mellitus type 1 and 2 (CDL 12, 13) are on the CDL list. CDL and PMB chronic medications are covered at 100% Scheme tariff with unlimited funding from Scheme risk. There is a 30% co-payment for non-formulary medications."
            }
        ]
    },

    {
        id: "bestmed-beat4-any-2026",
        price: 7365,
        savings_annual: 12372,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Beat4",
            plan_series: "Beat Series",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 7365,
                    adult: 6082,
                    child: 1821
                },
                msa_structure: {
                    type: "Fixed",
                    value: 12372
                }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited from savings then day-to-day"
        },
        limits: {
            oncology: {
                status: "Unlimited",
                value: 9999999,
                copay_percentage: 0
            },
            casualty: {
                status: "Savings",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 123064
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 9,
                ultrasounds_2d: 2,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2801,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 2000,
            mri_scan: 2000,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Optional",
        red_flag: "Casualty paid from savings - no dedicated emergency benefit from risk",
        faq: [
            {
                question: "Do I have to pay for emergency room visits upfront from my own pocket?",
                answer: "Yes. On Beat4, casualty and emergency room visits are paid from your medical savings account first, then from day-to-day benefits. There is no dedicated casualty benefit paid from scheme risk. If you've exhausted your savings early in the year, you'll need to use your vested savings or pay out of pocket until day-to-day limits kick in."
            },
            {
                question: "Will I get stuck with a R2,000 bill every time I need an MRI or CT scan?",
                answer: "Yes, there is a R2,000 co-payment per MRI or CT scan. However, this co-payment does not apply if the scan is for a confirmed Prescribed Minimum Benefit (PMB) condition. The combined in- and out-of-hospital benefit for specialised imaging is limited to R41,840 per family per year."
            },
            {
                question: "Are my antidepressant medications covered if I have major depression?",
                answer: "Yes, but with limits. Major depression is classified as a Non-CDL chronic condition. Medication is covered at 90% Scheme tariff with a limit of R9,571 for a single member or R19,143 for a family per year. Once this non-CDL limit is depleted, approved major depression medicine will continue to be paid from Scheme risk."
            },
            {
                question: "How much will I pay out of pocket if I need a knee replacement?",
                answer: "Knee replacements are excluded unless they qualify as Prescribed Minimum Benefits (PMBs). If your knee replacement is a PMB, the prosthesis is limited to R58,086 and must fit within the overall family prosthesis limit of R123,064 per year. Non-PMB joint replacements are not covered."
            },
            {
                question: "Do I need to use a specific hospital network or can I go anywhere?",
                answer: "You can use any private hospital in South Africa. Beat4 does not restrict you to a specific network. However, Designated Service Providers (DSPs) and Preferred Providers apply for certain benefits, and using non-DSPs may result in reduced cover or co-payments for specific procedures."
            },
            {
                question: "What happens if I need a gastroscopy or colonoscopy in hospital?",
                answer: "You will incur a R2,000 co-payment for colonoscopies and R2,000 for gastroscopies. This co-payment does not apply if the procedure is for a confirmed PMB condition. The procedure itself is covered at 100% Scheme tariff, subject to pre-authorisation."
            },
            {
                question: "Is cancer treatment fully covered or will I hit a limit?",
                answer: "Cancer treatment (oncology) is covered at 100% Scheme tariff with no annual limit, subject to Essential ICON protocols, pre-authorisation, and use of designated or preferred service providers. However, biological medicine during hospitalisation is limited to R30,357 per family per year."
            },
            {
                question: "If I have a day procedure done at a regular hospital instead of a day clinic, will I be charged extra?",
                answer: "Yes. A co-payment of R2,872 will be incurred per event if a day procedure is performed in an acute hospital that is not a day hospital. However, if you use a DSP who does not work in a day hospital and arrange it with the Scheme beforehand, the co-payment will not apply."
            },
            {
                question: "Can I use my savings account to buy vitamins and over-the-counter medication?",
                answer: "Yes, but with conditions. The default option provides a R1,214 over-the-counter (OTC) limit per family. Alternatively, you can choose to access your full savings for OTC purchases after the R1,214 limit through a self-payment gap accumulation option. Only vitamins, sunscreen, and minerals with NAPPI codes on the Scheme formulary are covered."
            },
            {
                question: "What happens to my medical savings if I don't use it all this year?",
                answer: "All unused funds in your annual medical savings account at the end of the year will be carried over to your vested savings account after 5 months and will remain your property. Vested savings are only used when both your annual savings and Scheme risk benefits are depleted."
            }
        ]
    },

    {
        id: "bestmed-pace1-any-2026",
        price: 5934,
        savings_annual: 13524,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Pace1",
            plan_series: "Pace",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 5934,
                    adult: 4289,
                    child: 1541
                },
                msa_structure: {
                    type: "Fixed",
                    value: 1127
                }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited from savings/day-to-day"
        },
        limits: {
            oncology: {
                status: "Unlimited",
                value: 9999999,
                copay_percentage: 0
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 114189
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 9,
                ultrasounds_2d: 2,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2801,
                wellness_screening: true
            }
        },
        chronic_conditions: 51,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 2000,
            joint_replacement: "Covered with sub-limits (Hip R42,369 | Knee/Shoulder R56,344)",
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Optional",
        red_flag: "MRI scans have R2,000 co-payment per scan (PMBs excluded)",
        faq: [
            {
                question: "Will I have to pay out-of-pocket for my MRI or CT scan?",
                answer: "Yes. The plan charges a R2,000 co-payment per MRI, CT, or nuclear/isotope scan, even though the plan covers 100% Scheme tariff. This co-pay does not apply if the scan is confirmed as a Prescribed Minimum Benefit (PMB). The annual family limit for all specialised imaging combined is R41,840."
            },
            {
                question: "Is my depression medication covered?",
                answer: "Yes. Major depression is classified as a Non-CDL chronic condition (Non-CDL 6), meaning medication is covered at 90% Scheme tariff with an annual limit of R8,414 for a member (R16,827 for member and family). Once this limit is depleted, approved chronic claims continue from Scheme risk. A 25% co-payment applies to non-formulary medicine."
            },
            {
                question: "Can I use any hospital or am I restricted to a network?",
                answer: "You can use any hospital in South Africa. Pace1 is an 'Any' provider plan with no network restrictions. All in-hospital benefits are paid at 100% Scheme tariff without penalties for using non-network facilities."
            },
            {
                question: "What happens if I need a knee replacement?",
                answer: "Knee and shoulder replacements are covered at 100% Scheme tariff with a prosthesis sub-limit of R56,344 per family per annum. This sub-limit forms part of the overall internal prosthesis limit of R114,189. Joint replacement surgery (except PMBs) requires the use of preferred providers, otherwise limits and co-payments apply."
            },
            {
                question: "Do I pay upfront for a gastroscopy or colonoscopy?",
                answer: "No co-payment is required for in-hospital or out-of-hospital scope procedures (gastroscopy/colonoscopy) on this plan. However, if the day procedure is done in an acute hospital instead of a day hospital, a R2,872 co-payment applies per event unless arranged with the Scheme beforehand using a Designated Service Provider (DSP)."
            },
            {
                question: "How much do I pay for day-to-day doctor visits?",
                answer: "GP, nurse, and specialist consultations are paid from your Medical Savings Account first, then from the day-to-day benefit at 100% Scheme tariff. The annual limit is R2,840 for a member or R5,710 for member and family, subject to the overall day-to-day limit of R13,794 (member) or R27,586 (member and family)."
            },
            {
                question: "Will cancer treatment bankrupt me?",
                answer: "No. Oncology is covered at 100% Scheme tariff with unlimited annual cover, subject to pre-authorisation and Essential ICON protocols. Designated or preferred service providers must be used. Both in-hospital and out-of-hospital oncology treatment is covered without an annual Rand limit."
            },
            {
                question: "What if I run out of savings before the end of the year?",
                answer: "Once your annual Medical Savings Account (R1,127/month = R13,524/year) is depleted, out-of-hospital benefits are paid from the day-to-day benefit at 100% Scheme tariff (subject to sub-limits). After the day-to-day benefit is exhausted, you can access vested savings. Any unused savings transfer to a vested account after 5 months and remain your property."
            },
            {
                question: "Are my children covered for vaccinations?",
                answer: "Yes. All paediatric immunisations are covered according to the state-recommended programme. Additional preventative care includes flu vaccines (1 per beneficiary per year), pneumonia vaccines (as per Department of Health schedule), and HPV vaccinations for females aged 9-26 (3 vaccinations per beneficiary). Travel vaccines for typhoid, yellow fever, tetanus, meningitis, hepatitis, and cholera are also funded from Scheme risk."
            },
            {
                question: "Can I use a non-network specialist without penalties?",
                answer: "Yes. The plan allows you to use any specialist (in-hospital or out-of-hospital) without network restrictions or penalties. Specialist consultations in-hospital are covered at 100% Scheme tariff. Out-of-hospital specialist visits are paid from savings first, then from the day-to-day consultation benefit (limited to R2,840 member / R5,710 member+family), at 100% Scheme tariff."
            }
        ]
    },

    {
        id: "bestmed-pace2-any-2026",
        price: 8766,
        savings_annual: 14724,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Pace2",
            plan_series: "Pace Series",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 8766,
                    adult: 8596,
                    child: 1933
                },
                msa_structure: {
                    type: "Fixed",
                    value: 14724
                }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Limited to R5 260"
        },
        limits: {
            oncology: {
                status: "Unlimited",
                value: 9999999,
                copay_percentage: 0
            },
            casualty: {
                status: "Savings",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 146642
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 9,
                ultrasounds_2d: 2,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2801,
                wellness_screening: true
            }
        },
        chronic_conditions: 47,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 1500,
            joint_replacement: 0,
            admission_penalty_non_network: 2872
        },
        gap_cover_rating: "Recommended",
        red_flag: "Casualty visits paid from Savings; Biological medicine limited to R210k; Day procedures in acute hospitals attract R2,872 co-pay.",
        faq: [
            {
                question: "Do I have to pay upfront for an MRI scan?",
                answer: "Yes, there is a co-payment of R1,500 per scan, unless it is a confirmed PMB condition."
            },
            {
                question: "Is there a limit on how much the scheme pays for hip replacements?",
                answer: "Yes, while the overall family prosthesis limit is R146,642, hip replacements specifically are sub-limited to R66,033."
            },
            {
                question: "Will I be charged if I have a day procedure like a gastroscopy in a normal hospital?",
                answer: "Yes, a co-payment of R2,872 applies if a day procedure is performed in an acute hospital instead of a day hospital."
            },
            {
                question: "Is my depression medication covered?",
                answer: "Yes, Major Depression is covered under the Non-CDL benefit (20 conditions), subject to an annual limit of R11,488 for a main member."
            },
            {
                question: "Does the plan cover travel vaccines?",
                answer: "Yes, mandatory travel vaccines for typhoid, yellow fever, tetanus, meningitis, hepatitis, and cholera are covered from Scheme risk."
            },
            {
                question: "How much is allocated to my Medical Savings Account?",
                answer: "For a main member, R14,724 is allocated annually to the savings account for day-to-day expenses."
            },
            {
                question: "Are contraceptives covered under the preventative benefit?",
                answer: "Yes, oral, injectable, or implantable contraceptives are covered up to R2,801 per beneficiary per annum."
            },
            {
                question: "Is there a limit on internal prosthetics like pacemakers?",
                answer: "Yes, pacemakers are limited to R79,255, subject to the overall prosthesis limit of R146,642."
            }
        ]
    },

    {
        id: "bestmed-pace3-any-2026",
        price: 10064,
        savings_annual: 16908,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Pace 3",
            plan_series: "Pace",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 10064,
                    adult: 8101,
                    child: 1731
                },
                msa_structure: {
                    type: "Fixed",
                    value: 16908
                }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Subject to Limit"
        },
        limits: {
            oncology: {
                status: "Unlimited",
                value: 9999999,
                copay_percentage: 0
            },
            casualty: {
                status: "Savings",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 147394
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 9,
                ultrasounds_2d: 2,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2801,
                wellness_screening: true
            }
        },
        chronic_conditions: 47,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 1500,
            joint_replacement: 0,
            admission_penalty_non_network: 2872
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Specialists paid at 100% Scheme Tariff creates significant shortfall risk.",
        faq: [
            {
                question: "Is there a penalty if I have a gastroscopy in a normal hospital?",
                answer: "Yes. You will be charged a co-payment of R2,872 if you choose to have a day procedure (like a scope) in an acute hospital instead of a Day Hospital."
            },
            {
                question: "Does the plan cover MRI scans in full?",
                answer: "No. While covered at 100% of Scheme tariff, you must pay a R1,500 co-payment per scan, unless it is for a Prescribed Minimum Benefit (PMB) condition."
            },
            {
                question: "Do I have unlimited cancer cover?",
                answer: "Yes, oncology is covered at 100% of Scheme tariff, but you must strictly adhere to the ICON Network protocols to avoid out-of-pocket costs."
            },
            {
                question: "Will the scheme pay for my emergency room visit?",
                answer: "Only if you have funds available. Casualty visits are paid from your Medical Savings Account (Savings) first, not from the Scheme's risk benefit."
            },
            {
                question: "Is there a limit on hip or knee replacements?",
                answer: "Yes. Internal prostheses are limited to R147,394 per family, with specific sub-limits of R66,108 for hips and R77,001 for knees."
            },
            {
                question: "Does Pace 3 cover depression medication?",
                answer: "Yes. Major depression is covered as one of the 20 Non-CDL chronic conditions, subject to the non-CDL chronic medicine limit of R17,654 (Member) or R35,310 (Family)."
            },
            {
                question: "How many pregnancy scans can I get?",
                answer: "The plan covers two 2D ultrasound scans: one in the first trimester (10-12 weeks) and one in the second trimester (20-24 weeks)."
            },
            {
                question: "Do I have to use a specific network for glasses?",
                answer: "Yes. The optometry benefit uses the PPN Network. If you use a non-network provider, your consultation refund is capped at R420 and you may face significant co-payments on lenses."
            }
        ]
    },

    {
        id: "bestmed-pace4-any-2026",
        price: 12572,
        savings_annual: 4524,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Pace 4",
            plan_series: "Pace Series",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 12572,
                    adult: 12572,
                    child: 2945
                },
                msa_structure: {
                    type: "Fixed",
                    value: 377
                }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Subject to Day-to-Day Limit"
        },
        limits: {
            oncology: {
                status: "Unlimited",
                value: 9999999,
                copay_percentage: 0
            },
            casualty: {
                status: "Savings",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 170081
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 9,
                ultrasounds_2d: 2,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2801,
                wellness_screening: true
            }
        },
        chronic_conditions: 56,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 1500,
            joint_replacement: 0,
            admission_penalty_non_network: 2872
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Specialists covered at 100% Scheme Tariff; significant shortfalls likely against market rates.",
        faq: [
            {
                question: "What is the 2026 monthly cost for the Main Member on Bestmed Pace 4?",
                answer: "The monthly contribution for a Main Member in 2026 is R12,572."
            },
            {
                question: "Is there a co-payment for MRI scans on Pace 4?",
                answer: "Yes, there is a R1,500 co-payment per scan, unless it is a confirmed PMB condition."
            },
            {
                question: "Does Bestmed Pace 4 restrict me to a specific hospital network?",
                answer: "No, you can use any hospital, but day procedures should be done in a Day Hospital to avoid a R2,872 co-payment."
            },
            {
                question: "What is the annual limit for internal prosthesis like hip replacements?",
                answer: "The overall family limit for internal prosthesis is R170,081 per year, with specific sub-limits for joints (e.g., R88,120 for knees)."
            },
            {
                question: "Are contraceptives covered on this plan?",
                answer: "Yes, oral/injectable contraceptives are covered up to R2,801 per beneficiary per year, or IUDs up to R4,225 every 5 years."
            },
            {
                question: "How much medical savings do I get per year?",
                answer: "For a single member, the annual Medical Savings Account allocation is R4,524 (R377 per month)."
            },
            {
                question: "Is there a separate benefit for casualty or emergency room visits?",
                answer: "No, emergency unit visits are paid from your day-to-day benefits/savings and are subject to the family limit of R7,137 (Member only)."
            },
            {
                question: "Does the plan cover chronic conditions beyond the basic 27 PMBs?",
                answer: "Yes, Bestmed Pace 4 covers 56 chronic conditions in total (27 CDL + 29 Non-CDL conditions)."
            }
        ]
    },

    {
        id: "bestmed-rhythm1-network-2026",
        price: 1736,
        savings_annual: 0,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Rhythm1",
            plan_series: "Rhythm",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    {
                        min: 0,
                        max: 9000,
                        main: 1736,
                        adult: 1736,
                        child: 715
                    },
                    {
                        min: 9001,
                        max: 14000,
                        main: 2024,
                        adult: 2024,
                        child: 860
                    },
                    {
                        min: 14001,
                        max: 999999,
                        main: 3615,
                        adult: 3615,
                        child: 1873
                    }
                ]
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Referral Required"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 0
            },
            casualty: {
                status: "PMB Only",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 67162
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
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: 15025
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Strict Network rules with high penalties (R15,025) and PMB-only coverage for Oncology and Casualty.",
        faq: [
            {
                question: "Can I go to any doctor I want?",
                answer: "No, you must use a Bestmed Rhythm Network GP. If you use a non-network doctor, you will be liable for the costs unless it is a PMB emergency."
            },
            {
                question: "Do I need a referral to see a specialist?",
                answer: "Yes, you must visit your Rhythm Network GP first to get a referral to a Rhythm Specialist DSP."
            },
            {
                question: "What happens if I use a hospital that isn't on the network list?",
                answer: "Voluntary use of a non-DSP hospital will result in a co-payment of R15,025, except in cases of emergency."
            },
            {
                question: "Is my cancer treatment covered fully?",
                answer: "Cancer treatment is limited to Prescribed Minimum Benefits (PMB) level of care only. You do not have comprehensive oncology benefits beyond state-mandated minimums."
            },
            {
                question: "Do I have to pay for contraceptives?",
                answer: "No, female contraceptives are covered up to R2,092 per year (oral/injectable/implantable) or R3,295 for an IUD every 5 years."
            },
            {
                question: "Is there a limit on hip replacements?",
                answer: "Yes, while the overall family prosthesis limit is R67,162, hip replacements have a specific sub-limit of R34,107."
            },
            {
                question: "Do I have to pay upfront for a gastroscopy?",
                answer: "Yes, a co-payment of R2,000 applies to gastroscopies and colonoscopies."
            },
            {
                question: "Are emergency room visits covered if I am not admitted?",
                answer: "No, casualty visits are only covered if they are for a PMB condition. There is no general casualty benefit for minor injuries."
            }
        ]
    },

    {
        id: "bestmed-rhythm2-network-2026",
        price: 2747,
        savings_annual: 0,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Rhythm2",
            plan_series: "Rhythm",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    {
                        min: 0,
                        max: 5500,
                        main: 2747,
                        adult: 2610,
                        child: 1653
                    },
                    {
                        min: 5501,
                        max: 8500,
                        main: 3300,
                        adult: 3000,
                        child: 1759
                    },
                    {
                        min: 8501,
                        max: 999999,
                        main: 3516,
                        adult: 3165,
                        child: 1759
                    }
                ],
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "Rhythm Network (NHN + Mediclinic DSP)",
        network_details: {
            hospitals: "Network",
            gps: "Nominated",
            specialists: "Referral Required"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "Unlimited",
                value: 9999999,
                copay_percentage: 0
            },
            casualty: {
                status: "Risk",
                value: 1802
            },
            internal_prosthesis: {
                sublimit: 67162
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 9,
                ultrasounds_2d: 2,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2301,
                wellness_screening: true
            }
        },
        chronic_conditions: 44,
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 2000,
            mri_scan: 2600,
            joint_replacement: "Covered with sub-limits (Hip R34,107 | Knee/Shoulder R43,122)",
            admission_penalty_non_network: 15025
        },
        gap_cover_rating: "Mandatory",
        red_flag: "R15,025 penalty for voluntary use of non-DSP hospital (network lock-in)",
        faq: [
            {
                question: "What happens if I go to a non-network hospital voluntarily?",
                answer: "You will face a R15,025 co-payment per hospital admission if you voluntarily use a non-DSP hospital (except in emergencies). The DSP hospital network consists of National Hospital Network (NHN) and Mediclinic (MC) hospitals. In emergencies at non-DSP hospitals, you must be stabilised and then transferred to the closest DSP hospital via Netcare 911."
            },
            {
                question: "Can I see any doctor I want?",
                answer: "No. You must use Rhythm General Practitioners (GPs) exclusively. The Rhythm GP will refer you to a Rhythm Specialist DSP if specialist consultation is required. Out-of-network GP visits are limited to R1,802 per family per year for casualty/emergency visits only. You cannot freely choose your own doctors outside the network."
            },
            {
                question: "Is my depression medication covered?",
                answer: "No. Depression is not listed in the CDL (Chronic Disease List) or PMB chronic conditions covered by Rhythm2. Only the 27 CDL conditions and 17 PMB chronic conditions are covered. Non-CDL conditions like major depression, ADHD, severe acne, and migraine prophylaxis are not funded on this plan."
            },
            {
                question: "Do I have to pay upfront for a colonoscopy or gastroscopy?",
                answer: "Yes. Colonoscopies, gastroscopies, cystoscopies, hysteroscopies, and sigmoidoscopies all have a R2,000 co-payment per procedure. This co-payment does not apply if the procedure is confirmed as a Prescribed Minimum Benefit (PMB) condition. The co-payment applies to both in-hospital and out-of-hospital scope procedures."
            },
            {
                question: "Will I have to pay out-of-pocket for my MRI or CT scan?",
                answer: "Yes. The plan charges a R2,600 co-payment per MRI, CT, or nuclear/isotope scan, even though the plan covers 100% Scheme tariff. This co-pay does not apply if the scan is confirmed as a Prescribed Minimum Benefit (PMB). The annual family limit for all specialised imaging combined is R18,828. PET scans are excluded except for PMBs."
            },
            {
                question: "What if I need a knee replacement?",
                answer: "Knee and shoulder replacements are covered at 100% Scheme tariff with a prosthesis sub-limit of R43,122 per family per annum (for PMBs). This sub-limit forms part of the overall internal prosthesis limit of R67,162. Joint replacement surgery is excluded except for PMB conditions, and you must use preferred providers or face additional limits and co-payments."
            },
            {
                question: "Can I go to a casualty room if I'm injured outside the network area?",
                answer: "Yes, but with strict limits. Out-of-network GP visits and casualty visits are limited to R1,802 per family per year. This includes basic radiology, pathology, and medicine received during the casualty visit. You must pay upfront and claim reimbursement using an out-of-network claim form. Once the R1,802 limit is reached, all costs are for your own account."
            },
            {
                question: "Are my children's vaccinations covered?",
                answer: "Yes. All paediatric immunisations are covered according to the state-recommended programme. Additional preventative care includes flu vaccines (1 per beneficiary per year at Rhythm Network GP or pharmacy), pneumonia vaccines (as per Department of Health schedule), and HPV vaccinations for females aged 9-26 (3 vaccinations per beneficiary). Travel vaccines are also covered."
            },
            {
                question: "What if I need arthroscopic knee surgery?",
                answer: "Arthroscopic procedures have a R3,660 co-payment per event. This also applies to back and neck surgery (R3,660) and laparoscopic procedures (R3,660). These co-payments do not apply if the procedure is for a confirmed PMB condition. All surgeries must be pre-authorised and performed at DSP hospitals."
            },
            {
                question: "Do I get a Medical Savings Account?",
                answer: "No. Rhythm2 has no Medical Savings Account (MSA). This is a network-based plan where out-of-hospital benefits are paid directly from Scheme risk at 100% Scheme tariff, subject to network protocols. GP consultations are unlimited, and most day-to-day services are covered through the Rhythm Network Providers without using savings."
            }
        ]
    },
    {
        id: "bonitas-boncap-network-2026",
        price: 1730,
        savings_annual: 0,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "BonCap",
            plan_series: "BonCap",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    {
                        min: 0,
                        max: 11930,
                        main: 1730,
                        adult: 1730,
                        child: 815
                    },
                    {
                        min: 11931,
                        max: 19350,
                        main: 2111,
                        adult: 2111,
                        child: 971
                    },
                    {
                        min: 19351,
                        max: 25170,
                        main: 3404,
                        adult: 3404,
                        child: 1288
                    },
                    {
                        min: 25171,
                        max: 999999,
                        main: 4177,
                        adult: 4177,
                        child: 1585
                    }
                ],
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Referral Required"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 0
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 0,
                ultrasounds_2d: 2,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 1330,
                wellness_screening: true
            }
        },
        chronic_conditions: 28,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 1230,
            joint_replacement: "Excluded",
            admission_penalty_non_network: "30% Co-payment"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Joint replacement surgery is EXCLUDED. Strict network rules apply for all providers.",
        faq: [
            {
                question: "Is joint replacement surgery covered?",
                answer: "No, joint replacement surgery is explicitly listed as an exclusion on this plan."
            },
            {
                question: "Can I go to any GP?",
                answer: "No, you must use a BonCap Network GP. One out-of-network visit is allowed per beneficiary with a 30% co-payment unless it is a PMB."
            },
            {
                question: "Do I need a referral to see a specialist?",
                answer: "Yes, you must obtain a referral from a BonCap Network GP to see a specialist, and pre-authorisation is required."
            },
            {
                question: "Is there a co-payment for MRI scans?",
                answer: "Yes, there is a R1,230 co-payment per scan event, unless it is for a Prescribed Minimum Benefit (PMB) condition."
            },
            {
                question: "What happens if I use a non-network hospital?",
                answer: "You will be liable for a 30% co-payment on the hospital account, except in cases of emergency."
            },
            {
                question: "Are there limits on acute medication?",
                answer: "Yes, GP-referred acute medicine is limited to R2,390 for a single member, increasing with family size."
            },
            {
                question: "Is depression covered as a chronic condition?",
                answer: "Yes, Depression is covered as the 28th chronic condition, with medication cover limited to R165 per beneficiary per month."
            },
            {
                question: "How does the casualty benefit work?",
                answer: "You are covered for 2 emergency consultations per family at a casualty ward. If the visit is not classified as an emergency, it will be paid from your day-to-day GP benefit."
            },
            {
                question: "Are contraceptives covered?",
                answer: "Yes, contraceptives are covered up to R1,330 per family, but you must use a Designated Service Provider (DSP) pharmacy to avoid a 40% co-payment."
            },
            {
                question: "Do I have to pay for day surgery?",
                answer: "If you use a network day hospital for listed procedures (like gastroscopies), there is no co-payment. Using an acute hospital will incur a 30% co-payment."
            }
        ]
    },
    {
        id: "bonitas-boncomprehensive-any-2026",
        price: 12509,
        savings_annual: 22512,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "BonComprehensive",
            plan_series: "Comprehensive Series",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 12509,
                    adult: 11796,
                    child: 2548
                },
                msa_structure: {
                    type: "Fixed",
                    value: 1876
                }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 150,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "Unlimited",
                value: 448200,
                copay_percentage: 20
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 67640
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 12,
                ultrasounds_2d: 2,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2050,
                wellness_screening: true
            }
        },
        chronic_conditions: 61,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 2800,
            joint_replacement: 38560,
            admission_penalty_non_network: 5440
        },
        gap_cover_rating: "Recommended",
        red_flag: "High co-payment (R38 560) for joint replacements if a DSP is not used.",
        faq: [
            {
                question: "What is the 2026 monthly cost for the Main Member on BonComprehensive?",
                answer: "The monthly contribution for a Main Member in 2026 is R12,509."
            },
            {
                question: "What is the annual limit for internal prosthesis on BonComprehensive?",
                answer: "The family limit for internal prosthesis is R67,640 per year."
            },
            {
                question: "Are there co-payments for MRI scans?",
                answer: "Yes, there is a R2,800 co-payment per scan event, unless it is a PMB."
            },
            {
                question: "Does BonComprehensive cover me in any hospital?",
                answer: "Yes, BonComprehensive provides access to any private hospital."
            },
            {
                question: "How many chronic conditions are covered?",
                answer: "The plan covers 61 chronic conditions (27 PMBs + 34 additional conditions)."
            },
            {
                question: "Is there a co-payment for joint replacements?",
                answer: "Yes, if you do not use a Designated Service Provider (DSP), you will be liable for a R38,560 co-payment."
            },
            {
                question: "What is the limit for non-PMB cancer treatment?",
                answer: "Non-PMB cancer treatment is limited to R448,200 per family, paid at 80% if a DSP is used."
            },
            {
                question: "Does the plan cover emergency room visits?",
                answer: "Yes, you get 2 emergency consultations per family at a casualty ward paid from risk. Non-emergencies are paid from savings."
            },
            {
                question: "What is the maternity benefit?",
                answer: "You get 12 antenatal consultations, 2 2D ultrasounds, and other benefits like private ward delivery (up to 3 days)."
            },
            {
                question: "Do I have to pay for day surgeries?",
                answer: "You can avoid a R5,440 co-payment by using a network day hospital for selected procedures."
            }
        ]
    },
    {
        id: "bonitas-boncore-network-2026",
        price: 1275,
        savings_annual: 0,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "BonCore",
            plan_series: "BonCore",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 1275,
                    adult: 1275,
                    child: 1275
                }
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 70,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "Unlimited",
                value: 9999999,
                copay_percentage: 0
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 0,
                ultrasounds_2d: 0,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 28,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "Excluded",
            admission_penalty_non_network: 14680
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Internal Prosthesis and MRI/CT scans are strictly PMB Only. C-sections are for emergencies only.",
        faq: [
            {
                question: "Can I choose to have a Caesarean section?",
                answer: "No, C-sections are only covered for approved PMB emergencies. Elective C-sections are not covered."
            },
            {
                question: "Do I have savings for day-to-day doctors?",
                answer: "No, there is no medical savings account. You only have a 'Benefit Booster' of up to R1,000 per family if you complete a wellness screening."
            },
            {
                question: "Is my hip replacement covered?",
                answer: "No, joint replacement surgery and internal prostheses are excluded unless it is a Prescribed Minimum Benefit (PMB) case."
            },
            {
                question: "What happens if I use a hospital not on the list?",
                answer: "You will be liable for a co-payment of R14,680 unless it is a medical emergency."
            },
            {
                question: "Are MRI and CT scans covered?",
                answer: "MRI and CT scans are covered for PMB conditions only. There is no benefit for non-PMB scans."
            },
            {
                question: "Do I have to pay a co-payment for admission?",
                answer: "Yes, there is a R5,500 co-payment per admission, except for motor vehicle accidents, maternity confinements, and PMB emergencies."
            },
            {
                question: "Is depression medication covered?",
                answer: "Yes, depression is covered as an additional chronic condition, with medication cover up to R165 per beneficiary per month."
            },
            {
                question: "Do I get any cover for emergency room visits?",
                answer: "Yes, you are covered for 2 emergency consultations per family at a casualty ward, strictly for emergencies only."
            }
        ]
    },
    {
        id: "bonitas-bonessential-network-2026",
        price: 2747,
        savings_annual: 0,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "BonEssential",
            plan_series: "Essential",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 2747,
                    adult: 2030,
                    child: 888
                },
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "Specific Private Hospital Network",
        network_details: {
            hospitals: "Network",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 0
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 30
            },
            casualty: {
                status: "Risk",
                value: 2
            },
            internal_prosthesis: {
                sublimit: 0
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
                contraceptives: 1580,
                wellness_screening: true
            }
        },
        chronic_conditions: 28,
        procedure_copays: {
            scope_in_hospital: 2020,
            scope_out_hospital: 0,
            mri_scan: 2800,
            joint_replacement: "PMB Only",
            admission_penalty_non_network: "30%"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "30% co-payment for non-network hospital use + PMB-only prosthesis cover",
        faq: [
            {
                question: "What happens if I go to a non-network hospital?",
                answer: "You will face a 30% co-payment of the hospital bill if you use a hospital that is not on the BonEssential network. The plan uses a list of specific private hospitals, and this penalty applies unless it's a PMB emergency. Network specialists are covered in full at the Bonitas Rate, while non-network specialists are paid at 100% of the Bonitas Rate."
            },
            {
                question: "Is my depression medication covered?",
                answer: "Yes, but with strict limits. Depression medication is covered up to R165 per beneficiary per month (total R1,980 annually). This is listed as the 28th chronic condition covered. You must use Pharmacy Direct (the Designated Service Provider) to get your medicine. If you don't use Pharmacy Direct or choose medicine not on the formulary, you will pay a 30% co-payment."
            },
            {
                question: "Do I have to pay upfront for a colonoscopy or gastroscopy?",
                answer: "Yes. Colonoscopies and gastroscopies both have a R2,020 co-payment per procedure. This applies to in-hospital scopes. Cystoscopies, flexible sigmoidoscopies, and hysteroscopies also have the same R2,020 co-payment. These co-payments do not apply to PMB conditions."
            },
            {
                question: "Will I have to pay out-of-pocket for my MRI or CT scan?",
                answer: "Yes. The plan charges a R2,800 co-payment per MRI or CT scan, even though the annual family limit is R15,960. This co-pay does not apply if the scan is confirmed as a Prescribed Minimum Benefit (PMB). Out-of-hospital MRI and CT scans are only covered for PMBs."
            },
            {
                question: "What if I need a knee or hip replacement?",
                answer: "Internal and external prostheses (including joint replacements) are covered for PMB conditions only. There is no specific Rand limit stated for non-PMB prosthesis cover - it is simply excluded. If your joint replacement qualifies as a PMB, it will be covered subject to Managed Care protocols and the use of network hospitals to avoid the 30% co-payment."
            },
            {
                question: "Can I go to a casualty room for emergencies?",
                answer: "Yes, but with limits. The Emergency Room Benefit covers only 2 emergency consultations per family per year at a casualty ward or emergency room facility of a hospital. The benefit is strictly limited to emergencies only. If your visit is not classified as an emergency, it will be paid from the available Benefit Booster amount (R1,160 per family if activated)."
            },
            {
                question: "What is the Benefit Booster and how do I get it?",
                answer: "The Benefit Booster is an extra R1,160 per family per year for out-of-hospital expenses like GP visits, over-the-counter medicine, X-rays, and blood tests. To activate it, you must complete an online mental health assessment and a wellness screening at a Bonitas wellness day or participating pharmacy. Once activated, out-of-hospital claims pay from this amount first."
            },
            {
                question: "Are my children's vaccinations covered?",
                answer: "Yes. Preventative care includes 1 flu vaccine per beneficiary, pneumococcal vaccines (schedule-based), 2-3 doses of the HPV vaccine for females aged 9-26 (limited to 1 course per lifetime), and dental fissure sealants for children under 16. The wellness benefit also includes paediatric screenings and a 24/7 Babyline helpline for children under 3 years."
            },
            {
                question: "Will cancer treatment bankrupt me?",
                answer: "Cancer treatment is unlimited for PMB conditions at a Designated Service Provider (DSP), but you must register on the Oncology Management Programme. However, if you use a non-DSP hospital, you face a 30% co-payment. Cancer medicine requires a 20% co-payment if you don't use a DSP pharmacy. Brachytherapy has a sub-limit of R63,110 per beneficiary. PET scans are PMB-only with a 25% co-payment for non-network providers."
            },
            {
                question: "What if I need cataract surgery?",
                answer: "Cataract surgery is covered, but you can avoid a R9,800 co-payment by using the Designated Service Provider (DSP). If you choose a non-DSP provider for cataract surgery, the R9,800 co-payment applies per procedure. Pre-authorisation is required for all procedures."
            }
        ]
    },
    {
        id: "bonitas-bonprime-network-2026",
        price: 3255,
        savings_annual: 6252,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "BonPrime",
            plan_series: "BonPrime",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 3255,
                    adult: 2546,
                    child: 1035
                }
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Any",
            specialists: "Referral Required"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: 0
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 224100,
                copay_percentage: 20
            },
            casualty: {
                status: "Savings",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 6,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 1970,
                wellness_screening: true
            }
        },
        chronic_conditions: 28,
        procedure_copays: {
            scope_in_hospital: 2020,
            scope_out_hospital: 0,
            mri_scan: 2240,
            joint_replacement: "Excluded",
            admission_penalty_non_network: "30% Co-payment"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Internal Prosthesis is strictly PMB Only. Significant co-payments for non-network hospitals (30%) and scans (R2,240).",
        faq: [
            {
                question: "What happens if I use a non-network hospital?",
                answer: "You will be liable for a 30% co-payment on the hospital account if you voluntarily use a hospital outside the BonPrime Network."
            },
            {
                question: "Is my cancer treatment unlimited?",
                answer: "No, while PMB conditions are covered, non-PMB oncology is limited to R224,100 per family. Once this limit is reached, there is 80% cover at a DSP."
            },
            {
                question: "Do I have to pay upfront for an MRI?",
                answer: "Yes, you must pay a R2,240 co-payment per scan event, unless it is for a PMB condition."
            },
            {
                question: "Is there a limit on hip replacements?",
                answer: "Yes, internal prostheses (like hip and knee replacements) are covered for PMB conditions only. There is no general benefit."
            },
            {
                question: "What if I run out of savings?",
                answer: "Once your savings are depleted, your family gets 1 additional GP consultation paid by the scheme. You can also unlock up to R4,000 in 'Benefit Booster' for day-to-day expenses."
            },
            {
                question: "Are my contraceptives covered?",
                answer: "Yes, contraceptives are covered up to R1,970 per family, but you must use the Designated Service Provider (Marara Pharmacy) to avoid a 40% co-payment."
            },
            {
                question: "Is there a co-payment for gastroscopy?",
                answer: "Yes, a co-payment of R2,020 applies to gastroscopies and colonoscopies."
            },
            {
                question: "Is depression covered?",
                answer: "Yes, depression is covered as an additional chronic condition, with medication cover up to R165 per beneficiary per month."
            }
        ]
    },
    {
        id: "bonitas-bonsave-network-2026",
        price: 4047,
        savings_annual: 145728,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "BonSave",
            plan_series: "Saver",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 4047,
                    adult: 3059,
                    child: 1211
                },
                msa_structure: {
                    type: "Fixed",
                    value: 12144
                }
            }
        ],
        network_restriction: "Specific Private Hospital Network",
        network_details: {
            hospitals: "Network",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "From Savings"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 224100,
                copay_percentage: 20
            },
            casualty: {
                status: "Risk",
                value: 2
            },
            internal_prosthesis: {
                sublimit: 41070
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 6,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 1970,
                wellness_screening: true
            }
        },
        chronic_conditions: 28,
        procedure_copays: {
            scope_in_hospital: 2020,
            scope_out_hospital: 0,
            mri_scan: 1860,
            joint_replacement: "Excluded (PMB Only)",
            admission_penalty_non_network: "30%"
        },
        gap_cover_rating: "Recommended",
        red_flag: "Joint replacement excluded except PMB + R224,100 oncology limit + 30% non-network penalty",
        faq: [
            {
                question: "What happens if I go to a non-network hospital?",
                answer: "You will face a 30% co-payment of the hospital bill if you use a hospital that is not on the BonSave network. The plan uses a list of specific private hospitals, and this penalty applies unless it's a PMB emergency. Network specialists are covered in full at the Bonitas Rate, while non-network specialists are paid at 100% of the Bonitas Rate."
            },
            {
                question: "Is my depression medication covered?",
                answer: "Yes, but with strict limits. Depression medication is covered up to R165 per beneficiary per month (total R1,980 annually). This is listed as the 28th chronic condition covered. You must use Pharmacy Direct (the Designated Service Provider) to get your medicine. If you don't use Pharmacy Direct or choose medicine not on the formulary, you will pay a 30% co-payment."
            },
            {
                question: "What if I need a knee or hip replacement?",
                answer: "Joint replacement surgery is excluded from the internal prosthesis benefit except for PMB conditions only. The internal prosthesis limit is R41,070 per family, but this explicitly states 'no cover for joint replacement except for PMB'. If your joint replacement qualifies as a PMB, it will be covered subject to Managed Care protocols and the use of network hospitals to avoid the 30% co-payment."
            },
            {
                question: "Will cancer treatment bankrupt me?",
                answer: "BonSave covers unlimited cancer treatment for PMB conditions at a DSP. However, non-PMB cancer treatment has a limit of R224,100 per family. Once this limit is reached, non-PMB treatment is paid at 80% at a DSP and has no cover at a non-DSP. You must register on the Oncology Management Programme. Cancer medicine requires a 20% co-payment if you don't use a DSP. Brachytherapy has a sub-limit of R63,110 per beneficiary."
            },
            {
                question: "Do I have to pay upfront for a colonoscopy or gastroscopy?",
                answer: "Yes. Colonoscopies and gastroscopies both have a R2,020 co-payment per procedure. This applies to in-hospital scopes. Cystoscopies, flexible sigmoidoscopies, and hysteroscopies also have the same R2,020 co-payment. These co-payments do not apply to PMB conditions."
            },
            {
                question: "Will I have to pay out-of-pocket for my MRI or CT scan?",
                answer: "Yes. The plan charges a R1,860 co-payment per MRI or CT scan, even though the annual family limit is R30,430 (combined in and out-of-hospital). This co-pay does not apply if the scan is confirmed as a Prescribed Minimum Benefit (PMB). The scan limit and co-pay apply to both in-hospital and out-of-hospital scans."
            },
            {
                question: "Can I go to a casualty room for emergencies?",
                answer: "Yes. The Emergency Room Benefit covers 2 emergency consultations per family per year at a casualty ward or emergency room facility of a hospital. An additional 2 emergency consultations are available for children under the age of 6. The benefit is strictly limited to emergencies only. If your visit is not classified as an emergency, it will be paid from available savings."
            },
            {
                question: "What is the Benefit Booster and how do I get it?",
                answer: "The Benefit Booster is an extra R5,000 per family per year for out-of-hospital expenses like GP visits, over-the-counter medicine, X-rays, and blood tests. To activate it, you must complete an online mental health assessment and a wellness screening at a Bonitas wellness day or participating pharmacy. Once activated, out-of-hospital claims pay from this amount first, helping your savings last longer."
            },
            {
                question: "How much are my Medical Savings?",
                answer: "Your Medical Savings Account (MSA) is R12,144 per year for the main member (R1,012/month). Adult dependants get R9,180/year (R765/month) and child dependants get R3,636/year (R303/month). All out-of-hospital expenses like GP visits, specialist consultations, medicine, blood tests, X-rays, and dentistry are paid from your available savings. If you deplete your savings, you still get 2 additional GP consultations per family (limited to 1 per beneficiary)."
            },
            {
                question: "What if I need cataract surgery?",
                answer: "Cataract surgery is covered, but you can avoid a R8,400 co-payment by using the Designated Service Provider (DSP). If you choose a non-DSP provider for cataract surgery, the R8,400 co-payment applies per procedure. Pre-authorisation is required for all procedures."
            }
        ]
    },
    {
        id: "bonitas-bonstart-plus-network-2026",
        price: 2040,
        savings_annual: 0,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "BonStart Plus",
            plan_series: "BonStart",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 2040,
                    adult: 1940,
                    child: 899
                },
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Referral Required"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 0
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
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
                contraceptives: 1270,
                wellness_screening: true
            }
        },
        chronic_conditions: 28,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 2800,
            joint_replacement: "Excluded",
            admission_penalty_non_network: 12680
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Gastroscopies, colonoscopies, and joint replacements are strictly EXCLUDED procedures.",
        faq: [
            {
                question: "Are joint replacements covered?",
                answer: "No, joint replacement surgery is listed under 'Surgical Procedures That Are Not Covered' and is excluded."
            },
            {
                question: "Can I go to any private hospital?",
                answer: "No, you must use a hospital on the applicable network. Using a non-network hospital incurs a R12,680 co-payment."
            },
            {
                question: "Is there a co-payment for admission at a network hospital?",
                answer: "Yes, there is a R1,240 co-payment per admission at a network hospital, except for PMB emergencies."
            },
            {
                question: "Are gastroscopies and colonoscopies covered?",
                answer: "No, gastroscopies, colonoscopies, and all other endoscopies are explicitly excluded from cover."
            },
            {
                question: "Do I need a referral to see a specialist?",
                answer: "Yes, you must get a referral from your network GP. Consultations are limited to 2 visits per family."
            },
            {
                question: "Is there a limit for chronic depression medication?",
                answer: "Yes, depression is covered as an additional condition, but medication is limited to R165 per beneficiary per month."
            },
            {
                question: "Does the plan cover MRI scans?",
                answer: "Yes, but there is a R14,090 family limit and a R2,800 co-payment per scan event, unless it is a PMB."
            },
            {
                question: "Are maternity scans covered?",
                answer: "Yes, BonStart Plus covers two 2D ultrasound scans during pregnancy."
            },
            {
                question: "How many GP visits do I get?",
                answer: "You get unlimited network GP consultations, but authorisation is required after the 10th visit."
            },
            {
                question: "What is the penalty for using a non-network day hospital?",
                answer: "If you do not use a network day hospital for selected procedures, you will be liable for a R12,680 co-payment."
            }
        ]
    },
    {
        id: "bonitas-hospital-standard-network-2026",
        price: 3561,
        savings_annual: 0,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "Hospital Standard",
            plan_series: "Hospital",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 3561,
                    adult: 2999,
                    child: 1353
                },
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Any",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 0
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 168100,
                copay_percentage: 20
            },
            casualty: {
                status: "Risk",
                value: 2
            },
            internal_prosthesis: {
                sublimit: 54270
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 6,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 1580,
                wellness_screening: true
            }
        },
        chronic_conditions: 28,
        procedure_copays: {
            scope_in_hospital: 2020,
            scope_out_hospital: 0,
            mri_scan: 2800,
            joint_replacement: "Excluded",
            admission_penalty_non_network: 6500
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Joint replacements are strictly EXCLUDED (except PMB). Significant procedure co-pays apply.",
        faq: [
            {
                question: "Does Hospital Standard cover hip and knee replacements?",
                answer: "No. The plan explicitly excludes cover for joint replacements and back/neck surgery, unless it qualifies as a Prescribed Minimum Benefit (PMB)."
            },
            {
                question: "Is there a co-payment for a gastroscopy?",
                answer: "Yes, a R2,020 co-payment applies to gastroscopies and colonoscopies performed in hospital. You also face a R6,500 penalty if you don't use a day hospital."
            },
            {
                question: "Can I go to any hospital?",
                answer: "No. You must use a hospital on the Hospital Standard Network. If you use a non-network hospital for a planned procedure, you will pay a 30% co-payment."
            },
            {
                question: "What is the limit for cancer treatment?",
                answer: "Non-PMB cancer treatment is limited to R168,100 per family. Once depleted, you have 80% cover at a DSP and no cover at a non-DSP."
            },
            {
                question: "Are MRI scans covered?",
                answer: "Yes, but they are limited to R32,040 per family and require a R2,800 co-payment per scan (unless it is a PMB)."
            },
            {
                question: "Does this plan cover depression medication?",
                answer: "Yes, it covers depression medication up to R165 per beneficiary per month, in addition to the standard 27 chronic conditions."
            },
            {
                question: "Do I get free casualty visits?",
                answer: "Yes, you are covered for 2 emergency consultations per family at a casualty ward, but this benefit is strictly limited to emergencies only."
            },
            {
                question: "Is pregnancy covered?",
                answer: "Yes, you get 6 antenatal consultations, 2 ultrasound scans, and post-birth paediatric visits, funded from the risk benefit."
            }
        ]
    },
    {
        id: "bonitas-primary-network-2026",
        price: 3588,
        savings_annual: 0,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "Primary",
            plan_series: "Primary Series",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 3588,
                    adult: 2807,
                    child: 1141
                },
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 224100,
                copay_percentage: 20
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 6,
                ultrasounds_2d: 2,
                paediatrician_visits: 1
            },
            preventative: {
                vaccinations: true,
                contraceptives: 1970,
                wellness_screening: true
            }
        },
        chronic_conditions: 28,
        procedure_copays: {
            scope_in_hospital: 2020,
            scope_out_hospital: 0,
            mri_scan: 2240,
            joint_replacement: 0,
            admission_penalty_non_network: 6500
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Internal prostheses are PMB Only; significant financial risk for non-PMB surgeries.",
        faq: [
            {
                question: "What is the 2026 monthly premium for Bonitas Primary?",
                answer: "The main member contribution for 2026 is R3,588 per month."
            },
            {
                question: "Do I have to use specific hospitals on Bonitas Primary?",
                answer: "Yes, this is a network plan. You must use hospitals on the Bonitas Primary network to avoid a 30% co-payment."
            },
            {
                question: "Is there a limit on cancer treatment?",
                answer: "Yes, non-PMB cancer treatment is limited to R224,100 per family. PMB cancer conditions are covered without limit."
            },
            {
                question: "Are gastroscopies and colonoscopies covered in full?",
                answer: "No, there is a R2,020 co-payment for gastroscopies and colonoscopies performed in hospital."
            },
            {
                question: "Does the plan cover MRI scans?",
                answer: "Yes, but there is a limit of R15,960 per family and a co-payment of R2,240 per scan."
            },
            {
                question: "What is the day-to-day limit for a single member?",
                answer: "For a main member, the overall day-to-day limit is R5,540 per year."
            },
            {
                question: "Is dentistry covered?",
                answer: "Yes, basic dentistry is covered at 75% of the Bonitas Dental Tariff, subject to the Bonitas Dental Management Programme."
            },
            {
                question: "Are internal prostheses like hip replacements covered?",
                answer: "Internal prostheses are covered for PMB conditions only. There is no benefit for non-PMB prostheses."
            },
            {
                question: "How many chronic conditions are covered?",
                answer: "The plan covers 28 chronic conditions, including the 27 PMBs plus depression."
            },
            {
                question: "Is there a co-payment for cataract surgery?",
                answer: "Yes, you must use a Designated Service Provider (DSP) to avoid a R8,400 co-payment."
            }
        ]
    },
    {
        id: "bonitas-standard-any-2026",
        price: 5929,
        savings_annual: 0,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "Standard",
            plan_series: "Traditional",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 5929,
                    adult: 5139,
                    child: 1740
                }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Any",
            specialists: "Referral Required"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Subject to R13 980 Day-to-Day Limit"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 280100,
                copay_percentage: 20
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 57630
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 12,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2050,
                wellness_screening: true
            }
        },
        chronic_conditions: 45,
        procedure_copays: {
            scope_in_hospital: 5440,
            scope_out_hospital: 0,
            mri_scan: 1860,
            joint_replacement: 38560,
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Mandatory",
        red_flag: "High co-payments for joint replacements (R38,560) and non-PMB oncology limit of R280,100.",
        faq: [
            {
                question: "Do I have to pay upfront for a gastroscopy?",
                answer: "Yes, there is a R5,440 co-payment for day surgery procedures like scopes if you do not use a network day hospital."
            },
            {
                question: "Is my specialist covered in full?",
                answer: "No, specialists are covered at 100% of the Bonitas Rate. Since many specialists charge above this rate, you may have a shortfall."
            },
            {
                question: "What if I get cancer?",
                answer: "You have unlimited cover for PMBs, but non-PMB cancer treatment is limited to R280,100 per family with a 20% co-payment."
            },
            {
                question: "Can I go to any hospital?",
                answer: "Yes, the Standard plan gives you access to any private hospital."
            },
            {
                question: "Do I pay for MRI and CT scans?",
                answer: "Yes, there is a R1,860 co-payment per scan event, even if you are in hospital."
            },
            {
                question: "Is dentistry covered?",
                answer: "Basic dentistry is covered at the Bonitas Dental Tariff, but specialized dentistry often requires a co-payment or is subject to managed care protocols."
            },
            {
                question: "What happens if I need a hip replacement?",
                answer: "You must use a Designated Service Provider (DSP) to avoid a significant R38,560 co-payment."
            },
            {
                question: "Are my chronic meds covered?",
                answer: "Yes, 45 conditions are covered, but you must use a Bonitas Network Pharmacy to avoid a 30% co-payment."
            },
            {
                question: "Is there a limit on how much I can see my GP?",
                answer: "Yes, GP and specialist visits are paid from your overall Day-to-Day limit of R13,980 (Main Member), with a specific sublimit of R3,500 for consultations."
            },
            {
                question: "Do I get cover for emergency room visits?",
                answer: "Yes, you have a separate benefit for 2 emergency consultations per family at a casualty ward, paid from Risk."
            }
        ]
    },
    {
        id: "discovery-classic-smart-saver-network-2026",
        price: 3350,
        savings_annual: 33840,
        identity: {
            scheme_name: "Discovery Health Medical Scheme",
            plan_name: "Classic Smart Saver",
            plan_series: "Smart Saver Plans",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 3350,
                    adult: 2840,
                    child: 1400
                },
                msa_structure: {
                    type: "Fixed",
                    value: 33840
                }
            }
        ],
        network_restriction: "Smart Hospital Network",
        network_details: {
            hospitals: "Network",
            gps: "Nominated",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200,
            specialist_out_hospital: 0,
            gp_network_consults: "Unlimited with R75 co-payment per consultation"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 250000,
                copay_percentage: 20
            },
            casualty: {
                status: "Risk",
                value: 75
            },
            internal_prosthesis: {
                sublimit: 31850
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 8,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2600,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 8000,
            scope_out_hospital: 1800,
            mri_scan: 4000,
            joint_replacement: "Network: no limit for planned hip/knee replacements; Outside network: up to 80% DHR with max R31,850 per prosthesis per admission.",
            admission_penalty_non_network: 12650
        },
        gap_cover_rating: "Recommended",
        red_flag: "Network restriction risk: planned admissions require Smart Hospital Network use or R12,650 upfront payment applies; significant scope and procedure co-pays.",
        faq: [
            {
                question: "If I go to a private hospital outside the Smart Hospital Network for a planned procedure, will I be charged?",
                answer: "Yes. You will have to pay an upfront payment of R12,650 for planned admissions to hospitals not in the Smart Hospital Network. It is essential to use a Smart Hospital Network facility to avoid this significant out-of-pocket cost."
            },
            {
                question: "What happens if I reach the R250,000 oncology benefit limit during my cancer treatment?",
                answer: "After you reach the R250,000 Oncology Benefit limit in a 12-month cycle, the Scheme continues to cover up to 80% of the Discovery Health Rate for subsequent additional cancer treatment costs (excluding PMB cancer treatment, which remains covered in full)."
            },
            {
                question: "Do I have to use a network provider for cancer treatment on Classic Smart Saver?",
                answer: "Yes. All cancer-related healthcare services under the Oncology Benefit are covered at a network provider. Using designated service providers for oncology medicine also helps you avoid a 20% co-payment."
            },
            {
                question: "If I need a colonoscopy or gastroscopy in hospital, will I have to pay upfront?",
                answer: "Often yes. For a single scope in hospital, you pay R8,000 from day-to-day benefits (or upfront if insufficient funds). For both gastroscopy and colonoscopy in the same admission, you pay R9,950. These amounts reduce if your doctor is part of the Scheme's value-based network. No upfront payment applies if the scope is for a confirmed PMB condition, dyspepsia (when indicated and approved), the patient is 12 or under, or it's done in-rooms at a network provider."
            },
            {
                question: "Can I see any GP or do I have to nominate one specific doctor?",
                answer: "You must nominate a Smart GP in the Discovery Health Network to be your primary care doctor, especially to manage chronic conditions. For full cover on GP consultations, you must visit your nominated primary care network GP. Seeing a non-nominated GP may result in a co-payment."
            },
            {
                question: "If I need an MRI scan, will it always be covered from my hospital benefit?",
                answer: "No. The Scheme pays up to the Discovery Health Rate from your Hospital Benefit only if the MRI is related to your current approved hospital admission. If it's not admission-related or is for conservative back/neck treatment, the first R4,000 is paid from your available day-to-day benefits (MSA/Personal Health Fund), with the balance from Hospital Benefit."
            },
            {
                question: "What if my chronic medicine is not on the formulary list?",
                answer: "Medicine not on the medicine list formulary is covered up to the therapeutic reference price. You must use a network pharmacy to avoid a 20% co-payment on chronic medicine."
            },
            {
                question: "Is there a limit on how much the Scheme pays for a knee or hip replacement prosthesis?",
                answer: "If you use a provider in the Scheme's network, there is no limit for planned hip and knee joint replacements. If you use a provider outside the network, the Scheme pays up to 80% of the Discovery Health Rate with a maximum of R31,850 for each prosthesis per admission (the network does not apply to emergency/trauma-related surgeries)."
            },
            {
                question: "Do I get unlimited GP visits or is there a limit?",
                answer: "You get unlimited consultations with GPs in the Smart GP Network. You pay R75 per consultation as a co-payment, with the balance covered at 100% of the Discovery Health Rate. Video consultations with your Smart Network GP are covered in full up to the DHR."
            },
            {
                question: "What maternity benefits do I get during and after pregnancy on this plan?",
                answer: "The Maternity Benefit includes up to 8 antenatal consultations, up to two 2D ultrasound scans (or one 2D plus a nuchal translucency test), defined blood tests, one flu vaccination during pregnancy, and after birth, two visits to a GP/paediatrician/ENT for your baby under age 2, plus postnatal care services. You must activate the benefit by creating a pregnancy/baby profile or preauthorising your delivery."
            }
        ]
    },
    {
        id: "discovery-classic-smart-network-2026",
        price: 3018,
        savings_annual: 0,
        identity: {
            scheme_name: "Discovery Health Medical Scheme",
            plan_name: "Classic Smart",
            plan_series: "Smart",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 2822,
                    adult: 2227,
                    child: 1127
                },
                msa_structure: {
                    type: "None",
                    value: 0
                }
            },
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 3018,
                    adult: 2381,
                    child: 1205
                },
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "Smart Hospital Network",
        network_details: {
            hospitals: "Network",
            gps: "Nominated",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited (R75 co-pay per consultation)"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 250000,
                copay_percentage: 20
            },
            casualty: {
                status: "No Benefit",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 31800
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 8,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 9950,
            scope_out_hospital: 3100,
            mri_scan: 4000,
            joint_replacement: 31800,
            admission_penalty_non_network: 12650
        },
        gap_cover_rating: "Mandatory",
        red_flag: "R12,650 upfront penalty if you use a hospital outside the Smart Hospital Network for planned admissions.",
        faq: [
            {
                question: "What happens if I need to go to a hospital that's not in the Smart Network?",
                answer: "If you have a planned admission outside the Smart Hospital Network, you will have to pay R12,650 upfront, and the scheme will pay the rest at the agreed rate."
            },
            {
                question: "If I get diagnosed with cancer, what is my maximum cover before I start paying more?",
                answer: "Cancer cover is limited to R250,000 over a 12-month cycle at 100% DHR in network, and after that the plan pays up to 80% of DHR (so you may face a 20% shortfall on further approved treatment)."
            },
            {
                question: "Do I really have to pay almost R10,000 upfront just to have scopes done?",
                answer: "Yes—if both a gastroscopy and colonoscopy are done in the same admission outside the Day Surgery Network, the stated upfront payment is R9,950 (R8,000 hospital + R4,650 day clinic, which can reduce to R8,250 if a value-based network doctor performs the scopes)."
            },
            {
                question: "If I do scopes in a doctor's rooms at a non-network provider, is there still a co-payment?",
                answer: "Yes—when scopes are performed in-rooms at a non-network provider, the stated co-payment for bi-directional scopes is R3,100."
            },
            {
                question: "If I need an MRI that isn't linked to a hospital admission, do I pay first?",
                answer: "If the scan is not related to an approved hospital admission, you must pay the first R4,000 and the balance will be paid from your Hospital Benefit (up to DHR)."
            },
            {
                question: "How much do I actually pay every month in 2026 as the main member?",
                answer: "From 1 April 2026 the main-member contribution shown for Classic Smart is R3,018 per month."
            },
            {
                question: "Do I get a Medical Savings Account on this plan?",
                answer: "No—the Smart plans do not include a Medical Savings Account. Instead, you have access to a Personal Health Fund (up to R8,000 base for adults on Classic Smart) which you can earn by completing your Personal Health Pathway actions."
            },
            {
                question: "If I need a planned hip or knee replacement, what's the risk if I go outside the scheme's network providers?",
                answer: "For planned hip and knee joint replacements outside the network, the plan's payment is limited (it pays up to 80% DHR, capped at R31,800 per prosthesis per admission), so there can be large shortfalls if providers charge more."
            },
            {
                question: "How much do I pay to see my Smart GP every time I go?",
                answer: "Unlimited consultations with GPs in the Smart GP Network are available, but you pay a R75 co-payment for each consultation (the balance is covered up to 100% of DHR)."
            },
            {
                question: "How many antenatal visits and pregnancy scans are actually covered?",
                answer: "The Maternity Benefit states cover for up to 8 antenatal consultations and up to two 2D ultrasound scans."
            }
        ]
    },
    {
        id: "discovery-classic-saver-any-2026",
        price: 4850,
        savings_annual: 11640,
        identity: {
            scheme_name: "Discovery Health Medical Scheme",
            plan_name: "Classic Saver",
            plan_series: "Saver Series",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 4850,
                    adult: 3825,
                    child: 1943
                },
                msa_structure: {
                    type: "Percentage",
                    value: 20
                }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Network",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200,
            specialist_out_hospital: 0,
            gp_network_consults: 3
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 250000,
                copay_percentage: 20
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 8,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 8000,
            scope_out_hospital: 1800,
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: 7250
        },
        gap_cover_rating: "Recommended",
        red_flag: "Large upfront payments can apply if you use facilities outside the Day Surgery Network (and certain scope settings).",
        faq: [
            {
                question: "If I get cancer, do I really only have R250,000 cover before my benefits reduce?",
                answer: "The Oncology Benefit is subject to a cover amount of R250,000; after that point, cover can reduce to 80% of the Discovery Health Rate for further costs (effectively a 20% member portion on those additional costs)."
            },
            {
                question: "Do I have to use an oncology network provider on Classic Saver?",
                answer: "Classic Saver states oncology is covered at any provider (not restricted to a network provider), but Delta/Coastal options specify network-provider requirements."
            },
            {
                question: "How much do I need to pay upfront if I do a scope in hospital outside the Day Surgery Network?",
                answer: "An upfront payment of R8,000 can apply for scopes performed in a hospital outside of the Day Surgery Network."
            },
            {
                question: "If my gastroscopy is done in a doctor’s rooms, can I still get hit with a co-payment?",
                answer: "Yes—if it is performed at a non-network provider in-rooms, a co-payment of R1,800 can apply for a single scope."
            },
            {
                question: "What is the penalty if I choose a facility outside the Day Surgery Network for a listed procedure?",
                answer: "For Classic Saver, an upfront payment of R7,250 can apply when a defined list of procedures is done outside of the Day Surgery Network."
            },
            {
                question: "How much day-to-day money do I actually get in savings on Classic Saver?",
                answer: "The Medical Savings Account is 20% of your monthly contribution; using the Apr–Dec 2026 main-member contribution of R4,850, that is R11,640 per year."
            },
            {
                question: "After my savings run out, do I still get any GP visits covered?",
                answer: "Yes—once you’ve used your MSA (and subject to the Day-to-day Extender rules), a single member on Classic/Coastal has 3 network GP video consults available through the Day-to-day Extender Benefit."
            },
            {
                question: "How many antenatal and ultrasound visits are actually covered on this plan?",
                answer: "The maternity basket includes up to 8 antenatal consultations and up to two 2D ultrasound scans (or one 2D plus one nuchal translucency test)."
            }
        ]
    },
    {
        id: "discovery-classic-priority-any-2026",
        price: 6198,
        savings_annual: 17376,
        identity: {
            scheme_name: "Discovery Health Medical Scheme",
            plan_name: "Classic Priority",
            plan_series: "Priority Plans",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 5796,
                    adult: 4571,
                    child: 2318
                },
                msa_structure: {
                    type: "Percentage",
                    value: 25
                }
            },
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 6198,
                    adult: 4889,
                    child: 2478
                },
                msa_structure: {
                    type: "Percentage",
                    value: 25
                }
            }
        ],
        network_restriction: "Any private hospital (approved); nominated Primary Care GP must be in the Discovery Health Network (Premier Plus GP).",
        network_details: {
            hospitals: "Any",
            gps: "Nominated",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200,
            specialist_out_hospital: 100,
            gp_network_consults: "Limited"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 250000,
                copay_percentage: 20
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 8,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 7500,
            scope_out_hospital: 1800,
            mri_scan: 4000,
            joint_replacement: 23700,
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Large upfront payments apply for several common procedures (e.g., scopes, joint replacements), and members can still face shortfalls if providers charge above the Discovery Health Rate.",
        faq: [
            {
                question: "If I’m diagnosed with cancer, what happens when my treatment costs go beyond the Oncology Benefit limit?",
                answer: "The Oncology Benefit covers the first R250000, and after that the Scheme covers up to 80% of further approved costs (meaning a 20% member share on those additional amounts)."
            },
            {
                question: "Do I have to pay upfront for a gastroscopy or colonoscopy if it’s done in hospital?",
                answer: "Yes, an upfront payment can apply for scope admissions in hospital (for example R7500 for the hospital account on a scope admission, depending on the setting and provider)."
            },
            {
                question: "If I do a scope in a doctor’s rooms instead of a day clinic/hospital, can I still face a co-payment?",
                answer: "Yes—if the scope is performed in rooms by a non-network provider, a co-payment can apply (for example R1800 for a single scope)."
            },
            {
                question: "If I need an MRI or CT scan, do I pay something first before the Scheme pays?",
                answer: "Yes, the first R4000 of an MRI/CT scan is paid from day-to-day benefits before the balance is covered from the Hospital Benefit (subject to the rules described)."
            },
            {
                question: "If I need a joint replacement, is there an upfront payment I must plan for?",
                answer: "Yes—joint replacements fall under the list of procedures with an upfront payment, shown as R23700 in the guide."
            },
            {
                question: "Do I have to use a specific GP for chronic medicine cover to work properly?",
                answer: "Yes—you must nominate a network GP (Primary Care GP) and, to be covered in full for GP consultations, you must visit your nominated Primary Care network GP."
            },
            {
                question: "How many antenatal visits and pregnancy scans are covered on this plan?",
                answer: "The maternity basket includes up to 8 antenatal consultations and up to 2 pregnancy ultrasound scans covered as described in the guide."
            },
            {
                question: "If I don’t use Discovery’s designated providers for oncology medicine, can that cost me extra?",
                answer: "Yes—the guide notes a 20% co-payment can apply for oncology medicine if you don’t use the designated service provider approach described, and oncology medicine is covered up to 100% of the Discovery Health Rate or the Oncology Reference Price (whichever is applicable)."
            }
        ]
    },
    {
        id: "discovery-keycare-plus-network-2026",
        price: 3980,
        savings_annual: 0,
        identity: {
            scheme_name: "Discovery Health Medical Scheme",
            plan_name: "KeyCare Plus",
            plan_series: "KeyCare Plans",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    {
                        min: 16601,
                        max: 999999999,
                        main: 3980,
                        adult: 3980,
                        child: 1064
                    },
                    {
                        min: 10251,
                        max: 16600,
                        main: 2695,
                        adult: 2695,
                        child: 760
                    },
                    {
                        min: 0,
                        max: 10250,
                        main: 1961,
                        adult: 1961,
                        child: 713
                    }
                ],
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "KeyCare Network",
        network_details: {
            hospitals: "Network",
            gps: "Nominated",
            specialists: "Referral Required"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 20
            },
            casualty: {
                status: "Risk",
                value: 520
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 8,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "Excluded",
            admission_penalty_non_network: "Full Account"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Planned admissions at non-network hospitals are not paid (full account), unless treated as PMB where only 80% of DHR applies.",
        faq: [
            {
                question: "If I go to a hospital that is not in the KeyCare hospital network for a planned procedure, will the scheme pay anything?",
                answer: "For planned admissions outside the KeyCare hospital network, the hospital and related accounts are not paid; only PMB admissions have partial payment rules, so using the network is essential."
            },
            {
                question: "Do I need to nominate a specific GP, or can I see any GP and still get full cover?",
                answer: "Full cover for GP consultations depends on visiting your nominated KeyCare Network GP, and using other GPs can trigger member payments under the rules."
            },
            {
                question: "Do I need a referral and a reference number before I see a specialist?",
                answer: "Specialist visits require referral by your nominated network GP and a reference number from the scheme before the consultation to be covered under the Specialist Benefit rules."
            },
            {
                question: "Is there any cover for a non-emergency casualty visit, and what do I pay?",
                answer: "There is cover for one casualty visit per person per year at a network hospital casualty unit, and you pay the first R520 of the consultation (the scheme pays thereafter under the plan rules)."
            },
            {
                question: "If I’m diagnosed with cancer, do I have cover beyond Prescribed Minimum Benefits?",
                answer: "Cancer treatment described in the plan guide is tied to Prescribed Minimum Benefit rules and requires using the designated providers/network arrangements to avoid shortfalls."
            },
            {
                question: "Could I pay extra for oncology medicine even if my cancer treatment is approved?",
                answer: "A co-payment applies if approved oncology medicine is not obtained through the designated service provider arrangements described for oncology medicine."
            },
            {
                question: "When does preauthorisation become important for my GP visits?",
                answer: "Preauthorisation is required after a stated number of GP visits, so heavy GP use can trigger extra admin steps even though visits are described as unlimited when medically appropriate."
            },
            {
                question: "Are joint replacements covered on KeyCare Plus?",
                answer: "Joint replacements are listed under KeyCare plan exclusions, except where a defined benefit or Prescribed Minimum Benefit rules require cover in specific circumstances."
            },
            {
                question: "What maternity care is included on this plan?",
                answer: "The maternity basket includes up to eight antenatal consultations, up to two 2D ultrasound scans (or an alternative combination described), and defined post-birth support including limited baby visits to a GP/paediatrician/ENT specialist."
            },
            {
                question: "How many chronic conditions are covered under the Chronic Illness Benefit?",
                answer: "The plan guide states the Chronic Illness Benefit covers the defined Chronic Disease List of 27 conditions, subject to application and scheme rules."
            }
        ]
    },
    {
        id: "discovery-executive-any-2026",
        price: 12338,
        savings_annual: 34284,
        identity: {
            scheme_name: "Discovery Health Medical Scheme",
            plan_name: "Executive Plan",
            plan_series: "Executive Health",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 11430,
                    adult: 11430,
                    child: 2185
                },
                msa_structure: {
                    type: "Fixed",
                    value: 34284
                }
            },
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 12338,
                    adult: 12338,
                    child: 2358
                },
                msa_structure: {
                    type: "Fixed",
                    value: 34284
                }
            }
        ],
        network_restriction: "Any (private hospitals approved by the Scheme)",
        network_details: {
            hospitals: "Any",
            gps: "Network",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 300,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 500000,
                copay_percentage: 20
            },
            casualty: {
                status: "No Benefit",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 12,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 49,
        procedure_copays: {
            scope_in_hospital: 6800,
            scope_out_hospital: 4650,
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Recommended",
        red_flag: "Cancer treatment is limited to an initial R500,000 (12-month cycle), after which cover can drop to 80% of the Discovery Health Rate for subsequent treatment (unless PMB/extended cover applies).",
        faq: [
            {
                question: "If I’m diagnosed with cancer, what happens if my treatment costs go above the plan’s oncology cover amount?",
                answer: "Approved cancer treatment is covered over a 12-month cycle, with the first R500,000 covered; if costs exceed that amount, subsequent treatment may be paid at up to 80% of the Discovery Health Rate unless it is PMB treatment or qualifies for the plan’s extended oncology arrangements."
            },
            {
                question: "Does the oncology cover amount apply per year, per diagnosis, or per treatment cycle?",
                answer: "The oncology cover amount is described as applying over a 12-month cycle for approved cancer treatment."
            },
            {
                question: "Will I ever face a co-payment for oncology treatment even if I’m on the Executive Plan?",
                answer: "Yes—once the initial oncology cover amount is exceeded, subsequent non-PMB/non-extended treatment may be paid at up to 80% of the Discovery Health Rate (effectively leaving a possible 20% shortfall)."
            },
            {
                question: "If my cancer treatment is a Prescribed Minimum Benefit (PMB), can it still be affected by the oncology cover amount?",
                answer: "PMB cancer treatment is stated as always covered in full, even if treatment costs exceed the oncology cover amount."
            },
            {
                question: "Do I need to register or get approval before cancer treatment will be paid from the Oncology Benefit?",
                answer: "Yes—cancer treatment is described as being covered on the Oncology Care Programme once treatment is approved."
            },
            {
                question: "If my specialist charges above the Discovery Health Rate during cancer treatment, am I protected from shortfalls?",
                answer: "Not necessarily—cancer-related healthcare services are stated as covered up to 100% of the Discovery Health Rate, and a co-payment/shortfall can apply if the provider charges above that rate."
            },
            {
                question: "If I’m stable but I’m not using a designated service provider (DSP), what is the risk for PMB cover?",
                answer: "Where a designated service provider is required and not used, the brochure indicates payment can drop to 80% of the Discovery Health Rate, leaving the member liable for the difference."
            },
            {
                question: "Is hospital cover capped overall on the Executive Plan, or could I still hit an annual hospital limit?",
                answer: "The brochure states there is no overall annual limit for hospital cover on the Executive Plan, but some specific treatments and benefits can have limits and rules."
            },
            {
                question: "Do I have to preauthorise hospital admissions to avoid payment issues?",
                answer: "Yes—the brochure indicates planned hospital stays should be confirmed (preauthorised), and that not doing so can affect cover except where required under defined benefits or PMBs."
            },
            {
                question: "If I’m travelling and have a medical emergency, is it treated differently from a normal emergency back home?",
                answer: "The brochure states the plan covers medical emergencies when travelling, subject to the plan’s travel/emergency benefit rules and exclusions described in the document."
            }
        ]
    },
    {
        id: "discovery-classic-delta-core-network-2026",
        price: 3126,
        savings_annual: 0,
        identity: {
            scheme_name: "Discovery Health Medical Scheme",
            plan_name: "Classic Delta Core",
            plan_series: "Core Plans",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 3126,
                    adult: 2465,
                    child: 1250
                },
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "Delta Hospital Network",
        network_details: {
            hospitals: "Network",
            gps: "Nominated",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200,
            specialist_out_hospital: 0,
            gp_network_consults: "Subject to Personal Health Fund / network GP rules"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 250000,
                copay_percentage: 20
            },
            casualty: {
                status: "No Benefit",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 8,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 9950,
            scope_out_hospital: 3100,
            mri_scan: 0,
            joint_replacement: "Network: no limit stated for planned hip/knee replacements; Outside network: paid up to 80% DHR with prosthesis capped at R31,850 per prosthesis per admission (member pays above cap).",
            admission_penalty_non_network: 11100
        },
        gap_cover_rating: "Recommended",
        red_flag: "Network restriction risk: planned admissions require Delta Hospital Network use or an upfront payment applies.",
        faq: [
            {
                question: "If I go to a private hospital that is not in the Delta Hospital Network for a planned procedure, will I be penalised?",
                answer: "Yes. Planned admissions outside the Delta Hospital Network can trigger an upfront payment requirement; preauthorisation and using the correct network hospital is essential to avoid large out-of-pocket costs."
            },
            {
                question: "If I get cancer treatment, what happens once I reach the Oncology Benefit limit?",
                answer: "The Oncology Benefit covers the first R250,000 in an approved 12-month cycle, and after that the Scheme pays up to 80% of the Discovery Health Rate for subsequent treatment costs (PMB cancer treatment remains covered in full when applicable)."
            },
            {
                question: "Do I have to use a network provider for cancer treatment on Classic Delta Core?",
                answer: "Yes. On the Classic Delta Core Plan, cancer-related healthcare services are covered at a network provider under the Oncology Benefit rules."
            },
            {
                question: "Will I pay extra if my oncologist or hospital charges more than the Discovery Health Rate?",
                answer: "Potentially. The guide notes that cancer-related services are paid up to 100% of the Discovery Health Rate, and members may face co-payments/shortfalls if providers charge above that rate."
            },
            {
                question: "Do I need to nominate a GP to get my chronic benefits paid properly?",
                answer: "Yes. You must nominate a GP in the Discovery Health Network as your Primary Care GP to manage your chronic conditions, and full cover for GP consultations depends on visiting your nominated network GP."
            },
            {
                question: "If my chronic medicine is not on the formulary, am I still covered?",
                answer: "Cover is limited: medicine not on the medicine list formulary is paid up to the generic Reference Price (where applicable) and up to the monthly Chronic Drug Amount for that medicine class."
            },
            {
                question: "If I need a colonoscopy or gastroscopy, will I have to pay upfront?",
                answer: "Often yes, depending on where it is done and whether it qualifies under specific no-upfront-payment scenarios (for example, certain PMB-related or approved circumstances, or in-rooms scopes at a network provider)."
            },
            {
                question: "Are MRI or CT scans always covered?",
                answer: "No. MRI and CT scans are paid up to 100% of the Discovery Health Rate when related to a hospital admission and covered from the Hospital Benefit; if not related to admission (or for certain conservative treatment contexts), you may have to pay yourself."
            },
            {
                question: "What maternity cover do I get during pregnancy on this plan?",
                answer: "The Maternity Benefit includes up to 8 antenatal consultations, up to two 2D ultrasound scans (or one 2D plus a nuchal translucency test), defined blood tests, and other defined pregnancy-related services (subject to activation and rules)."
            },
            {
                question: "How do I activate the Maternity Benefit so that my cover applies?",
                answer: "You can activate it by creating your pregnancy/baby profile on the Discovery Health app or website, preauthorising your delivery, or registering your baby as a dependant on the Scheme."
            }
        ]
    },
    {
        id: "discovery-classic-comprehensive-any-2026",
        price: 10037,
        savings_annual: 30111,
        identity: {
            scheme_name: "Discovery Health Medical Scheme",
            plan_name: "Classic Comprehensive",
            plan_series: "Comprehensive",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 9298,
                    adult: 8793,
                    child: 1856
                },
                msa_structure: {
                    type: "Percentage",
                    value: 25
                }
            },
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 10037,
                    adult: 9492,
                    child: 2002
                },
                msa_structure: {
                    type: "Percentage",
                    value: 25
                }
            }
        ],
        network_restriction: "Any private hospital (Scheme-approved)",
        network_details: {
            hospitals: "Any",
            gps: "Nominated",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200,
            specialist_out_hospital: 100,
            gp_network_consults: "Claims paid from available day-to-day benefits (PHF/MSA/limited ATB); no fixed consult count stated."
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 500000,
                copay_percentage: 20
            },
            casualty: {
                status: "No Benefit",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 12,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 49,
        procedure_copays: {
            scope_in_hospital: 8400,
            scope_out_hospital: 3100,
            mri_scan: 4000,
            joint_replacement: 31850,
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Recommended",
        red_flag: "Scopes can trigger significant upfront payments (up to R8,400) if done outside the Day Surgery Network.",
        faq: [
            {
                question: "If I get diagnosed with cancer, what happens when my cover goes past R500,000?",
                answer: "Cancer cover is limited to R500,000 over a 12-month cycle at 100% DHR, and after that the plan pays up to 80% of DHR (so you may face a 20% shortfall vs DHR on further approved treatment)."
            },
            {
                question: "Do I need gap cover because specialists can charge above scheme rates?",
                answer: "In hospital the plan can pay up to 200% of the Discovery Health Rate for certain providers, but many benefits outside hospital are paid around 100% DHR and the plan has specific co-pay triggers, so gap cover is typically recommended."
            },
            {
                question: "Could I really have to pay R8,400 upfront just to have scopes done?",
                answer: "Yes—if both a gastroscopy and colonoscopy are done in the same admission outside the Day Surgery Network, the stated upfront payment can be up to R8,400 on this plan."
            },
            {
                question: "If I do scopes in a doctor’s rooms, can there still be a co-payment?",
                answer: "Yes—when scopes are performed in-rooms at a non-network provider, the stated co-payment for bi-directional scopes is R3,100."
            },
            {
                question: "If I need an MRI that isn’t linked to a hospital admission, do I pay first?",
                answer: "If the scan is not related to an approved hospital admission, the first R4,000 comes from available day-to-day benefits before the rest can be paid from the Hospital Benefit (up to DHR)."
            },
            {
                question: "How much do I actually pay every month in 2026 as the main member?",
                answer: "From 1 April 2026 the main-member contribution shown for Classic Comprehensive is R10,037 per month."
            },
            {
                question: "How much Medical Savings do I get in a year on this plan?",
                answer: "Because the Medical Savings Account is described as 25% of the monthly contribution, the calculated annual savings allocation based on R10,037 is R30,111."
            },
            {
                question: "If I use a hospital outside a network, is there an automatic upfront admission penalty?",
                answer: "No specific upfront hospital admission penalty is stated for Classic Comprehensive (the guide describes an upfront amount for non-network planned admissions on Classic Smart instead)."
            },
            {
                question: "If I need a planned hip or knee replacement, what’s the risk if I go outside the scheme’s network providers?",
                answer: "For planned hip and knee joint replacements outside the network, the plan’s payment is limited (it pays up to 80% DHR, capped at R31,850 per prosthesis per admission), so there can be large shortfalls if providers charge more."
            },
            {
                question: "How many antenatal visits and pregnancy scans are actually covered?",
                answer: "The Maternity Benefit states cover for up to 12 antenatal consultations and up to two 2D ultrasound scans."
            }
        ]
    },
    {
        // 1. IDENTITY & PRICING
        id: "flexifed-3-any-2026",
        price: 5785, // Risk R4,917 + Savings R868
        savings_annual: 10416, // R868 x 12

        identity: {
            scheme_name: "Fedhealth",
            plan_name: "flexiFED 3",
            plan_series: "FlexiFED Savings",
            plan_type: "Saver",
        },

        // 2. CONTRIBUTIONS MATRIX
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 5785,
                    adult: 5300,
                    child: 2051,
                },
                msa_structure: {
                    type: "Fixed",
                    value: 10416, // Annual savings amount for Main Member
                },
            },
        ],

        // 3. NETWORK GEOGRAPHY
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Nominated", // "Unlimited nominated Network GP benefit"
            specialists: "Any", // "Specialists not on network covered up to Fedhealth Rate"
        },

        // 4. COVERAGE & RATES
        coverage_rates: {
            hospital_account: 100, // Unlimited at Fedhealth Rate
            specialist_in_hospital: 100, // 100% at Fedhealth Rate (Network is full cover)
            specialist_out_hospital: 0, // Paid from savings
            gp_network_consults: "Unlimited",
        },

        // 5. HARD LIMITS
        limits: {
            oncology: {
                status: "Limited",
                value: 360850, // R360 850 per family per year
                copay_percentage: 25, // 25% co-pay for non-DSP
            },
            casualty: {
                status: "Risk",
                value: 9999999, // "Trauma treatment covered unlimited up to Fedhealth Rate"
            },
            internal_prosthesis: {
                sublimit: 28760, // "Combined benefit limit for all unlisted internal prosthesis"
            },
        },

        // 6. CLINICAL BASKETS
        defined_baskets: {
            maternity: {
                antenatal_consults: 12, // "12 ante- and postnatal consults"
                ultrasounds_2d: 2, // "2 x 2D antenatal scans"
                paediatrician_visits: 1, // "1 Paediatric consultation... up to 24 months"
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0, // Covered from Risk (basket), no specific Rand limit stated
                wellness_screening: true,
            },
        },

        // 7. CHRONIC ENGINE
        chronic_conditions: 34, // 27 CDL + 7 Additional (e.g. Acne, ADHD, Depression)

        // 8. CO-PAY MONITOR
        procedure_copays: {
            scope_in_hospital: 5540, // "Colonoscopy, upper GI endoscopy: R5 540"
            scope_out_hospital: 0, // "Specified non-surgical procedures in practitioner’s rooms... Covered in full"
            mri_scan: 3050, // "First R3 050 for non-PMB MRI/ CT scans"
            joint_replacement: 0, // "Single hip and knee replacements with CP: No co-payment"
            admission_penalty_non_network: 0, // No penalty on the "Any" variant
        },

        // 9. ACTUARIAL OPINION
        gap_cover_rating: "Mandatory",
        red_flag: "Internal prosthesis limit of R28,760 is critically low for hip/knee replacements; Oncology is capped at R360,850.",

        // 10. SEO GOLDMINE
        faq: [
            {
                question: "Is my hip replacement fully covered?",
                answer: "While the surgery has no co-payment if you use a Contracted Provider, the internal prosthesis (the device itself) is strictly limited to R28,760. You will be liable for any device cost above this amount, which is often significant.",
            },
            {
                question: "What is the limit for cancer treatment in 2026?",
                answer: "Oncology is covered up to R360,850 per family per year at ICON. A 25% co-payment applies if you do not use a Designated Service Provider.",
            },
            {
                question: "Do I have to pay upfront for an MRI scan?",
                answer: "Yes, you must pay the first R3,050 for any non-PMB MRI or CT scan, whether the scan is performed in or out of hospital.",
            },
            {
                question: "Is there a co-payment for a gastroscopy or colonoscopy?",
                answer: "If performed in hospital, you will pay R5,540. However, if the scope is performed in a practitioner's rooms (non-surgical procedure), it is covered in full.",
            },
            {
                question: "Am I restricted to specific hospitals?",
                answer: "No, this is the standard flexiFED 3 plan, which allows you to use 'Any' private hospital without an admission penalty.",
            },
            {
                question: "How many chronic conditions does flexiFED 3 cover?",
                answer: "You are covered for 34 conditions in total: the 27 Prescribed Minimum Benefit (CDL) conditions plus 7 additional conditions including Acne, ADHD, and Depression.",
            },
            {
                question: "What happens if I go to the emergency room?",
                answer: "Trauma treatment is paid from Risk (unlimited up to the Fedhealth Rate). However, an R880 co-payment applies for non-PMB visits if you are not admitted to the hospital.",
            },
            {
                question: "Does the plan cover my gynaecologist visits during pregnancy?",
                answer: "Yes, the plan covers 12 antenatal or postnatal consultations with a midwife, network GP, or gynaecologist, funded from Risk.",
            },
        ],
    },
    {
        id: "fedhealth-maxima-plus-any-2026",
        price: 19393,
        savings_annual: 7728,
        identity: {
            scheme_name: "Fedhealth",
            plan_name: "maxima PLUS",
            plan_series: "maxima PLUS",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 19393,
                    adult: 16739,
                    child: 5992
                },
                msa_structure: {
                    type: "Fixed",
                    value: 7728
                }
            }
        ],
        network_restriction: "No hospital network (any hospital); nominated Fedhealth Network GP + Fedhealth Specialist Network/DSP rules apply for full cover (PMB/DSP dependent).",
        network_details: {
            hospitals: "Any",
            gps: "Nominated",
            specialists: "Referral Required"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 0,
                copay_percentage: 0
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 67530
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 0,
                ultrasounds_2d: 0,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 3050,
            joint_replacement: 36330,
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Some high-cost services have conditional co-payments and strict DSP/authorisation requirements (e.g., specialist referral pathways and contracted-provider rules).",
        faq: [
            {
                question: "If I go to a non-network GP because my usual doctor is unavailable, will the visit still count toward my threshold and get reimbursed later?",
                answer: "Non-network GP consultations are not treated the same as network GP consultations, and the option rules describe different funding pathways (savings/OHEB/threshold) depending on whether a network GP was used."
            },
            {
                question: "Do I need to nominate a specific network GP, and what happens if I don’t use that nominated GP?",
                answer: "The option rules describe cover being strongest when using a nominated network GP, and claims can be processed differently when a non-network GP is used."
            },
            {
                question: "If I see a specialist without a referral from my network GP, will I pay a penalty or co-payment?",
                answer: "The option rules state that referral rules apply for network specialist pathways and that failing to follow referral requirements can trigger co-payments depending on the benefit category."
            },
            {
                question: "If I need emergency trauma care at a casualty ward but I’m not admitted, will it still be paid from risk?",
                answer: "The option rules describe trauma treatment in a casualty ward as covered from risk subject to authorisation rules and timelines."
            },
            {
                question: "If I forget to get authorisation after an emergency hospital visit, will the scheme penalise the claim?",
                answer: "The option rules require authorisation within specified timeframes for emergencies, and missing these steps can lead to penalties or reduced funding."
            },
            {
                question: "Are MRI/CT scans covered out of hospital, and do I still need pre-authorisation?",
                answer: "The option rules state specialised radiology (including MRI/CT) is covered from risk but requires pre-authorisation, and specific non-PMB cost-sharing rules can apply."
            },
            {
                question: "If I need a planned hip or knee replacement, do I have to use specific contracted provider networks to avoid a co-payment?",
                answer: "The option rules state that certain joint replacements require using contracted provider arrangements and completing programme steps to avoid co-payments and benefit exclusions."
            },
            {
                question: "Is cancer treatment covered only if I register on the oncology disease management programme?",
                answer: "The option rules require registration on the oncology disease management programme after diagnosis and describe ongoing management requirements for changes to treatment plans."
            },
            {
                question: "If I’m pregnant, how long do I have to add my newborn, and what happens if I miss that window?",
                answer: "The option rules state there is a limited period after birth to add a newborn underwriting-free, and missing that timeframe can result in underwriting being applied."
            },
            {
                question: "Do I only pay for three children, and does the child rate apply up to a specific age?",
                answer: "The option rules state a maximum of three children are paid for (with additional children covered) and that child rates apply up to a specified age limit."
            }
        ]
    },
    {
        id: "fedhealth-myfed-individual-network-2026",
        price: 1719,
        savings_annual: 0,
        identity: {
            scheme_name: "Fedhealth",
            plan_name: "myFED",
            plan_series: "myFED",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    {
                        min: 1,
                        max: 11063,
                        main: 1719,
                        adult: 1719,
                        child: 779
                    },
                    {
                        min: 11064,
                        max: 15617,
                        main: 1971,
                        adult: 1971,
                        child: 931
                    },
                    {
                        min: 15618,
                        max: 21651,
                        main: 2453,
                        adult: 2453,
                        child: 966
                    },
                    {
                        min: 21652,
                        max: null,
                        main: 4052,
                        adult: 4052,
                        child: 1281
                    }
                ],
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "myFED Hospital Network; myFED GP Network; Fedhealth Specialist Network",
        network_details: {
            hospitals: "Network",
            gps: "Nominated",
            specialists: "Referral Required"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 25
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 0,
                ultrasounds_2d: 0,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 1040,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: "Co-payment applies (non-network hospital use)"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Strong network rules apply (nominated GP, referral pathways, and hospital network); voluntary out-of-network use triggers co-payments and/or limited reimbursement.",
        faq: [
            {
                question: "If I don’t nominate a GP, will my day-to-day GP visits still be paid?",
                answer: "GP cover is structured around using a nominated contracted GP in the myFED GP Network; limited cover exists for certain non-nominated/non-contracted GP visits, and protocols/utilisation monitoring can apply."
            },
            {
                question: "Can I see a specialist directly, or do I need a GP referral first?",
                answer: "Specialist benefits depend on using the Fedhealth Specialist Network and being referred by a contracted GP; going without a referral can trigger an upfront co-payment, and non-network specialist consultations have no benefit."
            },
            {
                question: "What happens if I choose a hospital that is not in the myFED Hospital Network?",
                answer: "Hospital cover is designed around the myFED Hospital Network; voluntary use of a non-network hospital attracts a co-payment, and after emergency stabilisation you may be expected to transfer to a network hospital to avoid additional cost."
            },
            {
                question: "If I go to casualty for stitches or a fracture and I’m not admitted, will it still be covered?",
                answer: "Emergency trauma treatment in a casualty/trauma unit is paid from Risk whether or not you are admitted, but authorisation timeframes apply and non-PMB visits can attract a co-payment per visit."
            },
            {
                question: "Are chronic medicines covered for long-term conditions like asthma, diabetes or hypertension?",
                answer: "Chronic medicine cover applies to PMB CDL conditions and is funded according to formulary rules and the Medicine Price List; designated pharmacy network rules apply and non-compliant use can trigger co-payments."
            },
            {
                question: "Is cancer treatment covered, and do I have to use ICON?",
                answer: "Oncology is covered at PMB level of care at the designated service provider (ICON), subject to protocols and registration on the oncology programme; using non-DSP arrangements can trigger a co-payment."
            },
            {
                question: "Is contraception covered, and are there restrictions on what it can be prescribed for?",
                answer: "Female contraception is covered subject to an approved list and must be prescribed by a GP or gynaecologist; it is not intended for pills prescribed for acne."
            },
            {
                question: "How does mental health cover work on myFED (out of hospital and in hospital)?",
                answer: "Out-of-hospital mental health consultations are linked to the GP benefit and are limited; in-hospital mental health treatment is covered at PMB level of care at the relevant network facility, while voluntary use of non-network facilities attracts a co-payment."
            },
            {
                question: "Are MRI/CT scans covered if I need one urgently?",
                answer: "Specialised radiology is not covered as a day-to-day (out-of-hospital) benefit on myFED, but in-hospital specialised radiology can be paid from Risk subject to authorisation and an annual limit."
            },
            {
                question: "How many child dependants can I add, and until what age do they count at child rates?",
                answer: "The option indicates a maximum number of child dependants and applies child rates up to a stated age threshold for child dependants."
            }
        ]
    },
    {
        id: "fedhealth-flexifed-savvy-network-2026",
        price: 1604,
        savings_annual: 5388,
        identity: {
            scheme_name: "Fedhealth",
            plan_name: "flexiFED Savvy",
            plan_series: "flexiFED",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 1604,
                    adult: 1155,
                    child: 849
                },
                msa_structure: {
                    type: "Fixed",
                    value: 5388
                }
            }
        ],
        network_restriction: "flexiFEDSavvy Hospital Network + Fedhealth Network GP (nominated) + Fedhealth Network Specialists",
        network_details: {
            hospitals: "Network",
            gps: "Nominated",
            specialists: "Referral Required"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "Unlimited virtual + 3 face-to-face per beneficiary (Risk-funded)"
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 25
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 0,
                ultrasounds_2d: 0,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 28,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "Excluded unless PMB",
            admission_penalty_non_network: "30% co-payment on voluntary use of non-network hospitals (and 30% for non-network mental health facilities)"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Specialist consultations are paid from savings and the annual day-to-day savings pool is limited, while voluntary non-network hospital use triggers a percentage co-payment.",
        faq: [
            {
                question: "If I forget to nominate a network GP, will my GP visits still be paid from Risk?",
                answer: "Full cover depends on using the required network structure (including a nominated network GP) for benefits to be refunded in full, otherwise reimbursement is at the scheme’s non-network terms."
            },
            {
                question: "Do I need a referral before seeing a network specialist, or will I get penalised?",
                answer: "A referral from a network GP is required for network specialist consultations; if referral is not obtained, a co-payment can apply on specialist claims paid from Risk (option dependent)."
            },
            {
                question: "Are specialist visits outside hospital paid by the scheme, or do they come out of my savings?",
                answer: "Medical specialist consultations and visits (including psychiatrists) are described as paid from savings on this option."
            },
            {
                question: "If I go to a non-network hospital by choice, will the plan still cover me?",
                answer: "The plan indicates a percentage co-payment on the hospital account for voluntary use of non-network hospitals, even though the in-hospital benefit is otherwise described as unlimited at network hospitals."
            },
            {
                question: "If I go to the casualty/trauma unit but I’m not admitted, is it still covered from Risk?",
                answer: "The scheme describes trauma treatment in a casualty ward as covered up to the Fedhealth Rate, but authorisation rules apply and a co-payment applies to non-PMB visits when not admitted directly."
            },
            {
                question: "Is cancer cover unlimited, and do I have to use ICON?",
                answer: "Oncology is described as covered at PMB level of care via the designated service provider (ICON), and using a non-DSP attracts a percentage co-payment."
            },
            {
                question: "Will my chronic medicine be covered in full if I use any pharmacy?",
                answer: "Chronic medicine is described as covered in full for the listed chronic conditions when using the relevant formulary and designated service provider pharmacies; non-DSP use attracts a percentage co-payment."
            },
            {
                question: "Does this option include maternity day-to-day scans and antenatal visits automatically?",
                answer: "The brochure’s maternity section reflects limited/no routine out-of-hospital maternity day-to-day benefits (with PMB-level care applying where relevant), and pre-authorisation is required for hospital admissions."
            },
            {
                question: "Are colonoscopies and gastroscopies covered if it’s not a PMB condition?",
                answer: "Colonoscopy and upper GI endoscopy are listed as having no benefit unless PMB level of care applies."
            },
            {
                question: "If I don’t use the network for PMB treatment, will the scheme still pay in full?",
                answer: "PMB treatment is funded in full when using the scheme’s network DSPs; choosing not to use DSPs means reimbursement is at the Fedhealth Rate and voluntary non-DSP use can trigger co-payments."
            }
        ]
    },
    {
        id: "fedhealth-flexifedsavvy-network-2026",
        price: 1155,
        savings_annual: 0,
        identity: {
            scheme_name: "Fedhealth",
            plan_name: "flexiFEDSavvy",
            plan_series: "flexiFED",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 1155,
                    adult: 1155,
                    child: 849
                },
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "flexiFEDSavvy Hospital Network; Fedhealth Network GP (nominated); Fedhealth Specialist Network",
        network_details: {
            hospitals: "Network",
            gps: "Nominated",
            specialists: "Referral Required"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "Unlimited virtual + 3 face-to-face per beneficiary (Risk-funded)"
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 25
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 0,
                ultrasounds_2d: 0,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 28,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "Excluded",
            admission_penalty_non_network: "30% of hospital account (voluntary non-network hospital use); R2710 (voluntary non-network day surgery facility)"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Using a non-network hospital voluntarily can trigger a percentage co-payment on the hospital account (and many day-to-day specialist services are self-funded).",
        faq: [
            {
                question: "If I land in a non-network hospital for an emergency, will Fedhealth still pay?",
                answer: "Emergency treatment can be accessed at any hospital, but once stabilised you may need to transfer to a network hospital to avoid network-related co-payments and penalties."
            },
            {
                question: "Do I have to nominate a specific GP, or can I just visit any GP when I’m sick?",
                answer: "Full cover rules rely on using a nominated Fedhealth Network GP, and using non-network GP routes is limited and conditional."
            },
            {
                question: "If I see a specialist without my GP referring me first, will the scheme still pay?",
                answer: "Specialist access is tied to the referral pathway, and non-referral use can trigger scheme-rule consequences (including co-payments) depending on the situation."
            },
            {
                question: "Is oncology fully covered, or only at a specific provider?",
                answer: "Oncology is funded at PMB level of care and is tied to the designated service provider arrangement (ICON), with a co-payment risk if a non-DSP route is used."
            },
            {
                question: "Will my cancer scans like PET-CT be covered if my doctor sends me to a non-network provider?",
                answer: "High-cost oncology imaging is subject to PMB/DSP rules and scheme protocols, and non-DSP use can trigger a co-payment requirement."
            },
            {
                question: "If I go to casualty for stitches or a fracture but I’m not admitted, will it count?",
                answer: "Trauma treatment in a casualty ward is covered under specific authorisation rules, and non-PMB casualty use can result in a co-payment."
            },
            {
                question: "Do I need authorisation for planned admissions, and what happens if I forget?",
                answer: "Planned hospital admissions require pre-authorisation, and late/no authorisation can lead to penalties under the scheme rules."
            },
            {
                question: "Are MRI/CT scans really unlimited, and do I need approval first?",
                answer: "MRI/CT scans are covered subject to authorisation requirements and scheme protocols, so approval rules still apply even where the benefit is described as broad."
            },
            {
                question: "Is depression medication covered as a chronic benefit on this plan?",
                answer: "Depression is listed as an additional chronic condition on this option, but formulary/DSP rules and approved medication lists still apply."
            },
            {
                question: "If I want a C-section for non-medical reasons, will I be penalised?",
                answer: "Elective (non-medically indicated) Caesarean sections are shown as attracting a co-payment on this option, so the clinical reason and authorisation pathway matter."
            }
        ]
    },
    {
        id: "fedhealth-flexifed-4-any-2026",
        price: 7941,
        savings_annual: 16200,
        identity: {
            scheme_name: "Fedhealth",
            plan_name: "flexiFED 4",
            plan_series: "flexiFED",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 7941,
                    adult: 7248,
                    child: 2388
                },
                msa_structure: {
                    type: "Fixed",
                    value: 16200
                }
            }
        ],
        network_restriction: "Acute hospitals: Any (scheme-approved private facilities); Day Surgery: Fedhealth Day Surgery Facilities Network (co-payment if non-network); Providers: Fedhealth Network GPs and Fedhealth Specialist Network; Oncology DSP: ICON",
        network_details: {
            hospitals: "Any",
            gps: "Network",
            specialists: "Referral Required"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 514570,
                copay_percentage: 25
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 28760
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 12,
                ultrasounds_2d: 2,
                paediatrician_visits: 1
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 3230,
            scope_out_hospital: 0,
            mri_scan: 3050,
            joint_replacement: 36330,
            admission_penalty_non_network: 2710
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Out-of-hospital spend relies heavily on Savings/D2D and once Threshold applies, many services are subject to percentage co-pay and referral/network rules.",
        faq: [
            {
                question: "If I get cancer, am I covered only at specific providers, and what happens if I don’t use them?",
                answer: "On this plan, oncology is limited to R514570 per family per year at the designated service provider (ICON), and using a non-DSP triggers a percentage co-payment as per the rules."
            },
            {
                question: "Does this plan have a hard rand cap for oncology, or is it unlimited once I’m on treatment?",
                answer: "The brochure states a defined family annual oncology limit of R514570, so it is not described as unlimited cover above that amount."
            },
            {
                question: "If I need an internal prosthesis that isn’t specifically listed, what’s the maximum the scheme will pay?",
                answer: "For unlisted internal prostheses/devices, the brochure shows a combined benefit limit of R28760, so that is the stated cap for that category."
            },
            {
                question: "If my doctor recommends a prosthesis that costs more than the plan limit, will I have to pay the difference?",
                answer: "If the required device falls into the unlisted internal prosthesis category capped at R28760, costs above that cap would not be covered by that stated limit and could leave a shortfall depending on billing and authorisation."
            },
            {
                question: "Do I have to use specific hospitals on this option, or can I use any private hospital for planned admissions?",
                answer: "This standard flexiFED 4 option is described as providing unlimited private hospital cover at any scheme-approved facility, but specific network rules still apply to certain facility types like day surgery networks."
            },
            {
                question: "Are my day-to-day GP visits paid from Savings, or are they covered by the plan from the start?",
                answer: "Network GP consultations are described as being paid from Risk from Rand 1 (not from Savings) under the plan’s network GP rules."
            },
            {
                question: "If I see a specialist without a GP referral, can the plan penalise me?",
                answer: "The brochure indicates referral-driven rules that can trigger co-payments in certain scenarios, so specialist access should be managed via the plan’s referral requirements to avoid penalties."
            },
            {
                question: "What happens when my Savings run out—do benefits stop completely?",
                answer: "Once Savings are depleted and the plan’s self-payment gap and Threshold process is reached, an above-threshold benefit unlocks, but it is still subject to co-payment and sub-limit rules."
            },
            {
                question: "Is emergency/casualty treatment covered by the scheme, or will I always pay from Savings?",
                answer: "Trauma treatment in a casualty ward is listed as a day-to-day benefit paid from Risk (subject to authorisation and rules), rather than being described as Savings-only."
            },
            {
                question: "Is this plan ‘medical savings only’ for day-to-day, or does it include extra insured day-to-day benefits too?",
                answer: "The option is described as having an annual Savings pool plus multiple day-to-day benefits paid from Risk (for example, network GP rules and certain defined services), so it is not described as Savings-only."
            }
        ]
    },
    {
        id: "fedhealth-flexifed-2-any-2026",
        price: 4845,
        savings_annual: 8724,
        identity: {
            scheme_name: "Fedhealth Medical Scheme",
            plan_name: "flexiFED 2 Savings Plan",
            plan_series: "flexiFED",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 4845,
                    adult: 4312,
                    child: 1432
                },
                msa_structure: {
                    type: "Fixed",
                    value: 8724
                }
            }
        ],
        network_restriction: "Any private hospital (Scheme-approved); Scriptpharm Network Pharmacies for chronic medicine (30% co-payment for non-DSP); Fedhealth Network GPs must be nominated",
        network_details: {
            hospitals: "Any",
            gps: "Nominated",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 321570,
                copay_percentage: 25
            },
            casualty: {
                status: "Risk",
                value: 880
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 8,
                ultrasounds_2d: 2,
                paediatrician_visits: 1
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 28,
        procedure_copays: {
            scope_in_hospital: 5540,
            scope_out_hospital: 0,
            mri_scan: 3050,
            joint_replacement: "No benefit",
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Joint replacements require OrthoCare Programme completion first and use of specific Contracted Providers (no benefit otherwise), and multiple procedure-specific co-payments can add up quickly (R5,540 for scopes, R8,190 for back/neck procedures, R10,930 for arthroscopic procedures).",
        faq: [
            {
                question: "If I'm diagnosed with cancer, how much will the Scheme cover and do I need to use a specific provider?",
                answer: "The Scheme covers up to R321570 per family per year for oncology treatment if you use ICON, the designated service provider, and follow Essential protocols. If you voluntarily use a non-designated provider, you must pay a 25% upfront co-payment on your cancer treatment costs."
            },
            {
                question: "Do I have to pay anything out-of-pocket when I go to a casualty ward for an injury?",
                answer: "Yes, if your casualty visit is not a Prescribed Minimum Benefit (PMB) emergency and you're not admitted to hospital immediately, you will pay a co-payment of R880 per visit. You must obtain authorisation within 48 hours after the visit."
            },
            {
                question: "Can I use any pharmacy to collect my chronic medication, or do I need to use a specific network?",
                answer: "You must use a Scriptpharm Network Pharmacy to collect your chronic medication. If you use a non-network pharmacy, a 30% co-payment will apply to your chronic medicine claims."
            },
            {
                question: "If I need a colonoscopy or gastroscopy, will I have to pay anything upfront?",
                answer: "Yes, there is a co-payment of R5540 for colonoscopy or upper GI endoscopy (gastroscopy) procedures. These procedures require pre-authorisation."
            },
            {
                question: "If my doctor orders an MRI or CT scan, do I pay part of the cost myself?",
                answer: "Yes, the first R3050 of non-PMB MRI or CT scans is paid by you (the member). The Scheme covers the balance from the Risk benefit after you've paid this amount. Pre-authorisation is required."
            },
            {
                question: "Will the Scheme cover my knee or hip replacement surgery, and are there special requirements?",
                answer: "There is no benefit for single hip and knee replacements unless you first complete the Fedhealth OrthoCare Spinal Programme and use a Contracted Provider (ICPS Hip and Knee network, JointCare, Surge Orthopaedics, or Major Joints for Life). If you don't meet both requirements, the procedure is not covered."
            },
            {
                question: "Is my depression medication covered on this plan, and if so, how much?",
                answer: "Yes, depression is covered as an additional chronic condition on flexiFED 2. Depression medication is covered up to R2400 per beneficiary per year, subject to an approved list of medications."
            },
            {
                question: "Do I need to nominate a specific GP, and what happens if I visit a different doctor?",
                answer: "Yes, you must nominate up to 2 Network GPs per beneficiary. If you visit your nominated Network GP, consults are paid from your Savings or D2D benefit, and once you reach your Threshold, unlimited consults are covered with a 20% co-payment. If you visit a non-nominated or non-network GP, consults are paid from Savings (pre-Threshold) or limited to 2 consults per beneficiary (post-Threshold)."
            }
        ]
    },
    {
        id: "fedhealth-flexifed1-network-2026",
        price: 2630,
        savings_annual: 324,
        identity: {
            scheme_name: "Fedhealth Medical Scheme",
            plan_name: "flexiFED 1",
            plan_series: "flexiFED Hospital Plan",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 2630,
                    adult: 2061,
                    child: 963
                },
                msa_structure: {
                    type: "Fixed",
                    value: 324
                }
            }
        ],
        network_restriction: "flexiFED 1 Hospital Network",
        network_details: {
            hospitals: "Network",
            gps: "Nominated",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 25
            },
            casualty: {
                status: "Risk",
                value: 880
            },
            internal_prosthesis: {
                sublimit: 0
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
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 28,
        procedure_copays: {
            scope_in_hospital: 8190,
            scope_out_hospital: 8190,
            mri_scan: 4230,
            joint_replacement: "No Benefit",
            admission_penalty_non_network: "30% of hospital account"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Cancer treatment covered at PMB level only with mandatory use of ICON network (25% co-payment for non-DSP). Joint replacements have no benefit unless PMB-qualifying. Hospital network mandatory (30% co-payment for voluntary non-network use).",
        faq: [
            {
                question: "If I'm diagnosed with cancer, will my treatment be covered in full or do I need to use a specific provider?",
                answer: "Cancer treatment on flexiFED 1 is covered unlimited at PMB (Prescribed Minimum Benefit) level of care only, and you must use the designated service provider ICON. If you choose not to use ICON, a 25% upfront co-payment applies on the treatment cost. You must register on the Oncology Management Programme and submit a treatment plan."
            },
            {
                question: "What happens if I need cancer treatment that goes beyond PMB level of care?",
                answer: "On flexiFED 1, non-PMB oncology treatment has no benefit coverage. This includes specialised oncology drugs not covered at PMB level, brachytherapy materials, and certain advanced treatments. Only PMB-qualifying cancer treatment is covered."
            },
            {
                question: "If I visit a casualty ward for stitches or a fracture, will I have to pay anything out of pocket?",
                answer: "Yes—trauma treatment in a casualty ward is covered from Risk, but a co-payment of R880 per visit applies for non-PMB visits. You must obtain authorisation within 48 hours (2 working days) after the visit to have the claim paid from Risk and avoid a larger penalty of R1,000."
            },
            {
                question: "Do I have to nominate a specific GP, or can I see any network doctor?",
                answer: "You must nominate up to 2 network GPs per beneficiary. Pre-Threshold, visits to your nominated network GP are self-funded but accumulate toward your Threshold. Once in Threshold, you get unlimited nominated network GP visits with a 20% co-payment. Non-nominated or non-network GP visits have limited cover."
            },
            {
                question: "If I need a knee replacement, will the plan cover it or is there a co-payment?",
                answer: "Single hip and knee replacements have no benefit on flexiFED 1 unless they qualify as PMB. Even with the contracted provider requirement, this plan states 'No benefit' for joint replacements. Members needing elective joint surgery would likely need to upgrade to a higher plan or pay the full cost."
            },
            {
                question: "Can I use any private hospital or am I restricted to a network?",
                answer: "You must use the flexiFED 1 Hospital Network. If you voluntarily choose a non-network hospital, a 30% co-payment applies on the hospital account. For day surgery facilities outside the network, a R2,710 co-payment applies. Emergency admissions allow any hospital initially, but transfer to a network facility may be required once stabilised."
            },
            {
                question: "If I need an MRI or CT scan, will I have to pay anything upfront?",
                answer: "Yes—for non-PMB MRI/CT scans, the first R4,230 is for your account (you pay upfront). After that, scans are covered at the Fedhealth Rate. PET and PET-CT scans for oncology are covered at PMB level of care at the network DSP, or you pay a R5,670 co-payment if using a non-DSP."
            },
            {
                question: "What happens if my specialist charges more than the Fedhealth Rate?",
                answer: "Network specialists are covered in full when treating you in-hospital. However, non-network specialists are covered only up to the Fedhealth Rate, meaning you are responsible for any shortfall if they charge more. This makes gap cover highly recommended on this plan."
            },
            {
                question: "If I need a colonoscopy or gastroscopy in hospital, will I face a co-payment?",
                answer: "Yes—colonoscopies and upper GI endoscopies (gastroscopies) in hospital have a co-payment of R8,190 on flexiFED 1. Note that general anaesthetic will not be paid for these procedures when done in a practitioner's room."
            },
            {
                question: "Is my depression medication covered, and if so, how much?",
                answer: "Depression is listed as an additional chronic condition covered on flexiFED 1, with depression medication covered up to R2,400 per beneficiary per annum, subject to an approved list of medications. After the R2,400 limit is reached, medication would be subject to available Fedhealth Savings (if activated)."
            }
        ]
    },
    {
        id: "medihelp-medelite-any-2026",
        price: 8922,
        savings_annual: 10728,
        identity: {
            scheme_name: "Medihelp",
            plan_name: "MedElite",
            plan_series: "MedElite",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 8922,
                    adult: 8352,
                    child: 2418
                },
                msa_structure: {
                    type: "Fixed",
                    value: 10728
                }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "Unlimited from savings"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 504000,
                copay_percentage: 0
            },
            casualty: {
                status: "Risk",
                value: 9999999
            },
            internal_prosthesis: {
                sublimit: 81200
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 10,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2520,
                wellness_screening: true
            }
        },
        chronic_conditions: 26,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 25700,
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Recommended",
        red_flag: "Hip/knee/shoulder wear-and-tear limited to R25,700 combined hospital and prosthesis",
        faq: [
            {
                question: "Will I be covered if I need a hip replacement due to arthritis?",
                answer: "MedElite provides limited cover for hip, knee, and shoulder replacements caused by wear and tear. The benefit is capped at R25,700 combined for both the hospital account and prosthesis components per admission. However, replacements caused by acute injury are covered in full under the R81,200 per person health-essential functional prosthesis benefit."
            },
            {
                question: "What happens when my R10,728 savings runs out during the year?",
                answer: "Once your medical savings account is depleted, insured day-to-day benefits activate automatically. For a single member, you receive up to R15,200 in annual day-to-day benefits covering GP visits, specialists, medicine, and other services. This includes R3,850 for consultations, R5,000 for acute medicine, and R5,950 for non-PMB chronic medicine."
            },
            {
                question: "Is my cancer treatment fully covered or is there a limit?",
                answer: "Cancer treatment on MedElite has an annual family limit of R504,000 per year. While this provides substantial cover, it is not unlimited. Prescribed Minimum Benefit (PMB) oncology conditions receive unlimited cover for PMB medicine, but the overall cancer treatment benefit remains capped at R504,000."
            },
            {
                question: "Do I need to use a specific hospital or can I go anywhere?",
                answer: "MedElite allows you to use any private hospital in South Africa without network restrictions. The plan states 'Any private hospital, and day procedure facilities apply for certain day procedures,' giving you full choice of where to receive treatment."
            },
            {
                question: "Are my MRI and CT scans covered without a co-payment?",
                answer: "Specialised radiology including MRI and CT scans is covered with a family limit of R40,000 per year. There are no co-payments for these scans, but you are subject to the annual limit. Once the R40,000 family limit is reached, additional scans would need to be paid from your medical savings account or out-of-pocket."
            },
            {
                question: "If I go to casualty for an emergency, will I have to pay upfront?",
                answer: "Trauma that necessitates hospitalisation is covered with unlimited benefits from scheme risk, meaning you should not have upfront payments for genuine emergencies requiring admission. The plan specifically states 'Trauma that necessitates hospitalisation: Unlimited' as a core insured benefit."
            },
            {
                question: "Is my depression medication covered if I'm not hospitalised?",
                answer: "Yes, but with limits. MedElite covers treatment of depression out of hospital if you register on the mental health programme. You receive R5,250 per beneficiary per year for services by psychiatrists, psychologists, and other mental health professionals, plus R145 per month for medicine. This is subject to the overall in-hospital psychiatric limit."
            },
            {
                question: "Can I see any specialist or do I need a GP referral first?",
                answer: "MedElite allows you to see any specialist without requiring a GP referral. Specialist visits are paid from your medical savings account initially, and once savings are depleted, from the insured day-to-day benefit pool. However, specialists are typically reimbursed at 100% of the Medihelp scheme rate."
            },
            {
                question: "What chronic conditions are covered and will I need to pay for chronic medicine?",
                answer: "MedElite covers 26 Chronic Disease List (CDL) conditions plus 271 Prescribed Minimum Benefit (PMB) diagnoses. PMB chronic medicine is covered unlimited from scheme risk at no cost to you. Non-PMB chronic medicine is covered from your day-to-day benefits with an annual limit (R5,950 for a single member) once savings are depleted."
            },
            {
                question: "Do I qualify for the Care Extender benefit or do I have to do something first?",
                answer: "The Care Extender benefit (one additional GP consultation plus R1,000 self-medication) activates only after you complete specific health screening tests. You must have your biometric health screening results verified through Dis-Chem or Clicks, and Medihelp must receive and process these results before the benefit becomes available."
            }
        ]
    },
    {
        id: "medihelp-medadd-network-2026",
        price: 3186,
        savings_annual: 5760,
        identity: {
            scheme_name: "Medihelp",
            plan_name: "MedAdd",
            plan_series: "MedAdd",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 3186,
                    adult: 2496,
                    child: 1110
                },
                msa_structure: {
                    type: "Percentage",
                    value: 15
                }
            }
        ],
        network_restriction: "MedAdd Elect: Network hospitals",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 0,
            specialist_in_hospital: 0,
            specialist_out_hospital: 0,
            gp_network_consults: "Paid from savings first; insured day-to-day after savings depletion (GP network on MedAdd Elect)"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 273000,
                copay_percentage: 0
            },
            casualty: {
                status: "Risk",
                value: 4200
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 10,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2310,
                wellness_screening: true
            }
        },
        chronic_conditions: 26,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Recommended",
        red_flag: "Hospitalisation is limited to network hospitals on MedAdd Elect; using a non-network facility may expose you to large shortfalls (scheme rules apply).",
        faq: [
            {
                question: "If I go to a hospital that is not part of the MedAdd Elect hospital network, will the scheme still pay?",
                answer: "MedAdd Elect is described as covering hospitalisation at network hospitals, so using a non-network hospital can create funding risk and potential shortfalls under scheme rules."
            },
            {
                question: "Once my savings are finished, do I still get any day-to-day cover for GP or specialist visits?",
                answer: "After savings are depleted, insured day-to-day benefits become available, but those insured day-to-day benefits are limited (and subject to scheme rules)."
            },
            {
                question: "Are visits to an emergency unit covered after my savings run out, or do I pay cash?",
                answer: "Emergency-unit visits are included in the insured day-to-day basket after savings depletion, but they are capped at R4 200 per family per year."
            },
            {
                question: "Is cancer treatment fully covered, or is there an annual limit I can hit?",
                answer: "Cancer treatment is limited to R273 000 per family per year on this plan summary, after which additional costs could become payable by the member depending on scheme rules."
            },
            {
                question: "Do specialised radiology tests have limits or co-payments on this plan?",
                answer: "Specialised radiology is limited and the summary notes that co-payments apply, so pre-authorisation and benefit checks matter before proceeding."
            },
            {
                question: "Do I have to use a specific GP network on MedAdd Elect for day-to-day GP visits?",
                answer: "The summary indicates a GP network applies for MedAdd Elect, so using non-network providers may reduce cover or increase out-of-pocket costs under scheme rules."
            },
            {
                question: "Does this plan cover depression treatment outside hospital, and do I need to register?",
                answer: "Out-of-hospital depression treatment is described as subject to registration on the Mental Health programme and is limited, so registration requirements can affect funding."
            },
            {
                question: "Are prostheses automatically covered in full, or are there clinical protocols and limits?",
                answer: "The summary indicates prosthesis benefits exist but are benefit-specific and can have clinical limitations and pre-authorisation requirements, so funding depends on the category and the scheme’s protocols."
            }
        ]
    },
    {
        id: "medihelp-medmove-student-network-2026",
        price: 804,
        savings_annual: 0,
        identity: {
            scheme_name: "Medihelp",
            plan_name: "MedMove Student",
            plan_series: "MedMove",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    {
                        min: 0,
                        max: 900,
                        main: 804,
                        adult: 804,
                        child: 804
                    }
                ]
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: 10
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 0
            },
            casualty: {
                status: "No Benefit",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 0,
                ultrasounds_2d: 0,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 1470,
                wellness_screening: true
            }
        },
        chronic_conditions: 26,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "Excluded",
            admission_penalty_non_network: "Full Account"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Strict network restrictions and PMB-only cover for major events like cancer and trauma.",
        faq: [
            {
                question: "Do I have to pay for GP visits?",
                answer: "Yes, there is a R135 co-payment per visit for the first 10 visits. From the 11th visit, cover is restricted to listed conditions only."
            },
            {
                question: "Is there a limit on specialist visits?",
                answer: "Yes, specialist consultations are limited to R1,050 per family per year and must be within the network."
            },
            {
                question: "Do I have to pay an admission fee at the hospital?",
                answer: "Yes, a co-payment of R1,805 applies to all hospital admissions unless it is for a Prescribed Minimum Benefit (PMB) condition."
            },
            {
                question: "Is emergency trauma covered if I am not admitted?",
                answer: "No, trauma cover is only available if the injury necessitates hospitalisation. There is no stated benefit for casualty visits that do not result in admission."
            },
            {
                question: "Are MRI and CT scans covered in full?",
                answer: "No, there is a limit of R13,600 per family for specialised radiology in hospital, and a co-payment applies."
            },
            {
                question: "Can I go to any hospital?",
                answer: "No, you must use a private hospital in the Medihelp Network. Using a non-network hospital may result in significant penalties or non-payment."
            },
            {
                question: "Is my chronic medication covered?",
                answer: "Cover is limited to the 26 Chronic Disease List (CDL) conditions and 271 PMB diagnoses. Non-PMB chronic conditions are not covered."
            },
            {
                question: "Is there a limit for contraceptives?",
                answer: "Yes, oral/injectable contraceptives are limited to R1,470 per year (R120 per month). Intra-uterine devices are covered up to R1,995 every 60 months."
            }
        ]
    },
    {
        id: "medihelp-medprime-elect-network-2026",
        price: 4746,
        savings_annual: 5688,
        identity: {
            scheme_name: "Medihelp",
            plan_name: "MedPrime Elect",
            plan_series: "MedPrime",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 4746,
                    adult: 4002,
                    child: 1380
                },
                msa_structure: {
                    type: "Percentage",
                    value: 10
                }
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Subject to Savings + R7550 Limit"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 336000,
                copay_percentage: 20
            },
            casualty: {
                status: "Savings",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 81200
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 10,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2470,
                wellness_screening: true
            }
        },
        chronic_conditions: 26,
        procedure_copays: {
            scope_in_hospital: 4225,
            scope_out_hospital: 4225,
            mri_scan: 1700,
            joint_replacement: "Acute Injury Only",
            admission_penalty_non_network: "35% of Account"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Hip and knee replacements are strictly limited to acute injury cases only - no cover for wear and tear.",
        faq: [
            {
                question: "Does this plan cover hip replacements for wear and tear?",
                answer: "No. Hip and knee replacements are only covered if they are required due to an acute injury (e.g. a car accident). Wear and tear is explicitly excluded."
            },
            {
                question: "What happens if I use a hospital outside the MedPrime Elect network?",
                answer: "You will be liable for a 35% co-payment on the hospital account. You must use a network hospital to avoid this penalty."
            },
            {
                question: "Is the cancer cover unlimited on MedPrime Elect?",
                answer: "No, the oncology benefit is limited to R336,000 per family per year. Once this limit is reached, you may have to self-fund."
            },
            {
                question: "Do I have to pay upfront for a gastroscopy or colonoscopy?",
                answer: "Yes, there is a R4,225 co-payment for endoscopic procedures, even if performed in a day clinic."
            },
            {
                question: "Is there a limit on my day-to-day medical expenses?",
                answer: "Yes. After your savings are depleted, you have an 'Insured Pooled Benefit' of R7,550 per member. Once this is used, day-to-day cover stops."
            },
            {
                question: "What will I pay if I need an MRI scan?",
                answer: "You will be responsible for the first R1,700 of the scan cost as a co-payment."
            },
            {
                question: "Are contraceptives covered by the scheme?",
                answer: "Yes, contraceptives are covered up to R2,470 per year under the preventative care benefit."
            },
            {
                question: "Do I need a referral to see a specialist?",
                answer: "While you don't strictly need a referral for payment, using the MedPrime Elect Network GPs and Specialists is required to avoid out-of-pocket costs."
            }
        ]
    },
    {
        id: "medihelp-medsaver-any-2026",
        price: 4260,
        savings_annual: 12744,
        identity: {
            scheme_name: "Medihelp",
            plan_name: "MedSaver",
            plan_series: "Savings Series",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 4260,
                    adult: 3504,
                    child: 1302
                },
                msa_structure: {
                    type: "Percentage",
                    value: 25
                }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "R2 600 Family Limit (Post-Savings)"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 288700,
                copay_percentage: 0
            },
            casualty: {
                status: "Savings",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 81200
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 10,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2310,
                wellness_screening: true
            }
        },
        chronic_conditions: 26,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "Acute Injury Only",
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Hip, knee, and shoulder replacements are strictly limited to acute injuries only. Chronic degeneration is excluded.",
        faq: [
            {
                question: "Is there a limit on cancer treatment?",
                answer: "Yes, oncology cover is limited to R288,700 per family per year."
            },
            {
                question: "Will the plan pay for my knee replacement?",
                answer: "Only if the replacement is required due to an acute injury. Replacements for wear and tear (non-PMB) are excluded."
            },
            {
                question: "Do I have a casualty benefit for emergencies?",
                answer: "Trauma necessitating hospitalisation is unlimited. However, standard casualty visits that do not result in admission are subject to your savings."
            },
            {
                question: "What happens when my savings run out?",
                answer: "You have a safety net benefit of R2,600 per family for GPs, specialists, and acute medicine after savings are depleted."
            },
            {
                question: "Until what age do my children pay child rates?",
                answer: "Children pay child dependant rates until they turn 26 years old."
            },
            {
                question: "Is there a limit for contraceptives?",
                answer: "Yes, oral/injectable contraceptives are covered up to R2,310 per year (R170 per month)."
            },
            {
                question: "How much cover do I have for mental health?",
                answer: "Psychiatric hospitalisation is limited to R31,800 per beneficiary, up to a family maximum of R43,800."
            },
            {
                question: "Are there co-payments for MRI scans?",
                answer: "The brochure states that co-payments are applicable for specialised radiology (limited to R30,000 family limit), but exact amounts are subject to scheme rules."
            }
        ]
    },
    {
        id: "medihelp-medreach-network-2026",
        price: 3360,
        savings_annual: 0,
        identity: {
            scheme_name: "Medihelp",
            plan_name: "MedReach",
            plan_series: "MedReach",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 3360,
                    adult: 2634,
                    child: 1092
                }
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "R2 400 Sub-limit"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 273000,
                copay_percentage: 0
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 10,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2205,
                wellness_screening: true
            }
        },
        chronic_conditions: 26,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "PMB Only",
            admission_penalty_non_network: "Full Account"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Low Day-to-Day Limits & Strict Network Rules",
        faq: [
            {
                question: "Is my cancer cover unlimited?",
                answer: "No, the oncology benefit is limited to R273,000 per family per year."
            },
            {
                question: "Do I have unlimited specialist visits?",
                answer: "No, specialist visits are subject to a strict sub-limit of R1,575 per family per year."
            },
            {
                question: "Can I use any GP for consultations?",
                answer: "You should use a Network GP to maximize your R2,400 sub-limit; non-network visits have a lower limit of R1,470."
            },
            {
                question: "Is my depression medication covered?",
                answer: "Yes, but it is limited to R100 per beneficiary per month subject to the in-hospital limit."
            },
            {
                question: "Do I have to pay for contraceptives?",
                answer: "No, contraceptives are covered up to R2,205 per year (R160 per month)."
            },
            {
                question: "Are MRI scans fully covered?",
                answer: "Specialised radiology is limited to R22,000 per family and co-payments apply."
            },
            {
                question: "Is dentistry covered on this plan?",
                answer: "Yes, routine check-ups and fillings are covered via the DRC network."
            },
            {
                question: "What happens if I need a joint replacement?",
                answer: "Internally implanted prostheses are covered for PMB conditions only."
            }
        ]
    },
    {
        id: "medihelp-medmove-student-network-2026",
        price: 804,
        savings_annual: 0,
        identity: {
            scheme_name: "Medihelp",
            plan_name: "MedMove Student",
            plan_series: "MedMove",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    {
                        min: 0,
                        max: 900,
                        main: 804,
                        adult: 804,
                        child: 804
                    }
                ]
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: 10
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 0
            },
            casualty: {
                status: "No Benefit",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 0,
                ultrasounds_2d: 0,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 1470,
                wellness_screening: true
            }
        },
        chronic_conditions: 26,
        procedure_copays: {
            scope_in_hospital: 1805,
            scope_out_hospital: 1805,
            mri_scan: 0,
            joint_replacement: "PMB Only",
            admission_penalty_non_network: "Full Account"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Strict network restrictions and PMB-only cover for major events like cancer and trauma.",
        faq: [
            {
                question: "Do I have to pay for GP visits?",
                answer: "Yes, there is a R135 co-payment per visit for the first 10 visits. From the 11th visit, cover is restricted to listed conditions only."
            },
            {
                question: "Is there a limit on specialist visits?",
                answer: "Yes, specialist consultations are limited to R1,050 per family per year and must be within the network."
            },
            {
                question: "Do I have to pay an admission fee at the hospital?",
                answer: "Yes, a co-payment of R1,805 applies to all hospital admissions and day procedures unless it is for a Prescribed Minimum Benefit (PMB) condition."
            },
            {
                question: "Is emergency trauma covered if I am not admitted?",
                answer: "No, trauma cover is only available if the injury necessitates hospitalisation (PMB). There is no stated benefit for casualty visits that do not result in admission."
            },
            {
                question: "Are MRI and CT scans covered in full?",
                answer: "No, there is a limit of R13,600 per family for specialised radiology in hospital, and a co-payment applies."
            },
            {
                question: "Can I go to any hospital?",
                answer: "No, you must use a private hospital in the Medihelp Network. Using a non-network hospital may result in significant penalties or non-payment."
            },
            {
                question: "Is my chronic medication covered?",
                answer: "Cover is limited to the 26 Chronic Disease List (CDL) conditions and 271 PMB diagnoses. Non-PMB chronic conditions are not covered."
            },
            {
                question: "Is there a limit for contraceptives?",
                answer: "Yes, oral/injectable contraceptives are limited to R1,470 per year (R120 per month). Intra-uterine devices are covered up to R1,995 every 60 months."
            }
        ]
    },
    {
        id: "medihelp-medvital-network-2026",
        price: 2412,
        savings_annual: 0,
        identity: {
            scheme_name: "Medihelp",
            plan_name: "MedVital Elect",
            plan_series: "MedVital",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 2412,
                    adult: 1752,
                    child: 1014
                },
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "Limited to network"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 262500,
                copay_percentage: 0
            },
            casualty: {
                status: "Risk",
                value: 9999999
            },
            internal_prosthesis: {
                sublimit: 30200
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 8,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2205,
                wellness_screening: true
            }
        },
        chronic_conditions: 26,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "Excluded",
            admission_penalty_non_network: "Full Account"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Hip, knee, and shoulder replacements excluded (except for acute injury)",
        faq: [
            {
                question: "Do I have to use specific hospitals on MedVital Elect?",
                answer: "Yes. MedVital Elect is a network plan, meaning you must use private hospitals and day procedure facilities listed in the Medihelp network. Using a non-network hospital (except for emergencies) may result in you being liable for the full account."
            },
            {
                question: "Is there any cover for hip or knee replacements?",
                answer: "No, not for wear and tear. Hip, knee, and shoulder replacements are excluded from cover on MedVital unless they are caused by an acute injury. If the replacement is due to arthritis or aging, you will have no cover from the scheme."
            },
            {
                question: "Does this plan have a medical savings account for day-to-day expenses?",
                answer: "No. MedVital Elect is a hospital plan with no Medical Savings Account (MSA). Day-to-day expenses like standard GP visits and medicines are generally your own responsibility, unless they fall under specific insured benefits like the Care Extender or preventative baskets."
            },
            {
                question: "What is the annual limit for cancer treatment?",
                answer: "The oncology benefit is limited to R262,500 per family per year. This includes all cancer-related treatments. While this provides essential cover, it is significantly lower than comprehensive plans, so gap cover is strongly recommended."
            },
            {
                question: "Are my MRI and CT scans covered in full?",
                answer: "Specialised radiology (MRI and CT scans) is covered, but there is a combined family limit of R20,000 per year. Additionally, co-payments apply to these scans, so you may have out-of-pocket expenses even if you are within the limit."
            },
            {
                question: "Will I have to pay upfront if I go to the emergency room?",
                answer: "If you suffer trauma that necessitates hospitalisation, the scheme covers the casualty costs unlimited from risk. However, for non-emergency casualty visits that do not result in admission, there is no savings account to fund the visit, meaning you will likely pay upfront."
            },
            {
                question: "Can I go to any GP or do I need to use a network?",
                answer: "On MedVital Elect, you are restricted to the MedVital GP network. Using a non-network GP may result in co-payments or no cover, especially for benefits like the Care Extender which rely on network providers."
            },
            {
                question: "Is there cover for mental health and depression?",
                answer: "Yes, but it is limited. In-hospital psychiatric treatment is capped at R25,000 per beneficiary (max R38,200 per family). Out-of-hospital depression treatment is covered up to R3,150 per year per beneficiary, but only if you register on the Mental Health programme."
            },
            {
                question: "What happens if I need an internal prosthesis like a pacemaker?",
                answer: "Health-essential functional prostheses (like pacemakers) are covered up to R30,200 per person. However, other specific prostheses like EVARS or vascular/cardiac prostheses have a higher limit of R45,400 per person."
            },
            {
                question: "Does the plan cover dentistry?",
                answer: "Routine dentistry is generally not covered as there is no savings account. However, the removal of impacted teeth (wisdom teeth) is covered if performed in the dentist's chair (not in hospital) and provided by a DRC network dentist."
            }
        ]
    },
    {
        id: "medihelp-medplus-any-2026",
        price: 15486,
        savings_annual: 0,
        identity: {
            scheme_name: "Medihelp",
            plan_name: "MedPlus",
            plan_series: "MedPlus",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 15486,
                    adult: 15486,
                    child: 3864
                },
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "Any private hospital",
        network_details: {
            hospitals: "Any",
            gps: "Network",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 0,
            specialist_in_hospital: 0,
            specialist_out_hospital: 0,
            gp_network_consults: "Covered within GP/specialist day-to-day limit (R4 700 per person pooled per family)"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 682500,
                copay_percentage: 0
            },
            casualty: {
                status: "No Benefit",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 10,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2520,
                wellness_screening: true
            }
        },
        chronic_conditions: 26,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Recommended",
        red_flag: "The summary does not state scheme-rate multiples (e.g., 100%/200%) for specialists, so potential in-hospital shortfalls are unclear without the full rules.",
        faq: [
            {
                question: "If I’m diagnosed with cancer, what is the maximum the plan will pay in a year before I might start paying myself?",
                answer: "Cancer treatment is limited to R682 500 per family, so costs above that could leave an out-of-pocket gap depending on scheme rules and authorisation."
            },
            {
                question: "Is there a separate emergency room (casualty) facility fee benefit, or could I get a surprise bill at an ER?",
                answer: "This summary does not state a casualty facility-fee limit, so ER-related facility charges could still expose you to unexpected costs depending on how the claim is processed under the rules."
            },
            {
                question: "If I see a GP or specialist often, what’s my day-to-day cap for consultations and similar services?",
                answer: "GP and specialist visits (including several related services) are limited to R4 700 per person pooled per family, so frequent visits can push you into out-of-pocket spending."
            },
            {
                question: "Is non-PMB chronic medicine covered, or only PMB/CDL conditions?",
                answer: "Non-PMB chronic medicine is covered up to R24 200 per person, while PMB medicine is listed as unlimited (subject to rules and authorisation)."
            },
            {
                question: "Are MRI and CT scans restricted, and do I need pre-authorisation even if they’re listed as unlimited?",
                answer: "MRI and CT imaging are listed as unlimited under specialised radiology, but authorisation and clinical protocols can still apply under the scheme rules."
            },
            {
                question: "If I need a PET scan for cancer staging, is there a per-scan limit?",
                answer: "PET scans are limited to R28 800 per case, so higher-cost PET services may create a shortfall depending on provider tariffs."
            },
            {
                question: "If I need a hearing implant, is the device actually covered or only the surgery?",
                answer: "Implantable hearing devices (including device and components) are listed with a benefit limit (and may have additional sub-limits for out-of-hospital components), so funding depends on how the claim is authorised and coded."
            },
            {
                question: "Does using specific provider networks affect my day-to-day benefits (optometry, dentistry, pathology)?",
                answer: "Yes—optometry (Opticlear network), dentistry (DRC network), and pathology networks are specified, so using non-network providers can reduce cover or increase out-of-pocket costs under the rules."
            }
        ]
    },
    {
        id: "medshield-medisaver-network-2026",
        price: 5376,
        savings_annual: 9672,
        identity: {
            scheme_name: "Medshield",
            plan_name: "MediSaver",
            plan_series: "MediSaver",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 5376,
                    adult: 4452,
                    child: 1311
                },
                msa_structure: {
                    type: "Percentage",
                    value: 15
                }
            }
        ],
        network_restriction: "Prime Hospital Network",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 428000,
                copay_percentage: 40
            },
            casualty: {
                status: "Savings",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 57500
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 0,
                ultrasounds_2d: 0,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 3055,
                wellness_screening: true
            }
        },
        chronic_conditions: 26,
        procedure_copays: {
            scope_in_hospital: 1500,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "PMB Only",
            admission_penalty_non_network: "30% upfront co-payment"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Internal Prosthesis limit of R57,500 is insufficient for major joint replacements (hip/knee).",
        faq: [
            {
                question: "What is the annual savings amount for a main member?",
                answer: "The Principal Member is allocated R9,672 per year in their Medical Savings Account for 2026."
            },
            {
                question: "Is there a co-payment for gastroscopy?",
                answer: "Yes, endoscopic procedures attract an R1,500 upfront co-payment. Children 8 years and younger are exempt."
            },
            {
                question: "What is the limit for internal prosthesis?",
                answer: "The limit for internal prosthesis (like hip or knee joints) is R57,500 per family for 2026."
            },
            {
                question: "Does the plan cover oncology?",
                answer: "Yes, but it is limited to R428,000 per family. You must use an ICON provider to avoid a 40% co-payment."
            },
            {
                question: "Is there a penalty for using a non-network hospital?",
                answer: "Yes, voluntary use of a non-Prime Network hospital will result in a 30% upfront co-payment."
            },
            {
                question: "Are wisdom teeth extractions covered?",
                answer: "Yes, but an R800 co-payment applies if performed in a Day Clinic, and R3,500 if performed in a hospital (for impacted teeth)."
            },
            {
                question: "What is the limit for specialised dentistry?",
                answer: "Specialised dentistry is limited to R16,700 per family for 2026."
            },
            {
                question: "Are contraceptives covered?",
                answer: "Yes, oral birth control is covered up to R235 per script for 13 scripts annually (Total R3,055)."
            }
        ]
    },
    {
        id: "medshield-premiumplus-any-2026",
        price: 9489,
        savings_annual: 28464,
        identity: {
            scheme_name: "Medshield",
            plan_name: "PremiumPlus",
            plan_series: "PremiumPlus",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 9489,
                    adult: 8691,
                    child: 1815
                },
                msa_structure: {
                    type: "Percentage",
                    value: 25
                }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Subject to Day-to-Day Limit/Savings"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 500000,
                copay_percentage: 40
            },
            casualty: {
                status: "Savings",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 140000
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 0,
                ultrasounds_2d: 0,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 3055,
                wellness_screening: true
            }
        },
        chronic_conditions: 26,
        procedure_copays: {
            scope_in_hospital: 1000,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Recommended",
        red_flag: "High co-payments for various procedures (e.g. R5,000 for Hysterectomy, R4,000 for Back & Neck surgery).",
        faq: [
            {
                question: "What is my total monthly contribution including savings?",
                answer: "The total monthly contribution for a main member in 2026 is R9,489, which splits into R7,117 for risk and R2,372 for savings."
            },
            {
                question: "How much savings do I get for the year?",
                answer: "The Principal Member gets an annual savings allocation of R28,464."
            },
            {
                question: "Is there a limit on internal prostheses?",
                answer: "Yes, the limit for internal prostheses is R140,000 per family per annum."
            },
            {
                question: "What is the co-payment for oncology if I don't use the ICON network?",
                answer: "If you voluntarily use a non-ICON provider for oncology, you will face a 40% upfront co-payment."
            },
            {
                question: "Are there upfront payments for surgery like a hysterectomy?",
                answer: "Yes, a hysterectomy attracts a R5,000 upfront co-payment."
            },
            {
                question: "Do I have to pay upfront for wisdom teeth removal?",
                answer: "Yes, if done in a Day Clinic, there is an R800 co-payment. If it involves impacted teeth/apicectomy in hospital, the co-payment is R2,000."
            },
            {
                question: "What is the limit for specialized oncology drugs?",
                answer: "The sub-limit for specialized oncology drugs is R500,000 per beneficiary."
            },
            {
                question: "Is there a co-payment for using a non-network pharmacy?",
                answer: "Yes, voluntary use of a non-Medshield Pharmacy Network provider attracts a 20% upfront co-payment."
            }
        ]
    },
    {
        id: "medshield-medicore-any-2026",
        price: 4278,
        savings_annual: 0,
        identity: {
            scheme_name: "Medshield",
            plan_name: "MediCore",
            plan_series: "MediCore Series",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 4278,
                    adult: 3618,
                    child: 987
                }
            }
        ],
        network_restriction: "Network",
        network_details: {
            hospitals: "Network",
            gps: "Any",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 3
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 40
            },
            casualty: {
                status: "No Benefit",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 44000
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
                contraceptives: 3055,
                wellness_screening: true
            }
        },
        chronic_conditions: 26,
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 2000,
            mri_scan: 0,
            joint_replacement: "25%",
            admission_penalty_non_network: "30%"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "30% upfront co-payment for voluntary use of non-Network hospitals and strict R44,000 limit on internal prostheses.",
        faq: [
            {
                question: "Do I have to pay upfront if I use a hospital outside the Medshield network?",
                answer: "Yes, voluntary use of a non-Medshield Network Hospital attracts a 30% upfront co-payment."
            },
            {
                question: "Is there a limit on how much the scheme pays for internal prostheses like hip joints?",
                answer: "Yes, there is a strict Overall Family Limit of R44,000 for internal prostheses. Any cost above this is for your own account."
            },
            {
                question: "Do I need to pay a co-payment for a gastroscopy or colonoscopy?",
                answer: "Yes, a R2,000 upfront co-payment applies to non-PMB endoscopic procedures performed in-hospital or at a day clinic."
            },
            {
                question: "What happens if I use an oncologist who is not part of the ICON network?",
                answer: "You will be liable for a 40% upfront co-payment if you voluntarily use a non-ICON provider for oncology."
            },
            {
                question: "Does this plan cover back and neck surgery in full?",
                answer: "No, back and neck surgery attracts a specific upfront co-payment of R8,000."
            },
            {
                question: "Are my chronic medications covered if they are not on the 26 CDL list?",
                answer: "No, MediCore covers the 26 Prescribed Minimum Benefit (CDL) conditions only."
            },
            {
                question: "Do I get any cover for visiting a GP out of hospital?",
                answer: "Yes, but it is limited to 3 Virtual Care consultations per family per year."
            },
            {
                question: "Is there a co-payment for hernia repair surgery?",
                answer: "Yes, hernia repair (except in infants) attracts a R3,000 upfront co-payment."
            }
        ]
    },
    {
        id: "medshield-medicurve-network-2026",
        price: 1821,
        savings_annual: 0,
        identity: {
            scheme_name: "Medshield",
            plan_name: "MediCurve",
            plan_series: "MediCurve",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 1821,
                    adult: 1821,
                    child: 483
                }
            }
        ],
        network_restriction: "MediCurve Network",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Referral Required"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 40
            },
            casualty: {
                status: "No Benefit",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 0,
                ultrasounds_2d: 0,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: false,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: "30%"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Heavy 30-40% upfront co-payments for voluntary use of non-network providers and specialists without referral.",
        faq: [
            {
                question: "Do I have to pay upfront for an endoscopy or scope?",
                answer: "Yes, there is an upfront co-payment of R2,000 for endoscopic procedures performed in-hospital or at a day clinic."
            },
            {
                question: "Will I be covered if I use a hospital outside the Compact Network?",
                answer: "You will incur a significant 30% upfront co-payment if you voluntarily use a non-Compact Network Hospital, so it is critical to check the network list first."
            },
            {
                question: "Can I see any General Practitioner I want?",
                answer: "No, you must use a MediCurve Network GP. Using a non-network GP voluntarily attracts a 40% upfront co-payment."
            },
            {
                question: "Is there a penalty if I don't get pre-authorisation for a hospital admission?",
                answer: "Yes, failure to obtain authorisation prior to admission (except for emergencies) will result in a 20% penalty on your hospital account."
            },
            {
                question: "Do I need a referral to see a specialist?",
                answer: "Yes, you must obtain a referral from your MediCurve Network GP. If you see a specialist voluntarily without one, you will pay a 20% upfront co-payment."
            },
            {
                question: "How much is the co-payment for a Hysterectomy?",
                answer: "A specific upfront co-payment of R5,000 applies to Hysterectomy procedures."
            },
            {
                question: "Is my Elective Caesarean Section covered in full?",
                answer: "No, Elective Caesareans attract a substantial R10,000 upfront co-payment."
            },
            {
                question: "What happens if I use a non-ICON provider for Oncology?",
                answer: "You will be liable for a 40% upfront co-payment if you voluntarily use a non-ICON provider for your cancer treatment."
            }
        ]
    },
    {
        id: "medshield-medibonus-any-2026",
        price: 9015,
        savings_annual: 0,
        identity: {
            scheme_name: "Medshield",
            plan_name: "MediBonus",
            plan_series: "MediBonus",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 9015,
                    adult: 6330,
                    child: 1878
                },
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Any",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 0,
            specialist_in_hospital: 0,
            specialist_out_hospital: 0,
            gp_network_consults: "Subject to day-to-day limits and virtual care rules"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 632200,
                copay_percentage: 0
            },
            casualty: {
                status: "No Benefit",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 62700
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 0,
                ultrasounds_2d: 0,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 3055,
                wellness_screening: true
            }
        },
        chronic_conditions: 0,
        procedure_copays: {
            scope_in_hospital: 1000,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: "20% of the account if admitted without prior authorisation"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Multiple significant upfront co-payments on common hospital procedures and strict oncology network penalties",
        faq: [
            {
                question: "How much oncology cover does MediBonus give my family in 2026?",
                answer: "MediBonus provides a risk-funded oncology benefit with a stated family limit of R632 200 for 2026, after which you may face out-of-pocket costs or scheme rules-based restrictions on further cancer treatment."
            },
            {
                question: "What happens if I use a non-ICON oncologist on MediBonus?",
                answer: "If you voluntarily use a non-ICON oncology provider, the benefit guide applies a 40% upfront co-payment on those oncology services, so staying within the ICON network is important to avoid a large portion of the account being for your own pocket."
            },
            {
                question: "Do I have to pay an upfront co-payment for in-hospital scopes on MediBonus?",
                answer: "Yes, most non-PMB in-hospital endoscopic procedures carry an upfront co-payment of R1 000 per admission, which you must pay directly to the hospital or facility before the procedure unless the case qualifies as a Prescribed Minimum Benefit."
            },
            {
                question: "Is there a specific casualty or emergency room benefit on MediBonus?",
                answer: "The 2026 MediBonus benefit summary does not list a dedicated risk-funded casualty facility benefit or Rand limit, so you should assume that any emergency room fees may come from your own pocket or general day-to-day benefits unless the full rules confirm otherwise."
            },
            {
                question: "How much cover is there for internal prostheses like joint implants?",
                answer: "Internal prostheses and devices are subject to an overall family sub-limit of R62 700 for 2026, so once combined prosthesis costs exceed this amount in a year, additional prosthesis expenses will likely become your responsibility."
            },
            {
                question: "Will I be penalised if I am admitted to hospital without getting pre-authorisation first?",
                answer: "Yes, if you are admitted for a non-emergency without obtaining pre-authorisation, the benefit guide applies a 20% penalty on top of any standard co-payments, which can create a substantial uncovered portion of the hospital account."
            },
            {
                question: "Does MediBonus offer built-in preventative benefits like vaccinations and screening?",
                answer: "Yes, the 2026 guide highlights an enhanced preventative basket, including an adult vaccination benefit, diabetic retinal screening, mammograms and PSA screening, which are funded from risk rather than your general day-to-day limit when you meet the clinical criteria."
            },
            {
                question: "How are my out-of-hospital GP and specialist visits paid on MediBonus?",
                answer: "Routine GP and specialist visits outside the hospital are generally paid from structured day-to-day benefits, with an additional virtual care allowance, so once those annual limits are exhausted you will usually have to fund further consultations yourself."
            },
            {
                question: "Is there a separate savings account on MediBonus in 2026?",
                answer: "The 2026 MediBonus summary specifies fixed contributions and defined day-to-day limits but does not describe a separate medical savings account percentage or allocation, so you should treat the day-to-day limits as block benefits rather than a traditional savings wallet."
            },
            {
                question: "Do the multiple co-payments on surgery and scans mean I need gap cover with MediBonus?",
                answer: "Because MediBonus has several substantial upfront co-payments for common procedures and additional penalties for using non-designated providers, the option is better paired with a gap cover policy to cushion these specific shortfalls, even though the hospital and oncology benefits themselves are relatively strong."
            }
        ]
    },
    {
        id: "medshield-medivalue-prime-network-2026",
        price: 3207,
        savings_annual: 0,
        identity: {
            scheme_name: "Medshield",
            plan_name: "MediValue Prime",
            plan_series: "MediValue",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 3207,
                    adult: 2802,
                    child: 906
                },
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "Prime Hospital Network",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 40
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 6,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 3055,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: "30% upfront co-payment"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Oncology is strict PMB only; massive 30% co-payment for voluntary use of non-network hospitals.",
        faq: [
            {
                question: "Is there a co-payment for a gastroscopy on MediValue?",
                answer: "Yes, if you have a gastroscopy or colonoscopy in a hospital, you must pay an R2,000 upfront co-payment. However, if the procedure is performed in the doctor's rooms, there is no co-payment."
            },
            {
                question: "What happens if I use a hospital outside the Prime Network?",
                answer: "You will be liable for a 30% upfront co-payment on the hospital account if you voluntarily use a hospital that is not part of the MediValue Prime Network."
            },
            {
                question: "Does MediValue cover cancer treatment?",
                answer: "MediValue covers Oncology according to Prescribed Minimum Benefits (PMB) only. This means you have access to a basic basket of care but not the extensive biological drugs or advanced treatments often covered by more expensive plans. You must use the ICON network to avoid a 40% co-payment."
            },
            {
                question: "Is there a limit on casualty visits?",
                answer: "Yes, you are covered for 2 facility fee visits per family for bona fide emergencies. Once these are used, any further casualty visits will deplete your Day-to-Day Limit."
            },
            {
                question: "Do I get a medical savings account (MSA) with MediValue?",
                answer: "No, MediValue does not have a savings account. Instead, it provides a finite Day-to-Day Limit (e.g., R8,500 for a single member) to cover GP visits, acute meds, and specialists."
            },
            {
                question: "How many maternity scans are covered?",
                answer: "The plan covers two 2D/3D/4D scans per pregnancy, along with 6 antenatal consultations."
            },
            {
                question: "What is the co-payment for wisdom teeth removal?",
                answer: "If you have wisdom teeth removed in a Day Clinic, the co-payment is R800. If done in a hospital, the co-payment rises significantly to R4,000."
            },
            {
                question: "Are joint replacements covered?",
                answer: "Joint replacements are covered, but strictly at PMB level of care. There is no specific monetary limit listed, but clinical protocols for PMBs will apply."
            }
        ]
    },
    {
        id: "medshield-mediphila-network-2026",
        price: 2145,
        savings_annual: 0,
        identity: {
            scheme_name: "Medshield",
            plan_name: "MediPhila",
            plan_series: "MediPhila",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 2145,
                    adult: 2145,
                    child: 558
                },
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "Compact Hospital Network",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "8 visits (M0)"
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 40
            },
            casualty: {
                status: "Risk",
                value: 4700
            },
            internal_prosthesis: {
                sublimit: 0
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
                contraceptives: 2015,
                wellness_screening: true
            }
        },
        chronic_conditions: 27,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "PMB Only",
            admission_penalty_non_network: "30% upfront co-payment"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Strict Compact Network and PMB-only Oncology cover.",
        faq: [
            {
                question: "Which hospitals can I use on MediPhila?",
                answer: "You must use the Compact Hospital Network. Voluntary use of a non-network hospital attracts a 30% upfront co-payment."
            },
            {
                question: "Is there a limit on cancer treatment?",
                answer: "Yes, oncology cover is limited to Prescribed Minimum Benefits (PMB) only. You must use the ICON Network to avoid a 40% co-payment."
            },
            {
                question: "Do I have a medical savings account?",
                answer: "No, MediPhila does not have a savings account. It uses a defined Day-to-Day Limit of R4,700 per family for out-of-hospital expenses."
            },
            {
                question: "Are GP visits unlimited?",
                answer: "No, you are limited to a specific number of visits per year (e.g., 8 visits for a main member) at a MediPhila Network GP."
            },
            {
                question: "Do I need a referral to see a specialist?",
                answer: "Yes, you must be referred by a Network GP. Failure to obtain a referral will result in a 20% upfront co-payment."
            },
            {
                question: "Is casualty covered if I get injured?",
                answer: "Yes, but it is paid from your R4,700 Day-to-Day Limit. You are limited to 2 facility visits before other limits apply."
            },
            {
                question: "What happens if I need a gastroscopy?",
                answer: "Gastroscopies are covered in-hospital, but a co-payment applies for adults (children under 8 are exempt). Ensure you use a network provider."
            },
            {
                question: "Does the plan cover MRI scans?",
                answer: "Yes, but it is limited to R8,600 per family per year and requires pre-authorisation."
            }
        ]
    },
    {
        id: "medshield-mediplus-prime-2026",
        price: 5436,
        savings_annual: 0,
        identity: {
            scheme_name: "Medshield",
            plan_name: "MediPlus Prime",
            plan_series: "MediPlus",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 5436,
                    adult: 3879,
                    child: 1218
                }
            }
        ],
        network_restriction: "Prime",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Subject to Day-to-Day Limit"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 326000,
                copay_percentage: 40
            },
            casualty: {
                status: "Risk",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 47550
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 12,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 3055,
                wellness_screening: true
            }
        },
        chronic_conditions: 40,
        procedure_copays: {
            scope_in_hospital: 1500,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: "30%"
        },
        gap_cover_rating: "Recommended",
        red_flag: "Internal Prosthesis limit of R47,550 is significantly low for major joint replacements.",
        faq: [
            {
                question: "What is the annual limit for oncology treatment?",
                answer: "The oncology limit is R326,000 per family per annum. Using a non-DSP provider attracts a 40% upfront co-payment."
            },
            {
                question: "Is there a limit on internal prostheses like hip replacements?",
                answer: "Yes, there is an overall family limit of R47,550 per annum for internal prostheses, which may be insufficient for major joint replacements."
            },
            {
                question: "Do I have to pay upfront for a gastroscopy or colonoscopy?",
                answer: "Yes, if performed in-hospital, there is an upfront co-payment of R1,500. There is no co-payment if performed in the practitioner's rooms."
            },
            {
                question: "Are there penalties for using a non-network hospital?",
                answer: "Yes, a 30% upfront co-payment applies if you voluntarily use a hospital outside the Prime Hospital Network."
            },
            {
                question: "How many chronic conditions are covered?",
                answer: "The plan covers 40 chronic conditions, which includes the 26 PMB CDL conditions plus an additional 14 conditions."
            },
            {
                question: "Is my Day-to-Day Limit a savings account?",
                answer: "No, the Day-to-Day Limit (R12,000 for a main member) is a risk benefit allocated by the scheme, not a savings account that accumulates."
            },
            {
                question: "What cover do I have for casualty visits?",
                answer: "You are covered for 2 casualty facility fee visits per family from Risk. Further visits are subject to your Day-to-Day Limit."
            },
            {
                question: "Is there a co-payment for non-network GPs?",
                answer: "Yes, if you do not use a Network GP, you are limited to 2 visits per family, and thereafter a 40% upfront co-payment applies."
            }
        ]
    },
    {
        id: "momentum-ingwe-ingwe-network-2026",
        price: 645,
        savings_annual: 0,
        identity: {
            scheme_name: "Momentum",
            plan_name: "Ingwe Option",
            plan_series: "Ingwe",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    {
                        min: 0,
                        max: 750,
                        main: 645,
                        adult: 645,
                        child: 581
                    },
                    {
                        min: 14001,
                        max: 999999,
                        main: 4546,
                        adult: 4546,
                        child: 1318
                    }
                ],
                msa_structure: {
                    type: "None",
                    value: 0
                }
            }
        ],
        network_restriction: "Ingwe Network",
        network_details: {
            hospitals: "Network",
            gps: "Network",
            specialists: "Referral Required"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "PMB Only",
                value: 0,
                copay_percentage: 0
            },
            casualty: {
                status: "Risk",
                value: 110
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 7,
                ultrasounds_2d: 2,
                paediatrician_visits: 1
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 26,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "Excluded",
            admission_penalty_non_network: "30% Co-payment"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "State facility restriction for Oncology, Chronic, and certain scans even if you choose the Private Hospital Network option.",
        faq: [
            {
                question: "Can I use any hospital on the Momentum Ingwe option?",
                answer: "No, if you choose the Ingwe Network option, you must use hospitals in the Ingwe Network. Using a non-network hospital will result in a 30% co-payment."
            },
            {
                question: "Is cancer treatment covered in private hospitals on Ingwe?",
                answer: "No, on the Ingwe Network option, oncology (cancer) benefits are limited to Prescribed Minimum Benefits (PMBs) at State facilities only."
            },
            {
                question: "Do I have to pay for casualty visits?",
                answer: "Yes, there is a R110 co-payment per visit. The benefit is limited to 1 visit per beneficiary per year (maximum 2 per family)."
            },
            {
                question: "Are my chronic medicines covered at Dis-Chem or Clicks?",
                answer: "No, for the Ingwe Network option, you must obtain chronic medicine from Ingwe Primary Care Network providers or State facilities."
            },
            {
                question: "How many specialist visits can I have?",
                answer: "You are limited to 2 specialist visits per family per year, reimbursed up to R1,425 per visit. A referral from your network GP is required."
            },
            {
                question: "Is dentistry covered?",
                answer: "Yes, basic dentistry (fillings, extractions, cleaning) is covered at network dentists. Specialised dentistry like crowns or bridges is not covered."
            },
            {
                question: "What happens if I need an MRI scan?",
                answer: "For the Ingwe Network option, MRI and CT scans are limited to Prescribed Minimum Benefits (PMBs) and must be performed at State facilities."
            },
            {
                question: "Does Ingwe cover pregnancy?",
                answer: "Yes, the maternity programme covers 7 antenatal visits, 2 scans, and 1 paediatrician visit, provided you register on the programme."
            }
        ]
    },
    {
        id: "momentum-summit-any-2026",
        price: 16469,
        savings_annual: 0,
        identity: {
            scheme_name: "Momentum",
            plan_name: "Summit",
            plan_series: "Summit",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 16469,
                    adult: 13075,
                    child: 3756
                }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 300,
            specialist_out_hospital: 100,
            gp_network_consults: "Subject to Limit"
        },
        limits: {
            oncology: {
                status: "Unlimited",
                value: 9999999,
                copay_percentage: 0
            },
            casualty: {
                status: "Risk",
                value: 34500
            },
            internal_prosthesis: {
                sublimit: 92200
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 12,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 62,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 3500,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Optional",
        faq: [
            {
                question: "Is there a limit on how much I can claim for cancer treatment?",
                answer: "No, the Summit Option provides unlimited oncology cover. However, chemotherapy and adjuvant medication are subject to Momentum's Reference Pricing, so sticking to the formulary is important to avoid co-payments."
            },
            {
                question: "Do I have to pay upfront for an MRI or CT scan?",
                answer: "You will have a co-payment of R3,500 per scan for MRI, CT, and PET scans, regardless of whether it is done in or out of hospital. This applies even if you get pre-authorisation."
            },
            {
                question: "What happens if I need a hip or knee replacement?",
                answer: "The scheme covers the procedure, but the internal prosthesis (the artificial joint itself) is limited to R92,200 per beneficiary per event. You can claim for up to 2 such events per year."
            },
            {
                question: "Can I use any hospital I want?",
                answer: "Yes, the Summit Option allows you to use any private hospital. There is no network restriction, so you are covered at the hospital of your choice."
            },
            {
                question: "Does the plan cover depression or anxiety medication?",
                answer: "Yes, the plan covers 62 chronic conditions, which is significantly more than the standard 26. This includes additional cover for conditions often excluded on lower plans, subject to the R34,500 day-to-day limit."
            },
            {
                question: "How is my day-to-day medical care paid for?",
                answer: "Day-to-day expenses like GP visits and scripts are paid from a Risk benefit (not savings) up to an annual limit of R34,500 per beneficiary. This limit is combined with your additional chronic cover."
            },
            {
                question: "Is there a specific network of specialists I must use?",
                answer: "No, you can see any specialist. Associated specialists are covered in full, and all other specialists are covered up to 300% of the scheme rate, reducing the likelihood of shortfalls."
            },
            {
                question: "Does this plan include a Medical Savings Account (MSA)?",
                answer: "No, the Summit Option does not have a Medical Savings Account. Instead, it offers a generous 'risk-based' day-to-day benefit of R34,500 per beneficiary."
            }
        ]
    },
    {
        id: "momentum-extender-any-2026",
        price: 11472,
        savings_annual: 34416,
        identity: {
            scheme_name: "Momentum",
            plan_name: "Extender Option",
            plan_series: "Extender",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 11472,
                    adult: 9240,
                    child: 3291
                },
                msa_structure: {
                    type: "Percentage",
                    value: 25
                }
            }
        ],
        network_restriction: "Any",
        network_details: {
            hospitals: "Any",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 500000,
                copay_percentage: 20
            },
            casualty: {
                status: "Savings",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 12,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 62,
        procedure_copays: {
            scope_in_hospital: 5500,
            scope_out_hospital: 0,
            mri_scan: 3500,
            joint_replacement: 5500,
            admission_penalty_non_network: "30%"
        },
        gap_cover_rating: "Recommended",
        red_flag: "Casualty visits are paid from Savings, not Risk. Major co-pays exist for scopes and scans.",
        faq: [
            {
                question: "Is my cancer cover unlimited?",
                answer: "No. The plan has a strict oncology limit of R500,000 per year. Once this limit is reached, you will be liable for a 20% co-payment on all further treatment costs."
            },
            {
                question: "Do I have to pay upfront for an MRI scan?",
                answer: "Yes, there is a R3,500 co-payment for MRI and CT scans, regardless of whether they are performed in or out of hospital."
            },
            {
                question: "Will I be covered for a hip replacement?",
                answer: "Yes, but subject to strict limits. Internal prostheses (like hips and knees) are limited to R92,200 per event (maximum 2 events per year), and a co-payment of R5,500 applies if the surgery is performed in an acute hospital."
            },
            {
                question: "Does the plan cover emergency room visits?",
                answer: "Only from your savings. Casualty and after-hour visits are 'Subject to Day-to-day Benefit', meaning they are paid from your savings account, not the major medical risk benefit."
            },
            {
                question: "How much is my self-payment gap?",
                answer: "For the main member, your Annual Savings is R34,416, but your Threshold is R36,900. This creates a small 'self-payment gap' of approximately R2,484 where you must pay claims from your own pocket before the Extended Cover activates."
            },
            {
                question: "Can I use any specialist?",
                answer: "Yes. Associated specialists are covered in full, and other specialists are covered up to 200% of the scheme rate. If your specialist charges more than 200%, you will have a shortfall."
            },
            {
                question: "Is my depression medication covered?",
                answer: "Yes, but within limits. Mental health services (psychiatry and psychology) are limited to R50,600 per beneficiary, and outpatient mental health is limited to R26,300 per family."
            },
            {
                question: "What happens if I use a non-network hospital?",
                answer: "On this 'Any' variant, you can use any private hospital. However, if you had chosen the 'Associated' variant, you would face a 30% co-payment for using a non-network facility."
            }
        ]
    },
    {
        id: "momentum-incentive-associated-2026",
        price: 5333,
        savings_annual: 6399.6,
        identity: {
            scheme_name: "Momentum",
            plan_name: "Incentive Option",
            plan_series: "Incentive",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 5333,
                    adult: 4434,
                    child: 1174
                },
                msa_structure: {
                    type: "Percentage",
                    value: 10
                }
            }
        ],
        network_restriction: "Associated",
        network_details: {
            hospitals: "Network",
            gps: "Any",
            specialists: "Network"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 0
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 400000,
                copay_percentage: 20
            },
            casualty: {
                status: "Savings",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 67000
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 12,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 32,
        procedure_copays: {
            scope_in_hospital: 5500,
            scope_out_hospital: 2000,
            mri_scan: 3500,
            joint_replacement: 5500,
            admission_penalty_non_network: "30%"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Heavy co-payments (R5,500) for scopes/joints and strict 30% penalty for using non-Associated hospitals.",
        faq: [
            {
                question: "What happens if I use a hospital not on the Associated list?",
                answer: "You will be liable for a 30% co-payment on the hospital account. Always check the Associated Hospital list before admission."
            },
            {
                question: "Is there a limit on cancer treatment?",
                answer: "Yes, there is an annual limit of R400,000 per beneficiary. After this amount, a 20% co-payment applies to further claims."
            },
            {
                question: "Do I have to pay upfront for an MRI or CT scan?",
                answer: "You must pay a R3,500 co-payment per scan, and it requires pre-authorisation. This applies in and out of hospital."
            },
            {
                question: "Does the plan cover a hip or knee replacement in full?",
                answer: "No. While covered, you face a R5,500 co-payment if done in an acute hospital, and the internal prosthesis is limited to R67,000 per event."
            },
            {
                question: "Are my day-to-day GP visits covered by the scheme risk?",
                answer: "No, GP visits are paid from your Personal Medical Savings Account (10% of contribution). Once savings are depleted, you pay out of pocket."
            },
            {
                question: "What if I need to go to the emergency room (Casualty)?",
                answer: "Casualty visits are paid from your Savings. There is no risk benefit for emergency room facility fees unless you are admitted."
            },
            {
                question: "Can I use any doctor for my chronic medication?",
                answer: "You can, but to avoid co-payments or higher contributions, you should select the provider linked to your specific plan option (Any, Associated, or State)."
            },
            {
                question: "Is there a co-payment for a gastroscopy or colonoscopy?",
                answer: "Yes, R2,000 if performed in a day hospital, or R5,500 in an acute hospital. This applies even if performed out of hospital."
            }
        ]
    },
    {
        id: "momentum-custom-associated-state-2026",
        price: 2585,
        savings_annual: 0,
        identity: {
            scheme_name: "Momentum Medical Scheme",
            plan_name: "Custom Option",
            plan_series: "Custom",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    {
                        min: 0,
                        max: 17000,
                        main: 1808,
                        adult: 1399,
                        child: 539
                    },
                    {
                        min: 17001,
                        max: 9999999,
                        main: 2585,
                        adult: 1995,
                        child: 765
                    }
                ]
            }
        ],
        network_restriction: "Associated",
        network_details: {
            hospitals: "Network",
            gps: "Any",
            specialists: "Referral Required"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 0
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 300000,
                copay_percentage: 20
            },
            casualty: {
                status: "Savings",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 0
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 12,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 26,
        procedure_copays: {
            scope_in_hospital: 7500,
            scope_out_hospital: 2000,
            mri_scan: 3850,
            joint_replacement: 7500,
            admission_penalty_non_network: "30% + R2000"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Strict State Chronic protocol and high procedure co-pays (up to R7,500 for scopes in acute hospitals).",
        faq: [
            {
                question: "If I choose the Associated Hospital option, what happens if I go to a non-network hospital?",
                answer: "You will be liable for a 30% co-payment on the hospital account, in addition to the standard R2,000 admission co-payment."
            },
            {
                question: "Is there a limit on cancer treatment?",
                answer: "Yes, oncology is covered up to R300,000 per beneficiary per year. Thereafter, a 20% co-payment applies to all costs."
            },
            {
                question: "Do I have to pay upfront for a gastroscopy or colonoscopy?",
                answer: "Yes, you will pay a R2,000 co-payment if done in a day hospital or out of hospital. If done in an acute hospital, the co-payment jumps to R7,500 (R2,000 standard + R5,500 penalty)."
            },
            {
                question: "How do I get my chronic medication if I chose the State option?",
                answer: "You must use State facilities for your chronic script and medication to avoid co-payments. If the State cannot provide the medicine, you may use Ingwe Primary Care Network providers subject to a formulary."
            },
            {
                question: "Is there an overall limit for internal prostheses like hip joints?",
                answer: "There is no overall family limit, but there is a strict sub-limit of R62,000 per beneficiary per event (max 2 events per year). You may have out-of-pocket costs if the device exceeds this."
            },
            {
                question: "Are MRI and CT scans covered in full?",
                answer: "No, while there is no annual limit, you must pay a R3,850 co-payment per scan, regardless of whether it is done in or out of hospital."
            },
            {
                question: "Does this plan cover emergency casualty visits?",
                answer: "No, casualty visits are not covered by the risk benefit. They are subject to your available Momentum HealthSaver funds."
            },
            {
                question: "What maternity benefits are included?",
                answer: "The plan covers 12 antenatal visits, 2 ultrasounds (2D), and 2 paediatrician visits in the baby's first year, provided you register on the Maternity programme."
            }
        ]
    },
    {
        id: "sizwe-hosmed-value-platinum-core-network-2026",
        price: 6363,
        savings_annual: 14507.64,
        identity: {
            scheme_name: "Sizwe Hosmed",
            plan_name: "Value Platinum Core",
            plan_series: "Core Plans",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 6363,
                    adult: 6094,
                    child: 1624
                },
                msa_structure: {
                    type: "Fixed",
                    value: 14507.64
                }
            }
        ],
        network_restriction: "Scheme Network",
        network_details: {
            hospitals: "Network",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Paid from MSA / Above Threshold (ATB)"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 632063.25,
                copay_percentage: 20
            },
            casualty: {
                status: "No Benefit",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 59865.75
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 10,
                ultrasounds_2d: 2,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 3672.43,
                wellness_screening: true
            }
        },
        chronic_conditions: 0,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 1736.44,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Hospital access restricted to the Scheme hospital network (Value Platinum Core).",
        faq: [
            {
                question: "If I join Value Platinum Core, can I go to any hospital, or do I have to stick to the Scheme’s network hospitals?",
                answer: "This option limits hospital access to hospitals within the Scheme network, so using a non-network hospital could leave costs unpaid unless scheme rules/PMBs apply."
            },
            {
                question: "If I land in hospital unexpectedly, how quickly do I need to tell the scheme so I don’t get penalised?",
                answer: "Emergency admissions must be notified within 48 hours, and the brochure also indicates penalties can apply for late (non-emergency) authorisations."
            },
            {
                question: "Do I need pre-authorisation for planned surgery, and what happens if I forget to get it in time?",
                answer: "Elective admissions must be pre-authorised at least 72 hours before admission, and the brochure warns that late authorisations can trigger a percentage penalty."
            },
            {
                question: "Is my cancer treatment unlimited, or is there a yearly cap where I start paying a portion myself?",
                answer: "Oncology is limited to R632063.25 per beneficiary per year, and once you exceed that limit the brochure states a 20% co-payment applies."
            },
            {
                question: "If I need biological (non-cancer specialised) medicine, is it covered separately or does it eat into my oncology limit?",
                answer: "The brochure states non-cancer specialised drugs (including biologicals) share the overall oncology limit, and once that limit is reached no further benefit is available."
            },
            {
                question: "If I need a prosthesis (like a stent or joint prosthesis), what’s the maximum the scheme will pay for the whole family in a year?",
                answer: "The brochure lists an overall surgical and non-surgical prosthesis limit of R59865.75 per family per year, subject to pre-authorisation and scheme rules."
            },
            {
                question: "How many antenatal visits and pregnancy scans do I get on the maternity programme, and do I have to register first?",
                answer: "Maternity benefits are tied to the Bambino Programme and include 10 antenatal visits per pregnancy plus 2 x 2D scans (registration and protocols apply)."
            },
            {
                question: "Are my day-to-day GP and specialist visits paid automatically, or do they come out of my medical savings first?",
                answer: "The brochure indicates most day-to-day out-of-hospital costs are subject to your MSA (and then above-threshold benefits), with certain risk benefits carved out."
            },
            {
                question: "If I need an MRI (or similar specialised scan), do I have to pay a co-payment even if the doctor refers me?",
                answer: "The brochure indicates a co-payment applies per scan event for specialised radiology (except for PMB-related events), and it also requires pre-authorisation and specialist referral."
            },
            {
                question: "If I need back or neck surgery that isn’t a PMB, am I exposed to a fixed co-payment?",
                answer: "The brochure states that non-PMB back and neck surgeries attract a fixed co-payment, so it’s important to confirm PMB status and authorisation before proceeding."
            }
        ]
    },
    {
        id: "sizwe-hosmed-access-saver-network-2026",
        price: 3911,
        savings_annual: 11733,
        identity: {
            scheme_name: "Sizwe Hosmed",
            plan_name: "Access Saver",
            plan_series: "Access Saver",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 3911,
                    adult: 3378,
                    child: 785
                },
                msa_structure: {
                    type: "Percentage",
                    value: 25
                }
            }
        ],
        network_restriction: "DSP (Designated Service Providers) for hospital benefits",
        network_details: {
            hospitals: "Network",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "Paid from MSA; once depleted: 1 additional consult per beneficiary, limited to 4 consultations per family per year"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 297079.18,
                copay_percentage: 20
            },
            casualty: {
                status: "No Benefit",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 39048.35
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 10,
                ultrasounds_2d: 2,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0,
                wellness_screening: true
            }
        },
        chronic_conditions: 0,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: "Limited"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Hospital cover is PMB-focused at DSPs; day-to-day cover is largely savings-based (MSA).",
        faq: [
            {
                question: "If I get cancer, am I fully covered or is there a yearly cap I could hit?",
                answer: "This plan has a stated oncology utilisation threshold of R297,079.18 per beneficiary per year, and once you go above that amount a 20% co-payment applies for non-PMB oncology-related costs (and oncology is subject to using the oncology DSP and scheme rules)."
            },
            {
                question: "Do I have to use a specific oncology network, or can I go to any oncologist I want?",
                answer: "Oncology is subject to using the Oncology DSP, and pre-authorisation / scheme rules apply, so using a non-aligned provider may affect how the claim is paid."
            },
            {
                question: "If my doctor recommends a prosthesis (like a hip/knee/shoulder component), what is the maximum this plan will pay in a year?",
                answer: "There is an annual overall prosthesis limit of R39,048.35 per family per year, and prostheses are also subject to pre-authorisation, managed care protocols, and PMB rules where applicable."
            },
            {
                question: "If my prosthesis costs more than the family prosthesis limit, will I be stuck paying the shortfall myself?",
                answer: "If the prosthesis costs exceed the stated annual overall prosthesis limit of R39,048.35 per family per year, the amount above the limit would not be covered under that prosthesis limit and would typically remain for the member’s account, subject to scheme rules."
            },
            {
                question: "If I choose a hospital that is not part of the scheme’s DSP arrangements, will my admission still be covered?",
                answer: "Hospital benefits are stated as only available at the Designated Service Providers (DSPs), and admissions are subject to pre-authorisation and scheme rules, so non-DSP usage is a major risk point."
            },
            {
                question: "If I forget to pre-authorise an elective admission, what happens to my claim?",
                answer: "All admissions (including PMBs) are subject to pre-authorisation and scheme rules, and the brochure indicates a penalty for non-emergency late pre-authorisations."
            },
            {
                question: "When my savings (MSA) runs out, do I still get any GP consultations covered?",
                answer: "GP consultations are paid from the MSA, and once depleted the brochure describes a limited additional GP consultation benefit (with a family cap) rather than unlimited ongoing cover."
            },
            {
                question: "When my savings (MSA) runs out, do I still get any specialist consults covered?",
                answer: "Specialist consultations are paid from the MSA, and once depleted the brochure describes a limited additional specialist consultation benefit (restricted to certain specialist types) rather than unlimited cover."
            },
            {
                question: "If I need an MRI/CT scan, could I still end up paying a co-payment even if I’m approved?",
                answer: "Advanced specialised radiology is described as subject to clinical protocols and pre-authorisation, and the brochure indicates a percentage co-payment for non-PMB scans (so out-of-pocket costs are possible depending on PMB status)."
            },
            {
                question: "Are there any procedures where I automatically pay a co-payment even if I’m admitted properly?",
                answer: "The brochure notes a percentage co-payment for certain laparoscopic procedures done in-hospital (with stated exceptions), and also references co-payments for day procedures done at certain acute hospitals."
            }
        ]
    },
    {
        id: "sizwehosmed-gold-ascend-edo-network-2026",
        price: 4249,
        savings_annual: 7968.87,
        identity: {
            scheme_name: "Sizwe Hosmed Medical Scheme",
            plan_name: "Gold Ascend EDO",
            plan_series: "Gold Ascend",
            plan_type: "Network"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: {
                    main: 4249,
                    adult: 4077,
                    child: 1171
                },
                msa_structure: {
                    type: "Fixed",
                    value: 7968.87
                }
            }
        ],
        network_restriction: "Scheme network",
        network_details: {
            hospitals: "Network",
            gps: "Any",
            specialists: "Any"
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Subject to MSA limits"
        },
        limits: {
            oncology: {
                status: "Limited",
                value: 252825.3,
                copay_percentage: 20
            },
            casualty: {
                status: "No Benefit",
                value: 0
            },
            internal_prosthesis: {
                sublimit: 35935.99
            }
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 10,
                ultrasounds_2d: 2,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 3672.43,
                wellness_screening: true
            }
        },
        chronic_conditions: 0,
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 10,
            joint_replacement: "Not stated in brochure (prosthesis subject to overall family prosthesis limit)",
            admission_penalty_non_network: "Not stated in brochure"
        },
        gap_cover_rating: "Mandatory",
        red_flag: "Hospital access is restricted to the Scheme network (EDO), and prosthesis cover is capped by an overall family limit.",
        faq: [
            {
                question: "If I land in hospital unexpectedly, do I have to get pre-authorisation, or will the claim still pay?",
                answer: "Hospital admissions are subject to pre-authorisation and scheme rules, and emergency admissions must still be notified within the required timeframe."
            },
            {
                question: "If I go to a hospital that is not in the Scheme network, will I be covered on Gold Ascend EDO?",
                answer: "Gold Ascend EDO limits hospital access to hospitals within the Scheme network, so using a non-network hospital may affect cover depending on scheme rules and authorisation requirements."
            },
            {
                question: "If I’m diagnosed with cancer, what is my oncology annual limit on this plan?",
                answer: "Oncology is limited to R252 825.30 per beneficiary per year, and treatment above that amount is subject to a 20% co-payment."
            },
            {
                question: "If my cancer treatment costs more than the oncology limit, will I suddenly start paying a percentage myself?",
                answer: "Once oncology spending goes above R252 825.30 in the year, the portion above the limit is subject to a 20% co-payment (and oncology use is tied to the oncology DSP requirement)."
            },
            {
                question: "If I need a hip or knee replacement, what happens if the prosthesis costs more than the plan limit?",
                answer: "Internal and external prostheses are subject to an overall family prosthesis limit of R35 935.99 per year, so amounts above that limit may create a member shortfall (unless PMB rules change how the claim is handled)."
            },
            {
                question: "Do MRI or CT scans have a co-payment on this plan?",
                answer: "Non-PMB MRI and CT scans attract a 10% co-payment and are also managed under scan frequency/authorisation rules."
            },
            {
                question: "How many pregnancy ultrasounds are covered, and do I need to register for a maternity programme?",
                answer: "Maternity ultrasound cover includes 2 x 2D scans per pregnancy (with one 3D scan listed), and the maternity basket is tied to registration on the Scheme’s Bambino Programme and managed-care rules."
            },
            {
                question: "How many antenatal visits can I claim from risk benefits during pregnancy?",
                answer: "The maternity basket lists an additional 10 antenatal visits per pregnancy (split between GP/midwife and specialist obstetrician)."
            },
            {
                question: "Are my day-to-day GP and specialist visits paid from savings, or does the scheme pay them from risk?",
                answer: "Day-to-day out-of-hospital benefits are stated as being subject to MSA (with certain listed risk benefits carved out), and the GP/specialist benefit is shown as subject to a day-to-day limit."
            },
            {
                question: "If I don’t follow the plan’s rules (like notifying the scheme), can my claim be penalised even if I was in hospital?",
                answer: "The in-hospital section states admissions are subject to scheme rules and notification requirements, and it notes penalties can apply when authorisation/notification rules are not followed."
            }
        ]
    },



];