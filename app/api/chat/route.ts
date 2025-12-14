import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

// Allow responses to stream for up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    console.log('--- API/CHAT/ROUTE POST RECEIVED ---');
    try {
        const json = await req.json();
        const { messages, contextPlan } = json;
        console.log('Messages count:', messages?.length);
        console.log('Context Plan:', contextPlan?.identity?.plan_name);
        console.log('API Key Present:', !!process.env.OPENAI_API_KEY);

        if (!process.env.OPENAI_API_KEY) {
            console.error('CRITICAL: OPENAI_API_KEY is missing!');
            return new Response('Missing API Key', { status: 500 });
        }

        // 1. RATE LIMIT CHECK: "The 3-Strike Rule"
        // We count how many times the assistant has already replied in the conversation history.
        const assistantReplies = messages.filter((m: any) => m.role === 'assistant').length;

        // If they have already received 3 replies, we block the 4th request.
        if (assistantReplies >= 3) {
            // We return a "canned" stream that forces the soft close.
            return streamText({
                model: openai('gpt-4o-mini'),
                messages: [
                    {
                        role: 'system',
                        content: 'The user has reached their question limit. You must politely refuse to answer. Tell them: "You have reached your free question limit for this session. To continue exploring this plan, please verify your profile." Then, immediately append the code: [TRIGGER_LEAD_FORM]'
                    },
                    {
                        role: 'user',
                        content: 'I have another question.'
                    }
                ]
            }).toTextStreamResponse();
        }

        // 2. DATA DISTILLATION
        // We only pass the "Need to Know" data to the LLM to keep it focused and accurate.
        const financialData = {
            plan_name: contextPlan.identity.plan_name,
            price: contextPlan.price,
            savings_account: contextPlan.savings_annual,
            network_rule: contextPlan.network_restriction,
            benefits: contextPlan.defined_baskets,
            co_payments: contextPlan.procedure_copays,
            critical_warning: contextPlan.red_flag,
        };

        // 3. PROMPT ENGINEERING: "The HealthOS Analyst"
        // This prompt is designed to be "Anti-Hallucination" and "Sales-Aware".
        const systemPrompt = `
    You are the **HealthOS Senior Analyst**, an expert in South African medical schemes.
    Your goal is to explain the specific plan data provided below to the user.

    ### SOURCE OF TRUTH (JSON DATA):
    ${JSON.stringify(financialData, null, 2)}

    ### CRITICAL RULES:
    1.  **Strict Data Sovereignty:** ONLY answer based on the JSON data above. If a user asks about a benefit not listed (e.g., "Optometry" or "Dentistry" if not in the JSON), say: "That specific benefit isn't detailed in my current financial view." Do NOT guess.
    2.  **The "Red Flag" Pivot:** If the user asks if the plan is "good", "safe", or "recommended", you MUST mention the 'critical_warning' found in the data.
    3.  **Currency Formatting:** Always format money as **R**, e.g., **R1,200** or **R15,000**.
    4.  **Tone:** Professional, objective, and concise. Use bullet points for lists.

    ### SALES BEHAVIOR (The "Soft Close"):
    - **No Financial Advice:** Never say "You should buy this." Instead, say "This plan is structured for..."
    - **Handling Unknowns:** If asked about specific doctors, hospitals, or waiting periods (which are not in your JSON), use this response:
      "I can't verify specific providers or waiting periods in real-time. A human specialist can check that for you immediately. Would you like to connect?"
    - **Triggering the Lead:** If the user agrees to connect, asks for a human, or implies intent to proceed, append exactly this code at the end of your message: **[TRIGGER_LEAD_FORM]**
    `;

        // 4. GENERATE STREAM
        // Note: In AI SDK 4.0, streamText is synchronous (no 'await' needed)
        const result = streamText({
            model: openai('gpt-4o-mini'),
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages.map((m: any) => {
                    let content = m.parts || m.content;
                    // System messages must be strings in AI SDK v5
                    if (m.role === 'system' && Array.isArray(content)) {
                        content = content.map((p: any) => p.text).join('');
                    }
                    return {
                        role: m.role,
                        content
                    };
                })
            ],
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error('API ROUTE ERROR:', error);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: error.message,
            stack: error.stack,
            name: error.name
        }), { status: 500 });
    }
}