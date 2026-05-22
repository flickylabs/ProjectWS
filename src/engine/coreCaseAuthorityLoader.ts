/**
 * Core Case Authority Runtime Loader
 * ─────────────────────────────────────
 * src/data/coreCases/{caseId}.case.ts (Authority) 모듈을 런타임에 로드하고 캐싱.
 *
 *   - ensureCoreCaseAuthorityLoaded(caseId): async preload (initializeCase에서 호출)
 *   - getCachedCoreCaseAuthority(caseId): sync 액세스 (preload 안 됐으면 null)
 *
 * 헬퍼 (Step 4 engine 마이그레이션):
 *   η  isPartyFieldExposed   — uiExposure.fieldPolicy 게이트 평가
 *   θ  getAnswerFrame        — truthStages[lieState].{a,b}.answerFrame 조회 (LLM inject용)
 *      getAuthorityParaphraseRules — freeInterrogation.paraphraseRules 조회
 *
 * Authority 부재 케이스 (family-01 / friend-01) 는 호출자에서 legacy fallback.
 */

import type {
  CoreCaseAuthority,
  ParaphraseRule,
  UiExposureGate,
  LieState,
  PartyId,
  LocaleCode,
} from '../types/coreCase'

const authorityModules = import.meta.glob<Record<string, unknown>>(
  '../data/coreCases/*.case.ts',
)

const authorityCache = new Map<string, CoreCaseAuthority | null>()
const authorityInFlight = new Map<string, Promise<CoreCaseAuthority | null>>()

function extractAuthority(mod: Record<string, unknown>, caseId: string): CoreCaseAuthority | null {
  // 'spouse-01' → 'spouse01CaseAuthority' (camelCase)
  const camel = caseId
    .replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase())
    .replace(/-/g, '')
  const candidates = [`${camel}CaseAuthority`, 'caseAuthority', 'default']
  for (const name of candidates) {
    const value = mod[name]
    if (value && typeof value === 'object') return value as CoreCaseAuthority
  }
  return null
}

export async function ensureCoreCaseAuthorityLoaded(
  caseId: string,
): Promise<CoreCaseAuthority | null> {
  if (authorityCache.has(caseId)) return authorityCache.get(caseId) ?? null

  const existing = authorityInFlight.get(caseId)
  if (existing) return existing

  const modulePath = `../data/coreCases/${caseId}.case.ts`
  const loader = authorityModules[modulePath]
  if (!loader) {
    authorityCache.set(caseId, null)
    return null
  }

  const inFlight = loader()
    .then((mod) => {
      const authority = extractAuthority(mod, caseId)
      authorityCache.set(caseId, authority)
      authorityInFlight.delete(caseId)
      return authority
    })
    .catch((error) => {
      console.warn('[core-case-authority] load failed', { caseId, error })
      authorityCache.set(caseId, null)
      authorityInFlight.delete(caseId)
      return null
    })

  authorityInFlight.set(caseId, inFlight)
  return inFlight
}

export function getCachedCoreCaseAuthority(caseId: string): CoreCaseAuthority | null {
  return authorityCache.get(caseId) ?? null
}

/* ============================================================================
 * η  uiExposure.fieldPolicy 게이트 평가
 * ========================================================================== */

export interface UiExposureRuntimeContext {
  /** 5턴 이상 진행 */
  advancedTurns: boolean
  /** 감정 phase = shaken | angry | resigned */
  hasShaken: boolean
  /** 1+ dispute lieState = S5 */
  hasAnyCollapse: boolean
  /** 모든 dispute lieState = S5 */
  hasAllCollapse: boolean
  /** 판결 단계 진입 */
  verdictDelivered: boolean
  /** S5 도달한 disputeId set */
  resolvedDisputeIds: Set<string>
}

export interface UiFieldExposureResult {
  exposed: boolean
  lockedHint: string | null
}

