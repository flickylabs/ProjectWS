/**
 * Discovery Engine — 4개 신규 메커닉의 핵심 로직
 * 1. 진실 공방 (Truth Confrontation)
 * 2. 증거 감별 (Evidence Appraisal)
 * 3. 숨겨진 쟁점 발현 (Hidden Dispute Emergence)
 * 4. 감정 전략 (Emotional Leverage)
 */
import type {
  TruthJudgment,
  PlayerJudgmentEntry,
  TruthConfrontationEvent,
  JudgmentConflictEvent,
  AppraisalVerdict,
  EvidenceAppraisalEntry,
  PartialTrustDetail,
  DisputeVisibility,
  DisputeVisibilityEntry,
  EmergenceRoute,
  EmotionTier,
  EmotionTierConfig,
  EmotionalSlipEvent,
  DiscoveryState,
} from '../types/discovery'
import type { CaseData, Dispute, EvidenceNode, TruthItem, PartyId } from '../types'
import type { ClaimNode } from '../types/dialogue'
import type { LieState } from '../types/agent'

// ─────────────────────────────────────────
// 감정 티어 설정
// ─────────────────────────────────────────

export const EMOTION_TIER_CONFIG: EmotionTierConfig[] = [
  {
    tier: 'calm',
    min: 0,
    max: 30,
    lieTransitionMultiplier: 0.5,
    slipChance: 0,
    label: '침착',
    description: '방어력이 높아 거짓말을 흔들기 어렵습니다. 논리적으로 답변하여 빈틈이 적습니다.',
  },
  {
    tier: 'agitated',
    min: 30,
    max: 60,
    lieTransitionMultiplier: 1.0,
    slipChance: 0,
    label: '동요',
    description: '균형 상태입니다. 질문 효과가 보통이며, 안정적으로 심문을 진행할 수 있습니다.',
  },
  {
    tier: 'explosive',
    min: 60,
    max: 85,
    lieTransitionMultiplier: 1.5,
    slipChance: 0.3,
    label: '격앙',
    description: '방어력이 약해져 거짓말 전이가 쉬워집니다. 흥분 상태에서 실수로 자백할 수 있지만, 더 밀면 셧다운될 수 있습니다.',
  },
  {
    tier: 'shutdown',
    min: 85,
    max: 100,
    lieTransitionMultiplier: 0,
    slipChance: 0,
    label: '셧다운',
    description: '응답을 거부합니다. 2턴간 이 당사자에게 질문할 수 없습니다. 공감 접근으로 감정을 낮춰야 합니다.',
  },
]

export function getEmotionTier(emotionValue: number): EmotionTierConfig {
  for (const tier of EMOTION_TIER_CONFIG) {
    if (emotionValue >= tier.min && emotionValue < tier.max) return tier
  }
  // 100이면 shutdown
  return EMOTION_TIER_CONFIG[EMOTION_TIER_CONFIG.length - 1]
}

/** 셧다운 상태에서 질문 가능한지 */
export function canInterrogate(emotionValue: number): boolean {
  return getEmotionTier(emotionValue).tier !== 'shutdown'
}

// ─────────────────────────────────────────
// 1. 진실 공방 — 트리거 판정
// ─────────────────────────────────────────

/**
 * 양측 진술이 같은 쟁점에서 실질적으로 충돌하는지 확인하여 진실 공방 이벤트 생성.
 *
 * 진짜 충돌 = 같은 사실에 대해 서로 다른 주장을 하는 것
 *   예: A "보낸 적 없다" vs B "분명히 보냈다"
 *   예: A "상담이었다" vs B "외도였다"
 *
 * 충돌이 아닌 것 = 같은 규칙에 대해 각자 자기 위반을 이야기하는 것
 *   예: A "제가 280만원을..." vs B "저도 150만원을..." (각자 본인 얘기)
 */
