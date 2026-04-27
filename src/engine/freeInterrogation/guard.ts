import { blockHiddenTruthLexemes } from '../disclosureGuard'
import { ensureDisclosurePolicyLoaded, getCachedDisclosurePolicy, type DisclosurePolicy } from '../disclosurePolicyLoader'
import { detectFreeInterrogationHeuristics } from './heuristic'
import { selectFreeInterrogationFallbackText } from './fallback'
import type {
  FreeInterrogationApiSafetyOptions,
  FreeInterrogationGuardContext,
  FreeInterrogationGuardIssue,
  FreeInterrogationGuardMode,
  FreeInterrogationGuardResult,
} from '../../types/freeInterrogationGuard'
import type { GuardContext, GuardResult } from '../../types/disclosure'

const VALID_MODES: FreeInterrogationGuardMode[] = ['off', 'log', 'fallback']
const DEFAULT_TIMEOUT_MS = 5000
const DEFAULT_RETRIES = 1

type LexemeRule = {
  label: string
  dimension: 'hidden_truth_lexeme' | 'paraphrase'
  matcher?: (text: string) => boolean
}

const SUPPLEMENTAL_PARAPHRASE_RULES: Record<FreeInterrogationGuardContext['caseId'], LexemeRule[]> = {
  'spouse-01': [
    { label: '어린 친척', dimension: 'paraphrase' },
    { label: '친 가족', dimension: 'paraphrase' },
    { label: '혈육', dimension: 'paraphrase' },
    { label: '친 혈육', dimension: 'paraphrase' },
    { label: '가족의 한 사람', dimension: 'paraphrase' },
    { label: '돌봐 드', dimension: 'paraphrase' },
    { label: '생필품을 사다', dimension: 'paraphrase' },
    { label: '가족을 돕는', dimension: 'paraphrase' },
    { label: '빚 대신', dimension: 'paraphrase' },
    { label: '따로 모은 돈', dimension: 'paraphrase' },
    { label: '몰래 마련한 돈', dimension: 'paraphrase' },
    { label: '가족을 돕는 일이 급', dimension: 'paraphrase' },
  ],
  'family-01': [
    { label: '유서를 손댄', dimension: 'paraphrase' },
    { label: '유서를 고친', dimension: 'paraphrase' },
    { label: '유서를 바꾼', dimension: 'paraphrase' },
    { label: '원본 유서를 고친', dimension: 'paraphrase' },
    { label: '문서를 손으로 고친', dimension: 'paraphrase' },
    { label: '자기 몫을 줄', dimension: 'paraphrase' },
    { label: '공장 자금', dimension: 'paraphrase' },
    { label: '20년 동안 매달 보낸', dimension: 'paraphrase' },
    { label: '20년 간 송금', dimension: 'paraphrase' },
    {
      label: '어머니 통장으로 정기적으로 돈을 보낸',
      dimension: 'paraphrase',
      matcher: (text) => /어머니\s*통장으로\s*정기적으로\s*돈을\s*보내(신|시는|고|며|었|던)?/.test(text),
    },
    { label: '어머니 통장으로 꾸준히 돈을 넣었습니다', dimension: 'paraphrase' },
    { label: '정기적이라고 불러도 될 만큼 보낸', dimension: 'paraphrase' },
    { label: '장기 송금', dimension: 'paraphrase' },
    { label: '혈연이 다른', dimension: 'paraphrase' },
    { label: '친생자', dimension: 'paraphrase' },
    { label: '친자 관계', dimension: 'paraphrase' },
    { label: '출생에 관한 사실', dimension: 'paraphrase' },
    { label: '60대 40', dimension: 'paraphrase' },
    { label: '60대40', dimension: 'paraphrase' },
    { label: '40 대 60', dimension: 'paraphrase' },
    { label: '4 대 6', dimension: 'paraphrase' },
    { label: '제 형 쪽 생활이 그렇게 이어진 정황', dimension: 'paraphrase' },
  ],
  'friend-01': [
    { label: '선을 넘는 메시지', dimension: 'paraphrase' },
    { label: '선을 넘은 말', dimension: 'paraphrase' },
    { label: '선을 넘은 메시지', dimension: 'paraphrase' },
    { label: '선 넘는 메시지', dimension: 'paraphrase' },
    {
      label: '다은이 아버지가 ~ 가져간',
      dimension: 'paraphrase',
      matcher: (text) => /다은이\s*아버지가[\s\S]{0,40}가져간/.test(text),
    },
    {
      label: '송다은 씨 아버지가 ~ 가져간',
      dimension: 'paraphrase',
      matcher: (text) => /송다은\s*씨\s*아버지가[\s\S]{0,40}가져간/.test(text),
    },
    {
      label: '뜯',
      dimension: 'paraphrase',
      matcher: (text) => /뜯/.test(text) && /(아버지|돈|예비신랑|가져간|갈취|사기)/.test(text),
    },
    { label: '다은이 아버지가 예비신랑에게 돈 이야기를 꺼낸', dimension: 'paraphrase' },
    { label: '송다은 씨 아버지가 예비신랑에게 돈 이야기를 꺼낸', dimension: 'paraphrase' },
    { label: '같은 패턴 반복', dimension: 'paraphrase' },
    { label: '같은 방식으로 돈 얘기', dimension: 'paraphrase' },
    { label: '다은이 아버지가 제 돈을 가져간 게 맞습니다', dimension: 'paraphrase' },
  ],
}

