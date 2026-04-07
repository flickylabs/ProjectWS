import { useMemo } from 'react'
import { useStore } from '../store/useGameStore'
import type { PartyId, QuestionType, Dispute } from '../types'

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
