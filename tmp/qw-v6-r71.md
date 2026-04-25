# QW V6 R71: Phase F — ScriptedText 채널 edge case 범위 확인

## 실행
- scriptedText 14채널 중 LLM 경유 여부 확인
  - interrogation/contradiction_pursuit/interjection/dossier/witness/evidence_present/evidence_discovery/trust_action/aftermath/system_message/mediation(부재)/judge_question/judge_contradiction/emotional_overload

## 결과
- **정적 scriptedText** 채널은 모두 postProcessNpcText 경유 없이 직접 출력
- LLM fallback 경로(v2 data 없을 때 only)에서만 경유
- 활성 3사건은 v2 data 완비 → scripted 경로 유지
- 정적 텍스트 clean (R1~R13 확인)

## 결론
- 추가 edge case 없음

## 라운드 판정: **PASS**
