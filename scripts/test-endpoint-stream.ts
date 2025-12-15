import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testEndpointStream(port: number = 3000) {
    console.log(`\n--- Testing Local Endpoint Stream on Port ${port} ---`);
    console.log('Ensure your dev server is running (npm run dev)');

    try {
        const response = await fetch(`http://localhost:${port}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'user', content: 'What are the benefits of this plan?' }
                ],
                // Minimal context plan to satisfy the route's requirements
                contextPlan: {
                    identity: { plan_name: 'Test Discovery Classic' },
                    price: 1500,
                    savings_annual: 0,
                    network_restriction: 'Any Hospital',
                    defined_baskets: ['GP Visits', 'Medicine'],
                    procedure_copays: ['None'],
                    red_flag: 'Standard limitations apply'
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        if (!response.body) {
            throw new Error('No response body received');
        }

        console.log('Response connection established. Reading stream...');
        const decoder = new TextDecoder();

        // Handle Node.js fetch stream
        // @ts-ignore
        for await (const chunk of response.body) {
            const text = decoder.decode(chunk as BufferSource, { stream: true });
            process.stdout.write(text);
        }

        console.log('\n\n--- Stream Complete ---');

    } catch (e) {
        console.error('Test Failed:', e);
        console.log('Make sure "npm run dev" is running in another terminal.');
    }
}

testEndpointStream();