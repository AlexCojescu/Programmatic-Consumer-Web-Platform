import { openai } from "@ai-sdk/openai";
import { experimental_generateSpeech as generateSpeech } from "ai";
import { rateLimitResponse } from "@/lib/rate-limit";
import { parseBody, speechBodySchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const rateLimited = rateLimitResponse(req);
    if (rateLimited) return rateLimited;

    const parsed = await parseBody(req, speechBodySchema);
    if (parsed instanceof Response) return parsed;
    const { text } = parsed;

    const { audio } = await generateSpeech({
      model: openai.speech("tts-1"),
      text,
    });

    return new Response(audio.uint8Array, {
      headers: {
        "Content-Type": audio.mediaType || "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("Error generating speech:", error);
    return new Response("Failed to generate speech", { status: 500 });
  }
}
