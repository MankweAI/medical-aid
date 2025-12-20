// app/personas/[slug]/page.tsx
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

function getSmartPivot(currentPlan: Plan, currentPersona: Persona, allPlans: Plan[], allPersonas: Persona[]): Pivots {
    const findBestPersona = (targetPlanId: string) => {
        const candidates = allPersonas.filter(p => p.actuarial_logic?.target_plan_id === targetPlanId);
        const exact = candidates.find(p => p.meta.category === currentPersona.meta.category);
        if (exact) return exact;
        const allowedCategories = COMPATIBILITY_MAP[currentPersona.meta.category] || [];
        const compatible = candidates.find(p => allowedCategories.includes(p.meta.category));
        if (compatible) return compatible;
        return candidates.length > 0 ? candidates[0] : null;
    };

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

    const validLadder = calculatedLadder.filter(item =>
        item.plan.id !== currentPlan.id &&
        item.linkedPersona !== null
    );

    validLadder.sort((a, b) => a.realCost - b.realCost);

    const currentCost = PricingEngine.calculateProfile(
        currentPlan.contributions[0],
        currentPersona.defaults.family_composition,
        currentPersona.defaults.income
    ).monthlyPremium;

    let insertionIndex = validLadder.findIndex(item => item.realCost >= currentCost);
    if (insertionIndex === -1) insertionIndex = validLadder.length;

    const cheaperOption = insertionIndex > 0 ? validLadder[insertionIndex - 1] : null;
    const richerOption = insertionIndex < validLadder.length ? validLadder[insertionIndex] : null;

    return {
        cheaper: cheaperOption ? { plan: cheaperOption.plan, persona: cheaperOption.linkedPersona! } : null,
        richer: richerOption ? { plan: richerOption.plan, persona: richerOption.linkedPersona! } : null
    };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const allPersonas = await getPersonas();
    const persona = resolvePersona(params.slug, allPersonas);

    if (!persona) return { title: 'Not Found | Intellihealth' };

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
                'name': `Intellihealth Strategy: ${persona.meta.title}`,
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

export default async function PersonaPage(props: Props) {
    const params = await props.params;
    const { slug } = params;

    const [allPersonas, allPlans] = await Promise.all([
        getPersonas(),
        getPlans()
    ]);

    const persona = resolvePersona(slug, allPersonas);
    if (!persona) notFound();

    const targetId = persona.actuarial_logic?.target_plan_id;
    let plan: Plan | undefined;

    if (targetId) {
        plan = allPlans.find(p => p.id === targetId);
    }

    let pivots: Pivots = { cheaper: null, richer: null };
    if (plan) {
        pivots = getSmartPivot(plan, persona, allPlans, allPersonas);
    }

    const trustMessages = [
        `${persona.meta.title} strategy verified`,
        `Covering ${persona.defaults.family_composition.adult + persona.defaults.family_composition.child} family members`,
        '2026 rates applied'
    ];

    const isClinicalFirst = persona.ui_priority === 'Clinical_First';
    const canonicalUrl = `https://intellihealth.co.za/personas/${getV2Slug(persona.slug)}`;
    const schemas = plan ? generateAllSchemas(plan, persona, canonicalUrl) : [];

    return (
        <main className="min-h-screen bg-slate-50/50 pb-32 relative overflow-hidden animate-page-enter">
            {schemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}

            <AppHeader />

            <section className="relative z-10 pt-16 px-4 sm:px-6 pb-2">
                <Breadcrumbs persona={persona} />
                <WelcomeStatement persona={persona} />
                {isClinicalFirst && (
                    <div className="mb-4">
                        <TrustTicker messages={trustMessages} />
                    </div>
                )}
                <ControlPanel />
            </section>

            <section className="relative z-10 max-w-2xl mx-auto">
                {plan && <SinglePlanHero persona={persona} plan={plan} />}
                {plan && (
                    <div className="px-4 pb-8">
                        <StrategyFooter plan={plan} persona={persona} pivots={pivots} allPersonas={allPersonas} />
                    </div>
                )}
                {!isClinicalFirst && (
                    <div className="px-4 pb-4">
                        <TrustTicker messages={trustMessages} />
                    </div>
                )}
            </section>
        </main>
    );
}