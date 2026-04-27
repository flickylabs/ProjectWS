import { chatCompletion, MODEL_ANALYSIS } from '../llmClient'
import type {
  FreeInterrogationIntent,
  FreeInterrogationIntentId,
  FreeInterrogationRuntimeContext,
} from '../../types/freeInterrogation'

const INTENT_IDS: FreeInterrogationIntentId[] = [
  'fact_pursuit',
  'motive_search',
  'empathy_approach',
  'evidence_query',
  'relation_query',
  'pre_verdict_summary',
  'unmapped',
]

type RuleSpec = {
  intent: FreeInterrogationIntentId
  weight: number
  patterns: RegExp[]
}

const RULES: RuleSpec[] = [
  {
    intent: 'evidence_query',
    weight: 4,
    patterns: [/증거|자료|기록|영수증|문자|카톡|통화|계좌|서류|사진|영상|블랙박스|gps|캡처|원본|스캔|유서/i],
  },
  {
    intent: 'motive_search',
    weight: 4,
    patterns: [/왜|어째서|무슨 이유|이유가|동기|의도|목적|숨겼|말하지|감췄|피했/i],
  },
  {
    intent: 'empathy_approach',
    weight: 4,
    patterns: [/힘들|무서웠|두려웠|억울|상처|괴로웠|미안|후회|심정|마음|기분|괜찮|버거웠/i],
  },
  {
    intent: 'relation_query',
    weight: 3,
    patterns: [/누구|관계|어떻게 알아|아는 사이|사이입니까|호칭|가족|친구|배우자|아버지|어머니|상대방|그 사람/i],
  },
  {
    intent: 'pre_verdict_summary',
    weight: 3,
    patterns: [/정리|요약|결론|판결|마지막|최종|책임|누가 더|그래서|종합하면|정리하자면/i],
  },
  {
    intent: 'fact_pursuit',
    weight: 2,
    patterns: [/언제|어디|그날|당시|정말|맞습니까|했습니까|갔습니까|봤습니까|있었습니까|사실|시점|장소|금액|몇 시/i],
  },
]

const UNMAPPED_PATTERNS = [
  /날씨|점심|저녁|농담|게임 밖|메뉴|노래|영화|주식|뉴스|로또/i,
  /^[ㅋㅎㅠㅜ\s!?.,]+$/,
]

export async function classifyFreeInterrogationIntent(
  rawText: string,
  context: FreeInterrogationRuntimeContext,
  options: { enableLlmFallback?: boolean } = {},
): Promise<FreeInterrogationIntent> {
  const raw = normalizeRawText(rawText)
  const ruleResult = classifyByRules(raw, context)
  if (ruleResult.intent !== 'unmapped' || options.enableLlmFallback === false) {
    return toIntent(raw, ruleResult.intent, ruleResult.confidence)
  }

  const llmResult = await classifyByLlm(raw, context).catch(() => null)
  if (llmResult) {
    return toIntent(raw, llmResult.intent, llmResult.confidence)
  }

  return toIntent(raw, 'unmapped', 0.2)
}

export function classifyFreeInterrogationIntentSync(rawText: string, context: FreeInterrogationRuntimeContext): FreeInterrogationIntent {
  const raw = normalizeRawText(rawText)
  const ruleResult = classifyByRules(raw, context)
  return toIntent(raw, ruleResult.intent, ruleResult.confidence)
}

function classifyByRules(raw: string, context: FreeInterrogationRuntimeContext): { intent: FreeInterrogationIntentId; confidence: number } {
  if (!raw || raw.length < 2) return { intent: 'unmapped', confidence: 0 }
  if (UNMAPPED_PATTERNS.some((pattern) => pattern.test(raw))) return { intent: 'unmapped', confidence: 0.9 }

  const evidenceHit = context.caseData.evidence.some((evidence) => {
    const candidates = [evidence.id, evidence.surfaceName, evidence.name]
      .filter((value): value is string => Boolean(value))
      .map(normalizeToken)
      .filter((value) => value.length >= 2)
    const normalizedRaw = normalizeToken(raw)
    return candidates.some((candidate) => normalizedRaw.includes(candidate))
  })
  if (evidenceHit) return { intent: 'evidence_query', confidence: 0.9 }

  const scored = RULES.map((rule) => {
    const hits = rule.patterns.filter((pattern) => pattern.test(raw)).length
    return { intent: rule.intent, score: hits * rule.weight }
  }).filter((entry) => entry.score > 0)

  if (scored.length === 0) return { intent: 'unmapped', confidence: 0.25 }

  scored.sort((a, b) => b.score - a.score)
  const top = scored[0]
  const second = scored[1]?.score ?? 0
  const confidence = Math.min(0.95, 0.55 + top.score * 0.08 + Math.max(0, top.score - second) * 0.04)

  return { intent: top.intent, confidence }
}

async function classifyByLlm(
  raw: string,
  context: FreeInterrogationRuntimeContext,
): Promise<{ intent: FreeInterrogationIntentId; confidence: number } | null> {
  const disputes = context.caseData.disputes.map((dispute) => `${dispute.id}: ${dispute.name}`).join('\n')
  const unlockedEvidence = context.caseData.evidence
    .filter((evidence) => context.evidenceStates[evidence.id]?.unlocked)
    .map((evidence) => `${evidence.id}: ${evidence.surfaceName ?? evidence.name}`)
    .join('\n') || '(none)'

  const response = await chatCompletion([
    {
      role: 'system',
      content: [
        'Classify a Korean courtroom free interrogation input into one intent.',
        `Allowed intents: ${INTENT_IDS.join(', ')}`,
        'Return JSON only: {"intent":"...","confidence":0.0}',
        'Use unmapped for off-topic, nonsensical, or game-irrelevant input.',
      ].join('\n'),
    },
    {
      role: 'user',
      content: [
        `question: ${raw}`,
        `caseId: ${context.caseId}`,
        `target: ${context.target ?? 'null'}`,
        `activeDisputeId: ${context.activeDisputeId ?? 'null'}`,
        'disputes:',
        disputes,
        'unlockedEvidence:',
        unlockedEvidence,
      ].join('\n'),
    },
  ], { temperature: 0.1, maxTokens: 120, model: MODEL_ANALYSIS })

  const jsonMatch = response.match(/\{[\s\S]*\}/)
  if (!jsonMatch) return null
  const parsed = JSON.parse(jsonMatch[0]) as { intent?: string; confidence?: number }
  if (!INTENT_IDS.includes(parsed.intent as FreeInterrogationIntentId)) return null

  return {
    intent: parsed.intent as FreeInterrogationIntentId,
    confidence: clampConfidence(parsed.confidence),
  }
}

function toIntent(raw: string, intent: FreeInterrogationIntentId, confidence: number): FreeInterrogationIntent {
  return {
    intent,
    confidence: clampConfidence(confidence),
    mapped: {
      target: null,
      disputeId: null,
      interrogationType: null,
      evidenceRef: null,
    },
    raw,
  }
}

function normalizeRawText(rawText: string): string {
  return rawText.trim().replace(/\s+/g, ' ').slice(0, 100)
}

function normalizeToken(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '')
}

function clampConfidence(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.max(0, Math.min(1, value))
    : 0.5
}
