// friend-01 8 산출물 통합 (1차 raw merge)
// family-01 merge-all 기반 friend-01 적응
//
// 사건별 차이:
// - 5 disputes (d-1~d-5)
// - evidences 7개 (e-1~e-7)
// - dossier 9 questions × 3 lieBand = 27 cells (vs family 33)
// - 인물: 송다은(a, premature_summary) / 최수민(b, affect_flattening)
// - S6 evidence_combo 27 (vs spouse 24 / family 33)
// - S8 patch는 정상 형식 (Truth Throttle 강화)

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PKG = path.join(ROOT, 'gpt-pro-runs/judge-messages-v3/_master/assets-friend-01/gpt-pro-package');
const ORIG = path.join(ROOT, 'src/data/scriptedText/friend-01.json');

const orig = JSON.parse(fs.readFileSync(ORIG, 'utf8'));
console.log('=== 기존 friend-01.json 로드 ===');
let origTotal = 0;
for (const [ch, body] of Object.entries(orig.channels || {})) {
  if (body?.entries) origTotal += body.entries.reduce((s, e) => s + (e.variants?.length || 0), 0);
}
console.log(`  채널: ${Object.keys(orig.channels).length}, 총 variants: ${origTotal}`);

// === 산출물 로드 ===
// S1: new_variants_only_180 (v6~v10 patch)
const S1new = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S1-interrogation-variants/output/S01_new_variants_only_180_full_source_scope.json'), 'utf8'));
const S2 = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S2-evidence-stage-d1-d2/output/evidence_present_stage_additions.json'), 'utf8'));
const S3raw = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S3-evidence-stage-hd3-hd4/output/S03_evidence_present_stage_entries.json'), 'utf8'));
const S4 = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S4-dossier-witness/output/s04-dossier-witness-expanded.json'), 'utf8'));
const S5 = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S5-h-d3-h-d4-channels/output/s05-expanded-event-channels.json'), 'utf8'));
const S6 = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S6-judge-channels/output/s06-friend-01-judge-channels.json'), 'utf8'));
const S7 = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S7-trust-mediation-system-milestone/output/10-scripted-text-s07.json'), 'utf8'));
const S8 = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S8-aftermath-correction/output/s08_friend01_aftermath_tone_patch.json'), 'utf8'));

console.log(`\n=== 산출물 로드 ===`);
console.log(`  S1 new180: ${S1new.length} entries × 5v (v6~v10)`);
console.log(`  S2: ${S2.entries?.length || 0} entries (e-1~e-5 stage 1/2/3)`);
console.log(`  S3: ${S3raw.entries?.length || 0} entries (e-6~e-7 stage1/2/3)`);
console.log(`  S4: dossier ${S4.channels.dossier.entries.length} + witness ${S4.channels.witness.entries.length}`);
console.log(`  S5: ${Object.keys(S5.channels).join(',')} (${Object.values(S5.channels).map(c => c.entries.length).join('/')})`);
console.log(`  S6: ${Object.keys(S6.channels).join(',')} (${Object.values(S6.channels).map(c => c.entries.length).join('/')})`);
console.log(`  S7: ${Object.keys(S7.channels).length} channels (전체 누적)`);
console.log(`  S8: aftermath ${S8.aftermath?.length}, tonePatch ${S8.tonePatch?.length}`);

const merged = JSON.parse(JSON.stringify(orig));
merged.generatedAt = new Date().toISOString();
merged.notes = [
  ...(merged.notes || []),
  `Merged with GPT Pro 8 sessions (S1-S8) on ${new Date().toISOString()}`,
  `Stage entries 추가: S2 (e-1~e-5 stage 1/2/3) + S3 (e-6~e-7 stage1/2/3)`,
  `Dossier lieBand 차원 신설 (S4)`,
  `신규 채널 4: judge_evidence_combo / judge_witness_summon / rapport_milestone / contradict_milestone`,
];

const stats = {};

