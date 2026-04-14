# CT → Thread Q (Codex): V5 3사건 구조·로직 검증

> 발신: CT (Control Tower)
> 수신: Thread Q (Codex QA)
> 일시: 2026-04-14
> 커밋: c193f03
> 브랜치: codex/ui-handoff-freeze-20260411

---

## 역할 분담

- **Thread Q (이 문서)**: 구조 정합성, 데이터 참조 무결성, 코드 로직 검증 — **논리에 집중**
- **Thread QW (별도)**: 한국어 품질, 대사 자연스러움, UX 텍스트 — **표현에 집중**

---

## 반복 실행 계획 (20라운드)

이 검증은 **자동 반복(loop)** 으로 실행됩니다. 각 라운드에서 발견한 문제를 직접 수정하고, 다음 라운드에서 수정 결과를 재검증합니다.

### Phase A: 데이터 무결성 전수 (R1~R5)

| 라운드 | 초점 |
|--------|------|
| R1 | 3사건 dispute/evidence/witness ID 참조 무결성 — 스크립트 작성 + 실행 |
| R2 | 3사건 ScriptedText 키 매칭 — 런타임 키 생성 로직 추적 + 매칭률 검사 |
| R3 | 3사건 증인 다층 증언 구조 (2-1~2-10) — 자동 검증 스크립트 작성 + 실행 |
| R4 | spouse-01 viewerData 구조 (3-1~3-8) — 스키마 검증 + 라우팅 분기 추적 |
| R5 | R1~R4 발견 건 수정 + 전체 재검증 |

### Phase B: 엔진 로직 코드 리뷰 (R6~R12)

| 라운드 | 초점 |
|--------|------|
| R6 | 끼어들기 로직 (4-A) — interjectionV2.ts + useActionDispatch 끼어들기 분기 코드 리뷰 |
| R7 | 모순 추궁 로직 (4-B) — 1회 제한, fallback 응답, 상대방 끼어들기 연쇄 |
| R8 | 증인 다층 증언 엔진 (4-C) — witnessTestimonyResolver.ts 필터링/세션/effect 적용 |
| R9 | 판결/결과 엔진 (4-D) — verdictEngine + verdictSummaryEngine + 저울 동기화 |
| R10 | viewerData fallback 로직 (4-E) — caseLoader.getOriginalViewerData + PCEvidenceViewer |
| R11 | Phase 전환 로직 — phaseSlice 전환 조건, 턴 카운트, 전략 선택 suppress |
| R12 | R6~R11 발견 건 수정 + 재검증 |

### Phase C: 런타임 검증 (R13~R17)

| 라운드 | 초점 |
|--------|------|
| R13 | spouse-01 헤드리스 플레이스루 — TypeError/console.error 0건 |
| R14 | friend-01 헤드리스 플레이스루 — LLM fallback 경로 + 증인 다층 |
| R15 | family-01 헤드리스 플레이스루 — LLM fallback 경로 + 증인 다층 |
| R16 | 3사건 엣지 케이스 — S5 자백 시 끼어들기 차단, Hidden 쟁점 emergence AND 조건 |
| R17 | R13~R16 발견 건 수정 + 재검증 |

### Phase D: 리그레션 + 최종 보고 (R18~R20)

| 라운드 | 초점 |
|--------|------|
| R18 | 전체 수정 후 tsc -b --force + npm run build 통과 확인 |
| R19 | 3사건 빠른 재검증 (Level 1~3 자동화 재실행) |
| R20 | **최종 보고서 작성** — `tmp/thread-q-v5-fulltest-report.md` |

### 라운드별 산출물

각 라운드 종료 시 `tmp/q-v5-r{N}.md` 파일에 결과를 기록합니다.

### 수정 권한

- **데이터 파일** (JSON, TS 데이터): 직접 수정 가능 (ID 참조 오류, 구조 누락 등)
- **엔진 코드**: 직접 수정 가능 (로직 버그, 분기 오류 등)
- **UI 컴포넌트**: 직접 수정 가능 (라우팅, 렌더링 버그 등)
- **한국어 텍스트 품질**: 수정 금지 → Thread QW 관할 (FAIL 보고만)
- **수정 시 반드시 `npx tsc -b --force` + `npm run build` 통과 확인**

---

## 프로젝트 구조 요약

```
src/
├── engine/           48개 룰 엔진
├── store/            Zustand 8슬라이스
├── hooks/            useActionDispatch (액션 디스패치 메인)
├── components/pc/    PC UI
├── data/cases/       84건 사건 (generated/*.json)
├── data/scriptedText/  3건 ScriptedText (spouse/friend/family-01)
├── data/witnessTestimonyData/  3건 증인 다층 증언
└── types/            TypeScript 타입
```

