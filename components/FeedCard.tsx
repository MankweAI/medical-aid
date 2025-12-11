'use client';

import { Plan } from '@/utils/types';
import {
    Building2,
    Sparkles,
    CheckCircle2,
    ShieldAlert,
    Wallet,
    Phone
} from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

interface FeedCardProps {
    plan: Plan;
    onVerify: () => void;
    verdict?: {
        tier: 'WINNER' | 'CONTENDER' | 'RISK';
        badge: string;
        warning: string;
    };
}

export default function FeedCard({ plan, onVerify, verdict }: FeedCardProps) {
    const [imgError, setImgError] = useState(false);

    if (!plan) return null;

    const schemeSlug = plan.identity.scheme_name.toLowerCase().replace(/\s+/g, '-');
    const logoPath = `/schemes-logo/${schemeSlug}.png`;
    const isWinner = verdict?.tier === 'WINNER';

    // Helper
    const fmt = (val: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    return (
        <div className={clsx(
            "relative bg-white rounded-3xl overflow-hidden transition-all",
            isWinner
                ? "border border-emerald-200 shadow-xl shadow-emerald-200/60 border-l-4 border-l-emerald-500"
                : "border border-slate-200 shadow-lg shadow-slate-200/40"
        )}>
            {/* 1. HEADER: Scheme Identity */}
            <div className="px-5 pt-5 pb-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className={clsx(
                        "w-11 h-11 rounded-xl flex items-center justify-center p-1.5 shrink-0",
                        isWinner ? "bg-emerald-50 border border-emerald-100" : "bg-slate-50 border border-slate-100"
                    )}>
                        {!imgError ? (
                            <Image src={logoPath} alt={plan.identity.scheme_name} width={36} height={36} className="object-contain" onError={() => setImgError(true)} />
                        ) : (
                            <span className="text-slate-900 font-black text-[10px] uppercase">{plan.identity.scheme_name.substring(0, 3)}</span>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black text-slate-900 leading-tight truncate">{plan.identity.plan_name}</h2>
                            {isWinner && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-bold rounded-full uppercase tracking-wider shrink-0">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Best Match
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{plan.identity.scheme_name} • {plan.identity.plan_series}</span>
                    </div>
                </div>

                {/* 2. PRICE BLOCK */}
                <div className="flex items-end justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Monthly Premium</span>
                        <div className={clsx(
                            "text-2xl font-black tracking-tight leading-none",
                            isWinner ? "text-emerald-700" : "text-slate-900"
                        )} suppressHydrationWarning>
                            {fmt(plan.price)}
                        </div>
                    </div>
                    {plan.savings_annual > 0 && (
                        <div className="text-right">
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-0.5">Annual Savings</span>
                            <div className="text-base font-black text-emerald-700 leading-none" suppressHydrationWarning>
                                {fmt(plan.savings_annual)}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. INSIGHT ENGINE (Why this plan?) */}
            {verdict?.badge && (
                <div className="mx-5 mb-4 bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl p-4 border border-emerald-100/80 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200/30 rounded-full blur-2xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-1.5 mb-2">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-current" />
                            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Actuarial Verdict</span>
                        </div>
                        <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                            {verdict.badge}
                        </p>
                    </div>
                </div>
            )}

            {/* 4. QUICK STATS */}
            <div className="grid grid-cols-2 gap-2 mx-5 mb-4">
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Building2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div className="min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Hospital</span>
                        <span className="text-xs font-bold text-slate-900">{plan.coverage_rates.hospital_account}%</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Wallet className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div className="min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Network</span>
                        <span className="text-xs font-bold text-slate-900 truncate block">{plan.network_restriction}</span>
                    </div>
                </div>
            </div>

            {/* 5. TRADE-OFF WARNING */}
            {verdict?.warning && (
                <div className="mx-5 mb-4">
                    <div className="p-3 bg-amber-50/80 border border-amber-100 rounded-xl flex gap-2.5 items-start">
                        <div className="bg-white p-1 rounded-full shadow-sm shrink-0 mt-0.5">
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest mb-0.5">Risk Warning</p>
                            <p className="text-xs font-medium text-amber-900 leading-snug">{verdict.warning}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 6. STATIC ACTION FOOTER (Merged from Expandable) */}
            <div className="border-t border-slate-100 bg-slate-50/50 p-4">
                <button
                    onClick={onVerify}
                    className="w-full py-3 bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
                >
                    <Phone className="w-3.5 h-3.5" />
                    Verify with Specialist
                </button>
            </div>
        </div>
    );
}