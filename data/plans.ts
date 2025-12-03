import { PlanProduct } from '@/types/schema';

// --- DEFAULTS FOR LEGACY/MISSING DATA ---
const DEFAULT_RATES = {
    hospital_account: 100,
    specialist_in_hospital: 100,
    specialist_out_hospital: 100,
    gp_network: 100,
    gp_non_network: 80
};

const DEFAULT_BASKETS = {
    maternity: { antenatal_consults: 0, ultrasounds_2d: 0, paediatrician_visits: 0 },
    preventative: { vaccinations: false, contraceptives: 0 }
};

const DEFAULT_THRESHOLD = {
    has_spg: false,
    above_threshold_limits: 'None' as const,
    atb_sublimits: { psychology: 0, allied_health: 0 }
};

const DEFAULT_COPAYS = {
    scope_in_hospital: 0,
    scope_out_hospital: 0,
    mri_scan: 0,
    joint_replacement: 0
};

export const PLAN_DB: PlanProduct[] = [
    // =========================================================================
    // 1. BONITAS (Powered by Uploaded JSON)
    // =========================================================================
    {
        id: 'bonitas-bonstart-2026',
        name: 'BonStart',
        scheme: 'Bonitas',
        series: 'Edge',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 1603, adult: 1500, child: 700, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: { hospital_account: 100, specialist_in_hospital: 100, specialist_out_hospital: 100, gp_network: 100, gp_non_network: 100 },
        defined_baskets: { maternity: { antenatal_consults: 0, ultrasounds_2d: 0, paediatrician_visits: 0 }, preventative: { vaccinations: true, contraceptives: 1270 } },
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Network', oncology_limit: 'PMB_Only', casualty_visit: 'Not_Covered',
            procedure_copays: { scope_in_hospital: 0, scope_out_hospital: 0, mri_scan: 2800, joint_replacement: 0 }
        }
    },
    {
        id: 'bonitas-bonstart-plus-2026',
        name: 'BonStart Plus',
        scheme: 'Bonitas',
        series: 'Edge',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 1800, adult: 1700, child: 800, max_child_rate: 3 }, // Estimated
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: { hospital_account: 100, specialist_in_hospital: 100, specialist_out_hospital: 100, gp_network: 100, gp_non_network: 100 },
        defined_baskets: { maternity: { antenatal_consults: 6, ultrasounds_2d: 2, paediatrician_visits: 0 }, preventative: { vaccinations: true, contraceptives: 1270 } },
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Network', oncology_limit: 'PMB_Only', casualty_visit: 'Not_Covered',
            procedure_copays: { scope_in_hospital: 0, scope_out_hospital: 0, mri_scan: 2800, joint_replacement: 0 }
        }
    },
    {
        id: 'bonitas-bonessential-2026',
        name: 'BonEssential',
        scheme: 'Bonitas',
        series: 'Hospital',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 2500, adult: 2000, child: 800, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: { hospital_account: 100, specialist_in_hospital: 100, specialist_out_hospital: 0, gp_network: 0, gp_non_network: 0 },
        defined_baskets: { maternity: { antenatal_consults: 6, ultrasounds_2d: 2, paediatrician_visits: 0 }, preventative: { vaccinations: true, contraceptives: 1580 } },
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Network', oncology_limit: 'PMB_Only', casualty_visit: 'Co_Payment',
            procedure_copays: { scope_in_hospital: 0, scope_out_hospital: 0, mri_scan: 2800, joint_replacement: 0 }
        }
    },
    {
        id: 'bonitas-bonclassic-2026',
        name: 'BonClassic',
        scheme: 'Bonitas',
        series: 'Savings',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 8238, adult: 7520, child: 2120, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Fixed', value: 14832 },
        coverage_rates: { hospital_account: 100, specialist_in_hospital: 100, specialist_out_hospital: 100, gp_network: 100, gp_non_network: 100 },
        defined_baskets: { maternity: { antenatal_consults: 12, ultrasounds_2d: 2, paediatrician_visits: 0 }, preventative: { vaccinations: true, contraceptives: 2050 } },
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Any', oncology_limit: 336100, casualty_visit: 'Paid_from_Savings',
            procedure_copays: { scope_in_hospital: 0, scope_out_hospital: 0, mri_scan: 2800, joint_replacement: 38560 }
        }
    },
    {
        id: 'bonitas-boncomprehensive-2026',
        name: 'BonComprehensive',
        scheme: 'Bonitas',
        series: 'Savings',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 9500, adult: 9000, child: 2200, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 28000,
        savings_account: { type: 'Percentage', value: 25 },
        coverage_rates: { hospital_account: 100, specialist_in_hospital: 100, specialist_out_hospital: 100, gp_network: 100, gp_non_network: 100 },
        defined_baskets: { maternity: { antenatal_consults: 12, ultrasounds_2d: 2, paediatrician_visits: 3 }, preventative: { vaccinations: true, contraceptives: 2050 } },
        threshold_benefits: { has_spg: true, above_threshold_limits: 'Unlimited', atb_sublimits: { psychology: 0, allied_health: 0 } },
        hard_limits: {
            chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings',
            procedure_copays: { scope_in_hospital: 0, scope_out_hospital: 0, mri_scan: 2800, joint_replacement: 0 }
        }
    },
    {
        id: 'bonitas-boncap-2026',
        name: 'BonCap',
        scheme: 'Bonitas',
        series: 'Edge',
        type: 'Capitation',
        pricing_model: 'Income_Banded',
        premiums: {
            bands: [
                { min_income: 0, max_income: 11930, main: 1730, adult: 1730, child: 790 },
                { min_income: 11931, max_income: 19350, main: 2111, adult: 2111, child: 980 },
                { min_income: 19351, max_income: 25170, main: 3404, adult: 3404, child: 1560 },
                { min_income: 25171, max_income: 999999, main: 4177, adult: 4177, child: 1910 }
            ]
        },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Network', oncology_limit: 'PMB_Only', casualty_visit: 'Co_Payment',
            procedure_copays: DEFAULT_COPAYS
        }
    },
    {
        id: 'bonitas-boncore-2026',
        name: 'BonCore',
        scheme: 'Bonitas',
        series: 'Core',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 3500, adult: 2800, child: 1000, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: { hospital_account: 100, specialist_in_hospital: 100, specialist_out_hospital: 0, gp_network: 0, gp_non_network: 0 },
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk',
            procedure_copays: DEFAULT_COPAYS
        }
    },

    // =========================================================================
    // 2. BESTMED (Powered by Uploaded JSON)
    // =========================================================================
    {
        id: 'bestmed-beat-1-2026',
        name: 'Beat 1',
        scheme: 'Bestmed',
        series: 'Beat',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 2200, adult: 1700, child: 900, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: { hospital_account: 100, specialist_in_hospital: 100, specialist_out_hospital: 0, gp_network: 0, gp_non_network: 0 },
        defined_baskets: { maternity: { antenatal_consults: 6, ultrasounds_2d: 2, paediatrician_visits: 0 }, preventative: { vaccinations: true, contraceptives: 2092 } },
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk',
            procedure_copays: { scope_in_hospital: 2000, scope_out_hospital: 0, mri_scan: 2600, joint_replacement: 0 }
        }
    },
    {
        id: 'bestmed-beat-2-2026',
        name: 'Beat 2',
        scheme: 'Bestmed',
        series: 'Beat',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 2800, adult: 2200, child: 1100, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 10 },
        coverage_rates: { hospital_account: 100, specialist_in_hospital: 100, specialist_out_hospital: 100, gp_network: 100, gp_non_network: 100 },
        defined_baskets: { maternity: { antenatal_consults: 6, ultrasounds_2d: 2, paediatrician_visits: 0 }, preventative: { vaccinations: true, contraceptives: 2301 } },
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings',
            procedure_copays: { scope_in_hospital: 2000, scope_out_hospital: 0, mri_scan: 2100, joint_replacement: 0 }
        }
    },
    {
        id: 'bestmed-beat-3-2026',
        name: 'Beat 3',
        scheme: 'Bestmed',
        series: 'Beat',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 4100, adult: 3200, child: 1500, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 15 },
        coverage_rates: { hospital_account: 100, specialist_in_hospital: 100, specialist_out_hospital: 100, gp_network: 100, gp_non_network: 100 },
        defined_baskets: { maternity: { antenatal_consults: 9, ultrasounds_2d: 2, paediatrician_visits: 0 }, preventative: { vaccinations: true, contraceptives: 2510 } },
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings',
            procedure_copays: { scope_in_hospital: 2000, scope_out_hospital: 0, mri_scan: 2000, joint_replacement: 0 }
        }
    },
    {
        id: 'bestmed-beat-3-plus-2026',
        name: 'Beat 3 Plus',
        scheme: 'Bestmed',
        series: 'Beat',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 5000, adult: 4000, child: 1800, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 20 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings',
            procedure_copays: DEFAULT_COPAYS
        }
    },
    {
        id: 'bestmed-beat-4-2026',
        name: 'Beat 4',
        scheme: 'Bestmed',
        series: 'Beat',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 6500, adult: 5500, child: 2000, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 25 },
        coverage_rates: { hospital_account: 100, specialist_in_hospital: 100, specialist_out_hospital: 100, gp_network: 100, gp_non_network: 100 },
        defined_baskets: { maternity: { antenatal_consults: 9, ultrasounds_2d: 2, paediatrician_visits: 0 }, preventative: { vaccinations: true, contraceptives: 2801 } },
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings',
            procedure_copays: { scope_in_hospital: 2000, scope_out_hospital: 0, mri_scan: 2000, joint_replacement: 0 }
        }
    },
    {
        id: 'bestmed-pace-1-2026',
        name: 'Pace 1',
        scheme: 'Bestmed',
        series: 'Pace',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 5500, adult: 4500, child: 1500, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 15 },
        coverage_rates: { hospital_account: 100, specialist_in_hospital: 100, specialist_out_hospital: 100, gp_network: 100, gp_non_network: 100 },
        defined_baskets: { maternity: { antenatal_consults: 9, ultrasounds_2d: 2, paediatrician_visits: 0 }, preventative: { vaccinations: true, contraceptives: 2801 } },
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings',
            procedure_copays: { scope_in_hospital: 0, scope_out_hospital: 0, mri_scan: 2000, joint_replacement: 0 }
        }
    },
    {
        id: 'bestmed-pace-3-2026',
        name: 'Pace 3',
        scheme: 'Bestmed',
        series: 'Pace',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 8000, adult: 7000, child: 1800, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 20 },
        coverage_rates: { hospital_account: 100, specialist_in_hospital: 100, specialist_out_hospital: 100, gp_network: 100, gp_non_network: 100 },
        defined_baskets: { maternity: { antenatal_consults: 9, ultrasounds_2d: 2, paediatrician_visits: 0 }, preventative: { vaccinations: true, contraceptives: 2801 } },
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings',
            procedure_copays: { scope_in_hospital: 0, scope_out_hospital: 0, mri_scan: 1500, joint_replacement: 0 }
        }
    },
    {
        id: 'bestmed-pace-4-2026',
        name: 'Pace 4',
        scheme: 'Bestmed',
        series: 'Pace',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 10500, adult: 9800, child: 2200, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 15 },
        coverage_rates: { hospital_account: 100, specialist_in_hospital: 100, specialist_out_hospital: 100, gp_network: 100, gp_non_network: 100 },
        defined_baskets: { maternity: { antenatal_consults: 9, ultrasounds_2d: 2, paediatrician_visits: 0 }, preventative: { vaccinations: true, contraceptives: 2801 } },
        threshold_benefits: { has_spg: false, above_threshold_limits: 'Unlimited', atb_sublimits: { psychology: 0, allied_health: 0 } },
        hard_limits: {
            chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings',
            procedure_copays: { scope_in_hospital: 0, scope_out_hospital: 0, mri_scan: 1500, joint_replacement: 0 }
        }
    },

    // =========================================================================
    // 3. DISCOVERY HEALTH (DHMS)
    // =========================================================================
    {
        id: 'dhms-keycare-plus-2026',
        name: 'KeyCare Plus',
        series: 'KeyCare',
        scheme: 'Discovery',
        type: 'Capitation',
        pricing_model: 'Income_Banded',
        premiums: {
            bands: [
                { min_income: 0, max_income: 10250, main: 1961, adult: 1961, child: 713 },
                { min_income: 10251, max_income: 16600, main: 2695, adult: 2695, child: 760 },
                { min_income: 16601, max_income: 999999, main: 3980, adult: 3980, child: 1064 }
            ]
        },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'State',
            oncology_limit: 'PMB_Only',
            casualty_visit: 'Not_Covered',
            procedure_copays: DEFAULT_COPAYS
        }
    },
    {
        id: 'dhms-active-smart-2026',
        name: 'Active Smart',
        series: 'Smart',
        scheme: 'Discovery',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 1350, adult: 1350, child: 1350, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Network',
            oncology_limit: 'Unlimited',
            casualty_visit: 'Co_Payment',
            elective_deductible: 7750,
            procedure_copays: DEFAULT_COPAYS
        }
    },
    {
        id: 'dhms-classic-smart-2026',
        name: 'Classic Smart',
        series: 'Smart',
        scheme: 'Discovery',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 3018, adult: 3018, child: 3018, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: { ...DEFAULT_RATES, specialist_in_hospital: 200 },
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Network',
            oncology_limit: 'Unlimited',
            casualty_visit: 'Co_Payment',
            scope_penalty_hospital: 12650,
            procedure_copays: { ...DEFAULT_COPAYS, scope_in_hospital: 12650 }
        }
    },
    {
        id: 'dhms-essential-smart-2026',
        name: 'Essential Smart',
        series: 'Smart',
        scheme: 'Discovery',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 2161, adult: 2161, child: 2161, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Network',
            oncology_limit: 'Unlimited',
            casualty_visit: 'Co_Payment',
            procedure_copays: DEFAULT_COPAYS
        }
    },
    {
        id: 'dhms-coastal-core-2026',
        name: 'Coastal Core',
        series: 'Core',
        scheme: 'Discovery',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 3250, adult: 2440, child: 1300, max_child_rate: 3 },
        network_geofence: 'Coastal',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Any',
            oncology_limit: 'Unlimited',
            casualty_visit: 'Paid_from_Risk',
            procedure_copays: DEFAULT_COPAYS
        }
    },
    {
        id: 'dhms-classic-core-2026',
        name: 'Classic Core',
        series: 'Core',
        scheme: 'Discovery',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 3905, adult: 3080, child: 1563, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: { ...DEFAULT_RATES, specialist_in_hospital: 200 },
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Any',
            oncology_limit: 'Unlimited',
            casualty_visit: 'Paid_from_Risk',
            procedure_copays: DEFAULT_COPAYS
        }
    },
    {
        id: 'dhms-classic-saver-2026',
        name: 'Classic Saver',
        series: 'Saver',
        scheme: 'Discovery',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 4535, adult: 3571, child: 1816, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 25 },
        coverage_rates: { ...DEFAULT_RATES, specialist_in_hospital: 200 },
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: {
            chronic_provider: 'Any',
            oncology_limit: 'Unlimited',
            casualty_visit: 'Paid_from_Savings',
            procedure_copays: DEFAULT_COPAYS
        }
    },
    {
        id: 'dhms-classic-comprehensive-2026',
        name: 'Classic Comprehensive',
        series: 'Comprehensive',
        scheme: 'Discovery',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 10037, adult: 9494, child: 2060, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 34810,
        savings_account: { type: 'Percentage', value: 25 },
        coverage_rates: { ...DEFAULT_RATES, specialist_in_hospital: 200 },
        defined_baskets: { ...DEFAULT_BASKETS, maternity: { antenatal_consults: 12, ultrasounds_2d: 2, paediatrician_visits: 2 } },
        threshold_benefits: { has_spg: true, above_threshold_limits: 'Unlimited' },
        hard_limits: {
            chronic_provider: 'Any',
            oncology_limit: 'Unlimited',
            casualty_visit: 'Paid_from_Savings',
            procedure_copays: DEFAULT_COPAYS
        }
    },
    {
        id: 'dhms-executive-2026',
        name: 'Executive',
        series: 'Executive',
        scheme: 'Discovery',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 11500, adult: 11500, child: 2200, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 41000,
        savings_account: { type: 'Percentage', value: 25 },
        coverage_rates: { ...DEFAULT_RATES, specialist_in_hospital: 300 },
        defined_baskets: { ...DEFAULT_BASKETS, maternity: { antenatal_consults: 12, ultrasounds_2d: 2, paediatrician_visits: 2 } },
        threshold_benefits: { has_spg: true, above_threshold_limits: 'Unlimited' },
        hard_limits: {
            chronic_provider: 'Any',
            oncology_limit: 'Unlimited',
            casualty_visit: 'Paid_from_Savings',
            procedure_copays: DEFAULT_COPAYS
        }
    },

    // =========================================================================
    // 4. MEDIHELP (Restored)
    // =========================================================================
    {
        id: 'medihelp-medmove-2026',
        name: 'MedMove',
        series: 'Move',
        scheme: 'Medihelp',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 1734, adult: 1734, child: 1734, max_child_rate: 0 },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'Network', oncology_limit: 'PMB_Only', casualty_visit: 'Co_Payment', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'medihelp-medvital-2026',
        name: 'MedVital',
        series: 'Vital',
        scheme: 'Medihelp',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 3096, adult: 2600, child: 1100, max_child_rate: 2 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'Any', oncology_limit: 262500, casualty_visit: 'Paid_from_Risk', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'medihelp-medadd-2026',
        name: 'MedAdd',
        series: 'Add',
        scheme: 'Medihelp',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 4038, adult: 3500, child: 1200, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 15 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'medihelp-medprime-2026',
        name: 'MedPrime',
        series: 'Prime',
        scheme: 'Medihelp',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 5790, adult: 4800, child: 1500, max_child_rate: 2 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 10 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'Any', oncology_limit: 336000, casualty_visit: 'Paid_from_Savings', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'medihelp-medsaver-2026',
        name: 'MedSaver',
        series: 'Saver',
        scheme: 'Medihelp',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 4260, adult: 3800, child: 1200, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 25 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'medihelp-medelite-2026',
        name: 'MedElite',
        series: 'Elite',
        scheme: 'Medihelp',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 8922, adult: 7800, child: 2600, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 10 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'Any', oncology_limit: 504000, casualty_visit: 'Paid_from_Savings', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'medihelp-medreach-2026',
        name: 'MedReach',
        series: 'Reach',
        scheme: 'Medihelp',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 3360, adult: 3360, child: 3360, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'Network', oncology_limit: 'PMB_Only', casualty_visit: 'Co_Payment', procedure_copays: DEFAULT_COPAYS }
    },

    // =========================================================================
    // 5. MEDSHIELD (Restored)
    // =========================================================================
    {
        id: 'medshield-medicore-2026',
        name: 'MediCore',
        scheme: 'Medshield',
        series: 'Core',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 4278, adult: 3618, child: 987, max_child_rate: 3 },
        network_geofence: 'Specific_List',
        hospital_network: 'Specific_List',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'DSP', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'medshield-premiumplus-2026',
        name: 'PremiumPlus',
        scheme: 'Medshield',
        series: 'Premium',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 9489, adult: 8691, child: 1815, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 25 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'Any', oncology_limit: 882000, casualty_visit: 'Paid_from_Risk', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'medshield-medvalue-compact-2026',
        name: 'MediValue Compact',
        scheme: 'Medshield',
        series: 'Value',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 2500, adult: 2200, child: 800, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Compact',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'DSP', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'medshield-medvalue-prime-2026',
        name: 'MediValue Prime',
        scheme: 'Medshield',
        series: 'Value',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 2800, adult: 2500, child: 900, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Prime',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'medshield-mediplus-prime-2026',
        name: 'MediPlus Prime',
        scheme: 'Medshield',
        series: 'Plus',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 4500, adult: 3800, child: 1200, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Prime',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 15 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'medshield-mediphila-compact-2026',
        name: 'MediPhila',
        scheme: 'Medshield',
        series: 'Phila',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 2145, adult: 2145, child: 2145, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Compact',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'DSP', oncology_limit: 'Limited', casualty_visit: 'Co_Payment', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'medshield-medibonus-2026',
        name: 'MediBonus',
        scheme: 'Medshield',
        series: 'Bonus',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 7000, adult: 6000, child: 1500, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 20 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'medshield-medisaver-2026',
        name: 'MediSaver',
        scheme: 'Medshield',
        series: 'Saver',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 5000, adult: 4500, child: 1200, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 15 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'medshield-medicurve-2026',
        name: 'MediCurve',
        scheme: 'Medshield',
        series: 'Curve',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 1821, adult: 1821, child: 483, max_child_rate: 3 },
        network_geofence: 'Specific_List',
        hospital_network: 'Compact',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'Network', oncology_limit: 'Limited', casualty_visit: 'Paid_from_Risk', procedure_copays: DEFAULT_COPAYS }
    },

    // =========================================================================
    // 6. MOMENTUM (Restored)
    // =========================================================================
    {
        id: 'momentum-ingwe-2026',
        name: 'Ingwe',
        series: 'Entry-Level',
        scheme: 'Momentum',
        type: 'Capitation',
        pricing_model: 'Income_Banded',
        premiums: {
            bands: [
                { min_income: 0, max_income: 10000, main: 588, adult: 588, child: 588 },
                { min_income: 10001, max_income: 17000, main: 900, adult: 900, child: 900 },
                { min_income: 17001, max_income: 999999, main: 2900, adult: 2900, child: 2900 }
            ]
        },
        network_geofence: 'Regional_Hub',
        hospital_network: 'Specific_List',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'State', oncology_limit: 'PMB_Only', casualty_visit: 'Not_Covered', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'momentum-evolve-2026',
        name: 'Evolve',
        series: 'Evolve',
        scheme: 'Momentum',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 1800, adult: 1800, child: 1800, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'State', oncology_limit: 'PMB_Only', casualty_visit: 'Not_Covered', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'momentum-custom-2026',
        name: 'Custom',
        series: 'Custom',
        scheme: 'Momentum',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 2500, adult: 2000, child: 800, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Associated',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'State', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'momentum-incentive-2026',
        name: 'Incentive',
        series: 'Mid-Tier',
        scheme: 'Momentum',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 3900, adult: 3000, child: 1200, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Associated',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 10 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: DEFAULT_THRESHOLD,
        hard_limits: { chronic_provider: 'Associated', oncology_limit: 400000, casualty_visit: 'Paid_from_Savings', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'momentum-extender-2026',
        name: 'Extender',
        series: 'Premium',
        scheme: 'Momentum',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 8500, adult: 7200, child: 2500, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Associated',
        annual_threshold: 36900,
        savings_account: { type: 'Percentage', value: 25 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: { has_spg: true, above_threshold_limits: 'Unlimited' },
        hard_limits: { chronic_provider: 'Associated', oncology_limit: 500000, casualty_visit: 'Paid_from_Savings', procedure_copays: DEFAULT_COPAYS }
    },
    {
        id: 'momentum-summit-2026',
        name: 'Summit',
        series: 'Premium',
        scheme: 'Momentum',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 12500, adult: 12500, child: 3000, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 45000,
        savings_account: { type: 'Percentage', value: 25 },
        coverage_rates: DEFAULT_RATES,
        defined_baskets: DEFAULT_BASKETS,
        threshold_benefits: { has_spg: true, above_threshold_limits: 'Unlimited' },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings', procedure_copays: DEFAULT_COPAYS }
    }
];