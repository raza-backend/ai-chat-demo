# AI Chat Demo — OpenAI + Node.js + TypeScript

Streaming chat API built with Express and the OpenAI SDK, plus a minimal chat UI. The API key stays on the server and is never sent to the browser.

**Live:** https://ai-chat-demo-kappa-six.vercel.app · **Health:** https://ai-chat-demo-kappa-six.vercel.app/health

## Stack
Express 5 · TypeScript · OpenAI SDK · Zod · Helmet · express-rate-limit

## Endpoints

| Method | Path | Description |
|---|---|---|
| POST | /api/chat | Stream an assistant reply as plain text |
| GET | /health | Uptime check |

Request body:
```json
{ "messages": [{ "role": "user", "content": "Hello" }] }
```

## Safeguards
- Input validation with Zod: up to 20 messages, 2000 characters each
- Rate limit: 20 messages per hour per IP
- Reply length capped at 300 tokens
- Request body limited to 50 KB

The rate limit is stored in memory, so on serverless hosting each instance counts separately. It deters casual abuse; the OpenAI account's spend limit is the hard cap.

## Run locally
```bash
npm install
cp .env.example .env        # add your OpenAI key
npm run dev
```
Then open http://localhost:3000.

## Environment variables
| Name | Purpose |
|---|---|
| OPENAI_API_KEY | OpenAI secret key |
| OPENAI_MODEL | Model name, default `gpt-4o-mini` |
| PORT | Default 3000 |

## Deployment
Deployed on Vercel: `api/index.ts` serves the Express app as a serverless function, and `public/` is served as static files.
