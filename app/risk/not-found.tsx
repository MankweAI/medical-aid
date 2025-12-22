import Link from 'next/link';
import { PROCEDURES_2026 } from '@/data/procedures-2026';

export default function NotFound() {
    // Get 3 popular procedures for suggestions
    const suggestions = PROCEDURES_2026.slice(0, 3);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
            <div className="max-w-lg w-full text-center">

                {/* ICON */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full blur-2xl opacity-30" />
                        <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-full border border-slate-200">
                            <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* TEXT */}
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Procedure Not Found</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    We don't have actuarial data for that specific URL. Try one of our supported procedures below.
                </p>

                {/* SUGGESTION CARDS */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-8">
                    <div className="p-4 bg-slate-50 border-b border-slate-100">
                        <span className="text-sm font-semibold text-slate-600">Try these instead:</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {suggestions.map((proc) => (
                            <Link
                                key={proc.id}
                                href={`/risk/${proc.id}/active-smart`}
                                className="flex items-center justify-between p-4 hover:bg-emerald-50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">
                                        {proc.category === 'major_joint' ? '🦴' :
                                            proc.category === 'maternity' ? '👶' :
                                                proc.category === 'scope' ? '🔬' :
                                                    '🏥'}
                                    </span>
                                    <div className="text-left">
                                        <div className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                            {proc.label}
                                        </div>
                                        <div className="text-xs text-slate-400">{proc.medical_term}</div>
                                    </div>
                                </div>
                                <svg className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* MAIN CTA */}
                <Link
                    href="/risk"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-xl"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search All Procedures
                </Link>
            </div>
        </div>
    );
}