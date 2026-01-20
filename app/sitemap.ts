// app/sitemap.ts

import { MetadataRoute } from 'next';
import { getAllProcedureSlugs, getAllPlans } from '@/lib/data-loader';

// IMPORTANT: Hardcode the migration date to avoid "false freshness" spam signals.
const MIGRATION_DATE = new Date('2026-01-18');

/**
 * Main Sitemap
 * 
 * Contains static pages, scheme-first procedure routes, and plan detail pages.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.intellihealth.co.za';

    // 1. Static Routes
    const staticRoutes = ['', '/about', '/methodology', '/disclaimer', '/privacy'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: MIGRATION_DATE,
        changeFrequency: 'monthly' as const,
        priority: 1,
    }));

    // 2. Scheme Procedure Hub Routes
    // Structure: /[scheme]/[slug] (Flattened)
    const procedures = getAllProcedureSlugs();
    const schemeProcedureRoutes = procedures.map((slug) => ({
        url: `${baseUrl}/discovery-health/${slug}`,
        lastModified: MIGRATION_DATE,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 3. Plan Detail Routes (SDUI pages from extracted data)
    // Structure: /[scheme]/[planSlug]
    const plans = getAllPlans();
    const planDetailRoutes = plans.map((plan) => ({
        url: `${baseUrl}/${plan.identity.scheme_slug}/${plan.identity.plan_slug}`,
        lastModified: MIGRATION_DATE,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 4. Plan Procedure Detail Routes (Deep leaf pages)
    // Structure: /[scheme]/[planSlug]/[procedureSlug]
    // Note: We need to slugify procedure names to match the page logic
    const planProcedureRoutes = plans.flatMap(plan =>
        plan.procedures.map(proc => {
            const procSlug = proc.procedure_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            return {
                url: `${baseUrl}/${plan.identity.scheme_slug}/${plan.identity.plan_slug}/${procSlug}`,
                lastModified: MIGRATION_DATE,
                changeFrequency: 'monthly' as const,
                priority: 0.8,
            };
        })
    );

    return [
        ...staticRoutes,
        ...schemeProcedureRoutes,
        ...planDetailRoutes,
        ...planProcedureRoutes,
    ];
}
