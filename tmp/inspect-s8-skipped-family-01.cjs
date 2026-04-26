// family-01 S8 tonePatch skipped 28건 원인 분석
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const PKG = path.join(ROOT, 'gpt-pro-runs/judge-messages-v3/_master/assets-family-01/gpt-pro-package');

const merged = JSON.parse(fs.readFileSync(path.join(__dirname, 'family-01-merged.json'), 'utf8'));
const S8 = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S8-aftermath-correction/output/S08-family-01-aftermath-tone-patch.json'), 'utf8'));
const tonePatch = S8.tonePatch || [];

// id index
const idIndex = new Map();
for (const [chName, ch] of Object.entries(merged.channels || {})) {
  for (const e of ch.entries || []) {
    for (const v of e.variants || []) {
      if (v.id) idIndex.set(v.id, { channel: chName, cellKey: e.key, text: v.text });
    }
  }
}

const reasons = { idNotFound: [], beforeMismatch: [], applied: [] };
for (const tcp of tonePatch) {
  const found = idIndex.get(tcp.id);
  if (!found) {
    reasons.idNotFound.push({ id: tcp.id, channel: tcp.channel, expected: tcp.before?.slice(0,60) });
  } else if (found.text !== tcp.before) {
    reasons.beforeMismatch.push({
      id: tcp.id,
      channel: tcp.channel,
      foundChannel: found.channel,
      cellKey: found.cellKey,
      expected: tcp.before,
      actual: found.text,
    });
  } else {
    reasons.applied.push(tcp.id);
  }
}

console.log('=== S8 tonePatch 분석 ===');
console.log(`총 ${tonePatch.length}건`);
console.log(`적용 가능 (id+before 일치): ${reasons.applied.length}`);
console.log(`id 못 찾음: ${reasons.idNotFound.length}`);
console.log(`before 미스매치: ${reasons.beforeMismatch.length}`);
console.log('');

if (reasons.idNotFound.length) {
  console.log('--- id 못 찾음 ---');
  for (const r of reasons.idNotFound) {
    console.log(`  ✗ ${r.id} [${r.channel}]`);
  }
  console.log('');
}

if (reasons.beforeMismatch.length) {
  console.log('--- before 미스매치 ---');
  for (const r of reasons.beforeMismatch) {
    console.log(`  ✗ ${r.id} [patch.channel=${r.channel} / found=${r.foundChannel}]`);
    console.log(`     expected: ${JSON.stringify(r.expected)}`);
    console.log(`     actual:   ${JSON.stringify(r.actual)}`);
    console.log('');
  }
}

fs.writeFileSync(path.join(__dirname, 's8-tonepatch-analysis-family-01.json'), JSON.stringify(reasons, null, 2));
console.log('상세: tmp/s8-tonepatch-analysis-family-01.json');
