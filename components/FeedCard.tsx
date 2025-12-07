'use client';

import { useCompare, Plan } from '@/context/CompareContext';
import {
    MapPin,
    Building2,
    Lock,
    CheckCircle2,
    MinusCircle,
    ChevronDown,
    ChevronUp,
    Scale,
    Info,
    Phone,
    Shield,
    Activity,
    Stethoscope
} from 'lucide-react';
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
    const [showDetails, setShowDetails] = useState(false);

    if (!plan) return null;

    // --- 1. COMPUTED VALUES ---
    const isPinned = activePin?.id === plan.id;
    const price = plan.price || 0;

    // Identity
    const schemeName = plan.identity?.scheme_name || 'Scheme';
    const planName = plan.identity?.plan_name || 'Plan';
    const schemeSlug = schemeName.toLowerCase().replace(/\s+/g, '-');
    const logoPath = `/schemes-logo/${schemeSlug}.png`;
    const restrictionLevel = plan.network_restriction || 'Any';

    // Accessors
    const copays = plan.risk_exposure?.co_payments || {};
    const savings = plan.savings_annual || 0;
    const maternity = plan.defined_baskets?.maternity || {};
    const preventative = plan.defined_baskets?.preventative || {};
    const rates = plan.coverage_rates || {};

    // --- 2. THE TRANSPARENCY ENGINE ---
    const getTradeOffs = () => {
        const pros = [];
        const cons = [];

        // CONS
        if (restrictionLevel.includes('Network') || restrictionLevel.includes('Coastal')) {
            cons.push(`Must use ${schemeName} ${restrictionLevel} Hospitals`);
        }
        if ((copays.mri_scan || 0) > 0) {
            cons.push(`R${(copays.mri_scan || 0).toLocaleString()} co-payment on MRI & CT scans`);
        }
        if ((copays.admission_penalty_non_network || 0) > 0) {
            cons.push(`R${(copays.admission_penalty_non_network || 0).toLocaleString()} penalty if you use wrong hospital`);
        }
        if ((copays.scope_in_hospital || 0) > 0) {
            cons.push(`R${copays.scope_in_hospital} co-pay for scopes in hospital`);
        }

        // PROS
        if (savings > 0) {
            pros.push(`Includes R${savings.toLocaleString()} savings account`);
        }
        if ((maternity.antenatal_consults || 0) > 0) {
            pros.push(`Maternity: ${maternity.antenatal_consults} Consults & ${maternity.ultrasounds_2d || 0} Scans`);
        }
        if (preventative.contraceptives_annual_limit > 0) {
            pros.push(`R${preventative.contraceptives_annual_limit} Contraceptive benefit`);
        }
        if (plan.threshold_benefits?.above_threshold_benefit === 'Unlimited') {
            pros.push('Unlimited cover after threshold reached');
        }

        // Fallbacks
        if (pros.length === 0) pros.push('Standard Hospital Cover');
        if (cons.length === 0) cons.push('Standard Scheme Rules apply');

        return { pros, cons };
    };

    const { pros, cons } = getTradeOffs();

    return (
        <div
            className={clsx(
                "relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden group",
                isPinned ? "border-slate-900 shadow-md ring-1 ring-slate-900/10" : "border-slate-200 shadow-sm hover:border-slate-300"
            )}
        >
            {/* PIN INDICATOR */}
            {isPinned && (
                <div className="absolute top-0 right-0 bg-slate-900 text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl z-10 uppercase tracking-widest">
                    Pinned
                </div>
            )}

            {/* PIN ACTION */}
            <button
                onClick={(e) => { e.stopPropagation(); setPin(plan); }}
                className={clsx(
                    "absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all z-20",
                    isPinned ? "bg-slate-100 text-slate-400 opacity-0 pointer-events-none" : "bg-slate-50 text-slate-400 hover:bg-slate-200"
                )}
            >
                <MapPin className="w-4 h-4" />
            </button>

            <div className="p-5">
                {/* --- HEADER --- */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center p-1 shrink-0 shadow-sm">
                            {!imgError ? (
                                <Image src={logoPath} alt={schemeName} width={40} height={40} className="object-contain" onError={() => setImgError(true)} />
                            ) : (
                                <span className="text-[10px] font-black text-slate-400 uppercase">{schemeName.substring(0, 2)}</span>
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg leading-tight">{planName}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-slate-500">{schemeName}</span>
                                <span className="text-[10px] text-slate-300">•</span>
                                <div className={clsx("inline-flex items-center text-[10px] font-bold uppercase tracking-wide",
                                    restrictionLevel.includes('Network') ? "text-blue-600" : "text-emerald-600"
                                )}>
                                    {restrictionLevel === 'Any' ? <Building2 className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                                    {restrictionLevel}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="font-bold text-slate-900 text-2xl leading-none tracking-tight" suppressHydrationWarning>
                            {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(price)}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Per Month</div>
                    </div>
                </div>

                {/* --- THE TRANSPARENCY SECTION (Trade-offs) --- */}
                <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden mb-4">
                    <div className="px-4 py-2 bg-slate-100/50 border-b border-slate-100 flex items-center justify-between">
                        <h5 className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
                            <Scale className="w-3 h-3" /> The Trade-Off
                        </h5>
                        <Info className="w-3 h-3 text-slate-300" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        {/* PROS */}
                        <div className="p-4 space-y-2.5">
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1 opacity-75">Benefits & Perks</span>
                            {pros.map((pro, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="text-xs text-slate-700 font-medium leading-tight">{pro}</span>
                                </div>
                            ))}
                        </div>

                        {/* CONS */}
                        <div className="p-4 space-y-2.5 bg-slate-50/50">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 opacity-75">Compromises</span>
                            {cons.map((con, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <MinusCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                                    <span className="text-xs text-slate-500 font-medium leading-tight">{con}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- TOGGLE BUTTON --- */}
                <button
                    onClick={(e) => { e.stopPropagation(); setShowDetails(!showDetails); }}
                    className="w-full group/btn flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all mb-2"
                >
                    <span className="text-xs font-bold text-slate-600 group-hover/btn:text-slate-900 pl-1">
                        {showDetails ? "Hide Breakdown" : "View Detailed Breakdown"}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-slate-100 group-hover/btn:bg-slate-900 group-hover/btn:text-white flex items-center justify-center transition-colors">
                        {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </div>
                </button>

                {/* --- COLLAPSIBLE DETAILS & CTA --- */}
                <div className={clsx(
                    "overflow-hidden transition-all duration-500 ease-in-out",
                    showDetails ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}>
                    <div className="pt-2 pb-1 space-y-4">

                        {/* 1. Technical Specs Grid */}
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
                                <Shield className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                                <div className="text-[10px] text-slate-500 uppercase font-bold">Rate</div>
                                <div className="text-xs font-black text-slate-900">{rates.hospital_account}%</div>
                            </div>
                            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
                                <Stethoscope className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                                <div className="text-[10px] text-slate-500 uppercase font-bold">Specialist</div>
                                <div className="text-xs font-black text-slate-900">{rates.specialist_in_hospital}%</div>
                            </div>
                            <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
                                <Activity className="w-4 h-4 mx-auto mb-1 text-slate-400" />
                                <div className="text-[10px] text-slate-500 uppercase font-bold">Chronic</div>
                                <div className="text-xs font-black text-slate-900">{plan.network_rules?.chronic_provider === 'Any' ? 'Any' : 'DSP'}</div>
                            </div>
                        </div>

                        {/* 2. Primary Lead Gen CTA */}
                        <div className="bg-slate-900 rounded-xl p-4 text-center">
                            <h4 className="text-white font-bold text-sm mb-1">Unsure about the fine print?</h4>
                            <p className="text-slate-400 text-xs mb-4">Get a licensed broker to explain the exclusions on this plan.</p>

                            <button
                                onClick={(e) => { e.stopPropagation(); onVerify(planName); }}
                                className="w-full py-3 bg-white text-slate-900 font-bold text-xs rounded-lg shadow-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <Phone className="w-3.5 h-3.5" />
                                Request A Call Back
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}