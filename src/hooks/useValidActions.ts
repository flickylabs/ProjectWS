import { useMemo } from 'react'
import { useGameStore } from '../store/useGameStore'
import type { PartyId, QuestionType, Dispute, CaseData, AgentState } from '../types'
import type { EvidenceRuntimeState } from '../engine/evidenceEngine'
import type { DiscoveryState } from '../types/discovery'

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

/**
 * 현재 게임 상태에서 선택한 대상에 대해 유효한 질문/쟁점 조합을 계산한다.
 * 무의미한 조합은 disabled + 이유 표시.
 */
export function useValidActions(target: PartyId | null) {
  const caseData = useGameStore((s: { caseData: CaseData | null }) => s.caseData)
  const agentA = useGameStore((s: { agentA: AgentState }) => s.agentA)
  const agentB = useGameStore((s: { agentB: AgentState }) => s.agentB)
  const evidenceStates = useGameStore((s: { evidenceStates: Record<string, EvidenceRuntimeState> }) => s.evidenceStates)
  const discovery = useGameStore((s: { discovery: DiscoveryState }) => s.discovery)

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
      const validDisputes: ValidDispute[] = disputes.map((d) => {
        const hasLie = lieDisputes.has(d.id)
        const lieEntry = agent.lieStateMap[d.id]
        const isCollapsed = lieEntry?.currentState === 'S5'

        // 이 대상이 이 쟁점에 거짓말 전략이 없으면 → 비활성
        if (!hasLie) {
          return { id: d.id, name: d.name, enabled: false, reason: '이 대상과 무관한 쟁점' }
        }

        // 이미 완전 붕괴 → 사실 추궁/동기 탐색은 비활성 (이미 인정함)
        if (isCollapsed && ['fact_pursuit', 'motive_search'].includes(qDef.type)) {
          return { id: d.id, name: d.name, enabled: false, reason: '이미 인정한 쟁점' }
        }

        // 해금 조건 체크
        const unlock = (d as Dispute).unlockCondition
        if (unlock) {
          if (unlock.requireDispute) {
            const reqEntry = agent.lieStateMap[unlock.requireDispute.id]
            if (!reqEntry || reqEntry.currentState < unlock.requireDispute.minState) {
              const reqDispute = disputes.find((x: Dispute) => x.id === unlock.requireDispute!.id)
              return { id: d.id, name: d.name, enabled: false, reason: `선행: "${reqDispute?.name ?? '?'}" 추궁 필요` }
            }
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
