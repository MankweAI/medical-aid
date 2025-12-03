// app/simulate/[persona]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPersonaData } from '@/lib/controller';
import { SCENARIO_DB } from '@/data/scenarios';
import { runSimulation } from '@/utils/simulator';
import { SimulationHero } from '@/components/simulator/SimulationHero';
import { SimulatorStage } from '@/components/simulator/SimulatorStage';
import { StrategyDock } from '@/components/simulator/StrategyDock';

type Props = {
    params: Promise<{ persona: string }>;
    searchParams: Promise<{ income?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).persona;
    const data = await getPersonaData(slug);
    if (!data) return { title: 'Simulation Not Found' };
    return {
        title: `Simulating ${data.persona.title} | HealthOS`,
        description: `Actuarial stress-test for ${data.targetPlan.name} vs Market Challengers.`,
    };
}

export default async function SimulationPage({ params, searchParams }: Props) {
    const slug = (await params).persona;
    const sp = await searchParams;

    // 1. Fetch Persona & Plans
    const data = await getPersonaData(slug);
    if (!data) return notFound();
    const { persona, targetPlan, challengers } = data;

    // 2. Resolve Context (Income)
    const initialIncome = Number(sp.income) || persona.default_income;

    // 3. Select Scenario (Logic: Map intent to DB)
    // In production, this would be a robust mapping table.
    const scenarioId = persona.intent.toLowerCase().includes('baby') || persona.intent.toLowerCase().includes('maternity')
        ? 'maternity-natural-private'
        : 'chronic-diabetes-type2';

    const scenario = SCENARIO_DB.find(s => s.id === scenarioId) || SCENARIO_DB[0];

    // 4. Run Initial Simulations (Server-Side Pre-calc)
    // We run it for the Target Plan + 2 Challengers to prep the Dock
    const targetResult = runSimulation(targetPlan, scenario);
    const challengerResults = challengers.map(plan => ({
        plan,
        result: runSimulation(plan, scenario)
    }));

    return (
        <main className="min-h-screen bg-slate-50 pb-32">

            {/* HERO: Context & Inputs */}
            <SimulationHero
                persona={persona}
                initialIncome={initialIncome}
                scenarioTitle={scenario.title}
            />

            {/* STAGE: The Visualizer */}
            <section className="px-4 -mt-6 relative z-10 max-w-xl mx-auto">
                <SimulatorStage
                    initialResult={targetResult}
                    scenario={scenario}
                    planName={targetPlan.name}
                />
            </section>

            {/* DOCK: The Optimizer */}
            <StrategyDock
                currentPlanId={targetPlan.id}
                challengers={challengerResults}
                targetPlan={targetPlan}
                targetResult={targetResult}
            />

        </main>
    );
}
