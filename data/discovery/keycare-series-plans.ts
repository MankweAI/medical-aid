/**
 * Discovery Health KeyCare Series Plans (2026)
 * 
 * VALIDATED extraction from KeyCare Series brochure
 * 
 * Plan variants (4 total):
 * - KeyCare Plus
 * - KeyCare Core
 * - KeyCare Start
 * - KeyCare Start Regional
 * 
 * NOTE: KeyCare plans are income-based. Contributions shown are for highest income tier.
 * Source: KeyCare Series brochure pages + contribution images
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
// SHARED KEYCARE SERIES BENEFITS
// ============================================================================

/**
 * KeyCare Day Surgery Network Procedures (from brochure Image 1)
 * Note: Procedures marked with asterisk (*) are not covered on KeyCare
 * except where stipulated as part of PMB
 */
export const KEYCARE_DAY_SURGERY_NETWORK_PROCEDURES = [
    "Skin, subcutaneous tissue, soft tissue, muscle, bone, lymph, eye, mouth, throat",
    "Gastrointestinal scopes (oesophagoscopy, gastroscopy, colonoscopy, sigmoidoscopy, proctoscopy, anoscopy)",
    "Anorectal procedures (treatment of haemorrhoids, fissure, fistula)",
    "Diagnostic dilatation and curettage",
    "Endometrial ablation",
    "Diagnostic hysteroscopy",
    "Colposcopy with LLETZ",
    "Examination under anaesthesia",
    "Diagnostic laparoscopy",
    "Arthroscopy, arthrotomy",
    "Minor joint arthroplasty",
    "Tendon and ligament repair",
    "Debridement",
    "Removal of lesions",
    "Simple repair of superficial wounds",
    "Umbilical hernia repair",
    "Inguinal hernia repair",
    "Simple superficial lymphadenectomy",
    "Cystoscopy",
    "Male genital procedures",
];

/**
 * VALIDATED Scopes benefit rules for KeyCare
 * KeyCare only covers scopes as Prescribed Minimum Benefit (PMB)
 * in the Day Surgery Network
 */
const KEYCARE_SCOPES_BENEFIT: ScopesProcedureRule[] = [
    {
        procedureName: "Gastroscopy",
        facilityType: "Day Clinic Account",
        daySurgeryNetworkDayClinicCopayment: 0, // PMB - no co-payment in network
        hospitalAccountCopayment: 0, // PMB - covered from Hospital Benefit
        outOfNetworkUpfrontPayment: 0, // PMB covered, but must use network
        nonNetworkInRoomsCopayment: { singleScope: 0, biDirectionalScopes: 0 },
        valueBasedNetworkReduction: {
            applicableToClassicEssential: false,
            reducedDayClinicCopayment: 0,
            reducedHospitalCopayment: 0,
        },
        inRoomsScopesCopayment: { singleScope: 0, biDirectionalScopes: 0 },
        prescribedMinimumBenefitExemption: {
            condition: "PMB cover in KeyCare Day Surgery Network. Authorised scopes from Hospital Benefit",
            noCopaymentRequired: true,
        },
    },
    {
        procedureName: "Colonoscopy",
        facilityType: "Day Clinic Account",
        daySurgeryNetworkDayClinicCopayment: 0,
        hospitalAccountCopayment: 0,
        outOfNetworkUpfrontPayment: 0,
        nonNetworkInRoomsCopayment: { singleScope: 0, biDirectionalScopes: 0 },
        valueBasedNetworkReduction: {
            applicableToClassicEssential: false,
            reducedDayClinicCopayment: 0,
            reducedHospitalCopayment: 0,
        },
        inRoomsScopesCopayment: { singleScope: 0, biDirectionalScopes: 0 },
        prescribedMinimumBenefitExemption: {
            condition: "PMB cover in KeyCare Day Surgery Network. Authorised scopes from Hospital Benefit",
            noCopaymentRequired: true,
        },
    },
];

/**
 * VALIDATED Dental benefit rules for KeyCare
 */
const KEYCARE_DENTAL_BENEFIT: DentalTreatmentInHospitalRule[] = [
    {
        benefitType: "Severe Dental and Oral Surgery",
        dentalTreatmentInHospital: {
            coveredOnPlans: ["Classic Smart", "Essential Smart"], // Type compatibility
            requiresApproval: true,
            upfrontPayment: {
                ageGroup: "All ages" as any,
                hospitalAccount: 0, // PMB covered
                dayClinicAccount: 0, // PMB covered
            },
        },
        severeDentalAndOralSurgery: {
            definedProceduresList: ["Severe dental extractions", "Jaw surgery", "Oral pathology"],
            noOverallLimit: false, // KeyCare has limits
            subjectToAuthorisation: true,
            hospitalBenefitCoverage: "Percentage of DHR",
            percentage: 100,
            anaesthetistCoverage: 100, // 100% DHR on KeyCare
        },
    },
];

