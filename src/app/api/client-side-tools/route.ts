// app/api/client-side-tools/route.ts

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
import ImageKit from "imagekit";
import { rateLimitResponse } from "@/lib/rate-limit";
import { parseBody, chatBodySchema } from "@/lib/validation";
import { getImageKitConfig } from "@/lib/env";

const uploadImage = async (image: string) => {
  const { publicKey, privateKey, urlEndpoint } = getImageKitConfig();
  const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

  const response = await imagekit.upload({
    file: image,
    fileName: "my_file_name.jpg",
  });

  return response.url;
};

const tools = {
  generateImage: tool({
    description: "Generate an image",
    inputSchema: z.object({
      prompt: z.string().describe("The prompt to generate an image for"),
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

      const imageUrl = await uploadImage(image.base64);

      return imageUrl;
    },
  }),
  changeBackground: tool({
    description:
      "Replace image background with AI-generated scenes based on text prompt",
    inputSchema: z.object({
      imageUrl: z.string().describe("URL of the uploaded image"),
      backgroundPrompt: z
        .string()
        .describe(
          'Description of the new background (e.g., "tropical beach sunset", "modern office", "mountain landscape")'
        ),
    }),
    outputSchema: z.string().describe("The transformed image URL"),
  }),
  removeBackground: tool({
    description: "Remove the background of an image",
    inputSchema: z.object({
      imageUrl: z.string().describe("URL of the uploaded image"),
    }),
    outputSchema: z.string().describe("The transformed image URL"),
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
      model: openai("gpt-5-nano"),
      messages: convertToModelMessages(messages as ChatMessage[]),
      tools,
      stopWhen: stepCountIs(3),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
