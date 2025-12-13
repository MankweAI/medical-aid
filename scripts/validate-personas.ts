import fs from 'fs';
import path from 'path';

// --- HELPER: TS OBJECT FORMATTER ---
function formatAsTsObject(data: any): string {
    // 1. Generate standard JSON with indentation
    const jsonLines = JSON.stringify(data, null, 4).split('\n');

    // 2. Process line-by-line to remove quotes from valid identifier keys
    const tsLines = jsonLines.map(line => {
        // Regex logic:
        // ^(\s*) -> capture indentation
        // "([a-zA-Z_]\w*)" -> capture key if it starts with letter/_ and contains only word chars
        // (\s*:) -> capture the colon separator
        return line.replace(/^(\s*)"([a-zA-Z_]\w*)"(\s*:)/, '$1$2$3');
    });

    return tsLines.join('\n');
}

// --- VALIDATION & CLEANING FUNCTION ---
function cleanAndValidatePersona(raw: any, index: number): { valid: boolean; data: any; errors: string[] } {
    const errors: string[] = [];
    const clean = { ...raw };

    // 1. CLEAN SLUG (Value Formatting Only)
    if (clean.slug) {
        clean.slug = clean.slug.toLowerCase().trim().replace(/\s+/g, '-');
    } else {
        errors.push(`Missing slug`);
    }

    // 2. STRUCTURE CHECKS (Key Existence Only)
    // We check if the KEY exists, but we accept ANY value (string, number, etc.)

    // Check Defaults
    if (!clean.defaults) {
        errors.push("Missing 'defaults' object");
    } else if (clean.defaults.income === undefined) {
        errors.push("Missing 'defaults.income'");
    }

    // Check Search Profile
    if (!clean.search_profile) {
        errors.push("Missing 'search_profile' object");
    }

    // Check Actuarial Logic
    if (!clean.actuarial_logic) {
        errors.push("Missing 'actuarial_logic' object");
    } else {
        if (!clean.actuarial_logic.target_plan_id) {
            errors.push("Missing 'actuarial_logic.target_plan_id'");
        }
        // Note: We removed the check for VALID_GP_VISITS here. 
        // Any string in 'gp_visits_frequency' is now accepted.
    }

    return {
        valid: errors.length === 0,
        data: clean,
        errors
    };
}

// --- MAIN EXECUTION ---
async function main() {
    const inputFile = process.argv[2];
    const outputFile = process.argv[3];

    if (!inputFile || !outputFile) {
        console.error("Usage: npx tsx scripts/validate-personas.ts <input_file> <output_file>");
        process.exit(1);
    }

    try {
        // Read file (lenient text reading)
        let rawContent = fs.readFileSync(path.resolve(inputFile), 'utf-8').trim();

        // Auto-fix: Wrap in brackets if missing (common in raw text dumps)
        if (!rawContent.startsWith('[')) {
            // Attempt to fix concatenated JSON objects (e.g. } { -> }, {)
            rawContent = `[${rawContent.replace(/}\s*{/g, '}, {')}]`;
        }

        const rawData = JSON.parse(rawContent);

        if (!Array.isArray(rawData)) {
            throw new Error("Input file parsed but is not an array.");
        }

        console.log(`🔍 Processing ${rawData.length} personas from ${inputFile}...`);

        const cleanedPersonas = [];
        let errorCount = 0;

        for (let i = 0; i < rawData.length; i++) {
            const result = cleanAndValidatePersona(rawData[i], i);

            if (result.valid) {
                cleanedPersonas.push(result.data);
            } else {
                errorCount++;
                console.error(`\n❌ Error in Persona #${i + 1} (${result.data.code || 'Unknown Code'}):`);
                result.errors.forEach(e => console.error(`   - ${e}`));
            }
        }

        // OUTPUT FORMAT: TypeScript Object Literal
        const tsOutput = formatAsTsObject(cleanedPersonas);

        fs.writeFileSync(path.resolve(outputFile), tsOutput);

        console.log(`\n✅ Completed.`);
        console.log(`   - Validated: ${cleanedPersonas.length}`);
        console.log(`   - Failed: ${errorCount}`);
        console.log(`   - TS Object saved to: ${outputFile}`);

    } catch (e) {
        console.error("Critical Error:", e);
    }
}

main();