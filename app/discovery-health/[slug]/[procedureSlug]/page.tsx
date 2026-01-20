import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
    getPlanBySlug,
    getAllPlans,
    slugifyProcedure,
    getProcedureAcrossPlans,
    getAverageCopayment
} from '@/lib/data-loader';
import AppHeader from '@/components/AppHeader';
import { ArrowLeft, CheckCircle2, XCircle, Info, Phone, GitCompare, ArrowRight, BookOpen, FileText } from 'lucide-react';
import { SchemeHero } from '@/components/scheme/ui/SchemeHero';
import { CostExplainer } from '@/components/scheme/ui/CostExplainer';
import { SchemeFAQ } from '@/components/scheme/ui/SchemeFAQ';
import { formatCurrency } from '@/lib/utils';
import { SchemeCTA } from '@/components/scheme/ui/SchemeCTA';
import { PatientGuide } from '@/components/scheme/ui/PatientGuide';
import { ProcedureTimeline } from '@/components/scheme/ui/ProcedureTimeline';
import { CostBenchmark } from '@/components/scheme/ui/CostBenchmark';



interface PageProps {
    params: Promise<{ slug: string; procedureSlug: string }>; // Trigger HMR
}

const SCHEME_SLUG = 'discovery-health';

export async function generateStaticParams() {
    const plans = getAllPlans();
    const paths: { slug: string; procedureSlug: string }[] = [];

    plans.forEach(plan => {
        plan.procedures.forEach(proc => {
            paths.push({
                slug: plan.identity.plan_slug,
                procedureSlug: slugifyProcedure(proc.procedure_name)
            });
        });
    });

    return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug: planSlug, procedureSlug } = await params;
    const plan = getPlanBySlug(SCHEME_SLUG, planSlug);

    if (!plan) return { title: 'Not Found | Intellihealth' };

    const procedure = plan.procedures.find(p => slugifyProcedure(p.procedure_name) === procedureSlug);
    if (!procedure) return { title: 'Procedure Not Found | Intellihealth' };

    const cost = procedure.copayment === 0 ? 'Fully Covered' : (procedure.copayment ? `R${formatCurrency(procedure.copayment)} Co-payment` : 'Coverage Varies');

    const title = `${procedure.procedure_name} Cost on ${plan.identity.plan_name} | ${cost}`;
    const description = `Check coverage for ${procedure.procedure_name} on Discovery Health ${plan.identity.plan_name}. Cost: ${cost}. View network rules and PMB cover updates for ${plan.identity.year}.`;
    const canonicalUrl = `https://www.intellihealth.co.za/discovery-health/${planSlug}/${procedureSlug}`;

    return {
        title,
        description,
        alternates: { canonical: canonicalUrl },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: 'article',
            siteName: 'Intellihealth'
        }
    };
}

