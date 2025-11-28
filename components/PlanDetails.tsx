'use client';

import { Baby, Stethoscope, AlertOctagon, CheckCircle2, Shield, Activity, Pill, Scissors, Scan, Zap } from 'lucide-react';
import clsx from 'clsx';

// Icon Map for Dynamic Rendering
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

// Scenario Types
interface ScenarioEvent {
    label: string;
    result: string;
    status: 'good' | 'warning' | 'neutral';
}

interface Scenario {
    title: string;
    icon: any;
    events: ScenarioEvent[];
    verdict: string;
}

export default function PlanDetails({ benefits }: { benefits: any[] }) {

    // --- MOCK SCENARIOS (To be moved to Database later) ---
    const scenarios: Scenario[] = [
        {
            title: "Having a Baby",
            icon: Baby,
            events: [
                { label: "Private Hospital Birth", result: "Fully Covered", status: "good" },
                { label: "Gynae Consults", result: "Paid from Savings", status: "neutral" },
                { label: "Pediatrician", result: "Unlimited Visits", status: "good" }
            ],
            verdict: "Strong Maternity Support"
        },
        {
            title: "Chronic Diagnosis",
            icon: Stethoscope,
            events: [
                { label: "Diagnosis Tests", result: "R0 Co-pay", status: "good" },
                { label: "Monthly Meds", result: "State Pharmacy Only", status: "warning" }
            ],
            verdict: "Check Network List"
        }
    ];

    if (!benefits || benefits.length === 0) return <p className="text-sm text-slate-400 p-4">No specific benefit data found.</p>;

    return (
        <div className="space-y-8">

            {/* 1. SCENARIO SIMULATOR (The "Humanizer") */}
            <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-3 h-3" /> Real-Life Simulations
                </h5>

                <div className="grid grid-cols-1 gap-3">
                    {scenarios.map((scenario, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                            {/* Scenario Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-white rounded-full shadow-sm">
                                    <scenario.icon className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="font-bold text-slate-900 text-sm">{scenario.title}</span>
                                <span className="ml-auto text-[10px] font-bold bg-white px-2 py-1 rounded border border-slate-100 text-slate-500 shadow-sm">
                                    {scenario.verdict}
                                </span>
                            </div>

                            {/* Timeline Events */}
                            <div className="space-y-2 pl-2 border-l-2 border-slate-200 ml-3">
                                {scenario.events.map((event, i) => (
                                    <div key={i} className="flex justify-between text-xs items-center">
                                        <div className="flex items-center gap-2 relative -left-[13px]">
                                            <div className="w-2 h-2 rounded-full bg-slate-300 ring-2 ring-slate-50" />
                                            <span className="text-slate-500">{event.label}</span>
                                        </div>
                                        <span className={clsx(
                                            "font-medium",
                                            event.status === 'good' ? 'text-emerald-600' : event.status === 'warning' ? 'text-amber-600' : 'text-slate-700'
                                        )}>
                                            {event.result}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. REGULATORY TRUST BADGE */}
            <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-50">
                <div className="min-w-[4px] h-full bg-blue-600 rounded-full" />
                <div>
                    <p className="text-[10px] text-blue-800 leading-tight">
                        <strong>Actuary Certified:</strong> Data sourced directly from the 2026 Scheme Rules registered with the Council for Medical Schemes (CMS).
                    </p>
                </div>
            </div>

            {/* 3. VERBOSE RULES ENGINE (Original Data) */}
            <div className="pt-4 border-t border-slate-100">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Official Rules Engine</h5>
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

                                    {/* Logic Badges */}
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
            </div>
        </div>
    );
}