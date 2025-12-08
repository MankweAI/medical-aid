'use client';

import { useCompare } from '@/context/CompareContext';
import { RankedPlan } from './FocusFeed';
import {
    MapPin, ShieldAlert, Sparkles, ChevronDown,
    ArrowRight, Scan, Pill
} from 'lucide-react';
import PlanDetails from '@/components/PlanDetails';
import clsx from 'clsx';
import { useState } from 'react';
import Image from 'next/image';

interface StageCardProps {
    plan: RankedPlan;
    onVerify: (name: string) => void;
}

export default function StageCard({ plan, onVerify }: StageCardProps) {
    const { activePin, setPin } = useCompare();
    const [showAI, setShowAI] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const isPinned = activePin?.id === plan.id;
    const logoPath = `/schemes-logo/${plan.identity.scheme_name.toLowerCase().replace(/\s+/g, '-')}.png`;

    // Dynamic Theme Styles
    const themeStyles = {
        emerald: "border-emerald-400 shadow-emerald-900/10",
        amber: "border-amber-400 shadow-amber-900/10", // Yellow Border
        rose: "border-rose-300 shadow-rose-900/5",
        blue: "border-blue-300 shadow-blue-900/5",
        slate: "border-slate-200 shadow-slate-200/50"
    };

    const badgeStyles = {
        emerald: "bg-emerald-100 text-emerald-700",
        amber: "bg-amber-100 text-amber-800",
        rose: "bg-rose-100 text-rose-700",
        blue: "bg-blue-100 text-blue-700",
        slate: "bg-slate-100 text-slate-600"
    };

    const activeTheme = themeStyles[plan.visualTheme];
    const activeBadge = badgeStyles[plan.visualTheme];

    return (
        <div className={clsx(
            "relative bg-white rounded-[32px] border-2 transition-all duration-500 overflow-hidden shadow-xl",
            activeTheme
        )}>

            {/* COLOR STRIP */}
            <div className={clsx(
                "absolute top-0 left-0 right-0 h-1.5",
                plan.visualTheme === 'emerald' ? "bg-emerald-500" :
                    plan.visualTheme === 'amber' ? "bg-amber-500" :
                        plan.visualTheme === 'rose' ? "bg-rose-500" :
                            plan.visualTheme === 'blue' ? "bg-blue-500" : "bg-slate-200"
            )} />

            <div className="p-6 md:p-8">

                {/* 1. HEADER */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center p-2 shadow-sm">
                            <Image src={logoPath} alt={plan.identity.scheme_name} width={48} height={48} className="object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                        </div>
                        <div>
                            <span className={clsx(
                                "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md mb-1 inline-block",
                                activeBadge
                            )}>
                                {plan.verdict.badge || 'Standard Plan'}
                            </span>
                            <h2 className="text-2xl font-black text-slate-900 leading-none">{plan.identity.plan_name}</h2>
                        </div>
                    </div>

                    <button
                        onClick={() => setPin(plan)}
                        className={clsx(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90",
                            isPinned ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                        )}
                    >
                        <MapPin className="w-5 h-5" />
                    </button>
                </div>

                {/* 2. BIG NUMBER */}
                <div className="mb-8 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900 tracking-tight">
                        {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(plan.financials.monthlyPremium)}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase">/ month</span>
                </div>

                {/* 3. WARNINGS */}
                {plan.risks.length > 0 && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex gap-3">
                        <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
                        <div>
                            <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
                                {plan.risks[0].warning}
                            </h4>
                            <p className="text-xs text-rose-600 leading-relaxed font-medium">
                                {plan.risks[0].details}
                            </p>
                        </div>
                    </div>
                )}

                {/* 4. STATS */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Savings</p>
                        <p className="text-lg font-black text-emerald-600">R{plan.financials.savings.annualAllocation.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Hospital</p>
                        <p className="text-lg font-black text-slate-900">{plan.coverage_rates.hospital_account}%</p>
                    </div>
                </div>

                {/* 5. INTERACTIVE */}
                <div className="space-y-3">
                    <button
                        onClick={() => setShowAI(!showAI)}
                        className="w-full flex items-center justify-between p-4 bg-slate-900 text-white rounded-2xl shadow-lg active:scale-[0.98] transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                            <span className="font-bold text-sm">Will it pay? Ask AI</span>
                        </div>
                        <ChevronDown className={clsx("w-4 h-4 transition-transform", showAI && "rotate-180")} />
                    </button>

                    {showAI && (
                        <div className="p-4 bg-slate-100 rounded-2xl animate-in slide-in-from-top-2">
                            <div className="space-y-2">
                                <button className="w-full text-left bg-white p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 flex justify-between">
                                    <span>Does it cover C-Sections?</span>
                                    <ArrowRight className="w-3 h-3 text-slate-400" />
                                </button>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="w-full py-4 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-2xl transition-all"
                    >
                        {showDetails ? "Hide Full Benefit Breakdown" : "View Full Benefit Breakdown"}
                    </button>

                    {showDetails && (
                        <div className="animate-in fade-in slide-in-from-bottom-4">
                            <PlanDetails plan={plan} />
                            <button
                                onClick={() => onVerify(plan.identity.plan_name)}
                                className="w-full mt-6 py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg active:scale-95 flex items-center justify-center gap-2"
                            >
                                Get Official Quote
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}