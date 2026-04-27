# 세션 시작 — spouse-01 Phase 2 Spoiler Cascade Fast Fix (P0 — 출시 차단)

ClaudeCode CT-Main에서 의뢰합니다. 사용자 spot check 발견 P0 영역 5 fix:

1. **새 증거 표시명**: `형 문자 스레드` → `발신자 미상 문자` (회귀 영역 — surfaceName runtime 영역 정합)
2. **chain unlock gating**: 사실 추궁 반복만으로 새 증거 + 새 쟁점 자동 오픈 X
3. **`emergenceHooks.ts` NPC B 진실 발화 조정**: `형` / `형 사정` / `현금으로 전했다` early 단계 금지 (avoidant archetype 정합)
4. **내부 source label UI 노출 제거**: `[SCRIPT]` / `[FALLBACK]` / `[LLM]` 0건
5. **추궁 / 모순 팝업 좌우 여백** (pc.css 단일 소유)

⚠️ Route Simulator / Script Polish 통합 patch 영역보다 **우선**.

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

**`src/app/pc.css` modified/staged 발견 시 즉시 CT-Main 보고** — 본 세션 단일 소유 영역.

---

## 2. 필수 정독

1. `tmp/Spouse-01-Phase2-Spoiler-Cascade-Fast-Fix-NEXT-START-MESSAGE.md` (진입 메시지)
2. `tmp/REQUEST-Codex-Spouse-01-Phase2-Spoiler-Cascade-Fast-Fix.md` (**의뢰서 — 사전 audit / 5 fix / 회피선 / 검증**)
3. `docs/disclosure-policy.md` §4.1 / §3.2·3.3 / §13
4. `docs/information-surface-policy.md` v1.1 §2.6 / §6.3
5. `CLAUDE.md` (게임 핵심 / 한국어 품질 / archetype)
6. `src/data/emergenceHooks.ts` / `src/data/claimPolicies/spouse-01-structure-v2.json`
7. `src/engine/discoveryEngine.ts` / `meterStagingV2.ts` / `gameEventTriggerEngine.ts` / `llmClient.ts`
8. `src/hooks/useActionDispatch.ts` (source label 영역 — minimal touch만)
9. `src/components/pc/*` (추궁 / 모순 팝업 영역)
10. `src/app/pc.css` (단일 소유)

---

## 3. 작업 본질

### 5 fix (사용자 명시)
1. surfaceName runtime 정합 — `발신자 미상 문자` 영역만 / `형 문자 스레드` 0건
2. chain unlock gating — minimal 영역 (대형 리팩터 X)
3. emergenceHooks NPC B 진실 발화 조정 (early → 모호 / S5 → 자유)
4. `[SCRIPT]` / `[FALLBACK]` / `[LLM]` UI 0건
5. 추궁 / 모순 팝업 padding / max-width (pc.css 단일 소유)

---

## 4. 진행 순서

Phase A (audit + 영역 식별) → 보고
→ Phase B (5 fix + screenshot 전후) → 보고
→ Phase C (검증 + commit + push) → 보고

---

## 5. 산출물 위치

`tmp/qa-spouse-01-phase2-spoiler-cascade-results/`

---

## 6. 절대 회피선

### 사용자 명시
- `VITE_OPENAI_API_KEY` 재도입 X
- API proxy 구조 변경 X
- Script Polish 대량 patch 영역과 섞기 X
- Route Simulator 영역과 섞기 X

### CT 영역
- ScriptedText / caseData / 정책 영역 직접 수정 X
- baseline anchor / feature flag global default X
- LLM 호출 영역 본체 변경 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` / `llmDialogueResolver.ts` 대형 리팩터 X (source label minimal만)

### 단일 소유
- **`src/app/pc.css`** — 본 세션 owner / 다른 UI 세션 병렬 touch X

---

**시작 영역**: 진입 조건 검사 → 정독 → Phase A audit → CT-Main 보고 → Phase B·C.
