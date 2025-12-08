'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { Plan } from '@/utils/types';
import clsx from 'clsx';

// --- HARDCODED SCENARIOS ---
const QUICK_QUESTIONS = [
    "Does this cover pregnancy? 🤰",
    "What are the waiting periods? ⏳",
    "Is there a co-payment for surgery? 🏥",
    "Can I use any GP? 👨‍⚕️",
    "Does it pay for chronic meds? 💊",
    "Is dentistry covered? 🦷"
];

interface ChatWidgetProps {
    contextPlan: Plan;
    onClose: () => void;
    financialContext?: {
        ratio: number;
        toxicity: string;
    } | null;
}

export default function ChatWidget({ contextPlan, onClose, financialContext }: ChatWidgetProps) {

    // 1. SMART WELCOME MESSAGE
    const getWelcomeMessage = () => {
        if (financialContext?.toxicity === 'CRITICAL') {
            return `⚠️ **Caution:** This plan consumes ${Math.round(financialContext.ratio * 100)}% of your declared income. I strongly suggest looking at the **${contextPlan.identity.plan_series}** lower tiers. \n\nOtherwise, what would you like to know?`;
        }
        return `Hello! I have the 2026 rules loaded for **${contextPlan.identity.plan_name}**. \n\nSelect a topic below or ask me a specific question.`;
    };

    const [messages, setMessages] = useState([
        { role: 'system', content: getWelcomeMessage() }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, loading]);

    // 2. SEND HANDLER
    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        // Optimistic Update
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setLoading(true);
        setInput('');

        // SIMULATED RAG RESPONSE (Replace with real API)
        setTimeout(() => {
            let response = "I'm checking the brochure...";

            if (text.includes("pregnancy")) response = `Yes, **${contextPlan.identity.plan_name}** includes a Maternity Basket funded from Risk. You get ${contextPlan.defined_baskets.maternity.antenatal_consults} antenatal visits and 2 ultrasounds.`;
            else if (text.includes("waiting")) response = "Standard waiting periods apply: 3 months general, 12 months for pre-existing conditions.";
            else if (text.includes("GP")) response = contextPlan.network_restriction === 'Network' ? "No, you must use a Network GP to avoid co-payments." : "Yes, you can use any GP.";
            else response = "That's a specific detail. Based on the 2026 rules, this benefit is subject to the overall annual limit. Would you like to see the detailed table?";

            setMessages(prev => [...prev, { role: 'system', content: response }]);
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="fixed bottom-6 right-6 w-[90vw] max-w-[380px] h-[600px] bg-white rounded-[32px] shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-10 fade-in font-sans">

            {/* HEADER */}
            <div className="bg-slate-900 p-5 flex justify-between items-center text-white shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/10">
                        <Bot className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">Virtual Actuary</h4>
                        <p className="text-[10px] text-slate-400 font-medium">
                            Context: {contextPlan.identity.plan_name}
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95">
                    <X className="w-5 h-5 opacity-80" />
                </button>
            </div>

            {/* CHAT AREA */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((m, i) => (
                    <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {m.role === 'system' && (
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm mt-1">
                                <Bot className="w-4 h-4 text-emerald-600" />
                            </div>
                        )}
                        <div className={clsx(
                            "max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap",
                            m.role === 'user'
                                ? "bg-slate-900 text-white rounded-br-none"
                                : "bg-white border border-slate-200 text-slate-700 rounded-bl-none"
                        )}>
                            {m.content}
                        </div>
                    </div>
                ))}

                {/* QUICK QUESTIONS (Vertical Menu) */}
                {messages.length === 1 && !loading && (
                    <div className="mt-6 space-y-2 animate-in slide-in-from-bottom-4 fade-in duration-500 pl-11">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Suggested Topics
                        </p>
                        {QUICK_QUESTIONS.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(q)}
                                className="w-full text-left p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md hover:bg-blue-50/30 transition-all group flex items-center justify-between active:scale-[0.98]"
                            >
                                <span className="text-xs font-bold text-slate-600 group-hover:text-blue-700">{q}</span>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-400" />
                            </button>
                        ))}
                    </div>
                )}

                {loading && (
                    <div className="flex gap-2 items-center text-slate-400 text-xs ml-12 animate-pulse">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                    </div>
                )}
            </div>

            {/* INPUT AREA */}
            <form
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="p-3 bg-white border-t border-slate-100 shrink-0 pb-5"
            >
                <div className="relative flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your question..."
                        className="flex-1 bg-slate-100 border-transparent focus:bg-white border-2 focus:border-emerald-500 rounded-xl py-3.5 pl-4 pr-4 text-sm transition-all outline-none text-slate-900 placeholder:text-slate-400"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="p-3.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-900/20 active:scale-95"
                    >
                        {input.trim() ? <Send className="w-5 h-5" /> : <Sparkles className="w-5 h-5 text-amber-400" />}
                    </button>
                </div>
            </form>
        </div>
    );
}