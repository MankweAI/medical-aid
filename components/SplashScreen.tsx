'use client';

import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
    const [showSplash, setShowSplash] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const hasSeenSplash = sessionStorage.getItem('healthos-splash-seen');

        if (hasSeenSplash) {
            setShowSplash(false);
            return;
        }

        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
                setShowSplash(false);
                sessionStorage.setItem('healthos-splash-seen', 'true');
            }, 500);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

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
            {/* Splash Overlay - Emerald Green Theme */}
            <div
                onClick={handleDismiss}
                className={`fixed inset-0 z-[99999] bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 flex flex-col items-center justify-center cursor-pointer ${isExiting ? 'animate-splash-exit' : ''}`}
            >
                <div className="animate-splash-pulse">
                    <div className="w-24 h-24 bg-white rounded-[28px] flex items-center justify-center shadow-2xl shadow-emerald-900/30">
                        <Zap className="w-12 h-12 text-emerald-600 fill-current" />
                    </div>
                </div>

                <h1 className="mt-8 text-3xl font-black text-white tracking-tight">
                    HealthOS
                </h1>
                <p className="mt-2 text-sm font-medium text-emerald-100/80 tracking-widest uppercase">
                    Virtual Actuary
                </p>

                <p className="absolute bottom-12 text-xs text-emerald-200/60 font-medium">
                    Tap to continue
                </p>
            </div>

            <div className="opacity-0">{children}</div>
        </>
    );
}
