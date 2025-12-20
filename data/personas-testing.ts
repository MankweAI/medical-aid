import { Persona } from '@/utils/persona';

export const PERSONAS: Persona[] = [
    {
        slug: "bestmed-pace1-family-adhd-management-2026",
        code: "BMPACE1_FAMILY_NONCDL",
        // V2 ENRICHMENT
        display_title: "ADHD & Non-CDL Cover for Your Family",
        human_insight: "Your child needs ADHD medication or similar non-CDL treatment. This plan covers 7 non-CDL conditions with a defined family limit, helping manage ongoing medication costs.",
        hero_image_tag: "placeholder",
        ui_priority: "Clinical_First",
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
            },

        }
    }
]
