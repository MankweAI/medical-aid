'use client';

import { useState } from 'react';
import ExpertModal from '@/components/ExpertModal';

interface ExpertCTAProps {
    planName: string;
    procedureName: string;
    planId: string;
}

/**
 * Client Component wrapper for the Expert CTA button + modal.
 * Allows Server Component pages to include interactive modal functionality.
 */
export function ExpertCTA({ planName, procedureName, planId }: ExpertCTAProps) {
    const [showExpertModal, setShowExpertModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowExpertModal(true)}
                className="inline-block mt-4 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all active:scale-[0.98]"
            >
                Get Free Expert Advice
            </button>

            <ExpertModal
                isOpen={showExpertModal}
                onClose={() => setShowExpertModal(false)}
                planName={planName}
                initialQuestion={`I need help understanding my ${procedureName} costs on ${planName}`}
                expertContext={`Plan: ${planId} | Procedure: ${procedureName}`}
            />
        </>
    );
}
