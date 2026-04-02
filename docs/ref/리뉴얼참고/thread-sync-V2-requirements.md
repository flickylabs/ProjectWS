# V2 스크립트 전환 — 병렬 스레드 공유 문서 (갱신: 2026-04-02 v2.2)

## 목적

A스레드에서 V2 스크립트 전환 시스템 구현이 **완료**되었습니다.
spouse-01과 family-01에 V2 파일럿 데이터가 적용되어 Phase 3가 스크립트 기반으로 동작합니다.

이 문서는 **C스레드(배치 통합) 등 병렬 스레드에서 작업할 때 알아야 할 것**을 정리합니다.

> **v2.2 주요 변경 (2026-04-02)**
> - Interjection beat: 사건당 4개 → **12개** (infoLevel 4종)
> - DisputeV2에 `disputeAliases` 필드 추가
> - V2 배치 템플릿 v2.2로 교체 완료
> - Misconception 엔진 V2 (trigger 9종 + belief mode 차등)
> - Free Question V2 엔진 추가
> - Phase 6/Result 프롬프트 V2 브릿지 연결

---

## 1. V2 시스템 완성 현황

### 구현 완료된 엔진 (14종)

| 엔진 | 파일 | 역할 |
|------|------|------|
| Beat Selector V2 | `src/engine/beatSelectorV2.ts` | BeatScript V2 3단계 lane 선택 |
| 피로도 엔진 | `src/engine/questionFatigueEngine.ts` | angleTag 기반 로컬+spotlight 피로 |
| NPC 확률 반응 | `src/engine/npcReactionV2.ts` | 순응/저항/역공 확률 레이어 |
| 끼어들기 V2 | `src/engine/interjectionV2.ts` | 패턴 보장 + 지식 차등 끼어들기 |
| 미터 단계화 | `src/engine/meterStagingV2.ts` | 4단계 텍스트 + 사건카드 해금 + readiness 힌트 |
| V2 데이터 로더 | `src/engine/v2DataLoader.ts` | V2 데이터 등록/조회/런타임 상태 |
| Phase3 로그 수집 | `src/engine/phase3LogCollector.ts` | structuredLog 수집 + Phase 6 브릿지 |
| **Misconception V2** | `src/engine/misconceptionEngine.ts` | M0→M4 trigger 9종 + belief mode 차등 |
| **Free Question V2** | `src/engine/freeQuestionV2.ts` | deterministic-first 분류기 + atom 응답 |
| **Phase6/Result 프롬프트** | `src/engine/phase6ResultPromptV2.ts` | Phase3PromptBridgeV2 기반 프롬프트 빌더 |
| LinkEdge 엔진 | `src/engine/linkEdgeEngine.ts` | 쟁점 간 linkEdge 조건 체크 + effect |
| questionEffect 패치 | `src/engine/questionEffectEngine.ts` | externalMultiplier 옵션 추가 |
| blueprintEngine | 기존 유지 | npcReactionV2가 후보정 |

### 타입 변경

- `src/types/beatScriptV2.ts` — `BeatActionFamily`에 `'interjection'` 추가
- `src/types/disputeV2.ts` — **`disputeAliases?: string[]` 필드 추가** (freeQuestion 키워드용)
- `src/types/evidenceV2.ts` — 변경 없음

---

## 2. ⚠️ V2 배치 시 반드시 확인할 변경사항

### 2-1. Interjection beat — 사건당 12개 (구 4개에서 변경)

배치 템플릿: `docs/ref/리뉴얼참고/gpt-batch/00-V2-추가배치-템플릿.md` (v2.2)

필수 분포:
- `emotional_only`: 4개 (allow 2 + block 2)
- `detail_rebuttal`: 4개 (allow 2 + block 2)
- `misbelief_escalation`: 2~4개 (red_herring 있을 때만)
- `trap_signal`: 0~2개 (red_herring 있을 때만)

필수 필드:
- `actionFamily: "interjection"` (일반 beat의 `"question"` 대신)
- `tags: ["interjection", "allow"|"block", "event_lane", INFOLEVEL_TAG]`
- red_herring beat에는 `beliefMode` + `conditions.misconceptionStates` + `conditions.trapStates`

ID 패턴 (일반 beat와 다름):
```
{{CASE}}:beat_v2:{{PARTY}}:{{DISPUTE}}:surface:mid:interjection:{{CHOICE}}:{{INDEX}}
```

