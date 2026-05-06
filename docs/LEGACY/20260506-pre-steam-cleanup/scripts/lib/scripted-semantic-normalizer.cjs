const JUDGE_DEFAULT = '재판관님'

const HEDGE_RE = /다만|범위와 책임|구분해|구분해서/
const CONFESSION_RE = /인정합니다|인정하겠습니다|제 잘못|제가 먼저|숨기지/
const BLAME_RE = /상대방 측|상대 측|상대방|상대의|문제는/
const RATTLED_RE = /흔들렸|불안|공포|압박|버티|제대로 처리하지 못|감정이 앞섰/
const PARTIAL_ADMIT_RE = /인정합니다|인정하겠습니다|제 대응|적어도|일부/
const SOFTEN_RE = /인정합니다|인정하겠습니다|불리해 보이는|설명이 충분하지 않았던|의심받을 만한|오해를 부를/
const ANALYTIC_MARKERS = ['의미', '시사', '가리키', '보여', '드러나', '설명', '정리', '때문', '핵심', '결국', '따라서', '그래서', '범위', '책임', '권한', '경위']
const PROCESS_MARKERS = ['절차', '범위', '기록', '경위', '구조', '권한']
const SELF_VICTIM_MARKERS = ['억울', '몰렸', '찍혔', '손해', '희생', '피해']

function cleanText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
}

function ensureSentenceEnding(text) {
  const cleaned = cleanText(text)
  if (!cleaned) return cleaned
  if (/[.!?]$/.test(cleaned)) return cleaned
  return `${cleaned}.`
}

function prependJudgeAddress(text, judgeAddress) {
  const address = cleanText(judgeAddress) || JUDGE_DEFAULT
  const cleaned = cleanText(text)
  if (!cleaned) return `${address},`
  if (cleaned.startsWith(`${address},`) || cleaned.startsWith(`${address} `) || cleaned === address) return cleaned
  return `${address}, ${cleaned}`
}

function appendSentence(text, sentence) {
  const cleaned = cleanText(text)
  const addition = ensureSentenceEnding(sentence)
  if (!addition) return cleaned
  if (cleaned.includes(addition.replace(/[.!?]+$/g, ''))) return cleaned
  if (!cleaned) return addition
  return `${cleaned} ${addition}`.trim()
}

function appendClause(text, clause) {
  const cleaned = cleanText(text)
  const addition = cleanText(clause).replace(/[.!?]+$/g, '')
  if (!addition) return cleaned
  if (cleaned.includes(addition)) return cleaned
  if (!cleaned) return ensureSentenceEnding(addition)
  const base = cleaned.replace(/[.!?]+$/g, '')
  return ensureSentenceEnding(`${base}, ${addition}`)
}

function markerCount(text, markers) {
  const haystack = cleanText(text)
  return markers.reduce((count, marker) => count + (haystack.includes(marker) ? 1 : 0), 0)
}

function resolveJudgeAddress(runtimeCase, channel, entry, mode) {
  if (channel === 'witness') {
    const witness = (runtimeCase?.duo?.socialGraph || []).find((item) => item.id === entry.witnessId)
    return witness?.witnessProfile?.addressJudge || witness?.addressJudge || JUDGE_DEFAULT
  }

  if (['interrogation', 'evidence_present', 'dossier'].includes(channel)) {
    return JUDGE_DEFAULT
  }

  return JUDGE_DEFAULT
}

function leadLooksLikeJudgeAddress(text) {
  const cleaned = cleanText(text)
  return [
    JUDGE_DEFAULT,
    '재판장님',
    '판사님',
    '재판부',
    '재판장',
    '판사',
    '재판관',
  ].some((term) => cleaned.startsWith(term))
}

