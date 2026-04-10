const GENERIC_JUDGE_TITLES = ['재판관님', '재판장님', '판사님', '재판부', '재판관', '재판장', '판사']

const DENIAL_MARKERS = [
  '아닙니다',
  '아니에요',
  '아니었습니다',
  '아닌데',
  '그렇지 않습니다',
  '기억나지 않습니다',
  '기억이 나지 않습니다',
  '모릅니다',
  '없습니다',
  '부인',
  '부정',
]

const CONFESSION_MARKERS = [
  '죄송',
  '인정합니다',
  '인정하',
  '사실입니다',
  '맞습니다',
  '제가 했',
  '제가 먼저',
  '제 잘못',
  '제가 잘못',
  '시인',
  '숨기지 않',
]

const BLAME_MARKERS = [
  '오히려',
  '문제는',
  '책임은',
  '상대',
  '그쪽',
  '저쪽',
  '먼저',
  '따지자면',
  '핵심은',
]

const HEDGE_MARKERS = [
  '다만',
  '일부',
  '정확히는',
  '우선',
  '그 부분',
  '범위를',
  '구분',
  '정리',
  '확인',
  '보시',
]

const ANALYTIC_MARKERS = [
  '의미',
  '시사',
  '가리키',
  '보여',
  '드러나',
  '설명',
  '정리',
  '때문',
  '핵심',
  '결국',
  '따라서',
  '그래서',
  '범위',
  '책임',
  '권한',
  '경위',
]

