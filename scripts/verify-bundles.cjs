/**
 * verify-bundles.cjs
 * Verifies family-01.json and friend-01.json ScriptedText bundles.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const BUNDLES = [
  {
    path: path.resolve(__dirname, '../src/data/scriptedText/family-01.json'),
    caseId: 'family-01',
    relationship: 'family',
    expectedDisputes: ['d-1', 'd-2', 'd-3', 'd-4', 'd-5'],
    callTerms: { a: '제_동생', b: '제_형' },
  },
  {
    path: path.resolve(__dirname, '../src/data/scriptedText/friend-01.json'),
    caseId: 'friend-01',
    relationship: 'friend',
    expectedDisputes: ['d-1', 'd-2', 'd-3', 'd-4', 'd-5'],
    callTerms: { a: '제_전_친구', b: '다은이' },
  },
];

const REQUIRED_CHANNELS = ['interrogation', 'evidence_present', 'dossier', 'witness', 'aftermath', 'system_message'];

let allPassed = true;

function fail(msg) {
  console.error(`  FAIL: ${msg}`);
  allPassed = false;
}

function pass(msg) {
  console.log(`  OK: ${msg}`);
}

for (const spec of BUNDLES) {
  console.log(`\n=== Verifying ${spec.caseId} ===`);

  // 1. JSON validity
  let bundle;
  try {
    const raw = fs.readFileSync(spec.path, 'utf8');
    bundle = JSON.parse(raw);
    pass('JSON is valid');
  } catch (e) {
    fail(`JSON parse error: ${e.message}`);
    continue;
  }

  // 2. caseId
  if (bundle.caseId === spec.caseId) {
    pass(`caseId = ${bundle.caseId}`);
  } else {
    fail(`caseId mismatch: got ${bundle.caseId}, expected ${spec.caseId}`);
  }

  // 3. All 6 channels present
  const channelNames = Object.keys(bundle.channels);
  const missingChannels = REQUIRED_CHANNELS.filter(c => !channelNames.includes(c));
  if (missingChannels.length === 0) {
    pass(`All 6 channels present: ${channelNames.join(', ')}`);
  } else {
    fail(`Missing channels: ${missingChannels.join(', ')}`);
  }

  // 4. Count entries and variants per channel
  let totalEntries = 0;
  let totalVariants = 0;
  for (const chName of REQUIRED_CHANNELS) {
    const ch = bundle.channels[chName];
    if (!ch) continue;
    const entryCount = ch.entries.length;
    const varCount = ch.entries.reduce((sum, e) => sum + e.variants.length, 0);
    totalEntries += entryCount;
    totalVariants += varCount;
    console.log(`  Channel ${chName}: ${entryCount} entries, ${varCount} variants`);
  }
  pass(`Total: ${totalEntries} entries, ${totalVariants} variants`);

  // 5. Interrogation disputes check
  const interrDisputes = [...new Set(bundle.channels.interrogation.entries.map(e => e.disputeId))].sort();
  if (JSON.stringify(interrDisputes) === JSON.stringify(spec.expectedDisputes)) {
    pass(`Interrogation disputes: ${interrDisputes.join(', ')}`);
  } else {
    fail(`Interrogation disputes mismatch: got ${interrDisputes.join(', ')}, expected ${spec.expectedDisputes.join(', ')}`);
  }

  // 6. Tag correctness: relationship
  const sampleTags = bundle.channels.interrogation.entries[0].variants[0].tags;
  const relTag = sampleTags.find(t => t.startsWith('relationship:'));
  if (relTag === `relationship:${spec.relationship}`) {
    pass(`Relationship tag: ${relTag}`);
  } else {
    fail(`Relationship tag mismatch: got ${relTag}, expected relationship:${spec.relationship}`);
  }

  // 7. callTerm correctness for party a and b
  const partyAEntry = bundle.channels.interrogation.entries.find(e => e.party === 'a');
  const partyBEntry = bundle.channels.interrogation.entries.find(e => e.party === 'b');
  if (partyAEntry) {
    const ctTag = partyAEntry.variants[0].tags.find(t => t.startsWith('callTerm:'));
    if (ctTag === `callTerm:${spec.callTerms.a}`) {
      pass(`Party A callTerm: ${ctTag}`);
    } else {
      fail(`Party A callTerm mismatch: got ${ctTag}, expected callTerm:${spec.callTerms.a}`);
    }
  }
  if (partyBEntry) {
    const ctTag = partyBEntry.variants[0].tags.find(t => t.startsWith('callTerm:'));
    if (ctTag === `callTerm:${spec.callTerms.b}`) {
      pass(`Party B callTerm: ${ctTag}`);
    } else {
      fail(`Party B callTerm mismatch: got ${ctTag}, expected callTerm:${spec.callTerms.b}`);
    }
  }

  // 8. Variant IDs are descriptive (no plain "v1")
  let plainVCount = 0;
  for (const ch of Object.values(bundle.channels)) {
    for (const e of ch.entries) {
      for (const v of e.variants) {
        if (/^v\d+$/.test(v.id)) plainVCount++;
      }
    }
  }
  if (plainVCount === 0) {
    pass('All variant IDs are descriptive (no plain "v1" etc.)');
  } else {
    fail(`${plainVCount} variants have plain "vN" IDs`);
  }

  // 9. Emotion mapping check
  const denyEntry = bundle.channels.interrogation.entries.find(e => e.stanceHint === 'deny');
  if (denyEntry) {
    const emotionTag = denyEntry.variants[0].tags.find(t => t.startsWith('emotion:'));
    if (emotionTag === 'emotion:guarded') {
      pass('Emotion mapping (deny->guarded) correct');
    } else {
      fail(`Emotion mapping for deny: got ${emotionTag}, expected emotion:guarded`);
    }
  }

  // 10. Continuity mapping check
  const s0Entry = bundle.channels.interrogation.entries.find(e => e.lieState === 'S0');
  if (s0Entry) {
    const contTag = s0Entry.variants[0].tags.find(t => t.startsWith('continuity:'));
    if (contTag === 'continuity:opening_guard') {
      pass('Continuity mapping (S0->opening_guard) correct');
    } else {
      fail(`Continuity mapping for S0: got ${contTag}, expected continuity:opening_guard`);
    }
  }

  // 11. Every variant has text and behaviorHint
  let missingText = 0;
  let missingBehavior = 0;
  for (const ch of Object.values(bundle.channels)) {
    for (const e of ch.entries) {
      for (const v of e.variants) {
        if (!v.text || v.text.trim() === '') missingText++;
        if (!v.behaviorHint || v.behaviorHint.trim() === '') missingBehavior++;
      }
    }
  }
  if (missingText === 0) {
    pass('All variants have non-empty text');
  } else {
    fail(`${missingText} variants missing text`);
  }
  if (missingBehavior === 0) {
    pass('All variants have non-empty behaviorHint');
  } else {
    fail(`${missingBehavior} variants missing behaviorHint`);
  }

  // 12. sourceRefs present on all variants
  let missingRefs = 0;
  for (const ch of Object.values(bundle.channels)) {
    for (const e of ch.entries) {
      for (const v of e.variants) {
        if (!v.sourceRefs || v.sourceRefs.length === 0) missingRefs++;
      }
    }
  }
  if (missingRefs === 0) {
    pass('All variants have sourceRefs');
  } else {
    fail(`${missingRefs} variants missing sourceRefs`);
  }

  // 13. Coverage object present
  if (bundle.coverage) {
    pass('Coverage object present');
  } else {
    fail('Coverage object missing');
  }
}

console.log('\n' + (allPassed ? 'ALL CHECKS PASSED' : 'SOME CHECKS FAILED'));
process.exit(allPassed ? 0 : 1);
