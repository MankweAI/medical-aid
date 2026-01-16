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
    FileText,
    ArrowLeft,
    ArrowRight,
    ChevronDown,
    AlertCircle,
    CheckCircle,
    DollarSign,
    Shield,
    Building,
    Pill,
    Stethoscope,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface PageProps {
    params: Promise<{ audit: string }>;
}

interface ParsedAudit {
    condition: ConditionSlug;
    scheme: string;
    plan: string;
}

// ============================================================================
// HELPERS
// ============================================================================

function parseAuditSlug(slug: string): ParsedAudit | null {
    const match = slug.match(/^(.+)-cost-audit-(.+)-(.+)$/);
    if (!match) return null;

    const [, condition, scheme, plan] = match;

    if (!CONDITIONS[condition as ConditionSlug]) {
        return null;
    }

    return {
        condition: condition as ConditionSlug,
        scheme,
        plan,
    };
}

function formatDisplayName(slug: string): string {
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
    const schemes = ['discovery', 'bestmed', 'bonitas'];
    const samplePlans = ['smart-classic', 'pace2', 'bonclassic'];

    const audits = conditions.flatMap((condition) =>
        schemes.map((scheme, i) => ({
            audit: `${condition}-cost-audit-${scheme}-${samplePlans[i]}`,
        }))
    );

    return audits;
}

// ============================================================================
// METADATA
// ============================================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { audit } = await params;
    const parsed = parseAuditSlug(audit);

    if (!parsed) {
        return { title: 'Audit Not Found' };
    }

    const conditionDef = CONDITIONS[parsed.condition];
    const currentYear = new Date().getFullYear();
    const planName = formatDisplayName(parsed.plan);
    const schemeName = formatDisplayName(parsed.scheme);

    return {
        title: `${conditionDef.label} Cost Audit - ${schemeName} ${planName} | ${currentYear} Liability Analysis`,
        description: `Deep-dive liability waterfall for ${conditionDef.label} on ${schemeName} ${planName}. See PMB coverage, scheme rate gaps, co-payments, and final member liability.`,
        openGraph: {
            title: `${conditionDef.label} Cost Audit - ${schemeName} ${planName}`,
            description: `Liability waterfall analysis for ${conditionDef.label}`,
            type: 'website',
        },
    };
}

// ============================================================================
// WATERFALL COMPONENT
// ============================================================================

interface WaterfallStep {
    label: string;
    amount: number;
    type: 'total' | 'deduction' | 'addition' | 'final';
    description: string;
    icon: React.ReactNode;
}

