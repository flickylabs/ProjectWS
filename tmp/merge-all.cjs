// 기존 spouse-01.json + 8 산출물 + 83 보정 patch + S8 toneCorrectionPatch 51 → 새 spouse-01.json
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PKG = path.join(ROOT, 'gpt-pro-runs/judge-messages-v3/_master/assets-spouse-01/gpt-pro-package');
const ORIG = path.join(ROOT, 'src/data/scriptedText/spouse-01.json');

// === 1. 기존 spouse-01.json 로드 ===
const orig = JSON.parse(fs.readFileSync(ORIG, 'utf8'));
console.log('=== 기존 spouse-01.json 로드 ===');
let origTotal = 0;
for (const [ch, body] of Object.entries(orig.channels || {})) {
  if (body?.entries) origTotal += body.entries.reduce((s, e) => s + (e.variants?.length || 0), 0);
}
console.log(`  채널: ${Object.keys(orig.channels).length}, 총 variants: ${origTotal}`);

// === 2. 산출물 로드 ===
const S1 = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S1-interrogation-variants/output/s1-interrogation-v6-v10-patch.json'), 'utf8'));
const S2 = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S2-evidence-stage-d1-d2/output/s2-evidence-present-stage-patch.json'), 'utf8'));
const S3 = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S3-evidence-stage-hd3-hd4/output/s3_evidence_present_stage_entries.json'), 'utf8'));
const S4 = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S4-dossier-witness/output/S4-dossier-witness-expanded.json'), 'utf8'));
const S5 = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S5-h-d3-h-d4-channels/output/s5-channel-expansion-only.json'), 'utf8'));
const S6 = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S6-judge-channels/output/s6-judge-channels-patch.json'), 'utf8'));
const S7 = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S7-trust-mediation-system-milestone/output/10-scripted-text-s7.json'), 'utf8'));
const S8 = JSON.parse(fs.readFileSync(path.join(PKG, 'sessions/S8-aftermath-correction/output/S8_aftermath_expansion_and_tone_patch.json'), 'utf8'));

const corrections = JSON.parse(fs.readFileSync(path.join(__dirname, 'final-patches.json'), 'utf8')).patches;
console.log(`\n=== 산출물 + 보정 patch 로드 ===`);
console.log(`  S1: 144 cells × 5 신규 v`);
console.log(`  S2: ${S2.entries.length} cells × 10v`);
console.log(`  S3: ${S3.entries.length} cells × 10v`);
console.log(`  S4: dossier ${S4.channels.dossier.entries.length} + witness ${S4.channels.witness.entries.length}`);
console.log(`  S5: ${Object.keys(S5.channels).length} 채널`);
console.log(`  S6: ${Object.keys(S6.channels).length} 채널`);
console.log(`  S7: ${Object.keys(S7.channels).length} 채널 (전체)`);
console.log(`  S8: aftermath ${S8.aftermath.length} + tonePatch ${S8.toneCorrectionPatch.length}`);
console.log(`  자동 보정 patch: ${corrections.length}`);

// === 3. 보정 patch 적용 (변경 신규 entries에 적용 시) ===
// final-patches.json: { id, channel, before, after, ... }
// 보정 적용 — 채널 + variant id 매칭

function applyCorrections(entries, channel) {
  let count = 0;
  for (const e of entries) {
    for (const v of e.variants || []) {
      const patch = corrections.find(c =>
        c.id === v.id &&
        (c.channel === channel ||
         (c.channel === 's1' && channel === 'interrogation') ||
         (c.channel === 's3' && channel === 'evidence_present'))
      );
      if (patch && v.text === patch.before) {
        v.text = patch.after;
        count++;
      }
    }
  }
  return count;
}

