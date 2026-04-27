# 세션 시작 — Free Question / LLM Hygiene Fast Fix (P0급 — Route Simulator 우선)

ClaudeCode CT-Main에서 의뢰합니다. **AI 핵심 기능** 영역 두 fast fix:
1. 무관/메타 질문이 active dispute에 **강제 매핑** → `unmapped` 분류 영역 강화
2. `[LLM]` / `[FALLBACK]` **내부 태그가 UI에 노출** → 0건 처리

---

## 1. git pull + 진입 조건 검사

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

1. `tmp/FreeQuestion-LLM-Hygiene-Fast-Fix-NEXT-START-MESSAGE.md` (진입 메시지)
2. `tmp/REQUEST-Codex-FreeQuestion-LLM-Hygiene-Fast-Fix.md` (**의뢰서 — 사전 audit / scope / 회피선 / 종료 조건**)
3. `docs/information-surface-policy.md` v1.1 §2.6 / §5.1 / §6.3
4. `docs/disclosure-policy.md`
5. `CLAUDE.md`
6. `src/engine/freeInterrogation/*.ts` (intent / contextMapper / fallback / heuristic / index)
7. `src/engine/llmClient.ts` (`[LLM]` 태그)
8. `src/hooks/useActionDispatch.ts` (`[FALLBACK]` 태그 — 단 본체 대형 리팩터 X)

---

## 3. 작업 본질

### 1.1 Intent 분류 강화
- 무관 (날씨 / 인사 / 식사) / 메타 (게임 방법 / 저장 / phase) / 게임 외 (욕설 / 광고) → `unmapped`
- `unmapped` 시: VFX X / 관찰 X / 수첩 X / 발언노트 X / 채팅창 안전 fallback만

### 1.2 태그 노출 0건
- `[LLM]` / `[FALLBACK]` / 변형 모두 사용자 UI 영역 0건
- 코드 debug log (`console.log`) OK / UI 노출 영역만 차단

### Minimal touch
- `useActionDispatch.ts` 대형 리팩터 X (태그 노출 영역만)
- 새 큐 / trigger / 컷씬 / intent taxonomy 변경 X

---

## 4. 진행 순서

Phase A (audit + 영역 식별 + 무관/메타 10 sample) → 보고
→ Phase B (intent 강화 + 태그 차단) → 보고
→ Phase C (검증 — 10 unmapped + 10 mapped + UI grep 0건 + check:all/build:pc/tsc) → commit + push + 보고

---

## 5. 산출물 위치

`tmp/qa-codex-freequestion-hygiene-results/`

---

## 6. 절대 회피선

- ScriptedText / caseData / 정책 / pc.css / baseline anchor / feature flag global default X
- LLM 호출 영역 본체 변경 X (Proxy Migration `596d235` 정합)
- VITE_OPENAI_API_KEY 참조 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X
- 새 큐 / trigger / 컷씬 X (P0-F 정합)
- 7 intent taxonomy 변경 X (P0-A 정합)

---

**시작 영역**: 진입 조건 검사 → 정독 → Phase A audit + 영역 식별 → CT-Main 보고 → Phase B·C.
