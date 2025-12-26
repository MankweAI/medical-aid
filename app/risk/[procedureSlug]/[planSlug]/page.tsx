import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { RiskResolver } from '@/lib/risk/resolver';
import { ProcedureRepository } from '@/lib/risk/resolver';
import { LiabilityCard } from '@/components/risk/LiabilityCard';
import { WaterfallTable } from '@/components/risk/WaterfallTable';
import AppHeader from '@/components/AppHeader';

// Import your new plan keys for building paths
import { CLASSIC_SMART_2026, ESSENTIAL_SMART_2026, ESSENTIAL_DYNAMIC_SMART_2026 } from '@/data/discovery/smart-series-plans';


interface PageProps {
    params: Promise<{ schemeSlug: string; planSlug: string; procedureSlug: string }>;
}

// 1. GENERATE STATIC PARAMS (Now using Real 2026 Plans)
export async function generateStaticParams() {
    const procedures = ProcedureRepository.getAll();

    // List of all active plans we have built engines for
    const activePlans = [
        CLASSIC_SMART_2026,
        ESSENTIAL_SMART_2026,
        ESSENTIAL_DYNAMIC_SMART_2026
    ];

    const paths: { schemeSlug: string; planSlug: string; procedureSlug: string }[] = [];

    activePlans.forEach(plan => {
        const schemeSlug = 'discovery-health'; // Currently hardcoded for Discovery

        // For now, we assume all procedures are "available" to test the engine
        // In future, you can filter this based on plan exclusions if needed
        procedures.forEach(proc => {
            paths.push({
                schemeSlug,
                planSlug: plan.planId, // Uses the real ID (e.g. 'discovery-smart-classic-2026')
                procedureSlug: proc.id
            });
        });
    });

    return paths;
}

// 2. DYNAMIC METADATA
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { planSlug, procedureSlug } = await params;

    try {
        // Use the new Resolver
        const audit = RiskResolver.resolve(planSlug, procedureSlug);
        const cost = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(audit.liability);

        return {
            title: `${audit.procedure.label} Cost on ${audit.plan.plan_name}: ${cost} (2026)`,
            description: `Calculate your co-payment for a ${audit.procedure.label} on the ${audit.plan.plan_name} plan. Current 2026 rules show a liability of ${cost}.`,
        };
    } catch (e) {
        return { title: 'Benefit Calculator' };
    }
}

export default async function LeafPage({ params }: PageProps) {
    const { planSlug, procedureSlug } = await params;

    // 3. THE SWITCH: Call the Resolver
    // This will now trigger the DiscoveryRiskEngine -> Adapter -> Generic Audit flow
    let audit;
    try {
        audit = RiskResolver.resolve(planSlug, procedureSlug);
    } catch (error) {
        console.error(error);
        notFound(); // If the resolver fails (e.g. plan doesn't exist), 404
    }

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <AppHeader />
            <section className="max-w-3xl mx-auto pt-8 px-4 space-y-8">

                {/* 4. The Answer Engine UI (Unchanged, it just consumes the generic audit) */}
                <LiabilityCard audit={audit} />
                <WaterfallTable audit={audit} />

            </section>
        </main>
    );
}