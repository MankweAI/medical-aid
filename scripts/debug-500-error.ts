import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function debugEndpoint(port: number = 3000) {
    console.log(`\n--- Debugging Local Endpoint on Port ${port} ---`);
    console.log('Target: http://localhost:3000/api/chat');

    try {
        const response = await fetch(`http://localhost:${port}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'user', content: 'Debug test' }
                ],
                // Provide minimal valid context to pass destructuring
                contextPlan: {
                    identity: { plan_name: 'Debug Plan' },
                    price: 0,
                    savings_annual: 0,
                    network_restriction: 'None',
                    defined_baskets: ['None'],
                    procedure_copays: ['None'],
                    red_flag: 'None'
                }
            })
        });

        console.log(`\nHTTP Status: ${response.status} ${response.statusText}`);

        // Always read the text, even if it's an error
        const text = await response.text();
        console.log('Response Body (Error Details):');
        console.log('---------------------------------------------------');
        console.log(text);
        console.log('---------------------------------------------------');

    } catch (e) {
        console.error('Connection Failed:', e);
        console.log('Ensure "npm run dev" is running.');
    }
}

debugEndpoint();