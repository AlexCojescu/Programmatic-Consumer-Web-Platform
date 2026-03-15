import { openai } from "@ai-sdk/openai";
import { experimental_transcribe as transcribe } from "ai";
import { rateLimitResponse } from "@/lib/rate-limit";
import { parseTranscribeForm } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const rateLimited = rateLimitResponse(req);
    if (rateLimited) return rateLimited;

    const formResult = await parseTranscribeForm(req);
    if (formResult instanceof Response) return formResult;
    const { audio: audioFile } = formResult;

    const arrayBuffer = await audioFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const transcript = await transcribe({
      model: openai.transcription("whisper-1"),
      audio: uint8Array,
    });

    // Return the transcript data
    return Response.json(transcript);
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return new Response("Failed to transcribe audio", { status: 500 });
  }
}
