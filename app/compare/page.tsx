import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, X, Info } from 'lucide-react';
// import { calculateMonthlyPremium } from '@/utils/calculation'; // Ensure this exists from Phase 2

export default async function ComparePage({
    searchParams,
}: {
    searchParams: { plans?: string; income?: string }
}) {
    const planIds = searchParams.plans?.split(',') || [];
    const income = parseInt(searchParams.income || '20000');

    if (planIds.length < 2) {
        redirect('/'); // Redirect home if not enough plans to compare
    }

    // 1. Fetch Data
    // const supabase = createClient();
    // const { data: plans } = await supabase
    //   .from('plans')
    //   .select('*, contributions(*), benefits(*)')
    //   .in('id', planIds);

    // MOCK DATA (Replace with Supabase Fetch above)
    const plans = [
        {
            id: 'bonstart-plus',
            name: 'BonStart Plus',
            network_restriction: 'Network',
            contributions: [{ pricing_model: 'Fixed', pricing_matrix: { main: 1603 } }],
            benefits: [
                { category: 'Hospitalization', display_text: 'Unlimited at Network Hospitals' },
                { category: 'GP Visits', display_text: 'Unlimited (Network Only)' }
            ]
        },
        {
            id: 'classic-saver',
            name: 'Classic Saver',
            network_restriction: 'Any',
            contributions: [{ pricing_model: 'Fixed', pricing_matrix: { main: 3350 } }],
            benefits: [
                { category: 'Hospitalization', display_text: 'Unlimited at Any Private Hospital' },
                { category: 'GP Visits', display_text: 'Paid from Savings (R12,000)' }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <Link href="/" className="p-2 -ml-2 text-slate-500 hover:text-slate-900">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Comparing {plans.length} Plans
                </h1>
                <div className="w-5" /> {/* Spacer */}
            </header>

            {/* Comparison Grid */}
            <div className="overflow-x-auto no-scrollbar">
                <div className="min-w-max p-6">
                    <div className="grid grid-cols-[140px_repeat(2,minmax(240px,1fr))] gap-4">

                        {/* Row 1: Plan Headers */}
                        <div className="pt-4">
                            <span className="text-xs font-bold text-slate-400 uppercase">Plan Name</span>
                        </div>
                        {plans.map(plan => (
                            <div key={plan.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 w-max px-2 py-1 rounded-md">
                                    {plan.network_restriction === 'Network' ? 'Network Plan' : 'Any Hospital'}
                                </span>
                                <h2 className="text-xl font-black text-slate-900">{plan.name}</h2>
                                {/* Use the Calculator Engine here */}
                                {/* <p className="text-2xl font-light text-slate-600">R{calculateMonthlyPremium(plan.contributions[0], income, {main:1, adults:0, children:0})}</p> */}
                                <p className="text-2xl font-light text-slate-600">R{plan.contributions[0].pricing_matrix.main}</p>
                            </div>
                        ))}

                        {/* Row 2: Hospital Cover */}
                        <div className="py-4 border-b border-slate-100">
                            <span className="font-bold text-slate-900 text-sm">Hospitals</span>
                        </div>
                        {plans.map(plan => (
                            <div key={plan.id} className="py-4 border-b border-slate-100 text-sm text-slate-600 leading-relaxed">
                                {plan.benefits.find(b => b.category === 'Hospitalization')?.display_text}
                            </div>
                        ))}

                        {/* Row 3: Day-to-Day */}
                        <div className="py-4 border-b border-slate-100">
                            <span className="font-bold text-slate-900 text-sm">GP Visits</span>
                        </div>
                        {plans.map(plan => (
                            <div key={plan.id} className="py-4 border-b border-slate-100 text-sm text-slate-600 leading-relaxed flex items-start gap-2">
                                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                {plan.benefits.find(b => b.category === 'GP Visits')?.display_text}
                            </div>
                        ))}

                        {/* CTA Row */}
                        <div className="pt-6"></div>
                        {plans.map(plan => (
                            <div key={plan.id} className="pt-4">
                                <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-900/10 active:scale-95 transition-all">
                                    Select Plan
                                </button>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </main>
    );
}
