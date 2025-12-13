import fs from 'fs';
import path from 'path';

// --- 1. ROBUST PARSER (Handles Comments & Loose JSON) ---

function parseInputData(rawContent: string): any {
    if (!rawContent || rawContent.trim() === '') return [];

    // Clean comments while preserving strings
    const cleanContent = rawContent.replace(/("(?:[^"\\]|\\.)*")|(\/\/[^\n\r]*|\/\*[\s\S]*?\*\/)/g, (match, str) => {
        if (str) return str;
        return '';
    }).trim();

    // Find array boundaries to ignore imports/exports
    const start = cleanContent.indexOf('[');
    const end = cleanContent.lastIndexOf(']');
    if (start === -1 || end === -1) throw new Error("No array found in file.");

    const arrayString = cleanContent.slice(start, end + 1);

    try {
        const func = new Function('return ' + arrayString + ';');
        return func();
    } catch (e) {
        throw new Error(`Parse Error: ${(e as Error).message}`);
    }
}

// --- 2. FORMATTER (Produces Valid TypeScript) ---

function formatAsTsObject(data: any): string {
    const jsonLines = JSON.stringify(data, null, 4).split('\n');
    const tsLines = jsonLines.map(line => {
        // Remove quotes from valid keys (e.g., "slug": -> slug:)
        return line.replace(/^(\s*)"([a-zA-Z_]\w*)"(\s*:)/, '$1$2$3');
    });
    return `import { Persona } from '@/utils/persona';\n\nexport const PERSONAS: Persona[] = ${tsLines.join('\n')};\n`;
}

// --- 3. MATCHING ALGORITHM ---

function tokenize(id: string): string[] {
    // Splits "bestmed-beat1-network" into ["bestmed", "beat1", "network"]
    return id.toLowerCase().split(/[-_ ]+/).filter(Boolean);
}

function findBestMatch(brokenId: string, availableIds: string[]): { id: string; score: number } | null {
    if (!brokenId) return null;

    const targetTokens = tokenize(brokenId);
    const targetBrand = targetTokens[0]; // e.g., "bestmed"

    let bestId = '';
    let bestScore = -1;

    for (const candidateId of availableIds) {
        const candidateTokens = tokenize(candidateId);

        // SAFETY RAIL: Brand must match exactly (Never map Bonitas to Bestmed)
        if (candidateTokens[0] !== targetBrand) continue;

        // Calculate Overlap Score
        let score = 0;
        const candidateTokenSet = new Set(candidateTokens);

        targetTokens.forEach((token) => {
            if (candidateTokenSet.has(token)) {
                score += 1;
            }
        });

        // Tie-breaker: Penalize length differences to prefer exact series matches
        // e.g. Prevents mapping "Saver" to "Saver-Comprehensive-Plus" if a better fit exists
        const lengthDiff = Math.abs(candidateTokens.length - targetTokens.length);
        score -= (lengthDiff * 0.1);

        if (score > bestScore) {
            bestScore = score;
            bestId = candidateId;
        }
    }

    // Threshold: Must match at least Brand + 1 other token (Score >= 2) to be safe
    if (bestScore >= 2) {
        return { id: bestId, score: bestScore };
    }

    return null;
}

// --- 4. MAIN EXECUTION ---

async function main() {
    const personasPath = path.resolve('./data/personas.ts');
    const plansPath = path.resolve('./data/plans.ts');
    const outputPath = path.resolve('./data/personas_fixed.ts');

    console.log("🛠️  Medical Aid Link Fixer");
    console.log("==========================");

    try {
        // 1. LOAD DATA
        if (!fs.existsSync(personasPath) || !fs.existsSync(plansPath)) {
            throw new Error("Missing 'data/personas.ts' or 'data/plans.ts'");
        }

        const personasRaw = fs.readFileSync(personasPath, 'utf-8');
        const plansRaw = fs.readFileSync(plansPath, 'utf-8');

        const personas = parseInputData(personasRaw);
        const plans = parseInputData(plansRaw);

        const availablePlanIds = plans.map((p: any) => p.id);
        const planIdSet = new Set(availablePlanIds);

        console.log(`📊 Loaded ${personas.length} Personas`);
        console.log(`📊 Loaded ${availablePlanIds.length} Unique Plans`);
        console.log("--------------------------");

        let fixedCount = 0;
        let alreadyValidCount = 0;
        let failedCount = 0;

        // 2. PROCESS PERSONAS
        const fixedPersonas = personas.map((persona: any) => {
            const currentId = persona.actuarial_logic?.target_plan_id;

            // Case A: ID is already valid
            if (currentId && planIdSet.has(currentId)) {
                alreadyValidCount++;
                return persona;
            }

            // Case B: ID is broken or missing -> Attempt Fix
            const match = findBestMatch(currentId, availablePlanIds);

            if (match) {
                console.log(`✅ FIXED: ${persona.slug}`);
                console.log(`   Was: "${currentId}"`);
                console.log(`   Now: "${match.id}" (Score: ${match.score.toFixed(1)})`);

                fixedCount++;

                return {
                    ...persona,
                    actuarial_logic: {
                        ...persona.actuarial_logic,
                        target_plan_id: match.id
                    }
                };
            } else {
                console.log(`❌ FAILED: ${persona.slug}`);
                console.log(`   No safe match found for: "${currentId}"`);
                failedCount++;
                return persona;
            }
        });

        // 3. SAVE OUTPUT
        fs.writeFileSync(outputPath, formatAsTsObject(fixedPersonas));

        console.log("\n==========================");
        console.log(`✅ Repair Complete`);
        console.log(`   - Already Valid: ${alreadyValidCount}`);
        console.log(`   - Fixed:         ${fixedCount}`);
        console.log(`   - Unresolved:    ${failedCount}`);
        console.log(`   - Output saved to: ${outputPath}`);
        console.log(`\n👉 Run: 'npx tsx scripts/verify-links.ts' next to verify the results.`);

    } catch (e) {
        console.error("Critical Error:", (e as Error).message);
    }
}

main();