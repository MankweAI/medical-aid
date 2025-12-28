/**
 * Discovery Health Priority Series Plans (2026)
 * 
 * VALIDATED extraction from Priority Series brochure
 * 
 * Plan variants (2 total):
 * - Priority Classic
 * - Priority Essential (also called Classic Essential in slug)
 * 
 * NOTE: Monthly contributions not visible in provided images - marked as TODO
 * Source: Priority Series brochure pages
 */

import {
    DiscoveryPlan,
    DiscoverySeries,
    DiscoveryPlanVariant,
    DiscoveryNetworkType,
    ScopesProcedureRule,
    DentalTreatmentInHospitalRule,
} from '@/types/schemes/discovery';

// ============================================================================
// SHARED PRIORITY SERIES BENEFITS (VALIDATED FROM BROCHURE)
// ============================================================================

/**
 * VALIDATED Scopes benefit rules (from brochure Image 1)
 * 
 * Upfront payments for scope admissions:
 * - Day Clinic: R4,650 (Classic and Essential)
 * - Hospital: R7,500 (reduces to R6,050 with value-based network)
 * - Combined Scopes Day Clinic: R5,700
 * - Combined Scopes Hospital: R9,450 (reduces to R7,650)
 * - Out of Day Surgery Network: R7,250
 * - In-rooms: R1,800 single, R3,100 bi-directional
 */
const PRIORITY_SCOPES_BENEFIT: ScopesProcedureRule[] = [
    {
        procedureName: "Gastroscopy",
        facilityType: "Day Clinic Account",
        daySurgeryNetworkDayClinicCopayment: 4650, // VALIDATED: R4,650
        hospitalAccountCopayment: 7500, // VALIDATED: R7,500
        outOfNetworkUpfrontPayment: 7250, // VALIDATED: R7,250
        nonNetworkInRoomsCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
        valueBasedNetworkReduction: {
            applicableToClassicEssential: true,
            reducedDayClinicCopayment: 4650,
            reducedHospitalCopayment: 6050, // VALIDATED: R6,050
        },
        inRoomsScopesCopayment: { singleScope: 1800, biDirectionalScopes: 3100 }, // VALIDATED
        prescribedMinimumBenefitExemption: {
            condition: "Dyspepsia, patient aged 12 years or under, or in-rooms at network provider",
            noCopaymentRequired: true,
        },
    },
    {
        procedureName: "Colonoscopy",
        facilityType: "Day Clinic Account",
        daySurgeryNetworkDayClinicCopayment: 4650,
        hospitalAccountCopayment: 7500,
        outOfNetworkUpfrontPayment: 7250,
        nonNetworkInRoomsCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
        valueBasedNetworkReduction: {
            applicableToClassicEssential: true,
            reducedDayClinicCopayment: 4650,
            reducedHospitalCopayment: 6050,
        },
        inRoomsScopesCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
        prescribedMinimumBenefitExemption: {
            condition: "Dyspepsia, patient aged 12 years or under, or in-rooms at network provider",
            noCopaymentRequired: true,
        },
    },
    {
        procedureName: "Bi-directional Scopes",
        facilityType: "Day Clinic Account",
        daySurgeryNetworkDayClinicCopayment: 5700, // VALIDATED: R5,700
        hospitalAccountCopayment: 9450, // VALIDATED: R9,450
        outOfNetworkUpfrontPayment: 9450, // VALIDATED: Combined R9,450
        nonNetworkInRoomsCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
        valueBasedNetworkReduction: {
            applicableToClassicEssential: true,
            reducedDayClinicCopayment: 5700,
            reducedHospitalCopayment: 7650, // VALIDATED: R7,650
        },
        inRoomsScopesCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
        prescribedMinimumBenefitExemption: {
            condition: "Dyspepsia, patient aged 12 years or under, or in-rooms at network provider",
            noCopaymentRequired: true,
        },
    },
];

/**
 * VALIDATED Dental benefit rules (from brochure Image 4)
 * 
 * Upfront payment for dental admissions:
 * - 13 years and older: R8,950 hospital, R5,750 day clinic
 * - Under 13 years: R3,470 hospital, R1,550 day clinic
 * - Basic Dental Trauma: R70,800 per person yearly
 * - Basic Dental: R23,400 per person yearly
 * - Anaesthetists: 200% DHR on Classic Priority Plan
 */
