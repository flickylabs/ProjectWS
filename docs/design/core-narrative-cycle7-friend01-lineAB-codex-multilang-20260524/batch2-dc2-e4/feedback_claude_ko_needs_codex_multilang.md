---
name: feedback-claude-ko-needs-codex-multilang
description: Claude가 작성/수정한 KO 텍스트는 즉시 Codex 다국어 sync 의뢰서 작성 필수. EN/JA/ZH-CN unchanged로 두면 사용자 지적 발생.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 075fb4fb-73db-4b46-ab67-88de2937f6c5
---

## 규칙

Claude(CT main thread)가 KO 텍스트(i18n 키 / 인라인 KO / ScriptedText KO 등)를 작성하거나 수정한 경우, **commit과 동시에 또는 직후에 EN/JA/ZH-CN 3언어 sync Codex 의뢰서를 작성 + commit**.

KO 단일 변경 후 "EN/JA/ZH-CN unchanged"로 두면 안 됨.

## Why

2026-05-19 PC QA round 2 후속 LQA β 결과 적용 시 P0+P1 batch (commit `64724457`)에서 KO만 polish하고 EN/JA/ZH-CN sync 누락 → 사용자 지적 "네가 직접 작성/수정한 텍스트들은 Codex에서 다국어 번역이 필수인거 알지?". 사용자는 다국어 출시 (KO/EN/JA/ZH-CN 4언어) 운영 중. KO 단독 변경은 항상 4언어 정합 깨짐을 의미. Codex thread가 다국어 번역 처리 역할이라 의뢰서 form으로 넘기는 게 표준 흐름.

## How to apply

### 적용 시점
- KO 변경 commit 직후 (즉시 follow-up commit으로 의뢰서 작성)
- 또는 KO 변경 commit 자체에 의뢰서를 묶음

### 의뢰서 작성 항목 (다국어 sync 영역만 별도 의뢰서 또는 후속 batch 의뢰서의 sub-section)
- 변경된 키/ID 일람 (KO baseline)
- 각 키별 EN/JA/ZH-CN 현재 텍스트 표
- "의미 변경 여부 + sync 필요 여부" 표시 (Codex 검토 후 패스 가능 영역 명시)
- 검증 명령어 (tsc / qa:fast / qa:lqa)

### 예외
- 한국어 자연 표현 polish만 적용했고 EN/JA/ZH-CN 의미가 이미 자연/등가인 경우 — Codex 검토 후 패스 가능 영역으로 명시 (의뢰서에는 일람 포함, 적용은 Codex 판단)
- 인라인 KO 하드코딩 컴포넌트 (예: DiscoveryFeedbackWatcher.tsx / Phase6_Mediation.tsx) — i18n 키 추출 자체가 별도 작업이라 의뢰서에 (a) PC가 KO-only 전제인지 (b) i18n 추출 필요 영역인지 결정 요청

## 사례 - 2026-05-19 LQA β 적용

- commit `64724457` = KO P0 3건 + P1 22건 polish (Discovery / Phase6_Mediation / court.ts / layout.ts / hotbar.ts / tutorial.ts / scriptedText motive_search). 단 KO만 적용.
- 직후 사용자 지적 → commit `0cecfde9` = `docs/localization/pc-qa-round2-followup-batch.md` 작성. 영역 1 = 다국어 sync 의뢰서로 보강.
- 정정: i18n 키 변경 + ScriptedText 변경은 4언어 sync 표준. 인라인 KO는 (a)/(b) 결정 첨부.

## 관련 메모리

- [[feedback-gpt-pro-claude-review]] — GPT Pro 산출물 Claude 보정 (다른 방향: GPT → Claude)
- [[feedback-translation-pipeline-placeholder-leak]] — KO 메타질문 토픽 추출 실패 시 외국어 회귀 (4언어 동시 회귀 사례)
- [[feedback-natural-korean-vs-translationese]] — KO 자연성 정책 (KO polish의 baseline)
- [[session-handoff-20260519-pc-qa-round2]] — 본 사례 컨텍스트
