import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { RiskEngine } from '@/lib/risk/engine';
import { PlanRuleRepository, ProcedureRepository } from '@/lib/risk/repositories';
import { HospitalBillInvoice } from '@/components/risk/HospitalBillInvoice';
import AppHeader from '@/components/AppHeader';

interface PageProps {
    params: Promise<{ procedureSlug: string; planSlug: string }>;
}

export async function generateStaticParams() {
    const plans = PlanRuleRepository.getAllRules();
    const paths: { procedureSlug: string; planSlug: string }[] = [];

    plans.forEach(plan => {
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { procedureSlug, planSlug } = await params;

    const plan = PlanRuleRepository.getRuleForPlan(planSlug);
    const procedure = ProcedureRepository.getById(procedureSlug);

    if (!plan || !procedure || !plan.available_procedure_ids?.includes(procedureSlug)) {
        return {
            title: 'Plan Coverage Not Found',
        };
    }

    return {
        title: `${procedure.label} on ${plan.plan_name} | 2026 Cost Audit`,
        description: `Actuarial audit of member liability for ${procedure.label} on the ${plan.plan_name} plan (2026). Check deductibles, co-pays, and network penalties.`,
    };
}

export default async function AuditPage({ params }: PageProps) {
    // 1. Await Params for Next.js 15 compatibility
    const { procedureSlug, planSlug } = await params;

    // 2. Fetch Data
    const plan = PlanRuleRepository.getRuleForPlan(planSlug);
    const procedure = ProcedureRepository.getById(procedureSlug);

    // 3. Logic Gate: Validate combination before calling the engine
    if (!plan || !procedure || !plan.available_procedure_ids?.includes(procedureSlug)) {
        notFound();
    }

    // 4. Run Risk Engine
    const audit = RiskEngine.audit(planSlug, procedureSlug);

    // 5. Generate Plan Comparison Options
    const planOptions = PlanRuleRepository.getAllRules().map(p => ({
        id: p.plan_id,
        name: p.plan_name,
        liability: RiskEngine.calculateLiability(procedureSlug, p.plan_id),
        isCurrent: p.plan_id === planSlug,
        slug: p.plan_id
    }));

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <AppHeader />
            <section className="max-w-3xl mx-auto pt-4">
                <HospitalBillInvoice
                    audit={audit}
                    planOptions={planOptions}
                    procedureSlug={procedureSlug}
                />
            </section>
        </main>
    );
}