import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PlanRuleRepositoryAsync, ProcedureRepositoryAsync } from '@/lib/risk/discovery-resolver-async';
import { getDiscoveryPlanSlugs } from '@/utils/db';
import AppHeader from '@/components/AppHeader';
import { Activity, ArrowRight, LayoutGrid, AlertCircle, Users } from 'lucide-react';

interface PageProps {
    params: Promise<{ planSlug: string }>;
}

// Plan series grouping for "Related Plans" section
const PLAN_SERIES_GROUPS: Record<string, string[]> = {
    'Smart': ['smart-classic', 'smart-essential', 'smart-essential-dynamic', 'smart-active'],
    'Smart Saver': ['smart-saver-classic', 'smart-saver-essential'],
    'Core': ['core-classic', 'core-essential', 'core-coastal', 'core-classic-delta', 'core-essential-delta'],
    'KeyCare': ['keycare-plus', 'keycare-core', 'keycare-start', 'keycare-start-regional'],
    'Priority': ['priority-classic', 'priority-classic-essential'],
    'Saver': ['saver-classic', 'saver-classic-delta', 'saver-essential', 'saver-essential-delta', 'saver-coastal'],
    'Executive': ['executive'],
    'Comprehensive': ['comprehensive-classic', 'comprehensive-classic-smart'],
};

// Get series name from slug
function getSeriesFromSlug(slug: string): string {
    for (const [series, slugs] of Object.entries(PLAN_SERIES_GROUPS)) {
        if (slugs.includes(slug)) return series;
    }
    return 'Other';
}

export async function generateStaticParams() {
    const planSlugs = await getDiscoveryPlanSlugs();
    return planSlugs.map(({ slug }) => ({ planSlug: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { planSlug } = await params;
    const planId = await PlanRuleRepositoryAsync.getPlanIdFromSlug(planSlug);
    const plan = planId ? await PlanRuleRepositoryAsync.getRuleForPlan(planId) : null;

    if (!plan) return { title: 'Plan Not Found' };

    const canonicalUrl = `https://www.intellihealth.co.za/discovery-health/${planSlug}`;

    return {
        title: `${plan.plan_name} Benefits & Co-Payments (2026) | Discovery Health`,
        description: `Complete benefit guide for Discovery Health ${plan.plan_name}. Check co-payments for Gastroscopy, MRI, Hip Replacement, and ${plan.network_type} network hospital rules.`,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${plan.plan_name} Benefits & Co-Payments`,
            description: `2026 benefit rules for Discovery Health ${plan.plan_name}`,
            type: 'website',
            siteName: 'Intellihealth',
            url: canonicalUrl,
        },
    };
}

export default async function PlanHubPage({ params }: PageProps) {
    const { planSlug } = await params;
    const planId = await PlanRuleRepositoryAsync.getPlanIdFromSlug(planSlug);
    const plan = planId ? await PlanRuleRepositoryAsync.getRuleForPlan(planId) : null;

    if (!plan) notFound();

    // Get all procedures from database
    const allProcedures = await ProcedureRepositoryAsync.getAll();
    const procedures = allProcedures; // All procedures available
    const categories = Array.from(new Set(procedures.map(p => p.category)));

    // Get related plans in the same series
    const currentSeries = getSeriesFromSlug(planSlug);
    const seriesPlans = PLAN_SERIES_GROUPS[currentSeries] || [];
    const relatedPlans: { slug: string; name: string; networkType: string }[] = [];

    for (const slug of seriesPlans) {
        if (slug === planSlug) continue;
        const id = await PlanRuleRepositoryAsync.getPlanIdFromSlug(slug);
        if (!id) continue;
        const rule = await PlanRuleRepositoryAsync.getRuleForPlan(id);
        if (rule) {
            relatedPlans.push({ slug, name: rule.plan_name, networkType: rule.network_type });
        }
    }

    // JSON-LD Structured Data
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'HealthInsurancePlan',
            'name': `Discovery Health ${plan.plan_name}`,
            'planType': plan.plan_series,
            'benefitsSummary': `${plan.plan_name} from Discovery Health Medical Scheme - ${plan.network_type} network coverage`,
            'usesHealthPlanIdStandard': 'https://schema.org/HealthPlanFormulary',
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
                { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.intellihealth.co.za/' },
                { '@type': 'ListItem', 'position': 2, 'name': 'Discovery Health', 'item': 'https://www.intellihealth.co.za/discovery-health' },
                { '@type': 'ListItem', 'position': 3, 'name': plan.plan_name, 'item': `https://www.intellihealth.co.za/discovery-health/${planSlug}` },
            ]
        }
    ];

    return (
        <>
            {jsonLd.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}

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

                    {/* 2. PROCEDURE DIRECTORY */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
                            <LayoutGrid className="w-5 h-5 text-slate-400" />
                            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                                Procedure Cost Directory
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
                                            href={`/discovery-health/${planSlug}/${proc.id}`}
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
                                                        View 2026 Co-Payment
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

                    {/* 3. RELATED PLANS IN SERIES */}
                    {relatedPlans.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="w-5 h-5 text-blue-500" />
                                <h2 className="font-bold text-slate-800">
                                    Other {currentSeries} Series Plans
                                </h2>
                            </div>
                            <p className="text-sm text-slate-500 mb-4">
                                Compare co-payments across all {currentSeries} Series options:
                            </p>
                            <div className="grid md:grid-cols-2 gap-3">
                                {relatedPlans.map(relPlan => (
                                    <Link
                                        key={relPlan.slug}
                                        href={`/discovery-health/${relPlan.slug}`}
                                        className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-all"
                                    >
                                        <div>
                                            <p className="font-semibold text-slate-700 group-hover:text-blue-700">
                                                {relPlan.name}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                {relPlan.networkType} Network
                                            </p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 4. NETWORK WARNING CARD */}
                    <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm h-fit">
                            <AlertCircle className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                            <h4 className="font-bold text-amber-900 mb-1">
                                Important: {plan.network_type.toUpperCase()} Network Rules
                            </h4>
                            <p className="text-sm text-amber-800/80 leading-relaxed">
                                This plan restricts you to the <strong>{plan.network_type}</strong> hospital network.
                                Voluntary admission to a non-network facility will trigger a
                                <span className="font-black"> R{plan.deductibles.penalty_non_network.toLocaleString()} </span>
                                penalty deductible. Always check your hospital status before admission.
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}

