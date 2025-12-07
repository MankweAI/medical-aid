'use client';

import { Plan } from '@/context/CompareContext';
import {
    Shield,
    Baby,
    Activity,
    Pill,
    Scan,
    AlertOctagon,
    CheckCircle2,
    XCircle,
    Stethoscope
} from 'lucide-react';
import clsx from 'clsx';

export default function PlanDetails({ plan }: { plan: Plan }) {
    if (!plan) return null;

    // Helper for currency
    const fmt = (val: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="space-y-8">

            {/* 1. THE CLINICAL SCANNER (Traffic Light System) */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hospital</span>
                    </div>
                    <div className="text-2xl font-black text-slate-900">
                        {plan.coverage_rates.hospital_account}%
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Scheme Rate Coverage</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Stethoscope className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Specialist</span>
                    </div>
                    <div className="text-2xl font-black text-slate-900">
                        {plan.coverage_rates.specialist_in_hospital}%
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">In-Hospital Rate</p>
                </div>
            </div>

            {/* 2. THE MATERNITY BASKET */}
            <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4">
                    <Baby className="w-4 h-4 text-blue-600" />
                    Maternity Basket (Risk Funded)
                </h5>
                <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 space-y-3">
                    <Row
                        label="Antenatal Consults"
                        value={plan.defined_baskets.maternity.antenatal_consults > 0 ? `${plan.defined_baskets.maternity.antenatal_consults} Visits` : 'Paid from Savings'}
                        isGood={plan.defined_baskets.maternity.antenatal_consults > 0}
                    />
                    <Row
                        label="2D Ultrasounds"
                        value={plan.defined_baskets.maternity.ultrasounds_2d > 0 ? `${plan.defined_baskets.maternity.ultrasounds_2d} Scans` : 'Paid from Savings'}
                        isGood={plan.defined_baskets.maternity.ultrasounds_2d > 0}
                    />
                    <Row
                        label="Paediatrician"
                        value={plan.defined_baskets.maternity.paediatrician_visits > 0 ? `${plan.defined_baskets.maternity.paediatrician_visits} Visits` : 'No Benefit'}
                        isGood={plan.defined_baskets.maternity.paediatrician_visits > 0}
                    />
                </div>
            </div>

            {/* 3. THE CO-PAY MONITOR (The "Nasty" List) */}
            <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4">
                    <AlertOctagon className="w-4 h-4 text-rose-600" />
                    Co-pay Monitor
                </h5>
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
                    <CoPayRow
                        icon={Scan}
                        label="MRI & CT Scans"
                        amount={plan.procedure_copays.mri_scan}
                    />
                    <CoPayRow
                        icon={Activity}
                        label="Scopes (In-Hospital)"
                        amount={plan.procedure_copays.scope_in_hospital}
                    />
                    <CoPayRow
                        icon={Shield}
                        label="Joint Replacement"
                        amount={plan.procedure_copays.joint_replacement}
                        isCritical={true}
                    />
                </div>
            </div>

            {/* 4. CHRONIC & MEDS */}
            <div>
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4">
                    <Pill className="w-4 h-4 text-emerald-600" />
                    Medicine Strategy
                </h5>
                <div className="flex gap-2">
                    <Badge label="Network Provider" value={plan.network_restriction === 'Network' ? 'Restricted' : 'Any'} type={plan.network_restriction === 'Network' ? 'warning' : 'neutral'} />
                    <Badge label="Contraceptives" value={`R${plan.defined_baskets.preventative.contraceptives}`} type="good" />
                </div>
            </div>

        </div>
    );
}

// --- SUB COMPONENTS ---

function Row({ label, value, isGood }: { label: string, value: string, isGood: boolean }) {
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 font-medium">{label}</span>
            <span className={clsx("font-bold", isGood ? "text-slate-900" : "text-slate-400")}>{value}</span>
        </div>
    );
}

function CoPayRow({ icon: Icon, label, amount, isCritical }: { icon: any, label: string, amount: number, isCritical?: boolean }) {
    const hasCopay = amount > 0;
    return (
        <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
                <div className={clsx("p-2 rounded-full", hasCopay ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600")}>
                    <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-700">{label}</span>
            </div>
            <div className="text-right">
                <span className={clsx("block font-black text-sm", hasCopay ? "text-rose-600" : "text-emerald-600")}>
                    {hasCopay ? `R${amount}` : 'Covered'}
                </span>
                {hasCopay && <span className="text-[10px] text-rose-400 font-bold uppercase">You Pay</span>}
            </div>
        </div>
    );
}

function Badge({ label, value, type }: { label: string, value: string, type: 'good' | 'warning' | 'neutral' }) {
    const styles = {
        good: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        warning: 'bg-amber-50 text-amber-700 border-amber-100',
        neutral: 'bg-slate-50 text-slate-700 border-slate-100'
    };

    return (
        <div className={clsx("flex-1 px-3 py-2 rounded-xl border flex flex-col justify-center items-center text-center", styles[type])}>
            <span className="text-[9px] font-bold uppercase opacity-70 mb-0.5">{label}</span>
            <span className="text-xs font-black">{value}</span>
        </div>
    );
}