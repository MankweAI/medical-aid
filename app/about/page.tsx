import { Code, Linkedin, Github, Terminal } from 'lucide-react';
import CloseButton from '@/components/CloseButton';

export const metadata = {
    title: 'About the Creator | HealthOS',
    description: 'Meet Mankwe Mokgabudi, the Data Analyst & Engineer behind the Virtual Actuary.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-20 px-6">
            <article className="max-w-3xl mx-auto bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100 relative">
                <CloseButton />

                {/* Header / Bio */}
                <header className="flex flex-col md:flex-row gap-8 items-center mb-12">
                    <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center text-4xl shadow-inner shrink-0">
                        👨‍💻
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">The Architect</p>
                        <h1 className="text-3xl font-black text-slate-900 mb-2">Mankwe Mokgabudi</h1>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
                            <Code className="w-3 h-3" /> Data Analyst & Software Engineer
                        </div>
                    </div>
                </header>

                {/* Mission Statement */}
                <section className="prose prose-slate prose-sm max-w-none mb-12">
                    <h3 className="font-bold text-slate-900">Why I Built HealthOS</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        "I built HealthOS to solve a problem I faced myself: Medical Aid jargon is designed to confuse.
                        By combining <strong>Actuarial Data Science</strong> with <strong>Modern Software Engineering</strong>,
                        I created this 'Virtual Actuary' to give South Africans an unfair advantage when negotiating their cover."
                    </p>
                    <p>
                        Unlike comparison sites that push "Sponsored" plans, this engine runs on raw data registered with the CMS.
                        If a plan has a hidden trap (like a State Hospital restriction), the code exposes it. No exceptions.
                    </p>
                </section>

                {/* Credentials / Social Proof */}
                <div className="grid md:grid-cols-2 gap-4 border-t border-slate-100 pt-8">
                    <a href="#" className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors group">
                        <div className="p-3 bg-white rounded-xl shadow-sm text-[#0077b5]">
                            <Linkedin className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm group-hover:text-blue-700">Connect on LinkedIn</p>
                            <p className="text-xs text-slate-500">View Professional History</p>
                        </div>
                    </a>

                    <a href="#" className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group">
                        <div className="p-3 bg-white rounded-xl shadow-sm text-slate-900">
                            <Github className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm">View Source Code</p>
                            <p className="text-xs text-slate-500">Audit the Algorithms</p>
                        </div>
                    </a>
                </div>

                {/* Tech Stack Badge (Developer Trust) */}
                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <Terminal className="w-3 h-3" />
                    Built with Next.js 15 & Supabase
                </div>

            </article>
        </main>
    );
}
