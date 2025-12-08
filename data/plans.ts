import { Plan } from '@/utils/types';

export const PLANS: Plan[] = [
    // --- BESTMED PLANS ---

    // 1. RHYTHM 1 (The Income Sensitive Plan)
    {
        id: "bestmed-rhythm1-network-2026",
        price: 1736,
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
                    { min: 14001, max: 0, main: 3615, adult: 3615, child: 1873 }
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
            joint_replacement: 0,
            admission_penalty_non_network: 15025
        },
        red_flag: "Strict income verification. Voluntary use of non-DSP hospital triggers R15,025 co-payment."
    },
    // 2. BEAT 1 (The Network Saver)
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
            joint_replacement: "excluded",
            admission_penalty_non_network: 15025
        },
        red_flag: "Joint replacements excluded (PMBs only)."
    },
    // 3. BEAT 2 (The Savings Starter)
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
            joint_replacement: "excluded",
            admission_penalty_non_network: 15025
        },
        red_flag: "Savings account is small (16%); likely to deplete with chronic use."
    },
    // 4. BEAT 3 (The Maternity Choice)
    {
        id: "bestmed-beat3-network-2026",
        price: 4062,
        savings_annual: 7308,
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
            joint_replacement: "excluded",
            admission_penalty_non_network: 15025
        },
        red_flag: "Savings (15%) is lower than Beat 2, but Maternity basket is Risk-funded."
    },
    // 5. BEAT 3 Plus
    {
        id: "bestmed-beat3-plus-2026",
        price: 5042,
        savings_annual: 15126,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Beat 3 Plus",
            plan_series: "Beat",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 5042, adult: 3746, child: 1902 },
                msa_structure: { type: "Percentage", value: 25 }
            }
        ],
        network_restriction: "Any",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
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
            joint_replacement: "excluded",
            admission_penalty_non_network: 0
        },
        red_flag: "Joint replacements excluded (PMBs only). Hospital plan with 25% MSA allocation."
    },
    // 6. BEAT 4 (The Premium Savings)
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
            joint_replacement: "excluded",
            admission_penalty_non_network: 0
        },
        red_flag: "Joint replacements excluded (PMBs only)."
    },
    // 7. PACE 1 (The Safety Net)
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
    // 8. PACE 2
    {
        id: "bestmed-pace2-2026",
        price: 7306,
        savings_annual: 12274,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Pace 2",
            plan_series: "Pace",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 7306, adult: 7077, child: 1705 },
                msa_structure: { type: "Percentage", value: 14 }
            }
        ],
        network_restriction: "Any",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 0
        },
        defined_baskets: {
            maternity: { antenatal_consults: 9, ultrasounds_2d: 2, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 2510 }
        },
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 1000,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        red_flag: "None. Comprehensive plan with unlimited above-threshold benefits."
    },
    // 9. PACE 4 (The Flagship)
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
        red_flag: "Extremely high premium with low savings. Day procedure co-payment R2872."
    },
    // 10. RHYTHM 2
    {
        id: "bestmed-rhythm2-network-2026",
        price: 3516,
        savings_annual: 0,
        identity: {
            scheme_name: "Bestmed",
            plan_name: "Rhythm 2 (Network)",
            plan_series: "Rhythm",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    { min: 0, max: 5500, main: 2747, adult: 2610, child: 1653 },
                    { min: 5501, max: 8500, main: 3300, adult: 3000, child: 1759 },
                    { min: 8501, max: 0, main: 3516, adult: 3165, child: 1759 }
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
            maternity: { antenatal_consults: 9, ultrasounds_2d: 2, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 2301 }
        },
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 0,
            mri_scan: 2600,
            joint_replacement: "excluded",
            admission_penalty_non_network: 15025
        },
        red_flag: "Joint replacements excluded (PMBs only). Income-banded network plan with unlimited GP visits."
    },

    // --- BONITAS PLANS ---

    // BonCap
    {
        id: "bonitas-boncap-network-2026",
        price: 4177,
        savings_annual: 0,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "BonCap",
            plan_series: "BonCap",
            plan_type: "Capitation"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    { min: 0, max: 11930, main: 1730, adult: 1730, child: 815 },
                    { min: 11931, max: 19350, main: 2111, adult: 2111, child: 971 },
                    { min: 19351, max: 25170, main: 3404, adult: 3404, child: 1288 },
                    { min: 25171, max: 0, main: 4177, adult: 4177, child: 1585 }
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
            maternity: { antenatal_consults: 0, ultrasounds_2d: 2, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 1330 }
        },
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 1230,
            joint_replacement: "Excluded",
            admission_penalty_non_network: "30%"
        },
        red_flag: "Joint replacement surgery excluded; Back/neck surgery excluded; Caesarean sections for non-medical reasons excluded. Strict network restriction applies."
    },

    // BonClassic
    {
        id: "bonitas-bonclassic-network-2026",
        price: 8238,
        savings_annual: 14832,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "BonClassic",
            plan_series: "BonClassic",
            plan_type: "Savings"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 8238, adult: 7071, child: 2034 },
                msa_structure: { type: "Fixed", value: 14832 }
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
            maternity: { antenatal_consults: 12, ultrasounds_2d: 2, paediatrician_visits: 3 },
            preventative: { vaccinations: true, contraceptives: 2050 }
        },
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 2800,
            joint_replacement: 0,
            admission_penalty_non_network: "30%"
        },
        red_flag: "High co-payments for non-network usage (30%). Out-of-hospital specialist cover is paid exclusively from savings."
    },

    // BonComprehensive
    {
        id: "bonitas-boncomprehensive-any-2026",
        price: 12509,
        savings_annual: 22512,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "BonComprehensive",
            plan_series: "Bon",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 12509, adult: 11796, child: 2548 },
                msa_structure: { type: "Fixed", value: 22512 }
            }
        ],
        network_restriction: "Any",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 150,
            specialist_out_hospital: 0,
            gp_network_consults: "Paid from Savings/ATB"
        },
        defined_baskets: {
            maternity: { antenatal_consults: 12, ultrasounds_2d: 2, paediatrician_visits: 3 },
            preventative: { vaccinations: true, contraceptives: 2050 }
        },
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 2800,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        red_flag: "30% co-payment for non-formulary chronic medicine."
    },

    // BonCore
    {
        id: "bonitas-boncore-network-2026",
        price: 1275,
        savings_annual: 0,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "BonCore (Network)",
            plan_series: "BonCore",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 1275, adult: 1275, child: 1275 },
                msa_structure: { type: "None", value: 0 }
            }
        ],
        network_restriction: "Network",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 70,
            gp_network_consults: 3
        },
        defined_baskets: {
            maternity: { antenatal_consults: 0, ultrasounds_2d: 0, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 0 }
        },
        procedure_copays: {
            scope_in_hospital: 5550,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: "Not covered",
            admission_penalty_non_network: 14680
        },
        red_flag: "Extensive list of surgical procedures not covered, including back and neck surgery, joint replacement surgery, hernia repair."
    },

    // BonPrime
    {
        id: "bonitas-bonprime-any-2026",
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
                pricing_matrix: { main: 3255, adult: 2546, child: 1035 },
                msa_structure: { type: "Percentage", value: 16 }
            }
        ],
        network_restriction: "Any",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        defined_baskets: {
            maternity: { antenatal_consults: 6, ultrasounds_2d: 2, paediatrician_visits: 2 },
            preventative: { vaccinations: true, contraceptives: 1970 }
        },
        procedure_copays: {
            scope_in_hospital: 2020,
            scope_out_hospital: 0,
            mri_scan: 2240,
            joint_replacement: 0,
            admission_penalty_non_network: 8400
        },
        red_flag: "Multiple fixed co-payments on scoped procedures; 30% co-payments for using non-network hospitals."
    },

    // BonSave
    {
        id: "bonitas-bonsave-2026",
        price: 4047,
        savings_annual: 12144,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "BonSave",
            plan_series: "BonSave",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 4047, adult: 3059, child: 1211 },
                msa_structure: { type: "Fixed", value: "Main 12144; Adult 9180; Child 3636" }
            }
        ],
        network_restriction: "Network",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: "2 per family"
        },
        defined_baskets: {
            maternity: { antenatal_consults: 6, ultrasounds_2d: 2, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 1970 }
        },
        procedure_copays: {
            scope_in_hospital: 2020,
            scope_out_hospital: 0,
            mri_scan: 1860,
            joint_replacement: "Excluded except PMB",
            admission_penalty_non_network: 0
        },
        red_flag: "Joint replacement surgery excluded except for PMB; internal prostheses subject to strict limits."
    },

    // BonStart
    {
        id: "bonitas-bonstart-network-2026",
        price: 1603,
        savings_annual: 0,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "BonStart",
            plan_series: "BonStart",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 1603, adult: 1603, child: 1603 },
                msa_structure: { type: "Percentage", value: 0 }
            }
        ],
        network_restriction: "Network",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        defined_baskets: {
            maternity: { antenatal_consults: 0, ultrasounds_2d: 0, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 1270 }
        },
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 2800,
            joint_replacement: "Not Covered",
            admission_penalty_non_network: 12680
        },
        red_flag: "Major exclusions apply: Back/neck surgery, joint replacements, gastroscopies, colonoscopies not covered."
    },

    // BonEssential
    {
        id: "bonitas-bonessential-any-2026",
        price: 2747,
        savings_annual: 0,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "BonEssential",
            plan_series: "BonEssential",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 2747, adult: 2030, child: 888 },
                msa_structure: { type: "Percentage", value: 0 }
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
            preventative: { vaccinations: true, contraceptives: 1580 }
        },
        procedure_copays: {
            scope_in_hospital: 2020,
            scope_out_hospital: 0,
            mri_scan: 2800,
            joint_replacement: 0,
            admission_penalty_non_network: "30%"
        },
        red_flag: "30% co-payments apply for using non-network hospitals. Major exclusions apply."
    },
    // Bonitas Hospital Standard
    {
        id: "bonitas-hospital-standard-2026",
        price: 3561,
        savings_annual: 0,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "Hospital Standard",
            plan_series: "Hospital Standard",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 3561, adult: 2999, child: 1353 },
                msa_structure: { type: "Percentage", value: 0 }
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
            maternity: { antenatal_consults: 6, ultrasounds_2d: 2, paediatrician_visits: 2 },
            preventative: { vaccinations: true, contraceptives: 1580 }
        },
        procedure_copays: {
            scope_in_hospital: 2020,
            scope_out_hospital: 0,
            mri_scan: 2800,
            joint_replacement: "Excluded",
            admission_penalty_non_network: "30%"
        },
        red_flag: "Joint replacements excluded (except PMB); Back/neck surgery excluded (except PMB); 30% co-payment for non-network hospital use."
    },
    // Bonitas Primary
    {
        id: "bonitas-primary-network-2026",
        price: 3588,
        savings_annual: 0,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "Primary",
            plan_series: "Primary",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 3588, adult: 2807, child: 1141 },
                msa_structure: { type: "Percentage", value: 0 }
            }
        ],
        network_restriction: "Network",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: 100
        },
        defined_baskets: {
            maternity: { antenatal_consults: 6, ultrasounds_2d: 2, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 1970 }
        },
        procedure_copays: {
            scope_in_hospital: 2020,
            scope_out_hospital: 0,
            mri_scan: 2240,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        red_flag: "Internal and external prostheses limited to PMB only; 30% co-payment for non-network hospital admissions; 40% co-payment for non-network contraceptives"
    },
    // Bonitas Standard
    {
        id: "bonitas-standard-any-2026",
        price: 5929,
        savings_annual: 0,
        identity: {
            scheme_name: "Bonitas",
            plan_name: "Standard",
            plan_series: "Standard",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 5929, adult: 5139, child: 1740 },
                msa_structure: { type: "Percentage", value: 0 }
            }
        ],
        network_restriction: "Any",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Subject to Day-to-Day Limit"
        },
        defined_baskets: {
            maternity: { antenatal_consults: 12, ultrasounds_2d: 2, paediatrician_visits: 2 },
            preventative: { vaccinations: true, contraceptives: 2050 }
        },
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 1860,
            joint_replacement: 38560,
            admission_penalty_non_network: 0
        },
        red_flag: "R38 560 co-payment for Joint Replacements if non-DSP used; R7 420 co-payment for Cataracts if non-DSP used."
    },

    // --- DISCOVERY PLANS ---

    // Classic Saver
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
                pricing_matrix: { main: 4850, adult: 3825, child: 1943 },
                msa_structure: { type: "Percentage", value: 20 }
            }
        ],
        network_restriction: "Any",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200,
            specialist_out_hospital: 100,
            gp_network_consults: "3 consultations (post-MSA)"
        },
        defined_baskets: {
            maternity: { antenatal_consults: 8, ultrasounds_2d: 2, paediatrician_visits: 2 },
            preventative: { vaccinations: true, contraceptives: 0 }
        },
        procedure_copays: {
            scope_in_hospital: 8000,
            scope_out_hospital: 0,
            mri_scan: 4000,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        red_flag: "Upfront payment of R7,250 for day surgery procedures outside of the Day Surgery Network"
    },
    // Classic Priority
    {
        id: "discovery-classic-priority-2026",
        price: 6198,
        savings_annual: 18594,
        identity: {
            scheme_name: "Discovery Health Medical Scheme",
            plan_name: "Classic Priority",
            plan_series: "Priority",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 6198, adult: 4889, child: 2478 },
                msa_structure: { type: "Percentage", value: 25 }
            }
        ],
        network_restriction: "Any",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200,
            specialist_out_hospital: 100,
            gp_network_consults: 0
        },
        defined_baskets: {
            maternity: { antenatal_consults: 8, ultrasounds_2d: 2, paediatrician_visits: 2 },
            preventative: { vaccinations: true, contraceptives: 0 }
        },
        procedure_copays: {
            scope_in_hospital: 7500,
            scope_out_hospital: 0,
            mri_scan: 4000,
            joint_replacement: 23700,
            admission_penalty_non_network: 0
        },
        red_flag: "Upfront payments: R23,700 for Joint replacements/Spinal surgery; R11,500 for Hysterectomy; R7,250 for Day Surgery outside network. MRI first R4,000 paid from savings."
    },
    // Classic Core
    {
        id: "discovery-classic-core-any-2026",
        price: 3905,
        savings_annual: 0,
        identity: {
            scheme_name: "Discovery Health Medical Scheme",
            plan_name: "Classic Core",
            plan_series: "Core Series",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 3905, adult: 3083, child: 1562 },
                msa_structure: { type: "Percentage", value: 0 }
            }
        ],
        network_restriction: "Any",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200,
            specialist_out_hospital: 0,
            gp_network_consults: 0
        },
        defined_baskets: {
            maternity: { antenatal_consults: 8, ultrasounds_2d: 2, paediatrician_visits: 2 },
            preventative: { vaccinations: true, contraceptives: 0 }
        },
        procedure_copays: {
            scope_in_hospital: 8000,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        red_flag: "Day Surgery Network deductible of R7,250 applies if procedure performed outside network."
    },
    // Classic Comprehensive
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
                pricing_matrix: { main: 10037, adult: 9492, child: 2002 },
                msa_structure: { type: "Percentage", value: 25 }
            }
        ],
        network_restriction: "Any",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200,
            specialist_out_hospital: 100,
            gp_network_consults: 0
        },
        defined_baskets: {
            maternity: { antenatal_consults: 12, ultrasounds_2d: 2, paediatrician_visits: 2 },
            preventative: { vaccinations: true, contraceptives: 0, wellness_screening: true }
        },
        procedure_copays: {
            scope_in_hospital: 7250,
            scope_out_hospital: 0,
            mri_scan: 4000,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        red_flag: "Upfront payment of R7,250 for scopes performed outside the Day Surgery Network"
    },
    // Classic Smart
    {
        id: "discovery-classic-smart-2026",
        price: 2822,
        savings_annual: 0,
        identity: {
            scheme_name: "Discovery Health Medical Scheme",
            plan_name: "Classic Smart",
            plan_series: "Smart Series",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 2822, adult: 2227, child: 1127 },
                msa_structure: { type: "Percentage", value: 0 }
            }
        ],
        network_restriction: "Network",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        defined_baskets: {
            maternity: { antenatal_consults: 8, ultrasounds_2d: 2, paediatrician_visits: 2 },
            preventative: { vaccinations: true, contraceptives: 0 }
        },
        procedure_copays: {
            scope_in_hospital: 4650,
            scope_out_hospital: 0,
            mri_scan: 4000,
            joint_replacement: 0,
            admission_penalty_non_network: 12650
        },
        red_flag: "Day surgery network applies; Upfront payments for out-of-network admissions"
    },
    // Classic Smart Saver
    {
        id: "discovery-classic-smart-saver-network-2026",
        price: 3350,
        savings_annual: 2814,
        identity: {
            scheme_name: "Discovery Health Medical Scheme",
            plan_name: "Classic Smart Saver",
            plan_series: "Smart Saver",
            plan_type: "Saver"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 3350, adult: 2840, child: 1400 },
                msa_structure: { type: "Percentage", value: 7 }
            }
        ],
        network_restriction: "Network",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 200,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        defined_baskets: {
            maternity: { antenatal_consults: 8, ultrasounds_2d: 2, paediatrician_visits: 2 },
            preventative: { vaccinations: true, contraceptives: 2600 }
        },
        procedure_copays: {
            scope_in_hospital: 8000,
            scope_out_hospital: 0,
            mri_scan: 4000,
            joint_replacement: 0,
            admission_penalty_non_network: 12650
        },
        red_flag: "None"
    },
    // Essential Core
    {
        id: "discovery-essential-core-any-2026",
        price: 3356,
        savings_annual: 0,
        identity: {
            scheme_name: "Discovery Health Medical Scheme",
            plan_name: "Essential Core",
            plan_series: "Core Series",
            plan_type: "Hospital Plan"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 3356, adult: 2517, child: 1347 },
                msa_structure: { type: "Percentage", value: 0 }
            }
        ],
        network_restriction: "Any",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 0
        },
        defined_baskets: {
            maternity: { antenatal_consults: 8, ultrasounds_2d: 2, paediatrician_visits: 2 },
            preventative: { vaccinations: true, contraceptives: 0 }
        },
        procedure_copays: {
            scope_in_hospital: 8000,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        red_flag: "Day Surgery Network deductible of R7,250 applies if procedure performed outside network."
    },
    // KeyCare Plus
    {
        id: "discovery-keycare-plus-2026",
        price: 3980,
        savings_annual: 0,
        identity: {
            scheme_name: "Discovery Health Medical Scheme",
            plan_name: "KeyCare Plus",
            plan_series: "KeyCare",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Income_Banded",
                pricing_matrix: [
                    { min: 0, max: 10250, main: 1961, adult: 1961, child: 713 },
                    { min: 10251, max: 16600, main: 2695, adult: 2695, child: 760 },
                    { min: 16601, max: 0, main: 3980, adult: 3980, child: 1064 }
                ],
                msa_structure: { type: "Percentage", value: 0 }
            }
        ],
        network_restriction: "Network",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: "Unlimited"
        },
        defined_baskets: {
            maternity: { antenatal_consults: 8, ultrasounds_2d: 2, paediatrician_visits: 2 },
            preventative: { vaccinations: true, contraceptives: 0 }
        },
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        red_flag: "Full cover only in KeyCare Network. Hospital penalty is full account if non-network used."
    },
    // Executive
    {
        id: "discovery-executive-2026",
        price: 12338,
        savings_annual: 37014,
        identity: {
            scheme_name: "Discovery Health Medical Scheme",
            plan_name: "Executive Plan",
            plan_series: "Executive",
            plan_type: "Comprehensive"
        },
        contributions: [
            {
                pricing_model: "Fixed",
                pricing_matrix: { main: 12338, adult: 12338, child: 2358 },
                msa_structure: { type: "Percentage", value: 25 }
            }
        ],
        network_restriction: "Any",
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 300,
            specialist_out_hospital: 300,
            gp_network_consults: "Unlimited"
        },
        defined_baskets: {
            maternity: { antenatal_consults: 12, ultrasounds_2d: 2, paediatrician_visits: 2 },
            preventative: { vaccinations: true, contraceptives: 0 }
        },
        procedure_copays: {
            scope_in_hospital: 6800,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0,
            admission_penalty_non_network: 0
        },
        red_flag: "Cosmetic procedures excluded; Frail care excluded; Infertility treatment limited to ART benefit limits"
    }
];