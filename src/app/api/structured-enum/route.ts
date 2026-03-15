import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { rateLimitResponse } from "@/lib/rate-limit";
import { parseBody, textBodySchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const rateLimited = rateLimitResponse(req);
    if (rateLimited) return rateLimited;

    const parsed = await parseBody(req, textBodySchema);
    if (parsed instanceof Response) return parsed;
    const { text } = parsed;

    const result = await generateObject({
      model: openai("gpt-5-mini"),
      output: "enum",
      enum: ["positive", "negative", "neutral"],
      prompt: `Classify the sentiment in this text: "${text}"`,
    });

    return result.toJsonResponse();
  } catch (error) {
    console.error("Error generating sentiment:", error);
    return new Response("Failed to generate sentiment", { status: 500 });
  }
}
