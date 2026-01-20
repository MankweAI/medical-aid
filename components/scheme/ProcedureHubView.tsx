import Link from 'next/link';
import { ProcedurePlanEntry } from '@/lib/data-loader';
import AppHeader from '@/components/AppHeader';
import { ArrowLeft, CheckCircle2, XCircle, Info, Phone, BookOpen, Stethoscope, Activity } from 'lucide-react';

interface ProcedureHubViewProps {
    procedureName: string;
    plans: ProcedurePlanEntry[];
    schemeName: string;
    schemeSlug: string;
    procedureSlug: string;
}

export function ProcedureHubView({
    procedureName,
    plans,
    schemeName,
    schemeSlug,
    procedureSlug
}: ProcedureHubViewProps) {
    const sortedPlans = [...plans].sort((a, b) => a.copayment - b.copayment);

    // Stats
    const costs = plans.map(p => p.copayment);
    const minCost = Math.min(...costs);
    const maxCost = Math.max(...costs);
    const fullyCoveredCount = plans.filter(p => p.copayment === 0).length;

    // Aggregate Insight
    let insightText = "";
    if (fullyCoveredCount === plans.length) {
        insightText = `Great news! coverage for ${procedureName} is excellent across the board. All ${plans.length} analyzed ${schemeName} plans cover this procedure in full when using a network provider.`;
    } else if (fullyCoveredCount > 0) {
        insightText = `There is a significant variance in coverage. While ${fullyCoveredCount} plans cover ${procedureName} in full, others may require co-payments up to R${maxCost.toLocaleString()}. It's important to choose the right plan if you expect to need this procedure.`;
    } else {
        insightText = `Most ${schemeName} plans require a co-payment for this procedure, ranging from R${minCost.toLocaleString()} to R${maxCost.toLocaleString()}. You may want to consider Gap Cover to help fund these costs.`;
    }

    // FAQs
    const faqs = [
        {
            question: `How much does ${procedureName} cost on ${schemeName}?`,
            answer: sortedPlans.length === 1
                ? `On ${schemeName} ${sortedPlans[0].plan_name}, you pay R${sortedPlans[0].copayment.toLocaleString()} for a ${procedureName}.`
                : `${procedureName} costs range from R${minCost.toLocaleString()} to R${maxCost.toLocaleString()} depending on your ${schemeName} plan.`
        },
        {
            question: `Which ${schemeName} plan has the cheapest ${procedureName}?`,
            answer: `${sortedPlans[0].plan_name} offers the lowest co-payment at R${sortedPlans[0].copayment.toLocaleString()}.`
        },
        {
            question: `Is ${procedureName} a PMB procedure on ${schemeName}?`,
            answer: sortedPlans.some(p => p.pmb_covered)
                ? `Yes, ${procedureName} may qualify for PMB (Prescribed Minimum Benefits) exemption depending on your diagnosis.`
                : `${procedureName} is not automatically covered as a PMB condition, but may qualify based on your specific diagnosis.`
        }
    ];

    const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(f => ({
            '@type': 'Question',
            'name': f.question,
            'acceptedAnswer': { '@type': 'Answer', 'text': f.answer }
        }))
    };

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.intellihealth.co.za/' },
            { '@type': 'ListItem', 'position': 2, 'name': schemeName, 'item': `https://www.intellihealth.co.za/${schemeSlug}` },
            { '@type': 'ListItem', 'position': 3, 'name': procedureName, 'item': `https://www.intellihealth.co.za/${schemeSlug}/${procedureSlug}` }
        ]
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

            <main className="min-h-screen bg-slate-50 pb-20">
                <AppHeader />

                <div className="max-w-3xl mx-auto pt-8 px-4 space-y-6">

                    {/* Back Link */}
                    <Link
                        href={`/${schemeSlug}`}
                        className="group inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {schemeName} Overview
                    </Link>

                    {/* Hero */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2">
                                {schemeName} 2026
                            </p>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
                                {procedureName} Cost Guide
                            </h1>
                            <p className="text-slate-600 mb-6">
                                Compare {procedureName} co-payments across {plans.length} {schemeName} plan{plans.length > 1 ? 's' : ''}.
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-4">
                                <div className="px-4 py-2 bg-slate-100 rounded-xl">
                                    <span className="text-xs text-slate-500 block">Cheapest Plan</span>
                                    <span className="text-lg font-black text-emerald-600">R{minCost.toLocaleString()}</span>
                                </div>
                                <div className="px-4 py-2 bg-slate-100 rounded-xl">
                                    <span className="text-xs text-slate-500 block">Most Expensive</span>
                                    <span className="text-lg font-black text-rose-600">R{maxCost.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Intro / Aggregate Insight */}
                    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <Activity className="w-5 h-5 text-blue-600" />
                                <h2 className="font-bold text-slate-900">Analysis</h2>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {insightText}
                            </p>
                        </div>
                    </div>

                    {/* Quick Definition (Fake Jargon Buster/Intro) */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200">
                        <div className="flex items-center gap-2 mb-3">
                            <Stethoscope className="w-5 h-5 text-purple-600" />
                            <h2 className="font-bold text-slate-900">What is {procedureName}?</h2>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            This page details the specific co-payments and coverage rules for <strong>{procedureName}</strong> under {schemeName}.
                            Coverage can vary significantly between plans, with some offering full cover at network providers and others requiring upfront co-payments.
                            Always check if this procedure is performed in-hospital or out-of-hospital, as this affects which benefit limit is used.
                        </p>
                    </div>

                    {/* Plan Cards */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-black text-slate-900 px-1">Compare Plans</h2>
                        {sortedPlans.map((plan, i) => (
                            <Link
                                key={plan.plan_slug}
                                href={`/${schemeSlug}/${plan.plan_slug}/${procedureSlug}`}
                                className={`block bg-white rounded-2xl p-6 border shadow-sm transition-all hover:bg-slate-50 ${i === 0 ? 'border-emerald-200 ring-2 ring-emerald-100' : 'border-slate-200'}`}
                            >
                                {i === 0 && (
                                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-black rounded-full mb-3">
                                        BEST VALUE
                                    </span>
                                )}

                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-slate-800">{plan.plan_name}</h3>
                                    <span className={`text-2xl font-black ${plan.copayment === 0 ? 'text-emerald-600' : 'text-slate-700'}`}>
                                        R{plan.copayment.toLocaleString()}
                                    </span>
                                </div>

                                {/* Features */}
                                <div className="flex flex-wrap gap-3 text-sm">
                                    <div className={`flex items-center gap-1.5 ${plan.pmb_covered ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        {plan.pmb_covered ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                        PMB Covered
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <details key={i} className="group">
                                    <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                                        <span className="font-medium text-slate-700 pr-4">{faq.question}</span>
                                        <span className="text-slate-400">+</span>
                                    </summary>
                                    <div className="px-4 pt-3 pb-1 text-sm text-slate-600 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl" />
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-xl font-black text-white">
                                Need Help Choosing a Plan?
                            </h3>
                            <p className="text-slate-300 text-sm max-w-md mx-auto">
                                Our accredited specialists can help find the right plan for your {procedureName} needs.
                            </p>
                            <button className="mt-4 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:from-emerald-600 hover:to-emerald-500">
                                <Phone className="w-4 h-4 inline mr-2" />
                                Speak to an Expert
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}
