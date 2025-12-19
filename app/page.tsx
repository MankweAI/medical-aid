import { Metadata } from 'next';
import AppHeader from '@/components/AppHeader';
import HomeHero from '@/components/home/HomeHero';
import DailyInsight from '@/components/DailyInsight';
import CategoryFilter from '@/components/CategoryFilter';

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
    <main className="min-h-screen bg-slate-50 relative selection:bg-emerald-500/30 font-sans overflow-hidden">
      <AppHeader />

      {/* V2 HERO BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/placeholder.jpg"
          alt="Healthcare lifestyle"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-50" />
        {/* Soft blur at bottom for seamless transition */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-50 to-transparent" />
      </div>

      <div className="relative z-10 pt-32 px-4 container mx-auto max-w-6xl flex flex-col min-h-[calc(100vh-100px)]">

        {/* CATEGORY FILTER (when arriving from breadcrumb) */}
        {categoryFilter && (
          <CategoryFilter category={categoryFilter} />
        )}

        {/* 1. THE CONSOLE (Central Interaction Layer) */}
        <div className="flex-1 flex flex-col justify-center pb-12">
          <HomeHero />
        </div>

        {/* 2. ACTUARIAL INSIGHT CARD */}
        <div className="pb-12">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-700" />

            <div className="bg-white/80 border border-white/60 rounded-2xl p-1.5 backdrop-blur-xl shadow-lg relative hover:shadow-xl transition-all">
              <DailyInsight />
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}