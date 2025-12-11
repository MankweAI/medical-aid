import { MetadataRoute } from 'next';
import { PERSONAS } from '@/data/personas';

// 1. HARDCODE YOUR LAUNCH DATE HERE
// This single line handles all 50 initial pages at once.
const GLOBAL_LAUNCH_DATE = new Date('2025-10-01');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://healthos.co.za';

    // Static Pages
    const staticRoutes = ['', '/about', '/methodology', '/disclaimer', '/privacy'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: GLOBAL_LAUNCH_DATE, // Use the Anchor
        changeFrequency: 'monthly' as const,
        priority: 1,
    }));

    // Dynamic Persona Pages
    const personaRoutes = PERSONAS.map((persona) => {
        // 2. THE EFFICIENCY LOGIC:
        // Use the specific date if provided (New Pages), otherwise use Global Anchor (Launch Pages)
        const lastMod = persona.updatedAt ? new Date(persona.updatedAt) : GLOBAL_LAUNCH_DATE;

        return {
            url: `${baseUrl}/personas/${persona.slug}`,
            lastModified: lastMod,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        };
    });

    return [...staticRoutes, ...personaRoutes];
}