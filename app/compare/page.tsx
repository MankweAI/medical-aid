'use client';

import { usePersona } from '@/context/PersonaContext';
import { PLAN_DB } from '@/data/plans';
import { SCENARIO_DB } from '@/data/scenarios';
import { runSimulation } from '@/utils/simulator';
import { formatCurrency } from '@/utils/engine';
import { PricingEngine } from '@/utils/engine';
import { ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ComparisonPage() {
    const { comparedPlanIds, state, togglePlanComparison } = usePersona();
    const router = useRouter();

    // 1. Get Selected Plans
    const plans = PLAN_DB.filter(p => comparedPlanIds.includes(p.id));

    // 2. Get Active Scenario (from state or default)
    // For MVP, let's assume the user came from a simulation, so we use the last active scenario if possible?
    // Or we just pick the first one matching the category? 
    // Let's try to find the scenario from the URL or state? 
    // Actually, state doesn't store active scenario ID globally yet (it was local in CustomizationPanel).
    // Let's default to a Maternity scenario for now or the first one.
    const scenarioId = 'maternity-c-section-private'; // Default for MVP
    const scenario = SCENARIO_DB.find(s => s.id === scenarioId) || SCENARIO_DB[0];

    if (plans.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
                <h1 className="text-2xl font-bold mb-4">No Plans Selected</h1>
                <p className="text-slate-400 mb-8">Please go back and select plans to compare.</p>
                <Link href="/" className="px-6 py-3 bg-emerald-500 rounded-xl font-bold hover:bg-emerald-400 transition-colors">
                    Go Home
                </Link>
            </div>
        );
    }

    // 3. Run Simulations
    const results = plans.map(plan => {
        const profile = PricingEngine.calculateProfile(plan, state.members, state.income);
        const simResult = runSimulation(plan, scenario);
        return { plan, profile, simResult };
    });

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">Plan Comparison</h1>
                        <p className="text-slate-400 text-sm">Scenario: {scenario.title}</p>
                    </div>
                </div>
            </div>

            {/* COMPARISON GRID */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(({ plan, profile, simResult }) => (
                    <div key={plan.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col">

                        {/* CARD HEADER */}
                        <div className="p-6 border-b border-white/10 relative">
                            <button
                                onClick={() => togglePlanComparison(plan.id)}
                                className="absolute top-4 right-4 p-1.5 bg-white/10 rounded-full hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">{plan.scheme}</div>
                            <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                            <div className="text-sm text-slate-400">{plan.series} Series</div>
                        </div>

                        {/* FINANCIALS */}
                        <div className="p-6 space-y-6 flex-grow">

                            {/* Premium */}
                            <div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Monthly Premium</div>
                                <div className="text-2xl font-mono font-bold">{formatCurrency(profile.monthlyPremium)}</div>
                                <div className="text-xs text-slate-400">Annual: {formatCurrency(profile.annualPremium)}</div>
                            </div>

                            {/* Savings */}
                            <div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Savings Account</div>
                                <div className="text-xl font-mono font-bold text-blue-400">{formatCurrency(profile.savings.allocation)}</div>
                            </div>

                            {/* SCENARIO OUTCOME */}
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Scenario Outcome</div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-300">Total Bill</span>
                                        <span className="font-mono font-bold">{formatCurrency(simResult.financials.total_event_cost)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-emerald-400">Plan Pays</span>
                                        <span className="font-mono font-bold text-emerald-400">{formatCurrency(simResult.financials.plan_pays)}</span>
                                    </div>
                                    <div className="h-px bg-white/10 my-2"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-rose-400 font-bold">You Pay</span>
                                        <span className="font-mono font-bold text-rose-400 text-lg">{formatCurrency(simResult.financials.shortfall)}</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* FOOTER */}
                        <div className="p-4 bg-white/5 border-t border-white/10 text-center">
                            <Link href={`/simulate/${scenario.id}?planId=${plan.id}`} className="text-xs font-bold text-blue-400 hover:text-blue-300">
                                View Detailed Timeline &rarr;
                            </Link>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}