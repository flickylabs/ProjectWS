# Thread: SCRIPT_EN family-01 e-4 Narrative Sync + KO Naturalization v3 + scriptedAngles Sweep

Target: ClaudeCode
Role: `SCRIPT_EN`

## Status

Three layered KO changes have landed on `main` and the English sidecars are stale on all three counts. This thread syncs all three in one pass.

1. **e-4 narrative shift** (commit `75391d7a`, "e-4 deep sweep") — restructured the family-01 evidence `e-4` (공증인 메모 기록, "notary record") into a two-visit timeline. EN sidecars for `evidence e-4` must be re-synced.
2. **KO naturalization v3** (commit `d957a9c7`, "family-01 scriptedText KO 자연화") — 462 lines of `src/data/scriptedText/family-01.json` rewritten for natural Korean spoken register following an 8-dimension precision guide (memory `feedback_natural_korean_precision_guide`). The user hand-corrected 30+ anchors and the wholesale sweep was applied from those anchors. The EN sidecar must be re-naturalized in parallel — not merely retranslated, but re-styled into natural conversational English using the same 8 dimensions.
3. **scriptedAngles sweep** (commit `9b264f0f`, "family-01 scriptedAngles KO 자연화") — 4 judge_questions anchors + 48 interrogation_answers strings re-naturalized (`형이라는 자리` → `형이라는 위치` / `장남이라는 자리` → `장남으로서`, etc.; `그게 다입니다` → `그것뿐입니다`). EN sidecars for these specific anchors must match.

Surface-tier KO changes (viewerData, investigationStages, partyContext, v3DepthPlan, description, socialGraph, evidencePresentationScripts) were committed earlier (`5700aa93`). Their EN sidecars are likely also stale and should be brought into the same narrative within this thread.

## Background — narrative shift on e-4

Old narrative (now removed):
- `공증 당일` treated as a single same-day event
- `숫자 혼동` / `숫자를 오락가락` — the mother is portrayed as confusing the inheritance ratio numbers
- `같은 자리에서 숫자가 달라진` — interpretation that the ratio changed within one sitting
- Stage 1 evidence label `일반 기록`
- `절차 압박` as label-style wording

New narrative (now canonical):
- **Two separate notary visits on the same day**:
  - `1차 접수 (오전)` ~10:10 — opens will notarization / inheritance distribution arrangement (entry, no ratio yet); 10:25 — identity check + 2 witnesses; 11:05 — seal + filing number issued.
  - `수정 접수 (오후)` 17:05 — request to re-visit for amendment; 18:57 — amended notarization opens, final 60:40 confirmed.
  - `상태 메모 (수정 절차 중)` — notes recorded during the afternoon amendment:
    - 18:32 — mother reports fatigue, asks for a rest before answering
    - 18:39 — mother delays answering when questions repeat, asks for a glass of water
    - 18:43 — when asked the reason for the amendment, mother speaks with her son's help
    - 18:47 — Yoon Junghu appears to push the process saying "we have to finish today"
- Stage gating:
  - Stage 1: 1차 접수 only (3 rows) — no ratio yet, no signs of trouble
  - Stage 2: 1차 + 수정 접수 (5 rows) — 60:40 first appears here
  - Stage 3: full 9 rows — fatigue / delayed answers / son's help / "have to finish today" emerge

Phrase mapping (KO → EN guideline; do not translate the mapping itself, use it as anchor for choosing English):

| KO (old) | KO (new) | EN target tone |
|---|---|---|
| 공증 당일 | 수정 접수 자리 / 1차와 수정 두 차례 절차 | "during the afternoon amendment visit" / "across the morning intake and afternoon amendment" |
| 숫자 혼동 / 숫자를 오락가락 / 어머니가 숫자를 혼동 | 어머니가 답변을 늦추심 / 피로를 호소 / 물 한 잔을 청함 / 답변을 잇지 못하심 | "mother delayed her answers" / "mother voiced fatigue" / "mother asked for a glass of water" / "mother could not sustain her answers" |
| 같은 자리에서 숫자가 달라진 흔적 | 오전엔 비율이 비어 있다가 오후 수정에서 60:40으로 마무리된 흔적 | "the ratio was left blank in the morning and was settled as 60:40 only in the afternoon amendment" |
| 절차 압박 / 절차를 밀어붙인 듯 | 오늘 마쳐야 한다며 진행을 재촉 / 진행을 재촉 | "pushed the process saying we had to finish today" / "rushed the process" |
| 공증 당일 절차에 제가 관여했습니다 | 오후 수정 접수 절차까지 제가 곁에서 끌고 갔습니다 | "I stayed close through the afternoon amendment as well" |
| 일반 기록 (stage 1 label) | 1차 접수 | "Morning intake" |
| 공증 당일 11월 5일 (a-d-1-S5 자백) | 공증이 마무리된 11월 5일 | "the day the notarization was completed, November 5" |

