import {
  UIMessage,
  UIDataTypes,
  streamText,
  tool,
  convertToModelMessages,
  stepCountIs,
  InferUITools,
  experimental_generateImage as generateImage,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { rateLimitResponse } from "@/lib/rate-limit";
import { parseBody, chatBodySchema } from "@/lib/validation";

const tools = {
  generateImage: tool({
    description: "Generate an image",
    inputSchema: z.object({
      prompt: z.string().max(4000).describe("The prompt to generate an image for"),
    }),
    execute: async ({ prompt }) => {
      const { image } = await generateImage({
        model: openai.imageModel("dall-e-3"),
        prompt,
        size: "1024x1024",
        providerOptions: {
          openai: { style: "vivid", quality: "hd" },
        },
      });
      return image.base64;
    },
    toModelOutput: () => {
      // Returning base64 image will exceed the context window of the model. Return a placeholder text instead.
      return {
        type: "content",
        value: [
          {
            type: "text",
            text: "generate image in base64",
          },
        ],
      };
    },
  }),
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
      model: openai("gpt-5-mini"),
      messages: convertToModelMessages(messages as ChatMessage[]),
      tools,
      stopWhen: stepCountIs(2),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
