import React from 'react';
import { Phone } from 'lucide-react';

interface SchemeCTAProps {
    planName: string;
}

export function SchemeCTA({ planName }: SchemeCTAProps) {
    return (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-4">
                <h3 className="text-xl font-black text-white">
                    Ready to Join {planName}?
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Speak to an accredited broker who can help you switch or sign up.
                </p>
                <button className="mt-4 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:from-emerald-600 hover:to-emerald-500">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Get Expert Advice
                </button>
            </div>
        </div>
    );
}
