// spouse-01 evidence 편향성 (A/B/Both 매핑) + 조사 단계 데이터 분석
const fs = require('fs');
const path = require('path');

const ST = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/scriptedText/spouse-01.json'), 'utf8'));
const CASE = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/cases/generated/spouse-01.json'), 'utf8'));

const out = [];
const log = (...a) => out.push(a.join(' '));

// ---------- 1. evidence_present 모든 차원 + 매트릭스 ----------
log('=== evidence_present 전수 매트릭스 ===');
const evi = ST.channels.evidence_present.entries;
const dimVals = {};
for (const e of evi) {
  for (const k of Object.keys(e)) {
    if (k === 'variants') continue;
    dimVals[k] ??= new Set();
    dimVals[k].add(String(e[k]));
  }
}
for (const [k, vs] of Object.entries(dimVals)) {
  log(`  ${k} (${vs.size}종): [${[...vs].sort().join(', ')}]`);
}

// 모든 entry key + meta 출력
log(`\n## 42 evidence_present entries 전체:`);
for (const e of evi) {
  log(`  ${e.key} | party=${e.party} evi=${e.evidenceId} band=${e.lieBand} subjectRole=${e.subjectRole} stance=${e.stanceHint} truth=${e.truthLevel}`);
}
log('');

// subjectRole 분포
log('## subjectRole 분포 (편향성 매핑 단서)');
const subjMap = {};
for (const e of evi) {
  const k = `${e.evidenceId}|${e.subjectRole}`;
  subjMap[k] ??= [];
  subjMap[k].push(`${e.party}/${e.lieBand}`);
}
for (const [k, arr] of Object.entries(subjMap).sort()) {
  log(`  ${k}: ${arr.join(', ')}`);
}
log('');

// ---------- 2. 사건 정의의 evidences 배열 ----------
log('=== 사건 정의 (cases/generated/spouse-01.json) — evidences ===');
const evidences = CASE.evidences || CASE.evidence || [];
log(`evidences 수: ${evidences.length}`);
for (const ev of evidences) {
  log(`\n--- ${ev.id} ---`);
  // 모든 top-level 키 출력
  for (const [k, v] of Object.entries(ev)) {
    if (k === 'investigationStages' || k === 'stages') continue;
    if (typeof v === 'string') log(`  ${k}: ${v.slice(0, 120)}`);
    else if (Array.isArray(v)) log(`  ${k}: [${v.length} items]`);
    else if (typeof v === 'object' && v !== null) log(`  ${k}: ${JSON.stringify(v).slice(0, 200)}`);
    else log(`  ${k}: ${v}`);
  }
  // investigationStages 별도
  if (ev.investigationStages) {
    log(`  investigationStages (${ev.investigationStages.length}):`);
    for (const s of ev.investigationStages) {
      log(`    stage ${s.stage}: ${JSON.stringify(s).slice(0, 200)}`);
    }
  }
}
log('');

// ---------- 3. 사건 top-level 메타 ----------
log('=== 사건 top-level 메타 ===');
for (const k of Object.keys(CASE)) {
  if (Array.isArray(CASE[k])) log(`  ${k}: [array, ${CASE[k].length}]`);
  else if (typeof CASE[k] === 'object' && CASE[k] !== null) log(`  ${k}: {object, keys=${Object.keys(CASE[k]).join(',')}}`);
  else log(`  ${k}: ${String(CASE[k]).slice(0, 100)}`);
}
log('');

// 결과
const result = out.join('\n');
fs.writeFileSync(path.resolve(__dirname, 'spouse-01-evidence-output.txt'), result, 'utf8');
console.log(result);