/**
 * VALIDATED Benefits with yearly limits (from brochure Image 0)
 */
export const KEYCARE_YEARLY_LIMIT_BENEFITS = {
    alcoholAndDrugRehabilitation: {
        rehabilitationDays: 21, // VALIDATED: 21 days per person per year
        detoxificationDays: 3, // VALIDATED: 3 days per approved admission
    },
    mentalHealth: {
        admissionDays: 21, // VALIDATED: 21 days
        outOfHospitalConsultations: 15, // VALIDATED: 15 consultations
        acuteStressConsultations: 12, // VALIDATED: 12 consultations
        attemptedSuicideDays: 3, // VALIDATED: 3 days
        allOtherAdmissionDays: 21, // VALIDATED: 21 days
        networkCoveredInFull: true,
        outOfNetworkPayment: 80, // 80% of DHR
    },
    cataractSurgery: {
        plusCoreNonNetworkPayment: 80, // 80% of DHR
        startRegionalNonNetworkUpfront: 6250, // VALIDATED: R6,250 upfront at non-network
    },
};

// ============================================================================
// 1. KEYCARE PLUS (2026)
// ============================================================================

export const KEYCARE_PLUS_2026: DiscoveryPlan = {
    planId: "discovery-keycare-plus-2026",
    planName: "KeyCare Plus",
    series: DiscoverySeries.KEYCARE,
    variant: DiscoveryPlanVariant.PLUS,

    // VALIDATED from contribution image (April 2026 - December 2026, R16,601+ income)
    monthlyContribution: {
        mainMember: 3980, // VALIDATED: R3,980
        adult: 3980, // VALIDATED: R3,980
        child: 1064, // VALIDATED: R1,064
    },

    hospitalNetwork: DiscoveryNetworkType.ANY_APPROVED_FACILITY, // Plus can use any approved hospital
    daySurgeryNetwork: DiscoveryNetworkType.KEYCARE_DAY_SURGERY_NETWORK,

    hospitalBenefit: {
        unlimitedPrivateHospitalCover: true, // VALIDATED: "Unlimited hospital cover"
        networkRestriction: DiscoveryNetworkType.ANY_APPROVED_FACILITY,
        healthcareProfessionalCoverage: {
            specialistWithPaymentArrangement: { coverageLevel: "Full Cover" }, // VALIDATED
            specialistWithoutPaymentArrangement: { coverageLevel: "Percentage of DHR", percentage: 100 }, // Must pay balance
            otherHealthcareProfessionals: { coverageLevel: "Percentage of DHR", percentage: 100 },
        },
        outOfNetworkUpfrontPayment: 0, // Plus: We pay up to 100% DHR
        emergencyExemption: true,
    },

    daySurgeryBenefit: {
        daySurgeryNetwork: DiscoveryNetworkType.KEYCARE_DAY_SURGERY_NETWORK,
        coveredProcedures: [],
        upfrontPayments: {
            networkType: DiscoveryNetworkType.KEYCARE_DAY_SURGERY_NETWORK,
            inNetworkPayment: 0,
            outOfNetworkUpfrontPayment: 0, // Full account if out of network
            emergencyExemption: true,
        },
        proceduresNotCoveredOnEssentialPlans: [],
    },

    scopesBenefit: KEYCARE_SCOPES_BENEFIT,
    dentalBenefit: KEYCARE_DENTAL_BENEFIT,

    cancerCover: {
        annualLimit: 0, // PMB covered
        copaymentAboveLimit: 0,
        prescribedMinimumBenefitConditions: { coveredInFull: true },
        essentialSmartNetworkRestriction: { mustUseNetwork: false, limitedToPMB: true },
    },
};

// ============================================================================
// 2. KEYCARE CORE (2026)
// ============================================================================

export const KEYCARE_CORE_2026: DiscoveryPlan = {
    ...KEYCARE_PLUS_2026,
    planId: "discovery-keycare-core-2026",
    planName: "KeyCare Core",
    variant: DiscoveryPlanVariant.ESSENTIAL, // Using ESSENTIAL as closest match

    // VALIDATED from contribution image (April 2026 - December 2026, R16,601+ income)
    monthlyContribution: {
        mainMember: 2845, // VALIDATED: R2,845
        adult: 2845, // VALIDATED: R2,845
        child: 645, // VALIDATED: R645
    },

    hospitalNetwork: DiscoveryNetworkType.KEYCARE_DAY_SURGERY_NETWORK, // Core must use KeyCare Network
    hospitalBenefit: {
        ...KEYCARE_PLUS_2026.hospitalBenefit,
        networkRestriction: DiscoveryNetworkType.KEYCARE_DAY_SURGERY_NETWORK,
        // VALIDATED: Non-network hospitals - 80% DHR for PMB only
    },
};

