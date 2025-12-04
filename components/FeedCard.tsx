'use client';

import { useCompare, Plan } from '@/context/CompareContext';
import { ArrowRight, Activity, Shield, AlertCircle, MapPin } from 'lucide-react';
import SwipeableCard from '@/components/ui/SwipeableCard';
import clsx from 'clsx';

interface FeedCardProps {
    plan: Plan;
    onVerify: (name: string) => void;
}

export default function FeedCard({ plan, onVerify }: FeedCardProps) {
    const { activePin, setPin } = useCompare();

    // 1. Calculate Delta relative to Pinned Card
    const isPinned = activePin?.id === plan.id;
    let delta = null;

    if (activePin && !isPinned) {
        const diff = plan.price - activePin.price;
        delta = {
            val: Math.abs(diff),
            sign: diff > 0 ? '+' : '-',
            color: diff > 0 ? 'text-rose-600 bg-rose-50 border-rose-100' : 'text-emerald-600 bg-emerald-50 border-emerald-100'
        };
    }

    return (
        <SwipeableCard onPin={() => setPin(plan)} isPinned={isPinned}>
            <div className={clsx(
                "border transition-all relative overflow-hidden active:scale-[0.99] rounded-2xl",
                isPinned
                    ? "border-blue-500 ring-2 ring-blue-500/10 shadow-md z-10"
                    : "border-slate-200 shadow-sm hover:border-slate-300"
            )}>

                {/* Active Indicator */}
                {isPinned && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold px-2 py-1 rounded-bl-xl z-20">
                        ACTIVE REF
                    </div>
                )}

                <div className="p-4 grid grid-cols-12 gap-2 items-center">

                    {/* COL 1: Info (7/12) */}
                    <div className="col-span-7 pr-2">
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                {plan.scheme}
                            </span>
                            {plan.network_restriction === 'Network' && (
                                <span className="text-[8px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full border border-slate-200">
                                    NET
                                </span>
                            )}
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm leading-tight mb-2">
                            {plan.name}
                        </h3>

                        <div className="flex flex-wrap gap-1.5">
                            {plan.savings_annual > 0 && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-1 rounded-md bg-emerald-50/80 border border-emerald-100 text-[9px] font-bold text-emerald-700">
                                    <Activity className="w-2.5 h-2.5" />
                                    <span>Svgs: R{Math.round(plan.savings_annual / 12)}</span>
                                </span>
                            )}
                            <span className="inline-flex items-center gap-1 px-1.5 py-1 rounded-md bg-slate-50 border border-slate-100 text-[9px] font-bold text-slate-500">
                                <Shield className="w-2.5 h-2.5" />
                                <span>{plan.chronic_limit || 'Basic'}</span>
                            </span>
                        </div>
                    </div>

                    {/* COL 2: Price & Actions (5/12) */}
                    <div className="col-span-5 flex flex-col items-end justify-between h-full pl-3 border-l border-slate-50">

                        {/* Price & Delta */}
                        <div className="text-right mb-2">
                            {delta && (
                                <div className={clsx("inline-block mb-0.5 text-[9px] font-black px-1.5 py-0.5 rounded-full border", delta.color)}>
                                    {delta.sign} R{delta.val}
                                </div>
                            )}
                            <div className="flex items-baseline justify-end gap-0.5">
                                <span className="text-[10px] text-slate-400 font-medium">R</span>
                                <span className="font-black text-slate-900 text-xl tracking-tight">
                                    {plan.price.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 w-full justify-end">
                            <button
                                onClick={(e) => { e.stopPropagation(); setPin(plan); }}
                                className="h-8 w-8 rounded-lg bg-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors"
                            >
                                <MapPin className={clsx("w-4 h-4", isPinned && "fill-blue-600 text-blue-600")} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onVerify(plan.name); }}
                                className="h-8 flex-1 bg-slate-900 text-white rounded-lg flex items-center justify-center gap-1 shadow-lg shadow-slate-900/10 active:scale-95 transition-transform"
                            >
                                <span className="text-[10px] font-bold">Details</span>
                                <ArrowRight className="w-3 h-3 text-slate-400" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Warning Strip */}
                {plan.verdictType === 'warning' && (
                    <div className="bg-amber-50/50 px-4 py-1.5 flex items-center gap-2 border-t border-amber-100/50">
                        <AlertCircle className="w-3 h-3 text-amber-600/80" />
                        <p className="text-[9px] font-medium text-amber-900/80 leading-none truncate">
                            {plan.red_flag}
                        </p>
                    </div>
                )}
            </div>
        </SwipeableCard>
    );
}