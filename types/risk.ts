// types/risk.ts

export type ProcedureCategory = 'major_joint' | 'scope' | 'spinal' | 'ophthalmology' | 'maternity' | 'general';
export type NetworkType = 'smart' | 'delta' | 'coastal' | 'any';

// 1. The Medical Entity
export interface Procedure {
    id: string;
    label: string;
    medical_term: string;
    category: ProcedureCategory;
    base_cost_estimate: number;
    risk_notes: string;
}

// 2. The Insurance Rule Entity
export interface PlanDeductibleRule {
    plan_id: string;
    plan_name: string;
    network_type: NetworkType;
    available_procedure_ids: string[];
    deductibles: {
        default: number;
        penalty_non_network: number;
        scope_penalty?: number;
        spinal_penalty?: number;
        cataract_penalty?: number;
        joint_penalty?: number;
    };
}

// 3. The Calculated Result (Consumed by UI)
export interface RiskAudit {
    procedure: Procedure;
    plan: PlanDeductibleRule;
    liability: number;
    breakdown: {
        base_rate: number;
        scheme_pays: number;
        shortfall: number;
    };
    meta: {
        is_trap: boolean;
        coverage_percent: number;
        warning_label: string | null;
    };
}

// 4. The Comparison Item (For the Plan Switcher)
export interface PlanComparison {
    plan_name: string;
    slug: string;
    liability: number;
    is_current: boolean;
}