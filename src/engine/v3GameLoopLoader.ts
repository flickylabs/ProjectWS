/**
 * V3 Game Loop 데이터 로더 + DossierCard 엔진
 * ─────────────────────────────────
 * GPT V3 데이터(DossierCard, StateUnlockAtom, EventText, TransitionBeat)를
 * 런타임에 등록하고 조회하는 통합 모듈.
 */

import type {
  V3GameLoopData,
  DossierCard,
  DossierChallengeQuestion,
  StateUnlockAtom,
  StateUnlockAtomMap,
  GameEventTexts,
  ContradictionEvent,
  InterjectionEvent,
  EmotionalOutburstEvent,
  TransitionBeat,
  AttackVector,
  PartyId,
} from '../types'
import type { LieState } from '../types'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 저장소
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** caseId → V3GameLoopData */
const v3Registry: Map<string, V3GameLoopData> = new Map()

/** caseId → 사용된 dossier question ID Set */
const usedDossierQuestions: Map<string, Set<string>> = new Map()

/** caseId → 이미 삽입된 transitionBeat ID Set */
const usedTransitionBeats: Map<string, Set<string>> = new Map()

/** caseId → 이미 해금된 unlock atom ID Set */
const unlockedAtomIds: Map<string, Set<string>> = new Map()

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 등록/초기화
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function registerV3GameLoopData(data: V3GameLoopData): void {
  v3Registry.set(data.caseId, data)
  usedDossierQuestions.set(data.caseId, new Set())
  usedTransitionBeats.set(data.caseId, new Set())
  unlockedAtomIds.set(data.caseId, new Set())
}

export function resetV3State(caseId: string): void {
  usedDossierQuestions.get(caseId)?.clear()
  usedTransitionBeats.get(caseId)?.clear()
  unlockedAtomIds.get(caseId)?.clear()
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DossierCard API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** 모든 DossierCard 조회 */
export function getDossierCards(caseId: string): DossierCard[] {
  return v3Registry.get(caseId)?.dossierCards ?? []
}

/** 특정 카드 조회 */
export function getDossierCard(caseId: string, dossierId: string): DossierCard | null {
  return getDossierCards(caseId).find(d => d.id === dossierId) ?? null
}

// ── lieState 순위 맵 (게이팅용) ──
const LIE_STATE_RANK: Record<string, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }

/**
 * 특정 파티에 대한 미사용 질문 목록 조회 (lieState 게이팅 포함)
 * @param lieStates - 대상 파티의 dispute별 현재 lieState 맵 (예: { 'd-1': 'S2', 'd-2': 'S1' })
 *   전달하지 않으면 기존 동작(게이팅 없음)과 동일
 */
export function getAvailableDossierQuestions(
  caseId: string,
  dossierId: string,
  targetParty: PartyId,
  lieStates?: Record<string, LieState>,
): DossierChallengeQuestion[] {
  const card = getDossierCard(caseId, dossierId)
  if (!card) return []

  const used = usedDossierQuestions.get(caseId) ?? new Set()
  const challenge = card.challenges.find(c => c.targetParty === targetParty)
  if (!challenge) return []

  return challenge.questions.filter(q => {
    if (used.has(q.id)) return false
    // requiredLieState 게이팅: 관련 dispute 중 하나라도 필요 상태 이상이면 공개
    if (q.requiredLieState && lieStates && card.relatedDisputes.length > 0) {
      const reqRank = LIE_STATE_RANK[q.requiredLieState] ?? 0
      const maxDisputeRank = Math.max(
        ...card.relatedDisputes.map(dId => LIE_STATE_RANK[lieStates[dId] ?? 'S0'] ?? 0)
      )
      if (maxDisputeRank < reqRank) return false
    }
    return true
  })
}

/**
 * 잠긴 질문 목록 조회 (UI에서 "🔒" 표시용)
 * getAvailableDossierQuestions와 반대: requiredLieState 미충족인 질문만 반환
 */