검증 대상: **spouse-01 / friend-01 / family-01**

---

## Level 1: 데이터 참조 무결성 (자동화)

> 모든 ID 참조가 실제 존재하는 엔티티를 가리키는지 검증

| # | 항목 | 검증 방법 | PASS 기준 |
|---|------|----------|----------|
| 1-1 | dispute ID 참조 | evidence.proves[], lieConfig[].disputeId, solution.disputeId 등에서 참조하는 dispute ID가 실제 disputes[]에 존재 | miss 0 |
| 1-2 | evidence ID 참조 | evidenceCombinations[].requires[], baseEvidenceIds[] 등에서 참조하는 evidence ID가 실제 evidence[]에 존재 | miss 0 |
| 1-3 | witness ID 참조 | activeThirdParties[]의 witness ID가 witnessTestimonyData에서 사용되는 witnessId와 매칭 | miss 0 |
| 1-4 | ScriptedText 키 매칭 | scriptedText의 각 채널 entry key가 런타임에서 생성하는 key와 매칭 | miss 0 |
| 1-5 | verdictOptions disputeId | verdictOptions[].disputeId가 disputes[]에 존재 | miss 0 |

### 검증 스크립트
```bash
node tests/stage1-deep-audit.cjs
```

---

## Level 2: 증인 다층 증언 구조 검증

> `src/data/witnessTestimonyData/{case}.ts` 3파일 전수

| # | 항목 | PASS 기준 |
|---|------|----------|
| 2-1 | **id 유일성** | 같은 파일 내 id 중복 0건 |
| 2-2 | **witnessId 유효성** | w-1, w-2, w-3만 사용, activeThirdParties와 매칭 |
| 2-3 | **depth 범위** | 1, 2, 3만 사용 |
| 2-4 | **prevSlotRequired 체인** | 참조하는 slot id가 같은 파일 내 존재 |
| 2-5 | **prevChoiceRequired 체인** | 참조하는 slot id가 같은 파일 내 존재 |
| 2-6 | **disputeState.id 유효성** | 참조하는 dispute id가 해당 사건의 disputes[]에 존재 |
| 2-7 | **lieStateNudge.dispute 유효성** | 동일 |
| 2-8 | **relatedDisputes 유효성** | 배열 내 모든 dispute id가 해당 사건에 존재 |
| 2-9 | **depth 진행 구조** | 각 증인별로 depth 1 → 2 → 3 순서가 있는지 (depth 2에 prevSlotRequired 있는지) |
| 2-10 | **emergenceTrigger 유효성** | 참조 dispute가 hidden visibility인 경우만 사용 (spouse-01 h-d3 등) |

### 검증 방법
```javascript
// 각 사건별 testimony 파일을 import하여 구조 검증
// dispute 목록은 generated/{case}.json에서 로드
```

---

## Level 3: viewerData 구조 검증

> `src/data/cases/generated/spouse-01.json`의 evidence[].viewerData 전수

| # | 항목 | PASS 기준 |
|---|------|----------|
| 3-1 | **e-1 영수증** | viewerData.receipt 배열 5개, 각각 storeName/items/total/paymentMethod 존재 |
| 3-2 | **e-2 GPS** | viewerData.gps_log 배열 18개, 각각 timestamp/lat/lng/speed/location 존재 |
| 3-3 | **e-3 통화기록** | viewerData.log.rows 배열 10개, type이 out/in/miss 중 하나 |
| 3-4 | **e-4 문자** | viewerData.chat.messages 존재, side가 left/right |
| 3-5 | **e-5 계좌** | viewerData.bank 배열 11개, amount/balance 존재 |
| 3-6 | **e-6 카톡** | viewerData.chat.messages 존재 |
| 3-7 | **e-7 해지서류** | viewerData.contract.rows 존재 |
| 3-8 | **EvidenceSubContent 라우팅** | 각 contentKey가 switch문에서 올바른 Viewer 컴포넌트로 분기 |

### 라우팅 정합성 체크
```
receipt → ReceiptViewer  (신규)
gps_log → GpsLogViewer   (신규)
bank    → BankViewer
chat    → ChatViewer
contract → ContractViewer
log     → LogViewer
device  → DeviceViewer
```

---

## Level 4: 엔진 로직 검증

### 4-A: 끼어들기 (interjection) 로직

| # | 항목 | PASS 기준 |
|---|------|----------|
| 4-A1 | 심문 대상이 A일 때, 끼어드는 주체는 B | pcTargetParty와 끼어들기 party가 반대 |
| 4-A2 | 끼어들기 후 pcTargetParty 복원 | 끼어들기 처리 후 원래 심문 대상으로 돌아옴 |
| 4-A3 | S5 자백 시 끼어들기 차단 | lieState가 S5면 interjection 발동 안 됨 |

