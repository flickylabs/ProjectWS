# Thread: SCRIPT_EN family-01 e-5 Reassignment + d-2 Narrative Split Sync

Target: ClaudeCode
Role: `SCRIPT_EN`

## Status

After the e-4 narrative sync + KO naturalization v3 + scriptedAngles sweep (script-thread-32 cherry-picked as `966e7a61`), four additional KO commits landed that are not yet reflected in the EN sidecars. The structural change is significant: the case-internal role of evidence `e-5` ("어머니 자필 유언장 연습본" / handwritten will draft) has moved from dispute `d-2` to dispute `d-5`, and the d-2 narrative has been re-anchored to the notarization procedure itself.

KO commits to sync (in chronological order):
- `7ac600a1` — Phase 1 e-5 reassignment data (case data + structure + disclosurePolicy + truth-leak matrix)
- `a856966d` — Phase 2-1 d-2 confessions narrative split (special_scripts 4 entries)
- `e48eeae1` — Phase 2-2 scriptedAngles + scriptedText d-2 narrative split (~720 string changes)
- `08be3f25` — Phase 2-3 claimPolicies (dossier + events + atoms) ~59 string changes

The EN sidecars currently still describe `e-5` as a d-2 evidence (the old narrative) and contain d-2 anchors with handwritten / 90:10 / forgery / "reducing own share" language. This thread re-syncs them.

## Background — design shift

**Old design (now removed)**:
- `e-5` (handwritten will draft showing 90:10) was the hard evidence for dispute `d-2` ("60:40 will vs separate document difference").
- The moment `e-5` unlocked, d-2's answer was self-revealed (Jeong-hu reduced his own 90 to 60 in the notarized copy).
- d-2 verdict required both `e-4` and `e-5`.
- d-5 ("mother's hidden feelings") was an abstract motive layer without `e-5` evidence weight.

**New design (canonical from `7ac600a1`)**:
- d-2 = **"공증 절차의 개입" / "Procedural intervention in the notarization"**. Verdict reachable with `e-4` (notary memo) alone. The narrative is the morning intake leaving the ratio blank, the afternoon amendment closing it at 60:40, the mother's unstable state, and Jeong-hu rushing the process. The motive behind that intervention is **not concluded inside d-2**.
- d-5 = **"어머니의 숨겨진 마음" / "The mother's hidden feelings"** — now requires `e-5` + `e-6` + `e-7`. The hard evidence that Jeong-hu re-wrote the mother's intent is the contrast between the handwritten 90:10 and the notarized 60:40.
- `e-5` is reassigned: `proves` = `["d-5"]`, `requiredLieState` = `"S5"` (unlocked after d-4 verdict, not at d-1 S2 as before).
- The evidence-requires chain is loosened: `e-6.requires` = `["e-4"]` (was `["e-5"]`); `e-7.requires` = `["e-6"]` (was `["e-5", "e-6"]`).

Consequence for d-2 anchors: any handwritten / 90:10 / forgery / "reducing own share" language must be removed and replaced with procedural language (morning intake, afternoon amendment, Jeong-hu's pressure, mother's state). Consequence for d-5 anchors: the handwritten 90:10 → notarized 60:40 trace should be present as the named evidence rather than left abstract.

## Tier 1 — Data files (Phase 1, commit `7ac600a1`)

EN sidecars must mirror these KO data changes. Inspect `git diff 7ac600a1~1 7ac600a1 -- <file>` for the exact deltas.

- `src/data/cases/generated/family-01.json`
  - d-2: `name`, `truthDescription`, `verdictOptions.{wrong,partial,truth,defer}`, `mediationLink`, `judgmentStatement`, `v3UnlockPlan.{runtimeRule,authoredRule,summary}`, `requiredEvidence` (`["e-4", "e-5"]` → `["e-4"]`)
  - d-5: `truthDescription`, `verdictOptions.truth`, `verdictOptions.defer`, `requiredEvidence` (`["e-6", "e-7"]` → `["e-5", "e-6", "e-7"]`)
  - e-5: `proves`, `requiredLieState`, `partyContext.a/b` (questionAngle + implication)
  - e-6: `requires`
  - e-7: `requires`
  - socialGraph e-5 node: `linkedDisputeIds`
