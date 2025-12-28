import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
    RiskResolverAsync,
    ProcedureRepositoryAsync,
    PlanRuleRepositoryAsync,
    initializeResolver
} from '@/lib/risk/discovery-resolver-async';
import { getDiscoveryPlanSlugs, getDiscoveryProcedures } from '@/utils/db';
import { LiabilityCard } from '@/components/risk/LiabilityCard';
import { ProcedureCTAs } from '@/components/risk/ProcedureCTAs';
import { ExpertCTA } from '@/components/risk/ExpertCTA';
import AppHeader from '@/components/AppHeader';
import { ArrowLeft, Activity, GitCompare, ArrowRight, HelpCircle, ChevronDown } from 'lucide-react';

interface PageProps {
    params: Promise<{ planSlug: string; procedureSlug: string }>;
}

// Plan series grouping for "Compare Plans" section (static configuration)
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
    // Fetch from database
    const [planSlugs, procedures] = await Promise.all([
        getDiscoveryPlanSlugs(),
        getDiscoveryProcedures()
    ]);

    const paths: { planSlug: string; procedureSlug: string }[] = [];

    planSlugs.forEach(({ slug }) => {
        procedures.forEach(proc => {
            paths.push({ planSlug: slug, procedureSlug: proc.id });
        });
    });

    return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { planSlug, procedureSlug } = await params;

    try {
        const audit = await RiskResolverAsync.resolve(planSlug, procedureSlug);
        const cost = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(audit.liability);

        const canonicalUrl = `https://www.intellihealth.co.za/discovery-health/${planSlug}/${procedureSlug}`;
        const title = `${audit.procedure.label} Cost on ${audit.plan.plan_name} | ${cost} Co-payment`;
        const description = `Calculate your ${audit.procedure.label} hospital co-payment on Discovery Health ${audit.plan.plan_name}. 2026 liability: ${cost}. Network rules, PMB exemptions, and Gap Cover options.`;

        return {
            title,
            description,
            alternates: {
                canonical: canonicalUrl,
            },
            openGraph: {
                title,
                description,
                type: 'article',
                siteName: 'Intellihealth',
                url: canonicalUrl,
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
            },
        };
    } catch {
        return { title: 'Procedure Cost Calculator | Intellihealth' };
    }
}

