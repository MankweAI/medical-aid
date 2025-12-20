/**
 * Database Access Layer
 * 
 * Centralized Supabase data access functions for personas and plans.
 * Use these functions instead of importing from local data files.
 */

import { createClient } from '@/utils/supabase/server';
import { Persona } from '@/utils/persona';
import { Plan } from '@/utils/types';

// ============================================================================
// PERSONAS
// ============================================================================

/**
 * Fetch all personas from database
 */
export async function getPersonas(): Promise<Persona[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('personas')
        .select('data')
        .order('slug');

    if (error) {
        console.error('Error fetching personas:', error.message);
        return [];
    }

    // Extract the full persona object from the JSONB 'data' column
    return (data || []).map(row => row.data as Persona);
}

/**
 * Fetch a single persona by V1 slug
 */
export async function getPersonaBySlug(slug: string): Promise<Persona | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('personas')
        .select('data')
        .eq('slug', slug)
        .single();

    if (error) {
        // Not found is expected for invalid slugs
        if (error.code !== 'PGRST116') {
            console.error('Error fetching persona:', error.message);
        }
        return null;
    }

    return data?.data as Persona || null;
}

/**
 * Fetch personas by category
 */
export async function getPersonasByCategory(category: string): Promise<Persona[]> {
    const supabase = await createClient();

    // Since category is nested in the JSONB 'data' column, we need to filter on it
    const { data, error } = await supabase
        .from('personas')
        .select('data')
        .order('slug');

    if (error) {
        console.error('Error fetching personas by category:', error.message);
        return [];
    }

    // Filter by category client-side (category is nested in data.meta.category)
    return (data || [])
        .map(row => row.data as Persona)
        .filter(p => p.meta.category.toLowerCase() === category.toLowerCase());
}

// ============================================================================
// PLANS
// ============================================================================

/**
 * Fetch all plans from database
 */
export async function getPlans(): Promise<Plan[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('plans')
        .select('data')
        .order('id');

    if (error) {
        console.error('Error fetching plans:', error.message);
        return [];
    }

    // Extract the full plan object from the JSONB 'data' column
    return (data || []).map(row => row.data as Plan);
}

/**
 * Fetch a single plan by ID
 */
export async function getPlanById(id: string): Promise<Plan | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('plans')
        .select('data')
        .eq('id', id)
        .single();

    if (error) {
        if (error.code !== 'PGRST116') {
            console.error('Error fetching plan:', error.message);
        }
        return null;
    }

    return data?.data as Plan || null;
}

/**
 * Fetch multiple plans by IDs
 */
export async function getPlansByIds(ids: string[]): Promise<Plan[]> {
    if (ids.length === 0) return [];

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('plans')
        .select('data')
        .in('id', ids);

    if (error) {
        console.error('Error fetching plans by IDs:', error.message);
        return [];
    }

    // Extract the full plan object from the JSONB 'data' column
    return (data || []).map(row => row.data as Plan);
}
