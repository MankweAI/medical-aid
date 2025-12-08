'use client';

import { RankedPlan } from './FocusFeed';
import { ArrowUpRight, ArrowDownRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

interface DeltaCardProps {
    basePlan: RankedPlan;
    targetPlan: RankedPlan;
    onClick: () => void;
}

export default function DeltaCard({ basePlan, targetPlan, onClick }: DeltaCardProps) {

    const priceDiff = targetPlan.financials.monthlyPremium - basePlan.financials.monthlyPremium;
    const isCheaper = priceDiff < 0;

    // Theme Styles
    const themes = {
        emerald: "bg-emerald-50 border-emerald-200 hover:border-emerald-400",
        amber: "bg-amber-50 border-amber-200 hover:border-amber-400", // Yellow for cheaper
        rose: "bg-rose-50 border-rose-200 hover:border-rose-400",
        blue: "bg-blue-50 border-blue-200 hover:border-blue-400",
        slate: "bg-white border-slate-200 hover:border-slate-300"
    };

    const textColors = {
        emerald: "text-emerald-700",
        amber: "text-amber-800",
        rose: "text-rose-700",
        blue: "text-blue-700",
        slate: "text-slate-700"
    };

    const activeTheme = themes[targetPlan.visualTheme];
    const activeText = textColors[targetPlan.visualTheme];

    return (
        <button
            onClick={onClick}
            className={clsx(
                "w-[200px] p-4 rounded-2xl border-2 transition-all text-left h-full flex flex-col justify-between active:scale-95",
                activeTheme
            )}
        >
            {/* Header */}
            <div className="mb-3">
                <span className={clsx("text-[9px] font-black uppercase tracking-wider block mb-1 opacity-70", activeText)}>
                    {targetPlan.tier === 'WINNER' ? 'Recommended' : isCheaper ? 'Save Money' : 'Alternative'}
                </span>
                <h4 className={clsx("font-bold text-sm leading-tight", activeText)}>
                    {targetPlan.identity.plan_name}
                </h4>
            </div>

            {/* The Math Delta */}
            <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                    <span className={clsx("font-medium opacity-60", activeText)}>Diff</span>
                    <div className={clsx("flex items-center font-black", isCheaper ? "text-emerald-600" : "text-rose-600")}>
                        {isCheaper ? <ArrowDownRight className="w-3 h-3 mr-1" /> : <ArrowUpRight className="w-3 h-3 mr-1" />}
                        {isCheaper ? '-' : '+'} R{Math.abs(priceDiff).toLocaleString()}
                    </div>
                </div>

                {/* Visual Cue */}
                <div className="pt-2 flex justify-end">
                    {targetPlan.visualTheme === 'emerald' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    {targetPlan.visualTheme === 'rose' && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                </div>
            </div>
        </button>
    );
}