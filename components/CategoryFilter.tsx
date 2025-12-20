'use client';

import Link from 'next/link';
import { getV2Slug } from '@/utils/slug-utils';
import { X, ChevronRight, Filter, Users } from 'lucide-react';
import clsx from 'clsx';
import { Persona } from '@/utils/persona';

interface CategoryFilterProps {
    category: string;
    personas: Persona[];
}

/**
 * CategoryFilter Component
 * 
 * Displays when user arrives from breadcrumb navigation (/?category=X)
 * Shows filtered list of personas matching the selected category
 */
export default function CategoryFilter({ category, personas }: CategoryFilterProps) {
    const decodedCategory = decodeURIComponent(category);

    // Personas are already filtered by category from the server
    const matchingPersonas = personas;

    if (matchingPersonas.length === 0) {
        return null;
    }

    return (
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            {/* Filter Header */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-emerald-100 shadow-lg shadow-emerald-100/20 overflow-hidden">

                {/* Header Bar */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50/80 to-teal-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-xl">
                            <Filter className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-slate-900">
                                Browsing: <span className="text-emerald-700">{decodedCategory}</span> Strategies
                            </h2>
                            <p className="text-xs text-slate-500">
                                {matchingPersonas.length} personalized plan{matchingPersonas.length !== 1 ? 's' : ''} available
                            </p>
                        </div>
                    </div>

                    {/* Clear Filter */}
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-all"
                    >
                        <X className="w-3.5 h-3.5" />
                        Clear Filter
                    </Link>
                </div>

                {/* Persona Grid */}
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {matchingPersonas.map((persona) => {
                            const v2Slug = getV2Slug(persona.slug);
                            const displayTitle = persona.display_title || persona.meta.title;

                            return (
                                <Link
                                    key={persona.slug}
                                    href={`/personas/${v2Slug}`}
                                    className={clsx(
                                        "group flex items-center gap-3 p-3 rounded-xl border transition-all",
                                        "bg-white hover:bg-emerald-50 border-slate-100 hover:border-emerald-200",
                                        "hover:shadow-md hover:shadow-emerald-100/40"
                                    )}
                                >
                                    {/* Icon */}
                                    <div className={clsx(
                                        "p-2 rounded-lg transition-colors",
                                        "bg-slate-50 group-hover:bg-emerald-100",
                                        "border border-slate-100 group-hover:border-emerald-200"
                                    )}>
                                        <Users className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 truncate transition-colors">
                                            {displayTitle}
                                        </h3>
                                        {persona.human_insight && (
                                            <p className="text-xs text-slate-500 truncate mt-0.5">
                                                {persona.human_insight}
                                            </p>
                                        )}
                                    </div>

                                    {/* Arrow */}
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Note */}
                <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 text-center">
                        Select a strategy above, or use the search console below to find your perfect plan
                    </p>
                </div>
            </div>
        </div>
    );
}
