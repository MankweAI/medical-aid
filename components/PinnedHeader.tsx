'use client';

import { useCompare } from '@/context/CompareContext';
import { X, MapPin } from 'lucide-react';

export default function PinnedHeader() {
    const { activePin, clearPin } = useCompare();

    if (!activePin) return null;

    return (
        <div className="sticky top-20 z-30 px-4 mb-4 animate-in slide-in-from-top-4 fade-in duration-300">
            <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl shadow-slate-900/20 border border-slate-800 relative overflow-hidden backdrop-blur-md">

                {/* Background Decoration */}
                <div className="absolute top-[-10%] right-[-10%] opacity-10 rotate-12">
                    <MapPin className="w-24 h-24 fill-white" />
                </div>

                <div className="flex justify-between items-start relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-blue-600 text-[9px] font-bold px-1.5 py-0.5 rounded text-white uppercase tracking-wider">
                                Reference
                            </span>
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                {activePin.scheme}
                            </span>
                        </div>
                        <h3 className="font-bold text-lg leading-tight">{activePin.name}</h3>
                        <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-xl font-black">
                                {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(activePin.price)}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">/pm</span>
                        </div>
                    </div>

                    <button
                        onClick={clearPin}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors active:scale-95"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}