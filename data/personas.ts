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
]
    ;