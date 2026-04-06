/**
 * Atom Selection Engine — ClaimPolicyV2 핵심 엔진
 * ─────────────────────────────────
 * subAction에 따라 적절한 atom을 선택하고,
 * slot surface를 결정하여 BlueprintAtomPlan을 생성한다.
 *
 * 처리 순서:
 * 1. subAction → atom 태그 우선순위 결정
 * 2. 후보 atom 필터링 (suppression, evidence 조건 등)
 * 3. 점수 산출 → 상위 atom 선택
 * 4. slot surface 결정 (tell/evidence/audience 반영)
 */

import type {
  ClaimAtom,
  ClaimAtomId,
  ClaimAtomTag,
  NormalizedClaimPolicyV2,
  BlueprintAtomPlan,
  AtomSelection,
  SlotSelection,
  SlotFamily,
  SlotSurfaceMode,
  SubActionAtomRule,
  ClaimAtomSlots,
} from '../types'
import { SUBACTION_ATOM_RULES } from '../types'
import type { QuestionType, Stance, PartyId } from '../types'
import { getUnlockedAtoms, getEarlyRevealedAtoms } from './v3GameLoopLoader'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface AtomSelectionInput {
  policy: NormalizedClaimPolicyV2
  subAction: QuestionType
  stance: Stance
  mustUseTell?: string
  /** 이미 봉쇄된 atom ID */
  blockedAtomIds?: ClaimAtomId[]
  /** 최근 사용된 atom ID (반복 방지) */
  recentlyUsedAtomIds?: ClaimAtomId[]
  /** 제시 중인 증거 ID */
  evidenceId?: string
  /** 재판관 대상 발화인지 */
  isJudgeAudience?: boolean
  /** V3: caseId (unlock atom 병합용) */
  caseId?: string
  /** V3: party (unlock atom 병합용) */
  party?: PartyId
  /** V3: 현재 lieState (unlock atom 병합용) */
  currentLieState?: string
}

/**
 * subAction + stance + tell 상태에 따라 atom을 선택하고 slot을 결정한다.
 */
