import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  GENERATED_CASE_IDS,
  GENERATED_CASE_LOCALES,
  hasHangul,
  isGeneratedCaseControlKey,
  shouldTranslateGeneratedCaseString,
  formatGeneratedCasePath,
} from './generated-case-locale-rules.mjs'

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const GENERATED_DIR = path.join(ROOT_DIR, 'src', 'data', 'cases', 'generated')
const MAX_ISSUES_TO_PRINT = 80

const ROOT_SKIP_KEYS = new Set(['caseId', 'locale', 'overlayKind', 'overlayScope'])

const RUNTIME_CONTROL_KEYS = new Set([
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

async function main() {
  const issues = []

  for (const caseId of GENERATED_CASE_IDS) {
    const base = await readJson(path.join(GENERATED_DIR, `${caseId}.json`))
    for (const { code: locale } of GENERATED_CASE_LOCALES) {
      const overlayPath = path.join(GENERATED_DIR, `${caseId}.${locale}.json`)
      const overlay = await readJson(overlayPath)
      collectSidecarHangulIssues(overlay, [path.basename(overlayPath)], issues)

      const merged = cloneJson(base)
      mergeOverlayForValidation(merged, overlay)
      applyEvidenceSurfaceAliases(merged.evidence, overlay.evidence)

      collectMergedPlayerFacingIssues(base, merged, [caseId], issues)
      collectSolutionLabelIssues(base, overlay, caseId, locale, issues)
      collectControlMutationIssues(base, merged, [caseId], issues)
    }
  }

  if (issues.length) {
    console.error(`[case-sidecars] validation failed with ${issues.length} issue(s)`)
    for (const issue of issues.slice(0, MAX_ISSUES_TO_PRINT)) console.error(`- ${issue}`)
    if (issues.length > MAX_ISSUES_TO_PRINT) console.error(`...and ${issues.length - MAX_ISSUES_TO_PRINT} more`)
    process.exitCode = 1
    return
  }

  console.log('[case-sidecars] validation passed')
}

function collectSidecarHangulIssues(value, pathParts, issues) {
  if (typeof value === 'string') {
    if (hasHangul(value)) issues.push(`Hangul remains in sidecar value at ${formatGeneratedCasePath(pathParts)}: ${value.slice(0, 80)}`)
    return
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectSidecarHangulIssues(item, [...pathParts, index], issues))
    return
  }
  if (!value || typeof value !== 'object') return
  for (const [key, child] of Object.entries(value)) {
    collectSidecarHangulIssues(child, [...pathParts, key], issues)
  }
}

function collectMergedPlayerFacingIssues(base, merged, pathParts, issues) {
  if (typeof base === 'string') {
    if (shouldTranslateGeneratedCaseString(pathParts.slice(1), base)) {
      if (hasHangul(merged)) {
        issues.push(`Hangul remains after merge at ${formatGeneratedCasePath(pathParts)}: ${String(merged).slice(0, 80)}`)
      }
    }
    return
  }
  if (Array.isArray(base)) {
    base.forEach((item, index) => collectMergedPlayerFacingIssues(item, merged?.[index], [...pathParts, index], issues))
    return
  }
  if (!base || typeof base !== 'object') return
  for (const [key, child] of Object.entries(base)) {
    collectMergedPlayerFacingIssues(child, merged?.[key], [...pathParts, key], issues)
  }
}

function collectSolutionLabelIssues(base, overlay, caseId, locale, issues) {
  const labels = overlay.solutionCategoryLabels ?? {}
  for (const category of Object.keys(base.solutions ?? {})) {
    if (!hasHangul(category)) continue
    const label = labels[category]
    if (!label) issues.push(`Missing solutionCategoryLabels.${category} for ${caseId}.${locale}`)
    else if (hasHangul(label)) issues.push(`Hangul remains in solutionCategoryLabels.${category} for ${caseId}.${locale}: ${label}`)
  }
}

function collectControlMutationIssues(base, merged, pathParts, issues) {
  if (typeof base !== 'string') {
    if (Array.isArray(base)) {
      base.forEach((item, index) => collectControlMutationIssues(item, merged?.[index], [...pathParts, index], issues))
    } else if (base && typeof base === 'object') {
      for (const [key, child] of Object.entries(base)) {
        collectControlMutationIssues(child, merged?.[key], [...pathParts, key], issues)
      }
    }
    return
  }

  const key = pathParts.at(-1)
  if (typeof key !== 'string') return
  if (!isGeneratedCaseControlKey(key) && !RUNTIME_CONTROL_KEYS.has(key)) return
  if (merged !== base) {
    issues.push(`Control value changed at ${formatGeneratedCasePath(pathParts)}`)
  }
}

function mergeOverlayForValidation(target, source, pathParts = []) {
  if (!target || !source || typeof target !== 'object' || typeof source !== 'object') return
  for (const [key, sourceValue] of Object.entries(source)) {
    if (pathParts.length === 0 && ROOT_SKIP_KEYS.has(key)) continue
    if (shouldSkipRuntimeOverlayKey(key)) continue
    if (sourceValue == null) continue

    const targetValue = target[key]
    if (typeof sourceValue === 'string') {
      if (sourceValue.trim()) target[key] = sourceValue
    } else if (Array.isArray(sourceValue)) {
      if (Array.isArray(targetValue)) mergeOverlayArrayForValidation(targetValue, sourceValue, [...pathParts, key])
    } else if (typeof sourceValue === 'object') {
      if (targetValue && typeof targetValue === 'object' && !Array.isArray(targetValue)) {
        mergeOverlayForValidation(targetValue, sourceValue, [...pathParts, key])
      } else if (key === 'solutionCategoryLabels') {
        target[key] = { ...(target[key] ?? {}), ...sourceValue }
      }
    }
  }
}

function mergeOverlayArrayForValidation(target, source, pathParts) {
  if (source.every((item) => item && typeof item === 'object' && !Array.isArray(item) && typeof item.id === 'string')) {
    const byId = new Map(target.filter((item) => item && typeof item === 'object').map((item) => [item.id, item]))
    for (const sourceItem of source) {
      const targetItem = byId.get(sourceItem.id)
      if (targetItem) mergeOverlayForValidation(targetItem, sourceItem, pathParts)
    }
    return
  }

  for (let index = 0; index < source.length; index += 1) {
    const sourceItem = source[index]
    if (sourceItem == null) continue
    if (typeof sourceItem === 'string') {
      if (sourceItem.trim()) target[index] = sourceItem
    } else if (Array.isArray(sourceItem)) {
      if (Array.isArray(target[index])) mergeOverlayArrayForValidation(target[index], sourceItem, pathParts)
    } else if (typeof sourceItem === 'object' && target[index] && typeof target[index] === 'object') {
      mergeOverlayForValidation(target[index], sourceItem, pathParts)
    }
  }
}

function shouldSkipRuntimeOverlayKey(key) {
  if (RUNTIME_CONTROL_KEYS.has(key)) return true
  return /(?:^|[A-Z])Ids?$/.test(key) || /Id$/.test(key)
}

function applyEvidenceSurfaceAliases(target, source) {
  if (!Array.isArray(target) || !Array.isArray(source)) return
  const byId = new Map(target.map((item) => [item.id, item]))
  for (const sourceItem of source) {
    const targetItem = byId.get(sourceItem.id)
    if (!targetItem) continue
    if (typeof sourceItem.surfaceName === 'string' && sourceItem.surfaceName.trim()) targetItem.name = sourceItem.surfaceName
    if (typeof sourceItem.surfaceDescription === 'string' && sourceItem.surfaceDescription.trim()) targetItem.description = sourceItem.surfaceDescription
  }
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value))
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
