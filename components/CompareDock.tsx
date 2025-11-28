'use client';

import { useCompare } from '@/context/CompareContext';
import { X, ArrowRight, Layers } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

export default function CompareDock() {
    const { selectedPlans, togglePlan, clearSelection } = useCompare();

    if (selectedPlans.length === 0) return null;

    return (
        // Changed: Added max-w-[580px] to stay inside the app frame
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-[580px] px-4 z-40 animate-in slide-in-from-bottom-10 fade-in duration-300 pointer-events-none">
            <div className="pointer-events-auto bg-slate-900 text-white p-4 rounded-2xl shadow-2xl shadow-slate-900/50 border border-slate-700 flex items-center justify-between">

                {/* Left: Status */}
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-xl">
                        <Layers className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white">
                            Compare <span className="text-blue-400">({selectedPlans.length}/3)</span>
                        </p>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={clearSelection}
                        className="text-[10px] font-bold text-slate-400 hover:text-white px-2 py-2 uppercase tracking-wider"
                    >
                        Clear
                    </button>
                    <Link
                        href={`/compare?plans=${selectedPlans.map(p => p.id).join(',')}`}
                        className={clsx(
                            "flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all",
                            selectedPlans.length >= 2
                                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
                                : "bg-slate-800 text-slate-500 cursor-not-allowed"
                        )}
                        onClick={(e) => { if (selectedPlans.length < 2) e.preventDefault(); }}
                    >
                        View
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>

            </div>
        </div>
    );
}