'use client';

import { useMemo, useState } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { useCompare } from '@/context/CompareContext';
import { PLANS } from '@/data/plans';
import { PERSONAS } from '@/data/personas';
import { PricingEngine } from '@/utils/engine';
import { validatePlan, Risk } from '@/utils/persona'; // Import Risk
import { X, Trophy, Lock, RefreshCw, Undo2 } from 'lucide-react';
import PinnedHeader from '@/components/PinnedHeader';
import FeedCard from '@/components/FeedCard';
import FeedSkeleton from '@/components/skeletons/FeedSkeleton';
import ExpertModal from '@/components/ExpertModal';
import { Plan } from '@/utils/types'; // Import Base Plan
import clsx from 'clsx';

// 1. DEFINE THE EXTENDED TYPE
type FeedItem = Plan & {
    tier: 'WINNER' | 'CONTENDER' | 'RISK';
    badge: string;
    risks: Risk[];
    // We override price/savings with the calculated values
    price: number;
    savings_annual: number;
};

export default function FocusFeed({ persona: slug }: { persona: string, initialIncome: number }) {
    const { state } = usePersona();
    const { showPinnedOnly, pinnedHistory } = useCompare();

    const [excludedIds, setExcludedIds] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlanForModal, setSelectedPlanForModal] = useState('');

    const currentPersona = useMemo(() =>
        PERSONAS.find(p => p.slug === slug),
        [slug]);

    // 2. USE THE TYPE IN USEMEMO
    const feedItems = useMemo(() => {
        if (!currentPersona) return [];
        // If showing pinned, we need to adapt them to FeedItem type
        if (showPinnedOnly) {
            return pinnedHistory.map(p => ({
                ...p,
                tier: 'CONTENDER',
                badge: 'Pinned',
                risks: [],
                // Use defaults or recalculate if needed
            })) as FeedItem[];
        }

        const relevantPlans = PricingEngine.selectConsiderationSet(PLANS, currentPersona, excludedIds);

        return relevantPlans.map(plan => {
            const contribution = plan.contributions[0];
            const financials = PricingEngine.calculateProfile(contribution, state.members, state.income);
            const risks = validatePlan(plan, currentPersona);

            const isWinner = plan.id === currentPersona.actuarial_logic?.target_plan_id;

            // 3. RETURN OBJECT MATCHING FeedItem
            return {
                ...plan,
                price: financials.monthlyPremium,
                savings_annual: financials.savings.annualAllocation,
                risks,
                tier: isWinner ? 'WINNER' : 'CONTENDER',
                badge: isWinner ? 'Actuary Choice' : ''
            };
        }) as FeedItem[]; // <--- EXPLICIT CAST FIXES THE ERROR
    }, [state, currentPersona, excludedIds, showPinnedOnly, pinnedHistory]);

    const handleRemove = (id: string) => setExcludedIds(prev => [...prev, id]);
    const handleUndo = () => setExcludedIds([]);

    if (!currentPersona) return <FeedSkeleton />;

    const brandLock = currentPersona.actuarial_logic?.brand_lock;

    return (
        <div className="relative min-h-[600px] pb-32">
            <PinnedHeader />

            <div className="flex items-center justify-between px-4 mb-6">
                <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <RefreshCw className="w-3 h-3 text-emerald-500 animate-spin-slow" />
                        Live Analysis • {state.members.main + state.members.adult + state.members.child} Members
                    </p>
                    {brandLock && (
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-100 rounded-md self-start">
                            <Lock className="w-2.5 h-2.5 text-blue-500" />
                            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider">
                                {brandLock} Plans Only
                            </span>
                        </div>
                    )}
                </div>
                {excludedIds.length > 0 && (
                    <button onClick={handleUndo} className="text-[10px] font-bold text-slate-400 flex items-center gap-1 hover:text-slate-600">
                        <Undo2 className="w-3 h-3" /> Undo Hides
                    </button>
                )}
            </div>

            <div className="px-4 space-y-6">
                {feedItems.map((plan, index) => (
                    <div key={plan.id} className="relative animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>

                        {!showPinnedOnly && (
                            <button onClick={() => handleRemove(plan.id)} className="absolute -top-2 -right-2 z-30 p-1.5 bg-slate-200 text-slate-500 rounded-full hover:bg-rose-500 hover:text-white transition-all shadow-sm border border-white">
                                <X className="w-3 h-3" />
                            </button>
                        )}

                        {plan.tier === 'WINNER' && !showPinnedOnly && (
                            <div className="absolute -top-3 left-4 z-20 flex items-center gap-1.5 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-slate-900/20">
                                <Trophy className="w-3 h-3 text-amber-400 fill-current" />
                                Top Recommendation
                            </div>
                        )}

                        <FeedCard
                            plan={plan}
                            onVerify={(name) => { setSelectedPlanForModal(name); setModalOpen(true); }}
                            verdict={{
                                tier: plan.tier, // No 'as any' needed now
                                badge: plan.badge, // Works because plan is FeedItem
                                warning: plan.red_flag || ''
                            }}
                        />
                    </div>
                ))}
            </div>

            <ExpertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                planName={selectedPlanForModal}
                context={`Strategy: ${currentPersona.meta.title}`}
            />
        </div>
    );
}