// === 4. 새 spouse-01.json 구성 (deep clone 시작) ===
const merged = JSON.parse(JSON.stringify(orig));
merged.generatedAt = new Date().toISOString();
merged.notes = [
  ...(merged.notes || []),
  `Merged with GPT Pro 8 sessions (S1-S8) on ${new Date().toISOString()}`,
  `Auto-correction patches applied: ${corrections.length}`,
  `S8 toneCorrectionPatch applied: ${S8.toneCorrectionPatch.length}`,
];

// === 5. 채널별 통합 ===
const stats = {};

// (a) S1: interrogation 기존 144 entries에 v6~v10 추가
{
  const newEntries = S1.entries; // 144 entries × 5 신규 variants
  const lookup = new Map(newEntries.map(e => [e.key, e.variants]));
  const interr = merged.channels.interrogation.entries;
  let added = 0;
  for (const e of interr) {
    const newVars = lookup.get(e.key);
    if (newVars) {
      e.variants = e.variants.concat(newVars);
      added += newVars.length;
    }
  }
  const corrCount = applyCorrections(interr, 'interrogation');
  stats.interrogation = { totalCells: interr.length, addedVariants: added, correctionsApplied: corrCount };
}

// (b) S2 + S3: evidence_present 신규 stage 차원 cells 추가 (기존 42 cells 보존)
{
  const newEntries = [...S2.entries, ...S3.entries];
  // 신규 cells의 key는 `{p}|{ev}|{lb}|{stage}` (number stage)
  // 기존 cells 보존 + 신규 cells 추가
  const exist = merged.channels.evidence_present.entries;
  const existingKeys = new Set(exist.map(e => e.key));
  let added = 0;
  for (const ne of newEntries) {
    if (!existingKeys.has(ne.key)) {
      exist.push(ne);
      added += ne.variants?.length || 0;
    }
  }
  const corrCount = applyCorrections(exist, 'evidence_present');
  stats.evidence_present = { totalCells: exist.length, addedVariants: added, correctionsApplied: corrCount };
}

// (c) S4: dossier (기존 24 polled by question_id × 3v=72 → 24 cells × 3 lieBand × 10v=240, lieBand 차원 신설)
//      witness (기존 9 × 3 → 9 × 10)
{
  // dossier — 기존 24 entries는 question_id 단일 키. 신규 24 cells는 dossierQuestionId|lieBand 키.
  // 옵션 B (lieBand 차원 신설) 채택 — 기존 entries 폐기 + 신규 사용
  merged.channels.dossier.entries = S4.channels.dossier.entries;
  const corrDossier = applyCorrections(merged.channels.dossier.entries, 'dossier');
  stats.dossier = { totalCells: merged.channels.dossier.entries.length, replaced: true, correctionsApplied: corrDossier };

  // witness — 9 cells 동일, v 확장. 신규 entries 사용
  merged.channels.witness.entries = S4.channels.witness.entries;
  const corrWit = applyCorrections(merged.channels.witness.entries, 'witness');
  stats.witness = { totalCells: merged.channels.witness.entries.length, replaced: true, correctionsApplied: corrWit };
}

// (d) S5: contradiction_pursuit / interjection / emotional_overload (cells + v 확장)
{
  for (const ch of ['contradiction_pursuit', 'interjection', 'emotional_overload']) {
    if (S5.channels[ch]) {
      merged.channels[ch].entries = S5.channels[ch].entries;
      const cnt = applyCorrections(merged.channels[ch].entries, ch);
      stats[ch] = { totalCells: merged.channels[ch].entries.length, replaced: true, correctionsApplied: cnt };
    }
  }
}

// (e) S6: judge_question / judge_contradiction (확장) + judge_evidence_combo / judge_witness_summon (신규)
{
  for (const ch of ['judge_question', 'judge_contradiction']) {
    merged.channels[ch].entries = S6.channels[ch].entries;
    const cnt = applyCorrections(merged.channels[ch].entries, ch);
    stats[ch] = { totalCells: merged.channels[ch].entries.length, replaced: true, correctionsApplied: cnt };
  }
  // 신규 채널
  for (const ch of ['judge_evidence_combo', 'judge_witness_summon']) {
    merged.channels[ch] = S6.channels[ch];
    const cnt = applyCorrections(merged.channels[ch].entries, ch);
    stats[ch] = { totalCells: merged.channels[ch].entries.length, isNew: true, correctionsApplied: cnt };
  }
}

