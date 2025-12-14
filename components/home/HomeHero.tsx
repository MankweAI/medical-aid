'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePersona } from '@/context/PersonaContext';
import MagicSearch from '@/components/MagicSearch';
import TrustTicker from '@/components/TrustTicker';
import { Zap, Activity, ShieldAlert, Sparkles, Command } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function HomeHero() {
    const { state } = usePersona();
    const router = useRouter();
    const [view, setView] = useState<'input' | 'processing'>('input');

    const handleDiagnosisStart = () => {
        setView('processing');
        // Simulate Actuarial Calculation Time (2.5s)
        setTimeout(() => {
            // Default fallback or use the calculated persona
            const targetSlug = state.persona || 'bestmed-beat1-network-student-starter-2026';
            router.push(`/personas/${targetSlug}?income=${state.income}`);
        }, 2500);
    };

    const TICKER_MESSAGES = [
        "Loading 2026 CMS Rules...",
        "Calibrating Income Bands...",
        "Scanning Network Geofences...",
        "Calculating Risk Ratios..."
    ];

    return (
        <section className="relative z-20 w-full max-w-4xl mx-auto mb-20 flex flex-col items-center">

            {/* HER0 HEADER */}
            <div className="text-center mb-10 space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 backdrop-blur-md shadow-sm">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                        v2026.1 Intelligent Engine
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight drop-shadow-sm">
                    Strategic Medical Aid <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                        Analysis Console
                    </span>
                </h1>

                <p className="text-slate-600 max-w-xl mx-auto text-lg leading-relaxed font-light">
                    The only platform that reverse-engineers actuarial risk structures to find your mathematical optimal plan.
                </p>
            </div>

            {/* SEARCH INTERFACE */}
            <div className="w-full max-w-2xl relative group">
                {/* GLOW BEHIND SEARCH */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />

                <GlassCard className="p-1">
                    {view === 'input' ? (
                        <div className="bg-white/95 rounded-xl overflow-hidden backdrop-blur-xl">
                            <MagicSearch onAnalyze={handleDiagnosisStart} />

                            {/* SUBTLE DASHBOARD METRICS */}
                            <div className="bg-slate-50 border-t border-slate-100 p-3 flex justify-between items-center text-[10px] text-slate-400 font-mono uppercase tracking-widest px-6">
                                <div className="flex items-center gap-2">
                                    <ShieldAlert className="w-3 h-3 text-emerald-500" />
                                    <span>Live Rules Active</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Command className="w-3 h-3" />
                                    <span>Press Enter to Run</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* PROCESSING STATE */
                        <div className="w-full py-12 text-center animate-in fade-in bg-white/95 rounded-xl backdrop-blur-xl">
                            <div className="w-16 h-16 bg-gradient-to-tr from-emerald-50 to-emerald-100 rounded-2xl mx-auto mb-6 flex items-center justify-center relative shadow-inner">
                                <Zap className="w-8 h-8 text-emerald-600 animate-pulse" />
                            </div>

                            <h2 className="text-lg font-bold text-slate-900 mb-2">Simulating Scenarios...</h2>
                            <div className="h-6 mb-6 flex justify-center">
                                <TrustTicker messages={TICKER_MESSAGES} />
                            </div>

                            <div className="h-1 w-48 bg-slate-100 rounded-full overflow-hidden mx-auto">
                                <div className="h-full bg-emerald-500 w-1/3 animate-[translateX_1s_ease-in-out_infinite]" />
                            </div>
                        </div>
                    )}
                </GlassCard>
            </div>
        </section>
    );
}