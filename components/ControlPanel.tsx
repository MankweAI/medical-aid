'use client';

import { useState, useMemo } from 'react';
import { usePersona } from '@/context/PersonaContext';
import {
    Users,
    Wallet,
    Baby,
    HeartPulse,
    Shield,
    PiggyBank,
    ChevronDown,
    Check,
    MapPin,
    Building2,
    Anchor,
    Landmark
} from 'lucide-react';
import BottomSheet from '@/components/ui/BottomSheet';
import clsx from 'clsx';

// --- CONFIG ---
const PRIORITIES = [
    { id: 'budget', label: 'Saving Money', icon: Wallet, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'maternity', label: 'Pregnancy', icon: Baby, color: 'text-rose-600 bg-rose-50' },
    { id: 'family', label: 'Family Health', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { id: 'chronic', label: 'Chronic Care', icon: HeartPulse, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'comprehensive', label: 'Max Cover', icon: Shield, color: 'text-purple-600 bg-purple-50' },
    { id: 'savings', label: 'Building Savings', icon: PiggyBank, color: 'text-amber-600 bg-amber-50' },
];

const NETWORKS = [
    { id: 'Any', label: 'Any Hospital', icon: Building2, desc: 'Freedom of choice (Higher Premium)' },
    { id: 'Network', label: 'Network Hospitals', icon: MapPin, desc: 'Specific list of hospitals (Save ~20%)' },
    { id: 'Coastal', label: 'Coastal Only', icon: Anchor, desc: 'Hospitals in coastal provinces' },
    { id: 'State', label: 'State Facilities', icon: Landmark, desc: 'Government hospitals (Lowest Cost)' },
];

export default function ControlPanel() {
    const { state, setIncome, setMembers, setFilter } = usePersona();
    const { income, members, filters } = state;

    const [activeSheet, setActiveSheet] = useState<'none' | 'income' | 'family' | 'priority' | 'network'>('none');

    // --- COMPUTED LABELS ---
    const familyLabel = useMemo(() => {
        const total = members.main + members.adult + members.child;
        if (total === 1) return 'Myself';
        if (members.adult === 1 && members.child === 0) return 'Me & Partner';
        if (members.adult === 0 && members.child > 0) return 'Me & Child';
        return `Family of ${total}`;
    }, [members]);

    const priorityItem = PRIORITIES.find(p => p.id === filters.priority) || PRIORITIES[0];
    const networkItem = NETWORKS.find(n => n.id === filters.network) || NETWORKS[0]; // Default to Any/First if null

    // Helper for currency
    const formatMoney = (val: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    return (
        <>
            {/* --- THE LIVING STATEMENT CARD --- */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 mb-8 relative overflow-hidden transition-all hover:shadow-md group">

                <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors"></div>

                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Active Configuration
                </p>

                <h2 className="text-xl md:text-2xl font-light text-slate-900 leading-relaxed">
                    I need cover for{' '}
                    <button
                        onClick={() => setActiveSheet('family')}
                        className="inline-flex items-center gap-1 font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100 hover:bg-blue-100 transition-all mx-0.5 active:scale-95"
                    >
                        {familyLabel} <ChevronDown className="w-4 h-4 opacity-50" />
                    </button>
                    {' '}earning{' '}
                    <button
                        onClick={() => setActiveSheet('income')}
                        className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-all mx-0.5 active:scale-95"
                    >
                        {formatMoney(income)} <ChevronDown className="w-4 h-4 opacity-50" />
                    </button>
                    {' '}pm. I prefer{' '}
                    <button
                        onClick={() => setActiveSheet('network')}
                        className="inline-flex items-center gap-1 font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200 hover:bg-slate-200 transition-all mx-0.5 active:scale-95"
                    >
                        {networkItem.label} <ChevronDown className="w-4 h-4 opacity-50" />
                    </button>
                    {' '}and my priority is{' '}
                    <button
                        onClick={() => setActiveSheet('priority')}
                        className={clsx(
                            "inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-lg border transition-all mx-0.5 active:scale-95 hover:brightness-95",
                            priorityItem.color.replace('text-', 'text-').replace('bg-', 'bg-'),
                            "border-black/5"
                        )}
                    >
                        {priorityItem.label} <ChevronDown className="w-4 h-4 opacity-50" />
                    </button>
                    .
                </h2>
            </div>

            {/* --- SHEET 1: INCOME --- */}
            <BottomSheet isOpen={activeSheet === 'income'} onClose={() => setActiveSheet('none')} title="Monthly Household Income">
                <div className="space-y-8 pb-4">
                    <div className="text-center">
                        <span className="text-5xl font-black text-slate-900 tracking-tight">
                            {formatMoney(income)}
                        </span>
                        <p className="text-sm text-slate-500 mt-2 font-medium">Gross Total</p>
                    </div>
                    <input
                        type="range"
                        min="5000"
                        max="100000"
                        step="1000"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                        className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                        <span>R5k</span>
                        <span>R100k+</span>
                    </div>
                    <button
                        onClick={() => setActiveSheet('none')}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
                    >
                        Update Calculation
                    </button>
                </div>
            </BottomSheet>

            {/* --- SHEET 2: FAMILY --- */}
            <BottomSheet isOpen={activeSheet === 'family'} onClose={() => setActiveSheet('none')} title="Who needs cover?">
                <div className="space-y-4 pb-4">
                    {[
                        { label: 'Main Member', key: 'main' as const },
                        { label: 'Adult Dependants', key: 'adult' as const },
                        { label: 'Child Dependants', key: 'child' as const }
                    ].map((type) => (
                        <div key={type.key} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                            <span className="font-bold text-slate-700">{type.label}</span>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setMembers({ ...members, [type.key]: Math.max(type.key === 'main' ? 1 : 0, members[type.key] - 1) })}
                                    className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-400 hover:text-slate-900 shadow-sm text-lg active:scale-90 transition-transform"
                                >-</button>
                                <span className="font-black text-xl text-slate-900 w-6 text-center">{members[type.key]}</span>
                                <button
                                    onClick={() => setMembers({ ...members, [type.key]: members[type.key] + 1 })}
                                    className="w-10 h-10 flex items-center justify-center bg-slate-900 border border-slate-900 rounded-full text-white shadow-sm text-lg active:scale-90 transition-transform"
                                >+</button>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => setActiveSheet('none')}
                        className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-transform mt-4"
                    >
                        Save Family Size
                    </button>
                </div>
            </BottomSheet>

            {/* --- SHEET 3: NETWORK (NEW) --- */}
            <BottomSheet isOpen={activeSheet === 'network'} onClose={() => setActiveSheet('none')} title="Hospital Preference">
                <div className="space-y-3 pb-4">
                    {NETWORKS.map((n) => (
                        <button
                            key={n.id}
                            onClick={() => { setFilter('network', n.id); setActiveSheet('none'); }}
                            className={clsx(
                                "w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left group",
                                filters.network === n.id
                                    ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                                    : "bg-white border-slate-100 text-slate-600 hover:border-blue-300"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className={clsx(
                                    "p-3 rounded-full",
                                    filters.network === n.id ? "bg-white/10 text-white" : "bg-slate-50 text-slate-400 group-hover:text-blue-500"
                                )}>
                                    <n.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="font-bold text-sm block">{n.label}</span>
                                    <span className={clsx("text-xs block mt-0.5", filters.network === n.id ? "text-slate-400" : "text-slate-400")}>
                                        {n.desc}
                                    </span>
                                </div>
                            </div>
                            {filters.network === n.id && <Check className="w-5 h-5 text-emerald-400" />}
                        </button>
                    ))}
                </div>
            </BottomSheet>

            {/* --- SHEET 4: PRIORITY --- */}
            <BottomSheet isOpen={activeSheet === 'priority'} onClose={() => setActiveSheet('none')} title="Primary Goal">
                <div className="grid grid-cols-2 gap-3 pb-4">
                    {PRIORITIES.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => { setFilter('priority', p.id); setActiveSheet('none'); }}
                            className={clsx(
                                "flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all text-center h-32 justify-center relative overflow-hidden",
                                filters.priority === p.id
                                    ? "bg-slate-900 border-slate-900 text-white shadow-xl"
                                    : "bg-white border-slate-100 text-slate-600 hover:border-slate-200"
                            )}
                        >
                            <div className={clsx(
                                "p-3 rounded-full",
                                filters.priority === p.id ? "bg-white/10 text-white" : p.color
                            )}>
                                <p.icon className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-xs uppercase tracking-wide">{p.label}</span>

                            {filters.priority === p.id && (
                                <div className="absolute top-3 right-3 text-emerald-400">
                                    <Check className="w-4 h-4" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </BottomSheet>
        </>
    );
}