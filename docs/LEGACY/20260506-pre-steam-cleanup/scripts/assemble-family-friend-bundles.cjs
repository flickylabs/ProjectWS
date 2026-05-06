/**
 * assemble-family-friend-bundles.cjs
 * Assembles GPT Pro session outputs into ScriptedText bundles
 * for family-01 and friend-01.
 *
 * Usage: node scripts/assemble-family-friend-bundles.cjs
 */
'use strict';

const fs = require('fs');
const path = require('path');

// ── mappings ────────────────────────────────────────────────────────────────

const STANCE_EMOTION = {
  deny: 'guarded',
  hedge: 'cautious',
  partial: 'measured',
  blame: 'defensive',
  emotional: 'shaken',
  confess: 'resigned',
  answer: 'neutral',
};

const LIE_CONTINUITY = {
  S0: 'opening_guard',
  S1: 'opening_pressure',
  S2: 'surface',
  S3: 'partial_slip',
  S4: 'counter_blame',
  S5: 'confession_pivot',
};

const LIEBAND_CONTINUITY = {
  early: 'surface',
  mid: 'pressure',
  late: 'collapse',
};

const DEPTH_CONTINUITY = {
  vague: 'surface_scope',
  partial: 'mixed_scope',
  full: 'full_scope',
};

const TRUTH_REVEAL_GUARD = {
  none: 'strict',
  hint: 'strict',
  partial: 'moderate',
  full: 'open',
};

const TRUTH_DISCLOSURE = {
  none: 'sealed',
  hint: 'guarded',
  partial: 'guarded',
  full: 'open',
};

// ── case configs ────────────────────────────────────────────────────────────

const CASE_CONFIGS = {
  'family-01': {
    inputDir: path.resolve(__dirname, '../docs/ref/리뉴얼참고/gpt-pro-prompts-family/output'),
    outputPath: path.resolve(__dirname, '../src/data/scriptedText/family-01.json'),
    relationship: 'family',
    callTerms: { a: '제_동생', b: '제_형' },
    counterpartyRefs: { a: '제_동생', b: '제_형' },
    witnessCounterpartyRef: '태성_씨_정후야',
  },
  'friend-01': {
    inputDir: path.resolve(__dirname, '../docs/ref/리뉴얼참고/gpt-pro-prompts-friend/output'),
    outputPath: path.resolve(__dirname, '../src/data/scriptedText/friend-01.json'),
    relationship: 'friend',
    callTerms: { a: '제_전_친구', b: '다은이' },
    counterpartyRefs: { a: '제_전_친구', b: '다은이' },
    witnessCounterpartyRef: '다은_씨_수민이',
  },
};

// ── tag builders ────────────────────────────────────────────────────────────

function buildInterrogationTags(entry, cfg) {
  const { party, questionType, stanceHint, truthLevel, lieState } = entry;
  return [
    'channel:interrogation',
    `speaker:${party}`,
    'speakerRole:party',
    'listener:judge',
    'listenerRole:judge',
    'address:toJudge',
    'scope:judge_only',
    'revealScope:judge_only',
    'register:formal',
    'honorific:formal',
    'audience:single',
    'tense:present',
    `relationship:${cfg.relationship}`,
    'judgeAddress:재판관님',
    'judgeAddressState:defined',
    `callTerm:${cfg.callTerms[party]}`,
    'callTermState:defined',
    `counterpartyRef:${cfg.counterpartyRefs[party]}`,
    'counterpartyRefState:defined',
    'mentionTarget:dispute',
    `questionType:${questionType}`,
    `stance:${stanceHint}`,
    `emotion:${STANCE_EMOTION[stanceHint] || 'neutral'}`,
    `continuity:${LIE_CONTINUITY[lieState] || 'surface'}`,
    `reveal:${truthLevel}`,
    `revealGuard:${TRUTH_REVEAL_GUARD[truthLevel] || 'strict'}`,
    `disclosure:${TRUTH_DISCLOSURE[truthLevel] || 'sealed'}`,
    'responseMode:judge_formal_answer',
  ];
}

function buildInterrogationSourceRefs(entry) {
  return [`dispute:${entry.disputeId}`];
}

