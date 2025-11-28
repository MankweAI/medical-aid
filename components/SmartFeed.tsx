'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCompare } from '@/context/CompareContext';
import {
    Check, AlertTriangle, Plus, Shield, ArrowRight,
    HelpCircle, ThumbsUp, ThumbsDown, Filter
} from 'lucide-react';
import clsx from 'clsx';
import ExpertModal from '@/components/ExpertModal';
import BottomSheet from '@/components/ui/BottomSheet';
import PlanDetails from '@/components/PlanDetails';

// --- Types ---
interface PlanUI {
    id: string;
    name: string;
    scheme: string;
    price: number;
    network_restriction: string;
    savings_annual: number;
    chronic_limit: string;
    red_flag?: string;
    verdictType: 'good' | 'warning' | 'neutral';
    social_proof?: string;
    benefits: any[];
    mustHaves: string[];
}

// --- Filters Data ---
const FILTER_OPTIONS = [
    { id: 'private_ward', label: 'Private Ward' },
    { id: 'gap_cover', label: 'Gap Cover' },
    { id: 'no_co_pay', label: 'No Co-payments' },
    { id: 'specialist', label: 'Specialist Cover' }
];

// --- Helper Components ---

function KnowledgeCard({ question, answer }: { question: string, answer: string }) {
    return (
        <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-5 my-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex gap-3 items-start">
                <div className="bg-white p-1.5 rounded-full shadow-sm shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 text-xs mb-1">{question}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{answer}</p>
                    <div className="flex gap-3 mt-2.5">
                        <button className="text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" /> Helpful
                        </button>
                        <button className="text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1">
                            <ThumbsDown className="w-3 h-3" /> Not relevant
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmptyState({ onReset }: { onReset: () => void }) {
    return (
        <div className="text-center py-12 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Shield className="w-6 h-6 text-slate-300" />
            </div>
            <h3 className="text-slate-900 font-bold text-sm">No plans match these filters</h3>
            <button onClick={onReset} className="text-blue-600 font-bold text-xs hover:underline mt-2">
                Clear All Filters
            </button>
        </div>
    );
}

// --- Main Component ---

export default function SmartFeed({ persona, initialIncome }: { persona: string, initialIncome: number }) {
    const searchParams = useSearchParams();
    const { togglePlan, selectedPlans } = useCompare();
    const income = parseInt(searchParams.get('income') || initialIncome.toString());

    // --- Logic State ---
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlanForModal, setSelectedPlanForModal] = useState('');
    const [viewingPlan, setViewingPlan] = useState<PlanUI | null>(null);

    // --- Toggle Filter ---
    const toggleFilter = (id: string) => {
        setActiveFilters(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    // --- Handlers ---
    const isSelected = (id: string) => selectedPlans.some(p => p.id === id);

    const getEffectiveCost = (price: number, savingsAnnual: number) => {
        if (savingsAnnual === 0) return { sunkCost: price, savingsPercent: 0 };
        const monthlySavings = savingsAnnual / 12;
        const sunkCost = price - monthlySavings;
        const savingsPercent = (monthlySavings / price) * 100;
        return { sunkCost, savingsPercent };
    };

    const handleVerify = (e: React.MouseEvent, planName: string) => {
        e.stopPropagation();
        setSelectedPlanForModal(planName);
        setModalOpen(true);
    };

    const handleCompare = (e: React.MouseEvent, plan: PlanUI) => {
        e.stopPropagation();
        togglePlan({ id: plan.id, name: plan.name, scheme: plan.scheme });
    };

    // --- MOCK DATA (FULLY POPULATED) ---
    const allPlans: PlanUI[] = [
        {
            id: 'bonstart-plus',
            name: 'BonStart Plus',
            scheme: 'Bonitas',
            price: 1800,
            network_restriction: 'Network',
            savings_annual: 0,
            chronic_limit: 'Basic CIB',
            verdictType: 'good',
            social_proof: 'Selected by 42 families this week',
            mustHaves: ['private_ward', 'no_co_pay'],
            benefits: [
                {
                    category: 'Hospitalization',
                    benefit_name: 'Private Network',
                    display_text: 'Unlimited cover at BonStart Network hospitals. Emergency treatment covers you at any private hospital.',
                    rule_logic: { deductible: 0 }
                },
                {
                    category: 'Maternity',
                    benefit_name: 'Birth Benefit',
                    display_text: '100% of the Bonitas Rate for private ward delivery. Includes 6 antenatal consultations.',
                    rule_logic: { limit: 'Unlimited' }
                },
                {
                    category: 'GP Visits',
                    benefit_name: 'Unlimited Consults',
                    display_text: 'Unlimited GP visits at network doctors. Virtual care is free via the app.',
                    rule_logic: { co_pay: 0 }
                }
            ]
        },
        {
            id: 'keycare-start',
            name: 'KeyCare Start',
            scheme: 'Discovery',
            price: 1400,
            network_restriction: 'State/Network',
            savings_annual: 0,
            chronic_limit: 'State Facilities',
            red_flag: 'Chronic medication restricted to State Facilities only.',
            verdictType: 'warning',
            mustHaves: ['private_ward'],
            benefits: [
                {
                    category: 'Hospitalization',
                    benefit_name: 'KeyCare Network',
                    display_text: 'Full cover in the KeyCare Hospital Network. State hospitals for chronic conditions.',
                    rule_logic: { condition: 'Restricted Network' }
                },
                {
                    category: 'Day-to-Day',
                    benefit_name: 'GP Limit',
                    display_text: 'Unlimited visits to your selected KeyCare GP. Casual visits not covered.',
                    rule_logic: { preauth: true }
                }
            ]
        },
        {
            id: 'classic-saver',
            name: 'Classic Saver',
            scheme: 'Discovery',
            price: 3350,
            network_restriction: 'Any',
            savings_annual: 10452,
            chronic_limit: 'R22,000 (DSA)',
            verdictType: 'neutral',
            social_proof: 'Rated 4.9/5 for Claims Payout',
            mustHaves: ['private_ward', 'specialist', 'gap_cover'],
            benefits: [
                {
                    category: 'Hospitalization',
                    benefit_name: 'Any Hospital',
                    display_text: 'Go to any private hospital. 20% co-payment only applies to specialists not on the Classic network.',
                    rule_logic: { deductible: 0 }
                },
                {
                    category: 'Savings',
                    benefit_name: 'Medical Savings Account',
                    display_text: 'R10,450 available upfront for day-to-day expenses like GP visits and scripts.',
                    rule_logic: { limit: 'R10,452' }
                },
                {
                    category: 'Oncology',
                    benefit_name: 'Cancer Cover',
                    display_text: 'R250,000 threshold before 20% co-payment applies. Full cover for PMBs.',
                    rule_logic: { limit: 'R250k' }
                }
            ]
        }
    ];

    // --- Filtering Logic ---
    const filteredPlans = useMemo(() => {
        if (activeFilters.length === 0) return allPlans;
        return allPlans.filter(plan =>
            // Plan must have ALL active filters
            activeFilters.every(filter => plan.mustHaves.includes(filter))
        );
    }, [activeFilters, allPlans]);

    // --- Constants for Knowledge Base ---
    const KNOWLEDGE_BASE = {
        'Network': {
            question: "Why is this 'Network' plan cheaper?",
            answer: "Network plans limit you to specific hospitals. By guaranteeing patient volume, the scheme negotiates lower rates (often 20% less), passing the savings to you."
        },
        'State': {
            question: "What does 'State Facilities' mean?",
            answer: "To keep premiums low, this plan requires you to collect monthly chronic medication from government clinics instead of private pharmacies."
        },
        'Savings': {
            question: "Is the 'Savings Account' really my money?",
            answer: "Yes. It is an upfront cash advance for day-to-day care. If you don't spend it, it carries over to next year. It is not 'use it or lose it'."
        }
    };

    return (
        <div className="space-y-6 pb-32 animate-in slide-in-from-bottom-8 duration-700">

            {/* 1. Functional Filter Chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 px-2">
                <div className="flex items-center gap-1 pr-2 border-r border-slate-200 mr-2">
                    <Filter className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Must Haves</span>
                </div>
                {FILTER_OPTIONS.map(opt => {
                    const isActive = activeFilters.includes(opt.id);
                    return (
                        <button
                            key={opt.id}
                            onClick={() => toggleFilter(opt.id)}
                            className={clsx(
                                "flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all flex items-center gap-1",
                                isActive
                                    ? "bg-blue-600 border-blue-600 text-white shadow-md"
                                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                            )}
                        >
                            {isActive && <Check className="w-3 h-3" />}
                            {isActive ? opt.label : `+ ${opt.label}`}
                        </button>
                    )
                })}
                {activeFilters.length > 0 && (
                    <button
                        onClick={() => setActiveFilters([])}
                        className="flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-400 hover:text-slate-600"
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* 2. Header Status */}
            <div className="flex items-center justify-between px-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Matching {filteredPlans.length} Strategies
                </p>
            </div>

            {/* 3. Feed or Empty State */}
            {filteredPlans.length === 0 ? (
                <EmptyState onReset={() => setActiveFilters([])} />
            ) : (
                <div className="space-y-4">
                    {filteredPlans.map((plan, index) => {
                        const { sunkCost, savingsPercent } = getEffectiveCost(plan.price, plan.savings_annual);

                        // Knowledge Injection Logic
                        let knowledgeKey = null;
                        if (index === 1 && filteredPlans.length > 1) {
                            if (filteredPlans[0].network_restriction.includes('State')) knowledgeKey = 'State';
                            else if (filteredPlans[0].network_restriction.includes('Network')) knowledgeKey = 'Network';
                            else if (filteredPlans[0].savings_annual > 0) knowledgeKey = 'Savings';
                        }
                        const lesson = knowledgeKey ? KNOWLEDGE_BASE[knowledgeKey as keyof typeof KNOWLEDGE_BASE] : null;

                        return (
                            <div key={plan.id}>

                                {/* Plan Card */}
                                <div
                                    onClick={() => setViewingPlan(plan)}
                                    className={clsx(
                                        "bg-white rounded-2xl border-2 transition-all relative overflow-hidden active:scale-[0.98] cursor-pointer hover:shadow-lg shadow-sm group",
                                        isSelected(plan.id)
                                            ? "border-blue-500 ring-4 ring-blue-500/10"
                                            : plan.verdictType === 'good' ? "border-emerald-100" : "border-slate-100"
                                    )}
                                >
                                    {/* HEADER */}
                                    <div className="p-5 pb-3 flex justify-between items-start">
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                                {plan.scheme}
                                                {plan.verdictType === 'good' && <Check className="w-3 h-3 text-emerald-500" />}
                                            </span>
                                            <h3 className="font-black text-slate-900 text-xl group-hover:text-blue-600 transition-colors">
                                                {plan.name}
                                            </h3>
                                            {plan.social_proof && (
                                                <p className="text-[9px] text-blue-600 font-bold mt-1 bg-blue-50 w-fit px-1.5 py-0.5 rounded">
                                                    {plan.social_proof}
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-slate-900">R{plan.price}</p>
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Per Month</p>
                                        </div>
                                    </div>

                                    {/* EFFECTIVE COST */}
                                    {plan.savings_annual > 0 && (
                                        <div className="px-5 pb-4">
                                            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                                                <span>Risk Premium</span>
                                                <span className="text-emerald-600">Your Savings ({Math.round(savingsPercent)}%)</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                                <div className="h-full bg-slate-300" style={{ width: `${100 - savingsPercent}%` }} />
                                                <div className="h-full bg-emerald-500" style={{ width: `${savingsPercent}%` }} />
                                            </div>
                                            <div className="flex justify-between text-[10px] font-medium text-slate-500 mt-1">
                                                <span>R{Math.round(sunkCost)} sunk cost</span>
                                                <span className="text-emerald-700">R{Math.round(plan.savings_annual / 12)}/pm back</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* ZONE A */}
                                    <div className="px-5 py-3 grid grid-cols-3 gap-2 border-b border-t border-slate-50 bg-slate-50/50">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">Hospital</span>
                                            <span className="text-xs font-bold text-slate-700 truncate">{plan.network_restriction}</span>
                                        </div>
                                        <div className="flex flex-col border-l border-slate-100 pl-3">
                                            <span className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">Savings</span>
                                            <span className={clsx("text-xs font-bold truncate", plan.savings_annual > 0 ? "text-emerald-600" : "text-slate-400")}>
                                                {plan.savings_annual > 0 ? `R${plan.savings_annual}` : 'None'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col border-l border-slate-100 pl-3">
                                            <span className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">Chronic</span>
                                            <span className="text-xs font-bold text-slate-700 truncate">{plan.chronic_limit}</span>
                                        </div>
                                    </div>

                                    {/* ZONE B */}
                                    {plan.red_flag && (
                                        <div className="px-5 py-2.5 bg-amber-50 border-t border-amber-100 flex items-start gap-3">
                                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                            <p className="text-[11px] text-amber-800 font-bold leading-tight">{plan.red_flag}</p>
                                        </div>
                                    )}

                                    {/* ZONE C */}
                                    <div className="p-4 flex gap-3">
                                        <button onClick={(e) => handleCompare(e, plan)} className={clsx("flex-1 py-3 border rounded-xl text-xs font-bold flex items-center justify-center gap-2", isSelected(plan.id) ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-slate-200 text-slate-600")}>
                                            {isSelected(plan.id) ? "Added" : "Compare"}
                                        </button>
                                        <button onClick={(e) => handleVerify(e, plan.name)} className="flex-[1.5] py-3 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg shadow-slate-900/10 active:scale-95 transition-transform flex items-center justify-center gap-2">
                                            Check Availability <ArrowRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>

                                {/* Interstitial */}
                                {lesson && (
                                    <KnowledgeCard
                                        question={lesson.question}
                                        answer={lesson.answer}
                                    />
                                )}

                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modals & Sheets */}
            <ExpertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                planName={selectedPlanForModal}
                context={`R${income} Strategy`}
            />

            <BottomSheet
                isOpen={!!viewingPlan}
                onClose={() => setViewingPlan(null)}
                title={viewingPlan?.name || 'Plan Intelligence'}
            >
                {viewingPlan && (
                    <div className="space-y-6">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Monthly Premium</p>
                                <p className="text-xl font-black text-slate-900">R{viewingPlan.price} <span className="text-xs font-medium text-slate-400">pm</span></p>
                            </div>
                            {viewingPlan.savings_annual > 0 && (
                                <div className="text-right">
                                    <p className="text-xs font-bold text-slate-400 uppercase">Annual Savings</p>
                                    <p className="text-lg font-bold text-emerald-600">R{viewingPlan.savings_annual.toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                        <PlanDetails benefits={viewingPlan.benefits} />
                        <div className="sticky bottom-0 bg-white/95 backdrop-blur pt-4 pb-2">
                            <button
                                onClick={(e) => {
                                    setViewingPlan(null);
                                    handleVerify(e, viewingPlan.name);
                                }}
                                className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-900/20 active:scale-95 transition-transform"
                            >
                                Confirm Availability
                            </button>
                        </div>
                    </div>
                )}
            </BottomSheet>
        </div>
    );
}