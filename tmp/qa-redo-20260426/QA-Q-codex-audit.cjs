const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT_DIR = __dirname;
const ACTIVE_CASES = ['spouse-01', 'family-01', 'friend-01'];
const EXPECTED_TOTAL_TASKS = 300;
const EXPECTED_VARIANTS = {
  'spouse-01': 4677,
  'family-01': 5172,
  'friend-01': 5082,
};
const EXPECTED_CHANNELS = [
  'interrogation',
  'evidence_present',
  'dossier',
  'witness',
  'aftermath',
  'system_message',
  'contradiction_pursuit',
  'interjection',
  'emotional_overload',
  'evidence_discovery',
  'trust_action',
  'mediation',
  'judge_question',
  'judge_contradiction',
  'judge_evidence_combo',
  'judge_witness_summon',
  'rapport_milestone',
  'contradict_milestone',
];
const EXPECTED_PER_ENTRY = {
  interrogation: 10,
  dossier: 10,
  witness: 10,
  aftermath: 5,
  system_message: 5,
  contradiction_pursuit: 10,
  interjection: 10,
  emotional_overload: 10,
  evidence_discovery: 1,
  trust_action: 10,
  mediation: 10,
  judge_question: 5,
  judge_contradiction: 5,
  judge_evidence_combo: 5,
  judge_witness_summon: 5,
  rapport_milestone: 5,
  contradict_milestone: 5,
};
const JUDGE_CHANNELS = new Set(['judge_question', 'judge_contradiction', 'judge_evidence_combo', 'judge_witness_summon']);
const SYSTEMISH_CHANNELS = new Set(['system_message', 'evidence_discovery', 'aftermath']);

function rel(...parts) {
  return path.join(ROOT, ...parts);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function textSnippet(text, size = 180) {
  return String(text ?? '').replace(/\s+/g, ' ').slice(0, size);
}

function sampleOf(items, n = 5) {
  return items.slice(0, n);
}

function pct(n, d) {
  return d ? Math.round((n / d) * 1000) / 10 : 0;
}

function countBy(items, getKey) {
  const out = {};
  for (const item of items) {
    const key = String(getKey(item));
    out[key] = (out[key] ?? 0) + 1;
  }
  return out;
}

function unique(arr) {
  return [...new Set(arr)];
}

function issue(severity, type, caseId, channel, message, data = {}) {
  return { severity, type, caseId, channel, message, ...data };
}

function variantBrief(item, extra = {}) {
  return {
    caseId: item.caseId,
    channel: item.channel,
    key: item.entry?.key,
    id: item.variant?.id,
    text: textSnippet(item.variant?.text),
    ...extra,
  };
}

function escapeRegex(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function walkFiles(dir, predicate, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', 'dist', '.git'].includes(entry.name)) walkFiles(full, predicate, out);
    } else if (predicate(full)) {
      out.push(full);
    }
  }
  return out;
}

function lineHits(filePath, regex, classify = () => ({})) {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  const hits = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    regex.lastIndex = 0;
    if (regex.test(line)) {
      hits.push({
        path: path.relative(ROOT, filePath).replace(/\\/g, '/'),
        line: i + 1,
        text: line.trim().slice(0, 240),
        ...classify(line),
      });
    }
  }
  return hits;
}

const scriptedByCase = {};
const caseById = {};
for (const caseId of ACTIVE_CASES) {
  scriptedByCase[caseId] = readJson(rel('src', 'data', 'scriptedText', `${caseId}.json`));
  caseById[caseId] = readJson(rel('src', 'data', 'cases', 'generated', `${caseId}.json`));
}

function getWitnesses(caseData) {
  return caseData.duo?.socialGraph ?? caseData.activeThirdParties ?? [];
}

function allVariants() {
  const out = [];
  for (const caseId of ACTIVE_CASES) {
    const scripted = scriptedByCase[caseId];
    for (const [channel, ch] of Object.entries(scripted.channels ?? {})) {
      for (const entry of ch.entries ?? []) {
        for (const variant of entry.variants ?? []) {
          out.push({ caseId, channel, entry, variant });
        }
      }
    }
  }
  return out;
}

function channelInventory(caseId) {
  const scripted = scriptedByCase[caseId];
  const out = {};
  for (const [channel, ch] of Object.entries(scripted.channels ?? {})) {
    const entries = ch.entries ?? [];
    out[channel] = {
      entries: entries.length,
      variants: entries.reduce((sum, entry) => sum + (entry.variants ?? []).length, 0),
      variantsPerEntry: countBy(entries, entry => (entry.variants ?? []).length),
    };
  }
  return out;
}

function validateIdShape(item) {
  const { channel, entry, variant } = item;
  const id = variant.id ?? '';
  if (channel === 'interrogation') {
    const expectedPrefix = `${entry.party}-${entry.disputeId}-${entry.lieState}-${String(entry.questionType).replace(/_/g, '-')}-v`;
    return id.startsWith(expectedPrefix) ? null : { expectedPrefix };
  }
  if (channel === 'dossier') {
    const expectedPrefix = `${String(entry.questionId).replace(/\./g, '-')}-${entry.lieBand}-v`;
    return id.startsWith(expectedPrefix) ? null : { expectedPrefix };
  }
  const judgePrefixes = {
    judge_question: 'judgeq-',
    judge_contradiction: 'judgec-',
    judge_evidence_combo: 'judgeec-',
    judge_witness_summon: 'judgew-',
  };
  if (judgePrefixes[channel]) {
    return id.startsWith(judgePrefixes[channel]) ? null : { expectedPrefix: judgePrefixes[channel] };
  }
  return null;
}

