'use client';

import { useMemo, useState } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { useCompare } from '@/context/CompareContext';
import { PERSONAS } from '@/data/personas';
import { PLANS } from '@/data/plans';
import { Shield, Filter, Trophy, AlertTriangle, CheckCircle2, ArrowDown, Anchor } from 'lucide-react';
import ExpertModal from '@/components/ExpertModal';
import PinnedHeader from '@/components/PinnedHeader';
import FeedCard from '@/components/FeedCard';
import FeedSkeleton from '@/components/skeletons/FeedSkeleton';
import clsx from 'clsx';

export default function SmartFeed({ persona: personaSlug, initialIncome }: { persona: string, initialIncome: number }) {
    const { state } = usePersona();
    const { activePin, showPinnedOnly, pinnedHistory } = useCompare();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlanForModal, setSelectedPlanForModal] = useState('');
    const [loading, setLoading] = useState(false);

    // Safeguard for the slug
    const safeSlug = personaSlug || '';

    const handleVerify = (name: string) => {
        setSelectedPlanForModal(name);
        setModalOpen(true);
    };

    // --- 1. IDENTIFY ANCHOR VS CHALLENGERS ---
    const { anchorPlan, challengers } = useMemo(() => {
        const currentPersonaData = PERSONAS.find(p => p.slug === safeSlug);
        const targetId = currentPersonaData?.actuarial_logic?.target_plan_id;

        const anchor = PLANS.find(p => p.id === targetId);
        const others = PLANS.filter(p => p.id !== targetId);

        return { anchorPlan: anchor, challengers: others };
    }, [safeSlug]);

    // --- 2. RANKING ENGINE ---
    const feedItems = useMemo(() => {
        if (showPinnedOnly) {
            return pinnedHistory.map(p => ({
                ...p,
                verdict: { tier: 'CONTENDER' as const, badge: 'Pinned Comparison', warning: '' },
                isAnchor: false
            }));
        }

        const scoredChallengers = challengers.map(plan => {
            let score = 0;
            let badge = '';
            let warning = plan.red_flag || '';
            let tier: 'WINNER' | 'CONTENDER' | 'RISK' = 'CONTENDER';

            if (plan.price < initialIncome * 0.1) score += 20;
            if (plan.savings_annual > 5000) score += 10;

            if (safeSlug.includes('savings') && plan.identity.plan_type === 'Savings') score += 50;
            if (safeSlug.includes('network') && plan.network_restriction === 'Network') score += 30;

            if (score > 60) {
                tier = 'WINNER';
                badge = "Actuarial Upgrade";
            }

            return { ...plan, score, verdict: { tier, badge, warning }, isAnchor: false };
        }).sort((a, b) => b.score - a.score);

        const items = [];

        // Always put Anchor first
        if (anchorPlan) {
            items.push({
                ...anchorPlan,
                score: 1000,
                verdict: {
                    tier: 'CONTENDER' as const,
                    badge: 'Baseline Selection',
                    warning: anchorPlan.red_flag || ''
                },
                isAnchor: true
            });
        }

        items.push(...scoredChallengers.slice(0, 3));

        return items;
    }, [showPinnedOnly, pinnedHistory, anchorPlan, challengers, initialIncome, safeSlug]);

    if (loading) return <FeedSkeleton />;

    return (
        <div className={clsx("relative min-h-[500px]", activePin && "pt-40")}>
            <PinnedHeader />

            <div className="space-y-6 pb-32 animate-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center justify-between px-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        {showPinnedOnly ? (
                            <>
                                <Filter className="w-3 h-3 text-blue-500" />
                                Pinned Cards Only
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                Strategic Analysis
                            </>
                        )}
                    </p>
                </div>

                {feedItems.length === 0 ? (
                    <div className="text-center py-12 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <Shield className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-slate-900 font-bold text-sm">No viable strategies found</h3>
                        <p className="text-xs text-slate-500 mt-2">Try adjusting your income or network preferences.</p>
                    </div>
                ) : (
                    feedItems.map((plan, index) => (
                        <div key={plan.id} className="relative">
                            {/* CHALLENGER DIVIDER */}
                            {index === 1 && !showPinnedOnly && (
                                <div className="flex items-center gap-4 my-6 px-4">
                                    <div className="h-px bg-slate-200 flex-1" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <ArrowDown className="w-3 h-3" /> Better Alternatives?
                                    </span>
                                    <div className="h-px bg-slate-200 flex-1" />
                                </div>
                            )}

                            {/* BADGES */}
                            {plan.isAnchor && !showPinnedOnly && (
                                <div className="absolute -top-3 left-4 z-20 flex items-center gap-1.5 bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                                    <Anchor className="w-3 h-3 text-slate-400" />
                                    Your Search Baseline
                                </div>
                            )}

                            {plan.verdict.tier === 'WINNER' && !plan.isAnchor && !showPinnedOnly && (
                                <div className="absolute -top-3 left-4 z-20 flex items-center gap-1.5 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-slate-900/20 transform -translate-y-1">
                                    <Trophy className="w-3 h-3 text-amber-400 fill-current" />
                                    Actuarial Upgrade
                                </div>
                            )}

                            <FeedCard
                                plan={plan}
                                onVerify={handleVerify}
                                verdict={plan.verdict}
                            />
                        </div>
                    ))
                )}
            </div>

            <ExpertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                planName={selectedPlanForModal}
                context={`Strategy: ${safeSlug}`}
            />
        </div>
    );
}