import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import LivingStatement from '@/components/LivingStatement';
import SmartFeed from '@/components/SmartFeed';
import { notFound } from 'next/navigation';

// 1. Update Props to use Promise<...> for Next.js 15+
type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 2. Await params in generateMetadata
export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const { slug } = params;

    // Map slugs to "Human" titles for the Title Tag
    const titles: Record<string, string> = {
        'family-planner': 'Best Medical Aid for Pregnancy (2026 Strategy)',
        'chronic-warrior': 'Chronic Illness Cover & Gap Analysis',
        'budget-conscious': 'Affordable Medical Aid under R1,500',
        'digital-native': 'Digital-First Hospital Plans'
    };

    const title = titles[slug] || 'Virtual Actuary Diagnosis';
    const canonicalUrl = `https://healthos.co.za/personas/${slug}`;

    return {
        title: `${title} | HealthOS`,
        description: `AI-powered analysis for ${slug.replace('-', ' ')}. Compare plans based on real income bands and hidden benefits.`,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            url: canonicalUrl,
            type: 'website',
        }
    };
}

// 3. Await params and searchParams in the Page Component
export default async function PersonaPage(props: Props) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const { slug } = params;
    const incomeParam = (searchParams.income as string) || '20000';

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
                <LivingStatement
                    initialIncome={parseInt(incomeParam)}
                    persona={slug}
                    need={(searchParams.need as string) || ''}
                />
            </section>

            <section className="px-4 mt-6">
                <SmartFeed
                    persona={slug}
                    initialIncome={parseInt(incomeParam)}
                />
            </section>
        </main>
    );
}