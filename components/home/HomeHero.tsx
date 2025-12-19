'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePersona } from '@/context/PersonaContext';
import MagicSearch from '@/components/MagicSearch';
import ControlPanel from '@/components/ControlPanel';
import TrustTicker from '@/components/TrustTicker';
import { Zap, Sparkles, ShieldCheck } from 'lucide-react';

export default function HomeHero() {
    const { state } = usePersona();
    const router = useRouter();
    const [view, setView] = useState<'input' | 'processing'>('input');

    const handleDiagnosisStart = () => {
        setView('processing');
        // Simulate Actuarial Calculation Time (2.5s)
        setTimeout(() => {
            const targetSlug = state.persona || 'bestmed-beat1-network-budget-starter-2026';
            router.push(`/personas/${targetSlug}?income=${state.income}`);
        }, 2500);
    };

    const TICKER_MESSAGES = [
        "Initializing 2026 Rules Engine...",
        `Calibrating for Income Band R${(state.income / 1000).toFixed(0)}k...`,
        "Scanning Network Geofences...",
        "Optimizing Risk Ratios..."
    ];

    return (
        <section className="w-full max-w-3xl mx-auto relative z-20">

            {/* V2 WELCOME HERO SECTION */}
            <div className="text-center mb-8 px-4 animate-in fade-in slide-in-from-top-4 duration-700">
                {/* Badge - More prominent V2 styling */}
                <div className="inline-flex items-center gap-2 bg-emerald-500/90 backdrop-blur-md rounded-full px-4 py-2 mb-6 shadow-lg">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                        2026 Rules Active
                    </span>
                </div>

                {/* V2 Main Heading - User-centric messaging */}
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-5 leading-[1.1] drop-shadow-lg">
                    Find Your Perfect <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
                        Medical Aid
                    </span>
                </h1>

                {/* V2 Description - Empathetic, solution-focused */}
                <p className="text-white/90 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed drop-shadow">
                    Navigate 70+ plans with confidence. Compare benefits, prices, and find your ideal match in seconds.
                </p>
            </div>

            {/* V2 MAIN INTERFACE CARD - Enhanced glass styling */}
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-slate-900/20 border border-white/80 overflow-hidden">
                {view === 'input' ? (
                    <div>

                        {/* 1. CONTEXT LAYER (Who) */}
                        <div className="p-5 border-b border-slate-100 bg-slate-50/80">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1.5 bg-emerald-100 rounded-lg">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                </div>
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                                    Your Profile
                                </label>
                            </div>
                            <ControlPanel />
                        </div>

                        {/* 2. INTENT LAYER (What) */}
                        <div className="p-6 pb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1.5 bg-blue-100 rounded-lg">
                                    <Sparkles className="w-4 h-4 text-blue-600" />
                                </div>
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                                    What Do You Need?
                                </label>
                            </div>
                            <MagicSearch onAnalyze={handleDiagnosisStart} />
                        </div>

                        {/* STATUS FOOTER - Modernized */}
                        <div className="bg-slate-900 text-slate-400 p-4 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest px-6">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-3 h-3 text-emerald-400" />
                                <span className="text-slate-300">AI Ready</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-500">Awaiting Input</span>
                                <span className="w-2 h-4 bg-emerald-500/60 animate-pulse block rounded-sm" />
                            </div>
                        </div>
                    </div>
                ) : (
                    /* PROCESSING STATE */
                    <div className="w-full py-20 text-center animate-in fade-in flex flex-col items-center justify-center">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse" />
                            <div className="w-20 h-20 bg-white border border-emerald-100 rounded-2xl flex items-center justify-center relative shadow-lg z-10">
                                <Zap className="w-8 h-8 text-emerald-600 animate-pulse" />
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-slate-900 mb-2">Finding Your Match</h2>
                        <div className="h-6 mb-8 flex justify-center w-full">
                            <TrustTicker messages={TICKER_MESSAGES} />
                        </div>

                        {/* Progress Bar */}
                        <div className="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-1/3 animate-[translateX_1s_ease-in-out_infinite] rounded-full" />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}