import { PERSONA_DB } from '@/data/personas';
import { PLAN_DB } from '@/data/plans';
import { Persona, PlanProduct } from '@/types/schema';

interface PersonaData {
    persona: Persona;
    targetPlan: PlanProduct;
    challengers: PlanProduct[];
}

/**
 * FETCH A PERSONA BY SLUG
 * -----------------------
 * Returns the Persona, its Target Plan, and 2 comparisons.
 */
export async function getPersonaData(slug: string): Promise<PersonaData | null> {
    // 1. Find the Persona
    const persona = PERSONA_DB.find(p => p.slug === slug);
    if (!persona) return null;

    // 2. Find the Target Plan
    const targetPlan = PLAN_DB.find(p => p.id === persona.target_plan_id);
    if (!targetPlan) {
        console.warn(`Missing Plan: ${persona.target_plan_id}`);
        return null;
    }

    // 3. Find Challengers (Same Series or Pricing Model)
    // We filter out the target plan and grab 2 others for context
    const challengers = PLAN_DB.filter(p =>
        p.id !== targetPlan.id &&
        (p.series === targetPlan.series || Math.abs((p.premiums.main || 0) - (targetPlan.premiums.main || 0)) < 2000)
    ).slice(0, 2);

    return {
        persona,
        targetPlan,
        challengers
    };
}

/**
 * MAGIC SEARCH ALGORITHM
 */
export async function searchPersonas(query: string): Promise<Persona[]> {
    if (!query) return PERSONA_DB.slice(0, 5);
    const lower = query.toLowerCase();
    return PERSONA_DB.filter(p =>
        p.title.toLowerCase().includes(lower) ||
        p.intent.toLowerCase().includes(lower) ||
        p.mathematical_basis.toLowerCase().includes(lower)
    ).slice(0, 8);
}