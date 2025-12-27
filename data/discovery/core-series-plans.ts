/**
 * Discovery Health Core Series Plans (2026)
 * 
 * Extracted from Core Series brochure pages 25-29
 * Plan variants: Classic Core, Essential Core, Coastal Core, Delta Core
 * 
 * NOTE: Monthly contributions not visible in source pages - placeholder values used
 */

import {
    DiscoveryPlan,
    DiscoverySeries,
    DiscoveryPlanVariant,
    DiscoveryNetworkType,
    MemberAgeGroup
} from '@/types/schemes/discovery';

// ============================================================================
// SHARED CORE SERIES BENEFITS
// ============================================================================

/**
 * Day Surgery Network Procedures (applies to all Core plans)
 * Complete list from brochure page 25-26
 */
export const CORE_DAY_SURGERY_NETWORK_PROCEDURES = [
    "Skin, subcutaneous tissue, soft tissue, muscle, bone, lymph, eye, mouth, throat",
    "Mastectomy for gynecomastia",
    "Lumpectomy (fibroadenoma)",
    "Tonsillectomy and/or adenoidectomy",
    "Repair turbinates, nasal septum",
    "Simple procedures for nosebleed (extensive cautery)",
    "Sinus lavage",
    "Scopes (nasal endoscopy, laryngoscopy)",
    "Middle ear procedures (mastoidectomy, myringoplasty, myringotomy and/or grommets)",
    "Corneal transplant",
    "Treatment of glaucoma",
    "Other eye procedures (removal of foreign body, conjunctival surgery, repair laceration, pterygium, glaucoma surgery, probing and repair of tear ducts, vitrectomy, retinal surgery, eyelid surgery, strabismus repair)",
    "Gastrointestinal scopes (oesophagoscopy, gastroscopy, colonoscopy, sigmoidoscopy, proctoscopy, anoscopy)",
    "Anorectal procedures (treatment of haemorrhoids, fissure, fistula)",
    "Diagnostic hysteroscopy and curettage",
    "Endometrial ablation",
    "Diagnostic hysteroscopy",
    "Colposcopy with LLETZ",
    "Examination under anaesthesia",
    "Diagnostic laparoscopy",
    "Simple vulval and introitus procedures",
    "Vaginal, cervix and oviduct procedures",
    "Suction curettage",
    "Uterine evacuation and curettage",
    "Arthroscopy, arthrotomy",
    "Minor joint arthroplasty",
    "Tendon and ligament repair",
    "Repair bunion or toe deformity",
    "Treatment of simple closed fractures and/or dislocations",
    "Neuroplasty median nerve, ulnar nerve, digital nerve",
    "Debridement",
    "Removal of lesions",
    "Simple repair of superficial wounds",
    "Umbilical hernia repair",
    "Inguinal hernia repair",
    "Simple superficial lymphadenectomy",
    "Cystoscopy",
    "Male genital procedures (circumcision, repair of penis, exploration of testes and scrotum, orchiectomy, epididymectomy, excision hydrocele, excision varicocoele, vasectomy)"
];

/**
 * Scopes benefit rules shared across Core plans
 */
const CORE_SCOPES_BENEFIT = [
    {
        procedureName: "Gastroscopy",
        facilityType: "Day Clinic Account",
        daySurgeryNetworkDayClinicCopayment: 4650,
        hospitalAccountCopayment: 8000,
        outOfNetworkUpfrontPayment: 7250,
        valueBasedNetworkReduction: {
            applicableToClassicEssential: true,
            reducedDayClinicCopayment: 4650,
            reducedHospitalCopayment: 6650,
        },
        inRoomsScopesCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
        prescribedMinimumBenefitExemption: {
            condition: "Patient aged 12 years or under with dyspepsia, or in-rooms at network provider",
            noCopaymentRequired: true,
        },
    },
    {
        procedureName: "Colonoscopy",
        facilityType: "Day Clinic Account",
        daySurgeryNetworkDayClinicCopayment: 4650,
        hospitalAccountCopayment: 8000,
        outOfNetworkUpfrontPayment: 7250,
        valueBasedNetworkReduction: {
            applicableToClassicEssential: true,
            reducedDayClinicCopayment: 4650,
            reducedHospitalCopayment: 6650,
        },
        inRoomsScopesCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
        prescribedMinimumBenefitExemption: {
            condition: "Patient aged 12 years or under with dyspepsia, or in-rooms at network provider",
            noCopaymentRequired: true,
        },
    },
    {
        procedureName: "Sigmoidoscopy",
        facilityType: "Day Clinic Account",
        daySurgeryNetworkDayClinicCopayment: 4650,
        hospitalAccountCopayment: 8000,
        outOfNetworkUpfrontPayment: 7250,
        valueBasedNetworkReduction: {
            applicableToClassicEssential: true,
            reducedDayClinicCopayment: 4650,
            reducedHospitalCopayment: 6650,
        },
        inRoomsScopesCopayment: { singleScope: 1800, biDirectionalScopes: 3100 },
        prescribedMinimumBenefitExemption: {
            condition: "Patient aged 12 years or under with dyspepsia, or in-rooms at network provider",
            noCopaymentRequired: true,
        },
    },
];

