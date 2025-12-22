// components/risk/HiddenGapAudit.tsx
'use client';
import React, { useState } from 'react';
import { ChevronRight, Activity, Stethoscope, Scissors } from 'lucide-react';
import clsx from 'clsx';

export function HiddenGapAudit() {
    const [expanded, setExpanded] = useState<string | null>(null);

    const risks = [
        { id: '1', title: "Surgeon's Fee Gap", risk: "Critical", detail: "Specialists typically charge 300% of Discovery rates. Gap cover is essential here.", icon: Scissors },
        { id: '2', title: "Anaesthetist Billing", risk: "High", detail: "Often billed outside of the hospital authorization path. Check payment arrangements.", icon: Stethoscope },
        { id: '3', title: "Internal Prosthetics", risk: "Dynamic", detail: "Specific brand limits (e.g. R30,000 for hip joints) may apply depending on surgeon choice.", icon: Activity }
    ];

    return (
        <div className="space-y-3">
            {risks.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm transition-all duration-300">
                    <button
                        onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                        className={clsx(
                            "w-full flex items-center justify-between p-5 transition-all",
                            expanded === item.id ? "bg-slate-50" : "hover:bg-slate-50"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className={clsx("p-2 rounded-xl", expanded === item.id ? "bg-emerald-100 text-emerald-600" : "bg-slate-50 text-slate-400")}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <span className={clsx("block text-sm font-black tracking-tight", expanded === item.id ? "text-emerald-900" : "text-slate-700")}>
                                    {item.title}
                                </span>
                                <span className="text-[10px] font-black text-rose-500 uppercase tracking-tighter">Status: {item.risk} Risk</span>
                            </div>
                        </div>
                        <ChevronRight className={clsx("w-5 h-5 transition-transform duration-300", expanded === item.id ? "rotate-90 text-emerald-500" : "text-slate-300")} />
                    </button>
                    <div className={clsx("grid transition-all duration-300 ease-out", expanded === item.id ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                        <div className="overflow-hidden">
                            <div className="p-5 pt-0">
                                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                                    <p className="text-sm font-medium text-emerald-900 leading-relaxed italic">
                                        "{item.detail}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}