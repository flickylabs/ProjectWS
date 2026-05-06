/**
 * 증인 다층 증언 시스템 타입
 * 각 증인은 여러 "증언 주제"를 가지며, 주제별로 깊이 단계가 있다.
 * 게임 상태(lieState, 쟁점 visibility)에 따라 분기한다.
 */

export interface TestimonySlot {
  /** 고유 ID (예: "w-1-visit-freq") */
  id: string
  /** 증인 ID */
  witnessId: string
  /** 주제 라벨 (UI에 표시) */
  topic: string
  /** 재판관이 묻는 질문 */
  question: string
  /** 깊이 단계 (1=표면, 2=심층, 3=핵심) */
  depth: 1 | 2 | 3
  /** 증인 답변 */
  testimony: string
  /** LLM 톤 힌트 */
  behaviorHint?: string

  /** 활성화 조건 — 모두 충족해야 이 슬롯 노출 */
  conditions?: {
    /** 특정 쟁점의 상태 조건 */
    disputeState?: {
      id: string
      visibility?: 'hidden' | 'emerged' | 'any'
      minLieState?: string  // 'S0'~'S5'
    }
    /** 이전에 특정 슬롯을 들었어야 함 */
    prevSlotRequired?: string
    /** 이전 선택 슬롯이 이것이었어야 함 */
    prevChoiceRequired?: string
  }

  /** 증언 효과 */
  effect: {
    /** 누구에게 유/불리 */
    favorDirection: 'pro_a' | 'pro_b' | 'neutral' | 'mixed'
    /** 관련 쟁점 */
    relatedDisputes: string[]
    /** 이 증언으로 Hidden 쟁점 발현 트리거 */
    emergenceTrigger?: string
    /** lieState 전이 시도 */
    lieStateNudge?: { party: 'a' | 'b'; dispute: string }
    /** 감정 변화 */
    emotionDelta?: number
  }
}

/** 증인별 증언 슬롯 맵 */
export type WitnessTestimonyMap = Record<string, TestimonySlot[]>
