# family-01 trigger 재편성 적용 — ScriptedText 변경 내역 (다음 thread 안내용)

> 작성일: 2026-05-27
> 본 thread (trigger 구조 재편성) commit HEAD: 본 thread commit 후 갱신
> 다음 thread (ScriptedText 작성) 진입 base.

본 thread 는 **trigger 구조 재편성**만 진행했다. ScriptedText 추가·수정·삭제 + 다국어 sync 는 본 자료 기반으로 별도 thread 에서 진행한다.

본 thread 변경 = **단일 file** (`src/data/coreCases/family-01.narrative.ts`) **단일 결정** (Issue 1 — broad 패턴 4 candidate 폐기). 나머지 Issue 9건 모두 현재 유지.

---

## 1. 폐기된 trigger candidate 의 scriptedRefs

본 thread 에서 폐기된 candidate 4개의 scriptedRefs 정리:

| 폐기된 candidate | 한글 의도 | scriptedRefs (cleanup 대상) | 이유 |
|---|---|---|---|
| `dc1-via-a-interject` (「말년의 종이」 단서) | 윤태성(형) 끌어들기 — 유서 절차 단서 처음 surface | `emerge-dc1-via-a-interject-v1` / `emerge-dc1-via-a-interject-judge-react-v1` / `emerge-dc1-via-a-interject-a-response-v1` / `emerge-dc1-via-a-interject-judge-decree-v1` | Issue 1 안 A — contextAction 없는 broad 패턴 (d-1 S1+ 도달만으로 발동) |
| `w1-via-b-interject` (「최복순」 증인) | 윤정후(동생) 끌어들기 — 전 요양보호사 증인 호출 | `emerge-w1-via-b-interject-v1` / `emerge-w1-via-b-interject-judge-react-v1` / `emerge-w1-via-b-interject-judge-summon-v1` | Issue 1 안 A — contextAction + partyPhase 모두 없는 가장 broad (d-1 S2+ 도달만으로 발동) |
| `d2-via-a-interject` (「공증 절차의 개입」 쟁점) | 윤태성(형) 끌어들기 — 공증 절차 개입 의심 surface | `emerge-d2-via-a-interject-v1` / `emerge-d2-via-a-interject-judge-react-v1` / `emerge-d2-via-a-interject-judge-decree-v1` | Issue 1 안 A — contextAction 없는 broad 패턴 (d-1 S2+ 도달만으로 발동) |
| `w2-via-b-interject` (「김영수」 증인) | 윤정후(동생) 끌어들기 — 공증인 증인 호출 | `emerge-w2-via-b-interject-v1` / `emerge-w2-via-b-interject-judge-react-v1` / `emerge-w2-via-b-interject-judge-summon-v1` | Issue 1 안 A — contextAction + partyPhase 모두 없는 가장 broad (d-2 S2+ 도달만으로 발동) |

총 폐기 candidate = **4개** / 폐기 scriptedRefs = **13개**.

ScriptedText 영역 처리 옵션 (다음 thread 결정):
- (A) ScriptedText entries 완전 삭제 (4 lang sync 필요)
- (B) ScriptedText entries 보존하되 trigger schema 에서 참조 X (orphan ref — 향후 다른 candidate 에서 재활용 가능성)

---

## 2. 신설·변경된 trigger candidate (다음 thread 신규 등록 영역)

**없음**. 본 thread 결정 = Issue 1 만 폐기, 나머지 Issue 9건 모두 현재 유지. 신설·변경 candidate 0개.

---

## 3. 명칭 변경 동반 ScriptedText 변경 필요 영역

**없음**. 본 thread 변경 = candidate 폐기만. evidence / dossier / dispute / witness 명칭 변경 없음.

---

## 4. cascade chain 변경 영향

폐기된 4 candidate 는 모두 broad 끌어들기 영역 — cascade chain 자체에는 변경 X.

### 변경 전후 cascade chain 비교 (Cycle 5)

