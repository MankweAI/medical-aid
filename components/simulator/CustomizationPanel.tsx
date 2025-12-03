'use client';

import { usePersona } from '@/context/PersonaContext';
import { SCENARIO_DB } from '@/data/scenarios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Users, MapPin, Wallet, Building2, Activity, ChevronDown, AlertTriangle, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';
import { checkIncomeVolatility, formatCurrency } from '@/utils/engine';
import { PLAN_DB } from '@/data/plans';

// Extract unique schemes from a hardcoded list or pass them in. 
// For now, we'll hardcode the major ones found in PLAN_DB.
const SCHEMES = ['All Schemes', 'Discovery', 'Bonitas', 'Bestmed', 'Medihelp', 'Medshield'];

// Extract unique categories from SCENARIO_DB
const CATEGORIES = Array.from(new Set(SCENARIO_DB.map(s => s.category)));

export function CustomizationPanel({ currentScenarioId }: { currentScenarioId: string }) {
    const { state, setIncome, setMembers, setPostalCode, setActiveScheme, toggleGapCover } = usePersona();
    const router = useRouter();

    // Local state for dropdowns to avoid flickering before navigation
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedScenario, setSelectedScenario] = useState(currentScenarioId);

    // Sync local state with prop
    useEffect(() => {
        const scenario = SCENARIO_DB.find(s => s.id === currentScenarioId);
        if (scenario) {
            setSelectedCategory(scenario.category);
            setSelectedScenario(scenario.id);
        }
    }, [currentScenarioId]);

    const handleScenarioChange = (newId: string) => {
        setSelectedScenario(newId);
        router.push(`/simulate/${newId}`);
    };

    const handleCategoryChange = (newCategory: string) => {
        setSelectedCategory(newCategory);
        // Find first scenario in this category
        const first = SCENARIO_DB.find(s => s.category === newCategory);
        if (first) {
            handleScenarioChange(first.id);
        }
    };

    // VOLATILITY CHECK
    const volatilityWarning = (() => {
        if (state.activeScheme === 'All Schemes') return null;

        // Find income banded plans for this scheme
        const bandedPlans = PLAN_DB.filter(p => p.scheme === state.activeScheme && p.pricing_model === 'Income_Banded');

        for (const plan of bandedPlans) {
            const result = checkIncomeVolatility(plan, state.income, state.members);
            if (result.hasCliff) {
                return { planName: plan.name, ...result };
            }
        }
        return null;
    })();

    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-left shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* 1. SCHEME FILTER */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                        <Building2 className="w-3 h-3" /> Medical Scheme
                    </label>
                    <div className="relative">
                        <select
                            value={state.activeScheme}
                            onChange={(e) => setActiveScheme(e.target.value)}
                            className="w-full appearance-none bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:bg-slate-900/70 transition-colors"
                        >
                            {SCHEMES.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                    </div>
                </div>

                {/* 2. SCENARIO SELECTOR (Chained) */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Clinical Scenario
                    </label>
                    <div className="flex gap-2">
                        {/* Category */}
                        <div className="relative w-1/3">
                            <select
                                value={selectedCategory}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="w-full appearance-none bg-slate-900/50 border border-white/10 rounded-xl px-3 py-3 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-900/70 transition-colors"
                            >
                                {CATEGORIES.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        {/* Specific Scenario */}
                        <div className="relative w-2/3">
                            <select
                                value={selectedScenario}
                                onChange={(e) => handleScenarioChange(e.target.value)}
                                className="w-full appearance-none bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-900/70 transition-colors"
                            >
                                {SCENARIO_DB.filter(s => s.category === selectedCategory).map(s => (
                                    <option key={s.id} value={s.id}>{s.title}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* 3. INCOME SLIDER */}
                <div className="space-y-2">
                    <div className="flex justify-between items-end">
                        <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                            <Wallet className="w-3 h-3" /> Gross Monthly Income
                        </label>
                        {volatilityWarning && (
                            <div className="flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-950/30 px-2 py-1 rounded-full animate-pulse">
                                <AlertTriangle className="w-3 h-3" />
                                <span>R{volatilityWarning.premiumJump} jump in R{volatilityWarning.cliffAmount}</span>
                            </div>
                        )}
                    </div>
                    <div className="bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-4">
                        <input
                            type="range"
                            min={0}
                            max={100000}
                            step={500}
                            value={state.income}
                            onChange={(e) => setIncome(Number(e.target.value))}
                            className="flex-grow h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                        <div className="min-w-[80px] text-right font-mono font-bold text-emerald-400">
                            {formatCurrency(state.income)}
                        </div>
                    </div>
                </div>

                {/* 4. FAMILY COMPOSITION */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                        <Users className="w-3 h-3" /> Family Members
                    </label>
                    <div className="flex gap-2">
                        <div className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2 flex justify-between items-center">
                            <span className="text-[10px] text-white/50 uppercase">Spouse</span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setMembers({ ...state.members, adult: Math.max(0, state.members.adult - 1) })}
                                    className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold"
                                >-</button>
                                <span className="font-bold w-3 text-center">{state.members.adult}</span>
                                <button
                                    onClick={() => setMembers({ ...state.members, adult: Math.min(1, state.members.adult + 1) })}
                                    className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold"
                                >+</button>
                            </div>
                        </div>
                        <div className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2 flex justify-between items-center">
                            <span className="text-[10px] text-white/50 uppercase">Child</span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setMembers({ ...state.members, child: Math.max(0, state.members.child - 1) })}
                                    className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold"
                                >-</button>
                                <span className="font-bold w-3 text-center">{state.members.child}</span>
                                <button
                                    onClick={() => setMembers({ ...state.members, child: Math.min(5, state.members.child + 1) })}
                                    className="w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold"
                                >+</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. LOCATION */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> Location
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            maxLength={4}
                            placeholder="Postal Code"
                            value={state.postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/20"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-400 uppercase">
                            {state.region === 'National' ? 'SA (National)' : state.region.replace('_', ' ')}
                        </div>
                    </div>
                </div>

                {/* 6. GAP COVER TOGGLE */}
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3" /> Gap Cover
                    </label>
                    <button
                        onClick={toggleGapCover}
                        className={clsx(
                            "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all",
                            state.isGapCoverActive
                                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                                : "bg-slate-900/50 border-white/10 text-slate-400 hover:bg-slate-900/70"
                        )}
                    >
                        <span className="text-xs font-bold">
                            {state.isGapCoverActive ? "Active (500% Cover)" : "No Gap Cover"}
                        </span>
                        <div className={clsx(
                            "w-10 h-5 rounded-full relative transition-colors",
                            state.isGapCoverActive ? "bg-emerald-500" : "bg-slate-700"
                        )}>
                            <div className={clsx(
                                "absolute top-1 w-3 h-3 rounded-full bg-white transition-transform",
                                state.isGapCoverActive ? "left-6" : "left-1"
                            )} />
                        </div>
                    </button>
                </div>

            </div>
        </div>
    );
}