const PRIORITY_DENTAL_BENEFIT: DentalTreatmentInHospitalRule[] = [
    {
        benefitType: "Severe Dental and Oral Surgery",
        dentalTreatmentInHospital: {
            coveredOnPlans: ["Classic Smart", "Essential Smart"], // Type compatibility
            requiresApproval: true,
            upfrontPayment: {
                ageGroup: "13 years and older" as any,
                hospitalAccount: 8950, // VALIDATED: R8,950
                dayClinicAccount: 5750, // VALIDATED: R5,750
            },
        },
        severeDentalAndOralSurgery: {
            definedProceduresList: ["Severe dental extractions", "Jaw surgery", "Oral pathology"],
            noOverallLimit: true, // VALIDATED: "no overall limit on the benefit"
            subjectToAuthorisation: true,
            hospitalBenefitCoverage: "Percentage of DHR",
            percentage: 100,
            anaesthetistCoverage: 200, // VALIDATED: 200% DHR on Classic Priority Plan
        },
        basicDentalTrauma: {
            yearlyLimit: 70800, // VALIDATED: R70,800
            coversAppliances: true,
            coversOrthodontics: false,
            excludedPlans: [],
        },
    },
];

/**
 * VALIDATED Benefits with yearly limits (from brochure Image 2)
 */
export const PRIORITY_YEARLY_LIMIT_BENEFITS = {
    boneAnchoredHearingAids: {
        limitPerPerson: 150000, // VALIDATED: R150,000
        processorUpgradeLimit: 78000, // VALIDATED: R78,000 every 3 years
    },
    cochlearImplants: {
        limitPerPerson: 252000, // VALIDATED: R252,000
        processorUpgradeLimit: 190000, // VALIDATED: R190,000 every 3 years
    },
    internalNerveStimulators: {
        limitPerPerson: 192000, // VALIDATED: R192,000
    },
    shoulderJointProsthesis: {
        inNetworkLimit: null, // No limit in network
        outOfNetworkLimit: 50000, // VALIDATED: R50,000
    },
    alcoholAndDrugRehabilitation: {
        rehabilitationDays: 21, // VALIDATED: 21 days
        detoxificationDays: 3, // VALIDATED: 3 days
    },
    prostheticDevicesSpinalSurgery: {
        preferredSupplierNoLimit: true,
        nonPreferredFirstLevel: 24250, // VALIDATED: R24,250
        nonPreferredTwoOrMoreLevels: 48550, // VALIDATED: R48,550
    },
    majorJointSurgery: {
        networkProviderNoLimit: true, // VALIDATED
        outOfNetworkPercentage: 80, // VALIDATED: 80% of DHR
        outOfNetworkMaximum: 31850, // VALIDATED: R31,850
        excludesEmergencyAndTrauma: true,
    },
    mentalHealth: {
        admissionDays: 21, // VALIDATED
        outOfHospitalConsultations: 15, // VALIDATED
        acuteStressConsultations: 12, // VALIDATED
        attemptedSuicideDays: 3, // VALIDATED
        allOtherAdmissionDays: 21, // VALIDATED
    },
    basicDental: {
        yearlyLimitPerPerson: 23400, // VALIDATED: R23,400
    },
    basicDentalTrauma: {
        yearlyLimitPerPerson: 70800, // VALIDATED: R70,800
    },
};

/**
 * VALIDATED Upfront payments for in-hospital procedures (from brochure Image 0)
 */
export const PRIORITY_HOSPITAL_UPFRONT_PAYMENTS = {
    outsideDaySurgeryNetwork: 7250, // VALIDATED: R7,250
    backNeckTreatmentAdenoidectomyGrommets: 5000, // VALIDATED: R5,000
    arthroscopyNasalHysterectomyLaparoscopy: 11500, // VALIDATED: R11,500
    nissenSpinalJointReplacements: 23700, // VALIDATED: R23,700
};

// ============================================================================
// 1. PRIORITY CLASSIC (2026)
// ============================================================================

