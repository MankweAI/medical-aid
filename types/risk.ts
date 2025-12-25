// types/risk.ts

export type ProcedureCategory = 'major_joint' | 'scope' | 'spinal' | 'ophthalmology' | 'maternity' | 'dental' | 'general';
export type NetworkType = 'smart' | 'delta' | 'coastal' | 'any';
export type PlanSeries = 'core' | 'smart' | 'saver' | 'priority' | 'comprehensive' | 'coastal'; // <--- NEW for Hubs

// 1. The Medical Entity
export interface Procedure {
    id: string;
    label: string;
    medical_term: string;
    category: ProcedureCategory;
    base_cost_estimate: number;
    risk_notes: string;
    scope_complexity?: 'single' | 'combo';
}

// 2. The Scope Matrix
export interface ScopeBenefitStructure {
    day_clinic_single: number;
    day_clinic_combo: number;
    hospital_network_single: number;
    hospital_network_combo: number;
    hospital_non_network_single: number;
    hospital_non_network_combo: number;
    rooms_single: number;
    rooms_combo: number;
    penalty_outside_day_surgery: number;
}

// 3. The Insurance Rule Entity
export interface PlanDeductibleRule {
    plan_id: string;
    plan_name: string;
    plan_series: PlanSeries; // <--- NEW for Hubs
    network_type: NetworkType;
    available_procedure_ids: string[];

    deductibles: {
        default: number;
        penalty_non_network: number;

        // Matrix for complex scopes
        scope_structure: ScopeBenefitStructure;

        // Explicit fields for flat penalties (Required for UI Logic)
        hip_replacement_penalty?: number;
        knee_replacement_penalty?: number;
        spinal_surgery_penalty?: number;
        cataract_penalty?: number;
        caesarean_section_penalty?: number;
        tonsillectomy_penalty?: number;
        dental_penalty?: number;
    };
}

export interface RiskAudit {
    procedure: Procedure;
    plan: PlanDeductibleRule;
    liability: number;
    breakdown: {
        base_rate: number;
        scheme_pays: number;
        shortfall: number;
        deductibles: { total_deductible: number; };
        scope_variants?: {
            day_clinic: number;
            day_clinic_combo: number;
            hospital_network: number;
            hospital_network_combo: number;
            hospital_non_network: number;
            hospital_non_network_combo: number;
            rooms: number;
            rooms_combo: number;
            penalty_outside_day_surgery: number;
        };
    };
    meta: {
        is_trap: boolean;
        coverage_percent: number;
        warning_label: string | null;
    };
}

export interface PlanComparison {
    plan_name: string;
    slug: string;
    liability: number;
    is_current: boolean;
}