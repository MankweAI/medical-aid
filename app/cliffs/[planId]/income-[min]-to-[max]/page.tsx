// app/cliffs/[planId]/income-[min]-to-[max]/page.tsx
import { PLANS } from '@/data/plans';
import { auditIncomeCliff } from '@/utils/cliff-audit';
import { IncomeEfficiencyAudit } from '@/components/cliffs/IncomeEfficiencyAudit';

export async function generateStaticParams() {
    const planIds = [
        "discovery-keycare-start-2026",
        "discovery-keycare-plus-2026",
        "discovery-keycare-core-2026",
        "discovery-keycare-start-regional-2026"
    ];

    // Thresholds confirmed for Q1 2026
    const cliffs = [10551, 15951, 24251];

    return planIds.flatMap((planId) => {
        const paths = [];

        // 1. CLIFF ZONES: R100 steps for R500 above/below each cliff (30 pages/plan)
        cliffs.forEach(cliff => {
            for (let i = -5; i < 5; i++) {
                const min = cliff + (i * 100);
                paths.push({ planId, min: min.toString(), max: (min + 100).toString() });
            }
        });

        // 2. BAND ZONES: R1,000 steps for standard ranges (22 pages/plan)
        // Band 1: 0-10k
        for (let i = 0; i < 10; i++) {
            paths.push({ planId, min: (i * 1000).toString(), max: ((i + 1) * 1000).toString() });
        }
        // Band 2: 11k-15k
        for (let i = 11; i < 15; i++) {
            paths.push({ planId, min: (i * 1000).toString(), max: ((i + 1) * 1000).toString() });
        }
        // Band 3: 17k-24k
        for (let i = 17; i < 24; i++) {
            paths.push({ planId, min: (i * 1000).toString(), max: ((i + 1) * 1000).toString() });
        }

        return paths; // Total: 52 per plan variant = 208 Unique Pages 
    });
}

export default function CliffPage({ params }: { params: { planId: string, min: string, max: string } }) {
    const plan = PLANS.find(p => p.id === params.planId);
    const minIncome = parseInt(params.min);

    if (!plan) return <div>Plan not found</div>;

    const audit = auditIncomeCliff(minIncome, plan);

    return (
        <main className="max-w-4xl mx-auto p-6">
            <IncomeEfficiencyAudit
                plan={plan}
                income={minIncome}
                audit={audit}
            />
        </main>
    );
}