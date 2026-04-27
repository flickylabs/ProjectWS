# 세션 시작 — AI Reasoning Cutscene (두뇌 풀가동) (P0-F)

ClaudeCode CT-Main에서 의뢰합니다. AI 적용 유료 게임의 사업적 차별점 **대표 연출** prototype 영역입니다.

---

## 1. git pull + 진입 조건 검사

```bash
git pull origin main
git log --oneline -1
git status --short --branch
git diff --quiet && git diff --cached --quiet && echo "tracked clean"
npm run check:all
```

PASS 후 진행. tracked dirty / hard > 0 → 즉시 중단 + CT-Main 보고.

**`src/app/pc.css` modified/staged 발견 시 즉시 CT-Main 보고** (UI 서브 스레드 영역 충돌 가능성).

---

## 2. 필수 정독

1. `tmp/UIVFX-Dev-AIReasoningCutscene-NEXT-START-MESSAGE.md` (진입 메시지)
2. `tmp/REQUEST-UIVFX-Dev-AIReasoningCutscene.md` (**의뢰서 본문 — 비주얼 sequence / 트리거 hook / 회피선**)
3. `docs/information-surface-policy.md` v1.1 §5 (자유심문 분석 노출 + 비주얼/문구/톤)
4. `CLAUDE.md` (한국어 / 내부 용어 X)
5. `tmp/REQUEST-UIVFX-Dev-Hierarchy.md` (P0-E — write scope 합의)
6. `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md` (P0-A — 트리거 hook 인터페이스 합의)

---

## 3. 작업 본질

### Major (사건당 첫 성공만, ~6.0s)
1. 질문 문장 fade-in (1.0s)
2. 4 chip 분리 (1.2s) — 대상 / 의도 / 쟁점 / 증거
3. line draw (1.5s, ResonanceLayer 재활용)
4. aura/glow (0.8s)
5. `심문 경로 확정` (1.0s)
6. fade-out (0.5s) — Skip 가능

### Compact (반복 성공, ~1.4s)
chip slide → line draw → aura

### 노출 문구
- **허용**: 질문 분석 / 쟁점 연결 / 관련 증거 확인 / 심문 경로 확정
- **금지**: intent / classifier / LLM / guard / policy / 누설

### 톤
- SF X / "재판 기록이 빠르게 재구성되는 느낌" / 금색·청색·전기선 / 법정 보드 + 신경망

### 트리거 hook (P0-A 합의)
`triggerAIReasoningCutscene({ isFirstSuccess, questionText, chips: { target, intent, dispute, evidence? } })` — `intent ≠ unmapped` 일 때만 호출.

---

## 4. 진행 순서

Phase A (Major prototype + ResonanceLayer 재활용 + 1 sample) → commit + push + CT-Main 보고 + P0-A 인터페이스 합의
→ Phase B (Major+Compact 정식 + 3 case 검증 + unmapped 검증 + reduced motion) → commit + push + CT-Main 보고

---

## 5. 병렬 영역 / 합의

- P0-E (Hierarchy) — write scope 엄격 분리. **P0-E commit 후** 이 세션이 새 trigger 등록
- P0-A·B (자유심문 MVP/Guard) — 트리거 hook 인터페이스

---

## 6. 산출물 위치

`tmp/qa-uivfx-aireasoningcutscene-results/`

---

## 7. 절대 회피선

- **`src/app/pc.css` touch X** — 신규 CSS는 **`src/styles/aiReasoningCutscene.css` 별도 모듈**
- 내부 용어 노출 X
- truth leak X (chip 텍스트 surface 표현만)
- ScriptedText / caseData / baseline 회귀 X
- 기존 큐 시스템 본체 변경 X (등록만)
- 새 큐 X
- 기존 6 cutscene 본체 touch X (P0-E 영역)
- feature flag global default 변경 X

---

**시작 영역**: 진입 조건 검사부터.
