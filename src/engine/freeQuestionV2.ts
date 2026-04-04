/**
 * Free Question V2 엔진
 * ─────────────────────────────────
 * V2 freeQuestionHooks 기반의 제한 응답 엔진.
 * "결정형 1차 + 선택적 LLM tie-break" 구조.
 *
 * 핵심 원칙:
 * - 자유 질문 단독으로 lieState/misconceptionState를 절대 올리지 않음
 * - 오프라인 가능: deterministic-first 분류
 * - atom 범위 안에서만 응답
 */

import type { QuestionType } from '../types'
import type { LieState } from '../types'
import type { AngleTag, MisconceptionState } from '../types'
import type { FreeQuestionHook } from './v2DataLoader'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type FreeQuestionStateKey = LieState | MisconceptionState

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
}

export interface ResolvedAtomLike {
  id: string
  factText: string
  tags: string[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 설정
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CONFIG = {
  unlockTurn: 6,
  deterministicThreshold: 6,
  ambiguousGap: 1.5,
  readinessNudgeDefault: 0.5,
  empathyTrustDelta: 2,
} as const

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 활성화 게이트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const LIE_RANK: Record<string, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }

/**
 * V2 자유 질문 활성화 판정.
 * - V2 사건 + turn >= 6
 * - focus lieState >= S3 OR red_herring_pressed flag
 */
export function canUseFreeQuestionV2(input: {
  isV2Case: boolean
  turn: number
  activeDisputeId: string
  currentLieState?: LieState
  flags: Set<string>
}): boolean {
  if (!input.isV2Case) return false
  if (input.turn < CONFIG.unlockTurn) return false

  const lieOpen = input.currentLieState ? (LIE_RANK[input.currentLieState] ?? 0) >= LIE_RANK['S3'] : false
  const falseIssueOpen = input.flags.has(`${input.activeDisputeId}.red_herring_pressed`)

  return lieOpen || falseIssueOpen
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// intent 키워드 사전
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const INTENT_LEXICON: Record<string, string[]> = {
  identity_check: ['누구', '정체', '무슨 사람', '직함', '어떤 관계'],
  motive_hidden: ['왜', '숨겼', '말 못', '안 말했', '꺼내지 못'],
  privacy_motive: ['왜 폰', '휴대폰', '메신저', '캡처', '묻기 전에', '먼저 안 물어보고'],
  third_party_share: ['누구한테', '언니', '제3자', '남한테 보여', '공유'],
  trap_read: ['왜 그렇게 보여', '왜 외도처럼', '뭐가 수상', '왜 오해'],
  intermediary_route: ['왜 친구 계좌', '왜 우회', '왜 경유', '왜 정우성'],
  rule_origin: ['약속이 왜 생겼', '왜 100만원', '기준이 어디서'],
  relation_core: ['뭘 지키', '왜 서로', '왜 배제', '무엇을 보호'],
  timeline_probe: ['먼저', '언제부터', '정식 돌봄 전', '언제'],
  responsibility_soften: ['왜 계속 지연', '왜 방치가 아니라'],
  context_balance: ['직접 낸', '뭘 직접 냈', '어떤 항목을 냈'],
  trap_clarify: ['아버지가 무슨 뜻', '그 한 줄 뜻', '상속 뜻', '수첩 뜻'],
  procedural_reframe: ['다른 방법', '다른 경로', '정말 다른 루트 없', '절차'],
  relation_rule: ['왜 규칙 지킴이', '왜 그렇게 규칙'],
}

/**
 * disputeAliases를 structure-v2에서 구축하는 헬퍼.
 * DisputeV2.disputeAliases + dispute.name을 합쳐서 alias map 생성.
 */
export function buildDisputeAliasMap(
  disputes: Array<{ id: string; name?: string; disputeAliases?: string[] }>,
): Record<string, string[]> {
  const map: Record<string, string[]> = {}
  for (const d of disputes) {
    const base = [
      ...(d.name ? [d.name] : []),
      ...(d.disputeAliases ?? []),
    ].filter(Boolean)
    map[d.id] = [...new Set(base)]
  }
  return map
}

/** 파일럿 사건 fallback (structure-v2에 disputeAliases가 없는 경우) */
const FALLBACK_DISPUTE_ALIAS: Record<string, string[]> = {
  'd-1': ['280만원', '1800만원', '비밀 송금', '선이체', '예약금', '간병비'],
  'd-2': ['휴대폰', '폰', '캡처', '새벽', '60만원', '지연', '방치'],
  'd-3': ['외도', '최민정', '골목', '상담동', '수첩', '상속', '한 줄'],
  'd-4': ['150만원', '우회', '정우성', '첫 달', '월세', '다른 계좌'],
  'd-5': ['100만원', '약속', '기준', '공동 기록', '공유표', '규칙'],
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 분류기
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function classifyFreeQuestion(input: {
  question: string
  activeDisputeId: string
  currentLieState?: LieState
  currentMisconceptionState?: MisconceptionState
  hooks: FreeQuestionHook[]
  disputeAliasMap?: Record<string, string[]>
}): FreeQuestionClassificationResult {
  const normalized = input.question.toLowerCase().replace(/[?？!！.,，]/g, ' ').replace(/\s+/g, ' ').trim()
  const scoreBreakdown: FreeQuestionClassificationResult['scoreBreakdown'] = []

  for (const hook of input.hooks) {
    const reasons: string[] = []
    let score = 0

    // state 허용 체크
    const liveState = input.currentMisconceptionState ?? input.currentLieState
    if (liveState && !hook.allowedAtStates.includes(liveState as any)) {
      scoreBreakdown.push({ hookId: hook.id, score: -999, reasons: ['state_not_allowed'] })
      continue
    }

    // intentTag 키워드 매칭
    const intentHits = INTENT_LEXICON[hook.intentTag] ?? []
    const intentScore = countHits(normalized, intentHits)
    if (intentScore > 0) {
      score += 4 + intentScore
      reasons.push(`intent:+${4 + intentScore}`)
    }

    // dispute alias 매칭 (structure-v2에서 구축한 map 우선, fallback 사용)
    const disputeId = hook.answerEnvelope.disputeId || input.activeDisputeId
    const aliases = input.disputeAliasMap?.[disputeId] ?? FALLBACK_DISPUTE_ALIAS[disputeId] ?? []
    const disputeScore = countHits(normalized, aliases)
    if (disputeScore > 0) {
      score += 2 + disputeScore
      reasons.push(`dispute:+${2 + disputeScore}`)
    }

    // active dispute 보너스
    if (disputeId === input.activeDisputeId) {
      score += 1
      reasons.push('active_dispute:+1')
    }

    // 질문 형태 보너스
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

  if (!top || top.score < CONFIG.deterministicThreshold) {
    return {
      mode: 'deterministic',
      allowed: false,
      confidence: 0,
      chosenHookId: null,
      chosenIntentTag: null,
      chosenDisputeId: null,
      inferredQuestionType: 'fact_pursuit',
      inferredAngleTag: 'context',
      scoreBreakdown: ranked,
    }
  }

  const hook = input.hooks.find(h => h.id === top.hookId)!
  const gap = second ? top.score - second.score : 99
  const ambiguous = gap < CONFIG.ambiguousGap

  return {
    mode: ambiguous ? 'llm_tiebreak' : 'deterministic',
    allowed: true,
    confidence: ambiguous ? 0.62 : Math.min(0.95, 0.65 + top.score * 0.03),
    chosenHookId: hook.id,
    chosenIntentTag: hook.intentTag,
    chosenDisputeId: hook.answerEnvelope.disputeId || input.activeDisputeId,
    inferredQuestionType: inferQuestionType(hook.intentTag),
    inferredAngleTag: (hook.answerEnvelope.preferredAngleTags?.[0] as AngleTag) ?? 'context',
    scoreBreakdown: ranked,
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// atom 선택 + 응답 생성
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function selectAtoms(
  hook: FreeQuestionHook,
  atomIndex: Record<string, ResolvedAtomLike>,
): ResolvedAtomLike[] {
  const allowed = (hook.answerEnvelope.allowAtomIds ?? [])
    .map(id => atomIndex[id])
    .filter(Boolean)

  if (allowed.length <= 2) return allowed

  const preferred = new Set(hook.answerEnvelope.preferredAngleTags ?? [])
  const scored = allowed.map(atom => {
    const tagBonus = atom.tags.some(t => preferred.has(t)) ? 2 : 0
    const emotionalBonus = atom.tags.some(t => ['emotion', 'fear', 'shame', 'relationship'].includes(t)) ? 1 : 0
    return { atom, score: tagBonus + emotionalBonus }
  })

  return scored.sort((a, b) => b.score - a.score).slice(0, 2).map(x => x.atom)
}

export function renderResponse(params: {
  hook: FreeQuestionHook
  selectedAtoms: ResolvedAtomLike[]
  angleTag: AngleTag
  archetype?: string
  hookReuseCount?: number
}): { response: string; behaviorHint: string } {
  const primary = params.selectedAtoms[0]
  if (!primary) {
    return {
      response: pickRefusal(params.hook.refusalTemplates, 0),
      behaviorHint: '문장을 고르다 말고 시선을 내린다.',
    }
  }

  const second = params.selectedAtoms[1]
  const firstText = primary.factText.trim().replace(/\.$/, '')
  const secondText = second?.factText.trim().replace(/\.$/, '')

  // archetype이 있으��� 톤 패턴 기반 조립
  if (params.archetype) {
    const tone = pickTonePattern(params.archetype, params.angleTag, params.hookReuseCount ?? 0)
    if (tone) {
      const response = secondText
        ? `${tone.opener}${firstText}${tone.connector}${secondText}${tone.closer}`
        : `${tone.opener}${firstText}${tone.closer}`
      return { response, behaviorHint: getBehaviorHint(params.archetype, params.angleTag) }
    }
  }

  // fallback: 기존 angleTag 기반 접합
  switch (params.angleTag) {
    case 'identity':
      return {
        response: secondText ? `${firstText}. 그리고 ${secondText}.` : `${firstText}.`,
        behaviorHint: '실명이나 역할을 꺼낼 때만 짧게 시선을 든다.',
      }
    case 'motive':
    case 'emotion':
      return {
        response: secondText ? `${firstText}. 그래서 ${secondText}.` : `${firstText}.`,
        behaviorHint: '첫 문장은 눌러 말하고, 두 번째 문장에서만 감정이 묻어난다.',
      }
    case 'responsibility':
      return {
        response: secondText ? `${firstText}. 다만 ${secondText}.` : `${firstText}.`,
        behaviorHint: '책임을 인정하는 대목에서만 고개가 조금 내려간다.',
      }
    default:
      return {
        response: secondText ? `${firstText}. 그때 맥락은 ${secondText}.` : `${firstText}.`,
        behaviorHint: '핵심만 짧게 답하고 군더더기는 삼킨다.',
      }
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// archetype 톤 패턴 로더
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import tonePatterns from '../data/freeQuestionTonePatterns.json'

type ToneSpec = typeof tonePatterns.characterTonePatterns
const TONE_SPEC: ToneSpec = tonePatterns.characterTonePatterns as ToneSpec

const RENDER_ANGLE_TAGS = ['identity', 'motive', 'emotion', 'responsibility', 'context'] as const
type RenderAngleTag = typeof RENDER_ANGLE_TAGS[number]

function normalizeRenderAngleTag(tag: AngleTag): RenderAngleTag {
  if (RENDER_ANGLE_TAGS.includes(tag as RenderAngleTag)) return tag as RenderAngleTag
  return 'context'
}

function pickTonePattern(
  archetype: string,
  angleTag: AngleTag,
  reuseCount: number,
): { opener: string; connector: string; closer: string } | null {
  const archetypeSpec = (TONE_SPEC as any)[archetype]
  if (!archetypeSpec) return null

  const renderTag = normalizeRenderAngleTag(angleTag)
  const tagSpec = archetypeSpec[renderTag]
  if (!tagSpec) return null

  const openers: string[] = tagSpec.opener ?? []
  const connectors: string[] = tagSpec.connector ?? []
  const closers: string[] = tagSpec.closer ?? []

  if (openers.length === 0) return null

  const variant = reuseCount % Math.max(openers.length, 1)
  return {
    opener: openers[variant % openers.length] ?? '',
    connector: connectors[variant % connectors.length] ?? '. ',
    closer: closers[variant % closers.length] ?? '.',
  }
}

function getBehaviorHint(archetype: string, _angleTag: AngleTag): string {
  const hints: Record<string, string> = {
    avoidant: '시선을 피하듯 말하고, 말끝이 흐려진다.',
    confrontational: '또박또박 단정적으로 말한다.',
    victim_cosplay: '억울한 표정으로 호소하듯 말한다.',
    cold_logic: '감정 없이 짧게 끊어 말한다.',
    affect_flattening: '무표정하게 최소한으로 답한다.',
    premature_summary: '빨리 끝내려는 듯 결론부터 말한다.',
  }
  return hints[archetype] ?? '차분하게 답한다.'
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 효과 계산
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function resolveEffects(
  hook: FreeQuestionHook,
  selectedAtoms: ResolvedAtomLike[],
  runtime: FreeQuestionRuntimeState,
  currentState?: FreeQuestionStateKey,
): FreeQuestionEffect[] {
  const effects: FreeQuestionEffect[] = []

  for (const atom of selectedAtoms) {
    effects.push({ type: 'record_atom', atomId: atom.id })
  }

  if (!runtime.readinessAwardedHookIds.includes(hook.id)) {
    effects.push({ type: 'readiness_nudge', amount: CONFIG.readinessNudgeDefault })
  }

  if (
    ['relation_core', 'relation_rule', 'motive_hidden', 'privacy_motive'].includes(hook.intentTag) &&
    ['S4', 'S5', 'M4'].includes(currentState ?? 'S0')
  ) {
    effects.push({ type: 'trust_delta', amount: CONFIG.empathyTrustDelta })
  }

  if (['relation_core', 'trap_clarify', 'relation_rule'].includes(hook.intentTag)) {
    effects.push({ type: 'set_flag', flag: `${hook.answerEnvelope.disputeId}.free_question_used.${hook.intentTag}` })
  }

  return effects
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 메인 파이프라인
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function processFreeQuestionV2(input: {
  question: string
  activeDisputeId: string
  currentLieState?: LieState
  currentMisconceptionState?: MisconceptionState
  hooks: FreeQuestionHook[]
  atomIndex: Record<string, ResolvedAtomLike>
  runtime: FreeQuestionRuntimeState
  disputeAliasMap?: Record<string, string[]>
  archetype?: string
}): FreeQuestionResultV2 {
  const classification = classifyFreeQuestion({
    question: input.question,
    activeDisputeId: input.activeDisputeId,
    currentLieState: input.currentLieState,
    currentMisconceptionState: input.currentMisconceptionState,
    hooks: input.hooks,
    disputeAliasMap: input.disputeAliasMap,
  })

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
    }
  }

  const hook = input.hooks.find(h => h.id === classification.chosenHookId)!
  const liveState: FreeQuestionStateKey | undefined = input.currentMisconceptionState ?? input.currentLieState

  // state 2차 체크 (classifier에서 이미 했지만 안전장치)
  if (liveState && !hook.allowedAtStates.includes(liveState as any)) {
    const refusal = pickRefusal(
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
    }
  }

  const selectedAtoms = selectAtoms(hook, input.atomIndex)
  const rendered = renderResponse({
    hook,
    selectedAtoms,
    angleTag: classification.inferredAngleTag,
    archetype: input.archetype,
    hookReuseCount: input.runtime.usedHookIds.filter(id => id === hook.id).length,
  })
  const effects = resolveEffects(hook, selectedAtoms, input.runtime, liveState)

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
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 헬퍼
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function countHits(normalized: string, keywords: string[]): number {
  let hits = 0
  for (const keyword of keywords) {
    if (keyword && normalized.includes(keyword.toLowerCase())) hits += 1
  }
  return hits
}

function inferQuestionType(intentTag: string): QuestionType {
  if (['relation_core', 'relation_rule', 'motive_hidden', 'privacy_motive'].includes(intentTag)) {
    return 'motive_search'
  }
  return 'fact_pursuit'
}

function pickRefusal(templates: string[], usedCount: number): string {
  if (templates.length === 0) return '그 질문에는 지금 바로 답하기 어렵습니다.'
  return templates[usedCount % templates.length]
}
