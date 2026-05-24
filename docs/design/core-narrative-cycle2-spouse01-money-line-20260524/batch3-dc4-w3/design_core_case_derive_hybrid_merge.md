---
name: design-core-case-derive-hybrid-merge
description: "Authority(.case.ts) → 4 derived layer (cases/generated, claimPolicies v3, disclosurePolicy, truth-leak-matrix) build script 의 hybrid merge 정책. Authority 권위 영역 vs 기존 보존 영역. family-01 / friend-01 마이그레이션 시 재사용."
metadata: 
  node_type: memory
  type: project
  originSessionId: a6b7349d-ca93-4d00-810a-f9234ffaa066
---

## 도입 배경

Phase 1 Step 3 (commit f3a30ac8)에서 `scripts/build-core-case.mjs` 작성. Authority(`src/data/coreCases/{caseId}.case.ts`) → 4 derived layer 자동 sync. spouse-01 적용 시 3 사이클 fix를 거쳐 hybrid merge 정책 정립.

## 4 derived layer

| Layer | 경로 | 역할 |
|---|---|---|
| L1 | `src/data/cases/generated/{caseId}.json` | runtime case data |
| L3 | `src/data/claimPolicies/{caseId}-v3-game-loop-data.json` | v3 game loop |
| L4 | `src/data/disclosurePolicy/{caseId}.json` | lie state gate + lexeme policy |
| L5 | `docs/localization/non-dialogue-extract/truth-leak-matrix.json` | detect-truth-leak 매트릭스 (case별 merge) |

## hybrid merge 정책

### Authority schema 권위 (derive가 Authority 채택)

derive가 Authority에서 새로 생성:

| 영역 | source |
|---|---|
| L1 meta / parties / context / disputes top-level | `authority.meta / parties / context / disputes` |
| L1 evidence top-level (id/name/description/type/proves/reliability/...) | `authority.evidence[*]` |
| L1 witnesses (relatedDisputes / hiddenAgenda) | `authority.witnesses[*]` |
| L1 truthTable / solutions / relationshipLedger | `authority.truthTable / solutions / relationshipLedger` |
| L1 baseEvidenceIds / monetaryDisputeIds / activeLedgerEntries / activeThirdParties | `authority.*` |
| L1 lieConfigA/B (transitions 자동 derive) | `authority.disputes[].lieConfig + truthStages.transitionTrigger` |
| L1 evidenceCombinations[] (legacy top-level) | combinationRecipes 중 evidence-only inputs 자동 추출 |
| L1 combinationLab.recipes / outputs / nodes (statement nodes 보존) | `authority.combinationRecipes + dossierCards + evidence + witnesses` |
| L1 v3Design.{evidenceAxisLegend, hiddenDisputes, leadLines, authorityPlacements, sensitiveSealTargets, officialRecordRecommendations} | `authority.meta.evidenceAxisLegend + disputes(hidden) + dossierCards.leadLine + authorityPlacements + evidence.sensitiveSealTargets + officialRecordRecommendations` |
| L3 dossierCards (challenges 포함) | `authority.dossierCards[*]` |
| L3 transitionBeats[] | `authority.disputes[].truthStages[].{a,b}.transitionBeat` 모두 emit (30개) |
| L3 leadLines / authorityPlacements / hiddenDisputePlans / sensitiveSealTargets / officialRecordRecommendations | 동일 |
| L4 surfaceMap.{evidence,disputes,witnesses} 상위 필드 (name/surfaceName/description/...) | `authority` |
| L4 discoveryText.entries | `authority.combinationRecipes` |
| L4 issueProgression.disputes 구조 | `authority.disputes[].progressionStages` |
| L5 hidden 키워드 (기존 보존 + override union) | `authority.truthLeakOverride.perDispute.hidden` + 기존 매트릭스 |

### 기존 보존 (Authority가 disclosure-tier discipline 부족 또는 schema 미정의)

derive가 기존 파일 값을 우선 사용, Authority 값은 fallback:

