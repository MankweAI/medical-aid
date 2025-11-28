import { Plan, FamilyComposition, IncomeBand, FixedPricing } from './types';

/**
 * Calculates the total monthly premium based on Income and Family Size.
 * Handles both "Fixed" and "Income Banded" pricing models.
 */
export function calculateMonthlyPremium(
    plan: Plan,
    income: number,
    family: FamilyComposition
): number {
    // 1. Get the primary contribution structure (usually the first one for 2026)
    const contribution = plan.contributions[0];
    if (!contribution) return 0;

    let rates = { main: 0, adult: 0, child: 0 };

    // 2. Resolve Rates based on Model
    if (contribution.pricing_model === 'Fixed') {
        rates = contribution.pricing_matrix as FixedPricing;
    }
    else if (contribution.pricing_model === 'Income_Banded') {
        const bands = contribution.pricing_matrix as IncomeBand[];
        // Find band where income fits (fallback to highest if over max)
        const activeBand = bands.find(b => income >= b.min && income <= b.max) || bands[bands.length - 1];
        rates = activeBand;
    }

    // 3. Calculate Total
    return (
        (family.main * rates.main) +
        (family.adults * rates.adult) +
        (family.children * rates.child)
    );
}

/**
 * Generates the "Verdict" (Green/Orange Status) for the Smart Feed.
 * Compares user needs against Plan features.
 */
export function getVerdict(plan: Plan, need: string, income: number): { text: string; type: 'good' | 'warning' | 'neutral' } {
    // 1. Budget Warning (Simplistic Rule: Don't spend > 15% of income)
    const premium = calculateMonthlyPremium(plan, income, { main: 1, adults: 0, children: 0 });
    if (premium > (income * 0.15)) {
        return { text: 'Exceeds recommended 15% of income', type: 'warning' };
    }

    // 2. Scenario Matching
    if (need === 'maternity') {
        if (plan.type === 'Hospital Plan' && !plan.has_savings_account) {
            return { text: 'No day-to-day cover for gynae visits', type: 'warning' };
        }
        return { text: 'Good Hospital Cover for Birth', type: 'good' };
    }

    if (need === 'chronic') {
        if (plan.network_restriction === 'State') {
            return { text: 'Meds restricted to State Hospitals', type: 'warning' };
        }
        return { text: 'Includes Chronic Medication Benefit', type: 'good' };
    }

    // 3. Default Verdicts based on Plan Type
    if (plan.network_restriction === 'Network') {
        return { text: 'Network Hospitals Only', type: 'neutral' };
    }

    return { text: 'Comprehensive Cover', type: 'good' };
}

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        maximumFractionDigits: 0,
    }).format(amount);
};