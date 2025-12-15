
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

async function main() {
    console.log('Testing OpenAI API connection...');
    if (!process.env.OPENAI_API_KEY) {
        console.error('Error: OPENAI_API_KEY not found in environment');
        process.exit(1);
    }
    console.log('API Key found (length: ' + process.env.OPENAI_API_KEY.length + ')');

    try {
        const { text } = await generateText({
            model: openai('gpt-4o-mini'),
            prompt: 'Hello, are you responsive?',
        });
        console.log('Success! Response:', text);
    } catch (error: any) {
        console.error('API Error:', error);
    }
}

main();
