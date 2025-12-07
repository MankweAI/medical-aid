'use client';

import { useCompare, Plan } from '@/context/CompareContext';
import {
    MapPin,
    ArrowRight,
    Building2,
    Baby,
    Scan,
    Pill,
    ShieldAlert,
    Lock,
    ChevronDown,
    Sparkles,
    Trophy,
    Activity,
    MessageSquare
} from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

interface FeedCardProps {
    plan: Plan;
    onVerify: (name: string) => void;
    verdict?: {
        tier: 'WINNER' | 'CONTENDER' | 'RISK';
        badge: string;
        warning: string;
    };
}

export default function FeedCard({ plan, onVerify, verdict }: FeedCardProps) {
    const { activePin, setPin } = useCompare();
    const [imgError, setImgError] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showAI, setShowAI] = useState(false);

    if (!plan) return null;

    const isPinned = activePin?.id === plan.id;
    const price = plan.price || 0;

    const schemeName = plan.identity?.scheme_name || 'Scheme';
    const planName = plan.identity?.plan_name || 'Plan';
    const schemeSlug = schemeName.toLowerCase().replace(/\s+/g, '-');
    const logoPath = `/schemes-logo/${schemeSlug}.png`;

    return (
        <div
            className={clsx(
                "relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden",
                isPinned ? "border-blue-500 shadow-md ring-1 ring-blue-500/20" : "border-slate-200 shadow-sm",
                verdict?.tier === 'WINNER' && !isPinned ? "border-emerald-500/50 shadow-lg shadow-emerald-900/5" : ""
            )}
        >
            {/* PIN ACTION */}
            <button
                onClick={(e) => { e.stopPropagation(); setPin(plan); }}
                className={clsx(
                    "absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all z-20",
                    isPinned ? "bg-blue-100 text-blue-600 pointer-events-none" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                )}
            >
                <MapPin className="w-4 h-4" />
            </button>

            <div className="p-5">

                {/* --- HEADER --- */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center p-1 shrink-0 shadow-sm">
                            {!imgError ? (
                                <Image
                                    src={logoPath}
                                    alt={schemeName}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <span className="text-[10px] font-black text-slate-400 uppercase">{schemeName.substring(0, 2)}</span>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <h3 className="font-black text-slate-900 text-base leading-tight">{planName}</h3>
                                {plan.network_restriction === 'Any' && (
                                    <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Any Hosp</span>
                                )}
                            </div>
                            <span className="text-xs text-slate-500 font-medium">{schemeName} • {plan.identity.plan_series} Series</span>
                        </div>
                    </div>

                    <div className="text-right pr-10">
                        <div className="font-black text-slate-900 text-xl leading-none mb-1" suppressHydrationWarning>
                            {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(price)}
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">per month</span>
                    </div>
                </div>

                {/* --- ACTUARIAL VERDICT --- */}
                {verdict?.badge && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 items-start">
                        <div className="bg-white p-1.5 rounded-full shadow-sm shrink-0">
                            <Trophy className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-0.5">Virtual Actuary Insight</p>
                            <p className="text-xs font-bold text-blue-900 leading-snug">{verdict.badge}</p>
                        </div>
                    </div>
                )}

                {/* --- RISK SCANNER --- */}
                {verdict?.warning && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 items-start">
                        <div className="bg-white p-1.5 rounded-full shadow-sm shrink-0">
                            <ShieldAlert className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-0.5">Risk Exposure</p>
                            <p className="text-xs font-medium text-amber-900 leading-snug">{verdict.warning}</p>
                        </div>
                    </div>
                )}

                {/* --- KEY METRICS --- */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                        <span className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Savings</span>
                        <span className={clsx("block text-sm font-black", plan.savings_annual > 0 ? "text-emerald-600" : "text-slate-300")}>
                            {plan.savings_annual > 0 ? `R${(plan.savings_annual / 12).toFixed(0)}` : 'R0'}
                        </span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                        <span className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Rate</span>
                        <span className="block text-sm font-black text-slate-900">
                            {plan.coverage_rates.hospital_account}%
                        </span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                        <span className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Baby</span>
                        <span className={clsx("block text-sm font-black", plan.defined_baskets.maternity.antenatal_consults > 0 ? "text-blue-600" : "text-slate-300")}>
                            {plan.defined_baskets.maternity.antenatal_consults > 0 ? `${plan.defined_baskets.maternity.antenatal_consults} Visits` : 'None'}
                        </span>
                    </div>
                </div>

                {/* --- AI SIMULATOR TOGGLE (Restored & Upgraded) --- */}
                <button
                    onClick={(e) => { e.stopPropagation(); setShowAI(!showAI); }}
                    className={clsx(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group mb-2 border",
                        showAI
                            ? "bg-slate-900 text-white border-slate-900 shadow-xl"
                            : "bg-gradient-to-r from-slate-50 to-white border-slate-200 text-slate-700 hover:border-blue-300"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <Sparkles className={clsx("w-4 h-4", showAI ? "text-amber-400 fill-current animate-pulse" : "text-slate-400")} />
                        <span className="text-xs font-bold">Will it pay? Ask AI</span>
                    </div>
                    <ChevronDown className={clsx("w-4 h-4 transition-transform", showAI ? "rotate-180 text-slate-400" : "text-slate-400")} />
                </button>

                {/* --- AI SIMULATOR CONTENT --- */}
                <div className={clsx(
                    "overflow-hidden transition-all duration-500 ease-in-out bg-slate-900 text-white rounded-xl relative",
                    showAI ? "max-h-[300px] mb-4 shadow-inner" : "max-h-0"
                )}>
                    <div className="p-4 space-y-3">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scenario Simulator</p>

                        {/* Preset Scenarios */}
                        <div className="space-y-2">
                            <button className="w-full text-left bg-white/10 hover:bg-white/20 p-3 rounded-lg border border-white/5 text-xs text-slate-200 transition-colors flex justify-between items-center group">
                                <span>🏥 Knee Replacement (R150k)</span>
                                <ArrowRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </button>
                            <button className="w-full text-left bg-white/10 hover:bg-white/20 p-3 rounded-lg border border-white/5 text-xs text-slate-200 transition-colors flex justify-between items-center group">
                                <span>🤰 Emergency C-Section</span>
                                <ArrowRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </button>
                        </div>

                        {/* Custom Input */}
                        <div className="relative pt-2">
                            <input
                                type="text"
                                placeholder="Type e.g. 'Wisdom Teeth'..."
                                className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-3 pr-9 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <button className="absolute right-1 top-3 p-1.5 bg-blue-600 hover:bg-blue-500 rounded-md text-white transition-colors">
                                <MessageSquare className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- DETAILS EXPANDER --- */}
                <button
                    onClick={(e) => { e.stopPropagation(); setShowDetails(!showDetails); }}
                    className="w-full flex items-center justify-center gap-1.5 py-3 text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors border-t border-dashed border-slate-100"
                >
                    {showDetails ? "Hide Clinical Rules" : "View Co-pays & Limits"}
                    <ChevronDown className={clsx("w-3 h-3 transition-transform", showDetails && "rotate-180")} />
                </button>

                {showDetails && (
                    <div className="pt-2 animate-in slide-in-from-top-2">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 flex items-center gap-1.5"><Scan className="w-3 h-3" /> MRI Scans</span>
                                <span className={clsx("font-bold", plan.procedure_copays.mri_scan > 0 ? "text-rose-600" : "text-emerald-600")}>
                                    {plan.procedure_copays.mri_scan > 0 ? `R${plan.procedure_copays.mri_scan} Pay` : 'Covered'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 flex items-center gap-1.5"><ShieldAlert className="w-3 h-3" /> Scopes (In-H)</span>
                                <span className={clsx("font-bold", plan.procedure_copays.scope_in_hospital > 0 ? "text-rose-600" : "text-emerald-600")}>
                                    {plan.procedure_copays.scope_in_hospital > 0 ? `R${plan.procedure_copays.scope_in_hospital} Pay` : 'R0 Co-pay'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 flex items-center gap-1.5"><Pill className="w-3 h-3" /> Chronic Meds</span>
                                <span className="font-bold text-slate-700">
                                    {plan.network_restriction === 'Network' ? 'DSP Pharm Only' : 'Any Pharmacy'}
                                </span>
                            </div>
                        </div>

                        {/* THE HARD LEAD CAPTURE (Inside Details) */}
                        <button
                            onClick={(e) => { e.stopPropagation(); onVerify(plan.identity.plan_name); }}
                            className="w-full mt-4 py-3 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2"
                        >
                            Verify Network with Expert
                            <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}