import { getCachedDisclosurePolicy, type DisclosurePolicy } from './disclosurePolicyLoader'
import type {
  DisclosureCaseId,
  DisclosureChannelType,
  DisclosureGuardMode,
  GuardContext,
  GuardResult,
} from '../types/disclosure'

const STORAGE_KEY = 'solomon-disclosure-guard-mode'
const VALID_MODES: DisclosureGuardMode[] = ['off', 'log', 'sanitize', 'block']
const EARLY_LIE_STATES = new Set(['S0', 'S1', 'S2'])

type LexemeRule = {
  label: string
  channels?: DisclosureChannelType[]
  matcher?: (text: string, context: GuardContext) => boolean
}

const PARAPHRASE_RULES: Record<DisclosureCaseId, LexemeRule[]> = {
  'spouse-01': [
    { label: '어린 친척' },
    { label: '친 가족' },
    { label: '혈육' },
    { label: '친 혈육' },
    { label: '가족의 한 사람' },
    { label: '돌봐 드' },
    { label: '생필품을 사다' },
    { label: '가족을 돕는' },
    { label: '빚 대신' },
    { label: '따로 모은 돈' },
    { label: '몰래 마련한 돈' },
    { label: '가족을 돕는 일이 급' },
  ],
  'family-01': [
    { label: '유서를 손댄' },
    { label: '유서를 고친' },
    { label: '유서를 바꾼' },
    { label: '자필 연습본을 고친' },
    { label: '문서를 손으로 고친' },
    { label: '자기 몫을 줄' },
    { label: '공장 자금' },
    { label: '20년 동안 매달 보낸' },
    { label: '20년 간 송금' },
    {
      label: '어머니 통장으로 정기적으로 돈을 보내(신|시는|고|며|었|던)?',
      matcher: (text) => /어머니\s*통장으로\s*정기적으로\s*돈을\s*보내(신|시는|고|며|었|던)?/.test(text),
    },
    { label: '어머니 통장으로 꾸준히 돈을 넣었습니다' },
    { label: '정기적이라고 불러도 될 만큼 보낸' },
    { label: '장기 송금' },
    { label: '혈연이 다른' },
    { label: '친생자' },
    { label: '친자 관계' },
    { label: '출생에 관한 사실' },
    { label: '60대 40' },
    { label: '60대40' },
    { label: '40 대 60' },
    { label: '4 대 6' },
    { label: '제 형 쪽 생활이 그렇게 이어진 정황' },
  ],
  'friend-01': [
    { label: '선을 넘는 메시지' },
    { label: '선을 넘은 말' },
    { label: '선을 넘은 메시지' },
    { label: '선 넘는 메시지' },
    {
      label: '다은이 아버지가 ~ 가져간',
      matcher: (text) => /다은이\s*아버지가[\s\S]{0,40}가져간/.test(text),
    },
    {
      label: '송다은 씨 아버지가 ~ 가져간',
      matcher: (text) => /송다은\s*씨\s*아버지가[\s\S]{0,40}가져간/.test(text),
    },
    {
      label: '뜯',
      matcher: (text) => /뜯/.test(text) && /(아버지|돈|예비신랑|가져간|갈취|사기)/.test(text),
    },
    { label: '다은이 아버지가 예비신랑에게 돈 이야기를 꺼낸' },
    { label: '송다은 씨 아버지가 예비신랑에게 돈 이야기를 꺼낸' },
    { label: '거절했다는', channels: ['judge_question', 'judge_contradiction', 'judge_evidence_combo', 'judge_witness_summon', 'system_message', 'dossier', 'evidence_discovery'] },
    { label: '거절한 사실', channels: ['judge_question', 'judge_contradiction', 'judge_evidence_combo', 'judge_witness_summon', 'system_message', 'dossier', 'evidence_discovery'] },
    { label: '같은 패턴 반복' },
    { label: '같은 방식으로 돈 얘기' },
    { label: '다은이 아버지가 제 돈을 가져간 게 맞습니다' },
  ],
}

export function getDisclosureGuardMode(): DisclosureGuardMode {
  const urlMode = readModeFromUrl()
  if (urlMode) return urlMode

  const storedMode = readModeFromLocalStorage()
  if (storedMode) return storedMode

  const envMode = normalizeMode(import.meta.env.VITE_DISCLOSURE_GUARD_MODE)
  return envMode ?? 'off'
}

export function blockHiddenTruthLexemes(text: string, context: GuardContext): GuardResult {
  const mode = getDisclosureGuardMode()
  if (mode === 'off') return { action: 'pass' }
  if (!text.trim()) return { action: 'pass' }
  if (!shouldScanContext(context)) return { action: 'pass' }

  const policy = getCachedDisclosurePolicy(context.caseId)
  const matched = findMatches(text, buildLexemeRules(policy, context), context)
  if (matched.length === 0) return { action: 'pass' }

  if (mode === 'log') {
    const result: GuardResult = {
      action: 'log',
      reason: 'hidden-truth-lexeme-match',
      matched,
    }
    logGuardResult(result, text, context)
    return result
  }

  if (mode === 'sanitize') {
    const result: GuardResult = {
      action: 'sanitize',
      reason: 'sanitize-mode-stub-hidden-truth-lexeme-match',
      replacement: text,
    }
    logGuardResult(result, text, context, matched)
    return result
  }

  const result: GuardResult = {
    action: 'block',
    reason: 'block-mode-stub-hidden-truth-lexeme-match',
    matched,
  }
  logGuardResult(result, text, context)
  return result
}

