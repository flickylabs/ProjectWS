/**
 * Misconception engine design
 * ---------------------------
 * 목적:
 * - DisputeV2.misconception(M0~M4)을 lieState와 병렬로 추적한다.
 * - red_herring / shared_misconception 쟁점에서 "오해가 굳는 과정"과
 *   "오해가 해소되는 과정"을 런타임 규칙으로 만든다.
 * - BeatSelectorV2 / InterjectionV2 / Phase3StructuredLog 와 자연스럽게 연결한다.
 *
 * repo 배치 권장:
 *   - src/engine/misconceptionEngine.ts
 *   - src/store/phase3/misconceptionState.ts (or existing phase3 slice)
 *   - handleQuestion / handleEvidencePresent / interjection resolution 에서 호출
 *
 * 핵심 원칙:
 * 1) misconception 은 "자백"이 아니라 "해석의 정리"이므로 lieState와 분리한다.
 * 2) M-state 는 기본적으로 단조 증가한다. (되돌아감 없음)
 * 3) M0→M2 는 오해가 굳는 구간, M2→M4 는 증거/맥락으로 풀리는 구간이다.
 * 4) M4 도달 시 red_herring 가 disproved 처리되고, phase3LogCollector 가 기록한다.
 */

import type { QuestionType, PartyId, LieState } from '../types'
import type { AngleTag, BeliefMode, MisconceptionState, TrapState } from '../types'
import type { DisputeV2, DisputeLinkEdge } from '../types'

/* -------------------------------------------------------------------------- */
/* 1. runtime types                                                            */
/* -------------------------------------------------------------------------- */

export type MisconceptionTriggerType =
  | 'focus_first_probe'
  | 'focus_repeat_probe'
  | 'same_angle_loop'
  | 'misbelief_interjection_allowed'
  | 'trap_signal_seen'
  | 'truth_exit_evidence_presented'
  | 'supporting_context_link_resolved'
  | 'core_context_confirmed'
  | 'manual_clarify'

export interface MisconceptionTransitionTrigger {
  type: MisconceptionTriggerType
  turn: number
  source:
    | 'question'
    | 'evidence'
    | 'interjection'
    | 'link'
    | 'system'
  questionType?: QuestionType
  angleTag?: AngleTag
  evidenceId?: string
  trapSignal?: string
  linkId?: string
  byParty?: PartyId
}

export interface MisconceptionProgress {
  /** 이 쟁점을 false issue 로 몇 번 눌렀는가 */
  focusCount: number
  /** 같은 angleTag 반복으로 오해를 얼마나 굳혔는가 */
  reinforcementCount: number
  /** trap signal 을 몇 개나 인식했는가 */
  trapSignalsSeen: string[]
  /** truthExitEvidence 를 몇 개 확보했는가 */
  truthExitEvidenceSeen: string[]
  /** clarification 단계에서 이미 풀린 link */
  resolvedLinkIds: string[]
  /** M3 이후 relation-core follow-up 가 있었는가 */
  coreContextConfirmCount: number
  /** 직전 angle */
  lastAngleTag?: AngleTag
  /** 마지막 전이 턴 */
  lastAdvancedTurn?: number
  /** M4 확정 턴 */
  disprovedAtTurn?: number
}

export interface MisconceptionRuntimeEntry {
  disputeId: string
  state: MisconceptionState
  beliefDriver: Exclude<BeliefMode, 'knows'> | 'knows'
  progress: MisconceptionProgress
}

export type MisconceptionStateMap = Record<string, MisconceptionState>
export type MisconceptionRuntimeMap = Record<string, MisconceptionRuntimeEntry>

export type MisconceptionTransitionEffect =
  | { type: 'set_flag'; flag: string }
  | { type: 'clear_flag'; flag: string }
  | { type: 'log_disproved_fake_issue'; disputeId: string }
  | { type: 'selector_context_hint'; misconceptionState: MisconceptionState; trapState: TrapState }

