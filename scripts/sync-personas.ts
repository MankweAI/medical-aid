import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { PERSONAS } from '../data/personas-backup';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase environment variables.');
    process.exit(1);
}

// Initialize Supabase client with Service Role Key to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function syncPersonas() {
    console.log('🔄 Starting Persona Synchronization...');
    console.log(`📊 Found ${PERSONAS.length} personas locally.`);

    // 1. Clear existing personas in the database
    console.log('🗑️ Clearing existing personas from database...');
    const { error: deleteError } = await supabase
        .from('personas')
        .delete()
        .neq('slug', ''); // Effectively deletes all rows

    if (deleteError) {
        console.error('❌ Error clearing personas:', deleteError.message);
        return;
    }

    // 2. Map local PERSONAS to database rows
    const dbRows = PERSONAS.map((p) => ({
        slug: p.slug,
        code: p.code,
        title: p.meta.title,
        target_plan_id: p.actuarial_logic?.target_plan_id ?? '',
        display_title: p.display_title,
        human_insight: p.human_insight,
        hero_image_tag: p.hero_image_tag,
        ui_priority: p.ui_priority,
        data: p, // Store full object in JSONB column
        updated_at: new Date().toISOString()
    }));

    // 3. Perform bulk insertion
    console.log(`📥 Inserting ${dbRows.length} personas into database...`);
    const { error: insertError } = await supabase
        .from('personas')
        .insert(dbRows);

    if (insertError) {
        console.error('❌ Error inserting personas:', insertError.message);
        if (insertError.message.includes('foreign key constraint')) {
            console.error('💡 Tip: Ensure all target_plan_ids exist in the "plans" table first.');
        }
    } else {
        console.log('✅ Successfully replaced all personas in the database.');
    }
}

// Execute the sync
syncPersonas()
    .catch((err) => {
        console.error('💥 Unhandled error during sync:', err);
        process.exit(1);
    });