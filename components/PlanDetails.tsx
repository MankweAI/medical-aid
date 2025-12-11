'use client';

import { Plan } from '@/utils/types';
import {
    Shield,
    Baby,
    Activity,
    Pill,
    Scan,
    AlertOctagon,
    Zap,
    Stethoscope,
    HeartPulse,
    AlertTriangle
} from 'lucide-react';
import clsx from 'clsx';

export default function PlanDetails({ plan }: { plan: Plan }) {
    if (!plan) return null;

    // Helper for currency
    const fmt = (val: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    // Guard against legacy data (backward compatibility)
    const limits = plan.limits || { oncology: { status: 'Unknown', value: 0 }, casualty: { status: 'Unknown', value: 0 }, internal_prosthesis: { sublimit: 0 } };
    const net = plan.network_details || { hospitals: 'Unknown', gps: 'Unknown', specialists: 'Unknown' };

    return (
        <div className="space-y-6">

            {/* 1. CRITICAL LIMITS GRID */}
            <div className="grid grid-cols-2 gap-3">
                {/* Oncology */}
                <div className={clsx("p-3 rounded-xl border flex flex-col justify-between",
                    limits.oncology.status === 'PMB Only' ? "bg-amber-50 border-amber-100" : "bg-emerald-50 border-emerald-100")}>
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className={clsx("w-4 h-4", limits.oncology.status === 'PMB Only' ? "text-amber-600" : "text-emerald-600")} />
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Oncology</span>
                    </div>
                    <div className="text-sm font-black">
                        {limits.oncology.status === 'Unlimited' ? 'Unlimited' : limits.oncology.value > 0 ? fmt(limits.oncology.value) : 'PMB Only'}
                    </div>
                </div>

                {/* Casualty */}
                <div className={clsx("p-3 rounded-xl border flex flex-col justify-between",
                    limits.casualty.status === 'No Benefit' ? "bg-rose-50 border-rose-100" : "bg-blue-50 border-blue-100")}>
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className={clsx("w-4 h-4", limits.casualty.status === 'No Benefit' ? "text-rose-600" : "text-blue-600")} />
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Casualty</span>
                    </div>
                    <div className="text-sm font-black">
                        {limits.casualty.status === 'No Benefit' ? 'No Benefit' : limits.casualty.value > 0 ? `R${limits.casualty.value} Limit` : 'Savings'}
                    </div>
                </div>
            </div>

            {/* 2. THE NETWORK MATRIX */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-slate-500" />
                    <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Network Rules</h5>
                </div>
                <div className="divide-y divide-slate-50">
                    <Row label="Hospitals" value={net.hospitals} />
                    <Row label="GPs" value={net.gps} />
                    <Row label="Specialists" value={net.specialists} />
                </div>
            </div>

            {/* 3. THE GAP COVER RATING */}
            <div className={clsx("rounded-2xl p-4 border flex items-center gap-4",
                plan.gap_cover_rating === 'Mandatory' ? "bg-rose-50 border-rose-100" : "bg-blue-50 border-blue-100"
            )}>
                <div className={clsx("p-2 rounded-full", plan.gap_cover_rating === 'Mandatory' ? "bg-rose-100 text-rose-600" : "bg-blue-100 text-blue-600")}>
                    <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider mb-0.5">Gap Cover: {plan.gap_cover_rating}</h5>
                    <p className="text-xs opacity-80 leading-snug">
                        {plan.gap_cover_rating === 'Mandatory'
                            ? "This plan pays 100%. Specialists charge 300%+. You are exposed."
                            : "Recommended to cover co-payments and sub-limits."}
                    </p>
                </div>
            </div>

            {/* 4. CLINICAL BASKETS */}
            <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Risk Benefits</h5>
                <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-3">
                    <Row label="Maternity" value={plan.defined_baskets.maternity.antenatal_consults > 0 ? `${plan.defined_baskets.maternity.antenatal_consults} Visits` : 'No Benefit'} isBold />
                    <Row label="Contraceptives" value={`R${plan.defined_baskets.preventative.contraceptives}`} isBold />
                    <Row label="MRI/CT Scans" value={plan.procedure_copays.mri_scan > 0 ? `R${plan.procedure_copays.mri_scan} Co-pay` : 'Covered'} isBold />
                </div>
            </div>

        </div>
    );
}

function Row({ label, value, isBold }: { label: string, value: string, isBold?: boolean }) {
    return (
        <div className="flex justify-between items-center py-2 px-4">
            <span className="text-xs font-medium text-slate-500">{label}</span>
            <span className={clsx("text-xs text-slate-900 text-right", isBold ? "font-bold" : "font-medium")}>{value}</span>
        </div>
    );
}