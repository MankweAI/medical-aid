'use client';

import { useState } from 'react';
import { MapPin, X, Trash2 } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import clsx from 'clsx';
import BottomSheet from '@/components/ui/BottomSheet';

export default function PinsFab() {
    const { pinnedHistory, setPin, removeFromHistory } = useCompare();
    const [isOpen, setIsOpen] = useState(false);

    if (pinnedHistory.length === 0) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-slate-900 text-white px-4 py-3 rounded-full shadow-xl shadow-slate-900/30 flex items-center gap-2 active:scale-95 transition-transform border border-slate-700"
            >
                <MapPin className="w-4 h-4 fill-white" />
                <span className="text-xs font-bold">{pinnedHistory.length} Pins</span>
            </button>

            <BottomSheet
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={`Pinned Plans (${pinnedHistory.length})`}
            >
                <div className="space-y-4 pb-8">
                    {pinnedHistory.map((plan, index) => (
                        <div key={plan.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="text-center min-w-[40px]">
                                    {index === 0 && <span className="text-[8px] font-black text-blue-600 uppercase block">Ref</span>}
                                    <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{plan.name}</h4>
                                    <p className="text-xs font-medium text-slate-500">R{plan.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {index !== 0 && (
                                    <button
                                        onClick={() => { setPin(plan); setIsOpen(false); }}
                                        className="px-3 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg"
                                    >
                                        Set Ref
                                    </button>
                                )}
                                <button
                                    onClick={() => removeFromHistory(plan.id)}
                                    className="p-2 text-slate-300 hover:text-rose-500"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </BottomSheet>
        </>
    );
}