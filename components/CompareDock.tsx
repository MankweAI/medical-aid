'use client';

import { useCompare } from '@/context/CompareContext';
import { ArrowRight, Layers, X } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export default function CompareDock() {
    // 1. FIX: Use 'pinnedHistory' instead of 'selectedPlans'
    const { pinnedHistory, removeFromHistory } = useCompare();
    const [isMounted, setIsMounted] = useState(false);

    // 2. FIX: Hydration safety
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || pinnedHistory.length === 0) return null;

    // Helper to clear all pins (since 'clearSelection' doesn't exist on context)
    const handleClear = () => {
        pinnedHistory.forEach(plan => removeFromHistory(plan.id));
    };

    return (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-[580px] px-4 z-40 animate-in slide-in-from-bottom-10 fade-in duration-300 pointer-events-none">
            <div className="pointer-events-auto bg-slate-900 text-white p-4 rounded-2xl shadow-2xl shadow-slate-900/50 border border-slate-700 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-xl relative">
                        <Layers className="w-4 h-4 text-white" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white">
                            Compare <span className="text-blue-400">({pinnedHistory.length})</span>
                        </p>
                        <p className="text-[10px] text-slate-400">
                            {pinnedHistory.length < 2 ? "Select 1 more to battle" : "Ready to analyze"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={handleClear} className="p-2 text-slate-400 hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                    <Link
                        href={`/compare?plans=${pinnedHistory.map(p => p.id).join(',')}`}
                        className={clsx(
                            "flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95",
                            pinnedHistory.length >= 2
                                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
                                : "bg-slate-800 text-slate-500 cursor-not-allowed"
                        )}
                        onClick={(e) => { if (pinnedHistory.length < 2) e.preventDefault(); }}
                    >
                        Analyze
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </div>
    );
}