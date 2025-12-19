import Link from 'next/link';
import { Persona } from '@/utils/persona';
import { getV2Slug } from '@/utils/slug-utils';
import { ArrowRight, Users } from 'lucide-react';

interface RelatedPersonasProps {
    currentPersona: Persona;
    allPersonas: Persona[];
    maxItems?: number;
}

/**
 * Finds related personas by matching category or hero_image_tag
 */
function findRelatedPersonas(current: Persona, all: Persona[], max: number): Persona[] {
    const related: Persona[] = [];

    // First priority: same category (excluding current)
    const sameCategory = all.filter(
        p => p.slug !== current.slug && p.meta.category === current.meta.category
    );
    related.push(...sameCategory.slice(0, max));

    // Second priority: same hero_image_tag
    if (related.length < max && current.hero_image_tag) {
        const sameImage = all.filter(
            p => p.slug !== current.slug &&
                p.hero_image_tag === current.hero_image_tag &&
                !related.includes(p)
        );
        related.push(...sameImage.slice(0, max - related.length));
    }

    // Third priority: compatible categories
    const compatibilityMap: Record<string, string[]> = {
        'Chronic': ['Senior', 'Family'],
        'Senior': ['Chronic', 'Budget'],
        'Family': ['Maternity', 'Savings'],
        'Maternity': ['Family'],
        'Budget': ['Student', 'Savings'],
        'Student': ['Budget'],
        'Savings': ['Family', 'Budget']
    };

    if (related.length < max) {
        const compatibleCategories = compatibilityMap[current.meta.category] || [];
        const compatible = all.filter(
            p => p.slug !== current.slug &&
                compatibleCategories.includes(p.meta.category) &&
                !related.includes(p)
        );
        related.push(...compatible.slice(0, max - related.length));
    }

    return related.slice(0, max);
}

export default function RelatedPersonas({ currentPersona, allPersonas, maxItems = 4 }: RelatedPersonasProps) {
    const relatedPersonas = findRelatedPersonas(currentPersona, allPersonas, maxItems);

    if (relatedPersonas.length === 0) return null;

    return (
        <div className="mt-8 px-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-emerald-50 p-2 rounded-lg">
                        <Users className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Related Strategies</h3>
                </div>

                <div className="grid gap-3">
                    {relatedPersonas.map((persona) => (
                        <Link
                            key={persona.slug}
                            href={`/personas/${getV2Slug(persona.slug)}`}
                            className="group flex items-center justify-between p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors"
                        >
                            <div className="min-w-0">
                                {/* SEO: Using display_title as anchor text */}
                                <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors block truncate">
                                    {persona.display_title || persona.meta.title}
                                </span>
                                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                                    {persona.meta.category}
                                </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
