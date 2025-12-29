import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getBestmedPlanSlugs } from '@/utils/db';
import AppHeader from '@/components/AppHeader';
import { ArrowRight, Shield, Activity } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Bestmed Medical Scheme | Co-Payment Calculator',
    description: 'Calculate your Bestmed hospital co-payments for 2026. Compare Beat, Pace, and Rhythm plans with accurate procedure costs.',
    alternates: {
        canonical: 'https://www.intellihealth.co.za/bestmed',
    },
};

// Group plans by series
function groupPlansBySeries(plans: { id: string; slug: string; series: string; tier: number }[]) {
    const groups: Record<string, typeof plans> = {};
    plans.forEach(plan => {
        const series = plan.series.charAt(0).toUpperCase() + plan.series.slice(1);
        if (!groups[series]) groups[series] = [];
        groups[series].push(plan);
    });
    return groups;
}

// Get display name from slug
function getDisplayName(slug: string): string {
    return slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
        .replace('Beat1', 'Beat 1')
        .replace('Beat2', 'Beat 2')
        .replace('Beat3', 'Beat 3')
        .replace('Beat4', 'Beat 4');
}

export default async function BestmedHubPage() {
    const planSlugs = await getBestmedPlanSlugs();
    const groupedPlans = groupPlansBySeries(planSlugs);

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <AppHeader />

            <div className="max-w-4xl mx-auto pt-8 px-4 space-y-10">

                {/* Hero Section */}
                <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/20 rounded-xl">
                                <Shield className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest text-blue-200">
                                Medical Scheme
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                            Bestmed
                        </h1>
                        <p className="text-lg text-blue-100 max-w-xl leading-relaxed">
                            Calculate your 2026 hospital co-payments across Beat, Pace, and Rhythm plans.
                            Get accurate costs for procedures before admission.
                        </p>
                    </div>
                </div>

                {/* Plan Directory */}
                <div className="space-y-8">
                    {Object.entries(groupedPlans).map(([series, plans]) => (
                        <div key={series} className="space-y-4">
                            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
                                <Activity className="w-5 h-5 text-blue-500" />
                                <h2 className="text-xl font-bold text-slate-800">
                                    {series} Series
                                </h2>
                                <span className="ml-auto text-sm text-slate-400">
                                    {plans.length} plan{plans.length > 1 ? 's' : ''}
                                </span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {plans.map(plan => (
                                    <Link
                                        key={plan.slug}
                                        href={`/bestmed/${plan.slug}`}
                                        className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all flex items-center justify-between"
                                    >
                                        <div>
                                            <p className="font-bold text-slate-800 group-hover:text-blue-700">
                                                {getDisplayName(plan.slug)}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">
                                                Tier {plan.tier} • View all procedures
                                            </p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    {Object.keys(groupedPlans).length === 0 && (
                        <div className="text-center py-12 text-slate-500">
                            <p>No plans available. Run the seed script to populate data.</p>
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}