function validateSourceRef(caseId, item, sets) {
  const refs = item.variant.sourceRefs ?? [];
  const issues = [];
  for (const ref of refs) {
    const [prefix, ...rest] = String(ref).split(':');
    const value = rest.join(':');
    if (prefix === 'dispute' && !sets.disputes.has(value)) {
      issues.push({ ref, reason: 'unknown dispute id' });
    } else if (prefix === 'evidence' && !sets.evidence.has(value)) {
      issues.push({ ref, reason: 'unknown evidence id' });
    } else if (prefix === 'witness' && !sets.witnesses.has(value)) {
      issues.push({ ref, reason: 'unknown witness id' });
    } else if (prefix === 'dossierCard' && !sets.dossierCards.has(value)) {
      issues.push({ ref, reason: 'unknown dossier card id' });
    } else if (prefix === 'dossier' && !sets.dossierCards.has(value) && !sets.dossierQuestions.has(value)) {
      issues.push({ ref, reason: 'unknown dossier card/question id' });
    } else if (prefix === 'dossierQuestion' && !sets.dossierQuestions.has(value)) {
      issues.push({ ref, reason: 'unknown dossier question id' });
    } else if (prefix === 'investigationStage') {
      const evidenceId = rest[0];
      if (!sets.evidence.has(evidenceId)) issues.push({ ref, reason: 'unknown investigation evidence id' });
    } else if (prefix === 'party' && !['a', 'b', 'both'].includes(value)) {
      issues.push({ ref, reason: 'unknown party id' });
    }
  }
  return issues.map(srcIssue => issue('P0', 'invalid_source_ref', caseId, item.channel, srcIssue.reason, variantBrief(item, srcIssue)));
}

function buildSets(caseId) {
  const caseData = caseById[caseId];
  const scripted = scriptedByCase[caseId];
  const dossierEntries = scripted.channels?.dossier?.entries ?? [];
  return {
    disputes: new Set((caseData.disputes ?? []).map(d => d.id)),
    evidence: new Set((caseData.evidence ?? []).map(e => e.id)),
    witnesses: new Set(getWitnesses(caseData).map(w => w.id)),
    dossierCards: new Set(dossierEntries.map(e => e.dossierCardId).filter(Boolean)),
    dossierQuestions: new Set(dossierEntries.map(e => e.questionId).filter(Boolean)),
  };
}

