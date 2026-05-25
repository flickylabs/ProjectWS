# Evidence + Dispute Dual Emergence Cutscene — 설계 + 1차 구현

작성: 2026-05-25 · 본 commit (Phase 1 구현 완료) · 1차 적용 사례: spouse-01 e-10 + d-3

(이전 `dynamic-dispute-frame-shift-20260525` 폴더는 본 폴더로 rename. 디자인 방향이 frame 토글 → entity dual emergence로 정정됨.)

## 1. 배경

사용자 통찰 (2026-05-25):
- 영수증 묶음(e-1) 안에 처음부터 서점 영수증(참고서 + 예비 부모 정서 도서)이 결제 흔적으로 존재
- 특정 단계 도달 시 **그 책 자체가 신규 evidence로 오픈** (e-1에서 분화된 별도 entity)
- **동시에 misdirection 쟁점("내연녀 임신 의심")이 신규 dispute로 오픈**
- 두 오픈 모두 **컷씬에 준하는 강력한 VFX**

기존 시스템에서 evidence emergence와 dispute emergence는 각각 standard/emphasis VFX 정도로 처리되었고, 두 entity를 동시에 등장시키는 메커니즘 + cutscene급 임팩트는 없었다.

## 2. 메커니즘 — 구현된 흐름

### 2.1 데이터 영역 (spouse-01.case.ts)

**신규 e-10 evidence**:
- `id: 'e-10'`, name: "B의 예비 부모 정서 도서 + 본인 필기 흔적"
- `proves: ['d-3', 'h-d4']` — d-3(misdirection) + h-d4(진실) 다중 link
- `requires: ['e-1']` — e-1 영수증 묶음 발견 후 cascade
- `narrativeTriggers: [{ type: 'cascade_from_card', requirePriorCardFired: 'e-1', vfxProfile: 'cutscene_dual_emergence' }]`

**신규 d-3 dispute**:
- `id: 'd-3'`, name: "내연녀 임신 의심"
- `truth: false` (misdirection 쟁점 — 시스템 최초 false 쟁점)
- `correctResponsibility: { a: 80, b: 20 }` (A 단정 frame 책임 우위)
- `requiredEvidence: ['e-10']`
- `unlockCondition: { requireDispute: { id: 'd-1', minState: 'S2' } }`
- `truthStages: { S0, S2, S5 }` (3단계 골격 — Cycle 진입 시 S1/S3/S4 확장)
- `narrativeTriggers: [{ type: 'cascade_from_card', requirePriorCardFired: 'e-10', vfxProfile: 'standard' }]`
  → cutscene은 e-10에서 한 번 발동, d-3는 같은 cutscene 안에서 동시 surface

### 2.2 Schema 영역 (src/types/narrativeTrigger.ts)

```typescript
vfxProfile: z.enum(['standard', 'emphasis', 'cutscene_dual_emergence'])
```

### 2.3 VFX Engine 영역 (src/engine/)

`vfxHierarchyEngine.ts`:
- `CutsceneType`에 `'evidence_dispute_dual_emergence'` 추가
- `MAJOR_CUTSCENES` set 등록 (hard cap 8건/case 적용)

`cutsceneTriggerEngine.ts`:
- `CutsceneEvent.type`에 신규 추가
- `CutsceneEvent.data`에 `evidenceId/evidenceName` 필드 추가 (dual emergence payload)
- `CUTSCENE_DURATION: 4000ms` (레터박스 0.4s + evidence 카드 1.4s + dispute 카드 1.4s + closure 0.8s)
- `shouldTriggerCutscene('evidence_dispute_dual_emergence', ...)` case 추가

### 2.4 Orchestrator 영역 (src/engine/narrativeOrchestrator.ts)

신규 helper:
```typescript
export function maybeBuildDualEmergenceCutscene(
  fireResult: NarrativeTriggerFireResult,
  ctx: { currentTurn, caseId?, evidenceId?, evidenceName?, disputeId?, disputeName?, phase? }
): CutsceneEvent | null
```

- `fireResult.vfxProfile === 'cutscene_dual_emergence'`이면 CutsceneEvent 빌드 + 반환
- 쿨다운 검사는 vfxHierarchyEngine.shouldPlayCutscene 내부