export function buildAtomPlan(input: AtomSelectionInput): BlueprintAtomPlan {
  const { policy, subAction, stance, mustUseTell, blockedAtomIds = [], recentlyUsedAtomIds = [], evidenceId } = input

  const rule = (SUBACTION_ATOM_RULES as Record<QuestionType, SubActionAtomRule>)[subAction]
  console.log(`[AtomEngine] subAction=${subAction}, rule.allowExactAmount=${rule?.allowExactAmountByDefault}, preferredAmount=${rule?.preferredSlotModes?.amount}, mustUseTell=${mustUseTell}`)

  // V3: StateUnlockAtom 병합 — 현재 state 이하에서 해금된 atom을 후보에 추가
  let allAtoms = [...policy.claimAtoms]
  if (input.caseId && input.party && input.currentLieState) {
    const unlockAtoms = getUnlockedAtoms(
      input.caseId, input.party, policy.disputeId, input.currentLieState as any,
    )
    const earlyRevealed = getEarlyRevealedAtoms(input.caseId)
    for (const ua of unlockAtoms) {
      // 이미 V2 atom에 동일 ID가 있으면 스킵
      if (allAtoms.some(a => a.id === ua.id)) continue
      // 아직 해당 state 미도달인데 조기 해금된 것만 추가
      const stateReached = STATE_RANK_ATOM[input.currentLieState as keyof typeof STATE_RANK_ATOM] >= STATE_RANK_ATOM[ua.unlockedAtState as keyof typeof STATE_RANK_ATOM]
      if (!stateReached && !earlyRevealed.has(ua.id)) continue
      // ClaimAtom 형태로 변환하여 추가
      allAtoms.push({
        id: ua.id,
        factText: ua.factText,
        tags: ua.tags as ClaimAtomTag[],
        slots: ua.slots as any,
        stanceHints: ua.stanceHints as any,
        source: 'v3_unlock' as any,
      })
    }
  }

  // 1. 후보 필터링 (usableInSubActions 우선, 없으면 전체 fallback)
  let candidates = allAtoms.filter(atom => {
    if (blockedAtomIds.includes(atom.id)) return false
    if (atom.usableInSubActions && !atom.usableInSubActions.includes(subAction)) return false
    if (atom.requiresEvidenceIds && atom.requiresEvidenceIds.length > 0) {
      if (!evidenceId || !atom.requiresEvidenceIds.includes(evidenceId)) return false
    }
    return true
  })

  // fallback: usableInSubActions 필터 후 후보가 없으면 제한 없이 전체에서 선택
  if (candidates.length === 0) {
    candidates = allAtoms.filter(atom => {
      if (blockedAtomIds.includes(atom.id)) return false
      if (atom.requiresEvidenceIds && atom.requiresEvidenceIds.length > 0) {
        if (!evidenceId || !atom.requiresEvidenceIds.includes(evidenceId)) return false
      }
      return true
    })
  }

  // 2. 점수 산출
  const scored: AtomSelection[] = candidates.map(atom => {
    let score = 0
    const matchedTags: ClaimAtomTag[] = []

    // primary tag 매칭: +100
    for (const tag of rule.primaryTags) {
      if (atom.tags.includes(tag)) { score += 100; matchedTags.push(tag) }
    }
    // secondary tag 매칭: +40
    for (const tag of rule.secondaryTags) {
      if (atom.tags.includes(tag)) { score += 40; matchedTags.push(tag) }
    }
    // avoid tag: -200
    if (rule.avoidTags) {
      for (const tag of rule.avoidTags) {
        if (atom.tags.includes(tag)) score -= 200
      }
    }
    // stance hint 보너스: +30
    if (atom.stanceHints?.includes(stance)) score += 30

    // 최근 사용 페널티
    if (recentlyUsedAtomIds.includes(atom.id)) {
      score -= (atom.repeatPenalty ?? 60)
    }

    // evidence 연결 보너스
    if (evidenceId && atom.requiresEvidenceIds?.includes(evidenceId)) score += 35

    return { atomId: atom.id, score, selectedTags: matchedTags }
  })

  // 3. 상위 atom 선택
  scored.sort((a, b) => b.score - a.score)
  const selectedAtoms = scored.slice(0, rule.coreAtomCount)

  // 3.5. S5 exact-slot rescue: confess인데 금액/인물 slot이 없으면 보강 atom 1개 주입
  if (stance === 'confess' && input.currentLieState === 'S5') {
    const EXACT_FAMILIES: string[] = ['amount', 'person', 'beneficiary', 'evidence']
    const hasExactSlot = selectedAtoms.some(sel => {
      const atom = allAtoms.find(a => a.id === sel.atomId)
      if (!atom?.slots) return false
      return Object.keys(atom.slots).some(f => EXACT_FAMILIES.includes(f))
    })
    if (!hasExactSlot) {
      // 전체 atom 중 exact-support slot이 있는 것을 찾아 1개 보강
      const rescueCandidate = allAtoms
        .filter(a => !blockedAtomIds.includes(a.id) && !selectedAtoms.some(s => s.atomId === a.id))
        .filter(a => a.slots && Object.keys(a.slots).some(f => EXACT_FAMILIES.includes(f)))
        .sort((a, b) => (b.stanceHints?.includes('confess') ? 30 : 0) - (a.stanceHints?.includes('confess') ? 30 : 0))
      if (rescueCandidate.length > 0) {
        selectedAtoms.push({ atomId: rescueCandidate[0].id, score: -1, selectedTags: [] })
        console.log(`[AtomEngine] S5 exact-slot rescue: ${rescueCandidate[0].id} 보강`)
      }
    }
  }

  // 4. 금지 atom 목록
  const suppressionAtomIds = policy.claimAtoms
    .filter(a => a.tags.includes('denial') && stance !== 'deny')
    .map(a => a.id)
  const forbiddenAtomIds = [...new Set([...blockedAtomIds, ...suppressionAtomIds])]

  // 5. slot surface 결정
  const slotSelections = resolveSlotSelections(
    selectedAtoms.map(a => allAtoms.find(ca => ca.id === a.atomId)!).filter(Boolean),
    rule,
    mustUseTell,
    input.isJudgeAudience ?? true,
    stance,
    input.currentLieState,
  )

  return {
    answerFocus: subAction,
    selectedAtoms,
    forbiddenAtomIds,
    slotSelections,
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Slot Surface 결정
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function resolveSlotSelections(
  atoms: ClaimAtom[],
  rule: SubActionAtomRule,
  mustUseTell?: string,
  isJudgeAudience: boolean = true,
  stance?: Stance,
  currentLieState?: string,
): SlotSelection[] {
  const selections: SlotSelection[] = []

  // tell에 의한 exact 승격
  const tellPromotesExact = mustUseTell === 'over_precision' || mustUseTell === 'receipt_stack'

  // confess stance에서는 모든 slot을 구체적 값으로 승격
  const confessPromotesExact = stance === 'confess'

  for (const atom of atoms) {
    if (!atom.slots) continue

    for (const [family, slotData] of Object.entries(atom.slots) as [SlotFamily, any][]) {
      if (!slotData) continue

      // 기본 mode 결정
      let mode: SlotSurfaceMode = rule.preferredSlotModes[family] ?? 'neutral'

      // confess 승격: 모든 slot을 구체적 값으로
      if (confessPromotesExact) {
        if (family === 'amount') mode = 'rounded'      // "280만원" (읽기 쉬운 형태)
        else if (family === 'time') mode = 'dateExact'  // "9월 20일"
        else if (family === 'person' || family === 'beneficiary') mode = 'fullName' // "최민정", "오미숙"
        else if (family === 'evidence') mode = 'fullName' // "재가돌봄센터 간병 예약 확인서"
        else if (family === 'action') mode = 'exact'
        else if (family === 'rule') mode = 'exact'
        else if (family === 'place') mode = 'exact'
      }

      // tell 승격: over_precision이면 amount/time을 exact로
      if (tellPromotesExact && (family === 'amount' || family === 'time')) {
        mode = family === 'amount' ? 'exact' : 'dateExact'
      }

      // S0-S1 강제 neutral: lieState와 무관하게 금액/시각/인물이 구체화되는 것을 차단
      const isEarlyState = currentLieState && ['S0', 'S1'].includes(currentLieState)
      if (isEarlyState && !confessPromotesExact) {
        if (family === 'amount' || family === 'time') mode = 'neutral'
        if (family === 'person' || family === 'beneficiary') mode = 'judgeRef'
      }

      // tell 비활성 시: amount/time은 neutral 강제 (단, confess에서는 강제하지 않음)
      if (!confessPromotesExact && !tellPromotesExact && !rule.allowExactAmountByDefault && family === 'amount') {
        mode = 'neutral'
      }
      if (!confessPromotesExact && !tellPromotesExact && !rule.allowExactTimeByDefault && family === 'time') {
        mode = 'neutral'
      }

      // 호칭: judge audience면 judgeRef (단, confess에서는 fullName 우선)
      if (isJudgeAudience && (family === 'person' || family === 'relation' || family === 'beneficiary')) {
        if (!confessPromotesExact) {
          mode = 'judgeRef'
        }
        // confess에서도 relation은 judgeRef 유지 (장모님, 제 아내 등)
        if (confessPromotesExact && family === 'relation') {
          mode = 'judgeRef'
        }
      }

      // slot에서 값 추출
      const value = extractSlotValue(slotData, mode)
      if (value) {
        if (family === 'amount' || family === 'time') {
          console.log(`[SlotResolve] ${atom.id}/${family}: mode=${mode}, value=${value}, neutral=${slotData.neutral}`)
        }
        selections.push({ atomId: atom.id, family, mode, value })

        // confess에서 person/beneficiary의 role도 추가 제공 (이름 + 직함)
        if (confessPromotesExact && (family === 'person' || family === 'beneficiary') && slotData.role) {
          selections.push({ atomId: atom.id, family, mode: 'role', value: slotData.role })
        }
      }
    }
  }

  return selections
}

function extractSlotValue(slot: any, mode: SlotSurfaceMode): string | null {
  // mode에 해당하는 값을 찾고, 없으면 neutral fallback
  if (slot[mode] !== undefined) return slot[mode]
  if (slot.neutral !== undefined) return slot.neutral
  // 아무것도 없으면 첫 번째 값
  for (const v of Object.values(slot)) {
    if (typeof v === 'string') return v
  }
  return null
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Legacy Fallback — publicClaim → atom 자동 합성
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * 기존 ClaimPolicy의 publicClaim 문장을 임시 atom으로 변환.
 * V2 데이터가 없는 사건에서 사용.
 */
export function synthesizeLegacyAtoms(
  publicClaim: string[],
  disputeId: string,
): ClaimAtom[] {
  return publicClaim.map((text, i) => {
    // 숫자 추출
    const amountMatch = text.match(/[\d,]+원/)
    const dateMatch = text.match(/\d+월\s*\d+일/)

    const slots: ClaimAtomSlots = {}
    if (amountMatch) {
      slots.amount = {
        exact: amountMatch[0],
        neutral: '해당 금액',
      }
    }
    if (dateMatch) {
      slots.time = {
        dateExact: dateMatch[0],
        neutral: '그 시점',
      }
    }

    // 태그 추론 (간단한 규칙 기반)
    const tags: ClaimAtomTag[] = ['legacy_sentence']
    if (text.includes('맞습니다') || text.includes('사실')) tags.push('act', 'admission')
    if (text.includes('이유') || text.includes('때문')) tags.push('motive')
    if (text.includes('힘들') || text.includes('마음') || text.includes('두려')) tags.push('emotion')
    if (text.includes('약속') || text.includes('상의')) tags.push('rule')
    if (tags.length === 1) tags.push('act') // 기본 태그

    return {
      id: `legacy:${disputeId}:${i}`,
      factText: text.replace(/[\d,]+원/g, '해당 금액').replace(/\d+월\s*\d+일/g, '해당 시점').slice(0, 30),
      tags,
      slots: Object.keys(slots).length > 0 ? slots : undefined,
      source: 'legacy_publicClaim' as const,
      repeatPenalty: 40,
    }
  })
}

/**
 * AnyClaimPolicy → NormalizedClaimPolicyV2로 정규화.
 * claimAtoms가 있으면 V2, 없으면 legacy 합성.
 */
export function normalizeClaimPolicy(
  policy: any,
): NormalizedClaimPolicyV2 {
  // V2 데이터가 있는 경우
  if (policy.claimAtoms && Array.isArray(policy.claimAtoms) && policy.claimAtoms.length > 0) {
    return {
      disputeId: policy.disputeId,
      state: policy.state,
      claimAtoms: policy.claimAtoms,
      privateKnowledge: policy.privateKnowledge ?? [],
      suppressions: policy.suppressions ?? [],
      emotionalLeakRisk: policy.emotionalLeakRisk ?? 'none',
      tellPool: policy.tellPool ?? [],
      compatMode: 'v2',
    }
  }

  // Legacy fallback
  const publicClaim = policy.publicClaim ?? []
  return {
    disputeId: policy.disputeId,
    state: policy.state,
    claimAtoms: synthesizeLegacyAtoms(publicClaim, policy.disputeId),
    privateKnowledge: policy.privateKnowledge ?? [],
    suppressions: policy.suppressions ?? [],
    emotionalLeakRisk: policy.emotionalLeakRisk ?? 'none',
    tellPool: policy.tellPool ?? [],
    compatMode: 'legacy',
    legacyPublicClaim: publicClaim,
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// V3 유틸
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const STATE_RANK_ATOM: Record<string, number> = {
  S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5,
}
