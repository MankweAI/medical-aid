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
export const PROCEDURES_2026: Procedure[] = [
    {
        id: "knee-replacement",
        label: "Knee Replacement",
        medical_term: "Total Knee Arthroplasty",
        category: "major_joint",
        base_cost_estimate: 185000,
        risk_notes: "Subject to R7,750 deductible on Smart plans. Subject to Joint Network restrictions."
    },
    {
        id: "hip-replacement",
        label: "Hip Replacement",
        medical_term: "Total Hip Arthroplasty",
        category: "major_joint",
        base_cost_estimate: 192000,
        risk_notes: "Subject to R7,750 deductible on Smart plans. Subject to Joint Network restrictions."
    },
    {
        id: "c-section",
        label: "C-Section (Elective)",
        medical_term: "Caesarean Section",
        category: "maternity",
        base_cost_estimate: 62000,
        risk_notes: "Smart plans require R7,750 co-payment for elective C-sections. Emergency is covered in full."
    },
    {
        id: "hysterectomy",
        label: "Hysterectomy",
        medical_term: "Hysterectomy (Abdominal/Laparoscopic)",
        category: "general",
        base_cost_estimate: 85000,
        risk_notes: "Subject to R7,750 deductible on Smart plans."
    },
    {
        id: "gastroscopy",
        label: "Gastroscopy (Stomach Scope)",
        medical_term: "Upper Gastrointestinal Endoscopy",
        category: "scope",
        base_cost_estimate: 8500,
        risk_notes: "Must be done in Day Clinic. Hospital admission triggers ~R6,650 deductible unless specific criteria met."
    },
    {
        id: "colonoscopy",
        label: "Colonoscopy",
        medical_term: "Lower Gastrointestinal Endoscopy",
        category: "scope",
        base_cost_estimate: 9500,
        risk_notes: "Must be done in Day Clinic. Hospital admission triggers ~R6,650 deductible."
    },
    {
        id: "cataract-surgery",
        label: "Cataract Surgery",
        medical_term: "Phacoemulsification",
        category: "ophthalmology",
        base_cost_estimate: 28000,
        risk_notes: "R7,750 deductible on Smart. Must use Ophthalmic Network."
    },
    {
        id: "spinal-fusion",
        label: "Back Surgery (Fusion)",
        medical_term: "Spinal Fusion",
        category: "spinal",
        base_cost_estimate: 240000,
        risk_notes: "Requires Conservative Care Pathway completion. Failure triggers high deductibles."
    },
    {
        id: "tonsillectomy",
        label: "Tonsil Removal",
        medical_term: "Tonsillectomy",
        category: "general",
        base_cost_estimate: 18000,
        risk_notes: "R7,750 deductible on Smart plans."
    },
    {
        id: "grommets",
        label: "Grommets",
        medical_term: "Myringotomy",
        category: "general",
        base_cost_estimate: 12000,
        risk_notes: "Day Clinic mandatory. Hospital admission triggers penalty."
    },
    {
        id: "hernia-repair",
        label: "Hernia Repair",
        medical_term: "Inguinal Herniorrhaphy",
        category: "general",
        base_cost_estimate: 35000,
        risk_notes: "Day Clinic mandatory for uncomplicated cases."
    },
    {
        id: "gallbladder-removal",
        label: "Gallbladder Removal",
        medical_term: "Laparoscopic Cholecystectomy",
        category: "general",
        base_cost_estimate: 55000,
        risk_notes: "R7,750 deductible on Smart plans."
    }
];

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