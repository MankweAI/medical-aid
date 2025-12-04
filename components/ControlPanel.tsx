'use client';

import { useState } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { Users, MapPin, Check, ChevronDown, SlidersHorizontal } from 'lucide-react';
import clsx from 'clsx';

// Constants for Dropdowns
const LOCATIONS = ['Any', 'Coastal', 'Network', 'State'];
const MUST_HAVES = [
    { id: 'private_ward', label: 'Private Ward' },
    { id: 'gap_cover', label: 'Gap Cover' },
    { id: 'specialist', label: 'Specialist' }
];

export default function ControlPanel() {
    const { state, setIncome, setMembers, setFilter } = usePersona();
    const [expanded, setExpanded] = useState(false);

    // Local Formatters
    const formatMoney = (val: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm mb-8 transition-all duration-300">

            {/* TOP BAR: Primary Controls (Always Visible) */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                {/* 1. Income Slider */}
                <div>
                    <div className="flex justify-between items-end mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Income</label>
                        <span className="text-xl font-black text-slate-900" suppressHydrationWarning>{formatMoney(state.income)}</span>
                    </div>
                    <input
                        type="range"
                        min="5000"
                        max="80000"
                        step="1000"
                        value={state.income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
                    />
                </div>

                {/* 2. Family Composition */}
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full shadow-sm text-slate-400">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-slate-700">Members</span>
                    </div>
                    <div className="flex gap-4">
                        {['Main', 'Adult', 'Child'].map((type) => {
                            const key = type.toLowerCase() as keyof typeof state.members;
                            return (
                                <div key={type} className="flex flex-col items-center">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase mb-1">{type}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setMembers({ ...state.members, [key]: Math.max(type === 'Main' ? 1 : 0, state.members[key] - 1) })}
                                            className="w-6 h-6 flex items-center justify-center bg-white rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 font-bold"
                                        >-</button>
                                        <span className="text-sm font-bold text-slate-900 w-3 text-center">{state.members[key]}</span>
                                        <button
                                            onClick={() => setMembers({ ...state.members, [key]: state.members[key] + 1 })}
                                            className="w-6 h-6 flex items-center justify-center bg-slate-900 rounded-full text-white shadow-sm hover:bg-slate-800 font-bold"
                                        >+</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* TOGGLE: Advanced Filters */}
            <div
                onClick={() => setExpanded(!expanded)}
                className="bg-slate-50/50 border-t border-slate-100 p-2 flex justify-center cursor-pointer hover:bg-slate-50 transition-colors"
            >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <SlidersHorizontal className="w-3 h-3" />
                    {expanded ? 'Hide Filters' : 'Customize Requirements'}
                    <ChevronDown className={clsx("w-3 h-3 transition-transform", expanded && "rotate-180")} />
                </div>
            </div>

            {/* EXPANDED PANEL: Location & Must Haves */}
            {expanded && (
                <div className="p-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top-2">

                    {/* Location Preference */}
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Hospital Network</label>
                        <div className="flex flex-wrap gap-2">
                            {LOCATIONS.map(loc => (
                                <button
                                    key={loc}
                                    onClick={() => setFilter('location', loc)}
                                    className={clsx(
                                        "px-4 py-2 rounded-xl text-xs font-bold border transition-all",
                                        state.filters.location === loc
                                            ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                            : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                                    )}
                                >
                                    {loc}
                                </button>
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 leading-tight">
                            "Network" plans are cheaper but restrict you to specific lists.
                        </p>
                    </div>

                    {/* Must Haves */}
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Must Haves</label>
                        <div className="flex flex-wrap gap-2">
                            {MUST_HAVES.map(opt => {
                                const isActive = state.filters.mustHaves.includes(opt.id);
                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => {
                                            const newFilters = isActive
                                                ? state.filters.mustHaves.filter(f => f !== opt.id)
                                                : [...state.filters.mustHaves, opt.id];
                                            setFilter('mustHaves', newFilters);
                                        }}
                                        className={clsx(
                                            "px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2",
                                            isActive
                                                ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                                                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                                        )}
                                    >
                                        {isActive && <Check className="w-3 h-3" />}
                                        {opt.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
