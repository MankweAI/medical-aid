// data/procedures.ts

export const PROCEDURES = [
    { id: "knee-replacement", name: "Total Knee Replacement", category: "Orthopaedic" },
    { id: "hip-replacement", name: "Total Hip Replacement", category: "Orthopaedic" },
    { id: "spinal-fusion", name: "Spinal Fusion / Laminectomy", category: "Neurosurgery" },
    { id: "gastroscopy", name: "Gastroscopy (Scope)", category: "Diagnostic" },
    { id: "colonoscopy", name: "Colonoscopy (Scope)", category: "Diagnostic" },
    { id: "cataract-surgery", name: "Ophthalmology / Cataract", category: "Ophthalmology" },
    { id: "caesarean-section", name: "Elective Caesarean Section", category: "Maternity" },
    { id: "tonsillectomy", name: "Tonsillectomy", category: "ENT" },
    { id: "grommets", name: "Grommet Insertion", category: "ENT" },
    { id: "inguinal-hernia", name: "Inguinal Hernia Repair", category: "General Surgery" },
    { id: "gallbladder", name: "Gallbladder Removal (Cholecystectomy)", category: "General Surgery" },
    { id: "hysterectomy", name: "Hysterectomy", category: "Gynaecology" }
];

export const PLAN_PROCEDURE_RULES: Record<string, any> = {
    "classic-smart": {
        base_deductible: 7750,
        scope_penalty: 5000,
        non_day_surgery_penalty: 7750,
        note: "R7,750 upfront for all elective admissions."[cite: 32, 124]
    },
    "essential-dynamic-smart": {
        base_deductible: 15300,
        note: "Highest procedural deductible in the Smart series."[cite: 178]
    },
    "classic-delta-core": {
        non_network_penalty: 11100,
        note: "Admission to non-Delta hospital triggers this deductible."[cite: 163]
    },
    "classic-smart-comprehensive": {
        non_network_penalty: 12650,
        note: "Using non-Smart hospitals on this plan carries high risk."[cite: 113]
    }
};