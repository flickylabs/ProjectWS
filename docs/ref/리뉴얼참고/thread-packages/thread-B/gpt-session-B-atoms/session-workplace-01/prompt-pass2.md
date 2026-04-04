# [Session B-2 Pass 2] workplace-01 narrative 필드 교정

## 상황
1차 교정에서 `claimAtoms`(factText + slots)는 완벽하게 교정되었습니다.
그런데 같은 상태 객체 안의 **narrative 필드**가 교정되지 않았습니다.

이 필드들(`publicClaim`, `privateKnowledge`, `suppressions`)은 LLM 프롬프트에 직접 주입되어
NPC 대사 생성의 맥락이 됩니다. 따라서 동일한 Progressive Truth Throttle 규칙이 적용되어야 합니다.

## 이 폴더의 파일
- **workplace-01-v2-atoms-corrected.json** (output 폴더 안) — 1차 교정 결과. 이 파일을 기반으로 2차 교정.

## 작업
`workplace-01-v2-atoms-corrected.json`의 S0/S1/S2 상태에서
`publicClaim`, `privateKnowledge`, `suppressions` 배열의 텍스트를 교정하세요.

**교정 대상이 아닌 것:**
- `claimAtoms` — 이미 교정 완료, 건드리지 마세요
- S3/S4/S5의 모든 필드 — 원본 유지
- `tellPool` — 원본 유지

## 교정 규칙 (narrative 필드용)

### S0-S1
| 금지 | 교정 후 |
|------|---------|
| "박서윤" | "상대방" 또는 "그 실무자" |
| "윤태성" | "상대방" 또는 "그 팀장" (맥락에 따라) |
| "이지안" | "해당 담당자" |
| "HR" | "해당 부서" |
| "박 대리" | "그 실무자" |
| "윤 팀장" | "그 팀장" |
| "보고서 오너" | "주도 역할" 또는 "실무 담당자" |
| "실무 기여자 병기 관행" | "해당 관행" |
| "인사 정보 비공개 원칙" | "해당 원칙" |
| "슬랙" | "해당 채널" |
| "23시 48분", "20시 17분", "23시 41분" | "그 시간" 또는 "늦은 시간" |
| "새벽 1시대" | "늦은 시간" |
| "문서 수정 이력 PDF" | "해당 자료" |
| "HR 평가 초안 버전기록" | "해당 기록" |

### S2
| 금지 | 교정 후 |
|------|---------|
| 실명 (박서윤, 윤태성, 이지안) | 성씨만 ("박 씨", "윤 씨") 또는 "상대방" |
| "HR" | "해당 부서" |
| 구체적 시간 | "그때" |

## 잔존 위반 목록 (25건)

### Side A
| 위치 | 필드 | 금지어 |
|------|------|--------|
| a/d-1/S0 | publicClaim, privateKnowledge | "박서윤" |
| a/d-1/S1 | publicClaim, privateKnowledge | "박서윤" |
| a/d-1/S2 | publicClaim, privateKnowledge | "박서윤" |
| a/d-2/S0 | privateKnowledge, suppressions | "박서윤", "HR" |
| a/d-2/S1 | publicClaim, privateKnowledge | "박서윤" |
| a/d-2/S2 | publicClaim, suppressions | "박서윤" |
| a/d-3/S0 | publicClaim, privateKnowledge | "박서윤" |
| a/d-3/S1 | publicClaim | "박서윤" |
| a/d-4/S0 | privateKnowledge, suppressions | "HR" |
| a/d-4/S1 | publicClaim, privateKnowledge | "HR" |
| a/d-4/S2 | publicClaim, suppressions | "HR" |
| a/d-5/S0 | publicClaim | "실무 기여자 병기 관행" |

### Side B
| 위치 | 필드 | 금지어 |
|------|------|--------|
| b/d-1/S0 | publicClaim, privateKnowledge | "윤태성" |
| b/d-1/S1 | publicClaim | "윤태성" |
| b/d-2/S0 | suppressions | "새벽 1시대" |
| b/d-3/S0 | publicClaim | "20시 17분" |
| b/d-4/S0 | privateKnowledge, suppressions | "HR", "보고서 오너" |
| b/d-4/S1 | publicClaim | "HR" |
| b/d-4/S2 | publicClaim, suppressions | "HR" |

## 산출물
- 교정된 전체 JSON 출력
- `claimAtoms`는 1차 교정 결과 그대로 유지
- S3+ 전체 원본 유지
- S0/S1/S2의 `publicClaim`, `privateKnowledge`, `suppressions`만 교정
