import type { VerdictInput, VerdictScore } from '../types'
import type { Dispute, EvidenceNode } from '../types'
import type { EvidenceRuntimeState } from './evidenceEngine'

interface VerdictContext {
  disputes: Dispute[]
  evidence: EvidenceNode[]
  evidenceStates: Record<string, EvidenceRuntimeState>
  input: VerdictInput
  turnsUsed: number
  courtControlRemaining: number
}

export function calculateVerdict(ctx: VerdictContext): VerdictScore {
  const insight = calculateInsight(ctx)
  const authority = calculateAuthority(ctx)
  const wisdom = calculateWisdom(ctx)
  const total = Math.round((insight + authority + wisdom) / 3)

  return { insight, authority, wisdom, total }
}

function calculateInsight(ctx: VerdictContext): number {
  let score = 0
  let maxScore = 0

  for (const dispute of ctx.disputes) {
    const weight = dispute.weight === 'high' ? 30 : dispute.weight === 'medium' ? 20 : 10
    maxScore += weight

    const finding = ctx.input.factFindings[dispute.id]

    if (finding === 'pending') {
      // 보류: 모호성이 높으면 페널티 없음, 낮으면 소폭 감점
      if (dispute.ambiguity === 'high') {
        score += weight * 0.7
      } else {
        score += weight * 0.3
      }
      continue
    }

    const playerSaysTrue = finding === 'true'
    if (playerSaysTrue === dispute.truth) {
      score += weight
    }

    // 책임 비율 평가
    const resp = ctx.input.responsibility[dispute.id]
    if (resp) {
      const diffA = Math.abs(resp.a - dispute.correctResponsibility.a)
      const diffB = Math.abs(resp.b - dispute.correctResponsibility.b)
      const avgDiff = (diffA + diffB) / 2
      const respScore = Math.max(0, 1 - avgDiff / 100)
      score += weight * 0.3 * respScore
      maxScore += weight * 0.3
    }
  }

  return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
}

function calculateAuthority(ctx: VerdictContext): number {
  let score = 70 // 기본 점수

  // 법정 통제력 잔여량 보너스
  score += ctx.courtControlRemaining * 5

  // 위법 증거를 판결 근거로 사용했으면 감점
  for (const evidence of ctx.evidence) {
    if (evidence.legitimacy !== 'lawful') {
      const legality = ctx.input.evidenceLegality[evidence.id]
      if (legality === true) {
        // 위법 증거 사용 허용
        score -= 15
      }
    }
  }

  // 턴 효율성 (너무 많은 턴을 쓰면 소폭 감점)
  if (ctx.turnsUsed > 20) {
    score -= Math.min(10, (ctx.turnsUsed - 20) * 2)
  }

  return Math.max(0, Math.min(100, score))
}

function calculateWisdom(ctx: VerdictContext): number {
  let score = 50 // 기본 점수

  // 해결책 선택이 있으면 보너스
  if (ctx.input.selectedSolutions.length > 0) {
    score += 20
  }

  // "다 A 잘못" 또는 "다 B 잘못"으로 밀어붙이면 감점
  const resps = Object.values(ctx.input.responsibility)
  const allA = resps.every((r) => r.a >= 90)
  const allB = resps.every((r) => r.b >= 90)
  if (allA || allB) {
    score -= 20
  }

  // 모호한 쟁점에서 적절히 보류했으면 보너스
  for (const dispute of ctx.disputes) {
    if (dispute.ambiguity === 'high' && ctx.input.factFindings[dispute.id] === 'pending') {
      score += 10
    }
  }

  return Math.max(0, Math.min(100, score))
}
