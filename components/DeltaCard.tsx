'use client';

import { RankedPlan } from './FocusFeed';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import clsx from 'clsx';

interface DeltaCardProps {
    basePlan: RankedPlan;
    targetPlan: RankedPlan;
    onClick: () => void;
}

export default function DeltaCard({ basePlan, targetPlan, onClick }: DeltaCardProps) {

    // CALCULATE DELTAS
    const priceDiff = targetPlan.financials.monthlyPremium - basePlan.financials.monthlyPremium;
    const savingsDiff = targetPlan.financials.savings.annualAllocation - basePlan.financials.savings.annualAllocation;

    const isCheaper = priceDiff < 0;
    const isBetterSavings = savingsDiff > 0;

    return (
        <button
            onClick={onClick}
            className="w-full bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left group h-full flex flex-col justify-between"
        >
            {/* HEADLINE */}
            <div className="mb-4">
                <span className={clsx(
                    "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md mb-2 inline-block",
                    targetPlan.tier === 'WINNER' ? "bg-emerald-100 text-emerald-700" :
                        isCheaper ? "bg-slate-100 text-slate-600" : "bg-blue-50 text-blue-600"
                )}>
                    {targetPlan.tier === 'WINNER' ? 'Smart Upgrade' : isCheaper ? 'Save Money' : 'Alternative'}
                </span>
                <h4 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-700 transition-colors">
                    {targetPlan.identity.plan_name}
                </h4>
            </div>

            {/* MATH DELTAS */}
            <div className="space-y-2">

                {/* Price Delta */}
                <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-400">Premium</span>
                    <div className={clsx("flex items-center font-black", isCheaper ? "text-emerald-600" : "text-rose-600")}>
                        {isCheaper ? <ArrowDownRight className="w-3 h-3 mr-1" /> : <ArrowUpRight className="w-3 h-3 mr-1" />}
                        {isCheaper ? '-' : '+'} R{Math.abs(priceDiff).toLocaleString()}
                    </div>
                </div>

                {/* Savings Delta */}
                <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-400">Annual Savings</span>
                    <div className={clsx("flex items-center font-bold", isBetterSavings ? "text-emerald-600" : "text-slate-400")}>
                        {isBetterSavings ? '+' : ''} R{Math.abs(savingsDiff).toLocaleString()}
                    </div>
                </div>

            </div>

            {/* CTA HINT */}
            <div className="mt-4 pt-3 border-t border-slate-50 text-[10px] font-bold text-slate-400 text-center uppercase tracking-wider group-hover:text-blue-500 transition-colors">
                Tap to Compare
            </div>
        </button>
    );
}
