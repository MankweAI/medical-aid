'use client';

import { SimulationResult } from '@/types/simulation';
import { HelpCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

interface HeaderProps {
    result: SimulationResult;
    planName: string;
    onOpenJargon: (term: string) => void;
}

export function FinancialHealthHeader({ result, planName, onOpenJargon }: HeaderProps) {
    const { total_event_cost, plan_pays, shortfall } = result.financials;
    const formatR = (val: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    // Calculate percentages for the bar
    const planPercent = Math.min(100, (plan_pays / total_event_cost) * 100);
    const userPercent = 100 - planPercent;

    return (
        <div className="bg-white border-b border-slate-100 p-6">
            {/* Top Row: Title & Total */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Projected Outcome</p>
                    <h2 className="text-xl font-black text-slate-900">{planName}</h2>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Bill</p>
                    <p className="text-xl font-black text-slate-900">{formatR(total_event_cost)}</p>
                </div>
            </div>

            {/* Visual Health Bar */}
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex mb-6">
                <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${planPercent}%` }}
                />
                <div
                    className="h-full bg-rose-500 transition-all duration-500"
                    style={{ width: `${userPercent}%` }}
                />
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* Plan Pays */}
                <div
                    className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 cursor-pointer hover:bg-emerald-100 transition-colors group"
                    onClick={() => onOpenJargon('Plan Pays')}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs font-bold text-emerald-700 uppercase">Plan Pays</span>
                        </div>
                        <HelpCircle className="w-3 h-3 text-emerald-300 group-hover:text-emerald-500" />
                    </div>
                    <p className="text-2xl font-black text-emerald-700">{formatR(plan_pays)}</p>
                    <p className="text-[10px] font-bold text-emerald-600/70 mt-1">
                        {planPercent.toFixed(0)}% Covered
                    </p>
                </div>

                {/* You Pay */}
                <div
                    className={clsx(
                        "p-4 rounded-2xl border cursor-pointer transition-colors group",
                        shortfall > 0 ? "bg-rose-50 border-rose-100 hover:bg-rose-100" : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                    )}
                    onClick={() => onOpenJargon('Shortfall')}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-1">
                            {shortfall > 0 ? (
                                <AlertTriangle className="w-4 h-4 text-rose-600" />
                            ) : (
                                <CheckCircle2 className="w-4 h-4 text-slate-400" />
                            )}
                            <span className={clsx("text-xs font-bold uppercase", shortfall > 0 ? "text-rose-700" : "text-slate-500")}>
                                You Pay
                            </span>
                        </div>
                        <HelpCircle className={clsx("w-3 h-3 group-hover:opacity-100", shortfall > 0 ? "text-rose-300" : "text-slate-300")} />
                    </div>
                    <p className={clsx("text-2xl font-black", shortfall > 0 ? "text-rose-700" : "text-slate-500")}>
                        {formatR(shortfall)}
                    </p>
                    {shortfall > 0 && (
                        <p className="text-[10px] font-bold text-rose-600/70 mt-1">
                            {userPercent.toFixed(0)}% Shortfall
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
