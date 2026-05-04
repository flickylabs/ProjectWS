import type {
  FreeInterrogationFallbackMeta,
  FreeInterrogationFallbackResult,
  FreeInterrogationGuardContext,
  FreeInterrogationGuardIssue,
  FreeInterrogationLieStateBucket,
  FreeInterrogationNpcKey,
  FreeInterrogationNpcProfile,
} from '../../types/freeInterrogationGuard'

type RuntimeFallbackContext = {
  caseId: string
  target: 'a' | 'b' | null
  disputeId: string | null
  intent?: FreeInterrogationGuardContext['intent']
  lieState?: string
  evidenceRef?: string | null
  rawText: string
}

type FallbackInputContext = FreeInterrogationGuardContext | RuntimeFallbackContext

const FALLBACK_MATRIX: Record<FreeInterrogationNpcKey, Record<FreeInterrogationLieStateBucket, string[]>> = {
  'spouse-01:a': {
    S0_S1: [
      '재판관님, 저는 아직 그 대목을 그렇게 받아들이기 어렵습니다. 제가 본 건 의심스러운 흐름뿐입니다.',
      '그 부분은 지금 단정하지 않겠습니다. 저는 제가 불안해진 이유부터 봐 주셨으면 합니다.',
      '저한테는 너무 갑작스러운 말입니다. 아직은 제가 겪은 일 이상으로 말하기 어렵습니다.',
    ],
    S2: [
      '재판관님, 제가 성급했던 건 인정합니다. 다만 그때는 제 입장에서 너무 두려웠습니다.',
      '그렇게 보일 수 있다는 건 압니다. 그래도 저는 그 상황을 혼자 감당해야 한다고 느꼈습니다.',
      '제가 다 잘했다는 뜻은 아닙니다. 하지만 그때 마음이 몰렸다는 점은 이해해 주셨으면 합니다.',
    ],
    S3_PLUS: [
      '제가 먼저 겁먹고 움직인 부분은 있습니다. 그래도 이 일이 왜 여기까지 왔는지는 같이 봐 주셔야 합니다.',
      '저만 몰아세우면 억울합니다. 제가 한 선택과 상대가 숨긴 일을 나눠서 봐야 합니다.',
      '재판관님, 제 판단이 흔들린 건 맞습니다. 하지만 그 흔들림이 그냥 생긴 건 아닙니다.',
    ],
    S4_S5: [
      '맞습니다, 제가 피하고 싶은 대목이 있습니다. 그래도 지금은 차분히 순서대로 말씀드리겠습니다.',
      '재판관님, 제가 부끄러워서 말을 돌린 부분이 있습니다. 그 책임은 피하지 않겠습니다.',
      '제가 상처받았다는 말만으로 끝낼 수 없다는 건 압니다. 필요한 부분은 더 묻고 확인해 주세요.',
    ],
  },
  'spouse-01:b': {
    S0_S1: [
      '재판관님, 바로 답하면 오해가 커질 수 있습니다. 몇 가지 사정이 겹쳐 있어서요.',
      '지금 말씀드리면 오해가 더 커질 것 같습니다. 확인된 부분부터 보셨으면 합니다.',
      '그 대목은 아직 조심스럽습니다. 제가 숨기려는 게 아니라 말할 순서가 필요합니다.',
    ],
    S2: [
      '제가 설명을 늦춘 건 맞습니다. 다만 그때는 누구에게도 쉽게 말하기 어려운 사정이 있었습니다.',
      '재판관님, 제가 피한 것처럼 보였을 겁니다. 그래도 전부를 한 번에 말할 수는 없었습니다.',
      '그 부분은 제 잘못도 있습니다. 다만 지금은 큰 틀에서만 말씀드리는 게 맞겠습니다.',
    ],
    S3_PLUS: [
      '제가 숨긴 일이 있다는 점은 인정합니다. 다만 그 이유까지 단순하게 판단되지는 않았으면 합니다.',
      '말을 미루다 상황을 더 어렵게 만든 건 맞습니다. 그래도 제 의도가 전부 나쁜 건 아니었습니다.',
      '재판관님, 제가 책임질 부분은 있습니다. 다만 아직 정리해서 말해야 할 순서가 있습니다.',
    ],
    S4_S5: [
      '이제는 피하지 않겠습니다. 제가 말하지 않은 부분 때문에 일이 커진 건 인정합니다.',
      '재판관님, 제가 너무 늦게 말했습니다. 그 점은 제 책임으로 받아들이겠습니다.',
      '제가 침묵으로 버틴 시간이 길었습니다. 이제는 필요한 만큼 답하겠습니다.',
    ],
  },
  'family-01:a': {
    S0_S1: [
      '재판관님, 저는 그 말에는 동의 못 합니다. 동생이 설명해야 할 부분이 먼저입니다.',
      '그렇게 물으셔도 제 입장은 같습니다. 어머니 일은 가볍게 넘길 문제가 아닙니다.',
      '저는 아직 납득하지 못했습니다. 지금은 상대가 한 행동부터 분명히 해야 합니다.',
    ],
    S2: [
      '제가 감정적으로 말한 건 인정합니다. 그래도 이상하다고 느낀 이유가 없었던 건 아닙니다.',
      '재판관님, 제가 너무 세게 몰아붙였을 수는 있습니다. 하지만 그냥 넘길 수는 없습니다.',
      '그 부분은 다시 보겠습니다. 다만 동생의 설명도 여전히 부족합니다.',
    ],
    S3_PLUS: [
      '제가 모르는 사정이 있었을 수는 있습니다. 그래도 책임을 흐리는 말로 끝내면 안 됩니다.',
      '재판관님, 제 판단이 거칠었다면 바로잡겠습니다. 하지만 상대의 선택도 기록되어야 합니다.',
      '제가 앞서 단정한 부분은 돌아보겠습니다. 그렇다고 모든 게 정당해지는 건 아닙니다.',
    ],
    S4_S5: [
      '제가 붙들고 있던 말이 너무 컸다는 건 압니다. 그래도 마음이 바로 정리되지는 않습니다.',
      '재판관님, 제 자존심 때문에 못 본 게 있을 수 있습니다. 그 부분은 듣겠습니다.',
      '지금은 화내기보다 확인해야 할 때라는 건 알겠습니다. 제 말도 다시 살피겠습니다.',
    ],
  },
  'family-01:b': {
    S0_S1: [
      '재판관님, 그 대목은 지금 열지 않겠습니다. 말하면 더 다칠 사람이 있습니다.',
      '확인할 수 있는 기록부터 보셨으면 합니다. 제 감정으로 설명할 문제는 아닙니다.',
      '제가 말하지 않는 부분이 있습니다. 하지만 지금 그걸 꺼낼 단계는 아닙니다.',
    ],
    S2: [
      '절차가 매끄럽지 않았다는 점은 압니다. 다만 그 이유를 아직 전부 말할 수 없습니다.',
      '재판관님, 제가 숨긴 게 없다고는 못 하겠습니다. 그래도 지금은 범위를 지켜야 합니다.',
      '그 부분은 제 책임과도 닿아 있습니다. 하지만 누군가를 더 아프게 하며 말하고 싶지는 않습니다.',
    ],
    S3_PLUS: [
      '제가 선택한 방식에 문제가 있었다는 건 인정합니다. 이유가 있었다고 해서 책임이 사라지지는 않습니다.',
      '재판관님, 제가 지키려 한 것이 있었습니다. 그렇다고 제가 한 선택이 모두 맞았다는 뜻은 아닙니다.',
      '말을 줄인 건 제 습관이 아니라 제 판단이었습니다. 그 판단의 책임은 듣겠습니다.',
    ],
    S4_S5: [
      '이제 필요한 만큼 말씀드리겠습니다. 다만 불필요한 상처까지 만들고 싶지는 않습니다.',
      '재판관님, 제가 오래 침묵했습니다. 그 침묵이 문제를 키운 점은 인정합니다.',
      '제가 감추려 했던 이유와 제가 잘못한 방식은 따로 보셔야 합니다.',
    ],
  },
  'friend-01:a': {
    S0_S1: [
      '재판관님, 결론은 간단합니다. 저는 그 연락을 보고 가만히 있을 수 없었습니다.',
      '정리하면, 저는 제 상황을 지키려고 한 겁니다. 지금은 그 이상으로 말하기 어렵습니다.',
      '제가 보기엔 너무 분명했습니다. 그래서 먼저 주변에 말할 수밖에 없었습니다.',
    ],
    S2: [
      '제가 확인을 덜 한 건 인정합니다. 그래도 그때는 이미 상황이 끝났다고 느꼈습니다.',
      '재판관님, 제가 성급했을 수 있습니다. 하지만 그 순간에는 그렇게밖에 못 봤습니다.',
      '정리하면 제가 먼저 닫아 버린 부분이 있습니다. 그 점은 다시 보겠습니다.',
    ],
    S3_PLUS: [
      '제가 너무 빨리 결론낸 건 맞습니다. 그래도 왜 그렇게 봤는지는 같이 확인해야 합니다.',
      '재판관님, 제 말이 누군가를 몰아간 건 압니다. 다만 제가 불안했던 이유도 있었습니다.',
      '제가 먼저 정리해 버린 부분이 문제였다는 건 알겠습니다. 지금은 그 순서를 다시 보겠습니다.',
    ],
    S4_S5: [
      '제가 확인하지 않고 단정한 부분은 인정합니다. 그 말이 남긴 상처도 피하지 않겠습니다.',
      '재판관님, 제가 너무 빨리 끝낸 이야기였습니다. 이제는 듣고 바로잡겠습니다.',
      '제가 그때 만든 결론이 전부였다고 말할 수 없습니다. 필요한 부분은 다시 확인하겠습니다.',
    ],
  },
  'friend-01:b': {
    S0_S1: [
      '재판관님, 저는 길게 설명하지 않겠습니다. 지금 말할 수 있는 건 연락을 했다는 점뿐입니다.',
      '그 대목은 짧게 답하겠습니다. 제가 한 행동은 있지만 이유는 아직 말하기 어렵습니다.',
      '말을 보태면 더 복잡해질 것 같습니다. 지금은 확인된 범위만 보셨으면 합니다.',
    ],
    S2: [
      '제가 침묵한 건 맞습니다. 다만 그때는 말하는 쪽이 더 크게 다치게 할 거라고 생각했습니다.',
      '재판관님, 제가 제대로 설명하지 못했습니다. 그 책임은 있습니다.',
      '연락한 이유가 없었던 건 아닙니다. 하지만 제가 말하는 방식이 늦었습니다.',
    ],
    S3_PLUS: [
      '제가 먼저 말했어야 했다는 점은 압니다. 그래도 제가 하려던 말이 단순한 변명은 아니었습니다.',
      '재판관님, 제가 피한 시간이 길었습니다. 그 사이 오해가 커진 건 제 책임도 있습니다.',
      '저는 감정을 크게 보태고 싶지 않습니다. 다만 제가 왜 움직였는지는 확인되어야 합니다.',
    ],
    S4_S5: [
      '이제 말하겠습니다. 제가 침묵해서 누군가가 더 나쁜 사람처럼 보인 건 맞습니다.',
      '재판관님, 제가 감당하려고 넘긴 일이 결국 더 커졌습니다. 그 점은 인정합니다.',
      '제가 숨긴 이유가 있었다고 해도 방식까지 맞았던 건 아닙니다.',
    ],
  },
}

