/**
 * Bonitas Async Resolver
 * 
 * Resolves plan + procedure combinations from database
 * with caching for build-time static generation.
 */

import { createBuildTimeClient } from '@/utils/supabase/build-client';
import { BonitasPlan, BonitasProcedure, BonitasRiskAudit, BonitasPlanRule } from '@/types/schemes/bonitas';
import { BonitasRiskEngine } from '@/utils/risk/engines/bonitas';

// ============================================================================
// CACHED REPOSITORIES
// ============================================================================

let procedureCache: BonitasProcedure[] | null = null;
let planCache: Map<string, BonitasPlan> | null = null;

export class BonitasProcedureRepositoryAsync {
    static async getAll(): Promise<BonitasProcedure[]> {
        if (procedureCache) return procedureCache;

        const supabase = createBuildTimeClient();
        const { data, error } = await supabase
            .from('bonitas_procedures')
            .select('*') as { data: { data: BonitasProcedure }[] | null; error: any };

        if (error || !data) {
            console.error('Failed to fetch Bonitas procedures:', error);
            return [];
        }

        procedureCache = data.map(row => row.data);
        return procedureCache;
    }

    static async getById(id: string): Promise<BonitasProcedure | null> {
        const all = await this.getAll();
        return all.find(p => p.id === id) || null;
    }
}

export class BonitasPlanRepositoryAsync {
    static async getAll(): Promise<BonitasPlan[]> {
        if (planCache) return Array.from(planCache.values());

        const supabase = createBuildTimeClient();
        const { data, error } = await supabase
            .from('bonitas_plans')
            .select('*') as { data: { slug: string; data: BonitasPlan }[] | null; error: any };

        if (error || !data) {
            console.error('Failed to fetch Bonitas plans:', error);
            return [];
        }

        planCache = new Map();
        data.forEach(row => {
            planCache!.set(row.slug, row.data);
        });

        return Array.from(planCache.values());
    }

    static async getBySlug(slug: string): Promise<BonitasPlan | null> {
        if (planCache?.has(slug)) {
            return planCache.get(slug) || null;
        }

        const supabase = createBuildTimeClient();
        const { data, error } = await supabase
            .from('bonitas_plans')
            .select('*')
            .eq('slug', slug)
            .single() as { data: { data: BonitasPlan } | null; error: any };

        if (error || !data) {
            return null;
        }

        return data.data;
    }
}

// ============================================================================
// MAIN RESOLVER
// ============================================================================

export class BonitasRiskResolverAsync {
    static async resolve(planSlug: string, procedureSlug: string): Promise<BonitasRiskAudit> {
        const [plan, procedure] = await Promise.all([
            BonitasPlanRepositoryAsync.getBySlug(planSlug),
            BonitasProcedureRepositoryAsync.getById(procedureSlug),
        ]);

        if (!plan) {
            throw new Error(`Plan not found: ${planSlug}`);
        }

        if (!procedure) {
            throw new Error(`Procedure not found: ${procedureSlug}`);
        }

        // Evaluate risk assuming in-network (default)
        const result = BonitasRiskEngine.evaluate(plan, procedure, true, false);

        // Build plan rule for UI
        const planRule: BonitasPlanRule = {
            plan_id: plan.planId,
            plan_name: plan.planName,
            series: plan.series,
            network_option: plan.networkOption,
            copayments: plan.copayments,
            limits: plan.limits,
        };

        return {
            procedure,
            plan: planRule,
            liability: result.liability,
            breakdown: result.breakdown,
            meta: result.meta,
        };
    }
}