// (a) S1: interrogation 기존 180 entries에 v6~v10 추가
{
  const interr = merged.channels.interrogation.entries;
  const lookup = new Map(S1new.map(e => [e.key, e.variants]));
  let added = 0;
  let matched = 0;
  for (const e of interr) {
    const newVars = lookup.get(e.key);
    if (newVars) {
      e.variants = e.variants.concat(newVars);
      added += newVars.length;
      matched++;
    }
  }
  stats.interrogation = { totalCells: interr.length, matched, addedVariants: added };
}

// (b) S2 + S3: evidence_present 신규 cells 추가 (기존 cells 보존)
{
  const exist = merged.channels.evidence_present.entries;
  const existingKeys = new Set(exist.map(e => e.key));
  let added = 0;
  let dupSkipped = 0;
  for (const ne of (S2.entries || [])) {
    if (existingKeys.has(ne.key)) { dupSkipped++; continue; }
    exist.push(ne);
    existingKeys.add(ne.key);
    added += ne.variants?.length || 0;
  }
  for (const ne of (S3raw.entries || [])) {
    if (existingKeys.has(ne.key)) { dupSkipped++; continue; }
    exist.push(ne);
    existingKeys.add(ne.key);
    added += ne.variants?.length || 0;
  }
  stats.evidence_present = { totalCells: exist.length, addedVariants: added, dupSkipped };
}

// (c) S4: dossier (lieBand 차원 신설) + witness (v 확장)
{
  const oldDossierLen = merged.channels.dossier.entries.length;
  merged.channels.dossier.entries = S4.channels.dossier.entries;
  stats.dossier = { totalCells: merged.channels.dossier.entries.length, replaced: true, oldCells: oldDossierLen };

  const oldWitnessLen = merged.channels.witness.entries.length;
  merged.channels.witness.entries = S4.channels.witness.entries;
  stats.witness = { totalCells: merged.channels.witness.entries.length, replaced: true, oldCells: oldWitnessLen };
}

// (d) S5: contradiction_pursuit / interjection / emotional_overload
{
  for (const ch of ['contradiction_pursuit', 'interjection', 'emotional_overload']) {
    if (S5.channels[ch]) {
      const oldLen = merged.channels[ch].entries.length;
      merged.channels[ch].entries = S5.channels[ch].entries;
      stats[ch] = { totalCells: merged.channels[ch].entries.length, replaced: true, oldCells: oldLen };
    }
  }
}

// (e) S6: judge_question / judge_contradiction (확장) + judge_evidence_combo / judge_witness_summon (신규)
{
  for (const ch of ['judge_question', 'judge_contradiction']) {
    const oldLen = merged.channels[ch]?.entries?.length || 0;
    merged.channels[ch].entries = S6.channels[ch].entries;
    stats[ch] = { totalCells: merged.channels[ch].entries.length, replaced: true, oldCells: oldLen };
  }
  for (const ch of ['judge_evidence_combo', 'judge_witness_summon']) {
    merged.channels[ch] = S6.channels[ch];
    stats[ch] = { totalCells: merged.channels[ch].entries.length, isNew: true };
  }
}

// (f) S7: trust_action / mediation / system_message / rapport_milestone / contradict_milestone
{
  for (const ch of ['trust_action', 'system_message']) {
    const oldLen = merged.channels[ch]?.entries?.length || 0;
    merged.channels[ch] = S7.channels[ch];
    stats[ch] = { totalCells: merged.channels[ch].entries.length, replaced: true, oldCells: oldLen };
  }
  const oldMediationLen = merged.channels.mediation?.entries?.length || 0;
  merged.channels.mediation = S7.channels.mediation;
  stats.mediation = { totalCells: (merged.channels.mediation?.entries || []).length, replaced: true, oldCells: oldMediationLen };
  for (const ch of ['rapport_milestone', 'contradict_milestone']) {
    merged.channels[ch] = S7.channels[ch];
    stats[ch] = { totalCells: merged.channels[ch].entries.length, isNew: true };
  }
}

