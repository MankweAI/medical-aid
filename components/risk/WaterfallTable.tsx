'use client';

import React from 'react';
import { RiskAudit } from '@/types/risk';
import { Info, CheckCircle2, XCircle } from 'lucide-react';

const formatZAR = (n: number) =>
    new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        maximumFractionDigits: 0
    }).format(n);

export function WaterfallTable({ audit }: { audit: RiskAudit }) {
    const { breakdown, procedure, plan } = audit;
    const isClean = audit.liability === 0;

    // Helper to explain the specific rule trigger
    const getRuleExplanation = () => {
        if (isClean) return "Full Cover";

        // 1. Is it a Scope Deductible?
        if (procedure.category === 'scope' && audit.breakdown.scope_variants) {
            const s = audit.breakdown.scope_variants;
            if (audit.liability === s.day_clinic_single || audit.liability === s.day_clinic_combo) return "Day Clinic Deductible";
            if (audit.liability === s.hospital_network_single) return "Hospital Admission Deductible";
        }

        // 2. Is it a Non-Network Penalty?
        if (audit.liability === plan.deductibles.penalty_non_network) return "Non-Network Provider Penalty";

        // 3. Is it a Specific Surgical Penalty?
        const d = plan.deductibles;
        if (procedure.id === 'cataract-surgery' && audit.liability === d.cataract_penalty) return "Specific Procedure Upfront Payment";
        if (procedure.id === 'tonsillectomy' && audit.liability === d.tonsillectomy_penalty) return "Tonsillectomy Co-Payment";

        return "Plan Co-Payment";
    };

    const ruleName = getRuleExplanation();

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-900">Cost Breakdown</h3>
                <p className="text-sm text-slate-500">How your liability is calculated</p>
            </div>

            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-xs uppercase font-black text-slate-400">
                    <tr>
                        <th className="px-6 py-4">Line Item</th>
                        <th className="px-6 py-4 text-right">Amount</th>
                        <th className="px-6 py-4 text-right hidden sm:table-cell">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">

                    {/* 1. BASE RATE */}
                    <tr>
                        <td className="px-6 py-4">
                            <div className="font-bold text-slate-700">Total Procedure Value</div>
                            <div className="text-xs text-slate-400">Estimated facility & professional fees</div>
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-slate-600">
                            {formatZAR(breakdown.base_rate)}
                        </td>
                        <td className="px-6 py-4 text-right hidden sm:table-cell">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                                Estimated
                            </span>
                        </td>
                    </tr>

                    {/* 2. SCHEME CONTRIBUTION */}
                    <tr className="bg-emerald-50/30">
                        <td className="px-6 py-4">
                            <div className="font-bold text-emerald-800">Paid by {plan.plan_name}</div>
                            <div className="text-xs text-emerald-600/80">Risk benefit contribution</div>
                        </td>
                        <td className="px-6 py-4 text-right font-black text-emerald-600">
                            {formatZAR(breakdown.scheme_pays)}
                        </td>
                        <td className="px-6 py-4 text-right hidden sm:table-cell">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                                <CheckCircle2 className="w-3 h-3" /> Covered
                            </span>
                        </td>
                    </tr>

                    {/* 3. THE SHORTFALL */}
                    {!isClean && (
                        <tr className="bg-rose-50/30">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 font-bold text-rose-700">
                                    <span>Your Co-Payment</span>
                                    <Info className="w-3 h-3 text-rose-400" />
                                </div>
                                <div className="text-xs text-rose-600/80">
                                    Trigger: <span className="font-bold underline decoration-dotted">{ruleName}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right font-black text-rose-600 text-lg">
                                - {formatZAR(audit.liability)}
                            </td>
                            <td className="px-6 py-4 text-right hidden sm:table-cell">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                                    <XCircle className="w-3 h-3" /> Liability
                                </span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}