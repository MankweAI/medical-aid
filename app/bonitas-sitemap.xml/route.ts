import { getBonitasPlanSlugs, getBonitasProcedures } from '@/utils/db';

const BASE_URL = 'https://www.intellihealth.co.za';
const LAST_MODIFIED = '2025-12-30';

/**
 * Bonitas Sitemap
 * 
 * Separate sitemap for /bonitas/ cluster.
 * Data is fetched from Supabase database.
 */
export async function GET() {
    const [planSlugs, procedures] = await Promise.all([
        getBonitasPlanSlugs(),
        getBonitasProcedures(),
    ]);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // 1. Bonitas Hub
    xml += `  <url>
    <loc>${BASE_URL}/bonitas</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;

    // 2. Plan Hub Pages
    for (const { slug } of planSlugs) {
        xml += `  <url>
    <loc>${BASE_URL}/bonitas/${slug}</loc>
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
    <loc>${BASE_URL}/bonitas/${slug}/${proc.id}</loc>
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