/**
 * Dental benefit rules for Core plans
 * Includes age-based co-payments
 */
const CORE_DENTAL_BENEFIT = [
    {
        benefitType: "Severe Dental and Oral Surgery" as const,
        dentalTreatmentInHospital: {
            coveredOnPlans: ["Classic Core", "Essential Core", "Coastal Core", "Delta Core"],
            requiresApproval: true,
            upfrontPayment: {
                ageGroup: MemberAgeGroup.THIRTEEN_AND_OLDER,
                hospitalAccount: 8950,
                dayClinicAccount: 5750,
            },
        },
        severeDentalAndOralSurgery: {
            definedProceduresList: ["Severe dental extractions", "Jaw surgery", "Oral pathology"],
            noOverallLimit: true,
            subjectToAuthorisation: true,
            hospitalBenefitCoverage: "Percentage of DHR",
            percentage: 100,
            anaesthetistCoverage: 200,
        },
    },
];

/**
 * Benefits with yearly limits (Core Series)
 */
export const CORE_YEARLY_LIMIT_BENEFITS = {
    boneAnchoredHearingAids: {
        limitPerPerson: 150000,
        processorUpgradeLimit: 78000, // Every 3 years
    },
    cochlearImplants: {
        limitPerPerson: 252000,
        processorUpgradeLimit: 190000, // Every 3 years
    },
    internalNerveStimulators: {
        limitPerPerson: 192000,
    },
    shoulderJointProsthesis: {
        inNetworkLimit: null, // No limit if in network
        outOfNetworkLimit: 46000,
    },
    alcoholAndDrugRehabilitation: {
        rehabilitationDays: 21,
        detoxificationDays: 3,
    },
    prostheticDevicesSpinalSurgery: {
        inNetworkNoLimit: true,
        nonPreferredSupplierFirstLevel: 18900,
        nonPreferredSupplierTwoOrMoreLevels: 37800,
    },
    majorJointSurgery: {
        networkProviderNoLimit: true,
        outOfNetworkMaximum: 31850, // 80% of DHR, max R31,850
        excludesEmergencyAndTrauma: true,
    },
    basicDentalTrauma: {
        yearlyLimitPerPerson: 70800,
    },
};

// ============================================================================
// 1. CLASSIC CORE (2026)
// ============================================================================

export const CLASSIC_CORE_2026: DiscoveryPlan = {
    planId: "discovery-core-classic-2026",
    planName: "Classic Core",
    series: DiscoverySeries.CORE,
    variant: DiscoveryPlanVariant.CLASSIC,

    // NOTE: Contributions not visible in source pages - placeholder
    monthlyContribution: {
        mainMember: 0, // TODO: Extract from contribution pages
        adult: 0,
        child: 0,
    },

    hospitalNetwork: DiscoveryNetworkType.CORE_HOSPITAL_NETWORK,
    daySurgeryNetwork: DiscoveryNetworkType.CORE_DAY_SURGERY_NETWORK,

    hospitalBenefit: {
        outOfNetworkUpfrontPayment: 7750, // Placeholder - needs verification
        inNetworkCopayment: 0,
        dayClinicCopayment: 0,
        unlimitedHospitalCover: true,
        emergencyExemption: true,
        proceduresNotCoveredOnEssentialPlans: [],
    },

    daySurgeryBenefit: {
        networkRequired: true,
        outOfNetworkPenalty: 7250,
        coveredProcedures: CORE_DAY_SURGERY_NETWORK_PROCEDURES,
    },

    scopesBenefit: CORE_SCOPES_BENEFIT,
    dentalBenefit: CORE_DENTAL_BENEFIT,

    cancerCover: {
        annualLimit: 250000, // Placeholder - needs verification
        copaymentAboveLimit: 20,
        prescribedMinimumBenefitConditions: { coveredInFull: true },
        essentialSmartNetworkRestriction: { mustUseNetwork: false, limitedToPMB: false },
    },
};

// ============================================================================
// 2. ESSENTIAL CORE (2026)
// ============================================================================

export const ESSENTIAL_CORE_2026: DiscoveryPlan = {
    ...CLASSIC_CORE_2026,
    planId: "discovery-core-essential-2026",
    planName: "Essential Core",
    variant: DiscoveryPlanVariant.ESSENTIAL,
    hospitalNetwork: DiscoveryNetworkType.ESSENTIAL_CORE_HOSPITAL_NETWORK,
};

// ============================================================================
// 3. COASTAL CORE (2026)
// ============================================================================

export const COASTAL_CORE_2026: DiscoveryPlan = {
    ...CLASSIC_CORE_2026,
    planId: "discovery-core-coastal-2026",
    planName: "Coastal Core",
    variant: DiscoveryPlanVariant.COASTAL,
    hospitalNetwork: DiscoveryNetworkType.COASTAL_HOSPITAL_NETWORK,
};

// ============================================================================
// 4. DELTA CORE (2026)
// ============================================================================

export const DELTA_CORE_2026: DiscoveryPlan = {
    ...CLASSIC_CORE_2026,
    planId: "discovery-core-delta-2026",
    planName: "Delta Core",
    variant: DiscoveryPlanVariant.DELTA,
    hospitalNetwork: DiscoveryNetworkType.DELTA_HOSPITAL_NETWORK,
};