export interface MisconceptionTransitionResult {
  changed: boolean
  from: MisconceptionState
  to: MisconceptionState
  entry: MisconceptionRuntimeEntry
  trapState: TrapState
  effects: MisconceptionTransitionEffect[]
  debugNotes: string[]
}

/* -------------------------------------------------------------------------- */
/* 2. config                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * dominant belief mode 가 누구냐에 따라 M1→M2(확신 굳힘)의 threshold 가 달라진다.
 * - suspects: 여러 번 눌러야 확신이 굳는다.
 * - misbelief / weaponizes: 한 번만 더 눌러도 M2로 올라간다.
 */
export const MISCONCEPTION_RULES = {
  suspects: {
    reinforceToLock: 2,
  },
  misbelief: {
    reinforceToLock: 1,
  },
  weaponizes: {
    reinforceToLock: 1,
  },
  knows: {
    reinforceToLock: 2,
  },
} as const

/* -------------------------------------------------------------------------- */
/* 3. seed / helpers                                                           */
/* -------------------------------------------------------------------------- */

export function createInitialMisconceptionProgress(): MisconceptionProgress {
  return {
    focusCount: 0,
    reinforcementCount: 0,
    trapSignalsSeen: [],
    truthExitEvidenceSeen: [],
    resolvedLinkIds: [],
    coreContextConfirmCount: 0,
  }
}

export function seedMisconceptionRuntime(dispute: DisputeV2): MisconceptionRuntimeEntry | null {
  if (!dispute.misconception) return null

  return {
    disputeId: dispute.id,
    state: 'M0',
    beliefDriver: resolveDominantBeliefMode(dispute),
    progress: createInitialMisconceptionProgress(),
  }
}

export function resolveDominantBeliefMode(dispute: DisputeV2): MisconceptionRuntimeEntry['beliefDriver'] {
  const modes = Object.values(dispute.misconception?.beliefModeByParty ?? {})
  if (modes.includes('weaponizes')) return 'weaponizes'
  if (modes.includes('misbelief')) return 'misbelief'
  if (modes.includes('suspects')) return 'suspects'
  return 'knows'
}

export function misconceptionToTrapState(state: MisconceptionState): TrapState {
  switch (state) {
    case 'M0':
    case 'M1':
      return 'suspected'
    case 'M2':
    case 'M3':
      return 'active'
    case 'M4':
      return 'clarified'
  }
}

function pushUnique(list: string[], value?: string): string[] {
  if (!value) return list
  return list.includes(value) ? list : [...list, value]
}

function hasTruthExitEvidence(entry: MisconceptionRuntimeEntry): boolean {
  return entry.progress.truthExitEvidenceSeen.length > 0
}

function canResolveAtM3(entry: MisconceptionRuntimeEntry): boolean {
  return hasTruthExitEvidence(entry) && (
    entry.progress.coreContextConfirmCount >= 1 ||
    entry.progress.resolvedLinkIds.length >= 1
  )
}

/* -------------------------------------------------------------------------- */
/* 4. trigger derivation                                                       */
/* -------------------------------------------------------------------------- */

export interface DeriveQuestionTriggerInput {
  dispute: DisputeV2
  entry: MisconceptionRuntimeEntry
  turn: number
  questionType: QuestionType
  angleTag: AngleTag
  matchedTrapSignal?: string | null
}

/**
 * 질문 기반 trigger 파생 규칙.
 *
 * 해석:
 * - 첫 probing 은 M0→M1 을 만든다.
 * - 같은 false issue 를 같은 각도로 계속 누르면 M1→M2 로 굳는다.
 * - trap signal 을 직접 건드리면 clarification point 를 얻는다.
 * - M3 이후 emotion / responsibility / context follow-up 는 M4 마무리 재료가 된다.
 */