function readModeFromUrl(): DisclosureGuardMode | null {
  if (typeof window === 'undefined') return null
  try {
    return normalizeMode(new URLSearchParams(window.location.search).get('guard'))
  } catch {
    return null
  }
}

function readModeFromLocalStorage(): DisclosureGuardMode | null {
  if (typeof window === 'undefined') return null
  try {
    return normalizeMode(window.localStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

function normalizeMode(value: unknown): DisclosureGuardMode | null {
  return typeof value === 'string' && VALID_MODES.includes(value as DisclosureGuardMode)
    ? value as DisclosureGuardMode
    : null
}

function shouldScanContext(context: GuardContext): boolean {
  if (
    context.channel === 'aftermath' ||
    context.channel === 'emotional_overload' ||
    context.channel === 'mediation' ||
    context.channel === 'witness_full'
  ) {
    return false
  }

  if (context.channel === 'interrogation' || context.channel === 'contradiction_pursuit') {
    return !!context.lieState && EARLY_LIE_STATES.has(context.lieState)
  }

  if (context.channel === 'evidence_present') {
    return (context.evidenceState?.investigationStage ?? 0) <= 1
  }

  if (context.channel === 'dossier') {
    return (context.dossierStage ?? 'early') === 'early'
  }

  return (
    context.channel === 'judge_question' ||
    context.channel === 'judge_contradiction' ||
    context.channel === 'judge_evidence_combo' ||
    context.channel === 'judge_witness_summon' ||
    context.channel === 'system_message' ||
    context.channel === 'evidence_discovery'
  )
}

function buildLexemeRules(policy: DisclosurePolicy | null, context: GuardContext): LexemeRule[] {
  const fromPolicy = resolvePolicyLexemes(policy, context).map((label) => ({ label }))
  const fromParaphrase = (PARAPHRASE_RULES[context.caseId] ?? [])
    .filter((rule) => !rule.channels || rule.channels.includes(context.channel))

  const byLabel = new Map<string, LexemeRule>()
  for (const rule of [...fromPolicy, ...fromParaphrase]) {
    if (!rule.label.trim()) continue
    if (!byLabel.has(rule.label)) byLabel.set(rule.label, rule)
  }
  return [...byLabel.values()]
}

function resolvePolicyLexemes(policy: DisclosurePolicy | null, context: GuardContext): string[] {
  const forbidden = policy?.forbiddenLexemes
  if (!forbidden) return []

  const global = forbidden.globalTruthLexemes ?? []
  const resolved: string[] = []

  const surfaceRef = forbidden.surfaceOnlyChannels?.[context.channel]
  if (surfaceRef) resolved.push(...resolveLexemeRef(surfaceRef, global))

  if (
    context.channel === 'interrogation' ||
    context.channel === 'contradiction_pursuit' ||
    context.channel === 'evidence_present'
  ) {
    resolved.push(...resolveNpcLexemes(forbidden.nonConfessionNpcBeforeS5, context, global))
  }

  if (resolved.length === 0 && shouldScanContext(context)) {
    resolved.push(...global)
  }

  return [...new Set(resolved)]
}

function resolveLexemeRef(ref: string | string[], global: string[]): string[] {
  if (Array.isArray(ref)) return ref
  return ref === 'globalTruthLexemes' ? global : [ref]
}

function resolveNpcLexemes(source: unknown, context: GuardContext, global: string[]): string[] {
  if (!source || typeof source !== 'object' || !context.lieState) return []
  const map = source as Record<string, unknown>

  const partyKey = context.party === 'a' ? 'partyA' : context.party === 'b' ? 'partyB' : null
  const partyMap = partyKey && map[partyKey] && typeof map[partyKey] === 'object'
    ? map[partyKey] as Record<string, unknown>
    : null
  const stateRef = partyMap?.[context.lieState] ?? map[context.lieState]

  if (Array.isArray(stateRef)) return stateRef.filter((v): v is string => typeof v === 'string')
  if (typeof stateRef === 'string') return resolveLexemeRef(stateRef, global)
  return []
}

function findMatches(text: string, rules: LexemeRule[], context: GuardContext): string[] {
  const normalizedText = text.replace(/\s+/g, ' ')
  const matched: string[] = []

  for (const rule of rules) {
    if (rule.matcher ? rule.matcher(normalizedText, context) : normalizedText.includes(rule.label)) {
      matched.push(rule.label)
    }
  }

  return [...new Set(matched)]
}

function logGuardResult(result: GuardResult, text: string, context: GuardContext, fallbackMatched?: string[]): void {
  const matched = 'matched' in result ? result.matched : fallbackMatched ?? []
  console.warn('[disclosure-guard]', {
    variant: context.variant ?? 'runtime',
    channel: context.channel,
    lieState: context.lieState,
    matched,
    text,
  })
}
