'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProcedureRepository } from '@/lib/risk/discovery-resolver';

export function ProcedureAutocomplete() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Filter procedures
    const matches = ProcedureRepository.getAll().filter(p =>
        p.label.toLowerCase().includes(query.toLowerCase()) ||
        p.medical_term.toLowerCase().includes(query.toLowerCase())
    );

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
                inputRef.current && !inputRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex(prev => Math.min(prev + 1, matches.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex(prev => Math.max(prev - 1, 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (matches[activeIndex]) {
                    router.push(`/risk/${matches[activeIndex].id}/active-smart`);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    };

    const showDropdown = query.length > 0 && isOpen;

    return (
        <div className="relative w-full">
            {/* GLASSMORPHIC SEARCH BAR */}
            <div className="relative group">
                {/* Gradient border effect on focus */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />

                <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-slate-200/80 group-focus-within:border-transparent overflow-hidden">
                    {/* Search Icon */}
                    <div className="pl-5 pr-3">
                        <svg
                            className={`w-5 h-5 transition-colors duration-200 ${query.length > 0 ? 'text-emerald-500' : 'text-slate-400'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Input */}
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for a procedure..."
                        className="flex-1 py-4 pr-5 text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIsOpen(true);
                            setActiveIndex(0);
                        }}
                        onFocus={() => setIsOpen(true)}
                        onKeyDown={handleKeyDown}
                    />

                    {/* Clear button */}
                    {query.length > 0 && (
                        <button
                            onClick={() => {
                                setQuery('');
                                inputRef.current?.focus();
                            }}
                            className="mr-4 p-1 rounded-full hover:bg-slate-100 transition-colors"
                        >
                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* PREMIUM DROPDOWN */}
            {showDropdown && (
                <div
                    ref={dropdownRef}
                    className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden z-50"
                >
                    {matches.length === 0 ? (
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-slate-600 font-medium">No procedures found</p>
                            <p className="text-sm text-slate-400 mt-1">Try "Surgery", "Scope", or "Replacement"</p>
                        </div>
                    ) : (
                        <div className="max-h-80 overflow-y-auto">
                            {matches.map((proc, index) => (
                                <button
                                    key={proc.id}
                                    onClick={() => router.push(`/risk/${proc.id}/active-smart`)}
                                    className={`w-full text-left p-4 flex items-center justify-between gap-4 transition-all duration-150 border-b border-slate-50 last:border-0 ${index === activeIndex
                                        ? 'bg-gradient-to-r from-emerald-50 to-teal-50'
                                        : 'hover:bg-slate-50'
                                        }`}
                                    onMouseEnter={() => setActiveIndex(index)}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Category Icon */}
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${proc.category === 'major_joint' ? 'bg-blue-100 text-blue-600' :
                                            proc.category === 'scope' ? 'bg-purple-100 text-purple-600' :
                                                proc.category === 'maternity' ? 'bg-pink-100 text-pink-600' :
                                                    proc.category === 'ophthalmology' ? 'bg-cyan-100 text-cyan-600' :
                                                        'bg-slate-100 text-slate-600'
                                            }`}>
                                            <span className="text-lg">
                                                {proc.category === 'major_joint' ? '🦴' :
                                                    proc.category === 'scope' ? '🔬' :
                                                        proc.category === 'maternity' ? '👶' :
                                                            proc.category === 'ophthalmology' ? '👁️' :
                                                                '🏥'}
                                            </span>
                                        </div>

                                        <div>
                                            <div className="font-semibold text-slate-900">{proc.label}</div>
                                            <div className="text-xs text-slate-400 font-medium">{proc.medical_term}</div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className={`flex items-center gap-1 text-sm font-bold transition-colors ${index === activeIndex ? 'text-emerald-600' : 'text-slate-400'
                                        }`}>
                                        <span className="hidden sm:inline">Check Cost</span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}