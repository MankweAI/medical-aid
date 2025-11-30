export type PersonaSlug = string;

export interface UserProfile {
    persona: PersonaSlug;
    title: string;
    description: string;
    needs: {
        minSavings?: number;
        requiredBenefits: string[];
        networkTolerance: 'Any' | 'Network' | 'State' | 'Coastal' | 'Regional';
    };
}

export interface Risk {
    level: 'HIGH' | 'MEDIUM' | 'LOW';
    warning: string;
    details: string;
}

// 3. Validation Logic (Client/Server Shared)
export const validatePlan = (plan: any, profile: UserProfile): Risk[] => {
    const risks: Risk[] = [];
    // Ensure plan.name exists before calling toLowerCase
    const planName = plan?.name?.toLowerCase() || '';
    const { minSavings, networkTolerance, requiredBenefits } = profile.needs;

    // Logic A: Network Mismatch
    if (networkTolerance === 'Any' && plan.network_restriction !== 'Any') {
        risks.push({
            level: 'MEDIUM',
            warning: 'Restricted Network',
            details: `This plan limits you to ${plan.network_restriction} hospitals. Non-network use has penalties.`
        });
    }

    // Logic B: Coastal Warning
    if (networkTolerance === 'Coastal' && plan.network_restriction !== 'Coastal') {
        // No risk if upgrading to Any, but flag if user wants Coastal price
        // Logic handles "Is this efficient?"
    }

    // Logic C: Chronic State Trap
    if (requiredBenefits.includes('specialist') && plan.network_restriction === 'State') {
        risks.push({
            level: 'HIGH',
            warning: 'State Chronic Meds',
            details: 'You must collect chronic medication from State Clinics, despite having private hospital cover.'
        });
    }

    return risks;
};