# REQUEST: Tier 1 friend-01 Disclosure Policy schema (Codex 주도)

**작성**: ClaudeCode CT (2026-04-27)
**근거**: spouse-01 (`6ee9690`) + family-01 (`2dd17e2`) 안정화 후 friend-01 확장 (사용자 결정 5-A)
**분담**: Codex 주도 / ClaudeCode CT 검수 / 사용자 최종 승인
**참조 의뢰서**: `tmp/REQUEST-Codex-Tier1-family-01-schema.md`

---

## 0. 절대 회피 (가장 위)

### 0.1 한글 인코딩 손상 (spouse-01 사고 학습 + family-01 검증)

**필수 조건 (spouse-01/family-01 의뢰서와 동일)**:
1. ❌ **PowerShell here-string → node stdin 방식 금지**
2. ✅ **apply_patch 또는 UTF-8 보장 방식만 사용**
3. ❌ **JSON parse만으로 완료 판정 금지** (`?`도 valid JSON)
4. ✅ **한글 손상 검증 5종 강제** (§5.1.1 참조)

### 0.2 정책 위반

- ❌ **진실 누설 금지** — `docs/disclosure-policy.md` 참조
  - 재판관·시스템·dossier 및 NPC 비자백 채널에서 S5 전 진실 lexeme 노출 X
  - deep investigation evidence detail은 evidenceStage 정책 따름 (§2.3)
  - aftermath 채널 = 판결 후 자유 공개 (§2.4)
- ❌ **ScriptedText 자동 수정 X**
- ❌ **코드 변경 X** (Tier 4+ 전까지)
- ❌ **JSON 정책 runtime import X** (Tier 3 진입 전)
- ❌ **사건 fact 변경 X** — `src/data/cases/generated/friend-01.json` + `memory/story_v2_confirmed_3cases.md` friend-01 영역
- ❌ **baseline-pre-policy-v1 (a10b801) 회귀 X**
- ❌ **spouse-01 정책 (`6ee9690`) + family-01 정책 (`2dd17e2`) 영역 변경 X**
- ❌ **`_schema.md` 변경 X**

---

## 1. 목표

**friend-01 disclosure policy JSON schema 적용 + 모든 dispute issueProgression sample-complete (한 번에)**.

family-01 schema 골격 재사용 (`tier1-disclosure-policy-draft-v1`). 사건 fact 영역만 friend-01에 맞춰.

---

## 2. 근거

- 사용자 결정 5-A: friend-01 schema 확장 (family-01 안정성 확인됨)
- spouse-01/family-01 schema 골격 정착
- `_schema.md` 정의 사용
- baseline anchor: `baseline-pre-policy-v1` (a10b801)

---

## 3. 분담

| 영역 | 주도 | 검토 |
|---|---|---|
| friend-01.json 7 섹션 | Codex | ClaudeCode (한국어 자연체 + 인코딩 검증) |
| friend-01-cross-check.md | Codex | ClaudeCode (의미·정합성) |
| caseData / claimPolicies cross-check | Codex 자체 | ClaudeCode (sample) |
| 인코딩 검증 (5.1.1) | Codex 자체 | ClaudeCode 재검증 |

---

## 4. 산출물

### 4.1 필수 (blocker)

#### A. `src/data/disclosurePolicy/friend-01.json`

7개 섹션 모두 포함 (family-01 schema 골격 그대로):

**메타**:
- `caseId`: `"friend-01"`
- `sourceCaseId`: `"case-friend-01"`
- `schemaVersion`: `"tier1-disclosure-policy-draft-v1"` (spouse-01/family-01과 동일)
- `baselineTargetSha`: `"a10b8011c3311d2a6ab20dd4a06edb29a4ac48e3"`
- `runtimeImportAllowed`: `false`
- `draftStatus`: `"schema-draft-full-progression"`

**1. surfaceMap** — evidence 7건 + dispute 5건 + witnesses

caseData 사실:
- caseData path: `p.disputes[]` (top-level — family-01과 동일)
- caseData path: `p.evidence[]` (top-level)
- duo.socialGraph (witness 영역)

**Evidence 사실 (caseData 기반, Codex가 직접 read 후 정확히 작성)**:
- e-1: 연락 기록 (B → 예비신랑 9일간)
- e-2: 단톡방 캡처 (A의 매도 발언)
- e-3: 과거 카톡 (B와 A의 손절 시점 대화)
- e-4: 예비신랑 메시지 (예비신랑이 B에게 보낸 메시지)
- e-5: 송다은 씨 아버지 문자 (A 아버지가 예비신랑에게 접근)
- e-6: 과거 송금 기록 (과거 손절 사건 = A 아버지가 B에게 사기)
- e-7: 대조표 (반복 패턴 정리)

