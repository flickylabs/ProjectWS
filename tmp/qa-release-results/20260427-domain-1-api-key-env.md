# Domain 1 - API Key / Env

Status: PASS for tested artifacts and proxy path.

Target:
- HEAD: `596d235 fix: move OpenAI calls behind server proxy`
- Local secret source: server-side `.env` with `OPENAI_API_KEY`
- Forbidden client env: `VITE_OPENAI_API_KEY`

Checks:
- `npm run build:pc`: PASS
- Artifact grep over `dist` and `dist-pc`:
  - `sk-[A-Za-z0-9_-]{20,}`: 0
  - `VITE_OPENAI`: 0
  - `OPENAI_API_KEY`: 0
- `.env` tracking check:
  - `git ls-files '.env' '.env.*'`: 0 tracked files
  - `.env` and `.env.local` are ignored by `.gitignore`
- Server-side proxy structure:
  - `api/llm/dialogue.ts` -> `serverless/openaiProxy`
  - `api/llm/aftermath.ts` -> `serverless/openaiProxy`
  - `serverless/openaiProxy.ts` reads `process.env.OPENAI_API_KEY`
- Actual LLM proxy call:
  - Direct serverless handler POST: HTTP 200, choices present
  - Production-like local server `/api/llm/dialogue` POST: HTTP 200, choices present
  - Browser request headers: no client `Authorization` header

Evidence:
- Screenshot: `tmp/qa-release-results/screenshots/domain1-prod-proxy-home-1280x720.png`

Notes:
- No actual key value was printed or recorded.
- Vercel CLI dev mode served the Vite PC entry through a dev path incorrectly, so UI + proxy was validated through a production-like static `dist-pc` server wired to the same serverless proxy handler.
