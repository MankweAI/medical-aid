'use client';

import { usePersona } from '@/context/PersonaContext';
import { SCENARIO_DB } from '@/data/scenarios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Users, MapPin, Wallet, Building2, Activity, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

// Extract unique schemes from a hardcoded list or pass them in. 
// For now, we'll hardcode the major ones found in PLAN_DB.
const SCHEMES = ['All Schemes', 'Discovery', 'Bonitas', 'Bestmed', 'Medihelp', 'Medshield'];

// Extract unique categories from SCENARIO_DB
const CATEGORIES = Array.from(new Set(SCENARIO_DB.map(s => s.category)));

export function CustomizationPanel({ currentScenarioId }: { currentScenarioId: string }) {
    const { state, setIncome, setMembers, setPostalCode, setActiveScheme } = usePersona();
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
                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                        <Wallet className="w-3 h-3" /> Gross Monthly Income
                    </label>
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
                            R{state.income.toLocaleString()}
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

            </div>
        </div>
    );
}