// (g) S8: aftermath 보강 + tonePatch
{
  const aftermathEntries = S8.aftermath || [];
  const tonePatch = S8.tonePatch || [];

  if (aftermathEntries.length > 0) {
    const oldLen = merged.channels.aftermath.entries.length;
    merged.channels.aftermath.entries = aftermathEntries.map(a => ({
      key: a.key || a.id,
      ...(a.resultClass !== undefined ? { resultClass: a.resultClass } : {}),
      variants: a.variants,
    }));
    stats.aftermath = { totalCells: merged.channels.aftermath.entries.length, replaced: true, oldCells: oldLen };
  }

  let s8PatchCount = 0;
  let s8PatchSkipped = 0;
  const skippedSamples = [];
  for (const tcp of tonePatch) {
    const ch = tcp.channel;
    const channelData = merged.channels[ch];
    if (!channelData?.entries) {
      s8PatchSkipped++;
      skippedSamples.push({ id: tcp.id, channel: tcp.channel, reason: 'channel_not_found' });
      continue;
    }
    let applied = false;
    for (const e of channelData.entries) {
      for (const v of e.variants || []) {
        if (v.id === tcp.id && v.text === tcp.before) {
          v.text = tcp.after;
          s8PatchCount++;
          applied = true;
        }
      }
    }
    if (!applied) {
      s8PatchSkipped++;
      if (skippedSamples.length < 10) skippedSamples.push({ id: tcp.id, channel: tcp.channel, reason: 'before_mismatch' });
    }
  }
  stats.s8_tonePatch = { applied: s8PatchCount, total: tonePatch.length, skipped: s8PatchSkipped, skippedSamples };
}

// === coverage 업데이트 ===
merged.coverage = {
  ...(merged.coverage || {}),
  interrogation: { ...(orig.coverage?.interrogation || {}), variantsPerKey: 10 },
  evidence_present: { ...(orig.coverage?.evidence_present || {}), variantsPerKey: 10, investigationStages: [1, 2, 3] },
  dossier: { ...(orig.coverage?.dossier || {}), variantsPerKey: 10, lieBands: ['early', 'mid', 'late'] },
  witness: { ...(orig.coverage?.witness || {}), variantsPerKey: 10 },
  aftermath: { ...(orig.coverage?.aftermath || {}), variantsPerKey: 5 },
  system_message: { ...(orig.coverage?.system_message || {}), variantsPerKey: 5 },
  contradiction_pursuit: { variantsPerKey: 10 },
  interjection: { variantsPerKey: 10 },
  emotional_overload: { variantsPerKey: 10 },
  trust_action: { variantsPerKey: 10 },
  mediation: { variantsPerKey: 10 },
  judge_question: { variantsPerKey: 5 },
  judge_contradiction: { variantsPerKey: 5 },
  judge_evidence_combo: { variantsPerKey: 5 },
  judge_witness_summon: { variantsPerKey: 5 },
  rapport_milestone: { variantsPerKey: 5 },
  contradict_milestone: { variantsPerKey: 5 },
};

console.log('\n=== 통합 결과 ===');
let totalNew = 0;
for (const [ch, body] of Object.entries(merged.channels || {})) {
  if (body?.entries) {
    const v = body.entries.reduce((s, e) => s + (e.variants?.length || 0), 0);
    console.log(`  ${ch}: ${body.entries.length} cells / ${v} variants`);
    totalNew += v;
  }
}
console.log(`  총: ${totalNew} variants (기존 ${origTotal} → ${totalNew}, +${totalNew - origTotal})`);
console.log(`  총 채널: ${Object.keys(merged.channels).length}`);

console.log('\n## 채널별 작업 stats');
for (const [k, v] of Object.entries(stats)) {
  console.log(`  ${k}: ${JSON.stringify(v)}`);
}

const outPath = path.join(__dirname, 'friend-01-merged.json');
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2), 'utf8');
console.log(`\n저장: ${outPath}`);
console.log(`사이즈: ${(fs.statSync(outPath).size / 1024 / 1024).toFixed(2)} MB`);
