import fs from 'fs';
import path from 'path';

// --- 1. HELPERS ---

function parseInputData(rawContent: string): any {
    if (!rawContent || rawContent.trim() === '') return [];

    // Clean comments
    const cleanContent = rawContent.replace(/("(?:[^"\\]|\\.)*")|(\/\/[^\n\r]*|\/\*[\s\S]*?\*\/)/g, (match, str) => {
        if (str) return str;
        return '';
    }).trim();

    // Find array boundaries
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

function formatAsTsObject(data: any): string {
    const jsonLines = JSON.stringify(data, null, 4).split('\n');
    const tsLines = jsonLines.map(line => {
        return line.replace(/^(\s*)"([a-zA-Z_]\w*)"(\s*:)/, '$1$2$3');
    });
    return `import { Persona } from '@/utils/persona';\n\nexport const PERSONAS: Persona[] = ${tsLines.join('\n')};\n`;
}

// --- 2. LOGIC: LEVENSHTEIN DISTANCE ---
// Standard algorithm to measure difference between two strings
function levenshtein(a: string, b: string): number {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) { matrix[i] = [i]; }
    for (let j = 0; j <= a.length; j++) { matrix[0][j] = j; }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1)); // deletion
            }
        }
    }
    return matrix[b.length][a.length];
}

// --- 3. MAIN MATCHING LOGIC ---

function findAggressiveMatch(brokenId: string, availableIds: string[]): { id: string; method: string } | null {
    const target = brokenId.toLowerCase();
    const targetBrand = target.split('-')[0]; // e.g., "bestmed"

    // Filter candidates to SAME BRAND only (Safety Rail)
    const brandCandidates = availableIds.filter(id => id.toLowerCase().startsWith(targetBrand));
    if (brandCandidates.length === 0) return null;

    // STRATEGY 1: YEAR AGNOSTIC MATCH
    // Remove "2026", "2025" and compare
    const normalize = (s: string) => s.replace(/-202[0-9]/, '');
    const targetNorm = normalize(target);

    for (const cand of brandCandidates) {
        if (normalize(cand) === targetNorm) {
            return { id: cand, method: "Year/Version Match" };
        }
    }

    // STRATEGY 2: SERIES CONTAINMENT
    // If target is "bestmed-beat1-fullchoice" and candidate is "bestmed-beat1-network"
    // They share "bestmed-beat1".
    let bestSeriesMatch = null;
    let maxOverlap = 0;

    for (const cand of brandCandidates) {
        const tParts = target.split('-');
        const cParts = cand.split('-');
        let overlap = 0;

        // Count matching tokens from the start
        for (let i = 0; i < Math.min(tParts.length, cParts.length); i++) {
            if (tParts[i] === cParts[i]) overlap++;
            else break; // Stop at first mismatch
        }

        // If they share Brand + Series (at least 2 tokens), consider it
        if (overlap >= 2 && overlap > maxOverlap) {
            maxOverlap = overlap;
            bestSeriesMatch = cand;
        }
    }
    if (bestSeriesMatch) {
        return { id: bestSeriesMatch, method: `Series Match (${maxOverlap} matching parts)` };
    }

    // STRATEGY 3: CLOSEST SPELLING (Levenshtein)
    // Last resort: Find the string with the fewest edits
    let bestLev = null;
    let minDist = 100;

    for (const cand of brandCandidates) {
        const dist = levenshtein(target, cand);
        // Threshold: Don't match if it's wildly different (e.g. > 15 edits)
        if (dist < minDist && dist < 15) {
            minDist = dist;
            bestLev = cand;
        }
    }
    if (bestLev) {
        return { id: bestLev, method: `Fuzzy Spelling (Dist: ${minDist})` };
    }

    return null;
}

// --- 4. EXECUTION ---

async function main() {
    const personasPath = path.resolve('./data/personas.ts');
    const plansPath = path.resolve('./data/plans.ts');
    const outputPath = path.resolve('./data/personas_fixed_force.ts');

    console.log("🚑 Advanced Link Fixer (Force Mode)");
    console.log("===================================");

    try {
        const personas = parseInputData(fs.readFileSync(personasPath, 'utf-8'));
        const plans = parseInputData(fs.readFileSync(plansPath, 'utf-8'));
        const availablePlanIds = plans.map((p: any) => p.id);
        const planIdSet = new Set(availablePlanIds);

        let fixedCount = 0;
        let failedCount = 0;

        const fixedPersonas = personas.map((persona: any) => {
            const currentId = persona.actuarial_logic?.target_plan_id;

            if (!currentId) return persona; // Can't fix missing field
            if (planIdSet.has(currentId)) return persona; // Already valid

            // Attempt Aggressive Match
            const match = findAggressiveMatch(currentId, availablePlanIds);

            if (match) {
                console.log(`\n🔧 FIXED: ${persona.slug}`);
                console.log(`   Old: "${currentId}"`);
                console.log(`   New: "${match.id}"`);
                console.log(`   Via: ${match.method}`);

                fixedCount++;
                return {
                    ...persona,
                    actuarial_logic: {
                        ...persona.actuarial_logic,
                        target_plan_id: match.id
                    }
                };
            } else {
                console.log(`\n❌ FAILED: ${persona.slug}`);
                console.log(`   Target: "${currentId}"`);
                console.log(`   Reason: No match found within same Brand.`);
                failedCount++;
                return persona;
            }
        });

        fs.writeFileSync(outputPath, formatAsTsObject(fixedPersonas));

        console.log("\n===================================");
        console.log(`✅ Force Repair Complete`);
        console.log(`   - Fixed: ${fixedCount}`);
        console.log(`   - Still Broken: ${failedCount}`);
        console.log(`   - Output: ${outputPath}`);

    } catch (e) {
        console.error("Critical Error:", (e as Error).message);
    }
}

main();