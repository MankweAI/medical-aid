import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PlanRuleRepository, ProcedureRepository } from '@/lib/risk/resolver';
import AppHeader from '@/components/AppHeader';
import { Shield, Activity, ArrowRight, LayoutGrid, AlertCircle } from 'lucide-react';

interface PageProps {
    params: Promise<{ schemeSlug: string; planSlug: string }>;
}

export async function generateStaticParams() {
    const plans = PlanRuleRepository.getAllRules();
    // Assuming 'discovery-health' is the only scheme for now
    return plans.map(p => ({
        schemeSlug: 'discovery-health',
        planSlug: p.plan_id
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { planSlug } = await params;
    const plan = PlanRuleRepository.getRuleForPlan(planSlug);

    if (!plan) return { title: 'Plan Not Found' };

    return {
        title: `${plan.plan_name} Benefits & Co-Payments (2026 Rules)`,
        description: `Complete benefit guide for the ${plan.plan_name}. Check co-payments for Gastroscopy, MRI, Hip Replacement, and network hospital rules.`,
    };
}

export default async function PlanHubPage({ params }: PageProps) {
    const { schemeSlug, planSlug } = await params;
    const plan = PlanRuleRepository.getRuleForPlan(planSlug);

    if (!plan) notFound();

    // Group available procedures by Category for a clean layout
    const procedures = ProcedureRepository.getAll().filter(p =>
        plan.available_procedure_ids?.includes(p.id)
    );

    const categories = Array.from(new Set(procedures.map(p => p.category)));

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <AppHeader />

            <div className="max-w-4xl mx-auto pt-8 px-4 space-y-10">

                {/* 1. PLAN HEADER */}
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-emerald-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-200">
                                {plan.plan_series} Series
                            </span>
                            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                {plan.network_type} Network
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                            {plan.plan_name}
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                            The <strong>{plan.plan_name}</strong> is a {plan.plan_series}-tier option.
                            Below are the specific 2026 co-payment rules for key medical procedures verified for this plan.
                        </p>
                    </div>
                </div>

                {/* 2. PROCEDURE DIRECTORY (Grid by Category) */}
                <div className="space-y-8">
                    <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
                        <LayoutGrid className="w-5 h-5 text-slate-400" />
                        <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                            Procedure Risk Directory
                        </h2>
                    </div>

                    {categories.map(cat => (
                        <div key={cat} className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-800 capitalize pl-2 border-l-4 border-emerald-500">
                                {cat.replace('_', ' ')}
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                {procedures.filter(p => p.category === cat).map(proc => (
                                    <Link
                                        key={proc.id}
                                        href={`/schemes/${schemeSlug}/${planSlug}/${proc.id}`}
                                        className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-emerald-50 transition-colors">
                                                <Activity className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-700 group-hover:text-slate-900">
                                                    {proc.label}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    View 2026 Liability
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. NETWORK WARNING CARD */}
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm h-fit">
                        <AlertCircle className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                        <h4 className="font-bold text-amber-900 mb-1">
                            Important: {plan.network_type.toUpperCase()} Network Rules
                        </h4>
                        <p className="text-sm text-amber-800/80 leading-relaxed">
                            This plan strictly restricts you to the <strong>{plan.network_type}</strong> hospital network.
                            Voluntary admission to a non-network facility will trigger a
                            <span className="font-black"> R{plan.deductibles.penalty_non_network.toLocaleString()} </span>
                            penalty deductible. Always check your hospital status before admission.
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}