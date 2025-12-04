'use client';

interface Props {
    title: string;
    description?: string;
}

export default function WelcomeStatement({ title, description }: Props) {
    return (
        <div className="mb-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Virtual Actuary Analysis
            </p>
            <h1 className="text-3xl md:text-4xl font-light text-slate-900 leading-tight">
                {title}
            </h1>
            {description && (
                <p className="text-slate-500 mt-4 max-w-2xl leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
}
