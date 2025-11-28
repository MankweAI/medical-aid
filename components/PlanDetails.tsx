'use client';

import { Shield, Activity, Pill, Baby, Stethoscope, Scissors, Scan, Zap, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

// Icon Map
const ICONS: Record<string, any> = {
    'Hospitalization': Shield,
    'Oncology': Activity,
    'Chronic': Pill,
    'Maternity': Baby,
    'Specialist': Stethoscope,
    'Day Surgery': Scissors,
    'Scopes': Scan,
    'Emergency': Zap
};

export default function PlanDetails({ benefits }: { benefits: any[] }) {
    if (!benefits || benefits.length === 0) return <p className="text-sm text-slate-400 p-4">No specific benefit data found.</p>;

    return (
        <div className="space-y-4">
            {benefits.map((benefit, idx) => {
                const Icon = ICONS[benefit.category] || CheckCircle2;
                return (
                    <div key={idx} className="flex gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl h-fit">
                            <Icon className="w-5 h-5" />
                        </div>
                        <div>
                            <h5 className="font-bold text-slate-900 text-sm">{benefit.category}: {benefit.benefit_name}</h5>
                            <p className="text-xs text-slate-500 leading-relaxed mt-1">{benefit.display_text}</p>

                            {/* Rule Badges */}
                            <div className="flex gap-2 mt-2">
                                {benefit.rule_logic?.deductible > 0 && (
                                    <span className="px-2 py-1 bg-rose-50 text-rose-700 text-[10px] font-bold rounded">
                                        Deductible: R{benefit.rule_logic.deductible}
                                    </span>
                                )}
                                {benefit.rule_logic?.limit && (
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">
                                        Limit: {benefit.rule_logic.limit}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
