/**
 * Ingest business-context markdown files: chunk, embed, write content-cache/embeddings.json.
 * Run: npm run ingest
 * Requires OPENAI_API_KEY (in .env.local or the environment).
 */
import path from "node:path";
import fs from "node:fs";

// Load .env.local when running via tsx (Next.js only loads it for next dev/build)
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (match) {
      const value = match[2].replace(/^["']|["']$/g, "").trim();
      if (!process.env[match[1]]) process.env[match[1]] = value;
    }
  }
}

async function main() {
  const { runIngest } = await import("../src/lib/rag/ingest");
  const result = await runIngest();
  console.log(`Ingested ${result.chunks} chunks → ${result.path}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
