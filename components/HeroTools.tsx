'use client';

// A. The Gap Gauge (For Chronic Users)
export const GapGauge = ({ financial }: { financial: { savings: { annualAllocation: number } } }) => {
    // Logic: Calculate depletion based on a simulated chronic spend of R1,500pm
    const monthlyClaim = 1500;
    const annualAllocation = financial?.savings?.annualAllocation || 0;
    const msaDepletionMonth = annualAllocation > 0
        ? Math.min(12, Math.floor(annualAllocation / monthlyClaim))
        : 0;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Safety check for array index
    const depletionIndex = Math.max(0, Math.min(11, msaDepletionMonth - 1));

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-6">
            <h4 className="font-bold text-slate-900 mb-4 flex justify-between items-center">
                <span className="flex items-center gap-2">🛡️ Gap Gauge</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Based on R1,500/pm meds</span>
            </h4>

            <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden mb-3">
                {/* Safe Zone (MSA) */}
                <div
                    className="absolute h-full bg-emerald-500 transition-all duration-1000 ease-out"
                    style={{ width: `${(msaDepletionMonth / 12) * 100}%` }}
                />
                {/* Danger Zone (SPG) */}
                <div
                    className="absolute h-full bg-rose-400 opacity-20"
                    style={{ left: `${(msaDepletionMonth / 12) * 100}%`, width: `${(12 - msaDepletionMonth) * (100 / 12)}%` }}
                />
            </div>

            <div className="flex justify-between text-xs font-bold">
                <span className="text-emerald-600">Jan: Covered</span>
                <span className={msaDepletionMonth < 12 ? "text-rose-500" : "text-emerald-600"}>
                    {msaDepletionMonth < 12 ? `Funds run out in ${months[depletionIndex]}` : "Full Year Cover"}
                </span>
            </div>
        </div>
    );
};

// B. The Income Slider (For Budget Users)
export const IncomeSlider = ({ income, setIncome }: { income: number, setIncome: (v: number) => void }) => {
    return (
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl shadow-slate-900/10 mb-6 active-press">
            <h4 className="font-bold text-white mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
                💸 Income Adjuster
            </h4>

            <input
                type="range"
                min="0"
                max="80000"
                step="500"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />

            <div className="mt-6 flex justify-between items-end">
                <div>
                    <span className="text-xs text-slate-400 block mb-1">Monthly Household Income</span>
                    <span className="text-3xl font-black text-white" suppressHydrationWarning>R{income.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};