# friend-01 trigger 재편성 적용 — ScriptedText 변경 내역 (다음 thread 안내용)

> 작성일: 2026-05-27
> 본 thread (trigger 구조 재편성) commit HEAD: 본 thread commit 후 갱신
> 다음 thread (ScriptedText 작성) 진입 base.

본 thread 는 **trigger 구조 재편성**만 진행했다. ScriptedText 추가·수정·삭제 + 다국어 sync 는 본 자료 기반으로 별도 thread 에서 진행한다.

---

## 1. 폐기된 trigger candidate 의 scriptedRefs

본 thread 에서 폐기된 candidate 1개의 scriptedRefs 정리:

| 폐기된 candidate | scriptedRefs (cleanup 대상) | 이유 |
|---|---|---|
| `w3-via-npc-b-context` (「오미경」, w-3) | `emerge-w3-via-npc-b-context-v1` / `emerge-w3-via-npc-judge-catch-v1` / `emerge-w3-via-npc-judge-decree-v1` | Issue 3 안 C — broad 패턴 (contextAction 자체 없음 — d-4 S1+ 만 만족 시 어떤 action 이든 발동). cascade + combo + judge-auto 3 candidate 로 충분. |

총 폐기 candidate = **1개** / 폐기 scriptedRefs = **3개**.

ScriptedText 영역 처리 옵션 (다음 thread 결정):
- (A) ScriptedText entries 완전 삭제 (4 lang sync 필요)
- (B) ScriptedText entries 보존하되 trigger schema 에서 참조 X (orphan ref — 향후 다른 candidate 에서 재활용 가능성)

---

## 2. 신설된 trigger candidate 의 scriptedRefs (다음 thread 신규 등록 영역)

본 thread 에서 신설된 2개 candidate 의 scriptedRefs 는 신규 ref ID 임시 등록 상태. 다음 thread 에서 ScriptedText entries 실제 작성 + 다국어 sync.

### 2-1. 「먼저 넘은 선」(dc-2) — `dc2-via-combo-stmt-b-silence` 신설

| 항목 | 값 |
|---|---|
| candidate ID | `dc2-via-combo-stmt-b-silence` |
| type | `combination_result` |
| recipeId | `combine-9` (statement_combine: stmt-b-silence + e-4 → dc-2) |
| preconditions | `disputeLieState: { 'd-2': 'S0+' }` |
| 의도 | B (최수민) 자책 발언 ("참았어야 했다" 류) + 「예비신랑 메시지와 답장」(e-4) 결합 → 「먼저 넘은 선」(dc-2) 재진입. B 자책 frame 으로 예비신랑 선 넘기 강화. |
| 신규 scriptedRefs (4개) | `emerge-dc2-via-combo-stmt-b-silence-judge-query-v1` / `*-b-context-v1` / `*-a-react-v1` / `*-judge-decree-v1` |

### 2-2. 「같은 부탁」(dc-3) — `dc3-via-combo-stmt-b-silence` 신설

| 항목 | 값 |
|---|---|
| candidate ID | `dc3-via-combo-stmt-b-silence` |
| type | `combination_result` |
| recipeId | `combine-10` (statement_combine: stmt-b-silence + e-5 → dc-3) |
| preconditions | `disputeLieState: { 'd-3': 'S1+' }` (combine-10 gate 와 일관) |
| 의도 | B 자책 발언 + 「떠벌림 흔적과 9일간 메시지」(e-5) 결합 → 「같은 부탁」(dc-3) 진입. B 자책 frame 으로 아버지 돈 접근 패턴 진입. |
| 신규 scriptedRefs (4개) | `emerge-dc3-via-combo-stmt-b-silence-judge-query-v1` / `*-b-context-v1` / `*-a-react-v1` / `*-judge-decree-v1` |

총 신설 candidate = **2개** / 신규 scriptedRefs = **8개** (각 4 refs).

ScriptedText 작성 시 [[feedback-judge-dispassionate-action-focused]] 정책 준수 (재판관 어법 — 사실/행위 중심, 감정·가치 판단 회피) + [[design-friend01-truth-disclosure-policy]] 진실 노출 정책 (그룹 1~5 keyword × dispute tier) 준수.

---

## 3. precondition 변경된 trigger candidate

본 thread 에서 변경된 precondition 영역 — ScriptedText 영역은 변경 없음 (기존 ref 유지), 단 등장 조건이 변경되어 fire 패턴이 달라짐. 다음 thread 에서 manual 검증 시 영역 검토 권장.

| candidate | 변경 영역 | Issue |
|---|---|---|
| `e4-via-outburst-b` (e-4) | `requirePriorCardFired: 'e-1'` 추가 | Issue 4 안 B — 「예비신랑 연락 기록」 인지 후만 B 격앙 발동 |
| `e5-via-cascade` (e-5) | priorCard `d-2` → `dc-2` 변경 | Issue 5 안 B — 출처 카드가 쟁점 직접이 아니라 단서 「먼저 넘은 선」로 변경 |
| `w1-via-cascade` (w-1) | `disputeLieState: { 'd-1': 'S2+' }` 추가 | Issue 10 안 B — 증인 호출 일관 게이트 |
| `w2-via-cascade` (w-2 dc-2 영역) | `disputeLieState: { 'd-2': 'S2+' }` 추가 | Issue 10 안 B |
| `w2-via-cascade-dc3` (w-2 dc-3 확장) | `disputeLieState: { 'd-3': 'S0+' }` 추가 | Issue 10 안 B |
| `w3-via-cascade` (w-3) | `disputeLieState: { 'd-4': 'S0+' }` 추가 | Issue 10 안 B |

