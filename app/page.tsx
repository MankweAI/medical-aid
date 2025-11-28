import ActionDock from '@/components/ActionDock';
import MagicSearch from '@/components/MagicSearch';
import { Bell, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AppHome() {
  return (
    <main className="min-h-screen pb-32"> {/* Padding for Dock */}

      {/* 1. App Header (Good Morning) */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-end">
        <div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">HealthOS v1.0</p>
          <h1 className="text-3xl font-black text-slate-900">
            Hello, Guest
          </h1>
        </div>
        <button className="p-3 bg-white border border-slate-200 rounded-full shadow-sm active-press relative">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      {/* 2. Primary Action Card (The Magic Search) */}
      <section className="px-4 mb-10">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-6 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
          {/* Abstract Art */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16"></div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-blue-200 mb-4 border border-white/10">
              <Zap className="w-3 h-3 fill-current" /> AI Actuary Active
            </span>
            <h2 className="text-2xl font-bold mb-2">What is your health worry?</h2>
            <p className="text-slate-400 text-sm mb-6 max-w-xs">
              Tell us about pregnancy, chronic meds, or budget limits. We'll build a strategy.
            </p>

            {/* Embed the Magic Search Component here, simplified styling */}
            <MagicSearch />
          </div>
        </div>
      </section>

      {/* 3. Horizontal Scroll (Quick Actions) */}
      <section className="pl-6 mb-10">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Strategies</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pr-6 pb-4">

          {/* Card 1: Maternity */}
          <Link href="/personas/family-planner?need=maternity" className="min-w-[160px]">
            <div className="h-[200px] bg-white rounded-3xl border border-slate-100 p-5 flex flex-col justify-between shadow-sm active-press cursor-pointer">
              <div className="w-10 h-10 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600">
                👶
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Family <br />Planning</p>
                <p className="text-xs text-slate-400 mt-1">3 Plans matched</p>
              </div>
            </div>
          </Link>

          {/* Card 2: Chronic */}
          <Link href="/personas/chronic-warrior?need=chronic" className="min-w-[160px]">
            <div className="h-[200px] bg-white rounded-3xl border border-slate-100 p-5 flex flex-col justify-between shadow-sm active-press cursor-pointer">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                💊
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Chronic <br />Care</p>
                <p className="text-xs text-slate-400 mt-1">Gap Analysis</p>
              </div>
            </div>
          </Link>

          {/* Card 3: Budget */}
          <Link href="/personas/budget-conscious?sort=price" className="min-w-[160px]">
            <div className="h-[200px] bg-white rounded-3xl border border-slate-100 p-5 flex flex-col justify-between shadow-sm active-press cursor-pointer">
              <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                💸
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Budget <br />Saver</p>
                <p className="text-xs text-slate-400 mt-1">Under R1,500</p>
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* 4. Trust Indicator */}
      <section className="px-6">
        <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-2xl border border-blue-100">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
          <div>
            <p className="text-sm font-bold text-blue-900">Verified Data</p>
            <p className="text-xs text-blue-700">Updated for 2026 Benefit Year</p>
          </div>
        </div>
      </section>

      <ActionDock />
    </main>
  );
}