import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'HealthOS Virtual Actuary',
        short_name: 'HealthOS',
        description: 'AI-powered medical aid diagnosis and comparison.',
        start_url: '/',
        display: 'standalone', // Removes browser URL bar
        background_color: '#F1F5F9',
        theme_color: '#FFFFFF',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}

