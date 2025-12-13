
import { PERSONAS } from '../data/personas';
import { PLANS } from '../data/plans';

const BROKEN_SLUGS = [
    'discovery-smart-classic-risk-funded-2026',
    'discovery-smart-essential-budget-risk-2026',
    'discovery-smart-essential-dynamic-efficiency-2026',
    'discovery-smart-active-ultra-budget-2026',
    'discovery-saver-classic-msa-high-day2day-2026',
    'fedhealth-flexifed3-d2d-plus-health-risk-assessment-savings-unlock-2026',
    'fedhealth-flexifed3-grid-10percent-savings-maternity-family-childhood-benefits-2026',
    'medihelp-medprime-family-large-children-cap-arbitrage-2026',
    'medihelp-medprime-dependent-u26-rate-maximiser-2026',
    'medihelp-medprime-preventive-contraceptive-young-adult-2026',
    'medshield-mediphila-network-copay-avoidance-2026',
    'medshield-mediphila-young-woman-contraception-script-max-2026',
    'momentum-ingwe-connect-starter-2026',
    'sizwehosmed-access-core-non-dsp-usage-penalty-risk-2026',
    'sizwehosmed-access-core-senior-55plus-amd-joint-constraint-2026'
];

function checkLinks() {
    console.log("Checking Plan IDs for reported personas...\n");

    const planIds = new Set(PLANS.map(p => p.id));

    BROKEN_SLUGS.forEach(slug => {
        const persona = PERSONAS.find(p => p.slug === slug);
        if (!persona) {
            console.log(`[❌ NOT FOUND IN PERSONA FILE] ${slug}`);
            return;
        }

        const targetId = persona.actuarial_logic?.target_plan_id;

        if (!targetId) {
            console.log(`[❌ NO TARGET ID] ${slug}`);
            return;
        }

        if (planIds.has(targetId)) {
            console.log(`[✅ OK] ${slug} -> ${targetId}`);
        } else {
            console.log(`[❌ PLAN ID MISSING] ${slug}`);
            console.log(`    Target Plan ID: "${targetId}"`);

            // Try to find a fuzzy match?
            const potentialMatches = Array.from(planIds).filter(id =>
                id.includes(targetId.split('-')[0]) &&
                id.includes('2026')
            );
            if (potentialMatches.length > 0) {
                console.log(`    Did you mean one of these?`);
                potentialMatches.slice(0, 5).forEach(m => console.log(`      - ${m}`));
            }
        }
    });
}

checkLinks();