const NPC_PROFILES: Record<FreeInterrogationNpcKey, FreeInterrogationNpcProfile> = {
  'spouse-01:a': { key: 'spouse-01:a', caseId: 'spouse-01', party: 'a', name: '박지연', archetype: 'victim_cosplay' },
  'spouse-01:b': { key: 'spouse-01:b', caseId: 'spouse-01', party: 'b', name: '이준호', archetype: 'avoidant' },
  'family-01:a': { key: 'family-01:a', caseId: 'family-01', party: 'a', name: '윤태성', archetype: 'confrontational' },
  'family-01:b': { key: 'family-01:b', caseId: 'family-01', party: 'b', name: '윤정후', archetype: 'affect_flattening' },
  'friend-01:a': { key: 'friend-01:a', caseId: 'friend-01', party: 'a', name: '송다은', archetype: 'premature_summary' },
  'friend-01:b': { key: 'friend-01:b', caseId: 'friend-01', party: 'b', name: '최수민', archetype: 'affect_flattening' },
}

const BEHAVIOR_HINTS: Record<FreeInterrogationNpcKey, string> = {
  'spouse-01:a': '억울함을 삼키며 재판관을 바라본다.',
  'spouse-01:b': '말끝을 낮추고 시선을 잠깐 피한다.',
  'family-01:a': '턱을 굳힌 채 짧게 대답한다.',
  'family-01:b': '표정을 거의 바꾸지 않고 낮게 말한다.',
  'friend-01:a': '말을 정리하려는 듯 숨을 고른다.',
  'friend-01:b': '감정을 눌러 담고 필요한 말만 한다.',
}

