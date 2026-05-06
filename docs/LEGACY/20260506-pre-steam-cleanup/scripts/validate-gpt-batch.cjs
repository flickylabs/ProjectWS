const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../docs/ref/리뉴얼참고/gpt-batch');

// friend-01 ~ friend-12
const folders = [];
for (let i = 1; i <= 12; i++) {
  const num = String(i).padStart(2, '0');
  folders.push(`friend-${num}`);
}

function parseTsExport(content) {
  // Remove BOM if present
  content = content.replace(/^\uFEFF/, '');
  const m = content.match(/export const (\w+)\s*=\s*(\{[\s\S]*\})\s*(?:as const)?;?\s*(?:export default \w+;?)?\s*$/);
  if (!m) return null;
  try {
    return JSON.parse(m[2]);
  } catch (e) {
    return null;
  }
}

function collectAllAtomIds(stateUnlockAtoms) {
  // stateUnlockAtoms: { a: { "d-1": { "S2": [...], "S3": [...] }, ... }, b: { ... } }
  const ids = new Set();
  for (const party of Object.keys(stateUnlockAtoms)) {
    const disputes = stateUnlockAtoms[party];
    for (const disputeId of Object.keys(disputes)) {
      const states = disputes[disputeId];
      for (const stateKey of Object.keys(states)) {
        const atoms = states[stateKey];
        if (Array.isArray(atoms)) {
          for (const atom of atoms) {
            if (atom.id) ids.add(atom.id);
          }
        }
      }
    }
  }
  return ids;
}

function collectAllRevealAtoms(dossierCards) {
  const atoms = [];
  for (const card of dossierCards) {
    if (!card.challenges) continue;
    for (const challenge of card.challenges) {
      if (!challenge.questions) continue;
      for (const q of challenge.questions) {
        if (q.onSuccess && q.onSuccess.revealAtom) {
          atoms.push({ revealAtom: q.onSuccess.revealAtom, questionId: q.id });
        }
      }
    }
  }
  return atoms;
}

function collectTellIds(executableTells) {
  // executableTells: { a: [...], b: [...] }
  const ids = new Set();
  for (const party of Object.keys(executableTells)) {
    const tells = executableTells[party];
    if (Array.isArray(tells)) {
      for (const tell of tells) {
        if (tell.id) ids.add(tell.id);
      }
    }
  }
  return ids;
}

function collectTellPoolIds(v2Data) {
  // v2Data.claimPolicies: { a: { "d-1": { "S0": { tellPool: [...] }, ... } }, b: { ... } }
  const ids = [];
  const policies = v2Data.claimPolicies;
  if (!policies) return ids;
  for (const party of Object.keys(policies)) {
    const disputes = policies[party];
    for (const disputeId of Object.keys(disputes)) {
      const states = disputes[disputeId];
      // states can be an object with state keys (S0, S1, ...) or direct
      for (const stateKey of Object.keys(states)) {
        const stateObj = states[stateKey];
        if (stateObj && Array.isArray(stateObj.tellPool)) {
          for (const tellRef of stateObj.tellPool) {
            ids.push({ tellRef, location: `${party}.${disputeId}.${stateKey}` });
          }
        }
      }
    }
  }
  return ids;
}

function normalizeTellId(tellRef) {
  // tellPool format: "tell.a.number_buffering" -> need to match tell id "tell:a:tell:number_buffering"
  // Let's collect both formats and see
  return tellRef;
}

function extractTellShortKey(tellId) {
  // Normalize any tell ID to "party:shortName" for comparison
  // All known formats (colon-based):
  //   "tell:a:tell:number_buffering" -> "a:number_buffering"
  //   "friend05:a:tell:receipt_fan"  -> "a:receipt_fan"
  //   "a:tell:quote_reassembly"      -> "a:quote_reassembly"
  //   "friend05:a:receipt_fan"        -> "a:receipt_fan"
  // All known formats (dot-based):
  //   "tell.a.number_buffering"       -> "a:number_buffering"
  //   "friend07.a.timeline_stitch"    -> "a:timeline_stitch"
  //   "a.tell.quote_reassembly"       -> "a:quote_reassembly"

  // Unify: replace dots with colons, then strip known prefixes
  const unified = tellId.replace(/\./g, ':');
  // Remove any leading caseId-like prefix (e.g. "friend07:", "tell:")
  // Then remove "tell:" if it appears as a segment
  // Final result: "party:shortName"
  const parts = unified.split(':');
  // Filter out known noise: caseId prefix, "tell" keyword
  const meaningful = parts.filter(p => p !== 'tell' && !/^(friend|family|neighbor)\d+$/.test(p));
  if (meaningful.length >= 2) {
    return `${meaningful[0]}:${meaningful[meaningful.length - 1]}`;
  }
  return tellId;
}

