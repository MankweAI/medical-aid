import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import AppHeader from '@/components/AppHeader';
import TrustFooter from '@/components/TrustFooter';
import SemanticGlossary from '@/components/SemanticGlossary';
import PeopleAlsoAsk from '@/components/PeopleAlsoAsk';
import ConditionSelector from '@/components/ConditionSelector';
import {
    CONDITIONS,
    getAllConditionSlugs,
    type ConditionSlug,
} from '@/utils/condition-mapping';
import { ContentGenerator, FINANCIAL_DISCLAIMER } from '@/utils/seo-content';
import {
    Scale,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    AlertCircle,
    TrendingDown,
    BookOpen,
    HelpCircle,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface PageProps {
    params: Promise<{ comparison: string }>;
}

interface ParsedComparison {
    planA: string;
    planB: string;
    condition?: ConditionSlug;
}

// ============================================================================
// HELPERS
// ============================================================================

function parseComparisonSlug(slug: string): ParsedComparison | null {
    // New Regex: Matches both:
    // 1. planA-vs-planB-for-condition (Specific)
    // 2. planA-vs-planB (Generic)
    const match = slug.match(/^(.+)-vs-(.+?)(?:-for-(.+))?$/);

    if (!match) return null;

    const [, planA, planB, condition] = match;

    // If condition is present but invalid, return null (strict validation)
    // If condition is absent, it's valid (generic page)
    if (condition && !CONDITIONS[condition as ConditionSlug]) {
        return null;
    }

    return {
        planA,
        planB,
        condition: condition as ConditionSlug | undefined,
    };
}

function formatPlanName(slug: string): string {
    return slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// ============================================================================
// STATIC PARAMS
// ============================================================================

export async function generateStaticParams() {
    const conditions = getAllConditionSlugs();

    const comparisons = conditions.flatMap((condition) => [
        { comparison: `discovery-smart-classic-vs-bestmed-pace2-for-${condition}` },
        { comparison: `discovery-saver-vs-bonitas-bonclassic-for-${condition}` },
    ]);

    return comparisons;
}

// ============================================================================
// METADATA
// ============================================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { comparison } = await params;
    const parsed = parseComparisonSlug(comparison);

    if (!parsed) {
        return { title: 'Comparison Not Found' };
    }

    const currentYear = new Date().getFullYear();

    // Generic Metadata (Gateway Page)
    if (!parsed.condition) {
        return {
            title: `${formatPlanName(parsed.planA)} vs ${formatPlanName(parsed.planB)} | 2026 Head-to-Head Review`,
            description: `Compare ${formatPlanName(parsed.planA)} and ${formatPlanName(parsed.planB)}. See premium differences and find out which plan wins for Maternity, Orthopaedics, and Chronic Care.`,
            openGraph: {
                title: `${formatPlanName(parsed.planA)} vs ${formatPlanName(parsed.planB)} Comparison`,
                description: `Side-by-side breakdown of premiums and benefits.`,
                type: 'website',
            },
        };
    }

    // Specific Metadata (Audit Page)
    const conditionDef = CONDITIONS[parsed.condition];

    return {
        title: `${formatPlanName(parsed.planA)} vs ${formatPlanName(parsed.planB)} for ${conditionDef.label} | ${currentYear} Comparison`,
        description: `Compare ${formatPlanName(parsed.planA)} and ${formatPlanName(parsed.planB)} for ${conditionDef.label}. See Total Cost of Care, co-payments, and out-of-pocket exposure.`,
        openGraph: {
            title: `${formatPlanName(parsed.planA)} vs ${formatPlanName(parsed.planB)} - ${conditionDef.label}`,
            description: `Head-to-head medical aid plan comparison for ${conditionDef.label}`,
            type: 'website',
            images: [], // Ensure no empty images array causes issues
        },
    };
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default async function PlanComparisonPage({ params }: PageProps) {
    const { comparison } = await params;
    const parsed = parseComparisonSlug(comparison);

    if (!parsed) {
        notFound();
    }

    const currentYear = new Date().getFullYear();
    const planAData = {
        name: formatPlanName(parsed.planA),
        scheme: parsed.planA.includes('discovery') ? 'Discovery Health' :
            parsed.planA.includes('bestmed') ? 'Bestmed' :
                parsed.planA.includes('bonitas') ? 'Bonitas' : 'Medical Aid',
        annualPremium: 42000,
        conditionOOP: 8500,
        msaAllocation: 5500,
        tco: 45000,
        highlights: {
            copayment: 'R4,650 (Network)',
            pmbCoverage: '100%',
            networkRequirement: 'Smart Network',
            msaBenefit: 'R5,500/year',
        },
    };

    const planBData = {
        name: formatPlanName(parsed.planB),
        scheme: parsed.planB.includes('discovery') ? 'Discovery Health' :
            parsed.planB.includes('bestmed') ? 'Bestmed' :
                parsed.planB.includes('bonitas') ? 'Bonitas' : 'Medical Aid',
        annualPremium: 38000,
        conditionOOP: 12000,
        msaAllocation: 3500,
        tco: 46500,
        highlights: {
            copayment: 'R6,500 (Network)',
            pmbCoverage: '100%',
            networkRequirement: 'Network Hospital',
            msaBenefit: 'R3,500/year',
        },
    };

    // ========================================================================
    // PATH 1: GENERIC GATEWAY (No Condition)
    // ========================================================================
    if (!parsed.condition) {

        // Construct mock Plan objects for generic SEO content
        const mockPlanA: any = {
            ...planAData,
            identity: { plan_name: planAData.name, scheme_name: planAData.scheme },
        };
        const mockPlanB: any = {
            ...planBData,
            identity: { plan_name: planBData.name, scheme_name: planBData.scheme },
        };

        const genericFAQs = ContentGenerator.generateGenericComparisonFaqs(mockPlanA, mockPlanB);
        const genericGlossary = ContentGenerator.generateGenericGlossary();

        // Generic FAQSchema
        const faqSchema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: genericFAQs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                },
            })),
        };

        return (
            <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                {/* FAQPage JSON-LD for Rich Snippets */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />

                <AppHeader />

                <section className="max-w-6xl mx-auto px-4 py-12">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium mb-4">
                            <Scale className="w-4 h-4" />
                            <span>Head-to-Head Comparison</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                            {planAData.name} vs {planBData.name}
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Comparing these two plans broadly? The "winner" depends entirely on <strong>what you need it for</strong>. Select a condition below to see which plan handles it better.
                        </p>
                    </div>

                    {/* Sticker Price Comparison (Generic) */}
                    <div className="mb-12">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Scale className="w-5 h-5 text-slate-500" />
                            Sticker Price Battle
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">

                            {/* Card 1: Premium (Blue) */}
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-4">Annual Premium</p>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-medium text-slate-600">{planAData.name}</span>
                                        <span className="text-lg font-bold text-slate-900">R{planAData.annualPremium.toLocaleString()}</span>
                                    </div>
                                    <div className="h-px bg-slate-200"></div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-medium text-slate-600">{planBData.name}</span>
                                        <span className={`text-lg font-bold ${planBData.annualPremium < planAData.annualPremium ? 'text-emerald-600' : 'text-slate-900'}`}>
                                            R{planBData.annualPremium.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Savings (Emerald) */}
                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-xs text-emerald-600 uppercase tracking-wider font-bold mb-4">Savings Account</p>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-medium text-emerald-800">{planAData.name}</span>
                                        <span className={`text-lg font-bold ${planAData.msaAllocation > planBData.msaAllocation ? 'text-emerald-700' : 'text-emerald-900'}`}>
                                            R{planAData.msaAllocation.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="h-px bg-emerald-200"></div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-medium text-emerald-800">{planBData.name}</span>
                                        <span className="text-lg font-bold text-emerald-900">R{planBData.msaAllocation.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Co-payments (Amber) */}
                            <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-xs text-amber-600 uppercase tracking-wider font-bold mb-4">Fixed Co-payments</p>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-medium text-amber-800">{planAData.name}</span>
                                        <span className="text-lg font-bold text-amber-900">{planAData.highlights.copayment}</span>
                                    </div>
                                    <div className="h-px bg-amber-200"></div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-medium text-amber-800">{planBData.name}</span>
                                        <span className="text-lg font-bold text-amber-900">{planBData.highlights.copayment}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Condition Selector */}
                    <div className="mb-12">
                        <ConditionSelector planA={parsed.planA} planB={parsed.planB} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <Link href={`/${parsed.planA}`} className="block p-6 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors text-center">
                            <span className="text-slate-600 text-sm">View full details for</span>
                            <p className="font-bold text-slate-900 text-lg">{planAData.name}</p>
                        </Link>
                        <Link href={`/${parsed.planB}`} className="block p-6 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors text-center">
                            <span className="text-slate-600 text-sm">View full details for</span>
                            <p className="font-bold text-slate-900 text-lg">{planBData.name}</p>
                        </Link>
                    </div>

                    {/* SEO CONTENT SECTION */}
                    <section className="border-t border-slate-200 pt-12">
                        {/* Jargon Buster */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-amber-50 text-amber-600 rounded-full">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Understanding Your Medical Aid Quote
                                </h2>
                            </div>
                            <SemanticGlossary terms={genericGlossary} />
                        </div>

                        {/* FAQs */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                                    <HelpCircle className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Frequently Asked Questions
                                </h2>
                            </div>
                            <PeopleAlsoAsk questions={genericFAQs} />
                        </div>

                        {/* Disclaimer */}
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


                </section>
                <TrustFooter />
            </main>
        );
    }

    // ========================================================================
    // PATH 2: SPECIFIC CONDITION AUDIT
    // ========================================================================

    const conditionDef = CONDITIONS[parsed.condition];

    // Generate semantic content
    const glossaryTerms = ContentGenerator.generateConditionGlossary(parsed.condition);
    const conditionFAQs = ContentGenerator.generateConditionFAQ(parsed.condition);

    // FAQPage JSON-LD Schema for rich snippets
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

    // Construct mock Plan objects for the ContentGenerator
    // We cast to 'any' here because we are using simplified local data structures
    // that don't match the full database Plan interface, but have what we need for the text generator.
    const mockPlanA: any = {
        ...planAData,
        identity: { plan_name: planAData.name, scheme_name: planAData.scheme },
        network_restriction: planAData.highlights.networkRequirement?.includes('Network') ? 'Network' : 'Any',
    };

    const mockPlanB: any = {
        ...planBData,
        identity: { plan_name: planBData.name, scheme_name: planBData.scheme },
        network_restriction: planBData.highlights.networkRequirement?.includes('Network') ? 'Network' : 'Any',
    };

    const winner = planAData.tco < planBData.tco ? 'A' : 'B';
    const savings = Math.abs(planAData.tco - planBData.tco);

    // Generate dynamic actuarial comparison copy
    const comparisonSummary = ContentGenerator.generateComparisonSummary(mockPlanA, mockPlanB, savings);
    const insight = ContentGenerator.generateComparisonInsight(mockPlanA, mockPlanB, parsed.condition);


    const comparisonFactors = [
        {
            factor: 'Annual Premium',
            planA: `R${planAData.annualPremium.toLocaleString()}`,
            planB: `R${planBData.annualPremium.toLocaleString()}`,
            advantage: planAData.annualPremium < planBData.annualPremium ? 'A' : 'B',
        },
        {
            factor: 'Condition-Specific Co-payments',
            planA: `R${planAData.conditionOOP.toLocaleString()}`,
            planB: `R${planBData.conditionOOP.toLocaleString()}`,
            advantage: planAData.conditionOOP < planBData.conditionOOP ? 'A' : 'B',
        },
        {
            factor: 'MSA Allocation',
            planA: `R${planAData.msaAllocation.toLocaleString()}`,
            planB: `R${planBData.msaAllocation.toLocaleString()}`,
            advantage: planAData.msaAllocation > planBData.msaAllocation ? 'A' : 'B',
        },
        {
            factor: 'Total Cost of Care',
            planA: `R${planAData.tco.toLocaleString()}`,
            planB: `R${planBData.tco.toLocaleString()}`,
            advantage: winner,
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

            <div className="max-w-6xl mx-auto px-4 pt-6">
                <Link
                    href={`/medical-aid-optimization/${parsed.condition}`}
                    className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to {conditionDef.label} Overview
                </Link>
            </div>

            <section className="max-w-6xl mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                        <Scale className="w-4 h-4" />
                        <span>Plan Comparison</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        {planAData.name} vs {planBData.name}
                    </h1>
                    <p className="text-lg text-slate-600">
                        for {conditionDef.label} ({currentYear} Benefit Rules)
                    </p>
                </div>

                {/* HERO CARD: Dynamic Actuarial Insight */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-emerald-100 text-sm font-medium mb-1">
                                {insight.type === 'INTRA-SCHEME' ? 'Scheme Optimization Analysis' : 'Cost-Effective Choice'}
                            </p>
                            <h2 className="text-2xl font-bold">
                                {comparisonSummary.headline}
                            </h2>
                            <p className="text-emerald-100 mt-1">
                                {comparisonSummary.subtext}
                            </p>
                            {/* Insight Content */}
                            <p className="mt-4 text-sm bg-emerald-600/30 p-3 rounded-lg border border-emerald-400/30">
                                💡 <strong>Actuary's Take:</strong> {insight.content}
                            </p>
                        </div>
                        <div className="text-right hidden sm:block">
                            <div className="flex items-center justify-end gap-2 text-emerald-100 text-sm">
                                <TrendingDown className="w-4 h-4" />
                                <span>Estimated Optimization</span>
                            </div>
                            <p className="text-3xl font-bold mt-1">R{savings.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className={`bg-white rounded-xl border-2 ${winner === 'A' ? 'border-emerald-500' : 'border-slate-200'} p-6`}>
                        {winner === 'A' && (
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                                <CheckCircle className="w-4 h-4" />
                                Optimized Choice
                            </div>
                        )}
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{planAData.name}</h3>
                        <p className="text-sm text-slate-500 mb-4">{planAData.scheme}</p>
                        <div className="space-y-3">
                            {Object.entries(planAData.highlights).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center">
                                    <span className="text-sm text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    <span className="text-sm font-medium text-slate-900">{value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Total Cost of Care</span>
                                <span className="text-2xl font-bold text-slate-900">R{planAData.tco.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className={`bg-white rounded-xl border-2 ${winner === 'B' ? 'border-emerald-500' : 'border-slate-200'} p-6`}>
                        {winner === 'B' && (
                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                                <CheckCircle className="w-4 h-4" />
                                Optimized Choice
                            </div>
                        )}
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{planBData.name}</h3>
                        <p className="text-sm text-slate-500 mb-4">{planBData.scheme}</p>
                        <div className="space-y-3">
                            {Object.entries(planBData.highlights).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center">
                                    <span className="text-sm text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    <span className="text-sm font-medium text-slate-900">{value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Total Cost of Care</span>
                                <span className="text-2xl font-bold text-slate-900">R{planBData.tco.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-8">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                        <h3 className="font-semibold text-slate-900">Factor-by-Factor Comparison</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {comparisonFactors.map((factor) => (
                            <div key={factor.factor} className="grid grid-cols-4 gap-4 px-6 py-4 items-center">
                                <span className="text-sm font-medium text-slate-700">{factor.factor}</span>
                                <span className={`text-sm text-center ${factor.advantage === 'A' ? 'text-emerald-600 font-semibold' : 'text-slate-600'}`}>
                                    {factor.planA}
                                    {factor.advantage === 'A' && <TrendingDown className="w-3 h-3 inline ml-1" />}
                                </span>
                                <span className={`text-sm text-center ${factor.advantage === 'B' ? 'text-emerald-600 font-semibold' : 'text-slate-600'}`}>
                                    {factor.planB}
                                    {factor.advantage === 'B' && <TrendingDown className="w-3 h-3 inline ml-1" />}
                                </span>
                                <div className="flex justify-center">
                                    <span className={`text-xs px-2 py-1 rounded-full ${factor.advantage === 'A' ? 'bg-emerald-100 text-emerald-700' : factor.advantage === 'B' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                        {factor.advantage === 'A' ? `${planAData.name} wins` : factor.advantage === 'B' ? `${planBData.name} wins` : 'Tie'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <Link
                        href={`/audit/${parsed.condition}-cost-audit-discovery-${parsed.planA}`}
                        className="bg-slate-800 hover:bg-slate-900 text-white rounded-xl p-6 transition-colors"
                    >
                        <h4 className="font-semibold mb-2">Deep Dive: {planAData.name}</h4>
                        <p className="text-sm text-slate-300 mb-3">View the full liability waterfall for this plan.</p>
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-sm">
                            View Audit <ArrowRight className="w-4 h-4" />
                        </span>
                    </Link>
                    <Link
                        href={`/audit/${parsed.condition}-cost-audit-bestmed-${parsed.planB}`}
                        className="bg-slate-800 hover:bg-slate-900 text-white rounded-xl p-6 transition-colors"
                    >
                        <h4 className="font-semibold mb-2">Deep Dive: {planBData.name}</h4>
                        <p className="text-sm text-slate-300 mb-3">View the full liability waterfall for this plan.</p>
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-sm">
                            View Audit <ArrowRight className="w-4 h-4" />
                        </span>
                    </Link>
                </div>

                {/* ================================================================ */}
                {/* SEMANTIC LAYER: SEO Content for Long-Tail Rankings              */}
                {/* ================================================================ */}

                {/* Jargon Buster: Condition-Specific Glossary */}
                <section className="mb-8">
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
                <section className="mb-8">
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
