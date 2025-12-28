// components/risk/HospitalBillInvoice.tsx
'use client';

import React, { useState } from 'react';
import {
    ShieldCheck,
    Receipt,
    ArrowDownRight,
    ChevronDown,
    ChevronUp,
    ChevronRight,
    Activity,
    Stethoscope,
    AlertTriangle,
    ArrowRight,
    Building2,
    BedDouble,
    User,
    AlertOctagon,
    Info
} from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { RiskAudit } from '@/types/schemes/discovery';

interface PlanOption {
    id: string;
    name: string;
    liability: number;
    isCurrent: boolean;
    slug: string;
}

interface InvoiceProps {
    audit: RiskAudit;
    planOptions: PlanOption[];
    procedureSlug: string;
}

const formatZAR = (n: number) =>
    new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        maximumFractionDigits: 0
    }).format(n);

// --- STATIC DATA: PLAIN LANGUAGE EXPLANATIONS ---
const LOCATION_DETAILS = {
    rooms: {
        title: "Doctor's Rooms",
        icon: User,
        desc: "Performed directly in your specialist's consulting rooms. This is usually the most affordable option as there are no hospital facility fees.",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-100"
    },
    day_clinic: {
        title: "Day Surgery Network",
        icon: Building2,
        desc: "Performed in a dedicated Day Clinic. This is the Scheme's preferred setting for scopes. It balances safety with cost-efficiency.",
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-100"
    },
    hospital_network: {
        title: "Acute Hospital (Network)",
        icon: BedDouble,
        desc: "Admission to a full acute hospital. Discovery charges a higher deductible here because hospital facility fees are significantly more expensive than day clinics.",
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-100"
    },
    hospital_non_network: {
        title: "Non-Network Hospital",
        icon: AlertOctagon,
        desc: "Admission to a hospital outside of your plan's network. This triggers the maximum penalty (Deductible + Co-payment). Avoid this unless it is a medical emergency.",
        color: "text-rose-600",
        bg: "bg-rose-50",
        border: "border-rose-100"
    }
};

const generateRiskItems = (audit: RiskAudit) => {
    const risks = [];

    // 1. Clinical Notes
    if (audit.procedure.risk_notes) {
        risks.push({
            id: 'clinical',
            title: 'Clinical Guide',
            risk: 'Medium',
            icon: Stethoscope,
            detail: audit.procedure.risk_notes
        });
    }

    // 2. Network Restrictions
    if (audit.plan.network_type !== 'any') {
        risks.push({
            id: 'network',
            title: `${audit.plan.network_type} Network`,
            risk: 'High',
            icon: Activity,
            detail: `You must use a ${audit.plan.network_type.toUpperCase()} network hospital. Voluntary use of a non-network facility triggers a R${formatZAR(audit.plan.deductibles.penalty_non_network)} penalty.`
        });
    }

    // 3. Specific Surgical Overrides
    const d = audit.plan.deductibles;
    const pid = audit.procedure.id;

    let overrideAmount = undefined;
    if (pid === 'hip-replacement') overrideAmount = d.hip_replacement_penalty;
    else if (pid === 'knee-replacement') overrideAmount = d.knee_replacement_penalty;
    else if (pid === 'cataract-surgery') overrideAmount = d.cataract_penalty;
    else if (pid === 'spinal-surgery') overrideAmount = d.spinal_surgery_penalty;
    else if (pid === 'tonsillectomy') overrideAmount = d.tonsillectomy_penalty;
    else if (pid === 'caesarean-section') overrideAmount = d.caesarean_section_penalty;
    else if (pid === 'dental-surgery') overrideAmount = d.dental_penalty;

    if (overrideAmount !== undefined && overrideAmount > 0) {
        risks.push({
            id: 'override',
            title: 'Procedure Penalty',
            risk: 'Severe',
            icon: AlertTriangle,
            detail: `This procedure carries a mandatory upfront payment of ${formatZAR(overrideAmount)} on the ${audit.plan.plan_name} plan.`
        });
    }

    return risks;
};

