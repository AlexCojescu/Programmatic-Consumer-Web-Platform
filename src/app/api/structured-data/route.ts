import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { recipeSchema } from "./schema";
import { rateLimitResponse } from "@/lib/rate-limit";
import { parseBody, dishBodySchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const rateLimited = rateLimitResponse(req);
    if (rateLimited) return rateLimited;

    const parsed = await parseBody(req, dishBodySchema);
    if (parsed instanceof Response) return parsed;
    const { dish } = parsed;

    const result = streamObject({
      model: openai("gpt-5-nano"),
      schema: recipeSchema,
      prompt: `Generate a recipe for ${dish}`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error generating recipe:", error);
    return new Response("Failed to generate recipe", { status: 500 });
  }
}
