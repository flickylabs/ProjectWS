# spouse01 pilot request 2

산출물 4종:

1. `interjection-v2-design.ts`
   - 패턴형 보장 끼어들기
   - quadrant / beliefMode 차등
   - allow / block 리밸런스
   - GameEventModal / useActionDispatch 통합 스니펫

2. `npc-reaction-v2-design.ts`
   - 순응 / 저항 / 역공 확률 레이어
   - archetype × lieMotive × disputeKind × linkState 조합
   - counter cap 15 적용
   - blueprintEngine / questionEffectEngine / beatSelector 통합 스니펫

3. `meter-staging-v2-design.ts`
   - 누설 / 신뢰 단계형 HUD
   - 사건카드 조건 해금
   - readiness 힌트 텍스트화

4. `phase6-result-prompt-v2-design.md`
   - Phase3StructuredLog 기반 Phase 6 / Result 프롬프트 템플릿
   - 톤 연결 전략
   - prompt bridge 압축 규칙

보조 원칙:
- 1차 스키마/네이밍(`BeatScriptV2`, `DisputeV2`, `QuestionFatigueV2`, `Phase3StructuredLog`) 유지
- `prev-02-spouse01-beats-v2-full.json`은 구조 위주로 확인하고, interjection beat 4개만 선택적으로 참조