export function checkTruthConfrontation(
  claims: ClaimNode[],
  judgments: Record<string, PlayerJudgmentEntry>,
  visibleDisputes: string[],
  disputes?: Dispute[],
): TruthConfrontationEvent | null {
  for (const disputeId of visibleDisputes) {
    // 이미 판단한 쟁점은 스킵
    if (judgments[disputeId]) continue

    // both_know 쟁점은 진실 공방 대상 아님 (양측 다 아는 사실 = 각자 인정하는 것)
    const dispute = disputes?.find(d => d.id === disputeId)
    if (dispute?.quadrant === 'both_know') continue

    const aClaims = claims.filter((c) => c.claimant === 'a' && c.disputeId === disputeId && c.status !== 'collapsed')
    const bClaims = claims.filter((c) => c.claimant === 'b' && c.disputeId === disputeId && c.status !== 'collapsed')

    // 양측 모두 발언했을 때만 트리거
    if (aClaims.length === 0 || bClaims.length === 0) continue

    const latestA = aClaims[aClaims.length - 1]
    const latestB = bClaims[bClaims.length - 1]

    // 양측 주장이 동일하면 충돌 아님
    if (latestA.summary === latestB.summary) continue

    // 핵심 조건: 한쪽이 부정(deny)하고 다른 쪽이 주장(normal/conflict)하는 경우만 진짜 충돌
    // 또는 양쪽의 confidence가 반대 방향 (한쪽 high, 한쪽 low)
    const isOpposingStance =
      // 한쪽이 강하게 주장, 다른 쪽이 약하게 방어
      (latestA.confidence === 'high' && latestB.confidence === 'high') ||
      // 양쪽 다 conflict 상태
      (latestA.status === 'conflict' || latestB.status === 'conflict') ||
      // 한쪽이 changed (진술 변경)
      (latestA.status === 'changed' || latestB.status === 'changed')

    if (!isOpposingStance) continue

    return {
      disputeId,
      claimA: { summary: latestA.summary, claimId: latestA.id },
      claimB: { summary: latestB.summary, claimId: latestB.id },
      relevantEvidence: [],
    }
  }
  return null
}

/**
 * 판단 후 연쇄 추론 대상 쟁점 계산.
 * evidence.proves[] 를 통해 같은 증거를 공유하는 쟁점끼리 연결.
 */
export function computeCascadeTargets(
  disputeId: string,
  evidence: EvidenceNode[],
  allDisputes: Dispute[],
): string[] {
  // 이 쟁점을 proves하는 증거가 다른 어떤 쟁점도 proves하는지
  const linkedDisputeIds = new Set<string>()
  for (const e of evidence) {
    if (e.proves.includes(disputeId)) {
      for (const otherDisputeId of e.proves) {
        if (otherDisputeId !== disputeId) {
          linkedDisputeIds.add(otherDisputeId)
        }
      }
    }
  }
  return Array.from(linkedDisputeIds)
}

/**
 * 새로운 증거/증언이 기존 판단과 충돌하는지 확인.
 */
export function checkJudgmentConflict(
  disputeId: string,
  judgments: Record<string, PlayerJudgmentEntry>,
  newInfo: string,
  source: JudgmentConflictEvent['source'],
): JudgmentConflictEvent | null {
  const j = judgments[disputeId]
  if (!j || j.judgment === 'undetermined') return null

  return {
    disputeId,
    currentJudgment: j.judgment,
    conflictingInfo: newInfo,
    source,
  }
}

// ─────────────────────────────────────────
// 2. 증거 감별
// ─────────────────────────────────────────

/**
 * 감별 결과에 따른 증거 제시 효과 보정 계수.
 */
export function getAppraisalEffectMultiplier(
  appraisal: EvidenceAppraisalEntry | undefined,
  evidence: EvidenceNode,
): number {
  if (!appraisal || appraisal.verdict === 'unappraised') return 1.0

  if (evidence.isTrap) {
    // 함정 증거
    if (appraisal.verdict === 'suspicious') return 2.0      // 올바른 간파 → 2배 효과
    if (appraisal.verdict === 'trustworthy') return 0.3      // 함정에 속음 → 역효과
    if (appraisal.verdict === 'partial') return 1.0          // 부분 인식 → 보통
  } else {
    // 진짜 증거
    if (appraisal.verdict === 'trustworthy') return 1.5      // 올바른 신뢰 → 1.5배
    if (appraisal.verdict === 'suspicious') return 0.5       // 진짜를 의심 → 반감
    if (appraisal.verdict === 'partial') return 1.0          // 부분 → 보통
  }

  return 1.0
}

/**
 * 감별 정확도 채점 (게임 종료 시).
 */
export function scoreAppraisal(
  appraisal: EvidenceAppraisalEntry,
  evidence: EvidenceNode,
): boolean {
  if (evidence.isTrap) {
    return appraisal.verdict === 'suspicious'
  }
  // 진짜 증거는 trustworthy 또는 partial이면 정답
  return appraisal.verdict === 'trustworthy' || appraisal.verdict === 'partial'
}

