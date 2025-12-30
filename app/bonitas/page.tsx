import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import AppHeader from '@/components/AppHeader';
import { ArrowRight, Shield, Activity } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Bonitas Medical Aid | Procedure Cost Calculator 2026',
    description: 'Calculate your hospital co-payments on Bonitas Medical Aid plans. BonCap, BonStart, Standard, Primary and more. 2026 benefits and costs.',
    alternates: {
        canonical: 'https://www.intellihealth.co.za/bonitas',
    },
};

// Plan series for display
const PLAN_SERIES = [
    {
        id: 'capitation',
        name: 'Capitation Plans',
        description: 'Income-based, network-focused',
        plans: [
            { slug: 'boncap', name: 'BonCap', tier: 'Network', highlight: false },
        ],
    },
    {
        id: 'complete',
        name: 'Complete Plans',
        description: 'Comprehensive benefits with savings',
        plans: [
            { slug: 'boncomprehensive', name: 'BonComprehensive', tier: 'Any Hospital', highlight: true },
            { slug: 'boncomplete', name: 'BonComplete', tier: 'Network + Savings', highlight: false },
            { slug: 'bonclassic', name: 'BonClassic', tier: 'Network + Savings', highlight: false },
        ],
    },
    {
        id: 'savings',
        name: 'Savings Plans',
        description: 'Hospital cover with flexible savings',
        plans: [
            { slug: 'bonsave', name: 'BonSave', tier: 'Network + High Savings', highlight: true },
            { slug: 'bonfit', name: 'BonFit', tier: 'Network + Savings', highlight: false },
        ],
    },
    {
        id: 'traditional',
        name: 'Traditional Plans',
        description: 'Balanced cover with savings',
        plans: [
            { slug: 'standard', name: 'Standard', tier: 'Any Hospital + Limit', highlight: false },
            { slug: 'standard-select', name: 'Standard Select', tier: 'Network + Limit', highlight: false },
            { slug: 'bonprime', name: 'BonPrime', tier: 'Network + Savings', highlight: false },
            { slug: 'primary', name: 'Primary', tier: 'Network + Limit', highlight: false },
        ],
    },
    {
        id: 'edge',
        name: 'Edge Plans',
        description: 'Essential hospital cover',
        plans: [
            { slug: 'bonessential', name: 'BonEssential', tier: 'Network', highlight: false },
            { slug: 'bonessential-select', name: 'BonEssential Select', tier: 'Network', highlight: false },
            { slug: 'bonstart', name: 'BonStart', tier: 'Network + Day Surgery', highlight: false },
            { slug: 'bonstart-plus', name: 'BonStart Plus', tier: 'Network + Day Surgery', highlight: false },
        ],
    },
    {
        id: 'hospital',
        name: 'Hospital Plans',
        description: 'Basic hospital cover, PMB-focused',
        plans: [
            { slug: 'boncore', name: 'BonCore', tier: 'Network + PMB', highlight: false },
            { slug: 'hospital-standard', name: 'Hospital Standard', tier: 'Network + Benefits', highlight: false },
        ],
    },
];

export default function BonitasHubPage() {
    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <AppHeader />

            <section className="max-w-4xl mx-auto pt-8 px-4">
                {/* Hero */}
                <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden mb-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Shield className="w-8 h-8 text-white/90" />
                            <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                                Bonitas Medical Aid
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
                            Procedure Cost Calculator
                        </h1>

                        <p className="text-red-100 max-w-xl mx-auto">
                            Calculate your 2026 hospital co-payments on Bonitas plans.
                            Select a plan below to see procedure costs.
                        </p>
                    </div>
                </div>

                {/* Plan Series Grid */}
                <div className="space-y-8">
                    {PLAN_SERIES.map(series => (
                        <div key={series.id}>
                            <div className="flex items-center gap-2 mb-4">
                                <Activity className="w-5 h-5 text-red-500" />
                                <h2 className="text-xl font-bold text-slate-800">
                                    {series.name}
                                </h2>
                            </div>

                            <p className="text-slate-500 text-sm mb-4">
                                {series.description}
                            </p>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {series.plans.map(plan => (
                                    <Link
                                        key={plan.slug}
                                        href={`/bonitas/${plan.slug}`}
                                        className={`group relative p-6 rounded-2xl border-2 transition-all ${plan.highlight
                                            ? 'bg-gradient-to-br from-red-50 to-white border-red-200 hover:border-red-400'
                                            : 'bg-white border-slate-200 hover:border-slate-300'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-slate-800 group-hover:text-red-600 transition-colors">
                                                    {plan.name}
                                                </h3>
                                                <p className="text-xs text-slate-400 mt-1">
                                                    {plan.tier}
                                                </p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-red-500 transition-colors" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coming Soon Notice */}
                <div className="mt-12 p-6 bg-slate-100 rounded-2xl border border-slate-200 text-center">
                    <p className="text-slate-500 text-sm">
                        More Bonitas plans coming soon: BonStart, Standard, Primary, BonComplete, and more.
                    </p>
                </div>
            </section>
        </main>
    );
}
