/**
 * LinkEdge 런타임 평가 엔진
 * ─────────────────────────────────
 * 매 턴 종료 시 모든 linkEdge의 조건을 검사하고,
 * 만족한 edge의 effect를 적용한다.
 *
 * effect 종류:
 * - supportBonus: 해당 쟁점의 다음 질문 효과 보너스 (미터 배율)
 * - weakenCounterTags: 해당 쟁점의 방어 태그 약화
 * - unlockLayer: 해당 쟁점의 다음 층 해금
 * - retaliationAngleTag: 반격 가능한 angleTag 활성화
 * - grantFlag: 플래그 부여
 */

import type { LieState } from '../types'
import type { DisputeLinkEdge, DepthLayerId } from '../types'
import { getAllLinkEdges, getBeatRuntimeState } from './v2DataLoader'
import { recordResolvedLink } from './phase3LogCollector'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 타입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface LinkEdgeEvalInput {
  caseId: string
  lieStates: Record<string, LieState>
  flags: Set<string>
  activeLayers: Record<string, DepthLayerId>
}

export interface LinkEdgeActivation {
  linkId: string
  edge: DisputeLinkEdge
  effects: string[]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 활성화 추적
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const _activatedLinks: Set<string> = new Set()

export function resetActivatedLinks(): void {
  _activatedLinks.clear()
}

export function isLinkActivated(linkId: string): boolean {
  return _activatedLinks.has(linkId)
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const STATE_RANK: Record<string, number> = {
  S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5,
}

const LAYER_RANK: Record<DepthLayerId, number> = {
  surface: 0, motive: 1, core: 2,
}

/**
 * 매 턴 종료 시 호출하여 모든 linkEdge 조건을 검사.
 * 새로 활성화된 edge의 effect를 반환.
 */
export function evaluateLinkEdges(input: LinkEdgeEvalInput): LinkEdgeActivation[] {
  const edges = getAllLinkEdges(input.caseId)
  const activations: LinkEdgeActivation[] = []

  for (const edge of edges) {
    // 이미 활성화된 건 스킵
    if (_activatedLinks.has(edge.id)) continue

    // 조건 검사
    if (!checkLinkCondition(edge, input)) continue

    // 활성화
    _activatedLinks.add(edge.id)
    const effects = applyLinkEffect(edge, input)
    activations.push({ linkId: edge.id, edge, effects })

    // Phase3 로그 기록
    recordResolvedLink(edge.id)

    console.log(`[V2 LinkEdge] ${edge.id} activated: ${edge.fromDisputeId}→${edge.toDisputeId} (${edge.type})`)
  }

  return activations
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 조건 검사
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function checkLinkCondition(edge: DisputeLinkEdge, input: LinkEdgeEvalInput): boolean {
  const when = edge.when

  // minState 검사: from 쟁점의 lieState가 minState 이상인지
  if (when.minState) {
    const currentState = input.lieStates[edge.fromDisputeId]
    if (!currentState) return false
    if ((STATE_RANK[currentState] ?? 0) < (STATE_RANK[when.minState] ?? 0)) return false
  }

  // minLayer 검사: from 쟁점의 활성 층이 minLayer 이상인지
  if (when.minLayer) {
    const currentLayer = input.activeLayers[edge.fromDisputeId] ?? 'surface'
    if (LAYER_RANK[currentLayer] < LAYER_RANK[when.minLayer]) return false
  }

  // disproved 검사 (red_herring용)
  if (when.disproved === true) {
    // misconception M4 도달 여부는 flag로 체크
    if (!input.flags.has(`${edge.fromDisputeId}.red_herring_disproved`)) return false
  }

  // requireFlags 검사
  if (when.requireFlags) {
    for (const flag of when.requireFlags) {
      if (!input.flags.has(flag)) return false
    }
  }

  return true
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 효과 적용
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function applyLinkEffect(edge: DisputeLinkEdge, input: LinkEdgeEvalInput): string[] {
  const effects: string[] = []

  // grantFlag — 가장 기본적인 효과
  if (edge.effect.grantFlag) {
    input.flags.add(edge.effect.grantFlag)
    effects.push(`flag:${edge.effect.grantFlag}`)
  }

  // supportBonus — beat selector에서 to 쟁점의 score에 반영될 수 있음
  if (edge.effect.supportBonus) {
    effects.push(`support:+${edge.effect.supportBonus}→${edge.toDisputeId}`)
  }

  // weakenCounterTags — to 쟁점의 특정 방어 태그 약화
  if (edge.effect.weakenCounterTags?.length) {
    effects.push(`weaken:${edge.effect.weakenCounterTags.join(',')}→${edge.toDisputeId}`)
  }

  // unlockLayer — to 쟁점의 다음 층 해금
  if (edge.effect.unlockLayer) {
    effects.push(`unlock:${edge.effect.unlockLayer}→${edge.toDisputeId}`)
  }

  // retaliationAngleTag — 반격 창 활성화
  if (edge.effect.retaliationAngleTag) {
    effects.push(`retaliation:${edge.effect.retaliationAngleTag}→${edge.toDisputeId}`)
  }

  return effects
}
