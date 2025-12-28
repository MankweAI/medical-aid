/**
 * Discovery Health Medical Scheme - TypeScript Type Definitions
 * * This file models the Discovery Health Medical Scheme structure using exact brochure terminology.
 * It supports the Smart Series (Classic, Essential, Essential Dynamic, Active Smart) and other plan series.
 * * @version 2026
 * @author Co-Payment Calculator System
 */

// ============================================================================
// BASE TYPES & ENUMS
// ============================================================================

/**
 * Discovery Health Rate - The scheme's reference tariff for calculating benefits
 */
export type DHR = number;

/**
 * All Discovery Medical Scheme Series (Plan Families)
 */
export enum DiscoverySeries {
    EXECUTIVE = "Executive",
    COMPREHENSIVE = "Comprehensive",
    PRIORITY = "Priority",
    SAVER = "Saver",
    CORE = "Core",
    SMART = "Smart",
    KEYCARE = "KeyCare",
}

/**
 * Plan Variants within a Series
 * Discovery uses specific terminology for network tiers
 */
export enum DiscoveryPlanVariant {
    CLASSIC = "Classic",
    ESSENTIAL = "Essential",
    ESSENTIAL_DYNAMIC = "Essential Dynamic",
    ACTIVE = "Active",
    DELTA = "Delta",
    COASTAL = "Coastal",
    PLUS = "Plus",
    START = "Start",
    START_REGIONAL = "Start Regional",
    EXECUTIVE = "Executive",
}

/**
 * Network Types for Hospital Admissions
 */
export enum DiscoveryNetworkType {
    // Smart Series
    SMART_HOSPITAL_NETWORK = "Smart Hospital Network",
    SMART_DAY_SURGERY_NETWORK = "Smart Day Surgery Network",
    DYNAMIC_SMART_HOSPITAL_NETWORK = "Dynamic Smart Hospital Network",

    // Core Series
    CORE_HOSPITAL_NETWORK = "Core Hospital Network",
    CORE_DAY_SURGERY_NETWORK = "Core Day Surgery Network",
    ESSENTIAL_CORE_HOSPITAL_NETWORK = "Essential Core Hospital Network",

    // General Networks
    DAY_SURGERY_NETWORK = "Day Surgery Network",
    DELTA_DAY_SURGERY_NETWORK = "Delta Day Surgery Network",
    DELTA_HOSPITAL_NETWORK = "Delta Hospital Network",
    COASTAL_DAY_SURGERY_NETWORK = "Coastal Day Surgery Network",
    COASTAL_HOSPITAL_NETWORK = "Coastal Hospital Network",

    // KeyCare Series
    KEYCARE_DAY_SURGERY_NETWORK = "KeyCare Day Surgery Network",
    KEYCARE_START_DAY_SURGERY_NETWORK = "KeyCare Start Day Surgery Network",
    KEYCARE_START_REGIONAL_DAY_SURGERY_NETWORK = "KeyCare Start Regional Day Surgery Network",

    // Priority Series
    PRIORITY_HOSPITAL_NETWORK = "Priority Hospital Network",

    ANY_APPROVED_FACILITY = "Any Approved Facility",
}

/**
 * Healthcare Professional Payment Arrangement Status
 */
export enum PaymentArrangementStatus {
    VALUE_BASED_NETWORK = "Value-based Network (Payment Arrangement)",
    NON_NETWORK = "Non-Network (No Payment Arrangement)",
}

/**
 * Benefit Account Types
 */
export enum BenefitAccountType {
    HOSPITAL_BENEFIT = "Hospital Benefit",
    MEDICAL_SAVINGS_ACCOUNT = "Medical Savings Account (MSA)",
    PERSONAL_HEALTH_FUND = "Personal Health Fund (PHF)",
    DAY_TO_DAY_EXTENDER_BENEFIT = "Day-to-day Extender Benefit (DEB)",
    ABOVE_THRESHOLD_BENEFIT = "Above Threshold Benefit (ATB)",
    CHRONIC_ILLNESS_BENEFIT = "Chronic Illness Benefit (CIB)",
    ACUTE_MEDICINE_BENEFIT = "Acute Medicine Benefit",
    SCREENING_AND_PREVENTION = "Screening and Prevention",
}

