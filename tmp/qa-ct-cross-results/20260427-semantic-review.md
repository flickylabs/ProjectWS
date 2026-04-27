# QA Scripted Result — Plan S-2 (CT-Cross)

- **Session**: QA-CT-Cross (Thread-QC, ClaudeCode separate session)
- **HEAD at scan time**: `5378700 docs(handoff): avoid pinning moving handoff head`
- **HEAD at report write**: `db0130e docs(qa): tier-2 QA test cases — functional / scripted / index` (docs-only delta vs `5378700` — verified `git diff --stat 5378700..db0130e` shows only `docs/qa-{functional,scripted,test-cases}.md` added, **0 changes to policy / scriptedText / runtime**). All scan findings remain valid for both SHAs.
- **git status**: clean working tree (only ephemeral `tmp/qa-ct-cross-{detector.cjs,results/}` untracked — read-only artifacts)
- **Scope**: TC-D1 / TC-D2 / TC-D5 / TC-F2 / TC-F5 / TC-F7 / TC-C1 / TC-C2 (9-dimension semantic review across all 14,931 variants of 3 active cases)
- **Plan position**: Plan S-2 (★★★★) primary; Plan P-2 partially folded in (static-side scan only; dynamic LLM sampling out of scope for read-only static session)

## Commands run

```bash
git status --short --branch        # clean (only 3 untracked docs)
git log --oneline -1               # 5378700
npm run check:all                  # PASS — 0 hard / 157 known WARN (baseline)
node tmp/qa-ct-cross-detector.cjs  # CT-Cross 9-dim full-pop scan
```

`npm run check:all` baseline confirmed:
- v6-evidence-unlock / archetype-quant / meter-timing / v3-stage-aware (14,931 variants) / v4-qa-coherence / v5-broad-detection — all 0 hard.
- legacy-precheck-matrix WARN-only (10 known family/friend d-5 HIGH issues)
- policy-vs-data-cross-check: 157 warnings — `forbiddenLexemes.surfaceOnly` (formerly known judge channel `형` warnings × spouse-01) + `surfaceName alias` (family/friend) + `dossier 출생 비밀 / 예비신랑이 먼저 late-state` (lieState-gated, allowed).
- policy-md-json-sync-check: 0 sync issues.

→ Baseline preserved. Tier 2 PASS conditions met before scan.

---

## PASS / FAIL / BLOCKED summary

| Dim | hits | New P0 | New P1 | New P2 | False positive |
|---|---|---|---|---|---|
| D1 lieStateFlow tonal mismatch | 6 | 0 | 1 | 5 | 0 |
| D2 truth-leak paraphrase (CT-Cross 우회 lex) | 46 | 0 | 14 | 22 | 10 |
| D3 archetype voice quant | 0 (per-variant) | — | — | — | — (heuristic limited; aggregated review left to Codex S-3) |
| D4 Q-A coherence (anti-pattern) | 0 | 0 | 0 | 0 | — |
| D5 번역체 9패턴 + 변형 | 1 | 0 | 0 | 0 | 1 |
| D6 register/honorific transgression | 3 | 0 | 2 | 1 | 0 |
| D7 사건 fact mismatch | 0 | — | — | — | — |
| D8 호칭 (partyA/B/원고/피고/영문 코드) | 0 | — | — | — | — |
| D9 명사형 부조화 | 0 | — | — | — | — |
| **Total** | **56** | **0** | **17** | **28** | **11** |

- **New hard issues**: 0 (no baseline regression — `npm run check:all` re-runnable)
- **Known baseline warnings**: 157 (unchanged)
- **New warnings**: 0 (all flags below are *additional candidates beyond the lexeme matcher*, i.e., new dimensions, not new wrapper warnings)

---

## Methodology

A read-only Node detector at [tmp/qa-ct-cross-detector.cjs](../qa-ct-cross-detector.cjs) was built (ephemeral; not committed; scans only). It walks all 14,931 variants × 18 channels × 3 cases and applies 9 detectors. Ran with `node tmp/qa-ct-cross-detector.cjs` and emits raw findings to `tmp/qa-ct-cross-results/20260426-findings.json`.

