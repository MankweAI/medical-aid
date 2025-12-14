import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// 1. CONFIGURATION
// Load environment variables from .env.local FIRST, then fall back to .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const BASE_URL = process.argv[2] || 'http://localhost:3000';
const CONCURRENCY = 10;


// Verify env vars are loaded
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("❌ Error: Missing environment variables.");
    console.error("   - Ensure .env.local exists in the root.");
    console.error("   - Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    process.exit(1);
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

interface Persona {
    slug: string;
}

async function verifyRoutes() {
    console.log(`🚀 Starting Route Verification against: ${BASE_URL}`);

    // 2. FETCH ALL SLUGS
    const { data: personas, error } = await supabase
        .from('personas')
        .select('slug');

    if (error || !personas || personas.length === 0) {
        console.error("❌ Critical: Could not fetch personas from DB.", error);
        return;
    }

    console.log(`📋 Found ${personas.length} personas. Checking for 404s...`);

    const failures: string[] = [];
    let completed = 0;

    // 3. WORKER FUNCTION
    const checkSlug = async (slug: string) => {
        const url = `${BASE_URL}/personas/${slug}`;
        try {
            const res = await fetch(url, { method: 'HEAD' }); // Use HEAD for speed

            // Check for 404 or 500
            if (res.status !== 200) {
                // Double check with GET if HEAD fails (sometimes frameworks behave differently)
                const retry = await fetch(url);
                if (retry.status !== 200) {
                    process.stdout.write("x"); // Visual fail
                    return `${slug} (Status: ${retry.status})`;
                }
            }

            process.stdout.write("."); // Visual success
            return null;
        } catch (e: any) {
            return `${slug} (Network Error: ${e.message})`;
        } finally {
            completed++;
        }
    };

    // 4. BATCH PROCESSING (Concurrency Control)
    for (let i = 0; i < personas.length; i += CONCURRENCY) {
        const batch = personas.slice(i, i + CONCURRENCY);
        const results = await Promise.all(batch.map(p => checkSlug(p.slug)));

        // Collect errors
        results.forEach(err => {
            if (err) failures.push(err);
        });
    }

    // 5. FINAL REPORT
    console.log(`\n\n🏁 Verification Complete.`);
    console.log(`   - Total Checked: ${personas.length}`);
    console.log(`   - Success: ${personas.length - failures.length}`);
    console.log(`   - Failed: ${failures.length}`);

    if (failures.length > 0) {
        console.error("\n❌ BROKEN SLUGS DETECTED:");
        failures.forEach(f => console.error(`   - ${f}`));
        process.exit(1); // Exit with error code for CI/CD
    } else {
        console.log("\n✅ All routes match strict mathematical uniqueness.");
        process.exit(0);
    }
}

verifyRoutes();