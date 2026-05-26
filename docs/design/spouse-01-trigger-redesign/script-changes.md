# spouse-01 trigger 재편성 적용 — ScriptedText 변경 내역 (다음 thread 안내용)

> 작성일: 2026-05-27
> 본 thread (trigger 구조 재편성) commit HEAD: 본 thread commit 후 갱신
> 다음 thread (ScriptedText 작성) 진입 base.

본 thread 는 **trigger 구조 재편성**만 진행했다. ScriptedText 추가·수정·삭제 + 다국어 sync 는 본 자료 기반으로 별도 thread 에서 진행한다.

---

## 1. 폐기된 trigger candidate 의 scriptedRefs

본 thread 에서 폐기된 candidate 4개의 scriptedRefs 정리:

| 폐기된 candidate | scriptedRefs (cleanup 대상) | 이유 |
|---|---|---|
| `dc3-via-a-interject` (「이준호의 비밀 개인 계좌」) | `emerge-dc3-via-a-interject-v1` / `emerge-dc3-via-a-interject-judge-react-v1` / `emerge-dc3-via-a-interject-a-response-v1` / `emerge-dc3-via-a-interject-judge-decree-v1` | Issue 2 안 A — broad 패턴 (어떤 evidence 든 발동) |
| `e4-via-a-interject` (「발신자 미상 문자」) | `emerge-e4-via-a-interject-v1` / `emerge-e4-via-a-interject-judge-react-v1` / `emerge-e4-via-a-interject-a-response-v1` / `emerge-e4-via-a-interject-judge-decree-v1` | Issue 1 안 B — 사용자 명시 회귀 (「영수증 묶음」 stage 1 부적절 발동) |
| `e4-via-b-interject` (「발신자 미상 문자」) | `emerge-e4-via-b-interject-v1` / `emerge-e4-via-b-interject-a-pursue-v1` / `emerge-e4-via-b-interject-judge-decree-v1` | Issue 1 안 B — contextAction 없는 가장 broad |
| `e5-via-a-interjection` (「개인 계좌 출금 내역」) | `emerge-e5-via-a-interject-v1` / `emerge-e5-via-a-interject-judge-react-v1` / `emerge-e5-via-a-interject-a-response-v1` / `emerge-e5-via-a-interject-b-shock-v1` / `emerge-e5-via-a-interject-a-rebuke-v1` / `emerge-e5-via-a-interject-judge-decree-v1` | Issue 2 안 A — 가장 broad (contextAction 자체 없음) |
| `e9-via-a-interject` (「예비 부모 정서 자가진단」) | `emerge-e9-via-a-interject-v1` / `emerge-e9-via-a-interject-judge-react-v1` / `emerge-e9-via-a-interject-a-response-v1` / `emerge-e9-via-a-interject-judge-decree-v1` | Issue 2 안 A — broad 패턴 (e-8 fired + evidence_present.b 어떤 evidence) |

총 폐기 candidate = **5개** / 폐기 scriptedRefs = **21개**.

ScriptedText 영역 처리 옵션 (다음 thread 결정):
- (A) ScriptedText entries 완전 삭제 (4 lang sync 필요)
- (B) ScriptedText entries 보존하되 trigger schema 에서 참조 X (orphan ref — 향후 다른 candidate 에서 재활용 가능성)

---

## 2. 신설·변경된 trigger candidate 의 scriptedRefs (다음 thread 신규 등록 영역)

본 thread 에서 신설·변경된 4개 candidate 의 scriptedRefs 는 기존 ref 임시 재활용 상태. 다음 thread 에서 신규 ref ID 등록 + schema 변경 동시 진행.

### 2-1. 「출산 준비 도서」(e-10) — 3 candidate (기존 1 → 3)

