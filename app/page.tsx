import { Metadata } from 'next';
import Link from 'next/link';
import HomeHero from '@/components/home/HomeHero';
import DailyInsight from '@/components/DailyInsight';
import PinsFab from '@/components/PinsFab';
import AppHeader from '@/components/AppHeader';
import GlassCard from '@/components/ui/GlassCard';
import { BookOpen, Database, ShieldCheck, TrendingUp, Cpu, Activity, User, Users, HeartPulse, ArrowRight } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'HealthOS | Medical Strategy Console',
  description: 'Access the 2026 Virtual Actuary engine. Calculate risk, compare premiums, and verify benefits.',
};

export default async function AppHome() {
  const supabase = await createClient();
  // We no longer need the directory fetch for the homepage

  return (
    <main className="min-h-screen relative bg-slate-50 overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-900">
      <AppHeader />

      {/* IMMERSIVE BACKGROUND (LIGHT MODE) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        {/* Gradient Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-emerald-200/40 rounded-full blur-[120px] animate-pulse duration-[10000ms]" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[1000px] h-[1000px] bg-blue-100/60 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 pt-32 px-6 container mx-auto max-w-6xl pb-24">

        {/* 1. THE UTILITY (Hero) */}
        <HomeHero />

        {/* 2. THE INTELLIGENCE GRID */}
        <section className="mt-24 grid md:grid-cols-12 gap-6 items-start">
          {/* LEFT: Daily Insight */}
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 mb-6 px-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Market Intelligence
              </h3>
            </div>
            <div className="relative group shadow-xl shadow-emerald-900/5 rounded-3xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative">
                <DailyInsight />
              </div>
            </div>
          </div>

          {/* RIGHT: System Status */}
          <div className="md:col-span-4 h-full">
            <div className="flex items-center gap-3 mb-6 px-2">
              <Database className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Engine Status
              </h3>
            </div>
            <GlassCard className="h-full p-6 flex flex-col justify-between min-h-[220px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-600 font-medium">
                  <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Pricing Rules</span>
                  <span className="text-emerald-600 font-mono text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">LOADED</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600 font-medium">
                  <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-600" /> Risk Index</span>
                  <span className="text-emerald-600 font-mono text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600 font-medium">
                  <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-emerald-600" /> Algorithm</span>
                  <span className="text-emerald-600 font-mono text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">OPTIMAL</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[10px] font-mono text-slate-400 uppercase tracking-widest flex justify-between">
                <span>Last Sync</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* 3. OPTIMIZATION VECTORS (REPLACED PERSONA DIRECTORY) */}
        <section className="mt-24 pt-12 border-t border-slate-200/50">
          <div className="flex items-center gap-3 mb-10 px-2 justify-center text-center">
            <Activity className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              Select Your Optimization Vector
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* 1. EFFICIENCY PROTOCOL */}
            <GlassCard hoverEffect={true} className="p-8 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <User className="w-24 h-24 text-emerald-600 rotate-12" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Efficiency Protocol</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  For healthy individuals prioritizing solvency. Minimizes premium drag through aggressive network usage.
                </p>
                <button className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                  Initialize <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </GlassCard>

            {/* 2. PROTECTION MATRIX */}
            <GlassCard hoverEffect={true} className="p-8 group relative overflow-hidden ring-1 ring-emerald-500/20 bg-emerald-50/50">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users className="w-24 h-24 text-emerald-600 rotate-12" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Protection Matrix</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  For families requiring broad solvency buffers. Balances Gap Cover arbitrage with savings account liquidity.
                </p>
                <button className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                  Initialize <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </GlassCard>

            {/* 3. RISK SHIELD */}
            <GlassCard hoverEffect={true} className="p-8 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <HeartPulse className="w-24 h-24 text-emerald-600 rotate-12" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Risk Shield</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  High-probability claim structures. Prioritizes unrestricted access to specialists and chronic baskets.
                </p>
                <button className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                  Initialize <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </GlassCard>

          </div>
        </section>

      </div>
      <PinsFab />
    </main>
  );
}