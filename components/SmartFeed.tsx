'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCompare } from '@/context/CompareContext';
import { Check, AlertTriangle, Plus, Shield, ArrowRight, Activity, Zap, Eye } from 'lucide-react';
import clsx from 'clsx';
import ExpertModal from '@/components/ExpertModal';
import BottomSheet from '@/components/ui/BottomSheet';
import PlanDetails from '@/components/PlanDetails';

// --- Types for the Transparent Card ---
interface PlanData {
    id: string;
    name: string;
    scheme: string;
    price: number;
    network_restriction: string;
    savings_annual: number;
    chronic_limit: string;
    red_flag?: string;
    verdictType: 'good' | 'warning' | 'neutral';
    benefits: any[]; // For the verbose view
}

export default function SmartFeed({ persona, initialIncome }: { persona: string, initialIncome: number }) {
    const searchParams = useSearchParams();
    const { togglePlan, selectedPlans } = useCompare();
    const income = parseInt(searchParams.get('income') || initialIncome.toString());

    // --- Interaction State ---
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlanForModal, setSelectedPlanForModal] = useState('');
    const [viewingPlan, setViewingPlan] = useState<PlanData | null>(null);

    // --- Handlers ---
    const handleVerify = (e: React.MouseEvent, planName: string) => {
        e.stopPropagation(); // Prevent opening the details sheet
        setSelectedPlanForModal(planName);
        setModalOpen(true);
    };

    const handleCompare = (e: React.MouseEvent, plan: PlanData) => {
        e.stopPropagation(); // Prevent opening the details sheet
        togglePlan({ id: plan.id, name: plan.name, scheme: plan.scheme });
    };

    const isSelected = (id: string) => selectedPlans.some(p => p.id === id);

    // --- MOCK DATA (Enhanced for Transparent Card) ---
    const plans: PlanData[] = [
        {
            id: 'bonstart-plus',
            name: 'BonStart Plus',
            scheme: 'Bonitas',
            price: 1800,
            network_restriction: 'Network',
            savings_annual: 0,
            chronic_limit: 'Basic Formulary',
            verdictType: 'good',
            benefits: [
                { category: 'Hospitalization', benefit_name: 'Private Network', display_text: 'Unlimited cover at BonStart Network hospitals. Emergency treatment covers you at any private hospital.' },
                { category: 'Maternity', benefit_name: 'Birth Benefit', display_text: '100% of the Bonitas Rate for private ward delivery. Includes 6 antenatal consultations.' }
            ]
        },
        {
            id: 'keycare-start',
            name: 'KeyCare Start',
            scheme: 'Discovery',
            price: 1400,
            network_restriction: 'State/Network',
            savings_annual: 0,
            chronic_limit: 'State Facilities',
            red_flag: 'Chronic medication restricted to State Facilities only.',
            verdictType: 'warning',
            benefits: [
                { category: 'Hospitalization', benefit_name: 'KeyCare Network', display_text: 'Full cover in the KeyCare Hospital Network. State hospitals for chronic conditions.' },
                { category: 'Day-to-Day', benefit_name: 'GP Limit', display_text: 'Unlimited visits to your selected KeyCare GP. Casual visits not covered.' }
            ]
        },
        {
            id: 'classic-saver',
            name: 'Classic Saver',
            scheme: 'Discovery',
            price: 3350,
            network_restriction: 'Any',
            savings_annual: 10450,
            chronic_limit: 'R22,000 (DSA)',
            verdictType: 'neutral',
            benefits: [
                { category: 'Hospitalization', benefit_name: 'Any Hospital', display_text: 'Go to any private hospital. 20% co-payment only applies to specialists not on the Classic network.' },
                { category: 'Savings', benefit_name: 'Medical Savings Account', display_text: 'R10,450 available upfront for day-to-day expenses.' }
            ]
        }
    ];

    return (
        <div className="space-y-6 pb-32 animate-in slide-in-from-bottom-8 duration-700">

            {/* 1. Truth Toggles (New Filter) */}
            <div className="flex items-center justify-between px-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Found {plans.length} Strategies
                </p>
                <div className="flex gap-2">
                    {/* Visual-only for MVP */}
                    <span className="text-[10px] font-bold text-slate-300">Show Full Cover Only</span>
                </div>
            </div>

            {/* 2. The Transparent Cards */}
            {plans.map((plan) => (
                <div
                    key={plan.id}
                    onClick={() => setViewingPlan(plan)} // <--- CLICK TO UNFOLD
                    className={clsx(
                        "bg-white rounded-2xl border-2 transition-all relative overflow-hidden active:scale-[0.98] cursor-pointer hover:shadow-lg shadow-sm group",
                        isSelected(plan.id)
                            ? "border-blue-500 ring-4 ring-blue-500/10"
                            : plan.verdictType === 'good' ? "border-emerald-100" : "border-slate-100"
                    )}
                >
                    {/* HEADER: Identification */}
                    <div className="p-5 pb-3 flex justify-between items-start">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                {plan.scheme}
                                {plan.verdictType === 'good' && <Check className="w-3 h-3 text-emerald-500" />}
                            </span>
                            <h3 className="font-black text-slate-900 text-xl group-hover:text-blue-600 transition-colors">
                                {plan.name}
                            </h3>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-slate-900">R{plan.price}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Per Month</p>
                        </div>
                    </div>

                    {/* ZONE A: Key Metrics (The Dashboard) */}
                    <div className="px-5 py-3 grid grid-cols-3 gap-2 border-b border-slate-50 bg-slate-50/50">
                        <div className="flex flex-col">
                            <span className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">Hospital</span>
                            <span className="text-xs font-bold text-slate-700 truncate">{plan.network_restriction}</span>
                        </div>
                        <div className="flex flex-col border-l border-slate-100 pl-3">
                            <span className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">Savings</span>
                            <span className={clsx("text-xs font-bold truncate", plan.savings_annual > 0 ? "text-emerald-600" : "text-slate-400")}>
                                {plan.savings_annual > 0 ? `R${plan.savings_annual}` : 'None'}
                            </span>
                        </div>
                        <div className="flex flex-col border-l border-slate-100 pl-3">
                            <span className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">Chronic</span>
                            <span className="text-xs font-bold text-slate-700 truncate">{plan.chronic_limit}</span>
                        </div>
                    </div>

                    {/* ZONE B: The Red Flag (Anti-Misleading) */}
                    {plan.red_flag && (
                        <div className="px-5 py-2.5 bg-amber-50 border-t border-amber-100 flex items-start gap-3">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-amber-800 font-bold leading-tight">
                                {plan.red_flag}
                            </p>
                        </div>
                    )}

                    {/* ZONE C: Footer Actions */}
                    <div className="p-4 flex gap-3">
                        <button
                            onClick={(e) => handleCompare(e, plan)}
                            className={clsx(
                                "flex-1 py-3 border rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors",
                                isSelected(plan.id)
                                    ? "bg-blue-50 border-blue-200 text-blue-700"
                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                            )}
                        >
                            {isSelected(plan.id) ? "Added" : "Compare"}
                        </button>

                        <button
                            onClick={(e) => handleVerify(e, plan.name)}
                            className="flex-[1.5] py-3 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg shadow-slate-900/10 active:scale-95 transition-transform flex items-center justify-center gap-2"
                        >
                            Check Availability
                            <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>

                    {/* Subtle "Tap to View" hint */}
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/[0.01] transition-colors pointer-events-none" />
                </div>
            ))}

            {/* 3. CONVERSION MODAL */}
            <ExpertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                planName={selectedPlanForModal}
                context={`R${income} Strategy`}
            />

            {/* 4. THE UNFOLDED PAGE (Details Sheet) */}
            <BottomSheet
                isOpen={!!viewingPlan}
                onClose={() => setViewingPlan(null)}
                title={viewingPlan?.name || 'Plan Intelligence'}
            >
                {viewingPlan && (
                    <div className="space-y-6">
                        {/* Header Summary */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Effective Cost</p>
                                <p className="text-xl font-black text-slate-900">R{viewingPlan.price} <span className="text-xs font-medium text-slate-400">pm</span></p>
                            </div>
                            {viewingPlan.savings_annual > 0 && (
                                <div className="text-right">
                                    <p className="text-xs font-bold text-slate-400 uppercase">Savings Pool</p>
                                    <p className="text-lg font-bold text-emerald-600">R{viewingPlan.savings_annual}</p>
                                </div>
                            )}
                        </div>

                        {/* Verbose Data */}
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-blue-600" />
                                Verbose Benefit Data
                            </h4>
                            <PlanDetails benefits={viewingPlan.benefits} />
                        </div>

                        {/* Floating CTA in Sheet */}
                        <div className="sticky bottom-0 bg-white/95 backdrop-blur pt-4 pb-2">
                            <button
                                onClick={(e) => {
                                    setViewingPlan(null);
                                    handleVerify(e, viewingPlan.name);
                                }}
                                className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-900/20 active:scale-95 transition-transform"
                            >
                                Confirm Availability
                            </button>
                        </div>
                    </div>
                )}
            </BottomSheet>
        </div>
    );
}