'use client';

import { useState } from 'react';
import { ChevronDown, ArrowRight, Zap, Users, CreditCard, HeartPulse, MapPin, Check } from 'lucide-react';
import { usePersona } from '@/context/PersonaContext';
import BottomSheet from '@/components/ui/BottomSheet';
import clsx from 'clsx';
import { useMemo } from 'react';

// --- CONFIGURATION OPTIONS ---

const WHO_OPTIONS = [
    { label: 'Myself', value: { main: 1, adult: 0, child: 0 }, icon: Users },
    { label: 'Me & Spouse', value: { main: 1, adult: 1, child: 0 }, icon: Users },
    { label: 'Single Parent', value: { main: 1, adult: 0, child: 1 }, icon: Users },
    { label: 'Family of 3', value: { main: 1, adult: 1, child: 1 }, icon: Users },
    { label: 'Family of 4+', value: { main: 1, adult: 1, child: 2 }, icon: Users },
];

const PRIORITY_OPTIONS = [
    { id: 'budget', label: 'Saving Money', icon: Wallet, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'maternity', label: 'Pregnancy', icon: Baby, color: 'text-rose-600 bg-rose-50' },
    { id: 'chronic', label: 'Chronic Care', icon: HeartPulse, color: 'text-blue-600 bg-blue-50' },
    { id: 'comprehensive', label: 'Max Cover', icon: Shield, color: 'text-purple-600 bg-purple-50' },
];

const NETWORK_OPTIONS = [
    { id: 'Network', label: 'am willing', desc: 'Restricted list of hospitals (Cheaper)' },
    { id: 'Any', label: 'refuse', desc: 'Any private hospital (More Expensive)' },
];

// Icons for the options
import { Wallet, Baby, Shield } from 'lucide-react';

interface Props {
    onAnalyze: () => void;
}

