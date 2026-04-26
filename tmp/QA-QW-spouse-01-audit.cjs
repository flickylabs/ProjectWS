// QA-QW comprehensive audit script for spouse-01 ScriptedText
// QW = qualitative deep verification (Thread-QW)

const fs = require('fs');
const ROOT = 'd:/ProjectWS';

const text = JSON.parse(fs.readFileSync(`${ROOT}/src/data/scriptedText/spouse-01.json`, 'utf8'));
const caseDef = JSON.parse(fs.readFileSync(`${ROOT}/src/data/cases/generated/spouse-01.json`, 'utf8'));

const out = {
  meta: { generatedAt: new Date().toISOString(), caseId: 'spouse-01' },
  channelCounts: {},
  variantTotals: {},
  findings: [],
};

let totalVariants = 0;
for (const [name, ch] of Object.entries(text.channels)) {
  out.channelCounts[name] = ch.entries.length;
  let v = 0;
  for (const e of ch.entries) v += (e.variants || []).length;
  out.variantTotals[name] = v;
  totalVariants += v;
}
out.variantTotals._total = totalVariants;

function findVariant(channelName, key, vId) {
  const e = text.channels[channelName].entries.find((x) => x.key === key);
  if (!e) return null;
  const v = vId ? e.variants.find((x) => x.id === vId) : e.variants[0];
  return v ? { entry: e, variant: v } : null;
}

function entriesByPredicate(channelName, pred) {
  return text.channels[channelName].entries.filter(pred);
}

function add(section, severity, title, detail) {
  out.findings.push({ section, severity, title, detail });
}

function trigramOverlap(a, b) {
  const tri = (s) => {
    const set = new Set();
    const t = s.replace(/\s+/g, '');
    for (let i = 0; i < t.length - 2; i++) set.add(t.slice(i, i + 3));
    return set;
  };
  const A = tri(a), B = tri(b);
  if (A.size === 0 || B.size === 0) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / Math.min(A.size, B.size);
}

// ============ Section A: 9차원 매핑 정합성 ============

// A.1: interrogation S0~S2 (party=a, disputeId=d-1) — Truth Throttle
{
  const target = entriesByPredicate('interrogation',
    (e) => e.party === 'a' && e.disputeId === 'd-1' && ['S0','S1','S2'].includes(e.lieState));
  const sample = [];
  for (const e of target) for (const v of e.variants) sample.push({ key: e.key, id: v.id, text: v.text });
  // Truth Throttle: A in S0/S1 should NOT use 위임장/3000만/2000만 (concrete amounts) directly
  const forbiddenS0S1 = /(위임장|3,?000\s*만\s*원|3000만원|2,?000\s*만\s*원|2000만원)/g;
  const forbiddenS2 = /(위임장|3,?000\s*만\s*원|3000만원|2,?000\s*만\s*원|2000만원)/g;
  const violations = [];
  for (const s of sample) {
    const isS2 = /\|S2\|/.test(s.id);
    const re = isS2 ? forbiddenS2 : forbiddenS0S1;
    const m = s.text.match(re);
    if (m) violations.push({ id: s.id, key: s.key, hits: [...new Set(m)], textSnippet: s.text.slice(0, 200) });
  }
  add('A.1', violations.length ? 'WARN' : 'OK',
    `interrogation a/d-1/S0~S2 Truth Throttle (${sample.length} variants)`,
    violations.length ? violations : '직접 단어 위반 없음');
  out.A1_sample = sample.slice(0, 3);
}

// A.2: interrogation S3~S5 (party=b, disputeId=d-2) — 자백 줄기
{
  const target = entriesByPredicate('interrogation',
    (e) => e.party === 'b' && e.disputeId === 'd-2' && ['S3','S4','S5'].includes(e.lieState));
  const sample = [];
  for (const e of target) for (const v of e.variants.slice(0, 3)) sample.push({ key: e.key, id: v.id, text: v.text, state: e.lieState });
  const expectedS5 = /(인정|솔직히|사실은|숨겼|숨긴|미안|2,?000\s*만|이천\s*만|털어|할\s*말이\s*없|잘못했|건넸|뽑아|허탈|지칩니다|화낼|망가졌)/;
  const failures = [];
  for (const s of sample) {
    if (s.state === 'S5' && !expectedS5.test(s.text)) {
      failures.push({ id: s.id, snippet: s.text.slice(0, 200) });
    }
  }
  add('A.2', failures.length ? 'WARN' : 'OK',
    `interrogation b/d-2/S3~S5 자백 줄기 (${sample.length} samples)`,
    failures.length ? { failures, total: sample.length } : `S5 자백 단어 OK`);
  out.A2_sample = sample.slice(0, 5);
}

