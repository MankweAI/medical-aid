import { Procedure } from '@/types/schemes/discovery';

/**
 * Ophthalmology Procedures
 * High-value eye surgeries with specific network rules
 */
export const OPHTHALMOLOGY_PROCEDURES: Procedure[] = [
    {
        id: "cataract-surgery",
        label: "Cataract Surgery",
        medical_term: "Phacoemulsification with IOL",
        category: "ophthalmology",
        base_cost_estimate: 28000,
        risk_notes: "Strict Day Surgery Network lists apply. Lens costs may vary.",
        scope_complexity: "single",
        cpt_code: "66984",
        common_diagnoses: [
            { code: "H26.9", label: "Unspecified cataract" },
            { code: "H25.1", label: "Senile nuclear cataract" },
            { code: "H25.0", label: "Senile incipient cataract" }
        ],
        description: "Surgical removal of the clouded natural lens and replacement with an artificial intraocular lens (IOL). Most common elective surgery in South Africa."
    },
    {
        id: "vitrectomy",
        label: "Vitrectomy",
        medical_term: "Pars Plana Vitrectomy",
        category: "ophthalmology",
        base_cost_estimate: 45000,
        risk_notes: "Complex procedure. May require multiple follow-ups.",
        scope_complexity: "single",
        cpt_code: "67036",
        common_diagnoses: [
            { code: "H43.1", label: "Vitreous haemorrhage" },
            { code: "H33.0", label: "Retinal detachment with retinal break" },
            { code: "H35.81", label: "Diabetic macular oedema" }
        ],
        description: "Surgical removal of vitreous gel from the eye, often performed for retinal detachment, diabetic retinopathy, or macular holes."
    },
    {
        id: "laser-eye-surgery",
        label: "Laser Eye Surgery",
        medical_term: "LASIK/PRK Refractive Surgery",
        category: "ophthalmology",
        base_cost_estimate: 35000,
        risk_notes: "Often excluded or limited. Check specific plan rules.",
        scope_complexity: "single",
        cpt_code: "65760",
        common_diagnoses: [
            { code: "H52.1", label: "Myopia" },
            { code: "H52.0", label: "Hypermetropia" },
            { code: "H52.2", label: "Astigmatism" }
        ],
        description: "Laser refractive surgery to correct vision. May be excluded or limited on certain plans as it is considered elective."
    }
];