export function getFreeInterrogationGuardMode(): FreeInterrogationGuardMode {
  const envMode = normalizeMode(import.meta.env.VITE_FREE_INTERROGATION_GUARD_MODE)
  return envMode ?? 'fallback'
}

export async function evaluateFreeInterrogationResponse(
  text: string,
  context: FreeInterrogationGuardContext,
): Promise<FreeInterrogationGuardResult> {
  const mode = getFreeInterrogationGuardMode()
  if (mode === 'off') return { action: 'pass', text }

  await ensureDisclosurePolicyLoaded(context.caseId)

  const issues: FreeInterrogationGuardIssue[] = [
    ...mapDisclosureGuardResult(blockHiddenTruthLexemes(text, toDisclosureGuardContext(context))),
    ...detectFreeInterrogationLexemeIssues(text, context),
    ...detectFreeInterrogationHeuristics(text, context),
  ]

  const uniqueIssues = dedupeIssues(issues)
  if (uniqueIssues.length === 0) return { action: 'pass', text }

  if (mode === 'log') {
    const result: FreeInterrogationGuardResult = {
      action: 'log',
      text,
      reason: uniqueIssues.map((issue) => issue.dimension).join(','),
      issues: uniqueIssues,
    }
    console.warn('[free-interrogation-guard]', { context, result })
    return result
  }

  return selectFreeInterrogationFallbackText(
    context,
    uniqueIssues[0]?.dimension ?? 'guard-fallback',
    text,
    uniqueIssues,
  )
}

export async function callFreeInterrogationApiText(
  producer: () => Promise<string>,
  context: FreeInterrogationGuardContext,
  options: FreeInterrogationApiSafetyOptions = {},
): Promise<FreeInterrogationGuardResult> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS
  const retries = options.retries ?? DEFAULT_RETRIES
  const operation = options.operation ?? 'free-interrogation-api'
  let lastIssue: FreeInterrogationGuardIssue | null = null

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const text = await runWithTimeout(producer, timeoutMs)
      if (!text.trim()) {
        lastIssue = {
          dimension: 'empty_response',
          reason: `${operation} returned empty response`,
        }
        continue
      }

      if (options.evaluateResponse === false) {
        return { action: 'pass', text }
      }

      return evaluateFreeInterrogationResponse(text, context)
    } catch (error) {
      const timedOut = error instanceof Error && error.message === 'free-interrogation-timeout'
      lastIssue = {
        dimension: timedOut ? 'api_timeout' : 'api_failure',
        reason: `${operation} ${timedOut ? 'timed out' : 'failed'} on attempt ${attempt + 1}`,
      }
    }
  }

  return selectFreeInterrogationFallbackText(
    context,
    lastIssue?.dimension ?? 'api_failure',
    '',
    lastIssue ? [lastIssue] : [],
  )
}

export function detectFreeInterrogationLexemeIssues(
  text: string,
  context: FreeInterrogationGuardContext,
): FreeInterrogationGuardIssue[] {
  if (!shouldScanLexemes(context)) return []

  const normalizedText = text.replace(/\s+/g, ' ')
  const rules = buildLexemeRules(getCachedDisclosurePolicy(context.caseId), context)
  const matchedByDimension = new Map<FreeInterrogationGuardIssue['dimension'], string[]>()

  for (const rule of rules) {
    const matched = rule.matcher ? rule.matcher(normalizedText) : normalizedText.includes(rule.label)
    if (!matched) continue
    const existing = matchedByDimension.get(rule.dimension) ?? []
    existing.push(rule.label)
    matchedByDimension.set(rule.dimension, existing)
  }

  return [...matchedByDimension.entries()].map(([dimension, matched]) => ({
    dimension,
    reason: `${dimension} matched in early free interrogation response`,
    matched: [...new Set(matched)],
  }))
}

