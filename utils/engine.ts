import { Plan, Contribution, IncomeBand, FixedPricing } from './types';
import { Persona } from './persona'; // Ensure this import exists
import { ConditionSlug, CONDITIONS } from './condition-mapping';
import { TCOCalculationResult } from '@/types/condition-basket';

export interface FinancialProfile {
    monthlyPremium: number;
    savings: {
        isPooled: boolean;
        annualAllocation: number;
    };
}

/**
 * Condition-specific cost estimates (placeholder data)
 * In production, this would come from the database or actuarial models
 */
const CONDITION_COST_ESTIMATES: Record<ConditionSlug, {
    totalConditionCost: number;
    pmbCoverage: number;
    hospitalBenefit: number;
    chronicMedication: number;
    schemeRateGap: number;
    baseCopayment: number;
}> = {
    'digestive-disorders': {
        totalConditionCost: 85000,
        pmbCoverage: 45000,
        hospitalBenefit: 25000,
        chronicMedication: 8000,
        schemeRateGap: 3500,
        baseCopayment: 4650,
    },
    'joint-care': {
        totalConditionCost: 120000,
        pmbCoverage: 60000,
        hospitalBenefit: 35000,
        chronicMedication: 5000,
        schemeRateGap: 8000,
        baseCopayment: 12000,
    },
    'knee-injuries': {
        totalConditionCost: 95000,
        pmbCoverage: 50000,
        hospitalBenefit: 30000,
        chronicMedication: 3000,
        schemeRateGap: 5000,
        baseCopayment: 7000,
    },
    'hip-conditions': {
        totalConditionCost: 110000,
        pmbCoverage: 55000,
        hospitalBenefit: 32000,
        chronicMedication: 4000,
        schemeRateGap: 7000,
        baseCopayment: 12000,
    },
    'spinal-conditions': {
        totalConditionCost: 150000,
        pmbCoverage: 70000,
        hospitalBenefit: 45000,
        chronicMedication: 6000,
        schemeRateGap: 12000,
        baseCopayment: 17000,
    },
    'eye-health': {
        totalConditionCost: 45000,
        pmbCoverage: 20000,
        hospitalBenefit: 15000,
        chronicMedication: 2000,
        schemeRateGap: 3000,
        baseCopayment: 5000,
    },
    'maternity-care': {
        totalConditionCost: 65000,
        pmbCoverage: 55000,
        hospitalBenefit: 5000,
        chronicMedication: 0,
        schemeRateGap: 2000,
        baseCopayment: 3000,
    },
    'dental-conditions': {
        totalConditionCost: 35000,
        pmbCoverage: 10000,
        hospitalBenefit: 12000,
        chronicMedication: 0,
        schemeRateGap: 5000,
        baseCopayment: 8000,
    },
    'nasal-sinus-conditions': {
        totalConditionCost: 40000,
        pmbCoverage: 18000,
        hospitalBenefit: 12000,
        chronicMedication: 2000,
        schemeRateGap: 3000,
        baseCopayment: 5000,
    },
    'cancer-care': {
        totalConditionCost: 500000,
        pmbCoverage: 250000,
        hospitalBenefit: 150000,
        chronicMedication: 50000,
        schemeRateGap: 25000,
        baseCopayment: 25000,
    },
    'imaging-diagnostics': {
        totalConditionCost: 25000,
        pmbCoverage: 8000,
        hospitalBenefit: 5000,
        chronicMedication: 0,
        schemeRateGap: 4000,
        baseCopayment: 8000,
    },
    'general-surgery': {
        totalConditionCost: 55000,
        pmbCoverage: 30000,
        hospitalBenefit: 15000,
        chronicMedication: 0,
        schemeRateGap: 4000,
        baseCopayment: 6000,
    },
};

