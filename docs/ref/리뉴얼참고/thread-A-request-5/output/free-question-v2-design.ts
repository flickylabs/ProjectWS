/**
 * Free question V2 design
 * -----------------------
 * 목적:
 * - 현재 llmFreeQuestion.ts 의 2콜(classifier → responder) 자유 질문을
 *   V2 freeQuestionHooks 기반의 제한 응답 엔진으로 교체한다.
 * - Phase 3 스크립트 전환 기조를 유지하기 위해 "결정형 1차 + 선택적 LLM tie-break"만 허용한다.
 * - 자유 질문 단독으로 lieState / misconceptionState 를 올리지 않는다.
 *
 * 권장 모드:
 *   1) deterministic classifier (기본)
 *   2) ambiguous 일 때만 optional llm tie-break (온라인일 때)
 *   3) 응답 생성은 템플릿/atom 선택 기반. 제한적 paraphrase 는 S4+/M4 에서만 optional.
 */

import type { QuestionType } from '../types'
import type { LieState } from '../types'
import type { AngleTag, MisconceptionState } from '../types'

/* -------------------------------------------------------------------------- */
/* 1. types                                                                    */
/* -------------------------------------------------------------------------- */

export type FreeQuestionStateKey = LieState | MisconceptionState

export interface FreeQuestionAnswerEnvelopeV2 {
  disputeId: string
  allowAtomIds: string[]
  forbidAtomIds?: string[]
  preferredAngleTags?: AngleTag[]
}

export interface FreeQuestionHookV2 {
  id: string
  intentTag: string
  targetDisputeId?: string | null
  allowedAtStates: FreeQuestionStateKey[]
  answerEnvelope: FreeQuestionAnswerEnvelopeV2
  refusalTemplates: string[]
}

export interface FreeQuestionClassifierInput {
  caseId: string
  question: string
  turn: number
  activeDisputeId: string
  currentLieState?: LieState
  currentMisconceptionState?: MisconceptionState
  flags: Set<string>
  hooks: FreeQuestionHookV2[]
}

export interface FreeQuestionClassificationResult {
  mode: 'deterministic' | 'llm_tiebreak'
  allowed: boolean
  confidence: number
  chosenHookId: string | null
  chosenIntentTag: string | null
  chosenDisputeId: string | null
  inferredQuestionType: QuestionType
  inferredAngleTag: AngleTag
  scoreBreakdown: Array<{ hookId: string; score: number; reasons: string[] }>
}

export interface FreeQuestionRuntimeState {
  usedHookIds: string[]
  readinessAwardedHookIds: string[]
  refusalHistoryByHook: Record<string, number>
}

export type FreeQuestionEffect =
  | { type: 'readiness_nudge'; amount: number }
  | { type: 'trust_delta'; amount: number }
  | { type: 'reveal_link'; linkId: string }
  | { type: 'record_atom'; atomId: string }
  | { type: 'set_flag'; flag: string }

export interface FreeQuestionResultV2 {
  allowed: boolean
  hookId: string | null
  intentTag: string | null
  disputeId: string | null
  response: string
  behaviorHint: string
  inferredQuestionType: QuestionType
  inferredAngleTag: AngleTag
  selectedAtomIds: string[]
  effects: FreeQuestionEffect[]
  telemetry: FreeQuestionClassificationResult
}

export interface ResolvedAtomLike {
  id: string
  factText: string
  tags: string[]
  slots?: Record<string, unknown>
}

/* -------------------------------------------------------------------------- */
/* 2. config                                                                   */
/* -------------------------------------------------------------------------- */

export const FREE_QUESTION_V2_CONFIG = {
  unlockTurn: 6,
  deterministicThreshold: 6,
  ambiguousGap: 1.5,
  llmTiebreakEnabled: true,
  allowParaphraseAt: ['S4', 'S5', 'M4'] as FreeQuestionStateKey[],
  readinessNudgeDefault: 0.5,
  empathyTrustDelta: 2,
  accusatoryRefusalTrustDelta: -1,
} as const

