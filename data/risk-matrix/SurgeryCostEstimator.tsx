// components/risk-matrix/SurgeryCostEstimator.tsx
import { Plan } from '@/utils/types';
import { GlassCard } from '@/components/ui/GlassCard';
import { PLAN_PROCEDURE_RULES } from '@/data/procedures';

export function SurgeryCostEstimator({ plan, procedure }: { plan: Plan, procedure: any }) {
    const rules = PLAN_PROCEDURE_RULES[plan.id] || { base_deductible: 0 };
    const upfrontCost = rules.base_deductible || rules.non_network_penalty || 0;
    const isSpinal = procedure.id.includes('spinal');

    return (
        <div className="space-y-6">
            <header className="border-b pb-4">
                <h1 className="text-2xl font-bold">{procedure.name} Cost Audit</h1>
                <p className="text-blue-600 font-medium">Plan: {plan.identity.plan_name}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <GlassCard className="bg-white">
                    <span className="text-xs uppercase text-gray-400">Fixed Upfront Cash</span>
                    <div className="text-3xl font-bold text-red-600">R{upfrontCost.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-2">Required at point of admission.</p>
                </GlassCard>

                <GlassCard className="bg-white">
                    <span className="text-xs uppercase text-gray-400">Monthly Premium</span>
                    <div className="text-3xl font-bold">R{plan.price.toLocaleString()}</div>
                    <p className="text-xs text-gray-500 mt-2">Fixed monthly insurance cost.</p>
                </GlassCard>

                <GlassCard className="bg-blue-50 border-blue-200">
                    <span className="text-xs uppercase text-blue-400">Annual Total</span>
                    <div className="text-3xl font-bold text-blue-700">
                        R{((plan.price * 12) + upfrontCost).toLocaleString()}
                    </div>
                    <p className="text-xs text-blue-500 mt-2">Combined premium + procedure cost.</p>
                </GlassCard>
            </div>

            {upfrontCost > 5000 && (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-bold text-orange-800 flex items-center gap-2">
                        ⚠️ The Double-Deductible Trap
                    </h4>
                    <p className="text-sm text-orange-700 mt-1">
                        If this {procedure.name.toLowerCase()} is performed outside the Day Surgery Network,
                        Discovery may apply an additional facility penalty of up to R7,750[cite: 38].
                        <strong> Always verify the facility network with your surgeon.</strong>
                    </p>
                </div>
            )}

            {isSpinal && (
                <div className="p-4 bg-gray-50 border rounded-lg text-sm text-gray-600">
                    <strong>Conservative Care Clause:</strong> Spinal deductibles may be waived only if you
                    complete the scheme-approved conservative care pathway (physio/rehab) before surgery[cite: 161].
                </div>
            )}

            <div className="bg-gray-900 text-white p-6 rounded-xl">
                <h4 className="font-bold mb-2">Actuarial Verdict</h4>
                <p className="text-gray-400 text-sm">
                    For a {procedure.name}, this plan is
                    <span className="text-white font-bold ml-1">
                        {upfrontCost > 10000 ? "Economically High Risk" : "Calculated Efficiency"}.
                    </span>
                    {upfrontCost > 0 ? ` You are trading a lower monthly premium for a R${upfrontCost} event-based liability.` : " This plan has zero upfront procedural deductibles."}
                </p>
            </div>
        </div>
    );
}