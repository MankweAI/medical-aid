// 1. FAMILY COMPOSITION (The missing piece)
export interface FamilyComposition {
    main: number;     // Usually 1
    adults: number;   // Number of adult dependants
    children: number; // Number of child dependants
}

// 2. THE PLAN INTERFACE
export interface Plan {
    id: string;
    identity: {
        scheme_name: string;
        plan_name: string;
        plan_series: string;
        plan_type: string;
    };
    pricing_engine: {
        model: 'Fixed' | 'Income_Banded';
        contributions: {
            income_band?: { min: number; max: number };
            premiums: { main: number; adult: number; child: number };
        }[];
        savings_component: {
            has_savings: boolean;
            annual_allocation_calc: string | number;
        };
    };
    network_rules: {
        restriction_level: string;
        hospital_provider: string;
        chronic_provider: string;
        gp_provider: string;
    };
    coverage_rates: {
        hospital_account: number;
        specialist_in_hospital: number;
        specialist_out_hospital: number;
        gp_network_consults: string | number;
    };
    defined_baskets: {
        maternity: {
            antenatal_consults: number;
            ultrasounds_2d: number;
            paediatrician_visits: number;
        };
        preventative: {
            vaccinations: boolean;
            contraceptives_annual_limit: number;
            wellness_screening: boolean;
        };
    };
    threshold_benefits: {
        above_threshold_benefit: string;
        sublimits?: any;
    };
    risk_exposure: {
        co_payments: {
            scope_in_hospital: number;
            mri_scan: number;
            admission_penalty_non_network: number;
        };
        red_flag?: string;
    };

    // Optional helper fields injected by the Engine at runtime
    price?: number;
    savings_annual?: number;
    network_restriction?: string;
}