/* -------------------------------------------------------------------------- */
/* 3. activation gate                                                          */
/* -------------------------------------------------------------------------- */

/**
 * 중요:
 * 현재 hook 데이터에는 spouse-01 d-3의 trap hooks 처럼 M0~M3 허용 훅이 이미 존재한다.
 * 따라서 "S3 이상만" 게이트로 묶으면 red_herring 자유 질문이 도달 불가능해진다.
 *
 * 권장 게이트:
 * - V2 사건이어야 함
 * - turn >= 6
 * - 아래 둘 중 하나를 만족
 *   a) focus lieState >= S3
 *   b) focus dispute 에 red_herring_pressed flag 가 이미 서 있음
 *
 * 세부 허용 여부는 hook.allowedAtStates 가 2차로 결정한다.
 */
export function canUseFreeQuestionV2(input: {
  isV2Case: boolean
  turn: number
  activeDisputeId: string
  currentLieState?: LieState
  flags: Set<string>
}): boolean {
  if (!input.isV2Case) return false
  if (input.turn < FREE_QUESTION_V2_CONFIG.unlockTurn) return false

  const lieOpen = input.currentLieState ? lieRank(input.currentLieState) >= lieRank('S3') : false
  const falseIssueOpen = input.flags.has(`${input.activeDisputeId}.red_herring_pressed`)

  return lieOpen || falseIssueOpen
}

/* -------------------------------------------------------------------------- */
/* 4. deterministic classifier                                                 */
/* -------------------------------------------------------------------------- */

/**
 * hook schema 에 trigger lexeme 가 아직 없으므로,
 * classifier 는 intentTag registry + dispute alias + evidence alias 조합으로 간다.
 *
 * 이 방식의 장점:
 * - offline 가능
 * - 2콜 구조 제거
 * - 현재 15개 hook 수준에서는 충분히 관리 가능
 */
export const INTENT_LEXICON: Record<string, string[]> = {
  identity_check: ['누구', '정체', '무슨 사람', '직함', '어떤 관계'],
  motive_hidden: ['왜', '숨겼', '말 못', '안 말했', '꺼내지 못'],
  privacy_motive: ['왜 폰', '휴대폰', '메신저', '캡처', '묻기 전에', '먼저 안 물어보고'],
  third_party_share: ['누구한테', '언니', '제3자', '남한테 보여', '공유'],
  trap_read: ['왜 그렇게 보여', '왜 외도처럼', '뭐가 수상', '왜 오해'],
  intermediary_route: ['왜 친구 계좌', '왜 우회', '왜 경유', '왜 정우성'],
  rule_origin: ['약속이 왜 생겼', '왜 100만원', '기준이 어디서'],
  relation_core: ['뭘 지키', '왜 서로', '왜 배제', '무엇을 보호'],
  timeline_probe: ['먼저', '언제부터', 'formal care', '정식 돌봄 전', '언제'],
  responsibility_soften: ['왜 계속 지연', '왜 delay', '왜 방치가 아니라'],
  context_balance: ['직접 낸', '뭘 직접 냈', '어떤 항목을 냈'],
  trap_clarify: ['아버지가 무슨 뜻', '그 한 줄 뜻', '상속 뜻', '수첩 뜻'],
  procedural_reframe: ['다른 방법', '다른 경로', '정말 다른 루트 없', '절차'],
  relation_rule: ['왜 규칙 지킴이', '왜 rule guardian', '왜 그렇게 규칙'],
}

export const DISPUTE_ALIAS: Record<string, string[]> = {
  'd-1': ['280만원', '1800만원', '비밀 송금', '선이체', '예약금', '간병비'],
  'd-2': ['휴대폰', '폰', '캡처', '새벽', '60만원', '지연', '방치'],
  'd-3': ['외도', '최민정', '골목', '상담동', '수첩', '상속', '한 줄'],
  'd-4': ['150만원', '우회', '정우성', '첫 달', '월세', '다른 계좌'],
  'd-5': ['100만원', '약속', '기준', '공동 기록', '공유표', '규칙'],
}

