# 11. V2 스크립트 전환 스펙

## 개요

Phase 3 심문의 NPC 응답을 LLM 실시간 생성에서 **BeatScript V2 선택기** 기반으로 전환하는 시스템.
LLM 비용 제거 + 품질 안정화 + 패턴화 방지를 동시에 달성한다.

V2 데이터가 없는 사건은 기존 LLM 경로로 자동 fallback한다.

---

## 파이프라인 전체 흐름

```
플레이어 질문 입력
│
├─ lie 전이 시도 (기존 lieStateMachine)
├─ affinity 게이팅 (기존 actionAffinity)
│
├─ [V2 분기] hasV2Data(caseId) && useBeatSelectorV2
│   │
│   ├─ 1. 쟁점 층/역할 판정
│   │     getActiveLayer() → surface | motive | core
│   │     getDisputeRole() → core_truth | sub_truth | red_herring | shared_misconception
│   │
│   ├─ 2. angleTag 파생
│   │     deriveAngleTag() → timeline | motive | responsibility | identity | context | legality | emotion
│   │
│   ├─ 3. 피로도 선평가
│   │     evaluateQuestionFatigue() → finalMultiplier + fatigueLevel
│   │
│   ├─ 4. NPC 확률 반응
│   │     deriveActionQuality() → good | normal | bad
│   │     resolveNpcReaction() → comply(100%) | resist(55%) | counter(20%)
│   │     → stance 조정 + effectMultiplier
│   │
│   ├─ 5. Beat 선택 (3단계 lane)
│   │     selectTurnPresentation()
│   │     TransitionBeat > EvidenceHitBeat > GeneralBeat
│   │     eventLane은 main beat와 분리
│   │
│   ├─ 6. 출력
│   │     재판관 질문 + NPC 응답 (beat.line) + behaviorHint
│   │
│   ├─ 7. 후처리
│   │     beat 사용 기록 (cooldown/antiRepeat)
│   │     Phase3 로그 수집 (revealedAtoms, turnStyle)
│   │     피로도 커밋
│   │     미터 효과 (externalMultiplier = 피로도 × 반응 배율)
│   │     Misconception 전이 시도
│   │
│   ├─ 8. 끼어들기 V2
│   │     focus streak 갱신
│   │     evaluateInterjectionOpportunity()
│   │     → pendingInterjectionV2 → GameEventModal → allow/block
│   │
│   └─ 9. LinkEdge 평가
│         evaluateLinkEdges() → flag 부여 / support / unlock / retaliation
│
├─ [LLM 분기] !v2BeatUsed
│   └─ resolveAndApply() (기존 LLM 경로)
│
├─ 이벤트 트리거 평가 (기존 gameEventTriggerEngine)
├─ lieState 전이 시각 피드백
└─ 턴 증가
```

---

## 엔진 목록 (11종)

### 신규 엔진 (8종)

| # | 파일 | 역할 |
|---|------|------|
| 1 | `beatSelectorV2.ts` | BeatScript V2 3단계 lane 선택 (transition > evidence_hit > normal). responseIntent + angleTag 2축 매칭, 가중 랜덤 top-4 |
| 2 | `questionFatigueEngine.ts` | 쟁점×대상×angleTag 로컬 피로 + 같은 대상 연속 spotlight 피로. 1→0.7→0.35→0.1 감쇠 |
| 3 | `npcReactionV2.ts` | 순응/저항/역공 확률. 행동 품질(good/normal/bad) × 16 archetype × 7 lieMotive × disputeKind. counter cap 15% |
| 4 | `interjectionV2.ts` | 패턴 보장 끼어들기. 2턴 연속=35~45%, 3턴=100%. quadrant별 정보 차등. allow/block 리밸런스 |
| 5 | `meterStagingV2.ts` | 미터 4단계화 + 사건카드 조건 해금 + readiness 텍스트 힌트 |
| 6 | `v2DataLoader.ts` | V2 데이터(structure + beats) 등록/조회/런타임 상태(usedBeats/cooldown/flags) 관리 |
| 7 | `phase3LogCollector.ts` | Phase3StructuredLog 실시간 수집. revealedAtoms/disprovedFakeIssues/resolvedLinks/playerStyleTags. Phase 6 브릿지 변환 |
| 8 | `misconceptionEngine.ts` | M0→M4 오해 해소 상태 머신. red_herring 쟁점 전용. M4 도달 시 자동 disproved 기록 |
| 9 | `linkEdgeEngine.ts` | 쟁점 간 linkEdge 조건 검사 + effect 적용 (flag/support/weaken/unlock/retaliation) |

