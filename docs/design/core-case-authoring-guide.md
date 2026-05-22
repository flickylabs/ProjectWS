# Core Case Authoring Guide

신규 사건 작성 가이드. Authority 단일 출처(`src/data/coreCases/{caseId}.case.ts`)에서 4 derived layer를 자동 sync하는 워크플로우 권위.

## 1. 시작 전 사용자 결정 영역 (4 항목)

새 사건 작성 시작 전 사용자(또는 시나리오 권위자)와 다음 4 항목 확정:

| 결정 영역 | 내용 | 영향 |
|---|---|---|
| **monetaryDisputeIds** | 어떤 dispute가 금전 쟁점인가 | 비금전 사건 금전 frame 오염 방지. UI matter 영역 표시 |
| **dossier card linkedDisputes** | 각 dc-* 가 단일 link (strict)인가 2 link (max)인가 | dc 카드가 한 frame 영향인지 두 frame 동시 영향인지 결정. schema는 1~2 array 허용 |
| **dossier card linkedParty** | 각 dc-* 가 어느 측(a/b) 권위 카드인가 | 단일 strict (양측 자료 혼동 차단). challenges는 양측 모두 가능 |
| **evidence requiredLieState** | 어떤 evidence가 어느 단계(S0~S3)까지 봉인되는가 | 깊이 영역 evidence sensitive sealing. 일반적 e-1~e-3 = unsealed / e-4~e-7 = S1~S3 |

또한 사건 흐름 timeline 6단계 (또는 5~7단계) 영역, party A/B archetype 분류, anchorTruth 영역도 사전 확정 권장.

## 2. 작성 워크플로우 (Authority → derive → 검증)

### Step 1: template 복사

```bash
cp src/data/coreCases/template.case.ts src/data/coreCases/{caseId}.case.ts
```

`{caseId}`는 `spouse-01` / `family-01` / `friend-01` 패턴 (kebab-case + 두 자리 숫자). 예: `colleague-01`, `sibling-02`.

### Step 2: meta + export 이름 변경

`{caseId}.case.ts`에서 다음 2곳 동시 변경:

```typescript
// 1. meta.caseId
meta: {
  caseId: 'colleague-01',         // ← 변경
  caseNumber: 'TE-Colleague01',   // ← 변경 (선택)
  ...
}

// 2. export 이름 — loader가 camelCase 변환 후 `{camelCase}CaseAuthority` 찾음
export const colleague01CaseAuthority: CoreCaseAuthority = { ... }
export default colleague01CaseAuthority
```

`loadAuthority` ([scripts/build-core-case/loadAuthority.mjs](../../scripts/build-core-case/loadAuthority.mjs))는 다음 변환:
- `'colleague-01'` → `'colleague01'` → `colleague01CaseAuthority`
- fallback: `caseAuthority` 또는 `default` export

### Step 3: 17 영역 채움 (순서 권장)

template의 `[TODO ...]` 마커 위치를 다음 순서로 채움:

1. **meta** — caseId, caseName, title, anchorTruth (3~5 문장), emotionalBait, resolutionDilemma, sensitivityTags
2. **context** — description, emotionalPressure (0~10), triggerAmplifier
3. **parties** (a + b) — name, age, archetype, speechStyle, fear (⚠ uiExposure 보호), dailyRoutine, sensitivePoints, verbalTells, callTerms
4. **timeline** — 6 stage (또는 5~7), 사건 흐름 순서대로
5. **truthTable** — 5 fact (t-1 ~ t-5)
6. **disputes** — 5 chain (d-1 entry → d-5 final). **가장 큰 영역**. 핵심은 truthStages (60 entry: 5 × 6 × 2)
7. **evidence** — 7 (e-1 ~ e-7). description 영역 surface-safe 사전 audit 필수
8. **witnesses** — 3 (w-1 ~ w-3)
9. **dossierCards** — 5 (dc-1 ~ dc-5). challenges는 a/b 양측 또는 단일
10. **combinationRecipes** — 5~12. evidence_combine / statement_combine / witness_combine route
11. **authorityPlacements** — 재판관 추천 모먼트 (10~15)
12. **officialRecordRecommendations** — 권고 기록 (5)
13. **solutions** — mediation 카테고리별 (3 카테고리 × 2~3 해결안)
14. **relationshipLedger** — 4 entry (distorted / silenced / pressured / distant 등)
15. **flags** — baseEvidenceIds (3 tuple) / monetaryDisputeIds / activeLedgerEntries / activeThirdParties
16. **uiExposure** — 8 기본 필드 게이트 (`partyA.fear` 등). 사건별 추가 필드 가능
17. **freeInterrogation** — paraphraseRules 5~15 (자유 심문 가드)
18. **truthLeakOverride** — `perDispute = {}` 기본값 권장. designIntentTags whitelist만 등록

