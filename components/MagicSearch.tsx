'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, ArrowRight, MapPin, Activity, Heart, Zap } from 'lucide-react';
import clsx from 'clsx';
import BottomSheet from '@/components/ui/BottomSheet';
import { SEARCH_INDEX, BENEFICIARIES } from '@/data/searchIndex';

export default function MagicSearch() {
    const router = useRouter();

    // State
    const [selectedIntent, setSelectedIntent] = useState(SEARCH_INDEX[0]);
    const [selectedWho, setSelectedWho] = useState(BENEFICIARIES[0]);
    const [activeSheet, setActiveSheet] = useState<'none' | 'intent' | 'who'>('none');
    const [searchQuery, setSearchQuery] = useState('');

    // --- Filter Logic ---
    const filteredIntents = useMemo(() => {
        if (!searchQuery) return SEARCH_INDEX;
        const lower = searchQuery.toLowerCase();
        return SEARCH_INDEX.filter(item =>
            item.label.includes(lower) ||
            item.tags.some(t => t.includes(lower))
        );
    }, [searchQuery]);

    // --- Routing Logic ---
    const handleDiagnose = () => {
        // Route to the specific "Persona Page"
        const query = `who=${selectedWho.value}&ref=magic_search`;
        router.push(`/personas/${selectedIntent.slug}?${query}`);
    };

    return (
        <div className="w-full relative z-20">

            {/* The Sentence Builder */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl shadow-blue-900/10 rounded-[32px] p-8 text-center transition-all hover:scale-[1.01] duration-500">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
                    <Zap className="w-3 h-3 text-amber-500 fill-current" />
                    AI Diagnosis Engine
                </p>

                <div className="text-2xl md:text-3xl font-light text-slate-900 leading-relaxed">
                    I need a plan to <br className="md:hidden" />

                    {/* Intent Trigger */}
                    <button
                        onClick={() => { setActiveSheet('intent'); setSearchQuery(''); }}
                        className="inline-flex items-center gap-1 font-bold text-blue-600 bg-blue-50/50 px-3 py-1 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors mx-1 active:scale-95"
                    >
                        {selectedIntent.label} <ChevronDown className="w-5 h-5 opacity-50" />
                    </button>

                    <br className="hidden md:block" />
                    for

                    {/* Who Trigger */}
                    <button
                        onClick={() => setActiveSheet('who')}
                        className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50/50 px-3 py-1 rounded-xl border border-emerald-100 hover:bg-emerald-100 transition-colors mx-1 active:scale-95"
                    >
                        {selectedWho.label} <ChevronDown className="w-5 h-5 opacity-50" />
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

            {/* SHEET 1: The Command Palette (Intents) */}
            <BottomSheet
                isOpen={activeSheet === 'intent'}
                onClose={() => setActiveSheet('none')}
                title="What is your priority?"
            >
                <div className="space-y-4 h-[60vh]">
                    {/* Search Input */}
                    <div className="relative sticky top-0 bg-white z-10 pb-2">
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <input
                            autoFocus
                            type="text"
                            placeholder="Type 'pregnancy', 'cancer', 'Durban'..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    {/* Results List */}
                    <div className="space-y-2 overflow-y-auto pb-8">
                        {filteredIntents.length > 0 ? (
                            filteredIntents.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => { setSelectedIntent(item); setActiveSheet('none'); }}
                                    className={clsx(
                                        "w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between group",
                                        selectedIntent.slug === item.slug
                                            ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm"
                                            : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Dynamic Icon based on Category */}
                                        <div className={clsx("p-2 rounded-full",
                                            item.category === 'Health' ? "bg-rose-50 text-rose-500" :
                                                item.category === 'Location' ? "bg-amber-50 text-amber-500" :
                                                    "bg-blue-50 text-blue-500"
                                        )}>
                                            {item.category === 'Health' ? <Heart className="w-4 h-4" /> :
                                                item.category === 'Location' ? <MapPin className="w-4 h-4" /> :
                                                    <Activity className="w-4 h-4" />}
                                        </div>
                                        <span className="font-bold text-sm">{item.label}</span>
                                    </div>
                                    {selectedIntent.slug === item.slug && <ArrowRight className="w-4 h-4" />}
                                </button>
                            ))
                        ) : (
                            <div className="text-center py-8 text-slate-400 text-sm">
                                <p>No specific strategy found.</p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="text-blue-600 font-bold mt-2 hover:underline"
                                >
                                    Show all options
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </BottomSheet>

            {/* SHEET 2: Who Selection */}
            <BottomSheet
                isOpen={activeSheet === 'who'}
                onClose={() => setActiveSheet('none')}
                title="Who needs cover?"
            >
                <div className="grid gap-3 pb-6">
                    {BENEFICIARIES.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => { setSelectedWho(item); setActiveSheet('none'); }}
                            className={clsx(
                                "p-4 rounded-2xl text-left font-bold text-sm border transition-all flex items-center gap-3",
                                selectedWho.label === item.label
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