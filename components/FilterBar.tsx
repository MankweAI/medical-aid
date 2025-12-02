'use client';

import { useState, useEffect } from 'react';
import { Users, Wallet, MapPin, Target, ChevronDown, Check } from 'lucide-react';
import { usePersona } from '@/context/PersonaContext';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import BottomSheet from '@/components/ui/BottomSheet';
import { SEARCH_INDEX } from '@/data/searchIndex';
import { resolveRegion } from '@/utils/geo';

export default function FilterBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // 1. Global State
    const {
        state,
        setMembers,
        setIncome,
        setPostalCode,
        setPersona,
    } = usePersona();

    const { members, income, postalCode, region, persona } = state;

    // 2. UI State
    const [activeSheet, setActiveSheet] = useState<'none' | 'profile' | 'income' | 'location' | 'goal'>('none');
    const [localIncome, setLocalIncome] = useState(income);
    const [localPostal, setLocalPostal] = useState(postalCode);

    // Sync local state when global state changes (e.g. on page load/hydration)
    useEffect(() => {
        setLocalIncome(income);
        setLocalPostal(postalCode);
    }, [income, postalCode]);

    // --- HANDLERS ---

    // Income: Commit to global state & URL
    const commitIncome = () => {
        setIncome(localIncome);
        const params = new URLSearchParams(searchParams.toString());
        params.set('income', localIncome.toString());
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        setActiveSheet('none');
    };

    // Location: Commit to global state
    const commitLocation = () => {
        setPostalCode(localPostal);
        setActiveSheet('none');
    };

    // Goal (Persona): Commit & Navigate
    const switchPersona = (slug: string) => {
        setPersona(slug); // Immediate UI update
        // We maintain the current income in the URL when switching
        router.push(`/personas/${slug}?income=${income}`);
        setActiveSheet('none');
    };

    // Action Button Logic: Scroll to results or Prompt for Goal
    const handleRunAnalysis = () => {
        if (!persona) {
            setActiveSheet('goal');
            return;
        }
        // Scroll to feed if on the right page, or just purely scroll down 
        // (Assuming the feed is typically below the fold on Mobile)
        window.scrollTo({ top: 500, behavior: 'smooth' });
    };

    // Derived Labels
    const memberCount = members.main + members.adult + members.child;
    const currentIntent = SEARCH_INDEX.find(i => i.slug === persona)?.label || 'Select Goal';
    const regionLabel = !region || region === 'National' ? 'National' : region.replace('_Hub', '');

    return (
        <>
            {/* --- THE CONTROL BAR --- */}
            <div className="sticky top-6 z-40 mx-4 md:max-w-5xl md:mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl shadow-slate-900/10 rounded-2xl p-1.5 flex flex-col md:flex-row gap-1">

                    {/* SEGMENT 1: PROFILE */}
                    <button
                        onClick={() => setActiveSheet('profile')}
                        className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-all group text-left"
                    >
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <Users className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Profile</p>
                            <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                                {memberCount} Members <ChevronDown className="w-3 h-3 text-slate-300" />
                            </p>
                        </div>
                    </button>

                    <div className="hidden md:block w-px h-8 bg-slate-100 my-auto" />

                    {/* SEGMENT 2: INCOME */}
                    <button
                        onClick={() => setActiveSheet('income')}
                        className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-all group text-left"
                    >
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-100 transition-colors">
                            <Wallet className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Household</p>
                            <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                                R{income.toLocaleString('en-US')} <ChevronDown className="w-3 h-3 text-slate-300" />
                            </p>
                        </div>
                    </button>

                    <div className="hidden md:block w-px h-8 bg-slate-100 my-auto" />

                    {/* SEGMENT 3: LOCATION */}
                    <button
                        onClick={() => setActiveSheet('location')}
                        className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-all group text-left"
                    >
                        <div className={clsx("p-2 rounded-lg transition-colors", region === 'National' ? "bg-slate-100 text-slate-500" : "bg-amber-50 text-amber-600")}>
                            <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Location</p>
                            <p className="text-sm font-bold text-slate-900 flex items-center gap-1 truncate max-w-[100px] md:max-w-full">
                                {regionLabel} <ChevronDown className="w-3 h-3 text-slate-300" />
                            </p>
                        </div>
                    </button>

                    <div className="hidden md:block w-px h-8 bg-slate-100 my-auto" />

                    {/* SEGMENT 4: GOAL */}
                    <button
                        onClick={() => setActiveSheet('goal')}
                        className="flex-[1.2] flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-all group text-left"
                    >
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-100 transition-colors">
                            <Target className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Strategy</p>
                            <p className="text-sm font-bold text-slate-900 truncate">
                                {currentIntent}
                            </p>
                        </div>
                    </button>

                    {/* ACTION BUTTON */}
                    <button
                        onClick={handleRunAnalysis}
                        className="hidden md:flex bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-slate-900/20 active:scale-95 transition-all items-center justify-center h-full ml-2"
                    >
                        {persona ? "Run Analysis" : "Start"}
                    </button>
                </div>
            </div>

            {/* --- SHEET: PROFILE --- */}
            <BottomSheet isOpen={activeSheet === 'profile'} onClose={() => setActiveSheet('none')} title="Family Composition">
                <div className="space-y-6">
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4">
                        {['Main', 'Adult', 'Child'].map((type) => (
                            <div key={type} className="flex-1 flex flex-col items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <span className="text-[10px] uppercase font-bold text-slate-400 mb-3">{type}</span>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setMembers({ ...members, [type.toLowerCase()]: Math.max(type === 'Main' ? 1 : 0, (members as any)[type.toLowerCase()] - 1) })}
                                        className="w-10 h-10 bg-white rounded-full shadow-sm text-slate-600 font-bold border border-slate-200 flex items-center justify-center active:scale-95"
                                    >-</button>
                                    <span className="font-black text-2xl w-6 text-center">{(members as any)[type.toLowerCase()]}</span>
                                    <button
                                        onClick={() => setMembers({ ...members, [type.toLowerCase()]: (members as any)[type.toLowerCase()] + 1 })}
                                        className="w-10 h-10 bg-blue-600 rounded-full shadow-lg shadow-blue-200 text-white font-bold flex items-center justify-center active:scale-95"
                                    >+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setActiveSheet('none')} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl">Done</button>
                </div>
            </BottomSheet>

            {/* --- SHEET: INCOME --- */}
            <BottomSheet isOpen={activeSheet === 'income'} onClose={() => setActiveSheet('none')} title="Monthly Income">
                <div className="space-y-8">
                    <div className="text-center">
                        <span className="text-5xl font-black text-slate-900 tracking-tight">
                            R{localIncome.toLocaleString('en-US')}
                        </span>
                        <p className="text-xs font-bold text-slate-400 uppercase mt-2 tracking-widest">Gross Monthly</p>
                    </div>
                    <input
                        type="range"
                        min="5000"
                        max="80000"
                        step="1000"
                        value={localIncome}
                        onChange={(e) => setLocalIncome(Number(e.target.value))}
                        className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <button onClick={commitIncome} className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-emerald-900/20">Update Results</button>
                </div>
            </BottomSheet>

            {/* --- SHEET: LOCATION --- */}
            <BottomSheet isOpen={activeSheet === 'location'} onClose={() => setActiveSheet('none')} title="Location">
                <div className="space-y-6">
                    <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
                        <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-800 leading-relaxed">
                            <strong>Why do we need this?</strong> Certain plans offer massive discounts (up to 20%) if you live in coastal regions or specific network hubs like Polokwane.
                        </p>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Postal Code</label>
                        <input
                            type="text"
                            maxLength={4}
                            placeholder="e.g. 8001"
                            value={localPostal}
                            onChange={(e) => setLocalPostal(e.target.value)}
                            className="w-full text-center text-4xl font-black text-slate-900 p-6 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-2">Detected Zone</p>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 font-bold text-sm">
                            {resolveRegion(localPostal) === 'National' ? 'Standard Region' : resolveRegion(localPostal).replace('_', ' ')}
                        </span>
                    </div>
                    <button onClick={commitLocation} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl">Confirm Location</button>
                </div>
            </BottomSheet>

            {/* --- SHEET: GOAL (Persona) --- */}
            <BottomSheet isOpen={activeSheet === 'goal'} onClose={() => setActiveSheet('none')} title="Select Strategy">
                <div className="grid gap-3 max-h-[60vh] overflow-y-auto pb-4">
                    {SEARCH_INDEX.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => switchPersona(item.slug)}
                            className={clsx(
                                "flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98] text-left",
                                persona === item.slug ? "bg-blue-50 border-blue-200" : "bg-white border-slate-100"
                            )}
                        >
                            <div className={clsx("p-3 rounded-full shrink-0",
                                item.category === 'Health' ? "bg-rose-50 text-rose-500" :
                                    item.category === 'Location' ? "bg-amber-50 text-amber-500" :
                                        "bg-blue-50 text-blue-500"
                            )}>
                                <Target className="w-5 h-5" />
                            </div>
                            <div className="flex-grow">
                                <span className={clsx("font-bold block text-sm", persona === item.slug ? "text-blue-900" : "text-slate-900")}>
                                    {item.label}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.category}</span>
                            </div>
                            {persona === item.slug && <Check className="w-5 h-5 text-blue-600" />}
                        </button>
                    ))}
                </div>
            </BottomSheet>
        </>
    );
}