/**
 * Prescribed Minimum Benefits (PMB) Status
 */
export enum PMBStatus {
    COVERED = "Covered as PMB",
    NOT_COVERED = "Not PMB",
    SUBJECT_TO_CLINICAL_PROTOCOLS = "PMB Subject to Protocols",
}

/**
 * Age Groups for Co-payment Calculation
 */
export enum MemberAgeGroup {
    UNDER_13 = "Under 13 years",
    THIRTEEN_AND_OLDER = "13 years and older",
}

// ============================================================================
// SMART SERIES SPECIFIC TYPES
// ============================================================================

/**
 * Smart Series Plans - The four variants within Smart
 */
export type SmartSeriesPlan =
    | "Classic Smart"
    | "Essential Smart"
    | "Essential Dynamic Smart"
    | "Active Smart"
    | "Classic Smart Comprehensive"
    | "Smart Saver";

/**
 * Day Surgery Network Upfront Payments (Out-of-Network Penalty)
 */
export interface DaySurgeryNetworkUpfrontPayment {
    networkType: DiscoveryNetworkType;
    inNetworkPayment: number; // R0 if in-network
    outOfNetworkUpfrontPayment: number; // Penalty for using non-network facility
    emergencyExemption: boolean; // Emergency admissions exempt from upfront payment
}

/**
 * Specialist and Healthcare Professional Coverage Rules
 */
export interface HealthcareProfessionalCoverage {
    specialistWithPaymentArrangement: {
        coverageLevel: "Full Cover" | "Percentage of DHR";
        percentage?: number;
    };
    specialistWithoutPaymentArrangement: {
        coverageLevel: "Percentage of DHR";
        percentage: number; // 200% for Classic, 100% for Essential/Essential Dynamic/Active
    };
    otherHealthcareProfessionals: {
        coverageLevel: "Percentage of DHR";
        percentage: number; // 200% for Classic, 100% for Essential/Essential Dynamic/Active
    };
}

/**
 * Gastroscopy and Colonoscopy Scope Rules
 * Discovery has very specific logic for scopes (gastroscopy, colonoscopy, sigmoidoscopy, proctoscopy)
 */
export interface ScopesProcedureRule {
    procedureName: "Gastroscopy" | "Colonoscopy" | "Sigmoidoscopy" | "Proctoscopy" | "Bi-directional Scopes";
    facilityType: "Day Clinic Account" | "Hospital Account";

    // Day Clinic (Preferred Route)
    daySurgeryNetworkDayClinicCopayment: number; // e.g., R4,650 for Classic/Essential

    // Hospital (Penalized Route)
    hospitalAccountCopayment: number; // e.g., R8,000 for Classic, R9,950 if both gastro+colonoscopy

    // Out-of-Network Penalties
    outOfNetworkUpfrontPayment: number; // R12,650 for Smart Day Surgery Network

    // Co-payment Reductions (Value-based Network Doctors)
    valueBasedNetworkReduction: {
        applicableToClassicEssential: boolean;
        reducedDayClinicCopayment?: number; // R6,650 reduced to R4,650
        reducedHospitalCopayment?: number; // R8,250 reduced to R6,650
    };

    // In-rooms Scopes (Network Provider)
    inRoomsScopesCopayment: {
        singleScope: number; // R1,800
        biDirectionalScopes: number; // R3,100
    };

    // Non-Network In-rooms
    nonNetworkInRoomsCopayment: {
        singleScope: number; // R1,800
        biDirectionalScopes: number; // R3,100
    };

    // Special Rules
    prescribedMinimumBenefitExemption: {
        condition: string; // "Dyspepsia in patient 12 or under, or in-rooms at network provider"
        noCopaymentRequired: boolean;
    };
}

/**
 * Dental Treatment Rules (In-Hospital)
 */
export interface DentalTreatmentInHospitalRule {
    benefitType: "Basic Dental Treatment" | "Severe Dental and Oral Surgery" | "Basic Dental Trauma";

    // Dental Treatment in Hospital
    dentalTreatmentInHospital: {
        coveredOnPlans: SmartSeriesPlan[];
        requiresApproval: boolean;
        upfrontPayment?: {
            ageGroup: MemberAgeGroup;
            hospitalAccount: number; // R8,950 or R3,470
            dayClinicAccount: number; // R5,750 or R1,550
        };
    };

