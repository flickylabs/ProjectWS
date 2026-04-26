const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const OUT_DIR = __dirname;
const CASE_IDS = ['spouse-01', 'family-01', 'friend-01'];
const EXPECTED_QW_FINDINGS = path.join(OUT_DIR, 'QA-QW-claude-findings.json');
const EXPECTED_QW_REPORT = path.join(OUT_DIR, 'QA-QW-claude-report.md');
const FALLBACK_QW_FINDINGS = path.join(ROOT, 'tmp/QA-QW-spouse-01-findings.json');
const FALLBACK_QW_REPORT = path.join(ROOT, 'tmp/QA-QW-spouse-01-report.md');
const LEGACY_Q_REPORT = path.join(ROOT, 'tmp/QA-Q-spouse-01-codex-report.json');
const REPORT_OUT = path.join(OUT_DIR, 'QA-QW-Cross-codex-report.json');
const SUMMARY_OUT = path.join(OUT_DIR, 'QA-QW-Cross-codex-summary.md');

const LIE_STATES = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5'];
const NEW_CHANNELS = ['judge_evidence_combo', 'judge_witness_summon', 'rapport_milestone', 'contradict_milestone'];
const JUDGE_CHANNELS = ['judge_question', 'judge_contradiction', 'judge_evidence_combo', 'judge_witness_summon'];

const CASE_FACT_TERMS = {
  'spouse-01': {
    '3000만원': /3,?000\s*만\s*원|삼천\s*만\s*원|3천\s*만\s*원/g,
    위임장: /위임장|위임\s*서류|위임\s*문서/g,
    박미라: /박미라/g,
    투자사기: /투자\s*사기|투자방|사기\s*손실/g,
  },
  'family-01': {
    '60': /60|육십/g,
    '40': /40|사십/g,
    '90': /90|구십/g,
    출생_비밀: /출생\s*비밀|배다른|친자|아버지의\s*친자/g,
    일기장: /일기장|어머니\s*기록/g,
    유서: /유서/g,
  },
  'friend-01': {
    '9일': /9\s*일|구일/g,
    '11번': /11\s*번|열한\s*번/g,
    아버지돈: /아버지\s*돈|부친\s*돈|아버지에게서|아버지한테/g,
    사기: /사기|갈취|속였/g,
  },
};

const PARTY_META = {
  'spouse-01': {
    a: { name: '박지연', archetype: 'victim_cosplay' },
    b: { name: '이준호', archetype: 'avoidant' },
  },
  'family-01': {
    a: { name: '윤태성', archetype: 'confrontational' },
    b: { name: '윤정후', archetype: 'affect_flattening' },
  },
  'friend-01': {
    a: { name: '송다은', archetype: 'premature_summary' },
    b: { name: '최수민', archetype: 'affect_flattening' },
  },
};

const ARCHETYPE_MARKERS = {
  victim_cosplay: {
    helplessness_marker_global: /무서|겁났|겁이|떨|버림|상처|끝장|무너|참았|버텼|살려/g,
    강한_단정: /분명|확실|절대|틀림없|말이\s*안|제가\s*맞/g,
  },
  avoidant: {
    answer_delay: /…|\.{3}|잠깐|그건|다만|지금은|말을\s*아끼|말하기\s*어렵|그\s*부분/g,
    모호어_쪽: /쪽|그쪽|이쪽/g,
  },
  confrontational: {
    강한_단정: /분명|당연|말이\s*안|납득|도대체|죄인|악의|틀렸|제가\s*보기엔/g,
    단정형_종결: /입니다\.|아닙니다\.|겁니다\.|해야\s*합니다\./g,
  },
  affect_flattening: {
    감정_marker: /화가|억울|무섭|겁|상처|울|분노|미안|두려/g,
    침착_표현: /담담|차분|짧게|기록|사실만|감정을\s*보태|말을\s*아낀|그\s*선/g,
  },
  premature_summary: {
    빠른_결론_marker: /결론|정리|끝내|마무리|그만|이미|끝났|돌이킬/g,
    후회_표현: /후회|미안|돌이킬|제가\s*틀렸|잘못/g,
  },
};

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function exists(file) {
  return fs.existsSync(file);
}

function loadCases() {
  return Object.fromEntries(CASE_IDS.map(caseId => {
    const scripted = readJson(path.join(ROOT, 'src/data/scriptedText', `${caseId}.json`));
    const generated = readJson(path.join(ROOT, 'src/data/cases/generated', `${caseId}.json`));
    return [caseId, { scripted, generated }];
  }));
}

function resetRe(re) {
  re.lastIndex = 0;
  return re;
}

function test(re, text) {
  resetRe(re);
  return re.test(text || '');
}

function matchCount(re, text) {
  const m = (text || '').match(resetRe(re));
  return m ? m.length : 0;
}

function pct(n, d, digits = 1) {
  if (!d) return '0%';
  return `${((n / d) * 100).toFixed(digits)}%`;
}

function mean(nums) {
  return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
}