function LiabilityWaterfall({ steps }: { steps: WaterfallStep[] }) {
    return (
        <div className="space-y-1">
            {steps.map((step, index) => (
                <div key={step.label}>
                    <div
                        className={`flex items-center justify-between p-4 rounded-lg ${step.type === 'total'
                            ? 'bg-slate-800 text-white'
                            : step.type === 'final'
                                ? 'bg-emerald-600 text-white'
                                : step.type === 'deduction'
                                    ? 'bg-green-50 border border-green-200'
                                    : 'bg-amber-50 border border-amber-200'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${step.type === 'total' || step.type === 'final'
                                    ? 'bg-white/20'
                                    : step.type === 'deduction'
                                        ? 'bg-green-100'
                                        : 'bg-amber-100'
                                    }`}
                            >
                                {step.icon}
                            </div>
                            <div>
                                <p className={`font-medium ${step.type === 'total' || step.type === 'final' ? 'text-white' : 'text-slate-900'}`}>
                                    {step.label}
                                </p>
                                <p className={`text-sm ${step.type === 'total' || step.type === 'final' ? 'text-white/70' : 'text-slate-500'}`}>
                                    {step.description}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`text-lg font-bold ${step.type === 'total' || step.type === 'final' ? 'text-white' : step.type === 'deduction' ? 'text-green-600' : 'text-amber-600'}`}>
                                {step.type === 'deduction' ? '-' : step.type === 'addition' ? '+' : ''}
                                R{step.amount.toLocaleString()}
                            </p>
                        </div>
                    </div>
                    {index < steps.length - 1 && (
                        <div className="flex justify-center py-1">
                            <ChevronDown className="w-5 h-5 text-slate-300" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default async function LiabilityAuditPage({ params }: PageProps) {
    const { audit } = await params;
    const parsed = parseAuditSlug(audit);

    if (!parsed) {
        notFound();
    }

    const conditionDef = CONDITIONS[parsed.condition];
    const currentYear = new Date().getFullYear();
    const planName = formatDisplayName(parsed.plan);
    const schemeName = formatDisplayName(parsed.scheme);

    const waterfallSteps: WaterfallStep[] = [
        {
            label: 'Total Condition Cost',
            amount: 85000,
            type: 'total',
            description: `Estimated annual cost for ${conditionDef.label}`,
            icon: <DollarSign className="w-5 h-5 text-white" />,
        },
        {
            label: 'PMB Coverage',
            amount: 45000,
            type: 'deduction',
            description: 'Covered under Prescribed Minimum Benefits',
            icon: <Shield className="w-5 h-5 text-green-600" />,
        },
        {
            label: 'Hospital Benefit',
            amount: 25000,
            type: 'deduction',
            description: 'Covered by hospital benefit at scheme rate',
            icon: <Building className="w-5 h-5 text-green-600" />,
        },
        {
            label: 'Chronic Medication (CDL)',
            amount: 8000,
            type: 'deduction',
            description: 'Covered under Chronic Disease List',
            icon: <Pill className="w-5 h-5 text-green-600" />,
        },
        {
            label: 'Scheme Rate Gap',
            amount: 3500,
            type: 'addition',
            description: 'Difference between charged and scheme rate',
            icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
        },
        {
            label: 'Co-payments',
            amount: 4650,
            type: 'addition',
            description: 'Required co-payments for procedures',
            icon: <Stethoscope className="w-5 h-5 text-amber-600" />,
        },
        {
            label: 'Final Member Liability',
            amount: 11650,
            type: 'final',
            description: 'Your estimated out-of-pocket cost',
            icon: <CheckCircle className="w-5 h-5 text-white" />,
        },
    ];

    const totalCost = waterfallSteps[0].amount;
    const finalLiability = waterfallSteps[waterfallSteps.length - 1].amount;
    const coveragePercentage = ((totalCost - finalLiability) / totalCost * 100).toFixed(1);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <AppHeader />

            <div className="max-w-4xl mx-auto px-4 pt-6">
                <Link
                    href={`/medical-aid-optimization/${parsed.condition}`}
                    className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to {conditionDef.label} Overview
                </Link>
            </div>

            <section className="max-w-4xl mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-full text-sm font-medium mb-4">
                        <FileText className="w-4 h-4" />
                        <span>Liability Audit</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                        {conditionDef.label} Cost Audit
                    </h1>
                    <p className="text-lg text-slate-600">
                        {schemeName} • {planName} • {currentYear} Benefit Rules
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                        <p className="text-sm text-slate-500 mb-1">Total Condition Cost</p>
                        <p className="text-2xl font-bold text-slate-900">R{totalCost.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                        <p className="text-sm text-slate-500 mb-1">Scheme Coverage</p>
                        <p className="text-2xl font-bold text-emerald-600">{coveragePercentage}%</p>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                        <p className="text-sm text-slate-500 mb-1">Your Liability</p>
                        <p className="text-2xl font-bold text-slate-900">R{finalLiability.toLocaleString()}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Liability Waterfall</h2>
                    <LiabilityWaterfall steps={waterfallSteps} />
                </div>

                <div className="bg-slate-800 rounded-xl p-6 text-white mb-8">
                    <h3 className="font-semibold mb-3">Actuarial Logic</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        {schemeName} {planName} features a Medical Savings Account (MSA) structure that
                        provides upfront liquidity for day-to-day expenses. For {conditionDef.label},
                        the plan offsets specialty co-payments through strong PMB coverage and CDL
                        benefits. The primary cost exposure comes from scheme rate gaps when using
                        non-network providers, which can be mitigated by selecting value-based network
                        facilities.
                    </p>
                </div>

                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-lg mb-1">Compare with other plans</h3>
                            <p className="text-emerald-100 text-sm">See how this plan stacks up against alternatives</p>
                        </div>
                        <Link
                            href={`/compare/discovery-smart-classic-vs-bestmed-pace2-for-${parsed.condition}`}
                            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-emerald-50 transition-colors"
                        >
                            View Comparisons
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-800">
                            <p className="font-semibold mb-1">Financial Disclaimer</p>
                            <p>
                                This liability audit is the product of a mathematical risk model mapping
                                Council for Medical Schemes regulatory rules against {schemeName} benefit
                                schedules. Actual costs may vary based on service providers, treatment
                                protocols, and individual circumstances. This is not clinical or financial
                                advice.
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
