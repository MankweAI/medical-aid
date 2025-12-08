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
    visualTheme: 'emerald' | 'amber' | 'blue' | 'rose' | 'slate';
};

export default function FocusFeed({ persona: slug }: { persona: string, initialIncome: number }) {
    const { state } = usePersona();
    const { showPinnedOnly } = useCompare();
    const [focusedPlanId, setFocusedPlanId] = useState<string>('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlanName, setSelectedPlanName] = useState('');

    // 1. INITIALIZE FOCUS
    const anchorId = useMemo(() => {
        const p = PERSONAS.find(per => per.slug === slug);
        return p?.actuarial_logic?.target_plan_id || PLANS[0].id;
    }, [slug]);

    useEffect(() => {
        if (!focusedPlanId) setFocusedPlanId(anchorId);
    }, [anchorId, focusedPlanId]);

    // 2. LIVE CALCULATION ENGINE
    const rankedPlans: RankedPlan[] = useMemo(() => {
        if (showPinnedOnly) return [];

        const calculated = PLANS.map(plan => {
            const contribution = plan.contributions[0];
            const financials = PricingEngine.calculateProfile(contribution, state.members, state.income);
            const risks = validatePlan(plan, PERSONAS.find(p => p.slug === slug)!);

            let score = 50;
            let badge = '';
            let warning = plan.red_flag || '';
            let tier: 'WINNER' | 'CONTENDER' | 'RISK' = 'CONTENDER';

            // Determine Visual Theme
            let visualTheme: RankedPlan['visualTheme'] = 'slate';

            // Affordability Logic
            if (financials.monthlyPremium > state.income * 0.25) {
                score -= 50;
                tier = 'RISK';
                warning = `Cost is ${Math.round((financials.monthlyPremium / state.income) * 100)}% of income`;
                visualTheme = 'rose';
            } else if (financials.monthlyPremium < state.income * 0.15) {
                score += 20;
                visualTheme = 'amber'; // Cheaper options are Yellow
            }

            // Anchor Logic
            const isAnchor = plan.id === anchorId;
            if (isAnchor) {
                score += 10;
                badge = 'Your Search Baseline';
                if (tier !== 'RISK') visualTheme = 'blue';
            }

            // Winner Logic overrides others
            if (score > 70 && tier !== 'RISK') {
                tier = 'WINNER';
                badge = 'Smart Upgrade';
                visualTheme = 'emerald';
            }

            return {
                ...plan,
                risks,
                financials,
                tier,
                verdict: { badge, warning },
                isAnchor,
                visualTheme,
                _score: score
            };
        });

        return calculated.sort((a, b) => b._score - a._score);
    }, [state, slug, anchorId, showPinnedOnly]);

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
            </div>

            {/* --- THE STAGE (Main Card) --- */}
            <div className="px-2 mb-6 animate-in zoom-in-95 duration-300">
                <StageCard
                    plan={focusedPlan}
                    onVerify={(name) => { setSelectedPlanName(name); setModalOpen(true); }}
                />
            </div>

            {/* --- THE DELTA DECK (Compact Alternatives) --- */}
            <div className="pl-4">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Compare Alternatives ({deckPlans.length})
                </h3>

                {/* Horizontal Scroll Container */}
                <div className="flex gap-3 overflow-x-auto pb-8 pr-4 snap-x no-scrollbar">
                    {deckPlans.map(plan => (
                        <div key={plan.id} className="snap-start shrink-0">
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