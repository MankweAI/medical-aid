'use client';

import { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import BottomSheet from '@/components/ui/BottomSheet';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface Props {
    initialIncome: number;
    persona: string;
    need: string;
}

export default function LivingStatement({ initialIncome, persona, need }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isIncomeSheetOpen, setIncomeSheetOpen] = useState(false);
    const [income, setIncome] = useState(initialIncome);

    // Updates URL without refreshing the page (Client-Side Navigation)
    const handleIncomeSave = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('income', income.toString());
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        setIncomeSheetOpen(false);
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    return (
        <>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Virtual Actuary Diagnosis
                </p>

                {/* The Natural Language Form */}
                <h1 className="text-2xl md:text-3xl font-light text-slate-900 leading-snug">
                    Finding the right{' '}
                    <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100 whitespace-nowrap">
                        {need || 'Medical Aid'}
                    </span>
                    {' '}strategy for a{' '}
                    <button
                        onClick={() => setIncomeSheetOpen(true)}
                        className="inline-flex items-center gap-1 font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100 active:scale-95 transition-transform"
                    >
                        {formatCurrency(income)}
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    {' '}household.
                </h1>
            </div>

            {/* Income Slider Sheet */}
            <BottomSheet
                isOpen={isIncomeSheetOpen}
                onClose={() => setIncomeSheetOpen(false)}
                title="Adjust Household Income"
            >
                <div className="space-y-8">
                    <div className="text-center">
                        <span className="text-4xl font-black text-slate-900 tracking-tight">
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
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
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
        </>
    );
}
