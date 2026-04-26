# Codex Recovery v3 Final Report

## 핵심 결론
- v2의 핵심 오류는 `truth lexeme == leak`로 본 점입니다.
- 올바른 기준은 `channel x stage x speaker`입니다.
- NPC S3+/late/stage3의 자기 가족/자기 사정 발화는 누설이 아니라 자백 진행이며, 게임 메커니즘입니다.
- v3에서는 strict 채널 외 NPC/aftermath 변경을 HEAD 원문으로 복원했습니다.

## 처리 범위
- 대상: `spouse-01`, `family-01`, `friend-01`
- case data 수정: 없음
- 코드 fallback / d-5 신규 cell: 범위 밖
- commit/push: 없음

## 분류 결과
- v3 시작 시 current-vs-HEAD effective diff: 751 variants
- A 보존: 397
  - 재판관 4채널, `system_message`, `mediation`, `evidence_discovery`
- B 롤백: 257
  - NPC S3+/late/stage3 및 aftermath 보존 구간
- C 재검토 후 롤백: 97
  - NPC S0/S1/S2/early/mid 또는 stage 미표시 구간
  - 검토 중 `균그쪽`, `해지 서류을`, `제 그 가족`, `중학생 그 가족`류 자동 변환 손상이 확인되어 원문 복원

이전 final-hardening runner가 중간 patch 파일을 덮어써서 877개 patch 전체의 개별 레코드는 완전 복구할 수 없었습니다. 대신 `patch-categorization.json`에는 회수 가능한 patch records와 권위 기준인 current-vs-HEAD effective diff 분류를 함께 기록했습니다.

## 적용 결과
- rollback 적용: 354 variants
  - B: 257
  - C: 97
- strict-channel surface cleanup: 5 fields
- 최종 remaining diff: 396 variants, 모두 A
- 최종 non-strict changed variants: 0
  - spouse-01: 0
  - family-01: 0
  - friend-01: 0

## 검증
- `node tmp/codex-recovery-v3/precheck-stage-aware.cjs`: PASS
- variant count: spouse 4,677 / family 5,172 / friend 5,082 / total 14,931
- archetype voice audit: PASS, missing 0
- unnatural surface token scan: 0 hits
- `npm run build`: PASS
- `npx tsc -b --force`: PASS

## 산출물
- `patch-categorization.json`
- `rollback-applied.json`
- `channel-stage-matrix.json`
- `precheck-stage-aware.cjs`
- `precheck-stage-aware.json`
- `archetype-voice-audit.json`
- `strict-surface-cleanup.json`
- `final-validation-v3.json`

## 재발 방지 메모
- A_TruthLeak은 keyword detector가 아니라 stage-aware policy detector여야 합니다.
- NPC 발화는 `variant.id`, `entry.key`, `lieState`, `lieBand`, `truthLevel`, `stageN` marker를 먼저 판정해야 합니다.
- `S3+`, `late`, `stage3`, aftermath는 truth lexeme을 보존해야 합니다.
- strict scan은 보조 검증일 뿐이며, 완료 기준은 stage-aware matrix에서 non-strict changed variants가 0인지입니다.
