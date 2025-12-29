import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BestmedPlanRepositoryAsync, BestmedProcedureRepositoryAsync } from '@/lib/risk/bestmed-resolver-async';
import { getBestmedPlanSlugs } from '@/utils/db';
import AppHeader from '@/components/AppHeader';
import { Activity, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

interface PageProps {
    params: Promise<{ planSlug: string }>;
}

export async function generateStaticParams() {
    const planSlugs = await getBestmedPlanSlugs();
    return planSlugs.map(({ slug }) => ({ planSlug: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { planSlug } = await params;
    const planId = await BestmedPlanRepositoryAsync.getPlanIdFromSlug(planSlug);
    const plan = planId ? await BestmedPlanRepositoryAsync.getPlanById(planId) : null;

    if (!plan) return { title: 'Plan Not Found' };

    const canonicalUrl = `https://www.intellihealth.co.za/bestmed/${planSlug}`;

    return {
        title: `${plan.planName} Benefits & Co-Payments (2026) | Bestmed`,
        description: `Complete benefit guide for Bestmed ${plan.planName}. Check co-payments for Gastroscopy, MRI, Hip Replacement, and hospital procedure rules.`,
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export default async function BestmedPlanHubPage({ params }: PageProps) {
    const { planSlug } = await params;
    const planId = await BestmedPlanRepositoryAsync.getPlanIdFromSlug(planSlug);
    const plan = planId ? await BestmedPlanRepositoryAsync.getPlanById(planId) : null;

    if (!plan) notFound();

    // Get all procedures from database
    const allProcedures = await BestmedProcedureRepositoryAsync.getAll();
    const categories = Array.from(new Set(allProcedures.map(p => p.category)));

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'HealthInsurancePlan',
        'name': `Bestmed ${plan.planName}`,
        'planType': `${plan.series} Tier ${plan.tier}`,
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <main className="min-h-screen bg-slate-50 pb-20">
                <AppHeader />

                <div className="max-w-4xl mx-auto pt-8 px-4 space-y-10">

                    {/* Back Navigation */}
                    <Link
                        href="/bestmed"
                        className="group inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors"
                    >
                        <div className="p-1.5 bg-white rounded-lg border border-slate-200 group-hover:border-slate-300 shadow-sm">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        Back to All Bestmed Plans
                    </Link>

                    {/* Plan Header */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                    {plan.series} Tier {plan.tier}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-200">
                                    {plan.networkOption}
                                </span>
                            </div>

                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
                                {plan.planName}
                            </h1>
                            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                                {plan.planType} from Bestmed Medical Scheme.
                                Below are the 2026 co-payment rules for common procedures.
                            </p>
                        </div>
                    </div>

                    {/* Procedure Directory */}
                    <div className="space-y-8">
                        {categories.map(cat => (
                            <div key={cat} className="space-y-4">
                                <h3 className="text-xl font-bold text-slate-800 capitalize pl-2 border-l-4 border-blue-500">
                                    {cat.replace('_', ' ')}
                                </h3>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {allProcedures.filter(p => p.category === cat).map(proc => (
                                        <Link
                                            key={proc.id}
                                            href={`/bestmed/${planSlug}/${proc.id}`}
                                            className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                                                    <Activity className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-700 group-hover:text-slate-900">
                                                        {proc.label}
                                                    </p>
                                                    <p className="text-xs text-slate-400">
                                                        View 2026 Co-Payment
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Network Warning */}
                    <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm h-fit">
                            <AlertCircle className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                            <h4 className="font-bold text-amber-900 mb-1">
                                Network Hospital Requirements
                            </h4>
                            <p className="text-sm text-amber-800/80 leading-relaxed">
                                Voluntary use of a non-network hospital will trigger a
                                <span className="font-black"> R{plan.copayments.nonNetworkHospital.toLocaleString()} </span>
                                co-payment. Always verify your hospital is in the Bestmed network before admission.
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}
