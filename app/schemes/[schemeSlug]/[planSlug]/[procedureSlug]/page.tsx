import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { RiskResolver } from '@/lib/risk/discovery-resolver';
import { ProcedureRepository, PlanRuleRepository } from '@/lib/risk/discovery-resolver';
import { LiabilityCard } from '@/components/risk/LiabilityCard';
import { WaterfallTable } from '@/components/risk/WaterfallTable';
import { ProcedureCTAs } from '@/components/risk/ProcedureCTAs';
import AppHeader from '@/components/AppHeader';
import { ArrowLeft, BookOpen } from 'lucide-react';

// Import plan data for static generation
import { CLASSIC_SMART_2026, ESSENTIAL_SMART_2026, ESSENTIAL_DYNAMIC_SMART_2026 } from '@/data/discovery/smart-series-plans';

interface PageProps {
    params: Promise<{ schemeSlug: string; planSlug: string; procedureSlug: string }>;
}

export async function generateStaticParams() {
    const procedures = ProcedureRepository.getAll();
    const activePlans = [CLASSIC_SMART_2026, ESSENTIAL_SMART_2026, ESSENTIAL_DYNAMIC_SMART_2026];

    const paths: { schemeSlug: string; planSlug: string; procedureSlug: string }[] = [];

    activePlans.forEach(plan => {
        procedures.forEach(proc => {
            paths.push({
                schemeSlug: 'discovery-health',
                planSlug: plan.planId,
                procedureSlug: proc.id
            });
        });
    });

    return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { planSlug, procedureSlug } = await params;
    try {
        const audit = RiskResolver.resolve(planSlug, procedureSlug);
        const cost = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(audit.liability);

        const title = `${audit.procedure.label} Cost on ${audit.plan.plan_name} 2026 | ${cost} Co-payment`;
        const description = `Calculate your ${audit.procedure.label} hospital co-payment on Discovery ${audit.plan.plan_name}. Estimated liability: ${cost}. Network rules, PMB exemptions, and Gap Cover options explained.`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                type: 'article',
                siteName: 'Intellihealth',
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
            },
        };
    } catch (e) {
        return { title: 'Procedure Cost Calculator | Intellihealth' };
    }
}

export default async function LeafPage({ params }: PageProps) {
    const { schemeSlug, planSlug, procedureSlug } = await params;

    let audit;
    try {
        audit = RiskResolver.resolve(planSlug, procedureSlug);
    } catch (error) {
        notFound();
    }

    // JSON-LD Structured Data for MedicalProcedure
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        name: audit.procedure.label,
        alternateName: audit.procedure.medical_term,
        description: audit.procedure.description,
        procedureType: 'https://schema.org/SurgicalProcedure',
        howPerformed: `Performed at hospital or day clinic facility`,
        preparation: audit.procedure.risk_notes,
        followup: 'Consult with your healthcare provider',
        status: 'https://schema.org/EventScheduled',
    };

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="min-h-screen bg-slate-50 pb-20">
                <AppHeader />
                <section className="max-w-3xl mx-auto pt-8 px-4 space-y-6">

                    {/* 1. NAVIGATION BREADCRUMB */}
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/schemes/${schemeSlug}/${planSlug}`}
                            className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors"
                        >
                            <div className="p-1.5 bg-white rounded-lg border border-slate-200 group-hover:border-slate-300 shadow-sm transition-all">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            Back to {audit.plan.plan_name} Overview
                        </Link>
                    </div>

                    {/* 2. THE ANSWER ENGINE UI */}
                    <LiabilityCard audit={audit} />

                    {/* 3. MONETIZATION CTAs */}
                    <ProcedureCTAs
                        procedureName={audit.procedure.label}
                        planName={audit.plan.plan_name}
                        liability={audit.liability}
                        planId={audit.plan.plan_id}
                    />

                    {/* 4. COMPARISON TABLE */}
                    <WaterfallTable audit={audit} />

                    {/* 5. DISCOVERY FOOTER LINK */}
                    <div className="mt-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Explore {audit.plan.plan_name}</h4>
                                <p className="text-xs text-slate-500">View contributions, chronic benefits, and day-to-day limits.</p>
                            </div>
                        </div>
                        <Link
                            href={`/schemes/${schemeSlug}/${planSlug}`}
                            className="px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm rounded-xl transition-colors whitespace-nowrap"
                        >
                            View Full Plan Guide
                        </Link>
                    </div>

                </section>
            </main>
        </>
    );
}