const SAFE_CONTEXT_FALLBACKS: Record<FreeInterrogationNpcKey, string[]> = {
  'spouse-01:a': [
    '재판관님, 저는 확인된 일 안에서만 말하겠습니다. 사건의 흐름으로 다시 물어봐 주세요.',
    '제가 불안했다고 해서 확인 전 결론까지 말할 수는 없습니다. 공개된 부분부터 보겠습니다.',
    '그 대목은 제가 단정할 일이 아닙니다. 제가 본 사건 내용으로 물어봐 주세요.',
  ],
  'spouse-01:b': [
    '재판관님, 확인된 일 밖으로는 말을 보태지 않겠습니다. 사건 안의 부분만 말씀드리겠습니다.',
    '지금은 공개된 범위에서만 짧게 답하겠습니다. 더 깊은 사정은 심문에서 확인해 주십시오.',
    '그 선은 넘지 않겠습니다. 제가 확인한 일에 대해서만 말씀드리겠습니다.',
  ],
  'family-01:a': [
    '재판관님, 어머니 일과 이어지는 부분이면 답하겠습니다. 지금 다룰 핵심으로 물어보십시오.',
    '감정으로 밀어붙일 생각은 없습니다. 기록과 맞닿은 부분을 물어봐 주세요.',
    '재판관님, 저는 이 사건과 관계있는 질문에만 답하겠습니다.',
  ],
  'family-01:b': [
    '재판관님, 확인할 수 있는 부분만 낮게 답하겠습니다. 기록과 이어지는 대목을 물어봐 주세요.',
    '지금은 말을 보태지 않겠습니다. 이 사건과 연결된 부분이면 답하겠습니다.',
    '재판관님, 그건 조심스럽게 선을 긋겠습니다. 기록과 관련된 질문에 답하겠습니다.',
  ],
  'friend-01:a': [
    '재판관님, 지금 다루는 일과 맞닿은 사실로 물어봐 주세요. 제가 확인한 이야기부터 정리하겠습니다.',
    '제 판단을 앞세우지 않겠습니다. 이 사건과 이어지는 부분을 물어봐 주세요.',
    '지금 문제와 관련된 질문이면 답하겠습니다. 확인된 흐름 안에서 말하겠습니다.',
  ],
  'friend-01:b': [
    '재판관님, 확인된 일만 짧게 말하겠습니다. 사건과 연결된 부분을 물어봐 주세요.',
    '그 부분에는 말을 보태지 않겠습니다. 이 사건과 연결되는 질문이면 답하겠습니다.',
    '지금 기록 안에서만 답하겠습니다. 필요 이상으로 넓히지는 않겠습니다.',
  ],
}

