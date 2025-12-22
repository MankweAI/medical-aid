'use client';
import React from 'react';
import { Procedure, PlanDeductibleRule } from '@/data/procedures-2026';

interface InvoiceProps {
    procedure: Procedure;
    plan: PlanDeductibleRule;
    liability: number;
    warning?: string;
}

export function HospitalBillInvoice({ procedure, plan, liability, warning }: InvoiceProps) {
    const isClean = liability === 0;

    return (
        <div className="relative">
            {/* PAPER-STYLE INVOICE CARD */}
            <div className={`relative overflow-hidden rounded-2xl shadow-xl ${isClean
                    ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200'
                    : 'bg-gradient-to-br from-white to-slate-50 border border-slate-200'
                }`}>

                {/* PERFORATED TOP EDGE */}
                <div className="absolute top-0 inset-x-0 h-3 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,_var(--color)_8px,_var(--color)_16px)]"
                    style={{ '--color': isClean ? '#D1FAE5' : '#E2E8F0' } as React.CSSProperties}
                />

                {/* HEADER */}
                <div className={`pt-6 pb-4 px-6 flex items-center justify-between border-b ${isClean ? 'border-emerald-200/50' : 'border-slate-200'
                    }`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isClean
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Pre-Admission Estimate
                            </div>
                            <div className="text-sm font-medium text-slate-600">
                                2026 Rates
                            </div>
                        </div>
                    </div>
                    <div className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
                        #EST-2026
                    </div>
                </div>

                {/* LINE ITEMS */}
                <div className="p-6 space-y-4">
                    {/* Procedure */}
                    <div className="flex justify-between items-center pb-4 border-b border-dashed border-slate-200">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">🏥</span>
                            <div>
                                <span className="text-slate-900 font-medium">{procedure.label}</span>
                                <span className="block text-xs text-slate-400">{procedure.medical_term}</span>
                            </div>
                        </div>
                        <span className="font-mono font-bold text-slate-900">
                            R{procedure.base_cost_estimate.toLocaleString()}
                        </span>
                    </div>

                    {/* Network Compliance */}
                    <div className="flex justify-between items-center pb-4 border-b border-dashed border-slate-200">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">📍</span>
                            <div>
                                <span className="text-slate-700">Network Compliance</span>
                                <span className="ml-2 text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase">
                                    Required
                                </span>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                            ✓ Confirmed
                        </span>
                    </div>

                    {/* Scheme Coverage */}
                    <div className="flex justify-between items-center pb-4 border-b border-dashed border-slate-200">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">🛡️</span>
                            <span className="text-slate-700">Scheme Rate Coverage</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-600">
                            -R{procedure.base_cost_estimate.toLocaleString()}
                        </span>
                    </div>

                    {/* TOTAL LIABILITY */}
                    <div className={`flex justify-between items-center pt-4 p-4 -mx-4 rounded-xl ${isClean
                            ? 'bg-emerald-100/50'
                            : 'bg-gradient-to-r from-red-50 to-orange-50'
                        }`}>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{isClean ? '✅' : '💳'}</span>
                            <div>
                                <span className={`font-bold ${isClean ? 'text-emerald-800' : 'text-red-800'}`}>
                                    Patient Liability
                                </span>
                                <span className="block text-xs text-slate-500">
                                    Due at admission
                                </span>
                            </div>
                        </div>
                        <div className={`text-3xl font-black ${isClean ? 'text-emerald-600' : 'text-red-600'}`}>
                            R{liability.toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* STATUS STAMP OVERLAY */}
                {!isClean && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="relative -rotate-12">
                            <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-lg" />
                            <div className="relative border-4 border-red-400/40 text-red-500/50 font-black text-3xl uppercase px-4 py-2 rounded-lg">
                                Co-Payment
                            </div>
                        </div>
                    </div>
                )}

                {/* FOOTER STATUS BAR */}
                <div className={`p-4 border-t flex items-center justify-center gap-2 ${isClean
                        ? 'bg-emerald-500 text-white border-emerald-600'
                        : 'bg-gradient-to-r from-red-500 to-orange-500 text-white border-red-400'
                    }`}>
                    {isClean ? (
                        <>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-bold">FULLY COVERED</span>
                            <span className="text-emerald-100 text-sm">(In-Network Provider)</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="font-bold">{warning || 'Deductible Applies'}</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}