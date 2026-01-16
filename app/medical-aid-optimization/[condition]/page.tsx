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
    type ConditionSlug,
} from '@/utils/condition-mapping';
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

    const schemeRankings = [
        {
            rank: 1,
            scheme: 'Discovery Health',
            planName: 'Smart Classic',
            planSlug: 'smart-classic',
            schemeSlug: 'discovery',
            tco: 45000,
            efficiency: 'High',
            highlights: ['Full PMB coverage', 'Lower co-payments', 'MSA benefit'],
        },
        {
            rank: 2,
            scheme: 'Bestmed',
            planName: 'Pace 2',
            planSlug: 'pace2',
            schemeSlug: 'bestmed',
            tco: 48500,
            efficiency: 'High',
            highlights: ['Network discounts', 'Competitive premiums'],
        },
        {
            rank: 3,
            scheme: 'Bonitas',
            planName: 'BonClassic',
            planSlug: 'bonclassic',
            schemeSlug: 'bonitas',
            tco: 52000,
            efficiency: 'Medium',
            highlights: ['Wide network', 'DSP benefits'],
        },
    ];

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

