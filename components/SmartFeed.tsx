'use client';

import { useMemo, useState } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { useCompare } from '@/context/CompareContext';
import { Shield } from 'lucide-react';
import ExpertModal from '@/components/ExpertModal';
import PinnedHeader from '@/components/PinnedHeader';
import FeedCard from '@/components/FeedCard';
import clsx from 'clsx';

// --- MOCK DATA ---
const ALL_PLANS = [
    {
        id: 'bonstart-plus',
        name: 'BonStart Plus',
        scheme: 'Bonitas',
        price: 1800,
        network_restriction: 'Network',
        savings_annual: 0,
        chronic_limit: 'Basic CIB',
        verdictType: 'good' as const,
        red_flag: '',
        benefits: [],
        // Added flags to match Control Panel logic
        features: {
            maternity: true,
            savings: false,
            chronic: 'Basic'
        }
    },
    {
        id: 'keycare-start',
        name: 'KeyCare Start',
        scheme: 'Discovery',
        price: 1400,
        network_restriction: 'State',
        savings_annual: 0,
        chronic_limit: 'State Facilities',
        red_flag: 'State Chronic Meds Only',
        verdictType: 'warning' as const,
        benefits: [],
        features: {
            maternity: false,
            savings: false,
            chronic: 'Basic'
        }
    },
    {
        id: 'classic-saver',
        name: 'Classic Saver',
        scheme: 'Discovery',
        price: 3350,
        network_restriction: 'Any',
        savings_annual: 10452,
        chronic_limit: 'R22,000 (DSA)',
        verdictType: 'neutral' as const,
        red_flag: '',
        benefits: [],
        features: {
            maternity: true,
            savings: true,
            chronic: 'Comprehensive'
        }
    },
    {
        id: 'flexi-fed-1',
        name: 'FlexiFed 1',
        scheme: 'Fedhealth',
        price: 1750,
        network_restriction: 'Network',
        savings_annual: 0,
        chronic_limit: 'Basic',
        verdictType: 'good' as const,
        red_flag: '',
        benefits: [],
        features: {
            maternity: true,
            savings: false,
            chronic: 'Basic'
        }
    }
];

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
    const { activePin } = useCompare();
    const { filters } = state;

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlanForModal, setSelectedPlanForModal] = useState('');

    // --- Filtering Logic (Updated to match Context Types) ---
    const filteredPlans = useMemo(() => {
        return ALL_PLANS.filter(plan => {

            // 1. Hospital Network Filter
            // If user selects specific network (not 'Any'), exclude mismatches.
            // Note: 'Any' plans usually cover 'Network' requests, but 'Network' plans don't cover 'Any'.
            if (filters.network && filters.network !== 'Any') {
                if (plan.network_restriction !== filters.network) return false;
            }

            // 2. Savings Filter
            if (filters.savings === 'Yes') {
                if (!plan.features.savings) return false;
            }

            // 3. Chronic Filter
            if (filters.chronic === 'Comprehensive') {
                if (plan.features.chronic !== 'Comprehensive') return false;
            }

            // 4. Maternity Filter
            if (filters.maternity) {
                if (!plan.features.maternity) return false;
            }

            return true;
        });
    }, [filters]);

    const handleVerify = (name: string) => {
        setSelectedPlanForModal(name);
        setModalOpen(true);
    };

    return (
        <div className={clsx("relative min-h-[500px]", activePin && "pt-32")}>
            {/* 1. STICKY PINNED HEADER */}
            <PinnedHeader />

            {/* 2. SCROLLABLE FEED */}
            <div className="space-y-3 pb-32 animate-in slide-in-from-bottom-8 duration-700">

                {/* Feed Status */}
                <div className="flex items-center justify-between px-2 mb-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {filteredPlans.length} Strategies Found
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

            {/* 3. MODAL */}
            <ExpertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                planName={selectedPlanForModal}
                context={`Strategy for ${persona}`}
            />
        </div>
    );
}