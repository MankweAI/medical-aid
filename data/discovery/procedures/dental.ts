import { Procedure } from '@/types/schemes/discovery';

/**
 * Dental Procedures
 * High-intent procedures requiring hospital/day clinic admission
 */
export const DENTAL_PROCEDURES: Procedure[] = [
    {
        id: "dental-surgery",
        label: "Dental Surgery",
        medical_term: "Severe Dental and Oral Surgery",
        category: "dental",
        base_cost_estimate: 25000,
        risk_notes: "Requires pre-authorisation. Age-based co-payments apply.",
        scope_complexity: "single",
        cpt_code: "41899",
        common_diagnoses: [
            { code: "K08.1", label: "Loss of teeth due to accident, extraction or local periodontal disease" },
            { code: "K04.7", label: "Periapical abscess without sinus" },
            { code: "K10.2", label: "Inflammatory conditions of jaws" }
        ],
        description: "Severe dental and oral surgery performed in hospital or day clinic under general anaesthesia. Includes complex extractions, jaw surgery, and oral pathology procedures."
    },
    {
        id: "wisdom-teeth-extraction",
        label: "Wisdom Teeth Extraction",
        medical_term: "Third Molar Extraction Under GA",
        category: "dental",
        base_cost_estimate: 18000,
        risk_notes: "Requires pre-authorisation for hospital admission.",
        scope_complexity: "single",
        cpt_code: "41820",
        common_diagnoses: [
            { code: "K01.1", label: "Impacted teeth" },
            { code: "K05.2", label: "Acute pericoronitis" }
        ],
        description: "Surgical removal of impacted or problematic wisdom teeth under general anaesthesia in a hospital or day clinic setting."
    }
];
