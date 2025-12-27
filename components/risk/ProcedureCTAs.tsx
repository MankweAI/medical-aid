'use client';

import { useState } from 'react';
import { Shield, CheckCircle, Phone } from 'lucide-react';
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
 * Displays the two primary monetization CTAs on procedure pages:
 * 1. Gap Cover CTA - Primary revenue driver
 * 2. Verify CTA - Opens ExpertModal for lead capture
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
            {/* CTA Container */}
            <div className="space-y-3">

                {/* 1. GAP COVER CTA (Primary) */}
                <a
                    href="https://www.turnberry.co.za/gap-cover?ref=intellihealth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                        "w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-3",
                        "bg-gradient-to-r from-emerald-600 to-emerald-500",
                        "text-white font-black text-sm",
                        "shadow-xl shadow-emerald-200",
                        "hover:from-emerald-700 hover:to-emerald-600",
                        "transition-all active:scale-[0.98]"
                    )}
                >
                    <Shield className="w-5 h-5" />
                    Get Gap Cover Quote
                    <span className="text-xs font-medium text-emerald-100 bg-emerald-700/50 px-2 py-0.5 rounded-full">
                        Covers {formattedLiability}+
                    </span>
                </a>

                {/* 2. VERIFY CTA (Secondary) */}
                <button
                    onClick={() => setShowExpertModal(true)}
                    className={clsx(
                        "w-full py-3.5 px-6 rounded-xl flex items-center justify-center gap-3",
                        "bg-white border-2 border-slate-200",
                        "text-slate-700 font-bold text-sm",
                        "hover:border-emerald-300 hover:bg-emerald-50",
                        "transition-all active:scale-[0.98]"
                    )}
                >
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Verify This Information
                </button>

                {/* Trust Signal */}
                <p className="text-center text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1.5">
                    <Phone className="w-3 h-3" />
                    Speak to an accredited medical aid specialist
                </p>
            </div>

            {/* Expert Modal */}
            <ExpertModal
                isOpen={showExpertModal}
                onClose={() => setShowExpertModal(false)}
                planName={planName}
                initialQuestion={`Verify the ${procedureName} co-payment of ${formattedLiability} on ${planName}`}
                expertContext={`procedure:${procedureName}|plan:${planId}|liability:${liability}`}
            />
        </>
    );
}
