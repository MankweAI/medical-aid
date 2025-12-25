// lib/risk/repositories.ts
import { Procedure, PlanDeductibleRule } from '@/types/risk';

// --- PROCEDURE DEFINITIONS (Consolidated 2026 Source of Truth) ---
const PROCEDURES: Procedure[] = [
    {
        id: "hip-replacement",
        label: "Hip Replacement",
        medical_term: "Total Hip Arthroplasty",
        category: "major_joint",
        base_cost_estimate: 192000,
        risk_notes: "Essential Smart/Active Smart: PMB cover only. Smart plans: High network penalties."
    },
    {
        id: "cataract-surgery",
        label: "Cataract Surgery",
        medical_term: "Phacoemulsification",
        category: "ophthalmology",
        base_cost_estimate: 28000,
        risk_notes: "Delta/Smart networks impose ~R11k-R15k penalty if non-DSP used."
    },
    {
        id: "gastroscopy",
        label: "Gastroscopy",
        medical_term: "Upper GI Endoscopy",
        category: "scope",
        base_cost_estimate: 8500,
        risk_notes: "R8,000 deductible applies if performed in acute hospital (non-day clinic)."
    },
    {
        id: "spinal-surgery",
        label: "Spinal Surgery",
        medical_term: "Laminectomy/Fusion",
        category: "spinal",
        base_cost_estimate: 150000,
        risk_notes: "Strict network rules apply. Prosthesis limits on lower tier plans."
    }
];

// --- 2026 ACTUARIAL RULES ENGINE ---
// Update: Now includes 'available_procedure_ids' to handle plan-specific exclusions (e.g. Essential Smart excludes elective joints)

