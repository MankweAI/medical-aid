import {
    DiscoveryPlan,
    DiscoverySeries,
    DiscoveryPlanVariant,
    DiscoveryNetworkType,
    MemberAgeGroup,
    DaySurgeryProcedureCategory,
    DaySurgeryNetworkProcedure,
} from '@/types/schemes/discovery';

// ============================================================================
// SHARED CONSTANTS
// ============================================================================

const SMART_DAY_SURGERY_PROCEDURES: DaySurgeryNetworkProcedure[] = [
    {
        procedureName: "Tonsillectomy and/or adenoidectomy",
        category: DaySurgeryProcedureCategory.EAR_NOSE_THROAT,
        excludedOnEssentialSmartSaver: false,
        excludedOnEssentialSmart: false,
        excludedOnEssentialDynamicSmart: false,
        excludedOnActiveSmart: true,
        excludedOnKeyCare: true,
        mustBePerformedInNetwork: true,
        applicableNetworks: [DiscoveryNetworkType.SMART_DAY_SURGERY_NETWORK],
    },
    {
        procedureName: "Gastrointestinal scopes (oesophagoscopy, gastroscopy, colonoscopy, sigmoidoscopy, proctoscopy, anoscopy)",
        category: DaySurgeryProcedureCategory.GASTROINTESTINAL,
        excludedOnEssentialSmartSaver: false,
        excludedOnEssentialSmart: false,
        excludedOnEssentialDynamicSmart: false,
        excludedOnActiveSmart: false,
        excludedOnKeyCare: false,
        mustBePerformedInNetwork: true,
        applicableNetworks: [DiscoveryNetworkType.SMART_DAY_SURGERY_NETWORK],
    },
    {
        procedureName: "Cataract surgery",
        category: DaySurgeryProcedureCategory.EYE_PROCEDURES,
        excludedOnEssentialSmartSaver: false,
        excludedOnEssentialSmart: false,
        excludedOnEssentialDynamicSmart: false,
        excludedOnActiveSmart: false,
        excludedOnKeyCare: false,
        mustBePerformedInNetwork: true,
        applicableNetworks: [DiscoveryNetworkType.SMART_DAY_SURGERY_NETWORK],
    }
];

// ============================================================================
// 1. CLASSIC SMART (2026)
// ============================================================================

export const CLASSIC_SMART_2026: DiscoveryPlan = {
    planId: "discovery-smart-classic-2026",
    planName: "Classic Smart",
    series: DiscoverySeries.SMART,
    variant: DiscoveryPlanVariant.CLASSIC,

    monthlyContribution: {
        mainMember: 2600,
        adult: 2050,
        child: 1040,
    },

    hospitalNetwork: DiscoveryNetworkType.SMART_HOSPITAL_NETWORK,
    daySurgeryNetwork: DiscoveryNetworkType.SMART_DAY_SURGERY_NETWORK,

    hospitalBenefit: {
        unlimitedPrivateHospitalCover: true,
        networkRestriction: DiscoveryNetworkType.SMART_HOSPITAL_NETWORK,
        healthcareProfessionalCoverage: {
            specialistWithPaymentArrangement: { coverageLevel: "Full Cover" },
            specialistWithoutPaymentArrangement: { coverageLevel: "Percentage of DHR", percentage: 200 },
            otherHealthcareProfessionals: { coverageLevel: "Percentage of DHR", percentage: 200 },
        },
        outOfNetworkUpfrontPayment: 12650,
        emergencyExemption: true,
    },

    daySurgeryBenefit: {
        daySurgeryNetwork: DiscoveryNetworkType.SMART_DAY_SURGERY_NETWORK,
        coveredProcedures: SMART_DAY_SURGERY_PROCEDURES,
        upfrontPayments: {
            networkType: DiscoveryNetworkType.SMART_DAY_SURGERY_NETWORK,
            inNetworkPayment: 0,
            outOfNetworkUpfrontPayment: 12650,
            emergencyExemption: true,
        },
        proceduresNotCoveredOnEssentialPlans: [],
    },

    scopesBenefit: [
        {
            procedureName: "Gastroscopy",
            facilityType: "Day Clinic Account",
            daySurgeryNetworkDayClinicCopayment: 4650,
            hospitalAccountCopayment: 8000,
            outOfNetworkUpfrontPayment: 12650,
            valueBasedNetworkReduction: {
                applicableToClassicEssential: true,
                reducedDayClinicCopayment: 4650,
                reducedHospitalCopayment: 6650,
            },
            inRoomsScopesCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
            nonNetworkInRoomsCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
            prescribedMinimumBenefitExemption: {
                condition: "Patient 12 or under with dyspepsia",
                noCopaymentRequired: true,
            },
        },
        {
            procedureName: "Colonoscopy",
            facilityType: "Day Clinic Account",
            daySurgeryNetworkDayClinicCopayment: 4650,
            hospitalAccountCopayment: 8000,
            outOfNetworkUpfrontPayment: 12650,
            valueBasedNetworkReduction: {
                applicableToClassicEssential: true,
                reducedDayClinicCopayment: 4650,
                reducedHospitalCopayment: 6650,
            },
            inRoomsScopesCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
            nonNetworkInRoomsCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
            prescribedMinimumBenefitExemption: {
                condition: "PMB Only",
                noCopaymentRequired: true,
            },
        }
    ],

    dentalBenefit: [
        {
            benefitType: "Severe Dental and Oral Surgery",
            dentalTreatmentInHospital: {
                coveredOnPlans: ["Classic Smart"],
                requiresApproval: true,
                upfrontPayment: {
                    ageGroup: MemberAgeGroup.THIRTEEN_AND_OLDER,
                    hospitalAccount: 8950,
                    dayClinicAccount: 5750,
                },
            },
            severeDentalAndOralSurgery: {
                definedProceduresList: ["Severe dental extractions"],
                noOverallLimit: true,
                subjectToAuthorisation: true,
                hospitalBenefitCoverage: "Percentage of DHR",
                percentage: 100,
                anaesthetistCoverage: 200,
            },
        },
    ],

    cancerCover: {
        annualLimit: 250000,
        copaymentAboveLimit: 20,
        prescribedMinimumBenefitConditions: { coveredInFull: true },
        essentialSmartNetworkRestriction: { mustUseNetwork: false, limitedToPMB: false },
    },

    // LOW-INTENT properties removed for revenue focus
};

