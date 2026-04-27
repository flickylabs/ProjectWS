# Proxy / Network Verification

Date: 2026-04-27

## Client Routing

- Production `chatCompletion()` now posts to `/api/llm/dialogue` by default.
- Result aftermath generation posts to `/api/llm/aftermath`.
- Client code no longer reads OpenAI key env vars.
- Client code no longer builds an OpenAI `Authorization` header.

## Server Route Verification

- `api/llm/dialogue.ts`: type-checked with the shared serverless proxy handler.
- `api/llm/aftermath.ts`: type-checked with the shared serverless proxy handler.
- Mock upstream verification:
  - `dialogue-mock`: status 200, choices present.
  - `aftermath-mock`: status 200, choices present.
  - upstream auth header attached server-side only.

## Real Upstream Check

- Local `.env` does not contain a usable OpenAI key value in this workspace.
- With the current local value, both handlers return safe 503 responses before contacting OpenAI.
- Actual deployed LLM verification requires the user-managed Vercel server-only `OPENAI_API_KEY`.

No key values were written to this report.
