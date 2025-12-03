'use client';

import { usePersona } from '@/context/PersonaContext';
import { Scale } from 'lucide-react';
import clsx from 'clsx';

interface ComparisonToggleProps {
    planId: string;
    className?: string;
}

export function ComparisonToggle({ planId, className }: ComparisonToggleProps) {
    const { comparedPlanIds, togglePlanComparison } = usePersona();
    const isSelected = comparedPlanIds.includes(planId);
    const isMaxReached = comparedPlanIds.length >= 3 && !isSelected;

    return (
        <button
            onClick={(e) => {
                e.stopPropagation(); // Prevent triggering parent card clicks
                if (!isMaxReached) togglePlanComparison(planId);
            }}
            disabled={isMaxReached}
            className={clsx(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all",
                isSelected
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                    : isMaxReached
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-blue-300",
                className
            )}
        >
            <Scale className={clsx("w-3 h-3", isSelected && "fill-current")} />
            {isSelected ? "Compare" : "Compare"}
        </button>
    );
}
