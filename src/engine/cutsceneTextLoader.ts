/**
 * Cutscene text loader — Truth-reveal monologue 4-lang resolution.
 *
 * Texts live under src/data/cutsceneText/{caseId}/{disputeId}.json (created
 * by Codex monologue brief threads TR1~TR3). Missing entries fall back to a
 * generic placeholder so the cutscene still plays during development.
 */

import type { LocaleCode } from '../i18n/locales'

type Locale = LocaleCode

interface MonologueEntry {
  ko: string
  en: string
  ja: string
  'zh-CN': string
}

interface SlipPair {
  phase1: MonologueEntry
  phase2: MonologueEntry
  linkedDisputeId?: string
}

interface CutsceneTextFile {
  disputeId: string
  case: string
  confession_trust?: MonologueEntry
  slip_explosive?: SlipPair
  admission_witness_trust?: MonologueEntry
  admission_witness_emotion?: MonologueEntry
  closure_truth?: MonologueEntry
}

const MODULES = import.meta.glob<{ default: CutsceneTextFile }>(
  '../data/cutsceneText/*/*.json',
  { eager: true },
)

const CACHE = new Map<string, CutsceneTextFile>()
for (const path in MODULES) {
  const match = path.match(/cutsceneText\/([^/]+)\/([^/]+)\.json$/)
  if (!match) continue
  const key = `${match[1]}:${match[2]}`
  CACHE.set(key, MODULES[path].default)
}

function pick(entry: MonologueEntry | undefined, locale: Locale): string {
  if (!entry) return ''
  return entry[locale] ?? entry.ko ?? ''
}

export function getConfessionTrust(caseId: string, disputeId: string, locale: Locale): string {
  const file = CACHE.get(`${caseId}:${disputeId}`)
  return pick(file?.confession_trust, locale)
}

export function getSlipPhase1(caseId: string, disputeId: string, locale: Locale): string {
  return pick(CACHE.get(`${caseId}:${disputeId}`)?.slip_explosive?.phase1, locale)
}

export function getSlipPhase2(caseId: string, disputeId: string, locale: Locale): string {
  return pick(CACHE.get(`${caseId}:${disputeId}`)?.slip_explosive?.phase2, locale)
}

export function getSlipLinkedDisputeId(caseId: string, disputeId: string): string | undefined {
  return CACHE.get(`${caseId}:${disputeId}`)?.slip_explosive?.linkedDisputeId
}

export function getAdmissionWitness(
  caseId: string,
  disputeId: string,
  route: 'trust' | 'emotion' | 'witness',
  locale: Locale,
): string {
  const file = CACHE.get(`${caseId}:${disputeId}`)
  // 'witness' 경로 = NPC 감정/신뢰 임계점 전이지만 증인이 결정적 진실 제시 케이스.
  // emotion 경로 텍스트("더는 버틸 수 없습니다")가 강제 인정 톤에 가장 가까워 fallback.
  const entry = route === 'trust' ? file?.admission_witness_trust : file?.admission_witness_emotion
  return pick(entry, locale)
}

export function getClosureTruth(caseId: string, disputeId: string, locale: Locale): string {
  return pick(CACHE.get(`${caseId}:${disputeId}`)?.closure_truth, locale)
}

export function hasCutsceneText(caseId: string, disputeId: string): boolean {
  return CACHE.has(`${caseId}:${disputeId}`)
}
