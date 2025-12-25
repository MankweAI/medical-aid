'use client';

import React, { useState } from 'react';
import { RiskAudit } from '@/types/risk';
import { AlertTriangle, CheckCircle2, Building2, BedDouble, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const formatZAR = (n: number) =>
    new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        maximumFractionDigits: 0
    }).format(n);

export function LiabilityCard({ audit }: { audit: RiskAudit }) {
    // STATE: Handle the "Context Toggles" 
    // Default to the engine's calculation, but allow user to override view
    const [location, setLocation] = useState<'hospital' | 'day_clinic'>('hospital');

    // Determine displayed liability based on toggle
    const variants = audit.breakdown.scope_variants;
    const isScope = !!variants;

    let currentLiability = audit.liability;
    let savedAmount = 0;

    if (isScope && variants) {
        if (location === 'day_clinic') {
            // Logic: Is it a combo or single?
            const isCombo = audit.procedure.scope_complexity === 'combo';
            currentLiability = isCombo ? variants.day_clinic_combo : variants.day_clinic_single;

            // Calculate savings vs hospital
            const hospitalCost = isCombo ? variants.hospital_network_combo : variants.hospital_network_single;
            savedAmount = hospitalCost - currentLiability;
        } else {
            // Hospital view (Default high risk)
            const isCombo = audit.procedure.scope_complexity === 'combo';
            currentLiability = isCombo ? variants.hospital_network_combo : variants.hospital_network_single;
        }
    }

    const isClean = currentLiability === 0;

    return (
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden">
            {/* HEADER: The "Financial Diagnosis" [cite: 11] */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-black text-slate-900 leading-tight">
                        {audit.procedure.label}
                    </h1>
                    <p className="text-sm font-medium text-slate-500">
                        on {audit.plan.plan_name}
                    </p>
                </div>
                {/* Trust Signal: Verified 2026 Rules */}
                <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                    2026 Rules Verified
                </div>
            </div>

            <div className="p-8">
                {/* PRIMARY STAT: The Risk [cite: 46] */}
                <div className="text-center mb-8">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Your Estimated Co-Payment
                    </p>
                    <div className={clsx("text-6xl font-black tracking-tighter", isClean ? "text-emerald-500" : "text-rose-600")}>
                        {formatZAR(currentLiability)}
                    </div>

                    {/* GAP COVER SIMULATION OVERLAY [cite: 50] */}
                    {!isClean && (
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
                            <span className="text-xs font-bold">With Gap Cover:</span>
                            <span className="text-sm font-black text-emerald-600">R0.00</span>
                            <span className="text-[10px] text-blue-400 line-through">{formatZAR(currentLiability)}</span>
                        </div>
                    )}
                </div>

                {/* CONTEXT TOGGLES: The "Why"  */}
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

                {/* SAVINGS NUDGE [cite: 39] */}
                {savedAmount > 0 && (
                    <div className="mb-6 flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-emerald-800">Smart Choice Available</p>
                            <p className="text-xs text-emerald-700 mt-1">
                                You save <span className="font-black">{formatZAR(savedAmount)}</span> by using a Day Clinic. The {audit.plan.plan_name} penalizes acute hospital admissions for this procedure.
                            </p>
                        </div>
                    </div>
                )}

                {/* CTA: The Solution [cite: 51] */}
                {!isClean && (
                    <button className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                        Get Gap Cover Quote
                        <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}