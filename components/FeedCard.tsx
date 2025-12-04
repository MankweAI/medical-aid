'use client';

import { useCompare, Plan } from '@/context/CompareContext';
import { ArrowRight, MapPin, Building2, Baby, Scan, Pill, ShieldAlert } from 'lucide-react';
import SwipeableCard from '@/components/ui/SwipeableCard';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

interface FeedCardProps {
    plan: Plan;
    onVerify: (name: string) => void;
}

export default function FeedCard({ plan, onVerify }: FeedCardProps) {
    const { activePin, setPin } = useCompare();
    const [imgError, setImgError] = useState(false);

    if (!plan) return null;

    // Helper: Consistent ZAR Formatting
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // 1. Effective Cost Comparison
    const isPinned = activePin?.id === plan.id;
    let delta = null;

    const getEffectiveCost = (p: Plan) => p.price - (p.savings_annual / 12);

    if (activePin && !isPinned) {
        const pinEffective = getEffectiveCost(activePin);
        const planEffective = getEffectiveCost(plan);
        const diff = planEffective - pinEffective;

        delta = {
            val: Math.abs(diff),
            sign: diff > 0 ? '+' : '-',
            color: diff > 0 ? 'text-rose-600 bg-rose-50 border-rose-100' : 'text-emerald-600 bg-emerald-50 border-emerald-100',
            label: diff > 0 ? 'Higher' : 'Lower'
        };
    }

    const schemeSlug = plan.identity?.scheme_name.toLowerCase().replace(/\s+/g, '-') || 'generic';
    const logoPath = `/schemes-logo/${schemeSlug}.png`;

    return (
        <SwipeableCard onPin={() => setPin(plan)} isPinned={isPinned}>
            <div className={clsx(
                "border transition-all relative overflow-hidden active:scale-[0.99] rounded-2xl bg-white",
                isPinned
                    ? "border-blue-500 ring-2 ring-blue-500/10 shadow-md z-10"
                    : "border-slate-200 shadow-sm hover:border-slate-300"
            )}>

                {isPinned && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl-lg z-20 uppercase tracking-wider">
                        Pinned
                    </div>
                )}

                <div className="p-3">
                    {/* TOP ROW: Header */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                                {!imgError ? (
                                    <Image
                                        src={logoPath}
                                        alt={plan.identity?.scheme_name}
                                        width={32}
                                        height={32}
                                        className="object-contain p-0.5"
                                        onError={() => setImgError(true)}
                                    />
                                ) : (
                                    <span className="text-[9px] font-black text-slate-400 uppercase">{plan.identity?.scheme_name?.substring(0, 2)}</span>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{plan.identity.plan_series}</span>
                                    <span className="text-[8px] font-bold bg-slate-100 text-slate-500 px-1 py-0.5 rounded border border-slate-200 leading-none">
                                        {plan.identity.plan_type === 'Hospital Plan' ? 'HOSP' : 'MED'}
                                    </span>
                                </div>
                                <h3 className="font-bold text-slate-900 text-sm leading-tight">{plan.identity.plan_name}</h3>
                            </div>
                        </div>
                        <div className="text-right">
                            {delta && (
                                <div className={clsx("inline-block mb-0.5 text-[9px] font-black px-1.5 py-0 rounded border leading-tight", delta.color)}>
                                    {delta.sign} R{Math.round(delta.val).toLocaleString('en-ZA')} <span className="opacity-70 font-normal">Eff.</span>
                                </div>
                            )}
                            <div className="font-black text-slate-900 text-lg leading-none" suppressHydrationWarning>
                                {formatPrice(plan.price)}
                            </div>
                        </div>
                    </div>

                    {/* SOURCE OF TRUTH GRID (8 Data Points) */}
                    <div className="bg-slate-50 rounded-xl border border-slate-100 p-2 mb-3">
                        {/* Row 1: Core Benefits */}
                        <div className="grid grid-cols-4 gap-2 mb-2 pb-2 border-b border-slate-200/60">
                            <div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">Rate</p>
                                <p className="text-[10px] font-bold text-slate-700">{plan.coverage_rates.hospital_account}%</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">Maternity</p>
                                <p className="text-[10px] font-bold text-blue-600">
                                    {plan.defined_baskets.maternity.antenatal_consults} Consults
                                </p>
                            </div>
                            <div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">Specialist</p>
                                <p className="text-[10px] font-bold text-slate-700">
                                    {plan.coverage_rates.specialist_in_hospital}% In-H
                                </p>
                            </div>
                            <div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5">Savings</p>
                                <p className={clsx("text-[10px] font-bold", plan.savings_annual > 0 ? "text-emerald-600" : "text-slate-400")}>
                                    {plan.savings_annual > 0 ? `R${Math.round(plan.savings_annual / 12)}` : '0'}
                                </p>
                            </div>
                        </div>

                        {/* Row 2: Co-pays & Limits (The Truth) */}
                        <div className="grid grid-cols-4 gap-2">
                            <div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5 flex gap-1"><Scan className="w-2 h-2" /> MRI</p>
                                <p className={clsx("text-[10px] font-bold", plan.procedure_copays.mri_scan > 0 ? "text-rose-600" : "text-slate-700")}>
                                    {plan.procedure_copays.mri_scan > 0 ? `R${plan.procedure_copays.mri_scan}` : 'Covered'}
                                </p>
                            </div>
                            <div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5 flex gap-1"><ShieldAlert className="w-2 h-2" /> Scope</p>
                                <p className={clsx("text-[10px] font-bold", plan.procedure_copays.scope_in_hospital > 0 ? "text-rose-600" : "text-slate-700")}>
                                    {plan.procedure_copays.scope_in_hospital > 0 ? `R${plan.procedure_copays.scope_in_hospital}` : 'R0'}
                                </p>
                            </div>
                            <div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5 flex gap-1"><Pill className="w-2 h-2" /> Meds</p>
                                <p className="text-[10px] font-bold text-slate-700">
                                    R{plan.defined_baskets.preventative.contraceptives}
                                </p>
                            </div>
                            <div>
                                <p className="text-[8px] font-bold text-slate-400 uppercase mb-0.5 flex gap-1"><Baby className="w-2 h-2" /> Ped</p>
                                <p className="text-[10px] font-bold text-slate-700">
                                    {plan.defined_baskets.maternity.paediatrician_visits} Visits
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ACTION ROW */}
                    <div className="flex items-center gap-2">
                        <div className="flex-1 text-[9px] font-bold text-slate-400 uppercase tracking-wide truncate">
                            {plan.network_restriction === 'Network' ? 'Network Hospitals Only' : 'Any Private Hospital'}
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); setPin(plan); }} className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors">
                            <MapPin className={clsx("w-4 h-4", isPinned && "fill-blue-600 text-blue-600")} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); onVerify(plan.identity.plan_name); }} className="h-8 px-4 bg-slate-900 text-white rounded-lg flex items-center gap-1.5 font-bold text-[10px] shadow-sm active:scale-95 transition-transform">
                            Select <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </SwipeableCard>
    );
}