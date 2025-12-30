/**
 * Bestmed Procedures
 * 
 * Procedures applicable to Bestmed plans with their co-payment categories.
 */

import { BestmedProcedure } from '@/types/schemes/bestmed';

// ============================================================================
// SCOPE PROCEDURES
// ============================================================================

export const SCOPE_PROCEDURES: BestmedProcedure[] = [
    {
        id: 'gastroscopy',
        label: 'Gastroscopy',
        medical_term: 'Esophagogastroduodenoscopy (EGD)',
        category: 'scope',
        cpt_code: '43235',
        description: 'Examination of the upper digestive tract using an endoscope.',
        risk_notes: 'Common diagnostic procedure. PMB exempt if clinically indicated.',
        base_cost_estimate: 15000,
    },
    {
        id: 'colonoscopy',
        label: 'Colonoscopy',
        medical_term: 'Colonoscopy',
        category: 'scope',
        cpt_code: '45378',
        description: 'Examination of the large intestine using a colonoscope.',
        risk_notes: 'Screening for colorectal conditions. PMB exempt if clinically indicated.',
        base_cost_estimate: 18000,
    },
    {
        id: 'sigmoidoscopy',
        label: 'Sigmoidoscopy',
        medical_term: 'Flexible Sigmoidoscopy',
        category: 'scope',
        cpt_code: '45330',
        description: 'Examination of the lower portion of the colon.',
        risk_notes: 'Less invasive than colonoscopy.',
        base_cost_estimate: 12000,
    },
    {
        id: 'cystoscopy',
        label: 'Cystoscopy',
        medical_term: 'Cystourethroscopy',
        category: 'scope',
        cpt_code: '52000',
        description: 'Examination of the bladder and urethra.',
        risk_notes: 'Urological diagnostic procedure.',
        base_cost_estimate: 14000,
    },
    {
        id: 'hysteroscopy',
        label: 'Hysteroscopy',
        medical_term: 'Hysteroscopy',
        category: 'scope',
        cpt_code: '58555',
        description: 'Examination of the uterine cavity.',
        risk_notes: 'Gynaecological diagnostic procedure.',
        base_cost_estimate: 16000,
    },
];

// ============================================================================
// ORTHOPEDIC PROCEDURES
// ============================================================================

export const ORTHOPEDIC_PROCEDURES: BestmedProcedure[] = [
    {
        id: 'arthroscopic-knee',
        label: 'Knee Arthroscopy',
        medical_term: 'Knee Arthroscopy',
        category: 'orthopedic',
        cpt_code: '29881',
        description: 'Minimally invasive surgery to diagnose and treat knee problems.',
        risk_notes: 'Common orthopedic procedure with R3,660 co-payment.',
        base_cost_estimate: 45000,
    },
    {
        id: 'arthroscopic-shoulder',
        label: 'Shoulder Arthroscopy',
        medical_term: 'Shoulder Arthroscopy',
        category: 'orthopedic',
        cpt_code: '29826',
        description: 'Minimally invasive surgery for shoulder conditions.',
        risk_notes: 'R3,660 co-payment unless PMB.',
        base_cost_estimate: 50000,
    },
];

// ============================================================================
// SPINAL PROCEDURES
// ============================================================================

export const SPINAL_PROCEDURES: BestmedProcedure[] = [
    {
        id: 'back-surgery',
        label: 'Back Surgery',
        medical_term: 'Lumbar Discectomy',
        category: 'spinal',
        cpt_code: '63030',
        description: 'Surgical procedure on the lumbar spine.',
        risk_notes: 'R3,660 co-payment. Requires pre-authorisation.',
        base_cost_estimate: 120000,
    },
    {
        id: 'neck-surgery',
        label: 'Neck Surgery',
        medical_term: 'Cervical Discectomy',
        category: 'spinal',
        cpt_code: '63020',
        description: 'Surgical procedure on the cervical spine.',
        risk_notes: 'R3,660 co-payment. Requires pre-authorisation.',
        base_cost_estimate: 130000,
    },
];

// ============================================================================
// LAPAROSCOPIC PROCEDURES
// ============================================================================

