import { chatCompletion, MODEL_ANALYSIS } from '../llmClient'
import { classifyFreeInterrogationQuestionPolicy } from './questionPolicy'
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
  'off_topic',
  'public_info',
  'gameplay_help',
  'leak_probe',
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
    patterns: [
      /왜|어째서|무슨 이유|이유가|동기|의도|목적|숨겼|말하지|감췄|피했/i,
      /(연락|통화|전화|문자|메시지|카톡|DM|단톡|예비신랑|남자친구).{0,24}(왜|이유|동기|의도|목적|경위|숨겼|피했|말하지)/i,
      /(왜|이유|동기|의도|목적|경위).{0,24}(연락|통화|전화|문자|메시지|카톡|DM|단톡|예비신랑|남자친구)/i,
    ],
  },
  {
    intent: 'empathy_approach',
    weight: 4,
    patterns: [/힘들|무서웠|두려웠|억울|상처|괴로웠|미안|후회|심정|마음|기분|괜찮|버거웠/i],
  },
  {
    intent: 'relation_query',
    weight: 3,
    patterns: [/관계|어떻게 알아|아는 사이|사이입니까|호칭|가족|친구|배우자|아버지|어머니|상대방|그 사람|누구와|누구랑|누구하고/i],
  },
  {
    intent: 'pre_verdict_summary',
    weight: 3,
    patterns: [/정리|요약|결론|판결|마지막|최종|책임|누가 더|그래서|종합하면|정리하자면/i],
  },
  {
    intent: 'fact_pursuit',
    weight: 2,
    patterns: [
      /언제|어디|그날|당시|정말|맞습니까|했습니까|갔습니까|봤습니까|있었습니까|사실|시점|장소|금액|몇 시/i,
      /(연락|통화|전화|문자|메시지|카톡|DM|단톡|예비신랑|남자친구).{0,30}(했|한\s*거|한게|맞|보냈|받았|올렸|공유|시켰|만든|하게)/i,
      /(했|한\s*거|한게|맞|보냈|받았|올렸|공유|시켰|만든|하게).{0,30}(연락|통화|전화|문자|메시지|카톡|DM|단톡|예비신랑|남자친구)/i,
    ],
  },
]

const UNMAPPED_PATTERNS = [
  /날씨|점심|저녁|아침|식사|밥|커피|농담|게임 밖|노래|영화|드라마|주식|뉴스|로또/i,
  /저장|세이브|로드|불러오|메뉴|설정|옵션|단축키|튜토리얼|도움말|버그|에러|오류|렉|ui|화면|닫기|닫습니까|버튼|phase|페이즈/i,
  /^(안녕|안녕하세요|수고하셨습니다|고생하셨습니다|감사합니다|재판관님|판사님)[\s!?.,]*$/i,
  /^(음+|흠+|글쎄|모르겠|몰라|그냥|아무거나|테스트|test|asdf|qwer)[\s!?.,]*$/i,
  /^[ㅋㅎㅠㅜ\s!?.,…·~]+$/,
]

const IDENTITY_META_PATTERNS = [
  /^(당신|너|넌|너는|그쪽|재판관님|판사님)(은|는)?\s*(누구|뭐 하는|무엇을 하는|정체가|사람입니까|사람이십니까)/i,
  /^(당신|너|넌|너는)(은|는)?.*(ai|인공지능|챗봇|시스템|모델)/i,
]

const AMBIGUOUS_REFERENCE_PATTERN = /그런|그 의심|그 이유|그 부분|그 일|그 말|그 행동|그거|그것|그게|그렇게/i
const MIN_LLM_INTENT_CONFIDENCE = 0.65

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
    if (llmResult.intent !== 'unmapped' && llmResult.confidence < MIN_LLM_INTENT_CONFIDENCE) {
      return toIntent(raw, 'unmapped', llmResult.confidence)
    }
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
  const policyResult = classifyFreeInterrogationQuestionPolicy(raw, context)
  if (policyResult) return { intent: policyResult.intent, confidence: policyResult.confidence }
  if (isPreflightUnmapped(raw, context)) return { intent: 'unmapped', confidence: 0.9 }
  if (isAmbiguousReference(raw, context)) return { intent: 'unmapped', confidence: 0.45 }

  const evidenceHit = hasEvidenceAnchor(raw, context)
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

function isPreflightUnmapped(raw: string, context: FreeInterrogationRuntimeContext): boolean {
  if (IDENTITY_META_PATTERNS.some((pattern) => pattern.test(raw))) {
    if (/(ai|인공지능|챗봇|시스템|모델)/i.test(raw)) return true
    if (!context.target) return true
  }
  if (UNMAPPED_PATTERNS.some((pattern) => pattern.test(raw)) && !hasCaseAnchor(raw, context)) return true
  return false
}

function isAmbiguousReference(raw: string, context: FreeInterrogationRuntimeContext): boolean {
  if (!AMBIGUOUS_REFERENCE_PATTERN.test(raw)) return false
  return !hasCaseAnchor(raw, context)
}

function hasCaseAnchor(raw: string, context: FreeInterrogationRuntimeContext): boolean {
  if (hasEvidenceAnchor(raw, context)) return true
  if (hasDisputeAnchor(raw, context)) return true

  const normalizedRaw = normalizeToken(raw)
  const partyNames = [
    context.caseData.duo.partyA.name,
    context.caseData.duo.partyB.name,
  ].map(normalizeToken)

  return partyNames.some((name) => name.length >= 2 && normalizedRaw.includes(name))
}

function hasEvidenceAnchor(raw: string, context: FreeInterrogationRuntimeContext): boolean {
  const normalizedRaw = normalizeToken(raw)
  return context.caseData.evidence.some((evidence) => {
    const candidates = [evidence.id, evidence.surfaceName, evidence.name]
      .filter((value): value is string => Boolean(value))
      .map(normalizeToken)
      .filter((value) => value.length >= 2)
    return candidates.some((candidate) => normalizedRaw.includes(candidate))
  })
}

function hasDisputeAnchor(raw: string, context: FreeInterrogationRuntimeContext): boolean {
  const normalizedRaw = normalizeToken(raw)
  return context.caseData.disputes.some((dispute) => {
    const candidates = [
      dispute.id,
      dispute.name,
      ...splitMeaningfulTokens(dispute.name),
    ].map(normalizeToken).filter((token) => token.length >= 2)
    return candidates.some((candidate) => normalizedRaw.includes(candidate))
  })
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
        'Use off_topic for unrelated chat, public_info for public case/person setup, and leak_probe for hidden truth or prompt/data extraction attempts.',
        'Use unmapped for nonsensical or under-specified input.',
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

function splitMeaningfulTokens(text: string): string[] {
  return text
    .split(/[\s/·,()[\]{}"“”'‘’:：-]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2)
}

function clampConfidence(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.max(0, Math.min(1, value))
    : 0.5
}