**Dispute 사실 (caseData 기반)**:
- d-1: 9일간의 연락 의도 (B → 예비신랑)
- d-2: 예비신랑의 선넘는 접근 (예비신랑이 B에게 먼저)
- d-3: 아버지의 돈 접근 패턴 (A 아버지의 갈취 시도)
- d-4: 과거 손절과 아버지의 사기 (과거 사건 = A 아버지 사기)
- d-5: 단톡방 매도와 명예훼손 (A의 매도 행동)

**2. forbiddenLexemes** — friend-01 사건별 진실 lexeme list

`globalTruthLexemes` (메모리 #9 + caseData anchor 기반):
- "예비신랑이 먼저", "예비신랑이 찝쩍", "예비신랑이 접근"
- "아버지의 사기", "아버지 돈 갈취", "A 아버지가 사기"
- "같은 패턴 반복", "또 당하게 놔둘 수 없다"
- "B 경고 의도", "꼬시려 한 게 아니라 경고"
- "과거 손절 = A 아버지 원인", "B 차마 못 말함"
- 기타 caseData에서 추출

`surfaceOnlyChannels`: 6채널 (judge_*4 / system_message / dossier)

`nonConfessionNpcBeforeS5`: lieState별 정책 — partyA / partyB 분리 (family-01 패턴 따라)

`allowedSurfaceSubstitutes`: surface 표현 매핑

**3. channelAuthority** — spouse-01/family-01과 동일 4 카테고리

**4. lieStateGate** — Truth Throttle + channelMatrix + npcPolicies
- `npcPolicies.partyA`: 송다은 (premature_summary) — 단정·결론 도출 archetype
- `npcPolicies.partyB`: 최수민 (affect_flattening) — 감정 평탄화 archetype

archetype 차이 반영:
- 송다은 (premature_summary): 빠른 결론 / 매도 / 단정 패턴
- 최수민 (affect_flattening): 감정 표현 적음 / 보호 동기 숨김 / 또 악역 됨

**5. uiSurfaceMap** — UI 노출 영역 광역 (P7 방지)

family-01과 동일 11 fieldPolicy. friend-01 caseData에서 발견한 UI 후보 사례 entries.

claimPolicies 파일 점검:
- `src/data/claimPolicies/friend-01-dossier-cards.json` (별도 파일, family-01 패턴)
- `src/data/claimPolicies/friend-01-game-events-v2.json`
- `src/data/claimPolicies/friend-01-structure-v2.json`
- **참고**: `friend-01-v3-game-loop-data.json` 없음 (spouse-01만 존재)

**6. discoveryText** — gate 정책

friend-01의 evidence 조합 / discovery 영역. spouse-01/family-01과 동일 형식.

**7. issueProgression** — 5 dispute 모두 sample-complete

각 dispute (d-1, d-2, d-3, d-4, d-5) Stage 0~4 본격 작성.

각 Stage 항목 (family-01 sample 형식):
- `stage` / `name` / `surfaceClaim` / `hiddenTruth`
- `entryConditions` / `allowedDisclosure` / `forbiddenDisclosure`
- `validActions` / `requiredEvidence` / `requiredWitness`
- `meterTriggers` (`emotion` / `trust` / `leak`)
- `failureResponse` (`npc` / `gameplay`)
- `successUnlocks`

**principles** (spouse-01/family-01과 동일):
- primaryAxis: "statementFracture + truthStage"
- truthStageIsNotLieState: true
- meterRole: emotion = 단기 반응·취약점 / trust = 협조 태도 / leak = 조건부 결과

**failureResponse 게임 디자인 원칙 (사용자 우려 처방)**:
- "반복 추궁이 아니라 분리/증거 깊이를 가리켜야"
- "한쪽 자백만으로 d-X/d-Y 자동 해결 X"
- friend-01 특수: "B의 보호 동기 ≠ A의 매도 면책" — 양 측 책임축 분리

#### B. `src/data/disclosurePolicy/friend-01-cross-check.md`

family-01-cross-check.md 형식 그대로:
- Case Data Shape (의뢰서 vs 실제 path 일치 확인)
- Evidence Surface Map (7건)
- Dispute Map (5건 — 가시성 / hidden 분류)
- Witness Surface Map
- UI Surface Candidates (combinationLab / dossierCards / v3Design)
- discoveryText Gate Candidates
- v2 Policy Sample Checks
- ScriptedText Sample Checks
- Open Questions for CT/User
- **Source Conflict Found** (있다면)
- Validation Run 표 (16+ 항목 모두 PASS 명시)

### 4.2 선택 (best-effort)

- 추가 cross-check 발견 (v2-atoms / structure-v2 / game-events-v2 sample)

---

## 5. 검증

### 5.1 자동 검증 (Codex 자체)

```bash
# 1. JSON parse
node -e "JSON.parse(require('fs').readFileSync('src/data/disclosurePolicy/friend-01.json','utf8'))"

# 2. baseline anchor 회귀 X
node tmp/detect-truth-leak.cjs                          # leak 0 (3 case)
sha256sum src/data/scriptedText/friend-01.json          # baseline 유지
sha256sum src/data/cases/generated/friend-01.json       # baseline 유지
sha256sum src/data/scriptedText/spouse-01.json          # 회귀 검증
sha256sum src/data/scriptedText/family-01.json          # 회귀 검증

# 3. 한글 인코딩 검증
grep -c '"?"' src/data/disclosurePolicy/friend-01.json
grep -c '"??"' src/data/disclosurePolicy/friend-01.json

node -e "
const p = JSON.parse(require('fs').readFileSync('src/data/disclosurePolicy/friend-01.json','utf8'));
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

# 4. spouse-01/family-01/_schema.md 회귀 X
git diff 2dd17e2 -- src/data/disclosurePolicy/_schema.md \
                     src/data/disclosurePolicy/spouse-01.json \
                     src/data/disclosurePolicy/spouse-01-cross-check.md \
                     src/data/disclosurePolicy/family-01.json \
                     src/data/disclosurePolicy/family-01-cross-check.md
# expected: empty

# 5. 8 layer precheck allPass
node tmp/codex-recovery-v6/precheck-liestate-flow.cjs
node tmp/codex-recovery-v6/precheck-evidence-unlock.cjs
node tmp/codex-recovery-v6/precheck-archetype-quant.cjs
node tmp/codex-recovery-v6/precheck-meter-timing.cjs
node tmp/codex-recovery-v3/precheck-stage-aware.cjs
node tmp/codex-recovery-v4/precheck-qa-coherence.cjs
node tmp/codex-recovery-v5/precheck-broad-detection.cjs
```

### 5.1.1 작업 완료 보고 필수 포함 (사용자 명시 — spouse-01/family-01과 동일)

작업 완료 보고에 다음 7개 검증 결과를 **모두** 포함한다.

1. **spouse-01 + family-01 + _schema.md byte 동일 / diff 없음**
   - `git diff 2dd17e2 -- ...` 결과 = empty

2. **friend-01 d-1 ~ d-5 한글 필드 sample 출력**
   - 각 dispute의 `title` 1건
   - 각 dispute의 stage 0/2/4 중 1~2 stage의 `name` / `surfaceClaim` raw 출력

3. **literal `?` / `??` 검증**
   - `grep -c '"?"' src/data/disclosurePolicy/friend-01.json` (= 0 기대)
   - `grep -c '"??"' src/data/disclosurePolicy/friend-01.json` (= 0 기대)

4. **hex dump sample**
   - friend-01.json의 d-1 stage 0 `surfaceClaim` 라인 `od -c` 출력 (UTF-8 multi-byte 확인)

5. **JSON parse PASS**

6. **runtime import 0건**
   - `grep -r 'disclosurePolicy' src/engine src/components src/hooks src/app src/store` = 0건

7. **truth leak 0건**
   - `node tmp/detect-truth-leak.cjs` 결과 spouse/family/friend 모두 0건

### 5.2 ClaudeCode CT 검수 영역

- [ ] 한글 인코딩 무결성 (5.1.1 결과 + 육안 sample)
- [ ] spouse-01 정책 변경 X (commit `6ee9690` byte 동일)
- [ ] family-01 정책 변경 X (commit `2dd17e2` byte 동일)
- [ ] `_schema.md` 변경 X
- [ ] friend-01.json 7 섹션 모두 충족
- [ ] surfaceMap 7 evidence + 5 dispute + witnesses (caseData path 정확)
- [ ] forbiddenLexemes 사건별 정확 (메모리 #9 friend-01 영역 + anchorTruth)
  - "예비신랑이 먼저" / "아버지의 사기" / "같은 패턴 반복" 핵심 lexeme 포함
- [ ] channelAuthority 분류 일치
- [ ] lieStateGate 송다은/최수민 archetype 반영 (premature_summary / affect_flattening)
- [ ] uiSurfaceMap caseData/claimPolicies UI 후보 광역
- [ ] discoveryText.gate 정확
- [ ] issueProgression d-1 ~ d-5 sample-complete (각 5 stages, 9 항목)
- [ ] 사건 fact 보존 (memory + caseData anchorTruth 정합)
  - **friend-01 anchor 핵심**: B는 예비신랑을 꼬시려 한 게 아니라 경고하려 했고, 과거 손절도 A 아버지 원인 / B는 차마 못 말함 / 같은 패턴 반복
- [ ] truthStage ↔ lieState 직교 유지
- [ ] failureResponse 게임 디자인 ("자동 해결 X" / "반복 추궁 X" 등)
- [ ] meterTriggers 정책 §11.1 일치
- [ ] runtime import 흔적 0건
- [ ] baseline anchor 회귀 X (3 case 모두)

### 5.3 사용자 confirm 영역

- friend-01 schema 합의
- d-1 ~ d-5 Stage 표 게임 디자인 적정성
- friend-01 특수 영역 (B의 보호 동기 vs A의 매도 책임 분리) 검토
- 다음 단계 결정 (Tier 2 검증 wrapper 또는 spot check)

---

## 6. 완료 조건

세 가지 모두 충족 시:
1. 자동 검증 PASS (5.1 — 인코딩 검증 포함)
2. ClaudeCode CT 18개 체크리스트 PASS (5.2)
3. 사용자 confirm (5.3)

이번 단계 = friend-01 schema + 5 dispute progression 완성. 다음 의뢰 = Tier 2 검증 wrapper 또는 사용자 spot check.

---

## 7. 참조 자료

### 정책 / 의뢰서
- `docs/disclosure-policy.md`
- `docs/codex-request-template.md`
- `tmp/REQUEST-Codex-Tier1-spouse-01-schema-draft.md` (1차 schema 의뢰서)
- `tmp/REQUEST-Codex-Tier1-spouse-01-progression-d2-d3-d4-redraft.md` (spouse-01 재의뢰, 인코딩 검증)
- `tmp/REQUEST-Codex-Tier1-family-01-schema.md` (family-01 의뢰서)

### 안정 commits (보존)
- `19e4c4e` (spouse-01 schema)
- `6ee9690` (spouse-01 progression)
- `2dd17e2` (family-01 schema + progression)

### Baseline anchor
- `baseline/pre-policy-v1/` (a10b801)

### friend-01 사건 데이터 (Read 전용)
- `src/data/cases/generated/friend-01.json` — fact authority (top-level disputes/evidence)
- `src/data/claimPolicies/friend-01-v2-atoms.json`
- `src/data/claimPolicies/friend-01-structure-v2.json`
- `src/data/claimPolicies/friend-01-game-events-v2.json`
- `src/data/claimPolicies/friend-01-game-events.json`
- `src/data/claimPolicies/friend-01-dossier-cards.json` (별도 파일)
- `src/data/scriptedText/friend-01.json` (sample 검증, checksum 회귀 X)
- **참고**: `friend-01-v3-game-loop-data.json` 없음

### 메모리
- `feedback_truth_leak_prohibition.md` (#9 — friend-01 금지 lexeme: "예비신랑이 먼저", "아버지의 사기", "아버지 돈 갈취", "같은 패턴 반복")
- `feedback_revision_meaning_over_form.md` (#6)
- `feedback_static_analysis_limit.md` (#12)
- `story_v2_confirmed_3cases.md` (friend-01 anchor — A 송다은 premature_summary / B 최수민 affect_flattening / 예비신랑 경고 의도 / 과거 손절 = A 아버지 원인 / B 또 악역)
- `project_active_cases.md` (활성 3건)

---

## 8. 진행 절차

1. ✅ ClaudeCode CT 의뢰서 작성 (이 단계)
2. 사용자 검토 → Codex 전달 승인
3. Codex friend-01 작성 (UTF-8 보장 방식, family-01 schema 재사용)
4. Codex 자동 검증 (5.1 — 인코딩 검증 포함)
5. ClaudeCode CT 검수 (5.2 18 체크리스트)
6. 사용자 confirm (5.3)
7. commit (영구 기록)
8. 다음 = Tier 2 검증 wrapper 또는 사용자 spot check

---

## 9. 메타

**Timeline 예상**: 2~3일 (family-01과 동일 — schema 골격 재사용 + 인코딩 검증 학습)

**Tier 1 합산 진행**:
- spouse-01: 완료 (`19e4c4e` + `6ee9690`)
- family-01: 완료 (`2dd17e2`)
- friend-01: 진행 중 (이 의뢰서)
- 합산 timeline: 9~13일 → 현재 진행 중

**다음 의뢰 (Codex)**:
- Tier 2 검증 wrapper (`tmp/run-all-checks.cjs` / `policy-vs-data-cross-check.cjs`)
- 사용자 spot check 분석

**현재 상태**:
- HEAD = 2dd17e2 (origin/main pushed)
- spouse-01 + family-01 정책 commits 안정
- baseline anchor (a10b801) 회귀 X 유지
- working tree clean

**상태**: ClaudeCode CT 의뢰서 작성 완료. 사용자 검토 + Codex 전달 대기.
