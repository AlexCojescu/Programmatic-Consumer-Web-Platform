import path from "node:path";
import fs from "node:fs";
import { embed, embedMany, cosineSimilarity } from "ai";
import { openai } from "@ai-sdk/openai";
import { loadMarkdownDocs } from "./docs";

const CACHE_PATH = path.join(process.cwd(), "content-cache", "embeddings.json");
const EMBEDDING_MODEL = "text-embedding-3-small";
const TOP_K = 6;
const MAX_CONTEXT_CHARS = 6000;

export type CachedEmbedding = {
  text: string;
  source: string;
  embedding: number[];
};

let memoryCache: CachedEmbedding[] | null = null;

function getCachePath(): string {
  return CACHE_PATH;
}

/**
 * Load embeddings from disk cache (or memory cache). Returns null if no cache.
 */
export function loadEmbeddingCache(): CachedEmbedding[] | null {
  if (memoryCache) return memoryCache;

  const cachePath = getCachePath();
  if (!fs.existsSync(cachePath)) return null;

  try {
    const raw = fs.readFileSync(cachePath, "utf-8");
    const data = JSON.parse(raw) as CachedEmbedding[];
    memoryCache = data;
    return data;
  } catch {
    return null;
  }
}

export type RetrieveResult = {
  context: string;
  /** Cosine similarity of the top chunk (0–1). Null if no cache. Use for relevance filtering. */
  topScore: number | null;
};

/** Minimum similarity to consider a question "related to the business". Tune between 0.4–0.7. */
export const RELEVANCE_THRESHOLD = 0.5;

/**
 * Retrieve the most relevant chunks for a query. Uses cache if available;
 * otherwise returns empty context and topScore null.
 */
export async function retrieveContext(
  query: string,
  topK: number = TOP_K
): Promise<RetrieveResult> {
  const cached = loadEmbeddingCache();
  if (!cached || cached.length === 0) {
    return { context: "", topScore: null };
  }

  const embeddingModel = openai.embedding(EMBEDDING_MODEL);
  const { embedding: queryEmbedding } = await embed({
    model: embeddingModel,
    value: query,
  });

  const withScores = cached.map((item) => ({
    ...item,
    score: cosineSimilarity(queryEmbedding, item.embedding),
  }));

  withScores.sort((a, b) => b.score - a.score);
  const top = withScores.slice(0, topK);
  const topScore = top[0]?.score ?? 0;

  const parts: string[] = [];
  let totalLen = 0;
  for (const item of top) {
    const block = `[Source: ${item.source}]\n${item.text}`;
    if (totalLen + block.length > MAX_CONTEXT_CHARS) break;
    parts.push(block);
    totalLen += block.length;
  }

  return {
    context: parts.join("\n\n---\n\n"),
    topScore,
  };
}
