This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Vercel checklist (RAG chatbot)

1. **Environment variables**  
   In the Vercel project → Settings → Environment Variables, add:
   - `OPENAI_API_KEY` (required for chat and, if you use the build step below, for ingest).

2. **Embedding cache (required for RAG)**  
   The chatbot needs `content-cache/embeddings.json` at runtime. Choose one:

   - **Option A – Commit the cache**  
     Run `npm run ingest` locally, then remove `content-cache` from `.gitignore`, commit `content-cache/embeddings.json`, and push. Re-run ingest and commit whenever you change `content/business-context/` docs.

   - **Option B – Build-time ingest**  
     In Vercel project settings, set the **Build Command** to:
     `npm run ingest && npm run build`  
     Add `OPENAI_API_KEY` to **Build** (not only Production) so ingest can run during deploy. The cache is generated in the build and included in the deployment.

3. **Rate limiting**  
   Rate limiting is in-memory per serverless instance, so it’s best-effort (not global across all instances). Safe for normal traffic; for strict limits consider a shared store (e.g. Vercel KV or Upstash Redis).

# RagChatbot