    // Severe Dental and Oral Surgery in Hospital
    severeDentalAndOralSurgery?: {
        definedProceduresList: string[]; // Discovery defines specific procedures
        noOverallLimit: boolean;
        subjectToAuthorisation: boolean;
        hospitalBenefitCoverage: "Full" | "Percentage of DHR";
        percentage?: number; // e.g., 100% DHR on Classic
        anaesthetistCoverage?: number; // e.g., 200% DHR
    };

    // Basic Dental Trauma Benefit
    basicDentalTrauma?: {
        yearlyLimit: number; // R70,800 per person
        coversAppliances: boolean;
        coversOrthodontics: boolean;
        excludedPlans: SmartSeriesPlan[];
    };
}

/**
 * Prosthetic Devices (Spinal Surgery, Shoulder Joint)
 */
export interface ProstheticDeviceRule {
    deviceType: "Spinal Surgery Prosthesis" | "Shoulder Joint Prosthesis";

    spinalSurgery?: {
        preferredSupplier: {
            noOverallLimit: boolean;
            limitPerProcedurePerYear: number; // 1 procedure per person per year
        };
        nonPreferredSupplier: {
            firstLevel: number; // R18,900
            secondLevel: number; // R37,800 for two or more levels
        };
        networkCoverage: {
            insideNetwork: "80% of DHR" | "Full Cover";
            outsideNetwork: "80% of DHR";
        };
    };

    shoulderJoint?: {
        networkProvider: {
            noLimit: boolean;
            coverage: "100% of DHR" | number; // Up to R46,000
        };
        nonNetworkProvider: {
            coverage: "100% of DHR" | number; // Up to R46,000
        };
    };
}

/**
 * Mental Health Benefits
 */
export interface MentalHealthBenefitRule {
    benefitType: "Major Affective Disorders" | "Acute Stress Disorder" | "Attempted Suicide" | "Other Mental Health";

    inHospitalAdmissions: {
        daysPerYear?: number; // 21 days for major affective disorders
        outOfHospitalConsultations?: number; // Up to 15 for major affective disorders
    };

    acuteStressDisorder?: {
        outOfHospitalConsultations: number; // Up to 12
        requiresRecentTrauma: boolean;
    };

    attemptedSuicide?: {
        daysPerApprovedAdmission: number; // 3 days
    };

    otherMentalHealth?: {
        daysForAllOther: number; // 21 days
    };

    networkFacilityCoverage: "Full Cover" | "80% of DHR";
    nonNetworkCoverage: "80% of DHR";

    mentalHealthCareProgramme?: {
        applicablePlan: "Active Smart";
        fullCoverForOutOfHospitalPsychotherapy: boolean;
        requiresEnrollment: boolean;
    };
}

/**
 * Alcohol and Drug Rehabilitation
 */
export interface AlcoholDrugRehabilitationRule {
    rehabilitationDays: number; // 21 days per person each year
    detoxificationDays: number; // 3 days per approved admission, per person
}

/**
 * Bone-Anchored Hearing Aids
 */
export interface BoneAnchoredHearingAidRule {
    limitPerPerson: number; // R150,000
    processorUpgradeLimit: {
        amount: number; // R78,000 per person every three years
    };
    excludedPlans: SmartSeriesPlan[];
}

/**
 * Cochlear Implants, Auditory Brain Implants, and Processors
 */
export interface CochlearImplantRule {
    limitPerPersonPerBenefit: number; // R252,000
    processorUpgradeLimit: {
        amount: number; // R190,000 per person every three years
    };
    excludedPlans: SmartSeriesPlan[];
}

/**
 * Internal Nerve Stimulators
 */
export interface InternalNerveStimulatorRule {
    limitPerPerson: number; // R192,000
    excludedPlans: SmartSeriesPlan[];
}

/**
 * Major Joint Surgery
 */
export interface MajorJointSurgeryRule {
    procedureType: "Hip Replacement" | "Knee Replacement" | "Other Major Joint";

    networkProvider: {
        noLimit: boolean;
        fullCover: boolean;
        dhrPercentage: number; // Up to 80% of DHR
    };

    nonNetworkProvider: {
        maximumPerProsthesis: number; // R31,800 per prosthesis per admission
    };

