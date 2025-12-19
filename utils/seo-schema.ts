import { Plan } from '@/utils/types';
import { Persona } from '@/utils/persona';
import { ContentGenerator } from '@/utils/seo-content';

/**
 * Generates FAQPage JSON-LD schema
 */
export function generateFAQSchema(plan: Plan, persona: Persona) {
    const faqs = ContentGenerator.generateFAQ(plan, persona);

    if (!faqs || faqs.length === 0) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer
            }
        }))
    };
}

/**
 * Generates MedicalWebPage JSON-LD schema
 */
export function generateMedicalWebPageSchema(persona: Persona, canonicalUrl: string) {
    // Use V2 fields with fallbacks
    const name = persona.display_title || persona.meta.marketing_heading || persona.meta.title;
    const description = persona.human_insight || persona.actuarial_logic?.mathematical_basis || persona.meta.description;

    // Map category to MedicalAudience
    const audienceMap: Record<string, string> = {
        'Chronic': 'Patient',
        'Senior': 'Patient',
        'Family': 'Patient',
        'Maternity': 'Patient',
        'Budget': 'Patient',
        'Student': 'Patient',
        'Savings': 'Patient'
    };

    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        'name': name,
        'description': description,
        'url': canonicalUrl,
        'lastReviewed': new Date().toISOString().split('T')[0],
        'audience': {
            '@type': 'MedicalAudience',
            'audienceType': audienceMap[persona.meta.category] || 'Patient'
        },
        'specialty': 'PublicHealth',
        'about': {
            '@type': 'HealthInsurancePlan',
            'name': `Medical Aid Strategy for ${persona.meta.category} profiles`
        }
    };
}

/**
 * Generates Product/Offer JSON-LD schema for the recommended plan
 */
export function generateProductSchema(plan: Plan, persona: Persona, canonicalUrl: string) {
    const productName = plan.identity.plan_name;
    const description = `${plan.identity.scheme_name} ${plan.identity.plan_name} - ${plan.identity.plan_type}. ${persona.human_insight || persona.meta.description}`;

    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': productName,
        'description': description,
        'brand': {
            '@type': 'Brand',
            'name': plan.identity.scheme_name
        },
        'offers': {
            '@type': 'Offer',
            'price': plan.price || 0,
            'priceCurrency': 'ZAR',
            'availability': 'https://schema.org/InStock',
            'priceValidUntil': '2026-12-31',
            'url': canonicalUrl
        },
        'category': 'Health Insurance'
    };
}

/**
 * Combines all schemas into a single array for injection
 */
export function generateAllSchemas(plan: Plan, persona: Persona, canonicalUrl: string) {
    const schemas = [];

    const faqSchema = generateFAQSchema(plan, persona);
    if (faqSchema) schemas.push(faqSchema);

    schemas.push(generateMedicalWebPageSchema(persona, canonicalUrl));
    schemas.push(generateProductSchema(plan, persona, canonicalUrl));

    return schemas;
}
