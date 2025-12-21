// app/cliffs/[planId]/[incomeRange]/page.tsx
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

    const allPaths = planIds.flatMap((planId) => {
        const paths = [];

        // Generate only high-density "Danger Zone" paths around the first cliff for testing
        // R100 steps for R500 above/below the R10,551 cliff
        for (let i = -2; i <= 2; i++) {
            const min = 10551 + (i * 100);
            paths.push({
                planId,
                incomeRange: `income-${min}-to-${min + 100}`
            });
        }

        return paths;
    });

    // Return all 20 paths (4 plans × 5 income ranges) for testing phase
    return allPaths;
}

// Helper function to parse income range from URL segment
function parseIncomeRange(incomeRange: string): { min: number; max: number } | null {
    const match = incomeRange.match(/^income-(\d+)-to-(\d+)$/);
    if (!match) return null;
    return {
        min: parseInt(match[1]),
        max: parseInt(match[2])
    };
}

// Next.js 15 requires params to be awaited
export default async function CliffPage({ params }: { params: Promise<{ planId: string; incomeRange: string }> }) {
    const { planId, incomeRange } = await params;

    const plan = PLANS.find(p => p.id === planId);
    const incomeData = parseIncomeRange(incomeRange);

    if (!plan) return <div>Plan not found</div>;
    if (!incomeData) return <div>Invalid income range format</div>;

    const audit = auditIncomeCliff(incomeData.min, plan);

    return (
        <main className="max-w-4xl mx-auto p-6">
            <IncomeEfficiencyAudit
                plan={plan}
                income={incomeData.min}
                audit={audit}
            />
        </main>
    );
}

