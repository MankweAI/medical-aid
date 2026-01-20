"use client";

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
    question: string;
    answer: string;
}

interface SchemeFAQProps {
    faqs: FAQ[];
}

export function SchemeFAQ({ faqs }: SchemeFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!faqs || faqs.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-5 h-5 text-purple-500" />
                <h2 className="text-lg font-black text-slate-900">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
                {faqs.map((faq, i) => {
                    const isOpen = openIndex === i;
                    return (
                        <div
                            key={i}
                            className={`border rounded-xl transition-all duration-200 overflow-hidden ${isOpen ? 'border-purple-200 bg-purple-50/30' : 'border-slate-100 bg-slate-50 hover:border-purple-100'
                                }`}
                        >
                            <button
                                onClick={() => toggleIndex(i)}
                                className="w-full flex items-center justify-between p-4 text-left group"
                            >
                                <span className={`font-bold text-sm ${isOpen ? 'text-purple-900' : 'text-slate-700 group-hover:text-purple-700'}`}>
                                    {faq.question}
                                </span>
                                {isOpen
                                    ? <ChevronUp className="w-4 h-4 text-purple-500 shrink-0" />
                                    : <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-purple-500 shrink-0" />
                                }
                            </button>

                            <div
                                className={`grid transition-[grid-template-rows] duration-200 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <div className="p-4 pt-0 text-sm text-slate-600 leading-relaxed border-t border-purple-100/50 mt-1">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