export default async function PlanProcedurePage({ params }: PageProps) {
    const { slug: planSlug, procedureSlug } = await params;

    const plan = getPlanBySlug(SCHEME_SLUG, planSlug);
    if (!plan) notFound();

    const procedure = plan.procedures.find(p => slugifyProcedure(p.procedure_name) === procedureSlug);
    if (!procedure) notFound();

    // Get comparison data (other plans for same procedure)
    const comparisonData = getProcedureAcrossPlans(procedureSlug);
    const relatedPlans = comparisonData?.plans
        .filter(p => p.plan_slug !== planSlug) // Exclude current
        .sort((a, b) => a.copayment - b.copayment)
        .sort((a, b) => (a.copayment ?? 0) - (b.copayment ?? 0))
        .slice(0, 3) || []; // Top 3 cheapest/alternatives

    // ... (previous code)

    // Benchmark Data
    const benchmark = getAverageCopayment(procedureSlug);

    // Determine Network Status & Premium Data
    const premium = plan.premiums?.main_member;
    const networkHospitals = plan.hospital_benefits?.network_hospitals || [];
    const isNetworkRestricted = networkHospitals.some(h => h.toLowerCase().includes('network') || h.toLowerCase().includes('specific'));
    const networkStatus = isNetworkRestricted ? "Network Hospitals Only" : "Any Private Hospital";

    // Financial Readiness Data (Moved up for FAQ access)
    const msaModule = plan.modules?.find(m => m.type === 'medical_savings_account');
    const msaData = msaModule?.data as any; // Cast to allow access to dynamic structure

    let msaLimit: string | undefined;

    if (msaData?.annual_allocation?.main_member) {
        msaLimit = `R${formatCurrency(msaData.annual_allocation.main_member)}`;
    } else if (msaData?.monthly_allocation?.main_member) {
        msaLimit = `R${formatCurrency(msaData.monthly_allocation.main_member * 12)} (approx. annual)`;
    }

    // Jargon Buster Data - Data First approach
    const defaultJargonBusters = [
        {
            term: "Co-payment",
            def: "A fixed amount you must pay upfront for a medical service. The scheme pays the rest."
        },
        {
            term: "PMB (Prescribed Minimum Benefit)",
            def: "A set of conditions that medical schemes must cover in full by law, provided you use a Designated Service Provider (DSP)."
        },
        {
            term: "Network Hospital",
            def: "A hospital that has an agreement with Discovery Health to charge an agreed rate. Using a non-network hospital may result in a higher co-payment."
        }
    ];

    const jargonBusters = (procedure.jargon_busters && procedure.jargon_busters.length > 0)
        ? procedure.jargon_busters.map(jb => ({ term: jb.term, def: jb.definition }))
        : defaultJargonBusters;

    // Dynamic Cost Explanation & Normalization
    let costExplanation = procedure.marketing_description || "";
    let displayCoPayment = procedure.copayment;
    let costNote = "";

    // Data Normalization Logic
    if (procedure.copayment !== null && procedure.copayment !== undefined) {
        if (procedure.copayment > 2000) {
            // Likely a Hospital Co-payment
            costNote = "Hospital Rate";
            // Check for savings opportunity
            const notes = procedure.notes?.toLowerCase() || "";
            if (notes.includes("day surgery") || notes.includes("day clinic") || notes.includes("in-rooms")) {
                costNote += " (Savings available)";
            }
        } else if (procedure.copayment === 0) {
            costNote = "In-Network Rate";
        }
    }


    if (!costExplanation) {
        if (procedure.copayment === 0) {
            costExplanation = `Good news! On the ${plan.identity.plan_name}, ${procedure.procedure_name} is fully covered. This means you won't have to pay any upfront fees if you use a provider in the scheme's network. Make sure to obtain pre-authorization to secure this benefit.`;
        } else if (procedure.copayment !== null && procedure.copayment !== undefined && procedure.copayment < 2000) {
            costExplanation = `On the ${plan.identity.plan_name}, you effectively share the cost with the scheme. The R${formatCurrency(procedure.copayment)} co-payment is a relatively small portion of the total procedure cost, designed to keep your monthly premiums lower.`;
        } else if (procedure.copayment !== null && procedure.copayment !== undefined) {
            // ... existing logic for high premiums ...
            const isHighPremium = (plan.premiums?.main_member || 0) > 6000;
            if (isHighPremium) {
                costExplanation = `Although ${plan.identity.plan_name} is a premium plan, this procedure attracts a co-payment of R${formatCurrency(procedure.copayment)}. This is typically a deductible applied when using a specific setting (e.g., Hospital vs. Day Clinic) or a provider outside the plan's network.`;
            } else {
                costExplanation = `This procedure attracts a significant co-payment of R${formatCurrency(procedure.copayment)} on the ${plan.identity.plan_name}. This often happens on plans with lower premiums where large costs are shared for elective procedures.`;
            }
        } else {
            costExplanation = `Coverage terms for ${procedure.procedure_name} on the ${plan.identity.plan_name} may depend on specific conditions or provider networks. Please contact the scheme for a detailed quote.`;
        }

        // Scenario Analysis: MSA Link
        const hasMSA = plan.modules?.some(m => m.type === 'medical_savings_account');
        if ((procedure.copayment ?? 0) > 0 && hasMSA) {
            costExplanation += " You may be able to use your Medical Savings Account (MSA) to fund this co-payment, provided you have funds available.";
        }
    }

    // Dynamic FAQ Generation (SEO Phase 5)
    // We prioritize unique, plan-specific questions over generic ones.
    const scenarioFaqs: { question: string; answer: string }[] = [];

    // Plan-specific identifiers for uniqueness
    const planPremium = plan.premiums?.main_member || 0;
    const msaPercentage = plan.premiums?.msa_percentage || 0;
    const rateCovered = plan.hospital_benefits?.rate_covered || "100%";
    const exclusions = plan.hospital_benefits?.exclusions || [];

    // 1. Waiting Periods - with premium context
    const wp = plan.hospital_benefits?.waiting_periods;
    if (wp) {
        scenarioFaqs.push({
            question: `Are there waiting periods for ${procedure.procedure_name} on the ${plan.identity.plan_name} (${plan.identity.year})?`,
            answer: `Yes, Discovery Health waiting periods apply to your R${formatCurrency(planPremium)}/month plan. For ${procedure.procedure_name}, expect a ${wp.general || '3'} month general waiting period for new members. Pre-existing conditions may have a ${wp.pre_existing || '12'} month waiting period. Contact Discovery to confirm your specific status.`
        });
    }

    // 2. Network Specifics - with premium and MSA context
    const networkNames = plan.hospital_benefits?.network_hospitals?.join(", ") || "Any private hospital";
    if (isNetworkRestricted) {
        scenarioFaqs.push({
            question: `Which hospitals can I use for ${procedure.procedure_name} on ${plan.identity.plan_name}?`,
            answer: `Your ${plan.identity.plan_name} plan (R${formatCurrency(planPremium)}/month) requires you to use: ${networkNames}. Going outside this network for ${procedure.procedure_name} may result in a significant out-of-pocket deductible. This network restriction helps keep your premiums at R${formatCurrency(planPremium)}.`
        });
    } else {
        scenarioFaqs.push({
            question: `Do I have hospital choice for ${procedure.procedure_name} on ${plan.identity.plan_name}?`,
            answer: `Yes! At R${formatCurrency(planPremium)}/month, the ${plan.identity.plan_name} offers broad hospital access. You can choose ${networkNames} for this procedure. Discovery pays up to ${rateCovered} of the Discovery Health Rate for healthcare professionals.`
        });
    }

    // 3. Financial Mechanics - with specific MSA allocation
    if (msaModule) {
        const msaAnnual = msaLimit || `${msaPercentage}% of your premium`;
        const isThreshold = plan.modules?.some(m => m.type === 'day_to_day_benefit' && JSON.stringify(m.data).includes('above_threshold_benefit'));
        if (isThreshold) {
            scenarioFaqs.push({
                question: `How does ${procedure.procedure_name} affect my Annual Threshold on ${plan.identity.plan_name}?`,
                answer: `On ${plan.identity.plan_name}, your MSA allocation is ${msaAnnual}. Hospital procedures like ${procedure.procedure_name} accumulate towards your Annual Threshold. Once you reach the threshold (after your MSA and Self-Payment Gap), the Above Threshold Benefit covers approved day-to-day expenses.`
            });
        } else {
            scenarioFaqs.push({
                question: `Can I use my MSA for ${procedure.procedure_name} costs on ${plan.identity.plan_name}?`,
                answer: `Your ${plan.identity.plan_name} allocates ${msaAnnual} annually to your Medical Savings Account. Hospital admission costs for ${procedure.procedure_name} are typically paid from the Hospital Benefit. However, the R${formatCurrency(procedure.copayment ?? 0)} co-payment and any related pathology or anaesthetist accounts may be funded from your MSA.`
            });
        }
    }

    // 4. DSP & Pre-auth - with rate context
    if (plan.hospital_benefits?.designated_service_provider_required) {
        scenarioFaqs.push({
            question: `Must I use a DSP for ${procedure.procedure_name} on ${plan.identity.plan_name}?`,
            answer: `Yes. The ${plan.identity.plan_name} requires you to use a Designated Service Provider (DSP) for PMB conditions like ${procedure.procedure_name} to receive full ${rateCovered} cover. Using a non-DSP may result in you being liable for part of the hospital account. Call 0860 99 88 77 to find your nearest DSP.`
        });
    }

    // 5. Exclusions - if the plan has them
    if (exclusions.length > 0) {
        scenarioFaqs.push({
            question: `What exclusions should I know about for ${plan.identity.plan_name}?`,
            answer: `The ${plan.identity.plan_name} (R${formatCurrency(planPremium)}/month) excludes: ${exclusions.slice(0, 3).join(", ")}. These conditions are not covered under your Hospital Benefit. Check your benefit guide for the full list.`
        });
    }

    // 6. Procedure-specific notes - if available from data
    if (procedure.notes && procedure.notes.length > 20) {
        scenarioFaqs.push({
            question: `Are there special rules for ${procedure.procedure_name} on ${plan.identity.plan_name}?`,
            answer: `Yes. ${procedure.notes} This is specific to the ${plan.identity.plan_name} benefit structure.`
        });
    }

    // FAQs - Data First approach
    let faqs = procedure.faqs || [];

    if (faqs.length === 0) {
        // Use Scenario FAQs if available, otherwise fallback to generic
        if (scenarioFaqs.length > 0) {
            faqs = scenarioFaqs;
        } else {
            faqs = [
                {
                    question: `How much is the co-payment for ${procedure.procedure_name} on ${plan.identity.plan_name}?`,
                    answer: procedure.copayment === 0
                        ? `There is no co-payment for ${procedure.procedure_name} on ${plan.identity.plan_name} if you use a network provider.`
                        : `You will need to pay an upfront co-payment of ${procedure.copayment ? 'R' + formatCurrency(procedure.copayment) : 'a variable amount'} for ${procedure.procedure_name} on this plan.`
                },
                {
                    question: `Is ${procedure.procedure_name} covered as a PMB?`,
                    answer: procedure.pmb_covered
                        ? `Yes, ${procedure.procedure_name} is listed as a potential Prescribed Minimum Benefit (PMB) on this plan, subject to clinical criteria.`
                        : `No, ${procedure.procedure_name} is generally not covered as a PMB on this plan, meaning co-payments usually apply.`
                },
                {
                    question: `Why is there a co-payment for ${procedure.procedure_name}?`,
                    answer: costExplanation
                }
            ];
        }
    }

    const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(f => ({
            '@type': 'Question',
            'name': f.question,
            'acceptedAnswer': { '@type': 'Answer', 'text': f.answer }
        }))
    };

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.intellihealth.co.za/' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Discovery Health', 'item': 'https://www.intellihealth.co.za/discovery-health' },
            { '@type': 'ListItem', 'position': 3, 'name': plan.identity.plan_name, 'item': `https://www.intellihealth.co.za/discovery-health/${planSlug}` },
            { '@type': 'ListItem', 'position': 4, 'name': procedure.procedure_name, 'item': `https://www.intellihealth.co.za/discovery-health/${planSlug}/${procedureSlug}` }
        ]
    };

    const procedureLd = {
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        'name': procedure.procedure_name,
        'procedureType': 'SurgicalProcedure',
        'bodyLocation': 'Body',
        'status': 'Active',
        'offers': {
            '@type': 'Offer',
            'price': procedure.copayment ?? 0,
            'priceCurrency': 'ZAR',
            'priceValidUntil': `${plan.identity.year}-12-31`,
            'description': `Co-payment for ${procedure.procedure_name} on ${plan.identity.plan_name}`
        }
    };

    const hospitalNetwork = plan.hospital_benefits?.network_hospitals?.[0] || "Any private hospital";

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureLd) }} />

            <main className="min-h-screen bg-slate-50 pb-20">
                <AppHeader />

                <div className="max-w-3xl mx-auto pt-8 px-4 space-y-6">

                    {/* Breadcrumb / Back */}
                    <Link
                        href={`/discovery-health/${planSlug}`}
                        className="group inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to {plan.identity.plan_name}
                    </Link>

                    {/* Shared Hero */}
                    <CostExplainer
                        procedureName={procedure.procedure_name}
                        planName={plan.identity.plan_name}
                        year={plan.identity.year}
                        premium={plan.premiums?.main_member || 0}
                        defaultCost={procedure.copayment ?? 0}
                        defaultLabel={
                            (procedure.copayment ?? 0) > 2000 ? "Hospital Rate" : "Standard Rate"
                        }
                        planNetworkStatus={networkStatus}
                        alternateCost={
                            // Try to find an alternative cost in the notes (simple regex for "R0" or similar)
                            procedure.notes?.includes("R0") ? 0 : undefined
                        }
                        alternateLabel={
                            procedure.notes?.toLowerCase().includes("day") ? "Day Clinic Rate" :
                                procedure.notes?.toLowerCase().includes("rooms") ? "In-Rooms Rate" : "Alternative Rate"
                        }
                    >
                        {/* Premium Context Card (Removed as per previous refactor, now handled by Tag in CostExplainer) */}
                    </CostExplainer>

                    {/* Enhanced Explainer Section */}
                    <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10">
                            <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-3">
                                <BookOpen className="w-5 h-5 text-purple-600" />
                                Understanding this Cost
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                {costExplanation}
                            </p>

                            {/* Jargon Busters Link */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                                {jargonBusters.map(jb => (
                                    <div key={jb.term} className="bg-slate-50 p-3 rounded-lg">
                                        <p className="text-xs font-bold text-slate-700 mb-1">{jb.term}</p>
                                        <p className="text-[10px] text-slate-500 leading-tight">{jb.def}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    {/* Explainer Section */}
                    {/* ... Existing Explainer ... */}

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Left Column */}
                        <div className="space-y-4">
                            {/* Cost Benchmark (HMR) */}
                            {benchmark && (
                                <CostBenchmark
                                    procedureName={procedure.procedure_name}
                                    yourCost={procedure.copayment ?? 0}
                                    averageCost={benchmark.average}
                                />
                            )}

                            {/* PMB Status */}
                            <div className={`p-6 rounded-2xl border ${procedure.pmb_covered ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-200'}`}>
                                <div className="flex items-center gap-3 mb-2">
                                    {procedure.pmb_covered
                                        ? <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                        : <Info className="w-6 h-6 text-slate-400" />
                                    }
                                    <h3 className="font-bold text-slate-900">PMB Status</h3>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {procedure.pmb_covered
                                        ? `This procedure is listed as a Prescribed Minimum Benefit (PMB) condition. It may be covered in full if specific clinical criteria are met.${plan.hospital_benefits?.designated_service_provider_required
                                            ? " Please note: You must use a Designated Service Provider (DSP) to guarantee full cover."
                                            : ""
                                        }`
                                        : "This procedure is not typically covered as a PMB, meaning standard scheme rules and co-payments apply."
                                    }
                                </p>
                            </div>

                            {/* Patient Guide (Preparation & Recovery) */}
                            <PatientGuide
                                preparation={procedure.preparation || []}
                                recoveryTime={procedure.recovery_time || ""}
                                msaLimit={msaLimit}
                            />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            {/* Timeline */}
                            <ProcedureTimeline
                                planName={plan.identity.plan_name}
                                isInNetworkOnly={plan.hospital_benefits?.network_hospitals?.[0]?.toLowerCase().includes("network")}
                                rateCovered={rateCovered}
                                hospitalNetwork={hospitalNetwork}
                            />

                            {/* Network Rules */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <Info className="w-6 h-6 text-blue-500" />
                                    <h3 className="font-bold text-slate-900">Important Notes</h3>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {procedure.notes || "Always obtain pre-authorization before your procedure. Use a network hospital to avoid additional deductibles."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Compare with other plans */}
                    {relatedPlans.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <GitCompare className="w-5 h-5 text-purple-500" />
                                <h2 className="text-lg font-black text-slate-900">Compare with other plans</h2>
                            </div>
                            <div className="space-y-3">
                                {relatedPlans.map(rp => (
                                    <Link
                                        key={rp.plan_slug}
                                        href={`/discovery-health/${rp.plan_slug}/${procedureSlug}`}
                                        className="flex items-center justify-between p-4 bg-slate-50 hover:bg-purple-50 rounded-xl border border-slate-100 hover:border-purple-200 transition-all group"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <p className="font-bold text-slate-700 group-hover:text-purple-700">{rp.plan_name}</p>
                                            {/* Context: Show Premium */}
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                                    Premium: R{formatCurrency(rp.premium || 0)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-0.5">
                                            <span className={`font-black ${rp.copayment === 0 ? 'text-emerald-600' : 'text-slate-700'}`}>
                                                {rp.copayment !== null && rp.copayment !== undefined
                                                    ? `R${formatCurrency(rp.copayment)}`
                                                    : 'N/A'
                                                }
                                            </span>
                                            {rp.copayment === 0 && (
                                                <span className="text-[10px] font-bold text-emerald-600">Fully Covered</span>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-4 text-center">
                                <Link
                                    href={`/discovery-health/${procedureSlug}`}
                                    className="text-sm font-bold text-purple-600 hover:text-purple-700"
                                >
                                    View full comparison table
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Shared FAQ */}
                    <SchemeFAQ faqs={faqs} />

                    {/* Shared CTA */}
                    <SchemeCTA planName={plan.identity.plan_name} />

                </div>
            </main>
        </>
    );
}
