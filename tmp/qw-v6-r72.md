# QW V6 R72: LLM Free Question 경로 edge case

## 실행
- 자유 질문 (PCActionsPanel.tsx:253 processFreeQuestion) 경로 확인

## 결과
- processFreeQuestion → llmFreeQuestion.ts
- 응답은 postProcessNpcText 경유 (enforceHonorifics + fixPostpositions)
- R22/R27 확장 rule 자동 적용

## 라운드 판정: **PASS**
