// 3 사건 ScriptedText에서 재판관 4 채널만 발췌하여 source 파일로 저장
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'gpt-pro-runs/script-redo-20260426/source');

const JUDGE_CHANNELS = ['judge_question', 'judge_contradiction', 'judge_evidence_combo', 'judge_witness_summon'];

for (const cId of ['spouse-01', 'family-01', 'friend-01']) {
  const stPath = path.join(ROOT, 'src/data/scriptedText/' + cId + '.json');
  const data = JSON.parse(fs.readFileSync(stPath, 'utf8'));
  const judgeOnly = {
    caseId: cId,
    extractedAt: new Date().toISOString(),
    note: '재판관 4 채널만 발췌 (judge_question / judge_contradiction / judge_evidence_combo / judge_witness_summon)',
    channels: {},
  };
  let totalVariants = 0;
  for (const ch of JUDGE_CHANNELS) {
    if (data.channels[ch]) {
      judgeOnly.channels[ch] = data.channels[ch];
      const v = (data.channels[ch].entries || []).reduce((s, e) => s + (e.variants?.length || 0), 0);
      totalVariants += v;
    }
  }
  judgeOnly.totalVariants = totalVariants;
  const outPath = path.join(OUT_DIR, '02-scriptedText-' + cId + '-judge.json');
  fs.writeFileSync(outPath, JSON.stringify(judgeOnly, null, 2), 'utf8');
  console.log(cId + ': ' + totalVariants + ' variants → ' + outPath);
}
