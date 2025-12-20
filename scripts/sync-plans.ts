import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { PLANS } from '../data/plans';

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

async function syncPlans() {
    console.log('🔄 Starting Plans Synchronization...');
    console.log(`📊 Found ${PLANS.length} plans locally.`);

    // 1. Clear existing plans in the database
    console.log('🗑️ Clearing existing plans from database...');
    const { error: deleteError } = await supabase
        .from('plans')
        .delete()
        .neq('id', ''); // Effectively deletes all rows

    if (deleteError) {
        console.error('❌ Error clearing plans:', deleteError.message);
        return;
    }

    // 2. Map local PLANS to database rows - store full object in JSONB
    const dbRows = PLANS.map((plan) => ({
        id: plan.id,
        scheme_name: plan.scheme_name,
        plan_name: plan.plan_name,
        plan_type: plan.plan_type,
        data: plan, // Store full plan object in JSONB column
        updated_at: new Date().toISOString()
    }));

    // 3. Perform bulk insertion
    console.log(`📥 Inserting ${dbRows.length} plans into database...`);
    const { error: insertError } = await supabase
        .from('plans')
        .insert(dbRows);

    if (insertError) {
        console.error('❌ Error inserting plans:', insertError.message);
        console.error('💡 Details:', insertError);
    } else {
        console.log('✅ Successfully replaced all plans in the database.');
    }
}

// Execute the sync
syncPlans()
    .catch((err) => {
        console.error('💥 Unhandled error during sync:', err);
        process.exit(1);
    });