```
[변경 전]
d-1 (initial, narrativeTriggers 0)
  ├─ S2.successUnlocks: ['dc-1']
  ├─ S3.successUnlocks: ['d-2']
dc-1 (4 candidate: combo-1 / a-interject ⚠️ / b-outburst / judge-auto)
  ├─→ w-1 (3 candidate: cascade / b-interject ⚠️ / judge-auto)
  └─→ d-2 (4 candidate: cascade / a-interject ⚠️ / b-outburst / judge-auto)
dc-2 (4 candidate: combo-5 / cascade / b-outburst / judge-auto)
  └─→ w-2 (3 candidate: cascade / b-interject ⚠️ / judge-auto)

[변경 후]
d-1 (initial, narrativeTriggers 0)
  ├─ S2.successUnlocks: ['dc-1']
  ├─ S3.successUnlocks: ['d-2']
dc-1 (3 candidate: combo-1 / b-outburst / judge-auto)
  ├─→ w-1 (2 candidate: cascade / judge-auto)
  └─→ d-2 (3 candidate: cascade / b-outburst / judge-auto)
dc-2 (4 candidate: combo-5 / cascade / b-outburst / judge-auto)
  └─→ w-2 (2 candidate: cascade / judge-auto)
```

자연 cascade chain (priorCard 의존) + combo + outburst (정밀 partyPhase) + judge_auto fallback 만 유지. **broad 끌어들기 영역 4개 제거 → 부적절 발동 위험 차단**.

### 변경 영향 entity (Cycle 5 만 영향, Cycle 6/7 영향 X)

| entity | 한글 명칭 | 변경 전 candidate 수 | 변경 후 candidate 수 |
|---|---|---|---|
| dc-1 | 말년의 종이 | 4 | 3 |
| w-1 | 최복순 | 3 | 2 |
| d-2 | 공증 절차의 개입 | 4 | 3 |
| w-2 | 김영수 | 3 | 2 |
| dc-2 | 수정된 유언장 | 4 | 4 (변경 X) |
| 기타 (Cycle 6/7) | (생략) | — | 변경 X |

---

## 5. useActionDispatch.ts Hybrid hook

본 thread 변경 X. **family-01 영역 Hybrid hook 자체가 없음** (spouse-01 의 C-2 / C-3c hook 같은 강제 stage gate 영역 family-01 에 없음).

`src/engine/narrativeIntegration.ts` 의 generic `FORCE_UNLOCK_DOSSIER_ON_DISPUTE_FIRE: { 'd-3': 'dc-3' }` 매핑 = 공통 engine 영역, 본 thread 변경 X.

---

## 6. 다음 thread 작업 순서 (권장)

1. **본 자료 정독 + 적용 범위 확정** (영역 작음 — 13 ref 정리만)
2. **폐기 ScriptedText entries 처리 (1번 표 참조)** — 옵션 A (삭제) 또는 옵션 B (orphan 보존) 결정 후 적용
3. **수동 검증** — manual 또는 runtime 시점 Cycle 5 entity 발화 흐름 (dc-1 / w-1 / d-2 / w-2) 자연성 확인
4. **검증** — tsc + qa:fast + qa:cutscene + qa:lqa (strict)
5. **commit + 다국어 thread 안내**

본 thread 영역 = trigger schema 변경만 / ScriptedText 영역 = 다음 thread.

---

## 7. 다국어 sync thread 작업 순서 (별도)

위 단계 2 KO 변경 commit 후, 별도 thread 에서 EN/JA/ZH-CN sync:
1. 폐기 scriptedRefs 4언어 entries 정리 (옵션 A 채택 시)
2. ledger 갱신 (`docs/localization/translation-batch-pending.json`)

본 thread 명칭 변경 없음 → 다국어 sync 영역도 폐기 entries 정리만. 영역 매우 작음.

---

## 8. 본 thread 권위 (참고)

- 인벤토리 매트릭스: [docs/design/family-01-trigger-redesign/inventory.md](./inventory.md)
- Issue 매트릭스: [docs/design/family-01-trigger-redesign/issues.md](./issues.md)
- HTML 시각화: [docs/design/family-01-trigger-redesign/redesign-summary.html](./redesign-summary.html)
- 진실 노출 정책: `design-family01-truth-disclosure-policy` (memory)