function buildEvidenceTags(entry, cfg) {
  const { party, stanceHint, truthLevel, lieBand, subjectRole } = entry;
  return [
    'channel:evidence_present',
    `speaker:${party}`,
    'speakerRole:party',
    'listener:judge',
    'listenerRole:judge',
    'address:toJudge',
    'scope:judge_only',
    'revealScope:judge_only',
    'register:formal',
    'honorific:formal',
    'audience:single',
    'tense:present',
    `relationship:${cfg.relationship}`,
    'judgeAddress:재판관님',
    'judgeAddressState:defined',
    `callTerm:${cfg.callTerms[party]}`,
    'callTermState:defined',
    `counterpartyRef:${cfg.counterpartyRefs[party]}`,
    'counterpartyRefState:defined',
    'mentionTarget:evidence',
    `subjectRole:${subjectRole}`,
    `stance:${stanceHint}`,
    `emotion:${STANCE_EMOTION[stanceHint] || 'neutral'}`,
    `continuity:${LIEBAND_CONTINUITY[lieBand] || 'surface'}`,
    `reveal:${truthLevel}`,
    `revealGuard:${TRUTH_REVEAL_GUARD[truthLevel] || 'strict'}`,
    `disclosure:${TRUTH_DISCLOSURE[truthLevel] || 'sealed'}`,
    'responseMode:judge_formal_evidence_answer',
    'trust:mid',
    'legality:ok',
    'source:org',
  ];
}

function buildEvidenceSourceRefs(entry) {
  return [`evidence:${entry.evidenceId}`];
}

function buildDossierTags(entry, cfg) {
  const { party, stanceHint, truthLevel, lieBand } = entry;
  return [
    'channel:dossier',
    `speaker:${party}`,
    'speakerRole:party',
    'listener:judge',
    'listenerRole:judge',
    'address:toJudge',
    'scope:judge_only',
    'revealScope:judge_only',
    'register:formal',
    'honorific:formal',
    'audience:single',
    'tense:present',
    `relationship:${cfg.relationship}`,
    'judgeAddress:재판관님',
    'judgeAddressState:defined',
    `callTerm:${cfg.callTerms[party]}`,
    'callTermState:defined',
    `counterpartyRef:${cfg.counterpartyRefs[party]}`,
    'counterpartyRefState:defined',
    'mentionTarget:dossier',
    'responseMode:judge_formal_card_answer',
    `stance:${stanceHint}`,
    `emotion:${STANCE_EMOTION[stanceHint] || 'neutral'}`,
    `continuity:${LIEBAND_CONTINUITY[lieBand] || 'surface'}`,
    `reveal:${truthLevel}`,
    `revealGuard:${TRUTH_REVEAL_GUARD[truthLevel] || 'strict'}`,
    `disclosure:${TRUTH_DISCLOSURE[truthLevel] || 'sealed'}`,
  ];
}

function buildDossierSourceRefs(entry) {
  return [`dossier:${entry.dossierQuestionId}`];
}

function buildWitnessTags(entry, cfg) {
  const { witnessId, depth, stanceHint, truthLevel } = entry;
  return [
    'channel:witness',
    `speaker:${witnessId}`,
    'speakerRole:witness',
    'listener:judge',
    'listenerRole:judge',
    'address:toJudge',
    'scope:judge_only',
    'revealScope:judge_only',
    'register:formal',
    'honorific:formal',
    'audience:single',
    'tense:present',
    `relationship:${cfg.relationship}`,
    'judgeAddress:재판관님',
    'judgeAddressState:defined',
    'callTerm:재판관님',
    'callTermState:defined',
    `counterpartyRef:${cfg.witnessCounterpartyRef}`,
    'counterpartyRefState:defined',
    'mentionTarget:witness_scope',
    `depth:${depth}`,
    `stance:${stanceHint}`,
    `emotion:${STANCE_EMOTION[stanceHint] || 'neutral'}`,
    `continuity:${DEPTH_CONTINUITY[depth] || 'surface_scope'}`,
    `reveal:${truthLevel}`,
    `revealGuard:${TRUTH_REVEAL_GUARD[truthLevel] || 'strict'}`,
    `disclosure:${TRUTH_DISCLOSURE[truthLevel] || 'sealed'}`,
    'responseMode:judge_formal_testimony',
  ];
}

function buildWitnessSourceRefs(entry) {
  return [`witness:${entry.witnessId}`];
}

function buildAftermathTags(_entry, cfg) {
  return [
    'channel:aftermath',
    'speaker:narrator',
    'speakerRole:narrator',
    'listener:player',
    'listenerRole:player',
    'address:toPlayer',
    'scope:public_summary',
    'revealScope:public_summary',
    'register:formal',
    'honorific:neutral',
    'audience:single',
    'tense:present',
    `relationship:${cfg.relationship}`,
    'judgeAddress:none',
    'judgeAddressState:none',
    'callTerm:none',
    'callTermState:none',
    'counterpartyRef:none',
    'counterpartyRefState:none',
    'emotion:measured',
    'continuity:resolved',
    'disclosure:open',
    'revealGuard:open',
    'mentionTarget:result',
    'responseMode:player_summary',
    'reveal:full',
  ];
}

