// utils/simulator.ts
import { PlanProduct } from '@/types/schema';
import { ClinicalScenario, SimulationResult, SimulationEvent } from '@/types/simulation';

/**
 * THE ACTUARIAL BRAIN v2.1
 * -------------------
 * Updated to handle legacy plans safely without crashing.
 */
export function runSimulation(plan: PlanProduct, scenario: ClinicalScenario): SimulationResult {

    // 1. Initialize State
    let runningSavingsBalance = plan.savings_account.value; // Initial MSA
    let totalPlanPays = 0;
    let totalPocketPays = 0;

    // SAFEGUARD: Ensure objects exist before access
    const definedBaskets = plan.defined_baskets || { maternity: { antenatal_consults: 0, ultrasounds_2d: 0, paediatrician_visits: 0 } };
    const coverageRates = plan.coverage_rates || { specialist_in_hospital: 100 }; // Default to 100%

    // Track Basket Usage
    const baskets = {
        maternity_consults: definedBaskets.maternity?.antenatal_consults || 0,
        maternity_scans: definedBaskets.maternity?.ultrasounds_2d || 0,
        paeds_visits: definedBaskets.maternity?.paediatrician_visits || 0
    };

    const timeline: SimulationEvent[] = [];
    const warnings: string[] = [];

    // 2. Iterate Line Items
    scenario.line_items.forEach((item, index) => {
        const itemCost = item.cost_per_unit * item.quantity;
        let amountCovered = 0;
        let amountShortfall = 0;
        let source: 'Risk' | 'Savings' | 'Pocket' | 'Split' = 'Pocket';
        let reason = '';
        let status: 'Fully Covered' | 'Partially Covered' | 'Not Covered' = 'Not Covered';

        // Helper: Calculate Plan Rate Coverage
        const calculateRateCoverage = (rate: number, cost: number) => {
            if (rate >= 200) return cost;
            if (rate >= 100) return cost * 0.5; // Heuristic: Private rates are double scheme rates
            return 0;
        };

        // A. MATERNITY BASKET CHECK
        if (scenario.category === 'Maternity' && item.category === 'Specialist' && item.label.includes('Consult') && baskets.maternity_consults > 0) {
            const used = Math.min(item.quantity, baskets.maternity_consults);
            baskets.maternity_consults -= used;
            amountCovered = itemCost;
            source = 'Risk';
            reason = `Covered by Maternity Benefit (${used} visits).`;
            status = 'Fully Covered';
        }
        else if (scenario.category === 'Maternity' && item.label.includes('Ultrasound') && baskets.maternity_scans > 0) {
            const used = Math.min(item.quantity, baskets.maternity_scans);
            baskets.maternity_scans -= used;
            amountCovered = itemCost;
            source = 'Risk';
            reason = 'Covered by Maternity Benefit (Scan).';
            status = 'Fully Covered';
        }

        // B. PMB PROTECTION
        else if (item.is_pmb && checkNetworkAlignment(plan, item.setting)) {
            amountCovered = itemCost;
            source = 'Risk';
            reason = 'PMB covered at cost (Network compliant).';
            status = 'Fully Covered';
        }

        // C. HOSPITAL EVENT (Risk)
        else if (item.setting === 'In_Hospital') {
            const copay = getProcedureCopay(plan, item.label);

            let rateCover = itemCost;
            let rateReason = '';

            if (item.category === 'Specialist') {
                const planRate = coverageRates.specialist_in_hospital;
                rateCover = calculateRateCoverage(planRate, itemCost);
                if (rateCover < itemCost) rateReason = `Plan rate ${planRate}% < Doctor rate.`;
            }

            if (copay > 0) {
                amountShortfall += copay;
                amountCovered = Math.max(0, rateCover - copay);
                reason = `R${copay} Procedure Co-payment applied. ${rateReason}`;
                source = 'Split';
                status = 'Partially Covered';
            } else if (rateCover < itemCost) {
                amountShortfall = itemCost - rateCover;
                amountCovered = rateCover;
                reason = rateReason;
                source = 'Split';
                status = 'Partially Covered';
            } else {
                amountCovered = itemCost;
                source = 'Risk';
                reason = 'Unlimited Hospital Benefit.';
                status = 'Fully Covered';
            }
        }

        // D. DAY-TO-DAY
        else if (item.setting === 'Out_of_Hospital') {
            if (plan.savings_account.type !== 'None') {
                if (runningSavingsBalance >= itemCost) {
                    amountCovered = itemCost;
                    runningSavingsBalance -= itemCost;
                    source = 'Savings';
                    reason = 'Paid from MSA.';
                    status = 'Fully Covered';
                } else if (runningSavingsBalance > 0) {
                    amountCovered = runningSavingsBalance;
                    amountShortfall = itemCost - runningSavingsBalance;
                    runningSavingsBalance = 0;
                    source = 'Split';
                    reason = 'Savings exhausted.';
                    status = 'Partially Covered';
                } else {
                    amountShortfall = itemCost;
                    source = 'Pocket';
                    reason = 'Savings depleted.';
                    status = 'Not Covered';
                }
            } else {
                amountShortfall = itemCost;
                source = 'Pocket';
                reason = 'No day-to-day benefit.';
                status = 'Not Covered';
            }
        }

        totalPlanPays += amountCovered;
        totalPocketPays += amountShortfall;

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

// --- HELPERS ---

function checkNetworkAlignment(plan: PlanProduct, setting: 'In_Hospital' | 'Out_of_Hospital'): boolean {
    if (plan.hospital_network === 'Any') return true;
    return true;
}

function getProcedureCopay(plan: PlanProduct, label: string): number {
    const l = label.toLowerCase();
    // SAFEGUARD: Optional Chaining for missing hard_limits
    const cp = plan.hard_limits?.procedure_copays;
    if (!cp) return 0;

    if (l.includes('scope') || l.includes('gastroscopy')) return cp.scope_in_hospital || 0;
    if (l.includes('mri') || l.includes('ct scan')) return cp.mri_scan || 0;
    if (l.includes('joint') || l.includes('replacement')) return cp.joint_replacement || 0;

    return 0;
}