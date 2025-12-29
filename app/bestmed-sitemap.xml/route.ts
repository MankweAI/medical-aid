import { getBestmedPlanSlugs, getBestmedProcedures } from '@/utils/db';

const BASE_URL = 'https://www.intellihealth.co.za';
const LAST_MODIFIED = '2025-12-29';

/**
 * Bestmed Sitemap
 * 
 * Separate sitemap for /bestmed/ cluster.
 * Data is fetched from Supabase database.
 */
export async function GET() {
    const [planSlugs, procedures] = await Promise.all([
        getBestmedPlanSlugs(),
        getBestmedProcedures(),
    ]);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // 1. Bestmed Hub
    xml += `  <url>
    <loc>${BASE_URL}/bestmed</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;

    // 2. Plan Hub Pages
    for (const { slug } of planSlugs) {
        xml += `  <url>
    <loc>${BASE_URL}/bestmed/${slug}</loc>
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
    <loc>${BASE_URL}/bestmed/${slug}/${proc.id}</loc>
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
