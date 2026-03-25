import type { PartyId } from './game'

export type Archetype = 'avoidant' | 'confrontational' | 'victim_cosplay' | 'cold_logic'
export type DigitalHabit = 'sns_active' | 'messenger_main' | 'minimal'

export interface VerbalTell {
  type: string
  trigger: 'lying' | 'cornered' | 'emotional' | 'avoiding'
  pattern: string
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
  bias: 'pro_a' | 'pro_b' | 'neutral' | 'self_interest'
  distortionRisk: 'intentional' | 'unconscious' | 'accurate'
}

export type RelationshipType =
  | 'spouse'
  | 'neighbor'
  | 'boss_employee'
  | 'partnership'
  | 'family'
  | 'tenant_landlord'
  | 'friend'

export interface DuoSeed {
  duoId: string
  relationshipType: RelationshipType
  partyA: CharacterProfile
  partyB: CharacterProfile
  relationshipLedger: LedgerEntry[]
  socialGraph: ThirdParty[]
}
