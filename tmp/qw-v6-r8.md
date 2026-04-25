# QW V6 R8: friend-01 전 구간 (Phase1 + 증인 다층 + LLM fallback)

## 실행
- scriptedText/friend-01.json 14채널 전수: interrogation(180) / evidence_present(42) / dossier(27) / witness(9) / aftermath(5) / system_message(6) / mediation(0) / contradiction_pursuit(8) / interjection(8) / emotional_overload(4) / evidence_discovery(12) / trust_action(18) / judge_question(36) / judge_contradiction(9)
- witnessTestimonyData/friend-01.ts 3증인 × 5슬롯

## 집중-8 호칭 혼종
- 8-a/b/c/d: **0건** 전체

## 집중-9 Placeholder
- **0건**

## 집중-10c NPC 관찰자 서술체
- **0건**

## FORBID 금지패턴
- scriptedText: **4건**
  - `interrogation a|d-3|S4|motive_search`: `"매번 이번 한 번만이라고 하셨고, 저는 그 말을 믿고 넘어갔습니다."` — NPC 발화, 최수민 반복 화법 간접인용. **FP**
  - `evidence_discovery` 3건 (`a|e-3|capture`, `b|e-4|capture`, 그리고 R2에서 본 `b|e-1|capture` 패턴): 모두 judge "지금 X라고 하셨습니다. [전개]" 단어되묻기. **WARN** (R1과 동일 정책 문제)
- witness testimony: **1건**
  - `w-1 depth 2 question`: `"호감이라고 하셨는데, 구체적으로 어떤 말을 했습니까?"` — judge 후속 질문 단어되묻기. **WARN**

## mediation 0 entries
- ScriptedText 부재 → LLM fallback. spouse와 동일 패턴 (R7과 같음)

## friend-01 LLM fallback 영역
- mediation 채널만 ScriptedText 부재
- interjection/contradiction_pursuit/evidence_present/dossier/evidence_discovery/trust_action/judge_question/judge_contradiction 모두 ScriptedText 존재 ✓
- V5 리포트에서는 "LLM fallback"으로 기록했으나 실제로는 대부분 ScriptedText 커버됨

## 수정 (이번 라운드, 권한 내)
- 없음

## CT 검토 요청 (권한 초과)
- 3사건 누적 **"X라고 하셨습니다" 단어되묻기 판정**:
  - spouse-01: 2건 (evidence_discovery)
  - friend-01: 4건 (interrogation 1 FP + evidence_discovery 3 + witness 1)
  - family-01: 3건 (interrogation 2 FP + evidence_discovery 1)
  - **실 WARN 후보**: spouse 2 + friend 4 + family 1 = **7건**
  - R50 mid-report에서 일괄 교정 제안 예정

## 다음 라운드로 이월
- R9: family-01 전 구간 동일 스캔
- R10: R5~R9 재검증 (수정 없으므로 샘플링만)

## 라운드 판정: **PASS** (FAIL 0, WARN 4, FP 1)
