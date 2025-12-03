// types/schema.ts

/**
 * ACTUARIAL DATA TYPES
 * --------------------
 * Unified schema for the "Virtual Actuary" Logic Engine.
 * Supports: Fixed Pricing, Income Bands, Network Geofencing, and Clinical Constraints.
 */

export type Currency = number; // Integer in ZAR (e.g. 1500)
export type Percent = number;  // Integer 0-100 (e.g. 25)

// --- 1. THE DEMAND SIDE (The User Scenario) ---

export interface Persona {
    slug: string;
    code: string;
    title: string;
    description?: string;
    intent: string;
    target_plan_id: string;
    mathematical_basis: string;
    primary_risk: string;
    default_income: Currency;
    default_family: {
        main: 1;
        adult: number;
        child: number;
    };
}

// --- 2. THE SUPPLY SIDE (The Product Logic) ---

export interface PlanProduct {
    /** Unique Slug (e.g., 'dhms-classic-saver-2026') */
    id: string;
    scheme: string;
    name: string;
    series: string;
    type: 'Hospital Plan' | 'Medical Aid' | 'Capitation' | 'Hybrid' | 'Network Plan';

    // --- PRICING ---
    pricing_model: 'Fixed' | 'Income_Banded';
    premiums: {
        main?: Currency;
        adult?: Currency;
        child?: Currency;
        max_child_rate?: number;
        bands?: Array<{
            min_income: Currency;
            max_income: Currency;
            main: Currency;
            adult: Currency;
            child: Currency;
        }>;
    };

    // --- GATES ---
    network_geofence: 'Any' | 'Coastal' | 'Inland' | 'Regional_Hub' | 'Delta' | 'Specific_List';
    hospital_network: 'Any' | 'Network' | 'State' | 'Specific_List' | 'Prime' | 'Compact' | 'Associated';

    // --- FINANCIALS ---
    annual_threshold: Currency;
    savings_account: {
        type: 'Percentage' | 'Fixed' | 'None';
        value: number; // For fixed, this is the amount. For %, this is the percentage (e.g. 25)
    };

    // --- NEW: REIMBURSEMENT RATES ---
    coverage_rates: {
        hospital_account: Percent;
        specialist_in_hospital: Percent; // e.g. 100 or 200
        specialist_out_hospital: Percent;
        gp_network: Percent;
        gp_non_network: Percent;
    };

    // --- NEW: DEFINED BASKETS (Risk Benefits) ---
    defined_baskets: {
        maternity?: {
            antenatal_consults: number;
            ultrasounds_2d: number;
            paediatrician_visits: number;
        };
        preventative?: {
            vaccinations: boolean;
            contraceptives: Currency; // Limit in Rands
        };
    };

    // --- NEW: THRESHOLD LOGIC ---
    threshold_benefits: {
        has_spg: boolean;
        above_threshold_limits: 'Unlimited' | 'Limited' | 'None';
        atb_sublimits?: {
            psychology?: Currency;
            allied_health?: Currency;
        };
    };

    // --- RISK ENGINE ---
    hard_limits: {
        chronic_provider: 'Any' | 'Network' | 'State' | 'DSP' | 'Associated';
        oncology_limit: string | number;
        casualty_visit: 'Paid_from_Risk' | 'Paid_from_Savings' | 'Not_Covered' | 'Co_Payment';

        /** Specific financial penalties */
        elective_deductible?: Currency;
        scope_penalty_hospital?: Currency;

        /** NEW: Standardized Copays */
        procedure_copays?: {
            scope_in_hospital: Currency;
            scope_out_hospital: Currency;
            mri_scan: Currency;
            joint_replacement: Currency;
        };

        specific_co_payments?: Array<{
            procedure: string;
            penalty: Currency | Percent;
            unit?: 'ZAR' | 'Percent';
        }>;
    };
}