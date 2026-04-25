# QW V6 R9: family-01 전 구간 (Phase1 + 증인 다층 + LLM fallback)

## 실행
- scriptedText/family-01.json 14채널 (friend-01과 동일 구성): interrogation(180) / evidence_present(42) / dossier(33) / witness(9) / aftermath(5) / system_message(6) / mediation(0) / contradiction_pursuit(8) / interjection(8) / emotional_overload(4) / evidence_discovery(12) / trust_action(18) / judge_question(36) / judge_contradiction(9)
- witnessTestimonyData/family-01.ts 3증인 × 5슬롯

## 집중-8 호칭 혼종
- 8-a/b/c: **0건**
- 8-d: **1건 (FP, R3과 동일)**
  - `interrogation a|d-2|S4|motive_search`: `"왜 그런 판단을 하셨는지 알아야, 제 동생이..."` — `알아야,`는 어미 `-야 하다`. 호격 아님. **FP**

## 집중-9 Placeholder
- **0건**

## 집중-10c NPC 관찰자 서술체
- **0건**

## FORBID 금지패턴
- scriptedText: **3건**
  - `interrogation b|d-2|S2|motive_search`: `"왜 제가 움직였느냐고 하시면, 그날 어머니가 저를 보며 끝내 달라고 하셨기 때문입니다."` — 어머니 발화 간접인용. **FP**
  - `evidence_present b|e-6|late|self`: `"... 어머니도 숨겨 달라고 하셨습니다."` — 어머니 발화 간접인용. **FP**
  - `evidence_discovery` judge callback (R3 L53567) 1건 — 단어되묻기 **WARN**
- witness testimony: **0건**

## mediation 0 entries
- ScriptedText 부재 (spouse/friend와 동일)

## family-01 LLM fallback 영역
- mediation만 부재. 다른 13채널 커버됨

## 수정 (이번 라운드, 권한 내)
- 없음

## CT 검토 요청 (권한 초과)
- R8에서 누적 정리한 "X라고 하셨습니다" 단어되묻기 이슈 (3사건 합 7건 WARN)

## 다음 라운드로 이월
- R10: R5~R9 재검증 (수정 없으므로 빠른 샘플링만)
- R11: 3사건 끼어들기 + 모순 추궁 (집중-3/4)
- R12: 3사건 증인 다층 (집중-5)
- R13: 3사건 증거/판결/결과 (집중-6/7)

## 라운드 판정: **PASS** (FAIL 0, WARN 1, FP 3)
