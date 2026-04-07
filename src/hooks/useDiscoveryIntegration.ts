/**
 * Discovery 메커닉 통합 Hook
 * 기존 액션 흐름(질문/증거/증인) 후에 호출되어
 * 진실공방/증거감별/숨겨진쟁점/감정전략을 처리한다.
 */
import { useGameStore, useStore } from '../store/useGameStore'
import {
  checkTruthConfrontation,
  checkEmergence,
  checkEmotionalSlip,
  checkJudgmentConflict,
  computeCascadeTargets,
  canInterrogate,
  getEmotionTier,
} from '../engine/discoveryEngine'
import type { PartyId } from '../types'
import type { DisputeVisibilityEntry, EmotionalSlipEvent } from '../types/discovery'

/**
 * 질문/증거/증인 액션 후 discovery 체크를 실행.
 * useActionDispatch의 각 핸들러 끝에서 호출한다.
 */
export function runDiscoveryChecks(party: PartyId, disputeId?: string) {
  const state = useGameStore.getState()
  const { caseData, discovery, claimGraph, agentA, agentB, calledWitnesses, turnCount } = state

  if (!caseData) return

  const agent = party === 'a' ? agentA : agentB

  // ── 1. 감정 셧다운 체크 ──
  if (!canInterrogate(agent.emotionalState.internalValue)) {
    state.addDialogue({
      speaker: 'system',
      text: `🔒 ${party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name}이(가) 감정 과부하로 응답을 거부합니다. (2턴간 질문 불가)`,
      relatedDisputes: disputeId ? [disputeId] : [],
      turn: turnCount,
    })
  }

  // ── 2. 감정 실수 자백 체크 (격앙 상태일 때) ──
  if (disputeId) {
    const slip = checkEmotionalSlip(
      party,
      agent.emotionalState.internalValue,
      disputeId,
      agent.lieStateMap,
      caseData,
    )
    if (slip) {
      state.setPendingSlip({ ...slip, turn: turnCount })
    }
  }

  // ── 3. 진실 공방 트리거 체크 ──
  const visibleDisputeIds = (Object.values(discovery.disputeVisibility) as DisputeVisibilityEntry[])
    .filter((v) => v.visibility !== 'hidden')
    .map((v) => v.disputeId)

  const confrontation = checkTruthConfrontation(claimGraph, discovery.judgments, visibleDisputeIds, caseData.disputes)
  if (confrontation) {
    // 관련 증거 정보 추가
    confrontation.relevantEvidence = caseData.evidence
      .filter((e) => e.proves.includes(confrontation.disputeId))
      .map((e) => e.id)
    state.setPendingConfrontation(confrontation)
  }

  // ── 4. 숨겨진 쟁점 발현 체크 ──
  const presentedEvidenceIds = Object.entries(state.evidenceStates)
    .filter(([_, s]: [string, { presented: boolean }]) => s.presented)
    .map(([id]: [string, unknown]) => id)

  const judgedDisputeIds = Object.keys(discovery.judgments)

  const collapsedDisputes: Record<string, PartyId> = {}
  for (const [dId, entry] of Object.entries(agentA.lieStateMap) as [string, { currentState: string }][]) {
    if (entry.currentState === 'S5') collapsedDisputes[dId] = 'a'
  }
  for (const [dId, entry] of Object.entries(agentB.lieStateMap) as [string, { currentState: string }][]) {
    if (entry.currentState === 'S5') collapsedDisputes[dId] = 'b'
  }

  const emotionalSlipDisputes = (discovery.emotionalSlips as EmotionalSlipEvent[]).map((s) => s.sourceDisputeId)

  for (const entry of Object.values(discovery.disputeVisibility) as DisputeVisibilityEntry[]) {
    if (entry.visibility !== 'hidden') continue

    const via = checkEmergence(entry, {
      presentedEvidenceIds,
      judgedDisputeIds,
      calledWitnessIds: calledWitnesses,
      collapsedDisputes,
      emotionalSlipDisputes,
    })

    if (via) {
      const dispute = caseData.disputes.find((d: import('../types').Dispute) => d.id === entry.disputeId)
      const description = dispute?.truthDescription ?? dispute?.name ?? entry.disputeId
      state.emergeDispute(entry.disputeId, via, turnCount, description)
      break  // 한 턴에 하나만 발현
    }
  }

  // ── 5. 기존 판단과의 충돌 체크 ──
  if (disputeId) {
    const agentState = party === 'a' ? agentA : agentB
    const lieEntry = agentState.lieStateMap[disputeId]
    if (lieEntry && lieEntry.currentState === 'S5') {
      const dispute = caseData.disputes.find((d) => d.id === disputeId)
      if (dispute) {
        const conflict = checkJudgmentConflict(
          disputeId,
          discovery.judgments,
          `${party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name}이(가) 자백했습니다: ${dispute.truthDescription}`,
          'lie_collapse',
        )
        if (conflict) {
          state.setPendingConflict(conflict)
        }
      }
    }
  }
}

/**
 * 판단 제출 후 연쇄 추론 대상을 채움.
 */
export function updateCascadeTargets(disputeId: string) {
  const state = useGameStore.getState()
  if (!state.caseData) return

  const targets = computeCascadeTargets(disputeId, state.caseData.evidence, state.caseData.disputes)
  if (targets.length === 0) return

  const d = { ...state.discovery }
  const judgments = { ...d.judgments }
  const entry = judgments[disputeId]
  if (entry) {
    judgments[disputeId] = { ...entry, cascadeTargets: targets }
    useGameStore.setState({ discovery: { ...d, judgments } })
  }
}

/**
 * 감정 티어에 따른 거짓말 전이 보정을 적용할지 판정.
 * lieStateMachine의 attemptLieTransition 전에 호출.
 */
export function shouldBlockLieTransition(party: PartyId): boolean {
  const state = useGameStore.getState()
  const agent = party === 'a' ? state.agentA : state.agentB
  const tier = getEmotionTier(agent.emotionalState.internalValue)

  // 셧다운이면 전이 차단
  if (tier.tier === 'shutdown') return true

  // 침착 상태에서는 50% 확률로 전이 차단 (multiplier 0.5)
  if (tier.tier === 'calm' && Math.random() > tier.lieTransitionMultiplier) return true

  return false
}
