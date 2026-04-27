# REQUEST — Codex-Dev A: Limited Free Interrogation MVP (P0-A)

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**우선순위**: P0 (출시 전 최우선)
**병렬**: P0-B (자유심문 안전장치) / P0-C (Release QA)

---

## 1. 목표

플레이어가 직접 질문을 입력할 수 있는 **체감상 자유 / 내부 통제되는 제한형 자유심문 MVP**를 구현한다.

> **정의**: "AI 적용 유료 게임 변별력 확보". 무제한 자유심문 X / 기존 쟁점·심문 타입·대상·증거 매핑 안에서만 동작.

---

## 2. 진입 조건

- HEAD: `c6ec522`
- baseline anchor: `baseline-pre-policy-v1` (a10b801) / `baseline-pre-policy-v2` (acf5d27)
- feature flag: `VITE_DISCLOSURE_GUARD_MODE=off` 유지
- working tree: tracked clean (untracked OK)
- `npm run check:all` PASS (hard 0 / warnings 157 baseline-known)
- `npm run build` PASS / `npx tsc -b --force` PASS

---

## 3. 분담

| 영역 | 담당 |
|---|---|
| Intent taxonomy / 실패 기준 / 정책 검수 | CT-Main |
| **이 세션 (Codex-Dev A)** | **자유심문 UI / intent classifier / 매핑 엔진 / LLM pipeline 재사용 / fallback hook** |
| guard / fallback / API 실패 처리 | Codex-Dev B (P0-B) |
| Release readiness QA | Release QA 세션 (P0-C) |
| 최종 판단 | 사용자 |

---

## 4. Intent Taxonomy (CT 정의)

자유심문 입력은 7종 intent로 분류한다.

| ID | intent | 설명 | sample |
|---|---|---|---|
| `fact_pursuit` | 사실 추궁 | 특정 사실·시점·장소 확인 | "그날 정말 거기 갔습니까?" |
| `motive_search` | 동기 탐색 | 왜·이유·동기 | "왜 그렇게 했어?" |
| `empathy_approach` | 감정 접근 | 공감·위로·감정 표현 | "힘드셨겠네요" |
| `evidence_query` | 증거 관련 | 특정 증거에 대한 질문 | "이 영수증 본 적 있어?" |
| `relation_query` | 관계·호칭 | 인물·관계·호칭 | "그 사람과 어떻게 알아?" |
| `pre_verdict_summary` | 판결 전 정리 | 정리·요약 요청 | "정리하자면" |
| `unmapped` | 매핑 불가 | 게임과 무관·잡담·이상 입력 | "오늘 날씨 어때?" |

### 4.1 intent classifier 전략

권장:
- **1차**: rule-based (키워드 / 정규식 / heuristic)
- **2차**: 1차 매핑 실패 시 LLM 분류 (gpt-4o-mini, low temperature)
- **3차**: 둘 다 실패 시 `unmapped`

분류 입력:
- 사용자 자유 텍스트 (max 100자, trim)
- 현재 caseId / phase / target / lieState / unlocked evidence list / dispute context

분류 출력:
```ts
type FreeInterrogationIntent = {
  intent: 'fact_pursuit' | 'motive_search' | 'empathy_approach' |
          'evidence_query' | 'relation_query' | 'pre_verdict_summary' | 'unmapped';
  confidence: number; // 0~1
  mapped: {
    target: 'a' | 'b' | null;
    disputeId: string | null;
    interrogationType: 'fact_pursuit' | 'motive_search' | 'empathy_approach' | null;
    evidenceRef: string | null;
  };
  raw: string;
};
```

---

## 5. Scope (이 의뢰서 영역)

### 5.1 신규 영역
- `src/engine/freeInterrogation/intentClassifier.ts` — rule + LLM 분류
- `src/engine/freeInterrogation/contextMapper.ts` — caseId × target × disputeId × interrogationType × evidence 매핑
- `src/engine/freeInterrogation/index.ts` — 진입점
- `src/types/freeInterrogation.ts` — 타입 정의
- `src/components/freeInterrogation/FreeQuestionInput.tsx` — UI (interrogation 단계에서만 노출)
- feature flag: `VITE_FREE_INTERROGATION_MODE=off|preview|on` (default `off`)