| candidate | 의도 | 임시 scriptedRefs (재활용) | 다음 thread 신규 ref ID 안 |
|---|---|---|---|
| `e10-via-b-bookangle-interject` (주) | 「영수증 묶음 5장」 책 angle 시점 박지연 끼어들기. type cascade_from_card → npc_interjection 변경 → ScriptedText 발화도 박지연 끼어들기 frame ("내연녀가 임신까지 한 것 같다 + 차 콘솔박스 책 언급") 으로 갱신. | `emerge-e10-via-cascade-*-v1` 4개 (기존) | 기존 ref ID 유지 + 발화 내용만 박지연 끼어들기 frame 갱신 권장 |
| `e10-via-b-dc1-interject` (추가) | 「오피스텔의 사람들」 등장 후 박지연 끼어들기 (외도 강화 단계). | 임시 `emerge-e10-via-cascade-*-v1` 4개 재활용 | 신규 ref ID 예시: `emerge-e10-via-dc1-interject-judge-react-v1` / `*-b-outburst-v1` / `*-a-respond-v1` / `*-judge-decree-v1` |
| `e10-via-judge-auto` (안전망) | 「오피스텔의 사람들」 등장 + 외도 의심 진행 후 5턴 fallback 재판관 자동 언급. | 임시 `emerge-e10-via-cascade-judge-decree-v1` 1개 재활용 | 신규 ref ID 예시: `emerge-e10-via-judge-auto-decree-v1` / `*-b-respond-v1` |

### 2-2. 「예비 부모 정서 자가진단」(e-9) — 1 candidate 신설 (b-submit 폐기)

| candidate | 의도 | 임시 scriptedRefs (재활용) | 다음 thread 신규 ref ID 안 |
|---|---|---|---|
| `e9-via-b-outburst` (신설) | 박지연 감정 폭발 — "당신 그동안 무슨 준비를 하고 있었던 건데? 내연녀가 임신해서 정서적으로 무너졌던 거지?" misdirection 강화 발화. | 임시 `emerge-e9-via-b-submit-*-v1` 3개 재활용 (b-submit 폐기 후 ref 보존) | 신규 ref ID 예시: `emerge-e9-via-b-outburst-v1` / `*-judge-react-v1` / `*-judge-decree-v1` (또는 b-submit ref 명칭만 변경) |

### 2-3. 「시댁 얘기만 나오면 싸움」(dc-2) — 1 candidate 추가 (4 → 5)

| candidate | 의도 | 임시 scriptedRefs (재활용) | 다음 thread 신규 ref ID 안 |
|---|---|---|---|
| `dc2-via-cascade-d2-progression` (신설) | 「이준호의 비밀 개인 계좌」 등장 + 비자금 사용처 S2+ 도달 시 cross-line cascade — "비밀 계좌 추적 중 박지연이 다시 시댁 화제로 격앙". | 임시 `emerge-dc2-via-cascade-*-v1` 3개 (d-1 line 분기) 재활용 | 신규 ref ID 예시: `emerge-dc2-via-cascade-d2-judge-mention-v1` / `*-a-response-v1` / `*-judge-decree-v1` |

---

## 3. e-9 evidence 명칭 변경 동반 ScriptedText 변경 필요 영역

본 thread 에서 case.ts 의 `산전우울증` → `예비 부모 정서` 일괄 변경 (20+ 매치). ScriptedText (src/data/scriptedText/spouse-01.json) 및 다국어 sidecar (.en.json, .ja.json, .zh-CN.json) 영역에도 같은 명칭 변경 sync 필요.

### grep 영역 (다음 thread 정찰 명령)

```
grep -rn "산전우울증" src/data/
```

### 예상 영역
- `src/data/scriptedText/spouse-01.json` — scripted entry 본문 "산전우울증" 표현
- `src/data/cases/generated/spouse-01.json` — generated case body
- `src/i18n/runtimeText.ts` / `runtimeText.generated.ts` — runtime UI text
- `src/data/claimPolicies/spouse-01-game-events.json` — claim policy
- `src/data/claimPolicies/spouse-01-v2-atoms.json` — claim atoms
- `src/data/disclosurePolicy/spouse-01.json` — disclosure policy
- `src/data/disclosurePolicy/spouse-01-cross-check.md` — cross check
- `src/data/scriptedAngles/spouse-01_angle_catalog.json` / `spouse-01_special_scripts.json` — scripted angles
- `src/engine/freeInterrogation/fallback.ts` — fallback ref
- `src/store/slices/combinationLabSlice.ts` / `src/store/useGameStore.ts` — runtime store