function buildTellLookup(executableTells) {
  // Build a lookup with normalized keys + original IDs
  const lookup = new Set();
  for (const party of Object.keys(executableTells)) {
    const tells = executableTells[party];
    if (Array.isArray(tells)) {
      for (const tell of tells) {
        if (tell.id) {
          lookup.add(tell.id);
          lookup.add(extractTellShortKey(tell.id));
        }
      }
    }
  }
  return lookup;
}

function countBeats(beatScripts) {
  return Array.isArray(beatScripts) ? beatScripts.length : 0;
}

function countTells(executableTells) {
  let aCount = 0, bCount = 0;
  if (executableTells.a && Array.isArray(executableTells.a)) aCount = executableTells.a.length;
  if (executableTells.b && Array.isArray(executableTells.b)) bCount = executableTells.b.length;
  return { a: aCount, b: bCount, total: aCount + bCount };
}

function countTransitionBeats(v3Data) {
  return Array.isArray(v3Data.transitionBeats) ? v3Data.transitionBeats.length : 0;
}

function countDossierCards(v3Data) {
  return Array.isArray(v3Data.dossierCards) ? v3Data.dossierCards.length : 0;
}

// Main validation
let allPass = true;
const results = [];

for (const folder of folders) {
  const folderPath = path.join(BASE, folder);
  if (!fs.existsSync(folderPath)) {
    results.push({ folder, status: 'SKIP', errors: [`폴더 없음: ${folderPath}`] });
    continue;
  }

  const errors = [];
  const tellsBeatsFile = path.join(folderPath, `${folder}-tells-beats.ts`);
  const v2AtomsFile = path.join(folderPath, `${folder}-v2-atoms.ts`);
  const v3File = path.join(folderPath, `${folder}-v3-game-loop-data.ts`);

  // Parse files
  let tellsBeatsData = null, v2Data = null, v3Data = null;

  if (fs.existsSync(tellsBeatsFile)) {
    tellsBeatsData = parseTsExport(fs.readFileSync(tellsBeatsFile, 'utf-8'));
    if (!tellsBeatsData) errors.push(`[파싱 실패] ${folder}-tells-beats.ts`);
  } else {
    errors.push(`[파일 없음] ${folder}-tells-beats.ts`);
  }

  if (fs.existsSync(v2AtomsFile)) {
    v2Data = parseTsExport(fs.readFileSync(v2AtomsFile, 'utf-8'));
    if (!v2Data) errors.push(`[파싱 실패] ${folder}-v2-atoms.ts`);
  } else {
    errors.push(`[파일 없음] ${folder}-v2-atoms.ts`);
  }

  if (fs.existsSync(v3File)) {
    v3Data = parseTsExport(fs.readFileSync(v3File, 'utf-8'));
    if (!v3Data) errors.push(`[파싱 실패] ${folder}-v3-game-loop-data.ts`);
  } else {
    errors.push(`[파일 없음] ${folder}-v3-game-loop-data.ts`);
  }

  // ============ 1. tellPool <-> Tell ID 매칭 ============
  if (tellsBeatsData && v2Data) {
    const tellLookup = buildTellLookup(tellsBeatsData.executableTells || {});
    const tellPoolRefs = collectTellPoolIds(v2Data);
    for (const { tellRef, location } of tellPoolRefs) {
      const normalized = extractTellShortKey(tellRef);
      if (!tellLookup.has(tellRef) && !tellLookup.has(normalized)) {
        errors.push(`[Tell 미매칭] tellPool "${tellRef}" (at ${location}) -> executableTells에 없음`);
      }
    }
  }

  // ============ 2. revealAtom <-> stateUnlockAtom ID 매칭 ============
  if (v3Data) {
    const unlockAtomIds = collectAllAtomIds(v3Data.stateUnlockAtoms || {});
    const revealAtoms = collectAllRevealAtoms(v3Data.dossierCards || []);
    for (const { revealAtom, questionId } of revealAtoms) {
      if (!unlockAtomIds.has(revealAtom)) {
        errors.push(`[RevealAtom 미매칭] "${revealAtom}" (question: ${questionId}) -> stateUnlockAtoms에 없음`);
      }
    }
  }

  // ============ 3. 수량 체크 ============
  if (tellsBeatsData) {
    const tellCounts = countTells(tellsBeatsData.executableTells || {});
    if (tellCounts.a !== 3) errors.push(`[수량] Tell a: ${tellCounts.a}개 (기대: 3)`);
    if (tellCounts.b !== 3) errors.push(`[수량] Tell b: ${tellCounts.b}개 (기대: 3)`);

    const beatCount = countBeats(tellsBeatsData.beatScripts || []);
    if (beatCount !== 36) errors.push(`[수량] BeatScript: ${beatCount}개 (기대: 36)`);
  }

  if (v3Data) {
    const dossierCount = countDossierCards(v3Data);
    if (dossierCount !== 3) errors.push(`[수량] DossierCard: ${dossierCount}개 (기대: 3)`);

    const transitionCount = countTransitionBeats(v3Data);
    if (transitionCount < 20) errors.push(`[수량] TransitionBeat: ${transitionCount}개 (기대: 20 이상)`);
  }

  // ============ 4. caseId 일관성 ============
  const expectedCaseId = folder;
  if (tellsBeatsData && tellsBeatsData.caseId !== expectedCaseId) {
    errors.push(`[caseId] tells-beats.ts: "${tellsBeatsData.caseId}" (기대: "${expectedCaseId}")`);
  }
  if (v2Data && v2Data.caseId !== expectedCaseId) {
    errors.push(`[caseId] v2-atoms.ts: "${v2Data.caseId}" (기대: "${expectedCaseId}")`);
  }
  if (v3Data && v3Data.caseId !== expectedCaseId) {
    errors.push(`[caseId] v3-game-loop-data.ts: "${v3Data.caseId}" (기대: "${expectedCaseId}")`);
  }

  // Also check caseId in beatScripts and transitionBeats
  if (tellsBeatsData && tellsBeatsData.beatScripts) {
    for (const beat of tellsBeatsData.beatScripts) {
      if (beat.caseId && beat.caseId !== expectedCaseId) {
        errors.push(`[caseId] beatScript "${beat.id}": "${beat.caseId}" (기대: "${expectedCaseId}")`);
        break; // one is enough
      }
    }
  }
  if (v3Data && v3Data.transitionBeats) {
    for (const tb of v3Data.transitionBeats) {
      if (tb.caseId && tb.caseId !== expectedCaseId) {
        errors.push(`[caseId] transitionBeat "${tb.id}": "${tb.caseId}" (기대: "${expectedCaseId}")`);
        break;
      }
    }
  }

  // Collect counts for summary
  const counts = {};
  if (tellsBeatsData) {
    const tc = countTells(tellsBeatsData.executableTells || {});
    counts.tellA = tc.a;
    counts.tellB = tc.b;
    counts.beatScript = countBeats(tellsBeatsData.beatScripts || []);
  }
  if (v3Data) {
    counts.dossierCard = countDossierCards(v3Data);
    counts.transitionBeat = countTransitionBeats(v3Data);
  }

  if (errors.length === 0) {
    results.push({ folder, status: 'PASS', errors: [], counts });
  } else {
    allPass = false;
    results.push({ folder, status: 'FAIL', errors, counts });
  }
}

// Output
console.log('='.repeat(70));
console.log('  GPT 배치 산출물 검증 결과 (friend-01 ~ friend-12)');
console.log('='.repeat(70));

for (const r of results) {
  if (r.status === 'PASS') {
    const c = r.counts;
    console.log(`\n[PASS] ${r.folder}  Tell(a:${c.tellA} b:${c.tellB}) Beat:${c.beatScript} Dossier:${c.dossierCard} Transition:${c.transitionBeat}`);
  } else if (r.status === 'SKIP') {
    console.log(`\n[SKIP] ${r.folder} - ${r.errors[0]}`);
  } else {
    console.log(`\n[FAIL] ${r.folder} (${r.errors.length}건)`);
    for (const e of r.errors) {
      console.log(`  - ${e}`);
    }
  }
}

console.log('\n' + '='.repeat(70));
const passCount = results.filter(r => r.status === 'PASS').length;
const failCount = results.filter(r => r.status === 'FAIL').length;
const skipCount = results.filter(r => r.status === 'SKIP').length;
console.log(`총 ${results.length}건: PASS ${passCount} / FAIL ${failCount} / SKIP ${skipCount}`);
console.log('='.repeat(70));