export function classifyFreeQuestionV2(
  input: FreeQuestionClassifierInput,
): FreeQuestionClassificationResult {
  const normalized = normalizeFreeQuestionText(input.question)
  const scoreBreakdown: FreeQuestionClassificationResult['scoreBreakdown'] = []

  for (const hook of input.hooks) {
    const reasons: string[] = []
    let score = 0

    const liveState = pickLiveFreeQuestionState(input.currentLieState, input.currentMisconceptionState)
    if (liveState && !hook.allowedAtStates.includes(liveState)) {
      scoreBreakdown.push({ hookId: hook.id, score: -999, reasons: ['state_not_allowed'] })
      continue
    }

    const intentHits = INTENT_LEXICON[hook.intentTag] ?? []
    const intentScore = countKeywordHits(normalized, intentHits)
    if (intentScore > 0) {
      score += 4 + intentScore
      reasons.push(`intent:+${4 + intentScore}`)
    }

    const disputeId = hook.answerEnvelope.disputeId || hook.targetDisputeId || input.activeDisputeId
    const aliases = DISPUTE_ALIAS[disputeId] ?? []
    const disputeScore = countKeywordHits(normalized, aliases)
    if (disputeScore > 0) {
      score += 2 + disputeScore
      reasons.push(`dispute:+${2 + disputeScore}`)
    }

    if (disputeId === input.activeDisputeId) {
      score += 1
      reasons.push('active_dispute:+1')
    }

    if (/왜|어째서|무슨 이유/.test(input.question) && hook.answerEnvelope.preferredAngleTags?.includes('motive')) {
      score += 2
      reasons.push('motive_shape:+2')
    }

    if (/누구|정체|무슨 사람/.test(input.question) && hook.answerEnvelope.preferredAngleTags?.includes('identity')) {
      score += 2
      reasons.push('identity_shape:+2')
    }

    if (/어떻게 보여|왜 그렇게 읽|오해/.test(input.question) && hook.intentTag.includes('trap')) {
      score += 2
      reasons.push('trap_shape:+2')
    }

    scoreBreakdown.push({ hookId: hook.id, score, reasons })
  }

  const ranked = [...scoreBreakdown].sort((a, b) => b.score - a.score)
  const top = ranked[0]
  const second = ranked[1]

  if (!top || top.score < FREE_QUESTION_V2_CONFIG.deterministicThreshold) {
    return buildIrrelevantClassification(scoreBreakdown)
  }

  const hook = input.hooks.find(h => h.id === top.hookId)!
  const gap = second ? top.score - second.score : 99
  const ambiguous = gap < FREE_QUESTION_V2_CONFIG.ambiguousGap

  return {
    mode: ambiguous ? 'llm_tiebreak' : 'deterministic',
    allowed: true,
    confidence: ambiguous ? 0.62 : Math.min(0.95, 0.65 + top.score * 0.03),
    chosenHookId: hook.id,
    chosenIntentTag: hook.intentTag,
    chosenDisputeId: hook.answerEnvelope.disputeId || hook.targetDisputeId || input.activeDisputeId,
    inferredQuestionType: inferQuestionTypeFromIntent(hook.intentTag),
    inferredAngleTag: inferAngleTagFromHook(hook),
    scoreBreakdown: ranked,
  }
}

export async function maybeResolveAmbiguousHookWithLLM(
  input: FreeQuestionClassifierInput,
  deterministic: FreeQuestionClassificationResult,
): Promise<FreeQuestionClassificationResult> {
  if (!FREE_QUESTION_V2_CONFIG.llmTiebreakEnabled) return deterministic
  if (deterministic.mode !== 'llm_tiebreak') return deterministic

  /**
   * 실제 구현 권장:
   * - 현재 llmFreeQuestion.ts 의 2콜 classifier 를 재사용하지 말고,
   *   top 3 hooks 만 보여 주는 single-call tie-break 로 축소한다.
   * - 출력은 chosenHookId 만.
   * - offline / error 시 deterministic 결과를 그대로 사용.
   */
  return deterministic
}

