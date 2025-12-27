import { Procedure } from '@/types/schemes/discovery';

/**
 * Scope Procedures (Gastroscopy, Colonoscopy)
 * High-intent procedures with specific co-payment rules
 */
export const SCOPE_PROCEDURES: Procedure[] = [
    {
        id: "gastroscopy",
        label: "Gastroscopy",
        medical_term: "Upper GI Endoscopy",
        category: "scope",
        base_cost_estimate: 8500,
        risk_notes: "Must use Day Clinic to avoid high deductibles.",
        scope_complexity: "single",
        cpt_code: "43235",
        common_diagnoses: [
            { code: "K21.9", label: "Gastro-oesophageal reflux disease" },
            { code: "K25", label: "Gastric ulcer" },
            { code: "D50", label: "Iron deficiency anaemia" }
        ],
        description: "A gastroscopy involves using a camera to inspect the oesophagus, stomach, and duodenum. It is strictly classified as an upper-gastrointestinal endoscopic procedure."
    },
    {
        id: "colonoscopy",
        label: "Colonoscopy",
        medical_term: "Lower GI Endoscopy",
        category: "scope",
        base_cost_estimate: 9500,
        risk_notes: "Must use Day Clinic.",
        scope_complexity: "single",
        cpt_code: "45378",
        common_diagnoses: [
            { code: "Z12.11", label: "Screening for malignant neoplasm" },
            { code: "K50", label: "Crohn's disease" },
            { code: "K57", label: "Diverticular disease" }
        ],
        description: "A colonoscopy involves the examination of the large bowel and the distal part of the small bowel. It is classified as a lower-gastrointestinal endoscopic procedure."
    },
    {
        id: "bi-directional-scopes",
        label: "Bi-Directional Scopes",
        medical_term: "Combined Upper and Lower GI Endoscopy",
        category: "scope",
        base_cost_estimate: 15000,
        risk_notes: "Combined procedure - check for combo pricing.",
        scope_complexity: "combo",
        cpt_code: "43235+45378",
        common_diagnoses: [
            { code: "K92.2", label: "Gastrointestinal haemorrhage, unspecified" },
            { code: "R10.4", label: "Other and unspecified abdominal pain" }
        ],
        description: "A bi-directional scope combines both gastroscopy and colonoscopy in a single procedure, typically performed under one anaesthetic."
    }
];
