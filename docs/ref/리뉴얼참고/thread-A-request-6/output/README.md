# Solomon Pilot Request 5

## 구성

- `v2-additional-batch-template-v2.2.md`
  - interjection 12개 구조와 freeQuestion alias 규칙이 반영된 **전체 업데이트 템플릿**
- `template-replacement-snippets.md`
  - C스레드 전달용 **정확한 교체 텍스트**만 따로 분리
- `free-question-keyword-strategy-v2-design.ts`
  - Free Question V2 키워드 확장 전략 결정안
  - `disputeAliases` 스키마 patch
  - classifier 입력 patch
  - INTENT_LEXICON 운영 원칙

## 이번 차수 결론

1. **Interjection**
   - 사건당 12개 기본
   - infoLevel 4종 기준
   - `actionFamily: "interjection"` 고정
   - red_herring면 `beliefMode`, `misconceptionStates`, `trapStates` 필수 사용

2. **Free Question 키워드**
   - 방안 A 채택: dispute 레벨 `disputeAliases`
   - hook-level `triggerKeywords`는 기본 배치 템플릿에서 사용하지 않음
   - `INTENT_LEXICON`은 범용으로 유지
