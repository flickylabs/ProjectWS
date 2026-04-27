# REQUEST — UI/VFX Dev: AI Reasoning Cutscene (두뇌 풀가동) (P0-F)

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**우선순위**: P0 (출시 전 — AI 차별점 핵심 연출)
**병렬**: P0-E (VFX hierarchy) — write scope 엄격 분리

---

## 1. 목표

AI 적용 유료 게임의 사업적 차별점을 보여주는 **대표 연출** prototype 구현. 자유심문 입력이 기존 쟁점/심문 타입/증거에 매핑되어 NPC 응답이 만들어지는 순간을 **두뇌 풀가동 / 질문 분석** 컷인으로 시각화.

## 1.1 범위 제한 (사용자 명시 — API Proxy Migration P0 동안 영역)

⚠️ **현재 API key 노출 P0 (API Proxy Migration 영역)가 진행 중이므로 이 의뢰서는 범위를 제한**한다.

### 허용
- UI prototype (Major + Compact 비주얼 sequence)
- cutscene / overlay / visual sample
- 기존 P0-E cooldown / hard cap 규칙 준수 (commit `995e48a`·`773a81a` 정합)
- "두뇌 풀가동" 체감 연출
- **mock / state 기반 preview** (실제 LLM 호출 X / 가상 데이터로 체감 영역)
- `triggerAIReasoningCutscene` hook signature 정의 (실제 연결 X / placeholder)

### 금지
- 실제 OpenAI 호출 추가
- `VITE_OPENAI_API_KEY` 참조
- LLM / API fetch 신규 구현
- API Proxy Migration 영역 수정 (`api/llm/*` / `llmClient.ts` LLM 호출 영역 / 환경 변수)
- secret / env 관련 코드 수정

### 후속 영역 (이 의뢰서 외)
- LLM / API 정합은 **API Proxy Migration commit 이후 별도 연결** (사용자 명시 영역)
- 이 의뢰서에서는 hook signature 정의 + mock 데이터 체감 검증까지만

---

## 2. 진입 조건

- HEAD: `dba045d` (또는 그 이후 main 최신)
- baseline anchor: `baseline-pre-policy-v1` / `v2` 보존
- feature flag: `VITE_DISCLOSURE_GUARD_MODE=off` 유지
- `VITE_FREE_INTERROGATION_MODE` 영역 — P0-A 의뢰서와 정합 (default `off`)
- working tree: tracked clean
- `npm run check:all` PASS / `npm run build` PASS / `npx tsc -b --force` PASS

---

## 3. 분담

| 영역 | 담당 |
|---|---|
| 정책 / 비주얼 방향 / 문구 검수 | CT-Main (`docs/information-surface-policy.md` §5) |
| **이 세션 (UI/VFX Dev — AIReasoningCutscene)** | **두뇌 풀가동 컷인 prototype 구현** |
| 빈도 / cooldown / 번개 hierarchy | UI/VFX Dev (P0-E) — 별도 세션 |
| 자유심문 분석 결과 hook | Codex-Dev A (P0-A) / Codex-Dev B (P0-B) |
| 검증 | Release QA §4.10 VFX 섹션 |

---

## 4. 정책 입력 (read-only)

`docs/information-surface-policy.md` v1.1:

### §5.1 두뇌 풀가동 트리거
- **첫 성공** (사건당 1회): major cutscene — 강한 버전
- **반복 성공**: micro VFX — compact 버전
- **unmapped**: VFX 출력 X

### §5.2 비주얼
- 플레이어 질문 문장이 잠깐 떠오름
- 문장이 조각나며 칩으로 변환: **대상 / 의도 / 쟁점 / 증거**
- 칩들이 사건 보드 / 증거 / 쟁점 카드로 연결 (**기존 ResonanceLayer 활용**)
- 마지막 문구: `심문 경로 확정`

### §5.3 노출 문구

**허용**:
- `질문 분석`
- `쟁점 연결`
- `관련 증거 확인`
- `심문 경로 확정`

**금지** (내부 용어):
- `intent`
- `classifier`
- `LLM`
- `guard`
- `policy`
- `누설`

