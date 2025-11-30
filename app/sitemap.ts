// import { MetadataRoute } from 'next';
// import { PersonaServer } from '@/utils/persona.server';

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//     const baseUrl = 'https://healthos.co.za';

//     // 1. Static Routes
//     const routes = [
//         '',
//         '/about',
//         '/methodology',
//         '/disclaimer',
//         '/privacy',
//     ].map((route) => ({
//         url: `${baseUrl}${route}`,
//         lastModified: new Date(),
//         changeFrequency: 'monthly' as const,
//         priority: route === '' ? 1 : 0.8,
//     }));

//     // 2. Dynamic Persona Routes (The Spokes)
//     const personas = await PersonaServer.getAllPersonas();
//     const personaRoutes = personas.map((p) => ({
//         url: `${baseUrl}/personas/${p.slug}`,
//         lastModified: new Date(),
//         changeFrequency: 'weekly' as const, // These change often (Rules/Pricing)
//         priority: 0.9, // High priority
//     }));

//     return [...routes, ...personaRoutes];
// }
