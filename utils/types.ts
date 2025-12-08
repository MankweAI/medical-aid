// utils/types.ts

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

export type PricingMatrix = FixedPricing | IncomeBand[];

export interface Contribution {
    pricing_model: 'Fixed' | 'Income_Banded';
    pricing_matrix: PricingMatrix;
    msa_structure?: {
        type: 'Percentage' | 'Fixed' | 'None' | string;
        value: number | string;
    };
}

// FIX: Added FamilyComposition export to standardize usage across app
export interface FamilyComposition {
    main: number;
    adult: number;
    child: number;
}

export interface Plan {
    id: string;
    price: number;
    savings_annual: number;

    identity: {
        scheme_name: string;
        plan_name: string;
        plan_series: string;
        plan_type: string;
    };

    contributions: Contribution[];

    network_restriction: string;

    coverage_rates: {
        hospital_account: number;
        specialist_in_hospital: number;
        specialist_out_hospital: number;
        gp_network_consults: number | string;
    };

    defined_baskets: {
        maternity: {
            antenatal_consults: number;
            ultrasounds_2d: number;
            paediatrician_visits: number;
        };
        preventative: {
            vaccinations: boolean;
            contraceptives: number;
            wellness_screening?: boolean;
        };
    };

    procedure_copays: {
        scope_in_hospital: number;
        scope_out_hospital: number;
        mri_scan: number;
        joint_replacement: number | string;
        admission_penalty_non_network?: number | string;
    };

    red_flag?: string;

    features?: any;
    benefits?: any[];
}