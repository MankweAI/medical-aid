// components/risk/HospitalBillInvoice.tsx
'use client';

import React, { useState } from 'react';
import {
    ShieldCheck,
    Receipt,
    ArrowDownRight,
    ChevronDown,
    ChevronRight,
    Activity,
    Stethoscope,
    Scissors,
    ArrowRight
} from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

interface PlanOption {
    name: string;
    slug: string;
    liability: number;
    isCurrent: boolean;
}

interface InvoiceProps {
    procedure: any;
    plan: any;
    liability: number;
    planOptions: PlanOption[];
    procedureSlug: string;
}

const formatZAR = (n: number) =>
    new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        maximumFractionDigits: 0
    }).format(n);

export function HospitalBillInvoice({ procedure, plan, liability, planOptions, procedureSlug }: InvoiceProps) {
    const isClean = liability === 0;
    const [expandedRisk, setExpandedRisk] = useState<string | null>(null);
    const [isPlanSwitcherOpen, setIsPlanSwitcherOpen] = useState(false);

    const audit = React.useMemo(() => ({
        id: `AUTH-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        base: procedure?.base_cost_estimate ?? 0,
        scheme: Math.max(0, (procedure?.base_cost_estimate ?? 0) - liability),
        risks: [
            { id: '1', title: "Surgeon's Fee Gap", risk: "Critical", detail: "Specialists typically charge 300% of scheme rates. Gap cover is essential here.", icon: Scissors },
            { id: '2', title: "Anaesthetist Billing", risk: "High", detail: "Often billed outside of hospital authorization. Verify payment arrangements.", icon: Stethoscope },
            { id: '3', title: "Internal Prosthetics", risk: "Variable", detail: "Brand-specific limits (e.g. R30k for joints) may apply.", icon: Activity }
        ]
    }), [procedure, liability]);

    return (
        <div className="px-4">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col">

                {/* 1. AUTHORITY HEADER */}
                <div className="p-8 pb-6 flex justify-between items-start">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-emerald-600 mb-1">
                            <ShieldCheck className="w-4 h-4 fill-emerald-50" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Audit</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">
                            Financial Clearance
                        </h1>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Audit Ref</p>
                        <p className="text-xs font-mono font-bold text-slate-500">{audit.id}</p>
                    </div>
                </div>

                {/* 2. PRIMARY LEDGER: VERTICAL VALUE STACK */}
                <div className="px-8 space-y-4">

                    {/* HOSPITAL BASE RATE BOX */}
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-3 transition-all">
                        <div className="flex items-center gap-2">
                            <Receipt className="w-4 h-4 text-slate-400" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hospital Base Rate</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-bold text-slate-700 leading-tight mb-1">{procedure?.label ?? 'Procedure'}</p>
                            {/* LARGE FONT AMOUNT BELOW TITLE */}
                            <p className="text-3xl font-black text-slate-900 tracking-tight">
                                {formatZAR(audit.base)}
                            </p>
                        </div>
                    </div>

                    {/* SCHEME ROW: THE DROPDOWN TRIGGER (VERTICAL VALUE STACK) */}
                    <div className="space-y-2">
                        <button
                            onClick={() => setIsPlanSwitcherOpen(!isPlanSwitcherOpen)}
                            className="w-full p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 hover:bg-emerald-100/50 transition-all group flex flex-col gap-3"
                        >
                            <div className="w-full flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <ArrowDownRight className={clsx("w-4 h-4 text-emerald-600 transition-transform", isPlanSwitcherOpen && "rotate-90")} />
                                    <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Scheme Settlement</p>
                                </div>
                                <ChevronDown className={clsx("w-4 h-4 text-emerald-400 transition-transform duration-300", isPlanSwitcherOpen && "rotate-180")} />
                            </div>

                            <div className="text-left flex flex-col">
                                <p className="text-sm font-bold text-emerald-800 leading-tight mb-1">{plan?.plan_name ?? 'Scheme Cover'}</p>
                                {/* LARGE FONT AMOUNT BELOW TITLE */}
                                <p className="text-3xl font-black text-emerald-600 tracking-tight">
                                    - {formatZAR(audit.scheme)}
                                </p>
                            </div>
                        </button>

                        {/* PLAN SWITCHER DROPDOWN: SEO-FRIENDLY INTERLINKING */}
                        {isPlanSwitcherOpen && (
                            <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-lg animate-in slide-in-from-top-2 duration-200">
                                <div className="p-3 bg-emerald-50/30 border-b border-emerald-50 text-center">
                                    <p className="text-[8px] font-black text-emerald-600 uppercase tracking-[0.2em]">Compare Impact of other 2026 plans</p>
                                </div>
                                <div className="max-h-60 overflow-y-auto no-scrollbar">
                                    {planOptions.filter(o => !o.isCurrent).map((opt) => (
                                        <Link
                                            key={opt.slug}
                                            href={`/risk/${procedureSlug}/${opt.slug}`}
                                            className="flex items-center justify-between p-4 hover:bg-emerald-50 transition-colors border-b border-slate-50 last:border-0 group"
                                        >
                                            <div>
                                                <p className="text-xs font-bold text-slate-700 leading-none mb-1">{opt.name}</p>
                                                <p className={clsx("text-[9px] font-black uppercase tracking-tight", opt.liability === 0 ? "text-emerald-600" : "text-rose-500")}>
                                                    {opt.liability === 0 ? "100% Covered" : `${formatZAR(opt.liability)} Shortfall`}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-black text-emerald-600 italic">-{formatZAR(audit.base - opt.liability)}</span>
                                                <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. INTEGRATED GAP AUDIT: GROUNDING ANXIETY */}
                <div className="px-8 mt-10 space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 mb-2">Technical Risk Points</p>
                    {audit.risks.map((item) => (
                        <div key={item.id} className="bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden">
                            <button
                                onClick={() => setExpandedRisk(expandedRisk === item.id ? null : item.id)}
                                className="w-full flex items-center justify-between p-4 text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={clsx("p-2 rounded-lg", expandedRisk === item.id ? "bg-emerald-100 text-emerald-600" : "bg-white text-slate-400")}>
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="block text-[11px] font-black text-slate-700 uppercase tracking-tight">{item.title}</span>
                                        <span className="text-[9px] font-bold text-rose-500 uppercase tracking-tighter">{item.risk} Risk</span>
                                    </div>
                                </div>
                                <ChevronRight className={clsx("w-4 h-4 transition-transform", expandedRisk === item.id && "rotate-90 text-emerald-500")} />
                            </button>
                            {expandedRisk === item.id && (
                                <div className="px-4 pb-4 animate-in slide-in-from-top-1">
                                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic px-2 border-l-2 border-emerald-200 ml-4">
                                        "{item.detail}"
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 4. FINAL PAYOFF: THE EMOTIONAL RESOLUTION */}
                <div className="p-8 pt-12">
                    <div className={`p-8 rounded-[2rem] relative overflow-hidden shadow-2xl ${isClean ? 'bg-emerald-600 shadow-emerald-200' : 'bg-slate-900 shadow-slate-300'
                        }`}>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em] mb-2">Total Due Today</p>
                            <h2 className="text-6xl font-black text-white tracking-tighter mb-4">{formatZAR(liability)}</h2>
                            <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                                    {isClean ? 'Fully Cleared' : 'Shortfall Detected'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="pb-8 text-center text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                    Authorized for 2026 Benefit Year • Ref: {audit.id}
                </p>
            </div>
        </div>
    );
}