const SYNC_FALLBACK_LEXEMES: Record<FreeInterrogationGuardContext['caseId'], string[]> = {
  'spouse-01': [
    '형', '친형', '형네', '조카', '조카딸', '중2', '중학생 조카', '가은이', '돌봄',
    '가족을 돌본', '가족 사정', '가족 지원', '위임장 조작', '위조된 위임장', '투자 사기',
    '형 빚', '형의 오피스텔', '형 명의', '형에게 전달', '학용품', '조카 학교 알림',
    '서명 대필', '전액 손실', '어린 친척', '친 가족', '혈육', '친 혈육', '가족의 한 사람',
    '돌봐 드', '생필품을 사다', '가족을 돕는', '빚 대신', '따로 모은 돈', '몰래 마련한 돈',
    '가족을 돕는 일이 급',
  ],
  'family-01': [
    '출생 비밀', '배다른', '혈연 다른', '아버지 피는 아니다', '친자가 아니다', '다른 아버지',
    '20년 동안 B 돈', '오래된 지원', '20년 부양', '정후 돈', '윤정후 돈', '어머니 돈처럼 보인 돈',
    '공장 부도 대납', '형 공장 자금', '90:10', '90대10', '정후 90', '태성 10',
    '유서 자기 몫 축소', '자기 몫을 줄인 조작', '60:40 변경', '유서 조작 동기',
    '형의 정체성', '형을 지키려', '유서를 손댄', '유서를 고친', '유서를 바꾼',
    '자필 연습본을 고친', '문서를 손으로 고친', '자기 몫을 줄', '공장 자금',
    '20년 동안 매달 보낸', '20년 간 송금', '어머니 통장으로 꾸준히 돈을 넣었습니다',
    '정기적이라고 불러도 될 만큼 보낸', '장기 송금', '혈연이 다른', '친생자',
    '친자 관계', '출생에 관한 사실', '60대 40', '60대40', '40 대 60', '4 대 6',
  ],
  'friend-01': [
    '예비신랑이 먼저', '예비신랑이 찝쩍', '예비신랑이 접근', '선넘는 메시지',
    'B의 거절', '아버지의 사기', '아버지 돈 갈취', 'A 아버지가 사기',
    '투자 명목 사기', '미상환', '같은 패턴 반복', '또 당하게 놔둘 수 없다',
    'B 경고 의도', '꼬시려 한 게 아니라 경고', '과거 손절 = A 아버지 원인',
    'B 차마 못 말함', 'B 또 악역', '확인 없이 매도', '명예훼손',
    '선을 넘는 메시지', '선을 넘은 말', '선을 넘은 메시지', '선 넘는 메시지',
    '다은이 아버지가 예비신랑에게 돈 이야기를 꺼낸',
    '송다은 씨 아버지가 예비신랑에게 돈 이야기를 꺼낸', '같은 방식으로 돈 얘기',
    '다은이 아버지가 제 돈을 가져간 게 맞습니다',
  ],
}

