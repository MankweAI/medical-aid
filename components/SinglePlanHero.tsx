'use client';

import { useMemo, useState, useEffect } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { PLANS } from '@/data/plans';
import { PERSONAS } from '@/data/personas';
import { PricingEngine } from '@/utils/engine';
import { validatePlan } from '@/utils/persona';
import { ShieldCheck, Sparkles, AlertTriangle, TrendingDown, Info } from 'lucide-react';
import FeedCard from '@/components/FeedCard';
import PlanDetails from '@/components/PlanDetails'; // Ensure this is imported
import ExpertModal from '@/components/ExpertModal';
import ChatWidget from '@/components/ChatWidget';
import FeedSkeleton from '@/components/skeletons/FeedSkeleton';
import clsx from 'clsx';

export default function SinglePlanHero({ persona: slug }: { persona: string }) {
    const { state, isChatOpen, setIsChatOpen } = usePersona();
    const [modalOpen, setModalOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Hydration fix
    useEffect(() => { setIsClient(true); }, []);

    // 1. LOOKUP DATA
    const currentPersona = useMemo(() => PERSONAS.find(p => p.slug === slug), [slug]);

    const anchorPlan = useMemo(() => {
        // Fix: Assign to a variable so TypeScript can confirm it is not undefined
        const logic = currentPersona?.actuarial_logic;

        if (!logic) return null;

        return PLANS.find(p => p.id === logic.target_plan_id);
    }, [currentPersona]);

    // 2. LIVE CALCULATIONS
    const displayPlan = useMemo(() => {
        if (!anchorPlan || !currentPersona) return null;
        try {
            const contribution = anchorPlan.contributions[0];
            const financials = PricingEngine.calculateProfile(contribution, state.members, state.income);
            const risks = validatePlan(anchorPlan, currentPersona);

            return {
                ...anchorPlan,
                price: financials.monthlyPremium,
                savings_annual: financials.savings.annualAllocation,
                risks
            };
        } catch (e) {
            console.error("Calculation Error:", e);
            return null;
        }
    }, [state, anchorPlan, currentPersona]);

    // 3. FINANCIAL TOXICITY ENGINE
    const financialAnalysis = useMemo(() => {
        if (!displayPlan || state.income === 0) return null;
        const ratio = displayPlan.price / state.income;
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

    // --- LOADING STATE (Replaces Blank Page) ---
    if (!isClient || !displayPlan || !currentPersona) {
        return (
            <div className="px-4 py-8">
                <FeedSkeleton />
                <div className="mt-4 text-center text-xs font-mono text-emerald-600 animate-pulse">
                    Running Actuarial Simulation...
                </div>
            </div>
        );
    }

    return (
        <div className="relative pb-16 animate-in fade-in zoom-in duration-500">
            {/* SEO CONTEXT & ALERTS */}
            <div className="mb-4 px-4 pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                            Recommended Strategy
                        </span>
                    </div>
                    {financialAnalysis && (
                        <div className="flex items-center gap-1.5 opacity-60">
                            <Info className="w-3 h-3 text-slate-500" />
                            <span className="text-[9px] font-medium text-slate-500">
                                Min Rec. Income: R{Math.round(financialAnalysis.recommendedMinIncome / 1000)}k+
                            </span>
                        </div>
                    )}
                </div>

                {financialAnalysis && financialAnalysis.toxicity !== 'SAFE' && (
                    <div className={clsx(
                        "p-3 rounded-xl flex items-start gap-3 border",
                        financialAnalysis.toxicity === 'CRITICAL'
                            ? "bg-rose-50 border-rose-100 text-rose-800"
                            : "bg-amber-50 border-amber-100 text-amber-800"
                    )}>
                        <TrendingDown className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider mb-0.5">Affordability Alert</p>
                            <p className="text-xs leading-relaxed opacity-90">{financialAnalysis.message}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* THE HERO CARD */}
            <div className="px-4 relative transform transition-all duration-500 hover:scale-[1.005] z-10">
                <FeedCard
                    plan={displayPlan}
                    onVerify={() => setModalOpen(true)}
                    verdict={{
                        tier: 'WINNER',
                        badge: currentPersona.actuarial_logic?.mathematical_basis || 'Algorithmic Match',
                        warning: displayPlan.red_flag || ''
                    }}
                />
            </div>

            {/* THE NEW SUPER-DETAILED BREAKDOWN */}
            <div className="px-4 mt-6">
                <PlanDetails plan={displayPlan} />
            </div>

            {/* CHAT & MODAL */}
            <div className="fixed bottom-6 right-6 z-50 safe-margin-bottom">
                {!isChatOpen && (
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className={clsx(
                            "flex items-center gap-3 px-5 py-3 text-white rounded-full shadow-2xl transition-all active:scale-95 animate-in slide-in-from-bottom-4 group",
                            financialAnalysis?.toxicity === 'CRITICAL' ? "bg-rose-600" : "bg-emerald-600"
                        )}
                    >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="font-bold text-sm">
                            {financialAnalysis?.toxicity === 'CRITICAL' ? "Can I afford this?" : "Ask AI about this"}
                        </span>
                    </button>
                )}
            </div>

            {isChatOpen && (
                <ChatWidget
                    contextPlan={displayPlan}
                    financialContext={financialAnalysis}
                    onClose={() => setIsChatOpen(false)}
                    onVerify={() => setModalOpen(true)}
                />
            )}

            <ExpertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                planName={displayPlan.identity.plan_name}
                context={`Strategy: ${currentPersona.meta.title}`}
            />
        </div>
    );
}