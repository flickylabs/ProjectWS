/**
 * Core Case Authority Schema (single source of truth)
 *
 * 본 파일은 사건 데이터의 권위(authority) 정의다. spouse/family/friend 같은 케이스는
 * `src/data/coreCases/{caseId}.case.ts`에 본 schema에 따라 작성하고, build step
 * (`scripts/build-core-case.cjs`)이 다음 derived layer들을 자동 생성한다:
 *
 *   - `src/data/cases/generated/{caseId}.json` (legacy runtime case data)
 *   - `src/data/claimPolicies/{caseId}-v3-game-loop-data.json` (v3 game loop)
 *   - `src/data/disclosurePolicy/{caseId}.json` (lie state gate + lexeme policy)
 *   - `docs/localization/non-dialogue-extract/truth-leak-matrix.json` (per case merge)
 *   - scripted text의 tags + sourceRefs 정합성 검증 (text 자체는 사람 권위 유지)
 *
 * 결정 권위:
 *   - β: zod schema (본 파일)
 *   - γ: build step (runtime resolver 도입 X)
 *   - δ: LocalizedString = KO 필수 + EN/JA/ZH-CN nullable (같은 파일에 4언어 보관)
 *   - ε: dossier card single dispute link + single party link strict
 *   - ζ: scripted text의 variant text는 보존, tags + sourceRefs만 검증
 *   - η: uiExposure 정책 데이터화 (PartyStatusBar 등 컴포넌트가 데이터 로드)
 *   - θ: 자유 심문 LLM frame inject — truthStages.answerFrame을 프롬프트에 주입
 *
 * 본 schema는 17 영역을 다룬다 (원안 9 + audit 발견 8 gap area 통합):
 *   meta / parties / timeline / disputes (+ truthStages, channelExposure, progressionStages,
 *   transitionBeats) / evidence (+ depthStages, trustStates, sensitiveSealTargets) /
 *   witnesses / dossierCards (+ leadLine, challenges) / combinationRecipes (+ discoveryText
 *   route, gate, surfaceFallback) / authorityPlacements / officialRecordRecommendations /
 *   uiExposure / freeInterrogation (+ paraphraseRules) / truthLeakOverrides
 */

import { z } from 'zod'

/* ============================================================================
 * 1. 공통 타입 (locale, party, lieState, channel)
 * ========================================================================== */

/** 4언어 권위. KO 필수, 나머지는 translate pass 후 채워짐. build step에서 missing locale 검증. */
export const LocaleCodeSchema = z.enum(['ko', 'en', 'ja', 'zh-CN'])
export type LocaleCode = z.infer<typeof LocaleCodeSchema>

export const LocalizedStringSchema = z.object({
  ko: z.string().min(1),
  en: z.string().nullable().optional(),
  ja: z.string().nullable().optional(),
  'zh-CN': z.string().nullable().optional(),
})
export type LocalizedString = z.infer<typeof LocalizedStringSchema>

/** 단계별 키워드 집합. dispute.truthStages에서 단계별 허용/금지 키워드 정의에 사용. */
export const LocalizedKeywordSetSchema = z.object({
  ko: z.array(z.string()),
  en: z.array(z.string()).nullable().optional(),
  ja: z.array(z.string()).nullable().optional(),
  'zh-CN': z.array(z.string()).nullable().optional(),
})
export type LocalizedKeywordSet = z.infer<typeof LocalizedKeywordSetSchema>

export const PartyIdSchema = z.enum(['a', 'b'])
export type PartyId = z.infer<typeof PartyIdSchema>

export const LieStateSchema = z.enum(['S0', 'S1', 'S2', 'S3', 'S4', 'S5'])
export type LieState = z.infer<typeof LieStateSchema>

/** dispute 전이 트리거. truthStages.transitionTrigger와 정합. */
export const TransitionTriggerSchema = z.enum(['direct', 'motive', 'hard_evidence', 'empathy'])
export type TransitionTrigger = z.infer<typeof TransitionTriggerSchema>

/** 사용자/시스템 채널. 채널별 진실 노출 정책 정의용. */
export const ChannelSchema = z.enum([
  'judge_question',
  'judge_contradiction',
  'judge_evidence_combo',
  'judge_witness_summon',
  'dossier',
  'interrogation',
  'contradiction_pursuit',
  'evidence_present',
  'mediation',
  'aftermath',
  'free_interrogation',
])
export type CoreChannel = z.infer<typeof ChannelSchema>

export const KnowledgeQuadrantSchema = z.enum([
  'both_know',
  'a_only',
  'b_only',
  'neither_knows',
  'shared_misconception',
])
export type KnowledgeQuadrant = z.infer<typeof KnowledgeQuadrantSchema>

/* ============================================================================
 * 2. meta + context + parties + evidenceAxisLegend
 * ========================================================================== */

/** evidenceAxisLegend — 5 depth × 5 trust 단계 정의. 모든 케이스 공통이지만 case 레벨에서
 *  정의해두면 케이스마다 단계 의미를 재구성할 여지 보존. spouse/family/friend 현재 동일 5 ID. */
export const EvidenceDepthLegendSchema = z.object({
  id: z.enum(['stub', 'excerpt', 'original', 'context', 'established']),
  label: LocalizedStringSchema,
  summary: LocalizedStringSchema,
})
export type EvidenceDepthLegend = z.infer<typeof EvidenceDepthLegendSchema>

export const EvidenceTrustLegendSchema = z.object({
  id: z.enum(['submitted', 'verifying', 'authenticated', 'challenged', 'misread']),
  label: LocalizedStringSchema,
  summary: LocalizedStringSchema,
})
export type EvidenceTrustLegend = z.infer<typeof EvidenceTrustLegendSchema>

export const EvidenceAxisLegendSchema = z.object({
  depthStages: z.array(EvidenceDepthLegendSchema).length(5),
  trustStates: z.array(EvidenceTrustLegendSchema).length(5),
})
export type EvidenceAxisLegend = z.infer<typeof EvidenceAxisLegendSchema>

