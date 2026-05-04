/**
 * Discovery 메커닉 통합 Hook
 * 기존 액션 흐름(질문/증거/증인) 후에 호출되어
 * 진실공방/증거감별/숨겨진쟁점/감정전략을 처리한다.
 */
import { useGameStore, useStore } from '../store/useGameStore'
import { pp이가 } from '../engine/koreanPostposition'
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
import { v4Effects } from '../engine/presentationEngine'

function hasEvidenceStage(state: any, evidenceId: string): boolean {
  const evidenceState = state.evidenceStates?.[evidenceId]
  return Boolean(
    evidenceState?.presented ||
    evidenceState?.deepInvestigated ||
    (evidenceState?.investigatedActions?.length ?? 0) > 0,
  )
}

function isVisibleOrEmerged(state: any, disputeId: string): boolean {
  const visibility = state.discovery?.disputeVisibility?.[disputeId]?.visibility
  return visibility === 'visible' || visibility === 'emerged'
}

function getMaxLieRank(state: any, disputeId: string): number {
  const rank: Record<string, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }
  const aState = state.agentA?.lieStateMap?.[disputeId]?.currentState ?? 'S0'
  const bState = state.agentB?.lieStateMap?.[disputeId]?.currentState ?? 'S0'
  return Math.max(rank[aState] ?? 0, rank[bState] ?? 0)
}

function passesSpouse01EmergenceGate(state: any, disputeId: string): boolean {
  const caseId = String(state.caseData?.caseId ?? '').replace(/^case-/, '')
  if (caseId !== 'spouse-01') return true

  if (disputeId === 'd-2') {
    return getMaxLieRank(state, 'd-1') >= 3 ||
      hasEvidenceStage(state, 'e-4') ||
      hasEvidenceStage(state, 'e-5')
  }
  if (disputeId === 'h-d3') {
    return isVisibleOrEmerged(state, 'd-2') && hasEvidenceStage(state, 'e-5')
  }
  if (disputeId === 'h-d4') {
    return isVisibleOrEmerged(state, 'd-2') &&
      isVisibleOrEmerged(state, 'h-d3') &&
      hasEvidenceStage(state, 'e-6') &&
      hasEvidenceStage(state, 'e-7')
  }
  return true
}

const SAFE_EMERGENCE_DESCRIPTIONS: Record<string, Record<string, string>> = {
  'family-01': {
    'd-1': '어머니의 판단 능력과 유서 작성 과정이 별도로 확인할 쟁점으로 떠올랐습니다.',
    'd-2': '공증된 유서가 완성된 시점과 당시 어머니 상태 사이에 확인할 대목이 생겼습니다.',
    'd-3': '어머니 통장을 거친 오래된 자금 흐름에서 출처와 전달 순서를 확인해야 합니다.',
    'd-4': '가족 기록 속 민감한 사정이 형제의 침묵과 선택에 영향을 줬을 가능성이 보입니다.',
    'd-5': '두 형제가 어머니 뜻을 서로 다르게 해석한 대목을 함께 정리해야 합니다.',
  },
  'spouse-01': {
    'd-2': '남편 명의의 비밀 계좌가 존재했고, 목돈이 빠져나간 것으로 보입니다.',
    'h-d3': '오피스텔 방문 이후의 연락과 사람 관계를 별도로 확인해야 합니다.',
    'h-d4': '돈의 이동과 오피스텔 방문 사이에 함께 검토할 정황이 생겼습니다.',
  },
}

function normalizeCaseId(caseId?: string): string {
  return String(caseId ?? '').replace(/^case-/, '')
}

function getSafeEmergenceDescription(caseId: string | undefined, disputeId: string, fallback: string): string {
  return SAFE_EMERGENCE_DESCRIPTIONS[normalizeCaseId(caseId)]?.[disputeId] ?? fallback
}

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
  // [Phase C-2 새 기획] 셧다운 진입을 'emotion ≥ 85 자동' 트리거에서 '모순 추궁 직후 + emotion ≥ 75' 트리거로 이동
  // (DiscoveryFeedbackWatcher contradiction handlePointOut). 여기서는 셧다운 진입 처리 X.
  // emotion ≥ 85 = 체념(자백 모드) — 응답 가능. 자백 모달 트리거는 별도 로직(Phase C-3).
  void canInterrogate
  void agent

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

    // lieStates 맵 구축 (lie_state_threshold 체크용)
    const lieStatesMap = {
      a: Object.fromEntries(
        Object.entries(agentA.lieStateMap).map(([dId, e]) => [dId, (e as any).currentState ?? 'S0']),
      ),
      b: Object.fromEntries(
        Object.entries(agentB.lieStateMap).map(([dId, e]) => [dId, (e as any).currentState ?? 'S0']),
      ),
    }

    const via = checkEmergence(entry, {
      presentedEvidenceIds,
      judgedDisputeIds,
      calledWitnessIds: calledWitnesses,
      collapsedDisputes,
      emotionalSlipDisputes,
      lieStates: lieStatesMap,
    })

    if (via) {
      if (!passesSpouse01EmergenceGate(state, entry.disputeId)) continue
      const dispute = caseData.disputes.find((d: import('../types').Dispute) => d.id === entry.disputeId)
      const rawDescription = dispute?.truthDescription ?? dispute?.name ?? entry.disputeId
      const description = getSafeEmergenceDescription(caseData.caseId, entry.disputeId, rawDescription)
      const title = dispute?.name ?? entry.disputeId
      state.emergeDispute(entry.disputeId, via, turnCount, description)
      v4Effects.disputeDiscovered(entry.disputeId, title, description, {
        turn: state.turnCount,
        caseId: caseData.caseId,
        phase: state.currentPhase,
      })
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
        // 자백의 주체는 '진실을 가진 당사자' (quadrant 기준)
        // quadrant: 'a_only' → A가 자백 / 'b_only' → B가 자백 / 그 외 → 실제 S5 당사자
        const truthOwner: 'a' | 'b' =
          dispute.quadrant === 'a_only' ? 'a'
          : dispute.quadrant === 'b_only' ? 'b'
          : party
        const ownerName = truthOwner === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name
        const conflict = checkJudgmentConflict(
          disputeId,
          discovery.judgments,
          `${ownerName}${pp이가(ownerName)} 자백했습니다: ${dispute.truthDescription}`,
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
