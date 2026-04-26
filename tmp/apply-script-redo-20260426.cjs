// 9 세션 산출물을 3 사건 통합본에 일관 적용
//
// 적용 순서:
// 1. S4 w-2-angle → src/data/cases/generated/spouse-01.json
// 2. S1/S2/S3 재판관 4 채널 통째 교체 → src/data/scriptedText/{caseId}.json
// 3. S5 family S8 tonePatch (83건) → src/data/scriptedText/family-01.json
// 4. S6 friend S8 dossier (14건) → src/data/scriptedText/friend-01.json
// 5. S7/S8/S9 pattern6 → src/data/scriptedText/{caseId}.json (재판관 채널 충돌은 skipped)
//
// --apply 인자로 실제 적용. 없으면 dry-run.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PKG = path.join(ROOT, 'gpt-pro-runs/script-redo-20260426/sessions');
const SRC = path.join(ROOT, 'src/data/scriptedText');
const CASES = path.join(ROOT, 'src/data/cases/generated');

const JUDGE_CHANNELS = ['judge_question', 'judge_contradiction', 'judge_evidence_combo', 'judge_witness_summon'];

const apply = process.argv.includes('--apply');
const log = (...a) => console.log(...a);

// === Step 1: S4 w-2-angle (spouse-01 case data) ===
log('\n=== Step 1: S4 w-2-angle (spouse-01 case data) ===');
const spouseCase = JSON.parse(fs.readFileSync(path.join(CASES, 'spouse-01.json')));
const w2patch = JSON.parse(fs.readFileSync(path.join(PKG, 'S4-spouse-01-w2-angle/output/spouse-01-w2-angle-patch.json')));
const nodes = spouseCase.combinationLab.nodes;
const w2already = nodes.find(n => n.id === 'w-2-angle');
let s4applied = false;
if (w2already) {
  log('  ⚠ w-2-angle 이미 존재. 스킵.');
} else {
  const insertBeforeId = w2patch.patch.insertBefore;
  const insertIndex = nodes.findIndex(n => n.id === insertBeforeId);
  if (insertIndex < 0) {
    log('  ✗ insertBefore', insertBeforeId, '못 찾음');
  } else {
    nodes.splice(insertIndex, 0, w2patch.patch.newNode);
    log('  ✓ w-2-angle 추가 (위치:', insertIndex, '/ 전체 nodes:', nodes.length, ')');
    s4applied = true;
  }
}

// === Step 2: S1/S2/S3 재판관 4 채널 통째 교체 ===
log('\n=== Step 2: S1/S2/S3 재판관 4 채널 통째 교체 ===');
const stData = {};
for (const c of ['spouse-01', 'family-01', 'friend-01']) {
  stData[c] = JSON.parse(fs.readFileSync(path.join(SRC, c + '.json')));
}
const judgeStats = {};
for (const [s, c] of [['S1', 'spouse-01'], ['S2', 'family-01'], ['S3', 'friend-01']]) {
  const judgeFile = JSON.parse(fs.readFileSync(path.join(PKG, s + '-judge-' + c + '/output/judge-rewrite-' + c + '.json')));
  let totalReplaced = 0;
  for (const ch of JUDGE_CHANNELS) {
    if (judgeFile.channels[ch]?.entries) {
      stData[c].channels[ch].entries = judgeFile.channels[ch].entries;
      const v = judgeFile.channels[ch].entries.reduce((s, e) => s + (e.variants?.length || 0), 0);
      totalReplaced += v;
    }
  }
  judgeStats[c] = totalReplaced;
  log('  ✓', c, '재판관 4 채널 교체:', totalReplaced, 'variants');
}

// === Step 3: S5 family S8 tonePatch (83건) ===
log('\n=== Step 3: S5 family S8 tonePatch ===');
const s5 = JSON.parse(fs.readFileSync(path.join(PKG, 'S5-family-01-s8-tonepatch/output/S08-family-01-aftermath-tone-patch-v2.json')));
const familyIdMap = new Map();
for (const [chName, ch] of Object.entries(stData['family-01'].channels)) {
  for (const e of ch.entries || []) {
    for (const v of e.variants || []) {
      if (v.id) familyIdMap.set(v.id, v);
    }
  }
}
let s5applied = 0, s5skipped = 0;
const s5skippedSamples = [];
for (const tcp of s5.tonePatch || []) {
  const v = familyIdMap.get(tcp.id);
  if (v && v.text === tcp.before) {
    v.text = tcp.after;
    s5applied++;
  } else {
    s5skipped++;
    if (s5skippedSamples.length < 5) s5skippedSamples.push({id: tcp.id, reason: !v ? 'idNotFound' : 'beforeMismatch'});
  }
}
log('  적용:', s5applied, '/ skipped:', s5skipped);
if (s5skipped > 0) {
  log('  skipped reasons:', s5skippedSamples);
}

