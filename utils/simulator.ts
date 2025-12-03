// utils/simulator.ts
import { PlanProduct } from '@/types/schema';
import { ClinicalScenario, SimulationResult, SimulationEvent } from '@/types/simulation';

/**
 * THE ACTUARIAL BRAIN
 * -------------------
 * Runs a clinical scenario against a specific medical aid plan's ruleset.
 */
export function runSimulation(plan: PlanProduct, scenario: ClinicalScenario): SimulationResult {

    let runningSavingsBalance = plan.savings_account.value; // Initial MSA
    let totalPlanPays = 0;
    let totalPocketPays = 0;
    const timeline: SimulationEvent[] = [];
    const warnings: string[] = [];

    // 1. Process each clinical event in the scenario
    scenario.line_items.forEach((item, index) => {
        const itemCost = item.cost_per_unit * item.quantity;
        let amountCovered = 0;
        let amountShortfall = 0;
        let source: 'Risk' | 'Savings' | 'Pocket' | 'Split' = 'Pocket';
        let reason = '';
        let status: 'Fully Covered' | 'Partially Covered' | 'Not Covered' = 'Not Covered';

        // --- RULE ENGINE LOGIC ---

        // A. PMB PROTECTION (The "Golden Rule")
        const isNetworkAligned = checkNetworkAlignment(plan, item.setting);

        if (item.is_pmb && isNetworkAligned) {
            amountCovered = itemCost;
            source = 'Risk';
            reason = 'Prescribed Minimum Benefit (PMB) covered at cost.';
            status = 'Fully Covered';
        }

        // B. HOSPITAL BENEFIT (Risk)
        else if (item.setting === 'In_Hospital') {
            // Check for Procedure Copayments (e.g. Scope in Hospital)
            const scopePenalty = plan.hard_limits.scope_penalty_hospital || 0;
            if (item.label.includes('Scope') && scopePenalty > 0) {
                amountCovered = Math.max(0, itemCost - scopePenalty);
                amountShortfall = scopePenalty;
                source = 'Split';
                reason = `R${scopePenalty} co-payment applied for scope in hospital.`;
                status = 'Partially Covered';
            }
            // Check Network Restriction
            else if (!isNetworkAligned) {
                const penalty = itemCost * 0.3; // 30% Co-payment heuristic
                amountCovered = itemCost - penalty;
                amountShortfall = penalty;
                source = 'Split';
                reason = 'Non-Network Hospital used (30% Co-payment).';
                status = 'Partially Covered';
                if (!warnings.includes('Non-Network Hospital Penalty Applied')) warnings.push('Non-Network Hospital Penalty Applied');
            }
            // Standard Cover
            else {
                // Heuristic: Specialist Shortfall?
                if (item.category === 'Specialist' && plan.series.includes('Core')) {
                    const schemeRate = itemCost * 0.8; // User pays 20% gap
                    amountCovered = schemeRate;
                    amountShortfall = itemCost - schemeRate;
                    source = 'Split';
                    reason = 'Specialist charges > Scheme Rate.';
                    status = 'Partially Covered';
                } else {
                    amountCovered = itemCost;
                    source = 'Risk';
                    reason = 'Unlimited Hospital Benefit.';
                    status = 'Fully Covered';
                }
            }
        }

        // C. DAY-TO-DAY (Savings vs Pocket)
        else if (item.setting === 'Out_of_Hospital') {

            // 1. Check if "Risk" covers it (e.g. Smart Plan GP visits)
            if (plan.series.includes('Smart') && item.category === 'GP') {
                amountCovered = itemCost;
                source = 'Risk';
                reason = 'Unlimited Smart GP Benefit.';
                status = 'Fully Covered';
            }
            // 2. Else, check Savings
            else if (plan.savings_account.type !== 'None') {
                if (runningSavingsBalance >= itemCost) {
                    amountCovered = itemCost;
                    runningSavingsBalance -= itemCost;
                    source = 'Savings';
                    reason = 'Paid from Medical Savings Account.';
                    status = 'Fully Covered';
                } else if (runningSavingsBalance > 0) {
                    // Split funding
                    amountCovered = runningSavingsBalance;
                    amountShortfall = itemCost - runningSavingsBalance;
                    runningSavingsBalance = 0;
                    source = 'Split';
                    reason = 'Savings exhausted part-way.';
                    status = 'Partially Covered';
                } else {
                    // Empty Savings
                    amountShortfall = itemCost;
                    source = 'Pocket';
                    reason = 'Savings Account depleted.';
                    status = 'Not Covered';
                }
            }
            // 3. No Savings / Hospital Plan
            else {
                amountShortfall = itemCost;
                source = 'Pocket';
                reason = 'Plan has no day-to-day benefit.';
                status = 'Not Covered';
            }
        }

        // Aggregate Totals
        totalPlanPays += amountCovered;
        totalPocketPays += amountShortfall;

        // Push Event
        timeline.push({
            step_label: `Month ${index + 1}: ${item.label}`,
            status,
            cost: itemCost,
            covered: amountCovered,
            shortfall: amountShortfall,
            source,
            reason
        });
    });

    // 2. Generate Final Verdict
    return {
        plan_id: plan.id,
        scenario_id: scenario.id,
        financials: {
            total_event_cost: totalPlanPays + totalPocketPays,
            plan_pays: totalPlanPays,
            shortfall: totalPocketPays,
            breakdown: {
                paid_from_risk: totalPlanPays - (plan.savings_account.value - runningSavingsBalance),
                paid_from_savings: plan.savings_account.value - runningSavingsBalance,
                paid_from_pocket: totalPocketPays
            }
        },
        timeline,
        critical_warnings: warnings
    };
}

// --- HELPER: Network Check ---
function checkNetworkAlignment(plan: PlanProduct, setting: 'In_Hospital' | 'Out_of_Hospital'): boolean {
    // 1. Any Network is always compliant
    if (plan.hospital_network === 'Any') return true;

    // 2. If it is a Network plan, check if we are simulating a "Coastal" or "Network" usage
    // FIX: Removed invalid comparison to 'Coastal' on hospital_network
    if (plan.hospital_network === 'Network' || plan.network_geofence === 'Coastal') {
        // Optimistic assumption: User goes to the right hospital
        return true;
    }

    // 3. Default safe
    return true;
}