### 다국어 sync 영역

EN/JA/ZH-CN 4언어:
- `src/data/cases/generated/spouse-01.en.json` / `.ja.json` / `.zh-CN.json`
- 가능하다면 "산전우울증" 직역 (`prenatal depression` / `産前うつ` / `产前抑郁`) → "예비 부모 정서" 새 표현 (`expectant parent emotional state` / `予定の親情緒` / `预备父母情绪` 등) 변경

---

## 4. e-10 + d-3 narrative trigger 처리 — d-3 cascade 유지

`d3-via-cascade-from-e10` (case.ts line 1878~1892) = e-10 fire 시 d-3 (내연녀 임신 의심) 자동 cascade dual surface. 본 thread 변경 없음 — e-10 의 어느 candidate (3개 모두) 든 fire 시 d-3 cascade 발동.

ScriptedText (`emerge-d3-via-cascade-judge-decree-v1` / `emerge-d3-via-cascade-a-react-v1`) 영역 처리 = 다음 thread 박지연 끼어들기 frame 정합 검토 (현재 cascade dispassionate frame ↔ 박지연 끼어들기 + dual emergence 자연성).

---

## 5. C-3c hook (useActionDispatch.ts line 1158~1204) 유지

본 thread 변경 X. 「영수증 묶음 5장」 stage 3 게이트 강제 hook 그대로. 단 candidate 1 type 이 cascade_from_card → npc_interjection 으로 변경되었으므로 hook 의 `attemptNarrativeForEvidence(e-10)` 호출 시 매치되는 candidate 가 cascade 가 아닌 npc_interjection (b 측) 임을 인지.

hook 동작은 동일:
1. e-10 narrative event 자동 발행 (4 step dialogue)
2. forceUnlockEvidence(e-10)
3. enqueueNewEvidenceCutscene(e-10)
4. d-3 cascade 자동 dual surface

다음 thread ScriptedText 변경 시 hook 영역 호출 결과는 그대로 작동 — schema candidate 의 ref 만 변경하면 hook 결과도 새 발화 frame 사용.

---

## 6. 다음 thread 작업 순서 (권장)

1. **본 자료 정독 + 적용 범위 확정**
2. **신규 ScriptedText ref 등록 (2번 표 참조)** — schema candidate scriptedRefs 동시 변경
3. **폐기 ScriptedText entries 처리 (1번 표 참조)** — 옵션 A (삭제) 또는 옵션 B (orphan 보존) 결정 후 적용
4. **e-9 명칭 변경 동반 sync (3번 영역)** — `산전우울증` → `예비 부모 정서` 일괄 sync (KO 영역 먼저)
5. **수동 검증** — manual 또는 runtime 시점 「출산 준비 도서」 등장 경로 3개 (주 박지연 끼어들기 / 추가 dc-1 cascade / 안전망 fallback) + 「발신자 미상 문자」 「영수증 묶음」 stage 1 부적절 발동 회귀 해결 확인
6. **검증** — tsc + qa:fast + qa:cutscene + qa:lqa (strict)
7. **commit + 다국어 thread 안내**

---

## 7. 다국어 sync thread 작업 순서 (별도)

위 단계 5 KO 변경 commit 후, 별도 thread 에서 EN/JA/ZH-CN sync:
1. e-9 명칭 변경 4언어 sync (`산전우울증` ↔ `예비 부모 정서`)
2. 폐기 scriptedRefs 4언어 entries 정리
3. 신규 scriptedRefs 4언어 entries 등록 (KO base translation)
4. ledger 갱신 (`docs/localization/translation-batch-pending.json`)
