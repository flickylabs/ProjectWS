# R1~R10 Lint 규칙

각 entry 모든 R 통과 필수. 위반 시 산출물 자체 폐기.

## R1. spoilerLevel ↔ lieState 정합
- safe: lieState S0~S2에서만
- partial: S3~S4
- full: S5에서만
- **위반 예**: S0 답변에 "위임장 조작", "투자 손실" 같은 truth 키워드 노출 시 R1 fail

## R2. banned_lexemes_safe 단어 safe 등급 노출 금지
사건별 spec yaml의 truth 보호 목록 (04-truth-throttle.md 참조).
- **위반 예**: spouse-01 d-1 S0 답변에 "위임장", "투자방", "형" 등 노출 시 R2 fail

## R3. 단일 화자
NPC 응답은 해당 party만 발화.
- **위반 예**: B의 응답 안에 A의 발언 인용 또는 A 시점 발화 시 R3 fail

## R4. 글자수
- 재판관: 30~70자
- NPC: 40~80자
- system: 20~50자
- **위반 예**: 범위 초과 시 R4 fail

## R5. 호명 일관성
재판관 → callTerms 정확.
- 양측 언급: "OOO 씨"
- "부인" 단어 사용 X
- 당사자 → 재판관 발화: 합니다체
- 당사자 → 상대 직접: callTerms.toPartner
- **위반 예**: 잘못된 호칭 시 R5 fail

## R6. target party tag 정합
judge_question / judge_contradiction은 a/b 분리.
- target=b로 라우팅된 entry가 A를 호명하면 R6 fail
- 양측 발화는 target=both 명시

## R7. archetype 부합 검증
모든 NPC variant에 해당 archetype tell 1개 이상 포함.
- character-info의 verbalTells 우선 적용
- **위반 예**: avoidant 캐릭터 응답에 cold_logic 패턴 사용 시 R7 fail

## R8. scene 일관성 (시퀀스)
같은 scene 내 variants가 같은 lieState/q_type/tone arc 유지.
- **위반 예**: scene_id가 S0인데 variant가 S3 스타일이면 R8 fail
- 한 scene 안의 모든 variants는 동일 truth_leak_allowed 단계

## R9. 질문-답변 매핑 정합
judge_variants와 npc_variants가 같은 truth_leak 단계 + 같은 dispute.
- **위반 예**: judge가 d-1을 묻는데 npc가 d-2 정보 답변 시 R9 fail
- 단, motive_search/empathy 사용 시 npc가 동기 자발 누설은 R9 적용 X

## R10. 번역체 9패턴 + 시스템 톤 검증
번역체 ("~된 것으로 생각됩니다" 등) + 기계적 관찰문 금지.
- **위반 예**: 02-tone-guide.md 절대 금지 패턴 검출 시 R10 fail
- system 채널 "감지됩니다", "확인됩니다" 등 X

## self-check 절차

산출물 출력 전 각 entry:
- [ ] R1~R10 모두 pass
- [ ] quality_check 필드에 결과 기록
- [ ] fail entry는 폐기 후 재생성

## 통계 보고 (산출물 끝)

마지막에 다음 통계 첨부:
- 총 entries: N개
- pass: N개 / fail: 0
- archetype 분포 (tell 사용 횟수)
- lieState 분포 (S0~S5)
- channel 분포 (각 채널별 entry 수)
- 평균 글자수 (judge / npc / system)

## R1~R10 통합 체크리스트 (각 scene 단위)

```
[ ] R1: spoilerLevel ↔ lieState 정합
[ ] R2: banned_lexemes_safe 위반 X
[ ] R3: 단일 화자 (해당 party만)
[ ] R4: 글자수 범위
[ ] R5: 호명 일관성 ("부인" X, callTerms 정확)
[ ] R6: target party tag 정합
[ ] R7: archetype tell 1개 이상
[ ] R8: scene 일관성 (lieState/tone arc)
[ ] R9: 질문-답변 매핑 정합
[ ] R10: 번역체/시스템 톤 검증
```

전 체크 통과 시 quality_check.lint_R1_R10 = pass.
