'use client';

import React, { useState } from 'react';
import { CheckCircle2, ArrowRightLeft } from 'lucide-react';
import { SchemeHero } from './SchemeHero';
import { formatCurrency } from '@/lib/utils';

interface CostExplainerProps {
    procedureName: string;
    planName: string;
    year: number;
    premium: number;

    // Default Cost (e.g., Hospital Rate)
    defaultCost: number;
    defaultLabel: string;

    // Alternative Cost (e.g., Day Clinic Rate)
    alternateCost?: number;
    alternateLabel?: string;

    // Fixed Network Status per plan
    planNetworkStatus: string;

    // Context
    children?: React.ReactNode; // For passing static content like explanation text
}

export function CostExplainer({
    procedureName,
    planName,
    year,
    premium,
    defaultCost,
    defaultLabel,
    alternateCost,
    alternateLabel,
    planNetworkStatus,
    children
}: CostExplainerProps) {
    const [isAlternate, setIsAlternate] = useState(false);

    // If no alternate cost exists, we can't toggle
    const canToggle = alternateCost !== undefined && alternateCost !== null;

    const currentCost = isAlternate && alternateCost !== undefined ? alternateCost : defaultCost;
    const currentLabel = isAlternate ? alternateLabel : defaultLabel;

    // Toggle Logic
    const toggleView = () => setIsAlternate(!isAlternate);

    const networkStatusNode = (
        <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                {planNetworkStatus}
            </span>
            {canToggle && (
                <button
                    onClick={toggleView}
                    className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300"
                >
                    <ArrowRightLeft className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                    {isAlternate ? `Switch to ${defaultLabel}` : `Switch to ${alternateLabel}`}
                </button>
            )}
        </div>
    );

    return (
        <SchemeHero
            title={procedureName}
            subtitle={`on Discovery Health ${planName}`}
            kicker={`Benefit Checker ${year}`}
            premium={premium}
            networkStatus={networkStatusNode}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dynamic Co-payment Card */}
                <div className={`p-6 rounded-2xl border flex flex-col justify-center relative overflow-hidden transition-all duration-300 ${currentCost === 0 ? 'bg-gradient-to-br from-emerald-50 via-white to-emerald-50/20 border-emerald-100' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Your Co-payment</p>
                            {currentCost === 0 && (
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100/50 text-emerald-700 text-[10px] font-bold rounded-full animate-in fade-in zoom-in duration-300">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Fully Covered
                                </div>
                            )}
                        </div>

                        <div className="flex items-baseline gap-1">
                            <span className={`text-3xl font-black tracking-tight transition-colors duration-300 ${currentCost === 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                                {currentCost === 0 ? 'R0' : `R${formatCurrency(currentCost)}`}
                            </span>
                            {currentCost > 0 && (
                                <span className="text-xs font-semibold text-slate-400">upfront</span>
                            )}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold transition-colors duration-300 ${currentCost === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                {isAlternate ? alternateLabel : defaultLabel}
                            </span>
                        </div>

                        {currentCost > 0 && (
                            <p className="mt-2 text-[10px] font-medium text-slate-400">
                                Payable to the provider at time of service.
                            </p>
                        )}
                    </div>
                </div>

                {/* Place for Children (e.g. explainer text passed from server) */}
                {children}
            </div>
        </SchemeHero>
    );
}
