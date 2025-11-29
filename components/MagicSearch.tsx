'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import BottomSheet from '@/components/ui/BottomSheet';

// --- Configuration ---
const INTENTS = [
    { label: 'cover pregnancy', value: 'maternity', route: '/personas/family-planner' },
    { label: 'manage chronic illness', value: 'chronic', route: '/personas/chronic-warrior' },
    { label: 'save money', value: 'affordability', route: '/personas/budget-conscious' },
    { label: 'get digital cover', value: 'tech', route: '/personas/digital-native' },
];

const BENEFICIARIES = [
    { label: 'my family', icon: '👨‍👩‍👧‍👦' },
    { label: 'myself', icon: '👤' },
    { label: 'my parents', icon: '👴' },
];

export default function MagicSearch() {
    const router = useRouter();

    // State
    const [intent, setIntent] = useState(INTENTS[0]);
    const [who, setWho] = useState(BENEFICIARIES[0]);
    const [activeSheet, setActiveSheet] = useState<'none' | 'intent' | 'who'>('none');

    // Routing Logic
    const handleDiagnose = () => {
        const query = `need=${intent.value}&who=${who.label}`;
        router.push(`${intent.route}?${query}`);
    };

    return (
        <div className="w-full relative z-20">

            {/* The Sentence Builder */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl shadow-blue-900/10 rounded-[32px] p-8 text-center transition-all hover:scale-[1.01] duration-500">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                    Start Diagnosis
                </p>

                <div className="text-2xl md:text-3xl font-light text-slate-900 leading-relaxed">
                    I am looking to <br className="md:hidden" />

                    {/* Intent Selector */}
                    <button
                        onClick={() => setActiveSheet('intent')}
                        className="inline-flex items-center gap-1 font-bold text-blue-600 bg-blue-50/50 px-3 py-1 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors mx-1 active:scale-95"
                    >
                        {intent.label} <ChevronDown className="w-5 h-5 opacity-50" />
                    </button>

                    <br className="hidden md:block" />
                    on medical aid for

                    {/* Who Selector */}
                    <button
                        onClick={() => setActiveSheet('who')}
                        className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50/50 px-3 py-1 rounded-xl border border-emerald-100 hover:bg-emerald-100 transition-colors mx-1 active:scale-95"
                    >
                        {who.label} <ChevronDown className="w-5 h-5 opacity-50" />
                    </button>
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleDiagnose}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 transition-all active:scale-95 group"
                    >
                        Run Analysis
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Sheet 1: Intent Selection */}
            <BottomSheet
                isOpen={activeSheet === 'intent'}
                onClose={() => setActiveSheet('none')}
                title="What is your main goal?"
            >
                <div className="grid gap-3">
                    {INTENTS.map((item) => (
                        <button
                            key={item.value}
                            onClick={() => { setIntent(item); setActiveSheet('none'); }}
                            className={clsx(
                                "p-4 rounded-2xl text-left font-bold text-sm border transition-all",
                                intent.value === item.value
                                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-900/20"
                                    : "bg-slate-50 text-slate-600 border-transparent hover:bg-slate-100"
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </BottomSheet>

            {/* Sheet 2: Who Selection */}
            <BottomSheet
                isOpen={activeSheet === 'who'}
                onClose={() => setActiveSheet('none')}
                title="Who needs cover?"
            >
                <div className="grid gap-3">
                    {BENEFICIARIES.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => { setWho(item); setActiveSheet('none'); }}
                            className={clsx(
                                "p-4 rounded-2xl text-left font-bold text-sm border transition-all flex items-center gap-3",
                                who.label === item.label
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-900/20"
                                    : "bg-slate-50 text-slate-600 border-transparent hover:bg-slate-100"
                            )}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </div>
            </BottomSheet>
        </div>
    );
}