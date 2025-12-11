'use client';

import { Plan } from '@/utils/types';
import { Phone, FileText, ChevronRight } from 'lucide-react';
import PlanDetails from '@/components/PlanDetails';
import clsx from 'clsx';

export default function BenefitsCard({ plan, onVerify }: { plan: Plan; onVerify: () => void }) {
    return (
        <div className="h-full bg-white rounded-3xl border border-slate-200 shadow-lg shadow-slate-200/40 overflow-hidden flex flex-col relative w-full">
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

            {/* Scrollable Content Area */}
            <div className="p-5 flex-1">
                <PlanDetails plan={plan} />
            </div>

            {/* Footer CTA (Identical to FeedCard) */}
            <div className="border-t border-slate-100 bg-slate-50/50 p-4 mt-auto">
                <button
                    onClick={onVerify}
                    className="w-full py-3 bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
                >
                    <Phone className="w-3.5 h-3.5" />
                    Verify with Specialist
                </button>
            </div>
        </div>
    )
}
