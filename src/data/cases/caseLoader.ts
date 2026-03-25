/**
 * 사건 로더 v2 — JSON 파일을 동적 import + 캐싱.
 * 번들에 직접 포함하지 않고, 필요할 때 로드.
 */
import type { CaseData, LieConfig } from '../../types'

// Vite의 glob import로 모든 JSON을 lazy 로드 가능하게 등록
const caseModules = import.meta.glob('./generated/*.json', { eager: true }) as Record<string, { default: any }>

// 즉시 로드 + 정규화
const RAW_CASES = Object.values(caseModules).map((m) => m.default)

/** JSON 사건을 CaseData로 정규화 */
function normalizeCaseData(raw: any): CaseData {
  const duo = raw.duo

  if (!duo.partyA.id) duo.partyA.id = 'a'
  if (!duo.partyB.id) duo.partyB.id = 'b'

  duo.partyA.archetype = normalizeArchetype(duo.partyA.archetype)
  duo.partyB.archetype = normalizeArchetype(duo.partyB.archetype)

  duo.partyA.digitalHabit = normalizeDigitalHabit(duo.partyA.digitalHabit)
  duo.partyB.digitalHabit = normalizeDigitalHabit(duo.partyB.digitalHabit)

  for (const vt of duo.partyA.verbalTells) vt.trigger = normalizeTrigger(vt.trigger)
  for (const vt of duo.partyB.verbalTells) vt.trigger = normalizeTrigger(vt.trigger)

  if (!duo.duoId) duo.duoId = `duo-${raw.caseId}`
  if (!duo.relationshipLedger) duo.relationshipLedger = []
  if (!duo.socialGraph) duo.socialGraph = []

  const normTransitions = (configs: any[]): LieConfig[] =>
    configs.map((c: any) => ({
      ...c,
      transitions: (c.transitions ?? []).map((t: any) => ({
        from: t.from,
        to: t.to,
        trigger: normalizeLieTrigger(t.trigger),
      })),
    }))

  const evidence = (raw.evidence ?? []).map((e: any) => ({
    ...e,
    type: normalizeEvidenceType(e.type),
    completeness: normalizeCompleteness(e.completeness),
    provenance: normalizeProvenance(e.provenance),
    investigationResults: e.investigationResults ?? {},
  }))

  return {
    caseId: raw.caseId,
    duo,
    context: raw.context ?? { contextType: 'general', description: '', emotionalPressure: 5, affects: 'both', triggerAmplifier: '' },
    disputes: raw.disputes ?? [],
    evidence,
    evidenceCombinations: raw.evidenceCombinations ?? [],
    truthTable: raw.truthTable ?? [],
    lieConfigA: normTransitions(raw.lieConfigA ?? []),
    lieConfigB: normTransitions(raw.lieConfigB ?? []),
    solutions: raw.solutions ?? {},
    activeLedgerEntries: raw.activeLedgerEntries ?? [],
    activeThirdParties: raw.activeThirdParties ?? [],
  }
}

function normalizeArchetype(a: string): 'avoidant' | 'confrontational' | 'victim_cosplay' | 'cold_logic' {
  const map: Record<string, string> = {
    avoidant: 'avoidant', confrontational: 'confrontational',
    victim_cosplay: 'victim_cosplay', cold_logic: 'cold_logic',
    hyper_responsible: 'cold_logic', martyr: 'victim_cosplay',
    passive: 'avoidant', aggressive: 'confrontational',
    planner: 'cold_logic', improviser: 'confrontational',
    appeaser: 'avoidant', precision_seeker: 'cold_logic',
    territorial: 'cold_logic', fairness_guardian: 'confrontational',
    indirect_expressive: 'avoidant', status_defender: 'confrontational',
  }
  return (map[a] ?? 'avoidant') as any
}

function normalizeDigitalHabit(d: string): 'sns_active' | 'messenger_main' | 'minimal' {
  if (d?.includes('sns') || d?.includes('multiple') || d?.includes('close_friends') || d?.includes('shared_calendar')) return 'sns_active'
  if (d?.includes('messenger') || d?.includes('banking') || d?.includes('calendar') || d?.includes('card') || d?.includes('household') || d?.includes('voice') || d?.includes('work_chat') || d?.includes('admin')) return 'messenger_main'
  return 'minimal'
}

function normalizeTrigger(t: string): 'lying' | 'cornered' | 'emotional' | 'avoiding' {
  const map: Record<string, string> = {
    lying: 'lying', cornered: 'cornered', emotional: 'emotional', avoiding: 'avoiding',
    shame: 'emotional', hurt: 'emotional', defensive: 'avoiding',
  }
  return (map[t] ?? 'lying') as any
}

function normalizeEvidenceType(t: string): string {
  const valid = ['bank', 'chat', 'cctv', 'contract', 'testimony', 'log', 'device', 'sns']
  if (valid.includes(t)) return t
  if (t?.includes('access') || t?.includes('cloud') || t?.includes('email') || t?.includes('document') || t?.includes('institutional') || t?.includes('device_log') || t?.includes('platform') || t?.includes('audio') || t?.includes('photo') || t?.includes('social')) return 'log'
  return 'log'
}

function normalizeCompleteness(c: string): 'original' | 'edited' | 'partial' | 'context_missing' {
  const map: Record<string, string> = {
    original: 'original', edited: 'edited', partial: 'partial',
    context_missing: 'context_missing', cropped: 'partial',
  }
  return (map[c] ?? 'original') as any
}

function normalizeProvenance(p: string): 'self_possessed' | 'third_party' | 'anonymous' | 'institutional' {
  const map: Record<string, string> = {
    self_possessed: 'self_possessed', third_party: 'third_party',
    anonymous: 'anonymous', institutional: 'institutional',
    personal_device: 'self_possessed', household_device: 'self_possessed',
    platform: 'institutional', mixed: 'third_party',
  }
  return (map[p] ?? 'institutional') as any
}

function normalizeLieTrigger(t: string): string {
  if (t.includes('presented') || t.includes('evidence')) return 'hard_evidence'
  if (t.includes('question') && t.includes('timeline')) return 'timeline_question'
  if (t.includes('question') && t.includes('motive')) return 'motive_question'
  if (t.includes('question') && t.includes('provenance')) return 'provenance_question'
  if (t.includes('question') && t.includes('responsibility')) return 'responsibility_question'
  if (t.includes('question') && (t.includes('nonjudg') || t.includes('empathy'))) return 'empathy_question'
  if (t.includes('question')) return 'direct_question'
  if (t.includes('emotion') || t.includes('threshold')) return 'emotion_threshold'
  if (t.includes('reminder') || t.includes('agreement')) return 'direct_question'
  if (t.includes('followup')) return 'motive_question'
  if (t.includes('admission')) return 'direct_question'
  return 'direct_question'
}

/** 모든 생성 사건을 로드 */
export function loadGeneratedCases(): CaseData[] {
  return RAW_CASES.map(normalizeCaseData)
}
