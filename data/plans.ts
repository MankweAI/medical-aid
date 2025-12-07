import { Plan } from '@/utils/types';

export const PLANS: Plan[] = [
    // --- 1. RHYTHM 1 (The Income Sensitive Plan) ---
    {
        id: "bestmed-rhythm1-network-2026",
        price: 1736, // Base price for display
        savings_annual: 0,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Rhythm 1",
            plan_series: "Rhythm",
            plan_type: "Network Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    { min: 0, max: 9000, main: 1736, adult: 1736, child: 715 },
                    { min: 9001, max: 14000, main: 2024, adult: 2024, child: 860 },
                    { min: 14001, max: 0, main: 3615, adult: 3615, child: 1873 } // 0 = Unlimited
                ],
                msa_structure: { type: "None", value: 0 }
            }
        ],
        network_restriction: "Network",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "Unlimited"
        },
        defined_baskets: {
            maternity: { antenatal_consults: 6, ultrasounds_2d: 2, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 2092, wellness_screening: true }
        },
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0, // Excluded unless PMB
            admission_penalty_non_network: 15025
        },
        red_flag: "Strict income verification. Voluntary use of non-DSP hospital triggers R15,025 co-payment."
    },

    // --- 2. BEAT 1 (The Network Saver) ---
    {
        id: "bestmed-beat1-network-2026",
        price: 1959,
        savings_annual: 0,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Beat 1 Network",
            plan_series: "Beat",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 1959, adult: 1523, child: 818 },
                msa_structure: { type: "None", value: 0 }
            }
        ],
        network_restriction: "Network",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 0
        },
        defined_baskets: {
            maternity: { antenatal_consults: 0, ultrasounds_2d: 0, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 0 }
        },
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 0,
            mri_scan: 2600,
            joint_replacement: 0,
            admission_penalty_non_network: 15025
        },
        red_flag: "Joint replacements excluded (PMBs only)."
    },

    // --- 3. BEAT 2 (The Savings Starter) ---
    {
        id: "bestmed-beat2-network-2026",
        price: 2775,
        savings_annual: 5328,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Beat 2 Network",
            plan_series: "Beat",
            plan_type: "Savings"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 2775, adult: 2156, child: 1167 },
                msa_structure: { type: "Percentage", value: 16 }
            }
        ],
        network_restriction: "Network",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 0
        },
        defined_baskets: {
            maternity: { antenatal_consults: 6, ultrasounds_2d: 2, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 2400 }
        },
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 0,
            mri_scan: 2500,
            joint_replacement: 0,
            admission_penalty_non_network: 15025
        },
        red_flag: "Savings account is small (16%); likely to deplete with chronic use."
    },

    // --- 4. BEAT 3 (The Maternity Choice) ---
    {
        id: "bestmed-beat3-network-2026",
        price: 4062,
        savings_annual: 7308, // Approx
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Beat 3 Network",
            plan_series: "Beat",
            plan_type: "Savings"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 4062, adult: 2898, child: 1434 },
                msa_structure: { type: "Percentage", value: 15 }
            }
        ],
        network_restriction: "Network",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: 0
        },
        defined_baskets: {
            maternity: { antenatal_consults: 9, ultrasounds_2d: 2, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 2510 }
        },
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 0,
            mri_scan: 2000,
            joint_replacement: 0,
            admission_penalty_non_network: 15025
        },
        red_flag: "Savings (15%) is lower than Beat 2, but Maternity basket is Risk-funded."
    },

    // --- 5. BEAT 4 (The Premium Savings) ---
    {
        id: "bestmed-beat4-2026",
        price: 7365,
        savings_annual: 12373,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Beat 4",
            plan_series: "Beat",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 7365, adult: 6082, child: 1821 },
                msa_structure: { type: "Percentage", value: 14 }
            }
        ],
        network_restriction: "Any",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Limited"
        },
        defined_baskets: {
            maternity: { antenatal_consults: 9, ultrasounds_2d: 2, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 2801, wellness_screening: true }
        },
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 0,
            mri_scan: 2000,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        red_flag: "Joint replacements excluded (PMBs only)."
    },

    // --- 6. PACE 1 (The Safety Net) ---
    {
        id: "bestmed-pace1-2026",
        price: 5934,
        savings_annual: 13524,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Pace 1",
            plan_series: "Pace",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 5934, adult: 4289, child: 1541 },
                msa_structure: { type: "Percentage", value: 19 }
            }
        ],
        network_restriction: "Any",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Limited"
        },
        defined_baskets: {
            maternity: { antenatal_consults: 9, ultrasounds_2d: 2, paediatrician_visits: 1 },
            preventative: { vaccinations: true, contraceptives: 2800 }
        },
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 2000,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        red_flag: "Internal Prosthesis limit R114k may require co-payment for spinal surgery."
    },

    // --- 7. PACE 4 (The Flagship) ---
    {
        id: "bestmed-pace4-2026",
        price: 12572,
        savings_annual: 4524,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Pace 4",
            plan_series: "Pace",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 12572, adult: 12572, child: 2945 },
                msa_structure: { type: "Percentage", value: 3 }
            }
        ],
        network_restriction: "Any",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: 0
        },
        defined_baskets: {
            maternity: { antenatal_consults: 9, ultrasounds_2d: 2, paediatrician_visits: 1 },
            preventative: { vaccinations: true, contraceptives: 2801 }
        },
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 1500,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        red_flag: "Extremely high premium with low savings. Designed for maximum risk transfer."
    }
];