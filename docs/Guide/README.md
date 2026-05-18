# Guide — 작업 가이드 / 운영 매뉴얼 모음

작성일: 2026-05-18

이 폴더는 **실제 작업·운영·QA 절차를 다루는 가이드 문서**의 인덱스입니다.
의뢰서 / 디자인 결정 / 정책 문서와 구분됩니다.

## 이 폴더 안 (물리 이동 완료)

| 문서 | 영역 | 주 사용 시점 |
|---|---|---|
| [oracle-cloud-setup.md](oracle-cloud-setup.md) | 출시 인프라 | Steam 출시 텔레메트리 백엔드 셋업 (1회 2~4시간) |
| [pc-qa-checklist-tutorial-impact.md](pc-qa-checklist-tutorial-impact.md) | QA | PC dev에서 튜토리얼 + 임팩트 5비트 시각 확인 절차 |
| [gpt-pro-workflow-guide.md](gpt-pro-workflow-guide.md) | 다국어 번역 | GPT Pro Project 활용 19k+ 행 번역 5단계 워크플로우 |

## 관련 가이드 (현 위치 유지 — 다수 문서가 참조)

### 다국어 / 번역
- [docs/localization/style-guide.md](../localization/style-guide.md) — 4언어 번역 스타일 가이드
- [docs/localization/script-localization-architecture.md](../localization/script-localization-architecture.md) — 스크립트 다국어 아키텍처
- [docs/localization/thread-brief-template.md](../localization/thread-brief-template.md) — 번역 스레드 brief 템플릿
- [docs/localization/non-dialogue-extract/gpt-pro-translation-brief.md](../localization/non-dialogue-extract/gpt-pro-translation-brief.md) — 번역 brief (GPT Pro 첨부용)
- [docs/localization/non-dialogue-extract/codex-glossary-and-batch-task.md](../localization/non-dialogue-extract/codex-glossary-and-batch-task.md) — 용어집 + 배치 추출 의뢰서

### 케이스 생성
- [docs/case-generation/quality-rules.md](../case-generation/quality-rules.md) — 케이스 품질 규칙
- [docs/case-generation/regeneration-policy.md](../case-generation/regeneration-policy.md) — 재생성 정책
- [docs/case-generation/scripted-text-channels.md](../case-generation/scripted-text-channels.md) — 스크립트 채널 가이드
- [docs/case-generation/session-first-case-guide.md](../case-generation/session-first-case-guide.md) — 세션 first 케이스 생성 절차
- [docs/case-generation/schemas.md](../case-generation/schemas.md) — 케이스 데이터 스키마
- [docs/case-generation/scripted-text-channels.md](../case-generation/scripted-text-channels.md) — 스크립트 채널 가이드

### 다국어 진행 현황 / 배치
- [docs/localization/non-dialogue-extract/batches/PROGRESS.md](../localization/non-dialogue-extract/batches/PROGRESS.md) — 22 batch 상태 일람

## Guide vs 다른 폴더

| 구분 | 포함 내용 | 위치 |
|---|---|---|
| **Guide** (이 폴더) | 작업/운영/QA 절차 가이드. how-to |
| design/`*-task.md` | Codex 의뢰서. 1회성 task 명세 | docs/design/* |
| design/decisions/storyboard | 디자인 결정 기록 | docs/design/* |
| localization-plan.md | 다국어 마스터 플랜 (overview) | docs/ |
| LEGACY | 폐기된 과거 문서 | docs/LEGACY/* |

## 신규 가이드 추가 규칙

- **사용/운영 절차**: 이 폴더에 둠
- **1회성 의뢰서/계획**: docs/design/* 또는 docs/*에 둠
- **케이스/번역 영역 종속 절차** (예: spouse-01 특정 QA): 영역 폴더 안 둠
- **인덱스 업데이트**: 신규 가이드 추가 시 본 README의 "이 폴더 안" 표에 등록
