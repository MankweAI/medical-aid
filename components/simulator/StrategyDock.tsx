// components/simulator/StrategyDock.tsx
'use client';

import { useState } from 'react';
import { PlanProduct } from '@/types/schema';
import { SimulationResult } from '@/types/simulation';
import { ArrowRightLeft, ShieldCheck } from 'lucide-react';
import ExpertModal from '@/components/ExpertModal';
import clsx from 'clsx';
import { ComparisonToggle } from '@/components/ui/ComparisonToggle';

interface DockProps {
    currentPlanId: string;
    targetPlan: PlanProduct;
    targetResult: SimulationResult;
    challengers: Array<{ plan: PlanProduct, result: SimulationResult }>;
}

export function StrategyDock({ currentPlanId, targetPlan, targetResult, challengers }: DockProps) {
    const [isExpertOpen, setIsExpertOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-0 left-0 w-full z-40 bg-white/90 backdrop-blur-xl border-t border-slate-200 pb-6 pt-4 px-4">
                <div className="max-w-xl mx-auto">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <ArrowRightLeft className="w-3 h-3" />
                            Compare Strategies
                        </div>
                        <button
                            onClick={() => setIsExpertOpen(true)}
                            className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 hover:underline"
                        >
                            <ShieldCheck className="w-3 h-3" />
                            Verify with Expert
                        </button>
                    </div>


                    <div className="grid grid-cols-3 gap-3">
                        {/* 1. The Active Plan */}
                        <div className="relative group">
                            <button
                                onClick={() => setIsExpertOpen(true)}
                                className="w-full text-left p-3 rounded-xl bg-slate-900 text-white ring-2 ring-slate-900 relative active:scale-95 transition-transform"
                            >
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full">
                                    ACTIVE
                                </div>
                                <p className="text-[10px] opacity-70 mb-0.5">R{targetPlan.premiums.main}/pm</p>
                                <p className="text-xs font-bold truncate">{targetPlan.name}</p>
                                <p className="text-[10px] text-emerald-400 mt-1">Gap: R{targetResult.financials.shortfall}</p>
                            </button>
                            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ComparisonToggle planId={currentPlanId} className="scale-75 origin-top-right" />
                            </div>
                        </div>

                        {/* 2. The Challengers */}
                        {challengers.slice(0, 2).map(({ plan, result }) => (
                            <div key={plan.id} className="relative group">
                                <button
                                    onClick={() => setIsExpertOpen(true)} // In future, this would switch the active plan
                                    className="w-full text-left p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 transition-colors active:scale-95"
                                >
                                    <p className="text-[10px] text-slate-400 mb-0.5">R{plan.premiums.main}/pm</p>
                                    <p className="text-xs font-bold text-slate-700 truncate">{plan.name}</p>
                                    <p className={clsx("text-[10px] mt-1 font-bold", result.financials.shortfall === 0 ? "text-emerald-600" : "text-rose-500")}>
                                        {result.financials.shortfall === 0 ? "Full Cover" : `Gap: R${result.financials.shortfall}`}
                                    </p>
                                </button>
                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ComparisonToggle planId={plan.id} className="scale-75 origin-top-right" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ExpertModal
                isOpen={isExpertOpen}
                onClose={() => setIsExpertOpen(false)}
                planName={targetPlan.name}
                context="Simulation Strategy"
            />
        </>
    );
}
