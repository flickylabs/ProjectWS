import { useMemo } from 'react'
import { useStore } from '../store/useGameStore'
import type { AgentState, PartyId, QuestionType, Dispute } from '../types'

interface ValidDispute {
  id: string
  name: string
  enabled: boolean
  reason?: string
}

interface ValidQuestion {
  type: QuestionType
  label: string
  icon: string
  disputes: ValidDispute[]
  anyEnabled: boolean
}

type DisputeRequirement = { id: string; minState?: string; party?: PartyId }

const LIE_STATE_RANK: Record<string, number> = {
  S0: 0,
  S1: 1,
  S2: 2,
  S3: 3,
  S4: 4,
  S5: 5,
}

function rankLieState(state?: string): number {
  return LIE_STATE_RANK[state ?? 'S0'] ?? 0
}

function getAgentLieRank(agent: AgentState, disputeId: string): number {
  return rankLieState(agent.lieStateMap[disputeId]?.currentState)
}

function normalizeRequirements(
  requireDispute: NonNullable<Dispute['unlockCondition']>['requireDispute'],
): DisputeRequirement[] {
  if (!requireDispute) return []
  return Array.isArray(requireDispute) ? requireDispute : [requireDispute]
}

function isRequirementMet(req: DisputeRequirement, agentA: AgentState, agentB: AgentState): boolean {
  const minRank = rankLieState(req.minState ?? 'S5')
  if (req.party === 'a') return getAgentLieRank(agentA, req.id) >= minRank
  if (req.party === 'b') return getAgentLieRank(agentB, req.id) >= minRank
  return Math.max(getAgentLieRank(agentA, req.id), getAgentLieRank(agentB, req.id)) >= minRank
}

/**
 * 현재 게임 상태에서 선택한 대상에 대해 유효한 질문/쟁점 조합을 계산한다.
 * 무의미한 조합은 disabled + 이유 표시.
 */
export function useValidActions(target: PartyId | null) {
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const discovery = useStore((s) => s.discovery)

  return useMemo(() => {
    if (!caseData || !target) return { questions: [], validDisputeIds: [] }

    const agent = target === 'a' ? agentA : agentB

    // Discovery 가시성 필터: hidden 제외 + 해당 캐릭터 관련 쟁점만
    const disputes = caseData.disputes.filter((d) => {
      const vis = discovery.disputeVisibility[d.id]
      if (!vis) return true  // discovery 미초기화 시 fallback
      if (vis.visibility === 'hidden') return false
      if (vis.visibility === 'inactive') return false
      return vis.relevantParties.includes(target)
    })

    // 이 대상이 거짓말 전략을 가진 쟁점들
    const lieDisputes = new Set(Object.keys(agent.lieStateMap))

    const QUESTION_DEFS: { type: QuestionType; label: string; icon: string }[] = [
      { type: 'fact_pursuit', label: '사실 추궁', icon: '📌' },
      { type: 'motive_search', label: '동기 탐색', icon: '🎯' },
      { type: 'empathy_approach', label: '공감 접근', icon: '🤝' },
    ]

    const questions: ValidQuestion[] = QUESTION_DEFS.map((qDef) => {
      // 이 대상이 거짓말 전략을 가진 쟁점만 표시 (무관한 쟁점은 숨김)
      const relevantDisputes = disputes.filter((d) => lieDisputes.has(d.id))
      const validDisputes: ValidDispute[] = relevantDisputes.map((d) => {
        const lieEntry = agent.lieStateMap[d.id]
        const isCollapsed = lieEntry?.currentState === 'S5'

        // 이미 완전 붕괴 → 사실 추궁/동기 탐색은 비활성 (이미 인정함)
        if (isCollapsed && ['fact_pursuit', 'motive_search'].includes(qDef.type)) {
          return { id: d.id, name: d.name, enabled: false, reason: '이미 인정한 쟁점' }
        }

        // 해금 조건 체크
        const unlock = (d as Dispute).unlockCondition
        if (unlock) {
          const unmetRequirement = normalizeRequirements(unlock.requireDispute)
            .find((req) => !isRequirementMet(req, agentA, agentB))
          if (unmetRequirement) {
            const reqDispute = caseData.disputes.find((x: Dispute) => x.id === unmetRequirement.id)
            return { id: d.id, name: d.name, enabled: false, reason: `선행: "${reqDispute?.name ?? '?'}" 추궁 필요` }
          }
          if (unlock.requireEvidence) {
            const evState = evidenceStates[unlock.requireEvidence]
            if (!evState?.presented) {
              return { id: d.id, name: d.name, enabled: false, reason: '선행 증거 제시 필요' }
            }
          }
        }

        // 공감 접근은 항상 가능 (신뢰 루트)

        return { id: d.id, name: d.name, enabled: true }
      })

      return {
        ...qDef,
        disputes: validDisputes,
        anyEnabled: validDisputes.some((d) => d.enabled),
      }
    })

    const validDisputeIds = [...lieDisputes]

    return { questions, validDisputeIds }
  }, [caseData, target, agentA, agentB, evidenceStates, discovery])
}
