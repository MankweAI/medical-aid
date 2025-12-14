import { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';
import { Persona } from '@/utils/persona';

const GLOBAL_LAUNCH_DATE = new Date('2025-10-01');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://healthos.co.za';
    const supabase = await createClient();

    // Fetch personas from DB
    const { data: rows } = await supabase.from('personas').select('data');
    const personas = rows?.map(r => r.data as Persona) || [];

    // Static Pages
    const staticRoutes = ['', '/about', '/methodology', '/disclaimer', '/privacy'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: GLOBAL_LAUNCH_DATE,
        changeFrequency: 'monthly' as const,
        priority: 1,
    }));

    // Dynamic Persona Pages
    const personaRoutes = personas.map((persona) => {
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