### §5.4 톤
- SF 아닌 **"재판 기록이 빠르게 재구성되는 느낌"**
- 금색 / 청색 / 전기선 중심
- 법정 보드 + 신경망 느낌

---

## 5. Scope (이 의뢰서 영역)

### 5.1 신규 영역
- `src/components/freeInterrogation/AIReasoningCutscene.tsx` (신규 컴포넌트)
- `src/components/freeInterrogation/AIReasoningCompactVFX.tsx` (반복 성공 micro)
- `src/styles/aiReasoningCutscene.css` (신규 CSS 모듈 — pc.css touch X)
- 기존 `CutsceneOverlay` 확장 (등록 영역만)
- 기존 `ResonanceLayer` 재활용 (line draw / chip-to-card)

### 5.2 비주얼 sequence (Major 버전)

```
1. 질문 문장 fade-in (1.0s) — 화면 중앙
2. 문장이 4 chip으로 분리 (1.2s) — 대상 / 의도 / 쟁점 / 증거
3. chip이 각 UI 위치로 line draw (ResonanceLayer 활용, 1.5s)
   - 대상 chip → NPC 영역 (data-party)
   - 쟁점 chip → 쟁점 카드 (data-dispute-id)
   - 증거 chip → 증거 카드 (data-evidence-id)
4. line draw 완료 시 각 위치 aura/glow (0.8s)
5. 마지막 문구 `심문 경로 확정` (1.0s) — 화면 중앙
6. fade-out (0.5s)
```

총 ~6.0s. **Skip 가능** (사용자 클릭 시 즉시 fade-out).

### 5.3 비주얼 sequence (Compact 버전, 반복 성공)
```
1. chip slide (0.4s) — 화면 측면에서
2. line draw (0.6s) — ResonanceLayer
3. aura (0.4s)
```
총 ~1.4s. Skip X (짧음).

### 5.4 트리거 hook (signature 정의만 / 실제 연결 X)

⚠️ 이 의뢰서 영역에서는 **hook signature 정의 + mock 호출까지만**. 실제 자유심문 영역과의 연결은 API Proxy Migration commit 후 별도 영역.

```ts
import { triggerAIReasoningCutscene } from '@/components/freeInterrogation/AIReasoningCutscene';

triggerAIReasoningCutscene({
  isFirstSuccess: boolean,        // 사건당 첫 회 = major / 이후 = compact
  questionText: string,           // 플레이어 질문 (max 100자)
  chips: {
    target: { label: string, selector: 'data-party=...' },
    intent: { label: string },    // 노출 문구 — 허용 list만
    dispute: { label: string, selector: 'data-dispute-id=...' },
    evidence?: { label: string, selector: 'data-evidence-id=...' },
  },
});
```

이 의뢰서 영역에서는:
- signature 정의 OK
- **mock 데이터로 dev preview 영역에서 직접 호출하여 체감 검증** OK
- 실제 `useActionDispatch.ts` / `llmFreeQuestion.ts` 등 자유심문 흐름과 연결 X (API Proxy Migration 후 별도 영역)
- 향후 합의 영역: `intent ≠ unmapped` 일 때만 호출.

---

## 6. Write Scope (P0-E와 엄격 분리)

### 6.1 이 세션 영역 (write OK)
- `src/components/freeInterrogation/AIReasoningCutscene.tsx` 신규
- `src/components/freeInterrogation/AIReasoningCompactVFX.tsx` 신규
- `src/styles/aiReasoningCutscene.css` 신규 (pc.css 분리)
- `CutsceneOverlay`에 새 cutscene id 등록 (1 line 추가)
- `gameEventTriggerEngine.ts`에 새 trigger 등록 (1~2 line — P0-E commit 후)
- `data-*` attribute 추가 (필요 시 NPC 영역 / 쟁점 카드 등에 — minimal)

### 6.2 절대 touch X
- **`src/app/pc.css`** — UI 서브 스레드 영역 / 신규 CSS는 별도 모듈
- P0-E 영역: 빈도 / cooldown / 번개 사용 / 심문 3종 변주 / 기존 6 cutscene 정합
- ScriptedText / caseData / baseline anchor / `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts`

