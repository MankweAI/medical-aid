'use client';

import { Plan } from '@/utils/types';
import {
    Building2,
    Sparkles,
    CheckCircle2,
    ShieldAlert,
    Wallet,
    Activity,
    Zap,
    AlertTriangle,
    ShieldCheck,
    ChevronDown,
    ChevronUp
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
    isClinicalFirst?: boolean;
    humanInsight?: string;
}

/**
 * FeedCard Component
 * 
 * Displays plan information with "Actuarial Toggle" feature:
 * - Clinical_First personas: Dense math hidden by default, show human insight
 * - Price_First personas: Full analysis visible immediately
 */
export default function FeedCard({ plan, onVerify, verdict, isClinicalFirst = false, humanInsight }: FeedCardProps) {
    const [imgError, setImgError] = useState(false);
    // Actuarial Toggle: Collapsed for Price_First, Expanded for Clinical_First
    const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(!isClinicalFirst);

    if (!plan) return null;

    const schemeSlug = plan.identity.scheme_name.toLowerCase().replace(/\s+/g, '-');
    const logoPath = `/schemes-logo/${schemeSlug}.png`;
    const isWinner = verdict?.tier === 'WINNER';

    const fmt = (val: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);
    const limits = plan.limits || { oncology: { status: 'Unknown', value: 0 }, casualty: { status: 'Unknown', value: 0 } };

    // --- GAP COVER LOGIC ---
    const isGapOptional = plan.gap_cover_rating === 'Optional';
    const isGapMandatory = plan.gap_cover_rating === 'Mandatory';

    return (
        <div className={clsx(
            "relative bg-white rounded-3xl overflow-hidden transition-all h-full flex flex-col",
            isWinner
                ? "border border-emerald-200 shadow-xl shadow-emerald-200/60 border-l-4 border-l-emerald-500"
                : "border border-slate-200 shadow-lg shadow-slate-200/40"
        )}>
            {/* 1. HEADER */}
            <div className="px-5 pt-5 pb-3">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                        <div className={clsx(
                            "w-10 h-10 rounded-lg flex items-center justify-center p-1 shrink-0",
                            isWinner ? "bg-emerald-50 border border-emerald-100" : "bg-slate-50 border border-slate-100"
                        )}>
                            {!imgError ? (
                                <Image src={logoPath} alt={plan.identity.scheme_name} width={32} height={32} className="object-contain" onError={() => setImgError(true)} />
                            ) : (
                                <span className="text-slate-900 font-black text-[9px] uppercase">{plan.identity.scheme_name.substring(0, 3)}</span>
                            )}
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                                <h2 className="text-sm font-black text-slate-900 leading-none truncate">{plan.identity.plan_name}</h2>
                                {isWinner && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{plan.identity.plan_series}</span>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className={clsx("text-lg font-black leading-none", isWinner ? "text-emerald-700" : "text-slate-900")} suppressHydrationWarning>
                            {fmt(plan.price)}
                        </div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase">per month</div>
                    </div>
                </div>

                {plan.savings_annual > 0 && (
                    <div className="flex items-center gap-2 px-2.5 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100 mb-3">
                        <Wallet className="w-3 h-3 text-emerald-600" />
                        <span className="text-[10px] font-bold text-emerald-700">
                            Includes <span suppressHydrationWarning>{fmt(plan.savings_annual)}</span> savings/yr
                        </span>
                    </div>
                )}
            </div>

            {/* 2. HUMAN INSIGHT (Always visible for Clinical_First) */}
            {humanInsight && isClinicalFirst && (
                <div className="mx-4 mb-3 bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-xl p-3 border border-emerald-100/80 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-start gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-current mt-0.5 shrink-0" />
                            <p className="text-[11px] text-slate-700 font-medium leading-snug">
                                <span className="font-bold text-emerald-700 block text-[9px] uppercase tracking-wider mb-0.5">Your Strategy</span>
                                {humanInsight}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* ACTUARIAL TOGGLE BUTTON - Always Visible */}
            <div className="mx-4 mb-3">
                <button
                    onClick={() => setIsAnalysisExpanded(!isAnalysisExpanded)}
                    className={clsx(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all",
                        "border text-xs font-medium",
                        isAnalysisExpanded
                            ? "bg-slate-50 border-slate-200 text-slate-600"
                            : "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 text-emerald-700 hover:from-emerald-100 hover:to-teal-100"
                    )}
                >
                    <span className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        <span className="font-bold">{isAnalysisExpanded ? 'Hide Details' : 'View Plan Details'}</span>
                    </span>
                    <div className="flex items-center gap-2">
                        {!isAnalysisExpanded && (
                            <span className="text-[9px] font-medium text-emerald-600/70 uppercase tracking-wide hidden sm:inline">
                                Stats • Limits • Risks
                            </span>
                        )}
                        {isAnalysisExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </div>
                </button>
            </div>

            {/* COLLAPSIBLE ANALYSIS SECTION - Redesigned */}
            <div className={clsx(
                "transition-all duration-300 ease-in-out overflow-hidden",
                isAnalysisExpanded ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0"
            )}>
                {/* KEY COVERAGE STATS - Redesigned Grid */}
                <div className="mx-4 mb-3">
                    <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                            <ShieldCheck className="w-3 h-3" />
                            Coverage Snapshot
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            <StatBox
                                label="Hospital Rate"
                                value={`${plan.coverage_rates.hospital_account}%`}
                                icon={Building2}
                                color="emerald"
                            />
                            <StatBox
                                label="Oncology"
                                value={limits.oncology.status === 'Unlimited' ? 'Unlimited' : limits.oncology.value > 0 ? fmt(limits.oncology.value) : 'PMB Only'}
                                icon={Activity}
                                color={isClinicalFirst ? "emerald" : "blue"}
                                highlight={isClinicalFirst}
                            />
                            <StatBox
                                label="Provider Choice"
                                value={plan.network_restriction}
                                icon={Wallet}
                                color={isClinicalFirst ? "emerald" : "slate"}
                                highlight={isClinicalFirst}
                            />
                            <StatBox
                                label="ER/Casualty"
                                value={limits.casualty.status === 'No Benefit' ? 'No Benefit' : limits.casualty.value > 0 ? `R${limits.casualty.value}` : 'Savings'}
                                icon={Zap}
                                color={limits.casualty.status === 'No Benefit' ? 'rose' : 'slate'}
                            />
                        </div>
                    </div>
                </div>

                {/* GAP COVER ASSESSMENT */}
                <div className="mx-4 mb-3">
                    <div className={clsx(
                        "p-3 rounded-xl border flex items-start gap-3 transition-colors",
                        isGapMandatory ? "bg-rose-50 border-rose-200" :
                            isGapOptional ? "bg-emerald-50 border-emerald-200" :
                                "bg-blue-50 border-blue-200"
                    )}>
                        <div className={clsx(
                            "p-2 rounded-lg shrink-0",
                            isGapMandatory ? "bg-rose-100 text-rose-600" :
                                isGapOptional ? "bg-emerald-100 text-emerald-600" :
                                    "bg-blue-100 text-blue-600"
                        )}>
                            {isGapOptional ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2 mb-1">
                                <span className={clsx(
                                    "text-xs font-bold",
                                    isGapMandatory ? "text-rose-700" :
                                        isGapOptional ? "text-emerald-700" :
                                            "text-blue-700"
                                )}>
                                    Gap Cover: {plan.gap_cover_rating}
                                </span>
                                <span className={clsx(
                                    "text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide",
                                    isGapMandatory ? "bg-rose-100 text-rose-600" :
                                        isGapOptional ? "bg-emerald-100 text-emerald-600" :
                                            "bg-blue-100 text-blue-600"
                                )}>
                                    {isGapMandatory ? 'High Risk' : isGapOptional ? 'Low Risk' : 'Moderate'}
                                </span>
                            </div>
                            <p className={clsx(
                                "text-[11px] leading-relaxed",
                                isGapMandatory ? "text-rose-800" :
                                    isGapOptional ? "text-emerald-800" :
                                        "text-blue-800"
                            )}>
                                {isGapMandatory
                                    ? "Plan pays at 100% tariff. Specialists often charge 200-300%. Budget for significant shortfalls."
                                    : isGapOptional
                                        ? "Plan covers at 200%+ tariff. Most specialist fees are covered. Low out-of-pocket risk."
                                        : "Consider gap cover to protect against co-payments and sub-limit shortfalls."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* RISK WARNING - Enhanced */}
                {verdict?.warning && (
                    <div className="mx-4 mb-3">
                        <div className="p-3 bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200 rounded-xl flex gap-3 items-start">
                            <div className="p-2 rounded-lg bg-amber-100 text-amber-600 shrink-0">
                                <ShieldAlert className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">
                                    Important: Know Before You Join
                                </p>
                                <p className="text-xs font-medium text-amber-900 leading-relaxed">{verdict.warning}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 6. FOOTER - REDESIGNED BUTTON */}
            <div className="p-4 mt-2 border-t border-slate-100/50">
                <button
                    onClick={onVerify}
                    className={clsx(
                        "w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]",
                        isWinner
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200"
                            : "bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-emerald-700"
                    )}
                >
                    <ShieldCheck className={clsx("w-4 h-4", isWinner ? "text-emerald-100" : "text-emerald-600")} />
                    Check Your Coverage
                </button>
            </div>
        </div>
    );
}

function StatBox({ label, value, icon: Icon, color, highlight = false }: { label: string, value: string, icon: any, color: string, highlight?: boolean }) {
    const colors = {
        emerald: "text-emerald-500",
        blue: "text-blue-500",
        slate: "text-slate-400",
        rose: "text-rose-500"
    };

    return (
        <div className={clsx(
            "flex flex-col justify-center px-3 py-2 rounded-xl border transition-colors",
            highlight
                ? "bg-emerald-50 border-emerald-200"
                : "bg-slate-50 border-slate-100"
        )}>
            <div className="flex items-center gap-1.5 mb-0.5">
                <Icon className={clsx("w-3 h-3", colors[color as keyof typeof colors] || colors.slate)} />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
            </div>
            <span className={clsx("text-xs font-bold truncate", highlight ? "text-emerald-700" : "text-slate-900")}>{value}</span>
        </div>
    );
}