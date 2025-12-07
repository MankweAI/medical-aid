import { Persona } from '@/utils/persona';

export const PERSONAS: Persona[] = [
    {
        slug: "beat-4-premium-coverage-2026",
        code: "BEAT_011",
        meta: {
            title: "Beat 4 Premium Coverage",
            description: "Access top-tier Beat plan benefits with maximum savings allocation and extensive in-hospital cover.",
            category: "Comprehensive"
        },
        defaults: {
            income: 42000,
            family_composition: {
                main: 1,
                adult: 1,
                child: 2
            }
        },
        search_profile: {
            network_tolerance: "Any",
            min_savings_allocation: 1500,
            chronic_needs: "Comprehensive",
            required_benefits: ["high_savings", "private_ward"],
            priority_tag: "comprehensive"
        },
        actuarial_logic: {
            target_plan_id: "bestmed-beat4-2026",
            mathematical_basis: "Premium plan with highest benefit limits in Beat series. High fixed cost trades for lower variable risk.",
            primary_risk_warning: "Joint replacements are excluded (PMB only) despite premium cost."
        }
    }
    // Add other samples from your text file here...
];
