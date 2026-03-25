import { useMemo } from 'react'
import { useGameStore } from '../store/useGameStore'
import type { PartyId, QuestionType } from '../types'

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
  const caseData = useGameStore((s) => s.caseData)
  const agentA = useGameStore((s) => s.agentA)
  const agentB = useGameStore((s) => s.agentB)
  const evidenceStates = useGameStore((s) => s.evidenceStates)

  return useMemo(() => {
    if (!caseData || !target) return { questions: [], validDisputeIds: [] }

    const agent = target === 'a' ? agentA : agentB
    const disputes = caseData.disputes

    // 이 대상이 거짓말 전략을 가진 쟁점들
    const lieDisputes = new Set(Object.keys(agent.lieStateMap))

    const QUESTION_DEFS: { type: QuestionType; label: string; icon: string }[] = [
      { type: 'fact_fixing', label: '사실 고정', icon: '📌' },
      { type: 'timeline', label: '타임라인', icon: '🕐' },
      { type: 'motive', label: '동기', icon: '🎯' },
      { type: 'context_expansion', label: '맥락 확장', icon: '🔍' },
      { type: 'provenance', label: '출처', icon: '📎' },
      { type: 'empathy', label: '공감', icon: '🤝' },
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

        // 이미 완전 붕괴 → 사실 고정/타임라인/동기는 비활성 (이미 인정함)
        if (isCollapsed && ['fact_fixing', 'timeline', 'motive'].includes(qDef.type)) {
          return { id: d.id, name: d.name, enabled: false, reason: '이미 인정한 쟁점' }
        }

        // 출처 질문은 증거가 하나라도 제시된 쟁점에서만 유효
        if (qDef.type === 'provenance') {
          const hasEvidence = caseData.evidence.some(
            (e) => e.proves.includes(d.id) && evidenceStates[e.id]?.presented
          )
          if (!hasEvidence) {
            return { id: d.id, name: d.name, enabled: false, reason: '관련 증거가 아직 제시되지 않음' }
          }
        }

        // 공감 질문은 항상 가능 (신뢰 루트)
        // 맥락 확장은 S0~S1에서 주로 유효
        if (qDef.type === 'context_expansion' && lieEntry && ['S4', 'S5'].includes(lieEntry.currentState)) {
          return { id: d.id, name: d.name, enabled: false, reason: '이미 핵심이 드러난 쟁점' }
        }

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
  }, [caseData, target, agentA, agentB, evidenceStates])
}
