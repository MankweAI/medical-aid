// data/personas.ts
import { Persona } from '@/utils/persona';

export const PERSONAS: Persona[] = [
    {
        slug: "bestmed-beat1-network-student-starter-2026",
        code: "BST_B1_NET_STU",
        meta: {
            title: "The Student Starter",
            marketing_heading: "Lowest Cost Private Hospital Cover",
            description: "Ideal for students and young adults under 25. Leverage the network discount to get private accident cover for the absolute minimum monthly premium.",
            category: "Student",
            strategic_intent: "Disaster_Cover_Only"
        },
        defaults: {
            income: 12000,
            family_composition: { main: 1, adult: 0, child: 0 },
            age: 22,
            location_zone: "Specific Network Area"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0,
            chronic_needs: "PMB Only",
            required_benefits: ["Hospital Risk"],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat1-network-2026",
            brand_lock: "Bestmed",
            mathematical_basis: "Optimizes the R2,269 price point. For a healthy individual <25, the probability of hospitalization is low. This is the 'Global Minimum' premium for private hospital cover.",
            primary_risk_warning: "Out-of-hospital expenses are 100% self-funded. One GP visit will cost ~R500 out of pocket.",
            utilization_assumptions: {
                gp_visits_frequency: "Low",
                chronic_script_consistency: 0,
                break_even_point: "Self-funding day-to-day is cheaper than upgrading if annual spend < R3,000."
            },
            inflection_risks: {
                income_cliff_sensitivity: false,
                deductible_trigger_event: "Voluntary admission to Non-Network Hospital (R15,025 penalty),."
            }
        }
    },
    // --- NEW ADDITIONS ---
    {
        slug: "boncap-network-income-band-1-single-starter-2026",
        code: "BONCAP_IB1_SINGLE",
        meta: {
            title: "BonCap Income Band 1 Single Starter",
            marketing_heading: "Affordable Network-First Cover for Low-Income Singles",
            description: "Entry-level hospital and day-to-day cover for individuals earning R0-R11,930 per month who can commit to strict network compliance",
            category: "Budget Network",
            strategic_intent: "Risk_Management_Constraint"
        },
        defaults: {
            income: 9000,
            family_composition: { main: 1, adult: 0, child: 0 },
            age: 28,
            location_zone: "Network Area"
        },
        search_profile: {
            network_tolerance: "Strict Network",
            min_savings_allocation: 0,
            chronic_needs: "PMB Only",
            required_benefits: ["Unlimited Network GP", "Hospital Cover", "28 Chronic Conditions"],
            priority_tag: "budget"
        },
        actuarial_logic: {
            // UPDATED ID to match existing plan in plans.ts
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
        slug: "discovery-saver-classic-msa-high-day2day-2026",
        code: "DH_SAVER_CLASSIC_MSA",
        meta: {
            title: "Classic Saver MSA High Day‑to‑Day",
            marketing_heading: "Large Medical Savings Account at 20% with DEB and Personal Health Fund",
            description: "For members who want a sizeable Medical Savings Account (20% of contributions), Day‑to‑day Extender Benefit, Personal Health Fund up to R10,000 and 200% hospital specialists, with no Above Threshold Benefit.",
            category: "Savings Optimised",
            strategic_intent: "MSA_Maximisation_Roll_Over"
        },
        defaults: {
            income: 38000,
            family_composition: { main: 1, adult: 1, child: 1 },
            age: 39,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Full Choice",
            min_savings_allocation: 10000,
            chronic_needs: "CDL Only",
            required_benefits: [
                "Medical Savings Account at 20% of contributions",
                "Day‑to‑day Extender Benefit",
                "Personal Health Fund up to R10,000 (boosted to R20,000)",
                "200% hospital specialists"
            ],
            priority_tag: "msa_phf"
        },
        actuarial_logic: {
            // UPDATED ID to match existing plan in plans.ts
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
        slug: "fedhealth-flexifedsavvy-hospital-under35-virtual-gp-maximizer-2026",
        code: "FH_SAVVY_H_VIRTUAL_09",
        meta: {
            title: "Under-35 Virtual GP Maximizer",
            marketing_heading: "Unlimited Virtual + 3 Face-to-Face GP from Risk",
            description: "Ages 22-34 leveraging unlimited free virtual GP consultations + 3 annual in-person visits without depleting savings, DSP pharmacy required",
            category: "Young Digital Health",
            strategic_intent: "Day_to_Day_Certainty"
        },
        defaults: {
            income: 11000,
            family_composition: { main: 1, adult: 0, child: 0 },
            age: 27,
            location_zone: "Any"
        },
        search_profile: {
            network_tolerance: "Network",
            min_savings_allocation: 0,
            chronic_needs: "CDL + Depression",
            required_benefits: ["Unlimited Virtual GP", "3 Face-to-Face GP", "Hospital Network", "Depression R2160"],
            priority_tag: "budget"
        },
        actuarial_logic: {
            target_plan_id: "fedhealth-flexifedsavvy-hospital-2026",
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
    }
];