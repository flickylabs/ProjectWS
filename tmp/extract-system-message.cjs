// system_message 12 entries 추출
const fs = require('fs');
const path = require('path');
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/scriptedText/spouse-01.json'), 'utf8'));
const out = [];
const log = (...a) => out.push(a.join(' '));
const sm = data.channels.system_message.entries;
log('## system_message 6 keys × 2v = 12 entries\n');
for (const e of sm) {
  log(`### ${e.key} (context=${e.context}, eventType=${e.eventType})`);
  for (const v of e.variants) {
    log(`  [${v.id}] (${v.text.length}자)`);
    log(`    text: "${v.text}"`);
    log(`    behavior: "${v.behaviorHint || '(없음)'}"`);
    log('');
  }
}
console.log(out.join('\n'));
fs.writeFileSync(path.resolve(__dirname, 'system-message-extract.txt'), out.join('\n'));
