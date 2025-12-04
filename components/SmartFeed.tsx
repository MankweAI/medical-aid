'use client';

import { useMemo, useState } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { useCompare, Plan } from '@/context/CompareContext';
import { Shield, Filter } from 'lucide-react';
import ExpertModal from '@/components/ExpertModal';
import PinnedHeader from '@/components/PinnedHeader';
import FeedCard from '@/components/FeedCard';
import clsx from 'clsx';

// --- MOCK DATA (Source of Truth) ---
const MOCK_PLANS: Plan[] = [
    {
        id: 'bonstart-plus',
        price: 1800,
        savings_annual: 0,
        network_restriction: 'Network',
        identity: {
            scheme_name: 'Bonitas',
            plan_name: 'BonStart Plus',
            plan_series: 'Edge',
            plan_type: 'Hospital Plan'
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network: 100
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 6,
                ultrasounds_2d: 2,
                paediatrician_visits: 1
            },
            preventative: {
                vaccinations: true,
                contraceptives: 1600
            }
        },
        procedure_copays: {
            scope_in_hospital: 0,
            scope_out_hospital: 0,
            mri_scan: 2500,
            joint_replacement: 0
        }
    },
    {
        id: 'classic-saver',
        price: 3350,
        savings_annual: 10452,
        network_restriction: 'Any',
        identity: {
            scheme_name: 'Discovery',
            plan_name: 'Classic Saver',
            plan_series: 'Saver',
            plan_type: 'Medical Aid'
        },
        coverage_rates: {
            hospital_account: 200,
            specialist_in_hospital: 200,
            specialist_out_hospital: 100,
            gp_network: 100
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 8,
                ultrasounds_2d: 2,
                paediatrician_visits: 2
            },
            preventative: {
                vaccinations: true,
                contraceptives: 2200
            }
        },
        procedure_copays: {
            scope_in_hospital: 3500,
            scope_out_hospital: 0,
            mri_scan: 3250,
            joint_replacement: 0
        }
    },
    {
        id: 'flexi-fed-1',
        price: 1750,
        savings_annual: 0,
        network_restriction: 'Network',
        identity: {
            scheme_name: 'Fedhealth',
            plan_name: 'FlexiFed 1',
            plan_series: 'FlexiFed',
            plan_type: 'Hospital Plan'
        },
        coverage_rates: {
            hospital_account: 100,
            specialist_in_hospital: 100,
            specialist_out_hospital: 0,
            gp_network: 100
        },
        defined_baskets: {
            maternity: {
                antenatal_consults: 4,
                ultrasounds_2d: 1,
                paediatrician_visits: 0
            },
            preventative: {
                vaccinations: true,
                contraceptives: 0
            }
        },
        procedure_copays: {
            scope_in_hospital: 2500,
            scope_out_hospital: 0,
            mri_scan: 2500,
            joint_replacement: 5000
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
    const { activePin, showPinnedOnly, pinnedHistory } = useCompare();
    const { filters } = state;

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlanForModal, setSelectedPlanForModal] = useState('');

    const handleVerify = (name: string) => {
        setSelectedPlanForModal(name);
        setModalOpen(true);
    };

    const filteredPlans = useMemo(() => {
        // 1. PINNED FILTER
        if (showPinnedOnly) {
            return pinnedHistory;
        }

        return MOCK_PLANS.filter(plan => {
            // 2. NETWORK FILTER
            if (filters.network && filters.network !== 'Any') {
                if (plan.network_restriction !== filters.network) return false;
            }

            // 3. MATERNITY FILTER
            if (filters.maternity) {
                if (plan.defined_baskets.maternity.antenatal_consults === 0) return false;
            }

            // 4. SAVINGS FILTER
            if (filters.savings === 'Yes') {
                if (plan.savings_annual <= 0) return false;
            }

            return true;
        });
    }, [filters, showPinnedOnly, pinnedHistory]);

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