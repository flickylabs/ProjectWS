# CT → Thread QW (신규 세션): V5 3사건 통합 품질 검증

> 발신: CT (Control Tower)
> 수신: Thread QW (Quality Writing) — **신규 세션**
> 일시: 2026-04-14
> 커밋: c193f03
> Vercel: https://project-ws.vercel.app

---

## ⚠️ 이 세션은 신규 생성입니다

기존 QW 스레드의 컨텍스트는 없습니다. 이 문서가 유일한 입력입니다.
**검증 대상**: spouse-01 / friend-01 / family-01 (3사건 전수)

---

## 반복 실행 계획 (20라운드)

이 검증은 **자동 반복(loop)** 으로 실행됩니다. 각 라운드에서 발견한 문제를 직접 수정하고, 다음 라운드에서 수정 결과를 재검증합니다.

### Phase A: 정적 데이터 전수 스캔 (R1~R4)

| 라운드 | 대상 | 초점 |
|--------|------|------|
| R1 | spouse-01 ScriptedText + Phase1/2 | 금지패턴 grep + 조사 오류 전수 스캔 + 호칭 위반 |
| R2 | friend-01 ScriptedText + Phase1 + 증인 다층 | 동일 스캔 + 증인 testimony 텍스트 품질 |
| R3 | family-01 ScriptedText + Phase1 + 증인 다층 | 동일 스캔 + 증인 testimony 텍스트 품질 |
| R4 | 3사건 viewerData + R1~R3 발견 건 일괄 수정 + 재스캔 | 영수증/GPS/통화/카톡 교차검증 + 수정 0건 확인 |

### Phase B: 사건별 심층 (R5~R10)

| 라운드 | 대상 | 초점 |
|--------|------|------|
| R5 | spouse-01 Phase 0→2 | 사건소개 + 초기진술 + 반박 — 맥락·호칭·존칭 |
| R6 | spouse-01 Phase 3~5 | 심문 루프 — 질문→응답→전이 + 모순추궁 + 끼어들기 + 증인 |
| R7 | spouse-01 Phase 6→Result | 중재 + 판결 + 결과 — 재판관 품질 + 저울 + 후일담 |
| R8 | friend-01 전 구간 | Phase1 대사 + 증인 다층 + LLM fallback 품질 집중 |
| R9 | family-01 전 구간 | Phase1 대사 + 증인 다층 + LLM fallback 품질 집중 |
| R10 | R5~R9 발견 건 수정 + 사건별 빠른 재검증 | 수정 확인 |

### Phase C: 특수 상황 집중 (R11~R13)

| 라운드 | 대상 | 초점 |
|--------|------|------|
| R11 | 3사건 끼어들기 + 모순 추궁 | 대상 party 정확성, NPC 응답 품질, 재판관 톤 차별화 |
| R12 | 3사건 증인 다층 증언 | depth 체인, 주제 선택, 재소환, effect 적용 |
| R13 | 3사건 증거 뷰어 + 판결/결과 | 영수증 넘기기, GPS 로그, 4지선다, 저울, 후일담 |

### Phase D: 리그레션 + 보고 (R14~R15)

| 라운드 | 대상 | 초점 |
|--------|------|------|
| R14 | R11~R13 발견 건 수정 + 3사건 리그레션 | 수정 확인 + 깨진 것 없음 |
| R15 | **최종 보고서 작성** | 전체 결과 종합, FAIL 잔여 목록, 교정 제안 |

### 라운드별 산출물

각 라운드 종료 시 `tmp/qw-v5-r{N}.md` 파일에 결과를 기록합니다.
R15에서 `tmp/thread-qw-v5-fulltest-report.md` 최종 보고서를 생성합니다.

### 수정 권한

- **ScriptedText/Phase1 대사 텍스트**: 직접 수정 가능 (조사, 호칭, 번역체 등)
- **증인 다층 증언 텍스트**: 직접 수정 가능
- **viewerData 내 텍스트**: 직접 수정 가능
- **엔진 코드/로직**: 수정 금지 → FAIL 보고만 (CT에서 처리)
- **수정 시 반드시 `npx tsc -b --force` 통과 확인**

---

## 프로젝트 요약 (30초 브리핑)

