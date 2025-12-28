'use client';

import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Wallet } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

interface PlanOption {
    name: string;
    slug: string;
    liability: number;
    isCurrent: boolean;
}

interface Props {
    currentPlanName: string;
    procedureSlug: string;
    options: PlanOption[];
}

export default function PlanSwitcherToggle({ currentPlanName, procedureSlug, options }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const formatZAR = (n: number) =>
        new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(n);

    return (
        <div className="relative w-full mt-4 animate-in fade-in slide-in-from-top-4 duration-500">
            {/* THE TOGGLE BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all group"
            >
                <div className="text-left">
                    <p className="text-[9px] font-black text-emerald-200 uppercase tracking-widest leading-none mb-1">Current Strategy</p>
                    <p className="text-sm font-bold text-white">{currentPlanName}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-white/60 uppercase tracking-tighter">Compare Plans</span>
                    <ChevronDown className={clsx("w-4 h-4 text-white transition-transform duration-300", isOpen && "rotate-180")} />
                </div>
            </button>

            {/* THE DROPDOWN: FINANCIAL IMPLICATIONS */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden z-[100] animate-in zoom-in-95 duration-200">
                    <div className="p-4 bg-slate-50 border-b border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Plan Impact Audit</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto no-scrollbar">
                        {options.map((opt) => (
                            <Link
                                key={opt.slug}
                                href={`/risk/${procedureSlug}/${opt.slug}`}
                                className={clsx(
                                    "flex items-center justify-between p-5 hover:bg-emerald-50 transition-colors border-b border-slate-50 last:border-0 group",
                                    opt.isCurrent && "bg-emerald-50/50 pointer-events-none"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={clsx(
                                        "p-2 rounded-xl",
                                        opt.isCurrent ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-white"
                                    )}>
                                        <Wallet className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 leading-none mb-1">{opt.name}</p>
                                        <p className={clsx(
                                            "text-[10px] font-black uppercase tracking-tight",
                                            opt.liability === 0 ? "text-emerald-600" : "text-rose-500"
                                        )}>
                                            {opt.liability === 0 ? "100% Covered" : `R${opt.liability.toLocaleString()} Shortfall`}
                                        </p>
                                    </div>
                                </div>
                                {!opt.isCurrent && <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}