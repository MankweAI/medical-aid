import fs from 'fs';
import path from 'path';

const MAPPINGS: Record<string, string> = {
    // 1. Fix Medshield Placeholders
    "UNRESOLVED_MEDSHIELD_MEDIPHILA_2026": "medshield-mediphila-network-2026",

    // 2. Fix Momentum Placeholders (Map to the plans we have)
    "MISSING_PLAN_ID__MMS_INGWE_2026": "momentum-ingwe-ingwe-network-2026",
    "MISSING_PLAN_ID__MMS_INCENTIVE_2026": "momentum-incentive-associated-2026",
    "MISSING_PLAN_ID__MMS_EXTENDER_2026": "momentum-extender-any-2026",
    "MISSING_PLAN_ID__MMS_SUMMIT_2026": "momentum-summit-any-2026",
    "MISSING_PLAN_ID__MMS_CUSTOM_2026": "momentum-custom-associated-state-2026",

    // 3. Fix Sizwe Hosmed Naming (Hyphen Mismatch)
    // Personas use "sizwehosmed", Plans use "sizwe-hosmed"
    "sizwehosmed-access-saver-2026": "sizwe-hosmed-access-saver-network-2026",
    "sizwehosmed-titanium-executive-2026": "sizwe-hosmed-titanium-executive-any-2026"
};

async function main() {
    const personasPath = path.resolve('./data/personas.ts');
    let content = fs.readFileSync(personasPath, 'utf-8');
    let count = 0;

    // Apply mappings
    Object.entries(MAPPINGS).forEach(([badId, goodId]) => {
        // Use regex to replace all occurrences of the bad ID
        const regex = new RegExp(`"${badId}"`, 'g');
        if (regex.test(content)) {
            content = content.replace(regex, `"${goodId}"`);
            console.log(`✅ Replaced: ${badId} -> ${goodId}`);
            count++;
        }
    });

    if (count > 0) {
        fs.writeFileSync(personasPath, content);
        console.log(`\n🎉 Successfully repaired ${count} links in personas.ts`);
    } else {
        console.log("\n⚠️  No matching IDs found to fix. Check if they were already fixed.");
    }
}

main();