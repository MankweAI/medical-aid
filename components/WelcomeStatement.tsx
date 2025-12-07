'use client';

import { useEffect } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { Persona } from '@/utils/persona';

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
        <div className="mb-6 animate-in slide-in-from-top-2 fade-in duration-500">
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">
                {persona.meta.category} Strategy
            </p>
            <h1 className="text-3xl font-light text-slate-900 leading-tight mb-2">
                {persona.meta.title}
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed max-w-lg">
                {persona.meta.description}
            </p>
        </div>
    );
}