- `src/data/claimPolicies/family-01-structure-v2.json`
  - d-2: name + main + depthLayers (surface/motive/core) + linkEdges (d2→d3 / d2→d5)
  - d-3 surface lockedSummary (handwritten reference removed)
  - d-5: truthDescription, requiredEvidence
  - e-5: proves, criticalWindows (d-2/d-3 → d-5 with state S2/S3, multipliers 1.55/1.3), partyContext
  - e-6/e-7 requires
- `src/data/disclosurePolicy/family-01.json`
  - disputes.d-2 surface/truth/truthLexemes (procedural narrative)
  - disputes.d-5 truth/truthLexemes (handwritten 90:10 trace added)
  - d-2 truthStages stage 0-4 (full 5-stage restructure, handwritten/90:10/own-share language moved entirely into `forbiddenDisclosure` and never released; procedural detail staged in)
  - d-5 truthStages stage 2/3/4: e-5 added to `requiredEvidence`, handwritten 90:10 / notarized 60:40 narrative added to `hiddenTruth` and `allowedDisclosure`
- `docs/localization/non-dialogue-extract/truth-leak-matrix.json`
  - family-01.d-2.hidden — all four locales already updated in `7ac600a1`. Verify EN is consistent (Jeong-hu's pressure / mother's unstable state / morning blank vs afternoon amendment gap).
  - family-01.d-5.hidden — EN already gained two new entries (shrank the mother's handwritten ratio in the notarization / yielded his own share so that the handwritten 90 became the notarized 60). Verify.

Where EN sidecar files mirror these structures (e.g., `family-01.en.json`, `family-01-structure-v2.en.json`, `family-01.en.json` under disclosurePolicy), apply the same shape.

## Tier 2 — Narrative split files (Phase 2, commits `a856966d` + `e48eeae1` + `08be3f25`)

KO changes — about **~800 strings** across:

- `src/data/scriptedAngles/family-01_special_scripts.json` — 17 strings (d-2 confessions + s5RequestionResponses + judge_evidence_combo + dossier-note-d-2)
- `src/data/scriptedAngles/family-01_interrogation_answers.json` — ~486 strings (d-2 anchors)
- `src/data/scriptedText/family-01.json` — ~225 anchors (d-2 anchors + d-2 narrative carried in interrogation/evidence_present/dossier/witness/mediation/contradiction/primary_fault/shared_fault/protective_resolution/procedural_caution areas + 3 b-d-5-S5 tone alignments)
- `src/data/claimPolicies/family-01-dossier-cards.json` — 6 strings (dc-2)
- `src/data/claimPolicies/family-01-game-events.json` — 4 strings
- `src/data/claimPolicies/family-01-game-events-v2.json` — 8 strings (contradictions[8]/[11] + conflicts[5])
- `src/data/claimPolicies/family-01-v2-atoms.json` — ~41 strings (24 amount block "exact"/"rounded" replace + 6 evidence block + factText + forgery lexeme alignment)

For each KO change, locate the matching `id` in the EN sidecar (the structures mirror) and replace the EN text. Tone goal: read as natural English defendant / judge speech, **re-naturalized** (not literally retranslated), following the same 8-dimension naturalization guide used in script-thread-32.

### High-frequency KO replacements (Phase 2 dominant templates) and EN targets

The KO sweep was driven by a small set of recurring templates. Map each KO source template to a single canonical EN closer to preserve template uniformity (`reveal` / `lieState` is preserved). Do not over-vary.

| KO (old) | KO (new) | EN target |
|---|---|---|
| 자필 연습본이 나오면 제 단정도 흔들릴 수밖에 없습니다 | 공증 절차에 다른 정황이 드러나면 제 단정도 흔들릴 수밖에 없습니다 | "If other facts about the notarization process come to light, my conclusion is bound to waver too." |
| 자필 연습본과 공증본이 다르다면, 제가 믿었던 조작 방향도 다시 봐야 합니다 | 공증 절차에 다른 동기가 있었다면, 제가 믿었던 조작 방향도 다시 봐야 합니다 | "If there was another motive behind the notarization procedure, I have to re-examine the direction of the manipulation I believed in." |
| 90:10에서 60:40으로 바뀐 흐름을 보니 단순히 동생이 더 받으려 했다는 말은 맞지 않습니다. 제 단정도 책임져야 합니다 | 정후가 진행을 재촉하며 절차에 깊이 개입한 흐름을 보니 단순히 동생이 더 받으려 했다는 말은 맞지 않습니다. 제 단정도 책임져야 합니다 | "Seeing how Jeong-hu rushed the proceedings and intervened deeply in the procedure, the simple claim that my brother just wanted more does not hold. I have to own my own conclusion as well." |
| 자필 연습본과 공증본의 방향을 함께 보면 제 첫 의심은 단순하지 않았습니다 | 공증 절차의 흐름을 함께 보면 제 첫 의심은 단순하지 않았습니다 | "Looking at the notarization process as a whole, my first suspicion wasn't simple." |
| 자필 연습본과 공증본을 함께 보니 제가 처음 말한 탐욕의 그림만으로는 설명되지 않습니다. 이제는 공증본만 보고 판단할 수 없다는 점을 인정합니다 | 절차 안의 진행 압박과 어머니 상태를 함께 보니 제가 처음 말한 탐욕의 그림만으로는 설명되지 않습니다. 이제는 공증본만 보고 판단할 수 없다는 점을 인정합니다 | "Looking at both the pressure inside the procedure and my mother's state, the greed I first described doesn't explain it. I admit I can't judge by the notarized copy alone." |
| 동생이 자기 몫을 줄인 변경이었다는 점까지 확인했습니다. 그래도 어머니 문서를 바꾼 책임은 별도로 남습니다 | 정후가 절차에서 진행을 재촉했다는 점까지 확인했습니다. 그래도 절차에 손댄 책임은 별도로 남습니다 | "I have confirmed that Jeong-hu rushed the procedure. Even so, the responsibility for tampering with the procedure stands on its own." |
| 자필 연습본의 방향을 보고 나니 제 의심도 틀어진 부분이 있습니다 | 절차의 흐름을 보고 나니 제 의심도 틀어진 부분이 있습니다 | "After seeing how the procedure played out, parts of my suspicion turned out skewed." |
| 자필 연습본의 90:10을 공증본 60:40으로 바꾼 사실은 인정합니다. 제 몫을 줄인 변경이어도 위조 책임은 남습니다 | 공증 오후 수정에서 진행을 재촉한 사실은 인정합니다. 그 절차에 손댄 책임은 남습니다 | "I admit I rushed the proceedings during the afternoon amendment of the notarization. The responsibility for tampering with that procedure stands." |
| 공증본과 자필 연습본 사이에 제가 만든 차이가 있었습니다. 형을 지키려 했다는 말로 어머니 뜻을 고친 책임이 사라지지는 않습니다 | 공증 절차에 제가 깊이 개입한 부분이 있었습니다. 그 동기로 어머니 상태에 작용한 책임이 사라지지는 않습니다 | "I did intervene deeply in the notarization process. The motive does not erase the responsibility for what that did to my mother's state." |
| 제가 유언장에 손을 댄 사실을 부인하지 않겠습니다 → 자필 연습본과 공증본의 차이는 제가 만든 것입니다 | 제가 공증 절차에 손을 댄 사실을 부인하지 않겠습니다 → 오후 수정 단계에서 진행을 빨리 끌고 간 것은 제 책임입니다 | "I won't deny that I tampered with the notarization procedure. Pushing the afternoon amendment through quickly was my responsibility." |
| 공증본은 60:40으로 남았고 자필 연습본은 달랐습니다. 그 차이를 만든 사람이 저라는 점을 인정합니다 | 공증본은 60:40으로 남았고 그 자리에 도달하는 절차를 제가 끌고 갔습니다. 그 절차 책임을 제가 인정합니다 | "The notarized copy stands at 60:40, and I'm the one who pushed the procedure that arrived there. I accept that procedural responsibility." |
| 자필 연습본과 공증본이 다르게 남은 경위는 기록으로 확인해야 합니다 | 공증 절차의 경위는 기록으로 확인해야 합니다 | "The course of the notarization procedure has to be verified against the records." |
| 자필 연습본을 언제 봤는지와 공증본이 어떻게 남았는지는 분리해 답하겠습니다 | 오전 1차 접수의 흐름과 오후 수정 접수의 진행은 분리해 답하겠습니다 | "I'll answer about the morning intake and the afternoon amendment separately." |
| 어머니 문서가 다르게 남은 책임은 따져야 합니다. 다만 그 책임을 지금 제 위조로 단정할 수는 없습니다 | 공증 절차에 손댄 책임은 따져야 합니다. 다만 그 책임이 어떤 동기였는지는 별도로 봐야 합니다 | "The responsibility for tampering with the notarization procedure has to be examined. But the motive behind that responsibility has to be looked at separately." |
| 공증본이 60:40으로 남은 과정에 제 책임이 있습니다. 왜 그렇게 됐는지는 자필 연습본과 함께 설명하겠습니다 | 공증본이 60:40으로 남은 과정에 제 책임이 있습니다. 왜 그렇게 됐는지는 어머니 상태와 진행 압박을 함께 설명하겠습니다 | "I'm responsible for how the notarized copy ended at 60:40. I'll explain why alongside my mother's state and the pressure on the process." |
| 두 문서 사이에 제가 만든 차이가 있었다는 점은 피하지 않겠습니다. 다만 왜 그렇게 했는지는 자필 연습본의 내용과 함께 봐야 합니다 | 공증 절차에 제가 깊이 개입했다는 점은 피하지 않겠습니다. 다만 왜 그렇게 했는지는 어머니 상태와 진행 압박을 함께 봐야 합니다 | "I won't dodge the fact that I intervened deeply in the notarization procedure. But why I did it has to be considered alongside my mother's state and the pressure on the process." |
| 자필 연습본과 공증본이 다르게 남은 이유에 제 판단이 들어갔습니다. 그 책임은 설명하겠습니다 | 공증 절차의 진행 속도에 제 판단이 들어갔습니다. 그 책임은 설명하겠습니다 | "My judgment fed into the pace of the notarization procedure. I'll explain that responsibility." |
| 제가 유언장에 손을 댄 사실은 부인하지 않겠습니다. 자필 연습본과 공증본의 차이가 그 핵심입니다 | 제가 공증 절차에 손을 댄 사실은 부인하지 않겠습니다. 오후 수정 단계에서 진행을 재촉한 것이 그 핵심입니다 | "I won't deny that I tampered with the notarization procedure. Pushing the afternoon amendment forward is the heart of it." |
| 위조 책임이라는 말이 무겁다는 걸 압니다 | 절차 개입 책임이라는 말이 무겁다는 걸 압니다 | "I know the words 'responsibility for procedural intervention' weigh heavily." |

### Confession templates (special_scripts d-2 + s5RequestionResponses)

| KO new | EN target |
|---|---|
| 정후가 오후 수정 공증에서 어머니 상태가 불안정한데도 진행을 재촉했다는 사실을 받아들입니다. 그래도 절차 개입 책임은 남습니다. | "I accept that Jeong-hu rushed the proceedings during the afternoon amendment even though my mother's state was unstable. The responsibility for that procedural intervention still stands." |
| 공증 오후 수정에서 어머니가 답변을 잇지 못하시는데도 제가 진행을 빨리 끌고 갔습니다. 그 절차에 손댄 책임은 제 몫입니다. | "During the afternoon amendment, I pushed the procedure forward quickly even as my mother could no longer hold her answers together. The responsibility for tampering with that procedure is mine." |
| 공증 절차의 흐름에 관해서도 그 범위 안에서만 설명하겠습니다. (s5RequestionResponses 후미) | "I will speak about the course of the notarization procedure only within that scope as well." |
| 절차 개입 책임에 관해서도 그 범위 안에서만 설명하겠습니다. | "I will speak about the responsibility for procedural intervention only within that scope as well." |
| 공증 절차 안에서 진행 순서와 어머니 상태의 흔적이 맞지 않습니다. 그 진행 순서와 제출 단계를 확인해야 합니다. (judge_evidence_combo) | "Inside the notarization procedure, the order of operations and the traces of my mother's state do not line up. The order of operations and the submission stages have to be verified." |
| 절차에 손댄 동기가 통념적 탐욕과 다르더라도 절차 개입 책임은 사라지지 않는다. (dossier note) | "Even if the motive for tampering with the procedure differs from conventional greed, the responsibility for procedural intervention does not disappear." |
| 공증 절차의 진행 압박과 어머니 상태의 작용은 본인이 인정한 단계에서만 기록한다. (dossier note) | "Pressure on the notarization process and the effect of the mother's state are recorded only at the stage the subject has admitted to them." |

### v2-atoms amount-block dominant template

24 amount blocks were updated uniformly:

| KO field | KO new | EN target |
|---|---|---|
| `exact` | "오전 1차 비율 공란을 오후 수정에서 60대 40으로 확정" | "the morning intake's blank ratio confirmed as 60:40 in the afternoon amendment" |
| `rounded` | "오전 1차 공란→오후 수정 확정" | "morning blank → afternoon confirmation" |
| `neutral` | (kept "그 비율") | "that ratio" (kept) |

6 evidence-block fields:

| KO new | EN target |
|---|---|
| "공증인 메모 기록과 오전 1차 비율 공란" | "notary memo record and morning intake's blank ratio" |
| "공증인 메모와 절차 흐름" | "notary memo and procedural flow" |

### action.exact field — KEEP

`action.exact` = "유서 비율 변경" (24 occurrences in `v2-atoms`) is the d-2 surface fact identifier and does not include handwritten / 90:10 lexemes. Translate as a stable English label, e.g., **"changing the will's ratio"**, and keep uniform across all 24.

## d-5 EN strengthening (small)

EN d-5 anchors should now read with `e-5` evidence weight where the KO source carries it. Key locations (already changed in KO):

- d-5 truthDescription (KO new): "...어머니가 자필 연습본에 남긴 90:10을 정후가 공증 60:40으로 줄인 것이 그 대표 흔적이다..." — EN target: **"...The clearest trace is that Jeong-hu reduced the 90:10 my mother left in her handwritten draft to the 60:40 in the notarized copy..."**
- d-5 verdictOptions.truth (KO new): "...자필 연습본 90:10이 공증본 60:40으로 바뀐 흐름이 그 대표 사례다..." — EN target: **"...The clearest example is the flow from the handwritten 90:10 to the notarized 60:40..."**
- d-5 disputes.truth (disclosurePolicy, KO new): same shape — EN target mirrors.
- b-d-5-S5-motive-search v6/v7/v10 (scriptedText): KO `위조 책임` → `절차 개입 책임`. EN target: `responsibility for forgery` → `responsibility for procedural intervention`.

Do not add new handwritten / 90:10 mentions to d-5 anchors that did not carry them in KO.

## Scope — allowed write targets

EN sidecars only. Do NOT touch KO sources or JA / zh-CN sidecars. Do NOT touch `behaviorHint` (KO-internal field).

- `src/data/scriptedText/family-01.en.json` — main bulk
- `src/data/scriptedAngles/family-01_interrogation_answers.en.json` — main bulk
- `src/data/scriptedAngles/family-01_special_scripts.en.json` — confessions + s5RequestionResponses + judge_evidence_combo + dossier-note
- `src/data/scriptedAngles/family-01_judge_questions.en.json` — only if KO `7ac600a1`→`08be3f25` touched anchors (verify with `git diff`)
- `src/data/scriptedAngles/family-01_angle_catalog.en.json` — verify
- `src/data/cases/generated/family-01.en.json` — Phase 1 data sync
- `src/data/claimPolicies/family-01-structure-v2.en.json` (if sidecar exists)
- `src/data/claimPolicies/family-01-dossier-cards.en.json` (if sidecar exists)
- `src/data/claimPolicies/family-01-v2-atoms.en.json` (if sidecar exists)
- `src/data/claimPolicies/family-01-game-events.en.json` / `family-01-game-events-v2.en.json` (if sidecar exists)
- `src/data/disclosurePolicy/family-01.json` EN-language fields (single file holds all 4 locales; only the EN sections under `disputes.d-2` / `disputes.d-5` / d-2 truthStages / d-5 truthStages may need updates if KO changes touched EN translation fields)
- `docs/localization/non-dialogue-extract/truth-leak-matrix.json` EN sections — already updated in `7ac600a1`; verify only

Sidecars that do not exist or do not mirror these structures may be skipped — confirm via `Glob` first.

## Working Procedure

1. `git fetch && git checkout main && git pull` — confirm HEAD is `08be3f25` or later.
2. Enumerate KO changes per commit:
   - Phase 1 data: `git diff 7ac600a1~1 7ac600a1 -- src/data/cases/generated/family-01.json src/data/claimPolicies/family-01-structure-v2.json src/data/disclosurePolicy/family-01.json docs/localization/non-dialogue-extract/truth-leak-matrix.json`
   - Phase 2-1 confessions: `git diff a856966d~1 a856966d -- src/data/scriptedAngles/family-01_special_scripts.json`
   - Phase 2-2 main sweep: `git diff e48eeae1~1 e48eeae1 -- src/data/scriptedAngles/family-01_interrogation_answers.json src/data/scriptedAngles/family-01_special_scripts.json src/data/scriptedText/family-01.json`
   - Phase 2-3 claimPolicies: `git diff 08be3f25~1 08be3f25 -- src/data/claimPolicies/family-01-dossier-cards.json src/data/claimPolicies/family-01-game-events.json src/data/claimPolicies/family-01-game-events-v2.json src/data/claimPolicies/family-01-v2-atoms.json`
3. For each KO change, locate matching `id` in the EN sidecar, re-write the EN text using the template tables above. Where a KO template repeats, use the single canonical EN replacement. Preserve `id`, `tags`, ordering, and `behaviorHint`.
4. For the data files (Phase 1), mirror the structural changes (`requiredEvidence`, `proves`, `requires`, `requiredLieState`, etc.) only if the EN sidecar contains those fields; otherwise focus on `text` / `name` / `truthDescription` / `verdictOptions` translation.
5. Run validation gates before commit.

## QA / truth-leak guards

- d-2 anchors (any layer) must not contain EN equivalents of `handwritten`, `90:10`, `forgery`, `reducing his share`, `practice draft`. The EN equivalents of these lexemes must read as forbidden in any d-2 stage. Mirror the KO sweep.
- d-5 anchors may contain `handwritten 90:10` / `notarized 60:40` only where the KO source carries them — generally d-5 stage 2 motive layer onward and `e-5` evidence presentations.
- d-1 / d-3 / d-4 anchors must not gain `handwritten` / `90:10` / `forgery` references; cross-references that previously mentioned the practice draft should now reference procedural context (e.g., "the surrounding procedural context" rather than "the practice draft").
- `truth-leak-matrix.json` EN sections: d-2.hidden must be the procedural set; d-5.hidden must include the handwritten-→-notarized reduction lines. Both were updated in `7ac600a1` — verify untouched.
- **Variation diversity (critical for Tier 2)**: each recurring KO template above corresponds to a single canonical EN closer. Non-S5 high-volume buckets should still meet ≥3 opener anchors and ≥3 closer anchors as a whole (from different KO anchors), but uniform KO closers map to uniform EN closers.

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

`docs/localization/threads/outputs/script-thread-35-en-family01-e5-reassignment-sync/`

Required:

- `SUMMARY.md` — files touched, variant counts per tier (Tier 1 data / Tier 2 narrative split), narrative-shift compliance notes
- `NARRATIVE_SPLIT_AUDIT.md` — 10-anchor spot audit showing KO before/after + EN before/after, demonstrating d-2 anchors no longer carry handwritten / 90:10 / forgery / own-share language and d-5 anchors carry the 90:10 → 60:40 reduction where appropriate.
- `VARIATION_AUDIT_SUMMARY.json` — anchor diversity preserved + template uniformity check
- `TRUTH_BOUNDARY_SUMMARY.json` — d-2 forbidden-lexeme violations = 0, d-5 narrative present where required
- `GIT_LOG.md` — final commit hashes

## Worktree hygiene

If spawning sub-agents, run `git config --global --add safe.directory <worktree>` first (memory `feedback_codex_worktree_safe_directory`). Do not edit KO sources from any sub-agent.
