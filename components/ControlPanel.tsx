'use client';

import { usePersona } from '@/context/PersonaContext';
import { Users, Banknote, Building2, HeartPulse, Wallet, Baby } from 'lucide-react';
import clsx from 'clsx';

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
                            <Banknote className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Total Income</span>
                        </div>
                        <span className="text-sm font-black text-slate-900">{formatMoney(income)}</span>
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

            {/* ROW 2: Plan Filters (Toggles) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                {/* Network */}
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Building2 className="w-3 h-3" /> Hospital
                    </span>
                    <select
                        value={filters.network || 'Any'}
                        onChange={(e) => setFilter('network', e.target.value === 'Any' ? null : e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                        <option value="Any">Any Hospital</option>
                        <option value="Network">Network Only</option>
                        <option value="Coastal">Coastal Only</option>
                        <option value="State">State/Regional</option>
                    </select>
                </div>

                {/* Savings */}
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Wallet className="w-3 h-3" /> Savings
                    </span>
                    <button
                        onClick={() => setFilter('savings', filters.savings === 'Yes' ? null : 'Yes')}
                        className={clsx(
                            "w-full p-2 rounded-lg text-xs font-bold border transition-colors text-left",
                            filters.savings === 'Yes'
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        )}
                    >
                        {filters.savings === 'Yes' ? 'Savings Required' : 'Optional'}
                    </button>
                </div>

                {/* Chronic */}
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <HeartPulse className="w-3 h-3" /> Chronic
                    </span>
                    <select
                        value={filters.chronic || 'Basic'}
                        onChange={(e) => setFilter('chronic', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                        <option value="Basic">Basic (PMB)</option>
                        <option value="Comprehensive">Comprehensive</option>
                    </select>
                </div>

                {/* Maternity */}
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Baby className="w-3 h-3" /> Special
                    </span>
                    <button
                        onClick={() => setFilter('maternity', !filters.maternity)}
                        className={clsx(
                            "w-full p-2 rounded-lg text-xs font-bold border transition-colors text-left",
                            filters.maternity
                                ? "bg-rose-50 border-rose-200 text-rose-700"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        )}
                    >
                        {filters.maternity ? 'Maternity Cover' : 'No Extras'}
                    </button>
                </div>

            </div>
        </div>
    );
}