export const CoreCaseMetaSchema = z.object({
  caseId: z.string().min(1),
  /** UI/external ref용 case 번호 (e.g. TE-SpouseV301). */
  caseNumber: z.string().optional(),
  /** display name (LocalizedString). */
  caseName: LocalizedStringSchema.optional(),
  schemaVersion: z.literal('core-case-v1'),
  title: LocalizedStringSchema,
  relationshipType: z.string(),
  relationshipState: z.string().optional(),
  familyRelation: z.string().optional(),
  /** 사건 분류 (e.g. marital_finance_reframe). */
  contextType: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  /** 평문 진실 — UI 노출 절대 금지 (uiExposure에서 정책). */
  anchorTruth: LocalizedStringSchema,
  emotionalBait: LocalizedStringSchema,
  resolutionDilemma: LocalizedStringSchema,
  conflictSeed: LocalizedStringSchema,
  variableModules: z.array(z.string()).optional(),
  twistModule: z.string().nullable().optional(),
  /** 민감도 태그 (minor_privacy, health_privacy, family_debt 등). */
  sensitivityTags: z.array(z.string()).optional(),
  /** 5 depth × 5 trust 단계 정의 (case 레벨 공통). */
  evidenceAxisLegend: EvidenceAxisLegendSchema,
})
export type CoreCaseMeta = z.infer<typeof CoreCaseMetaSchema>

/** 사건의 감정/긴장 메타. emotionalPressure는 UI overlay에 사용. */
export const CoreCaseContextSchema = z.object({
  description: LocalizedStringSchema,
  emotionalPressure: z.number().int().min(0).max(10),
  affects: z.enum(['a', 'b', 'both']),
  triggerAmplifier: LocalizedStringSchema,
})
export type CoreCaseContext = z.infer<typeof CoreCaseContextSchema>

export const VerbalTellSchema = z.object({
  type: z.string(),
  trigger: z.string(),
  pattern: LocalizedStringSchema,
})
export type VerbalTell = z.infer<typeof VerbalTellSchema>

export const PartyDefinitionSchema = z.object({
  id: PartyIdSchema,
  name: LocalizedStringSchema,
  age: z.number().int().positive(),
  occupation: LocalizedStringSchema,
  incomeBracket: z.enum(['low', 'mid', 'high']).optional(),
  archetype: z.string(),
  speechStyle: LocalizedStringSchema,
  pride: z.number().int().min(0).max(10),
  /** 평문 공포 — UI 노출은 uiExposure.fieldPolicy 'partyX.fear' 정책 준수. */
  fear: LocalizedStringSchema,
  riskAppetite: z.number().int().min(0).max(10),
  digitalHabit: z.string().optional(),
  dailyRoutine: LocalizedStringSchema,
  sensitivePoints: z.array(LocalizedStringSchema),
  verbalTells: z.array(VerbalTellSchema),
  callTerms: z.object({
    toPartner: LocalizedStringSchema,
    toJudge: LocalizedStringSchema,
    angry: LocalizedStringSchema.optional(),
  }),
  pcFaceType: z.string().optional(),
})
export type PartyDefinition = z.infer<typeof PartyDefinitionSchema>

/* ============================================================================
 * 3. timeline — 사건 흐름 단계 (audit Section 1 권위)
 * ========================================================================== */

export const CaseTimelineEventSchema = z.object({
  stage: z.number().int().min(0).max(10),
  whenLabel: LocalizedStringSchema,
  actor: z.enum(['a', 'b', 'both', 'system', 'third_party']),
  action: LocalizedStringSchema,
  aPerception: LocalizedStringSchema,
  bPerception: LocalizedStringSchema,
  /** 이 사건 단계가 채널에 노출될 수 있는 최소 lieState. 평문 노출은 별도 정책. */
  exposureGate: z.object({
    minLieState: LieStateSchema,
    allowedChannels: z.array(ChannelSchema),
  }),
  /** anchorTruth와 cross-check 가능한 사실 키. truth-leak-matrix derive 시 활용. */
  sourceFacts: z.array(z.string()),
})
export type CaseTimelineEvent = z.infer<typeof CaseTimelineEventSchema>

/* ============================================================================
 * 4. disputes — 핵심 (truthStages, channelExposure, progressionStages, transitionBeats)
 * ========================================================================== */

/** 단계별 단일 party의 진실 노출 상태. truth-leak-matrix와 LLM frame을 자동 derive. */
export const TruthStagePartyEntrySchema = z.object({
  /** 이 단계에서 NPC가 인정/제시한 사실. answerFrame과 함께 LLM 프롬프트에 inject. */
  admittedFact: LocalizedStringSchema,
  /** 이 단계에서 발화 가능한 키워드. */
  allowedKeywords: LocalizedKeywordSetSchema,
  /** 이 단계에서 발화 금지 키워드. truth-leak-matrix.hidden으로 자동 derive. */
  forbiddenKeywords: LocalizedKeywordSetSchema,
  /** LLM 자유 심문 응답 가이드. 'NPC는 ~만큼만 인정하고 ~는 회피' 형태. */
  answerFrame: LocalizedStringSchema,
  /** 이 단계로의 전이 트리거. */
  transitionTrigger: TransitionTriggerSchema.nullable().optional(),
  /** 단계 전이 순간의 line + behaviorHint. transitionBeats로 derive (G6 통합). */
  transitionBeat: z
    .object({
      line: LocalizedStringSchema,
      behaviorHint: LocalizedStringSchema,
    })
    .nullable()
    .optional(),
})
export type TruthStagePartyEntry = z.infer<typeof TruthStagePartyEntrySchema>

/** 단일 단계의 양측 정의. */
export const TruthStageSchema = z.object({
  a: TruthStagePartyEntrySchema,
  b: TruthStagePartyEntrySchema,
})
export type TruthStage = z.infer<typeof TruthStageSchema>

/** S0~S5 단계별 전체 정의. */
export const TruthStagesSchema = z.object({
  S0: TruthStageSchema,
  S1: TruthStageSchema,
  S2: TruthStageSchema,
  S3: TruthStageSchema,
  S4: TruthStageSchema,
  S5: TruthStageSchema,
})
export type TruthStages = z.infer<typeof TruthStagesSchema>

