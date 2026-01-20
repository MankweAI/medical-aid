/**
 * Data Loader for Extracted Medical Aid Data
 * 
 * Loads JSON files from /extracted_data/** and provides typed access
 * to plans, procedures, and modules for SDUI rendering.
 */

import fs from 'fs';
import path from 'path';
import { PROCEDURE_METADATA } from './procedure-metadata';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface PlanIdentity {
    scheme_slug: string;
    plan_slug: string;
    plan_name: string;
    year: number;
}

export interface ExtractionMetadata {
    source_directory: string;
    categories_extracted: string[];
    extracted_at: string;
    confidence_score: number;
    requires_review: boolean;
    review_notes: string[];
    extraction_method: string;
}

export interface Premiums {
    main_member: number;
    adult_dependant: number;
    child_dependant: number;
    msa_percentage: number;
    income_bands: unknown[];
    notes: string[];
}

export interface HospitalBenefits {
    annual_limit: number | null;
    annual_limit_unlimited: boolean;
    rate_covered?: string;
    network_hospitals: string[];
    co_payment_in_network: number | null;
    co_payment_out_of_network: number | null;
    pre_authorization_required: boolean;
    designated_service_provider_required: boolean;
    exclusions: string[];
    waiting_periods: {
        general: number | null;
        pre_existing: number | null;
        maternity: number | null;
    };
    notes: string[];
}

export interface Procedure {
    procedure_name: string;
    procedure_code: string | null;
    scheme_rate: number | null;
    copayment: number;
    pmb_covered: boolean;
    pre_authorization_required: boolean;
    annual_limit: number | null;
    notes: string;
    // Optional marketing data for rich leaf pages
    marketing_description?: string;
    jargon_busters?: { term: string; definition: string }[];
    faqs?: { question: string; answer: string }[];
    // Patient Guide
    preparation?: string[];
    recovery_time?: string;
}

export interface Module {
    type: string;
    title: string;
    description: string;
    data: Record<string, unknown>;
}

// New data categories for expanded extraction
export interface DayToDayBenefits {
    gp_visits?: { limit: string | number; network?: string; copayment?: number };
    specialist_visits?: { limit: number; annual_cap?: number | null };
    dentist?: { limit: number; notes?: string };
    optometry?: { limit: number; notes?: string };
}

export interface ChronicBenefits {
    cdl_conditions_covered?: number;
    medicine_formulary?: string;
    additional_disease_list?: boolean;
    examples?: string[];
}

export interface OncologyBenefits {
    oncology_benefit_limit?: number | "Unlimited";
    pmb_unlimited?: boolean;
    innovation_benefit?: boolean;
    extended_benefit?: boolean;
    notes?: string;
}

export interface MaternityBenefits {
    waiting_period_months?: number;
    antenatal_visits?: string | number;
    delivery_cover?: string;
    scan_limit?: number;
    notes?: string;
}

export interface ExtractedPlan {
    identity: PlanIdentity;
    extraction_metadata: ExtractionMetadata;
    premiums: Premiums;
    hospital_benefits: HospitalBenefits;
    procedures: Procedure[];
    modules: Module[];
    // Extended data categories
    day_to_day?: DayToDayBenefits;
    chronic?: ChronicBenefits;
    oncology?: OncologyBenefits;
    maternity?: MaternityBenefits;
}

// For procedure index: procedure slug -> list of plans offering it
export interface ProcedurePlanEntry {
    scheme_slug: string;
    plan_slug: string;
    plan_name: string;
    copayment: number;
    premium: number;
    pmb_covered: boolean;
    notes: string;
}

export interface ProcedureIndex {
    [procedureSlug: string]: {
        procedure_name: string;
        plans: ProcedurePlanEntry[];
    };
}

// ============================================================================
// DATA LOADING FUNCTIONS
// ============================================================================

const DATA_DIR = path.join(process.cwd(), 'extracted_data');

/**
 * Recursively find all JSON files in extracted_data directory
 */
function findJsonFiles(dir: string): string[] {
    const files: string[] = [];

    if (!fs.existsSync(dir)) {
        console.warn(`Data directory not found: ${dir}`);
        return files;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...findJsonFiles(fullPath));
        } else if (entry.name.endsWith('.json')) {
            files.push(fullPath);
        }
    }

    return files;
}

/**
 * Load and parse a single plan JSON file
 */
function loadPlanFile(filePath: string): ExtractedPlan | null {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const plan = JSON.parse(content) as ExtractedPlan;

        // Enrich procedures with global metadata
        if (plan.procedures) {
            plan.procedures = plan.procedures.map(proc => {
                const globalData = PROCEDURE_METADATA[proc.procedure_name];
                if (globalData) {
                    // Helper to inject plan name
                    const inject = (str: string) => str.replace(/\{\{PLAN_NAME\}\}/g, plan.identity.plan_name);

                    return {
                        ...proc,
                        preparation: proc.preparation || globalData.preparation.map(inject),
                        recovery_time: proc.recovery_time || inject(globalData.recovery_time),
                    };
                }
                return proc;
            });
        }

        return plan;
    } catch (error) {
        console.error(`Failed to load plan file: ${filePath}`, error);
        return null;
    }
}

