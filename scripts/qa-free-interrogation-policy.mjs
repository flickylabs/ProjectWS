import {
  FREE_INTERROGATION_QUESTION_CORPUS,
  classifyFreeInterrogationQuestionPolicy,
} from '../src/engine/freeInterrogation/questionPolicy.ts'
import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { mapFreeInterrogationContext } from '../src/engine/freeInterrogation/contextMapper.ts'
import {
  buildFreeInterrogationOffTopicRedirect,
  buildFreeInterrogationGameplayHelp,
  buildFreeInterrogationPublicAnswer,
  resolveFreeInterrogationPublicSpeaker,
} from '../src/engine/freeInterrogation/publicInfo.ts'
import { selectFreeInterrogationFallbackText } from '../src/engine/freeInterrogation/fallback.ts'

const require = createRequire(import.meta.url)
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const VALID_LOCALES = new Set(['ko', 'en', 'ja', 'zh-CN'])
const SCRIPT_LOCALES = ['en', 'ja', 'zh-CN']
const requestedLocale = parseLocaleArg(process.argv.slice(2))

const context = {
  caseId: 'spouse-01',
  currentPhase: 3,
  target: 'a',
  activeDisputeId: 'd-1',
  agentA: { lieStateMap: { 'd-1': { currentState: 'S0' } } },
  agentB: { lieStateMap: { 'd-1': { currentState: 'S0' } } },
  evidenceStates: {},
  caseData: {
    caseId: 'spouse-01',
    meta: { title: 'sample', relationshipType: 'spouse' },
    context: {
      contextType: 'sample',
      description: '공개 사건 배경',
      emotionalPressure: 0,
      affects: 'both',
      triggerAmplifier: '',
    },
    duo: {
      relationshipType: 'spouse',
      partyA: {
        id: 'a',
        name: '박지훈',
        age: 38,
        occupation: '회사원',
        archetype: 'victim_cosplay',
        verbalTells: [{ type: 'victim_frame', trigger: 'cornered', pattern: '억울함을 앞세운다' }],
        callTerms: { toPartner: '당신', toJudge: '제 배우자', angry: '이지은 씨' },
      },
      partyB: {
        id: 'b',
        name: '이지은',
        age: 36,
        occupation: '프리랜서',
        archetype: 'avoidant',
        verbalTells: [{ type: 'avoidance', trigger: 'avoiding', pattern: '말끝을 흐린다' }],
        callTerms: { toPartner: '당신', toJudge: '제 배우자', angry: '박지훈 씨' },
      },
      relationshipLedger: [],
      socialGraph: [],
    },
    disputes: [{ id: 'd-1', name: '밤 10시 행적' }],
    evidence: [{ id: 'e-1', name: '문자 기록', surfaceName: '문자 기록', proves: ['d-1'] }],
  },
}

const generatedFriendCase = require('../src/data/cases/generated/friend-01.json')

const noCostPolicyIntents = new Set(['off_topic', 'public_info', 'gameplay_help', 'leak_probe'])
const genericOutputBans = ['해당 장소', '관련된 자료', '그런 일', '말씀드릴 수 없습니다', '그렇게 단정할 수 없습니다', '답할 수 있는 범위']
const genericFallbackBans = ['그 질문', '답하기 어렵습니다']
const failures = []

