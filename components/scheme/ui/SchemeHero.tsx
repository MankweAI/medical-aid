import { formatCurrency } from '@/lib/utils'; // Add import

interface SchemeHeroProps {
    title: string;
    subtitle: string;
    kicker: string;
    premium?: number;
    networkStatus?: React.ReactNode;
    children?: React.ReactNode;
}

export function SchemeHero({ title, subtitle, kicker, premium, networkStatus, children }: SchemeHeroProps) {
    return (
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest">
                        {kicker}
                    </p>

                </div>

                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-slate-500 font-medium mb-6">
                        {subtitle}
                    </p>
                )}

                {children && (
                    <div className="mt-6">
                        {children}
                    </div>
                )}
            </div>
            {premium && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    Premium: R{formatCurrency(premium)}
                </span>
            )}
            {networkStatus}
        </div>
    );
}