// ============================================================================
// CACHED REPOSITORIES
// ============================================================================

let _allPlans: ExtractedPlan[] | null = null;
let _procedureIndex: ProcedureIndex | null = null;

/**
 * Get all plans from extracted_data directory
 * Results are cached after first load
 */
export function getAllPlans(): ExtractedPlan[] {
    if (_allPlans !== null) return _allPlans;

    const jsonFiles = findJsonFiles(DATA_DIR);
    const plans: ExtractedPlan[] = [];

    for (const file of jsonFiles) {
        const plan = loadPlanFile(file);
        if (plan) {
            plans.push(plan);
        }
    }

    _allPlans = plans;
    return plans;
}

/**
 * Get a specific plan by scheme and plan slug
 */
export function getPlanBySlug(schemeSlug: string, planSlug: string): ExtractedPlan | null {
    const plans = getAllPlans();
    return plans.find(p =>
        p.identity.scheme_slug === schemeSlug &&
        p.identity.plan_slug === planSlug
    ) || null;
}

/**
 * Get all plans for a specific scheme
 */
export function getPlansByScheme(schemeSlug: string): ExtractedPlan[] {
    const plans = getAllPlans();
    return plans.filter(p => p.identity.scheme_slug === schemeSlug);
}

/**
 * Slugify a procedure name for URL use
 */
export function slugifyProcedure(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * Build procedure index: maps procedure slugs to all plans offering that procedure
 * Results are cached after first build
 */
export function getProcedureIndex(): ProcedureIndex {
    if (_procedureIndex !== null) return _procedureIndex;

    const plans = getAllPlans();
    const index: ProcedureIndex = {};

    for (const plan of plans) {
        for (const proc of plan.procedures) {
            const slug = slugifyProcedure(proc.procedure_name);

            if (!index[slug]) {
                index[slug] = {
                    procedure_name: proc.procedure_name,
                    plans: []
                };
            }

            index[slug].plans.push({
                scheme_slug: plan.identity.scheme_slug,
                plan_slug: plan.identity.plan_slug,
                plan_name: plan.identity.plan_name,
                copayment: proc.copayment,
                premium: plan.premiums.main_member,
                pmb_covered: proc.pmb_covered,
                notes: proc.notes
            });
        }
    }

    _procedureIndex = index;
    return index;
}

/**
 * Get all available procedure slugs
 */
export function getAllProcedureSlugs(): string[] {
    const index = getProcedureIndex();
    return Object.keys(index);
}

/**
 * Get procedure data across all plans
 */
export function getProcedureAcrossPlans(procedureSlug: string) {
    const index = getProcedureIndex();
    return index[procedureSlug] || null;
}

/**
 * Get all available scheme slugs
 */
export function getAllSchemeSlugs(): string[] {
    const plans = getAllPlans();
    const schemes = new Set(plans.map(p => p.identity.scheme_slug));
    return Array.from(schemes);
}

/**
 * Get a procedure for a specific scheme
 */
export function getProcedureForScheme(procedureSlug: string, schemeSlug: string) {
    const procData = getProcedureAcrossPlans(procedureSlug);
    if (!procData) return null;

    const schemePlans = procData.plans.filter(p => p.scheme_slug === schemeSlug);
    if (schemePlans.length === 0) return null;

    return {
        procedure_name: procData.procedure_name,
        plans: schemePlans
    };
}

// ============================================================================
// BENCHMARKING
// ============================================================================

export interface BenchmarkResult {
    average: number;
    min: number;
    max: number;
    sampleSize: number;
}

/**
 * Calculate the average co-payment for a given procedure across all known plans.
 * Returns null if the procedure is not found or has no valid co-payment data.
 */
export function getAverageCopayment(procedureSlug: string): BenchmarkResult | null {
    const plans = getAllPlans();
    const copayments: number[] = [];

    for (const plan of plans) {
        // procedures are arrays of objects, we need to slugify to match
        const proc = plan.procedures.find(p => slugifyProcedure(p.procedure_name) === procedureSlug);

        // Only count if it has a non-negative co-payment
        if (proc && typeof proc.copayment === 'number' && proc.copayment >= 0) {
            copayments.push(proc.copayment);
        }
    }

    if (copayments.length === 0) return null;

    const sum = copayments.reduce((a, b) => a + b, 0);
    const avg = Math.round(sum / copayments.length);
    const min = Math.min(...copayments);
    const max = Math.max(...copayments);

    return {
        average: avg,
        min,
        max,
        sampleSize: copayments.length
    };
}

/**
 * Get two plans for side-by-side comparison
 * Returns null if either plan is not found
 */
export function getPlansForComparison(
    schemeSlug: string,
    planSlug1: string,
    planSlug2: string
): { plan1: ExtractedPlan; plan2: ExtractedPlan } | null {
    const plan1 = getPlanBySlug(schemeSlug, planSlug1);
    const plan2 = getPlanBySlug(schemeSlug, planSlug2);

    if (!plan1 || !plan2) return null;

    return { plan1, plan2 };
}