function collectPart1() {
  const schemaIssues = [];
  const countIssues = [];
  const dimensionIssues = [];
  const inventory = {};
  const allIds = new Map();

  for (const caseId of ACTIVE_CASES) {
    const scripted = scriptedByCase[caseId];
    const caseData = caseById[caseId];
    const sets = buildSets(caseId);
    inventory[caseId] = channelInventory(caseId);
    const channelNames = Object.keys(scripted.channels ?? {});
    const missingChannels = EXPECTED_CHANNELS.filter(ch => !channelNames.includes(ch));
    const extraChannels = channelNames.filter(ch => !EXPECTED_CHANNELS.includes(ch));
    if (missingChannels.length || extraChannels.length) {
      schemaIssues.push(issue('P0', 'channel_set_mismatch', caseId, null, 'Expected 18 ScriptedText channels', { missingChannels, extraChannels, observed: channelNames.length }));
    }

    let caseVariantCount = 0;
    for (const [channel, ch] of Object.entries(scripted.channels ?? {})) {
      if (!Array.isArray(ch.entries)) {
        schemaIssues.push(issue('P0', 'entries_not_array', caseId, channel, 'channel.entries is not an array'));
        continue;
      }

      const seenKeys = new Set();
      for (const entry of ch.entries) {
        if (!entry.key || typeof entry.key !== 'string') {
          schemaIssues.push(issue('P0', 'entry_key_missing', caseId, channel, 'Entry key is missing or not a string', { entry }));
        } else if (seenKeys.has(entry.key)) {
          countIssues.push(issue('P0', 'duplicate_entry_key', caseId, channel, 'Duplicate entry key', { key: entry.key }));
        }
        seenKeys.add(entry.key);

        if (!Array.isArray(entry.variants)) {
          schemaIssues.push(issue('P0', 'variants_not_array', caseId, channel, 'entry.variants is not an array', { key: entry.key }));
          continue;
        }

        const expectedPerEntry = EXPECTED_PER_ENTRY[channel];
        if (expectedPerEntry && entry.variants.length !== expectedPerEntry) {
          countIssues.push(issue('P1', 'variants_per_entry_mismatch', caseId, channel, 'Unexpected variant count for entry', { key: entry.key, expected: expectedPerEntry, actual: entry.variants.length }));
        }
        if (channel === 'evidence_present') {
          const hasStageDimension =
            Object.prototype.hasOwnProperty.call(entry, 'investigationStage') ||
            Object.prototype.hasOwnProperty.call(entry, 'stage') ||
            Object.prototype.hasOwnProperty.call(entry, 'action') ||
            Object.prototype.hasOwnProperty.call(entry, 'actionType');
          const expected = hasStageDimension ? 10 : 5;
          if (entry.variants.length !== expected) {
            countIssues.push(issue('P1', 'evidence_present_variant_count_mismatch', caseId, channel, 'evidence_present base/stage variant count mismatch', { key: entry.key, expected, actual: entry.variants.length }));
          }
        }

        for (const variant of entry.variants) {
          caseVariantCount += 1;
          const item = { caseId, channel, entry, variant };
          if (!variant.id || typeof variant.id !== 'string') {
            schemaIssues.push(issue('P0', 'variant_id_missing', caseId, channel, 'variant.id is missing', { key: entry.key }));
          } else {
            const dupKey = `${caseId}:${variant.id}`;
            if (allIds.has(dupKey)) {
              countIssues.push(issue('P0', 'duplicate_variant_id', caseId, channel, 'Duplicate variant id', variantBrief(item, { first: allIds.get(dupKey) })));
            }
            allIds.set(dupKey, { channel, key: entry.key });
          }
          if (variant.text == null || typeof variant.text !== 'string' || variant.text.trim() === '') {
            schemaIssues.push(issue('P0', 'variant_text_empty', caseId, channel, 'variant.text is null, undefined, or empty', variantBrief(item)));
          }
          if (!variant.behaviorHint || typeof variant.behaviorHint !== 'string') {
            schemaIssues.push(issue('P0', 'behavior_hint_missing', caseId, channel, 'variant.behaviorHint is missing', variantBrief(item)));
          }
          if (!Array.isArray(variant.tags) || variant.tags.length === 0) {
            schemaIssues.push(issue('P0', 'tags_missing', caseId, channel, 'variant.tags is missing or empty', variantBrief(item)));
          }
          if (!Array.isArray(variant.sourceRefs) || variant.sourceRefs.length === 0) {
            schemaIssues.push(issue('P0', 'source_refs_missing', caseId, channel, 'variant.sourceRefs is missing or empty', variantBrief(item)));
          } else {
            schemaIssues.push(...validateSourceRef(caseId, item, sets));
          }
          const idProblem = validateIdShape(item);
          if (idProblem) {
            countIssues.push(issue('P1', 'variant_id_shape_mismatch', caseId, channel, 'Variant id does not match expected channel shape', variantBrief(item, idProblem)));
          }
        }
      }
    }
    if (caseVariantCount !== EXPECTED_VARIANTS[caseId]) {
      countIssues.push(issue('P0', 'case_variant_total_mismatch', caseId, null, 'Case variant total does not match request target', { expected: EXPECTED_VARIANTS[caseId], actual: caseVariantCount }));
    }

    const disputes = new Set((caseData.disputes ?? []).map(d => d.id));
    const evidenceSubject = new Map((caseData.evidence ?? []).map(e => [e.id, e.subjectParty]));

    const interrogation = scripted.channels?.interrogation?.entries ?? [];
    const parties = ['a', 'b'];
    const lieStates = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5'];
    const questionTypes = unique(interrogation.map(e => e.questionType)).sort();
    const expectedInterKeys = new Set();
    for (const party of parties) {
      for (const disputeId of disputes) {
        for (const lieState of lieStates) {
          for (const questionType of questionTypes) {
            expectedInterKeys.add(`${party}|${disputeId}|${lieState}|${questionType}`);
          }
        }
      }
    }
    const observedInterKeys = new Set(interrogation.map(e => `${e.party}|${e.disputeId}|${e.lieState}|${e.questionType}`));
    const missingInter = [...expectedInterKeys].filter(k => !observedInterKeys.has(k));
    const extraInter = [...observedInterKeys].filter(k => !expectedInterKeys.has(k));
    if (missingInter.length || extraInter.length) {
      dimensionIssues.push(issue('P0', 'interrogation_matrix_mismatch', caseId, 'interrogation', 'Interrogation party/dispute/lieState/questionType matrix mismatch', {
        observedCells: observedInterKeys.size,
        expectedCells: expectedInterKeys.size,
        observedQuestionTypes: questionTypes,
        missing: sampleOf(missingInter),
        extra: sampleOf(extraInter),
      }));
    }

    const ep = scripted.channels?.evidence_present?.entries ?? [];
    const epKeys = new Set(ep.map(e => `${e.party}|${e.evidenceId}|${e.lieBand}|${e.subjectRole}|${e.investigationStage ?? 'base'}`));
    const base = ep.filter(e =>
      !Object.prototype.hasOwnProperty.call(e, 'investigationStage') &&
      !Object.prototype.hasOwnProperty.call(e, 'stage') &&
      !Object.prototype.hasOwnProperty.call(e, 'action') &&
      !Object.prototype.hasOwnProperty.call(e, 'actionType'));
    const staged = ep.filter(e =>
      Object.prototype.hasOwnProperty.call(e, 'investigationStage') ||
      Object.prototype.hasOwnProperty.call(e, 'stage') ||
      Object.prototype.hasOwnProperty.call(e, 'action') ||
      Object.prototype.hasOwnProperty.call(e, 'actionType'));
    if (ep.length !== 168 || base.length !== 42 || staged.length !== 126) {
      dimensionIssues.push(issue('P1', 'evidence_present_matrix_shape', caseId, 'evidence_present', 'evidence_present should have 168 cells: 42 base + 126 staged', {
        total: ep.length,
        base: base.length,
        staged: staged.length,
        uniqueKeys: epKeys.size,
      }));
    }
    for (const entry of ep) {
      if (!sets.evidence.has(entry.evidenceId)) {
        dimensionIssues.push(issue('P0', 'evidence_present_unknown_evidence', caseId, 'evidence_present', 'Unknown evidenceId in evidence_present matrix', { key: entry.key, evidenceId: entry.evidenceId }));
      }
      const expectedSubjectParty = evidenceSubject.get(entry.evidenceId);
      if (expectedSubjectParty && entry.subjectParty !== expectedSubjectParty) {
        dimensionIssues.push(issue('P1', 'subject_party_mismatch', caseId, 'evidence_present', 'entry.subjectParty does not match caseData evidence.subjectParty', { key: entry.key, evidenceId: entry.evidenceId, expected: expectedSubjectParty, actual: entry.subjectParty }));
      }
    }

    const dossier = scripted.channels?.dossier?.entries ?? [];
    const dqByQuestion = {};
    for (const entry of dossier) {
      if (!entry.questionId || !entry.lieBand) {
        dimensionIssues.push(issue('P0', 'dossier_dimension_missing', caseId, 'dossier', 'Dossier entry lacks questionId or lieBand', { key: entry.key }));
      }
      dqByQuestion[entry.questionId] ??= new Set();
      dqByQuestion[entry.questionId].add(entry.lieBand);
    }
    for (const [questionId, bands] of Object.entries(dqByQuestion)) {
      const missing = ['early', 'mid', 'late'].filter(x => !bands.has(x));
      if (missing.length) {
        dimensionIssues.push(issue('P1', 'dossier_lie_band_missing', caseId, 'dossier', 'Dossier question missing lieBand entries', { questionId, missing }));
      }
    }

    for (const channel of ['judge_evidence_combo', 'judge_witness_summon', 'rapport_milestone', 'contradict_milestone']) {
      const entries = scripted.channels?.[channel]?.entries ?? [];
      if (!entries.length) {
        dimensionIssues.push(issue('P0', 'new_channel_empty', caseId, channel, 'Required new channel has no entries'));
      }
    }
  }

  const findingCount = schemaIssues.length + countIssues.length + dimensionIssues.length;
  const failed = (schemaIssues.length ? 30 : 0) + (countIssues.length ? 30 : 0) + (dimensionIssues.length ? 40 : 0);
  return {
    totalTasks: 100,
    passed: 100 - failed,
    failed,
    findingCount,
    inventory,
    schemaIssues,
    countIssues,
    dimensionIssues,
  };
}

