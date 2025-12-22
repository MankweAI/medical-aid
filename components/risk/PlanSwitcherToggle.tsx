'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface ToggleProps {
    currentPlanId: string;
    procedureId: string;
}

export function PlanSwitcherToggle({ currentPlanId, procedureId }: ToggleProps) {
    const router = useRouter();
    const isTrapPlan = currentPlanId.includes('smart');
    const targetPlan = isTrapPlan ? 'classic-saver' : 'active-smart';

    return (
        <div className="mt-8">
            <button
                onClick={() => router.push(`/risk/${procedureId}/${targetPlan}`)}
                className={`w-full group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 ${isTrapPlan
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/20'
                        : 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 shadow-lg shadow-slate-500/20'
                    }`}
            >
                {/* Background Decoration */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-2xl" />
                </div>

                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isTrapPlan
                                ? 'bg-white/20 text-white'
                                : 'bg-white/10 text-white'
                            }`}>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>

                        {/* Text */}
                        <div className="text-left">
                            <div className="text-white font-bold text-lg">
                                {isTrapPlan ? 'Switch Plan to Erase Bill' : 'See Risk on Smart Plan'}
                            </div>
                            <div className={`text-sm ${isTrapPlan ? 'text-emerald-100' : 'text-slate-300'}`}>
                                {isTrapPlan
                                    ? 'Compare with Classic Saver (no deductible)'
                                    : 'See why Smart plans have hidden costs'
                                }
                            </div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 ${isTrapPlan ? 'bg-white/20' : 'bg-white/10'
                        }`}>
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>

                {/* Savings Preview (only on trap plan) */}
                {isTrapPlan && (
                    <div className="relative mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-sm">
                        <span className="text-emerald-100">Potential savings:</span>
                        <span className="text-white font-bold bg-white/20 px-3 py-1 rounded-full">
                            Full deductible eliminated
                        </span>
                    </div>
                )}
            </button>
        </div>
    );
}