// A.3: interrogation v6~v10 다양성
{
  const probe = ['a|d-1|S1','b|d-1|S1','a|d-2|S1','b|h-d3|S1','a|h-d4|S1','b|h-d4|S1'];
  const dupReports = [];
  const variantCounts = {};
  for (const k of probe) {
    const e = text.channels.interrogation.entries.find(x=>x.key===k);
    if (!e) { variantCounts[k] = 'NOT_FOUND'; continue; }
    variantCounts[k] = e.variants.length;
    if (e.variants.length < 6) continue;
    for (let i = 5; i < e.variants.length; i++) {
      const newV = e.variants[i];
      let maxOverlap = 0, mostSim = null;
      for (let j = 0; j < 5; j++) {
        const oldV = e.variants[j];
        const ov = trigramOverlap(newV.text, oldV.text);
        if (ov > maxOverlap) { maxOverlap = ov; mostSim = oldV; }
      }
      if (maxOverlap > 0.6) {
        dupReports.push({ key: k, newId: newV.id, oldId: mostSim.id, overlap: maxOverlap.toFixed(2),
          newSnip: newV.text.slice(0, 100), oldSnip: mostSim.text.slice(0, 100) });
      }
    }
  }
  out.A3_variantCounts = variantCounts;
  add('A.3', dupReports.length ? 'WARN' : 'OK',
    'interrogation v6~v10 다양성 (S1 신규)',
    dupReports.length ? dupReports : `v1~v5 vs v6~v10 trigram-overlap < 0.6 모두 통과 (검사 cells: ${probe.length})`);
}

// A.4: evidence_present 두 키 패턴 분포
{
  const subj = text.channels.evidence_present.entries.filter(e => e.subjectRole && !e.lieBand);
  const stage = text.channels.evidence_present.entries.filter(e => e.lieBand && !e.subjectRole);
  const both = text.channels.evidence_present.entries.filter(e => e.subjectRole && e.lieBand);
  const neither = text.channels.evidence_present.entries.filter(e => !e.subjectRole && !e.lieBand);
  out.A4_breakdown = {
    subjectRole_only: subj.length, lieBand_only: stage.length, both: both.length, neither: neither.length,
    total: text.channels.evidence_present.entries.length,
  };
  // Sample subj entry
  out.A4_subj_sample = subj.slice(0, 3).map(e => ({
    key: e.key, party: e.party, evidenceId: e.evidenceId, subjectRole: e.subjectRole,
    first: e.variants[0]?.text?.slice(0, 120),
  }));
  add('A.4', 'INFO', 'evidence_present 기존 subjectRole cells 보존', out.A4_breakdown);
}

// A.5: evidence_present 신규 stage cells
{
  const stage = text.channels.evidence_present.entries.filter(e => e.lieBand);
  const lieBands = [...new Set(stage.map(e => e.lieBand))];
  const sample = stage.slice(0, 6).map(e => ({
    key: e.key, party: e.party, evidenceId: e.evidenceId, lieBand: e.lieBand,
    extraKeys: Object.keys(e).filter(k => !['key','party','evidenceId','lieBand','variants','stanceHint','truthLevel','subjectRole'].includes(k)),
    first: e.variants[0]?.text?.slice(0, 120),
  }));
  // Check 7 evidence × 2 parties × 3 lieBand = 42... but text says 126?
  // 126 = 7 evidence × 2 parties × 3 lieBand × 3 stages? Verify
  out.A5_count = stage.length;
  out.A5_lieBands = lieBands;
  out.A5_sample = sample;
  add('A.5', 'INFO', `evidence_present stage cells: ${stage.length} (lieBand 차원)`, { lieBands, sample });
}

