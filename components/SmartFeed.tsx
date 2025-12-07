'use client';

import { useMemo, useState } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { useCompare } from '@/context/CompareContext';
import { PricingEngine } from '@/utils/engine';
import { PLANS } from '@/data/plans';
import { PERSONAS } from '@/data/personas';
import { validatePlan } from '@/utils/persona';
import { Shield, Filter } from 'lucide-react';
import ExpertModal from '@/components/ExpertModal';
import PinnedHeader from '@/components/PinnedHeader';
import FeedCard from '@/components/FeedCard';
import clsx from 'clsx';

function EmptyState() {
    return (
        <div className="text-center py-12 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Shield className="w-6 h-6 text-slate-300" />
            </div>
            <h3 className="text-slate-900 font-bold text-sm">No plans match criteria</h3>
            <p className="text-xs text-slate-500 mt-2">Try relaxing your filters in the Control Panel.</p>
        </div>
    );
}

export default function SmartFeed({ persona, initialIncome }: { persona: string, initialIncome: number }) {
    const { state } = usePersona();
    const { activePin, showPinnedOnly, pinnedHistory } = useCompare();
    const { filters, income, members } = state;

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlanForModal, setSelectedPlanForModal] = useState('');

    const handleVerify = (name: string) => {
        setSelectedPlanForModal(name);
        setModalOpen(true);
    };

    // 1. Calculate, Enrich & Validate Plans
    const enrichedPlans = useMemo(() => {
        // Use context income/members if available (client-side updates), else initial (server-side)
        const currentIncome = income || initialIncome;

        // Find the active persona definition to run actuarial logic
        const currentPersonaDef = PERSONAS.find(p => p.slug === persona);

        return PLANS.map(plan => {
            // A. Financial Calculation
            const { monthlyPremium, savings } = PricingEngine.calculateProfile(plan, members, currentIncome);

            // B. Risk Analysis (Red Flag Logic)
            let redFlagStr = undefined;
            if (currentPersonaDef) {
                const risks = validatePlan(plan, currentPersonaDef);
                if (risks.length > 0) {
                    // Sort risks: HIGH priority first, then MEDIUM
                    const sortedRisks = risks.sort((a, b) => {
                        const priority: Record<string, number> = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
                        return (priority[b.level] || 0) - (priority[a.level] || 0);
                    });
                    // Use the most severe risk details as the Red Flag
                    redFlagStr = sortedRisks[0].details;
                }
            }

            return {
                ...plan,
                price: monthlyPremium,
                savings_annual: savings.annualAllocation,
                network_restriction: plan.network_rules.restriction_level, // Helper for UI
                red_flag: redFlagStr // Injected dynamically
            };
        });
    }, [income, initialIncome, members, persona]);

    const filteredPlans = useMemo(() => {
        // 2. PINNED FILTER
        if (showPinnedOnly) {
            return pinnedHistory;
        }

        return enrichedPlans.filter(plan => {
            // 3. NETWORK FILTER
            if (filters.network && filters.network !== 'Any') {
                if (!plan.network_rules.restriction_level.includes(filters.network)) return false;
            }

            // 4. MATERNITY FILTER
            if (filters.maternity) {
                if (plan.defined_baskets.maternity.antenatal_consults === 0) return false;
            }

            // 5. SAVINGS FILTER
            if (filters.savings === 'Yes') {
                if ((plan.savings_annual || 0) <= 0) return false;
            }

            return true;
        });
    }, [filters, showPinnedOnly, pinnedHistory, enrichedPlans]);

    return (
        <div className={clsx("relative min-h-[500px]", activePin && "pt-40")}>
            <PinnedHeader />

            <div className="space-y-3 pb-32 animate-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center justify-between px-2 mb-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        {showPinnedOnly && <Filter className="w-3 h-3 text-blue-500" />}
                        {showPinnedOnly ? "Pinned Cards Only" : `${filteredPlans.length} Strategies Found`}
                    </p>
                </div>

                {filteredPlans.length === 0 ? (
                    <EmptyState />
                ) : (
                    filteredPlans.map((plan) => (
                        <FeedCard
                            key={plan.id}
                            plan={plan}
                            onVerify={handleVerify}
                        />
                    ))
                )}
            </div>

            <ExpertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                planName={selectedPlanForModal}
                context={`Strategy for ${persona}`}
            />
        </div>
    );
}