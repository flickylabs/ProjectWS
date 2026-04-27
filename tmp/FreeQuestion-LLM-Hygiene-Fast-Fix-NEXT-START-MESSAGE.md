# Codex-Dev Free Question / LLM Hygiene Fast Fix 진입 메시지 (P0급 — Route Simulator 우선)

**세션 영역**: 자유 질문 영역 두 fast fix
- 무관/메타 질문 active dispute 강제 매핑 회피 → `unmapped` 분류
- `[LLM]` / `[FALLBACK]` 내부 태그 UI 노출 0건

**의뢰서 본문**: `tmp/REQUEST-Codex-FreeQuestion-LLM-Hygiene-Fast-Fix.md`

---

## 1. 진입 조건 (먼저 실행)

```bash
git pull origin main
git log --oneline -1
git status --short --branch
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
npm run build:pc
npx tsc -b --force
```

PASS 후 진행. 어느 하나 fail → 즉시 중단 + CT-Main 보고.

---

## 2. 필수 정독

| 우선순위 | 파일 |
|---|---|
| P0 | `tmp/REQUEST-Codex-FreeQuestion-LLM-Hygiene-Fast-Fix.md` (의뢰서 본문) |
| P0 | `docs/information-surface-policy.md` v1.1 §2.6 (내부 용어 X) / §5.1 (unmapped 노출) / §6.3 (메시지 길이) |
| P0 | `docs/disclosure-policy.md` |
| P0 | `CLAUDE.md` (게임 핵심 원칙) |
| P1 | `src/engine/freeInterrogation/intentClassifier.ts` (unmapped 분류) |
| P1 | `src/engine/freeInterrogation/contextMapper.ts` (active dispute 매핑) |
| P1 | `src/engine/freeInterrogation/index.ts` / `heuristic.ts` / `fallback.ts` |
| P1 | `src/engine/llmClient.ts` (`[LLM]` 태그) |
| P1 | `src/hooks/useActionDispatch.ts` (`[FALLBACK]` 태그 — 단 본체 대형 리팩터 X) |
| P2 | `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md` (P0-A 7 intent taxonomy) |
| P2 | `tmp/REQUEST-Codex-DevB-FreeInterrogation-Guard.md` (P0-B fallback 매트릭스) |

---

## 3. 작업 본질

### 1.1 Intent 분류 영역 강화
- 무관 질문 (날씨 / 인사 / 식사 영역) → `unmapped`
- 메타 질문 (게임 방법 / 저장 / phase 영역) → `unmapped`
- 게임 외 영역 (욕설 / 광고 영역) → `unmapped`
- `unmapped` 시: VFX X / 관찰 X / 수첩 X / 발언노트 X / **채팅창에 안전 fallback만**

### 1.2 내부 태그 UI 노출 0건
- `[LLM]` / `[FALLBACK]` / 기타 변형 (`[llm]` / `[fallback]` / `[LLM:dialogue]`)
- 사용자 영역 (NPC 응답 / system message / 관찰 / 수첩 / 발언노트 / VFX / 채팅창) 0건
- 코드 debug log 영역 (`console.log('[LLM] ...')`)은 OK — UI 영역만 0건

### minimal touch 영역
- `useActionDispatch.ts` 본체 대형 리팩터 X — **태그 노출 영역만 minimal 정합**
- 새 큐 / 새 trigger / 새 hook X
- 7 intent taxonomy 변경 X (P0-A 영역 정합)

---

## 4. 진행 순서

Phase A (사전 audit + 영역 식별 + 무관/메타 sample 10) → 산출물 + 보고
→ Phase B (intent 분류 강화 + 태그 노출 차단 + minimal `useActionDispatch.ts` 정합) → 보고
→ Phase C (검증 — 10 unmapped + 10 mapped regression + UI grep 0건 + check:all/build:pc/tsc PASS) → commit + push + 보고

---

## 5. 절대 회피선

- ScriptedText / caseData / 정책 직접 수정 X
- `src/app/pc.css` touch X
- baseline anchor / feature flag global default X
- LLM 호출 영역 본체 변경 X (`api/llm/*` / Proxy Migration `596d235` 정합)
- VITE_OPENAI_API_KEY 참조 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X
- 새 큐 / 새 trigger / 새 컷씬 X (P0-F 정합)
- 7 intent taxonomy 변경 X (P0-A 정합)

---

## 6. 산출물 위치

```
tmp/qa-codex-freequestion-hygiene-results/
├── 20260427-phase-a-audit.md
├── 20260427-phase-b-fix-summary.md
├── 20260427-phase-c-verification.md
├── unmapped-samples.json
├── mapped-samples.json
├── tag-leak-grep.txt
└── 20260427-summary.md
```

---

## 7. 종료 조건

- [ ] 무관/메타 10 sample 100% `unmapped`
- [ ] 의도 매핑 10 sample regression 0
- [ ] `unmapped` 시 안전 fallback (내부 태그 X)
- [ ] UI 영역 `[LLM]` / `[FALLBACK]` 0건
- [ ] `useActionDispatch.ts` 대형 변경 X
- [ ] check:all / build:pc / tsc PASS
- [ ] commit + push
- [ ] CT-Main 보고

---

**시작 영역**: 진입 조건 검사 → 정독 → Phase A audit + 영역 식별 → CT-Main 보고 → Phase B·C.