// A.6: dossier 24 cells
{
  const dossier = text.channels.dossier.entries;
  const byCard = {};
  for (const e of dossier) {
    const card = e.dossierCardId;
    if (!byCard[card]) byCard[card] = { total: 0, byBand: {}, byQuestion: {} };
    byCard[card].total++;
    byCard[card].byBand[e.lieBand] = (byCard[card].byBand[e.lieBand] || 0) + 1;
    byCard[card].byQuestion[e.questionId] = (byCard[card].byQuestion[e.questionId] || 0) + 1;
  }
  out.A6_byCard = byCard;
  // dc-1.b.q1 early vs late differentiation
  const early = findVariant('dossier', 'dc-1.b.q1|early');
  const late = findVariant('dossier', 'dc-1.b.q1|late');
  if (early && late) {
    const overlap = trigramOverlap(early.variant.text, late.variant.text);
    out.A6_dc1bq1 = {
      early: early.variant.text,
      late: late.variant.text,
      overlap: overlap.toFixed(2),
    };
    add('A.6', overlap > 0.5 ? 'WARN' : 'OK',
      `dossier dc-1.b.q1 early vs late 차이 (overlap ${overlap.toFixed(2)})`,
      out.A6_dc1bq1);
  }
}

// A.7: witness 9 cells / w-3 박미라 hiddenAgenda
{
  const witnessEntries = text.channels.witness.entries;
  const wReport = witnessEntries.map(e => ({
    key: e.key, witnessId: e.witnessId, witnessName: e.witnessName, depth: e.depth,
    variantCount: e.variants.length,
    first: e.variants[0]?.text?.slice(0, 120),
  }));
  out.A7_witnesses = wReport;
  // w-3 박미라: should not mention 오피스텔
  const w3Cells = witnessEntries.filter(e => e.witnessId === 'w-3');
  const w3Violations = [];
  for (const e of w3Cells) {
    for (const v of e.variants) {
      if (/오피스텔/.test(v.text)) {
        w3Violations.push({ id: v.id, key: e.key, snippet: v.text.slice(0, 200) });
      }
    }
  }
  add('A.7', w3Violations.length ? 'WARN' : 'OK',
    'w-3 박미라 hiddenAgenda — 오피스텔 무관',
    w3Violations.length ? w3Violations : `w-3 ${w3Cells.length} cells × ${w3Cells[0]?.variants.length || 0}v 모두 "오피스텔" 미언급`);
}

// A.8: contradiction_pursuit h-d3/h-d4 신규
{
  const cp = text.channels.contradiction_pursuit.entries.filter(e => ['h-d3','h-d4'].includes(e.disputeId));
  out.A8_count = cp.length;
  out.A8_sample = cp.slice(0, 6).map(e => ({
    key: e.key, party: e.party, disputeId: e.disputeId, lieState: e.lieState,
    variantCount: e.variants.length,
    first: e.variants[0]?.text?.slice(0, 150),
  }));
  add('A.8', 'INFO', `contradiction_pursuit h-d3/h-d4 (${cp.length} cells)`, out.A8_sample);
}

// A.9: interjection / emotional_overload h-d3/h-d4
{
  const inj = text.channels.interjection.entries.filter(e => ['h-d3','h-d4'].includes(e.disputeId));
  const ovl = text.channels.emotional_overload.entries.filter(e => ['h-d3','h-d4'].includes(e.disputeId));
  out.A9_inj = inj.map(e => ({ key: e.key, party: e.party, sev: e.severity, first: e.variants[0]?.text?.slice(0, 150) }));
  out.A9_ovl = ovl.map(e => ({ key: e.key, party: e.party, first: e.variants[0]?.text?.slice(0, 150) }));
  add('A.9', 'INFO', `interjection ${inj.length} / emotional_overload ${ovl.length} cells (h-d3/h-d4)`,
    { interjection: out.A9_inj, overload: out.A9_ovl });
}

// A.10: trust_action / mediation
{
  const ta = text.channels.trust_action.entries;
  const med = text.channels.mediation.entries;
  out.A10_trust_count = ta.length;
  out.A10_med_count = med.length;
  out.A10_trust_sample = ta.slice(0, 4).map(e => ({
    key: e.key, party: e.party, type: e.actionType, state: e.lieState,
    first: e.variants[0]?.text?.slice(0, 120),
  }));
  out.A10_med_all = med.map(e => ({
    key: e.key, path: e.path, speaker: e.speaker,
    variantCount: e.variants.length,
    first: e.variants[0]?.text?.slice(0, 150),
  }));
  add('A.10', 'INFO', `trust_action ${ta.length} / mediation ${med.length}`,
    { trust_sample: out.A10_trust_sample, mediation: out.A10_med_all });
}

