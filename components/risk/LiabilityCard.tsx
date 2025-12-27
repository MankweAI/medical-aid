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

                {/* SCOPE INSIGHTS: Procedure-Specific Tips */}
                {audit.scope_insights && (
                    <div className="mb-6 space-y-2">
                        {/* Value-Based Network Reduction */}
                        {audit.scope_insights.reducedHospitalCopayment && location === 'hospital' && (
                            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                                <div className="p-1.5 bg-amber-100 rounded-lg">
                                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-amber-800">Value-Based Network Discount</p>
                                    <p className="text-[11px] text-amber-700 mt-0.5">
                                        Reduces to <span className="font-black">{formatZAR(audit.scope_insights.reducedHospitalCopayment)}</span> if your doctor is part of the Scheme's Value-Based Network.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* In-Rooms Option */}
                        {audit.scope_insights.inRoomsSingleScopeCopayment && (
                            <div className="flex items-start gap-3 p-3 bg-sky-50 rounded-xl border border-sky-100">
                                <div className="p-1.5 bg-sky-100 rounded-lg">
                                    <Building2 className="w-4 h-4 text-sky-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-sky-800">In-Rooms Option Available</p>
                                    <p className="text-[11px] text-sky-700 mt-0.5">
                                        Only <span className="font-black">{formatZAR(audit.scope_insights.inRoomsSingleScopeCopayment)}</span> if performed in-rooms at a network provider (no theatre required).
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* PMB Exemption */}
                        {audit.scope_insights.pmbExemptionCondition && audit.scope_insights.pmbExemptionNoCopayment && (
                            <div className="flex items-start gap-3 p-3 bg-violet-50 rounded-xl border border-violet-100">
                                <div className="p-1.5 bg-violet-100 rounded-lg">
                                    <ShieldCheck className="w-4 h-4 text-violet-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-violet-800">PMB Exemption</p>
                                    <p className="text-[11px] text-violet-700 mt-0.5">
                                        <span className="font-black">No co-payment</span> if: {audit.scope_insights.pmbExemptionCondition}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Out-of-Network Warning */}
                        {audit.scope_insights.outOfNetworkPenalty && (
                            <div className="flex items-start gap-3 p-3 bg-rose-50 rounded-xl border border-rose-100">
                                <div className="p-1.5 bg-rose-100 rounded-lg">
                                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-rose-800">Out-of-Network Warning</p>
                                    <p className="text-[11px] text-rose-700 mt-0.5">
                                        Using a non-network facility increases your liability to <span className="font-black">{formatZAR(audit.scope_insights.outOfNetworkPenalty)}</span>.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* DENTAL INSIGHTS: Procedure-Specific Tips */}
                {audit.dental_insights && (
                    <div className="mb-6 space-y-2">
                        {/* Hospital vs Day Clinic Comparison */}
                        {audit.dental_insights.hospitalCopayment && audit.dental_insights.dayClinicCopayment && (
                            <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                                <div className="p-1.5 bg-emerald-100 rounded-lg">
                                    <Building2 className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-emerald-800">Day Clinic Saves You Money</p>
                                    <p className="text-[11px] text-emerald-700 mt-0.5">
                                        <span className="font-black">{formatZAR(audit.dental_insights.dayClinicCopayment)}</span> at a Day Clinic vs <span className="font-black">{formatZAR(audit.dental_insights.hospitalCopayment)}</span> at Hospital.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Age-Based Co-payment */}
                        {audit.dental_insights.ageGroup && (
                            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                                <div className="p-1.5 bg-amber-100 rounded-lg">
                                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-amber-800">Age-Based Co-payment</p>
                                    <p className="text-[11px] text-amber-700 mt-0.5">
                                        These co-payments apply to patients <span className="font-black">{audit.dental_insights.ageGroup}</span>. Children under 13 may have reduced or no co-payment.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Pre-Authorisation Required */}
                        {audit.dental_insights.requiresApproval && (
                            <div className="flex items-start gap-3 p-3 bg-violet-50 rounded-xl border border-violet-100">
                                <div className="p-1.5 bg-violet-100 rounded-lg">
                                    <ShieldCheck className="w-4 h-4 text-violet-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-violet-800">Pre-Authorisation Required</p>
                                    <p className="text-[11px] text-violet-700 mt-0.5">
                                        Dental surgery in hospital requires <span className="font-black">scheme approval</span> before admission.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Anaesthetist Coverage */}
                        {audit.dental_insights.anaesthetistCoverage && (
                            <div className="flex items-start gap-3 p-3 bg-sky-50 rounded-xl border border-sky-100">
                                <div className="p-1.5 bg-sky-100 rounded-lg">
                                    <CheckCircle2 className="w-4 h-4 text-sky-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-sky-800">Anaesthetist Covered</p>
                                    <p className="text-[11px] text-sky-700 mt-0.5">
                                        Anaesthetist fees covered at <span className="font-black">{audit.dental_insights.anaesthetistCoverage}% of Discovery Health Rate</span>.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

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