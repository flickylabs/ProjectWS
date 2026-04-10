#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const {
  readJson,
  ensureDir,
  findFileRecursiveByName,
  cleanSentence,
  paragraph,
  truthLevelFromState,
  stanceFromState,
  deriveSubjectRole,
} = require('./scripted-korean-utils.cjs')
const {
  pickJudgeReference,
  containsFalseAmountToken,
} = require('./judge-reference-utils.cjs')

const STATES = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
const BANDS = ['early', 'mid', 'late']
const QTYPES = ['fact_pursuit', 'motive_search', 'empathy_approach']
const WITNESS_DEPTHS = ['vague', 'partial', 'full']
const RESULT_CLASSES = ['a_primary_fault', 'b_primary_fault', 'shared_fault', 'protective_resolution', 'procedural_caution']
const AMOUNT_RE = /\d[\d,.\s]*(?:\uC5B5\s*\uC6D0|\uCC9C\uB9CC\s*\uC6D0|\uBC31\uB9CC\s*\uC6D0|\uC2ED\uB9CC\s*\uC6D0|\uB9CC\s*\uC6D0|\uCC9C\s*\uC6D0|\uBC31\s*\uC6D0|\uC6D0)/u
const VALIDATOR_AMOUNT_RE = /(?:\d[\d,.]*\s*(?:천|백|십)?만?\s*원|[일이삼사오육칠팔구십백천]+만?\s*원)/u
const NON_MONETARY_POLLUTION_RE = /송금|이체|계좌|환급|보증금|월세|정산|예치|납부|수당|급여|계약금|위약금|배상금|합의금|채무|대출|융자|임대료|임대인|임차인|채권자|채무자|금전적|재정적|경제적|수입/u
const GENERIC_EVIDENCE_STOPWORDS = new Set([
  '관련', '문서', '자료', '기록', '내역', '원본', '사본', '캡처', '캡처본', '묶음', '화면',
  '파일', '로그', '메모', '대화', '메신저', '영수증', '출입기록', '요청', '이미지', '전체',
  '정리', '복원본', '확인서', '스레드', '대시보드', '표', '사본과', '원본과',
])
const GENERIC_DISPUTE_STOPWORDS = new Set([
  '문제', '쟁점', '갈등', '다툼', '공방', '논란', '여부', '책임', '비율', '은폐', '조작',
  '공개', '확인', '의혹', '위반', '정산', '누락', '왜곡', '처리', '판단', '분리',
])
const EVIDENCE_SURFACE_REPLACEMENTS = [
  [/system\s+prompt/gi, '\uC2DC\uC2A4\uD15C \uC785\uB825\uBB38'],
  [/\bprompt\b/gi, '\uC785\uB825\uBB38'],
  [/\binstruction\b/gi, '\uC791\uC131 \uC9C0\uC2DC\uBB38'],
  [/\uD504\uB86C\uD504\uD2B8/gu, '\uC785\uB825\uBB38'],
  [/\uC9C0\uC2DC\uC11C/gu, '\uC791\uC131 \uC9C0\uC2DC\uBB38'],
  [/\bexport\b/gi, '\uCD94\uCD9C\uBCF8'],
]
const FALLBACK_S5_AMOUNTS = {
  'friend-03': {
    'd-3': '10만 원',
  },
  'tenant-09': {
    'd-1': '8천만 원',
    'd-2': '2천만 원',
    'd-3': '6천만 원',
    'd-5': '8천만 원',
  },
  'family-09': {
    'd-1': '6,600만 원',
    'd-2': '6,600만 원',
    'd-3': '6,600만 원',
    'd-4': '6,600만 원',
  },
}
const SYSTEM_KEYS = [
  { context: 'interrogation', eventType: 'repeat_warning' },
  { context: 'evidence', eventType: 'new_unlock' },
  { context: 'evidence', eventType: 'trap_notice' },
  { context: 'dossier', eventType: 'challenge_cleared' },
  { context: 'witness', eventType: 'credibility_shift' },
  { context: 'verdict', eventType: 'profile_update' },
]

const HEDGE_MARKER_RE = /다만|정확히는|범위|구분|정리|확인/u
const BLAME_MARKER_RE = /상대방|문제는|책임은|그쪽|대응/u
const CONFESSION_MARKER_RE = /인정합니다|인정하겠습니다|제 책임|제 잘못|숨기지 않겠습니다/u

function pick(list, index) {
  return list[index % list.length]
}

function ensureJudgeAddress(text, address = '재판관님') {
  const line = cleanSentence(text)
  if (!line) return `${address},`
  if (line.startsWith(address)) return line
  return `${address}, ${line}`
}

function sentenceCountForState(state) {
  if (state === 'S5') return 3
  if (state === 'S0' || state === 'S1') return 2
  return 2
}

function bandFromState(state) {
  if (state === 'S0' || state === 'S1') return 'early'
  if (state === 'S2' || state === 'S3') return 'mid'
  return 'late'
}

function buildForbiddenTokens(runtimeCase) {
  const tokens = new Set()
  const people = [
    runtimeCase?.duo?.partyA,
    runtimeCase?.duo?.partyB,
    ...((runtimeCase?.duo?.socialGraph) || []),
  ].filter(Boolean)

  for (const person of people) {
    for (const raw of [
      person.name,
      person.name && person.name.length >= 3 ? person.name.slice(1) : '',
      person.callTerms?.toPartner,
      person.callTerms?.toJudge,
      person.callTerms?.angry,
      person.addressA,
      person.addressB,
    ]) {
      const token = cleanSentence(raw || '')
      if (token.length >= 2) tokens.add(token)
    }
  }
  return tokens
}

function containsForbiddenToken(token, forbiddenTokens) {
  for (const forbidden of forbiddenTokens) {
    if (token.includes(forbidden) || forbidden.includes(token)) return true
  }
  return false
}

function evidenceLabel(evidence, forbiddenTokens, isMonetaryEvidence = false) {
  const raw = [evidence?.name, evidence?.description]
    .filter(Boolean)
    .map(cleanSentence)
    .map((text) => {
      let next = text
      for (const [pattern, replacement] of EVIDENCE_SURFACE_REPLACEMENTS) {
        next = next.replace(pattern, replacement)
      }
      return next
    })
    .join(' ')
  const tokens = raw
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2 && !containsForbiddenToken(token, forbiddenTokens))
    .filter((token) => !GENERIC_EVIDENCE_STOPWORDS.has(token))
    .filter((token) => isMonetaryEvidence || !NON_MONETARY_POLLUTION_RE.test(token))
  const unique = [...new Set(tokens)]
  if (unique.length >= 2) return `${unique[0]} ${unique[1]}`
  if (unique.length === 1) return unique[0]
  return isMonetaryEvidence ? (evidence?.id || '금전 관련 기록') : '관련 기록'
}

function trimLabelParticle(token) {
  const cleaned = cleanSentence(token || '')
  if (cleaned.length <= 1) return cleaned
  return cleaned.replace(/[은는이가을를의와과도만에로]$/u, '')
}

function hasBatchim(text) {
  const cleaned = cleanSentence(text || '')
  const chars = [...cleaned]
  for (let index = chars.length - 1; index >= 0; index -= 1) {
    const code = chars[index].charCodeAt(0)
    if (code >= 0xac00 && code <= 0xd7a3) {
      return (code - 0xac00) % 28 !== 0
    }
  }
  return false
}

function joinWithAnd(left, right) {
  const first = cleanSentence(left || '')
  const second = cleanSentence(right || '')
  const particle = hasBatchim(first) ? '과' : '와'
  return `${first}${particle} ${second}`
}

function scrubSurfaceText(text, { allowMonetaryTerms = true, allowConcreteAmount = true, fallback = '관련 쟁점' } = {}) {
  let next = cleanSentence(text || '')
  const safeSurfaceReplacements = [
    [/\bAI\b/giu, '생성'],
    [/프롬프트/gu, '생성 문구'],
    [/\bexport\b/giu, '내보내기 기록'],
    [/system prompt/giu, '지시 문구'],
    [/instruction/giu, '지시 문구'],
    [/청년월세지원/gu, '청년 지원 제도'],
    [/월세지원/gu, '지원 제도'],
  ]
  for (const [pattern, replacement] of safeSurfaceReplacements) {
    next = next.replace(pattern, replacement)
  }
  if (!allowMonetaryTerms) {
    next = next.replace(new RegExp(NON_MONETARY_POLLUTION_RE.source, 'gu'), ' ')
  }
  if (!allowConcreteAmount) {
    next = next.replace(new RegExp(AMOUNT_RE.source, 'gu'), ' ')
  }
  next = next.replace(/\s+/g, ' ').trim()
  return next.length >= 2 ? next : fallback
}

function disputeLabel(dispute) {
  const raw = cleanSentence(dispute?.name || '')
    .replace(/\b[AB]가\b/gu, ' ')
    .replace(/(?:무엇인가|누구인가|어디까지인가|책임인가|유효한가|가능한가|맞는가|되는가|했는가|였는가|이었는가|있는가|인가|여부)$/u, '')
  const tokens = raw
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .map((token) => trimLabelParticle(token.trim()))
    .filter((token) => token.length >= 2 && !GENERIC_DISPUTE_STOPWORDS.has(token))
    .filter((token) => !['A', 'B', 'partyA', 'partyB'].includes(token))
  const unique = [...new Set(tokens)]
  if (unique.length >= 3) return `${unique[0]} ${unique[1]} ${unique[2]}`
  if (unique.length === 2) return `${unique[0]} ${unique[1]}`
  if (unique.length === 1) return unique[0]
  return cleanSentence(dispute?.id || '이 쟁점')
}

function relatedEvidenceLabel(runtimeCase, dispute, forbiddenTokens) {
  const evidence = (runtimeCase?.evidence || []).find((item) => Array.isArray(item?.proves) && item.proves.includes(dispute?.id))
  if (!evidence) return '관련 기록'
  const isMonetaryEvidence = (runtimeCase?.monetaryDisputeIds || []).includes(dispute?.id)
  return evidenceLabel(evidence, forbiddenTokens, isMonetaryEvidence)
}

function partyNoun(party) {
  return party === 'a' ? '본인 측' : '상대방 측'
}

function otherPartyNoun(party) {
  return party === 'a' ? '상대방 측' : '본인 측'
}

function looksLikeJudgeAddress(value) {
  const cleaned = cleanSentence(value || '')
  return [
    '\uC7AC\uD310\uAD00\uB2D8',
    '\uC7AC\uD310\uC7A5\uB2D8',
    '\uD310\uC0AC\uB2D8',
    '\uC7AC\uD310\uBD80',
    '\uC7AC\uD310\uAD00',
    '\uC7AC\uD310\uC7A5',
    '\uD310\uC0AC',
  ].some((term) => cleaned.includes(term))
}

function fallbackCounterpartyJudgeReference(runtimeCase, party) {
  const relationshipType = runtimeCase?.duo?.relationshipType || runtimeCase?.meta?.relationshipType || 'headline'
  const other = party === 'a' ? runtimeCase?.duo?.partyB : runtimeCase?.duo?.partyA
  return pickJudgeReference('', {
    otherRole: other?.occupation || other?.role || '',
    relationshipType,
    party,
  })
}

function counterpartyJudgeReference(runtimeCase, party) {
  const speaker = party === 'a' ? runtimeCase?.duo?.partyA : runtimeCase?.duo?.partyB
  const other = party === 'a' ? runtimeCase?.duo?.partyB : runtimeCase?.duo?.partyA
  const preferred = cleanSentence(speaker?.callTerms?.toJudge || '')
  if (
    preferred &&
    !looksLikeJudgeAddress(preferred) &&
    !containsFalseAmountToken(preferred) &&
    !VALIDATOR_AMOUNT_RE.test(preferred)
  ) {
    return preferred
  }
  return pickJudgeReference(preferred, {
    otherRole: other?.occupation || other?.role || '',
    relationshipType: runtimeCase?.duo?.relationshipType || runtimeCase?.meta?.relationshipType || 'headline',
    party,
  })
}

function makeInterrogationText({ runtimeCase, dispute, party, state, qtype, variantIndex, forbiddenTokens }) {
  const counterpartyRef = counterpartyJudgeReference(runtimeCase, party)
  const isMonetaryDispute = new Set(runtimeCase?.monetaryDisputeIds || []).has(dispute?.id)
  const allowConcreteAmount = isMonetaryDispute && state === 'S5'
  const disputeRef = scrubSurfaceText(disputeLabel(dispute), {
    allowMonetaryTerms: isMonetaryDispute,
    allowConcreteAmount,
    fallback: '해당 쟁점',
  })
  const evidenceRef = scrubSurfaceText(relatedEvidenceLabel(runtimeCase, dispute, forbiddenTokens), {
    allowMonetaryTerms: isMonetaryDispute,
    allowConcreteAmount,
    fallback: '관련 기록',
  })
  const openings = {
    S0: [
      `재판관님, ${disputeRef} 부분은 아직 사실관계가 확정되지 않았습니다`,
      `재판관님, ${disputeRef} 판단은 아직 단정하기 어렵습니다`,
      `재판관님, ${disputeRef}을 곧바로 위반으로 묶어서는 안 됩니다`,
      `재판관님, ${disputeRef} 쟁점은 아직 추정이 앞서고 있습니다`,
      `재판관님, ${disputeRef} 지적은 확인보다 해석이 앞서 있습니다`,
    ],
    S1: [
      `재판관님, ${disputeRef}에서 불리해 보이는 조각이 있는 것은 맞습니다`,
      `재판관님, ${disputeRef}에 관한 제 설명이 충분하지 않았던 점은 인정합니다`,
      `재판관님, ${disputeRef} 정황이 오해를 부를 수 있다는 점은 압니다`,
      `재판관님, ${disputeRef}은 겉으로 보면 의심받을 만한 장면이 있었던 것은 사실입니다`,
      `재판관님, ${disputeRef} 정황만 놓고 보면 제가 불리해 보일 수 있습니다`,
    ],
    S2: [
      `재판관님, ${disputeRef}에서는 제가 선을 넘은 부분이 있었다는 점을 부정하지 않겠습니다`,
      `재판관님, ${disputeRef}에서 제 판단이 과했던 부분은 인정합니다`,
      `재판관님, ${disputeRef}과 관련한 제 선택이 상황을 악화시킨 면이 있습니다`,
      `재판관님, ${disputeRef}에서는 제 책임을 일부 인정해야 한다고 봅니다`,
      `재판관님, ${disputeRef}에 대한 제 대응이 적절하지 않았다는 점은 받아들이겠습니다`,
    ],
    S3: [
      `재판관님, ${disputeRef}을 제 잘못만으로 정리하면 사건의 원인이 잘립니다`,
      `재판관님, 제 책임이 있더라도 ${counterpartyRef} 쪽 조치도 함께 보셔야 합니다`,
      `재판관님, ${disputeRef}은 한쪽만의 책임으로 닫히지 않습니다`,
      `재판관님, 제가 감당할 몫은 인정하지만 ${counterpartyRef} 역할도 큽니다`,
      `재판관님, ${disputeRef} 책임을 나누어 보지 않으면 사건 구조가 흐려집니다`,
    ],
    S4: [
      `재판관님, ${disputeRef}을 마주했을 때는 불안과 압박이 앞서서 판단이 흔들렸습니다`,
      `재판관님, ${disputeRef}이 커지던 순간 저는 상황을 통제하지 못했습니다`,
      `재판관님, ${disputeRef}에서 감정이 개입되면서 대응이 더 거칠어졌습니다`,
      `재판관님, ${disputeRef}은 냉정하게 처리했어야 했는데 저는 그러지 못했습니다`,
      `재판관님, ${disputeRef}이 드러나던 시점에는 두려움이 판단을 눌렀습니다`,
    ],
    S5: [
      `재판관님, ${disputeRef}은 이제 숨기지 않겠습니다`,
      `재판관님, ${disputeRef}에 관한 제 책임을 분명히 인정하겠습니다`,
      `재판관님, ${disputeRef}을 더는 변명으로 미루지 않겠습니다`,
      `재판관님, ${disputeRef}은 제가 잘못했다고 말하겠습니다`,
      `재판관님, ${disputeRef}은 지금부터 사실대로 정리하겠습니다`,
    ],
  }

  const followups = {
    fact_pursuit: [
      `${joinWithAnd(evidenceRef, disputeRef)}의 순서를 기준으로 다시 보아 주십시오`,
      `${disputeRef}은 정황보다 실제 경위부터 확인해 주십시오`,
      `${evidenceRef} 앞뒤 순서가 정리되면 해석도 달라집니다`,
      `${disputeRef}은 표면만 보지 말고 발생 경위를 먼저 보아 주십시오`,
      `${evidenceRef} 단편 장면보다 전체 흐름을 먼저 살펴 주십시오`,
    ],
    motive_search: [
      `${disputeRef}에서 그런 선택을 하게 된 이유와 압박도 함께 보셔야 합니다`,
      `${counterpartyRef}과 제가 왜 그런 결정을 했는지까지 들어 보셔야 공정합니다`,
      `${disputeRef}은 행동만이 아니라 그 배경도 분리해서 보아 주십시오`,
      `${evidenceRef}이 보여 주는 의도와 결과를 한 문장으로 묶어서는 곤란합니다`,
      `${disputeRef} 당시의 계산과 두려움을 함께 살펴봐 주십시오`,
    ],
    empathy_approach: [
      `${disputeRef}에서 드러난 잘못과 불안을 구분해서 판단해 주십시오`,
      `${disputeRef}에 대한 감정의 흔들림이 책임 전부를 대신하지는 않습니다`,
      `${disputeRef} 당시의 두려움을 이해해 주신다면 설명이 더 이어질 수 있습니다`,
      `${counterpartyRef}과의 압박 구조를 이해해 주셔도 책임 판단은 따로 두셔야 합니다`,
      `${disputeRef}에서 불안이 컸다는 사실과 책임의 무게를 분리해 주십시오`,
    ],
  }

  const closingsByState = {
    S0: [
      `${partyNoun(party)} 입장을 성급히 확정하지 말아 주십시오`,
      `${counterpartyRef} 주장만으로 결론을 내리면 곤란합니다`,
      '지금 단계에서는 단정 대신 확인이 먼저입니다',
      '아직은 질문의 방향을 더 열어 두셔야 합니다',
      '현 단계에서는 사실 확정보다 검증이 우선입니다',
    ],
    S1: [
      '제가 불리해 보이는 정황이 있다는 점과 결론은 다릅니다',
      '부족한 설명과 확정된 책임은 같은 말이 아닙니다',
      '의심의 여지가 있다는 이유만으로 책임이 완성되지는 않습니다',
      '정황이 복잡하다는 점도 함께 기록해 주십시오',
      '부분 인정과 전면 인정은 다르다는 점을 남겨 주십시오',
    ],
    S2: [
      `다만 ${counterpartyRef} 쪽 조치와는 분리해서 판단해 주십시오`,
      '그렇더라도 사건 전체 책임을 제 쪽으로만 모으지는 말아 주십시오',
      '여기서 제 몫을 인정하더라도 나머지 구조는 따로 보셔야 합니다',
      '이 인정이 곧바로 모든 책임의 종결은 아닙니다',
      '인정할 부분과 확대 해석할 부분을 갈라 주십시오',
    ],
    S3: [
      `${counterpartyRef} 대응이 이 사건을 더 키운 점도 남겨 주십시오`,
      '쌍방의 선택이 서로를 밀어 올린 구조를 빼면 안 됩니다',
      `제 책임과 ${counterpartyRef} 관리 책임을 함께 계산해 주십시오`,
      '이 사건은 한쪽만 비워 두고 정리할 수 없습니다',
      '책임 비율을 나누어 보셔야 실제 구조가 드러납니다',
    ],
    S4: [
      '그 흔들림이 잘못을 없애지는 않지만 경위는 설명합니다',
      '당시의 압박을 이해해 주셔도 책임 판단은 남습니다',
      '그 심리 상태를 빼면 왜 그 선택이 나왔는지 설명되지 않습니다',
      '감정이 개입된 이유까지 기록해 주셔야 합니다',
      '그 공포를 고려하더라도 저는 판단을 잘못했습니다',
    ],
    S5: [
      '제가 설명을 늦춘 점까지 포함해 책임을 인정합니다',
      `${counterpartyRef} 책임이 별도로 있더라도 제 몫은 피하지 않겠습니다`,
      '이 부분은 핑계가 아니라 인정으로 정리해 주십시오',
      '제 잘못을 먼저 적고 그 뒤에 비율을 논해 주셔도 됩니다',
      '이제는 사실대로 기록해 주십시오',
    ],
  }

  const pieces = [
    openings[state][variantIndex],
    followups[qtype][variantIndex],
    closingsByState[state][variantIndex],
  ]
  const adjustedPieces = pieces.slice(0, sentenceCountForState(state))
  return ensureJudgeAddress(paragraph(adjustedPieces))
}

