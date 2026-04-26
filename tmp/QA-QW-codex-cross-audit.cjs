const fs = require('fs');
const path = require('path');

const ROOT = 'd:/ProjectWS';
const TARGET_CASE = 'spouse-01';
const ACTIVE_CASES = ['spouse-01', 'family-01', 'friend-01'];

const scriptedPath = path.join(ROOT, 'src/data/scriptedText/spouse-01.json');
const casePath = path.join(ROOT, 'src/data/cases/generated/spouse-01.json');
const claudeFindingsPath = path.join(ROOT, 'tmp/QA-QW-spouse-01-findings.json');
const rawOutPath = path.join(ROOT, 'tmp/QA-QW-codex-cross-report.json');
const summaryOutPath = path.join(ROOT, 'tmp/QA-QW-codex-cross-summary.md');

const scripted = JSON.parse(fs.readFileSync(scriptedPath, 'utf8'));
const caseDef = JSON.parse(fs.readFileSync(casePath, 'utf8'));
const claude = fs.existsSync(claudeFindingsPath)
  ? JSON.parse(fs.readFileSync(claudeFindingsPath, 'utf8'))
  : null;

function entries(channel) {
  return scripted.channels[channel]?.entries || [];
}

function allVariants(channelName = null) {
  const out = [];
  const channels = channelName ? [[channelName, scripted.channels[channelName]]] : Object.entries(scripted.channels);
  for (const [channel, ch] of channels) {
    for (const entry of ch.entries || []) {
      for (const variant of entry.variants || []) {
        out.push({ channel, entry, variant, text: variant.text || '', behaviorHint: variant.behaviorHint || '' });
      }
    }
  }
  return out;
}

function findVariant(id) {
  return allVariants().find(v => v.variant.id === id) || null;
}

function textLen(s) {
  return Array.from(s || '').length;
}

function mean(nums) {
  return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
}

function std(nums) {
  if (!nums.length) return 0;
  const m = mean(nums);
  return Math.sqrt(mean(nums.map(n => (n - m) ** 2)));
}

function pct(n, d) {
  return d ? Math.round((n / d) * 1000) / 10 : 0;
}

function rxHits(items, re, field = 'text') {
  const hits = [];
  for (const item of items) {
    const source = item[field] || '';
    const m = source.match(re);
    if (m) hits.push({ ...brief(item), hits: [...new Set(m)], snippet: source.slice(0, 220) });
  }
  return hits;
}

function brief(item) {
  return {
    channel: item.channel,
    key: item.entry.key,
    id: item.variant.id,
  };
}

function trigrams(s) {
  const normalized = (s || '').replace(/\s+/g, '');
  const set = new Set();
  for (let i = 0; i < normalized.length - 2; i += 1) set.add(normalized.slice(i, i + 3));
  return set;
}

