# 공통 CT thread 진입 메시지 (붙여넣기용)

> 새 공통 CT thread 를 열 때 **첫 메시지로 이 블록 전체를 붙여넣어** 사용. 상세 근거는 같은 폴더의 `CT-handoff.md` 참조.

---

게임 전체 공통 CT thread 진입. 사건 무관 영역 (모듈/공통 UI/engine/store/schema/build/공통 정책) 전용. 사건별 (spouse-01/family-01/friend-01) data 요청은 해당 사건 thread 안내 + 거절.

## 진입 절차

1. `git pull --ff-only` + `git log --oneline -5` + `git status` (HEAD 확인 — 병렬 thread commit 으로 이동 가능)
2. 메모리 정독:
   - `session-handoff-20260527-common-ct-pending` (본 thread 진입 base + 영역 정의)
   - `session-handoff-20260527-parallel-trigger-redesign-policy` (4 thread 병렬 운영 정책)
3. 본 메시지 + 같은 폴더 `CT-handoff.md` (상세 근거) 정독
4. 우선순위 1순위부터 진행

## 직전 공통 CT thread 완료분 (base)

- commit `a5d7e91f` — `feat(common): 증거 stage 제시 게이트 + 쟁점 safeName + 새 증거 VFX`. schema 2종 (`presentableTargetsByStage` / `Dispute.safeName`).
- 후속 commit — **신규 항목 등장 popup 레이어 통일 + priority 정렬 큐** (DOM overlay 폐기, 증거 overlay 롤백). 2순위 항목 참조.

아래 우선순위는 그 위에서의 **후속 검증 + 미완 영역** 임.

---

## 1순위 — 박지연(원고 A) 제시 버튼 활성화 (e-1 stage 3 박지연 분기 발동 전제)

**목표**: 「영수증 묶음 5장」(증거 e-1) 조사 3단계 도달 시 **원고 박지연(A)** 제시 버튼 활성화 → spouse-01 thread 가 적용한 박지연 분기 6 turn 시퀀스(「내연녀 임신 의심」 쟁점 + 「출산 준비 도서」 증거 동시 등장) 발동.

