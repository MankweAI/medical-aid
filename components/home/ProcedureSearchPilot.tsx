import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';

export default function ProcedureSearchPilot() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Dark abstract background */}
            <div className="absolute inset-0 bg-slate-900">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-900/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
            </div>

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
                            How much does it <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                                really cost?
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Stop guessing. We've decoded the fine print for common procedures to show you the exact co-payments across different plans.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/discovery-health/gastroscopy"
                                className="inline-flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-emerald-500/50 transition-all group"
                            >
                                <span className="text-slate-200 font-medium mr-4">Gastroscopy</span>
                                <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/discovery-health/cataract-surgery"
                                className="inline-flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-emerald-500/50 transition-all group"
                            >
                                <span className="text-slate-200 font-medium mr-4">Cataract Surgery</span>
                                <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 relative">
                        <div className="absolute -top-4 -right-4 bg-emerald-500 text-emerald-950 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                            Real Database
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                    <Search className="w-5 h-5" />
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full w-full max-w-[200px]" />
                            </div>

                            <div className="space-y-3">
                                <div className="h-16 bg-slate-800/50 rounded-xl w-full" />
                                <div className="h-16 bg-slate-800/50 rounded-xl w-full" />
                                <div className="h-16 bg-slate-800/50 rounded-xl w-full" />
                            </div>

                            <div className="pt-6 border-t border-white/5 text-center">
                                <Link
                                    href="/discovery-health"
                                    className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors inline-flex items-center gap-2"
                                >
                                    Browse Procedure Guide <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
