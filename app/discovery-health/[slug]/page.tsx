import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
    getPlanBySlug,
    getProcedureForScheme,
    getAllPlans,
    getAllProcedureSlugs,
    getPlansForComparison
} from '@/lib/data-loader';
import { PlanDetailView } from '@/components/scheme/PlanDetailView';
import { ProcedureHubView } from '@/components/scheme/ProcedureHubView';
import { PlanComparisonView } from '@/components/scheme/PlanComparisonView';

interface PageProps {
    params: Promise<{ slug: string }>;
}

const SCHEME_SLUG = 'discovery-health';
const SCHEME_NAME = 'Discovery Health';

/**
 * Parse a comparison slug like "keycare-plus-vs-executive-plan"
 * Returns null if the format is invalid
 */
function parseComparisonSlug(slug: string): { planSlug1: string; planSlug2: string } | null {
    if (!slug.includes('-vs-')) return null;
    const parts = slug.split('-vs-');
    if (parts.length !== 2) return null;
    const [planSlug1, planSlug2] = parts;
    if (!planSlug1 || !planSlug2) return null;
    return { planSlug1, planSlug2 };
}

export async function generateStaticParams() {
    // 1. Plan Params
    const plans = getAllPlans();
    const planParams = plans.map(p => ({ slug: p.identity.plan_slug }));

    // 2. Procedure Params
    const procedures = getAllProcedureSlugs();
    const procParams = procedures.map(slug => ({ slug }));

    // 3. Comparison Params
    const compareParams: { slug: string }[] = [];
    for (let i = 0; i < plans.length; i++) {
        for (let j = i + 1; j < plans.length; j++) {
            const plan1 = plans[i];
            const plan2 = plans[j];
            if (plan1.identity.scheme_slug !== SCHEME_SLUG) continue;
            if (plan2.identity.scheme_slug !== SCHEME_SLUG) continue;

            compareParams.push({
                slug: `${plan1.identity.plan_slug}-vs-${plan2.identity.plan_slug}`
            });
        }
    }

    // De-duplicate
    const allSlugs = new Set([
        ...planParams.map(p => p.slug),
        ...procParams.map(p => p.slug),
        ...compareParams.map(p => p.slug)
    ]);

    return Array.from(allSlugs).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    // 1. Try Comparison
    const comparison = parseComparisonSlug(slug);
    if (comparison) {
        const result = getPlansForComparison(SCHEME_SLUG, comparison.planSlug1, comparison.planSlug2);
        if (result) {
            const { plan1, plan2 } = result;
            const title = `${plan1.identity.plan_name} vs ${plan2.identity.plan_name} | ${SCHEME_NAME} Comparison`;
            const description = `Compare ${plan1.identity.plan_name} (R${plan1.premiums.main_member.toLocaleString()}/month) with ${plan2.identity.plan_name} (R${plan2.premiums.main_member.toLocaleString()}/month).`;
            const canonicalUrl = `https://www.intellihealth.co.za/discovery-health/${slug}`;
            return {
                title,
                description,
                alternates: { canonical: canonicalUrl },
                openGraph: { title, description, url: canonicalUrl, type: 'article' }
            };
        }
    }

    // 2. Try Plan
    const plan = getPlanBySlug(SCHEME_SLUG, slug);
    if (plan) {
        const { plan_name, year } = plan.identity;
        const { main_member } = plan.premiums;
        const { annual_limit_unlimited, network_hospitals } = plan.hospital_benefits;

        const limitText = annual_limit_unlimited ? "Unlimited" : "Limited";
        const networkText = network_hospitals && network_hospitals.length > 0 ? network_hospitals[0] : "Any private hospital";

        const title = `${plan_name} ${year} Benefits & Contributions | Discovery Health`;
        const description = `Review ${plan_name} ${year} details. Features ${limitText.toLowerCase()} hospital cover at ${networkText}. Main member premium from R${main_member.toLocaleString()}/month.`;
        const canonicalUrl = `https://www.intellihealth.co.za/discovery-health/${slug}`;

        return {
            title,
            description,
            alternates: { canonical: canonicalUrl },
            openGraph: { title, description, url: canonicalUrl, type: 'website' }
        };
    }

    // 3. Try Procedure
    const procData = getProcedureForScheme(slug, SCHEME_SLUG);
    if (procData) {
        const { procedure_name, plans } = procData;
        const costs = plans.map(p => p.copayment);
        const minCost = Math.min(...costs);

        const title = `${procedure_name} Cost Guide (${SCHEME_NAME} 2026) | Compare Plans`;
        const description = `Complete guide to ${procedure_name} costs on ${SCHEME_NAME}. We analyzed ${plans.length} plans to find the best coverage. Co-payments start from R${minCost.toLocaleString()}.`;
        const canonicalUrl = `https://www.intellihealth.co.za/discovery-health/${slug}`;

        return {
            title,
            description,
            alternates: { canonical: canonicalUrl },
            openGraph: { title, description, url: canonicalUrl, type: 'article' }
        };
    }

    return { title: 'Not Found | Intellihealth' };
}

export default async function DispatcherPage({ params }: PageProps) {
    const { slug } = await params;

    // 1. Try Comparison
    const comparison = parseComparisonSlug(slug);
    if (comparison) {
        const result = getPlansForComparison(SCHEME_SLUG, comparison.planSlug1, comparison.planSlug2);
        if (result) {
            return <PlanComparisonView
                plan1={result.plan1}
                plan2={result.plan2}
                schemeSlug={SCHEME_SLUG}
            />;
        }
    }

    // 2. Is it a Plan?
    const plan = getPlanBySlug(SCHEME_SLUG, slug);
    if (plan) {
        return <PlanDetailView plan={plan} />;
    }

    // 3. Is it a Procedure?
    const procedure = getProcedureForScheme(slug, SCHEME_SLUG);
    if (procedure) {
        return <ProcedureHubView
            procedureName={procedure.procedure_name}
            plans={procedure.plans}
            schemeName={SCHEME_NAME}
            schemeSlug={SCHEME_SLUG}
            procedureSlug={slug}
        />;
    }

    // 4. Not Found
    notFound();
}
