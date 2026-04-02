/**
 * Misconception 상태 머신 (V2 — GPT-A 4차 설계 기반)
 * ─────────────────────────────────
 * red_herring / shared_misconception 쟁점의 M0→M4 전이를 관리.
 * lieState(S0→S5)가 "숨긴 진실의 자백"이라면,
 * misconception(M0→M4)은 "잘못된 해석의 해소".
 *
 * 핵심 원칙:
 * 1) misconception은 "자백"이 아니라 "해석의 정리" → lieState와 분리
 * 2) M-state는 단조 증가 (되돌아감 없음)
 * 3) M0→M2는 오해가 굳는 구간, M2→M4는 증거/맥락으로 풀리는 구간
 * 4) M4 도달 시 red_herring이 disproved 처리 → phase3LogCollector 기록
 */

import type { PartyId, QuestionType, AttackVector } from '../types'
import type { MisconceptionState, AngleTag, TrapState } from '../types'
import type { BeliefMode } from '../types'
import type { DisputeV2, MisconceptionProfile, DisputeLinkEdge } from '../types'
import { recordDisprovedFakeIssue } from './phase3LogCollector'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface MisconceptionProgress {
  focusCount: number
  reinforcementCount: number
  trapSignalsSeen: string[]
  truthExitEvidenceSeen: string[]
  resolvedLinkIds: string[]
  coreContextConfirmCount: number
  lastAngleTag?: AngleTag
  lastAdvancedTurn?: number
  disprovedAtTurn?: number
}

export interface MisconceptionEntry {
  disputeId: string
  currentState: MisconceptionState
  beliefDriver: BeliefMode | 'knows'
  progress: MisconceptionProgress
  /** 하위 호환용 */
  questionCount: number
  truthExitEvidencePresented: Set<string>
}

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
  source: 'question' | 'evidence' | 'interjection' | 'link' | 'system'
  questionType?: QuestionType
  angleTag?: AngleTag
  evidenceId?: string
  trapSignal?: string
  linkId?: string
  byParty?: PartyId
}

export type MisconceptionTransitionEffect =
  | { type: 'set_flag'; flag: string }
  | { type: 'clear_flag'; flag: string }
  | { type: 'log_disproved_fake_issue'; disputeId: string }
  | { type: 'selector_context_hint'; misconceptionState: MisconceptionState; trapState: TrapState }

export interface MisconceptionTransitionResult {
  transitioned: boolean
  changed: boolean
  from: MisconceptionState
  to: MisconceptionState
  trigger: string
  trapState: TrapState
  entry: MisconceptionEntry
  effects: MisconceptionTransitionEffect[]
  debugNotes: string[]
}

