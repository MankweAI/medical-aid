'use client';

import { Persona, PlanProduct } from '@/types/schema';
import { SimulationResult, ClinicalScenario } from '@/types/simulation';
import { SimulationHero } from './SimulationHero';
import { SimulatorStage } from './SimulatorStage';
import { StrategyDock } from './StrategyDock';

interface SimulatorLayoutProps {
    persona: Persona;
    initialIncome: number;
    scenario: ClinicalScenario;
    targetResult: SimulationResult;
    challengerResults: Array<{ plan: PlanProduct; result: SimulationResult }>;
    targetPlan: PlanProduct;
}

export function SimulatorLayout({
    persona,
    initialIncome,
    scenario,
    targetResult,
    challengerResults,
    targetPlan,
}: SimulatorLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 pb-32">
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
        </div>
    );
}
