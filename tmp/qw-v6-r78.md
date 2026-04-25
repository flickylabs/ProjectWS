# QW V6 R78: Phase F — 증거 조사 질문 경로 edge case

## 실행
- investigationStages 조사 질문 3단계 텍스트 + evidence viewerData 레이블

## 결과
- evidence의 investigationStages[].question 텍스트: 정적 스캔 (R4) clean
- evidence.surfaceName / viewerData.meta.name 등 상수, 이름+조사 없음
- 조사 질문 UI 렌더 (PCEvidenceSubViewers.tsx) 하드코딩 없음

## 라운드 판정: **PASS**