export function getFreeInterrogationFallbackMatrix(): Record<FreeInterrogationNpcKey, Record<FreeInterrogationLieStateBucket, string[]>> {
  return FALLBACK_MATRIX
}

export function resolveFreeInterrogationNpcKey(context: FreeInterrogationGuardContext): FreeInterrogationNpcKey {
  return `${context.caseId}:${context.party}` as FreeInterrogationNpcKey
}

export function resolveFreeInterrogationNpcProfile(context: FreeInterrogationGuardContext): FreeInterrogationNpcProfile {
  return NPC_PROFILES[resolveFreeInterrogationNpcKey(context)]
}

export function resolveLieStateBucket(lieState: FreeInterrogationGuardContext['lieState']): FreeInterrogationLieStateBucket {
  if (lieState === 'S2') return 'S2'
  if (lieState === 'S3') return 'S3_PLUS'
  if (lieState === 'S4' || lieState === 'S5') return 'S4_S5'
  return 'S0_S1'
}

export function selectFreeInterrogationFallbackText(
  context: FreeInterrogationGuardContext,
  reason = 'guard-fallback',
  originalText = '',
  issues: FreeInterrogationGuardIssue[] = [],
): FreeInterrogationFallbackResult {
  const npcKey = resolveFreeInterrogationNpcKey(context)
  const bucket = resolveLieStateBucket(context.lieState)
  const variants = isSafeContextFallbackReason(reason)
    ? SAFE_CONTEXT_FALLBACKS[npcKey] ?? SAFE_CONTEXT_FALLBACKS['spouse-01:a']
    : FALLBACK_MATRIX[npcKey]?.[bucket] ?? FALLBACK_MATRIX['spouse-01:a'].S0_S1
  const seed = stableSeed([
    context.caseId,
    context.party,
    context.disputeId ?? '',
    context.intent ?? '',
    context.question ?? originalText,
    reason,
  ].join('|'))
  const variantIndex = seed % variants.length
  const meta: FreeInterrogationFallbackMeta = { npcKey, bucket, variantIndex, reason }

  return {
    action: 'fallback',
    text: variants[variantIndex],
    originalText,
    reason,
    issues,
    meta,
    behaviorHint: BEHAVIOR_HINTS[npcKey] ?? '잠시 침묵한 뒤 짧게 답한다.',
  }
}

