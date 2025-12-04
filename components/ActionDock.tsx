'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Sparkles, Trash2, ArrowRight } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import clsx from 'clsx';
import BottomSheet from '@/components/ui/BottomSheet';

export default function ActionDock() {
    const router = useRouter();
    const { pinnedHistory, setPin, removeFromHistory } = useCompare();
    const [showPins, setShowPins] = useState(false);

    // --- Navigation Logic ---
    const handleDiagnoseClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* --- THE DOCK --- */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-[400px] z-50 flex justify-center px-4 pointer-events-none">
                <div className="glass-panel pointer-events-auto flex items-center gap-4 p-2 pl-6 pr-2 rounded-full shadow-2xl shadow-slate-900/20 bg-slate-900/90 backdrop-blur-md border border-slate-700">

                    {/* 1. DIAGNOSE (Reset) */}
                    <button
                        onClick={handleDiagnoseClick}
                        className="text-slate-400 hover:text-white transition-colors active:scale-95"
                    >
                        <Sparkles className="w-5 h-5" />
                    </button>

                    {/* Divider */}
                    <div className="h-4 w-[1px] bg-slate-700" />

                    {/* 2. PINS (The Collection) */}
                    <button
                        onClick={() => setShowPins(true)}
                        className={clsx(
                            "relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all active:scale-95 font-bold text-xs",
                            showPins ? "bg-white text-slate-900" : "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        )}
                    >
                        <MapPin className="w-4 h-4 fill-current" />
                        <span>{pinnedHistory.length} Pinned</span>
                    </button>

                </div>
            </div>

            {/* --- PINS SHEET --- */}
            <BottomSheet
                isOpen={showPins}
                onClose={() => setShowPins(false)}
                title={`Pinned Collection (${pinnedHistory.length})`}
            >
                <div className="space-y-4 pb-8">
                    {pinnedHistory.length === 0 ? (
                        <div className="text-center py-12 px-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                            <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-3">
                                <MapPin className="w-6 h-6 text-slate-300" />
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm">No pins yet</h4>
                            <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
                                Pin plans to compare them against others. The last plan you pin becomes your "Reference."
                            </p>
                            <button
                                onClick={() => setShowPins(false)}
                                className="w-full py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {pinnedHistory.map((plan, index) => (
                                <div key={plan.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm relative overflow-hidden">
                                    {index === 0 && (
                                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                                    )}
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">{plan.scheme}</p>
                                            {index === 0 && <span className="text-[8px] font-bold bg-blue-100 text-blue-600 px-1.5 rounded">ACTIVE</span>}
                                        </div>
                                        <h4 className="font-bold text-slate-900 text-sm">{plan.name}</h4>
                                        <p className="text-xs text-slate-900 font-black">R{plan.price}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {index !== 0 && (
                                            <button
                                                onClick={() => { setPin(plan); setShowPins(false); }}
                                                className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg"
                                            >
                                                Make Active
                                            </button>
                                        )}
                                        <button
                                            onClick={() => removeFromHistory(plan.id)}
                                            className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => setShowPins(false)}
                                className="w-full mt-4 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm"
                            >
                                Close Collection
                            </button>
                        </div>
                    )}
                </div>
            </BottomSheet>
        </>
    );
}