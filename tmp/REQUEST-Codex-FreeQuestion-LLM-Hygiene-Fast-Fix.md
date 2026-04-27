# REQUEST — Codex-Dev Free Question Hygiene Fast Fix (P0급 — scope 축소 영역 / #1과 병렬)

**의뢰일**: 2026-04-27 (v2 — #1과 충돌 회피 영역 scope 축소)
**요청자**: ClaudeCode CT-Main
**우선순위**: **P0급** (AI 핵심 기능 영역 / #1 spouse-01 Phase 2 Spoiler Cascade Fast Fix와 병렬)
**병렬**: #1 spouse-01 Phase 2 Spoiler Cascade Fast Fix (write scope 분리 영역)

---

## 1. 목표 (사용자 명시 영역 — scope 축소)

자유 질문 영역 intent / mapping / fallback 영역 hygiene 정합. **source label 영역은 #1에서 처리** — 본 의뢰서 영역 X.

### 허용 5 영역 (사용자 명시)
1. **intentClassifier 과매칭 축소** — 무관 질문이 active intent에 강제 분류 영역 회피
2. **meta / off-topic 질문 `unmapped` 처리** — 게임 외 영역 / 시스템 메타 질문 / 인사 영역 → `unmapped`
3. **contextMapper active dispute 자동 매핑 완화** — `unmapped` 또는 confidence 낮은 영역에서 active dispute 강제 매핑 X
4. **safe fallback 품질** — `unmapped` 시 안전 fallback 응답 영역 archetype / lieState / 한국어 자연체 검증 (P0-B 매트릭스 정합)
5. **자유 질문 검증 케이스** — 무관 / 메타 / 의도 매핑 sample 영역 검증

### 금지 4 영역 (사용자 명시)
- **source label 렌더링 영역 수정 X** (`[SCRIPT]` / `[FALLBACK]` / `[LLM]` — #1 영역 정합)
- **`src/app/pc.css` touch X** (#1 단일 소유 영역)
- **`emergenceHooks.ts` / `discoveryEngine.ts` / `meterStagingV2.ts` / `gameEventTriggerEngine.ts` 수정 X** (#1 영역)
- **API proxy 구조 수정 X** (Proxy Migration `596d235` 정합)

---

## 2. 진입 조건

- HEAD: 최신 main (#1 또는 #1 commit 후 영역)
- baseline anchor: `baseline-pre-policy-v1` / `v2` 보존
- working tree: tracked clean
- `npm run check:all` PASS / `npm run build:pc` PASS / `npx tsc -b --force` PASS

---

## 3. 분담

| 영역 | 담당 |
|---|---|
| 정책 / scope / 검증 | CT-Main |
| **이 세션 (Codex-Dev #2)** | **intent / contextMapper / fallback 품질 / 자유 질문 검증 케이스** |
| #1 spouse-01 Spoiler Cascade Fast Fix | source label / pc.css / emergenceHooks / discovery / gating / 추궁 팝업 — 별도 트랙 |

---

## 4. 사전 audit 결과 (CT 영역)

### 4.1 Free Interrogation 영역 (write scope)
- `src/engine/freeInterrogation/intentClassifier.ts` — `unmapped` 분류 영역 강화
- `src/engine/freeInterrogation/contextMapper.ts` — active dispute 매핑 영역 완화
- `src/engine/freeInterrogation/fallback.ts` — fallback 품질 영역 검증 (P0-B 매트릭스)
- `src/engine/freeInterrogation/heuristic.ts` — intent mismatch 영역 정합
- `src/engine/freeInterrogation/index.ts` — 진입점 영역

### 4.2 정책 영역 정합
- `docs/information-surface-policy.md` v1.1 §5.1 (자유심문 분석 노출 깊이 — `unmapped` 시 VFX/관찰/수첩/발언노트 X / 채팅창 안전 fallback만)
- §6.6 (자유심문 노출 깊이 정합)
- `docs/disclosure-policy.md` §3.3 매트릭스 (lieState 정합)

### 4.3 #1 영역 (touch X)
- `src/engine/llmClient.ts` (source label `[LLM]` — #1 영역)
- `src/hooks/useActionDispatch.ts` (source label `[FALLBACK]` — #1 영역)
- `src/data/emergenceHooks.ts` (#1 영역)
- `src/data/claimPolicies/spouse-01-structure-v2.json` (#1 영역)
- `src/engine/discoveryEngine.ts` / `meterStagingV2.ts` / `gameEventTriggerEngine.ts` (#1 영역)
- `src/app/pc.css` (#1 단일 소유 영역)

---

## 5. Scope (허용 5 영역)

### 5.1 intentClassifier 과매칭 축소
**대상**: `intentClassifier.ts`

**검출 영역**:
- 무관 질문 (날씨 / 인사 / 식사 영역) → 현재 active intent에 강제 분류 → `unmapped` 정합
- 메타 질문 (게임 방법 / 저장 / phase 영역) → `unmapped`
- 게임 외 영역 (욕설 / 광고 영역) → `unmapped`
- confidence 낮은 영역 → `unmapped` (강제 active 영역 분류 X)

**기대**: rule-based 1차 영역에서 무관/메타 영역 정확 분류 + LLM-aided 2차 영역 confidence threshold 영역 정합

### 5.2 meta / off-topic 질문 `unmapped` 처리
**대상**: `intentClassifier.ts` + `index.ts`

**구체 영역**:
- 게임 시스템 메타 ("어떻게 해요" / "저장은" / "다음 phase")
- 일반 대화 / 인사 ("안녕" / "수고하셨습니다" / "재판관님")
- 게임 외 영역 (욕설 / 광고 / 시험성 입력)
- 모호한 영역 ("음" / "글쎄" / "..." 등)

→ `unmapped` 영역 정합 / VFX X / 관찰 X / 수첩 X / 발언노트 X

### 5.3 contextMapper active dispute 자동 매핑 완화
**대상**: `contextMapper.ts`

**검출 영역**:
- intent = `unmapped` 또는 confidence 낮은 영역에서 active dispute 강제 매핑 영역 → 매핑 X (target / disputeId / interrogationType / evidenceRef 모두 null)
- 의도 매핑 영역에서 active dispute 영역 우선 / 단 confidence threshold 영역 정합

**기대**: NPC 응답 영역에서 엉뚱한 active dispute 영역 답변 X / `unmapped` 시 안전 fallback 영역 정합

### 5.4 safe fallback 품질
**대상**: `fallback.ts` (P0-B 매트릭스 영역) + `heuristic.ts`

**검증 영역**:
- archetype 정합 (박지연 victim_cosplay / 이준호 avoidant / etc.)
- lieState 정합 (S0~S2 영역에서 진실 누설 X)
- 한국어 자연체 (번역체 9패턴 X / 명사형 어색 X)
- 호칭 정합 (재판관 → "OOO 씨" / 당사자 → 합니다체)

→ P0-B 의뢰서 §4.3 매트릭스 영역 sample 검증 (72+ entries 영역 review)

### 5.5 자유 질문 검증 케이스
**산출물 영역**:
- 무관 질문 sample 10개 → 100% `unmapped` 검증
- 메타 질문 sample 10개 → 100% `unmapped` 검증
- 의도 매핑 질문 sample 10개 → 정상 매핑 (regression 0)
- confidence 낮은 영역 sample 5개 → `unmapped` 정합
- 산출물: `tmp/qa-codex-freequestion-hygiene-results/intent-validation-cases.json`

---

## 6. 절대 회피선 (사용자 명시)

### 6.1 사용자 명시 4 영역 금지
- **source label 렌더링 영역 수정 X** (`[SCRIPT]` / `[FALLBACK]` / `[LLM]`) — `llmClient.ts` / `useActionDispatch.ts` 영역에서 source label 영역 touch X. **#1 영역 정합**.
- **`src/app/pc.css` touch X** — #1 단일 소유 영역
- **`emergenceHooks.ts` / `discoveryEngine.ts` / `meterStagingV2.ts` / `gameEventTriggerEngine.ts` 수정 X** — #1 영역
- **API proxy 구조 (`api/llm/*`) 수정 X** — Proxy Migration `596d235` 정합

### 6.2 CT 영역
- ScriptedText / caseData / 정책 영역 직접 수정 X
- baseline anchor / feature flag global default X
- LLM 호출 영역 본체 변경 X
- VITE_OPENAI_API_KEY 참조 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` / `llmDialogueResolver.ts` 변경 X (read only)
- 새 큐 / 새 trigger / 새 컷씬 X (P0-F 정합)
- 7 intent taxonomy 변경 X (P0-A 영역 정합)

### 6.3 #1과 충돌 회피
- 본 세션 write scope = `src/engine/freeInterrogation/*` 만
- #1 영역과 같은 파일 영역 touch X
- 진입 시 `git status` 영역 — #1 영역 변경 영역 stage 또는 unstage 영역 발견 시 즉시 중단 + 보고

---

## 7. 진행 순서

### Phase A — 사전 audit + sample 식별
1. `intentClassifier.ts` 영역 — 무관/메타 sample 영역 dry-run + 강제 매핑 영역 trigger 식별
2. `contextMapper.ts` 영역 — active dispute 매핑 영역 review
3. `fallback.ts` / `heuristic.ts` 영역 — safe fallback 품질 영역 review
4. 자유 질문 검증 case 영역 작성 (35 sample 영역)
5. 산출물: `tmp/qa-codex-freequestion-hygiene-results/20260427-phase-a-audit.md`
6. CT-Main 보고

### Phase B — 5 fix 적용
1. (5.1) intentClassifier 과매칭 축소
2. (5.2) meta/off-topic `unmapped` 처리
3. (5.3) contextMapper 자동 매핑 완화
4. (5.4) safe fallback 품질 검증
5. (5.5) 자유 질문 검증 케이스 정식

### Phase C — 검증 + commit
1. 무관/메타 10 sample 100% `unmapped`
2. 의도 매핑 10 sample regression 0
3. confidence 낮은 5 sample `unmapped` 정합
4. safe fallback 품질 영역 sample 검증
5. `npm run check:all` PASS
6. `npm run build:pc` PASS
7. `npx tsc -b --force` PASS
8. commit + push
9. CT-Main 보고

---

## 8. 종료 조건

- [ ] (5.1) intentClassifier 과매칭 축소
- [ ] (5.2) meta/off-topic 10 sample 100% `unmapped`
- [ ] (5.3) contextMapper 자동 매핑 완화 (`unmapped` 시 매핑 영역 null)
- [ ] (5.4) safe fallback 품질 검증 (archetype / lieState / 한국어 자연체 / 호칭)
- [ ] (5.5) 자유 질문 검증 케이스 35 sample (`tmp/qa-codex-freequestion-hygiene-results/intent-validation-cases.json`)
- [ ] 의도 매핑 10 sample regression 0
- [ ] **source label 영역 touch 0건** (#1 영역 정합)
- [ ] **pc.css touch 0건** (#1 단일 소유 영역)
- [ ] **emergenceHooks / discovery / gating 영역 touch 0건** (#1 영역)
- [ ] `npm run check:all` PASS / `npm run build:pc` PASS / `npx tsc -b --force` PASS
- [ ] commit + push
- [ ] CT-Main 보고

---

## 9. 산출물

```
tmp/qa-codex-freequestion-hygiene-results/
├── 20260427-phase-a-audit.md           (Phase A)
├── 20260427-phase-b-fix-summary.md     (Phase B)
├── 20260427-phase-c-verification.md    (Phase C)
├── intent-validation-cases.json        (35 sample 영역)
├── unmapped-samples.json               (10 무관 + 10 메타 + 5 confidence)
├── mapped-samples.json                 (10 의도 매핑 — regression)
├── safe-fallback-quality-review.md     (P0-B 매트릭스 정합)
└── 20260427-summary.md                 (종합)
```

---

## 10. 관련 자료

- `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md` (P0-A 7 intent taxonomy)
- `tmp/REQUEST-Codex-DevB-FreeInterrogation-Guard.md` (P0-B fallback 매트릭스)
- `tmp/REQUEST-Codex-Spouse-01-Phase2-Spoiler-Cascade-Fast-Fix.md` (#1 영역 — 병렬 / 충돌 회피 영역)
- `docs/information-surface-policy.md` v1.1 (§5.1·6.6 자유심문 노출 영역)
- `docs/disclosure-policy.md` (§3.3 매트릭스)
- `CLAUDE.md` (게임 핵심 / 한국어 품질)
- 본 세션 진입 메시지: `tmp/FreeQuestion-LLM-Hygiene-Fast-Fix-NEXT-START-MESSAGE.md`

---

**상태**: v2 update 영역 (사용자 결정 (A) 영역 — scope 축소). #1과 병렬 진입 가능. write scope 분리 영역.
