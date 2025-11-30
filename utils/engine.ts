import { Plan, FamilyComposition, IncomeBand, FixedPricing, Contribution } from './types';

// --- Existing Logic ---

export function calculateMonthlyPremium(
    plan: Plan,
    income: number,
    family: FamilyComposition
): number {
    const contribution = plan.contributions[0];
    if (!contribution) return 0;

    // Delegate to the new Engine logic for consistency
    // Fix: Map FamilyComposition (plural) to PricingEngine (singular)
    const profile = PricingEngine.calculateProfile(
        contribution,
        {
            main: family.main,
            adult: family.adults,
            child: family.children
        },
        income
    );
    return profile.monthlyPremium;
}

export function getVerdict(plan: Plan, need: string, income: number): { text: string; type: 'good' | 'warning' | 'neutral' } {
    const premium = calculateMonthlyPremium(plan, income, { main: 1, adults: 0, children: 0 });

    // 1. Budget Check
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
        if (plan.network_restriction === 'Regional') { // Assuming 'State' mapped to Regional or similar restrictions
            return { text: 'Restricted Provider Network', type: 'warning' };
        }
        return { text: 'Includes Chronic Medication Benefit', type: 'good' };
    }

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

// --- NEW: PricingEngine for Dashboard ---

export const PricingEngine = {
    calculateProfile: (
        contribution: Contribution,
        members: { main: number; adult: number; child: number },
        income: number
    ) => {
        let rates = { main: 0, adult: 0, child: 0 };

        // 1. Determine Rates
        if (contribution.pricing_model === 'Fixed') {
            rates = contribution.pricing_matrix as FixedPricing;
        } else if (contribution.pricing_model === 'Income_Banded') {
            const bands = contribution.pricing_matrix as IncomeBand[];
            const activeBand = bands.find((band) => income >= band.min && income <= band.max) || bands[bands.length - 1];
            rates = activeBand;
        }

        // 2. Calculate Premium
        const monthlyPremium =
            (members.main * rates.main) +
            (members.adult * rates.adult) +
            (members.child * rates.child);

        // 3. Calculate Savings (MSA)
        let annualAllocation = 0;
        const isPooled = !!(contribution.msa_structure && contribution.msa_structure.type !== 'None');

        if (contribution.msa_structure?.type === 'Percentage') {
            // Usually 25% of premium x 12
            annualAllocation = (monthlyPremium * (contribution.msa_structure.value / 100)) * 12;
        } else if (contribution.msa_structure?.type === 'Fixed') {
            // Fixed amount logic would depend on member size, simplified here to raw value
            // In reality, fixed MSA is often per member type. Assuming flat value for MVP if simplified.
            annualAllocation = contribution.msa_structure.value;
        }

        return {
            monthlyPremium,
            savings: {
                isPooled,
                annualAllocation
            }
        };
    }
};