Avoid carry-over English idioms that imply a single same-day event ("on the day of notarization", "during that one sitting"). Prefer phrasings that preserve the morning/afternoon split.

## Source of truth

### Tier 1 — e-4 narrative (commit `75391d7a`)

KO files updated:

- `src/data/scriptedAngles/family-01_angle_catalog.json` — d-2 / scan_sequence label, description, keywords
- `src/data/scriptedAngles/family-01_special_scripts.json` — w-2 (김영수) witness summons line
- `src/data/scriptedAngles/family-01_judge_questions.json` — d-2 scan_sequence + d-1 notarization_flow (text + behaviorHint)
- `src/data/scriptedAngles/family-01_interrogation_answers.json` — b-d-2 scan_sequence S0–S4 (6 anchor texts, ~144 variants total) + behaviorHints unchanged
- `src/data/scriptedText/family-01.json` — a-e-4-late-other (40 occurrences) / b-e-4 admission (35) / a-d-2-S2 fact-pursuit v6–v10 / b-d-2-S3 fact-pursuit v2 / a-d-1-S5 v1 / judge-question line / witness summon lines

Surface-tier (from prior commit `5700aa93`) — EN parity if not already done:

- `src/data/cases/generated/family-01.json` e-4 — viewerData / viewerDataByStage / investigationStages / partyContext / v3DepthPlan / description / surfaceDescription / socialGraph
- `src/data/claimPolicies/family-01-structure-v2.json` e-4
- `src/data/evidencePresentationScripts.ts` e-4 — facts / partyFacts / stances
- `src/components/pc/evidence/EvidenceSubViewers.tsx` + `demoEvidenceData.ts` — LogRow filterGroup + buildLogFilterOptions + logFilter_first/amend/status locale copy

### Tier 2 — KO naturalization v3 (commit `d957a9c7`, 462 lines of family-01.json)

Inspect `git diff d957a9c7~1 d957a9c7 -- src/data/scriptedText/family-01.json` for the full pattern. The sweep touches roughly **80 unique anchors** that fall into one of the eight dimensions below. Translation must be done anchor-by-anchor (not search/replace).

### Tier 3 — scriptedAngles sweep (commit `9b264f0f`)

KO files updated:

- `src/data/scriptedAngles/family-01_judge_questions.json` — 4 judge-question anchors (자리 → 위치/장남으로서/순간)
  - `judgeq-d-1-empathy_approach-a-general-v4`
  - `judgeq-d-3-empathy_approach-a-silence_over_pride-v1`
  - `judgeq-d-5-fact_pursuit-a-a_entitlement-v2`
  - `judgeq-d-5-empathy_approach-a-a_entitlement-v1`
- `src/data/scriptedAngles/family-01_interrogation_answers.json` — 48 strings, two repeated templates (each ×24):
  - `공증본과 별도 문서 사이의 차이를 제가 설명해야 합니다. 그게 다입니다.` → `... 그것뿐입니다.`
  - `제가 유언장에 손을 댄 사실을 부인하지 않겠습니다. 그게 다입니다.` → `... 그것뿐입니다.`

Inspect `git diff 9b264f0f~1 9b264f0f -- src/data/scriptedAngles/family-01_*.json` for exact deltas.

## EN Naturalization Guide — 8 Dimensions (apply to Tier 2 + Tier 3 anchors)

The KO sweep was driven by an 8-dimension precision guide. Apply equivalent transformations to English so that the sidecar reads as natural English defendant speech, not a literal gloss. The defendant character (윤태성, eldest son) speaks with formal courtroom register but should sound like a real person — measured, hedged, occasionally raw when his pride is touched.

### 1. Tense & aspect — duration / persistence

KO: `짊어진` → `짊어져 온` (perfective → present-perfect-progressive). Communicate that the burden has been carried over time.