// (f) S7: trust_action / mediation / system_message / rapport_milestone / contradict_milestone
{
  for (const ch of ['trust_action', 'system_message']) {
    merged.channels[ch] = S7.channels[ch];
    const cnt = applyCorrections(merged.channels[ch].entries, ch);
    stats[ch] = { totalCells: merged.channels[ch].entries.length, replaced: true, correctionsApplied: cnt };
  }
  // mediation — 기존 paths 형식 → S7 entries 형식
  merged.channels.mediation = S7.channels.mediation;
  const medCnt = applyCorrections(merged.channels.mediation.entries || [], 'mediation');
  stats.mediation = { totalCells: (merged.channels.mediation.entries || []).length, replaced: true, correctionsApplied: medCnt };
  // 신규 milestone 채널
  for (const ch of ['rapport_milestone', 'contradict_milestone']) {
    merged.channels[ch] = S7.channels[ch];
    const cnt = applyCorrections(merged.channels[ch].entries, ch);
    stats[ch] = { totalCells: merged.channels[ch].entries.length, isNew: true, correctionsApplied: cnt };
  }
}

// (g) S8: aftermath v 확장 + toneCorrectionPatch 51건
{
  // aftermath: 5 cells × 5v
  merged.channels.aftermath.entries = S8.aftermath.map(a => ({
    key: a.key,
    resultClass: a.resultClass,
    variants: a.variants,
  }));
  const aftCnt = applyCorrections(merged.channels.aftermath.entries, 'aftermath');
  stats.aftermath = { totalCells: merged.channels.aftermath.entries.length, replaced: true, correctionsApplied: aftCnt };

  // toneCorrectionPatch — 기존 entries에 적용
  let s8PatchCount = 0;
  for (const tcp of S8.toneCorrectionPatch) {
    // tcp: { id, channel, before, after, reason }
    const ch = tcp.channel;
    const channelData = merged.channels[ch];
    if (!channelData?.entries) continue;
    for (const e of channelData.entries) {
      for (const v of e.variants || []) {
        if (v.id === tcp.id && v.text === tcp.before) {
          v.text = tcp.after;
          s8PatchCount++;
        }
      }
    }
  }
  stats.s8_tonePatch = { applied: s8PatchCount, total: S8.toneCorrectionPatch.length };
}

// === 6. 정리: schemaVersion + coverage 업데이트 ===
merged.coverage = {
  ...(merged.coverage || {}),
  interrogation: { ...orig.coverage?.interrogation, variantsPerKey: 10 },
  evidence_present: { ...orig.coverage?.evidence_present, variantsPerKey: 10, investigationStages: [1, 2, 3] },
  dossier: { ...orig.coverage?.dossier, variantsPerKey: 10, lieBands: ['early', 'mid', 'late'] },
  witness: { ...orig.coverage?.witness, variantsPerKey: 10 },
  aftermath: { ...orig.coverage?.aftermath, variantsPerKey: 5 },
  system_message: { ...orig.coverage?.system_message, variantsPerKey: 5 },
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

// === 7. 통계 출력 ===
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

console.log('\n## 채널별 작업 stats');
for (const [k, v] of Object.entries(stats)) {
  console.log(`  ${k}: ${JSON.stringify(v)}`);
}

// === 8. 새 spouse-01.json 저장 (먼저 tmp/ 에 저장, 검증 후 src/data/로 이동) ===
const outPath = path.join(__dirname, 'spouse-01-merged.json');
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2), 'utf8');
console.log(`\n저장: ${outPath}`);
console.log(`사이즈: ${(fs.statSync(outPath).size / 1024 / 1024).toFixed(2)} MB`);