// === Step 4: S6 friend S8 dossier (14건) ===
log('\n=== Step 4: S6 friend S8 dossier ===');
const s6 = JSON.parse(fs.readFileSync(path.join(PKG, 'S6-friend-01-s8-dossier/output/s08-friend01-dossier-tonepatch-v2.json')));
const friendIdMap = new Map();
for (const [chName, ch] of Object.entries(stData['friend-01'].channels)) {
  for (const e of ch.entries || []) {
    for (const v of e.variants || []) {
      if (v.id) friendIdMap.set(v.id, v);
    }
  }
}
let s6applied = 0, s6skipped = 0;
for (const tcp of s6.tonePatch || []) {
  const v = friendIdMap.get(tcp.id);
  if (v && v.text === tcp.before) {
    v.text = tcp.after;
    s6applied++;
  } else {
    s6skipped++;
  }
}
log('  적용:', s6applied, '/ skipped:', s6skipped);

// === Step 5: S7/S8/S9 pattern6 (각 사건) ===
log('\n=== Step 5: S7/S8/S9 pattern6 ===');
const pattern6Stats = {};
for (const [s, c] of [['S7', 'spouse-01'], ['S8', 'family-01'], ['S9', 'friend-01']]) {
  const file = JSON.parse(fs.readFileSync(path.join(PKG, s + '-pattern6-' + c + '/output/correction-pattern6-' + c + '.json')));
  // id index 재구성 (S2/S3 적용 후 본문 기준)
  const idMap = new Map();
  for (const [chName, ch] of Object.entries(stData[c].channels)) {
    for (const e of ch.entries || []) {
      for (const v of e.variants || []) {
        if (v.id) idMap.set(v.id, { variant: v, channel: chName });
      }
    }
  }
  let applied = 0, skippedJudge = 0, skippedMismatch = 0, idNotFound = 0;
  const skippedSamples = [];
  for (const p of file.patches || []) {
    const variantId = p.variantId || p.id;
    if (!variantId) { idNotFound++; continue; }
    const found = idMap.get(variantId);
    if (!found) { idNotFound++; continue; }
    // 재판관 채널은 S2/S3에서 통째 교체됐으므로 patch.before 미스매치 가능 — skippedJudge로 분류
    if (found.variant.text === p.before) {
      found.variant.text = p.after;
      applied++;
    } else {
      if (JUDGE_CHANNELS.includes(found.channel)) {
        skippedJudge++;
      } else {
        skippedMismatch++;
        if (skippedSamples.length < 3) skippedSamples.push({id: variantId, ch: found.channel, exp: p.before?.slice(0,60), act: found.variant.text?.slice(0,60)});
      }
    }
  }
  pattern6Stats[c] = { applied, skippedJudge, skippedMismatch, idNotFound, total: (file.patches || []).length };
  log('  ' + c + ': 적용=' + applied + ' / 재판관채널 skipped=' + skippedJudge + ' / 비매칭 skipped=' + skippedMismatch + ' / id 못찾음=' + idNotFound + ' / total=' + (file.patches || []).length);
  if (skippedSamples.length) {
    for (const s of skippedSamples) {
      log('    비매칭:', s.id, '[' + s.ch + ']');
      log('      exp:', s.exp);
      log('      act:', s.act);
    }
  }
}

// === Step 6: notes 업데이트 ===
for (const c of ['spouse-01', 'family-01', 'friend-01']) {
  stData[c].notes = [
    ...(stData[c].notes || []),
    'Script Redo 20260426: judge channels rewrite + S8 v2 patches + pattern6 corrections',
  ];
  stData[c].generatedAt = new Date().toISOString();
}

// === Step 7: 적용 ===
if (apply) {
  log('\n=== 저장 ===');
  fs.writeFileSync(path.join(CASES, 'spouse-01.json'), JSON.stringify(spouseCase, null, 2) + '\n');
  log('  ✓ src/data/cases/generated/spouse-01.json');
  for (const c of ['spouse-01', 'family-01', 'friend-01']) {
    fs.writeFileSync(path.join(SRC, c + '.json'), JSON.stringify(stData[c], null, 2) + '\n');
    log('  ✓ src/data/scriptedText/' + c + '.json');
  }
} else {
  log('\n>>> dry-run 모드. --apply 인자로 실제 적용.');
}

// === 종합 통계 ===
log('\n=== 종합 ===');
log('S4 w-2-angle:', s4applied ? '적용' : '스킵');
log('S1/S2/S3 재판관 교체:', JSON.stringify(judgeStats));
log('S5 family S8 tonePatch:', s5applied + '/' + (s5applied + s5skipped));
log('S6 friend S8 dossier:', s6applied + '/' + (s6applied + s6skipped));
log('S7/S8/S9 pattern6:', JSON.stringify(pattern6Stats));
