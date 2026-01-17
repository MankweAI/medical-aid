import { Metadata } from 'next';
import AppHeader from '@/components/AppHeader';
import HomeHero from '@/components/home/HomeHero';
import DailyInsight from '@/components/DailyInsight';
import { ShieldCheck, Activity, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Intellihealth | Virtual Actuary for Medical Aid',
  description: 'Navigate 70+ medical aid plans with confidence. Compare benefits, prices, and find your ideal match for 2026 using algorithmic analysis.',
};

interface HomePageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function AppHome({ searchParams }: HomePageProps) {
  const params = await searchParams;
  // Category filter legacy support removed, keeping params parsing for safety if needed later

  return (
    <main className="min-h-screen bg-slate-50 relative font-sans overflow-x-hidden">
      <AppHeader />

      {/* 1. HERO SECTION: Clean, Topographic, Light Theme */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">

        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50/50 via-slate-50 to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />
          <div className="absolute top-40 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 max-w-6xl">
          {/* MAIN HERO COMPONENT */}
          <HomeHero />
        </div>
      </div>

      {/* 2. VALUE PROPOSITION / INSIGHT SECTION */}
      <section className="relative z-10 bg-white border-t border-slate-100 py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">
              Why Trust This Engine?
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Independent, Algorithmic Analysis
            </h3>
            <p className="text-slate-500 leading-relaxed">
              We don't sell data. We simply reverse-engineer the complexity of medical aid rules to give you the upper hand.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600 mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Mathematical Precision</h4>
              <p className="text-sm text-slate-500">
                Rankings are based on liability matching, not marketing budgets. We calculate potential out-of-pocket costs for your specific profile.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Regulatory Compliance</h4>
              <p className="text-sm text-slate-500">
                Our dataset is strictly aligned with the Council for Medical Schemes (CMS) 2026 registered rules and benefit definitions.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-amber-500 mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Unbiased "Virtual Actuary"</h4>
              <p className="text-sm text-slate-500">
                This tool was created by Big Data Query to democratize access to actuarial advice. No hidden broker fees or preferential listings.
              </p>
            </div>
          </div>

          {/* DAILY INSIGHT INTEGRATION */}
          <div className="max-w-4xl mx-auto">
            <DailyInsight />
          </div>
        </div>
      </section>
    </main>
  );
}