import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import LivingStatement from '@/components/LivingStatement';
import SmartFeed from '@/components/SmartFeed';
import { notFound } from 'next/navigation';

// ... (Previous Imports)

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

// 1. DYNAMIC METADATA & CANONICALS
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params;

    // Map slugs to "Human" titles for the Title Tag
    const titles: Record<string, string> = {
        'family-planner': 'Best Medical Aid for Pregnancy (2026 Strategy)',
        'chronic-warrior': 'Chronic Illness Cover & Gap Analysis',
        'budget-conscious': 'Affordable Medical Aid under R1,500',
        'digital-native': 'Digital-First Hospital Plans'
    };

    const title = titles[slug] || 'Virtual Actuary Diagnosis';
    const canonicalUrl = `https://healthos.co.za/personas/${slug}`; // Force clean URL

    return {
        title: `${title} | HealthOS`,
        description: `AI-powered analysis for ${slug.replace('-', ' ')}. Compare plans based on real income bands and hidden benefits.`,
        alternates: {
            canonical: canonicalUrl, // CRITICAL: Ignores ?income=...
        },
        openGraph: {
            title,
            url: canonicalUrl,
            type: 'website',
        }
    };
}

export default async function PersonaPage({ params, searchParams }: Props) {
    // ... (Existing Logic)
    const { slug } = params;
    const incomeParam = searchParams.income as string || '20000';

    // 2. SCHEMA MARKUP (JSON-LD)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'HealthOS Virtual Actuary',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'Web',
        'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'ZAR'
        },
        'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.8',
            'ratingCount': '1240'
        },
        'description': `Automated medical aid comparison for ${slug} scenario.`
    };

    return (
        <main className="min-h-screen bg-slate-50 pb-32">
            {/* Inject Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className="pt-24 px-6 pb-8 bg-white rounded-b-[40px] shadow-sm relative z-10">
                {/* ... LivingStatement ... */}
                <LivingStatement
                    initialIncome={parseInt(incomeParam)}
                    persona={slug}
                    need={searchParams.need as string || ''}
                />
            </section>

            <section className="px-4 mt-6">
                {/* ... SmartFeed ... */}
                <SmartFeed
                    persona={slug}
                    initialIncome={parseInt(incomeParam)}
                />
            </section>
        </main>
    );
}