export function deriveMisconceptionTriggerFromQuestion(
  input: DeriveQuestionTriggerInput,
): MisconceptionTransitionTrigger | null {
  if (!input.dispute.misconception) return null

  if (input.matchedTrapSignal) {
    return {
      type: 'trap_signal_seen',
      turn: input.turn,
      source: 'question',
      questionType: input.questionType,
      angleTag: input.angleTag,
      trapSignal: input.matchedTrapSignal,
    }
  }

  if (input.entry.state === 'M0') {
    return {
      type: 'focus_first_probe',
      turn: input.turn,
      source: 'question',
      questionType: input.questionType,
      angleTag: input.angleTag,
    }
  }

  if (input.entry.state === 'M1' || input.entry.state === 'M2') {
    const sameAngle = input.entry.progress.lastAngleTag === input.angleTag
    return {
      type: sameAngle ? 'same_angle_loop' : 'focus_repeat_probe',
      turn: input.turn,
      source: 'question',
      questionType: input.questionType,
      angleTag: input.angleTag,
    }
  }

  if (
    input.entry.state === 'M3' &&
    ['context', 'responsibility', 'emotion', 'motive'].includes(input.angleTag)
  ) {
    return {
      type: 'core_context_confirmed',
      turn: input.turn,
      source: 'question',
      questionType: input.questionType,
      angleTag: input.angleTag,
    }
  }

  return null
}

export interface DeriveEvidenceTriggerInput {
  dispute: DisputeV2
  turn: number
  evidenceId: string
}

export function deriveMisconceptionTriggerFromEvidence(
  input: DeriveEvidenceTriggerInput,
): MisconceptionTransitionTrigger | null {
  const exits = input.dispute.misconception?.truthExitEvidenceIds ?? []
  if (!exits.includes(input.evidenceId)) return null

  return {
    type: 'truth_exit_evidence_presented',
    turn: input.turn,
    source: 'evidence',
    evidenceId: input.evidenceId,
  }
}

export interface DeriveInterjectionTriggerInput {
  dispute: DisputeV2
  turn: number
  infoLevel: 'emotional_only' | 'detail_rebuttal' | 'misbelief_escalation' | 'trap_signal'
  trapSignal?: string
}

export function deriveMisconceptionTriggerFromInterjection(
  input: DeriveInterjectionTriggerInput,
): MisconceptionTransitionTrigger | null {
  if (!input.dispute.misconception) return null

  if (input.infoLevel === 'trap_signal') {
    return {
      type: 'trap_signal_seen',
      turn: input.turn,
      source: 'interjection',
      trapSignal: input.trapSignal,
    }
  }

  if (input.infoLevel === 'misbelief_escalation') {
    return {
      type: 'misbelief_interjection_allowed',
      turn: input.turn,
      source: 'interjection',
    }
  }

  return null
}

/* -------------------------------------------------------------------------- */
/* 5. transition reducer                                                       */
/* -------------------------------------------------------------------------- */

export interface TransitionMisconceptionInput {
  dispute: DisputeV2
  entry: MisconceptionRuntimeEntry
  trigger: MisconceptionTransitionTrigger
}

/**
 * misconception reducer.
 *
 * state meaning:
 * - M0: 외형상 의심
 * - M1: identity / role 공백에 해석이 채워짐
 * - M2: 잘못된 해석이 거의 확신으로 굳음
 * - M3: 반증 맥락이 붙으며 확신이 흔들림
 * - M4: 오해 해소 + 남는 관계 상처 정리
 */
