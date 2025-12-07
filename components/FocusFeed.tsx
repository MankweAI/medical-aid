'use client';

import { useMemo, useState, useEffect } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { useCompare } from '@/context/CompareContext';
import { Plan } from '@/utils/types';
import { PERSONAS } from '@/data/personas';
import { PLANS } from '@/data/plans';
import { PricingEngine, FinancialProfile } from '@/utils/engine';
import { validatePlan, Risk } from '@/utils/persona';
import StageCard from '@/components/StageCard';
import DeltaCard from '@/components/DeltaCard';
import ExpertModal from '@/components/ExpertModal';
import PinnedHeader from '@/components/PinnedHeader';
import FeedSkeleton from '@/components/skeletons/FeedSkeleton';
import { Filter, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

// Extended type for internal logic
export type RankedPlan = Plan & {
    risks: Risk[];
    financials: FinancialProfile;
    tier: 'WINNER' | 'CONTENDER' | 'RISK';
    verdict: {
        badge: string;
        warning: string;
    };
    isAnchor: boolean;
};

export default function FocusFeed({ persona: slug }: { persona: string, initialIncome: number }) {
    const { state } = usePersona(); // LIVE STATE
    const { showPinnedOnly, pinnedHistory } = useCompare();
    const [focusedPlanId, setFocusedPlanId] = useState<string>('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlanName, setSelectedPlanName] = useState('');

    // 1. INITIALIZE FOCUS
    // We determine the anchor ID from the persona slug
    const anchorId = useMemo(() => {
        const p = PERSONAS.find(per => per.slug === slug);
        return p?.actuarial_logic?.target_plan_id || PLANS[0].id;
    }, [slug]);

    // Set initial focus to anchor (only runs once)
    useEffect(() => {
        if (!focusedPlanId) setFocusedPlanId(anchorId);
    }, [anchorId, focusedPlanId]);

    // 2. LIVE CALCULATION ENGINE
    const rankedPlans: RankedPlan[] = useMemo(() => {
        if (showPinnedOnly) {
            // Adapt pinned items to RankedPlan shape if needed
            // For now, assuming pinnedHistory has compatible structure or we simplify
            return []; // Simplified for this snippet, focusing on main logic
        }

        const calculated = PLANS.map(plan => {
            const contribution = plan.contributions[0];
            const financials = PricingEngine.calculateProfile(contribution, state.members, state.income);
            const risks = validatePlan(plan, PERSONAS.find(p => p.slug === slug)!); // Use current persona rules

            // Scoring
            let score = 50;
            let badge = '';
            let warning = plan.red_flag || '';
            let tier: 'WINNER' | 'CONTENDER' | 'RISK' = 'CONTENDER';

            // Affordability
            if (financials.monthlyPremium > state.income * 0.25) {
                score -= 50;
                tier = 'RISK';
                warning = `Cost is ${Math.round((financials.monthlyPremium / state.income) * 100)}% of income`;
            } else if (financials.monthlyPremium < state.income * 0.15) {
                score += 20;
            }

            // Savings
            if (state.filters.savings === 'Yes' && financials.savings.annualAllocation > 0) score += 30;

            // Network
            if (state.filters.network === 'Any' && plan.network_restriction !== 'Any') {
                score -= 30;
                warning = 'Network Restricted';
            }

            // Anchor Bias
            const isAnchor = plan.id === anchorId;
            if (isAnchor) {
                score += 10; // Slight stickiness
                badge = 'Your Search Baseline';
            } else if (score > 70) {
                badge = 'Better Value';
                tier = 'WINNER';
            }

            return {
                ...plan,
                risks,
                financials,
                tier,
                verdict: { badge, warning },
                isAnchor,
                _score: score
            };
        });

        // Sort by Score descending
        return calculated.sort((a, b) => b._score - a._score);
    }, [state, slug, anchorId, showPinnedOnly]); // Recalculate when Living Statement changes

    // 3. SPLIT FEED
    const focusedPlan = rankedPlans.find(p => p.id === focusedPlanId) || rankedPlans[0];
    const deckPlans = rankedPlans.filter(p => p.id !== focusedPlanId);

    if (!focusedPlan) return <FeedSkeleton />;

    return (
        <div className="relative min-h-[600px] pb-24">
            <PinnedHeader />

            {/* HEADER */}
            <div className="flex items-center justify-between px-4 mb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <RefreshCw className="w-3 h-3 text-emerald-500 animate-spin-slow" />
                    Live Analysis • {state.members.main + state.members.adult + state.members.child} Members
                </p>
                {showPinnedOnly && <div className="text-[10px] font-bold text-blue-500 flex items-center gap-1"><Filter className="w-3 h-3" /> Filtered</div>}
            </div>

            {/* --- THE STAGE (Main Card) --- */}
            <div className="px-2 mb-8 animate-in zoom-in-95 duration-500">
                <StageCard
                    plan={focusedPlan}
                    onVerify={(name) => { setSelectedPlanName(name); setModalOpen(true); }}
                />
            </div>

            {/* --- THE DELTA DECK (Alternatives) --- */}
            <div className="pl-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Available Alternatives ({deckPlans.length})
                </h3>

                {/* Horizontal Scroll Container */}
                <div className="flex gap-4 overflow-x-auto pb-8 pr-4 snap-x no-scrollbar">
                    {deckPlans.map(plan => (
                        <div key={plan.id} className="snap-start shrink-0 w-[280px]">
                            <DeltaCard
                                basePlan={focusedPlan}
                                targetPlan={plan}
                                onClick={() => setFocusedPlanId(plan.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <ExpertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                planName={selectedPlanName}
                context={`Comparing against ${focusedPlan.identity.plan_name}`}
            />
        </div>
    );
}
