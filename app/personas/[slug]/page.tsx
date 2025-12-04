import { Metadata } from 'next';
import WelcomeStatement from '@/components/WelcomeStatement';
import ControlPanel from '@/components/ControlPanel';
import SmartFeed from '@/components/SmartFeed';
import PinsFab from '@/components/PinsFab'; // Replaces ActionDock
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
    return {
        title: `Strategy: ${slug} | HealthOS`,
        description: `AI-powered analysis for ${slug}.`,
    };
}

export default async function PersonaPage(props: Props) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const { slug } = params;
    const initialIncome = parseInt((searchParams.income as string) || '20000');

    // Mocks
    const TICKER_DATA = ["Analyzing 2026 Rules...", "Verifying Network Limits..."];
    const glossary = [{ term: "PMB", definition: "Prescribed Minimum Benefits." }];
    const faq = [{ question: "Can I upgrade?", answer: "Yes, in January." }];

    return (
        <main className="min-h-screen bg-slate-50/50 pb-32 relative overflow-hidden">
            {/* BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-[20%] right-[-20%] w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[100px] animate-float-delayed" />
            </div>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-24 px-4 sm:px-6 pb-8">
                <WelcomeStatement personaSlug={slug} />
                <ControlPanel />
                <div className="mt-4 flex justify-center">
                    <TrustTicker messages={TICKER_DATA} />
                </div>
            </section>

            {/* THE FEED */}
            <section className="px-4 relative z-10">
                <SmartFeed
                    persona={slug}
                    initialIncome={initialIncome}
                />
            </section>

            {/* CONTENT */}
            <section className="px-6 mt-12 relative z-10">
                <DailyInsight
                    term="Waiting Periods"
                    definition="3-month general waiting period applies to new memberships."
                />
            </section>

            <section className="max-w-2xl mx-auto px-6 mt-8 relative z-10">
                <SemanticGlossary terms={glossary} />
            </section>

            <section className="max-w-2xl mx-auto px-6 mb-24 relative z-10">
                <PeopleAlsoAsk questions={faq} />
            </section>

            {/* GLOBAL FLOATING ACTION BUTTON */}
            <PinsFab />

        </main>
    );
}