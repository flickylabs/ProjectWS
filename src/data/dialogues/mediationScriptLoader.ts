import type { DialogueEntry } from '../../types'
import { getRuntimeScriptLocale } from '../../i18n/scriptLocale.ts'
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

const mediationIndex = new Map<string, MediationScriptBundle>()
const mediationLoaders = new Map<string, () => Promise<MediationModule>>()
const mediationLocaleLoaders = new Map<string, () => Promise<MediationModule>>()
const mediationLoaderPriority = new Map<string, number>()

for (const [path, loader] of Object.entries(mediationMods)) {
  const localePath = parseLocalePath(path)
  const key = localePath.key
  if (key) {
    if (localePath.locale) {
      registerMediationLoader(mediationLocaleLoaders, key, loader, localePath.locale)
    } else {
      mediationLoaders.set(key, loader)
    }
    const versioned = key.match(/^(.+)-v(\d+)-(\d+)$/)
    if (versioned) {
      const aliasKey = `${versioned[1]}-${versioned[3]}`
      const priority = Number(versioned[2])
      if ((mediationLoaderPriority.get(aliasKey) ?? -1) <= priority) {
        if (localePath.locale) {
          registerMediationLoader(mediationLocaleLoaders, aliasKey, loader, localePath.locale)
        } else {
          mediationLoaders.set(aliasKey, loader)
        }
        mediationLoaderPriority.set(aliasKey, priority)
      }
    }
  }
}

export async function loadMediationScript(caseId: string): Promise<MediationScriptBundle | null> {
  const key = normalizeCaseKey(caseId)
  const locale = getRuntimeScriptLocale()
  const cacheKey = `${key}:${locale}`
  const cached = mediationIndex.get(cacheKey)
  if (cached) return cached

  const loader = mediationLoaders.get(key)
  if (!loader) return null

  const bundle = extractBundle(await loader())
  if (!bundle) return null
  const localeLoader = locale === 'ko' ? null : mediationLocaleLoaders.get(`${key}:${locale}`)
  const overlay = localeLoader ? extractBundle(await localeLoader()) : null
  const localizedBundle = overlay ? mergeMediationBundle(bundle, overlay) : bundle

  mediationIndex.set(cacheKey, localizedBundle)
  mediationIndex.set(`${normalizeCaseKey(bundle.caseId)}:${locale}`, localizedBundle)
  return localizedBundle
}

function parseLocalePath(path: string): { key: string; locale: string | null } {
  const filename = path.split('/').pop()?.replace(/\.json$/i, '') ?? ''
  const match = filename.match(/^(.*)\.(en|ja|zh-CN)$/i)
  if (!match) return { key: normalizeCaseKey(filename), locale: null }
  const locale = match[2].toLowerCase() === 'zh-cn' ? 'zh-CN' : match[2].toLowerCase()
  return { key: normalizeCaseKey(match[1]), locale }
}

function registerMediationLoader(
  registry: Map<string, () => Promise<MediationModule>>,
  key: string,
  loader: () => Promise<MediationModule>,
  locale: string,
): void {
  registry.set(`${key}:${locale}`, loader)
}

function mergeMediationBundle(base: MediationScriptBundle, overlay: Partial<MediationScriptBundle>): MediationScriptBundle {
  const merged = cloneJson(base)
  const overlayPaths = overlay.paths ?? {}
  for (const [pathId, overlayPath] of Object.entries(overlayPaths) as Array<[string, Partial<MediationPathScript>]>) {
    const targetPath = merged.paths[pathId as MediationPathId]
    if (!targetPath) continue
    if (hasText(overlayPath.judge)) targetPath.judge = overlayPath.judge
    const overlayDialogues = overlayPath.dialogues ?? []
    for (let index = 0; index < overlayDialogues.length; index += 1) {
      const overlayLine = overlayDialogues[index]
      const targetLine = targetPath.dialogues[index]
      if (!targetLine) continue
      if (hasText(overlayLine.text)) targetLine.text = overlayLine.text
      if (hasText(overlayLine.behaviorHint)) targetLine.behaviorHint = overlayLine.behaviorHint
    }
  }
  return merged
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}
