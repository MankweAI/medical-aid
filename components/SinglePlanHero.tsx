'use client';

import { useMemo, useState } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { PLANS } from '@/data/plans';
import { PERSONAS } from '@/data/personas';
import { PricingEngine } from '@/utils/engine';
import { validatePlan } from '@/utils/persona';
import { ShieldCheck, Sparkles } from 'lucide-react';
import FeedCard from '@/components/FeedCard';
import ExpertModal from '@/components/ExpertModal';
import ChatWidget from '@/components/ChatWidget';

export default function SinglePlanHero({ persona: slug }: { persona: string }) {
    const { state } = usePersona();
    const [modalOpen, setModalOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);

    const currentPersona = useMemo(() => PERSONAS.find(p => p.slug === slug), [slug]);

    const anchorPlan = useMemo(() => {
        if (!currentPersona?.actuarial_logic) return null;
        return PLANS.find(p => p.id === currentPersona.actuarial_logic!.target_plan_id);
    }, [currentPersona]);

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

    if (!displayPlan || !currentPersona || !currentPersona.actuarial_logic) {
        return <div className="p-8 text-center text-slate-500">Initializing Strategy...</div>;
    }

    return (
        <div className="relative pb-32">

            {/* COMPACT HEADER (Context only) */}
            <div className="mb-4 px-4 pt-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                        Recommended Strategy
                    </span>
                </div>
            </div>

            {/* THE HERO CARD */}
            <div className="px-4 relative transform transition-all duration-500 hover:scale-[1.005]">
                <FeedCard
                    plan={displayPlan}
                    onVerify={() => setModalOpen(true)}
                    verdict={{
                        tier: 'WINNER',
                        // CRITICAL: We pass the full rationale here
                        badge: currentPersona.actuarial_logic.mathematical_basis,
                        warning: displayPlan.red_flag || ''
                    }}
                />
            </div>

            {/* CHATBOT TRIGGER */}
            <div className="fixed bottom-6 right-6 z-50">
                {!chatOpen && (
                    <button
                        onClick={() => setChatOpen(true)}
                        className="flex items-center gap-3 px-5 py-3 bg-slate-900 text-white rounded-full shadow-2xl shadow-slate-900/40 hover:bg-slate-800 transition-all active:scale-95 animate-in slide-in-from-bottom-4"
                    >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="font-bold text-sm">Ask AI about this</span>
                    </button>
                )}
            </div>

            {chatOpen && (
                <ChatWidget
                    contextPlan={displayPlan}
                    onClose={() => setChatOpen(false)}
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