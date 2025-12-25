import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, ShieldCheck } from 'lucide-react';

import AppHeader from '@/components/AppHeader';
import { HospitalBillInvoice } from '@/components/risk/HospitalBillInvoice';
import RiskAuditFaqs from '@/components/risk/RiskAuditFaqs';
import ContactExpertTrigger from '@/components/risk/ContactExpertTrigger';
import { RiskEngine } from '@/lib/risk/engine';
import { ProcedureRepository, PlanRuleRepository } from '@/lib/risk/repositories';

interface PageProps {
    params: Promise<{ procedureSlug: string; planSlug: string; }>;
}

export async function generateStaticParams() {
    const procedures = ProcedureRepository.getAll();
    const plans = PlanRuleRepository.getAllRules();
    const paths: { procedureSlug: string; planSlug: string }[] = [];

    procedures.forEach(proc => {
        plans.forEach(plan => {
            paths.push({ procedureSlug: proc.id, planSlug: plan.plan_id });
        });
    });
    return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { procedureSlug, planSlug } = await params;
    const audit = RiskEngine.generateFullAudit(procedureSlug, planSlug);

    if (!audit) return { title: 'Audit Not Found' };

    return {
        title: `${audit.procedure.label} on ${audit.plan.plan_name}: ${audit.meta.coverage_percent}% Covered`,
        description: `Official 2026 coverage audit. Base cost: R${audit.breakdown.base_rate}. Your liability: R${audit.liability}.`,
    };
}

export default async function RiskLandingPage({ params }: PageProps) {
    const { procedureSlug, planSlug } = await params;

    // 1. GET THE CORE AUDIT
    const audit = RiskEngine.generateFullAudit(procedureSlug, planSlug);
    if (!audit) notFound();

    // 2. GET THE COMPARISONS (For the Dropdown)
    const planOptions = RiskEngine.compareAllPlans(procedureSlug, planSlug);

    // 3. DEFINE STATIC FAQs (Presentation Layer)
    const faqs = [
        {
            question: "Is this surgery covered in full?",
            answer: audit.meta.is_trap
                ? `No. You must pay R${audit.liability.toLocaleString()} upfront.`
                : `Yes. 100% covered at network providers.`
        },
        {
            question: "What about the Anaesthetist?",
            answer: "This audit covers the Hospital Account only. Anaesthetists bill separately."
        },
        {
            question: "Is this a confirmed quote?",
            answer: "No. This is an actuarial estimate based on 2026 Scheme Rules."
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50/50 pb-32 relative overflow-hidden animate-page-enter">
            <AppHeader />

            {/* HERO SECTION */}
            <section className="relative h-[55vh] flex flex-col items-center justify-center px-6 overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-50/50">
                <div className="absolute top-20 left-6">
                    <Link href="/risk" className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest">
                        <ChevronLeft className="w-4 h-4" /> Back
                    </Link>
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="relative w-56 h-56 mb-8">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="8" className="opacity-10" />
                            <circle
                                cx="50" cy="50" r="45" fill="none" stroke="#10B981" strokeWidth="8"
                                strokeDasharray="282.7"
                                strokeDashoffset={282.7 - (282.7 * audit.meta.coverage_percent) / 100}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                            <span className="text-5xl font-black tracking-tighter">{audit.meta.coverage_percent}%</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 leading-tight">Covered by Scheme</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tighter leading-[0.85] uppercase">Your Surgery <br /> Money Check</h1>
                </div>
            </section>

            {/* DATA DRIVEN INVOICE */}
            <section className="relative z-20 max-w-xl mx-auto -mt-12">
                <HospitalBillInvoice
                    procedure={audit.procedure}
                    plan={audit.plan}
                    liability={audit.liability}
                    planOptions={planOptions}
                    procedureSlug={procedureSlug}
                />

                <div className="px-4 mt-12 space-y-12">
                    <RiskAuditFaqs
                        faqs={faqs}
                        planName={audit.plan.plan_name}
                        profileContext={`${audit.procedure.id} | ${audit.plan.plan_id}`}
                    />

                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Not Sure About Your Doctor?</h2>
                            <p className="text-slate-400 text-sm mb-8 px-4 leading-relaxed">
                                Don't risk a massive shortfall. Our experts can verify if your surgeon has a 2026 Payment Arrangement.
                            </p>
                            <ContactExpertTrigger
                                planName={audit.plan.plan_name}
                                context={`${audit.procedure.label} Clearance Audit`}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}