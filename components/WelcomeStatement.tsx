'use client';

interface Props {
    personaSlug: string;
}

const PERSONA_COPY: Record<string, { title: string, subtitle: string }> = {
    'maternity-smart-plan': {
        title: "Maternity Strategy",
        subtitle: "Prioritizing private wards, gynecologist coverage, and pediatrician benefits for your growing family."
    },
    'chronic-warrior': {
        title: "Chronic Care Optimization",
        subtitle: "Focusing on high formulary limits, biological drug access, and network specialists."
    },
    'budget-conscious': {
        title: "Maximum Efficiency",
        subtitle: "Stripping away non-essentials to find the highest hospital cover for the lowest Rand."
    },
    'default': {
        title: "Medical Aid Analysis",
        subtitle: "Analyzing 2026 scheme rules to match your unique financial and clinical profile."
    }
};

export default function WelcomeStatement({ personaSlug }: Props) {
    const content = PERSONA_COPY[personaSlug] || PERSONA_COPY['default'];

    return (
        <div className="mb-6 animate-in slide-in-from-top-2 fade-in duration-500">
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">
                HealthOS Intelligence
            </p>
            <h1 className="text-3xl font-light text-slate-900 leading-tight mb-2">
                {content.title}
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed max-w-lg">
                {content.subtitle}
            </p>
        </div>
    );
}