export function transitionMisconception(
  input: TransitionMisconceptionInput,
): MisconceptionTransitionResult {
  const next: MisconceptionRuntimeEntry = {
    disputeId: input.entry.disputeId,
    state: input.entry.state,
    beliefDriver: input.entry.beliefDriver,
    progress: {
      ...input.entry.progress,
      trapSignalsSeen: [...input.entry.progress.trapSignalsSeen],
      truthExitEvidenceSeen: [...input.entry.progress.truthExitEvidenceSeen],
      resolvedLinkIds: [...input.entry.progress.resolvedLinkIds],
    },
  }

  const from = input.entry.state
  const debugNotes: string[] = []
  const effects: MisconceptionTransitionEffect[] = []

  switch (input.trigger.type) {
    case 'focus_first_probe': {
      next.progress.focusCount += 1
      next.progress.lastAngleTag = input.trigger.angleTag
      if (next.state === 'M0') {
        next.state = 'M1'
        effects.push({ type: 'set_flag', flag: `${input.dispute.id}.red_herring_pressed` })
        debugNotes.push('first probe: M0 → M1')
      }
      break
    }

    case 'focus_repeat_probe':
    case 'same_angle_loop':
    case 'misbelief_interjection_allowed': {
      next.progress.focusCount += 1
      next.progress.reinforcementCount += input.trigger.type === 'same_angle_loop' ? 1 : 1
      next.progress.lastAngleTag = input.trigger.angleTag ?? next.progress.lastAngleTag

      if (next.state === 'M0') {
        next.state = 'M1'
        effects.push({ type: 'set_flag', flag: `${input.dispute.id}.red_herring_pressed` })
        debugNotes.push('repeat on fresh issue still opens M1 first')
      }

      const threshold = MISCONCEPTION_RULES[next.beliefDriver].reinforceToLock
      if (next.state === 'M1' && next.progress.reinforcementCount >= threshold) {
        next.state = 'M2'
        effects.push({ type: 'set_flag', flag: `${input.dispute.id}.trap_active` })
        debugNotes.push(`reinforcement reached threshold ${threshold}: M1 → M2`)
      }
      break
    }

    case 'trap_signal_seen': {
      next.progress.trapSignalsSeen = pushUnique(next.progress.trapSignalsSeen, input.trigger.trapSignal)
      next.progress.lastAngleTag = input.trigger.angleTag ?? next.progress.lastAngleTag

      if (next.state === 'M0') {
        next.state = 'M1'
        effects.push({ type: 'set_flag', flag: `${input.dispute.id}.red_herring_pressed` })
        debugNotes.push('trap signal on unopened issue: M0 → M1')
      } else if (next.state === 'M1') {
        const threshold = MISCONCEPTION_RULES[next.beliefDriver].reinforceToLock
        next.progress.reinforcementCount = Math.max(next.progress.reinforcementCount, threshold)
        next.state = 'M2'
        effects.push({ type: 'set_flag', flag: `${input.dispute.id}.trap_active` })
        debugNotes.push('trap signal makes the false reading cohere: M1 → M2')
      } else if (next.state === 'M2' && next.progress.trapSignalsSeen.length >= 2) {
        next.state = 'M3'
        effects.push({ type: 'set_flag', flag: `${input.dispute.id}.crop_context_opened` })
        debugNotes.push('enough trap signals accumulated: M2 → M3')
      }
      break
    }

    case 'truth_exit_evidence_presented': {
      next.progress.truthExitEvidenceSeen = pushUnique(next.progress.truthExitEvidenceSeen, input.trigger.evidenceId)

      if (next.state === 'M0') {
        next.state = 'M1'
        effects.push({ type: 'set_flag', flag: `${input.dispute.id}.red_herring_pressed` })
        debugNotes.push('exit evidence on unopened issue: still opens M1 first')
      }

      if (next.state === 'M1' || next.state === 'M2') {
        next.state = 'M3'
        effects.push({ type: 'set_flag', flag: `${input.dispute.id}.crop_context_opened` })
        debugNotes.push('truth exit evidence shakes certainty: M1/M2 → M3')
      } else if (next.state === 'M3' && canResolveAtM3(next)) {
        next.state = 'M4'
        debugNotes.push('truth exit evidence + prior resolution anchor: M3 → M4')
      }
      break
    }

    case 'supporting_context_link_resolved': {
      next.progress.resolvedLinkIds = pushUnique(next.progress.resolvedLinkIds, input.trigger.linkId)
      if (next.state === 'M3' && canResolveAtM3(next)) {
        next.state = 'M4'
        debugNotes.push('supporting link resolves after evidence: M3 → M4')
      }
      break
    }

    case 'core_context_confirmed':
    case 'manual_clarify': {
      next.progress.coreContextConfirmCount += 1
      next.progress.lastAngleTag = input.trigger.angleTag ?? next.progress.lastAngleTag
      if (next.state === 'M3' && canResolveAtM3(next)) {
        next.state = 'M4'
        debugNotes.push('core follow-up confirms what remains after the false issue collapses: M3 → M4')
      }
      break
    }
  }

  if (from !== next.state) {
    next.progress.lastAdvancedTurn = input.trigger.turn
  }

  if (from !== 'M4' && next.state === 'M4') {
    next.progress.disprovedAtTurn = input.trigger.turn
    effects.push({ type: 'set_flag', flag: `${input.dispute.id}.red_herring_disproved` })
    effects.push({ type: 'clear_flag', flag: `${input.dispute.id}.trap_active` })
    effects.push({ type: 'log_disproved_fake_issue', disputeId: input.dispute.id })
  }

  const trapState = misconceptionToTrapState(next.state)
  effects.push({ type: 'selector_context_hint', misconceptionState: next.state, trapState })

  return {
    changed: from !== next.state,
    from,
    to: next.state,
    entry: next,
    trapState,
    effects,
    debugNotes,
  }
}

