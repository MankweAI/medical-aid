import { Plan, Contribution, IncomeBand, FixedPricing } from './types';

export interface FinancialProfile {
    monthlyPremium: number;
    savings: {
        isPooled: boolean;
        annualAllocation: number;
    };
}

export interface CliffAnalysis {
    hasCliff: boolean;
    distanceToCliff: number;
    premiumJump: number;
    nextBandLimit: number;
}

export const PricingEngine = {

    // 1. CALCULATE MONTHLY COST & SAVINGS
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
            // Match income to band. If max is 0, it means "and above".
            const activeBand = bands.find((band) =>
                income >= band.min && (band.max === 0 || income <= band.max)
            ) || bands[bands.length - 1];

            rates = activeBand;
        }

        const monthlyPremium =
            (members.main * rates.main) +
            (members.adult * rates.adult) +
            (members.child * rates.child);

        // Calculate Savings Account (MSA)
        let annualAllocation = 0;

        // FIX: Use !! to force strict boolean (converts undefined to false)
        const hasSavings = !!(contribution.msa_structure && contribution.msa_structure.type !== 'None');

        if (hasSavings && contribution.msa_structure) {
            if (contribution.msa_structure.type === 'Percentage') {
                // Standard: (Premium * %) * 12 months
                annualAllocation = (monthlyPremium * (contribution.msa_structure.value / 100)) * 12;
            } else if (contribution.msa_structure.type === 'Fixed') {
                // Fixed amount (Simplified: usually varies by family size, using flat for now)
                annualAllocation = contribution.msa_structure.value;
            }
        }

        return {
            monthlyPremium,
            savings: {
                isPooled: hasSavings,
                annualAllocation
            }
        };
    },

    // 2. DETECT INCOME CLIFF RISKS (For Rhythm/KeyCare)
    analyzeIncomeCliffs: (plan: Plan, income: number, members: { main: 1, adult: number, child: number }): CliffAnalysis | null => {
        const contribution = plan.contributions[0];
        if (contribution.pricing_model !== 'Income_Banded') return null;

        const bands = contribution.pricing_matrix as IncomeBand[];
        const currentBandIndex = bands.findIndex((b) => income >= b.min && (b.max === 0 || income <= b.max));

        if (currentBandIndex === -1 || currentBandIndex === bands.length - 1) return null;

        const currentBand = bands[currentBandIndex];
        const nextBand = bands[currentBandIndex + 1];

        // Check if user is within R2,000 of the next band
        const distance = currentBand.max - income;

        if (distance > 0 && distance <= 2000) {
            // Calculate Premium Jump for the whole family
            const currentCost = (members.main * currentBand.main) + (members.adult * currentBand.adult) + (members.child * currentBand.child);
            const nextCost = (members.main * nextBand.main) + (members.adult * nextBand.adult) + (members.child * nextBand.child);

            return {
                hasCliff: true,
                distanceToCliff: distance,
                premiumJump: nextCost - currentCost,
                nextBandLimit: currentBand.max
            };
        }

        return null;
    }
};

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        maximumFractionDigits: 0,
    }).format(amount);
};