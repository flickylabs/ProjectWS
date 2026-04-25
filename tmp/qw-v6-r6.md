# QW V6 R6: spouse-01 Phase 3~5 심층 (심문 + 모순 + 끼어들기 + 증인)

## 실행
- 대상 채널 8종: interrogation(144) / contradiction_pursuit(16) / interjection(8) / evidence_present(42) / evidence_discovery(12) / witness(9) / judge_question(24) / judge_contradiction(6)
- 총 entries 261, 각 variant 평균 3~6 → 1000+ 발화 스캔

## 집중-8 호칭 혼종
- 8-a/b/d: **0건**
- 8-c: **1건 (FP, R1과 동일)**
  - `interrogation / a|d-1|S3|empathy_approach / v4` — 내부 따옴표 재인용 ("그걸 어떻게 알았어?")

## 집중-9 Placeholder
- **0건**

## 집중-10c NPC 관찰자 서술체
- **0건** (NPC 발화 종결 `~한다./~했다./~되었다./~섰다.` 없음)

## FORBID 금지패턴
- 2건: R1과 동일 (`evidence_discovery b|e-1|capture`, `b|e-3|capture`) — 단어되묻기 judge 발화

## 집중-3 끼어들기 대상 (interjection 8 entries)
- key 접두(`a|`/`b|`) ↔ `party` 필드 **전부 일치**
- a = 박지연, b = 이준호 → 각각 상대 발언에 끼어들 때 본인이 말하는 구조 정합
- 분쟁(d-1/d-2) × 임팩트(minor/major) × variants 3 = 8×3=24 variants

## 집중-4 모순 추궁 NPC 응답 (contradiction_pursuit 16 entries)
- party (a/b) × dispute(d-1/d-2) × lieState(S1~S4) × variants 3 = 16×3=48 variants
- lieState S1→S4 체인 각 단계 존재 ✓
- variants 3종 모두 text 존재, 빈 content 0

## 수정 (이번 라운드, 권한 내)
- 없음

## 다음 라운드로 이월
- R7: spouse-01 Phase 6→Result (중재 + 판결 + aftermath)
- mediation 채널 entries=0 (ScriptedText 부재, LLM 의존) — R7에서 확인

## 라운드 판정: **PASS** (FAIL 0, WARN 2, FP 1)
