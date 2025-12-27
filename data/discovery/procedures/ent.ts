import { Procedure } from '@/types/schemes/discovery';

/**
 * ENT (Ear, Nose, Throat) Procedures
 * Common day surgery network procedures
 */
export const ENT_PROCEDURES: Procedure[] = [
    {
        id: "tonsillectomy",
        label: "Tonsillectomy",
        medical_term: "Tonsillectomy",
        category: "ent",
        base_cost_estimate: 35000,
        risk_notes: "Day Surgery Network rules apply. May require overnight stay for children.",
        scope_complexity: "single",
        cpt_code: "42826",
        common_diagnoses: [
            { code: "J35.0", label: "Chronic tonsillitis" },
            { code: "J35.3", label: "Hypertrophy of tonsils with hypertrophy of adenoids" },
            { code: "G47.30", label: "Sleep apnoea, unspecified" }
        ],
        description: "Surgical removal of the tonsils, often performed for recurrent tonsillitis or obstructive sleep apnoea."
    },
    {
        id: "adenoidectomy",
        label: "Adenoidectomy",
        medical_term: "Adenoidectomy",
        category: "ent",
        base_cost_estimate: 25000,
        risk_notes: "Often combined with tonsillectomy. Day Surgery Network applies.",
        scope_complexity: "single",
        cpt_code: "42830",
        common_diagnoses: [
            { code: "J35.2", label: "Hypertrophy of adenoids" },
            { code: "J35.3", label: "Hypertrophy of tonsils with hypertrophy of adenoids" },
            { code: "H65.2", label: "Chronic serous otitis media" }
        ],
        description: "Surgical removal of the adenoids, commonly performed in children for recurrent ear infections or breathing difficulties."
    },
    {
        id: "grommets",
        label: "Grommet Insertion",
        medical_term: "Myringotomy with Tympanostomy Tube Insertion",
        category: "ent",
        base_cost_estimate: 18000,
        risk_notes: "Common paediatric procedure. Day Surgery Network applies.",
        scope_complexity: "single",
        cpt_code: "69436",
        common_diagnoses: [
            { code: "H65.2", label: "Chronic serous otitis media" },
            { code: "H65.0", label: "Acute serous otitis media" },
            { code: "H66.9", label: "Otitis media, unspecified" }
        ],
        description: "Small tubes inserted into the eardrum to drain fluid and prevent recurrent ear infections, typically in children."
    },
    {
        id: "septoplasty",
        label: "Septoplasty",
        medical_term: "Nasal Septum Repair",
        category: "ent",
        base_cost_estimate: 40000,
        risk_notes: "May be excluded on some plans. Check functional vs cosmetic classification.",
        scope_complexity: "single",
        cpt_code: "30520",
        common_diagnoses: [
            { code: "J34.2", label: "Deviated nasal septum" },
            { code: "J34.8", label: "Other specified disorders of nose" }
        ],
        description: "Surgical correction of a deviated nasal septum to improve breathing. May be excluded if classified as cosmetic."
    }
];
