'use client';
import React, { useState } from 'react';

export function HiddenGapAudit() {
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    const riskItems = [
        {
            id: 'hospital',
            label: 'Hospital Facility Fee',
            icon: '🏥',
            status: 'covered',
            coverage: 100,
            detail: 'Covered at 100% of the Scheme Rate when using a network provider.',
        },
        {
            id: 'surgeon',
            label: "Surgeon's Fee",
            icon: '👨‍⚕️',
            status: 'risk',
            coverage: 40,
            shortfall: 'Potential R15,000+',
            detail: 'Many specialists charge 200-400% of the tariff. The scheme only pays the tariff rate, leaving you with the shortfall.',
        },
        {
            id: 'anaesthetist',
            label: 'Anaesthetist',
            icon: '💉',
            status: 'risk',
            coverage: 50,
            shortfall: 'Potential R8,000+',
            detail: 'Paid separately from the hospital. Often not fully covered unless on a payment arrangement.',
        },
    ];

    return (
        <div className="mt-6 bg-white rounded-2xl shadow-xl border border-amber-200 overflow-hidden">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 border-b border-amber-100">
                <div className="flex items-start gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-amber-400/20 rounded-xl blur animate-pulse" />
                        <div className="relative bg-gradient-to-br from-amber-100 to-orange-100 p-3 rounded-xl border border-amber-200">
                            <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-amber-900 font-bold text-lg leading-tight">
                            The Hospital is Covered.
                        </h3>
                        <p className="text-amber-700 text-sm mt-0.5">
                            But who pays the other 60%?
                        </p>
                    </div>
                </div>
            </div>

            {/* RISK BREAKDOWN */}
            <div className="p-4">
                {riskItems.map((item, index) => (
                    <div
                        key={item.id}
                        className={`transition-all duration-200 ${index !== 0 ? 'mt-3' : ''}`}
                    >
                        <button
                            onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                            className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${item.status === 'covered'
                                    ? 'bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200'
                                    : 'bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{item.icon}</span>
                                    <div>
                                        <div className={`font-semibold ${item.status === 'covered' ? 'text-emerald-800' : 'text-amber-900'
                                            }`}>
                                            {item.label}
                                        </div>
                                        {item.status === 'risk' && (
                                            <div className="text-xs font-bold text-red-600 mt-0.5">
                                                {item.shortfall}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {item.status === 'covered' ? (
                                        <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                                            ✓ 100% COVERED
                                        </span>
                                    ) : (
                                        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
                                            ⚠️ AT RISK
                                        </span>
                                    )}
                                    <svg
                                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${expandedItem === item.id ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* PROGRESS BAR */}
                            <div className="mt-3 h-2 rounded-full bg-slate-200 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${item.status === 'covered'
                                            ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                                            : 'bg-gradient-to-r from-amber-400 to-orange-400'
                                        }`}
                                    style={{ width: `${item.coverage}%` }}
                                />
                            </div>
                            <div className="mt-1 text-[10px] text-slate-500 text-right">
                                {item.coverage}% typically covered
                            </div>

                            {/* EXPANDED DETAIL */}
                            {expandedItem === item.id && (
                                <div className="mt-3 pt-3 border-t border-slate-200/50 text-sm text-slate-600">
                                    {item.detail}
                                </div>
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* CTA SECTION */}
            <div className="bg-slate-900 p-6">
                <p className="text-slate-300 text-sm text-center mb-4 leading-relaxed">
                    Don't guess. We can verify if your specific doctor has a{' '}
                    <strong className="text-white">"Payment Arrangement"</strong> with Discovery to guarantee full cover.
                </p>
                <button className="w-full group bg-white hover:bg-emerald-50 text-slate-900 font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3">
                    <span>Verify My Doctor's Rate</span>
                    <svg className="w-5 h-5 text-emerald-600 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
