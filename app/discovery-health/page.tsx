import { Metadata } from 'next';
import AppHeader from '@/components/AppHeader';
import FeaturedPlans from '@/components/home/FeaturedPlans';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Discovery Health Plans 2026 | Intellihealth',
    description: 'Browse all 2026 Discovery Health medical aid plans. Compare benefits, premiums, and hospital cover.',
};

export default function DiscoveryHealthIndex() {
    return (
        <main className="min-h-screen bg-slate-50 relative font-sans">
            <AppHeader />

            <div className="pt-32 pb-12 bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h1 className="text-4xl font-black text-slate-900 mb-4">
                        Discovery Health Plans
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl">
                        Comprehensive guide to 2026 benefits and contributions.
                    </p>
                </div>
            </div>

            <FeaturedPlans />
        </main>
    );
}