const CONTENT_PATTERNS = [
  { key: 'noun_action', severity: 'P2', re: /(?:가족|배우자|상대|상대방|서류|증거|문서|형|동생|아내|남편|친구|조카|어머니|돈|유서)\s+(?:돌봄|지원|처리|회피|대응|정리|확인|복원)(?:으로|을|를|이|가|은|는|에|의)?/g },
  { key: 'weak_쪽', severity: 'P1', re: /쪽(?:이었는데|입니다|으로|을|은|이|에)/g, filter: item => JUDGE_CHANNELS.has(item.channel) },
  { key: 'trans_style', severity: 'P1', re: /된 것으로 생각됩니다|인 측면이 있었습니다|부득이하게|미리 말씀드리지 못한|특정\s+\S+|을 통하여|에 대해서|만을|사전\s*(?:상의|협의)/g },
  { key: 'user_pattern_1_쪽이었는데', severity: 'P1', re: /쪽이었는데|쪽으로 말씀|쪽입니다/g },
  { key: 'user_pattern_2_무엇을_알고_보고', severity: 'P1', re: /무엇을 알고|무엇을 보고/g },
  { key: 'user_pattern_3_흐리면', severity: 'P1', re: /흐리면|흐린다면|흐리려/g },
  { key: 'user_pattern_4_명사형', severity: 'P2', re: /\S+\s+(?:돌봄|지원|처리|회피|대응)(?:으로|이었다고|이었다|이라고|입니다)/g },
  { key: 'broken_particle', severity: 'P0', re: /것는|것를|것와|것였|것로|것냐|것습니까|것나요/g },
  { key: 'mechanical_observ', severity: 'P1', re: /(?:태도|내용|흐름|변화|차이).{0,12}(?:감지됩니다|확인됩니다|보입니다|나타납니다)|변화가 감지|내용이 확인|흐름이 나타/g, filter: item => JUDGE_CHANNELS.has(item.channel) || SYSTEMISH_CHANNELS.has(item.channel) },
  { key: 'direct_quote_combo', severity: 'P1', re: /['"“][^'"”]{2,}['"”].{0,40}라고\s*하셨|라고 하셨는데.{0,40}라고 하시/g },
  { key: 'judge_call_violation', severity: 'P0', re: /\b제\s*(?:아내|남편|형|동생|전 친구|친구|예비신랑|아버지)\b/g, filter: item => JUDGE_CHANNELS.has(item.channel) },
  { key: 'witness_title_violation', severity: 'P0', re: /증인\s*(?:씨|님|분)/g, filter: item => item.channel === 'judge_witness_summon' },
  { key: 'honor_buin', severity: 'P2', re: /부인하/g },
  { key: 'haeyo_violation', severity: 'P1', re: /(?:해요|돼요|되나요|인가요|나요|죠)[.?!]?/g, filter: item => JUDGE_CHANNELS.has(item.channel) },
];

