// app/sitemap.ts

import { MetadataRoute } from 'next';
import { getAllProcedureSlugs, getAllPlans } from '@/lib/data-loader';

// IMPORTANT: Hardcode the migration date to avoid "false freshness" spam signals.
const MIGRATION_DATE = new Date('2026-01-18');

/**
 * Main Sitemap
 * 
 * Contains static pages, procedure hubs, plan details, and SMART comparisons.
 * Excludes leaf pages (plan+procedure) to avoid crawl budget waste.
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

    // 2. Scheme Procedure Hub Routes (High Value - aggregates all plans)
    // Structure: /discovery-health/[procedureSlug]
    const procedures = getAllProcedureSlugs();
    const schemeProcedureRoutes = procedures.map((slug) => ({
        url: `${baseUrl}/discovery-health/${slug}`,
        lastModified: MIGRATION_DATE,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 3. Plan Detail Routes (SDUI pages from extracted data)
    // Structure: /discovery-health/[planSlug]
    const plans = getAllPlans();
    const planDetailRoutes = plans.map((plan) => ({
        url: `${baseUrl}/${plan.identity.scheme_slug}/${plan.identity.plan_slug}`,
        lastModified: MIGRATION_DATE,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 4. Smart Comparison Routes (Only price-proximate plans)
    // Structure: /discovery-health/[planSlug1]-vs-[planSlug2]
    // SEO: Only index comparisons where plans are within 30% price of each other
    const comparisonRoutes: MetadataRoute.Sitemap = [];
    for (let i = 0; i < plans.length; i++) {
        for (let j = i + 1; j < plans.length; j++) {
            const p1 = plans[i];
            const p2 = plans[j];

            // Only Discovery Health plans
            if (p1.identity.scheme_slug !== 'discovery-health') continue;
            if (p2.identity.scheme_slug !== 'discovery-health') continue;

            const priceDiff = Math.abs(p1.premiums.main_member - p2.premiums.main_member);
            const averagePrice = (p1.premiums.main_member + p2.premiums.main_member) / 2;

            // Only add to sitemap if prices are comparable (within 30% difference)
            if (priceDiff / averagePrice < 0.3) {
                comparisonRoutes.push({
                    url: `${baseUrl}/discovery-health/${p1.identity.plan_slug}-vs-${p2.identity.plan_slug}`,
                    lastModified: MIGRATION_DATE,
                    changeFrequency: 'monthly' as const,
                    priority: 0.7,
                });
            }
        }
    }

    // ❌ REMOVED: planProcedureRoutes (leaf pages)
    // These will be discovered via internal links only, not wasting crawl budget

    return [
        ...staticRoutes,
        ...schemeProcedureRoutes,
        ...planDetailRoutes,
        ...comparisonRoutes,
    ];
}

