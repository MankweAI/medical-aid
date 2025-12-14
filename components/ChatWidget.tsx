'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { UIMessage } from 'ai';
import { X, Send, Bot, Sparkles, ChevronRight, ShieldAlert, Baby, Coins, User, Lock } from 'lucide-react';
import { Plan } from '@/utils/types';
import clsx from 'clsx';

interface ChatWidgetProps {
    contextPlan: Plan;
    onClose: () => void;
    onVerify: () => void;
    financialContext?: {
        ratio: number;
        toxicity: string;
    } | null;
}

export default function ChatWidget({ contextPlan, onClose, onVerify, financialContext }: ChatWidgetProps) {

    const [input, setInput] = useState('');
    const { messages, status, sendMessage } = useChat<UIMessage>({
        // @ts-expect-error - streamProtocol exists in runtime but types might be outdated
        streamProtocol: 'text',
        messages: [
            {
                id: 'welcome',
                role: 'assistant',
                parts: [{ type: 'text', text: `Hello! I have the 2026 financial rules loaded for **${contextPlan.identity.plan_name}**. \n\nI can calculate costs, savings, and co-pays. For clinical advice, I'll connect you with an expert.` }]
            }
        ],
    });

    // Helper to extract text from UIMessage parts
    const getText = (m: UIMessage) => {
        if (m.parts) {
            return m.parts
                .filter(p => p.type === 'text')
                .map(p => p.text)
                .join('');
        }
        // Fallback or initial messages might be different?
        // Initial messages provided to useChat are usually UIMessage format too.
        // But our initial message above has 'content'. 
        // We should fix initial message too? 
        // Actually, let's allow 'content' access as fallback if casted from any, 
        // to be safe, but types say no.
        // We will update initial message to use parts.
        return '';
    };

    const isLoading = status === 'streaming' || status === 'submitted';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        // Send using new payload structure
        sendMessage({
            role: 'user',
            parts: [{ type: 'text', text: input }]
        }, { body: { contextPlan } });

        setInput('');
    };

    // --- NEW: RATE LIMIT CALCULATOR ---
    const MAX_QUERIES = 3;
    // Count assistant replies (excluding the initial welcome message)
    const assistantReplyCount = useMemo(() =>
        messages.filter(m => m.role === 'assistant').length - 1,
        [messages]);

    const queriesLeft = Math.max(0, MAX_QUERIES - assistantReplyCount);
    const isLimitReached = queriesLeft === 0;
    // ----------------------------------

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.role === 'assistant') {
            const text = getText(lastMessage);
            if (text.includes('[TRIGGER_LEAD_FORM]')) {
                onVerify();
            }
        }
    }, [messages, onVerify]);

    const SUGGESTIONS = [
        {
            label: "Check Co-pays",
            icon: Coins,
            prompt: "What are the co-payments for procedures on this plan?",
            color: "text-amber-600 bg-amber-50 border-amber-100"
        },
        {
            label: "Maternity Benefits",
            icon: Baby,
            prompt: "Does this plan fund maternity visits from Risk or Savings?",
            color: "text-emerald-600 bg-emerald-50 border-emerald-100"
        },
        {
            label: "Reveal Red Flags",
            icon: ShieldAlert,
            prompt: "Are there any specific exclusions, red flags, or high-risk warnings I should know about?",
            color: "text-rose-600 bg-rose-50 border-rose-100"
        }
    ];

    const handleChipClick = (prompt: string) => {
        if (isLimitReached) return;
        sendMessage({
            role: 'user',
            parts: [{ type: 'text', text: prompt }]
        }, { body: { contextPlan } });
    };

    const cleanContent = (text: string) => {
        return text.replace(/\[TRIGGER_LEAD_FORM\]/g, '').trim();
    };

    return (
        <div className="fixed inset-0 w-full h-full bg-white flex flex-col z-[60] overflow-hidden animate-in fade-in font-sans">

            {/* HEADER - Green Theme with Credits */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-4 flex justify-between items-center text-white shrink-0 shadow-md relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-full backdrop-blur-md border border-white/10">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">HealthOS Analyst</h4>
                        <div className="flex items-center gap-2">
                            {/* CREDIT COUNTER BADGE */}
                            <span className={clsx(
                                "text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20 transition-colors",
                                isLimitReached ? "bg-rose-500 text-white" : "bg-emerald-800/30 text-emerald-50"
                            )}>
                                {isLimitReached ? "Limit Reached" : `${queriesLeft} Credits Left`}
                            </span>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors active:scale-95">
                    <X className="w-5 h-5 opacity-90" />
                </button>
            </div>

            {/* CHAT AREA */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((m) => {
                    const isUser = m.role === 'user';
                    if (m.id === 'welcome') return null;

                    return (
                        <div key={m.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                            {!isUser && (
                                <div className="w-8 h-8 rounded-full bg-white border border-emerald-100 flex items-center justify-center shrink-0 shadow-sm mt-1">
                                    <Bot className="w-4 h-4 text-emerald-600" />
                                </div>
                            )}

                            <div className={clsx(
                                "max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap",
                                isUser
                                    ? "bg-emerald-600 text-white rounded-br-none"
                                    : "bg-white border border-slate-100 text-slate-700 rounded-bl-none"
                            )}>
                                {cleanContent(getText(m))}
                            </div>

                            {isUser && (
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 shadow-sm mt-1">
                                    <User className="w-4 h-4 text-slate-500" />
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* LOADING */}
                {isLoading && (
                    <div className="flex gap-2 items-center text-emerald-600 text-xs ml-12 animate-in fade-in">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200" />
                        Analysing...
                    </div>
                )}

                {/* SUGGESTIONS (Hidden if limit reached) */}
                {!isLoading && messages.length < 3 && !isLimitReached && (
                    <div className="mt-4 space-y-2 pl-11 pr-4 animate-in slide-in-from-bottom-4 fade-in duration-500">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Quick Analysis
                        </p>
                        {SUGGESTIONS.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => handleChipClick(s.prompt)}
                                className={clsx(
                                    "w-full text-left p-3 rounded-xl border transition-all group flex items-center justify-between active:scale-[0.98] hover:shadow-md bg-white",
                                    s.color
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <s.icon className="w-4 h-4 opacity-70" />
                                    <span className="text-xs font-bold opacity-90">{s.label}</span>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* INPUT AREA (Locked if limit reached) */}
            <form
                onSubmit={handleSubmit}
                className="p-3 bg-white border-t border-slate-100 shrink-0 pb-5"
            >
                {isLimitReached ? (
                    <div className="flex items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl animate-in slide-in-from-bottom-2">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                            <Lock className="w-4 h-4 text-rose-500" />
                            <span>Free queries exhausted.</span>
                        </div>
                        <button
                            type="button"
                            onClick={onVerify}
                            className="text-xs font-bold text-white bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                        >
                            Unlock Unlimited
                        </button>
                    </div>
                ) : (
                    <div className="relative flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder={financialContext?.toxicity === 'CRITICAL' ? "Ask about affordability..." : "Type your question..."}
                            disabled={isLoading}
                            className="flex-1 bg-slate-50 focus:bg-white border border-slate-200 focus:border-emerald-500 rounded-xl py-3.5 pl-4 pr-4 text-sm transition-all outline-none text-slate-900 placeholder:text-slate-400 disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="p-3.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
                        >
                            {input.trim() ? <Send className="w-5 h-5" /> : <Sparkles className="w-5 h-5 text-emerald-100" />}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}