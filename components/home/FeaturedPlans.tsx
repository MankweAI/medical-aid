import Link from 'next/link';
import { getAllPlans } from '@/lib/data-loader';
import { Shield, ChevronRight, Check } from 'lucide-react';

export default function FeaturedPlans() {
    const plans = getAllPlans();

    // Select a few diverse plans to feature
    // We want a mix of Comprehensive, Saver, and KeyCare to show range
    const featuredSlugs = [
        'classic-comprehensive-2026', // Premium
        'classic-saver',              // Balanced
        'keycare-plus',               // Entry
        'executive-plan'              // Top Tier
    ];

    const featuredPlans = plans.filter(p => featuredSlugs.includes(p.identity.plan_slug));

    // Sort to match the preferred order
    const sortedPlans = featuredPlans.sort((a, b) => {
        return featuredSlugs.indexOf(a.identity.plan_slug) - featuredSlugs.indexOf(b.identity.plan_slug);
    });

    return (
        <section className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        Featured 2026 Plans
                    </h2>
                    <p className="text-slate-500 leading-relaxed">
                        Explore some of the most popular medical aid options for the upcoming year.
                        From comprehensive cover to value-focused network plans.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sortedPlans.map((plan) => (
                        <Link
                            key={plan.identity.plan_slug}
                            href={`/discovery-health/${plan.identity.plan_slug}`}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-200 transition-all group flex flex-col h-full"
                        >
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                                    {plan.identity.year} Series
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                                    {plan.identity.plan_name}
                                </h3>
                                <p className="text-2xl font-black text-slate-900">
                                    R{plan.premiums.main_member.toLocaleString()}
                                    <span className="text-sm font-medium text-slate-400 ml-1">/pm</span>
                                </p>
                            </div>

                            <div className="space-y-3 mb-6 flex-grow">
                                <div className="flex items-start gap-2 text-sm text-slate-600">
                                    <Shield className="w-4 h-4 text-emerald-500 mt-0.5" />
                                    <span>
                                        {plan.hospital_benefits.annual_limit_unlimited
                                            ? "Unlimited Hospital Cover"
                                            : `R${plan.hospital_benefits.annual_limit?.toLocaleString()} Annual Limit`}
                                    </span>
                                </div>
                                <div className="flex items-start gap-2 text-sm text-slate-600">
                                    <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                                    <span>
                                        {plan.hospital_benefits.network_hospitals
                                            ? plan.hospital_benefits.network_hospitals[0]
                                            : "Any Private Hospital"}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-sm font-bold text-emerald-600">
                                <span>View Details</span>
                                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/discovery-health"
                        className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                    >
                        View all 20+ plans <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
