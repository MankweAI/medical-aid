import dotenv from 'dotenv';
import path from 'path';
import { openai } from '@ai-sdk/openai';
import { generateText, streamText } from 'ai';

// 1. Load Environment Variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testOpenAI() {
    console.log('--- Testing OpenAI Direct Connection ---');

    // Check API Key
    const apiKey = process.env.OPENAI_API_KEY;
    console.log('API Key Status:', apiKey ? 'Present' : 'Missing');

    if (!apiKey) {
        console.error('Error: OPENAI_API_KEY not found in .env.local');
        console.error('Please ensure you have a .env.local file with your key.');
        process.exit(1);
    }

    try {
        // 2. Test Simple Generation (Block response)
        console.log('\n1. Testing generateText (Block response)...');
        console.log('Sending prompt: "Say Hello"...');

        const { text } = await generateText({
            model: openai('gpt-4o-mini'),
            messages: [
                { role: 'user', content: 'Say "Hello, World!"' }
            ],
        });
        console.log('Success! Response:', text);

        // 3. Test Streaming (Stream response)
        console.log('\n2. Testing streamText (Streaming response)...');
        console.log('Sending prompt: "Count to 5"...');

        const result = streamText({
            model: openai('gpt-4o-mini'),
            messages: [
                { role: 'user', content: 'Count to 5.' }
            ],
        });

        process.stdout.write('Stream output: ');
        for await (const chunk of result.textStream) {
            process.stdout.write(chunk);
        }
        console.log('\n\n--- Test Complete ---');

    } catch (error) {
        console.error('\nAPI Connection Failed:', error);
        if ((error as any).status === 401) {
            console.error('Hint: Your API Key appears to be invalid.');
        } else if ((error as any).status === 429) {
            console.error('Hint: You may have run out of credits or hit a rate limit.');
        }
    }
}

testOpenAI();
