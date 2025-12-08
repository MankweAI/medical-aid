'use client';

import { useState } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { Users, Banknote, ChevronDown, Minus, Plus } from 'lucide-react';
import BottomSheet from '@/components/ui/BottomSheet';
import clsx from 'clsx';

export default function ControlPanel() {
    const { state, setIncome, setMembers } = usePersona();
    const { income, members } = state;
    const [activeSheet, setActiveSheet] = useState<'none' | 'income' | 'family'>('none');

    // Helper for display
    const formatMoney = (val: number) =>
        new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    const familyCount = members.main + members.adult + members.child;

    return (
        <div className="mb-8">
            {/* COMPACT CONTEXT BAR */}
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-2">

                {/* 1. Family Trigger */}
                <button
                    onClick={() => setActiveSheet('family')}
                    className="flex-1 flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group active:scale-[0.98]"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-full shadow-sm text-blue-600 group-hover:text-blue-700">
                            <Users className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Covering</span>
                            <span className="block text-sm font-bold text-slate-900">
                                {familyCount === 1 ? 'Just Me' : `${familyCount} People`}
                            </span>
                        </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                </button>

                {/* Divider (Desktop) */}
                <div className="hidden sm:block w-px bg-slate-200 my-2" />

                {/* 2. Income Trigger */}
                <button
                    onClick={() => setActiveSheet('income')}
                    className="flex-1 flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group active:scale-[0.98]"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-full shadow-sm text-emerald-600 group-hover:text-emerald-700">
                            <Banknote className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Household Income</span>
                            <span className="block text-sm font-bold text-slate-900">
                                {formatMoney(income)} <span className="text-slate-400 font-normal">pm</span>
                            </span>
                        </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                </button>
            </div>

            {/* --- SHEET 1: FAMILY CONFIG --- */}
            <BottomSheet isOpen={activeSheet === 'family'} onClose={() => setActiveSheet('none')} title="Who needs cover?">
                <div className="space-y-4">
                    <p className="text-sm text-slate-500 -mt-4 mb-6">
                        Adjusting this updates the monthly premium shown on the card.
                    </p>

                    {/* Main Member (Fixed) */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl opacity-60">
                        <span className="font-bold text-slate-700">Main Member</span>
                        <span className="font-black text-xl text-slate-900 px-4">1</span>
                    </div>

                    {/* Adult Dependants */}
                    <MemberCounter
                        label="Adult Dependants"
                        subLabel="Spouse or parents"
                        count={members.adult}
                        onChange={(val) => setMembers({ ...members, adult: val })}
                    />

                    {/* Child Dependants */}
                    <MemberCounter
                        label="Child Dependants"
                        subLabel="Under 21 years"
                        count={members.child}
                        onChange={(val) => setMembers({ ...members, child: val })}
                    />

                    <button
                        onClick={() => setActiveSheet('none')}
                        className="w-full py-4 mt-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all"
                    >
                        Update Premium
                    </button>
                </div>
            </BottomSheet>

            {/* --- SHEET 2: INCOME CONFIG --- */}
            <BottomSheet isOpen={activeSheet === 'income'} onClose={() => setActiveSheet('none')} title="Gross Income">
                <div className="space-y-8">
                    <div className="text-center pt-4">
                        <span className="text-5xl font-black text-slate-900 tracking-tight">
                            {formatMoney(income)}
                        </span>
                        <p className="text-sm text-slate-500 mt-2 font-medium">Monthly Household Total</p>
                    </div>

                    <div className="px-2">
                        <input
                            type="range"
                            min="5000"
                            max="100000"
                            step="1000"
                            value={income}
                            onChange={(e) => setIncome(Number(e.target.value))}
                            className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-emerald-600"
                        />
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mt-4">
                            <span>R5k</span>
                            <span>R50k</span>
                            <span>R100k+</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setActiveSheet('none')}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all"
                    >
                        Save & Recalculate
                    </button>
                </div>
            </BottomSheet>
        </div>
    );
}

// Sub-component for the counters
function MemberCounter({ label, subLabel, count, onChange }: { label: string, subLabel: string, count: number, onChange: (n: number) => void }) {
    return (
        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div>
                <span className="block font-bold text-slate-900">{label}</span>
                <span className="block text-xs text-slate-400">{subLabel}</span>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => onChange(Math.max(0, count - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-full text-slate-600 hover:bg-slate-100 active:scale-90 transition-all"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <span className="font-black text-xl text-slate-900 w-4 text-center">{count}</span>
                <button
                    onClick={() => onChange(count + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-blue-50 border border-blue-100 rounded-full text-blue-600 hover:bg-blue-100 active:scale-90 transition-all"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}