/** 레거시 호환용 입력 */
export interface MisconceptionTransitionInput {
  disputeId: string
  questionType: QuestionType
  angleTag?: AngleTag
  evidenceId?: string
  blockedVectors: AttackVector[]
  flags: Set<string>
  turn?: number
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 설정
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * belief mode별 M1→M2 threshold.
 * - suspects: 2회 reinforcement 필요 (의심 많이 눌러야 굳음)
 * - misbelief/weaponizes: 1회만 더 눌러도 M2
 * - knows: 2회 (알면서 숨기는 쪽은 쉽게 안 굳음)
 */
const REINFORCEMENT_THRESHOLD: Record<string, number> = {
  suspects: 2,
  misbelief: 1,
  weaponizes: 1,
  knows: 2,
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 세션 상태
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const _entries: Map<string, MisconceptionEntry> = new Map()
const _profiles: Map<string, MisconceptionProfile> = new Map()

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 등록/리셋/조회
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function registerMisconceptionDispute(
  disputeId: string,
  profile: MisconceptionProfile,
): void {
  _profiles.set(disputeId, profile)
  _entries.set(disputeId, {
    disputeId,
    currentState: 'M0',
    beliefDriver: resolveDominantBeliefMode(profile),
    progress: createInitialProgress(),
    questionCount: 0,
    truthExitEvidencePresented: new Set(),
  })
}

export function resetMisconceptionState(): void {
  _entries.clear()
  _profiles.clear()
}

export function getMisconceptionState(disputeId: string): MisconceptionState | null {
  return _entries.get(disputeId)?.currentState ?? null
}

export function getMisconceptionEntry(disputeId: string): MisconceptionEntry | null {
  return _entries.get(disputeId) ?? null
}

export function isMisconceptionDispute(disputeId: string): boolean {
  return _profiles.has(disputeId)
}

export function getMisconceptionProfile(disputeId: string): MisconceptionProfile | null {
  return _profiles.get(disputeId) ?? null
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 헬퍼
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function createInitialProgress(): MisconceptionProgress {
  return {
    focusCount: 0,
    reinforcementCount: 0,
    trapSignalsSeen: [],
    truthExitEvidenceSeen: [],
    resolvedLinkIds: [],
    coreContextConfirmCount: 0,
  }
}

function resolveDominantBeliefMode(profile: MisconceptionProfile): MisconceptionEntry['beliefDriver'] {
  const modes = Object.values(profile.beliefModeByParty ?? {})
  if (modes.includes('weaponizes')) return 'weaponizes'
  if (modes.includes('misbelief')) return 'misbelief'
  if (modes.includes('suspects')) return 'suspects'
  return 'knows'
}

function pushUnique(list: string[], value?: string): string[] {
  if (!value) return list
  return list.includes(value) ? list : [...list, value]
}

function hasTruthExitEvidence(entry: MisconceptionEntry): boolean {
  return entry.progress.truthExitEvidenceSeen.length > 0
}

function canResolveAtM3(entry: MisconceptionEntry): boolean {
  return hasTruthExitEvidence(entry) && (
    entry.progress.coreContextConfirmCount >= 1 ||
    entry.progress.resolvedLinkIds.length >= 1
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 트리거 파생 — 질문/증거/끼어들기에서 호출
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function deriveTriggerFromQuestion(params: {
  disputeId: string
  turn: number
  questionType: QuestionType
  angleTag: AngleTag
  matchedTrapSignal?: string | null
}): MisconceptionTransitionTrigger | null {
  const entry = _entries.get(params.disputeId)
  const profile = _profiles.get(params.disputeId)
  if (!entry || !profile) return null

  if (params.matchedTrapSignal) {
    return {
      type: 'trap_signal_seen',
      turn: params.turn,
      source: 'question',
      questionType: params.questionType,
      angleTag: params.angleTag,
      trapSignal: params.matchedTrapSignal,
    }
  }

  if (entry.currentState === 'M0') {
    return {
      type: 'focus_first_probe',
      turn: params.turn,
      source: 'question',
      questionType: params.questionType,
      angleTag: params.angleTag,
    }
  }

  if (entry.currentState === 'M1' || entry.currentState === 'M2') {
    const sameAngle = entry.progress.lastAngleTag === params.angleTag
    return {
      type: sameAngle ? 'same_angle_loop' : 'focus_repeat_probe',
      turn: params.turn,
      source: 'question',
      questionType: params.questionType,
      angleTag: params.angleTag,
    }
  }

  if (
    entry.currentState === 'M3' &&
    ['context', 'responsibility', 'emotion', 'motive'].includes(params.angleTag)
  ) {
    return {
      type: 'core_context_confirmed',
      turn: params.turn,
      source: 'question',
      questionType: params.questionType,
      angleTag: params.angleTag,
    }
  }

  return null
}

export function deriveTriggerFromEvidence(params: {
  disputeId: string
  turn: number
  evidenceId: string
}): MisconceptionTransitionTrigger | null {
  const profile = _profiles.get(params.disputeId)
  if (!profile) return null
  const exits = profile.truthExitEvidenceIds ?? []
  if (!exits.includes(params.evidenceId)) return null

  return {
    type: 'truth_exit_evidence_presented',
    turn: params.turn,
    source: 'evidence',
    evidenceId: params.evidenceId,
  }
}

export function deriveTriggerFromInterjection(params: {
  disputeId: string
  turn: number
  infoLevel: 'emotional_only' | 'detail_rebuttal' | 'misbelief_escalation' | 'trap_signal'
  trapSignal?: string
}): MisconceptionTransitionTrigger | null {
  if (!_profiles.has(params.disputeId)) return null

  if (params.infoLevel === 'trap_signal') {
    return {
      type: 'trap_signal_seen',
      turn: params.turn,
      source: 'interjection',
      trapSignal: params.trapSignal,
    }
  }

  if (params.infoLevel === 'misbelief_escalation') {
    return {
      type: 'misbelief_interjection_allowed',
      turn: params.turn,
      source: 'interjection',
    }
  }

  return null
}

export function deriveTriggerFromLink(params: {
  disputeId: string
  turn: number
  linkId: string
}): MisconceptionTransitionTrigger | null {
  if (!_profiles.has(params.disputeId)) return null

  return {
    type: 'supporting_context_link_resolved',
    turn: params.turn,
    source: 'link',
    linkId: params.linkId,
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// trap signal 매칭
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function matchTrapSignal(disputeId: string, rawQuestion: string): string | null {
  const profile = _profiles.get(disputeId)
  if (!profile) return null
  const signals = profile.trapSignals ?? []
  const normalized = rawQuestion.replace(/\s+/g, '')

  for (const signal of signals) {
    const probe = signal.replace(/\s+/g, '')
    if (probe.length >= 4 && normalized.includes(probe.slice(0, 4))) {
      return signal
    }
  }

  if (/캡처|잘린문장|한줄|골목|후문|전체스캔|수첩/.test(rawQuestion)) {
    return signals[0] ?? null
  }

  return null
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 전이 리듀서 (trigger 기반)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function applyMisconceptionTrigger(
  disputeId: string,
  trigger: MisconceptionTransitionTrigger,
): MisconceptionTransitionResult | null {
  const entry = _entries.get(disputeId)
  if (!entry) return null

  const from = entry.currentState
  if (from === 'M4') {
    return {
      transitioned: false, changed: false, from: 'M4', to: 'M4',
      trigger: 'already_clarified',
      trapState: 'clarified', entry, effects: [], debugNotes: [],
    }
  }

  const debugNotes: string[] = []
  const effects: MisconceptionTransitionEffect[] = []
  const threshold = REINFORCEMENT_THRESHOLD[entry.beliefDriver] ?? 2

  switch (trigger.type) {
    case 'focus_first_probe': {
      entry.progress.focusCount += 1
      entry.progress.lastAngleTag = trigger.angleTag
      if (entry.currentState === 'M0') {
        entry.currentState = 'M1'
        effects.push({ type: 'set_flag', flag: `${disputeId}.red_herring_pressed` })
        debugNotes.push('first probe: M0 → M1')
      }
      break
    }

    case 'focus_repeat_probe':
    case 'same_angle_loop':
    case 'misbelief_interjection_allowed': {
      entry.progress.focusCount += 1
      entry.progress.reinforcementCount += 1
      entry.progress.lastAngleTag = trigger.angleTag ?? entry.progress.lastAngleTag

      if (entry.currentState === 'M0') {
        entry.currentState = 'M1'
        effects.push({ type: 'set_flag', flag: `${disputeId}.red_herring_pressed` })
        debugNotes.push('repeat on fresh issue still opens M1 first')
      }

      if (entry.currentState === 'M1' && entry.progress.reinforcementCount >= threshold) {
        entry.currentState = 'M2'
        effects.push({ type: 'set_flag', flag: `${disputeId}.trap_active` })
        debugNotes.push(`reinforcement reached threshold ${threshold}: M1 → M2`)
      }
      break
    }

    case 'trap_signal_seen': {
      entry.progress.trapSignalsSeen = pushUnique(entry.progress.trapSignalsSeen, trigger.trapSignal)
      entry.progress.lastAngleTag = trigger.angleTag ?? entry.progress.lastAngleTag

      if (entry.currentState === 'M0') {
        entry.currentState = 'M1'
        effects.push({ type: 'set_flag', flag: `${disputeId}.red_herring_pressed` })
        debugNotes.push('trap signal on unopened issue: M0 → M1')
      } else if (entry.currentState === 'M1') {
        entry.progress.reinforcementCount = Math.max(entry.progress.reinforcementCount, threshold)
        entry.currentState = 'M2'
        effects.push({ type: 'set_flag', flag: `${disputeId}.trap_active` })
        debugNotes.push('trap signal makes the false reading cohere: M1 → M2')
      } else if (entry.currentState === 'M2' && entry.progress.trapSignalsSeen.length >= 2) {
        entry.currentState = 'M3'
        effects.push({ type: 'set_flag', flag: `${disputeId}.crop_context_opened` })
        debugNotes.push('enough trap signals accumulated: M2 → M3')
      }
      break
    }

    case 'truth_exit_evidence_presented': {
      entry.progress.truthExitEvidenceSeen = pushUnique(entry.progress.truthExitEvidenceSeen, trigger.evidenceId)
      entry.truthExitEvidencePresented.add(trigger.evidenceId ?? '')

      if (entry.currentState === 'M0') {
        entry.currentState = 'M1'
        effects.push({ type: 'set_flag', flag: `${disputeId}.red_herring_pressed` })
        debugNotes.push('exit evidence on unopened issue: still opens M1 first')
      }

      if (entry.currentState === 'M1' || entry.currentState === 'M2') {
        entry.currentState = 'M3'
        effects.push({ type: 'set_flag', flag: `${disputeId}.crop_context_opened` })
        debugNotes.push('truth exit evidence shakes certainty: M1/M2 → M3')
      } else if (entry.currentState === 'M3' && canResolveAtM3(entry)) {
        entry.currentState = 'M4'
        debugNotes.push('truth exit evidence + prior resolution anchor: M3 → M4')
      }
      break
    }

    case 'supporting_context_link_resolved': {
      entry.progress.resolvedLinkIds = pushUnique(entry.progress.resolvedLinkIds, trigger.linkId)
      if (entry.currentState === 'M3' && canResolveAtM3(entry)) {
        entry.currentState = 'M4'
        debugNotes.push('supporting link resolves after evidence: M3 → M4')
      }
      break
    }

    case 'core_context_confirmed':
    case 'manual_clarify': {
      entry.progress.coreContextConfirmCount += 1
      entry.progress.lastAngleTag = trigger.angleTag ?? entry.progress.lastAngleTag
      if (entry.currentState === 'M3' && canResolveAtM3(entry)) {
        entry.currentState = 'M4'
        debugNotes.push('core follow-up confirms what remains after the false issue collapses: M3 → M4')
      }
      break
    }
  }

  // 전이가 실제로 발생했으면 턴 기록
  const changed = from !== entry.currentState
  if (changed) {
    entry.progress.lastAdvancedTurn = trigger.turn
  }

  // M4 도달 시 effect 추가
  if (entry.currentState === 'M4') {
    entry.progress.disprovedAtTurn = trigger.turn
    effects.push({ type: 'set_flag', flag: `${disputeId}.red_herring_disproved` })
    effects.push({ type: 'clear_flag', flag: `${disputeId}.trap_active` })
    effects.push({ type: 'log_disproved_fake_issue', disputeId })
    recordDisprovedFakeIssue(disputeId)
  }

  const trapState = misconceptionToTrapState(entry.currentState)
  effects.push({ type: 'selector_context_hint', misconceptionState: entry.currentState, trapState })

  // 하위 호환 필드 동기화
  entry.questionCount = entry.progress.focusCount

  return {
    transitioned: changed,
    changed,
    from,
    to: entry.currentState,
    trigger: trigger.type,
    trapState,
    entry,
    effects,
    debugNotes,
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 레거시 API — 기존 호출부 호환
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * 매 질문/증거 후 호출하여 misconception 전이를 시도.
 * 기존 호출부(useActionDispatch 등)에서 사용.
 */
export function attemptMisconceptionTransition(
  input: MisconceptionTransitionInput,
): MisconceptionTransitionResult {
  const entry = _entries.get(input.disputeId)
  const profile = _profiles.get(input.disputeId)
  if (!entry || !profile) {
    return {
      transitioned: false, changed: false, from: 'M0', to: 'M0',
      trigger: 'not_misconception',
      trapState: 'suspected', entry: entry!, effects: [], debugNotes: [],
    }
  }

  const turn = input.turn ?? 0
  const angleTag: AngleTag = input.angleTag ?? 'context'

  // 증거 기반 트리거 우선
  if (input.evidenceId) {
    const evTrigger = deriveTriggerFromEvidence({ disputeId: input.disputeId, turn, evidenceId: input.evidenceId })
    if (evTrigger) {
      const result = applyMisconceptionTrigger(input.disputeId, evTrigger)
      if (result) return result
    }
  }

  // 질문 기반 트리거
  const matchedTrap = matchTrapSignal(input.disputeId, '')
  const qTrigger = deriveTriggerFromQuestion({
    disputeId: input.disputeId,
    turn,
    questionType: input.questionType,
    angleTag,
    matchedTrapSignal: null,
  })

  if (qTrigger) {
    const result = applyMisconceptionTrigger(input.disputeId, qTrigger)
    if (result) return result
  }

  return {
    transitioned: false, changed: false,
    from: entry.currentState, to: entry.currentState,
    trigger: 'no_condition_met',
    trapState: misconceptionToTrapState(entry.currentState),
    entry, effects: [], debugNotes: [],
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// linkEdge 통합 판정
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function shouldFeedLinkIntoMisconception(
  disputeId: string,
  link: DisputeLinkEdge,
): boolean {
  if (!_profiles.has(disputeId)) return false
  if (link.fromDisputeId !== disputeId) return false
  return link.type === 'retaliation' || link.type === 'unlocks_layer'
}