| KO pattern | EN equivalent |
|---|---|
| 장남으로 버틴 세월 | "the years I've held my place as the eldest son" / "all the years I've been the eldest son" (not "the years I held") |
| 짊어져 온 무게 | "the weight I've been carrying" / "what I've shouldered" (not "the weight I shouldered") |
| 내려놓은 적이 없었습니다 | "I have never once set it down" |

### 2. Hedging — soften self-description ("~것 같다")

KO: `방어부터 나옵니다` → `방어기재가 작동하는 것 같습니다`. The speaker observes his own behavior with detachment.

| KO pattern | EN equivalent |
|---|---|
| ~것 같습니다 | "it seems like…" / "I suppose…" / "I think maybe…" / "I imagine…" |
| 방어기재가 작동하는 것 같습니다 | "I suppose my defenses kick in" / "it seems like some kind of defense mechanism takes over" |
| 말이 세게 나간 것 같습니다 | "I suppose my words came out harsher than I meant" |
| 흔들린 것 같습니다 | "I suppose it shook me" |

Psychology vocabulary ("defense mechanism", "compensation") is welcome — it sounds like a self-aware speaker.

### 3. Determiner & adverb cleanup — drop unnecessary "그렇게" / "그 부분"

KO: `그렇게 가볍게` → `가볍게`; `그 부분` → `그걸`.

| KO pattern | EN equivalent |
|---|---|
| 가볍게 다뤄지는 | "treated lightly" (not "treated so lightly") |
| 그걸 흔드는 질문 | "the question that shakes that" / "a question that unsettles it" — keep the referent clear |
| 이제 | "now" (replace "지금은" / clear time-shift) |

### 4. Formal/colloquial balance — preserve "단정" decisiveness

KO keeps `단정` deliberately — the defendant pushes back firmly but signals he won't overreach. EN should preserve this register.

| KO pattern | EN equivalent |
|---|---|
| 단정지어 말씀드리진 않겠습니다 | "I won't go so far as to declare it outright" / "I'm not going to say so categorically" |
| 모든 것을 단정짓진 | "I'm not going to call all of it decided" / "I won't claim certainty about everything" |
| 그렇다고 전부를… | "even so, I won't say all of it…" |

Use contractions ("I won't", "I'm not") for natural register but keep the cautious-but-firm tone. Avoid overly chatty registers like "I'm not gonna…".

### 5. Emotional precision — idiomatic English emotion words

KO uses Korean-specific emotional idioms; EN must use English idioms, not gloss.

| KO pattern | EN equivalent |
|---|---|
| 자존심이 상하더군요 | "it bruised my pride" / "my pride took a hit" (not "my pride was hurt") |
| 자존심이 상할 수밖에 없습니다 | "my pride can't help but suffer" / "it was bound to hurt my pride" |
| 그 감정부터 치고 올라왔습니다 | "that feeling surged up first" / "that emotion came up before anything else" |
| 탐욕으로 느껴졌습니다 | "it felt like greed to me" (passive sensation, not "I interpreted it as greed") |
| 분노가 앞섰습니다 | "anger came first" / "anger got ahead of the facts" |

### 6. Active subjecthood — name the agent

KO: `유리하게 끝난 결과` → `동생에게만 유리하게 작성됐어요` (passive event → identified agent). EN should follow suit.

| KO pattern | EN equivalent |
|---|---|
| 동생에게만 유리하게 작성됐어요 | "it was written to favor only my brother" / "they drafted it to favor only him" |
| 어머니 의지로 | "by my mother's own will" / "of my mother's own intention" (not "by my mother's intent") |
| 제 의지로 상황을 끌고간 | "I drove the situation through my own decision" |

### 7. Nominal compounding — when noun phrases sound more natural than verb phrases

KO: `자주 드나든 점` → `잦은 방문` (nominalization is more natural). EN follows the same instinct in some cases.

| KO pattern | EN equivalent |
|---|---|
| 잦은 방문 | "frequent visits" (not "the way he visited often") |
| 어머니 말년의 상황 | "my mother's late-years circumstances" / "my mother's state in her final years" |
| 이유를 일일이 대지 않은 | "without giving every reason one by one" |

### 8. Ellipsis vs translation safety — keep referents clear in EN

