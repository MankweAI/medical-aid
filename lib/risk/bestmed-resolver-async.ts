/**
 * Bestmed Database Resolver
 * 
 * Async resolver that fetches data from Supabase instead of local files.
 * Includes caching for build-time performance.
 */

import {
    BestmedPlan,
    BestmedProcedure,
    BestmedProcedureContext,
    BestmedRiskAudit,
    BestmedPlanRule,
} from '@/types/schemes/bestmed';
import { BestmedRiskEngine } from '@/utils/risk/engines/bestmed';
import {
    getBestmedPlanById,
    getBestmedPlanBySlug,
    getBestmedPlanSlugs,
    getBestmedProcedures,
    getBestmedProcedureById,
} from '@/utils/db';

// ============================================================================
// CACHING LAYER (For build-time performance)
// ============================================================================

let plansCache: Map<string, BestmedPlan> = new Map();
let proceduresCache: Map<string, BestmedProcedure> = new Map();
let slugToIdCache: Map<string, string> = new Map();
let cacheInitialized = false;

/**
 * Initialize cache from database (call once at build time)
 */
export async function initializeBestmedResolver(): Promise<void> {
    if (cacheInitialized) return;

    const [planSlugs, procedures] = await Promise.all([
        getBestmedPlanSlugs(),
        getBestmedProcedures(),
    ]);

    // Build slug-to-id mapping
    for (const { id, slug } of planSlugs) {
        slugToIdCache.set(slug, id);
    }

    // Cache procedures
    for (const proc of procedures) {
        proceduresCache.set(proc.id, proc);
    }

    cacheInitialized = true;
    console.log(`[BestmedResolver] Initialized with ${planSlugs.length} plans, ${procedures.length} procedures`);
}

// ============================================================================
// ASYNC REPOSITORIES
// ============================================================================

export const BestmedProcedureRepositoryAsync = {
    getById: async (slug: string): Promise<BestmedProcedure | undefined> => {
        if (proceduresCache.has(slug)) {
            return proceduresCache.get(slug);
        }
        const proc = await getBestmedProcedureById(slug);
        if (proc) {
            proceduresCache.set(slug, proc);
        }
        return proc || undefined;
    },

    getAll: async (): Promise<BestmedProcedure[]> => {
        if (proceduresCache.size > 0) {
            return Array.from(proceduresCache.values());
        }
        const procedures = await getBestmedProcedures();
        procedures.forEach(p => proceduresCache.set(p.id, p));
        return procedures;
    },
};

export const BestmedPlanRepositoryAsync = {
    getPlanIdFromSlug: async (slug: string): Promise<string | undefined> => {
        if (slugToIdCache.has(slug)) {
            return slugToIdCache.get(slug);
        }
        const result = await getBestmedPlanBySlug(slug);
        if (result) {
            slugToIdCache.set(slug, result.id);
            return result.id;
        }
        return undefined;
    },

    getPlanById: async (planId: string): Promise<BestmedPlan | undefined> => {
        if (plansCache.has(planId)) {
            return plansCache.get(planId);
        }
        const plan = await getBestmedPlanById(planId);
        if (plan) {
            plansCache.set(planId, plan);
        }
        return plan || undefined;
    },

    getRuleForPlan: async (planId: string): Promise<BestmedPlanRule | undefined> => {
        const plan = await BestmedPlanRepositoryAsync.getPlanById(planId);
        if (!plan) return undefined;
        return mapToPlanRule(plan);
    },

    getAllSlugs: async (): Promise<{ id: string; slug: string; series: string; tier: number }[]> => {
        return getBestmedPlanSlugs();
    },
};

// ============================================================================
// MAPPER: BestmedPlan → BestmedPlanRule
// ============================================================================

function mapToPlanRule(plan: BestmedPlan): BestmedPlanRule {
    return {
        plan_id: plan.planId,
        plan_name: plan.planName,
        series: plan.series.toLowerCase(),
        tier: plan.tier,
        network_option: plan.networkOption,
        copayments: plan.copayments,
        limits: plan.limits,
    };
}

// ============================================================================
// ASYNC RISK RESOLVER
// ============================================================================

export class BestmedRiskResolverAsync {

    /**
     * Main Resolver Method (Async)
     */
    static async resolve(planSlug: string, procedureSlug: string): Promise<BestmedRiskAudit> {

        // 1. Get plan ID from slug
        let planId = planSlug;
        if (!planSlug.startsWith('bestmed-')) {
            const resolvedId = await BestmedPlanRepositoryAsync.getPlanIdFromSlug(planSlug);
            if (!resolvedId) {
                throw new Error(`Could not resolve plan slug '${planSlug}'`);
            }
            planId = resolvedId;
        }

        // 2. Get the Procedure
        const procedure = await BestmedProcedureRepositoryAsync.getById(procedureSlug);
        if (!procedure) {
            throw new Error(`Could not resolve procedure '${procedureSlug}'`);
        }

        // 3. Get the full Plan
        const plan = await BestmedPlanRepositoryAsync.getPlanById(planId);
        if (!plan) {
            throw new Error(`Could not resolve plan '${planId}'`);
        }

        // 4. Get plan metadata for UI
        const planMeta = await BestmedPlanRepositoryAsync.getRuleForPlan(planId);
        if (!planMeta) {
            throw new Error(`Could not get plan metadata for '${planId}'`);
        }

        // 5. Build Context (default: network day hospital)
        const context: BestmedProcedureContext = {
            procedureName: procedure.label,
            procedureCode: procedure.cpt_code,
            facilityType: 'DSP Day Hospital',
            facilityInNetwork: true,
            isPrescribedMinimumBenefit: false,
            isEmergency: false,
        };

        // 6. Run Engine
        const result = BestmedRiskEngine.evaluate(plan, procedure, context);

        // 7. Calculate Variants
        const dspContext = { ...context, facilityType: 'DSP Day Hospital' as const };
        const dspResult = BestmedRiskEngine.evaluate(plan, procedure, dspContext);

        const acuteContext = { ...context, facilityType: 'Acute Hospital' as const };
        const acuteResult = BestmedRiskEngine.evaluate(plan, procedure, acuteContext);

        const nonNetworkContext = { ...context, facilityInNetwork: false };
        const nonNetworkResult = BestmedRiskEngine.evaluate(plan, procedure, nonNetworkContext);

        // 8. Return RiskAudit
        return {
            procedure: procedure,
            plan: planMeta,
            liability: result.memberLiability,
            breakdown: {
                base_rate: procedure.base_cost_estimate,
                scheme_pays: result.schemePays,
                shortfall: result.memberLiability,
                deductibles: {
                    procedure_copayment: result.copaymentBreakdown.procedureCopayment,
                    day_hospital_copayment: result.copaymentBreakdown.dayHospitalCopayment,
                    non_network_penalty: result.copaymentBreakdown.nonNetworkPenalty,
                    total_deductible: result.memberLiability,
                },
                variants: {
                    day_hospital_dsp: dspResult.memberLiability,
                    day_hospital_acute: acuteResult.memberLiability,
                    hospital_network: dspResult.memberLiability,
                    hospital_non_network: nonNetworkResult.memberLiability,
                },
            },
            meta: {
                is_pmb_applicable: result.isPMBExempt,
                requires_pre_auth: true,
                warning_label: result.warnings[0] || null,
            },
        };
    }
}
