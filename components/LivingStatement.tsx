'use client';

import { useState, useEffect } from 'react'; // Import useEffect
import { ChevronDown, Baby, Pill, Wallet, Zap, Check } from 'lucide-react';
import BottomSheet from '@/components/ui/BottomSheet';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { usePersona } from '@/context/PersonaContext'; // Import Context
import clsx from 'clsx';

interface Props {
    initialIncome: number;
    persona: string;
    need: string;
}

const NEEDS = [
    { label: 'Maternity', icon: Baby, route: '/personas/family-planner', param: 'maternity' },
    { label: 'Chronic Care', icon: Pill, route: '/personas/chronic-warrior', param: 'chronic' },
    { label: 'Budget', icon: Wallet, route: '/personas/budget-conscious', param: 'affordability' },
    { label: 'Digital', icon: Zap, route: '/personas/digital-native', param: 'tech' }
];

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

    // ... (Rest of your existing LivingStatement code: activeSheet, handlers, UI) ...
    // Keep the existing render logic exactly as it was.

    const [activeSheet, setActiveSheet] = useState<'none' | 'income' | 'need'>('none');
    const [income, setIncome] = useState(initialIncome);

    const handleIncomeSave = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('income', income.toString());
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        setGlobalIncome(income); // Update global context too
        setActiveSheet('none');
    };

    // ... rest of handleNeedSelect and render ...
    const handleNeedSelect = (target: typeof NEEDS[0]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('need', target.param);
        params.set('income', income.toString());
        router.push(`${target.route}?${params.toString()}`);
        setActiveSheet('none');
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    const currentNeedLabel = NEEDS.find(n => n.param === need)?.label || 'Medical Aid';

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
                        {currentNeedLabel}
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

            {/* Sheets remain the same */}
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

            <BottomSheet
                isOpen={activeSheet === 'need'}
                onClose={() => setActiveSheet('none')}
                title="What is your priority?"
            >
                <div className="grid gap-3 pb-6">
                    {NEEDS.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleNeedSelect(item)}
                            className={clsx(
                                "flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98]",
                                need === item.param
                                    ? "bg-blue-50 border-blue-200 shadow-sm"
                                    : "bg-white border-slate-100 hover:border-blue-100"
                            )}
                        >
                            <div className={clsx(
                                "p-3 rounded-full",
                                need === item.param ? "bg-blue-200 text-blue-700" : "bg-slate-50 text-slate-500"
                            )}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div className="text-left flex-grow">
                                <span className={clsx("font-bold block", need === item.param ? "text-blue-900" : "text-slate-700")}>
                                    {item.label}
                                </span>
                            </div>
                            {need === item.param && <Check className="w-5 h-5 text-blue-600" />}
                        </button>
                    ))}
                </div>
            </BottomSheet>
        </>
    );
}