const TRUTH_LEXEMES = {
  'spouse-01': /3\s*,?\s*000\s*만\s*원|3천\s*만\s*원|위임장|박미라|투자\s*사기|2\s*,?\s*000\s*만\s*원/g,
  'family-01': /(?:^|[^0-9])(?:60|40|90)(?:[^0-9]|$)|60\s*[:대]\s*40|90\s*[:대]\s*10|90\s*→\s*60|출생\s*비밀|일기장|20\s*년/g,
  'friend-01': /9\s*일|6\s*번|11\s*번|아버지\s*돈|사기/g,
};

const CASE_FACT_PATTERNS = {
  'spouse-01': {
    positive: [/5\s*,?\s*000\s*만\s*원|5천\s*만\s*원/, /3\s*,?\s*000\s*만\s*원|3천\s*만\s*원/, /2\s*,?\s*000\s*만\s*원|2천\s*만\s*원/, /투자\s*사기|사기/],
    conflict: [],
  },
  'family-01': {
    positive: [/40\s*[:대]\s*60|A\s*40|B\s*60|60\s*[:대]\s*40/, /90\s*[:대]\s*10|90\s*%/, /출생\s*비밀/, /20\s*년/],
    conflict: [/제가\s*60|형(?:이|은|에게)?\s*60|동생(?:이|은|에게)?\s*40|A\s*60|B\s*40|90\s*에서\s*40|90\s*→\s*40/],
  },
  'friend-01': {
    positive: [/예비신랑/, /아버지/, /사기|돈/, /단톡방|손절/],
    conflict: [],
  },
};

function isEarlyTruthContext(item) {
  const entry = item.entry;
  if (JUDGE_CHANNELS.has(item.channel) || SYSTEMISH_CHANNELS.has(item.channel)) return false;
  if (entry.lieState) return ['S0', 'S1', 'S2'].includes(entry.lieState);
  if (entry.lieBand) return ['early', 'mid'].includes(entry.lieBand);
  if (entry.requiredLieState) return ['S1', 'S2'].includes(entry.requiredLieState);
  if (entry.truthLevel && ['none', 'hint'].includes(entry.truthLevel)) return true;
  return false;
}

function collectPart2(all) {
  const patternHits = {};
  const samples = [];
  const detailedHits = {};

  for (const pattern of CONTENT_PATTERNS) {
    const hits = [];
    for (const item of all) {
      if (pattern.filter && !pattern.filter(item)) continue;
      const text = item.variant.text ?? '';
      pattern.re.lastIndex = 0;
      const found = text.match(pattern.re);
      if (found) {
        hits.push(variantBrief(item, { hits: unique(found).slice(0, 5), severity: pattern.severity }));
      }
    }
    patternHits[pattern.key] = hits.length;
    detailedHits[pattern.key] = sampleOf(hits, 20);
    for (const hit of sampleOf(hits, 5)) {
      samples.push({ pattern: pattern.key, ...hit });
    }
  }

  const truthHits = [];
  for (const item of all) {
    if (!isEarlyTruthContext(item)) continue;
    const re = TRUTH_LEXEMES[item.caseId];
    re.lastIndex = 0;
    const found = item.variant.text.match(re);
    if (found) truthHits.push(variantBrief(item, { hits: unique(found).slice(0, 8), severity: 'P1' }));
  }
  patternHits.truth_throttle_violation = truthHits.length;
  detailedHits.truth_throttle_violation = sampleOf(truthHits, 30);
  for (const hit of sampleOf(truthHits, 5)) samples.push({ pattern: 'truth_throttle_violation', ...hit });

  const caseSettingHits = [];
  const otherCaseNameHits = [];
  const caseNames = {};
  for (const caseId of ACTIVE_CASES) {
    const c = caseById[caseId];
    caseNames[caseId] = [
      c.duo.partyA.name,
      c.duo.partyB.name,
      ...getWitnesses(c).map(w => w.name).filter(Boolean),
    ];
  }
  for (const item of all) {
    const text = item.variant.text ?? '';
    for (const otherCaseId of ACTIVE_CASES.filter(x => x !== item.caseId)) {
      for (const name of caseNames[otherCaseId]) {
        if (name && text.includes(name)) {
          otherCaseNameHits.push(variantBrief(item, { otherCaseId, name, severity: 'P0' }));
        }
      }
    }
    const conflicts = CASE_FACT_PATTERNS[item.caseId]?.conflict ?? [];
    for (const re of conflicts) {
      re.lastIndex = 0;
      const found = text.match(re);
      if (found) {
        caseSettingHits.push(variantBrief(item, { hits: unique(found), severity: 'P0' }));
        break;
      }
    }
  }
  patternHits.case_setting_conflict = caseSettingHits.length;
  patternHits.other_case_name_intrusion = otherCaseNameHits.length;
  detailedHits.case_setting_conflict = sampleOf(caseSettingHits, 30);
  detailedHits.other_case_name_intrusion = sampleOf(otherCaseNameHits, 30);
  for (const hit of sampleOf(caseSettingHits, 5)) samples.push({ pattern: 'case_setting_conflict', ...hit });
  for (const hit of sampleOf(otherCaseNameHits, 5)) samples.push({ pattern: 'other_case_name_intrusion', ...hit });

  const factCoverage = {};
  for (const caseId of ACTIVE_CASES) {
    const caseText = all.filter(x => x.caseId === caseId).map(x => x.variant.text ?? '').join('\n');
    factCoverage[caseId] = CASE_FACT_PATTERNS[caseId].positive.map(re => {
      re.lastIndex = 0;
      return { pattern: re.source, present: re.test(caseText) };
    });
  }

  const issueCount = Object.values(patternHits).reduce((sum, n) => sum + n, 0);
  const failed = Math.min(100, issueCount);
  return {
    totalTasks: 100,
    passed: 100 - failed,
    failed,
    findingCount: issueCount,
    patternHits,
    samples,
    detailedHits,
    factCoverage,
  };
}