    jointReplacementExclusions: {
        hips: boolean;
        knees: boolean;
        shoulders: boolean;
        elbows: boolean;
    };

    traumaAndOncologySurgeries?: {
        notApplicable: boolean;
    };
}

// ============================================================================
// DAY SURGERY NETWORK PROCEDURES
// ============================================================================

/**
 * Day Surgery Network Procedure Categories
 * Based on the exact list from Discovery's 2026 Day Surgery Network brochure
 */
export enum DaySurgeryProcedureCategory {
    BIOPSIES = "Biopsies",
    BREAST_PROCEDURES = "Breast procedures",
    EAR_NOSE_THROAT = "Ear, nose and throat procedures",
    EYE_PROCEDURES = "Eye procedures",
    GANGLIONECTOMY = "Ganglionectomy",
    GASTROINTESTINAL = "Gastrointestinal",
    GYNAECOLOGICAL = "Gynaecological procedures",
    NERVE_PROCEDURES = "Nerve procedures",
    ORTHOPAEDIC = "Orthopaedic procedures",
    REMOVAL_FOREIGN_BODY = "Removal of foreign body",
    SKIN_PROCEDURES = "Skin procedures",
    SIMPLE_HERNIA = "Simple hernia procedures",
    UROLOGICAL = "Urological procedures",
    SIMPLE_SUPERFICIAL_LYMPHADENECTOMY = "Simple superficial lymphadenectomy",
}

/**
 * Day Surgery Network Procedure Definition
 */
export interface DaySurgeryNetworkProcedure {
    procedureName: string;
    category: DaySurgeryProcedureCategory;

    // Exclusions for certain Smart plans
    excludedOnEssentialSmartSaver: boolean;
    excludedOnEssentialSmart: boolean;
    excludedOnEssentialDynamicSmart: boolean;
    excludedOnActiveSmart: boolean;
    excludedOnKeyCare: boolean;

    // Network requirements
    mustBePerformedInNetwork: boolean;
    applicableNetworks: DiscoveryNetworkType[];
}

// ============================================================================
// CANCER COVER
// ============================================================================

/**
 * Cancer Cover (Oncology Treatment)
 */
export interface CancerCoverRule {
    annualLimit: number; // R250,000 for Classic/Essential/Essential Dynamic
    copaymentAboveLimit: number; // 20% co-payment on costs above limit
    prescribedMinimumBenefitConditions: {
        coveredInFull: boolean;
    };
    essentialSmartNetworkRestriction: {
        mustUseNetwork: boolean;
        limitedToPMB: boolean;
    };
}

// ============================================================================
// DAY-TO-DAY BENEFITS
// ============================================================================

/**
 * General Practitioner (GP) Consultation
 */
export interface GPConsultationRule {
    unlimitedConsultations: boolean;
    fixedCopaymentPerConsultation: {
        Classic: number; // R70
        Essential: number; // R125
        EssentialDynamic: number; // R125
        Active: number; // R125
    };
    networkRequirement: "Smart Network GP" | "Any GP";
}

/**
 * Eye Test at Optometrist
 */
export interface EyeTestRule {
    annualLimit: number; // 1 eye test per year
    fixedCopayment: {
        Classic: number; // R70
        Essential: number; // R125
        EssentialDynamic: number; // R125
        Active: number; // R125
    };
}

/**
 * Dental Check-up
 */
export interface DentalCheckupRule {
    annualLimit: number; // 1 dental check-up per year
    fixedCopayment: {
        Classic: number; // R125
        Essential: number; // R190
        EssentialDynamic: number; // R190
        Active: number; // R190
    };
}

/**
 * Acute Medicine Cover
 */
export interface AcuteMedicineRule {
    coverageType: "Over-the-Counter (OTC) Medicine";
    annualLimit?: number;
    networkPharmacyRequirement: boolean;
}

/**
 * Sports-Related Injuries
 */
export interface SportsRelatedInjuryRule {
    coverage: {
        basicXrays: boolean;
        specialistVisits: number; // 2 specialist visits
        physiotherapistBiokineticistChiropractor: {
            totalVisits: number; // 4 visits total
            referralRequired: boolean; // Must be referred by Smart Network GP
            copaymentPerVisit: number; // R125
        };
    };
}

