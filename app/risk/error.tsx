'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full text-center">

                {/* ICON */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl blur-xl opacity-30" />
                        <div className="relative bg-gradient-to-br from-red-50 to-orange-50 p-5 rounded-2xl border border-red-200">
                            <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* TEXT */}
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Calculation Error</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    We couldn't simulate the cost for this specific combination. The procedure or plan data might be temporarily unavailable.
                </p>

                {/* ACTIONS */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => reset()}
                        className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/risk"
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/20"
                    >
                        Select Different Procedure
                    </Link>
                </div>

                {/* ERROR DIGEST (for debugging) */}
                {error.digest && (
                    <p className="mt-8 text-xs text-slate-400 font-mono">
                        Error ID: {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}