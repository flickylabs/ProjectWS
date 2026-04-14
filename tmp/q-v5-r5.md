# Q V5 R5

- Phase: `A / Level 2`
- 대상: `3사건 공통 witness 구조`
- 수행: 증인 depth 체인, 선행 슬롯/선행 선택 종속성 점검
- 수정: `src/data/witnessTestimonyData/spouse-01.ts:183`에 `prevSlotRequired: 'w2-hd3-savings-cancel'` 추가
- 근거: `src/data/witnessTestimonyData/spouse-01.ts:174`, `src/engine/witnessTestimonyResolver.ts:60`, `src/engine/witnessTestimonyResolver.ts:65`
- 판정: `PASS`
- 메모: `w2-hd3-signature-doubt`가 depth 체인 상 독립적으로 열릴 수 있던 리스크를 제거