/* -------------------------------------------------------------------------- */
/* 6. link integration                                                         */
/* -------------------------------------------------------------------------- */

export function shouldFeedLinkIntoMisconception(
  dispute: DisputeV2,
  link: DisputeLinkEdge,
): boolean {
  if (!dispute.misconception) return false
  if (link.fromDisputeId !== dispute.id) return false
  return link.type === 'retaliation' || link.type === 'unlocks_layer'
}

/* -------------------------------------------------------------------------- */
/* 7. store slice sketch                                                       */
/* -------------------------------------------------------------------------- */

export interface MisconceptionStoreSlice {
  misconceptionStateMap: MisconceptionStateMap
  misconceptionRuntimeMap: MisconceptionRuntimeMap

  seedMisconceptionForCase(disputes: DisputeV2[]): void
  transitionMisconception(disputeId: string, trigger: MisconceptionTransitionTrigger): MisconceptionTransitionResult | null
}

/**
 * 구현 스케치:
 * - 빠른 selector 접근은 misconceptionStateMap 으로.
 * - 실제 전이/telemetry 는 misconceptionRuntimeMap 으로.
 */
export const misconceptionStoreSketch = `
const createMisconceptionSlice = (set, get): MisconceptionStoreSlice => ({
  misconceptionStateMap: {},
  misconceptionRuntimeMap: {},

  seedMisconceptionForCase(disputes) {
    const runtime: MisconceptionRuntimeMap = {}
    const quick: MisconceptionStateMap = {}

    for (const dispute of disputes) {
      const entry = seedMisconceptionRuntime(dispute)
      if (!entry) continue
      runtime[dispute.id] = entry
      quick[dispute.id] = entry.state
    }

    set(state => ({
      ...state,
      misconceptionRuntimeMap: runtime,
      misconceptionStateMap: quick,
    }))
  },

  transitionMisconception(disputeId, trigger) {
    const state = get()
    const dispute = state.caseRuntime.disputeIndex[disputeId] as DisputeV2 | undefined
    const current = state.misconceptionRuntimeMap[disputeId]
    if (!dispute || !current) return null

    const result = transitionMisconception({ dispute, entry: current, trigger })

    set(s => ({
      ...s,
      misconceptionRuntimeMap: {
        ...s.misconceptionRuntimeMap,
        [disputeId]: result.entry,
      },
      misconceptionStateMap: {
        ...s.misconceptionStateMap,
        [disputeId]: result.entry.state,
      },
    }))

    return result
  },
})
`.trim()