function normalizeLeadJudgeAddress(text, judgeAddress) {
  const cleaned = cleanText(text)
  const address = cleanText(judgeAddress) || JUDGE_DEFAULT
  if (!cleaned) return `${address},`
  if (leadLooksLikeJudgeAddress(cleaned)) {
    if (cleaned.startsWith(`${address},`) || cleaned === address || cleaned.startsWith(`${address} `)) return cleaned
    const withoutExisting = cleaned.replace(/^(재판관님|재판장님|판사님|재판부|재판장|판사|재판관)[,.!?\s]*/u, '')
    return `${address}, ${withoutExisting}`.trim()
  }
  const embeddedJudge = cleaned.match(/(재판관님|재판장님|판사님|재판부|재판장|판사|재판관)[,.!?\s]*(.*)$/u)
  if (embeddedJudge) {
    return `${address}, ${cleanText(embeddedJudge[2])}`.trim()
  }
  return `${address}, ${cleaned}`.trim()
}

function getCounterparty(runtimeCase, entry) {
  if (entry.party === 'a') return runtimeCase?.duo?.partyB || null
  if (entry.party === 'b') return runtimeCase?.duo?.partyA || null
  return null
}

function getSpeaker(runtimeCase, entry) {
  if (entry.party === 'a') return runtimeCase?.duo?.partyA || null
  if (entry.party === 'b') return runtimeCase?.duo?.partyB || null
  return null
}

function fallbackCounterpartyJudgeReference(runtimeCase, entry) {
  const relationshipType = runtimeCase?.duo?.relationshipType || runtimeCase?.meta?.relationshipType || ''
  const map = {
    spouse: { a: '\uC81C \uB0A8\uD3B8', b: '\uC81C \uC544\uB0B4' },
    friend: { a: '\uC81C \uCE5C\uAD6C', b: '\uC81C \uCE5C\uAD6C' },
    workplace: { a: '\uC81C \uD300\uC6D0', b: '\uC81C \uD300\uC7A5' },
    tenant: { a: '\uC9D1\uC8FC\uC778', b: '\uC138\uC785\uC790' },
    partnership: { a: '\uC81C \uB3D9\uC5C5\uC790', b: '\uC81C \uB3D9\uC5C5\uC790' },
    family: { a: '\uAC00\uC871', b: '\uAC00\uC871' },
    neighbor: { a: '\uC606\uC9D1 \uC0AC\uB78C', b: '\uC606\uC9D1 \uC0AC\uB78C' },
    headline: { a: '\uADF8 \uC5C5\uC8FC', b: '\uADF8 \uB9AC\uBDF0\uC5B4' },
    professional: { a: '\uC0C1\uB300\uBC29', b: '\uC0C1\uB300\uBC29' },
    civic: { a: '\uC0C1\uB300\uBC29', b: '\uC0C1\uB300\uBC29' },
    online: { a: '\uC0C1\uB300\uBC29', b: '\uC0C1\uB300\uBC29' },
  }
  return map[relationshipType]?.[entry.party] || '\uC0C1\uB300\uBC29'
}

function resolveCounterpartyJudgeReference(runtimeCase, entry) {
  const speaker = entry.party === 'a' ? runtimeCase?.duo?.partyA : runtimeCase?.duo?.partyB
  const preferred = cleanText(speaker?.callTerms?.toJudge || '')
  if (preferred && !leadLooksLikeJudgeAddress(preferred)) return preferred
  return fallbackCounterpartyJudgeReference(runtimeCase, entry)
}