/** 채널별 노출 정책. forbiddenKeywordRefs는 truthStages에서 derive (참조). */
export const ChannelExposurePolicySchema = z.object({
  minLieState: LieStateSchema,
  /** 표면(dossier UI) 전용 채널인지. judge_question/system 채널은 surfaceOnly: true. */
  isSurfaceOnly: z.boolean().default(false),
  /** dossier surface 카드인지. dc-* unlock 후만 발화 가능. */
  isDossierSurface: z.boolean().default(false),
  /** 채널별 추가 금지 키워드. truthStages.forbiddenKeywords에 더해 적용. */
  extraForbiddenKeywords: LocalizedKeywordSetSchema.optional(),
})
export type ChannelExposurePolicy = z.infer<typeof ChannelExposurePolicySchema>

/** G7 issueProgression 통합. 단계별 게임 룰. */
export const DisputeProgressionStageSchema = z.object({
  surfaceClaim: LocalizedStringSchema,
  hiddenTruth: LocalizedStringSchema,
  validActions: z.array(
    z.enum([
      'fact_pursuit',
      'motive_search',
      'empathy_approach',
      'evidence_query',
      'relation_query',
      'witness_summon',
      'contradiction_pursuit',
    ])
  ),
  requiredEvidence: z.array(z.string()),
  requiredWitness: z.array(z.string()),
  meterTriggers: z.record(z.string(), z.number()).optional(),
  failureResponse: LocalizedStringSchema.optional(),
  successUnlocks: z.array(z.string()),
})
export type DisputeProgressionStage = z.infer<typeof DisputeProgressionStageSchema>

/** G4 hiddenDisputePlans 통합. */
export const DisputeUnlockConditionSchema = z.object({
  requireDispute: z
    .union([
      z.object({ id: z.string(), minState: LieStateSchema, party: PartyIdSchema.optional() }),
      z.array(z.object({ id: z.string(), minState: LieStateSchema, party: PartyIdSchema.optional() })),
    ])
    .optional(),
  requireEvidence: z.string().optional(),
  runtimeRule: LocalizedStringSchema.optional(),
  authoredRule: LocalizedStringSchema.optional(),
})
export type DisputeUnlockCondition = z.infer<typeof DisputeUnlockConditionSchema>

export const VerdictOptionsSchema = z.object({
  wrong: LocalizedStringSchema,
  partial: LocalizedStringSchema,
  truth: LocalizedStringSchema,
  defer: LocalizedStringSchema,
})

/** lie configuration metadata per party. 기존 lieConfigA/B를 통합한 형태.
 *  transitions는 truthStages.transitionTrigger에서 자동 derive 가능하나, 명시적 정의도 허용. */
export const PartyLieConfigSchema = z.object({
  lieType: z.string(), // LT-1 ~ LT-6 등
  lieIntensity: z.string(), // L1 / L2 / L3
  lieMotive: z.string(), // self_protection / third_party_protection / face_saving 등
  initialState: LieStateSchema.default('S0'),
  collapseViaTrust: z.boolean(),
  /** transitions 자동 derive 가능 — 명시 작성 시 truthStages.transitionTrigger를 override. */
  transitionsOverride: z
    .array(
      z.object({
        from: LieStateSchema,
        to: LieStateSchema,
        trigger: z.string(),
      })
    )
    .optional(),
})
export type PartyLieConfig = z.infer<typeof PartyLieConfigSchema>

export const CoreDisputeSchema = z.object({
  id: z.string().min(1),
  name: LocalizedStringSchema,
  /** boolean — d-1 truth=true 같은 영역. truthStages.S5와 별개로 명시. */
  truth: z.boolean(),
  /** S5 도달 시 공식 진실 텍스트. truthStages.S5.{a,b}.admittedFact 보강용. */
  truthDescription: LocalizedStringSchema,
  quadrant: KnowledgeQuadrantSchema,
  weight: z.enum(['high', 'medium', 'low']),
  ambiguity: z.enum(['none', 'low', 'high']),
  legitimacyIssue: z.boolean(),
  hidden: z.boolean(),
  v3Visibility: z.enum(['visible', 'hidden', 'initial']),
  correctResponsibility: z.object({
    a: z.number().int().min(0).max(100),
    b: z.number().int().min(0).max(100),
  }),
  mediationLink: z.string(),
  /** UI에서 dispute unlock에 필요한 evidence IDs (UI 필터링용). */
  requiredEvidence: z.array(z.string()).optional(),
  judgmentStatement: LocalizedStringSchema.optional(),
  unlockCondition: DisputeUnlockConditionSchema.optional(),
  verdictOptions: VerdictOptionsSchema,
  /** 핵심 — 단계별 진실 노출 정책. truth-leak-matrix + LLM frame 자동 derive 원본. */
  truthStages: TruthStagesSchema,
  /** 채널별 노출 정책. truthStages를 보강. */
  channelExposure: z.record(ChannelSchema, ChannelExposurePolicySchema),
  /** G7: 단계별 게임 룰. */
  progressionStages: z.record(LieStateSchema, DisputeProgressionStageSchema),
  /** lieConfig per party — lieConfigA/B 통합. */
  lieConfig: z.object({
    a: PartyLieConfigSchema,
    b: PartyLieConfigSchema,
  }),
})
export type CoreDispute = z.infer<typeof CoreDisputeSchema>

/* ============================================================================
 * 5. evidence (depthStages, trustStates, sensitiveSealTargets)
 * ========================================================================== */

export const EvidenceTypeSchema = z.enum([
  'bank',
  'financial_record',
  'receipt',
  'chat',
  'contract',
  'estimate',
  'document',
  'institutional_note',
  'medical_record',
  'testimony',
  'cctv',
  'photo',
  'photo_video',
  'video',
  'dashcam',
  'log',
  'platform_log',
  'cloud_log',
  'device_log',
  'record',
  'delivery_record',
  'repair_record',
  'email',
  'audio',
  'forensic_report',
  'device',
  'sns',
])
export type EvidenceTypeCore = z.infer<typeof EvidenceTypeSchema>

/** G1 evidenceProgressions.depthStages — 개별 evidence의 단계별 summary + viewerData.
 *  단계 ID 정의는 case meta.evidenceAxisLegend가 권위 (모든 evidence 공통). */
