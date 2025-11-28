'use client';

import { Home, Layers, User, Sparkles } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

export default function ActionDock() {
    const router = useRouter();
    const pathname = usePathname();

    const NAV_ITEMS = [
        { label: 'Home', icon: Home, route: '/' },
        { label: 'Diagnose', icon: Sparkles, route: '/diagnose', primary: true },
        { label: 'Profile', icon: User, route: '/profile' }
    ];

    return (
        // Changed: Fixed positioning now uses left-1/2 and max-w-[600px] to match App Frame
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] z-50 flex justify-center px-4 pointer-events-none">
            <div className="glass-panel pointer-events-auto flex items-center gap-1 p-2 rounded-full shadow-2xl shadow-slate-900/10">
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => router.push(item.route)}
                        className={clsx(
                            "relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 active-press",
                            item.primary
                                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/30 -translate-y-4 border-4 border-white"
                                : "hover:bg-slate-100 text-slate-400 hover:text-slate-600",
                            !item.primary && pathname === item.route && "text-blue-600 bg-blue-50"
                        )}
                    >
                        <item.icon className={clsx("w-6 h-6", item.primary && "w-6 h-6")} />

                        {/* Active Dot */}
                        {!item.primary && pathname === item.route && (
                            <span className="absolute -bottom-1 w-1 h-1 bg-blue-600 rounded-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}