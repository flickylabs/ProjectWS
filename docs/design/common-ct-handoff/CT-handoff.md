# 공통 CT thread 위임 사안 (spouse-01 manual 테스트 thread 발신)

본 자료 = 사건별 thread (spouse-01) 에서 처리 불가한 공통 영역 (UI/VFX/공통 시스템) 사안 모음. 공통 CT thread 가 처리.

진입 base = 공통 CT thread 진입 핸드오프 `session-handoff-20260527-common-ct-pending` (base HEAD 70a114f2).

---

## Issue A — 박지연(원고 A) 제시 버튼 stage 3 활성화

### 현상
「영수증 묶음 5장」 (e-1) 조사 3단계 도달 후 박지연(원고 A)에게 제시하는 버튼이 비활성 상태로 6 turn 시퀀스 (박지연 분기 「내연녀 임신 의심」 등장) 진입 불가.

### 영역
증거 제시 버튼의 활성화 조건 영역 (UI). 사건 데이터 영역 아님 → 공통 CT thread.

### ⚠ 확정 root cause (2026-05-28)
- 실제 제시 모달은 `EvidencePresenter.tsx` 가 아니라 **`PCInteractionPanel.tsx`** ("대상 아님" 라벨 = `pc.interaction.notTarget` 렌더 컴포넌트).
- `PCInteractionPanel.tsx:1018-1022` 의 `aRelevant`/`bRelevant` 가 **`subjectParty` 만 평가**, `presentableTargetsByStage` 게이트 미평가. (line 359 / 392 에도 동일 로직 존재)
- 공통 CT thread 가 `a5d7e91f` 에서 EvidencePresenter.tsx 에만 게이트 로직을 넣고 실제 모달 PCInteractionPanel.tsx 를 누락 → e-1 게이트 등록·derived 반영 후에도 박지연 "대상 아님".

### 남은 작업 (공통 CT thread)
- EvidencePresenter.tsx:111 `isRelevant` 게이트 로직을 PCInteractionPanel.tsx 의 `aRelevant`/`bRelevant`(line 1018-1020, `currentStage` 는 line 1011)에 동일 적용. `getEvidencePresentDisabledReason`/`formatPresentButtonLabel` 는 `relevant` 파라미터 받으므로 추가 변경 불필요.

### 전제 (spouse-01 thread — ✅ 완료)
- e-1 에 `presentableTargetsByStage: { 3: ['both'] }` 등록 + derived json 반영 완료 (generated json `{"3":["both"]}` 확인). PCInteractionPanel 게이트 평가만 추가되면 즉시 동작.

### 기대
e-1 조사 3단계 + 박지연(A) 제시 버튼 활성화 → spouse-01 thread 가 적용한 박지연 6 turn 시퀀스 발동 가능.

---

## Issue B — 「새 확인 쟁점」 라벨

### 현상
새 쟁점 등장 시 표시되는 라벨 영역 (「새 확인 쟁점」) 의 문구/표현 영역.

### 영역
공통 UI 라벨 영역. 모든 사건 공통 → 공통 CT thread.

---

## Issue C — 새 쟁점/증거 추가 VFX (Issue D 에 흡수)

### 현상
새 쟁점/증거 추가 시 VFX 임팩트 영역.

### 처리
**Issue D (새 항목 등장 통일 패널/VFX 정책) 에 superset 으로 흡수.** Issue D 참조.

---

## Issue D — 새 항목 등장 통일 패널/VFX 최상위 필수 규칙 (2026-05-28 사용자 명시)

### 정책 (사용자 명시 권위)

**같은 위상에 있는 새 항목 등장 = 동일한 형태의 패널 + VFX 사용 최상위 필수 규칙.**

- 모든 새로운 **쟁점** 등장 시 동일한 형태의 패널, VFX 사용
- 모든 새로운 **증거** 등장 시 동일한 형태의 패널, VFX 사용
- 모든 새로운 **증인** 등장 시 동일한 형태의 패널, VFX 사용
- 즉, 같은 위상(tier)에 있는 항목은 동일한 형태로 노출

### 적용 범위

