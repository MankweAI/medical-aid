'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import clsx from 'clsx';

const PLACEHOLDERS = [
    "I am pregnant and earn R15,000...",
    "I need cover for a chronic condition...",
    "I want the cheapest hospital plan...",
    "I need a plan for my elderly parents..."
];

const PROBLEM_CHIPS = [
    { label: "🤰 Planning a Baby", route: "/personas/family-planner", params: "need=maternity" },
    { label: "💊 Chronic Care", route: "/personas/chronic-warrior", params: "need=chronic" },
    { label: "💸 Tight Budget", route: "/personas/budget-conscious", params: "sort=price" },
    { label: "📲 Digital Only", route: "/personas/digital-native", params: "type=tech" },
];

export default function MagicSearch() {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [fade, setFade] = useState(false);

    // Typing Animation
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
                setFade(false);
            }, 500);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const lower = input.toLowerCase();

        // --- GHOST ROUTING LOGIC ---
        // This logic mimics a "Classifier" to teleport users to the right Spoke.
        if (lower.includes('baby') || lower.includes('pregnant')) {
            router.push('/personas/family-planner?need=maternity&mode=result');
        } else if (lower.includes('chronic') || lower.includes('diabetes') || lower.includes('sick')) {
            router.push('/personas/chronic-warrior?need=chronic&mode=result');
        } else if (lower.includes('cheap') || lower.includes('budget') || lower.includes('afford')) {
            router.push('/personas/budget-conscious?sort=price&mode=result');
        } else {
            // Fallback: Send raw query to a generic search page (or default persona)
            router.push(`/personas/budget-conscious?q=${encodeURIComponent(input)}`);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="relative group z-20">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <form onSubmit={handleSearch} className="relative bg-white rounded-2xl shadow-xl flex items-center p-2 border border-slate-100 transform transition-transform group-hover:scale-[1.01]">
                    <div className="pl-4 pr-3 text-slate-400">
                        <Search className="w-6 h-6" />
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow py-4 px-2 text-lg md:text-xl font-medium text-slate-900 placeholder-transparent outline-none bg-transparent"
                        placeholder="Search"
                    />

                    {/* The "Living" Placeholder */}
                    {!input && (
                        <div className={clsx(
                            "absolute left-14 text-lg md:text-xl text-slate-400 pointer-events-none transition-opacity duration-500 flex items-center gap-2",
                            fade ? "opacity-0" : "opacity-100"
                        )}>
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            {PLACEHOLDERS[placeholderIndex]}
                        </div>
                    )}

                    <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 font-bold text-sm shadow-lg shadow-slate-900/20">
                        <span>Diagnose</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>
            </div>

            {/* Smart Chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 animate-in slide-in-from-bottom-4 duration-700 delay-100">
                {PROBLEM_CHIPS.map((chip) => (
                    <button
                        key={chip.label}
                        onClick={() => router.push(`${chip.route}?${chip.params}`)}
                        className="px-5 py-2.5 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-full text-sm font-semibold text-slate-600 hover:text-blue-700 transition-all shadow-sm hover:shadow-md"
                    >
                        {chip.label}
                    </button>
                ))}
            </div>
        </div>
    );
}