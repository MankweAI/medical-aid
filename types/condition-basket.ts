/**
 * Condition Basket Types
 * 
 * Data model for grouping procedures into "Total Cost of Care" bundles.
 * This is the core data structure for the Condition-Specific Actuarial Optimization Engine.
 * 
 * @version 2026
 */

import { ConditionSlug } from '@/utils/condition-mapping';

// ============================================================================
// MEDICATION TYPES (for Chronic Disease List)
// ============================================================================

export interface ChronicMedication {
    /** NAPPI code or unique identifier */
    id: string;
    /** Drug name */
    name: string;
    /** Generic/active ingredient */
    activeIngredient: string;
    /** Monthly formulary cost (scheme rate) */
    monthlyFormularyCost: number;
    /** Whether on CDL (Chronic Disease List) */
    isCDL: boolean;
    /** Frequency (e.g., "Once daily", "Twice daily") */
    frequency: string;
}

// ============================================================================
// AUXILIARY CARE TYPES
// ============================================================================

export interface AuxiliaryCareService {
    /** Service identifier */
    id: string;
    /** Service name (e.g., "HbA1c Test", "Specialist Consultation") */
    name: string;
    /** Service type */
    type: 'pathology' | 'radiology' | 'consultation' | 'therapy' | 'monitoring';
    /** Typical annual frequency for this condition */
    annualFrequency: number;
    /** Cost per service */
    costPerService: number;
    /** Whether covered under PMB */
    isPMBCovered: boolean;
}

// ============================================================================
// PMB PROCEDURE TYPES
// ============================================================================

export interface PMBProcedure {
    /** Procedure identifier */
    id: string;
    /** Procedure name */
    name: string;
    /** CPT code if applicable */
    cptCode?: string;
    /** ICD-10 code if applicable */
    icd10Code?: string;
    /** Base cost estimate */
    baseCostEstimate: number;
    /** Typical co-payment (scheme-specific, varies) */
    typicalCopayment: number;
    /** Whether mandatory under PMB */
    isPMBMandatory: boolean;
    /** Procedure type */
    procedureType: 'hospitalization' | 'surgical' | 'diagnostic' | 'therapeutic';
}

// ============================================================================
// CONDITION BASKET (MAIN TYPE)
// ============================================================================

/**
 * ConditionBasket groups all care costs for a specific medical condition.
 * This is the fundamental data unit for the TCO (Total Cost of Care) Engine.
 */
export interface ConditionBasket {
    /** Unique identifier for this basket */
    id: string;

    /** Condition slug (matches ConditionSlug type) */
    conditionSlug: ConditionSlug;

    /** Human-readable condition name */
    conditionName: string;

    /** Condition description for SEO/UI */
    description: string;

    /** Year this basket data applies to */
    benefitYear: number;

    // =========================================================================
    // CARE COMPONENTS
    // =========================================================================

    /**
     * Mandatory PMB Procedures
     * Hospitalization or surgical events required by law (Prescribed Minimum Benefits).
     */
    pmbProcedures: PMBProcedure[];

    /**
     * Chronic Medication (CDL)
     * Monthly formulary costs for the condition.
     */
    chronicMedications: ChronicMedication[];

    /**
     * Auxiliary Care
     * Specialist consultations, pathology tests, monitoring (e.g., HbA1c for Diabetes).
     */
    auxiliaryCare: AuxiliaryCareService[];

    // =========================================================================
    // COST AGGREGATIONS
    // =========================================================================

    /**
     * Estimated annual hospitalization cost for this condition.
     */
    estimatedAnnualHospitalizationCost: number;

    /**
     * Estimated annual chronic medication cost.
     */
    estimatedAnnualMedicationCost: number;

    /**
     * Estimated annual auxiliary care cost.
     */
    estimatedAnnualAuxiliaryCost: number;

    /**
     * Total estimated annual cost (sum of all components).
     */
    get totalEstimatedAnnualCost(): number;

    // =========================================================================
    // METADATA
    // =========================================================================

    /**
     * SEO keywords for this condition basket.
     */
    seoKeywords: string[];

    /**
     * Related condition slugs for interlinking.
     */
    relatedConditions: ConditionSlug[];

    /**
     * Source citations for regulatory compliance.
     */
    sources: {
        label: string;
        url?: string;
    }[];
}

// ============================================================================
// CONDITION BASKET FACTORY
// ============================================================================

/**
 * Creates a ConditionBasket with calculated totals.
 */
export function createConditionBasket(
    data: Omit<ConditionBasket, 'totalEstimatedAnnualCost'>
): ConditionBasket {
    return {
        ...data,
        get totalEstimatedAnnualCost() {
            return (
                this.estimatedAnnualHospitalizationCost +
                this.estimatedAnnualMedicationCost +
                this.estimatedAnnualAuxiliaryCost
            );
        },
    };
}

// ============================================================================
// TCO CALCULATION RESULT
// ============================================================================

/**
 * Result of a Total Cost of Care calculation for a specific plan + condition.
 */
export interface TCOCalculationResult {
    /** The condition basket this calculation is for */
    conditionBasket: ConditionBasket;

    /** The plan ID this calculation is for */
    planId: string;

    /** Plan name for display */
    planName: string;

    /** Scheme name (e.g., "Discovery Health", "Bestmed") */
    schemeName: string;

    // =========================================================================
    // TCO FORMULA COMPONENTS
    // =========================================================================

    /**
     * Annual Premium for this plan.
     */
    annualPremium: number;

    /**
     * Condition-Specific Out-of-Pocket Liability.
     * Sum of co-payments, deductibles, and gaps for this condition.
     */
    conditionSpecificOOP: number;

    /**
     * MSA/Benefit Allocations that offset costs.
     */
    msaBenefitAllocations: number;

    /**
     * Total Cost of Care (TCO) = Annual Premium + OOP - MSA Allocations
     */
    totalCostOfCare: number;

    // =========================================================================
    // LIABILITY WATERFALL
    // =========================================================================

    /**
     * Breakdown of costs showing the "drip" from total to final liability.
     */
    liabilityWaterfall: {
        /** Total estimated cost for the condition */
        totalConditionCost: number;
        /** Amount covered under PMB */
        pmbCoverage: number;
        /** Scheme rate gaps (difference between charged and scheme rate) */
        schemeRateGaps: number;
        /** Co-payments required */
        copayments: number;
        /** Final member liability */
        finalMemberLiability: number;
    };

    // =========================================================================
    // ACTUARIAL METADATA
    // =========================================================================

    /**
     * Actuarial logic explanation for this plan's cost structure.
     */
    actuarialLogic: string;

    /**
     * Efficiency ranking compared to other plans (1 = most efficient).
     */
    efficiencyRank?: number;

    /**
     * Regulatory citations for this calculation.
     */
    regulatoryCitations: string[];
}

// ============================================================================
// PLAN COMPARISON TYPES
// ============================================================================

/**
 * Comparison of two plans for a specific condition.
 */
export interface PlanComparisonResult {
    /** Condition being compared */
    conditionSlug: ConditionSlug;
    conditionName: string;

    /** Plan A details */
    planA: TCOCalculationResult;

    /** Plan B details */
    planB: TCOCalculationResult;

    /** Winner based on lowest TCO */
    winnerPlanId: string;

    /** Savings if choosing winner over loser */
    potentialAnnualSavings: number;

    /** Key differentiators */
    keyDifferentiators: {
        factor: string;
        planAValue: string | number;
        planBValue: string | number;
        advantage: 'A' | 'B' | 'neutral';
    }[];

    /** Generated comparison narrative */
    comparisonNarrative: string;
}
