# QW V6 R56: Phase E R56 — blueprintPromptBuilderV2 toJudge/toPartner 분기

## 원래 계획
> R56: 호칭 프롬프트의 toJudge/toPartner 분기 + few-shot 예시 부족 지점

## 선행 R31에서 완료
- V6 호칭 혼종 금지 few-shot 추가 (3종 BAD example)
- 기존 ✅/❌ 가이드 강화

## 추가 재검토
- blueprintPromptBuilderV2.ts L141: `${judgeRef}${pp이가(judgeRef)}` 등 조사 헬퍼 이미 적용
- L212~226: 반말 금지 + 재판관 전용 발언 규칙 명시
- 호칭 규칙(L137~146): toJudge vs toPartner 분기 명확

## 판정
- 기존 프롬프트 규칙 체계가 강함
- R31 강화로 V6 샘플 직접 커버

## 라운드 판정: **R56 완료 — R31 강화로 대응**
