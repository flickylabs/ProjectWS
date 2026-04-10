# 조합 실험실 V2.1 UI 확장안

## 1. 방향

조합 실험실은 완전한 새 화면을 만드는 것이 아니라, 기존 UI를 발전시키는 방향이 맞다.

현재 기반:

- 쟁점 비교 보관함: [D:\ProjectWS\src\components\discovery\DisputeBoard.tsx](D:/ProjectWS/src/components/discovery/DisputeBoard.tsx)
- 기존 증거 조합 격상: [D:\ProjectWS\src\store\slices\evidenceSlice.ts](D:/ProjectWS/src/store/slices/evidenceSlice.ts)
- 증거 열람/제시 패널: [D:\ProjectWS\src\components\actions\EvidencePresenter.tsx](D:/ProjectWS/src/components/actions/EvidencePresenter.tsx)

즉, V2.1은 `비교 보관함 + 증거 패널`을 조합 실험실로 확장하는 구조가 자연스럽다.

## 2. 최소 구현

이번 최소 구현은 [D:\ProjectWS\src\components\discovery\CombinationLabPanel.tsx](D:/ProjectWS/src/components/discovery/CombinationLabPanel.tsx)로 분리했다.

현재 포함된 기능:

- 분석 포인트 표시
- 3슬롯 선택 트레이
- 증거/노트/파생 노드 선택
- 매칭 recipe 탐색
- 결과 요약 미리보기
- 조합 실행
- 시스템 로그 기록

삽입 위치:

- [D:\ProjectWS\src\components\discovery\DisputeBoard.tsx](D:/ProjectWS/src/components/discovery/DisputeBoard.tsx)

현재 배치는:

- 상단 readiness/meter
- 비교 보관함
- 조합 실험실
- 쟁점 카드 목록

## 3. 런타임 연결

조합 실험실 slice:

- [D:\ProjectWS\src\store\slices\combinationLabSlice.ts](D:/ProjectWS/src/store/slices/combinationLabSlice.ts)

현재 연결된 결과:

- 새 노트 해금
- 새 질문 해금
- 새 진술 해금
- 새 증인 각도 해금
- 새 조정 힌트 해금
- 파생 증거 추가
- 증거 승격/재프레임 기록
- 파생 쟁점 추가
- 쟁점 업그레이드/재프레임 기록

보조 store 연결:

- 파생 증거 추가/패치: [D:\ProjectWS\src\store\slices\evidenceSlice.ts](D:/ProjectWS/src/store/slices/evidenceSlice.ts)
- 파생 쟁점 visibility 주입: [D:\ProjectWS\src\store\slices\discoverySlice.ts](D:/ProjectWS/src/store/slices/discoverySlice.ts)
- 초기화/영속화: [D:\ProjectWS\src\store\useGameStore.ts](D:/ProjectWS/src/store/useGameStore.ts)

## 4. 이번 단계에서 아직 남겨둔 것

현재는 `조합 결과가 store에 기록되는 최소 경로`까지만 붙였다. 아래는 다음 단계다.

- 질문 선택 UI에 `unlockedQuestions` 반영
- 증인 UI에 `unlockedWitnessAngles` 반영
- 조정 단계에 `unlockedMediationHints` 반영
- 파생 쟁점이 Dispute Board에서 다른 스타일로 보이도록 개선
- EvidencePresenter에서 조합 가능한 증거 추천 표시

## 5. 구현 순서 권장

1. `headline-01`에서 조합 실험실 인터랙션 테스트
2. 질문 선택 UI에 고급 질문 주입
3. 파생 쟁점 강조 표시
4. headline 사건 공통 조합 패널 스타일 정리
5. 이후 다른 사건으로 자동 조합망 확대

