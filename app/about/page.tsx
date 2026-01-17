import { Database, Terminal, ShieldCheck, ArrowRight, Server, Globe } from 'lucide-react';
import CloseButton from '@/components/CloseButton';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About Big Data Query | Intellihealth',
    description: 'Intellihealth is a product of Big Data Query, a software engineering firm dedicated to solving information asymmetry through algorithmic data analysis.',
    openGraph: {
        title: 'Big Data Query',
        description: 'Building Intelligence for the Information Age.',
        type: 'website',
        url: 'http://www.bigdataquery.co.za',
    }
};

export default function AboutPage() {
    // SEO: Structured Data for "Organization"
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Big Data Query',
        url: 'http://www.bigdataquery.co.za',
        logo: 'https://intellihealth.co.za/images/bdq-logo.png',
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'hello@bigdataquery.co.za',
            contactType: 'customer support'
        },
        description: 'Software engineering firm specializing in actuarial data analysis and consumer empowerment tools.'
    };

    return (
        <main className="min-h-screen bg-slate-50/50 py-20 px-4 sm:px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article className="max-w-3xl mx-auto bg-white rounded-[32px] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                <CloseButton />

                {/* DECORATIVE BACKGROUND ELEMENT */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

                {/* HERO SECTION */}
                <header className="flex flex-col md:flex-row gap-8 items-center mb-12 relative z-10">
                    <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 relative shrink-0">
                            <Database className="w-10 h-10 text-emerald-600" />
                        </div>
                    </div>

                    <div className="text-center md:text-left space-y-3">
                        <div>
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">
                                The Creator
                            </p>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                                Big Data Query
                            </h1>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-[11px] font-bold text-slate-600 border border-slate-200">
                                <Terminal className="w-3 h-3" /> Data Engineering
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-lg text-[11px] font-bold text-emerald-700 border border-emerald-100">
                                <Server className="w-3 h-3" /> Algorithmic Analysis
                            </span>
                        </div>
                    </div>
                </header>

                {/* THE MISSION */}
                <section className="prose prose-slate prose-sm md:prose-base max-w-none mb-12 relative z-10">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        Solving Information Asymmetry
                    </h2>

                    <div className="pl-4 border-l-2 border-emerald-500/30 italic text-slate-600 text-lg leading-relaxed my-6">
                        "Intellihealth is a flagship product of Big Data Query, built to decode the complexity of the South African medical aid market using raw actuarial data."
                    </div>

                    <p className="text-slate-500">
                        Big Data Query is a specialized software engineering firm building tools that translate complex datasets into actionable consumer intelligence.
                        We believe that when data is transparent, consumers make better financial decisions.
                    </p>

                    <p className="text-slate-500">
                        Our "Virtual Actuary" engine is powered by independent data registered with the <strong>Council for Medical Schemes (CMS)</strong>.
                        It operates without surveyor bias or sponsored influence, ensuring that every recommendation is mathematically optimized for your specific risk profile.
                    </p>
                </section>

                {/* CTA / LINKS */}
                <div className="grid md:grid-cols-2 gap-4 border-t border-slate-100 pt-8 relative z-10">
                    {/* Website Link */}
                    <a
                        href="http://www.bigdataquery.co.za"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-emerald-50 hover:border-emerald-200 border border-transparent transition-all group"
                    >
                        <div className="p-3 bg-white rounded-xl shadow-sm text-emerald-600 border border-slate-100 group-hover:scale-110 transition-transform">
                            <Globe className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">Visit Corporate Website</p>
                            <p className="text-xs text-slate-500">www.bigdataquery.co.za</p>
                        </div>
                    </a>

                    {/* Methodology Link (Internal) */}
                    <Link
                        href="/methodology"
                        className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 border border-transparent transition-all group"
                    >
                        <div className="p-3 bg-white rounded-xl shadow-sm text-slate-900 border border-slate-100 group-hover:scale-110 transition-transform">
                            <Termina className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm">View Methodology</p>
                            <p className="text-xs text-slate-500">How our algorithms work</p>
                        </div>
                    </Link>
                </div>

                {/* TECH FOOTER */}
                <div className="mt-8 text-center space-y-2">
                    <p className="text-[10px] text-slate-400">
                        Need assistance? Email us at <a href="mailto:hello@bigdataquery.co.za" className="hover:text-emerald-600 font-bold">hello@bigdataquery.co.za</a>
                    </p>
                    <div className="flex items-center justify-center gap-2 text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider opacity-60">
                        <span>© {new Date().getFullYear()} Big Data Query (Pty) Ltd</span>
                    </div>
                </div>

            </article>
        </main>
    );
}

// Fix typo in icon name (Termina -> Terminal)
function Termina(props: any) { return <Terminal {...props} /> }