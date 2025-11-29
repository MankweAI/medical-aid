'use client';

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Bookmark, Sparkles, Layers } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { usePersona } from '@/context/PersonaContext';
import clsx from 'clsx';
import BottomSheet from '@/components/ui/BottomSheet';

export default function ActionDock() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { selectedPlans, savedPlans, toggleSave } = useCompare();
    const { activePersonaPath } = usePersona();

    // State for the "Saved" Sheet
    const [showSaved, setShowSaved] = useState(false);

    // --- LOGIC: Determine "Active" State ---
    let activeTab = 'diagnose';
    if (showSaved) {
        activeTab = 'saved';
    } else if (pathname.includes('/compare')) {
        activeTab = 'compare';
    } else {
        activeTab = 'diagnose';
    }

    // --- HANDLER: The Context-Aware Diagnose Button ---
    const handleDiagnoseClick = () => {
        setShowSaved(false);

        if (pathname === '/') {
            // Context: Home
            // Action: Scroll to top / Soft Reset
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        else if (pathname.startsWith('/personas/')) {
            // Context: Deep in a Spoke (e.g. /personas/family-planner)
            // Action: Reset to the base Spoke (Clear filters, keep Persona)
            // We use 'pathname' because it excludes query params (?income=..., ?filters=...)
            router.push(pathname);
        }
        else {
            // Context: Compare Page or others
            // Action: Return to Active Persona (if exists) or Home
            if (activePersonaPath) {
                router.push(activePersonaPath);
            } else {
                router.push('/');
            }
        }
    };

    // Helper for "Popped" Styling
    const getButtonClass = (id: string) => clsx(
        "relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300",
        activeTab === id
            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/30 -translate-y-4 border-4 border-white z-20" // Active Pop
            : "hover:bg-slate-100 text-slate-400 hover:text-slate-600 z-10 active:scale-95" // Resting
    );

    return (
        <>
            {/* --- THE DOCK --- */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] z-50 flex justify-center px-4 pointer-events-none">
                <div className="glass-panel pointer-events-auto flex items-center gap-2 p-2 rounded-full shadow-2xl shadow-slate-900/10">

                    {/* 1. SAVED (The Vault) */}
                    <button
                        onClick={() => setShowSaved(!showSaved)}
                        className={getButtonClass('saved')}
                    >
                        <div className="relative">
                            <Bookmark className="w-5 h-5" />
                            {savedPlans.length > 0 && activeTab !== 'saved' && (
                                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-white" />
                            )}
                        </div>
                        {activeTab === 'saved' && (
                            <span className="absolute -bottom-6 text-[10px] font-bold text-slate-400 opacity-0 animate-in fade-in slide-in-from-top-1 duration-500 fill-mode-forwards">
                                Saved
                            </span>
                        )}
                    </button>

                    {/* 2. DIAGNOSE (The Contextual Oracle) */}
                    <button
                        onClick={handleDiagnoseClick}
                        className={getButtonClass('diagnose')}
                    >
                        <Sparkles className={clsx("w-5 h-5", activeTab === 'diagnose' && "fill-current")} />
                    </button>

                    {/* 3. COMPARE (The Workbench) */}
                    <button
                        onClick={() => {
                            setShowSaved(false);
                            if (selectedPlans.length > 0) {
                                router.push(`/compare?plans=${selectedPlans.map(p => p.id).join(',')}`);
                            }
                        }}
                        className={getButtonClass('compare')}
                    >
                        <div className="relative">
                            <Layers className="w-5 h-5" />
                            {selectedPlans.length > 0 && activeTab !== 'compare' && (
                                <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-rose-500 text-[10px] font-bold text-white border-2 border-white shadow-sm">
                                    {selectedPlans.length}
                                </span>
                            )}
                        </div>

                        {activeTab === 'compare' && (
                            <span className="absolute -bottom-6 text-[10px] font-bold text-slate-400 opacity-0 animate-in fade-in slide-in-from-top-1 duration-500 fill-mode-forwards whitespace-nowrap">
                                {selectedPlans.length} Plans
                            </span>
                        )}
                    </button>

                </div>
            </div>

            {/* --- SAVED SHEET (The Vault) --- */}
            <BottomSheet
                isOpen={showSaved}
                onClose={() => setShowSaved(false)}
                title="Shortlisted Strategies"
            >
                <div className="space-y-4">
                    {savedPlans.length > 0 ? (
                        <div className="space-y-3">
                            {savedPlans.map((plan) => (
                                <div key={plan.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">{plan.name}</div>
                                        <div className="text-xs text-slate-500">{plan.scheme}</div>
                                    </div>
                                    <button
                                        onClick={() => toggleSave(plan)}
                                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
                                    >
                                        <Bookmark className="w-4 h-4 fill-current" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => { setShowSaved(false); handleDiagnoseClick(); }}
                                className="w-full py-3 mt-4 bg-slate-900 text-white font-bold rounded-xl text-sm shadow-lg shadow-slate-900/10 active:scale-95 transition-transform"
                            >
                                Find More Plans
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-12 px-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                            <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                                🔖
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm">Your vault is empty</h4>
                            <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
                                Tap the "Compare" button on any plan to add it to your shortlist for later.
                            </p>
                            <button
                                onClick={() => { setShowSaved(false); handleDiagnoseClick(); }}
                                className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-sm shadow-lg shadow-slate-900/10 active:scale-95 transition-transform"
                            >
                                Start a Diagnosis
                            </button>
                        </div>
                    )}
                </div>
            </BottomSheet>
        </>
    );
}