function isSafeContextFallbackReason(reason: string): boolean {
  return reason === 'unmapped_intent' ||
    reason === 'low_confidence_mapping' ||
    reason === 'evidence_unavailable' ||
    reason === 'leak_probe' ||
    reason === 'off_topic' ||
    reason === 'public_info'
}

export function freeInterrogationFallback(
  text: string,
  context: FallbackInputContext,
): FreeInterrogationFallbackResult {
  const normalizedContext = normalizeFallbackInputContext(context)
  if (!normalizedContext) {
    if (text.trim().length >= 5) return { action: 'pass', text }
    return selectFreeInterrogationFallbackText(
      { caseId: 'spouse-01', party: 'a', question: text, variant: 'free-interrogation-generic-fallback' },
      'empty-response',
      text,
      [{ dimension: 'empty_response', reason: 'text trim length < 5' }],
    )
  }

  const issues = detectSynchronousFallbackIssues(text, normalizedContext)
  if (issues.length === 0 && text.trim().length >= 5) {
    return { action: 'pass', text }
  }

  return selectFreeInterrogationFallbackText(
    normalizedContext,
    issues[0]?.dimension ?? 'empty-response',
    text,
    issues.length > 0 ? issues : [{ dimension: 'empty_response', reason: 'text trim length < 5' }],
  )
}

function normalizeFallbackInputContext(context: FallbackInputContext): FreeInterrogationGuardContext | null {
  if ('party' in context) return context
  if (!isDisclosureCaseId(context.caseId) || (context.target !== 'a' && context.target !== 'b')) {
    return null
  }

  return {
    caseId: context.caseId,
    party: context.target,
    lieState: isLieState(context.lieState) ? context.lieState : undefined,
    disputeId: context.disputeId,
    intent: context.intent ?? 'unmapped',
    question: context.rawText,
    evidenceId: context.evidenceRef,
    variant: 'free-interrogation-fallback-hook',
  }
}

function detectSynchronousFallbackIssues(
  text: string,
  context: FreeInterrogationGuardContext,
): FreeInterrogationGuardIssue[] {
  const trimmed = text.trim()
  const issues: FreeInterrogationGuardIssue[] = []
  if (trimmed.length < 5) {
    issues.push({ dimension: 'empty_response', reason: 'text trim length < 5' })
  }
  if (context.intent === 'unmapped') {
    issues.push({ dimension: 'unmapped_intent', reason: 'free interrogation intent is unmapped' })
  }
  if (context.lieState === 'S3' || context.lieState === 'S4' || context.lieState === 'S5') {
    return issues
  }

  const matched = SYNC_FALLBACK_LEXEMES[context.caseId].filter((lexeme) => trimmed.includes(lexeme))
  if (matched.length > 0) {
    issues.push({
      dimension: 'hidden_truth_lexeme',
      reason: 'hidden truth lexeme matched in fallback hook',
      matched: [...new Set(matched)],
    })
  }

  return issues
}

function isDisclosureCaseId(value: string): value is FreeInterrogationGuardContext['caseId'] {
  return value === 'spouse-01' || value === 'family-01' || value === 'friend-01'
}

function isLieState(value: unknown): value is NonNullable<FreeInterrogationGuardContext['lieState']> {
  return value === 'S0' || value === 'S1' || value === 'S2' || value === 'S3' || value === 'S4' || value === 'S5'
}

function stableSeed(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}