/* -------------------------------------------------------------------------- */
/* 5. atom selection + deterministic answer                                    */
/* -------------------------------------------------------------------------- */

export function selectFreeQuestionAtoms(
  hook: FreeQuestionHookV2,
  atomIndex: Record<string, ResolvedAtomLike>,
): ResolvedAtomLike[] {
  const allowed = hook.answerEnvelope.allowAtomIds
    .map(id => atomIndex[id])
    .filter(Boolean)

  if (allowed.length <= 2) return allowed

  const preferred = new Set(hook.answerEnvelope.preferredAngleTags ?? [])

  const scored = allowed.map(atom => {
    const tagBonus = atom.tags.some(tag => preferred.has(tag as AngleTag)) ? 2 : 0
    const emotionalBonus = atom.tags.some(tag => ['emotion', 'fear', 'shame', 'relationship'].includes(tag)) ? 1 : 0
    return { atom, score: tagBonus + emotionalBonus }
  })

  return scored.sort((a, b) => b.score - a.score).slice(0, 2).map(x => x.atom)
}

export function renderFreeQuestionResponseV2(params: {
  hook: FreeQuestionHookV2
  selectedAtoms: ResolvedAtomLike[]
  currentState?: FreeQuestionStateKey
}): { response: string; behaviorHint: string } {
  const primary = params.selectedAtoms[0]
  const secondary = params.selectedAtoms[1]
  const angle = inferAngleTagFromHook(params.hook)

  if (!primary) {
    return {
      response: pickRefusalTemplate(params.hook.refusalTemplates, 0),
      behaviorHint: '문장을 고르다 말고 시선을 내린다.',
    }
  }

  const first = renderAtomAsClause(primary, angle, params.currentState)
  const second = secondary ? renderAtomAsClause(secondary, angle, params.currentState) : ''

  switch (angle) {
    case 'identity':
      return {
        response: second
          ? `${first} 그리고 ${second}.`
          : `${first}.`,
        behaviorHint: '실명이나 역할을 꺼낼 때만 짧게 시선을 든다.',
      }

    case 'motive':
    case 'emotion':
      return {
        response: second
          ? `${first}. 그래서 ${second}.`
          : `${first}.`,
        behaviorHint: '첫 문장은 눌러 말하고, 두 번째 문장에서만 감정이 묻어난다.',
      }

    case 'responsibility':
      return {
        response: second
          ? `${first}. 다만 ${second}.`
          : `${first}.`,
        behaviorHint: '책임을 인정하는 대목에서만 고개가 조금 내려간다.',
      }

    default:
      return {
        response: second
          ? `${first}. 그때 맥락은 ${second}.`
          : `${first}.`,
        behaviorHint: '핵심만 짧게 답하고 군더더기는 삼킨다.',
      }
  }
}

function renderAtomAsClause(
  atom: ResolvedAtomLike,
  angle: AngleTag,
  state?: FreeQuestionStateKey,
): string {
  /**
   * 실제 구현에서는 slot renderer / atom surface chooser 를 재사용 권장.
   * 이 설계 문서는 "한 문장 프레임"만 정의한다.
   */
  const exactOpen = state === 'S5' || state === 'M4'
  if (angle === 'identity') return atom.factText.replace(/라는 사실|구체 인정|규정/g, '').trim()
  if (angle === 'motive' || angle === 'emotion') return atom.factText.replace(/이라는|다는/,'').trim()
  if (angle === 'responsibility') return atom.factText.replace(/인정|책임/g, '').trim()
  return exactOpen ? atom.factText : atom.factText
}

/* -------------------------------------------------------------------------- */
/* 6. refusal / effects                                                        */
/* -------------------------------------------------------------------------- */

