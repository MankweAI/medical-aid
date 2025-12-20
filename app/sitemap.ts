import { MetadataRoute } from 'next';
import { getPersonas } from '@/utils/db';
import { getV2Slug } from '@/utils/slug-utils';

const GLOBAL_LAUNCH_DATE = new Date('2025-10-01');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 🔴 UPDATE THIS LINE
    const baseUrl = 'https://www.intellihealth.co.za';

    // Use local data instead of Supabase
    const staticRoutes = ['', '/about', '/methodology', '/disclaimer', '/privacy'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: GLOBAL_LAUNCH_DATE,
        changeFrequency: 'monthly' as const,
        priority: 1,
    }));

    // Fetch personas from database
    const personas = await getPersonas();

    // Generate persona routes using V2 slugs for SEO
    const personaRoutes = personas.map((persona) => {
        const v2Slug = getV2Slug(persona.slug);
        return {
            url: `${baseUrl}/personas/${v2Slug}`,
            lastModified: GLOBAL_LAUNCH_DATE,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        };
    });

    return [...staticRoutes, ...personaRoutes];
}