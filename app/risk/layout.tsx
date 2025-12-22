import React from 'react';
import Link from 'next/link';

export default function RiskLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col" style={{ background: 'var(--app-bg, #F0FDF4)' }}>
            {/* INTELLIHEALTH SUB-NAVIGATION */}
            <nav className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white sticky top-0 z-40 shadow-lg shadow-emerald-900/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

                    {/* Brand / Home Link */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                            <img
                                src="/intellihealth-logo.png"
                                alt="Intellihealth"
                                className="w-full h-full object-cover p-1"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-white tracking-tight text-sm leading-none">
                                Intellihealth
                            </span>
                            <span className="text-[9px] font-bold text-emerald-100/80 uppercase tracking-wider">
                                Virtual Actuary
                            </span>
                        </div>
                    </Link>

                    {/* Cluster Identity */}
                    <div className="flex items-center gap-3">
                        <span className="hidden md:inline text-xs text-emerald-100/80 uppercase tracking-widest font-semibold">
                            Risk Engine
                        </span>
                        <div className="h-4 w-px bg-emerald-400/30 hidden md:block"></div>
                        <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                            2026 ACTIVE
                        </span>
                    </div>

                </div>
            </nav>

            {/* MAIN CONTENT INJECTOR */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer handled by root layout's TrustFooter */}
        </div>
    );
}