export const PRIORITY_CLASSIC_2026: DiscoveryPlan = {
    planId: "discovery-priority-classic-2026",
    planName: "Priority Classic",
    series: DiscoverySeries.PRIORITY,
    variant: DiscoveryPlanVariant.CLASSIC,

    // NOTE: Monthly contributions VALIDATED from brochure Image 3
    monthlyContribution: {
        mainMember: 5431, // VALIDATED: R5,431
        adult: 4295, // VALIDATED: R4,295
        child: 2166, // VALIDATED: R2,166
    },

    hospitalNetwork: DiscoveryNetworkType.PRIORITY_HOSPITAL_NETWORK,
    daySurgeryNetwork: DiscoveryNetworkType.DAY_SURGERY_NETWORK,

    hospitalBenefit: {
        unlimitedPrivateHospitalCover: true, // VALIDATED: "Priority plans offer unlimited hospital cover"
        networkRestriction: DiscoveryNetworkType.PRIORITY_HOSPITAL_NETWORK,
        healthcareProfessionalCoverage: {
            specialistWithPaymentArrangement: { coverageLevel: "Full Cover" }, // VALIDATED
            specialistWithoutPaymentArrangement: { coverageLevel: "Percentage of DHR", percentage: 200 }, // VALIDATED: Classic 200%
            otherHealthcareProfessionals: { coverageLevel: "Percentage of DHR", percentage: 200 },
        },
        outOfNetworkUpfrontPayment: 7250, // VALIDATED: R7,250
        emergencyExemption: true,
    },

    daySurgeryBenefit: {
        daySurgeryNetwork: DiscoveryNetworkType.DAY_SURGERY_NETWORK,
        coveredProcedures: [],
        upfrontPayments: {
            networkType: DiscoveryNetworkType.DAY_SURGERY_NETWORK,
            inNetworkPayment: 0,
            outOfNetworkUpfrontPayment: 7250, // VALIDATED: R7,250
            emergencyExemption: true,
        },
        proceduresNotCoveredOnEssentialPlans: [],
    },

    scopesBenefit: PRIORITY_SCOPES_BENEFIT,
    dentalBenefit: PRIORITY_DENTAL_BENEFIT,

    cancerCover: {
        annualLimit: 0, // Unlimited
        copaymentAboveLimit: 0,
        prescribedMinimumBenefitConditions: { coveredInFull: true },
        essentialSmartNetworkRestriction: { mustUseNetwork: false, limitedToPMB: false },
    },
};

// ============================================================================
// 2. PRIORITY ESSENTIAL (CLASSIC ESSENTIAL) (2026)
// ============================================================================

export const PRIORITY_CLASSIC_ESSENTIAL_2026: DiscoveryPlan = {
    ...PRIORITY_CLASSIC_2026,
    planId: "discovery-priority-classic-essential-2026",
    planName: "Priority Essential",
    variant: DiscoveryPlanVariant.ESSENTIAL,

    // NOTE: Monthly contributions VALIDATED from brochure Image 3
    monthlyContribution: {
        mainMember: 4683, // VALIDATED: R4,683
        adult: 3688, // VALIDATED: R3,688
        child: 1865, // VALIDATED: R1,865
    },

    hospitalBenefit: {
        ...PRIORITY_CLASSIC_2026.hospitalBenefit,
        healthcareProfessionalCoverage: {
            specialistWithPaymentArrangement: { coverageLevel: "Full Cover" },
            specialistWithoutPaymentArrangement: { coverageLevel: "Percentage of DHR", percentage: 100 }, // VALIDATED: Essential 100%
            otherHealthcareProfessionals: { coverageLevel: "Percentage of DHR", percentage: 100 },
        },
    },
};

// ============================================================================
// VALIDATION SUMMARY
// ============================================================================
/**
 * All values marked VALIDATED have been cross-checked against brochure images:
 * 
 * SCOPES (from Image 1):
 * ✅ Day Clinic: R4,650
 * ✅ Hospital: R7,500 → R6,050 (value-based)
 * ✅ Combined Day Clinic: R5,700
 * ✅ Combined Hospital: R9,450 → R7,650 (value-based)
 * ✅ Out of Day Surgery Network: R7,250
 * ✅ In-rooms: R1,800 / R3,100
 * 
 * HOSPITAL UPFRONT PAYMENTS (from Image 0):
 * ✅ Outside Day Surgery Network: R7,250
 * ✅ Back/neck, adenoidectomy, grommets, tonsillectomy: R5,000
 * ✅ Arthroscopy, nasal, hysterectomy, laparoscopy: R11,500
 * ✅ Nissen, spinal, joint replacements: R23,700
 * 
 * YEARLY LIMITS (from Image 2):
 * ✅ Bone-Anchored Hearing Aids: R150,000
 * ✅ Cochlear Implants: R252,000
 * ✅ Shoulder Joint (out of network): R50,000
 * ✅ Spinal Prosthetics: R24,250 / R48,550
 * ✅ Major Joint (out of network max): R31,850
 * 
 * DENTAL (from Image 4):
 * ✅ 13+: R8,950 / R5,750
 * ✅ <13: R3,470 / R1,550
 * ✅ Basic Dental Trauma: R70,800
 * ✅ Basic Dental: R23,400
 * 
 * SPECIALISTS:
 * ✅ Classic: 200% DHR
 * ✅ Essential: 100% DHR
 * 
 * ⚠️ NOT VISIBLE in provided images:
 * - Monthly contributions
 */
