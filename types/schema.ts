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
    /** Unique URL-friendly identifier (e.g., 'keycare-plus-band-breacher-2026') */
    slug: string;

    /** Short internal code for debugging (e.g., 'DHMS_KC_002') */
    code: string;

    /** Marketing-style title for the card */
    title: string;

    /** Optional detailed description of the scenario */
    description?: string;

    /** The User's Goal (e.g., "Minimise contributions by qualifying for lowest band") */
    intent: string;

    /** The ID of the plan this persona is mathematically optimized for */
    target_plan_id: string;

    /** The exact actuarial rule creating this segment (e.g., "Crossing R10,250 income triggers 37% hike") */
    mathematical_basis: string;

    /** The specific downside risk (e.g., "Income verification failure defaults to top band") */
    primary_risk: string;

    // --- SIMULATION DEFAULTS ---
    /** A monthly income that triggers this specific scenario */
    default_income: Currency;

    /** The family composition relevant to this persona */
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

    /** Official Scheme Name (e.g. 'Discovery', 'Bonitas') */
    scheme: string;

    /** Display Name of the Plan (e.g., 'Classic Saver') */
    name: string;

    /** The broader grouping (e.g. 'Saver', 'Smart', 'BonCap') */
    series: string;

    /** Classification for high-level filtering */
    type: 'Hospital Plan' | 'Medical Aid' | 'Capitation' | 'Hybrid';

    // --- THE PRICING ENGINE ---

    /** * Determines how we calculate the premium.
     * Fixed: Use the 'main/adult/child' fields.
     * Income_Banded: Iterate through the 'bands' array.
     */
    pricing_model: 'Fixed' | 'Income_Banded';

    premiums: {
        // Option A: Fixed Pricing
        main?: Currency;
        adult?: Currency;
        child?: Currency;

        /** Discovery usually caps child payments at 3. Momentum/Bonitas may vary. */
        max_child_rate?: number;

        // Option B: Income Banded Pricing
        bands?: Array<{
            min_income: Currency;
            max_income: Currency; // Use 999999 for "And Above"
            main: Currency;
            adult: Currency;
            child: Currency;
        }>;
    };

    // --- THE ACTUARIAL GATES ---

    /** Where does the member live? */
    network_geofence: 'Any' | 'Coastal' | 'Inland' | 'Regional_Hub' | 'Delta' | 'Specific_List';

    /** Which hospitals can they use? */
    hospital_network: 'Any' | 'Network' | 'State' | 'Specific_List' | 'Prime' | 'Compact' | 'Associated';

    // --- THE FINANCIAL ENGINE ---

    /** The "Safety Net" threshold (0 if plan doesn't have one) */
    annual_threshold: Currency;

    /** Specific to Discovery Priority: The cap on Above Threshold Benefits */
    limited_atb_cap?: Currency;

    /** Medical Savings Account Structure */
    savings_account: {
        type: 'Percentage' | 'Fixed' | 'None';
        /** If Percentage: 25. If Fixed: 12000. */
        value: number;
    };

    // --- THE RED FLAG ANALYSIS (Risk Engine) ---

    hard_limits: {
        /** Where must they get chronic meds? */
        chronic_provider: 'Any' | 'Network' | 'State' | 'DSP' | 'Associated';

        /** Oncology Limit (Use 'Unlimited' or integer value) */
        oncology_limit: string | number;

        /** Casualty Rules */
        casualty_visit: 'Paid_from_Risk' | 'Paid_from_Savings' | 'Not_Covered' | 'Co_Payment';

        /** Specific financial penalties extracted from brochures */
        elective_deductible?: Currency;      // e.g. R7,750 on Active Smart
        scope_penalty_hospital?: Currency;   // e.g. R5,700 for scopes in hospital

        /** Flexible array for specific nasty surprises */
        specific_co_payments?: Array<{
            procedure: string; // e.g. "Joint Replacement", "MRI"
            penalty: Currency | Percent;
            unit?: 'ZAR' | 'Percent'; // Default to ZAR if undefined
        }>;
    };
}