// ============ Section B: 신규 4 채널 ============

const dossierCardLabels = {
  'dc-1': '오피스텔의 사람들',
  'dc-2': '시댁 얘기만 나오면 싸움',
  'dc-3': '3,000만 원의 권한',
  'dc-4': '2,000만 원의 수치',
  'dc-5': '5,000만 원의 순서',
};
const witnessNames = { 'w-1': '오피스텔 경비', 'w-2': '편의점 직원', 'w-3': '박미라' };

// B.11~13: judge_evidence_combo
{
  const ec = text.channels.judge_evidence_combo.entries;
  const tones = {};
  const dossierIds = {};
  for (const e of ec) {
    tones[e.tone] = (tones[e.tone] || 0) + 1;
    dossierIds[e.dossierCardId] = (dossierIds[e.dossierCardId] || 0) + 1;
  }
  // Sample: dc-1.b.q1 soft/mid/hard
  const samples = {};
  for (const card of Object.keys(dossierCardLabels)) {
    const cardEntries = ec.filter(e => e.dossierCardId === card);
    samples[card] = {};
    for (const tone of ['soft','mid','hard']) {
      const e = cardEntries.find(x => x.tone === tone);
      if (e) samples[card][tone] = { key: e.key, first: e.variants[0]?.text?.slice(0, 200) };
    }
  }
  out.B11_combo = { count: ec.length, tones, dossierIds, samples };
  add('B.11-13', 'INFO',
    `judge_evidence_combo ${ec.length} entries / tones ${JSON.stringify(tones)} / dossier ${JSON.stringify(dossierIds)}`,
    samples);
}

// B.14~16: judge_witness_summon
{
  const ws = text.channels.judge_witness_summon.entries;
  const issues = [];
  const samples = {};
  for (const wid of Object.keys(witnessNames)) {
    const wEntries = ws.filter(e => e.witnessId === wid);
    samples[wid] = {};
    for (const tone of ['soft','mid','hard']) {
      const e = wEntries.find(x => x.tone === tone);
      if (e) samples[wid][tone] = { key: e.key, first: e.variants[0]?.text?.slice(0, 200) };
    }
  }
  for (const e of ws) {
    for (const v of e.variants) {
      if (e.witnessId === 'w-3' && /오피스텔/.test(v.text)) {
        issues.push({ id: v.id, key: e.key, violation: 'w-3 mentions 오피스텔', text: v.text.slice(0, 200) });
      }
    }
  }
  out.B14_summon = { count: ws.length, samples };
  add('B.14-16', issues.length ? 'WARN' : 'OK',
    `judge_witness_summon ${ws.length} entries`,
    issues.length ? issues : { samples, note: 'w-3 박미라 오피스텔 미언급' });
}

// B.17~19: rapport_milestone
{
  const rm = text.channels.rapport_milestone.entries;
  const out_rm = {};
  for (const e of rm) {
    if (!out_rm[e.party]) out_rm[e.party] = [];
    out_rm[e.party].push({
      threshold: e.threshold,
      variantCount: e.variants.length,
      first: e.variants[0]?.text?.slice(0, 150),
    });
  }
  out.B17_rapport = out_rm;
  add('B.17-19', 'INFO', `rapport_milestone ${rm.length} entries (party A: ${(out_rm.a||[]).length}, B: ${(out_rm.b||[]).length})`, out_rm);
}

// B.20~22: contradict_milestone
{
  const cm = text.channels.contradict_milestone.entries;
  out.B20_contradict = cm.map(e => ({
    key: e.key, party: e.party, count: e.token_count,
    variantCount: e.variants.length,
    first: e.variants[0]?.text?.slice(0, 150),
  }));
  add('B.20-22', 'INFO', `contradict_milestone ${cm.length} entries`, out.B20_contradict);
}

