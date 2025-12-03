// components/simulator/StrategyDock.tsx
'use client';

import { PlanProduct } from '@/types/schema';
import { SimulationResult } from '@/types/simulation';
import { ArrowRightLeft } from 'lucide-react';
import clsx from 'clsx';

interface DockProps {
    currentPlanId: string;
    targetPlan: PlanProduct;
    targetResult: SimulationResult;
    challengers: Array<{ plan: PlanProduct, result: SimulationResult }>;
}

export function StrategyDock({ currentPlanId, targetPlan, targetResult, challengers }: DockProps) {

    return (
        <div className="fixed bottom-0 left-0 w-full z-40 bg-white/90 backdrop-blur-xl border-t border-slate-200 pb-6 pt-4 px-4">
            <div className="max-w-xl mx-auto">
                <div className="flex items-center gap-2 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <ArrowRightLeft className="w-3 h-3" />
                    Compare Strategies
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {/* 1. The Active Plan */}
                    <button className="text-left p-3 rounded-xl bg-slate-900 text-white ring-2 ring-slate-900 relative">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full">
                            ACTIVE
                        </div>
                        <p className="text-[10px] opacity-70 mb-0.5">R{targetPlan.premiums.main}/pm</p>
                        <p className="text-xs font-bold truncate">{targetPlan.name}</p>
                        <p className="text-[10px] text-emerald-400 mt-1">Gap: R{targetResult.financials.shortfall}</p>
                    </button>

                    {/* 2. The Challengers */}
                    {challengers.slice(0, 2).map(({ plan, result }) => (
                        <button key={plan.id} className="text-left p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 transition-colors">
                            <p className="text-[10px] text-slate-400 mb-0.5">R{plan.premiums.main}/pm</p>
                            <p className="text-xs font-bold text-slate-700 truncate">{plan.name}</p>
                            <p className={clsx("text-[10px] mt-1 font-bold", result.financials.shortfall === 0 ? "text-emerald-600" : "text-rose-500")}>
                                {result.financials.shortfall === 0 ? "Full Cover" : `Gap: R${result.financials.shortfall}`}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
