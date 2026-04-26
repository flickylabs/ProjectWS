// spouse-01 ScriptedText 정밀 분석 #2 — 추가 7채널 + judge 채널 구조
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '../src/data/scriptedText/spouse-01.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

const out = [];
const log = (...args) => out.push(args.join(' '));

// ---------- 채널별 entry meta 키 + 첫 entry 샘플 ----------
log('=== 추가 채널 구조 분석 ===\n');

const channels = ['contradiction_pursuit','interjection','emotional_overload',
                  'evidence_discovery','trust_action','mediation',
                  'judge_question','judge_contradiction'];

for (const ch of channels) {
  const body = data.channels[ch];
  if (!body) { log(`## ${ch}: 채널 없음\n`); continue; }
  const entries = body.entries || [];
  log(`## ${ch} (keys=${entries.length})`);
  if (!entries.length) { log('  (빈 채널)\n'); continue; }

  // entry meta 키 패턴 (첫 5 entry의 key/meta 비교)
  const metaKeys = new Set();
  for (const e of entries.slice(0, 5)) {
    for (const k of Object.keys(e)) if (k !== 'variants') metaKeys.add(k);
  }
  log(`  meta fields: [${[...metaKeys].join(', ')}]`);

  // 모든 entry의 차원 값 분포
  const dimVals = {};
  for (const e of entries) {
    for (const k of metaKeys) {
      if (k === 'key') continue;
      dimVals[k] ??= new Set();
      if (e[k] !== undefined) dimVals[k].add(String(e[k]));
    }
  }
  for (const [k, vs] of Object.entries(dimVals)) {
    const arr = [...vs].sort();
    const sample = arr.length > 8 ? `${arr.slice(0,8).join(', ')} +${arr.length-8}종` : arr.join(', ');
    log(`    - ${k} (${vs.size}종): ${sample}`);
  }

  // 매트릭스 cells (key 차원만 모았을 때)
  log(`  실제 keys (처음 8개):`);
  for (const e of entries.slice(0, 8)) {
    log(`    ${e.key} (variants: ${e.variants?.length ?? 0})`);
  }

  // emotion / reveal / continuity tag 분포 (전체 variants 기준)
  const emos = {}, revs = {}, conts = {};
  for (const e of entries) for (const v of e.variants || []) for (const t of v.tags || []) {
    if (t.startsWith('emotion:')) emos[t.slice(8)] = (emos[t.slice(8)]||0)+1;
    else if (t.startsWith('reveal:')) revs[t.slice(7)] = (revs[t.slice(7)]||0)+1;
    else if (t.startsWith('continuity:')) conts[t.slice(11)] = (conts[t.slice(11)]||0)+1;
  }
  if (Object.keys(emos).length) log(`  emotion 분포: ${JSON.stringify(emos)}`);
  if (Object.keys(revs).length) log(`  reveal 분포: ${JSON.stringify(revs)}`);
  if (Object.keys(conts).length) log(`  continuity 분포: ${JSON.stringify(conts)}`);

  // 첫 variant text 샘플 (의미 파악용)
  const v0 = entries[0]?.variants?.[0];
  if (v0) {
    const txt = (v0.text || '').slice(0, 80);
    log(`  text 샘플 [${entries[0].key}]: "${txt}..."`);
  }
  log('');
}

// ---------- judge_question 매트릭스 (rough) ----------
log('## judge_question — 24 keys 전체 키 목록');
const jq = data.channels.judge_question?.entries || [];
for (const e of jq) {
  const meta = Object.fromEntries(Object.entries(e).filter(([k]) => !['variants','key'].includes(k)));
  log(`  ${e.key} | ${JSON.stringify(meta)}`);
}
log('');

// ---------- judge_contradiction 6 keys 전체 ----------
log('## judge_contradiction — 6 keys 전체');
const jc = data.channels.judge_contradiction?.entries || [];
for (const e of jc) {
  const meta = Object.fromEntries(Object.entries(e).filter(([k]) => !['variants','key'].includes(k)));
  log(`  ${e.key} | ${JSON.stringify(meta)}`);
  for (const v of e.variants) log(`     v: "${(v.text||'').slice(0,80)}..."`);
}
log('');

// ---------- mediation 빈 채널 — body 자체 확인 ----------
log('## mediation 채널 body 전체 (빈 이유 확인)');
log(JSON.stringify(data.channels.mediation, null, 2));
log('');

// ---------- evidence_present 매트릭스 — investigationStages 차원 신설 검토 ----------
log('## evidence_present — 현재 차원 vs investigationStages 신설 시 분량');
const evi = data.channels.evidence_present.entries;
const eviPB = {}; // party × lieBand
for (const e of evi) {
  const k = `${e.party}|${e.lieBand}`;
  eviPB[k] = (eviPB[k] || 0) + 1;
}
log('  현재 (party × lieBand):');
for (const [k, c] of Object.entries(eviPB).sort()) log(`    ${k}: ${c} keys`);
const evidenceIds = new Set(evi.map(e => e.evidenceId));
log(`  evidenceIds: ${[...evidenceIds].sort().join(', ')}`);
log(`  현재 키 = 2 party × 7 evi × 3 lieBand = 42 cells × 5v = 210 entries (정확)`);
log(`  investigationStages 차원 신설 시:`);
log(`    옵션 A: stage를 lieBand 대체 → 2p × 7e × 3stage = 42 → 동일 (단 의미 변경)`);
log(`    옵션 B: stage 차원 추가 (lieBand 유지) → 2p × 7e × 3lb × 3stage = 126 cells × 5v = 630 entries`);
log(`    옵션 C: 신규 채널 evidence_investigation 추가 → 2p × 7e × 3stage = 42 cells × 3v = 126 entries`);
log('');

// ---------- 결과 출력 ----------
const result = out.join('\n');
fs.writeFileSync(path.resolve(__dirname, 'spouse-01-analysis-output-2.txt'), result, 'utf8');
console.log(result);
