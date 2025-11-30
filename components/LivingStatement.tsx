'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Check, Activity, Heart, MapPin } from 'lucide-react';
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

    // SYNC TO GLOBAL CONTEXT
    const { setPersona, setIncome: setGlobalIncome } = usePersona();

    useEffect(() => {
        setPersona(persona);
        setGlobalIncome(initialIncome);
    }, [persona, initialIncome, setPersona, setGlobalIncome]);

    const [activeSheet, setActiveSheet] = useState<'none' | 'income' | 'need'>('none');
    const [income, setIncome] = useState(initialIncome);

    const handleIncomeSave = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('income', income.toString());
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        setGlobalIncome(income);
        setActiveSheet('none');
    };

    const handleNeedSelect = (targetSlug: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('income', income.toString());
        // We don't need 'need' param anymore as the slug defines the intent
        params.delete('need');
        router.push(`/personas/${targetSlug}?${params.toString()}`);
        setActiveSheet('none');
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    // Find the current intent label based on the persona slug
    const currentIntent = SEARCH_INDEX.find(item => item.slug === persona);
    const currentLabel = currentIntent?.label || 'Medical Aid';

    return (
        <>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Virtual Actuary Diagnosis
                </p>

                <h1 className="text-2xl md:text-3xl font-light text-slate-900 leading-snug">
                    Finding the right{' '}
                    <button
                        onClick={() => setActiveSheet('need')}
                        className="inline-flex items-center gap-1 font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100 active:scale-95 transition-transform mx-1"
                    >
                        {currentLabel}
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    {' '}strategy for a{' '}
                    <button
                        onClick={() => setActiveSheet('income')}
                        className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 active:scale-95 transition-transform mx-1"
                    >
                        <span suppressHydrationWarning>{formatCurrency(income)}</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    {' '}household.
                </h1>
            </div>

            {/* Income Sheet */}
            <BottomSheet
                isOpen={activeSheet === 'income'}
                onClose={() => setActiveSheet('none')}
                title="Adjust Household Income"
            >
                <div className="space-y-8">
                    <div className="text-center">
                        <span className="text-4xl font-black text-slate-900 tracking-tight" suppressHydrationWarning>
                            {formatCurrency(income)}
                        </span>
                        <p className="text-sm text-slate-500 mt-2">Gross Monthly Income</p>
                    </div>
                    <input
                        type="range"
                        min="5000"
                        max="60000"
                        step="1000"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
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

            {/* Need/Intent Sheet */}
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
        </>
    );
}