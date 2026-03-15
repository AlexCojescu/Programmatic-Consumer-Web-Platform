import { generateText } from "ai";
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

    const { text } = await generateText({
      model: openai("gpt-5-nano"),
      prompt,
    });

    return Response.json({ text });
  } catch (error) {
    console.error("Error generating text:", error);
    return Response.json({ error: "Failed to generate text" }, { status: 500 });
  }
}
