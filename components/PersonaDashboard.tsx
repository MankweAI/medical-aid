'use client';

import { useState, useEffect } from 'react';
import { PricingEngine, formatCurrency } from '@/utils/engine';
import { Persona, PlanProduct } from '@/types/schema';
import { ChevronDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { usePersona } from '@/context/PersonaContext';
import { IncomeSlider } from './HeroTools';

// DEFINITION: Updated Props Interface
interface DashboardProps {
    persona: Persona;
    targetPlan: PlanProduct;
    initialIncome: number;
}

export default function PersonaDashboard({ persona, targetPlan, initialIncome }: DashboardProps) {
    // 1. Sync to Global Context
    const { setIncome: setGlobalIncome } = usePersona();

    // 2. Local State
    const [income, setIncome] = useState(initialIncome);
    const [members, setMembers] = useState(persona.default_family);
    const [showConfig, setShowConfig] = useState(false);

    // 3. Real-time Calculation using the Engine
    const profile = PricingEngine.calculateProfile(targetPlan, members, income);

    // Update global context when local income changes
    useEffect(() => {
        setGlobalIncome(income);
    }, [income, setGlobalIncome]);

    const totalMembers = members.main + members.adult + members.child;

    return (
        <div className="animate-in fade-in duration-500">

            {/* 1. THE LIVING STATEMENT (Hero) */}
            <div className="relative mb-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    {persona.code} // {persona.intent}
                </p>
                <h2 className="text-2xl md:text-3xl font-light text-slate-900 leading-snug">
                    <span className="font-bold block mb-2">{persona.title}</span>
                    Optimized for a family of
                    <button
                        onClick={() => setShowConfig(!showConfig)}
                        className="inline-flex items-center mx-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 font-bold align-middle active:scale-95"
                    >
                        {totalMembers} <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    earning
                    <button
                        onClick={() => setShowConfig(!showConfig)}
                        className="inline-flex items-center mx-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 font-bold align-middle active:scale-95"
                    >
                        {formatCurrency(income)} <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    pm.
                </h2>
            </div>

            {/* 2. INLINE CONFIGURATION (Dropdown) */}
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

            {/* 3. THE RESULT CARD */}
            <div className="bg-white rounded-3xl border-2 border-blue-600 p-6 shadow-xl shadow-blue-900/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                    RECOMMENDED STRATEGY
                </div>

                <div className="flex justify-between items-end mb-4">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{targetPlan.scheme}</p>
                        <h3 className="text-2xl font-black text-slate-900">{targetPlan.name}</h3>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-black text-blue-600">{formatCurrency(profile.monthlyPremium)}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Per Month</p>
                    </div>
                </div>

                {/* Actuarial Logic Badges */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span><strong>Basis:</strong> {persona.mathematical_basis}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-100">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span><strong>Risk:</strong> {persona.primary_risk}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}