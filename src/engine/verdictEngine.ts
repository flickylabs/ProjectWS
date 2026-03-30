/**
 * 판결 채점 엔진 v2
 * - 15턴 보너스 제거
 * - 상성(affinity) + 경로(optimalPath) + 심층(deepTruth) + 균형(balance) 중심 재가중
 * - 반복/unsupported collapse 패널티 추가
 * - 즉답요구 S5: unsupportedCollapse 패널티만 면제
 */
import type { VerdictInput, VerdictScore, ProcessMetrics } from '../types'
import type { Dispute, EvidenceNode } from '../types'
import type { EvidenceRuntimeState } from './evidenceEngine'

interface VerdictContext {
  disputes: Dispute[]
  evidence: EvidenceNode[]
  evidenceStates: Record<string, EvidenceRuntimeState>
  input: VerdictInput
  turnsUsed: number
  courtControlRemaining: number
  processMetrics: ProcessMetrics
}

export function calculateVerdict(ctx: VerdictContext): VerdictScore {
  const insight = calculateInsight(ctx)
  const authority = calculateAuthority(ctx)
  const wisdom = calculateWisdom(ctx)
  const total = Math.round((insight + authority + wisdom) / 3)

  return { insight, authority, wisdom, total }
}

/* ── 통찰 (Insight) ────────────────────────── */

function calculateInsight(ctx: VerdictContext): number {
  let score = 0
  let maxScore = 0

  for (const dispute of ctx.disputes) {
    const weight = dispute.weight === 'high' ? 30 : dispute.weight === 'medium' ? 20 : 10
    maxScore += weight

    const finding = ctx.input.factFindings[dispute.id]

    if (finding === 'pending') {
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

  const base = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0

  // ── 과정 보너스: 통찰 ──
  const pm = ctx.processMetrics
  let processBonus = 0
  processBonus += Math.min(10, pm.liesCollapsed * 3)             // 거짓말 붕괴 +3 (최대 10)
  processBonus += Math.min(6, pm.evidenceDiscovered * 3)          // 증거 발견 +3 (최대 6)
  processBonus += Math.min(6, pm.freeQuestionsRelevant * 2)       // 자유질문 적중 +2 (최대 6)
  // v2: 심층 truth 해금 보너스
  processBonus += Math.min(8, pm.deepTruthsUnlocked * 4)          // 심층 해금 +4 (최대 8)
  // v2: 상성 보너스
  processBonus += Math.min(6, pm.affinityHits * 2)                // 상성 적중 +2 (최대 6)
  // 질문 효율: 전이율이 30% 이상이면 보너스
  if (pm.questionsAsked > 0) {
    const efficiency = pm.lieTransitions / pm.questionsAsked
    if (efficiency >= 0.3) processBonus += 5
  }

  return Math.max(0, Math.min(100, base + processBonus))
}

/* ── 권위 (Authority) ──────────────────────── */

function calculateAuthority(ctx: VerdictContext): number {
  let score = 70

  score += ctx.courtControlRemaining * 5

  // 위법 증거
  for (const evidence of ctx.evidence) {
    if (evidence.legitimacy !== 'lawful') {
      if (ctx.input.evidenceLegality[evidence.id] === true) {
        score -= 15
      }
    }
  }

  // 비공개 보호 약속 위반
  for (const evidence of ctx.evidence) {
    const evState = ctx.evidenceStates[evidence.id]
    if (evState?.confidentialSource && evState.presented) {
      const excluded = ctx.input.evidenceLegality[evidence.id] === false
      if (!excluded) {
        score -= 20
      }
    }
  }

  // 턴 초과 패널티 (20턴 이상부터)
  if (ctx.turnsUsed > 20) {
    score -= Math.min(10, (ctx.turnsUsed - 20) * 2)
  }

  // ── 과정 보너스/패널티: 권위 ──
  const pm = ctx.processMetrics
  let processBonus = 0
  processBonus += Math.min(8, pm.evidenceEffective * 4)           // 효과적 증거 제시 +4 (최대 8)
  // v2: 15턴 보너스 제거 (속도 보상 삭제)
  // v2: 경로 커버리지 보너스
  processBonus += Math.min(6, pm.requiredPathsCovered * 3)         // 필수 경로 충족 +3 (최대 6)
  // 양측 모두 심문했으면 공정성 보너스
  if (pm.bothSidesQuestioned) processBonus += 4                    // v2: +3 → +4

  // v2: 패널티
  processBonus -= Math.min(6, pm.sameActionRepeats * 2)            // 반복 심문 -2 (최대 -6)
  // unsupported collapse: hard evidence/trust 없이 S5 (즉답요구 제외)
  processBonus -= Math.min(6, pm.unsupportedCollapses * 6)         // -6 (최대 -6)
  processBonus -= Math.min(9, pm.interjectionAllowed * 3)          // 끼어들기 허용 -3 (최대 -9)

  return Math.max(0, Math.min(100, score + processBonus))
}

/* ── 지혜 (Wisdom) ─────────────────────────── */

function calculateWisdom(ctx: VerdictContext): number {
  let score = 50

  if (ctx.input.selectedSolutions.length > 0) {
    score += 20
  }

  // 극단적 판결 감점
  const resps = Object.values(ctx.input.responsibility)
  const allA = resps.every((r) => r.a >= 90)
  const allB = resps.every((r) => r.b >= 90)
  if (allA || allB) {
    score -= 20
  }

  // 모호한 쟁점 적절한 보류
  for (const dispute of ctx.disputes) {
    if (dispute.ambiguity === 'high' && ctx.input.factFindings[dispute.id] === 'pending') {
      score += 10
    }
  }

  // ── 과정 보너스: 지혜 ──
  const pm = ctx.processMetrics
  let processBonus = 0
  processBonus += Math.min(8, pm.confidentialUsed * 4)            // 비공개 보호 활용 +4 (최대 8)
  processBonus += Math.min(6, pm.togglesUsed * 2)                 // 토글 스킬 활용 +2 (최대 6)
  // AI 자유 질문 활용 보너스
  if (pm.freeQuestionsRelevant >= 2) processBonus += 3             // 자유질문 2회+ 적중 → +3
  // v2: 상성 미스 패널티
  processBonus -= Math.min(4, pm.affinityMisses * 1)              // 상성 미스 -1 (최대 -4)
  // v2: 경로 보너스 액션 커버
  processBonus += Math.min(4, pm.bonusPathsCovered * 2)           // 보너스 경로 +2 (최대 4)

  return Math.max(0, Math.min(100, score + processBonus))
}
