'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function TrustFooter() {
    return (
        <footer className="px-6 py-12 bg-slate-50 border-t border-slate-100 mb-24">
            <div className="flex flex-col gap-6">

                {/* Authority Signal */}
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-full border border-slate-200 shadow-sm shrink-0">
                        <ShieldCheck className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                        <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                            Independent Actuarial Data
                        </h5>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                            HealthOS is an algorithmic analysis tool, not a financial services provider.
                            All benefits data is sourced directly from the <span className="font-bold text-slate-700">Council for Medical Schemes (CMS)</span> 2026 registered rules.
                        </p>
                    </div>
                </div>

                {/* Links for E-E-A-T */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Link href="/methodology" className="hover:text-blue-600 transition-colors">Methodology</Link>
                    <Link href="/disclaimer" className="hover:text-blue-600 transition-colors">Disclaimer</Link>
                    <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
                    <span className="text-slate-300">© 2025 HealthOS</span>
                </div>

            </div>
        </footer>
    );
}
