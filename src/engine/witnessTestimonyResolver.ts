/**
 * 증인 다층 증언 해석기
 * 게임 상태에 따라 사용 가능한 증언 슬롯을 필터링하고,
 * 플레이어의 선택에 따라 효과를 적용한다.
 */
import type { TestimonySlot } from '../types/witnessTestimony'
import type { PartyId } from '../types'

export interface WitnessSessionState {
  /** 이 증인에게서 들은 슬롯 ID 목록 */
  heardSlots: string[]
  /** 가장 최근에 선택한 슬롯 ID */
  lastChoice: string | null
  /** 소환 횟수 */
  summonCount: number
}

interface GameStateForWitness {
  /** 쟁점별 visibility */
  disputeVisibility: Record<string, { visibility: string }>
  /** 쟁점별 lieState (양쪽 중 높은 쪽) */
  disputeLieState: Record<string, string>
}

/**
 * 현재 게임 상태에서 이 증인에게 물을 수 있는 증언 주제 목록을 반환
 */
export function getAvailableSlots(
  allSlots: TestimonySlot[],
  witnessId: string,
  session: WitnessSessionState,
  gameState: GameStateForWitness,
): TestimonySlot[] {
  const witnessSlots = allSlots.filter(s => s.witnessId === witnessId)

  return witnessSlots.filter(slot => {
    // 이미 들은 건 제외
    if (session.heardSlots.includes(slot.id)) return false

    // 조건 체크
    if (slot.conditions) {
      const c = slot.conditions

      // 쟁점 상태 조건
      if (c.disputeState) {
        const vis = gameState.disputeVisibility[c.disputeState.id]
        const currentVis = vis?.visibility ?? 'visible'

        if (c.disputeState.visibility && c.disputeState.visibility !== 'any') {
          if (currentVis !== c.disputeState.visibility) return false
        }

        if (c.disputeState.minLieState) {
          const currentLie = gameState.disputeLieState[c.disputeState.id] ?? 'S0'
          if (currentLie < c.disputeState.minLieState) return false
        }
      }

      // 선행 슬롯 조건
      if (c.prevSlotRequired && !session.heardSlots.includes(c.prevSlotRequired)) {
        return false
      }

      // 선행 선택 조건
      if (c.prevChoiceRequired && session.lastChoice !== c.prevChoiceRequired) {
        return false
      }
    }

    return true
  })
}

/**
 * 슬롯을 선택했을 때 세션 상태를 업데이트
 */
export function applySlotChoice(
  session: WitnessSessionState,
  slotId: string,
): WitnessSessionState {
  return {
    heardSlots: [...session.heardSlots, slotId],
    lastChoice: slotId,
    summonCount: session.summonCount + 1,
  }
}

/**
 * 초기 세션 상태
 */
export function createWitnessSession(): WitnessSessionState {
  return { heardSlots: [], lastChoice: null, summonCount: 0 }
}

/**
 * 증인에게 남은 증언이 있는지
 */
export function hasMoreTestimony(
  allSlots: TestimonySlot[],
  witnessId: string,
  session: WitnessSessionState,
  gameState: GameStateForWitness,
): boolean {
  return getAvailableSlots(allSlots, witnessId, session, gameState).length > 0
}
