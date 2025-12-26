'use client';

import React, { useState } from 'react';
import { RiskAudit } from '@/types/schemes/discovery';
import {
    AlertTriangle,
    CheckCircle2,
    Building2,
    BedDouble,
    ArrowRight,
    ShieldCheck
} from 'lucide-react';
import clsx from 'clsx';

const formatZAR = (n: number) =>
    new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        maximumFractionDigits: 0
    }).format(n);

export function LiabilityCard({ audit }: { audit: RiskAudit }) {
    // STATE: Handle the "Context Toggles" for Scopes
    // Default to the engine's calculation (usually Hospital/High Risk), 
    // but allow user to override the view instantly.
    const [location, setLocation] = useState<'hospital' | 'day_clinic'>('hospital');

    // Determine displayed liability based on toggle state
    const variants = audit.breakdown.scope_variants;
    const isScope = !!variants;

    let currentLiability = audit.liability;
    let savedAmount = 0;

    console.log("How come", formatZAR(currentLiability));
    console.log("*********************************************");


    if (isScope && variants) {
        // Logic: Is it a combo or single?
        const isCombo = audit.procedure.scope_complexity === 'combo';

        if (location === 'day_clinic') {
            currentLiability = isCombo ? (variants.day_clinic_combo ?? variants.day_clinic) : variants.day_clinic;

            // Calculate savings vs hospital
            const hospitalCost = isCombo ? (variants.hospital_network_combo ?? variants.hospital_network) : variants.hospital_network;
            savedAmount = hospitalCost - currentLiability;
        } else {
            // Hospital view (Default high risk)
            currentLiability = isCombo ? (variants.hospital_network_combo ?? variants.hospital_network) : variants.hospital_network;
        }
    }

    const isClean = currentLiability === 0;

    return (
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden">

            {/* 1. HEADER: The "Financial Diagnosis" */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start">
                <div>
                    <h1 className="text-xl font-black text-slate-900 leading-tight">
                        {audit.procedure.label}
                    </h1>
                    {/* ACCURATE MEDICAL CODE DISPLAY [cite: 25, 39] */}
                    <p className="text-xs font-mono font-bold text-slate-400 mt-1">
                        CPT Code: {audit.procedure.cpt_code}
                    </p>
                    <p className="text-sm font-medium text-emerald-600 mt-1">
                        on {audit.plan.plan_name}
                    </p>
                </div>
                {/* Trust Signal: Verified 2026 Rules [cite: 74] */}
                <div className="flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                    <ShieldCheck className="w-3 h-3" /> Verified 2026
                </div>
            </div>

            <div className="p-8">
                {/* 2. PRIMARY STAT: The Risk [cite: 45, 46] */}
                <div className="text-center mb-8">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Your Estimated Co-Payment
                    </p>
                    <div className={clsx("text-6xl font-black tracking-tighter", isClean ? "text-emerald-500" : "text-rose-600")}>
                        {formatZAR(currentLiability)}
                    </div>

                    {/* GAP COVER SIMULATION OVERLAY [cite: 22, 51] */}
                    {!isClean && (
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
                            <span className="text-xs font-bold">With Gap Cover:</span>
                            <span className="text-sm font-black text-emerald-600">R0.00</span>
                            <span className="text-[10px] text-blue-400 line-through decoration-red-400 decoration-2">{formatZAR(currentLiability)}</span>
                        </div>
                    )}
                </div>

                {/* 3. CONTEXT TOGGLES: The "Why" (Scopes Only) [cite: 48] */}
                {isScope && (
                    <div className="bg-slate-50 p-2 rounded-xl flex gap-2 mb-6">
                        <button
                            onClick={() => setLocation('hospital')}
                            className={clsx(
                                "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase tracking-wide transition-all",
                                location === 'hospital' ? "bg-white text-rose-600 shadow-sm ring-1 ring-slate-100" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <BedDouble className="w-4 h-4" />
                            Acute Hospital
                        </button>
                        <button
                            onClick={() => setLocation('day_clinic')}
                            className={clsx(
                                "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase tracking-wide transition-all",
                                location === 'day_clinic' ? "bg-white text-emerald-600 shadow-sm ring-1 ring-slate-100" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <Building2 className="w-4 h-4" />
                            Day Clinic
                        </button>
                    </div>
                )}

                {/* 4. SAVINGS NUDGE [cite: 1] */}
                {savedAmount > 0 && (
                    <div className="mb-6 flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100 animate-in fade-in slide-in-from-top-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-emerald-800">Smart Choice Available</p>
                            <p className="text-xs text-emerald-700 mt-1">
                                You save <span className="font-black">{formatZAR(savedAmount)}</span> by using a Day Clinic. The {audit.plan.plan_name} penalizes acute hospital admissions for this procedure.
                            </p>
                        </div>
                    </div>
                )}

                {/* 5. SEO "THICK CONTENT" SECTION [cite: 39, 49] */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                        Medical Context
                    </p>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                        {audit.procedure.description}
                    </p>

                    {/* The "Value Injection" List: Common Diagnoses */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                            Common Diagnosis Codes (ICD-10)
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {audit.procedure.common_diagnoses.map(d => (
                                <span key={d.code} className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[10px] text-slate-600 font-medium shadow-sm">
                                    <strong className="text-slate-900">{d.code}:</strong> {d.label}
                                </span>
                            ))}
                        </div>
                        <p className="text-[9px] text-slate-400 mt-2 italic">
                            * Note: Your doctor must define your specific ICD-10 code.
                        </p>
                    </div>
                </div>

                {/* 6. CTA: The Solution [cite: 22, 51] */}
                {!isClean && (
                    <button className="w-full mt-6 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-slate-200">
                        Get Gap Cover Quote
                        <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}