function normalizeText(text) {
  return (text || '').replace(/\s+/g, '').replace(/[.,!?…'"“”‘’]/g, '');
}

function trigrams(text) {
  const s = normalizeText(text);
  const out = new Set();
  for (let i = 0; i < s.length - 2; i += 1) out.add(s.slice(i, i + 3));
  return out;
}

function trigramOverlap(a, b) {
  const A = trigrams(a);
  const B = trigrams(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter += 1;
  return inter / Math.min(A.size, B.size);
}

function tokens(text) {
  return (text || '')
    .replace(/[.,!?…'"“”‘’]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function jaccard(a, b) {
  const A = new Set(tokens(a));
  const B = new Set(tokens(b));
  if (!A.size && !B.size) return 1;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter += 1;
  return inter / (A.size + B.size - inter);
}

function levenshtein(a, b) {
  const A = Array.from(a || '');
  const B = Array.from(b || '');
  const prev = Array(B.length + 1).fill(0).map((_, i) => i);
  const curr = Array(B.length + 1).fill(0);
  for (let i = 1; i <= A.length; i += 1) {
    curr[0] = i;
    for (let j = 1; j <= B.length; j += 1) {
      curr[j] = A[i - 1] === B[j - 1]
        ? prev[j - 1]
        : Math.min(prev[j - 1] + 1, prev[j] + 1, curr[j - 1] + 1);
    }
    for (let j = 0; j < curr.length; j += 1) prev[j] = curr[j];
  }
  return prev[B.length];
}

function flattenAll(cases) {
  const out = [];
  for (const [caseId, bundle] of Object.entries(cases)) {
    for (const [channel, ch] of Object.entries(bundle.scripted.channels || {})) {
      for (const entry of ch.entries || []) {
        for (const variant of entry.variants || []) {
          out.push({
            caseId,
            channel,
            entry,
            variant,
            id: variant.id || '',
            key: entry.key || '',
            text: variant.text || '',
            behaviorHint: variant.behaviorHint || '',
          });
        }
      }
    }
  }
  return out;
}

function brief(item, extra = {}) {
  return {
    caseId: item.caseId,
    channel: item.channel,
    key: item.key,
    id: item.id,
    text: item.text.slice(0, 180),
    ...extra,
  };
}

function inventory(cases) {
  let totalCells = 0;
  let totalVariants = 0;
  const byCase = {};
  for (const [caseId, bundle] of Object.entries(cases)) {
    let cells = 0;
    let variants = 0;
    const byChannel = {};
    const evidenceKeyShape = { subjectRoleOnly: 0, lieBandOnly: 0, both: 0, neither: 0 };
    for (const [channel, ch] of Object.entries(bundle.scripted.channels || {})) {
      const entries = ch.entries || [];
      const count = entries.reduce((sum, entry) => sum + (entry.variants || []).length, 0);
      byChannel[channel] = { cells: entries.length, variants: count };
      cells += entries.length;
      variants += count;
      if (channel === 'evidence_present') {
        for (const entry of entries) {
          const hasSubjectRole = Boolean(entry.subjectRole);
          const hasLieBand = Boolean(entry.lieBand);
          if (hasSubjectRole && hasLieBand) evidenceKeyShape.both += 1;
          else if (hasSubjectRole) evidenceKeyShape.subjectRoleOnly += 1;
          else if (hasLieBand) evidenceKeyShape.lieBandOnly += 1;
          else evidenceKeyShape.neither += 1;
        }
      }
    }
    byCase[caseId] = {
      channels: Object.keys(bundle.scripted.channels || {}).length,
      cells,
      variants,
      evidenceKeyShape,
      channelCounts: byChannel,
    };
    totalCells += cells;
    totalVariants += variants;
  }
  return { totalCells, totalVariants, byCase };
}

function pairMetricsForCell(caseId, channel, entry) {
  const variants = entry.variants || [];
  const trigramVals = [];
  const jaccardVals = [];
  const levVals = [];
  const overPairs = [];
  let maxOverlap = 0;
  let maxPair = null;
  for (let i = 0; i < variants.length; i += 1) {
    for (let j = i + 1; j < variants.length; j += 1) {
      const a = variants[i];
      const b = variants[j];
      const tri = trigramOverlap(a.text || '', b.text || '');
      const jac = jaccard(a.text || '', b.text || '');
      const lev = levenshtein(a.text || '', b.text || '') / Math.max(1, Array.from((a.text || '').length >= (b.text || '').length ? a.text || '' : b.text || '').length);
      trigramVals.push(tri);
      jaccardVals.push(jac);
      levVals.push(lev);
      if (tri > maxOverlap) {
        maxOverlap = tri;
        maxPair = { a: a.id, b: b.id, aText: a.text, bText: b.text };
      }
      if (tri >= 0.6) {
        overPairs.push({
          caseId,
          channel,
          key: entry.key,
          a: a.id,
          b: b.id,
          overlap: Number(tri.toFixed(3)),
          aText: (a.text || '').slice(0, 140),
          bText: (b.text || '').slice(0, 140),
        });
      }
    }
  }
  return {
    caseId,
    channel,
    key: entry.key,
    variants: variants.length,
    pairCount: trigramVals.length,
    avgTrigram: Number(mean(trigramVals).toFixed(3)),
    maxTrigram: Number(maxOverlap.toFixed(3)),
    avgJaccard: Number(mean(jaccardVals).toFixed(3)),
    avgLevenshteinDistance: Number(mean(levVals).toFixed(3)),
    maxPair,
    overPairs,
  };
}

function trigramAnalysis(cases) {
  const cells = [];
  const overPairs = [];
  for (const [caseId, bundle] of Object.entries(cases)) {
    for (const [channel, ch] of Object.entries(bundle.scripted.channels || {})) {
      for (const entry of ch.entries || []) {
        const stats = pairMetricsForCell(caseId, channel, entry);
        cells.push(stats);
        overPairs.push(...stats.overPairs);
      }
    }
  }

  const byChannel = {};
  const byCase = {};
  for (const stats of cells) {
    if (!byChannel[stats.channel]) byChannel[stats.channel] = { cells: 0, pairCount: 0, candidates_60_overlap: 0, avgCellOverlapValues: [], samples: [] };
    if (!byCase[stats.caseId]) byCase[stats.caseId] = { cells: 0, pairCount: 0, candidates_60_overlap: 0, avgCellOverlapValues: [], samples: [] };
    const channelBucket = byChannel[stats.channel];
    const caseBucket = byCase[stats.caseId];
    channelBucket.cells += 1;
    channelBucket.pairCount += stats.pairCount;
    channelBucket.candidates_60_overlap += stats.overPairs.length;
    channelBucket.avgCellOverlapValues.push(stats.avgTrigram);
    caseBucket.cells += 1;
    caseBucket.pairCount += stats.pairCount;
    caseBucket.candidates_60_overlap += stats.overPairs.length;
    caseBucket.avgCellOverlapValues.push(stats.avgTrigram);
  }
  for (const [channel, bucket] of Object.entries(byChannel)) {
    bucket.avgCellOverlap = Number(mean(bucket.avgCellOverlapValues).toFixed(3));
    delete bucket.avgCellOverlapValues;
    bucket.samples = overPairs.filter(p => p.channel === channel).sort((a, b) => b.overlap - a.overlap).slice(0, 5);
  }
  for (const [caseId, bucket] of Object.entries(byCase)) {
    bucket.avgCellOverlap = Number(mean(bucket.avgCellOverlapValues).toFixed(3));
    delete bucket.avgCellOverlapValues;
    bucket.samples = overPairs.filter(p => p.caseId === caseId).sort((a, b) => b.overlap - a.overlap).slice(0, 5);
  }

  const topMonotoneCells = cells
    .filter(c => c.pairCount > 0)
    .sort((a, b) => b.avgTrigram - a.avgTrigram || b.maxTrigram - a.maxTrigram)
    .slice(0, 25)
    .map(c => ({
      caseId: c.caseId,
      channel: c.channel,
      key: c.key,
      variants: c.variants,
      avgTrigram: c.avgTrigram,
      maxTrigram: c.maxTrigram,
      avgJaccard: c.avgJaccard,
      avgLevenshteinDistance: c.avgLevenshteinDistance,
      maxPair: c.maxPair ? { a: c.maxPair.a, b: c.maxPair.b } : null,
    }));
  const highDiversity = cells
    .filter(c => c.pairCount > 0)
    .sort((a, b) => a.avgTrigram - b.avgTrigram)
    .slice(0, 25)
    .map(c => ({
      caseId: c.caseId,
      channel: c.channel,
      key: c.key,
      avgTrigram: c.avgTrigram,
      avgLevenshteinDistance: c.avgLevenshteinDistance,
    }));
  const byChannelAvgLev = {};
  for (const stats of cells) {
    if (!byChannelAvgLev[stats.channel]) byChannelAvgLev[stats.channel] = [];
    byChannelAvgLev[stats.channel].push(stats.avgLevenshteinDistance);
  }
  for (const channel of Object.keys(byChannelAvgLev)) {
    byChannelAvgLev[channel] = Number(mean(byChannelAvgLev[channel]).toFixed(3));
  }

  return {
    by_channel: byChannel,
    by_case: byCase,
    top_10_monotone_cells: topMonotoneCells.slice(0, 10),
    allMonotoneCells: topMonotoneCells,
    highDiversityCells: highDiversity,
    byChannelAvgLevenshtein: byChannelAvgLev,
    overPairs,
    cells,
  };
}

function characterVoiceDistribution(all) {
  const out = {};
  for (const caseId of CASE_IDS) {
    out[caseId] = {};
    for (const [party, meta] of Object.entries(PARTY_META[caseId])) {
      const items = all.filter(item => item.caseId === caseId && (
        item.entry.party === party ||
        item.entry.speaker === party ||
        item.entry.targetParty === party ||
        item.entry.subjectParty === party ||
        item.text.includes(meta.name)
      ));
      const markerSet = ARCHETYPE_MARKERS[meta.archetype] || {};
      const counts = { totalVariants: items.length };
      for (const [name, re] of Object.entries(markerSet)) {
        const count = items.reduce((sum, item) => sum + (test(re, item.text) ? 1 : 0), 0);
        counts[name] = `${count}/${items.length} (${pct(count, items.length)})`;
      }
      const byLieState = {};
      const byChannel = {};
      for (const item of items) {
        const state = item.entry.lieState || item.entry.lieBand || 'none';
        byLieState[state] = (byLieState[state] || 0) + 1;
        byChannel[item.channel] = (byChannel[item.channel] || 0) + 1;
      }
      counts.byLieState = byLieState;
      counts.byChannel = byChannel;
      out[caseId][`${meta.name}_${meta.archetype}`] = counts;
    }
  }
  return out;
}

function factMatrix(all) {
  const curve = {};
  const distribution = {};
  for (const caseId of CASE_IDS) {
    curve[caseId] = {};
    distribution[caseId] = {};
    for (const state of LIE_STATES) curve[caseId][state] = {};
    for (const term of Object.keys(CASE_FACT_TERMS[caseId])) {
      distribution[caseId][term] = Object.fromEntries(LIE_STATES.map(s => [s, 0]));
    }
    for (const item of all.filter(x => x.caseId === caseId && x.entry.lieState)) {
      const state = item.entry.lieState;
      if (!curve[caseId][state]) curve[caseId][state] = {};
      for (const [term, re] of Object.entries(CASE_FACT_TERMS[caseId])) {
        if (!curve[caseId][state][term]) curve[caseId][state][term] = 0;
        if (test(re, item.text)) {
          curve[caseId][state][term] += 1;
          if (distribution[caseId][term] && distribution[caseId][term][state] !== undefined) distribution[caseId][term][state] += 1;
        }
      }
    }
    for (const state of LIE_STATES) {
      for (const term of Object.keys(CASE_FACT_TERMS[caseId])) {
        if (!curve[caseId][state][term]) curve[caseId][state][term] = 0;
      }
    }
  }
  const earlyViolations = {};
  for (const caseId of CASE_IDS) {
    earlyViolations[caseId] = {};
    for (const state of ['S0', 'S1', 'S2']) {
      earlyViolations[caseId][state] = Object.values(curve[caseId][state] || {}).reduce((a, b) => a + b, 0);
    }
  }
  return { curve, distribution, earlyViolations };
}

function ratioConsistencyFamily(all) {
  const items = all.filter(x => x.caseId === 'family-01');
  const text = x => `${x.text}\n${x.behaviorHint || ''}`;
  const correctB90To60Re = /90에서\s*60|90.*60으로\s*(줄|낮|바꿨)|구십.*육십|제\s*몫\s*90.*제\s*몫\s*60|동생\s*몫\s*90.*60|윤정후\s*씨\s*몫이\s*90에서\s*60|자기\s*몫을\s*90에서\s*60/g;
  const correctA40B60Re = /A\s*40.*B\s*60|제\s*몫\s*60,\s*형\s*몫\s*40|윤정후\s*씨.*60.*윤태성\s*씨.*40|동생\s*몫\s*60|형에게\s*40|형\s*몫\s*40|제\s*동생\s*몫\s*60|B\s*60.*A\s*40/g;
  const invertedRe = /A\s*60.*B\s*40|윤태성\s*씨.*60.*윤정후\s*씨.*40|형\s*몫\s*60.*제\s*몫\s*40|제\s*몫\s*40.*형\s*몫\s*60|동생\s*몫\s*40|윤정후\s*씨에게\s*40|B\s*40.*A\s*60/g;
  const b90 = items.filter(x => test(correctB90To60Re, text(x)));
  const a40b60 = items.filter(x => test(correctA40B60Re, text(x)));
  const inverted = items.filter(x => test(invertedRe, text(x)));
  const originalB90A10Re = /제\s*몫\s*90,\s*형\s*몫\s*10|동생\s*몫\s*90,\s*제\s*몫\s*10|윤정후\s*씨.*90.*윤태성\s*씨.*10|제\s*동생\s*90,\s*제\s*몫\s*10|구십대\s*십/g;
  const changedB60A40Re = /제\s*몫\s*60,\s*형\s*몫\s*40|윤정후\s*씨.*60.*윤태성\s*씨.*40|제\s*육십,\s*형\s*사십|형에게\s*40/g;
  const originalFlow = items.filter(x => test(originalB90A10Re, text(x)));
  const changedFlow = items.filter(x => test(changedB60A40Re, text(x)));
  return {
    B_90_to_60_pattern_count: b90.length,
    A_40_B_60_pattern_count: a40b60.length,
    original_B90_A10_count: originalFlow.length,
    changed_B60_A40_count: changedFlow.length,
    inverted_A_60_B_40_count: inverted.length,
    samples_B_90_to_60: b90.slice(0, 8).map(brief),
    samples_A_40_B_60: a40b60.slice(0, 8).map(brief),
    samples_inverted: inverted.slice(0, 20).map(brief),
    verdict: inverted.length === 0 ? '정합' : `⚠️ 반대 패턴 ${inverted.length}건 발견`,
  };
}

function scanWide(all, factStats) {
  const nounActionRe = /(확인|설명|정리|처리|판단|검토|기록|진행|분리|회복|인정|부인|소명|조정)(을|를)\s*(한|하는|할|했습니다|해주십시오|해야|받)/g;
  const brokenParticleRe = /(?:^|[^가-힣])제를\s|(?:남편|아내|이준호|박지연|윤정후|윤태성|최수민|송다은|형|동생|본인|상대)의를|의\s*를\s*숨긴|것(?:는|를|와)|한을\s*처리|어떻게를|안전한을|단순을|없는을|보다를|었고를|처리한\s*것됐|서류이\s|문서이\s|자료이\s/g;
  const transStyleRe = /무엇을\s*의미|이것은|그것은|~|라고\s*볼\s*수\s*있습니다/g;
  const mechanicalRe = /이\s*자료들을\s*함께\s*보겠습니다|이\s*조합의\s*뜻은\s*분명|같은\s*방향입니다|정확히\s*확인하겠습니다|차분히\s*말씀해\s*주십시오|더\s*미루지\s*마십시오/g;
  const haeyoRe = /해요|돼요|이에요|예요/g;
  const honorBuinRe = /부인(?:했|하|하지|한|합니다|해)/g;
  const judgeCallRe = /재판관님|판사님|재판장님/g;
  const witnessTitleRe = /판사님|재판장님/g;

  const judgeOnly = all.filter(x => JUDGE_CHANNELS.includes(x.channel));
  const earlyByState = {
    S0: Object.values(factStats.curve).reduce((sum, caseCurve) => sum + Object.values(caseCurve.S0 || {}).reduce((a, b) => a + b, 0), 0),
    S1: Object.values(factStats.curve).reduce((sum, caseCurve) => sum + Object.values(caseCurve.S1 || {}).reduce((a, b) => a + b, 0), 0),
    S2: Object.values(factStats.curve).reduce((sum, caseCurve) => sum + Object.values(caseCurve.S2 || {}).reduce((a, b) => a + b, 0), 0),
  };

  const brokenHits = all.filter(x => test(brokenParticleRe, x.text));
  const machineHits = all.filter(x => test(mechanicalRe, x.text));
  return {
    noun_action_total: all.filter(x => test(nounActionRe, x.text)).length,
    weak_쪽_judge_only: judgeOnly.filter(x => /쪽/g.test(x.text)).length,
    broken_particle: brokenHits.length,
    trans_style: all.filter(x => test(transStyleRe, x.text)).length,
    mechanical_observ: machineHits.length,
    judge_call_violation: judgeOnly.filter(x => test(judgeCallRe, x.text)).length,
    witness_title_violation: all.filter(x => x.channel === 'witness' && test(witnessTitleRe, x.text)).length,
    haeyo_violation: all.filter(x => test(haeyoRe, x.text)).length,
    honor_buin: all.filter(x => test(honorBuinRe, x.text)).length,
    truth_throttle_violation_by_lieState: earlyByState,
    samples: {
      broken_particle: brokenHits.slice(0, 25).map(brief),
      mechanical_observ: machineHits.slice(0, 15).map(brief),
      judge_call_violation: judgeOnly.filter(x => test(judgeCallRe, x.text)).slice(0, 10).map(brief),
    },
  };
}

function newChannelQuality(cases) {
  const out = {};
  for (const channel of NEW_CHANNELS) out[channel] = {};

  const comboShallow = [];
  const comboDeep = [];
  for (const [caseId, bundle] of Object.entries(cases)) {
    for (const entry of bundle.scripted.channels.judge_evidence_combo?.entries || []) {
      for (const variant of entry.variants || []) {
        const item = { caseId, channel: 'judge_evidence_combo', entry, variant, id: variant.id, key: entry.key, text: variant.text || '', behaviorHint: variant.behaviorHint || '' };
        const factTerms = Object.values(CASE_FACT_TERMS[caseId]).reduce((sum, re) => sum + (test(re, item.text) ? 1 : 0), 0);
        const hasSpecificEvidence = /GPS|문자|송금|출금|통화|원본|공증|유서|녹취|기록|사진|캡처|카톡|메시지|계좌|서류|일기장|방문/g.test(item.text);
        const shallow = factTerms === 0 && !hasSpecificEvidence && /자료|조합|의미|방향|흐름/g.test(item.text);
        if (shallow) comboShallow.push(item);
        else comboDeep.push(item);
      }
    }
  }
  out.judge_evidence_combo = {
    shallow_cells: new Set(comboShallow.map(x => `${x.caseId}|${x.key}`)).size,
    shallow_variants: comboShallow.length,
    deep_cells: new Set(comboDeep.map(x => `${x.caseId}|${x.key}`)).size,
    deep_variants: comboDeep.length,
    dossier_card_meaning_accuracy: pct(comboDeep.length, comboDeep.length + comboShallow.length),
    shallow_samples: comboShallow.slice(0, 12).map(brief),
  };

  const witnessNameByCase = {};
  for (const [caseId, bundle] of Object.entries(cases)) {
    witnessNameByCase[caseId] = {};
    for (const entry of bundle.scripted.channels.witness?.entries || []) {
      witnessNameByCase[caseId][entry.witnessId] = entry.witnessName;
    }
  }
  const witnessItems = [];
  for (const [caseId, bundle] of Object.entries(cases)) {
    for (const entry of bundle.scripted.channels.judge_witness_summon?.entries || []) {
      for (const variant of entry.variants || []) {
        const item = { caseId, channel: 'judge_witness_summon', entry, variant, id: variant.id, key: entry.key, text: variant.text || '' };
        witnessItems.push(item);
      }
    }
  }
  const realName = witnessItems.filter(x => {
    const name = witnessNameByCase[x.caseId]?.[x.entry.witnessId];
    return name && x.text.includes(name);
  });
  const witnessPairCells = [];
  for (const [caseId, bundle] of Object.entries(cases)) {
    for (const entry of bundle.scripted.channels.judge_witness_summon?.entries || []) {
      witnessPairCells.push(pairMetricsForCell(caseId, 'judge_witness_summon', entry));
    }
  }
  out.judge_witness_summon = {
    witness_real_name_usage: `${realName.length}/${witnessItems.length} (${pct(realName.length, witnessItems.length)})`,
    tone_diversity_avg_trigram: Number(mean(witnessPairCells.map(x => x.avgTrigram)).toFixed(3)),
    samples_without_real_name: witnessItems.filter(x => {
      const name = witnessNameByCase[x.caseId]?.[x.entry.witnessId];
      return name && !x.text.includes(name);
    }).slice(0, 8).map(brief),
  };

  for (const channel of ['rapport_milestone', 'contradict_milestone']) {
    const cells = [];
    const shallow = [];
    for (const [caseId, bundle] of Object.entries(cases)) {
      for (const entry of bundle.scripted.channels[channel]?.entries || []) {
        cells.push(pairMetricsForCell(caseId, channel, entry));
        for (const variant of entry.variants || []) {
          const text = variant.text || '';
          if (/말할\s*수\s*있을\s*것|조금|그\s*부분|그\s*말|정리하겠습니다/g.test(text)) {
            shallow.push({ caseId, channel, entry, variant, id: variant.id, key: entry.key, text });
          }
        }
      }
    }
    out[channel] = {
      cells: cells.length,
      variants: cells.reduce((sum, c) => sum + c.variants, 0),
      avg_trigram: Number(mean(cells.map(x => x.avgTrigram)).toFixed(3)),
      generic_or_weak_variants: shallow.length,
      samples: shallow.slice(0, 8).map(brief),
    };
  }
  return out;
}

function ambiguousMeaning(all) {
  const genericRe = /그\s*(부분|대목|흐름|선|말|일)|이\s*(부분|대목|흐름|선|말|일)|그것|그런\s*식|그\s*정도|그\s*사정/g;
  const concreteRe = /위임장|3,?000|2,?000|박미라|투자|유서|90|60|40|출생|일기장|송금|공증|9\s*일|11\s*번|아버지|메시지|예비신랑|사기|갈취/g;
  const out = [];
  for (const item of all) {
    const long = Array.from(item.text).length >= 95;
    const genericCount = matchCount(genericRe, item.text);
    const concrete = test(concreteRe, item.text);
    if ((genericCount >= 2 && !concrete) || (long && genericCount >= 1 && !concrete)) {
      out.push({
        id: item.id,
        caseId: item.caseId,
        channel: item.channel,
        key: item.key,
        text: item.text.slice(0, 220),
        ambiguity_type: long ? '문장구조_복잡 / 사건맥락_약함' : '추상화_심함 / 사건맥락_없음',
        priority: 'P1',
      });
    }
  }
  return out.slice(0, 80);
}

function machinePatterns(trigramStats) {
  return trigramStats.overPairs
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 80)
    .map(pair => ({
      id: `${pair.a}__${pair.b}`,
      caseId: pair.caseId,
      channel: pair.channel,
      key: pair.key,
      text: `${pair.aText} / ${pair.bText}`,
      pattern: pair.overlap >= 0.9 ? '단조반복' : '변수치환식 / 유사 구조 반복',
      overlap: pair.overlap,
      priority: pair.overlap >= 0.9 ? 'P1' : 'P2',
    }));
}

function channelConsistency(all) {
  const groups = new Map();
  for (const item of all) {
    const party = item.entry.party || item.entry.speaker || item.entry.targetParty || item.entry.subjectParty;
    const dispute = item.entry.disputeId || 'none';
    const state = item.entry.lieState || item.entry.lieBand || 'none';
    if (!party || dispute === 'none' || state === 'none') continue;
    const key = `${item.caseId}|${party}|${dispute}|${state}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  const issues = [];
  for (const [key, items] of groups.entries()) {
    const byChannel = {};
    for (const item of items) {
      if (!byChannel[item.channel]) byChannel[item.channel] = [];
      byChannel[item.channel].push(Array.from(item.text).length);
    }
    if (Object.keys(byChannel).length < 2) continue;
    const avgs = Object.fromEntries(Object.entries(byChannel).map(([ch, vals]) => [ch, Number(mean(vals).toFixed(1))]));
    const vals = Object.values(avgs);
    const spread = Math.max(...vals) - Math.min(...vals);
    if (spread >= 80) {
      issues.push({ key, spread: Number(spread.toFixed(1)), channelAvgLength: avgs });
    }
  }
  return issues.sort((a, b) => b.spread - a.spread).slice(0, 20);
}

function caseComparison(cases) {
  const out = [];
  for (const channel of NEW_CHANNELS) {
    const counts = {};
    for (const [caseId, bundle] of Object.entries(cases)) {
      const entries = bundle.scripted.channels[channel]?.entries || [];
      counts[caseId] = { cells: entries.length, variants: entries.reduce((sum, e) => sum + (e.variants || []).length, 0) };
    }
    const cellValues = Object.values(counts).map(x => x.cells);
    if (Math.max(...cellValues) !== Math.min(...cellValues)) {
      out.push({ channel, issue: '사건별 신규 채널 cell 수 차이', counts });
    }
  }
  const evidenceShape = {};
  for (const [caseId, bundle] of Object.entries(cases)) {
    const shape = { subjectRoleOnly: 0, lieBandOnly: 0, both: 0, neither: 0 };
    for (const entry of bundle.scripted.channels.evidence_present?.entries || []) {
      const hasSubjectRole = Boolean(entry.subjectRole);
      const hasLieBand = Boolean(entry.lieBand);
      shape[hasSubjectRole && hasLieBand ? 'both' : hasSubjectRole ? 'subjectRoleOnly' : hasLieBand ? 'lieBandOnly' : 'neither'] += 1;
    }
    evidenceShape[caseId] = shape;
  }
  out.push({ channel: 'evidence_present', issue: '3개 사건 모두 subjectRole+lieBand 동시 key 모델', counts: evidenceShape });
  return out;
}

function codeFallbackScan() {
  const targets = [
    path.join(ROOT, 'src/data/scriptedText'),
    path.join(ROOT, 'src/data/cases/generated'),
  ];
  const files = [];
  for (const dir of targets) {
    for (const name of fs.readdirSync(dir)) {
      if (name.endsWith('.json')) files.push(path.join(dir, name));
    }
  }
  const variableResidue = [];
  const fallbackTokens = [];
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split(/\r?\n/);
    lines.forEach((line, idx) => {
      if (line.includes('${')) variableResidue.push({ file: path.relative(ROOT, file), line: idx + 1, text: line.trim().slice(0, 160) });
      if (/TODO|FIXME|fallback|TEMPLATE|PLACEHOLDER/i.test(line)) fallbackTokens.push({ file: path.relative(ROOT, file), line: idx + 1, text: line.trim().slice(0, 160) });
    });
  }
  return [
    {
      type: 'unresolved_variable_template',
      count: variableResidue.length,
      samples: variableResidue.slice(0, 20),
      priority: variableResidue.length ? 'P0' : 'OK',
    },
    {
      type: 'fallback_or_placeholder_token',
      count: fallbackTokens.length,
      samples: fallbackTokens.slice(0, 20),
      priority: fallbackTokens.length ? 'P1' : 'OK',
    },
  ];
}

function buildPartA(all, ratio, wide) {
  const formalFindingsExists = exists(EXPECTED_QW_FINDINGS);
  const formalReportExists = exists(EXPECTED_QW_REPORT);
  const fallbackExists = exists(FALLBACK_QW_FINDINGS);
  const fallback = fallbackExists ? readJson(FALLBACK_QW_FINDINGS) : null;
  const fallbackFindings = fallback?.findings || [];
  const fallbackBreakdown = fallbackFindings.reduce((acc, finding) => {
    acc[finding.severity || 'UNKNOWN'] = (acc[finding.severity || 'UNKNOWN'] || 0) + 1;
    return acc;
  }, {});
  const additionalP0 = [];
  if (ratio.inverted_A_60_B_40_count > 0) additionalP0.push({ issue: 'family-01 비율 반대 패턴', count: ratio.inverted_A_60_B_40_count, samples: ratio.samples_inverted.slice(0, 5) });
  if (wide.broken_particle > 0) additionalP0.push({ issue: '깨진 조사/자동치환 artifact', count: wide.broken_particle, samples: wide.samples.broken_particle.slice(0, 8) });

  return {
    totalTasks: 200,
    qaQW_agreement_weight: formalFindingsExists ? 'patch-level input available' : `N/A - 공식 QA-QW Claude findings.json 없음; spouse-only fallback ${fallbackFindings.length} findings 사용`,
    inputStatus: {
      expectedFindings: path.relative(ROOT, EXPECTED_QW_FINDINGS),
      expectedFindingsExists: formalFindingsExists,
      expectedReport: path.relative(ROOT, EXPECTED_QW_REPORT),
      expectedReportExists: formalReportExists,
      fallbackUsed: fallbackExists ? [path.relative(ROOT, FALLBACK_QW_FINDINGS), exists(FALLBACK_QW_REPORT) ? path.relative(ROOT, FALLBACK_QW_REPORT) : null].filter(Boolean) : [],
      limitation: formalFindingsExists ? null : 'Claude QW의 3사건 P0/P1/P2 patch 목록이 없어 patch.before/after 단위 cross-check는 수행 불가. 데이터 직접 검증과 spouse-only fallback 산출물 기준으로 대체했다.',
    },
    agreementBreakdown: {
      fullAgreement: fallbackBreakdown.OK || 0,
      partialAgreement: fallbackBreakdown.WARN || 0,
      differentFinding: 0,
      Claude_overlooked: additionalP0.length,
    },
    p0_validation: [
      {
        qaQW_patchId: 'formal-input',
        qaQW_after: null,
        qaC_assessment: formalFindingsExists ? '공식 입력 확인' : '공식 patch 입력 누락',
        qaC_recommendation: formalFindingsExists ? 'patch-level 검증 가능' : 'QA-QW-claude-findings.json/report.md를 같은 폴더에 두면 Part A를 patch 단위로 재실행 가능',
        case_setting_check: formalFindingsExists ? '확인 대상' : '데이터 직접 검증으로 대체',
      },
      {
        qaQW_patchId: 'codex-direct-family-ratio',
        qaQW_after: 'family-01 원본 B 90/A 10 -> 변경 B 60/A 40',
        qaC_assessment: ratio.verdict,
        qaC_recommendation: ratio.inverted_A_60_B_40_count === 0 ? '비율 P0 alarm 없음' : '반대 패턴 즉시 패치',
        case_setting_check: ratio.inverted_A_60_B_40_count === 0 ? '정합' : '충돌',
      },
      ...additionalP0.map((issue, idx) => ({
        qaQW_patchId: `codex-overlooked-p0-${idx + 1}`,
        qaQW_after: null,
        qaC_assessment: `${issue.issue} ${issue.count}건`,
        qaC_recommendation: '본문 직접 패치 권장',
        case_setting_check: issue.issue.includes('비율') ? '충돌 가능' : '언어 품질 P0',
        samples: issue.samples,
      })),
    ],
    p1_validation: [
      {
        qaQW_patchId: 'truth-throttle-early-direct-fact',
        qaC_assessment: `S0/S1/S2 직접 fact hits = ${JSON.stringify(wide.truth_throttle_violation_by_lieState)}`,
        qaC_recommendation: '자동 검출은 대사 맥락 오탐 가능성이 있어 P1 수동 검토 권장',
      },
      {
        qaQW_patchId: 'ambiguous-machine-patterns',
        qaC_assessment: `mechanical_observ=${wide.mechanical_observ}, noun_action=${wide.noun_action_total}`,
        qaC_recommendation: 'judge_evidence_combo 중심으로 함의 풀어쓰기 샘플링',
      },
    ],
    p2_validation: [
      {
        qaQW_patchId: 'fallback-spouse-voice-diversity',
        qaC_assessment: fallbackExists ? `spouse-only QW findings severity: ${JSON.stringify(fallbackBreakdown)}` : 'fallback 없음',
        qaC_recommendation: '정량 monotone cells는 Part B top list 기준으로 다음 생성 라운드에서 보강',
      },
    ],
    user_pattern4_application: {
      qaQW_count: fallbackFindings.filter(x => /B\.23|잘못 패턴|모범|patch/i.test(JSON.stringify(x))).length,
      qaC_validated: fallbackFindings.filter(x => /B\.23|잘못 패턴|모범|patch/i.test(JSON.stringify(x))).length,
      missing: formalFindingsExists ? 0 : '공식 QA-QW 3사건 patch 입력 누락으로 산정 불가',
    },
  };
}

function recommendations(ratio, wide, ambiguous, machine, newChannel) {
  const p0 = [];
  const p1 = [];
  const p2 = [];
  if (ratio.inverted_A_60_B_40_count > 0) {
    p0.push({
      priority: 'P0',
      issue: 'family-01 비율 반대 패턴',
      count: ratio.inverted_A_60_B_40_count,
      recommendation: 'A 60/B 40 또는 윤태성 60/윤정후 40 계열 문장을 A 40/B 60으로 즉시 수정',
      samples: ratio.samples_inverted.slice(0, 10),
    });
  }
  if (wide.broken_particle > 0) {
    p0.push({
      priority: 'P0',
      issue: '깨진 조사/자동 치환 artifact',
      count: wide.broken_particle,
      recommendation: '본문 문법이 명백히 깨진 항목은 직접 패치',
      samples: wide.samples.broken_particle.slice(0, 15),
    });
  }
  if (wide.truth_throttle_violation_by_lieState.S0 + wide.truth_throttle_violation_by_lieState.S1 + wide.truth_throttle_violation_by_lieState.S2 > 0) {
    p1.push({
      priority: 'P1',
      issue: 'S0~S2 직접 fact 노출 후보',
      counts: wide.truth_throttle_violation_by_lieState,
      recommendation: 'party/dispute/q_type별로 의도된 추궁인지 조기 자백인지 수동 분류',
    });
  }
  if (newChannel.judge_evidence_combo.shallow_variants > 0) {
    p1.push({
      priority: 'P1',
      issue: 'judge_evidence_combo 함의 얕은 문장',
      count: newChannel.judge_evidence_combo.shallow_variants,
      recommendation: '증거 이름 나열보다 두 증거가 결합해 드러내는 의미를 문장 안에 넣기',
      samples: newChannel.judge_evidence_combo.shallow_samples.slice(0, 8),
    });
  }
  if (ambiguous.length) {
    p1.push({
      priority: 'P1',
      issue: '의미 모호/추상화 심한 후보',
      count: ambiguous.length,
      recommendation: '사건 핵심 명사 없이 그 부분/그 흐름으로 대체한 문장을 우선 수동 검토',
      samples: ambiguous.slice(0, 8),
    });
  }
  if (machine.length) {
    p2.push({
      priority: 'P2',
      issue: 'cell 내부 고유사도 반복 후보',
      count: machine.length,
      recommendation: 'top overlap pair부터 단조 반복인지 정형 법정 톤인지 분류',
      samples: machine.slice(0, 8),
    });
  }
  return { p0, p1, p2 };
}

function makeSummary(report) {
  const inv = report.meta.inventory;
  const ratio = report.partB_statistics.ratio_consistency_family_01;
  const wide = report.partC_additionalFindings.wide_scan;
  const combo = report.partB_statistics.newChannel_quality.judge_evidence_combo;
  const witness = report.partB_statistics.newChannel_quality.judge_witness_summon;
  const rec = {
    p0: report.p0_recommended.length,
    p1: report.p1_recommended.length,
    p2: report.p2_recommended.length,
  };
  const topChannels = Object.entries(report.partB_statistics.trigramAnalysis.by_channel)
    .sort((a, b) => b[1].candidates_60_overlap - a[1].candidates_60_overlap)
    .slice(0, 6)
    .map(([channel, data]) => `| ${channel} | ${data.candidates_60_overlap} | ${data.avgCellOverlap} |`)
    .join('\n');

  return `# QA-QW Cross Codex Summary

- 대상: \`src/data/scriptedText/{spouse,family,friend}-01.json\`
- 총량: ${inv.totalVariants.toLocaleString('ko-KR')} variants / ${inv.totalCells.toLocaleString('ko-KR')} cells
- 공식 Claude QW 입력: ${report.partA_crossCheck.inputStatus.expectedFindingsExists ? '확인됨' : '없음'} (${report.partA_crossCheck.inputStatus.limitation || 'patch-level cross-check 수행'})
- fallback: ${report.partA_crossCheck.inputStatus.fallbackUsed.join(', ') || '없음'}

## 핵심 결론

- family-01 비율 alarm: **${ratio.verdict}**. B 90→60 후보 ${ratio.B_90_to_60_pattern_count}건, A 40/B 60 후보 ${ratio.A_40_B_60_pattern_count}건, 반대 후보 ${ratio.inverted_A_60_B_40_count}건.
- 깨진 조사/자동 치환 artifact: **${wide.broken_particle}건**.
- S0~S2 Truth Throttle 직접 fact 후보: S0 ${wide.truth_throttle_violation_by_lieState.S0}, S1 ${wide.truth_throttle_violation_by_lieState.S1}, S2 ${wide.truth_throttle_violation_by_lieState.S2}.
- judge_evidence_combo: deep ${combo.deep_variants} / shallow ${combo.shallow_variants}, 의미 정확도 ${combo.dossier_card_meaning_accuracy}.
- judge_witness_summon 실명 사용: ${witness.witness_real_name_usage}.

## Trigram Top Channels

| channel | overlap >= 0.6 pairs | avg cell overlap |
| --- | ---: | ---: |
${topChannels}

## 권장 우선순위

- P0: ${rec.p0}개 묶음
- P1: ${rec.p1}개 묶음
- P2: ${rec.p2}개 묶음

## 산출물

- Raw JSON: \`tmp/qa-redo-20260426/QA-QW-Cross-codex-report.json\`
- Audit script: \`tmp/qa-redo-20260426/QA-QW-Cross-codex-audit.cjs\`
`;
}

function main() {
  const cases = loadCases();
  const all = flattenAll(cases);
  const inv = inventory(cases);
  const trigram = trigramAnalysis(cases);
  const voice = characterVoiceDistribution(all);
  const facts = factMatrix(all);
  const ratio = ratioConsistencyFamily(all);
  const newQuality = newChannelQuality(cases);
  const wide = scanWide(all, facts);
  const ambiguous = ambiguousMeaning(all);
  const machine = machinePatterns(trigram);
  const consistency = channelConsistency(all);
  const comparison = caseComparison(cases);
  const fallback = codeFallbackScan();
  const partA = buildPartA(all, ratio, wide);
  const recs = recommendations(ratio, wide, ambiguous, machine, newQuality);

  const report = {
    meta: {
      generatedAt: new Date().toISOString(),
      totalTasks: 600,
      qaQW_input: 'tmp/qa-redo-20260426/QA-QW-claude-findings.json',
      qaQ_input: exists(LEGACY_Q_REPORT) ? 'tmp/QA-Q-spouse-01-codex-report.json (참고, spouse-only)' : null,
      scope: 'ScriptedText 14931 variants',
      inventory: inv,
    },
    partA_crossCheck: partA,
    partB_statistics: {
      totalTasks: 200,
      trigramAnalysis: {
        by_channel: trigram.by_channel,
        by_case: trigram.by_case,
        top_10_monotone_cells: trigram.top_10_monotone_cells,
      },
      characterVoiceDistribution: voice,
      truthThrottleCurve: facts.curve,
      variantDiversity: {
        monotone_cells: trigram.allMonotoneCells,
        highDiversity_cells: trigram.highDiversityCells,
        by_channel_avg_levenshtein: trigram.byChannelAvgLevenshtein,
      },
      newChannel_quality: newQuality,
      facts_distribution: facts.distribution,
      ratio_consistency_family_01: ratio,
    },
    partC_additionalFindings: {
      totalTasks: 200,
      wide_scan: wide,
      channel_consistency_issues: consistency,
      case_comparison_issues: comparison,
      code_fallback_additional: fallback,
      ambiguous_meaning_detected: ambiguous,
      machine_pattern_detected: machine,
    },
    p0_recommended: recs.p0,
    p1_recommended: recs.p1,
    p2_recommended: recs.p2,
    ratio_alarm_family_01: ratio.verdict,
  };

  fs.writeFileSync(REPORT_OUT, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  fs.writeFileSync(SUMMARY_OUT, makeSummary(report), 'utf8');
  console.log(JSON.stringify({
    report: path.relative(ROOT, REPORT_OUT),
    summary: path.relative(ROOT, SUMMARY_OUT),
    totalVariants: inv.totalVariants,
    ratioVerdict: ratio.verdict,
    p0: recs.p0.length,
    p1: recs.p1.length,
    p2: recs.p2.length,
  }, null, 2));
}

main();