function buildAftermathSourceRefs(entry) {
  return [`result:${entry.resultClass}`];
}

function buildSystemTags(_entry, cfg) {
  return [
    'channel:system_message',
    'speaker:system',
    'speakerRole:system',
    'listener:player',
    'listenerRole:player',
    'address:ui',
    'scope:system',
    'revealScope:system',
    'register:neutral',
    'honorific:neutral',
    'audience:single',
    'tense:present',
    `relationship:${cfg.relationship}`,
    'judgeAddress:none',
    'judgeAddressState:none',
    'callTerm:none',
    'callTermState:none',
    'counterpartyRef:none',
    'counterpartyRefState:none',
    'emotion:neutral',
    'continuity:system',
    'disclosure:open',
    'revealGuard:open',
    'mentionTarget:ui_state',
    'responseMode:system_notice',
    'reveal:full',
  ];
}

function buildSystemSourceRefs(entry) {
  return [`system:${entry.key}`];
}

// ── variant ID normalization ────────────────────────────────────────────────

function normalizeInterrogationId(entry, vIdx) {
  const { party, disputeId, lieState, questionType } = entry;
  const qt = questionType.replace(/_/g, '-');
  return `${party}-${disputeId}-${lieState}-${qt}-v${vIdx + 1}`;
}

function normalizeEvidenceId(entry, vIdx) {
  const { party, evidenceId, lieBand, subjectRole } = entry;
  return `${party}-${evidenceId}-${lieBand}-${subjectRole}-v${vIdx + 1}`;
}

function normalizeDossierId(entry, vIdx) {
  const { party, dossierQuestionId, lieBand } = entry;
  const dqid = dossierQuestionId.replace(/\./g, '-');
  return `${party}-${dqid}-${lieBand}-v${vIdx + 1}`;
}

function normalizeWitnessId(entry, vIdx) {
  const { witnessId, depth } = entry;
  return `${witnessId}-${depth}-v${vIdx + 1}`;
}

function normalizeAftermathId(entry, vIdx) {
  return `${entry.resultClass}-v${vIdx + 1}`;
}

function normalizeSystemId(entry, vIdx) {
  const k = entry.key.replace(/\|/g, '-');
  return `sys-${k}-v${vIdx + 1}`;
}

// ── process entries ─────────────────────────────────────────────────────────

function processEntries(entries, tagBuilder, sourceRefBuilder, idNormalizer, cfg) {
  return entries.map(entry => {
    const tags = tagBuilder(entry, cfg);
    const sourceRefs = sourceRefBuilder(entry);
    const variants = entry.variants.map((v, i) => ({
      id: idNormalizer(entry, i),
      text: v.text,
      behaviorHint: v.behaviorHint,
      tags: [...tags],
      sourceRefs: [...sourceRefs],
    }));

    const clean = { ...entry };
    delete clean.variants;
    clean.variants = variants;
    return clean;
  });
}

// ── coverage generation ─────────────────────────────────────────────────────

function buildCoverage(channels) {
  const interr = channels.interrogation.entries;
  const evid = channels.evidence_present.entries;
  const doss = channels.dossier.entries;
  const witn = channels.witness.entries;
  const aft = channels.aftermath.entries;
  const sys = channels.system_message.entries;

  return {
    interrogation: {
      parties: [...new Set(interr.map(e => e.party))].sort(),
      disputes: [...new Set(interr.map(e => e.disputeId))],
      lieStates: [...new Set(interr.map(e => e.lieState))],
      questionTypes: [...new Set(interr.map(e => e.questionType))],
      variantsPerKey: interr[0]?.variants.length || 0,
    },
    evidence_present: {
      parties: [...new Set(evid.map(e => e.party))].sort(),
      evidenceIds: [...new Set(evid.map(e => e.evidenceId))],
      lieBands: [...new Set(evid.map(e => e.lieBand))],
      variantsPerKey: evid[0]?.variants.length || 0,
    },
    dossier: {
      parties: [...new Set(doss.map(e => e.party))],
      questionIds: [...new Set(doss.map(e => e.dossierQuestionId))],
      lieBands: [...new Set(doss.map(e => e.lieBand))],
      variantsPerKey: doss[0]?.variants.length || 0,
    },
    witness: {
      witnessIds: [...new Set(witn.map(e => e.witnessId))],
      depths: [...new Set(witn.map(e => e.depth))],
      variantsPerKey: witn[0]?.variants.length || 0,
    },
    aftermath: {
      resultClasses: [...new Set(aft.map(e => e.resultClass))],
      variantsPerKey: aft[0]?.variants.length || 0,
    },
    system_message: {
      keys: sys.map(e => ({ context: e.context, eventType: e.eventType })),
      variantsPerKey: sys[0]?.variants.length || 0,
    },
  };
}