export const EvidenceDepthStageSchema = z.object({
  id: z.enum(['stub', 'excerpt', 'original', 'context', 'established']),
  /** 이 evidence의 이 단계에서 보이는 요약 (개별 evidence 권위). */
  summary: LocalizedStringSchema,
  /** 단계별 viewerData override (기본은 evidence.viewerData). */
  viewerData: z.unknown().optional(),
})
export type EvidenceDepthStage = z.infer<typeof EvidenceDepthStageSchema>

/** G1 evidenceProgressions.trustStates — 개별 evidence의 단계별 summary.
 *  단계 ID 정의는 case meta.evidenceAxisLegend가 권위. */
export const EvidenceTrustStateSchema = z.object({
  id: z.enum(['submitted', 'verifying', 'authenticated', 'challenged', 'misread']),
  summary: LocalizedStringSchema,
})
export type EvidenceTrustState = z.infer<typeof EvidenceTrustStateSchema>

/** G5 sensitiveSealTargets 통합. */
export const SensitiveSealTargetSchema = z.object({
  labels: z.array(LocalizedStringSchema),
  recommendedTiming: z.array(LocalizedStringSchema),
  risks: z.array(LocalizedStringSchema),
})
export type SensitiveSealTarget = z.infer<typeof SensitiveSealTargetSchema>

export const PartyEvidenceContextSchema = z.object({
  questionAngle: LocalizedStringSchema,
  implication: LocalizedStringSchema,
})

export const EvidenceInvestigationStageSchema = z.object({
  stage: z.number().int().min(0),
  revealKey: z.string(),
  question: z.object({
    text: LocalizedStringSchema,
    attackVector: z.string(),
  }),
  scriptedNpcResponses: z
    .object({
      a: z
        .object({
          npcResponse: LocalizedStringSchema,
          behaviorHint: LocalizedStringSchema,
          truthLevel: z.string(),
        })
        .optional(),
      b: z
        .object({
          npcResponse: LocalizedStringSchema,
          behaviorHint: LocalizedStringSchema,
          truthLevel: z.string(),
        })
        .optional(),
    })
    .optional(),
})
export type EvidenceInvestigationStage = z.infer<typeof EvidenceInvestigationStageSchema>

export const CoreEvidenceSchema = z.object({
  id: z.string().min(1),
  name: LocalizedStringSchema,
  description: LocalizedStringSchema,
  surfaceName: LocalizedStringSchema.optional(),
  surfaceDescription: LocalizedStringSchema.optional(),
  type: EvidenceTypeSchema,
  reliability: z.enum(['hard', 'soft']),
  completeness: z.enum(['original', 'edited', 'partial', 'context_missing']),
  provenance: z.enum(['self_possessed', 'third_party', 'anonymous', 'institutional']),
  legitimacy: z.enum(['lawful', 'privacy_concern', 'unlawful']),
  subjectParty: z.enum(['a', 'b', 'both']),
  /** dispute IDs this evidence proves. */
  proves: z.array(z.string()).min(1),
  isTrap: z.boolean(),
  requires: z.array(z.string()),
  requiredLieState: LieStateSchema.optional(),
  partyContext: z.object({
    a: PartyEvidenceContextSchema.optional(),
    b: PartyEvidenceContextSchema.optional(),
  }),
  investigationStages: z.array(EvidenceInvestigationStageSchema).optional(),
  /** G1: authored 5단계 깊이 (Stub/Excerpt/Original/Context/Established). */
  depthStages: z.array(EvidenceDepthStageSchema).optional(),
  /** G1: authored 5단계 신뢰 (Submitted/Verifying/Authenticated/Challenged/Misread). */
  trustStates: z.array(EvidenceTrustStateSchema).optional(),
  /** G5: 민감 정보 봉인 대상. */
  sensitiveSealTargets: SensitiveSealTargetSchema.optional(),
})
export type CoreEvidence = z.infer<typeof CoreEvidenceSchema>

/* ============================================================================
 * 6. witnesses
 * ========================================================================== */

export const WitnessTestimonyByDisputeSchema = z.object({
  /** 이 증언이 명시적으로 입증 가능한 사실. */
  canProve: z.array(LocalizedStringSchema),
  /** 이 증언이 부정할 수 없는 영역 (scope 한계). */
  cannotDisprove: z.array(LocalizedStringSchema),
})
export type WitnessTestimonyByDispute = z.infer<typeof WitnessTestimonyByDisputeSchema>

export const CoreWitnessSchema = z.object({
  id: z.string().min(1),
  name: LocalizedStringSchema,
  age: z.number().int().positive(),
  gender: z.enum(['m', 'f', 'unknown']),
  occupation: LocalizedStringSchema,
  bias: z.enum(['neutral', 'pro_a', 'pro_b', 'hostile_a', 'hostile_b']),
  distortionRisk: z.enum(['accurate', 'strategic', 'biased', 'unreliable']),
  knowledgeScope: LocalizedStringSchema,
  address: z.object({
    fromA: LocalizedStringSchema,
    fromB: LocalizedStringSchema,
  }),
  hiddenAgenda: LocalizedStringSchema.nullable(),
  /** 단일 권위 — dispute 측 case JSON과 combinationLab 측 mismatch 방지. */
  relatedDisputes: z.array(z.string()).min(1),
  unlockedByDossier: z.array(z.string()),
  /** dispute별 입증/부정 가능 영역. */
  testimony: z.object({
    byDispute: z.record(z.string(), WitnessTestimonyByDisputeSchema),
  }),
})
export type CoreWitness = z.infer<typeof CoreWitnessSchema>

/* ============================================================================
 * 7. dossierCards (single link strict + leadLine + challenges)
 * ========================================================================== */

export const DossierLeadLineSchema = z.object({
  id: z.string().min(1),
  name: LocalizedStringSchema,
  leadType: z.string(),
  firstInputs: z.array(z.string()),
  secondInputs: z.array(z.string()),
  interpretationChoices: z
    .array(
      z.object({
        id: z.string(),
        text: LocalizedStringSchema,
        implication: LocalizedStringSchema,
      })
    )
    .min(2)
    .max(5),
})
export type DossierLeadLine = z.infer<typeof DossierLeadLineSchema>

