import { getPlansByIds } from '@/utils/db';
import CompareClient from './CompareClient';

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ plans?: string }> }) {
    const { plans } = await searchParams;
    const planIds = plans?.split(',') || [];

    if (planIds.length === 0) {
        return <CompareClient plans={[]} />;
    }

    // Fetch plans from database
    const resolvedPlans = await getPlansByIds(planIds);

    return <CompareClient plans={resolvedPlans} />;
}