### 기존 엔진 패치 (2종)

| # | 파일 | 변경 |
|---|------|------|
| 10 | `questionEffectEngine.ts` | `externalMultiplier` 옵션 추가. V2 모드에서 legacy 감쇠 우회 |
| 11 | `blueprintEngine.ts` | 변경 없음 — npcReactionV2가 결과를 후보정 |

---

## 타입 정의 (3종)

| 파일 | 핵심 타입 |
|------|----------|
| `beatScriptV2.ts` | `BeatScriptV2`, `ResponseIntent`(6종), `AngleTag`(7종), `FatigueLevel`(4종), `MisconceptionState`(M0~M4), `IssueRole`(4종), `IssueLayer`(3종), `BeliefMode`(4종), `BeatSelectorTelemetry` |
| `disputeV2.ts` | `DisputeV2`, `DisputeDepthLayer`, `DisputeLinkEdge`(4종), `MisconceptionProfile`, `Phase3StructuredLog` |
| `evidenceV2.ts` | `EvidenceNodeV2`, `EvidenceTimingMetadata`, `EvidenceIntent`(4종), `EvidenceRole`(4종), `getEvidenceTimingMultiplier()` |

### 기존 타입 패치

| 파일 | 변경 |
|------|------|
| `renewal.ts` | `BeatType`에 `emotional` 추가 |
| `claimV2.ts` | `dateTimeExact`, `PlaceSlot`, `ThresholdSlot`, `location` 태그, `fallbackPublicClaim` 추가 |

---

## 데이터 스키마

### BeatScript V2 (beat 1개)

```json
{
  "id": "spouse01.a.d1.surface.early.pressure.timeline.01",
  "schemaVersion": "beat_v2",
  "caseId": "spouse-01",
  "party": "a",
  "disputeId": "d-1",
  "beatType": "deny",
  "line": "대사 1~3문장",
  "behaviorHint": "연출 지시",
  "applicableStates": ["S0", "S1"],

  "layer": "surface",
  "issueRole": "core_truth",
  "responseIntent": "pressure_response",
  "angleTag": "timeline",
  "actionFamily": "question",
  "questionTypes": ["fact_pursuit"],

  "conditions": {
    "emotionTiers": ["calm", "agitated"],
    "trustWindowBands": ["closed", "narrow"],
    "fatigueLevels": ["fresh", "wary"],
    "blockedVectors": [],
    "requiresFlags": [],
    "forbidsFlags": ["d1.care_identity_revealed"]
  },

  "truthEnvelope": {
    "allowAtomIds": ["d1.movement_only"],
    "forbidAtomIds": ["d1.recipient_identity_full"]
  },

  "weight": 7,
  "priority": 30,
  "cooldownTurns": 2,
  "maxUsesPerCase": 1,
  "antiRepeatGroup": "a.d1.surface.pressure.timeline",
  "coverageKey": "a.d1.surface.early.pressure.timeline",
  "variantTarget": 6,
  "setFlags": ["d1.surface.timeline_pressed"],
  "tags": ["hot", "number_first"]
}
```

### Structure V2 (사건 1개)

