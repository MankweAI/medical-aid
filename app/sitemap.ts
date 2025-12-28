import { MetadataRoute } from 'next';
import { getPersonas } from '@/utils/db';
import { getV2Slug } from '@/utils/slug-utils';

const GLOBAL_LAUNCH_DATE = new Date('2025-10-01');

/**
 * Main Sitemap
 * 
 * Contains static pages and /personas cluster (already indexed).
 * Discovery Health routes are in /discovery-health-sitemap.xml
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.intellihealth.co.za';

    // 1. Static Routes
    const staticRoutes = ['', '/about', '/methodology', '/disclaimer', '/privacy'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: GLOBAL_LAUNCH_DATE,
        changeFrequency: 'monthly' as const,
        priority: 1,
    }));

    // 2. Persona Routes (already indexed)
    const personas = await getPersonas();
    const personaRoutes = personas.map((persona) => {
        const v2Slug = getV2Slug(persona.slug);
        return {
            url: `${baseUrl}/personas/${v2Slug}`,
            lastModified: GLOBAL_LAUNCH_DATE,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        };
    });

    return [
        ...staticRoutes,
        ...personaRoutes,
    ];
}
