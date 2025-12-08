'use client';

import { useMemo, useState } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { useCompare } from '@/context/CompareContext';
import { PLANS } from '@/data/plans';
import { PricingEngine } from '@/utils/engine'; // Import Pricing Engine
import { Shield, Filter, Trophy, AlertTriangle, CheckCircle2, ArrowDown, Anchor } from 'lucide-react';
import ExpertModal from '@/components/ExpertModal';
import PinnedHeader from '@/components/PinnedHeader';
import FeedCard from '@/components/FeedCard';
import FeedSkeleton from '@/components/skeletons/FeedSkeleton';
import clsx from 'clsx';

export default function SmartFeed({ persona: slug }: { persona: string, initialIncome: number }) {
    const { state } = usePersona(); // <--- CRITICAL: Use Live State
    const { activePin, showPinnedOnly, pinnedHistory } = useCompare();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlanForModal, setSelectedPlanForModal] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerify = (name: string) => {
        setSelectedPlanForModal(name);
        setModalOpen(true);
    };

    // --- 1. RANKING ENGINE (Live) ---
    const feedItems = useMemo(() => {
        // A. Handle Pinned View
        if (showPinnedOnly) {
            return pinnedHistory.map(p => ({
                ...p,
                verdict: { tier: 'CONTENDER' as const, badge: 'Pinned Comparison', warning: '' }
            }));
        }

        // B. Calculate & Score All Plans
        const scoredPlans = PLANS.map(plan => {
            // 1. Calculate REAL cost for this specific family & income
            const contribution = plan.contributions[0];
            const financials = PricingEngine.calculateProfile(contribution, state.members, state.income);
            const monthlyCost = financials.monthlyPremium;

            // 2. Initialize Score
            let score = 100;
            let badge = '';
            let warning = plan.red_flag || '';
            let tier: 'WINNER' | 'CONTENDER' | 'RISK' = 'CONTENDER';

            // --- CRITERIA 1: AFFORDABILITY (The Hard Gate) ---
            const incomeRatio = monthlyCost / state.income;

            if (monthlyCost > state.income) {
                score -= 10000; // Impossible
                warning = "Cost exceeds income";
                tier = 'RISK';
            } else if (incomeRatio > 0.40) {
                score -= 500; // Dangerous
                warning = `Costs ${Math.round(incomeRatio * 100)}% of income (High Risk)`;
                tier = 'RISK';
            } else if (incomeRatio > 0.25) {
                score -= 50; // Stretched
            } else {
                score += 50; // Affordable
            }

            // --- CRITERIA 2: PRIORITY MATCH ---
            if (state.filters.priority === 'budget') {
                // In budget mode, cheaper is better.
                // Add points for every R1000 saved below 20% of income
                const budgetTarget = state.income * 0.20;
                if (monthlyCost < budgetTarget) {
                    score += ((budgetTarget - monthlyCost) / 100);
                }
            }

            if (state.filters.priority === 'maternity' && plan.defined_baskets.maternity.antenatal_consults > 0) score += 100;
            if (state.filters.priority === 'comprehensive' && plan.identity.plan_type === 'Comprehensive') score += 100;

            // --- CRITERIA 3: NETWORK MATCH ---
            // If user wants "State" (Lowest Cost), penalize Expensive "Any" plans
            if (state.filters.network === 'State' && plan.network_restriction === 'Any') {
                score -= 100;
            }
            // If user explicitly refused Network ('Any'), penalize 'Network' plans
            if (state.filters.network === 'Any' && plan.network_restriction === 'Network') {
                score -= 200;
                warning = "Restricted Network";
            }

            // Determine Verdict
            if (score > 150) {
                tier = 'WINNER';
                badge = "Smart Match";
            }

            // Inject calculated price for display
            return {
                ...plan,
                price: monthlyCost, // Override display price with actual calc
                savings_annual: financials.savings.annualAllocation,
                score,
                verdict: { tier, badge, warning }
            };
        });

        // C. Filter & Sort
        // Remove "Impossible" plans (Score < -1000) unless list is empty
        const viablePlans = scoredPlans.filter(p => p.score > -1000);

        // Sort by Score Descending
        const sorted = viablePlans.length > 0 ? viablePlans.sort((a, b) => b.score - a.score) : scoredPlans.sort((a, b) => a.price - b.price);

        return sorted.slice(0, 5); // Return top 5

    }, [state, showPinnedOnly, pinnedHistory]); // Updates whenever 'state' changes

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
                                {feedItems.length} Strategies Calculated
                            </>
                        )}
                    </p>
                </div>

                {feedItems.length === 0 ? (
                    <div className="text-center py-12 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <Shield className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-slate-900 font-bold text-sm">No viable strategies found</h3>
                        <p className="text-xs text-slate-500 mt-2">Try increasing your income or adjusting your priority.</p>
                    </div>
                ) : (
                    feedItems.map((plan, index) => (
                        <div key={plan.id} className="relative">
                            {/* RANKING BADGES */}
                            {index === 0 && !showPinnedOnly && (
                                <div className="absolute -top-3 left-4 z-20 flex items-center gap-1.5 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-slate-900/20 transform -translate-y-1">
                                    <Trophy className="w-3 h-3 text-amber-400 fill-current" />
                                    Top Recommendation
                                </div>
                            )}

                            {plan.verdict.tier === 'RISK' && (
                                <div className="absolute -top-3 left-4 z-20 flex items-center gap-1.5 bg-rose-100 text-rose-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-rose-200">
                                    <AlertTriangle className="w-3 h-3" />
                                    Financial Risk
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
                context={`Strategy: ${slug}`}
            />
        </div>
    );
}