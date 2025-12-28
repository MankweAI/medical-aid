'use client';

import { useState } from 'react';
import { Phone } from 'lucide-react';
import ExpertModal from '@/components/ExpertModal';
import clsx from 'clsx';

interface ProcedureCTAsProps {
    procedureName: string;
    planName: string;
    liability: number;
    planId: string;
}

/**
 * ProcedureCTAs Component
 * 
 * Single CTA to connect users with accredited medical aid specialists.
 */
export function ProcedureCTAs({ procedureName, planName, liability, planId }: ProcedureCTAsProps) {
    const [showExpertModal, setShowExpertModal] = useState(false);

    const formattedLiability = new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        maximumFractionDigits: 0
    }).format(liability);

    return (
        <>
            {/* Single CTA Button */}
            <button
                onClick={() => setShowExpertModal(true)}
                className={clsx(
                    "w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-3",
                    "bg-gradient-to-r from-emerald-600 to-emerald-500",
                    "text-white font-bold text-sm",
                    "shadow-lg shadow-emerald-200/50",
                    "hover:from-emerald-700 hover:to-emerald-600",
                    "transition-all active:scale-[0.98]"
                )}
            >
                <Phone className="w-5 h-5" />
                Speak to an Accredited Medical Aid Specialist
            </button>

            {/* Expert Modal */}
            <ExpertModal
                isOpen={showExpertModal}
                onClose={() => setShowExpertModal(false)}
                planName={planName}
                initialQuestion={`I need help understanding the ${procedureName} co-payment of ${formattedLiability} on ${planName}`}
                expertContext={`procedure:${procedureName}|plan:${planId}|liability:${liability}`}
            />
        </>
    );
}