export const DossierChallengeQuestionSchema = z.object({
  id: z.string().min(1),
  text: LocalizedStringSchema,
  lockedHint: LocalizedStringSchema,
  attackVector: z.string(),
  requiredLieState: LieStateSchema,
  onSuccess: z.object({
    blockVector: z.string().optional(),
    revealAtom: z.string().optional(),
    lieAdvance: z.boolean().optional(),
  }),
})
export type DossierChallengeQuestion = z.infer<typeof DossierChallengeQuestionSchema>

export const DossierChallengesSchema = z.object({
  a: z.object({ questions: z.array(DossierChallengeQuestionSchema) }).optional(),
  b: z.object({ questions: z.array(DossierChallengeQuestionSchema) }).optional(),
})

/** dossier card 발동 효과. case JSON combinationLab.outputs[].effects[]와 정합. */
export const DossierEffectSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('unlock_note'), unlockNodeId: z.string().min(1) }),
  z.object({
    kind: z.literal('upgrade_dispute'),
    disputeUpgrade: z.object({
      disputeId: z.string().min(1),
      weight: z.enum(['low', 'medium', 'high']).optional(),
      ambiguity: z.enum(['none', 'low', 'high']).optional(),
    }),
  }),
  z.object({ kind: z.literal('unlock_dispute'), unlockNodeId: z.string().min(1) }),
  z.object({
    kind: z.literal('upgrade_evidence'),
    evidenceUpgrade: z.object({
      evidenceId: z.string().min(1),
      toReliability: z.enum(['hard', 'soft']),
    }),
  }),
])
export type DossierEffect = z.infer<typeof DossierEffectSchema>

export const CoreDossierCardSchema = z.object({
  id: z.string().min(1),
  label: LocalizedStringSchema,
  description: LocalizedStringSchema,
  type: z.enum(['derived_note', 'derived_evidence', 'note']),
  /** ε relaxed: dispute는 1~2개 link 허용 (frame이 두 dispute에 동시 영향 영역 — dc-2 시댁 frame이 d-1 외도 + d-2 출금 동기 모두에 영향).
   *  단 양측 party 자료 혼동 차단을 위해 linkedParty는 여전히 single strict. */
  linkedDisputes: z.array(z.string()).min(1).max(2),
  /** ε strict: 단일 party link. dc 안에 양측 자료 혼동 차단. */
  linkedParty: PartyIdSchema,
  linkedEvidence: z.array(z.string()),
  /** G2: leadLine 통합 (선택). */
  leadLine: DossierLeadLineSchema.optional(),
  noteText: LocalizedStringSchema,
  successConditionSummary: z.array(LocalizedStringSchema),
  successEffects: z.array(LocalizedStringSchema),
  /** 카드 발동 시 실제 게임 효과 (case JSON combinationLab.outputs[].effects[]와 정합). */
  effects: z.array(DossierEffectSchema).optional(),
  judgeHint: LocalizedStringSchema.optional(),
  challenges: DossierChallengesSchema,
})
export type CoreDossierCard = z.infer<typeof CoreDossierCardSchema>

/* ============================================================================
 * 8. combinationRecipes (G8 discoveryText route + gate + surfaceFallback)
 * ========================================================================== */

export const CombinationRouteSchema = z.enum([
  'evidence_combine',
  'witness_combine',
  'statement_combine',
])
export type CombinationRoute = z.infer<typeof CombinationRouteSchema>

export const CombinationGateSchema = z.object({
  allowedChannels: z.array(ChannelSchema),
  requiredEvidenceStages: z.record(z.string(), z.string()).optional(),
  requiredTruthStage: z.record(z.string(), z.number().int().min(0).max(5)).optional(),
  autoSurfaceAllowed: z.boolean(),
})

export const CoreCombinationRecipeSchema = z.object({
  id: z.string().min(1),
  inputs: z.array(z.string()).min(2),
  cost: z.number().int().min(0),
  hidden: z.boolean().optional(),
  repeatable: z.boolean().optional(),
  /** dossier card id 또는 evidence upgrade target. */
  outputId: z.string().min(1),
  discoveryText: LocalizedStringSchema,
  /** G8: route 분류. */
  route: CombinationRouteSchema,
  /** G8: gate 정책. */
  gate: CombinationGateSchema,
  /** G8: gate 미만족 시 노출되는 안전 텍스트. */
  surfaceFallback: LocalizedStringSchema,
})
export type CoreCombinationRecipe = z.infer<typeof CoreCombinationRecipeSchema>

/* ============================================================================
 * 9. authorityPlacements + officialRecordRecommendations
 * ========================================================================== */

/** G3 authorityPlacements 통합. */
export const AuthorityPlacementSchema = z.object({
  action: LocalizedStringSchema,
  recommendedMoment: LocalizedStringSchema,
  purpose: LocalizedStringSchema,
  contextDispute: z.string().optional(),
})
export type AuthorityPlacement = z.infer<typeof AuthorityPlacementSchema>

/* ============================================================================
 * 10. uiExposure — UI 노출 정책 데이터화 (η)
 * ========================================================================== */

/** 각 게이트 조건이 충족되어야 해당 필드가 평문 노출됨. */
export const UiExposureGateSchema = z.enum([
  'always',
  'after_advanced_turns',
  'after_shaken',
  'after_any_collapse',
  'after_all_collapse',
  'after_dispute_truth',
  'after_verdict',
  'never',
])
export type UiExposureGate = z.infer<typeof UiExposureGateSchema>

export const UiExposureFieldPolicySchema = z.object({
  /** 필드 노출 게이트. */
  gate: UiExposureGateSchema,
  /** gate 미달성 시 표시할 hint. */
  hintLocked: LocalizedStringSchema,
  /** dispute 단위 게이트일 때 어느 dispute의 진실 확정 후 노출인지. */
  requireDisputeTruth: z.string().optional(),
})
export type UiExposureFieldPolicy = z.infer<typeof UiExposureFieldPolicySchema>