export default function MagicSearch({ onAnalyze }: Props) {
    const { state, setMembers, setIncome, setFilter } = usePersona();
    const { members, income, filters } = state;

    const [activeSheet, setActiveSheet] = useState<'none' | 'who' | 'income' | 'priority' | 'network'>('none');

    // --- DERIVED LABELS FOR THE SENTENCE ---
    const whoLabel = useMemo(() => {
        const total = members.main + members.adult + members.child;
        if (total === 1) return 'Myself';
        if (members.adult > 0 && members.child === 0) return 'Me & Partner';
        if (members.adult === 0 && members.child > 0) return 'Me & Kid';
        return 'My Family';
    }, [members]);

    const priorityLabel = PRIORITY_OPTIONS.find(p => p.id === filters.priority)?.label || 'Saving Money';
    const networkLabel = filters.network === 'Any' ? 'refuse' : 'am willing';

    // --- HANDLERS ---
    const handleWhoSelect = (val: typeof WHO_OPTIONS[0]['value']) => {
        setMembers(val);
        setActiveSheet('none');
    };

    const handlePrioritySelect = (id: string) => {
        setFilter('priority', id);
        // Auto-set related flags based on priority
        if (id === 'maternity') setFilter('maternity', true);
        if (id === 'budget') setFilter('savings', 'No');
        setActiveSheet('none');
    };

    const handleNetworkSelect = (id: 'Any' | 'Network') => {
        setFilter('network', id);
        setActiveSheet('none');
    };

    return (
        <div className="w-full relative z-20">
            {/* THE MAD LIBS CARD */}
            <div className="bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl shadow-slate-900/10 rounded-[32px] p-6 md:p-10 transition-all hover:scale-[1.01] duration-500">

                {/* Header Tag */}
                <div className="flex justify-center mb-8">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-slate-900/20">
                        <Zap className="w-3 h-3 text-amber-400 fill-current" />
                        AI Diagnosis
                    </span>
                </div>

                {/* The Sentence */}
                <h1 className="text-2xl md:text-4xl font-light text-slate-900 leading-[1.6] md:leading-[1.5] text-center">
                    I am looking for cover for{' '}
                    <button
                        onClick={() => setActiveSheet('who')}
                        className="inline-flex items-center gap-1 font-bold text-blue-600 border-b-2 border-blue-200 hover:border-blue-600 transition-all px-1 active:scale-95"
                    >
                        {whoLabel} <ChevronDown className="w-5 h-5 opacity-50" />
                    </button>
                    {' '}earning{' '}
                    <button
                        onClick={() => setActiveSheet('income')}
                        className="inline-flex items-center gap-1 font-bold text-emerald-600 border-b-2 border-emerald-200 hover:border-emerald-600 transition-all px-1 active:scale-95"
                    >
                        R{income.toLocaleString()} <ChevronDown className="w-5 h-5 opacity-50" />
                    </button>
                    {' '}pm. My top priority is{' '}
                    <button
                        onClick={() => setActiveSheet('priority')}
                        className="inline-flex items-center gap-1 font-bold text-rose-600 border-b-2 border-rose-200 hover:border-rose-600 transition-all px-1 active:scale-95"
                    >
                        {priorityLabel} <ChevronDown className="w-5 h-5 opacity-50" />
                    </button>
                    , and I{' '}
                    <button
                        onClick={() => setActiveSheet('network')}
                        className="inline-flex items-center gap-1 font-bold text-slate-600 border-b-2 border-slate-200 hover:border-slate-900 transition-all px-1 active:scale-95"
                    >
                        {networkLabel} <ChevronDown className="w-5 h-5 opacity-50" />
                    </button>
                    {' '}to use network hospitals.
                </h1>

                {/* Action Button */}
                <div className="mt-10 max-w-sm mx-auto">
                    <button
                        onClick={onAnalyze}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 transition-all active:scale-95 group"
                    >
                        Run Diagnosis
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-slate-400 group-hover:text-white" />
                    </button>
                </div>
            </div>

            {/* --- SHEET 1: WHO --- */}
            <BottomSheet isOpen={activeSheet === 'who'} onClose={() => setActiveSheet('none')} title="Who needs cover?">
                <div className="grid gap-3">
                    {WHO_OPTIONS.map((opt) => (
                        <button
                            key={opt.label}
                            onClick={() => handleWhoSelect(opt.value)}
                            className={clsx(
                                "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left",
                                JSON.stringify(members) === JSON.stringify(opt.value)
                                    ? "bg-blue-50 border-blue-200 shadow-sm ring-1 ring-blue-200"
                                    : "bg-white border-slate-100 hover:bg-slate-50"
                            )}
                        >
                            <div className="p-3 bg-white rounded-full shadow-sm border border-slate-100">
                                <opt.icon className="w-5 h-5 text-slate-700" />
                            </div>
                            <span className="font-bold text-slate-900">{opt.label}</span>
                        </button>
                    ))}
                </div>
            </BottomSheet>

            {/* --- SHEET 2: INCOME --- */}
            <BottomSheet isOpen={activeSheet === 'income'} onClose={() => setActiveSheet('none')} title="Gross Monthly Income">
                <div className="space-y-8 pb-8">
                    <div className="text-center">
                        <span className="text-5xl font-black text-slate-900 tracking-tight">
                            R{income.toLocaleString()}
                        </span>
                        <p className="text-sm text-slate-500 mt-2 font-medium">Household Total</p>
                    </div>
                    <input
                        type="range"
                        min="5000"
                        max="80000"
                        step="1000"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                        className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <span>R5k</span>
                        <span>R80k+</span>
                    </div>
                    <button onClick={() => setActiveSheet('none')} className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/20 active:scale-95">
                        Set Income
                    </button>
                </div>
            </BottomSheet>

            {/* --- SHEET 3: PRIORITY --- */}
            <BottomSheet isOpen={activeSheet === 'priority'} onClose={() => setActiveSheet('none')} title="Primary Goal">
                <div className="grid grid-cols-2 gap-3">
                    {PRIORITY_OPTIONS.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => handlePrioritySelect(p.id)}
                            className={clsx(
                                "flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all text-center h-32 justify-center",
                                filters.priority === p.id
                                    ? "bg-slate-50 border-slate-300 shadow-inner"
                                    : "bg-white border-slate-100 hover:border-slate-200"
                            )}
                        >
                            <div className={clsx("p-3 rounded-full", p.color)}>
                                <p.icon className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-slate-900 text-xs uppercase tracking-wide">{p.label}</span>
                        </button>
                    ))}
                </div>
            </BottomSheet>

            {/* --- SHEET 4: NETWORK --- */}
            <BottomSheet isOpen={activeSheet === 'network'} onClose={() => setActiveSheet('none')} title="Hospital Access">
                <div className="grid gap-3">
                    {NETWORK_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => handleNetworkSelect(opt.id as 'Any' | 'Network')}
                            className={clsx(
                                "flex items-center justify-between p-5 rounded-2xl border transition-all text-left",
                                filters.network === opt.id
                                    ? "bg-slate-900 text-white border-slate-900 shadow-xl"
                                    : "bg-white border-slate-100 text-slate-600"
                            )}
                        >
                            <div>
                                <span className="font-bold block text-lg">{opt.id} Hospitals</span>
                                <span className={clsx("text-xs block mt-1", filters.network === opt.id ? "text-slate-400" : "text-slate-500")}>
                                    {opt.desc}
                                </span>
                            </div>
                            {filters.network === opt.id && <Check className="w-6 h-6 text-emerald-400" />}
                        </button>
                    ))}
                </div>
            </BottomSheet>

        </div>
    );
}