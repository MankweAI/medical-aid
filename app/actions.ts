'use server'

import { createClient } from '@/utils/supabase/server'; // This import is safe here

export async function submitLead(formData: FormData, context: { planName: string; persona: string }) {
    const supabase = await createClient();
    const phone = formData.get('phone') as string;

    const { error } = await supabase.from('leads').insert({
        phone: phone,
        persona_slug: context.persona,
        plan_id: context.planName,
        created_at: new Date().toISOString()
    });

    if (error) {
        console.error('Lead Error:', error);
        return { success: false, message: 'Failed to save lead.' };
    }

    return { success: true };
}