'use client';
import { usePersona } from '@/context/PersonaContext';
import { Persona } from '@/utils/persona';
import { Activity, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

// Map database tags to local assets - using placeholder until branded images available
const PLACEHOLDER_IMAGE = '/images/placeholder.jpg';
const IMAGE_MAP: Record<string, string> = {
    'active_professional': PLACEHOLDER_IMAGE,
    'growing_family': PLACEHOLDER_IMAGE,
    'serene_senior': PLACEHOLDER_IMAGE,
    'new_mother': PLACEHOLDER_IMAGE,
    'chronic_care': PLACEHOLDER_IMAGE
};

export default function WelcomeStatement({ persona }: { persona: Persona }) {
    const { setUnifiedProfile } = usePersona();
    useEffect(() => { setUnifiedProfile(persona); }, [persona, setUnifiedProfile]);

    return (
        <div className="mb-8 animate-in slide-in-from-top-2 fade-in duration-500 pt-6">
            {/* LIFESTYLE HERO IMAGE [cite: 40] */}
            {persona.hero_image_tag && (
                <div className="w-full h-48 md:h-64 rounded-3xl overflow-hidden mb-8 relative border border-white/20 shadow-xl">
                    <img
                        src={IMAGE_MAP[persona.hero_image_tag] || PLACEHOLDER_IMAGE}
                        alt={persona.display_title || persona.meta.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                </div>
            )}

            <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wider px-2">
                    <CheckCircle2 className="w-3 h-3" />
                    2026 Strategy Validated
                </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-5 tracking-tight">
                {persona.display_title || persona.meta.marketing_heading}
            </h1>

            <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-sm max-w-2xl relative overflow-hidden group hover:border-blue-200 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50" />
                <div className="flex gap-4 items-start relative z-10">
                    <div className="bg-blue-50 p-2.5 rounded-xl shrink-0 text-blue-600">
                        <Activity className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Actuarial Objective</h2>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">{persona.meta.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}