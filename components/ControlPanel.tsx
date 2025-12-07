'use client';

import { usePersona } from '@/context/PersonaContext';
import {
    Users,
    CreditCard,
    Building2,
    HeartPulse,
    Wallet,
    Baby,
    Shield,
    MapPin,
    PiggyBank,
    Settings2,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

const PRIORITIES = [
    { id: 'budget', label: 'Budget', icon: Wallet },
    { id: 'maternity', label: 'Maternity', icon: Baby },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'chronic', label: 'Chronic', icon: HeartPulse },
    { id: 'comprehensive', label: 'Max Cover', icon: Shield },
    { id: 'savings', label: 'Savings', icon: PiggyBank },
];

export default function ControlPanel() {
    const { state, setIncome, setMembers, setFilter } = usePersona();
    const { income, members, filters } = state;
    const [isExpanded, setIsExpanded] = useState(false);

    // Helper for formatting currency
    const formatMoney = (val: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8 transition-all duration-300">

            {/* COMPACT HEADER (Always Visible) */}
            <div className="p-4 flex items-center justify-between bg-slate-50/50 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-200 rounded-lg text-slate-600">
                        <Settings2 className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Configuration</p>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                            <span>{formatMoney(income)}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span>{members.main + members.adult + members.child} Members</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="capitalize">{filters.priority || 'Standard'}</span>
                        </div>
                    </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
            </div>

            {/* EXPANDED CONTROLS */}
            <div className={clsx(
                "border-t border-slate-100 transition-all duration-500 ease-in-out px-4 overflow-hidden",
                isExpanded ? "max-h-[500px] py-6 opacity-100" : "max-h-0 py-0 opacity-0"
            )}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                    {/* INCOME SLIDER */}
                    <div>
                        <label className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                            <span>Monthly Gross Income</span>
                            <span className="text-slate-900">{formatMoney(income)}</span>
                        </label>
                        <input
                            type="range"
                            min="5000"
                            max="80000"
                            step="1000"
                            value={income}
                            onChange={(e) => setIncome(Number(e.target.value))}
                            className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-medium">
                            <span>R5k</span>
                            <span>R80k+</span>
                        </div>
                    </div>

                    {/* FAMILY COMPOSITION */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                            Family Members
                        </label>
                        <div className="flex gap-2">
                            {[
                                { label: 'Main', val: members.main, key: 'main' },
                                { label: 'Adult', val: members.adult, key: 'adult' },
                                { label: 'Child', val: members.child, key: 'child' }
                            ].map((m) => (
                                <div key={m.label} className="flex-1 flex items-center justify-between bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                                    <span className="text-[10px] text-slate-400 uppercase font-bold">{m.label}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setMembers({ ...members, [m.key]: Math.max(0, members[m.key as keyof typeof members] - 1) })}
                                            className="w-6 h-6 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-400 hover:text-slate-900 shadow-sm text-sm active:scale-95"
                                        >-</button>
                                        <span className="text-sm font-black text-slate-900 w-3 text-center">{m.val}</span>
                                        <button
                                            onClick={() => setMembers({ ...members, [m.key]: members[m.key as keyof typeof members] + 1 })}
                                            className="w-6 h-6 flex items-center justify-center bg-slate-900 border border-slate-900 rounded-full text-white shadow-sm text-sm active:scale-95 hover:bg-slate-800"
                                        >+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PRIORITY SELECTOR */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                        Strategic Priority
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {PRIORITIES.map((p) => {
                            const isSelected = filters.priority === p.id;
                            return (
                                <button
                                    key={p.id}
                                    onClick={() => setFilter('priority', p.id)}
                                    className={clsx(
                                        "flex flex-col items-center gap-2 py-3 rounded-xl transition-all border",
                                        isSelected
                                            ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm"
                                            : "bg-white border-slate-100 text-slate-400 hover:bg-slate-50 hover:border-slate-200"
                                    )}
                                >
                                    <p.icon className={clsx("w-4 h-4", isSelected ? "text-blue-600" : "text-slate-300")} />
                                    <span className="text-[9px] font-bold uppercase tracking-wide">{p.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}