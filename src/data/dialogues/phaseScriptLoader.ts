/**
 * Phase 1/2 사전 생성 스크립트 로더.
 * import.meta.glob 대신 명시적 import로 안정적 로드.
 */
import type { DialogueEntry } from '../../types'

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
const p1Mods = import.meta.glob<true, string, PhaseScript>(
  './phase1/*.json',
  { eager: true },
)
const p2Mods = import.meta.glob<true, string, PhaseScript>(
  './phase2/*.json',
  { eager: true },
)

function extractScript(mod: unknown): PhaseScript | null {
  if (!mod || typeof mod !== 'object') return null
  // Vite JSON glob: { default: {...} } 또는 직접 {...}
  const data = (mod as any).default ?? mod
  if (data?.caseId && Array.isArray(data?.dialogues)) return data as PhaseScript
  return null
}

function buildIndex(mods: Record<string, unknown>): Map<string, PhaseScript> {
  const map = new Map<string, PhaseScript>()
  for (const [_path, mod] of Object.entries(mods)) {
    const script = extractScript(mod)
    if (script) {
      map.set(script.caseId, script)
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
    const data = (mod as any).default ?? mod
    console.log(`  ${path}: caseId=${data?.caseId}, dialogues=${data?.dialogues?.length}`)
    break // 첫 1개만
  }
}

/** Phase 1 스크립트 로드 */
export function loadPhase1Script(caseId: string): Omit<DialogueEntry, 'id'>[] | null {
  const script = phase1Index.get(caseId)
  if (!script) {
    console.warn(`[ScriptLoader] Phase 1 not found: ${caseId}. Available: ${[...phase1Index.keys()].slice(0, 3).join(', ')}...`)
    return null
  }
  return script.dialogues.map((d) => ({
    speaker: d.speaker as DialogueEntry['speaker'],
    text: d.text,
    relatedDisputes: d.relatedDisputes,
    turn: 0,
    behaviorHint: d.behaviorHint ?? undefined,
  }))
}

/** Phase 2 스크립트 로드 */
export function loadPhase2Script(caseId: string): Omit<DialogueEntry, 'id'>[] | null {
  const script = phase2Index.get(caseId)
  if (!script) return null
  return script.dialogues.map((d) => ({
    speaker: d.speaker as DialogueEntry['speaker'],
    text: d.text,
    relatedDisputes: d.relatedDisputes,
    turn: 0,
    behaviorHint: d.behaviorHint ?? undefined,
  }))
}

/** 디버그: 로드된 스크립트 개수 */
export function getScriptCounts(): { phase1: number; phase2: number } {
  return { phase1: phase1Index.size, phase2: phase2Index.size }
}
