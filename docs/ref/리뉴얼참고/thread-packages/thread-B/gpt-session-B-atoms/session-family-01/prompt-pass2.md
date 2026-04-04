# [Session B-6 Pass 2] family-01 narrative 필드 교정

## 상황
1차 교정에서 `claimAtoms`(factText + slots)는 완벽하게 교정되었습니다.
그런데 같은 상태 객체 안의 **narrative 필드**에 금액/기간/인물 이름이 잔존합니다.

이 필드들(`publicClaim`, `privateKnowledge`, `suppressions`)은 LLM 프롬프트에 직접 주입되어
NPC 대사 생성의 맥락이 됩니다. 따라서 동일한 Progressive Truth Throttle 규칙이 적용되어야 합니다.

## 이 폴더의 파일
- **family-01-v2-atoms-corrected.json** (output 폴더 안) — 1차 교정 결과. 이 파일을 기반으로 2차 교정.

## 작업
`family-01-v2-atoms-corrected.json`의 S0/S1/S2 상태에서
`publicClaim`, `privateKnowledge`, `suppressions` 배열의 텍스트를 교정하세요.

**교정 대상이 아닌 것:**
- `claimAtoms` — 이미 교정 완료, 건드리지 마세요
- S3/S4/S5의 모든 필드 — 원본 유지
- `tellPool` — 원본 유지

## 교정 규칙 (narrative 필드용)

### S0-S1
| 금지 | 교정 후 |
|------|---------|
| "윤도현", "도현" | "동생" 또는 "그 사람" |
| "윤서아", "서아" | "언니" / "누나" 또는 "상대방" (맥락에 따라) |
| "조혜진" | "해당 담당자" |
| "1,800만원" | "해당 금액" 또는 "큰 금액" |
| "60만원" | "해당 금액" 또는 "밀린 비용" |
| "210만원" | "해당 비용" |
| "12일" | "며칠" |
| "간병 시작 3주 전" | "얼마 전" |
| "병원 사회복지사" | "해당 담당자" |
| "장기요양 경감" | "해당 제도" |
| "부모 관리계좌" | "그 계좌" |

### S2
| 금지 | 교정 후 |
|------|---------|
| "도현", "서아" (이름만) | "동생", "상대방" |
| 구체적 금액 | "해당 금액" |
| 기관명 | "해당 기관" |

## 잔존 위반 목록

### Side A
| 위치 | 필드 | 금지어 |
|------|------|--------|
| a/d-1/S0 | privateKnowledge[0] | "1,800만원" |
| a/d-1/S0 | suppressions[0] | "1,800만원" |
| a/d-1/S1 | publicClaim[2] | "1,800만원" |
| a/d-1/S1 | privateKnowledge[0] | "1,800만원" |
| a/d-3/S0 | privateKnowledge, suppressions | "도현" (부분 이름) |
| a/d-3/S1 | publicClaim, privateKnowledge | "도현" |
| a/d-3/S2 | publicClaim[1] | "서아" ("아버지가 '집 일은 서아가 맡아'라고...") |
| a/d-3/S2 | suppressions[2] | "도현" |
| a/d-5/S0 | privateKnowledge[1] | "1,800만원" |
| a/d-5/S0 | suppressions[0] | "1,800만원" |
| a/d-5/S1 | privateKnowledge[0] | "1,800만원" |
| a/d-5/S2 | privateKnowledge[1], suppressions[1] | "도현" |

### Side B
| 위치 | 필드 | 금지어 |
|------|------|--------|
| b/d-2/S0 | publicClaim[0] | "60만원", "12일" |
| b/d-2/S0 | privateKnowledge[0] | "60만원" |
| b/d-2/S0 | suppressions[0] | "12일" |
| b/d-2/S1 | publicClaim[0] | "60만원", "12일" |
| b/d-2/S1 | privateKnowledge[0] | "60만원" |
| b/d-4/S0 | publicClaim[0] | "210만원" |
| b/d-5/S0 | publicClaim[1] | "1,800만원" |
| b/d-5/S0 | privateKnowledge[1] | "1,800만원" |
| b/d-5/S1 | publicClaim[0] | "1,800만원" |
| b/d-5/S1 | privateKnowledge[1] | "1,800만원" |

## 산출물
- 교정된 전체 JSON 출력
- `claimAtoms`는 1차 교정 결과 그대로 유지
- S3+ 전체 원본 유지
- S0/S1/S2의 `publicClaim`, `privateKnowledge`, `suppressions`만 교정
