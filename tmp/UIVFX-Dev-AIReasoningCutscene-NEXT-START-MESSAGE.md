# UI/VFX Dev (AIReasoningCutscene) 진입 메시지 — 두뇌 풀가동 컷인 (P0-F)

**세션 영역**: P0-F AI 자유심문 대표 컷인 prototype
**병렬**: P0-E 완료 (`995e48a`·`773a81a`) / API Proxy Migration P0 진행 중 — **이 의뢰서는 범위 제한**
**의뢰서 본문**: `tmp/REQUEST-UIVFX-Dev-AIReasoningCutscene.md` (§1.1 범위 제한 + §8 회피선 영역 정독 필수)

---

## ⚠️ 범위 제한 (사용자 명시 — API Proxy Migration P0 동안)

### 허용
- UI prototype (Major + Compact 비주얼)
- cutscene / overlay / visual sample
- P0-E cooldown / hard cap 정합 (`995e48a`·`773a81a`)
- "두뇌 풀가동" 체감 연출
- mock / state 기반 preview (실제 LLM 호출 X)
- `triggerAIReasoningCutscene` hook signature 정의

### 금지
- 실제 OpenAI 호출 / LLM·API fetch 신규
- `VITE_OPENAI_API_KEY` 참조
- API Proxy Migration 영역 수정 (`api/llm/*` / `llmClient.ts`)
- secret / env 코드 수정
- `useActionDispatch.ts` / `llmFreeQuestion.ts` / `llmDialogueResolver.ts` 자유심문 흐름 변경

LLM/API 정합은 **API Proxy Migration commit 이후 별도 영역**.

---

## 1. git pull + 진입 조건 검사 (먼저 실행)

```bash
git pull origin main
git log --oneline -1
git status --short --branch
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
```

**중단 조건**:
- HEAD 불일치
- tracked file modified/staged 있음
- `npm run check:all` hard > 0
- **`src/app/pc.css` modified/staged 발견 → 반드시 CT-Main 보고 후 진입** (UI 서브 스레드 영역 충돌 가능성)

---

## 2. 필수 정독

| 우선순위 | 파일 |
|---|---|
| P0 | `tmp/REQUEST-UIVFX-Dev-AIReasoningCutscene.md` (의뢰서 본문) |
| P0 | `docs/information-surface-policy.md` v1.1 — 특히 §5 (자유심문 분석 노출 + 비주얼/문구/톤) |
| P0 | `CLAUDE.md` (한국어 품질 / 내부 용어 X) |
| P1 | `memory/design_vfx_inventory_pc.md` (CutsceneOverlay / ResonanceLayer 영역) |
| P1 | `memory/reference_resonance_selectors.md` (`data-*` selector) |
| P1 | `tmp/REQUEST-UIVFX-Dev-Hierarchy.md` (P0-E — write scope 합의) |
| P1 | `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md` (P0-A — 트리거 hook 인터페이스 합의) |

---

## 3. 작업 본질

### 비주얼 (Major — 사건당 첫 성공만)
1. 질문 문장 fade-in (1.0s)
2. 4 chip 분리 (1.2s) — 대상 / 의도 / 쟁점 / 증거
3. line draw (1.5s, ResonanceLayer 재활용)
4. 각 위치 aura/glow (0.8s)
5. `심문 경로 확정` 문구 (1.0s)
6. fade-out (0.5s)

총 ~6.0s. Skip 가능.

### 비주얼 (Compact — 반복 성공)
1. chip slide (0.4s)
2. line draw (0.6s)
3. aura (0.4s)

총 ~1.4s.

### 노출 문구
- **허용**: `질문 분석` / `쟁점 연결` / `관련 증거 확인` / `심문 경로 확정`
- **금지**: `intent` / `classifier` / `LLM` / `guard` / `policy` / `누설` 모든 내부 용어

### 톤
- SF X / **"재판 기록이 빠르게 재구성되는 느낌"**
- 금색 / 청색 / 전기선 중심
- 법정 보드 + 신경망 느낌

### 트리거 hook (P0-A 합의)
```ts
triggerAIReasoningCutscene({
  isFirstSuccess: boolean,
  questionText: string,
  chips: {
    target: { label, selector },
    intent: { label },           // 허용 list만
    dispute: { label, selector },
    evidence?: { label, selector },
  },
});
```

`intent ≠ unmapped` 일 때만 호출.

---

## 4. 진행 순서

Phase A (spike — Major prototype + ResonanceLayer 재활용 line draw + 1 sample) → commit + push + CT-Main 보고 + P0-A 인터페이스 합의
→ Phase B (MVP — Major + Compact 정식 + 트리거 hook + 3 case 검증 + unmapped 검증 + reduced motion) → commit + push + CT-Main 보고

---

## 5. 병렬 영역

- **P0-E** (UI/VFX Dev — Hierarchy) — write scope 엄격 분리
- **P0-A·B** (Codex-Dev A/B) — Free Interrogation MVP/Guard

**P0-E와 합의 영역**:
- 새 cutscene id 등록은 **P0-E commit 후** (cooldown / hard cap 정합 영역)
- ResonanceLayer API 재활용 — P0-E의 cooldown 정합 후

**P0-A와 합의 영역**:
- `triggerAIReasoningCutscene` 인터페이스
- `intent` 영역 chip label 매핑 (허용 list만)

---

## 6. 산출물 위치

```
tmp/qa-uivfx-aireasoningcutscene-results/
├── 20260427-spike-summary.md
├── 20260427-mvp-summary.md
├── major-cutscene-screenshots/
├── compact-vfx-screenshots/
├── unmapped-no-output-verification.md
└── reduced-motion-verification.md
```

---

## 7. 절대 회피선

- **`src/app/pc.css` touch X** (UI 서브 스레드 영역) — **신규 CSS는 `src/styles/aiReasoningCutscene.css` 별도 모듈**
- 내부 용어 노출 X
- truth leak X (chip 텍스트 surface 표현만)
- ScriptedText / caseData / baseline 회귀 X
- 기존 큐 시스템 본체 변경 X (등록만)
- 새 큐 X
- 기존 6 cutscene 본체 touch X (P0-E 영역)
- feature flag global default 변경 X

---

**시작 영역**: 진입 조건 검사부터.
