'use client';

import { usePersona } from '@/context/PersonaContext';
import {
    Users,
    CreditCard, // Replaced Banknote
    Building2,
    HeartPulse,
    Wallet,
    Baby,
    ShieldAlert,
    MapPin,
    PiggyBank
} from 'lucide-react';
import clsx from 'clsx';

const PRIORITIES = [
    // 1. THE FINANCIALLY CONSTRAINED
    { id: 'budget', label: 'Budget Focus', icon: Wallet, desc: 'Lowest Premium' },

    // 2. THE GROWING FAMILY
    { id: 'maternity', label: 'Maternity', icon: Baby, desc: 'Private Birth' },
    { id: 'family', label: 'Young Family', icon: Users, desc: 'Day-to-day GP' },

    // 3. THE CLINICALLY VULNERABLE
    { id: 'chronic', label: 'Chronic Care', icon: HeartPulse, desc: 'High Meds Limit' },
    { id: 'comprehensive', label: 'Peace of Mind', icon: ShieldAlert, desc: 'Max Cover' },

    // 4. THE STRATEGIC OPTIMIZERS
    { id: 'location', label: 'Location Smart', icon: MapPin, desc: 'Coastal/Regional' },
    { id: 'savings', label: 'Savings Builder', icon: PiggyBank, desc: 'High MSA' },
    { id: 'hospital', label: 'Hospital Only', icon: Building2, desc: 'Major Events' }
];

export default function ControlPanel() {
    const { state, setIncome, setMembers, setFilter } = usePersona();
    const { income, members, filters } = state;

    // Helper for formatting currency
    const formatMoney = (val: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6">

            {/* ROW 1: Vital Stats (Income & Family) */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 pb-6 border-b border-slate-100">

                {/* Income Input */}
                <div className="flex-1">
                    <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2 text-slate-500">
                            <CreditCard className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Total Income</span>
                        </div>
                        <span className="text-sm font-black text-slate-900" suppressHydrationWarning>{formatMoney(income)}</span>
                    </div>
                    <input
                        type="range"
                        min="5000"
                        max="80000"
                        step="1000"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                </div>

                {/* Family Counter */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 text-slate-500 mb-3">
                        <Users className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Composition</span>
                    </div>
                    <div className="flex justify-between gap-2">
                        {[
                            { label: 'Main', val: members.main, key: 'main' },
                            { label: 'Adult', val: members.adult, key: 'adult' },
                            { label: 'Child', val: members.child, key: 'child' }
                        ].map((m) => (
                            <div key={m.label} className="flex items-center gap-2 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
                                <span className="text-[10px] text-slate-400 uppercase font-bold">{m.label}</span>
                                <button
                                    onClick={() => setMembers({ ...members, [m.key]: Math.max(0, members[m.key as keyof typeof members] - 1) })}
                                    className="w-5 h-5 flex items-center justify-center bg-white border border-slate-200 rounded text-slate-500 hover:text-slate-900"
                                >-</button>
                                <span className="text-xs font-bold w-3 text-center">{m.val}</span>
                                <button
                                    onClick={() => setMembers({ ...members, [m.key]: members[m.key as keyof typeof members] + 1 })}
                                    className="w-5 h-5 flex items-center justify-center bg-white border border-slate-200 rounded text-slate-500 hover:text-slate-900"
                                >+</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ROW 2: Priority Selectors */}
            <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1 mb-3">
                    <HeartPulse className="w-3 h-3" /> Select Your Priority
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {PRIORITIES.map((p) => {
                        const isSelected = filters.priority === p.id;

                        return (
                            <button
                                key={p.id}
                                onClick={() => setFilter('priority', p.id)}
                                className={clsx(
                                    "p-2 rounded-xl text-left border transition-all flex flex-col gap-1",
                                    isSelected
                                        ? "bg-slate-900 border-slate-900 text-white shadow-md"
                                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                <div className="flex justify-between w-full">
                                    <p className="text-xs font-bold">{p.label}</p>
                                    <p.icon className={clsx("w-3 h-3", isSelected ? "text-emerald-400" : "text-slate-400")} />
                                </div>
                                <p className={clsx("text-[9px]", isSelected ? "text-slate-400" : "text-slate-400")}>{p.desc}</p>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}