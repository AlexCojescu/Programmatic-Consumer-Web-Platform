# Business context for the chatbot

Place all your markdown (`.md`) files here. They will be chunked and embedded so the chatbot can answer using this context.

- **Supported:** `.md` files anywhere under this folder (including subfolders).
- **Chunking:** Content is split by headings (`##`) and paragraphs so related sections stay together.
- **After adding or editing files:** Run `npm run ingest` to rebuild the embedding cache, then use the chat as usual.

You can organize files by topic, e.g.:
- `product.md`
- `pricing.md`
- `process.md`
- `faq.md`
