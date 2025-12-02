export interface Plan {
    id: string;
    name: string;
    slug: string;
    scheme: string;
    type: 'Medical Aid' | 'Hospital Plan' | 'Savings Plan' | 'Hybrid';
    network_restriction: 'Any' | 'Network' | 'Coastal' | 'Regional';
    has_savings_account: boolean;
    contributions: Contribution[];
    benefits: Benefit[];
}

export interface Contribution {
    pricing_model: 'Fixed' | 'Income_Banded';
    pricing_matrix: PricingMatrix;
    msa_structure?: {
        type: 'Percentage' | 'Fixed' | 'None';
        value: number;
    };
}

export interface Benefit {
    category: string;
    benefit_name: string;
    display_text: string;
    rule_logic: any;
}

// Union Type for JSONB columns
export type PricingMatrix = FixedPricing | IncomeBand[];

export interface FixedPricing {
    main: number;
    adult: number;
    child: number;
}

export interface IncomeBand {
    min: number;
    max: number;
    main: number;
    adult: number;
    child: number;
}

export interface FamilyComposition {
    main: 1;
    adults: number;
    children: number;
}

export interface Rule {
    id: string;
    conditions: Condition[];
    consequence: {
        type: 'risk';
        level: 'HIGH' | 'MEDIUM' | 'LOW';
        warning: string;
        details_template: string; // e.g. "Plan restricted to {network_restriction}"
    };
}

export interface Condition {
    field: string; // e.g. 'network_restriction'
    operator: 'equals' | 'not_equals' | 'includes' | 'greater_than' | 'less_than';
    value?: string | number | boolean; // Optional if comparing to user need
    source: 'plan' | 'user_need' | 'static'; // Compare plan vs plan OR plan vs user need
    compareField?: keyof SearchProfile; // If source is 'user_need', which field to check?
}

// Update UserProfile to include the new rules engine structure
export interface SearchProfile {
    minSavings?: number;
    requiredBenefits?: string[];
    networkTolerance?: 'Any' | 'Network' | 'State' | 'Coastal' | 'Regional';
    rules?: Rule[]; // <--- The new Engine Payload
    mustHaves?: string[];
}

// utils/types.ts

export interface SearchProfile {
    minSavings?: number;
    requiredBenefits?: string[];
    networkTolerance?: 'Any' | 'Network' | 'State' | 'Coastal' | 'Regional';
    // NEW: The resolved location data for the engine
    region?: string;
    rules?: Rule[];
}