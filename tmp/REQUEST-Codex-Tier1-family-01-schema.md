# REQUEST: Tier 1 family-01 Disclosure Policy schema (Codex 주도)

**작성**: ClaudeCode CT (2026-04-27)
**근거**: spouse-01 schema (commit `6ee9690`) 안정화 후 family-01 확장 (사용자 결정 4-A, friend-01 보류)
**분담**: Codex 주도 / ClaudeCode CT 검수 / 사용자 최종 승인
**참조 의뢰서**: `tmp/REQUEST-Codex-Tier1-spouse-01-progression-d2-d3-d4-redraft.md`

---

## 0. 절대 회피 (가장 위)

### 0.1 한글 인코딩 손상 (spouse-01 사고 학습)

**원인 (spouse-01 1차 추가 작업)**: PowerShell here-string → node stdin 방식으로 큰 한글 JSON 갱신 시 인코딩 깨짐 → ASCII `?`로 변환.

**필수 조건 (spouse-01 의뢰서와 동일)**:
1. ❌ **PowerShell here-string → node stdin 방식 금지**
2. ✅ **apply_patch 또는 UTF-8 보장 방식만 사용**
3. ❌ **JSON parse만으로 완료 판정 금지** (`?`도 valid JSON)
4. ✅ **한글 손상 검증 5종 강제** (§5.1.1 작업 완료 보고 7개 참조)

### 0.2 정책 위반

- ❌ **진실 누설 금지** — `docs/disclosure-policy.md` 참조
  - 재판관·시스템·dossier 및 NPC 비자백 채널에서 S5 전 진실 lexeme 노출 X
  - deep investigation evidence detail은 evidenceStage 정책 따름 (§2.3)
  - aftermath 채널 = 판결 후 자유 공개 (§2.4)
