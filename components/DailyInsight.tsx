import { TrendingUp, CheckCircle2 } from 'lucide-react';

interface DailyInsightProps {
    term: string;
    definition: string;
    source?: string;
}

export default function DailyInsight({ term, definition, source = "Council for Medical Schemes" }: DailyInsightProps) {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">Actuarial Insight</h3>
                </div>

                {/* Semantic HTML for SEO */}
                <dl>
                    <dt className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        {term}
                    </dt>
                    <dd className="text-sm text-slate-600 leading-relaxed font-medium">
                        "{definition}"
                    </dd>
                </dl>

                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400">Source: {source}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
            </div>
        </div>
    );
}