Korean can drop subjects/objects; English usually cannot. Be more explicit in English when the KO source elides.

- 한국어 `갖다 붙이는` → EN must say what is being attached: "tied to this case" / "fitted to this incident".
- `이건` (referring to a stance) → EN: "this point" / "on this much".
- Don't preserve elision if it would create ambiguity.

## Tier 3 — Explicit anchor mappings (judge_questions + interrogation_answers)

These are small and exhaustive — copy them anchor-by-anchor.

| Anchor id | KO (new) | EN target |
|---|---|---|
| `judgeq-d-1-empathy_approach-a-general-v4` | 형이라는 위치 때문에 더 일찍 따져 묻지 못한 후회가 있다면 그 마음을 말씀해 주십시오. 그래야 무엇이 본인이 직접 겪은 일이고 무엇이 나중에 알게 된 일인지 가려낼 수 있습니다. | "If there is regret that the position of being the elder brother kept you from pressing for answers sooner, please speak of it. Only then can we separate what you witnessed directly from what you learned later." |
| `judgeq-d-3-empathy_approach-a-silence_over_pride-v1` | 윤태성 씨, 형이라는 위치가 도움을 청하기 어렵게 만드는 면이 있다는 점을 본인도 알고 계실 것입니다. 그 무게가 어떻게 본인에게 작용했는지 먼저 말씀해 주십시오. | "Mr. Yun Taeseong, you must be aware that the position of being the elder brother makes it difficult to ask for help. Please first speak of how that weight has worked on you." |
| `judgeq-d-5-fact_pursuit-a-a_entitlement-v2` | 어머니께서 직접 인정해 주신 몫과 본인이 장남으로서 스스로 더한 몫을 분리해 답해 주십시오. | "Please answer by separating the share that your mother personally acknowledged from the share you yourself added as the eldest son." |
| `judgeq-d-5-empathy_approach-a-a_entitlement-v1` | 윤태성 씨, 어머니에 대한 장남의 의무가 어느 사이 권리처럼 바뀌는 일은 본인이 의식하기 어려운 결로 일어났을 수 있습니다. 그 변화의 첫 순간을 본인은 어디라고 보십니까. | "Mr. Yun Taeseong, the eldest son's duty toward his mother may have shifted into something like a right by an unconscious thread you would find difficult to notice yourself. Where do you locate the first moment of that change?" |

For `interrogation_answers` `그것뿐입니다.` ending (48 strings, two templates):
- KO: `공증본과 별도 문서 사이의 차이를 제가 설명해야 합니다. 그것뿐입니다.` → EN: "I have to explain the difference between the notarized copy and the separate document. That is all."
- KO: `제가 유언장에 손을 댄 사실을 부인하지 않겠습니다. 그것뿐입니다.` → EN: "I will not deny that I touched the will. That is all."

Choose one EN closer per template and apply to all 24 instances. ("That is all." reads natural and matches the firm-but-bounded register; "That's all I can say." is also acceptable. Do not vary across the 24 — uniformity within a template is the existing convention.)

## Tier 2 — High-frequency phrase mapping (apply across the 462-line v3 sweep)

These recurring KO replacements appear many times in the v3 sweep. Treat them as the primary translation anchors when revising the EN sidecar; cross-check against `git diff d957a9c7~1 d957a9c7 -- src/data/scriptedText/family-01.json` for every instance.

