'use client';

import { useCompare } from '@/context/CompareContext';
import { X, MapPin, Building2, Scan, Baby, Stethoscope } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

export default function PinnedHeader() {
    const { activePin, clearPin } = useCompare();
    const [imgError, setImgError] = useState(false);

    if (!activePin) return null;

    const schemeSlug = activePin.identity.scheme_name.toLowerCase().replace(/\s+/g, '-');
    const logoPath = `/schemes-logo/${schemeSlug}.png`;

    // Derived values for the grid
    const matBenefit = activePin.defined_baskets.maternity.antenatal_consults > 0
        ? `${activePin.defined_baskets.maternity.antenatal_consults} Visits`
        : 'None';

    const mriCopay = activePin.procedure_copays.mri_scan > 0
        ? `R${activePin.procedure_copays.mri_scan}`
        : '0';

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white shadow-2xl border-b border-slate-800 animate-in slide-in-from-top-full duration-300">
            <div className="max-w-[600px] mx-auto p-3 relative overflow-hidden">

                {/* Header Top Row */}
                <div className="flex justify-between items-start mb-3 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                            {!imgError ? (
                                <Image src={logoPath} alt={activePin.identity.scheme_name} width={40} height={40} className="object-contain p-1" onError={() => setImgError(true)} />
                            ) : (
                                <span className="text-slate-900 font-black text-xs uppercase">{activePin.identity.scheme_name.substring(0, 3)}</span>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[9px] font-bold bg-blue-600 text-white px-1.5 rounded uppercase">Pinned</span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase">{activePin.identity.scheme_name}</span>
                            </div>
                            <h3 className="font-bold text-sm leading-tight">{activePin.identity.plan_name}</h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <span className="block text-xl font-black" suppressHydrationWarning>
                                {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(activePin.price)}
                            </span>
                        </div>
                        <button onClick={clearPin} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors active:scale-95">
                            <X className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>

                {/* EXPANDED DETAIL GRID (Mirrors FeedCard) */}
                <div className="grid grid-cols-4 gap-1 bg-white/5 rounded-xl p-2 border border-white/10 relative z-10">
                    {/* Baby */}
                    <div className="text-center border-r border-white/5 px-1">
                        <div className="text-[8px] font-bold text-slate-400 uppercase mb-0.5 flex justify-center items-center gap-1">
                            <Baby className="w-2.5 h-2.5" /> Baby
                        </div>
                        <div className={clsx("text-[9px] font-bold truncate", activePin.defined_baskets.maternity.antenatal_consults > 0 ? "text-blue-400" : "text-slate-500")}>
                            {matBenefit}
                        </div>
                    </div>
                    {/* MRI */}
                    <div className="text-center border-r border-white/5 px-1">
                        <div className="text-[8px] font-bold text-slate-400 uppercase mb-0.5 flex justify-center items-center gap-1">
                            <Scan className="w-2.5 h-2.5" /> MRI
                        </div>
                        <div className={clsx("text-[9px] font-bold truncate", activePin.procedure_copays.mri_scan > 0 ? "text-rose-400" : "text-emerald-400")}>
                            {mriCopay}
                        </div>
                    </div>
                    {/* Rate */}
                    <div className="text-center border-r border-white/5 px-1">
                        <div className="text-[8px] font-bold text-slate-400 uppercase mb-0.5 flex justify-center items-center gap-1">
                            <Building2 className="w-2.5 h-2.5" /> Rate
                        </div>
                        <div className="text-[9px] font-bold text-white truncate">
                            {activePin.coverage_rates.hospital_account}%
                        </div>
                    </div>
                    {/* Spec */}
                    <div className="text-center px-1">
                        <div className="text-[8px] font-bold text-slate-400 uppercase mb-0.5 flex justify-center items-center gap-1">
                            <Stethoscope className="w-2.5 h-2.5" /> Spec
                        </div>
                        <div className="text-[9px] font-bold text-white truncate">
                            {activePin.coverage_rates.specialist_in_hospital}%
                        </div>
                    </div>
                </div>

                {/* Decor */}
                <div className="absolute top-[-10%] right-[-5%] opacity-5 rotate-12 pointer-events-none">
                    <MapPin className="w-32 h-32 fill-white" />
                </div>
            </div>
        </div>
    );
}