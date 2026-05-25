# 동적 쟁점 Frame 전환 메커니즘 — 설계 문서

작성: 2026-05-25 · 디자인 단계 (구현은 별도 세션) · 1차 적용 사례: spouse-01 h-d4

## 1. 배경 — 왜 동적 Frame 전환이 필요한가

현재 사건들의 evidence/dossier/dispute는 **정적 misdirection frame**을 가진다:

- spouse-01의 h-d4 영역 (e-8/e-9/dc-8) misdirection = "내연녀 임신 의심" (정적)
- d-1(외도 의심)이 진실(가족 돌봄)로 확정되어도 h-d4 영역 자료들의 misdirection은 그대로 "내연녀 임신"으로 남음
- → 진실 누적 흐름이 자연스럽지 않음

**사용자 통찰** (2026-05-25): d-1이 형/조카 돌봄으로 판명나면 → "내연녀 임신" 의심도 자연스럽게 무너지고 → "그럼 도대체 왜 B가 임산부 관련 자료를?" 의문 → **부부 사이 난임 문제 부각**으로 frame이 동적 전환되어야 한다.

이 메커니즘은 spouse-01 한 사건에 국한되지 않고 **다양한 다단계 진실 구조에 일반 적용 가능**.

## 2. 메커니즘 개요

각 evidence / dossier / dispute 영역에서 "표면 frame"을 **단일 정적 텍스트가 아닌 frame variant 묶음**으로 표현:

```
frameVariants:
  - id: "frame-A"
    activeWhen:
      otherDisputeMaxState: { 'd-1': 'S3' }     # d-1이 외도 frame 유지 (S0~S3)
    surfaceClaim: "내연녀 임신 의심"
    judgeHint: "(외도 frame 기반 hint)"
    discoveryText: "(외도 frame 기반 발견 텍스트)"

  - id: "frame-B"
    activeWhen:
      otherDisputeMinState: { 'd-1': 'S4' }     # d-1이 가족 돌봄 진실 부분 인정 이상
    surfaceClaim: "그럼 도대체 왜? — 부부 사이 다른 사정"
    judgeHint: "(전환 frame hint)"
    discoveryText: "(전환 frame 발견 텍스트)"
    transitionVfx: "frame_shift_pulse"          # frame 전환 시 VFX 트리거
```

런타임이 매 query 시점에 `activeWhen` 조건을 평가해 활성 frame 선택.

## 3. 구현 영역

### 3.1 Schema 확장 (`src/types/coreCase.ts`)

```typescript
export const FrameVariantSchema = z.object({
  id: z.string(),
  activeWhen: z.object({
    otherDisputeMinState?: z.record(z.string(), TruthStageSchema),
    otherDisputeMaxState?: z.record(z.string(), TruthStageSchema),
    otherDisputeTruthAccepted?: z.array(z.string()),   // 해당 dispute가 verdict=truth 확정
    requirePriorCardFired?: z.string(),
    // ... 기타 조건
  }).optional(),                                        // 미설정 = 항상 활성 (fallback)
  surfaceClaim?: LocalizedString,
  judgeHint?: LocalizedString,
  discoveryText?: LocalizedString,
  transitionVfx?: VfxProfileId,
})

// CoreEvidence / DossierCard / Dispute progressionStages 에 추가:
frameVariants?: FrameVariantSchema[]
```

### 3.2 런타임 로직

- 매 evidence/dossier query 시점에 `frameVariants` 평가
- 첫 매칭 variant (First-Fired-Wins, 순서 권위) 채택
- 미매칭 시 기존 surfaceClaim/judgeHint/discoveryText (fallback)
- 활성 variant가 직전 변경되었으면 `transitionVfx` 트리거

선택 로직 위치 후보:
- `src/store/disclosureSlice.ts` 또는 `src/lib/coreCase/frameSelector.ts` 신설
- React selector 패턴 또는 selectorMemo (matchAll → first)