### 5.2 재활용 영역
- 기존 `blueprintPromptBuilderV2.ts` / `atomSelectionEngine.ts` / `llmDialogueResolver.ts` pipeline 호출
- 기존 `disclosureGuard.ts` post-hook 그대로 통과 (P0-B에서 자유심문 전용 gate 추가 예정)

### 5.3 fallback hook
P0-B와 협조. 자유심문 LLM 응답이 guard 또는 휴리스틱에 걸리면 다음 hook 호출:
```ts
import { freeInterrogationFallback } from '@/engine/freeInterrogation/fallback';
// P0-B에서 구현. 본 의뢰서에서는 hook 자리만 남기고 P0-B와 인터페이스 합의.
```

---

## 6. 절대 회피선

- ScriptedText / caseData working tree 직접 수정 X
- baseline anchor (v1·v2) 회귀 X
- feature flag global default 변경 X (`VITE_DISCLOSURE_GUARD_MODE=off` 유지)
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X
- pc.css touch X (UI 서브 스레드 영역)
- 정책 (`docs/disclosure-policy.md`) 자동 변경 X
- 무제한 자유심문 X (intent 매핑 외 → `unmapped` → fallback)

---

## 7. 실패 기준 (CT 정의 — Codex 검증 필수)

각 항목 0건이 아니면 P0 회귀.

| # | 실패 패턴 | 검증 방법 |
|---|---|---|
| 1 | 응답 없음 / `...` / 빈 응답 | sample 7 intent × 5회 = 35회 |
| 2 | 너무 일반적인 fallback ("네, 그렇습니다" 류) | sample 검토 + 캐릭터 voice 정합 |
| 3 | intent 불일치 (사실 추궁인데 동기 답변) | sample 검토 |
| 4 | 캐릭터 무관 (다른 NPC tone / 다른 사건) | archetype 정합 검사 |
| 5 | S0~S2 진실 누설 (disclosure guard 위반) | 기존 guard pass 0건 확인 |
| 6 | 존칭·호칭·말투 붕괴 (재판관에게 반말 / 호칭 wrong) | enforceHonorifics 후처리 |
| 7 | 자유심문 실패 시 게임 정지 | API 실패 시 fallback hook 정상 동작 |

---

## 8. 종료 조건

- [ ] feature flag `VITE_FREE_INTERROGATION_MODE=preview`로 spouse-01 / family-01 / friend-01 각 5 sample 자유 질문 → 7 intent 각 1건 이상 처리 PASS
- [ ] 실패 기준 7종 각 0건
- [ ] API 실패 시뮬 (timeout / network drop / 빈 응답) → 게임 정지 X
- [ ] feature flag default `off` 시 자유심문 UI 비노출
- [ ] `npm run check:all` PASS (hard 0)
- [ ] `npm run build` PASS
- [ ] `npx tsc -b --force` PASS
- [ ] 산출물: `tmp/qa-codex-dev-a-freeinterrogation-results/` 영역 + summary.md

---

## 9. 산출물

- `tmp/qa-codex-dev-a-freeinterrogation-results/20260427-spike-summary.md` (1차 spike)
- `tmp/qa-codex-dev-a-freeinterrogation-results/20260427-mvp-summary.md` (MVP 완료)
- intent classifier sample 35건 결과 JSON
- API 실패 시뮬 결과
- screenshot (preview mode UI)

---

## 10. 관련 자료

- `CLAUDE.md` — 게임 핵심 원칙 "진실은 플레이어가 직접 밝혀낸다"
- `docs/disclosure-policy.md` — disclosure guard 정책 (재활용 영역)
- `src/engine/disclosureGuard.ts` — Tier 3 guard MVP (재활용)
- `src/engine/llmDialogueResolver.ts` — LLM pipeline (재활용)
- `src/engine/blueprintPromptBuilderV2.ts` — 프롬프트 조립 (재활용)
- 본 세션 진입 메시지: `tmp/CODEX-DevA-NEXT-START-MESSAGE.md`

---

**상태**: 초안 작성 완료. Codex-Dev A 검토 + 1차 spike 진입 대기.
