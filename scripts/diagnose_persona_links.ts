import fs from 'fs';
import path from 'path';

// --- 1. HELPERS: PARSER ---
function parseInputData(rawContent: string): any {
    if (!rawContent || rawContent.trim() === '') return [];

    // Remove comments and standard JS prefixes
    const cleanContent = rawContent.replace(/("(?:[^"\\]|\\.)*")|(\/\/[^\n\r]*|\/\*[\s\S]*?\*\/)/g, (match, str) => {
        if (str) return str;
        return '';
    }).trim();

    // Find the array
    const start = cleanContent.indexOf('[');
    const end = cleanContent.lastIndexOf(']');
    if (start === -1 || end === -1) return [];

    const arrayString = cleanContent.slice(start, end + 1);

    try {
        const func = new Function('return ' + arrayString + ';');
        return func();
    } catch (e) {
        return [];
    }
}

// --- 2. FUZZY MATCHER ---
function findPotentialMatch(brokenId: string, availableIds: string[]): string | null {
    if (!brokenId) return null;

    // Normalize: "bestmed-beat1-network-2026" -> "bestmed beat1 network"
    const normalize = (s: string) => s.toLowerCase().replace(/[-_]/g, ' ').replace(/202[0-9]/, '').trim();
    const target = normalize(brokenId);

    let bestMatch = null;
    let maxOverlap = 0;

    for (const id of availableIds) {
        const candidate = normalize(id);

        // Brand MUST match (e.g. don't match 'bonitas' to 'bestmed')
        const targetBrand = target.split(' ')[0];
        const candidateBrand = candidate.split(' ')[0];
        if (targetBrand !== candidateBrand) continue;

        // Count matching words
        const targetWords = target.split(' ');
        const candidateWords = candidate.split(' ');
        const overlap = targetWords.filter(w => candidateWords.includes(w)).length;

        // We need significant overlap (more than just the brand name)
        if (overlap > 1 && overlap > maxOverlap) {
            maxOverlap = overlap;
            bestMatch = id;
        }
    }
    return bestMatch;
}

// --- 3. MAIN SCRIPT ---
async function main() {
    const personasPath = path.resolve('./data/personas.ts');
    const plansPath = path.resolve('./data/plans.ts');

    console.log("🔍 DIAGNOSING PERSONA LINKS...");
    console.log("===============================");

    const personas = parseInputData(fs.readFileSync(personasPath, 'utf-8'));
    const plans = parseInputData(fs.readFileSync(plansPath, 'utf-8'));

    const planIds = new Set(plans.map((p: any) => p.id));
    const availablePlanIds = Array.from(planIds) as string[];

    let missingCount = 0;
    let fixableCount = 0;
    const missingPlans = new Set<string>();

    console.log(`\n📊 STATUS CHECK:`);

    personas.forEach((p: any) => {
        const target = p.actuarial_logic?.target_plan_id;

        if (!target) {
            console.log(`❌ [${p.slug}]: No target_plan_id defined.`);
            missingCount++;
            return;
        }

        if (planIds.has(target)) {
            // Valid link, do nothing
            return;
        }

        // Link is broken. Try to find a fix.
        const suggestion = findPotentialMatch(target, availablePlanIds);

        if (suggestion) {
            console.log(`⚠️  MISMATCH: "${p.slug}"`);
            console.log(`    Target: "${target}"`);
            console.log(`    Did you mean: "${suggestion}"?`);
            console.log(`    -----------------------------`);
            fixableCount++;
        } else {
            console.log(`🔴 MISSING PLAN: "${p.slug}"`);
            console.log(`    Target: "${target}"`);
            console.log(`    Action: Add plan to plans.ts`);
            console.log(`    -----------------------------`);
            missingPlans.add(target);
            missingCount++;
        }
    });

    console.log("\n===============================");
    console.log(`📉 REPORT SUMMARY:`);
    console.log(`   - Fixable Links (Typo/Mismatch): ${fixableCount}`);
    console.log(`   - Dead Links (Plan Missing):     ${missingCount - fixableCount}`);

    if (missingPlans.size > 0) {
        console.log(`\n📋 MISSING PLANS TO CREATE (${missingPlans.size}):`);
        // List unique missing IDs so you know what data to fetch
        Array.from(missingPlans).forEach(id => console.log(`   - ${id}`));
    }
}

main();