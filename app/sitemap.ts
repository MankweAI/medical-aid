// app/sitemap.ts

import { MetadataRoute } from 'next';
import { getPersonas } from '@/utils/db';
import { getV2Slug } from '@/utils/slug-utils';

// Update this to the actual date of your "Big Migration"
const MIGRATION_DATE = new Date(); // Use current date

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.intellihealth.co.za';

    const staticRoutes = ['', '/about', '/methodology', '/disclaimer', '/privacy'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: MIGRATION_DATE, // Updated signal
        changeFrequency: 'monthly' as const,
        priority: 1,
    }));

    const personas = await getPersonas();

    const personaRoutes = personas.map((persona) => {
        const v2Slug = getV2Slug(persona.slug);
        return {
            url: `${baseUrl}/personas/${v2Slug}`,
            // If your DB tracks updates, use persona.updatedAt. 
            // Otherwise, MIGRATION_DATE is perfect for this structural change.
            lastModified: persona.updatedAt ? new Date(persona.updatedAt) : MIGRATION_DATE,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        };
    });

    return [...staticRoutes, ...personaRoutes];
}