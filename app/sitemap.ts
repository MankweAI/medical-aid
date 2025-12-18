import { MetadataRoute } from 'next';
import { PERSONAS } from '@/data/personas';

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

    const personaRoutes = PERSONAS.map((persona) => {
        return {
            url: `${baseUrl}/personas/${persona.slug}`,
            lastModified: GLOBAL_LAUNCH_DATE,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        };
    });

    return [...staticRoutes, ...personaRoutes];
}