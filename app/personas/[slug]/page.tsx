import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPersonaData } from '@/lib/controller';
import { SCENARIO_DB } from '@/data/scenarios';
import { runSimulation } from '@/utils/simulator';
import { SimulatorLayout } from '@/components/simulator/SimulatorLayout';

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
    const initialIncome = incomeParam || persona.default_income;

    // 3. Select Scenario (Logic: Map intent to DB)
    const scenarioId = persona.intent.toLowerCase().includes('baby') || persona.intent.toLowerCase().includes('maternity')
        ? 'maternity-natural-private'
        : 'chronic-diabetes-type2';

    const scenario = SCENARIO_DB.find(s => s.id === scenarioId) || SCENARIO_DB[0];

    // 4. Run Initial Simulations (Server-Side Pre-calc)
    const targetResult = runSimulation(targetPlan, scenario);
    const challengerResults = challengers.map(plan => ({
        plan,
        result: runSimulation(plan, scenario)
    }));

    return (
        <SimulatorLayout
            persona={persona}
            initialIncome={initialIncome}
            scenario={scenario}
            targetResult={targetResult}
            challengerResults={challengerResults}
            targetPlan={targetPlan}
        />
    );
}