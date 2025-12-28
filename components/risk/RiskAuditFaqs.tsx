'use client';

import React, { useState } from 'react';
import { ChevronRight, Plus, ShieldQuestion, HelpCircle, Info } from 'lucide-react';
import clsx from 'clsx';
import ExpertModal from '@/components/ExpertModal';

interface RiskAuditFaqsProps {
    faqs: { question: string; answer: string }[];
    planName: string;
    profileContext: string;
}

export default function RiskAuditFaqs({ faqs, planName, profileContext }: RiskAuditFaqsProps) {
    const [expanded, setExpanded] = useState<number | null>(null);
    const [isExpertOpen, setIsExpertOpen] = useState(false);

    const icons = [ShieldQuestion, HelpCircle, Info];

    return (
        <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Common Questions</p>

            {faqs.map((faq, idx) => {
                const Icon = icons[idx % icons.length];
                const isOpen = expanded === idx;

                return (
                    <div key={idx} className="bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all duration-300">
                        <button
                            onClick={() => setExpanded(isOpen ? null : idx)}
                            className={clsx(
                                "w-full flex items-center justify-between p-5 transition-all text-left",
                                isOpen ? "bg-slate-50" : "hover:bg-slate-50"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className={clsx("p-2 rounded-xl transition-colors", isOpen ? "bg-emerald-100" : "bg-slate-50")}>
                                    <Icon className={clsx("w-5 h-5 transition-colors", isOpen ? "text-emerald-600" : "text-slate-400")} />
                                </div>
                                <span className={clsx("text-sm font-black tracking-tight transition-colors", isOpen ? "text-emerald-900" : "text-slate-700")}>
                                    {faq.question}
                                </span>
                            </div>
                            <ChevronRight className={clsx("w-5 h-5 transition-transform duration-300", isOpen ? "rotate-90 text-emerald-500" : "text-slate-300")} />
                        </button>

                        <div className={clsx("grid transition-all duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                            <div className="overflow-hidden">
                                <div className="p-5 pt-0">
                                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                                        <p className="text-sm font-medium text-emerald-900 leading-relaxed italic">
                                            "{faq.answer}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* THE HUMAN BRIDGE PILL */}
            <button
                onClick={() => setIsExpertOpen(true)}
                className="w-full flex items-center justify-between p-5 rounded-3xl bg-white border-2 border-dashed border-slate-200 text-slate-500 hover:border-emerald-400 hover:text-emerald-600 transition-all group"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-emerald-50 transition-colors">
                        <Plus className="w-5 h-5 text-slate-400 group-hover:text-emerald-500" />
                    </div>
                    <span className="text-sm font-bold italic tracking-tight opacity-70">I have a different question...</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-400" />
            </button>

            {isExpertOpen && (
                <ExpertModal
                    isOpen={isExpertOpen}
                    onClose={() => setIsExpertOpen(false)}
                    planName={planName}
                    initialQuestion="I have a specific question about my surgery costs."
                    expertContext={profileContext}
                />
            )}
        </div>
    );
}