```json
{
  "caseId": "spouse-01",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "disputeKind": "core_truth",
      "depthLayers": [
        { "id": "surface", "label": "...", "summary": "...", "lockedSummary": "...", "unlockCondition": {}, "revealAtomIds": [...], "uiStyle": "card_expand" },
        { "id": "motive", "label": "...", "unlockCondition": { "requireDisputes": [{"id": "d-1", "minState": "S2"}] } },
        { "id": "core", "label": "...", "uiStyle": "relation_core" }
      ],
      "linkEdges": [
        { "id": "link.d1.to.d5.supports", "fromDisputeId": "d-1", "toDisputeId": "d-5", "type": "supports", "when": { "minState": "S2" }, "effect": { "supportBonus": 12, "grantFlag": "..." } }
      ],
      "misconception": null
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "timing": {
        "intent": "expose",
        "role": "establish",
        "bestAtStates": ["S0", "S1"],
        "weakAtStates": ["S4"],
        "preferredAngles": ["timeline"],
        "criticalWindows": [{ "disputeId": "d-1", "state": "S1", "multiplier": 1.45 }]
      }
    }
  ],
  "freeQuestionHooks": [...],
  "phase3LogHints": { "relationCoreDisputes": ["d-1", "d-5"], "playerStyleTagCandidates": [...] }
}
```

### Beat 밀도 규칙

| 노드 유형 | 변형 수 | 기준 |
|-----------|---------|------|
| 핫 (고빈도 초반) | 6~8 | S0~S1에서 사실추궁/동기탐색 |
| 중간 (진행 중반) | 4~5 | S2~S3에서 다양한 질문 |
| 콜드 (희귀/증거) | 2~3 | evidence_hit, rare state |
| TransitionBeat | 1~2 | 전이 순간 |
| Fatigue | 3/쟁점 | 2회차 짜증, 3회차 차단, 고피로 반격 |
| Interjection | 4~12 | allow/block × quadrant/infoLevel |

---

## UI 변경 사항

| 컴포넌트 | 변경 |
|----------|------|
| `QuestionMeterHUD` | meterStagingV2 엔진 기반. 누설: 안정/흔들림/위험/폭발직전. 신뢰: 닫힘/살짝/열림/완전개방. 하드코어 모드(exact)에서 % 표시 |
| `ActionPanel` | 사건카드 조건 해금 (첫 균열/모순2/신뢰40/턴6). 해금 시 토스트 |
| `ForcedVerdictBanner` | readiness 3단계 힌트 (아직 충분하지 않음/진행 중/판결 가능) |
| `GameEventModal` | V2 끼어들기 allow/block 선택 UI |
| `DisputeBoard` | 쟁점 층위 카드 펼침 (surface/motive/core). Misconception 진행바 (M0~M4) |

---

## Feature Flag

```typescript
// useGameStore
phase3Flags: {
  useBeatSelectorV2: boolean  // true: V2 beat selector, false: 기존 LLM
  useQuestionFatigueV2: boolean  // true: angleTag 피로도, false: legacy diminish
}
```

- `useBeatSelectorV2: false` → 모든 사건이 LLM 경로
- `useBeatSelectorV2: true` + V2 데이터 없는 사건 → 자동 LLM fallback

---

## 세션 리셋 (`initializeCase`에서 호출)

```
resetV3State(caseKey)
resetV2State(caseKey)
resetSessionFatigueState()
resetSessionInterjectionTracker()
resetPhase3Log()
resetMisconceptionState()
resetActivatedLinks()
```

---

## 파일럿 적용 현황

| 사건 | V1 | Structure V2 | Beats V2 | V2 파이프라인 |
|------|:--:|:-----------:|:--------:|:----------:|
| spouse-01 | O | O (49KB) | O (66개, mapped) | 활성 |
| family-01 | O | O (47KB) | O (60개) | 활성 |
| 나머지 | O/대기 | — | — | LLM fallback |

---

## 미구현 항목 (GPT 설계 대기)

| 항목 | 상태 | 의존 |
|------|------|------|
| Misconception 전이 규칙 정밀화 | 기본 구현 완료, 세부 조건 GPT 4차 | GPT |
| Free Question 분류기 + 제한 응답 | 미구현 | GPT 4차 |
| Interjection beat 확장 (12개/사건) | 미생성 | GPT 4차 |
| Phase 6/Result 프롬프트 교체 | 설계 완료 | 연결만 남음 |
| 82사건 V2 데이터 | 미생성 | C스레드 배치 완료 후 |