export function getLockedDossierQuestions(
  caseId: string,
  dossierId: string,
  targetParty: PartyId,
  lieStates: Record<string, LieState>,
): DossierChallengeQuestion[] {
  const card = getDossierCard(caseId, dossierId)
  if (!card) return []

  const used = usedDossierQuestions.get(caseId) ?? new Set()
  const challenge = card.challenges.find(c => c.targetParty === targetParty)
  if (!challenge) return []

  return challenge.questions.filter(q => {
    if (used.has(q.id)) return false
    if (!q.requiredLieState) return false // 게이팅 없는 질문은 잠기지 않음
    const reqRank = LIE_STATE_RANK[q.requiredLieState] ?? 0
    const maxDisputeRank = Math.max(
      ...card.relatedDisputes.map(dId => LIE_STATE_RANK[lieStates[dId] ?? 'S0'] ?? 0)
    )
    return maxDisputeRank < reqRank
  })
}

export interface DossierQuestionResult {
  /** 봉쇄된 벡터 */
  blockedVector: AttackVector
  /** 해금된 atom ID (있으면) */
  revealedAtomId: string | null
  /** lieState 진행 여부 */
  lieAdvance: boolean
  /** 해금된 atom 데이터 (있으면) */
  revealedAtom: StateUnlockAtom | null
}

/**
 * DossierCard 질문 성공 시 효과 적용.
 * 1) blockVector 적용 (evidenceChallengeEngine에서 별도 처리)
 * 2) revealAtom이 있으면 해당 StateUnlockAtom 해금
 * 3) lieAdvance이면 반환하여 호출측에서 전이 처리
 */
