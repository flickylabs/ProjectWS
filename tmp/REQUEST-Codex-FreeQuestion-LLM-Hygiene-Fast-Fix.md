# REQUEST — Codex-Dev Free Question / LLM Material Hygiene Fast Fix (P0급 — Route Simulator 우선)

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**우선순위**: **P0급** (AI 핵심 기능 영역 — Route Simulator보다 높음)
**병렬**: Release QA / Script Polish (read 영역) / UI Drawer 완료 영역 — 영역 충돌 X

---

## 1. 목표

자유 질문 영역의 두 영역 fast fix:

### 1.1 무관/메타 질문 강제 매핑 회피
현재 intent classifier / contextMapper 영역이 무관/메타 질문을 active dispute에 **강제 매핑** → 엉뚱한 NPC 답변. `unmapped` 영역으로 정확히 분류해야 함.

### 1.2 내부 태그 UI 노출 0건
`[LLM]` / `[FALLBACK]` (등 변형 — `[llm]` / `[fallback]`) 내부 태그가 UI에 흘러나옴. 정책 위반 (`docs/information-surface-policy.md` v1.1 §2.6 내부 용어 노출 X / §6.3 메시지 길이).

---

## 2. 진입 조건

- HEAD: `cd5f17c` (또는 그 이후 main 최신)
- baseline anchor: `baseline-pre-policy-v1` / `v2` 보존
- working tree: tracked clean
- `npm run check:all` PASS / `npm run build:pc` PASS / `npx tsc -b --force` PASS

---

## 3. 분담

| 영역 | 담당 |
|---|---|
| 정책 / scope / 검증 기준 | CT-Main |
| **이 세션 (Codex-Dev Hygiene Fast Fix)** | **intent 분류 영역 강화 + 태그 노출 영역 0건 처리** |
| Route Simulator | 후속 (이 fix 후 진입 영역) |
| Release QA / Script Polish | 별도 트랙 (충돌 X) |

---

## 4. 사전 audit 결과 (CT 영역)

### 4.1 `[LLM]` / `[FALLBACK]` 태그 위치
- `src/engine/llmClient.ts`
- `src/hooks/useActionDispatch.ts` (97KB — 단 minimal touch 영역만 / 대형 리팩터 X)

→ Phase A에서 정확한 line + 영역 식별. UI 노출 경로 (NPC 응답 텍스트 영역 / system message 영역) 추적.

### 4.2 Free Interrogation 영역
- `src/engine/freeInterrogation/intentClassifier.ts` (`unmapped` 분류 영역)
- `src/engine/freeInterrogation/contextMapper.ts` (active dispute 매핑 영역)
- `src/engine/freeInterrogation/index.ts` (진입점)
- `src/engine/freeInterrogation/heuristic.ts` (intent mismatch 영역)
- `src/engine/freeInterrogation/fallback.ts` (P0-B fallback 매트릭스)

→ Phase A에서 강제 매핑 trigger 위치 식별 + `unmapped` 분류 누락 영역 추적.

### 4.3 정책 영역 정합
- `docs/information-surface-policy.md` v1.1 §5.1 (자유심문 노출 깊이) — `unmapped` 시 VFX/관찰/수첩/발언노트 X / 채팅창 안전 fallback만
- §6.3 채팅창 메시지 길이 ≤ 30자 / 60자 / 세 줄 이상 X (내부 태그 영역 본질 위반)
- §2.6 VFX 내부 용어 금지 — `intent` / `classifier` / `LLM` / `guard` / `policy` / `누설`

---

## 5. Scope

### 5.1 Intent 분류 영역 강화 (4.2)

**대상**: `intentClassifier.ts` + `contextMapper.ts` + `index.ts`

**검출 영역 (사용자 명시)**:
- 무관 질문 (예: "오늘 날씨", "안녕", "재판관님 식사하셨어요")
- 메타 질문 (예: "이 게임 어떻게 해요", "저장 어떻게", "다음 phase 가나요")
- 게임 외 영역 (예: 욕설, 광고 영역)

**기대 동작**:
- 위 영역 모두 `intent: 'unmapped'` (의뢰서 §4.1 P0-A 7 intent 영역 정합)
- `mapped: { target: null, disputeId: null, interrogationType: null, evidenceRef: null }` 영역
- 호출자 (`useActionDispatch.ts` / 자유심문 영역)는 `intent === 'unmapped'` 시:
  - VFX trigger X (P0-F 정합 / `triggerAIReasoningCutscene` 호출 X)
  - 관찰 / 수첩 / 발언노트 X
  - 채팅창에 **안전 fallback 응답만** (내부 태그 X)

**현재 위반 영역 (Phase A에서 식별)**:
- 무관 질문이 active dispute에 강제 매핑되어 NPC가 엉뚱한 답변
- `unmapped` 분류 누락 (rule-based 1차 영역에서 fallback 매핑 X)

### 5.2 내부 태그 UI 노출 0건 (1.2)

**대상**: `llmClient.ts` + `useActionDispatch.ts` (관련 영역만 minimal touch)

**검출 영역**:
- `[LLM]` 태그
- `[FALLBACK]` 태그
- 기타 변형 (`[llm]` / `[fallback]` / `[LLM:dialogue]` 등)

