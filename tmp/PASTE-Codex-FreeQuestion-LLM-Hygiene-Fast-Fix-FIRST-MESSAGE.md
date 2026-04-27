# 세션 시작 — Free Question Hygiene Fast Fix (P0급 — scope 축소 / #1과 병렬)

ClaudeCode CT-Main에서 의뢰합니다 (v2 — scope 축소 영역). 자유 질문 hygiene fast fix — **intent / contextMapper / fallback 품질 / 검증 case** 영역. **source label 제거 영역은 #1**에서 처리.

⚠️ **#1 spouse-01 Phase 2 Spoiler Cascade Fast Fix와 병렬** — write scope 엄격 분리 영역.

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

PASS 후 진행. tracked dirty / hard > 0 / build fail → 즉시 중단 + CT-Main 보고.

**#1 영역 (`pc.css` / `llmClient.ts` source label 영역 / `emergenceHooks.ts` / `discoveryEngine.ts` / `meterStagingV2.ts` / `gameEventTriggerEngine.ts`) staged 또는 modified 발견 시 즉시 중단 + 보고**.

---

## 2. 필수 정독

1. `tmp/FreeQuestion-LLM-Hygiene-Fast-Fix-NEXT-START-MESSAGE.md` (진입 메시지 v2)
2. `tmp/REQUEST-Codex-FreeQuestion-LLM-Hygiene-Fast-Fix.md` (**의뢰서 본문 v2 — 5 허용 / 4 금지 / 회피선**)
3. `docs/information-surface-policy.md` v1.1 §5.1·6.6
4. `docs/disclosure-policy.md` §3.3
5. `CLAUDE.md`
6. `src/engine/freeInterrogation/intentClassifier.ts` / `contextMapper.ts` / `fallback.ts` / `heuristic.ts` / `index.ts`
7. `tmp/REQUEST-Codex-Spouse-01-Phase2-Spoiler-Cascade-Fast-Fix.md` (#1 영역 — 충돌 회피 본질)

---

## 3. 작업 본질 (5 허용 / 4 금지)

### 허용
1. intentClassifier 과매칭 축소
2. meta/off-topic `unmapped` 처리
3. contextMapper 자동 매핑 완화 (unmapped/낮은 confidence → 매핑 X)
4. safe fallback 품질 (P0-B 매트릭스 review — archetype/lieState/자연체/호칭)
5. 자유 질문 검증 케이스 35 sample (10 무관 + 10 메타 + 10 의도 + 5 confidence)

### 금지 (사용자 명시)
- source label 영역 수정 X (`[SCRIPT]` / `[FALLBACK]` / `[LLM]` — #1 영역)
- pc.css touch X (#1 단일 소유)
- emergenceHooks / discovery / meterStaging / gameEventTrigger 수정 X (#1 영역)
- API proxy 구조 수정 X (`596d235` 정합)

---

## 4. 진행 순서

Phase A (audit + 35 sample case) → 보고
→ Phase B (5 fix) → 보고
→ Phase C (검증 + commit + push) → 보고

---

## 5. 산출물 위치

`tmp/qa-codex-freequestion-hygiene-results/`

---

## 6. 절대 회피선

### 사용자 명시 4 금지
- source label / pc.css / emergenceHooks·discovery·gating / API proxy 구조

### CT 영역
- ScriptedText / caseData / 정책 / baseline anchor / feature flag global default X
- LLM 호출 영역 본체 변경 X / VITE_OPENAI_API_KEY 참조 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` / `llmDialogueResolver.ts` 변경 X
- 새 큐 / 새 trigger / 새 컷씬 X / 7 intent taxonomy 변경 X

### #1과 충돌 회피
- write scope = `src/engine/freeInterrogation/*` 만
- #1 영역 변경 영역 stage / modified 발견 시 즉시 중단

---

**시작 영역**: 진입 조건 검사 → 정독 → Phase A audit + 35 sample → CT-Main 보고 → Phase B·C.