export default async function ProcedureLeafPage({ params }: PageProps) {
    const { planSlug, procedureSlug } = await params;

    let audit;
    try {
        audit = await RiskResolverAsync.resolve(planSlug, procedureSlug);
    } catch (error) {
        notFound();
    }

    // Get related procedures (same plan, different procedures)
    const allProcedures = await ProcedureRepositoryAsync.getAll();
    const relatedProcedures = allProcedures
        .filter(p => p.id !== procedureSlug)
        .slice(0, 4); // Show max 4 related procedures

    // Get comparable plans (same series, same procedure)
    const currentSeries = getSeriesFromSlug(planSlug);
    const seriesPlans = PLAN_SERIES_GROUPS[currentSeries] || [];
    const comparablePlans: { slug: string; name: string; cost: number }[] = [];

    for (const slug of seriesPlans) {
        if (slug === planSlug) continue;

        try {
            const compareAudit = await RiskResolverAsync.resolve(slug, procedureSlug);
            comparablePlans.push({
                slug,
                name: compareAudit.plan.plan_name,
                cost: compareAudit.liability
            });
        } catch {
            // Plan may not support this procedure or doesn't exist
        }

        if (comparablePlans.length >= 3) break;
    }

    // Generate dynamic FAQs based on plan + procedure
    const formatCurrency = (n: number) => n === 0 ? 'R0' : `R${n.toLocaleString()}`;

    const faqs = [
        {
            question: `How much does a ${audit.procedure.label} cost on ${audit.plan.plan_name}?`,
            answer: audit.liability === 0
                ? `A ${audit.procedure.label} is fully covered on the ${audit.plan.plan_name} plan when you use a ${audit.plan.network_type} network provider. There is no co-payment required.`
                : `On the ${audit.plan.plan_name}, you will pay an upfront co-payment of ${formatCurrency(audit.liability)} for a ${audit.procedure.label}. This applies when using a ${audit.plan.network_type} network facility.`
        },
        {
            question: `Is a ${audit.procedure.label} covered by Discovery Health ${audit.plan.plan_name}?`,
            answer: `Yes, a ${audit.procedure.label} is covered under the ${audit.plan.plan_name} hospital benefit. ${audit.liability > 0 ? `However, you will need to pay an upfront co-payment of ${formatCurrency(audit.liability)}.` : 'There is no co-payment when using network providers.'}`
        },
        {
            question: `What happens if I go out-of-network for a ${audit.procedure.label}?`,
            answer: `If you voluntarily use a non-network hospital for your ${audit.procedure.label}, you will face an additional penalty of ${formatCurrency(audit.plan.deductibles.penalty_non_network)} on top of any existing co-payments. Always verify your hospital is in the ${audit.plan.network_type} network before admission.`
        },
        {
            question: `Can I avoid co-payments for a ${audit.procedure.label} on ${audit.plan.plan_name}?`,
            answer: audit.liability === 0
                ? `You are already avoiding co-payments! On the ${audit.plan.plan_name}, there is no upfront payment required for a ${audit.procedure.label} when using network providers.`
                : `Co-payments can sometimes be avoided if the procedure qualifies as a Prescribed Minimum Benefit (PMB) condition. Check with Discovery Health if your specific diagnosis qualifies for PMB exemption.`
        },
        {
            question: `Does Gap Cover help with ${audit.procedure.label} costs on ${audit.plan.plan_name}?`,
            answer: audit.liability > 0
                ? `Yes, Gap Cover can help reduce your out-of-pocket costs. A good Gap Cover policy may reimburse some or all of the ${formatCurrency(audit.liability)} co-payment for your ${audit.procedure.label}. We recommend comparing Gap Cover options tailored to hospital procedures.`
                : `Since there is no co-payment for a ${audit.procedure.label} on the ${audit.plan.plan_name}, Gap Cover would primarily help with specialist shortfalls or tariff gaps rather than procedure deductibles.`
        }
    ];

    // JSON-LD Structured Data
    const medicalProcedureLd = {
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        'name': audit.procedure.label,
        'alternateName': audit.procedure.medical_term,
        'description': audit.procedure.description,
        'procedureType': 'https://schema.org/SurgicalProcedure',
        'howPerformed': 'Performed at hospital or day clinic facility',
        'preparation': audit.procedure.risk_notes,
        'followup': 'Consult with your healthcare provider',
        'status': 'https://schema.org/EventScheduled',
    };

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.intellihealth.co.za/' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Discovery Health', 'item': 'https://www.intellihealth.co.za/discovery-health' },
            { '@type': 'ListItem', 'position': 3, 'name': audit.plan.plan_name, 'item': `https://www.intellihealth.co.za/discovery-health/${planSlug}` },
            { '@type': 'ListItem', 'position': 4, 'name': audit.procedure.label, 'item': `https://www.intellihealth.co.za/discovery-health/${planSlug}/${procedureSlug}` },
        ]
    };

    // FAQPage JSON-LD for rich results
    const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer
            }
        }))
    };

    const formatCost = (amount: number) =>
        amount === 0 ? 'R0' : `R${amount.toLocaleString()}`;

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalProcedureLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

            <main className="min-h-screen bg-slate-50 pb-20">
                <AppHeader />
                <section className="max-w-3xl mx-auto pt-8 px-4 space-y-6">

                    {/* 1. NAVIGATION BREADCRUMB */}
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/discovery-health/${planSlug}`}
                            className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors"
                        >
                            <div className="p-1.5 bg-white rounded-lg border border-slate-200 group-hover:border-slate-300 shadow-sm transition-all">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            Back to {audit.plan.plan_name} Overview
                        </Link>
                    </div>

                    {/* 2. THE ANSWER ENGINE UI */}
                    <LiabilityCard audit={audit} />

                    {/* 3. MONETIZATION CTAs */}
                    <ProcedureCTAs
                        procedureName={audit.procedure.label}
                        planName={audit.plan.plan_name}
                        liability={audit.liability}
                        planId={audit.plan.plan_id}
                    />

                    {/* 4. COMPARE PLANS - Same Procedure on Different Plans */}
                    {comparablePlans.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <GitCompare className="w-5 h-5 text-blue-500" />
                                <h3 className="font-bold text-slate-800">
                                    Compare {audit.procedure.label} on Other {currentSeries} Plans
                                </h3>
                            </div>
                            <div className="grid gap-3">
                                {comparablePlans.map(plan => (
                                    <Link
                                        key={plan.slug}
                                        href={`/discovery-health/${plan.slug}/${procedureSlug}`}
                                        className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-all"
                                    >
                                        <div>
                                            <p className="font-semibold text-slate-700 group-hover:text-blue-700">
                                                {plan.name}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                {currentSeries} Series
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`font-bold ${plan.cost === 0 ? 'text-emerald-600' : 'text-slate-700'}`}>
                                                {formatCost(plan.cost)}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 5. RELATED PROCEDURES - Same Plan, Different Procedures */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="w-5 h-5 text-emerald-500" />
                            <h3 className="font-bold text-slate-800">
                                Other Procedures on {audit.plan.plan_name}
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            {relatedProcedures.map(proc => (
                                <Link
                                    key={proc.id}
                                    href={`/discovery-health/${planSlug}/${proc.id}`}
                                    className="group flex items-center justify-between p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition-all"
                                >
                                    <span className="font-medium text-slate-600 group-hover:text-emerald-700 text-sm">
                                        {proc.label}
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500" />
                                </Link>
                            ))}
                        </div>
                        <Link
                            href={`/discovery-health/${planSlug}`}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
                        >
                            View all procedures
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* 6. CONVERSION CTA */}
                    <div className="mt-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-center relative overflow-hidden">
                        {/* Background glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10 space-y-4">
                            <h3 className="text-2xl font-black text-white">
                                Need Help Choosing the Right Plan?
                            </h3>
                            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                                Our accredited specialists can help you find a plan that minimizes your hospital co-payments
                                and fits your budget — completely free, no obligation.
                            </p>
                            <ExpertCTA
                                planName={audit.plan.plan_name}
                                procedureName={audit.procedure.label}
                                planId={audit.plan.plan_id}
                            />
                            <p className="text-xs text-slate-500">
                                Trusted by 10,000+ South Africans
                            </p>
                        </div>
                    </div>

                    {/* 7. FAQ SECTION */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <HelpCircle className="w-5 h-5 text-purple-500" />
                            <h3 className="font-bold text-slate-800">
                                Frequently Asked Questions
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <details key={index} className="group">
                                    <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                                        <span className="font-medium text-slate-700 pr-4">
                                            {faq.question}
                                        </span>
                                        <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                                    </summary>
                                    <div className="px-4 pt-3 pb-1 text-sm text-slate-600 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>



                </section>
            </main>
        </>
    );
}

