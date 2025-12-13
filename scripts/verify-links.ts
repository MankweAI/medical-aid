import fs from 'fs';
import path from 'path';

// --- ROBUST PARSER (Fixed for TypeScript files) ---
function parseInputData(rawContent: string): any {
    if (!rawContent || rawContent.trim() === '') return [];

    // 1. Remove comments first (Crucial: prevents finding '[' inside comments)
    const cleanContent = rawContent.replace(/("(?:[^"\\]|\\.)*")|(\/\/[^\n\r]*|\/\*[\s\S]*?\*\/)/g, (match, str) => {
        if (str) return str; // Preserve strings
        return ''; // Strip comments
    }).trim();

    // 2. Locate the exported array
    // We assume the data file's main content is a large array [...]
    // This bypasses "export const PERSONAS: Persona[] =" entirely.
    const start = cleanContent.indexOf('[');
    const end = cleanContent.lastIndexOf(']');

    if (start === -1 || end === -1) {
        throw new Error("Could not find a valid data array [...] in the file.");
    }

    // 3. Extract just the array literal
    const arrayString = cleanContent.slice(start, end + 1);

    // 4. Parse using Function constructor
    try {
        const func = new Function('return ' + arrayString + ';');
        return func();
    } catch (e) {
        throw new Error(`Parse Error: ${(e as Error).message}\n   (Check for syntax errors inside the array)`);
    }
}

async function main() {
    const personasPath = path.resolve('./data/personas.ts');
    const plansPath = path.resolve('./data/plans.ts');

    console.log("🔍 Medical Aid Link Verifier");
    console.log("============================");

    try {
        // 1. LOAD DATA
        if (!fs.existsSync(personasPath)) throw new Error(`File not found: ${personasPath}`);
        if (!fs.existsSync(plansPath)) throw new Error(`File not found: ${plansPath}`);

        const personasRaw = fs.readFileSync(personasPath, 'utf-8');
        const plansRaw = fs.readFileSync(plansPath, 'utf-8');

        const personas = parseInputData(personasRaw);
        const plans = parseInputData(plansRaw);

        console.log(`📊 Loaded ${personas.length} Personas`);
        console.log(`📊 Loaded ${plans.length} Plans`);
        console.log("----------------------------");

        // 2. INDEX PLANS
        const planIds = new Set(plans.map((p: any) => p.id));

        // Check for duplicate Plan IDs (common source of bugs)
        const idCounts: Record<string, number> = {};
        plans.forEach((p: any) => { idCounts[p.id] = (idCounts[p.id] || 0) + 1; });
        const duplicates = Object.keys(idCounts).filter(id => idCounts[id] > 1);

        if (duplicates.length > 0) {
            console.error(`\n⚠️  WARNING: DUPLICATE PLAN IDS FOUND IN plans.ts`);
            duplicates.forEach(id => console.error(`   - "${id}" appears ${idCounts[id]} times`));
            console.log("----------------------------");
        }

        // 3. CHECK LINKS
        const brokenLinks: any[] = [];
        const validLinks: any[] = [];

        personas.forEach((persona: any) => {
            const targetId = persona.actuarial_logic?.target_plan_id;
            const personaSlug = persona.slug;

            if (!targetId) {
                brokenLinks.push({ slug: personaSlug, reason: "Missing 'target_plan_id' field" });
                return;
            }

            if (planIds.has(targetId)) {
                validLinks.push({ slug: personaSlug, target: targetId });
            } else {
                brokenLinks.push({
                    slug: personaSlug,
                    target: targetId,
                    reason: "Plan ID missing in plans.ts"
                });
            }
        });

        // 4. REPORT RESULTS
        if (brokenLinks.length === 0) {
            console.log("\n✅ SUCCESS: All 100% of Personas define a valid Plan ID.");
        } else {
            console.log(`\n❌ FOUND ${brokenLinks.length} BROKEN LINKS:`);
            console.log(`   (These Personas will only show 'Meta' info because the Plan data is missing)`);

            brokenLinks.forEach((item, index) => {
                console.log(`\n   ${index + 1}. Persona: "${item.slug}"`);
                console.log(`      Looking for Plan ID: "${item.target}"`);
                console.log(`      🔴 STATUS: MISSING`);
            });

            console.log("\n----------------------------");
            console.log(`✅ Valid Links: ${validLinks.length}`);
            console.log(`❌ Broken Links: ${brokenLinks.length}`);
            console.log(`📉 Health Score: ${Math.round((validLinks.length / personas.length) * 100)}%`);
        }

    } catch (e) {
        console.error("Critical Error:", (e as Error).message);
    }
}

main();