import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { rateLimitResponse } from "@/lib/rate-limit";
import { parseBody, promptBodySchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const rateLimited = rateLimitResponse(req);
    if (rateLimited) return rateLimited;

    const parsed = await parseBody(req, promptBodySchema);
    if (parsed instanceof Response) return parsed;
    const { prompt } = parsed;

    const result = streamText({
      model: openai("gpt-4o-mini"),
      prompt,
    });

    // Log token usage after streaming completes
    result.usage.then((usage) => {
      console.log({
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming text:", error);
    return new Response("Failed to stream text", { status: 500 });
  }
}
