/**
 * Bonitas Medical Scheme - TypeScript Type Definitions
 * 
 * This file models the Bonitas Medical Scheme structure.
 * Supports BonCap, BonStart, Standard, Primary, etc.
 * 
 * @version 2026
 */

// ============================================================================
// BASE TYPES & ENUMS
// ============================================================================

/**
 * Bonitas Plan Series (Plan Families)
 */
export enum BonitasSeries {
    CAPITATION = "Capitation",   // BonCap
    EDGE = "Edge",               // BonStart, BonEssential
    TRADITIONAL = "Traditional", // Standard, Primary
    SAVINGS = "Savings",         // BonFit, BonSave
    COMPLETE = "Complete",       // BonComplete, BonClassic, BonComprehensive
    HOSPITAL = "Hospital",       // Hospital Standard
}

/**
 * Network options for Bonitas plans
 */
export enum BonitasNetworkOption {
    NETWORK = "Network",         // Must use specific network
    OPEN = "Open",               // Any provider (higher tier plans)
}

/**
 * Procedure categories
 */
export type BonitasProcedureCategory =
    | 'scope'
    | 'orthopedic'
    | 'spinal'
    | 'nasal'
    | 'laparoscopic'
    | 'imaging'
    | 'joint_replacement'
    | 'dental'
    | 'ophthalmology'
    | 'maternity'
    | 'oncology'
    | 'general';

// ============================================================================
// PROCEDURE DEFINITIONS
// ============================================================================

export interface BonitasProcedure {
    id: string;
    label: string;
    medical_term: string;
    category: BonitasProcedureCategory;
    cpt_code?: string;
    description: string;
    risk_notes: string;
    base_cost_estimate: number;
}

// ============================================================================
// CO-PAYMENT STRUCTURES
// ============================================================================

export interface BonitasCopayments {
    /** Non-network hospital penalty (percentage) */
    nonNetworkHospitalPercent: number;

    /** MRI/CT scan co-payment (non-PMB) */
    mriCtScan: number;

    /** Cataract surgery at non-DSP */
    cataractNonDsp: number;

    /** Procedure-specific co-payments (0 means covered, -1 means PMB only) */
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

export interface BonitasBenefitLimits {
    /** MRI/CT combined annual limit per family */
    specialisedImagingAnnual: number;

    /** Blood tests and lab annual limit */
    bloodTestsAnnual: number;

    /** Blood transfusions annual limit */
    bloodTransfusionsAnnual: number;

    /** Neonatal care annual limit */
    neonatalCareAnnual: number;

    /** Physical rehabilitation annual limit */
    physicalRehabAnnual: number;

    /** General medical appliances annual limit */
    medicalAppliancesAnnual: number;
}

// ============================================================================
// MAIN PLAN INTERFACE
// ============================================================================

export interface BonitasPlan {
    /** Unique plan identifier */
    planId: string;

    /** Human-readable plan name */
    planName: string;

    /** Plan series */
    series: BonitasSeries;

    /** Network option */
    networkOption: BonitasNetworkOption;

    /** Plan type description */
    planType: 'Hospital Plan' | 'Savings Plan' | 'Comprehensive Plan' | 'Capitation Plan' | 'Traditional Plan';

    /** Year of benefits */
    benefitYear: number;

    /** Monthly contributions (lowest income bracket as base) */
    contributions: {
        principalMember: number;
        adultDependant: number;
        childDependant: number;
    };

    /** Co-payment structure */
    copayments: BonitasCopayments;

    /** Benefit limits */
    limits: BonitasBenefitLimits;

    /** PMB exemption rules */
    pmbExemption: {
        noCopaymentForPMB: boolean;
        requiresDSP: boolean;
    };

    /** Pre-authorisation requirements */
    preAuthorisation: {
        requiredHoursBefore: number;
        emergencyNotification: string;
    };
}

// ============================================================================
// RISK AUDIT TYPES (for resolver output)
// ============================================================================

export interface BonitasRiskAudit {
    procedure: BonitasProcedure;
    plan: BonitasPlanRule;
    liability: number;
    breakdown: {
        base_rate: number;
        scheme_pays: number;
        shortfall: number;
        deductibles: {
            procedure_copayment: number;
            non_network_penalty: number;
            total_deductible: number;
        };
        variants?: {
            network_hospital: number;
            non_network_hospital: number;
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
export interface BonitasPlanRule {
    plan_id: string;
    plan_name: string;
    series: string;
    network_option: string;
    copayments: BonitasCopayments;
    limits: BonitasBenefitLimits;
}

// ============================================================================
// PROCEDURE CONTEXT (for risk engine input)
// ============================================================================

export interface BonitasProcedureContext {
    procedureName: string;
    procedureCode?: string;
    facilityType: 'Day Hospital' | 'Acute Hospital' | 'DSP';
    facilityInNetwork: boolean;
    isPrescribedMinimumBenefit: boolean;
    isEmergency: boolean;
}