**기대 동작**:
- 코드 안에 debug log 영역으로 사용 OK (`console.log('[LLM] ...')` 영역) — 단 사용자 UI 영역에 영향 X
- 사용자에게 보이는 영역 (NPC 응답 텍스트 / system message / 채팅창 / 관찰 / 수첩 / 발언노트 / VFX cutscene 영역) 0건
- 노출 경로 추적 + 차단

### 5.3 minimal touch 영역
- `useActionDispatch.ts` 본체 변경 X (대형 리팩터 X) — **태그 노출 영역만 minimal 정합**
- 새 규칙 / 새 큐 / 새 hook X
- 기존 freeInterrogation/ 영역 본체 강화만

---

## 6. 절대 회피선

- ScriptedText / caseData / 정책 영역 직접 수정 X
- `src/app/pc.css` touch X
- baseline anchor (v1·v2) 회귀 X
- feature flag global default 변경 X (`VITE_DISCLOSURE_GUARD_MODE=off` / `VITE_FREE_INTERROGATION_*` 영역 default 유지)
- LLM 호출 영역 본체 변경 X (`api/llm/*` / Proxy Migration `596d235` 정합)
- VITE_OPENAI_API_KEY 참조 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X
- 새 큐 / 새 trigger 영역 X
- 신규 컷씬 영역 X (P0-F 영역 정합)
- 7 intent taxonomy 변경 X (P0-A 영역 정합)

---

## 7. 진행 순서

### Phase A — 사전 audit + 영역 식별
1. `[LLM]` / `[FALLBACK]` 태그 위치 grep + UI 노출 경로 추적
2. 무관/메타 질문 sample 5~10개로 intent classifier 영역 dry-run + 강제 매핑 영역 trigger 식별
3. 영역 list 작성
4. 산출물: `tmp/qa-codex-freequestion-hygiene-results/20260427-phase-a-audit.md`
5. CT-Main 보고

### Phase B — fix
1. intent classifier 영역 강화 (무관/메타 → `unmapped`)
2. contextMapper 영역 강화 (active dispute 강제 매핑 영역 회피)
3. `unmapped` 시 안전 fallback 응답 — 내부 태그 X 검증 (P0-B 매트릭스 정합)
4. `[LLM]` / `[FALLBACK]` 태그 UI 노출 경로 차단
5. minimal `useActionDispatch.ts` 정합 (필요 영역만)

### Phase C — 검증
1. 무관/메타 질문 sample 10개 → 모두 `unmapped` 분류 + 안전 fallback 응답
2. 의도 매핑 질문 sample 10개 → 정상 매핑 + NPC 응답 정상 (regression 검증)
3. UI 영역 grep — `[LLM]` / `[FALLBACK]` 0건 (NPC 응답 / system message / 관찰 / 수첩 / 발언노트 / VFX / 채팅창 영역)
4. `npm run check:all` PASS
5. `npm run build:pc` PASS
6. `npx tsc -b --force` PASS
7. commit + push
8. CT-Main 보고

---

## 8. 종료 조건

- [ ] 무관/메타 질문 10 sample → `intent: 'unmapped'` 100% 정합
- [ ] 의도 매핑 질문 10 sample → 정상 매핑 (regression 0)
- [ ] `unmapped` 시 안전 fallback 응답 (내부 태그 X)
- [ ] `[LLM]` / `[FALLBACK]` UI 노출 0건 검증
- [ ] `useActionDispatch.ts` 본체 대형 변경 X (minimal 정합만)
- [ ] `npm run check:all` PASS / `npm run build:pc` PASS / `npx tsc -b --force` PASS
- [ ] 산출물: `tmp/qa-codex-freequestion-hygiene-results/`
- [ ] commit + push
- [ ] CT-Main 보고

---

## 9. 산출물

```
tmp/qa-codex-freequestion-hygiene-results/
├── 20260427-phase-a-audit.md          (Phase A 영역)
├── 20260427-phase-b-fix-summary.md    (Phase B 영역)
├── 20260427-phase-c-verification.md   (Phase C 영역)
├── unmapped-samples.json              (10 sample 결과)
├── mapped-samples.json                (10 sample regression)
├── tag-leak-grep.txt                  (UI 영역 grep 결과 0건)
└── 20260427-summary.md                (종합)
```

---

## 10. 관련 자료

- `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md` (P0-A 7 intent taxonomy)
- `tmp/REQUEST-Codex-DevB-FreeInterrogation-Guard.md` (P0-B fallback 매트릭스)
- `tmp/REQUEST-UIVFX-Dev-AIReasoningCutscene.md` (P0-F unmapped 시 VFX X)
- `docs/information-surface-policy.md` v1.1 (§2.6 내부 용어 / §5.1 unmapped 노출 / §6.3 길이)
- `docs/disclosure-policy.md` (정책 정합)
- `CLAUDE.md` (게임 핵심 원칙)
- 본 세션 진입 메시지: `tmp/FreeQuestion-LLM-Hygiene-Fast-Fix-NEXT-START-MESSAGE.md`

---

**상태**: 초안 작성 완료. Codex-Dev 검토 + Phase A 진입 대기. (Route Simulator보다 우선)