/** Authority 부재 시 사용할 기본 정책 — Critical P0 회피 (fear는 hasShaken 만으로 안 보여줌). */
const DEFAULT_FIELD_GATE: Record<string, UiExposureGate> = {
  'partyA.fear': 'after_any_collapse',
  'partyB.fear': 'after_any_collapse',
  'partyA.sensitivePoints': 'after_any_collapse',
  'partyB.sensitivePoints': 'after_any_collapse',
  'partyA.speechStyle': 'after_advanced_turns',
  'partyB.speechStyle': 'after_advanced_turns',
  'partyA.dailyRoutine': 'after_shaken',
  'partyB.dailyRoutine': 'after_shaken',
}

const DEFAULT_LOCKED_HINT: Record<UiExposureGate, string> = {
  always: '',
  after_advanced_turns: '5턴 이상 진행 시 해금',
  after_shaken: '감정 변화 유발 시 해금',
  after_any_collapse: '거짓말 완전 붕괴 시 해금',
  after_all_collapse: '모든 쟁점 진실 확정 시 해금',
  after_dispute_truth: '진실 확정 시 해금',
  after_verdict: '판결 후 공개',
  never: '비공개',
}

export function isPartyFieldExposed(
  caseId: string,
  fieldKey: string,
  ctx: UiExposureRuntimeContext,
  locale: LocaleCode = 'ko',
): UiFieldExposureResult {
  const authority = getCachedCoreCaseAuthority(caseId)
  const policy = authority?.uiExposure?.fieldPolicy?.[fieldKey]
  const gate: UiExposureGate = policy?.gate ?? DEFAULT_FIELD_GATE[fieldKey] ?? 'never'

  let exposed = false
  switch (gate) {
    case 'always':
      exposed = true
      break
    case 'after_advanced_turns':
      exposed = ctx.advancedTurns
      break
    case 'after_shaken':
      exposed = ctx.hasShaken
      break
    case 'after_any_collapse':
      exposed = ctx.hasAnyCollapse
      break
    case 'after_all_collapse':
      exposed = ctx.hasAllCollapse
      break
    case 'after_dispute_truth':
      exposed = policy?.requireDisputeTruth
        ? ctx.resolvedDisputeIds.has(policy.requireDisputeTruth)
        : false
      break
    case 'after_verdict':
      exposed = ctx.verdictDelivered
      break
    case 'never':
      exposed = false
      break
  }

  let lockedHint: string | null = null
  if (policy?.hintLocked) {
    const localized = policy.hintLocked[locale]
    lockedHint = localized ?? policy.hintLocked.ko ?? null
  }
  if (!lockedHint) {
    lockedHint = DEFAULT_LOCKED_HINT[gate] ?? null
  }

  return { exposed, lockedHint }
}

/* ============================================================================
 * paraphraseRules (Authority.freeInterrogation.paraphraseRules) 조회
 * ========================================================================== */

export function getAuthorityParaphraseRules(caseId: string): ParaphraseRule[] | null {
  const authority = getCachedCoreCaseAuthority(caseId)
  if (!authority) return null
  return authority.freeInterrogation.paraphraseRules
}

/* ============================================================================
 * θ  truthStages[lieState].{a,b}.answerFrame 조회 (LLM frame inject)
 * ========================================================================== */

export function getAnswerFrame(
  caseId: string,
  disputeId: string,
  lieState: LieState,
  party: PartyId,
  locale: LocaleCode = 'ko',
): string | null {
  const authority = getCachedCoreCaseAuthority(caseId)
  if (!authority) return null
  const dispute = authority.disputes.find((d) => d.id === disputeId)
  if (!dispute) return null
  const stage = dispute.truthStages[lieState]
  if (!stage) return null
  const partyEntry = party === 'a' ? stage.a : stage.b
  if (!partyEntry?.answerFrame) return null
  const frame = partyEntry.answerFrame
  return frame[locale] ?? frame.ko ?? null
}