| 위상 | 등장 경로 (현재 코드) | 통일 필요 영역 |
|------|----------------------|----------------|
| 쟁점 | unlockCondition 자동 등장 / narrative trigger 발동 / cascade | 새 쟁점 등장 패널 + VFX 통일 |
| 증거 | newlyUnlocked path ([useActionDispatch.ts:1737](src/hooks/useActionDispatch.ts#L1737) enqueueNewEvidenceCutscene) / narrative trigger 발동 | 새 증거 등장 패널 + VFX 통일 |
| 증인 | unlockedByDossier 만족 / narrative trigger 발동 | 새 증인 등장 패널 + VFX 통일 |

### 구체 사안 — spouse-01 「남편 명의 계좌의 목돈 출금」 쟁점 (영역 코드 d-2)

- 「외도 의심」 (d-1) 자백 (S3) 시점에 「남편 명의 계좌의 목돈 출금」 쟁점이 자동 등장
- 현재 narrative wrapper / 통일 패널 / VFX 영역 없음
- unlockCondition.runtimeRule + authoredRule 영역에 trigger 묘사는 있으나 runtime 통일 연출 영역 부재
- **본 정책 위반 사례** — 공통 CT thread 가 통일 패널/VFX 시스템 구현 시 d-2 도 자동 적용 영역

### thread 영역 분담

- 사건별 thread (spouse-01/family-01/friend-01) = 새 쟁점/증거/증인의 narrative trigger 시점 / unlock 조건 / 발화 영역 결정
- **공통 CT thread** = 모든 사건 공통의 패널 컴포넌트 + VFX 시스템 영역 결정 + 구현 + 통일

### 관련 memory

- `design-new-entity-emergence-unified-vfx-panel` (본 정책 권위)
- `feedback-new-dispute-evidence-narrative-justification` (새 쟁점/증거 narrative justification, 보완 관계)

---

## Issue E — 새 쟁점 등장 시 어색한 폴백 발화 제거 (2026-05-28)

### 현상
emergenceHook 데이터가 없는 쟁점이 등장하면, NPC 가 자동으로 폴백 발화를 말합니다:
- `…사실, {쟁점명} 건도 함께 봐주셔야 합니다.` (withName)
- `…사실, 그것만이 아니었습니다.` (generic)

spouse-01 「내연녀 임신 의심」(d-3) 은 emergenceHook 이 없어서 등장 시 **"…사실, 내연녀 임신 의심 건도 함께 봐주셔야 합니다."** 라는 어색한 폴백 발화가 박지연 말풍선으로 떴습니다. 사용자 판단 = 이 자동 폴백 발화 자체가 어색 → 제거.

### 위치
- 발화 생성: [DiscoveryFeedbackWatcher.tsx:571-581](src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx#L571) — emergenceHook 이 null 일 때 `else` 분기가 `fallbackText` 를 `addDialogue`(source: 'fallback')
- 폴백 문구: [discovery.ts:80-81](src/i18n/messages/discovery.ts#L80) `pc.discovery.feedback.emergence.hookFallback.withName` / `.generic`

### 요청 (사용자 결정 = 공통 폴백 발화 전체 제거)
- emergenceHook 이 없는 쟁점 등장 시 **폴백 발화(else 분기)를 추가하지 않음** (모든 사건 공통).
- 쟁점 등장 패널/VFX(`enqueueFeedback` emergence popup + 번개/오라 연출)는 **유지** — 말풍선 폴백 발화만 제거.
- hook 데이터가 있는 쟁점은 기존대로 hook 발화 유지 (`if (hook)` 분기).
- 미사용이 되는 i18n 키(`hookFallback.withName/generic/behaviorHint`) + `runtimeText.ts:3689` 의 폴백 파싱 정규식도 함께 정리 검토.

### 영역 경계
- 폴백 발화 메커니즘 = 공통 컴포넌트(DiscoveryFeedbackWatcher) → 공통 CT thread.
- 참고: spouse-01 측 orphan scriptedText(`emerge-d-3` 2 variant)는 spouse-01 thread 가 이미 제거 완료 (별개 정리).

---

## Issue F — 「모순 발견」 라벨 단순화 (2026-05-28)

### 현상
모순 발견 모달의 두 패널 라벨이 `이전 발언 A` / `현재 발언 B` 로 표시됩니다. 사용자 요청 = `A`/`B` suffix 제거 → `이전 발언` / `현재 발언`.

### 위치 (공통 i18n — 모든 사건 공통)
- [src/i18n/runtimeText.ts:821-822](src/i18n/runtimeText.ts#L821) `'이전 발언 A'` / `'현재 발언 B'` 번역 맵 (en/ja/zh-CN 도 `A`/`B` suffix 동반 제거)
- [src/i18n/messages/layout.ts:236-237](src/i18n/messages/layout.ts#L236) `pc.dialogue.contradiction.previous` / `.current`
- [src/hooks/useActionDispatch.ts:3563-3564](src/hooks/useActionDispatch.ts#L3563) `previousLabel: '이전 발언 A'` / `currentLabel: '현재 발언 B'`
- [src/components/court/DialogueLog.tsx:99,108](src/components/court/DialogueLog.tsx#L99) fallback 라벨
- `src/i18n/runtimeText.generated.ts` 재생성 필요 (5026/7256 라인 키)

### 요청
`A`/`B` 접미사 제거. 4언어 모두 (en `Previous Statement A`→`Previous Statement` 등).

---

## Issue G — 모순 발견 오작동 (무관한 발언 비교, 2026-05-28)

### 현상
spouse-01 manual 테스트: 「출산 준비 도서」 관련 질문에 대한 현재 답변(`아니, 무슨 말을 그렇게 해?` — LLM 생성 무의미 발화)이, 무관한 이전 답변(e-8 주차 영수증/여성 병원 방문 관련 `예, 그 메디컬 센터에 간 것은 맞습니다...`)과 **모순으로 잘못 매칭**되어 「모순 발견」 모달이 떴습니다. 두 발언은 서로 다른 쟁점/주제라 모순이 아닙니다.

### 영역 (공통 엔진 + LLM 품질)
- 모순 검출: [src/engine/contradictionEngine.ts](src/engine/contradictionEngine.ts) — 같은 화자의 이전/현재 발언 모순 1차 필터. **서로 다른 쟁점·증거 맥락의 발언을 비교 대상에서 제외**하는 게이트 강화 필요.
- 근본 원인 일부 = e-8 등 신규 entity 의 scripted 답변 부재 → LLM 즉석 생성 발화 품질 편차. (e-8 답변 scripted 화는 별도 Codex thread 진행 — `docs/design/spouse-01-entity-matrix/codex-brief-e8-dialogue.md` 참조)

### 요청
모순 비교를 동일 쟁점/맥락 내로 한정하거나, 무의미·회피성 단답을 모순 후보에서 배제하는 가드 추가 검토.

---

## Issue H — 쟁점 진실 확정 후 연관 증거 제시 차단 (2026-05-28)

### 현상 (사용자 결정 = 공통 게임 규칙)
어떤 쟁점의 진실이 이미 밝혀진(확정된) 이후, 그 쟁점에만 연관된 증거를 제시하려 하면 심문이 무의미합니다.

### 요청
- 해당 증거가 입증하는 쟁점이 **모두 진실 확정 상태**이면, 증거 제시 시 NPC 심문/발화 없이 **시스템 메시지만** 띄우고 종료:
  - `이 쟁점은 이미 진실이 밝혀져 이 증거로 심문을 하는 것이 무의미합니다.`
  - 별도 스크립트(NPC 발화) 노출 없음.
- 증거가 입증하는 쟁점 중 **하나라도 미확정**이면 기존 동작 유지.

### 영역 (공통 엔진)
- 증거 제시 처리: [src/hooks/useActionDispatch.ts](src/hooks/useActionDispatch.ts) `handleEvidencePresent` 진입부 가드.
- "진실 확정" 판정 기준(쟁점 lieState S5 / collapsed / 판결 등) 은 공통 엔진의 dispute 상태 모델 기준으로 CT thread 가 결정.

---

## 발신 thread 정보

- 발신 = spouse-01 manual 테스트·수정 thread (2026-05-28)
- 발신 thread 영역 = spouse-01 data only (사건별)
- 공통 영역 (UI/VFX/store) 은 본 자료로 공통 CT thread 위임
- spouse-01 매트릭스 자료 = `docs/design/spouse-01-entity-matrix/matrix.md`