export const PricingEngine = {

    // 1. Existing Calculator
    calculateProfile: (
        contribution: Contribution,
        members: { main: number; adult: number; child: number },
        income: number
    ): FinancialProfile => {
        let rates = { main: 0, adult: 0, child: 0 };

        if (contribution.pricing_model === 'Fixed') {
            rates = contribution.pricing_matrix as FixedPricing;
        } else if (contribution.pricing_model === 'Income_Banded') {
            const bands = contribution.pricing_matrix as IncomeBand[];
            const activeBand = bands.find((band) =>
                income >= band.min && (band.max === null || band.max === 0 || income <= band.max)
            ) || bands[bands.length - 1];
            rates = activeBand;
        }

        const monthlyPremium =
            (members.main * rates.main) +
            (members.adult * rates.adult) +
            (members.child * rates.child);

        const hasSavings = !!(contribution.msa_structure && contribution.msa_structure.type !== 'None');
        let annualAllocation = 0;

        if (hasSavings && contribution.msa_structure) {
            if (contribution.msa_structure.type === 'Percentage') {
                const val = typeof contribution.msa_structure.value === 'number' ? contribution.msa_structure.value : parseFloat(contribution.msa_structure.value.toString());
                annualAllocation = (monthlyPremium * (val / 100)) * 12;
            } else if (contribution.msa_structure.type === 'Fixed') {
                if (typeof contribution.msa_structure.value === 'number') {
                    annualAllocation = contribution.msa_structure.value;
                }
            }
        }

        return {
            monthlyPremium,
            savings: { isPooled: hasSavings, annualAllocation }
        };
    },

    // 2. The Consideration Set Selector
    selectConsiderationSet: (
        allPlans: Plan[],
        persona: Persona,
        excludedIds: string[] = []
    ): Plan[] => {
        if (!persona.actuarial_logic) return [];

        const { target_plan_id, brand_lock } = persona.actuarial_logic;

        let allowedScheme = brand_lock;

        if (!allowedScheme) {
            const slug = persona.slug.toLowerCase();
            if (slug.includes('discovery')) allowedScheme = 'Discovery';
            else if (slug.includes('bestmed')) allowedScheme = 'Bestmed';
            else if (slug.includes('bonitas')) allowedScheme = 'Bonitas';
        }

        let candidates = allPlans.filter(p => {
            if (excludedIds.includes(p.id)) return false;
            if (allowedScheme) {
                return p.identity.scheme_name.toLowerCase().includes(allowedScheme.toLowerCase());
            }
            return true;
        });

        const originalTarget = allPlans.find(p => p.id === target_plan_id);
        const referencePrice = originalTarget ? originalTarget.price : 2000;

        candidates.sort((a, b) =>
            Math.abs(a.price - referencePrice) - Math.abs(b.price - referencePrice)
        );

        return candidates.slice(0, 3);
    },

    // 3. NEW: Calculate Total Cost of Care for a condition + plan
    calculateTCO: (
        conditionSlug: ConditionSlug,
        planId: string,
        planName: string,
        schemeName: string,
        annualPremium: number,
        msaAllocation: number = 0,
        planCopaymentModifier: number = 1.0 // Plan-specific modifier (e.g., 0.8 for better plans)
    ): TCOCalculationResult => {
        const conditionDef = CONDITIONS[conditionSlug];
        const costEstimates = CONDITION_COST_ESTIMATES[conditionSlug];

        // Apply plan-specific modifiers
        const adjustedCopayment = costEstimates.baseCopayment * planCopaymentModifier;
        const adjustedGap = costEstimates.schemeRateGap * planCopaymentModifier;

        // Calculate out-of-pocket
        const conditionSpecificOOP = adjustedCopayment + adjustedGap;

        // TCO Formula: Annual Premium + OOP - MSA
        const totalCostOfCare = annualPremium + conditionSpecificOOP - msaAllocation;

        // Calculate final liability from waterfall
        const totalCovered = costEstimates.pmbCoverage + costEstimates.hospitalBenefit + costEstimates.chronicMedication;
        const finalMemberLiability = costEstimates.totalConditionCost - totalCovered + adjustedGap + adjustedCopayment;

        return {
            conditionBasket: {
                id: conditionSlug,
                conditionSlug,
                conditionName: conditionDef.label,
                description: conditionDef.description,
                benefitYear: new Date().getFullYear(),
                pmbProcedures: [],
                chronicMedications: [],
                auxiliaryCare: [],
                estimatedAnnualHospitalizationCost: costEstimates.hospitalBenefit,
                estimatedAnnualMedicationCost: costEstimates.chronicMedication,
                estimatedAnnualAuxiliaryCost: 0,
                get totalEstimatedAnnualCost() {
                    return costEstimates.totalConditionCost;
                },
                seoKeywords: conditionDef.keywords,
                relatedConditions: [],
                sources: [{ label: 'Council for Medical Schemes Official Benefit Rules' }],
            },
            planId,
            planName,
            schemeName,
            annualPremium,
            conditionSpecificOOP,
            msaBenefitAllocations: msaAllocation,
            totalCostOfCare,
            liabilityWaterfall: {
                totalConditionCost: costEstimates.totalConditionCost,
                pmbCoverage: costEstimates.pmbCoverage,
                schemeRateGaps: adjustedGap,
                copayments: adjustedCopayment,
                finalMemberLiability,
            },
            actuarialLogic: `${schemeName} ${planName} features a Medical Savings Account (MSA) structure that provides upfront liquidity for day-to-day expenses. For ${conditionDef.label}, the plan offsets specialty co-payments through strong PMB coverage and CDL benefits.`,
            regulatoryCitations: ['Council for Medical Schemes Official Benefit Rules'],
        };
    },

    // 4. NEW: Compare two plans for a condition
    comparePlans: (
        conditionSlug: ConditionSlug,
        planA: { id: string; name: string; scheme: string; premium: number; msa: number; modifier: number },
        planB: { id: string; name: string; scheme: string; premium: number; msa: number; modifier: number }
    ) => {
        const tcoA = PricingEngine.calculateTCO(
            conditionSlug,
            planA.id,
            planA.name,
            planA.scheme,
            planA.premium,
            planA.msa,
            planA.modifier
        );

        const tcoB = PricingEngine.calculateTCO(
            conditionSlug,
            planB.id,
            planB.name,
            planB.scheme,
            planB.premium,
            planB.msa,
            planB.modifier
        );

        const winner = tcoA.totalCostOfCare < tcoB.totalCostOfCare ? 'A' : 'B';
        const savings = Math.abs(tcoA.totalCostOfCare - tcoB.totalCostOfCare);

        return {
            conditionSlug,
            conditionName: CONDITIONS[conditionSlug].label,
            planA: tcoA,
            planB: tcoB,
            winnerPlanId: winner === 'A' ? planA.id : planB.id,
            potentialAnnualSavings: savings,
        };
    },

    // 5. Get condition cost estimates (for UI)
    getConditionCostEstimate: (conditionSlug: ConditionSlug) => {
        return CONDITION_COST_ESTIMATES[conditionSlug] || CONDITION_COST_ESTIMATES['general-surgery'];
    },
};

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        maximumFractionDigits: 0,
    }).format(amount);
};