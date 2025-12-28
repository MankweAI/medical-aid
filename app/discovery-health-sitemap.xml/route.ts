import { getDiscoveryPlanSlugs, getDiscoveryProcedures } from '@/utils/db';

const BASE_URL = 'https://www.intellihealth.co.za';
const LAST_MODIFIED = '2025-12-28';

/**
 * Discovery Health Sitemap
 * 
 * Separate sitemap for /discovery-health/ cluster to trigger fresh indexing.
 * Data is fetched from Supabase database.
 */
export async function GET() {
    // Fetch from database
    const [planSlugs, procedures] = await Promise.all([
        getDiscoveryPlanSlugs(),
        getDiscoveryProcedures()
    ]);

    // Build sitemap XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // 1. Discovery Health Hub
    xml += `  <url>
    <loc>${BASE_URL}/discovery-health</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;

    // 2. Plan Hub Pages
    for (const { slug } of planSlugs) {
        xml += `  <url>
    <loc>${BASE_URL}/discovery-health/${slug}</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    }

    // 3. Procedure Leaf Pages
    for (const { slug } of planSlugs) {
        for (const proc of procedures) {
            xml += `  <url>
    <loc>${BASE_URL}/discovery-health/${slug}/${proc.id}</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
        }
    }

    xml += `</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}