### 6.3 충돌 회피 영역 (P0-E와 합의)
- 새 cutscene id 등록 — **P0-E commit 우선** → 이 세션이 그 cooldown / hard cap에 정합
- ResonanceLayer API 재활용 — P0-E의 cooldown 정합 후

순서: **P0-E 먼저 commit → 이 세션이 새 trigger 등록**.

---

## 7. 진행 순서

### Phase A — Spike (prototype)
1. AIReasoningCutscene 컴포넌트 prototype (Major 버전)
2. ResonanceLayer 재활용 line draw 검증
3. 1 sample (spouse-01 fact_pursuit 가상 입력) 시연
4. 산출물: `tmp/qa-uivfx-aireasoningcutscene-results/20260427-spike-summary.md`

### Phase B — MVP
1. Major + Compact 두 버전 정식
2. 트리거 hook 정식 (P0-A와 인터페이스 합의)
3. 3 case 활성 sample 검증 (spouse / family / friend)
4. unmapped 시 출력 X 검증
5. cooldown / hard cap 정합 (P0-E 영역)
6. Reduced motion 대응 (CSS `prefers-reduced-motion`)
7. 산출물: `tmp/qa-uivfx-aireasoningcutscene-results/20260427-mvp-summary.md`

---

## 8. 절대 회피선

- **`src/app/pc.css` touch X** (UI 서브 스레드 영역 — 신규 CSS 별도 모듈)
- **실제 OpenAI 호출 / LLM·API fetch 신규 X** (사용자 명시 — API Proxy Migration 후 영역)
- **`VITE_OPENAI_API_KEY` 참조 X / secret·env 코드 수정 X**
- **API Proxy Migration 영역 수정 X** (`api/llm/*` / `llmClient.ts` LLM 호출 영역 / 환경 변수)
- 내부 용어 노출 X (`intent` / `classifier` / `LLM` / `guard` / `policy` / `누설`)
- truth leak X (chip 텍스트 surface 표현만)
- ScriptedText / caseData / baseline 회귀 X
- 기존 큐 시스템 본체 변경 X (등록만)
- 새 큐 X
- 신규 cutscene id 등록 외 기존 6 cutscene 본체 touch X (P0-E 영역)
- feature flag global default 변경 X
- `useActionDispatch.ts` / `llmFreeQuestion.ts` / `llmDialogueResolver.ts` 자유심문 흐름 영역 변경 X (API Proxy 후 영역)

---

## 9. 종료 조건

- [ ] AIReasoningCutscene Major + Compact 두 버전 정식
- [ ] ResonanceLayer 재활용 line draw 동작
- [ ] 트리거 hook 인터페이스 합의 (P0-A)
- [ ] 3 case 각 1 sample (Major) + 3 sample (Compact) 검증
- [ ] unmapped 시 출력 X 검증
- [ ] reduced motion 대응
- [ ] 노출 문구 허용 list만 사용 (내부 용어 0)
- [ ] `npm run check:all` PASS / `npm run build` PASS / `npx tsc -b --force` PASS
- [ ] 산출물: `tmp/qa-uivfx-aireasoningcutscene-results/`

---

## 10. 산출물

```
tmp/qa-uivfx-aireasoningcutscene-results/
├── 20260427-spike-summary.md
├── 20260427-mvp-summary.md
├── major-cutscene-screenshots/         (3 case)
├── compact-vfx-screenshots/
├── unmapped-no-output-verification.md
└── reduced-motion-verification.md
```

---

## 11. 관련 자료

- `docs/information-surface-policy.md` v1.1 §5 (자유심문 분석 노출)
- `memory/design_vfx_inventory_pc.md` (기존 ResonanceLayer / CutsceneOverlay 영역)
- `memory/reference_resonance_selectors.md` (data-* selector)
- 본 세션 진입 메시지: `tmp/UIVFX-Dev-AIReasoningCutscene-NEXT-START-MESSAGE.md`
- 협조 의뢰서: `tmp/REQUEST-UIVFX-Dev-Hierarchy.md` (P0-E) / `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md` (P0-A — 트리거 hook)

---

**상태**: 초안 작성 완료. UI/VFX Dev 검토 + 1차 spike 진입 대기.