function collectChannelConsistency() {
  const channelConsistency = [];
  const caseComparison = [];

  for (const caseId of ACTIVE_CASES) {
    const scripted = scriptedByCase[caseId];
    const sets = buildSets(caseId);

    for (const [channel, ch] of Object.entries(scripted.channels ?? {})) {
      for (const entry of ch.entries ?? []) {
        if (entry.disputeId && !sets.disputes.has(entry.disputeId)) {
          channelConsistency.push(issue('P0', 'entry_dispute_not_in_case_data', caseId, channel, 'Entry disputeId is not present in generated case data', { key: entry.key, disputeId: entry.disputeId }));
        }
        for (const field of ['relatedDisputes']) {
          for (const disputeId of entry[field] ?? []) {
            if (!sets.disputes.has(disputeId)) {
              channelConsistency.push(issue('P0', 'entry_related_dispute_not_in_case_data', caseId, channel, 'Entry relatedDisputes contains unknown dispute', { key: entry.key, disputeId }));
            }
          }
        }
      }
    }

    const dossierQuestions = unique((scripted.channels?.dossier?.entries ?? []).map(e => e.questionId)).sort();
    const comboQuestions = unique((scripted.channels?.judge_evidence_combo?.entries ?? []).map(e => e.questionId)).sort();
    const comboMissing = dossierQuestions.filter(q => !comboQuestions.includes(q));
    const comboExtra = comboQuestions.filter(q => !dossierQuestions.includes(q));
    if (comboMissing.length || comboExtra.length) {
      channelConsistency.push(issue('P1', 'dossier_to_judge_combo_mismatch', caseId, 'judge_evidence_combo', 'Dossier questions and judge_evidence_combo questions differ', {
        missingInCombo: comboMissing,
        extraInCombo: comboExtra,
      }));
    }

    const judgeQuestionDisputes = unique((scripted.channels?.judge_question?.entries ?? []).map(e => e.disputeId)).sort();
    const judgeContradictionDisputes = unique((scripted.channels?.judge_contradiction?.entries ?? []).map(e => e.disputeId)).sort();
    const judgeContradictionMissing = judgeQuestionDisputes.filter(d => !judgeContradictionDisputes.includes(d));
    if (judgeContradictionMissing.length) {
      channelConsistency.push(issue('P1', 'judge_question_to_contradiction_gap', caseId, 'judge_contradiction', 'judge_question has disputes without judge_contradiction coverage', {
        missingDisputes: judgeContradictionMissing,
      }));
    }

    const interrogationPairs = new Set((scripted.channels?.interrogation?.entries ?? []).map(e => `${e.party}|${e.disputeId}`));
    const contradictionPairs = new Set((scripted.channels?.contradiction_pursuit?.entries ?? []).map(e => `${e.party}|${e.disputeId}`));
    const pairExtras = [...contradictionPairs].filter(k => !interrogationPairs.has(k));
    if (pairExtras.length) {
      channelConsistency.push(issue('P0', 'contradiction_pair_without_interrogation', caseId, 'contradiction_pursuit', 'contradiction_pursuit contains party/dispute pairs missing from interrogation', {
        extraPairs: pairExtras,
      }));
    }

    const rapportParties = unique((scripted.channels?.rapport_milestone?.entries ?? []).map(e => e.party)).sort();
    const contradictParties = unique((scripted.channels?.contradict_milestone?.entries ?? []).map(e => e.party)).sort();
    if (rapportParties.join(',') !== 'a,b' || contradictParties.join(',') !== 'a,b') {
      channelConsistency.push(issue('P1', 'milestone_party_coverage', caseId, 'rapport_milestone', 'Milestone channel party coverage is incomplete', { rapportParties, contradictParties }));
    }
  }

  const matrix = {};
  for (const caseId of ACTIVE_CASES) matrix[caseId] = channelInventory(caseId);
  for (const channel of EXPECTED_CHANNELS) {
    const row = { channel };
    for (const caseId of ACTIVE_CASES) {
      row[caseId] = matrix[caseId][channel] ?? { entries: 0, variants: 0 };
    }
    caseComparison.push(row);
  }

  return { channelConsistency, caseComparison };
}

