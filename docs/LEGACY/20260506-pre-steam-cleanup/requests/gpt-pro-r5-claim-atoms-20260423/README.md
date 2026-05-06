# GPT Pro 요청 — R5 v2-atoms 신규 생성 (2026-04-23)

## 목적
활성 3건(spouse-01/family-01/friend-01)의 **v2-atoms** 파일 신규 생성.
Thread-Q 2차 R5 WARN 해소 — "활성 3종이 `claimAtoms` 없이 legacy atom 합성에 의존" 문제.

## 현황
- 현재 활성 3건의 `v2-atoms` 파일 **부재** (런타임이 legacy atom 합성으로 대응 중)
- 결과: subAction별 문체 분기는 되지만 **근거 atom 다양성 약함** → NPC 응답 반복감
- 필요: 각 사건별 고유 claimAtoms 신규 제작

## 규모 (사건별)
| 사건 | 쟁점 수 | 추정 atom 수 | lieConfig 수 |
|------|-------|-----------|------------|
| spouse-01 | 4 (d-1, d-2, h-d3, h-d4) | ~192 | 48 (a×4×6 + b×4×6) |
| family-01 | 5 (d-1 ~ d-5) | ~240 | 60 |
| friend-01 | 5 (d-1 ~ d-5) | ~240 | 60 |
| **합계** | 14 | **~672** | **168** |

**사건별 분할**이라 각 스레드는 독립적으로 진행 가능.

---

## ★ 병렬 3-스레드 실행 방식

spouse-01 / family-01 / friend-01을 **3개의 독립 GPT Pro 스레드**에서 동시 진행합니다.

### 각 스레드 공통 "소스"에 넣을 파일 (3개)

GPT Pro 프로젝트의 공통 소스/지식 영역에 **이 3개 파일을 업로드**:

- [`common-source/quality-rules.md`](common-source/quality-rules.md) — 한국어 품질 규칙 (번역체 금지, 호칭, Truth Throttle)
- [`common-source/claim-atom-schema.md`](common-source/claim-atom-schema.md) — ClaimAtom v2 스키마 (tag/slot/stance 전수 + subAction rules + 수량 가이드)
- [`common-source/legacy-spouse-01-v2-atoms-example.json`](common-source/legacy-spouse-01-v2-atoms-example.json) — **포맷 참고용** (스토리는 다르니 무시, 구조만)

### 스레드 1 — spouse-01
| 항목 | 내용 |
|------|------|
| 스레드 폴더 | [`thread-spouse-01/`](thread-spouse-01/) |
| 첨부 파일 | `thread-spouse-01/refs/spouse-01.json` + `spouse-01-structure-v2.json` |
| 메시지 | [`thread-spouse-01/메시지.md`](thread-spouse-01/메시지.md) |
| 생성량 | 48 lieConfig × ~4 atom = **~192 atoms** |
| 캐릭터 | A=박지연(avoidant/victim_cosplay) / B=이준호(cold_logic/avoidant) |

### 스레드 2 — family-01
| 항목 | 내용 |
|------|------|
| 스레드 폴더 | [`thread-family-01/`](thread-family-01/) |
| 첨부 파일 | `thread-family-01/refs/family-01.json` + `family-01-structure-v2.json` |
| 메시지 | [`thread-family-01/메시지.md`](thread-family-01/메시지.md) |
| 생성량 | 60 lieConfig × ~4 atom = **~240 atoms** |
| 캐릭터 | A=윤태성(confrontational) / B=윤정후(affect_flattening) |

### 스레드 3 — friend-01
| 항목 | 내용 |
|------|------|
| 스레드 폴더 | [`thread-friend-01/`](thread-friend-01/) |
| 첨부 파일 | `thread-friend-01/refs/friend-01.json` + `friend-01-structure-v2.json` |
| 메시지 | [`thread-friend-01/메시지.md`](thread-friend-01/메시지.md) |
| 생성량 | 60 lieConfig × ~4 atom = **~240 atoms** |
| 캐릭터 | A=송다은(premature_summary) / B=최수민(affect_flattening) |

---

## 발송 절차

### 사전 준비 (1회)
- GPT Pro 프로젝트 공통 **소스** 영역에 `common-source/`의 3개 파일 업로드

### 각 스레드 (3회 병렬)
1. 해당 `thread-{case}/refs/` 내 파일 2개를 스레드 첨부로 업로드
2. 해당 `thread-{case}/메시지.md` 내용을 대화창에 그대로 붙여넣기
3. GPT Pro 응답(JSON 파일 또는 코드블록) 대기

---

## 출력 형식 (요청 메시지에서 강조)

**이번에는 "파일 다운로드 링크"를 우선 요구합니다** (R8 때 메시지 직접 출력으로 인한 복사 오류 방지):

1. **우선**: Code Interpreter / Python으로 JSON 파일 생성 후 다운로드 링크 제공
2. **Fallback**: Code Interpreter 사용 불가 시 메시지에 JSON 코드블록으로 출력 (설명 문장 배제)

---

## 산출물 수령

각 스레드 응답을 아래에 저장:
- `thread-spouse-01/output/spouse-01-v2-atoms.json`
- `thread-family-01/output/family-01-v2-atoms.json`
- `thread-friend-01/output/friend-01-v2-atoms.json`

---

## 후속 작업 (Claude)

1. GPT Pro 응답 → 한국어 품질 보정 (factText 번역체/메타 누출 / slot 완성도 / tag 다양성 검수)
2. 파일을 `src/data/claimPolicies/{case}-v2-atoms.json`로 배치
3. atomSelectionEngine / blueprintPromptBuilderV2가 이 파일을 읽도록 로더 연동 확인
4. `npx tsc -b --force` + `stage1-deep-audit` + 실 플레이 스팟 체크
5. 커밋