| KO (old) | KO (new) | EN target tone |
|---|---|---|
| 저는 그 선에서 물러서지 않습니다 | 이건 양보 못 합니다 | "I won't give ground on this." / "On this, I won't yield." |
| 그 선에서 먼저 인정합니다 | 거기까지는 인정하겠습니다 | "That much, I'll grant." / "I'll concede that far." |
| 다만 전부를 단정하진 않겠습니다 | 그렇다고 전부를 단정지어 말씀드리진 않겠습니다 / 그렇다고 모든 것을 단정짓진 않겠습니다 | "Even so, I'm not going to declare all of it outright." |
| 감정을 보태고 싶지 않았습니다 | 괜히 감정을 더 섞고 싶지 않았어요 | "I didn't want to muddy it with more emotion." |
| 그 감정이 먼저 올라왔습니다 | 그 감정부터 치고 올라왔습니다 | "That feeling surged up first." |
| 한 발 물러서도 핵심은 같습니다 | 한 발 양보해도 결론은 같습니다 | "Even if I give a step, the conclusion is the same." |
| 그 한마디가 제 안에서 크게 남았습니다 | 그 한마디가 제 안에 두고두고 남았어요 | "That one line stayed with me a long time." |
| 그 점을 빼면 (formal connector) | (often dropped or rephrased) | "Apart from that," / "If I set that aside," |
| 장남으로 살아온 자리 / 장남이라는 자리 | 장남으로 짊어져 온 무게/체면/자존심 | "the weight I've carried as the eldest son" / "the eldest son's standing" |
| 형이라는 자리 | 형이라는 위치 / 형으로서의 체면 | "the position of being the elder brother" / "the elder brother's standing" |
| 형이라는 자리를 끝내 붙든다 (behaviorHint) | 형으로서의 체면을 끝내 놓지 않는다 | "(he) holds on to his standing as the elder brother to the end" / "(he) refuses to let go of his face as the elder brother" |
| 단정으로 덮는다 (behaviorHint) | 단호한 말투로 눌러 덮는 듯하다 | "(he) seems to press it down with a decisive tone" |
| 잘라 말하진 (verb form) | 단정지어 말씀드리진 | "I won't go so far as to declare it outright" |
| 발끈 (psychological flash) | 자존심이 상하더군요 / 자존심이 상할 수밖에 없습니다 | "it bruised my pride" / "my pride was bound to suffer" |
| 그렇게 자주 드나든 점 | 잦은 방문 | "frequent visits" / "the frequency of his visits" |
| 어머니 뜻만으로 | 어머니 의지로 | "by my mother's will" |
| 유리하게 끝난 결과 | 동생에게만 유리하게 작성됐어요 | "it was drafted to favor only my brother" |
| 어머니 말년 모습 | 어머니 말년의 상황 | "my mother's late-years circumstances" / "my mother's state in her later years" |

When in doubt, prefer the natural English equivalent over a literal gloss. The character's register is formal-but-spoken; aim for what an articulate Korean-American defendant would actually say in a US courtroom translated by a careful interpreter, not what a textbook would produce.

## Mandatory References

- `docs/localization/threads/script-25-claudecode-en-spouse-01-polish.md` — sentence-pool patterns
- `docs/localization/threads/script-27-claudecode-en-family-friend-expansion.md` — family-01 EN baseline
- `docs/localization/glossary.csv`
- `docs/localization/script-glossary.csv`
- `src/data/disclosurePolicy/family-01.json` — truth-leak rules (no `90:10` / `자기 몫을 줄인 조작` before S5)
- Memory references: `feedback_natural_korean_vs_translationese` (avoid newsroom-register prose; choose natural conversational English equivalents)

## Scope — allowed write targets

EN sidecars only. Do NOT touch KO sources or JA / zh-CN sidecars.

- `src/data/scriptedText/family-01.en.json` ← **Tier 1 (e-4) + Tier 2 (v3 sweep, 80+ anchors)**
- `src/data/scriptedAngles/family-01_angle_catalog.en.json` ← Tier 1 (d-2 label)
- `src/data/scriptedAngles/family-01_judge_questions.en.json` ← Tier 1 (d-2 + d-1 lines) + **Tier 3 (4 자리 anchors)**
- `src/data/scriptedAngles/family-01_interrogation_answers.en.json` ← Tier 1 (b-d-2 S0–S4) + **Tier 3 (48 그것뿐입니다 strings)**
- `src/data/scriptedAngles/family-01_special_scripts.en.json` (if structurally supported)
- `src/data/cases/generated/family-01.en.json`
- `src/data/claimPolicies/family-01-structure-v2.en.json` (if a sidecar exists; otherwise skip)
- `src/data/evidencePresentationScripts.en.json` (or wherever EN sidecar lives — confirm via Glob)
- Any UI-locale file containing `logFilter_first` / `logFilter_amend` / `logFilter_status` keys that requires EN copy

## Working procedure

1. `git fetch && git checkout main && git pull` — confirm at `9b264f0f` or later.
2. Enumerate all three tiers of KO deltas:
   - Tier 1 (e-4 narrative): `git diff 5700aa93~1 75391d7a -- src/data/scriptedAngles/family-01_*.json src/data/scriptedText/family-01.json src/data/cases/generated/family-01.json src/data/claimPolicies/family-01-structure-v2.json`
   - Tier 2 (KO naturalization v3): `git diff d957a9c7~1 d957a9c7 -- src/data/scriptedText/family-01.json` (≈80 anchors)
   - Tier 3 (scriptedAngles sweep): `git diff 9b264f0f~1 9b264f0f -- src/data/scriptedAngles/family-01_*.json` (4 + 48)
