import fs from 'fs';
import path from 'path';

// --- ROBUST PARSER ---
function parseInputData(rawContent: string): any {
    if (!rawContent || rawContent.trim() === '') return [];

    // 1. Remove comments
    const cleanContent = rawContent.replace(/("(?:[^"\\]|\\.)*")|(\/\/[^\n\r]*|\/\*[\s\S]*?\*\/)/g, (match, str) => {
        if (str) return str;
        return '';
    }).trim();

    // 2. Locate the array
    const start = cleanContent.indexOf('[');
    const end = cleanContent.lastIndexOf(']');

    if (start === -1 || end === -1) {
        throw new Error("Could not find a valid data array [...] in the file.");
    }

    const arrayString = cleanContent.slice(start, end + 1);

    // 3. Parse
    try {
        const func = new Function('return ' + arrayString + ';');
        return func();
    } catch (e) {
        throw new Error(`Parse Error: ${(e as Error).message}`);
    }
}

async function main() {
    const personasPath = path.resolve('./data/personas.ts');
    const plansPath = path.resolve('./data/plans.ts');

    console.log("🔍 Medical Aid Link Verifier");
    console.log("============================");

    try {
        if (!fs.existsSync(personasPath)) throw new Error(`File not found: ${personasPath}`);
        if (!fs.existsSync(plansPath)) throw new Error(`File not found: ${plansPath}`);

        const personas = parseInputData(fs.readFileSync(personasPath, 'utf-8'));
        const plans = parseInputData(fs.readFileSync(plansPath, 'utf-8'));

        console.log(`📊 Loaded ${personas.length} Personas`);
        console.log(`📊 Loaded ${plans.length} Plans`);
        console.log("----------------------------");

        // Index Plans
        const planIds = new Set(plans.map((p: any) => p.id));

        // Check Links
        const brokenLinks: any[] = [];
        const validLinks: any[] = [];

        personas.forEach((persona: any) => {
            const targetId = persona.actuarial_logic?.target_plan_id;

            if (targetId && planIds.has(targetId)) {
                validLinks.push(persona.slug);
            } else {
                brokenLinks.push({
                    slug: persona.slug,
                    target: targetId || "UNDEFINED"
                });
            }
        });

        // Report
        if (brokenLinks.length === 0) {
            console.log("\n✅ SUCCESS: 100% of Personas are correctly linked to a Plan.");
            console.log(`   Total Valid Links: ${validLinks.length}`);
        } else {
            console.log(`\n❌ FOUND ${brokenLinks.length} BROKEN LINKS:`);
            brokenLinks.forEach((item, index) => {
                console.log(`   ${index + 1}. ${item.slug} -> "${item.target}" (Missing in plans.ts)`);
            });
            console.log(`\n📉 Health Score: ${Math.round((validLinks.length / personas.length) * 100)}%`);
        }

    } catch (e) {
        console.error("Critical Error:", (e as Error).message);
    }
}

main();