import {
  FREE_INTERROGATION_QUESTION_CORPUS,
  classifyFreeInterrogationQuestionPolicy,
} from '../src/engine/freeInterrogation/questionPolicy.ts'
import { mapFreeInterrogationContext } from '../src/engine/freeInterrogation/contextMapper.ts'
import {
  buildFreeInterrogationOffTopicRedirect,
  buildFreeInterrogationGameplayHelp,
  buildFreeInterrogationPublicAnswer,
  resolveFreeInterrogationPublicSpeaker,
} from '../src/engine/freeInterrogation/publicInfo.ts'
import { selectFreeInterrogationFallbackText } from '../src/engine/freeInterrogation/fallback.ts'

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

if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2))
  process.exit(1)
}

console.log(`free-interrogation policy corpus ok: ${FREE_INTERROGATION_QUESTION_CORPUS.length} cases`)