/* -------------------------------------------------------------------------- */
/* 8. handleQuestion / evidence / interjection integration                     */
/* -------------------------------------------------------------------------- */

/**
 * handleQuestion 통합 순서 권장:
 * 1) blueprint / beat / question effect / lie transition
 * 2) misconception trigger derive + transition
 * 3) trapState / misconceptionState 를 selector context 로 재주입
 * 4) M4 도달 시 phase3LogCollector.recordDisprovedFakeIssue(disputeId)
 */
export const handleQuestionIntegrationSnippet = `
const disputeV2 = getDisputeV2(caseId, focusDisputeId)
const misconceptionEntry = store.getState().misconceptionRuntimeMap[focusDisputeId]

if (disputeV2?.misconception && misconceptionEntry) {
  const matchedTrapSignal = matchTrapSignal(disputeV2.misconception.trapSignals, questionText)
  const mcTrigger = deriveMisconceptionTriggerFromQuestion({
    dispute: disputeV2,
    entry: misconceptionEntry,
    turn: nextTurn,
    questionType,
    angleTag,
    matchedTrapSignal,
  })

  if (mcTrigger) {
    const mcResult = store.getState().transitionMisconception(focusDisputeId, mcTrigger)

    if (mcResult?.to === 'M4') {
      recordDisprovedFakeIssue(focusDisputeId)
    }
  }
}
`.trim()

export const handleEvidenceIntegrationSnippet = `
const mcEvidenceTrigger = deriveMisconceptionTriggerFromEvidence({
  dispute: disputeV2,
  turn: nextTurn,
  evidenceId,
})

if (mcEvidenceTrigger) {
  const mcResult = store.getState().transitionMisconception(focusDisputeId, mcEvidenceTrigger)
  if (mcResult?.to === 'M4') recordDisprovedFakeIssue(focusDisputeId)
}
`.trim()

export const interjectionIntegrationSnippet = `
if (choice === 'allow') {
  const mcTrigger = deriveMisconceptionTriggerFromInterjection({
    dispute: disputeV2,
    turn: currentTurn,
    infoLevel: opportunity.infoLevel,
    trapSignal: extractTrapSignalFromEffects(opportunity.allowEffects),
  })

  if (mcTrigger) {
    const mcResult = store.getState().transitionMisconception(opportunity.disputeId, mcTrigger)
    if (mcResult?.to === 'M4') recordDisprovedFakeIssue(opportunity.disputeId)
  }
}
`.trim()

export const beatSelectorContextSnippet = `
const selectorContext = {
  ...existingContext,
  misconceptionState: store.getState().misconceptionStateMap[focusDisputeId] ?? undefined,
  trapState: misconceptionToTrapState(
    store.getState().misconceptionStateMap[focusDisputeId] ?? 'M0'
  ),
}
`.trim()

/* -------------------------------------------------------------------------- */
/* 9. trap signal matcher                                                      */
/* -------------------------------------------------------------------------- */

/**
 * trap signal 은 완전 자연어 이해보다 "부분문자열 + dispute alias" 로 충분하다.
 * signal 그대로 저장해 중복만 막고, 정확한 parser 는 요구하지 않는다.
 */
export function matchTrapSignal(signals: string[], rawQuestion: string): string | null {
  const normalized = rawQuestion.replace(/\s+/g, '')

  for (const signal of signals) {
    const probe = signal.replace(/\s+/g, '')
    if (probe.length >= 4 && normalized.includes(probe.slice(0, 4))) {
      return signal
    }
  }

  // fallback alias
  if (/캡처|잘린문장|한줄|골목|후문|전체스캔|수첩/.test(rawQuestion)) {
    return signals[0] ?? null
  }

  return null
}

