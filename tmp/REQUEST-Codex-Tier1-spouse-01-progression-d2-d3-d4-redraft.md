# REQUEST: Tier 1 spouse-01 issueProgression d-2 / h-d3 / h-d4 재작성 (Codex 주도)

**작성**: ClaudeCode CT (2026-04-27)
**근거**: 1차 추가 작업 한글 인코딩 손상 → C 원복 완료 → 사용자 재의뢰 명시
**분담**: Codex 주도 / ClaudeCode CT 검수 / 사용자 최종 승인
**대체 의뢰서**: `tmp/REQUEST-Codex-Tier1-spouse-01-schema-draft.md` (1차, schema 초안 영역) — 이번은 progression 확장 한정

---

## 0. 절대 회피 (가장 위)

### 0.1 한글 인코딩 손상 — 이번 의뢰의 핵심 blocker

**원인 (이전 작업)**: PowerShell here-string → node stdin 방식으로 큰 한글 JSON 갱신 시 인코딩 깨짐 → 한글 byte (`353 260 230` 등 UTF-8 multi-byte)가 ASCII `?` (0x3F)로 변환.

**필수 조건**:
1. ❌ **PowerShell here-string → node stdin 방식 금지**
2. ✅ **apply_patch 또는 UTF-8 보장 방식**으로만 한글 포함 JSON 갱신
3. ❌ **JSON parse만으로 완료 판정 금지** — `?`도 valid JSON 문자라 통과
4. ✅ **한글 손상 검증 필수 (5종)**:
   - literal `??` 또는 과도한 `?` 증가 탐지
   - d-1 영역 한글 보존 비교 (작업 전후 동일)
   - d-2 / h-d3 / h-d4 의 `title` / `name` / `surfaceClaim` 필드에 `[가-힣]` 존재 확인
   - 주요 필드 sample 출력 후 육안 확인
   - 작업 후 hex dump 1~2 sample 확인 (UTF-8 multi-byte 정상)

### 0.2 정책 위반

- ❌ **진실 누설 금지** — `docs/disclosure-policy.md` 참조
  - 재판관·시스템·dossier 및 NPC 비자백 채널에서 S5 전 진실 lexeme 노출 X
  - deep investigation evidence detail은 evidenceStage 정책 따름 (§2.3)
  - aftermath 채널 = 판결 후 자유 공개 (§2.4)