for (const item of FREE_INTERROGATION_QUESTION_CORPUS) {
  const runtimeContext = buildContext(item)
  const result = classifyFreeInterrogationQuestionPolicy(item.text, runtimeContext)
  const resolution = deriveResolution(item, result, runtimeContext)

  if (noCostPolicyIntents.has(item.expectedIntent)) {
    if (!result || result.intent !== item.expectedIntent) {
      failures.push({
        id: item.id,
        expected: item.expectedIntent,
        actual: result?.intent ?? null,
      })
    }
  } else if (result) {
    failures.push({
      id: item.id,
      expected: 'gameplay-flow',
      actual: result.intent,
    })
  }

  if (resolution.route !== item.expectedRoute) {
    failures.push({
      id: item.id,
      expected: item.expectedRoute,
      actual: resolution.route,
    })
  }
  if (resolution.costPolicy !== item.expectedCostPolicy) {
    failures.push({
      id: item.id,
      expected: item.expectedCostPolicy,
      actual: resolution.costPolicy,
    })
  }
  if (resolution.turnPolicy !== item.expectedTurnPolicy) {
    failures.push({
      id: item.id,
      expected: item.expectedTurnPolicy,
      actual: resolution.turnPolicy,
    })
  }
  if (resolution.speaker !== item.expectedSpeaker) {
    failures.push({
      id: item.id,
      expected: item.expectedSpeaker,
      actual: resolution.speaker,
    })
  }

  if (item.expectedRoute === 'public_answer') {
    if (!resolution.text) {
      failures.push({ id: item.id, expected: 'public-answer-text', actual: null })
    }
    if (item.expectedSpeaker === 'system' && /^저는\s/.test(resolution.text ?? '')) {
      failures.push({ id: item.id, expected: 'system-public-answer', actual: resolution.text })
    }
    if (item.expectedSpeaker === 'a' && !item.expectedTextIncludes?.length && !(resolution.text ?? '').includes('저는 박지훈')) {
      failures.push({ id: item.id, expected: 'party-public-answer', actual: resolution.text })
    }
  }

  for (const expectedText of item.expectedTextIncludes ?? []) {
    if (!(resolution.text ?? '').includes(expectedText)) {
      failures.push({
        id: item.id,
        expected: `text includes ${expectedText}`,
        actual: resolution.text,
      })
    }
  }

  for (const forbiddenText of item.expectedTextExcludes ?? []) {
    if ((resolution.text ?? '').includes(forbiddenText)) {
      failures.push({
        id: item.id,
        expected: `text excludes ${forbiddenText}`,
        actual: resolution.text,
      })
    }
  }

  for (const forbiddenText of getNaturalnessBans(item)) {
    if ((resolution.text ?? '').includes(forbiddenText)) {
      failures.push({
        id: item.id,
        expected: `natural text excludes ${forbiddenText}`,
        actual: resolution.text,
      })
    }
  }
}

runTargetSelectionRegression()
runLocalePolicyShapeCheck(requestedLocale)

function buildContext(item) {
  return {
    ...context,
    target: item.target ?? context.target,
  }
}

function getNaturalnessBans(item) {
  const bans = [...genericOutputBans]
  if (item.expectedRoute === 'guard_fallback') bans.push(...genericFallbackBans)
  if (item.expectedRoute === 'public_answer' && item.id.includes('counterpart')) bans.push('상대방')
  return [...new Set(bans)]
}

