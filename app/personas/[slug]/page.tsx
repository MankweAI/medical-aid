import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PERSONAS } from '@/data/personas';
import WelcomeStatement from '@/components/WelcomeStatement';
import ControlPanel from '@/components/ControlPanel';
import SinglePlanHero from '@/components/SinglePlanHero'; // <--- NEW IMPORT
import TrustTicker from '@/components/TrustTicker';
import StrategyFooter from '@/components/StrategyFooter'; // <--- Import
import { PLANS } from '@/data/plans';
import AppHeader from '@/components/AppHeader';

type Props = {
    params: Promise<{ slug: string }>;
};

// 1. DYNAMIC METADATA (Crucial for SEO)
export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const persona = PERSONAS.find(p => p.slug === params.slug);

    if (!persona) return { title: 'Not Found | HealthOS' };

    return {
        title: `${persona.meta.title} | 2026 Strategy`,
        description: persona.meta.description,
        alternates: {
            canonical: `https://healthos.co.za/personas/${params.slug}`, // Blueprint Phase 4 requirement
        },
        other: {
            // Blueprint Phase 1: The "Flag"
            'script:ld+json': JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FinanceApplication',
                'name': `HealthOS Calculator: ${persona.meta.title}`,
                'applicationCategory': 'Finance',
                'operatingSystem': 'Web',
                'offers': {
                    '@type': 'Offer',
                    'price': '0',
                    'priceCurrency': 'ZAR'
                }
            })
        }
    };
}

// 2. PAGE COMPONENT
export default async function PersonaPage(props: Props) {
    const params = await props.params;
    const { slug } = params;
    const persona = PERSONAS.find(p => p.slug === slug);

    if (!persona) notFound();

    // SERVER-SIDE LOOKUP for the footer
    const plan = PLANS.find(p => p.id === persona.actuarial_logic?.target_plan_id);

    const TICKER_DATA = ["Loading 2026 Rules...", "Verifying Income Bands...", "Applying Actuarial Logic..."];

    return (
        <main className="min-h-screen bg-slate-50/50 pb-32 relative overflow-hidden animate-page-enter">
            {/* ... Background & Hero Section ... */}
            <AppHeader />

            <section className="relative z-10 pt-16 px-4 sm:px-6 pb-2">
                <WelcomeStatement persona={persona} />
                <ControlPanel />
                {/* <div className="mt-4 flex justify-center">
                    <TrustTicker messages={TICKER_DATA} />
                </div> */}
            </section>

            {/* THE ONE TRUE ANSWER */}
            <section className="relative z-10 max-w-2xl mx-auto">
                <SinglePlanHero persona={slug} />

                {/* THE ACTUARIAL FOOTNOTES (Bottom 30%) */}
                {plan && (
                    <div className="px-4 pb-12">
                        <StrategyFooter plan={plan} persona={persona} />
                    </div>
                )}
            </section>
        </main>
    );
}