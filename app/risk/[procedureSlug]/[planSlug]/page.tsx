import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

// Relative Import for Data Safety
import { PROCEDURES_2026, PLAN_DEDUCTIBLES_2026, getRiskProfile } from '../../../../data/procedures-2026';
import { HospitalBillInvoice } from '@/components/risk/HospitalBillInvoice';
import { GapCoverOptimizer } from '@/components/risk/GapCoverOptimizer';
import { HiddenGapAudit } from '@/components/risk/HiddenGapAudit';

interface PageProps {
    params: Promise<{
        procedureSlug: string;
        planSlug: string;
    }>;
}

// 1. GENERATE STATIC PATHS
export async function generateStaticParams() {
    if (!PROCEDURES_2026 || !PLAN_DEDUCTIBLES_2026) return [];
    const paths: { procedureSlug: string; planSlug: string }[] = [];
    PROCEDURES_2026.forEach(proc => {
        PLAN_DEDUCTIBLES_2026.forEach(plan => {
            paths.push({ procedureSlug: proc.id, planSlug: plan.plan_id });
        });
    });
    return paths;
}

// 2. METADATA
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { procedureSlug, planSlug } = await params;
    const profile = getRiskProfile(procedureSlug, planSlug);
    if (!profile) return { title: 'Not Found' };
    const costString = profile.liability > 0 ? `R${profile.liability.toLocaleString()} Shortfall` : 'Cover Check';
    return {
        title: `${profile.procedure.label} on ${profile.plan.plan_name}: ${costString} | Intellihealth`,
        description: `2026 Surgery Audit: Doing a ${profile.procedure.label} on ${profile.plan.plan_name}? See your exact upfront costs and how to cover them.`,
    };
}

