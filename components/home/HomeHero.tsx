'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePersona } from '@/context/PersonaContext';
import MagicSearch from '@/components/MagicSearch';
import TrustTicker from '@/components/TrustTicker';
import { Zap, Activity, ShieldAlert, Terminal } from 'lucide-react';

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
        <section className="relative z-20 w-full max-w-2xl mx-auto mb-16 min-h-[360px] flex flex-col justify-center">

            {/* Console Header */}
            <div className="flex items-center justify-center gap-2 mb-8 opacity-60">
                <Terminal className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-mono text-emerald-800 font-bold uppercase tracking-widest">
                    System Ready • v2026.1
                </span>
            </div>

            {view === 'input' ? (
                <div className="animate-in fade-in zoom-in duration-500 w-full">
                    <MagicSearch onAnalyze={handleDiagnosisStart} />

                    {/* Subtle Trust Indicators (Dashboard Style) */}
                    <div className="mt-8 flex items-center justify-center gap-8 opacity-50">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <ShieldAlert className="w-3 h-3" /> Live Rules Engine
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <Activity className="w-3 h-3" /> Actuary Validated
                        </div>
                    </div>
                </div>
            ) : (
                /* PROCESSING STATE */
                <div className="w-full max-w-md mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-xl shadow-emerald-900/10 mx-auto mb-8 flex items-center justify-center relative overflow-hidden border border-emerald-100">
                        <div className="absolute inset-0 bg-emerald-50/50 animate-pulse" />
                        <Zap className="w-8 h-8 text-emerald-600 relative z-10 animate-bounce" />
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 mb-4">Running Logic...</h2>
                    <div className="h-8 mb-6">
                        <TrustTicker messages={TICKER_MESSAGES} />
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden max-w-xs mx-auto">
                        <div className="h-full bg-emerald-500 w-1/2 animate-[translateX_1s_ease-in-out_infinite]" />
                    </div>
                </div>
            )}
        </section>
    );
}