// B.23~25: 4 채널 잘못 패턴 #6
{
  const channels = ['judge_evidence_combo','judge_witness_summon','rapport_milestone','contradict_milestone'];
  const weakPatterns = [
    { name: 'tag_같다', re: /것\s*같(?:다|습니다|아요|아|다고|다는)/g },
    { name: '부분있다', re: /부분\s*이?\s*(?:있|입)/g },
    { name: '측면있다', re: /측면\s*이?\s*(?:있|입)/g },
    { name: '관찰됩니다', re: /(?:확인|관찰|감지)됩니다/g },
    { name: '것으로보입', re: /것으로\s*(?:보입|생각됩|판단됩|사료됩)/g },
    { name: '나타납니다', re: /나타납니다/g },
    { name: '부득이', re: /부득이/g },
  ];
  const issues = [];
  for (const ch of channels) {
    for (const e of text.channels[ch].entries) {
      for (const v of e.variants) {
        for (const p of weakPatterns) {
          const m = v.text.match(p.re);
          if (m) {
            issues.push({ channel: ch, pattern: p.name, id: v.id, key: e.key, hits: [...new Set(m)], snippet: v.text.slice(0, 200) });
          }
        }
      }
    }
  }
  out.B23_weakPattern = issues;
  add('B.23-25', issues.length ? 'WARN' : 'OK',
    `4 채널 잘못 패턴 #6 (${issues.length}건)`,
    issues.slice(0, 20));
}

// ============ Section C: 캐릭터 voice ============

const victimMarkers = [
  { name: 'victim_frame', re: /(?:배신|상처|버림|혼자|두려|불안|무서|울었|울고|버려|버림받|상처받)/ },
  { name: 'helplessness', re: /(?:어쩔\s*수\s*없|선택의\s*여지|다른\s*방법|할\s*수\s*있는\s*게|어떻게\s*해|뭘\s*어떻게)/ },
  { name: 'soft_confession', re: /(?:인정합니다|솔직히|사실은|미안합니다|죄송)/ },
];
const avoidantMarkers = [
  { name: 'answer_delay', re: /(?:잠시만|음+|어+|글쎄|잠깐|곧|나중에|좀\s*있다|한\s*박자)/ },
  { name: 'partial_scope', re: /(?:일부|어느\s*정도|그\s*정도|그\s*부분|그\s*만큼|선까지)/ },
  { name: 'minimize_harm', re: /(?:선의|좋은\s*뜻|돕고\s*싶|도와주고\s*싶|챙기려|걱정|챙겨)/ },
];

// C.26~30: 박지연
{
  const checks = ['interrogation','evidence_present','dossier','contradiction_pursuit','aftermath'];
  const c_findings = [];
  for (const ch of checks) {
    let aEntries;
    if (ch === 'aftermath') aEntries = text.channels[ch].entries; // narrator
    else if (ch === 'dossier') aEntries = text.channels[ch].entries.filter(e => e.targetParty === 'a');
    else aEntries = text.channels[ch].entries.filter(e => e.party === 'a');
    if (!aEntries.length) continue;
    let total = 0;
    const markerHits = {};
    for (const m of victimMarkers) markerHits[m.name] = 0;
    for (const e of aEntries) for (const v of e.variants) {
      total++;
      for (const m of victimMarkers) if (m.re.test(v.text)) markerHits[m.name]++;
    }
    c_findings.push({ channel: ch, totalVariants: total, markerHits });
  }
  out.C26_victim = c_findings;
  add('C.26-30', 'INFO', '박지연 victim_cosplay markers — 채널별 분포', c_findings);
}

// C.31~35: 이준호
{
  const checks = ['interrogation','evidence_present','dossier','contradiction_pursuit','aftermath'];
  const c_findings = [];
  for (const ch of checks) {
    let bEntries;
    if (ch === 'aftermath') bEntries = text.channels[ch].entries;
    else if (ch === 'dossier') bEntries = text.channels[ch].entries.filter(e => e.targetParty === 'b');
    else bEntries = text.channels[ch].entries.filter(e => e.party === 'b');
    if (!bEntries.length) continue;
    let total = 0;
    const markerHits = {};
    for (const m of avoidantMarkers) markerHits[m.name] = 0;
    for (const e of bEntries) for (const v of e.variants) {
      total++;
      for (const m of avoidantMarkers) if (m.re.test(v.text)) markerHits[m.name]++;
    }
    c_findings.push({ channel: ch, totalVariants: total, markerHits });
  }
  out.C31_avoidant = c_findings;
  add('C.31-35', 'INFO', '이준호 avoidant markers — 채널별 분포', c_findings);
}