### 2.5 Hooks Wiring (src/hooks/useActionDispatch.ts)

evidence narrative attempt 성공 후:
```typescript
if (attempt) {
  fresh.markNarrativeFired?.(def.id, attempt.triggerId)
  const dualDispute = fresh.caseData?.disputes?.find(d => d.id === def.proves[0])
  const dualCutscene = maybeBuildDualEmergenceCutscene(attempt, { ... })
  if (dualCutscene) triggerCutscene(dualCutscene)
}
```

dual 파트너 dispute = evidence.proves 첫 번째 항목 (e-10 → d-3).

### 2.6 ScriptedText 영역 (src/data/scriptedText/spouse-01.json)

신규 emergence_narrative entries (KO 권위):
- `emerge-e-10` × 4 variants (judge mention / a react / b response / judge decree)
- `emerge-d-3` × 2 variants (judge decree / a react)

EN/JA/ZH-CN sync는 Codex 의뢰 (별도).

## 3. 게임 흐름 (예시)

```
1. A가 영수증 묶음(e-1) 발견 → e-1 emerge → depthStage progress
2. d-1(외도 의심) lieState ≥ S2 도달
3. e-1 original 도달 + 교보문고 결제 흔적 노출 → e-10 cascade trigger 평가
4. e-10 narrative trigger fire (cutscene_dual_emergence)
   → [CUTSCENE 4초] 레터박스 + e-10 카드 + d-3 카드 동시 소극
   → 재판관: "예비 부모 정서 도서 + 본인 필기를 자료로 등재합니다.
              동시에 [내연녀 임신 의심]을 본 사건의 신규 쟁점으로 정식 등록합니다."
   → A 반응: "그럼 도대체 누구를 위해 그런 책을…"
5. d-3 cascade trigger fire (standard VFX, 별도 cutscene 없음)
   → 재판관 decree 추가 + A 추가 반응
6. (후속) d-1 진실 확정 → d-3 lieState 진행 → S5 도달 시 h-d4 unlock
7. h-d4 (비자금 원래 목적 = 난임 치료비) 진실로 수렴
```

## 4. 일반화 — 다른 사건 적용 후보

| 사건 | 가능한 dual emergence |
|---|---|
| spouse-01 | e-10 책 + d-3 내연녀 임신 의심 (본 사례) |
| family-01 | 형의 메모 + 형제 협상 진정성 쟁점 |
| friend-01 | 폭로 자료 + 방어 frame 쟁점 |

공통 패턴:
- evidence가 기존 자료에서 분화 (parent evidence의 깊이 단서가 새 entity로 emerge)
- dispute가 misdirection으로 등장 (truth=false) → 후속에 진실 dispute로 수렴
- cutscene_dual_emergence VFX로 임팩트 보장

## 5. 향후 작업 영역

| Phase | 작업 | 본 commit | 후속 |
|---|---|---|---|
| 1 | spouse-01 data + schema + engine + hooks wiring | ✅ | |
| 2 | ScriptedText 4언어 sync (e-10 + d-3 entries × EN/JA/ZH-CN) | | Codex |
| 3 | h-d4 영역의 dual emergence 후속 frame 전환 (d-1 진실 확정 시) | | Cycle |
| 4 | cutscene 화면 컴포넌트 visual polish (현재는 dispute_emergence 스타일 fallback 가능성) | | UI 세션 |
| 5 | family-01 / friend-01 일반화 적용 | | 각 Cycle |
| 6 | truth-leak matrix 외국어 sync (d-3 forbiddenKeywords 4언어) | | Codex |

## 6. 검증 결과 (본 commit 시점)

- tsc `--noEmit -p tsconfig.app.json`: (commit 시점 결과 — 본문에서 갱신)
- qa:fast: (commit 시점 결과)
- detect-truth-leak --strict: (commit 시점 결과)

## 7. 참고 메모리

- 권위: [[feedback_new_dispute_evidence_narrative_justification]]
- cascade trigger: [[design_narrative_cascade_from_card]]
- VFX 인벤토리: [[design_vfx_inventory_pc]]
- 1차 적용 사례 보고: [docs/design/polish-reality-check-spouse01-20260525/](../polish-reality-check-spouse01-20260525/)