function readJson(fs, filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFKC')
    .replace(/[“”"'\u2018\u2019`]/g, ' ')
    .replace(/[.,!?;:·/\\|()[\]{}<>~\-_=+*^%$#@]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function splitSentences(value) {
  const text = String(value || '').trim()
  if (!text) return []
  return (text.match(/[^.!?]+[.!?]?/gu) || [])
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
}

function countSentences(value) {
  return splitSentences(value).length
}

function tokenize(value) {
  return normalizeText(value)
    .split(' ')
    .map((token) => token.trim())
    .filter((token) => token.length >= 2)
}

function toCharTrigrams(value) {
  const normalized = normalizeText(value).replace(/\s+/g, ' ').toLowerCase()
  const set = new Set()
  for (let i = 0; i <= normalized.length - 3; i += 1) {
    const slice = normalized.slice(i, i + 3)
    if (slice.trim().length === 3) set.add(slice)
  }
  return set
}

function trigramSimilarity(a, b) {
  const setA = toCharTrigrams(a)
  const setB = toCharTrigrams(b)
  if (!setA.size || !setB.size) return 0
  let shared = 0
  for (const item of setA) {
    if (setB.has(item)) shared += 1
  }
  const union = new Set([...setA, ...setB]).size
  return union ? shared / union : 0
}

function collectJudgeAddressTerms(runtimeCase, channel, entry) {
  const terms = new Set(GENERIC_JUDGE_TITLES)

  if (channel === 'witness') {
    const witness = (runtimeCase?.duo?.socialGraph || []).find((item) => item.id === entry.witnessId)
    if (hasText(witness?.witnessProfile?.addressJudge)) terms.add(witness.witnessProfile.addressJudge)
    if (hasText(witness?.addressJudge)) terms.add(witness.addressJudge)
  }

  return [...terms].filter(hasText)
}

function hasJudgeAddressUsage(text, runtimeCase, channel, entry) {
  const haystack = String(text || '')
  return collectJudgeAddressTerms(runtimeCase, channel, entry).some((term) => haystack.includes(term))
}

function getRuntimeSpeaker(runtimeCase, channel, entry) {
  if (channel === 'witness') {
    return (runtimeCase?.duo?.socialGraph || []).find((item) => item.id === entry.witnessId) || null
  }
  if (['interrogation', 'evidence_present', 'dossier'].includes(channel)) {
    return entry.party === 'a' ? runtimeCase?.duo?.partyA || null : runtimeCase?.duo?.partyB || null
  }
  return null
}

function getCounterparty(runtimeCase, entry) {
  if (entry.party === 'a') return runtimeCase?.duo?.partyB || null
  if (entry.party === 'b') return runtimeCase?.duo?.partyA || null
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
  const speaker = getRuntimeSpeaker(runtimeCase, 'interrogation', entry)
  const preferred = speaker?.callTerms?.toJudge
  if (hasText(preferred) && !leadLooksLikeJudgeAddress(preferred)) return preferred
  return fallbackCounterpartyJudgeReference(runtimeCase, entry)
}

function extractLeadAddress(text) {
  const normalized = String(text || '').trim()
  const match = normalized.match(/^([^,.!?]{2,20})[,.!?]/u)
  return match?.[1]?.trim() || ''
}

function leadLooksLikeJudgeAddress(leadAddress) {
  return GENERIC_JUDGE_TITLES.some((term) => leadAddress.includes(term))
}

function getEvidenceById(runtimeCase, evidenceId) {
  return (runtimeCase?.evidence || []).find((item) => item.id === evidenceId) || null
}

function markerCount(text, markers) {
  const haystack = String(text || '')
  return markers.reduce((count, marker) => count + (haystack.includes(marker) ? 1 : 0), 0)
}

function expectedToneForState(entry) {
  if (entry.lieState === 'S0' || entry.lieState === 'S1') return 'guarded'
  if (entry.lieState === 'S2') return 'defensive'
  if (entry.lieState === 'S3') return 'blaming'
  if (entry.lieState === 'S4') return 'rattled'
  if (entry.lieState === 'S5') return 'resigned'
  if (entry.depth === 'vague') return 'cautious'
  if (entry.depth === 'partial') return 'controlled'
  if (entry.depth === 'full') return 'steady'
  return 'neutral'
}

function toneMismatchIssues({ channel, entry, text, variantId }) {
  const issues = []
  const sentenceCount = countSentences(text)
  const tokenCount = tokenize(text).length
  const confessions = markerCount(text, CONFESSION_MARKERS)
  const denials = markerCount(text, DENIAL_MARKERS)
  const blame = markerCount(text, BLAME_MARKERS)
  const hedge = markerCount(text, HEDGE_MARKERS)
  const analytic = markerCount(text, ANALYTIC_MARKERS)
  const expected = expectedToneForState(entry)
  const label = [channel, variantId].filter(Boolean).join(':')

  if (entry.lieState === 'S0' || entry.lieState === 'S1') {
    if (confessions >= 2 && denials === 0) {
      issues.push({
        severity: 'FAIL',
        code: 'T1',
        message: `${label} reads confessional for ${entry.lieState} (${expected})`,
      })
    } else if (confessions >= 1 && denials === 0 && hedge === 0) {
      issues.push({
        severity: 'WARN',
        code: 'T2',
        message: `${label} may soften too abruptly for ${entry.lieState}`,
      })
    }
  }

  if (entry.lieState === 'S2') {
    if (confessions === 0 && denials >= 2 && hedge === 0) {
      issues.push({
        severity: 'WARN',
        code: 'T3',
        message: `${label} stays fully denied where S2 usually needs partial admission`,
      })
    }
  }

  if (entry.lieState === 'S3') {
    if (blame === 0 && confessions >= 1) {
      issues.push({
        severity: 'WARN',
        code: 'T4',
        message: `${label} does not sound blame-forward enough for S3`,
      })
    }
  }

  if (entry.lieState === 'S4') {
    if (markerCount(text, ['혼란', '당황', '답답', '급', '흔들', '버티']) === 0 && confessions === 0 && denials >= 2) {
      issues.push({
        severity: 'WARN',
        code: 'T5',
        message: `${label} feels too flat for S4 rattled tone`,
      })
    }
  }

  if (entry.lieState === 'S5') {
    if (denials >= 2 && confessions === 0) {
      issues.push({
        severity: 'FAIL',
        code: 'T6',
        message: `${label} still sounds like a denial at S5`,
      })
    } else if (confessions === 0) {
      issues.push({
        severity: 'WARN',
        code: 'T7',
        message: `${label} lacks an admission/resigned contour for S5`,
      })
    }
  }

  if (entry.depth === 'vague') {
    if (sentenceCount !== 1 || tokenCount > 36) {
      issues.push({
        severity: 'WARN',
        code: 'D1',
        message: `${label} is too expansive for vague depth (${sentenceCount} sentences, ${tokenCount} tokens)`,
      })
    }
  } else if (entry.depth === 'partial') {
    if (sentenceCount < 2 || sentenceCount > 3 || tokenCount > 72) {
      issues.push({
        severity: 'WARN',
        code: 'D2',
        message: `${label} feels off for partial depth (${sentenceCount} sentences, ${tokenCount} tokens)`,
      })
    }
  } else if (entry.depth === 'full') {
    if (sentenceCount < 3 || sentenceCount > 5 || tokenCount < 22 || (tokenCount < 18 && analytic === 0)) {
      issues.push({
        severity: 'WARN',
        code: 'D3',
        message: `${label} feels underdeveloped for full depth`,
      })
    }
  }

  return issues
}

function callTermIssues({ channel, entry, text, runtimeCase, variantId }) {
  const issues = []
  if (!['interrogation', 'evidence_present', 'dossier'].includes(channel)) return issues

  const speaker = getRuntimeSpeaker(runtimeCase, channel, entry)
  const counterparty = getCounterparty(runtimeCase, entry)
  const toJudge = resolveCounterpartyJudgeReference(runtimeCase, entry)
  const toPartner = speaker?.callTerms?.toPartner
  const angry = speaker?.callTerms?.angry
  const leadAddress = extractLeadAddress(text)
  const label = `${channel}:${variantId}`

  if (!leadLooksLikeJudgeAddress(leadAddress)) {
    issues.push({
      severity: 'FAIL',
      code: 'C2',
      message: `${label} does not open with a judge-facing address`,
    })
  }

  if (toJudge && leadAddress.includes(toJudge)) {
    issues.push({
      severity: 'FAIL',
      code: 'C3',
      message: `${label} uses toJudge as the salutation instead of a counterparty reference`,
    })
  }

  if ((toPartner && leadAddress.includes(toPartner)) || (angry && leadAddress.includes(angry))) {
    issues.push({
      severity: 'FAIL',
      code: 'C4',
      message: `${label} uses toPartner/angry as the salutation`,
    })
  }

  if (counterparty?.name && text.includes(counterparty.name) && toJudge) {
    issues.push({
      severity: 'WARN',
      code: 'C5',
      message: `${label} names the counterparty directly instead of using toJudge`,
    })
  }

  if ((entry.lieState === 'S4' || entry.lieState === 'S5' || entry.lieBand === 'late') && angry && text.includes(angry)) {
    issues.push({
      severity: 'WARN',
      code: 'C6',
      message: `${label} leaks angry direct-address wording into a judge-facing line`,
    })
  }

  return issues
}

function archetypeToneIssues({ channel, entry, text, runtimeCase, variantId }) {
  const issues = []
  if (!['interrogation', 'evidence_present', 'dossier'].includes(channel)) return issues

  const speaker = getRuntimeSpeaker(runtimeCase, channel, entry)
  if (!speaker) return issues
  const archetype = speaker.archetype
  const label = `${channel}:${variantId}`
  const analytic = markerCount(text, ANALYTIC_MARKERS)
  const emotional = markerCount(text, ['불안', '두려', '흔들', '감정', '화가', '억울'])
  const defensive = markerCount(text, HEDGE_MARKERS) + markerCount(text, DENIAL_MARKERS)
  const selfVictim = markerCount(text, ['억울', '몰렸', '찍혔', '손해', '희생', '피해'])
  const processShield = markerCount(text, ['절차', '범위', '기록', '경위', '구조', '권한'])

  if (archetype === 'cold_logic' && analytic + processShield < 2) {
    issues.push({
      severity: 'WARN',
      code: 'A6',
      message: `${label} sounds too impressionistic for cold_logic archetype`,
    })
  }

  if (archetype === 'victim_cosplay' && selfVictim === 0 && (entry.lieState === 'S3' || entry.lieState === 'S4' || entry.lieBand === 'mid' || entry.lieBand === 'late')) {
    issues.push({
      severity: 'WARN',
      code: 'A7',
      message: `${label} lacks self-victim framing for victim_cosplay archetype`,
    })
  }

  if (archetype === 'affect_flattening' && entry.lieState !== 'S4' && emotional >= 2) {
    issues.push({
      severity: 'WARN',
      code: 'A8',
      message: `${label} is more emotionally exposed than affect_flattening usually allows`,
    })
  }

  if (archetype === 'affect_flattening' && entry.lieState === 'S4' && emotional === 0 && defensive < 2) {
    issues.push({
      severity: 'WARN',
      code: 'A9',
      message: `${label} does not show enough controlled rattling for affect_flattening at S4`,
    })
  }

  return issues
}

function evidenceParrotingIssues({ channel, entry, text, runtimeCase, variantId }) {
  if (channel !== 'evidence_present') return []
  const issues = []
  const evidence = getEvidenceById(runtimeCase, entry.evidenceId)
  if (!evidence) return issues

  const sourceParts = [
    evidence.name,
    evidence.surfaceName,
    evidence.description,
    evidence.surfaceDescription,
    evidence.meta?.name,
    evidence.meta?.type,
    evidence.meta?.sourceLabel,
    evidence.meta?.stageLabel,
    evidence.investigationResults && typeof evidence.investigationResults === 'object'
      ? Object.values(evidence.investigationResults).join(' ')
      : '',
    evidence.partyContext?.a?.questionAngle,
    evidence.partyContext?.a?.implication,
    evidence.partyContext?.b?.questionAngle,
    evidence.partyContext?.b?.implication,
  ].filter(hasText).join(' ')

  const sourceTokens = tokenize(sourceParts)
  const textTokens = tokenize(text)
  const sharedTokens = [...new Set(textTokens.filter((token) => sourceTokens.includes(token)))]
  const sourceCoverage = sourceTokens.length ? sharedTokens.length / sourceTokens.length : 0
  const textCoverage = textTokens.length ? sharedTokens.length / textTokens.length : 0
  const sourceTrigram = trigramSimilarity(text, sourceParts)
  const analyticalHits = markerCount(text, ANALYTIC_MARKERS)
  const genericCueHits = markerCount(text, ['자료는', '자료가', '핵심은', '보여 줍', '보여줍', '뜻합니다', '의미합니다', '설명합니다'])

  if (sourceCoverage >= 0.82 || sourceTrigram >= 0.8 || normalizeText(text) === normalizeText(sourceParts)) {
    issues.push({
      severity: 'FAIL',
      code: 'E1',
      message: `${channel}:${variantId} mostly parrots evidence text (coverage=${sourceCoverage.toFixed(2)}, trigram=${sourceTrigram.toFixed(2)})`,
    })
  } else if (sourceCoverage >= 0.5 || textCoverage >= 0.6 || sourceTrigram >= 0.65) {
    if (analyticalHits === 0 && genericCueHits === 0) {
      issues.push({
        severity: 'WARN',
        code: 'E2',
        message: `${channel}:${variantId} leans on evidence phrasing without enough interpretation`,
      })
    }
  }

  if (textCoverage >= 0.7 && textTokens.length <= sourceTokens.length + 6) {
    issues.push({
      severity: 'WARN',
      code: 'E3',
      message: `${channel}:${variantId} stays too close to the source wording`,
    })
  }

  return issues
}

function adjacencyRepetitionIssues({ channel, entry, variants }) {
  const issues = []
  for (let i = 0; i < variants.length - 1; i += 1) {
    const current = variants[i]
    const next = variants[i + 1]
    const textSimilarity = trigramSimilarity(current.text, next.text)
    const hintSimilarity = trigramSimilarity(current.behaviorHint || '', next.behaviorHint || '')
    const exactTextMatch = normalizeText(current.text) === normalizeText(next.text)
    const exactHintMatch = normalizeText(current.behaviorHint || '') === normalizeText(next.behaviorHint || '')
    const label = `${channel}:${entry.key || 'entry'}`

    if (exactTextMatch && exactHintMatch) {
      issues.push({
        severity: 'FAIL',
        code: 'R1',
        message: `${label} variants ${i + 1} and ${i + 2} are duplicates`,
      })
      continue
    }

    if (textSimilarity >= 0.86 || (textSimilarity >= 0.76 && hintSimilarity >= 0.55)) {
      issues.push({
        severity: 'WARN',
        code: 'R2',
        message: `${label} adjacent variants ${i + 1} and ${i + 2} are too similar (${Math.round(textSimilarity * 100)}%)`,
      })
    }
  }
  return issues
}

function gatherSemanticIssues({ bundle, runtimeCase }) {
  const issues = []
  for (const [channel, payload] of Object.entries(bundle?.channels || {})) {
    for (const entry of payload?.entries || []) {
      const variants = Array.isArray(entry.variants) ? entry.variants : []
      const judgeFacing = ['interrogation', 'evidence_present', 'dossier', 'witness'].includes(channel)
      const hasJudgeAddress = variants.some((variant) => hasJudgeAddressUsage(variant.text, runtimeCase, channel, entry))

      if (judgeFacing && !hasJudgeAddress) {
        issues.push({
          severity: 'WARN',
          code: 'A1',
          message: `${channel}:${entry.key || entry.id || 'entry'} lacks a judge-facing address in text`,
        })
      }

      for (const variant of variants) {
        if (!hasText(variant.text)) {
          issues.push({
            severity: 'FAIL',
            code: 'S0',
            message: `${channel}:${variant.id || 'variant'} missing text`,
          })
          continue
        }

        issues.push(...toneMismatchIssues({
          channel,
          entry,
          text: variant.text,
          variantId: variant.id || 'variant',
        }))
        issues.push(...callTermIssues({
          channel,
          entry,
          text: variant.text,
          runtimeCase,
          variantId: variant.id || 'variant',
        }))
        issues.push(...archetypeToneIssues({
          channel,
          entry,
          text: variant.text,
          runtimeCase,
          variantId: variant.id || 'variant',
        }))
        issues.push(...evidenceParrotingIssues({
          channel,
          entry,
          text: variant.text,
          runtimeCase,
          variantId: variant.id || 'variant',
        }))
      }

      if (variants.length > 1) {
        issues.push(...adjacencyRepetitionIssues({ channel, entry, variants }))
      }
    }
  }
  return issues
}

function summarizeIssues(issues) {
  return issues.reduce((acc, issue) => {
    acc[issue.severity] = (acc[issue.severity] || 0) + 1
    return acc
  }, {})
}

module.exports = {
  ANALYTIC_MARKERS,
  BLAME_MARKERS,
  CONFESSION_MARKERS,
  DENIAL_MARKERS,
  GENERIC_JUDGE_TITLES,
  HEDGE_MARKERS,
  adjacencyRepetitionIssues,
  archetypeToneIssues,
  callTermIssues,
  collectJudgeAddressTerms,
  countSentences,
  evidenceParrotingIssues,
  gatherSemanticIssues,
  getEvidenceById,
  getRuntimeSpeaker,
  hasJudgeAddressUsage,
  hasText,
  normalizeText,
  readJson,
  splitSentences,
  summarizeIssues,
  tokenize,
  toneMismatchIssues,
  trigramSimilarity,
}
