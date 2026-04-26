# REQUEST: Tier 1 spouse-01 JSON schema 초안 (Codex 주도)

**작성**: ClaudeCode CT (2026-04-27)
**근거**: Tier 1 합의안 + 사용자 결정 4-A (즉시 schema 초안 의뢰)
**분담**: Codex 주도 / ClaudeCode CT 검수 / 사용자 최종 승인

---

## 0. 절대 회피 (가장 위)

- ❌ **진실 누설 금지** — `docs/disclosure-policy.md` 참조
  - 재판관·시스템·dossier 및 **NPC 비자백 채널**에서 S5 전 진실 lexeme 노출 X
  - 단, 플레이어가 직접 deep investigation으로 획득한 evidence detail은 `evidenceStage` 정책 따름 (`§2.3 Player-discovered`)
  - `aftermath` 채널 = 판결 후 자유 공개 (`§2.4`)
- ❌ **ScriptedText 자동 수정 X** (잘못 패턴 #6, 정책 §7.1)
- ❌ **코드 변경 X** (Tier 4+ 진입 조건 충족 전까지, 정책 §11.4)
- ❌ **JSON 정책 runtime import X** (Tier 3 진입 전, 정책 §7.2)
- ❌ **사건 fact 변경 X** (memory/story_v2_confirmed_3cases.md)
- ❌ **baseline-pre-policy-v1 (a10b801) 회귀 X** (활성 3건 ScriptedText/caseData checksum 변화 X)
- ❌ **사용자 1 사례만 처리 X** — schema 골격은 family/friend 확장 가능 (잘못 패턴 #11)
- ❌ **정적 PASS = 완료 단정 X** — ClaudeCode 검수 + 사용자 confirm 필수 (잘못 패턴 #12)
- ❌ **JSON 정책 자동 파생 엔진 X** — 사람이 작성, caseData/v2-atoms cross-check만

---

## 1. 목표

**spouse-01 JSON schema 초안 작성**. 완성본 X. schema 골격 + 핵심 항목 정의 + 1~2 sample 수준.

이번 단계 종료 조건 = schema 합의(전체 구조) + spouse-01 sample 검수 PASS. 완성본은 다음 의뢰로 분리.

---

## 2. 근거

- 사용자 결정 4-A (즉시 schema 초안)
- 정책 본문: `docs/disclosure-policy.md` §11.3 (spouse-01 JSON schema TODO)
- baseline anchor: `baseline-pre-policy-v1` (a10b801)
- 분담 명시: 정책 §11 + §7.2 (runtime import 금지)
- 의뢰서 표준: `docs/codex-request-template.md`

---

## 3. 분담

| 영역 | 주도 | 검토 |
|---|---|---|
| schema 골격 정의 | Codex | ClaudeCode (의미·표현) |
| spouse-01 항목 초안 | Codex | ClaudeCode (한국어 자연체) |
| caseData / v2-atoms cross-check | Codex 자체 | ClaudeCode (정합성 sample) |
| 검증 스크립트 | (Tier 2 진입 후 별도 의뢰) | — |

---

## 4. 산출물

### 4.1 필수 (blocker)

#### A. schema 골격 정의

위치: `src/data/disclosurePolicy/_schema.md` (또는 `_schema.json`)

내용:
- schema 공통 형식 (모든 사건 적용 가능)
- 7개 필수 섹션 (4.1.B 참조)
- 메타 필드: `caseId`, `baselineTargetSha`, `schemaVersion`, `generatedAt`
- 향후 family/friend 확장 가능 골격
- runtime import 금지 명시

#### B. spouse-01 schema 초안 적용

위치: `src/data/disclosurePolicy/spouse-01.json`

다음 7개 섹션 모두 포함:

**1. `surfaceMap`** — evidence/dispute/witness별 surface ↔ truth 매핑
- evidence: `evidenceId`, `surfaceName`, `name`, `surfaceDescription`, `descriptionTruth`
- dispute: dispute ID별 (d-1, d-2, h-d3, h-d4) surface ↔ 진실 영역
- witness: witness ID별 (w-1, w-2, w-3) surface 영역
- 메모리 #9 매핑 7건 (e-1 ~ e-7) 정확 반영

**2. `forbiddenLexemes`** — 채널별 금지 lexeme list
- 채널: `judge_question` / `judge_contradiction` / `judge_evidence_combo` / `judge_witness_summon` / `system_message` / `dossier` (안내)
- 각 채널 사건별 진실 lexeme list (정책 §4.1)
- spouse-01 우선 list:
  - "형", "친형", "조카", "조카딸", "중2"
  - "돌봄", "가족을 돌본", "가족 사정", "가족 지원"
  - "위임장 조작", "투자 사기", "형 빚"
  - "형의 오피스텔", "형 명의", "형에게 전달"
  - "학용품", "조카 학교 알림"

**3. `channelAuthority`** — 채널별 발화 권한
- `surface-only` 채널 list (정책 §2.1)
- `lieState 기반 점진 공개` 채널 list (§2.2)
- `player-discovered` 채널 list (§2.3, stage-gated)
- `자유 공개` 채널 list (§2.4, 판결 후만)

**4. `lieStateGate`** — lieState × 채널 × 정보 종류 매트릭스
- S0~S5 별 허용 영역 (Truth Throttle, 정책 §3.1)
- 채널 × lieState 교차표 (§3.3)
- 사건별 NPC interrogation lieState 정책 (§5.1 박지연 / §5.2 이준호)

**5. `uiSurfaceMap`** — UI 노출 영역 광역 (P7 방지, 정책 §4.1)
필드별 surface 표현 정의:
- `dossierLabel`
- `dossierSummary`
- `dossierNoteText`
- `evidenceCardLabel`
- `evidenceCardName`
- `evidenceCardStageSummary` (stage 0/1/2 각각)
- `judgeHint`
- `recommendedMoment`
- `purpose`
- `successConditionSummary`
- `successEffects`

**중요 사전 점검**: case data에 어떤 필드가 실제로 UI 출력 경로 있는지 grep 사전 점검 후 작업. 출력 안 되는 internal 필드는 P7 무관 (단 schema 메타로 보존).

이미 확인된 누설 후보 (case data):
- `evidenceCard.investigationStages[].summary` (e-1 Established: "조카 돌봄을 위한 구매로 확인됨", e-2 Established: "형네 오피스텔 방문 동선으로 확인")
- `dossierCard.successEffects` (d-1 dossier: "B가 시댁 불화와 조카 사정을 직접 언급")
- `evidence.name` (e-4 = "형 문자 스레드")
- `evidence.description` (전 evidence)

**6. `discoveryText.gate`** — discoveryText route/stage 분류 (정책 §2.3)
- ❌ 자동/시스템 안내로 노출 X
- ✅ 플레이어가 직접 evidence 조합 + deep investigation 도달 시 OK
- gate 조건: route + stage + meterState
- 각 evidence별 discoveryText 분류 sample

**7. `issueProgression`** 또는 `truthStages` — 쟁점별 Stage 0~4 정의 (정책 §11)

이번 의뢰의 핵심 게임 디자인 영역. 처음에는 **d-1 한 dispute의 sample**만 본격 작성하고, 나머지(d-2, h-d3, h-d4)는 골격만.

각 Stage 항목:
- 표면 주장 / 숨겨진 진실
- 진입 조건 (어떤 행동·증거·증인으로 다음 Stage 진입)
- 허용/금지 누설 lexeme
- 유효한 심문 타입 (`fact_pursuit` / `motive_search` / `empathy_approach` 중 어느 것)
- 필요한 증거 / 증인
- 실패 반응 (조건 미충족 시 NPC 행동)
- 성공 시 개방 요소 (다음 쟁점·증거·dossier)

추가:
- 감정·신뢰·누설 미터 trigger 조건 (정책 §11.1 재정의 따라)
- statement fracture 정의 (정책 §11.2)
- truthStage ↔ lieState 직교 관계 명시

#### C. cross-check 사전 점검 결과

위치: `src/data/disclosurePolicy/spouse-01-cross-check.md` (또는 의뢰서에 결과 첨부)

- caseData (`src/data/cases/generated/spouse-01.json`)와 surfaceMap 7개 evidence 일치 확인
- 메모리 #9 매핑 정합 (e-1 ~ e-7)
- v2-atoms (`src/data/claimPolicies/spouse-01-*.json`) lieState 진술 영역 정합 sample (1~2건)
- 충돌 발견 시 즉시 보고 (정책 우선 / caseData 수정 X)

### 4.2 선택 (best-effort)

- 다른 dispute (d-2 또는 h-d3) Stage 표 추가 본격 작성
- family/friend 확장 가능성 검토 메모 (구조만)

---

## 5. 검증

### 5.1 자동 검증 (Codex 자체)

```bash
# baseline anchor 회귀 X
node tmp/detect-truth-leak.cjs                 # leak 0 유지
node tmp/codex-recovery-v6/precheck-*.cjs      # 8 layer allPass 유지

# schema self-validation
node -e "JSON.parse(require('fs').readFileSync('src/data/disclosurePolicy/spouse-01.json','utf8'))"

# baseline checksum 회귀 X (활성 3건)
sha256sum src/data/scriptedText/spouse-01.json   # 8298ead7... 유지
sha256sum src/data/cases/generated/spouse-01.json  # d3c1377f... 유지
```

기준: leak 0건 / 8 layer allPass / JSON valid / baseline checksum 변화 X

### 5.2 ClaudeCode CT 검수 영역

- [ ] schema 골격 합리성 (일반화 가능 / family/friend 확장 가능)
- [ ] surfaceMap 메모리 #9 매핑 일치
- [ ] forbiddenLexemes 사건별 list 정확 (정책 §4.1 일치)
- [ ] channelAuthority 정책 §2 분류 일치 (surface-only / lieState / player-discovered / 자유 공개)
- [ ] lieStateGate 정책 §3 매트릭스 일치
- [ ] uiSurfaceMap 11개 필드 모두 다룸 + surface 표현 자연체
- [ ] discoveryText.gate 분류 정확 (route/stage 조건)
- [ ] issueProgression d-1 sample 의미·표현 (잘못 패턴 #6 회피)
- [ ] 한국어 자연체 (호칭/존칭/어법 — Claude 분담 영역)
- [ ] 사건 fact 보존 (memory/story_v2_confirmed_3cases.md)
- [ ] baseline anchor 회귀 X
- [ ] runtime import 흔적 0건 (`grep -r 'disclosurePolicy' src/engine/ src/components/ src/hooks/`)

### 5.3 사용자 confirm 영역

- schema 합의 (전체 구조 — 7개 섹션 적정성)
- spouse-01 surfaceMap / forbiddenLexemes 사건 fact 정합
- d-1 issueProgression sample 게임 디자인 적정성
- family/friend 확장 시점 결정

---

## 6. 완료 조건

세 가지 모두 충족 시:
1. 자동 검증 PASS (5.1)
2. ClaudeCode CT 12개 체크리스트 PASS (5.2)
3. 사용자 schema 합의 + sample confirm (5.3)

이번 단계 = schema 초안 + d-1 sample. 완성본 (d-2 / h-d3 / h-d4 본격 작성) = 다음 의뢰.

---

## 7. 참조 자료

### 정책 / 의뢰서
- `docs/disclosure-policy.md` (정책 본문, 특히 §2 채널 / §3 매트릭스 / §4.1 surfaceMap+uiSurfaceMap / §5 lieState 정책 / §11 진행축)
- `docs/codex-request-template.md` (의뢰서 표준)
- `docs/spot-check-format.md` (분류 카테고리)

### Baseline anchor
- `baseline/pre-policy-v1/` (a10b801)
- `baseline/pre-policy-v1/scripted-text-checksum.json` / `case-data-checksum.json`
- `baseline/pre-policy-v1/rollback-procedure.md`

### 사건 데이터 (Read 전용)
- `src/data/cases/generated/spouse-01.json`
- `src/data/claimPolicies/spouse-01-v3-game-loop-data.json` (dossier card / judgeHint 영역)
- `src/data/claimPolicies/spouse-01-structure-v2.json` (depthLayers / linkEdges)
- `src/data/claimPolicies/spouse-01-game-events-v2.json`
- `src/data/scriptedText/spouse-01.json` (lieStateGate 정합 cross-check sample)

### 메모리
- `feedback_truth_leak_prohibition.md` (#9, surface↔truth 매핑 + 금지 lexeme)
- `feedback_revision_meaning_over_form.md` (#6, 9차원 의미 정확성)
- `feedback_broad_homologous_detection.md` (#11, 광범위 검출 본질)
- `feedback_static_analysis_limit.md` (#12, 정적 분석 한계)
- `story_v2_confirmed_3cases.md` (사건 fact 절대 보존)
- `project_active_cases.md` (활성 3건 한정)

### 이전 의뢰 패턴
- `tmp/REQUEST-Codex-Tier0-baseline-freeze.md`
- `tmp/REQUEST-Codex-recovery-v[2,4,5,6].md`

---

## 8. 진행 절차

1. ✅ ClaudeCode CT 의뢰서 작성 (이 단계)
2. 사용자 검토 → Codex 전달 승인
3. Codex schema 골격 + spouse-01 7개 섹션 + d-1 sample 작성
4. Codex 자동 검증 (5.1)
5. ClaudeCode CT 검수 (5.2 12개 체크리스트)
6. 사용자 schema 합의 + sample confirm (5.3)
7. commit (영구 기록) + 다음 의뢰 분리

---

## 9. 메타

**Timeline 예상**: 3~5일 (Codex 작업 1~2일 + CT 검수 + 사용자 confirm + 조정)

**다음 의뢰 (Codex)**:
- spouse-01 완성본 (d-2 / h-d3 / h-d4 본격 issueProgression)
- family/friend schema 확장 (Tier 1 +2~3일 / +2~3일)
- Tier 2 검증 wrapper (`tmp/run-all-checks.cjs` / `policy-vs-data-cross-check.cjs`)

**상태**: ClaudeCode CT 의뢰서 작성 완료. 사용자 검토 + Codex 전달 대기.
