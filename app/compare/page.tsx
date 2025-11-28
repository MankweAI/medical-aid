'use client';

// 1. Import `use` from react
import { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Baby, Pill, Zap } from 'lucide-react';
import clsx from 'clsx';

// --- MOCK DATA ---
const PLANS: Record<string, any> = {
    'bonstart-plus': {
        id: 'bonstart-plus',
        name: 'BonStart Plus',
        premium: 1800,
        savings: 0,
        risk: 5000,
        features: {
            hospital: { val: 'Private Network', status: 'good' },
            maternity: { val: 'Unlimited', status: 'good' },
            chronic: { val: 'Basic Formulary', status: 'neutral' },
            specialist: { val: 'Referral Needed', status: 'warning' }
        }
    },
    'classic-saver': {
        id: 'classic-saver',
        name: 'Classic Saver',
        premium: 3350,
        savings: 10452,
        risk: 2000,
        features: {
            hospital: { val: 'Any Private', status: 'good' },
            maternity: { val: 'Unlimited', status: 'good' },
            chronic: { val: 'R22k Limit', status: 'good' },
            specialist: { val: 'Direct Access', status: 'good' }
        }
    }
};

const SCENARIOS = [
    { id: 'general', label: 'General Overview', icon: Shield },
    { id: 'maternity', label: 'Having a Baby', icon: Baby },
    { id: 'chronic', label: 'Chronic Illness', icon: Pill },
];

// 2. Update Props Type to Promise
export default function ComparePage({ searchParams }: { searchParams: Promise<{ plans?: string }> }) {
    // 3. Unwrap the promise using `use()`
    const { plans } = use(searchParams);

    // 4. Use the unwrapped value
    const planIds = plans?.split(',') || [];

    // Safety: Ensure we have valid plans (Fallback to Mock if IDs missing)
    const planA = PLANS[planIds[0]] || PLANS['bonstart-plus'];
    const planB = PLANS[planIds[1]] || PLANS['classic-saver'];

    const [activeScenario, setActiveScenario] = useState('general');

    const getAnnualCost = (p: typeof planA) => p.premium * 12;

    return (
        <main className="min-h-screen bg-slate-50 pb-32">

            {/* Header & Navigation */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <Link href="/" className="p-2 -ml-2 text-slate-500 hover:text-slate-900 bg-slate-100 rounded-full">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Head-to-Head
                </h1>
                <div className="w-8" />
            </header>

            <div className="max-w-2xl mx-auto p-6 space-y-8">

                {/* LIABILITY BATTLE */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 text-center">
                        Annual Financial Impact
                    </h2>

                    <div className="space-y-8">
                        {[planA, planB].map((plan: any) => {
                            const annual = getAnnualCost(plan);
                            const savingsPct = (plan.savings / annual) * 100;

                            return (
                                <div key={plan.id}>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="font-black text-slate-900 text-lg">{plan.name}</span>
                                        <div className="text-right">
                                            <span className="block text-xs font-bold text-slate-400 uppercase">Fixed Cost</span>
                                            <span className="font-bold text-slate-900">R{annual.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex relative">
                                        <div className="h-full bg-slate-300 w-full" />
                                        {plan.savings > 0 && (
                                            <div
                                                className="h-full bg-emerald-500 absolute left-0 top-0 opacity-80"
                                                style={{ width: `${savingsPct}%` }}
                                            />
                                        )}
                                        <div
                                            className="h-full bg-rose-500 absolute right-0 top-0 opacity-40 border-l-2 border-white"
                                            style={{ width: `15%` }}
                                        />
                                    </div>

                                    <div className="flex justify-between mt-2 text-[10px] font-bold uppercase tracking-wider">
                                        <div className="flex items-center gap-1 text-emerald-600">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            Savings: R{plan.savings.toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1 text-rose-500">
                                            <div className="w-2 h-2 rounded-full bg-rose-500 opacity-50" />
                                            Risk Exposure
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* SCENARIO SELECTOR */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {SCENARIOS.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setActiveScenario(s.id)}
                            className={clsx(
                                "flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all border shrink-0",
                                activeScenario === s.id
                                    ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20"
                                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                            )}
                        >
                            <s.icon className="w-4 h-4" />
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* COMPARISON GRID */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-100 p-4">
                        <div className="col-span-1" />
                        <div className="col-span-1 text-center font-bold text-xs text-slate-900">{planA.name}</div>
                        <div className="col-span-1 text-center font-bold text-xs text-slate-900">{planB.name}</div>
                    </div>

                    <div className="divide-y divide-slate-50">
                        <Row
                            label="Hospitals"
                            valA={planA.features.hospital.val}
                            valB={planB.features.hospital.val}
                            highlightDiff
                        />
                        <Row
                            label="Maternity"
                            valA={planA.features.maternity.val}
                            valB={planB.features.maternity.val}
                        />
                        {activeScenario === 'chronic' && (
                            <Row
                                label="Chronic Meds"
                                valA={planA.features.chronic.val}
                                valB={planB.features.chronic.val}
                                highlightDiff
                            />
                        )}
                        <Row
                            label="Specialists"
                            valA={planA.features.specialist.val}
                            valB={planB.features.specialist.val}
                            highlightDiff
                        />
                    </div>
                </div>

                {/* VERDICT */}
                <div className="bg-blue-50 border border-blue-100 p-5 rounded-3xl flex gap-4">
                    <div className="bg-white p-3 rounded-full h-fit shadow-sm">
                        <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-blue-900 text-sm mb-2">The Virtual Actuary Verdict</h3>
                        <p className="text-xs text-blue-800 leading-relaxed">
                            If you can afford the extra <strong>R{(planB.premium - planA.premium).toLocaleString()}</strong> per month,
                            <strong> {planB.name}</strong> is the safer choice because it allows you to use
                            any private hospital and avoids the {planA.features.specialist.val} restriction.
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}

function Row({ label, valA, valB, highlightDiff }: { label: string, valA: string, valB: string, highlightDiff?: boolean }) {
    const isDifferent = valA !== valB;
    const opacity = !highlightDiff || isDifferent ? "opacity-100" : "opacity-40 grayscale";

    return (
        <div className={clsx("grid grid-cols-3 p-4 items-center text-xs", opacity)}>
            <div className="font-bold text-slate-400 uppercase">{label}</div>
            <div className={clsx("text-center font-medium", isDifferent && highlightDiff ? "text-slate-900" : "text-slate-500")}>
                {valA}
            </div>
            <div className={clsx("text-center font-medium", isDifferent && highlightDiff ? "text-slate-900" : "text-slate-500")}>
                {valB}
            </div>
        </div>
    );
}