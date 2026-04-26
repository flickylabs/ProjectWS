// spouse-01 ScriptedText 정밀 분석 — v3 보완 영역 매핑용
// (메인 직접 분석, 어떤 Agent도 거치지 않음)
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '../src/data/scriptedText/spouse-01.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

const out = [];
const log = (...args) => out.push(args.join(' '));

log('=== spouse-01 ScriptedText 정밀 분석 ===');
log(`generatedAt: ${data.generatedAt}`);
log(`schemaVersion: ${data.schemaVersion}`);
log('');

// ---------- 1. 채널별 key/variant/entry 카운트 ----------
log('## 1. 채널별 카운트');
const channelStats = {};
let grandKeys = 0, grandVariants = 0;

for (const [ch, body] of Object.entries(data.channels)) {
  const entries = body.entries || [];
  const variantCounts = entries.map(e => (e.variants || []).length);
  const totalVariants = variantCounts.reduce((a, b) => a + b, 0);
  const uniqVariantCounts = [...new Set(variantCounts)].sort();
  const minV = Math.min(...variantCounts);
  const maxV = Math.max(...variantCounts);
  channelStats[ch] = { keys: entries.length, totalVariants, minV, maxV, uniqVariantCounts };
  grandKeys += entries.length;
  grandVariants += totalVariants;
  log(`- ${ch}: keys=${entries.length} variants=${totalVariants} (per key: min=${minV} max=${maxV} unique=[${uniqVariantCounts.join(',')}])`);
}
log(`총 keys: ${grandKeys}, 총 variants(=entries): ${grandVariants}`);
log('');

// ---------- 2. interrogation 매트릭스 검증 (기대: 144 keys × 5 = 720) ----------
log('## 2. interrogation 매트릭스 (기대: 2p × 4d × 6S × 3q = 144 keys × 5v = 720)');
const interr = data.channels.interrogation.entries;
const matrix = {}; // [party][dispute][lieState][qType] => variants count
const parties = new Set(), disputes = new Set(), lieStates = new Set(), qTypes = new Set();
for (const e of interr) {
  parties.add(e.party);
  disputes.add(e.disputeId);
  lieStates.add(e.lieState);
  qTypes.add(e.questionType);
  matrix[e.party] ??= {};
  matrix[e.party][e.disputeId] ??= {};
  matrix[e.party][e.disputeId][e.lieState] ??= {};
  matrix[e.party][e.disputeId][e.lieState][e.questionType] = e.variants.length;
}
log(`unique parties: [${[...parties].sort().join(',')}]`);
log(`unique disputes: [${[...disputes].sort().join(',')}]`);
log(`unique lieStates: [${[...lieStates].sort().join(',')}]`);
log(`unique qTypes: [${[...qTypes].sort().join(',')}]`);

// 누락 cell 확인
const expectedCells = parties.size * disputes.size * lieStates.size * qTypes.size;
let actualCells = 0;
const missing = [];
for (const p of parties) for (const d of disputes) for (const s of lieStates) for (const q of qTypes) {
  if (matrix[p]?.[d]?.[s]?.[q] !== undefined) actualCells++;
  else missing.push(`${p}|${d}|${s}|${q}`);
}
log(`매트릭스 cells: actual=${actualCells} / expected=${expectedCells}`);
if (missing.length) log(`누락 cells: ${missing.join(', ')}`);
else log('누락 cell 없음 ✓');
log('');

// ---------- 3. variants 풀 다양성 — 같은 key 내 tags 비교 ----------
log('## 3. variants 풀 다양성 (같은 key 내 5 variant tag 분포)');
const sampleKeys = [
  'a|d-1|S0|fact_pursuit',
  'a|d-1|S3|fact_pursuit',
  'a|d-1|S5|empathy_approach',
  'b|h-d3|S2|motive_search',
  'b|h-d3|S5|fact_pursuit',
];
for (const k of sampleKeys) {
  const e = interr.find(x => x.key === k);
  if (!e) { log(`  ${k}: 없음`); continue; }
  // emotion / reveal / continuity 차원 분포
  const emos = new Set(), revs = new Set(), conts = new Set();
  for (const v of e.variants) {
    for (const t of v.tags) {
      if (t.startsWith('emotion:')) emos.add(t);
      else if (t.startsWith('reveal:') || t.startsWith('disclosure:')) revs.add(t);
      else if (t.startsWith('continuity:')) conts.add(t);
    }
  }
  log(`  ${k}: emotion={${[...emos].join(',')}} reveal/discl={${[...revs].join(',')}} continuity={${[...conts].join(',')}}`);
}
log('');

// ---------- 4. 9차원 tag 커버리지 ----------
log('## 4. 9차원 tag 커버리지 (interrogation 기준)');
const tagPrefixCounts = {};
const tagValueByPrefix = {};
for (const e of interr) {
  for (const v of e.variants) {
    for (const t of v.tags) {
      const [prefix, ...rest] = t.split(':');
      const value = rest.join(':');
      tagPrefixCounts[prefix] = (tagPrefixCounts[prefix] || 0) + 1;
      tagValueByPrefix[prefix] ??= new Set();
      tagValueByPrefix[prefix].add(value);
    }
  }
}
const interest = ['emotion','reveal','disclosure','revealGuard','revealScope','continuity',
                  'rapport','contradict_token','contradiction','stage','investigationStage',
                  'phase','tone','tense','address','scope','register','honorific',
                  'questionType','stance','responseMode','mentionTarget','callTerm','counterpartyRef',
                  'judgeAddress','speaker','listener','speakerRole','listenerRole','channel'];
