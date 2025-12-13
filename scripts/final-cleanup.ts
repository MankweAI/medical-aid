import fs from 'fs';
import path from 'path';

const MAPPINGS: Record<string, string> = {
    // Fix Fedhealth Maxima IDs
    "fedhealth-maximaplus-2026": "fedhealth-maxima-plus-any-2026",
    "fedhealth-maximaexec-2026": "fedhealth-maxima-exec-any-2026",

    // Fix Momentum Evolve Placeholder
    "MISSING_PLAN_ID__MMS_EVOLVE_2026": "momentum-evolve-any-2026"
};

async function main() {
    const personasPath = path.resolve('./data/personas.ts');
    let content = fs.readFileSync(personasPath, 'utf-8');
    let count = 0;

    console.log("🧹 Running Final Link Cleanup...");

    Object.entries(MAPPINGS).forEach(([badId, goodId]) => {
        // Regex looks for "target_plan_id": "BAD_ID" or just "BAD_ID"
        const regex = new RegExp(`"${badId}"`, 'g');
        if (regex.test(content)) {
            content = content.replace(regex, `"${goodId}"`);
            console.log(`✅ Fixed: ${badId} -> ${goodId}`);
            count++;
        }
    });

    if (count > 0) {
        fs.writeFileSync(personasPath, content);
        console.log(`\n🎉 Success! Repaired ${count} remaining broken links.`);
    } else {
        console.log("\n✅ No broken links found in the mappings.");
    }
}

main();