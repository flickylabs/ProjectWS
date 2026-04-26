# 새 ClaudeCode CT 첫 메시지 (사용자 복사용)

> **사용 방법**: 새 ClaudeCode 스레드 시작 → 아래 박스 안 내용 그대로 복사 → 첫 메시지로 던짐
> **상황**: Tier 0/1/2 disclosure policy 시스템 정착 + 검증 wrapper 작동 중

---

```
이전 CT 이관 받아줘. 다음 파일 정독:

1. memory/MEMORY.md (인덱스)
2. memory/session_handoff_20260427_tier1_tier2_complete.md (CT 이관 최신 — Tier 0/1/2 완료)
3. memory/session_handoff_20260427_v6.md (참고 — 이전 세션 ScriptedText 627 patches, baseline 직전)
4. memory/feedback_truth_leak_prohibition.md (잘못 패턴 #9 — 진실 누설 금지)
5. memory/feedback_broad_homologous_detection.md (잘못 패턴 #11 — 광범위 동형 검출)
6. memory/feedback_static_analysis_limit.md (잘못 패턴 #12 — 정적 분석 한계)
7. memory/feedback_revision_meaning_over_form.md (잘못 패턴 #6/#7/#8)
8. memory/story_v2_confirmed_3cases.md (3건 사건 핵심)
9. memory/project_active_cases.md (활성 3건)
10. CLAUDE.md (게임 핵심 원칙 "진실은 플레이어가 직접 밝혀낸다")
11. docs/disclosure-policy.md (Tier 1 정책 본문 — 채널 / 매트릭스 / surfaceMap / 진행축)
12. baseline/pre-policy-v1/rollback-procedure.md (rollback 3옵션)

현재 상태 (origin/main = 9036a60):
- Tier 0 ✅ baseline-pre-policy-v1 anchor (a10b801)
- Tier 1 ✅ spouse/family/friend disclosure policy 모두 sample-complete
  - spouse-01: 4 dispute (d-1, d-2, h-d3, h-d4) — 19e4c4e + 6ee9690
  - family-01: 5 dispute (d-1~d-5) — 2dd17e2
  - friend-01: 5 dispute (d-1~d-5) — 396b9fa
- Tier 2 ✅ validation wrappers + npm scripts (9036a60)
  - npm run check:all PASS (truth-leak 0 / 9 layer / policy-vs-data 0 hard / md-json sync PASS)
  - 알려진 warning 157건 (surfaceName alias + dossier late entries — Codex 설계로 false positive 회피)
- baseline anchor (a10b801) 모든 데이터 회귀 X 유지
- runtime import 0건 유지
- working tree clean

분담 정착 (사용자 명시):
- ClaudeCode CT = 한국어 자연체 / 호칭 / 의미 정확성 / 정책 검수 / 우선순위 결정
- Codex = 정책 JSON / cross-check / 검증 wrapper / 게임 흐름 / 메커니즘
- 사용자 = 최종 제품 판단 / spot check / 큰 리팩토링 승인

핵심 강조 (절대 회피):
- 잘못 패턴 #1 Agent 보고 무비판 수용 X (자동 PASS = 완료 X)
- 잘못 패턴 #6 9차원 의미 정확성 (단순 어휘 교체 X)
- 잘못 패턴 #9 진실 누설 금지 (3 case 정책 정착됨)
- 잘못 패턴 #11 광범위 동형 검출 본질 (사용자 사례 = 시작점)
- 잘못 패턴 #12 정적 분석 한계 (Tier 2 wrapper도 hard/warn 분리)
- runtime import 금지 (Tier 3 진입 전)
- ScriptedText 자동 수정 X
- baseline anchor (a10b801) 회귀 X
- useActionDispatch.ts / judgeQuestionEngine.ts 대형 리팩터 X (Tier 4+ 보류)
- 인코딩: PowerShell here-string → node stdin 금지 (spouse-01 사고 학습)

다음 우선순위 (사용자 결정 영역):
1순위. 30일 안정 운영 (Tier 2 wrapper + 정책 시스템)
2순위. 사용자 게임 테스트 spot check (정책 보호막 작동 검증)
3순위. Stale identifier cleanup (별도 P4/P7-safe 작업):
  - spouse-01 v3-game-loop-data 금액축 충돌 4건 (cross-check.md 기록)
  - friend-01 game-events-v2 stale h-d3/h-d4 (cross-check.md 기록)
4순위. Tier 3 진입 검토 (LLM/Fallback Guard, feature flag default-off, 30일 안정 후)
5순위. 정책 surfaceName alias 정합 결정 (Tier 2 warning 처리 방향)
6순위. precheck-matrix family/friend d-5 HIGH 10건 (baseline known)

자료 위치:
- 정책: docs/disclosure-policy.md / docs/codex-request-template.md / docs/spot-check-format.md
- 정책 JSON: src/data/disclosurePolicy/_schema.md + {spouse,family,friend}-01.json + cross-check.md
- 검증 wrapper: tmp/run-all-checks.cjs / tmp/policy-vs-data-cross-check.cjs / tmp/policy-md-json-sync-check.cjs
- npm scripts: check:policy / check:sync / check:all
- baseline anchor: baseline/pre-policy-v1/ (rollback-procedure.md, tag baseline-pre-policy-v1)
- 의뢰서 보존 7건: tmp/REQUEST-Codex-Tier{0,1,2}-*.md
- Codex handoff: tmp/CODEX-TIER2-HANDOFF-20260427.md

정독 + 사용자 다음 명령 대기.
```

