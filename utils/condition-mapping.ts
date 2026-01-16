/**
 * Condition Mapping - Maps procedures to condition baskets
 * 
 * This utility provides the mapping from individual procedures to their
 * parent medical conditions for the Condition-Specific Actuarial Optimization Engine.
 * 
 * @version 2026
 */

// ============================================================================
// CONDITION DEFINITIONS
// ============================================================================

export type ConditionSlug =
    | 'digestive-disorders'
    | 'joint-care'
    | 'knee-injuries'
    | 'hip-conditions'
    | 'spinal-conditions'
    | 'eye-health'
    | 'maternity-care'
    | 'dental-conditions'
    | 'nasal-sinus-conditions'
    | 'cancer-care'
    | 'imaging-diagnostics'
    | 'general-surgery';

export interface ConditionDefinition {
    slug: ConditionSlug;
    label: string;
    description: string;
    /** Common ICD-10 codes associated with this condition */
    icd10Codes: string[];
    /** SEO-optimized keywords */
    keywords: string[];
}

/**
 * Master list of conditions with metadata
 */
export const CONDITIONS: Record<ConditionSlug, ConditionDefinition> = {
    'digestive-disorders': {
        slug: 'digestive-disorders',
        label: 'Digestive Disorders',
        description: 'Conditions affecting the gastrointestinal tract including stomach, intestines, and colon.',
        icd10Codes: ['K21', 'K25', 'K29', 'K50', 'K51', 'K57', 'K58'],
        keywords: ['gastroscopy', 'colonoscopy', 'endoscopy', 'stomach', 'digestive', 'GERD', 'ulcer', 'IBS'],
    },
    'joint-care': {
        slug: 'joint-care',
        label: 'Joint Care',
        description: 'Major joint conditions requiring surgical intervention including replacements.',
        icd10Codes: ['M16', 'M17', 'M19', 'M25'],
        keywords: ['joint replacement', 'arthroplasty', 'arthritis', 'osteoarthritis'],
    },
    'knee-injuries': {
        slug: 'knee-injuries',
        label: 'Knee Injuries',
        description: 'Knee-specific injuries including ligament tears and cartilage damage.',
        icd10Codes: ['S83', 'M23', 'M17'],
        keywords: ['ACL', 'meniscus', 'knee arthroscopy', 'ligament', 'knee surgery'],
    },
    'hip-conditions': {
        slug: 'hip-conditions',
        label: 'Hip Conditions',
        description: 'Hip disorders including degeneration and fractures requiring surgical care.',
        icd10Codes: ['M16', 'S72', 'M87'],
        keywords: ['hip replacement', 'hip arthroplasty', 'hip fracture', 'avascular necrosis'],
    },
    'spinal-conditions': {
        slug: 'spinal-conditions',
        label: 'Spinal Conditions',
        description: 'Back and neck conditions requiring surgical intervention.',
        icd10Codes: ['M51', 'M47', 'M54', 'G55'],
        keywords: ['back surgery', 'spinal fusion', 'disc herniation', 'laminectomy', 'neck surgery'],
    },
    'eye-health': {
        slug: 'eye-health',
        label: 'Eye Health',
        description: 'Ophthalmological conditions requiring surgical treatment.',
        icd10Codes: ['H25', 'H26', 'H40', 'H35'],
        keywords: ['cataract', 'glaucoma', 'LASIK', 'retina', 'eye surgery'],
    },
    'maternity-care': {
        slug: 'maternity-care',
        label: 'Maternity Care',
        description: 'Pregnancy and childbirth related care and procedures.',
        icd10Codes: ['O80', 'O82', 'O60', 'O30'],
        keywords: ['pregnancy', 'childbirth', 'caesarean', 'c-section', 'delivery', 'maternity'],
    },
    'dental-conditions': {
        slug: 'dental-conditions',
        label: 'Dental Conditions',
        description: 'Dental and oral surgery conditions requiring hospital treatment.',
        icd10Codes: ['K00', 'K01', 'K02', 'K04', 'K08'],
        keywords: ['dental surgery', 'wisdom teeth', 'oral surgery', 'tooth extraction'],
    },
    'nasal-sinus-conditions': {
        slug: 'nasal-sinus-conditions',
        label: 'Nasal & Sinus Conditions',
        description: 'ENT conditions affecting the nose and sinuses.',
        icd10Codes: ['J32', 'J33', 'J34', 'J35'],
        keywords: ['sinus surgery', 'septoplasty', 'nasal polyps', 'tonsillectomy', 'adenoidectomy'],
    },
    'cancer-care': {
        slug: 'cancer-care',
        label: 'Cancer Care',
        description: 'Oncology treatment and cancer-related surgical procedures.',
        icd10Codes: ['C00-C97'],
        keywords: ['oncology', 'cancer treatment', 'chemotherapy', 'radiation', 'tumor'],
    },
    'imaging-diagnostics': {
        slug: 'imaging-diagnostics',
        label: 'Imaging & Diagnostics',
        description: 'Advanced diagnostic imaging procedures.',
        icd10Codes: [],
        keywords: ['MRI', 'CT scan', 'PET scan', 'imaging', 'diagnostic'],
    },
    'general-surgery': {
        slug: 'general-surgery',
        label: 'General Surgery',
        description: 'General surgical procedures not categorized elsewhere.',
        icd10Codes: [],
        keywords: ['hernia', 'appendectomy', 'gallbladder', 'laparoscopy'],
    },
};

