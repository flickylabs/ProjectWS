#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function revealTag(truthLevel) {
  if (truthLevel === 'full') return 'reveal:full'
  if (truthLevel === 'partial') return 'reveal:partial'
  if (truthLevel === 'hint') return 'reveal:hint'
  return 'reveal:none'
}

function disclosureTag(truthLevel) {
  if (truthLevel === 'full') return 'disclosure:open'
  if (truthLevel === 'partial') return 'disclosure:limited'
  if (truthLevel === 'hint') return 'disclosure:guarded'
  return 'disclosure:sealed'
}

function normalizeTagValue(value, fallback = 'unknown') {
  const cleaned = String(value || '')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[|]/g, '_')
    .replace(/[^\p{L}\p{N}_:-]/gu, '')
  return cleaned || fallback
}

function emotionTagFromLieState(lieState) {
  return {
    S0: 'emotion:guarded',
    S1: 'emotion:guarded',
    S2: 'emotion:defensive',
    S3: 'emotion:blaming',
    S4: 'emotion:rattled',
    S5: 'emotion:resigned',
  }[lieState] || 'emotion:neutral'
}

function emotionTagFromLieBand(lieBand) {
  return {
    early: 'emotion:guarded',
    mid: 'emotion:defensive',
    late: 'emotion:resigned',
  }[lieBand] || 'emotion:neutral'
}

function emotionTagFromDepth(depth) {
  return {
    vague: 'emotion:cautious',
    partial: 'emotion:controlled',
    full: 'emotion:steady',
  }[depth] || 'emotion:neutral'
}

function continuityTagFromLieState(lieState) {
  return {
    S0: 'continuity:opening_guard',
    S1: 'continuity:opening_pressure',
    S2: 'continuity:partial_slip',
    S3: 'continuity:counter_blame',
    S4: 'continuity:rattled',
    S5: 'continuity:admission',
  }[lieState] || 'continuity:neutral'
}

function continuityTagFromLieBand(lieBand) {
  return {
    early: 'continuity:surface',
    mid: 'continuity:pressure',
    late: 'continuity:collapse',
  }[lieBand] || 'continuity:neutral'
}

function continuityTagFromDepth(depth) {
  return {
    vague: 'continuity:surface_scope',
    partial: 'continuity:mixed_scope',
    full: 'continuity:full_scope',
  }[depth] || 'continuity:neutral'
}

function responseModeTag(channel) {
  return {
    interrogation: 'responseMode:judge_formal_answer',
    evidence_present: 'responseMode:judge_formal_evidence_answer',
    dossier: 'responseMode:judge_formal_card_answer',
    witness: 'responseMode:judge_formal_testimony',
    aftermath: 'responseMode:player_summary',
    system_message: 'responseMode:system_notice',
  }[channel] || 'responseMode:unspecified'
}

function findSpeakerEntity(runtimeCase, entry) {
  const duo = runtimeCase?.duo || {}
  if (entry.party === 'a') return duo.partyA || null
  if (entry.party === 'b') return duo.partyB || null
  if (entry.witnessId) {
    return (duo.socialGraph || []).find((item) => item.id === entry.witnessId) || null
  }
  return null
}

function relationshipTag(runtimeCase) {
  return `relationship:${normalizeTagValue(runtimeCase?.duo?.relationshipType || runtimeCase?.meta?.relationshipType || 'unknown')}`
}

function speakerRoleTag(channel) {
  if (['interrogation', 'evidence_present', 'dossier'].includes(channel)) return 'speakerRole:party'
  if (channel === 'witness') return 'speakerRole:witness'
  if (channel === 'aftermath') return 'speakerRole:narrator'
  if (channel === 'system_message') return 'speakerRole:system'
  return 'speakerRole:unknown'
}

function listenerRoleTag(channel) {
  if (['interrogation', 'evidence_present', 'dossier', 'witness'].includes(channel)) return 'listenerRole:judge'
  if (channel === 'aftermath' || channel === 'system_message') return 'listenerRole:player'
  return 'listenerRole:unknown'
}

function judgeAddressTag(channel, entry, runtimeCase) {
  if (['interrogation', 'evidence_present', 'dossier'].includes(channel)) {
    return 'judgeAddress:재판관님'
  }
  if (channel === 'witness') {
    const speakerEntity = findSpeakerEntity(runtimeCase, entry)
    return `judgeAddress:${normalizeTagValue(speakerEntity?.witnessProfile?.addressJudge || speakerEntity?.addressJudge || 'judge')}`
  }
  return 'judgeAddress:none'
}

