/**
 * Cutscene Trigger Engine — 게임 상태 변화에서 컷씬 트리거 판정
 * ─────────────────────────────────
 * shouldTriggerCutscene()으로 이벤트 유형과 데이터를 전달하면
 * CutsceneEvent | null을 반환.
 *
 * 쿨다운: 같은 유형은 5턴 이내 재발동 방지.
 */

export interface CutsceneEvent {
  type:
    | 'lie_collapse'
    | 'contradiction_hit'
    | 'emotional_burst'
    | 'dispute_emergence'
    | 'phase_transition'
    | 'verdict_gavel'
  data?: {
    partyName?: string
    disputeName?: string
    statement1?: string // 모순 좌측
    statement2?: string // 모순 우측
    phase?: string
    score?: number
    text?: string // 폭발 대사
  }
}

/** 유형별 자동 dismiss 시간 (ms) */
export const CUTSCENE_DURATION: Record<CutsceneEvent['type'], number> = {
  lie_collapse: 2500,
  contradiction_hit: 3000,
  emotional_burst: 2000,
  dispute_emergence: 2000,
  phase_transition: 2000,
  verdict_gavel: 3000,
}

// ── 쿨다운 추적 ──────────────────────────────────────

const COOLDOWN_TURNS = 5

/** 유형별 마지막 발동 턴 */
const lastTriggeredTurn: Partial<Record<CutsceneEvent['type'], number>> = {}

/** 현재 턴 기준 쿨다운 확인 */
function isOnCooldown(type: CutsceneEvent['type'], currentTurn: number): boolean {
  const last = lastTriggeredTurn[type]
  if (last == null) return false
  return currentTurn - last < COOLDOWN_TURNS
}

/** 쿨다운 기록 갱신 */
function markTriggered(type: CutsceneEvent['type'], currentTurn: number): void {
  lastTriggeredTurn[type] = currentTurn
}

/** 쿨다운 초기화 (새 사건 시작 시 호출) */
export function resetCutsceneCooldowns(): void {
  for (const key of Object.keys(lastTriggeredTurn) as CutsceneEvent['type'][]) {
    delete lastTriggeredTurn[key]
  }
}

// ── 트리거 판정 ──────────────────────────────────────

/**
 * 게임 이벤트에서 컷씬 트리거 여부를 판정한다.
 *
 * @param eventType 게임 이벤트 유형 문자열
 * @param currentTurn 현재 턴 (쿨다운 판정용)
 * @param data 이벤트 부가 데이터
 * @returns 트리거할 CutsceneEvent 또는 null
 */
export function shouldTriggerCutscene(
  eventType: string,
  currentTurn: number,
  data?: Record<string, unknown>,
): CutsceneEvent | null {
  let result: CutsceneEvent | null = null

  switch (eventType) {
    // S5 전이 시
    case 'lie_collapse': {
      const type = 'lie_collapse' as const
      if (isOnCooldown(type, currentTurn)) return null
      result = {
        type,
        data: {
          partyName: data?.partyName as string | undefined,
          disputeName: data?.disputeName as string | undefined,
        },
      }
      break
    }

    // 모순 지적 성공 시
    case 'contradiction_hit': {
      const type = 'contradiction_hit' as const
      if (isOnCooldown(type, currentTurn)) return null
      result = {
        type,
        data: {
          statement1: data?.statement1 as string | undefined,
          statement2: data?.statement2 as string | undefined,
          partyName: data?.partyName as string | undefined,
        },
      }
      break
    }

    // 감정 폭발 이벤트 시
    case 'emotional_burst': {
      const type = 'emotional_burst' as const
      if (isOnCooldown(type, currentTurn)) return null
      result = {
        type,
        data: {
          text: data?.text as string | undefined,
          partyName: data?.partyName as string | undefined,
        },
      }
      break
    }

    // 새 쟁점 발현 시
    case 'dispute_emergence': {
      const type = 'dispute_emergence' as const
      if (isOnCooldown(type, currentTurn)) return null
      result = {
        type,
        data: {
          disputeName: data?.disputeName as string | undefined,
        },
      }
      break
    }

    // Phase 전환 시
    case 'phase_transition': {
      const type = 'phase_transition' as const
      if (isOnCooldown(type, currentTurn)) return null
      result = {
        type,
        data: {
          phase: data?.phase as string | undefined,
        },
      }
      break
    }

    // 최종 판결 시
    case 'verdict_gavel': {
      const type = 'verdict_gavel' as const
      // 판결은 쿨다운 없이 항상 발동
      result = {
        type,
        data: {
          score: data?.score as number | undefined,
        },
      }
      break
    }

    default:
      return null
  }

  if (result) {
    markTriggered(result.type, currentTurn)
  }

  return result
}
