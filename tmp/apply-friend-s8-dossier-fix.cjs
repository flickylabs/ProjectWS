// friend-01 S8 tonePatch dossier 21건 id 형식 변환 후 적용 시도
// patch id: a-dc1-q1-early-v1 → 통합 데이터 id: dc-1-a-q1-early-v1
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGET = path.join(ROOT, 'src/data/scriptedText/friend-01.json');
const S8_PATH = path.join(ROOT, 'gpt-pro-runs/judge-messages-v3/_master/assets-friend-01/gpt-pro-package/sessions/S8-aftermath-correction/output/s08_friend01_aftermath_tone_patch.json');

const data = JSON.parse(fs.readFileSync(TARGET, 'utf8'));
const S8 = JSON.parse(fs.readFileSync(S8_PATH, 'utf8'));
const dossierTonePatches = (S8.tonePatch || []).filter(t => t.channel === 'dossier');

// id 변환: a-dc1-q1-early-v1 → dc-1-a-q1-early-v1
function transformId(oldId) {
  // pattern: {party}-dc{n}-q{m}-{lieBand}-v{v}
  const m = oldId.match(/^([ab])-dc(\d+)-(q\d+-\w+-v\d+)$/);
  if (!m) return null;
  return `dc-${m[2]}-${m[1]}-${m[3]}`;
}

// 통합 데이터 dossier id index
const dossierVariants = new Map();
for (const e of data.channels.dossier.entries) {
  for (const v of e.variants || []) {
    if (v.id) dossierVariants.set(v.id, { variant: v, cellKey: e.key });
  }
}

const result = { applied: [], idTransformFailed: [], beforeMismatch: [], notFound: [] };

for (const tcp of dossierTonePatches) {
  const newId = transformId(tcp.id);
  if (!newId) {
    result.idTransformFailed.push(tcp.id);
    continue;
  }
  const found = dossierVariants.get(newId);
  if (!found) {
    result.notFound.push({ patchId: tcp.id, transformedId: newId });
    continue;
  }
  if (found.variant.text !== tcp.before) {
    result.beforeMismatch.push({
      patchId: tcp.id,
      transformedId: newId,
      cellKey: found.cellKey,
      expected: tcp.before,
      actual: found.variant.text,
    });
    continue;
  }
  found.variant.text = tcp.after;
  result.applied.push({ patchId: tcp.id, transformedId: newId });
}

console.log(`총 dossier tonePatch: ${dossierTonePatches.length}`);
console.log(`적용 성공: ${result.applied.length}`);
console.log(`id 변환 실패: ${result.idTransformFailed.length}`);
console.log(`id 못 찾음: ${result.notFound.length}`);
console.log(`before 미스매치: ${result.beforeMismatch.length}`);
console.log('');

if (result.applied.length) {
  console.log('--- 적용 ---');
  for (const a of result.applied) console.log(`  ✓ ${a.patchId} → ${a.transformedId}`);
  console.log('');
}

if (result.beforeMismatch.length) {
  console.log('--- before 미스매치 (보류) ---');
  for (const m of result.beforeMismatch) {
    console.log(`  ✗ ${m.patchId} → ${m.transformedId}`);
    console.log(`     expected: ${JSON.stringify(m.expected?.slice(0, 100))}`);
    console.log(`     actual:   ${JSON.stringify(m.actual?.slice(0, 100))}`);
    console.log('');
  }
}

const apply = process.argv.includes('--apply');
if (apply && result.applied.length > 0) {
  fs.writeFileSync(TARGET, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`>>> 적용 완료: ${TARGET}`);
} else {
  console.log('>>> dry-run 모드. --apply 인자로 실제 적용.');
}
