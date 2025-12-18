import { PLANS } from '@/data/plans';
import CompareClient from './CompareClient';
import { Plan } from '@/utils/types';

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ plans?: string }> }) {
    const { plans } = await searchParams;
    const planIds = plans?.split(',') || [];

    if (planIds.length === 0) {
        return <CompareClient plans={[]} />;
    }

    // Use local data instead of Supabase
    const resolvedPlans = PLANS.filter(p => planIds.includes(p.id));

    return <CompareClient plans={resolvedPlans} />;
}