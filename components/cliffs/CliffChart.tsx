// components/cliffs/CliffChart.tsx
"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, AreaChart, Area } from 'recharts';
import { Plan, IncomeBand } from '@/utils/types';

export function CliffChart({ plan, currentIncome }: { plan: Plan; currentIncome: number }) {
    const contribution = plan.contributions[0];
    const bands = contribution.pricing_matrix as IncomeBand[];

    // Generate data points for the chart around the current income
    const data = [];
    const start = Math.max(0, currentIncome - 2000);
    const end = currentIncome + 2000;

    for (let i = start; i <= end; i += 100) {
        const band = bands.find(b => i >= b.min && (b.max === null || i <= b.max)) || bands[bands.length - 1];
        data.push({
            income: i,
            premium: band.main,
            netImpact: i - band.main // Simplified NIAMA calculation [cite: 16]
        });
    }

    return (
        <div className="h-64 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="income"
                        type="number"
                        domain={[start, end]}
                        tickFormatter={(val) => `R${val / 1000}k`}
                    />
                    <YAxis hide />
                    <Tooltip
                        formatter={(val) => [`R${val ?? 0}`, 'Monthly Premium']}
                        labelFormatter={(label) => `Income: R${label}`}
                    />
                    <Area
                        type="stepAfter"
                        dataKey="premium"
                        stroke="#2563eb"
                        fill="#dbeafe"
                        strokeWidth={2}
                    />
                    {/* Highlight the current income position */}
                    <ReferenceLine x={currentIncome} stroke="red" label="You" strokeDasharray="3 3" />
                </AreaChart>
            </ResponsiveContainer>
            <p className="text-center text-xs text-gray-400 mt-2 italic">
                Step-Function Cost Curve for {plan.identity.plan_name} [cite: 15]
            </p>
        </div>
    );
}