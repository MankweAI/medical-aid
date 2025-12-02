// utils/persona.ts
import { Plan, SearchProfile, Rule, Condition } from './types';

export type PersonaSlug = string;

export interface UserProfile {
    persona: PersonaSlug;
    title: string;
    description: string;
    needs: SearchProfile;
}

export interface Risk {
    level: 'HIGH' | 'MEDIUM' | 'LOW';
    warning: string;
    details: string;
}

// --- HELPER: Evaluate a single condition ---
const checkCondition = (plan: any, profile: UserProfile, condition: Condition): boolean => {
    let actualValue: any;
    let targetValue: any;

    // 1. Resolve Actual Value (from Plan)
    // Handle nested fields if necessary, simple access for now
    actualValue = plan[condition.field];

    // 2. Resolve Target Value
    if (condition.source === 'user_need') {
        // Map dynamic field names if they differ, or assume direct mapping
        // Use compareField if available, otherwise fallback to field
        const needKey = condition.compareField || (condition.field as keyof SearchProfile);
        targetValue = profile.needs[needKey];
    } else {
        // Static value from the rule definition
        targetValue = condition.value;
    }

    // 3. Evaluate
    switch (condition.operator) {
        case 'equals': return actualValue === targetValue;
        case 'not_equals': return actualValue !== targetValue;
        case 'includes': return Array.isArray(actualValue) && actualValue.includes(targetValue);
        case 'greater_than': return actualValue > targetValue;
        case 'less_than': return actualValue < targetValue;
        default: return false;
    }
};

// --- HELPER: String Interpolation ---
// Replaces {field} in the warning text with actual plan data
const formatDetails = (template: string, plan: any) => {
    return template.replace(/\{(\w+)\}/g, (_, key) => plan[key] || '?');
};

// --- MAIN ENGINE ---
export const validatePlan = (plan: any, profile: UserProfile): Risk[] => {
    const risks: Risk[] = [];

    // 1. Load Rules from the User Profile (Database)
    // If no rules exist (legacy), fallback to empty array
    const rules = profile.needs.rules || [];

    // 2. Iterate through Data-Driven Rules
    for (const rule of rules) {
        // A rule triggers if ALL conditions match (AND logic)
        // You can extend this to support 'OR' groups later if needed
        const isTriggered = rule.conditions.every(cond =>
            checkCondition(plan, profile, cond)
        );

        if (isTriggered) {
            risks.push({
                level: rule.consequence.level,
                warning: rule.consequence.warning,
                details: formatDetails(rule.consequence.details_template, plan)
            });
        }
    }

    return risks;
};

export const mergeProfiles = (profiles: SearchProfile[]): SearchProfile => {
    if (profiles.length === 0) return {};

    return profiles.reduce((acc, curr) => {
        return {
            // 1. Savings: Take the highest requirement (Conservative approach)
            minSavings: Math.max(acc.minSavings || 0, curr.minSavings || 0),

            // 2. Benefits: Union of all required benefits (No duplicates)
            requiredBenefits: Array.from(new Set([
                ...(acc.requiredBenefits || []),
                ...(curr.requiredBenefits || [])
            ])),

            // 3. Network: Logic to find the 'strictest' or 'safest' tolerance
            // Logic: If ANY persona demands 'Any' network, the user needs 'Any'.
            // Hierarchy: Any > Coastal > Regional > State
            networkTolerance: resolveNetworkTolerance(acc.networkTolerance, curr.networkTolerance),

            // 4. Rules: Concatenate all rules (The Engine handles the rest)
            rules: [
                ...(acc.rules || []),
                ...(curr.rules || [])
            ]
        };
    }, {} as SearchProfile);
};

// Helper for Network Hierarchy
const resolveNetworkTolerance = (
    a: SearchProfile['networkTolerance'],
    b: SearchProfile['networkTolerance']
): SearchProfile['networkTolerance'] => {
    if (!a) return b;
    if (!b) return a;

    // "Any" overrides everything (Safety first)
    if (a === 'Any' || b === 'Any') return 'Any';

    // "Coastal" is a restriction, but "State" is a bigger one. 
    // This logic depends on your business rule. 
    // Let's assume if one persona is Coastal, we respect that constraint 
    // unless another persona explicitly needs "Any".
    if (a === 'Coastal' || b === 'Coastal') return 'Coastal';

    return a; // Default fallback
};