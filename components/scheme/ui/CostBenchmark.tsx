import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface CostBenchmarkProps {
    procedureName: string;
    yourCost: number;
    averageCost: number;
}

export function CostBenchmark({ procedureName, yourCost, averageCost }: CostBenchmarkProps) {
    if (yourCost === averageCost) return null; // No point showing if equal (rare)

    const diff = yourCost - averageCost;
    const isGood = diff < 0;
    const absDiff = Math.abs(diff);

    // Formatting helper
    const fmt = (n: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(n);

    const containerClass = `rounded-xl p-4 border flex items-start gap-4 ${isGood ? "bg-emerald-50 border-emerald-100" : "bg-amber-50 border-amber-100"}`;
    const iconClass = `w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isGood ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`;
    const titleClass = `font-bold text-sm mb-1 ${isGood ? "text-emerald-900" : "text-amber-900"}`;

    return (
        <div className={containerClass}>
            <div className={iconClass}>
                {isGood ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
            </div>

            <div className="flex-1">
                <h3 className={titleClass}>
                    {isGood ? "Great Value" : "Higher than Average"}
                </h3>

                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                    {isGood
                        ? `You pay ${fmt(absDiff)} less than the average co-payment for this procedure.`
                        : `This co-payment is ${fmt(absDiff)} higher than the market average of ${fmt(averageCost)}.`
                    }
                </p>

                {/* Mini Bar Chart */}
                <div className="space-y-2 mt-2">
                    {/* Your Plan */}
                    <div className="flex items-center gap-2 text-xs">
                        <span className="w-24 font-medium text-slate-500">Your Plan</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${isGood ? "bg-emerald-500" : "bg-amber-500"}`}
                                style={{ width: `${Math.min((yourCost / Math.max(yourCost, averageCost)) * 100, 100)}%` }}
                            />
                        </div>
                        <span className="font-bold text-slate-900">{fmt(yourCost)}</span>
                    </div>

                    {/* Market Average */}
                    <div className="flex items-center gap-2 text-xs">
                        <span className="w-24 font-medium text-slate-500">Market Avg</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-slate-400 rounded-full"
                                style={{ width: `${Math.min((averageCost / Math.max(yourCost, averageCost)) * 100, 100)}%` }}
                            />
                        </div>
                        <span className="text-slate-600">{fmt(averageCost)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
