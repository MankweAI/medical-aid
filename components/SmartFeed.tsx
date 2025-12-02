'use client';

import { usePersona } from '@/context/PersonaContext';
import { PlanProduct } from '@/types/schema';
import { PricingEngine, formatCurrency } from '@/utils/engine';
import { ArrowRight, Bookmark } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import clsx from 'clsx';

// DEFINITION: Updated Props Interface
interface FeedProps {
    plans: PlanProduct[]; // [Target Plan, ...Challenger Plans]
    initialIncome: number;
}

export default function SmartFeed({ plans, initialIncome }: FeedProps) {
    const { state: { income: globalIncome } } = usePersona();
    const { toggleSave, savedPlans } = useCompare();

    // Use global income if set (user moved slider), else initial from URL
    const income = globalIncome || initialIncome;

    // Default family structure for feed comparisons (Main + Adult + Child)
    // You can make this dynamic later if needed
    const defaultFamily = { main: 1, adult: 1, child: 1 };

    return (
        <div className="space-y-6 pb-32">
            <div className="flex items-center justify-between px-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Compare Alternatives
                </p>
            </div>

            <div className="space-y-4">
                {plans.map((plan, index) => {
                    // Calculate real-time costs
                    const financials = PricingEngine.calculateProfile(plan, defaultFamily, income);
                    const isBest = index === 0; // First plan is the Target Plan
                    const isSaved = savedPlans.some(p => p.id === plan.id);

                    return (
                        <div key={plan.id} className={clsx(
                            "bg-white rounded-2xl border-2 transition-all relative overflow-hidden group",
                            isBest ? "border-emerald-500 ring-4 ring-emerald-500/10" : "border-slate-100 hover:border-slate-300"
                        )}>
                            {isBest && (
                                <div className="bg-emerald-500 text-white text-center text-[10px] font-bold uppercase py-1">
                                    Best Match for your Persona
                                </div>
                            )}

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            {plan.scheme}
                                        </span>
                                        <h3 className="font-black text-slate-900 text-lg">
                                            {plan.name}
                                        </h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-black text-slate-900">
                                            {formatCurrency(financials.monthlyPremium)}
                                        </p>
                                        <p className="text-[10px] text-slate-400 uppercase">pm</p>
                                    </div>
                                </div>

                                {/* Key Actuarial Stats */}
                                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                                    <div className="bg-slate-50 p-2 rounded-lg">
                                        <span className="block text-[9px] text-slate-400 uppercase font-bold">Network</span>
                                        <span className="font-bold text-slate-700">{plan.network_geofence.replace('_', ' ')}</span>
                                    </div>
                                    <div className="bg-slate-50 p-2 rounded-lg">
                                        <span className="block text-[9px] text-slate-400 uppercase font-bold">Savings</span>
                                        <span className={clsx("font-bold", financials.savings.allocation > 0 ? "text-emerald-600" : "text-slate-400")}>
                                            {financials.savings.allocation > 0 ? formatCurrency(financials.savings.allocation / 12) + '/pm' : 'None'}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => toggleSave({ id: plan.id, name: plan.name, scheme: plan.scheme, price: financials.monthlyPremium })}
                                        className={clsx("flex-1 py-3 border rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors", isSaved ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-slate-200 text-slate-600")}
                                    >
                                        <Bookmark className={clsx("w-4 h-4", isSaved && "fill-current")} />
                                        {isSaved ? "Saved" : "Save"}
                                    </button>
                                    <button className="flex-[2] py-3 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
                                        Analyze Plan <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}