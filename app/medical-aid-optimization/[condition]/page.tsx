import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import AppHeader from '@/components/AppHeader';
import TrustFooter from '@/components/TrustFooter';
import SemanticGlossary from '@/components/SemanticGlossary';
import PeopleAlsoAsk from '@/components/PeopleAlsoAsk';
import {
    CONDITIONS,
    getAllConditionSlugs,
    getProceduresForCondition,
    type ConditionSlug,
} from '@/utils/condition-mapping';
import { getAllPlans, slugifyProcedure } from '@/lib/data-loader';
import { ContentGenerator, FINANCIAL_DISCLAIMER } from '@/utils/seo-content';
import {
    TrendingUp,
    ArrowRight,
    CheckCircle,
    Info,
    AlertCircle,
    BookOpen,
    HelpCircle,
} from 'lucide-react';

// ============================================================================
// STATIC PARAMS
// ============================================================================

interface PageProps {
    params: Promise<{ condition: string }>;
}

export async function generateStaticParams() {
    const conditions = getAllConditionSlugs();
    return conditions.map((condition) => ({
        condition,
    }));
}

// ============================================================================
// METADATA
// ============================================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { condition } = await params;
    const conditionDef = CONDITIONS[condition as ConditionSlug];

    if (!conditionDef) {
        return { title: 'Condition Not Found' };
    }

    const currentYear = new Date().getFullYear();

    return {
        title: `${currentYear} Medical Aid Optimization for ${conditionDef.label} | Actuarial Efficiency Rankings`,
        description: `Actuarial efficiency rankings for ${conditionDef.label} in ${currentYear}. Compare medical aid plans based on Total Cost of Care, PMB coverage, and out-of-pocket exposure.`,
        keywords: conditionDef.keywords.join(', '),
        openGraph: {
            title: `${currentYear} ${conditionDef.label} - Medical Aid Optimization`,
            description: conditionDef.description,
            type: 'website',
        },
    };
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default async function StrategyHubPage({ params }: PageProps) {
    const { condition } = await params;
    const conditionSlug = condition as ConditionSlug;
    const conditionDef = CONDITIONS[conditionSlug];

    if (!conditionDef) {
        notFound();
    }

    const currentYear = new Date().getFullYear();

    // Generate semantic content
    const glossaryTerms = ContentGenerator.generateConditionGlossary(conditionSlug);
    const conditionFAQs = ContentGenerator.generateConditionFAQ(conditionSlug);

    // FAQPage JSON-LD Schema for rich snippets and AI Overview citations
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: conditionFAQs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    // ========================================================================
    // DYNAMIC TCO CALCULATION
    // ========================================================================
    const plans = getAllPlans();
    const relatedProcedures = getProceduresForCondition(conditionSlug);

    // Helper to derive highlights from plan properties
    const buildHighlights = (plan: ReturnType<typeof getAllPlans>[0], basketCost: number): string[] => {
        const highlights: string[] = [];

        const hasPMB = plan.procedures.some(p => p.pmb_covered);
        if (hasPMB) highlights.push('PMB coverage');

        if (plan.premiums.msa_percentage > 0) {
            highlights.push(`${plan.premiums.msa_percentage}% MSA benefit`);
        }

        if (plan.hospital_benefits.annual_limit_unlimited) {
            highlights.push('Unlimited hospital');
        }

        if (basketCost === 0) {
            highlights.push('Full procedure coverage');
        } else if (plan.hospital_benefits.co_payment_in_network === 0) {
            highlights.push('No in-network co-pay');
        }

        return highlights.slice(0, 3);
    };

    // Calculate TCO for each plan and rank
    const schemeRankings = plans
        .map(plan => {
            const annualPremium = plan.premiums.main_member * 12;

            const basketCost = relatedProcedures.reduce((acc, procSlug) => {
                const proc = plan.procedures.find(p =>
                    slugifyProcedure(p.procedure_name) === procSlug
                );
                return acc + (proc?.copayment ?? 0);
            }, 0);

            const tco = annualPremium + basketCost;

            let efficiency: 'High' | 'Medium' | 'Low';
            if (basketCost === 0) {
                efficiency = 'High';
            } else if (basketCost < annualPremium * 0.1) {
                efficiency = 'Medium';
            } else {
                efficiency = 'Low';
            }

            return {
                rank: 0,
                scheme: 'Discovery Health',
                planName: plan.identity.plan_name,
                planSlug: plan.identity.plan_slug,
                schemeSlug: 'discovery-health',
                tco,
                efficiency,
                highlights: buildHighlights(plan, basketCost),
            };
        })
        .sort((a, b) => a.tco - b.tco)
        .slice(0, 3)
        .map((ranking, index) => ({ ...ranking, rank: index + 1 }));

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* FAQPage JSON-LD for Rich Snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <AppHeader />

            <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <div className="absolute inset-0 bg-grid-white/10" />
                <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                            <TrendingUp className="w-4 h-4" />
                            <span>{currentYear} Actuarial Audit</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Medical Aid Optimization for {conditionDef.label}
                        </h1>
                        <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
                            {conditionDef.description}
                        </p>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Actuarial Efficiency Rankings</h2>
                        <p className="text-slate-600 mt-1">Plans ranked by Total Cost of Care (TCO) for {conditionDef.label}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Info className="w-4 h-4" />
                        <span>Based on {currentYear} benefit rules</span>
                    </div>
                </div>

                <div className="grid gap-4">
                    {schemeRankings.map((ranking) => (
                        <Link
                            key={ranking.rank}
                            href={`/audit/${conditionSlug}-cost-audit-${ranking.schemeSlug}-${ranking.planSlug}`}
                            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${ranking.rank === 1
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : ranking.rank === 2
                                                ? 'bg-teal-100 text-teal-700'
                                                : 'bg-slate-100 text-slate-700'
                                            }`}
                                    >
                                        #{ranking.rank}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">
                                            {ranking.scheme} - {ranking.planName}
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-1">Efficiency: {ranking.efficiency}</p>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {ranking.highlights.map((highlight, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                                                >
                                                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-slate-900">R{ranking.tco.toLocaleString()}</p>
                                    <p className="text-sm text-slate-500">Estimated Annual TCO</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* SEO Topical Glue: Link to specific Procedure Hubs */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">
                        Check Specific Procedure Costs
                    </h2>
                    <p className="text-slate-600 mb-6">
                        View detailed cost breakdowns for procedures related to {conditionDef.label}:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {relatedProcedures.slice(0, 8).map((procSlug) => (
                            <Link
                                key={procSlug}
                                href={`/discovery-health/${procSlug}`}
                                className="flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg transition-colors group"
                            >
                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                                <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700 capitalize">
                                    {procSlug.replace(/-/g, ' ')}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 py-12">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Compare Specific Plans</h2>
                            <p className="text-slate-300">
                                Deep-dive into head-to-head plan comparisons for {conditionDef.label}
                            </p>
                        </div>
                        <Link
                            href={`/compare/discovery-smart-classic-vs-bestmed-pace2-for-${conditionSlug}`}
                            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            View Comparisons
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ================================================================ */}
            {/* SEMANTIC LAYER: SEO Content for Long-Tail Rankings              */}
            {/* ================================================================ */}

            {/* Jargon Buster: Condition-Specific Glossary */}
            <section className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-full">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                        Key Terms for {conditionDef.label}
                    </h2>
                </div>
                <SemanticGlossary terms={glossaryTerms} />
            </section>

            {/* People Also Ask: Condition-Specific FAQs */}
            <section className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                        <HelpCircle className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                        Frequently Asked Questions
                    </h2>
                </div>
                <PeopleAlsoAsk questions={conditionFAQs} />
            </section>

            {/* Financial Disclaimer */}
            <section className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-800">
                            <p className="font-semibold mb-1">Financial Disclaimer</p>
                            <p>{FINANCIAL_DISCLAIMER}</p>
                            <p className="mt-2 text-amber-600">[Source: Council for Medical Schemes Official Benefit Rules]</p>
                        </div>
                    </div>
                </div>
            </section>

            <TrustFooter />
        </main>
    );
}

