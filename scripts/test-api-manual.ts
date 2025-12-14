
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function test(port: number) {
    console.log(`Testing port ${port}...`);
    try {
        const res = await fetch(`http://localhost:${port}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    // REPRODUCTION CASE: Assistant message with parts (Welcome message)
                    { role: 'assistant', content: [{ type: 'text', text: 'Welcome Message Parts' }] },
                    { role: 'user', content: [{ type: 'text', text: 'Hello' }] }
                ],
                contextPlan: { identity: { plan_name: 'Test Plan' } }
            })
        });
        console.log(`Port ${port} status:`, res.status, res.statusText);
        const text = await res.text();
        console.log(`Port ${port} response preview:`, text.substring(0, 100));
    } catch (e) {
        console.log(`Port ${port} failed:`, (e as Error).message);
    }
}

test(3000);
