import type { PartyId } from './game'
import type { TruthLevel } from './renewal'

export type Archetype = 'avoidant' | 'confrontational' | 'victim_cosplay' | 'cold_logic' | 'affect_flattening' | 'premature_summary'
export type DigitalHabit = 'sns_active' | 'messenger_main' | 'minimal' | 'banking_app_heavy'

export interface VerbalTell {
  type: string
  trigger: 'lying' | 'cornered' | 'emotional' | 'avoiding' | 'shame' | 'hurt' | 'defensive'
  pattern: string
}

export interface CallTerms {
  toPartner: string    // 상대를 부를 때 ("자기", "오빠", "팀장님", "주연씨" 등)
  toJudge: string      // 재판관에게 상대를 언급할 때 ("제 아내", "옆집 분", "제 팀장" 등)
  angry: string        // 감정이 격해질 때 ("오세린 씨!", "정한결 씨!" 등)
}

export interface CharacterProfile {
  id: PartyId
  name: string
  age: number
  occupation: string
  incomeBracket: 'low' | 'mid' | 'high'
  archetype: Archetype
  speechStyle: string
  pride: number
  fear: string
  riskAppetite: number
  digitalHabit: DigitalHabit
  dailyRoutine: string
  sensitivePoints: string[]
  verbalTells: VerbalTell[]
  callTerms?: CallTerms
}

export type LedgerCategory = 'confirmed' | 'distorted' | 'silenced'

export interface LedgerEntry {
  id: string
  category: LedgerCategory
  description: string
  isReal: boolean
  whoRemembersAccurately: 'a' | 'b' | 'both' | 'neither'
  whoDistorts: 'a' | 'b' | 'both' | 'none'
  distortionDirection: string
  currentlyResolved: 'resolved' | 'unresolved' | 'surface_only'
  emotionalResidue: 'none' | 'mild' | 'strong'
  connectionToCurrent: 'direct' | 'indirect' | 'none'
}

export type ThirdPartySlot = 'family_1' | 'family_2' | 'acquaintance_1' | 'acquaintance_2' | 'institutional'

export interface ThirdParty {
  id: string
  slot: ThirdPartySlot
  name: string
  relationTo: 'a' | 'b' | 'both'
  knowledgeScope: string
  witnessedDirectly: boolean
  bias: 'pro_a' | 'pro_b' | 'neutral' | 'self_interest' | 'anti_a' | 'anti_b' | 'against_both' | 'pro_self'
  distortionRisk: 'intentional' | 'unconscious' | 'accurate' | 'strategic'

  /** 소환 전 플레이어에게 보이는 모호한 힌트 (스포일러 방지) */
  surfaceKnowledge?: string
  /** 이 증인이 관련된 쟁점 ID 목록 (lieState 게이팅에 사용) */
  relatedDisputeIds?: string[]

  /** 증인 상세 프로필 (증인 소환 시 사용) */
  witnessProfile?: {
    age: number
    occupation: string
    /** A와의 관계 설명 (예: "대학 동기, 15년 지기") */
    relationToA: string
    /** B와의 관계 설명 (예: "처음 보는 사이") */
    relationToB: string
    /** A에 대한 감정 (-100~100, 음수=적대, 0=무관심, 양수=호의) */
    sentimentToA: number
    /** B에 대한 감정 */
    sentimentToB: number
    /** 말투 특성 (LLM 프롬프트에 주입) */
    speechStyle: string
    /** 증언 시 재판관에게 쓰는 호칭 */
    addressJudge: string
    /** A를 부르는 호칭 */
    addressA: string
    /** B를 부르는 호칭 */
    addressB: string
    /** 숨기고 싶은 것 (증언의 빈틈) */
    hiddenAgenda?: string
  }

  /** V3: depth별 증인 증언 스크립트 (LLM 대체용) */
  scriptedTestimonies?: {
    /** 소환 직후 — 모호하고 조심스러운 증언 */
    vague: { testimony: string; behaviorHint: string; truthLevel: TruthLevel }
    /** 추가 질문 후 — 핵심 일부 공개 */
    partial: { testimony: string; behaviorHint: string; truthLevel: TruthLevel }
    /** 충분한 압박 후 — 알고 있는 전부 공개 */
    full: { testimony: string; behaviorHint: string; truthLevel: TruthLevel }
  }
}

export type RelationshipType =
  | 'spouse'
  | 'neighbor'
  | 'boss_employee'
  | 'workplace'
  | 'partnership'
  | 'family'
  | 'tenant_landlord'
  | 'tenant'
  | 'friend'

export interface DuoSeed {
  duoId: string
  relationshipType: RelationshipType
  partyA: CharacterProfile
  partyB: CharacterProfile
  relationshipLedger: LedgerEntry[]
  socialGraph: ThirdParty[]
}
