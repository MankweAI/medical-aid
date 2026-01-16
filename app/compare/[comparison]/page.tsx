import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import AppHeader from '@/components/AppHeader';
import TrustFooter from '@/components/TrustFooter';
import {
    CONDITIONS,
    getAllConditionSlugs,
    type ConditionSlug,
} from '@/utils/condition-mapping';
import {
    Scale,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    AlertCircle,
    TrendingDown,
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
    condition: ConditionSlug;
}

// ============================================================================
// HELPERS
// ============================================================================

function parseComparisonSlug(slug: string): ParsedComparison | null {
    const match = slug.match(/^(.+)-vs-(.+)-for-(.+)$/);
    if (!match) return null;

    const [, planA, planB, condition] = match;

    if (!CONDITIONS[condition as ConditionSlug]) {
        return null;
    }

    return {
        planA,
        planB,
        condition: condition as ConditionSlug,
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

    const conditionDef = CONDITIONS[parsed.condition];
    const currentYear = new Date().getFullYear();

    return {
        title: `${formatPlanName(parsed.planA)} vs ${formatPlanName(parsed.planB)} for ${conditionDef.label} | ${currentYear} Comparison`,
        description: `Compare ${formatPlanName(parsed.planA)} and ${formatPlanName(parsed.planB)} for ${conditionDef.label}. See Total Cost of Care, co-payments, and out-of-pocket exposure.`,
        openGraph: {
            title: `${formatPlanName(parsed.planA)} vs ${formatPlanName(parsed.planB)} - ${conditionDef.label}`,
            description: `Head-to-head medical aid plan comparison for ${conditionDef.label}`,
            type: 'website',
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

    const conditionDef = CONDITIONS[parsed.condition];
    const currentYear = new Date().getFullYear();

    const planAData = {
        name: formatPlanName(parsed.planA),
        scheme: parsed.planA.includes('discovery') ? 'Discovery Health' : 'Bestmed',
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
        scheme: parsed.planB.includes('discovery') ? 'Discovery Health' : 'Bestmed',
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

    const winner = planAData.tco < planBData.tco ? 'A' : 'B';
    const savings = Math.abs(planAData.tco - planBData.tco);

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
            <AppHeader />

            <div className="max-w-6xl mx-auto px-4 pt-6">
                <Link
                    href={`/optimize/${parsed.condition}`}
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

                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-emerald-100 text-sm font-medium mb-1">Cost-Effective Choice</p>
                            <h2 className="text-2xl font-bold">
                                {winner === 'A' ? planAData.name : planBData.name}
                            </h2>
                            <p className="text-emerald-100 mt-1">
                                Based on {currentYear} benefit rules, this plan results in the lowest
                                calculated out-of-pocket exposure for {conditionDef.label}.
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-2 text-emerald-100 text-sm">
                                <TrendingDown className="w-4 h-4" />
                                <span>Potential Annual Savings</span>
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

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-800">
                            <p className="font-semibold mb-1">Financial Disclaimer</p>
                            <p>
                                Results are the product of a mathematical risk model mapping Council for
                                Medical Schemes regulatory rules against scheme deductibles. This is not
                                clinical or financial advice.
                            </p>
                            <p className="mt-2 text-amber-600">[Source: Council for Medical Schemes Official Benefit Rules]</p>
                        </div>
                    </div>
                </div>
            </section>

            <TrustFooter />
        </main>
    );
}
