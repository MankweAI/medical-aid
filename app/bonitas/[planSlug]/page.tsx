import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BonitasPlanRepositoryAsync, BonitasProcedureRepositoryAsync } from '@/lib/risk/bonitas-resolver-async';
import AppHeader from '@/components/AppHeader';
import { ArrowLeft, ArrowRight, Activity, AlertTriangle } from 'lucide-react';

interface PageProps {
    params: Promise<{ planSlug: string }>;
}

// Static params for build
export async function generateStaticParams() {
    return [
        { planSlug: 'boncap' },
        { planSlug: 'bonclassic' },
        { planSlug: 'boncomprehensive' },
        { planSlug: 'boncomplete' },
        { planSlug: 'boncore' },
        { planSlug: 'bonessential' },
        { planSlug: 'bonessential-select' },
        { planSlug: 'bonprime' },
        { planSlug: 'bonsave' },
        { planSlug: 'bonfit' },
        { planSlug: 'bonstart' },
        { planSlug: 'bonstart-plus' },
        { planSlug: 'hospital-standard' },
        { planSlug: 'primary' },
        { planSlug: 'standard' },
        { planSlug: 'standard-select' },
    ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { planSlug } = await params;
    const plan = await BonitasPlanRepositoryAsync.getBySlug(planSlug);

    if (!plan) {
        return { title: 'Plan Not Found | Bonitas' };
    }

    const canonicalUrl = `https://www.intellihealth.co.za/bonitas/${planSlug}`;

    return {
        title: `${plan.planName} Procedure Costs | Bonitas 2026`,
        description: `Calculate hospital co-payments on Bonitas ${plan.planName}. View costs for gastroscopy, MRI scans, joint replacements and more.`,
        alternates: { canonical: canonicalUrl },
    };
}

export default async function BonitasPlanHubPage({ params }: PageProps) {
    const { planSlug } = await params;

    const [plan, procedures] = await Promise.all([
        BonitasPlanRepositoryAsync.getBySlug(planSlug),
        BonitasProcedureRepositoryAsync.getAll(),
    ]);

    if (!plan) {
        notFound();
    }

    // Group procedures by category
    const grouped = procedures.reduce((acc, proc) => {
        if (!acc[proc.category]) acc[proc.category] = [];
        acc[proc.category].push(proc);
        return acc;
    }, {} as Record<string, typeof procedures>);

    const categoryLabels: Record<string, string> = {
        scope: 'Scope Procedures',
        orthopedic: 'Orthopedic',
        spinal: 'Spinal Surgery',
        laparoscopic: 'Laparoscopic',
        imaging: 'Imaging',
        joint_replacement: 'Joint Replacement',
        ophthalmology: 'Ophthalmology',
        maternity: 'Maternity',
    };

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            <AppHeader />

            <section className="max-w-3xl mx-auto pt-8 px-4 space-y-6">
                {/* Breadcrumb */}
                <Link
                    href="/bonitas"
                    className="group inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors"
                >
                    <div className="p-1.5 bg-white rounded-lg border border-slate-200 group-hover:border-slate-300 shadow-sm">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    Back to Bonitas Plans
                </Link>

                {/* Plan Header */}
                <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-red-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10">
                        <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest">
                            {plan.series}
                        </span>

                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">
                            {plan.planName}
                        </h1>

                        <p className="text-slate-500 text-sm mt-2">
                            Select a procedure to calculate your 2026 co-payment
                        </p>
                    </div>
                </div>

                {/* Network Warning */}
                <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex gap-4">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold text-amber-800 text-sm">Network Requirement</p>
                        <p className="text-sm text-amber-700/80 mt-1">
                            {plan.planName} requires you to use network providers.
                            A 30% co-payment applies at non-network hospitals.
                        </p>
                    </div>
                </div>

                {/* Procedures by Category */}
                {Object.entries(grouped).map(([category, procs]) => (
                    <div key={category} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="w-5 h-5 text-red-500" />
                            <h3 className="font-bold text-slate-800">
                                {categoryLabels[category] || category}
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            {procs.map(proc => (
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
                ))}
            </section>
        </main>
    );
}
