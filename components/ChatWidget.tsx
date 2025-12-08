'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { Plan } from '@/utils/types';

export default function ChatWidget({ contextPlan, onClose }: { contextPlan: Plan, onClose: () => void }) {
    const [messages, setMessages] = useState([
        {
            role: 'system',
            content: `Hello! I see you're looking at the **${contextPlan.identity.plan_name}**. I have the full 2026 brochure and rules engine loaded. What would you like to check?`
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setLoading(true);

        // MOCK RESPONSE - Connect to your Vector DB API here later
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'system',
                content: "That's a great question. Based on the 2026 rules, this plan covers chronic medication for 27 CDL conditions. If you use a Designated Service Provider (DSP), you avoid the 30% co-payment."
            }]);
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="fixed bottom-6 right-6 w-[90vw] max-w-[380px] h-[550px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-10 fade-in">

            {/* Header */}
            <div className="bg-slate-900 p-4 flex justify-between items-center text-white shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                        <Bot className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">Virtual Actuary</h4>
                        <p className="text-[10px] text-slate-400">Context: {contextPlan.identity.plan_name}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((m, i) => (
                    <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {m.role === 'system' && (
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                                <Bot className="w-4 h-4 text-blue-600" />
                            </div>
                        )}
                        <div className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${m.role === 'user'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'
                            }`}>
                            {m.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex gap-2 items-center text-slate-400 text-xs ml-12">
                        <span className="animate-pulse">Thinking...</span>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 shrink-0">
                <div className="relative flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about benefits..."
                        className="flex-1 bg-slate-100 border-0 rounded-xl py-3 pl-4 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-sm active:scale-95"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </form>
        </div>
    );
}