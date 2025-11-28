// Define Types
export type PersonaSlug = 'family-planner' | 'chronic-warrior' | 'budget-conscious' | 'digital-native';

export interface UserProfile {
    persona: PersonaSlug;
    needs: {
        minSavings?: number;
        requiredBenefits: string[];
        networkTolerance: 'Any' | 'Network' | 'State';
    };
}

export interface Risk {
    level: 'HIGH' | 'MEDIUM' | 'LOW';
    warning: string;
    details: string;
}

// Persona Definitions
export const PERSONAS = {
    'family-planner': {
        label: 'The Family Planner',
        title: 'Best Medical Aid for Pregnancy (2026)',
        description: 'Strategies that cover private birth and pediatric care.',
        defaultNeed: 'maternity',
        defaults: {
            minSavings: 5000,
            requiredBenefits: ['Maternity', 'Pediatrician'],
            networkTolerance: 'Network' as const
        }
    },
    'chronic-warrior': {
        label: 'The Chronic Warrior',
        title: 'Chronic Illness & Gap Cover',
        description: 'Plans optimized for high medicine usage and specialists.',
        defaultNeed: 'chronic',
        defaults: {
            minSavings: 10000,
            requiredBenefits: ['Chronic', 'Specialist'],
            networkTolerance: 'Any' as const
        }
    },
    'budget-conscious': {
        label: 'The Budget Conscious',
        title: 'Affordable Hospital Plans (Under R1,500)',
        description: 'Maximum value for minimum monthly premium.',
        defaultNeed: 'affordability',
        defaults: {
            minSavings: 0,
            requiredBenefits: ['Hospitalization'],
            networkTolerance: 'Network' as const
        }
    },
    'digital-native': {
        label: 'The Digital Native',
        title: 'App-Based Medical Aid',
        description: 'Plans with virtual care and active rewards.',
        defaultNeed: 'tech',
        defaults: {
            minSavings: 0,
            requiredBenefits: ['Emergency', 'Virtual Care'],
            networkTolerance: 'Network' as const
        }
    }
};

// The Engine
export const PersonaEngine = {
    getDefaultsForPersona: (slug: PersonaSlug) => {
        return PERSONAS[slug]?.defaults || PERSONAS['budget-conscious'].defaults;
    },

    getPersonaBySlug: (slug: string) => {
        return PERSONAS[slug as PersonaSlug] || null;
    },

    validatePlan: (planName: string, profile: UserProfile): Risk[] => {
        const risks: Risk[] = [];
        const planNameLower = planName.toLowerCase();

        // 1. Network Risk (Generic Logic for MVP)
        if (profile.needs.networkTolerance === 'Any' && (planNameLower.includes('network') || planNameLower.includes('delta') || planNameLower.includes('smart'))) {
            risks.push({
                level: 'MEDIUM',
                warning: 'Network Restriction',
                details: 'This plan restricts you to specific hospitals. Using a non-network hospital carries a penalty.'
            });
        }

        // 2. Savings Risk for Families
        if (profile.persona === 'family-planner' && !planNameLower.includes('saver') && !planNameLower.includes('comprehensive') && !planNameLower.includes('priority')) {
            risks.push({
                level: 'HIGH',
                warning: 'No Day-to-Day Savings',
                details: 'This appears to be a Hospital Plan. Pediatrician visits and GP consults will likely be out-of-pocket expenses.'
            });
        }

        // 3. Chronic Risk
        if (profile.persona === 'chronic-warrior' && (planNameLower.includes('core') || planNameLower.includes('essential'))) {
            risks.push({
                level: 'MEDIUM',
                warning: 'Limited Chronic Cover',
                details: 'Core/Essential plans typically have smaller formularies for chronic medication compared to Comprehensive plans.'
            });
        }

        return risks;
    }
};