'use client';

import { Plan } from '@/utils/types';
import { ShieldCheck, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import PlanDetails from '@/components/PlanDetails';
import clsx from 'clsx';
import { useState } from 'react';

interface BenefitsCardProps {
    plan: Plan;
    onVerify: () => void;
    isClinicalFirst?: boolean;
    humanInsight?: string;
}

/**
 * BenefitsCard Component
 * 
 * Displays clinical breakdown with "Actuarial Toggle" feature:
 * - Clinical_First personas: Toggle collapsed by default (show human insight only)
 * - Price_First personas: Toggle expanded by default (show details immediately)
 */
export default function BenefitsCard({ plan, onVerify, isClinicalFirst = false, humanInsight }: BenefitsCardProps) {
    // Default state based on persona priority
    const [isExpanded, setIsExpanded] = useState(!isClinicalFirst);

    return (
        <div className={clsx(
            "h-full bg-white rounded-3xl overflow-hidden flex flex-col relative w-full transition-all",
            // EXACT REPLICA of Card 1 "Winner" Style:
            "border border-emerald-200 shadow-xl shadow-emerald-200/60 border-l-4 border-l-emerald-500"
        )}>
            {/* Header */}
            <div className="px-5 pt-5 pb-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
                        <FileText className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide leading-none mb-0.5">Clinical Breakdown</h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Limits & Baskets</p>
                    </div>
                </div>
                <div className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                    2 of 2
                </div>
            </div>

            {/* Human Insight (Always Visible for Clinical_First) */}
            {humanInsight && isClinicalFirst && (
                <div className="px-5 pt-4 pb-2">
                    <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-xl border border-emerald-100/80">
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {humanInsight}
                        </p>
                    </div>
                </div>
            )}

            {/* Actuarial Toggle Button */}
            <div className="px-5 pt-3">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={clsx(
                        "w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all",
                        "border text-sm font-medium",
                        isExpanded
                            ? "bg-slate-100 border-slate-200 text-slate-700"
                            : "bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100"
                    )}
                >
                    <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {isExpanded ? 'Hide Strategy Analysis' : 'View Strategy Analysis'}
                    </span>
                    {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                </button>
            </div>

            {/* Collapsible Content Area */}
            <div className={clsx(
                "transition-all duration-300 ease-in-out overflow-hidden",
                isExpanded ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0"
            )}>
                <div className="p-5 flex-1">
                    <PlanDetails plan={plan} />
                </div>
            </div>

            {/* Footer CTA (Updated to Match Winner Style) */}
            <div className="border-t border-slate-100 bg-slate-50/50 p-4 mt-auto">
                <button
                    onClick={onVerify}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                    <ShieldCheck className="w-4 h-4 text-emerald-100" />
                    Check Your Coverage
                </button>
            </div>
        </div>
    )
}