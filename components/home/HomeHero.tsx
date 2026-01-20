'use client';

import Link from 'next/link';
import { Search, Scale, FileText } from 'lucide-react';

export default function HomeHero() {
    return (
        <section className="w-full max-w-5xl mx-auto relative z-20">

            {/* HEADER SECTION */}
            <div className="text-center mb-12 px-4 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full px-4 py-2 mb-8 shadow-sm">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                        2026 Rules Active
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]">
                    Medical Aid, <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                        Decoded
                    </span>
                </h1>

                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed mb-10">
                    Navigate 70+ plans with confidence. Compare premiums, audit hospital cover, and find your perfect match with algorithmic precision.
                </p>

                {/* ACTION CENTER */}
                <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/discovery-health"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 transition-all transform hover:-translate-y-0.5"
                    >
                        <Search className="w-5 h-5" />
                        Browse Plans
                    </Link>
                    <Link
                        href="/discovery-health/keycare-plus-vs-executive-plan"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 hover:border-emerald-200 hover:text-emerald-700 transition-all"
                    >
                        <Scale className="w-5 h-5" />
                        Compare Example
                    </Link>
                </div>
            </div>

            {/* FEATURED INSIGHT CARDS */}
            <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                <Link
                    href="/discovery-health/executive-plan"
                    className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-xl shadow-slate-200/50 hover:border-emerald-200 hover:bg-white transition-all group"
                >
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">Executive Plan</h3>
                    <p className="text-sm text-slate-500">
                        See the highest level of comprehensive cover available in 2026.
                    </p>
                </Link>

                <Link
                    href="/discovery-health/classic-saver"
                    className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-xl shadow-slate-200/50 hover:border-emerald-200 hover:bg-white transition-all group"
                >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">Classic Saver</h3>
                    <p className="text-sm text-slate-500">
                        Explore the most popular medical savings account plan.
                    </p>
                </Link>

                <Link
                    href="/discovery-health/keycare-plus"
                    className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-xl shadow-slate-200/50 hover:border-emerald-200 hover:bg-white transition-all group"
                >
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">KeyCare Plus</h3>
                    <p className="text-sm text-slate-500">
                        Affordable network-based cover for essential needs.
                    </p>
                </Link>
            </div>
        </section>
    );
}