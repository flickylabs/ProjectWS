# Domain 4 - API Failure Handling

Status: PARTIAL.

Verified:
- Success path through `/api/llm/dialogue` returned HTTP 200 with choices through the server-side proxy.
- Client production build does not send an `Authorization` header.
- `resolveLLMDialogue` source catches LLM call failures and routes to fallback response generation.
- `useActionDispatch` clears LLM loading state in both success and failure paths.

Attempted:
- A browser route override for `/api/llm/dialogue` was prepared to simulate 429.
- The scripted spouse route did not reach an LLM request during the available automation path; it opened dispute selection/scripted handling instead.

Evidence:
- `tmp/qa-release-results/screenshots/domain4-api-429-fallback-1280x720.png`

Residual:
- Manual or targeted component-level confirmation is still recommended for the in-game 429/500 UX path.