// ============================================================================
// CHRONIC ILLNESS BENEFIT (CIB)
// ============================================================================

/**
 * Chronic Illness Benefit
 */
export interface ChronicIllnessBenefitRule {
    chronicDiseaseListConditions: number; // 27 CDL conditions
    prescribedMinimumBenefitCompliant: boolean;
    medicineFormulary: {
        fullCoverAtNetworkPharmacy: boolean;
        designatedServiceProviderRequired: boolean;
    };
}

// ============================================================================
// ROOT SCHEME TYPE
// ============================================================================

/**
 * Discovery Health Medical Scheme (Root Entity)
 */
export interface DiscoveryScheme {
    schemeId: string;
    schemeName: "Discovery Health Medical Scheme";
    registrationNumber: "1125";
    regulatedBy: "Council for Medical Schemes";
    administeredBy: {
        name: "Discovery Health (Pty) Ltd";
        registrationNumber: "1997/013480/07";
    };
    effectiveYear: number; // 2026
    plans: DiscoveryPlan[];
}

/**
 * Discovery Plan (Specific Product within the Scheme)
 */
export interface DiscoveryPlan {
    planId: string;
    planName: string; // e.g., "Classic Smart", "Essential Dynamic Smart"
    series: DiscoverySeries;
    variant: DiscoveryPlanVariant;

    // Contribution (Monthly Premium)
    monthlyContribution: {
        mainMember: number;
        adult: number;
        child: number;
    };

    // Network Assignments
    hospitalNetwork: DiscoveryNetworkType;
    daySurgeryNetwork: DiscoveryNetworkType;

    // HIGH-INTENT Benefit Rules (monetizable via Gap Cover)
    hospitalBenefit: HospitalBenefitRule;
    daySurgeryBenefit: DaySurgeryBenefitRule;
    scopesBenefit: ScopesProcedureRule[];
    dentalBenefit: DentalTreatmentInHospitalRule[];
    cancerCover: CancerCoverRule;

    // LOW-INTENT Benefit Rules (optional - informational only)
    prostheticDevices?: ProstheticDeviceRule[];
    mentalHealthBenefit?: MentalHealthBenefitRule[];
    chronicIllnessBenefit?: ChronicIllnessBenefitRule;
    dayToDayBenefits?: DayToDayBenefits;

    // Accounts & Limits
    medicalSavingsAccount?: MedicalSavingsAccountRule;
    personalHealthFund?: PersonalHealthFundRule;
    aboveThresholdBenefit?: AboveThresholdBenefitRule;
    annualThreshold?: number;
}

/**
 * Hospital Benefit Rule
 */
export interface HospitalBenefitRule {
    unlimitedPrivateHospitalCover: boolean;
    networkRestriction: DiscoveryNetworkType;

    // Healthcare Professional Coverage
    healthcareProfessionalCoverage: HealthcareProfessionalCoverage;

    // Out-of-Network Penalties
    outOfNetworkUpfrontPayment?: number;
    emergencyExemption: boolean;
}

/**
 * Day Surgery Benefit Rule
 */
export interface DaySurgeryBenefitRule {
    daySurgeryNetwork: DiscoveryNetworkType;
    coveredProcedures: DaySurgeryNetworkProcedure[];

    upfrontPayments: DaySurgeryNetworkUpfrontPayment;

    // Plan-specific exclusions
    proceduresNotCoveredOnEssentialPlans: string[];
}

/**
 * Day-to-Day Benefits
 */
export interface DayToDayBenefits {
    gpConsultations: GPConsultationRule;
    eyeTest: EyeTestRule;
    dentalCheckup: DentalCheckupRule;
    acuteMedicine: AcuteMedicineRule;
    sportsRelatedInjuries: SportsRelatedInjuryRule;
}

/**
 * Medical Savings Account (MSA)
 */
export interface MedicalSavingsAccountRule {
    annualAllocation: number; // Calculated based on contributions
    rolloverToNextYear: boolean;
    usageRules: {
        allowedExpenses: string[];
        restrictions: string[];
    };
}

/**
 * Personal Health Fund (PHF)
 */
export interface PersonalHealthFundRule {
    earnedThroughHealthActions: boolean;
    personalHealthPathways: boolean;
    usageForDayToDayCover: boolean;
}

