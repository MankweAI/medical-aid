import React from 'react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-6">
            <div className="max-w-sm w-full">

                {/* ANIMATED LOGO */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl blur-xl opacity-40 animate-pulse" />
                        <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-2xl shadow-lg">
                            <svg className="w-10 h-10 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* TEXT */}
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Calculating Liability</h2>
                    <p className="text-slate-500 text-sm">Running actuarial rules engine...</p>
                </div>

                {/* STEP INDICATORS */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-sm text-slate-600">Accessing 2026 Plan Rules</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                            </div>
                            <span className="text-sm text-slate-900 font-medium">Checking Network Penalties</span>
                        </div>
                        <div className="flex items-center gap-3 opacity-50">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-slate-300" />
                            </div>
                            <span className="text-sm text-slate-500">Generating Hospital Bill</span>
                        </div>
                    </div>
                </div>

                {/* PROGRESS BAR */}
                <div className="relative">
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse" style={{ width: '66%' }} />
                    </div>
                    <div className="absolute inset-0 flex">
                        <div className="h-2 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full animate-shimmer"
                            style={{ width: '30%', animation: 'shimmer 1.5s infinite' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}