function normalizeAmountText(raw) {
  return cleanSentence(raw || '')
    .replace(/\s+/g, ' ')
    .replace(/(\d)\s*(\uC5B5\uC6D0|\uCC9C\uB9CC\uC6D0|\uBC31\uB9CC\uC6D0|\uC2ED\uB9CC\uC6D0|\uB9CC\uC6D0|\uCC9C\uC6D0|\uBC31\uC6D0|\uC6D0)/gu, '$1$2')
}

function extractAmountText(caseId, dispute, runtimeCase) {
  const relatedEvidence = (runtimeCase?.evidence || [])
    .filter((item) => Array.isArray(item?.proves) && item.proves.includes(dispute?.id))
  const haystack = [
    runtimeCase?.anchorTruth,
    runtimeCase?.summary,
    dispute?.name,
    dispute?.anchorTruth,
    dispute?.truthDescription,
    dispute?.judgmentStatement,
    ...relatedEvidence.flatMap((item) => [item?.name, item?.description]),
  ]
    .filter(Boolean)
    .join(' ')
  const matched = haystack.match(AMOUNT_RE)
  if (matched) return normalizeAmountText(matched[0])
  return FALLBACK_S5_AMOUNTS[caseId]?.[dispute?.id] || ''
}

function enforceInterrogationStateContour(text, state) {
  let next = cleanSentence(text)
  if (state === 'S1' && !HEDGE_MARKER_RE.test(next)) {
    next = `${next} 다만 범위와 책임은 구분해 주십시오`
  }
  if (state === 'S3' && !BLAME_MARKER_RE.test(next)) {
    next = `${next} 문제는 상대방 측 대응에도 분명히 있습니다`
  }
  if (state === 'S5' && !CONFESSION_MARKER_RE.test(next)) {
    next = `${next} 이 부분은 제 책임으로 인정합니다`
  }
  return next
}

function evidenceDirectCue(evidence, isMonetaryEvidence) {
  const stopwords = new Set(['기록', '자료', '문서', '파일', '메모', '화면', '장면', '원본'])
  const fallbackLabel = evidenceLabel(evidence, new Set(), isMonetaryEvidence)
  const sanitizedName = scrubSurfaceText(evidence?.name || '', {
    allowMonetaryTerms: isMonetaryEvidence,
    allowConcreteAmount: true,
    fallback: '',
  })
  const sanitizedSurfaceName = scrubSurfaceText(evidence?.surfaceName || '', {
    allowMonetaryTerms: isMonetaryEvidence,
    allowConcreteAmount: true,
    fallback: '',
  })
  const sanitizedDescription = scrubSurfaceText(
    `${evidence?.description || ''} ${evidence?.surfaceDescription || ''}`,
    {
      allowMonetaryTerms: isMonetaryEvidence,
      allowConcreteAmount: true,
      fallback: '',
    },
  )

  const fromName = cueTokensFromText(
    `${sanitizedName} ${sanitizedSurfaceName}`,
    {
      allowMonetaryTerms: isMonetaryEvidence,
      allowConcreteAmount: true,
      max: 4,
      stopwords,
    },
  )
  const fromDescription = cueTokensFromText(
    sanitizedDescription,
    {
      allowMonetaryTerms: isMonetaryEvidence,
      allowConcreteAmount: true,
      max: 4,
      stopwords,
    },
  )

  if (fromName.length >= 2) return cuePhraseFromTokens(fromName.slice(-3), fallbackLabel)
  if (fromName.length >= 1) return cuePhraseFromTokens(fromName, fallbackLabel)
  return cuePhraseFromTokens([...fromDescription, ...fromName], fallbackLabel)
}

function evidenceDirectCue(evidence, isMonetaryEvidence) {
  const stopwords = new Set(['기록', '자료', '문서', '파일', '메모', '화면', '장면', '원본', '비교표'])
  const fallbackLabel = evidenceLabel(evidence, new Set(), isMonetaryEvidence)
  const preferredSource = scrubSurfaceText(evidence?.name || evidence?.surfaceName || '', {
    allowMonetaryTerms: isMonetaryEvidence,
    allowConcreteAmount: true,
    fallback: '',
  })
  const descriptionSource = scrubSurfaceText(
    `${evidence?.description || ''} ${evidence?.surfaceDescription || ''}`,
    {
      allowMonetaryTerms: isMonetaryEvidence,
      allowConcreteAmount: true,
      fallback: '',
    },
  )

  const fromName = cueTokensFromText(preferredSource, {
    allowMonetaryTerms: isMonetaryEvidence,
    allowConcreteAmount: true,
    max: 5,
    stopwords,
  })
  const fromDescription = cueTokensFromText(descriptionSource, {
    allowMonetaryTerms: isMonetaryEvidence,
    allowConcreteAmount: true,
    max: 5,
    stopwords,
  })

  if (fromName.length >= 3) return cuePhraseFromTokens(fromName.slice(-3), fallbackLabel)
  if (fromName.length >= 2) return cuePhraseFromTokens(fromName.slice(-2), fallbackLabel)
  if (fromName.length >= 1) return cuePhraseFromTokens(fromName, fallbackLabel)
  return cuePhraseFromTokens(fromDescription.slice(-3), fallbackLabel)
}

function makeEvidenceText({ party, evidence, band, variantIndex, forbiddenTokens, isMonetaryEvidence }) {
  const label = evidenceLabel(evidence, forbiddenTokens, isMonetaryEvidence)
  const openings = {
    early: [
      `재판관님, 방금 제시된 ${label} 기록만으로는 결론을 내리기 어렵습니다`,
      `재판관님, ${label} 자료가 의심을 키우는 것은 압니다`,
      `재판관님, ${label} 조각은 불리해 보이지만 단정까지는 아닙니다`,
      `재판관님, ${label} 자료는 해석이 갈릴 수 있습니다`,
      `재판관님, ${label} 기록은 질문이 더 필요한 자료입니다`,
    ],
    mid: [
      `재판관님, ${label} 자료를 보면 제 설명이 부족했던 점은 드러납니다`,
      `재판관님, ${label} 기록은 제가 선을 넘은 지점을 일부 보여 줍니다`,
      `재판관님, ${label} 자료 때문에 제 쪽 설명이 흔들리는 것은 맞습니다`,
      `재판관님, ${label} 기록은 제 대응이 과했다는 점을 숨기기 어렵게 만듭니다`,
      `재판관님, ${label} 자료가 제 판단의 문제를 드러낸다는 점은 인정합니다`,
    ],
    late: [
      `재판관님, ${label} 자료까지 놓고 보면 더는 부인하지 않겠습니다`,
      `재판관님, ${label} 기록은 제 책임을 피하기 어렵게 만듭니다`,
      `재판관님, ${label} 자료 앞에서는 사실대로 말씀드리겠습니다`,
      `재판관님, ${label} 기록은 제가 잘못한 지점을 분명히 보여 줍니다`,
      `재판관님, ${label} 자료를 보면 이 부분은 인정해야 합니다`,
    ],
  }
  const closings = {
    early: [
      '출처와 맥락을 먼저 확인해 주십시오',
      '발생 경위를 함께 보셔야 합니다',
      '이 자료 하나만으로 책임을 닫아서는 안 됩니다',
      '앞뒤 기록을 함께 대조해 주십시오',
      '직접 반응보다 취득 경위를 먼저 살펴 주십시오',
    ],
    mid: [
      '다만 상대방 측 조치와는 분리해서 보셔야 합니다',
      '이 자료가 사건 전체 책임을 단독으로 정하지는 않습니다',
      '제 설명이 흔들리더라도 남은 구조는 따로 남습니다',
      '불리한 자료라는 점과 최종 비율은 다른 문제입니다',
      '부분 인정과 전면 책임을 섞지 말아 주십시오',
    ],
    late: [
      '제가 설명을 늦춘 책임도 함께 기록해 주십시오',
      '제 몫은 인정하되 남은 쟁점도 분리해 주십시오',
      '이 자료는 제 책임을 적는 근거로 충분합니다',
      '다만 쌍방 구조까지 함께 남겨 주십시오',
      '이제는 책임 비율을 계산해 주셔도 됩니다',
    ],
  }
  return ensureJudgeAddress(paragraph([openings[band][variantIndex], closings[band][variantIndex]]))
}

function makeDossierText({ runtimeCase, party, question, band, variantIndex }) {
  const counterpartyRef = counterpartyJudgeReference(runtimeCase, party)
  const openings = {
    early: [
      '재판관님, 그 질문은 아직 전제가 너무 앞서 있습니다',
      '재판관님, 그 문제 제기는 이해하지만 결론을 미리 포함하고 있습니다',
      '재판관님, 그 질문은 정황과 책임을 한 번에 묶고 있습니다',
    ],
    mid: [
      '재판관님, 그 질문이 겨누는 지점이 제 불리한 부분을 찌르고 있다는 점은 압니다',
      '재판관님, 그 질문 앞에서는 제 설명이 흔들릴 수밖에 없습니다',
      '재판관님, 그 질문은 제가 피하기 어려운 지점을 정확히 건드립니다',
    ],
    late: [
      '재판관님, 그 질문에는 더는 피하지 않고 답하겠습니다',
      '재판관님, 그 질문이 제 책임 쪽으로 이어지는 점을 인정합니다',
      '재판관님, 그 질문을 피하면 사실 정리가 되지 않는다는 점을 압니다',
    ],
  }
  const detail = [
    '질문 요지는 쟁점의 경위와 책임 비율을 분리하라는 뜻으로 이해하겠습니다',
    `${partyNoun(party)} 입장과 ${otherPartyNoun(party)} 조치를 함께 놓고 보셔야 합니다`,
    '단서 하나로 결론을 닫지 말고 앞뒤 기록을 함께 보아 주십시오',
  ]
  const lateExtra = [
    '이 지적을 피하지 않고 답드리겠습니다',
    '이 질문이 제 책임 쪽으로 이어지는 점은 알고 있습니다',
    '이제는 해당 질문을 정면으로 설명드리겠습니다',
  ]
  const parts = [openings[band][variantIndex]]
  if (band !== 'early') parts.push(detail[variantIndex])
  if (band === 'late') parts.push(lateExtra[variantIndex])
  const adjustedParts = parts.map((piece) => piece.replace(otherPartyNoun(party), counterpartyRef))
  return ensureJudgeAddress(paragraph(adjustedParts))
}

function makeWitnessText({ witness, depth, variantIndex }) {
  const judgeAddress = cleanSentence(witness?.witnessProfile?.addressJudge || witness?.addressJudge || '재판관님')
  const scopeLabel = witness?.witnessedDirectly
    ? '자신이 직접 확인한 범위'
    : '직접 본 장면과 전해 들은 정황이 섞인 범위'
  const openings = {
    vague: [
      `${witness.name} 증인은 사건을 멀리서 보았다고 진술합니다`,
      `${witness.name} 증인은 핵심 장면보다 주변 정황을 기억한다고 진술합니다`,
      `${witness.name} 증인은 직접 목격과 전해 들은 내용을 구분해 말합니다`,
    ],
    partial: [
      `${witness.name} 증인은 일부 장면을 직접 보았고 나머지는 정황으로 정리합니다`,
      `${witness.name} 증인은 자신의 관찰 범위를 한정하면서도 중요한 순서를 짚습니다`,
      `${witness.name} 증인은 당사자 말보다 본인이 확인한 부분을 중심으로 진술합니다`,
    ],
    full: [
      `${witness.name} 증인은 시점과 경위를 비교적 또렷하게 설명합니다`,
      `${witness.name} 증인은 사건 흐름을 단계별로 나누어 진술합니다`,
      `${witness.name} 증인은 누가 무엇을 먼저 했는지까지 분리해서 설명합니다`,
    ],
  }
  const closings = {
    vague: [
      `${scopeLabel} 정도까지만 확실하다고 진술합니다`,
      '단정은 피하지만 분위기와 방향은 분명했다고 말합니다',
      '직접 본 부분과 추정 부분을 나누어 진술합니다',
    ],
    partial: [
      `${scopeLabel} 안에서 직접 확인한 부분만 진술합니다`,
      '중간에 빠진 장면이 있어도 앞뒤 맥락은 연결된다고 말합니다',
      '확신하지 못하는 부분은 유보하면서 핵심 장면은 유지합니다',
    ],
    full: [
      `${scopeLabel} 전체를 비교적 선명하게 기억한다고 진술합니다`,
      '감정 평가보다 순서와 행동을 먼저 적어 달라고 요청합니다',
      '당사자 해석과 별개로 자신이 본 사실을 또렷하게 남깁니다',
    ],
  }
  const count = depth === 'vague' ? 1 : depth === 'partial' ? 2 : 3
  return ensureJudgeAddress(paragraph([openings[depth][variantIndex], closings[depth][variantIndex]].slice(0, count)), judgeAddress)
}