function collectCodeFallbacks() {
  const targetFiles = [
    rel('src', 'hooks', 'useActionDispatch.ts'),
    rel('src', 'engine', 'llmDialogueResolver.ts'),
    rel('src', 'engine', 'llmFreeQuestion.ts'),
    rel('src', 'engine', 'judgeQuestionEngine.ts'),
  ];
  const componentFiles = walkFiles(rel('src', 'components'), f => /\.(tsx|ts)$/.test(f));
  const files = [...targetFiles, ...componentFiles];
  const genericTerms = '증인|당사자|상대방|상대|이름 없음|미상|해당 사안|정보 없음|증거|이 증거';
  const genericFallbackRe = new RegExp(`(?:\\?\\?|\\|\\|)\\s*['"\`]([^'"\`]*(?:${genericTerms})[^'"\`]*)['"\`]`);
  const ternaryGenericFallbackRe = new RegExp(`\\?\\s*['"\`]([^'"\`]*(?:${genericTerms})[^'"\`]*)['"\`]\\s*:`);
  const templateFallbackRe = new RegExp(`\\$\\{[^}]*\\?\\?[^}]*['"\`][^'"\`]*(?:${genericTerms})[^'"\`]*['"\`][^}]*\\}`);

  const hits = [];
  for (const file of files) {
    hits.push(...lineHits(file, genericFallbackRe, line => ({ kind: 'generic_nullish_fallback', match: line.match(genericFallbackRe)?.[1] })));
    hits.push(...lineHits(file, ternaryGenericFallbackRe, line => ({ kind: 'ternary_literal_fallback', match: line.match(ternaryGenericFallbackRe)?.[1] })));
    hits.push(...lineHits(file, templateFallbackRe, () => ({ kind: 'template_interpolation_fallback' })));
  }

  const scriptedPlaceholderHits = [];
  for (const item of allVariants()) {
    if (/\$\{[^}]+\}/.test(item.variant.text ?? '')) scriptedPlaceholderHits.push(variantBrief(item, { severity: 'P0' }));
  }

  return {
    codeFallbacks: hits,
    scriptedPlaceholderHits,
    scannedFiles: files.map(f => path.relative(ROOT, f).replace(/\\/g, '/')),
  };
}

function collectPart3() {
  const consistency = collectChannelConsistency();
  const fallback = collectCodeFallbacks();
  const issueCount = consistency.channelConsistency.length + fallback.codeFallbacks.length + fallback.scriptedPlaceholderHits.length;
  const failed = (consistency.channelConsistency.length ? 40 : 0) + ((fallback.codeFallbacks.length || fallback.scriptedPlaceholderHits.length) ? 40 : 0);
  return {
    totalTasks: 100,
    passed: 100 - failed,
    failed,
    findingCount: issueCount,
    channelConsistency: consistency.channelConsistency,
    caseComparison: consistency.caseComparison,
    codeFallbacks: fallback.codeFallbacks,
    scriptedPlaceholderHits: fallback.scriptedPlaceholderHits,
    scannedFiles: fallback.scannedFiles,
  };
}

function severityRank(sev) {
  return ({ P0: 0, P1: 1, P2: 2 }[sev] ?? 3);
}

function buildPatchLists(report) {
  const p0 = [];
  const p1 = [];
  const p2 = [];
  const add = item => {
    const sev = item.severity ?? 'P2';
    if (sev === 'P0') p0.push(item);
    else if (sev === 'P1') p1.push(item);
    else p2.push(item);
  };
  for (const item of [
    ...report.part1_schema.schemaIssues,
    ...report.part1_schema.countIssues,
    ...report.part1_schema.dimensionIssues,
    ...report.part3_consistency.channelConsistency,
  ]) add(item);

  for (const [pattern, samples] of Object.entries(report.part2_content.detailedHits)) {
    const severity = samples[0]?.severity ?? (pattern.includes('conflict') || pattern.includes('other_case') ? 'P0' : pattern.includes('truth') ? 'P1' : 'P2');
    for (const sample of sampleOf(samples, 20)) add({ severity, type: pattern, message: `Content pattern hit: ${pattern}`, ...sample });
  }

  for (const hit of report.part3_consistency.scriptedPlaceholderHits) add({ severity: 'P0', type: 'scripted_placeholder', message: 'Unresolved ${...} placeholder in ScriptedText text', ...hit });
  for (const hit of report.part3_consistency.codeFallbacks) {
    const severity = /당사자|상대방|증인|이름 없음|미상/.test(hit.match ?? hit.text) ? 'P0' : 'P1';
    add({ severity, type: 'code_fallback', message: 'Literal fallback in code path should be replaced with data-backed text or explicit unreachable handling', ...hit });
  }

  const sorter = (a, b) =>
    severityRank(a.severity) - severityRank(b.severity) ||
    String(a.caseId ?? 'zz-code').localeCompare(String(b.caseId ?? 'zz-code')) ||
    String(a.channel ?? '').localeCompare(String(b.channel ?? '')) ||
    String(a.type ?? '').localeCompare(String(b.type ?? ''));
  return {
    p0Patches: p0.sort(sorter),
    p1Patches: p1.sort(sorter),
    p2Patches: p2.sort(sorter),
  };
}

function summaryLine(label, value) {
  return `| ${label} | ${value} |`;
}

