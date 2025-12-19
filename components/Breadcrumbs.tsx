'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { Persona } from '@/utils/persona';
import { getV2Slug } from '@/utils/slug-utils';

interface BreadcrumbsProps {
    persona: Persona;
}

/**
 * Semantic Breadcrumb Navigation Component
 * 
 * Structure: Home > [Category] > [Display Title]
 * 
 * SEO Features:
 * - BreadcrumbList JSON-LD schema for Google rich results
 * - Category links to /?category=X for filtered home view
 * - Proper aria-label for accessibility
 */
export default function Breadcrumbs({ persona }: BreadcrumbsProps) {
    const category = persona.meta.category;
    const displayTitle = persona.display_title || persona.meta.title;
    const v2Slug = getV2Slug(persona.slug);
    const currentUrl = `https://intellihealth.co.za/personas/${v2Slug}`;

    // BreadcrumbList JSON-LD Schema
    const breadcrumbSchema = {
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
                'item': currentUrl
            }
        ]
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Visual Breadcrumb Navigation */}
            <nav
                aria-label="Breadcrumb"
                className="mb-4"
            >
                <ol className="flex items-center flex-wrap gap-1 text-xs text-slate-500">
                    {/* Home */}
                    <li className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
                        >
                            <Home className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Home</span>
                        </Link>
                    </li>

                    <li className="flex items-center">
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 mx-1" />
                    </li>

                    {/* Category (links to filtered home view) */}
                    <li className="flex items-center">
                        <Link
                            href={`/?category=${encodeURIComponent(category)}`}
                            className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors font-medium"
                        >
                            {category}
                        </Link>
                    </li>

                    <li className="flex items-center">
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 mx-1" />
                    </li>

                    {/* Current Page (Display Title) */}
                    <li className="flex items-center">
                        <span
                            className="text-slate-700 font-semibold truncate max-w-[200px] sm:max-w-none"
                            aria-current="page"
                        >
                            {displayTitle}
                        </span>
                    </li>
                </ol>
            </nav>
        </>
    );
}
