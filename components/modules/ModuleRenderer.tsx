/**
 * ModuleRenderer - Server-Driven UI Component
 * 
 * Dynamically renders benefit modules based on the data extracted from plan JSONs.
 * Each module.type maps to a specific card component.
 */

import { Module } from '@/lib/data-loader';
import {
    Shield,
    Heart,
    Microscope,
    Building2,
    Plane,
    Stethoscope,
    Pill,
    Calendar
} from 'lucide-react';

interface ModuleRendererProps {
    modules: Module[];
}

// Icon mapping for module types
const MODULE_ICONS: Record<string, React.ElementType> = {
    chronic_illness_benefit: Pill,
    oncology_benefit: Microscope,
    screening_benefit: Stethoscope,
    day_surgery_network_benefit: Building2,
    international_travel_benefit: Plane,
    hospital_cover: Shield,
    day_to_day_benefit: Calendar,
};

// Color mapping for module types
const MODULE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    chronic_illness_benefit: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
    oncology_benefit: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
    screening_benefit: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
    day_surgery_network_benefit: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    international_travel_benefit: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-100' },
    hospital_cover: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
    day_to_day_benefit: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100' },
};

function GenericCard({ module }: { module: Module }) {
    const Icon = MODULE_ICONS[module.type] || Heart;
    const colors = MODULE_COLORS[module.type] || { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' };

    // Extract data keys for display
    const dataEntries = Object.entries(module.data).filter(
        ([_, value]) => typeof value === 'string' || typeof value === 'number'
    );

    return (
        <div className={`rounded-2xl p-6 border ${colors.border} ${colors.bg}`}>
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{module.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{module.description}</p>

                    {dataEntries.length > 0 && (
                        <ul className="space-y-2">
                            {dataEntries.slice(0, 4).map(([key, value]) => (
                                <li key={key} className="flex items-start gap-2 text-sm">
                                    <span className={`mt-1 w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')}`} />
                                    <span className="text-slate-600">
                                        <span className="font-medium text-slate-700 capitalize">
                                            {key.replace(/_/g, ' ')}:
                                        </span>{' '}
                                        {String(value)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

function ChronicCard({ module }: { module: Module }) {
    const data = module.data as Record<string, string>;

    return (
        <div className="rounded-2xl p-6 border border-purple-100 bg-gradient-to-br from-purple-50 to-white">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                    <Pill className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{module.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{module.description}</p>

                    <div className="grid gap-3">
                        {data.prescribed_minimum_benefit_conditions && (
                            <div className="p-3 bg-white rounded-xl border border-purple-100">
                                <p className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">PMB Conditions</p>
                                <p className="text-sm text-slate-600">{data.prescribed_minimum_benefit_conditions}</p>
                            </div>
                        )}
                        {data.medicine_cover_for_chronic_disease_list && (
                            <div className="p-3 bg-white rounded-xl border border-purple-100">
                                <p className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">Medicine Cover</p>
                                <p className="text-sm text-slate-600">{data.medicine_cover_for_chronic_disease_list}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function OncologyCard({ module }: { module: Module }) {
    const data = module.data as Record<string, string>;

    return (
        <div className="rounded-2xl p-6 border border-rose-100 bg-gradient-to-br from-rose-50 to-white">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-rose-100 text-rose-600">
                    <Microscope className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{module.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{module.description}</p>

                    <div className="grid md:grid-cols-2 gap-3">
                        {Object.entries(data).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="p-3 bg-white rounded-xl border border-rose-100">
                                <p className="text-xs font-bold text-rose-600 uppercase tracking-wide mb-1">
                                    {key.replace(/_/g, ' ')}
                                </p>
                                <p className="text-sm text-slate-600">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ScreeningCard({ module }: { module: Module }) {
    const data = module.data as Record<string, unknown>;
    const additionalTests = (data.additional_tests as string[]) || [];
    const vaccines = (data.vaccines as string[]) || [];

    return (
        <div className="rounded-2xl p-6 border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
                    <Stethoscope className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{module.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{module.description}</p>

                    {additionalTests.length > 0 && (
                        <div className="mb-4">
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-2">Screening Tests</p>
                            <div className="flex flex-wrap gap-2">
                                {additionalTests.map((test, i) => (
                                    <span key={i} className="px-3 py-1 bg-white border border-emerald-100 rounded-full text-xs text-slate-600">
                                        {test}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {vaccines.length > 0 && (
                        <div>
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-2">Vaccines Covered</p>
                            <div className="flex flex-wrap gap-2">
                                {vaccines.map((vaccine, i) => (
                                    <span key={i} className="px-3 py-1 bg-white border border-emerald-100 rounded-full text-xs text-slate-600">
                                        {vaccine}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function ModuleRenderer({ modules }: ModuleRendererProps) {
    if (!modules || modules.length === 0) return null;

    return (
        <div className="space-y-4">
            {modules.map((module, index) => {
                switch (module.type) {
                    case 'chronic_illness_benefit':
                        return <ChronicCard key={index} module={module} />;
                    case 'oncology_benefit':
                        return <OncologyCard key={index} module={module} />;
                    case 'screening_benefit':
                        return <ScreeningCard key={index} module={module} />;
                    default:
                        return <GenericCard key={index} module={module} />;
                }
            })}
        </div>
    );
}