function buildSummary(report) {
  const lines = [];
  lines.push('# QA-Q Codex General Audit Summary');
  lines.push('');
  lines.push(`- Generated: ${report.meta.generatedAt}`);
  lines.push(`- Scope: ${report.meta.scope}`);
  lines.push(`- Active cases: ${report.meta.activeCases.join(', ')}`);
  lines.push(`- Total variants read directly: ${report.meta.totalVariants}`);
  lines.push('');
  lines.push('## Task Result');
  lines.push('');
  lines.push('| Part | Passed Tasks | Failed Tasks | Findings |');
  lines.push('| --- | ---: | ---: | ---: |');
  lines.push(`| Part 1 schema/count/dimension | ${report.part1_schema.passed} | ${report.part1_schema.failed} | ${report.part1_schema.findingCount} |`);
  lines.push(`| Part 2 content pattern scan | ${report.part2_content.passed} | ${report.part2_content.failed} | ${report.part2_content.findingCount} |`);
  lines.push(`| Part 3 consistency/code fallback | ${report.part3_consistency.passed} | ${report.part3_consistency.failed} | ${report.part3_consistency.findingCount} |`);
  lines.push('');
  lines.push('## Variant Matrix');
  lines.push('');
  lines.push('| Case | Channels | Variants | Expected |');
  lines.push('| --- | ---: | ---: | ---: |');
  for (const caseId of ACTIVE_CASES) {
    const inv = report.meta.caseInventory[caseId];
    lines.push(`| ${caseId} | ${inv.channels} | ${inv.variants} | ${EXPECTED_VARIANTS[caseId]} |`);
  }
  lines.push('');
  lines.push('## Content Pattern Hits');
  lines.push('');
  lines.push('| Pattern | Hits |');
  lines.push('| --- | ---: |');
  for (const [key, count] of Object.entries(report.part2_content.patternHits)) {
    lines.push(`| ${key} | ${count} |`);
  }
  lines.push('');
  lines.push('## P0 Highlights');
  lines.push('');
  const p0 = sampleOf(report.p0Patches, 20);
  if (!p0.length) {
    lines.push('- No P0 findings.');
  } else {
    for (const item of p0) {
      const loc = [item.caseId, item.channel, item.id || item.key || item.path].filter(Boolean).join(' / ');
      lines.push(`- ${item.type}: ${loc} - ${item.message ?? item.text ?? ''}`);
    }
    if (report.p0Patches.length > p0.length) lines.push(`- ... ${report.p0Patches.length - p0.length} more P0 items in JSON report.`);
  }
  lines.push('');
  lines.push('## Case Comparison Matrix');
  lines.push('');
  lines.push('| Channel | spouse-01 entries/variants | family-01 entries/variants | friend-01 entries/variants |');
  lines.push('| --- | ---: | ---: | ---: |');
  for (const row of report.part3_consistency.caseComparison) {
    lines.push(`| ${row.channel} | ${row['spouse-01'].entries}/${row['spouse-01'].variants} | ${row['family-01'].entries}/${row['family-01'].variants} | ${row['friend-01'].entries}/${row['friend-01'].variants} |`);
  }
  lines.push('');
  lines.push('## Recommended Actions');
  lines.push('');
  lines.push('- P0: Fix invalid case/dispute references, empty required fields, unresolved placeholders, and data-backed name fallback bugs first.');
  lines.push('- P1: Review Truth Throttle hits and judge/system mechanical phrasing manually before broad replacements.');
  lines.push('- P2: Use the pattern sample lists to smooth noun-heavy or generic phrasing without changing story facts.');
  lines.push('');
  lines.push('## Outputs');
  lines.push('');
  lines.push('- Raw JSON: `tmp/qa-redo-20260426/QA-Q-codex-report.json`');
  lines.push('- Audit script: `tmp/qa-redo-20260426/QA-Q-codex-audit.cjs`');
  return `${lines.join('\n')}\n`;
}

function buildMeta() {
  const caseInventory = {};
  let totalVariants = 0;
  for (const caseId of ACTIVE_CASES) {
    const inv = channelInventory(caseId);
    const variants = Object.values(inv).reduce((sum, ch) => sum + ch.variants, 0);
    totalVariants += variants;
    caseInventory[caseId] = {
      channels: Object.keys(inv).length,
      variants,
      channelCounts: inv,
    };
  }
  return {
    generatedAt: new Date().toISOString(),
    totalTasks: EXPECTED_TOTAL_TASKS,
    activeCases: ACTIVE_CASES,
    scope: 'ScriptedText 14931 variants + generated case data + claimPolicies/code fallback scan',
    totalVariants,
    caseInventory,
  };
}

function main() {
  const variants = allVariants();
  const report = {
    meta: buildMeta(),
    part1_schema: collectPart1(),
    part2_content: collectPart2(variants),
    part3_consistency: collectPart3(),
  };
  Object.assign(report, buildPatchLists(report));

  writeJson(path.join(OUT_DIR, 'QA-Q-codex-report.json'), report);
  fs.writeFileSync(path.join(OUT_DIR, 'QA-Q-codex-summary.md'), buildSummary(report), 'utf8');

  console.log(JSON.stringify({
    report: path.relative(ROOT, path.join(OUT_DIR, 'QA-Q-codex-report.json')).replace(/\\/g, '/'),
    summary: path.relative(ROOT, path.join(OUT_DIR, 'QA-Q-codex-summary.md')).replace(/\\/g, '/'),
    totalVariants: report.meta.totalVariants,
    p0: report.p0Patches.length,
    p1: report.p1Patches.length,
    p2: report.p2Patches.length,
  }, null, 2));
}

main();
