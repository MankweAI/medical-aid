import React from 'react';
import { Stethoscope, FileText, Smartphone, Hospital } from 'lucide-react';

interface ProcedureTimelineProps {
    planName: string;
    isInNetworkOnly?: boolean;
    rateCovered?: string;
    hospitalNetwork?: string;
}

export function ProcedureTimeline({ planName, isInNetworkOnly, rateCovered, hospitalNetwork }: ProcedureTimelineProps) {
    const steps = [
        {
            icon: Stethoscope,
            title: "See your Doctor",
            desc: isInNetworkOnly
                ? "Consult a Network GP to avoid out-of-pocket consultation fees."
                : "Consult your GP or Specialist to confirm the need for the procedure."
        },
        {
            icon: FileText,
            title: "Get a Quote",
            desc: `Ask for a detailed quote. Check if it falls within the ${rateCovered || '100%'} Discovery Health Rate covered by ${planName}.`
        },
        {
            icon: Smartphone,
            title: "Pre-authorize",
            desc: `Submit your quote to Discovery Health. Mention you are on the ${planName} plan.`
        },
        {
            icon: Hospital,
            title: "Admission",
            desc: `Ensure you choose a hospital from: ${hospitalNetwork || 'Any private hospital'} to avoid co-payments.`
        }
    ];

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 mb-6">Administrative Timeline</h2>
            <div className="relative">
                {/* Connector Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-100" />

                <div className="space-y-8 relative z-10">
                    {steps.map((step, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                                <step.icon className="w-5 h-5 text-slate-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed max-w-xs">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
