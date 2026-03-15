/**
 * Strict input validation and sanitization (OWASP: schema-based, type checks, length limits, reject unexpected fields).
 * Use these schemas for all user-supplied request bodies to prevent injection and oversized payloads.
 */

import { z } from "zod";

// --- Length limits (sensible defaults; tune per use case) ---
export const LIMITS = {
  /** Max characters per prompt or single text field */
  MAX_PROMPT_LENGTH: 32_000,
  /** Max characters per message content (string) */
  MAX_MESSAGE_CONTENT_LENGTH: 32_000,
  /** Max number of messages in a chat request */
  MAX_MESSAGES_COUNT: 100,
  /** Max characters for TTS text */
  MAX_SPEECH_TEXT_LENGTH: 4_096,
  /** Max characters for dish/recipe-style input */
  MAX_DISH_LENGTH: 500,
  /** Max size for uploaded audio (bytes) - ~5 MB */
  MAX_AUDIO_FILE_SIZE: 5 * 1024 * 1024,
  /** Allowed audio MIME types for transcribe */
  ALLOWED_AUDIO_TYPES: ["audio/webm", "audio/mpeg", "audio/mp3", "audio/wav", "audio/mp4", "audio/x-m4a"],
} as const;

// --- Reusable primitives ---
const roleSchema = z.enum(["user", "system", "assistant"]);
// Parts may include text, tool-invocation, image, etc.; we only constrain text length and array size.
const contentPartSchema = z
  .object({
    type: z.string(),
    text: z.string().max(LIMITS.MAX_MESSAGE_CONTENT_LENGTH).optional(),
  })
  .passthrough();

/**
 * Single chat message (strict: only id, role, content, parts at top level).
 * Matches AI SDK UIMessage shape so convertToModelMessages accepts validated output.
 * Content may be string or array of parts; parts is optional (SDK may send either).
 */
export const chatMessageSchema = z
  .object({
    id: z.string().max(200).optional(),
    role: roleSchema,
    content: z
      .union([
        z.string().max(LIMITS.MAX_MESSAGE_CONTENT_LENGTH),
        z.array(contentPartSchema).max(100),
      ])
      .optional(),
    parts: z.array(z.record(z.unknown())).max(100).optional(),
  })
  .strict();

/** Body for chat-style endpoints: messages array only; reject unexpected top-level keys. */
export const chatBodySchema = z
  .object({
    messages: z.array(chatMessageSchema).min(0).max(LIMITS.MAX_MESSAGES_COUNT),
  })
  .strict();

/** Body with a single prompt (completion, stream, generate-image, etc.). */
export const promptBodySchema = z
  .object({
    prompt: z.string().min(1, "Prompt is required").max(LIMITS.MAX_PROMPT_LENGTH),
  })
  .strict();

/** Body for generate-speech: text only. */
export const speechBodySchema = z
  .object({
    text: z.string().min(1, "Text is required").max(LIMITS.MAX_SPEECH_TEXT_LENGTH),
  })
  .strict();

/** Body for structured-data recipe: dish name. */
export const dishBodySchema = z
  .object({
    dish: z.string().min(1).max(LIMITS.MAX_DISH_LENGTH),
  })
  .strict();

/** Body for structured-array (e.g. pokemon type): single string type. */
export const typeBodySchema = z
  .object({
    type: z.string().min(1).max(200),
  })
  .strict();

/** Body for structured-enum (e.g. sentiment): text to classify. */
export const textBodySchema = z
  .object({
    text: z.string().min(1).max(LIMITS.MAX_PROMPT_LENGTH),
  })
  .strict();

export type ChatBody = z.infer<typeof chatBodySchema>;
export type PromptBody = z.infer<typeof promptBodySchema>;
export type SpeechBody = z.infer<typeof speechBodySchema>;
export type DishBody = z.infer<typeof dishBodySchema>;
export type TypeBody = z.infer<typeof typeBodySchema>;
export type TextBody = z.infer<typeof textBodySchema>;

/**
 * Parse and validate JSON body; returns 400 Response on failure (safe error message, no stack).
 * Use in API routes: const parsed = await parseBody(req, schema); if (parsed instanceof Response) return parsed;
 */
export async function parseBody<T>(
  req: Request,
  schema: z.ZodType<T>
): Promise<T | Response> {
  try {
    const raw = await req.json();
    const result = schema.safeParse(raw);
    if (!result.success) {
      const first = result.error.flatten().fieldErrors;
      const message =
        typeof first === "object" && first && Object.keys(first).length > 0
          ? Object.entries(first)
              .map(([k, v]) => `${k}: ${Array.isArray(v) ? v[0] : v}`)
              .join("; ")
          : "Invalid request body";
      return new Response(
        JSON.stringify({ error: message }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    return result.data;
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * Validate multipart form: audio file for transcribe. Enforces type and size.
 */
export async function parseTranscribeForm(req: Request): Promise<{ audio: File } | Response> {
  try {
    const formData = await req.formData();
    const audio = formData.get("audio");
    if (!audio || !(audio instanceof File)) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid 'audio' file" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (audio.size > LIMITS.MAX_AUDIO_FILE_SIZE) {
      return new Response(
        JSON.stringify({ error: `Audio file too large (max ${LIMITS.MAX_AUDIO_FILE_SIZE / 1024 / 1024} MB)` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const type = (audio.type || "").toLowerCase();
    const allowed = LIMITS.ALLOWED_AUDIO_TYPES.some((t) => type.includes(t) || type === t);
    if (!allowed && type !== "") {
      return new Response(
        JSON.stringify({ error: `Unsupported audio type. Allowed: ${LIMITS.ALLOWED_AUDIO_TYPES.join(", ")}` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    return { audio };
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid form data" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
