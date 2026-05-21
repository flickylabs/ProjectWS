# Codex Thread Brief — Scripted Interrogation Mapping QA (전체 매핑 audit)

**작성일**: 2026-05-21
**트리거 사용자 보고**: spouse-01 사건의 캐릭터 B(이준호)에게 쟁점 d-2로 질문하면 무응답 상황이 반복됨.
**Claude 사전 audit**: HEAD `bb6e4140` 시점 데이터 영역 확인 — b/d-2 entries 180건 정상 매핑(`channels.interrogation.entries`의 18 entries × 10 variants). 데이터 결함 X. 무응답은 **코드 흐름 또는 매핑 로직 영역**.

## 목적

3 활성 case(spouse-01 / family-01 / friend-01) × 2 party × N dispute × 6 stage × 3 questionType × M angle 모든 조합에서 응답 entry가 정상 생성되는지 전수 검증 + 무응답 / 잘못된 fallback / disclosure 차단 사고 식별.

## 배경 정보

### 데이터 확인 (Claude audit, HEAD bb6e4140)
- `src/data/scriptedText/spouse-01.json` → `channels.interrogation.entries`: 144 entries (= 2 party × 4 dispute × 6 stage × 3 questionType)
- entry key 형식: `{party}|{disputeId}|{lieState}|{questionType}` (예: `b|d-2|S0|fact_pursuit`)
- entries[54] = `b|d-2|S0|fact_pursuit` party='b' disputeId='d-2' variants 10개 — 정상 존재
- b/d-2 전체 18 entries × 10 variants = **180건 정상 매핑** ✓

### 코드 흐름 (의심 영역)
**파일**: `src/hooks/useActionDispatch.ts` `handleQuestion()` (line 1653+)

| 영역 | line | 의심 |
|---|---|---|
| `questionLock` | 1654 | 중복 dispatch 차단 |
| `emotionalLockoutUntil[target] > turnCount` | 1670-1678 | 감정 과부하 lockout |
| `alreadyAtFullTruth` (S5) | 1683-1703 | 이미 자백 후 재추궁 → 짧은 재진술 |
| `alreadyConfessed` | 1704-1733 | 자백 dispatched flag 활성 |
| V2 beat path | 1994+ | `useBeatSelectorV2` + `hasV2Data(caseId)` 활성 시 |
| `getScriptedInterrogation` | 2157 (`src/engine/scriptedTextLoader.ts` line 491) | bundle entries 매칭 또는 angle lookup |
| `angleLookup` | scriptedTextLoader 521-543 | scriptedAngles 매핑 우선시 |
| disclosure policy gate | `src/data/disclosurePolicy/*.json` | 정보 차단 |

### 직전 트리거 가능성
- d-2의 `truthDescription` 영역 — 이준호의 비자금 출금 행동 (b_only quadrant). B 입장 응답 자체는 데이터 존재.
- b-d-2-S0-fact-pursuit-v1: `"…따로 모아둔 돈이 있긴 했습니다."` (stance:hedge, disclosure:guarded)
- disclosure:guarded tag — disclosure policy filter 영향 가능성

## 작업 범위 (전체 매핑 QA)

### Tier 1: 데이터 매핑 audit (3 case)
1. **scriptedText/{case}.json** — `channels.interrogation.entries` 전수 검증
   - 모든 party × dispute × stage × questionType 조합 key 존재 확인
   - 각 entry variants ≥ 1 확인
   - tags 영역 일관성 (`disclosure:*`, `stance:*`, `register:*` 등) 검증

2. **scriptedAngles/{case}_interrogation_answers.json** — angle 매핑
   - 모든 angle id가 angle_catalog에 등록되어 있는지
   - dispute별 valid angle list 정합성

3. **disclosurePolicy/{case}.json** — disclosure gate
   - 각 dispute의 surface/truth/protectedSurface 영역
   - lexeme별 disclosure level (`open|guarded|sealed`)
   - 어떤 lexeme이 어느 party 입장에서 차단되는지