export const LAPAROSCOPIC_PROCEDURES: BestmedProcedure[] = [
    {
        id: 'laparoscopic-cholecystectomy',
        label: 'Gallbladder Removal',
        medical_term: 'Laparoscopic Cholecystectomy',
        category: 'laparoscopic',
        cpt_code: '47562',
        description: 'Minimally invasive removal of the gallbladder.',
        risk_notes: 'R3,660 co-payment unless PMB.',
        base_cost_estimate: 55000,
    },
    {
        id: 'laparoscopic-appendectomy',
        label: 'Appendix Removal',
        medical_term: 'Laparoscopic Appendectomy',
        category: 'laparoscopic',
        cpt_code: '44970',
        description: 'Minimally invasive removal of the appendix.',
        risk_notes: 'Usually qualifies as PMB (emergency).',
        base_cost_estimate: 45000,
    },
];

// ============================================================================
// IMAGING PROCEDURES
// ============================================================================

export const IMAGING_PROCEDURES: BestmedProcedure[] = [
    {
        id: 'mri-scan',
        label: 'MRI Scan',
        medical_term: 'Magnetic Resonance Imaging',
        category: 'imaging',
        cpt_code: '70553',
        description: 'Detailed imaging using magnetic fields.',
        risk_notes: 'R2,600 co-payment per scan. Annual limit R20,920/family.',
        base_cost_estimate: 8000,
    },
    {
        id: 'ct-scan',
        label: 'CT Scan',
        medical_term: 'Computed Tomography',
        category: 'imaging',
        cpt_code: '70460',
        description: 'Cross-sectional imaging using X-rays.',
        risk_notes: 'R2,600 co-payment per scan. Annual limit R20,920/family.',
        base_cost_estimate: 6000,
    },
];

// ============================================================================
// JOINT REPLACEMENT
// ============================================================================

export const JOINT_REPLACEMENT_PROCEDURES: BestmedProcedure[] = [
    {
        id: 'hip-replacement',
        label: 'Hip Replacement',
        medical_term: 'Total Hip Arthroplasty',
        category: 'joint_replacement',
        cpt_code: '27130',
        description: 'Surgical replacement of the hip joint.',
        risk_notes: 'Prosthesis limit R41,918. PMB may apply.',
        base_cost_estimate: 180000,
    },
    {
        id: 'knee-replacement',
        label: 'Knee Replacement',
        medical_term: 'Total Knee Arthroplasty',
        category: 'joint_replacement',
        cpt_code: '27447',
        description: 'Surgical replacement of the knee joint.',
        risk_notes: 'Prosthesis limit R51,686. PMB may apply.',
        base_cost_estimate: 190000,
    },
];

// ============================================================================
// NASAL/SINUS PROCEDURES
// ============================================================================

export const NASAL_PROCEDURES: BestmedProcedure[] = [
    {
        id: 'septoplasty',
        label: 'Septoplasty',
        medical_term: 'Nasal Septum Repair',
        category: 'nasal',
        cpt_code: '30520',
        description: 'Surgical correction of a deviated nasal septum.',
        risk_notes: 'R2,000 co-payment unless PMB.',
        base_cost_estimate: 35000,
    },
    {
        id: 'sinus-surgery',
        label: 'Sinus Surgery',
        medical_term: 'Functional Endoscopic Sinus Surgery',
        category: 'nasal',
        cpt_code: '31254',
        description: 'Surgical treatment for chronic sinusitis.',
        risk_notes: 'R2,000 co-payment unless PMB.',
        base_cost_estimate: 40000,
    },
];

// ============================================================================
// ALL PROCEDURES EXPORT
// ============================================================================

export const ALL_BESTMED_PROCEDURES: BestmedProcedure[] = [
    ...SCOPE_PROCEDURES,
    ...ORTHOPEDIC_PROCEDURES,
    ...SPINAL_PROCEDURES,
    ...LAPAROSCOPIC_PROCEDURES,
    ...IMAGING_PROCEDURES,
    ...JOINT_REPLACEMENT_PROCEDURES,
    ...NASAL_PROCEDURES,
];

export default ALL_BESTMED_PROCEDURES;