export const CoreUiExposurePolicySchema = z.object({
  /** field path = e.g. 'partyA.fear', 'partyA.sensitivePoints', 'partyB.dailyRoutine'. */
  fieldPolicy: z.record(z.string(), UiExposureFieldPolicySchema),
})
export type CoreUiExposurePolicy = z.infer<typeof CoreUiExposurePolicySchema>

/* ============================================================================
 * 11. freeInterrogation (θ) — paraphraseRules + LLM frame inject 메타
 * ========================================================================== */

export const ParaphraseRuleSchema = z.object({
  /** 검출 라벨 (KO 패턴). */
  label: z.string().min(1),
  dimension: z.enum(['paraphrase', 'hidden_truth_lexeme']).default('paraphrase'),
  channels: z.array(ChannelSchema).optional(),
  /** 정규식 패턴 (선택). 없으면 label을 그대로 substring match. */
  matcherPattern: z.string().optional(),
  /** 다국어 패턴. 다른 locale에서도 가드 필요한 경우. */
  matcherPatternByLocale: z
    .object({
      en: z.string().optional(),
      ja: z.string().optional(),
      'zh-CN': z.string().optional(),
    })
    .optional(),
})
export type ParaphraseRule = z.infer<typeof ParaphraseRuleSchema>

export const CoreFreeInterrogationConfigSchema = z.object({
  /** 케이스별 paraphrase 가드 — 자유 심문 응답 검증용. */
  paraphraseRules: z.array(ParaphraseRuleSchema),
  /** θ: LLM 프롬프트 inject 기본 정책. truthStages.answerFrame이 dynamic part. */
  llmFrameStatic: LocalizedStringSchema.optional(),
})
export type CoreFreeInterrogationConfig = z.infer<typeof CoreFreeInterrogationConfigSchema>

/* ============================================================================
 * 12. truthLeak override — matrix에 case별 specific keyword 추가
 * ========================================================================== */

/** 일반적으로 truth-leak-matrix는 truthStages.forbiddenKeywords에서 자동 derive하나,
 *  특정 surface keyword (e.g. ldsmid-band 정책)을 추가하고 싶을 때 override. */
export const TruthLeakOverrideSchema = z.object({
  /** matrix.{caseId}.{disputeId}.{hidden|surface} 영역에 추가될 키워드. */
  perDispute: z.record(
    z.string(),
    z.object({
      hidden: LocalizedKeywordSetSchema.optional(),
      surface: LocalizedKeywordSetSchema.optional(),
    })
  ),
  /** matrix._designIntentTags whitelist 추가. */
  designIntentTags: z.array(z.string()).optional(),
})
export type TruthLeakOverride = z.infer<typeof TruthLeakOverrideSchema>

/* ============================================================================
 * 12b. truthTable + solutions + relationshipLedger + flags
 * ========================================================================== */

/** truthTable — 사건의 최종 진실 fact list. weight + quadrant. */
export const TruthItemSchema = z.object({
  id: z.string().min(1),
  fact: LocalizedStringSchema,
  isTrue: z.boolean(),
  weight: z.number().int().min(0).max(10),
  quadrant: KnowledgeQuadrantSchema,
})
export type TruthItem = z.infer<typeof TruthItemSchema>

/** solutions — mediation/판결에서 사용. 카테고리별 descriptions[]. */
export const SolutionsSchema = z.record(z.string(), z.array(LocalizedStringSchema))
export type Solutions = z.infer<typeof SolutionsSchema>

/** relationshipLedger — 사회 관계 / 감정 잔여 메타 (ledger-1 distorted 등).
 *  duo.relationshipLedger의 풍부한 정보 (whoRemembers, distortion 방향 등)을 보존. */
export const RelationshipLedgerEntrySchema = z.object({
  id: z.string().min(1),
  /** 'distorted' | 'silenced' | 'pressured' | 'protected' | 'distant' 등. */
  category: z.string(),
  description: LocalizedStringSchema,
  /** 실제 발생한 일인지 vs 누군가의 왜곡인지. */
  isReal: z.boolean(),
  /** 'a' | 'b' | 'both' | 'neither' — 누가 정확히 기억하는가. */
  whoRemembersAccurately: z.enum(['a', 'b', 'both', 'neither']),
  /** 'a' | 'b' | 'both' | 'none' — 누가 왜곡하는가. */
  whoDistorts: z.enum(['a', 'b', 'both', 'none']),
  distortionDirection: LocalizedStringSchema.optional(),
  currentlyResolved: z.enum(['surface_only', 'unresolved', 'resolved']),
  /** 감정 잔여 강도. */
  emotionalResidue: z.enum(['weak', 'medium', 'strong']),
  /** 현재 사건과의 연결 강도. */
  connectionToCurrent: z.enum(['direct', 'indirect', 'tangential']),
  /** 관여 party. */
  parties: z.array(PartyIdSchema).optional(),
  /** 영향을 주는 third party id. */
  thirdPartyId: z.string().optional(),
})
export type RelationshipLedgerEntry = z.infer<typeof RelationshipLedgerEntrySchema>

/* ============================================================================
 * 13. CoreCaseAuthority — 최종 통합
 * ========================================================================== */

export const CoreCaseAuthoritySchema = z.object({
  meta: CoreCaseMetaSchema,
  context: CoreCaseContextSchema,
  parties: z.object({ a: PartyDefinitionSchema, b: PartyDefinitionSchema }),
  timeline: z.array(CaseTimelineEventSchema),
  truthTable: z.array(TruthItemSchema),
  disputes: z.array(CoreDisputeSchema).min(1),
  evidence: z.array(CoreEvidenceSchema).min(1),
  witnesses: z.array(CoreWitnessSchema),
  dossierCards: z.array(CoreDossierCardSchema),
  combinationRecipes: z.array(CoreCombinationRecipeSchema),
  authorityPlacements: z.array(AuthorityPlacementSchema),
  officialRecordRecommendations: z.array(LocalizedStringSchema),
  solutions: SolutionsSchema,
  solutionCategoryLabels: z.record(z.string(), LocalizedStringSchema).optional(),
  relationshipLedger: z.array(RelationshipLedgerEntrySchema),
  /** PC 증거 표면화 기본 3장. */
  baseEvidenceIds: z.tuple([z.string(), z.string(), z.string()]),
  /** 금전 쟁점 (비금전 사건 금전 오염 방지). */
  monetaryDisputeIds: z.array(z.string()),
  /** runtime flag arrays — 활성화된 ledger / third party id. */
  activeLedgerEntries: z.array(z.string()),
  activeThirdParties: z.array(z.string()),
  uiExposure: CoreUiExposurePolicySchema,
  freeInterrogation: CoreFreeInterrogationConfigSchema,
  truthLeakOverride: TruthLeakOverrideSchema.optional(),
})
export type CoreCaseAuthority = z.infer<typeof CoreCaseAuthoritySchema>

