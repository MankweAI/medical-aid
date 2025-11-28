'use client';

import BottomSheet from '@/components/ui/BottomSheet';
import { BookOpen } from 'lucide-react';

interface JargonProps {
    term: string;
    definition: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function JargonBuster({ term, definition, isOpen, onClose }: JargonProps) {
    return (
        <BottomSheet isOpen={isOpen} onClose={onClose} title={term}>
            <div className="space-y-6">
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                    <BookOpen className="w-5 h-5 text-amber-600 shrink-0" />
                    <p className="text-sm text-amber-900 font-medium">
                        Medical Aid terms can be confusing. Here is a simple explanation.
                    </p>
                </div>

                {/* Semantic HTML for SEO/AI Overviews */}
                <dl className="space-y-4">
                    <dt className="text-lg font-bold text-slate-900">What does this mean?</dt>
                    <dd className="text-slate-600 leading-relaxed text-base">
                        {definition}
                    </dd>
                </dl>

                <button
                    onClick={onClose}
                    className="w-full py-4 bg-slate-100 text-slate-900 font-bold rounded-xl active:scale-95 transition-transform"
                >
                    Got it
                </button>
            </div>
        </BottomSheet>
    );
}