// ============================================================================
// 2. ESSENTIAL SMART (2026)
// ============================================================================

export const ESSENTIAL_SMART_2026: DiscoveryPlan = {
    planId: "discovery-smart-essential-2026",
    planName: "Essential Smart",
    series: DiscoverySeries.SMART,
    variant: DiscoveryPlanVariant.ESSENTIAL,

    monthlyContribution: { mainMember: 1800, adult: 1800, child: 720 },

    hospitalNetwork: DiscoveryNetworkType.SMART_HOSPITAL_NETWORK,
    daySurgeryNetwork: DiscoveryNetworkType.SMART_DAY_SURGERY_NETWORK,

    hospitalBenefit: {
        unlimitedPrivateHospitalCover: true,
        networkRestriction: DiscoveryNetworkType.SMART_HOSPITAL_NETWORK,
        healthcareProfessionalCoverage: {
            specialistWithPaymentArrangement: { coverageLevel: "Full Cover" },
            specialistWithoutPaymentArrangement: { coverageLevel: "Percentage of DHR", percentage: 100 },
            otherHealthcareProfessionals: { coverageLevel: "Percentage of DHR", percentage: 100 },
        },
        outOfNetworkUpfrontPayment: 12650,
        emergencyExemption: true,
    },

    daySurgeryBenefit: {
        daySurgeryNetwork: DiscoveryNetworkType.SMART_DAY_SURGERY_NETWORK,
        coveredProcedures: SMART_DAY_SURGERY_PROCEDURES,
        upfrontPayments: {
            networkType: DiscoveryNetworkType.SMART_DAY_SURGERY_NETWORK,
            inNetworkPayment: 0,
            outOfNetworkUpfrontPayment: 12650,
            emergencyExemption: true,
        },
        proceduresNotCoveredOnEssentialPlans: ["Joint Replacements", "Functional Nasal Surgery"],
    },

    scopesBenefit: [
        {
            procedureName: "Gastroscopy",
            facilityType: "Day Clinic Account",
            daySurgeryNetworkDayClinicCopayment: 4650,
            hospitalAccountCopayment: 8000,
            outOfNetworkUpfrontPayment: 12650,
            valueBasedNetworkReduction: {
                applicableToClassicEssential: true,
                reducedDayClinicCopayment: 4650,
                reducedHospitalCopayment: 6650,
            },
            inRoomsScopesCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
            nonNetworkInRoomsCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
            prescribedMinimumBenefitExemption: {
                condition: "Patient 12 or under with dyspepsia",
                noCopaymentRequired: true,
            },
        },
        {
            procedureName: "Colonoscopy",
            facilityType: "Day Clinic Account",
            daySurgeryNetworkDayClinicCopayment: 4650,
            hospitalAccountCopayment: 8000,
            outOfNetworkUpfrontPayment: 12650,
            valueBasedNetworkReduction: {
                applicableToClassicEssential: true,
                reducedDayClinicCopayment: 4650,
                reducedHospitalCopayment: 6650,
            },
            inRoomsScopesCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
            nonNetworkInRoomsCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
            prescribedMinimumBenefitExemption: {
                condition: "Patient 12 or under with dyspepsia",
                noCopaymentRequired: true,
            },
        },

    ],

    dentalBenefit: [],

    cancerCover: {
        annualLimit: 250000,
        copaymentAboveLimit: 20,
        prescribedMinimumBenefitConditions: { coveredInFull: true },
        essentialSmartNetworkRestriction: { mustUseNetwork: true, limitedToPMB: false },
    },

    // LOW-INTENT properties removed for revenue focus
};

// ============================================================================
// 3. ESSENTIAL DYNAMIC SMART (2026)
// ============================================================================

export const ESSENTIAL_DYNAMIC_SMART_2026: DiscoveryPlan = {
    ...ESSENTIAL_SMART_2026,
    planId: "discovery-smart-essential-dynamic-2026",
    planName: "Essential Dynamic Smart",
    // Custom overrides if known, otherwise identical to Essential for now
    monthlyContribution: { mainMember: 1550, adult: 1550, child: 600 },
    hospitalBenefit: {
        ...ESSENTIAL_SMART_2026.hospitalBenefit,
        outOfNetworkUpfrontPayment: 15300
    }
};