// ── main ────────────────────────────────────────────────────────────────────

function loadSession(inputDir, filename) {
  const fp = path.join(inputDir, filename);
  return JSON.parse(fs.readFileSync(fp, 'utf8'));
}

function assembleBundle(caseId, cfg) {
  console.log(`\n=== Assembling ${caseId} ===`);
  const { inputDir, outputPath } = cfg;

  // Load sessions
  const s1 = loadSession(inputDir, 'session-1-d1-interrogation.json');
  const s2 = loadSession(inputDir, 'session-2-d2-interrogation.json');
  const s3 = loadSession(inputDir, 'session-3-d3-interrogation.json');
  const s4 = loadSession(inputDir, 'session-4-d4d5-interrogation.json');
  const s5a = loadSession(inputDir, 'session-5a-evidence.json');
  const s5b = loadSession(inputDir, 'session-5b-witness.json');
  const s5c = loadSession(inputDir, 'session-5c-dossier.json');
  const s5d = loadSession(inputDir, 'session-5d-aftermath.json');
  const s5e = loadSession(inputDir, 'session-5e-system.json');

  // Merge interrogation entries
  const allInterrogation = [
    ...s1.entries,
    ...s2.entries,
    ...s3.entries,
    ...s4.entries,
  ];

  // Process each channel
  const interrogationEntries = processEntries(
    allInterrogation, buildInterrogationTags, buildInterrogationSourceRefs, normalizeInterrogationId, cfg
  );
  const evidenceEntries = processEntries(
    s5a.entries, buildEvidenceTags, buildEvidenceSourceRefs, normalizeEvidenceId, cfg
  );
  const dossierEntries = processEntries(
    s5c.entries, buildDossierTags, buildDossierSourceRefs, normalizeDossierId, cfg
  );
  const witnessEntries = processEntries(
    s5b.entries, buildWitnessTags, buildWitnessSourceRefs, normalizeWitnessId, cfg
  );
  const aftermathEntries = processEntries(
    s5d.entries, buildAftermathTags, buildAftermathSourceRefs, normalizeAftermathId, cfg
  );
  const systemEntries = processEntries(
    s5e.entries, buildSystemTags, buildSystemSourceRefs, normalizeSystemId, cfg
  );

  const channels = {
    interrogation: { entries: interrogationEntries },
    evidence_present: { entries: evidenceEntries },
    dossier: { entries: dossierEntries },
    witness: { entries: witnessEntries },
    aftermath: { entries: aftermathEntries },
    system_message: { entries: systemEntries },
  };

  const coverage = buildCoverage(channels);

  const bundle = {
    schemaVersion: 1,
    caseId,
    generatedAt: new Date().toISOString(),
    notes: [
      `Assembled from 9 GPT Pro v4 session outputs by assemble-family-friend-bundles.cjs.`,
      'Source files: session-1-d1-interrogation.json, session-2-d2-interrogation.json, session-3-d3-interrogation.json, session-4-d4d5-interrogation.json, session-5a-evidence.json, session-5b-witness.json, session-5c-dossier.json, session-5d-aftermath.json, session-5e-system.json.',
      'Tags auto-injected: speaker/listener/address/judgeAddress/counterpartyRef/callTerm/emotion/reveal/register/scope/continuity/sourceRefs.',
    ],
    coverage,
    channels,
  };

  // Count
  let totalEntries = 0;
  let totalVariants = 0;
  for (const ch of Object.values(channels)) {
    for (const e of ch.entries) {
      totalEntries++;
      totalVariants += e.variants.length;
    }
  }

  console.log(`Total entries: ${totalEntries}`);
  console.log(`Total variants: ${totalVariants}`);

  // Write
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(bundle, null, 2), 'utf8');
  console.log(`Bundle written to ${outputPath}`);

  return { totalEntries, totalVariants };
}

// Run both
for (const [caseId, cfg] of Object.entries(CASE_CONFIGS)) {
  assembleBundle(caseId, cfg);
}