// ============ Section D: 메인 13 patch ============

// D.36: judge_contradiction patch IDs
{
  const allIds = new Set();
  for (const e of text.channels.judge_contradiction.entries) {
    for (const v of e.variants) allIds.add(v.id);
  }
  const expectedPatches = [
    'judgec-d-1-soft-v2',
    'judgec-d-1-mid-v1',
    'judgec-d-2-soft-v1',
  ];
  const found = expectedPatches.filter(id => allIds.has(id));
  const foundDetails = [];
  for (const e of text.channels.judge_contradiction.entries) {
    for (const v of e.variants) {
      if (expectedPatches.includes(v.id)) foundDetails.push({ id: v.id, text: v.text });
    }
  }
  out.D36_jc = { totalIds: allIds.size, found: found.length, expected: expectedPatches.length, details: foundDetails };
  add('D.36', found.length === expectedPatches.length ? 'OK' : 'WARN',
    `judge_contradiction 명시 patch (${found.length}/${expectedPatches.length})`,
    foundDetails);
}

// D.37: judge_question patch
{
  const targets = ['judgeq-d-1-empathy_approach-4-v1','judgeq-d-1-empathy_approach-4-v2'];
  const found = [];
  for (const e of text.channels.judge_question.entries) {
    for (const v of e.variants) {
      if (targets.includes(v.id)) found.push({ id: v.id, text: v.text });
    }
  }
  out.D37_jq = found;
  add('D.37', found.length === targets.length ? 'OK' : 'WARN',
    `judge_question 메인 patch (${found.length}/${targets.length})`, found);
}

// D.38: interrogation patch
{
  const targets = ['b-h-d3-S5-fact-pursuit-v5'];
  const found = [];
  for (const e of text.channels.interrogation.entries) {
    for (const v of e.variants) {
      if (targets.includes(v.id)) found.push({ id: v.id, text: v.text });
    }
  }
  out.D38_int = found;
  add('D.38', found.length === targets.length ? 'OK' : 'WARN',
    `interrogation b-h-d3-S5-fact-pursuit-v5`, found);
}

// D.39: 명사형 보정
{
  const v1 = findVariant('judge_contradiction','d-1|mid','judgec-d-1-mid-v1');
  const v2 = findVariant('judge_contradiction','d-2|soft','judgec-d-2-soft-v1');
  const issues = [];
  if (v1 && !/돌본\s*것이라고/.test(v1.variant.text)) {
    issues.push({ id: v1.variant.id, expected: '돌본 것이라고', actual: v1.variant.text });
  }
  if (v2 && !/도운\s*것이었다고/.test(v2.variant.text)) {
    issues.push({ id: v2.variant.id, expected: '도운 것이었다고', actual: v2.variant.text });
  }
  out.D39_nominal = { v1: v1?.variant.text, v2: v2?.variant.text };
  add('D.39', issues.length ? 'WARN' : 'OK',
    '명사형 보정 patch 보존',
    issues.length ? issues : '두 patch 모두 보존');
}

// D.40: system_message 평서체
{
  const sysMsgs = text.channels.system_message.entries;
  const sample = sysMsgs.map(e => ({
    key: e.key, eventType: e.eventType,
    variants: e.variants.map(v => ({ id: v.id, text: v.text })),
  }));
  out.D40_system = sample;
  // banned: 합니다체 + 관찰됩 패턴
  const bannedPatterns = [
    { name: '관찰됩', re: /(?:감지됩|확인됩|관찰됩|나타납)/ },
  ];
  const issues = [];
  for (const e of sysMsgs) {
    for (const v of e.variants) {
      for (const p of bannedPatterns) {
        if (p.re.test(v.text)) {
          issues.push({ id: v.id, key: e.key, pattern: p.name, snippet: v.text });
        }
      }
    }
  }
  add('D.40', issues.length ? 'WARN' : 'OK',
    `system_message 평서체 narrative (${sysMsgs.length} cells, ${sysMsgs.reduce((s,e)=>s+e.variants.length,0)} variants)`,
    issues.length ? issues : { samplesByKey: sample });
}

