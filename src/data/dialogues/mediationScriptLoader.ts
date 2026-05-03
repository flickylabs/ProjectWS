import type { DialogueEntry } from '../../types'
import { normalizeCaseKey } from '../../utils/caseHelpers'

export type MediationPathId = 'immediate' | 'conditional' | 'postpone' | 'fact_first'

export interface MediationDialogueLine {
  speaker: DialogueEntry['speaker']
  text: string
  relatedDisputes: string[]
  behaviorHint: string | null
}

export interface MediationPathScript {
  judge: string
  dialogues: MediationDialogueLine[]
}

export interface MediationScriptBundle {
  caseId: string
  paths: Record<MediationPathId, MediationPathScript>
}

type MediationModule = { default?: MediationScriptBundle } | MediationScriptBundle

const mediationMods = import.meta.glob<MediationModule>('./mediation/*.json')

function extractBundle(mod: unknown): MediationScriptBundle | null {
  if (!mod || typeof mod !== 'object') return null
  const candidate = mod as { default?: unknown }
  const data = candidate.default ?? mod
  if (!data || typeof data !== 'object') return null
  const bundle = data as Partial<MediationScriptBundle>
  if (typeof bundle.caseId !== 'string' || !bundle.paths) return null
  return bundle as MediationScriptBundle
}

function keyFromPath(path: string): string {
  const filename = path.split('/').pop()?.replace(/\.json$/i, '') ?? ''
  return normalizeCaseKey(filename)
}

const mediationIndex = new Map<string, MediationScriptBundle>()
const mediationLoaders = new Map<string, () => Promise<MediationModule>>()
const mediationLoaderPriority = new Map<string, number>()

for (const [path, loader] of Object.entries(mediationMods)) {
  const key = keyFromPath(path)
  if (key) {
    mediationLoaders.set(key, loader)
    const versioned = key.match(/^(.+)-v(\d+)-(\d+)$/)
    if (versioned) {
      const aliasKey = `${versioned[1]}-${versioned[3]}`
      const priority = Number(versioned[2])
      if ((mediationLoaderPriority.get(aliasKey) ?? -1) <= priority) {
        mediationLoaders.set(aliasKey, loader)
        mediationLoaderPriority.set(aliasKey, priority)
      }
    }
  }
}

export async function loadMediationScript(caseId: string): Promise<MediationScriptBundle | null> {
  const key = normalizeCaseKey(caseId)
  const cached = mediationIndex.get(key)
  if (cached) return cached

  const loader = mediationLoaders.get(key)
  if (!loader) return null

  const bundle = extractBundle(await loader())
  if (!bundle) return null

  mediationIndex.set(normalizeCaseKey(bundle.caseId), bundle)
  return bundle
}