| 영역 | 사유 |
|---|---|
| L1 `evidence.partyContext.{a,b}.{questionAngle, implication}` | Authority 텍스트가 truth lexeme 직접 노출 ("학용품이 조카 흔적" 등). 기존 surface phrasing ("참고서가 결정적 단서") 보존 — qa-runtime-gate truth_lexeme_early_exposure P0 회피 |
| L1 `evidence.v3DepthPlan[].summary / v3TrustStates[].summary` | Authority가 context stage에 "형 오피스텔" 등 직접 노출. 기존 stage-gated phrasing 보존 — qa-runtime-gate evidence_stage_truth_description_exposure P0 회피 |
| L3 `evidenceProgressions[].depthStages[].summary / trustStates[].summary` | L1과 동일 정책 |
| L4 `surfaceMap.evidence[id].{truthLexemes, descriptionTruth}` | Authority가 dispute 단위 forbiddenKeywords union을 evidence별로 다 등록하면 "가족" 같은 일상어가 evidence-specific 매트릭스에 포함되어 surface text 대량 leak. 기존 evidence별 정밀 큐레이션 보존 |
| L4 `surfaceMap.disputes[id].{truthLexemes, protectedSurface}` | 동일 |
| L4 `forbiddenLexemes.globalTruthLexemes` / `localePolicy.forbiddenLexemes` | Authority truthStages forbiddenKeywords는 LLM 자유 심문 frame inject용 (광역, "시댁"/"가족"/"개인회생" 포함). globalTruthLexemes는 surface 가드용 정밀 키워드. **분리 운영** — qa-runtime-gate npc_truth_leak_s0_s2 P0 회피 |
| L4 `forbiddenLexemes.{surfaceOnlyChannels, nonConfessionNpcBeforeS5, allowedSurfaceSubstitutes}` | 기존 보존 |
| L4 `channelAuthority.{lieStateDriven, playerDiscovered, freeAfterVerdict}` | Step 4 engine 영역 |
| L4 `lieStateGate.{truthThrottle, channelMatrix, npcPolicies}` | runtime semantics, Step 4 영역 |
| L4 `uiSurfaceMap` | UI flagging 사람 검토 결과물 |
| L4 `crossCheck` + 메타 (`schemaVersion`/`baselineTargetSha`/`generatedAt`/`draftStatus`/`sourcePolicy`) | 외부 참조 메타 |
| L3 `stateUnlockAtoms` (`a/b` × dispute × lieState × atoms[]) | factText 자유 작성, Step 6 영역 |
| L3 `events.{contradictions, interjections, emotionalOutbursts}` | 자유 작성 |
| L1 `evidence.viewerData / meta / investigationResults` | 수천 line 가짜 receipt/chat JSON. 사람 작성 rendering 영역. Authority schema가 carry할 가치 X — **완전 보존** |
| L1 `duo.duoId / partyA/B.callTerms 추가 필드 / socialGraph[].{slot, surfaceKnowledge, witnessProfile 일부 필드}` | Authority 미정의 영역 |
| L1 `combinationLab.nodes` 의 statement nodes (`stmt-*`) | Authority 미정의 |
| L1 `combinationLab.outputs[].effects` fallback | Authority effects 우선, 없으면 기존 보존 |
| L1 `disputes[].wrongTruths / tier / visualImpact / unlockCondition.note` | Authority 미정의 추가 필드 |
| L4 `localePolicy.allowedSurfaceSubstitutesByLocale` | Authority 미정의 |
| L5 matrix `surface` 키워드 (publicly disclosable lexemes) | Authority schema 미정의 (truthLeakOverride.perDispute.surface 명시한 경우만 사용) |
| L5 matrix `_notes / _explicitWhitelist` | matrix 메타 |
| L5 다른 case 영역 (family-01, friend-01) | 변경 X |

### L5 매트릭스 hidden 특별 정책