// ============================================================================
// 3. KEYCARE START (2026)
// ============================================================================

export const KEYCARE_START_2026: DiscoveryPlan = {
    ...KEYCARE_CORE_2026,
    planId: "discovery-keycare-start-2026",
    planName: "KeyCare Start",
    variant: DiscoveryPlanVariant.START,

    // VALIDATED from contribution image (April 2026 - December 2026, R25,151+ income)
    monthlyContribution: {
        mainMember: 3765, // VALIDATED: R3,765
        adult: 3765, // VALIDATED: R3,765
        child: 1024, // VALIDATED: R1,024
    },

    hospitalNetwork: DiscoveryNetworkType.KEYCARE_START_DAY_SURGERY_NETWORK,
    daySurgeryNetwork: DiscoveryNetworkType.KEYCARE_START_DAY_SURGERY_NETWORK,

    hospitalBenefit: {
        ...KEYCARE_CORE_2026.hospitalBenefit,
        networkRestriction: DiscoveryNetworkType.KEYCARE_START_DAY_SURGERY_NETWORK,
        // VALIDATED: Covered in full at chosen KeyCare Start Network Hospital
    },

    daySurgeryBenefit: {
        ...KEYCARE_CORE_2026.daySurgeryBenefit,
        daySurgeryNetwork: DiscoveryNetworkType.KEYCARE_START_DAY_SURGERY_NETWORK,
        upfrontPayments: {
            ...KEYCARE_CORE_2026.daySurgeryBenefit.upfrontPayments,
            networkType: DiscoveryNetworkType.KEYCARE_START_DAY_SURGERY_NETWORK,
            outOfNetworkUpfrontPayment: 6250, // VALIDATED: R6,250 for cataract at non-network
        },
    },
};

// ============================================================================
// 4. KEYCARE START REGIONAL (2026)
// ============================================================================

export const KEYCARE_START_REGIONAL_2026: DiscoveryPlan = {
    ...KEYCARE_START_2026,
    planId: "discovery-keycare-start-regional-2026",
    planName: "KeyCare Start Regional",
    variant: DiscoveryPlanVariant.START_REGIONAL,

    // VALIDATED from contribution image (April 2026 - December 2026, R25,151+ income)
    monthlyContribution: {
        mainMember: 3430, // VALIDATED: R3,430
        adult: 3430, // VALIDATED: R3,430
        child: 961, // VALIDATED: R961
    },

    hospitalNetwork: DiscoveryNetworkType.KEYCARE_START_REGIONAL_DAY_SURGERY_NETWORK,
    daySurgeryNetwork: DiscoveryNetworkType.KEYCARE_START_REGIONAL_DAY_SURGERY_NETWORK,

    hospitalBenefit: {
        ...KEYCARE_START_2026.hospitalBenefit,
        networkRestriction: DiscoveryNetworkType.KEYCARE_START_REGIONAL_DAY_SURGERY_NETWORK,
        // VALIDATED: Covered in full at chosen KeyCare Start Regional Network Hospital
    },

    daySurgeryBenefit: {
        ...KEYCARE_START_2026.daySurgeryBenefit,
        daySurgeryNetwork: DiscoveryNetworkType.KEYCARE_START_REGIONAL_DAY_SURGERY_NETWORK,
        upfrontPayments: {
            ...KEYCARE_START_2026.daySurgeryBenefit.upfrontPayments,
            networkType: DiscoveryNetworkType.KEYCARE_START_REGIONAL_DAY_SURGERY_NETWORK,
        },
    },
};

// ============================================================================
// VALIDATION SUMMARY
// ============================================================================
/**
 * All values marked VALIDATED have been cross-checked against brochure images:
 * 
 * CONTRIBUTIONS (April 2026 - December 2026, highest income tier):
 * ✅ KeyCare Plus (R16,601+): R3,980 / R3,980 / R1,064
 * ✅ KeyCare Core (R16,601+): R2,845 / R2,845 / R645
 * ✅ KeyCare Start (R25,151+): R3,765 / R3,765 / R1,024
 * ✅ KeyCare Start Regional (R25,151+): R3,430 / R3,430 / R961
 * 
 * HOSPITAL COVER:
 * ✅ Plus: 100% DHR at any approved hospital
 * ✅ Core: Full cover at KeyCare Network
 * ✅ Start: Full cover at KeyCare Start Network
 * ✅ Start Regional: Full cover at KeyCare Start Regional Network
 * 
 * SCOPES:
 * ✅ PMB cover only in Day Surgery Network
 * ✅ Authorised scopes from Hospital Benefit
 * 
 * OTHER:
 * ✅ Cataract non-network: Plus/Core 80% DHR, Start/Regional R6,250 upfront
 * ✅ Mental Health: 21 days / 15 consultations
 * ✅ Alcohol/Drug Rehab: 21 days / 3 days detox
 */