### Step 4: 첫 검증 (dry-run)

```bash
npx tsx scripts/build-core-case.mjs --case {caseId} --dry-run
```

출력:
- `tmp/core-case-derive/{caseId}/_diff/_summary.md` — 4 layer (L1/L3/L4/L5) 변경 요약
- `tmp/core-case-derive/{caseId}/_diff/L{1,3,4,5}.before.json` + `.after.json` — VSCode 비교용

이 시점 결과:
- 모든 layer "NEW FILE"
- L5 matrix는 `+1/-0/~0` (새 caseId 항목 추가)

### Step 5: TS 컴파일 확인

```bash
npx tsc -b --force
```

silent = PASS. 오류 발생 시 schema mismatch 영역 fix.

### Step 6: --write 적용

```bash
npx tsx scripts/build-core-case.mjs --case {caseId} --write
```

실제 derive 파일 작성:
- `src/data/cases/generated/{caseId}.json` (L1)
- `src/data/claimPolicies/{caseId}-v3-game-loop-data.json` (L3)
- `src/data/disclosurePolicy/{caseId}.json` (L4)
- `docs/localization/non-dialogue-extract/truth-leak-matrix.json` (L5, case-level merge)

### Step 7: loader 동기화 (claimPolicies)

`src/data/claimPolicies/{caseId}.ts` 작성 (spouse-01.ts 패턴 동일):

```typescript
import v3GameLoopData from './{caseId}-v3-game-loop-data.json'
import { /* game events */ } from './{caseId}-events' // 별도 작성 영역

const v3WithEvents = { ...v3GameLoopData, events: gameEvents }

export const {caseId}ClaimPolicy = v3WithEvents
export default {caseId}ClaimPolicy
```

### Step 8: 3종 검증

```bash
npx tsc -b --force                                  # tsc silent = PASS
npm run qa:fast                                      # static/route/combined P0 = 0
node scripts/detect-truth-leak.cjs --strict          # 0 findings
```

