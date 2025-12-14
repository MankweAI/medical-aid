import { Metadata } from 'next';
import Link from 'next/link';
import HomeHero from '@/components/home/HomeHero';
import DailyInsight from '@/components/DailyInsight';
import PinsFab from '@/components/PinsFab';
import AppHeader from '@/components/AppHeader';
import { ArrowRight, BookOpen, Database, LayoutGrid } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { Persona } from '@/utils/persona';

export const metadata: Metadata = {
  title: 'HealthOS | Medical Strategy Console',
  description: 'Access the 2026 Virtual Actuary engine. Calculate risk, compare premiums, and verify benefits.',
};

export default async function AppHome() {
  const supabase = await createClient();
  const { data: rows } = await supabase.from('personas').select('data');
  const directory = rows?.map(r => r.data as Persona) || [];

  return (
    <main className="min-h-screen relative bg-slate-50/50 pb-20">
      <AppHeader />

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="pt-32 px-6 container mx-auto max-w-5xl">

        {/* 1. THE UTILITY (Hero) */}
        <HomeHero />

        {/* 2. THE DIRECTORY (Cluster Strategy) */}
        {/* This serves users who know what they want and Google bots needing links */}
        <section className="mt-24 border-t border-slate-200 pt-12">
          <div className="flex items-center gap-2 mb-8">
            <LayoutGrid className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              Strategy Index
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {directory.map((persona) => (
              <Link
                key={persona.slug}
                href={`/personas/${persona.slug}`}
                className="group block bg-white hover:bg-emerald-50/50 p-5 rounded-xl border border-slate-200 hover:border-emerald-200 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded uppercase tracking-wider">
                    {persona.meta.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-transform group-hover:translate-x-1" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1 group-hover:text-emerald-900">
                  {persona.meta.marketing_heading}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {persona.meta.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. THE KNOWLEDGE BASE (Authority Signals) */}
        <section className="mt-16 grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Latest Insight
              </h3>
            </div>
            <DailyInsight />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <Database className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                System Status
              </h3>
            </div>
            <div className="bg-slate-900 text-slate-400 p-6 rounded-3xl text-xs font-mono leading-relaxed shadow-lg">
              <p className="mb-2"><span className="text-emerald-400">✓</span> 2026 Pricing Loaded</p>
              <p className="mb-2"><span className="text-emerald-400">✓</span> Network Lists Verified</p>
              <p className="mb-2"><span className="text-emerald-400">✓</span> Co-payment Tables Active</p>
              <div className="mt-4 pt-4 border-t border-slate-800 text-slate-500">
                Last Index Update: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </section>

      </div>
      <PinsFab />
    </main>
  );
}