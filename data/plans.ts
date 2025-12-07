import { Plan } from '@/utils/types';

export const PLANS: Plan[] = [
    {
        id: "bestmed-beat4-2026",
        identity: {
            scheme_name: "Bestmed Medical Scheme",
            plan_name: "Beat 4",
            plan_series: "Beat",
            plan_type: "Comprehensive"
        },
        pricing_engine: {
            model: "Fixed",
            contributions: [
                {
                    premiums: {
                        main: 7365,
                        adult: 6082,
                        child: 1821
                    }
                }
            ],
            savings_component: {
                has_savings: true,
                annual_allocation_calc: "14%"
            }
        },
        network_rules: {
            restriction_level: "Any",
            hospital_provider: "Any Private Hospital",
            chronic_provider: "DSP Pharmacies",
            gp_provider: "Any GP"
        },
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
                contraceptives_annual_limit: 2801,
                wellness_screening: true
            }
        },
        threshold_benefits: {
            above_threshold_benefit: "Limited"
        },
        risk_exposure: {
            co_payments: {
                scope_in_hospital: 2000,
                mri_scan: 2000,
                admission_penalty_non_network: 0
            },
            red_flag: "Joint replacements excluded (PMBs only)"
        }
    }
];