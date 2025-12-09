'use client';

import { Zap, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { usePersona } from '@/context/PersonaContext';

export default function AppHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const isHome = pathname === '/';

    // Subscribe to chat state
    const { isChatOpen } = usePersona();

    // Hide header entirely when chat is open
    if (isChatOpen) return null;

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="w-full flex justify-between items-center bg-gradient-to-r from-emerald-600 to-emerald-500 backdrop-blur-xl border-b border-emerald-400/30 shadow-lg shadow-emerald-900/20 p-3 px-5 transition-all">

                {/* BRAND / BACK BUTTON */}
                <div className="flex items-center gap-3">
                    {!isHome ? (
                        <button
                            onClick={() => router.back()}
                            className="p-1.5 bg-white/20 rounded-lg text-white/80 hover:text-white hover:bg-white/30 transition-all active:scale-95"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                    ) : (
                        <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-lg">
                            <Zap className="w-4 h-4 fill-current" />
                        </div>
                    )}

                    <Link href="/" className="flex flex-col">
                        <span className="font-black text-white tracking-tight text-sm leading-none">
                            HealthOS
                        </span>
                        <span className="text-[9px] font-bold text-emerald-100/80 uppercase tracking-wider">
                            Virtual Actuary
                        </span>
                    </Link>
                </div>

                {/* STATUS INDICATOR */}
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-100/80 uppercase hidden sm:block">
                        2026 Rules Active
                    </span>
                </div>

            </div>
        </header>
    );
}