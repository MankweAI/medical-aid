/**
 * DATA SOURCE: 2026 Discovery Health Medical Scheme Rules
 * CLUSTER: 2 (Procedural Deductible Risk Matrix)
 */

export interface Procedure {
    id: string;
    label: string;
    medical_term: string;
    category: 'major_joint' | 'scope' | 'spinal' | 'ophthalmology' | 'maternity' | 'general';
    base_cost_estimate: number;
    risk_notes: string;
}

export interface PlanDeductibleRule {
    plan_id: string;
    plan_name: string;
    network_type: 'smart' | 'delta' | 'coastal' | 'any';
    deductibles: {
        default: number;
        penalty_non_network: number;
        scope_penalty?: number;
        spinal_penalty?: number;
    };
}

// ---------------------------------------------------------------------------
// 1. THE 12 HIGH-VOLUME PROCEDURES
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 2. THE PLAN RULES
// ---------------------------------------------------------------------------
export const PLAN_DEDUCTIBLES_2026: PlanDeductibleRule[] = [
    // SMART
    {
        plan_id: "classic-smart",
        plan_name: "Classic Smart",
        network_type: "smart",
        deductibles: { default: 7750, penalty_non_network: 12650, scope_penalty: 7750 }
    },
    {
        plan_id: "essential-smart",
        plan_name: "Essential Smart",
        network_type: "smart",
        deductibles: { default: 7750, penalty_non_network: 12650, scope_penalty: 7750 }
    },
    {
        plan_id: "active-smart",
        plan_name: "Active Smart",
        network_type: "smart",
        deductibles: { default: 7750, penalty_non_network: 12650, scope_penalty: 7750 }
    },
    // SAVER
    {
        plan_id: "classic-saver",
        plan_name: "Classic Saver",
        network_type: "any",
        deductibles: { default: 0, penalty_non_network: 0, scope_penalty: 6650 }
    },
    {
        plan_id: "essential-saver",
        plan_name: "Essential Saver",
        network_type: "any",
        deductibles: { default: 0, penalty_non_network: 0, scope_penalty: 6650 }
    },
    {
        plan_id: "coastal-saver",
        plan_name: "Coastal Saver",
        network_type: "coastal",
        deductibles: { default: 0, penalty_non_network: 0, scope_penalty: 6650 }
    },
    // DELTA
    {
        plan_id: "classic-delta-saver",
        plan_name: "Classic Delta Saver",
        network_type: "delta",
        deductibles: { default: 0, penalty_non_network: 11100, scope_penalty: 6650 }
    },
    {
        plan_id: "essential-delta-saver",
        plan_name: "Essential Delta Saver",
        network_type: "delta",
        deductibles: { default: 0, penalty_non_network: 11100, scope_penalty: 6650 }
    },
    // CORE
    {
        plan_id: "classic-core",
        plan_name: "Classic Core",
        network_type: "any",
        deductibles: { default: 0, penalty_non_network: 0, scope_penalty: 6650 }
    },
    {
        plan_id: "coastal-core",
        plan_name: "Coastal Core",
        network_type: "coastal",
        deductibles: { default: 0, penalty_non_network: 0, scope_penalty: 6650 }
    }
];

// Helper to find specific rule intersection
export function getRiskProfile(procedureId: string, planId: string) {
    // Safe access check
    if (!PROCEDURES_2026 || !PLAN_DEDUCTIBLES_2026) return null;

    const procedure = PROCEDURES_2026.find(p => p.id === procedureId);
    const plan = PLAN_DEDUCTIBLES_2026.find(p => p.plan_id === planId);

    if (!procedure || !plan) return null;

    let liability = plan.deductibles.default;
    let warning = "";

    if (procedure.category === 'scope') {
        liability = plan.deductibles.scope_penalty || 6650;
        warning = "If performed in acute hospital (not Day Clinic).";
    } else {
        if (plan.network_type === 'smart') {
            liability = 7750;
            warning = "Mandatory upfront co-payment for elective admission.";
        }
    }

    const nonNetworkLiability = plan.deductibles.penalty_non_network;

    return {
        procedure,
        plan,
        liability,
        nonNetworkLiability,
        warning,
        total_estimated_bill: liability
    };
}