// ============ Section E: 통합 데이터 ============

// E.41~43: evidence_present 키 패턴 충돌
{
  const ep = text.channels.evidence_present.entries;
  const subj = ep.filter(e => e.subjectRole && !e.lieBand);
  const stage = ep.filter(e => e.lieBand && !e.subjectRole);
  const both = ep.filter(e => e.subjectRole && e.lieBand);
  const subjKeys = new Set(subj.map(e => e.key));
  const stageKeys = new Set(stage.map(e => e.key));
  const collisions = [...subjKeys].filter(k => stageKeys.has(k));
  // Collect all entry keys to check duplicates
  const allKeys = new Set();
  const dupKeys = [];
  for (const e of ep) {
    if (allKeys.has(e.key)) dupKeys.push(e.key);
    allKeys.add(e.key);
  }
  out.E41_keys = {
    subj_count: subj.length, stage_count: stage.length, both_count: both.length, total: ep.length,
    keyCollisions: collisions,
    duplicateKeys: dupKeys,
  };
  add('E.41-43', (collisions.length || dupKeys.length) ? 'WARN' : 'OK',
    `evidence_present 키 충돌 검사`,
    out.E41_keys);
}

// E.44~46: mediation
{
  const med = text.channels.mediation.entries;
  out.E44_mediation = med.map(e => ({
    key: e.key, path: e.path, speaker: e.speaker,
    variantCount: e.variants.length,
    first: e.variants[0]?.text?.slice(0, 200),
  }));
  // 베팅/공동통장 inconsistency 검출
  const bettingViolations = [];
  for (const e of med) {
    for (const v of e.variants) {
      if (/베팅/.test(v.text)) {
        bettingViolations.push({ id: v.id, key: e.key, snippet: v.text.slice(0, 200), violation: '베팅 언급 (h-d3 inconsistency 잔존?)' });
      }
    }
  }
  add('E.44-46', bettingViolations.length ? 'WARN' : 'OK',
    `mediation entries: ${med.length}, 베팅 inconsistency 정정 검증`,
    bettingViolations.length ? bettingViolations : '베팅 미언급 — d-3 inconsistency 정정 OK');
}

// E.47~48: evidence_discovery 보존
{
  const ed = text.channels.evidence_discovery.entries;
  out.E47_discovery = {
    count: ed.length,
    sample: ed.slice(0, 3).map(e => ({
      key: e.key, party: e.party, evidenceId: e.evidenceId, step: e.step,
      first: e.variants[0]?.text?.slice(0, 200),
    })),
  };
  add('E.47-48', 'INFO', `evidence_discovery ${ed.length} cells`, out.E47_discovery);
}

// E.49~50: aftermath 5 resultClass
{
  const after = text.channels.aftermath.entries;
  // 실명 (박미라/이성호) 미언급 — only 형/조카 호칭
  const realNameRe = /(박미라|이성호)/g;
  const issues = [];
  for (const e of after) {
    for (const v of e.variants) {
      const m = v.text.match(realNameRe);
      if (m) {
        issues.push({ id: v.id, key: e.key, hits: [...new Set(m)], snippet: v.text.slice(0, 250) });
      }
    }
  }
  out.E49_aftermath = after.map(e => ({
    key: e.key, resultClass: e.resultClass,
    variantCount: e.variants.length,
    first: e.variants[0]?.text?.slice(0, 250),
  }));
  add('E.49-50', issues.length ? 'WARN' : 'OK',
    `aftermath 5 resultClass — 실명 (박미라/이성호) 미언급`,
    issues.length ? issues : `${after.length} resultClass × ${after[0]?.variants.length || 0}v 모두 실명 위반 없음`);
}

// ============ Output ============
const outFile = `${ROOT}/tmp/QA-QW-spouse-01-findings.json`;
fs.writeFileSync(outFile, JSON.stringify(out, null, 2), 'utf8');
console.log(`written: ${outFile}`);
console.log(`total variants: ${out.variantTotals._total}`);
const warns = out.findings.filter(f => f.severity === 'WARN');
console.log(`findings: ${out.findings.length} (WARN: ${warns.length})`);
console.log(`\nWARN list:`);
for (const w of warns) console.log(`  - [${w.section}] ${w.title}`);