function judgeAddressStateTag(channel, entry, runtimeCase) {
  if (['interrogation', 'evidence_present', 'dossier'].includes(channel)) return 'judgeAddressState:defined'
  if (channel === 'witness') {
    const speakerEntity = findSpeakerEntity(runtimeCase, entry)
    const address = speakerEntity?.witnessProfile?.addressJudge || speakerEntity?.addressJudge
    return address ? 'judgeAddressState:defined' : 'judgeAddressState:missing'
  }
  return 'judgeAddressState:none'
}

function callTermTag(channel, entry, runtimeCase) {
  const speakerEntity = findSpeakerEntity(runtimeCase, entry)
  if (channel === 'interrogation' || channel === 'evidence_present' || channel === 'dossier') {
    return `callTerm:${normalizeTagValue(speakerEntity?.callTerms?.toJudge || 'judge')}`
  }
  if (channel === 'witness') {
    return `callTerm:${normalizeTagValue(speakerEntity?.witnessProfile?.addressJudge || speakerEntity?.addressJudge || 'judge')}`
  }
  return 'callTerm:none'
}

function callTermStateTag(channel, entry, runtimeCase) {
  const speakerEntity = findSpeakerEntity(runtimeCase, entry)
  if (channel === 'interrogation' || channel === 'evidence_present' || channel === 'dossier') {
    return speakerEntity?.callTerms?.toJudge ? 'callTermState:defined' : 'callTermState:missing'
  }
  if (channel === 'witness') {
    const address = speakerEntity?.witnessProfile?.addressJudge || speakerEntity?.addressJudge
    return address ? 'callTermState:defined' : 'callTermState:missing'
  }
  return 'callTermState:none'
}

function counterpartyReferenceTag(channel, entry, runtimeCase) {
  const duo = runtimeCase?.duo || {}
  if (channel === 'interrogation' || channel === 'evidence_present' || channel === 'dossier') {
    const speakerEntity = findSpeakerEntity(runtimeCase, entry)
    const ref = speakerEntity?.callTerms?.toJudge || 'none'
    return `counterpartyRef:${normalizeTagValue(ref, 'none')}`
  }
  if (channel === 'witness') {
    const speakerEntity = findSpeakerEntity(runtimeCase, entry)
    const refA = speakerEntity?.witnessProfile?.addressA
    const refB = speakerEntity?.witnessProfile?.addressB
    if (refA && refB) return `counterpartyRef:${normalizeTagValue(`${refA}|${refB}`)}`
    if (refA || refB) return `counterpartyRef:${normalizeTagValue(refA || refB)}`
  }
  return 'counterpartyRef:none'
}

function counterpartyReferenceStateTag(channel, entry, runtimeCase) {
  if (channel === 'interrogation' || channel === 'evidence_present' || channel === 'dossier') {
    const speakerEntity = findSpeakerEntity(runtimeCase, entry)
    return speakerEntity?.callTerms?.toJudge ? 'counterpartyRefState:defined' : 'counterpartyRefState:missing'
  }
  if (channel === 'witness') {
    const speakerEntity = findSpeakerEntity(runtimeCase, entry)
    const refA = speakerEntity?.witnessProfile?.addressA
    const refB = speakerEntity?.witnessProfile?.addressB
    return (refA || refB) ? 'counterpartyRefState:defined' : 'counterpartyRefState:missing'
  }
  return 'counterpartyRefState:none'
}

function revealGuardTag(channel, entry) {
  if (channel === 'interrogation') {
    if (entry.lieState === 'S0' || entry.lieState === 'S1') return 'revealGuard:strict'
    if (entry.lieState === 'S2' || entry.lieState === 'S3') return 'revealGuard:buffered'
    return 'revealGuard:open'
  }
  if (channel === 'evidence_present' || channel === 'dossier') {
    if (entry.lieBand === 'early') return 'revealGuard:strict'
    if (entry.lieBand === 'mid') return 'revealGuard:buffered'
    return 'revealGuard:open'
  }
  if (channel === 'witness') {
    if (entry.depth === 'vague') return 'revealGuard:strict'
    if (entry.depth === 'partial') return 'revealGuard:buffered'
    return 'revealGuard:open'
  }
  return 'revealGuard:open'
}