export function resolveFreeQuestionEffects(
  hook: FreeQuestionHookV2,
  selectedAtoms: ResolvedAtomLike[],
  runtime: FreeQuestionRuntimeState,
  currentState?: FreeQuestionStateKey,
): FreeQuestionEffect[] {
  const effects: FreeQuestionEffect[] = []

  for (const atom of selectedAtoms) {
    effects.push({ type: 'record_atom', atomId: atom.id })
  }

  if (!runtime.readinessAwardedHookIds.includes(hook.id)) {
    effects.push({ type: 'readiness_nudge', amount: FREE_QUESTION_V2_CONFIG.readinessNudgeDefault })
  }

  if (
    ['relation_core', 'relation_rule', 'motive_hidden', 'privacy_motive'].includes(hook.intentTag) &&
    ['S4', 'S5', 'M4'].includes(currentState ?? 'S0')
  ) {
    effects.push({ type: 'trust_delta', amount: FREE_QUESTION_V2_CONFIG.empathyTrustDelta })
  }

  /**
   * link reveal 은 relation-core / trap-clarify 계열에서만 작은 보상으로 허용.
   * lieState / misconception transition 은 절대 발생시키지 않는다.
   */
  if (['relation_core', 'trap_clarify', 'relation_rule'].includes(hook.intentTag)) {
    effects.push({ type: 'set_flag', flag: `${hook.answerEnvelope.disputeId}.free_question_used.${hook.intentTag}` })
  }

  return effects
}

export function pickRefusalTemplate(templates: string[], usedCount: number): string {
  if (templates.length === 0) return '그 질문에는 지금 바로 답하기 어렵습니다.'
  const idx = usedCount % templates.length
  return templates[idx]
}

/* -------------------------------------------------------------------------- */
/* 7. main pipeline                                                            */
/* -------------------------------------------------------------------------- */

export async function processFreeQuestionV2(input: {
  classifierInput: FreeQuestionClassifierInput
  hooks: FreeQuestionHookV2[]
  atomIndex: Record<string, ResolvedAtomLike>
  runtime: FreeQuestionRuntimeState
}): Promise<FreeQuestionResultV2> {
  const firstPass = classifyFreeQuestionV2(input.classifierInput)
  const classification = await maybeResolveAmbiguousHookWithLLM(input.classifierInput, firstPass)

  if (!classification.allowed || !classification.chosenHookId) {
    return {
      allowed: false,
      hookId: null,
      intentTag: null,
      disputeId: null,
      response: '그 질문은 지금 제 답의 범위를 벗어납니다.',
      behaviorHint: '질문을 되뇌듯 짧게 침묵한다.',
      inferredQuestionType: classification.inferredQuestionType,
      inferredAngleTag: classification.inferredAngleTag,
      selectedAtomIds: [],
      effects: [],
      telemetry: classification,
    }
  }

  const hook = input.hooks.find(h => h.id === classification.chosenHookId)!
  const liveState = pickLiveFreeQuestionState(
    input.classifierInput.currentLieState,
    input.classifierInput.currentMisconceptionState,
  )

  if (liveState && !hook.allowedAtStates.includes(liveState)) {
    const refusal = pickRefusalTemplate(
      hook.refusalTemplates,
      input.runtime.refusalHistoryByHook[hook.id] ?? 0,
    )

    return {
      allowed: false,
      hookId: hook.id,
      intentTag: hook.intentTag,
      disputeId: hook.answerEnvelope.disputeId,
      response: refusal,
      behaviorHint: '말을 고르다 멈추고 시선을 피한다.',
      inferredQuestionType: classification.inferredQuestionType,
      inferredAngleTag: classification.inferredAngleTag,
      selectedAtomIds: [],
      effects: [],
      telemetry: classification,
    }
  }

  const selectedAtoms = selectFreeQuestionAtoms(hook, input.atomIndex)
  const rendered = renderFreeQuestionResponseV2({
    hook,
    selectedAtoms,
    currentState: liveState,
  })
  const effects = resolveFreeQuestionEffects(hook, selectedAtoms, input.runtime, liveState)

  return {
    allowed: true,
    hookId: hook.id,
    intentTag: hook.intentTag,
    disputeId: hook.answerEnvelope.disputeId,
    response: rendered.response,
    behaviorHint: rendered.behaviorHint,
    inferredQuestionType: classification.inferredQuestionType,
    inferredAngleTag: classification.inferredAngleTag,
    selectedAtomIds: selectedAtoms.map(a => a.id),
    effects,
    telemetry: classification,
  }
}