// ============================================================================
// PROCEDURE TO CONDITION MAPPING
// ============================================================================

/**
 * Maps procedure slugs to their parent condition.
 * This is the core mapping used for redirects and navigation.
 */
export const PROCEDURE_TO_CONDITION_MAP: Record<string, ConditionSlug> = {
    // Digestive Disorders
    'gastroscopy': 'digestive-disorders',
    'colonoscopy': 'digestive-disorders',
    'sigmoidoscopy': 'digestive-disorders',
    'endoscopy': 'digestive-disorders',
    'proctoscopy': 'digestive-disorders',
    'bi-directional-scopes': 'digestive-disorders',

    // Joint Care (General)
    'joint-replacement': 'joint-care',
    'arthroplasty': 'joint-care',
    'shoulder-replacement': 'joint-care',
    'elbow-replacement': 'joint-care',

    // Knee Injuries
    'acl-reconstruction': 'knee-injuries',
    'knee-arthroscopy': 'knee-injuries',
    'knee-replacement': 'knee-injuries',
    'meniscus-repair': 'knee-injuries',

    // Hip Conditions
    'hip-replacement': 'hip-conditions',
    'hip-arthroscopy': 'hip-conditions',
    'hip-resurfacing': 'hip-conditions',

    // Spinal Conditions
    'back-surgery': 'spinal-conditions',
    'spinal-fusion': 'spinal-conditions',
    'laminectomy': 'spinal-conditions',
    'discectomy': 'spinal-conditions',
    'back-neck-surgery': 'spinal-conditions',

    // Eye Health
    'cataract-surgery': 'eye-health',
    'cataract': 'eye-health',
    'glaucoma-surgery': 'eye-health',
    'lasik': 'eye-health',
    'retinal-surgery': 'eye-health',

    // Maternity Care
    'caesarean-section': 'maternity-care',
    'c-section': 'maternity-care',
    'natural-delivery': 'maternity-care',
    'vaginal-delivery': 'maternity-care',

    // Dental Conditions
    'dental-surgery': 'dental-conditions',
    'wisdom-teeth-extraction': 'dental-conditions',
    'oral-surgery': 'dental-conditions',

    // Nasal & Sinus
    'septoplasty': 'nasal-sinus-conditions',
    'sinus-surgery': 'nasal-sinus-conditions',
    'tonsillectomy': 'nasal-sinus-conditions',
    'adenoidectomy': 'nasal-sinus-conditions',
    'nasal-sinus': 'nasal-sinus-conditions',

    // Cancer Care
    'mastectomy': 'cancer-care',
    'tumor-removal': 'cancer-care',
    'biopsy': 'cancer-care',

    // Imaging & Diagnostics
    'mri-scan': 'imaging-diagnostics',
    'ct-scan': 'imaging-diagnostics',
    'pet-scan': 'imaging-diagnostics',
    'mri-ct-scan': 'imaging-diagnostics',

    // General Surgery
    'hernia-repair': 'general-surgery',
    'appendectomy': 'general-surgery',
    'cholecystectomy': 'general-surgery',
    'laparoscopic-surgery': 'general-surgery',
    'laparoscopic': 'general-surgery',
    'arthroscopic': 'general-surgery',
    'cystoscopy': 'general-surgery',
    'hysteroscopy': 'general-surgery',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get the condition for a given procedure slug.
 * Returns 'general-surgery' as fallback if not found.
 */
export function getConditionForProcedure(procedureSlug: string): ConditionSlug {
    const normalizedSlug = procedureSlug.toLowerCase().replace(/_/g, '-');
    return PROCEDURE_TO_CONDITION_MAP[normalizedSlug] || 'general-surgery';
}

/**
 * Get the condition definition for a procedure slug.
 */
export function getConditionDefinitionForProcedure(procedureSlug: string): ConditionDefinition {
    const conditionSlug = getConditionForProcedure(procedureSlug);
    return CONDITIONS[conditionSlug];
}

/**
 * Get all procedures that belong to a condition.
 */
export function getProceduresForCondition(conditionSlug: ConditionSlug): string[] {
    return Object.entries(PROCEDURE_TO_CONDITION_MAP)
        .filter(([, condition]) => condition === conditionSlug)
        .map(([procedure]) => procedure);
}

/**
 * Get all condition slugs.
 */
export function getAllConditionSlugs(): ConditionSlug[] {
    return Object.keys(CONDITIONS) as ConditionSlug[];
}
