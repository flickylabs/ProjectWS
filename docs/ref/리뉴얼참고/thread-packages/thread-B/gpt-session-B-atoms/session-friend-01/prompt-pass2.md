# [Session B-5 Pass 2] friend-01 narrative 필드 교정

## 상황
1차 교정에서 `claimAtoms`(factText + slots)는 완벽하게 교정되었습니다.
그런데 같은 상태 객체 안의 **narrative 필드**에 "김수아" 실명이 15건 잔존합니다.

이 필드들(`publicClaim`, `privateKnowledge`, `suppressions`)은 LLM 프롬프트에 직접 주입되어
NPC 대사 생성의 맥락이 됩니다. 따라서 동일한 Progressive Truth Throttle 규칙이 적용되어야 합니다.

## 이 폴더의 파일
- **friend-01-v2-atoms.corrected.json** (output 폴더 안) — 1차 교정 결과. 이 파일을 기반으로 2차 교정.

## 작업
`friend-01-v2-atoms.corrected.json`의 S0/S1/S2 상태에서
`publicClaim`, `privateKnowledge`, `suppressions` 배열의 텍스트를 교정하세요.

**교정 대상이 아닌 것:**
- `claimAtoms` — 이미 교정 완료, 건드리지 마세요
- S3/S4/S5의 모든 필드 — 원본 유지
- `tellPool` — 원본 유지

## 교정 규칙 (narrative 필드용)

### S0-S1
| 금지 | 교정 후 |
|------|---------|
| "김수아" | "제3자" 또는 "그 친구" |
| "서도윤" | "상대방" |
| "정하린" | "상대방" |
| "박은지" | "숙소 측" |
| "인스타그램 스토리" | "해당 플랫폼" |
| "정산 앱" | "정산 도구" |
| 구체적 금액 (92,000원 등) | "해당 금액" |

### S2
| 금지 | 교정 후 |
|------|---------|
| "김수아" | "제3자" 또는 "그 친구" |
| 기타 실명 | 성씨만 ("서 씨", "정 씨") 또는 "상대방" |

## 잔존 위반 목록 (15건 — 전부 "김수아")

### Side A
| 위치 | 필드 | 텍스트 (발췌) |
|------|------|--------------|
| a/d-1/S0 | suppressions[1] | "김수아에게 먼저 상계 얘기를 꺼낸 사실" |
| a/d-1/S1 | suppressions[1] | "김수아에게 먼저 상계 얘기를 꺼낸 사실" |
| a/d-1/S2 | privateKnowledge[0] | "김수아" 포함 |
| a/d-2/S2 | publicClaim[0], suppressions[1] | "김수아" 포함 |
| a/d-5/S0 | privateKnowledge[1] | "김수아에게 먼저 말한 사실이 들키면..." |
| a/d-5/S0 | suppressions[0] | "김수아에게 상계 얘기를 먼저 꺼낸 사실" |
| a/d-5/S1 | publicClaim[0] | "김수아에게 말한 건 맞다..." |
| a/d-5/S1 | privateKnowledge[1] | "김수아에게 먼저 말한 사실이..." |
| a/d-5/S1 | suppressions[0] | "김수아에게 상계 얘기를 먼저 꺼낸 사실" |

### Side B
| 위치 | 필드 | 텍스트 (발췌) |
|------|------|--------------|
| b/d-2/S0 | publicClaim[1] | "김수아에게 보낸 것도..." |
| b/d-2/S0 | suppressions[1] | "김수아에게 보낸 순간 이미 제3자 확산이라는 점" |
| b/d-2/S1 | suppressions[1] | "김수아에게 보낸 순간 이미 제3자 확산이라는 점" |
| b/d-5/S1 | publicClaim[0] | "원본 전에 김수아에게 캡처를 보내고..." |
| b/d-1/S2 | privateKnowledge[0] | "김수아" 포함 |

## 산출물
- 교정된 전체 JSON 출력
- `claimAtoms`는 1차 교정 결과 그대로 유지
- S3+ 전체 원본 유지
- S0/S1/S2의 `publicClaim`, `privateKnowledge`, `suppressions`에서 "김수아" → "제3자"/"그 친구"로 교체
