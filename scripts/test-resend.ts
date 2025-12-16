import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
    console.error('❌ RESEND_API_KEY is missing from .env.local');
    process.exit(1);
}

console.log(`Checking API Key: ${apiKey.slice(0, 5)}...${apiKey.slice(-4)}`);

const resend = new Resend(apiKey);

async function sendTestEmail() {
    console.log('Attempting to send test email...');
    try {
        const { data, error } = await resend.emails.send({
            from: 'Intellihealth Test <onboarding@resend.dev>',
            to: 'mankwemokgabudi@gmail.com',
            subject: 'Test Email from Script',
            html: '<p>This is a test email to verify Resend configuration.</p>'
        });

        if (error) {
            console.error('❌ Resend API Error:', error);
        } else {
            console.log('✅ Email queued successfully!');
            console.log('ID:', data?.id);
        }
    } catch (e) {
        console.error('❌ Unexpected Error:', e);
    }
}

sendTestEmail();
