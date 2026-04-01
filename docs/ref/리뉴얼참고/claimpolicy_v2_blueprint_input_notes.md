# ClaimPolicyV2 / ResponseBlueprint 입력 스키마 요약

## 핵심 변경점

1. `ClaimPolicy.publicClaim: string[]`를 주 발화 데이터로 쓰지 않습니다.
2. 새 주 데이터는 `claimAtoms: ClaimAtom[]`입니다.
3. `ResponseBlueprint.allowedClaimAtoms` / `forbiddenClaimAtoms`는 더 이상 한국어 문장이 아니라 `ClaimAtom.id[]`입니다.
4. 숫자/호칭/이름/증거명은 atom 안의 `slots`로 분리합니다.
5. `subAction`은 stance 보정 이전에 **atom 선택 규칙**으로 먼저 적용합니다.

## 최소 마이그레이션 규칙

- `claimAtoms`가 있으면 V2 경로 사용
- `claimAtoms`가 없고 `publicClaim`만 있으면 legacy 합성 atom 생성
- legacy 합성 atom은 `compatMode='legacy'`로 표기
- V2 경로에서는 `publicClaim` 문자열을 prompt에 넣지 않음

## subAction 우선 태그

- `fact_pursuit` → `act`, `timeline`, `rule`
- `motive_search` → `motive`, `self_justification`, `responsibility`
- `empathy_approach` → `emotion`, `fear`, `shame`, `relationship`
- `evidence_present` → `evidence`, `context`, `identity`, `quote`

## slot 기본 surface

- `fact_pursuit`: amount/time = neutral
- `motive_search`: amount/time = neutral
- `empathy_approach`: amount/time = neutral, relation/person = judgeRef
- `evidence_present`: evidence = fullName, message = quoteShort, amount/time = exact 허용
- `mustUseTell = over_precision | receipt_stack`일 때만 amount/time exact 승격 권장

## 구현 순서 권장

1. `normalizeClaimPolicyV2()`
2. `buildBlueprintAtomPlan()`
3. `resolveSlotSelections()`
4. 기존 `ResponseBlueprint` 생성
5. promptBuilder에서 atom id + slotSelections로 최종 surface 조립
