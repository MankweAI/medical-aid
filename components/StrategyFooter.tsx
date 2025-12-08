'use client';

import { Plan } from '@/utils/types';
import { Persona } from '@/utils/persona';
import { ContentGenerator } from '@/utils/seo-content';
import SemanticGlossary from '@/components/SemanticGlossary';
import PeopleAlsoAsk from '@/components/PeopleAlsoAsk';
import { ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

interface Props {
    plan: Plan;
    persona: Persona;
}

export default function StrategyFooter({ plan, persona }: Props) {
    const glossary = ContentGenerator.generateGlossary(plan);
    const faq = ContentGenerator.generateFAQ(plan, persona);
    const pivots = ContentGenerator.getSmartPivot(plan, persona);

    return (
        <div className="mt-6 space-y-8 animate-in slide-in-from-bottom-8 duration-700">

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