function evidenceContextTags(entry, runtimeCase) {
  if (!entry?.evidenceId) return []
  const evidence = (runtimeCase?.evidence || []).find((item) => item.id === entry.evidenceId)
  if (!evidence?.meta) return []
  return [
    `trust:${normalizeTagValue(evidence.meta.trustLevel || 'unknown')}`,
    `legality:${normalizeTagValue(evidence.meta.legality || 'unknown')}`,
    `source:${normalizeTagValue(evidence.meta.source || 'unknown')}`,
  ]
}

function entryMeta(channel, entry, runtimeCase) {
  const commonRelationship = relationshipTag(runtimeCase)
  const commonCallTerm = callTermTag(channel, entry, runtimeCase)
  const commonCallTermState = callTermStateTag(channel, entry, runtimeCase)
  const commonJudgeAddress = judgeAddressTag(channel, entry, runtimeCase)
  const commonJudgeAddressState = judgeAddressStateTag(channel, entry, runtimeCase)
  const commonCounterpartyRef = counterpartyReferenceTag(channel, entry, runtimeCase)
  const commonCounterpartyRefState = counterpartyReferenceStateTag(channel, entry, runtimeCase)
  const commonSpeakerRole = speakerRoleTag(channel)
  const commonListenerRole = listenerRoleTag(channel)
  if (channel === 'interrogation') {
    return {
      tags: [
        'channel:interrogation',
        `speaker:${entry.party}`,
        commonSpeakerRole,
        'listener:judge',
        commonListenerRole,
        'address:toJudge',
        'scope:judge_only',
        'revealScope:judge_only',
        'register:formal',
        'honorific:formal',
        'audience:single',
        'tense:present',
        commonRelationship,
        commonJudgeAddress,
        commonJudgeAddressState,
        commonCallTerm,
        commonCallTermState,
        commonCounterpartyRef,
        commonCounterpartyRefState,
        'mentionTarget:dispute',
        `questionType:${entry.questionType}`,
        `stance:${entry.stanceHint || 'unknown'}`,
        emotionTagFromLieState(entry.lieState),
        continuityTagFromLieState(entry.lieState),
        revealTag(entry.truthLevel),
        revealGuardTag(channel, entry),
        disclosureTag(entry.truthLevel),
        responseModeTag(channel),
      ],
      sourceRefs: [`dispute:${entry.disputeId}`],
    }
  }

  if (channel === 'evidence_present') {
    return {
      tags: [
        'channel:evidence_present',
        `speaker:${entry.party}`,
        commonSpeakerRole,
        'listener:judge',
        commonListenerRole,
        'address:toJudge',
        'scope:judge_only',
        'revealScope:judge_only',
        'register:formal',
        'honorific:formal',
        'audience:single',
        'tense:present',
        commonRelationship,
        commonJudgeAddress,
        commonJudgeAddressState,
        commonCallTerm,
        commonCallTermState,
        commonCounterpartyRef,
        commonCounterpartyRefState,
        'mentionTarget:evidence',
        `subjectRole:${entry.subjectRole}`,
        `stance:${entry.stanceHint || 'unknown'}`,
        emotionTagFromLieBand(entry.lieBand),
        continuityTagFromLieBand(entry.lieBand),
        revealTag(entry.truthLevel),
        revealGuardTag(channel, entry),
        disclosureTag(entry.truthLevel),
        responseModeTag(channel),
        ...evidenceContextTags(entry, runtimeCase),
      ],
      sourceRefs: [`evidence:${entry.evidenceId}`],
    }
  }

  if (channel === 'dossier') {
    return {
      tags: [
        'channel:dossier',
        `speaker:${entry.party}`,
        commonSpeakerRole,
        'listener:judge',
        commonListenerRole,
        'address:toJudge',
        'scope:judge_only',
        'revealScope:judge_only',
        'register:formal',
        'honorific:formal',
        'audience:single',
        'tense:present',
        commonRelationship,
        commonJudgeAddress,
        commonJudgeAddressState,
        commonCallTerm,
        commonCallTermState,
        commonCounterpartyRef,
        commonCounterpartyRefState,
        'mentionTarget:dossier',
        `stance:${entry.stanceHint || 'unknown'}`,
        emotionTagFromLieBand(entry.lieBand),
        continuityTagFromLieBand(entry.lieBand),
        revealTag(entry.truthLevel),
        revealGuardTag(channel, entry),
        disclosureTag(entry.truthLevel),
        responseModeTag(channel),
      ],
      sourceRefs: [`dossier:${entry.dossierQuestionId}`],
    }
  }

  if (channel === 'witness') {
    return {
      tags: [
        'channel:witness',
        `speaker:${entry.witnessId}`,
        commonSpeakerRole,
        'listener:judge',
        commonListenerRole,
        'address:toJudge',
        'scope:judge_only',
        'revealScope:judge_only',
        'register:formal',
        'honorific:formal',
        'audience:single',
        'tense:present',
        commonRelationship,
        commonJudgeAddress,
        commonJudgeAddressState,
        commonCallTerm,
        commonCallTermState,
        commonCounterpartyRef,
        commonCounterpartyRefState,
        'mentionTarget:witness_scope',
        `depth:${entry.depth}`,
        `stance:${entry.stanceHint || 'answer'}`,
        emotionTagFromDepth(entry.depth),
        continuityTagFromDepth(entry.depth),
        revealTag(entry.truthLevel),
        revealGuardTag(channel, entry),
        disclosureTag(entry.truthLevel),
        responseModeTag(channel),
      ],
      sourceRefs: [`witness:${entry.witnessId}`],
    }
  }

  if (channel === 'aftermath') {
    return {
      tags: [
        'channel:aftermath',
        'speaker:narrator',
        commonSpeakerRole,
        'listener:player',
        commonListenerRole,
        'address:toPlayer',
        'scope:public_summary',
        'revealScope:public_summary',
        'register:formal',
        'honorific:neutral',
        'audience:single',
        'tense:present',
        commonRelationship,
        commonJudgeAddress,
        commonJudgeAddressState,
        commonCallTerm,
        commonCallTermState,
        commonCounterpartyRef,
        commonCounterpartyRefState,
        'emotion:measured',
        'continuity:resolved',
        'disclosure:open',
        'revealGuard:open',
        'mentionTarget:result',
        responseModeTag(channel),
        'reveal:full',
      ],
      sourceRefs: [`result:${entry.resultClass}`],
    }
  }

  if (channel === 'system_message') {
    return {
      tags: [
        'channel:system_message',
        'speaker:system',
        commonSpeakerRole,
        'listener:player',
        commonListenerRole,
        'address:ui',
        'scope:system',
        'revealScope:system',
        'register:neutral',
        'honorific:neutral',
        'audience:single',
        'tense:present',
        commonRelationship,
        commonJudgeAddress,
        commonJudgeAddressState,
        commonCallTerm,
        commonCallTermState,
        commonCounterpartyRef,
        commonCounterpartyRefState,
        'emotion:neutral',
        'continuity:system',
        'disclosure:open',
        'revealGuard:open',
        'mentionTarget:ui_state',
        responseModeTag(channel),
        'reveal:full',
      ],
      sourceRefs: [`system:${entry.context}|${entry.eventType}`],
    }
  }

  return { tags: [], sourceRefs: [] }
}

