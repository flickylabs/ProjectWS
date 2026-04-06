/**
 * ScriptedText 로더.
 * 사전 생성된 NPC 대사 번들을 로드하고,
 * 키 기반으로 적절한 variant를 선택한다.
 * LLM 호출 없이 즉시 응답할 수 있는 "스크립트 우선 경로"의 핵심.
 */
import type {
  ScriptedTextBundle,
  ScriptedVariant,
  ScriptedLieState,
  ScriptedInterrogationQuestionType,
  ScriptedSubjectRole,
  ScriptedWitnessDepth,
  ScriptedLieBand,
} from '../types/scriptedText'
import {
  buildInterrogationKey,
  buildEvidencePresentKey,
  buildDossierKey,
  buildWitnessKey,
  toScriptedLieBand,
} from '../types/scriptedText'
import type { PartyId } from '../types'

// 캐시: caseId → bundle
const bundleCache = new Map<string, ScriptedTextBundle>()

// 최근 사용 스크립트 ID 추적 (반복 방지)
const recentScriptIds = new Map<string, string[]>()  // caseId → 최근 사용 variant IDs

const MAX_RECENT = 20

// Vite dynamic import — 빌드 시 정적 분석됨
const scriptMods = import.meta.glob<true, string, { default?: ScriptedTextBundle }>(
  '../data/scriptedText/*.json',
  { eager: true },
)

/** case bundle load (동기 — eager glob 사용) */
function loadBundle(caseId: string): ScriptedTextBundle | null {
  if (bundleCache.has(caseId)) return bundleCache.get(caseId)!
  const path = `../data/scriptedText/${caseId}.json`
  const mod = scriptMods[path]
  if (!mod) return null
  const bundle = ((mod as any).default ?? mod) as ScriptedTextBundle
  if (bundle.schemaVersion !== 1) return null
  bundleCache.set(caseId, bundle)
  return bundle
}

/** variant 선택: 랜덤 + 최근 사용 배제 */
function selectVariant(variants: ScriptedVariant[], caseId: string): ScriptedVariant | null {
  if (!variants.length) return null
  const recent = recentScriptIds.get(caseId) ?? []
  // 최근 사용하지 않은 variant 우선
  const fresh = variants.filter(v => !recent.includes(v.id))
  const pool = fresh.length > 0 ? fresh : variants
  const selected = pool[Math.floor(Math.random() * pool.length)]
  // 추적 업데이트
  const updated = [...recent, selected.id].slice(-MAX_RECENT)
  recentScriptIds.set(caseId, updated)
  return selected
}

/** 심문 응답 스크립트 조회 */
export function getScriptedInterrogation(
  caseId: string,
  party: PartyId,
  disputeId: string,
  lieState: string,
  questionType: string,
): { text: string; behaviorHint: string } | null {
  const bundle = loadBundle(caseId)
  if (!bundle) return null
  const key = buildInterrogationKey({
    party,
    disputeId,
    lieState: lieState as ScriptedLieState,
    questionType: questionType as ScriptedInterrogationQuestionType,
  })
  const entry = bundle.channels.interrogation.entries.find(e => e.key === key)
  if (!entry) return null
  const variant = selectVariant(entry.variants, caseId)
  if (!variant) return null
  return { text: variant.text, behaviorHint: variant.behaviorHint }
}

/** 증거 제시 응답 스크립트 조회 */
export function getScriptedEvidencePresent(
  caseId: string,
  party: PartyId,
  evidenceId: string,
  lieState: string,
  subjectRole: string,
): { text: string; behaviorHint: string } | null {
  const bundle = loadBundle(caseId)
  if (!bundle) return null
  const lieBand = toScriptedLieBand(lieState as ScriptedLieState)
  const key = buildEvidencePresentKey({
    party,
    evidenceId,
    lieBand,
    subjectRole: subjectRole as ScriptedSubjectRole,
  })
  const entry = bundle.channels.evidence_present.entries.find(e => e.key === key)
  if (!entry) return null
  const variant = selectVariant(entry.variants, caseId)
  if (!variant) return null
  return { text: variant.text, behaviorHint: variant.behaviorHint }
}

/** 도시어 응답 스크립트 조회 */
export function getScriptedDossier(
  caseId: string,
  party: PartyId,
  dossierQuestionId: string,
  lieState: string,
): { text: string; behaviorHint: string } | null {
  const bundle = loadBundle(caseId)
  if (!bundle) return null
  const lieBand = toScriptedLieBand(lieState as ScriptedLieState)
  const key = buildDossierKey({ party, dossierQuestionId, lieBand })
  const entry = bundle.channels.dossier.entries.find(e => e.key === key)
  if (!entry) return null
  const variant = selectVariant(entry.variants, caseId)
  if (!variant) return null
  return { text: variant.text, behaviorHint: variant.behaviorHint }
}

/** 증인 증언 스크립트 조회 */
export function getScriptedWitness(
  caseId: string,
  witnessId: string,
  depth: string,
): { text: string; behaviorHint: string } | null {
  const bundle = loadBundle(caseId)
  if (!bundle) return null
  const key = buildWitnessKey({ witnessId, depth: depth as ScriptedWitnessDepth })
  const entry = bundle.channels.witness.entries.find(e => e.key === key)
  if (!entry) return null
  const variant = selectVariant(entry.variants, caseId)
  if (!variant) return null
  return { text: variant.text, behaviorHint: variant.behaviorHint }
}

/** 후일담 스크립트 조회 */
export function getScriptedAftermath(
  caseId: string,
  resultClass: string,
): { text: string } | null {
  const bundle = loadBundle(caseId)
  if (!bundle) return null
  const entry = bundle.channels.aftermath.entries.find(e => e.key === resultClass)
  if (!entry) return null
  const variant = selectVariant(entry.variants, caseId)
  if (!variant) return null
  return { text: variant.text }
}

/** 번들 존재 여부 체크 (동기) */
export function hasScriptedBundle(caseId: string): boolean {
  if (bundleCache.has(caseId)) return true
  const path = `../data/scriptedText/${caseId}.json`
  return path in scriptMods
}

/** 캐시 클리어 */
export function clearScriptedCache(): void {
  bundleCache.clear()
  recentScriptIds.clear()
}