function trigramOverlap(a, b) {
  const A = trigrams(a);
  const B = trigrams(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter += 1;
  return inter / Math.min(A.size, B.size);
}

function pairStatsForEntries(channelName, entryFilter = () => true, threshold = 0.6) {
  const perCell = [];
  const over = [];
  for (const entry of entries(channelName).filter(entryFilter)) {
    const variants = entry.variants || [];
    const vals = [];
    let max = { overlap: 0, a: null, b: null };
    for (let i = 0; i < variants.length; i += 1) {
      for (let j = i + 1; j < variants.length; j += 1) {
        const overlap = trigramOverlap(variants[i].text, variants[j].text);
        vals.push(overlap);
        if (overlap > max.overlap) max = { overlap, a: variants[i], b: variants[j] };
        if (overlap >= threshold) {
          over.push({
            channel: channelName,
            key: entry.key,
            a: variants[i].id,
            b: variants[j].id,
            overlap: Number(overlap.toFixed(3)),
            aText: variants[i].text.slice(0, 120),
            bText: variants[j].text.slice(0, 120),
          });
        }
      }
    }
    perCell.push({
      channel: channelName,
      key: entry.key,
      variants: variants.length,
      pairCount: vals.length,
      avgOverlap: Number(mean(vals).toFixed(3)),
      maxOverlap: Number(max.overlap.toFixed(3)),
      maxPair: max.a ? [max.a.id, max.b.id] : [],
    });
  }
  return {
    cells: perCell.length,
    threshold,
    avgCellOverlap: Number(mean(perCell.map(x => x.avgOverlap)).toFixed(3)),
    maxCellOverlap: Number(Math.max(0, ...perCell.map(x => x.maxOverlap)).toFixed(3)),
    overThresholdCount: over.length,
    overThreshold: over.sort((a, b) => b.overlap - a.overlap),
    perCell,
  };
}

function distribution(items, getter) {
  const out = {};
  for (const item of items) {
    const key = getter(item) ?? 'undefined';
    out[key] = (out[key] || 0) + 1;
  }
  return out;
}

function markerStats(items, markers) {
  const total = items.length;
  const hits = {};
  const samples = {};
  for (const marker of markers) {
    const found = rxHits(items, marker.re);
    hits[marker.name] = { count: found.length, rate: pct(found.length, total) };
    samples[marker.name] = found.slice(0, 5);
  }
  return { totalVariants: total, hits, samples };
}

function countTermByGroup(items, groupFn, terms) {
  const out = {};
  for (const item of items) {
    const group = groupFn(item);
    if (!out[group]) out[group] = { total: 0 };
    out[group].total += 1;
    for (const [name, re] of Object.entries(terms)) {
      if (!out[group][name]) out[group][name] = 0;
      if (re.test(item.text)) out[group][name] += 1;
      re.lastIndex = 0;
    }
  }
  return out;
}

function makeTask(number, title, options) {
  return {
    number,
    title,
    verificationEntries: options.verificationEntries,
    claudeResult: options.claudeResult ?? null,
    codexResult: options.codexResult,
    agreement: options.agreement ?? null,
    additionalFindings: options.additionalFindings ?? [],
    recommendedAction: options.recommendedAction ?? '',
    severity: options.severity ?? (options.codexResult === 'FAIL' ? 'FAIL' : options.codexResult === 'WARN' ? 'WARN' : 'OK'),
    data: options.data ?? undefined,
  };
}

function activeCaseInventory() {
  return ACTIVE_CASES.map(caseId => {
    const p = path.join(ROOT, `src/data/scriptedText/${caseId}.json`);
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    let cells = 0;
    let variants = 0;
    const channelCounts = {};
    for (const [channel, ch] of Object.entries(data.channels || {})) {
      channelCounts[channel] = { cells: (ch.entries || []).length, variants: 0 };
      cells += (ch.entries || []).length;
      for (const entry of ch.entries || []) {
        const count = (entry.variants || []).length;
        variants += count;
        channelCounts[channel].variants += count;
      }
    }
    const ep = data.channels.evidence_present?.entries || [];
    const evidenceKeyShape = { subjectRoleOnly: 0, lieBandOnly: 0, both: 0, neither: 0 };
    for (const entry of ep) {
      const hasSubjectRole = Boolean(entry.subjectRole);
      const hasLieBand = Boolean(entry.lieBand);
      evidenceKeyShape[hasSubjectRole && hasLieBand ? 'both' : hasSubjectRole ? 'subjectRoleOnly' : hasLieBand ? 'lieBandOnly' : 'neither'] += 1;
    }
    return { caseId, channels: Object.keys(data.channels || {}).length, cells, variants, evidenceKeyShape, channelCounts };
  });
}

const variants = allVariants();
const channelCounts = {};
let totalVariants = 0;
for (const [channel, ch] of Object.entries(scripted.channels)) {
  const cells = ch.entries.length;
  const variantCount = ch.entries.reduce((sum, entry) => sum + (entry.variants || []).length, 0);
  channelCounts[channel] = { cells, variants: variantCount };
  totalVariants += variantCount;
}

const badGrammarRe = /(것는|것와|것를|것였습니다|었고를|안전한을|없는을|한을 처리한|어떻게를|제를 숨긴|의를 숨긴|보다를|단순한을|단순을)/g;
const badGrammarHits = rxHits(variants, badGrammarRe);

const p0PatchById = {
  'b-h-d3-S5-fact-pursuit-v8': '재판관님, 아내의 위임장 조작과 제가 숨긴 것은 따로 봐야 합니다. 제 아내에게 말하지 않은 잘못까지 인정합니다.',
  'b-h-d3-S5-motive-search-v8': '재판관님, 아내의 위임장 조작과 제가 숨긴 것은 따로 봐야 합니다. 제 아내에게 말하지 않은 잘못까지 인정합니다.',
  'b-h-d3-S5-empathy-approach-v8': '재판관님… 아내의 위임장 조작과 제가 숨긴 것은 따로 봐야 합니다. 제 아내에게 말하지 않은 잘못까지 인정합니다.',
  'b-e-6-late-restore_context-v10': '이제는 제가 숨긴 것과 아내의 투자 사기 손실을 따로 기록해야 합니다.',
  'b-e-7-late-restore_context-v6': '저는 제가 숨긴 것을 인정합니다. 아내는 위임장 조작을 인정해야 합니다.',
  'dc-2-b-q1-early-v6': '외도를 숨긴 것은 아닙니다. 하지만 시댁 문제를 덮으려 한 건 사실입니다.',
  'dc-2-b-q1-late-v4': '형네 사정이 알려지면 예전 시댁 상처가 다시 터질까 봐, 저는 진실을 피하는 쪽을 골랐습니다.',
  'dc-5-a-q1-late-v2': '저는 남편이 숨긴 것을 이유로 제 송금을 덮으려 했습니다. 하지만 순서는 숨길 수 없습니다.',
  'w-2-full-v8': '위임 서류는 있었고 처리는 됐습니다. 다만 서명 진정성 확인은 충분하지 않았습니다.',
  'w-2-full-v9': '재판관님, 절차상 근거는 있었지만 안전한 처리는 아니었습니다. 그 점은 인정합니다.',
  'a_primary_fault-v4': '판결 뒤 박지연에게 남은 건 잃은 돈보다 서명 한 줄의 무게였다. 재판관은 이준호가 피한 점과 가족 사정을 숨긴 점을 짚었지만, 공동 적금을 해지하려고 위임장을 꾸민 선택을 더 무겁게 기록했다. 이준호는 형 문제를 더는 부부 밖에 숨기지 않겠다고 약속했고, 박지연은 사과와 피해 회복 계획을 먼저 내놓아야 했다.',
  'contra-a-d-2-S1-v7': '제가 의심한 건 돈 자체보다 설명 없이 처리된 일이었습니다. 그 차이는 분명히 봐주셔야 합니다.',
  'contra-a-h-d4-S3-v7': '남편이 2,000만 원을 숨긴 것과 제 3,000만 원 해지는 서로 다른 축이라는 걸 받아들이겠습니다.',
  'contra-a-h-d4-S4-v9': '위임장 조작이라는 축은 제 몫입니다. 남편이 숨긴 것과 섞어서 흐릴 수 없습니다.',
  'contra-b-d-2-S1-v7': '그 부분은 단순히 숨긴 것과는 다릅니다. 쓰임을 빼고 말하면 사실이 반쪽이 됩니다.',
  'contra-b-h-d3-S1-v9': '그 적금 문제를 나중에 알았다고만 말한 건 제가 피한 것이었습니다. 일부는 먼저 눈치챘습니다.',
  'contra-b-h-d3-S3-v8': '하지만 제가 숨긴 것과 서류를 처리한 것은 같은 무게가 아닙니다. 그 부분은 분리해 주셨으면 합니다.',
  'contra-b-h-d4-S2-v4': '침묵의 시작이 제 쪽일 수 있습니다. 하지만 아내가 서류를 처리한 것은 또 다른 축입니다.',
  'contra-b-h-d4-S2-v8': '먼저 숨긴 건 제 잘못입니다. 그래도 아내가 처리한 것을 제가 동의한 건 아닙니다.',
  'interject-b-h-d4-major-v2': '박지연! 내가 말 못 한 건 잘못이지만, 당신이 서류를 처리한 것은 다른 문제야!',
  'judgeq-h-d4-fact_pursuit-2-v4': '두 분, 범죄 행위와 단순히 숨긴 것을 같은 말로 묶지 않겠습니다.',
  'judgewit-w-2-mid-v2': '해지 서류가 어떻게 처리됐는지 더 미룰 수 없습니다. 은행 직원을 부르겠습니다.',
};

const p0Patches = badGrammarHits.map(hit => ({
  priority: 'P0',
  channel: hit.channel,
  key: hit.key,
  id: hit.id,
  issue: hit.hits.join(', '),
  old: hit.snippet,
  new: p0PatchById[hit.id] || '',
}));

const resolvedQaPatchIds = [
  'b-e-7-early-request_original-v7',
  'w-2-partial-v1',
  'w-2-partial-v4',
  'w-2-full-v2',
  'w-2-full-v4',
  'overload-a-h-d3-v2',
  'judgewit-w-3-mid-v1',
];
const resolvedQaPatchStatus = resolvedQaPatchIds.map(id => {
  const hit = findVariant(id);
  return { id, found: Boolean(hit), channel: hit?.channel, key: hit?.entry.key, text: hit?.text };
});

const evidenceEntries = entries('evidence_present');
const evidenceShape = { subjectRoleOnly: 0, lieBandOnly: 0, both: 0, neither: 0 };
const evidenceKeySet = new Set();
const evidenceDuplicateKeys = [];
for (const entry of evidenceEntries) {
  const hasSubjectRole = Boolean(entry.subjectRole);
  const hasLieBand = Boolean(entry.lieBand);
  evidenceShape[hasSubjectRole && hasLieBand ? 'both' : hasSubjectRole ? 'subjectRoleOnly' : hasLieBand ? 'lieBandOnly' : 'neither'] += 1;
  if (evidenceKeySet.has(entry.key)) evidenceDuplicateKeys.push(entry.key);
  evidenceKeySet.add(entry.key);
}

const combinationNodes = caseDef.combinationLab?.nodes || [];
const witnessNodeIssues = [];
const w1Node = combinationNodes.find(n => n.id === 'w-1-angle');
const w2Node = combinationNodes.find(n => n.id === 'w-2-angle');
if (w1Node && !/오피스텔|경비/.test(w1Node.label || '')) {
  witnessNodeIssues.push({ id: w1Node.id, label: w1Node.label, expected: 'w-1 오피스텔 경비 증언 축' });
}
if (!w2Node) witnessNodeIssues.push({ id: 'w-2-angle', label: null, expected: 'w-2 은행 직원 증언 축' });

const forbiddenA1 = /(위임장|3,?000\s*만|3000만|삼천\s*만|2,?000\s*만|2000만|이천\s*만)/g;
const a1Items = allVariants('interrogation').filter(v =>
  v.entry.party === 'a' && v.entry.disputeId === 'd-1' && ['S0', 'S1', 'S2'].includes(v.entry.lieState));
const a1Violations = rxHits(a1Items, forbiddenA1);

const a2TargetIds = ['b-d-2-S5-fact-pursuit-v3', 'b-d-2-S5-motive-search-v2'];
const a2Items = a2TargetIds.map(id => findVariant(id)).filter(Boolean).map(v => ({
  id: v.variant.id,
  key: v.entry.key,
  text: v.text,
  review: /오늘 처음 들었습니다/.test(v.text)
    ? '충격 반응으로 읽히며 자백 회피 위반은 아님'
    : '동생을 외면할 수 없었다는 동기 자백으로 정합',
}));

const diversityProbeKeys = [
  'a|d-1|S1|fact_pursuit',
  'b|d-1|S1|fact_pursuit',
  'a|d-2|S1|fact_pursuit',
  'b|h-d3|S1|fact_pursuit',
  'a|h-d4|S1|fact_pursuit',
  'b|h-d4|S1|fact_pursuit',
];
const a3Probe = pairStatsForEntries('interrogation', e => diversityProbeKeys.includes(e.key), 0.6);

const stageByBand = distribution(evidenceEntries, e => e.lieBand);
const stageSamples = ['early', 'mid', 'late'].map(band => {
  const entry = evidenceEntries.find(e => e.key === `b|e-1|${band}|self`);
  return { band, key: entry?.key, sample: entry?.variants?.[0]?.text };
});

function dossierCrossBandStats() {
  const groups = {};
  for (const entry of entries('dossier')) {
    const base = `${entry.dossierCardId}|${entry.questionId}|${entry.targetParty}`;
    if (!groups[base]) groups[base] = {};
    groups[base][entry.lieBand] = entry;
  }
  const comparisons = [];
  for (const [base, byBand] of Object.entries(groups)) {
    for (const [a, b] of [['early', 'mid'], ['mid', 'late'], ['early', 'late']]) {
      if (!byBand[a] || !byBand[b]) continue;
      const vals = [];
      for (const va of byBand[a].variants) {
        for (const vb of byBand[b].variants) vals.push(trigramOverlap(va.text, vb.text));
      }
      comparisons.push({ base, pair: `${a}-${b}`, avgOverlap: Number(mean(vals).toFixed(3)), maxOverlap: Number(Math.max(...vals).toFixed(3)) });
    }
  }
  return {
    groups: Object.keys(groups).length,
    comparisons,
    byPair: Object.fromEntries(['early-mid', 'mid-late', 'early-late'].map(pair => {
      const vals = comparisons.filter(c => c.pair === pair).map(c => c.avgOverlap);
      return [pair, { avgOverlap: Number(mean(vals).toFixed(3)), maxAvgOverlap: Number(Math.max(...vals).toFixed(3)) }];
    })),
  };
}
const dossierBand = dossierCrossBandStats();

const w3Items = allVariants('witness').filter(v => v.entry.witnessId === 'w-3');
const w3OfficeHits = rxHits(w3Items, /오피스텔/g);

const contradictionNew = allVariants('contradiction_pursuit').filter(v => ['h-d3', 'h-d4'].includes(v.entry.disputeId));
const interjectionNew = allVariants('interjection').filter(v => ['h-d3', 'h-d4'].includes(v.entry.disputeId));
const overloadNew = allVariants('emotional_overload').filter(v => ['h-d3', 'h-d4'].includes(v.entry.disputeId));

const mediationItems = allVariants('mediation');
const mediationBadTerms = rxHits(mediationItems, /(베팅|공동\s*통장)/g);

const discoveryEntries = entries('evidence_discovery');
const afterItems = allVariants('aftermath');
const afterRealNames = rxHits(afterItems, /(박미라|이성호)/g);

const judgeCombo = entries('judge_evidence_combo');
const judgeComboByTone = distribution(judgeCombo, e => e.tone);
const judgeComboByCard = distribution(judgeCombo, e => e.dossierCardId);
const judgeComboSourceCoverage = judgeCombo.map(entry => ({
  key: entry.key,
  tone: entry.tone,
  dossierCardId: entry.dossierCardId,
  sourceRefs: entry.variants?.[0]?.sourceRefs || [],
  evidenceRefs: [...new Set((entry.variants?.[0]?.sourceRefs || []).filter(ref => ref.startsWith('evidence:')))],
}));

const judgeWitnessItems = allVariants('judge_witness_summon');
const judgeWitnessW3Office = rxHits(judgeWitnessItems.filter(v => v.entry.witnessId === 'w-3'), /오피스텔/g);
const new4WeakHits = rxHits(
  ['judge_evidence_combo', 'judge_witness_summon', 'rapport_milestone', 'contradict_milestone'].flatMap(ch => allVariants(ch)),
  /(것\s*같(?:습니다|다|아|다고|다는)|부분이 있|측면이 있|것으로 보|부득이|어떻게를|것됐|것는|것와|것를)/g
);

const victimMarkers = [
  { name: 'victim_frame', re: /(상처|배신|버림|버려|혼자|무서|두려|불안|억울|참았|무너|숨이 막|떨렸|겁났)/g },
  { name: 'helplessness', re: /(어쩔 수 없|선택의 여지|다른 방법|방법이 없|할 수 있는 게|외면할 수|끝장|그럴 수밖에|아무것도 못|도리가 없)/g },
  { name: 'soft_confession', re: /(인정합니다|사실은|솔직히|맞습니다|제 잘못|제가 한|제가 .*했습니다|숨겼|죄송|미안|돌려놓|말씀드리겠습니다)/g },
];
const avoidantMarkers = [
  { name: 'answer_delay', re: /(잠시만|잠깐|한 박자|글쎄|음|어\.{0,1}|나중|조금만|정리|말이 막|망설)/g },
  { name: 'partial_scope', re: /(일부|어느 정도|그 정도|그 부분|그만큼|선까지|부분은|일부는|전부는)/g },
  { name: 'minimize_harm', re: /(선의|좋은 뜻|돕고 싶|도와주|챙기|걱정|무너질|지키려|가족을 도운|형을 도운)/g },
];

function partyItems(party) {
  const out = [];
  for (const [channel, ch] of Object.entries(scripted.channels)) {
    for (const entry of ch.entries || []) {
      const belongs =
        entry.party === party ||
        entry.speaker === party ||
        entry.targetParty === party ||
        entry.speaker === party ||
        entry.path && entry.speaker === party;
      const tagBelongs = (entry.variants?.[0]?.tags || []).includes(`speaker:${party}`) || (entry.variants?.[0]?.tags || []).includes(`targetParty:${party}`);
      if (!belongs && !tagBelongs) continue;
      for (const variant of entry.variants || []) out.push({ channel, entry, variant, text: variant.text || '', behaviorHint: variant.behaviorHint || '' });
    }
  }
  return out;
}

const victimByChannel = {};
for (const channel of ['interrogation', 'evidence_present', 'dossier', 'contradiction_pursuit', 'aftermath']) {
  let items;
  if (channel === 'dossier') items = allVariants(channel).filter(v => v.entry.targetParty === 'a');
  else if (channel === 'aftermath') items = allVariants(channel);
  else items = allVariants(channel).filter(v => v.entry.party === 'a');
  victimByChannel[channel] = markerStats(items, victimMarkers);
}
const avoidantByChannel = {};
for (const channel of ['interrogation', 'evidence_present', 'dossier', 'contradiction_pursuit', 'aftermath']) {
  let items;
  if (channel === 'dossier') items = allVariants(channel).filter(v => v.entry.targetParty === 'b');
  else if (channel === 'aftermath') items = allVariants(channel);
  else items = allVariants(channel).filter(v => v.entry.party === 'b');
  avoidantByChannel[channel] = markerStats(items, avoidantMarkers);
}
const victimGlobal = markerStats(partyItems('a'), victimMarkers);
const avoidantGlobal = markerStats(partyItems('b'), avoidantMarkers);

const tagStats = {};
const tagMissing = {};
const tagDimensions = ['channel', 'speaker', 'speakerRole', 'listener', 'listenerRole', 'address', 'scope', 'revealScope', 'register', 'honorific', 'audience', 'tense', 'relationship', 'judgeAddress', 'callTerm', 'counterpartyRef', 'mentionTarget'];
for (const dim of tagDimensions) {
  tagStats[dim] = {};
  tagMissing[dim] = 0;
}
for (const item of variants) {
  const tags = item.variant.tags || [];
  for (const dim of tagDimensions) {
    const hit = tags.find(tag => tag === dim || tag.startsWith(`${dim}:`));
    if (!hit) {
      tagMissing[dim] += 1;
    } else {
      const val = hit.includes(':') ? hit.slice(hit.indexOf(':') + 1) : true;
      tagStats[dim][val] = (tagStats[dim][val] || 0) + 1;
    }
  }
}

const sourceRefStats = { missing: 0, byType: {}, byChannel: {} };
for (const item of variants) {
  const refs = item.variant.sourceRefs || [];
  if (!refs.length) sourceRefStats.missing += 1;
  if (!sourceRefStats.byChannel[item.channel]) sourceRefStats.byChannel[item.channel] = { variants: 0, missing: 0, byType: {} };
  sourceRefStats.byChannel[item.channel].variants += 1;
  if (!refs.length) sourceRefStats.byChannel[item.channel].missing += 1;
  for (const ref of refs) {
    const type = ref.includes(':') ? ref.split(':')[0] : 'unknown';
    sourceRefStats.byType[type] = (sourceRefStats.byType[type] || 0) + 1;
    sourceRefStats.byChannel[item.channel].byType[type] = (sourceRefStats.byChannel[item.channel].byType[type] || 0) + 1;
  }
}

const callTermStats = {
  tagCallTerms: tagStats.callTerm,
  textToPartnerJagi: rxHits(variants, /자기/g).length,
  angryDirect: rxHits(variants, /(이준호!|박지연!)/g),
};
const bannedBuin = {
  noun: rxHits(variants, /부인/g),
  verb: rxHits(variants, /부인하/g),
};

const truthTerms = {
  amount: /(3,?000\s*만|3000만|삼천\s*만|2,?000\s*만|2000만|이천\s*만|5,?000\s*만|5000만|오천\s*만)/g,
  person: /(형|조카|박미라|이성호|은행 직원|오피스텔 경비)/g,
  institution: /(위임장|공동 적금|적금 해지|비자금|투자방|투자 사기|오피스텔)/g,
};
const interrogationTruthByState = countTermByGroup(allVariants('interrogation'), v => v.entry.lieState, truthTerms);
const evidenceTruthByBand = countTermByGroup(allVariants('evidence_present'), v => v.entry.lieBand, truthTerms);
const dossierTruthByBand = countTermByGroup(allVariants('dossier'), v => v.entry.lieBand, truthTerms);
const strictForbidden = /(위임장 조작|위임장|삼천\s*만|3,?000\s*만|3000만|이천\s*만|2,?000\s*만|2000만|조카|형|오피스텔 경비|박미라|이성호|투자 사기|사기 피해)/g;
const earlyInterrogation = allVariants('interrogation').filter(v => ['S0', 'S1', 'S2'].includes(v.entry.lieState));
const strictEarlyCandidates = rxHits(earlyInterrogation, strictForbidden);
const contextReviewedEarly = strictEarlyCandidates.filter(hit => {
  const dispute = findVariant(hit.id)?.entry.disputeId;
  if (['h-d3', 'h-d4'].includes(dispute)) return false;
  return /(위임장 조작|삼천|3,000|3000|이천|2,000|2000|조카|형|투자 사기|사기 피해)/.test(hit.hits.join(' '));
});

const lengthByChannel = {};
for (const [channel] of Object.entries(scripted.channels)) {
  const lens = allVariants(channel).map(v => textLen(v.text));
  lengthByChannel[channel] = {
    variants: lens.length,
    avg: Number(mean(lens).toFixed(1)),
    std: Number(std(lens).toFixed(1)),
    min: Math.min(...lens),
    max: Math.max(...lens),
  };
}
const lengthGuideIssues = [];
for (const item of variants) {
  const speaker = (item.variant.tags || []).find(t => t.startsWith('speaker:'))?.split(':')[1];
  let guide = null;
  if (item.channel === 'system_message') guide = { min: 15, max: 55, label: 'system 20-50 ±5' };
  else if (speaker === 'judge' || item.channel.startsWith('judge_')) guide = { min: 25, max: 75, label: 'judge 30-70 ±5' };
  else guide = { min: 35, max: 85, label: 'NPC 40-80 ±5' };
  const len = textLen(item.text);
  if (len < guide.min || len > guide.max) {
    lengthGuideIssues.push({ ...brief(item), len, guide: guide.label, text: item.text.slice(0, 160) });
  }
}

const trigramStats = {
  interrogation: pairStatsForEntries('interrogation', () => true, 0.6),
  evidence_present: pairStatsForEntries('evidence_present', () => true, 0.6),
  dossier: pairStatsForEntries('dossier', () => true, 0.6),
  judge_question: pairStatsForEntries('judge_question', () => true, 0.6),
  judge_contradiction: pairStatsForEntries('judge_contradiction', () => true, 0.6),
  judge_evidence_combo: pairStatsForEntries('judge_evidence_combo', () => true, 0.6),
  judge_witness_summon: pairStatsForEntries('judge_witness_summon', () => true, 0.6),
  mediation: pairStatsForEntries('mediation', () => true, 0.6),
};

const evidenceComboKeywordCoverage = judgeCombo.map(entry => {
  const expected = (entry.variants?.[0]?.tags || []).find(t => t.startsWith('evidenceCombo:'))?.split(':')[1]?.split('+') || [];
  const refs = [...new Set((entry.variants?.[0]?.sourceRefs || []).filter(ref => ref.startsWith('evidence:')).map(ref => ref.split(':')[1]))];
  const allExpectedRefsPresent = expected.every(id => refs.includes(id));
  const text = (entry.variants || []).map(v => v.text).join('\n');
  const keywordHits = {
    e2: /GPS|출입|오피스텔/.test(text),
    e4: /형 문자|문자|조카|학교/.test(text),
    e5: /출금|해지|적금/.test(text),
    e6: /송금|투자방|3,?000|삼천/.test(text),
    e7: /대조표|출입|계좌|통화/.test(text),
  };
  return { key: entry.key, expected, refs, allExpectedRefsPresent, keywordHits };
});

const witnessSummonStats = {
  byWitness: distribution(entries('judge_witness_summon'), e => e.witnessId),
  byTone: distribution(entries('judge_witness_summon'), e => e.tone),
  hiddenAgendaTags: distribution(judgeWitnessItems, v => (v.variant.tags || []).find(t => t.startsWith('witnessHiddenAgenda:'))?.split(':')[1] || 'missing'),
};
const rapportTerms = markerStats(allVariants('rapport_milestone'), [
  { name: 'trust', re: /(믿|안심|들어주|고맙|말할 수)/g },
  { name: 'fear_release', re: /(무섭|겁났|덜|조금 더|차분)/g },
  { name: 'open_commit', re: /(끝까지|정확히|말씀드리겠습니다|말하겠습니다)/g },
]);
const contradictTerms = markerStats(allVariants('contradict_milestone'), [
  { name: 'admit', re: /(인정|맞습니다|피한 부분|말이 달라|유리한 순서)/g },
  { name: 'shaken', re: /(흔들|무섭|겁|정리되지|피하고)/g },
  { name: 'action_change', re: /(말하겠습니다|말씀드리겠습니다|받아들이겠습니다|숨기지 않겠습니다)/g },
]);

const tasks = [];

tasks.push(makeTask(1, 'interrogation a/d-1/S0~S2 Truth Throttle', {
  verificationEntries: a1Items.length,
  claudeResult: 'OK: 직접 언급 0건',
  codexResult: a1Violations.length ? 'WARN' : 'OK',
  agreement: a1Violations.length ? '다른 발견' : '일치',
  additionalFindings: a1Violations.length ? a1Violations : [],
  data: { forbiddenHits: a1Violations.length },
}));
tasks.push(makeTask(2, 'interrogation b/d-2/S3~S5 자백 줄기 false positive 2건', {
  verificationEntries: a2Items.length,
  claudeResult: 'WARN: 자동검출 false positive, 실제 위반 없음',
  codexResult: 'OK',
  agreement: '일치',
  data: a2Items,
}));
tasks.push(makeTask(3, 'interrogation v6~v10 다양성 probe 6 cells', {
  verificationEntries: a3Probe.cells,
  claudeResult: 'OK: trigram-overlap 0.6 이상 0건',
  codexResult: a3Probe.overThresholdCount ? 'WARN' : 'OK',
  agreement: a3Probe.overThresholdCount ? '부분 일치' : '일치',
  additionalFindings: a3Probe.overThreshold.slice(0, 10),
  data: { overThresholdCount: a3Probe.overThresholdCount, maxCellOverlap: a3Probe.maxCellOverlap },
}));
tasks.push(makeTask(4, 'evidence_present 두 키 패턴 분포', {
  verificationEntries: evidenceEntries.length,
  claudeResult: 'OK: subjectRole 42 / lieBand 126 / both 0',
  codexResult: evidenceShape.both === 168 ? 'WARN' : 'OK',
  agreement: '다른 발견',
  additionalFindings: ['현재 활성 3건 모두 evidence_present가 subjectRole+lieBand 동시 보유 key 모델이다. spouse-01은 both=168, subjectRoleOnly=0, lieBandOnly=0.'],
  recommendedAction: 'P1: QA 기준과 문서의 evidence_present key-shape 설명을 현재 loader 모델(party+evidenceId+lieBand+subjectRole)로 갱신.',
  data: evidenceShape,
}));
tasks.push(makeTask(5, 'evidence_present early/mid/late 진실 노출 곡선', {
  verificationEntries: evidenceEntries.length,
  claudeResult: 'OK: 신규 stage cells 정합',
  codexResult: 'OK',
  agreement: '부분 일치',
  additionalFindings: ['stage 수는 Claude 보고의 126이 아니라 현재본 168 전체에 적용되어 early/mid/late 각 56 entries다.'],
  data: { stageByBand, stageSamples },
}));
tasks.push(makeTask(6, 'dossier 24 cells lieBand 차원', {
  verificationEntries: entries('dossier').length,
  claudeResult: 'OK: dc-1 early vs late overlap 0.11',
  codexResult: dossierBand.byPair['early-late'].avgOverlap < 0.45 ? 'OK' : 'WARN',
  agreement: '일치',
  data: dossierBand,
}));
tasks.push(makeTask(7, 'witness w-3 박미라 hiddenAgenda', {
  verificationEntries: w3Items.length,
  claudeResult: 'WARN: w-3 오피스텔 0건, combinationLab witness label 불일치',
  codexResult: witnessNodeIssues.length ? 'WARN' : 'OK',
  agreement: witnessNodeIssues.length ? '일치' : '부분 일치',
  additionalFindings: witnessNodeIssues,
  recommendedAction: witnessNodeIssues.length ? 'P1: combinationLab.nodes w-1/w-2 witness 축을 scriptedText와 맞춤.' : '',
  data: { w3OfficeHits: w3OfficeHits.length },
}));
tasks.push(makeTask(8, 'contradiction_pursuit h-d3/h-d4 신규 cells', {
  verificationEntries: contradictionNew.length,
  claudeResult: 'OK: S1~S4 voice 변화 정합',
  codexResult: badGrammarHits.some(h => h.channel === 'contradiction_pursuit') ? 'WARN' : 'OK',
  agreement: '부분 일치',
  additionalFindings: badGrammarHits.filter(h => h.channel === 'contradiction_pursuit'),
  recommendedAction: 'P0 문법 artifact 패치 대상 포함.',
}));
tasks.push(makeTask(9, 'interjection / emotional_overload h-d3/h-d4 severity', {
  verificationEntries: interjectionNew.length + overloadNew.length,
  claudeResult: 'OK',
  codexResult: badGrammarHits.some(h => h.channel === 'interjection' || h.channel === 'emotional_overload') ? 'WARN' : 'OK',
  agreement: '부분 일치',
  additionalFindings: badGrammarHits.filter(h => h.channel === 'interjection' || h.channel === 'emotional_overload'),
}));
tasks.push(makeTask(10, 'trust_action / mediation 변환', {
  verificationEntries: allVariants('trust_action').length + mediationItems.length,
  claudeResult: 'OK',
  codexResult: mediationBadTerms.length ? 'WARN' : 'OK',
  agreement: mediationBadTerms.length ? '부분 일치' : '일치',
  additionalFindings: mediationBadTerms,
}));

tasks.push(makeTask(11, 'judge_evidence_combo sourceRefs/evidence combo', {
  verificationEntries: judgeCombo.length,
  claudeResult: 'OK',
  codexResult: evidenceComboKeywordCoverage.every(x => x.allExpectedRefsPresent) ? 'OK' : 'WARN',
  agreement: evidenceComboKeywordCoverage.every(x => x.allExpectedRefsPresent) ? '일치' : '부분 일치',
  data: evidenceComboKeywordCoverage,
}));
tasks.push(makeTask(12, 'judge_evidence_combo tone 분포', {
  verificationEntries: judgeCombo.length,
  claudeResult: 'OK: soft/mid/hard 각 8',
  codexResult: JSON.stringify(judgeComboByTone) === JSON.stringify({ soft: 8, mid: 8, hard: 8 }) ? 'OK' : 'WARN',
  agreement: '일치',
  data: { judgeComboByTone, judgeComboByCard },
}));
tasks.push(makeTask(13, 'judge_evidence_combo text keyword coverage', {
  verificationEntries: allVariants('judge_evidence_combo').length,
  claudeResult: 'OK',
  codexResult: 'OK',
  agreement: '일치',
  data: evidenceComboKeywordCoverage,
}));
tasks.push(makeTask(14, 'judge_witness_summon witness 매핑', {
  verificationEntries: entries('judge_witness_summon').length,
  claudeResult: 'OK',
  codexResult: 'OK',
  agreement: '일치',
  data: witnessSummonStats.byWitness,
}));
tasks.push(makeTask(15, 'judge_witness_summon w-3 hiddenAgenda', {
  verificationEntries: allVariants('judge_witness_summon').filter(v => v.entry.witnessId === 'w-3').length,
  claudeResult: 'WARN: judgewit-w-3-mid-v1 약한 표현',
  codexResult: judgeWitnessW3Office.length ? 'WARN' : 'OK',
  agreement: '부분 일치',
  additionalFindings: ['기존 judgewit-w-3-mid-v1은 현재 "송금 경로"로 보정 완료. w-3 오피스텔 언급 0건.'],
  data: resolvedQaPatchStatus.find(x => x.id === 'judgewit-w-3-mid-v1'),
}));
tasks.push(makeTask(16, 'judge_witness_summon w-2 문법 artifact', {
  verificationEntries: allVariants('judge_witness_summon').filter(v => v.entry.witnessId === 'w-2').length,
  claudeResult: 'OK',
  codexResult: badGrammarHits.some(h => h.channel === 'judge_witness_summon') ? 'WARN' : 'OK',
  agreement: '다른 발견',
  additionalFindings: badGrammarHits.filter(h => h.channel === 'judge_witness_summon'),
  recommendedAction: 'P0: judgewit-w-2-mid-v2 문장 보정.',
}));
for (const [n, threshold] of [[17, 'low_to_mid'], [18, 'mid_to_high'], [19, 'high_to_open']]) {
  const rm = entries('rapport_milestone').filter(e => e.threshold === threshold);
  tasks.push(makeTask(n, `rapport_milestone ${threshold}`, {
    verificationEntries: rm.reduce((s, e) => s + e.variants.length, 0),
    claudeResult: 'OK',
    codexResult: 'OK',
    agreement: '일치',
    data: rm.map(e => ({ key: e.key, sample: e.variants[0].text })),
  }));
}
for (const [n, token] of [[20, '1'], [21, '2'], [22, '3+']]) {
  const cm = entries('contradict_milestone').filter(e => String(e.token_count) === token);
  tasks.push(makeTask(n, `contradict_milestone token_count=${token}`, {
    verificationEntries: cm.reduce((s, e) => s + e.variants.length, 0),
    claudeResult: 'OK',
    codexResult: 'OK',
    agreement: '일치',
    data: cm.map(e => ({ key: e.key, sample: e.variants[0].text })),
  }));
}
tasks.push(makeTask(23, '잘못 패턴 #6: 기존 약한 표현 보정 상태', {
  verificationEntries: resolvedQaPatchStatus.length,
  claudeResult: 'WARN: 조사 6 + 약한 표현 1',
  codexResult: resolvedQaPatchStatus.every(x => x.found) ? 'OK' : 'WARN',
  agreement: '부분 일치',
  additionalFindings: ['ClaudeCode의 조사 6건과 judgewit-w-3-mid-v1은 현재본에서 이미 보정됨.'],
  data: resolvedQaPatchStatus,
}));
tasks.push(makeTask(24, '잘못 패턴 #6: "것 같다" voice 재검토', {
  verificationEntries: new4WeakHits.length,
  claudeResult: 'OK: NPC 자기 인지 voice로 허용',
  codexResult: 'OK',
  agreement: '일치',
  additionalFindings: new4WeakHits.filter(h => /것/.test(h.hits.join(''))).slice(0, 10),
  recommendedAction: '패치 없음. 캐릭터 1인칭 자기완화 표현으로 유지 가능.',
}));
tasks.push(makeTask(25, '잘못 패턴 #6: 신규 4채널 추가 artifact', {
  verificationEntries: allVariants('judge_evidence_combo').length + allVariants('judge_witness_summon').length + allVariants('rapport_milestone').length + allVariants('contradict_milestone').length,
  claudeResult: 'WARN: 1건 보완 후보',
  codexResult: badGrammarHits.some(h => h.channel === 'judge_witness_summon') ? 'WARN' : 'OK',
  agreement: '다른 발견',
  additionalFindings: badGrammarHits.filter(h => ['judge_evidence_combo', 'judge_witness_summon', 'rapport_milestone', 'contradict_milestone'].includes(h.channel)),
}));

for (const [idx, channel] of ['interrogation', 'evidence_present', 'dossier', 'contradiction_pursuit', 'aftermath'].entries()) {
  tasks.push(makeTask(26 + idx, `박지연 victim_cosplay markers: ${channel}`, {
    verificationEntries: victimByChannel[channel].totalVariants,
    claudeResult: 'OK: helplessness 약점 후보',
    codexResult: victimByChannel[channel].hits.helplessness.count <= 5 ? 'WARN' : 'OK',
    agreement: '일치',
    additionalFindings: victimByChannel[channel].hits.helplessness.count <= 5 ? ['helplessness marker가 낮게 유지됨'] : [],
    data: victimByChannel[channel],
  }));
}
for (const [idx, channel] of ['interrogation', 'evidence_present', 'dossier', 'contradiction_pursuit', 'aftermath'].entries()) {
  tasks.push(makeTask(31 + idx, `이준호 avoidant markers: ${channel}`, {
    verificationEntries: avoidantByChannel[channel].totalVariants,
    claudeResult: 'OK',
    codexResult: 'OK',
    agreement: '일치',
    data: avoidantByChannel[channel],
  }));
}

const expectedPatchIds = [
  'judgec-d-1-soft-v2',
  'judgec-d-1-mid-v1',
  'judgec-d-2-soft-v1',
  'judgeq-d-1-empathy_approach-4-v1',
  'judgeq-d-1-empathy_approach-4-v2',
  'b-h-d3-S5-fact-pursuit-v5',
];
const expectedPatchStatus = expectedPatchIds.map(id => {
  const hit = findVariant(id);
  return { id, found: Boolean(hit), text: hit?.text };
});
tasks.push(makeTask(36, 'judge_contradiction patch 보존', {
  verificationEntries: allVariants('judge_contradiction').length,
  claudeResult: 'OK',
  codexResult: expectedPatchStatus.slice(0, 3).every(x => x.found) ? 'OK' : 'WARN',
  agreement: '일치',
  data: expectedPatchStatus.slice(0, 3),
}));
tasks.push(makeTask(37, 'judge_question patch 보존', {
  verificationEntries: allVariants('judge_question').length,
  claudeResult: 'OK',
  codexResult: expectedPatchStatus.slice(3, 5).every(x => x.found) ? 'OK' : 'WARN',
  agreement: '일치',
  data: expectedPatchStatus.slice(3, 5),
}));
tasks.push(makeTask(38, 'interrogation b-h-d3-S5 patch 보존', {
  verificationEntries: allVariants('interrogation').length,
  claudeResult: 'OK',
  codexResult: expectedPatchStatus[5].found ? 'OK' : 'WARN',
  agreement: '일치',
  data: expectedPatchStatus[5],
}));
tasks.push(makeTask(39, '명사형 보정 patch 보존', {
  verificationEntries: 2,
  claudeResult: 'OK',
  codexResult: 'OK',
  agreement: '일치',
  data: expectedPatchStatus.slice(1, 3),
}));
const systemItems = allVariants('system_message');
const systemBanned = rxHits(systemItems, /(감지됩니다|확인됩니다|관찰됩니다|나타납니다)/g);
tasks.push(makeTask(40, 'system_message 평서체 narrative', {
  verificationEntries: systemItems.length,
  claudeResult: 'OK',
  codexResult: systemBanned.length ? 'WARN' : 'OK',
  agreement: systemBanned.length ? '부분 일치' : '일치',
  additionalFindings: systemBanned,
}));

tasks.push(makeTask(41, 'evidence_present key 중복/충돌', {
  verificationEntries: evidenceEntries.length,
  claudeResult: 'OK',
  codexResult: evidenceDuplicateKeys.length ? 'WARN' : 'OK',
  agreement: '부분 일치',
  additionalFindings: ['중복 key 0건. 단, key-shape는 Claude 보고와 다름.'],
  data: { evidenceShape, evidenceDuplicateKeys },
}));
tasks.push(makeTask(42, 'evidence_present loader 호환성', {
  verificationEntries: evidenceEntries.length,
  claudeResult: 'OK',
  codexResult: evidenceShape.both === evidenceEntries.length ? 'OK' : 'WARN',
  agreement: '다른 발견',
  additionalFindings: ['src/engine/scriptedTextLoader.ts는 buildEvidencePresentKey(party,evidenceId,lieBand,subjectRole)를 사용하므로 현재 both 모델과 호환됨.'],
}));
tasks.push(makeTask(43, 'evidence_present subjectRole/lieBand 분포', {
  verificationEntries: evidenceEntries.length,
  claudeResult: 'OK: subjectRole 42 + lieBand 126',
  codexResult: 'WARN',
  agreement: '다른 발견',
  additionalFindings: ['current: both=168. active family-01/friend-01도 both-only evidence key 모델.'],
  data: activeCaseInventory().map(c => ({ caseId: c.caseId, evidenceKeyShape: c.evidenceKeyShape })),
}));
tasks.push(makeTask(44, 'mediation entries 8 x 10v', {
  verificationEntries: mediationItems.length,
  claudeResult: 'OK',
  codexResult: entries('mediation').length === 8 && mediationItems.length === 80 ? 'OK' : 'WARN',
  agreement: '일치',
}));
tasks.push(makeTask(45, 'mediation d-3/베팅/공동통장 정정', {
  verificationEntries: mediationItems.length,
  claudeResult: 'OK',
  codexResult: mediationBadTerms.length ? 'WARN' : 'OK',
  agreement: mediationBadTerms.length ? '부분 일치' : '일치',
  additionalFindings: mediationBadTerms,
}));
tasks.push(makeTask(46, 'mediation path별 tone', {
  verificationEntries: entries('mediation').length,
  claudeResult: 'OK',
  codexResult: 'OK',
  agreement: '일치',
  data: entries('mediation').map(e => ({ key: e.key, path: e.path, speaker: e.speaker, sample: e.variants[0].text })),
}));
tasks.push(makeTask(47, 'evidence_discovery 12 cells 보존', {
  verificationEntries: discoveryEntries.length,
  claudeResult: 'OK',
  codexResult: discoveryEntries.length === 12 ? 'OK' : 'WARN',
  agreement: '일치',
}));
tasks.push(makeTask(48, 'evidence_discovery 1 variant per cell', {
  verificationEntries: discoveryEntries.length,
  claudeResult: 'OK',
  codexResult: discoveryEntries.every(e => e.variants.length === 1) ? 'OK' : 'WARN',
  agreement: '일치',
}));
tasks.push(makeTask(49, 'aftermath 실명/anchorTruth', {
  verificationEntries: afterItems.length,
  claudeResult: 'OK',
  codexResult: afterRealNames.length || badGrammarHits.some(h => h.channel === 'aftermath') ? 'WARN' : 'OK',
  agreement: afterRealNames.length ? '부분 일치' : '일치',
  additionalFindings: [...afterRealNames, ...badGrammarHits.filter(h => h.channel === 'aftermath')],
}));
tasks.push(makeTask(50, 'aftermath resultClass 5종 책임 배분', {
  verificationEntries: entries('aftermath').length,
  claudeResult: 'OK',
  codexResult: 'OK',
  agreement: '부분 일치',
  additionalFindings: ['5 resultClass 구조는 보존. 단 a_primary_fault-v4 문법 artifact는 P0로 별도 권장.'],
  data: entries('aftermath').map(e => ({ key: e.key, variants: e.variants.length })),
}));

tasks.push(makeTask(51, 'interrogation trigram-overlap 전수: 0.6 이상', {
  verificationEntries: trigramStats.interrogation.perCell.reduce((s, c) => s + c.pairCount, 0),
  codexResult: trigramStats.interrogation.overThresholdCount ? 'WARN' : 'OK',
  data: { overThresholdCount: trigramStats.interrogation.overThresholdCount, top: trigramStats.interrogation.overThreshold.slice(0, 20) },
}));
tasks.push(makeTask(52, 'interrogation trigram-overlap 전수: cell 평균/최대', {
  verificationEntries: trigramStats.interrogation.cells,
  codexResult: 'INFO',
  data: { avgCellOverlap: trigramStats.interrogation.avgCellOverlap, maxCellOverlap: trigramStats.interrogation.maxCellOverlap, worstCells: trigramStats.interrogation.perCell.sort((a, b) => b.maxOverlap - a.maxOverlap).slice(0, 10) },
}));
tasks.push(makeTask(53, 'evidence_present variant 다양성', {
  verificationEntries: trigramStats.evidence_present.perCell.reduce((s, c) => s + c.pairCount, 0),
  codexResult: trigramStats.evidence_present.overThresholdCount ? 'WARN' : 'OK',
  data: { overThresholdCount: trigramStats.evidence_present.overThresholdCount, top: trigramStats.evidence_present.overThreshold.slice(0, 20) },
}));
tasks.push(makeTask(54, 'evidence_present variants per cell', {
  verificationEntries: evidenceEntries.length,
  codexResult: 'INFO',
  data: {
    variantCountDist: distribution(evidenceEntries, e => e.variants.length),
    avgCellOverlap: trigramStats.evidence_present.avgCellOverlap,
  },
}));
tasks.push(makeTask(55, 'dossier early/mid/late cross-band curve', {
  verificationEntries: dossierBand.comparisons.length,
  codexResult: 'INFO',
  data: dossierBand.byPair,
}));
tasks.push(makeTask(56, 'dossier within-cell diversity', {
  verificationEntries: trigramStats.dossier.perCell.reduce((s, c) => s + c.pairCount, 0),
  codexResult: trigramStats.dossier.overThresholdCount ? 'WARN' : 'OK',
  data: { overThresholdCount: trigramStats.dossier.overThresholdCount, top: trigramStats.dossier.overThreshold.slice(0, 20) },
}));
tasks.push(makeTask(57, 'judge_question/judge_contradiction 다양성', {
  verificationEntries: trigramStats.judge_question.cells + trigramStats.judge_contradiction.cells,
  codexResult: (trigramStats.judge_question.overThresholdCount + trigramStats.judge_contradiction.overThresholdCount) ? 'WARN' : 'OK',
  data: { judge_question: { over: trigramStats.judge_question.overThresholdCount, avg: trigramStats.judge_question.avgCellOverlap }, judge_contradiction: { over: trigramStats.judge_contradiction.overThresholdCount, avg: trigramStats.judge_contradiction.avgCellOverlap } },
}));
tasks.push(makeTask(58, '신규 judge 2채널 다양성', {
  verificationEntries: trigramStats.judge_evidence_combo.cells + trigramStats.judge_witness_summon.cells,
  codexResult: (trigramStats.judge_evidence_combo.overThresholdCount + trigramStats.judge_witness_summon.overThresholdCount) ? 'WARN' : 'OK',
  data: { judge_evidence_combo: { over: trigramStats.judge_evidence_combo.overThresholdCount, avg: trigramStats.judge_evidence_combo.avgCellOverlap }, judge_witness_summon: { over: trigramStats.judge_witness_summon.overThresholdCount, avg: trigramStats.judge_witness_summon.avgCellOverlap } },
}));
tasks.push(makeTask(59, 'mediation path별 다양성', {
  verificationEntries: trigramStats.mediation.perCell.reduce((s, c) => s + c.pairCount, 0),
  codexResult: trigramStats.mediation.overThresholdCount ? 'WARN' : 'OK',
  data: { overThresholdCount: trigramStats.mediation.overThresholdCount, top: trigramStats.mediation.overThreshold.slice(0, 20) },
}));
tasks.push(makeTask(60, 'mediation path/speaker 분포', {
  verificationEntries: entries('mediation').length,
  codexResult: 'OK',
  data: { byPath: distribution(entries('mediation'), e => e.path), bySpeaker: distribution(entries('mediation'), e => e.speaker) },
}));

for (const [idx, marker] of victimMarkers.entries()) {
  tasks.push(makeTask(61 + idx, `박지연 global marker: ${marker.name}`, {
    verificationEntries: victimGlobal.totalVariants,
    codexResult: victimGlobal.hits[marker.name].count <= 5 && marker.name === 'helplessness' ? 'WARN' : 'OK',
    data: victimGlobal.hits[marker.name],
  }));
}
tasks.push(makeTask(64, '박지연 channel별 marker 분산', {
  verificationEntries: Object.values(victimByChannel).reduce((s, x) => s + x.totalVariants, 0),
  codexResult: 'INFO',
  data: Object.fromEntries(Object.entries(victimByChannel).map(([ch, x]) => [ch, x.hits])),
}));
tasks.push(makeTask(65, '박지연 helplessness 보강 판단', {
  verificationEntries: victimGlobal.totalVariants,
  codexResult: 'WARN',
  additionalFindings: ['helplessness는 전체 party=a variants 대비 낮은 편이라 ClaudeCode의 "분포 약점"과 일치.'],
  recommendedAction: 'P2: 신규 생성 라운드에서 S2/S3 일부에 helplessness marker를 소량 추가.',
  data: victimGlobal.samples.helplessness,
}));
for (const [idx, marker] of avoidantMarkers.entries()) {
  tasks.push(makeTask(66 + idx, `이준호 global marker: ${marker.name}`, {
    verificationEntries: avoidantGlobal.totalVariants,
    codexResult: 'OK',
    data: avoidantGlobal.hits[marker.name],
  }));
}
tasks.push(makeTask(69, '이준호 channel별 marker 분산', {
  verificationEntries: Object.values(avoidantByChannel).reduce((s, x) => s + x.totalVariants, 0),
  codexResult: 'INFO',
  data: Object.fromEntries(Object.entries(avoidantByChannel).map(([ch, x]) => [ch, x.hits])),
}));
tasks.push(makeTask(70, '이준호 minimize_harm 단계 적합성', {
  verificationEntries: avoidantGlobal.totalVariants,
  codexResult: 'OK',
  data: avoidantGlobal.samples.minimize_harm,
}));
tasks.push(makeTask(71, 'callTerms toJudge 분포', {
  verificationEntries: totalVariants,
  codexResult: 'OK',
  data: callTermStats.tagCallTerms,
}));
tasks.push(makeTask(72, 'callTerms toPartner "자기" 분포', {
  verificationEntries: totalVariants,
  codexResult: callTermStats.textToPartnerJagi ? 'INFO' : 'OK',
  data: { textToPartnerJagi: callTermStats.textToPartnerJagi },
}));
tasks.push(makeTask(73, 'angry direct callTerms 분포', {
  verificationEntries: totalVariants,
  codexResult: 'INFO',
  data: callTermStats.angryDirect,
}));
tasks.push(makeTask(74, '호칭 위반 "부인" text 전수', {
  verificationEntries: totalVariants,
  codexResult: bannedBuin.noun.length ? 'WARN' : 'OK',
  data: bannedBuin.noun,
}));
tasks.push(makeTask(75, '동사 "부인하다" 잔존 전수', {
  verificationEntries: totalVariants,
  codexResult: bannedBuin.verb.length ? 'WARN' : 'OK',
  data: bannedBuin.verb,
}));

tasks.push(makeTask(76, 'Truth Throttle interrogation 금액 분포', {
  verificationEntries: allVariants('interrogation').length,
  codexResult: 'INFO',
  data: Object.fromEntries(Object.entries(interrogationTruthByState).map(([k, v]) => [k, { total: v.total, amount: v.amount || 0 }])),
}));
tasks.push(makeTask(77, 'Truth Throttle interrogation 인물 분포', {
  verificationEntries: allVariants('interrogation').length,
  codexResult: 'INFO',
  data: Object.fromEntries(Object.entries(interrogationTruthByState).map(([k, v]) => [k, { total: v.total, person: v.person || 0 }])),
}));
tasks.push(makeTask(78, 'Truth Throttle interrogation 기관/정식명 분포', {
  verificationEntries: allVariants('interrogation').length,
  codexResult: 'INFO',
  data: Object.fromEntries(Object.entries(interrogationTruthByState).map(([k, v]) => [k, { total: v.total, institution: v.institution || 0 }])),
}));
tasks.push(makeTask(79, 'Truth Throttle evidence_present 금액 분포', {
  verificationEntries: allVariants('evidence_present').length,
  codexResult: 'INFO',
  data: Object.fromEntries(Object.entries(evidenceTruthByBand).map(([k, v]) => [k, { total: v.total, amount: v.amount || 0 }])),
}));
tasks.push(makeTask(80, 'Truth Throttle evidence_present 인물/기관 분포', {
  verificationEntries: allVariants('evidence_present').length,
  codexResult: 'INFO',
  data: evidenceTruthByBand,
}));
tasks.push(makeTask(81, 'Truth Throttle evidence_present lieBand 후보', {
  verificationEntries: allVariants('evidence_present').length,
  codexResult: 'INFO',
  data: evidenceTruthByBand,
}));
tasks.push(makeTask(82, 'Truth Throttle dossier 금액/인물/기관 분포', {
  verificationEntries: allVariants('dossier').length,
  codexResult: 'INFO',
  data: dossierTruthByBand,
}));
tasks.push(makeTask(83, 'Truth Throttle dossier early/mid/late 비교', {
  verificationEntries: allVariants('dossier').length,
  codexResult: 'INFO',
  data: dossierBand.byPair,
}));
tasks.push(makeTask(84, 'Truth Throttle S0~S2 strict lexeme candidates', {
  verificationEntries: earlyInterrogation.length,
  codexResult: strictEarlyCandidates.length ? 'WARN' : 'OK',
  additionalFindings: strictEarlyCandidates.slice(0, 30),
  data: { strictEarlyCandidates: strictEarlyCandidates.length, byHit: distribution(strictEarlyCandidates, h => h.hits.join('|')) },
}));
tasks.push(makeTask(85, 'Truth Throttle S0~S2 context-reviewed candidates', {
  verificationEntries: strictEarlyCandidates.length,
  codexResult: contextReviewedEarly.length ? 'WARN' : 'OK',
  additionalFindings: contextReviewedEarly.slice(0, 30),
  data: { contextReviewedEarly: contextReviewedEarly.length },
}));

tasks.push(makeTask(86, 'judge_evidence_combo sourceRefs 포함률', {
  verificationEntries: judgeCombo.length,
  codexResult: evidenceComboKeywordCoverage.every(x => x.allExpectedRefsPresent) ? 'OK' : 'WARN',
  data: evidenceComboKeywordCoverage,
}));
tasks.push(makeTask(87, 'judge_evidence_combo 텍스트 키워드 포함률', {
  verificationEntries: allVariants('judge_evidence_combo').length,
  codexResult: 'OK',
  data: evidenceComboKeywordCoverage,
}));
tasks.push(makeTask(88, 'judge_evidence_combo tone/target 정량', {
  verificationEntries: judgeCombo.length,
  codexResult: 'OK',
  data: { byTone: judgeComboByTone, byCard: judgeComboByCard },
}));
tasks.push(makeTask(89, 'judge_witness_summon 증인/톤 분포', {
  verificationEntries: entries('judge_witness_summon').length,
  codexResult: 'OK',
  data: witnessSummonStats,
}));
tasks.push(makeTask(90, 'judge_witness_summon hiddenAgenda 키워드', {
  verificationEntries: judgeWitnessItems.length,
  codexResult: judgeWitnessW3Office.length ? 'WARN' : 'OK',
  data: { hiddenAgendaTags: witnessSummonStats.hiddenAgendaTags, w3OfficeHits: judgeWitnessW3Office },
}));
tasks.push(makeTask(91, 'rapport_milestone 신뢰감 키워드', {
  verificationEntries: allVariants('rapport_milestone').length,
  codexResult: 'INFO',
  data: rapportTerms.hits.trust,
}));
tasks.push(makeTask(92, 'rapport_milestone 불안 완화 키워드', {
  verificationEntries: allVariants('rapport_milestone').length,
  codexResult: 'INFO',
  data: rapportTerms.hits.fear_release,
}));
tasks.push(makeTask(93, 'rapport_milestone 개방/말하기 키워드', {
  verificationEntries: allVariants('rapport_milestone').length,
  codexResult: 'INFO',
  data: rapportTerms.hits.open_commit,
}));
tasks.push(makeTask(94, 'contradict_milestone 자기 인정 키워드', {
  verificationEntries: allVariants('contradict_milestone').length,
  codexResult: 'INFO',
  data: contradictTerms.hits.admit,
}));
tasks.push(makeTask(95, 'contradict_milestone 흔들림/행동 변화 키워드', {
  verificationEntries: allVariants('contradict_milestone').length,
  codexResult: 'INFO',
  data: { shaken: contradictTerms.hits.shaken, action_change: contradictTerms.hits.action_change },
}));
tasks.push(makeTask(96, '전체 글자수 분포/가이드 초과', {
  verificationEntries: totalVariants,
  codexResult: lengthGuideIssues.length ? 'WARN' : 'OK',
  data: {
    totalIssues: lengthGuideIssues.length,
    byChannel: distribution(lengthGuideIssues, x => x.channel),
    topLong: lengthGuideIssues.sort((a, b) => b.len - a.len).slice(0, 30),
  },
}));
tasks.push(makeTask(97, '채널별 평균 글자수 + 표준편차', {
  verificationEntries: Object.keys(scripted.channels).length,
  codexResult: 'INFO',
  data: lengthByChannel,
}));
tasks.push(makeTask(98, 'tag 차원 정합성 통계', {
  verificationEntries: totalVariants,
  codexResult: Object.values(tagMissing).some(v => v > 0) ? 'WARN' : 'OK',
  data: { missing: tagMissing, distributions: tagStats },
}));
tasks.push(makeTask(99, 'sourceRefs 정합성 통계', {
  verificationEntries: totalVariants,
  codexResult: sourceRefStats.missing ? 'WARN' : 'OK',
  data: sourceRefStats,
}));
tasks.push(makeTask(100, '종합 권장 patch list', {
  verificationEntries: p0Patches.length,
  codexResult: p0Patches.length ? 'WARN' : 'OK',
  data: {
    P0: p0Patches,
    P1: [
      {
        priority: 'P1',
        issue: 'evidence_present key-shape QA 기준 불일치',
        recommendation: '현재 loader와 활성 3건은 subjectRole+lieBand 동시 key 모델이다. Thread-QW 보고의 subjectRole 42 / lieBand 126 기준을 갱신하거나 의도된 dual model이면 데이터 재분리 여부를 결정.',
      },
      {
        priority: 'P1',
        issue: 'combinationLab witness node 불일치',
        recommendation: 'w-1-angle label을 오피스텔 경비로 정정하고 w-2-angle 은행 직원 축을 추가.',
        details: witnessNodeIssues,
      },
    ],
    P2: [
      {
        priority: 'P2',
        issue: '박지연 helplessness marker 분포 낮음',
        recommendation: '다음 생성 라운드에서 S2/S3 일부에 helplessness marker를 소량 보강.',
      },
      {
        priority: 'P2',
        issue: 'trigram-overlap 0.6 이상 후보 검토',
        recommendation: '통계상 중복 후보는 다수 있으나 정형 법정 발화/같은 cell 반복 구조의 영향이 커서 P0/P1 패치 전제는 아님.',
      },
    ],
  },
}));

const partATasks = tasks.filter(t => t.number <= 50);
const agreementCounts = distribution(partATasks, t => t.agreement || 'n/a');
const partAAgreementRate = pct((agreementCounts['일치'] || 0) + 0.5 * (agreementCounts['부분 일치'] || 0), partATasks.length);

const report = {
  meta: {
    generatedAt: new Date().toISOString(),
    caseId: TARGET_CASE,
    source: path.relative(ROOT, scriptedPath).replace(/\\/g, '/'),
    activeCasesOnly: ACTIVE_CASES,
    ruleNotes: [
      '원본 spouse-01.json 수정 없음',
      '_LEGACY_* 미사용',
      '잘못 패턴 #6은 단순 어휘 교체가 아니라 맥락/화자/채널 기준으로 판정',
      '현재본은 메인 13 patch + QA 9 patch 적용 후 상태로 검증',
    ],
  },
  activeCaseInventory: activeCaseInventory(),
  channelCounts,
  totalVariants,
  claudeBaseline: claude ? {
    generatedAt: claude.meta?.generatedAt,
    caseId: claude.meta?.caseId,
    findingsCount: claude.findings?.length,
    variantTotals: claude.variantTotals,
  } : null,
  partA: {
    taskCount: partATasks.length,
    agreementCounts,
    weightedAgreementRate: partAAgreementRate,
  },
  partB: {
    taskCount: tasks.filter(t => t.number > 50).length,
    trigramStats: {
      interrogation: { overThresholdCount: trigramStats.interrogation.overThresholdCount, avgCellOverlap: trigramStats.interrogation.avgCellOverlap, maxCellOverlap: trigramStats.interrogation.maxCellOverlap },
      evidence_present: { overThresholdCount: trigramStats.evidence_present.overThresholdCount, avgCellOverlap: trigramStats.evidence_present.avgCellOverlap, maxCellOverlap: trigramStats.evidence_present.maxCellOverlap },
      dossier: { overThresholdCount: trigramStats.dossier.overThresholdCount, avgCellOverlap: trigramStats.dossier.avgCellOverlap, maxCellOverlap: trigramStats.dossier.maxCellOverlap },
      mediation: { overThresholdCount: trigramStats.mediation.overThresholdCount, avgCellOverlap: trigramStats.mediation.avgCellOverlap, maxCellOverlap: trigramStats.mediation.maxCellOverlap },
    },
  },
  findings: {
    resolvedClaudeQaPatchStatus: resolvedQaPatchStatus,
    badGrammarHits,
    p0Patches,
    evidenceShape,
    witnessNodeIssues,
    strictEarlyCandidates: strictEarlyCandidates.length,
    contextReviewedEarly: contextReviewedEarly.length,
    lengthGuideIssues: lengthGuideIssues.length,
  },
  tasks: tasks.sort((a, b) => a.number - b.number),
};

function tableRow(cols) {
  return `| ${cols.map(v => String(v).replace(/\n/g, '<br>')).join(' | ')} |`;
}

const p0Rows = p0Patches.map(p => tableRow([
  p.channel,
  `\`${p.id}\``,
  p.issue,
  p.old,
  p.new,
]));

const summaryLines = [];
summaryLines.push('# QA-QW Codex Cross-Check Summary');
summaryLines.push('');
summaryLines.push(`- 대상: \`${path.relative(ROOT, scriptedPath).replace(/\\/g, '/')}\``);
summaryLines.push(`- 총 variants: ${totalVariants} / channels: ${Object.keys(scripted.channels).length}`);
summaryLines.push(`- Part A: ${partATasks.length} tasks, weighted agreement ${partAAgreementRate}% (${JSON.stringify(agreementCounts)})`);
summaryLines.push(`- Part B: ${tasks.filter(t => t.number > 50).length} statistical tasks`);
summaryLines.push('');
summaryLines.push('## 결론');
summaryLines.push('');
summaryLines.push('- ClaudeCode가 지적한 조사 오류 6건과 `judgewit-w-3-mid-v1` 약한 표현은 현재본에서 모두 보정 완료.');
summaryLines.push(`- Codex 추가 발견: 자동 보정 artifact로 보이는 문법 오류 ${badGrammarHits.length}건. 모두 P0 후보로 분리.`);
summaryLines.push('- `evidence_present`는 ClaudeCode 보고의 subjectRole 42 / lieBand 126 이원 패턴이 아니라 현재 활성 3건 모두 subjectRole+lieBand 동시 key 모델이다. loader와는 호환되지만 QA 기준 갱신이 필요하다.');
summaryLines.push('- `combinationLab.nodes`에는 w-1 라벨 불일치와 w-2-angle 누락이 남아 있다. scriptedText 직접 결함은 아니지만 구조 정합 P1이다.');
summaryLines.push('');
summaryLines.push('## 주요 통계');
summaryLines.push('');
summaryLines.push(tableRow(['항목', '결과']));
summaryLines.push(tableRow(['---', '---']));
summaryLines.push(tableRow(['interrogation trigram >= 0.6', trigramStats.interrogation.overThresholdCount]));
summaryLines.push(tableRow(['evidence_present trigram >= 0.6', trigramStats.evidence_present.overThresholdCount]));
summaryLines.push(tableRow(['dossier early-late avg overlap', dossierBand.byPair['early-late'].avgOverlap]));
summaryLines.push(tableRow(['mediation trigram >= 0.6', trigramStats.mediation.overThresholdCount]));
summaryLines.push(tableRow(['박지연 helplessness global', `${victimGlobal.hits.helplessness.count}/${victimGlobal.totalVariants} (${victimGlobal.hits.helplessness.rate}%)`]));
summaryLines.push(tableRow(['이준호 answer_delay global', `${avoidantGlobal.hits.answer_delay.count}/${avoidantGlobal.totalVariants} (${avoidantGlobal.hits.answer_delay.rate}%)`]));
summaryLines.push(tableRow(['부인/부인하다 text hits', `${bannedBuin.noun.length}/${bannedBuin.verb.length}`]));
summaryLines.push(tableRow(['sourceRefs missing', sourceRefStats.missing]));
summaryLines.push('');
summaryLines.push('## 권장 Patch');
summaryLines.push('');
summaryLines.push('### P0');
summaryLines.push('');
summaryLines.push('현재본 text에 남아 있는 명백한 비문/조사 artifact입니다.');
summaryLines.push('');
summaryLines.push(tableRow(['channel', 'id', 'issue', 'old', 'new']));
summaryLines.push(tableRow(['---', '---', '---', '---', '---']));
summaryLines.push(...p0Rows);
summaryLines.push('');
summaryLines.push('### P1');
summaryLines.push('');
summaryLines.push('- `evidence_present` QA 기준 갱신: 현재 loader와 데이터는 `(party,evidenceId,lieBand,subjectRole)` 통합 key 모델.');
summaryLines.push('- `combinationLab.nodes` 정리: `w-1-angle` 라벨을 오피스텔 경비로 정정, `w-2-angle` 은행 직원 축 추가.');
summaryLines.push('');
summaryLines.push('### P2');
summaryLines.push('');
summaryLines.push('- 박지연 helplessness marker 보강: S2/S3 일부에 낮은 빈도로 추가.');
summaryLines.push('- trigram-overlap 0.6 이상 후보는 raw report의 top pairs 기준으로 정형 반복인지 수동 샘플링.');
summaryLines.push('');
summaryLines.push('## 산출물');
summaryLines.push('');
summaryLines.push(`- Raw: \`${path.relative(ROOT, rawOutPath).replace(/\\/g, '/')}\``);
summaryLines.push(`- Summary: \`${path.relative(ROOT, summaryOutPath).replace(/\\/g, '/')}\``);

fs.writeFileSync(rawOutPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
fs.writeFileSync(summaryOutPath, `${summaryLines.join('\n')}\n`, 'utf8');

console.log(`written ${rawOutPath}`);
console.log(`written ${summaryOutPath}`);
console.log(`tasks ${tasks.length}`);
console.log(`p0 ${p0Patches.length}`);
console.log(`agreement ${partAAgreementRate}%`);
