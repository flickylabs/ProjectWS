# family-01 Session 2 작업 메모

## 생성 산출물
- family-01-v2-atoms.json
- family-01-v2-atoms.ts
- family-01-v3-game-loop-data.json
- family-01-v3-game-loop-data.ts

## V2 atom 구성
- 대상 범위: a(d-1, d-3, d-5) + b(d-2, d-4, d-5) × S0~S5
- 상태 엔트리 수: 36
- state별 claimAtoms 인스턴스 수: 148
- 사용된 고유 atom ID 수: 91

## V3 game loop 구성
- DossierCard: 3개
- dossier challenge 질문: 18개
- StateUnlockAtom: 42개
- ContradictionEvent: 4개
- InterjectionEvent: 3개
- EmotionalOutburstEvent: 4개
- TransitionBeat: 24개

## 주요 설계 메모
1. V2 atom은 기존 family-01 정책 데이터의 publicClaim/privateKnowledge/suppressions를 유지한 채 `claimAtoms`만 덧씌우는 방식으로 작성했습니다.
2. 호칭 슬롯은 가족 사건 규칙을 반영했습니다.
   - 서아 기준: `제 동생` / `도현아`
   - 도현 기준: `제 누나` / `누나`
   - 부모 관련: `아버지`, `어머니`, `부모님`
3. 공유 쟁점 d-5는 spouse-01과 동일한 충돌 방지 방식으로 `d5a.*`, `d5b.*` atom/ unlock ID를 분리했습니다.
4. DossierCard의 revealAtom은 모두 이번 세션에서 생성한 `stateUnlockAtoms` ID만 참조하도록 맞췄습니다.
5. e-4(잘린 수첩 사진)는 V3 질문에서도 함정 증거 성격이 보이도록 `authenticity/context` 축 질문을 우선 배치했습니다.
6. TransitionBeat는 기존 family-01 beat voice를 유지하되, 전이 순간용으로만 더 날카롭게 압축했습니다.
