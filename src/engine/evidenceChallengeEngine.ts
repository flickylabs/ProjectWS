/**
 * Evidence Challenge 엔진
 * ─────────────────────────────────
 * attackVector 봉쇄 추적 + full collapse 감지 + Discovery 트리거 우선순위.
 *
 * 설계: GPT Pro 5.4 (solomon_5_design_opinions.md 의견 5)
 * 구현: Claude Code
 *
 * 핵심 분리:
 * - Evidence Appraisal = "이 증거를 믿어도 되는가"
 * - EvidenceChallenge = "믿을 때, NPC가 어떤 방어를 더 못 쓰게 되는가"
 */

import type {
  EvidenceChallenge,
  AttackVector,
  InvestigationAction,
  EmotionTier,
} from '../types'
import type { DisputeVisibility } from '../types'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 데이터 저장소
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** caseId → evidenceId → EvidenceChallenge */
const challengeRegistry: Map<string, Map<string, EvidenceChallenge>> = new Map()

/** caseId → evidenceId → 봉쇄된 벡터 Set */
const blockedVectorState: Map<string, Map<string, Set<AttackVector>>> = new Map()

/** caseId → 조사 성공 증거 ID Set */
const investigationSuccessIds: Map<string, Set<string>> = new Map()

/** caseId → full collapse 증거 ID Set */
const fullCollapseIds: Map<string, Set<string>> = new Map()

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 등록/초기화
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function registerEvidenceChallenges(caseId: string, challenges: EvidenceChallenge[]): void {
  const map = new Map<string, EvidenceChallenge>()
  for (const c of challenges) map.set(c.evidenceId, c)
  challengeRegistry.set(caseId, map)
  blockedVectorState.set(caseId, new Map())
  investigationSuccessIds.set(caseId, new Set())
  fullCollapseIds.set(caseId, new Set())
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface InvestigationResolveResult {
  /** 이번 조사로 새로 봉쇄된 벡터 */
  newlyBlocked: AttackVector[]
  /** 이 증거의 아직 남아있는 방어 벡터 */
  remainingVectors: AttackVector[]
  /** 전체 봉쇄 발생 여부 */
  fullCollapse: boolean
  /** 조사 성공 여부 (1개 이상 봉쇄) */
  investigationSuccess: boolean
}

/**
 * 조사 액션 완료 시 호출. 벡터 봉쇄를 적용하고 결과를 반환.
 *
 * Evidence Appraisal 결과에 따른 봉쇄 강도:
 * - trustworthy: resolvedBy에 적힌 벡터 전부 봉쇄
 * - partial: 가장 핵심 벡터 1개만 봉쇄
 * - suspicious: 봉쇄 없음
 */
export function resolveInvestigation(
  caseId: string,
  evidenceId: string,
  action: InvestigationAction,
  appraisalResult: 'trustworthy' | 'partial' | 'suspicious' = 'trustworthy',
): InvestigationResolveResult {
  const challenge = challengeRegistry.get(caseId)?.get(evidenceId)
  if (!challenge) {
    return { newlyBlocked: [], remainingVectors: [], fullCollapse: false, investigationSuccess: false }
  }

  // 이 액션이 봉쇄하는 벡터들
  const vectorsToBlock = challenge.resolvedBy[action] ?? []
  if (vectorsToBlock.length === 0 || appraisalResult === 'suspicious') {
    const remaining = getRemainingVectors(caseId, evidenceId, challenge)
    return { newlyBlocked: [], remainingVectors: remaining, fullCollapse: false, investigationSuccess: false }
  }

  // 봉쇄 상태 가져오기/생성
  const caseBlocked = blockedVectorState.get(caseId)!
  if (!caseBlocked.has(evidenceId)) caseBlocked.set(evidenceId, new Set())
  const blocked = caseBlocked.get(evidenceId)!

  // appraisal에 따른 봉쇄 범위
  const newlyBlocked: AttackVector[] = []
  if (appraisalResult === 'trustworthy') {
    for (const v of vectorsToBlock) {
      if (!blocked.has(v)) {
        blocked.add(v)
        newlyBlocked.push(v)
      }
    }
  } else if (appraisalResult === 'partial') {
    // 가장 핵심 벡터 1개만
    const first = vectorsToBlock.find(v => !blocked.has(v))
    if (first) {
      blocked.add(first)
      newlyBlocked.push(first)
    }
  }

  const investigationSuccess = newlyBlocked.length > 0
  if (investigationSuccess) {
    investigationSuccessIds.get(caseId)!.add(evidenceId)
  }

  // 전체 봉쇄 확인
  const remaining = getRemainingVectors(caseId, evidenceId, challenge)
  const fullCollapse = remaining.length === 0 && challenge.attackVectors.length > 0

  if (fullCollapse) {
    fullCollapseIds.get(caseId)!.add(evidenceId)
  }

  return { newlyBlocked, remainingVectors: remaining, fullCollapse, investigationSuccess }
}

/**
 * 특정 증거의 현재 사용 가능한 방어 벡터 목록을 반환.
 * Blueprint 생성 시 availableAttackVectors로 사용.
 */
export function getAvailableVectors(caseId: string, evidenceId: string): AttackVector[] {
  const challenge = challengeRegistry.get(caseId)?.get(evidenceId)
  if (!challenge) return []
  return getRemainingVectors(caseId, evidenceId, challenge)
}

/**
 * 특정 쟁점과 관련된 모든 증거의 봉쇄 상태를 집계.
 * Blueprint 생성 시 evidenceBlockedVectors 계산에 사용.
 */
export function getDisputeBlockedCount(caseId: string, disputeId: string): {
  totalVectors: number
  blockedVectors: number
  availableAttackVectors: AttackVector[]
} {
  const challenges = challengeRegistry.get(caseId)
  if (!challenges) return { totalVectors: 0, blockedVectors: 0, availableAttackVectors: [] }

  let totalVectors = 0
  let blockedVectors = 0
  const allAvailable: Set<AttackVector> = new Set()

  for (const [evId, challenge] of challenges) {
    if (!challenge.disputeIds.includes(disputeId)) continue
    totalVectors += challenge.attackVectors.length
    const remaining = getRemainingVectors(caseId, evId, challenge)
    blockedVectors += challenge.attackVectors.length - remaining.length
    for (const v of remaining) allAvailable.add(v)
  }

  return { totalVectors, blockedVectors, availableAttackVectors: [...allAvailable] }
}

/**
 * full collapse 발생 시 Discovery 트리거를 결정.
 * 우선순위: Hidden Dispute → Truth Duel → Emotional Leverage
 */
export function getCollapseDiscoveryTrigger(
  caseId: string,
  evidenceId: string,
  disputeVisibility: Record<string, DisputeVisibility>,
  emotionalLeakRisk: 'none' | 'low' | 'mid' | 'high',
  emotionTier: EmotionTier,
): CollapseDiscoveryTrigger {
  const challenge = challengeRegistry.get(caseId)?.get(evidenceId)
  if (!challenge) return { type: 'none' }

  // 1순위: Hidden Dispute Reveal
  if (challenge.blockedClaims && challenge.blockedClaims.length > 0) {
    // blockedClaims가 아직 unopened인 dispute와 연결되는지 확인
    for (const disputeId of challenge.disputeIds) {
      if (disputeVisibility[disputeId] === 'hidden') {
        return {
          type: 'hidden_dispute_reveal',
          disputeId,
          description: `증거 ${evidenceId}의 방어선이 완전 붕괴되어 숨겨진 쟁점이 드러남`,
        }
      }
    }
  }

  // 2순위: Truth Duel 강제 진입
  const forceMode = challenge.whenAllResolved.forceDefenseMode
  const minAdvance = challenge.whenAllResolved.minLieAdvance
  if (forceMode || minAdvance) {
    return {
      type: 'truth_duel',
      forceDefenseMode: forceMode,
      minLieAdvance: minAdvance,
      disputeIds: challenge.disputeIds,
    }
  }

  // 3순위: Emotional Leverage 기회 생성
  if (
    (emotionalLeakRisk === 'mid' || emotionalLeakRisk === 'high') ||
    (emotionTier === 'agitated' || emotionTier === 'explosive')
  ) {
    return {
      type: 'emotional_leverage',
      bonusTurns: emotionalLeakRisk === 'high' ? 2 : 1,
      trustBonus: 15,
    }
  }

  return { type: 'none' }
}

/**
 * readinessEngine에서 사용할 집계 데이터를 반환.
 */
export function getReadinessSets(caseId: string): {
  investigationSuccessEvidenceIds: Set<string>
  fullCollapseEvidenceIds: Set<string>
} {
  return {
    investigationSuccessEvidenceIds: investigationSuccessIds.get(caseId) ?? new Set(),
    fullCollapseEvidenceIds: fullCollapseIds.get(caseId) ?? new Set(),
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type CollapseDiscoveryTrigger =
  | { type: 'none' }
  | { type: 'hidden_dispute_reveal'; disputeId: string; description: string }
  | { type: 'truth_duel'; forceDefenseMode?: 'concession' | 'silence'; minLieAdvance?: 1 | 2; disputeIds: string[] }
  | { type: 'emotional_leverage'; bonusTurns: number; trustBonus: number }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function getRemainingVectors(
  caseId: string,
  evidenceId: string,
  challenge: EvidenceChallenge,
): AttackVector[] {
  const blocked = blockedVectorState.get(caseId)?.get(evidenceId)
  if (!blocked) return [...challenge.attackVectors]
  return challenge.attackVectors.filter(v => !blocked.has(v))
}