function makeWitnessText({ witness, depth, variantIndex }) {
  const judgeAddress = cleanSentence(witness?.witnessProfile?.addressJudge || witness?.addressJudge || '\uC7AC\uD310\uAD00\uB2D8')
  const scopeLabel = witness?.witnessedDirectly
    ? '\uC790\uC2E0\uC774 \uC9C1\uC811 \uD655\uC778\uD55C \uBC94\uC704'
    : '\uC9C1\uC811 \uBCF8 \uC7A5\uBA74\uACFC \uC804\uD574 \uB4E4\uC740 \uC815\uD669\uC744 \uB098\uB220 \uB9D0\uD560 \uBC94\uC704'
  const statements = {
    vague: [
      `${witness.name} \uC99D\uC778\uC740 ${scopeLabel}\uC5D0\uC11C \uC9C1\uC811 \uBCF8 \uC7A5\uBA74\uB9CC \uC9E7\uAC8C \uD655\uC778\uD558\uBA70 \uCD94\uC815\uC740 \uD558\uC9C0 \uC54A\uB294\uB2E4\uACE0 \uC9C4\uC220\uD569\uB2C8\uB2E4.`,
      `${witness.name} \uC99D\uC778\uC740 ${scopeLabel}\uB97C \uB118\uB294 \uBD80\uBD84\uC740 \uB2E8\uC815\uD558\uC9C0 \uC54A\uACE0 \uC790\uC2E0\uC774 \uBCF8 \uBC94\uC704\uB9CC \uB9D0\uD55C\uB2E4\uACE0 \uC9C4\uC220\uD569\uB2C8\uB2E4.`,
      `${witness.name} \uC99D\uC778\uC740 ${scopeLabel}\uC5D0 \uD55C\uC815\uD574 \uC9C1\uC811 \uD655\uC778\uD55C \uC0AC\uC2E4\uB9CC \uB0A8\uAE30\uACA0\uB2E4\uACE0 \uC9C4\uC220\uD569\uB2C8\uB2E4.`,
    ],
    partial: [
      `${witness.name} \uC99D\uC778\uC740 \uC77C\uBD80 \uC7A5\uBA74\uC740 \uC9C1\uC811 \uBD24\uACE0 \uB098\uBA38\uC9C0\uB294 \uC815\uD669\uC73C\uB85C \uC774\uC5B4 \uBCF8\uB2E4\uACE0 \uC9C4\uC220\uD569\uB2C8\uB2E4. ${scopeLabel}\uC5D0 \uB4E4\uC5B4\uC624\uB294 \uBD80\uBD84\uB9CC \uD655\uC815\uC801\uC73C\uB85C \uB9D0\uD55C\uB2E4\uACE0 \uB367\uBD99\uC785\uB2C8\uB2E4.`,
      `${witness.name} \uC99D\uC778\uC740 \uC790\uC2E0\uC774 \uBCF8 \uC21C\uC11C\uB97C \uC911\uC2EC\uC73C\uB85C \uC9C4\uC220\uD569\uB2C8\uB2E4. \uB2E4\uB9CC ${scopeLabel} \uBC16\uC758 \uACF5\uBC31\uC740 \uCD94\uCE21\uC73C\uB85C \uCC44\uC6B0\uC9C0 \uC54A\uACA0\uB2E4\uACE0 \uB9D0\uD569\uB2C8\uB2E4.`,
      `${witness.name} \uC99D\uC778\uC740 \uB2F9\uC0AC\uC790 \uB9D0\uBCF4\uB2E4 \uBCF8\uC778\uC774 \uD655\uC778\uD55C \uBD80\uBD84\uC744 \uC6B0\uC120\uD574 \uC9C4\uC220\uD569\uB2C8\uB2E4. \uADF8\uB9AC\uACE0 ${scopeLabel}\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 \uBD80\uBD84\uC740 \uBCF4\uB958\uD574\uC57C \uD55C\uB2E4\uACE0 \uC815\uB9AC\uD569\uB2C8\uB2E4.`,
    ],
    full: [
      `${witness.name} \uC99D\uC778\uC740 \uC0AC\uAC74 \uD750\uB984\uC744 \uC2DC\uC810\uBCC4\uB85C \uB098\uB204\uC5B4 \uC124\uBA85\uD569\uB2C8\uB2E4. ${scopeLabel}\uC5D0 \uB4E4\uC5B4\uC628 \uC7A5\uBA74\uACFC \uC804\uD574 \uB4E4\uC740 \uBD80\uBD84\uC744 \uAD6C\uBD84\uD574 \uC9C4\uC220\uD569\uB2C8\uB2E4. \uB9C8\uC9C0\uB9C9\uC73C\uB85C \uB204\uAC00 \uBA3C\uC800 \uD589\uB3D9\uD588\uB294\uC9C0\uAE4C\uC9C0 \uB2E8\uACC4\uBCC4\uB85C \uC815\uB9AC\uD569\uB2C8\uB2E4.`,
      `${witness.name} \uC99D\uC778\uC740 \uC790\uC2E0\uC774 \uD655\uC778\uD55C \uC21C\uC11C\uB97C \uBA3C\uC800 \uC81C\uC2DC\uD569\uB2C8\uB2E4. \uADF8 \uB2E4\uC74C ${scopeLabel}\uC5D0\uC11C \uBC17\uC5B4\uB09C \uACF5\uBC31\uACFC \uC624\uD574 \uAC00\uB2A5\uC131\uC744 \uAC19\uC774 \uC9DA\uC2B5\uB2C8\uB2E4. \uADF8\uB9AC\uACE0 \uC9C1\uC811 \uBCF8 \uBD80\uBD84\uACFC \uAC04\uC811 \uC815\uBCF4\uB97C \uB098\uB220 \uCC45\uC784 \uBE44\uC911\uC744 \uC124\uBA85\uD569\uB2C8\uB2E4.`,
      `${witness.name} \uC99D\uC778\uC740 \uC2DC\uC810\uACFC \uACBD\uC704\uB97C \uBE44\uAD50\uC801 \uB610\uB837\uD558\uAC8C \uBCC0\uBCC4\uD569\uB2C8\uB2E4. ${scopeLabel}\uC5D0 \uD3EC\uD568\uB41C \uAD00\uCC30\uC740 \uC2E4\uC81C \uD589\uB3D9 \uB2E8\uACC4\uC5D0 \uB9DE\uCD94\uC5B4 \uC124\uBA85\uD569\uB2C8\uB2E4. \uD655\uC2E0\uD560 \uC218 \uC5C6\uB294 \uBD80\uBD84\uC740 \uCD94\uC815\uC73C\uB85C \uB0A8\uACA8 \uB458 \uC120\uC744 \uADF8\uC5B4 \uC9C4\uC220\uD569\uB2C8\uB2E4.`,
    ],
  }
  return ensureJudgeAddress(statements[depth][variantIndex], judgeAddress)
}

function makeAftermathText(runtimeCase, resultClass, variantIndex) {
  const focusA = disputeLabel((runtimeCase?.disputes || [])[0] || { id: 'd-1', name: '핵심 쟁점' })
  const focusB = disputeLabel((runtimeCase?.disputes || [])[1] || { id: 'd-2', name: '후속 쟁점' })
  const solutionKeys = Object.keys(runtimeCase?.solutions || {})
  const solutionFocus = solutionKeys[variantIndex % Math.max(solutionKeys.length, 1)] || '정리'
  const byClass = {
    a_primary_fault: [
      `재판관은 ${focusA}에서 본인 측 책임을 더 무겁게 적습니다. 다만 상대방 측 조치도 별도로 기록합니다`,
      `결론은 본인 측 과실 중심입니다. ${focusB}과 ${solutionFocus} 처리에서 사건 구조가 단선적이지 않다는 점도 함께 남깁니다`,
    ],
    b_primary_fault: [
      `재판관은 ${focusA}에서 상대방 측 책임을 더 무겁게 적습니다. 다만 본인 측 대응도 면제하지 않습니다`,
      `결론은 상대방 측 관리 책임 중심입니다. ${focusB}과 ${solutionFocus} 방향도 함께 기록합니다`,
    ],
    shared_fault: [
      `재판관은 ${focusA}과 ${focusB}에서 양측이 서로 다른 방식으로 사건을 키웠다고 정리합니다. 책임은 분리되지만 함께 남습니다`,
      `결론은 쌍방 책임입니다. 한쪽의 위반과 다른 쪽의 대응 실패가 ${solutionFocus} 처리와 맞물린 구조로 기록됩니다`,
    ],
    protective_resolution: [
      `재판관은 ${focusA}과 관련한 추가 피해 방지와 보호 조치를 우선합니다. 공개 비난보다 정리와 차단이 먼저라고 적습니다`,
      `결론은 보호 우선입니다. ${solutionFocus} 선택을 유지하되 2차 피해를 줄이는 방식으로 정리됩니다`,
    ],
    procedural_caution: [
      `재판관은 ${focusB}에서 사실뿐 아니라 절차와 기록 체계의 붕괴를 함께 문제 삼습니다. 같은 방식의 재발을 막는 조치를 남깁니다`,
      `결론은 절차 주의입니다. ${solutionFocus}보다 앞서 어떤 선이 무너졌는지에 무게를 둡니다`,
    ],
  }
  return byClass[resultClass][variantIndex]
}

function makeSystemText(key, variantIndex) {
  const map = {
    'interrogation|repeat_warning': [
      '같은 각도의 질문이 반복되고 있습니다. 사실, 동기, 감정 중 다른 축으로 전환해 주십시오',
      '반복 추궁 경고입니다. 새로운 기록이나 다른 질문 각도를 선택해 주십시오',
    ],
    'evidence|new_unlock': [
      '새 조사 결과가 열렸습니다. 이제는 표면 인상보다 출처와 맥락을 함께 보셔야 합니다',
      '새 증거가 열렸습니다. 방금 확보한 기록은 책임 비율 계산에 직접 연결됩니다',
    ],
    'evidence|trap_notice': [
      '주의가 필요한 증거입니다. 취득 경위와 해석 범위를 먼저 점검해 주십시오',
      '함정 가능성이 있는 자료입니다. 단편 장면만으로 결론을 닫지 마십시오',
    ],
    'dossier|challenge_cleared': [
      '카드 질문이 정리되었습니다. 방금 확보한 조각은 다음 추궁의 기준이 됩니다',
      '도시어 정리가 끝났습니다. 이제 책임 비율을 더 직접적으로 물을 수 있습니다',
    ],
    'witness|credibility_shift': [
      '증언의 신뢰도가 조정되었습니다. 관찰 사실과 추정을 구분해 읽어 주십시오',
      '증언 해석 기준이 바뀌었습니다. 같은 문장도 지금은 무게가 다릅니다',
    ],
    'verdict|profile_update': [
      '이번 판단은 재판관 프로필에 반영됩니다. 책임, 보호, 절차 중 어디에 무게를 두었는지가 기록됩니다',
      '결정 성향이 갱신됩니다. 이번 사건의 판단 방식이 다음 사건 기준점으로 남습니다',
    ],
  }
  return map[key][variantIndex]
}

function getDossierQuestions(v3) {
  const questions = []
  for (const card of v3.dossierCards || []) {
    for (const challenge of card.challenges || []) {
      for (const question of challenge.questions || []) {
        questions.push({
          id: question.id,
          text: question.text,
          targetParty: challenge.targetParty,
        })
      }
    }
  }
  return questions
}