---

## 4. 재판관 폴백 turnsAfterEligible 차등 변경

Issue 12 안 A — 차등 분류안 적용. ScriptedText 영역 변경 없음 (preconditions.turnsAfterEligible 만 변경).

| entity | 분류 | 현재 turns | 새 turns |
|---|---|---|---|
| 「단톡방 글의 근거」(dc-1) | 핵심 reframe | 5 | **5 유지** |
| 「먼저 넘은 선」(dc-2) | 핵심 reframe | 5 | **5 유지** |
| 「같은 부탁」(dc-3) | 핵심 reframe | 5 | **5 유지** |
| 「손절의 이유」(dc-4) | 핵심 reframe | 5 | **5 유지** |
| 「낙인의 순서」(dc-5) | chain 종점 | 5 | **5 유지** |
| 「과거 손절과 아버지의 사기」(d-4) | chain 후반 hidden | 5 | **5 유지** |
| 「단톡방 매도와 명예훼손」(d-5) | chain 종점 | 5 | **5 유지** |
| 「아버지의 돈 접근 패턴」(d-3) | chain 중간 hidden | 5 | **4 변경** |
| 「과거 송금 기록과 문자」(e-6) | chain 중간 증거 | 5 | **4 변경** |
| 「두 시점 대조표」(e-7) | chain 중간 증거 | 5 | **4 변경** |
| 「예비신랑 메시지와 답장」(e-4) | chain 시작 증거 | 5 | **3 변경** |
| 「떠벌림 흔적과 9일간 메시지」(e-5) | chain 시작 증거 | 5 | **3 변경** |
| 「김세라」(w-1) | 증인 호출 | 5 | **3 변경** |
| 「박준혁」(w-2) | 증인 호출 | 5 | **3 변경** |
| 「오미경」(w-3) | 증인 호출 | 5 | **3 변경** |

---

## 5. Hybrid hook 신설 제안 — 공통 CT thread 영역

Issue 11 안 B 결정 — 「예비신랑 연락 기록」(e-1) 첫 사용 시점 narrative event 영역. **본 thread 변경 X**. 공통 CT thread 에서 검토:

### 안 (참고)
- spouse-01 의 C-2 hook (e-3 stage 2 → e-4 cascade) / C-3c hook (e-1 stage 3 → e-10 cascade) 패턴
- friend-01 영역 예시:
  - `condition`: action.evidenceId === 'e-1' + action.target === 'b' + e-1 latestStage >= 2 (또는 3)
  - `결과`: attemptNarrativeForEvidence(dc-1) 강제 cascade — 「예비신랑 연락 기록」 깊이 탐색 시 「단톡방 글의 근거」(dc-1) 자동 surface
- 영역: useActionDispatch.ts (현재 spouse-01 hook 영역 line 1158~1252)

검토 후 공통 CT thread 가 변경 영역 + 사용자 합의 후 적용. 본 thread 작업 후 별도 진입.

---

## 6. 본 thread 변경 사항 요약

| 영역 | 변경 |
|---|---|
| narrative.ts var | 8영역 변경 (dc2/dc3/e4/e5/w1/w2/w3 + d3/e6/e7) |
| case.ts | 변경 없음 |
| 신설 candidate | 2개 (dc2-via-combo-stmt-b-silence + dc3-via-combo-stmt-b-silence) |
| 폐기 candidate | 1개 (w3-via-npc-b-context) |
| precondition 변경 candidate | 6개 (e4/e5/w1/w2-dc2/w2-dc3/w3) |
| turnsAfterEligible 차등 변경 | 8개 entity (e4/e5/w1/w2/w3 = 3턴, d3/e6/e7 = 4턴) |
| Hybrid hook 신설 | 본 thread 변경 X — 공통 CT thread 영역 (Issue 11) |
| 검증 | tsc clean + qa:fast RELEASE READY (P0=0) |

---

## 7. 다음 thread 작업 순서 (권장)

1. **본 자료 정독 + 적용 범위 확정**
2. **신규 ScriptedText ref 등록 (2번 표 참조)** — 신설 candidate 2개 × 4 refs = 8 entries 신규 (KO base)
3. **폐기 ScriptedText entries 처리 (1번 표 참조)** — 옵션 A (삭제) 또는 옵션 B (orphan 보존) 결정 후 적용
4. **수동 검증** — manual 또는 runtime 시점 변경된 fire 패턴 확인
   - 「예비신랑 메시지와 답장」(e-4) B 격앙 등장 = 「예비신랑 연락 기록」(e-1) 인지 후만
   - 「떠벌림 흔적과 9일간 메시지」(e-5) 이어 등장 = 「먼저 넘은 선」(dc-2) 등장 후 + d-2 S3+
   - 증인 3명 호출 = 단서 + dispute 게이트 동시 만족
   - 재판관 폴백 = 차등 분류 (3턴 / 4턴 / 5턴) 동작
   - 신설 B 자책 + evidence 결합 narrative event 발동 확인
5. **검증** — tsc + qa:fast + qa:cutscene + qa:lqa (strict)
6. **commit + 다국어 thread 안내**

---

## 8. 다국어 sync thread 작업 순서 (별도)

위 단계 2 + 3 KO 변경 commit 후, 별도 thread 에서 EN/JA/ZH-CN sync:
1. 신규 scriptedRefs 4언어 entries 등록 (KO base translation)
2. 폐기 scriptedRefs 4언어 entries 정리 (옵션 A 선택 시)
3. ledger 갱신 (`docs/localization/translation-batch-pending.json`)
