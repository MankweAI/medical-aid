// utils/persona.ts
import { Plan } from './types';

export type PersonaSlug = string;

export interface UserProfile {
    slug: PersonaSlug;
    code: string;

    meta: {
        title: string;
        marketing_heading: string;
        description: string;
        category: string;
        // UPDATE: Synced with data/personas.ts
        strategic_intent?: 'Disaster_Cover_Only' | 'Specialist_Surgery_Funding' | 'Maximum_Savings_Liquidity' | 'MSA_Maximisation_Roll_Over' | 'Family_Cost_Leverage' | 'Risk_Management_Constraint' | 'Day_to_Day_Certainty' | 'Maximise_Subsidies' | 'Risk_Transfer_and_Day_to_Day' | 'Lifestyle_Rewards' | 'Defined_Benefit_Funding' | 'Hospital_Risk_Transfer' | 'Family_Disaster_Leverage' | 'Liquidity_Buffer' | 'Preventative_Maximisation' | 'Age_Optimized_Exclusion' | 'Maternity_Risk_Transfer' | 'Non_CDL_Partial_Funding' | 'High_Liquidity_Arbitrage' | 'Defined_Benefit_Cycling' | 'Diagnostic_Risk_Transfer' | 'High_Risk_Transfer' | 'Complex_Clinical_Funding' | 'Multi_Chronic_Management' | 'Maternity_Risk_Transfer_No_Network' | 'Maximum_Diagnostic_Funding' | 'Biologic_Bridge_Funding' | 'Disaster_Cover_Only_Liquidity' | 'Biologic_Risk_Transfer' | 'Enhanced_Maternity_Funding' | 'Specific_Defined_Dental_Funding' | 'Risk_Mitigation_CoPayment' | 'Defined_Specialist_Funding' | 'Risk_Exclusion_Acceptance' | 'Catastrophic_Risk_Transfer' | 'Mental_Health_Risk_Transfer' | 'Network_Compliance_Arbitrage' | 'High_Cost_Technology_Funding' | 'Specialist_Dental_Funding' | 'Maximum_Biological_Funding' | 'High_Chronic_Funding' | 'High_Cost_Surgical_Risk_Transfer' | 'Maximum_Mental_Health_Risk' | 'Savings_and_Risk_Hybrid' | 'High_Liquidity_and_Control' | 'Mental_Health_Risk_Transfer_Enhanced' | 'Minimum_Savings_Buffer' | 'Defined_Cancer_Risk_Transfer' | 'Cost_Reduced_Hospital_Transfer' | 'Internal_Device_Risk_Transfer' | 'Defined_Dental_Funding' | 'Strict_Budget_Management' | 'Maximum_Specialized_Drug_Funding' | 'Extreme_Cost_Constraint' | 'Liquidity_Aggressor' | 'Minimum_Maternity_Funding';
    };

    defaults: {
        income: number;
        family_composition: { main: number; adult: number; child: number };
        age?: number;
        location_zone?: 'Coastal' | 'Inland' | 'Any' | 'Specific Network Area' | 'Network Area' | 'Select Network Area';
    };

    search_profile: {
        // UPDATE: Synced with data/personas.ts
        network_tolerance: 'Any' | 'Network' | 'Coastal' | 'State' | 'Standard' | 'Strict Network' | 'Network for Chronic' | 'Network for Hospital/Chronic' | 'Full Choice' | 'Full Choice (Except Joint Replacement)' | 'Strict Network for Hospital/GP' | null;
        min_savings_allocation: number;
        chronic_needs: 'None' | 'Low' | 'Basic' | 'Comprehensive' | 'Moderate' | '7 Non-CDL Conditions' | 'Low Biologic Need' | 'Specialized' | 'PMB Only' | '5 Non-CDL Conditions' | '9 Non-CDL Conditions' | 'CDL Only' | 'CDL + Limited Biologic' | 'CDL + Depression' | 'Type 1 Diabetes' | '61 Conditions' | '32 Conditions' | '46 Conditions' | '45 Conditions' | null;
        required_benefits: string[];
        priority_tag: string | null;
    };

    actuarial_logic?: {
        target_plan_id: string;
        brand_lock?: string;
        mathematical_basis: string;
        primary_risk_warning: string;

        utilization_assumptions?: {
            gp_visits_frequency: 'Low' | 'Low (non-pregnancy related)' | 'Low (Self-funded)' | 'Low-Moderate' | 'Medium' | 'High' | 'High-Moderate' | 'Moderate' | 'High (multiple chronic scripts)' | 'High (due to child sickness)' | 'Moderate (non-pregnancy related)' | 'Moderate-High' | 'Very Low (rely on public sector/cash)' | 'Moderate (4-8 visits/year)' | 'Very High (maximizes unlimited benefit)' | 'High (unlimited benefit)' | 'High (unlimited network visits benefit)' | 'Zero (rely on emergency room benefit)' | 'Zero' | 'Moderate (must not exceed R2,330 limit)' | 'Moderate (relies on savings)' | 'Low-Moderate (relies on savings)' | 'Low (relies on 3 GP visits + unlimited virtual GP)' | 'High (compliance with nominated GP required)';
            chronic_script_consistency: number;
            break_even_point?: string;

        };

        inflection_risks?: {
            income_cliff_sensitivity: boolean;
            deductible_trigger_event?: string;
            benefit_cap_warning?: string;
        };
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