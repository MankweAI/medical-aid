/**
 * Bestmed Beat1 Plan - 2026
 * 
 * Hospital Plan with Network option.
 * Data extracted from official Bestmed Beat1 2026 brochure.
 */

import { BestmedPlan, BestmedSeries, BestmedNetworkOption } from '@/types/schemes/bestmed';

export const BEAT1_NETWORK_2026: BestmedPlan = {
    planId: 'bestmed-beat1-network-2026',
    planName: 'Beat1 Network',
    series: BestmedSeries.BEAT,
    tier: 1,
    networkOption: BestmedNetworkOption.NETWORK,
    planType: 'Hospital Plan',
    benefitYear: 2026,

    contributions: {
        principalMember: 2269,
        adultDependant: 1764,
        childDependant: 956,
    },

    copayments: {
        nonNetworkHospital: 15025,
        dayProcedureAtAcuteHospital: 2872,
        mriCtScan: 2600,

        procedures: {
            gastroscopy: 2000,
            colonoscopy: 2000,
            sigmoidoscopy: 2000,
            cystoscopy: 2000,
            hysteroscopy: 2000,
            arthroscopic: 3660,
            backNeckSurgery: 3660,
            laparoscopic: 3660,
            nasalSinus: 2000,
        },
    },

    limits: {
        specialisedImagingAnnual: 20920,
        biologicalMedicineAnnual: 12144,
        advancedIllnessBenefit: 72858,

        prosthesis: {
            hipMajorJoints: 41918,
            kneeShoulder: 51686,
            otherMinorJoints: 16078,
            overallAnnualLimit: 99764,
        },
    },

    pmbExemption: {
        noCopaymentForPMB: true,
        requiresDSP: true,
    },

    preAuthorisation: {
        requiredDaysBefore: 14,
        emergencyNotification: 'Notify Bestmed within first working day after admission',
    },
};

// Export all Beat1 plans
export const ALL_BEAT1_PLANS = [BEAT1_NETWORK_2026];