3종 PASS 시 마이그레이션 성공. 회귀 발생 시 [§ 4 회피 영역](#4-회피-영역--phase-3-학습) 참조.

### Step 9: commit

```bash
git add src/data/coreCases/{caseId}.case.ts \
        src/data/claimPolicies/{caseId}.ts \
        src/data/claimPolicies/{caseId}-v3-game-loop-data.json \
        src/data/cases/generated/{caseId}.json \
        src/data/disclosurePolicy/{caseId}.json \
        docs/localization/non-dialogue-extract/truth-leak-matrix.json

git commit -m "feat(core-case): {caseId} Authority 마이그레이션"
```

## 3. truthStages 작성 패턴 (S0~S5 단계 권위)

가장 중요한 영역. 각 dispute × 6 stage × 2 party = 12 entry × 5 dispute = 60 entry.

### 단계별 권위 (KO 권위)

| Stage | 의미 | transitionTrigger | A 측 (claimant) | B 측 (defendant) |
|---|---|---|---|---|
| **S0** | 양측 표면 frame | `null` | 단정 발화 (frame 강화) | 부정 발화 (frame 유지) |
| **S1** | 단정에서 한 발 물러남 | `direct` | 단정 톤 완화 ("정황상 의심") | 모호어 사용 ("가족 쪽 일") |
| **S2** | 동기/맥락 일부 인정 | `motive` | 자기방어 frame ("내가 그럴 수밖에") | 부분 인정 ("챙겨야 할 사람") |
| **S3** | 핵심 사실 시인 | `hard_evidence` | 단정 frame 흔들림 (가능성 인정) | 핵심 사실 시인 (구체 명사 등장) |
| **S4** | 동기/감정/심리 인정 | `empathy` | 단정 책임 일부 수용 | 회피 동기/공포 직접 명시 |
| **S5** | 진실 완전 인정 | `direct` | 행위 + 동기 + 결과 완전 진술 | 양측 책임 분리까지 인정 |

### forbiddenKeywords 단계별 축소

- **S0**: 가장 많은 키워드 (모든 truth lexeme 4언어 등록)
- **S1**: 핵심 lexeme 유지
- **S2**: 단계별 인정 영역 keyword 제외
- **S3**: 핵심 행위 lexeme 1~2 보존
- **S4**: 거의 비움 (마지막 봉인 lexeme만)
- **S5**: 빈 배열 `keywords([], [], [], [])`

### answerFrame 작성 패턴

LLM 자유 심문 응답 가이드. 각 entry 1~2 문장:

```typescript
answerFrame: ko('A는 외도 frame을 강하게 유지. 동기·맥락 질문엔 "그런 게 외도 아니면 뭐냐" 식 단정 반복.')
```

### transitionBeat 영역

S1~S5 각 entry는 `transitionTrigger`와 함께 `transitionBeat.line` + `behaviorHint`. derive에서 L3 transitionBeats[] (30개)로 자동 emit.

## 4. 회피 영역 — Phase 3 학습

### 회피 1: PowerShell file swap 절대 금지

[feedback_powershell_encoding_utf8](../../memory/feedback_powershell_encoding_utf8.md) 참조.

- **금지**: `Get-Content $path | Set-Content $path` 같은 in-place swap
- **이유**: PowerShell 5.1 기본 ANSI 디코딩이 한국어 mojibake 생성, file 복구 불가능
- **대안**: Write/Edit tool 사용. PowerShell 필수 시 `-Encoding UTF8` 명시 + `[System.IO.File]::WriteAllLines + UTF8Encoding(false)`
- **dispute array 순서**: 처음부터 d-1 → d-N 정렬 작성. swap operation 회피

### 회피 2: evidence.description은 surface-safe

[design_core_case_derive_hybrid_merge](../../memory/design_core_case_derive_hybrid_merge.md) "L4 surfaceMap.evidence" 참조.

- **금지**: description에 truth lexeme 직접 포함 ("형 오피스텔에서 조카 돌봄" 등)
- **이유**: stage 0(Stub) 노출 영역이라 surface-safe 표현 필요. 직접 노출 시 qa-runtime-gate `evidence_stage_truth_description_exposure` P0
- **대안**: surface-safe로 작성 ("예전 관계가 끊기기 직전, 짧은 한 마디만 남기고...")
- **깊이 노출**: `depthStages.original / context` summary로 단계적 처리

### 회피 3: designIntentTags whitelist 보존

[session_handoff_20260523_core_case_phase3_friend01_complete](../../memory/session_handoff_20260523_core_case_phase3_friend01_complete.md) 회귀 3 참조.

- **사전 audit**: baseline `truth-leak-matrix.json` 의 `{caseId}.{disputeId}._designIntentTags` 영역 확인
- **새 형식**: `['band:late', 'archetype:confess', 'reveal:full', 'channel:aftermath']` (4개 prefix)
- **보존 영역**: `continuity:*`, `gating:*`, `stance:*` 같은 baseline scriptedText variant tag와 sync 필수
- **위반 시**: detect-truth-leak P0 finding (e.g. friend-01 d-3에 `continuity:evidence_combo` 누락 시 "돈을 빌려 달라" leak)

### 회피 4: schema enum 영역 직접 매치

- **`completeness`**: `'original' | 'edited' | 'partial' | 'context_missing'` — `'excerpt'`은 enum 외 (e-2)
- **`whoDistorts`**: `'a' | 'b' | 'both' | 'none'` — `'neither'`는 enum 외 (ledger-3)
- **`evidence type`**: 28종 enum 권위 (`'bank'`, `'chat'`, `'log'`, ... — [schema 확인](../../src/types/coreCase.ts#L372))
- **확인 방법**: case JSON에서 그대로 옮기지 말고 schema enum 영역 직접 매치

### 회피 5: truthLeakOverride union false positive

[design_truth_leak_keyword_nature](../../memory/design_truth_leak_keyword_nature.md) 참조.

- **권장**: `truthLeakOverride.perDispute = {}` 기본값
- **이유**: Authority `truthStages.forbiddenKeywords`는 LLM frame inject용 광역 (동기·심리·태도 포함). L5 matrix hidden은 surface detector용 정밀 phrase (행위·사실만)
- **위반**: 두 영역 동일 keyword union 시 false positive 회귀 (family-01 마이그레이션 시 108건 발견)
- **추가 phrase 필요 시**: 행위/사실 영역만 등록 (e.g. "20년간 통장 경유", "공장 위기 3억 흐름")

### 회피 6: surfaceName 분리 시 scriptedText 회귀

- **현상**: e-2~e-7의 baseline `surfaceName = name` (surface 보호 효과 없음). Authority에서 분리 시도 시 scriptedText 표현 detector P0
- **대안 1**: Phase 1에서 baseline `surfaceName = name` 유지. surface polish는 별도 Phase 2 backlog (Codex worktree 의뢰)
- **대안 2**: 신규 사건은 처음부터 surface 분리 + scriptedText 일관 작성

## 5. 검증 명령 모음

```bash
# Authority + cross-ref 검증 (write 안 함)
npx tsx scripts/build-core-case.mjs --case {caseId} --dry-run

# 4 layer 실제 적용
npx tsx scripts/build-core-case.mjs --case {caseId} --write

# 특정 layer만 적용
npx tsx scripts/build-core-case.mjs --case {caseId} --write --layers L1,L4

# TS 컴파일 검증
npx tsc -b --force

# 정적 + 런타임 게이트
npm run qa:fast

# 진실 누설 detector (4 언어)
node scripts/detect-truth-leak.cjs --strict
```

## 6. hybrid merge 정책 요약

[design_core_case_derive_hybrid_merge](../../memory/design_core_case_derive_hybrid_merge.md) 참조.

**Authority 권위 영역** (derive가 Authority 채택):
- L1: meta, parties, context, disputes, evidence top-level, witnesses, truthTable, solutions
- L3: dossierCards, transitionBeats[], leadLines, authorityPlacements
- L4: surfaceMap 상위, discoveryText, issueProgression 구조
- L5: hidden 키워드 (Authority truthLeakOverride.perDispute union)

**기존 보존 영역** (derive가 기존 fallback):
- L1: evidence.viewerData / meta / investigationResults (수천 line 가짜 rendering)
- L1: evidence.partyContext / v3DepthPlan / v3TrustStates summary (Authority 텍스트가 truth lexeme 직접 노출 영역)
- L4: surfaceMap.evidence[id].{truthLexemes, descriptionTruth} (정밀 큐레이션)
- L4: forbiddenLexemes.globalTruthLexemes (surface 가드용 정밀)
- L4: lieStateGate, uiSurfaceMap (engine runtime semantics)
- L3: stateUnlockAtoms, events (자유 작성)

## 7. 참조 메모리

- [session_handoff_20260522_core_case_phase1_step12_complete](../../memory/session_handoff_20260522_core_case_phase1_step12_complete.md) — schema 권위 정착
- [session_handoff_20260522_core_case_phase1_step3_complete](../../memory/session_handoff_20260522_core_case_phase1_step3_complete.md) — build script + spouse-01 pilot
- [session_handoff_20260522_core_case_phase1_step4_complete](../../memory/session_handoff_20260522_core_case_phase1_step4_complete.md) — engine 마이그레이션 (η uiExposure / θ answerFrame / paraphraseRules)
- [session_handoff_20260523_core_case_phase3_family01_complete](../../memory/session_handoff_20260523_core_case_phase3_family01_complete.md) — family-01 첫 정합 마이그레이션
- [session_handoff_20260523_core_case_phase3_friend01_complete](../../memory/session_handoff_20260523_core_case_phase3_friend01_complete.md) — friend-01 회귀 학습
- [design_core_case_derive_hybrid_merge](../../memory/design_core_case_derive_hybrid_merge.md) — hybrid merge 영역 권위
- [design_truth_leak_keyword_nature](../../memory/design_truth_leak_keyword_nature.md) — hidden keyword 본성 분류
- [feedback_powershell_encoding_utf8](../../memory/feedback_powershell_encoding_utf8.md) — PowerShell 인코딩 회피
- [feedback_baseline_anchor_scripted_text](../../memory/feedback_baseline_anchor_scripted_text.md) — scriptedText 변경 시 Codex 의뢰 영역

## 8. 참조 파일

```
src/data/coreCases/template.case.ts                 ← skeleton (이 가이드의 시작점)
src/types/coreCase.ts                                ← schema (17 영역 zod 권위 + cross-ref validator)
scripts/build-core-case.mjs                          ← build entry (--case / --dry-run / --write / --layers)
scripts/build-core-case/loadAuthority.mjs            ← tsx loader + schema parse + cross-ref
scripts/build-core-case/derive/{legacyCaseJson,claimPolicyV3,disclosurePolicy,truthLeakMatrix}.mjs
src/data/coreCases/spouse-01.case.ts                 ← pilot 사례 (3 dispute / 7 evidence / 3 witness / 5 dossier)
src/data/coreCases/family-01.case.ts                 ← 5 dispute 사례 (60 truthStages)
src/data/coreCases/friend-01.case.ts                 ← 5 dispute 사례 + designIntentTags whitelist 영역
```
