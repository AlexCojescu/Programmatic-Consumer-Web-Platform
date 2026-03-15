import {
  streamText,
  UIMessage,
  convertToModelMessages,
  InferUITools,
  UIDataTypes,
  stepCountIs,
} from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { rateLimitResponse } from "@/lib/rate-limit";
import { parseBody, chatBodySchema } from "@/lib/validation";

const tools = {
  web_search: anthropic.tools.webSearch_20250305({
    maxUses: 1,
  }) as any,
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
  try {
    const rateLimited = rateLimitResponse(req);
    if (rateLimited) return rateLimited;

    const parsed = await parseBody(req, chatBodySchema);
    if (parsed instanceof Response) return parsed;
    const { messages } = parsed;

    const result = streamText({
      // model: openai.responses("gpt-5-nano"),
      model: anthropic("claude-sonnet-4-20250514"),
      messages: convertToModelMessages(messages as ChatMessage[]),
      tools,
      stopWhen: stepCountIs(2),
    });

    return result.toUIMessageStreamResponse({
      sendSources: true,
    });
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
