import { Zap } from 'lucide-react';

export default function HeroSection() {
    return (
        <div className="text-center pt-16 pb-8 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-6">
                <Zap className="w-3 h-3 fill-current" />
                HealthOS v2.0 Active
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                Algorithmic Medical Aid Optimization.
            </h1>

            <p className="text-slate-500 text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
                Don't just buy insurance. Engineer your cover. Compare 2026 strategies based on actuarial logic, not marketing brochures.
            </p>
        </div>
    );
}