// 3. MAIN PAGE COMPONENT
export default async function RiskLandingPage({ params }: PageProps) {
    const { procedureSlug, planSlug } = await params;
    const profile = getRiskProfile(procedureSlug, planSlug);

    if (!profile) notFound();

    const isTrap = profile.liability > 0;

    // --- A. PROGRAMMATIC CONTENT GENERATION ---
    const faqs = [
        {
            question: `Does ${profile.plan.plan_name} cover ${profile.procedure.label} in full?`,
            answer: isTrap
                ? `No. On the ${profile.plan.plan_name}, a ${profile.procedure.label} requires a mandatory upfront deductible of R${profile.liability.toLocaleString()}, even if you use a network hospital.`
                : `Yes. The ${profile.plan.plan_name} covers the hospital facility fee for a ${profile.procedure.label} at 100% of the Scheme Rate, provided you use a network provider.`
        },
        {
            question: `What is the network penalty for ${profile.plan.plan_name}?`,
            answer: `The ${profile.plan.plan_name} is a "${profile.plan.network_type}" network plan. If you voluntarily use a non-network facility, your co-payment increases to R${profile.plan.deductibles.penalty_non_network.toLocaleString()}.`
        },
        {
            question: `How can I reduce the cost of a ${profile.procedure.label}?`,
            answer: isTrap
                ? `You have two options: 1) Purchase Gap Cover (approx R350/pm) to fund the R${profile.liability.toLocaleString()} shortfall, or 2) Upgrade to a "Saver" series plan which has no deductible for this procedure.`
                : `Since you are already on a plan with full hospital cover, your main risk is the specialist charging above the scheme rate. You should verify if your surgeon has a payment arrangement with Discovery.`
        }
    ];

    // --- B. SCHEMA INJECTION (SEO Moat) ---
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "MedicalProcedure",
                "name": profile.procedure.label,
                "procedureType": "SurgicalProcedure",
                "bodyLocation": profile.procedure.category,
                "status": "Elective"
            },
            {
                "@type": "FinancialProduct",
                "name": `${profile.plan.plan_name} Surgery Cover`,
                "description": `Coverage specification for ${profile.procedure.label}`,
                "offers": {
                    "@type": "Offer",
                    "price": profile.liability,
                    "priceCurrency": "ZAR",
                    "description": "Upfront Deductible / Co-payment"
                }
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqs.map(f => ({
                    "@type": "Question",
                    "name": f.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f.answer
                    }
                }))
            }
        ]
    };

    // Network type badge styling
    const getNetworkBadge = () => {
        switch (profile.plan.network_type) {
            case 'smart':
                return { label: 'Smart Network', color: 'bg-blue-100 text-blue-700 border-blue-200' };
            case 'delta':
                return { label: 'Delta Network', color: 'bg-purple-100 text-purple-700 border-purple-200' };
            case 'coastal':
                return { label: 'Coastal Network', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' };
            default:
                return { label: 'Any Provider', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
        }
    };

    const networkBadge = getNetworkBadge();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            {/* INJECT SCHEMA */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* HERO HEADER */}
            <div className={`relative overflow-hidden ${isTrap
                    ? 'bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800'
                    : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600'
                }`}>
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-5xl mx-auto px-4 py-10 md:py-14">
                    {/* BREADCRUMB */}
                    <div className="flex items-center gap-2 text-sm mb-6">
                        <Link href="/risk" className={`hover:underline ${isTrap ? 'text-slate-400' : 'text-emerald-100'}`}>
                            Surgery Simulator
                        </Link>
                        <svg className={`w-4 h-4 ${isTrap ? 'text-slate-500' : 'text-emerald-200'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <span className={isTrap ? 'text-slate-300' : 'text-white'}>{profile.procedure.label}</span>
                    </div>

                    {/* MAIN HEADER */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
                                {profile.procedure.label}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3">
                                {/* Plan Badge */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                    <span className={`text-sm ${isTrap ? 'text-slate-200' : 'text-emerald-100'}`}>
                                        Plan:
                                    </span>
                                    <span className="text-white font-bold">
                                        {profile.plan.plan_name}
                                    </span>
                                </div>
                                {/* Network Badge */}
                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${networkBadge.color}`}>
                                    {networkBadge.label}
                                </span>
                            </div>
                        </div>

                        {/* STATUS INDICATOR */}
                        <div className={`flex items-center gap-3 px-5 py-3 rounded-xl ${isTrap
                                ? 'bg-red-500/20 border border-red-400/30'
                                : 'bg-emerald-400/20 border border-emerald-300/30'
                            }`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${isTrap ? 'bg-red-500/30' : 'bg-emerald-400/30'
                                }`}>
                                {isTrap ? '⚠️' : '✅'}
                            </div>
                            <div>
                                <div className={`text-xs uppercase tracking-wider font-bold ${isTrap ? 'text-red-300' : 'text-emerald-200'
                                    }`}>
                                    {isTrap ? 'Deductible Required' : 'Fully Covered'}
                                </div>
                                <div className="text-white font-black text-xl">
                                    R{profile.liability.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <main className="max-w-5xl mx-auto px-4 py-10">
                <div className="grid lg:grid-cols-5 gap-10 items-start">

                    {/* LEFT COLUMN: VISUAL TOOLS (60%) */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* The Invoice */}
                        <HospitalBillInvoice
                            procedure={profile.procedure}
                            plan={profile.plan}
                            liability={profile.liability}
                            warning={profile.warning}
                        />

                        {/* The Solution */}
                        {isTrap ? (
                            <GapCoverOptimizer liability={profile.liability} />
                        ) : (
                            <HiddenGapAudit />
                        )}
                    </div>

                    {/* RIGHT COLUMN: CONTEXT & FAQ (40%) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* ACTUARIAL CONTEXT */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                            <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-slate-900">Actuarial Analysis</h3>
                            </div>

                            <div className="p-5 space-y-4 text-sm text-slate-600 leading-relaxed">
                                <p>
                                    We audited the <strong className="text-slate-900">2026 {profile.plan.plan_name}</strong> rules against a
                                    standard <strong className="text-slate-900">{profile.procedure.label}</strong> protocol.
                                </p>

                                {isTrap ? (
                                    <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500">
                                        <strong className="text-red-800 block mb-1">The Deductible Rule</strong>
                                        <span className="text-red-700/80">
                                            Because you are on a "Smart" series plan, Discovery charges a mandatory upfront fee for elective procedures.
                                            This is not a deposit; it is an out-of-pocket cost.
                                        </span>
                                    </div>
                                ) : (
                                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500">
                                        <strong className="text-emerald-800 block mb-1">The Saver Benefit</strong>
                                        <span className="text-emerald-700/80">
                                            Unlike Smart plans, "Saver" plans do not have upfront hospital deductibles for this procedure, assuming you use the network.
                                        </span>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-slate-100">
                                    <h4 className="font-bold text-slate-900 mb-3">Hidden Risks to Watch:</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-500">⚠️</span>
                                            <span><strong>Anaesthetist Fees:</strong> Often not fully covered by the hospital plan.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-500">⚠️</span>
                                            <span><strong>Internal Prosthetics:</strong> If the surgeon uses a specific brand not on the list, you may pay extra (up to R30,000).</span>
                                        </li>
                                        {profile.nonNetworkLiability > 0 && (
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-500">🚨</span>
                                                <span className="text-red-700 font-semibold">
                                                    Network Location: Going to a non-network hospital triggers a R{profile.nonNetworkLiability.toLocaleString()} penalty.
                                                </span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* EXPERT CTA */}
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-center shadow-xl">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center text-3xl">
                                👨‍⚕️
                            </div>
                            <h3 className="font-bold text-white text-lg mb-2">Need a Second Opinion?</h3>
                            <p className="text-slate-400 text-sm mb-5">
                                Don't book your surgery until an expert checks your authorization.
                            </p>
                            <button className="w-full bg-white hover:bg-emerald-50 text-slate-900 font-bold py-3 rounded-xl transition-colors">
                                Book a Free Clearance Call
                            </button>
                        </div>

                        {/* FAQ SECTION */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                            <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                                    <span className="text-xl">💬</span>
                                </div>
                                <h3 className="font-bold text-slate-900">Frequently Asked Questions</h3>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="p-5 hover:bg-slate-50 transition-colors">
                                        <h4 className="font-semibold text-slate-900 mb-2 text-sm">
                                            {faq.question}
                                        </h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}