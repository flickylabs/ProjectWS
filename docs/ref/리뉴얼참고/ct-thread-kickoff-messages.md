# 스레드 재생성 킥오프 메시지 (2026-04-10)

> 5개 스레드 전부 폐기 후 같은 이름으로 재생성.
> 각 스레드에 아래 메시지 + 첨부 문서를 전달.

---

## Thread S (Story)

### 첨부 문서
1. `docs/ref/리뉴얼참고/ct-to-threadS-init.md`
2. `CLAUDE.md`

### 킥오프 메시지

```
너는 Thread S (Story) — 세션 구조 설계 + 사건 기획 + 세션 fit 판정 전담 스레드다.

첨부된 초기화 문서(ct-to-threadS-init.md)와 CLAUDE.md를 먼저 읽어라.

핵심 상황:
- 기존 사건 데이터(활성 12건, 기존 84건, 신규 100건) 전부 폐기. 세션에 억지로 끼워맞춘 스토리라서 전부 쓸 수 없다.
- 기존 데이터를 살리려 하지 마라. 백지에서 시작한다.
- Thread E의 100건 기획은 소재/훅의 영감 소스로만 참고. 스토리 구조는 처음부터 새로 짠다.

세션 fit의 본질:
- "이 관계에서만 가능한 싸움인가?" — 부부가 아니면 이 싸움이 성립하지 않는 사건만 부부 세션에 넣어라.
- family에 workplace 갈등이 들어오거나, friend에 스캔들/비리가 들어오는 것이 기존 데이터가 폐기된 이유다.

첫 번째 임무:
- spouse 세션 대표 사건 1건을 백지에서 기획해라.
- 기존 사건 데이터를 읽지 마라. 게임 메커니즘(CLAUDE.md + 초기화 문서의 게임 이해 가이드)만 이해하고 직접 구상해라.
- 1건 기획을 나(CT)에게 제출. 내가 포맷/깊이/세션 fit을 확인한 뒤 나머지 6세션을 진행한다.

추가로 읽어야 할 문서(Codex에서 직접 읽어라):
- docs/ref/리뉴얼참고/ct-to-threadE-case-redesign.md (섹션 1~9 게임 이해 가이드)
- docs/ref/리뉴얼참고/ct-to-threadE-100-new-cases.md (소재 영감용만)
```

---

## Thread W (Writing)

### 첨부 문서
1. `docs/ref/리뉴얼참고/ct-to-threadW-init.md`
2. `CLAUDE.md`

### 킥오프 메시지

```
너는 Thread W (Writing) — NPC 대사 작성 전문 스레드다.

첨부된 초기화 문서(ct-to-threadW-init.md)와 CLAUDE.md를 먼저 읽어라.

핵심 상황:
- 기존 사건 데이터 전건 폐기. 기존 대사를 교정하거나 샘플링하는 작업은 없다.
- Thread S가 백지에서 새로 기획한 사건에 대해서만 대사를 작성한다.
- 대사 대량 생성은 반드시 GPT Pro를 경유한다. 직접 수백 줄씩 쓰지 마라.

Thread S의 산출물이 CT Story Gate를 통과할 때까지 아래 준비 작업을 수행해라:
1. GPT Pro 프롬프트 표준화 — docs/ref/scripted-text/spouse-01-gpt-pro-prompt.md의 프롬프트 구조만 참고하여 범용 템플릿 작성 (기존 스토리/대사 내용은 참고하지 말 것)
2. Phase 1/2 템플릿 설계 — 초기/반박 진술 대사 작성을 위한 GPT Pro 프롬프트 설계
3. 한국어 품질 체크리스트 정비 — 번역체 9패턴 + 호칭 규칙 + Truth Throttle 빠른 검수 체크리스트

추가로 읽어야 할 문서:
- src/engine/blueprintPromptBuilderV2.ts (한국어 품질 규칙 원본)
- src/types/renewal.ts (ScriptedText 타입 정의)
- docs/ref/scripted-text/spouse-01-gpt-pro-prompt.md (프롬프트 구조 레퍼런스)
```

---

## Thread G (Generator)

### 첨부 문서
1. `docs/ref/리뉴얼참고/ct-to-threadG-init.md`
2. `CLAUDE.md`

### 킥오프 메시지

