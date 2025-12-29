/**
 * Bestmed Medical Scheme - TypeScript Type Definitions
 * 
 * This file models the Bestmed Medical Scheme structure.
 * Supports Beat, Pace, and Rhythm series plans.
 * 
 * @version 2026
 */

// ============================================================================
// BASE TYPES & ENUMS
// ============================================================================

/**
 * Bestmed Plan Series (Plan Families)
 */
export enum BestmedSeries {
    BEAT = "Beat",
    PACE = "Pace",
    RHYTHM = "Rhythm",
}

/**
 * Plan tiers within each series (1-4)
 */
export type BestmedTier = 1 | 2 | 3 | 4;

/**
 * Network options for Bestmed plans
 */
export enum BestmedNetworkOption {
    NETWORK = "Network",           // Lower contributions, restricted hospitals
    FULL_CHOICE = "Full Choice",   // Higher contributions, any hospital
}

/**
 * Procedure categories
 */
export type BestmedProcedureCategory =
    | 'scope'           // Gastroscopy, colonoscopy, etc.
    | 'orthopedic'      // Arthroscopic, joint procedures
    | 'spinal'          // Back and neck surgery
    | 'nasal'           // Nasal/sinus procedures
    | 'laparoscopic'    // Laparoscopic surgery
    | 'imaging'         // MRI, CT scans
    | 'joint_replacement'
    | 'dental'
    | 'ophthalmology'
    | 'maternity'
    | 'general';

// ============================================================================
// PROCEDURE DEFINITIONS
// ============================================================================

export interface BestmedProcedure {
    id: string;
    label: string;
    medical_term: string;
    category: BestmedProcedureCategory;
    cpt_code?: string;
    description: string;
    risk_notes: string;
    base_cost_estimate: number;
}

// ============================================================================
// CO-PAYMENT STRUCTURES
// ============================================================================

export interface BestmedCopayments {
    /** Non-network hospital penalty */
    nonNetworkHospital: number;

    /** Day procedure at acute hospital (instead of day hospital) */
    dayProcedureAtAcuteHospital: number;

    /** MRI/CT scan co-payment (non-PMB) */
    mriCtScan: number;

    /** Procedure-specific co-payments */
    procedures: {
        gastroscopy: number;
        colonoscopy: number;
        sigmoidoscopy: number;
        cystoscopy: number;
        hysteroscopy: number;
        arthroscopic: number;
        backNeckSurgery: number;
        laparoscopic: number;
        nasalSinus: number;
    };
}

export interface BestmedProsthesisLimits {
    hipMajorJoints: number;
    kneeShoulder: number;
    otherMinorJoints: number;
    overallAnnualLimit: number;
}

export interface BestmedBenefitLimits {
    /** MRI/CT combined annual limit */
    specialisedImagingAnnual: number;

    /** Biological medicine annual limit */
    biologicalMedicineAnnual: number;

    /** Advanced illness benefit annual limit */
    advancedIllnessBenefit: number;

    /** Prosthesis limits */
    prosthesis: BestmedProsthesisLimits;
}

// ============================================================================
// MAIN PLAN INTERFACE
// ============================================================================

export interface BestmedPlan {
    /** Unique plan identifier */
    planId: string;

    /** Human-readable plan name */
    planName: string;

    /** Plan series (Beat, Pace, Rhythm) */
    series: BestmedSeries;

    /** Tier within series (1-4) */
    tier: BestmedTier;

    /** Network option */
    networkOption: BestmedNetworkOption;

    /** Plan type description */
    planType: 'Hospital Plan' | 'Savings Plan' | 'Comprehensive Plan';

    /** Year of benefits */
    benefitYear: number;

    /** Monthly contributions */
    contributions: {
        principalMember: number;
        adultDependant: number;
        childDependant: number;
    };

    /** Co-payment structure */
    copayments: BestmedCopayments;

    /** Benefit limits */
    limits: BestmedBenefitLimits;

    /** PMB exemption rules */
    pmbExemption: {
        /** Procedures covered at 100% when PMB */
        noCopaymentForPMB: boolean;
        /** DSP requirement for PMB */
        requiresDSP: boolean;
    };

    /** Pre-authorisation requirements */
    preAuthorisation: {
        requiredDaysBefore: number;
        emergencyNotification: string;
    };
}

// ============================================================================
// RISK AUDIT TYPES (for resolver output)
// ============================================================================

export interface BestmedRiskAudit {
    procedure: BestmedProcedure;
    plan: BestmedPlanRule;
    liability: number;
    breakdown: {
        base_rate: number;
        scheme_pays: number;
        shortfall: number;
        deductibles: {
            procedure_copayment: number;
            day_hospital_copayment: number;
            non_network_penalty: number;
            total_deductible: number;
        };
        variants?: {
            day_hospital_dsp: number;
            day_hospital_acute: number;
            hospital_network: number;
            hospital_non_network: number;
        };
    };
    meta: {
        is_pmb_applicable: boolean;
        requires_pre_auth: boolean;
        warning_label: string | null;
    };
}

/**
 * Simplified plan rule for UI display
 */
export interface BestmedPlanRule {
    plan_id: string;
    plan_name: string;
    series: string;
    tier: number;
    network_option: string;
    copayments: BestmedCopayments;
    limits: BestmedBenefitLimits;
}

// ============================================================================
// PROCEDURE CONTEXT (for risk engine input)
// ============================================================================

export interface BestmedProcedureContext {
    procedureName: string;
    procedureCode?: string;
    facilityType: 'Day Hospital' | 'Acute Hospital' | 'DSP Day Hospital';
    facilityInNetwork: boolean;
    isPrescribedMinimumBenefit: boolean;
    isEmergency: boolean;
}