### Tier 2: 코드 흐름 정합성 (각 case 1회씩)
4. **handleQuestion 흐름 테스트** — 각 case의 모든 조합에 대해 응답 생성 시뮬레이션
   - V2 beat path 활성 여부 (`useBeatSelectorV2` flag)
   - 각 path에서 응답 entry 도달 여부
   - null / undefined / empty 응답 영역 식별

5. **getScriptedInterrogation 매칭 검증**
   - 모든 (party, disputeId, lieState, questionType) 조합 호출 → 응답 존재 확인
   - opposite party fallback이 의도적으로 작동하는 영역과 잘못 동작 영역 구분

### Tier 3: 무응답 root cause 식별
6. **재현**: spouse-01 → B(이준호) → d-2 → S0 → fact_pursuit / motive_search / empathy_approach 각 angle 호출 → 응답 dispatch 영역 추적
7. 무응답 발생 조건 정확 식별 (어떤 stage / questionType / angle / disclosure 조합)
8. fix proposal — 데이터 보완 또는 코드 흐름 수정

## 산출물

### 1. Audit 보고서 (`docs/design/scripted-mapping-qa/audit-report-20260521.md`)
- 3 case 전체 매핑 정합성 점수 (전체 조합 N / 정상 응답 M / 비율)
- 누락 영역 list (case × party × dispute × stage × questionType × angle)
- 일관성 위반 영역 (tag / responseMode / disclosure level 불일치)
- 무응답 root cause 명시

### 2. 검증 스크립트 (`scripts/verify-scripted-mapping.cjs`)
- node 스크립트 — 각 case의 모든 조합 sweep
- getScriptedInterrogation 결과 또는 entries 매핑 직접 검증
- 누락 / 비정상 영역 출력
- exit code 0 = OK / 1 = findings

### 3. Fix commit (가능한 범위)
- 데이터 영역 누락 entry 추가 — `feat(scripted): ...` 또는 `fix(scripted): ...`
- 코드 흐름 수정 — `fix(dispatch): ...` 또는 `fix(loader): ...`
- 각 fix 별 commit 분리
- commit message에 무응답 시나리오 정확 명시

### 4. 무응답 영역 해결 (트리거 영역)
- spouse-01 B + d-2 무응답 root cause 명시
- 재현 시나리오 + fix 적용 + 재테스트 결과

## 검증

각 commit 후:
- `npm run qa:fast` — P0=0 필수
- `npm run qa:cutscene` — P0=0 필수
- `tsc -b --force` (또는 `node_modules/.bin/tsc -b --force`) PASS
- 신규 `verify-scripted-mapping.cjs` PASS

## 작업 제약

- 활성 case 3건만 (spouse-01 / family-01 / friend-01). LEGACY 84 case는 영역 제외.
- KO 자연화 영역(spouse-01 Phase 1+2 commit b0043445 + bb6e4140)에 영향 X — 자연화 sweep 후 데이터 기반 audit.
- KO 변경 시 다국어 sync 정책 적용 — 데이터 보완 시 EN/JA/ZH-CN 동등 entry도 함께 추가.
- 코드 흐름 수정 시 다른 case에 회귀 위험 검토 (regression test).

## 관련 영역

- 메모리 `feedback_natural_korean_precision_guide.md` — 자연화 가이드 (영향 X, 참고용)
- 메모리 `design_spouse01_truth_disclosure_policy.md` — spouse-01 disclosure 정책
- 메모리 `feedback_static_analysis_limit.md` — 정적 분석 한계 (D2 evidence unlock 영역)
- 메모리 `session_handoff_20260521_release_polish_6domain.md` — 직전 출시-near polish 묶음 (HEAD bb6e4140)

## 우선순위

**높음** — 무응답 사고는 게임 진행 차단 영역. 사용자 보고 확정 사고. 출시 전 필수 해결.