**Key principle (per `feedback_static_analysis_limit.md` 잘못 패턴 #12)**: this is an *additional* layer beyond Codex's lexeme-exact-match validator. It catches paraphrase / tokenization variants that the strict lexeme list misses. Each candidate below is hand-triaged against:
1. lieState gate (Truth Throttle) — S0–S2 strict / S3 partial / S4–S5 free
2. channel gate (`surfaceOnlyChannels` list)
3. NPC archetype expectation (per `story_v2_confirmed_3cases.md`)
4. CLAUDE.md 재판관 질문 품질 규칙 (간접 인용 / 기계적 관찰문 X)

False positives are listed transparently (10 of 56) so triage decisions are auditable.

---

## D1 LieState Flow tonal mismatch — 6 hits

All 6 hits flag the prefatory phrase `솔직히 말씀드리면` / `솔직히 말하면` at lieState S0–S2 NPC interrogation. Per Truth Throttle, S0–S2 should sit in 부정 / 일부 인정 / 핑계 — *not* confession-tone openings. Triage:

| Variant | case | channel | lieState | text | severity |
|---|---|---|---|---|---|
| `contra-b-h-d3-S2-v3` | spouse-01 | contradiction_pursuit | S2 | "솔직히 말하면 더 확인하기가 겁났습니다. 제 돈 문제까지 같이 열릴 것 같았습니다." | **P2** — 핑계 톤으로 자연스럽게 읽힘 (S2 적합) — false-positive risk |
| `b-d-1-S1-empathy-approach-v5` | family-01 | interrogation | S1 | "솔직히 말씀드리면 저는 제가 간 횟수를 세고 싶지 않았습니다…" | **P2** — empathy_approach ↗ S1 회피 톤 (정합) |
| `a-d-2-S0-empathy-approach-v4` | family-01 | interrogation | S0 | "솔직히 말하면 배신감이 먼저 들었습니다…" | **P2** — A의 victim-perspective opening, S0 적합 |
| `a-d-3-S1-motive-search-v3` | family-01 | interrogation | S1 | "솔직히 말씀드리면, 물으면 괜히 어머니 마음 상할까 싶었습니다…" | **P2** — S1 회피 변명, 톤 정합 |
| `a-d-4-S0-empathy-approach-v4` | family-01 | interrogation | S0 | "솔직히 말씀드리면, 또 속고 있는 것 같아서 숨이 막힙니다." | **P2** — S0 victim 톤 |
| `a-d-2-S2-motive-search-v5` | family-01 | interrogation | S2 | "솔직히 말하면, 의도가 있었다고 인정하는 순간 제 기준이 무너져서 그렇게 생각하지 않으려 했습니다." | **P1** — S2이지만 메타-인지 자백 톤 (의도 인정 직전 단계). 사용자 감수 권장 |

**Pattern observation**: the phrase `솔직히 말씀드리면` is being used as a NPC voice mannerism even in low-state denial entries. This may be intentional (charac voice) but should be reviewed against archetype expectation:
- spouse `b` (avoidant): rare use OK
- family `a` (confrontational): inconsistent — confrontational archetype rarely opens with `솔직히`
- family `b` (affect_flattening): more compatible

**Recommend** sampling these 6 for sentiment/tone alignment check during user spot-check pass.

---

## D2 Truth-leak paraphrase — 46 hits (the headline finding)

This is the most consequential dimension. The 46 hits are paraphrases of `globalTruthLexemes` that the policy validator's exact-match tokenization misses. Per `feedback_truth_leak_prohibition.md` 잘못 패턴 #9, this is the same class of leak surfaced in the user's previous 70-case spot check.

### D2-A — judge_* channels presuming truth (P1 candidates, 12 entries)

The most concerning subset. Judge channels (`judge_question`, `judge_contradiction`, `judge_evidence_combo`, `judge_witness_summon`) are listed in `surfaceOnlyChannels` — they MUST avoid `globalTruthLexemes`. The lexeme list includes `자기 몫을 줄인 조작`, `유서 자기 몫 축소`, `공장 부도 대납`, `형 공장 자금`, `출생 비밀`. The text variants below convey those facts via near-direct paraphrase that bypasses the matcher:

| Variant | case | channel | depth/tone | text | leak class |
|---|---|---|---|---|---|
| `judgeq-d-2-fact-pursuit-4-v3` | family-01 | judge_question | depth 4 | "윤정후 씨, 자기 몫을 줄였더라도 문서를 고친 책임은 인정하십니까." | `자기 몫 축소` |
| `judgeq-d-2-motive-search-3-v3` | family-01 | judge_question | depth 3 | "…자기 몫을 줄이면서도 왜 법적 위험을 감수하셨습니까." | `자기 몫 축소` |
| `judgeq-d-2-empathy-approach-3-v3` | family-01 | judge_question | depth 3 | "…자기 몫을 줄였다는 사실도 말하지 못한 이유가 두려움이었습니까." | `자기 몫 축소` |
| `judgeq-d-3-fact-pursuit-1-v5` | family-01 | judge_question | **depth 1** | "두 분, 생활비와 공장 자금의 출처를 구분해 말씀해 주십시오." | `공장 자금` (depth 1 = 초기. 누설 위험 高) |
| `judgeq-d-3-fact-pursuit-2-v3` | family-01 | judge_question | depth 2 | "…매달 보낸 돈과 공장 자금이 같은 흐름인지 설명해 주십시오." | `공장 자금` + `20년 송금` |
| `judgeq-d-4-motive-search-3-v1` | family-01 | judge_question | depth 3 | "윤정후 씨, **출생에 관한 사실이** 원본 유서를 고친 판단과 어떻게 연결됩니까." | **`출생 비밀` 직접 우회** + `유서를 고친` ← P1 우려 |
| `judgeq-d-4-empathy-approach-4-v1` | family-01 | judge_question | depth 4 | "…유서를 고친 일입니까." | `유서 조작` 우회 |
| `judgec-d-2-soft-v5` | family-01 | judge_contradiction | **soft** | "윤정후 씨, 자기 몫을 줄였다는 사실과 문서를 고친 책임을 함께 설명해 주십시오." | `자기 몫 축소` (soft tone ↔ early state) |
| `judgec-d-2-mid-v5` | family-01 | judge_contradiction | mid | "…자기 몫을 줄였다는 사정이 있어도 위조 책임은 남습니다…" | 동상 |
| `judgec-d-3-soft-v3` | family-01 | judge_contradiction | **soft** | "…생활비와 공장 자금까지 이어진다면 처음 설명이 너무 작았습니다…" | `공장 자금` (soft) |
| `judgeq-d-2-fact_pursuit-2-v1` | friend-01 | judge_question | depth 2 | "최수민 씨, **선을 넘은 말**에 어떻게 거절했는지 차분히 말씀하십시오." | `선넘는 메시지` 토큰 변형 (`선을 넘은`) |
| `judgec-d-2-hard-v1` | friend-01 | judge_contradiction | hard | "최수민 씨, 거절했다는 기록을 숨긴 선택이 오해를 만들었습니다…" | `B의 거절` 우회 (judge가 B의 거절을 사실로 단정) |

**Why this is P1**: per `feedback_truth_leak_prohibition.md`, the rule is that the judge / system / dossier surface MUST not assert truth before the player has discovered it via NPC confession at S5 or via evidence reveal. These judge entries are presented at the corresponding question depth — the player may reach `depth 1` early, before relevant disputes have hit S5. The fact that the validator passes (forbiddenLexemes exact-match) is the lexeme tokenization gap, not a real safety guarantee.

### D2-B — NPC speaker leaking accuser-side fact at S0 (P1, 2 entries)

| Variant | case | channel | lieState | text |
|---|---|---|---|---|
| `a-d-5-S0-fact-pursuit-v1` | family-01 | interrogation/A | **S0** | "제 동생이 어머니를 이용한 겁니다. **유서를 손댄** 것만 봐도 답이 나옵니다." |
| `a-d-5-S0-fact-pursuit-v2` | family-01 | interrogation/A | **S0** | "자기 몫을 줄였든 늘렸든 상관없습니다. 어머니가 정한 문서를 손으로 고쳤다면 이용한 겁니다." |

A (윤태성) at S0 is asserting that B (윤정후) tampered with the will (`유서를 손댄`, `문서를 손으로 고쳤다`) as established fact. This *is* A's perspective at S0 (B is accused), so it's defensible as character voice — but the assertion is *truth* (B did modify the will). At S0, the player should still be discovering this. The phrasing risks pre-revealing the conclusion.

**P1**: review whether A's S0 voice should hedge ("그런 정황이 보입니다" / "그렇게 생각합니다") rather than direct assertion.

### D2-C — NPC S2 near-confession (P1, 1 entry)

| Variant | case | channel | lieState | text |
|---|---|---|---|---|
| `b-d-4-S2-fact-pursuit-v1` | friend-01 | interrogation/B | **S2** | "다은이 아버지가 제 돈을 가져간 게 맞습니다." |

B (최수민) at S2 directly states the past `아버지의 사기` truth. S2 = 핑계 stage; this is too direct (closer to S4–S5 disclosure). **D1+D2 combined violation.**

### D2-D — evidence_discovery early-leak (P1, 1 entry)

| Variant | case | channel | text |
|---|---|---|---|
| `discover-b-e-4-capture-v1` | friend-01 | evidence_discovery | "지금 결혼이 깨질까 봐라고 하셨습니다. 먼저 **선을 넘는 메시지**를 보고도 송다은 씨에게 곧바로 알리지 않은 이유가 그것이었습니까." |

`evidence_discovery` is system-channel that surfaces during player evidence inspection. The text presumes "선을 넘는 메시지를 보고도" — i.e., asserts the truth as established. The lexeme list has `선넘는 메시지` (no 을); validator misses this paraphrase. **P1.**

### D2-E — defensible / false positives (10 entries)

Below are dropped from P1 since they fall within an allowed gate:
- `b-d-2-S0-fact-pursuit-v1` "유서를 손댄 적 없습니다." — B at S0 *denying* the accusation. The denial necessarily references the accusation; this is defensible as standard NPC denial pattern.
- `b-d-2-S0-empathy-approach-v4` similar denial pattern.
- `dc-3-b-q1-mid-v1`, `dc-3-b-q1-late-v2`, `dc-3-b-q1-late-v10` — dossier card B's reveal text at mid/late lieState. Dossier reveal IS the truth-disclosure channel; gated by unlock + lieState.
- `mediation-immediate-a-v1`, `trust-b-separation-S3-v3`, `trust-b-immediate-S3-v3` — mediation/trust-action at S3+ (gated).
- `judgeec-dc-3-b-q1-soft/mid/hard-*` — judge_evidence_combo entries fired AFTER dossier dc-3 unlock. Combination unlock = truth-revelation moment per game design. Borderline acceptable.
- `judgew-w-3-soft/hard-*` — witness summon for w-3 (박순애, 어머니 친구). Player explicitly summoned witness; partial fact assertion gated by witness availability.

### D2 — remaining P2 candidates (22 entries)

The 22 remaining D2 hits sit in:
- `evidence_present` `early-stage3-*` and `mid-stage3-*` (family-01 e-4) — stage 3 = deepest investigation (player drilled in). "early/mid" prefix refers to lieState bucket, not phase. Borderline.
- `dc-3-b-q1-mid/late-v*` family-01 — dossier-channel fully gated.
- `judgeec-dc-5-b-q1-*` family-01 — judge_evidence_combo for the deeper combo.
- friend-01 `dossier dc-3-b-q1-late-v1`, `trust-b-separation-S3-v8`.

These are downgraded to P2 because the gating logic likely intends them to fire at high-meter / deep-investigation states. They warrant a *second-eye* review (sampling for user spot-check) but are not safety-critical.

---

## D3 Archetype Voice Quant — methodology limit, 0 confident hits

The first detector pass naively flagged 627 spouse-01 entries as "victim_cosplay 단정 부재". On inspection these were **all false positives** — A (박지연)'s voice expresses 단정 implicitly via narrative ("그래도 아닐 수 있다고, 한 달을 더 참았습니다") rather than via the explicit token list (`분명히`, `확실히`, `절대`).

**Conclusion**: per-variant single-text static detection of archetype voice does not produce reliable signal. D3 must be evaluated either:
1. via *aggregated* archetype-voice frequency (Codex Plan S-3, archetype-quant precheck — already 0 hard in baseline), or
2. via LLM-based semantic review (Plan P-5 / TC-I2 dynamic LLM sample).

CT-Cross retains a tightened version that flags only **affect_flattening NPCs producing explicit outburst at S0–S3** (where outburst would be archetype-violation). It found 0 hits — confirming character voice consistency at the boundary.

This is an honest finding in line with `feedback_static_analysis_limit.md` 잘못 패턴 #12: the dimension exists, but static keyword detection is not the right tool.

---

## D4 Q-A Coherence — 0 hits

Detector specifically scans `judge_question` / `judge_contradiction` for the prohibited anti-pattern (CLAUDE.md 재판관 질문 품질 규칙):
- 긴 직접 인용 (15+ chars in quotes followed by `라고 하셨`)
- 기계적 관찰문 (`태도에 변화가 감지`, `내용이 확인됩니다`, `흐름이 나타납니다`)

Both produced 0 hits. The judge_contradiction sample manually reviewed (e.g., `judgec-d-1-soft-v1` "처음에는 오피스텔 방문을 생활 동선처럼 말씀하셨는데 지금은 다른 사정이었다고 말씀이 달라졌습니다") uses **간접 인용** correctly per the rule.

**TC-C2 / TC-F4 PASS for the static surface.**

---

## D5 번역체 — 1 hit (false positive)

| Variant | text | hit |
|---|---|---|
| `b-d-5-S4-empathy-approach-v4` | "이제 와서 보면 저는 지키려는 마음과 **오만을** 구분하지 못했습니다." | regex `[가-힣]+만을\s` matched "마음과 오만을 " — but "오만" is the noun "arrogance", not the `~만을` translation pattern |

**No real 번역체 detected**. TC-F1 PASS for static surface.

---

## D6 Register / honorific transgression — 3 hits (2 P1, 1 P2)

| Variant | case | channel | lieState | text | severity |
|---|---|---|---|---|---|
| `a-d-1-S1-motive-search-v2` | spouse-01 | interrogation/A → judge | S1 | "…사람이 안 말해주면 물건이라도 말해**주잖아요**." | **P1** — `잖아요` 콜로키얼; S1 ≠ emotional/confession beat (해요체 예외 X) |
| `a-d-1-S2-fact-pursuit-v3` | spouse-01 | interrogation/A → judge | S2 | "…숨기는 게 있으니까 그러는 거**잖아요**." | **P1** — 동상 |
| `a-d-5-S2-empathy-approach-v2` | family-01 | interrogation/A → judge | S2 | "이 말이 이렇게 늦게 나오**네요**. 제가 너무 쉽게 단정했던 것 같습니다." | **P2** — `네요` 어미는 empathy_approach 반응으로 정서적 톤 인접; S2이라 경계선 |

**Per CLAUDE.md**: "재판관 대상: 합니다체 필수 / emotional/confession beat만 해요체 예외". `잖아요`는 어떤 phase에서도 informal로 분류됨 → P1.

The 4 prior `네요`/`어요` hits at S4 entries (e.g., `a-d-4-S4-fact-pursuit-v5` "제 삶이었네요") were correctly *not* flagged — S4 = emotional outburst phase, 해요체 exception applies per `haeyo_policy_decision.md`.

---

## D7 / D8 / D9 — 0 hits each

- **D7 사건 fact mismatch**: spouse-01 amounts whitelist (3000/2000/5000 + small denominations) PASS. family-01 "9:1" / "90%" forbidden non-aftermath patterns PASS.
- **D8 호칭 (partyA/partyB/원고/피고/영문 archetype 코드/이쪽 분 등)**: 0 hits across 14,931 variants in second-pass strict scan. Confirms TC-B1/B2/B3/B5 PASS for the static surface.
- **D9 명사형 부조화**: 35 candidate hits in initial broad scan (`송금이`, `지원이`, `추궁이` 등), but on inspection ALL are natural noun + particle constructions. None match the user's documented awkward pattern (`X 돌봄으로`, `X 지원으로` per `feedback_revision_meaning_over_form.md` Patch 4). **TC-F5 PASS for static surface.**

---

## Plan P-2 (LLM 응답 cross-scan) — partial coverage notes

CT-Cross is read-only static; cannot run live LLM sampling (that's Codex Plan P-2 dynamic). However, the static-side fallback / scripted entries that mimic LLM response shape were swept for the same paraphrase patterns above. **No additional findings beyond the 56 already enumerated.**

For the dynamic LLM side, the Codex Plan P-2 should specifically test the following synonym sets — they are the empirically-confirmed gap from this static review:

```
spouse-01:  관계 우회 (어린 친척 / 가족의 한 사람 / 친 가족 / 혈육 / 친 혈육)
            돌봄 변형 (돌 봐 드 / 생필품을 사다 / 챙겨 주)
            대납 우회 (빚 대신)
            비자금 우회 (따로 모은 돈 / 몰래 마련한 돈)
family-01:  유서 조작 우회 (유서를 손댄 / 유서를 고친 / 유서를 바꾼)
            자기 몫 축소 (자기 몫을 줄)
            공장 자금 변형 (공장 자금 단독 사용)
            20년 송금 변형 (20년 동안 매달 보낸 / 20년 간 송금)
            출생 비밀 변형 (혈연 / 친생자 / 친자 관계)
friend-01:  접근/찝쩍 변형 (선을 넘는 메시지 / 선 넘는 / 선을 넘은 말)
            사기 우회 (다은이 아버지가 ~ 가져간 / 가로 / 뜯)
            같은 패턴 변형 (같은 패턴 단독 사용)
```

These can be appended to the lexeme list (or wrapped as semantic equivalence rules in the validator) to harden against the 잘못 패턴 #12 limit.

---

## Codex 교차 비교 요약

### Codex 검증 wrapper가 PASS / CT가 추가 발견한 영역

1. **`forbiddenLexemes.surfaceOnly` exact match**: PASS, but **CT detected 14 P1 paraphrase variants** in judge_* channels — the lexeme matcher's tokenization gap is the limit (잘못 패턴 #12 그대로 재현).
2. **lieStateGate.npcPolicies (180 entries scanned, PASS)**: CT detected 1 NPC paraphrase leak at S2 (`b-d-4-S2-fact-pursuit-v1` friend-01) and 1 D1 lieState-flow tonal violation at S2 (`a-d-2-S2-motive-search-v5` family-01).
3. **discoveryText.entries (PASS)**: CT detected 1 leak in `evidence_discovery` (`discover-b-e-4-capture-v1` friend-01 — `선을 넘는 메시지` paraphrase).

### Codex 결과와 CT 결과가 일치하는 영역

- Schema integrity / sync / surface map: all PASS, no divergence.
- D8 호칭 / D9 명사형 / D7 사건 fact / D4 Q-A 정합 / D5 번역체: confirmed clean.
- baseline-known WARN classes (`judge_question:judgeq-... 형 in spouse-01`, `dossier 출생 비밀 late-state`, `예비신랑이 먼저 late-state`): CT confirms these are in lieState-allowed states and not new findings.

### Codex가 발견 / CT 미검출 영역

CT's pattern set focuses on paraphrase + tonal mismatch. The Codex baseline already separately catches:
- `surfaceName alias` divergence (family/friend e-1..7) — CT did not re-scan policy/data alignment (out of scope).
- 10 known family/friend d-5 HIGH legacy issues — CT confirms in baseline output but did not deep-scan.

These remain Codex-owned territory.

---

## Suggested next action

For CT-Main triage:

1. **P1 truth-leak paraphrases (14 entries)** — the most actionable finding. Recommend either:
   - **Option A** (validator-side): extend `forbiddenLexemes.globalTruthLexemes` with the paraphrase variants enumerated in Plan P-2 cross-scan section above. Re-run `npm run check:all` to confirm new wrapper hits, then issue Codex-Dev request for ScriptedText 보정.
   - **Option B** (data-side): direct GPT Pro 의뢰서 for the 14 specific variant IDs listed in §D2-A/B/D, requesting paraphrase neutralization while preserving lieState narrative (per `feedback_revision_meaning_over_form.md` 9차원 보정).
   - **Recommended**: Option A first (validator hardening) — captures future regressions; then Option B for the existing 14 variants. CT-Main approves which.

2. **P1 register transgressions (2 entries)** — `잖아요` colloquial endings at non-emotional NPC interrogation. Small enough for direct CT-Main edit (or batched into the same Codex-Dev request).

3. **P2 D1/D2 candidates (28 entries)** — surface to the user spot-check rotation; do not auto-process. Per `feedback_revision_meaning_over_form.md` 잘못 패턴 #6, single-pass mechanical revision risks meaning loss.

4. **D3 archetype voice** — defer to Codex Plan S-3 (aggregated quant) and Plan P-5 (LLM dynamic). Static per-variant detection rejected as unreliable.

5. **Re-baseline note**: 0 new hard issues, 0 new wrapper warnings. Tier 2 baseline maintained. No action needed on a10b801 anchor.

---

## Files touched

- **none** in `src/`, `docs/disclosure-policy.md`, policy JSON, validator wrappers, TC documents, runtime — per absolute prohibition.
- **created** (ephemeral, tmp/, not committed):
  - `tmp/qa-ct-cross-detector.cjs` — read-only 9-dim detector script
  - `tmp/qa-ct-cross-results/20260426-findings.json` — raw findings dump
  - `tmp/qa-ct-cross-results/20260427-semantic-review.md` — this report

---

## Reproducibility

```bash
# from repo root
git log --oneline -1                 # 5378700 or db0130e (docs-only diff)
npm run check:all                    # must show 0 hard / 157 known WARN
node tmp/qa-ct-cross-detector.cjs    # regenerates findings JSON
```

Findings JSON is structurally `{ generatedAt, head, scope, cases, counts: {byDim, byDimCase, totalVariantsScanned}, findings: [{dim, caseId, channel, party, disputeId, lieState, variantId, hits[], textPreview}] }` — directly grep-able by dim or variantId.
