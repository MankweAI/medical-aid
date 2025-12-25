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

// --- 1. UPDATED BUILD LOGIC (Only Valid Combinations) ---
export async function generateStaticParams() {
    // We iterate PLANS first, because plans dictate availability
    const plans = PlanRuleRepository.getAllRules();
    const paths: { procedureSlug: string; planSlug: string }[] = [];

    plans.forEach(plan => {
        // Only generate routes for procedures explicitly linked to this plan
        // This prevents "Essential Smart + Hip Replacement" pages from being built
        if (plan.available_procedure_ids && plan.available_procedure_ids.length > 0) {
            plan.available_procedure_ids.forEach(procId => {
                paths.push({
                    procedureSlug: procId,
                    planSlug: plan.plan_id
                });
            });
        }
    });

    return paths;
}

// --- 2. UPDATED METADATA (With Validation) ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { procedureSlug, planSlug } = await params;

    const plan = PlanRuleRepository.getRuleForPlan(planSlug);
    const procedure = ProcedureRepository.getById(procedureSlug);

    // Actuarial Validation: If plan doesn't exist OR procedure isn't covered by this plan
    if (!plan || !procedure || !plan.available_procedure_ids.includes(procedureSlug)) {
        return {
            title: 'Plan Coverage Not Found',
        };
    }

    return {
        title: `${procedure.label} on ${plan.plan_name} | 2026 Cost Audit`,
        description: `Actuarial audit of member liability for ${procedure.label} on the ${plan.plan_name} plan (2026). Check deductibles, co-pays, and network penalties.`,
    };
}

// --- 3. MAIN PAGE COMPONENT (With Logic Gate) ---
export default async function AuditPage({ params }: PageProps) {
    const { procedureSlug, planSlug } = await params;

    // Fetch Data
    const plan = PlanRuleRepository.getRuleForPlan(planSlug);
    const procedure = ProcedureRepository.getById(procedureSlug);

    // LOGIC GATE: Immediate 404 if this combination is actuarially invalid
    // This protects the user from seeing "R0 Deductible" on an excluded procedure
    if (!plan || !procedure || !plan.available_procedure_ids.includes(procedureSlug)) {
        notFound();
    }

    // Run the Risk Engine (Now guaranteed to be safe)
    const audit = RiskEngine.audit(planSlug, procedureSlug);

    // Helpers for UI
    const planOptions = PlanRuleRepository.getAllRules().map(p => ({
        id: p.plan_id,
        name: p.plan_name
    }));

    // Generate FAQ schema specifically for this valid combination
    const faqs = [
        {
            question: `Is ${procedure.label} covered in full on ${plan.plan_name}?`,
            answer: `It depends on the provider. While the plan offers cover, you must look out for the ${audit.breakdown.deductibles.total_deductible > 0
                    ? `R${audit.breakdown.deductibles.total_deductible.toLocaleString()} upfront payment`
                    : 'network restrictions'
                }.`
        },
        {
            question: "What if I use a non-network hospital?",
            answer: plan.network_type === 'any'
                ? "You have freedom of choice for hospitals, but doctor rates may still cause shortfalls."
                : `You will face a penalty of R${plan.deductibles.penalty_non_network.toLocaleString()} for using a non-${plan.network_type} facility.`
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <AppHeader />

            {/* Breadcrumbs / Nav */}
            <div className="max-w-3xl mx-auto px-4 pt-6 pb-2">
                <Link
                    href="/"
                    className="inline-flex items-center text-slate-500 hover:text-emerald-600 transition-colors text-sm font-medium"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Search
                </Link>
            </div>

            <section className="max-w-3xl mx-auto pt-4">
                <div className="flex items-center gap-2 px-4 mb-6">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-bold tracking-wider text-emerald-800 uppercase bg-emerald-100 px-2 py-1 rounded">
                        2026 Verified Data
                    </span>
                </div>

                <HospitalBillInvoice
                    audit={audit}
                    planOptions={planOptions}
                    procedureSlug={procedureSlug}
                />

                <div className="px-4 mt-12 space-y-12">
                    <RiskAuditFaqs
                        faqs={faqs}
                        planName={plan.plan_name}
                        profileContext={`${procedure.id} | ${plan.plan_id}`}
                    />

                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Not Sure About Your Doctor?</h2>
                            <p className="text-slate-400 text-sm mb-8 px-4 leading-relaxed">
                                Don't risk a massive shortfall. Our experts can verify if your surgeon has a 2026 Payment Arrangement.
                            </p>
                            <ContactExpertTrigger
                                planName={plan.plan_name}
                                context={`${procedure.label} Clearance Audit`}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}