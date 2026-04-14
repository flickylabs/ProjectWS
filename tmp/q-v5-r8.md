# Q V5 R8

- Phase: `B / 엔진 코드 리뷰`
- 대상: `증인 세션 해석기`
- 수행: heardSlots, prevSlotRequired, prevChoiceRequired, summonCount 갱신 로직 검토
- 근거: `src/engine/witnessTestimonyResolver.ts:60`, `src/engine/witnessTestimonyResolver.ts:65`, `src/engine/witnessTestimonyResolver.ts:77`, `src/engine/witnessTestimonyResolver.ts:98`
- 판정: `PASS`
- 메모: 선행 슬롯/선택 필터와 다음 진술 존재 판정이 일관되게 동작