function replaceCounterpartyReference(text, runtimeCase, entry) {
  const counterparty = getCounterparty(runtimeCase, entry)
  const preferred = resolveCounterpartyJudgeReference(runtimeCase, entry)
  if (!preferred) return text

  let next = cleanText(text)
  for (const raw of [counterparty?.name, counterparty?.name && counterparty.name.length >= 3 ? counterparty.name.slice(1) : '']) {
    const token = cleanText(raw || '')
    if (!token) continue
    next = next.replace(new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gu'), preferred)
  }
  return next
}

function collectForbiddenOrganizations(runtimeCase) {
  const set = new Set()
  const orgRe = /[A-Za-z0-9가-힣]+(?:팀|센터|병원|학교|연구소|재단|법인|위원회|사무소|플랫폼|구청|경찰서|법원|소속사|스튜디오|협회|조합|클리닉|대학|학원|기관)/gu
  for (const evidence of runtimeCase?.evidence || []) {
    for (const value of [evidence?.meta?.sourceLabel, evidence?.viewerData?.sourceNote, evidence?.name]) {
      if (!value) continue
      for (const match of String(value).matchAll(orgRe)) {
        if (match[0]?.length >= 3) set.add(match[0])
      }
    }
  }
  return [...set]
}

function isEarlyRevealEntry(entry) {
  return entry?.lieState === 'S0' || entry?.lieState === 'S1' || entry?.lieBand === 'early'
}

function enforceTruthThrottle(text, runtimeCase, entry, channel) {
  if (!['interrogation', 'evidence_present', 'dossier'].includes(channel) || !isEarlyRevealEntry(entry)) return cleanText(text)
  let next = cleanText(text)
  const counterparty = getCounterparty(runtimeCase, entry)
  const forbiddenNames = [
    counterparty?.name,
    counterparty?.name && counterparty.name.length >= 3 ? counterparty.name.slice(1) : '',
    ...((runtimeCase?.duo?.socialGraph || []).map((item) => item?.name || '')),
    ...collectForbiddenOrganizations(runtimeCase),
  ]
    .map((value) => cleanText(value || ''))
    .filter((value) => value.length >= 2)

  for (const token of forbiddenNames) {
    next = next.replace(new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gu'), '상대방')
  }
  next = next.replace(/\d[\d,.\s]*(?:억\s*원|천만\s*원|백만\s*원|십만\s*원|만\s*원|천\s*원|백\s*원|원)/gu, '구체 금액')
  return next
}

function enforceTruthThrottle(text, runtimeCase, entry, channel) {
  if (!['interrogation', 'evidence_present', 'dossier'].includes(channel) || !isEarlyRevealEntry(entry)) return cleanText(text)
  let next = cleanText(text)
  const counterparty = getCounterparty(runtimeCase, entry)
  const currentEvidence = channel === 'evidence_present'
    ? (runtimeCase?.evidence || []).find((item) => item?.id === entry?.evidenceId)
    : null
  const protectedEvidenceTokens = new Set(
    [currentEvidence?.name, currentEvidence?.surfaceName]
      .filter(Boolean)
      .flatMap((value) => String(value)
        .replace(/[^\p{L}\p{N}\s]/gu, ' ')
        .split(/\s+/u)
        .map((token) => cleanText(token))
        .filter((token) => token.length >= 2)),
  )
  const forbiddenNames = [
    counterparty?.name,
    counterparty?.name && counterparty.name.length >= 3 ? counterparty.name.slice(1) : '',
    ...((runtimeCase?.duo?.socialGraph || []).map((item) => item?.name || '')),
    ...(channel === 'evidence_present' ? [] : collectForbiddenOrganizations(runtimeCase)),
  ]
    .map((value) => cleanText(value || ''))
    .filter((value) => value.length >= 2)
    .filter((value) => !protectedEvidenceTokens.has(value))

  for (const token of forbiddenNames) {
    next = next.replace(new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gu'), '\uC0C1\uB300\uBC29')
  }
  next = next.replace(/\d[\d,.\s]*(?:\uC5B5\s*\uC6D0|\uCC9C\uB9CC\s*\uC6D0|\uBC31\uB9CC\s*\uC6D0|\uC2ED\uB9CC\s*\uC6D0|\uB9CC\s*\uC6D0|\uCC9C\s*\uC6D0|\uBC31\s*\uC6D0|\uC6D0)/gu, '\uAD6C\uCCB4 \uAE08\uC561')
  return next
}

function normalizeInterrogationVariant(text, entry, judgeAddress, mode) {
  let next = normalizeLeadJudgeAddress(text, judgeAddress)
  if (mode !== 'generic_builder') {
    if ((entry.lieState === 'S0' || entry.lieState === 'S1') && !HEDGE_RE.test(next)) {
      return next.replace(/[.!?]\s*$/u, ', 다만 범위와 책임은 나눠 봐야 합니다.')
    }

    if (entry.lieState === 'S3' && !BLAME_RE.test(next)) {
      return next.replace(/[.!?]\s*$/u, ', 상대 쪽 조치 책임도 분명합니다.')
    }

    if (entry.lieState === 'S5' && !CONFESSION_RE.test(next)) {
      return next.replace(/[.!?]\s*$/u, ', 그 점은 인정합니다.')
    }

    return next
  }

  if ((entry.lieState === 'S0' || entry.lieState === 'S1') && SOFTEN_RE.test(next) && !HEDGE_RE.test(next)) {
    next = appendSentence(next, '다만 범위와 책임은 구분해 주십시오.')
  }

  if (entry.lieState === 'S2' && !PARTIAL_ADMIT_RE.test(next)) {
    next = appendSentence(next, '적어도 제 대응이 거칠었던 점은 인정합니다.')
  }

  if (entry.lieState === 'S3' && !BLAME_RE.test(next)) {
    next = appendSentence(next, '문제는 상대방 측 대응에도 분명히 있습니다.')
  }

  if (entry.lieState === 'S4' && !RATTLED_RE.test(next)) {
    next = appendSentence(next, '그때는 너무 흔들렸습니다.')
  }

  if (entry.lieState === 'S5' && !CONFESSION_RE.test(next)) {
    next = appendSentence(next, '이 부분은 제 책임으로 인정합니다.')
  }

  return next
}

function trimCueToken(token) {
  return cleanText(token || '').replace(/[이가은는을를와과도만에의로]+$/u, '')
}

const NON_MONETARY_CUE_TOKEN_RE = /\uC1A1\uAE08|\uC774\uCCB4|\uAE08\uC561|\uACC4\uC88C|\uD658\uAE09|\uBCF4\uC99D\uAE08|\uC6D4\uC138|\uC815\uC0B0|\uC608\uCE58|\uB0A9\uBD80|\uC218\uB2F9|\uAE09\uC5EC|\uACC4\uC57D\uAE08|\uC704\uC57D\uAE08|\uBC30\uC0C1\uAE08|\uD569\uC758\uAE08|\uCC44\uBB34|\uB300\uCD9C|\uC735\uC790|\uC784\uB300\uB8CC|\uC218\uC218\uB8CC|\uB9E4\uCD9C|\uD310\uB9E4|\uC784\uB300\uC778|\uC784\uCC28\uC778|\uCC44\uAD8C\uC790|\uCC44\uBB34\uC790|\uC218\uC785|\uC7AC\uC815|\uACBD\uC81C/u

function isMonetaryEvidence(runtimeCase, evidence) {
  const monetarySet = new Set(runtimeCase?.monetaryDisputeIds || [])
  return Boolean(
    evidence &&
    Array.isArray(evidence.proves) &&
    evidence.proves.some((disputeId) => monetarySet.has(disputeId)),
  )
}

function filterCueTokens(tokens, allowMonetaryTerms) {
  if (allowMonetaryTerms) return tokens
  return tokens.filter((token) => !NON_MONETARY_CUE_TOKEN_RE.test(token))
}

function filterPartyNameTokens(tokens, runtimeCase, entry) {
  const names = [
    getSpeaker(runtimeCase, entry)?.name,
    getCounterparty(runtimeCase, entry)?.name,
  ]
    .flatMap((value) => {
      const cleaned = cleanText(value || '')
      if (!cleaned) return []
      return cleaned.length >= 3 ? [cleaned, cleaned.slice(1)] : [cleaned]
    })
    .filter(Boolean)

  if (names.length === 0) return tokens
  return tokens.filter((token) => !names.some((name) => token === name))
}

function deriveEvidenceSpecificCue(runtimeCase, entry) {
  const evidenceId = entry?.evidenceId
  if (!evidenceId) return ''
  const evidence = (runtimeCase?.evidence || []).find((item) => item?.id === evidenceId)
  if (!evidence) return ''
  const allowMonetaryTerms = isMonetaryEvidence(runtimeCase, evidence)

  const preferredSource = cleanText(evidence?.name || '') || cleanText(evidence?.surfaceName || '') || cleanText(evidence?.description || '')
  const raw = preferredSource
    .replace(/\bAI\b/giu, '\uC0DD\uC131')
    .replace(/\uD504\uB86C\uD504\uD2B8/gu, '\uC0DD\uC131 \uBB38\uAD6C')
    .replace(/\bexport\b/giu, '\uB0B4\uBCF4\uB0B4\uAE30 \uAE30\uB85D')
    .replace(/system prompt/giu, '\uC9C0\uC2DC \uBB38\uAD6C')
    .replace(/instruction/giu, '\uC9C0\uC2DC \uBB38\uAD6C')
    .replace(/\uCCAD\uB144\uC6D4\uC138\uC9C0\uC6D0/gu, '\uCCAD\uB144 \uC9C0\uC6D0 \uC81C\uB3C4')
    .replace(/\uC6D4\uC138\uC9C0\uC6D0/gu, '\uC9C0\uC6D0 \uC81C\uB3C4')

  const generic = new Set([
    '\uAD00\uB828',
    '\uC790\uB8CC',
    '\uAE30\uB85D',
    '\uBB38\uC11C',
    '\uD654\uBA74',
    '\uC774\uBBF8\uC9C0',
    '\uC6D0\uBCF8',
    '\uBE44\uAD50\uD45C',
    '\uC0DD\uC131',
    '\uBB38\uAD6C',
    '\uB0B4\uBCF4\uB0B4\uAE30',
    '\uAE30\uB85D\uC640',
  ])

  const tokens = filterPartyNameTokens(filterCueTokens(raw
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/u)
    .map((token) => trimCueToken(token))
    .filter((token) => token.length >= 2)
    .filter((token) => !generic.has(token)), allowMonetaryTerms), runtimeCase, entry)

  let cue = ''
  if (tokens.length >= 3) cue = tokens.slice(-3).join(' ')
  else if (tokens.length >= 2) cue = tokens.slice(-2).join(' ')
  else if (tokens.length === 1) cue = tokens[0]

  if (!cue || /\uC0C1\uB300|\uADF8\uCABD|\uB2F9\uC0AC\uC790/u.test(cue)) {
    const altTokens = filterPartyNameTokens(filterCueTokens(cleanText(evidence?.name || '')
      .replace(/\bAI\b/giu, '\uC0DD\uC131')
      .replace(/\uD504\uB86C\uD504\uD2B8/gu, '\uC0DD\uC131 \uBB38\uAD6C')
      .replace(/\bexport\b/giu, '\uB0B4\uBCF4\uB0B4\uAE30 \uAE30\uB85D')
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .split(/\s+/u)
      .map((token) => trimCueToken(token))
      .filter((token) => token.length >= 2)
      .filter((token) => !generic.has(token)), allowMonetaryTerms), runtimeCase, entry)
    if (altTokens.length >= 3) cue = altTokens.slice(-3).join(' ')
    else if (altTokens.length >= 2) cue = altTokens.slice(-2).join(' ')
    else if (altTokens.length === 1) cue = altTokens[0]
  }

  return cue
}

function reinforceEvidenceSpecificCue(text, runtimeCase, entry, judgeAddress) {
  const evidence = (runtimeCase?.evidence || []).find((item) => item?.id === entry?.evidenceId)
  const allowMonetaryTerms = isMonetaryEvidence(runtimeCase, evidence)
  const cue = deriveEvidenceSpecificCue(runtimeCase, entry)
  if (!cue && !evidence) return text

  const exactCueTokens = filterPartyNameTokens(filterCueTokens(cleanText(evidence?.name || evidence?.surfaceName || '')
    .replace(/\bAI\b/giu, '\uC0DD\uC131')
    .replace(/\uD504\uB86C\uD504\uD2B8/gu, '\uC0DD\uC131 \uBB38\uAD6C')
    .replace(/\bexport\b/giu, '\uB0B4\uBCF4\uB0B4\uAE30 \uAE30\uB85D')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/u)
    .map((token) => trimCueToken(token))
    .filter((token) => token.length >= 2), allowMonetaryTerms), runtimeCase, entry)
  const exactCue = exactCueTokens.length >= 3
    ? exactCueTokens.slice(-3).join(' ')
    : exactCueTokens.length >= 2
      ? exactCueTokens.slice(-2).join(' ')
      : exactCueTokens[0] || cue

  let next = cleanText(text)
  if (/\uC0C1\uB300\uBC29\s+\S+\s+\uC0C1\uB300\uBC29/u.test(next)) {
    next = next.replace(/\uC0C1\uB300\uBC29\s+\S+\s+\uC0C1\uB300\uBC29/u, exactCue)
  }

  const cueTokens = (cue || exactCue).split(/\s+/u).filter((token) => token.length >= 2)
  const hitCount = cueTokens.filter((token) => next.includes(token)).length
  if (hitCount >= Math.min(2, cueTokens.length)) return next

  const body = next.replace(/^(?:\uC7AC\uD310\uAD00\uB2D8|\uC7AC\uD310\uC7A5\uB2D8|\uD310\uC0AC\uB2D8)[, ]*/u, '')
  return `${judgeAddress}, ${(cue || exactCue)}\uBD80\uD130 \uBA3C\uC800 \uBCF4\uC154\uC57C \uD569\uB2C8\uB2E4\uB9CC ${body}`.replace(/\s+/g, ' ').trim()
}

function normalizeJudgeFacingVariant(text, judgeAddress, runtimeCase, entry, channel) {
  let next = normalizeLeadJudgeAddress(text, judgeAddress)
  next = replaceCounterpartyReference(next, runtimeCase, entry)
  if (channel === 'evidence_present') {
    next = reinforceEvidenceSpecificCue(next, runtimeCase, entry, judgeAddress)
  }
  next = enforceTruthThrottle(next, runtimeCase, entry, channel)
  return next
}

function needsVictimCosplayContour(entry) {
  return entry?.lieState === 'S3' || entry?.lieState === 'S4' || entry?.lieBand === 'mid' || entry?.lieBand === 'late'
}

function archetypeContourSentence(archetype, entry, variantId) {
  const seed = String(variantId || entry?.key || '')
  const pickIndex = seed ? seed.charCodeAt(seed.length - 1) % 3 : 0

  if (archetype === 'victim_cosplay') {
    const candidates = [
      '저 역시 그 과정에서 이미 손해와 피해를 함께 감당하고 있었습니다.',
      '저도 그 시점에는 이미 몰렸던 사람처럼 버티고 있었습니다.',
      '그때의 저는 이미 억울함과 손해를 한꺼번에 떠안은 상태였습니다.',
    ]
    return candidates[pickIndex]
  }

  if (archetype === 'cold_logic') {
    const candidates = [
      '기록과 경위, 책임 범위를 나눠 보셔야 합니다.',
      '절차와 권한, 경위가 어떻게 이어졌는지부터 정리해 보셔야 합니다.',
      '남는 기록과 책임 범위를 먼저 분리해서 보셔야 합니다.',
    ]
    return candidates[pickIndex]
  }

  if (archetype === 'affect_flattening' && entry?.lieState === 'S4') {
    const candidates = [
      '그때는 불안과 압박이 겹쳐서 평소처럼 정리하지 못했습니다.',
      '감정이 앞섰지만 겉으로는 버티려 했던 상태였습니다.',
      '겉으로는 눌러 두었지만 내부적으로는 크게 흔들리고 있었습니다.',
    ]
    return candidates[pickIndex]
  }

  return ''
}

function enforceArchetypeToneContour(text, runtimeCase, entry, channel, variantId) {
  if (!['interrogation', 'evidence_present', 'dossier'].includes(channel)) return text
  const speaker = getSpeaker(runtimeCase, entry)
  const archetype = speaker?.archetype
  if (!archetype) return text

  let next = cleanText(text)
  if (archetype === 'victim_cosplay' && needsVictimCosplayContour(entry) && markerCount(next, SELF_VICTIM_MARKERS) === 0) {
    next = appendClause(next, archetypeContourSentence(archetype, entry, variantId))
  }

  if (archetype === 'cold_logic') {
    const analytic = markerCount(next, ANALYTIC_MARKERS)
    const processShield = markerCount(next, PROCESS_MARKERS)
    if (analytic + processShield < 2) {
      next = appendClause(next, archetypeContourSentence(archetype, entry, variantId))
    }
  }

  if (archetype === 'affect_flattening' && entry?.lieState === 'S4') {
    const emotional = markerCount(next, ['불안', '두려', '흔들', '감정', '화가', '억울'])
    const defensive = markerCount(next, ['다만', '일부', '정확히는', '우선', '그 부분', '범위를', '구분', '정리', '확인', '보시'])
      + markerCount(next, ['아닙니다', '아니에요', '아니었습니다', '아닌데', '그렇지 않습니다', '기억나지 않습니다', '기억이 나지 않습니다', '모릅니다', '없습니다', '부인', '부정'])
    if (emotional === 0 || defensive < 2) {
      next = appendClause(next, '그때도 겉으로는 버티려 했지만 내부적으로는 꽤 흔들렸습니다.')
    }
  }

  if (archetype === 'affect_flattening' && entry?.lieState !== 'S4') {
    next = next
      .replace(/잘못과 불안을 구분해서 판단해 주십시오/gu, '잘못과 판단 흔들림은 구분해서 봐 주십시오')
      .replace(/감정의 흔들림이 책임 전부를 대신하지는 않습니다/gu, '판단이 흔들린 사정이 책임 전부를 대신하지는 않습니다')
      .replace(/그때의 두려움을 이해해 주신다면 설명이 더 이어질 수 있습니다/gu, '그때의 부담을 이해해 주신다면 설명이 더 이어질 수 있습니다')
      .replace(/불안이 컸다는 사실과 책임의 무게를 분리해 주십시오/gu, '압박이 컸다는 사정과 책임의 무게를 분리해 주십시오')
  }

  return next
}

function normalizeChannelEntries(bundle, runtimeCase, channel, mode) {
  const group = bundle?.channels?.[channel]
  if (!group || !Array.isArray(group.entries)) return

  for (const entry of group.entries) {
    const judgeAddress = resolveJudgeAddress(runtimeCase, channel, entry, mode)
    if (!Array.isArray(entry.variants)) continue

    for (const variant of entry.variants) {
      if (!variant || typeof variant.text !== 'string') continue
      if (channel === 'interrogation') {
        variant.text = normalizeInterrogationVariant(variant.text, entry, judgeAddress, mode)
        variant.text = replaceCounterpartyReference(variant.text, runtimeCase, entry)
        variant.text = enforceTruthThrottle(variant.text, runtimeCase, entry, channel)
      } else if (['evidence_present', 'dossier', 'witness'].includes(channel)) {
        variant.text = normalizeJudgeFacingVariant(variant.text, judgeAddress, runtimeCase, entry, channel)
      }
      variant.text = enforceArchetypeToneContour(variant.text, runtimeCase, entry, channel, variant.id)
    }
  }
}

function normalizeScriptedBundle({ bundle, runtimeCase, mode = 'generic_builder' }) {
  normalizeChannelEntries(bundle, runtimeCase, 'interrogation', mode)
  normalizeChannelEntries(bundle, runtimeCase, 'evidence_present', mode)
  normalizeChannelEntries(bundle, runtimeCase, 'dossier', mode)
  normalizeChannelEntries(bundle, runtimeCase, 'witness', mode)
  return bundle
}

module.exports = {
  normalizeScriptedBundle,
}
