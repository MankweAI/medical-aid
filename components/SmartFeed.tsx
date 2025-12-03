'use client';

import { useState, useMemo } from 'react';
import { usePersona } from '@/context/PersonaContext';
import { PlanProduct } from '@/types/schema';
import { PricingEngine, formatCurrency } from '@/utils/engine';
import { useCompare } from '@/context/CompareContext';
import {
    Bookmark, Check, AlertTriangle, Shield, ArrowRight,
    HelpCircle, ThumbsUp, ThumbsDown, Filter
} from 'lucide-react';
import clsx from 'clsx';
import ExpertModal from '@/components/ExpertModal';
import BottomSheet from '@/components/ui/BottomSheet';
import PlanDetails from '@/components/PlanDetails';

// --- ADAPTER INTERFACE ---
interface FeedProps {
    plans: PlanProduct[]; // Now accepts Real Database Objects
    initialIncome: number;
}

// --- CONSTANTS (Preserved from Original) ---
const FILTER_OPTIONS = [
    { id: 'private_ward', label: 'Private Ward' },
    { id: 'gap_cover', label: 'Gap Cover' },
    { id: 'no_co_pay', label: 'No Co-payments' },
    { id: 'specialist', label: 'Specialist Cover' }
];

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

// --- HELPER COMPONENTS ---
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

