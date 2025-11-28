// components/KnowledgeCard.tsx
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function KnowledgeCard({ question, answer }: { question: string, answer: string }) {
    return (
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 my-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex gap-3 items-start">
                <div className="bg-white p-2 rounded-full shadow-sm shrink-0">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{question}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{answer}</p>

                    {/* Micro-Interaction: Helpful Signal */}
                    <div className="flex gap-4 mt-3">
                        <button className="text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1">
                            👍 Helpful
                        </button>
                        <button className="text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors">
                            👎 Not relevant
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
