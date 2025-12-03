'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Bookmark, Sparkles, Layers, Trash2 } from 'lucide-react'; // Ensure Trash2 imported if used
import { useCompare } from '@/context/CompareContext';
import { usePersona } from '@/context/PersonaContext';
import clsx from 'clsx';
import BottomSheet from '@/components/ui/BottomSheet';

export default function ActionDock() {
    const router = useRouter();
    const pathname = usePathname();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const searchParams = useSearchParams(); // Keep if you plan to use it, else remove
    const { selectedPlans, savedPlans, toggleSave } = useCompare();
    const { activePersonaPath } = usePersona();

    // State for the "Saved" Sheet
    const [showSaved, setShowSaved] = useState(false);
    const [showCompareEmpty, setShowCompareEmpty] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // --- LOGIC: Determine "Active" State ---
    let activeTab = 'diagnose';
    if (showSaved) {
        activeTab = 'saved';
    } else if (showCompareEmpty) {
        activeTab = 'compare';
    } else if (pathname.includes('/compare')) {
        activeTab = 'compare';
    } else if (pathname.startsWith('/simulate/')) {
        // FIX: Recognize new Simulation route as "Diagnose" active state
        activeTab = 'diagnose';
    } else {
        // Default for Home '/'
        activeTab = 'diagnose';
    }

    // --- HANDLER: The Context-Aware Diagnose Button ---
    const handleDiagnoseClick = () => {
        setShowSaved(false);
        setShowCompareEmpty(false);

        if (pathname === '/') {
            // Context: Home -> Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        else if (pathname.startsWith('/simulate/')) {
            // Context: Deep in Simulation -> Reset or refresh? 
            // For now, keep them there or allow "Reset" logic
            router.push(pathname);
        }
        else {
            // Context: Compare Page or others
            // Action: Return to Active Simulation (if exists) or Home
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
            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/30 -translate-y-4 border-4 border-white z-20"
            : "hover:bg-slate-100 text-slate-400 hover:text-slate-600 z-10 active:scale-95"
    );

    return (
        <>
            {/* --- THE DOCK --- */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] z-50 flex justify-center px-4 pointer-events-none">
                <div className="glass-panel pointer-events-auto flex items-center gap-2 p-2 rounded-full shadow-2xl shadow-slate-900/10">

                    {/* 1. SAVED (The Vault) */}
                    <button
                        onClick={() => { setShowSaved(!showSaved); setShowCompareEmpty(false); }}
                        className={getButtonClass('saved')}
                    >
                        <div className="relative">
                            <Bookmark className="w-5 h-5" />
                            {mounted && savedPlans.length > 0 && activeTab !== 'saved' && (
                                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-white" />
                            )}
                        </div>
                        {activeTab === 'saved' && (
                            <span className="absolute -bottom-6 text-[10px] font-bold text-slate-400 opacity-0 animate-in fade-in slide-in-from-top-1 duration-500 fill-mode-forwards">
                                Saved
                            </span>
                        )}
                    </button>

                    {/* 2. DIAGNOSE (The Simulator) */}
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
                            } else {
                                setShowCompareEmpty(!showCompareEmpty);
                            }
                        }}
                        className={getButtonClass('compare')}
                    >
                        <div className="relative">
                            <Layers className="w-5 h-5" />
                            {mounted && selectedPlans.length > 0 && activeTab !== 'compare' && (
                                <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-rose-500 text-[10px] font-bold text-white border-2 border-white shadow-sm">
                                    {selectedPlans.length}
                                </span>
                            )}
                        </div>

                        {activeTab === 'compare' && (
                            <span className="absolute -bottom-6 text-[10px] font-bold text-slate-400 opacity-0 animate-in fade-in slide-in-from-top-1 duration-500 fill-mode-forwards whitespace-nowrap">
                                {selectedPlans.length > 0 ? `${selectedPlans.length} Plans` : 'Compare'}
                            </span>
                        )}
                    </button>

                </div>
            </div>

            {/* --- SAVED SHEET (The Vault) --- */}
            <BottomSheet
                isOpen={showSaved}
                onClose={() => setShowSaved(false)}
                title={`Shortlisted Strategies (${savedPlans.length})`}
            >
                <div className="space-y-4 pb-8">
                    {savedPlans.length === 0 ? (
                        <div className="text-center py-12 px-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                            <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                                🔖
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm">Your vault is empty</h4>
                            <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
                                Tap the "Bookmark" icon on any plan to save it for later consideration.
                            </p>
                            <button
                                onClick={() => { setShowSaved(false); router.push('/'); }}
                                className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-sm"
                            >
                                Start a Simulation
                            </button>
                            <button
                                onClick={() => setShowSaved(false)}
                                className="w-full mt-3 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {savedPlans.map(plan => (
                                <div key={plan.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{plan.scheme}</p>
                                        <h4 className="font-bold text-slate-900">{plan.name}</h4>
                                        {plan.price && <p className="text-xs text-emerald-600 font-bold">R{plan.price} pm</p>}
                                    </div>
                                    <button
                                        onClick={() => toggleSave(plan)}
                                        className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => setShowSaved(false)}
                                className="w-full mt-4 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm"
                            >
                                Close Vault
                            </button>
                        </div>
                    )}
                </div>
            </BottomSheet>

            {/* --- COMPARE EMPTY SHEET --- */}
            <BottomSheet
                isOpen={showCompareEmpty}
                onClose={() => setShowCompareEmpty(false)}
                title="Compare Strategies"
            >
                <div className="space-y-4 pb-8">
                    <div className="text-center py-12 px-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                        <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                            ⚖️
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">No plans selected</h4>
                        <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
                            Tap the "Compare" button on any plan card to add it to your workbench. Select up to 2 plans to compare side-by-side.
                        </p>
                        <button
                            onClick={() => { setShowCompareEmpty(false); handleDiagnoseClick(); }}
                            className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-sm shadow-lg shadow-slate-900/10 active:scale-95 transition-transform"
                        >
                            Find Plans to Compare
                        </button>
                        <button
                            onClick={() => setShowCompareEmpty(false)}
                            className="w-full mt-3 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </BottomSheet>
        </>
    );
}