### 4-B: 모순 추궁 로직

| # | 항목 | PASS 기준 |
|---|------|----------|
| 4-B1 | 모순 추궁 1회 제한 | 같은 쟁점에 2번째 추궁 시 차단 |
| 4-B2 | 추궁 후 NPC fallback | lieState에 따라 3단계 응답 (부인/변명/동요) |
| 4-B3 | 추궁 후 상대방 끼어들기 | 끼어들기 발동 시 party 올바른지 |

### 4-C: 증인 다층 증언 엔진

| # | 항목 | PASS 기준 |
|---|------|----------|
| 4-C1 | slot 필터링 | conditions.disputeState, prevSlotRequired 모두 충족된 슬롯만 노출 |
| 4-C2 | session 관리 | heardSlots에 선택한 slot id 누적, 중복 노출 없음 |
| 4-C3 | 재소환 | hasRemainingSlots가 true면 증인 재소환 가능 |
| 4-C4 | effect 적용 | lieStateNudge, emotionDelta, emergenceTrigger 정상 적용 |
| 4-C5 | 3사건 import 분기 | useActionDispatch에서 caseKey별 올바른 파일 import |

### 4-D: 판결/결과 엔진

| # | 항목 | PASS 기준 |
|---|------|----------|
| 4-D1 | verdictOptions 로딩 | 3사건 모두 verdictOptions 존재, disputeId 매칭 |
| 4-D2 | 저울 게이지 동기화 | slider value = --a-pct = gradient 분기점 |
| 4-D3 | 결과 점수 계산 | calculateVerdict 정상 산출 (통찰/권위/지혜) |
| 4-D4 | 재판관 성향 드리프트 | deriveCaseProfile → applyDriftUpdate 정상 |

### 4-E: viewerData fallback 로직

| # | 항목 | PASS 기준 |
|---|------|----------|
| 4-E1 | getOriginalViewerData 우선 | PCEvidenceViewer에서 원본 JSON viewerData가 sessionStorage보다 우선 |
| 4-E2 | fallback 동작 | 원본에 없을 때 evidence.viewerData 사용 |

---

## Level 5: 런타임 검증 (헤드리스)

```bash
# dev server 시작 후
npm run dev

# 3사건 헤드리스 플레이스루
node tests/run-84-headless.cjs --category spouse --case spouse-01
node tests/run-84-headless.cjs --category friend --case friend-01
node tests/run-84-headless.cjs --category family --case family-01
```

| # | 항목 | PASS 기준 |
|---|------|----------|
| 5-1 | Phase 0→Result 완주 | 3사건 모두 에러 없이 완주 |
| 5-2 | TypeError 0건 | undefined 접근, null 참조 없음 |
| 5-3 | console.error 0건 | 런타임 에러 메시지 없음 |
| 5-4 | LLM fallback 정상 | ScriptedText 없는 채널에서 LLM 호출 또는 fallback 텍스트 표시 |

---

## 테스트 리포트 포맷

```markdown
# Thread Q V5 구조·로직 검증 리포트

## 테스트 환경
- 일시: YYYY-MM-DD
- 커밋: c193f03
- 브랜치: codex/ui-handoff-freeze-20260411

## Level 1: 데이터 참조
- 1-1~1-5: PASS / FAIL (miss 건수)

## Level 2: 증인 증언 구조
- 2-1~2-10: PASS / FAIL (사건별)

## Level 3: viewerData 구조
- 3-1~3-8: PASS / FAIL

## Level 4: 엔진 로직
- 4-A 끼어들기: PASS / FAIL
- 4-B 모순추궁: PASS / FAIL
- 4-C 증인 다층: PASS / FAIL
- 4-D 판결/결과: PASS / FAIL
- 4-E viewerData fallback: PASS / FAIL

## Level 5: 런타임
- 5-1~5-4: PASS / FAIL (사건별)

## 블로커 목록
1. [Level] [항목] 상세...

## 최종 판정: PASS / FAIL / CONDITIONAL
```

산출물: `tmp/thread-q-v5-fulltest-report.md`

---

## PASS 기준

| 등급 | 조건 |
|------|------|
| **PASS** | Level 1~5 전체 PASS |
| **CONDITIONAL** | Level 4~5에서 경미 WARN만 (기능 영향 없음) |
| **FAIL** | Level 1~3 FAIL 1건 이상, 또는 Level 4~5 블로커 1건 이상 |