/**
 * Above Threshold Benefit (ATB)
 */
export interface AboveThresholdBenefitRule {
    applicablePlans: SmartSeriesPlan[];
    unlimitedOnExecutive: boolean;
    limitedAmount?: number; // Limited for Comprehensive, Priority, etc.
    thresholdCalculation: {
        maxChildrenCounted: number; // 3 children max
        fosterCareException: boolean;
    };
}

// ============================================================================
// BENEFIT CALCULATION ENGINE TYPES
// ============================================================================

/**
 * Procedure Context (Input for Risk Engine)
 */
export interface ProcedureContext {
    procedureName: string;
    procedureCode?: string; // ICD-10 or NAPPI code
    memberAge: number;
    facilityType: "Day Clinic" | "Hospital" | "In-rooms";
    facilityInNetwork: boolean;
    networkType: DiscoveryNetworkType;
    healthcareProfessionalHasPaymentArrangement: boolean;
    isPrescribedMinimumBenefit: boolean;
    isEmergency: boolean;
}

/**
 * Co-payment Liability Calculation Result
 */
export interface CopaymentLiabilityResult {
    totalEstimatedCost: number; // Total procedure cost
    schemePays: number; // Amount paid by Discovery
    memberLiability: number; // Amount member must pay (co-payment + upfront)

    breakdown: {
        hospitalAccountCopayment?: number;
        dayClinicAccountCopayment?: number;
        upfrontPayment?: number;
        percentageBasedCopayment?: {
            percentage: number;
            appliedToAmount: number;
        };
    };

    appliedRules: string[]; // Human-readable list of rules applied
    warnings: string[]; // e.g., "Out-of-network penalty applied"
}

/**
 * Benefit Rule (Generic Rule Structure for Strategy Pattern)
 */
export interface DiscoveryBenefitRule {
    ruleId: string;
    ruleName: string;
    applicableSeries: DiscoverySeries[];
    applicableVariants: DiscoveryPlanVariant[];

    // Condition Matching
    matchesProcedure: (context: ProcedureContext) => boolean;

    // Liability Calculation
    calculateLiability: (
        context: ProcedureContext,
        plan: DiscoveryPlan
    ) => CopaymentLiabilityResult;
}

// ============================================================================
// LEGACY / SHARED RISK TYPES (Migrated from types/risk.ts)
// ============================================================================

export type ProcedureCategory = 'major_joint' | 'scope' | 'spinal' | 'ophthalmology' | 'maternity' | 'dental' | 'ent' | 'general';
export type NetworkType = 'smart' | 'delta' | 'coastal' | 'any';
export type PlanSeries = 'core' | 'smart' | 'saver' | 'priority' | 'comprehensive' | 'coastal';

export interface Procedure {
    id: string;
    label: string;
    medical_term: string;
    category: ProcedureCategory;
    base_cost_estimate: number;
    risk_notes: string;
    scope_complexity?: 'single' | 'combo';
    cpt_code: string;
    common_diagnoses: {
        code: string;
        label: string;
    }[];
    description: string;
}

export interface ScopeBenefitStructure {
    day_clinic: number;
    hospital_network: number;
    hospital_non_network: number;
}

export interface PlanDeductibleRule {
    plan_id: string;
    plan_name: string;
    plan_series: PlanSeries;
    network_type: NetworkType;
    available_procedure_ids: string[];

    deductibles: {
        default: number;
        penalty_non_network: number;
        scopes_location_benefits: ScopeBenefitStructure;
        hip_replacement_penalty?: number;
        knee_replacement_penalty?: number;
        spinal_surgery_penalty?: number;
        cataract_penalty?: number;
        caesarean_section_penalty?: number;
        tonsillectomy_penalty?: number;
        dental_penalty?: number;
    };
}

/**
 * Scope-Specific Insights (Gastroscopy, Colonoscopy)
 * These are procedure-specific critical fields that must be surfaced in the UI.
 */
