import dotenv from 'dotenv';
import path from 'path';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function run() {
    console.log('--- Reproducing Crash ---');

    // 1. Simulate the payload from the client
    const messages = [
        { role: 'user', content: 'Debug test' }
        // Note: m.parts is undefined here
    ];

    const systemPrompt = 'You are a test assistant.';

    try {
        console.log('Calling streamText...');

        // 2. Exact logic from your route.ts
        const result = streamText({
            model: openai('gpt-4o-mini'),
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages.map((m: any) => {
                    let content = m.parts || m.content;

                    // ROBUSTNESS: Always flatten array content to string
                    if (Array.isArray(content)) {
                        content = content
                            .filter((p: any) => p.type === 'text')
                            .map((p: any) => p.text)
                            .join('');
                    }

                    // Potential Issue: If content is undefined/null here, 
                    // it passes { content: undefined } to the SDK.
                    return {
                        role: m.role,
                        content
                    };
                })
            ],
        });

        console.log('Stream started successfully (no crash yet).');
        // Force consumption to trigger internal processing
        for await (const chunk of result.textStream) {
            process.stdout.write(chunk);
        }

    } catch (e: any) {
        console.error('\nCRASH REPRODUCED:');
        console.error(e.message);
        console.error(e.stack);
    }
}

run();