- **합치지 않음**: `authority.disputes[].truthStages[].forbiddenKeywords` 어그리게이트 → L5 매트릭스 합치는 거 금지
- **이유**: forbiddenKeywords는 NPC 회피 가이드용 광역 키워드 (일상어 "시댁"/"가족"/"개인회생" 포함). 매트릭스 hidden은 surface detector용 phrase 단위 정밀 키워드. 합치면 detect-truth-leak이 일상어를 surface text에서 다량 검출 → false positive 회귀
- **사용**: 기존 매트릭스 hidden 보존 + `authority.truthLeakOverride.perDispute[disputeId].hidden` union
- spouse-01 결과 매트릭스 hidden 키워드 예:
  - d-1: 기존 4개 (친형 오피스텔에서 조카를 돌봄 / 조카 돌봄 / 형과의 긴급 연락 / 가족 돌봄) + override 4개 (시댁 갈등 공포 / 형 가족 돌봄 / 조카 돌봄 / 중2 여학생) = 7개 dedupe
  - d-2: 기존 5개 + override 0 = 5개
  - h-d3: 기존 3개 + override 5개 (위임장 위조 / 투자방 송금 손실 / 사기 수치심 / 제이슨 / VIP 투자클럽) = 8개

## family-01 / friend-01 마이그레이션 시 적용

1. Authority 작성 시 spouse-01 패턴 따름
2. **dossierCard의 effects 필드 채움 필수** (Authority schema에 추가됨, 빠지면 derive에서 unlock_note 기본만 emit)
3. **truthLeakOverride.perDispute.hidden 정확히 채움** (매트릭스에 들어갈 phrase 단위 키워드만)
4. depthStages / partyContext / evidence-specific truthLexemes는 Authority에 채우되 기존 case JSON과 비교 review (Step 6 polish 영역)
5. dry-run 후 layer별 _summary.md + VSCode 비교 review 필수
6. --write 후 qa:fast + tsc + detect-truth-leak 3종 검증
7. 회귀 발생 시 derive 정책 추가 조정 (hybrid merge 영역 확장)

## 검증 사이클 명령

```bash
# dry-run (변경 검토)
npx tsx scripts/build-core-case.mjs --case {caseId} --dry-run

# 사용자 review (VSCode에서 비교)
# tmp/core-case-derive/{caseId}/_diff/_summary.md
# tmp/core-case-derive/{caseId}/_diff/L{1,3,4,5}.{before,after}.json

# write (실제 파일 적용)
npx tsx scripts/build-core-case.mjs --case {caseId} --write

# 3종 검증
npx tsc -b --force
npm run qa:fast
node scripts/detect-truth-leak.cjs --strict
```

## 재실행 시 주의

- **첫 write 후 두 번째 dry-run/write는 "기존" 파일을 이미 derive 결과로 인식**. 누적 변경 회피하려면 회귀 검증 사이클에서 `git checkout HEAD -- {4 derived files}` 후 --write 재실행
- build-core-case의 readJsonIfExists는 항상 디스크 현재 상태를 읽음

## Step 4 (engine 마이그레이션) 시 정리될 영역

다음 단계에서 hybrid merge의 "기존 보존" 영역 일부가 Authority 권위로 이동:
- `freeInterrogation.paraphraseRules` → engine 데이터 로드 (이미 schema에 있음, runtime만 미연결)
- `uiExposure.fieldPolicy` → PartyStatusBar 등 컴포넌트 데이터 로드
- `truthStages[].answerFrame` → LLM 자유 심문 프롬프트 inject

Step 6 (Authority text polish)에서:
- `partyContext`, `depthStages.summary`, `trustStates.summary`의 Authority 텍스트 surface phrasing 재작성
- 완료 시 derive의 "기존 보존" fallback 비중 감소

## 참조 commit

- `f3a30ac8` feat(core-case): build-core-case derive + L1/L3/L4/L5 spouse-01 apply
- `45595a4a` feat(core-case): Authority schema (zod) + spouse-01 pilot
