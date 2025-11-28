export const PERSONAS = {
    'family-planner': {
        label: 'The Family Planner',
        title: 'Best Medical Aid for Pregnancy (2026)',
        description: 'Strategies that cover private birth and pediatric care.',
        defaultNeed: 'maternity'
    },
    'chronic-warrior': {
        label: 'The Chronic Warrior',
        title: 'Chronic Illness & Gap Cover',
        description: 'Plans optimized for high medicine usage and specialists.',
        defaultNeed: 'chronic'
    },
    'budget-conscious': {
        label: 'The Budget Conscious',
        title: 'Affordable Hospital Plans (Under R1,500)',
        description: 'Maximum value for minimum monthly premium.',
        defaultNeed: 'affordability'
    },
    'digital-native': {
        label: 'The Digital Native',
        title: 'App-Based Medical Aid',
        description: 'Plans with virtual care and active rewards.',
        defaultNeed: 'tech'
    }
};

export type PersonaSlug = keyof typeof PERSONAS;

export function getPersonaBySlug(slug: string) {
    return PERSONAS[slug as PersonaSlug] || null;
}

export function getAllPersonaSlugs() {
    return Object.keys(PERSONAS);
}