antiRepeatGroup:
```
interjection.{{CHOICE}}.{{PARTY}}
```

### 2-2. disputeAliases — dispute마다 4~8개 키워드 필수

각 dispute에 `disputeAliases` 필드를 반드시 작성:

```json
{
  "id": "d-1",
  "name": "비밀 송금",
  "disputeKind": "core_truth",
  "disputeAliases": ["280만원", "비밀 송금", "예약금", "간병비", "최민정", "돌봄센터"],
  ...
}
```

구성 규칙:
- formal noun 1개 (정식 쟁점명)
- colloquial phrase 1~2개 (구어 표현)
- concrete token 1~3개 (이름/금액/장소/증거 약칭)
- red_herring면 trap 단서 1~2개 포함

### 2-3. beats 총량 변경

기존: `40~60개 + interjection 4개`
변경: **`50~74개 + interjection 12개`**

---

## 3. C스레드(배치 통합)에서 알아야 할 것

### 3-1. 기존 V1 배치는 그대로 진행

59사건의 V1 배치(v2-atoms + tells-beats + v3-game-loop)는 기존 파이프라인 그대로 진행.
ID 규칙, 정규화 스크립트, 등록 모듈 패턴 전부 변경 없음.

### 3-2. V2 데이터가 없는 사건은 자동 LLM fallback

`hasV2Data(caseId)`가 false이면 V2 파이프라인을 건너뛰고 기존 LLM 방식으로 동작.
**V2 데이터가 없어도 게임은 정상 동작합니다.**

### 3-3. V1 등록 모듈에 V2 등록을 미리 준비하는 방법 (선택사항)

V1 등록 완료 후, 나중에 V2 데이터가 생성되면 바로 연결할 수 있도록,
등록 모듈에 **조건부 V2 로딩**을 추가하는 것을 권장합니다.

```typescript
import { registerStructureV2, registerBeatsV2 } from '../../engine/v2DataLoader'

// 기존 V1 등록 코드 끝에 추가
try {
  const structureV2 = require('./{{CASE_ID}}-structure-v2.json')
  const beatsV2 = require('./{{CASE_ID}}-beats-v2-full.json')
  registerStructureV2(structureV2 as any)
  registerBeatsV2(beatsV2 as any)
} catch {
  // V2 데이터 없음 — 기존 LLM 경로 사용
}
```

### 3-4. Store 연결은 변경 불필요

`useGameStore.ts`의 `initializeCase`에서 `registerXXXData()` 호출만 있으면 됩니다.
V2 세션 리셋(피로도/끼어들기/misconception/linkEdge/phase3Log)은 `initializeCase`에서 이미 처리됩니다.

### 3-5. V2 데이터 파일 위치

```
src/data/claimPolicies/{{CASE_ID}}/
├── {{CASE_ID}}-v2-atoms.json          ← V1 배치
├── {{CASE_ID}}-tells-beats.json       ← V1 배치
├── {{CASE_ID}}-v3-game-loop-data.json ← V1 배치
├── {{CASE_ID}}-structure-v2.json      ← V2 배치
└── {{CASE_ID}}-beats-v2-full.json     ← V2 배치
```

---

## 4. 파일럿 적용 현황

| 사건 | V1 | V2 Structure | V2 Beats | V2 활성 |
|------|:--:|:-----------:|:--------:|:------:|
| spouse-01 | O | O (49KB) | O (74개, interj 12) | O |
| family-01 | O | O (47KB) | O (68개, interj 12) | O |
| family-02~12 | O | — | — | fallback |
| friend-01~12 | O | — | — | fallback |
| 나머지 59사건 | 대기 | — | — | fallback |

---

## 5. V2 스펙 상세

전체 스펙은 `docs/diagnosis/11-v2-script-transition-spec.md` 참조.

### 핵심 파이프라인 요약

```
질문 → 층/역할 판정 → angleTag → 피로도 → NPC 반응(순응/저항/역공)
→ Beat 선택 → 출력 → 미터 효과 → Misconception 전이 → 끼어들기 평가 → LinkEdge 평가
```

### Feature Flag

```typescript
phase3Flags: {
  useBeatSelectorV2: true,   // V2 beat selector 활성화
  useQuestionFatigueV2: true  // angleTag 피로도 활성화
}
```
