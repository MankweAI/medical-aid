'use client'; // This directive is mandatory here

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ExpertModal from '@/components/ExpertModal';

interface Props {
    planName: string;
    context: string;
}

export default function ContactExpertTrigger({ planName, context }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-sm shadow-xl shadow-emerald-900/20 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
                <MessageCircle className="w-5 h-5" />
                Contact an Expert
            </button>

            <ExpertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                planName={planName}
                initialQuestion="I need an expert to check my doctor's rates for this surgery."
                expertContext={context}
            />
        </>
    );
}