**완료된 공통 인프라** (`a5d7e91f`):
- `EvidenceNode.presentableTargetsByStage?: Record<number, ('a'|'b'|'both')[]>` schema 신설 ([src/types/case.ts](../../../src/types/case.ts), [src/types/coreCase.ts](../../../src/types/coreCase.ts))
- [EvidencePresenter.tsx:109](../../../src/components/actions/EvidencePresenter.tsx#L109) isRelevant 가 stage gate 1순위 평가 (`investigatedActions.length` 기준 최고 게이트 적용), subjectParty fallback 유지
- derive script 통과 ([scripts/build-core-case/derive/legacyCaseJson.mjs](../../../scripts/build-core-case/derive/legacyCaseJson.mjs))

**남은 작업 (공통 CT thread)**:
- e-1 게이트 등록 후 **end-to-end manual 검증** — stage 3 도달 시 박지연 버튼 실제 활성화 + 박지연 분기 발동까지 확인. presenter logic 보강 필요 시 처리.

**전제 (spouse-01 thread 영역, 공통 CT 영역 아님)**:
- e-1 에 `presentableTargetsByStage: { 3: ['both'] }` (또는 `{ 3: ['a','b'] }`) 등록 = **spouse-01 thread**. 이게 등록되어야 stage 3 도달 시 원고(A) 버튼 활성화됨. 공통 thread 는 이 데이터 등록을 하지 않음 → spouse-01 thread 안내.

---

## 2순위 — 새 항목 등장 통일 패널/VFX (최상위 필수 규칙)

**정책 (사용자 명시 2026-05-28, 권위)**: 같은 위상(tier)의 새 항목 등장 = **동일한 형태의 패널 + VFX**. 동시 등장 시 우선순위 **쟁점 > 증거 > 증인**.
- 모든 새 **쟁점** 등장 → 동일 패널/VFX
- 모든 새 **증거** 등장 → 동일 패널/VFX
- 모든 새 **증인** 등장 → 동일 패널/VFX

**완료된 공통 인프라** (전체 틀 재정비 commit):
- **레이어 통일** — 신규 항목 등장 표시는 **popup 레이어 (`EventFeedbackCard`) 단일화**로 결정. 중복이던 DOM overlay 레이어 폐기:
  - 새 증거 overlay (직전 `a5d7e91f` Issue C) **전체 롤백** — `evidence_unlock` cutscene / `handleEvidenceDiscovery` / `v4Effects.evidenceDiscovered` / `.v4-evidence-card-overlay` CSS / 4 unlock 호출부 제거. 증거 등장은 `enqueueNewEvidenceCutscene` → `evidence_result` popup 으로 단일화.
  - 새 쟁점 overlay (`handleDisputeDiscovery` 의 `.v4-dispute-card-overlay` DOM 생성) 폐기 — 사운드 + UI 갱신 이벤트만 유지. 쟁점 등장은 `emergence` popup(breakthrough court beat)으로 단일화. (`v4:dispute-discovered`/`v4:evidence-discovered`/`v4:witness-unlock` 커스텀 이벤트는 구독자 없는 dead 였음)
- **우선순위 정렬 큐** — `EventFeedbackItem.priority` 필드 + `enqueueFeedback` priority desc 정렬 삽입 (stable, active 선점 X). 부여: 쟁점 `emergence`=3 / 증거 `evidence_result`=2 / 증인 `witness_choice`=1.

**남은 작업 (공통 CT thread)**:
- **증인(witness) 신규 등장 전용 카드** — 현재 증인 신규 등장은 combination 성공 카드(`PCRightPanel` "새 증인 소환 가능")로만 표현. `witness_choice` popup 은 소환 후 주제 선택이지 등장 알림이 아님. 조합 결과 영역과의 통합 설계 후 등장 카드 신설 필요 (priority 1).
- **active 선점 검토** — 현재 priority 정렬은 큐 내부만 적용, 이미 표시 중인 active 는 선점하지 않음. 같은 tick 동시 등장 시 enqueue 순서에 따라 우선순위 역전 가능. 완전 우선순위 보장이 필요하면 active 막 떴을 때 선점 정책 추가.
- **spouse-01 「남편 명의 계좌의 목돈 출금」 쟁점(d-2) 검증** — 「외도 의심」(d-1) 자백 후 자동 등장 시 `emergence` popup 실제 발동 확인 (이전엔 조용히 등장하던 위반 사례).

**영역 경계**: 패널/VFX 시스템 = 공통 CT / 등장 시점·조건·발화 = 사건별 thread.

---

## 3순위 — 「새 확인 쟁점」 라벨

**완료된 공통 인프라** (`a5d7e91f`):
- `Dispute.safeName?: string` schema 신설 (truth-safe 표면 라벨).
- [safeEmergenceCopy.ts:62](../../../src/data/safeEmergenceCopy.ts#L62) `void fallback` 제거 → fallback 활성화.
- 우선순위: `dispute.safeName` → `SAFE_EMERGENCE_TITLES` map → `dispute.name` → disputeId. 즉 **미등록 dispute 도 더 이상 generic "새 확인 쟁점" 이 아니라 실제 dispute 이름 표시** ([DiscoveryFeedbackWatcher.tsx](../../../src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx), [useDiscoveryIntegration.ts](../../../src/hooks/useDiscoveryIntegration.ts)).

**남은 작업 (공통 CT thread)**:
- 미등록 dispute 의 fallback(`dispute.name`)이 truth-safe 한지 사건별 검증 — name 자체가 진실 스포일러인 dispute 가 자백 전 노출되지 않도록 확인. 위험 dispute 발견 시 해당 사건 thread 에 `safeName` 등록 안내.

**영역 경계**: `safeName` 등록 = 사건별 thread / fallback logic = 공통 CT.

---

## 검증 명령 (변경 후 필수)

```
node node_modules/typescript/bin/tsc --noEmit
node scripts/qa-fast.cjs
```
- `qa:fast` RELEASE READY + static/route/combined **P0=0** 확인.
- 공통 영역 변경은 3 사건 cross-case 영향 → 검증 시 spouse-01/family-01/friend-01 모두 P0=0 확인.

## commit / push

- 본 thread 영역 file 만 **명시적 git add** (다른 사건 thread 작업분과 분리). `git add -A` 금지.
- commit 후 push 결정은 사용자. 병렬 thread 가 pull/rebase + 검증 재실행.
