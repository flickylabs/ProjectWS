export type LieType = 'LT-1' | 'LT-2' | 'LT-3' | 'LT-4' | 'LT-5' | 'LT-6' | 'LT-7'
export type LieIntensity = 'L1' | 'L2' | 'L3' | 'L4'
export type LieMotive =
  | 'self_protection'
  | 'face_saving'
  | 'third_party_protection'
  | 'revenge'
  | 'shame_avoidance'
  | 'career_preservation'
  | 'relationship_maintenance'

export type LieState = 'S0' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5'

export interface LieStateEntry {
  disputeId: string
  lieType: LieType
  lieIntensity: LieIntensity
  lieMotive: LieMotive
  currentState: LieState
  collapseViaTrust: boolean
}

export type EmotionalPhase = 'defensive' | 'confident' | 'shaken' | 'angry' | 'resigned'

export interface EmotionalState {
  phase: EmotionalPhase
  internalValue: number  // 0~100
  behaviorHint: string
}

export interface TrustState {
  trustTowardJudge: number      // 0~100
  fearOfExposure: number        // 0~100
  retaliationWorry: number      // 0~100
}

export interface AgentState {
  partyId: 'a' | 'b'
  lieStateMap: Record<string, LieStateEntry>
  emotionalState: EmotionalState
  trustState: TrustState
}
