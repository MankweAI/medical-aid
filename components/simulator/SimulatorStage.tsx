// components/simulator/SimulatorStage.tsx
'use client';

import { useState, useMemo } from 'react';
import { SimulationResult, ClinicalScenario, SimulationEvent } from '@/types/simulation';
import { CheckCircle2, AlertCircle, XCircle, Receipt, ArrowLeft, HelpCircle, Baby, Stethoscope, Pill, Activity } from 'lucide-react';
import JargonBuster from '@/components/JargonBuster';
import { FinancialHealthHeader } from './FinancialHealthHeader';
import clsx from 'clsx';

interface StageProps {
    initialResult: SimulationResult;
    scenario: ClinicalScenario;
    planName: string;
}

const DEFINITIONS: Record<string, string> = {
    'Shortfall': "The difference between what the doctor charges and what your medical aid pays. You are responsible for paying this amount directly to the provider.",
    'Co-payment': "A fixed upfront amount you must pay for a specific procedure (like an MRI) or for using a hospital outside of your plan's network.",
    'Risk': "The main insurance pool of the scheme. It covers large, unpredictable events like hospital admissions, surgeries, and chronic conditions (PMBs).",
    'Savings': "Your Medical Savings Account (MSA). A portion of your monthly premium is set aside in this 'bank account' for day-to-day expenses like GP visits and medication.",
    'PMB': "Prescribed Minimum Benefits. A list of 270 conditions and 26 chronic diseases that all medical aids MUST cover by law, at cost, provided you use their designated service providers.",
    'Plan Pays': "The total amount covered by your medical aid, combining both Risk benefits and your Savings account."
};

export function SimulatorStage({ initialResult, scenario, planName }: StageProps) {
    const [result] = useState(initialResult);
    const [viewMode, setViewMode] = useState<'timeline' | 'receipt'>('timeline');

    // Jargon Buster State
    const [jargonOpen, setJargonOpen] = useState(false);
    const [jargonTerm, setJargonTerm] = useState('');
    const [jargonDef, setJargonDef] = useState('');

    const openJargon = (term: string) => {
        setJargonTerm(term);
        setJargonDef(DEFINITIONS[term] || "No definition found.");
        setJargonOpen(true);
    };

    const formatR = (val: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    // Group events by Phase
    // Note: We need to map the flat timeline back to the scenario line items to get the phase, 
    // OR we assume the timeline events are in order and we can look up the phase from the scenario.
    // For simplicity, let's assume the timeline events correspond 1:1 to scenario.line_items in order.
    const phasedEvents = useMemo(() => {
        const groups: Record<string, SimulationEvent[]> = {};
        result.timeline.forEach((event, index) => {
            const phase = scenario.line_items[index]?.phase || 'Other';
            if (!groups[phase]) groups[phase] = [];
            groups[phase].push(event);
        });
        return groups;
    }, [result.timeline, scenario.line_items]);

    // Helper to get icon for phase
    const getPhaseIcon = (phase: string) => {
        if (phase.includes('Preparation') || phase.includes('Routine')) return <Stethoscope className="w-4 h-4" />;
        if (phase.includes('Event') || phase.includes('Birth')) return <Baby className="w-4 h-4" />;
        if (phase.includes('Recovery') || phase.includes('Medication')) return <Pill className="w-4 h-4" />;
        return <Activity className="w-4 h-4" />;
    };

    // --- RECEIPT RENDERER ---
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
                                <span className="text-slate-600 block">{event.step_label.split(': ')[1] || event.step_label}</span>
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
                        <button onClick={() => openJargon('Plan Pays')} className="hover:underline decoration-dotted">Plan Pays</button>
                        <span>- {formatR(result.financials.plan_pays)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-slate-900 pt-2 mt-2 border-t border-slate-100">
                        <button onClick={() => openJargon('Shortfall')} className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            YOU OWE <HelpCircle className="w-3 h-3 text-slate-400" />
                        </button>
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
        <>
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">

                {/* 1. FINANCIAL HEALTH HEADER */}
                <FinancialHealthHeader
                    result={result}
                    planName={planName}
                    onOpenJargon={openJargon}
                />

                {/* 2. VIEW TOGGLE */}
                <div className="bg-slate-50/50 border-b border-slate-100 px-6 py-2 flex justify-end">
                    <button
                        onClick={() => setViewMode(v => v === 'timeline' ? 'receipt' : 'timeline')}
                        className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-blue-600 uppercase tracking-wider transition-colors"
                    >
                        {viewMode === 'timeline' ? (
                            <>
                                <Receipt className="w-3 h-3" /> View Invoice
                            </>
                        ) : (
                            <>
                                <ArrowLeft className="w-3 h-3" /> Back to Timeline
                            </>
                        )}
                    </button>
                </div>

                {/* 3. MAIN CONTENT AREA */}
                {viewMode === 'receipt' ? renderReceipt() : (
                    <div className="p-6 relative flex-grow animate-in fade-in slide-in-from-left-4 duration-300 bg-slate-50/30">
                        <div className="space-y-8">
                            {Object.entries(phasedEvents).map(([phase, events]) => (
                                <div key={phase} className="relative">
                                    {/* Phase Header */}
                                    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm py-2 mb-4 border-b border-slate-100 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                            {getPhaseIcon(phase)}
                                        </div>
                                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{phase}</h3>
                                    </div>

                                    {/* Events in Phase */}
                                    <div className="pl-4 border-l-2 border-slate-100 space-y-4 ml-4">
                                        {events.map((event, i) => (
                                            <div key={i} className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow group relative">
                                                {/* Status Dot */}
                                                <div className={clsx(
                                                    "absolute -left-[21px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white ring-1",
                                                    event.status === 'Fully Covered' ? "bg-emerald-500 ring-emerald-100" :
                                                        event.status === 'Partially Covered' ? "bg-amber-500 ring-amber-100" :
                                                            "bg-rose-500 ring-rose-100"
                                                )} />

                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="text-sm font-bold text-slate-900">{event.step_label}</h4>
                                                        <p className="text-[10px] text-slate-400 uppercase mt-0.5">{event.status}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-bold text-slate-900">{formatR(event.cost)}</p>
                                                    </div>
                                                </div>

                                                {/* Payment Source Breakdown */}
                                                <div className="flex items-center gap-2 text-[10px] font-medium">
                                                    <span className="text-slate-400">Paid by:</span>
                                                    <button
                                                        onClick={() => openJargon(event.source)}
                                                        className={clsx("hover:underline decoration-dotted",
                                                            event.source === 'Risk' ? "text-emerald-600" :
                                                                event.source === 'Savings' ? "text-blue-600" : "text-rose-500"
                                                        )}
                                                    >
                                                        {event.source}
                                                    </button>
                                                </div>

                                                {/* Shortfall Alert */}
                                                {event.shortfall > 0 && (
                                                    <div className="mt-3 pt-2 border-t border-slate-50 flex justify-between items-center">
                                                        <span className="text-[10px] font-bold text-rose-500 flex items-center gap-1">
                                                            <AlertCircle className="w-3 h-3" />
                                                            Shortfall
                                                        </span>
                                                        <span className="text-xs font-black text-rose-600">
                                                            {formatR(event.shortfall)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <JargonBuster
                isOpen={jargonOpen}
                onClose={() => setJargonOpen(false)}
                term={jargonTerm}
                definition={jargonDef}
            />
        </>
    );
}