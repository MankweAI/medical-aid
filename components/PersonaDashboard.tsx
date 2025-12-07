'use client';

import { useState } from 'react';
import { PricingEngine } from '@/utils/engine';
import { validatePlan, Persona, Risk } from '@/utils/persona';
import { Plan, FamilyComposition } from '@/utils/types';
import { AlertTriangle, CheckCircle, ChevronDown, Activity, ChevronRight } from 'lucide-react';
import { GapGauge, IncomeSlider } from './HeroTools';
import BottomSheet from '@/components/ui/BottomSheet';
import PlanDetails from '@/components/PlanDetails';
import clsx from 'clsx';

// Extend Plan to include calculated fields for the dashboard state
type RankedPlan = Plan & {
    risks: Risk[];
    financials: {
        monthlyPremium: number;
        savings: { isPooled: boolean; annualAllocation: number };
    };
    tier: string;
};

export default function PersonaDashboard({ persona, plans }: { persona: Persona, plans: Plan[] }) {

    // --- STATE: The "Living" Variables ---
    const [income, setIncome] = useState<number>(persona.defaults.income);
    const [members, setMembers] = useState<FamilyComposition>(persona.defaults.family_composition);
    const [showConfig, setShowConfig] = useState(false);

    // --- STATE: Bottom Sheet ---
    const [selectedPlan, setSelectedPlan] = useState<RankedPlan | null>(null);

    // --- LOGIC: Filter & Rank Plans ---
    const rankedPlans = plans.map(plan => {
        const risks = validatePlan(plan, persona);

        // FIX: Pass the first contribution object, not the plan itself
        const contribution = plan.contributions[0];
        const financials = PricingEngine.calculateProfile(contribution, members, income);

        // Traffic Light Logic
        let tier = 'GREEN';
        if (risks.some(r => r.level === 'HIGH')) tier = 'RED';
        else if (risks.some(r => r.level === 'MEDIUM')) tier = 'ORANGE';

        return { ...plan, risks, financials, tier };
    }).sort((a, b) => a.financials.monthlyPremium - b.financials.monthlyPremium);

    // Helper to update family members safely
    const updateMember = (type: keyof FamilyComposition, delta: number) => {
        setMembers(prev => ({
            ...prev,
            [type]: Math.max(type === 'main' ? 1 : 0, prev[type] + delta)
        }));
    };

    return (
        <div className="animate-in fade-in duration-500 pb-32">

            {/* 1. THE LIVING STATEMENT (Hero) */}
            <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-slate-100 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>

                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
                    Finding the right <span className="text-blue-600">{persona.meta.title.split(' ')[0]}</span> coverage for a family of
                    <button
                        onClick={() => setShowConfig(!showConfig)}
                        className="inline-flex items-center mx-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 active-press font-bold align-middle"
                    >
                        {members.main + members.adult + members.child} <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    earning
                    <button
                        onClick={() => setShowConfig(!showConfig)}
                        className="inline-flex items-center mx-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 active-press font-bold align-middle"
                    >
                        R{income.toLocaleString()} <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    pm.
                </h2>

                {/* Inline Configuration Panel (Dropdown) */}
                {showConfig && (
                    <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top-4 fade-in">
                        <div>
                            <IncomeSlider income={income} setIncome={setIncome} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">Family Composition</label>
                            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                                {[
                                    { label: 'Main', key: 'main' as const },
                                    { label: 'Adult', key: 'adult' as const }, // FIX: Key matches FamilyComposition
                                    { label: 'Child', key: 'child' as const }  // FIX: Key matches FamilyComposition
                                ].map((type) => (
                                    <div key={type.key} className="flex flex-col items-center bg-slate-50 p-3 rounded-2xl min-w-[80px]">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 mb-2">{type.label}</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateMember(type.key, -1)}
                                                className="w-8 h-8 bg-white rounded-full shadow-sm text-slate-600 font-bold border border-slate-200"
                                            >-</button>
                                            <span className="font-bold text-lg w-4 text-center">{members[type.key]}</span>
                                            <button
                                                onClick={() => updateMember(type.key, 1)}
                                                className="w-8 h-8 bg-blue-600 rounded-full shadow-lg shadow-blue-200 text-white font-bold"
                                            >+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 2. THE COMPUTATIONAL AUTHORITY (Sidebar Visualizer) */}
                <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-8">
                        {persona.search_profile.chronic_needs === 'Comprehensive' && rankedPlans.length > 0 && (
                            <GapGauge financial={rankedPlans[0].financials} />
                        )}

                        <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 flex gap-4 items-start">
                            <div className="bg-white p-2 rounded-full shadow-sm">
                                <Activity className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-blue-900 text-sm mb-1">
                                    Virtual Actuary Insight
                                </h4>
                                <p className="text-xs text-blue-700 leading-relaxed">
                                    {/* FIX: Safe access to optional actuarial logic */}
                                    {persona.actuarial_logic?.mathematical_basis || "Optimized for your profile."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. THE SMART FEED (Results) */}
                <div className="lg:col-span-2 space-y-4">
                    {rankedPlans.map((plan) => (
                        <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan)}
                            className={clsx(
                                "group bg-white rounded-[24px] border-2 transition-all active-press cursor-pointer relative overflow-hidden",
                                plan.tier === 'GREEN' ? "border-emerald-100 hover:border-emerald-200" :
                                    plan.tier === 'ORANGE' ? "border-orange-100 hover:border-orange-200" : "border-slate-100 opacity-75"
                            )}
                        >
                            {/* Tap Affordance */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronRight className="w-5 h-5 text-slate-300" />
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            {plan.tier === 'GREEN' && <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Best Match</span>}
                                            {plan.tier === 'ORANGE' && <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Trade-Off</span>}
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{plan.identity.scheme_name}</span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-xl">{plan.identity.plan_name}</h3>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-slate-900" suppressHydrationWarning>
                                            {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(plan.financials.monthlyPremium)}
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">per month</div>
                                    </div>
                                </div>

                                {/* Risk/Benefit Pills */}
                                <div className="flex flex-wrap gap-2">
                                    {plan.financials.savings.isPooled && (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium text-slate-600" suppressHydrationWarning>
                                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                            Savings: R{plan.financials.savings.annualAllocation.toLocaleString()}
                                        </div>
                                    )}
                                    {plan.risks.slice(0, 2).map((risk: Risk, i: number) => (
                                        <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 border border-rose-100 rounded-xl text-xs font-medium text-rose-700">
                                            <AlertTriangle className="w-3.5 h-3.5" />
                                            {risk.warning}
                                        </div>
                                    ))}
                                    {plan.risks.length > 2 && (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl text-xs font-medium text-slate-500">
                                            +{plan.risks.length - 2} more risks
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. THE BOTTOM SHEET (Details View) */}
            <BottomSheet
                isOpen={!!selectedPlan}
                onClose={() => setSelectedPlan(null)}
                title={selectedPlan?.identity.plan_name || 'Plan Details'}
            >
                {selectedPlan && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Summary Block */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-slate-500 uppercase">Monthly Premium</span>
                                <span className="text-2xl font-black text-slate-900" suppressHydrationWarning>
                                    {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(selectedPlan.financials.monthlyPremium)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-slate-500 uppercase">Annual Savings</span>
                                <span className="text-lg font-bold text-emerald-600" suppressHydrationWarning>
                                    R{selectedPlan.financials.savings.annualAllocation.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* Risks Section */}
                        {selectedPlan.risks.length > 0 && (
                            <div className="mb-8">
                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                                    Risk Analysis
                                </h4>
                                <div className="space-y-3">
                                    {selectedPlan.risks.map((risk: Risk, i: number) => (
                                        <div key={i} className="bg-rose-50 p-3 rounded-xl border border-rose-100 text-sm">
                                            <strong className="block text-rose-800 mb-1">{risk.warning}</strong>
                                            <span className="text-rose-600 leading-relaxed">{risk.details}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Full Details Component: FIX - Passed 'plan' prop */}
                        <PlanDetails plan={selectedPlan} />

                        {/* CTA */}
                        <div className="sticky bottom-0 pt-4 pb-2 bg-white/90 backdrop-blur-sm mt-6">
                            <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/20 active-press">
                                Select This Plan
                            </button>
                        </div>
                    </div>
                )}
            </BottomSheet>
        </div>
    );
}