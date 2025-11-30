import { Metadata } from 'next';
import LivingStatement from '@/components/LivingStatement';
import SmartFeed from '@/components/SmartFeed';
import TrustTicker from '@/components/TrustTicker'; // New Import
import DailyInsight from '@/components/DailyInsight'; // New Import
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

    const TICKER_DATA: Record<string, string[]> = {
        'family-planner': [
            "Verified: Private Ward (Bonitas)",
            "Savings found: R12k Gap Cover",
            "Active: 84 Moms this week"
        ],
        'chronic-warrior': [
            "Analysis: 27 CDL Conditions",
            "Alert: State Hospital Restriction avoided",
            "Optimized: R15k Chronic Benefit"
        ],
        'budget-conscious': [
            "Found: Private Hospital < R1,500",
            "Warning: Income Band Limit checked",
            "Real-time: 12 users comparing now"
        ],
        'digital-native': [
            "Tech Check: Apple Watch Booster active",
            "Virtual Care: Unlimited",
            "System: 98% Digital Efficiency"
        ]
    };

    const INSIGHT_DATA: Record<string, { term: string, def: string }> = {
        'family-planner': {
            term: "PMB for Pregnancy",
            def: "All medical schemes must cover antenatal care and delivery as a Prescribed Minimum Benefit, regardless of your plan type. However, 'Hospital Plans' may restrict you to a general ward."
        },
        'chronic-warrior': {
            term: "Chronic Drug Amount (CDA)",
            def: "The monthly dollar limit a scheme will pay for a specific chronic medicine class. If your brand-name drug costs more than the CDA, you pay the difference."
        },
        'budget-conscious': {
            term: "Income Verification",
            def: "Schemes like KeyCare require 3 months of bank statements. If your income varies (e.g. commission), you might be bumped to a higher bracket retrospectively."
        },
        'digital-native': {
            term: "Wearable Device Integration",
            def: "Biometric data from devices like Garmin or Apple Watch can now directly influence your 'Personal Health Fund' balance on certain 2026 plans."
        }
    };

    const activeTicker = TICKER_DATA[slug] || ["Analyzing 2026 Rules...", "Verifying Network Limits...", "Calculating Effective Cost..."];
    const activeInsight = INSIGHT_DATA[slug] || { term: "Waiting Periods", def: "A standard 3-month general waiting period applies to all new memberships not moving from another scheme." };

    return (
        <main className="min-h-screen bg-slate-50/50 pb-32 relative overflow-hidden">

            {/* 1. BACKGROUND: The "Neural Network" (Consistent with Hub) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-[20%] right-[-20%] w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[100px] animate-float-delayed" />
            </div>

            {/* 2. HERO SECTION */}
            <section className="relative z-10">
                <div className="pt-24 px-6 pb-12 bg-white rounded-b-[40px] shadow-sm border-b border-slate-100">
                    <LivingStatement
                        initialIncome={parseInt(incomeParam)}
                        persona={slug}
                        need={(searchParams.need as string) || ''}
                    />

                    {/* THE TRUST TICKER (Injected into Hero) */}
                    <div className="mt-6 flex justify-center">
                        <TrustTicker messages={activeTicker} />
                    </div>
                </div>
            </section>

            {/* 3. THE FEED */}
            <section className="px-4 mt-8 relative z-10">
                <SmartFeed
                    persona={slug}
                    initialIncome={parseInt(incomeParam)}
                />
            </section>

            {/* 4. THE SEO ANCHOR (Daily Insight) */}
            <section className="px-6 mt-12 relative z-10">
                <DailyInsight
                    term={activeInsight.term}
                    definition={activeInsight.def}
                />
            </section>

        </main>
    );
}