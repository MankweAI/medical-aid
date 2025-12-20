'use client';

import { useMemo, useState, useEffect } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { PricingEngine } from '@/utils/engine';
import { validatePlan } from '@/utils/persona';
import {
    ShieldCheck,
    Sparkles,
    AlertTriangle,
    ChevronRight,
    ArrowLeft,
    MessageSquare,
    Phone,
    Info
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

    // State for the "Game-like" card swap: 'overview' or the index of the concern
    const [activeView, setActiveView] = useState<'overview' | number>('overview');
    const [selectedConcern, setSelectedConcern] = useState<{ q: string; ctx: string } | null>(null);

    useEffect(() => { setIsClient(true); }, []);

    // 1. Technical Calculations (Maintained from original)
    const displayPlan = useMemo(() => {
        if (!anchorPlan || !persona) return null;
        try {
            const contribution = anchorPlan.contributions[0];
            const financials = PricingEngine.calculateProfile(contribution, state.members, state.income);
            const risks = validatePlan(anchorPlan, persona);

            return {
                ...anchorPlan,
                price: financials.monthlyPremium,
                risks
            };
        } catch (e) {
            return null;
        }
    }, [state, anchorPlan, persona]);

    const financialAnalysis = useMemo(() => {
        if (!displayPlan || state.income === 0) return null;
        const ratio = displayPlan.price / state.income;
        const recommendedMinIncome = displayPlan.price / 0.15;
        let toxicity = 'SAFE';
        let message = '';

        if (ratio > 0.40) {
            toxicity = 'CRITICAL';
            message = `Critical: This plan takes ${Math.round(ratio * 100)}% of your income.`;
        } else if (ratio > 0.20) {
            toxicity = 'WARNING';
            message = `High Cost: This is slightly above the recommended 20% limit.`;
        }
        return { ratio, toxicity, message, recommendedMinIncome };
    }, [displayPlan, state.income]);

    const fmt = (val: number) => new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        maximumFractionDigits: 0
    }).format(val);

    // 2. UI Hook Data with Grade 5 Fallbacks
    // @ts-ignore
    const hooks = persona.ui_hooks || {
        simple_verdict: persona.human_insight || "This plan is a great match for your current health needs.",
        the_catch_simple: persona.actuarial_logic?.primary_risk_warning || "Some private doctors might charge more than the plan pays.",
        pressing_questions: [
            {
                question: `How does this cover ${persona.search_profile.chronic_needs}?`,
                simple_answer: "The plan pays for your chronic medicine every month, but you must use their approved list of pharmacies to avoid extra costs.",
                context_for_expert: `User chronic needs: ${persona.search_profile.chronic_needs}`
            },
            {
                question: `Will it pay for my specialists?`,
                simple_answer: "Yes, it pays for specialists, but there is a limit. Once you reach the limit, you may have to pay for the rest of the year.",
                context_for_expert: "User concerned about specialist limits and sub-limits."
            }
        ]
    };

    if (!isClient || !displayPlan || !persona) {
        return <div className="px-4 py-8"><FeedSkeleton /></div>;
    }

    const currentConcern = activeView !== 'overview' ? hooks.pressing_questions[activeView] : null;

    return (
        <div className="relative pb-24 max-w-xl mx-auto animate-in fade-in duration-500">

            {/* TOP HEADER */}
            <div className="mb-4 px-6 pt-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-full shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                        Personalized Strategy
                    </span>
                </div>
            </div>

            <div className="px-4 flex flex-col gap-6">

                {/* --- THE DECISION CARD (Swappable Area) --- */}
                <div className="relative min-h-[420px] bg-gradient-to-br from-white via-white to-emerald-50/30 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl shadow-emerald-900/10 flex flex-col">

                    {/* Decorative Glow Orb */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-200/40 to-teal-200/30 rounded-full blur-3xl animate-float pointer-events-none" />
                    <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-tr from-emerald-100/30 to-cyan-100/20 rounded-full blur-2xl animate-float-delayed pointer-events-none" />

                    {/* Content Area */}
                    <div className="p-8 flex-grow relative z-10">
                        {activeView === 'overview' ? (
                            // INITIAL SUMMARY VIEW
                            <div className="animate-in fade-in slide-in-from-left duration-300">
                                {/* Price Header with Accent Bar */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-400 rounded-full" />
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Cost</p>
                                        </div>
                                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">{fmt(displayPlan.price)}</h2>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1.5 tracking-wider">
                                            {displayPlan.identity.scheme_name} • {displayPlan.identity.plan_name}
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-3 rounded-2xl border border-emerald-100/50 shadow-sm">
                                        <Sparkles className="w-6 h-6 text-emerald-600 fill-current" />
                                    </div>
                                </div>

                                {/* Verdict & Warning */}
                                <div className="space-y-5">
                                    <div className="p-4 bg-gradient-to-r from-slate-50 to-transparent rounded-2xl border-l-2 border-emerald-400">
                                        <p className="text-xl font-bold text-slate-800 leading-tight">
                                            {hooks.simple_verdict}
                                        </p>
                                    </div>
                                    <div className="p-5 bg-gradient-to-br from-rose-50 to-orange-50/50 rounded-2xl border border-rose-100 flex gap-4 group hover:shadow-md transition-shadow">
                                        <div className="p-2 bg-rose-100 rounded-xl shrink-0">
                                            <AlertTriangle className="w-5 h-5 text-rose-600 group-hover:animate-pulse" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-black text-rose-700 uppercase tracking-widest block mb-1">The Catch</span>
                                            <p className="text-xs font-bold text-rose-900 leading-relaxed">
                                                {hooks.the_catch_simple}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // ANSWER VIEW
                            <div className="animate-in fade-in slide-in-from-right duration-300">
                                <button
                                    onClick={() => setActiveView('overview')}
                                    className="flex items-center gap-2 text-slate-400 mb-6 group hover:text-emerald-600 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Back to Price</span>
                                </button>

                                {/* Question with decorative quote */}
                                <div className="relative">
                                    <span className="absolute -top-2 -left-2 text-5xl text-emerald-100 font-serif leading-none">"</span>
                                    <h3 className="text-2xl font-black text-slate-900 mb-5 leading-tight pl-4">
                                        {currentConcern?.question}
                                    </h3>
                                </div>

                                <div className="p-4 bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-2xl border border-slate-100">
                                    <p className="text-lg font-medium text-slate-600 leading-relaxed">
                                        {currentConcern?.simple_answer}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* PERSISTENT EXPERT CTA (Inside the Card) */}
                    <div className="px-8 pb-8 relative z-10">
                        {/* Glow effect behind button */}
                        <div className="absolute inset-x-8 bottom-12 h-16 bg-emerald-400/20 blur-2xl rounded-full animate-pulse-glow pointer-events-none" />

                        <button
                            onClick={() => setSelectedConcern({
                                q: activeView === 'overview' ? "Verify this plan for me" : (currentConcern?.question || ""),
                                ctx: activeView === 'overview' ? `Strategy: ${persona.meta.title}` : (currentConcern?.context_for_expert || "")
                            })}
                            className="relative w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:from-slate-800 hover:to-slate-700 active:scale-[0.98] transition-all group"
                        >
                            <Phone className="w-5 h-5 text-emerald-400 group-hover:animate-pulse" />
                            <span>Verify with an Expert</span>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <div className="flex items-center justify-center gap-3 mt-4">
                            <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                                <span>Secure</span>
                            </div>
                            <span className="text-slate-200">•</span>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Accredited</span>
                            <span className="text-slate-200">•</span>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">No Obligation</span>
                        </div>
                    </div>
                </div>

                {/* --- CONCERN TABLETS (Below the Card) --- */}
                <div className="flex flex-col gap-3 mt-2">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4 mb-1 flex items-center gap-2">
                        <MessageSquare className="w-3 h-3" />
                        Common Questions
                    </h3>

                    <div className="flex flex-col gap-3">
                        {hooks.pressing_questions.slice(0, 4).map((item: any, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setActiveView(idx);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={clsx(
                                    "group flex items-center justify-between p-5 rounded-[1.5rem] text-left transition-all active:scale-[0.98]",
                                    activeView === idx
                                        ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-200"
                                        : "bg-white border-2 border-slate-100 hover:border-emerald-200 hover:bg-gradient-to-r hover:from-white hover:to-emerald-50/50 shadow-sm hover:shadow-md"
                                )}
                            >
                                <div className="flex gap-4 items-center">
                                    {/* Numbered Indicator */}
                                    <div className={clsx(
                                        "w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black transition-colors",
                                        activeView === idx
                                            ? "bg-white/20 text-white"
                                            : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
                                    )}>
                                        {idx + 1}
                                    </div>
                                    <span className={clsx("text-sm font-bold leading-tight", activeView === idx ? "text-white" : "text-slate-700")}>
                                        {item.question}
                                    </span>
                                </div>
                                <ChevronRight className={clsx(
                                    "w-5 h-5 transition-transform",
                                    activeView === idx ? "text-emerald-200" : "text-slate-300 group-hover:translate-x-1 group-hover:text-emerald-400"
                                )} />
                            </button>
                        ))}

                        {/* CUSTOM CONCERN TABLET */}
                        <button
                            onClick={() => setSelectedConcern({ q: "I have a different concern", ctx: "CUSTOM_USER_QUERY" })}
                            className="group flex items-center justify-between p-5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[1.5rem] text-left hover:border-emerald-400 hover:bg-gradient-to-r hover:from-white hover:to-emerald-50/30 transition-all"
                        >
                            <div className="flex gap-4 items-center">
                                <div className="w-8 h-8 bg-white rounded-xl border border-slate-100 flex items-center justify-center group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-colors">
                                    <Info className="w-4 h-4 text-emerald-500" />
                                </div>
                                <span className="text-sm font-bold text-emerald-600 group-hover:text-emerald-700">
                                    I have a different question...
                                </span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 group-hover:text-emerald-400 transition-all" />
                        </button>
                    </div>
                </div>

                {/* AFFORDABILITY ALERT */}
                {financialAnalysis && financialAnalysis.toxicity !== 'SAFE' && (
                    <div className={clsx(
                        "p-4 rounded-2xl flex items-start gap-3 border animate-in slide-in-from-bottom-2",
                        financialAnalysis.toxicity === 'CRITICAL' ? "bg-gradient-to-r from-rose-600 to-rose-500 text-white border-rose-400" : "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 border-amber-200"
                    )}>
                        <div className={clsx(
                            "p-2 rounded-xl shrink-0",
                            financialAnalysis.toxicity === 'CRITICAL' ? "bg-white/20" : "bg-amber-100"
                        )}>
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Affordability Note</p>
                            <p className="text-sm font-bold leading-tight">{financialAnalysis.message}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* FLOATING AI CHAT */}
            <div className="fixed bottom-6 right-6 z-50">
                {!isChatOpen && (
                    <div className="relative">
                        {/* Breathing glow effect */}
                        <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-xl animate-pulse-glow" />
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="relative flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-full shadow-2xl hover:shadow-emerald-500/20 transition-all active:scale-95 group"
                        >
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span className="font-bold text-sm">Ask AI</span>
                            {/* Notification hint dot */}
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
                        </button>
                    </div>
                )}
            </div>

            {isChatOpen && (
                <ChatWidget
                    contextPlan={displayPlan}
                    financialContext={financialAnalysis}
                    onClose={() => setIsChatOpen(false)}
                    onVerify={() => setSelectedConcern({ q: "AI Analysis Verification", ctx: "FROM_CHAT" })}
                />
            )}

            {selectedConcern && (
                <ExpertModal
                    isOpen={!!selectedConcern}
                    onClose={() => setSelectedConcern(null)}
                    planName={displayPlan.identity.plan_name}
                    initialQuestion={selectedConcern.q}
                    expertContext={selectedConcern.ctx}
                />
            )}
        </div>
    );
}