- ❌ **ScriptedText 자동 수정 X** (잘못 패턴 #6)
- ❌ **코드 변경 X** (Tier 4+ 전까지)
- ❌ **JSON 정책 runtime import X** (Tier 3 진입 전)
- ❌ **사건 fact 변경 X** — `src/data/cases/generated/family-01.json` + `memory/story_v2_confirmed_3cases.md` family-01 영역을 fact authority로
- ❌ **baseline-pre-policy-v1 (a10b801) 회귀 X**
- ❌ **spouse-01 정책 (`6ee9690`) 영역 변경 X**
- ❌ **`_schema.md` 변경 X** — 이미 정의됨, 골격 재사용

---

## 1. 목표

**family-01 disclosure policy JSON schema 적용 + 모든 dispute issueProgression sample-complete (한 번에)**.

spouse-01 schema 골격을 재사용. 사건 fact 영역만 family-01에 맞춰 작성.

---

## 2. 근거

- 사용자 결정 4-A: family-01 schema 확장 (friend-01 병렬 보류 — 안정성 확인 후 진행)
- spouse-01 schema 골격 (commit `6ee9690`): 7 섹션 (surfaceMap / forbiddenLexemes / channelAuthority / lieStateGate / uiSurfaceMap / discoveryText / issueProgression) 정착
- `_schema.md` 정의 사용
- baseline anchor: `baseline-pre-policy-v1` (a10b801)

---

## 3. 분담

| 영역 | 주도 | 검토 |
|---|---|---|
| family-01.json 7 섹션 | Codex | ClaudeCode (한국어 자연체 + 인코딩 검증) |
| family-01-cross-check.md | Codex | ClaudeCode (의미·정합성) |
| caseData / claimPolicies cross-check | Codex 자체 | ClaudeCode (sample) |
| 인코딩 검증 (5.1.1) | Codex 자체 | ClaudeCode 재검증 |

---

## 4. 산출물

### 4.1 필수 (blocker)

#### A. `src/data/disclosurePolicy/family-01.json`

7개 섹션 모두 포함 (spouse-01 schema 골격 그대로):

**메타**:
- `caseId`: `"family-01"`
- `sourceCaseId`: `"case-family-01"`
- `schemaVersion`: `"tier1-disclosure-policy-draft-v1"` (spouse-01과 동일)
- `baselineTargetSha`: `"a10b8011c3311d2a6ab20dd4a06edb29a4ac48e3"`
- `runtimeImportAllowed`: `false`
- `draftStatus`: `"schema-draft-full-progression"` (모든 dispute sample-complete)

**1. surfaceMap** — evidence 7건 (e-1~e-7) + dispute 5건 (d-1~d-5) + witnesses
- 각 evidence: surfaceName / name / surfaceDescription / descriptionTruth / truthLexemes / sourceRefs
- caseData path: `p.evidence[]` (top-level, **spouse-01의 `p.duo.evidence`와 다름**)
- caseData path: `p.disputes[]` (top-level)

**2. forbiddenLexemes** — 사건별 진실 lexeme list
- `globalTruthLexemes`: family-01 anchor 진실 영역
  - "출생 비밀", "배다른", "혈연 다른", "다른 어머니"
  - "20년 동안 B 돈", "정후 돈으로 어머니", "20년 부양"
  - "유서 자기 몫 축소", "유서 조작 동기"
  - "경영권 위기" (A의 출생 비밀이 드러나면 회사 위기)
  - 메모리 #9 + caseData anchor에서 추출
- `surfaceOnlyChannels`: 6채널 (judge_*4 / system_message / dossier)
- `nonConfessionNpcBeforeS5`: lieState별 정책
- `allowedSurfaceSubstitutes`: surface 표현 매핑

**3. channelAuthority** — spouse-01과 동일 4 카테고리
- surfaceOnly / lieStateDriven / playerDiscovered / freeAfterVerdict

**4. lieStateGate** — Truth Throttle + channelMatrix + npcPolicies
- `npcPolicies.partyA`: 윤태성 (confrontational) — 단정·반격 archetype
- `npcPolicies.partyB`: 윤정후 (affect_flattening) — 감정 평탄화 archetype

**5. uiSurfaceMap** — UI 노출 영역 광역 (P7 방지)
- spouse-01과 동일 11 fieldPolicy
- entries: family-01 caseData에서 발견한 UI 후보 사례
- claimPolicies 파일도 점검:
  - `src/data/claimPolicies/family-01-dossier-cards.json` (별도 파일)
  - `src/data/claimPolicies/family-01-game-events-v2.json`
  - `src/data/claimPolicies/family-01-structure-v2.json`
  - **참고**: family-01에는 `family-01-v3-game-loop-data.json` 없음 (spouse-01만 존재)
- `unresolvedExposure`: UI 경로 미확인 영역

**6. discoveryText** — gate 정책
- family-01의 evidence 조합 / discovery 영역 (combinationLab 또는 evidenceCombinations)
- spouse-01과 동일 형식: route + stage + truthStage + autoSurfaceAllowed: false + surfaceFallback

**7. issueProgression** — 5 dispute 모두 sample-complete

각 dispute (d-1, d-2, d-3, d-4, d-5) Stage 0~4 본격 작성 (spouse-01 d-1/d-2/h-d3/h-d4 sample 형식 그대로):
- `stage` / `name` / `surfaceClaim` / `hiddenTruth`
- `entryConditions` / `allowedDisclosure` / `forbiddenDisclosure`
- `validActions` / `requiredEvidence` / `requiredWitness`
- `meterTriggers` (`emotion` / `trust` / `leak`)
- `failureResponse` (`npc` / `gameplay`)
- `successUnlocks`

**principles** (spouse-01과 동일):
- primaryAxis: "statementFracture + truthStage"
- truthStageIsNotLieState: true
- meterRole: emotion = 단기 반응·취약점 / trust = 협조 태도 / leak = 조건부 결과

**failureResponse 게임 디자인 원칙 보존**:
- "반복 추궁이 아니라 분리/증거 깊이를 가리켜야"
- "d-X만으로 d-Y/d-Z를 자동 해결하지 않음"
- 사용자 우려 ("뭘 공략하는지 모르겠다") 처방 명시

#### B. `src/data/disclosurePolicy/family-01-cross-check.md`

spouse-01-cross-check.md 형식 그대로:
- Evidence Surface Map (7건)
- Dispute Map (5건 — d-1~d-5 가시성 / hidden 분류)
- UI Surface Candidates (caseData / claimPolicies UI 후보)
- discoveryText Gate Candidates
- v2/v3 Policy Sample Checks
- ScriptedText Sample Checks
- Open Questions for CT/User
- **Source Conflict Found** (spouse-01에서 발견된 v3 loop-data 충돌과 유사한 영역이 family-01에도 있는지 사전 점검)
- Validation Run 표 (12+ 항목 모두 PASS 명시)

### 4.2 선택 (best-effort)

- 추가 cross-check 발견 (v2-atoms / structure-v2 / game-events-v2 sample 검증)

---

## 5. 검증

### 5.1 자동 검증 (Codex 자체)

```bash
# 1. JSON parse
node -e "JSON.parse(require('fs').readFileSync('src/data/disclosurePolicy/family-01.json','utf8'))"

# 2. baseline anchor 회귀 X
node tmp/detect-truth-leak.cjs                          # leak 0 (3 case)
sha256sum src/data/scriptedText/family-01.json          # baseline 유지
sha256sum src/data/cases/generated/family-01.json       # baseline 유지
sha256sum src/data/scriptedText/spouse-01.json          # baseline 유지 (회귀 검증)
sha256sum src/data/cases/generated/spouse-01.json       # baseline 유지

# 3. 한글 인코딩 검증 (spouse-01 학습)
grep -c '"?"' src/data/disclosurePolicy/family-01.json
grep -c '"??"' src/data/disclosurePolicy/family-01.json

node -e "
const p = JSON.parse(require('fs').readFileSync('src/data/disclosurePolicy/family-01.json','utf8'));
const koreanRegex = /[가-힯]/;
for (const id of ['d-1','d-2','d-3','d-4','d-5']) {
  const d = p.issueProgression.disputes[id];
  console.log(id, 'title korean:', koreanRegex.test(d.title));
  for (const s of d.truthStages) {
    console.log(id, 'stage', s.stage, 'name korean:', koreanRegex.test(s.name));
    console.log(id, 'stage', s.stage, 'surfaceClaim korean:', koreanRegex.test(s.surfaceClaim));
  }
}
"

# 4. spouse-01 정책 회귀 X
sha256sum src/data/disclosurePolicy/spouse-01.json     # commit 6ee9690 시점과 일치

# 5. 8 layer precheck allPass
node tmp/codex-recovery-v6/precheck-liestate-flow.cjs
node tmp/codex-recovery-v6/precheck-evidence-unlock.cjs
node tmp/codex-recovery-v6/precheck-archetype-quant.cjs
node tmp/codex-recovery-v6/precheck-meter-timing.cjs
node tmp/codex-recovery-v3/precheck-stage-aware.cjs
node tmp/codex-recovery-v4/precheck-qa-coherence.cjs
node tmp/codex-recovery-v5/precheck-broad-detection.cjs
```

### 5.1.1 작업 완료 보고 필수 포함 (사용자 명시 — spouse-01과 동일)

작업 완료 보고에 다음 7개 검증 결과를 **모두** 포함한다. 한 항목이라도 누락 시 CT 검수 진입 X.

1. **spouse-01 정책 byte 동일 / diff 없음**
   - `git diff 6ee9690 -- src/data/disclosurePolicy/spouse-01.json src/data/disclosurePolicy/spouse-01-cross-check.md src/data/disclosurePolicy/_schema.md` 결과 = empty

2. **family-01 d-1 ~ d-5 한글 필드 sample 출력**
   - 각 dispute의 `title` 1건
   - 각 dispute의 stage 0/2/4 중 1~2 stage의 `name` / `surfaceClaim` raw 출력

3. **literal `?` / `??` 검증**
   - `grep -c '"?"' src/data/disclosurePolicy/family-01.json` (= 0 기대)
   - `grep -c '"??"' src/data/disclosurePolicy/family-01.json` (= 0 기대)

4. **hex dump sample**
   - family-01.json의 d-1 stage 0 `surfaceClaim` 라인 `od -c` 출력 (UTF-8 multi-byte 확인)

5. **JSON parse PASS**

6. **runtime import 0건**
   - `grep -r 'disclosurePolicy' src/engine src/components src/hooks src/app src/store` = 0건

7. **truth leak 0건**
   - `node tmp/detect-truth-leak.cjs` 결과 spouse/family/friend 모두 0건

### 5.2 ClaudeCode CT 검수 영역

- [ ] 한글 인코딩 무결성 (5.1.1 결과 + 육안 sample)
- [ ] spouse-01 정책 변경 X (commit `6ee9690` byte 동일)
- [ ] `_schema.md` 변경 X
- [ ] family-01.json 7 섹션 모두 충족
- [ ] surfaceMap 7 evidence + 5 dispute + witnesses (caseData path 정확)
- [ ] forbiddenLexemes 사건별 정확 (메모리 #9 family-01 영역 + anchorTruth)
- [ ] channelAuthority spouse-01과 동일 분류
- [ ] lieStateGate 윤태성/윤정후 archetype 반영 (confrontational / affect_flattening)
- [ ] uiSurfaceMap family-01 caseData/claimPolicies UI 후보 광역
- [ ] discoveryText.gate 정확
- [ ] issueProgression d-1 ~ d-5 sample-complete (각 5 stages, 9 항목)
- [ ] 사건 fact 보존 (memory + caseData anchorTruth 정합)
- [ ] truthStage ↔ lieState 직교 유지
- [ ] failureResponse 게임 디자인 ("자동 해결 X" / "반복 추궁 X" 등)
- [ ] meterTriggers 정책 §11.1 일치
- [ ] runtime import 흔적 0건
- [ ] baseline anchor 회귀 X (spouse-01 + family-01 모두)

### 5.3 사용자 confirm 영역

- family-01 schema 골격 spouse-01 재사용 적정성
- d-1 ~ d-5 Stage 표 게임 디자인 적정성
- v3 loop-data 충돌 영역 (있다면 처리 방향)
- friend-01 확장 진입 결정 (family-01 안정 후)

---

## 6. 완료 조건

세 가지 모두 충족 시:
1. 자동 검증 PASS (5.1 — 인코딩 검증 포함)
2. ClaudeCode CT 17개 체크리스트 PASS (5.2)
3. 사용자 confirm (5.3)

이번 단계 = family-01 schema + 5 dispute progression 완성. 다음 의뢰 = friend-01 schema 확장 (사용자 승인 시).

---

## 7. 참조 자료

### 정책 / 의뢰서
- `docs/disclosure-policy.md`
- `docs/codex-request-template.md`
- `tmp/REQUEST-Codex-Tier1-spouse-01-schema-draft.md` (1차 의뢰서)
- `tmp/REQUEST-Codex-Tier1-spouse-01-progression-d2-d3-d4-redraft.md` (재의뢰서, 인코딩 검증 학습)

### spouse-01 정책 (보존 / reference)
- `src/data/disclosurePolicy/_schema.md` (변경 X)
- `src/data/disclosurePolicy/spouse-01.json` (변경 X, schema 골격 reference)
- `src/data/disclosurePolicy/spouse-01-cross-check.md` (cross-check 형식 reference)
- 관련 commits: `19e4c4e` (1차 schema) / `6ee9690` (progression 완성)

### Baseline anchor
- `baseline/pre-policy-v1/` (a10b801)

### family-01 사건 데이터 (Read 전용)
- `src/data/cases/generated/family-01.json` — fact authority (top-level disputes/evidence)
- `src/data/claimPolicies/family-01-v2-atoms.json`
- `src/data/claimPolicies/family-01-structure-v2.json`
- `src/data/claimPolicies/family-01-game-events-v2.json`
- `src/data/claimPolicies/family-01-game-events.json`
- `src/data/claimPolicies/family-01-dossier-cards.json` (별도 파일)
- `src/data/scriptedText/family-01.json` (sample 검증, checksum 회귀 X)
- **참고**: `family-01-v3-game-loop-data.json` 없음 (spouse-01만 존재)

### 메모리
- `feedback_truth_leak_prohibition.md` (#9 — family-01 금지 lexeme)
- `feedback_revision_meaning_over_form.md` (#6)
- `feedback_static_analysis_limit.md` (#12)
- `story_v2_confirmed_3cases.md` (family-01 anchor — A 윤태성 confrontational / B 윤정후 affect_flattening / 출생 비밀 / 20년 부양 / 유서 자기 몫 축소)
- `project_active_cases.md` (활성 3건)

---

## 8. 진행 절차

1. ✅ ClaudeCode CT 의뢰서 작성 (이 단계)
2. 사용자 검토 → Codex 전달 승인
3. Codex family-01 작성 (UTF-8 보장 방식, spouse-01 schema 재사용)
4. Codex 자동 검증 (5.1 — 인코딩 검증 포함)
5. ClaudeCode CT 검수 (5.2 17 체크리스트)
6. 사용자 confirm (5.3)
7. commit (영구 기록)
8. 다음 = friend-01 schema 확장 또는 Tier 2 검증 wrapper

---

## 9. 메타

**Timeline 예상**: 2~3일 (spouse-01 schema 골격 재사용 + 사건 영역 차이만 — 인코딩 검증 학습됨)

**다음 의뢰 (Codex)**:
- friend-01 schema 확장 (Tier 1 +2~3일)
- Tier 2 검증 wrapper (`tmp/run-all-checks.cjs` / `policy-vs-data-cross-check.cjs`)

**현재 상태**:
- HEAD = 6ee9690 (origin/main pushed)
- spouse-01 정책 commit 안정 (19e4c4e schema + 6ee9690 progression)
- baseline anchor (a10b801) 회귀 X 유지
- working tree clean

**상태**: ClaudeCode CT 의뢰서 작성 완료. 사용자 검토 + Codex 전달 대기.
