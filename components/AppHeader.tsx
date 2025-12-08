'use client';

import { Zap, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function AppHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6">
            <div className="max-w-3xl mx-auto flex justify-between items-center bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm rounded-2xl p-2 px-4 transition-all hover:bg-white/90">

                {/* BRAND / BACK BUTTON */}
                <div className="flex items-center gap-3">
                    {!isHome ? (
                        <button
                            onClick={() => router.back()}
                            className="p-1.5 bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all active:scale-95"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                    ) : (
                        <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-900/20">
                            <Zap className="w-4 h-4 fill-current" />
                        </div>
                    )}

                    <Link href="/" className="flex flex-col">
                        <span className="font-black text-slate-900 tracking-tight text-sm leading-none">
                            HealthOS
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                            Virtual Actuary
                        </span>
                    </Link>
                </div>

                {/* STATUS INDICATOR (Visual Delight) */}
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase hidden sm:block">
                        2026 Rules Active
                    </span>
                </div>

            </div>
        </header>
    );
}
