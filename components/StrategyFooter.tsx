'use client';

import { Plan } from '@/utils/types';
import { Persona } from '@/utils/persona';
import { ContentGenerator } from '@/utils/seo-content';
import SemanticGlossary from '@/components/SemanticGlossary';
import PeopleAlsoAsk from '@/components/PeopleAlsoAsk';
import { ArrowRight, TrendingDown, TrendingUp, Activity, AlertTriangle, Calculator } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

interface PivotItem {
    plan: Plan;
    persona: Persona;
}

export interface Pivots {
    cheaper: PivotItem | null;
    richer: PivotItem | null;
}

interface Props {
    plan: Plan;
    persona: Persona;
    pivots: Pivots;
}

export default function StrategyFooter({ plan, persona, pivots }: Props) {
    const glossary = ContentGenerator.generateGlossary(plan);
    const faq = ContentGenerator.generateFAQ(plan, persona);

    // Destructure Actuarial Logic
    const { utilization_assumptions, inflection_risks } = persona.actuarial_logic || {};

    return (
        <div className="mt-6 space-y-8 animate-in slide-in-from-bottom-8 duration-700">

            {/* --- ACTUARIAL LOGIC MONITOR --- */}
            {(utilization_assumptions || inflection_risks) && (
                <div className="bg-slate-900 text-slate-300 rounded-[24px] p-6 relative overflow-hidden border border-slate-800 shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                                <Calculator className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-white text-lg">Actuarial Logic</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* 1. Utilization Math */}
                            {utilization_assumptions && (
                                <div className="space-y-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Utilization Assumptions</p>
                                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                                        <span className="text-xs font-medium">GP Visits p.a.</span>
                                        <span className={clsx(
                                            "text-xs font-bold px-2 py-1 rounded",
                                            utilization_assumptions.gp_visits_frequency === 'Low' ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                                        )}>
                                            {utilization_assumptions.gp_visits_frequency} Frequency
                                        </span>
                                    </div>
                                    {utilization_assumptions.break_even_point && (
                                        <div className="text-xs leading-relaxed text-slate-400">
                                            <strong className="text-emerald-400">The Math: </strong>
                                            {utilization_assumptions.break_even_point}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 2. Cliff Risks */}
                            {inflection_risks && (
                                <div className="space-y-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Cliff-Edge Risks</p>
                                    {inflection_risks.deductible_trigger_event && (
                                        <div className="p-3 bg-rose-950/30 border border-rose-900/50 rounded-xl flex gap-3 items-start">
                                            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-bold text-rose-400 mb-1">Deductible Trigger</p>
                                                <p className="text-[11px] leading-snug text-rose-200/70">
                                                    {inflection_risks.deductible_trigger_event}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {inflection_risks.income_cliff_sensitivity && (
                                        <div className="flex items-center gap-2 text-[11px] text-amber-400">
                                            <Activity className="w-3 h-3" />
                                            <span>Sensitive to income changes (Check payslip)</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* 1. THE MARKET PIVOT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* DOWNGRADE OPTION */}
                {pivots.cheaper?.persona ? (
                    <Link href={`/personas/${pivots.cheaper.persona.slug}`} className="block group">
                        <div className="p-4 rounded-2xl bg-white border border-slate-100 hover:border-emerald-200 transition-all shadow-sm group-hover:shadow-md h-full">
                            <div className="flex items-center gap-2 mb-3 text-emerald-600">
                                <TrendingDown className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Save R{plan.price - pivots.cheaper.plan.price} pm</span>
                            </div>
                            <div className="text-xs font-bold text-slate-400 uppercase mb-0.5">
                                {pivots.cheaper.plan.identity.scheme_name}
                            </div>
                            <div className="font-black text-slate-900 text-lg leading-none mb-1 flex items-center justify-between">
                                {pivots.cheaper.plan.identity.plan_name}
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                            </div>
                            <p className="text-xs text-slate-500 font-medium truncate">
                                Strategy: {pivots.cheaper.persona.meta.title}
                            </p>
                        </div>
                    </Link>
                ) : (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 opacity-60 flex flex-col justify-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Market Floor</p>
                        <p className="text-sm font-medium text-slate-500">This is the most affordable plan for your profile in our database.</p>
                    </div>
                )}

                {/* UPGRADE OPTION */}
                {pivots.richer?.persona ? (
                    <Link href={`/personas/${pivots.richer.persona.slug}`} className="block group">
                        <div className="p-4 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 transition-all shadow-sm group-hover:shadow-md h-full">
                            <div className="flex items-center gap-2 mb-3 text-blue-600">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Upgrade for +R{pivots.richer.plan.price - plan.price} pm</span>
                            </div>
                            <div className="text-xs font-bold text-slate-400 uppercase mb-0.5">
                                {pivots.richer.plan.identity.scheme_name}
                            </div>
                            <div className="font-black text-slate-900 text-lg leading-none mb-1 flex items-center justify-between">
                                {pivots.richer.plan.identity.plan_name}
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                            </div>
                            <p className="text-xs text-slate-500 font-medium truncate">
                                Strategy: {pivots.richer.persona.meta.title}
                            </p>
                        </div>
                    </Link>
                ) : (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 opacity-60 flex flex-col justify-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Market Ceiling</p>
                        <p className="text-sm font-medium text-slate-500">You are viewing the most comprehensive option available.</p>
                    </div>
                )}
            </div>

            {/* 2. THE KNOWLEDGE GRAPH */}
            <SemanticGlossary terms={glossary} />

            {/* 3. FAQ */}
            <PeopleAlsoAsk questions={faq} />

        </div>
    );
}