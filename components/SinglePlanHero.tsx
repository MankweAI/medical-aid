'use client';

import { useMemo, useState } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { PLANS } from '@/data/plans';
import { PERSONAS } from '@/data/personas';
import { PricingEngine } from '@/utils/engine';
import { validatePlan } from '@/utils/persona';
import { ShieldCheck, Sparkles, AlertTriangle, TrendingDown, Info } from 'lucide-react';
import FeedCard from '@/components/FeedCard';
import ExpertModal from '@/components/ExpertModal';
import ChatWidget from '@/components/ChatWidget';
import clsx from 'clsx';

export default function SinglePlanHero({ persona: slug }: { persona: string }) {
    const { state } = usePersona();
    const [modalOpen, setModalOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);

    // 1. LOOKUP DATA
    const currentPersona = useMemo(() => PERSONAS.find(p => p.slug === slug), [slug]);

    const anchorPlan = useMemo(() => {
        if (!currentPersona?.actuarial_logic) return null;
        return PLANS.find(p => p.id === currentPersona.actuarial_logic!.target_plan_id);
    }, [currentPersona]);

    // 2. LIVE CALCULATIONS
    const displayPlan = useMemo(() => {
        if (!anchorPlan || !currentPersona) return null;

        const contribution = anchorPlan.contributions[0];
        const financials = PricingEngine.calculateProfile(contribution, state.members, state.income);
        const risks = validatePlan(anchorPlan, currentPersona);

        return {
            ...anchorPlan,
            price: financials.monthlyPremium,
            savings_annual: financials.savings.annualAllocation,
            risks
        };
    }, [state, anchorPlan, currentPersona]);

    // 3. FINANCIAL TOXICITY ENGINE
    const financialAnalysis = useMemo(() => {
        if (!displayPlan || state.income === 0) return null;

        const ratio = displayPlan.price / state.income;
        // The "Safe" threshold is 15% of gross income
        const recommendedMinIncome = displayPlan.price / 0.15;

        let toxicity = 'SAFE';
        let message = '';

        if (ratio > 0.40) {
            toxicity = 'CRITICAL';
            message = `Critical Strain: Takes ${Math.round(ratio * 100)}% of income.`;
        } else if (ratio > 0.20) {
            toxicity = 'WARNING';
            message = `High Cost: Exceeds recommended 20% limit.`;
        }

        return { ratio, toxicity, message, recommendedMinIncome };
    }, [displayPlan, state.income]);

    if (!displayPlan || !currentPersona || !currentPersona.actuarial_logic) {
        return <div className="p-8 text-center text-slate-500 animate-pulse">Initializing Actuarial Engine...</div>;
    }

    return (
        <div className="relative pb-16">

            {/* SEO CONTEXT & ALERTS */}
            <div className="mb-4 px-4 pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                            Recommended Strategy
                        </span>
                    </div>

                    {/* Minimum Income Tag */}
                    {financialAnalysis && (
                        <div className="flex items-center gap-1.5 opacity-60">
                            <Info className="w-3 h-3 text-slate-500" />
                            <span className="text-[9px] font-medium text-slate-500">
                                Min Rec. Income: R{Math.round(financialAnalysis.recommendedMinIncome / 1000)}k+
                            </span>
                        </div>
                    )}
                </div>

                {/* Affordability Warning Banner */}
                {financialAnalysis && financialAnalysis.toxicity !== 'SAFE' && (
                    <div className={clsx(
                        "p-3 rounded-xl flex items-start gap-3 border animate-in slide-in-from-top-2",
                        financialAnalysis.toxicity === 'CRITICAL'
                            ? "bg-rose-50 border-rose-100 text-rose-800"
                            : "bg-amber-50 border-amber-100 text-amber-800"
                    )}>
                        {financialAnalysis.toxicity === 'CRITICAL'
                            ? <TrendingDown className="w-4 h-4 shrink-0 mt-0.5" />
                            : <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        }
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider mb-0.5">Affordability Alert</p>
                            <p className="text-xs leading-relaxed opacity-90">{financialAnalysis.message}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* THE HERO CARD */}
            <div className="px-4 relative transform transition-all duration-500 hover:scale-[1.005]">
                <FeedCard
                    plan={displayPlan}
                    onVerify={() => setModalOpen(true)}
                    verdict={{
                        tier: 'WINNER',
                        badge: currentPersona.actuarial_logic.mathematical_basis,
                        warning: displayPlan.red_flag || ''
                    }}
                />
            </div>

            {/* FLOATING CHAT TRIGGER */}
            <div className="fixed bottom-6 right-6 z-50 safe-margin-bottom">
                {!chatOpen && (
                    <button
                        onClick={() => setChatOpen(true)}
                        className={clsx(
                            "flex items-center gap-3 px-5 py-3 text-white rounded-full shadow-2xl transition-all active:scale-95 animate-in slide-in-from-bottom-4 group",
                            financialAnalysis?.toxicity === 'CRITICAL' ? "bg-rose-600 hover:bg-rose-700 shadow-rose-900/30" : "bg-slate-900 hover:bg-slate-800 shadow-slate-900/40"
                        )}
                    >
                        <Sparkles className={clsx("w-4 h-4", financialAnalysis?.toxicity === 'CRITICAL' ? "text-white" : "text-amber-400")} />
                        <span className="font-bold text-sm">
                            {financialAnalysis?.toxicity === 'CRITICAL' ? "Can I afford this?" : "Ask AI about this"}
                        </span>
                    </button>
                )}
            </div>

            {chatOpen && (
                <ChatWidget
                    contextPlan={displayPlan}
                    financialContext={financialAnalysis}
                    onClose={() => setChatOpen(false)}
                    onVerify={() => setModalOpen(true)}
                />
            )}

            <ExpertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                planName={displayPlan.identity.plan_name}
                context={`SEO Persona: ${currentPersona.meta.title}`}
            />
        </div>
    );
}