import { Persona } from '@/utils/persona';

export const PERSONAS: Persona[] = [
    {
        slug: "bestmed-rhythm1-network-entry-level-2026",
        code: "BMRHYTHM1_ENTRY",
        meta: {
            title: "Rhythm1 Entry-Level Earner (<R9k)",
            marketing_heading: "Unbeatable Value for Lower Income Earners",
            description: "Strictly for individuals earning under R9,000/month. Provides unlimited network GP visits and basic hospital cover at a highly subsidized rate of R1,736/month. Essential primary care focus.",
            category: "Network Plan",
            strategic_intent: "Strict_Budget_Management"
        },
        defaults: {
            income: 8500,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 23,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Unlimited GP Visits",
                "Hospital Cover"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-rhythm1-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "The R1,736/month premium is mathematically optimal for incomes <R9,000. It provides unlimited GP visits (subject to protocols) which would otherwise cost ~R500/visit cash. The 'break-even' is extremely low due to the subsidized rate.",
            primary_risk_warning: "Strict adherence to Rhythm Network providers is mandatory. Voluntary use of non-DSP hospitals triggers a R15,025 co-payment.",
            utilization_assumptions: {
                gp_visits_frequency: "High (unlimited network visits benefit)",
                chronic_script_consistency: 12,
                break_even_point: "4 GP visits per year covers the premium relative to private cash rates."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Earning R9,001 increases premium to R2,024 (a R288 jump)."
            }
        }
    },

    {
        slug: "bonsave-network-savings-single-msa-max-2026",
        code: "BONSAVE_SINGLE_MSA",
        meta: {
            title: "BonSave Single MSA Maximization",
            marketing_heading: "High Savings Allocation with Network Hospital Safety Net",
            description: "For healthy singles optimizing R12,144 savings with R5,000 Benefit Booster to maximize liquidity and rollover potential",
            category: "Savings + Network Hospital",
            strategic_intent: "MSA_Maximisation_Roll_Over"
        },
        defaults: {
            income: 28000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 26,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 12144,
            chronic_needs: "CDL + Depression",
            required_benefits: [
                "Savings Account",
                "Benefit Booster R5,000",
                "28 Chronic Conditions"
            ],
            priority_tag: "savings"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-bonsave-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R4,047/month premium. Main member savings = R12,144. Unlock R5,000 Benefit Booster via wellness screening + mental health assessment. Low utilizers can bank savings for multi-year rollover.",
            primary_risk_warning: "30% co-payment for non-network hospital. R5,200 co-payment for removal of impacted teeth.",
            utilization_assumptions: {
                gp_visits_frequency: "Low (self-funded from savings)",
                chronic_script_consistency: 0,
                break_even_point: "Savings rollover creates multi-year liquidity buffer"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-network hospital triggers 30% co-payment"
            }
        }
    },

    {
        slug: "standard-full-choice-type-1-diabetes-child-insulin-pump-2026",
        code: "STANDARD_T1D_CHILD_PUMP",
        meta: {
            title: "Standard Type 1 Diabetes Child Insulin Pump Coverage",
            marketing_heading: "Insulin Pump and CGM for Type 1 Diabetic Children Under 18",
            description: "For families with Type 1 diabetic children needing insulin pump (R65,000/5yrs), CGM (R28,000/yr), consumables (R93,000/yr)",
            category: "Type 1 Diabetes Specialized Technology",
            strategic_intent: "High_Cost_Technology_Funding"
        },
        defaults: {
            income: 60000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 40,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0,
            chronic_needs: "Type 1 Diabetes",
            required_benefits: [
                "Insulin Pump R65,000",
                "CGM R28,000",
                "Consumables R93,000",
                "Diabetes Programme"
            ],
            priority_tag: "chronic"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-standard-any-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R5,929 (main) + R5,139 (adult) + R1,740 (child) = R12,808/month. Insulin pump benefit: 1 pump R65,000/family every 5 years. 1 continuous glucose monitor R28,000/family per year. Consumables limited to R93,000/family per year. Only for Type 1 diabetics younger than 18.",
            primary_risk_warning: "Age restriction: Type 1 diabetic must be under 18. Pump replacement only every 5 years.",
            utilization_assumptions: {
                gp_visits_frequency: "High (multiple chronic scripts)",
                chronic_script_consistency: 12,
                break_even_point: "Insulin pump + CGM + consumables value vs premium"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Child turns 18, loses insulin pump/CGM benefit"
            }
        }
    },
    {
        slug: "hospital-standard-network-disaster-single-pmb-2026",
        code: "HOSPSTD_DISASTER_SINGLE",
        meta: {
            title: "Hospital Standard Single Disaster Cover PMB Only",
            marketing_heading: "Network Hospital Safety Net with Emergency Room Benefit",
            description: "Hospital-only cover for individuals who self-fund day-to-day and need catastrophic protection with 2 ER visits",
            category: "Catastrophic Hospital Only",
            strategic_intent: "Disaster_Cover_Only"
        },
        defaults: {
            income: 22000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 28,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "CDL + Depression",
            required_benefits: [
                "Hospital Cover",
                "2 Emergency Room Visits",
                "28 Chronic Conditions"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-hospital-standard-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R3,561/month premium. 2 emergency consultations per family at casualty ward. No day-to-day benefits except PMB out-of-hospital. 28 chronic conditions via Pharmacy Direct DSP with 30% co-pay for non-compliance.",
            primary_risk_warning: "30% co-payment for non-network hospital. No joint replacement or back/neck surgery except PMB. No day-to-day benefits.",
            utilization_assumptions: {
                gp_visits_frequency: "Zero (rely on emergency room benefit)",
                chronic_script_consistency: 0,
                break_even_point: "Zero utilization acceptable; premium is pure catastrophic insurance"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-network hospital admission triggers 30% co-payment"
            }
        }
    },
    {
        slug: "hospital-standard-network-family-maternity-emergency-2026",
        code: "HOSPSTD_FAM_MAT",
        meta: {
            title: "Hospital Standard Family Maternity Emergency C-Section Only",
            marketing_heading: "Hospital Cover with Emergency C-Section and Child Capping",
            description: "For families planning pregnancy needing emergency C-section cover only, with child capping rules",
            category: "Maternity Emergency Hospital Only",
            strategic_intent: "Minimum_Maternity_Funding"
        },
        defaults: {
            income: 26000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 32,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "Emergency C-Section Only",
                "Child Capping",
                "Maternity Programme",
                "6 Antenatal Consultations"
            ],
            priority_tag: "maternity"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-hospital-standard-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R3,561 (main) + R2,999 (adult) + R1,353 (child) = R7,913/month for 3-person family. Emergency approved C-sections only. Managed Care protocols apply. 6 antenatal consultations with GP/gynaecologist/midwife, 2 2D ultrasounds, 1 amniocentesis.",
            primary_risk_warning: "Only emergency C-sections covered. Elective C-sections not covered. Natural birth covered as PMB hospital admission.",
            utilization_assumptions: {
                gp_visits_frequency: "Zero",
                chronic_script_consistency: 0,
                break_even_point: "Emergency C-section vs premium paid"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Elective C-section requires out-of-pocket payment or is declined"
            }
        }
    },

    {
        slug: "bonstart-plus-network-edge-family-maternity-enhanced-2026",
        code: "BONSTARTPL_FAM_MAT",
        meta: {
            title: "BonStart Plus Family Maternity Enhanced Coverage",
            marketing_heading: "Affordable Maternity with Hospital Cover and Lower Co-Payments",
            description: "For families planning pregnancy needing 6 antenatal consultations, 2 ultrasounds, with R75 GP co-pay vs R130 on BonStart",
            category: "Budget Maternity Enhanced",
            strategic_intent: "Enhanced_Maternity_Funding"
        },
        defaults: {
            income: 16000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 28,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "6 Antenatal Consultations",
                "2 Ultrasounds",
                "Maternity Programme",
                "Unlimited Virtual GP"
            ],
            priority_tag: "maternity"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-bonstart-plus-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R2,040 (main) + R1,940 (adult) = R3,980/month. Unlimited network GP with R75 co-payment (vs R130 on BonStart). Authorization required after 10th visit (vs 6th on BonStart). GP-referred acute medicine limit R3,450/family (vs R1,850 on BonStart). 6 antenatal consultations, 2 2D ultrasounds, 1 amniocentesis, 4 midwife consultations post-delivery.",
            primary_risk_warning: "R12,680 co-payment for non-network hospital. R1,240 admission co-payment per network hospital admission (vs R1,850 on BonStart).",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Lower co-payments and higher acute medicine limit vs BonStart premium differential"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Emergency C-section only covered. Elective C-section not covered."
            }
        }
    },
    {
        slug: "bonstart-plus-network-edge-family-child-cap-sports-injury-2026",
        code: "BONSTARTPL_FAM_SPORT",
        meta: {
            title: "BonStart Plus Family Sports Injury Physiotherapy",
            marketing_heading: "Child Capping with Sports Physiotherapy Coverage",
            description: "For active families with children needing 4 physiotherapy consultations per beneficiary for sport-related injuries",
            category: "Budget Family Sports Active",
            strategic_intent: "Defined_Benefit_Funding"
        },
        defaults: {
            income: 18000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 3
            },
            age: 38,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "4 Physiotherapy Visits R75 Co-pay",
                "General Appliances R6,860",
                "Benefit Booster R1,160"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-bonstart-plus-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R2,040 (main) + R1,940 (adult) + R899*3 (children) = R6,677/month for 5-person family. No child capping on BonStart Plus (unlike other Bonitas plans). 4 physiotherapy consultations per beneficiary for sport-related injuries with R75 co-payment. Must get referral from network GP or medical specialist.",
            primary_risk_warning: "R12,680 co-payment for non-network hospital. No child capping benefit (all children charged full rate).",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Sports physiotherapy utilization vs premium"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-network hospital triggers R12,680 co-payment"
            }
        }
    },

    {
        slug: "discovery-classic-core-single-hospital-only-2026",
        code: "DH_CORE_CLASSIC_SINGLE",
        meta: {
            title: "Classic Core Single Hospital-Only with PHF",
            marketing_heading: "Hospital-Only Cover with 200% Tariff and Personal Health Fund",
            description: "For relatively healthy singles who want strong hospital cover at up to 200% of tariff and a modest Personal Health Fund, but are willing to self‑fund most day‑to‑day costs.",
            category: "Hospital Core",
            strategic_intent: "Catastrophic_Only_with_Min_Day2Day"
        },
        defaults: {
            income: 28000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 30,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0,
            chronic_needs: "CDL basic",
            required_benefits: [
                "Unlimited hospital cover",
                "Specialists at up to 200% of Discovery Health Rate",
                "Personal Health Fund up to R8,000"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-delta-core-network-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Contributions are materially lower than comprehensive and Executive plans while providing unlimited hospital cover at up to 200% of the Discovery Health Rate and a Personal Health Fund that can reach several thousand rand through engagement.",
            primary_risk_warning: "No Medical Savings Account or Above Threshold Benefit; all routine GP, specialist and acute medicine costs must be funded from the Personal Health Fund or out of pocket.",
            utilization_assumptions: {
                gp_visits_frequency: "Low",
                chronic_script_consistency: 0,
                break_even_point: "Little to no day‑to‑day usage; primary need is protection against large hospital events."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Heavy day‑to‑day utilisation quickly converts the plan into an expensive option compared with savings plans."
            }
        }
    },
    {
        slug: "discovery-classic-delta-core-young-family-2026",
        code: "DH_CORE_DELTA_FAMILY",
        meta: {
            title: "Classic Delta Core Young Family Hospital Network",
            marketing_heading: "Discounted Contributions for Families Willing to Use Delta Hospital Network",
            description: "For young families who accept a narrower hospital network and large non‑network co‑payments in exchange for lower premiums.",
            category: "Network Discount Hospital",
            strategic_intent: "Network_Discount_Arbitrage"
        },
        defaults: {
            income: 26000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 34,
            location_zone: "Near_Delta_Network"
        },
        search_profile: {
            network_tolerance: "Delta Network Only",
            min_savings_allocation: 0,
            chronic_needs: "CDL basic",
            required_benefits: [
                "Hospital network discount",
                "Upfront payment over R11,000 if using non‑network hospital",
                "Personal Health Fund up to R8,000"
            ],
            priority_tag: "network_discount"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-delta-core-network-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Delta variants reduce contributions substantially relative to Classic Core by restricting planned admissions to a defined Delta Hospital Network and imposing an upfront payment in excess of R11,000 for non‑network admissions.",
            primary_risk_warning: "Incorrect hospital choice for planned admissions triggers very large upfront co‑payments; geography and provider patterns must align to the Delta network.",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Consistent use of in‑network hospitals and avoidance of high‑cost elective surgery outside the Delta network."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Single non‑network elective admission can erase several months of contribution savings."
            }
        }
    },

    {
        slug: "medihelp-medprime-vision-dental-network-maximiser-2026",
        code: "MH-MP-VIS-DENT-2026",
        meta: {
            title: "Vision + Dental Network Maximiser",
            marketing_heading: "Exploit optometry/dentistry cycles with network compliance.",
            description: "Optimises for the insured optometry and dentistry structures that reference specific networks (Opticlear for optometry and DRC for dentistry), including cycle timing (e.g., 24-month optical cycle) and category use (routine vs specialised dentistry). [file:1]",
            category: "Lifestyle",
            strategic_intent: "Specific_Defined_Dental_Funding"
        },
        defaults: {
            income: 26000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 34,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "Insured optometry cover",
                "Insured dentistry cover",
                "Network provider access"
            ],
            priority_tag: "value"
        },
        actuarial_logic: {
            target_plan_id: "medihelp-medprime-any-2026",
            brand_lock: "Medihelp",
            mathematical_basis: "Maximise benefit capture by synchronising planned optical and dental events to the plan’s stated benefit cycles and by using the specified provider networks to avoid benefit leakage. [file:1]",
            primary_risk_warning: "Going outside the specified optical/dental networks can reduce payable amounts or shift costs into savings/out-of-pocket depending on the rule set. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Low",
                chronic_script_consistency: 0,
                break_even_point: "Break-even when the value of funded optical/dental events across the cycle exceeds premium uplift relative to a plan without insured dental/optical. [file:1]"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Cycle mistiming (e.g., claiming too early in a 24-month window). [file:1]"
            }
        }
    },
    {
        slug: "medihelp-medprime-refractive-surgery-18-50-optimiser-2026",
        code: "MH-MP-REFRACT-1850-2026",
        meta: {
            title: "Refractive Surgery (18–50) Optimiser",
            marketing_heading: "Target the stated refractive surgery family limit within the eligible age band.",
            description: "Optimises for refractive surgery funding by utilising the plan’s stated refractive surgery benefit (family limit) and the stated eligible beneficiary age band (18–50). [file:1]",
            category: "Elective Procedure",
            strategic_intent: "High_Cost_Technology_Funding"
        },
        defaults: {
            income: 45000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 28,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "Refractive surgery benefit",
                "Private hospital/day facility access"
            ],
            priority_tag: "value"
        },
        actuarial_logic: {
            target_plan_id: "medihelp-medprime-any-2026",
            brand_lock: "Medihelp",
            mathematical_basis: "One-off elective procedure optimisation: claim value concentrates in a single event, so timing within the eligible age band and within the family limit dominates expected value. [file:1]",
            primary_risk_warning: "The refractive surgery benefit is limited (family limit) and age-gated, so ineligible timing leads to full self-funding. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Low",
                chronic_script_consistency: 0,
                break_even_point: "Break-even when refractive surgery benefit utilisation materially offsets premium differential versus a plan without that funded elective component. [file:1]"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Attempting refractive surgery outside the 18–50 eligibility window. [file:1]"
            }
        }
    },

    {
        slug: "momentum-extender-associated-gp-compliance-2026",
        code: "MMS-EXT-ASSOC-GP-2026",
        meta: {
            title: "Extender Associated Chronic (GP compliance to avoid penalties)",
            marketing_heading: "Avoids the 70% accumulation + co-pay behaviour",
            description: "Optimises the Extender mechanics by selecting Associated as chronic provider and then strictly using Associated GPs so claims accumulate correctly to Threshold and avoid co-payment penalties in Extended Cover.",
            category: "Network Compliance",
            strategic_intent: "Risk_Mitigation_CoPayment"
        },
        defaults: {
            income: 26000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 45,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network for Chronic",
            min_savings_allocation: 0.25,
            chronic_needs: "Comprehensive",
            required_benefits: [
                "Extended Cover after Threshold",
                "Associated GP compliance rule when Associated chronic selected"
            ],
            priority_tag: "risk"
        },
        actuarial_logic: {
            target_plan_id: "momentum-extender-any-2026",
            brand_lock: "Momentum Medical Scheme",
            mathematical_basis: "The optimisation is to prevent leakage: non-Associated GP usage under Associated chronic can cause only partial accumulation to Threshold and introduce a co-payment dynamic once in Extended Cover.",
            primary_risk_warning: "Behavioural non-compliance (wrong GP) can reduce Threshold progress and introduce avoidable co-pay exposure.",
            utilization_assumptions: {
                gp_visits_frequency: "High-Moderate",
                chronic_script_consistency: 0.8,
                break_even_point: "Best-fit when the member can consistently use Associated GPs for GP visits."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Using non-Associated GP while on Associated chronic configuration"
            }
        }
    },
    {
        slug: "momentum-summit-full-choice-specialist-max-2026",
        code: "MMS-SUM-SPEC-MAX-2026",
        meta: {
            title: "Summit Full Choice (Specialist funding focus)",
            marketing_heading: "High specialist tariff room with broad provider freedom",
            description: "Targets members who want broad provider choice with enhanced specialist funding levels (non-associated specialists covered up to a higher multiple of scheme rate on this option).",
            category: "Premium Full Choice",
            strategic_intent: "Defined_Specialist_Funding"
        },
        defaults: {
            income: 60000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 41,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0,
            chronic_needs: "Comprehensive",
            required_benefits: [
                "Any-hospital cover",
                "Higher specialist funding multiple",
                "Risk-funded day-to-day subject to limits"
            ],
            priority_tag: "quality"
        },
        actuarial_logic: {
            target_plan_id: "momentum-summit-any-2026",
            brand_lock: "Momentum Medical Scheme",
            mathematical_basis: "This persona values tariff headroom and provider freedom; day-to-day is risk-funded but constrained by an overall per-beneficiary day-to-day limit that also absorbs additional chronic conditions.",
            primary_risk_warning: "Day-to-day and certain additional chronic benefits share a single overall per-beneficiary limit, so heavy utilisation can crowd out later-year claims.",
            utilization_assumptions: {
                gp_visits_frequency: "High (unlimited benefit)",
                chronic_script_consistency: 0.7,
                break_even_point: "Best-fit when specialist usage value exceeds the premium gap versus lower options and the day-to-day cap is acceptable."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Exhausting the overall day-to-day limit (also impacts additional chronic cover)"
            }
        }
    },

    {
        slug: "sizwehosmed-titanium-executive-prosthesis-joint-spine-limit-planner-2026",
        code: "SH-TEXEC-PROS-2026-05",
        meta: {
            title: "Titanium \"Executive\": Prosthesis Limit Planner",
            marketing_heading: "Device limits force sequencing decisions.",
            description: "Optimises around family prosthesis limits plus per-beneficiary joint/spine event constraints to avoid uncovered device spend.",
            category: "Device risk",
            strategic_intent: "Internal_Device_Risk_Transfer"
        },
        defaults: {
            income: 82000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 55,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0.208,
            chronic_needs: "Moderate",
            required_benefits: [
                "Internal/external prosthesis funding",
                "Joint replacement benefit constraint awareness"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwe-hosmed-titanium-executive-any-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Optimisation by 'sequencing': prioritise the highest severity/utility device event first and avoid simultaneous multi-device claims that breach annual family limits.",
            primary_risk_warning: "Annual family prosthesis limit and one-joint-per-year constraints can create a high out-of-pocket tail if multiple events occur.",
            utilization_assumptions: {
                gp_visits_frequency: "Medium",
                chronic_script_consistency: 0.5,
                break_even_point: "Break-even improves when at least one major prosthesis event occurs and is funded within the plan limits and protocols."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Second joint replacement request within the same year."
            }
        }
    }
];
