import ActionDock from '@/components/ActionDock';
import MagicSearch from '@/components/MagicSearch';
import TrustTicker from '@/components/TrustTicker'; // Reuse
import DailyInsight from '@/components/DailyInsight'; // Reuse
import { Bell, Zap } from 'lucide-react';

export default function AppHome() {
  const HUB_MESSAGES = [
    "Diagnosis complete: R20k Family Strategy",
    "Verified: Chronic Plan (JHB)",
    "Optimized: Budget Saver R1,400"
  ];

  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50/50">

      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[10%] right-[-20%] w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[100px] animate-float-delayed" />
      </div>

      {/* Header */}
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

      {/* Core Focus Mode */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-4">
        <MagicSearch />

        <div className="mt-8">
          <TrustTicker messages={HUB_MESSAGES} />
        </div>
      </div>

      {/* SEO Anchor */}
      <section className="px-6 pb-32 relative z-10">
        <DailyInsight
          term="Did you know?"
          definition="Prescribed Minimum Benefits (PMBs) are a set of defined benefits to ensure that all medical scheme members have access to certain minimum health services, regardless of the benefit option they have selected."
        />
      </section>

      <ActionDock />
    </main>
  );
}