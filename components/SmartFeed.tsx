'use client';

import { useMemo, useState } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { useCompare } from '@/context/CompareContext';
// FIX: Import Plan from types, not context, to ensure consistency
import { Plan } from '@/utils/types';
import { Shield, Filter, Trophy, AlertTriangle, CheckCircle2 } from 'lucide-react';
import ExpertModal from '@/components/ExpertModal';
import PinnedHeader from '@/components/PinnedHeader';
import FeedCard from '@/components/FeedCard';
import FeedSkeleton from '@/components/skeletons/FeedSkeleton';
import clsx from 'clsx';

// --- MOCK DATA (Fixed to match types.ts) ---
const MOCK_PLANS: Plan[] = [
    {
        id: 'bestmed-beat2-network',
        price: 2775,
        savings_annual: 5328,
        network_restriction: 'Network',
        identity: {
            scheme_name: 'Bestmed',
            plan_name: 'Beat 2 Network',
            plan_series: 'Beat',
            plan_type: 'Savings'
        },
        contributions: [], // Add empty or real data if engine needs it
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 100 // Fixed name
        },
        defined_baskets: {
            maternity: { antenatal_consults: 6, ultrasounds_2d: 2, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 2400 } // Fixed name
        },
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 2500,
            joint_replacement: 0
        },
        red_flag: "Standard of Care prostheses only."
    },
    {
        id: 'bestmed-beat1-network',
        price: 1959,
        savings_annual: 0,
        network_restriction: 'Network',
        identity: {
            scheme_name: 'Bestmed',
            plan_name: 'Beat 1 Network',
            plan_series: 'Beat',
            plan_type: 'Hospital Plan'
        },
        contributions: [],
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network_consults: 0 // Fixed name
        },
        defined_baskets: {
            maternity: { antenatal_consults: 0, ultrasounds_2d: 0, paediatrician_visits: 0 },
            preventative: { vaccinations: true, contraceptives: 0 } // Fixed name
        },
        procedure_copays: {
            scope_in_hospital: 2000,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0
        },
        red_flag: "Joint replacements excluded (PMB only)."
    },
    {
        id: 'bestmed-pace1',
        price: 5934,
        savings_annual: 13524,
        network_restriction: 'Any',
        identity: {
            scheme_name: 'Bestmed',
            plan_name: 'Pace 1',
            plan_series: 'Pace',
            plan_type: 'Comprehensive'
        },
        contributions: [],
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 100,
            gp_network_consults: 100 // Fixed name
        },
        defined_baskets: {
            maternity: { antenatal_consults: 9, ultrasounds_2d: 2, paediatrician_visits: 1 },
            preventative: { vaccinations: true, contraceptives: 2800 } // Fixed name
        },
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 0,
            joint_replacement: 0
        }
    }
];

export default function SmartFeed({ persona, initialIncome }: { persona: string, initialIncome: number }) {
    const { state } = usePersona();
    const { activePin, showPinnedOnly, pinnedHistory } = useCompare();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlanForModal, setSelectedPlanForModal] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerify = (name: string) => {
        setSelectedPlanForModal(name);
        setModalOpen(true);
    };

    // --- ACTUARIAL RANKING ENGINE ---
    const rankedPlans = useMemo(() => {
        // FIX: Provide complete verdict object for pinned items
        if (showPinnedOnly) {
            return pinnedHistory.map(p => ({
                ...p,
                // Cast to Plan to ensure compatibility if needed, essentially adding missing props if any
                verdict: { tier: 'CONTENDER' as const, badge: '', warning: '' }
            }));
        }

        return MOCK_PLANS.map(plan => {
            let score = 0;
            let badge = '';
            let warning = plan.red_flag || '';
            let tier: 'WINNER' | 'CONTENDER' | 'RISK' = 'CONTENDER';

            // 1. Budget Fit
            if (plan.price < initialIncome * 0.1) score += 20;

            // 2. Persona Specific Logic
            if (persona.includes('savings-starter') && plan.id === 'bestmed-beat2-network') {
                score += 50;
                badge = "Winning Logic: Saves R9,000/yr vs Pace 1 while covering acute needs.";
                tier = 'WINNER';
            } else if (persona.includes('network-arbitrageur') && plan.id === 'bestmed-beat1-network') {
                score += 50;
                badge = "Efficiency Engine: Lowest cost private hospital access.";
                tier = 'WINNER';
            }

            // 3. Risk Penalties
            if (persona.includes('maternity') && plan.defined_baskets.maternity.antenatal_consults === 0) {
                score -= 30;
                tier = 'RISK';
                warning = "Gap Warning: Pregnancy visits are fully self-funded.";
            }

            return { ...plan, score, verdict: { tier, badge, warning } };
        }).sort((a, b) => b.score - a.score);
    }, [persona, initialIncome, showPinnedOnly, pinnedHistory]);

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
                                {rankedPlans.length} Strategies Calculated
                            </>
                        )}
                    </p>
                </div>

                {rankedPlans.length === 0 ? (
                    <div className="text-center py-12 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <Shield className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-slate-900 font-bold text-sm">No viable strategies found</h3>
                        <p className="text-xs text-slate-500 mt-2">Try adjusting your income or network preferences.</p>
                    </div>
                ) : (
                    rankedPlans.map((plan) => (
                        <div key={plan.id} className="relative">
                            {plan.verdict.tier === 'WINNER' && !showPinnedOnly && (
                                <div className="absolute -top-3 left-4 z-20 flex items-center gap-1.5 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-slate-900/20 transform -translate-y-1">
                                    <Trophy className="w-3 h-3 text-amber-400 fill-current" />
                                    Actuarial Choice
                                </div>
                            )}

                            {plan.verdict.tier === 'RISK' && (
                                <div className="absolute -top-3 left-4 z-20 flex items-center gap-1.5 bg-rose-100 text-rose-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-rose-200">
                                    <AlertTriangle className="w-3 h-3" />
                                    High Risk Match
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
                context={`Strategy: ${persona}`}
            />
        </div>
    );
}