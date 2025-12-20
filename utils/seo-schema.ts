// utils/seo-schema.ts
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
 * Generates WebPage JSON-LD schema with Insurance context
 * Replaces MedicalWebPage to emphasize financial/actuarial advice over clinical advice.
 */
export function generateInsuranceWebPageSchema(persona: Persona, canonicalUrl: string) {
    const name = persona.display_title || persona.meta.marketing_heading || persona.meta.title;
    const description = persona.human_insight || persona.actuarial_logic?.mathematical_basis || persona.meta.description;

    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': name,
        'description': description,
        'url': canonicalUrl,
        'lastReviewed': new Date().toISOString().split('T')[0],
        'mainEntity': {
            '@type': 'HealthInsurancePlan',
            'name': `Medical Aid Strategy for ${persona.meta.category} profiles`,
            'description': `Actuarial analysis and strategy for ${persona.meta.category} medical aid users.`
        },
        'about': {
            '@type': 'FinancialService',
            'name': 'Intellihealth Virtual Actuary'
        }
    };
}

/**
 * Generates BreadcrumbList JSON-LD schema
 */
export function generateBreadcrumbSchema(persona: Persona, canonicalUrl: string) {
    const category = persona.meta.category;
    const displayTitle = persona.display_title || persona.meta.title;

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://intellihealth.co.za/'
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': category,
                'item': `https://intellihealth.co.za/?category=${encodeURIComponent(category)}`
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': displayTitle,
                'item': canonicalUrl
            }
        ]
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

    schemas.push(generateInsuranceWebPageSchema(persona, canonicalUrl));
    schemas.push(generateProductSchema(plan, persona, canonicalUrl));
    schemas.push(generateBreadcrumbSchema(persona, canonicalUrl));

    return schemas;
}