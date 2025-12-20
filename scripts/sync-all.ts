import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { PLANS } from '../data/plans';
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

async function syncAll() {
    console.log('🔄 Starting Full Data Synchronization...\n');

    // ==============================
    // 1. CLEAR PERSONAS FIRST (due to FK constraint)
    // ==============================
    console.log('🗑️ Clearing existing personas from database...');
    const { error: deletePersonasError } = await supabase
        .from('personas')
        .delete()
        .neq('slug', '');

    if (deletePersonasError) {
        console.error('❌ Error clearing personas:', deletePersonasError.message);
        return;
    }
    console.log('✓ Personas cleared.\n');

    // ==============================
    // 2. CLEAR PLANS
    // ==============================
    console.log('🗑️ Clearing existing plans from database...');
    const { error: deletePlansError } = await supabase
        .from('plans')
        .delete()
        .neq('id', '');

    if (deletePlansError) {
        console.error('❌ Error clearing plans:', deletePlansError.message);
        return;
    }
    console.log('✓ Plans cleared.\n');

    // ==============================
    // 3. INSERT PLANS
    // ==============================
    // Deduplicate plans by ID (keep first occurrence)
    const uniquePlans = PLANS.filter((plan, index, self) =>
        index === self.findIndex(p => p.id === plan.id)
    );

    console.log(`📥 Inserting ${uniquePlans.length} unique plans into database (${PLANS.length - uniquePlans.length} duplicates removed)...`);
    const planRows = uniquePlans.map((plan) => ({
        id: plan.id,
        scheme_name: plan.identity.scheme_name,
        plan_name: plan.identity.plan_name,
        data: plan // Store full plan object in JSONB column
    }));

    const { error: insertPlansError } = await supabase
        .from('plans')
        .insert(planRows);

    if (insertPlansError) {
        console.error('❌ Error inserting plans:', insertPlansError.message);
        console.error('💡 Details:', insertPlansError);
        return;
    }
    console.log('✓ Plans inserted.\n');

    // ==============================
    // 4. INSERT PERSONAS
    // ==============================
    console.log(`📥 Inserting ${PERSONAS.length} personas into database...`);
    const personaRows = PERSONAS.map((p) => ({
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

    const { error: insertPersonasError } = await supabase
        .from('personas')
        .insert(personaRows);

    if (insertPersonasError) {
        console.error('❌ Error inserting personas:', insertPersonasError.message);
        if (insertPersonasError.message.includes('foreign key constraint')) {
            console.error('💡 Tip: Some target_plan_ids may not exist in the plans table.');
        }
        return;
    }
    console.log('✓ Personas inserted.\n');

    console.log('✅ Full synchronization complete!');
    console.log(`   📊 Plans: ${PLANS.length}`);
    console.log(`   📊 Personas: ${PERSONAS.length}`);
}

// Execute the sync
syncAll()
    .catch((err) => {
        console.error('💥 Unhandled error during sync:', err);
        process.exit(1);
    });