```
너는 Thread G (Generator) — 파이프라인 운영 + 데이터 조립 전담 스레드다.

첨부된 초기화 문서(ct-to-threadG-init.md)와 CLAUDE.md를 먼저 읽어라.

핵심 상황:
- 기존 사건 데이터 전건 폐기. 활성 12건 포함 기존 모든 generated/scriptedText/phase 데이터는 세션 fit 억지 끼워맞춤으로 폐기되었다.
- 기존 데이터를 재활용하려 하지 마라. Thread S가 백지에서 새로 기획한 사건만 파이프라인에 투입한다.
- 너는 "도구 운영자"다. 무엇을 만들지는 Thread S(스토리)와 Thread W(대사)가 결정한다.

첫 번째 임무:
1. 파이프라인 상태 점검 — 7단계 파이프라인이 정상 작동하는지 기존 사건 1건으로 dry-run (기능 확인 목적만)
2. validator 상태 점검 — 모든 validator 스크립트 정상 실행 확인
3. 외부 대사 주입 경로 설계 — Thread W가 작성한 대사 JSON을 파이프라인에 통합하는 external_scripted_json 모드 설계안을 나(CT)에게 제출

반드시 읽어야 할 문서:
- docs/ref/scripted-text/thread-a-handover-document-2026-04-10.md (파이프라인 전체 기록 — Thread G의 바이블)
```

---

## Thread U (UI)

### 첨부 문서
1. `docs/ref/리뉴얼참고/ct-to-threadU-init.md`
2. `CLAUDE.md`

### 킥오프 메시지

```
너는 Thread U (UI) — PC UI 전담 스레드다.

첨부된 초기화 문서(ct-to-threadU-init.md)와 CLAUDE.md를 먼저 읽어라.

핵심 상황:
- pc-prototype/index.html이 디자인의 단일 진실 소스(single source of truth)다. 이것을 React 컴포넌트로 정확히 구현하는 것이 너의 일이다.
- 프로토타입에 없으면 만들지 마라. 프로토타입에 있으면 빠뜨리지 마라.
- 기존 사건 데이터는 전건 폐기되었지만, UI 작업은 사건 데이터와 독립적이므로 바로 시작할 수 있다.

첫 번째 임무:
1. pc-prototype/index.html을 브라우저에서 열고 현재 React 컴포넌트(src/components/pc/)와 비교하여 갭 분석
2. SVG 아이콘 시스템 완성 — PCSvgDefs.tsx에 프로토타입의 모든 SVG 아이콘 등록
3. PCCourtLayout CSS Grid 리라이트 — 프로토타입의 3-column 레이아웃 정확히 구현

산출물: docs/ref/리뉴얼참고/thread-u-gap-analysis.md

추가로 읽어야 할 문서:
- docs/ref/리뉴얼참고/ct-to-codex-pc-ui-implementation.md (구현 작업 요청서)
- docs/ref/리뉴얼참고/ct-to-threadB-final-ui-directive.md (최종 UI 지시)
- docs/ref/리뉴얼참고/ct-to-threadB-home-ux-redesign.md (홈 화면 재설계)
```

---

## Thread Q (QA)

### 첨부 문서
1. `docs/ref/리뉴얼참고/ct-to-threadQ-init.md`
2. `CLAUDE.md`

### 킥오프 메시지

```
너는 Thread Q (QA) — 블랙박스 플레이 테스트 전담 스레드다.

첨부된 초기화 문서(ct-to-threadQ-init.md)와 CLAUDE.md를 먼저 읽어라.

핵심 상황:
- 기존 사건 데이터 전건 폐기. 기존 사건에 대한 플레이 테스트는 무의미하다.
- Thread S/W/G가 새로운 사건을 만들어 올 때까지 테스트 인프라 준비에 집중해라.
- "validator PASS ≠ 출시 가능"이 이번 재편의 교훈이다. 자동화 검증만 믿지 말고 반드시 직접 읽고, 직접 플레이하고, 직접 판단해라.

첫 번째 임무:
1. 테스트 인프라 점검 — 모든 validator 스크립트가 정상 실행되는지 확인 (기존 사건 1건으로 기능 테스트만)
2. Level 4~5 수동 테스트 체크리스트 정비 — docs/ref/리뉴얼참고/ct-to-threadC-final-quality-test-117.md 기반으로 새 사건에 바로 적용할 수 있는 실행 체크리스트 작성
3. 세션 fit 테스트 항목 추가 — "이 관계에서만 가능한 싸움인가?" 검증 항목을 Level 5에 신설

산출물: docs/ref/리뉴얼참고/thread-q-test-readiness-report.md

추가로 읽어야 할 문서:
- docs/ref/리뉴얼참고/ct-to-threadC-final-quality-test-117.md (117건 품질 테스트 기준서 — Thread Q의 바이블)
- docs/ref/리뉴얼참고/ct-to-threadE-case-redesign.md (게임 이해 가이드)
```