3. For each KO-side change, locate the matching `id` in the EN sidecar and replace the English text:
   - **Tier 1**: follow the phrase mapping in "Background — narrative shift on e-4".
   - **Tier 2**: apply the 8-dimension EN naturalization guide + the high-frequency phrase mapping table. **The goal is to re-naturalize, not merely retranslate.** If the existing EN sidecar reads as a literal gloss (e.g., "I will not back down from that line."), rewrite it idiomatically ("On this, I won't yield.") even when the underlying KO meaning is preserved.
   - **Tier 3**: copy the explicit anchor mappings exactly as given in the table.
   Preserve `id`, `behaviorHint`, `tags`, ordering. behaviorHint values are KO-only and need not be translated.
4. Apply the same shift in surface-tier sidecars (case data, viewer rows, log filter labels).
5. Watch out for new KO additions (e.g., `filterGroup` field on LogRow, new keywords array entries `"1차 접수"` / `"수정 접수"`) — they must propagate to the sidecar schema if it mirrors structure.
6. Run validation gates before finalizing.

## QA / truth-leak guards (must stay)

- Stage 0 / stage 1 surfaces (partyContext, viewerData stage 1, description, socialGraph) must NOT reveal stage 2 keywords (`60:40`) or stage 3 keywords (`mother's state`, `delayed answers`, `pushed the process`). The KO sweep already removed these — keep the EN parity strict.
- `90:10` / "reduced his own share" / "fabrication" forbidden in non-S5 surfaces. Keep S5 disclosure parity with the KO disclosure policy.
- `evidence-stage-gate` detector keywords for EN: align with `truth-leak-matrix.json` `hidden.en` array; do not introduce new EN phrasing that would shadow a hidden lexeme.
- **Variation diversity (critical for Tier 2)**: the v3 KO sweep rewrites recurring closers (e.g., `이건 양보 못 합니다`, `한 발 양보해도 결론은 같습니다`, `그 한마디가 제 안에 두고두고 남았어요`) consistently across dozens of variants. Translate each recurring KO closer to a **single canonical EN closer** to preserve template uniformity — do not over-vary. The non-S5 high-volume buckets should still meet ≥3 opener anchors and ≥3 closer anchors across the bucket as a whole (drawn from different KO anchors), but a single repeated KO closer should map to a single EN closer.

## Validation Commands

```powershell
npm run localization:scripts:validate -- --case=family-01 --locale=en --strict
npm run localization:cases:validate -- --case=family-01 --locale=en --strict
npm run check:policy -- --locale=en
npm run qa:lqa
npm run qa:fast
npm run qa:cutscene
```

Optional but recommended: `npm run build:pc`.

## Output Directory

`docs/localization/threads/outputs/script-thread-32-en-family01-e4-narrative-sync/`

Required:

- `SUMMARY.md` — files touched, variant counts per tier (Tier 1 e-4 / Tier 2 v3 sweep / Tier 3 scriptedAngles), narrative-shift compliance notes, naturalization-tone audit notes
- `NATURALIZATION_AUDIT.md` — for Tier 2 + Tier 3: a spot-audit of 10 anchors showing KO before/after + EN before/after, demonstrating that each of the 8 dimensions was applied where applicable. Flag any anchor where the existing EN sidecar was kept (i.e., judged already-natural) with a one-line justification.
- `VARIATION_AUDIT_SUMMARY.json` — confirm anchor diversity is preserved (non-S5 high-volume buckets still meet ≥3 opener anchors, ≥3 closer anchors, no >50% same 60-char prefix); confirm template uniformity (recurring KO closer → single EN closer)
- `TRUTH_BOUNDARY_SUMMARY.json` — non-S5 forbidden lexeme violations = 0
- `GIT_LOG.md` — final commit hashes on the worktree

## Worktree hygiene

If spawning sub-agents, run `git config --global --add safe.directory <worktree>` first (see memory `feedback_codex_worktree_safe_directory`). Do not edit KO sources from any sub-agent.
