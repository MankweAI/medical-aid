// lib/risk/repositories.ts
import { Procedure, PlanDeductibleRule } from '@/types/risk';

// --- PROCEDURE DEFINITIONS (Updated with 2026 Context) ---
const DUMMY_PROCEDURES: Procedure[] = [
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
// Data Source: 2026 Discovery Health Brochures (Period: April - Dec 2026)
// Status: VERIFIED via Deep Research Extraction

const DUMMY_RULES: PlanDeductibleRule[] = [
    // --- CORE SERIES ---
    {
        plan_id: "discovery-core-classic-2026",
        plan_name: "Classic Core",
        network_type: "any",
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
        deductibles: {
            default: 0,
            penalty_non_network: 11100,
            scope_penalty: 8000,
            joint_penalty: 0, // 20% co-pay or limit applies, but no fixed R-value deductible
            cataract_penalty: 11100
        }
    },
    {
        plan_id: "discovery-core-essential-2026",
        plan_name: "Essential Core",
        network_type: "any",
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
        deductibles: {
            default: 0,
            penalty_non_network: 7250, // Day surgery penalty. General is 30%
            scope_penalty: 8000,
            joint_penalty: 0,
            cataract_penalty: 0
        }
    },

    // --- SMART SERIES ---
    {
        plan_id: "discovery-smart-classic-2026",
        plan_name: "Classic Smart",
        network_type: "smart",
        deductibles: {
            default: 7750, // General In-Hospital Deductible often applies
            penalty_non_network: 12650,
            scope_penalty: 4650, // Differs from Core (Smart Network Rule)
            joint_penalty: 0, // Restricted Benefit
            cataract_penalty: 12650
        }
    },
    {
        plan_id: "discovery-smart-essential-2026",
        plan_name: "Essential Smart",
        network_type: "smart",
        deductibles: {
            default: 7750,
            penalty_non_network: 12650,
            scope_penalty: 4650,
            joint_penalty: 999999, // PMB Only - Effectively Full Liability
            cataract_penalty: 12650
        }
    },
    {
        plan_id: "discovery-smart-active-2026",
        plan_name: "Active Smart",
        network_type: "smart",
        deductibles: {
            default: 7750,
            penalty_non_network: 15300,
            scope_penalty: 4650,
            joint_penalty: 999999, // PMB Only
            cataract_penalty: 15300
        }
    },

    // --- SAVER SERIES ---
    {
        plan_id: "discovery-saver-classic-2026",
        plan_name: "Classic Saver",
        network_type: "any",
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
        deductibles: {
            default: 0,
            penalty_non_network: 12650,
            scope_penalty: 4650, // Aligns with Smart Series rules
            joint_penalty: 0,
            cataract_penalty: 12650
        }
    },
    {
        plan_id: "discovery-smart-saver-essential-2026",
        plan_name: "Essential Smart Saver",
        network_type: "smart",
        deductibles: {
            default: 0,
            penalty_non_network: 12650,
            scope_penalty: 4650,
            joint_penalty: 0,
            cataract_penalty: 12650
        }
    }
];

// --- REPOSITORY METHODS ---

export const ProcedureRepository = {
    getById: (slug: string) => DUMMY_PROCEDURES.find(p => p.id === slug),
    getAll: () => DUMMY_PROCEDURES
};

export const PlanRuleRepository = {
    getById: (planId: string) => DUMMY_RULES.find(r => r.plan_id === planId),
    getRuleForPlan: (planId: string) => DUMMY_RULES.find(r => r.plan_id === planId),
    getAllRules: () => DUMMY_RULES
};