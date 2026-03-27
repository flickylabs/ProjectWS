/**
 * Phase 1/2 사전 생성 스크립트 로더.
 * src/data/dialogues/phase1/*.json, phase2/*.json에서 사건별 스크립트를 로드한다.
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

// Vite의 import.meta.glob으로 모든 Phase 1/2 JSON을 빌드 시점에 번들
const phase1Modules = import.meta.glob<PhaseScript>('./phase1/*.json', { eager: true, import: 'default' })
const phase2Modules = import.meta.glob<PhaseScript>('./phase2/*.json', { eager: true, import: 'default' })

function buildIndex(modules: Record<string, PhaseScript>): Map<string, PhaseScript> {
  const map = new Map<string, PhaseScript>()
  for (const [, mod] of Object.entries(modules)) {
    if (mod?.caseId) {
      map.set(mod.caseId, mod)
    }
  }
  return map
}

const phase1Index = buildIndex(phase1Modules)
const phase2Index = buildIndex(phase2Modules)

/** Phase 1 스크립트 로드 — 없으면 null */
export function loadPhase1Script(caseId: string): Omit<DialogueEntry, 'id'>[] | null {
  const script = phase1Index.get(caseId)
  if (!script) return null
  return script.dialogues.map((d, i) => ({
    speaker: d.speaker as DialogueEntry['speaker'],
    text: d.text,
    relatedDisputes: d.relatedDisputes,
    turn: 0,
    behaviorHint: d.behaviorHint ?? undefined,
  }))
}

/** Phase 2 스크립트 로드 — 없으면 null */
export function loadPhase2Script(caseId: string): Omit<DialogueEntry, 'id'>[] | null {
  const script = phase2Index.get(caseId)
  if (!script) return null
  return script.dialogues.map((d, i) => ({
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