const DUMMY_RULES: PlanDeductibleRule[] = [
    // --- CORE SERIES (Comprehensive Hospital Cover) ---
    {
        plan_id: "discovery-core-classic-2026",
        plan_name: "Classic Core",
        network_type: "any",
        available_procedure_ids: ["hip-replacement", "cataract-surgery", "gastroscopy", "spinal-surgery"],
        deductibles: {
            default: 0,
            penalty_non_network: 0,
            scope_penalty: 8000,
            joint_penalty: 0,
            cataract_penalty: 0
        }
    },
    {
        plan_id: "discovery-core-classic-delta-2026",
        plan_name: "Classic Delta Core",
        network_type: "delta",
        available_procedure_ids: ["hip-replacement", "cataract-surgery", "gastroscopy", "spinal-surgery"],
        deductibles: {
            default: 0,
            penalty_non_network: 11100,
            scope_penalty: 8000,
            joint_penalty: 0,
            cataract_penalty: 11100
        }
    },
    {
        plan_id: "discovery-core-essential-2026",
        plan_name: "Essential Core",
        network_type: "any",
        available_procedure_ids: ["hip-replacement", "cataract-surgery", "gastroscopy", "spinal-surgery"],
        deductibles: {
            default: 0,
            penalty_non_network: 0,
            scope_penalty: 8000,
            joint_penalty: 0,
            cataract_penalty: 0
        }
    },
    {
        plan_id: "discovery-core-essential-delta-2026",
        plan_name: "Essential Delta Core",
        network_type: "delta",
        available_procedure_ids: ["hip-replacement", "cataract-surgery", "gastroscopy", "spinal-surgery"],
        deductibles: {
            default: 0,
            penalty_non_network: 11100,
            scope_penalty: 8000,
            joint_penalty: 0,
            cataract_penalty: 11100
        }
    },
    {
        plan_id: "discovery-core-coastal-2026",
        plan_name: "Coastal Core",
        network_type: "coastal",
        available_procedure_ids: ["hip-replacement", "cataract-surgery", "gastroscopy", "spinal-surgery"],
        deductibles: {
            default: 0,
            penalty_non_network: 7250,
            scope_penalty: 8000,
            joint_penalty: 0,
            cataract_penalty: 0
        }
    },

    // --- SMART SERIES (High Efficiency, Restricted Lists) ---
    {
        plan_id: "discovery-smart-classic-2026",
        plan_name: "Classic Smart",
        network_type: "smart",
        available_procedure_ids: ["hip-replacement", "cataract-surgery", "gastroscopy", "spinal-surgery"],
        deductibles: {
            default: 7750,
            penalty_non_network: 12650,
            scope_penalty: 4650,
            joint_penalty: 0,
            cataract_penalty: 12650
        }
    },
    {
        plan_id: "discovery-smart-essential-2026",
        plan_name: "Essential Smart",
        network_type: "smart",
        // EXCLUSION: Hip Replacements are PMB Only on Essential Smart
        available_procedure_ids: ["cataract-surgery", "gastroscopy", "spinal-surgery"],
        deductibles: {
            default: 7750,
            penalty_non_network: 12650,
            scope_penalty: 4650,
            joint_penalty: 999999, // Fallback if forced
            cataract_penalty: 12650
        }
    },
    {
        plan_id: "discovery-smart-active-2026",
        plan_name: "Active Smart",
        network_type: "smart",
        // EXCLUSION: Hip Replacements are PMB Only on Active Smart
        available_procedure_ids: ["cataract-surgery", "gastroscopy", "spinal-surgery"],
        deductibles: {
            default: 7750,
            penalty_non_network: 15300,
            scope_penalty: 4650,
            joint_penalty: 999999,
            cataract_penalty: 15300
        }
    },

    // --- SAVER SERIES (Medical Savings Account) ---
    {
        plan_id: "discovery-saver-classic-2026",
        plan_name: "Classic Saver",
        network_type: "any",
        available_procedure_ids: ["hip-replacement", "cataract-surgery", "gastroscopy", "spinal-surgery"],
        deductibles: {
            default: 0,
            penalty_non_network: 0,
            scope_penalty: 8000,
            joint_penalty: 0,
            cataract_penalty: 0
        }
    },
    {
        plan_id: "discovery-saver-classic-delta-2026",
        plan_name: "Classic Delta Saver",
        network_type: "delta",
        available_procedure_ids: ["hip-replacement", "cataract-surgery", "gastroscopy", "spinal-surgery"],
        deductibles: {
            default: 0,
            penalty_non_network: 11100,
            scope_penalty: 8000,
            joint_penalty: 0,
            cataract_penalty: 11100
        }
    },
    {
        plan_id: "discovery-saver-essential-2026",
        plan_name: "Essential Saver",
        network_type: "any",
        available_procedure_ids: ["hip-replacement", "cataract-surgery", "gastroscopy", "spinal-surgery"],
        deductibles: {
            default: 0,
            penalty_non_network: 0,
            scope_penalty: 8000,
            joint_penalty: 0,
            cataract_penalty: 0
        }
    },
    {
        plan_id: "discovery-saver-coastal-2026",
        plan_name: "Coastal Saver",
        network_type: "coastal",
        available_procedure_ids: ["hip-replacement", "cataract-surgery", "gastroscopy", "spinal-surgery"],
        deductibles: {
            default: 0,
            penalty_non_network: 7250,
            scope_penalty: 8000,
            joint_penalty: 0,
            cataract_penalty: 0
        }
    },

    // --- NEW SMART SAVER SERIES (2026 Hybrid) ---
    {
        plan_id: "discovery-smart-saver-classic-2026",
        plan_name: "Classic Smart Saver",
        network_type: "smart",
        available_procedure_ids: ["hip-replacement", "cataract-surgery", "gastroscopy", "spinal-surgery"],
        deductibles: {
            default: 0,
            penalty_non_network: 12650,
            scope_penalty: 4650,
            joint_penalty: 0,
            cataract_penalty: 12650
        }
    },
    {
        plan_id: "discovery-smart-saver-essential-2026",
        plan_name: "Essential Smart Saver",
        network_type: "smart",
        // EXCLUSION: Follows Essential Smart logic for Joints
        available_procedure_ids: ["cataract-surgery", "gastroscopy", "spinal-surgery"],
        deductibles: {
            default: 0,
            penalty_non_network: 12650,
            scope_penalty: 4650,
            joint_penalty: 999999,
            cataract_penalty: 12650
        }
    }
];

// --- REPOSITORY METHODS ---

export const ProcedureRepository = {
    getById: (slug: string) => PROCEDURES.find(p => p.id === slug),
    getAll: () => PROCEDURES
};

export const PlanRuleRepository = {
    getRuleForPlan: (planId: string) => DUMMY_RULES.find(rule => rule.plan_id === planId),
    getAllRules: () => DUMMY_RULES,
    // Helper to get only valid procedures for a specific plan
    getProceduresForPlan: (planId: string) => {
        const plan = DUMMY_RULES.find(r => r.plan_id === planId);
        if (!plan) return [];
        return PROCEDURES.filter(p => plan.available_procedure_ids.includes(p.id));
    }
};