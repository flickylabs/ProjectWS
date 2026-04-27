# Unmapped No-Output Verification

Date: 2026-04-27

The cutscene hook is called only after a free-interrogation result enters the dispatch path.

Code condition:

```ts
if (result.status === 'dispatch' && result.action) {
  dispatch(result.action)
  const cutscenePayload = buildAIReasoningCutscenePayload(trimmed, result.intent, caseData)
  if (cutscenePayload) triggerAIReasoningCutscene(cutscenePayload)
}
```

Payload construction returns `null` when:

```ts
intent.intent === 'unmapped' || !target || !disputeId
```

Result: `unmapped` inputs keep the existing fallback flow and do not emit major or compact VFX.