function deriveResolution(item, policyResult, runtimeContext) {
  const intent = policyResult?.intent ?? item.expectedIntent
  const mapped = mapFreeInterrogationContext({
    intent,
    confidence: policyResult?.confidence ?? 0.9,
    mapped: {
      target: null,
      disputeId: null,
      interrogationType: null,
      evidenceRef: null,
    },
    raw: item.text,
  }, runtimeContext)

  if (mapped.intent === 'off_topic') {
    return {
      route: 'off_topic_redirect',
      costPolicy: 'no_cost',
      turnPolicy: 'no_advance',
      speaker: 'system',
      text: buildFreeInterrogationOffTopicRedirect(),
    }
  }

  if (mapped.intent === 'public_info') {
    return {
      route: 'public_answer',
      costPolicy: 'no_cost',
      turnPolicy: 'no_advance',
      speaker: resolveFreeInterrogationPublicSpeaker(mapped.raw, runtimeContext),
      text: buildFreeInterrogationPublicAnswer(mapped.raw, runtimeContext),
    }
  }

  if (mapped.intent === 'gameplay_help') {
    return {
      route: 'gameplay_help',
      costPolicy: 'no_cost',
      turnPolicy: 'no_advance',
      speaker: 'system',
      text: buildFreeInterrogationGameplayHelp(),
    }
  }

  if (mapped.intent === 'leak_probe') {
    const fallback = selectFreeInterrogationFallbackText({
      caseId: context.caseId,
      party: runtimeContext.target,
      lieState: undefined,
      disputeId: null,
      intent: mapped.intent,
      question: mapped.raw,
      variant: 'free-interrogation-resolution',
    }, 'leak_probe', mapped.raw, [{
      dimension: 'intent_mismatch',
      reason: 'free interrogation mapping is incomplete',
    }])
    return {
      route: 'guard_fallback',
      costPolicy: 'no_cost',
      turnPolicy: 'no_advance',
      speaker: runtimeContext.target,
      text: fallback.text,
    }
  }

  if (mapped.mapped.target && mapped.mapped.disputeId && mapped.mapped.interrogationType) {
    return {
      route: 'case_dispatch',
      costPolicy: 'consume',
      turnPolicy: 'advance',
      speaker: 'dispatch',
      text: null,
    }
  }

  return {
    route: 'mapping_fallback',
    costPolicy: 'no_cost',
    turnPolicy: 'no_advance',
    speaker: runtimeContext.target ?? 'system',
    text: null,
  }
}

function runTargetSelectionRegression() {
  const runtimeContext = {
    ...context,
    caseId: 'friend-01',
    caseData: generatedFriendCase,
    target: 'b',
    activeDisputeId: 'd-4',
    agentA: { lieStateMap: { 'd-4': { currentState: 'S1' } } },
    agentB: { lieStateMap: { 'd-4': { currentState: 'S1' } } },
    evidenceStates: {},
  }
  const mapped = mapFreeInterrogationContext({
    intent: 'motive_search',
    confidence: 0.9,
    mapped: {
      target: null,
      disputeId: null,
      interrogationType: null,
      evidenceRef: null,
    },
    raw: '송다은에게 왜 바로 말하지 못했습니까?',
  }, runtimeContext)

  if (mapped.mapped.target !== 'b') {
    failures.push({
      id: 'target-selection-over-name-object',
      expected: 'b',
      actual: mapped.mapped.target,
    })
  }

  const repairQuestion = '최수민씨, 송다은씨와의 손절한 것을 회복하고 싶은 생각은 없었습니까? 따로 관계 회복을 위해 노력한 적은 없었나요? 지금의 마음은 어떤가요?'
  const repairPolicy = classifyFreeInterrogationQuestionPolicy(repairQuestion, runtimeContext)
  if (repairPolicy) {
    failures.push({
      id: 'relationship-repair-is-not-public-profile',
      expected: null,
      actual: repairPolicy,
    })
  }

  const boyfriendContactQuestion = String.fromCharCode(
    0xadf8, 0xb7fc, 0x20, 0xcd5c, 0xb2e4, 0xc740, 0xc528, 0x20,
    0xb0a8, 0xc790, 0xce5c, 0xad6c, 0xc5d0, 0xac8c, 0x20,
    0xc5f0, 0xb77d, 0xc744, 0x20, 0xd558, 0xac8c, 0x20,
    0xb9de, 0xc9c4, 0x20, 0xd55c, 0xac70, 0xb124, 0xc694, 0x3f,
  )
  const boyfriendContactPolicy = classifyFreeInterrogationQuestionPolicy(boyfriendContactQuestion, runtimeContext)
  if (boyfriendContactPolicy) {
    failures.push({
      id: 'boyfriend-contact-action-is-not-public-profile',
      expected: null,
      actual: boyfriendContactPolicy,
    })
  }

  const boyfriendContactMapped = mapFreeInterrogationContext({
    intent: 'fact_pursuit',
    confidence: 0.79,
    mapped: {
      target: null,
      disputeId: null,
      interrogationType: null,
      evidenceRef: null,
    },
    raw: boyfriendContactQuestion,
  }, runtimeContext)
  if (boyfriendContactMapped.mapped.target !== 'b' || boyfriendContactMapped.mapped.disputeId !== 'd-4') {
    failures.push({
      id: 'boyfriend-contact-action-keeps-selected-target-and-active-dispute',
      expected: { target: 'b', disputeId: 'd-4' },
      actual: boyfriendContactMapped.mapped,
    })
  }

  const publicAnswer = buildFreeInterrogationPublicAnswer(
    '최수민씨, 송다은씨와의 관계를 공개 정보 기준으로 말해 주십시오.',
    runtimeContext,
  )
  if (publicAnswer.includes('저는 송다은') || !publicAnswer.includes('최수민')) {
    failures.push({
      id: 'public-answer-keeps-selected-speaker-persona',
      expected: 'selected target B profile',
      actual: publicAnswer,
    })
  }
}

