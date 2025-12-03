'use client';

import { useState, useEffect, useMemo } from 'react';
import { Persona, PlanProduct } from '@/types/schema';
import { ChevronDown, Activity, Wallet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { usePersona } from '@/context/PersonaContext';
import { IncomeSlider } from './HeroTools';
// New Imports for the Engine
import { runSimulation } from '@/utils/simulator';
import { SCENARIO_DB } from '@/data/scenarios';
import { formatCurrency } from '@/utils/engine';
import clsx from 'clsx';

interface DashboardProps {
    persona: Persona;
    targetPlan: PlanProduct;
    initialIncome: number;
}

export default function PersonaDashboard({ persona, targetPlan, initialIncome }: DashboardProps) {
    const { setIncome: setGlobalIncome } = usePersona();

    // 1. Local State
    const [income, setIncome] = useState(initialIncome);
    const [members, setMembers] = useState(persona.default_family);
    const [showConfig, setShowConfig] = useState(false);

    // 2. Sync Global State
    useEffect(() => {
        setGlobalIncome(income);
    }, [income, setGlobalIncome]);

    const totalMembers = members.main + members.adult + members.child;

    // 3. AUTO-DETECT SCENARIO (The "Brain")
    // In the new architecture, we infer the test based on the Persona's intent
    const activeScenario = useMemo(() => {
        const intent = persona.intent.toLowerCase();
        if (intent.includes('baby') || intent.includes('maternity')) {
            return SCENARIO_DB.find(s => s.id === 'maternity-natural-private') || SCENARIO_DB[0];
        }
        return SCENARIO_DB.find(s => s.id === 'chronic-diabetes-type2') || SCENARIO_DB[1];
    }, [persona.intent]);

    // 4. RUN SIMULATION (The "Stress Test")
    // We run the engine in real-time as the user adjusts income/plan
    const simulationResult = useMemo(() => {
        return runSimulation(targetPlan, activeScenario);
    }, [targetPlan, activeScenario]); // Note: Simulation engine currently doesn't use income, but pricing does.

    const shortfall = simulationResult.financials.shortfall;
    const isFullyCovered = shortfall === 0;

    return (
        <div className="animate-in fade-in duration-500">

            {/* HEADER: Context & Config */}
            <div className="relative mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                    <Activity className="w-3 h-3" />
                    Scenario: {activeScenario.title}
                </div>

                <h2 className="text-2xl md:text-3xl font-light text-slate-900 leading-snug">
                    <span className="font-bold block mb-2">{persona.title}</span>
                    Optimized for a family of
                    <button
                        onClick={() => setShowConfig(!showConfig)}
                        className="inline-flex items-center mx-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 font-bold align-middle active:scale-95 transition-transform"
                    >
                        {totalMembers} <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    earning
                    <button
                        onClick={() => setShowConfig(!showConfig)}
                        className="inline-flex items-center mx-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 font-bold align-middle active:scale-95 transition-transform"
                    >
                        {formatCurrency(income)} <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    pm.
                </h2>
            </div>

            {/* SLIDER: Config Panel */}
            {showConfig && (
                <div className="mb-8 pt-6 border-t border-slate-100 grid gap-6 animate-in slide-in-from-top-2">
                    <IncomeSlider income={income} setIncome={setIncome} />
                    <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-600">Dependants</span>
                        <div className="flex gap-4">
                            <button onClick={() => setMembers(p => ({ ...p, child: Math.max(0, p.child - 1) }))} className="w-8 h-8 bg-white rounded-full shadow text-slate-600 font-bold">-</button>
                            <span className="font-bold text-slate-900">{members.child} Child</span>
                            <button onClick={() => setMembers(p => ({ ...p, child: p.child + 1 }))} className="w-8 h-8 bg-white rounded-full shadow text-blue-600 font-bold">+</button>
                        </div>
                    </div>
                </div>
            )}

            {/* MAIN STAGE: Simulation Result */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: The "Actuarial Scorecard" */}
                <div className="lg:col-span-1 space-y-4">
                    <div className={clsx(
                        "p-6 rounded-3xl border-2",
                        isFullyCovered ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"
                    )}>
                        <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-60">
                            Projected Shortfall
                        </p>
                        <p className={clsx("text-4xl font-black mb-4", isFullyCovered ? "text-emerald-600" : "text-rose-600")}>
                            {formatCurrency(shortfall)}
                        </p>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-600">Event Cost</span>
                                <span className="font-bold text-slate-900">{formatCurrency(simulationResult.financials.total_event_cost)}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-600">Plan Pays</span>
                                <span className="font-bold text-emerald-600">{formatCurrency(simulationResult.financials.plan_pays)}</span>
                            </div>
                        </div>

                        {/* Quick Insight */}
                        <div className="mt-6 pt-4 border-t border-black/5 flex gap-3 items-start">
                            {isFullyCovered ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                            <p className="text-[10px] font-bold leading-tight opacity-70">
                                {isFullyCovered
                                    ? "Excellent. This plan covers the scenario 100%."
                                    : `Warning: You will need to pay R${shortfall.toLocaleString()} from your own pocket.`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Target Plan Card */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block uppercase tracking-wider">
                                    {targetPlan.scheme}
                                </span>
                                <h3 className="text-2xl font-black text-slate-900">{targetPlan.name}</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-black text-slate-900">{formatCurrency(simulationResult.financials.plan_pays)}</p>
                                <p className="text-[10px] text-slate-400 uppercase font-bold">Cover Value</p>
                            </div>
                        </div>

                        {/* Timeline Preview (Mini) */}
                        <div className="space-y-3">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Clinical Timeline</p>
                            {simulationResult.timeline.slice(0, 3).map((event, i) => (
                                <div key={i} className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className={clsx("w-2 h-2 rounded-full",
                                            event.status === 'Fully Covered' ? "bg-emerald-500" :
                                                event.status === 'Not Covered' ? "bg-rose-500" : "bg-amber-500"
                                        )} />
                                        <span className="font-medium text-slate-700">{event.step_label}</span>
                                    </div>
                                    <span className={clsx("font-bold", event.shortfall > 0 ? "text-rose-500" : "text-emerald-600")}>
                                        {event.shortfall > 0 ? `-${formatCurrency(event.shortfall)}` : 'Paid'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}