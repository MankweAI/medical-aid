// lib/risk/repositories.ts
import { Procedure, PlanDeductibleRule } from '@/types/risk';

// --- PROCEDURE DEFINITIONS ---
const PROCEDURES: Procedure[] = [
    {
        id: "hip-replacement",
        label: "Hip Replacement",
        medical_term: "Total Hip Arthroplasty",
        category: "major_joint",
        base_cost_estimate: 192000,
        risk_notes: "Essential Smart excludes this (PMB only)."
    },
    {
        id: "cataract-surgery",
        label: "Cataract Surgery",
        medical_term: "Phacoemulsification",
        category: "ophthalmology",
        base_cost_estimate: 28000,
        risk_notes: "Strict network lists apply."
    },
    {
        id: "gastroscopy",
        label: "Gastroscopy",
        medical_term: "Upper GI Endoscopy",
        category: "scope",
        base_cost_estimate: 8500,
        risk_notes: "Must use Day Clinic to avoid high deductibles.",
        scope_complexity: "single"
    },
    {
        id: "colonoscopy",
        label: "Colonoscopy",
        medical_term: "Lower GI Endoscopy",
        category: "scope",
        base_cost_estimate: 9500,
        risk_notes: "Must use Day Clinic.",
        scope_complexity: "single"
    },
    {
        id: "gastroscopy-colonoscopy",
        label: "Gastroscopy & Colonoscopy",
        medical_term: "Bi-directional Endoscopy",
        category: "scope",
        base_cost_estimate: 14500,
        risk_notes: "Combined procedure rule applies.",
        scope_complexity: "combo"
    },
    {
        id: "spinal-surgery",
        label: "Spinal Surgery",
        medical_term: "Laminectomy/Fusion",
        category: "spinal",
        base_cost_estimate: 150000,
        risk_notes: "Subject to spinal prosthesis limits."
    }
];

// --- 2026 ACTUARIAL RULES ---
const DUMMY_RULES: PlanDeductibleRule[] = [
    // --- CORE SERIES ---
    {
        plan_id: "discovery-core-classic-2026",
        plan_name: "Classic Core",
        plan_series: "core",
        network_type: "any",
        available_procedure_ids: ["hip-replacement", "cataract-surgery", "gastroscopy", "colonoscopy", "gastroscopy-colonoscopy", "spinal-surgery"],
        deductibles: {
            default: 0,
            penalty_non_network: 0,
            scope_structure: {
                day_clinic_single: 0,
                day_clinic_combo: 0,
                hospital_network_single: 8000,
                hospital_network_combo: 9950,
                hospital_non_network_single: 8000,
                hospital_non_network_combo: 9950,
                rooms_single: 0,
                rooms_combo: 0,
                penalty_outside_day_surgery: 8000
            },
            hip_replacement_penalty: 0,
            cataract_penalty: 0,
            spinal_surgery_penalty: 0
        }
    },
    {
        plan_id: "discovery-core-classic-delta-2026",
        plan_name: "Classic Delta Core",
        plan_series: "core",
        network_type: "delta",
        available_procedure_ids: ["hip-replacement", "cataract-surgery", "gastroscopy", "colonoscopy", "gastroscopy-colonoscopy", "spinal-surgery"],
        deductibles: {
            default: 0,
            penalty_non_network: 11100,
            scope_structure: {
                day_clinic_single: 0,
                day_clinic_combo: 0,
                hospital_network_single: 8000,
                hospital_network_combo: 9950,
                hospital_non_network_single: 8000,
                hospital_non_network_combo: 9950,
                rooms_single: 0,
                rooms_combo: 0,
                penalty_outside_day_surgery: 8000
            },
            hip_replacement_penalty: 0,
            cataract_penalty: 11100, // Delta Specific
            spinal_surgery_penalty: 0
        }
    },

    // --- SMART SERIES ---
    {
        plan_id: "discovery-smart-classic-2026",
        plan_name: "Classic Smart",
        plan_series: "smart",
        network_type: "smart",
        available_procedure_ids: ["hip-replacement", "cataract-surgery", "gastroscopy", "colonoscopy", "gastroscopy-colonoscopy", "spinal-surgery"],
        deductibles: {
            default: 7750,
            penalty_non_network: 12650,
            scope_structure: {
                day_clinic_single: 4650,
                day_clinic_combo: 5700,
                hospital_network_single: 5450,
                hospital_network_combo: 6850,
                hospital_non_network_single: 12650,
                hospital_non_network_combo: 14750,
                rooms_single: 1800,
                rooms_combo: 3100,
                penalty_outside_day_surgery: 7750
            },
            hip_replacement_penalty: 0,
            cataract_penalty: 7100, // Smart Specific
            spinal_surgery_penalty: 0
        }
    },
    {
        plan_id: "discovery-smart-essential-2026",
        plan_name: "Essential Smart",
        plan_series: "smart",
        network_type: "smart",
        available_procedure_ids: ["cataract-surgery", "gastroscopy", "colonoscopy", "gastroscopy-colonoscopy", "spinal-surgery"],
        deductibles: {
            default: 7750,
            penalty_non_network: 12650,
            scope_structure: {
                day_clinic_single: 4650,
                day_clinic_combo: 5700,
                hospital_network_single: 5450,
                hospital_network_combo: 6850,
                hospital_non_network_single: 12650,
                hospital_non_network_combo: 14750,
                rooms_single: 1800,
                rooms_combo: 3100,
                penalty_outside_day_surgery: 7750
            },
            cataract_penalty: 12650,
            spinal_surgery_penalty: 0
        }
    }
];

// --- REPOSITORY METHODS ---

export const ProcedureRepository = {
    getById: (slug: string) => PROCEDURES.find(p => p.id === slug),
    getAll: () => PROCEDURES
};

export const PlanRuleRepository = {
    getRuleForPlan: (planId: string) => DUMMY_RULES.find(r => r.plan_id === planId),
    getAllRules: () => DUMMY_RULES
};