/**
 * 사건 로더 v2 — JSON 파일을 동적 import + 캐싱.
 * 번들에 직접 포함하지 않고, 필요할 때 로드.
 */
import type { CaseData, LieConfig } from '../../types'
import { postposition } from '../../engine/koreanPostposition'
import { getRuntimeScriptLocale } from '../../i18n/scriptLocale.ts'

// Vite의 glob import로 모든 JSON을 lazy 로드 가능하게 등록
const caseModules = import.meta.glob('./generated/*.json', { eager: true }) as Record<string, { default: any }>
const scriptedModules = import.meta.glob('../scriptedText/*.json', { eager: false })

// 정제 완료 목록
import refinedManifest from './refined/manifest.json'
const REFINED_SET = new Set((refinedManifest as { refined: string[] }).refined)
const EXCLUDED_CASE_KEYS = new Set(['neighbor-new-10', 'civic-new-07'])
const SCRIPTED_SET = new Set(
  Object.keys(scriptedModules)
    .map((modulePath) => modulePath.split('/').pop()?.replace('.json', '') ?? '')
    .filter((caseKey) => !!caseKey && !isLocaleSidecarName(caseKey) && !EXCLUDED_CASE_KEYS.has(caseKey)),
)

// 즉시 로드 — 정제 완료된 케이스만 (개발 중에는 USE_REFINED_ONLY를 false로)
const USE_REFINED_ONLY = true
const RAW_CASES = Object.entries(caseModules)
  .filter(([path]) => {
    if (isLocaleSidecarPath(path)) return false
    const fileName = path.split('/').pop()?.replace('.json', '') ?? ''
    if (EXCLUDED_CASE_KEYS.has(fileName)) return false
    if (!SCRIPTED_SET.has(fileName)) return false
    if (!USE_REFINED_ONLY) return true
    return REFINED_SET.has(fileName)
  })
  .map(([, m]) => m.default)

/**
 * 간소화 포맷 감지 (parties/issues 구조 = ChatGPT 대안 스키마).
 * 표준 포맷(duo/disputes)으로 변환 후 정규화에 넘긴다.
 */
