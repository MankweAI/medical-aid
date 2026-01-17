'use client';

import { useState } from 'react';
import Link from 'next/link';
import ConditionSelector from '@/components/ConditionSelector';
import { Zap, Activity, FileText, Scale } from 'lucide-react';
import clsx from 'clsx';

export default function HomeHero() {
    const [activeTab, setActiveTab] = useState<'optimize' | 'audit' | 'compare'>('optimize');

    return (
        <section className="w-full max-w-5xl mx-auto relative z-20">

            {/* HEADER SECTION */}
            <div className="text-center mb-10 px-4 animate-in fade-in slide-in-from-top-4 duration-700">
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
                    Find Your Perfect <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                        Medical Aid
                    </span>
                </h1>

                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
                    Navigate 70+ plans with confidence. Use our "Virtual Actuary" to optimize coverage or audit your current plan.
                </p>
            </div>

            {/* TAB INTERFACE */}
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                {/* Tab Headers */}
                <div className="flex border-b border-slate-100 bg-slate-50/50">
                    <button
                        onClick={() => setActiveTab('optimize')}
                        className={clsx(
                            "flex-1 py-4 text-center font-bold text-sm transition-all flex items-center justify-center gap-2 border-b-2",
                            activeTab === 'optimize' ? "border-emerald-500 text-emerald-700 bg-white" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                        )}
                    >
                        <Zap className="w-4 h-4" /> Optimize
                    </button>
                    <button
                        onClick={() => setActiveTab('audit')}
                        className={clsx(
                            "flex-1 py-4 text-center font-bold text-sm transition-all flex items-center justify-center gap-2 border-b-2",
                            activeTab === 'audit' ? "border-emerald-500 text-emerald-700 bg-white" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                        )}
                    >
                        <FileText className="w-4 h-4" /> Audit Plan
                    </button>
                    <button
                        onClick={() => setActiveTab('compare')}
                        className={clsx(
                            "flex-1 py-4 text-center font-bold text-sm transition-all flex items-center justify-center gap-2 border-b-2",
                            activeTab === 'compare' ? "border-emerald-500 text-emerald-700 bg-white" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                        )}
                    >
                        <Scale className="w-4 h-4" /> Compare
                    </button>
                </div>

                {/* Tab Content */}
                <div className="p-6 md:p-8 min-h-[400px]">
                    {activeTab === 'optimize' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="text-center mb-6">
                                <h3 className="text-lg font-bold text-slate-900">Find the Best Plan for a Condition</h3>
                                <p className="text-slate-500 text-sm">Select a medical need to see top-ranked plans.</p>
                            </div>
                            <ConditionSelector baseRoute="/medical-aid-optimization" />
                        </div>
                    )}

                    {activeTab === 'audit' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="text-center mb-8">
                                <h3 className="text-lg font-bold text-slate-900">Audit Your Current Liability</h3>
                                <p className="text-slate-500 text-sm">Select a common plan to see a detailed cost breakdown.</p>
                            </div>

                            {/* Simple Quick Links for Demo Audits - In future this would be a full selector */}
                            <div className="grid gap-4">
                                <Link href="/audit/digestive-disorders-cost-audit-discovery-smart-classic" className="block p-4 border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all group">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-slate-900">Discovery Smart Classic</p>
                                            <p className="text-sm text-slate-500">Audit for Digestive Disorders (Scope)</p>
                                        </div>
                                        <Activity className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" />
                                    </div>
                                </Link>
                                <Link href="/audit/joint-care-cost-audit-bestmed-pace2" className="block p-4 border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all group">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-slate-900">Bestmed Pace 2</p>
                                            <p className="text-sm text-slate-500">Audit for Joint Replacements</p>
                                        </div>
                                        <Activity className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" />
                                    </div>
                                </Link>
                                <Link href="/audit/maternity-care-cost-audit-bonitas-bonclassic" className="block p-4 border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all group">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-slate-900">Bonitas BonClassic</p>
                                            <p className="text-sm text-slate-500">Audit for Maternity</p>
                                        </div>
                                        <Activity className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}

                    {activeTab === 'compare' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 text-center py-12">
                            <div className="max-w-md mx-auto">
                                <Scale className="w-12 h-12 text-emerald-100 bg-emerald-50 rounded-full p-2 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Head-to-Head Comparison</h3>
                                <p className="text-slate-500 mb-8">
                                    Compare any two plans side-by-side to reveal hidden benefit differences.
                                </p>
                                <Link
                                    href="/compare/discovery-classic-saver-vs-bestmed-pace2"
                                    className="inline-flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
                                >
                                    Start Comparison
                                </Link>
                                <p className="text-xs text-slate-400 mt-4">
                                    Popular: Discovery Classic Saver vs Bestmed Pace 2
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}