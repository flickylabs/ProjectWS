const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname);
const folders = [];
for (let i = 1; i <= 12; i++) {
  folders.push(`neighbor-${String(i).padStart(2, '0')}`);
}

function parseTsExport(content) {
  const m = content.match(/export const (\w+)\s*=\s*(\{[\s\S]*\})\s*(?:as const)?;?\s*(?:export default \w+;?)?\s*$/);
  if (!m) throw new Error('Failed to parse TS export');
  return JSON.parse(m[2]);
}

function collectTellPoolIds(v2Data) {
  const ids = [];
  const cp = v2Data.claimPolicies;
  for (const party of ['a', 'b']) {
    if (!cp[party]) continue;
    for (const disputeKey of Object.keys(cp[party])) {
      for (const stateKey of Object.keys(cp[party][disputeKey])) {
        const state = cp[party][disputeKey][stateKey];
        if (state.tellPool) {
          ids.push(...state.tellPool);
        }
      }
    }
  }
  return ids;
}

function collectExecutableTellIds(tellsData) {
  const ids = new Set();
  const et = tellsData.executableTells;
  for (const party of ['a', 'b']) {
    if (!et[party]) continue;
    for (const tell of et[party]) {
      ids.add(tell.id);
    }
  }
  return ids;
}

function collectRevealAtomIds(v3Data) {
  const ids = [];
  for (const card of v3Data.dossierCards) {
    for (const challenge of card.challenges) {
      for (const q of challenge.questions) {
        if (q.onSuccess && q.onSuccess.revealAtom) {
          ids.push(q.onSuccess.revealAtom);
        }
      }
    }
  }
  return ids;
}

function collectStateUnlockAtomIds(v3Data) {
  const ids = new Set();
  const sua = v3Data.stateUnlockAtoms;
  for (const party of Object.keys(sua)) {
    for (const disputeKey of Object.keys(sua[party])) {
      for (const stateKey of Object.keys(sua[party][disputeKey])) {
        const atoms = sua[party][disputeKey][stateKey];
        for (const atom of atoms) {
          ids.add(atom.id);
        }
      }
    }
  }
  return ids;
}

function countTells(tellsData) {
  const et = tellsData.executableTells;
  const aCount = et.a ? et.a.length : 0;
  const bCount = et.b ? et.b.length : 0;
  return { a: aCount, b: bCount, total: aCount + bCount };
}

function countBeatScripts(tellsData) {
  let count = 0;
  if (tellsData.beatScripts) {
    // beatScripts could be an array or object
    if (Array.isArray(tellsData.beatScripts)) {
      count = tellsData.beatScripts.length;
    } else {
      // object with keys
      for (const key of Object.keys(tellsData.beatScripts)) {
        const val = tellsData.beatScripts[key];
        if (Array.isArray(val)) {
          count += val.length;
        } else if (typeof val === 'object') {
          for (const subKey of Object.keys(val)) {
            const subVal = val[subKey];
            if (Array.isArray(subVal)) {
              count += subVal.length;
            }
          }
        }
      }
    }
  }
  return count;
}

function countTransitionBeats(v3Data) {
  return v3Data.transitionBeats ? v3Data.transitionBeats.length : 0;
}

function expectedCaseId(folderName) {
  // neighbor-01 -> neighbor01
  return folderName.replace('-', '');
}

console.log('=== GPT Neighbor 01-12 Validation ===\n');

let totalPass = 0;
let totalFail = 0;

