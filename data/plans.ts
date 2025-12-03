import { PlanProduct } from '@/types/schema';

export const PLAN_DB: PlanProduct[] = [
    // =========================================================================
    // 1. DISCOVERY HEALTH (DHMS)
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
        hard_limits: { chronic_provider: 'State', oncology_limit: 'PMB_Only', casualty_visit: 'Not_Covered' }
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
        hard_limits: {
            chronic_provider: 'Network',
            oncology_limit: 'Unlimited',
            casualty_visit: 'Co_Payment',
            elective_deductible: 7750
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
        hard_limits: {
            chronic_provider: 'Network',
            oncology_limit: 'Unlimited',
            casualty_visit: 'Co_Payment',
            scope_penalty_hospital: 12650
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
        hard_limits: { chronic_provider: 'Network', oncology_limit: 'Unlimited', casualty_visit: 'Co_Payment' }
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
        hospital_network: 'Any', // Within coastal region
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk' }
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
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk' }
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
    {
        id: 'dhms-executive-2026',
        name: 'Executive',
        series: 'Executive',
        scheme: 'Discovery',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 11500, adult: 11500, child: 2200, max_child_rate: 3 }, // Estimated for logic completeness
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 41000,
        savings_account: { type: 'Percentage', value: 25 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
    },

    // =========================================================================
    // 2. MOMENTUM MEDICAL SCHEME
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
        hard_limits: { chronic_provider: 'State', oncology_limit: 'PMB_Only', casualty_visit: 'Not_Covered' }
    },
    {
        id: 'momentum-evolve-2026',
        name: 'Evolve',
        series: 'Evolve',
        scheme: 'Momentum',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 1800, adult: 1800, child: 1800, max_child_rate: 3 }, // Estimated
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        hard_limits: { chronic_provider: 'State', oncology_limit: 'PMB_Only', casualty_visit: 'Not_Covered' }
    },
    {
        id: 'momentum-custom-2026',
        name: 'Custom',
        series: 'Custom',
        scheme: 'Momentum',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 2500, adult: 2000, child: 800, max_child_rate: 3 }, // Estimated
        network_geofence: 'Any',
        hospital_network: 'Associated',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        hard_limits: { chronic_provider: 'State', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk' }
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
        hard_limits: { chronic_provider: 'Associated', oncology_limit: 400000, casualty_visit: 'Paid_from_Savings' }
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
        hard_limits: { chronic_provider: 'Associated', oncology_limit: 500000, casualty_visit: 'Paid_from_Savings' }
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
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
    },

    // =========================================================================
    // 3. BONITAS MEDICAL FUND
    // =========================================================================
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
        id: 'bonitas-bonstart-2026',
        name: 'BonStart',
        series: 'BonStart',
        scheme: 'Bonitas',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 1603, adult: 1500, child: 700, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        hard_limits: { chronic_provider: 'Network', oncology_limit: 'PMB_Only', casualty_visit: 'Not_Covered' }
    },
    {
        id: 'bonitas-boncore-2026',
        name: 'BonCore',
        series: 'Core',
        scheme: 'Bonitas',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 3500, adult: 2800, child: 1000, max_child_rate: 3 }, // Estimated
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk' }
    },
    {
        id: 'bonitas-bonessential-2026',
        name: 'BonEssential',
        series: 'Essential',
        scheme: 'Bonitas',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 2500, adult: 2000, child: 800, max_child_rate: 3 },
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
        savings_account: { type: 'Fixed', value: 14832 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 336100, casualty_visit: 'Paid_from_Savings' }
    },
    {
        id: 'bonitas-boncomprehensive-2026',
        name: 'BonComprehensive',
        series: 'Comprehensive',
        scheme: 'Bonitas',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 9500, adult: 9000, child: 2200, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 28000,
        savings_account: { type: 'Percentage', value: 25 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
    },

    // =========================================================================
    // 4. BESTMED
    // =========================================================================
    {
        id: 'bestmed-beat-1-2026',
        name: 'Beat 1',
        series: 'Beat',
        scheme: 'Bestmed',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 2200, adult: 1700, child: 900, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk' }
    },
    {
        id: 'bestmed-beat-2-2026',
        name: 'Beat 2',
        series: 'Beat',
        scheme: 'Bestmed',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 2800, adult: 2200, child: 1100, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 10 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
    },
    {
        id: 'bestmed-beat-3-2026',
        name: 'Beat 3',
        series: 'Beat',
        scheme: 'Bestmed',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 4100, adult: 3200, child: 1500, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 15 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
    },
    {
        id: 'bestmed-beat-3-plus-2026',
        name: 'Beat 3 Plus',
        series: 'Beat',
        scheme: 'Bestmed',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 5000, adult: 4000, child: 1800, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 20 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
    },
    {
        id: 'bestmed-beat-4-2026',
        name: 'Beat 4',
        series: 'Beat',
        scheme: 'Bestmed',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 6500, adult: 5500, child: 2000, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 25 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
    },
    {
        id: 'bestmed-pace-1-2026',
        name: 'Pace 1',
        series: 'Pace',
        scheme: 'Bestmed',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 5500, adult: 4500, child: 1500, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Network',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 15 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
    },
    {
        id: 'bestmed-pace-3-2026',
        name: 'Pace 3',
        series: 'Pace',
        scheme: 'Bestmed',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 8000, adult: 7000, child: 1800, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 20 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
    },
    {
        id: 'bestmed-pace-4-2026',
        name: 'Pace 4',
        series: 'Pace',
        scheme: 'Bestmed',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 10500, adult: 9800, child: 2200, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 15 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
    },

    // =========================================================================
    // 5. MEDIHELP
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
        hard_limits: { chronic_provider: 'Network', oncology_limit: 'PMB_Only', casualty_visit: 'Co_Payment' }
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
        hard_limits: { chronic_provider: 'Any', oncology_limit: 262500, casualty_visit: 'Paid_from_Risk' }
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
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
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
        hard_limits: { chronic_provider: 'Any', oncology_limit: 336000, casualty_visit: 'Paid_from_Savings' }
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
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
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
        hard_limits: { chronic_provider: 'Any', oncology_limit: 504000, casualty_visit: 'Paid_from_Savings' }
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
        hard_limits: { chronic_provider: 'Network', oncology_limit: 'PMB_Only', casualty_visit: 'Co_Payment' }
    },

    // =========================================================================
    // 6. MEDSHIELD
    // =========================================================================
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
    },
    {
        id: 'medshield-medvalue-compact-2026',
        name: 'MediValue Compact',
        series: 'Value',
        scheme: 'Medshield',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 2500, adult: 2200, child: 800, max_child_rate: 3 }, // Estimated
        network_geofence: 'Any',
        hospital_network: 'Compact',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        hard_limits: { chronic_provider: 'DSP', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk' }
    },
    {
        id: 'medshield-medvalue-prime-2026',
        name: 'MediValue Prime',
        series: 'Value',
        scheme: 'Medshield',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 2800, adult: 2500, child: 900, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Prime',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk' }
    },
    {
        id: 'medshield-mediplus-prime-2026',
        name: 'MediPlus Prime',
        series: 'Plus',
        scheme: 'Medshield',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 4500, adult: 3800, child: 1200, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Prime',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 15 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
    },
    {
        id: 'medshield-mediphila-compact-2026',
        name: 'MediPhila',
        series: 'Phila',
        scheme: 'Medshield',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 2145, adult: 2145, child: 2145, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Compact',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        hard_limits: { chronic_provider: 'DSP', oncology_limit: 'Limited', casualty_visit: 'Co_Payment' }
    },
    {
        id: 'medshield-medibonus-2026',
        name: 'MediBonus',
        series: 'Bonus',
        scheme: 'Medshield',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 7000, adult: 6000, child: 1500, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 20 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Risk' }
    },
    {
        id: 'medshield-medisaver-2026',
        name: 'MediSaver',
        series: 'Saver',
        scheme: 'Medshield',
        type: 'Medical Aid',
        pricing_model: 'Fixed',
        premiums: { main: 5000, adult: 4500, child: 1200, max_child_rate: 3 },
        network_geofence: 'Any',
        hospital_network: 'Any',
        annual_threshold: 0,
        savings_account: { type: 'Percentage', value: 15 },
        hard_limits: { chronic_provider: 'Any', oncology_limit: 'Unlimited', casualty_visit: 'Paid_from_Savings' }
    },
    {
        id: 'medshield-medicurve-2026',
        name: 'MediCurve',
        series: 'Curve',
        scheme: 'Medshield',
        type: 'Hospital Plan',
        pricing_model: 'Fixed',
        premiums: { main: 1821, adult: 1821, child: 483, max_child_rate: 3 },
        network_geofence: 'Specific_List',
        hospital_network: 'Compact',
        annual_threshold: 0,
        savings_account: { type: 'None', value: 0 },
        hard_limits: { chronic_provider: 'Network', oncology_limit: 'Limited', casualty_visit: 'Paid_from_Risk' }
    }
];