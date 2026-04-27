# 세션 시작 — Limited Free Interrogation MVP (P0-A)

ClaudeCode CT-Main에서 의뢰합니다. 출시 전 AI 차별점 핵심 기능인 **자유심문 MVP** 구현 영역입니다.

---

## 1. git pull + 진입 조건 검사 (먼저 실행)

```bash
git pull origin main
git log --oneline -1
git status --short
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
```

모두 PASS 후 진행. 다음 어느 하나라도 fail → 즉시 중단 + CT-Main 보고:
- tracked file modified/staged 있음 (untracked 무시 — 자기 영역 결과 파일 정상)
- `npm run check:all` hard issues > 0

---

## 2. 필수 정독 (순서대로)

1. `tmp/CODEX-DevA-NEXT-START-MESSAGE.md` (이 세션 진입 메시지 — 작업 순서·산출물·종료 조건)
2. `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md` (**의뢰서 본문 — intent taxonomy 7종 / 실패 기준 7종 / scope / 종료 조건**)
3. `CLAUDE.md` (게임 핵심 원칙 + 한국어 품질 규칙)
4. `docs/disclosure-policy.md` (재활용 정책)
5. `src/engine/disclosureGuard.ts` / `src/engine/llmDialogueResolver.ts` / `src/engine/blueprintPromptBuilderV2.ts` (재활용 영역)

---

## 3. 작업 본질

- **UI**: 자유 질문 입력 박스 (interrogation 단계, max 100자)
- **Intent classifier**: 7종 (rule-based 1차 + LLM-aided 2차)
- **Context mapper**: caseId × target × disputeId × interrogationType × evidence
- **Pipeline 재활용**: 기존 LLM 호출 영역 그대로
- **Fallback hook**: P0-B와 인터페이스 합의 (`freeInterrogationFallback(text, ctx) → {action: 'pass'|'fallback', text}`)
- **Feature flag**: `VITE_FREE_INTERROGATION_MODE=off|preview|on` default `off`

---

## 4. 진행 순서

Phase A (spike — spouse-01 5 sample) → commit + push + CT-Main 보고
→ Phase B (MVP — 35 sample 검증, 7 intent × 5) → commit + push + CT-Main 보고

---

## 5. 병렬 영역

- **P0-B** (Codex-Dev B, 자유심문 안전장치) — `freeInterrogationFallback` hook 인터페이스 합의 필요
- **P0-C** (Release QA) — 별개 트랙

---

## 6. 산출물 위치

```
tmp/qa-codex-dev-a-freeinterrogation-results/
├── 20260427-spike-summary.md         (Phase A)
├── 20260427-mvp-summary.md           (Phase B)
├── intent-classifier-samples.json    (35건)
├── api-failure-simulation.log
└── screenshots/                      (preview mode UI)
```

---

## 7. 절대 회피선

- ScriptedText / caseData / pc.css 직접 수정 X
- baseline anchor (v1·v2) 회귀 X
- `VITE_DISCLOSURE_GUARD_MODE` global default 변경 X (`off` 유지)
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X
- 무제한 자유심문 X (intent 매핑 외 → `unmapped` → fallback)
- 정책 (`docs/disclosure-policy.md`) 자동 변경 X

---

**시작 영역**: 위 진입 조건 검사부터.
