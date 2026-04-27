# Codex-Dev A — P1 Stabilization Patch (의뢰서)

**작성**: CT-Main / 2026-04-27
**기준 HEAD**: `4e0a1b6 docs(policy): tier-3 guard hardening — paraphrase set + uiSurfaceMap surface`
**Baseline anchor**: `a10b801` (`baseline-pre-policy-v1`)
**병행 의뢰**: Codex-Dev B (Tier 3 guard MVP) — write set 분리, 동시 진행 가능

---

## 의뢰 본질

C-prime QA에서 발견된 ship-blocker P1 영역 데이터 보정 + UI 코드 fix. **Tier 3 guard MVP (Codex-Dev B)와 분리** — A는 정적 데이터/UI 영역, B는 runtime guard 영역.

---

## 시작 조건 (반드시 먼저 실행)

```bash
git status --short --branch
git log --oneline -1                  # HEAD = 4e0a1b6 확인
git diff --quiet && git diff --cached --quiet && echo "tracked clean" || echo "tracked dirty"
npm run check:all                     # hard 0 / warnings 157 (baseline-known)
```

**중단 조건**:
- HEAD ≠ `4e0a1b6` (CT-Main이 새 SHA 갱신했으면 그 기준)
- `tracked dirty` (CT-Main 또는 다른 세션 작업 충돌)
- `npm run check:all` hard issues > 0 (baseline 회귀 의심)

**진행 조건**:
- HEAD = `4e0a1b6`
- tracked clean (untracked `tmp/qa-*` 무시)
- wrapper hard 0 / warnings 157

---

## ⚠️ 핵심 사고 회피 — A-1 ScriptedText 보정 baseline 회귀 위험

**중요한 학습**: `tmp/codex-recovery-v3/precheck-stage-aware.cjs`는 **모든 ScriptedText `text` 필드 변경을 baseline 회귀(`category: C`)로 분류**. 의미 보존 보정도 동일.

CT-Main 사고 사례 (2026-04-27):
- D6 `잖아요` 2건 직접 Edit → `[FAIL] v3-stage-aware: 2 hard / 14931 variants`
- 즉시 revert + 메모리 학습 (`feedback_baseline_anchor_scripted_text.md`)

**A-1 진입 절차 (사용자 명시)**:

### Phase 1 — 수정 가능 경로 spike (BLOCKED 결정 단계)

ScriptedText 보정 시 `npm run check:all` PASS 유지 불가능. 다음 3 옵션 spike:

**옵션 A**: 새 baseline anchor 생성
- `baseline-pre-policy-v2` 생성 (보정 후 새 checksum + tag)
- 기존 anchor와 diff/checksum 영역 분리
- precheck-stage-aware.cjs가 새 anchor 기준으로 재실행

**옵션 B**: 변경 영역 whitelist 메커니즘
- precheck-stage-aware.cjs 또는 별도 영역에 의도된 변경 variant ID list
- ⚠️ wrapper 수정 = 사용자 명시 회피선 위반 가능성. CT-Main confirm 필요

**옵션 C**: 변경 영역 anchor 병행 (이중 anchor)
- 기존 anchor 유지 + 변경 영역 별도 anchor
- 회귀 검사 시 두 anchor 모두 검증

**spike 산출물** (`tmp/qa-codex-dev-a-results/spike-baseline-handling.md`):
- 3 옵션 비교 (구현 복잡도 / 기존 시스템 영향 / 회귀 안전성)
- 권장 옵션 + 사유
- **`npm run check:all` PASS 유지 불가능 시 → BLOCKED 보고** (CT-Main에 ScriptedText 보정 영역 처리 결정 위임)

→ spike 결과 받은 후 CT-Main 결정 → Phase 2 진입

### Phase 2 — ScriptedText 보정 (Phase 1 결정 후)

#### A-1.1 S-1 6 P0 (Codex 보고 명시)

