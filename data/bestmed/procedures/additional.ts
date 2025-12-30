import { BestmedProcedure } from '@/types/schemes/bestmed';

// Maternity Procedures
export const MATERNITY_PROCEDURES: BestmedProcedure[] = [
    {
        id: 'childbirth',
        label: 'Childbirth',
        medical_term: 'Confinement',
        category: 'maternity',
        description: 'Natural confinement or minor assisted delivery.',
        risk_notes: 'Fully covered (100% Scheme tariff). No co-payment.',
        base_cost_estimate: 45000,
    },
    {
        id: 'caesarean',
        label: 'Caesarean Section',
        medical_term: 'Caesarean Section',
        category: 'maternity',
        description: 'Surgical delivery of a baby.',
        risk_notes: 'Fully covered if medically necessary. Elective may happen co-payment.',
        base_cost_estimate: 65000,
    },
];

// Oncology Procedures
export const ONCOLOGY_PROCEDURES: BestmedProcedure[] = [
    {
        id: 'oncology',
        label: 'Oncology',
        medical_term: 'Oncology Treatment',
        category: 'oncology',
        description: 'Cancer treatment including chemotherapy and radiation.',
        risk_notes: 'Subject to pre-authorisation and ICON protocols. Limits apply per plan.',
        base_cost_estimate: 50000, // Monthly cycle estimate?
    },
];

export const ADDITIONAL_PROCEDURES = [
    ...MATERNITY_PROCEDURES,
    ...ONCOLOGY_PROCEDURES,
];
