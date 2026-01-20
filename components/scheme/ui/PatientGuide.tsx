import React from 'react';
import { Clock, CheckCircle2, HeartPulse, Wallet } from 'lucide-react';

interface PatientGuideProps {
    preparation: string[];
    recoveryTime: string;
    msaLimit?: string;
}

export function PatientGuide({ preparation, recoveryTime, msaLimit }: PatientGuideProps) {
    if (!preparation?.length && !recoveryTime && !msaLimit) return null;

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
                <HeartPulse className="w-6 h-6 text-rose-500" />
                <h2 className="text-lg font-black text-slate-900">Patient Guide</h2>
            </div>

            {msaLimit && (
                <div className="pb-4 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Financial Readiness</h3>
                    <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl text-emerald-900 border border-emerald-100">
                        <Wallet className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-bold uppercase text-emerald-600 mb-1">Medical Savings Account</p>
                            <p className="text-sm leading-relaxed">
                                Ensure you have sufficient funds in your MSA. Your generic annual allocation is <strong>{msaLimit}</strong> (varies by family size).
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {preparation && preparation.length > 0 && (
                <div>
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">How to Prepare</h3>
                    <ul className="space-y-3">
                        {preparation.map((step, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-600 leading-relaxed">{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {recoveryTime && (
                <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Recovery Time</h3>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl text-blue-900">
                        <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-sm leading-relaxed font-medium">{recoveryTime}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
