# spouse-01 V3 게임 루프 데이터 작업 메모

## 포함 범위
- DossierCard 3개
- State unlock atoms: a/d-1,d-3,d-5 + b/d-2,d-4,d-5의 S2/S3/S4/S5 추가 원자
- Event text: contradictions 3, interjections 3, emotionalOutbursts 4
- Transition beats 8개 (한지석 d-1, 오세린 d-2)

## 주요 설계 선택
1. 도시에 카드는 권장 묶음 그대로 3장으로 구성했습니다.
   - dossier-1: e-1 + e-2
   - dossier-2: e-3 + e-4
   - dossier-3: e-5 + e-6

2. 세 도시에 모두 `subjectParty: "both"`를 적용했습니다.
   - 원본 증거의 소유 당사자는 다르지만,
   - 플레이 감각상 "한 카드로 양측을 각 1회씩 겨냥"하는 쪽이 더 선명하다고 판단했습니다.

3. stateUnlockAtoms는 기존 V2 atom을 교체하지 않고 **가산(additive)** 하는 구조로 작성했습니다.
   - S2: 구조적 사실 / 숨겨진 연결고리
   - S3: 왜곡/전가가 세지는 구조적 이유
   - S4: 감정·수치심·두려움
   - S5: 전면 인정/시인

4. transitionBeats는 기존 BeatScript 스키마를 그대로 쓰기보다,
   엔진 강제 삽입에 맞춰 `fromState`, `toState`, `primaryBeatType`, `secondaryBeatType`를 추가했습니다.

## 구현시 권장 사용법
- dossier question 성공 시:
  1) `blockVector` 적용
  2) `revealAtom`이 있으면 해당 stateUnlockAtom 큐에 추가
  3) `lieAdvance`가 true이면 현재 dispute lieState advance 후보로 등록

- stateUnlockAtom은 해당 state 최초 진입 턴에 우선 소진하는 것이 좋습니다.
  같은 state에서 반복 질문이 들어와도 새 원자를 먼저 쓰면 "깊어지는 느낌"이 강해집니다.

- transitionBeat는 일반 beat보다 우선순위를 높여 1회 강제 삽입하는 용도로 권장합니다.