function runWithTimeout<T>(producer: () => Promise<T>, timeoutMs: number): Promise<T> {
  const task = producer()
  task.catch(() => undefined)

  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error('free-interrogation-timeout')), timeoutMs)
    task.then(
      (value) => {
        window.clearTimeout(timer)
        resolve(value)
      },
      (error) => {
        window.clearTimeout(timer)
        reject(error)
      },
    )
  })
}

function normalizeMode(value: unknown): FreeInterrogationGuardMode | null {
  return typeof value === 'string' && VALID_MODES.includes(value as FreeInterrogationGuardMode)
    ? value as FreeInterrogationGuardMode
    : null
}

function toDisclosureGuardContext(context: FreeInterrogationGuardContext): GuardContext {
  return {
    channel: 'interrogation',
    caseId: context.caseId,
    lieState: context.lieState,
    party: context.party,
    disputeId: context.disputeId ?? undefined,
    evidenceState: context.evidenceId ? { evidenceId: context.evidenceId } : undefined,
    variant: context.variant ?? 'free-interrogation',
  }
}

function mapDisclosureGuardResult(result: GuardResult): FreeInterrogationGuardIssue[] {
  if (result.action === 'pass') return []
  if ('matched' in result && result.matched.length > 0) {
    return [{
      dimension: 'hidden_truth_lexeme',
      reason: result.reason,
      matched: result.matched,
    }]
  }
  return [{
    dimension: 'hidden_truth_lexeme',
    reason: result.reason,
  }]
}

function shouldScanLexemes(context: FreeInterrogationGuardContext): boolean {
  return context.lieState === undefined ||
    context.lieState === 'S0' ||
    context.lieState === 'S1' ||
    context.lieState === 'S2'
}

function buildLexemeRules(policy: DisclosurePolicy | null, context: FreeInterrogationGuardContext): LexemeRule[] {
  const policyRules = collectPolicyLexemes(policy, context).map<LexemeRule>((label) => ({
    label,
    dimension: 'hidden_truth_lexeme',
  }))
  const supplementalRules = SUPPLEMENTAL_PARAPHRASE_RULES[context.caseId] ?? []
  const byLabel = new Map<string, LexemeRule>()

  for (const rule of [...policyRules, ...supplementalRules]) {
    if (!rule.label.trim()) continue
    if (!byLabel.has(rule.label)) byLabel.set(rule.label, rule)
  }

  return [...byLabel.values()]
}

function collectPolicyLexemes(policy: DisclosurePolicy | null, context: FreeInterrogationGuardContext): string[] {
  const forbidden = policy?.forbiddenLexemes
  if (!forbidden) return []

  const global = forbidden.globalTruthLexemes ?? []
  const resolved = [...global]
  const partyRules = resolveNpcLexemes(forbidden.nonConfessionNpcBeforeS5, context)
  resolved.push(...partyRules)

  return [...new Set(resolved)]
}

function resolveNpcLexemes(source: unknown, context: FreeInterrogationGuardContext): string[] {
  if (!source || typeof source !== 'object' || !context.lieState) return []
  const map = source as Record<string, unknown>
  const partyKey = context.party === 'a' ? 'partyA' : 'partyB'
  const partyMap = map[partyKey] && typeof map[partyKey] === 'object'
    ? map[partyKey] as Record<string, unknown>
    : null
  const stateRef = partyMap?.[context.lieState] ?? map[context.lieState]
  return Array.isArray(stateRef) ? stateRef.filter((value): value is string => typeof value === 'string') : []
}

function dedupeIssues(issues: FreeInterrogationGuardIssue[]): FreeInterrogationGuardIssue[] {
  const byKey = new Map<string, FreeInterrogationGuardIssue>()
  for (const issue of issues) {
    const key = `${issue.dimension}:${issue.reason}:${issue.matched?.join('|') ?? ''}`
    if (!byKey.has(key)) byKey.set(key, issue)
  }
  return [...byKey.values()]
}
