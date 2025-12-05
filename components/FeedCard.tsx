'use client';

import { useCompare, Plan } from '@/context/CompareContext';
import {
    ArrowRight,
    MapPin,
    Building2,
    Baby,
    Scan,
    Pill,
    ShieldAlert,
    Lock,
    ChevronDown,
    ChevronUp,
    MessageSquareText,
    Sparkles
} from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

interface FeedCardProps {
    plan: Plan;
    onVerify: (name: string) => void;
}

export default function FeedCard({ plan, onVerify }: FeedCardProps) {
    const { activePin, setPin } = useCompare();
    const [imgError, setImgError] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showAI, setShowAI] = useState(false);

    if (!plan) return null;

    // --- 1. Logic & Comparisons ---
    const isPinned = activePin?.id === plan.id;
    let delta = null;

    // Safe Accessors
    const price = plan.price || 0;
    const savings = plan.savings_annual || 0;
    const getEffectiveCost = (p: Plan) => (p.price || 0) - ((p.savings_annual || 0) / 12);

    if (activePin && !isPinned) {
        const pinEffective = getEffectiveCost(activePin);
        const planEffective = getEffectiveCost(plan);
        const diff = planEffective - pinEffective;

        delta = {
            val: Math.abs(diff),
            sign: diff > 0 ? '+' : '-',
            color: diff > 0 ? 'text-rose-600 bg-rose-50 border-rose-100' : 'text-emerald-600 bg-emerald-50 border-emerald-100',
            label: diff > 0 ? 'Eff. Higher' : 'Eff. Lower'
        };
    }

    const schemeName = plan.identity?.scheme_name || 'Scheme';
    const planName = plan.identity?.plan_name || 'Plan';
    const schemeSlug = schemeName.toLowerCase().replace(/\s+/g, '-');
    const logoPath = `/schemes-logo/${schemeSlug}.png`;

    // --- 2. Color Coding Logic (Network) ---
    const getNetworkBadge = (type?: string) => {
        const t = type?.toLowerCase() || '';
        if (t.includes('state')) return "bg-amber-100 text-amber-800 border-amber-200";
        if (t.includes('network') || t.includes('coastal')) return "bg-blue-50 text-blue-700 border-blue-100";
        return "bg-emerald-50 text-emerald-700 border-emerald-100"; // 'Any'
    };

    return (
        <div
            className={clsx(
                "relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden",
                isPinned ? "border-blue-500 shadow-md ring-1 ring-blue-500/20" : "border-slate-200 shadow-sm"
            )}
        >
            {/* PIN INDICATOR */}
            {isPinned && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-bl-xl z-10 uppercase tracking-widest">
                    Pinned
                </div>
            )}

            {/* THE "PIN" ACTION (Floating) */}
            <button
                onClick={(e) => { e.stopPropagation(); setPin(plan); }}
                className={clsx(
                    "absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all z-20",
                    isPinned ? "bg-blue-100 text-blue-600 opacity-0 pointer-events-none" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                )}
            >
                <MapPin className="w-4 h-4" />
            </button>

            <div className="p-4">
                {/* --- HEADER (Identity & Price) --- */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-1 shrink-0">
                            {!imgError ? (
                                <Image
                                    src={logoPath}
                                    alt={schemeName}
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <span className="text-[10px] font-black text-slate-400 uppercase">{schemeName.substring(0, 2)}</span>
                            )}
                        </div>
                        <div>
                            <h3 className="font-black text-slate-900 text-sm leading-tight mb-1">{planName}</h3>
                            <div className={clsx("inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border", getNetworkBadge(plan.network_restriction))}>
                                {plan.network_restriction === 'Any' ? <Building2 className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                                {plan.network_restriction || 'Any'}
                            </div>
                        </div>
                    </div>

                    <div className="text-right pr-8">
                        <div className="font-black text-slate-900 text-lg leading-none mb-1" suppressHydrationWarning>
                            {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(price)}
                        </div>
                        {delta && (
                            <div className={clsx("text-[9px] font-bold px-1.5 py-0.5 rounded inline-block", delta.color)}>
                                {delta.sign} R{Math.round(delta.val).toLocaleString('en-ZA')}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">

                    {/* 1. COVERAGE RATES (Segmented Control Style) */}
                    <div className="flex divide-x divide-slate-100 border border-slate-100 rounded-xl overflow-hidden bg-slate-50/30">
                        <div className="flex-1 p-2 text-center">
                            <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Hospital</p>
                            <p className="text-xs font-black text-slate-900">{plan.coverage_rates?.hospital_account}%</p>
                        </div>
                        <div className="flex-1 p-2 text-center">
                            <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Spec In</p>
                            <p className="text-xs font-black text-slate-900">{plan.coverage_rates?.specialist_in_hospital}%</p>
                        </div>
                        <div className="flex-1 p-2 text-center">
                            <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Spec Out</p>
                            <p className="text-xs font-black text-slate-900">{plan.coverage_rates?.specialist_out_hospital}%</p>
                        </div>
                    </div>

                    {/* 2. MATERNITY BASKET */}
                    <div>
                        <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                            <Baby className="w-3 h-3" /> Maternity Basket
                        </h5>
                        <div className="grid grid-cols-3 gap-2 bg-blue-50/50 p-2 rounded-xl border border-blue-100">
                            <div className="text-center">
                                <span className="block text-blue-700 font-bold text-xs">{plan.defined_baskets?.maternity?.antenatal_consults}</span>
                                <span className="text-[8px] text-blue-500 uppercase font-bold">Consults</span>
                            </div>
                            <div className="text-center border-l border-blue-200/50">
                                <span className="block text-blue-700 font-bold text-xs">{plan.defined_baskets?.maternity?.ultrasounds_2d}</span>
                                <span className="text-[8px] text-blue-500 uppercase font-bold">2D Scans</span>
                            </div>
                            <div className="text-center border-l border-blue-200/50">
                                <span className="block text-blue-700 font-bold text-xs">{plan.defined_baskets?.maternity?.paediatrician_visits}</span>
                                <span className="text-[8px] text-blue-500 uppercase font-bold">Paeds</span>
                            </div>
                        </div>
                    </div>

                    {/* ACTION ROW (Simplified) */}
                    <div className="flex items-center justify-between gap-3 p-3 mt-3 bg-slate-50 border border-slate-100 rounded-xl shadow-sm">
                        {/* 1. Network Status */}
                        <div className="flex-1 min-w-0 flex flex-col">
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Hospital Access</span>
                            <span className={clsx(
                                "text-[10px] font-black uppercase tracking-wide truncate",
                                plan.network_restriction === 'Network' ? "text-blue-700" : "text-emerald-700"
                            )}>
                                {plan.network_restriction === 'Network' ? 'Network Hospitals Only' : 'Any Private Hospital'}
                            </span>
                        </div>
                        {/* Note: The 'Select' CTA has been removed as per the pivot. The primary action is now 'Will it Pay?' */}
                    </div>

                    {/* --- ASK AI TOGGLE (Primary Lead Gen) --- */}
                    {!showAI && (
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowAI(true); }}
                            className="w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg active:scale-95 transition-all group"
                        >
                            <Sparkles className="w-4 h-4 text-amber-400 fill-current animate-pulse" />
                            <span className="text-xs font-bold">Will it pay? Ask AI</span>
                        </button>
                    )}

                    {/* --- AI SIMULATOR (Collapsible) --- */}
                    <div className={clsx(
                        "overflow-hidden transition-all duration-500 ease-in-out bg-slate-900 rounded-xl text-white",
                        showAI ? "max-h-[300px] opacity-100 mt-2" : "max-h-0 opacity-0"
                    )}>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-4">
                                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles className="w-3 h-3 text-amber-400" /> Scenario Simulator
                                </h5>
                                <button onClick={() => setShowAI(false)} className="text-slate-500 hover:text-white">
                                    <ChevronUp className="w-4 h-4" />
                                </button>
                            </div>

                            {/* MOCK CHAT INTERFACE */}
                            <div className="space-y-3">
                                <div className="bg-white/10 p-3 rounded-lg rounded-tl-none text-xs leading-relaxed border border-white/5">
                                    <p>I am your Virtual Actuary. What procedure or condition are you worried about?</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-white/5 hover:bg-white/10 p-2 rounded-lg text-[10px] text-center transition-colors border border-white/5">
                                        🏥 In-Hospital MRI
                                    </button>
                                    <button className="flex-1 bg-white/5 hover:bg-white/10 p-2 rounded-lg text-[10px] text-center transition-colors border border-white/5">
                                        🤰 C-Section Costs
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Type e.g. 'Wisdom teeth removal'..."
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pl-3 pr-10 text-xs text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
                                    />
                                    <button className="absolute right-2 top-1.5 p-1 bg-blue-600 rounded text-white hover:bg-blue-500">
                                        <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- DETAILS TOGGLE (Secondary Info) --- */}
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowDetails(!showDetails); }}
                        className="w-full flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors border-t border-dashed border-slate-100 mt-2"
                    >
                        {showDetails ? "Hide Details" : "View Co-pays & Risks"}
                        {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {/* --- COLLAPSIBLE DETAILS --- */}
                    <div className={clsx(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        showDetails ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}>
                        <div className="space-y-4 pb-2">
                            {/* 3. CO-PAYS & LIMITS */}
                            <div>
                                <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                                    <ShieldAlert className="w-3 h-3" /> Co-pays & Limits
                                </h5>
                                <div className="space-y-2">
                                    {/* MRI */}
                                    <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200">
                                        <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1"><Scan className="w-3 h-3" /> MRI Scans</span>
                                        <span className={clsx("text-xs font-bold", plan.procedure_copays?.mri_scan > 0 ? "text-rose-600" : "text-emerald-600")}>
                                            {plan.procedure_copays?.mri_scan > 0 ? `R${plan.procedure_copays.mri_scan} Pay` : 'Covered'}
                                        </span>
                                    </div>
                                    {/* Scopes */}
                                    <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200">
                                        <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> Scopes (In-H)</span>
                                        <span className={clsx("text-xs font-bold", plan.procedure_copays?.scope_in_hospital > 0 ? "text-rose-600" : "text-emerald-600")}>
                                            {plan.procedure_copays?.scope_in_hospital > 0 ? `R${plan.procedure_copays.scope_in_hospital} Pay` : 'R0 Co-pay'}
                                        </span>
                                    </div>
                                    {/* Contraceptives */}
                                    <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200">
                                        <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1"><Pill className="w-3 h-3" /> Contraceptives</span>
                                        <span className="text-xs font-bold text-slate-700">
                                            R{plan.defined_baskets?.preventative?.contraceptives} / yr
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* RED FLAG WARNING */}
                            {plan.red_flag && (
                                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 items-start">
                                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] font-bold text-amber-800 uppercase">Risk Factor</p>
                                        <p className="text-[10px] text-amber-700 leading-relaxed">{plan.red_flag}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
}