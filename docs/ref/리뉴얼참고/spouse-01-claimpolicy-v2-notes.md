# spouse-01 ClaimPolicyV2 atom 데이터 메모

- 파일: `spouse-01-claimpolicy-v2-atoms.json`
- 범위: 한지석(a) d-1/d-3/d-5 + 오세린(b) d-2/d-4/d-5 × 6상태
- 총 상태 수: 36
- 총 inline atom 수: 155

## 작성 원칙
- `claimAtoms`는 완성 대사문이 아니라 의미 원자만 담았습니다.
- exact 숫자/호칭은 `slots`로 분리했습니다.
- 기존 Session 1의 `publicClaim`은 `fallbackPublicClaim`으로 보존했습니다.
- `privateKnowledge / suppressions / emotionalLeakRisk / tellPool`은 Session 1 의미를 유지했습니다.
- shared dispute인 d-5는 충돌 방지를 위해 atom id를 `d5a.* / d5b.*`로 분리했습니다.

## 주의
- 일부 confession 계열 atom은 evidence가 없어도 신뢰 붕괴만으로 사용할 수 있도록 `requiresEvidenceIds`를 과도하게 걸지 않았습니다.
- `usableInSubActions`는 강하게 제한해야 하는 atom에만 부분적으로 부여했습니다.
- 현재 파일은 V2 경로 기준입니다. 구 경로 fallback이 필요하면 `fallbackPublicClaim`을 사용하면 됩니다.
