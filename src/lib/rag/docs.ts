import fs from "node:fs";
import path from "node:path";

const DEFAULT_CONTENT_DIR = path.join(process.cwd(), "content", "business-context");

export type DocChunk = {
  text: string;
  source: string;
};

/**
 * Chunk markdown by ## headings and by paragraphs (double newline).
 * Keeps heading + following content together.
 */
function chunkMarkdown(content: string, source: string): DocChunk[] {
  const chunks: DocChunk[] = [];
  const sections = content.split(/\n(?=##\s)/m).filter(Boolean);

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed) continue;

    // If section is large, split by paragraphs
    const paragraphs = trimmed.split(/\n\n+/);
    if (paragraphs.length <= 2) {
      chunks.push({ text: trimmed, source });
      continue;
    }

    let current = "";
    for (const p of paragraphs) {
      if (current.length + p.length > 800) {
        if (current) chunks.push({ text: current.trim(), source });
        current = p;
      } else {
        current = current ? current + "\n\n" + p : p;
      }
    }
    if (current) chunks.push({ text: current.trim(), source });
  }

  return chunks;
}

/**
 * Load all .md files from the business-context directory (recursive).
 */
export function loadMarkdownDocs(contentDir: string = DEFAULT_CONTENT_DIR): DocChunk[] {
  const chunks: DocChunk[] = [];

  if (!fs.existsSync(contentDir)) {
    return chunks;
  }

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        walk(full);
      } else if (ent.isFile() && ent.name.toLowerCase().endsWith(".md") && ent.name !== "README.md") {
        const content = fs.readFileSync(full, "utf-8");
        const relative = path.relative(process.cwd(), full);
        chunks.push(...chunkMarkdown(content, relative));
      }
    }
  }

  walk(contentDir);
  return chunks;
}