---

## 사용자 참고 (이번 세션 핵심)

### 이번 세션 commits (origin/main, 8건)
```
9036a60 chore(policy): add Tier 2 validation wrappers
396b9fa docs(policy): tier 1 friend-01 disclosure policy + progression draft
2dd17e2 docs(policy): tier 1 family-01 disclosure policy + progression draft
6ee9690 docs(policy): complete spouse-01 issue progression draft
19e4c4e docs(policy): Tier 1 spouse-01 schema draft + cross-check
5b6e1d6 docs(policy): Tier 1 disclosure policy + codex template + spot check format
cceafe5 chore(baseline): persist Tier 0 handoff message + Codex request
17036e6 chore(baseline): freeze pre-policy-v1 anchor (a10b801)
```

### Tier 1/2 결과 통계
- 정책 commits: 6개 (cceafe5 ~ 9036a60, 4일에 완료)
- 정책 파일: 8개 (3 .json + 3 cross-check + _schema.md + disclosure-policy.md)
- 의뢰서 보존: 7개 (Tier 0/1/2)
- 검증 wrapper: 3개 + 9 layer + 7 cross-check 항목 + 6 sync 영역
- npm scripts: 3개 (check:policy / check:sync / check:all)
- 알려진 warning: 157건 (false positive 회피 설계, --strict-lexeme 옵션 elevation 가능)

### Tier 1 인코딩 사고 + 학습
- spouse-01 d-2/h-d3/h-d4 1차 작업 한글 깨짐 (PowerShell here-string → node stdin)
- C 원복 (19e4c4e clean state) → 재의뢰서 보강 (인코딩 검증 5종) → 재작성 무사고
- 학습 반영: family-01 / friend-01 무사고 진행
- 검증 강제: literal `?`/`??` count + hex dump UTF-8 + 한글 sample + d-1 영역 보존 + JSON parse

### Codex 설계 핵심 판단 (잘못 패턴 #12 의식)
- forbiddenLexemes surface-only = 기본 WARN (false positive 회피)
- `--strict-lexeme` 플래그로 hard fail elevation 가능
- dossier `late` entries 등 stage/late 맥락 영역 보호

### 분담 정착
- ClaudeCode CT = 검수 + 정책 본문 + 우선순위
- Codex = 정책 JSON + cross-check + 검증 wrapper
- 사용자 = 결정 + spot check + 큰 리팩토링 승인
- 완료 조건 = 자동 검증 PASS + 상대 모델 리뷰 PASS + 사용자 confirm (3가지 동시)
