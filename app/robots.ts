import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',      // Don't index backend
                '/profile/',  // Don't index user profiles (if added later)
                '/_next/',    // Don't index build files
            ],
        },
        sitemap: 'https://intellihealth.co.za/sitemap.xml',
    };
}

