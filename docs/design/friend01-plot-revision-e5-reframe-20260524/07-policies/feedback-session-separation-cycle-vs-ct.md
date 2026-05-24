---
name: feedback-session-separation-cycle-vs-ct
description: Cycle 세션(narrative wrapper 8단계 전용) vs CT 세션(일상 개발/QA/버그/UI/즉시 요청) 분리 운영 권위. 세션마다 자기 역할 명확히 인지 + 영역 외 요청 거절·안내.
metadata:
  node_type: memory
  type: feedback
  originSessionId: cycle2-spouse01-money-line-complete
---

## 규칙

본 프로젝트는 두 종류 세션을 **분리 운영**:

### Cycle 세션

- **역할**: Core narrative wrapper cycle 1개를 8단계로 완료. 단일 사건 단일 line 깊이 집중.
- **수명**: cycle 1개 = 세션 1개 (완료 시 핸드오프 작성 + 이관)
- **진입 시 정독**: cycle 권위 메모리 ([[design_core_narrative_cycle_procedure]] / [[feedback_new_dispute_evidence_narrative_justification]] / [[design_narrative_cascade_from_card]] / 해당 사건 truth disclosure 정책) + 직전 cycle 핸드오프
- **작업 범위**:
  - `src/data/coreCases/*.narrative.ts` (narrative spec)
  - `src/data/coreCases/*.case.ts` 의 `narrativeTriggers` field 부착
  - `src/data/scriptedText/*.{json,en.json,ja.json,zh-CN.json}` 의 `channels.emergence_narrative` (KO + 외국어)
  - `src/engine/narrative*.ts` (runtime path, 필요 시)
  - `src/store/slices/narrativeSlice.ts` (필요 시)
  - cycle 의뢰서 폴더 (GPT Pro / Codex)
- **영역 외 요청 처리**: 거절 + "CT 세션에서 처리 권장" 안내. cycle 흐름 방해 회피.

### CT 세션 (Continuous Testing / Code Tasks)

- **역할**: narrative cycle 외 모든 일상 개발/QA 영역. 광범위 + 즉시 대응.
- **수명**: 영구 (사용자 명시 종료 시까지). 즉시 요청 받을 때마다 운영.
- **진입 시 정독**: 해당 요청 도메인 메모리 (UI / 다국어 / QA / 런타임 / 검증 script 등)
- **작업 범위**:
  - UI/UX 컴포넌트 수정 / 신규 추가
  - 버그 fix (runtime / build / linting / 사용자 보고)
  - 다국어 sync 외 일상 보정 (cycle 외 channel polish)
  - QA 검증 script 개선 / 신규 gate 추가 / qa:fast 점검
  - 출시 전 점검 (`feedback_ct_audit_before_request` 권위 — LLM/API/env/secret literal/debug 사전 grep)
  - 사용자 즉시 요청 (긴급 영역 우선)
  - cycle 작업 중 발견된 곁가지 fix 영역 위임 받기 (cycle 세션이 명시적 위임 보낼 때)
- **영역 외 요청 처리**: narrative cycle 작업 요청 들어오면 거절 + "Cycle 세션 시작 권장" 안내. cycle 세션 진입 1줄 template 제공.

## Why

본 프로젝트의 narrative wrapper cycle은 한 cycle = 본 세션 정도의 작업량 (5+ 메모리 정독 + 런타임 구현 + 외부 도구 의뢰 + 사후 통합 + 메모리 갱신). cycle 한 개 진행 중 일상 영역 요청 (예: 버그 fix, UI 개선)을 받으면:

- Cycle 진행 흐름 깨짐 → 8단계 절차 누락 위험 (Cycle 2 시점 qa:fast 누락 사고 사례)
- Context 압박 가속 → 자동 압축으로 cycle 권위 메모리 손실 위험
- 두 영역 모두 정밀도 저하

사용자 권위 (2026-05-24):
> "CT 역할용 세션과 Cycle 진행 세션을 따로 운영해야 돼? 모든 사건들의 트리거 생성 후에도 계속 CT가 필요한데 지금은 딱 트리거 생성에만 집중하고 다른건 잊는게 아닌가 싶어서"

→ 사용자가 분리 운영의 필요성을 명시. cycle 작업은 완결 후에도 일상 영역은 계속됨.

## How to apply

### Cycle 세션 응답 패턴

영역 외 요청 들어오면:

> "본 세션은 Cycle N (사건/line) narrative wrapper 전용입니다. 요청하신 [영역] 작업은 CT 세션에서 처리 권장합니다 ([[feedback_session_separation_cycle_vs_ct]] 권위). 새 Claude Code 세션 열어 다음 한 줄 보내시면 CT 세션 시작됩니다: '[요청 내용]'."

### CT 세션 응답 패턴

narrative cycle 작업 요청 들어오면:

> "본 세션은 CT (일상 개발/QA) 전용입니다. narrative wrapper cycle 작업은 별도 Cycle 세션 권장합니다 ([[feedback_session_separation_cycle_vs_ct]] 권위). 새 Claude Code 세션 열어 다음 한 줄 보내시면 Cycle 세션 시작됩니다: '[cycle 진입 한 줄]'."

### 두 세션 동시 운영 시 주의

- 같은 working tree에서 두 Claude Code 세션 동시 운영 가능 (작업 영역 거의 안 겹침)
- 단 **두 세션이 동시에 같은 file 수정 X** — git tracked dirty 상태에서 두 번째 세션 commit 시도하면 ([[feedback_shared_worktree_no_parallel_with_dirty]] 권위) 충돌
- 한 세션이 작업 시작하면 다른 세션은 그 영역 회피
- 명확한 영역 분리: cycle = `narrative.ts` + `scriptedText.json` (emergence_narrative channel) / CT = 그 외 모두

### Cycle 세션이 CT에 위임할 때

Cycle 작업 중 곁가지 fix 영역 발견 시 cycle 세션은 직접 처리 X. 대신:

1. cycle 세션이 메모리에 "위임 영역" 1줄 기록 (간단한 backlog)
2. 사용자에게 보고 ("Cycle 작업 중 [영역] 발견, CT 세션 위임 권장")
3. cycle 완료 후 사용자가 CT 세션 열어 처리

곁가지 즉시 fix가 cycle 메모리/build/검증 영역에 영향 주는 P0/P1 영역이면 예외적으로 cycle 세션 내 처리 가능 (Cycle 2 시점 KO P0 5건 fix 사례 — cycle 사후 통합의 일부로 봄).

## 관련 메모리

- [[design_core_narrative_cycle_procedure]] — Cycle 세션의 8단계 절차 권위
- [[feedback_ct_audit_before_request]] — CT 세션 출시 전 audit
- [[feedback_shared_worktree_no_parallel_with_dirty]] — 두 세션 동시 운영 시 git 충돌 회피
- [[session_handoff_20260524_cycle2_complete]] — 본 권위 등재 cycle (Cycle 2 종료 시점)
