import 'dotenv/config';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local and .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
const BASE_URL = 'http://localhost:3000'; // Or your preview URL

async function smokeTest() {
    console.log("🚀 Starting Smoke Test...");

    // 1. Get all personas
    const { data: personas } = await supabase.from('personas').select('slug');

    if (!personas || personas.length === 0) {
        console.error("❌ No personas found in DB!");
        return;
    }

    console.log(`📋 Found ${personas.length} personas. Testing routes...`);

    let errors = 0;

    // 2. Ping loop
    for (const p of personas) {
        const url = `${BASE_URL}/personas/${p.slug}`;
        try {
            const res = await fetch(url);
            if (res.status === 200) {
                process.stdout.write("✅"); // Visual progress
            } else {
                console.error(`\n❌ FAILED: ${p.slug} returned ${res.status}`);
                errors++;
            }
        } catch (e) {
            console.error(`\n❌ CRASH: ${p.slug}`, e);
            errors++;
        }
    }

    console.log(`\n\n🏁 Test Complete. ${errors} errors found.`);
}

smokeTest();

