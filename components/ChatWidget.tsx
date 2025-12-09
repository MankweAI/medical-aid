'use client';

import { useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import { X, Send, Bot, Sparkles, ChevronRight, ShieldAlert, Baby, Coins, User } from 'lucide-react';
import { Plan } from '@/utils/types';
import clsx from 'clsx';

interface ChatWidgetProps {
    contextPlan: Plan;
    onClose: () => void;
    /** * Callback to open the ExpertModal. 
     * You need to wire this up in the parent component (SinglePlanHero).
     */
    onVerify: () => void;
    financialContext?: {
        ratio: number;
        toxicity: string;
    } | null;
}

export default function ChatWidget({ contextPlan, onClose, onVerify, financialContext }: ChatWidgetProps) {

    // 1. Vercel AI SDK Hook
    const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, append } = useChat({
        api: '/api/chat',
        body: { contextPlan }, // Pass the active plan to the backend
        initialMessages: [
            {
                id: 'welcome',
                role: 'system',
                content: `Hello! I have the 2026 financial rules loaded for **${contextPlan.identity.plan_name}**. \n\nI can calculate costs, savings, and co-pays. For clinical advice, I'll connect you with an expert.`
            }
        ],
    });

    const scrollRef = useRef<HTMLDivElement>(null);

    // 2. Auto-Scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // 3. LEAD TRIGGER DETECTION (The "Funnel")
    // We watch the last message. If it contains the token, we trigger the modal.
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.role === 'assistant' && lastMessage.content.includes('[TRIGGER_LEAD_FORM]')) {
            onVerify();
        }
    }, [messages, onVerify]);

    // 4. PRE-DEFINED "DATA CHIPS" (Guided Inquisitiveness)
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
            color: "text-blue-600 bg-blue-50 border-blue-100"
        },
        {
            label: "Reveal Red Flags",
            icon: ShieldAlert,
            prompt: "Are there any specific exclusions, red flags, or high-risk warnings I should know about?",
            color: "text-rose-600 bg-rose-50 border-rose-100"
        }
    ];

    const handleChipClick = (prompt: string) => {
        append({ role: 'user', content: prompt });
    };

    // Helper to clean the message text (remove the trigger token from display)
    const cleanContent = (text: string) => {
        return text.replace(/\[TRIGGER_LEAD_FORM\]/g, '').trim();
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
                        <h4 className="font-bold text-sm">HealthOS Analyst</h4>
                        <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {contextPlan.identity.plan_name} Active
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95">
                    <X className="w-5 h-5 opacity-80" />
                </button>
            </div>

            {/* CHAT AREA */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((m) => {
                    const isUser = m.role === 'user';
                    // Don't render system messages other than the welcome one if needed, 
                    // but here we only have the initial welcome as 'system'.
                    if (m.role === 'system' && m.id !== 'welcome') return null;

                    return (
                        <div key={m.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                            {!isUser && (
                                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm mt-1">
                                    <Bot className="w-4 h-4 text-emerald-600" />
                                </div>
                            )}

                            <div className={clsx(
                                "max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap",
                                isUser
                                    ? "bg-slate-900 text-white rounded-br-none"
                                    : "bg-white border border-slate-200 text-slate-700 rounded-bl-none"
                            )}>
                                {cleanContent(m.content)}
                            </div>

                            {isUser && (
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 shadow-sm mt-1">
                                    <User className="w-4 h-4 text-slate-500" />
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* LOADING INDICATOR */}
                {isLoading && (
                    <div className="flex gap-2 items-center text-slate-400 text-xs ml-12 animate-in fade-in">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200" />
                        Calculating...
                    </div>
                )}

                {/* SUGGESTION CHIPS (Show only when idle) */}
                {!isLoading && messages.length < 3 && (
                    <div className="mt-4 space-y-2 pl-11 pr-4 animate-in slide-in-from-bottom-4 fade-in duration-500">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                            Suggested Queries
                        </p>
                        {SUGGESTIONS.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => handleChipClick(s.prompt)}
                                className={clsx(
                                    "w-full text-left p-3 rounded-xl border transition-all group flex items-center justify-between active:scale-[0.98] hover:shadow-md",
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

            {/* INPUT AREA */}
            <form
                onSubmit={handleSubmit}
                className="p-3 bg-white border-t border-slate-100 shrink-0 pb-5"
            >
                <div className="relative flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder={financialContext?.toxicity === 'CRITICAL' ? "Ask about affordability..." : "Type your question..."}
                        className="flex-1 bg-slate-100 border-transparent focus:bg-white border-2 focus:border-emerald-500 rounded-xl py-3.5 pl-4 pr-4 text-sm transition-all outline-none text-slate-900 placeholder:text-slate-400"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="p-3.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-900/20 active:scale-95"
                    >
                        {input.trim() ? <Send className="w-5 h-5" /> : <Sparkles className="w-5 h-5 text-amber-400" />}
                    </button>
                </div>
            </form>
        </div>
    );
}