/* -------------------------------------------------------------------------- */
/* 8. integration / logging                                                    */
/* -------------------------------------------------------------------------- */

export const freeQuestionIntegrationSnippet = `
if (!canUseFreeQuestionV2({
  isV2Case,
  turn: currentTurn,
  activeDisputeId: focusDisputeId,
  currentLieState,
  flags,
})) {
  return disableFreeQuestionInput()
}

const result = await processFreeQuestionV2({
  classifierInput: {
    caseId,
    question: freeInput,
    turn: currentTurn,
    activeDisputeId: focusDisputeId,
    currentLieState,
    currentMisconceptionState,
    flags,
    hooks: freeQuestionHooks,
  },
  hooks: freeQuestionHooks,
  atomIndex,
  runtime: freeQuestionRuntime,
})

for (const effect of result.effects) {
  if (effect.type === 'readiness_nudge') addReadiness(effect.amount)
  if (effect.type === 'trust_delta') addTrustTowardJudge(targetParty, effect.amount)
  if (effect.type === 'record_atom') recordRevealedAtom(effect.atomId)
  if (effect.type === 'reveal_link') recordResolvedLink(effect.linkId)
  if (effect.type === 'set_flag') setFlag(effect.flag)
}

recordTurnStyle(result.inferredQuestionType, result.inferredAngleTag)
appendPhase3Transcript({ speaker: targetParty, line: result.response, behaviorHint: result.behaviorHint })
`.trim()

/**
 * phase3LogCollector 에 필요한 건 기존 API 로 충분하다.
 * - revealed atom: recordRevealedAtom
 * - relation / trap link: recordResolvedLink
 * - style: recordTurnStyle
 *
 * 선택 사항:
 * - key moment 에 free_question 을 넣고 싶으면 Phase3KeyMoment.kind 에 'free_question' 추가.
 */
export const freeQuestionLoggingNotes = [
  'recordRevealedAtom(atomId) 는 자유 질문에서도 그대로 재사용한다.',
  'lieState / misconceptionState transition 함수는 호출하지 않는다.',
  'hook별 readiness bonus 는 1회만 지급하고 runtime.readinessAwardedHookIds 로 잠근다.',
] as const

/* -------------------------------------------------------------------------- */
/* 9. helpers                                                                  */
/* -------------------------------------------------------------------------- */

function normalizeFreeQuestionText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[?？!！.,，]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function countKeywordHits(normalized: string, keywords: string[]): number {
  let hits = 0
  for (const keyword of keywords) {
    if (keyword && normalized.includes(keyword.toLowerCase())) hits += 1
  }
  return hits
}

function buildIrrelevantClassification(
  scoreBreakdown: FreeQuestionClassificationResult['scoreBreakdown'],
): FreeQuestionClassificationResult {
  return {
    mode: 'deterministic',
    allowed: false,
    confidence: 0,
    chosenHookId: null,
    chosenIntentTag: null,
    chosenDisputeId: null,
    inferredQuestionType: 'fact_pursuit',
    inferredAngleTag: 'context',
    scoreBreakdown,
  }
}

function inferQuestionTypeFromIntent(intentTag: string): QuestionType {
  if (['relation_core', 'relation_rule', 'motive_hidden', 'privacy_motive'].includes(intentTag)) {
    return 'motive_search'
  }
  if (['third_party_share'].includes(intentTag)) {
    return 'fact_pursuit'
  }
  if (['trap_read', 'trap_clarify'].includes(intentTag)) {
    return 'fact_pursuit'
  }
  return 'fact_pursuit'
}

function inferAngleTagFromHook(hook: FreeQuestionHookV2): AngleTag {
  return hook.answerEnvelope.preferredAngleTags?.[0] ?? 'context'
}

function pickLiveFreeQuestionState(
  lieState?: LieState,
  misconceptionState?: MisconceptionState,
): FreeQuestionStateKey | undefined {
  return misconceptionState ?? lieState
}

function lieRank(s: LieState): number {
  return { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }[s]
}
