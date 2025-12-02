import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPersonaData } from '@/lib/controller';
import PersonaDashboard from '@/components/PersonaDashboard';
import SmartFeed from '@/components/SmartFeed';
import TrustTicker from '@/components/TrustTicker';

// Fix: Use the new Controller Logic instead of mock data
type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const data = await getPersonaData(params.slug);

    if (!data) return { title: 'Diagnosis Not Found' };

    return {
        title: `${data.persona.title} | HealthOS`,
        description: `Actuarial diagnosis: ${data.persona.intent}. Target Plan: ${data.targetPlan.name}.`,
    };
}

export default async function PersonaPage(props: Props) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const incomeParam = Number(searchParams.income) || 0;

    // 1. Fetch Data from the new Controller (The "Brain")
    const data = await getPersonaData(params.slug);

    // 2. Handle Invalid Slugs
    if (!data) return notFound();

    const { persona, targetPlan, challengers } = data;

    // 3. Prepare Ticker Messages
    const tickerMessages = [
        `Analysis: ${persona.mathematical_basis}`,
        `Risk Identified: ${persona.primary_risk}`,
        `Optimized for: ${targetPlan.name}`
    ];

    return (
        <main className="min-h-screen bg-slate-50/50 pb-32 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px]" />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-24 px-6 pb-12 bg-white rounded-b-[40px] shadow-sm border-b border-slate-100">
                <PersonaDashboard
                    persona={persona}
                    targetPlan={targetPlan}
                    initialIncome={incomeParam || persona.default_income}
                />
                <div className="mt-6 flex justify-center">
                    <TrustTicker messages={tickerMessages} />
                </div>
            </section>

            {/* Smart Feed (Passes the PLANS array, not just a string) */}
            <section className="px-4 mt-8 relative z-10">
                <SmartFeed
                    plans={[targetPlan, ...challengers]}
                    initialIncome={incomeParam || persona.default_income}
                />
            </section>
        </main>
    );
}