| Variant ID | case | 현 text | 보정 가이드 |
|---|---|---|---|
| `judgeq-d-4-motive-search-3-v1` | family-01 | "윤정후 씨, 출생에 관한 사실이 원본 유서를 고친 판단과 어떻게 연결됩니까." | `출생에 관한 사실` + `유서를 고친` 우회 → 추상화 ("민감한 가족 사정과 유서 변경 판단의 연결"). depth 3 motive_search 톤 보존 |
| `judgeq-d-3-fact_pursuit-1-v1` | family-01 | "어머니 통장으로 정기적으로 돈을 보내신 사실은 인정하십니까." | `어머니 통장으로 정기적으로 돈을 보내` 우회 → "어머니께 정기적인 지원이 있었던 사실은 인정하십니까" 류 추상화 |
| `b-d-3-S2-fact-pursuit-v2` | family-01 / B / S2 | "어머니 통장으로 꾸준히 돈을 넣었습니다. 생활비가 비는 달이 많았습니다." | S2에서 지원 주체·생활비 목적 직접 노출 X. affect_flattening 회피 톤 + S2 핑계 ("매달 도와드릴 일이 있었습니다. 자주 드나들 일이 생겼습니다." 류) |
| `b-d-3-S2-fact-pursuit-v5` | family-01 / B / S2 | "정기적이라고 불러도 될 만큼 보냈습니다. 제 형 쪽 생활이 그렇게 이어진 정황..." | 동상. S2 우회 톤 + 시간/주체 추상화 |
| `judgeq-d-3-fact_pursuit-1-v1` | friend-01 | "송다은 씨 아버지가 예비신랑에게 돈 이야기를 꺼낸 사실을 언제 알았습니까." | 아버지-돈-axis 직접. "그 무렵 가족 쪽에서 돈 이야기가 오갔다는 사실을 언제 알았습니까" 류 추상화 |
| `b-d-2-S2-empathy-approach-v7` | spouse-01 / B / S2 | "가족을 돕는 일이 급했습니다." | S0~S2 영역 가족 지원 동기 직접 노출 X. avoidant 모호어 ("말씀드리기 어려운 사정이 급했습니다" 류) |

#### A-1.2 CT-Cross 14 P1 (D2-A 12 + D2-B 2)

**D2-A judge_* channel paraphrase 12** (CT-Cross 보고서 §"D2 Truth-leak paraphrase" 참조 — 정확한 ID list):

