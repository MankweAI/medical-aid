import { Plan } from './types';

export type PersonaSlug = string;

export interface UserProfile {
    slug: PersonaSlug;
    code: string;

    meta: {
        title: string;
        description: string;
        category: string;
    };

    defaults: {
        income: number;
        family_composition: { main: number; adult: number; child: number };
        age?: number; // Added for contextual risk
    };

    search_profile: {
        network_tolerance: 'Any' | 'Network' | 'Coastal' | 'State' | null;
        min_savings_allocation: number;
        chronic_needs: 'None' | 'Basic' | 'Comprehensive' | 'Specialized' | null;
        required_benefits: string[];
        priority_tag: string | null;
    };

    actuarial_logic?: {
        target_plan_id: string;
        brand_lock?: 'Bestmed' | 'Discovery' | 'Bonitas' | 'Medihelp' | 'Momentum'; // <--- NEW
        mathematical_basis: string;
        primary_risk_warning: string;
    };
}

export interface Risk {
    level: 'HIGH' | 'MEDIUM' | 'LOW';
    warning: string;
    details: string;
}

export type Persona = UserProfile;



export interface Risk {
    level: 'HIGH' | 'MEDIUM' | 'LOW';
    warning: string;
    details: string;
}



/**
 * THE ACTUARIAL JUDGE
 * Compares a Plan (Supply) against a Persona (Demand)
 * Returns a list of risks/warnings.
 */
export const validatePlan = (plan: Plan, persona: Persona): Risk[] => {
    const risks: Risk[] = [];
    if (!persona.search_profile) return risks;
    const { network_tolerance, min_savings_allocation, chronic_needs, required_benefits } = persona.search_profile;

    // 1. NETWORK MISMATCH
    if (network_tolerance === 'Any' && plan.network_restriction !== 'Any') {
        risks.push({
            level: 'MEDIUM',
            warning: 'Network Restriction',
            details: `You requested 'Any Hospital' access, but this plan restricts you to the ${plan.network_restriction} list.`
        });
    }
    // If user tolerates 'Network' but plan is 'State' (e.g. KeyCare Start Chronic)
    if (network_tolerance !== 'State' && plan.network_restriction === 'State') {
        risks.push({
            level: 'HIGH',
            warning: 'State Facility Access',
            details: 'Chronic medication and certain treatments are restricted to State facilities only, despite private hospital cover.'
        });
    }

    // 2. SAVINGS DEFICIT (The "Liquidity" Risk)
    if (min_savings_allocation > 0) {
        const annualSavings = plan.savings_annual || 0;
        // Calculate monthly equivalent for comparison
        const monthlySavings = annualSavings / 12;

        if (monthlySavings < min_savings_allocation * 0.5) {
            // Severe deficit (< 50% of need)
            risks.push({
                level: 'HIGH',
                warning: 'Insufficient Savings',
                details: `Your profile suggests high day-to-day needs. This plan offers R${Math.round(monthlySavings)} pm, which is likely to run out before June.`
            });
        } else if (monthlySavings < min_savings_allocation) {
            // Mild deficit
            risks.push({
                level: 'LOW',
                warning: 'Low Savings Buffer',
                details: `Savings allocation (R${Math.round(monthlySavings)} pm) is lower than your target. You may face self-funding gaps late in the year.`
            });
        }
    }

    // 3. CHRONIC FORMULARY GAP (The "Clinical" Risk)
    if (chronic_needs === 'Comprehensive' || chronic_needs === 'Specialized') {
        const isBasicPlan = plan.identity.plan_type === 'Hospital Plan' || plan.identity.plan_series === 'Beat';

        if (isBasicPlan) {
            risks.push({
                level: 'MEDIUM',
                warning: 'Basic Chronic Cover',
                details: 'This plan covers CDL (27 PMB conditions) only. It may not cover biological drugs or non-formulary brands required for complex conditions.'
            });
        }
    }

    // 4. BENEFIT BASKET CHECKS (The "Specific" Risk)
    if (required_benefits.includes('maternity')) {
        if (plan.defined_baskets.maternity.antenatal_consults === 0) {
            risks.push({
                level: 'HIGH',
                warning: 'No Maternity Basket',
                details: 'Pregnancy visits are not funded from risk. You will pay for all gynae visits from your own pocket or savings.'
            });
        }
    }

    // 5. RED FLAGS
    if (plan.red_flag) {
        risks.push({
            level: 'MEDIUM',
            warning: 'Plan Rule Warning',
            details: plan.red_flag
        });
    }

    return risks;
};