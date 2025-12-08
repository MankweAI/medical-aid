'use client';

import { useEffect } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { Persona } from '@/utils/persona';
import { ShieldCheck, Activity, CheckCircle2, Target } from 'lucide-react';

interface Props {
    persona: Persona;
}

export default function WelcomeStatement({ persona }: Props) {
    const { setPersona, setIncome, setMembers, setFilter } = usePersona();

    useEffect(() => {
        setPersona(persona.slug);
        setIncome(persona.defaults.income);
        setMembers(persona.defaults.family_composition);

        setFilter('network', persona.search_profile.network_tolerance);
        setFilter('savings', persona.search_profile.min_savings_allocation > 0 ? 'Yes' : 'No');
        setFilter('priority', persona.search_profile.priority_tag);

    }, [persona, setPersona, setIncome, setMembers, setFilter]);

    return (
        <div className="mb-8 animate-in slide-in-from-top-2 fade-in duration-500 pt-6">

            {/* 1. STRATEGY BADGE (The "System Name") */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-slate-900/20">
                    <Target className="w-3 h-3 text-emerald-400" />
                    Strategy: {persona.meta.title}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wider px-2">
                    <CheckCircle2 className="w-3 h-3" />
                    2026 Validated
                </div>
            </div>

            {/* 2. MARKETING H1 (The "Human Name") */}
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.1] mb-5 tracking-tight">
                {persona.meta.marketing_heading}
            </h1>

            {/* 3. DIAGNOSIS CARD */}
            <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-sm max-w-2xl relative overflow-hidden group hover:border-blue-200 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50" />

                <div className="flex gap-4 items-start relative z-10">
                    <div className="bg-blue-50 p-2.5 rounded-xl shrink-0 text-blue-600">
                        <Activity className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                            Actuarial Objective
                        </h2>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            {persona.meta.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}