for (const folder of folders) {
  const folderPath = path.join(BASE, folder);
  if (!fs.existsSync(folderPath)) {
    console.log(`[${folder}] SKIP - folder not found`);
    continue;
  }

  const prefix = folder; // e.g., neighbor-01
  const errors = [];

  // Read files
  let tellsData, v2Data, v3Data;
  try {
    const tellsContent = fs.readFileSync(path.join(folderPath, `${prefix}-tells-beats.ts`), 'utf-8');
    tellsData = parseTsExport(tellsContent);
  } catch (e) {
    errors.push(`tells-beats.ts 파싱 실패: ${e.message}`);
  }

  try {
    const v2Content = fs.readFileSync(path.join(folderPath, `${prefix}-v2-atoms.ts`), 'utf-8');
    v2Data = parseTsExport(v2Content);
  } catch (e) {
    errors.push(`v2-atoms.ts 파싱 실패: ${e.message}`);
  }

  try {
    const v3Content = fs.readFileSync(path.join(folderPath, `${prefix}-v3-game-loop-data.ts`), 'utf-8');
    v3Data = parseTsExport(v3Content);
  } catch (e) {
    errors.push(`v3-game-loop-data.ts 파싱 실패: ${e.message}`);
  }

  // 1. tellPool <-> Tell ID matching
  if (tellsData && v2Data) {
    const tellIds = collectExecutableTellIds(tellsData);
    const tellPoolIds = collectTellPoolIds(v2Data);
    const missing = tellPoolIds.filter(id => !tellIds.has(id));
    if (missing.length > 0) {
      errors.push(`tellPool에 있지만 executableTells에 없는 ID (${missing.length}개): ${missing.join(', ')}`);
    }
  }

  // 2. revealAtom <-> stateUnlockAtom matching
  if (v3Data) {
    const revealIds = collectRevealAtomIds(v3Data);
    const unlockIds = collectStateUnlockAtomIds(v3Data);
    const missing = revealIds.filter(id => !unlockIds.has(id));
    if (missing.length > 0) {
      errors.push(`revealAtom에 있지만 stateUnlockAtoms에 없는 ID (${missing.length}개): ${missing.join(', ')}`);
    }
  }

  // 3. Quantity checks
  if (tellsData) {
    const tc = countTells(tellsData);
    if (tc.a !== 3) errors.push(`Tell a: ${tc.a}개 (expected 3)`);
    if (tc.b !== 3) errors.push(`Tell b: ${tc.b}개 (expected 3)`);
    if (tc.total !== 6) errors.push(`Tell total: ${tc.total}개 (expected 6)`);

    const bs = countBeatScripts(tellsData);
    if (bs !== 36) errors.push(`BeatScript: ${bs}개 (expected 36)`);
  }

  if (v3Data) {
    const dc = v3Data.dossierCards ? v3Data.dossierCards.length : 0;
    if (dc !== 3) errors.push(`DossierCard: ${dc}개 (expected 3)`);

    const tb = countTransitionBeats(v3Data);
    if (tb < 20) errors.push(`TransitionBeat: ${tb}개 (expected >= 20)`);
  }

  // 4. caseId consistency — 폴더명 기반 (하이픈 포함/제거 모두 허용), 3파일 간 일관성 체크
  const allowedCaseIds = new Set([folder, expectedCaseId(folder)]); // e.g., "neighbor-01" and "neighbor01"
  const caseIds = [];
  if (tellsData) caseIds.push({ file: 'tells-beats', id: tellsData.caseId });
  if (v2Data) caseIds.push({ file: 'v2-atoms', id: v2Data.caseId });
  if (v3Data) caseIds.push({ file: 'v3-game-loop', id: v3Data.caseId });

  // Check all caseIds match folder name (either format)
  for (const { file, id } of caseIds) {
    if (!allowedCaseIds.has(id)) {
      errors.push(`${file} caseId: "${id}" (expected "${folder}" or "${expectedCaseId(folder)}")`);
    }
  }

  // Check 3 files use the same caseId
  const uniqueCaseIds = new Set(caseIds.map(c => c.id));
  if (uniqueCaseIds.size > 1) {
    const detail = caseIds.map(c => `${c.file}="${c.id}"`).join(', ');
    errors.push(`caseId 불일치 (3파일 간): ${detail}`);
  }

  // Result
  if (errors.length === 0) {
    console.log(`[${folder}] PASS`);
    totalPass++;
  } else {
    console.log(`[${folder}] FAIL (${errors.length}건)`);
    for (const e of errors) {
      console.log(`  - ${e}`);
    }
    totalFail++;
  }
}

console.log(`\n=== 결과: ${totalPass} PASS / ${totalFail} FAIL ===`);
