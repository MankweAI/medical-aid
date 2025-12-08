'use client';

import { Plan } from '@/utils/types';
import {
    MapPin,
    ArrowRight,
    Building2,
    Baby,
    Scan,
    Pill,
    ShieldAlert,
    ChevronDown,
    Sparkles,
    CheckCircle2,
    Info,
    CreditCard
} from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

interface FeedCardProps {
    plan: Plan & { price: number; savings_annual: number }; // Extended type for computed values
    onVerify: (name: string) => void;
    verdict?: {
        tier: 'WINNER' | 'CONTENDER' | 'RISK';
        badge: string; // Now contains the Actuarial Rationale
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
        <div className="relative bg-white rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">

            {/* 1. HERO SECTION: Identity & Price */}
            <div className="p-6 pb-0">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center p-2 shadow-sm">
                            {!imgError ? (
                                <Image src={logoPath} alt={plan.identity.scheme_name} width={48} height={48} className="object-contain" onError={() => setImgError(true)} />
                            ) : (
                                <span className="text-slate-900 font-black text-xs uppercase">{plan.identity.scheme_name.substring(0, 3)}</span>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-2xl font-black text-slate-900 leading-none">{plan.identity.plan_name}</h2>
                            </div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{plan.identity.plan_series} Series</span>
                        </div>
                    </div>

                    {/* Big Price Tag */}
                    <div className="text-right">
                        <div className="text-3xl font-black text-slate-900 tracking-tight" suppressHydrationWarning>
                            {fmt(plan.price)}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">per month</div>
                    </div>
                </div>

                {/* 2. THE INSIGHT ENGINE (The "Immediate Value") */}
                {verdict?.badge && (
                    <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 mb-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-blue-600 fill-current" />
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Why this plan?</span>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                {verdict.badge}
                            </p>
                        </div>
                    </div>
                )}

                {/* 3. CORE BENEFITS GRID */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {/* Savings Benefit */}
                    <div className={clsx(
                        "p-4 rounded-2xl border flex flex-col justify-center",
                        plan.savings_annual > 0 ? "bg-emerald-50/50 border-emerald-100" : "bg-slate-50 border-slate-100"
                    )}>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <CreditCard className="w-3 h-3" /> Annual Savings
                        </span>
                        <span className={clsx("text-lg font-black", plan.savings_annual > 0 ? "text-emerald-700" : "text-slate-400")}>
                            {plan.savings_annual > 0 ? fmt(plan.savings_annual) : 'No Savings'}
                        </span>
                    </div>

                    {/* Hospital Benefit */}
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Building2 className="w-3 h-3" /> Hospital Cover
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-black text-slate-900">{plan.coverage_rates.hospital_account}%</span>
                            <span className="text-[10px] font-bold text-slate-500">{plan.network_restriction}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. THE TRADE-OFF (Risk Disclosure) */}
            {verdict?.warning && (
                <div className="px-6 pb-6">
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 items-start">
                        <div className="bg-white p-1.5 rounded-full shadow-sm shrink-0 mt-0.5">
                            <ShieldAlert className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">Critical Trade-off</p>
                            <p className="text-xs font-bold text-amber-900 leading-snug">{verdict.warning}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 5. EXPANDABLE DETAILS */}
            <div className="border-t border-slate-100 bg-slate-50/50">
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full flex items-center justify-between px-6 py-4 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                    <span className="flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        {showDetails ? "Hide Benefits" : "View Benefit Breakdown"}
                    </span>
                    <ChevronDown className={clsx("w-4 h-4 transition-transform", showDetails && "rotate-180")} />
                </button>

                {showDetails && (
                    <div className="px-6 pb-6 animate-in slide-in-from-top-2 space-y-3">

                        {/* Maternity Row */}
                        <BenefitRow
                            icon={Baby}
                            label="Maternity Basket"
                            value={plan.defined_baskets.maternity.antenatal_consults > 0
                                ? `${plan.defined_baskets.maternity.antenatal_consults} Consults`
                                : 'No Benefit'}
                            isPositive={plan.defined_baskets.maternity.antenatal_consults > 0}
                        />

                        {/* Chronic Row */}
                        <BenefitRow
                            icon={Pill}
                            label="Chronic Meds"
                            value={plan.network_restriction === 'Network' ? 'Designated Provider Only' : 'Any Pharmacy'}
                            isPositive={plan.network_restriction !== 'Network'}
                        />

                        {/* Scans Row */}
                        <BenefitRow
                            icon={Scan}
                            label="MRI / CT Scans"
                            value={plan.procedure_copays.mri_scan > 0 ? `R${plan.procedure_copays.mri_scan} Co-pay` : '100% Covered'}
                            isPositive={plan.procedure_copays.mri_scan === 0}
                        />

                        <div className="pt-4 mt-4 border-t border-slate-200/50">
                            <button
                                onClick={() => onVerify(plan.identity.plan_name)}
                                className="w-full py-3 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-600 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Verify availability with Broker
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
        <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-500">
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
            </div>
            <span className={clsx("font-bold", isPositive ? "text-slate-900" : "text-slate-400")}>
                {value}
            </span>
        </div>
    );
}