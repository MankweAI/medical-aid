'use client';

import { useCompare } from '@/context/CompareContext';
import { X, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function PinnedHeader() {
    const { activePin, clearPin } = useCompare();
    const [imgError, setImgError] = useState(false);

    if (!activePin) return null;

    // Logo path logic
    const schemeSlug = activePin.scheme.toLowerCase().replace(/\s+/g, '-');
    const logoPath = `/schemes-logo/${schemeSlug}.png`;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md text-white shadow-2xl border-b border-slate-800 animate-in slide-in-from-top-full duration-300">
            <div className="max-w-[600px] mx-auto p-4 flex justify-between items-center relative overflow-hidden">

                {/* Decor */}
                <div className="absolute top-[-10%] right-[-5%] opacity-5 rotate-12 pointer-events-none">
                    <MapPin className="w-32 h-32 fill-white" />
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    {/* Logo / Fallback */}
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                        {!imgError ? (
                            <Image
                                src={logoPath}
                                alt={activePin.scheme}
                                width={40}
                                height={40}
                                className="object-contain p-1"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <span className="text-slate-900 font-black text-xs uppercase">
                                {activePin.scheme.substring(0, 3)}
                            </span>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-bold bg-blue-600 text-white px-1.5 rounded uppercase">Reference</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">{activePin.scheme}</span>
                        </div>
                        <h3 className="font-bold text-sm leading-tight">{activePin.name}</h3>
                    </div>
                </div>

                <div className="flex items-center gap-3 relative z-10">
                    <div className="text-right">
                        <span className="block text-xl font-black">
                            {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(activePin.price)}
                        </span>
                    </div>
                    <button
                        onClick={clearPin}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors active:scale-95"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}