export function resolveDossierQuestion(
  caseId: string,
  questionId: string,
): DossierQuestionResult | null {
  const data = v3Registry.get(caseId)
  if (!data) return null

  // 질문 찾기
  let question: DossierChallengeQuestion | null = null
  for (const card of data.dossierCards) {
    for (const challenge of card.challenges) {
      const found = challenge.questions.find(q => q.id === questionId)
      if (found) { question = found; break }
    }
    if (question) break
  }
  if (!question) return null

  // 사용 기록
  const used = usedDossierQuestions.get(caseId)!
  used.add(questionId)

  // revealAtom 해금
  let revealedAtom: StateUnlockAtom | null = null
  const revealAtomId = question.onSuccess.revealAtom ?? null

  if (revealAtomId) {
    revealedAtom = findUnlockAtom(data.stateUnlockAtoms, revealAtomId)
    if (revealedAtom) {
      unlockedAtomIds.get(caseId)!.add(revealAtomId)
    }
  }

  return {
    blockedVector: question.onSuccess.blockVector,
    revealedAtomId: revealAtomId,
    lieAdvance: question.onSuccess.lieAdvance ?? false,
    revealedAtom,
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// StateUnlockAtom API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * 특정 state에서 해금된(또는 해금 가능한) atom 목록 조회.
 * 해당 state 이하의 모든 unlock atom 중 아직 미사용인 것을 반환.
 */
export function getUnlockedAtoms(
  caseId: string,
  party: PartyId,
  disputeId: string,
  currentState: LieState,
): StateUnlockAtom[] {
  const data = v3Registry.get(caseId)
  if (!data) return []

  const partyMap = data.stateUnlockAtoms[party]
  if (!partyMap) return []

  const disputeMap = partyMap[disputeId]
  if (!disputeMap) return []

  const stateOrder: LieState[] = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
  const currentIdx = stateOrder.indexOf(currentState)

  const result: StateUnlockAtom[] = []
  for (let i = 0; i <= currentIdx; i++) {
    const atoms = disputeMap[stateOrder[i]]
    if (atoms) result.push(...atoms)
  }

  return result
}

/**
 * dossier question의 revealAtom으로 조기 해금된 atom 목록.
 */
export function getEarlyRevealedAtoms(caseId: string): Set<string> {
  return unlockedAtomIds.get(caseId) ?? new Set()
}

/** stateUnlockAtoms 전체에서 특정 ID의 atom을 찾는다 */
function findUnlockAtom(atomMap: StateUnlockAtomMap, atomId: string): StateUnlockAtom | null {
  for (const party of ['a', 'b'] as const) {
    const partyMap = atomMap[party]
    for (const disputeId of Object.keys(partyMap)) {
      const stateMap = partyMap[disputeId]
      for (const state of Object.keys(stateMap) as LieState[]) {
        const atoms = stateMap[state]
        if (atoms) {
          const found = atoms.find(a => a.id === atomId)
          if (found) return found
        }
      }
    }
  }
  return null
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EventText API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function getEventTexts(caseId: string): GameEventTexts | null {
  return v3Registry.get(caseId)?.events ?? null
}

export function getContradictionEvent(caseId: string, eventId: string): ContradictionEvent | null {
  const events = getEventTexts(caseId)
  return events?.contradictions.find(e => e.id === eventId) ?? null
}

export function getInterjectionEvent(caseId: string, eventId: string): InterjectionEvent | null {
  const events = getEventTexts(caseId)
  return events?.interjections.find(e => e.id === eventId) ?? null
}

export function getOutburstEvent(caseId: string, eventId: string): EmotionalOutburstEvent | null {
  const events = getEventTexts(caseId)
  return events?.emotionalOutbursts.find(e => e.id === eventId) ?? null
}

/** 파티에 해당하는 끼어들기 이벤트 중 미사용 목록 */
export function getAvailableInterjections(caseId: string, interruptor: PartyId): InterjectionEvent[] {
  const events = getEventTexts(caseId)
  if (!events) return []
  return events.interjections.filter(e => e.interruptor === interruptor)
}

/** 파티에 해당하는 감정 폭발 이벤트 목록 */
export function getAvailableOutbursts(caseId: string, party: PartyId): EmotionalOutburstEvent[] {
  const events = getEventTexts(caseId)
  if (!events) return []
  return events.emotionalOutbursts.filter(e => e.party === party)
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TransitionBeat API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * lieState 전이 시 강제 삽입할 beat를 조회.
 * 1회만 사용. null이면 해당 전이에 beat 없음.
 */
export function getTransitionBeat(
  caseId: string,
  party: PartyId,
  disputeId: string,
  fromState: LieState,
  toState: LieState,
): TransitionBeat | null {
  const data = v3Registry.get(caseId)
  if (!data) return null

  const used = usedTransitionBeats.get(caseId) ?? new Set()

  const beat = data.transitionBeats.find(b =>
    b.party === party &&
    b.disputeId === disputeId &&
    b.fromState === fromState &&
    b.toState === toState &&
    !used.has(b.id),
  )

  if (beat) {
    used.add(beat.id)
  }

  return beat ?? null
}

/** 모든 전이 beat 목록 (디버그/UI용) */
export function getAllTransitionBeats(caseId: string): TransitionBeat[] {
  return v3Registry.get(caseId)?.transitionBeats ?? []
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BeatScript Fallback API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface BeatScriptEntry {
  caseId: string
  party: PartyId
  disputeId: string
  beatType: string
  line: string
  behaviorHint: string
  applicableStates: string[]
  afterEvidence?: string
}

/** caseId → BeatScript[] */
const beatScriptRegistry: Map<string, BeatScriptEntry[]> = new Map()

export function registerBeatScripts(caseId: string, beats: BeatScriptEntry[]): void {
  beatScriptRegistry.set(caseId, beats)
}

/**
 * LLM 실패 시 fallback beat 조회.
 * stance → beatType 매핑으로 현재 state에 맞는 사전 작성 대사를 반환.
 */
export function getFallbackBeat(
  caseId: string,
  party: PartyId,
  disputeId: string,
  lieState: string,
  stance: string,
  evidenceId?: string,
): BeatScriptEntry | null {
  const beats = beatScriptRegistry.get(caseId)
  if (!beats) return null

  // stance → beatType 매핑
  const beatTypeMap: Record<string, string> = {
    deny: 'deny', hedge: 'hedge', partial: 'partial',
    blame: 'blame', emotional: 'emotional', confess: 'confession',
  }
  const targetBeatType = beatTypeMap[stance] ?? 'deny'

  // 증거 특화 beat 우선
  if (evidenceId) {
    const evBeat = beats.find(b =>
      b.party === party && b.disputeId === disputeId &&
      b.beatType === 'evidence_hit' && b.afterEvidence === evidenceId &&
      b.applicableStates.includes(lieState),
    )
    if (evBeat) return evBeat
  }

  // stance 매칭 beat
  const match = beats.find(b =>
    b.party === party && b.disputeId === disputeId &&
    b.beatType === targetBeatType &&
    b.applicableStates.includes(lieState),
  )
  if (match) return match

  // 같은 쟁점/파티의 아무 beat
  return beats.find(b =>
    b.party === party && b.disputeId === disputeId &&
    b.applicableStates.includes(lieState),
  ) ?? null
}
