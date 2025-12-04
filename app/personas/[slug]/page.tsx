import { Metadata } from 'next';
import WelcomeStatement from '@/components/WelcomeStatement'; // NEW
import ControlPanel from '@/components/ControlPanel'; // NEW
import SmartFeed from '@/components/SmartFeed';
import TrustTicker from '@/components/TrustTicker';
import DailyInsight from '@/components/DailyInsight';
import SemanticGlossary from '@/components/SemanticGlossary';
import PeopleAlsoAsk from '@/components/PeopleAlsoAsk';

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const { slug } = params;
    const titles: Record<string, string> = {
        'family-planner': 'Best Medical Aid for Pregnancy (2026 Strategy)',
        'chronic-warrior': 'Chronic Illness Cover & Gap Analysis',
        'budget-conscious': 'Affordable Medical Aid under R1,500',
        'digital-native': 'Digital-First Hospital Plans'
    };
    return {
        title: `${titles[slug] || 'Virtual Actuary Diagnosis'} | HealthOS`,
        description: `AI-powered analysis for ${slug.replace('-', ' ')}.`,
    };
}

export default async function PersonaPage(props: Props) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const { slug } = params;

    // Default income if not in context (client-side context handles the real source of truth)
    const initialIncome = parseInt((searchParams.income as string) || '20000');

    // Data Mocks
    const TICKER_DATA: Record<string, string[]> = {
        'family-planner': ["Verified: Private Ward", "Savings: R12k Gap Cover", "Active: 84 Moms"],
        'chronic-warrior': ["Analysis: 27 CDL Conditions", "Alert: State Restrictions", "Optimized: R15k Benefit"],
        // ... add others
    };
    const activeTicker = TICKER_DATA[slug] || ["Analyzing 2026 Rules...", "Verifying Network Limits..."];

    const personaData = {
        glossary: [
            { term: "Prescribed Minimum Benefits (PMB)", definition: "A set of defined benefits..." },
            { term: "Chronic Disease List (CDL)", definition: "A list of 27 chronic conditions..." }
        ],
        faq: [
            { question: "Can I upgrade my plan later?", answer: "Yes, but usually only in January..." }
        ]
    };

    const TITLES: Record<string, string> = {
        'family-planner': 'Maternity & Family Strategy',
        'chronic-warrior': 'Chronic Management Plan',
        'budget-conscious': 'Budget Efficiency Strategy',
        'digital-native': 'Digital-First Health Plan'
    };

    return (
        <main className="min-h-screen bg-slate-50/50 pb-32 relative overflow-hidden">

            {/* BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-[20%] right-[-20%] w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[100px] animate-float-delayed" />
            </div>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-24 px-6 pb-8">
                <WelcomeStatement
                    title={TITLES[slug] || 'Comprehensive Health Strategy'}
                    description="We have analyzed 2026 scheme rules to match your profile. Use the Control Panel below to refine your income and requirements."
                />

                {/* Control Panel (Replaces old Hero Tools & Filters) */}
                <ControlPanel />

                {/* Trust Ticker */}
                <div className="mt-4 flex justify-center">
                    <TrustTicker messages={activeTicker} />
                </div>
            </section>

            {/* THE FEED */}
            <section className="px-4 relative z-10">
                <SmartFeed
                    persona={slug}
                    initialIncome={initialIncome}
                />
            </section>

            {/* SEO & CONTENT */}
            <section className="px-6 mt-12 relative z-10">
                <DailyInsight
                    term="Waiting Periods"
                    definition="A standard 3-month general waiting period applies to all new memberships not moving from another scheme."
                />
            </section>

            <section className="max-w-2xl mx-auto px-6 mt-8 relative z-10">
                <SemanticGlossary terms={personaData.glossary} />
            </section>

            <section className="max-w-2xl mx-auto px-6 mb-24 relative z-10">
                <PeopleAlsoAsk questions={personaData.faq} />
            </section>

        </main>
    );
}