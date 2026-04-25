# QW V6 R32: blueprintPromptBuilder V1 (legacy) 동일 강화 검토

## 실행
- llmDialogueResolver L2113: V1 경로는 v2Data 없을 때 legacy fallback
- 활성 3사건 모두 v2Data 존재 → V1 경로 비활성

## 판정
- V1 (blueprintPromptBuilder.ts) 활성 3사건에서 **사용되지 않음**
- 수정 우선순위 낮음 — R31 V2 강화로 충분
- legacy 81건 사용 시 영향 있으나 V6 범위 외

## 다음 라운드로 이월
- R33: witnessEngine.ts 프롬프트 호칭 규칙

## 라운드 판정: **PASS (NOT APPLICABLE)** — V1 경로 미활성
