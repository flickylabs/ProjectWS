// judge_question 24 keys × 2v = 48 entries 추출
const fs = require('fs');
const path = require('path');
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/scriptedText/spouse-01.json'), 'utf8'));
const out = [];
const log = (...a) => out.push(a.join(' '));
const jq = data.channels.judge_question.entries;
log(`## judge_question 24 keys × 2v = ${jq.reduce((s,e)=>s+e.variants.length,0)} entries\n`);
for (const e of jq) {
  log(`### ${e.key} (disputeId=${e.disputeId}, qType=${e.questionType}, depth=${e.depth})`);
  for (const v of e.variants) {
    log(`  [${v.id}] (${v.text.length}자)`);
    log(`    text: "${v.text}"`);
    if (v.behaviorHint) log(`    behavior: "${v.behaviorHint}"`);
    log('');
  }
}
console.log(out.join('\n'));
fs.writeFileSync(path.resolve(__dirname, 'judge-question-extract.txt'), out.join('\n'));
