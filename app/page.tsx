import ActionDock from '@/components/ActionDock';
import MagicSearch from '@/components/MagicSearch';
import { Bell, ShieldCheck, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function AppHome() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50/50">

      {/* 1. BACKGROUND: The "Neural Network" */}
      {/* Floating Orbs - Pure CSS Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[10%] right-[-20%] w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[100px] animate-float-delayed" />
      </div>

      {/* 2. HEADER: Minimalist */}
      <header className="relative z-10 px-6 pt-12 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-white">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <span className="font-black text-slate-900 tracking-tight text-lg">HealthOS</span>
        </div>
        <button className="p-2 bg-white/50 backdrop-blur rounded-full border border-white/50 shadow-sm active:scale-95 transition-transform">
          <Bell className="w-5 h-5 text-slate-600" />
        </button>
      </header>

      {/* 3. CORE: The Focus Mode */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-4">

        {/* The Magic Search (Statement Builder) */}
        <MagicSearch />

        {/* 4. THE TRUST TICKER (Social Proof) */}
        <div className="mt-8 flex flex-col items-center space-y-3">
          <div className="h-8 overflow-hidden relative">
            <div className="flex flex-col items-center animate-ticker">
              {/* Ticker Item 1 */}
              <div className="h-8 flex items-center gap-2 text-xs font-medium text-slate-500 bg-white/60 px-3 rounded-full border border-white/50 shadow-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Diagnosis complete: <span className="font-bold text-slate-700">R20k Family Strategy</span>
              </div>
              {/* Ticker Item 2 */}
              <div className="h-8 flex items-center gap-2 text-xs font-medium text-slate-500 bg-white/60 px-3 rounded-full border border-white/50 shadow-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Verified: <span className="font-bold text-slate-700">Chronic Plan (JHB)</span>
              </div>
              {/* Ticker Item 3 */}
              <div className="h-8 flex items-center gap-2 text-xs font-medium text-slate-500 bg-white/60 px-3 rounded-full border border-white/50 shadow-sm">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                Optimized: <span className="font-bold text-slate-700">Budget Saver R1,400</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 5. FOOTER: The SEO Anchor (Below Fold) */}
      <section className="px-6 pb-32 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-full text-blue-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Daily Actuary Insight</h3>
          </div>

          {/* Semantic HTML for SEO */}
          <dl>
            <dt className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Did you know?
            </dt>
            <dd className="text-sm text-slate-600 leading-relaxed font-medium">
              "Prescribed Minimum Benefits (PMBs) are a set of defined benefits to ensure that all medical scheme members have access to certain minimum health services, regardless of the benefit option they have selected."
            </dd>
          </dl>

          <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-400">Source: Council for Medical Schemes</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
        </div>
      </section>

    </main >
  );
}