function mergeUnique(listA = [], listB = []) {
  return [...new Set([...(listA || []), ...(listB || [])])]
}

function enrichEntry(channel, entry, runtimeCase) {
  const meta = entryMeta(channel, entry, runtimeCase)
  entry.variants = (entry.variants || []).map((variant) => ({
    ...variant,
    tags: mergeUnique(variant.tags, meta.tags),
    sourceRefs: mergeUnique(variant.sourceRefs, meta.sourceRefs),
  }))
  return entry
}

function enrichScriptedBundle({ root, caseId, outPath }) {
  const runtimePath = path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
  const runtimeCase = readJson(runtimePath)
  const bundle = readJson(outPath)

  const channels = bundle.channels || {}
  for (const [channel, payload] of Object.entries(channels)) {
    if (!payload || !Array.isArray(payload.entries)) continue
    payload.entries = payload.entries.map((entry) => enrichEntry(channel, entry, runtimeCase))
  }

  bundle.notes = mergeUnique(bundle.notes, [
    'Template metadata injected: speaker/listener/address/judgeAddress/counterpartyRef/callTerm/emotion/reveal/register/scope/continuity/sourceRefs.',
  ])

  writeJson(outPath, bundle)
  return { caseId, outPath }
}

module.exports = {
  entryMeta,
  enrichScriptedBundle,
}
