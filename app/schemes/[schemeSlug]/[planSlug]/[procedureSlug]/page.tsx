import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { RiskResolver as RiskEngine } from '@/lib/risk/resolver'; // Alias for compatibility
import { PlanRuleRepository, ProcedureRepository } from '@/lib/risk/resolver';


import { LiabilityCard } from '@/components/risk/LiabilityCard';
import { WaterfallTable } from '@/components/risk/WaterfallTable';
import AppHeader from '@/components/AppHeader';

interface PageProps {
    params: Promise<{ schemeSlug: string; planSlug: string; procedureSlug: string }>;
}

// 1. GENERATE STATIC PARAMS (The "Head" Strategy) [cite: 56]
// We generate the top combinations to ensure instant load times.
export async function generateStaticParams() {
    const plans = PlanRuleRepository.getAllRules();
    const procedures = ProcedureRepository.getAll();
    const paths: { schemeSlug: string; planSlug: string; procedureSlug: string }[] = [];

    // Cartesian Product: Plan x Procedure [cite: 34]
    plans.forEach(plan => {
        // Extract scheme slug (e.g., 'discovery-health' from plan_id)
        // Note: In a real app, 'schemeSlug' would be a property of the plan.
        // For now, we assume strict naming: 'discovery-core-classic-2026'
        const schemeSlug = 'discovery-health'; // Hardcoded for this demo context

        if (plan.available_procedure_ids) {
            plan.available_procedure_ids.forEach(procId => {
                paths.push({
                    schemeSlug,
                    planSlug: plan.plan_id,
                    procedureSlug: procId
                });
            });
        }
    });

    return paths;
}

// 2. DYNAMIC METADATA (CTR Booster) [cite: 45]
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { planSlug, procedureSlug } = await params;

    // We run the audit solely to get the cost for the title tag
    try {
        const audit = RiskEngine.resolve(planSlug, procedureSlug);

        const cost = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(audit.liability);

        return {
            title: `${audit.plan.plan_name} ${audit.procedure.label} Cost: ${cost} Co-Payment (2026)`,
            description: `Calculate your financial liability for a ${audit.procedure.label} on the ${audit.plan.plan_name}. Current 2026 rules show a co-payment of ${cost}. Check your gap cover options.`,
        };
    } catch (e) {
        return { title: 'Cost Calculator' };
    }
}

export default async function LeafPage({ params }: PageProps) {
    const { planSlug, procedureSlug } = await params;
    const plan = PlanRuleRepository.getRuleForPlan(planSlug);
    const procedure = ProcedureRepository.getById(procedureSlug);

    if (!plan || !procedure || !plan.available_procedure_ids?.includes(procedureSlug)) {
        notFound();
    }

    const audit = RiskEngine.resolve(planSlug, procedureSlug);


    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <AppHeader />
            <section className="max-w-3xl mx-auto pt-8 px-4 space-y-8">

                {/* 3. THE ANSWER ENGINE UI  */}
                <LiabilityCard audit={audit} />

                {/* 4. THE WATERFALL BREAKDOWN [cite: 48] */}
                <WaterfallTable audit={audit} />

            </section>
        </main>
    );
}