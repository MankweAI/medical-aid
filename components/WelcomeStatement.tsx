'use client';

import { useEffect } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { Persona } from '@/utils/persona';
import { ShieldCheck, Activity, CheckCircle2 } from 'lucide-react';

interface Props {
    persona: Persona;
}

export default function WelcomeStatement({ persona }: Props) {
    const { setPersona, setIncome, setMembers, setFilter } = usePersona();

    // HYDRATE CONTEXT ON MOUNT
    useEffect(() => {
        setPersona(persona.slug);
        setIncome(persona.defaults.income);
        setMembers(persona.defaults.family_composition);

        // Map Search Profile to Filters
        setFilter('network', persona.search_profile.network_tolerance);
        setFilter('savings', persona.search_profile.min_savings_allocation > 0 ? 'Yes' : 'No');
        setFilter('priority', persona.search_profile.priority_tag);

    }, [persona, setPersona, setIncome, setMembers, setFilter]);

    return (
        <div className="mb-4 animate-in slide-in-from-top-2 fade-in duration-500">

            {/* 1. SEO & Trust Badge */}
            <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-100 shadow-sm">
                    <Activity className="w-3 h-3" />
                    {persona.meta.category} Strategy
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" />
                    2026 Validated
                </div>
            </div>

            {/* 2. Primary H1 (SEO Power) */}
            <h1 className="text-3xl md:text-4xl font-light text-slate-900 leading-tight mb-5">
                {persona.meta.title}
            </h1>

            {/* 3. The "Diagnosis" Card (UX) */}
            <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-sm max-w-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50" />

                <div className="flex gap-4 items-start relative z-10">
                    <div className="bg-slate-100 p-2 rounded-xl shrink-0 text-slate-600 group-hover:text-blue-600 transition-colors">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                            Strategic Objective
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