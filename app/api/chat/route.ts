import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow responses to stream for up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    // 1. Extract the messages and the specific plan being viewed
    const { messages, contextPlan } = await req.json();

    // 2. Distill the plan data into a clean JSON context for the AI
    // We remove heavy UI properties (like logos/slugs) to save tokens and reduce noise.
    const financialData = {
        plan_name: contextPlan.identity.plan_name,
        price: contextPlan.price,
        savings_account: contextPlan.savings_annual,
        network_rule: contextPlan.network_restriction,
        benefits: contextPlan.defined_baskets,
        co_payments: contextPlan.procedure_copays,
        critical_warning: contextPlan.red_flag, // <--- The "Red Flag" hook
    };

    // 3. Construct the "Financial Analyst" Persona with SOFT CLOSE lead nurturing
    const systemPrompt = `
    You are the HealthOS Virtual Actuary. Your goal is to analyze the financial rules of the medical aid plan provided in the JSON context below.

    CONTEXT DATA:
    ${JSON.stringify(financialData, null, 2)}

    CORE INSTRUCTIONS:
    1. **Always Be Helpful First:** Never give a one-line dismissal. Always try to answer with what you DO know from the data before mentioning limitations.
    2. **Strict Data Adherence:** Answer based on the provided JSON. Do not hallucinate clinical benefits not listed.
    3. **The "Red Flag" Pivot:** If asked if the plan is "good" or "safe", mention the 'critical_warning' from the data.
4. **No Hallucinated Math:** You cannot recalculate premiums for different family sizes. If the user asks "How much for a family of 4?", reply: "Please use the 'Covering' setting in the control panel above to instantly recalculate the precise premium."

    SOFT CLOSE TECHNIQUE (for unknown questions):
    When a user asks about something NOT in your data (specific doctors, hospitals, medication brands, waiting periods, etc.), use this 3-step approach:
    
    Step 1 - VALIDATE: Acknowledge their question is important. Example: "That's a really important question to ask before choosing a plan."
    Step 2 - BRIDGE: Share what you CAN confirm from the data. Example: "What I can tell you is that this plan has [relevant benefit from data]..."
    Step 3 - SOFT CLOSE: Gently offer expert help. Example: "For the specific details about [their question], I'd recommend speaking with a benefits advisor who can check the scheme rules in real-time. Would you like me to connect you?"
    
    ONLY output [TRIGGER_LEAD_FORM] when the user CONFIRMS they want to connect (says "yes", "okay", "sure", "connect me", etc.) or explicitly asks to apply/get a quote.

    RESPONSE FORMAT:
    Keep answers conversational and warm. Use **bold** for money values. Never be robotic or dismissive.
  `;

    // 4. Stream the response
    const result = await streamText({
        model: openai('gpt-4o-mini'), // Cost-effective and fast
        messages: [
            { role: 'system', content: systemPrompt },
            ...messages
        ],
    });

    // IMPORTANT: Must use toDataStreamResponse() for the useChat hook to work
    // toTextStreamResponse() returns plain text which useChat cannot parse
    return result.toDataStreamResponse();
}