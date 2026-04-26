#!/usr/bin/env node
/**
 * QW-Cross P0 22건 patch 적용 (spouse-01.json)
 *
 * 구조: data.channels.{channel}.entries[].variants[].{id,text,behaviorHint,tags,sourceRefs}
 *
 * 절차:
 * 1. report.json에서 p0Patches 추출
 * 2. spouse-01.json 모든 channel.entries[].variants[] 순회
 * 3. id 매칭 시 text 필드 검증 (잘못 패턴 #1: old 본문 정확 일치 시만 교체)
 * 4. 미스매치/누락 0이고 --apply 인자 있을 때만 파일 저장
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REPORT_PATH = path.join(ROOT, 'tmp', 'QA-QW-codex-cross-report.json');
const TARGET_PATH = path.join(ROOT, 'src', 'data', 'scriptedText', 'spouse-01.json');

const report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'));
const data = JSON.parse(fs.readFileSync(TARGET_PATH, 'utf8'));
const patches = report.findings.p0Patches;

console.log(`P0 patches: ${patches.length}`);
console.log(`Target: ${TARGET_PATH}`);
console.log('');

const patchById = new Map();
for (const p of patches) {
  patchById.set(p.id, p);
}

const result = {
  applied: [],
  oldMismatch: [],
  notFound: [],
  duplicateMatches: [],
};

let visitedVariants = 0;
const matchedIds = new Map();

for (const channelName of Object.keys(data.channels || {})) {
  const channel = data.channels[channelName];
  for (const subKey of Object.keys(channel)) {
    const arr = channel[subKey];
    if (!Array.isArray(arr)) continue;
    for (const cell of arr) {
      const cellKey = cell.key || JSON.stringify(cell);
      for (const variant of (cell.variants || [])) {
        visitedVariants += 1;
        const id = variant.id;
        if (!id) continue;
        const patch = patchById.get(id);
        if (!patch) continue;

        matchedIds.set(id, (matchedIds.get(id) || 0) + 1);

        if (variant.text === patch.old) {
          variant.text = patch.new;
          result.applied.push({ id, channel: channelName, cellKey });
        } else {
          result.oldMismatch.push({
            id,
            channel: channelName,
            cellKey,
            patchOld: patch.old,
            actual: variant.text,
          });
        }
      }
    }
  }
}

for (const p of patches) {
  if (!matchedIds.has(p.id)) {
    result.notFound.push(p.id);
  } else if (matchedIds.get(p.id) > 1) {
    result.duplicateMatches.push({ id: p.id, count: matchedIds.get(p.id) });
  }
}

console.log('=== 결과 ===');
console.log(`총 variants 순회: ${visitedVariants}`);
console.log(`적용 성공: ${result.applied.length}`);
console.log(`old 미스매치: ${result.oldMismatch.length}`);
console.log(`id 못 찾음: ${result.notFound.length}`);
console.log(`중복 매칭: ${result.duplicateMatches.length}`);
console.log('');

if (result.applied.length) {
  console.log('--- 적용 ---');
  for (const a of result.applied) {
    console.log(`  ✓ ${a.id} [${a.channel}] cellKey=${a.cellKey}`);
  }
  console.log('');
}

if (result.oldMismatch.length) {
  console.log('--- old 미스매치 (적용 보류) ---');
  for (const m of result.oldMismatch) {
    console.log(`  ✗ ${m.id} [${m.channel}]`);
    console.log(`     patch.old: ${JSON.stringify(m.patchOld)}`);
    console.log(`     actual:    ${JSON.stringify(m.actual)}`);
  }
  console.log('');
}

if (result.notFound.length) {
  console.log('--- id 못 찾음 ---');
  for (const id of result.notFound) {
    console.log(`  ? ${id}`);
  }
  console.log('');
}

if (result.duplicateMatches.length) {
  console.log('--- 중복 매칭 ---');
  for (const d of result.duplicateMatches) {
    console.log(`  ! ${d.id} (${d.count}회)`);
  }
  console.log('');
}

const apply = process.argv.includes('--apply');
if (apply) {
  if (result.oldMismatch.length === 0 && result.notFound.length === 0 && result.duplicateMatches.length === 0) {
    fs.writeFileSync(TARGET_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`>>> 적용 완료: ${TARGET_PATH}`);
    console.log(`    적용된 patch: ${result.applied.length}건`);
  } else {
    console.log('>>> 적용 보류: 미스매치/누락/중복 있음. 수동 확인 필요.');
    process.exit(1);
  }
} else {
  console.log('>>> dry-run 모드. --apply 인자로 실제 적용.');
}

const reportOut = path.join(ROOT, 'tmp', 'apply-qw-cross-p0-result.json');
fs.writeFileSync(reportOut, JSON.stringify(result, null, 2), 'utf8');
console.log(`결과 리포트: ${reportOut}`);
