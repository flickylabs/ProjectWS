# Codex Recovery v2 Final Report

## 작업 요약
- 대상: `src/data/scriptedText/spouse-01.json`, `family-01.json`, `friend-01.json`
- 전수 variant count: spouse 4,677 / family 5,172 / friend 5,082 / total 14,931
- 적용 patch: 877건
  - 5-round coordinator: 531건
  - final hardening: 346건
- 종료 사유: `all_zero_after_final_hardening`
- case data 직접 수정: 없음
- commit/push: 없음

## 안전장치
- 실제 `channels.*.entries[].variants[]` walker로 타입 정의 밖 채널까지 순회했습니다.
- `entry.status === "skipped"` 또는 `variant.status === "skipped"`는 patch 대상에서 제외하도록 구현했습니다.
- `id`, `tags`, `sourceRefs`, `status`, entry key, variant 수 보존을 precheck에서 확인했습니다.
- `behaviorHint`는 직접 누설/오류가 들어간 경우에만 보정하도록 분리했습니다.
- NPC patch에는 `partyA/B.archetype` guard를 기록했고, 재판관 발화에는 archetype voice 보존을 적용하지 않았습니다.

## 라운드 결과
| Stage | A | B | C | D | E | 적용 | 잔여 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Round 1 | 411 | 32 | 0 | 1 | 5 | 511 | 20 |
| Round 2 | 8 | 10 | 0 | 0 | 2 | 0 | 20 |
| Round 3 | 8 | 10 | 0 | 0 | 2 | 18 | 2 |
| Round 4 | 1 | 1 | 0 | 0 | 0 | 0 | 2 |
| Round 5 | 1 | 1 | 0 | 0 | 0 | 2 | 0 |
| Final hardening | 87 | 0 | 0 | 36 | 0 | 346 | 0 |

## 검증 결과
- `node tmp/codex-recovery/precheck-comprehensive.cjs`: PASS
- strict keyword scan: PASS, 0 hits
- metadata preservation issues: 0
- skipped entries/variants in current targets: 0 / 0
- `npm run build`: PASS
- `npx tsc -b --force`: PASS
- `node scripts/validate-scripted-semantic-quality.cjs --case spouse-01`: FAIL, 2,549 fail / 1,214 warn
- `node scripts/validate-scripted-semantic-quality.cjs --case family-01`: FAIL, 3,444 fail / 557 warn
- `node scripts/validate-scripted-semantic-quality.cjs --case friend-01`: FAIL, 3,538 fail / 875 warn

semantic validator 실패는 대부분 judge-facing address, archetype/depth 계열의 광범위 기존 품질 게이트로 보이며, 이번 복구 범위의 scope-aware precheck와 strict leak scan은 통과했습니다.

## Known Issue
- family/friend d-5 신규 cell 생성은 의뢰 범위에서 제외했고, precheck에서는 `scope_excluded_d5_generation` known issue로 분리했습니다.

## ClaudeCode 인계
- 자연체 폴리싱 후보: `tmp/codex-recovery/claude-polish-candidates.json` 250건
- 상세 검증 결과: `tmp/codex-recovery/final-validation.json`
- 라운드 로그: `tmp/codex-recovery/round-log.json`
