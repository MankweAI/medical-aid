// app/page.tsx
import Link from 'next/link';
import { ArrowRight, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import TrustTicker from '@/components/TrustTicker';

const HOME_TICKER = [
  "New: Maternity Cost Simulator 2026",
  "Updated: Diabetes Chronic Pathways",
  "Verified: Coastal Network Savings"
];

const SIMULATION_CARDS = [
  {
    title: "Having a Baby",
    desc: "Simulate a private birth plan. See exactly what you'll pay cash for.",
    icon: "👶",
    link: "/simulate/maternity-first-2026",
    color: "bg-rose-50 text-rose-600 border-rose-100"
  },
  {
    title: "Chronic Care",
    desc: "Stress-test your chronic benefits against state vs private providers.",
    icon: "💊",
    link: "/simulate/chronic-diabetes-type2",
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    title: "Budget Optimization",
    desc: "Find the mathematical sweet spot for healthy families.",
    icon: "💰",
    link: "/simulate/boncap-lowest-band-single-2026",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100"
  }
];

export default function AppHome() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50/50 flex flex-col">

      {/* 1. Header */}
      <header className="px-6 pt-8 pb-4 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <span className="font-black text-slate-900 tracking-tight text-lg">HealthOS</span>
        </div>
      </header>

      {/* 2. Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 relative z-10 -mt-10">
        <div className="text-center max-w-xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3 h-3" />
            Virtual Actuary v2.0
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Don't guess.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Simulate it.</span>
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Most people overpay for medical aid. Run a <strong>clinical stress test</strong> on your 2026 strategy before you sign.
          </p>
        </div>

        {/* 3. Simulation Launcher Grid */}
        <div className="w-full max-w-md space-y-4">
          {SIMULATION_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.link}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all active:scale-[0.98] group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border ${card.color}`}>
                {card.icon}
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 leading-tight mt-1 pr-4">
                  {card.desc}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
            </Link>
          ))}
        </div>

        {/* 4. Ticker */}
        <div className="mt-12 w-full flex justify-center">
          <TrustTicker messages={HOME_TICKER} />
        </div>
      </div>

      {/* 5. Footer Anchor */}
      <div className="py-8 text-center">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          Powered by CMS Registered Data
        </p>
      </div>

    </main >
  );
}