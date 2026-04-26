// judge_contradiction 18 entries 정확히 추출 + 톤 보정 8원칙 점검 보조
const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '../src/data/scriptedText/spouse-01.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

const out = [];
const log = (...a) => out.push(a.join(' '));

const jc = data.channels.judge_contradiction.entries;
log('## judge_contradiction 6 keys × 3v = 18 entries — 톤 보정 점검\n');

// 톤 보정 8원칙 자동 점검 (단순 키워드 기반, 메인이 최종 판정)
function checkPrinciples(text) {
  const flags = [];
  // 1. 호칭 — "부인" 단어 검출
  if (/\b부인\b/.test(text)) flags.push('1.호칭위반:"부인"단어');
  // 4. 추상 표현 검출
  if (/그 단어로는|그것만으로는|충분치 않습니다/.test(text)) flags.push('4.추상표현');
  // 6. 단정형 위협 검출
  if (/답이 되지 않습니다|답이 되지 않으십니다/.test(text)) flags.push('6.단정형위협');
  // 번역체 검출
  if (/된 것으로 생각|인 측면이 있|부득이하게|미리 말씀드리지 못한|특정 [^ ]+/.test(text)) flags.push('번역체위반');
  // "사전 상의/협의" — S0~S2 NPC 발화에서만 금지 (재판관 발화는 OK이므로 점검 X)
  // 직접 인용 결합 검출
  if (/'[^']+'.*라고\s*하셨는데.*'[^']+'.*라는/.test(text)) flags.push('직접인용결합');
  if (/내용이 확인됩니다|흐름이 나타납니다|태도에 변화가 감지됩니다/.test(text)) flags.push('기계적관찰문');
  // 글자수 (재판관 30~70자)
  const len = text.length;
  if (len < 30) flags.push(`길이부족(${len}자)`);
  if (len > 70) flags.push(`길이초과(${len}자)`);
  return flags;
}

for (const e of jc) {
  log(`### ${e.key} (${JSON.stringify({disputeId: e.disputeId, tone: e.tone})})`);
  for (const v of e.variants) {
    const flags = checkPrinciples(v.text);
    log(`  [${v.id}] (${v.text.length}자)`);
    log(`    text: "${v.text}"`);
    log(`    behavior: "${v.behaviorHint}"`);
    log(`    flags: ${flags.length ? flags.join(', ') : 'OK (자동 검출 없음 — 메인 최종 판정 필요)'}`);
    log('');
  }
}

const result = out.join('\n');
fs.writeFileSync(path.resolve(__dirname, 'judge-contradiction-extract.txt'), result, 'utf8');
console.log(result);
