'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePersona } from '@/context/PersonaContext';
import MagicSearch from '@/components/MagicSearch';
import TrustTicker from '@/components/TrustTicker';
import DailyInsight from '@/components/DailyInsight';
import PinsFab from '@/components/PinsFab';
import { Zap, Bell, Activity, ShieldAlert } from 'lucide-react';

export default function AppHome() {
  const { state } = usePersona();
  const router = useRouter();
  const [view, setView] = useState<'input' | 'processing'>('input');

  const handleDiagnosisStart = () => {
    setView('processing');

    // Simulate Actuarial Calculation Time (2.5s)
    setTimeout(() => {
      // Route to the Persona Result page
      // Default to a specific persona if none matches exactly yet
      const targetSlug = state.persona || 'bestmed-beat2-savings-starter-2026';
      router.push(`/personas/${targetSlug}?income=${state.income}`);
    }, 2500);
  };

  const TICKER_MESSAGES = [
    "Analyzing 2026 Scheme Rules...",
    "Calculating Income Cliff Risks...",
    "Verifying Network Geofences...",
    "Checking Oncology Sub-limits...",
    "Optimizing Savings Efficiency..."
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50/50 animate-page-enter">

      {/* BACKGROUND: Neural Network Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[10%] right-[-20%] w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[100px] animate-float-delayed" />
      </div>

      {/* HEADER */}
      <header className="relative z-10 px-6 pt-12 pb-4 flex justify-between items-center max-w-3xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-900/20">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <span className="font-black text-slate-900 tracking-tight text-lg">HealthOS</span>
        </div>
        <button className="p-2 bg-white/60 backdrop-blur rounded-full border border-white/50 shadow-sm active:scale-95 transition-transform">
          <Bell className="w-5 h-5 text-slate-600" />
        </button>
      </header>

      {/* CORE INTERFACE */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[65vh] px-4 max-w-3xl mx-auto w-full">

        {view === 'input' ? (
          <div className="w-full animate-in fade-in zoom-in duration-500">
            {/* THE NARRATIVE INPUT (Mad Libs) */}
            {/* FIX: Passed the onAnalyze prop here */}
            <MagicSearch onAnalyze={handleDiagnosisStart} />

            {/* Social Proof / Trust Indicators */}
            <div className="mt-12 flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <ShieldAlert className="w-4 h-4" /> 2026 Rules Engine
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Activity className="w-4 h-4" /> Actuary Validated
              </div>
            </div>
          </div>
        ) : (
          /* PROCESSING STATE */
          <div className="w-full max-w-md text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="w-24 h-24 bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 mx-auto mb-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-50/50 animate-pulse" />
              <Zap className="w-10 h-10 text-blue-600 relative z-10 animate-[bounce_1s_infinite]" />
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-2">Running Diagnosis...</h2>

            <div className="h-8 mb-8">
              <TrustTicker messages={TICKER_MESSAGES} />
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 w-1/2 animate-[translateX_1.5s_ease-in-out_infinite]" />
            </div>
            <p className="text-xs text-slate-400 mt-6 font-medium">Applying Mathematical Uniqueness Principle...</p>
          </div>
        )}

      </div>

      {/* FOOTER: SEO Anchor (Hidden during processing to reduce noise) */}
      {view === 'input' && (
        <section className="px-6 pb-32 relative z-10 max-w-3xl mx-auto w-full animate-in slide-in-from-bottom-4 delay-300">
          <DailyInsight
            term="The Income Cliff"
            definition="A specific threshold in scheme rules (e.g. R9,000 pm) where a R1 salary increase triggers a disproportionate premium hike."
            source="HealthOS Actuarial Database"
          />
        </section>
      )}

      <PinsFab />

    </main >
  );
}