log('  prefix : count : 고유값들');
for (const p of interest) {
  if (!tagPrefixCounts[p]) { log(`  ${p}: (없음)`); continue; }
  const vals = [...tagValueByPrefix[p]].sort().slice(0, 12);
  const more = tagValueByPrefix[p].size > 12 ? ` +${tagValueByPrefix[p].size - 12}종` : '';
  log(`  ${p}: ${tagPrefixCounts[p]} : [${vals.join(', ')}]${more}`);
}
log('');
// 미발견된 핵심 차원 명시
log('  9차원 매핑 점검:');
const must = {
  '쟁점': 'disputeId(entry meta) — interrogation에만 있음, evidence/dossier도 확인 필요',
  '캐릭터': 'party(entry meta)',
  'lieState': 'lieState(entry meta) — 6단계',
  'emotion': tagPrefixCounts['emotion'] ? `tag, ${tagValueByPrefix['emotion'].size}종` : '없음',
  'rapport': tagPrefixCounts['rapport'] ? `tag, ${tagValueByPrefix['rapport'].size}종` : '없음 (5가지 부족 영역 #3)',
  'contradict_token': tagPrefixCounts['contradict_token'] || tagPrefixCounts['contradiction'] ? '있음' : '없음 (5가지 부족 영역 #3,#5)',
  'q_type': 'questionType(entry meta) — 3종',
  'tone': tagPrefixCounts['tone'] ? `tag, ${tagValueByPrefix['tone'].size}종` : '없음 (register/honorific으로 대체?)',
  '시점': tagPrefixCounts['tense'] ? `tense tag, ${tagValueByPrefix['tense'].size}종` : '없음',
};
for (const [dim, val] of Object.entries(must)) log(`    - ${dim}: ${val}`);
log('');

// ---------- 5. emotion phase 확인 ----------
log('## 5. emotion phase 분포 (game engine은 defensive→confident→shaken→angry→resigned)');
const emoMap = {};
for (const e of interr) {
  for (const v of e.variants) {
    for (const t of v.tags) {
      if (t.startsWith('emotion:')) {
        const val = t.slice('emotion:'.length);
        emoMap[val] = (emoMap[val] || 0) + 1;
      }
    }
  }
}
const emoSorted = Object.entries(emoMap).sort((a,b) => b[1] - a[1]);
for (const [e, c] of emoSorted) log(`  ${e}: ${c}`);
log('');

// ---------- 6. evidence_present — investigationStages 반영? ----------
log('## 6. evidence_present — investigationStages(0/1/2) 반영 여부');
const evi = data.channels.evidence_present.entries;
log(`총 keys: ${evi.length}`);
log(`첫 entry sample: ${JSON.stringify(Object.fromEntries(Object.entries(evi[0]).filter(([k]) => k !== 'variants')), null, 2)}`);
const hasStage = evi.some(e => 'investigationStage' in e || 'stage' in e);
log(`investigationStage/stage field: ${hasStage ? '있음' : '없음 ✗ (5가지 부족 영역 #2)'}`);
// tag에 stage 키워드 있는지
const stageTags = new Set();
for (const e of evi) for (const v of e.variants) for (const t of v.tags) {
  if (t.toLowerCase().includes('stage')) stageTags.add(t);
}
log(`stage 관련 tag: ${stageTags.size ? [...stageTags].slice(0,10).join(', ') : '없음'}`);
log('');

// ---------- 7. judge_question / judge_contradiction 등 누락 채널 ----------
log('## 7. 누락 채널 점검 (5가지 부족 영역 #4, #5)');
const channelNames = Object.keys(data.channels);
log(`현재 채널: [${channelNames.join(', ')}]`);
const wanted = ['judge_question', 'judge_contradiction', 'judge_evidence_combo', 'judge_witness_summon',
                'opinion_clash', 'rapport_milestone', 'emotion_phase_shift'];
log(`누락 가능 채널 (보완 후보):`);
for (const w of wanted) log(`  - ${w}: ${channelNames.includes(w) ? '있음' : '없음 ✗'}`);
log('');

// ---------- 8. system_message — 이벤트 발동 메시지 ----------
log('## 8. system_message 채널 (이벤트 발동 시 사전 작성 데이터)');
const sys = data.channels.system_message.entries;
log(`총 keys: ${sys.length} (variantsPerKey: 2 → 12 entries)`);
for (const e of sys) {
  log(`  - context=${e.context} eventType=${e.eventType} variants=${e.variants.length}`);
}
log('');

// ---------- 결과 출력 ----------
const result = out.join('\n');
fs.writeFileSync(path.resolve(__dirname, 'spouse-01-analysis-output.txt'), result, 'utf8');
console.log(result);
