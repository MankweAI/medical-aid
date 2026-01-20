import Link from 'next/link';
import { ExtractedPlan } from '@/lib/data-loader';
import { ModuleRenderer } from '@/components/modules/ModuleRenderer';
import AppHeader from '@/components/AppHeader';
import { ArrowLeft, Users, DollarSign, Building2 } from 'lucide-react';
import { SchemeHero } from './ui/SchemeHero';
import { SchemeFAQ } from './ui/SchemeFAQ';
import { SchemeCTA } from './ui/SchemeCTA';

interface PlanDetailViewProps {
    plan: ExtractedPlan;
}

export function PlanDetailView({ plan }: PlanDetailViewProps) {
    const { identity, premiums, hospital_benefits, modules, procedures, extraction_metadata } = plan;

    // FAQs
    const faqs = [
        {
            question: `How much does ${identity.plan_name} cost per month?`,
            answer: `The ${identity.plan_name} costs R${premiums.main_member.toLocaleString()}/month for the main member, R${premiums.adult_dependant.toLocaleString()}/month per adult dependant, and R${premiums.child_dependant.toLocaleString()}/month per child.`
        },
        {
            question: `Does ${identity.plan_name} have unlimited hospital cover?`,
            answer: hospital_benefits.annual_limit_unlimited
                ? `Yes, ${identity.plan_name} offers unlimited hospital cover when using approved network hospitals.`
                : `${identity.plan_name} has an annual hospital limit of R${hospital_benefits.annual_limit?.toLocaleString() || 'N/A'}.`
        },
        {
            question: `What chronic benefits does ${identity.plan_name} offer?`,
            answer: modules.some(m => m.type === 'chronic_illness_benefit')
                ? `${identity.plan_name} covers chronic conditions under the Chronic Disease List. You get access to approved medicine and PMB conditions.`
                : `${identity.plan_name} has limited chronic cover. Check the benefits breakdown below.`
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

    const productLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': identity.plan_name,
        'brand': { '@type': 'Brand', 'name': 'Discovery Health' },
        'offers': {
            '@type': 'Offer',
            'price': premiums.main_member,
            'priceCurrency': 'ZAR',
            'priceValidUntil': `${identity.year}-12-31`,
            'availability': 'https://schema.org/InStock'
        }
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />

            <main className="min-h-screen bg-slate-50 pb-20">
                <AppHeader />

                <div className="max-w-4xl mx-auto pt-8 px-4 space-y-8">

                    {/* Back Link */}
                    <Link
                        href="/discovery-health"
                        className="group inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Discovery Health Plans
                    </Link>

                    {/* Shared Hero */}
                    <SchemeHero
                        title={identity.plan_name}
                        subtitle=""
                        kicker={`Discovery Health ${identity.year}`}
                    >
                        {/* Premiums Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 bg-slate-100 rounded-xl text-center">
                                <Users className="w-5 h-5 mx-auto mb-2 text-slate-400" />
                                <p className="text-2xl font-black text-slate-800">R{premiums.main_member.toLocaleString()}</p>
                                <p className="text-xs text-slate-500">Main Member</p>
                            </div>
                            <div className="p-4 bg-slate-100 rounded-xl text-center">
                                <Users className="w-5 h-5 mx-auto mb-2 text-slate-400" />
                                <p className="text-2xl font-black text-slate-800">R{premiums.adult_dependant.toLocaleString()}</p>
                                <p className="text-xs text-slate-500">Adult Dep.</p>
                            </div>
                            <div className="p-4 bg-slate-100 rounded-xl text-center">
                                <Users className="w-5 h-5 mx-auto mb-2 text-slate-400" />
                                <p className="text-2xl font-black text-slate-800">R{premiums.child_dependant.toLocaleString()}</p>
                                <p className="text-xs text-slate-500">Child Dep.</p>
                            </div>
                        </div>

                        {/* MSA */}
                        {premiums.msa_percentage > 0 && (
                            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3">
                                <DollarSign className="w-5 h-5 text-emerald-600" />
                                <p className="text-sm text-slate-700">
                                    <span className="font-bold text-emerald-700">{premiums.msa_percentage}%</span> Medical Savings Account allocation
                                </p>
                            </div>
                        )}
                    </SchemeHero>

                    {/* Hospital Benefits */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Building2 className="w-6 h-6 text-blue-600" />
                            <h2 className="text-lg font-black text-slate-900">Hospital Benefits</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Annual Limit</p>
                                <p className="text-lg font-black text-slate-800">
                                    {hospital_benefits.annual_limit_unlimited ? 'Unlimited' : `R${hospital_benefits.annual_limit?.toLocaleString()}`}
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl">
                                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Network</p>
                                <p className="text-sm font-medium text-slate-700">
                                    {hospital_benefits.network_hospitals?.[0] || 'Any private hospital'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SDUI Modules */}
                    {modules.length > 0 && (
                        <div>
                            <h2 className="text-lg font-black text-slate-900 mb-4">Benefits & Coverage</h2>
                            <ModuleRenderer modules={modules} />
                        </div>
                    )}

                    {/* Procedures */}
                    {procedures.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h2 className="text-lg font-black text-slate-900 mb-4">Procedure Co-payments</h2>
                            <div className="divide-y divide-slate-100">
                                {procedures.map((proc, i) => (
                                    <div key={i} className="py-3 flex items-center justify-between">
                                        <span className="text-slate-700">{proc.procedure_name}</span>
                                        <span className={`font-black ${proc.copayment === 0 ? 'text-emerald-600' : 'text-slate-700'}`}>
                                            R{proc.copayment.toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Data Quality Notice */}
                    {extraction_metadata.requires_review && (
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                            ⚠️ Data confidence: {(extraction_metadata.confidence_score * 100).toFixed(0)}%.
                            Some details may require verification.
                        </div>
                    )}

                    {/* Shared FAQ */}
                    <SchemeFAQ faqs={faqs} />

                    {/* Shared CTA */}
                    <SchemeCTA planName={identity.plan_name} />

                </div>
            </main>
        </>
    );
}
