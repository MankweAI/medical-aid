// data/scenarios.ts
import { ClinicalScenario } from '@/types/simulation';

export const SCENARIO_DB: ClinicalScenario[] = [
    // =========================================================================
    // 1. MATERNITY: The "Happy Event" Stress Test
    // =========================================================================
    {
        id: 'maternity-natural-private',
        title: 'Natural Birth (Private Hospital)',
        category: 'Maternity',
        description: 'A standard pregnancy journey culminating in a natural delivery at a private hospital. This scenario tests your "Above Threshold" limits and specialist coverage.',
        line_items: [
            // PHASE 1: Antenatal (Out of Hospital)
            {
                label: 'Confirmation Consult (GP)',
                quantity: 1,
                cost_per_unit: 650,
                setting: 'Out_of_Hospital',
                category: 'GP',
                is_pmb: true, // Diagnosis of pregnancy is PMB
                phase: 'Preparation'
            },
            {
                label: 'Gynae Consultations (Antenatal)',
                quantity: 8, // Standard frequency
                cost_per_unit: 1400, // Private Rate (often 200-300% of scheme rate)
                setting: 'Out_of_Hospital',
                category: 'Specialist',
                is_pmb: false, // Schemes usually have a basket, but excess is user risk
                phase: 'Preparation'
            },
            {
                label: '2D Ultrasound Scans',
                quantity: 2,
                cost_per_unit: 2200,
                setting: 'Out_of_Hospital',
                category: 'Radiology', // Maps to 'Pathology' or add 'Radiology' to types
                is_pmb: false,
                phase: 'Preparation'
            },

            // PHASE 2: The Event (In Hospital)
            {
                label: 'Private Hospital Admission (3 Days)',
                quantity: 1,
                cost_per_unit: 28500, // Facility Fee
                setting: 'In_Hospital',
                category: 'Facility',
                is_pmb: true, // Delivery is PMB, but "Private" facility choice matters
                phase: 'The Event'
            },
            {
                label: 'Gynae Delivery Fee',
                quantity: 1,
                cost_per_unit: 12000, // High shortfall risk here
                setting: 'In_Hospital',
                category: 'Specialist',
                is_pmb: true,
                phase: 'The Event'
            },
            {
                label: 'Epidural (Anaesthetist)',
                quantity: 1,
                cost_per_unit: 4500, // Often distinct from hospital bill
                setting: 'In_Hospital',
                category: 'Specialist',
                is_pmb: false, // Pain relief is often not PMB unless medically indicated
                phase: 'The Event'
            },
            {
                label: 'Paediatrician (Newborn Check)',
                quantity: 1,
                cost_per_unit: 2800,
                setting: 'In_Hospital',
                category: 'Specialist',
                is_pmb: true,
                phase: 'The Event'
            },

            // PHASE 3: Post-Natal
            {
                label: 'Take-home Medication',
                quantity: 1,
                cost_per_unit: 850,
                setting: 'Out_of_Hospital',
                category: 'Medication',
                is_pmb: false,
                phase: 'Recovery'
            }
        ]
    },

    // =========================================================================
    // 2. CHRONIC: The "Maintenance" Stress Test
    // =========================================================================
    {
        id: 'chronic-diabetes-type2',
        title: 'Managing Type 2 Diabetes',
        category: 'Chronic',
        description: 'Ongoing management of a chronic condition for one year. This tests your Chronic Benefit formulary and network provider restrictions.',
        line_items: [
            // ROUTINE CARE
            {
                label: 'GP Check-ups (Routine)',
                quantity: 4, // Quarterly
                cost_per_unit: 600,
                setting: 'Out_of_Hospital',
                category: 'GP',
                is_pmb: true, // Diabetes is a CDL condition
                phase: 'Routine Care'
            },
            {
                label: 'HbA1c Blood Tests',
                quantity: 2, // Bi-annual
                cost_per_unit: 1100,
                setting: 'Out_of_Hospital',
                category: 'Pathology',
                is_pmb: true,
                phase: 'Routine Care'
            },

            // MEDICATION (The Monthly Grind)
            {
                label: 'Metformin & Insulin (Monthly Supply)',
                quantity: 12,
                cost_per_unit: 950,
                setting: 'Out_of_Hospital',
                category: 'Medication',
                is_pmb: true, // BUT restricted by formulary/network on cheaper plans
                phase: 'Medication'
            },

            // SPECIALIST OVERSIGHT
            {
                label: 'Endocrinologist Consult',
                quantity: 1, // Annual review
                cost_per_unit: 3500, // Expensive
                setting: 'Out_of_Hospital',
                category: 'Specialist',
                is_pmb: true, // Often requires "Care Plan" approval to be fully covered
                phase: 'Specialist Oversight'
            },
            {
                label: 'Ophthalmologist (Retina Check)',
                quantity: 1,
                cost_per_unit: 2200,
                setting: 'Out_of_Hospital',
                category: 'Specialist',
                is_pmb: false, // Often paid from savings
                phase: 'Specialist Oversight'
            }
        ]
    }
];