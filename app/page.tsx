import { Metadata } from 'next';
import AppHeader from '@/components/AppHeader';
import HomeHero from '@/components/home/HomeHero';
import DailyInsight from '@/components/DailyInsight';
import CategoryFilter from '@/components/CategoryFilter';
import { getPersonasByCategory } from '@/utils/db';

export const metadata: Metadata = {
  title: 'Intellihealth | Find Your Perfect Medical Aid',
  description: 'Navigate 70+ medical aid plans with confidence. Compare benefits, prices, and find your ideal match for 2026.',
};

interface HomePageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function AppHome({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const categoryFilter = params?.category || null;

  return (
    <main className="min-h-screen bg-slate-50 relative selection:bg-emerald-500/30 font-sans overflow-x-hidden">
      <AppHeader />

      {/* 1. ATMOSPHERIC HERO BACKGROUND (Redesigned Position) */}
      <div className="relative h-[85vh] min-h-[700px] w-full bg-slate-900 overflow-hidden">
        {/* The Image: Positioned at Top 30% to keep subjects visible */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/home-page-backround.jpg"
            alt="Healthcare lifestyle"
            className="w-full h-full object-cover object-[center_30%] opacity-60 scale-105"
          />

          {/* Strategic Gradients for Readability */}
          {/* Top Mask: Ensures Header visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-transparent to-transparent" />

          {/* Side Mask: Provides contrast for the HomeHero text */}
          <div className="absolute inset-y-0 left-0 w-full md:w-1/2 bg-gradient-to-r from-slate-900/40 to-transparent" />

          {/* Bottom Mask: Deep blend into the page body */}
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent" />
        </div>

        {/* HERO CONTENT CONTAINER */}
        <div className="relative z-10 h-full pt-32 px-4 container mx-auto max-w-6xl flex flex-col">
          {/* CATEGORY FILTER - Positioned relative to hero text */}
          {categoryFilter && (async () => {
            const personas = await getPersonasByCategory(categoryFilter);
            return (
              <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
                <CategoryFilter category={categoryFilter} personas={personas} />
              </div>
            );
          })()}

          {/* CENTRAL INTERACTION LAYER */}
          <div className="flex-1 flex flex-col justify-center pb-24">
            <HomeHero />
          </div>
        </div>
      </div>

      {/* 2. OVERLAP SECTION (The "Decision Stack" Visual) */}
      <div className="relative z-20 -mt-20 px-4 container mx-auto max-w-6xl pb-20">
        <div className="max-w-4xl mx-auto">
          {/* ACTUARIAL INSIGHT CARD - Integrated with Negative Margin */}
          <div className="relative group">
            {/* Subtle glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />

            <div className="bg-white/95 border border-white rounded-[2rem] p-2 backdrop-blur-3xl shadow-2xl shadow-slate-900/10 relative hover:shadow-emerald-900/5 transition-all">
              <DailyInsight />
            </div>
          </div>

          {/* Trust Footer/Logo Area */}
          <div className="mt-12 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
              Powered by Actuarial Intelligence
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}