// ─────────────────────────────────────────
// 3. 숨겨진 쟁점 발현
// ─────────────────────────────────────────

/**
 * 사건 데이터에서 초기 쟁점 가시성을 결정.
 * neither_knows, shared_misconception + unlockCondition 있는 쟁점을 숨김 처리.
 */
export function initializeDisputeVisibility(
  caseData: CaseData,
): Record<string, DisputeVisibilityEntry> {
  const map: Record<string, DisputeVisibilityEntry> = {}

  for (const dispute of caseData.disputes) {
    const shouldHide =
      (dispute.quadrant === 'neither_knows' || dispute.quadrant === 'shared_misconception') &&
      dispute.weight === 'high'

    // 어떤 파티에 관련되는지 결정
    const relevantParties = getDisputeRelevantParties(dispute, caseData)

    // 발현 경로 자동 생성
    const routes = generateEmergenceRoutes(dispute, caseData)

    map[dispute.id] = {
      disputeId: dispute.id,
      visibility: shouldHide ? 'hidden' : 'visible',
      relevantParties,
      emergenceRoutes: routes,
      emergedAtTurn: shouldHide ? null : 0,
      emergedVia: shouldHide ? null : null,
      isNew: false,
    }
  }

  return map
}

/**
 * 쟁점이 어떤 당사자와 관련 있는지 결정.
 * lieConfigA/B에 해당 쟁점이 포함되어 있으면 관련 있음.
 */
function getDisputeRelevantParties(dispute: Dispute, caseData: CaseData): PartyId[] {
  const parties: PartyId[] = []
  if (caseData.lieConfigA.some((lc) => lc.disputeId === dispute.id)) parties.push('a')
  if (caseData.lieConfigB.some((lc) => lc.disputeId === dispute.id)) parties.push('b')
  // 양쪽 다 없으면 (neither_knows 등) 양쪽 모두 관련
  if (parties.length === 0) parties.push('a', 'b')
  return parties
}

/**
 * 쟁점별 발현 경로를 자동 생성.
 */
function generateEmergenceRoutes(dispute: Dispute, caseData: CaseData): EmergenceRoute[] {
  const routes: EmergenceRoute[] = []

  // 경로 1: 관련 증거가 제시되면 발현
  if (dispute.requiredEvidence.length > 0) {
    routes.push({
      type: 'evidence',
      condition: { evidenceIds: [...dispute.requiredEvidence] },
    })
  }

  // 경로 2: unlockCondition에 쟁점 선행 조건이 있으면
  if (dispute.unlockCondition?.requireDispute) {
    routes.push({
      type: 'lie_collapse',
      condition: { lieCollapseDispute: dispute.unlockCondition.requireDispute.id },
    })
  }

  // 경로 3: 증인이 관련 증거를 가지고 있으면
  for (const tp of caseData.duo.socialGraph ?? []) {
    if (tp.witnessedDirectly && caseData.activeThirdParties.includes(tp.id)) {
      // 이 증인의 knowledgeScope가 해당 쟁점과 관련 있을 수 있음
      routes.push({
        type: 'witness',
        condition: { witnessId: tp.id },
      })
    }
  }

  // 경로 4: 관련 쟁점 2개 이상 판단 완료 시 발현
  const linkedDisputes = caseData.evidence
    .filter((e) => e.proves.includes(dispute.id))
    .flatMap((e) => e.proves.filter((id) => id !== dispute.id))
  if (linkedDisputes.length > 0) {
    routes.push({
      type: 'truth_confrontation',
      condition: { judgedDisputes: [...new Set(linkedDisputes)] },
    })
  }

  return routes
}

/**
 * 숨겨진 쟁점 발현 조건 체크.
 * 하나라도 만족하는 경로가 있으면 발현.
 */