function convertAlternateFormat(raw: any): any {
  const pa = raw.parties?.a
  const pb = raw.parties?.b

  // ID 변환 헬퍼: I1→d-1, E1→e-1
  const issueIdMap: Record<string, string> = {}
  const evidenceIdMap: Record<string, string> = {}
  ;(raw.issues ?? []).forEach((iss: any, i: number) => {
    issueIdMap[iss.issueId] = `d-${i + 1}`
  })
  ;(raw.evidence ?? []).forEach((ev: any, i: number) => {
    evidenceIdMap[ev.evidenceId] = `e-${i + 1}`
  })

  const mapIds = (ids: string[], map: Record<string, string>) => ids.map(id => map[id] ?? id)

  // verbalTells: string[] → VerbalTell[]
  const convertTells = (tells: string[]) =>
    (tells ?? []).map((pattern: string, i: number) => ({
      type: `tell_${i}`,
      trigger: i === 0 ? 'lying' : i === 1 ? 'cornered' : 'emotional',
      pattern,
    }))

  // archetype 한글 → 영문 매핑
  const archetypeFromKorean = (a: string): string => {
    if (!a) return 'avoidant'
    if (a.includes('회피') || a.includes('체면')) return 'avoidant'
    if (a.includes('공격') || a.includes('직설') || a.includes('집착')) return 'confrontational'
    if (a.includes('피해') || a.includes('호소') || a.includes('감정')) return 'victim_cosplay'
    if (a.includes('논리') || a.includes('기록') || a.includes('정밀')) return 'cold_logic'
    return 'avoidant'
  }

  // parties → duo
  const duo = {
    duoId: `duo-${raw.caseId}`,
    relationshipType: raw.relationship ?? 'neighbor',
    partyA: {
      id: 'a',
      name: pa?.name ?? 'A',
      age: pa?.age ?? 35,
      occupation: pa?.role ?? '',
      incomeBracket: 'mid',
      archetype: archetypeFromKorean(pa?.archetype ?? ''),
      speechStyle: pa?.verbalTells?.[0] ?? '',
      pride: 5,
      fear: '',
      riskAppetite: 5,
      digitalHabit: 'minimal',
      dailyRoutine: '',
      sensitivePoints: [],
      verbalTells: convertTells(pa?.verbalTells ?? []),
    },
    partyB: {
      id: 'b',
      name: pb?.name ?? 'B',
      age: pb?.age ?? 35,
      occupation: pb?.role ?? '',
      incomeBracket: 'mid',
      archetype: archetypeFromKorean(pb?.archetype ?? ''),
      speechStyle: pb?.verbalTells?.[0] ?? '',
      pride: 5,
      fear: '',
      riskAppetite: 5,
      digitalHabit: 'minimal',
      dailyRoutine: '',
      sensitivePoints: [],
      verbalTells: convertTells(pb?.verbalTells ?? []),
    },
    relationshipLedger: (raw.relationshipLedger ?? []).map((l: any, i: number) => ({
      id: `ledger-${i + 1}`,
      category: l.status === 'confirmed' ? 'confirmed' : l.status === 'distorted' ? 'distorted' : 'silenced',
      description: l.entry ?? '',
      isReal: true,
      whoRemembersAccurately: 'both',
      whoDistorts: l.status === 'distorted' ? 'a' : 'none',
      distortionDirection: '',
      currentlyResolved: 'unresolved',
      emotionalResidue: l.status === 'silenced' ? 'strong' : 'mild',
      connectionToCurrent: 'direct',
    })),
    socialGraph: (raw.socialGraph ?? []).map((sg: any, i: number) => ({
      id: `tp-${i + 1}`,
      slot: i === 0 ? 'institutional' : `acquaintance_${i}`,
      name: sg.name ?? '',
      relationTo: 'both',
      knowledgeScope: sg.connectionToA ?? sg.connectionToB ?? '',
      witnessedDirectly: true,
      bias: 'neutral',
      distortionRisk: 'accurate',
    })),
  }

  // issues → disputes
  const faultA = raw.faultShare?.a ?? 50
  const faultB = raw.faultShare?.b ?? 50
  const disputes = (raw.issues ?? []).map((iss: any, i: number) => ({
    id: issueIdMap[iss.issueId],
    name: iss.statement?.slice(0, 40) ?? `쟁점 ${i + 1}`,
    truth: iss.truth ?? true,
    truthDescription: iss.whyItMatters ?? '',
    quadrant: iss.knowledgeQuadrant ?? 'both_know',
    requiredEvidence: [],
    correctResponsibility: { a: faultA, b: faultB },
    ambiguity: 'low',
    weight: i < 2 ? 'high' : i < 4 ? 'medium' : 'low',
    mediationLink: '',
    legitimacyIssue: false,
  }))

  // evidence 변환
  const evidence = (raw.evidence ?? []).map((ev: any) => ({
    id: evidenceIdMap[ev.evidenceId],
    name: ev.title ?? '',
    description: ev.summary ?? '',
    type: ev.type?.includes('CCTV') ? 'cctv' : ev.type?.includes('사진') ? 'device' : ev.type?.includes('채팅') || ev.type?.includes('단톡') ? 'chat' : 'log',
    reliability: ev.strength === 'hard' ? 'hard' : 'soft',
    completeness: 'original',
    provenance: ev.holder === 'A' || ev.holder === 'B' ? 'self_possessed' : 'third_party',
    legitimacy: ev.legitimacy === 'clean' ? 'lawful' : ev.legitimacy === 'questionable' ? 'privacy_concern' : 'unlawful',
    proves: mapIds(ev.reveals ?? [], issueIdMap),
    isTrap: ev.isTrap ?? false,
    requires: mapIds(ev.requires ?? [], evidenceIdMap),
    investigationResults: {},
  }))

  // lies → lieConfig
  const convertLies = (lies: any[], _party: 'a' | 'b') =>
    (lies ?? []).map((lie: any, _i: number) => {
      const disputeId = issueIdMap[lie.collapseViaEvidence?.[0] ? (raw.evidence ?? []).find((e: any) => e.evidenceId === lie.collapseViaEvidence[0])?.reveals?.[0] : null] ?? disputes[0]?.id ?? 'd-1'
      return {
        disputeId,
        lieType: lie.type ?? 'LT-1',
        lieIntensity: 'medium',
        lieMotive: lie.motive ?? 'self_protection',
        initialState: 'S0',
        collapseViaTrust: lie.collapseViaTrust ?? false,
        transitions: [
          { from: 'S0', to: 'S1', trigger: 'direct_question' },
          { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
          { from: 'S2', to: 'S3', trigger: 'motive_question' },
          { from: 'S3', to: 'S5', trigger: 'hard_evidence' },
          ...(lie.collapseViaTrust ? [{ from: 'S1', to: 'S5', trigger: 'trust_confidential_protection' }] : []),
        ],
      }
    })

  // solutions 변환
  const solutions: Record<string, string[]> = {}
  if (raw.solutionOptions) {
    for (const [_key, val] of Object.entries(raw.solutionOptions as Record<string, any>)) {
      solutions[disputes[0]?.id ?? 'd-1'] = solutions[disputes[0]?.id ?? 'd-1'] ?? []
      solutions[disputes[0]?.id ?? 'd-1'].push(`[${val.label}] ${val.action}`)
    }
  }

  return {
    caseId: raw.caseId,
    duo,
    context: {
      contextType: 'general',
      description: raw.setting ?? raw.summary ?? '',
      emotionalPressure: 6,
      affects: 'both',
      triggerAmplifier: raw.summary?.slice(0, 80) ?? '',
    },
    disputes,
    evidence,
    evidenceCombinations: [],
    truthTable: (raw.issues ?? []).map((iss: any) => ({
      id: `truth-${issueIdMap[iss.issueId]}`,
      fact: iss.statement ?? '',
      isTrue: iss.truth ?? true,
      weight: 1,
      quadrant: iss.knowledgeQuadrant ?? 'both_know',
    })),
    lieConfigA: convertLies(raw.lies?.a ?? [], 'a'),
    lieConfigB: convertLies(raw.lies?.b ?? [], 'b'),
    solutions,
    activeLedgerEntries: (raw.relationshipLedger ?? []).map((_: any, i: number) => `ledger-${i + 1}`),
    activeThirdParties: (raw.socialGraph ?? []).map((_: any, i: number) => `tp-${i + 1}`),
  }
}

/** JSON 사건을 CaseData로 정규화 */
function normalizeCaseData(raw: any): CaseData {
  // 간소화 포맷 감지: parties 필드가 있고 duo가 없으면 변환
  if (raw.parties && !raw.duo) {
    raw = convertAlternateFormat(raw)
  }

  const duo = raw.duo

  if (!duo) {
    console.warn('[caseLoader] normalizeCaseData: duo is missing, caseId=', raw.caseId || raw.meta?.caseId || 'unknown')
    throw new Error('Case data missing duo field')
  }

  // meta.relationshipType → duo.relationshipType 보존
  if (!duo.relationshipType && raw.meta?.relationshipType) {
    duo.relationshipType = raw.meta.relationshipType
  }

  if (!duo.partyA.id) duo.partyA.id = 'a'
  if (!duo.partyB.id) duo.partyB.id = 'b'

  duo.partyA.archetype = normalizeArchetype(duo.partyA.archetype)
  duo.partyB.archetype = normalizeArchetype(duo.partyB.archetype)

  duo.partyA.digitalHabit = normalizeDigitalHabit(duo.partyA.digitalHabit)
  duo.partyB.digitalHabit = normalizeDigitalHabit(duo.partyB.digitalHabit)

  if (!Array.isArray(duo.partyA.verbalTells)) duo.partyA.verbalTells = []
  if (!Array.isArray(duo.partyB.verbalTells)) duo.partyB.verbalTells = []
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

  const result = {
    caseId: raw.caseId,
    meta: raw.meta,
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
    baseEvidenceIds: raw.baseEvidenceIds,
    monetaryDisputeIds: raw.monetaryDisputeIds ?? [],
    combinationLab: raw.combinationLab ?? null,
  }

  // A/B 리터럴 → 실명 치환 (사건 데이터 내 설명 텍스트)
  replaceABWithNames(result)
  return result
}

/** 사건 데이터 내 텍스트에서 'A', 'B' 리터럴을 실명으로 치환 */
function replaceABWithNames(caseData: any) {
  const nameA = caseData.duo?.partyA?.name
  const nameB = caseData.duo?.partyB?.name
  if (!nameA || !nameB) return

  // 조사 헬퍼: 이름 받침 유무에 따라 올바른 조사 선택
  const ppGA = (name: string) => postposition(name, '이', '가')
  const ppNUN = (name: string) => postposition(name, '은', '는')
  const ppRUL = (name: string) => postposition(name, '을', '를')
  const ppGWA = (name: string) => postposition(name, '과', '와')
  const ppDO = (name: string) => postposition(name, '도', '도')

  const sub = (text: string) => {
    if (typeof text !== 'string') return text
    return text
      .replace(/\bA 씨/g, `${nameA} 씨`)
      .replace(/\bB 씨/g, `${nameB} 씨`)
      .replace(/\bA가 /g, `${nameA}${ppGA(nameA)} `)
      .replace(/\bB가 /g, `${nameB}${ppGA(nameB)} `)
      .replace(/\bA의 /g, `${nameA}의 `)
      .replace(/\bB의 /g, `${nameB}의 `)
      .replace(/\bA는 /g, `${nameA}${ppNUN(nameA)} `)
      .replace(/\bB는 /g, `${nameB}${ppNUN(nameB)} `)
      .replace(/\bA를 /g, `${nameA}${ppRUL(nameA)} `)
      .replace(/\bB를 /g, `${nameB}${ppRUL(nameB)} `)
      .replace(/\bA와 /g, `${nameA}${ppGWA(nameA)} `)
      .replace(/\bB와 /g, `${nameB}${ppGWA(nameB)} `)
      .replace(/\bA도 /g, `${nameA}${ppDO(nameA)} `)
      .replace(/\bB도 /g, `${nameB}${ppDO(nameB)} `)
      .replace(/\bA에게/g, `${nameA}에게`)
      .replace(/\bB에게/g, `${nameB}에게`)
      .replace(/\bA 쪽/g, `${nameA} 쪽`)
      .replace(/\bB 쪽/g, `${nameB} 쪽`)
      .replace(/\bA 아버지/g, `${nameA} 아버지`)
      .replace(/\bB 아버지/g, `${nameB} 아버지`)
      .replace(/\bA 사업/g, `${nameA} 사업`)
      .replace(/\bB 사업/g, `${nameB} 사업`)
      .replace(/\bA(?=\s)/g, nameA)
      .replace(/\bB(?=\s)/g, nameB)
  }

  // 식별자 키는 치환 제외
  const SKIP_KEYS = new Set([
    'caseId', 'id', 'duoId', 'disputeId', 'evidenceId', 'witnessId',
    'relationshipType', 'contextType', 'type', 'speaker', 'party',
    'archetype', 'verbalTell', 'digitalHabit', 'key', 'schemaVersion',
  ])

  const walk = (obj: any) => {
    if (!obj || typeof obj !== 'object') return
    for (const key of Object.keys(obj)) {
      if (SKIP_KEYS.has(key)) continue
      if (typeof obj[key] === 'string') {
        obj[key] = sub(obj[key])
      } else if (typeof obj[key] === 'object') {
        walk(obj[key])
      }
    }
  }

  // 전체 객체 순회 (duo 제외 — 이름 원본 보존)
  for (const topKey of Object.keys(caseData)) {
    if (topKey === 'duo' || topKey === 'caseId') continue
    if (typeof caseData[topKey] === 'string') {
      caseData[topKey] = sub(caseData[topKey])
    } else if (typeof caseData[topKey] === 'object') {
      walk(caseData[topKey])
    }
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

function normalizeDigitalHabit(d: string): 'sns_active' | 'messenger_main' | 'minimal' | 'banking_app_heavy' {
  if (d === 'banking_app_heavy') return 'banking_app_heavy'
  if (d?.includes('sns') || d?.includes('multiple') || d?.includes('close_friends') || d?.includes('shared_calendar')) return 'sns_active'
  if (d?.includes('banking') || d?.includes('card') || d?.includes('household')) return 'banking_app_heavy'
  if (d?.includes('messenger') || d?.includes('calendar') || d?.includes('voice') || d?.includes('work_chat') || d?.includes('admin')) return 'messenger_main'
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
  return getRuntimeRawCases().map(normalizeCaseData)
}

/** 사건 메타 정보 (CaseMap용) */
export interface CaseMeta {
  caseId: string
  relationshipType: string
  difficulty: string
  anchorTruth: string
  disputeNames: string[]
}

/** 모든 생성 사건의 메타 정보 반환 */
export function loadCaseMetas(): CaseMeta[] {
  return getRuntimeRawCases().map((raw: any) => ({
    caseId: raw.caseId,
    relationshipType: raw.meta?.relationshipType ?? raw.duo?.relationshipType ?? 'unknown',
    difficulty: raw.meta?.difficulty ?? 'medium',
    anchorTruth: raw.meta?.anchorTruth ?? '',
    disputeNames: (raw.disputes ?? raw.issues ?? []).map((d: any) => d.name ?? d.statement?.slice(0, 40) ?? ''),
  }))
}

function getRuntimeRawCases(): any[] {
  const locale = getRuntimeScriptLocale()
  if (locale === 'ko') return RAW_CASES
  return RAW_CASES.map((raw: any) => {
    const overlay = getGeneratedCaseOverlay(raw.caseId, locale)
    return overlay ? mergeGeneratedCaseSurface(raw, overlay) : raw
  })
}

function getGeneratedCaseOverlay(caseId: string, locale: string): any | null {
  const key = normalizeCaseOverlayKey(caseId)
  const mod = caseModules[`./generated/${key}.${locale}.json`]
  const overlay = (mod as any)?.default ?? mod
  if (!overlay || typeof overlay !== 'object') return null
  return overlay
}

function mergeGeneratedCaseSurface(raw: any, overlay: any): any {
  const merged = cloneJson(raw)
  mergeTextFields(merged.meta, overlay.meta, ['title', 'subtitle', 'summary'])
  mergeTextFields(merged.context, overlay.context, ['description', 'triggerAmplifier'])
  mergeTextFields(merged.duo?.partyA, overlay.duo?.partyA, ['name', 'occupation'])
  mergeTextFields(merged.duo?.partyB, overlay.duo?.partyB, ['name', 'occupation'])
  mergeCollectionFields(merged.disputes, overlay.disputes, ['name', 'surfaceClaim'])
  mergeCollectionFields(merged.evidence, overlay.evidence, ['surfaceName', 'surfaceDescription'])
  return merged
}

function mergeTextFields(target: any, source: any, fields: string[]): void {
  if (!target || !source) return
  for (const field of fields) {
    if (typeof source[field] === 'string' && source[field].trim()) target[field] = source[field]
  }
}

function mergeCollectionFields(target: any[] | undefined, source: any[] | undefined, fields: string[]): void {
  if (!Array.isArray(target) || !Array.isArray(source)) return
  const byId = new Map(target.map((item) => [item.id, item]))
  for (const sourceItem of source) {
    const targetItem = byId.get(sourceItem.id)
    if (!targetItem) continue
    for (const field of fields) {
      if (typeof sourceItem[field] !== 'string' || !sourceItem[field].trim()) continue
      if (field === 'surfaceName') targetItem.name = sourceItem[field]
      else if (field === 'surfaceDescription') targetItem.description = sourceItem[field]
      else targetItem[field] = sourceItem[field]
    }
  }
}

function normalizeCaseOverlayKey(caseId: string): string {
  return caseId.replace(/^case-/, '')
}

function isLocaleSidecarPath(path: string): boolean {
  return /\.(en|ja|zh-CN)\.json$/i.test(path)
}

function isLocaleSidecarName(name: string): boolean {
  return /\.(en|ja|zh-CN)$/i.test(name)
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

/** 원본 JSON에서 특정 증거의 viewerData를 조회 (sessionStorage 복원 시 누락 방어) */
export function getOriginalViewerData(caseId: string, evidenceId: string): Record<string, unknown> | undefined {
  const raw = RAW_CASES.find((r: any) => r.caseId === caseId)
  if (!raw) return undefined
  const ev = (raw.evidence ?? []).find((e: any) => e.id === evidenceId)
  return ev?.viewerData
}

/** 원본 JSON에서 단계별 viewerData 오버라이드를 조회 */
export function getOriginalViewerDataByStage(caseId: string, evidenceId: string): Record<string, Record<string, unknown>> | undefined {
  const raw = RAW_CASES.find((r: any) => r.caseId === caseId)
  if (!raw) return undefined
  const ev = (raw.evidence ?? []).find((e: any) => e.id === evidenceId)
  return ev?.viewerDataByStage
}