"솔로몬 법정" — AI 둘의 싸움을 인간이 재판하는 추리 게임.
플레이어가 재판관 역할로 NPC 2명을 심문하여 진실을 밝히는 리플레이형 게임.
Phase 0(사건소개) → 1(초기진술) → 2(반박) → 3(심문) → 4(증거조사) → 5(재심문) → 6(중재) → 7(판결) → 결과.

핵심: Phase 3~5에서 질문 선택 → 재판관 질문 생성 → NPC 응답(LLM) → 상태 전이.
NPC는 거짓말 상태(S0→S5)에 따라 정보 공개 수준이 달라짐 (Truth Throttle).

---

## 검증 6+2축 체계

### 기본 6축 (모든 대사에 적용)

| 축 | 항목 | PASS 기준 |
|---|------|----------|
| 1 | **의미** | LieState에 맞는 정보 수준, 쟁점에 대한 답, 심문유형 맞는 반응 |
| 2 | **내용** | 사건 사실관계 무모순, Hidden 쟁점 조기 노출 없음, 정보 비대칭 위반 없음 |
| 3 | **맥락** | 직전 질문/증거에 대한 적절한 답, 감정 흐름 자연스러움 |
| 4 | **호칭** | 부부 직접=반말(자기야), 재판관에게=제 아내/남편(합니다체), 격앙=이름! |
| 5 | **존칭** | 당사자→재판관=합니다체, 부부간=반말, 증인→재판관=합니다체 |
| 6 | **어법** | 번역체 0건, 메타 누출 0건, 조사 정확, 자연스러운 구어체 |

### 추가 2축 (V4~V5 신규)

| 축 | 항목 | PASS 기준 |
|---|------|----------|
| 7 | **재판관 품질** | 기계적 관찰문 금지, 직접 인용 금지, 간접 화법만, depth별 구체성 증가 |
| 8 | **특수 상황 정합성** | 끼어들기/모순추궁/증인소환 시 대상(party) 정확, 메시지 누락 없음 |

---

## 🔴 V5 집중 검증 항목 (이전 세션에서 발견된 문제 유형)

> **아래 항목들은 실제 플레이에서 반복 발견된 버그 패턴입니다. 특별히 집중해주세요.**

### 집중-1: 조사(助詞) 오류
- "이준호은" → "이준호는", "박지연을" → "박지연을" (받침 유무 판단)
- 이/가, 은/는, 을/를, 과/와 — 특히 **이름 뒤 조사**에서 빈번
- ScriptedText 정적 대사 + LLM 동적 대사 모두 검사
- 검출 방법: 등장인물 이름 + 조사 조합을 grep로 전수 스캔

### 집중-2: 재판관 메시지 누락
- 특정 상황에서 재판관 코멘트가 아예 표시되지 않는 케이스
- 특히: **모순 추궁 후**, **끼어들기 후**, **증거 제시 후**, **증인 증언 후**
- 각 상황에서 재판관의 후속 코멘트가 반드시 1개 이상 있어야 함

### 집중-3: 끼어들기 대상 오류
- 끼어들기(interjection)가 발생할 때 **상대방**이 끼어드는 것이 정상
- 버그: A를 심문 중인데 A가 끼어들거나, 심문 대상이 바뀌지 않는 현상
- `pcTargetParty` 복원 로직이 정상 동작하는지 확인

### 집중-4: 모순 추궁 시 NPC 응답
- 모순을 지적했을 때 NPC가 **무응답**이거나 **엉뚱한 쟁점**에 대해 답하는 경우
- lieState별 fallback 응답(S0~S2: 부인/변명, S3~S4: 동요/인정)이 자연스러운지
- 모순 추궁 후 상대방 끼어들기가 발동될 때 **대상 전환**이 올바른지

### 집중-5: 증인 다층 증언 (V5 신규)
- spouse-01: 3증인 × 5슬롯 (경비원/은행원/박미라)
- friend-01: 3증인 × 5슬롯 (공통친구/직장후배/카페사장)
- family-01: 3증인 × 5슬롯 (전요양보호사/공증직원/이웃)
- **depth 1 선택** → **depth 2 분기** → **depth 3 해금(S2+)** 체인이 정상 작동하는지
- `prevSlotRequired` 조건이 올바르게 게이팅하는지
- 증인 재소환(hasRemainingSlots) 정상 동작 확인

