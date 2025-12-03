// components/simulator/SimulationHero.tsx
'use client';

import { usePersona } from '@/context/PersonaContext';
import { useEffect } from 'react';
import { Persona } from '@/types/schema';
import { CustomizationPanel } from './CustomizationPanel';

interface HeroProps {
    persona: Persona;
    initialIncome: number;
    scenarioTitle: string; // Kept for metadata if needed, but panel handles selection
}

export function SimulationHero({ persona, initialIncome, scenarioTitle }: HeroProps) {
    const { setIncome, setPersona } = usePersona();

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

            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
                        Actuarial Stress Test
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                        Customize Your Simulation
                    </h1>
                    <p className="text-white/60 mt-2 text-sm md:text-base max-w-2xl mx-auto">
                        Adjust the variables below to see how different medical aid plans perform under your specific clinical and financial conditions.
                    </p>
                </div>

                <CustomizationPanel currentScenarioId={persona.slug} />
            </div>
        </div>
    );
}
