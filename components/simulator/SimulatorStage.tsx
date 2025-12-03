// components/simulator/SimulatorStage.tsx
'use client';

import { useState } from 'react';
import { SimulationResult, ClinicalScenario } from '@/types/simulation';
import { CheckCircle2, AlertCircle, XCircle, Receipt, ArrowLeft } from 'lucide-react';
import clsx from 'clsx';

interface StageProps {
    initialResult: SimulationResult;
    scenario: ClinicalScenario;
    planName: string;
}

export function SimulatorStage({ initialResult, scenario, planName }: StageProps) {
    const [result] = useState(initialResult);
    const [viewMode, setViewMode] = useState<'timeline' | 'receipt'>('timeline');

    const formatR = (val: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    // --- NEW: THE RECEIPT RENDERER ---
    const renderReceipt = () => (
        <div className="p-8 bg-slate-50 min-h-[400px] font-mono text-sm animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white border border-slate-200 shadow-sm p-6 max-w-sm mx-auto relative paper-tear">

                {/* Receipt Header */}
                <div className="text-center border-b-2 border-dashed border-slate-200 pb-4 mb-4">
                    <h3 className="font-bold text-slate-900 uppercase tracking-widest">Medical Invoice</h3>
                    <p className="text-[10px] text-slate-400 mt-1">{scenario.title}</p>
                    <p className="text-[10px] text-slate-400">{new Date().toLocaleDateString()}</p>
                </div>

                {/* Line Items */}
                <div className="space-y-3 mb-6">
                    {result.timeline.map((event, i) => (
                        <div key={i} className="flex justify-between items-start text-xs">
                            <div>
                                <span className="text-slate-600 block">{event.step_label.split(': ')[1]}</span>
                                <span className="text-[9px] text-slate-400 uppercase">{event.status}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-slate-900 block">{formatR(event.cost)}</span>
                                {event.shortfall > 0 && (
                                    <span className="text-rose-500 font-bold block text-[10px]">
                                        PAY: {formatR(event.shortfall)}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Totals */}
                <div className="border-t-2 border-dashed border-slate-200 pt-4 space-y-1">
                    <div className="flex justify-between text-xs text-slate-500">
                        <span>Subtotal</span>
                        <span>{formatR(result.financials.total_event_cost)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-emerald-600">
                        <span>Plan Paid</span>
                        <span>- {formatR(result.financials.plan_pays)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-slate-900 pt-2 mt-2 border-t border-slate-100">
                        <span>YOU OWE</span>
                        <span className={result.financials.shortfall > 0 ? "text-rose-600" : "text-emerald-600"}>
                            {formatR(result.financials.shortfall)}
                        </span>
                    </div>
                </div>

                {/* Barcode Decoration */}
                <div className="mt-6 pt-4 text-center opacity-20">
                    <div className="h-8 bg-slate-900 w-3/4 mx-auto mb-1"></div>
                    <p className="text-[8px]">HEALTH-OS-VERIFIED</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">

            {/* Header / Scorecard */}
            <div className="bg-slate-50 border-b border-slate-100 p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Projected Outcome</p>
                        <h2 className="text-xl font-black text-slate-900">{planName}</h2>
                    </div>
                    <button
                        onClick={() => setViewMode(v => v === 'timeline' ? 'receipt' : 'timeline')}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors active:scale-95"
                    >
                        {viewMode === 'timeline' ? <Receipt className="w-4 h-4 text-slate-600" /> : <ArrowLeft className="w-4 h-4 text-slate-600" />}
                        <span className="text-[10px] font-bold text-slate-600 uppercase">
                            {viewMode === 'timeline' ? 'View Bill' : 'Timeline'}
                        </span>
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-white rounded-xl border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Event Cost</p>
                        <p className="text-sm font-bold text-slate-700">{formatR(result.financials.total_event_cost)}</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-100">
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Plan Pays</p>
                        <p className="text-sm font-bold text-emerald-600">{formatR(result.financials.plan_pays)}</p>
                    </div>
                    <div className={clsx("p-3 rounded-xl border", result.financials.shortfall > 0 ? "bg-rose-50 border-rose-100" : "bg-emerald-50 border-emerald-100")}>
                        <p className={clsx("text-[9px] font-bold uppercase", result.financials.shortfall > 0 ? "text-rose-400" : "text-emerald-400")}>You Pay</p>
                        <p className={clsx("text-sm font-black", result.financials.shortfall > 0 ? "text-rose-600" : "text-emerald-600")}>
                            {formatR(result.financials.shortfall)}
                        </p>
                    </div>
                </div>
            </div>

            {/* View Switcher */}
            {viewMode === 'receipt' ? renderReceipt() : (
                <div className="p-6 relative flex-grow animate-in fade-in slide-in-from-left-4 duration-300">
                    <div className="absolute left-9 top-6 bottom-6 w-0.5 bg-slate-100" />
                    <div className="space-y-6 relative z-10">
                        {result.timeline.map((event, i) => (
                            <div key={i} className="flex gap-4 group">
                                <div className={clsx(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 bg-white transition-colors",
                                    event.status === 'Fully Covered' ? "border-emerald-500 text-emerald-500 group-hover:bg-emerald-50" :
                                        event.status === 'Partially Covered' ? "border-amber-500 text-amber-500 group-hover:bg-amber-50" :
                                            "border-rose-500 text-rose-500 group-hover:bg-rose-50"
                                )}>
                                    {event.status === 'Fully Covered' && <CheckCircle2 className="w-3 h-3" />}
                                    {event.status === 'Partially Covered' && <AlertCircle className="w-3 h-3" />}
                                    {event.status === 'Not Covered' && <XCircle className="w-3 h-3" />}
                                </div>
                                <div className="flex-grow pb-2 border-b border-slate-50 last:border-0">
                                    <div className="flex justify-between items-start">
                                        <span className="text-xs font-bold text-slate-700">{event.step_label}</span>
                                        <span className="text-xs font-bold text-slate-900">{formatR(event.cost)}</span>
                                    </div>
                                    <div className="flex justify-between items-end mt-1">
                                        <div>
                                            <p className={clsx("text-[10px] font-bold",
                                                event.source === 'Risk' ? "text-emerald-600" :
                                                    event.source === 'Savings' ? "text-blue-600" : "text-rose-500"
                                            )}>
                                                Paid by {event.source}
                                            </p>
                                            {event.shortfall > 0 && (
                                                <p className="text-[10px] text-rose-500 mt-0.5">
                                                    Shortfall: {formatR(event.shortfall)} ({event.reason})
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}