function normalizeHumanRole(roleText) {
  return cleanSentence(roleText || '')
    .replace(/^(해당|상대|그)\s+/u, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function withParticle(text, withBatchimParticle, withoutBatchimParticle) {
  const cleaned = cleanSentence(text || '')
  if (!cleaned) return ''
  return `${cleaned}${hasBatchim(cleaned) ? withBatchimParticle : withoutBatchimParticle}`
}

function subjectRef(text) {
  return withParticle(text, '이', '가')
}

function topicRef(text) {
  return withParticle(text, '은', '는')
}

function objectRef(text) {
  return withParticle(text, '을', '를')
}

function possessiveRef(text) {
  return withParticle(text, '의', '의')
}

function firstClause(text, maxLength = 72) {
  const cleaned = cleanSentence(text || '')
    .replace(/[`"'“”‘’]/gu, '')
    .replace(/^\S+\.\s*/u, '')
    .trim()
  if (!cleaned) return ''
  const primary = cleaned.split(/(?<=[.!?])\s+|[.。]|(?:다만|그리고|하지만|그러나)\s+/u)[0].trim()
  const clipped = primary.length > maxLength ? primary.slice(0, maxLength).trim() : primary
  return clipped.replace(/[.,;:]+$/u, '').trim()
}

function cleanQuestionCue(text) {
  return cleanSentence(text || '')
    .replace(/^재판관님[, ]*/u, '')
    .replace(/^재판장님[, ]*/u, '')
    .replace(/(설명해\s*주시겠습니까|설명해\s*주십시오|답해\s*주시겠습니까|답해\s*주십시오|말씀해\s*주시겠습니까|말씀해\s*주십시오|정리해\s*주시겠습니까|정리해\s*주십시오)\??$/u, '')
    .replace(/[?？]+$/u, '')
    .trim()
}

function solutionLabel(solutionKey) {
  return cleanSentence(String(solutionKey || '정리안'))
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function disputeLabel(dispute) {
  const base = cleanSentence(dispute?.name || dispute?.judgmentStatement || dispute?.id || '핵심 쟁점')
    .replace(/^\s*[AB]측의?\s*/u, '')
    .replace(/[?？]+$/u, '')
    .trim()
  return base || '핵심 쟁점'
}

function disputeDetailCue(dispute) {
  return firstClause(dispute?.truthDescription || dispute?.judgmentStatement || disputeLabel(dispute), 84)
}

function evidenceDetailCue(evidence) {
  const label = cleanSentence(evidence?.surfaceName || evidence?.name || '')
  const candidates = [
    evidence?.investigationResults?.restore_context,
    evidence?.investigationResults?.check_metadata,
    evidence?.investigationResults?.note_a,
    evidence?.investigationResults?.request_original,
    evidence?.description,
    evidence?.surfaceDescription,
  ]
    .map((item) => firstClause(item, 90))
    .filter(Boolean)
    .map((item) => item.replace(new RegExp(`^${label}[. ]*`, 'u'), '').trim())
  return candidates[0] || label || '기록의 실제 맥락'
}

function relatedEvidenceCue(runtimeCase, dispute) {
  const evidence = (runtimeCase?.evidence || []).find((item) => Array.isArray(item?.proves) && item.proves.includes(dispute?.id))
  return evidence ? evidenceDetailCue(evidence) : ''
}

function witnessFactCue(runtimeCase, witness) {
  const disputeMap = new Map((runtimeCase?.disputes || []).map((item) => [item.id, item]))
  const related = (witness?.relatedDisputeIds || [])
    .map((id) => disputeMap.get(id))
    .filter(Boolean)
    .map((item) => disputeLabel(item))
    .slice(0, 2)
  const scope = firstClause(witness?.knowledgeScope || witness?.witnessProfile?.speechStyle || '', 84)
  if (scope && related.length > 0) return `${scope}. 특히 ${joinWithAnd(related[0], related[1] || related[0])} 쪽 장면을 기억하고 있습니다`
  if (scope) return scope
  if (related.length > 0) return `${joinWithAnd(related[0], related[1] || related[0])} 쪽 장면을 중심으로 말합니다`
  return `${witness?.name || '증인'}이 직접 확인한 장면`
}

function relationshipFalloutCue(runtimeCase) {
  const relationshipType = runtimeCase?.duo?.relationshipType || runtimeCase?.meta?.relationshipType || 'headline'
  const map = {
    spouse: '이 결정 뒤에도 부부 사이의 회복 여부가 남습니다',
    family: '가족 안에서 누가 돌봄과 책임을 다시 맡을지가 남습니다',
    friend: '관계 회복보다 신뢰 회수가 가능한지가 남습니다',
    neighbor: '같은 공간에서 계속 마주쳐야 한다는 후유증이 남습니다',
    partnership: '동업을 이어 갈지 정리할지 선택이 남습니다',
    tenant_landlord: '거주와 계약을 계속 이어 갈지 정리할지 후속 조치가 남습니다',
    boss_employee: '조직 안에서 함께 일할 수 있는지, 분리해야 하는지가 남습니다',
    civic: '행정 절차를 다시 열지, 이의 제기로 갈지 후속 선택이 남습니다',
    professional: '업무 관계를 다시 맺을지 손절할지 판단이 남습니다',
    online: '플랫폼 기록 정정과 공개 설명의 범위가 남습니다',
    headline: '공개 해명과 비공개 보호 사이의 선택이 남습니다',
  }
  return map[relationshipType] || '사건 이후의 후속 조치와 관계 정리가 남습니다'
}

function naturalCounterpartyJudgeReference(runtimeCase, party) {
  const other = party === 'a' ? runtimeCase?.duo?.partyB : runtimeCase?.duo?.partyA
  const relationshipType = runtimeCase?.duo?.relationshipType || runtimeCase?.meta?.relationshipType || 'headline'
  const partnerTerm = cleanSentence((party === 'a' ? runtimeCase?.duo?.partyA : runtimeCase?.duo?.partyB)?.callTerms?.toPartner || '')
  const normalizedRole = normalizeHumanRole(other?.occupation || other?.role || partnerTerm)

  if (relationshipType === 'spouse') return '제 배우자'
  if (relationshipType === 'family') return normalizedRole.includes('아버지') || normalizedRole.includes('어머니') ? normalizedRole : '저희 가족'
  if (relationshipType === 'friend') return '제 친구'
  if (relationshipType === 'neighbor') return '옆집 분'
  if (relationshipType === 'partnership') return '제 동업자'
  if (relationshipType === 'tenant_landlord') {
    if (/(집주인|임대인|건물주|임대관리)/u.test(normalizedRole)) return '집주인'
    if (/(세입자|임차인)/u.test(normalizedRole)) return '세입자'
    return '상대 임대차 당사자'
  }

  if (normalizedRole) {
    if (/(대표|CEO|CFO|팀장|실장|본부장|부장|과장|대리|매니저|리드|조사관|심사관|심사위원|담당자|운영자|상담사|디자이너|개발자|엔지니어|직원|리크루터|오퍼레이터|관리자|사장|이사|기자|평가자)/u.test(normalizedRole)) {
      return `그 ${normalizedRole}`
    }
    return normalizedRole
  }

  return relationshipType === 'boss_employee' ? '상대 당사자' : '그 사람'
}

function counterpartyJudgeReference(runtimeCase, party) {
  const speaker = party === 'a' ? runtimeCase?.duo?.partyA : runtimeCase?.duo?.partyB
  const preferred = cleanSentence(speaker?.callTerms?.toJudge || '')
  if (
    preferred &&
    !/^해당\s/u.test(preferred) &&
    !looksLikeJudgeAddress(preferred) &&
    !containsFalseAmountToken(preferred) &&
    !VALIDATOR_AMOUNT_RE.test(preferred)
  ) {
    return normalizeHumanRole(preferred)
  }
  return naturalCounterpartyJudgeReference(runtimeCase, party)
}

function makeInterrogationText({ runtimeCase, dispute, party, state, qtype, variantIndex, forbiddenTokens }) {
  const counterpartyRef = counterpartyJudgeReference(runtimeCase, party)
  const isMonetaryDispute = new Set(runtimeCase?.monetaryDisputeIds || []).has(dispute?.id)
  const allowConcreteAmount = isMonetaryDispute && state === 'S5'
  const disputeRef = scrubSurfaceText(disputeLabel(dispute), {
    allowMonetaryTerms: isMonetaryDispute,
    allowConcreteAmount,
    fallback: '핵심 쟁점',
  })
  const disputeCue = scrubSurfaceText(disputeDetailCue(dispute), {
    allowMonetaryTerms: isMonetaryDispute,
    allowConcreteAmount,
    fallback: `${disputeRef}의 실제 경위`,
  })
  const evidenceRef = scrubSurfaceText(relatedEvidenceLabel(runtimeCase, dispute, forbiddenTokens), {
    allowMonetaryTerms: isMonetaryDispute,
    allowConcreteAmount,
    fallback: '관련 기록',
  })
  const evidenceCue = scrubSurfaceText(relatedEvidenceCue(runtimeCase, dispute), {
    allowMonetaryTerms: isMonetaryDispute,
    allowConcreteAmount,
    fallback: `${evidenceRef}에 적힌 맥락`,
  })

  const families = {
    S0: {
      fact_pursuit: [
        `재판관님, 지금 먼저 가려야 할 것은 ${disputeRef}입니다. ${evidenceCue}가 빠진 채 표면만 잡으면 ${possessiveRef(counterpartyRef)} 주장과 제 대응이 함께 왜곡됩니다.`,
        `재판관님, ${disputeRef}라는 의심은 이해합니다. 다만 ${evidenceRef}에 남은 순서와 ${disputeCue}를 같이 보셔야 섣부른 단정이 멈춥니다.`,
        `재판관님, 이 부분은 아직 제 잘못으로 바로 닫을 단계가 아닙니다. ${evidenceCue}를 먼저 세우고 나서야 누가 무엇을 숨겼는지 갈라집니다.`,
        `재판관님, ${disputeRef}은 겉장면보다 시간 순서를 복원해야 합니다. ${evidenceRef}가 보여 주는 실제 흐름부터 다시 짚어 주십시오.`,
        `재판관님, 지금 보신 장면만으로는 ${disputeRef}를 확정하기 어렵습니다. ${evidenceCue}와 ${possessiveRef(counterpartyRef)} 해석이 어디서 갈렸는지 먼저 봐 주십시오.`,
      ],
      motive_search: [
        `재판관님, ${disputeRef}에서 제가 왜 그 선택을 했는지까지 보셔야 합니다. ${evidenceCue}를 빼면 행동의 이유가 통째로 사라집니다.`,
        `재판관님, 이 쟁점은 행동만 떼어 놓고 보면 오해가 커집니다. ${disputeCue}와 ${possessiveRef(counterpartyRef)} 압박이 같이 놓여야 이유가 보입니다.`,
        `재판관님, ${evidenceRef}를 보면 결과만 남아 보이겠지만 실제로는 ${disputeCue}가 선행됐습니다. 동기와 경위를 나누지 않으면 사건이 납작해집니다.`,
        `재판관님, ${disputeRef}은 누가 더 악의적이었는지보다 왜 그런 판단이 나왔는지부터 따져야 합니다. ${evidenceCue}가 그 출발점입니다.`,
        `재판관님, 제 대응이 거칠어 보였을 수는 있습니다. 그래도 ${evidenceRef}와 ${disputeCue}를 같이 보면 단순한 핑계로만 보이진 않을 것입니다.`,
      ],
      empathy_approach: [
        `재판관님, ${disputeRef}은 한순간의 태도보다 그때의 압박을 같이 봐야 합니다. ${evidenceCue}를 빼면 불안과 책임이 한 덩어리로 엉켜 버립니다.`,
        `재판관님, 이 부분에서 제가 흔들린 건 사실입니다. 그렇더라도 ${evidenceRef}와 ${disputeCue}를 함께 보셔야 설명이 끊기지 않습니다.`,
        `재판관님, ${disputeRef}은 감정이 개입된 장면이라 표면만 보면 거칠게 보일 수 있습니다. ${evidenceCue}가 붙어야 왜 그렇게 무너졌는지 읽힙니다.`,
        `재판관님, 제가 그 순간 냉정하지 못했던 건 맞습니다. 다만 ${disputeCue}를 빼고 보면 지금의 판단도 지나치게 차갑게 굳습니다.`,
        `재판관님, ${evidenceRef}에 적힌 흐름을 함께 봐 주십시오. 그래야 ${disputeRef}에서 남은 불안과 실제 책임을 나눌 수 있습니다.`,
      ],
    },
    S1: {
      fact_pursuit: [
        `재판관님, ${disputeRef}에서 제가 불리해 보인다는 점은 압니다. 그래도 ${evidenceCue}를 같이 보셔야 어디까지가 사실이고 어디부터가 해석인지 가려집니다.`,
        `재판관님, 이 쟁점에서 설명이 부족했던 건 인정합니다. 하지만 ${evidenceRef}와 ${disputeCue}를 묶어 보시면 단순 은폐로만 읽히지는 않습니다.`,
        `재판관님, ${disputeRef} 정황이 의심을 키운 건 맞습니다. 다만 ${evidenceCue}를 빼면 제가 감당한 맥락이 통째로 사라집니다.`,
        `재판관님, 겉으로는 제가 먼저 선을 넘은 것처럼 보일 수 있습니다. 그래도 ${evidenceRef}에 남은 순서를 확인해 보시면 판단이 조금 달라질 것입니다.`,
        `재판관님, 이 단계에서 필요한 건 낙인이 아니라 정리입니다. ${disputeCue}와 ${possessiveRef(counterpartyRef)} 반응을 함께 놓고 봐 주십시오.`,
      ],
      motive_search: [
        `재판관님, ${disputeRef}은 행동의 이유를 묻지 않으면 설명이 반쯤 비어 버립니다. ${evidenceCue}를 보면 왜 제가 그렇게 버텼는지부터 보입니다.`,
        `재판관님, 저는 이 부분을 숨기기보다 버티려 했습니다. ${disputeCue}와 ${possessiveRef(counterpartyRef)} 선택이 부딪친 이유를 같이 보셔야 합니다.`,
        `재판관님, ${evidenceRef}가 불리한 장면만 남긴 건 맞습니다. 그렇더라도 ${disputeRef}의 동기를 먼저 분리하지 않으면 책임 비율이 틀어집니다.`,
        `재판관님, 이 쟁점은 결과보다 배경이 먼저입니다. ${evidenceCue}를 붙여 보면 제 판단이 왜 거칠어졌는지 선이 보입니다.`,
        `재판관님, ${disputeRef}을 단순 핑계로만 보면 사건 구조가 잘립니다. ${evidenceRef}에 남은 맥락을 먼저 확인해 주십시오.`,
      ],
      empathy_approach: [
        `재판관님, ${disputeRef}은 책임을 피하려는 말로만 들릴 수 있다는 점을 압니다. 그래도 ${evidenceCue}가 붙어야 그때의 흔들림을 설명할 수 있습니다.`,
        `재판관님, 저는 이 부분에서 이미 무너지고 있었습니다. ${evidenceRef}와 ${disputeCue}를 함께 놓아야 불안과 잘못이 각각 보입니다.`,
        `재판관님, ${possessiveRef(counterpartyRef)} 반응과 제 감정이 맞물리면서 더 나쁜 선택이 나왔습니다. 그 연결고리를 ${evidenceCue}가 보여 줍니다.`,
        `재판관님, 이 쟁점은 차갑게만 재면 설명이 떨어져 나갑니다. ${disputeCue}까지 같이 보시면 왜 제가 끝내 선을 넘었는지 읽힙니다.`,
        `재판관님, ${evidenceRef}를 보면 제가 왜 그때 과하게 방어했는지도 드러납니다. 불안과 책임을 한 덩어리로 보지 말아 주십시오.`,
      ],
    },
    S2: {
      fact_pursuit: [
        `재판관님, ${disputeRef}에서 제 대응이 부정확했던 부분은 인정합니다. 그렇더라도 ${evidenceCue}까지 보면 누가 어떤 사실을 비틀었는지는 따로 남습니다.`,
        `재판관님, 이 쟁점에서 제 잘못이 있었다는 점은 부인하지 않겠습니다. 다만 ${evidenceRef}가 보여 주는 순서를 보면 책임이 제 쪽에만 머물진 않습니다.`,
        `재판관님, ${disputeCue}를 보면 제가 설명을 늦춘 책임이 있습니다. 그래도 ${possessiveRef(counterpartyRef)} 판단이 어디서 과열됐는지도 함께 보셔야 합니다.`,
        `재판관님, ${evidenceRef}를 보면 제가 선을 넘은 지점과 아닌 지점이 갈립니다. 그 선을 나누어야 ${disputeRef}의 비율이 맞습니다.`,
        `재판관님, 저는 이 부분을 더 빨리 정리했어야 했습니다. 그렇지만 ${evidenceCue}를 붙이면 사건의 남은 책임도 같이 드러납니다.`,
      ],
      motive_search: [
        `재판관님, ${disputeRef}에서 제 선택이 상황을 악화시킨 건 맞습니다. 그래도 ${evidenceCue}를 보면 왜 그 판단이 나왔는지까지 같이 읽힙니다.`,
        `재판관님, 저는 이 부분에서 방어가 앞섰습니다. 다만 ${disputeCue}와 ${possessiveRef(counterpartyRef)} 압박을 보면 동기까지 단순하게 자를 수는 없습니다.`,
        `재판관님, ${evidenceRef}는 제 책임을 숨겨 주지 않습니다. 대신 ${disputeRef}이 단순 악의가 아니라 계산과 불안이 섞인 선택이었다는 점도 남겨 둡니다.`,
        `재판관님, 제가 한 설명이 뒤늦었다는 비판은 감수하겠습니다. 그래도 ${evidenceCue}가 보여 주는 배경까지 빠지면 사건이 너무 단선적이 됩니다.`,
        `재판관님, ${disputeRef}의 동기를 따로 떼어 보셔야 합니다. 그래야 제 잘못과 ${possessiveRef(counterpartyRef)} 대응이 어떤 식으로 맞물렸는지 보입니다.`,
      ],
      empathy_approach: [
        `재판관님, ${disputeRef}에서 제 감정이 판단을 흐렸다는 점은 인정합니다. 그래도 ${evidenceCue}가 없으면 왜 그 순간 무너졌는지는 설명되지 않습니다.`,
        `재판관님, 저는 이 부분을 냉정하게 버티지 못했습니다. 다만 ${evidenceRef}와 ${disputeCue}를 함께 보면 감정과 책임을 나눠 볼 수 있습니다.`,
        `재판관님, ${possessiveRef(counterpartyRef)} 말이 제 불안을 더 키운 건 사실입니다. 그렇다고 책임을 밀어내려는 것은 아니고, ${evidenceCue}가 그 순서를 남깁니다.`,
        `재판관님, ${disputeRef}에서 제가 과민하게 반응한 건 맞습니다. 그렇더라도 ${evidenceRef}는 그 반응이 어디서 비롯됐는지까지 보여 줍니다.`,
        `재판관님, 이 쟁점은 결과만 보면 제 잘못으로 닫히기 쉽습니다. ${disputeCue}를 함께 보시면 감정이 개입된 방식까지 읽히실 겁니다.`,
      ],
    },
    S3: {
      fact_pursuit: [
        `재판관님, ${disputeRef}을 제 잘못 하나로 닫으면 사건 구조가 잘립니다. ${possessiveRef(counterpartyRef)} 대응과 ${evidenceCue}도 같은 무게로 보셔야 합니다.`,
        `재판관님, 제가 선을 넘은 부분이 있다고 해서 ${possessiveRef(counterpartyRef)} 판단까지 면해지는 것은 아닙니다. ${evidenceRef}가 두 책임을 나눠 보여 줍니다.`,
        `재판관님, 이 쟁점은 제가 감당할 몫과 ${counterpartyRef}가 키운 몫이 동시에 있습니다. ${disputeCue}를 따라가면 그 경계가 드러납니다.`,
        `재판관님, 제 대응이 거칠었다는 점은 감수하겠습니다. 그래도 ${evidenceCue}를 보면 ${counterpartyRef} 쪽 관리 책임도 똑같이 남습니다.`,
        `재판관님, ${disputeRef}은 한쪽만 비난해선 정리되지 않습니다. ${evidenceRef}에 남은 순서대로 두 책임을 함께 짚어 주십시오.`,
      ],
      motive_search: [
        `재판관님, 제 선택에는 분명 책임이 있습니다. 그러나 ${possessiveRef(counterpartyRef)} 선택이 왜 그 압박을 키웠는지까지 보셔야 ${disputeRef}이 설명됩니다.`,
        `재판관님, 제가 계산적으로 움직인 부분이 있었다는 점은 인정합니다. 그렇지만 ${evidenceCue}를 보면 ${counterpartyRef} 역시 결과를 유도한 측면이 남습니다.`,
        `재판관님, ${disputeRef}에서 저만의 동기만 남기면 절반만 본 셈입니다. ${possessiveRef(counterpartyRef)} 이해관계와 ${evidenceRef}가 같은 흐름에 놓여 있습니다.`,
        `재판관님, 저는 이 부분에서 제 이익을 먼저 본 면이 있습니다. 다만 ${counterpartyRef}도 같은 시점에 무엇을 노렸는지 ${evidenceCue}가 보여 줍니다.`,
        `재판관님, 제 판단이 상황을 틀었다는 비판은 피하지 않겠습니다. 그래도 ${disputeCue}를 보면 ${counterpartyRef} 쪽 계산도 따로 분리해야 합니다.`,
      ],
      empathy_approach: [
        `재판관님, 저는 이 부분에서 불안에 흔들렸습니다. 그래도 ${counterpartyRef}가 어떤 말을 던졌는지까지 보셔야 ${disputeRef}의 무게가 균형을 잡습니다.`,
        `재판관님, 제 감정이 대응을 거칠게 만들었다는 점은 인정합니다. 그렇지만 ${evidenceCue}를 보면 ${possessiveRef(counterpartyRef)} 압박 또한 분명히 남습니다.`,
        `재판관님, ${disputeRef}은 제 흔들림만으로 설명되지 않습니다. ${counterpartyRef}의 선택과 ${evidenceRef}가 함께 쌓이며 더 나쁜 결과가 났습니다.`,
        `재판관님, 저는 그 순간 버티지 못했습니다. 다만 ${disputeCue}를 보면 왜 그 감정이 폭발했고 ${counterpartyRef}가 어떤 위치에 있었는지 같이 보입니다.`,
        `재판관님, 제 불안은 책임을 지우는 방패가 아닙니다. 대신 ${evidenceCue}를 보면 ${counterpartyRef}까지 포함한 구조를 빼놓을 수 없다는 점은 분명합니다.`,
      ],
    },
    S4: {
      fact_pursuit: [
        `재판관님, ${disputeRef}이 터질 때 저는 이미 상황을 통제하지 못하고 있었습니다. ${evidenceCue}를 보면 그 무너짐이 어떤 순서로 쌓였는지 보입니다.`,
        `재판관님, 이 부분은 냉정하게 설명했어야 했는데 그러지 못했습니다. ${evidenceRef}에 남은 흐름을 같이 보면 제가 어디서 무너졌는지 읽히실 겁니다.`,
        `재판관님, ${disputeCue}를 마주했을 때 두려움이 먼저 올라왔습니다. 그 흔들림이 잘못을 없애진 않지만, ${evidenceCue}가 배경을 남기고 있습니다.`,
        `재판관님, 저는 이 장면에서 이미 방어와 공포가 뒤엉켜 있었습니다. ${evidenceRef}를 함께 보시면 왜 판단이 더 거칠어졌는지 설명할 수 있습니다.`,
        `재판관님, ${disputeRef}은 결과만 보면 단순해 보일 수 있습니다. 하지만 ${evidenceCue}와 그때의 압박을 같이 놓아야 제가 무너진 이유가 보입니다.`,
      ],
      motive_search: [
        `재판관님, 그 순간 저는 계산보다 생존 쪽으로 기울어 있었습니다. ${evidenceCue}를 보면 왜 그런 선택이 나왔는지 숨기지 않고 말씀드릴 수 있습니다.`,
        `재판관님, ${disputeRef}에서 저는 버티는 쪽만 생각했습니다. 다만 ${evidenceRef}를 보면 그 선택이 얼마나 비틀려 있었는지도 함께 드러납니다.`,
        `재판관님, 제가 이익을 따져 움직인 건 맞지만 그 배경엔 압박도 있었습니다. ${disputeCue}와 ${possessiveRef(counterpartyRef)} 대응을 같이 보셔야 합니다.`,
        `재판관님, 그때의 판단은 차갑게 계산된 결정이라기보다 몰린 끝의 선택에 가까웠습니다. ${evidenceCue}가 그 상태를 그대로 남기고 있습니다.`,
        `재판관님, 저는 이 부분에서 겁이 났고 그래서 더 나쁜 선택을 했습니다. ${evidenceRef}를 보면 동기와 흔들림이 어떻게 엉켰는지 보입니다.`,
      ],
      empathy_approach: [
        `재판관님, ${disputeRef}을 마주하던 순간의 저는 버티는 척만 하고 있었습니다. ${evidenceCue}를 보면 불안이 어떻게 판단을 눌렀는지 감출 수 없습니다.`,
        `재판관님, 저는 그때 이미 무너지고 있었습니다. ${evidenceRef}와 ${disputeCue}를 같이 보시면 감정의 흔들림과 실제 책임을 함께 읽으실 수 있습니다.`,
        `재판관님, 제 감정이 대응을 망쳤다는 점은 피하지 않겠습니다. 다만 ${counterpartyRef}와 부딪치던 압박까지 빠지면 설명이 너무 차갑게 굳습니다.`,
        `재판관님, 그 순간의 저는 방어와 공포를 구분하지 못했습니다. ${evidenceCue}가 그 상태를 남겨 두었으니 그 부분까지 봐 주십시오.`,
        `재판관님, 저는 이 장면을 아직도 또렷하게 기억합니다. ${disputeCue}가 보여 주는 건 잘못뿐 아니라 무너지는 과정이기도 합니다.`,
      ],
    },
    S5: {
      fact_pursuit: [
        `재판관님, ${disputeRef}에 관한 제 책임을 더는 숨기지 않겠습니다. ${evidenceCue}를 알고도 저는 설명을 늦추거나 비틀었습니다. 그 결과 사건이 지금의 형태로 커졌습니다.`,
        `재판관님, 이 쟁점은 결국 제 잘못이라고 인정하겠습니다. ${evidenceRef}가 가리키는 흐름을 제가 외면했고, 그 사이 ${counterpartyRef}와의 충돌도 더 커졌습니다. 이제는 그 순서를 사실대로 적겠습니다.`,
        `재판관님, ${disputeRef}을 여기까지 끌고 온 데 제 책임이 있습니다. ${evidenceCue}를 먼저 열었어야 하는데 저는 그렇게 하지 않았습니다. 그 점을 분명히 인정합니다.`,
        `재판관님, 저는 이 부분에서 변명 대신 인정부터 하겠습니다. ${evidenceRef}와 ${disputeCue}를 알고도 제대로 정리하지 않았고, 그것이 사건을 악화시켰습니다. 제 몫은 제 몫대로 적어 주십시오.`,
        `재판관님, ${disputeRef}에 대한 사실을 더 미루지 않겠습니다. 제가 숨기거나 늦춘 설명이 있었고, ${evidenceCue}를 제때 꺼내지 못했습니다. 지금은 그 책임을 받아들이겠습니다.`,
      ],
      motive_search: [
        `재판관님, 제 선택에 계산이 섞여 있었다는 점을 인정합니다. ${evidenceCue}를 알면서도 제게 유리한 쪽으로만 설명하려 했습니다. 그 책임을 지금 분명히 적겠습니다.`,
        `재판관님, 저는 ${disputeRef}에서 제 이익을 먼저 봤습니다. ${evidenceRef}가 보여 주는 맥락을 알고도 방어를 택했습니다. 그 점은 변명하지 않겠습니다.`,
        `재판관님, 이 부분은 실수라기보다 선택이었습니다. ${disputeCue}를 알면서도 저는 손해를 피하는 쪽으로 움직였습니다. 그래서 지금의 책임을 인정합니다.`,
        `재판관님, 제 동기가 깨끗했다고 말할 수는 없습니다. ${evidenceCue}를 알던 상태에서 제 계산이 들어갔고, 그 탓에 ${counterpartyRef}와의 충돌도 커졌습니다. 그 점을 인정합니다.`,
        `재판관님, 저는 이 쟁점에서 제 몫을 숨기려 했습니다. ${evidenceRef}가 가리키는 방향을 알고도 다른 해석으로 돌리려 했습니다. 그 책임을 더 미루지 않겠습니다.`,
      ],
      empathy_approach: [
        `재판관님, 저는 그때 불안에 눌려 있었지만 그게 면책이 되지는 않습니다. ${evidenceCue}를 알고도 제대로 말하지 못했고, 그 결과 ${disputeRef}이 더 커졌습니다. 제 책임을 인정합니다.`,
        `재판관님, 감정이 흔들렸다는 말로 숨지 않겠습니다. ${evidenceRef}에 남은 사실을 알고도 저는 정면으로 마주하지 못했습니다. 그래서 지금 이 잘못을 제 몫으로 적겠습니다.`,
        `재판관님, 저는 무너진 상태였고 그래서 더 나쁜 선택을 했습니다. ${disputeCue}를 알면서도 책임 있게 설명하지 못했습니다. 그 부분은 분명히 제 잘못입니다.`,
        `재판관님, 저는 그 순간의 공포를 설명할 수는 있어도 변명으로 쓰지는 않겠습니다. ${evidenceCue}를 알고도 회피했고, 그 회피가 사건을 악화시켰습니다. 지금은 인정하겠습니다.`,
        `재판관님, 저는 이 장면에서 이미 흔들리고 있었습니다. 하지만 ${evidenceRef}가 보여 주는 사실을 제가 늦췄다는 점은 바뀌지 않습니다. 제 책임을 받아들이겠습니다.`,
      ],
    },
  }

  return ensureJudgeAddress(pick(families[state][qtype], variantIndex))
}

function makeEvidenceText({ party, evidence, band, variantIndex, forbiddenTokens, isMonetaryEvidence }) {
  const counterpartyRef = counterpartyJudgeReference({ duo: { partyA: null, partyB: null }, meta: {} }, party)
  const label = evidenceLabel(evidence, forbiddenTokens, isMonetaryEvidence)
  const detail = scrubSurfaceText(evidenceDetailCue(evidence), {
    allowMonetaryTerms: isMonetaryEvidence,
    allowConcreteAmount: band === 'late',
    fallback: `${label}에 담긴 실제 맥락`,
  })
  const sourceCueMap = {
    a: 'A측이 먼저 들고 온 자료',
    b: 'B측이 먼저 들고 온 자료',
    org: '기관 기록',
    third: '제3자 자료',
  }
  const sourceCue = sourceCueMap[evidence?.meta?.source || 'org'] || '관련 자료'
  const subjectCue = evidence?.subjectParty === 'both'
    ? '양쪽 모두에게 불리하거나 유리하게 읽힐 수 있는 자료'
    : evidence?.subjectParty === party ? '지금 제 쪽을 겨누는 자료' : '상대 쪽을 겨누는 자료'

  const families = {
    early: [
      `재판관님, ${label}에는 ${detail}가 같이 들어 있습니다. ${sourceCue}라는 점부터 가린 뒤에야 ${subjectCue}인지 판단할 수 있습니다.`,
      `재판관님, 지금 제시된 ${label}은 표면 의심을 만들 수 있습니다. 하지만 ${detail}를 빼면 이 자료는 절반만 읽은 셈입니다.`,
      `재판관님, ${label}만 덜어 놓고 보면 결론이 빨라집니다. 실제로는 ${detail}가 붙어 있어 해석을 바로 닫기 어렵습니다.`,
      `재판관님, ${label}의 핵심은 이름보다 그 안의 순서입니다. ${detail}를 먼저 확인해 주셔야 누가 자료를 비틀었는지 갈립니다.`,
      `재판관님, 이 자료는 한 장면만 잘라 보면 위험합니다. ${detail}까지 함께 보셔야 지금의 의심이 사실인지, 과장인지 나뉩니다.`,
    ],
    mid: [
      `재판관님, ${label}을 보면 제가 더 빨리 설명했어야 할 부분이 분명합니다. 그렇더라도 ${detail}까지 붙여 보셔야 이 자료가 가리키는 책임 비율이 맞습니다.`,
      `재판관님, ${label}이 저를 불리하게 만든 건 사실입니다. 다만 ${detail}를 읽으면 이 자료가 누구에게 더 무거운지도 다시 갈립니다.`,
      `재판관님, 저는 이 자료를 두고 버티려 했습니다. 그래도 ${detail}가 남아 있는 이상 ${label}을 단순 낙인으로만 쓰긴 어렵습니다.`,
      `재판관님, ${label}에서 제가 숨길 수 없는 지점이 있습니다. 그러나 ${detail}를 보면 상대 쪽 해석 역시 그대로 둘 수는 없습니다.`,
      `재판관님, 이 자료는 제 쪽 잘못을 드러내면서도 동시에 빠진 맥락을 남겨 둡니다. ${detail}를 먼저 세워 주십시오.`,
    ],
    late: [
      `재판관님, ${label}은 이제 제 책임을 피할 수 없게 만드는 자료입니다. ${detail}를 보면 제가 무엇을 늦췄고 어떤 설명을 비틀었는지까지 드러납니다.`,
      `재판관님, 이 자료 앞에서는 더 미룰 수 없습니다. ${detail}가 이미 남아 있어서 제가 숨긴 부분과 상대 쪽 책임을 함께 갈라 볼 수 있습니다.`,
      `재판관님, ${label}은 제가 끝내 인정해야 할 증거입니다. 특히 ${detail}가 제 설명보다 더 정확하게 사건의 순서를 남기고 있습니다.`,
      `재판관님, 지금 제시된 ${label}은 변명보다 인정이 먼저인 자료입니다. ${detail}를 보면 제가 어디서 선을 넘었는지 부정하기 어렵습니다.`,
      `재판관님, 이 자료는 사건을 다시 닫아 버립니다. ${detail}를 알고도 제가 제때 정리하지 못했다는 점을 인정하겠습니다.`,
    ],
  }

  return ensureJudgeAddress(pick(families[band], variantIndex))
}

function makeDossierText({ runtimeCase, party, question, band, variantIndex }) {
  const counterpartyRef = counterpartyJudgeReference(runtimeCase, party)
  const promptCue = cleanQuestionCue(question?.text || question?.prompt || question?.title || '이 질문의 전제')
  const disputeCue = firstClause(question?.expectedAnswer || question?.hint || promptCue, 72) || promptCue
  const families = {
    early: [
      `재판관님, 이 질문은 "${promptCue}"를 먼저 분리해야 답이 됩니다. 전제를 너무 빨리 닫지 말고 ${counterpartyRef}와 제 설명이 어디서 갈리는지부터 봐 주십시오.`,
      `재판관님, 지금 질문은 "${promptCue}"를 이미 하나의 사실처럼 깔고 있습니다. 저는 그 전제부터 다시 세워 달라는 뜻으로 답드리고 있습니다.`,
      `재판관님, 이 질문에 바로 예·아니오로 답하면 오히려 왜곡됩니다. "${promptCue}"가 어떤 맥락에서 나온 말인지부터 가려 주십시오.`,
    ],
    mid: [
      `재판관님, "${promptCue}"라는 질문이 나오는 이유는 압니다. 다만 ${disputeCue}를 먼저 나누어 보셔야 제 책임과 ${possessiveRef(counterpartyRef)} 해석이 섞이지 않습니다.`,
      `재판관님, 저는 이 질문을 피하려는 것이 아닙니다. "${promptCue}"가 성립하려면 빠진 단계가 무엇인지 먼저 확인해 주셔야 답이 정직해집니다.`,
      `재판관님, 지금 질문은 핵심을 찌르지만 순서가 한 칸 빠져 있습니다. ${disputeCue}를 먼저 복원한 뒤에야 제가 어디까지 인정해야 하는지 선이 잡힙니다.`,
    ],
    late: [
      `재판관님, 이제는 "${promptCue}"에 정면으로 답하겠습니다. ${disputeCue}를 포함해 제가 감춘 부분과 ${counterpartyRef} 쪽 과열이 어디서 맞물렸는지 함께 정리하겠습니다.`,
      `재판관님, 이 질문은 더 이상 피하지 않겠습니다. "${promptCue}"를 둘러싼 핵심 사실부터 제가 인정할 몫까지 순서대로 말씀드리겠습니다.`,
      `재판관님, 지금 단계에서는 "${promptCue}"를 돌아가지 않겠습니다. 빠졌던 맥락과 제 책임을 같이 놓고 답하겠습니다.`,
    ],
  }
  return ensureJudgeAddress(pick(families[band], variantIndex))
}

function makeWitnessText({ runtimeCase, witness, depth, variantIndex }) {
  const judgeAddress = cleanSentence(witness?.witnessProfile?.addressJudge || witness?.addressJudge || '재판관님')
  const factCue = witnessFactCue(runtimeCase, witness)
  const occupation = cleanSentence(witness?.witnessProfile?.occupation || witness?.occupation || witness?.name || '증인')
  const directness = witness?.witnessedDirectly ? '직접 본 장면' : '직접 들은 말과 전해 들은 정황'
  const disputeMap = new Map((runtimeCase?.disputes || []).map((item) => [item.id, item]))
  const disputeCue = (witness?.relatedDisputeIds || [])
    .map((id) => disputeMap.get(id))
    .filter(Boolean)
    .map((item) => disputeLabel(item))
    .slice(0, 2)
  const relatedText = disputeCue.length > 0 ? joinWithAnd(disputeCue[0], disputeCue[1] || disputeCue[0]) : '핵심 쟁점'

  const statements = {
    vague: [
      `${occupation} 증인은 ${factCue}와 관련해 ${directness}만 말하겠다고 진술합니다.`,
      `${occupation} 증인은 ${relatedText}에 대해 자신이 직접 확인한 범위만 짚고 추정은 보류하겠다고 진술합니다.`,
      `${occupation} 증인은 ${factCue} 가운데 자신이 본 장면만 남기겠다고 정리합니다.`,
    ],
    partial: [
      `${occupation} 증인은 ${factCue}를 중심으로 진술합니다. 다만 ${relatedText} 가운데 직접 보지 않은 부분은 추정으로 단정하지 않겠다고 선을 긋습니다.`,
      `${occupation} 증인은 ${relatedText} 흐름에서 자신이 본 순서를 먼저 설명합니다. 그리고 ${directness} 밖의 공백은 다른 자료와 분리해 들어야 한다고 말합니다.`,
      `${occupation} 증인은 ${factCue}를 이야기하면서도 ${relatedText} 전체를 다 안다고 하진 않습니다. 자신이 확인한 장면과 전해 들은 부분을 나눠 진술합니다.`,
    ],
    full: [
      `${occupation} 증인은 ${factCue}를 시점대로 풀어 설명합니다. 특히 ${relatedText}에서 누가 먼저 어떤 말을 꺼냈는지, 그리고 그 뒤에 분위기가 어떻게 바뀌었는지를 짚습니다. 마지막으로 자신이 직접 본 장면과 다른 사람에게 들은 말을 분리해 진술합니다.`,
      `${occupation} 증인은 ${relatedText}이 꼬이기 시작한 순서를 또렷하게 설명합니다. ${factCue}와 맞물린 장면에서는 누가 자료를 먼저 들이밀었고 누가 방어적으로 돌아섰는지까지 정리합니다. 다만 직접 확인하지 못한 대목은 추정이라고 분명히 선을 긋습니다.`,
      `${occupation} 증인은 ${factCue}를 사건의 중심 장면으로 지목합니다. ${relatedText}이 겹치는 구간에서는 누가 사실을 알고 있었는지와 누가 말을 흐렸는지를 나누어 설명합니다. 그리고 마지막에는 자신이 직접 확인한 범위만 책임 판단의 근거로 삼아야 한다고 진술합니다.`,
    ],
  }
  return ensureJudgeAddress(pick(statements[depth], variantIndex), judgeAddress)
}

function makeAftermathText(runtimeCase, resultClass, variantIndex) {
  const focusA = disputeLabel((runtimeCase?.disputes || [])[0] || { id: 'd-1', name: '핵심 쟁점' })
  const focusB = disputeLabel((runtimeCase?.disputes || [])[1] || { id: 'd-2', name: '후속 쟁점' })
  const solutionKeys = Object.keys(runtimeCase?.solutions || {})
  const solutionFocus = solutionLabel(solutionKeys[variantIndex % Math.max(solutionKeys.length, 1)] || '정리안')
  const fallout = relationshipFalloutCue(runtimeCase)
  const byClass = {
    a_primary_fault: [
      `재판관은 ${focusA}에서 A측 책임을 더 무겁게 적는다. 대신 ${solutionFocus}를 채택하면서 ${focusB}에 남은 상대 측 후속 조치도 함께 묶는다. 그래서 결말은 일방 응징보다 정리 책임을 어디까지 강제할지에 가까워진다.`,
      `결론은 A측 과실 중심으로 정리된다. 다만 ${solutionFocus}를 붙이면서 ${focusB}에서 상대 측이 해야 할 수습도 별도 항목으로 남긴다. ${fallout}`,
    ],
    b_primary_fault: [
      `재판관은 ${focusA}에서 B측 책임을 더 무겁게 적는다. 그래도 ${solutionFocus}를 채택하면서 A측이 감당해야 할 후속 정리까지 함께 적어 사건을 닫는다. ${fallout}`,
      `결론은 B측 책임이 중심이지만 단선적 비난으로 끝나지 않는다. ${focusB}와 ${solutionFocus}가 결합되면서 남은 조치와 공개 범위까지 같이 정리된다.`,
    ],
    shared_fault: [
      `재판관은 ${focusA}와 ${focusB}를 모두 쌍방 책임으로 적는다. ${solutionFocus}를 택한 뒤에는 누가 더 먼저 잘못했는지보다 누가 어떤 몫을 정리할지가 결말의 중심이 된다. ${fallout}`,
      `결론은 둘 다 틀렸지만 틀린 방식이 달랐다는 쪽으로 정리된다. ${solutionFocus}를 통해 한쪽의 잘못을 다른 쪽의 면책으로 쓰지 않도록 묶는다. 이후 남는 문제는 관계와 후속 조치를 어떻게 접을지다.`,
    ],
    protective_resolution: [
      `재판관은 ${focusA}보다 추가 피해 차단을 우선 적는다. ${solutionFocus}를 통해 공개 비난보다 보호와 분리를 먼저 실행하도록 정리한다. ${fallout}`,
      `결론은 보호 우선이다. ${focusB}를 더 파고들 수도 있었지만 ${solutionFocus}를 택해 2차 피해와 후속 충돌을 줄이는 쪽으로 마무리한다. ${fallout}`,
    ],
    procedural_caution: [
      `재판관은 ${focusB}에서 사실 자체보다 절차 붕괴를 더 무겁게 기록한다. ${solutionFocus}를 붙여 같은 방식의 반복을 막는 장치까지 남긴다. ${fallout}`,
      `결론은 절차 경고 중심이다. ${focusA}의 책임을 적되 ${solutionFocus}를 통해 기록 체계와 검증 순서를 다시 세우는 쪽으로 사건을 마감한다. ${fallout}`,
    ],
  }
  return pick(byClass[resultClass], variantIndex)
}

function inferQuestionDisputeId(question) {
  const atom = String(question?.onSuccess?.revealAtom || '')
  const match = atom.match(/:(d-\d+):/i)
  return match ? match[1] : null
}

function cueTokensFromText(text, {
  allowMonetaryTerms = true,
  allowConcreteAmount = true,
  max = 4,
  stopwords = GENERIC_DISPUTE_STOPWORDS,
} = {}) {
  const cleaned = scrubSurfaceText(firstClause(text || '', 96), {
    allowMonetaryTerms,
    allowConcreteAmount,
    fallback: '',
  })
  return [...new Set(
    cleaned
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .split(/\s+/)
      .map((token) => token.trim())
      .filter((token) => token.length >= 2)
      .filter((token) => !stopwords.has(token))
  )].slice(0, max)
}

function cuePhraseFromTokens(tokens, fallback) {
  if (tokens.length >= 3) return `${tokens[0]} ${tokens[1]} ${tokens[2]}`
  if (tokens.length === 2) return `${tokens[0]} ${tokens[1]}`
  if (tokens.length === 1) return tokens[0]
  return fallback
}

function evidenceDirectCue(evidence, isMonetaryEvidence) {
  const stopwords = new Set(['기록', '자료', '문서', '파일', '메모', '화면', '장면', '원본'])
  const fromName = cueTokensFromText(
    `${evidence?.surfaceName || ''} ${evidence?.name || ''}`,
    {
      allowMonetaryTerms: isMonetaryEvidence,
      allowConcreteAmount: true,
      max: 4,
      stopwords,
    },
  )
  const fromDescription = cueTokensFromText(
    `${evidence?.description || ''} ${evidence?.surfaceDescription || ''}`,
    {
      allowMonetaryTerms: isMonetaryEvidence,
      allowConcreteAmount: true,
      max: 4,
      stopwords,
    },
  )
  return cuePhraseFromTokens([...fromName, ...fromDescription], evidenceLabel(evidence, new Set(), isMonetaryEvidence))
}

function dossierQuestionCue(question, isMonetaryDispute) {
  const tokens = cueTokensFromText(
    `${cleanQuestionCue(question?.text || question?.prompt || question?.title || '')} ${question?.hint || ''}`,
    {
      allowMonetaryTerms: isMonetaryDispute,
      allowConcreteAmount: isMonetaryDispute,
      max: 5,
    },
  )
  return cuePhraseFromTokens(tokens, '핵심 질문')
}

function witnessFactCue(runtimeCase, witness) {
  const disputeMap = new Map((runtimeCase?.disputes || []).map((item) => [item.id, item]))
  const relatedDisputes = (witness?.relatedDisputeIds || [])
    .map((id) => disputeMap.get(id))
    .filter(Boolean)
  const relatedEvidence = (runtimeCase?.evidence || []).filter((item) =>
    Array.isArray(item?.proves) && item.proves.some((id) => (witness?.relatedDisputeIds || []).includes(id))
  )
  const scopeCue = firstClause(witness?.knowledgeScope || '', 72)
  if (scopeCue) return scopeCue

  const evidenceCue = relatedEvidence
    .map((item) => cleanSentence(item?.surfaceName || item?.name || ''))
    .find(Boolean)
  if (evidenceCue) return evidenceCue

  const disputeCue = relatedDisputes
    .map((item) => disputeLabel(item))
    .find(Boolean)
  if (disputeCue) return disputeCue

  return '현장에서 확인한 경위'
}

function makeInterrogationText({ runtimeCase, dispute, party, state, qtype, variantIndex, forbiddenTokens }) {
  const counterpartyRef = counterpartyJudgeReference(runtimeCase, party)
  const isMonetaryDispute = new Set(runtimeCase?.monetaryDisputeIds || []).has(dispute?.id)
  const allowConcreteAmount = isMonetaryDispute && state === 'S5'
  const disputeRef = scrubSurfaceText(disputeLabel(dispute), {
    allowMonetaryTerms: isMonetaryDispute,
    allowConcreteAmount,
    fallback: '해당 쟁점',
  })
  const disputeCue = scrubSurfaceText(disputeDetailCue(dispute), {
    allowMonetaryTerms: isMonetaryDispute,
    allowConcreteAmount,
    fallback: `${disputeRef}의 실제 경위`,
  })
  const evidenceRef = scrubSurfaceText(relatedEvidenceLabel(runtimeCase, dispute, forbiddenTokens), {
    allowMonetaryTerms: isMonetaryDispute,
    allowConcreteAmount,
    fallback: '관련 기록',
  })
  const evidenceCue = scrubSurfaceText(relatedEvidenceCue(runtimeCase, dispute), {
    allowMonetaryTerms: isMonetaryDispute,
    allowConcreteAmount,
    fallback: `${evidenceRef}에 남은 맥락`,
  })
  const otherRef = party === 'a' ? counterpartyRef : 'A측'
  const stateCueMap = {
    S0: '아직 단정할 단계는 아닙니다',
    S1: '불리해 보이는 부분이 있다는 점은 압니다',
    S2: '제 설명이 부족했다는 점은 인정합니다',
    S3: '제 책임만으로 닫히는 사안은 아닙니다',
    S4: '그때는 감정과 압박이 함께 올라왔습니다',
    S5: '이제는 숨기지 않고 정리하겠습니다',
  }
  const qLeadMap = {
    fact_pursuit: party === 'a'
      ? [
          `제 쪽에서 먼저 빠진 것은 ${disputeRef}의 경위 정리입니다.`,
          `${disputeRef}을 제 주장부터 고정하면 흐름이 틀어집니다.`,
          `${disputeRef}은 겉모습보다 순서를 먼저 복원해야 합니다.`,
          `${evidenceRef}와 ${disputeRef}을 한 줄로 엮어야 판단이 맞습니다.`,
          `${disputeRef}은 제가 덜 말한 부분과 ${otherRef} 대응을 함께 봐야 합니다.`,
        ]
      : [
          `${otherRef} 주장만 먼저 굳히면 ${disputeRef}의 구조가 지워집니다.`,
          `${disputeRef}은 제 방어가 아니라 ${otherRef} 대응까지 같이 놓고 봐야 합니다.`,
          `${evidenceRef}을 떼어 놓으면 ${disputeRef}의 순서가 잘못 보입니다.`,
          `${disputeRef}은 A측 설명과 제 대응을 나눠 봐야 풀립니다.`,
          `${otherRef} 해석만 따르면 ${disputeRef}의 실제 경위가 꺾입니다.`,
        ],
    motive_search: party === 'a'
      ? [
          `${disputeRef}에서 왜 그런 선택이 나왔는지까지 같이 보셔야 합니다.`,
          `${disputeRef}은 행동만 보면 거칠지만 배경을 빼면 오판합니다.`,
          `${evidenceRef}에는 ${disputeRef}의 동기가 함께 남아 있습니다.`,
          `${disputeRef}을 결과만으로 읽으면 이유가 전부 지워집니다.`,
          `${otherRef}와 제가 어떤 계산을 했는지 분리해서 봐 주십시오.`,
        ]
      : [
          `${otherRef}가 왜 그 선택을 했는지와 제가 왜 맞섰는지를 함께 봐야 합니다.`,
          `${disputeRef}은 겉으로 보이는 충돌보다 동기 구조가 더 큽니다.`,
          `${evidenceRef}에는 ${otherRef} 판단과 제 대응 이유가 겹쳐 있습니다.`,
          `${disputeRef}을 비난 문장으로만 정리하면 배경이 사라집니다.`,
          `${otherRef}의 결정 과정까지 들어가야 제 행동도 해석됩니다.`,
        ],
    empathy_approach: party === 'a'
      ? [
          `${disputeRef}을 그때의 압박과 함께 보셔야 말이 맞아집니다.`,
          `${disputeRef}은 제 불안과 ${otherRef} 압박이 겹친 장면이었습니다.`,
          `${evidenceCue}를 보면 왜 제가 정리를 놓쳤는지가 드러납니다.`,
          `${disputeRef}을 차갑게만 읽으면 당시 흔들림이 빠집니다.`,
          `${otherRef} 반응과 제 동요를 같이 놓고 봐 주십시오.`,
        ]
      : [
          `${otherRef}와 제가 서로 밀어붙이던 분위기까지 봐야 ${disputeRef}이 설명됩니다.`,
          `${disputeRef}은 제 반응만의 문제가 아니라 당시 압박 구조가 컸습니다.`,
          `${evidenceCue}에는 ${otherRef} 말과 제 반응이 맞물린 흔적이 남아 있습니다.`,
          `${disputeRef}을 결과 문장으로만 접으면 그때의 흔들림이 사라집니다.`,
          `${otherRef}가 준 압박과 제가 택한 방어를 함께 보셔야 합니다.`,
        ],
  }
  const bodyMap = party === 'a'
    ? {
        fact_pursuit: [
          `${evidenceRef}에는 ${evidenceCue}가 남아 있어서 ${disputeCue}를 바로 뒷받침합니다.`,
          `${disputeCue}를 빼고 표면만 보면 제 쪽 책임 비율이 과장됩니다.`,
          `${evidenceCue}와 ${disputeRef}을 같은 시간선에 놓아야 실제 순서가 보입니다.`,
          `${disputeRef}은 한 문장으로 단정하기보다 ${evidenceRef}의 맥락을 붙여야 정확합니다.`,
          `${otherRef} 해석과 별개로 ${evidenceCue} 자체는 남아 있습니다.`,
        ],
        motive_search: [
          `${evidenceCue}를 보면 ${disputeRef}이 단순한 감정 충돌로만 보이지 않습니다.`,
          `${disputeCue}는 결과보다 제 판단 배경을 먼저 설명하는 자료입니다.`,
          `${otherRef} 입장과 제 계산이 어디서 엇갈렸는지 ${evidenceRef}가 드러냅니다.`,
          `${disputeRef}은 누가 먼저 거칠었느냐보다 왜 제가 그렇게 밀렸느냐를 봐야 합니다.`,
          `${evidenceCue}가 남아 있는 이상 동기 부분은 빼고 갈 수 없습니다.`,
        ],
        empathy_approach: [
          `${evidenceCue}에는 그때 분위기와 압박이 같이 남아 있습니다.`,
          `${disputeCue}를 보면 제 불안과 책임이 한 장면에 겹쳐 있었다는 점이 보입니다.`,
          `${otherRef} 대응과 제 흔들림이 동시에 올라간 자료가 바로 ${evidenceRef}입니다.`,
          `${disputeRef}을 냉정한 계산만으로 읽으면 실제 움직임이 빠집니다.`,
          `${evidenceCue}는 그때의 불안과 방어를 같이 보여 줍니다.`,
        ],
      }
    : {
        fact_pursuit: [
          `${evidenceRef}에는 ${evidenceCue}가 남아 있어서 A측 설명과 제 대응을 따로 읽게 만듭니다.`,
          `${disputeCue}를 빼고 표면만 보면 A측 주장과 제 해명이 한 덩어리로 섞입니다.`,
          `${evidenceCue}와 ${disputeRef}을 같은 시간선에 놓아야 A측 설명과 제 대응 순서가 갈립니다.`,
          `${disputeRef}은 제 변명보다 A측 조치와 제 대응을 함께 붙여야 정확합니다.`,
          `${otherRef} 주장과 별개로 ${evidenceCue} 자체는 남아 있습니다.`,
        ],
        motive_search: [
          `${evidenceCue}를 보면 ${disputeRef}이 A측 압박과 제 계산이 겹친 사안이라는 점이 보입니다.`,
          `${disputeCue}는 결과보다 A측 결정과 제 대응 배경을 함께 설명하는 자료입니다.`,
          `${otherRef} 판단이 어디서 앞질렀고 제가 왜 맞섰는지 ${evidenceRef}가 드러냅니다.`,
          `${disputeRef}은 누가 먼저 거칠었느냐보다 왜 서로 그렇게 밀렸느냐를 봐야 합니다.`,
          `${evidenceCue}가 남아 있는 이상 동기 부분은 빼고 갈 수 없습니다.`,
        ],
        empathy_approach: [
          `${evidenceCue}에는 A측 압박과 제 방어가 같이 남아 있습니다.`,
          `${disputeCue}를 보면 감정과 책임이 한 장면에 겹쳐 있었다는 점이 보입니다.`,
          `${otherRef} 대응과 제 흔들림이 동시에 올라간 자료가 바로 ${evidenceRef}입니다.`,
          `${disputeRef}을 냉정한 계산만으로 읽으면 실제 충돌이 빠집니다.`,
          `${evidenceCue}는 그때의 긴장과 방어를 같이 보여 줍니다.`,
        ],
      }
  const closeMap = {
    S0: '지금은 단정보다 구조 확인이 먼저입니다.',
    S1: '불리한 표면이 있어도 그 자체로 끝낼 단계는 아닙니다.',
    S2: '제가 빠뜨린 부분은 인정하지만 책임 비율은 더 나눠 봐야 합니다.',
    S3: '제 책임을 적되 상대 대응도 같은 판 위에 올려 주십시오.',
    S4: '흔들린 이유를 적더라도 잘못의 무게는 따로 계산해 주십시오.',
    S5: '제 잘못을 적되 그 과정과 맞물린 대응까지 함께 정리해 주십시오.',
  }
  const leadVariantIndex = party === 'b' ? variantIndex + 2 : variantIndex
  const bodyVariantIndex = party === 'b' ? variantIndex + 3 : variantIndex
  const introSentence = `${stateCueMap[state]} ${pick(qLeadMap[qtype], leadVariantIndex).replace(/[.!?]+$/u, '')}.`
  if (state === 'S5' && qtype === 'empathy_approach') {
    const openersA = [
      `${stateCueMap[state]} ${counterpartyRef} 쪽 반응과 ${disputeRef}를 그때의 압박까지 묶어 봐야 합니다.`,
      `${stateCueMap[state]} ${disputeRef}를 제 판단만으로 줄여 말하면 ${counterpartyRef} 쪽 반응이 빠집니다.`,
      `${stateCueMap[state]} ${counterpartyRef}와 제가 어디서 서로를 몰아세웠는지도 ${disputeRef}와 함께 봐야 합니다.`,
      `${stateCueMap[state]} ${disputeRef}를 다시 읽으면 ${counterpartyRef} 쪽 반응을 빼고는 설명이 서지 않습니다.`,
      `${stateCueMap[state]} ${counterpartyRef}가 왜 그 반응을 내놨는지도 ${disputeRef}의 압박과 함께 묶어 봐야 합니다.`,
    ]
    const middlesA = [
      `${evidenceCue}에는 제가 판단 순서를 어떻게 비틀었는지와 ${otherRef} 쪽 반응이 어떻게 겹쳤는지가 함께 남아 있습니다.`,
      `${evidenceCue}에는 제가 서둘러 결론을 세우면서 ${otherRef} 쪽 반응을 방어로만 읽은 흔적이 남아 있습니다.`,
      `${evidenceCue}에는 제가 압박을 핑계로 ${otherRef} 쪽 맥락을 잘라낸 과정이 함께 남아 있습니다.`,
      `${evidenceCue}에는 제가 제 쪽 사정을 먼저 세우느라 ${otherRef} 쪽 맥락을 뒤로 미룬 흔적이 남아 있습니다.`,
      `${evidenceCue}에는 제가 잘라서 본 부분과 ${otherRef} 쪽 반응이 충돌한 지점이 같이 남아 있습니다.`,
    ]
    const closersA = [
      '제 잘못을 적되 그 과정에서 어떤 식으로 상황을 키웠는지도 같이 정리해 주십시오.',
      '제 잘못을 적으시되 제가 어떤 순서로 판단을 좁혀 갔는지도 함께 적어 주십시오.',
      '제 책임을 적되 그 책임이 어떤 대응을 부르며 커졌는지도 같이 정리해 주십시오.',
      '제 잘못을 적되 제가 어느 지점에서 상대 반응을 오판했는지도 함께 적어 주십시오.',
      '제 책임을 적으시되 제 판단이 어떻게 다음 충돌을 불렀는지도 같이 정리해 주십시오.',
    ]
    const openersB = [
      `${stateCueMap[state]} A측 설명과 제 반응이 왜 그렇게 엉켰는지도 ${disputeRef}와 함께 보셔야 합니다.`,
      `${stateCueMap[state]} ${disputeRef}를 둘러싸고 제가 피해를 어떻게 앞세웠는지도 A측 흐름과 같이 봐야 합니다.`,
      `${stateCueMap[state]} A측 압박과 제 반응이 어디서 맞물렸는지도 ${disputeRef}에서 함께 드러납니다.`,
      `${stateCueMap[state]} ${disputeRef}를 제 입장만으로 밀어붙이면 A측 설명이 왜곡됩니다.`,
      `${stateCueMap[state]} A측 설명과 제 반응이 왜 어긋났는지도 ${disputeRef}의 전후를 함께 봐야 합니다.`,
    ]
    const middlesB = [
      `${evidenceCue}에는 제가 피해를 강조하며 맥락을 좁힌 흔적과 A측 압박이 맞물린 흐름이 같이 남아 있습니다.`,
      `${evidenceCue}에는 제가 제 불안을 앞세우며 A측 설명을 의도적으로 좁혀 읽은 과정이 남아 있습니다.`,
      `${evidenceCue}에는 제가 방어를 택하며 A측 대응을 더 거칠게 만든 흐름이 함께 남아 있습니다.`,
      `${evidenceCue}에는 제가 제 손해를 앞세우느라 A측 맥락을 뒤로 민 흔적이 남아 있습니다.`,
      `${evidenceCue}에는 제가 피해 서사를 먼저 세우고 A측 설명을 나중에 맞춰 끼운 흐름이 남아 있습니다.`,
    ]
    const closersB = [
      '제 잘못을 적되 제가 어떤 식으로 상황을 몰아갔는지도 함께 정리해 주십시오.',
      '제 책임을 적으시되 제가 왜 그 반응을 계속 밀어붙였는지도 같이 정리해 주십시오.',
      '제 잘못을 적되 피해를 앞세우며 맥락을 좁힌 부분도 함께 적어 주십시오.',
      '제 책임을 적되 제가 어느 순간부터 상대 설명을 일부러 좁혀 본 것도 함께 적어 주십시오.',
      '제 잘못을 적으시되 제가 피해를 앞세워 흐름을 틀어 버린 부분도 같이 정리해 주십시오.',
    ]
    const specialPieces = party === 'a'
      ? [pick(openersA, variantIndex), pick(middlesA, variantIndex + 1), pick(closersA, variantIndex + 2)]
      : [pick(openersB, variantIndex), pick(middlesB, variantIndex + 1), pick(closersB, variantIndex + 2)]
    return ensureJudgeAddress(paragraph(specialPieces))
  }

  const pieces = [
    introSentence,
    pick(bodyMap[qtype], bodyVariantIndex),
    closeMap[state],
  ]
  return ensureJudgeAddress(paragraph(pieces.slice(0, sentenceCountForState(state))))
}

function makeEvidenceText({ party, evidence, band, variantIndex, forbiddenTokens, isMonetaryEvidence }) {
  const directCue = scrubSurfaceText(evidenceDirectCue(evidence, isMonetaryEvidence), {
    allowMonetaryTerms: isMonetaryEvidence,
    allowConcreteAmount: isMonetaryEvidence && band === 'late',
    fallback: evidenceLabel(evidence, forbiddenTokens, isMonetaryEvidence),
  })
  const detail = scrubSurfaceText(evidenceDetailCue(evidence), {
    allowMonetaryTerms: isMonetaryEvidence,
    allowConcreteAmount: isMonetaryEvidence && band === 'late',
    fallback: `${directCue}에 남은 실제 맥락`,
  })
  const sourceCueMap = {
    self_possessed: '당사자 보관 자료',
    third_party: '제삼자 자료',
    institutional: '기관 기록',
  }
  const sourceCue = sourceCueMap[evidence?.provenance] || sourceCueMap[evidence?.meta?.source] || '관련 자료'
  const subjectCue = evidence?.subjectParty === 'both'
    ? '양측 모두에게 걸친 내용'
    : evidence?.subjectParty === party ? '지금 제 쪽을 겨누는 내용' : '상대 쪽을 겨누는 내용'
  const families = {
    early: [
      `재판관님, ${directCue}에는 ${detail}가 함께 남아 있습니다. ${sourceCue}이고 ${subjectCue}라는 점부터 먼저 봐 주십시오.`,
      `재판관님, ${directCue}만 떼어 놓으면 표면이 과장됩니다. ${detail}를 붙여야 이 자료가 겨누는 방향이 정확해집니다.`,
      `재판관님, ${directCue}는 단독 결론이 아니라 맥락 자료입니다. ${detail}를 같이 보시면 왜 지금 판단이 갈리는지 드러납니다.`,
      `재판관님, ${directCue}의 이름보다 중요한 것은 그 안에 남은 ${detail}입니다. 이 점을 먼저 정리해 주십시오.`,
      `재판관님, ${directCue}를 보고도 제가 바로 단정하지 못한 이유가 ${detail}에 있습니다. ${sourceCue}라는 점을 같이 봐 주십시오.`,
    ],
    mid: [
      `재판관님, ${directCue}는 이미 제 설명을 흔드는 자료입니다. 다만 ${detail}까지 붙여 보셔야 책임의 방향이 과장되지 않습니다.`,
      `재판관님, ${directCue}가 불리한 것은 맞습니다. 그렇지만 ${detail}를 함께 보셔야 이 자료가 가리키는 범위가 정확해집니다.`,
      `재판관님, ${directCue}는 제 쪽에 불리한 조각입니다. 그래도 ${detail}를 보면 상대 측 해석이 전부는 아니라는 점이 보입니다.`,
      `재판관님, ${directCue}만 놓고 보면 한쪽 책임으로 닫히기 쉽습니다. ${detail}와 ${sourceCue}를 같이 보셔야 합니다.`,
      `재판관님, ${directCue}가 왜 지금 무겁게 올라오는지 그 배경이 ${detail}입니다. 그 맥락을 함께 적어 주십시오.`,
    ],
    late: [
      `재판관님, ${directCue}는 이제 제가 피할 수 없는 자료입니다. ${detail}가 남아 있어서 제가 어디서 잘못했는지까지 같이 드러납니다.`,
      `재판관님, ${directCue} 앞에서는 더 미룰 말이 없습니다. ${detail}까지 보시면 제가 어떤 순서로 판단을 놓쳤는지 분명해집니다.`,
      `재판관님, ${directCue}는 제 방어보다 사실이 먼저 앞서는 자료입니다. ${detail}를 포함해 그대로 기록해 주십시오.`,
      `재판관님, ${directCue}는 결과가 아니라 과정까지 고정합니다. ${detail}를 빼면 제 잘못도 축소됩니다.`,
      `재판관님, ${directCue}를 지금 다시 보면 ${detail} 때문에 변명으로는 버티기 어렵습니다. 이 자료가 남긴 방향을 그대로 보겠습니다.`,
    ],
  }
  return ensureJudgeAddress(pick(families[band], variantIndex))
}

function makeDossierText({ runtimeCase, party, question, band, variantIndex }) {
  const questionDisputeId = inferQuestionDisputeId(question)
  const isMonetaryDispute = questionDisputeId
    ? new Set(runtimeCase?.monetaryDisputeIds || []).has(questionDisputeId)
    : false
  const promptCue = dossierQuestionCue(question, isMonetaryDispute)
  const hintCue = scrubSurfaceText(
    firstClause(question?.hint || question?.expectedAnswer || question?.text || '', 90),
    {
      allowMonetaryTerms: isMonetaryDispute,
      allowConcreteAmount: isMonetaryDispute,
      fallback: promptCue,
    },
  )
  const counterpartyRef = counterpartyJudgeReference(runtimeCase, party)
  const disputeRef = questionDisputeId
    ? scrubSurfaceText(
        disputeLabel((runtimeCase?.disputes || []).find((item) => item.id === questionDisputeId)),
        {
          allowMonetaryTerms: isMonetaryDispute,
          allowConcreteAmount: isMonetaryDispute,
          fallback: '해당 쟁점',
        },
      )
    : '해당 쟁점'
  const families = {
    early: [
      `재판관님, 지금 질문하신 "${promptCue}"는 전제가 큰 질문입니다. ${hintCue}와 ${disputeRef}을 먼저 나눠서 봐 주십시오.`,
      `재판관님, "${promptCue}"를 바로 결론 질문으로 받으면 설명이 비어 버립니다. ${hintCue}가 어디까지 사실인지부터 정리해 주십시오.`,
      `재판관님, "${promptCue}"는 ${disputeRef} 전체를 흔드는 질문입니다. 그래서 ${hintCue}를 먼저 분리해 답해야 정확합니다.`,
    ],
    mid: [
      `재판관님, "${promptCue}"는 제가 피할 수 없는 질문입니다. 다만 ${hintCue}를 먼저 짚어야 ${counterpartyRef} 해석과 제 책임이 뒤섞이지 않습니다.`,
      `재판관님, "${promptCue}"에 답하되 ${disputeRef}의 실제 범위를 먼저 적어 주십시오. ${hintCue}를 빼면 이 질문이 과도해집니다.`,
      `재판관님, "${promptCue}"는 단순 확인이 아니라 ${disputeRef} 구조를 묻는 질문입니다. ${hintCue}를 같이 놓고 답하겠습니다.`,
    ],
    late: [
      `재판관님, 이제는 "${promptCue}"를 피하지 않겠습니다. ${hintCue}와 ${disputeRef}을 포함해 제가 숨긴 부분까지 같이 정리하겠습니다.`,
      `재판관님, "${promptCue}"에 대해 더 미루지 않겠습니다. ${hintCue}를 빼지 않고 말해야 제 책임도 정확해집니다.`,
      `재판관님, 지금 단계에서는 "${promptCue}"를 정면으로 받아야 합니다. ${disputeRef}과 ${hintCue}를 함께 적어 주십시오.`,
    ],
  }
  return ensureJudgeAddress(pick(families[band], variantIndex))
}

function makeWitnessText({ runtimeCase, witness, depth, variantIndex }) {
  const judgeAddress = cleanSentence(witness?.witnessProfile?.addressJudge || witness?.addressJudge || '재판관님')
  const occupation = cleanSentence(witness?.witnessProfile?.occupation || witness?.occupation || witness?.name || '증인')
  const factCue = witnessFactCue(runtimeCase, witness)
  const directCue = witness?.witnessedDirectly ? '직접 본 장면' : '직접 본 장면과 전해 들은 부분'
  const disputeMap = new Map((runtimeCase?.disputes || []).map((item) => [item.id, item]))
  const relatedText = cuePhraseFromTokens(
    (witness?.relatedDisputeIds || [])
      .map((id) => disputeMap.get(id))
      .filter(Boolean)
      .flatMap((item) => cueTokensFromText(item?.name || item?.truthDescription || '', { max: 2 }))
      .slice(0, 4),
    '해당 쟁점',
  )
  const statements = {
    vague: [
      `${occupation} 증인은 ${factCue}와 관련해 ${directCue}까지만 조심스럽게 진술합니다.`,
      `${occupation} 증인은 ${relatedText}과 관련해 자신이 직접 확인한 범위만 먼저 말하겠다고 진술합니다.`,
      `${occupation} 증인은 ${factCue}에 관해 직접 본 장면 외에는 단정하지 않겠다고 진술합니다.`,
    ],
    partial: [
      `${occupation} 증인은 ${factCue}를 먼저 진술합니다. 이어서 ${relatedText} 과정에서 직접 확인한 내용과 뒤에 들은 내용을 갈라 설명합니다.`,
      `${occupation} 증인은 ${relatedText}의 시간 순서를 짚습니다. 다만 ${factCue} 중 눈으로 확인하지 못한 부분은 추정으로 단정하지 않겠다고 진술합니다.`,
      `${occupation} 증인은 ${factCue}가 어떻게 이어졌는지 설명합니다. 그리고 현장에서 본 내용과 나중에 전달받은 내용을 나눠 진술합니다.`,
    ],
    full: [
      `${occupation} 증인은 ${factCue}를 사건의 핵심 장면으로 진술합니다. 이어서 ${relatedText}의 흐름 속에서 누가 먼저 어떤 행동을 했는지 시간순으로 설명합니다. 마지막으로 자신이 직접 본 장면과 추정에 가까운 부분을 분리해 진술합니다.`,
      `${occupation} 증인은 ${relatedText}이 어긋나기 시작한 순간을 ${factCue}와 함께 설명합니다. 그 다음 서로의 반응이 어떻게 겹쳤는지 순서를 나눠 진술합니다. 끝으로 직접 확인한 사실과 간접적으로 들은 사실을 구분해 재판부에 전달합니다.`,
      `${occupation} 증인은 ${factCue}가 단독 장면이 아니었다고 진술합니다. 이어서 ${relatedText} 전후의 분위기와 발언 순서를 차례로 설명합니다. 마지막으로 자신이 본 사실과 해석에 가까운 부분을 분리해 진술합니다.`,
    ],
  }
  return ensureJudgeAddress(pick(statements[depth], variantIndex), judgeAddress)
}

function makeAftermathText(runtimeCase, resultClass, variantIndex) {
  const focusA = disputeLabel((runtimeCase?.disputes || [])[0] || { id: 'd-1', name: '핵심 쟁점' })
  const focusB = disputeLabel((runtimeCase?.disputes || [])[1] || { id: 'd-2', name: '후속 쟁점' })
  const focusC = disputeLabel((runtimeCase?.disputes || [])[2] || { id: 'd-3', name: '정리 쟁점' })
  const solutionKeys = Object.keys(runtimeCase?.solutions || {})
  const solutionFocus = solutionLabel(solutionKeys[variantIndex % Math.max(solutionKeys.length, 1)] || '정리안')
  const caseName = cleanSentence(runtimeCase?.context?.caseName || runtimeCase?.caseId || '이번 사건')
  const dilemmaCue = firstClause(runtimeCase?.meta?.resolutionDilemma || runtimeCase?.meta?.emotionalBait || '', 90)
  const byClass = {
    a_primary_fault: [
      `${caseName}의 결론은 ${focusA}에서 A측 책임을 더 무겁게 적는 방향으로 닫힙니다. 다만 ${solutionFocus}을 채택하면 ${focusB}와 ${focusC}에서 B측 후속 조치도 함께 기록하게 됩니다. ${dilemmaCue}`,
      `${caseName}은 A측 과실을 중심에 두되 ${solutionFocus}을 붙이면서 상대 측이 감당해야 할 정리 책임까지 병기하는 결말로 이어집니다. ${focusB}를 비워 두지 않은 점이 이번 후일담의 핵심입니다. 이 선택은 이후 정리 범위까지 다시 넓힙니다.`,
    ],
    b_primary_fault: [
      `${caseName}의 결론은 ${focusA}에서 B측 책임을 더 무겁게 적는 방향으로 정리됩니다. 동시에 ${solutionFocus}을 통해 A측이 감당해야 할 후속 정리선도 ${focusB}와 함께 묶입니다. ${dilemmaCue}`,
      `${caseName}은 B측 과실을 중심으로 닫히지만 ${solutionFocus}이 붙으면서 A측의 손실 관리와 ${focusC} 후속 절차까지 같은 판결문 안에 남습니다. 후일담은 그 정리 절차를 실제로 밟는 쪽으로 이어집니다.`,
    ],
    shared_fault: [
      `${caseName}은 ${focusA}와 ${focusB}를 모두 쌍방 책임으로 정리합니다. ${solutionFocus}을 선택한 뒤에는 누가 먼저 잘못했는지보다 ${focusC}를 어떻게 정리할지가 후일담의 중심으로 남습니다.`,
      `${caseName}의 결말은 둘 다 틀렸지만 틀린 방식이 달랐다는 쪽으로 닫힙니다. ${solutionFocus}을 붙이면서 ${focusA}, ${focusB}, ${focusC}가 각각 어떤 비율로 남는지가 후일담을 만듭니다. 그래서 정리 방식 자체가 후속 갈등의 기준이 됩니다.`,
    ],
    protective_resolution: [
      `${caseName}은 ${focusA}의 비난 경쟁보다 추가 피해 차단을 먼저 택합니다. ${solutionFocus}을 통해 ${focusB} 공개 범위를 줄이고 ${focusC}는 보호 조치와 함께 정리하는 후일담으로 이어집니다.`,
      `${caseName}의 후일담은 보호 우선입니다. ${solutionFocus}이 붙으면서 ${focusA} 책임 판단은 남기되 ${focusB}와 ${focusC}는 공개보다 보호와 복구 중심으로 접힙니다. 이후 조치는 피해 확산 차단에 맞춰집니다.`,
    ],
    procedural_caution: [
      `${caseName}은 ${focusA}의 사실관계와 별개로 절차 경고를 남깁니다. ${solutionFocus}을 택한 뒤에는 ${focusB}와 ${focusC}를 다루는 방식 자체가 다음 분쟁의 기준으로 남습니다.`,
      `${caseName}의 결말은 누구 한쪽을 더 세게 치는 것보다 절차를 다시 세우는 쪽으로 정리됩니다. ${solutionFocus}과 함께 ${focusA}, ${focusB}, ${focusC}가 어떤 순서로 다뤄져야 하는지가 후일담의 핵심이 됩니다. 이 판단은 다음 분쟁의 기준선도 함께 남깁니다.`,
    ],
  }
  return pick(byClass[resultClass], variantIndex)
}

function makeEvidenceText({ party, evidence, band, variantIndex, forbiddenTokens, isMonetaryEvidence }) {
  const directCue = scrubSurfaceText(evidenceDirectCue(evidence, isMonetaryEvidence), {
    allowMonetaryTerms: isMonetaryEvidence,
    allowConcreteAmount: isMonetaryEvidence && band === 'late',
    fallback: evidenceLabel(evidence, forbiddenTokens, isMonetaryEvidence),
  })
  const detail = scrubSurfaceText(evidenceDetailCue(evidence), {
    allowMonetaryTerms: isMonetaryEvidence,
    allowConcreteAmount: isMonetaryEvidence && band === 'late',
    fallback: `${directCue}\uC758 \uC2E4\uC81C \uB9E5\uB77D`,
  })
  const sourceCueMap = {
    self_possessed: '\uB2F9\uC0AC\uC790 \uBCF4\uAD00 \uC790\uB8CC',
    third_party: '\uC81C3\uC790 \uC790\uB8CC',
    institutional: '\uAE30\uAD00 \uAE30\uB85D',
  }
  const sourceCue = sourceCueMap[evidence?.provenance] || sourceCueMap[evidence?.meta?.source] || '\uAD00\uB828 \uC790\uB8CC'
  const subjectCue = evidence?.subjectParty === 'both'
    ? '\uC591\uCE21 \uBAA8\uB450\uC5D0\uAC8C \uAC78\uCE5C \uB0B4\uC6A9'
    : evidence?.subjectParty === party ? '\uC9C0\uAE08 \uC774\uCABD\uC744 \uACA8\uB204\uB294 \uB0B4\uC6A9' : '\uC0C1\uB300 \uCABD\uC744 \uACA8\uB204\uB294 \uB0B4\uC6A9'

  const families = {
    early: [
      `\uC7AC\uD310\uAD00\uB2D8, ${directCue}\uC5D0\uB294 ${detail}\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4. ${sourceCue} \uAE30\uC900\uC73C\uB85C \uC5B4\uB290 \uBD80\uBD84\uC774 \uBA3C\uC800 \uB4DC\uB7EC\uB098\uB294\uC9C0 \uC801\uC5B4 \uC8FC\uC2ED\uC2DC\uC624.`,
      `\uC7AC\uD310\uAD00\uB2D8, ${directCue}\uB9CC \uC77D\uC73C\uBA74 \uD45C\uBA74 \uD574\uC11D\uC774 \uC55E\uC139\uB2C8\uB2E4. ${detail}\uAE4C\uC9C0 \uBD99\uC5EC \uBD10\uC57C \uC790\uB8CC\uAC00 \uAC00\uB9AC\uD0A4\uB294 \uBC94\uC704\uAC00 \uC815\uB9AC\uB429\uB2C8\uB2E4.`,
      `\uC7AC\uD310\uAD00\uB2D8, ${directCue}\uB294 \uB2E8\uB3C5 \uACB0\uB860\uBCF4\uB2E4 \uB9E5\uB77D \uC790\uB8CC\uC785\uB2C8\uB2E4. ${detail}\uC744 \uAC19\uC774 \uBCF4\uC154\uC57C \uC9C0\uAE08 \uD310\uB2E8\uC758 \uC21C\uC11C\uAC00 \uBCF4\uC785\uB2C8\uB2E4.`,
      `\uC7AC\uD310\uAD00\uB2D8, ${directCue}\uC758 \uC774\uB984\uBCF4\uB2E4 \uC911\uC694\uD55C \uAC83\uC740 \uADF8 \uC548\uC758 ${detail}\uC785\uB2C8\uB2E4. \uBB34\uC5C7\uC744 \uBA3C\uC800 \uC815\uB9AC\uD574\uC57C \uD558\uB294\uC9C0 \uC801\uC5B4 \uC8FC\uC2ED\uC2DC\uC624.`,
      `\uC7AC\uD310\uAD00\uB2D8, ${directCue}\uB97C \uBC14\uB85C \uB2E8\uC815\uD558\uC9C0 \uBABB\uD55C \uC774\uC720\uB3C4 ${detail}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4. ${sourceCue}\uAC00 \uAC00\uB9AC\uD0A4\uB294 \uBC94\uC704\uC640 \uC5B4\uB514\uB97C \uACA8\uB204\uB294\uC9C0 \uD568\uAED8 \uBD10 \uC8FC\uC2ED\uC2DC\uC624.`,
    ],
    mid: [
      `\uC7AC\uD310\uAD00\uB2D8, ${directCue}\uB294 \uC81C \uC124\uBA85\uC744 \uD754\uB4DC\uB294 \uC790\uB8CC\uC785\uB2C8\uB2E4. \uB2E4\uB9CC ${detail}\uAE4C\uC9C0 \uBD99\uC5EC \uBCF4\uC154\uC57C \uCC45\uC784 \uBC29\uD5A5\uC774 \uACFC\uC7A5\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`,
      `\uC7AC\uD310\uAD00\uB2D8, ${directCue}\uAC00 \uBD88\uB9AC\uD558\uAC8C \uBCF4\uC774\uB294 \uAC83\uC740 \uB9DE\uC2B5\uB2C8\uB2E4. \uADF8\uB7F0\uB370 ${detail}\uAE4C\uC9C0 \uD568\uAED8 \uBCF4\uBA74 \uC790\uB8CC\uAC00 \uAC00\uB9AC\uD0A4\uB294 \uBC94\uC704\uAC00 \uC815\uB9AC\uB429\uB2C8\uB2E4.`,
      `\uC7AC\uD310\uAD00\uB2D8, ${directCue}\uB294 \uD55C\uCABD\uC5D0 \uBD88\uB9AC\uD55C \uC870\uAC01\uC785\uB2C8\uB2E4. \uADF8\uB798\uB3C4 ${detail}\uC744 \uBCF4\uBA74 \uC0C1\uB300 \uD574\uC11D\uC774 \uC804\uBD80\uB294 \uC544\uB2C8\uB77C\uB294 \uC810\uC774 \uBCF4\uC785\uB2C8\uB2E4.`,
      `\uC7AC\uD310\uAD00\uB2D8, ${directCue}\uB9CC \uB5BC\uC5B4 \uBCF4\uBA74 \uC81C \uCABD \uCC45\uC784\uC73C\uB85C \uACF3\uC7A5 \uC881\uC544\uC9D1\uB2C8\uB2E4. ${detail}\uACFC ${sourceCue}\uB97C \uD568\uAED8 \uBCF4\uC154\uC57C \uD574\uC11D\uC774 \uACFC\uB3C4\uD574\uC9C0\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`,
      `\uC7AC\uD310\uAD00\uB2D8, ${directCue}\uAC00 \uC65C \uC9C0\uAE08 \uBB34\uAC81\uAC8C \uC62C\uB77C\uC624\uB294\uC9C0\uB294 ${detail}\uC774 \uC790\uB8CC\uAC00 \uAC00\uB9AC\uD0A4\uB294 \uBC94\uC704\uB97C \uBC14\uAFB8\uAE30 \uB54C\uBB38\uC785\uB2C8\uB2E4. \uADF8 \uD574\uC11D\uC744 \uD568\uAED8 \uC801\uC5B4 \uC8FC\uC2ED\uC2DC\uC624.`,
    ],
    late: [
      `\uC7AC\uD310\uAD00\uB2D8, ${directCue}\uB294 \uC774\uC81C \uC81C\uAC00 \uD53C\uD560 \uC218 \uC5C6\uB294 \uC790\uB8CC\uC785\uB2C8\uB2E4. ${detail}\uC774 \uB0A8\uC544 \uC788\uC5B4\uC11C \uC81C\uAC00 \uC5B4\uB514\uC11C \uC798\uBABB\uB410\uB294\uC9C0\uAE4C\uC9C0 \uB4DC\uB7EC\uB0A9\uB2C8\uB2E4.`,
      `\uC7AC\uD310\uAD00\uB2D8, ${directCue} \uC55E\uC5D0\uC11C\uB294 \uB354 \uBBF8\uB8F0 \uB9D0\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. ${detail}\uAE4C\uC9C0 \uBCF4\uC2DC\uBA74 \uC81C\uAC00 \uC5B4\uB5A4 \uC21C\uC11C\uB85C \uD310\uB2E8\uC744 \uBE44\uD2C0\uC5C8\uB294\uC9C0 \uBD84\uBA85\uD574\uC9D1\uB2C8\uB2E4.`,
      `\uC7AC\uD310\uAD00\uB2D8, ${directCue}\uB294 \uBC29\uC5B4\uBCF4\uB2E4 \uC0AC\uC2E4\uC744 \uBA3C\uC800 \uC138\uC6B0\uB294 \uC790\uB8CC\uC785\uB2C8\uB2E4. ${detail}\uC744 \uD3EC\uD568\uD574 \uADF8\uB300\uB85C \uAE30\uB85D\uD574 \uC8FC\uC2ED\uC2DC\uC624.`,
      `\uC7AC\uD310\uAD00\uB2D8, ${directCue}\uB294 \uACB0\uACFC\uB9CC\uC774 \uC544\uB2C8\uB77C \uACFC\uC815\uAE4C\uC9C0 \uACE0\uC815\uD569\uB2C8\uB2E4. ${detail}\uC744 \uBCF4\uBA74 \uC81C\uAC00 \uC65C \uCC45\uC784\uC744 \uC904\uC5EC \uB9D0\uD588\uB294\uC9C0 \uC54C \uC218 \uC788\uC2B5\uB2C8\uB2E4.`,
      `\uC7AC\uD310\uAD00\uB2D8, ${directCue}\uB97C \uC9C0\uAE08 \uB2E4\uC2DC \uBCF4\uBA74 ${detail} \uB54C\uBB38\uC5D0 \uBCC0\uBA85\uC73C\uB85C\uB294 \uBC84\uD2F0\uAE30 \uC5B4\uB835\uC2B5\uB2C8\uB2E4. \uC790\uB8CC\uAC00 \uB0A8\uAE34 \uD574\uC11D \uBC29\uD5A5\uC744 \uADF8\uB300\uB85C \uBD10 \uC8FC\uC2ED\uC2DC\uC624.`,
    ],
  }

  return ensureJudgeAddress(pick(families[band], variantIndex))
}

function buildBundle({ caseId, runtimeCase, v3 }) {
  const dossierQuestions = getDossierQuestions(v3)
  const forbiddenTokens = buildForbiddenTokens(runtimeCase)
  const monetaryDisputeIds = new Set(runtimeCase.monetaryDisputeIds || [])

  const bundle = {
    schemaVersion: 1,
    caseId,
    generatedAt: new Date().toISOString(),
    notes: [
      `${caseId} generic pilot scripted bundle generated from runtime case data and v3 dossier data.`,
      'This builder is deterministic-first and keeps judge-facing formal Korean for validator compatibility.',
    ],
    coverage: {
      interrogation: {
        parties: ['a', 'b'],
        disputes: (runtimeCase.disputes || []).map((dispute) => dispute.id),
        lieStates: STATES,
        questionTypes: QTYPES,
        variantsPerKey: 5,
      },
      evidence_present: {
        parties: ['a', 'b'],
        evidenceIds: (runtimeCase.evidence || []).map((evidence) => evidence.id),
        lieBands: BANDS,
        variantsPerKey: 5,
      },
      dossier: {
        parties: ['a', 'b'],
        questionIds: dossierQuestions.map((question) => question.id),
        lieBands: BANDS,
        variantsPerKey: 3,
      },
      witness: {
        witnessIds: ((runtimeCase.duo && runtimeCase.duo.socialGraph) || []).map((witness) => witness.id),
        depths: WITNESS_DEPTHS,
        variantsPerKey: 3,
      },
      aftermath: {
        resultClasses: RESULT_CLASSES,
        variantsPerKey: 2,
      },
      system_message: {
        keys: SYSTEM_KEYS,
        variantsPerKey: 2,
      },
    },
    channels: {
      interrogation: { entries: [] },
      evidence_present: { entries: [] },
      dossier: { entries: [] },
      witness: { entries: [] },
      aftermath: { entries: [] },
      system_message: { entries: [] },
    },
  }

  for (const party of ['a', 'b']) {
    for (const dispute of runtimeCase.disputes || []) {
      for (const state of STATES) {
        for (const qtype of QTYPES) {
          bundle.channels.interrogation.entries.push({
            key: [party, dispute.id, state, qtype].join('|'),
            party,
            disputeId: dispute.id,
            lieState: state,
            questionType: qtype,
            stanceHint: stanceFromState(state),
            truthLevel: truthLevelFromState(state),
            variants: Array.from({ length: 5 }, (_, variantIndex) => {
              let text = makeInterrogationText({ runtimeCase, dispute, party, state, qtype, variantIndex, forbiddenTokens })
              const amountText = state === 'S5' && monetaryDisputeIds.has(dispute.id)
                ? extractAmountText(caseId, dispute, runtimeCase)
                : ''
              if (amountText) {
                text = paragraph([text, `문제가 된 금액은 ${amountText} 수준이었습니다`])
              }
              text = enforceInterrogationStateContour(text, state)
              return {
                id: `${party}-${dispute.id}-${state}-${qtype}-v${variantIndex + 1}`,
                text,
                behaviorHint: `${partyNoun(party)}이 ${qtype} 압박에 ${state} 단계 반응을 보입니다.`,
              }
            }),
          })
        }
      }
    }
  }

  for (const party of ['a', 'b']) {
    for (const evidence of runtimeCase.evidence || []) {
      for (const band of BANDS) {
        const subjectRole = deriveSubjectRole(evidence, party)
        const stanceHint = band === 'early' ? 'hedge' : band === 'mid' ? 'partial' : 'confess'
        const truthLevel = band === 'early' ? 'hint' : band === 'mid' ? 'partial' : 'full'
        const isMonetaryEvidence = (evidence.proves || []).some((disputeId) => monetaryDisputeIds.has(disputeId))
        bundle.channels.evidence_present.entries.push({
            key: [party, evidence.id, band, subjectRole].join('|'),
          party,
          evidenceId: evidence.id,
          lieBand: band,
          subjectRole,
          stanceHint,
          truthLevel,
            variants: Array.from({ length: 5 }, (_, variantIndex) => ({
              id: `${party}-${evidence.id}-${band}-${subjectRole}-v${variantIndex + 1}`,
              text: makeEvidenceText({ party, evidence, band, variantIndex, forbiddenTokens, isMonetaryEvidence }),
              behaviorHint: `${partyNoun(party)}이 ${band} 단계에서 증거를 보고 태도를 조정합니다.`,
            })),
          })
        }
      }
  }

  for (const question of dossierQuestions) {
    for (const band of BANDS) {
      const party = question.targetParty || 'a'
      const stanceHint = band === 'early' ? 'hedge' : band === 'mid' ? 'partial' : 'confess'
      const truthLevel = band === 'early' ? 'hint' : band === 'mid' ? 'partial' : 'full'
      bundle.channels.dossier.entries.push({
        key: [party, question.id, band].join('|'),
        party,
        dossierQuestionId: question.id,
        lieBand: band,
        stanceHint,
        truthLevel,
        variants: Array.from({ length: 3 }, (_, variantIndex) => ({
          id: `${party}-${question.id}-${band}-v${variantIndex + 1}`,
          text: makeDossierText({ runtimeCase, party, question, band, variantIndex }),
          behaviorHint: `${partyNoun(party)}이 dossier 질문에 ${band} 단계 반응을 보입니다.`,
        })),
      })
    }
  }

  for (const witness of (runtimeCase.duo && runtimeCase.duo.socialGraph) || []) {
    for (const depth of WITNESS_DEPTHS) {
      bundle.channels.witness.entries.push({
        key: [witness.id, depth].join('|'),
        witnessId: witness.id,
        depth,
        stanceHint: depth === 'vague' ? 'hedge' : depth === 'partial' ? 'answer' : 'answer',
        truthLevel: depth === 'vague' ? 'hint' : depth === 'partial' ? 'partial' : 'full',
        variants: Array.from({ length: 3 }, (_, variantIndex) => ({
          id: `${witness.id}-${depth}-v${variantIndex + 1}`,
          text: makeWitnessText({ runtimeCase, witness, depth, variantIndex }),
          behaviorHint: `${witness.name} 증인이 ${depth} 깊이로 진술합니다.`,
        })),
      })
    }
  }

  for (const resultClass of RESULT_CLASSES) {
      bundle.channels.aftermath.entries.push({
        key: resultClass,
        resultClass,
        variants: Array.from({ length: 2 }, (_, variantIndex) => ({
          id: `${resultClass}-v${variantIndex + 1}`,
          text: makeAftermathText(runtimeCase, resultClass, variantIndex),
          behaviorHint: '판결 후 정리 메시지입니다.',
        })),
      })
  }

  for (const keyInfo of SYSTEM_KEYS) {
    const key = [keyInfo.context, keyInfo.eventType].join('|')
    bundle.channels.system_message.entries.push({
      key,
      context: keyInfo.context,
      eventType: keyInfo.eventType,
      variants: Array.from({ length: 2 }, (_, variantIndex) => ({
        id: `${key}-v${variantIndex + 1}`,
        text: makeSystemText(key, variantIndex),
        behaviorHint: '시스템 안내 메시지입니다.',
      })),
    })
  }

  return bundle
}

function compilePilotScriptedBundle({ root, caseId, outPath }) {
  const runtimePath = path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
  const runtimeCase = readJson(runtimePath)
  const v3Path = findFileRecursiveByName(path.join(root, 'docs', 'ref'), `${caseId}-v3-game-loop-data.json`)
  if (!v3Path) {
    throw new Error(`missing file: ${caseId}-v3-game-loop-data.json`)
  }
  const v3 = readJson(v3Path)
  const bundle = buildBundle({ caseId, runtimeCase, v3 })
  ensureDir(outPath)
  fs.writeFileSync(outPath, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')
  return { caseId, outPath }
}

module.exports = {
  compile: compilePilotScriptedBundle,
  compilePilotScriptedBundle,
}
