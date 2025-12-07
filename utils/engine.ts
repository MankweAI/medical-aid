import { Plan, FamilyComposition } from './types';

export const PricingEngine = {
    /**
     * Calculates the monthly premium and annual savings based on the plan's pricing model
     * (Fixed or Income Banded) and the user's family composition.
     */
    calculateProfile: (plan: Plan, members: FamilyComposition, householdIncome: number) => {
        let selectedContribution = null;

        // 1. DETERMINE THE APPLICABLE PRICING BAND
        if (plan.pricing_engine.model === 'Income_Banded') {
            // Find the band that encompasses the household income
            selectedContribution = plan.pricing_engine.contributions.find(band => {
                const min = band.income_band?.min || 0;
                const max = band.income_band?.max || Infinity;
                return householdIncome >= min && householdIncome <= max;
            });

            // Fallback: If income exceeds all defined bands, usually the highest band applies
            if (!selectedContribution && plan.pricing_engine.contributions.length > 0) {
                selectedContribution = plan.pricing_engine.contributions[plan.pricing_engine.contributions.length - 1];
            }
        } else {
            // Fixed pricing models typically have a single contribution entry
            selectedContribution = plan.pricing_engine.contributions[0];
        }

        // Safety check if data is malformed
        if (!selectedContribution) {
            return {
                monthlyPremium: 0,
                savings: { annualAllocation: 0, isPooled: false }
            };
        }

        // 2. CALCULATE MONTHLY PREMIUM
        // Note: Plan data uses singular keys (adult, child), State uses plural (adults, children)
        const rates = selectedContribution.premiums;

        const mainMemberCost = (members.main || 0) * rates.main;
        const adultDependantCost = (members.adults || 0) * rates.adult;
        const childDependantCost = (members.children || 0) * rates.child;

        const monthlyPremium = mainMemberCost + adultDependantCost + childDependantCost;

        // 3. CALCULATE MEDICAL SAVINGS ACCOUNT (MSA)
        const savingsConfig = plan.pricing_engine.savings_component;
        let annualSavings = 0;

        if (savingsConfig.has_savings && savingsConfig.annual_allocation_calc) {
            const calculation = savingsConfig.annual_allocation_calc;

            if (typeof calculation === 'string' && calculation.includes('%')) {
                // Percentage based (e.g., "25%") of the TOTAL monthly contribution * 12
                const percentage = parseFloat(calculation) / 100;
                annualSavings = (monthlyPremium * 12) * percentage;
            } else if (typeof calculation === 'number') {
                // Fixed amount (e.g., 5000) - Assuming this is a total annual allocation per family for simplicity
                // In a real scenario, this might need to be multiplied by member count depending on scheme rules
                annualSavings = calculation;
            }
        }

        return {
            monthlyPremium,
            savings: {
                annualAllocation: Math.round(annualSavings),
                isPooled: annualSavings > 0
            }
        };
    }
};