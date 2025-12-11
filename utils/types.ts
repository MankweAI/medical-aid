// utils/types.ts
export interface Contribution {
    pricing_model: 'Fixed' | 'Income_Banded';
    pricing_matrix: { main: number; adult: number; child: number } | Array<{ min: number; max: number; main: number; adult: number; child: number }>;
    msa_structure?: { type: string; value: number | string };
}

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

    // --- NEW SUPER SCHEMA FIELDS ---
    network_details: {
        hospitals: string;
        gps: string;
        specialists: string;
    };

    coverage_rates: {
        hospital_account: number;
        specialist_in_hospital: number;
        specialist_out_hospital: number;
        gp_network_consults: number | string;
    };

    limits: {
        oncology: { status: string; value: number; copay_percentage?: number };
        casualty: { status: string; value: number };
        internal_prosthesis: { sublimit: number };
    };

    defined_baskets: {
        maternity: { antenatal_consults: number; ultrasounds_2d: number; paediatrician_visits: number };
        preventative: { vaccinations: boolean; contraceptives: number; wellness_screening?: boolean };
    };

    chronic_conditions: number;

    procedure_copays: {
        scope_in_hospital: number;
        scope_out_hospital: number;
        mri_scan: number;
        joint_replacement: number | string;
        admission_penalty_non_network?: number | string;
    };

    gap_cover_rating: string;
    red_flag?: string;

    faq?: { question: string; answer: string }[];
}