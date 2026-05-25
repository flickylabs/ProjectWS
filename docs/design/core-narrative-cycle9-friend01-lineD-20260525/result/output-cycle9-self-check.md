# output-cycle9.json self-check

## 구조 검증
- [x] 총 entry 수: 36개
- [x] emergence별 수량: e-7=12 / d-5=12 / dc-5=12
- [x] 12 trigger candidate × 3 entry 구조 확인
- [x] 의뢰서 §2~§4 ID 명세와 정확히 일치
- [x] 각 entry 필수 field(id/text/behaviorHint/tags) 존재
- [x] tags 필수 축(cycleEntry/caseId/emergenceId/triggerId/channel/trigger/speaker/listener/register/dynamics/lineProgress) 존재
- [x] cascade_from_card entry에 priorCard tag 적용
- [x] combination_result entry에 recipeId=combine-7 적용

## 금지어 및 노출 정책 검증
- [x] 그룹 5 핵심 금지구 스캔: 0건
- [x] `매도`: 0건 / `명예훼손`: 0건
- [x] `낙인`: 단서명 `[낙인의 순서]` 직접 인용 4건만 존재, 일반 평가어 사용 0건
- [x] 그룹 2 핵심 금지구 스캔: 0건
- [x] `사기`: 0건 / `투자 명목`: 0건 / `미상환`: 0건
- [x] 재판관 금지어 `흐름`: 0건
- [x] player-visible `사건 카드`: 0건

## 톤 및 캐릭터 검증
- [x] 재판관 발화는 사실/행위/선후관계/관련/정리/분리 중심으로 작성
- [x] A(송다은)는 결론 먼저 + 단정 방어 frame, 후반부 약화 반응으로 작성
- [x] B(최수민)는 자제·단답 frame 유지
- [x] e-7의 B outburst는 1문장 단발 격앙으로 제한
- [x] dc-5 cascade-d5 A 반응 behaviorHint에 `어깨가 처음으로 내려간다` 포함
- [x] family address 관련 제3자/자기 가족 호칭 위반 없음

## First-Fired-Wins 구조
- [x] e-7: via-cascade-d4 / via-cascade-w3 / via-outburst / via-fallback 각 3 entry
- [x] d-5: via-cascade-e7 / via-cascade-dc4 / via-npc / via-fallback 각 3 entry
- [x] dc-5: via-cascade-d5 / via-combo / via-outburst / via-fallback 각 3 entry