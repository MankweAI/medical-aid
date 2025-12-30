import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
    BonitasRiskResolverAsync,
    BonitasProcedureRepositoryAsync,
} from '@/lib/risk/bonitas-resolver-async';
import AppHeader from '@/components/AppHeader';
import { ExpertCTA } from '@/components/risk/ExpertCTA';
import { ArrowLeft, Activity, ArrowRight, HelpCircle, ChevronDown, AlertTriangle } from 'lucide-react';

interface PageProps {
    params: Promise<{ planSlug: string; procedureSlug: string }>;
}

export async function generateStaticParams() {
    const procedures = await BonitasProcedureRepositoryAsync.getAll();
    const planSlugs = ['boncap', 'bonclassic', 'boncomprehensive', 'boncomplete', 'boncore', 'bonessential', 'bonessential-select', 'bonprime', 'bonsave', 'bonfit', 'bonstart', 'bonstart-plus', 'hospital-standard', 'primary', 'standard', 'standard-select'];

    const params = [];
    for (const slug of planSlugs) {
        for (const proc of procedures) {
            params.push({
                planSlug: slug,
                procedureSlug: proc.id,
            });
        }
    }
    return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { planSlug, procedureSlug } = await params;

    try {
        const audit = await BonitasRiskResolverAsync.resolve(planSlug, procedureSlug);
        const cost = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(audit.liability);

        const canonicalUrl = `https://www.intellihealth.co.za/bonitas/${planSlug}/${procedureSlug}`;
        const title = `${audit.procedure.label} Cost on ${audit.plan.plan_name} | ${cost} Co-payment`;
        const description = `Calculate your ${audit.procedure.label} hospital co-payment on Bonitas ${audit.plan.plan_name}. 2026 liability: ${cost}. Network rules and PMB exemptions.`;

        return {
            title,
            description,
            alternates: { canonical: canonicalUrl },
        };
    } catch {
        return { title: 'Procedure Cost Calculator | Bonitas' };
    }
}

export default async function BonitasProcedureLeafPage({ params }: PageProps) {
    const { planSlug, procedureSlug } = await params;

    let audit;
    try {
        audit = await BonitasRiskResolverAsync.resolve(planSlug, procedureSlug);
    } catch {
        notFound();
    }

    // Get related procedures
    const allProcedures = await BonitasProcedureRepositoryAsync.getAll();
    const relatedProcedures = allProcedures
        .filter(p => p.id !== procedureSlug)
        .slice(0, 4);

    // Format currency helper
    const formatCost = (amount: number) =>
        amount === 0 ? 'R0' : `R${amount.toLocaleString()}`;

    // Generate FAQs
    const faqs = [
        {
            question: `How much does a ${audit.procedure.label} cost on ${audit.plan.plan_name}?`,
            answer: audit.liability === 0
                ? `A ${audit.procedure.label} is fully covered on ${audit.plan.plan_name} when using a network provider. There is no co-payment required.`
                : `On ${audit.plan.plan_name}, you will pay a co-payment of ${formatCost(audit.liability)} for a ${audit.procedure.label}.`
        },
        {
            question: `What happens if I go out-of-network?`,
            answer: `Voluntary use of a non-network hospital triggers a 30% co-payment on the total hospital account.`
        },
        {
            question: `Is a ${audit.procedure.label} covered as a PMB?`,
            answer: `If your condition qualifies as a Prescribed Minimum Benefit (PMB), the co-payment may be waived. Check with Bonitas to confirm your diagnosis qualifies.`
        },
    ];

    // JSON-LD
    const procedureLd = {
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        'name': audit.procedure.label,
        'alternateName': audit.procedure.medical_term,
        'description': audit.procedure.description,
    };

    const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': { '@type': 'Answer', 'text': faq.answer }
        }))
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

            <main className="min-h-screen bg-slate-50 pb-20">
                <AppHeader />

                <section className="max-w-3xl mx-auto pt-8 px-4 space-y-6">

                    {/* Breadcrumb */}
                    <Link
                        href={`/bonitas/${planSlug}`}
                        className="group inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors"
                    >
                        <div className="p-1.5 bg-white rounded-lg border border-slate-200 group-hover:border-slate-300 shadow-sm">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        Back to {audit.plan.plan_name}
                    </Link>

                    {/* Main Liability Card */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-red-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest">
                                    {audit.plan.plan_name}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                                {audit.procedure.label}
                            </h1>
                            <p className="text-slate-500 text-sm mb-6">
                                {audit.procedure.medical_term}
                            </p>

                            {/* The Answer */}
                            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-center">
                                <p className="text-slate-400 text-sm mb-2">Your 2026 Co-payment</p>
                                <p className={`text-5xl font-black ${audit.liability === 0 ? 'text-emerald-400' : 'text-white'}`}>
                                    {formatCost(audit.liability)}
                                </p>
                                {audit.liability === 0 && (
                                    <p className="text-emerald-400 text-sm mt-2 font-medium">
                                        ✓ Fully Covered
                                    </p>
                                )}
                            </div>

                            {/* Variants */}
                            {audit.breakdown.variants && (
                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                                        Cost by Facility Type
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-4 bg-emerald-50 rounded-xl text-center">
                                            <p className="text-xs text-emerald-600 font-medium mb-1">Network Hospital</p>
                                            <p className="text-xl font-bold text-emerald-700">
                                                {formatCost(audit.breakdown.variants.network_hospital)}
                                            </p>
                                        </div>
                                        <div className="p-4 bg-red-50 rounded-xl text-center">
                                            <p className="text-xs text-red-600 font-medium mb-1">Non-Network (+30%)</p>
                                            <p className="text-xl font-bold text-red-700">
                                                {formatCost(audit.breakdown.variants.non_network_hospital)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Non-Network Warning */}
                    <div className="bg-red-50 rounded-2xl p-5 border border-red-100 flex gap-4">
                        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-red-800 text-sm">Non-Network Hospital Penalty</p>
                            <p className="text-sm text-red-700/80 mt-1">
                                Voluntary use of a non-network hospital adds
                                <span className="font-black"> 30% of the hospital bill </span>
                                to your total.
                            </p>
                        </div>
                    </div>

                    {/* Related Procedures */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="w-5 h-5 text-red-500" />
                            <h3 className="font-bold text-slate-800">
                                Other Procedures on {audit.plan.plan_name}
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            {relatedProcedures.map(proc => (
                                <Link
                                    key={proc.id}
                                    href={`/bonitas/${planSlug}/${proc.id}`}
                                    className="group flex items-center justify-between p-3 bg-slate-50 hover:bg-red-50 rounded-xl border border-slate-100 hover:border-red-200 transition-all"
                                >
                                    <span className="font-medium text-slate-600 group-hover:text-red-700 text-sm">
                                        {proc.label}
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-red-500" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-center relative overflow-hidden">
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

                    {/* FAQs */}
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
