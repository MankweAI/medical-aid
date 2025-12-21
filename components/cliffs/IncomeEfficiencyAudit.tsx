// components/cliffs/IncomeEfficiencyAudit.tsx
import { Plan } from '@/utils/types';
import { CliffAudit } from '@/utils/cliff-audit';
import { GlassCard } from '@/components/ui/GlassCard';

export function IncomeEfficiencyAudit({ plan, income, audit }: { plan: Plan, income: number, audit: any }) {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold">Income Efficiency Audit: {plan.identity.plan_name}</h1>
                <p className="text-gray-500">Targeting the R{income} Monthly Gross Income Band</p>
            </header>

            {audit.isDangerZone && (
                <GlassCard className="border-red-500 bg-red-50/50">
                    <h3 className="text-red-700 font-bold flex items-center">
                        ⚠️ Income Cliff Warning
                    </h3>
                    <p className="text-red-600 mt-2">
                        You are within R500 of a medical aid "Cliff." A R1 increase in gross income will
                        trigger a <strong>R{audit.premiumJump}</strong> monthly premium hike.
                    </p>
                    <div className="mt-4 p-3 bg-white rounded border border-red-200">
                        <span className="text-sm text-gray-600">Effective "Raise Tax" at the Cliff:</span>
                        <div className="text-2xl font-bold text-red-700">
                            {audit.marginalTaxRate.toLocaleString()}%
                        </div>
                    </div>
                </GlassCard>
            )}

            {/* Verification Checklist: Based on DHMS 2026 Rules */}
            <section className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-4">Mandatory Income Verification</h4>
                <p className="text-sm text-blue-700 mb-4">
                    Discovery calculates your band based on the higher of your or your spouse's
                    earnings from ALL sources. Have you included:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {[
                        "Monthly Basic Salary",
                        "Commission & Performance Rewards",
                        "Investment Interest",
                        "Rental Income from Assets",
                        "Trust Distributions",
                        "Retrospective Overtime"
                    ].map(item => (
                        <li key={item} className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-blue-300" />
                            {item}
                        </li>
                    ))}
                </ul>
                <p className="mt-4 text-xs italic text-blue-600">
                    *Retroactive Adjustment Risk: A single month of high commission can trigger a debt to the scheme for the entire year[cite: 1571].
                </p>
            </section>

            {/* Comparative Yield Logic [cite: 1601] */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GlassCard>
                    <span className="text-sm text-gray-500">Current Monthly Cost</span>
                    <div className="text-2xl font-bold">R{audit.currentPremium}</div>
                </GlassCard>
                <GlassCard>
                    <span className="text-sm text-gray-500">Annual Disposable Income Risk</span>
                    <div className="text-2xl font-bold text-orange-600">R{audit.annualImpact}</div>
                </GlassCard>
            </div>
        </div>
    );
}