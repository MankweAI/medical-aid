import { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';

// Fallback date if record has no update time
const GLOBAL_LAUNCH_DATE = new Date('2025-10-01');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://healthos.co.za';
    const supabase = await createClient();

    // PERFORMANCE OPTIMIZATION: 
    // We only fetch the specific JSON keys needed for the sitemap (slug, updatedAt).
    // This avoids transferring MBs of 'actuarial_logic' and 'marketing' text.
    // Note: The ->> operator returns the value as text.
    const { data: rows } = await supabase
        .from('personas')
        .select('slug, data->>updatedAt');

    // Static Pages
    const staticRoutes = ['', '/about', '/methodology', '/disclaimer', '/privacy'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: GLOBAL_LAUNCH_DATE,
        changeFrequency: 'monthly' as const,
        priority: 1,
    }));

    // Dynamic Persona Pages
    // The query returns objects like: { slug: '...', updatedAt: '...' }
    // We cast to any to bypass strict typing on the JSON operator result for simplicity
    const personaRoutes = (rows || []).map((row: any) => {
        // Use the 'slug' column directly if it exists, otherwise check inside data
        // Your previous script implied 'slug' might be a top-level column OR inside 'data'
        // Based on verify-routes.ts, 'slug' seems to be a top-level column. 
        const slug = row.slug;
        const lastMod = row.updatedAt ? new Date(row.updatedAt) : GLOBAL_LAUNCH_DATE;

        return {
            url: `${baseUrl}/personas/${slug}`,
            lastModified: lastMod,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        };
    });

    return [...staticRoutes, ...personaRoutes];
}