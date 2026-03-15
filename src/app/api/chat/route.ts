// app/api/chat/route.ts
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { retrieveContext, RELEVANCE_THRESHOLD, loadEmbeddingCache } from "@/lib/rag/retrieve";
import { rateLimitResponse } from "@/lib/rate-limit";
import { parseBody, chatBodySchema } from "@/lib/validation";

const BASE_SYSTEM =
  "You speak as the business described in the context below (e.g. Programmatic). The user is asking about that business, not about their own. Questions like 'what do you do', 'what does the company do', 'tell me about you', or 'what do you offer' mean: describe this business from the context. Use the context below to answer. Do not offer to help them write a description of their own company or ask them for their industry or services. Only say you don't have that information if the context clearly does not contain the answer. Be concise and professional.";

const OFF_TOPIC_SYSTEM =
  "You must reply with exactly the following message, nothing else: This question doesn't seem related to our business. Please ask about our services, products, pricing, or how we can help you. Keep your response to that single sentence.";

const NO_KNOWLEDGE_BASE_SYSTEM =
  "You must reply with exactly the following message, nothing else: The knowledge base is not loaded right now. Please try again later or contact us directly. Keep your response to that single sentence.";

export async function POST(req: Request) {
  try {
    const rateLimited = rateLimitResponse(req);
    if (rateLimited) return rateLimited;

    const parsed = await parseBody(req, chatBodySchema);
    if (parsed instanceof Response) return parsed;
    const { messages } = parsed;

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    const query = typeof lastUserMessage?.content === "string" ? lastUserMessage.content.trim() : "";
    const cached = loadEmbeddingCache();
    const cacheExists = cached != null && cached.length > 0;
    const { context, topScore } = query ? await retrieveContext(query) : { context: "", topScore: null };

    // No embedding cache: refuse to answer so we never reply from general knowledge
    if (!cacheExists) {
      const result = streamText({
        model: openai("gpt-5-nano"),
        messages: [
          { role: "system", content: NO_KNOWLEDGE_BASE_SYSTEM },
          ...convertToModelMessages(messages as UIMessage[]),
        ],
      });
      return result.toUIMessageStreamResponse();
    }

    // Refuse clearly off-topic questions when we have business context
    const hasContext = context.length > 0;
    const isOffTopic =
      hasContext && query.length > 0 && topScore !== null && topScore < RELEVANCE_THRESHOLD;

    if (isOffTopic) {
      const result = streamText({
        model: openai("gpt-5-nano"),
        messages: [
          { role: "system", content: OFF_TOPIC_SYSTEM },
          ...convertToModelMessages(messages as UIMessage[]),
        ],
      });
      return result.toUIMessageStreamResponse();
    }

    // Inject retrieved context so the model can answer from business docs
    const systemContent = context
      ? `${BASE_SYSTEM}\n\n## Context from our business docs:\n\n${context}`
      : `${BASE_SYSTEM}\n\n(No matching context for this query; say you don't have that information.)`;

    const result = streamText({
      model: openai("gpt-5-nano"),
      messages: [
        { role: "system", content: systemContent },
        ...convertToModelMessages(messages as UIMessage[]),
      ],
    });

    result.usage.then((usage) => {
      console.log({
        messageCount: messages.length,
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