### 집중-6: 증거 뷰어 데이터 정합성
- spouse-01 viewerData가 새 형태(receipt/gps_log)로 정상 렌더링되는지
- 영수증 5장 각각 좌우 넘기기 동작
- GPS 로그의 위치명이 사건 사실과 일치하는지
- 통화기록/계좌내역의 금액/날짜가 사건 스토리와 무모순인지

### 집중-7: 판결/결과 화면 (V4 고도화)
- 4지선다 쟁점 판단: 선택지가 해당 쟁점에 맞는 내용인지
- 저울 게이지: ▼ 마커와 파란/빨간 색상 분기점이 동기화되는지
- 해결안 선택 후 → 판결 확인 카드 → 결과 화면 전환이 매끄러운지
- 후일담 LLM 호출 (API 키 정상이면 3문단, 아니면 fallback 텍스트)

---

## 채널별 검증 매트릭스

### ScriptedText 채널 (spouse-01 = 15채널, friend-01/family-01 = 6채널 + LLM fallback)

| 채널 | 검증 축 | spouse-01 | friend/family |
|------|---------|-----------|--------------|
| interrogation | 축1+5 | ScriptedText | LLM fallback |
| evidence_present | 축2 | ScriptedText | LLM fallback |
| dossier | 축1 | ScriptedText | LLM fallback |
| witness | 축3 | ScriptedText | **다층 증언 데이터** |
| aftermath | 축6 | ScriptedText | LLM fallback |
| system_message | 축6 | ScriptedText | LLM fallback |
| contradiction_pursuit | 축1+4+**8** | ScriptedText | LLM fallback |
| interjection | 축3+5+**8** | ScriptedText | LLM fallback |
| emotional_overload | 축3+6 | ScriptedText | LLM fallback |
| evidence_discovery | 축7+2 | ScriptedText | LLM fallback |
| trust_action | 축1+5 | ScriptedText | LLM fallback |
| mediation | 축1+4 | ScriptedText | LLM fallback |
| judge_question | **축7 전면** | ScriptedText | LLM fallback |
| judge_contradiction | **축7 전면** | ScriptedText | LLM fallback |
| system_message_v2 | 축6 | ScriptedText | LLM fallback |

---

## 금지 패턴 자동 스캔 (3사건 전수)

```bash
# 3사건 ScriptedText + Phase1 대사에서 금지 패턴 grep
for f in spouse-01 friend-01 family-01; do
  echo "=== $f ==="
  grep -c "라고 하셨" src/data/scriptedText/$f.json src/data/dialogues/phase1/$f.json 2>/dev/null
  grep -c "내용이 확인" src/data/scriptedText/$f.json 2>/dev/null
  grep -c "태도에 변화가 감지" src/data/scriptedText/$f.json 2>/dev/null
  grep -c "흐름이 나타납니다" src/data/scriptedText/$f.json 2>/dev/null
  grep -c "된 것으로 생각됩니다" src/data/scriptedText/$f.json 2>/dev/null
  grep -c "특정 " src/data/scriptedText/$f.json 2>/dev/null
done
```

---

## 검증 보고 형식

```markdown
# Thread QW V5 3사건 품질 검증

## 사건별 결과

### spouse-01
- 축1~6 기본: PASS / FAIL (건수)
- 축7 재판관: PASS / FAIL
- 축8 특수상황: PASS / FAIL
- 집중-1 조사: PASS / FAIL (발견 건수, 위치)
- 집중-2 메시지 누락: PASS / FAIL
- 집중-3 끼어들기 대상: PASS / FAIL
- 집중-4 모순추궁 NPC: PASS / FAIL
- 집중-5 증인 다층: PASS / FAIL
- 집중-6 증거 뷰어: PASS / FAIL
- 집중-7 판결/결과: PASS / FAIL

### friend-01
(동일 형식)

### family-01
(동일 형식)

## FAIL 항목 상세
1. [사건] [채널/상황] 원문: "..." → 문제: ...
2. ...

## 교정 방향 제안
1. ...

## 종합 판정: PASS / FAIL / CONDITIONAL
```

산출물: `tmp/thread-qw-v5-fulltest-report.md`

---

## PASS 기준

| 등급 | 조건 |
|------|------|
| **PASS** | 전 축 PASS + 집중 항목 전체 0건 |
| **CONDITIONAL** | 축6 어법 경미 WARN만, 집중 항목 0건 |
| **FAIL** | 축1~5 FAIL 1건 이상, 또는 집중 항목 1건 이상 |