export default function SmartFeed({ plans, initialIncome }: FeedProps) {
    const { state: { income: globalIncome } } = usePersona();
    const { togglePlan, toggleSave, selectedPlans, savedPlans } = useCompare();

    const income = globalIncome || initialIncome;
    const defaultFamily = { main: 1, adult: 1, child: 1 };

    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPlanForModal, setSelectedPlanForModal] = useState('');
    const [viewingPlan, setViewingPlan] = useState<any | null>(null);

    const toggleFilter = (id: string) => {
        setActiveFilters(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    const isSelected = (id: string) => selectedPlans.some(p => p.id === id);
    const isSaved = (id: string) => savedPlans.some(p => p.id === id);

    // --- TRANSFORM DATA FOR UI ---
    const filteredPlans = useMemo(() => {
        return plans.map(plan => {
            const financials = PricingEngine.calculateProfile(plan, defaultFamily, income);

            // Logic: Derive Tags from Rules
            const tags = ['private_ward'];
            if (financials.savings.allocation > 0) tags.push('no_co_pay');
            if (plan.series.includes('Comprehensive') || plan.series.includes('Priority') || plan.series.includes('Plus')) tags.push('specialist', 'gap_cover');

            // Logic: Derive Red Flags
            let redFlag = null;
            if (plan.hard_limits.chronic_provider === 'State') redFlag = "Chronic meds restricted to State Facilities.";
            if (plan.hard_limits.casualty_visit === 'Not_Covered') redFlag = "Casualty visits not covered by scheme.";

            return {
                ...plan,
                financials,
                tags,
                redFlag,
                benefitsList: [
                    { category: 'Hospital', benefit_name: 'Network Access', display_text: `Cover at ${plan.network_geofence.replace(/_/g, ' ')} hospitals.`, rule_logic: {} },
                    { category: 'Chronic', benefit_name: 'Management', display_text: `${plan.hard_limits.chronic_provider} provider required.`, rule_logic: {} },
                    financials.savings.allocation > 0 ? { category: 'Savings', benefit_name: 'MSA', display_text: `R${financials.savings.allocation.toLocaleString()} upfront.`, rule_logic: {} } : null
                ].filter(Boolean)
            };
        }).filter(plan =>
            activeFilters.length === 0 || activeFilters.every(f => plan.tags.includes(f))
        );
    }, [plans, income, activeFilters]);

    const getEffectiveCost = (price: number, savingsAnnual: number) => {
        if (savingsAnnual <= 0) return { sunkCost: price, savingsPercent: 0 };
        const monthlySavings = savingsAnnual / 12;
        const savingsPercent = Math.min(100, (monthlySavings / price) * 100);
        return { sunkCost: price - monthlySavings, savingsPercent };
    };

    return (
        <div className="space-y-6 pb-32 animate-in slide-in-from-bottom-8 duration-700">

            {/* FILTER BAR */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 px-2">
                <div className="flex items-center gap-1 pr-2 border-r border-slate-200 mr-2">
                    <Filter className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Filters</span>
                </div>
                {FILTER_OPTIONS.map(opt => {
                    const isActive = activeFilters.includes(opt.id);
                    return (
                        <button
                            key={opt.id}
                            onClick={() => toggleFilter(opt.id)}
                            className={clsx(
                                "flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all flex items-center gap-1",
                                isActive ? "bg-blue-600 border-blue-600 text-white shadow-md" : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                            )}
                        >
                            {isActive && <Check className="w-3 h-3" />}
                            {isActive ? opt.label : `+ ${opt.label}`}
                        </button>
                    )
                })}
                {activeFilters.length > 0 && (
                    <button onClick={() => setActiveFilters([])} className="flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-400 hover:text-slate-600">
                        Clear
                    </button>
                )}
            </div>

            {/* HEADER */}
            <div className="flex items-center justify-between px-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {filteredPlans.length} Strategies Found
                </p>
            </div>

            {/* FEED */}
            {filteredPlans.length === 0 ? (
                <EmptyState onReset={() => setActiveFilters([])} />
            ) : (
                <div className="space-y-4">
                    {filteredPlans.map((plan, index) => {
                        const { sunkCost, savingsPercent } = getEffectiveCost(plan.financials.monthlyPremium, plan.financials.savings.allocation);
                        const isBest = index === 0;

                        // Knowledge Injection
                        let lesson = null;
                        if (index === 1) {
                            if (plan.network_geofence === 'Regional_Hub') lesson = KNOWLEDGE_BASE['Network'];
                            else if (plan.hard_limits.chronic_provider === 'State') lesson = KNOWLEDGE_BASE['State'];
                            else if (plan.financials.savings.allocation > 0) lesson = KNOWLEDGE_BASE['Savings'];
                        }

                        return (
                            <div key={plan.id}>
                                <div
                                    onClick={() => setViewingPlan(plan)}
                                    className={clsx(
                                        "bg-white rounded-2xl border-2 transition-all relative overflow-hidden active:scale-[0.98] cursor-pointer hover:shadow-lg shadow-sm group",
                                        isBest ? "border-emerald-500 ring-4 ring-emerald-500/10" : "border-slate-100 hover:border-slate-300"
                                    )}
                                >
                                    {isBest && (
                                        <div className="bg-emerald-500 text-white text-center text-[10px] font-bold uppercase py-1">
                                            Virtual Actuary's Top Pick
                                        </div>
                                    )}

                                    <div className="p-5 pb-3 flex justify-between items-start">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSave({ id: plan.id, name: plan.name, scheme: plan.scheme, price: plan.financials.monthlyPremium });
                                            }}
                                            className={clsx(
                                                "absolute top-5 right-5 p-2 rounded-full transition-all z-10",
                                                isSaved(plan.id) ? "bg-blue-100 text-blue-600" : "bg-slate-50 text-slate-300 hover:text-slate-50"
                                            )}
                                        >
                                            <Bookmark className={clsx("w-4 h-4", isSaved(plan.id) && "fill-current")} />
                                        </button>

                                        <div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                                {plan.scheme}
                                            </span>
                                            <h3 className="font-black text-slate-900 text-xl group-hover:text-blue-600 transition-colors">
                                                {plan.name}
                                            </h3>
                                        </div>

                                        <div className="text-right mt-8">
                                            <p className="text-2xl font-black text-slate-900">{formatCurrency(plan.financials.monthlyPremium)}</p>
                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Per Month</p>
                                        </div>
                                    </div>

                                    {/* EFFECTIVE COST BAR */}
                                    {plan.financials.savings.allocation > 0 && (
                                        <div className="px-5 pb-4">
                                            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                                                <span>Risk Cost</span>
                                                <span className="text-emerald-600">Savings ({Math.round(savingsPercent)}%)</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                                <div className="h-full bg-slate-300" style={{ width: `${100 - savingsPercent}%` }} />
                                                <div className="h-full bg-emerald-500" style={{ width: `${savingsPercent}%` }} />
                                            </div>
                                            <div className="flex justify-between text-[10px] font-medium text-slate-500 mt-1">
                                                <span>R{Math.round(sunkCost)} sunk</span>
                                                <span className="text-emerald-700">{formatCurrency(plan.financials.savings.allocation / 12)}/pm back</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* DATA GRID */}
                                    <div className="px-5 py-3 grid grid-cols-3 gap-2 border-b border-t border-slate-50 bg-slate-50/50">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">Network</span>
                                            <span className="text-xs font-bold text-slate-700 truncate">{plan.network_geofence.replace('_', ' ')}</span>
                                        </div>
                                        <div className="flex flex-col border-l border-slate-100 pl-3">
                                            <span className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">Savings</span>
                                            <span className={clsx("text-xs font-bold truncate", plan.financials.savings.allocation > 0 ? "text-emerald-600" : "text-slate-400")}>
                                                {plan.financials.savings.allocation > 0 ? `R${plan.financials.savings.allocation}` : 'None'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col border-l border-slate-100 pl-3">
                                            <span className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">Chronic</span>
                                            <span className="text-xs font-bold text-slate-700 truncate">{plan.hard_limits.chronic_provider}</span>
                                        </div>
                                    </div>

                                    {/* WARNING BANNER */}
                                    {plan.redFlag && (
                                        <div className="px-5 py-2.5 bg-amber-50 border-t border-amber-100 flex items-start gap-3">
                                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                            <p className="text-[11px] text-amber-800 font-bold leading-tight">{plan.redFlag}</p>
                                        </div>
                                    )}

                                    {/* ACTION BUTTONS */}
                                    <div className="p-4 flex gap-3">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); togglePlan({ id: plan.id, name: plan.name, scheme: plan.scheme, price: plan.financials.monthlyPremium }); }}
                                            className={clsx("flex-1 py-3 border rounded-xl text-xs font-bold flex items-center justify-center gap-2", isSelected(plan.id) ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-slate-200 text-slate-600")}
                                        >
                                            {isSelected(plan.id) ? "Added" : "Compare"}
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedPlanForModal(plan.name); setModalOpen(true); }}
                                            className="flex-[1.5] py-3 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg shadow-slate-900/10 active:scale-95 transition-transform flex items-center justify-center gap-2"
                                        >
                                            Check Availability <ArrowRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>

                                {lesson && <KnowledgeCard question={lesson.question} answer={lesson.answer} />}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* MODALS */}
            <ExpertModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                planName={selectedPlanForModal}
                context={`R${income} Strategy`}
            />

            <BottomSheet
                isOpen={!!viewingPlan}
                onClose={() => setViewingPlan(null)}
                title={viewingPlan?.name || 'Plan Details'}
            >
                {viewingPlan && (
                    <div className="space-y-6">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Monthly Premium</p>
                                <p className="text-xl font-black text-slate-900">{formatCurrency(viewingPlan.financials.monthlyPremium)}</p>
                            </div>
                            {viewingPlan.financials.savings.allocation > 0 && (
                                <div className="text-right">
                                    <p className="text-xs font-bold text-slate-400 uppercase">Annual Savings</p>
                                    <p className="text-lg font-bold text-emerald-600">R{viewingPlan.financials.savings.allocation.toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                        <PlanDetails benefits={viewingPlan.benefitsList} />
                        <div className="sticky bottom-0 bg-white/95 backdrop-blur pt-4 pb-2">
                            <button
                                onClick={() => { setViewingPlan(null); setSelectedPlanForModal(viewingPlan.name); setModalOpen(true); }}
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