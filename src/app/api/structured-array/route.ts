import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { pokemonSchema } from "./schema";
import { rateLimitResponse } from "@/lib/rate-limit";
import { parseBody, typeBodySchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const rateLimited = rateLimitResponse(req);
    if (rateLimited) return rateLimited;

    const parsed = await parseBody(req, typeBodySchema);
    if (parsed instanceof Response) return parsed;
    const { type } = parsed;

    const result = streamObject({
      model: openai("gpt-4o-mini"),
      output: "array",
      schema: pokemonSchema,
      prompt: `Generate a list of 5 ${type} type pokemon`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error generating pokemon:", error);
    return new Response("Failed to generate pokemon", { status: 500 });
  }
}
