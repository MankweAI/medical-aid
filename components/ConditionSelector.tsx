'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CONDITIONS, ConditionSlug } from '@/utils/condition-mapping';
import { ArrowRight, Stethoscope, Activity, Heart, Brain, Eye, UserCheck, Baby, Sparkles, Smile, Search } from 'lucide-react';

// Icon mapping for conditions
const ICONS: Record<ConditionSlug, React.ReactNode> = {
    'digestive-disorders': <Activity className="w-5 h-5" />,
    'joint-care': <Activity className="w-5 h-5" />,
    'knee-injuries': <Activity className="w-5 h-5" />,
    'hip-conditions': <Activity className="w-5 h-5" />,
    'spinal-conditions': <Activity className="w-5 h-5" />,
    'eye-health': <Eye className="w-5 h-5" />,
    'maternity-care': <Baby className="w-5 h-5" />,
    'dental-conditions': <Smile className="w-5 h-5" />,
    'nasal-sinus-conditions': <Stethoscope className="w-5 h-5" />,
    'cancer-care': <Heart className="w-5 h-5" />,
    'imaging-diagnostics': <Sparkles className="w-5 h-5" />,
    'general-surgery': <UserCheck className="w-5 h-5" />,
};

interface ConditionSelectorProps {
    planA?: string;
    planB?: string;
    // New prop: baseRoute allows overriding the default comparison URL format
    // Example: '/medical-aid-optimization' will result in '/medical-aid-optimization/[slug]'
    baseRoute?: string;
}

export default function ConditionSelector({ planA, planB, baseRoute }: ConditionSelectorProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredConditions = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        const allConditions = Object.entries(CONDITIONS) as [ConditionSlug, typeof CONDITIONS[ConditionSlug]][];

        if (!query) return allConditions;

        return allConditions.filter(([, def]) => {
            const labelMatch = def.label.toLowerCase().includes(query);
            const descMatch = def.description.toLowerCase().includes(query);
            const keywordMatch = def.keywords.some(k => k.toLowerCase().includes(query));
            return labelMatch || descMatch || keywordMatch;
        });
    }, [searchQuery]);

    // Helper to generate correct URL based on props
    const getHref = (slug: string) => {
        if (baseRoute) {
            return `${baseRoute}/${slug}`;
        }
        if (planA && planB) {
            return `/compare/${planA}-vs-${planB}-for-${slug}`;
        }
        return '#'; // Fallback
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Analyze for a Specific Condition
                </h3>
                <p className="text-slate-600 mb-4 text-sm">
                    Select a condition to see the actuarial analysis.
                </p>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search conditions or procedures (e.g. 'Gastroscopy', 'Pregnancy')"
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {filteredConditions.length === 0 ? (
                <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-100 border-dashed">
                    <p className="text-slate-500">No conditions found matching "{searchQuery}"</p>
                    <button
                        onClick={() => setSearchQuery('')}
                        className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                        Clear Search
                    </button>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredConditions.map(([slug, def]) => (
                        <Link
                            key={slug}
                            href={getHref(slug)}
                            className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
                        >
                            <div className="p-2 bg-slate-100 text-slate-500 rounded-full group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                                {ICONS[slug] || <Activity className="w-5 h-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="block text-sm font-medium text-slate-900 truncate">
                                    {def.label}
                                </span>
                                {/* Optional: Show matched keyword if searching */}
                                {searchQuery && !def.label.toLowerCase().includes(searchQuery.toLowerCase()) && (
                                    <span className="block text-xs text-emerald-600 truncate">
                                        Matches "{searchQuery}"
                                    </span>
                                )}
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500" />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
