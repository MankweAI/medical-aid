import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PERSONAS } from '@/data/personas';
import WelcomeStatement from '@/components/WelcomeStatement';
import ControlPanel from '@/components/ControlPanel';
import SinglePlanHero from '@/components/SinglePlanHero'; // <--- NEW IMPORT
import TrustTicker from '@/components/TrustTicker';

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
    };
}

// 2. PAGE COMPONENT
export default async function PersonaPage(props: Props) {
    const params = await props.params;
    const { slug } = params;

    // Lookup Data
    const persona = PERSONAS.find(p => p.slug === slug);

    // 404 if not found
    if (!persona) {
        notFound();
    }

    const TICKER_DATA = ["Loading 2026 Rules...", "Verifying Income Bands...", "Applying Actuarial Logic..."];

    return (
        <main className="min-h-screen bg-slate-50/50 pb-32 relative overflow-hidden">
            {/* BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] animate-float" />
                <div className="absolute bottom-[20%] right-[-20%] w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[100px] animate-float-delayed" />
            </div>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-24 px-4 sm:px-6 pb-4">
                <WelcomeStatement persona={persona} />

                {/* Control Panel allows user to adjust income/family to see accurate price */}
                <ControlPanel />

                <div className="mt-4 flex justify-center">
                    <TrustTicker messages={TICKER_DATA} />
                </div>
            </section>

            {/* THE ONE TRUE ANSWER */}
            <section className="relative z-10 max-w-2xl mx-auto">
                <SinglePlanHero persona={slug} />
            </section>
        </main>
    );
}