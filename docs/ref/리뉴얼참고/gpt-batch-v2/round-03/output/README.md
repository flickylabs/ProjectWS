# spouse-09~12 V2 batch outputs

Included:
- 4 structure_v2 JSON files
- 4 beat_v2_full JSON files
- 4 structure_v2 TS exports
- 4 beat_v2_full TS exports
- index.ts re-export file
- manifest.json summary

Validation summary:
- Each case has 50~74 beats.
- Each case has 6 freeQuestionHooks.
- Each case has 3~5 linkEdges.
- Each case has 12 interjection beats.
- truthEnvelope / revealAtomIds only reference attached V1/V3 atoms.

Caveat:
- The request mentions an existing INTENT_LEXICON, but the actual lexicon file was not attached.
  The hook intentTag values therefore follow the naming style implied by the request examples
  (identity_check, context_check, motive_check, responsibility_check, legality_check, emotion_check, authenticity_check, timeline_check).
