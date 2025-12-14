// @ts-nocheck
const fs = require('fs');
const path = require('path');

async function testServer(port) {
    console.log(`Testing port ${port}...`);
    try {
        const res = await fetch(`http://localhost:${port}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: [{ type: 'text', text: 'Invalid System Message' }] },
                    { role: 'user', content: 'Hello' }
                ],
                contextPlan: { identity: { plan_name: 'Test Plan' } }
            })
        });
        console.log(`Port ${port} status:`, res.status, res.statusText);
        const text = await res.text();
        console.log(`Port ${port} response preview:`, text.substring(0, 2000));
    } catch (e) {
        console.log(`Port ${port} failed:`, e.cause ? e.cause.code : e.message);
    }
}

async function checkEnv() {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        console.log('.env.local exists.');
        const content = fs.readFileSync(envPath, 'utf8');
        const keyLine = content.split('\n').find(l => l.startsWith('OPENAI_API_KEY='));
        if (keyLine) {
            console.log('OPENAI_API_KEY found in file:', keyLine.substring(0, 20) + '...');
        } else {
            console.log('OPENAI_API_KEY NOT found in .env.local file content.');
        }
    } else {
        console.log('.env.local DOES NOT exist.');
    }
}

async function main() {
    await checkEnv();
    await testServer(3000);
    await testServer(3001);
}

main();
