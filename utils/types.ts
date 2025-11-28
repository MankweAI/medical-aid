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