### 3.3 VFX

- `frame_shift_pulse`: dossier 카드/evidence 패널이 짧게 빛나며 텍스트가 swap (fade-cross 0.4s)
- 시스템 메시지 ("새로운 시각으로 보입니다") 짧게 surface
- 기존 [[design_vfx_inventory_pc]] cutscene 큐에 신규 type 추가

### 3.4 ScriptedText variant entries

각 emergence_narrative entry에 frame 조건 메타 추가:

```json
{
  "key": "emerge-e8-via-cascade-judge-mention-v1",
  "frameCondition": { "otherDisputeMaxState": { "d-1": "S3" } },
  "text": { "ko": "(내연녀 임신 frame 기반)", ... }
},
{
  "key": "emerge-e8-via-cascade-judge-mention-v1-after-d1-truth",
  "frameCondition": { "otherDisputeMinState": { "d-1": "S4" } },
  "text": { "ko": "(부부 난임 frame 기반)", ... }
}
```

런타임 발화 시 frameCondition 매칭 + scriptedRefs 다중 후보 선택.

## 4. spouse-01 1차 적용 영역 (본 commit 가벼운 layer)

본 세션에서는 schema 확장 없이 **텍스트 차원의 두 frame 통합 표현**만 적용 (case.ts):

- **e-1** proves 다중 link (d-1 + h-d4) + 교보문고 영수증에 예비 부모 정서 도서 추가 (layer 단서)
- **e-8/e-9 partyContext.a.implication**: 두 frame 모두 명시 (d-1 외도 유지 시 / 진실 확정 후)
- **dc-8 noteText**: frame 전환 맥락 한 줄 추가
- **h-d4 truthDescription**: d-1 확정 후 자연 frame 전환 맥락 명시

런타임 선택 로직은 미구현 → UI는 단일 텍스트만 표시 (현재 시스템 동작 유지). 즉 **데이터 차원의 의도만 기록**한 단계.

## 5. 일반화 — 다른 사건/상황 적용 가능성

| 사건 | 가능한 동적 frame 전환 |
|---|---|
| family-01 | A가 의심하는 유언장 조작이 진실로 판명나면 → 동시에 진행 중인 "공장 양보" 쟁점의 frame이 "부모 편애" → "형제 간 협상의 진정성"으로 전환 |
| friend-01 | 한쪽 거짓이 폭로되면 → 다른 쪽의 모호한 행위가 "악의" → "방어"로 frame 전환 |
| spouse-01 (본 사례) | d-1 외도 frame → 가족 돌봄 진실 → h-d4 misdirection 자동 전환 |

공통 패턴: **단일 dispute의 진실 확정이 다른 dispute의 surface frame을 retro-active로 재구성**.

## 6. 단계별 구현 계획 (제안)

| 단계 | 작업 | 세션 분리 |
|---|---|---|
| 0 (완료) | spouse-01 데이터 차원 적용 (텍스트만) | 본 세션 |
| 1 | Schema 확장 (FrameVariantSchema 추가, optional) | 별도 세션 (시스템 변경) |
| 2 | 런타임 frame selector + selector hook | 별도 세션 |
| 3 | VFX (`frame_shift_pulse` cutscene) | 별도 세션 |
| 4 | ScriptedText variant 메커니즘 + 4언어 sync | Codex 의뢰 (사건별) |
| 5 | spouse-01 frameVariants 본격 데이터 | Cycle 진입 후 |
| 6 | family-01 / friend-01 일반화 적용 | 각 사건 Cycle |

## 7. 참고

- 1차 적용 사례 보고: [docs/design/polish-reality-check-spouse01-20260525/](../polish-reality-check-spouse01-20260525/)
- 권위 정책: [[feedback_new_dispute_evidence_narrative_justification]]
- 관련 cascade trigger: [[design_narrative_cascade_from_card]]
