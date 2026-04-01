/**
 * Phase 1→3 브리지 엔진
 * ─────────────────────────────────
 * Phase 1~2 스크립트에서 이미 인정/언급된 사실을 반영하여
 * Phase 3 시작 시 lieState를 자연스럽게 설정한다.
 *
 * 데이터(CaseBridge)는 GPT가 사건별로 생성.
 * 데이터가 없는 사건은 기존 동작(initialState 그대로) 유지.
 */

import type { LieState, LieStateEntry } from '../types'
import type { RuntimeStartBridge, CaseBridge } from '../types'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 브리지 데이터 저장소
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** caseId → CaseBridge */
const bridgeRegistry: Map<string, CaseBridge> = new Map()

/**
 * 브리지 데이터를 등록한다 (케이스 로드 시 호출).
 */
export function registerBridge(bridge: CaseBridge): void {
  bridgeRegistry.set(bridge.caseId, bridge)
}

/**
 * 등록된 브리지 데이터를 조회한다.
 */
export function getBridge(caseId: string): CaseBridge | undefined {
  return bridgeRegistry.get(caseId)
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Phase 3 진입 시 lieStateMap에 브리지를 적용한다.
 * 브리지 데이터가 없으면 원본 그대로 반환.
 */
export function applyBridge(
  caseId: string,
  party: 'a' | 'b',
  lieStateMap: Record<string, LieStateEntry>,
): Record<string, LieStateEntry> {
  const bridge = bridgeRegistry.get(caseId)
  if (!bridge) {
    console.log(`[Bridge] ${caseId}: 브리지 데이터 없음 — 기존 상태 유지`)
    return lieStateMap
  }

  const partyBridge = bridge.bridges.find(b => b.party === party)
  if (!partyBridge) return lieStateMap

  const updated = { ...lieStateMap }

  for (const entry of partyBridge.entries) {
    const existing = updated[entry.disputeId]
    if (!existing) continue

    const currentRank = STATE_RANK[existing.currentState]
    const bridgeRank = STATE_RANK[entry.phase3StartState]

    // 브리지는 상태를 올리기만 함 (이미 더 높으면 유지)
    if (bridgeRank > currentRank) {
      console.log(`[Bridge] ${party}/${entry.disputeId}: ${existing.currentState} → ${entry.phase3StartState}`)
      updated[entry.disputeId] = {
        ...existing,
        currentState: entry.phase3StartState,
      }
    }
  }

  return updated
}

/**
 * 특정 쟁점의 브리지 정보를 조회한다.
 * Phase 3 프롬프트에서 alreadyPubliclyAdmitted를 LLM에게 전달할 때 사용.
 */
export function getBridgeEntry(
  caseId: string,
  party: 'a' | 'b',
  disputeId: string,
): RuntimeStartBridge | undefined {
  const bridge = bridgeRegistry.get(caseId)
  if (!bridge) return undefined

  const partyBridge = bridge.bridges.find(b => b.party === party)
  return partyBridge?.entries.find(e => e.disputeId === disputeId)
}

/**
 * Phase 3 시작 시 플레이어가 이미 알고 있는 정보 목록을 반환한다.
 */
export function getPlayerKnownHooks(caseId: string): string[] {
  const bridge = bridgeRegistry.get(caseId)
  if (!bridge) return []

  const hooks: string[] = []
  for (const partyBridge of bridge.bridges) {
    for (const entry of partyBridge.entries) {
      hooks.push(...entry.playerKnownHooks)
    }
  }
  return [...new Set(hooks)]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const STATE_RANK: Record<LieState, number> = {
  S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5,
}
