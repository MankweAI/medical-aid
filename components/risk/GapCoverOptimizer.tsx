'use client';
import React from 'react';

interface GapProps {
    liability: number;
}

export function GapCoverOptimizer({ liability }: GapProps) {
    // Simple Math: Gap Cover is approx R350/pm vs the Liability
    const gapCost = 350;
    const roi = (liability / gapCost).toFixed(1);
    const monthsToBreakeven = Math.ceil(liability / gapCost);

    return (
        <div className="mt-6 relative overflow-hidden rounded-2xl shadow-2xl">
            {/* ANIMATED GRADIENT BACKGROUND */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

            {/* FLOATING ACCENT */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl" />

            {/* CONTENT */}
            <div className="relative z-10">

                {/* HEADER */}
                <div className="p-6 pb-4 flex items-start gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/30 rounded-2xl blur animate-pulse" />
                        <div className="relative bg-white/20 backdrop-blur-sm p-3 rounded-2xl border border-white/30">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-white font-bold text-lg tracking-tight">
                            The "Instant Fix" Solution
                        </h3>
                        <p className="text-emerald-100 text-sm mt-1">
                            Don't pay the hospital R{liability.toLocaleString()}. Let Gap Cover pay it.
                        </p>
                    </div>
                </div>

                {/* COMPARISON GRID */}
                <div className="grid grid-cols-2 mx-4 rounded-xl overflow-hidden border border-white/20">
                    {/* YOUR RISK */}
                    <div className="p-5 bg-black/20 backdrop-blur-sm text-center">
                        <div className="text-xs text-emerald-200 uppercase font-bold tracking-wider mb-2">
                            Your Risk
                        </div>
                        <div className="text-3xl font-black text-white">
                            R{liability.toLocaleString()}
                        </div>
                        <div className="text-xs text-emerald-200/70 mt-1">
                            One-time payment
                        </div>
                    </div>

                    {/* GAP COST */}
                    <div className="p-5 bg-white/10 backdrop-blur-sm text-center border-l border-white/20">
                        <div className="text-xs text-emerald-200 uppercase font-bold tracking-wider mb-2">
                            Gap Cost
                        </div>
                        <div className="text-3xl font-black text-white">
                            ±R{gapCost}
                        </div>
                        <div className="text-xs text-emerald-200/70 mt-1">
                            Per month
                        </div>
                    </div>
                </div>

                {/* ROI BANNER */}
                <div className="mx-4 mt-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 flex items-center justify-center text-xl">
                            ⚡
                        </div>
                        <div>
                            <div className="text-white font-bold text-lg">
                                {roi}x Return
                            </div>
                            <div className="text-emerald-100 text-xs">
                                In your first month
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-emerald-100 text-xs uppercase tracking-wider">
                            Break-even in
                        </div>
                        <div className="text-white font-bold">
                            {monthsToBreakeven} {monthsToBreakeven === 1 ? 'month' : 'months'}
                        </div>
                    </div>
                </div>

                {/* CTA SECTION */}
                <div className="p-6 pt-4 space-y-4">
                    {/* Primary CTA */}
                    <button className="w-full group relative overflow-hidden bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3">
                        <span className="relative z-10">Get a Gap Cover Quote</span>
                        <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>

                    {/* Secondary CTA */}
                    <div className="text-center">
                        <div className="text-xs text-emerald-200/70 mb-2">OR</div>
                        <button className="text-sm text-white/90 hover:text-white font-medium underline decoration-white/30 underline-offset-4 hover:decoration-white/60 transition-all">
                            Speak to a Specialist about this Procedure
                        </button>
                    </div>
                </div>

                {/* TRUST BADGE */}
                <div className="px-6 pb-6">
                    <div className="flex items-center justify-center gap-2 text-xs text-emerald-100/70">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Trusted by 50,000+ South African families</span>
                    </div>
                </div>
            </div>
        </div>
    );
}