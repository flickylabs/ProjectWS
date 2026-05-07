export const GENERATED_CASE_IDS = ['spouse-01', 'family-01', 'friend-01']

export const GENERATED_CASE_LOCALES = [
  { code: 'en', googleTarget: 'en' },
  { code: 'ja', googleTarget: 'ja' },
  { code: 'zh-CN', googleTarget: 'zh-CN' },
]

export const HANGUL_RE = /[\uac00-\ud7a3]/

const LOCALIZABLE_ROOT_KEYS = new Set([
  'meta',
  'duo',
  'context',
  'disputes',
  'evidence',
  'truthTable',
  'solutions',
  'combinationLab',
  'v3Design',
])

const NON_LOCALIZABLE_ROOT_KEYS = new Set([
  'caseId',
  'locale',
  'overlayKind',
  'overlayScope',
  'sensitivityTags',
  'evidenceCombinations',
  'lieConfigA',
  'lieConfigB',
  'activeLedgerEntries',
  'activeThirdParties',
  'baseEvidenceIds',
  'monetaryDisputeIds',
])

const CONTROL_KEYS = new Set([
  'id',
  'duoId',
  'relationshipType',
  'relationshipState',
  'familyRelation',
  'conflictSeed',
  'variableModules',
  'twistModule',
  'difficulty',
  'contextType',
  'emotionalPressure',
  'affects',
  'archetype',
  'digitalHabit',
  'trigger',
  'type',
  'from',
  'to',
  'source',
  'proves',
  'isTrap',
  'requires',
  'subjectParty',
  'reliability',
  'completeness',
  'provenance',
  'legitimacy',
  'trust',
  'legal',
  'stage',
  'quadrant',
  'ambiguity',
  'weight',
  'currentlyResolved',
  'activeLedgerEntries',
  'activeThirdParties',
  'baseEvidenceIds',
  'monetaryDisputeIds',
  'sensitivityTags',
  'tags',
  'keywords',
  'behaviorHint',
  'lieType',
  'lieMotive',
  'lieIntensity',
  'initialState',
  'collapseViaTrust',
  'requiredLieState',
  'v3Visibility',
  'visibility',
  'hidden',
  'repeatable',
  'cost',
  'inputs',
  'effects',
  'nodeType',
  'kind',
  'route',
  'party',
  'category',
  'slot',
  'bias',
  'distortionRisk',
  'emotionalResidue',
  'connectionToCurrent',
  'relationTo',
])

const CONTROL_BRANCH_KEYS = new Set([
  'unlockCondition',
  'requiredEvidence',
  'sourceRefs',
  'linkedEvidenceIds',
  'baseEvidenceIds',
  'monetaryDisputeIds',
  'activeLedgerEntries',
  'activeThirdParties',
])

export function hasHangul(value) {
  return typeof value === 'string' && HANGUL_RE.test(value)
}

export function shouldTranslateGeneratedCaseString(path, value) {
  if (!hasHangul(value)) return false
  const root = path[0]
  if (NON_LOCALIZABLE_ROOT_KEYS.has(root)) return false
  if (!LOCALIZABLE_ROOT_KEYS.has(root)) return false
  if (path.some((part) => typeof part === 'string' && CONTROL_BRANCH_KEYS.has(part))) return false

  const key = path[path.length - 1]
  if (typeof key === 'string' && isGeneratedCaseControlKey(key)) return false

  return true
}

export function isGeneratedCaseControlKey(key) {
  if (CONTROL_KEYS.has(key)) return true
  if (key === 'caseId' || key === 'locale' || key === 'overlayKind') return true
  return /(?:^|[A-Z])Ids?$/.test(key) || /Id$/.test(key)
}

export function formatGeneratedCasePath(path) {
  return path.map((part) => (typeof part === 'number' ? '[]' : part)).join('.')
}
