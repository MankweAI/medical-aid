import { Plan } from '@/utils/types';

export const PLANS: Plan[] = [
    {
        id: "bestmed-beat4-2026",
        // UI Helpers (Calculated)
        price: 7365,
        savings_annual: 12373, // (R7,365 * 14%) * 12 months

        identity: {
            scheme_name: "Bestmed Medical Scheme",
            plan_name: "Beat 4",
            plan_series: "Beat",
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
                    type: "Percentage",
                    value: 14
                }
            }
        ],

        // Mapped from network_rules.restriction_level
        network_restriction: "Any",

        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Limited"
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

        // Flattened from risk_exposure.co_payments
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 0, // Added default to satisfy type
            mri_scan: 2000,
            joint_replacement: 0, // Added default (Red flag handles the exclusion context)
            admission_penalty_non_network: 0
        },

        // Flattened from risk_exposure.red_flag
        red_flag: "Joint replacements excluded (PMBs only)"
    }
];