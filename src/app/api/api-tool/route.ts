import {
  UIMessage,
  UIDataTypes,
  streamText,
  tool,
  convertToModelMessages,
  stepCountIs,
  InferUITools,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { rateLimitResponse } from "@/lib/rate-limit";
import { parseBody, chatBodySchema } from "@/lib/validation";
import { getWeatherApiKey } from "@/lib/env";

const tools = {
  getWeather: tool({
    description: "Get the weather for a location",
    inputSchema: z.object({
      city: z.string().max(200).describe("The city to get the weather for"),
    }),
    execute: async ({ city }) => {
      const apiKey = getWeatherApiKey();
      if (!apiKey) throw new Error("Weather API is not configured");
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`
      );
      const data = await response.json();
      const weatherData = {
        location: {
          name: data.location.name,
          country: data.location.country,
          localtime: data.location.localtime,
        },
        current: {
          temp_c: data.current.temp_c,
          condition: {
            text: data.current.condition.text,
            code: data.current.condition.code,
          },
        },
      };
      return weatherData;
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
      model: openai("gpt-5-nano"),
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
