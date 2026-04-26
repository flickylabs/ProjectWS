#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const SCRIPTED_PATH = path.join(ROOT, 'src', 'data', 'scriptedText', 'spouse-01.json')
const ATOMS_PATH = path.join(ROOT, 'src', 'data', 'claimPolicies', 'spouse-01-v2-atoms.json')
const STRUCTURE_PATH = path.join(ROOT, 'src', 'data', 'claimPolicies', 'spouse-01-structure-v2.json')
const GAME_LOOP_PATH = path.join(ROOT, 'src', 'data', 'claimPolicies', 'spouse-01-v3-game-loop-data.json')
const REPORT_PATH = path.join(ROOT, 'tmp', 'QA-Q-spouse-01-codex-report.json')
const SUMMARY_PATH = path.join(ROOT, 'tmp', 'QA-Q-spouse-01-codex-summary.md')

function loadJson(filePath, fallback = null) {
  if (!fs.existsSync(filePath)) return fallback
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function countChars(text) {
  return Array.from(text || '').length
}

function sample(items, limit = 12) {
  return items.slice(0, limit)
}

function inc(obj, key, by = 1) {
  obj[key] = (obj[key] || 0) + by
}

function pushBy(obj, key, value) {
  if (!obj[key]) obj[key] = []
  obj[key].push(value)
}

function channelEntries(bundle, channel) {
  const body = bundle.channels?.[channel]
  if (!body) return []
  return Array.isArray(body) ? body : (body.entries || [])
}

function tagMap(tags = []) {
  const map = {}
  for (const tag of tags) {
    if (typeof tag !== 'string') continue
    const idx = tag.indexOf(':')
    if (idx < 0) {
      map[tag] = true
      continue
    }
    const key = tag.slice(0, idx)
    const value = tag.slice(idx + 1)
    if (map[key] === undefined) map[key] = value
    else if (Array.isArray(map[key])) map[key].push(value)
    else map[key] = [map[key], value]
  }
  return map
}

function flattenVariants(bundle) {
  const rows = []
  for (const [channel, body] of Object.entries(bundle.channels || {})) {
    const entries = Array.isArray(body) ? body : (body.entries || [])
    for (const entry of entries) {
      for (const variant of entry.variants || []) {
        const tmap = tagMap(variant.tags || [])
        rows.push({
          channel,
          key: entry.key,
          entry,
          id: variant.id,
          text: variant.text || '',
          behaviorHint: variant.behaviorHint || '',
          tags: variant.tags || [],
          tagMap: tmap,
          sourceRefs: variant.sourceRefs || [],
          speaker: tmap.speaker || entry.speaker || entry.party || null,
          speakerRole: tmap.speakerRole || null,
          listener: tmap.listener || null,
          address: tmap.address || null,
          party: entry.party || (['a', 'b'].includes(tmap.speaker) ? tmap.speaker : null),
          disputeId: entry.disputeId || tmap.disputeId || null,
          lieState: entry.lieState || tmap.lieState || null,
          lieBand: entry.lieBand || tmap.lieBand || null,
          questionType: entry.questionType || tmap.questionType || null,
          evidenceId: entry.evidenceId || tmap.evidenceId || null,
          investigationStage: entry.investigationStage || tmap.investigationStage || null,
        })
      }
    }
  }
  return rows
}

function findMatches(text, pattern) {
  const matches = []
  pattern.lastIndex = 0
  for (const match of text.matchAll(pattern)) {
    matches.push(match[0])
  }
  return matches
}

function makeHit(row, matches, extra = {}) {
  return {
    channel: row.channel,
    key: row.key,
    id: row.id,
    speaker: row.speaker,
    speakerRole: row.speakerRole,
    party: row.party,
    lieState: row.lieState,
    lieBand: row.lieBand,
    questionType: row.questionType,
    matches,
    text: row.text,
    recommendation: extra.recommendation || '검토',
    reason: extra.reason || undefined,
  }
}

function groupedHitReport(name, rows, pattern, classify) {
  const hits = []
  const byChannel = {}
  const byMatch = {}
  for (const row of rows) {
    const matches = findMatches(row.text, pattern)
    if (!matches.length) continue
    inc(byChannel, row.channel)
    for (const m of matches) inc(byMatch, m)
    hits.push(makeHit(row, matches, classify ? classify(row, matches) : {}))
  }
  return {
    name,
    totalEntries: hits.length,
    totalMatches: hits.reduce((sum, hit) => sum + hit.matches.length, 0),
    byChannel,
    byMatch,
    samples: sample(hits),
    all: hits,
  }
}

function splitSentences(text) {
  return (text.match(/[^.!?。]+[.!?。]?/gu) || [])
    .map((part) => part.trim())
    .filter(Boolean)
}

function isFormalJudgeSentence(sentence) {
  const normalized = sentence
    .replace(/[)"'\]\s]+$/gu, '')
    .replace(/[.!?。]+$/gu, '')
    .trim()
  if (!normalized) return true
  return /(십시오|니다|습니까|입니까|니까|겠습니다|하겠습니다|보겠습니다|주시겠습니까|주십시오)$/.test(normalized)
}

function checkJudgeStyle(rows) {
  const target = new Set(['judge_question', 'judge_contradiction', 'judge_evidence_combo', 'judge_witness_summon'])
  const bad = []
  const byChannel = {}
  for (const row of rows.filter((item) => target.has(item.channel))) {
    const badSentences = splitSentences(row.text).filter((sentence) => !isFormalJudgeSentence(sentence))
    if (!badSentences.length) continue
    inc(byChannel, row.channel)
    bad.push(makeHit(row, badSentences, {
      recommendation: '보정',
      reason: '재판관 발화가 합니다체/하십시오체 종결로 끝나지 않음',
    }))
  }
  return {
    name: '재판관 발화 합니다체 검증',
    targetChannels: [...target],
    totalEntries: bad.length,
    byChannel,
    samples: sample(bad),
    all: bad,
  }
}

function checkQuestionDimension(rows) {
  const infoSignals = /무엇|뭘|어디|언제|누구|어느\s*(?:시점|장소|쪽|선)|어떤|무슨|확인|설명|말씀해\s*주십시오|밝혀|자료|기록|내역/u
  const motiveSignals = /왜|이유|어째서|무슨\s*마음|심리|동기|두려워|겁났|흔들렸|불안|의도/u
  const candidates = []
  const byChannel = {}
  const classes = {}
  for (const row of rows.filter((item) => item.channel === 'judge_question' || item.channel === 'judge_contradiction')) {
    const info = infoSignals.test(row.text)
    const motive = motiveSignals.test(row.text)
    const expected = row.questionType || row.entry.questionType || row.entry.tone || 'none'
    let classification = 'ok'
    if (row.channel === 'judge_question') {
      if (expected === 'fact_pursuit' && motive) classification = 'fact_pursuit에 동기 신호 포함'
      if (expected === 'motive_search' && !motive && info) classification = 'motive_search가 정보 추궁형'
      if (expected === 'empathy_approach' && !motive && info) classification = 'empathy_approach가 정보 추궁형'
    } else if (info && motive) {
      classification = 'judge_contradiction 정보/동기 신호 혼재'
    }
    inc(classes, classification)
    if (classification === 'ok') continue
    inc(byChannel, row.channel)
    candidates.push(makeHit(row, [classification], {
      recommendation: '검토',
      reason: `expected=${expected}, infoSignal=${info}, motiveSignal=${motive}`,
    }))
  }
  return {
    name: '정보 추궁 vs 동기 추궁 차원 검토',
    totalCandidates: candidates.length,
    byChannel,
    classes,
    samples: sample(candidates, 20),
    all: candidates,
  }
}

function checkCallTerms(rows) {
  const wrongTags = []
  const directCalls = []
  const directCallReview = []
  const missingExpectedText = []
  const byChannel = {}
  for (const row of rows) {
    if (!['a', 'b'].includes(row.speaker)) continue
    const expectedTag = row.speaker === 'a' ? '제_남편' : '제_아내'
    const forbiddenTag = row.speaker === 'a' ? '제_아내' : '제_남편'
    const expectedText = row.speaker === 'a' ? '제 남편' : '제 아내'
    const forbiddenText = row.speaker === 'a' ? '제 아내' : '제 남편'
    const callTag = row.tagMap.callTerm
    const counterTag = row.tagMap.counterpartyRef
    if (callTag === forbiddenTag || counterTag === forbiddenTag || row.text.includes(forbiddenText)) {
      inc(byChannel, row.channel)
      wrongTags.push(makeHit(row, [forbiddenTag, forbiddenText], {
        recommendation: '보정',
        reason: `speaker=${row.speaker} expected ${expectedTag}/${expectedText}`,
      }))
    }
    const directMatches = [
      ...findMatches(row.text, /(?:^|[\s"'(])자기(?:야)?(?=[,.!?…]|$)/gu).map((value) => value.trim()),
      ...findMatches(row.text, /이준호!|박지연!/gu),
    ]
    if (directMatches.length) {
      const hit = makeHit(row, directMatches, {
        recommendation: '검토',
        reason: '양측 직접 호칭 사용 지점',
      })
      directCalls.push(hit)
      const looksDirect = row.tagMap.audience === 'both' || row.tagMap.scope === 'all_present' || row.address === 'toBoth'
      if (!looksDirect) {
        inc(byChannel, row.channel)
        directCallReview.push({ ...hit, reason: '재판관/단독 상대 맥락에서 직접 호칭처럼 보임' })
      }
    }
    if (
      (row.address === 'toJudge' || row.listener === 'judge') &&
      (row.text.includes('남편') || row.text.includes('아내')) &&
      !row.text.includes(expectedText) &&
      !row.text.includes('남편이자') &&
      !row.text.includes('아내라는')
    ) {
      missingExpectedText.push(makeHit(row, [expectedText], {
        recommendation: '검토',
        reason: '배우자 지칭이 기대 callTerm과 다를 수 있음',
      }))
    }
  }
  return {
    name: 'NPC 발화 callTerms 정합성',
    totalIssues: wrongTags.length + directCallReview.length,
    byChannel,
    wrongCounterpartyRef: {
      total: wrongTags.length,
      samples: sample(wrongTags),
      all: wrongTags,
    },
    directCallOccurrences: {
      total: directCalls.length,
      samples: sample(directCalls),
      all: directCalls,
    },
    directCallReview: {
      total: directCallReview.length,
      samples: sample(directCallReview),
      all: directCallReview,
    },
    textCallTermReviewOnly: {
      total: missingExpectedText.length,
      samples: sample(missingExpectedText),
    },
  }
}

function checkTruthThrottle(rows) {
  const patterns = {
    '삼천만원': /삼천\s*만\s*원|3,?000\s*만\s*원|3000\s*만\s*원/gu,
    '이천만원': /이천\s*만\s*원|2,?000\s*만\s*원|2000\s*만\s*원/gu,
    '위임장': /위임장/gu,
  }
  const hits = []
  const byLexeme = {}
  const byChannel = {}
  for (const row of rows) {
    if (!['a', 'b'].includes(row.speaker)) continue
    if (!['S0', 'S1'].includes(row.lieState)) continue
    for (const [label, pattern] of Object.entries(patterns)) {
      const matches = findMatches(row.text, pattern)
      if (!matches.length) continue
      inc(byLexeme, label)
      inc(byChannel, row.channel)
      hits.push(makeHit(row, matches, {
        recommendation: '보정',
        reason: 'S0/S1 NPC 직접 발화의 Truth Throttle 금지 lexeme',
      }))
    }
  }
  return {
    name: 'Truth Throttle banned_lexemes 검증',
    totalEntries: hits.length,
    byLexeme,
    byChannel,
    samples: sample(hits),
    all: hits,
  }
}

function validateUniqueEntries(entries, channel) {
  const seen = new Map()
  const duplicates = []
  for (const entry of entries) {
    if (seen.has(entry.key)) {
      duplicates.push({ channel, key: entry.key })
    } else {
      seen.set(entry.key, entry)
    }
  }
  return { seen, duplicates }
}

function checkKeys(bundle) {
  const result = {}

  const interrogationEntries = channelEntries(bundle, 'interrogation')
  const interrogationCoverage = bundle.coverage.interrogation
  const interrogationUnique = validateUniqueEntries(interrogationEntries, 'interrogation')
  const expectedInterrogation = []
  for (const party of interrogationCoverage.parties) {
    for (const disputeId of interrogationCoverage.disputes) {
      for (const lieState of interrogationCoverage.lieStates) {
        for (const questionType of interrogationCoverage.questionTypes) {
          expectedInterrogation.push([party, disputeId, lieState, questionType].join('|'))
        }
      }
    }
  }
  const actualInterrogation = new Set(interrogationEntries.map((entry) => entry.key))
  const invalidInterrogation = interrogationEntries
    .filter((entry) => entry.key !== [entry.party, entry.disputeId, entry.lieState, entry.questionType].join('|'))
    .map((entry) => ({ key: entry.key, expected: [entry.party, entry.disputeId, entry.lieState, entry.questionType].join('|') }))
  result.interrogation = {
    expectedCells: expectedInterrogation.length,
    actualEntries: interrogationEntries.length,
    missing: expectedInterrogation.filter((key) => !actualInterrogation.has(key)),
    extra: interrogationEntries.map((entry) => entry.key).filter((key) => !expectedInterrogation.includes(key)),
    duplicates: interrogationUnique.duplicates,
    invalidPayloadKeys: invalidInterrogation,
    variantsPerKeyExpected: interrogationCoverage.variantsPerKey,
    variantCountMismatches: interrogationEntries
      .filter((entry) => (entry.variants || []).length !== interrogationCoverage.variantsPerKey)
      .map((entry) => ({ key: entry.key, variants: (entry.variants || []).length })),
  }

  const evidenceEntries = channelEntries(bundle, 'evidence_present')
  const evidenceCoverage = bundle.coverage.evidence_present
  const evidenceUnique = validateUniqueEntries(evidenceEntries, 'evidence_present')
  const subjectRoleEntries = evidenceEntries.filter((entry) => !entry.investigationStage)
  const stageEntries = evidenceEntries.filter((entry) => entry.investigationStage)
  const expectedSubjectRole = []
  const actualSubjectRole = new Set(subjectRoleEntries.map((entry) => entry.key))
  for (const entry of subjectRoleEntries) {
    expectedSubjectRole.push([entry.party, entry.evidenceId, entry.lieBand, entry.subjectRole].join('|'))
  }
  const invalidSubjectRole = subjectRoleEntries
    .filter((entry) => entry.key !== [entry.party, entry.evidenceId, entry.lieBand, entry.subjectRole].join('|'))
    .map((entry) => ({ key: entry.key, expected: [entry.party, entry.evidenceId, entry.lieBand, entry.subjectRole].join('|') }))
  const expectedStage = []
  for (const party of evidenceCoverage.parties) {
    for (const evidenceId of evidenceCoverage.evidenceIds) {
      for (const lieBand of evidenceCoverage.lieBands) {
        for (const stage of evidenceCoverage.investigationStages) {
          expectedStage.push([party, evidenceId, lieBand, String(stage)].join('|'))
        }
      }
    }
  }
  const actualStage = new Set(stageEntries.map((entry) => entry.key))
  const coverageStageValues = new Set(evidenceCoverage.investigationStages.map((stage) => String(stage)))
  const stageValueSetsByEvidence = {}
  for (const entry of stageEntries) {
    if (!stageValueSetsByEvidence[entry.evidenceId]) stageValueSetsByEvidence[entry.evidenceId] = new Set()
    stageValueSetsByEvidence[entry.evidenceId].add(String(entry.investigationStage))
  }
  const normalizedStageValueSetsByEvidence = Object.fromEntries(
    Object.entries(stageValueSetsByEvidence).map(([evidenceId, values]) => [evidenceId, [...values].sort()]),
  )
  const coverageStageValueMismatches = stageEntries
    .filter((entry) => !coverageStageValues.has(String(entry.investigationStage)))
    .map((entry) => ({
      key: entry.key,
      evidenceId: entry.evidenceId,
      investigationStage: String(entry.investigationStage),
      expectedOneOf: [...coverageStageValues],
    }))
  const invalidStage = stageEntries
    .filter((entry) => entry.key !== [entry.party, entry.evidenceId, entry.lieBand, String(entry.investigationStage)].join('|'))
    .map((entry) => ({ key: entry.key, expected: [entry.party, entry.evidenceId, entry.lieBand, String(entry.investigationStage)].join('|') }))
  result.evidence_present = {
    expectedSubjectRoleCells: 42,
    actualSubjectRoleEntries: subjectRoleEntries.length,
    expectedStageCells: expectedStage.length,
    actualStageEntries: stageEntries.length,
    subjectRoleKeyPayloadMismatches: invalidSubjectRole,
    stageMissingAgainstCoverageValues: expectedStage.filter((key) => !actualStage.has(key)),
    stageExtraAgainstCoverageValues: stageEntries.map((entry) => entry.key).filter((key) => !expectedStage.includes(key)),
    stageValueSetsByEvidence: normalizedStageValueSetsByEvidence,
    coverageStageValueMismatches,
    stageKeyPayloadMismatches: invalidStage,
    duplicates: evidenceUnique.duplicates,
    keyCollisionCount: evidenceEntries.length - new Set(evidenceEntries.map((entry) => entry.key)).size,
    subjectRoleVariantCounts: countEntriesByVariants(subjectRoleEntries),
    stageVariantCounts: countEntriesByVariants(stageEntries),
    subjectRoleUniqueByObservedPayload: actualSubjectRole.size === subjectRoleEntries.length,
  }

  const dossierEntries = channelEntries(bundle, 'dossier')
  const dossierCoverage = bundle.coverage.dossier
  const dossierUnique = validateUniqueEntries(dossierEntries, 'dossier')
  const expectedDossier = []
  for (const questionId of dossierCoverage.questionIds) {
    for (const lieBand of dossierCoverage.lieBands) {
      expectedDossier.push([questionId, lieBand].join('|'))
    }
  }
  const actualDossier = new Set(dossierEntries.map((entry) => entry.key))
  result.dossier = {
    expectedCells: expectedDossier.length,
    actualEntries: dossierEntries.length,
    missing: expectedDossier.filter((key) => !actualDossier.has(key)),
    extra: dossierEntries.map((entry) => entry.key).filter((key) => !expectedDossier.includes(key)),
    duplicates: dossierUnique.duplicates,
    invalidPayloadKeys: dossierEntries
      .filter((entry) => entry.key !== [entry.questionId, entry.lieBand].join('|'))
      .map((entry) => ({ key: entry.key, expected: [entry.questionId, entry.lieBand].join('|') })),
    variantCountMismatches: dossierEntries
      .filter((entry) => (entry.variants || []).length !== dossierCoverage.variantsPerKey)
      .map((entry) => ({ key: entry.key, variants: (entry.variants || []).length })),
  }

  const simpleSpecs = {
    judge_evidence_combo: {
      expectedCells: 24,
      expectedKey: (entry) => [entry.questionId || entry.dossierCardId, entry.tone].join('|'),
    },
    judge_witness_summon: {
      expectedCells: 9,
      expectedKey: (entry) => [entry.witnessId, entry.tone].join('|'),
    },
    rapport_milestone: {
      expectedCells: 6,
      expectedKey: (entry) => [entry.party, entry.threshold].join('|'),
    },
    contradict_milestone: {
      expectedCells: 6,
      expectedKey: (entry) => [entry.party, String(entry.token_count)].join('|'),
    },
  }
  for (const [channel, spec] of Object.entries(simpleSpecs)) {
    const entries = channelEntries(bundle, channel)
    const unique = validateUniqueEntries(entries, channel)
    result[channel] = {
      expectedCells: spec.expectedCells,
      actualEntries: entries.length,
      duplicates: unique.duplicates,
      invalidPayloadKeys: entries
        .filter((entry) => entry.key !== spec.expectedKey(entry))
        .map((entry) => ({ key: entry.key, expected: spec.expectedKey(entry) })),
      variantCountDistribution: countEntriesByVariants(entries),
    }
  }

  return result
}

function countEntriesByVariants(entries) {
  const counts = {}
  for (const entry of entries) inc(counts, String((entry.variants || []).length))
  return counts
}

function checkTags(rows) {
  const dimensions = [
    'channel',
    'speaker',
    'speakerRole',
    'listener',
    'listenerRole',
    'address',
    'scope',
    'revealScope',
    'register',
    'honorific',
    'audience',
    'tense',
    'relationship',
    'judgeAddress',
    'callTerm',
    'counterpartyRef',
    'mentionTarget',
    'questionType',
    'stance',
    'emotion',
    'continuity',
    'reveal',
    'revealGuard',
    'disclosure',
    'responseMode',
    'rapport',
    'contradict_token',
  ]
  const missingByDimension = {}
  const missingByChannel = {}
  const mismatchedChannelTag = []
  const missingRows = []
  for (const row of rows) {
    const missing = dimensions.filter((dimension) => row.tagMap[dimension] === undefined)
    if (missing.length) {
      missingRows.push({
        channel: row.channel,
        key: row.key,
        id: row.id,
        missing,
        text: row.text,
      })
      for (const dimension of missing) {
        inc(missingByDimension, dimension)
        inc(missingByChannel, `${row.channel}:${dimension}`)
      }
    }
    if (row.tagMap.channel && row.tagMap.channel !== row.channel) {
      mismatchedChannelTag.push({
        channel: row.channel,
        tagChannel: row.tagMap.channel,
        key: row.key,
        id: row.id,
        text: row.text,
      })
    }
  }
  return {
    name: 'tags 26+신규 차원 누락 점검',
    dimensions,
    totalVariantsWithMissing: missingRows.length,
    missingByDimension,
    missingByChannel,
    channelTagMismatches: {
      total: mismatchedChannelTag.length,
      samples: sample(mismatchedChannelTag),
      all: mismatchedChannelTag,
    },
    samples: sample(missingRows, 20),
    allMissing: missingRows,
  }
}

function collectV2AtomIds(atomsData) {
  const ids = new Set()
  const policies = atomsData?.claimPolicies || {}
  for (const party of Object.values(policies)) {
    for (const dispute of Object.values(party || {})) {
      for (const state of Object.values(dispute || {})) {
        for (const atom of state.claimAtoms || []) ids.add(atom.id)
      }
    }
  }
  return ids
}

function collectV3AtomIds(gameLoopData) {
  const ids = new Set()
  const walk = (value) => {
    if (!value) return
    if (Array.isArray(value)) {
      for (const item of value) walk(item)
      return
    }
    if (typeof value === 'object') {
      if (typeof value.id === 'string' && value.id.startsWith('spouse-v3-01:')) ids.add(value.id)
      for (const nested of Object.values(value)) walk(nested)
    }
  }
  walk(gameLoopData?.stateUnlockAtoms)
  walk(gameLoopData?.dossierCards)
  return ids
}

function checkSourceRefs(rows, atomsData, structureData, gameLoopData) {
  const atomIdsV2 = collectV2AtomIds(atomsData)
  const atomIdsV3 = collectV3AtomIds(gameLoopData)
  const atomIdsUnion = new Set([...atomIdsV2, ...atomIdsV3])
  const evidenceIds = new Set((structureData?.evidence || []).map((item) => item.id))
  const disputeIds = new Set((structureData?.disputes || []).map((item) => item.id))
  const atomRefs = []
  const missingAtomsV2 = []
  const missingAtomsUnion = []
  const evidenceRefs = []
  const disputeRefs = []
  const missingEvidence = []
  const missingDisputes = []
  const unknownPrefix = []
  for (const row of rows) {
    for (const ref of row.sourceRefs || []) {
      const idx = ref.indexOf(':')
      const prefix = idx >= 0 ? ref.slice(0, idx) : ref
      const value = idx >= 0 ? ref.slice(idx + 1) : ''
      if (prefix === 'atom') {
        atomRefs.push(value)
        if (!atomIdsV2.has(value)) missingAtomsV2.push({ channel: row.channel, key: row.key, id: row.id, ref, text: row.text })
        if (!atomIdsUnion.has(value)) missingAtomsUnion.push({ channel: row.channel, key: row.key, id: row.id, ref, text: row.text })
      } else if (prefix === 'evidence') {
        evidenceRefs.push(value)
        if (!evidenceIds.has(value)) missingEvidence.push({ channel: row.channel, key: row.key, id: row.id, ref, text: row.text })
      } else if (prefix === 'dispute') {
        disputeRefs.push(value)
        if (!disputeIds.has(value)) missingDisputes.push({ channel: row.channel, key: row.key, id: row.id, ref, text: row.text })
      } else if (!['dossierCard', 'dossier', 'witness', 'system', 'result', 'case', 'action', 'mediation', 'game-events', 'game-events-v2', 'party', 'threshold', 'contradict_token'].includes(prefix)) {
        unknownPrefix.push({ channel: row.channel, key: row.key, id: row.id, ref, text: row.text })
      }
    }
  }
  return {
    name: 'sourceRefs 정합성',
    atomIdsV2Count: atomIdsV2.size,
    atomIdsV3Count: atomIdsV3.size,
    atomRefsTotal: atomRefs.length,
    atomRefsUnique: new Set(atomRefs).size,
    missingAtomsAgainstV2: {
      total: missingAtomsV2.length,
      uniqueRefs: [...new Set(missingAtomsV2.map((item) => item.ref))].sort(),
      samples: sample(missingAtomsV2),
      all: missingAtomsV2,
    },
    missingAtomsAgainstV2PlusV3: {
      total: missingAtomsUnion.length,
      uniqueRefs: [...new Set(missingAtomsUnion.map((item) => item.ref))].sort(),
      samples: sample(missingAtomsUnion),
      all: missingAtomsUnion,
    },
    evidenceRefsTotal: evidenceRefs.length,
    evidenceRefsUnique: new Set(evidenceRefs).size,
    missingEvidence: {
      total: missingEvidence.length,
      samples: sample(missingEvidence),
      all: missingEvidence,
    },
    disputeRefsTotal: disputeRefs.length,
    disputeRefsUnique: new Set(disputeRefs).size,
    missingDisputes: {
      total: missingDisputes.length,
      samples: sample(missingDisputes),
      all: missingDisputes,
    },
    unknownSourceRefPrefixes: {
      total: unknownPrefix.length,
      samples: sample(unknownPrefix),
      all: unknownPrefix,
    },
  }
}

function checkCharacterGuides(rows) {
  const issues = []
  const s5Exceptions = []
  const byType = {}
  for (const row of rows) {
    let type = null
    let min = 0
    let max = Infinity
    if (row.speakerRole === 'judge' || row.speaker === 'judge') {
      type = 'judge'
      min = 20
      max = 80
    } else if (row.speakerRole === 'party' || row.speakerRole === 'witness' || ['a', 'b'].includes(row.speaker)) {
      type = 'npc'
      min = 30
      max = 90
    } else if (row.speakerRole === 'system' || row.speaker === 'system') {
      type = 'system'
      min = 10
      max = 60
    }
    if (!type) continue
    const length = countChars(row.text)
    if (length >= min && length <= max) continue
    const hit = {
      channel: row.channel,
      key: row.key,
      id: row.id,
      speaker: row.speaker,
      speakerRole: row.speakerRole,
      lieState: row.lieState,
      type,
      length,
      allowed: `${min}-${max}`,
      text: row.text,
    }
    if (row.lieState === 'S5' && type === 'npc' && length > max) {
      s5Exceptions.push(hit)
    } else {
      inc(byType, type)
      issues.push(hit)
    }
  }
  return {
    name: '글자수 가이드 ±5자 편차 허용',
    totalIssues: issues.length,
    byType,
    s5ConfessionExceptions: {
      total: s5Exceptions.length,
      samples: sample(s5Exceptions),
      all: s5Exceptions,
    },
    samples: sample(issues, 25),
    all: issues,
  }
}

function summarizePatchList(report) {
  const patchList = []
  const add = (priority, category, count, action, samples = []) => {
    if (!count) return
    patchList.push({ priority, category, count, action, sampleIds: samples.map((item) => item.id).filter(Boolean).slice(0, 10) })
  }
  add('P0', 'B61 부인 금지어', report.categories.B.honorificBuin.totalEntries, '"부인" 문자열 제거. 지칭이면 "아내/배우자"로, 동사면 "부정/인정하지" 계열로 재작성', report.categories.B.honorificBuin.samples)
  add('P0', 'B91 Truth Throttle', report.categories.B.truthThrottle.totalEntries, 'S0/S1 NPC 직접 발화에서 금액/위임장 조기 노출 제거', report.categories.B.truthThrottle.samples)
  add('P0', 'E171 sourceRefs atom(v2+v3) 누락', report.categories.E.sourceRefs.missingAtomsAgainstV2PlusV3.total, '실제 존재하지 않는 atom ref 교체 또는 sourceRefs 삭제', report.categories.E.sourceRefs.missingAtomsAgainstV2PlusV3.samples)
  add('P1', 'A11 명사형 액션', report.categories.A.nounAction.totalEntries, '조사 결합 명사형은 "X을/를 한 것" 형태로 의미 보존 재작성. 명사구 일부는 수동 검토', report.categories.A.nounAction.samples)
  add('P1', 'A31 번역체 9패턴', report.categories.A.translationStyle.totalEntries, '번역체 패턴을 자연스러운 구어/재판관 문장으로 재작성', report.categories.A.translationStyle.samples)
  add('P1', 'A1 약한 단어 쪽', report.categories.A.weakJjok.totalEntries, '"쪽"이 방향/관계축으로 꼭 필요한지 검토 후 구체 명사로 대체', report.categories.A.weakJjok.samples)
  add('P1', 'B71 재판관 문체', report.categories.B.judgeStyle.totalEntries, '재판관 발화 종결을 합니다체/하십시오체로 정리', report.categories.B.judgeStyle.samples)
  add('P1', 'C/D 키/태그 정합', report.derivedCounts.schemaIssueCount, '키 payload mismatch, channel tag mismatch, 필수 tag 차원 누락 보정')
  add('P2', 'F 글자수 가이드', report.categories.F.characterGuides.totalIssues, '짧은 NPC/system 문장 확장 또는 긴 재판관/NPC 문장 축약')
  return patchList
}

function toMarkdown(report) {
  const lines = []
  const p = report.paths
  lines.push('# QA-Q spouse-01 Codex Summary')
  lines.push('')
  lines.push(`- 대상: \`${p.scripted}\``)
  lines.push(`- 생성: ${report.generatedAt}`)
  lines.push(`- 총 채널: ${report.overview.channelCount}, entries: ${report.overview.entryCount}, variants: ${report.overview.variantCount}`)
  lines.push(`- 원본 수정: 없음`)
  lines.push('')
  lines.push('## 핵심 결과')
  lines.push('')
  lines.push(`- 위반/보정 권장 카테고리: ${report.derivedCounts.violationCategoryCount}`)
  lines.push(`- 검토 후보 카테고리: ${report.derivedCounts.reviewCategoryCount}`)
  lines.push(`- 정합 통과 카테고리: ${report.derivedCounts.passingCategoryCount}`)
  lines.push(`- 메인 적용 권장 patch 항목: ${report.patchRecommendations.length}`)
  lines.push('')
  lines.push('## 카테고리별 카운트')
  lines.push('')
  lines.push('| 구분 | 항목 | 결과 |')
  lines.push('| --- | --- | ---: |')
  lines.push(`| A | 약한 단어 "쪽" | ${report.categories.A.weakJjok.totalEntries} entries / ${report.categories.A.weakJjok.totalMatches} matches |`)
  lines.push(`| A | 명사형 액션 | ${report.categories.A.nounAction.totalEntries} entries / ${report.categories.A.nounAction.totalMatches} matches |`)
  lines.push(`| A | 정보/동기 차원 후보 | ${report.categories.A.questionDimension.totalCandidates} |`)
  lines.push(`| A | 번역체 9패턴 | ${report.categories.A.translationStyle.totalEntries} entries / ${report.categories.A.translationStyle.totalMatches} matches |`)
  lines.push(`| A | 추상 표현 | ${report.categories.A.abstractExpression.totalEntries} entries / ${report.categories.A.abstractExpression.totalMatches} matches |`)
  lines.push(`| A | 조사 오류 | ${report.categories.A.particleErrors.totalEntries} entries / ${report.categories.A.particleErrors.totalMatches} matches |`)
  lines.push(`| B | "부인" 금지어 | ${report.categories.B.honorificBuin.totalEntries} |`)
  lines.push(`| B | 재판관 문체 | ${report.categories.B.judgeStyle.totalEntries} |`)
  lines.push(`| B | NPC callTerms issue/review | ${report.categories.B.callTerms.totalIssues} |`)
  lines.push(`| B | Truth Throttle | ${report.categories.B.truthThrottle.totalEntries} |`)
  lines.push(`| C | interrogation 키 누락/추가/중복 | ${report.categories.C.keys.interrogation.missing.length + report.categories.C.keys.interrogation.extra.length + report.categories.C.keys.interrogation.duplicates.length} |`)
  lines.push(`| C | evidence_present stage coverage 값 불일치 | ${report.categories.C.keys.evidence_present.coverageStageValueMismatches.length} |`)
  lines.push(`| C | 신규 4채널 payload mismatch | ${report.derivedCounts.newChannelKeyMismatchCount} |`)
  lines.push(`| D | tag 차원 누락 variant | ${report.categories.D.tags.totalVariantsWithMissing} |`)
  lines.push(`| D | channel tag mismatch | ${report.categories.D.tags.channelTagMismatches.total} |`)
  lines.push(`| E | atom 누락(v2 기준) | ${report.categories.E.sourceRefs.missingAtomsAgainstV2.total} |`)
  lines.push(`| E | atom 누락(v2+v3 기준) | ${report.categories.E.sourceRefs.missingAtomsAgainstV2PlusV3.total} |`)
  lines.push(`| E | evidence/dispute 누락 | ${report.categories.E.sourceRefs.missingEvidence.total + report.categories.E.sourceRefs.missingDisputes.total} |`)
  lines.push(`| F | 글자수 가이드 초과/미달 | ${report.categories.F.characterGuides.totalIssues} |`)
  lines.push(`| G | headless 시뮬레이션 | ${report.categories.G.headless.status} |`)
  lines.push('')
  lines.push('## Patch 권장 List')
  lines.push('')
  for (const item of report.patchRecommendations) {
    lines.push(`- ${item.priority} ${item.category}: ${item.count}건. ${item.action}${item.sampleIds.length ? ` 샘플: ${item.sampleIds.join(', ')}` : ''}`)
  }
  lines.push('')
  lines.push('## 주의')
  lines.push('')
  lines.push('- `sourceRefs.atom`은 요청 기준인 v2 atom만 보면 v3 unlock atom이 누락으로 잡힙니다. v2+v3 통합 기준 누락은 별도 카운트로 분리했습니다.')
  lines.push('- tag 차원 검사는 요청 목록을 전 채널에 엄격 적용했습니다. `questionType`, `rapport`, `contradict_token`은 채널 설계상 일부 누락이 의도일 수 있어 메인 검토가 필요합니다.')
  lines.push('- `tests/run-84-headless.cjs`는 현재 워크스페이스에 없어 선택 항목 G는 실행하지 못했습니다.')
  lines.push('')
  lines.push(`Raw report: \`${path.relative(ROOT, REPORT_PATH).replace(/\\/g, '/')}\``)
  return `${lines.join('\n')}\n`
}

function main() {
  const bundle = loadJson(SCRIPTED_PATH)
  const atoms = loadJson(ATOMS_PATH)
  const structure = loadJson(STRUCTURE_PATH)
  const gameLoop = loadJson(GAME_LOOP_PATH, {})
  const rows = flattenVariants(bundle)
  const entriesByChannel = {}
  const variantsByChannel = {}
  for (const [channel] of Object.entries(bundle.channels || {})) {
    const entries = channelEntries(bundle, channel)
    entriesByChannel[channel] = entries.length
    variantsByChannel[channel] = entries.reduce((sum, entry) => sum + (entry.variants || []).length, 0)
  }

  const weakJjok = groupedHitReport(
    '약한 단어 "쪽"',
    rows,
    /(\S+)\s*쪽으로(?!\s*(?:마음이|기울))|어느\s*쪽이(?!\s*더\s*컸)|쪽이었(?=\s|[.!?,。]|$)|쪽인(?=\s|[.!?,。]|$)|쪽은(?=\s|[.!?,。]|$)|쪽까지/gu,
    (row) => ({
      recommendation: /가족|집안|시댁|남편|아내|이쪽|그쪽/u.test(row.text) ? '검토' : '보정',
      reason: '방향/관계축 보존 여부를 9차원 맥락으로 판단 필요',
    }),
  )

  const nounAction = groupedHitReport(
    '명사형 X 돌봄/지원/처리/은폐/회피',
    rows,
    /([\p{L}\p{N}_]+)\s+(돌봄|지원|처리|은폐|회피)(?!\s*(?:한|된|할|하|해|했|합니다|했습니다|한다|했다|했고|하고|하는|하거나|해서|되|받|중))/gu,
    (row, matches) => ({
      recommendation: matches.some((m) => /(?:정황|내역|기록|자료|서사|맥락|사정)$/u.test(m)) ? '검토' : '보정',
      reason: '동사화 가능 명사형. 뒤따르는 명사구 일부면 자동 변환 금지',
    }),
  )

  const translationStyle = groupedHitReport(
    '번역체 9패턴',
    rows,
    /된\s*것으로\s*생각|인\s*측면이\s*있|부득이하게|사전\s*(?:상의|협의)|미리\s*말씀드리지\s*못한|특정\s+\S+|을\s*통하여|에\s*대해서|만을(?=\s|[.!?,。]|$)/gu,
    () => ({ recommendation: '보정', reason: '번역체/문어체 후보' }),
  )

  const abstractExpression = groupedHitReport(
    '추상 표현 -> 직접 행동 후보',
    rows,
    /그\s*단어로는|그것만으로|그\s*말만으로|그런\s*말만으로|그\s*표현만으로|그\s*말로는|그\s*표현으로는|그\s*정도로는|그\s*점만으로/gu,
    () => ({ recommendation: '검토', reason: '추상 표현 후보. 직접 행동/사실로 전환 가능성 검토' }),
  )

  const particleErrors = groupedHitReport(
    '"것" 조사 오류',
    rows,
    /것로|것를|것은을|것이가|것이을|것을이|겁로/gu,
    () => ({ recommendation: '보정', reason: '명백한 조사 결합 오류' }),
  )

  const honorificBuin = groupedHitReport(
    '"부인" 금지어',
    rows,
    /부인/gu,
    () => ({ recommendation: '보정', reason: 'spouse-01 금지 문자열' }),
  )

  const report = {
    generatedAt: new Date().toISOString(),
    paths: {
      scripted: path.relative(ROOT, SCRIPTED_PATH).replace(/\\/g, '/'),
      atoms: path.relative(ROOT, ATOMS_PATH).replace(/\\/g, '/'),
      structure: path.relative(ROOT, STRUCTURE_PATH).replace(/\\/g, '/'),
      gameLoop: path.relative(ROOT, GAME_LOOP_PATH).replace(/\\/g, '/'),
      report: path.relative(ROOT, REPORT_PATH).replace(/\\/g, '/'),
      summary: path.relative(ROOT, SUMMARY_PATH).replace(/\\/g, '/'),
    },
    overview: {
      caseId: bundle.caseId,
      generatedAt: bundle.generatedAt,
      channelCount: Object.keys(bundle.channels || {}).length,
      entryCount: Object.values(entriesByChannel).reduce((sum, value) => sum + value, 0),
      variantCount: rows.length,
      entriesByChannel,
      variantsByChannel,
    },
    categories: {
      A: {
        weakJjok,
        nounAction,
        questionDimension: checkQuestionDimension(rows),
        translationStyle,
        abstractExpression,
        particleErrors,
      },
      B: {
        honorificBuin,
        judgeStyle: checkJudgeStyle(rows),
        callTerms: checkCallTerms(rows),
        truthThrottle: checkTruthThrottle(rows),
      },
      C: {
        keys: checkKeys(bundle),
      },
      D: {
        tags: checkTags(rows),
      },
      E: {
        sourceRefs: checkSourceRefs(rows, atoms, structure, gameLoop),
      },
      F: {
        characterGuides: checkCharacterGuides(rows),
      },
      G: {
        headless: {
          status: fs.existsSync(path.join(ROOT, 'tests', 'run-84-headless.cjs')) ? 'available_not_run_by_audit_script' : 'not_found',
          script: 'tests/run-84-headless.cjs',
        },
      },
    },
  }

  const keyChecks = report.categories.C.keys
  const schemaIssueCount =
    keyChecks.interrogation.missing.length +
    keyChecks.interrogation.extra.length +
    keyChecks.interrogation.duplicates.length +
    keyChecks.interrogation.invalidPayloadKeys.length +
    keyChecks.evidence_present.coverageStageValueMismatches.length +
    keyChecks.evidence_present.duplicates.length +
    keyChecks.evidence_present.subjectRoleKeyPayloadMismatches.length +
    keyChecks.evidence_present.stageKeyPayloadMismatches.length +
    keyChecks.dossier.missing.length +
    keyChecks.dossier.extra.length +
    keyChecks.dossier.duplicates.length +
    keyChecks.dossier.invalidPayloadKeys.length +
    report.categories.D.tags.channelTagMismatches.total

  const newChannelKeyMismatchCount =
    keyChecks.judge_evidence_combo.invalidPayloadKeys.length +
    keyChecks.judge_witness_summon.invalidPayloadKeys.length +
    keyChecks.rapport_milestone.invalidPayloadKeys.length +
    keyChecks.contradict_milestone.invalidPayloadKeys.length

  report.derivedCounts = {
    schemaIssueCount,
    newChannelKeyMismatchCount,
    violationCategoryCount: [
      report.categories.B.honorificBuin.totalEntries,
      report.categories.B.truthThrottle.totalEntries,
      report.categories.E.sourceRefs.missingAtomsAgainstV2PlusV3.total,
      report.categories.A.particleErrors.totalEntries,
      schemaIssueCount,
    ].filter((count) => count > 0).length,
    reviewCategoryCount: [
      report.categories.A.weakJjok.totalEntries,
      report.categories.A.nounAction.totalEntries,
      report.categories.A.questionDimension.totalCandidates,
      report.categories.A.translationStyle.totalEntries,
      report.categories.A.abstractExpression.totalEntries,
      report.categories.B.judgeStyle.totalEntries,
      report.categories.B.callTerms.totalIssues,
      report.categories.D.tags.totalVariantsWithMissing,
      report.categories.F.characterGuides.totalIssues,
    ].filter((count) => count > 0).length,
    passingCategoryCount: [
      report.categories.A.particleErrors.totalEntries === 0,
      report.categories.B.truthThrottle.totalEntries === 0,
      report.categories.C.keys.interrogation.missing.length === 0,
      report.categories.C.keys.evidence_present.coverageStageValueMismatches.length === 0,
      report.categories.C.keys.dossier.missing.length === 0,
      report.categories.E.sourceRefs.missingEvidence.total === 0,
      report.categories.E.sourceRefs.missingDisputes.total === 0,
    ].filter(Boolean).length,
  }
  report.patchRecommendations = summarizePatchList(report)

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8')
  fs.writeFileSync(SUMMARY_PATH, toMarkdown(report), 'utf8')

  console.log(JSON.stringify({
    report: report.paths.report,
    summary: report.paths.summary,
    overview: report.overview,
    derivedCounts: report.derivedCounts,
    patchRecommendations: report.patchRecommendations.length,
  }, null, 2))
}

main()
