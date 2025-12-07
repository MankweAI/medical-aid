'use client';

import { usePersona } from '@/context/PersonaContext';
import {
    Users,
    CreditCard,
    HeartPulse,
    Wallet,
    Baby,
    ShieldAlert,
    MapPin,
    PiggyBank,
    SlidersHorizontal,
    Building2 // Added missing import
} from 'lucide-react';
import clsx from 'clsx';

const PRIORITIES = [
    // 1. THE FINANCIALLY CONSTRAINED
    { id: 'budget', label: 'Budget', icon: Wallet },

    // 2. THE GROWING FAMILY
    { id: 'maternity', label: 'Maternity', icon: Baby },
    { id: 'family', label: 'Family', icon: Users },

    // 3. THE CLINICALLY VULNERABLE
    { id: 'chronic', label: 'Chronic', icon: HeartPulse },
    { id: 'comprehensive', label: 'Max Cover', icon: ShieldAlert },

    // 4. THE STRATEGIC OPTIMIZERS
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'savings', label: 'Savings', icon: PiggyBank },
    { id: 'hospital', label: 'Hospital', icon: Building2 }
];

export default function ControlPanel() {
    const { state, setIncome, setMembers, setFilter } = usePersona();
    const { income, members, filters } = state;

    // Helper for formatting currency
    const formatMoney = (val: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="bg-slate-100/50 backdrop-blur-sm rounded-[32px] p-2 mb-8 border border-slate-200/50">

            <div className="bg-white/40 rounded-[24px] p-6 border border-white/50 shadow-sm">

                {/* HEADER LABEL */}
                <div className="flex items-center gap-2 mb-6 opacity-50">
                    <SlidersHorizontal className="w-4 h-4 text-slate-900" />
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Configuration</span>
                </div>

                {/* ROW 1: INPUT SLOTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

                    {/* SLOT 1: INCOME */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2 text-slate-400">
                                <CreditCard className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Gross Income</span>
                            </div>
                            <span
                                className="text-sm font-black text-slate-900 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100"
                                suppressHydrationWarning
                            >
                                {formatMoney(income)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="5000"
                            max="80000"
                            step="1000"
                            value={income}
                            onChange={(e) => setIncome(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
                        />
                    </div>

                    {/* SLOT 2: FAMILY COMPOSITION */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-slate-400 mb-3">
                            <Users className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Dependants</span>
                        </div>
                        <div className="flex justify-between gap-2">
                            {[
                                // FIXED: Updated keys to match 'FamilyComposition' interface (adults, children)
                                { label: 'Main', val: members.main, key: 'main' },
                                { label: 'Adult', val: members.adults, key: 'adults' },
                                { label: 'Child', val: members.children, key: 'children' }
                            ].map((m) => (
                                <div key={m.label} className="flex-1 flex items-center justify-between bg-slate-50 px-2 py-1.5 rounded-xl border border-slate-100">
                                    <span className="text-[9px] text-slate-400 uppercase font-bold">{m.label}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setMembers({ ...members, [m.key]: Math.max(0, members[m.key as keyof typeof members] - 1) })}
                                            className="w-5 h-5 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-400 hover:text-slate-900 shadow-sm text-xs"
                                        >-</button>
                                        <span className="text-xs font-black text-slate-900 w-3 text-center">{m.val}</span>
                                        <button
                                            onClick={() => setMembers({ ...members, [m.key]: members[m.key as keyof typeof members] + 1 })}
                                            className="w-5 h-5 flex items-center justify-center bg-slate-900 border border-slate-900 rounded-full text-white shadow-sm text-xs active:scale-90 transition-transform"
                                        >+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ROW 2: PRIORITY SELECTOR (Segmented Control Style) */}
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2 mb-3 px-1">
                        <HeartPulse className="w-3 h-3" />
                        Primary Goal
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {PRIORITIES.map((p) => {
                            const isSelected = filters.priority === p.id;

                            return (
                                <button
                                    key={p.id}
                                    onClick={() => setFilter('priority', p.id)}
                                    className={clsx(
                                        "flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-200",
                                        isSelected
                                            ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5 font-bold"
                                            : "bg-transparent text-slate-500 hover:bg-white/50 font-medium"
                                    )}
                                >
                                    <div className={clsx(
                                        "p-1.5 rounded-lg",
                                        isSelected ? "bg-slate-100 text-slate-900" : "bg-white/50 text-slate-400"
                                    )}>
                                        <p.icon className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-wide truncate">{p.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}