export function checkEmergence(
  entry: DisputeVisibilityEntry,
  context: {
    presentedEvidenceIds: string[]
    judgedDisputeIds: string[]
    calledWitnessIds: string[]
    collapsedDisputes: Record<string, PartyId>
    emotionalSlipDisputes: string[]
  },
): EmergenceRoute['type'] | null {
  if (entry.visibility !== 'hidden') return null

  for (const route of entry.emergenceRoutes) {
    const cond = route.condition

    switch (route.type) {
      case 'evidence':
        if (cond.evidenceIds?.every((id) => context.presentedEvidenceIds.includes(id))) {
          return 'evidence'
        }
        break

      case 'truth_confrontation':
        if (cond.judgedDisputes?.every((id) => context.judgedDisputeIds.includes(id))) {
          return 'truth_confrontation'
        }
        break

      case 'witness':
        if (cond.witnessId && context.calledWitnessIds.includes(cond.witnessId)) {
          return 'witness'
        }
        break

      case 'lie_collapse':
        if (cond.lieCollapseDispute && context.collapsedDisputes[cond.lieCollapseDispute]) {
          return 'lie_collapse'
        }
        break

      case 'emotional_slip':
        if (cond.emotionalSlipDispute && context.emotionalSlipDisputes.includes(cond.emotionalSlipDispute)) {
          return 'emotional_slip'
        }
        break
    }
  }

  return null
}

// ─────────────────────────────────────────
// 4. 감정 실수 자백
// ─────────────────────────────────────────

/**
 * 격앙 상태에서 질문 시 실수 자백이 발생하는지 확인.
 * verbalTells + 감정 상태 + 현재 쟁점으로 판정.
 */
export function checkEmotionalSlip(
  party: PartyId,
  emotionValue: number,
  currentDisputeId: string,
  lieStateMap: Record<string, { currentState: LieState }>,
  caseData: CaseData,
): EmotionalSlipEvent | null {
  const tier = getEmotionTier(emotionValue)
  if (tier.slipChance <= 0) return null

  // 랜덤 판정
  if (Math.random() > tier.slipChance) return null

  // 현재 쟁점이 S0이면 실수할 거짓말이 없음
  const currentLie = lieStateMap[currentDisputeId]
  if (!currentLie || currentLie.currentState === 'S0' || currentLie.currentState === 'S5') return null

  // 실수로 연결될 수 있는 다른 쟁점 찾기 (같은 증거를 공유하는)
  const linkedDisputes = caseData.evidence
    .filter((e) => e.proves.includes(currentDisputeId))
    .flatMap((e) => e.proves.filter((id) => id !== currentDisputeId))

  const linkedDisputeId = linkedDisputes.length > 0 ? linkedDisputes[0] : null

  // verbalTells에서 적절한 실수 패턴 선택
  const partyData = party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const corneredTell = partyData.verbalTells?.find((vt) => vt.trigger === 'cornered' || vt.trigger === 'emotional')
  const slipText = corneredTell?.pattern ?? '(감정적 실수 발언)'

  return {
    party,
    sourceDisputeId: currentDisputeId,
    linkedDisputeId,
    slipText,
    turn: 0,  // 호출 시점에서 채워짐
  }
}

// ─────────────────────────────────────────
// 초기 상태 생성
// ─────────────────────────────────────────

export function createInitialDiscoveryState(caseData: CaseData): DiscoveryState {
  return {
    judgments: {},
    appraisals: {},
    disputeVisibility: initializeDisputeVisibility(caseData),
    emotionalSlips: [],
    discoveredTruths: [],
    pendingConfrontation: null,
    pendingConflict: null,
    pendingEmergence: null,
    pendingSlip: null,
  }
}

/**
 * 플레이어가 볼 수 있는 쟁점 목록 (파티별 필터링).
 */
export function getVisibleDisputes(
  disputeVisibility: Record<string, DisputeVisibilityEntry>,
  targetParty: PartyId | null,
): DisputeVisibilityEntry[] {
  return Object.values(disputeVisibility).filter((entry) => {
    // hidden은 표시 안 함
    if (entry.visibility === 'hidden') return false
    // 파티 필터
    if (targetParty && !entry.relevantParties.includes(targetParty)) return false
    return true
  })
}

/**
 * 비활성화 가능한 쟁점 판별 (S5 + 판단 완료 + 증거 전부 제시됨).
 */
export function shouldDeactivateDispute(
  disputeId: string,
  lieStates: Record<string, { currentState: LieState }>,
  judgments: Record<string, PlayerJudgmentEntry>,
): boolean {
  const lie = lieStates[disputeId]
  const judgment = judgments[disputeId]

  // 양측 다 S5이고 판단도 완료되었으면 비활성화 가능
  return !!lie && lie.currentState === 'S5' && !!judgment && judgment.judgment !== 'undetermined'
}
