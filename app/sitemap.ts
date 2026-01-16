// app/sitemap.ts

import { MetadataRoute } from 'next';
import { getPersonas } from '@/utils/db';
import { getV2Slug } from '@/utils/slug-utils';
import { getAllConditionSlugs, CONDITIONS } from '@/utils/condition-mapping';

// Update this to the actual date of your "Big Migration"
const MIGRATION_DATE = new Date(); // Use current date

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
    const conditions = getAllConditionSlugs();
    const optimizeRoutes = conditions.map((condition) => ({
        url: `${baseUrl}/optimize/${condition}`,
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
    const comparisonRoutes = conditions.map((condition) => ({
        url: `${baseUrl}/compare/discovery-smart-classic-vs-bestmed-pace2-for-${condition}`,
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
