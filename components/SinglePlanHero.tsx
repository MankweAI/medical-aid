'use client';

import { useMemo, useState, useEffect } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { PricingEngine } from '@/utils/engine';
import {
    ShieldCheck,
    Sparkles,
    AlertTriangle,
    ChevronRight,
    ArrowLeft,
    Building2,
    Activity,
    Stethoscope,
    ShieldAlert,
    Wallet,
    Plus,
    CheckCircle2
} from 'lucide-react';
import ExpertModal from '@/components/ExpertModal';
import ChatWidget from '@/components/ChatWidget';
import FeedSkeleton from '@/components/skeletons/FeedSkeleton';
import clsx from 'clsx';
import { Plan } from '@/utils/types';
import { Persona } from '@/utils/persona';

interface Props {
    persona: Persona;
    plan?: Plan;
}

export default function SinglePlanHero({ persona, plan: anchorPlan }: Props) {
    const { state, isChatOpen, setIsChatOpen } = usePersona();
    const [isClient, setIsClient] = useState(false);
    const [expandedConcern, setExpandedConcern] = useState<number | null>(null);
    const [selectedConcern, setSelectedConcern] = useState<{ q: string; ctx: string } | null>(null);

    useEffect(() => { setIsClient(true); }, []);

    const displayPlan = useMemo(() => {
        if (!anchorPlan || !persona) return null;
        try {
            const contribution = anchorPlan.contributions[0];
            const financials = PricingEngine.calculateProfile(contribution, state.members, state.income);
            return { ...anchorPlan, price: financials.monthlyPremium, savings_annual: financials.savings.annualAllocation };
        } catch (e) { return null; }
    }, [state, anchorPlan, persona]);

    const fmt = (val: number) => new Intl.NumberFormat('en-ZA', {
        style: 'currency', currency: 'ZAR', maximumFractionDigits: 0
    }).format(val);

    // Dynamic concern-based views
    // Dynamic concern-based views (Now using FAQs)
    const concernViews = useMemo(() => {
        if (!displayPlan) return [];

        // Use FAQs if available, taking top 3
        if (displayPlan.faq && displayPlan.faq.length > 0) {
            return displayPlan.faq.slice(0, 3).map(f => ({
                question: f.question,
                answer: f.answer,
                icon: ShieldAlert, // Default icon for FAQs
                property: "FAQ",   // Generic property label
                context: `FAQ: ${f.question}`
            }));
        }

        // Fallback for plans without FAQs (graceful degradation)
        return [
            {
                question: "Which hospitals can I actually use?",
                property: "Network Restriction",
                icon: Building2,
                answer: `This is a ${displayPlan.network_restriction} plan. You are covered at ${displayPlan.network_details.hospitals} hospitals, with GPs listed as ${displayPlan.network_details.gps}.`,
                context: `Hospital Rules: ${displayPlan.network_restriction}`
            },
            {
                question: "How does this handle chronic illness?",
                property: "Chronic & Oncology",
                icon: Activity,
                answer: `Covers ${displayPlan.chronic_conditions} conditions. Oncology is rated as ${displayPlan.limits.oncology.status}${displayPlan.limits.oncology.value > 0 ? ` up to ${fmt(displayPlan.limits.oncology.value)}` : ''}.`,
                context: `Chronic Data: ${displayPlan.chronic_conditions} conditions`
            },
            {
                question: "Will I face large upfront co-payments?",
                property: "Procedure Copays",
                icon: Stethoscope,
                answer: `For major procedures like joint replacements, the co-pay is ${displayPlan.procedure_copays.joint_replacement}. MRI/CT scans carry a ${fmt(displayPlan.procedure_copays.mri_scan)} co-payment.`,
                context: `Copayments: ${displayPlan.procedure_copays.joint_replacement}`
            }
        ];
    }, [displayPlan]);

    if (!isClient || !displayPlan || !persona) return <div className="px-4 py-8"><FeedSkeleton /></div>;



    return (
        <div className="relative pb-24 max-w-xl mx-auto animate-in fade-in duration-500">

            {/* 1. PRIMARY STRATEGY CARD */}
            <div className="px-4 mb-6">
                <div className="relative min-h-[480px] bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl flex flex-col">
                    <div className="p-8 flex-grow">
                        <div className="animate-in fade-in slide-in-from-left duration-300">
                            <div className="flex justify-between items-start mb-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">{displayPlan.identity.scheme_name}</p>
                                    <h2 className="text-4xl font-black text-slate-900 leading-none">{fmt(displayPlan.price)}<span className="text-xs text-slate-400 ml-1 uppercase">/pm</span></h2>
                                    <h3 className="text-lg font-bold text-slate-700 tracking-tight mt-2">{displayPlan.identity.plan_name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="px-2 py-0.5 bg-slate-100 text-[9px] font-black text-slate-500 rounded uppercase tracking-tighter">
                                            {displayPlan.identity.plan_type}
                                        </span>
                                        {displayPlan.savings_annual > 0 && (
                                            <span className="px-2 py-0.5 bg-emerald-50 text-[9px] font-black text-emerald-600 rounded uppercase tracking-tighter">
                                                MSA Included
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-emerald-50 p-2.5 rounded-2xl">
                                    <Sparkles className="w-6 h-6 text-emerald-600 fill-current" />
                                </div>
                            </div>

                            {/* STRATEGIC SNAPSHOT: Selected Important Properties */}
                            <div className="grid grid-cols-2 gap-3 mt-8">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                                    <Building2 className="w-4 h-4 text-slate-400 mb-2 group-hover:text-emerald-500 transition-colors" />
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Network Logic</p>
                                    <p className="text-xs font-bold text-slate-800">{displayPlan.network_restriction}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                                    <ShieldAlert className="w-4 h-4 text-slate-400 mb-2 group-hover:text-rose-500 transition-colors" />
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Risk Rating</p>
                                    <p className="text-xs font-bold text-slate-800">Gap {displayPlan.gap_cover_rating}</p>
                                </div>
                                {displayPlan.savings_annual > 0 ? (
                                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 col-span-2 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Wallet className="w-4 h-4 text-emerald-600" />
                                            <div>
                                                <p className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">Annual Liquidity (MSA)</p>
                                                <p className="text-sm font-black text-emerald-900">{fmt(displayPlan.savings_annual)}</p>
                                            </div>
                                        </div>
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    </div>
                                ) : (
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 col-span-2 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Wallet className="w-4 h-4 text-slate-400" />
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Annual Liquidity (MSA)</p>
                                                <p className="text-sm font-black text-slate-500">No Medical Savings Account</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* PERSISTENT CTA: Subtle & Professional */}
                    <div className="px-6 pb-6 mt-auto">
                        <button
                            onClick={() => setSelectedConcern({
                                q: `Verify ${displayPlan.identity.plan_name}`,
                                ctx: `Plan: ${displayPlan.id}`
                            })}
                            className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-emerald-50 hover:border-emerald-200 transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-sm group-hover:border-emerald-100 transition-colors">
                                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-black text-slate-700 uppercase tracking-widest leading-none mb-1">Expert Verification</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter group-hover:text-emerald-600 transition-colors">Confirm Strategic Alignment</p>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. STRATEGIC CONCERN TABLETS */}
            <div className="px-4 space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Strategic Pillar Audit</p>
                <div className="space-y-3">
                    {concernViews.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => setExpandedConcern(expandedConcern === idx ? null : idx)}
                                className={clsx(
                                    "w-full flex items-center justify-between p-5 transition-all text-left",
                                    expandedConcern === idx ? "bg-slate-50" : "hover:bg-slate-50"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={clsx("p-2 rounded-xl transition-colors", expandedConcern === idx ? "bg-emerald-100" : "bg-slate-50")}>
                                        <item.icon className={clsx("w-5 h-5 transition-colors", expandedConcern === idx ? "text-emerald-600" : "text-slate-400")} />
                                    </div>
                                    <span className={clsx("text-sm font-black tracking-tight transition-colors", expandedConcern === idx ? "text-emerald-900" : "text-slate-700")}>{item.question}</span>
                                </div>
                                <ChevronRight className={clsx("w-5 h-5 transition-transform duration-300", expandedConcern === idx ? "rotate-90 text-emerald-500" : "text-slate-300")} />
                            </button>
                            <div className={clsx("grid transition-all duration-300 ease-out", expandedConcern === idx ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                                <div className="overflow-hidden">
                                    <div className="p-5 pt-0">
                                        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                                            <p className="text-sm font-medium text-emerald-900 leading-relaxed italic">
                                                {item.answer ? `"${item.answer}"` : "Answer not available."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* 4th Pill: Manual Query */}
                    <button
                        onClick={() => setSelectedConcern({
                            q: "I have a different question",
                            ctx: `Persona: ${persona.code} | Plan: ${displayPlan.id}`
                        })}
                        className="w-full flex items-center justify-between p-5 rounded-3xl bg-white border-2 border-dashed border-slate-200 text-slate-500 hover:border-emerald-400 hover:text-emerald-600 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-emerald-50 transition-colors">
                                <Plus className="w-5 h-5 text-slate-400 group-hover:text-emerald-500" />
                            </div>
                            <span className="text-sm font-bold italic tracking-tight opacity-70">I have a different question...</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-400" />
                    </button>
                </div>
            </div>

            {selectedConcern && (
                <ExpertModal
                    isOpen={!!selectedConcern} onClose={() => setSelectedConcern(null)}
                    planName={displayPlan.identity.plan_name} initialQuestion={selectedConcern.q} expertContext={selectedConcern.ctx}
                />
            )}
            {/* {isChatOpen && <ChatWidget contextPlan={displayPlan} onClose={() => setIsChatOpen(false)} />} */}
        </div>
    );
}