family-01 (10):
- `judgeq-d-2-fact-pursuit-4-v3` ("자기 몫을 줄였더라도 문서를 고친 책임...")
- `judgeq-d-2-motive-search-3-v3` ("...자기 몫을 줄이면서도 왜 법적 위험을...")
- `judgeq-d-2-empathy-approach-3-v3` ("...자기 몫을 줄였다는 사실도 말하지 못한 이유...")
- `judgeq-d-3-fact-pursuit-1-v5` ("두 분, 생활비와 공장 자금의 출처를...")
- `judgeq-d-3-fact-pursuit-2-v3` ("...매달 보낸 돈과 공장 자금이 같은 흐름인지...")
- `judgeq-d-4-empathy-approach-4-v1` ("...유서를 고친 일입니까.")
- `judgec-d-2-soft-v5` ("...자기 몫을 줄였다는 사실과 문서를 고친 책임을...")
- `judgec-d-2-mid-v5` ("...자기 몫을 줄였다는 사정이 있어도 위조 책임은...")
- `judgec-d-3-soft-v3` ("...생활비와 공장 자금까지 이어진다면 처음 설명이...")
- `judgeq-d-4-motive-search-3-v1` (A-1.1 #1과 중복 — 1회 처리)

friend-01 (2):
- `judgeq-d-2-fact_pursuit-2-v1` ("최수민 씨, 선을 넘은 말에 어떻게 거절했는지...")
- `judgec-d-2-hard-v1` ("최수민 씨, 거절했다는 기록을 숨긴 선택이...")

**D2-B NPC S0 단정 2** (family-01 A의 진실 단정):
- `a-d-5-S0-fact-pursuit-v1` ("제 동생이 어머니를 이용한 겁니다. 유서를 손댄 것만 봐도 답이 나옵니다.")
- `a-d-5-S0-fact-pursuit-v2` ("자기 몫을 줄였든 늘렸든 상관없습니다. 어머니가 정한 문서를 손으로 고쳤다면 이용한 겁니다.")
  - 보정: A의 S0 단정도 진실 단정 톤 X → `그런 정황이 보입니다` / `그렇게 생각합니다`로 hedge

**D2-C NPC S2 직접 자백 1** (friend-01):
- `b-d-4-S2-fact-pursuit-v1` ("다은이 아버지가 제 돈을 가져간 게 맞습니다.")
  - 보정: S2 = 핑계 단계. 직접 단정 X. "그때도 비슷한 일이 있었습니다" 류 모호어로 후퇴

**D2-D evidence_discovery 1** (friend-01):
- `discover-b-e-4-capture-v1` ("지금 결혼이 깨질까 봐라고 하셨습니다. 먼저 선을 넘는 메시지를 보고도...")
  - 보정: `evidence_discovery` 채널이 진실을 establ된 사실로 단정 X. "...메시지를 봤다고 한 그 시점에..." 류

#### A-1.3 D6 register `잖아요` 2 (CT-Main이 직접 Edit 시도 → revert 영역)

- `a-d-1-S1-motive-search-v2` (spouse-01)
  - 현: "...물건이라도 말해주잖아요."
  - 보정안 (CT-Main 검증): "...물건이라도 말해 주지 않습니까." (victim_cosplay 단정 + 합니다체)
- `a-d-1-S2-fact-pursuit-v3` (spouse-01)
  - 현: "...그러는 거잖아요."
  - 보정안 (CT-Main 검증): "...그러는 것 아닙니까." (S2 핑계 + 합니다체)

#### 보정 가이드 (모든 A-1 entries 공통)

**잘못 패턴 #6 — 9차원 의미 정확성 보존 필수**:
1. archetype voice 보존 (victim_cosplay 단정 / avoidant 모호 / confrontational 직접 / affect_flattening 회피 / premature_summary 결론 jump)
2. lieState 단계 정합 (S0 부정 / S1 일부 인정 / S2 핑계 / S3 책임 전가 / S4 감정 / S5 자백)
3. 추궁 차원 정합 (fact_pursuit / motive_search / empathy_approach + soft/hard)
4. 호칭 정책 (재판관 → "OOO 씨" / 당사자 간 callTerms / 합니다체 vs 해요체)
5. 진실 lexeme 0건 + paraphrase 우회 0건 (정책 §4.1·4.2·4.3 paraphrase set 참조)
6. behaviorHint 톤 정합 (entry 옆 behaviorHint와 voice mismatch X)
7. tags 영역 (channel / lieState / target / depth) 변경 X

**참조 자료**:
- `docs/disclosure-policy.md` §4.1·4.2·4.3 (paraphrase set + gating + uiSurfaceMap surface)
- `tmp/qa-scripted-results/20260427-S-1-summary.md` (Codex 발견 6 P0 상세)
- `tmp/qa-ct-cross-results/20260427-semantic-review.md` §"D2 Truth-leak paraphrase" (CT-Cross 14 P1 상세)
- `memory/feedback_revision_meaning_over_form.md` (잘못 패턴 #6 9차원 가이드)
- `memory/story_v2_confirmed_3cases.md` (3 사건 핵심 사실 + archetype 매핑)
- `CLAUDE.md` (한국어 품질 + 호칭 + 톤 규칙)

---

### A-2 UI 무분기 P1 28 path

**참조**: `tmp/qa-scripted-results/20260427-S-4-summary.md` 표 (P1 43건 / deepInvestigated 분기 영역 제외 후 약 28 path)

**처리 방향 — 두 가지 적용 영역 구분**:

#### 영역 (가): evidence.name 직접 출력 → surfaceName 우선 분기 추가

기존 정상 영역 (`PCEvidenceViewer:58`, `PCBottomDock:135-136`, `PCLeftPanel:96-97/196`)이 `deepInvestigated` 분기를 적용함:

```typescript
const label = state?.deepInvestigated ? evidence.name : (evidence.surfaceName ?? evidence.name)
```

같은 패턴을 다음 무분기 영역에 적용:
- `src/components/actions/ActionPanel.tsx:261/273/277/278/393`
- `src/components/actions/DossierCardPanel.tsx:175`
- `src/components/actions/DossierHint.tsx:95`
- `src/components/discovery/EvidenceAppraisalModal.tsx:75/76`
- `src/components/info/EvidenceBoard.tsx:60/68`
- `src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx:490/589/596`
- `src/components/pc/hotbar/PCActionsPanel.tsx:226/244/245/253`
- `src/components/pc/panels/PCRightPanel.tsx:1212`
- `src/components/verdict/EvidenceLegality.tsx:38/40/80/82`

각 영역마다 `state?.deepInvestigated` 또는 동등한 게이트 조건 확인 후 분기 추가. 게이트 조건 영역 명확하지 않으면 **default = surface** (보수적).

#### 영역 (나): dossier card label/name 직접 출력 → uiSurfaceMap 추상화 적용

```typescript
// 권장 패턴
const dossierLabel = uiSurfaceMap?.dossierLabel?.[card.id] ?? card.name
```

대상:
- `src/components/actions/ActionPanel.tsx:343/399`
- `src/components/actions/DossierCardPanel.tsx:75/181`
- `src/components/actions/DossierHint.tsx:126`
- `src/components/discovery/DisputeBoard.tsx:238`

**uiSurfaceMap 영역**: 정책 §4.1·4.2·4.3 surface 텍스트 기준. JSON 정책에 path 명세된 영역은 정책 surface 사용. 정책 미명세 영역은 case data `card.name` fallback (단 baseline-known WARN 영역으로 분류).

---

### A-3 archetype 영문 fallback 매핑 6건

**참조**: S-4 보고서 P1 archetype 영역 (TC-B2/G5)

**현재 상태**: 일부 컴포넌트는 hardcoded mapping (`{avoidant:'회피형', confrontational:'정면돌파형', ...} as Record<string,string>`), 일부는 `getArchetypeLabel()` 함수 사용. 양쪽 모두 매핑 누락 시 영문 코드 UI 노출 위험.

**6 활성 archetype 한국어 매핑 (사용자 confirm 완료)**:
- `avoidant` → `회피형`
- `victim_cosplay` → `피해 호소형`
- `confrontational` → `정면돌파형`
- `affect_flattening` → `감정 절제형`
- `cold_logic` → `냉정 분석형`
- `premature_summary` → `성급 결론형`

**처리 방향**:
- 모든 활성 6 archetype에 매핑 보장 (fallback 시 영문 노출 X)
- 단일 매핑 헬퍼 (예: `src/utils/archetypeLabel.ts`) 신규 생성 + 6 path 모두 헬퍼 사용
- 매핑 누락 시 영문 X / "기타" 또는 빈 문자열 fallback

**대상 path** (S-4 보고서):
- `src/components/court/PartyStatusBar.tsx:160`
- `src/components/layout/CourtHeader.tsx:478`
- `src/components/pc/home/PCCaseBrief.tsx:96/128`
- `src/components/phase/Phase0_CaseIntro.tsx:132/142`

---

## 작업 영역 분리

- 결과 파일: `tmp/qa-codex-dev-a-results/` 하위만 (산출물 / spike 보고)
- 데이터 변경 영역: `src/data/scriptedText/{caseId}.json` (A-1) — Phase 1 spike 후
- UI 코드 변경: `src/components/**/*.tsx` (A-2, A-3)
- 신규 헬퍼: `src/utils/archetypeLabel.ts` (A-3) — 신규 파일 OK
- **다른 세션 영역 침범 X**: `tmp/qa-functional-results/` / `tmp/qa-scripted-results/` / `tmp/qa-ct-cross-results/`

---

## 절대 금지선

- **Codex-Dev B 영역 침범 X**: `src/engine/llmDialogueResolver.ts` 수정 X (B 영역)
- **runtime guard 신규 X** (B 영역)
- **policy JSON / Markdown 수정 X** (CT-Main 영역)
- **wrapper 스크립트 수정 X** (`tmp/run-all-checks.cjs` / `tmp/policy-vs-data-cross-check.cjs` / `tmp/policy-md-json-sync-check.cjs`)
- **TC 문서 수정 X** (`docs/qa-*.md`)
- **`useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X** (Tier 4+ 보류)
- **baseline anchor (a10b801) 회귀 X**: 단 A-1 영역은 사용자 결정 영역 — Phase 1 spike에서 처리 방향 결정
- **단순 어휘 교체 X** (잘못 패턴 #6 — 9차원 의미 정확성 보존)
- **사용자 1 사례만 처리 X** (잘못 패턴 #11 — 동형 광범위 검출)

---

## 결과 보고 형식

각 단계 산출물 → `tmp/qa-codex-dev-a-results/`:

### Phase 1 spike 보고
`tmp/qa-codex-dev-a-results/{YYYYMMDD}-spike-baseline-handling.md`:
- 3 옵션 비교 (구현 복잡도 / 영향 / 안전성)
- 권장 옵션 + 사유
- BLOCKED 시 BLOCKED 사유 + CT-Main 결정 영역 명시

### Phase 2 patch 보고 (단계별)
`tmp/qa-codex-dev-a-results/{YYYYMMDD}-{phase}-summary.md`:
- HEAD / Scope / Commands run
- A-1: variant ID list + 보정 전후 text + 9차원 보존 검증 결과
- A-2: path list + 변경 전후 코드 diff + deepInvestigated 분기 적용 영역
- A-3: 헬퍼 신규 + 6 path 영역 + 매핑 검증
- `npm run check:all` 결과 (Phase 2.A-1만 영역 — A-2/A-3는 wrapper 무관)
- baseline 회귀 X 확인
- known finding vs new finding 분리

---

## 합격 조건 (각 phase별)

### Phase 1
- spike 보고 산출 + CT-Main 결정 영역 명시

### Phase 2.A-1
- 23 entries 보정 완료
- `npm run check:all` PASS 유지 (Phase 1 결정 영역 따라)
- 각 entry 9차원 정합 검증

### Phase 2.A-2
- 28 path 분기 추가 또는 surface 우선 적용
- `npm run build` PASS / `npx tsc -b --force` PASS
- UI 렌더 영역 검증 (옵션 — 헤드리스 또는 dev 서버)

### Phase 2.A-3
- 6 path 매핑 보장 + 헬퍼 신규
- archetype 영문 코드 UI 노출 X 보장

---

## 분담

| 영역 | Codex-Dev A | CT-Main 결정 | CT-Cross 검수 |
|---|---|---|---|
| Phase 1 spike | 실행 | 옵션 결정 | (선택) |
| A-1 보정 | 실행 (Phase 1 결정 후) | spike 보고 검토 | 9차원 의미 보존 검수 |
| A-2 UI 분기 | 실행 | — | (선택) |
| A-3 archetype 매핑 | 실행 + 헬퍼 신규 | 6 한국어 라벨 confirm | (선택) |
| 최종 commit | (Codex-Dev A 또는 CT-Main) | 사용자 confirm 후 | — |
