import { PlanProduct } from '@/types/schema';

export const PLAN_DB: PlanProduct[] = [
    // --- DISCOVERY HEALTH (DHMS) ---
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
        hard_limits: { chronic_provider: 'State', oncology_limit: 'PMB_Only', casualty_visit: 'Not_Covered' }
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
        hard_limits: {
            chronic_provider: 'Network',
            oncology_limit: 'Unlimited',
            casualty_visit: 'Co_Payment',
            scope_penalty_hospital: 12650
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
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
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
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
    },

    // --- MOMENTUM MEDICAL SCHEME ---
    {
        id: 'momentum-ingwe-2026',
        name: 'Ingwe',
        series: 'Entry-Level',
        scheme: 'Momentum',
        type: 'Capitation',
        pricing_model: 'Income_Banded',
        premiums: {
            bands: [
                { min_income: 0, max_income: 10000, main: 588, adult: 588, child: 588 }, // Estimated base
                { min_income: 10001, max_income: 17000, main: 900, adult: 900, child: 900 },
                { min_income: 17001, max_income: 999999, main: 2900, adult: 2900, child: 2900 }
            ]
        },
        network_geofence: 'Regional_Hub',
        hospital_network: 'Specific_List',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        hard_limits: { chronic_provider: 'State', oncology_limit: 'PMB_Only', casualty_visit: 'Not_Covered' }
    },
    {
        id: 'momentum-extender-2026',
        name: 'Extender',
        series: 'Premium',
        scheme: 'Momentum',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 8500, adult: 7200, child: 2500, max_child_rate: 3 }, // Estimated
        network_geofence: 'Any',
        hospital_network: 'Associated',
        annual_threshold: 36900,
        savings_account: { type: 'Percentage', value: 25 },
        hard_limits: { chronic_provider: 'Associated', oncology_limit: 500000, casualty_visit: 'Paid_from_Savings' }
    },

    // --- BONITAS MEDICAL FUND ---
    {
        id: 'bonitas-boncap-2026',
        name: 'BonCap',
        series: 'BonCap',
        scheme: 'Bonitas',
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
        hard_limits: { chronic_provider: 'Network', oncology_limit: 'PMB_Only', casualty_visit: 'Co_Payment' }
    },
    {
        id: 'bonitas-bonclassic-2026',
        name: 'BonClassic',
        series: 'Classic',
        scheme: 'Bonitas',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 8238, adult: 7520, child: 2120, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Fixed', value: 14832 }, // R14,832 annual savings for main
        hard_limits: { chronic_provider: 'Any', oncology_limit: 336100, casualty_visit: 'Paid_from_Savings' }
    },

    // --- BESTMED ---
    {
        id: 'bestmed-beat-1-2026',
        name: 'Beat 1',
        series: 'Beat',
        scheme: 'Bestmed',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 2200, adult: 1800, child: 900, max_child_rate: 3 }, // Estimated
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk' }
    },
    {
        id: 'bestmed-pace-4-2026',
        name: 'Pace 4',
        series: 'Pace',
        scheme: 'Bestmed',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 10500, adult: 9800, child: 2200, max_child_rate: 3 }, // Estimated
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 15 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
    },

    // --- MEDIHELP ---
    {
        id: 'medihelp-medmove-2026',
        name: 'MedMove',
        series: 'Move',
        scheme: 'Medihelp',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 1734, adult: 1734, child: 1734, max_child_rate: 0 }, // Single rate rule
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        hard_limits: { chronic_provider: 'Network', oncology_limit: 'PMB_Only', casualty_visit: 'Co_Payment' }
    },
    {
        id: 'medihelp-medelite-2026',
        name: 'MedElite',
        series: 'Elite',
        scheme: 'Medihelp',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 8922, adult: 7800, child: 2600, max_child_rate: 3 }, // Estimated ad/ch
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 10 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 504000, casualty_visit: 'Paid_from_Savings' }
    },

    // --- MEDSHIELD ---
    {
        id: 'medshield-medicore-2026',
        name: 'MediCore',
        series: 'Core',
        scheme: 'Medshield',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 4278, adult: 3618, child: 987, max_child_rate: 3 },
        network_geofence: 'Specific_List',
        hospital_network: 'Specific_List',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        hard_limits: { chronic_provider: 'DSP', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk' }
    },
    {
        id: 'medshield-premiumplus-2026',
        name: 'PremiumPlus',
        series: 'Premium',
        scheme: 'Medshield',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 9489, adult: 8691, child: 1815, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 25 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 882000, casualty_visit: 'Paid_from_Risk' }
    }
];