- ❌ **ScriptedText 자동 수정 X** (잘못 패턴 #6)
- ❌ **코드 변경 X** (Tier 4+ 전까지)
- ❌ **JSON 정책 runtime import X** (Tier 3 진입 전)
- ❌ **사건 fact 변경 X** — caseData/docs를 fact authority로
- ❌ **baseline-pre-policy-v1 (a10b801) 회귀 X**
- ❌ **1차 commit `19e4c4e` 영역 변경 X** — d-1 sample / surfaceMap / forbiddenLexemes / channelAuthority / lieStateGate / uiSurfaceMap / discoveryText 모두 보존

---

## 1. 목표

**spouse-01 issueProgression의 d-2 / h-d3 / h-d4 Stage 0~4 본격 작성**.

이전 작업의 의미·맥락·구조는 우수했음 (영문 영역 본문 정확). **한글 인코딩만 fix하여 재작성**. d-1 영역은 절대 변경 X.

---

## 2. 근거

- 사용자 결정 4-A (즉시 schema 초안) → 1차 d-2/h-d3/h-d4 시도 → 한글 손상 → C 원복 → 재의뢰
- 1차 작업 평가: 의미·구조·금액축 정합성·v3 loop-data 충돌 식별 모두 우수 → **재작성 시 동일 의미 흐름 보존 권장**
- baseline anchor: `baseline-pre-policy-v1` (a10b801)
- 1차 schema commit: `19e4c4e` (d-1 sample-complete)

---

## 3. 분담

| 영역 | 주도 | 검토 |
|---|---|---|
| d-2 / h-d3 / h-d4 Stage 0~4 본문 | Codex | ClaudeCode (한국어 자연체 + 인코딩 검증) |
| cross-check.md 보강 (v3 loop-data 충돌 기록) | Codex | ClaudeCode (의미·정합성) |
| 한글 인코딩 검증 (위 0.1) | Codex 자체 | ClaudeCode 재검증 |

---

## 4. 산출물

### 4.1 필수 (blocker)

#### A. `src/data/disclosurePolicy/spouse-01.json` — d-2 / h-d3 / h-d4 본격

**보존 조건 (1차 commit 19e4c4e 영역)**:
- 메타 (caseId / schemaVersion / baselineTargetSha / runtimeImportAllowed / draftStatus 등)
- surfaceMap / forbiddenLexemes / channelAuthority / lieStateGate / uiSurfaceMap / discoveryText (전부)
- issueProgression.principles
- issueProgression.disputes.d-1 (sample-complete 5 stages)
- crossCheck

**확장 영역**:
- issueProgression.disputes.d-2: skeleton-only → sample-complete (Stage 0~4)
- issueProgression.disputes.h-d3: skeleton-only → sample-complete (Stage 0~4)
- issueProgression.disputes.h-d4: skeleton-only → sample-complete (Stage 0~4)

각 Stage 항목 (1차 시도와 동일 형식):
- `stage` / `name` / `surfaceClaim` / `hiddenTruth`
- `entryConditions` (배열)
- `allowedDisclosure` / `forbiddenDisclosure` (배열)
- `validActions` (`fact_pursuit` / `motive_search` / `empathy_approach` / `evidence_present` / `contradiction_pursuit` / `confession_attempt` / `witness_summon` / `mediation` 중)
- `requiredEvidence` / `requiredWitness` (배열)
- `meterTriggers` (`emotion` / `trust` / `leak` 키)
- `failureResponse` (`npc` / `gameplay` 키)
- `successUnlocks` (배열)

**draftCompleteness**: 작업 후 `"sample-complete"`로 갱신 (3개 모두).

**금액축 정합성 (절대 보존, 1차 시도에서도 정확함)**:
- d-2: B = 개인 **비자금 2,000만원** 현금 → 형
- h-d3: A = **공동 적금 3,000만원** 위임장 조작 / 투자 사기 손실
- h-d4: 은폐와 선제행동의 순서 (B 숨김 먼저 / A 감시·범죄 행위)

#### B. `src/data/disclosurePolicy/spouse-01-cross-check.md` — v3 loop-data 충돌 기록 보강

1차 시도에서 발견된 4건 그대로 보존 (의미 정확):
- `dossierCards.dc-3.description` 충돌 (B 비자금 vs 공동 적금 혼선)
- `dossierCards.dc-4.description` 충돌 (A 위임장 조작 영역)
- `officialRecordRecommendations` 충돌
- `hiddenDisputePlans.h-d3.name` 충돌

명시: 원본 데이터는 수정 X, P4/P7-safe 별도 task로 처리.

### 4.2 선택 (best-effort)

- 추가 cross-check 발견 (v2-atoms / structure-v2 / game-events-v2 sample 검증)
- 1차 시도에서 누락된 영역 보강

---

## 5. 검증

### 5.1 자동 검증 (Codex 자체) — **인코딩 검증 추가**

```bash
# 1. JSON parse
node -e "JSON.parse(require('fs').readFileSync('src/data/disclosurePolicy/spouse-01.json','utf8'))"

# 2. baseline anchor 회귀 X
node tmp/detect-truth-leak.cjs                          # leak 0
sha256sum src/data/scriptedText/spouse-01.json          # 8298ead7... 유지
sha256sum src/data/cases/generated/spouse-01.json       # d3c1377f... 유지

# 3. 한글 인코딩 검증 (NEW)
# 3.1 literal "?" 과도 증가 탐지
grep -c '"?"' src/data/disclosurePolicy/spouse-01.json
grep -c '"??"' src/data/disclosurePolicy/spouse-01.json

# 3.2 d-2 / h-d3 / h-d4 의 title / name / surfaceClaim 한글 존재
node -e "
const p = JSON.parse(require('fs').readFileSync('src/data/disclosurePolicy/spouse-01.json','utf8'));
const koreanRegex = /[가-힯]/;
for (const id of ['d-2','h-d3','h-d4']) {
  const d = p.issueProgression.disputes[id];
  console.log(id, 'title korean:', koreanRegex.test(d.title));
  for (const s of d.truthStages) {
    console.log(id, 'stage', s.stage, 'name korean:', koreanRegex.test(s.name));
    console.log(id, 'stage', s.stage, 'surfaceClaim korean:', koreanRegex.test(s.surfaceClaim));
  }
}
"

# 3.3 d-1 영역 한글 보존 비교 (작업 전후 동일)
diff <(git show 19e4c4e:src/data/disclosurePolicy/spouse-01.json | python3 -c "import json,sys; d=json.load(sys.stdin); print(json.dumps(d['issueProgression']['disputes']['d-1'], ensure_ascii=False, indent=2))") \
     <(python3 -c "import json; d=json.load(open('src/data/disclosurePolicy/spouse-01.json',encoding='utf-8')); print(json.dumps(d['issueProgression']['disputes']['d-1'], ensure_ascii=False, indent=2))")
# expected: empty diff

# 3.4 hex dump sample (UTF-8 multi-byte 확인)
sed -n '1060p' src/data/disclosurePolicy/spouse-01.json | od -c | head -5
# 한글 byte는 \xea-\xed 시작 — literal '?' 아님

# 4. 8 layer precheck allPass (baseline 안)
node tmp/codex-recovery-v6/precheck-liestate-flow.cjs
node tmp/codex-recovery-v6/precheck-evidence-unlock.cjs
node tmp/codex-recovery-v6/precheck-archetype-quant.cjs
node tmp/codex-recovery-v6/precheck-meter-timing.cjs
node tmp/codex-recovery-v3/precheck-stage-aware.cjs
node tmp/codex-recovery-v4/precheck-qa-coherence.cjs
node tmp/codex-recovery-v5/precheck-broad-detection.cjs
```

**완료 조건**:
- JSON parse PASS
- baseline anchor 회귀 X
- literal `"?"` / `"??"` count = 0 또는 작업 전과 동일
- d-2 / h-d3 / h-d4 의 title/name/surfaceClaim 한글 존재 = 모두 true
- d-1 한글 영역 작업 전후 diff = empty
- hex dump sample이 UTF-8 multi-byte
- 8 layer precheck allPass

### 5.1.1 작업 완료 보고 필수 포함 (사용자 명시 — 속도보다 인코딩 무결성 우선)

작업 완료 보고에 다음 7개 검증 결과를 **모두** 포함한다. 한 항목이라도 누락 시 CT 검수 진입 X.

1. **d-1 영역 byte 동일 또는 diff 없음**
   - `git diff 19e4c4e -- src/data/disclosurePolicy/spouse-01.json` 실행 결과의 d-1 영역 변경 0건
   - 또는 §5.1 단계 3.3의 diff 명령 결과가 empty

2. **d-2 / h-d3 / h-d4 주요 한글 필드 sample 출력**
   - 각 dispute의 `title` 1건
   - 각 dispute의 stage 0~4 중 1~2 stage의 `name` / `surfaceClaim` raw 출력
   - 한글이 visual 확인 가능한 형태로 (literal `?` 아님)

3. **literal `?` / `??` 검증 결과**
   - `grep -c '"?"' src/data/disclosurePolicy/spouse-01.json`
   - `grep -c '"??"' src/data/disclosurePolicy/spouse-01.json`
   - 작업 전후 카운트 비교 (증가량 0 또는 의도된 영역만)

4. **hex dump sample 결과**
   - d-2 stage 0 `surfaceClaim` 라인의 `od -c` 출력
   - UTF-8 multi-byte 시퀀스 확인 (`353 260 230` 등 / literal `?` 0x3F 아님)

5. **JSON parse PASS**
   - `node -e "JSON.parse(require('fs').readFileSync('src/data/disclosurePolicy/spouse-01.json','utf8'))"`

6. **runtime import 0건**
   - `grep -r 'disclosurePolicy' src/engine src/components src/hooks src/app src/store` 결과 0건

7. **truth leak 0건**
   - `node tmp/detect-truth-leak.cjs` 결과 spouse-01 / family-01 / friend-01 모두 0건

### 5.2 ClaudeCode CT 검수 영역

- [ ] 한글 인코딩 무결성 (5.1 3종 자동 검증 결과 + 육안 sample 1~2건)
- [ ] d-1 영역 1차 commit 19e4c4e와 byte 단위 동일 (line ending 제외)
- [ ] d-2 / h-d3 / h-d4 Stage 0~4 본격 작성 (각 5 stages, 9 항목)
- [ ] 금액축 정합성 (B = 비자금 2,000 / A = 공동 적금 3,000 위임장 조작)
- [ ] truthStage ↔ lieState 직교 유지 (1차 시도와 동일)
- [ ] failureResponse 게임 디자인 우수 (`do not auto-resolve` / `repeat-button` 회피)
- [ ] meterTriggers (emotion / trust / leak) 정책 §11.1 재정의 일치
- [ ] cross-check.md v3 loop-data 충돌 4건 보존
- [ ] surfaceMap / forbiddenLexemes 등 1차 영역 변경 X
- [ ] runtime import 흔적 0건
- [ ] baseline anchor (a10b801) ScriptedText/caseData checksum 회귀 X

### 5.3 사용자 confirm 영역

- d-2 / h-d3 / h-d4 Stage 표 게임 디자인 적정성
- v3 loop-data 충돌 영역 처리 방향 (P4/P7-safe task 별도 일정)

---

## 6. 완료 조건

세 가지 모두 충족 시:
1. 자동 검증 PASS (5.1 — **인코딩 검증 포함**)
2. ClaudeCode CT 11개 체크리스트 PASS (5.2)
3. 사용자 confirm (5.3)

이번 단계 = d-2 / h-d3 / h-d4 progression 완성. 다음 의뢰 = family-01 / friend-01 schema 확장 또는 Tier 2 검증 wrapper.

---

## 7. 참조 자료

### 정책 / 의뢰서
- `docs/disclosure-policy.md` (정책 본문)
- `docs/codex-request-template.md` (의뢰서 표준)
- `tmp/REQUEST-Codex-Tier1-spouse-01-schema-draft.md` (1차 의뢰서, schema 골격 영역)

### 1차 commit (보존)
- `19e4c4e docs(policy): Tier 1 spouse-01 schema draft + cross-check`
  - `src/data/disclosurePolicy/_schema.md`
  - `src/data/disclosurePolicy/spouse-01.json` (d-1 sample-complete)
  - `src/data/disclosurePolicy/spouse-01-cross-check.md`

### Baseline anchor
- `baseline/pre-policy-v1/` (a10b801)

### 사건 데이터 (Read 전용)
- `src/data/cases/generated/spouse-01.json` — fact authority
- `src/data/claimPolicies/spouse-01-v3-game-loop-data.json` — v3 loop-data (충돌 영역)
- `src/data/claimPolicies/spouse-01-v2-atoms.json`
- `src/data/claimPolicies/spouse-01-structure-v2.json`
- `src/data/claimPolicies/spouse-01-game-events-v2.json`
- `src/data/scriptedText/spouse-01.json` — checksum 8298ead7... 회귀 X

### 메모리
- `feedback_truth_leak_prohibition.md` (#9)
- `feedback_revision_meaning_over_form.md` (#6)
- `feedback_static_analysis_limit.md` (#12 — 정적 분석 한계, JSON parse만으로 완료 판정 X)
- `story_v2_confirmed_3cases.md` (사건 fact 절대 보존)

---

## 8. 진행 절차

1. ✅ ClaudeCode CT 의뢰서 작성 (이 단계)
2. 사용자 검토 → Codex 전달 승인
3. Codex d-2 / h-d3 / h-d4 본격 작성 (UTF-8 보장 방식)
4. Codex 자동 검증 (5.1 — 인코딩 검증 포함)
5. ClaudeCode CT 재검수 (5.2 11 체크리스트)
6. 사용자 confirm (5.3)
7. commit (영구 기록)

---

## 9. 메타

**Timeline 예상**: 1~2일 (의미 흐름은 1차 시도에서 정확 — 인코딩만 fix)

**다음 의뢰 (Codex)**:
- family-01 / friend-01 schema 확장 (Tier 1 후반 +2~3일 / +2~3일)
- Tier 2 검증 wrapper (`tmp/run-all-checks.cjs` / `policy-vs-data-cross-check.cjs`)

**원복 검증 결과 (현재 상태)**:
- working tree clean
- HEAD = 19e4c4e (origin/main pushed)
- spouse-01.json 1096 라인 / d-1 sample-complete / d-2·h-d3·h-d4 skeleton-only
- 한글 lexeme 정상 보존 (외도/위임/박지연/이준호 등 60+건 매치)
- baseline anchor (a10b801) ScriptedText/caseData checksum 회귀 X

**상태**: ClaudeCode CT 의뢰서 작성 완료. 사용자 검토 + Codex 전달 대기.