export interface ScopeInsights {
    /** Hospital co-payment when using a Value-Based Network doctor */
    reducedHospitalCopayment?: number;
    /** Day clinic co-payment when using a Value-Based Network doctor */
    reducedDayClinicCopayment?: number;
    /** Co-payment if scope is performed in-rooms at a network provider (single scope) */
    inRoomsSingleScopeCopayment?: number;
    /** Co-payment if bi-directional scopes performed in-rooms (Gastro + Colonoscopy) */
    inRoomsBiDirectionalCopayment?: number;
    /** Out-of-network upfront payment penalty */
    outOfNetworkPenalty?: number;
    /** PMB exemption condition (e.g., "Patient 12 or under with dyspepsia") */
    pmbExemptionCondition?: string;
    /** Whether no co-payment is required under PMB exemption */
    pmbExemptionNoCopayment?: boolean;
}

/**
 * Dental-Specific Insights (Dental Surgery In-Hospital)
 * Procedure-specific critical fields for dental surgery pages.
 */
export interface DentalInsights {
    /** Hospital account co-payment (13+ years) */
    hospitalCopayment?: number;
    /** Day clinic account co-payment (13+ years) */
    dayClinicCopayment?: number;
    /** Age group this co-payment applies to */
    ageGroup?: string;
    /** Whether pre-authorisation is required */
    requiresApproval?: boolean;
    /** Coverage level for anaesthetist (e.g., 200% of DHR) */
    anaesthetistCoverage?: number;
    /** Whether the plan covers severe dental surgery */
    coveredOnPlan?: boolean;
}

/**
 * Ophthalmology-Specific Insights (Cataract, Vitrectomy)
 * Procedure-specific fields for eye surgery pages.
 */
export interface OphthalmologyInsights {
    /** Day Surgery Network required */
    daySurgeryNetworkRequired?: boolean;
    /** Out-of-network upfront payment */
    outOfNetworkPenalty?: number;
    /** Lens/IOL cost limits */
    lensCostLimit?: number;
    /** Whether procedure is on Day Surgery Network list */
    onDaySurgeryNetworkList?: boolean;
    /** Excluded on specific plans */
    excludedOnPlans?: string[];
}

/**
 * ENT-Specific Insights (Tonsillectomy, Grommets)
 * Procedure-specific fields for ENT surgery pages.
 */
export interface ENTInsights {
    /** Day Surgery Network required */
    daySurgeryNetworkRequired?: boolean;
    /** Out-of-network upfront payment */
    outOfNetworkPenalty?: number;
    /** Age restrictions (e.g., children only) */
    ageRestriction?: string;
    /** Whether overnight stay may be required */
    overnightStayPossible?: boolean;
    /** Excluded on specific plans */
    excludedOnPlans?: string[];
}

/**
 * Major Joint Surgery Insights (Hip, Knee Replacement)
 * Procedure-specific fields for joint replacement pages.
 */
export interface MajorJointInsights {
    /** Network provider required for full cover */
    networkProviderRequired?: boolean;
    /** Prosthesis limit per admission */
    prosthesisLimit?: number;
    /** Out-of-network prosthesis limit */
    nonNetworkProsthesisLimit?: number;
    /** Excluded joint types on this plan */
    excludedJointsOnPlan?: string[];
    /** Whether trauma/oncology cases are exempt */
    traumaOncologyExempt?: boolean;
}

export interface RiskAudit {
    procedure: Procedure;
    plan: PlanDeductibleRule;
    liability: number;
    breakdown: {
        base_rate: number;
        scheme_pays: number;
        shortfall: number;
        deductibles: { total_deductible: number; };
        scope_variants?: {
            day_clinic: number;
            day_clinic_combo?: number;
            hospital_network: number;
            hospital_network_combo?: number;
            hospital_non_network: number;
            hospital_non_network_combo?: number;
        };
    };

    /** Scope-specific insights for Gastroscopy/Colonoscopy procedures */
    scope_insights?: ScopeInsights;

    /** Dental-specific insights for dental surgery procedures */
    dental_insights?: DentalInsights;

    /** Ophthalmology-specific insights for eye surgery procedures */
    ophthalmology_insights?: OphthalmologyInsights;

    /** ENT-specific insights for ear/nose/throat procedures */
    ent_insights?: ENTInsights;

    /** Major joint surgery insights for replacements */
    major_joint_insights?: MajorJointInsights;

    meta: {
        is_trap: boolean;
        coverage_percent: number;
        warning_label: string | null;
    };
}


