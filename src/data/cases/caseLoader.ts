/**
 * JSON 파일에서 생성된 사건을 CaseData 형식으로 변환하여 로드한다.
 * 생성된 JSON은 스키마가 약간 다를 수 있으므로 정규화 처리를 거친다.
 */
import type { CaseData, LieConfig } from '../../types'

// JSON 파일들을 정적 import (Vite는 JSON import 지원)
import spouse01 from './generated/spouse-01.json'
import spouse02 from './generated/spouse-02.json'
import spouse03 from './generated/spouse-03.json'
import spouse04 from './generated/spouse-04.json'

const RAW_CASES = [spouse01, spouse02, spouse03, spouse04]

/** JSON 사건을 CaseData로 정규화 */
function normalizeCaseData(raw: any): CaseData {
  const duo = raw.duo

  // partyA/B에 id 필드가 없으면 추가
  if (!duo.partyA.id) duo.partyA.id = 'a'
  if (!duo.partyB.id) duo.partyB.id = 'b'

  // archetype 정규화 (생성기가 다른 값을 쓸 수 있음)
  duo.partyA.archetype = normalizeArchetype(duo.partyA.archetype)
  duo.partyB.archetype = normalizeArchetype(duo.partyB.archetype)

  // digitalHabit 정규화
  duo.partyA.digitalHabit = normalizeDigitalHabit(duo.partyA.digitalHabit)
  duo.partyB.digitalHabit = normalizeDigitalHabit(duo.partyB.digitalHabit)

  // verbalTells trigger 정규화
  for (const vt of duo.partyA.verbalTells) vt.trigger = normalizeTrigger(vt.trigger)
  for (const vt of duo.partyB.verbalTells) vt.trigger = normalizeTrigger(vt.trigger)

  // duoId가 없으면 생성
  if (!duo.duoId) duo.duoId = `duo-${raw.caseId}`

  // relationshipLedger, socialGraph가 없으면 빈 배열
  if (!duo.relationshipLedger) duo.relationshipLedger = []
  if (!duo.socialGraph) duo.socialGraph = []

  // lieConfig transitions 트리거 정규화
  const normTransitions = (configs: any[]): LieConfig[] =>
    configs.map((c: any) => ({
      ...c,
      transitions: (c.transitions ?? []).map((t: any) => ({
        from: t.from,
        to: t.to,
        trigger: normalizeLieTrigger(t.trigger),
      })),
    }))

  // evidence type 정규화
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
  }
  return (map[a] ?? 'avoidant') as any
}

function normalizeDigitalHabit(d: string): 'sns_active' | 'messenger_main' | 'minimal' {
  if (d?.includes('sns') || d?.includes('multiple')) return 'sns_active'
  if (d?.includes('messenger') || d?.includes('banking') || d?.includes('calendar')) return 'messenger_main'
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
  if (t?.includes('access') || t?.includes('cloud') || t?.includes('email') || t?.includes('document') || t?.includes('institutional') || t?.includes('device_log')) return 'log'
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
  // 생성기의 구체적 트리거를 엔진이 매칭할 수 있는 범용 트리거로 변환
  if (t.includes('presented') || t.includes('evidence')) return 'hard_evidence'
  if (t.includes('question') && t.includes('timeline')) return 'timeline_question'
  if (t.includes('question') && t.includes('motive')) return 'motive_question'
  if (t.includes('question') && t.includes('provenance')) return 'provenance_question'
  if (t.includes('question') && t.includes('responsibility')) return 'responsibility_question'
  if (t.includes('question') && t.includes('nonjudg')) return 'empathy_question'
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