if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2))
  process.exit(1)
}

console.log(`free-interrogation policy corpus ok: ${FREE_INTERROGATION_QUESTION_CORPUS.length} cases${requestedLocale === 'ko' ? '' : ` locale=${requestedLocale}`}`)

function parseLocaleArg(args) {
  const direct = args.find((arg) => arg.startsWith('--locale='))
  const splitIndex = args.findIndex((arg) => arg === '--locale')
  const raw = direct ? direct.slice('--locale='.length) : splitIndex >= 0 ? args[splitIndex + 1] : 'ko'
  const normalized = raw === 'zh' || raw === 'zh-cn' || raw === 'zh_CN' ? 'zh-CN' : raw
  if (!VALID_LOCALES.has(normalized)) {
    console.error(`Unsupported locale: ${raw}. Expected one of ${[...VALID_LOCALES].join(', ')}`)
    process.exit(1)
  }
  return normalized
}

function runLocalePolicyShapeCheck(locale) {
  if (locale === 'ko') return

  for (const caseId of ['spouse-01', 'family-01', 'friend-01']) {
    const policyPath = path.join(ROOT, 'src', 'data', 'disclosurePolicy', `${caseId}.json`)
    const policy = JSON.parse(fs.readFileSync(policyPath, 'utf8'))
    const localePolicy = policy.localePolicy
    if (!localePolicy || typeof localePolicy !== 'object') {
      failures.push({ id: `locale-policy:${caseId}`, expected: 'localePolicy object', actual: null })
      continue
    }

    for (const field of ['forbiddenLexemes', 'paraphraseLexemes', 'uiSurfaceMap']) {
      const block = localePolicy[field]
      if (!block || typeof block !== 'object') {
        failures.push({ id: `locale-policy:${caseId}:${field}`, expected: 'locale map object', actual: block })
        continue
      }
      for (const scriptLocale of SCRIPT_LOCALES) {
        if (!(scriptLocale in block)) {
          failures.push({ id: `locale-policy:${caseId}:${field}:${scriptLocale}`, expected: 'locale key present', actual: 'missing' })
        }
      }
    }

    const lexemes = localePolicy.forbiddenLexemes?.[locale]
    const paraphrases = localePolicy.paraphraseLexemes?.[locale]
    if (!Array.isArray(lexemes)) {
      failures.push({ id: `locale-policy:${caseId}:forbiddenLexemes:${locale}`, expected: 'array', actual: typeof lexemes })
    }
    if (!Array.isArray(paraphrases)) {
      failures.push({ id: `locale-policy:${caseId}:paraphraseLexemes:${locale}`, expected: 'array', actual: typeof paraphrases })
    }
    if (!localePolicy.uiSurfaceMap || typeof localePolicy.uiSurfaceMap[locale] !== 'object' || Array.isArray(localePolicy.uiSurfaceMap[locale])) {
      failures.push({ id: `locale-policy:${caseId}:uiSurfaceMap:${locale}`, expected: 'object', actual: localePolicy.uiSurfaceMap?.[locale] })
    }
  }
}
