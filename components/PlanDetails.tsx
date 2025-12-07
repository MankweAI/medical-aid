import { Plan } from '@/utils/types';
import {
    ScrollText,
    AlertTriangle,
    Stethoscope,
    Building,
    FileText,
    Activity
} from 'lucide-react';
import clsx from 'clsx';

interface PlanDetailsProps {
    plan: Plan;
}

export default function PlanDetails({ plan }: PlanDetailsProps) {
    // Safe accessors
    const copays = plan.risk_exposure?.co_payments || {};
    const rules = plan.network_rules || {};
    const maternity = plan.defined_baskets?.maternity || {};

    return (
        <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden text-left">

            {/* 1. TECHNICAL HEADER */}
            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <FileText className="w-3 h-3" /> Policy Rules & Exclusions
                </span>
                <span className="text-[9px] text-slate-400 font-mono">ID: {plan.id}</span>
            </div>

            <div className="p-4 space-y-6">

                {/* 2. NETWORK & PENALTIES (The Scary Part) */}
                <section>
                    <h4 className="text-xs font-bold text-slate-900 uppercase mb-2 flex items-center gap-2">
                        <Building className="w-3.5 h-3.5 text-slate-500" /> Hospital Protocols
                    </h4>
                    <div className="bg-white border border-slate-200 rounded-md divide-y divide-slate-100">
                        <div className="p-2 flex justify-between items-start">
                            <span className="text-[10px] text-slate-500 font-medium">Provider Network</span>
                            <span className="text-[10px] font-bold text-slate-900 text-right max-w-[150px]">
                                {rules.hospital_provider}
                            </span>
                        </div>
                        <div className="p-2 flex justify-between items-start">
                            <span className="text-[10px] text-slate-500 font-medium">Voluntary Admission Penalty</span>
                            <span className={clsx("text-[10px] font-bold text-right", copays.admission_penalty_non_network > 0 ? "text-rose-600" : "text-slate-900")}>
                                {copays.admission_penalty_non_network > 0
                                    ? `Member liable for R${copays.admission_penalty_non_network.toLocaleString()}`
                                    : 'None'}
                            </span>
                        </div>
                    </div>
                </section>

                {/* 3. CLINICAL RISK (Co-payments) */}
                <section>
                    <h4 className="text-xs font-bold text-slate-900 uppercase mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-slate-500" /> Member Liability (Co-payments)
                    </h4>
                    <div className="bg-white border border-slate-200 rounded-md divide-y divide-slate-100">
                        <div className="p-2 flex justify-between">
                            <span className="text-[10px] text-slate-500 font-medium">Diagnostic Imaging (MRI/CT)</span>
                            <span className="text-[10px] font-bold text-slate-900">
                                {copays.mri_scan > 0 ? `R${copays.mri_scan.toLocaleString()} Deductible` : 'Scheme Risk (100%)'}
                            </span>
                        </div>
                        <div className="p-2 flex justify-between">
                            <span className="text-[10px] text-slate-500 font-medium">Endoscopic Procedures</span>
                            <span className="text-[10px] font-bold text-slate-900">
                                {copays.scope_in_hospital > 0 ? `R${copays.scope_in_hospital.toLocaleString()} (In-Hospital)` : 'No Co-payment'}
                            </span>
                        </div>
                        <div className="p-2 flex justify-between">
                            <span className="text-[10px] text-slate-500 font-medium">Specialist Rate Coverage</span>
                            <span className="text-[10px] font-bold text-slate-900">
                                {plan.coverage_rates?.specialist_in_hospital}% of Scheme Tariff
                            </span>
                        </div>
                    </div>
                    {plan.coverage_rates?.specialist_in_hospital === 100 && (
                        <p className="text-[9px] text-amber-700 mt-1 pl-1">
                            * Warning: Specialists charging above 100% tariff will result in shortfall.
                        </p>
                    )}
                </section>

                {/* 4. CHRONIC & DAY-TO-DAY */}
                <section>
                    <h4 className="text-xs font-bold text-slate-900 uppercase mb-2 flex items-center gap-2">
                        <Stethoscope className="w-3.5 h-3.5 text-slate-500" /> Out-of-Hospital Management
                    </h4>
                    <div className="bg-white border border-slate-200 rounded-md divide-y divide-slate-100">
                        <div className="p-2 flex justify-between">
                            <span className="text-[10px] text-slate-500 font-medium">Chronic Provider (DSP)</span>
                            <span className="text-[10px] font-bold text-slate-900">{rules.chronic_provider}</span>
                        </div>
                        <div className="p-2 flex justify-between">
                            <span className="text-[10px] text-slate-500 font-medium">Maternity Protocol</span>
                            <span className="text-[10px] font-bold text-slate-900">
                                {maternity.antenatal_consults}x Consults & {maternity.ultrasounds_2d}x Scans
                            </span>
                        </div>
                    </div>
                </section>

                {/* 5. RED FLAG (The Closer) */}
                {plan.risk_exposure?.red_flag && (
                    <div className="bg-rose-50 border border-rose-100 p-3 rounded-md">
                        <h5 className="text-[9px] font-black text-rose-800 uppercase mb-1 flex items-center gap-1">
                            <ScrollText className="w-3 h-3" /> Specific Exclusion Detected
                        </h5>
                        <p className="text-[10px] text-rose-700 leading-relaxed font-medium">
                            {plan.risk_exposure.red_flag}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}