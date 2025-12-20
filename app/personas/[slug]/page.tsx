import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WelcomeStatement from '@/components/WelcomeStatement';
import ControlPanel from '@/components/ControlPanel';
import SinglePlanHero from '@/components/SinglePlanHero';
import StrategyFooter from '@/components/StrategyFooter';
import AppHeader from '@/components/AppHeader';
import TrustTicker from '@/components/TrustTicker';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getPersonas, getPersonaBySlug, getPlans, getPlanById } from '@/utils/db';
import { Persona } from '@/utils/persona';
import { Plan } from '@/utils/types';
import { PricingEngine } from '@/utils/engine';
import { getV2Slug, resolvePersona } from '@/utils/slug-utils';
import { generateAllSchemas } from '@/utils/seo-schema';

// Define the shape of our pivot data here or import from StrategyFooter if exported
interface PivotItem {
    plan: Plan;
    persona: Persona;
}

interface Pivots {
    cheaper: PivotItem | null;
    richer: PivotItem | null;
}

type Props = {
    params: Promise<{ slug: string }>;
};

// COMPATIBILITY MATRIX 
const COMPATIBILITY_MAP: Record<string, string[]> = {
    'Student': ['Budget', 'Savings', 'Family'],
    'Family': ['Maternity', 'Savings', 'Budget', 'Student'],
    'Savings': ['Family', 'Budget', 'Student'],
    'Maternity': ['Family'],
    'Chronic': ['Senior', 'Comprehensive'],
    'Senior': ['Chronic', 'Comprehensive'],
    'Budget': ['Student', 'Family', 'Savings']
};

// Logic to find upsell/downsell options
function getSmartPivot(currentPlan: Plan, currentPersona: Persona, allPlans: Plan[], allPersonas: Persona[]): Pivots {

    // Helper: Find best persona for a plan ID
    const findBestPersona = (targetPlanId: string) => {
        const candidates = allPersonas.filter(p => p.actuarial_logic?.target_plan_id === targetPlanId);

        // 1. Exact Category Match
        const exact = candidates.find(p => p.meta.category === currentPersona.meta.category);
        if (exact) return exact;

        // 2. Compatible Match
        const allowedCategories = COMPATIBILITY_MAP[currentPersona.meta.category] || [];
        const compatible = candidates.find(p => allowedCategories.includes(p.meta.category));
        if (compatible) return compatible;

        // 3. Any Match
        return candidates.length > 0 ? candidates[0] : null;
    };

    // Calculate Real-World Cost for sorting
    const calculatedLadder = allPlans.map(p => {
        const financials = PricingEngine.calculateProfile(
            p.contributions[0],
            currentPersona.defaults.family_composition,
            currentPersona.defaults.income
        );
        return {
            plan: p,
            realCost: financials.monthlyPremium,
            linkedPersona: findBestPersona(p.id)
        };
    });

    // Filter Invalid Candidates
    const validLadder = calculatedLadder.filter(item =>
        item.plan.id !== currentPlan.id &&
        item.linkedPersona !== null // Must have a persona to link to
    );

    // Sort by Price
    validLadder.sort((a, b) => a.realCost - b.realCost);

    // Find Pivot Points relative to current plan's cost
    const currentCost = PricingEngine.calculateProfile(
        currentPlan.contributions[0],
        currentPersona.defaults.family_composition,
        currentPersona.defaults.income
    ).monthlyPremium;

    // Find where the current plan fits in the ladder
    let insertionIndex = validLadder.findIndex(item => item.realCost >= currentCost);
    if (insertionIndex === -1) insertionIndex = validLadder.length;

    const cheaperOption = insertionIndex > 0 ? validLadder[insertionIndex - 1] : null;
    const richerOption = insertionIndex < validLadder.length ? validLadder[insertionIndex] : null;

    return {
        cheaper: cheaperOption ? { plan: cheaperOption.plan, persona: cheaperOption.linkedPersona! } : null,
        richer: richerOption ? { plan: richerOption.plan, persona: richerOption.linkedPersona! } : null
    };
}

