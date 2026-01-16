import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.intellihealth.co.za';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/profile/',
                    '/_next/',
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: [
                    '/medical-aid-optimization/',
                    '/audit/',
                    '/compare/',
                    '/personas/',
                ],
            },
        ],
        sitemap: [
            `${baseUrl}/sitemap.xml`,
            // Future: scheme-specific sitemaps
            // `${baseUrl}/discovery-health-sitemap.xml`,
            // `${baseUrl}/bestmed-sitemap.xml`,
            // `${baseUrl}/bonitas-sitemap.xml`,
        ],
    };
}