/* -------------------------------------------------------------------------- */
/* 10. pilot scenarios                                                         */
/* -------------------------------------------------------------------------- */

export const SPOUSE01_D3_MISCONCEPTION_SCENARIO = {
  disputeId: 'd-3',
  beliefModeByParty: { a: 'knows', b: 'misbelief' },
  truthExitEvidenceIds: ['e-2', 'e-4'],
  keyLinkId: 'link.d3.to.d1.retaliation',
  steps: [
    {
      from: 'M0',
      to: 'M1',
      via: 'focus_first_probe',
      concreteExample: '플레이어가 d-3에서 "최민정이 누구냐 / 왜 외도처럼 보였냐"를 처음 묻는다.',
      result: '외형상 의심이 identity 공백 서사로 이동하고, d3.red_herring_pressed 가 선다.',
    },
    {
      from: 'M1',
      to: 'M2',
      via: 'focus_repeat_probe | same_angle_loop | misbelief_interjection_allowed',
      concreteExample: '같은 dispute를 context/identity 각도로 한 번 더 누르거나, b의 misbelief interjection 을 allow 한다.',
      result: '잘린 캡처 해석이 거의 확신처럼 굳는다.',
    },
    {
      from: 'M2',
      to: 'M3',
      via: 'truth_exit_evidence_presented',
      concreteExample: 'e-2(센터 예약서) 또는 e-4(상담동 출입기록) 제시.',
      result: '최민정의 정체/장소 맥락이 붙어 외도 확신이 흔들리고 d3.crop_context_opened 가 선다.',
    },
    {
      from: 'M3',
      to: 'M4',
      via: 'core_context_confirmed OR supporting_context_link_resolved',
      concreteExample: 'e-4 제시 뒤 "외도는 아니면 왜 그렇게 보이게 숨겼나"를 묻거나, d3→d1 retaliation link 가 열려 false issue 가 책임 문제로 재맥락화된다.',
      result: '외도 오해는 해소되고, 남는 관계 상처(숨긴 방식/불안 유발)만 정리된다. phase3LogCollector.recordDisprovedFakeIssue("d-3") 호출.',
    },
  ],
} as const

export const FAMILY01_D3_MISCONCEPTION_SCENARIO = {
  disputeId: 'd-3',
  beliefModeByParty: { a: 'weaponizes', b: 'suspects' },
  truthExitEvidenceIds: ['e-5'],
  downstreamLinkId: 'link.d3.to.d5.retaliation',
  steps: [
    {
      from: 'M0',
      to: 'M1',
      via: 'focus_first_probe',
      concreteExample: '플레이어가 잘린 수첩 사진의 의미를 처음 묻는다.',
      result: '상속 예고처럼 보이는 외형상 의심이 역할/권한 해석으로 이동한다.',
    },
    {
      from: 'M1',
      to: 'M2',
      via: 'focus_repeat_probe | misbelief_interjection_allowed',
      concreteExample: '서아의 weaponizes interjection 을 allow 하거나, 같은 문장 의미를 계속 책임 각도로 누른다.',
      result: '잘린 수첩 한 줄이 권한 근거처럼 거의 굳는다.',
    },
    {
      from: 'M2',
      to: 'M3',
      via: 'truth_exit_evidence_presented',
      concreteExample: 'e-5(변호사 확인서 + 전체 스캔) 제시.',
      result: '상속 예고라는 확신이 흔들리고, 자리 상실 공포만 남기기 시작한다.',
    },
    {
      from: 'M3',
      to: 'M4',
      via: 'core_context_confirmed',
      concreteExample: 'e-5 이후 "왜 그 한 줄을 권한처럼 붙들었나"를 motive/emotion 각도로 follow-up 한다.',
      result: '상속 오해는 해소되고, relation-core 상처만 남는다. 이후 d3.red_herring_disproved 를 계기로 d3→d5 retaliation link 가 후행 해금된다.',
    },
  ],
} as const
