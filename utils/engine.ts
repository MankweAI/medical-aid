import { PlanProduct, Currency } from '@/types/schema';

// --- TYPES ---
interface FamilyProfile {
    main: number;
    adult: number;
    child: number;
}

interface FinancialOutcome {
    monthlyPremium: Currency;
    annualPremium: Currency;
    savings: {
        allocation: Currency; // The Rand value available upfront
        isPooled: boolean;
    };
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

// --- THE ENGINE ---

export const PricingEngine = {

    /**
     * Calculates the exact premium based on Income Bands + Family Size
     */
    calculatePremium: (plan: PlanProduct, family: FamilyProfile, income: number): number => {
        let rates = { main: 0, adult: 0, child: 0 };

        // A. Handle Income Bands (KeyCare / BonCap)
        if (plan.pricing_model === 'Income_Banded' && plan.premiums.bands) {
            const activeBand = plan.premiums.bands.find(
                band => income >= band.min_income && income <= band.max_income
            );

            // Fallback: Use the highest band if income exceeds all limits
            if (!activeBand) {
                const sortedBands = [...plan.premiums.bands].sort((a, b) => b.max_income - a.max_income);
                rates = sortedBands[0];
            } else {
                rates = activeBand;
            }
        }
        // B. Handle Fixed Pricing (Classic / Smart)
        else {
            rates = {
                main: plan.premiums.main || 0,
                adult: plan.premiums.adult || 0,
                child: plan.premiums.child || 0
            };
        }

        // C. Calculate Totals (Apply Child Caps if present)
        const childCount = plan.premiums.max_child_rate
            ? Math.min(family.child, plan.premiums.max_child_rate)
            : family.child;

        return (family.main * rates.main) +
            (family.adult * rates.adult) +
            (childCount * rates.child);
    },

    /**
     * Generates the Full Financial Profile (MSA + Risk)
     */
    calculateProfile: (plan: PlanProduct, family: FamilyProfile, income: number): FinancialOutcome => {
        const monthlyPremium = PricingEngine.calculatePremium(plan, family, income);
        const annualPremium = monthlyPremium * 12;

        // D. Calculate Medical Savings Account (MSA)
        let msaAllocation = 0;

        if (plan.savings_account.type === 'Fixed') {
            // Fixed amount (e.g. Discovery Classic Saver fixed values)
            // Simplified: Assuming fixed value provided is for Main Member for MVP
            // Production: Needs full fixed matrix
            msaAllocation = plan.savings_account.value;
        }
        else if (plan.savings_account.type === 'Percentage') {
            // Percentage of Risk Contribution (Usually 25% of total premium)
            // Note: Accurate actuarial calc uses "Risk Portion", but Total * % is close enough for MVP estimation
            msaAllocation = (annualPremium * (plan.savings_account.value / 100));
        }

        return {
            monthlyPremium,
            annualPremium,
            savings: {
                allocation: Math.round(msaAllocation),
                isPooled: msaAllocation > 0
            },
            riskLevel: PricingEngine.assessRisk(plan, income)
        };
    },

    /**
     * Determines the "Traffic Light" Risk Score
     */
    assessRisk: (plan: PlanProduct, income: number): 'LOW' | 'MEDIUM' | 'HIGH' => {
        // High Risk Flags
        if (plan.hard_limits.chronic_provider === 'State') return 'HIGH';
        if (plan.network_geofence === 'Coastal' || plan.network_geofence === 'Regional_Hub') return 'MEDIUM';

        // Affordability Risk (If premium > 15% of income)
        // Note: Needs family size context in production, simple check here
        // const premium = PricingEngine.calculatePremium(plan, {main:1, adult:0, child:0}, income);
        // if (premium > (income * 0.15)) return 'HIGH';

        return 'LOW';
    }
};

// --- HELPER ---
export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        maximumFractionDigits: 0,
    }).format(amount);
};