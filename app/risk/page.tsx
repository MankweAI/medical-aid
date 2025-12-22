import React from 'react';
import Link from 'next/link';
import { ProcedureAutocomplete } from '@/components/risk/ProcedureAutocomplete';
import { PROCEDURES_2026 } from '@/data/procedures-2026';

export const metadata = {
    title: 'Surgery Cost Simulator 2026 | Intellihealth',
    description: 'Calculate your exact upfront payments for surgery on Discovery Health. Check deductibles for Knee Replacement, C-Section, and more.',
};

// Popular procedures for quick access
const FEATURED_PROCEDURES = ['knee-replacement', 'c-section', 'gastroscopy', 'cataract-surgery'];

export default function RiskHubPage() {
    const featured = PROCEDURES_2026.filter(p => FEATURED_PROCEDURES.includes(p.id));

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* ANIMATED GRADIENT BACKGROUND */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
                {/* Floating Orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200/40 to-teal-300/30 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-200/30 to-emerald-200/40 rounded-full blur-3xl animate-float-delayed" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-teal-100/20 to-emerald-100/30 rounded-full blur-3xl" />
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">

                {/* GLASSMORPHIC HERO CARD */}
                <div className="w-full max-w-2xl">
                    <div className="backdrop-blur-xl bg-white/70 rounded-3xl border border-white/50 shadow-2xl shadow-emerald-900/10 p-8 md:p-12">

                        {/* Icon Badge */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl blur-lg opacity-40 animate-pulse-glow" />
                                <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-2xl shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Headline */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-center text-slate-900 tracking-tight mb-4">
                            Surgery Cost
                            <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Simulator
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg text-slate-600 text-center leading-relaxed mb-8 max-w-lg mx-auto">
                            Don't get surprised at the admission desk.
                            <br />
                            <span className="font-semibold text-slate-800">See your 2026 hospital bill before you book.</span>
                        </p>

                        {/* Search Component */}
                        <div className="mb-8">
                            <ProcedureAutocomplete />
                        </div>

                        {/* Quick Access Pills */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold mr-2 self-center">
                                Popular:
                            </span>
                            {featured.map((proc) => (
                                <Link
                                    key={proc.id}
                                    href={`/risk/${proc.id}/active-smart`}
                                    className="px-4 py-2 bg-white/80 hover:bg-emerald-50 border border-slate-200/80 rounded-full text-sm font-medium text-slate-700 hover:text-emerald-700 hover:border-emerald-300 transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    {proc.label}
                                </Link>
                            ))}
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/50">
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                    <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-black text-xl text-slate-900">12+</span>
                                </div>
                                <span className="text-xs text-slate-500 font-medium">Procedures</span>
                            </div>
                            <div className="text-center border-x border-slate-200/50">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                    <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-black text-xl text-slate-900">100%</span>
                                </div>
                                <span className="text-xs text-slate-500 font-medium">Accuracy</span>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                    <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-black text-xl text-slate-900">R0</span>
                                </div>
                                <span className="text-xs text-slate-500 font-medium">Hidden Fees</span>
                            </div>
                        </div>
                    </div>

                    {/* TRUST BADGE */}
                    <div className="flex items-center justify-center gap-2 mt-6 text-sm text-slate-500">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span>Powered by <strong className="text-slate-700">Intellihealth</strong> Actuarial Engine</span>
                    </div>
                </div>
            </div>
        </div>
    );
}