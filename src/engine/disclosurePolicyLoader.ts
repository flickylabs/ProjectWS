import type { DisclosureCaseId } from '../types/disclosure'

type ForbiddenLexemeRef = string | string[]

export type DisclosureForbiddenLexemes = {
  globalTruthLexemes?: string[]
  surfaceOnlyChannels?: Record<string, ForbiddenLexemeRef>
  nonConfessionNpcBeforeS5?: unknown
  allowedSurfaceSubstitutes?: Record<string, string>
}

export type DisclosurePolicy = {
  caseId?: string
  forbiddenLexemes?: DisclosureForbiddenLexemes
}

const policyModules = import.meta.glob<{ default?: DisclosurePolicy }>(
  '../data/disclosurePolicy/*.json',
)

const policyCache = new Map<DisclosureCaseId, DisclosurePolicy | null>()
const policyInFlight = new Map<DisclosureCaseId, Promise<DisclosurePolicy | null>>()

export async function ensureDisclosurePolicyLoaded(caseId: DisclosureCaseId): Promise<DisclosurePolicy | null> {
  if (policyCache.has(caseId)) return policyCache.get(caseId) ?? null

  const existing = policyInFlight.get(caseId)
  if (existing) return existing

  const modulePath = `../data/disclosurePolicy/${caseId}.json`
  const loader = policyModules[modulePath]
  if (!loader) {
    policyCache.set(caseId, null)
    return null
  }

  const inFlight = loader()
    .then((mod) => {
      const policy = ((mod as { default?: DisclosurePolicy }).default ?? mod) as DisclosurePolicy
      policyCache.set(caseId, policy)
      policyInFlight.delete(caseId)
      return policy
    })
    .catch((error) => {
      console.warn('[disclosure-guard] policy load failed', { caseId, error })
      policyCache.set(caseId, null)
      policyInFlight.delete(caseId)
      return null
    })

  policyInFlight.set(caseId, inFlight)
  return inFlight
}

export function getCachedDisclosurePolicy(caseId: DisclosureCaseId): DisclosurePolicy | null {
  return policyCache.get(caseId) ?? null
}