// 1. DYNAMIC METADATA
export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;

    // Fetch all personas to resolve by V1 or V2 slug
    const allPersonas = await getPersonas();
    const persona = resolvePersona(params.slug, allPersonas);

    if (!persona) return { title: 'Not Found | Intellihealth' };

    // Always use V2 slug for canonical URL
    const canonicalSlug = getV2Slug(persona.slug);

    return {
        title: `${persona.meta.title} | 2026 Strategy`,
        description: persona.meta.description,
        alternates: {
            canonical: `https://intellihealth.co.za/personas/${canonicalSlug}`,
        },
        other: {
            'script:ld+json': JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FinanceApplication',
                'name': `Intellihealth Calculator: ${persona.meta.title}`,
                'applicationCategory': 'Finance',
                'operatingSystem': 'Web',
                'offers': {
                    '@type': 'Offer',
                    'price': '0',
                    'priceCurrency': 'ZAR'
                }
            })
        }
    };
}

// 2. PAGE COMPONENT
export default async function PersonaPage(props: Props) {
    const params = await props.params;
    const { slug } = params;

    // Fetch all data from database
    const [allPersonas, allPlans] = await Promise.all([
        getPersonas(),
        getPlans()
    ]);

    // Resolve persona by V1 or V2 slug (supports both URL formats)
    const persona = resolvePersona(slug, allPersonas);

    if (!persona) notFound();

    // Fetch Target Plan from database
    const targetId = persona.actuarial_logic?.target_plan_id;
    let plan: Plan | undefined;

    if (targetId) {
        plan = allPlans.find(p => p.id === targetId);
    }

    // Calculate Pivots if plan exists
    // Explicitly typed as Pivots so it accepts non-null values later
    let pivots: Pivots = { cheaper: null, richer: null };

    if (plan) {
        // Use database data for all plans and personas
        pivots = getSmartPivot(plan, persona, allPlans, allPersonas);
    }

    // Trust messages for the ticker
    const trustMessages = [
        `${persona.meta.title} strategy verified`,
        `Covering ${persona.defaults.family_composition.adult + persona.defaults.family_composition.child} family members`,
        '2026 rates applied'
    ];

    const isClinicalFirst = persona.ui_priority === 'Clinical_First';

    // Generate canonical URL for schemas
    const canonicalUrl = `https://intellihealth.co.za/personas/${getV2Slug(persona.slug)}`;

    // Generate JSON-LD schemas
    const schemas = plan ? generateAllSchemas(plan, persona, canonicalUrl) : [];

    return (
        <main className="min-h-screen bg-slate-50/50 pb-32 relative overflow-hidden animate-page-enter">
            {/* JSON-LD Structured Data */}
            {schemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}

            <AppHeader />

            <section className="relative z-10 pt-16 px-4 sm:px-6 pb-2">
                {/* Semantic Breadcrumb Navigation */}
                <Breadcrumbs persona={persona} />

                <WelcomeStatement persona={persona} />

                {/* TrustTicker appears high for Clinical personas */}
                {isClinicalFirst && (
                    <div className="mb-4">
                        <TrustTicker messages={trustMessages} />
                    </div>
                )}

                <ControlPanel />
            </section>

            {/* THE ONE TRUE ANSWER */}
            <section className="relative z-10 max-w-2xl mx-auto">
                {plan && <SinglePlanHero persona={persona} plan={plan} />}

                {/* THE ACTUARIAL FOOTNOTES */}
                {plan && (
                    <div className="px-4 pb-8">
                        <StrategyFooter plan={plan} persona={persona} pivots={pivots} allPersonas={allPersonas} />
                    </div>
                )}

                {/* TrustTicker appears lower for Budget personas */}
                {!isClinicalFirst && (
                    <div className="px-4 pb-4">
                        <TrustTicker messages={trustMessages} />
                    </div>
                )}


            </section>
        </main>
    );
}