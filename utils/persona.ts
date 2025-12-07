import { Plan, FamilyComposition } from './types';

export type PersonaSlug = string;

export interface Persona {
    slug: PersonaSlug;
    code: string;
    meta: {
        title: string;
        description: string;
        category: string;
    };
    defaults: {
        income: number;
        family_composition: FamilyComposition;
    };
    search_profile: {
        network_tolerance: 'Any' | 'Network' | 'Coastal' | 'State';
        min_savings_allocation: number;
        chronic_needs: 'None' | 'Basic' | 'Comprehensive';
        required_benefits: string[];
        priority_tag: string;
    };
    actuarial_logic: {
        target_plan_id: string;
        mathematical_basis: string;
        primary_risk_warning: string;
        ranking_weight_penalties?: {
            out_of_network_usage?: number;
            savings_deficit?: number;
        };
    };
}

export interface Risk {
    level: 'HIGH' | 'MEDIUM' | 'LOW';
    warning: string;
    details: string;
}

// 3. Validation Logic (Client/Server Shared)
export const validatePlan = (plan: Plan, persona: Persona): Risk[] => {
    const risks: Risk[] = [];

    // Guard against missing data during hydration/loading
    if (!plan || !persona) return risks;

    const { network_tolerance, chronic_needs } = persona.search_profile;
    const planNetwork = plan.network_rules.restriction_level;

    // Logic A: Network Mismatch
    // If user needs 'Any' but plan is 'Network' or 'State'
    if (network_tolerance === 'Any' && (planNetwork.includes('Network') || planNetwork.includes('State'))) {
        risks.push({
            level: 'MEDIUM',
            warning: 'Restricted Network',
            details: `This plan limits you to ${planNetwork} hospitals. Non-network use has penalties.`
        });
    }

    // Logic B: Chronic State Trap
    // If user needs Comprehensive chronic but provider is State
    if (chronic_needs === 'Comprehensive' && plan.network_rules.chronic_provider.includes('State')) {
        risks.push({
            level: 'HIGH',
            warning: 'State Chronic Meds',
            details: 'You must collect chronic medication from State Clinics, despite having private hospital cover.'
        });
    }

    // Logic C: Coastal Warning
    // If user specifically wants Coastal but plan is generic Network (efficiency check)
    if (network_tolerance === 'Coastal' && !planNetwork.includes('Coastal')) {
        // Optional: Could add a 'LOW' risk or tip here if they are overpaying for 'Any' network
    }

    // Logic D: Persona Specific Risk
    // If this plan matches the "Target Plan" for the persona, highlight the specific actuarial risk
    if (plan.id === persona.actuarial_logic.target_plan_id) {
        risks.push({
            level: 'MEDIUM', // Usually a trade-off warning
            warning: 'Strategy Trade-off',
            details: persona.actuarial_logic.primary_risk_warning
        });
    }

    return risks;
};