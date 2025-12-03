// types/simulation.ts

export type ScenarioCategory = 'Maternity' | 'Chronic' | 'Surgery' | 'Emergency' | 'Everyday';

export type LineItemCategory = 'Specialist' | 'GP' | 'Medication' | 'Facility' | 'Pathology' | 'Radiology' | 'Auxiliary';

export type Setting = 'In_Hospital' | 'Out_of_Hospital';

export interface ClinicalScenario {
    id: string;
    title: string;
    category: ScenarioCategory;
    description: string;

    /**
     * The "Bill of Materials" for this medical event.
     * Represents the standard clinical pathway independent of any specific medical aid.
     */
    line_items: SimulationLineItem[];
}

export interface SimulationLineItem {
    label: string;          // e.g. "Gynae Consult"
    quantity: number;       // e.g. 8 visits
    cost_per_unit: number;  // e.g. R1,200 (Private Rate)
    setting: Setting;       // Determines if OHEB or Hospital Benefit applies
    category: LineItemCategory; // Maps to benefit buckets (e.g. 'Specialist')
    is_pmb: boolean;        // If true, triggers PMB protection logic
    phase: string;          // NEW: Grouping (e.g. "Antenatal", "The Event")
}

export interface SimulationResult {
    plan_id: string;
    scenario_id: string;

    financials: {
        total_event_cost: number; // The real-world invoice total
        plan_pays: number;        // What the scheme covers (Risk + Savings)
        shortfall: number;        // The user's out-of-pocket exposure

        breakdown: {
            paid_from_risk: number;    // Unlimited/Risk benefit
            paid_from_savings: number; // MSA depletion
            paid_from_pocket: number;  // Self-payment gap
        };
    };

    gap_cover?: {
        active: boolean;
        total_covered: number;
    };

    /**
     * The sequential story of the claim for the UI Timeline.
     */
    timeline: SimulationEvent[];

    /**
     * High-level actuarial warnings (e.g. "State Chronic Usage Required")
     */
    critical_warnings: string[];
}

export interface SimulationEvent {
    step_label: string; // e.g. "Month 3: Gynae Consult"
    status: 'Fully Covered' | 'Partially Covered' | 'Not Covered';

    cost: number;       // The bill amount
    covered: number;    // Amount paid by scheme
    shortfall: number;  // Amount paid by user

    source: 'Risk' | 'Savings' | 'Pocket' | 'Split'; // Where the money came from

    reason: string;     // e.g. "Savings depleted" or "Plan rate 100% vs Doctor 200%"
}