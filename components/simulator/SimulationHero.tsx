// components/simulator/SimulationHero.tsx
'use client';

import { usePersona } from '@/context/PersonaContext';
import { ChevronDown, MapPin, Wallet } from 'lucide-react';
import { useEffect } from 'react';
import { Persona } from '@/types/schema';

interface HeroProps {
    persona: Persona;
    initialIncome: number;
    scenarioTitle: string;
}

export function SimulationHero({ persona, initialIncome, scenarioTitle }: HeroProps) {
    const { state, setIncome, setPersona } = usePersona();
    const { region } = state;

    // Sync Server State to Client Context on Mount
    useEffect(() => {
        setIncome(initialIncome);
        setPersona(persona.slug);
    }, [initialIncome, persona.slug, setIncome, setPersona]);

    return (
        <div className="bg-slate-900 text-white pt-24 pb-20 px-6 rounded-b-[40px] shadow-xl relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-blue-500 rounded-full blur-[80px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-emerald-500 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10 max-w-xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                    Actuarial Stress Test
                </div>

                <h1 className="text-2xl md:text-3xl font-light leading-snug">
                    Simulating a <span className="font-bold text-white border-b border-white/30 pb-0.5">{scenarioTitle}</span> for a family earning{' '}
                    <button className="inline-flex items-center gap-1 font-bold text-emerald-400 border-b border-emerald-400/30 pb-0.5 hover:text-emerald-300 transition-colors">
                        <Wallet className="w-4 h-4" />
                        R{initialIncome.toLocaleString()}
                    </button>
                    {' '}living in{' '}
                    <button className="inline-flex items-center gap-1 font-bold text-blue-400 border-b border-blue-400/30 pb-0.5 hover:text-blue-300 transition-colors">
                        <MapPin className="w-4 h-4" />
                        {region === 'National' ? 'SA (National)' : region.replace('_', ' ')}
                    </button>.
                </h1>
            </div>
        </div>
    );
}
