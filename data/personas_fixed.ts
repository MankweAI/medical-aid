import { Persona } from '@/utils/persona';

export const PERSONAS: Persona[] = [
    {
        slug: "bestmed-pace1-risk-exclusion-acceptance-2026",
        code: "BMPACE1_SENIOR_JOINT_EXCL",
        meta: {
            title: "Senior Accepting Joint Exclusion for Lower Premium",
            marketing_heading: "Comprehensive Cover, But No Elective Joint Replacements",
            description: "For seniors who need robust day-to-day and chronic benefits but are willing to forgo elective joint replacement cover to save on premiums compared to Pace2. Hip/knee replacements are only covered for Prescribed Minimum Benefits (PMBs).",
            category: "Comprehensive",
            strategic_intent: "Risk_Exclusion_Acceptance"
        },
        defaults: {
            income: 30000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 62,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 1127,
            chronic_needs: "7 Non-CDL Conditions",
            required_benefits: [
                "Savings Account",
                "Day-to-Day Benefits",
                "Non-CDL Chronic Medicine"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-pace1-any-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Pays R5,934/month. The key trade-off is the explicit exclusion of elective joint replacement surgery to achieve a lower premium than Pace2. Savings of R1,127/month (R13,524/annum) are used first, then a day-to-day limit of R13,794 kicks in. Non-CDL chronic benefit for 7 conditions is capped at R8,414.",
            primary_risk_warning: "You are completely exposed to the full cost of elective joint replacement surgery (e.g., hip or knee due to osteoarthritis), which is not covered. Biological medicines are also not covered unless for PMB conditions.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (relies on savings)",
                chronic_script_consistency: 12,
                break_even_point: "Member saves premium by accepting the financial risk of future joint surgery."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Diagnosis requiring elective joint replacement results in full out-of-pocket cost for the procedure."
            }
        }
    },
    {
        slug: "bestmed-pace1-family-adhd-management-2026",
        code: "BMPACE1_FAMILY_NONCDL",
        meta: {
            title: "Family Managing Child's ADHD on a Budget",
            marketing_heading: "Covers Key Non-CDL Conditions like ADHD within a defined limit.",
            description: "A family using the Non-CDL benefit to fund medication for conditions like ADHD, severe acne, or major depression. The benefit covers 7 conditions at 90% of the scheme tariff, up to a family limit of R16,827.",
            category: "Comprehensive",
            strategic_intent: "Non_CDL_Partial_Funding"
        },
        defaults: {
            income: 45000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 40,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 2528,
            chronic_needs: "7 Non-CDL Conditions",
            required_benefits: [
                "Non-CDL Chronic Medicine",
                "Savings Account",
                "Child Capping Benefit"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-pace1-any-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Monthly family cost for four is R11,765. The strategy is to manage specified non-CDL conditions within the R16,827 annual family limit. A 25% co-payment applies to non-formulary medicine, creating a financial incentive to adhere to the scheme's preferred drug list. Day-to-day expenses are funded from a R27,586 limit after the family's R2,528/month savings are depleted.",
            primary_risk_warning: "The R16,827 Non-CDL limit can be depleted quickly, especially with multiple dependants requiring treatment. There is a 25% co-payment on non-formulary chronic drugs.",
            utilization_assumptions: {
                gp_visits_frequency: "High (due to child sickness)",
                chronic_script_consistency: 12,
                break_even_point: "The Non-CDL benefit covers the cost of one or two children's ADHD medication for most of the year."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Exhaustion of the Non-CDL chronic limit, leading to out-of-pocket medication costs."
            }
        }
    },
    {
        slug: "bestmed-pace2-senior-joint-funder-2026",
        code: "BMPACE2_SENIOR_JOINT_FUND",
        meta: {
            title: "Senior Funding Elective Joint Replacement",
            marketing_heading: "The Smart Step-Up for Planned Joint Surgery",
            description: "Specifically for seniors who anticipate needing elective joint replacement. This plan includes defined benefits for these procedures, a risk explicitly excluded on Pace1, making it a direct upgrade for this need.",
            category: "Comprehensive",
            strategic_intent: "Defined_Specialist_Funding"
        },
        defaults: {
            income: 50000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 65,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 1227,
            chronic_needs: "Comprehensive",
            required_benefits: [
                "Joint Replacement Coverage",
                "Savings Account",
                "Day-to-Day Benefits"
            ],
            priority_tag: "senior"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-pace2-any-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Pays R8,766/month. This premium includes cover for major joint replacements up to a sub-limit (e.g., R66,033 for hip, R76,627 for knee) within a total prosthesis limit of R146,642. This is the key mathematical differentiator from Pace1. It also provides a higher Non-CDL chronic limit of R11,488 for 20 conditions.",
            primary_risk_warning: "The joint replacement benefit is subject to sub-limits; costs exceeding these amounts will be out-of-pocket. Oncology is limited to Essential ICON protocols, which may not cover all newer treatments.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (4-8 visits/year)",
                chronic_script_consistency: 12,
                break_even_point: "The cost of one elective joint replacement surgery far exceeds the annual premium difference between Pace1 and Pace2."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "A joint replacement procedure where surgeon or hospital fees exceed the prosthesis sub-limit."
            }
        }
    },
    {
        slug: "bestmed-pace3-biologic-bridge-funding-2026",
        code: "BMPACE3_BIOLOGIC_FUND",
        meta: {
            title: "Funding for High-Cost Biological Medicine",
            marketing_heading: "Exceptional Cover for Life-Changing Biological Drugs",
            description: "Designed for members with conditions like severe rheumatoid arthritis or Crohn's disease who require high-cost biologic medicines. The plan offers a very high biologic limit and extensive chronic cover.",
            category: "Comprehensive",
            strategic_intent: "Maximum_Biological_Funding"
        },
        defaults: {
            income: 80000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 50,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 1409,
            chronic_needs: "Specialized",
            required_benefits: [
                "Biologic_Bridge_Funding",
                "Day-to-Day Benefits",
                "Non-CDL Chronic Medicine"
            ],
            priority_tag: "chronic"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-pace3-any-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Pays R10,064/month. The core feature is the massive R420,695 per beneficiary limit for biological medicine, a significant jump from Pace2's R210,208. It also has a high Non-CDL chronic limit of R17,654 for 20 conditions, and covers Enhanced level ICON oncology protocols.",
            primary_risk_warning: "While the biologic limit is high, it is still a finite amount and may be exhausted by the most expensive treatments. A 15% co-payment on non-formulary chronic drugs applies.",
            utilization_assumptions: {
                gp_visits_frequency: "High (multiple chronic scripts)",
                chronic_script_consistency: 12,
                break_even_point: "The plan is essential for anyone on a biologic drug costing more than R17,500/month, as it transfers this catastrophic cost to the scheme."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Depletion of the R420,695 biologic medicine limit."
            }
        }
    },
    {
        slug: "bestmed-pace4-executive-risk-transfer-2026",
        code: "BMPACE4_EXEC_RISK_TRANSFER",
        meta: {
            title: "Executive with Maximum Risk Transfer",
            marketing_heading: "Top-Tier Cover Where the Scheme Pays First",
            description: "For high-income earners who want the highest level of certainty and risk transfer. Unlike other Pace plans, day-to-day benefits are paid from the scheme's generous limits FIRST, preserving the member's savings account for exceptional expenses.",
            category: "Premium",
            strategic_intent: "High_Risk_Transfer"
        },
        defaults: {
            income: 120000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 45,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 377,
            chronic_needs: "Comprehensive",
            required_benefits: [
                "Day-to-Day Benefits",
                "Insulin Pump",
                "Joint Replacement Coverage"
            ],
            priority_tag: "comprehensive"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-pace4-any-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Pays R12,572/month. The fundamental difference is the claims logic: a massive R45,375 day-to-day limit is used *before* the personal savings account (R377/month) is touched. This structure maximizes risk transfer and protects savings. It also has the highest prosthesis limits (Knee: R88,120) and covers 29 non-CDL conditions.",
            primary_risk_warning: "The very high premium is the main consideration. While comprehensive, day procedures performed in an acute hospital instead of a day hospital incur a R2,872 co-payment.",
            utilization_assumptions: {
                gp_visits_frequency: "Very High (maximizes unlimited benefit)",
                chronic_script_consistency: 12,
                break_even_point: "Ideal for members with consistently high monthly out-of-hospital claims (e.g., multiple specialist visits, psychology, physio) who want to avoid any self-funding gap."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Exhaustion of the R45,375 day-to-day limit, which would then begin to deplete the savings account."
            }
        }
    },
    {
        slug: "bestmed-pace4-type1-diabetes-tech-funding-2026",
        code: "BMPACE4_T1D_TECH",
        meta: {
            title: "Type 1 Diabetes Patient Leveraging Technology Benefits",
            marketing_heading: "Comprehensive Diabetes Management with Insulin Pump and CGM Cover",
            description: "For individuals with Type 1 Diabetes who require advanced technology like an insulin pump and Continuous Glucose Monitoring (CGM). Pace4 provides specific, high-value benefits for these devices from the risk pool.",
            category: "Premium",
            strategic_intent: "High_Cost_Technology_Funding"
        },
        defaults: {
            income: 90000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 35,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 377,
            chronic_needs: "Type 1 Diabetes",
            required_benefits: [
                "Insulin Pump",
                "ContinuousFlash Glucose Monitoring CGMFGM",
                "Day-to-Day Benefits"
            ],
            priority_tag: "chronic"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-pace4-any-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "The plan's R12,572/month premium is justified by the high-cost tech benefits funded from risk: an insulin pump is covered up to R53,143 every 24 months, and CGM sensors are funded up to R30,357 per family per year. These costs are covered before the member's personal savings are used.",
            primary_risk_warning: "Benefits for the insulin pump and CGM are subject to pre-authorisation and specific scheme protocols. The day-to-day limit, while high, is still finite.",
            utilization_assumptions: {
                gp_visits_frequency: "High (compliance with nominated GP required)",
                chronic_script_consistency: 12,
                break_even_point: "The combined value of the insulin pump and annual CGM supply significantly outweighs the annual plan premium, making it financially optimal for tech-dependent diabetics."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Reaching the R30,357 annual limit for CGM sensors, requiring out-of-pocket funding for the remainder of the year."
            }
        }
    },
    {
        slug: "bestmed-beat1-network-budget-starter-2026",
        code: "BMBEAT1_NET_STARTER",
        meta: {
            title: "Network Hospital-Only Young Starter",
            marketing_heading: "Bare-Bones Hospital Safety Net",
            description: "Single individual using network hospitals only, avoiding R15,025 non-network penalty. No savings account, no day-to-day cover except CDL chronic medicine. Relies on public healthcare/cash for GP visits.",
            category: "Hospital Plan",
            strategic_intent: "Disaster_Cover_Only"
        },
        defaults: {
            income: 8500,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 24,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Hospital Cover",
                "CDL Chronic Medicine"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat1-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "R2,269/month contribution avoids R15,025 non-network co-payment. Hospital cover only at 100% Scheme tariff. Zero savings account. CDL chronic medicine covered unlimited but non-CDL excluded. Joint replacement excluded except PMBs (up to R51,686 knee/shoulder with sub-limits).",
            primary_risk_warning: "Non-network hospital use triggers R15,025 penalty. Zero GP/specialist cover outside hospital. Acute medicine not covered.",
            utilization_assumptions: {
                gp_visits_frequency: "Zero (rely on emergency room benefit)",
                chronic_script_consistency: 0,
                break_even_point: "Plan designed for members expecting zero outpatient care"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-network hospital admission triggers R15,025 co-payment"
            }
        }
    },
    {
        slug: "bestmed-beat1-network-large-family-capped-2026",
        code: "BMBEAT1_NET_FAMILY",
        meta: {
            title: "Large Family Network Hospital Plan",
            marketing_heading: "4+ Kids? Pay for 3 Only",
            description: "Family with 4+ children leveraging '3-child cap' rule. Network hospitals required. Children under 24 classified as child dependants at R956/month each (first 3 only).",
            category: "Hospital Plan",
            strategic_intent: "Family_Cost_Leverage"
        },
        defaults: {
            income: 18000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 4
            },
            age: 38,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Hospital Cover",
                "Child Capping Benefit"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat1-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Pay R2,269 (principal) + R1,764 (adult) + R2,868 (3 children at R956 each) = R6,901 total. 4th+ children free. Prosthesis limit R99,764/family shared. Hospital cover 100% Scheme tariff at network DSPs.",
            primary_risk_warning: "Must use network hospitals or face R15,025 co-payment. No day-to-day cover for GP visits, acute medicine, or dental (except PMBs). Child dental surgery limited to R6,642/family for ages ≤7.",
            utilization_assumptions: {
                gp_visits_frequency: "Very Low (rely on public sector/cash)",
                chronic_script_consistency: 0,
                break_even_point: "4th child makes plan cost-effective versus paying per-child"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Network breach triggers R15,025 penalty"
            }
        }
    },
    {
        slug: "bestmed-beat1-fullchoice-senior-joint-risk-2026",
        code: "BMBEAT1_FULL_SENIOR",
        meta: {
            title: "Senior Joint Replacement Risk (Full Choice)",
            marketing_heading: "60+ With Arthroplasty Exclusion Awareness",
            description: "Senior member accepting non-network flexibility but aware joint replacement excluded (except PMBs). Pays R2,523/month for hospital freedom. Hip replacement only covered if meets PMB criteria (R41,918 limit).",
            category: "Hospital Plan",
            strategic_intent: "Risk_Exclusion_Acceptance"
        },
        defaults: {
            income: 22000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 63,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice (Except Joint Replacement)",
            min_savings_allocation: 0,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Hospital Cover",
                "CDL Chronic Medicine"
            ],
            priority_tag: "flexibility"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat1-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "R2,523/month buys full hospital choice. Joint replacement excluded except PMBs: Hip/major joints R41,918, Knee/shoulder R51,686. Biological medicine during hospitalisation R12,144/family/annum. CDL chronic unlimited.",
            primary_risk_warning: "Elective joint replacement NOT covered. PMB joint surgery subject to prosthesis sub-limits. No savings account for GP/specialist consultations.",
            utilization_assumptions: {
                gp_visits_frequency: "Low (non-pregnancy related)",
                chronic_script_consistency: 12,
                break_even_point: "Suitable for seniors with CDL conditions who may need non-PMB surgeries"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Elective joint replacement triggers full out-of-pocket cost"
            }
        }
    },
    {
        slug: "bestmed-beat1-network-maternity-basic-2026",
        code: "BMBEAT1_NET_MATERNITY",
        meta: {
            title: "Network Maternity Bare-Minimum",
            marketing_heading: "Hospital Birth + 6 Antenatal Visits Only",
            description: "Pregnant member on network plan. Maternity benefits: 6 antenatal consultations, 2 ultrasounds (1st/2nd trimester), 100% Scheme tariff confinement. No supplements. Contraceptives R2,092/annum or IUD R3,295 (once per 5 years).",
            category: "Hospital Plan",
            strategic_intent: "Minimum_Maternity_Funding"
        },
        defaults: {
            income: 11000,
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
            chronic_needs: "None",
            required_benefits: [
                "Maternity Cover",
                "Hospital Cover"
            ],
            priority_tag: "maternity"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat1-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "R2,269/month. Maternity: 6 antenatal GP/gynaecologist visits, 2x2D ultrasounds (10-12w, 20-24w), 100% confinement. HPV vaccines ages 9-26 (3 doses). Contraceptives R2,092/annum.",
            primary_risk_warning: "No maternity supplements. No postnatal consultation funded. Network hospital mandatory for birth. GP visits beyond 6 antenatal not covered.",
            utilization_assumptions: {
                gp_visits_frequency: "Low (non-pregnancy related)",
                chronic_script_consistency: 0,
                break_even_point: "Covers standard low-risk pregnancy but no extras"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "High-risk pregnancy requiring additional scans/visits not covered"
            }
        }
    },
    {
        slug: "bestmed-beat1-network-cdl-chronic-only-2026",
        code: "BMBEAT1_NET_CDL",
        meta: {
            title: "CDL Chronic Disease Management (Network)",
            marketing_heading: "Type 2 Diabetes/Hypertension Hospital Plan",
            description: "Member with 1-2 CDL conditions (27 conditions list). CDL chronic medicine unlimited at 100% Scheme tariff. 30% co-pay for non-formulary. Network pharmacies required. No non-CDL chronic (e.g., severe acne, ADHD).",
            category: "Hospital Plan",
            strategic_intent: "Defined_Benefit_Funding"
        },
        defaults: {
            income: 15000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 52,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network for Chronic",
            min_savings_allocation: 0,
            chronic_needs: "CDL Only",
            required_benefits: [
                "CDL Chronic Medicine",
                "Hospital Cover"
            ],
            priority_tag: "chronic"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat1-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "R2,269/month. CDL medicine (27 conditions including diabetes type 2, hypertension, asthma) unlimited from Scheme risk. 30% co-pay non-formulary. Biological medicine PMBs only. Network pharmacies mandatory.",
            primary_risk_warning: "Non-CDL chronic conditions (severe acne, ADHD, allergic rhinitis) NOT covered. Acute medicine not funded. Must use network pharmacies or face reimbursement at Scheme tariff.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (4-8 visits/year)",
                chronic_script_consistency: 12,
                break_even_point: "Member collects 1-2 chronic scripts monthly, avoids private GP costs"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-formulary medicine triggers 30% co-payment"
            }
        }
    },
    {
        slug: "bestmed-beat2-network-savings-single-starter-2026",
        code: "BMBEAT2_NET_SINGLE",
        meta: {
            title: "Network Savings Account Single Starter",
            marketing_heading: "Hospital + Minimal Day-to-Day Buffer",
            description: "Single member with R444/month (R5,328/annum) savings account. Hospital cover 100% Scheme tariff. Savings for GP/specialist consultations, acute medicine, OTC. CDL chronic unlimited. Network hospitals required.",
            category: "Hospital Plan with Savings",
            strategic_intent: "Liquidity_Buffer"
        },
        defaults: {
            income: 10500,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 26,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 444,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Savings Account",
                "Hospital Cover",
                "CDL Chronic Medicine"
            ],
            priority_tag: "savings"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat2-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "R2,775/month total (R2,331 risk + R444 savings). Savings pays GP/specialist consultations, acute medicine, OTC, basic dentistry at 100% Scheme tariff. Unused savings roll to vested account annually. Hospital cover: Biological medicine R18,215/family/annum. Prosthesis R99,764/family/annum. Joint replacement excluded except PMBs.",
            primary_risk_warning: "Savings depletes quickly with frequent GP visits. Network hospital mandatory (R15,025 co-payment if breached). No day-to-day risk benefits after savings exhausted.",
            utilization_assumptions: {
                gp_visits_frequency: "Low (relies on 3 GP visits + unlimited virtual GP)",
                chronic_script_consistency: 0,
                break_even_point: "Savings covers 3-5 GP visits + 1 acute medicine claim annually"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Savings exhaustion mid-year triggers out-of-pocket for day-to-day"
            }
        }
    },
    {
        slug: "bestmed-beat2-network-savings-family-3child-2026",
        code: "BMBEAT2_NET_FAMILY",
        meta: {
            title: "Network Savings Family (3-Child Cap)",
            marketing_heading: "Family Savings + Hospital with Child Leverage",
            description: "Family with 3+ children leveraging cap. Total savings R1,116/month (R13,392/annum). Hospital cover includes dental surgery for ages ≤7 (R6,642/family). Preventative dentistry from Scheme risk.",
            category: "Hospital Plan with Savings",
            strategic_intent: "Family_Cost_Leverage"
        },
        defaults: {
            income: 21000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 3
            },
            age: 35,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 1116,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Savings Account",
                "Hospital Cover",
                "Child Dental Surgery"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat2-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "R7,098/month total (R5,982 risk + R1,116 savings). Savings R444+R345+R187+R187+R187 = R1,350 (but only 3 children count). Dental surgery ages ≤7: R6,642/family from Scheme risk. Preventative dentistry: 2x/year for ages <12, 1x/year ages ≥12. Specialised diagnostic imaging R23,012/family/annum with R2,100 co-pay per scan (waived for PMBs).",
            primary_risk_warning: "Child dental surgery only covers ages ≤7. Savings shared across family depletes fast. Network breach triggers R15,025 co-payment. No non-CDL chronic medicine (e.g., ADHD for children).",
            utilization_assumptions: {
                gp_visits_frequency: "High (due to child sickness)",
                chronic_script_consistency: 0,
                break_even_point: "Savings funds 6-10 GP visits + 2 acute medicine claims for children annually"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Savings exhaustion mid-year; specialized scans trigger R2,100 co-pay each"
            }
        }
    },
    {
        slug: "bestmed-beat2-fullchoice-savings-senior-joint-risk-2026",
        code: "BMBEAT2_FULL_SENIOR",
        meta: {
            title: "Full Choice Savings Senior (Joint Exclusion Aware)",
            marketing_heading: "Hospital Freedom + Savings, Joint Risk Accepted",
            description: "Senior (60+) with R493/month savings (R5,916/annum). Full hospital choice. Joint replacement excluded except PMBs. Maternity benefits included (6 antenatal visits). Contraceptives R2,301/annum.",
            category: "Hospital Plan with Savings",
            strategic_intent: "Risk_Exclusion_Acceptance"
        },
        defaults: {
            income: 25000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 61,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 493,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Savings Account",
                "Hospital Cover",
                "CDL Chronic Medicine"
            ],
            priority_tag: "flexibility"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat2-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "R3,084/month total (R2,591 risk + R493 savings). Full hospital choice (no network penalty). Joint replacement excluded except PMBs: Hip/major R41,918, Knee/shoulder R51,686. Biological medicine R18,215/family/annum. Specialised diagnostic imaging R23,012/family/annum (R2,100 co-pay per scan).",
            primary_risk_warning: "Elective joint replacement NOT covered unless meets PMB criteria. Savings insufficient for frequent specialist consultations. No non-CDL chronic medicine.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (non-pregnancy related)",
                chronic_script_consistency: 12,
                break_even_point: "Savings covers 2-3 specialist consultations + pathology annually"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Elective joint replacement triggers full out-of-pocket; specialised scans trigger R2,100 co-pay"
            }
        }
    },
    {
        slug: "bestmed-beat2-network-savings-maternity-basic-2026",
        code: "BMBEAT2_NET_MATERNITY",
        meta: {
            title: "Network Savings Maternity (6 Visits)",
            marketing_heading: "Hospital Birth + Savings for Prenatal Expenses",
            description: "Pregnant member with savings account. Maternity: 6 antenatal consultations, 2 ultrasounds (1st/2nd trimester), 100% confinement. Savings pays additional GP visits, supplements (non-funded). Contraceptives R2,301/annum.",
            category: "Hospital Plan with Savings",
            strategic_intent: "Minimum_Maternity_Funding"
        },
        defaults: {
            income: 13500,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 29,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 444,
            chronic_needs: "None",
            required_benefits: [
                "Maternity Cover",
                "Savings Account",
                "Hospital Cover"
            ],
            priority_tag: "maternity"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat2-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "R2,775/month total (R2,331 risk + R444 savings). Maternity from Scheme risk: 6 antenatal GP/gynaecologist visits, 2x2D ultrasounds (10-12w, 20-24w), 100% confinement. Savings pays additional prenatal GP visits, acute medicine (e.g., nausea medication). Contraceptives R2,301/annum or IUD R3,595 (once per 5 years) from preventative care benefit.",
            primary_risk_warning: "No maternity supplements funded. Savings insufficient for high-risk pregnancy (additional scans/visits). Network hospital mandatory for birth.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (non-pregnancy related)",
                chronic_script_consistency: 0,
                break_even_point: "Savings covers 2-3 extra prenatal GP visits + 1-2 acute medicine claims"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "High-risk pregnancy requiring additional scans depletes savings; specialized scans trigger R2,100 co-pay"
            }
        }
    },
    {
        slug: "bestmed-beat3-network-maternity-enhanced-2026",
        code: "BMBEAT3_NET_MATERNITY",
        meta: {
            title: "Network Enhanced Maternity (9 Visits + Supplements)",
            marketing_heading: "Generous Maternity with Day-to-Day Coverage",
            description: "Pregnant member on Beat3. Maternity: 9 antenatal consultations, 1 postnatal, 2 ultrasounds, supplements R145/claim x 9 months (R1,305). Savings R609/month (R7,308/annum). 5 non-CDL chronic conditions covered (80% Scheme tariff, M R4,358, M1+ R8,865).",
            category: "Hospital Plan with Savings and Selected Risk Benefits",
            strategic_intent: "Enhanced_Maternity_Funding"
        },
        defaults: {
            income: 16000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 30,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 609,
            chronic_needs: "5 Non-CDL Conditions",
            required_benefits: [
                "Maternity Cover",
                "Savings Account",
                "Hospital Cover",
                "Non-CDL Chronic Medicine"
            ],
            priority_tag: "maternity"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat3-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "R4,062/month total (R3,453 risk + R609 savings). Maternity: 9 antenatal GP/gynaecologist/midwife visits, 1 postnatal, 2x2D ultrasounds (10-12w, 20-24w), supplements R145/claim x 9 months. Non-CDL chronic: 5 conditions (severe acne, allergic rhinitis, ADHD, severe eczema, migraine prophylaxis) at 80% Scheme tariff, limited to M R4,358, M1+ R8,865. Savings pays GP/specialist, acute medicine, OTC, basic dentistry. Contraceptives R2,510/annum or IUD R3,795 (once per 5 years).",
            primary_risk_warning: "Network hospital mandatory (R15,025 co-payment if breached). Non-CDL chronic limited to 5 conditions and capped at R4,358/member. Savings shared with non-maternity day-to-day expenses. Refractive surgery R10,518/eye.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 0,
                break_even_point: "Maternity benefits + savings cover standard pregnancy + 5-8 GP visits annually"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-CDL chronic limit exhaustion mid-year; network breach triggers R15,025 co-payment; specialized scans trigger R2,000 co-pay"
            }
        }
    },
    {
        slug: "bestmed-beat3-network-savings-noncdl-chronic-2026",
        code: "BMBEAT3_NET_NONCDL",
        meta: {
            title: "Network Non-CDL Chronic Manager (5 Conditions)",
            marketing_heading: "ADHD/Acne/Migraine Coverage with Savings",
            description: "Member with 1-2 non-CDL chronic conditions (severe acne, ADHD, allergic rhinitis, severe eczema, migraine prophylaxis). 80% Scheme tariff, 30% co-pay non-formulary. Limit M R4,358, M1+ R8,865. CDL chronic unlimited. Savings R609/month.",
            category: "Hospital Plan with Savings and Selected Risk Benefits",
            strategic_intent: "Non_CDL_Partial_Funding"
        },
        defaults: {
            income: 14500,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 27,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network for Chronic",
            min_savings_allocation: 609,
            chronic_needs: "5 Non-CDL Conditions",
            required_benefits: [
                "Non-CDL Chronic Medicine",
                "Savings Account",
                "Hospital Cover"
            ],
            priority_tag: "chronic"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat3-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "R4,062/month total (R3,453 risk + R609 savings). Non-CDL chronic: 5 conditions at 80% Scheme tariff, capped at M R4,358, M1+ R8,865. 30% co-pay non-formulary. CDL+PMB chronic unlimited (paid from non-CDL limit first, then Scheme risk). Savings pays GP/specialist, acute medicine, OTC, basic dentistry. Biological medicine R24,286/family/annum. Specialised diagnostic imaging R33,472/family/annum (R2,000 co-pay per scan, waived for PMBs).",
            primary_risk_warning: "Non-CDL chronic capped at R4,358/member annually (exhausts in ~3-4 months for expensive medications). Network pharmacies required. Network hospital mandatory (R15,025 co-payment if breached).",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate (relies on savings)",
                chronic_script_consistency: 12,
                break_even_point: "Non-CDL limit covers 3-4 months scripts; savings funds 4-6 GP visits annually"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-CDL limit exhaustion triggers out-of-pocket; non-formulary triggers 30% co-pay; specialized scans trigger R2,000 co-pay"
            }
        }
    },
    {
        slug: "bestmed-beat3-network-savings-family-maternity-2026",
        code: "BMBEAT3_NET_FAMILY_MAT",
        meta: {
            title: "Network Family Maternity + Savings (3-Child Cap)",
            marketing_heading: "Family with Pregnant Member + Enhanced Benefits",
            description: "Family with 2-3 children + pregnant adult dependant. Total savings R1,259/month (R15,108/annum). Enhanced maternity: 9 antenatal, 1 postnatal, supplements R145x9 months. Preventative dentistry for children. Travel vaccines from Scheme risk.",
            category: "Hospital Plan with Savings and Selected Risk Benefits",
            strategic_intent: "Enhanced_Maternity_Funding"
        },
        defaults: {
            income: 28000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 33,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 1259,
            chronic_needs: "5 Non-CDL Conditions",
            required_benefits: [
                "Maternity Cover",
                "Savings Account",
                "Hospital Cover",
                "Preventative Dentistry"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat3-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "R10,388/month total (R9,129 risk + R1,259 savings). Maternity: 9 antenatal, 1 postnatal, 2x2D ultrasounds, supplements R145/claim x 9 months. Preventative dentistry: 2x/year for children <12, 1x/year ≥12. Paediatric immunisations: state-recommended programme. Travel vaccines: typhoid, yellow fever, tetanus, meningitis, hepatitis, cholera from Scheme risk. Biological medicine R24,286/family/annum. Prosthesis R100,818/family/annum. Joint replacement excluded except PMBs: Hip/major R42,221, Knee/shoulder R52,241.",
            primary_risk_warning: "Savings shared across family depletes fast with frequent GP visits. Network hospital mandatory (R15,025 co-payment if breached). Dental surgery limited to R10,217/family/annum (in/out of hospital). Wisdom teeth extraction R2,500 co-pay.",
            utilization_assumptions: {
                gp_visits_frequency: "High (due to child sickness)",
                chronic_script_consistency: 0,
                break_even_point: "Savings covers 8-12 GP visits + 3-5 acute medicine claims annually for family"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Savings exhaustion mid-year; network breach triggers R15,025 co-payment; wisdom teeth extraction triggers R2,500 co-pay; specialized scans trigger R2,000 co-pay"
            }
        }
    },
    {
        slug: "bestmed-beat3-plus-savings-enhanced-maternity-family-2026",
        code: "BMBEAT3P_FAMILY_MAT",
        meta: {
            title: "Beat3 Plus Enhanced Family Maternity + High Savings",
            marketing_heading: "Premium Maternity + Optometry + High Day-to-Day",
            description: "Family on Beat3 Plus (no network option). Enhanced maternity + optometry benefit (R990 frame, 100% lenses network PPN). Savings R1,261/month (R15,132/annum). Supplementary services R2,188/family/annum from Scheme risk. 5 non-CDL chronic conditions.",
            category: "Hospital Plan with Savings and Selected Risk Benefits",
            strategic_intent: "Enhanced_Maternity_Funding"
        },
        defaults: {
            income: 35000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 34,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 1261,
            chronic_needs: "5 Non-CDL Conditions",
            required_benefits: [
                "Maternity Cover",
                "Optometry Benefit",
                "Savings Account",
                "Hospital Cover",
                "Preventative Dentistry"
            ],
            priority_tag: "comprehensive"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat3-plus-any-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "R10,690/month total (R9,429 risk + R1,261 savings). No network option (full hospital choice). Maternity: 9 antenatal, 1 postnatal, 2x2D ultrasounds, supplements R145/claim x 9 months. Optometry: Network PPN (R990 frame + 100% lenses, OR R1,760 contact lenses), every 24 months. Supplementary services: R2,188/family/annum from Scheme risk, thereafter savings. Biological medicine R24,286/family/annum. Prosthesis R100,818/family/annum. Specialised diagnostic imaging R36,610/family/annum (R2,000 co-pay per scan, waived for PMBs). Refractive surgery R10,518/eye.",
            primary_risk_warning: "Higher monthly contribution vs. Beat3. Supplementary services limit R2,188/family depletes quickly. Non-CDL chronic capped at R4,358/member, R8,865/family. Wisdom teeth extraction R2,500 co-pay. Day procedures in acute hospital (not day hospital) trigger R2,872 co-pay.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 0,
                break_even_point: "Optometry benefit + enhanced maternity + savings covers family annual eye care + pregnancy + 10-15 GP visits"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Supplementary services limit exhaustion; non-CDL chronic limit exhaustion; day procedure in acute hospital triggers R2,872 co-pay; specialized scans trigger R2,000 co-pay"
            }
        }
    },
    {
        slug: "bestmed-beat4-savings-daytoday-comprehensive-single-2026",
        code: "BMBEAT4_SINGLE",
        meta: {
            title: "Beat4 Comprehensive Single (Savings + Day-to-Day)",
            marketing_heading: "Superior Hybrid: Savings → Day-to-Day → Vested",
            description: "Single member on Beat4. Savings R1,031/month (R12,372/annum) pays first, then day-to-day limits kick in (M R16,227, M1+ R32,452). 9 non-CDL chronic conditions (90% Scheme tariff, M R9,571, M1+ R19,143). Acute medicine: M R3,652, M1+ R7,376 from day-to-day.",
            category: "Hospital Plan with Savings and Day-to-Day Benefits",
            strategic_intent: "Day_to_Day_Certainty"
        },
        defaults: {
            income: 45000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 35,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 1031,
            chronic_needs: "9 Non-CDL Conditions",
            required_benefits: [
                "Savings Account",
                "Day-to-Day Benefits",
                "Hospital Cover",
                "Non-CDL Chronic Medicine",
                "Optometry Benefit"
            ],
            priority_tag: "comprehensive"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat4-any-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "R7,365/month total (R6,334 risk + R1,031 savings). Savings pays first at 100% Scheme tariff. Day-to-day limits: Overall M R16,227, M1+ R32,452. GP/specialist consultations: M R4,133, M1+ R7,361. Basic/specialised dentistry: M R7,149, M1+ R14,359 (orthodontics subject to pre-auth). Acute medicine: M R3,652, M1+ R7,376. OTC medicine: R1,214/family OR full savings access (self-payment gap accumulation). Non-CDL chronic: 9 conditions (severe acne, ADHD, allergic rhinitis, severe eczema, migraine prophylaxis, gout prophylaxis, major depression, OCD, GORD) at 90% Scheme tariff, M R9,571, M1+ R19,143. 20% co-pay non-formulary. Major depression continues from Scheme risk after non-CDL limit depleted. Biological medicine R30,357/family/annum. Prosthesis R123,064/family/annum. External prosthesis R29,599/family (includes 1 artificial limb per 60 months). Specialised diagnostic imaging R41,840/family/annum (R2,000 co-pay MRI/CT, waived for PMBs). PET scans: 1/beneficiary/annum (not subject to limit/co-pay). Cochlear implants + BAHA: R250,000/beneficiary/annum, sound processor upgrades every 5 years.",
            primary_risk_warning: "Day-to-day limits exhaust faster than expected with frequent specialist visits. Non-CDL chronic capped at R9,571/member. OTC default R1,214 (must contact Bestmed to switch to self-payment gap accumulation). Hearing aids R13,357/family every 24 months.",
            utilization_assumptions: {
                gp_visits_frequency: "High (unlimited network visits benefit)",
                chronic_script_consistency: 12,
                break_even_point: "Savings + day-to-day covers 15-25 GP/specialist visits + 6-10 acute medicine claims + 1-2 non-CDL chronic scripts monthly"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Day-to-day limit exhaustion triggers vested savings usage; non-CDL chronic limit exhaustion; specialized scans trigger R2,000 co-pay (MRI/CT); day procedure in acute hospital triggers R2,872 co-pay"
            }
        }
    },
    {
        slug: "bestmed-beat4-savings-daytod-ay-family-comprehensive-2026",
        code: "BMBEAT4_FAMILY",
        meta: {
            title: "Beat4 Comprehensive Family (Savings + Day-to-Day)",
            marketing_heading: "Family Hybrid: High Day-to-Day + Enhanced Maternity",
            description: "Family (principal + adult + 2 children) on Beat4. Total savings R2,188/month (R26,256/annum). Day-to-day: M1+ R32,452. Enhanced maternity: 9 antenatal, 1 postnatal, supplements R145x9 months. Optometry: R1,270 frame + 100% lenses network PPN. Travel vaccines, paediatric immunisations from Scheme risk.",
            category: "Hospital Plan with Savings and Day-to-Day Benefits",
            strategic_intent: "Day_to_Day_Certainty"
        },
        defaults: {
            income: 60000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 38,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 2188,
            chronic_needs: "9 Non-CDL Conditions",
            required_benefits: [
                "Savings Account",
                "Day-to-Day Benefits",
                "Hospital Cover",
                "Maternity Cover",
                "Optometry Benefit",
                "Preventative Dentistry"
            ],
            priority_tag: "comprehensive"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat4-any-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Matches your budget with R17,089/pm total cost. Includes R2,188/pm savings for day-to-day expenses and excellent maternity & preventative benefits.",
            primary_risk_warning: "Day-to-day limit M1+ R32,452 shared across family exhausts quickly with frequent specialist visits. Non-CDL chronic capped at M1+ R19,143. Dental surgery limited to R12,772/family/annum. Wisdom teeth extraction R2,500 co-pay. Day procedures in acute hospital trigger R2,872 co-pay.",
            utilization_assumptions: {
                gp_visits_frequency: "Very High (maximizes unlimited benefit)",
                chronic_script_consistency: 0,
                break_even_point: "Savings + day-to-day covers 25-40 GP/specialist visits + maternity + optometry + 10-15 acute medicine claims annually for family"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Day-to-day limit exhaustion triggers vested savings usage; non-CDL chronic limit exhaustion; wisdom teeth extraction triggers R2,500 co-pay; day procedure in acute hospital triggers R2,872 co-pay; specialized scans trigger R2,000 co-pay (MRI/CT)"
            }
        }
    },
    {
        slug: "bestmed-beat4-savings-daytod-ay-senior-comprehensive-2026",
        code: "BMBEAT4_SENIOR",
        meta: {
            title: "Beat4 Senior Comprehensive (60+)",
            marketing_heading: "Senior Hybrid: Joint Coverage + High Day-to-Day",
            description: "Senior (60+) on Beat4. Joint replacement covered (except for PMBs): Hip/major R43,723, Knee/shoulder R58,086. Savings R1,031/month. Day-to-day: M R16,227. Hearing aids R13,357/family every 24 months. Cochlear implants R250,000/beneficiary/annum.",
            category: "Hospital Plan with Savings and Day-to-Day Benefits",
            strategic_intent: "High_Risk_Transfer"
        },
        defaults: {
            income: 55000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 64,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 1031,
            chronic_needs: "9 Non-CDL Conditions",
            required_benefits: [
                "Savings Account",
                "Day-to-Day Benefits",
                "Hospital Cover",
                "Joint Replacement Coverage",
                "Hearing Aids"
            ],
            priority_tag: "senior"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat4-any-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "R7,365/month total (R6,334 risk + R1,031 savings). Joint replacement covered (except PMBs): Hip/major R43,723, Knee/shoulder R58,086, Other minor R17,848. Prosthesis R123,064/family/annum. External prosthesis R29,599/family (includes 1 artificial limb per 60 months). Hearing aids: R13,357/family every 24 months (subject to pre-auth, quotation, motivation, audiogram). Cochlear implants + BAHA: R250,000/beneficiary/annum, sound processor upgrades every 5 years. Savings pays first. Day-to-day: M R16,227. GP/specialist consultations: M R4,133. Basic/specialised dentistry: M R7,149. Acute medicine: M R3,652. Biological medicine R30,357/family/annum. Specialised diagnostic imaging R41,840/family/annum (R2,000 co-pay MRI/CT, waived for PMBs). PET scans: 1/beneficiary/annum. Advanced illness benefit: R109,288/beneficiary/annum.",
            primary_risk_warning: "PMB joint replacement excluded (must be elective). Prosthesis limits subject to preferred provider (otherwise limits/co-pays apply). Day-to-day limit exhausts faster with frequent specialist visits. Non-CDL chronic capped at R9,571/member.",
            utilization_assumptions: {
                gp_visits_frequency: "High (compliance with nominated GP required)",
                chronic_script_consistency: 12,
                break_even_point: "Suitable for seniors with planned elective joint replacement + 10-20 GP/specialist visits annually"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "PMB joint replacement not covered (full out-of-pocket); day-to-day limit exhaustion triggers vested savings usage; non-CDL chronic limit exhaustion; specialized scans trigger R2,000 co-pay (MRI/CT); day procedure in acute hospital triggers R2,872 co-pay"
            }
        }
    },
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
        slug: "bestmed-rhythm1-network-maternity-basic-2026",
        code: "BMRHYTHM1_MATERNITY",
        meta: {
            title: "Rhythm1 Basic Maternity (Mid-Income)",
            marketing_heading: "Essential Maternity Support for Mid-Income",
            description: "For earners between R9,001 - R14,000. Includes 6 antenatal consultations and 2 ultrasounds. A cost-effective way to cover a low-risk pregnancy within a strict network.",
            category: "Network Plan",
            strategic_intent: "Minimum_Maternity_Funding"
        },
        defaults: {
            income: 12000,
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
            chronic_needs: "None",
            required_benefits: [
                "Maternity Cover",
                "Unlimited GP Visits"
            ],
            priority_tag: "maternity"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-rhythm1-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "At R2,024/month, this plan funds the essential R3,000-R5,000 cost of antenatal care + confinement costs, provided the member stays strictly within the DSP network.",
            primary_risk_warning: "Only covers 6 antenatal visits; any additional high-risk monitoring is out-of-pocket. No maternity supplements funded.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (non-pregnancy related)",
                chronic_script_consistency: 0,
                break_even_point: "Pregnancy confinement costs + 6 visits exceed annual premium contribution."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Earning R14,001 spikes premium to R3,615 (dominated by Rhythm2)."
            }
        }
    },
    {
        slug: "bestmed-rhythm2-network-high-income-arbitrage-2026",
        code: "BMRHYTHM2_ARBITRAGE",
        meta: {
            title: "Rhythm2 High Income Optimizer",
            marketing_heading: "Better Benefits for Less (High Earners)",
            description: "A mathematical anomaly: For earners >R14,000, Rhythm2 (R3,516) is CHEAPER than Rhythm1 (R3,615) but offers superior benefits (dentures, enhanced maternity, higher specialist limits).",
            category: "Network Plan",
            strategic_intent: "Network_Compliance_Arbitrage"
        },
        defaults: {
            income: 18000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 35,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0,
            chronic_needs: "Basic",
            required_benefits: [
                "Unlimited GP Visits",
                "Specialist Benefit"
            ],
            priority_tag: "value"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-rhythm2-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Rhythm1's top band is R3,615. Rhythm2's top band is R3,516. Choosing Rhythm2 saves R99/month AND unlocks better benefits (9 maternity visits vs 6, dentures vs none). This is a pure arbitrage play.",
            primary_risk_warning: "Still restricts users to the Rhythm Network. Non-DSP co-payment is R15,025.",
            utilization_assumptions: {
                gp_visits_frequency: "High (unlimited network visits benefit)",
                chronic_script_consistency: 6,
                break_even_point: "Immediate savings of R1,188/year vs Rhythm1 plus added benefit value."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "None - this is the optimal choice for the high-income bracket."
            }
        }
    },
    {
        slug: "bestmed-rhythm2-network-maternity-enhanced-2026",
        code: "BMRHYTHM2_MATERNITY",
        meta: {
            title: "Rhythm2 Enhanced Maternity",
            marketing_heading: "Full Maternity Support on Network",
            description: "For members wanting more than basic care. Includes 9 antenatal visits (vs 6 on Rhythm1), 1 postnatal visit, and maternity supplements (R145/month). Ideal for 'First 1000 Days' focus.",
            category: "Network Plan",
            strategic_intent: "Enhanced_Maternity_Funding"
        },
        defaults: {
            income: 9500,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 30,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "Maternity Cover",
                "Maternity Supplements"
            ],
            priority_tag: "maternity"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-rhythm2-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Pays R3,516/month (top band) or R3,300 (mid). The 'Enhanced' maternity benefit provides ~R1,305 in supplements and ~R1,500 in extra consultation value compared to Rhythm1.",
            primary_risk_warning: "Must use Rhythm Network providers for all 9 visits to avoid out-of-pocket costs.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (non-pregnancy related)",
                chronic_script_consistency: 0,
                break_even_point: "Total maternity bill (scans, visits, delivery) fully covered by risk."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Income changes can shift premium bands significantly."
            }
        }
    },
    {
        slug: "bestmed-rhythm2-network-senior-dental-2026",
        code: "BMRHYTHM2_SENIOR",
        meta: {
            title: "Rhythm2 Senior with Denture Cover",
            marketing_heading: "Senior Care with Dentures & Optometry",
            description: "Targeting seniors who need primary care + specific prosthesis support. Unlike Rhythm1, Rhythm2 explicitly covers 2 removable acrylic dentures every 24 months and includes an optometry benefit.",
            category: "Network Plan",
            strategic_intent: "Defined_Dental_Funding"
        },
        defaults: {
            income: 8000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 65,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0,
            chronic_needs: "Basic",
            required_benefits: [
                "Dentures",
                "Optometry Benefit",
                "Unlimited GP Visits"
            ],
            priority_tag: "senior"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-rhythm2-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "R3,300/month (Mid Band). The defined benefit for dentures (approx value R3k-R5k) and optometry (frames + lenses) offers tangible return for seniors with low hospital risk but high day-to-day maintenance needs.",
            primary_risk_warning: "Joint replacements are excluded (except PMB). This is a critical risk for seniors.",
            utilization_assumptions: {
                gp_visits_frequency: "High (compliance with nominated GP required)",
                chronic_script_consistency: 12,
                break_even_point: "Value of dentures + spectacles + monthly chronic scripts matches premium."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Need for elective hip/knee replacement results in 100% self-funding."
            }
        }
    },
    {
        slug: "bestmed-rhythm1-network-family-capped-2026",
        code: "BMRHYTHM1_FAMILY",
        meta: {
            title: "Rhythm1 Large Family (Capped)",
            marketing_heading: "Unlimited GP Visits for Large Families",
            description: "Large families (3+ children) on a strict budget. You only pay for the first 3 children; 4th+ are free. Critical for large households needing unlimited primary care access.",
            category: "Network Plan",
            strategic_intent: "Family_Cost_Leverage"
        },
        defaults: {
            income: 8500,
            family_composition: {
                main: 1,
                adult: 1,
                child: 4
            },
            age: 35,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Child Capping Benefit",
                "Unlimited GP Visits"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-rhythm1-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Low Income Band: R1,736 + R1,736 + (3 * R715) = R5,617 total for a family of 6+. The zero marginal cost for the 4th child leverages the capitation model.",
            primary_risk_warning: "Specialist limit is per family (R2,670), which is extremely low for a large family. Almost all care must be managed by the GP.",
            utilization_assumptions: {
                gp_visits_frequency: "Very High (maximizes unlimited benefit)",
                chronic_script_consistency: 0,
                break_even_point: "The cost of GP visits for 4 children exceeds the child dependant premiums."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Specialist referral required for a child after family limit reached = out of pocket."
            }
        }
    },
    {
        slug: "boncap-network-income-band-1-single-starter-2026",
        code: "BONCAP_IB1_SINGLE",
        meta: {
            title: "BonCap Income Band 1 Single Starter",
            marketing_heading: "Affordable Network-First Cover for Low-Income Singles",
            description: "Entry-level hospital and day-to-day cover for individuals earning R0-R11,930 per month who can commit to strict network compliance",
            category: "Budget Network Hospital + Day-to-Day",
            strategic_intent: "Risk_Management_Constraint"
        },
        defaults: {
            income: 9000,
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
            chronic_needs: "PMB Only",
            required_benefits: [
                "Unlimited Network GP",
                "Hospital Cover",
                "28 Chronic Conditions"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-boncap-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "Income verification triggers R1,730 premium for main member in lowest bracket. Unlimited network GP visits with approval from 8th visit creates volume arbitrage for frequent users.",
            primary_risk_warning: "30% co-payment for non-network hospital use. Specialist benefit capped at R4,060 per beneficiary.",
            utilization_assumptions: {
                gp_visits_frequency: "High (unlimited network visits benefit)",
                chronic_script_consistency: 0,
                break_even_point: "7+ GP visits annually"
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Income verification failure triggers higher premium band"
            }
        }
    },
    {
        slug: "boncap-network-income-band-2-family-leverage-2026",
        code: "BONCAP_IB2_FAMILY",
        meta: {
            title: "BonCap Income Band 2 Large Family Leverage",
            marketing_heading: "Three-Child Cap Maximization for Growing Families",
            description: "Optimized for families with 3+ children earning R11,931-R19,350, exploiting child capping rules",
            category: "Family Cost Leverage",
            strategic_intent: "Family_Cost_Leverage"
        },
        defaults: {
            income: 15000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 4
            },
            age: 35,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "PMB Only",
            required_benefits: [
                "Child Capping",
                "Unlimited Network GP",
                "Hospital Cover"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-boncap-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "You only pay for a maximum of three children. 4th+ child contributes zero marginal cost. Premium = R2,111 (main) + R2,111 (adult) + R971*3 (children) = R7,135 for 6-person family.",
            primary_risk_warning: "Income band cliff at R19,350 triggers 61% premium increase",
            utilization_assumptions: {
                gp_visits_frequency: "High (due to child sickness)",
                chronic_script_consistency: 0,
                break_even_point: "4 or more children create negative marginal cost"
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Income verification at R19,351 jumps premium to R11,468"
            }
        }
    },
    {
        slug: "boncap-network-income-band-3-maternity-planning-2026",
        code: "BONCAP_IB3_MAT",
        meta: {
            title: "BonCap Income Band 3 Maternity Risk Transfer",
            marketing_heading: "Pregnancy Planning with Specialist Access",
            description: "For couples earning R19,351-R25,170 planning pregnancy, leveraging specialist consultation limits and maternity programme",
            category: "Maternity Risk Transfer",
            strategic_intent: "Maternity_Risk_Transfer"
        },
        defaults: {
            income: 22000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 29,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "Maternity Programme",
                "12 Antenatal Consultations",
                "Specialist Consultations"
            ],
            priority_tag: "maternity"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-boncap-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "Antenatal consultations covered under GP and specialist benefits (max 5 visits/R6,030 per family). Maternity programme adds baby bag, lactation support, 24/7 advice. R3,404*2 = R6,808 monthly premium.",
            primary_risk_warning: "Specialist visits capped at 5 per family per year. Must use network for scans.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (non-pregnancy related)",
                chronic_script_consistency: 0,
                break_even_point: "Natural birth + antenatal care vs premium paid"
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Income at R25,171 increases premium by 23%"
            }
        }
    },
    {
        slug: "boncap-network-income-band-4-chronic-management-2026",
        code: "BONCAP_IB4_CHRONIC",
        meta: {
            title: "BonCap Income Band 4 Chronic Risk Management",
            marketing_heading: "Full-Price Chronic Condition Management",
            description: "For individuals earning R25,171+ with chronic conditions requiring consistent medication and GP follow-ups",
            category: "Chronic Disease Management",
            strategic_intent: "Risk_Management_Constraint"
        },
        defaults: {
            income: 28000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 45,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network for Chronic",
            min_savings_allocation: 0,
            chronic_needs: "CDL + Depression",
            required_benefits: [
                "28 Chronic Conditions",
                "Nominated GP",
                "Marara Pharmacy DSP"
            ],
            priority_tag: "chronic"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-boncap-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "28 chronic conditions covered (27 PMB + Depression at R165/month). Must nominate network GP for chronic management. Unlimited network GP visits critical for chronic script refills.",
            primary_risk_warning: "30% co-payment if not using Marara Pharmacy or BonCap formulary",
            utilization_assumptions: {
                gp_visits_frequency: "High (multiple chronic scripts)",
                chronic_script_consistency: 12,
                break_even_point: "2+ chronic conditions with monthly scripts"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-network pharmacy triggers 30% co-pay on all chronic medication"
            }
        }
    },
    {
        slug: "boncore-network-strict-single-disaster-2026",
        code: "BONCORE_DISASTER_SINGLE",
        meta: {
            title: "BonCore Disaster Cover Single",
            marketing_heading: "Hospital-Only Safety Net for the Uninsured",
            description: "Absolute minimum hospital risk transfer for individuals who self-fund day-to-day and need emergency protection only",
            category: "Catastrophic Hospital Only",
            strategic_intent: "Disaster_Cover_Only"
        },
        defaults: {
            income: 8000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 24,
            location_zone: "Specific Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 0,
            chronic_needs: "PMB Only",
            required_benefits: [
                "Hospital Cover",
                "PMB Emergency",
                "Network GP Requirement"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-boncore-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R1,275 flat rate per beneficiary (main/adult/child identical). R14,680 co-payment for non-network hospital creates extreme network lock-in. 3 GP visits per beneficiary + unlimited virtual GP.",
            primary_risk_warning: "R5,500 co-payment per network hospital admission. No day-to-day benefits except 3 GP visits and R1,000 Benefit Booster (requires wellness screening).",
            utilization_assumptions: {
                gp_visits_frequency: "Low (relies on 3 GP visits + unlimited virtual GP)",
                chronic_script_consistency: 0,
                break_even_point: "Zero utilization acceptable; premium is pure catastrophic insurance"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-network hospital admission triggers R14,680 co-payment"
            }
        }
    },
    {
        slug: "boncore-network-family-disaster-child-cap-2026",
        code: "BONCORE_FAM_DISASTER",
        meta: {
            title: "BonCore Large Family Disaster Leverage",
            marketing_heading: "Three-Child Cap Hospital Safety Net",
            description: "Catastrophic hospital cover for large families with 4+ children, exploiting flat-rate pricing and child capping",
            category: "Family Disaster Leverage",
            strategic_intent: "Family_Disaster_Leverage"
        },
        defaults: {
            income: 12000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 5
            },
            age: 38,
            location_zone: "Specific Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 0,
            chronic_needs: "PMB Only",
            required_benefits: [
                "Child Capping",
                "Hospital Cover",
                "Maternity Programme"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-boncore-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "You only pay for maximum of three children. 7-person family pays R1,275*5 = R6,375/month. Maternity natural birth covered with no co-payment for motor vehicle accidents or PMB emergency.",
            primary_risk_warning: "R5,500 co-payment per admission for all non-emergency hospital events",
            utilization_assumptions: {
                gp_visits_frequency: "Low (relies on 3 GP visits per beneficiary)",
                chronic_script_consistency: 0,
                break_even_point: "5+ children create extreme value vs per-child pricing"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Elective surgery requires R5,500 co-payment per event"
            }
        }
    },
    {
        slug: "bonessential-network-hospital-pmb-single-2026",
        code: "BONESSENTIAL_SINGLE_PMB",
        meta: {
            title: "BonEssential Single PMB Hospital Focus",
            marketing_heading: "Hospital Protection with Benefit Booster Day-to-Day",
            description: "For singles needing hospital cover who can unlock R1,160 day-to-day via wellness screening",
            category: "Hospital + PMB Day-to-Day",
            strategic_intent: "Hospital_Risk_Transfer"
        },
        defaults: {
            income: 15000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 30,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0,
            chronic_needs: "CDL + Depression",
            required_benefits: [
                "Hospital Cover",
                "Benefit Booster R1,160",
                "28 Chronic Conditions"
            ],
            priority_tag: "balanced"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-bonessential-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R2,747/month premium. Benefit Booster of R1,160 per family unlocked via mental health assessment + wellness screening. Pays for GP visits, OTC medicine, X-rays, blood tests before depleting.",
            primary_risk_warning: "30% co-payment for non-network hospital. Day-to-day limited to Benefit Booster + 2 emergency room visits.",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate (relies on Benefit Booster)",
                chronic_script_consistency: 0,
                break_even_point: "Wellness screening completion unlocks R1,160 value"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Procedure co-payments: R2,020, R5,130, or R9,500 depending on surgery type"
            }
        }
    },
    {
        slug: "bonessential-select-network-budget-family-2026",
        code: "BONESSENTIAL_SEL_FAM",
        meta: {
            title: "BonEssential Select Family Budget Hospital",
            marketing_heading: "Most Affordable Network Hospital for Families",
            description: "Stripped-down hospital cover for families prioritizing absolute minimum premium with child capping",
            category: "Extreme Cost Constraint",
            strategic_intent: "Extreme_Cost_Constraint"
        },
        defaults: {
            income: 18000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 3
            },
            age: 34,
            location_zone: "Select Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "CDL + Depression",
            required_benefits: [
                "Child Capping",
                "Hospital Cover",
                "Benefit Booster"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-bonessential-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R2,345 (main) + R1,718 (adult) + R774*3 (children) = R6,385/month for 5-person family. Only pay for max 3 children. R1,160 Benefit Booster via wellness screening.",
            primary_risk_warning: "R7,100 co-payment for non-network day hospital. Higher procedure co-payments than BonEssential.",
            utilization_assumptions: {
                gp_visits_frequency: "Very Low (rely on public sector/cash)",
                chronic_script_consistency: 0,
                break_even_point: "Premium arbitrage vs BonEssential: R402/month savings (main member)"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Day surgery at non-network hospital triggers R7,100 vs R6,500 on BonEssential"
            }
        }
    },
    {
        slug: "boncomplete-network-savings-single-msa-2026",
        code: "BONCOMPLETE_SINGLE_MSA",
        meta: {
            title: "BonComplete Single MSA Maximization",
            marketing_heading: "Savings Account Rollover Strategy for Young Professionals",
            description: "For healthy singles optimizing savings allocation with above-threshold benefit and rollover potential",
            category: "MSA Maximization + Hospital",
            strategic_intent: "MSA_Maximisation_Roll_Over"
        },
        defaults: {
            income: 25000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 27,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 11880,
            chronic_needs: "5 Non-CDL Conditions",
            required_benefits: [
                "Savings Account",
                "Above Threshold Benefit",
                "32 Chronic Conditions"
            ],
            priority_tag: "savings"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-boncomplete-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R6,614/month premium. Savings = R11,880. Self-payment gap = R2,350. Threshold level = R14,230. Above threshold benefit = R6,250. Low utilizers can bank savings for rollover.",
            primary_risk_warning: "Self-payment gap must be exhausted before accessing above threshold benefit. No Benefit Booster eligibility.",
            utilization_assumptions: {
                gp_visits_frequency: "Low (self-funded)",
                chronic_script_consistency: 0,
                break_even_point: "Savings rollover creates multi-year liquidity buffer"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Reaching self-payment gap threshold triggers above-threshold access"
            }
        }
    },
    {
        slug: "boncomplete-network-savings-family-chronic-2026",
        code: "BONCOMPLETE_FAM_CHRONIC",
        meta: {
            title: "BonComplete Family Chronic + Savings Hybrid",
            marketing_heading: "32 Chronic Conditions with MSA for Family Management",
            description: "For families with 1-2 chronic members needing non-CDL conditions (e.g., ADD in children, eczema, allergic rhinitis)",
            category: "Savings + Chronic Hybrid",
            strategic_intent: "Savings_and_Risk_Hybrid"
        },
        defaults: {
            income: 35000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 40,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network for Chronic",
            min_savings_allocation: 9516,
            chronic_needs: "32 Conditions",
            required_benefits: [
                "ADD in Children",
                "Allergic Rhinitis",
                "Eczema in Children",
                "Savings Account"
            ],
            priority_tag: "chronic"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-boncomplete-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "Adult dependant savings = R9,516. 32 chronic conditions vs 28 on lower plans. ADD (ages 5-18), allergic rhinitis, eczema (children <21), acne (children <21) covered. Child capping applies.",
            primary_risk_warning: "30% co-payment for non-network pharmacy or non-formulary chronic meds",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (4-8 visits/year)",
                chronic_script_consistency: 6,
                break_even_point: "Non-CDL chronic conditions require premium plan vs BonClassic or lower"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Self-payment gap exhaustion triggers above-threshold unlimited benefit"
            }
        }
    },
    {
        slug: "bonclassic-network-savings-family-moderate-chronic-2026",
        code: "BONCLASSIC_FAM_MOD_CHR",
        meta: {
            title: "BonClassic Family 46 Chronic Conditions + Savings",
            marketing_heading: "Mid-Tier Chronic Management with Dental and Savings",
            description: "For families requiring 46 chronic conditions (including mental health, osteoporosis, GORD) with comprehensive dental",
            category: "Chronic + Dental + Savings",
            strategic_intent: "Multi_Chronic_Management"
        },
        defaults: {
            income: 45000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 48,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 12732,
            chronic_needs: "46 Conditions",
            required_benefits: [
                "46 Chronic Conditions",
                "Orthodontics",
                "Mental Health R14,400",
                "Hearing Aids"
            ],
            priority_tag: "chronic"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-bonclassic-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "Adult dependant savings = R12,732. Chronic benefit = R15,370 per beneficiary + R31,770 per family. Covers 46 conditions including PTSD, panic disorder, osteoporosis, GORD. After limit, 27 PMB still covered.",
            primary_risk_warning: "30% co-payment for non-network pharmacy or non-formulary. Chronic benefit limit can deplete mid-year.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 12,
                break_even_point: "2+ chronic conditions from expanded list (non-PMB) justify premium"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Chronic benefit limit exhaustion mid-year forces switch to PMB-only formulary"
            }
        }
    },
    {
        slug: "bonclassic-network-savings-senior-joint-replacement-2026",
        code: "BONCLASSIC_SENIOR_JOINT",
        meta: {
            title: "BonClassic Senior Joint Replacement Risk",
            marketing_heading: "Hip/Knee Replacement Cover for Seniors with DSP",
            description: "For members 55+ at risk of joint replacement needing to avoid R38,560 co-payment via DSP",
            category: "Senior Joint Surgery Risk",
            strategic_intent: "High_Cost_Surgical_Risk_Transfer"
        },
        defaults: {
            income: 35000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 62,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 14832,
            chronic_needs: "46 Conditions",
            required_benefits: [
                "Hip/Knee Replacement Programme",
                "No DSP Co-payment",
                "Cochlear Implants"
            ],
            priority_tag: "senior"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-bonclassic-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "Main member savings = R14,832. Hip/knee replacement: avoid R38,560 co-payment by using DSP. Hip/Knee Replacement Programme includes pre-surgery evaluation, multi-disciplinary team. Cochlear implants = R376,600 per family.",
            primary_risk_warning: "R38,560 co-payment if non-DSP used for joint replacement",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 12,
                break_even_point: "Joint replacement avoidance of co-payment saves 4.7 months of premium"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Joint replacement at non-DSP triggers R38,560 co-payment"
            }
        }
    },
    {
        slug: "boncomprehensive-full-choice-savings-senior-comprehensive-2026",
        code: "BONCOMP_SENIOR_FULL",
        meta: {
            title: "BonComprehensive Senior 61 Chronic + Full Hospital Choice",
            marketing_heading: "Unrestricted Hospital Access with Maximum Chronic Coverage",
            description: "For affluent seniors needing any-hospital access, 61 chronic conditions, refractive surgery, and biologic drugs",
            category: "Full Choice Premium Chronic",
            strategic_intent: "Complex_Clinical_Funding"
        },
        defaults: {
            income: 80000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 58,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 22512,
            chronic_needs: "61 Conditions",
            required_benefits: [
                "Any Hospital",
                "61 Chronic Conditions",
                "Biologic Drugs",
                "Refractive Surgery"
            ],
            priority_tag: "premium"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-boncomprehensive-any-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "Main member savings = R22,512 (no threshold/gap). Chronic benefit = R18,760/beneficiary + R37,360/family. 61 conditions including narcolepsy, myasthenia gravis, cystic fibrosis. Non-cancer biologics = R257,300/family. Refractive surgery = R26,520/family.",
            primary_risk_warning: "High premium: R12,509 main + R11,796 adult = R24,305/month. Chronic limit can deplete.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 12,
                break_even_point: "Multiple complex chronic conditions or biologic drug requirement"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Chronic benefit limit exhaustion mid-year"
            }
        }
    },
    {
        slug: "boncomprehensive-full-choice-savings-dental-implant-2026",
        code: "BONCOMP_DENTAL_IMPL",
        meta: {
            title: "BonComprehensive Dental Implant Strategy",
            marketing_heading: "Only Plan with Dental Implants: 2 per 5 Years",
            description: "For members prioritizing dental implants (R3,710 per implant) unavailable on any other plan",
            category: "Specific Defined Dental Funding",
            strategic_intent: "Specific_Defined_Dental_Funding"
        },
        defaults: {
            income: 60000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 52,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 22512,
            chronic_needs: "61 Conditions",
            required_benefits: [
                "Dental Implants",
                "3 Crowns per Family",
                "100% Orthodontics Funding"
            ],
            priority_tag: "dental"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-boncomprehensive-any-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "2 implants per beneficiary every 5 years. Cost of implant components limited to R3,710 per implant. 3 crowns per family per year (vs 1 on BonComplete/BonClassic). Orthodontics funded at 100% of Bonitas Dental Tariff (vs 65% on BonComplete).",
            primary_risk_warning: "Implant benefit is component cost only; does not cover full procedure cost. Must be paid from savings.",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate",
                chronic_script_consistency: 0,
                break_even_point: "1 implant every 5 years creates R3,710 value unavailable on any other plan"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Savings depletion before implant procedure"
            }
        }
    },
    {
        slug: "boncomprehensive-full-choice-cancer-biologic-funding-2026",
        code: "BONCOMP_CANCER_BIO",
        meta: {
            title: "BonComprehensive Maximum Cancer + Biologic Funding",
            marketing_heading: "R448,200 Non-PMB Cancer + R257,300 Non-Cancer Biologics",
            description: "For members with complex cancer or requiring expensive biologic therapies (e.g., Crohn's, RA)",
            category: "Maximum Biological + Cancer Funding",
            strategic_intent: "Maximum_Biological_Funding"
        },
        defaults: {
            income: 70000,
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
            min_savings_allocation: 22512,
            chronic_needs: "61 Conditions",
            required_benefits: [
                "R448,200 Non-PMB Cancer",
                "R257,300 Biologic Drugs",
                "2 PET Scans"
            ],
            priority_tag: "cancer"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-boncomprehensive-any-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "Non-PMB cancer treatment = R448,200/family (paid 80% at DSP, no cover at non-DSP once depleted). Sublimit of R448,200 for specialized drugs including biologics within cancer limit. Non-cancer biologics = R257,300/family. 2 PET scans/family/year (vs 0 on BonComplete/1 on BonClassic).",
            primary_risk_warning: "Non-PMB cancer limit can deplete. 30% co-payment for non-DSP cancer treatment.",
            utilization_assumptions: {
                gp_visits_frequency: "High (cancer follow-up)",
                chronic_script_consistency: 12,
                break_even_point: "Biologic therapy annual cost typically R150,000-R400,000; requires this tier"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-PMB cancer limit exhaustion triggers out-of-pocket exposure"
            }
        }
    },
    {
        slug: "boncomplete-network-family-maternity-young-parent-2026",
        code: "BONCOMPLETE_MAT_YOUNG",
        meta: {
            title: "BonComplete Young Family Maternity Optimization",
            marketing_heading: "6 Antenatal Visits + Benefit Booster for New Parents",
            description: "For young couples planning 1st or 2nd child, exploiting Benefit Booster + maternity programme",
            category: "Enhanced Maternity Funding",
            strategic_intent: "Enhanced_Maternity_Funding"
        },
        defaults: {
            income: 30000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 28,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 9516,
            chronic_needs: "None",
            required_benefits: [
                "Maternity Programme",
                "R2,070 Benefit Booster",
                "6 Antenatal Visits"
            ],
            priority_tag: "maternity"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-boncomplete-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "Adult savings = R9,516. Benefit Booster = R2,070 (unlocked via mental health assessment + wellness screening). 6 antenatal consultations + R1,580 classes + 2 2D scans + lactation specialist. Paid from savings/Benefit Booster.",
            primary_risk_warning: "30% co-payment for non-network hospital. Maternity care depletes savings.",
            utilization_assumptions: {
                gp_visits_frequency: "High (due to infant)",
                chronic_script_consistency: 0,
                break_even_point: "Benefit Booster + maternity programme value = R3,650+"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Savings depletion triggers self-payment gap entry"
            }
        }
    },
    {
        slug: "bonclassic-network-savings-young-adult-contraceptive-2026",
        code: "BONCLASSIC_YOUNG_CONTRA",
        meta: {
            title: "BonClassic Young Adult Contraceptive Strategy",
            marketing_heading: "R2,050 Contraceptive Benefit for Women Under 50",
            description: "For young adult women prioritizing contraceptive coverage with savings and hospital backup",
            category: "Age-Optimized Contraceptive Funding",
            strategic_intent: "Age_Optimized_Exclusion"
        },
        defaults: {
            income: 22000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 24,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 14832,
            chronic_needs: "Low",
            required_benefits: [
                "R2,050 Contraceptives",
                "46 Chronic Conditions",
                "Savings Account"
            ],
            priority_tag: "preventative"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-bonclassic-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R2,050 per family for women aged up to 50. Must use Bonitas Network Pharmacy or Pharmacy Direct DSP. 40% co-payment if non-network/non-DSP. Main member savings = R14,832.",
            primary_risk_warning: "40% co-payment for non-network contraceptives (vs 30% on chronic meds)",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Annual contraceptive cost (e.g., Mirena R2,000) covered in full"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Age 50 triggers loss of contraceptive benefit"
            }
        }
    },
    {
        slug: "boncap-network-young-adult-contraceptive-budget-2026",
        code: "BONCAP_YOUNG_CONTRA",
        meta: {
            title: "BonCap Young Adult Contraceptive Budget Strategy",
            marketing_heading: "R1,330 Contraceptive Benefit at Entry-Level Premium",
            description: "For women under 50 needing contraceptive coverage at lowest premium tier",
            category: "Budget Contraceptive Funding",
            strategic_intent: "Age_Optimized_Exclusion"
        },
        defaults: {
            income: 10000,
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
            chronic_needs: "PMB Only",
            required_benefits: [
                "R1,330 Contraceptives",
                "Unlimited Network GP",
                "Hospital Cover"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-boncap-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R1,330 per family for women aged up to 50. Must use DSP. 40% co-payment if non-DSP. Contraceptives for women aged <26 mentioned in preventative benefits (HPV vaccines 9-26 years).",
            primary_risk_warning: "40% co-payment for non-DSP contraceptives. Income verification required.",
            utilization_assumptions: {
                gp_visits_frequency: "High (unlimited network visits benefit)",
                chronic_script_consistency: 0,
                break_even_point: "Contraceptive benefit + unlimited GP visits = high value for young women"
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Age 50 triggers loss of contraceptive benefit"
            }
        }
    },
    {
        slug: "boncomprehensive-full-choice-orthodox-teen-family-2026",
        code: "BONCOMP_ORTHO_TEEN",
        meta: {
            title: "BonComprehensive Family Orthodontics 100% Funding",
            marketing_heading: "Full Orthodontics Funding for Teens 9-18",
            description: "For families with teenagers needing braces, funded at 100% of Bonitas Dental Tariff (vs 65% on BonComplete)",
            category: "Maximum Orthodontic Funding",
            strategic_intent: "Specialist_Dental_Funding"
        },
        defaults: {
            income: 65000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 42,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 21228,
            chronic_needs: "Comprehensive",
            required_benefits: [
                "100% Orthodontics",
                "Ages 9-18 Fixed Treatment",
                "Orthodontic Needs Analysis"
            ],
            priority_tag: "dental"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-boncomprehensive-any-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "Orthodontics granted once per beneficiary per lifetime. Funding up to 100% of Bonitas Dental Tariff (vs 65% on BonComplete). Needs analysis determines allocation. Ages 9-18 for fixed comprehensive treatment. Only 1 family member may begin treatment per calendar year.",
            primary_risk_warning: "Only granted where function is impaired (not cosmetic). 1 family member limit per year.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Orthodontic treatment cost R30,000-R60,000; 100% vs 65% funding = R10,500-R21,000 difference"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Needs analysis rejection if cosmetic vs functional impairment"
            }
        }
    },
    {
        slug: "bonclassic-network-savings-young-family-childcare-2026",
        code: "BONCLASSIC_CHILDCARE",
        meta: {
            title: "BonClassic Young Family Childcare Benefits",
            marketing_heading: "Private Vaccination Schedule + Hearing Screening for Infants",
            description: "For families with infants prioritizing childcare benefits (immunizations, screenings, Babyline)",
            category: "Preventative Family Care",
            strategic_intent: "Preventative_Maximisation"
        },
        defaults: {
            income: 40000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 32,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 12732,
            chronic_needs: "Low",
            required_benefits: [
                "Private Vaccination Schedule",
                "Babyline 24/7",
                "Hearing Screening"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-bonclassic-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "Immunizations according to Private Vaccination Schedule (vs Expanded Programme on other plans). Hearing screening for newborns up to 8 weeks. Babyline 24/7 for children under 3 years. Milestone reminders. Online screenings for infant/toddler health. 2 vision screening tests for premature newborns.",
            primary_risk_warning: "Private vaccination schedule more comprehensive than public EPI, but child must be under 12.",
            utilization_assumptions: {
                gp_visits_frequency: "High (due to child sickness)",
                chronic_script_consistency: 0,
                break_even_point: "Private vaccination schedule value = R3,000-R5,000 per child"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Child turns 12, loses immunization benefit"
            }
        }
    },
    {
        slug: "boncomprehensive-full-choice-savings-child-specialist-2026",
        code: "BONCOMP_CHILD_SPEC",
        meta: {
            title: "BonComprehensive Child Specialist Consultation Strategy",
            marketing_heading: "3 Paediatrician Visits Under Age 1 + 2 GP Visits Ages 2-12",
            description: "For families with young children needing paediatrician access without network restrictions",
            category: "Enhanced Child Healthcare",
            strategic_intent: "Defined_Benefit_Funding"
        },
        defaults: {
            income: 55000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 35,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 21228,
            chronic_needs: "Comprehensive",
            required_benefits: [
                "3 Paediatrician Visits <1yr",
                "2 Paediatrician Visits 1-2yr",
                "2 GP Visits 2-12yr"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-boncomprehensive-any-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "3 paediatrician or GP consultations per child under 1 year. 2 paediatrician or GP consultations per child ages 1-2. 2 GP consultations per child ages 2-12. Paid from savings. BonComplete offers 2/1/1 (lower allocation).",
            primary_risk_warning: "Paid from savings; can deplete savings allocation quickly with multiple children",
            utilization_assumptions: {
                gp_visits_frequency: "Very High (maximizes unlimited benefit)",
                chronic_script_consistency: 0,
                break_even_point: "2 children under age 2 = 5 paediatrician visits = R3,000-R5,000 value"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Savings depletion before year-end"
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
        slug: "bonsave-network-family-dental-orthodontics-2026",
        code: "BONSAVE_FAM_DENTAL",
        meta: {
            title: "BonSave Family Orthodontic Maximization",
            marketing_heading: "Child Dental and Orthodontics with Savings",
            description: "For families with children needing orthodontic treatment, exploiting full coverage and child capping rules",
            category: "Family Savings + Orthodontics",
            strategic_intent: "Specific_Defined_Dental_Funding"
        },
        defaults: {
            income: 40000,
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
            min_savings_allocation: 9180,
            chronic_needs: "None",
            required_benefits: [
                "Orthodontics 100%",
                "Child Capping",
                "R5,000 Benefit Booster"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-bonsave-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "Adult dependant savings = R9,180, Child savings = R3,636. Orthodontics funded at 100% of Bonitas Dental Tariff where function is impaired. Only 1 family member may begin orthodontic treatment per year. Fixed comprehensive treatment ages 9-18.",
            primary_risk_warning: "Orthodontic needs analysis required. Benefit granted for impaired function, not cosmetic.",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Orthodontic treatment value vs premium differential"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Orthodontic needs analysis failure eliminates benefit"
            }
        }
    },
    {
        slug: "bonfit-network-budget-family-child-cap-2026",
        code: "BONFIT_FAM_BUDGET",
        meta: {
            title: "BonFit Large Family Budget Leverage",
            marketing_heading: "Affordable Network Cover with Three-Child Cap",
            description: "Entry-level network hospital and savings for large families exploiting child capping at R908 per child",
            category: "Budget Family Leverage",
            strategic_intent: "Family_Cost_Leverage"
        },
        defaults: {
            income: 18000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 4
            },
            age: 35,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 4848,
            chronic_needs: "CDL + Depression",
            required_benefits: [
                "Child Capping",
                "28 Chronic Conditions",
                "Benefit Booster R1,440"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-bonfit-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R2,698 (main) + R2,021 (adult) + R908*3 (children) = R7,443/month for 6-person family. 4th+ child contributes zero marginal cost. Main member savings = R4,848.",
            primary_risk_warning: "30% co-payment for non-network hospital. R6,500 co-payment for non-network day surgery.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (relies on savings)",
                chronic_script_consistency: 0,
                break_even_point: "4+ children create negative marginal cost"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-network day surgery triggers R6,500 co-payment"
            }
        }
    },
    {
        slug: "bonprime-network-savings-maternity-planning-2026",
        code: "BONPRIME_MAT_PLAN",
        meta: {
            title: "BonPrime Maternity Risk Transfer with Savings",
            marketing_heading: "Pregnancy Planning with Savings and Network Hospital",
            description: "For couples planning pregnancy, leveraging 6 antenatal consultations, 2 ultrasounds, and maternity programme",
            category: "Maternity Risk Transfer + Savings",
            strategic_intent: "Maternity_Risk_Transfer"
        },
        defaults: {
            income: 24000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 29,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 6252,
            chronic_needs: "None",
            required_benefits: [
                "Maternity Programme",
                "6 Antenatal Consultations",
                "2 Ultrasounds",
                "Benefit Booster R4,000"
            ],
            priority_tag: "maternity"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-bonprime-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R3,255 (main) + R2,546 (adult) = R5,801/month. Main member savings = R6,252. Maternity: 6 antenatal consultations, R1,100 antenatal classes, 2 2D ultrasounds, 1 amniocentesis, 4 midwife consultations post-delivery.",
            primary_risk_warning: "30% co-payment for non-network hospital. PMB only for dental general anaesthetic.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (non-pregnancy related)",
                chronic_script_consistency: 0,
                break_even_point: "Natural birth + antenatal care vs premium paid"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-network hospital childbirth triggers 30% co-payment"
            }
        }
    },
    {
        slug: "bonprime-network-savings-chronic-management-2026",
        code: "BONPRIME_CHRONIC_MGT",
        meta: {
            title: "BonPrime Chronic Disease Management with Savings",
            marketing_heading: "28 Chronic Conditions with DSP Savings Hybrid",
            description: "For individuals with chronic conditions requiring consistent medication via Marara Pharmacy DSP",
            category: "Chronic Management + Savings",
            strategic_intent: "Risk_Management_Constraint"
        },
        defaults: {
            income: 26000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 42,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network for Chronic",
            min_savings_allocation: 6252,
            chronic_needs: "CDL + Depression",
            required_benefits: [
                "28 Chronic Conditions",
                "Marara Pharmacy DSP",
                "Benefit Booster R4,000"
            ],
            priority_tag: "chronic"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-bonprime-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R3,255/month premium. 28 chronic conditions (27 PMB + Depression R165/month). Must use Marara Pharmacy DSP. Savings = R6,252 for day-to-day expenses.",
            primary_risk_warning: "30% co-payment if not using Marara Pharmacy or non-formulary chronic medication",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 12,
                break_even_point: "1+ chronic condition with monthly scripts"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-DSP pharmacy triggers 30% co-pay on all chronic medication"
            }
        }
    },
    {
        slug: "primary-network-day-to-day-family-moderate-2026",
        code: "PRIMARY_FAM_DTD",
        meta: {
            title: "Primary Family Day-to-Day Moderate Coverage",
            marketing_heading: "Traditional Day-to-Day with Network Hospital Safety",
            description: "For families needing moderate day-to-day limits with sublimits for GP, specialist, acute medicine, and auxiliary services",
            category: "Traditional Day-to-Day + Hospital",
            strategic_intent: "Day_to_Day_Certainty"
        },
        defaults: {
            income: 32000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 37,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "CDL + Depression",
            required_benefits: [
                "Day-to-Day R11,080",
                "Benefit Booster R4,000",
                "28 Chronic Conditions"
            ],
            priority_tag: "balanced"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-primary-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R3,588 (main) + R2,807 (adult) + R1,141*2 (children) = R8,677/month. Overall day-to-day limit = R11,080 with sublimits: GP/Specialist R5,240, Acute Medicine R3,500, X-rays/Blood R3,500, Auxiliary R3,500.",
            primary_risk_warning: "30% co-payment for non-network hospital. R6,500 co-payment for non-network day surgery.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Moderate day-to-day utilization vs savings plans"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Day-to-day sublimit exhaustion triggers 1 additional network GP + specialist consultation"
            }
        }
    },
    {
        slug: "standard-full-choice-day-to-day-family-chronic-45-2026",
        code: "STANDARD_FAM_45CHR",
        meta: {
            title: "Standard Family 45 Chronic Conditions + Full Hospital Choice",
            marketing_heading: "Any Hospital Access with Expanded Chronic Coverage",
            description: "For families requiring 45 chronic conditions (including mental health, GORD, anxiety) with full hospital choice",
            category: "Traditional + Expanded Chronic + Any Hospital",
            strategic_intent: "Multi_Chronic_Management"
        },
        defaults: {
            income: 50000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 46,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0,
            chronic_needs: "45 Conditions",
            required_benefits: [
                "45 Chronic Conditions",
                "Any Hospital",
                "Benefit Booster R5,000",
                "Hearing Aids R9,460"
            ],
            priority_tag: "chronic"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-standard-any-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R5,929 (main) + R5,139 (adult) + R1,740*2 (children) = R14,548/month. Overall day-to-day limit = R23,310. Chronic benefit = R13,030/beneficiary + R26,150/family. 45 conditions including ADD, GORD, depression, anxiety, PTSD, OCD, panic disorder.",
            primary_risk_warning: "Chronic benefit limit can deplete mid-year. After depletion, 27 PMB still covered via DSP or network pharmacy with 30% co-pay for non-compliance.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 12,
                break_even_point: "2+ chronic conditions from expanded list justify premium"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Chronic benefit exhaustion forces switch to PMB-only formulary"
            }
        }
    },
    {
        slug: "standard-select-network-day-to-day-family-chronic-45-nominated-gp-2026",
        code: "STDSEL_FAM_45CHR_GP",
        meta: {
            title: "Standard Select Family 45 Chronic + Nominated GP Compliance",
            marketing_heading: "Network Hospital with GP Nomination Requirement",
            description: "Lower premium vs Standard by using network hospital and nominating 2 GPs per beneficiary",
            category: "Network Compliance Chronic Management",
            strategic_intent: "Network_Compliance_Arbitrage"
        },
        defaults: {
            income: 45000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 44,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "45 Conditions",
            required_benefits: [
                "45 Chronic Conditions",
                "Nominated GP Compliance",
                "Benefit Booster R5,000"
            ],
            priority_tag: "chronic"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-standard-any-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R5,431 (main) + R4,700 (adult) + R1,590*2 (children) = R13,311/month. Overall day-to-day limit = R23,310. Must nominate 2 GPs per beneficiary. 2 non-nominated network GP visits allowed per family per year. Non-network GPs limited to PMBs only.",
            primary_risk_warning: "30% co-payment for non-network hospital. Strict GP nomination requirement limits flexibility.",
            utilization_assumptions: {
                gp_visits_frequency: "High (compliance with nominated GP required)",
                chronic_script_consistency: 12,
                break_even_point: "Premium savings vs Standard: R1,237/month for 4-person family"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-nominated GP triggers PMB-only coverage or out-of-pocket payment"
            }
        }
    },
    {
        slug: "standard-full-choice-senior-hip-knee-replacement-2026",
        code: "STANDARD_SENIOR_JOINT",
        meta: {
            title: "Standard Senior Joint Replacement Risk Management",
            marketing_heading: "Hip/Knee Replacement Programme with Any Hospital Access",
            description: "For members 55+ at risk of joint replacement needing to avoid R38,560 co-payment via DSP",
            category: "Senior Joint Surgery Risk",
            strategic_intent: "High_Cost_Surgical_Risk_Transfer"
        },
        defaults: {
            income: 55000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 61,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0,
            chronic_needs: "45 Conditions",
            required_benefits: [
                "Hip/Knee Replacement Programme",
                "No DSP Co-payment",
                "Any Hospital",
                "Hearing Aids"
            ],
            priority_tag: "senior"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-standard-any-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R5,929 (main) + R5,139 (adult) = R11,068/month. Hip/Knee Replacement Programme uses multi-disciplinary team with pre-surgery evaluation. Avoid R38,560 co-payment by using DSP. Internal/external prostheses = R57,630/family.",
            primary_risk_warning: "R38,560 co-payment if non-DSP used for joint replacement",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 12,
                break_even_point: "Joint replacement DSP compliance saves 3.5 months of premium"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Joint replacement at non-DSP triggers R38,560 co-payment"
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
        slug: "bonstart-network-edge-single-co-payment-disaster-2026",
        code: "BONSTART_SINGLE_EDGE",
        meta: {
            title: "BonStart Single Edge Co-Payment Disaster Cover",
            marketing_heading: "Lowest Premium Hospital Cover with R130 GP Co-Payment",
            description: "Ultra-budget hospital cover with unlimited network GP (R130 co-pay), R1,850 family acute medicine limit",
            category: "Extreme Budget Edge Cover",
            strategic_intent: "Extreme_Cost_Constraint"
        },
        defaults: {
            income: 12000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 24,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "CDL + Depression",
            required_benefits: [
                "Unlimited Virtual GP",
                "Unlimited Network GP R130 Co-pay",
                "28 Chronic Conditions"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "bonitas-bonstart-plus-network-2026",
            brand_lock: "Bonitas",
            mathematical_basis: "R1,603/month flat rate (main/adult/child identical). Unlimited network GP with R130 co-payment per visit. Authorization required after 6th visit. Unlimited network virtual GP and nurse consultations. GP-referred acute medicine, X-rays, blood tests limited to R1,850/family.",
            primary_risk_warning: "R12,680 co-payment for non-network hospital. R1,850 admission co-payment per network hospital admission. No cover for joint replacement, back/neck surgery, varicose veins, gastroscopies, colonoscopies.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (must not exceed R2,330 limit)",
                chronic_script_consistency: 0,
                break_even_point: "Zero utilization acceptable; premium is pure catastrophic insurance"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-network hospital triggers R12,680 co-payment"
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
        slug: "discovery-smart-saver-classic-msa-hybrid-2026",
        code: "DH_SMART_SAVER_CLASSIC",
        meta: {
            title: "Classic Smart Saver MSA Hybrid",
            marketing_heading: "Hybrid MSA plus Rich Smart Day‑to‑Day Benefits",
            description: "For members who want a Medical Savings Account, unlimited Smart GP visits with low co‑payments, and strong risk‑funded day‑to‑day benefits within the Smart networks.",
            category: "Smart MSA Hybrid",
            strategic_intent: "MSA_plus_Smart_Risk_Day2Day"
        },
        defaults: {
            income: 32000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 35,
            location_zone: "Smart_Network_Area"
        },
        search_profile: {
            network_tolerance: "Smart Hospital and GP Network Only",
            min_savings_allocation: 2500,
            chronic_needs: "CDL only",
            required_benefits: [
                "Medical Savings Account for specialists, non‑chronic meds and tests",
                "Unlimited Smart GP visits with low fixed co‑payment",
                "Defined OTC and acute medicine benefits at network pharmacies",
                "Personal Health Fund base up to about R10,000 with boost potential"
            ],
            priority_tag: "smart_msa_rich_day2day"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-smart-saver-network-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Classic Smart Saver combines a modest MSA, unlimited Smart‑network GP consultations with a small co‑payment, defined OTC and acute medicine limits and a relatively high Personal Health Fund ceiling, within the Smart Hospital Network.",
            primary_risk_warning: "Planned admissions at non‑Smart hospitals trigger a sizeable upfront payment; intensive non‑Smart specialist or dental use can exhaust MSA and PHF quickly.",
            utilization_assumptions: {
                gp_visits_frequency: "High (Smart GP network)",
                chronic_script_consistency: 12,
                break_even_point: "Member regularly uses Smart GP, network pharmacies and risk‑funded benefits while keeping out‑of‑network and high‑cost admissions rare."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Elective admission at a non‑Smart hospital or high out‑of‑network specialist use can wipe out the premium advantage."
            }
        }
    },
    {
        slug: "discovery-smart-saver-essential-budget-msa-2026",
        code: "DH_SMART_SAVER_ESSENTIAL",
        meta: {
            title: "Essential Smart Saver Budget MSA",
            marketing_heading: "Cheaper Smart Saver with Higher Co‑Pays and Extra Exclusions",
            description: "For cost‑sensitive members who still want MSA and Smart GP access but accept higher co‑payments, lower day‑to‑day limits and more in‑hospital exclusions.",
            category: "Budget Smart MSA",
            strategic_intent: "Low_Premium_Smart_MSA"
        },
        defaults: {
            income: 26000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 1
            },
            age: 33,
            location_zone: "Smart_Network_Area"
        },
        search_profile: {
            network_tolerance: "Smart Hospital and GP Network Only",
            min_savings_allocation: 2000,
            chronic_needs: "CDL only",
            required_benefits: [
                "Medical Savings Account with smaller annual allocation",
                "Unlimited Smart GP visits with higher co‑payment than Classic",
                "Lower OTC and contraceptive limits than Classic Smart Saver",
                "Personal Health Fund base around R6,000 with boost potential"
            ],
            priority_tag: "budget_smart_msa"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-smart-saver-network-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Essential Smart Saver mirrors Classic Smart Saver’s structure but with higher GP and dental co‑payments, smaller OTC and contraceptive limits, a lower Personal Health Fund ceiling and additional exclusions for high‑cost procedures.",
            primary_risk_warning: "Exclusions for many elective orthopaedic, spinal and ENT procedures leave members exposed to large self‑funded hospital bills if these events occur.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 6,
                break_even_point: "Member mainly uses Smart GP and limited day‑to‑day benefits and rarely needs excluded surgical procedures."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Need for excluded surgeries or extensive dental/prosthetic work undermines the low‑premium advantage."
            }
        }
    },
    {
        slug: "discovery-smart-classic-risk-funded-2026",
        code: "DH_SMART_CLASSIC",
        meta: {
            title: "Classic Smart Rich Risk‑Funded Day‑to‑Day",
            marketing_heading: "No MSA, Unlimited Smart GP and Sports Injury Cover",
            description: "For active members who do not want an MSA but value unlimited Smart GP access, sports injury benefits and higher Personal Health Fund within a Smart hospital network.",
            category: "Smart Risk Day‑to‑Day",
            strategic_intent: "High_Usage_Primary_Care_Sports"
        },
        defaults: {
            income: 30000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 34,
            location_zone: "Smart_Network_Area"
        },
        search_profile: {
            network_tolerance: "Smart Hospital and GP Network Only",
            min_savings_allocation: 0,
            chronic_needs: "CDL only",
            required_benefits: [
                "Unlimited Smart GP visits with low co‑payment",
                "Sports injury basket with X‑rays, specialists and allied therapy",
                "Risk‑funded eye and dental check‑ups with small co‑pays",
                "Personal Health Fund base around R8,000 with boost potential"
            ],
            priority_tag: "smart_sports_primary_care"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-smart-network-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Classic Smart removes the MSA, instead funding day‑to‑day via defined Smart benefits and a larger Personal Health Fund, complemented by a sports injury benefit and 200% specialist cover in Smart hospitals.",
            primary_risk_warning: "No MSA or Above Threshold Benefit; once defined Smart benefits and Personal Health Fund are used, further out‑of‑hospital spend is fully self‑funded.",
            utilization_assumptions: {
                gp_visits_frequency: "High",
                chronic_script_consistency: 12,
                break_even_point: "Frequent Smart GP use and occasional sports‑related care within the defined limits; minimal non‑network admissions."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "High specialist or allied utilisation outside the sports benefit rapidly drains the Personal Health Fund."
            }
        }
    },
    {
        slug: "discovery-smart-essential-budget-risk-2026",
        code: "DH_SMART_ESSENTIAL",
        meta: {
            title: "Essential Smart Budget Risk‑Funded",
            marketing_heading: "Cheapest Fixed‑Benefit Smart with Core Day‑to‑Day Cover",
            description: "For budget members who want Smart network primary care and basic day‑to‑day benefits plus a modest Personal Health Fund, with 100% in‑hospital tariffs and fewer high‑cost extras.",
            category: "Budget Smart Risk",
            strategic_intent: "Low_Premium_Smart_Primary_Care"
        },
        defaults: {
            income: 24000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 1
            },
            age: 31,
            location_zone: "Smart_Network_Area"
        },
        search_profile: {
            network_tolerance: "Smart Hospital and GP Network Only",
            min_savings_allocation: 0,
            chronic_needs: "CDL only",
            required_benefits: [
                "Unlimited Smart GP with higher co‑payment",
                "Risk‑funded eye and dental check‑ups with higher co‑pays",
                "Limited OTC medicine and small Personal Health Fund",
                "No MSA, 100% tariff for non‑arranged specialists in‑hospital"
            ],
            priority_tag: "budget_smart_risk"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-smart-network-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Essential Smart offers unlimited Smart GP access with higher co‑pays than Classic, smaller OTC limits, no sports injury benefit and a lower Personal Health Fund cap, while using the Smart Hospital Network at 100% tariffs for non‑contracted specialists.",
            primary_risk_warning: "Many dental, joint, spinal and ENT procedures are excluded from in‑hospital cover, creating exposure for members who later need these surgeries.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 6,
                break_even_point: "Member primarily needs Smart GP and basic day‑to‑day care and can tolerate the exclusions of high‑cost procedures."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Unexpected need for excluded in‑hospital procedures can cause large out‑of‑pocket expenses."
            }
        }
    },
    {
        slug: "discovery-smart-essential-dynamic-efficiency-2026",
        code: "DH_SMART_DYNAMIC",
        meta: {
            title: "Essential Dynamic Smart Efficiency Network",
            marketing_heading: "Lower Premiums via Dynamic Smart Hospital Routing",
            description: "For members comfortable with Ask Discovery hospital routing into the Dynamic Smart network, trading flexibility for significantly lower premiums and leaner day‑to‑day benefits.",
            category: "Efficiency Discount Smart",
            strategic_intent: "Dynamic_Network_Optimisation"
        },
        defaults: {
            income: 22000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 32,
            location_zone: "Dynamic_Smart_Area"
        },
        search_profile: {
            network_tolerance: "Dynamic Smart Hospital and GP Network Only",
            min_savings_allocation: 0,
            chronic_needs: "CDL only",
            required_benefits: [
                "Unlimited Smart GP with co‑payment",
                "Basic OTC and check‑up benefits",
                "Dynamic Smart Hospital Network via Ask Discovery",
                "Personal Health Fund base around R4,000 with boost potential"
            ],
            priority_tag: "efficiency_smart"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-smart-network-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Essential Dynamic Smart discounts contributions by requiring members to use Ask Discovery to route them to Dynamic Smart hospitals, while keeping day‑to‑day benefits similar to Essential Smart but with stricter scope and day‑surgery co‑payments.",
            primary_risk_warning: "Planned admissions at non‑Dynamic Smart hospitals incur large upfront payments; hospital exclusions mirror other Essential‑tier Smart plans.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 6,
                break_even_point: "Member lives near Dynamic Smart hospitals and consistently accepts Ask Discovery routing for planned care."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Refusing Dynamic Smart routing or needing excluded surgeries undermines the value of the efficiency discount."
            }
        }
    },
    {
        slug: "discovery-smart-active-ultra-budget-2026",
        code: "DH_SMART_ACTIVE",
        meta: {
            title: "Active Smart Ultra‑Budget Plan",
            marketing_heading: "Lowest Smart Premium with PMB‑Focused Hospital Cover",
            description: "For young, generally healthy members seeking the lowest Smart premium, accepting PMB‑focused hospital cover, neonatal limits, elective admission co‑pays and many procedure exclusions.",
            category: "Ultra Budget Smart",
            strategic_intent: "Minimum_Cost_PMB_Focus"
        },
        defaults: {
            income: 18000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 27,
            location_zone: "Dynamic_Smart_Area"
        },
        search_profile: {
            network_tolerance: "Dynamic Smart Hospital and GP Network Only",
            min_savings_allocation: 0,
            chronic_needs: "CDL only, low intensity",
            required_benefits: [
                "Unlimited Smart GP with co‑payment",
                "Basic OTC, eye and dental check‑ups only",
                "Neonatal cover capped at a fixed rand amount",
                "Cancer and many surgeries largely limited to Prescribed Minimum Benefits"
            ],
            priority_tag: "ultra_budget_smart"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-smart-network-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Active Smart minimises premiums by capping neonatal hospital cover, limiting oncology to PMB treatment at network providers, adding sizable co‑payments on all elective non‑PMB admissions and excluding many discretionary procedures.",
            primary_risk_warning: "Serious non‑PMB conditions, complex maternity, neonatal ICU beyond the cap or excluded surgeries can create very high out‑of‑pocket costs.",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Member has low expected hospital and specialist utilisation and primarily needs Smart GP access and basic screening."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Early‑life neonatal complications, advanced cancer or excluded orthopaedic procedures will severely strain finances."
            }
        }
    },
    {
        slug: "discovery-saver-classic-msa-high-day2day-2026",
        code: "DH_SAVER_CLASSIC_MSA",
        meta: {
            title: "Classic Saver MSA High Day‑to‑Day",
            marketing_heading: "Large Medical Savings Account at 20% with DEB and Personal Health Fund",
            description: "For members who want a sizeable Medical Savings Account (20% of contributions), Day‑to‑day Extender Benefit, Personal Health Fund up to R10,000 and 200% hospital specialists, with no Above Threshold Benefit.",
            category: "Savings MSA Optimised",
            strategic_intent: "MSA_and_PHF_Day2Day_Maximisation"
        },
        defaults: {
            income: 38000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 39,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 10000,
            chronic_needs: "CDL only",
            required_benefits: [
                "Medical Savings Account at 20% of contributions",
                "Day‑to‑day Extender Benefit",
                "Personal Health Fund up to R10,000 (boosted to R20,000)",
                "200% hospital specialists"
            ],
            priority_tag: "msa_phf"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-saver-any-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Classic Saver allocates 20% of contributions to MSA plus a Personal Health Fund that can reach R10,000 base and R20,000 with challenge completion, with a Day‑to‑day Extender Benefit providing network GP and pharmacy clinic consultations during the self‑payment gap, but no Above Threshold Benefit.",
            primary_risk_warning: "No Above Threshold Benefit—once MSA and Personal Health Fund are exhausted and Extender Benefit coverage runs out, all day‑to‑day claims are out‑of‑pocket for the rest of the year.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Predictable day‑to‑day spend within MSA, Extender and Personal Health Fund limits; must avoid catastrophic out‑of‑hospital costs."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "High specialist or allied spend in one year can exhaust MSA and Personal Health Fund entirely before year‑end, leaving member unprotected."
            }
        }
    },
    {
        slug: "discovery-saver-delta-network-discount-2026",
        code: "DH_SAVER_DELTA_DISCOUNT",
        meta: {
            title: "Classic Delta Saver Hospital Network Discount",
            marketing_heading: "Lower Premiums for Delta Hospital Network Users",
            description: "For members near Delta hospitals willing to accept the Delta hospital and Day Surgery networks in exchange for materially lower contributions than Classic Saver.",
            category: "Network Discount Saver",
            strategic_intent: "Network_Compliance_Savings"
        },
        defaults: {
            income: 32000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 36,
            location_zone: "Near_Delta_Network"
        },
        search_profile: {
            network_tolerance: "Delta Network",
            min_savings_allocation: 8000,
            chronic_needs: "CDL only",
            required_benefits: [
                "MSA at 20% of contributions (Delta discount)",
                "Delta Hospital Network with R11,100 upfront if non‑network",
                "Personal Health Fund up to R10,000 (boosted to R20,000)",
                "200% hospital specialists in Delta network"
            ],
            priority_tag: "network_discount"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-saver-any-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Classic Delta Saver reduces contributions versus Classic Saver by restricting planned hospital admissions and Day Surgery procedures to a Delta network; members pay R11,100 upfront for non‑network planned admissions.",
            primary_risk_warning: "Using a non‑Delta hospital for planned admissions triggers an R11,100 upfront payment; geography must align to Delta network availability.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Consistent use of Delta hospitals and avoidance of non‑network elective surgery."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Single non‑network elective admission can negate many months of contribution savings."
            }
        }
    },
    {
        slug: "discovery-saver-essential-budget-msa-2026",
        code: "DH_SAVER_ESSENTIAL_BUDGET",
        meta: {
            title: "Essential Saver Budget MSA",
            marketing_heading: "Lower Premiums with Smaller MSA and 100% Tariff in Hospital",
            description: "For budget‑conscious members accepting a smaller MSA (15% of contributions), 100% hospital tariff and Personal Health Fund up to R6,000, with no Above Threshold Benefit.",
            category: "Budget MSA Saver",
            strategic_intent: "Budget_Optimisation_Minimum_Day2Day"
        },
        defaults: {
            income: 28000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 1
            },
            age: 33,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 4000,
            chronic_needs: "CDL only",
            required_benefits: [
                "MSA at 15% of contributions",
                "Day‑to‑day Extender Benefit (limited)",
                "Personal Health Fund up to R6,000 (boosted to R12,000)",
                "100% hospital specialists"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-saver-any-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Essential Saver cuts contributions by lowering MSA allocation to 15%, capping Personal Health Fund at R6,000 base (R12,000 boosted), reducing hospital specialists to 100% tariff and limiting the Day‑to‑day Extender Benefit to two consultations (four for families).",
            primary_risk_warning: "Smaller MSA and lower Extender Benefit leave members exposed to large self‑payment periods; no Above Threshold Benefit for catastrophic day‑to‑day costs.",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Very low day‑to‑day utilisation; primary need is catastrophic hospital cover."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Moderate specialist or allied spend quickly exhausts MSA and Personal Health Fund, leading to large out‑of‑pocket costs."
            }
        }
    },
    {
        slug: "discovery-saver-coastal-regional-resident-2026",
        code: "DH_SAVER_COASTAL_RESIDENT",
        meta: {
            title: "Coastal Saver Regional Hospital Discount",
            marketing_heading: "Lower Premiums for Coastal Province Residents",
            description: "For members living in the four coastal provinces, leveraging lower premiums in exchange for coastal hospital and Day Surgery network restrictions.",
            category: "Regional Saver",
            strategic_intent: "Geo_Network_Optimisation"
        },
        defaults: {
            income: 30000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 35,
            location_zone: "Coastal"
        },
        search_profile: {
            network_tolerance: "Coastal Network Only",
            min_savings_allocation: 6000,
            chronic_needs: "CDL only",
            required_benefits: [
                "MSA at 15% of contributions",
                "Coastal Hospital and Day Surgery Network",
                "Personal Health Fund up to R6,000 (boosted to R12,000)",
                "100% hospital specialists"
            ],
            priority_tag: "geo_discount"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-saver-any-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Coastal Saver reduces contributions below national Essential Saver by limiting full hospital benefits to approved coastal facilities and paying only 70% tariff at non‑coastal hospitals.",
            primary_risk_warning: "Relocation inland or frequent planned admissions at non‑coastal hospitals significantly reduces value due to reduced reimbursement ratios.",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Member remains coastal and uses in‑network hospitals for most planned care."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Elective admission at a non‑coastal hospital where only 70% of tariff is funded."
            }
        }
    },
    {
        slug: "discovery-keycare-plus-income-banded-network-2026",
        code: "DH_KC_PLUS_INCOME",
        meta: {
            title: "KeyCare Plus Income‑Banded Network Plan",
            marketing_heading: "Income‑Banded Contributions with Full KeyCare GP and Specialist Network",
            description: "For members meeting income thresholds who need unlimited network GP visits, network specialist cover up to R5,750, one casualty visit per year and Personal Health Fund up to R1,000 (boosted to R2,000).",
            category: "Income‑Banded Network Plan",
            strategic_intent: "Network_Income_Subsidy"
        },
        defaults: {
            income: 12000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 32,
            location_zone: "KeyCare_Network_Area"
        },
        search_profile: {
            network_tolerance: "KeyCare Network",
            min_savings_allocation: 0,
            chronic_needs: "CDL only",
            required_benefits: [
                "Unlimited nominated KeyCare GP visits",
                "Specialist cover up to R5,750 per person",
                "One casualty visit per year with R520 co‑payment",
                "Personal Health Fund up to R1,000 (boosted to R2,000)"
            ],
            priority_tag: "income_banded"
        },
        actuarial_logic: {
            target_plan_id: "discovery-keycare-plus-network-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "KeyCare Plus uses income‑banded contributions verified by the scheme, providing unlimited network GP consultations, acute medicine and defined day‑to‑day benefits, with full chronic medicine cover on formulary at network pharmacies.",
            primary_risk_warning: "Strict income verification; using non‑KeyCare providers triggers large co‑payments or non‑coverage; no Medical Savings Account or Above Threshold Benefit.",
            utilization_assumptions: {
                gp_visits_frequency: "High (network GP)",
                chronic_script_consistency: 12,
                break_even_point: "Frequent primary care use within KeyCare networks and consistent chronic medicine dispensing."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Income exceeding threshold disqualifies member from lower contribution bands; non‑network use triggers immediate out‑of‑pocket costs."
            }
        }
    },
    {
        slug: "discovery-keycare-start-budget-network-2026",
        code: "DH_KC_START_BUDGET",
        meta: {
            title: "KeyCare Start Budget Regional Network",
            marketing_heading: "Very Low Premiums with Strict KeyCare Start Hospital and GP Network",
            description: "For low‑income members willing to use a chosen KeyCare Start Network hospital and GP in a defined region, with two specialist visits up to R2,850 per person and no non‑network access.",
            category: "Budget Network Plan",
            strategic_intent: "Minimum_Cost_Strict_Network"
        },
        defaults: {
            income: 8000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 1
            },
            age: 28,
            location_zone: "KeyCare_Start_Region"
        },
        search_profile: {
            network_tolerance: "KeyCare Start Network Only",
            min_savings_allocation: 0,
            chronic_needs: "CDL only",
            required_benefits: [
                "Nominated KeyCare Start GP",
                "Chosen KeyCare Start Network Hospital (must use)",
                "Two specialist visits up to R2,850 per person",
                "Personal Health Fund up to R1,000 (boosted to R2,000)"
            ],
            priority_tag: "budget_network"
        },
        actuarial_logic: {
            target_plan_id: "discovery-keycare-plus-network-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "KeyCare Start dramatically reduces contributions by requiring members to choose a single KeyCare Start hospital in their region and use only that facility for planned admissions; non‑network hospital use for planned care results in 100% member liability.",
            primary_risk_warning: "Planned admissions at non‑network hospitals are not funded at all; members pay the entire bill out‑of‑pocket.",
            utilization_assumptions: {
                gp_visits_frequency: "High (network GP)",
                chronic_script_consistency: 12,
                break_even_point: "Exclusive use of chosen KeyCare Start hospital and GP; member must be geographically aligned."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Single planned admission to a non‑network hospital exposes member to full hospital bill."
            }
        }
    },
    {
        slug: "discovery-keycare-start-regional-online-practice-2026",
        code: "DH_KC_REGIONAL_ONLINE",
        meta: {
            title: "KeyCare Start Regional Online Practice",
            marketing_heading: "Lowest Premiums with Virtual KeyCare Online Practice Triage",
            description: "For members in defined regional towns who access care through the KeyCare Online Practice digital platform, with the lowest Discovery premiums and strict regional network restrictions.",
            category: "Digital‑First Regional Network",
            strategic_intent: "Telemedicine_Driven_Cost_Reduction"
        },
        defaults: {
            income: 7000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 2
            },
            age: 30,
            location_zone: "KeyCare_Regional_Town"
        },
        search_profile: {
            network_tolerance: "KeyCare Start Regional Network Only",
            min_savings_allocation: 0,
            chronic_needs: "CDL only",
            required_benefits: [
                "KeyCare Online Practice for GP access and referrals",
                "Chosen KeyCare Start Regional hospital in defined towns",
                "Two specialist visits up to R2,850 per person",
                "Personal Health Fund up to R1,000 (boosted to R2,000)"
            ],
            priority_tag: "digital_network"
        },
        actuarial_logic: {
            target_plan_id: "discovery-keycare-plus-network-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "KeyCare Start Regional achieves the lowest Discovery premiums by limiting access to defined regional towns (Gauteng, Limpopo, Mpumalanga, Western Cape, etc.) and mandating the KeyCare Online Practice for GP consultations and referrals.",
            primary_risk_warning: "Member must use the KeyCare Online Practice for all primary care; non‑network hospital use for planned care results in 100% member liability; geography is highly restricted.",
            utilization_assumptions: {
                gp_visits_frequency: "High (online practice)",
                chronic_script_consistency: 12,
                break_even_point: "Member lives in a defined regional town and uses the online practice and chosen regional hospital exclusively."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Relocation outside the regional network or planned admission to a non‑network hospital exposes member to full liability."
            }
        }
    },
    {
        slug: "discovery-priority-classic-limited-atb-2026",
        code: "DH_PRIORITY_CLASSIC_ATB",
        meta: {
            title: "Classic Priority Limited Above Threshold Benefit",
            marketing_heading: "MSA at 25% with Limited ATB and 200% Hospital Tariff",
            description: "For mid‑income families who need a large MSA (25% of contributions), Day‑to‑day Extender Benefit, Personal Health Fund up to R10,000 (boosted to R20,000) and a limited Above Threshold Benefit that caps total day‑to‑day cover each year.",
            category: "Limited ATB Savings",
            strategic_intent: "MSA_PHF_ATB_Capped"
        },
        defaults: {
            income: 45000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 40,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 17000,
            chronic_needs: "CDL only",
            required_benefits: [
                "MSA at 25% of contributions",
                "Annual Threshold and limited ATB",
                "Personal Health Fund up to R10,000 (boosted to R20,000)",
                "200% hospital specialists"
            ],
            priority_tag: "limited_atb"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-priority-any-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Classic Priority allocates 25% of contributions to MSA, provides an Annual Threshold around R27,000 per adult and a limited Above Threshold Benefit of approximately R20,000 per adult, beyond which members pay all day‑to‑day claims out‑of‑pocket.",
            primary_risk_warning: "Above Threshold Benefit is capped; once MSA, Personal Health Fund and ATB are exhausted, members face full out‑of‑pocket costs for the rest of the year.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 0,
                break_even_point: "Predictable day‑to‑day spending that reaches but does not exceed the Annual Threshold and limited ATB."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Catastrophic day‑to‑day event (e.g., prolonged allied therapy) that exceeds the combined MSA, PHF and ATB limits."
            }
        }
    },
    {
        slug: "discovery-priority-essential-budget-limited-atb-2026",
        code: "DH_PRIORITY_ESSENTIAL_BUDGET",
        meta: {
            title: "Essential Priority Budget Limited ATB",
            marketing_heading: "Smaller MSA at 15% with Limited ATB and 100% Hospital Tariff",
            description: "For budget members who need a limited Above Threshold Benefit but accept a smaller MSA (15% of contributions), reduced Personal Health Fund (R6,000 boosted to R12,000) and 100% hospital tariff.",
            category: "Budget Limited ATB",
            strategic_intent: "Budget_ATB_Cap"
        },
        defaults: {
            income: 35000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 38,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 8000,
            chronic_needs: "CDL only",
            required_benefits: [
                "MSA at 15% of contributions",
                "Annual Threshold and limited ATB",
                "Personal Health Fund up to R6,000 (boosted to R12,000)",
                "100% hospital specialists"
            ],
            priority_tag: "budget_atb"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-priority-any-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Essential Priority reduces MSA to 15%, sets the same Annual Threshold as Classic but with a limited ATB of approximately R14,000 per adult, and reduces hospital specialists to 100% tariff to lower contributions.",
            primary_risk_warning: "Smaller MSA and lower ATB cap leave members exposed to large out‑of‑pocket costs if day‑to‑day utilisation is high.",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Moderate day‑to‑day spending that does not exceed the limited ATB."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "High allied or specialist spend exceeds MSA, PHF and ATB limits, forcing member to pay all subsequent day‑to‑day costs."
            }
        }
    },
    {
        slug: "discovery-executive-multi-chronic-atb-unlimited-2026",
        code: "DH_EXEC_MULTI_CHRONIC",
        meta: {
            title: "Executive Multi‑Chronic Unlimited Day‑to‑Day",
            marketing_heading: "High-Income, High-Utilisation Cover with Unlimited Above-Threshold Benefit",
            description: "For high-income individuals or couples with multiple chronic conditions who need very large day‑to‑day and in-hospital funding, unlimited Above Threshold Benefit and enhanced chronic lists.",
            category: "Top-Tier Comprehensive",
            strategic_intent: "Max_Risk_Transfer_All_Care"
        },
        defaults: {
            income: 90000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 52,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 68000,
            chronic_needs: "CDL + ADL + Specialised Med",
            required_benefits: [
                "Unlimited Above Threshold Benefit",
                "Extended Chronic List",
                "Specialised Medicine and Technology",
                "Personal Health Fund up to R24,000"
            ],
            priority_tag: "heavy_user"
        },
        actuarial_logic: {
            target_plan_id: "discovery-executive-any-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Very high monthly contributions buy a Medical Savings Account of over R34,000 per adult per year, plus an unlimited Above Threshold Benefit and a Personal Health Fund that can reach R24,000 per policy through Personal Health Pathways engagement.",
            primary_risk_warning: "High fixed premium commitment; benefit efficiency drops sharply if chronic and day‑to‑day utilisation is low.",
            utilization_assumptions: {
                gp_visits_frequency: "High",
                chronic_script_consistency: 12,
                break_even_point: "Multiple CDL and ADL chronic conditions plus frequent specialist and allied visits each year."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Failure to engage on Personal Health Pathways reduces available Personal Health Fund and weakens the value proposition."
            }
        }
    },
    {
        slug: "discovery-executive-oncology-innovation-extended-2026",
        code: "DH_EXEC_ONCO_INNOV",
        meta: {
            title: "Executive Oncology Innovation and Extended Cover",
            marketing_heading: "High-Cost Cancer Treatment with Innovation and Extended Oncology Benefits",
            description: "For members expecting high oncology spend who need large annual limits, access to innovative cancer medicines and extended cover beyond the standard oncology threshold.",
            category: "Oncology High-Cost",
            strategic_intent: "Catastrophic_Oncology_Risk_Transfer"
        },
        defaults: {
            income: 95000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 58,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "DSP Oncology Network",
            min_savings_allocation: 30000,
            chronic_needs: "Active Cancer",
            required_benefits: [
                "Oncology cover to at least R500,000 per 12 months",
                "Oncology Innovation Benefit",
                "Extended Oncology Benefit",
                "Advanced Illness (palliative) Benefit"
            ],
            priority_tag: "oncology"
        },
        actuarial_logic: {
            target_plan_id: "discovery-executive-any-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "The plan covers the first large tranche of oncology spend in full each 12‑month cycle, then 80% thereafter, with additional innovation and extended oncology benefits that fund selected high‑cost therapies beyond the base oncology limit.",
            primary_risk_warning: "Oncology innovation benefits are subject to strict clinical entry criteria and member co‑payments; members using non‑DSP oncology providers face additional co‑payments.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 12,
                break_even_point: "One or more systemic oncology regimens or biologic/targeted therapies above standard plan limits."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Migration to non‑DSP oncology providers or non‑formulary drugs can trigger 20–30% co‑payments on very high claim values."
            }
        }
    },
    {
        slug: "discovery-executive-global-traveller-2026",
        code: "DH_EXEC_GLOBAL_TRAVEL",
        meta: {
            title: "Executive Global Traveller and Overseas Treatment",
            marketing_heading: "Frequent Traveller with US Dollar Emergency Cover and Overseas Treatment",
            description: "For high-income members who travel internationally often and need US dollar emergency cover and access to treatment not available in South Africa.",
            category: "International Mobility",
            strategic_intent: "Global_Risk_Transfer"
        },
        defaults: {
            income: 120000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 45,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 30000,
            chronic_needs: "Low",
            required_benefits: [
                "International Travel Benefit around US$1m per trip",
                "Africa Evacuation Benefit",
                "Overseas Treatment Benefit for procedures not available in South Africa"
            ],
            priority_tag: "travel"
        },
        actuarial_logic: {
            target_plan_id: "discovery-executive-any-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Each overseas journey is backed by a very high US dollar emergency medical limit for up to 90 days per trip, plus a separate overseas treatment benefit for defined procedures not available locally, both with member co‑payments on some components.",
            primary_risk_warning: "Pre‑existing conditions are excluded from the international travel benefit; a 20% co‑payment applies to overseas treatment and certain evacuation services.",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate",
                chronic_script_consistency: 0,
                break_even_point: "One serious medical emergency abroad in a multi‑year horizon can justify the incremental premium vs domestic‑only cover."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Misclassification of pre‑existing conditions as travel emergencies may result in non‑payment."
            }
        }
    },
    {
        slug: "discovery-executive-dental-ortho-high-limits-2026",
        code: "DH_EXEC_DENTAL_ORTHO",
        meta: {
            title: "Executive Dental, Orthodontic and Allied High-Use",
            marketing_heading: "Large Dental, Allied and Optical Limits with Unlimited ATB",
            description: "For households planning major orthodontic work, extensive allied therapy and optical procedures, using Executive plan high day‑to‑day limits and unlimited Above Threshold Benefit.",
            category: "Dental and Allied Intensive",
            strategic_intent: "Day2Day_Limit_Extraction"
        },
        defaults: {
            income: 80000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 41,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 30000,
            chronic_needs: "Low",
            required_benefits: [
                "High dental appliances and orthodontic limits",
                "High allied and psychology limits",
                "High optical and external medical items limits"
            ],
            priority_tag: "dental_allied"
        },
        actuarial_logic: {
            target_plan_id: "discovery-executive-any-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Executive offers large annual limits for allied and psychology services, dental appliances and orthodontics, optical benefits and external medical items, all of which continue to reimburse once the Annual Threshold is reached thanks to the unlimited Above Threshold Benefit.",
            primary_risk_warning: "Dental appliances and orthodontics are funded from day‑to‑day benefits and subject to yearly sub‑limits and clinical rules; heavy use without reaching the Threshold can leave value unused.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 0,
                break_even_point: "At least one course of orthodontics plus recurring allied therapies and optical spends every few years."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Failure to submit claims during the self‑payment progression can delay or block Above Threshold activation."
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
        slug: "discovery-coastal-core-resident-2026",
        code: "DH_CORE_COASTAL_RESIDENT",
        meta: {
            title: "Coastal Core Coastal-Resident Hospital Cover",
            marketing_heading: "Lower Premiums for Members Using Coastal Hospitals",
            description: "For members living and receiving almost all care in the four coastal provinces, leveraging lower premiums in exchange for a coastal hospital network restriction.",
            category: "Regional Network Hospital",
            strategic_intent: "Geo_Network_Optimisation"
        },
        defaults: {
            income: 24000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 37,
            location_zone: "Coastal"
        },
        search_profile: {
            network_tolerance: "Coastal Network Only",
            min_savings_allocation: 0,
            chronic_needs: "CDL basic",
            required_benefits: [
                "Hospital network in four coastal provinces",
                "Reduced cover at non‑coastal hospitals",
                "Personal Health Fund up to R4,000"
            ],
            priority_tag: "geo_discount"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-delta-core-network-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Coastal Core trims contributions versus national Classic options by limiting full hospital benefits to approved coastal facilities and paying only a portion of tariff at non‑network hospitals inland.",
            primary_risk_warning: "Relocation inland or frequent planned admissions at non‑coastal hospitals significantly reduces value due to reduced reimbursement ratios.",
            utilization_assumptions: {
                gp_visits_frequency: "Low",
                chronic_script_consistency: 0,
                break_even_point: "Member remains coastal and uses in‑network hospitals for most planned care."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Elective admission at a non‑coastal hospital where only a percentage of tariff is funded."
            }
        }
    },
    {
        slug: "discovery-essential-core-oncology-budget-2026",
        code: "DH_CORE_ESS_ONCO",
        meta: {
            title: "Essential Core Oncology Budget Protection",
            marketing_heading: "Hospital-Only with Oncology Cover to R250,000",
            description: "For members with expected but controlled oncology costs who want hospital‑only cover and a defined oncology budget, accepting network restrictions on some options.",
            category: "Hospital + Oncology",
            strategic_intent: "Oncology_Budget_Cap"
        },
        defaults: {
            income: 30000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 49,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Mixed (network for Delta variants)",
            min_savings_allocation: 0,
            chronic_needs: "Single Cancer Episode",
            required_benefits: [
                "Oncology Benefit around R250,000 per 12 months",
                "80% cover after oncology threshold",
                "DSP oncology medicine to avoid 20% co‑payment"
            ],
            priority_tag: "oncology"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-delta-core-network-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "All Core plans share an oncology benefit that funds the first substantial portion of approved cancer treatment per 12‑month cycle in full, then 80% of tariff thereafter, provided designated oncology networks and dispensaries are used.",
            primary_risk_warning: "Oncology cover is finite; high‑cost, long‑duration regimens can exceed the R250,000 cover level within a year and leave 20% of further costs for the member.",
            utilization_assumptions: {
                gp_visits_frequency: "Low",
                chronic_script_consistency: 12,
                break_even_point: "One defined oncology episode with predictable duration and regimen within the plan’s oncology limit."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Use of non‑DSP oncology pharmacy triggers sustained 20% co‑payments."
            }
        }
    },
    {
        slug: "discovery-classic-comprehensive-family-day2day-msa-atb-2026",
        code: "DH_COMP_CLASSIC_FAM",
        meta: {
            title: "Classic Comprehensive Family with MSA and ATB",
            marketing_heading: "Balanced Day-to-Day, Savings and Above-Threshold for Families",
            description: "For mid-to-high income families needing structured Medical Savings Accounts, limited Above Threshold Benefit and strong specialist and hospital cover at 200% tariff.",
            category: "Comprehensive Savings + ATB",
            strategic_intent: "Structured_Day2Day_Optimisation"
        },
        defaults: {
            income: 55000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 43,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 27000,
            chronic_needs: "CDL + Some ADL",
            required_benefits: [
                "Medical Savings Account (25% of contributions)",
                "Limited Above Threshold Benefit",
                "Personal Health Fund up to R24,000",
                "Specialists up to 200% Discovery Health Rate"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-comprehensive-any-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Contributions include a sizeable Medical Savings Account allocation per adult and child, an Annual Threshold and a limited Above Threshold Benefit, together with a Personal Health Fund that can meaningfully supplement day‑to‑day cover if members complete Personal Health Pathway actions.",
            primary_risk_warning: "Once the Above Threshold Benefit is exhausted, members revert to full out‑of‑pocket funding for day‑to‑day claims until the next year.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 12,
                break_even_point: "Predictable but non‑catastrophic day‑to‑day spending that regularly reaches the Annual Threshold without overshooting the limited ATB."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "High non‑essential day‑to‑day utilisation depletes the MSA and Above Threshold Benefit prematurely."
            }
        }
    },
    {
        slug: "discovery-classic-smart-comprehensive-urban-network-2026",
        code: "DH_COMP_SMART_URBAN",
        meta: {
            title: "Classic Smart Comprehensive Urban Network User",
            marketing_heading: "Lower Premiums with Smart Hospital and GP Network and R75 GP Co-Pay",
            description: "For urban members comfortable with Smart hospital and GP networks, leveraging unlimited Smart-network GP visits with a small co‑payment and reduced contributions versus full Classic Comprehensive.",
            category: "Smart Network Comprehensive",
            strategic_intent: "Network_Compliance_Savings"
        },
        defaults: {
            income: 42000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 33,
            location_zone: "Smart_Area"
        },
        search_profile: {
            network_tolerance: "Smart Network Only",
            min_savings_allocation: 14000,
            chronic_needs: "CDL only",
            required_benefits: [
                "Unlimited Smart-network GP visits with small co-payment",
                "Smart Hospital Network",
                "Medical Savings Account at 15% of contributions"
            ],
            priority_tag: "network_smart"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-smart-network-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Classic Smart Comprehensive uses a Smart hospital and GP network plus an R75 co‑payment per GP consultation to lower contributions, while still offering MSA, an Annual Threshold and a limited Above Threshold Benefit.",
            primary_risk_warning: "Planned admissions or GP use outside the Smart networks trigger large upfront payments and higher out‑of‑pocket costs.",
            utilization_assumptions: {
                gp_visits_frequency: "High (within Smart GP network)",
                chronic_script_consistency: 0,
                break_even_point: "Frequent primary care within the Smart network plus moderate specialist and hospital use."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Repeated use of non‑Smart hospitals or GPs negates the contribution saving."
            }
        }
    },
    {
        slug: "discovery-classic-comprehensive-adl-mental-health-2026",
        code: "DH_COMP_CLASSIC_ADL_MH",
        meta: {
            title: "Classic Comprehensive ADL and Mental Health Conditions",
            marketing_heading: "Additional Disease List and Mental Health Programmes",
            description: "For members with non‑CDL psychiatric or autoimmune conditions who need Additional Disease List chronic medicine and structured mental health care programmes.",
            category: "Chronic Psychiatric + Autoimmune",
            strategic_intent: "Extended_Chronic_Cover"
        },
        defaults: {
            income: 50000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 39,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 25000,
            chronic_needs: "ADL Mental + Autoimmune",
            required_benefits: [
                "Additional Disease List chronic cover",
                "Mental Health Care Programme",
                "Depression Risk Management Programme",
                "High allied and psychology day‑to‑day limits"
            ],
            priority_tag: "chronic"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-comprehensive-any-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Classic Comprehensive funds chronic medicines for a broad Additional Disease List, including major depression, anxiety disorders and several autoimmune conditions, alongside defined mental health care programmes and sizeable allied and psychology limits.",
            primary_risk_warning: "ADL medicines are funded only up to Chronic Drug Amount ceilings; non‑preferred products or non‑DSP pharmacies can leave significant co‑payments.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 12,
                break_even_point: "Continuous treatment for one or more ADL conditions plus structured psychotherapy and allied support each year."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Non‑adherence to Premier Plus GP and DSP requirements reduces effective chronic and mental health funding."
            }
        }
    },
    {
        slug: "discovery-classic-comprehensive-oncology-extended-2026",
        code: "DH_COMP_CLASSIC_ONCO_EXT",
        meta: {
            title: "Classic Comprehensive Extended Oncology",
            marketing_heading: "Higher Oncology Threshold and Extended Oncology Benefit",
            description: "For members with anticipated high oncology spend who need a higher base oncology threshold, Oncology Innovation Benefit and Extended Oncology Benefit but do not require Executive’s unlimited ATB.",
            category: "Oncology Enhanced",
            strategic_intent: "High_Oncology_Value_without_Exec"
        },
        defaults: {
            income: 65000,
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
            min_savings_allocation: 25000,
            chronic_needs: "Active Cancer",
            required_benefits: [
                "Oncology cover to around R500,000 per 12 months",
                "Oncology Innovation Benefit at 50% member share",
                "Extended Oncology Benefit beyond base cover"
            ],
            priority_tag: "oncology"
        },
        actuarial_logic: {
            target_plan_id: "discovery-classic-comprehensive-any-2026",
            brand_lock: "Discovery Health",
            mathematical_basis: "Classic Comprehensive offers a higher oncology cover level per 12‑month cycle than the Smart variant, plus innovation and extended oncology benefits that can fund selected regimens after the base limit is reached, at a lower contribution than the Executive Plan.",
            primary_risk_warning: "Member still carries 20% of oncology costs beyond the base limit and at least 50% of the cost of defined innovative drugs, so affordability must be stress‑tested.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 12,
                break_even_point: "Cancer regimens approaching or exceeding the standard oncology limit but not requiring Executive‑level special medicine limits elsewhere."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Failure to use oncology DSPs for medicine and facilities introduces additional co‑payments on already high claim values."
            }
        }
    },
    {
        slug: "fedhealth-flexifed3-d2d-plus-health-risk-assessment-savings-unlock-2026",
        code: "FH_F3_D2DPLUS_15",
        meta: {
            title: "flexiFED 3 D2D+ Health Risk Assessment Unlocker",
            marketing_heading: "R4,000 Extra Benefits Via Pharmacy HRA + App Registration",
            description: "Members completing Health Risk Assessment at pharmacy/GP + registering on Fedhealth Member App unlock R4,000 family D2D+ benefit for GP, specialists, basic dentistry, meds, pathology, radiology - claims don't accumulate to threshold",
            category: "Wellness Incentive Maximizer",
            strategic_intent: "Behavioral_Risk_Pooling"
        },
        defaults: {
            income: 28000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 36,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network for Threshold Benefits",
            min_savings_allocation: 23652,
            chronic_needs: "27 CDL + Depression",
            required_benefits: [
                "R4,000 D2D+ Unlock",
                "Unlimited Nominated GP Threshold",
                "R10,416 Savings",
                "Maternity Private Ward",
                "Childhood Immunizations"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "flexifed-3-any-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Family R5,785(M) + R5,300(A) + R2,051(C) = R13,136/month. Savings R10,416(M) + R9,540(A) + R3,696(C) = R23,652. UNIQUE D2D+ BENEFIT: Complete Health Risk Assessment at pharmacy/GP + register on Member App = unlock R4,000 FAMILY benefit (not per beneficiary). D2D+ covers GP/specialists/basic dentistry/meds/pathology/general radiology WITHOUT accumulating to threshold. Threshold R10,416(M) + R9,540(A) + R3,696(C) = R23,652 unlocks unlimited nominated network GP with 20% co-payment + basic dental (2 annual consults, x-rays, scaling, polishing, fillings, extractions).",
            primary_risk_warning: "D2D+ R4,000 is FAMILY limit, not per beneficiary - dilutes value for large families. Claims paid from D2D+ do NOT accumulate to threshold, creating strategic dilemma: use D2D+ first (no threshold progress) or self-fund/use savings (threshold accumulation). Basic dental threshold benefit restricted to contracted dentists + limited approved procedures. Nominal savings account: R348(M) + R312(A) + R120(C) = R780 included in gross contribution creates accounting complexity.",
            utilization_assumptions: {
                gp_visits_frequency: "High (strategy: self-fund GP to accumulate threshold, then use D2D+ for non-accumulating claims)",
                chronic_script_consistency: 12,
                break_even_point: "D2D+ R4,000 maximized when BOTH parents + child use benefits (R1,333 per member average). Value erodes with single member using entire family pool. Threshold race strategy: accumulate R23,652 in claims via self-funded nominated GP visits to unlock unlimited benefit with 20% co-payment."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Health Risk Assessment non-completion forfeits R4,000 D2D+ benefit entirely. Member App non-registration = R4,000 lost value. Strategic error using D2D+ before reaching threshold delays unlimited GP unlock."
            }
        }
    },
    {
        slug: "fedhealth-flexifed3-grid-10percent-savings-maternity-family-childhood-benefits-2026",
        code: "FH_F3_GRID_MAT_16",
        meta: {
            title: "flexiFED 3GRID 10% Discount Maternity Family",
            marketing_heading: "Save R11,676/Year (M+A) with GRID Network Commitment",
            description: "Young families (30-40) accepting 120 GRID network hospitals for planned procedures, saving R11,676/year (M+A), R13,836/year (M+A+C) vs standard flexiFED 3, accessing full maternity + childhood benefits including private ward, 12 ante/postnatal consults, childhood immunizations, infant hearing screening",
            category: "Network-Constrained Family Builder",
            strategic_intent: "Cost_Reduced_Hospital_Transfer"
        },
        defaults: {
            income: 32000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 33,
            location_zone: "GRID Network Area"
        },
        search_profile: {
            network_tolerance: "GRID Network",
            min_savings_allocation: 23652,
            chronic_needs: "27 CDL + Depression",
            required_benefits: [
                "GRID 10% Discount",
                "Private Ward Maternity",
                "12 Ante/Postnatal Consults",
                "Childhood Immunizations Birth-12",
                "Infant Hearing Screening",
                "Doula R3,600"
            ],
            priority_tag: "maternity"
        },
        actuarial_logic: {
            target_plan_id: "flexifed-3-any-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Family GRID R5,278(M) + R4,839(A) + R1,872(C) = R11,989/month saves R1,147/month vs standard flexiFED 3. Annual savings: M+A R11,676, M+A+C R13,836. IDENTICAL benefits to flexiFED 3 including savings R10,416(M) + R9,540(A) + R3,696(C) = R23,652, threshold R23,652, D2D+ R4,000 family. UNIQUE MATERNITY: Private ward cover when available, 12 ante/postnatal consults with midwife/network GP/gynae, 2x 2D antenatal scans, amniocentesis R1,200 antenatal classes, doula R3,600, vision screening for retinopathy of prematurity, childhood immunizations birth-12 as per State EPI, infant hearing screening birth-8 weeks, paediatric consultation birth-24 months no referral required, childhood illness specialized drug benefit up to 18 years, in-hospital dentistry for children under 7.",
            primary_risk_warning: "GRID network constraint: 120 hospitals countrywide but may not include preferred facility. 30% co-payment on voluntary non-network hospital use creates severe financial exposure (typical 3-day admission R60k-80k = R18k-24k co-payment). R2,710 co-payment on non-network day surgery. 30% co-payment on non-network mental health facilities. Maternity complications requiring NICU at non-GRID hospital = immediate 30% liability. Backup savings activation: R14,436(M) + R13,224(A) + R5,124(C) higher than standard flexiFED 3 (R14,400/R13,200/R5,112).",
            utilization_assumptions: {
                gp_visits_frequency: "High (maternity + young child)",
                chronic_script_consistency: 0,
                break_even_point: "10% savings justified ONLY if GRID network includes quality maternity hospital with NICU within 30km. Single non-network hospital admission wipes out 18 months of premium savings."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Pregnancy complications requiring specialized NICU not in GRID network triggers forced choice: transfer to GRID (medical risk) or accept 30% co-payment (financial catastrophe). Child emergency admission to nearest hospital if non-GRID = 30% co-payment."
            }
        }
    },
    {
        slug: "fedhealth-flexifed3-elect-25percent-savings-excess-acceptor-young-healthy-2026",
        code: "FH_F3_ELECT_17",
        meta: {
            title: "flexiFED 3Elect 25% Discount R15,950 Excess Acceptor",
            marketing_heading: "Save R14,892/Year (Single) Trading Fixed Excess on Planned Admissions",
            description: "Young healthy members (22-35) with minimal planned hospitalization risk, accepting R15,950 fixed excess on ALL planned admissions (emergencies exempt) for 25% premium discount, saving R14,892/year (single), R28,488/year (M+A), R33,756/year (M+A+C)",
            category: "Catastrophic Hospital Plan Optimizer",
            strategic_intent: "Fixed_Excess_Risk_Transfer"
        },
        defaults: {
            income: 22000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 28,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any Hospital",
            min_savings_allocation: 10416,
            chronic_needs: "27 CDL + Depression",
            required_benefits: [
                "25% Discount R14,892/Year",
                "Any Hospital Choice",
                "R15,950 Fixed Excess Planned Only",
                "Emergency Exemption",
                "R10,416 Savings"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-flexifedsavvy-network-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Single R4,550/month saves R1,235/month vs standard flexiFED 3 (R5,785). Annual savings: R14,892 single, R28,488 couple, R33,756 M+A+C. IDENTICAL benefits: savings R10,416, threshold R10,416, D2D+ R4,000, unlimited nominated network GP after threshold with 20% co-payment. CRITICAL DIFFERENCE: R15,950 FIXED EXCESS on ALL PLANNED hospital admissions (surgery, procedures, elective admissions). Emergencies ALWAYS nearest private hospital with NO excess. Any hospital choice (vs GRID restriction).",
            primary_risk_warning: "R15,950 excess wipes out 14 months of premium savings on FIRST planned admission. 'Planned' definition critical: routine surgery (hernia, gallbladder, tonsillectomy), childbirth (excluding emergency C-section), joint procedures, back surgery, diagnostic admissions all trigger excess. Excess applies PER ADMISSION not per year. Multiple planned admissions = R15,950 × admissions. Backup savings activation R14,472(M) + R13,284(A) + R5,148(C) highest among flexiFED 3 variants.",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate (young healthy profile)",
                chronic_script_consistency: 0,
                break_even_point: "Viable ONLY for members with <8% annual probability of planned admission (age 22-35, no chronic conditions, no pregnancy plans within 2 years). Single planned admission in 14 months negates all savings."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Unexpected pregnancy = planned C-section (if not emergency) triggers R15,950 excess. Sports injury requiring reconstructive surgery = planned = R15,950. Diagnostic admission for investigation = planned = R15,950. Gap cover doesn't typically cover fixed excesses, creating out-of-pocket liability."
            }
        }
    },
    {
        slug: "fedhealth-flexifed3-hospital-backup-savings-activation-threshold-race-2026",
        code: "FH_F3_HOSP_BAC_18",
        meta: {
            title: "flexiFED 3 Hospital Plan Backup Savings Threshold Racer",
            marketing_heading: "R4,946 Hospital Plan + Optional R14,400 Savings Activation",
            description: "Members starting on pure hospital plan R4,946/month (saving R839/month vs savings plan), self-funding day-to-day to race threshold R10,416, then activating backup savings R14,400 only if needed (adds R1,200/month over 12 months)",
            category: "Dynamic Savings Activation Strategy",
            strategic_intent: "Optionality_Preservation"
        },
        defaults: {
            income: 25000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 32,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 0,
            chronic_needs: "27 CDL + Depression",
            required_benefits: [
                "Lowest Premium R4,946",
                "Backup Savings R14,400 Optional",
                "Threshold R10,416",
                "Unlimited GP After Threshold 20% Copay",
                "D2D+ R4,000 Unlock"
            ],
            priority_tag: "hospital"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-flexifedsavvy-network-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Hospital plan R4,946/month includes nominal savings R348. Backup savings R14,400 can be activated in R600 increments ANYTIME, adding R50/month per R600 activated. Full R14,400 activation adds R1,200/month spread over 12 months = R5,785 total (matches savings plan). STRATEGIC ADVANTAGE: Start hospital plan, self-fund nominated GP visits to accumulate to threshold R10,416 at cost, then activate backup savings ONLY if unexpected expenses arise. D2D+ R4,000 available via HRA + app registration. Threshold unlocks unlimited nominated network GP with 20% co-payment + basic dental (2 consults/year, x-rays, scaling, polishing, fillings, extractions at contracted dentists).",
            primary_risk_warning: "Self-funding threshold race requires R10,416 cash flow before unlimited GP benefit unlocks. D2D+ claims don't accumulate to threshold, creating perverse incentive to NOT use HRA benefit until post-threshold. Backup savings activation is PERMANENT for calendar year - cannot be reversed once activated. Nominal savings R348 creates confusion (cannot be used for most services). Threshold co-payment 20% on nominated GP applies even after R10,416 accumulation (not truly 'unlimited free').",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (strategic self-funding to reach threshold)",
                chronic_script_consistency: 0,
                break_even_point: "Optimal strategy: (1) Self-fund 12-15 nominated GP visits = R7,200-9,000 accumulation toward R10,416 threshold, (2) Complete HRA to unlock D2D+ but don't use until post-threshold, (3) Activate backup savings only if major expense (dental, specialist) needed, (4) Reach threshold via accumulated self-funded claims, (5) Use unlimited GP with 20% co-payment + D2D+ R4,000."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Unexpected major expense (R5,000+ dental, specialist) before reaching threshold forces choice: activate backup savings (permanent R1,200/month increase) or pay from own pocket. Threshold 20% co-payment means post-threshold GP visits still cost R120-150 each, not free."
            }
        }
    },
    {
        slug: "fedhealth-myfed-income-band1-entrylevel-corporate-unlimited-gp-2026",
        code: "FH_MYFED_BAND1_19",
        meta: {
            title: "myFED Income Band 1 Entry-Level Corporate Employee",
            marketing_heading: "R1,719 Unlimited Nominated GP for Household Income R1-R11,063",
            description: "Entry-level corporate employees (household income R1-R11,063/month) accessing unlimited nominated myFED contracted GP at R1,719 member rate, subject to utilization monitoring after 10 visits/year, with myFED network hospital requirement",
            category: "Entry-Level Income-Banded Constrained Network",
            strategic_intent: "Affordability_Network_Lockdown"
        },
        defaults: {
            income: 9500,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 24,
            location_zone: "myFED Network Area"
        },
        search_profile: {
            network_tolerance: "myFED Contracted Network",
            min_savings_allocation: 0,
            chronic_needs: "27 CDL Only",
            required_benefits: [
                "Income Band R1-R11,063",
                "Unlimited Nominated GP",
                "Utilization Monitoring After 10 Visits",
                "myFED Network Hospitals",
                "CDL Unlimited Clicks/Dis-Chem/Pharmacy Direct Courier"
            ],
            priority_tag: "income-banded"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-myfed-individual-network-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "INCOME-BANDED PLAN with 4 tiers. Band 1 (R1-R11,063 household income): R1,719(M) / R1,719(A) / R779(C). UNIQUE BENEFIT: Unlimited nominated myFED contracted GP subject to protocols and utilization monitoring AFTER 10 visits per beneficiary per year. Each beneficiary nominates up to 2 myFED contracted GPs. 2 mental health consultations per beneficiary at nominated GP. Up to 2 non-nominated myFED GP consults per beneficiary per year. Non-contracted GP: up to 2 consults per beneficiary per year. Specialist: 2 consultations + treatment up to R2,220 per FAMILY per year (must be referred by contracted GP, 40% co-payment if no referral). Network hospital requirement: myFED hospital network, 30% co-payment on voluntary non-network use.",
            primary_risk_warning: "Utilization monitoring after 10 GP visits per year creates uncertainty - unclear if visits 11+ denied or subject to review. Specialist benefit R2,220 per FAMILY (not per beneficiary) insufficient for most specialist series (gastroenterologist, neurologist typically R1,500-2,000 per visit). Non-network GP/specialist limit: R2,730 per FAMILY per year for ALL non-network consultations (GP + specialist combined). 30% hospital co-payment on non-network use. Chronic meds: 25% DSP non-use co-payment (Clicks/Dis-Chem/Pharmacy Direct Courier mandatory). Elective C-section R15,950 co-payment. Cataract surgery R7,750 co-payment voluntary non-contracted provider.",
            utilization_assumptions: {
                gp_visits_frequency: "High (entry-level likely higher morbidity due to stress, lifestyle)",
                chronic_script_consistency: 6,
                break_even_point: "Unlimited GP benefit valuable if >6 visits/year (R3,600+ value). Utilization monitoring after 10 visits may trigger scheme intervention. Specialist R2,220 family limit exhausted in 1-2 visits."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Household income increase to R11,064 triggers automatic move to Band 2 (R1,971) = R252/month increase. Income verification process unclear - potential for incorrect banding. 10+ GP visits triggers utilization review - possible managed care intervention, claim denials, or forced option change."
            }
        }
    },
    {
        slug: "fedhealth-myfed-income-band4-cliff-corporate-escalation-constrained-2026",
        code: "FH_MYFED_BAND4_20",
        meta: {
            title: "myFED Income Band 4 Cliff - Corporate Escalation Trap",
            marketing_heading: "R21,652+ Household Income Forces R4,052 Premium Despite Network Restrictions",
            description: "Corporate employees with household income R21,652+ paying R4,052 (M+A+A = R9,385/month family) while locked into myFED network restrictions: R2,220 specialist family limit, R2,730 non-network family cap, 30% hospital co-payment, creating affordability crisis for middle-income earners",
            category: "Income Band Cliff Misalignment",
            strategic_intent: "Affordability_Constraint_Escalation"
        },
        defaults: {
            income: 24000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 38,
            location_zone: "myFED Network Area"
        },
        search_profile: {
            network_tolerance: "myFED Contracted Network",
            min_savings_allocation: 0,
            chronic_needs: "27 CDL Only",
            required_benefits: [
                "Unlimited Nominated GP",
                "myFED Network Hospitals",
                "CDL Unlimited",
                "Infant Hearing Screening",
                "4 Postnatal Midwife Consults"
            ],
            priority_tag: "income-banded"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-myfed-individual-network-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Band 4 (R21,652+ household income): R4,052(M) / R4,052(A) / R1,281(C). Family M+A+C = R9,385/month. SAME restricted benefits as Band 1: unlimited nominated GP (utilization monitoring after 10 visits), specialist R2,220 per FAMILY, non-network GP/specialist R2,730 per FAMILY, myFED network hospitals (30% co-payment non-network), specialist must be referred by contracted GP (40% co-payment if no referral), DSP pharmacy mandatory (25% co-payment), elective C-section R15,950, cataract R7,750 voluntary non-contracted provider.",
            primary_risk_warning: "INCOME CLIFF TRAP: Household income R21,651 = Band 3 R2,453 (family M+A+C = R5,872). Income R21,652 = Band 4 R4,052 (family M+A+C = R9,385). R1 income increase triggers R3,513/month premium increase (R42,156/year). Band 4 premium R4,052 approaches flexiFED 3GRID R4,410 but with FAR inferior benefits (flexiFED 3GRID has savings R10,416, threshold, D2D+ R4,000, any hospital, no specialist family limit). Specialist R2,220 family limit creates severe access constraint for families (1 consult per member = R2,220 exhausted). Non-network cap R2,730 family means ANY non-network use (GP, specialist, non-nominated GP) counts toward same pool.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High (family with child)",
                chronic_script_consistency: 3,
                break_even_point: "Band 4 economically irrational vs flexiFED 3GRID. R4,052 myFED vs R4,410 flexiFED 3GRID (R358 difference) but flexiFED 3GRID includes R10,416 savings, unlimited specialists, any hospital. Only justified if employer-mandated myFED enrollment."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "R21,651 → R21,652 income increase = R42,156/year premium escalation. Family with 2 specialists (e.g., father cardiologist, mother gynecologist) exhausts R2,220 in single visit each. Child requiring pediatrician = R0 remaining. Non-network emergency GP after-hours R600 + non-network specialist R1,500 + non-nominated GP R600 = R2,700 exceeds R2,730 family cap immediately."
            }
        }
    },
    {
        slug: "fedhealth-myfed-dispensing-gp-acute-medicine-unlimited-formulary-2026",
        code: "FH_MYFED_DISP_21",
        meta: {
            title: "myFED Dispensing GP Acute Medicine Unlimited Formulary User",
            marketing_heading: "Unlimited Acute Medicine at Nominated Dispensing GP",
            description: "Members strategically nominating dispensing myFED contracted GPs to access unlimited acute medicine prescriptions at GP (no pharmacy visit required), subject to acute formulary, avoiding R880 casualty co-payment for minor ailments",
            category: "Dispensing GP Pharmacy Bypass",
            strategic_intent: "Formulary_Integrated_Care"
        },
        defaults: {
            income: 13500,
            family_composition: {
                main: 1,
                adult: 0,
                child: 2
            },
            age: 29,
            location_zone: "myFED Dispensing GP Area"
        },
        search_profile: {
            network_tolerance: "myFED Dispensing GP",
            min_savings_allocation: 0,
            chronic_needs: "27 CDL",
            required_benefits: [
                "Dispensing GP Nomination",
                "Unlimited Acute Medicine",
                "Acute Formulary All Medical Practitioners",
                "R1,971 Band 2",
                "ISO Leso Optical R230 Frame"
            ],
            priority_tag: "gp-dispensing"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-myfed-individual-network-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Band 2 (R11,064-R15,617 household income): R1,971(M) / R1,971(A) / R931(C). Single parent + 2 kids = R3,833/month. UNIQUE BENEFIT: Unlimited acute medicine at dispensing nominated contracted GP. Non-dispensing medical practitioners (Fedhealth Network Specialists, GPs, Dentists): unlimited acute medicine subject to acute formulary. Creates integrated care model where GP consultation + medication dispensing in single visit. Avoids R880 casualty co-payment for minor acute conditions (UTI, bronchitis, gastroenteritis). Each beneficiary nominates up to 2 myFED contracted GPs - strategy is to nominate 1 dispensing + 1 non-dispensing for flexibility.",
            primary_risk_warning: "Acute formulary restrictions: limited medication options, may not include preferred brands or newer medications. Dispensing GP availability limited (not all myFED GPs dispense). Utilization monitoring after 10 GP visits per beneficiary per year may flag frequent acute med collection as 'overutilization'. Unlimited acute meds does NOT cover over-the-counter (no benefit). Chronic meds: DSP pharmacy mandatory (Clicks/Dis-Chem/Pharmacy Direct Courier), 25% co-payment non-DSP - cannot be dispensed by GP. Specialist R2,220 family limit means complex acute conditions requiring specialist consultation exhaust benefit quickly.",
            utilization_assumptions: {
                gp_visits_frequency: "High (2 children = frequent acute illnesses)",
                chronic_script_consistency: 0,
                break_even_point: "Dispensing GP model valuable for families with children experiencing frequent acute conditions (6-10 episodes/year). Each acute episode: consultation R450-600 + medication R200-400 = R650-1,000. Unlimited benefit = R6,500-10,000 annual value."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "10th GP visit per beneficiary triggers utilization monitoring - frequent acute med collection may be flagged. Income increase to R15,618 moves to Band 3 (R2,453) = R482/month increase. Dispensing GP network may not include closest/preferred provider, creating access barrier. Acute formulary excludes newer antibiotics, biologics, or preferred analgesics."
            }
        }
    },
    {
        slug: "fedhealth-flexifedsavvy-hospital-under35-virtual-gp-maximizer-2026",
        code: "FH_SAVVY_H_VIRTUAL_09",
        meta: {
            title: "Under-35 Virtual GP Maximizer",
            marketing_heading: "Unlimited Virtual + 3 Face-to-Face GP from Risk",
            description: "Ages 22-34 leveraging unlimited free virtual GP consultations + 3 annual in-person visits without depleting savings, DSP pharmacy required",
            category: "Young Digital Health Consumer",
            strategic_intent: "Day_to_Day_Certainty"
        },
        defaults: {
            income: 11000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 27,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0,
            chronic_needs: "CDL + Depression",
            required_benefits: [
                "Unlimited Virtual GP",
                "3 Face-to-Face GP",
                "Hospital Network",
                "Depression R2160"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-flexifedsavvy-network-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Single R1,155/month. UNIQUE BENEFIT: Unlimited virtual GP consultations + 3 face-to-face network GP visits paid from RISK (R0 cost). Non-network: 2 consults per FAMILY (not per beneficiary) subject to 3-visit cap. Can activate R6,528 backup savings in R600 increments via USSD only if needed. Age-restricted to under-35.",
            primary_risk_warning: "Strict network hospital requirement: 30% co-payment on voluntary non-network hospital use, R2,710 co-payment on non-network day surgery. Non-network GP/Specialist consults LIMITED to R2,580 per FAMILY per year. Must use Clicks/Dis-Chem/Pharmacy Direct Courier for chronic meds (25% penalty). R9,330 co-payment on elective C-sections.",
            utilization_assumptions: {
                gp_visits_frequency: "High (unlimited virtual benefit)",
                chronic_script_consistency: 0,
                break_even_point: "Unlimited virtual GP visits = R0 cost vs R450-600/visit self-funded. 3 face-to-face = R1,800+ value. Age gate at 35 triggers forced upgrade."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "AGE 35 CLIFF: Plan becomes unavailable, mandatory upgrade to flexiFED 1+ or leave scheme. Virtual GP model collapses without savings activation."
            }
        }
    },
    {
        slug: "fedhealth-flexifedsavvy-savings-under35-young-family-cesarean-risk-2026",
        code: "FH_SAVVY_S_CESAR_10",
        meta: {
            title: "Under-35 Young Family C-Section Acceptor",
            marketing_heading: "Budget Maternity with R9,330 C-Section Co-Pay",
            description: "Couples under 35 planning natural birth, accepting R9,330 elective C-section co-payment to access lowest maternity coverage with R5,388 savings",
            category: "Budget Maternity Risk",
            strategic_intent: "Cost_Reduced_Hospital_Transfer"
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
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 10776,
            chronic_needs: "None",
            required_benefits: [
                "Baby Programme",
                "Doula R3600",
                "Natural Birth Cover",
                "Unlimited Virtual GP"
            ],
            priority_tag: "maternity"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-flexifedsavvy-network-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Couple pays R1,604(M) + R1,155(A) = R2,759/month. Savings R5,388 for ALL family types (flat rate regardless of size). Baby Programme includes doula R3,600 + lactation consult. CRITICAL: R9,330 co-payment on elective C-sections. Natural birth/emergency C-section covered at PMB level. Network hospital mandatory or 30% co-payment.",
            primary_risk_warning: "R9,330 elective C-section co-payment wipes out 40% of annual savings. Non-network GP/Specialist limit R2,580 per FAMILY creates severe access constraint for couples. Age restriction under-35 means forced exit if pregnancy occurs at age 34+. No child immunisations, no infant hearing screening, no HPV vaccine covered.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (non-pregnancy related)",
                chronic_script_consistency: 0,
                break_even_point: "Elective C-section risk: R9,330 co-payment + potential NICU network constraints make this viable ONLY for confirmed natural birth plans"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Pregnancy after age 34: Must upgrade within 30 days or lose maternity benefits. Elective C-section medically indicated = R9,330 immediate liability."
            }
        }
    },
    {
        slug: "fedhealth-maximaplus-oheb-threshold-savings-mature-triple-pool-2026",
        code: "FH_MPLUS_TRIPLE_11",
        meta: {
            title: "maxima PLUS Triple-Pool Benefit Cycler",
            marketing_heading: "OHEB + Savings + Threshold for Mature Members",
            description: "Mature members (50+) strategically cycling through 3 benefit pools: OHEB R10,630(M) exhausts first, then Savings R7,728(M), then threshold R23,400(M) unlocks unlimited",
            category: "Complex Multi-Pool Strategy",
            strategic_intent: "Defined_Benefit_Cycling"
        },
        defaults: {
            income: 45000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 58,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 7728,
            chronic_needs: "61 Conditions",
            required_benefits: [
                "OHEB Pool",
                "Threshold Unlimited",
                "58 Additional Chronics",
                "Network GP After OHEB",
                "No Co-Payment in Threshold"
            ],
            priority_tag: "comprehensive"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-maximaplus-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Single R19,393/month. UNIQUE 3-POOL STRUCTURE: (1) OHEB R10,630 pays for network GP/specialists/pathology FIRST, (2) After OHEB depletes, unlimited network GP from RISK, (3) Savings R7,728 for other day-to-day, (4) Claims accumulate, threshold R23,400 unlocks unlimited refund with NO CO-PAYMENT. Total pre-threshold funding: R10,630 + R7,728 + R5,042 self-pay gap = R23,400.",
            primary_risk_warning: "58 additional chronic conditions covered BUT capped at R17,220 per beneficiary / R31,960 per family, then unlimited only for CDL. Comprehensive formulary with 40% co-payment for voluntary non-formulary use (not refundable from savings). Any pharmacy allowed. No network hospital restriction but network specialists covered in full.",
            utilization_assumptions: {
                gp_visits_frequency: "High (unlimited network benefit)",
                chronic_script_consistency: 12,
                break_even_point: "OHEB pool optimizes for members with high specialist utilization pre-threshold. Network GP unlimited after OHEB = significant value for chronic disease management."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Chronic medication cap R17,220/R31,960 triggers formulary compliance pressure. 40% non-formulary penalty creates stark cost differential."
            }
        }
    },
    {
        slug: "fedhealth-maximaplus-58chronic-biologic-osteo-senior-2026",
        code: "FH_MPLUS_BIOLOGIC_12",
        meta: {
            title: "58-Condition Biologic & Osteoarthritis Manager",
            marketing_heading: "Acne to Osteoarthritis - 85 Total Chronic Conditions",
            description: "Members ages 40-70 with multiple chronic conditions leveraging 27 CDL + 58 additional conditions including osteoarthritis, ADHD (6-18), acne (to 21), anxiety, OCD, PTSD",
            category: "Multi-Chronic Management",
            strategic_intent: "Multi_Chronic_Management"
        },
        defaults: {
            income: 38000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 62,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 14400,
            chronic_needs: "61 Conditions",
            required_benefits: [
                "Osteoarthritis",
                "Anxiety/OCD/PTSD",
                "Endometriosis",
                "ADHD for Kids",
                "Any Pharmacy",
                "R17,220 Cap Then Unlimited"
            ],
            priority_tag: "chronic"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-maximaplus-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Couple R19,393(M) + R16,739(A) = R36,132/month. 85 total chronic conditions (27 CDL unlimited + 58 additional capped at R17,220 per beneficiary, R31,960 family cap, then unlimited for CDL only). Key additional conditions: Osteoarthritis, GAD, OCD, PTSD, Endometriosis, GERD, Benign Prostatic Hyperplasia, Angina, Ankylosing Spondylitis. Any pharmacy, comprehensive formulary.",
            primary_risk_warning: "Two-tier chronic structure creates complexity: CDL conditions unlimited from R1, additional 58 conditions capped. If member has osteoarthritis (additional) + hypertension (CDL), osteoarthritis meds count toward R17,220 cap while hypertension unlimited. 40% co-payment for non-formulary = significant penalty on specialized medications.",
            utilization_assumptions: {
                gp_visits_frequency: "High (multiple chronic scripts)",
                chronic_script_consistency: 12,
                break_even_point: "R17,220 chronic cap sufficient for 90% of additional condition cases. Cap reached only with biologic therapy, specialized pain management, or multiple additional conditions simultaneously."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Reaching R17,220/R31,960 chronic cap forces choice: switch to CDL-only meds, pay 40% non-formulary co-payment, or self-fund excess. Mental health conditions (GAD, OCD, PTSD) on additional list may require expensive non-formulary medications."
            }
        }
    },
    {
        slug: "fedhealth-maximaexec-executive-threshold-10copay-reduced-chronic-2026",
        code: "FH_EXEC_10COPAY_13",
        meta: {
            title: "maxima EXEC 10% Co-Pay Threshold Acceptor",
            marketing_heading: "Lower Premium with Consistent 10% Co-Pay Above Threshold",
            description: "Executives accepting 10% co-payment in threshold (vs 0% on PLUS) for lower premium R12,273 vs R19,393, with reduced chronic cap R8,130/R14,950",
            category: "Cost-Optimized Executive",
            strategic_intent: "Risk_Management_Constraint"
        },
        defaults: {
            income: 32000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 48,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 12528,
            chronic_needs: "45 Conditions",
            required_benefits: [
                "45 Additional Chronics",
                "Any Pharmacy",
                "Unlimited Network GP After Savings",
                "R20k Mental Health",
                "Lower Premium"
            ],
            priority_tag: "executive"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-maximaexec-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Single R12,273/month (saves R7,120/month vs maxima PLUS). Savings R12,528, self-pay gap R9,332, threshold R21,860. After threshold: unlimited benefits with CONSISTENT 10% CO-PAYMENT. 72 total chronic conditions (27 CDL + 45 additional), cap R8,130 per beneficiary / R14,950 family then CDL unlimited. Mental health R20,000 family limit includes psychiatrist, psychologist, physical therapy combined.",
            primary_risk_warning: "10% co-payment applies to ALL threshold benefits including GP, specialists, pathology, radiology, basic dentistry, acute medicine, optical, appliances. Lower chronic cap (R8,130 vs R17,220 PLUS) increases risk of cap breach. Psychiatric hospitalisation only R36,910 family vs R46,500 PLUS. Non-network specialists do NOT accumulate to threshold (paid from savings only).",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 12,
                break_even_point: "10% threshold co-payment economically viable if annual threshold claims <R70,000. Above R70,000, co-payments exceed R7,120 annual premium savings vs PLUS."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Chronic medication cap R8,130/R14,950 reached faster than PLUS due to lower limit. High utilizers (>R70k annual threshold claims) pay more out-of-pocket than premium differential. 10% co-payment on diagnostics/specialists creates accumulating cost burden."
            }
        }
    },
    {
        slug: "fedhealth-maximaexec-lower-oncology-core-protocol-family-2026",
        code: "FH_EXEC_ONCO_14",
        meta: {
            title: "maxima EXEC Core Oncology Protocol Family",
            marketing_heading: "R643k Oncology Limit with Core Protocols",
            description: "Families accepting ICON Core protocols (vs Enhanced on PLUS) and R643,340 oncology limit (vs unlimited enhanced PLUS) for 37% lower premium",
            category: "Oncology Budget Constraint",
            strategic_intent: "Defined_Cancer_Risk_Transfer"
        },
        defaults: {
            income: 42000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 45,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 30816,
            chronic_needs: "45 Conditions",
            required_benefits: [
                "R643k Oncology",
                "ICON Core Protocols",
                "Bone Marrow Transplant R643k",
                "Renal Dialysis R643k",
                "10% Threshold Copay"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-maximaexec-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Family R12,273(M) + R10,653(A) + R3,792(C) + R3,792(C) = R30,510/month vs R42,123 on maxima PLUS (saves R139,356/year). Oncology R643,340 limit with ICON Core protocols (more restrictive than Enhanced). Bone marrow transplant R643,340 (vs unlimited PLUS), renal dialysis R643,340 at cost at PMB (vs unlimited PLUS). R200,630 specialized drugs limit (vs R402,500 PLUS).",
            primary_risk_warning: "Core protocols more restrictive than Enhanced: limited chemotherapy options, biologic access constrained. R643,340 oncology limit can be exhausted in 8-12 months of aggressive treatment. 25% DSP non-use co-payment on oncology medications creates formulary lock-in. Specialized drugs R200k limit restricts immunotherapy/targeted therapy access. Bone marrow transplant R643k may be insufficient (typical cost R800k-1.2M).",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (4-8 visits/year)",
                chronic_script_consistency: 6,
                break_even_point: "Viable for early-stage cancer (Stage I-II) with surgery + short chemotherapy. High-risk for Stage III-IV, multiple lines of treatment, biologic therapy, or transplant scenarios."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "R643,340 oncology limit breach triggers out-of-pocket liability. Core protocol restrictions may force patient to fund Enhanced protocol drugs difference. Multiple chronic conditions + cancer exhausts both R14,950 chronic family cap AND R643k oncology limit simultaneously."
            }
        }
    },
    {
        slug: "fedhealth-flexifed1-savings-budget-starter-single-2026",
        code: "FH_F1S_STARTER_01",
        meta: {
            title: "Budget Hospital Starter",
            marketing_heading: "Young & Healthy Minimum Cover",
            description: "Singles aged 22-30 without chronic conditions seeking lowest-cost hospital protection with optional savings activation",
            category: "Entry Level Hospital",
            strategic_intent: "Disaster_Cover_Only"
        },
        defaults: {
            income: 12000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 25,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "Unlimited Hospital",
                "Trauma Cover",
                "MRI/CT"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-flexifed1-network-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Principal member contribution R2,630/month with R5,508 threshold. Optimizes for members who self-fund day-to-day and only activate savings incrementally in R600 blocks when needed.",
            primary_risk_warning: "No maternity benefits. Threshold requires R5,508 out-of-pocket before unlimited GP unlocks.",
            utilization_assumptions: {
                gp_visits_frequency: "Very Low (rely on public sector/cash)",
                chronic_script_consistency: 0,
                break_even_point: "Members spending <R459/month on day-to-day avoid savings activation"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "None - hospital plan base"
            }
        }
    },
    {
        slug: "fedhealth-flexifed1-elect-excess-acceptor-young-2026",
        code: "FH_F1E_EXCESS_02",
        meta: {
            title: "Elect Excess Risk Taker",
            marketing_heading: "Maximum Savings with Planned Procedure Risk",
            description: "Ages 22-35, no planned surgeries, accepts R15,950 excess to save R6,948/year on single membership",
            category: "Risk Optimized Hospital",
            strategic_intent: "Cost_Reduced_Hospital_Transfer"
        },
        defaults: {
            income: 15000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 28,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "Hospital Any Facility",
                "Emergency Cover"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-flexifed1-network-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Contribution R2,051/month (saves R579/month vs standard). R15,950 excess only applies to planned admissions, NOT emergencies. Gap cover essential for risk mitigation.",
            primary_risk_warning: "Excess equals 7.8 months of savings. Single planned surgery wipes out annual benefit.",
            utilization_assumptions: {
                gp_visits_frequency: "Low",
                chronic_script_consistency: 0,
                break_even_point: "Only optimal if zero planned procedures for 2+ years"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "R15,950 excess triggered on ANY planned hospital admission"
            }
        }
    },
    {
        slug: "fedhealth-flexifed1-savings-threshold-accumulator-chronic-2026",
        code: "FH_F1S_CHRONIC_03",
        meta: {
            title: "Threshold Accumulator with Depression Cover",
            marketing_heading: "Chronic Condition + GP Benefit Unlock Strategy",
            description: "Members with depression (R2,400 med benefit) racing to R5,508 threshold to unlock unlimited nominated GP at 20% copay",
            category: "Chronic + Threshold",
            strategic_intent: "Defined_Benefit_Cycling"
        },
        defaults: {
            income: 14000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 32,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 7488,
            chronic_needs: "CDL + Depression",
            required_benefits: [
                "Chronic CDL",
                "Depression Medication",
                "Threshold GP Benefit"
            ],
            priority_tag: "chronic"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-flexifed1-network-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Activate full R7,488 savings (R624/month). Claims accumulate at COST. Depression meds R2,400/year. At R5,508 threshold, unlimited nominated network GP unlocks with 20% copay + preventative dental (2 annual consults).",
            primary_risk_warning: "Must use Scriptpharm DSP for chronic meds or face 30% co-payment. Threshold dental limited to contracted dentists and approved procedures only.",
            utilization_assumptions: {
                gp_visits_frequency: "High (multiple chronic scripts)",
                chronic_script_consistency: 12,
                break_even_point: "Threshold reached month 7-8 if claiming GP + pathology + acute meds consistently"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Claims paid from D2D do NOT accumulate to threshold - creates calculation complexity"
            }
        }
    },
    {
        slug: "fedhealth-flexifed2-savings-pregnancy-planner-first-baby-2026",
        code: "FH_F2S_MATERNITY_04",
        meta: {
            title: "First Pregnancy Maternity Maximizer",
            marketing_heading: "8 Antenatal Consults + Doula + Hearing Screening",
            description: "Couples planning first child within 12 months, optimizing flexiFED 2's superior maternity package",
            category: "Maternity Focused",
            strategic_intent: "Maternity_Risk_Transfer"
        },
        defaults: {
            income: 18000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 29,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 16488,
            chronic_needs: "None",
            required_benefits: [
                "8 Antenatal Consults",
                "2x 2D Scans",
                "Doula R3,600",
                "Infant Hearing Test",
                "Baby Programme"
            ],
            priority_tag: "maternity"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-flexifedsavvy-network-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Couple pays R4,845(M) + R4,312(A) = R9,157/month. Savings R8,724(M) + R7,764(A) = R16,488. Maternity benefits: 8 ante/postnatal consults, 2x2D scans, amniocentesis, R3,600 doula, infant hearing screening. Can upgrade within 30 days of pregnancy confirmation.",
            primary_risk_warning: "No private ward cover for delivery. Must use Scriptpharm DSP for chronic meds (30% penalty). Paediatric consult only up to age 1.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (non-pregnancy related)",
                chronic_script_consistency: 0,
                break_even_point: "Maternity benefits deliver R15,000+ value if fully utilized"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Upgrade window closes 30 days post-conception - timing critical"
            }
        }
    },
    {
        slug: "fedhealth-flexifed2-grid-network-compliant-family-builder-2026",
        code: "FH_F2G_FAMILY_05",
        meta: {
            title: "GRID Network Family Builder",
            marketing_heading: "Hospital Savings + Maternity at 10% Discount",
            description: "Young families (1 child) willing to use 120 GRID hospitals for R5,136/year savings, accessing threshold dental after depletion",
            category: "Network Constrained Family",
            strategic_intent: "Risk_Management_Constraint"
        },
        defaults: {
            income: 22000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 31,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 19068,
            chronic_needs: "None",
            required_benefits: [
                "GRID Hospital Network",
                "Maternity",
                "Paediatric",
                "Threshold Dental"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-flexifedsavvy-network-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Family contribution R4,420(M) + R3,940(A) + R1,306(C) = R9,666/month vs R10,094 standard (saves R428/month). Total savings R8,724 + R7,764 + R2,580 = R19,068. After savings depletion + R0 gap, threshold reached immediately at R8,724(M) + R7,764(A) + R2,580(C) = R19,068. Unlocks unlimited nominated GP (20% copay) + basic dental (x-rays, scaling, fillings, extractions).",
            primary_risk_warning: "30% co-payment if voluntarily use non-GRID hospital for planned procedure. Emergency always covered at nearest hospital.",
            utilization_assumptions: {
                gp_visits_frequency: "High (due to child sickness)",
                chronic_script_consistency: 0,
                break_even_point: "GRID constraint acceptable if nearest GRID hospital <15km from home"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "30% hospital co-payment applies to ENTIRE hospital account if non-GRID used voluntarily"
            }
        }
    },
    {
        slug: "fedhealth-flexifed4-savings-network-gp-maximizer-family-2026",
        code: "FH_F4S_GPMAX_06",
        meta: {
            title: "Network GP From Rand 1 Maximizer",
            marketing_heading: "Unlimited Network GP Without Threshold Wait",
            description: "Families with high GP utilization leveraging flexiFED 4's unique 'from Rand 1' network GP benefit before reaching R22,308 threshold",
            category: "GP Benefit Aggressive",
            strategic_intent: "Day_to_Day_Certainty"
        },
        defaults: {
            income: 28000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 35,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network for Hospital/GP",
            min_savings_allocation: 35856,
            chronic_needs: "Basic",
            required_benefits: [
                "Unlimited Network GP from R1",
                "18 Additional Chronic Conditions",
                "Comprehensive Threshold",
                "Private Ward Maternity"
            ],
            priority_tag: "comprehensive"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-flexifedsavvy-network-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Family pays R7,941(M) + R7,248(A) + R2,388(C1) + R2,388(C2) = R19,965/month. Savings pool R16,200 + R14,784 + R4,872 + R4,872 = R40,728. UNIQUE BENEFIT: Network GP consults paid from RISK from Rand 1, do NOT deplete savings. After R40,728 savings + R11,524 self-pay gap, threshold R22,308(M) + R20,364(A) + R6,708(C) + R6,708(C) = R56,088 unlocks comprehensive unlimited threshold with 20% copay.",
            primary_risk_warning: "Claims accumulate at SCHEME RATE not cost. Mental health: only 2 in-network GP consults paid from risk pre/post threshold. 18 additional chronic conditions include ADHD (ages 6-18), acne (up to 21), anxiety, OCD, PTSD.",
            utilization_assumptions: {
                gp_visits_frequency: "Very High (maximizes unlimited benefit)",
                chronic_script_consistency: 6,
                break_even_point: "Optimal for families with 8+ GP visits/month across beneficiaries - GP visits don't deplete savings pool"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Must nominate network GP. Non-network GP visits self-funded and accumulate at Fedhealth Rate, creating pricing arbitrage risk."
            }
        }
    },
    {
        slug: "fedhealth-flexifed4-grid-large-family-child-cap-optimizer-2026",
        code: "FH_F4G_LARGEFAM_07",
        meta: {
            title: "4+ Child Family Capping Arbitrage",
            marketing_heading: "Only Pay for 3 Children Plus GRID Discount",
            description: "Families with 4+ children exploiting 'free 4th child' rule + GRID 10% discount + child rates to age 27",
            category: "Large Family Leverage",
            strategic_intent: "Family_Cost_Leverage"
        },
        defaults: {
            income: 35000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 4
            },
            age: 38,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 40728,
            chronic_needs: "Low",
            required_benefits: [
                "Free 4th Child",
                "Child Rates to 27",
                "Comprehensive Maternity",
                "GRID Network"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-flexifedsavvy-network-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Pays for ONLY 3 children despite having 4+. GRID discount: R5,905(M) + R5,400(A) + R1,780(C1) + R1,780(C2) + R1,780(C3) + R0(C4) = R16,645/month vs R18,493 standard (saves R22,176/year). 4th child FREE. All children charged child rate until age 27. Savings R16,200(M) + R14,784(A) + R4,872(C) + R4,872(C) + R4,872(C) + R0(C4) = R45,600 but pays for 3 kids only.",
            primary_risk_warning: "GRID constraint with 4 children requires proximity to quality GRID hospital with paediatric facilities. Must nominate network GP on GRID/Elect variants. 30% co-payment on voluntary non-GRID hospital use.",
            utilization_assumptions: {
                gp_visits_frequency: "High (unlimited network visits benefit)",
                chronic_script_consistency: 3,
                break_even_point: "4th child subsidy = R1,787/month x 12 = R21,444/year value. Child-to-27 rule extends subsidy for students."
            },
            inflection_risks: {
                income_cliff_sensitivity: true,
                deductible_trigger_event: "Child dependency review at age 27 - must prove student status or contributions jump to adult rate"
            }
        }
    },
    {
        slug: "fedhealth-flexifed4-elect-young-family-contraceptive-phase-2026",
        code: "FH_F4E_CONTRA_08",
        meta: {
            title: "Contraceptive Phase Family Spacer",
            marketing_heading: "Maximum Savings Between Pregnancies",
            description: "Young parents (ages 25-35) spacing children, using 25% Elect discount + contraceptive benefits (women up to 55) while accepting R15,950 excess",
            category: "Family Planning Phase",
            strategic_intent: "Risk_Transfer_and_Day_to_Day"
        },
        defaults: {
            income: 32000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 30,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice (Except Joint Replacement)",
            min_savings_allocation: 35856,
            chronic_needs: "None",
            required_benefits: [
                "Contraceptives from Risk",
                "Full Hospital Choice",
                "Network GP from R1",
                "Upgrade on Pregnancy"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-flexifedsavvy-network-2026",
            brand_lock: "Fedhealth",
            mathematical_basis: "Elect saves 25%: R4,935(M) + R4,600(A) + R1,515(C) = R11,050/month vs R14,791 standard (saves R44,892/year family). Contraceptives covered from RISK for women up to 55: oral, injectable, patches, rings, implants, IUDs (1 every 2 years). Can upgrade within 30 days of pregnancy. Savings R16,200 + R14,784 + R4,872 = R35,856.",
            primary_risk_warning: "R15,950 excess on planned admissions. Contraceptive must be prescribed by doctor/gynae, NOT for acne treatment. Scriptpharm DSP required for chronic meds (30% penalty).",
            utilization_assumptions: {
                gp_visits_frequency: "Low (non-pregnancy related)",
                chronic_script_consistency: 0,
                break_even_point: "Excess risk acceptable for 2-3 year gap between children. Contraceptive benefit adds R2,400-4,800/year value."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Pregnancy triggers mandatory upgrade window (30 days) - failure to upgrade loses enhanced maternity benefits"
            }
        }
    },
    {
        slug: "medihelp-medprime-elect-network-single-starter-2026",
        code: "MH-MP-ELECT-NS-2026",
        meta: {
            title: "Network Single Starter",
            marketing_heading: "Pay less by staying inside the Elect network.",
            description: "Optimises for the MedPrime Elect contribution discount by committing to network hospitals and the listed network providers (e.g., pathology and optical/dental networks) while using the plan primarily for hospital risk transfer plus controlled day-to-day spend. [file:1]",
            category: "Single",
            strategic_intent: "Network_Compliance_Arbitrage"
        },
        defaults: {
            income: 18000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 27,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "Private hospitalisation",
                "Emergency medical transport",
                "Network day-to-day cover post-savings"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "medihelp-medprime-elect-network-2026",
            brand_lock: "Medihelp",
            mathematical_basis: "Contribution minimisation subject to a hard constraint: all predictable claims must route through the Elect network set (hospital + key day-to-day categories) to preserve the pricing advantage. [file:1]",
            primary_risk_warning: "Out-of-network utilisation can convert a low-contribution strategy into a high out-of-pocket strategy if network rules apply to the service category used. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Break-even occurs when annual contribution savings from Elect exceed any incremental out-of-network payments caused by non-compliance. [file:1]"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Elect network non-compliance for hospital admission or day-to-day provider choice. [file:1]"
            }
        }
    },
    {
        slug: "medihelp-medprime-fullchoice-family-core-2026",
        code: "MH-MP-FAM-CORE-2026",
        meta: {
            title: "Full Choice Family Core",
            marketing_heading: "Family-first cover with broad private hospital access.",
            description: "Optimises for family hospital risk transfer with access to any private hospital on MedPrime (non-Elect) while using savings first and insured day-to-day benefits after savings are depleted. [file:1]",
            category: "Family",
            strategic_intent: "Family_Disaster_Leverage"
        },
        defaults: {
            income: 42000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 38,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 10,
            chronic_needs: "Basic",
            required_benefits: [
                "Any private hospital cover",
                "Specialised radiology",
                "Insured day-to-day after savings"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "medihelp-medprime-elect-network-2026",
            brand_lock: "Medihelp",
            mathematical_basis: "Maximise expected utility for a 2-child family by valuing unrestricted hospital access (no overall annual limit stated) and predictable maternity/paediatric preventive items, while treating savings as the first-loss layer. [file:1]",
            primary_risk_warning: "If savings are depleted early, day-to-day claim patterns must align to the insured day-to-day categories and provider rules to avoid gaps. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 1,
                break_even_point: "Break-even improves as probability-weighted in-hospital events increase relative to day-to-day spend. [file:1]"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "High early-year day-to-day spend that accelerates savings depletion. [file:1]"
            }
        }
    },
    {
        slug: "medihelp-medprime-family-large-children-cap-arbitrage-2026",
        code: "MH-MP-FAM-CAP-2026",
        meta: {
            title: "Large Family Child-Cap Arbitrage",
            marketing_heading: "More kids, capped contributions (where the rules cap child payments).",
            description: "Optimises for the rule that you pay for only two children under 18, turning the third+ child (under 18) into a near-zero incremental premium strategy while preserving family-level benefits. [file:1]",
            category: "Family",
            strategic_intent: "Family_Cost_Leverage"
        },
        defaults: {
            income: 52000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 4
            },
            age: 41,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 10,
            chronic_needs: "Basic",
            required_benefits: [
                "Child contribution cap",
                "Family savings account structure",
                "Private hospital cover"
            ],
            priority_tag: "value"
        },
        actuarial_logic: {
            target_plan_id: "medihelp-medprime-elect-network-2026",
            brand_lock: "Medihelp",
            mathematical_basis: "Marginal cost of child 3+ under 18 is driven toward 0 on contribution, so expected cost per covered child decreases as child count rises (subject to utilisation and benefit sub-limits). [file:1]",
            primary_risk_warning: "Higher utilisation probability in large families can exhaust savings rapidly, shifting the family into insured day-to-day rules and any related network/provider constraints. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "High (due to child sickness)",
                chronic_script_consistency: 0,
                break_even_point: "Break-even strengthens once the avoided child contributions exceed the expected extra day-to-day spending from additional children. [file:1]"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Savings depletion earlier than mid-year due to frequent paediatric GP/pharmacy use. [file:1]"
            }
        }
    },
    {
        slug: "medihelp-medprime-dependent-u26-rate-maximiser-2026",
        code: "MH-MP-U26-2026",
        meta: {
            title: "Under-26 Dependant Rate Maximiser",
            marketing_heading: "Keep dependants priced as child dependants up to 26.",
            description: "Optimises for the rule that child dependant rates apply until age 26, ideal for families supporting older teens/young adults who still need cover at a reduced dependant price point. [file:1]",
            category: "Young Adult",
            strategic_intent: "Maximise_Subsidies"
        },
        defaults: {
            income: 0,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 49,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 10,
            chronic_needs: "None",
            required_benefits: [
                "Child dependant rate until 26",
                "Private hospital cover"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "medihelp-medprime-elect-network-2026",
            brand_lock: "Medihelp",
            mathematical_basis: "Contribution optimisation by extending the lower child-dependant pricing window (to age 26) versus migrating a young adult into adult dependant pricing earlier. [file:1]",
            primary_risk_warning: "Once the dependant turns 26, contribution step-change occurs; budgeting must anticipate the pricing reclassification. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Break-even equals the cumulative saved contributions during the child-rate window versus the alternative adult-dependant cost path. [file:1]"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Age reclassification at 26 for the dependant. [file:1]"
            }
        }
    },
    {
        slug: "medihelp-medprime-preventive-contraceptive-young-adult-2026",
        code: "MH-MP-PREV-CONTRA-2026",
        meta: {
            title: "Young Adult Preventive + Contraceptive Optimiser",
            marketing_heading: "Maximise preventive benefits in the 15–26 window.",
            description: "Optimises for age-targeted preventive items such as HPV vaccinations (2 doses at 10–14 or 3 doses at 15–26) and the defined contraceptive benefits (monthly and device-cycle limits). [file:1]",
            category: "Young Adult",
            strategic_intent: "Preventative_Maximisation"
        },
        defaults: {
            income: 16000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 22,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "HPV vaccination window",
                "Contraceptive benefit",
                "Preventive screenings"
            ],
            priority_tag: "value"
        },
        actuarial_logic: {
            target_plan_id: "medihelp-medprime-elect-network-2026",
            brand_lock: "Medihelp",
            mathematical_basis: "Maximise expected value by timing preventive utilisation inside the plan’s stated age windows and benefit cycles to reduce cash spend on predictable, recurring preventive items. [file:1]",
            primary_risk_warning: "Preventive benefits can be conditional and may not apply if the condition is registered under PMB/chronic pathways (as stated for some added insured benefits). [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Low",
                chronic_script_consistency: 0,
                break_even_point: "Break-even when the value of claimed preventive/contraceptive benefits exceeds any incremental premium relative to a lower-tier plan. [file:1]"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Missing the age-window or cycle timing for vaccinations/devices. [file:1]"
            }
        }
    },
    {
        slug: "medihelp-medprime-maternity-enhanced-funding-2026",
        code: "MH-MP-MAT-ENH-2026",
        meta: {
            title: "Enhanced Maternity Funding Planner",
            marketing_heading: "Plan pregnancy with defined maternity consultations and scans.",
            description: "Optimises for the maternity basket (10 antenatal/postnatal consults, additional consult types, ultrasound scans, supplements, and newborn hearing screening) and childbirth/home delivery events. [file:1]",
            category: "Maternity",
            strategic_intent: "Enhanced_Maternity_Funding"
        },
        defaults: {
            income: 35000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 31,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 10,
            chronic_needs: "None",
            required_benefits: [
                "Maternity consultations",
                "Ultrasound scans",
                "Childbirth cover",
                "Newborn screening"
            ],
            priority_tag: "certainty"
        },
        actuarial_logic: {
            target_plan_id: "medihelp-medprime-elect-network-2026",
            brand_lock: "Medihelp",
            mathematical_basis: "Pregnancy pathway optimisation: convert a high-frequency, time-bounded utilisation pattern into funded benefits by aligning provider types and visit counts to the defined maternity basket. [file:1]",
            primary_risk_warning: "Out-of-basket maternity utilisation (extra scans/visits or non-aligned provider billing) may shift costs into savings or member out-of-pocket exposure. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (non-pregnancy related)",
                chronic_script_consistency: 0,
                break_even_point: "Break-even when funded maternity items displace cash costs that would otherwise be paid fully out-of-pocket. [file:1]"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "High-cost delivery pathway decisions (e.g., home delivery event choice vs in-hospital) that exceed planned utilisation. [file:1]"
            }
        }
    },
    {
        slug: "medihelp-medprime-new-parent-baby-u2-consult-optimiser-2026",
        code: "MH-MP-BABY-U2-2026",
        meta: {
            title: "Baby Under-2 Consultation Optimiser",
            marketing_heading: "Use the defined baby-under-2 consultation benefits efficiently.",
            description: "Optimises for the stated two consultations for children under 2 years (paediatrician/GP/ENT) plus immunisation timing and higher expected acute pharmacy/GP usage in early childhood. [file:1]",
            category: "Family",
            strategic_intent: "Day_to_Day_Certainty"
        },
        defaults: {
            income: 38000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 33,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 10,
            chronic_needs: "None",
            required_benefits: [
                "Baby under-2 consults",
                "Child immunisation support",
                "Emergency hospitalisation"
            ],
            priority_tag: "family"
        },
        actuarial_logic: {
            target_plan_id: "medihelp-medprime-elect-network-2026",
            brand_lock: "Medihelp",
            mathematical_basis: "Early-childhood utilisation is bursty and GP/pharmacy heavy; this persona optimises benefit capture by reserving the under-2 specialist-type consults for high-value events and using routine care efficiently. [file:1]",
            primary_risk_warning: "Frequent minor claims can drain savings quickly, pushing the household into insured day-to-day rules earlier than planned. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "High (due to child sickness)",
                chronic_script_consistency: 0,
                break_even_point: "Break-even when captured baby-specific consults and funded preventive items exceed the incremental premium versus a leaner family option. [file:1]"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Savings depletion before winter/peak illness season. [file:1]"
            }
        }
    },
    {
        slug: "medihelp-medprime-mental-health-transfer-enhanced-2026",
        code: "MH-MP-MH-ENH-2026",
        meta: {
            title: "Mental Health Risk Transfer (Enhanced)",
            marketing_heading: "Plan around defined psychiatric limits plus depression out-of-hospital cover.",
            description: "Optimises for the psychiatric treatment funding structure (in-hospital/professional service limits and the defined depression out-of-hospital benefit subject to registration on the mental health programme). [file:1]",
            category: "Clinical",
            strategic_intent: "Mental_Health_Risk_Transfer_Enhanced"
        },
        defaults: {
            income: 30000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 29,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 0,
            chronic_needs: "Moderate",
            required_benefits: [
                "In-hospital psychiatric cover",
                "Depression out-of-hospital benefit",
                "Psychiatric medicine support"
            ],
            priority_tag: "risk"
        },
        actuarial_logic: {
            target_plan_id: "medihelp-medprime-elect-network-2026",
            brand_lock: "Medihelp",
            mathematical_basis: "Convert tail-risk psychiatric admission cost and structured outpatient depression management into a defined-benefit framework by maintaining programme registration and utilising eligible provider types. [file:1]",
            primary_risk_warning: "Defined annual limits create a hard ceiling; sustained high utilisation may revert to self-funding once limits are reached. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 1,
                break_even_point: "Break-even when avoided private psychiatric admission/outpatient costs exceed plan premium differential. [file:1]"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Reaching psychiatric annual limits (beneficiary and family caps) in-year. [file:1]"
            }
        }
    },
    {
        slug: "medihelp-medprime-defined-cancer-transfer-family-2026",
        code: "MH-MP-CA-FAM-2026",
        meta: {
            title: "Defined Cancer Risk Transfer (Family)",
            marketing_heading: "Use the stated cancer treatment family limit strategically.",
            description: "Optimises for cancer funding using the plan’s stated family cancer treatment limit and the broader in-hospital/no-overall-annual-limit framing for other hospital events. [file:1]",
            category: "Clinical",
            strategic_intent: "Defined_Cancer_Risk_Transfer"
        },
        defaults: {
            income: 60000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 45,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 10,
            chronic_needs: "Moderate",
            required_benefits: [
                "Cancer treatment benefit",
                "Private hospitalisation",
                "Specialised radiology"
            ],
            priority_tag: "risk"
        },
        actuarial_logic: {
            target_plan_id: "medihelp-medprime-elect-network-2026",
            brand_lock: "Medihelp",
            mathematical_basis: "Tail-risk transfer: shift high-cost oncology exposure into the plan’s defined cancer funding envelope and related hospital/radiology structures. [file:1]",
            primary_risk_warning: "Cancer benefit is capped at a stated family limit, so extreme-cost cases can still generate residual exposure beyond the sub-limit. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate",
                chronic_script_consistency: 1,
                break_even_point: "Break-even at the point where probability-weighted oncology cost covered approaches the premium differential versus a plan with lower oncology scope. [file:1]"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Oncology spend approaching the cancer family limit. [file:1]"
            }
        }
    },
    {
        slug: "medihelp-medprime-chronic-cdl-pmb-transfer-2026",
        code: "MH-MP-CHRON-CDL-2026",
        meta: {
            title: "CDL/PMB Chronic Risk Transfer",
            marketing_heading: "Prioritise PMB + CDL structure when chronic risk is non-negotiable.",
            description: "Optimises for chronic and PMB structure where the plan states cover for 271 PMB diagnoses and all CDL conditions, with PMB medicine stated as unlimited (with formulary/DSP applying on Elect). [file:1]",
            category: "Chronic",
            strategic_intent: "High_Risk_Transfer"
        },
        defaults: {
            income: 28000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 52,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network for Hospital/Chronic",
            min_savings_allocation: 0,
            chronic_needs: "CDL Only",
            required_benefits: [
                "PMB coverage",
                "CDL condition support",
                "PMB medicine"
            ],
            priority_tag: "risk"
        },
        actuarial_logic: {
            target_plan_id: "medihelp-medprime-elect-network-2026",
            brand_lock: "Medihelp",
            mathematical_basis: "Optimisation for legally protected/defined pathways (PMB/CDL) to reduce catastrophic variance from chronic and life-threatening conditions through plan risk pooling. [file:1]",
            primary_risk_warning: "Non-PMB/non-CDL chronic needs may not align to the most protective benefit pathways and could create day-to-day cost pressure via savings depletion. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "High (multiple chronic scripts)",
                chronic_script_consistency: 1,
                break_even_point: "Break-even when expected chronic medicine + admissions transferred to PMB/CDL structures exceed premium load over lower options. [file:1]"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Using non-designated pathways (e.g., Elect formulary/DSP non-compliance if on Elect) for PMB medicine access. [file:1]"
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
            target_plan_id: "medihelp-medprime-elect-network-2026",
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
            target_plan_id: "medihelp-medprime-elect-network-2026",
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
        slug: "medihelp-medprime-senior-joint-degeneration-exclusion-risk-2026",
        code: "MH-MP-SEN-JOINT-2026",
        meta: {
            title: "Senior Joint Degeneration Risk (Non-PMB Constraint)",
            marketing_heading: "Understand the joint replacement constraint for non-PMB cases.",
            description: "Optimises for catastrophic cover while explicitly accepting that hip/knee/shoulder replacements in non-PMB cases are limited to replacements caused by an acute injury (creating a degenerative joint risk gap). [file:1]",
            category: "Senior",
            strategic_intent: "Risk_Exclusion_Acceptance"
        },
        defaults: {
            income: 32000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 67,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 0,
            chronic_needs: "Moderate",
            required_benefits: [
                "Private hospitalisation",
                "Trauma cover",
                "PMB protection"
            ],
            priority_tag: "risk"
        },
        actuarial_logic: {
            target_plan_id: "medihelp-medprime-elect-network-2026",
            brand_lock: "Medihelp",
            mathematical_basis: "Risk-transfer optimisation with a constraint: keep broad hospital/trauma cover while recognising that certain high-cost elective/degenerative joint pathways may not be funded unless they qualify under PMB or acute injury rules. [file:1]",
            primary_risk_warning: "Degenerative joint replacement demand can generate significant self-funding exposure if it does not qualify under PMB and is not linked to an acute injury. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 1,
                break_even_point: "Break-even when avoided admission/trauma costs dominate expected value, excluding the non-PMB degenerative joint pathway. [file:1]"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Orthopaedic event requiring joint replacement where cause is degenerative rather than acute injury. [file:1]"
            }
        }
    },
    {
        slug: "medihelp-medprime-savings-rollover-interest-maximiser-2026",
        code: "MH-MP-MSA-ROLLOVER-2026",
        meta: {
            title: "Savings Rollover + Interest Maximiser",
            marketing_heading: "Carry unused savings forward and treat savings as a planned liquidity buffer.",
            description: "Optimises for the plan feature that unused savings carry over to the next year and accumulate interest, while insured day-to-day benefits activate once savings are depleted. [file:1]",
            category: "Saver",
            strategic_intent: "MSA_Maximisation_Roll_Over"
        },
        defaults: {
            income: 55000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 40,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 20,
            chronic_needs: "Low",
            required_benefits: [
                "Savings account",
                "Insured day-to-day after savings",
                "Preventive screenings"
            ],
            priority_tag: "control"
        },
        actuarial_logic: {
            target_plan_id: "medihelp-medprime-elect-network-2026",
            brand_lock: "Medihelp",
            mathematical_basis: "Liquidity-first: minimise year-to-year leakage by preserving savings (rollover + interest) and shifting only truly necessary spend into savings, while relying on insured day-to-day only when savings are intentionally exhausted. [file:1]",
            primary_risk_warning: "Over-preserving savings can cause under-utilisation of valuable insured benefits and may increase out-of-pocket if services fall outside insured day-to-day rules. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate",
                chronic_script_consistency: 0,
                break_even_point: "Break-even when accumulated rollover + interest plus avoided cash spend exceeds any opportunity cost from a cheaper low-savings plan. [file:1]"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Unplanned high day-to-day spend that forces early savings depletion. [file:1]"
            }
        }
    },
    {
        slug: "medihelp-medprime-elect-post-savings-daytoday-network-router-2026",
        code: "MH-MP-ELECT-POSTMSA-2026",
        meta: {
            title: "Elect Post-Savings Day-to-Day Network Router",
            marketing_heading: "After savings run out, route day-to-day to the Elect lists.",
            description: "Optimises for the fact that insured day-to-day benefits become available after savings are depleted, and on Elect those day-to-day categories reference specific provider networks (GP/specialists, pathology networks, optical and dental networks). [file:1]",
            category: "Network Strategy",
            strategic_intent: "Risk_Mitigation_CoPayment"
        },
        defaults: {
            income: 24000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 36,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 0,
            chronic_needs: "Low",
            required_benefits: [
                "Insured day-to-day post-savings",
                "Network pathology",
                "Network dentistry/optometry"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "medihelp-medprime-elect-network-2026",
            brand_lock: "Medihelp",
            mathematical_basis: "Two-phase optimisation: (1) spend savings predictably early year, then (2) switch behaviour to strict network routing to maximise claim acceptance under insured day-to-day once savings is exhausted. [file:1]",
            primary_risk_warning: "If behaviour does not change post-savings, the member can experience higher out-of-pocket due to network/provider rules on insured day-to-day categories. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (relies on savings)",
                chronic_script_consistency: 0,
                break_even_point: "Break-even when contribution savings from Elect plus successful post-savings claim capture exceeds any pre-savings cash leakage. [file:1]"
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Savings depletion date occurring before high-utilisation period (e.g., winter illness season) without network-compliant routing. [file:1]"
            }
        }
    },
    {
        slug: "medshield-mediphila-hospital-starter-2026",
        code: "MS-MPH-001",
        meta: {
            title: "Starter: Compact-network hospital risk transfer",
            marketing_heading: "Unlimited in-hospital cover, low day-to-day exposure",
            description: "Designed for a single member buying first-time private cover who mainly wants unlimited in-hospital cover via the Compact Hospital Network, while keeping day-to-day usage low to avoid exhausting the family day-to-day limit early.",
            category: "Starter",
            strategic_intent: "Hospital_Risk_Transfer"
        },
        defaults: {
            income: 12000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 24,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "Unlimited in-hospital cover via Compact Hospital Network",
                "Emergency medical services",
                "SmartCare nurse practitioner consultations"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "UNRESOLVED_MEDSHIELD_MEDIPHILA_2026",
            brand_lock: "Medshield",
            mathematical_basis: "Value is maximised when admissions occur in the Compact Hospital Network (unlimited hospitalisation) and day-to-day utilisation stays materially below the family day-to-day limit of R4 700, avoiding out-of-pocket once sub-limits are depleted. [file:1]",
            primary_risk_warning: "If hospital admission is at a non-network hospital, an upfront co-payment applies; if day-to-day spending exceeds R4 700 per family per annum, additional out-of-hospital costs become member-paid. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Low",
                chronic_script_consistency: 0.1,
                break_even_point: "Break-even occurs when avoided private hospital bills (via unlimited network cover) exceed annual contributions + expected out-of-pocket from capped day-to-day."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Using a non-network hospital admission triggering an upfront co-payment."
            }
        }
    },
    {
        slug: "medshield-mediphila-family-daylimit-child-sickness-2026",
        code: "MS-MPH-002",
        meta: {
            title: "Family: Day-to-day limit defender (child sickness pattern)",
            marketing_heading: "Stretch the R4 700 day-to-day limit across a family",
            description: "Optimised for families who expect frequent GP encounters due to child illness and must actively ration GP, casualty, and acute medicine usage to prevent early exhaustion of the day-to-day limit.",
            category: "Family",
            strategic_intent: "Family_Disaster_Leverage"
        },
        defaults: {
            income: 22000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 33,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "Family day-to-day limit R4 700",
                "GP visit allocation (M0/M1/M2 visit counts)",
                "Casualty/emergency facility visits allocation"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "UNRESOLVED_MEDSHIELD_MEDIPHILA_2026",
            brand_lock: "Medshield",
            mathematical_basis: "Family cost control hinges on staying within the R4 700 per family day-to-day limit and using the relevant GP network (GP visits are capped by family-size category M0/M1/M2 and non-network behaviour escalates costs). [file:1]",
            primary_risk_warning: "High GP + acute medicine utilisation can deplete the day-to-day limit quickly, shifting remaining care to member out-of-pocket within the benefit year. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "High (due to child sickness)",
                chronic_script_consistency: 0,
                break_even_point: "Break-even is achieved when network discipline prevents 40% GP co-payments and reduces repeat out-of-pocket after day-to-day depletion."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Exhaustion of the day-to-day limit (R4 700) causing immediate cashflow shock for remaining out-of-hospital claims."
            }
        }
    },
    {
        slug: "medshield-mediphila-network-copay-avoidance-2026",
        code: "MS-MPH-003",
        meta: {
            title: "Network risk: Co-payment minimiser",
            marketing_heading: "Avoid avoidable co-payments (GP, specialists, hospital)",
            description: "Optimised for members who are at high risk of accidental out-of-network usage (travel, rural access, habit) and need a strict rule-set to avoid upfront co-payments tied to non-network utilisation.",
            category: "Risk",
            strategic_intent: "Risk_Mitigation_CoPayment"
        },
        defaults: {
            income: 18000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 1
            },
            age: 38,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 0,
            chronic_needs: "Basic",
            required_benefits: [
                "Network GP access",
                "Referral pathway to specialists",
                "Compact hospital network admissions"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "medshield-mediphila-network-2026",
            brand_lock: "Medshield",
            mathematical_basis: "The plan embeds explicit penalties for non-network behaviours: non-network hospital use triggers an upfront co-payment; specialist consults without GP referral trigger an upfront co-payment; non-network GP patterns can trigger a 40% upfront co-payment after allocated non-network usage. [file:1]",
            primary_risk_warning: "Repeated out-of-network behaviour converts a low-premium plan into high out-of-pocket exposure via stacked co-payments and day-to-day depletion. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Medium",
                chronic_script_consistency: 0.2,
                break_even_point: "Break-even occurs when avoided co-payments (20%/30%/40% events) exceed the friction cost of staying inside the network (travel/time)."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-network GP usage beyond the plan’s allowed non-network pattern, triggering a 40% upfront co-payment."
            }
        }
    },
    {
        slug: "medshield-mediphila-young-woman-contraception-script-max-2026",
        code: "MS-MPH-004",
        meta: {
            title: "Young Adult: Oral contraception script maximiser",
            marketing_heading: "Maximise 13 scripts/year within the plan rules",
            description: "Optimised for female beneficiaries who prefer oral contraception (instead of IUD) and want predictable annual utilisation of the allowed script count and per-script cap.",
            category: "Young Adult",
            strategic_intent: "Preventative_Maximisation"
        },
        defaults: {
            income: 14000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 25,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "Women’s health birth control benefit",
                "Network pharmacy access",
                "Wellness screening access"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "medshield-mediphila-network-2026",
            brand_lock: "Medshield",
            mathematical_basis: "Contraceptive medication is limited to 1 month supply with a maximum of 13 prescriptions per annum for female beneficiaries aged 14–55, subject to a per-script cap (R155 per script) and only applicable if no IUD benefit is used. [file:1]",
            primary_risk_warning: "Using both contraception medication and IUD pathways violates the plan’s ‘either/or’ framing, and out-of-network pharmacy/formulary deviations can introduce additional member costs. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Low",
                chronic_script_consistency: 0.9,
                break_even_point: "Break-even occurs when planned contraception spend stays within the capped script amounts and avoids additional GP visits for complications."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Switching to non-formulary/non-network dispensing causing additional upfront co-payments."
            }
        }
    },
    {
        slug: "medshield-mediphila-young-woman-iud-device-arbitrage-2026",
        code: "MS-MPH-005",
        meta: {
            title: "Young Adult: IUD/implant device arbitrage",
            marketing_heading: "One device, multi-year value capture",
            description: "Optimised for female beneficiaries who choose the IUD/implant benefit path (instead of oral contraception) to convert a single authorised procedure into multi-year contraception coverage.",
            category: "Young Adult",
            strategic_intent: "Preventative_Maximisation"
        },
        defaults: {
            income: 14000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 27,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "IUD and alternatives benefit",
                "Specialist network access (where applicable)",
                "Pre-authorisation workflow"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "UNRESOLVED_MEDSHIELD_MEDIPHILA_2026",
            brand_lock: "Medshield",
            mathematical_basis: "IUD/alternatives are available by application and pre-authorisation, with limits by device type (e.g., Mirena/Kyleena every 5 years; Implanon every 3 years; copper device every 2 years), and are only applicable if no contraceptive medication is used. [file:1]",
            primary_risk_warning: "If pre-authorisation is missed or the service path is taken outside required protocols, the member can face out-of-pocket costs despite the theoretical availability of the benefit. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Low",
                chronic_script_consistency: 0,
                break_even_point: "Break-even is achieved when the once-off authorised device pathway displaces repeated contraception scripts within a year."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Failure to obtain pre-authorisation for the IUD/implant insertion event."
            }
        }
    },
    {
        slug: "medshield-mediphila-maternity-compact-network-planner-2026",
        code: "MS-MPH-006",
        meta: {
            title: "Maternity: Compact network confinement planner",
            marketing_heading: "Pregnancy pathway with pre-auth and network discipline",
            description: "Optimised for pregnancy planning where value depends on pre-authorisation, Compact Hospital Network confinement, and avoiding elective/voluntary choices that trigger upfront co-payments.",
            category: "Maternity",
            strategic_intent: "Maternity_Risk_Transfer"
        },
        defaults: {
            income: 26000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 31,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "Antenatal consultations",
                "Pregnancy-related scans",
                "Confinement benefit (in-hospital) via Compact network"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "UNRESOLVED_MEDSHIELD_MEDIPHILA_2026",
            brand_lock: "Medshield",
            mathematical_basis: "Maternity benefits include defined antenatal consult counts and scan counts per pregnancy, with confinement being unlimited when using a Compact Network Hospital (and a non-network hospital attracting an upfront co-payment); the co-payment schedule also lists a voluntary caesarean upfront co-payment. [file:1]",
            primary_risk_warning: "A voluntary caesarean or non-network hospital choice can introduce large immediate co-payments that are not constrained by the day-to-day limit. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (non-pregnancy related)",
                chronic_script_consistency: 0.1,
                break_even_point: "Break-even is achieved when maternity admissions occur inside network and pre-authorisation is done correctly, avoiding large co-payment events."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Voluntary caesarean event triggering an upfront co-payment."
            }
        }
    },
    {
        slug: "medshield-mediphila-chronic-cdlplusdepression-dsp-discipline-2026",
        code: "MS-MPH-007",
        meta: {
            title: "Chronic: PMB CDL + Depression (DSP discipline)",
            marketing_heading: "PMB chronic cover, but only if you stay DSP/formulary-compliant",
            description: "Optimised for members with stable CDL conditions (including depression listed on the option’s chronic disease list) whose financial outcome depends on chronic programme registration, pharmacy network usage from rand one, and formulary adherence to avoid co-payments.",
            category: "Chronic",
            strategic_intent: "Multi_Chronic_Management"
        },
        defaults: {
            income: 20000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 45,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network for Chronic",
            min_savings_allocation: 0,
            chronic_needs: "CDL + Depression",
            required_benefits: [
                "Chronic medicine (PMB) via pharmacy network",
                "Chronic registration/authorisation programme",
                "Formulary-based dispensing"
            ],
            priority_tag: "risk"
        },
        actuarial_logic: {
            target_plan_id: "UNRESOLVED_MEDSHIELD_MEDIPHILA_2026",
            brand_lock: "Medshield",
            mathematical_basis: "Chronic medicine is PMB-only on this option and requires registration/authorisation with use of the Medshield Pharmacy Network from rand one; out-of-formulary or non-DSP usage triggers an upfront co-payment. [file:1]",
            primary_risk_warning: "Non-formulary choices or non-DSP dispensing can create recurring co-payments across monthly scripts, compounding annually. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "High (multiple chronic scripts)",
                chronic_script_consistency: 0.95,
                break_even_point: "Break-even is achieved when chronic scripts remain DSP/formulary compliant, preventing repeated co-payments over 12 months."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Switching a chronic medication to an out-of-formulary alternative resulting in an upfront co-payment."
            }
        }
    },
    {
        slug: "medshield-mediphila-mentalhealth-pmb-only-cap-2026",
        code: "MS-MPH-008",
        meta: {
            title: "Mental health: PMB-only utilisation guardrails",
            marketing_heading: "Coverage exists, but the structure is restrictive",
            description: "Optimised for beneficiaries who expect mental health utilisation and must plan around PMB-only framing, pre-authorisation requirements, and network-related co-payments for mental health admissions.",
            category: "Mental Health",
            strategic_intent: "Mental_Health_Risk_Transfer"
        },
        defaults: {
            income: 16000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 29,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0,
            chronic_needs: "CDL + Depression",
            required_benefits: [
                "Mental health (PMB) benefit access",
                "Mental health medicine sub-limit per beneficiary",
                "Pre-authorisation workflow"
            ],
            priority_tag: "risk"
        },
        actuarial_logic: {
            target_plan_id: "UNRESOLVED_MEDSHIELD_MEDIPHILA_2026",
            brand_lock: "Medshield",
            mathematical_basis: "Mental health benefits are positioned as PMB-only, require pre-authorisation, and non-network mental health hospital use is associated with an upfront co-payment per the co-payment schedule; mental health medicine has a defined beneficiary limit and can trigger co-payments if out-of-formulary or non-DSP is used. [file:1]",
            primary_risk_warning: "If treatment falls outside PMB level-of-care framing or is accessed via non-network pathways, the member can face significant co-payments and/or funding gaps. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 0.7,
                break_even_point: "Break-even occurs when correct pre-authorisation + DSP/formulary adherence avoids repeated co-payments during a mental health episode."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Mental health admission at a non-network hospital triggering an upfront co-payment."
            }
        }
    },
    {
        slug: "medshield-mediphila-oncology-icon-dsp-lock-2026",
        code: "MS-MPH-009",
        meta: {
            title: "Cancer: ICON DSP lock-in (avoid 40% oncology co-pay)",
            marketing_heading: "Oncology is covered, but provider choice is expensive",
            description: "Optimised for beneficiaries with a cancer diagnosis whose financial outcome is dominated by strict adherence to ICON/DSP processes, treatment plan submission, and avoiding non-DSP oncology providers that trigger a large co-payment.",
            category: "Oncology",
            strategic_intent: "Defined_Cancer_Risk_Transfer"
        },
        defaults: {
            income: 30000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 52,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0,
            chronic_needs: "Specialized",
            required_benefits: [
                "Oncology PMB cover via ICON protocols",
                "PET/PET-CT scan access (1 per family per annum)",
                "Oncology programme registration"
            ],
            priority_tag: "risk"
        },
        actuarial_logic: {
            target_plan_id: "UNRESOLVED_MEDSHIELD_MEDIPHILA_2026",
            brand_lock: "Medshield",
            mathematical_basis: "Oncology requires registration and treatment-plan submission under the oncology management programme (ICON protocols), and using a non-DSP attracts a 40% upfront co-payment; PET/PET-CT scans are limited to 1 per family per annum with a co-payment if a non-DSP is used. [file:1]",
            primary_risk_warning: "A single decision to use a non-DSP oncology provider can create catastrophic out-of-pocket exposure through a large percentage co-payment on high-cost claims. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "High",
                chronic_script_consistency: 0.8,
                break_even_point: "Break-even occurs when ICON/DSP compliance prevents the 40% oncology co-payment on chemotherapy/radiotherapy/medicine claims."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Selecting a non-DSP oncology provider triggering a 40% upfront co-payment."
            }
        }
    },
    {
        slug: "medshield-mediphila-dental-wisdomteeth-copay-avoid-2026",
        code: "MS-MPH-010",
        meta: {
            title: "Dental: Wisdom teeth co-payment avoidance",
            marketing_heading: "Route the event to minimise fixed co-pay shocks",
            description: "Optimised for members anticipating wisdom tooth/impacted tooth events where the plan imposes explicit upfront co-payments depending on setting (day clinic vs in-hospital) and authorisation outcomes.",
            category: "Dental",
            strategic_intent: "Defined_Dental_Funding"
        },
        defaults: {
            income: 17000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 22,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "Specialised dentistry limit (family)",
                "Pre-authorisation workflow for dental events",
                "Network dental protocols"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "UNRESOLVED_MEDSHIELD_MEDIPHILA_2026",
            brand_lock: "Medshield",
            mathematical_basis: "Dental benefits include a basic dentistry family limit and a specialised dentistry family limit, and the co-payment schedule specifies fixed upfront co-payments for wisdom teeth/impacted teeth events depending on setting (e.g., day clinic vs in-hospital). [file:1]",
            primary_risk_warning: "Poor routing (wrong facility level, missed authorisation where required) can turn a capped dentistry benefit into a large immediate cash payment due to fixed co-payments. [file:1]",
            utilization_assumptions: {
                gp_visits_frequency: "Low",
                chronic_script_consistency: 0,
                break_even_point: "Break-even occurs when event routing avoids the largest fixed co-payment and keeps the remaining costs within the annual dentistry limits."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Wisdom teeth extraction performed in a setting that triggers a large upfront co-payment."
            }
        }
    },
    {
        slug: "momentum-ingwe-connect-starter-2026",
        code: "MMS-ING-CON-ST-2026",
        meta: {
            title: "Ingwe Starter (Connect Network + State day-to-day)",
            marketing_heading: "Lowest-cost Ingwe path with hard network rules",
            description: "Optimises for entry-level private hospital access via the Connect Network while accepting State facilities for day-to-day and chronic routing when this provider choice is selected.",
            category: "Entry-Level Network",
            strategic_intent: "Disaster_Cover_Only"
        },
        defaults: {
            income: 12000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 23,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 0,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Network hospitalisation cover (Connect Network option)",
                "PMB/CDL chronic cover routing",
                "Virtual GP consultations included"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "momentum-ingwe-ingwe-network-2026",
            brand_lock: "Momentum Medical Scheme",
            mathematical_basis: "Contribution minimisation is achieved by selecting the Connect Network hospital path and accepting the associated State-facility routing for day-to-day and chronic benefits under that selection.",
            primary_risk_warning: "Non-compliance with the selected network/provider routing can trigger material co-payments (including 30% in certain cases), so utilisation must be tightly controlled.",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate",
                chronic_script_consistency: 0.6,
                break_even_point: "Best-fit when expected out-of-network usage is ~0 and routine care can be routed to State facilities per the option rules."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Hospital admission at non-selected hospital network"
            }
        }
    },
    {
        slug: "momentum-ingwe-network-family-gp-unlimited-2026",
        code: "MMS-ING-NET-FAM-GP-2026",
        meta: {
            title: "Ingwe Family (Network GP heavy use)",
            marketing_heading: "Family day-to-day stability via network GP protocols",
            description: "Designed for families that value frequent GP access inside the relevant Ingwe primary-care network rules, including pre-authorisation after high visit counts.",
            category: "Family Network",
            strategic_intent: "Day_to_Day_Certainty"
        },
        defaults: {
            income: 22000,
            family_composition: {
                main: 2,
                adult: 0,
                child: 2
            },
            age: 35,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 0,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Network GP access with protocol-based management",
                "Virtual GP consultations included",
                "Entry-level hospitalisation with no overall annual limit stated"
            ],
            priority_tag: "value"
        },
        actuarial_logic: {
            target_plan_id: "MISSING_PLAN_ID__MMS_INGWE_2026",
            brand_lock: "Momentum Medical Scheme",
            mathematical_basis: "This persona treats the option as a protocol-governed primary-care system: GP utilisation is effectively uncapped but becomes admin-constrained after a threshold (pre-authorisation after the 10th visit).",
            primary_risk_warning: "If high GP frequency spills outside the network rules, benefits can compress sharply (authorisation/co-pay exposure).",
            utilization_assumptions: {
                gp_visits_frequency: "High",
                chronic_script_consistency: 0.7,
                break_even_point: "Best-fit when most GP visits can be executed within the required network and authorisation behaviour is consistent."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "11th+ GP visit without required pre-authorisation"
            }
        }
    },
    {
        slug: "momentum-ingwe-any-hospital-network-penalty-guard-2026",
        code: "MMS-ING-ANY-PEN-2026",
        meta: {
            title: "Ingwe Any-Hospital (Penalty-aware)",
            marketing_heading: "Wants hospital flexibility but understands network penalties",
            description: "Targets members who select the Any-hospital path but still want to minimise penalty exposure by aligning day-to-day and chronic usage to the required network routing for that selection.",
            category: "Network Compliance",
            strategic_intent: "Risk_Mitigation_CoPayment"
        },
        defaults: {
            income: 18000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 1
            },
            age: 31,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Standard",
            min_savings_allocation: 0,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Any-hospital selection path",
                "Penalty avoidance strategy",
                "Virtual GP included"
            ],
            priority_tag: "risk"
        },
        actuarial_logic: {
            target_plan_id: "MISSING_PLAN_ID__MMS_INGWE_2026",
            brand_lock: "Momentum Medical Scheme",
            mathematical_basis: "The optimisation is behavioural: choose the Any-hospital lever, then execute primary-care and chronic care exactly inside the required networks to avoid 30% event co-pay dynamics.",
            primary_risk_warning: "Out-of-network hospital use (relative to the chosen network rules) can trigger a 30% co-payment on the hospital account; pre-authorisation failure also triggers 30%.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate",
                chronic_script_consistency: 0.6,
                break_even_point: "Works only if the member can consistently comply with network/provider rules."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Hospital admission without authorisation or outside chosen provider rules"
            }
        }
    },
    {
        slug: "momentum-evolve-strict-network-starter-2026",
        code: "MMS-EVO-ST-STRNET-2026",
        meta: {
            title: "Evolve Starter (Strict Network + State chronic)",
            marketing_heading: "Hospital risk transfer with strong constraints",
            description: "Optimises for Evolve Network hospitalisation while accepting State-only chronic routing and a standard per-authorisation co-payment on major medical usage.",
            category: "Restricted Network",
            strategic_intent: "Cost_Reduced_Hospital_Transfer"
        },
        defaults: {
            income: 14000,
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
            min_savings_allocation: 0,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Evolve Network hospital cover",
                "State chronic routing",
                "Virtual GP included"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "MISSING_PLAN_ID__MMS_EVOLVE_2026",
            brand_lock: "Momentum Medical Scheme",
            mathematical_basis: "Value comes from accepting tight provider controls: Evolve Network for hospitalisation plus State facilities for chronic management, in exchange for lower-price positioning.",
            primary_risk_warning: "Major Medical events typically carry a standard co-payment per authorisation (with stated exceptions), so frequent admissions/procedures can be cost-volatile.",
            utilization_assumptions: {
                gp_visits_frequency: "Low",
                chronic_script_consistency: 0.7,
                break_even_point: "Best-fit when member expects low admission frequency and can route chronic care through State facilities."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-emergency Major Medical authorisation event (standard co-payment applies)"
            }
        }
    },
    {
        slug: "momentum-evolve-maternity-copay-exception-2026",
        code: "MMS-EVO-MAT-EXC-2026",
        meta: {
            title: "Evolve Maternity Path (Co-pay exception aware)",
            marketing_heading: "Pregnancy planning inside strict network rules",
            description: "Structured for members planning maternity who want to exploit the option’s stated co-payment exception logic for maternity confinements while staying within the Evolve Network requirements.",
            category: "Maternity",
            strategic_intent: "Maternity_Risk_Transfer"
        },
        defaults: {
            income: 20000,
            family_composition: {
                main: 2,
                adult: 0,
                child: 0
            },
            age: 29,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "Maternity confinements covered",
                "Maternity programme benefits",
                "Evolve Network hospitalisation"
            ],
            priority_tag: "risk"
        },
        actuarial_logic: {
            target_plan_id: "MISSING_PLAN_ID__MMS_EVOLVE_2026",
            brand_lock: "Momentum Medical Scheme",
            mathematical_basis: "The strategy is to treat maternity as the dominant expected large claim and align usage with the plan’s stated exception set for the standard co-payment.",
            primary_risk_warning: "Non-maternity Major Medical usage still faces the standard co-payment mechanics and strict provider rules.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (non-pregnancy related)",
                chronic_script_consistency: 0,
                break_even_point: "Best-fit when maternity is the primary expected high-cost event in the year."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-maternity Major Medical authorisation event"
            }
        }
    },
    {
        slug: "momentum-incentive-associated-network-saver-2026",
        code: "MMS-INC-ASSOC-SAVE-2026",
        meta: {
            title: "Incentive Network Saver (Associated hospitals + Associated chronic)",
            marketing_heading: "Contribution-saving path with controllable penalties",
            description: "Optimises for contribution savings by selecting Associated hospitals plus Associated chronic routing (Associated doctors + courier pharmacy), while avoiding the stated 30% hospital co-payment by staying in-network.",
            category: "Network Saver",
            strategic_intent: "Network_Compliance_Arbitrage"
        },
        defaults: {
            income: 25000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 30,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network for Hospital/Chronic",
            min_savings_allocation: 0.1,
            chronic_needs: "32 Conditions",
            required_benefits: [
                "No overall annual limit for hospitalisation stated",
                "Associated hospitals option (avoid 30% hospital co-payment)",
                "32-condition chronic structure (CDL + additional conditions)"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "MISSING_PLAN_ID__MMS_INCENTIVE_2026",
            brand_lock: "Momentum Medical Scheme",
            mathematical_basis: "The optimisation is to accept provider steering (Associated hospitals + Associated chronic routing) to reduce contributions, while enforcing behavioural compliance to avoid explicit co-payment penalties.",
            primary_risk_warning: "Hospital use outside Associated hospitals (when selected) triggers a 30% co-payment on the hospital account; lack of pre-authorisation triggers a 30% event co-payment.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (relies on savings)",
                chronic_script_consistency: 0.7,
                break_even_point: "Best-fit when expected day-to-day spend stays within the fixed Savings allocation."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Hospital admission at non-Associated hospital when Associated chosen"
            }
        }
    },
    {
        slug: "momentum-incentive-oncology-limit-manager-2026",
        code: "MMS-INC-ONC-LIM-2026",
        meta: {
            title: "Incentive Oncology Limit Manager",
            marketing_heading: "Cancer funding awareness with defined cap risk",
            description: "Built for members who want to explicitly manage oncology limit exhaustion and the post-limit co-payment structure on this option.",
            category: "Oncology",
            strategic_intent: "Defined_Cancer_Risk_Transfer"
        },
        defaults: {
            income: 32000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 52,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 0.1,
            chronic_needs: "32 Conditions",
            required_benefits: [
                "Oncology benefit with stated annual limit then co-payment",
                "Hospitalisation with no overall annual limit stated"
            ],
            priority_tag: "risk"
        },
        actuarial_logic: {
            target_plan_id: "MISSING_PLAN_ID__MMS_INCENTIVE_2026",
            brand_lock: "Momentum Medical Scheme",
            mathematical_basis: "This persona treats oncology as the dominant tail risk and plans around a defined annual oncology limit plus a percentage co-payment thereafter.",
            primary_risk_warning: "Once the oncology limit is exceeded, a percentage co-payment applies; provider-routing constraints may also apply depending on chosen chronic provider settings.",
            utilization_assumptions: {
                gp_visits_frequency: "Medium",
                chronic_script_consistency: 0.8,
                break_even_point: "Best-fit when oncology risk is meaningful enough to dominate plan selection."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Oncology spend above stated annual oncology limit"
            }
        }
    },
    {
        slug: "momentum-extender-family-threshold-activator-2026",
        code: "MMS-EXT-FAM-THR-2026",
        meta: {
            title: "Extender Family (Threshold activator)",
            marketing_heading: "Savings + Extended Cover once Threshold is hit",
            description: "Designed for families expecting meaningful day-to-day spend: starts with Savings (fixed share of contribution) and then shifts into Extended Cover once the family Threshold is reached.",
            category: "Threshold Hybrid",
            strategic_intent: "Savings_and_Risk_Hybrid"
        },
        defaults: {
            income: 28000,
            family_composition: {
                main: 2,
                adult: 0,
                child: 2
            },
            age: 38,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 0.25,
            chronic_needs: "Comprehensive",
            required_benefits: [
                "Personal Medical Savings (percentage of contribution)",
                "Extended Cover after reaching Threshold",
                "Threshold scales by family size"
            ],
            priority_tag: "value"
        },
        actuarial_logic: {
            target_plan_id: "MISSING_PLAN_ID__MMS_EXTENDER_2026",
            brand_lock: "Momentum Medical Scheme",
            mathematical_basis: "Optimisation is to intentionally cross the Threshold so that additional day-to-day claims shift from self-funding gap into Extended Cover, while managing sub-limits that apply before/after Threshold.",
            primary_risk_warning: "If Savings is exhausted early, a self-funding gap exists until Threshold is met; non-compliant GP usage can introduce additional co-payment mechanics depending on chronic provider choice.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 0.75,
                break_even_point: "Break-even occurs when annual day-to-day spend materially exceeds Savings but is high enough to justify pushing through the Threshold into Extended Cover."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Savings exhausted but Threshold not yet reached (self-funding gap)"
            }
        }
    },
    {
        slug: "momentum-extender-large-family-child-cap-leverage-2026",
        code: "MMS-EXT-LF-CHCAP-2026",
        meta: {
            title: "Extender Large Family (3-child Threshold cap leverage)",
            marketing_heading: "Uses the child Threshold cap as a scaling advantage",
            description: "Targets households with more than three children, leveraging the rule that the child component of the Threshold applies only up to a maximum of three children.",
            category: "Family Cost Leverage",
            strategic_intent: "Family_Cost_Leverage"
        },
        defaults: {
            income: 32000,
            family_composition: {
                main: 2,
                adult: 0,
                child: 4
            },
            age: 40,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 0.25,
            chronic_needs: "Comprehensive",
            required_benefits: [
                "Extended Cover after Threshold",
                "Threshold child component capped at 3 children"
            ],
            priority_tag: "value"
        },
        actuarial_logic: {
            target_plan_id: "MISSING_PLAN_ID__MMS_EXTENDER_2026",
            brand_lock: "Momentum Medical Scheme",
            mathematical_basis: "Because the Threshold’s child component is capped at three children, marginal children beyond three do not increase the Threshold, improving the probability of reaching Extended Cover earlier relative to household utilisation.",
            primary_risk_warning: "This leverage only holds if utilisation remains within covered service categories/sub-limits and the family can survive any self-funding gap until Threshold is reached.",
            utilization_assumptions: {
                gp_visits_frequency: "High (due to child sickness)",
                chronic_script_consistency: 0.6,
                break_even_point: "Best-fit when family day-to-day utilisation is predictably high and consistent year-to-year."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Unexpected low utilisation causing failure to reach Threshold (Extended Cover not triggered)"
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
            target_plan_id: "MISSING_PLAN_ID__MMS_EXTENDER_2026",
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
            target_plan_id: "MISSING_PLAN_ID__MMS_SUMMIT_2026",
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
        slug: "momentum-custom-associated-hospital-penalty-avoid-2026",
        code: "MMS-CUS-ASSOC-AVOID-2026",
        meta: {
            title: "Custom Associated Hospital (Penalty avoidance)",
            marketing_heading: "Uses Associated hospitals to avoid 30% hospital co-pay",
            description: "Optimises the Associated-hospitals selection by enforcing compliance, preventing the additional 30% hospital-account co-payment that applies when the member uses non-Associated hospitals after selecting Associated hospitals.",
            category: "Network Compliance",
            strategic_intent: "Risk_Mitigation_CoPayment"
        },
        defaults: {
            income: 30000,
            family_composition: {
                main: 2,
                adult: 0,
                child: 0
            },
            age: 36,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Associated hospitals selection",
                "Avoid 30% hospital co-payment",
                "Standard Major Medical co-payment budgeting"
            ],
            priority_tag: "risk"
        },
        actuarial_logic: {
            target_plan_id: "MISSING_PLAN_ID__MMS_CUSTOM_2026",
            brand_lock: "Momentum Medical Scheme",
            mathematical_basis: "This persona treats provider selection as a financial control: pick Associated hospitals, then never deviate, because deviation stacks a 30% hospital-account co-payment on top of the standard option co-payment.",
            primary_risk_warning: "A single non-Associated admission (after selecting Associated hospitals) can materially worsen out-of-pocket due to stacking co-payment layers.",
            utilization_assumptions: {
                gp_visits_frequency: "Low (Self-funded)",
                chronic_script_consistency: 0.5,
                break_even_point: "Best-fit when hospital admissions can be planned to occur within the Associated hospital list."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Admission at non-Associated hospital when Associated selected"
            }
        }
    },
    {
        slug: "sizwehosmed-access-core-young-dsp-hospital-starter-2026",
        code: "SH-ACORE-YDSP-2026-01",
        meta: {
            title: "Access \"Core\": Young DSP Hospital Starter",
            marketing_heading: "Hospital-first cover for young, healthy members.",
            description: "Optimises for PMB-only hospital cover at DSP hospitals with low day-to-day expectations.",
            category: "Hospital plan (entry)",
            strategic_intent: "Disaster_Cover_Only"
        },
        defaults: {
            income: 18000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 22,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 0,
            chronic_needs: "CDL Only",
            required_benefits: [
                "PMB-only in-hospital cover at DSP",
                "Emergency admissions support"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-access-core-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Value comes from accepting DSP-only PMB coverage and avoiding voluntary non-DSP usage penalties.",
            primary_risk_warning: "Day-to-day benefits are highly constrained (PMB-focused); non-DSP use triggers material co-pay exposure.",
            utilization_assumptions: {
                gp_visits_frequency: "Low",
                chronic_script_consistency: 0.4,
                break_even_point: "Break-even occurs when hospital-risk probability outweighs paying for routine GP/meds out of pocket."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-emergency admission without timely pre-authorisation triggers penalties."
            }
        }
    },
    {
        slug: "sizwehosmed-access-core-non-dsp-usage-penalty-risk-2026",
        code: "SH-ACORE-NONDSP-2026-02",
        meta: {
            title: "Access \"Core\": Non-DSP Usage Penalty Risk",
            marketing_heading: "Same plan, different \"math\": price in the 30% leakage.",
            description: "Models members likely to deviate from DSP hospitals/GPs and therefore must treat co-payments as expected cost.",
            category: "Risk management",
            strategic_intent: "Risk_Mitigation_CoPayment"
        },
        defaults: {
            income: 24000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 29,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 0,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Hospital PMB cover",
                "Ability to tolerate co-pay leakage"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwe-hosmed-access-saver-network-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Expected annual cost = contributions + probability(non-DSP) * 30% of event cost + probability(late auth) * penalty effects.",
            primary_risk_warning: "Voluntary use of non-DSP hospital/GP triggers a 30% co-payment, converting the plan into partial self-insurance.",
            utilization_assumptions: {
                gp_visits_frequency: "Medium",
                chronic_script_consistency: 0.5,
                break_even_point: "Break-even fails if repeated non-DSP claims create recurring 30% co-pay leakage."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Voluntary non-DSP hospital admission event."
            }
        }
    },
    {
        slug: "sizwehosmed-access-core-maternity-bambino-registration-2026",
        code: "SH-ACORE-MAT-2026-03",
        meta: {
            title: "Access \"Core\": Bambino Maternity Path",
            marketing_heading: "When pregnancy is the utilisation driver.",
            description: "Optimises around registration-driven maternity benefits (antenatal visits, scans, vitamins limit) rather than day-to-day GP freedom.",
            category: "Maternity",
            strategic_intent: "Maternity_Risk_Transfer"
        },
        defaults: {
            income: 22000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 30,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 0,
            chronic_needs: "None",
            required_benefits: [
                "Maternity programme registration benefits",
                "Antenatal visit allowances",
                "Maternity ultrasound allowances"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwe-hosmed-access-saver-network-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "\"Strategy\": treat maternity as the single dominant claim cluster; maximise protocol-compliant, pre-authorised pathway to avoid penalties.",
            primary_risk_warning: "Non-network and non-protocol maternity utilisation can create co-pay and non-payment risk.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (non-pregnancy related)",
                chronic_script_consistency: 0,
                break_even_point: "Break-even improves materially when the maternity bundle is fully utilised under programme rules."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Failure to register/pre-authorise for maternity pathway elements."
            }
        }
    },
    {
        slug: "sizwehosmed-access-core-senior-55plus-amd-joint-constraint-2026",
        code: "SH-ACORE-S55-2026-04",
        meta: {
            title: "Access \"Core\": 55+ AMD & Joint Constraint",
            marketing_heading: "Age-gated benefits and joint-event limits change the math.",
            description: "Targets members 55+ where AMD treatment applies and joint replacement is limited to one joint per year, forcing staged utilisation planning.",
            category: "Senior risk",
            strategic_intent: "Risk_Management_Constraint"
        },
        defaults: {
            income: 30000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 58,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Strict Network for Hospital/GP",
            min_savings_allocation: 0,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Age-related macular degeneration treatment (55+)",
                "Joint replacement benefit constraint awareness"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwe-hosmed-access-saver-network-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Optimisation is \"sequencing\": prioritise the highest expected-value age-gated treatment and avoid triggering uncovered second joint events within the same year.",
            primary_risk_warning: "Multiple joint events in a single year create funding gaps due to one-joint-per-year rule.",
            utilization_assumptions: {
                gp_visits_frequency: "Medium",
                chronic_script_consistency: 0.7,
                break_even_point: "Break-even depends on whether age-gated AMD therapy is clinically needed and accessed under protocol."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Second joint replacement event in same year."
            }
        }
    },
    {
        slug: "sizwehosmed-access-saver-upfront-msa-liquidity-starter-2026",
        code: "SH-ASAVER-MSA-2026-01",
        meta: {
            title: "Access \"Saver\": Upfront MSA Liquidity Starter",
            marketing_heading: "Upfront savings-first day-to-day control.",
            description: "Optimises for predictable routine spend funded from the Medical Savings Account (MSA), with hospital PMB cover via DSP.",
            category: "Savings hybrid",
            strategic_intent: "Savings_and_Risk_Hybrid"
        },
        defaults: {
            income: 20000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 27,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network for Hospital/Chronic",
            min_savings_allocation: 0.25,
            chronic_needs: "CDL Only",
            required_benefits: [
                "MSA day-to-day funding",
                "DSP hospital PMB cover"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-access-saver-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Treat the MSA as a ring-fenced \"wallet\": allocate GP + basic meds + imaging to MSA, preserve risk benefits for true PMB events.",
            primary_risk_warning: "Once MSA is depleted, day-to-day access compresses sharply; hospital cover is DSP-restricted.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (relies on savings)",
                chronic_script_consistency: 0.6,
                break_even_point: "Break-even when expected routine spend approximates MSA value and hospital risk remains low-probability/high-severity."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Defined day procedure with deductible rules."
            }
        }
    },
    {
        slug: "sizwehosmed-access-saver-msa-exhaustion-cliff-budget-2026",
        code: "SH-ASAVER-CLFF-2026-02",
        meta: {
            title: "Access \"Saver\": MSA Exhaustion Cliff Manager",
            marketing_heading: "When you plan for the post-MSA world.",
            description: "Optimises utilisation to avoid premature MSA depletion, using the limited post-MSA extra consult rules as a hard cap.",
            category: "Budget control",
            strategic_intent: "Strict_Budget_Management"
        },
        defaults: {
            income: 17000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 1
            },
            age: 33,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network for Hospital/Chronic",
            min_savings_allocation: 0.25,
            chronic_needs: "CDL Only",
            required_benefits: [
                "MSA day-to-day funding",
                "Defined post-MSA GP/specialist extra consult allowances"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-access-saver-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Optimise by \"pacing\": convert high-frequency low-severity claims into cash/self-pay to preserve MSA for predictable high-value items.",
            primary_risk_warning: "MSA depletion converts the plan into near-hospital-only cover except tightly limited additional consults.",
            utilization_assumptions: {
                gp_visits_frequency: "High-Moderate",
                chronic_script_consistency: 0.6,
                break_even_point: "Break-even fails if routine utilisation consumes MSA early, forcing out-of-pocket for the rest of the year."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Year-to-date MSA reaches zero."
            }
        }
    },
    {
        slug: "sizwehosmed-access-saver-dsp-optical-dental-arbitrage-2026",
        code: "SH-ASAVER-DSPOD-2026-03",
        meta: {
            title: "Access \"Saver\": Optical/Dental DSP Arbitrage",
            marketing_heading: "Move claims from MSA to risk via DSP routing.",
            description: "Optimises by using the scheme DSP networks so optical/dental benefits are paid from risk rather than draining MSA.",
            category: "Network compliance",
            strategic_intent: "Network_Compliance_Arbitrage"
        },
        defaults: {
            income: 23000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 35,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0.25,
            chronic_needs: "Low",
            required_benefits: [
                "Optical benefits via DSP",
                "Dental benefits via DSP"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-access-saver-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Savings preservation \"strategy\": route eligible optical/dental spend through DSP to keep MSA for GP/specialist/imaging.",
            primary_risk_warning: "Using non-DSP providers shifts optical/dental cost into MSA, accelerating depletion.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate (relies on savings)",
                chronic_script_consistency: 0.3,
                break_even_point: "Break-even improves when DSP usage is high enough to keep MSA available through year-end."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-DSP optical/dental claim event."
            }
        }
    },
    {
        slug: "sizwehosmed-access-saver-day-procedure-deductible-scheduler-2026",
        code: "SH-ASAVER-DAYD-2026-04",
        meta: {
            title: "Access \"Saver\": Day-Procedure Deductible Scheduler",
            marketing_heading: "Same procedure, different facility = different cost.",
            description: "Optimises elective day procedures by selecting eligible day facilities to avoid acute-hospital exclusions and manage deductibles.",
            category: "Co-payment engineering",
            strategic_intent: "Risk_Mitigation_CoPayment"
        },
        defaults: {
            income: 26000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 41,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network for Hospital/Chronic",
            min_savings_allocation: 0.25,
            chronic_needs: "None",
            required_benefits: [
                "DSP hospital access",
                "Day procedure cover with deductible rules"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-access-saver-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Minimise member liability by aligning procedure setting with the plan’s day-procedure payment rules and facility exclusions.",
            primary_risk_warning: "Certain procedures are not covered if performed in acute facilities; deductible rules apply to defined procedures.",
            utilization_assumptions: {
                gp_visits_frequency: "Low-Moderate (relies on savings)",
                chronic_script_consistency: 0.2,
                break_even_point: "Break-even occurs when a single avoided non-cover/acute-facility mistake exceeds cumulative contribution differences vs alternatives."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Defined day procedure performed at wrong facility type."
            }
        }
    },
    {
        slug: "sizwehosmed-gold-ascend-family-full-choice-core-cover-2026",
        code: "SH-GA-FAMFC-2026-01",
        meta: {
            title: "Gold \"Ascend\": Family Full-Choice Cover",
            marketing_heading: "Young-family utilisation, broad hospital choice.",
            description: "Optimises for family usage patterns (GP + in/out-of-hospital needs) with access to any hospital on the non-EDO option.",
            category: "Family comprehensive",
            strategic_intent: "Family_Cost_Leverage"
        },
        defaults: {
            income: 38000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 34,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0.1,
            chronic_needs: "Basic",
            required_benefits: [
                "In- and out-of-hospital family cover",
                "Mental health PMB benefit"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-gold-ascend-edo-network-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Value lever is family \"pooling\": spread fixed contributions across higher expected utilisation without converting claims into co-pay-heavy leakage.",
            primary_risk_warning: "Non-PMB back surgery co-pay exposure and oncology/radiology limits can create tail-cost events.",
            utilization_assumptions: {
                gp_visits_frequency: "High (due to child sickness)",
                chronic_script_consistency: 0.4,
                break_even_point: "Break-even improves when mental health and family outpatient utilisation stays within protocols/limits."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-PMB back/neck surgery event."
            }
        }
    },
    {
        slug: "sizwehosmed-gold-ascend-oncology-limit-copay-guardrail-2026",
        code: "SH-GA-ONC-2026-02",
        meta: {
            title: "Gold \"Ascend\": Oncology Limit Guardrail",
            marketing_heading: "Cancer \"risk\": understand when 20% kicks in.",
            description: "Optimises for members who want defined oncology funding but must price the 20% co-payment above the stated annual limit per beneficiary.",
            category: "Cancer risk",
            strategic_intent: "Defined_Cancer_Risk_Transfer"
        },
        defaults: {
            income: 42000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 46,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0.1,
            chronic_needs: "Moderate",
            required_benefits: [
                "Oncology funding with DSP usage",
                "Ability to fund oncology co-pay above limit"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-gold-ascend-edo-network-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Expected oncology shortfall = max(0, oncology_cost - annual_limit) * 20% (non-PMB usage above limit).",
            primary_risk_warning: "Above-limit oncology utilisation triggers a 20% co-payment; non-cancer specialised drugs show no benefit on this option.",
            utilization_assumptions: {
                gp_visits_frequency: "Medium",
                chronic_script_consistency: 0.6,
                break_even_point: "Break-even depends on whether oncology spend remains below the plan limit and follows DSP protocols."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Oncology utilisation exceeds annual limit."
            }
        }
    },
    {
        slug: "sizwehosmed-gold-ascend-diagnostic-mri-ct-nonpmb-copay-2026",
        code: "SH-GA-DIAG-2026-03",
        meta: {
            title: "Gold \"Ascend\": Non-PMB MRI/CT Copay Manager",
            marketing_heading: "Diagnostics are funded—until they aren’t.",
            description: "Optimises imaging pathway for members likely to need advanced radiology and must incorporate non-PMB co-payment rules into expected cost.",
            category: "Diagnostics",
            strategic_intent: "Diagnostic_Risk_Transfer"
        },
        defaults: {
            income: 36000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 39,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0.1,
            chronic_needs: "Low",
            required_benefits: [
                "Advanced radiology access",
                "Known non-PMB imaging co-pay handling"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-gold-ascend-edo-network-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Imaging expected cost includes plan limit-sharing plus an additional non-PMB MRI/CT co-pay percentage where applicable.",
            primary_risk_warning: "Non-PMB MRI/CT scans can trigger co-payment even within the combined in/out-of-hospital radiology limit structure.",
            utilization_assumptions: {
                gp_visits_frequency: "Medium",
                chronic_script_consistency: 0.2,
                break_even_point: "Break-even improves when imaging is PMB-eligible or clinically justified under protocols (reducing co-pay exposure)."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Non-PMB advanced scan event."
            }
        }
    },
    {
        slug: "sizwehosmed-gold-ascend-edo-network-hospital-price-leverage-2026",
        code: "SH-GAEDO-NET-2026-01",
        meta: {
            title: "Gold Ascend \"EDO\": Network Hospital Price Leverage",
            marketing_heading: "Same cover logic, network hospital constraint.",
            description: "Optimises the EDO variant by embracing scheme-network hospitals to reduce choice but improve affordability, assuming high compliance.",
            category: "Network family cover",
            strategic_intent: "Network_Compliance_Arbitrage"
        },
        defaults: {
            income: 32000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 33,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0.1,
            chronic_needs: "Basic",
            required_benefits: [
                "EDO network hospital access",
                "Family cover with protocol compliance"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-gold-ascend-edo-network-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Arbitrage comes from trading provider choice for a constrained hospital network while retaining broad benefit structures.",
            primary_risk_warning: "Non-network behaviour can convert intended savings into co-pay and payment-risk outcomes.",
            utilization_assumptions: {
                gp_visits_frequency: "High (due to child sickness)",
                chronic_script_consistency: 0.4,
                break_even_point: "Break-even improves when members can consistently use the scheme network for admissions and oncology DSP where required."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Admission outside EDO hospital network."
            }
        }
    },
    {
        slug: "sizwehosmed-value-platinum-family-full-choice-high-cover-2026",
        code: "SH-VP-FULL-2026-01",
        meta: {
            title: "Value \"Platinum\": Family Full-Choice High Cover",
            marketing_heading: "Comprehensive family cover with open hospital choice.",
            description: "Optimises for families wanting broad hospital access with a material MSA component for day-to-day funding.",
            category: "Comprehensive with savings",
            strategic_intent: "High_Liquidity_and_Control"
        },
        defaults: {
            income: 52000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 37,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0.19,
            chronic_needs: "Moderate",
            required_benefits: [
                "MSA day-to-day funding",
                "Any-hospital access"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-value-platinum-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Split-funding \"model\": routine claims funded from MSA; catastrophic/PMB funded from risk, with defined co-pay events (e.g., advanced radiology).",
            primary_risk_warning: "Advanced imaging and oncology have explicit co-pay triggers; poor planning converts claims into recurring member liability.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 0.7,
                break_even_point: "Break-even improves when the household uses enough day-to-day to harvest MSA value without repeatedly triggering event co-pays."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Advanced radiology event with scan co-pay."
            }
        }
    },
    {
        slug: "sizwehosmed-value-platinum-core-network-hospital-leverage-2026",
        code: "SH-VPCORE-NET-2026-02",
        meta: {
            title: "Value Platinum \"Core\": Network Hospital Leverage",
            marketing_heading: "High benefits, network hospital constraint.",
            description: "Optimises the Core variant by accepting hospital network restriction while still leveraging MSA for day-to-day spend.",
            category: "Network comprehensive",
            strategic_intent: "Network_Compliance_Arbitrage"
        },
        defaults: {
            income: 48000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            },
            age: 36,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0.19,
            chronic_needs: "Moderate",
            required_benefits: [
                "Network hospital access",
                "MSA day-to-day funding"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-value-platinum-core-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Arbitrage is maximised when elective admissions are routed into network hospitals and day-to-day is paced through the MSA envelope.",
            primary_risk_warning: "Network non-compliance undermines the Core variant’s intended value and may introduce payment shortfalls.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 0.7,
                break_even_point: "Break-even depends on high hospital-network compliance plus controlled MSA depletion curve."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Admission outside the scheme’s hospital network."
            }
        }
    },
    {
        slug: "sizwehosmed-value-platinum-specialised-radiology-event-copay-2026",
        code: "SH-VP-RAD-2026-03",
        meta: {
            title: "Value \"Platinum\": Specialised Radiology Event Co-pay Manager",
            marketing_heading: "Plan for the scan event co-pay.",
            description: "Optimises for members anticipating MRI/CT/PET/MUGA usage where each scan event can attract a fixed co-payment (except PMBs).",
            category: "Diagnostics",
            strategic_intent: "Maximum_Diagnostic_Funding"
        },
        defaults: {
            income: 45000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 44,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0.19,
            chronic_needs: "Low",
            required_benefits: [
                "Specialised radiology annual family limit",
                "Event co-pay transparency"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-value-platinum-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Expected annual imaging cost = contributions + scan_count * event_copay + probability(exceed_limit) * out_of_pocket.",
            primary_risk_warning: "Each scan event can trigger a fixed co-pay except PMBs, creating predictable but non-trivial leakage for frequent imaging.",
            utilization_assumptions: {
                gp_visits_frequency: "Medium",
                chronic_script_consistency: 0.3,
                break_even_point: "Break-even improves when imaging is PMB-related (co-pay exemptions) and scan count is controlled."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "MRI/CT scan event (non-PMB)."
            }
        }
    },
    {
        slug: "sizwehosmed-value-platinum-oncology-overlimit-20percent-copay-2026",
        code: "SH-VP-ONC-2026-04",
        meta: {
            title: "Value \"Platinum\": Oncology Over-Limit 20% Co-pay",
            marketing_heading: "High oncology limit, but not infinite.",
            description: "Optimises for cancer-risk members by pricing the 20% co-pay once the per-beneficiary oncology limit is exceeded.",
            category: "Cancer risk",
            strategic_intent: "Defined_Cancer_Risk_Transfer"
        },
        defaults: {
            income: 60000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 52,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0.19,
            chronic_needs: "Moderate",
            required_benefits: [
                "Oncology DSP usage",
                "Above-limit co-pay affordability"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-value-platinum-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Tail risk is explicitly \"shared\": member pays 20% of oncology spend beyond the annual per-beneficiary limit.",
            primary_risk_warning: "Exceeding the oncology limit triggers a 20% co-payment; planning must include reserve liquidity for tail events.",
            utilization_assumptions: {
                gp_visits_frequency: "Medium",
                chronic_script_consistency: 0.6,
                break_even_point: "Break-even requires oncology utilisation to stay within limit or the member to tolerate the defined co-pay above it."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Oncology spend exceeds stated annual limit."
            }
        }
    },
    {
        slug: "sizwehosmed-titanium-executive-multi-chronic-high-transfer-2026",
        code: "SH-TEXEC-CHRON-2026-01",
        meta: {
            title: "Titanium \"Executive\": Multi-Chronic High Transfer",
            marketing_heading: "Designed for long-horizon chronic management.",
            description: "Optimises for members whose dominant cost driver is chronic disease management (plan states 62 chronic conditions).",
            category: "High clinical complexity",
            strategic_intent: "Multi_Chronic_Management"
        },
        defaults: {
            income: 75000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 0
            },
            age: 49,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0.208,
            chronic_needs: "61 Conditions",
            required_benefits: [
                "High chronic condition coverage",
                "Advanced diagnostics and specialist consultations"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-titanium-executive-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Optimisation assumes high chronic script persistence and frequent specialist interactions; value is maximised when care is registered/managed under scheme protocols.",
            primary_risk_warning: "Non-adherence to managed-care protocols and formularies can produce non-payment or co-pay outcomes despite high headline cover.",
            utilization_assumptions: {
                gp_visits_frequency: "High (multiple chronic scripts)",
                chronic_script_consistency: 0.9,
                break_even_point: "Break-even occurs when chronic + specialist + diagnostic claims exceed the total contribution delta versus mid-tier options."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Protocol non-compliance leading to claim reductions."
            }
        }
    },
    {
        slug: "sizwehosmed-titanium-executive-biologic-bridge-non-cancer-limit-2026",
        code: "SH-TEXEC-BIO-2026-02",
        meta: {
            title: "Titanium \"Executive\": Biologic Bridge Funding",
            marketing_heading: "When specialised non-cancer drugs are the cost centre.",
            description: "Optimises for members needing non-cancer specialised drugs/biologicals under the stated annual per-beneficiary limit.",
            category: "Specialised drugs",
            strategic_intent: "Biologic_Bridge_Funding"
        },
        defaults: {
            income: 80000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 42,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0.208,
            chronic_needs: "Specialized",
            required_benefits: [
                "Non-cancer specialised drugs/biologicals benefit",
                "Medicine formulary + reference pricing compliance"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-titanium-executive-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Key 'constraint': biologic funding is limited per beneficiary per year; strategy is to keep regimen within cap and avoid non-formulary drift.",
            primary_risk_warning: "Annual cap on non-cancer specialised drugs can create a mid-year funding cliff if therapy cost exceeds the stated limit.",
            utilization_assumptions: {
                gp_visits_frequency: "Moderate-High",
                chronic_script_consistency: 0.85,
                break_even_point: "Break-even when biologic need is sustained and would otherwise be self-funded or excluded on lower options."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Biologic spend exceeds annual per-beneficiary limit."
            }
        }
    },
    {
        slug: "sizwehosmed-titanium-executive-orthodontics-9to21-dental-strategy-2026",
        code: "SH-TEXEC-DENT-2026-03",
        meta: {
            title: "Titanium \"Executive\": Orthodontics 9–21 Dental Strategy",
            marketing_heading: "Age-gated orthodontics changes family optimisation.",
            description: "Optimises for households timing orthodontic utilisation inside the plan’s age window, treating dental as the dominant value driver.",
            category: "Dental optimisation",
            strategic_intent: "Defined_Dental_Funding"
        },
        defaults: {
            income: 90000,
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
            min_savings_allocation: 0.208,
            chronic_needs: "None",
            required_benefits: [
                "Orthodontics benefit within age window",
                "DSP-linked specialised dental pathways"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-titanium-executive-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Timing \"optimisation\": prioritise orthodontic start and completion within the eligible age bracket to avoid losing benefit eligibility.",
            primary_risk_warning: "Starting orthodontics outside the age rule can shift the full cost to member funding.",
            utilization_assumptions: {
                gp_visits_frequency: "Low",
                chronic_script_consistency: 0,
                break_even_point: "Break-even improves when orthodontic value (and any DSP-dependent dental items) exceeds premium uplift vs lower plans."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Orthodontic treatment outside eligible age window."
            }
        }
    },
    {
        slug: "sizwehosmed-titanium-executive-senior-55plus-amd-diagnostics-2026",
        code: "SH-TEXEC-AMD-2026-04",
        meta: {
            title: "Titanium \"Executive\": 55+ AMD Diagnostics Path",
            marketing_heading: "Age-gated ophthalmology benefit utilisation.",
            description: "Optimises for older members where age-related macular degeneration treatment applies and advanced diagnostics are likely.",
            category: "Senior diagnostics",
            strategic_intent: "Preventative_Maximisation"
        },
        defaults: {
            income: 65000,
            family_composition: {
                main: 1,
                adult: 0,
                child: 0
            },
            age: 60,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 0.208,
            chronic_needs: "Moderate",
            required_benefits: [
                "AMD treatment (55+)",
                "Specialised radiology access"
            ],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "sizwehosmed-titanium-executive-2026",
            brand_lock: "Sizwe Hosmed",
            mathematical_basis: "Optimisation is protocol \"adherence\": ensure AMD treatment is authorised and clinically justified to preserve payment at tariff and avoid reductions.",
            primary_risk_warning: "Non-authorised or non-protocol advanced diagnostics can trigger co-pays or re-pricing even on high-end cover.",
            utilization_assumptions: {
                gp_visits_frequency: "Medium",
                chronic_script_consistency: 0.6,
                break_even_point: "Break-even improves when age-gated AMD treatment is clinically indicated and used alongside covered diagnostic pathways."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "AMD treatment attempted below age threshold."
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
            target_plan_id: "sizwehosmed-titanium-executive-2026",
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
