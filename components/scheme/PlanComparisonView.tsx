'use client';

import Link from 'next/link';
import { ExtractedPlan } from '@/lib/data-loader';
import AppHeader from '@/components/AppHeader';
import { ArrowLeft, Check, X, AlertCircle } from 'lucide-react';

interface PlanComparisonViewProps {
    plan1: ExtractedPlan;
    plan2: ExtractedPlan;
    schemeSlug: string;
}

function formatCurrency(amount: number | null | undefined): string {
    if (amount === null || amount === undefined) return 'N/A';
    return `R${amount.toLocaleString('en-ZA')}`;
}

function ComparisonRow({
    label,
    value1,
    value2,
    highlight = false
}: {
    label: string;
    value1: string | React.ReactNode;
    value2: string | React.ReactNode;
    highlight?: boolean;
}) {
    return (
        <tr className={highlight ? 'bg-emerald-50/50' : ''}>
            <td className="px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                {label}
            </td>
            <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200 text-center">
                {value1}
            </td>
            <td className="px-4 py-3 text-sm text-gray-900 text-center">
                {value2}
            </td>
        </tr>
    );
}

function BooleanIndicator({ value }: { value: boolean | undefined }) {
    if (value === true) {
        return <Check className="w-5 h-5 text-emerald-600 mx-auto" />;
    }
    if (value === false) {
        return <X className="w-5 h-5 text-red-500 mx-auto" />;
    }
    return <AlertCircle className="w-5 h-5 text-gray-400 mx-auto" />;
}

export function PlanComparisonView({ plan1, plan2, schemeSlug }: PlanComparisonViewProps) {
    const { identity: id1, premiums: p1, hospital_benefits: h1 } = plan1;
    const { identity: id2, premiums: p2, hospital_benefits: h2 } = plan2;

    // Find common procedures
    const proc1Map = new Map(plan1.procedures.map(p => [p.procedure_name, p]));
    const proc2Map = new Map(plan2.procedures.map(p => [p.procedure_name, p]));
    const commonProcedures = [...proc1Map.keys()].filter(name => proc2Map.has(name)).slice(0, 10);

    return (
        <>
            <AppHeader />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12">
                    <div className="max-w-6xl mx-auto px-4">
                        <Link
                            href={`/${schemeSlug}`}
                            className="inline-flex items-center gap-2 text-emerald-100 hover:text-white mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Discovery Health
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            {id1.plan_name} vs {id2.plan_name}
                        </h1>
                        <p className="text-emerald-100 text-lg">
                            Side-by-side comparison of {id1.year} plan benefits
                        </p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 py-8">
                    {/* Premiums Comparison */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Premiums</h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/3 border-r border-gray-200">
                                            Category
                                        </th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-emerald-700 w-1/3 border-r border-gray-200">
                                            <Link href={`/${schemeSlug}/${id1.plan_slug}`} className="hover:underline">
                                                {id1.plan_name}
                                            </Link>
                                        </th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-teal-700 w-1/3">
                                            <Link href={`/${schemeSlug}/${id2.plan_slug}`} className="hover:underline">
                                                {id2.plan_name}
                                            </Link>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <ComparisonRow
                                        label="Main Member"
                                        value1={formatCurrency(p1.main_member)}
                                        value2={formatCurrency(p2.main_member)}
                                        highlight
                                    />
                                    <ComparisonRow
                                        label="Adult Dependant"
                                        value1={formatCurrency(p1.adult_dependant)}
                                        value2={formatCurrency(p2.adult_dependant)}
                                    />
                                    <ComparisonRow
                                        label="Child Dependant"
                                        value1={formatCurrency(p1.child_dependant)}
                                        value2={formatCurrency(p2.child_dependant)}
                                    />
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Hospital Benefits Comparison */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Hospital Benefits</h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/3 border-r border-gray-200">
                                            Benefit
                                        </th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-emerald-700 w-1/3 border-r border-gray-200">
                                            {id1.plan_name}
                                        </th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-teal-700 w-1/3">
                                            {id2.plan_name}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <ComparisonRow
                                        label="Annual Limit"
                                        value1={h1.annual_limit_unlimited ? 'Unlimited' : formatCurrency(h1.annual_limit)}
                                        value2={h2.annual_limit_unlimited ? 'Unlimited' : formatCurrency(h2.annual_limit)}
                                        highlight
                                    />
                                    <ComparisonRow
                                        label="Rate Covered"
                                        value1={h1.rate_covered || 'N/A'}
                                        value2={h2.rate_covered || 'N/A'}
                                    />
                                    <ComparisonRow
                                        label="Network Hospitals"
                                        value1={h1.network_hospitals?.join(', ') || 'Any private hospital'}
                                        value2={h2.network_hospitals?.join(', ') || 'Any private hospital'}
                                    />
                                    <ComparisonRow
                                        label="In-Network Co-payment"
                                        value1={formatCurrency(h1.co_payment_in_network)}
                                        value2={formatCurrency(h2.co_payment_in_network)}
                                    />
                                    <ComparisonRow
                                        label="Out-of-Network Co-payment"
                                        value1={formatCurrency(h1.co_payment_out_of_network)}
                                        value2={formatCurrency(h2.co_payment_out_of_network)}
                                    />
                                    <ComparisonRow
                                        label="Pre-authorization Required"
                                        value1={<BooleanIndicator value={h1.pre_authorization_required} />}
                                        value2={<BooleanIndicator value={h2.pre_authorization_required} />}
                                    />
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Procedure Co-payments */}
                    {commonProcedures.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Procedure Co-payments
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">
                                Showing {commonProcedures.length} procedures available on both plans
                            </p>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-1/3 border-r border-gray-200">
                                                Procedure
                                            </th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-emerald-700 w-1/3 border-r border-gray-200">
                                                {id1.plan_name}
                                            </th>
                                            <th className="px-4 py-3 text-center text-sm font-semibold text-teal-700 w-1/3">
                                                {id2.plan_name}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {commonProcedures.map((procName, idx) => {
                                            const proc1 = proc1Map.get(procName)!;
                                            const proc2 = proc2Map.get(procName)!;
                                            return (
                                                <ComparisonRow
                                                    key={procName}
                                                    label={procName}
                                                    value1={formatCurrency(proc1.copayment)}
                                                    value2={formatCurrency(proc2.copayment)}
                                                    highlight={idx % 2 === 0}
                                                />
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {/* Individual Plan Links */}
                    <section className="grid md:grid-cols-2 gap-4">
                        <Link
                            href={`/${schemeSlug}/${id1.plan_slug}`}
                            className="block p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 hover:border-emerald-400 transition-colors"
                        >
                            <h3 className="font-semibold text-emerald-800 mb-1">{id1.plan_name}</h3>
                            <p className="text-sm text-emerald-600">View full plan details →</p>
                        </Link>
                        <Link
                            href={`/${schemeSlug}/${id2.plan_slug}`}
                            className="block p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl border border-teal-200 hover:border-teal-400 transition-colors"
                        >
                            <h3 className="font-semibold text-teal-800 mb-1">{id2.plan_name}</h3>
                            <p className="text-sm text-teal-600">View full plan details →</p>
                        </Link>
                    </section>
                </div>
            </main>
        </>
    );
}