export function HospitalBillInvoice({ audit, planOptions, procedureSlug }: InvoiceProps) {
    const isClean = audit.liability === 0;
    const [expandedRisk, setExpandedRisk] = useState<string | null>(null);
    const [isPlanSwitcherOpen, setIsPlanSwitcherOpen] = useState(false);

    // State for the new Scope Matrix
    const [expandedLocation, setExpandedLocation] = useState<string | null>(null);

    const calculatedRisks = generateRiskItems(audit);
    const auditRef = `${audit.plan.plan_id.substring(0, 4)}-${audit.procedure.id.substring(0, 3)}`.toUpperCase();

    // EXTRACT SCOPE MATRIX
    const variants = audit.breakdown.scope_variants;
    const isCombo = audit.procedure.scope_complexity === 'combo';

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
                        <p className="text-xs font-mono font-bold text-slate-500">{auditRef}</p>
                    </div>
                </div>

                {/* 2. PRIMARY LEDGER */}
                <div className="px-8 space-y-4">

                    {/* BASE RATE */}
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <Receipt className="w-4 h-4 text-slate-400" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hospital Base Rate</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-bold text-slate-700 leading-tight mb-1">{audit.procedure.label}</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tight">
                                {formatZAR(audit.breakdown.base_rate)}
                            </p>
                        </div>
                    </div>

                    {/* SCHEME SETTLEMENT */}
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
                                <p className="text-sm font-bold text-emerald-800 leading-tight mb-1">{audit.plan.plan_name}</p>
                                <p className="text-3xl font-black text-emerald-600 tracking-tight">
                                    - {formatZAR(audit.breakdown.scheme_pays)}
                                </p>
                            </div>
                        </button>

                        {/* PLAN SWITCHER DROPDOWN */}
                        {isPlanSwitcherOpen && (
                            <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-lg animate-in slide-in-from-top-2 duration-200">
                                <div className="p-3 bg-emerald-50/30 border-b border-emerald-50 text-center">
                                    <p className="text-[8px] font-black text-emerald-600 uppercase tracking-[0.2em]">Compare other 2026 plans</p>
                                </div>
                                <div className="max-h-60 overflow-y-auto no-scrollbar">
                                    {planOptions.filter(o => !o.isCurrent).map((opt) => (
                                        <Link
                                            key={opt.id}
                                            href={`/risk/${procedureSlug}/${opt.id}`}
                                            className="flex items-center justify-between p-4 hover:bg-emerald-50 transition-colors border-b border-slate-50 last:border-0 group"
                                        >
                                            <div>
                                                <p className="text-xs font-bold text-slate-700 leading-none mb-1">{opt.name}</p>
                                                <p className={clsx("text-[9px] font-black uppercase tracking-tight", opt.liability === 0 ? "text-emerald-600" : "text-rose-500")}>
                                                    {opt.liability === 0 ? "100% Covered" : opt.liability < 0 ? "Not Covered" : `${formatZAR(opt.liability)} Shortfall`}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* REDESIGNED: LOCATION OPTIMIZATION MATRIX */}
                    {variants && (
                        <div className="pt-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center justify-between mb-3 px-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Price by Location</p>
                                <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">2026 Rates</span>
                            </div>

                            <div className="space-y-2">
                                {/* Iterate through the 4 Location Types */}
                                {(['rooms', 'day_clinic', 'hospital_network', 'hospital_non_network'] as const).map((locKey) => {
                                    const details = LOCATION_DETAILS[locKey];

                                    // Determine values based on complexity
                                    const singleKey = locKey as keyof typeof variants; // e.g. 'rooms'
                                    const comboKey = `${locKey}_combo` as keyof typeof variants; // e.g. 'rooms_combo'

                                    const singlePrice = variants[singleKey] as number;
                                    const comboPrice = variants[comboKey] as number;

                                    // The main price to show on the face of the card depends on the current procedure complexity
                                    const displayPrice = isCombo ? comboPrice : singlePrice;

                                    const isCurrentSelection = displayPrice === audit.liability;
                                    const isExpanded = expandedLocation === locKey;

                                    return (
                                        <div
                                            key={locKey}
                                            className={clsx(
                                                "rounded-2xl border transition-all duration-300 overflow-hidden",
                                                isCurrentSelection ? "bg-slate-50 border-emerald-200 ring-1 ring-emerald-100" : "bg-white border-slate-200 hover:border-slate-300"
                                            )}
                                        >
                                            <button
                                                onClick={() => setExpandedLocation(isExpanded ? null : locKey)}
                                                className="w-full p-4 flex items-center justify-between"
                                            >
                                                {/* Left: Icon & Title */}
                                                <div className="flex items-center gap-3">
                                                    <div className={clsx("p-2 rounded-xl", details.bg, details.color)}>
                                                        <details.icon className="w-4 h-4" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-xs font-bold text-slate-700">{details.title}</p>
                                                        {isCurrentSelection && (
                                                            <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-tight">Your Current Estimate</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Right: Price & Chevron */}
                                                <div className="flex items-center gap-3">
                                                    <div className="text-right">
                                                        <p className={clsx("text-lg font-black tracking-tight", displayPrice === 0 ? "text-emerald-600" : "text-slate-900")}>
                                                            {formatZAR(displayPrice)}
                                                        </p>
                                                    </div>
                                                    {isExpanded ?
                                                        <ChevronUp className="w-4 h-4 text-slate-300" /> :
                                                        <ChevronDown className="w-4 h-4 text-slate-300" />
                                                    }
                                                </div>
                                            </button>

                                            {/* DROPDOWN CONTENT */}
                                            {isExpanded && (
                                                <div className="px-4 pb-4 animate-in slide-in-from-top-1">
                                                    <div className="pt-2 border-t border-slate-100">
                                                        {/* Plain Language Description */}
                                                        <p className="text-[11px] leading-relaxed text-slate-500 mb-4 pt-2">
                                                            {details.desc}
                                                        </p>

                                                        {/* Detailed Breakdown (Single vs Combo) */}
                                                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Single Scope</p>
                                                                    <p className="text-sm font-bold text-slate-700">{formatZAR(singlePrice)}</p>
                                                                </div>
                                                                <div className="border-l border-slate-200 pl-4">
                                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Combo Scope</p>
                                                                    <p className="text-sm font-bold text-slate-700">{formatZAR(comboPrice)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* 3. TECHNICAL RISK POINTS */}
                <div className="px-8 mt-8 space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 mb-2">Technical Risk Points</p>
                    {calculatedRisks.length === 0 ? (
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                            <p className="text-xs text-emerald-700 font-medium text-center">No major technical risks detected.</p>
                        </div>
                    ) : (
                        calculatedRisks.map((item) => (
                            <div key={item.id} className="bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden">
                                <button
                                    onClick={() => setExpandedRisk(expandedRisk === item.id ? null : item.id)}
                                    className="w-full flex items-center justify-between p-4 text-left group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={clsx("p-2 rounded-lg transition-colors", expandedRisk === item.id ? "bg-emerald-100 text-emerald-600" : "bg-white text-slate-400 group-hover:text-emerald-500")}>
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="block text-[11px] font-black text-slate-700 uppercase tracking-tight">{item.title}</span>
                                            <span className="text-[9px] font-bold text-rose-500 uppercase tracking-tighter">{item.risk} Risk</span>
                                        </div>
                                    </div>
                                    <ChevronRight className={clsx("w-4 h-4 transition-transform text-slate-300", expandedRisk === item.id && "rotate-90 text-emerald-500")} />
                                </button>
                                {expandedRisk === item.id && (
                                    <div className="px-4 pb-4 animate-in slide-in-from-top-1">
                                        <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic px-2 border-l-2 border-emerald-200 ml-4">
                                            "{item.detail}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* 4. TOTAL DUE RESOLUTION */}
                <div className="p-8 pt-12">
                    <div className={`p-8 rounded-[2rem] relative overflow-hidden shadow-2xl ${isClean ? 'bg-emerald-600 shadow-emerald-200' : 'bg-slate-900 shadow-slate-300'}`}>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.4em] mb-2">Total Due Today</p>
                            <h2 className="text-6xl font-black text-white tracking-tighter mb-4">{formatZAR(audit.liability)}</h2>

                            <div className="flex flex-col gap-2">
                                <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">
                                        {isClean ? 'Fully Cleared' : 'Shortfall Detected'}
                                    </span>
                                </div>
                                {audit.meta.warning_label === "Procedure Not Covered" && (
                                    <div className="px-4 py-1.5 bg-rose-500/20 backdrop-blur-md rounded-full border border-rose-500/30">
                                        <span className="text-[10px] font-black text-rose-200 uppercase tracking-widest">
                                            Exclusion Applied
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <p className="pb-8 text-center text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                    Authorized for 2026 Benefit Year • Ref: {auditRef}
                </p>
            </div>
        </div>
    );
}