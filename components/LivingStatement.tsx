'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Check, Activity, Heart, MapPin, Smartphone, Zap } from 'lucide-react';
import BottomSheet from '@/components/ui/BottomSheet';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { usePersona } from '@/context/PersonaContext';
import clsx from 'clsx';
import { SEARCH_INDEX } from '@/data/searchIndex';

interface Props {
    initialIncome: number;
    persona: string;
    need: string;
}

export default function LivingStatement({ initialIncome, persona, need }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // 1. CONSUME GLOBAL STATE (Now includes Geo & Behavior)
    const {
        state,
        setPersona,
        setIncome: setGlobalIncome,
        setPostalCode,
        toggleDigital
    } = usePersona();

    const { postalCode, region, isDigitalActive } = state;

    // Sync initial props to global state on mount
    useEffect(() => {
        setPersona(persona);
        setGlobalIncome(initialIncome);
    }, [persona, initialIncome, setPersona, setGlobalIncome]);

    const [activeSheet, setActiveSheet] = useState<'none' | 'income' | 'need' | 'location'>('none');
    const [localIncome, setLocalIncome] = useState(initialIncome);

    const handleIncomeSave = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('income', localIncome.toString());
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        setGlobalIncome(localIncome);
        setActiveSheet('none');
    };

    const handleNeedSelect = (targetSlug: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('income', localIncome.toString());
        params.delete('need');
        router.push(`/personas/${targetSlug}?${params.toString()}`);
        setActiveSheet('none');
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    // Resolve Display Labels
    const currentIntent = SEARCH_INDEX.find(item => item.slug === persona);
    const currentLabel = currentIntent?.label || 'Medical Aid';

    const regionLabel = region === 'National' ? 'South Africa' :
        region === 'Coastal' ? 'Coastal Zone' :
            region.replace('_Hub', '');

    return (
        <>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-amber-500 fill-current" />
                    Virtual Actuary Diagnosis
                </p>

                <h1 className="text-2xl md:text-4xl font-light text-slate-900 leading-snug">
                    Finding the right{' '}
                    <button
                        onClick={() => setActiveSheet('need')}
                        className="inline-flex items-center gap-1 font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100 active:scale-95 transition-transform hover:bg-blue-100 mx-1 align-baseline"
                    >
                        {currentLabel}
                        <ChevronDown className="w-4 h-4 opacity-50" />
                    </button>
                    {' '}strategy for an{' '}

                    {/* BEHAVIOR TOGGLE (Inline) */}
                    <button
                        onClick={toggleDigital}
                        className={clsx(
                            "inline-flex items-center gap-1.5 font-bold px-2 py-0.5 rounded-lg border active:scale-95 transition-transform mx-1 align-baseline",
                            isDigitalActive
                                ? "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100"
                                : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                        )}
                    >
                        {isDigitalActive ? <Zap className="w-3 h-3 fill-current" /> : null}
                        {isDigitalActive ? 'Active' : 'Standard'}
                    </button>

                    {' '}household earning{' '}

                    {/* INCOME TRIGGER */}
                    <button
                        onClick={() => setActiveSheet('income')}
                        className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 active:scale-95 transition-transform mx-1 align-baseline"
                    >
                        <span suppressHydrationWarning>{formatCurrency(localIncome)}</span>
                        <ChevronDown className="w-4 h-4 opacity-50" />
                    </button>
                    {' '}living in{' '}

                    {/* LOCATION TRIGGER */}
                    <button
                        onClick={() => setActiveSheet('location')}
                        className="inline-flex items-center gap-1 font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200 active:scale-95 transition-transform mx-1 align-baseline"
                    >
                        <MapPin className="w-3 h-3" />
                        {regionLabel}
                        <ChevronDown className="w-4 h-4 opacity-50" />
                    </button>
                    .
                </h1>
            </div>

            {/* --- SHEET 1: INCOME --- */}
            <BottomSheet
                isOpen={activeSheet === 'income'}
                onClose={() => setActiveSheet('none')}
                title="Adjust Household Income"
            >
                <div className="space-y-8">
                    <div className="text-center">
                        <span className="text-4xl font-black text-slate-900 tracking-tight" suppressHydrationWarning>
                            {formatCurrency(localIncome)}
                        </span>
                        <p className="text-sm text-slate-500 mt-2">Gross Monthly Income</p>
                    </div>
                    <input
                        type="range"
                        min="5000"
                        max="60000"
                        step="1000"
                        value={localIncome}
                        onChange={(e) => setLocalIncome(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-xs text-slate-400 font-medium px-1">
                        <span>R5k</span>
                        <span>R30k</span>
                        <span>R60k+</span>
                    </div>
                    <button
                        onClick={handleIncomeSave}
                        className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/20 active:scale-95 transition-all"
                    >
                        Update Results
                    </button>
                </div>
            </BottomSheet>

            {/* --- SHEET 2: INTENT --- */}
            <BottomSheet
                isOpen={activeSheet === 'need'}
                onClose={() => setActiveSheet('none')}
                title="What is your priority?"
            >
                <div className="grid gap-3 pb-6 max-h-[60vh] overflow-y-auto">
                    {SEARCH_INDEX.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleNeedSelect(item.slug)}
                            className={clsx(
                                "flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98]",
                                persona === item.slug
                                    ? "bg-blue-50 border-blue-200 shadow-sm"
                                    : "bg-white border-slate-100 hover:border-blue-100"
                            )}
                        >
                            <div className={clsx(
                                "p-3 rounded-full",
                                item.category === 'Health' ? "bg-rose-50 text-rose-500" :
                                    item.category === 'Location' ? "bg-amber-50 text-amber-500" :
                                        "bg-blue-50 text-blue-500"
                            )}>
                                {item.category === 'Health' ? <Heart className="w-5 h-5" /> :
                                    item.category === 'Location' ? <MapPin className="w-5 h-5" /> :
                                        <Activity className="w-5 h-5" />}
                            </div>
                            <div className="text-left flex-grow">
                                <span className={clsx("font-bold block", persona === item.slug ? "text-blue-900" : "text-slate-700")}>
                                    {item.label}
                                </span>
                            </div>
                            {persona === item.slug && <Check className="w-5 h-5 text-blue-600" />}
                        </button>
                    ))}
                </div>
            </BottomSheet>

            {/* --- SHEET 3: LOCATION (New) --- */}
            <BottomSheet
                isOpen={activeSheet === 'location'}
                onClose={() => setActiveSheet('none')}
                title="Set Location"
            >
                <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3">
                        <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-800 leading-relaxed">
                            We use your postal code to check for <strong>Coastal Discounts</strong> (approx. 20% off) and <strong>Network Hubs</strong>.
                        </p>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Postal Code</label>
                        <input
                            type="text"
                            maxLength={4}
                            placeholder="e.g. 8001"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full text-center text-3xl font-black text-slate-900 p-4 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Real-time Feedback */}
                    <div className="text-center">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Detected Zone</p>
                        <div className={clsx(
                            "inline-block px-4 py-2 rounded-full text-sm font-bold",
                            region === 'National' ? "bg-slate-100 text-slate-500" : "bg-emerald-100 text-emerald-700"
                        )}>
                            {region === 'National' ? 'Standard Rate' :
                                region === 'Coastal' ? '✅ Coastal Savings Active' :
                                    `✅ ${region.replace('_', ' ')} Hub`}
                        </div>
                    </div>

                    <button
                        onClick={() => setActiveSheet('none')}
                        className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/20 active:scale-95 transition-all"
                    >
                        Confirm Location
                    </button>
                </div>
            </BottomSheet>
        </>
    );
}