// app/sitemap.ts

import { MetadataRoute } from 'next';
import { getPersonas } from '@/utils/db';
import { getV2Slug } from '@/utils/slug-utils';
import { getAllConditionSlugs, CONDITIONS } from '@/utils/condition-mapping';

// IMPORTANT: Hardcode the migration date to avoid "false freshness" spam signals.
// Only update this when actual structural changes occur.
// Using new Date() at build time causes Google to think ALL pages changed on every deploy.
const MIGRATION_DATE = new Date('2026-01-16');

/**
 * Main Sitemap
 * 
 * Contains static pages, /personas cluster, and new condition-based routes.
 * Discovery Health routes are in /discovery-health-sitemap.xml
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

    // 2. Persona Routes (already indexed)
    const personas = await getPersonas();
    const personaRoutes = personas.map((persona) => {
        const v2Slug = getV2Slug(persona.slug);
        return {
            url: `${baseUrl}/personas/${v2Slug}`,
            lastModified: persona.updatedAt ? new Date(persona.updatedAt) : MIGRATION_DATE,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        };
    });

    // 3. NEW: Condition Optimization Routes (Strategy Hubs)
    // Uses nested route structure: /medical-aid-optimization/[condition]
    const conditions = getAllConditionSlugs();
    const optimizeRoutes = conditions.map((condition) => ({
        url: `${baseUrl}/medical-aid-optimization/${condition}`,
        lastModified: MIGRATION_DATE,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 4. NEW: Audit Routes (Liability Audits)
    // Generate sample audit routes for each condition + scheme combination
    const schemes = ['discovery', 'bestmed', 'bonitas'];
    const samplePlans: Record<string, string> = {
        discovery: 'smart-classic',
        bestmed: 'pace2',
        bonitas: 'bonclassic',
    };

    const auditRoutes = conditions.flatMap((condition) =>
        schemes.map((scheme) => ({
            url: `${baseUrl}/audit/${condition}-cost-audit-${scheme}-${samplePlans[scheme]}`,
            lastModified: MIGRATION_DATE,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))
    );

    // 5. NEW: Comparison Routes
    // 5. NEW: Comparison Routes (Cross-Scheme & Intra-Scheme)
    const comparisonRoutes = conditions.flatMap((condition) => [
        // Cross-Scheme Anchors (Brand Battles)
        { url: `${baseUrl}/compare/discovery-smart-classic-vs-bestmed-pace2-for-${condition}` },
        { url: `${baseUrl}/compare/discovery-saver-vs-bonitas-bonclassic-for-${condition}` },

        // Intra-Scheme Anchors (Upgrade/Downgrade Decisions)
        { url: `${baseUrl}/compare/discovery-classic-saver-vs-discovery-essential-saver-for-${condition}` }, // Network Trade-off
        { url: `${baseUrl}/compare/discovery-classic-comprehensive-vs-discovery-classic-saver-for-${condition}` }, // Safety Net Upgrade
        { url: `${baseUrl}/compare/bestmed-pace2-vs-bestmed-pace1-for-${condition}` }, // Budget Downgrade
    ]).map(route => ({
        ...route,
        lastModified: MIGRATION_DATE,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        ...staticRoutes,
        ...personaRoutes,
        ...optimizeRoutes,
        ...auditRoutes,
        ...comparisonRoutes,
    ];
}