/* ============================================================================
 * 14. Cross-reference validation (build step에서 추가 호출)
 * ========================================================================== */

export interface CoreCaseValidationIssue {
  severity: 'error' | 'warn'
  area: string
  message: string
  path?: string
}

/**
 * schema parse 후 cross-reference 검증.
 *
 *   - evidence.proves의 dispute id가 disputes에 존재하는지
 *   - dossierCard.linkedDispute가 disputes에 존재 + linkedParty가 정합한지
 *   - dossierCard.linkedEvidence가 evidence에 존재하는지
 *   - witness.relatedDisputes 모두 disputes에 존재하는지
 *   - witness.testimony.byDispute 키가 relatedDisputes 부분집합인지
 *   - combinationRecipes.inputs / outputId가 evidence + dossierCards에 존재하는지
 *   - dispute.unlockCondition.requireDispute가 disputes에 존재하는지
 *   - dispute.unlockCondition.requireEvidence가 evidence에 존재하는지
 *   - dispute.progressionStages.successUnlocks / requiredEvidence id가 evidence에 존재
 *   - uiExposure.fieldPolicy의 requireDisputeTruth가 disputes에 존재
 *
 * build step이 schema.parse → validateCoreCaseReferences 순으로 호출.
 */
export function validateCoreCaseReferences(authority: CoreCaseAuthority): CoreCaseValidationIssue[] {
  const issues: CoreCaseValidationIssue[] = []
  const disputeIds = new Set(authority.disputes.map((d) => d.id))
  const evidenceIds = new Set(authority.evidence.map((e) => e.id))
  const dossierIds = new Set(authority.dossierCards.map((d) => d.id))

  // evidence.proves → disputes
  for (const ev of authority.evidence) {
    for (const did of ev.proves) {
      if (!disputeIds.has(did)) {
        issues.push({
          severity: 'error',
          area: 'evidence.proves',
          message: `evidence ${ev.id}.proves references unknown dispute ${did}`,
          path: `evidence[${ev.id}].proves`,
        })
      }
    }
    for (const req of ev.requires) {
      if (!evidenceIds.has(req)) {
        issues.push({
          severity: 'error',
          area: 'evidence.requires',
          message: `evidence ${ev.id}.requires references unknown evidence ${req}`,
          path: `evidence[${ev.id}].requires`,
        })
      }
    }
  }

  // dossierCards link integrity
  for (const dc of authority.dossierCards) {
    for (const did of dc.linkedDisputes) {
      if (!disputeIds.has(did)) {
        issues.push({
          severity: 'error',
          area: 'dossierCards.linkedDisputes',
          message: `dossier ${dc.id}.linkedDisputes=${did} not in disputes`,
          path: `dossierCards[${dc.id}].linkedDisputes`,
        })
      }
    }
    for (const eid of dc.linkedEvidence) {
      if (!evidenceIds.has(eid)) {
        issues.push({
          severity: 'error',
          area: 'dossierCards.linkedEvidence',
          message: `dossier ${dc.id}.linkedEvidence references unknown evidence ${eid}`,
          path: `dossierCards[${dc.id}].linkedEvidence`,
        })
      }
    }
    // challenges.{a,b}.questions[].requiredLieState — schema가 이미 검증. additional: each question id unique within dc
    const qids = new Set<string>()
    for (const side of ['a', 'b'] as const) {
      const ch = dc.challenges[side]
      if (!ch) continue
      for (const q of ch.questions) {
        if (qids.has(q.id)) {
          issues.push({
            severity: 'error',
            area: 'dossierCards.challenges',
            message: `dossier ${dc.id}: duplicate question id ${q.id}`,
            path: `dossierCards[${dc.id}].challenges.${side}.questions`,
          })
        }
        qids.add(q.id)
      }
    }
  }

  // witnesses
  for (const w of authority.witnesses) {
    for (const did of w.relatedDisputes) {
      if (!disputeIds.has(did)) {
        issues.push({
          severity: 'error',
          area: 'witnesses.relatedDisputes',
          message: `witness ${w.id}.relatedDisputes references unknown dispute ${did}`,
          path: `witnesses[${w.id}].relatedDisputes`,
        })
      }
    }
    for (const docKey of w.unlockedByDossier) {
      if (!dossierIds.has(docKey)) {
        issues.push({
          severity: 'error',
          area: 'witnesses.unlockedByDossier',
          message: `witness ${w.id}.unlockedByDossier references unknown dossier ${docKey}`,
          path: `witnesses[${w.id}].unlockedByDossier`,
        })
      }
    }
    const relSet = new Set(w.relatedDisputes)
    for (const did of Object.keys(w.testimony.byDispute)) {
      if (!relSet.has(did)) {
        issues.push({
          severity: 'warn',
          area: 'witnesses.testimony',
          message: `witness ${w.id}.testimony.byDispute key ${did} is not in relatedDisputes`,
          path: `witnesses[${w.id}].testimony.byDispute`,
        })
      }
    }
  }

  // combinationRecipes
  for (const recipe of authority.combinationRecipes) {
    for (const input of recipe.inputs) {
      const known =
        evidenceIds.has(input) ||
        dossierIds.has(input) ||
        input.startsWith('stmt-') ||
        input.startsWith('L-')
      if (!known) {
        issues.push({
          severity: 'warn',
          area: 'combinationRecipes.inputs',
          message: `recipe ${recipe.id}.inputs[${input}] not in evidence/dossier/statement`,
          path: `combinationRecipes[${recipe.id}].inputs`,
        })
      }
    }
    if (!evidenceIds.has(recipe.outputId) && !dossierIds.has(recipe.outputId)) {
      issues.push({
        severity: 'error',
        area: 'combinationRecipes.outputId',
        message: `recipe ${recipe.id}.outputId=${recipe.outputId} not in evidence or dossier`,
        path: `combinationRecipes[${recipe.id}].outputId`,
      })
    }
  }

  // dispute unlock conditions + progression
  for (const dispute of authority.disputes) {
    if (dispute.unlockCondition?.requireDispute) {
      const reqs = Array.isArray(dispute.unlockCondition.requireDispute)
        ? dispute.unlockCondition.requireDispute
        : [dispute.unlockCondition.requireDispute]
      for (const req of reqs) {
        if (!disputeIds.has(req.id)) {
          issues.push({
            severity: 'error',
            area: 'dispute.unlockCondition.requireDispute',
            message: `dispute ${dispute.id}.unlockCondition.requireDispute=${req.id} not in disputes`,
            path: `disputes[${dispute.id}].unlockCondition.requireDispute`,
          })
        }
      }
    }
    if (
      dispute.unlockCondition?.requireEvidence &&
      !evidenceIds.has(dispute.unlockCondition.requireEvidence)
    ) {
      issues.push({
        severity: 'error',
        area: 'dispute.unlockCondition.requireEvidence',
        message: `dispute ${dispute.id}.unlockCondition.requireEvidence=${dispute.unlockCondition.requireEvidence} not in evidence`,
        path: `disputes[${dispute.id}].unlockCondition.requireEvidence`,
      })
    }
    for (const [stage, prog] of Object.entries(dispute.progressionStages)) {
      for (const eid of prog.requiredEvidence) {
        if (!evidenceIds.has(eid)) {
          issues.push({
            severity: 'error',
            area: 'dispute.progressionStages.requiredEvidence',
            message: `dispute ${dispute.id}.progressionStages.${stage}.requiredEvidence=${eid} not in evidence`,
            path: `disputes[${dispute.id}].progressionStages.${stage}.requiredEvidence`,
          })
        }
      }
    }
  }

  // uiExposure.fieldPolicy.requireDisputeTruth
  for (const [field, policy] of Object.entries(authority.uiExposure.fieldPolicy)) {
    if (policy.requireDisputeTruth && !disputeIds.has(policy.requireDisputeTruth)) {
      issues.push({
        severity: 'error',
        area: 'uiExposure.fieldPolicy.requireDisputeTruth',
        message: `uiExposure.fieldPolicy[${field}].requireDisputeTruth=${policy.requireDisputeTruth} not in disputes`,
        path: `uiExposure.fieldPolicy[${field}].requireDisputeTruth`,
      })
    }
  }

  // baseEvidenceIds → evidence
  for (const eid of authority.baseEvidenceIds) {
    if (!evidenceIds.has(eid)) {
      issues.push({
        severity: 'error',
        area: 'baseEvidenceIds',
        message: `baseEvidenceIds references unknown evidence ${eid}`,
        path: `baseEvidenceIds`,
      })
    }
  }

  // monetaryDisputeIds → disputes
  for (const did of authority.monetaryDisputeIds) {
    if (!disputeIds.has(did)) {
      issues.push({
        severity: 'error',
        area: 'monetaryDisputeIds',
        message: `monetaryDisputeIds references unknown dispute ${did}`,
        path: `monetaryDisputeIds`,
      })
    }
  }

  // activeThirdParties → witnesses
  const witnessIds = new Set(authority.witnesses.map((w) => w.id))
  for (const wid of authority.activeThirdParties) {
    if (!witnessIds.has(wid)) {
      issues.push({
        severity: 'warn',
        area: 'activeThirdParties',
        message: `activeThirdParties references unknown witness ${wid}`,
        path: `activeThirdParties`,
      })
    }
  }

  // activeLedgerEntries → relationshipLedger
  const ledgerIds = new Set(authority.relationshipLedger.map((e) => e.id))
  for (const lid of authority.activeLedgerEntries) {
    if (!ledgerIds.has(lid)) {
      issues.push({
        severity: 'warn',
        area: 'activeLedgerEntries',
        message: `activeLedgerEntries references unknown ledger entry ${lid}`,
        path: `activeLedgerEntries`,
      })
    }
  }

  // truthTable id unique + responsibility sum check
  const truthIds = new Set<string>()
  for (const t of authority.truthTable) {
    if (truthIds.has(t.id)) {
      issues.push({
        severity: 'error',
        area: 'truthTable',
        message: `duplicate truthTable id ${t.id}`,
        path: `truthTable`,
      })
    }
    truthIds.add(t.id)
  }

  // dispute.correctResponsibility sum should equal 100
  for (const d of authority.disputes) {
    const sum = d.correctResponsibility.a + d.correctResponsibility.b
    if (sum !== 100) {
      issues.push({
        severity: 'warn',
        area: 'dispute.correctResponsibility',
        message: `dispute ${d.id}.correctResponsibility sum=${sum} (expected 100)`,
        path: `disputes[${d.id}].correctResponsibility`,
      })
    }
    if (d.requiredEvidence) {
      for (const eid of d.requiredEvidence) {
        if (!evidenceIds.has(eid)) {
          issues.push({
            severity: 'error',
            area: 'dispute.requiredEvidence',
            message: `dispute ${d.id}.requiredEvidence=${eid} not in evidence`,
            path: `disputes[${d.id}].requiredEvidence`,
          })
        }
      }
    }
  }

  return issues
}

/**
 * Full validation: schema parse + cross-reference. build step의 첫 단계에서 호출.
 * 실패 시 throw.
 */
export function parseCoreCaseAuthority(input: unknown): CoreCaseAuthority {
  const parsed = CoreCaseAuthoritySchema.parse(input)
  const issues = validateCoreCaseReferences(parsed)
  const errors = issues.filter((i) => i.severity === 'error')
  if (errors.length > 0) {
    const summary = errors.map((e) => `  [${e.area}] ${e.message}`).join('\n')
    throw new Error(`CoreCaseAuthority cross-reference errors (${errors.length}):\n${summary}`)
  }
  return parsed
}
