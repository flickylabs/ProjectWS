# [Session B-3 Pass 2] partnership-01 narrative 필드 교정

## 상황
1차 교정에서 `claimAtoms`(factText + slots)는 완벽하게 교정되었습니다.
그런데 같은 상태 객체 안의 **narrative 필드**가 교정되지 않았습니다.

이 필드들(`publicClaim`, `privateKnowledge`, `suppressions`)은 LLM 프롬프트에 직접 주입되어
NPC 대사 생성의 맥락이 됩니다. 따라서 동일한 Progressive Truth Throttle 규칙이 적용되어야 합니다.

## 이 폴더의 파일
- **partnership-01-v2-atoms-corrected.json** (output 폴더 안) — 1차 교정 결과. 이 파일을 기반으로 2차 교정.

## 작업
`partnership-01-v2-atoms-corrected.json`의 S0/S1/S2 상태에서
`publicClaim`, `privateKnowledge`, `suppressions` 배열의 텍스트를 교정하세요.

**교정 대상이 아닌 것:**
- `claimAtoms` — 이미 교정 완료, 건드리지 마세요
- S3/S4/S5의 모든 필드 — 원본 유지
- `tellPool` — 원본 유지

## 교정 규칙 (narrative 필드용)

### S0-S1
| 금지 | 교정 후 |
|------|---------|
| "윤해나", "해나" | "상대방" |
| "이서준", "서준" | "상대방" |
| "정민우" | "해당 전문가" |
| "법무사" | "해당 전문가" 또는 "법률 쪽" |
| "세무사" | "세무 쪽 담당자" |
| "신탁계좌" | "해당 계좌" |
| "브리지 투자" | "해당 투자건" |
| "공동승인 토큰" | "해당 절차" |
| "1,800만원" | "해당 금액" |
| "2,000만원" | "그 한도" |
| "320만원" | "해당 비용" |
| "9월 3일" | "그 기한" |

### S2
| 금지 | 교정 후 |
|------|---------|
| "해나", "서준" (이름만) | 성씨만 ("윤 씨", "이 씨") 또는 "상대방" |
| "세무사" | "세무 쪽 담당자" |
| 구체적 금액 | "해당 금액" |

## 잔존 위반 목록 (26건)

### Side A
| 위치 | 필드 | 금지어 |
|------|------|--------|
| a/d-1/S0 | publicClaim | "브리지 투자", "공동승인 토큰" |
| a/d-1/S0 | privateKnowledge | "신탁계좌", "법무사" |
| a/d-1/S0 | suppressions | "1,800만원" |
| a/d-1/S1 | publicClaim | "신탁계좌" |
| a/d-1/S1 | privateKnowledge | "9월 3일", "정민우", "법무사" |
| a/d-2/S0 | publicClaim, privateKnowledge | "법무사", "신탁계좌" |
| a/d-2/S1 | publicClaim, suppressions | "법무사" |
| a/d-3/S0 | publicClaim | "2,000만원" |
| a/d-3/S1 | privateKnowledge | "2,000만원" |
| a/d-4/S0 | publicClaim, suppressions | "세무사" |
| a/d-4/S1 | publicClaim | "세무사" |
| a/d-5/S0 | publicClaim | "320만원" |

### Side B
| 위치 | 필드 | 금지어 |
|------|------|--------|
| b/d-1/S0 | publicClaim | "1,800만원", "서준" |
| b/d-1/S0 | suppressions | "서준" |
| b/d-1/S1 | publicClaim | "서준" |
| b/d-1/S2 | publicClaim | "서준" |
| b/d-4/S0 | publicClaim, suppressions | "세무사" |
| b/d-4/S1 | suppressions | "세무사" |
| b/d-5/S0 | publicClaim | "320만원" |
| b/d-5/S1 | publicClaim | "320만원" |

## 산출물
- 교정된 전체 JSON 출력
- `claimAtoms`는 1차 교정 결과 그대로 유지
- S3+ 전체 원본 유지
- S0/S1/S2의 `publicClaim`, `privateKnowledge`, `suppressions`만 교정
