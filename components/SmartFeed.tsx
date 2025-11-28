'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCompare } from '@/context/CompareContext';
import { Check, AlertTriangle, Plus, Shield, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import ExpertModal from '@/components/ExpertModal';

// In a real app, import these from your types/utils
// import { calculateMonthlyPremium } from '@/utils/calculation';

export default function SmartFeed({ persona, initialIncome }: { persona: string, initialIncome: number }) {
    const searchParams = useSearchParams();
    const { togglePlan, selectedPlans } = useCompare(); // Connect to CompareContext
    const income = parseInt(searchParams.get('income') || initialIncome.toString());

    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlanForModal, setSelectedPlanForModal] = useState('');

    // Handler for the "Check Availability" Conversion Trigger
    const handleVerify = (planName: string) => {
        setSelectedPlanForModal(planName);
        setModalOpen(true);
    };

    // Helper to check if a plan is already in the Compare Dock
    const isSelected = (id: string) => selectedPlans.some(p => p.id === id);

    // MOCK DATA: Simulating the "Money Engine" output
    // In production, this data would be passed in as a prop from the Server Component
    const plans = [
        {
            id: 'bonstart-plus',
            name: 'BonStart Plus',
            scheme: 'Bonitas',
            verdict: 'Fits Budget + Fully Covers Birth',
            verdictType: 'good', // 'good' = Green, 'warning' = Orange
            price: 1800,
            network: 'Network',
            tags: ['Maternity', 'Unlimited GP']
        },
        {
            id: 'keycare-start',
            name: 'KeyCare Start',
            scheme: 'Discovery',
            verdict: 'State Hospital Restriction',
            verdictType: 'warning',
            price: 1400,
            network: 'State/Network',
            tags: ['Basic Cover', 'Trauma Only']
        },
        {
            id: 'classic-saver',
            name: 'Classic Saver',
            scheme: 'Discovery',
            verdict: 'High Savings but Expensive',
            verdictType: 'neutral',
            price: 3350,
            network: 'Any Hospital',
            tags: ['Savings Account', 'Comprehensive']
        }
    ];

    return (
        <div className="space-y-4 pb-32 animate-in slide-in-from-bottom-8 duration-700">

            {/* 1. Contextual Refinement Chips (Visual Only for MVP) */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                <button className="flex-shrink-0 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 active:bg-blue-50 active:text-blue-600 transition-colors">
                    + Private Ward
                </button>
                <button className="flex-shrink-0 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 active:bg-blue-50 active:text-blue-600 transition-colors">
                    + Gap Cover
                </button>
            </div>

            {/* 2. The Feed Cards */}
            {plans.map((plan) => (
                <div
                    key={plan.id}
                    className={clsx(
                        "bg-white rounded-2xl p-5 shadow-sm border-2 transition-all relative overflow-hidden active:scale-[0.99]",
                        // Highlight if selected for comparison
                        isSelected(plan.id)
                            ? "border-blue-500 ring-4 ring-blue-500/10"
                            : plan.verdictType === 'good' ? "border-emerald-100" : "border-transparent"
                    )}
                >
                    {/* Tier 1 Visual Indicator */}
                    {plan.verdictType === 'good' && (
                        <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                            BEST MATCH
                        </div>
                    )}

                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-black text-slate-900 text-lg">{plan.name}</h3>
                            <p className={clsx(
                                "text-xs font-bold mt-1 flex items-center gap-1.5",
                                plan.verdictType === 'good' ? "text-emerald-600" :
                                    plan.verdictType === 'warning' ? "text-amber-600" : "text-slate-500"
                            )}>
                                {plan.verdictType === 'good' ? <Check className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                                {plan.verdict}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-slate-900">R{plan.price}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Per Month</p>
                        </div>
                    </div>

                    {/* Jargon Buster Tags */}
                    <div className="space-y-2 mb-6">
                        {plan.tags.map(tag => (
                            <div key={tag} className="flex items-center gap-2 text-sm text-slate-600">
                                <Shield className="w-4 h-4 text-slate-300" />
                                <span className="decoration-dotted underline decoration-slate-300 underline-offset-2 cursor-help">
                                    {tag}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-6">
                        {/* Compare Toggle */}
                        <button
                            onClick={() => togglePlan({ id: plan.id, name: plan.name, scheme: plan.scheme })}
                            className={clsx(
                                "flex-1 py-3 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors",
                                isSelected(plan.id)
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            )}
                        >
                            {isSelected(plan.id) ? (
                                <>
                                    <Check className="w-4 h-4" /> Added
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" /> Compare
                                </>
                            )}
                        </button>

                        {/* Conversion Trigger */}
                        <button
                            onClick={() => handleVerify(plan.name)}
                            className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl text-sm shadow-xl shadow-slate-900/10 active:scale-95 transition-transform flex items-center justify-center gap-2"
                        >
                            Check Availability
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}

            {/* 3. The Conversion Modal */}
            <ExpertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                planName={selectedPlanForModal}
                context={`R${income} Household Strategy`}
            />
        </div>
    );
}