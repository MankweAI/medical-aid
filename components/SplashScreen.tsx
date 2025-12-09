'use client';

import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
    const [showSplash, setShowSplash] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Check if splash was already shown this session
        const hasSeenSplash = sessionStorage.getItem('healthos-splash-seen');

        if (hasSeenSplash) {
            setShowSplash(false);
            return;
        }

        // Auto-dismiss after 1.5 seconds
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
                setShowSplash(false);
                sessionStorage.setItem('healthos-splash-seen', 'true');
            }, 500); // Match animation duration
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Allow tap to dismiss
    const handleDismiss = () => {
        if (!isExiting) {
            setIsExiting(true);
            setTimeout(() => {
                setShowSplash(false);
                sessionStorage.setItem('healthos-splash-seen', 'true');
            }, 500);
        }
    };

    if (!showSplash) return <>{children}</>;

    return (
        <>
            {/* Splash Overlay */}
            <div
                onClick={handleDismiss}
                className={`fixed inset-0 z-[99999] bg-slate-900 flex flex-col items-center justify-center cursor-pointer ${isExiting ? 'animate-splash-exit' : ''}`}
            >
                {/* Logo Container */}
                <div className="animate-splash-pulse">
                    <div className="w-24 h-24 bg-white rounded-[28px] flex items-center justify-center shadow-2xl shadow-white/20">
                        <Zap className="w-12 h-12 text-slate-900 fill-current" />
                    </div>
                </div>

                {/* Brand Name */}
                <h1 className="mt-8 text-3xl font-black text-white tracking-tight">
                    HealthOS
                </h1>
                <p className="mt-2 text-sm font-medium text-slate-400 tracking-widest uppercase">
                    Virtual Actuary
                </p>

                {/* Subtle hint */}
                <p className="absolute bottom-12 text-xs text-slate-500 font-medium">
                    Tap to continue
                </p>
            </div>

            {/* Content hidden behind splash */}
            <div className="opacity-0">{children}</div>
        </>
    );
}
