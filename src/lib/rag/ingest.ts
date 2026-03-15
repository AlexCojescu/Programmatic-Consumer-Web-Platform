import path from "node:path";
import fs from "node:fs";
import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { loadMarkdownDocs } from "./docs";
import type { CachedEmbedding } from "./retrieve";
import { getOpenAIApiKey } from "@/lib/env";

const EMBEDDING_MODEL = "text-embedding-3-small";
const CACHE_DIR = path.join(process.cwd(), "content-cache");
const CACHE_PATH = path.join(CACHE_DIR, "embeddings.json");

/**
 * Ingest all MD files from content/business-context: chunk, embed, and write cache.
 * Run via: npm run ingest (or call from an API route if you prefer).
 * Requires OPENAI_API_KEY in environment (e.g. .env.local).
 */
export async function runIngest(): Promise<{ chunks: number; path: string }> {
  getOpenAIApiKey(); // Fail fast with clear message if key missing
  const chunks = loadMarkdownDocs();
  if (chunks.length === 0) {
    return { chunks: 0, path: CACHE_PATH };
  }

  const embeddingModel = openai.embedding(EMBEDDING_MODEL);
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks.map((c) => c.text),
  });

  const cached: CachedEmbedding[] = chunks.map((chunk, i) => ({
    text: chunk.text,
    source: chunk.source,
    embedding: embeddings[i],
  }));

  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cached), "utf-8");

  return { chunks: cached.length, path: CACHE_PATH };
}
