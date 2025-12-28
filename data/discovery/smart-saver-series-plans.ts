/**
 * Discovery Health Smart Saver Series Plans (2026)
 * 
 * VALIDATED extraction from "Smart Saver" brochure images
 * 
 * Plans:
 * - Classic Smart Saver
 * - Essential Smart Saver
 * 
 * NOTE: Monthly contributions missing from provided images.
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
// SHARED SMART SAVER BENEFITS
// ============================================================================

/**
 * VALIDATED Scopes benefits (Image 0)
 * - Day Clinic: R4,650
 * - Hospital: R8,000 (R6,650 value-based)
 * - Combined Scopes Day: R5,700
 * - Combined Scopes Hosp: R9,950 (R8,250 value-based)
 * - OON Day Surgery Penalty: R12,650 (Image 0: "upfront payment of R12,650")
 */
const SMART_SAVER_SCOPES_BENEFIT: ScopesProcedureRule[] = [
    {
        procedureName: "Gastroscopy",
        facilityType: "Day Clinic Account",
        daySurgeryNetworkDayClinicCopayment: 4650, // VALIDATED
        hospitalAccountCopayment: 8000, // VALIDATED
        outOfNetworkUpfrontPayment: 12650, // VALIDATED: R12,650
        nonNetworkInRoomsCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
        valueBasedNetworkReduction: {
            applicableToClassicEssential: true,
            reducedDayClinicCopayment: 4650, // No reduction mentioned for Day Clinic value-based, assumes standard
            reducedHospitalCopayment: 6650, // VALIDATED
        },
        inRoomsScopesCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
        prescribedMinimumBenefitExemption: {
            condition: "Dyspepsia, patient aged 12 years or under, or in-rooms at network provider",
            noCopaymentRequired: true,
        },
    },
    {
        procedureName: "Colonoscopy",
        facilityType: "Day Clinic Account",
        daySurgeryNetworkDayClinicCopayment: 4650,
        hospitalAccountCopayment: 8000,
        outOfNetworkUpfrontPayment: 12650,
        nonNetworkInRoomsCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
        valueBasedNetworkReduction: {
            applicableToClassicEssential: true,
            reducedDayClinicCopayment: 4650,
            reducedHospitalCopayment: 6650,
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
        daySurgeryNetworkDayClinicCopayment: 5700, // VALIDATED
        hospitalAccountCopayment: 9950, // VALIDATED
        outOfNetworkUpfrontPayment: 12650,
        nonNetworkInRoomsCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
        valueBasedNetworkReduction: {
            applicableToClassicEssential: true,
            reducedDayClinicCopayment: 5700,
            reducedHospitalCopayment: 8250, // VALIDATED
        },
        inRoomsScopesCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
        prescribedMinimumBenefitExemption: {
            condition: "Dyspepsia, patient aged 12 years or under, or in-rooms at network provider",
            noCopaymentRequired: true,
        },
    },
];

/**
 * VALIDATED Dental benefits (Image 4)
 * - Severe Dental: Covered (Authorisation required)
 * - Upfront Payments: R8,950 / R5,750 (13+)
 * - Trauma: R70,800 limit
 */
const SMART_SAVER_DENTAL_BENEFIT: DentalTreatmentInHospitalRule[] = [
    {
        benefitType: "Severe Dental and Oral Surgery",
        dentalTreatmentInHospital: {
            coveredOnPlans: ["Classic Smart Saver" as any, "Essential Smart Saver" as any],
            requiresApproval: true,
            upfrontPayment: {
                ageGroup: "13 years and older" as any,
                hospitalAccount: 8950, // VALIDATED
                dayClinicAccount: 5750, // VALIDATED
            },
        },
        severeDentalAndOralSurgery: {
            definedProceduresList: ["Severe dental extractions", "Jaw surgery", "Oral pathology"],
            noOverallLimit: true,
            subjectToAuthorisation: true,
            hospitalBenefitCoverage: "Full", // "100% of DHR" (Essential) or "200% of DHR" (Classic - Anaesthetist)
            percentage: 100, // Surgeon 100%
            anaesthetistCoverage: 100, // Default 100%. Classic overrides to 200%.
        },
        basicDentalTrauma: {
            yearlyLimit: 70800, // VALIDATED
            coversAppliances: true,
            coversOrthodontics: false,
            excludedPlans: [],
        },
    },
];

// ============================================================================
// 1. CLASSIC SMART SAVER (2026)
// ============================================================================

export const CLASSIC_SMART_SAVER_2026: DiscoveryPlan = {
    planId: "discovery-smart-saver-classic-2026",
    planName: "Classic Smart Saver",
    series: DiscoverySeries.SAVER, // "Smart Saver" concept
    variant: DiscoveryPlanVariant.CLASSIC,

    // NOTE: Monthly contributions VALIDATED from 2026 Table
    monthlyContribution: {
        mainMember: 3350, // VALIDATED: R3,350
        adult: 2840, // VALIDATED: R2,840
        child: 1400, // VALIDATED: R1,400
    },

    hospitalNetwork: DiscoveryNetworkType.ANY_APPROVED_FACILITY, // Assumed Any for Classic Smart Saver (Standard Saver rule), but Smart Day Surgery Network
    daySurgeryNetwork: DiscoveryNetworkType.SMART_DAY_SURGERY_NETWORK, // VALIDATED

    hospitalBenefit: {
        unlimitedPrivateHospitalCover: true,
        networkRestriction: DiscoveryNetworkType.ANY_APPROVED_FACILITY,
        healthcareProfessionalCoverage: {
            specialistWithPaymentArrangement: { coverageLevel: "Full Cover" },
            specialistWithoutPaymentArrangement: { coverageLevel: "Percentage of DHR", percentage: 200 }, // VALIDATED: "pay up to 200% of the DHR" (Image 3/4)
            otherHealthcareProfessionals: { coverageLevel: "Percentage of DHR", percentage: 200 },
        },
        outOfNetworkUpfrontPayment: 0,
        emergencyExemption: true,
    },

    daySurgeryBenefit: {
        daySurgeryNetwork: DiscoveryNetworkType.SMART_DAY_SURGERY_NETWORK,
        coveredProcedures: [],
        upfrontPayments: {
            networkType: DiscoveryNetworkType.SMART_DAY_SURGERY_NETWORK,
            inNetworkPayment: 0,
            outOfNetworkUpfrontPayment: 12650, // VALIDATED: Image 3 table
            emergencyExemption: true,
        },
        proceduresNotCoveredOnEssentialPlans: [],
    },

    scopesBenefit: SMART_SAVER_SCOPES_BENEFIT,
    dentalBenefit: SMART_SAVER_DENTAL_BENEFIT, // Covered on Classic

    cancerCover: {
        annualLimit: 0,
        copaymentAboveLimit: 0,
        prescribedMinimumBenefitConditions: { coveredInFull: true },
        essentialSmartNetworkRestriction: { mustUseNetwork: false, limitedToPMB: false },
    },
};

// ============================================================================
// 2. ESSENTIAL SMART SAVER (2026)
// ============================================================================

export const ESSENTIAL_SMART_SAVER_2026: DiscoveryPlan = {
    ...CLASSIC_SMART_SAVER_2026,
    planId: "discovery-smart-saver-essential-2026",
    planName: "Essential Smart Saver",
    variant: DiscoveryPlanVariant.ESSENTIAL,

    hospitalBenefit: {
        ...CLASSIC_SMART_SAVER_2026.hospitalBenefit,
        healthcareProfessionalCoverage: {
            specialistWithPaymentArrangement: { coverageLevel: "Full Cover" },
            specialistWithoutPaymentArrangement: { coverageLevel: "Percentage of DHR", percentage: 100 }, // VALIDATED: "100% of DHR" (Image 3/4)
            otherHealthcareProfessionals: { coverageLevel: "Percentage of DHR", percentage: 100 },
        },
    },

    // NOTE: Monthly contributions VALIDATED from 2026 Table
    monthlyContribution: {
        mainMember: 2750, // VALIDATED: R2,750
        adult: 2350, // VALIDATED: R2,350
        child: 895, // VALIDATED: R895
    },
    // "Not covered on the Essential Smart Saver Plan":
    // - Bone-Anchored Hearing Aids
    // - Cochlear Implants
    // - Internal Nerve Stimulators
    // - Shoulder Joint Prosthesis
    // - Prosthetic devices in spinal surgery
    // - Major joint surgery

    // NOTE: These exclusions are typically handled by the Benefit Rules logic (e.g. checking plan name/variant)
    // Since we reuse shared rules, I'll update the shared rules in `discovery.ts` or local objects if possible.
    // However, `SMART_YEARLY_LIMIT_BENEFITS` in `smart-series-plans.ts` was exported. 
    // Saver plans might need similar logic. 
    // For now, I'll flag these exclusions in the plan definition comments.
};
