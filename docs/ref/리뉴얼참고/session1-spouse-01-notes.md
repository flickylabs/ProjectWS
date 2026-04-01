# Session 1 생성 메모

- 출력 파일은 `session1-spouse-01-claimpolicy-bridge-evidencechallenge.json`
- ClaimPolicy는 요청 상단의 `60개 항목` 요구에 맞춰 **양측 × 5개 dispute × 6상태** 전체를 채웠습니다.
- 다만 사건 원본의 lieConfig는 A(d-1,d-3,d-5) / B(d-2,d-4,d-5)만 직접 추적하므로, 나머지 dispute의 ClaimPolicy/Bridge는 엔진에서 필요 시 참고용 보조 레이어로 사용하면 됩니다.
- RuntimeStartBridge는 계획서 정의에 맞춰 **양측 × 모든 dispute = 10항목**으로 작성했습니다.
- EvidenceChallenge는 원본 evidence 6개 각각에 대해 생성했습니다.
