'use client';

import { Plan } from '@/utils/types';
import {
    Building2,
    Baby,
    Scan,
    Pill,
    ShieldAlert,
    ChevronDown,
    Sparkles,
    CheckCircle2,
    Info,
    Wallet
} from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

interface FeedCardProps {
    plan: Plan & { price: number; savings_annual: number };
    onVerify: (name: string) => void;
    verdict?: {
        tier: 'WINNER' | 'CONTENDER' | 'RISK';
        badge: string;
        warning: string;
    };
}

export default function FeedCard({ plan, onVerify, verdict }: FeedCardProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [imgError, setImgError] = useState(false);

    if (!plan) return null;

    const schemeSlug = plan.identity.scheme_name.toLowerCase().replace(/\s+/g, '-');
    const logoPath = `/schemes-logo/${schemeSlug}.png`;

    // Helpers
    const fmt = (val: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="relative bg-white rounded-3xl border border-slate-200 shadow-lg shadow-slate-200/40 overflow-hidden">

            {/* 1. HEADER: Scheme Identity */}
            <div className="px-5 pt-5 pb-4">
                <div className="flex items-center gap-3 mb-4">
                    {/* Logo */}
                    <div className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-1.5 shrink-0">
                        {!imgError ? (
                            <Image src={logoPath} alt={plan.identity.scheme_name} width={36} height={36} className="object-contain" onError={() => setImgError(true)} />
                        ) : (
                            <span className="text-slate-900 font-black text-[10px] uppercase">{plan.identity.scheme_name.substring(0, 3)}</span>
                        )}
                    </div>
                    {/* Name & Series */}
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-black text-slate-900 leading-tight truncate">{plan.identity.plan_name}</h2>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{plan.identity.scheme_name} • {plan.identity.plan_series}</span>
                    </div>
                </div>

                {/* 2. PRICE BLOCK */}
                <div className="flex items-end justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Monthly Premium</span>
                        <div className="text-2xl font-black text-slate-900 tracking-tight leading-none" suppressHydrationWarning>
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
                <div className="mx-5 mb-4 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-4 border border-blue-100/80 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full blur-2xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-1.5 mb-2">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600 fill-current" />
                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Why this plan?</span>
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
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Hospital</span>
                        <span className="text-sm font-bold text-slate-900">{plan.coverage_rates.hospital_account}%</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Wallet className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Network</span>
                        <span className="text-sm font-bold text-slate-900 truncate block">{plan.network_restriction}</span>
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
                            <p className="text-[9px] font-bold text-amber-500 uppercase tracking-widest mb-0.5">Trade-off</p>
                            <p className="text-xs font-medium text-amber-900 leading-snug">{verdict.warning}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 6. EXPANDABLE DETAILS */}
            <div className="border-t border-slate-100 bg-slate-50/50">
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full flex items-center justify-between px-5 py-3 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors active:bg-slate-100"
                >
                    <span className="flex items-center gap-2">
                        <Info className="w-3.5 h-3.5" />
                        {showDetails ? "Hide Details" : "View Benefits"}
                    </span>
                    <ChevronDown className={clsx("w-4 h-4 transition-transform duration-200", showDetails && "rotate-180")} />
                </button>

                {showDetails && (
                    <div className="px-5 pb-5 animate-in slide-in-from-top-2 duration-200 space-y-2.5">
                        <BenefitRow
                            icon={Baby}
                            label="Maternity"
                            value={plan.defined_baskets.maternity.antenatal_consults > 0
                                ? `${plan.defined_baskets.maternity.antenatal_consults} Consults`
                                : 'No Benefit'}
                            isPositive={plan.defined_baskets.maternity.antenatal_consults > 0}
                        />
                        <BenefitRow
                            icon={Pill}
                            label="Chronic Meds"
                            value={plan.network_restriction === 'Network' ? 'Network Only' : 'Any Provider'}
                            isPositive={plan.network_restriction !== 'Network'}
                        />
                        <BenefitRow
                            icon={Scan}
                            label="MRI/CT Scans"
                            value={plan.procedure_copays.mri_scan > 0 ? `R${plan.procedure_copays.mri_scan} Co-pay` : 'Covered'}
                            isPositive={plan.procedure_copays.mri_scan === 0}
                        />

                        <div className="pt-3 mt-2 border-t border-slate-200/60">
                            <button
                                onClick={() => onVerify(plan.identity.plan_name)}
                                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 active:scale-[0.98]"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Speak to Advisor
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function BenefitRow({ icon: Icon, label, value, isPositive }: { icon: any, label: string, value: string, isPositive: boolean }) {
    return (
        <div className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-slate-100">
            <div className="flex items-center gap-2 text-slate-600">
                <Icon className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{label}</span>
            </div>
            <span className={clsx("text-xs font-bold", isPositive ? "text-slate-900" : "text-slate-400")}>
                {value}
            </span>
        </div>
    );
}