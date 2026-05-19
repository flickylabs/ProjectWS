/**
 * Phase 1/2 사전 생성 스크립트 로더.
 * import.meta.glob 대신 명시적 import로 안정적 로드.
 */
import type { DialogueEntry } from '../../types'
import { getRuntimeScriptLocale } from '../../i18n/scriptLocale.ts'
import { normalizeCaseKey } from '../../utils/caseHelpers'
import type { UnsafeAny } from '../../types/lint'


interface PhaseScript {
  caseId: string
  dialogues: {
    speaker: string
    text: string
    relatedDisputes: string[]
    behaviorHint: string | null
  }[]
}

// ── Phase 1 스크립트 명시적 import ──
const p1Mods = import.meta.glob<true, string, unknown>(
  './phase1/*.json',
  { eager: true },
)
const p2Mods = import.meta.glob<true, string, unknown>(
  './phase2/*.json',
  { eager: true },
)

function extractScript(mod: unknown): PhaseScript | null {
  if (!mod || typeof mod !== 'object') return null
  // Vite JSON glob: { default: {...} } 또는 직접 {...}
  const data = (mod as UnsafeAny).default ?? mod
  if (data?.caseId && Array.isArray(data?.dialogues)) return data as PhaseScript
  return null
}

function buildIndex(mods: Record<string, unknown>): Map<string, PhaseScript> {
  const map = new Map<string, PhaseScript>()
  for (const [path, mod] of Object.entries(mods)) {
    if (isLocaleSidecarPath(path)) continue
    const script = extractScript(mod)
    if (script) {
      map.set(normalizeCaseKey(script.caseId), script)
    }
  }
  return map
}

const phase1Index = buildIndex(p1Mods)
const phase2Index = buildIndex(p2Mods)

// 로드 결과 로그
console.log(`[ScriptLoader] Phase 1: ${phase1Index.size} scripts, Phase 2: ${phase2Index.size} scripts`)
if (phase1Index.size === 0) {
  console.warn('[ScriptLoader] ⚠️ Phase 1 스크립트가 0개입니다! glob 결과:', Object.keys(p1Mods).length, '파일')
  // glob 결과 디버그
  for (const [path, mod] of Object.entries(p1Mods)) {
    const data = (mod as UnsafeAny).default ?? mod
    console.log(`  ${path}: caseId=${data?.caseId}, dialogues=${data?.dialogues?.length}`)
    break // 첫 1개만
  }
}

/** Phase 1 스크립트 로드 */
export function loadPhase1Script(caseId: string): Omit<DialogueEntry, 'id'>[] | null {
  const key = normalizeCaseKey(caseId)
  const script = loadLocalizedPhaseScript(phase1Index.get(key), p1Mods, 'phase1', key)
  if (!script) {
    console.warn(`[ScriptLoader] Phase 1 not found: ${caseId}. Available: ${[...phase1Index.keys()].slice(0, 3).join(', ')}...`)
    return null
  }
  return script.dialogues.map((d: UnsafeAny) => ({
    speaker: d.speaker,
    text: d.text ?? '',
    relatedDisputes: d.relatedDisputes ?? [],
    turn: 0,
    behaviorHint: d.behaviorHint ?? undefined,
    // V4 분기 선택지 필드 (있으면 전달)
    ...(d.choiceId ? { choiceId: d.choiceId } : {}),
    ...(d.options ? { options: d.options } : {}),
    ...(d.branchCondition ? { branchCondition: d.branchCondition } : {}),
  }))
}

/** Phase 2 스크립트 로드 */
export function loadPhase2Script(caseId: string): Omit<DialogueEntry, 'id'>[] | null {
  const key = normalizeCaseKey(caseId)
  const script = loadLocalizedPhaseScript(phase2Index.get(key), p2Mods, 'phase2', key)
  if (!script) return null
  return script.dialogues.map((d: UnsafeAny) => ({
    speaker: d.speaker,
    text: d.text ?? '',
    relatedDisputes: d.relatedDisputes ?? [],
    turn: 0,
    behaviorHint: d.behaviorHint ?? undefined,
    ...(d.choiceId ? { choiceId: d.choiceId } : {}),
    ...(d.options ? { options: d.options } : {}),
    ...(d.branchCondition ? { branchCondition: d.branchCondition } : {}),
  }))
}

/** 디버그: 로드된 스크립트 개수 */
export function getScriptCounts(): { phase1: number; phase2: number } {
  return { phase1: phase1Index.size, phase2: phase2Index.size }
}

function loadLocalizedPhaseScript(
  base: PhaseScript | undefined,
  mods: Record<string, unknown>,
  phaseDir: 'phase1' | 'phase2',
  key: string,
): PhaseScript | null {
  if (!base) return null
  const locale = getRuntimeScriptLocale()
  if (locale === 'ko') return base
  const overlay = extractScript(mods[`./${phaseDir}/${key}.${locale}.json`])
  return overlay ? mergePhaseScript(base, overlay) : base
}

function mergePhaseScript(base: PhaseScript, overlay: Partial<PhaseScript>): PhaseScript {
  const merged = cloneJson(base) as UnsafeAny
  const overlayEntries = overlay.dialogues ?? []
  for (let index = 0; index < overlayEntries.length; index += 1) {
    const overlayEntry = overlayEntries[index] as UnsafeAny
    const target = findDialogueTarget(merged.dialogues, overlayEntry.id, index)
    if (!target) continue
    if (hasText(overlayEntry.text)) target.text = overlayEntry.text
    if (hasText(overlayEntry.behaviorHint)) target.behaviorHint = overlayEntry.behaviorHint
    mergeOptions(target.options, overlayEntry.options ?? overlayEntry.choices)
  }
  return merged
}

function findDialogueTarget(entries: UnsafeAny[], id: unknown, index: number): UnsafeAny | null {
  if (typeof id === 'string') {
    const found = entries.find((entry, entryIndex) => (entry.id ?? String(entryIndex)) === id)
    if (found) return found
  }
  return entries[index] ?? null
}

function mergeOptions(targetOptions: UnsafeAny[] | undefined, overlayOptions: UnsafeAny[] | undefined): void {
  if (!Array.isArray(targetOptions) || !Array.isArray(overlayOptions)) return
  const targetById = new Map(targetOptions.map((option, index) => [option.id ?? String(index), option]))
  for (let index = 0; index < overlayOptions.length; index += 1) {
    const overlayOption = overlayOptions[index]
    const target = targetById.get(overlayOption.id ?? String(index))
    if (target && hasText(overlayOption.text)) target.text = overlayOption.text
  }
}

function isLocaleSidecarPath(path: string): boolean {
  return /\.(en|ja|zh-CN)\.json$/i.test(path)
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}
