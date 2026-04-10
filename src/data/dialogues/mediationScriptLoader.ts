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

interface MediationScriptBundle {
  caseId: string
  paths: Record<MediationPathId, MediationPathScript>
}

const mediationMods = import.meta.glob<true, string, MediationScriptBundle>(
  './mediation/*.json',
  { eager: true },
)

function extractBundle(mod: unknown): MediationScriptBundle | null {
  if (!mod || typeof mod !== 'object') return null
  const data = (mod as any).default ?? mod
  if (!data?.caseId || !data?.paths) return null
  return data as MediationScriptBundle
}

function buildIndex(mods: Record<string, unknown>): Map<string, MediationScriptBundle> {
  const map = new Map<string, MediationScriptBundle>()
  for (const mod of Object.values(mods)) {
    const bundle = extractBundle(mod)
    if (bundle) map.set(normalizeCaseKey(bundle.caseId), bundle)
  }
  return map
}

const mediationIndex = buildIndex(mediationMods)

export function loadMediationScript(caseId: string): MediationScriptBundle | null {
  return mediationIndex.get(normalizeCaseKey(caseId)) ?? null
}
