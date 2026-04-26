// friend-01 1차 통합본 잘못 패턴 #6 + 조사 오류 + 번역체 자동 검출
const fs = require('fs');
const path = require('path');

const TARGET = path.resolve(__dirname, 'friend-01-merged.json');
const OUT = path.resolve(__dirname, 'detected-issues-friend-01.json');

const data = JSON.parse(fs.readFileSync(TARGET, 'utf8'));

const PATTERNS = {
  weak_쪽: /(\S+)\s*쪽으로(?!\s*(?:마음이|기울))|어느\s*쪽이(?!\s*더\s*컸)|쪽이었\b|쪽인\b|쪽은\b|쪽까지|쪽으로의|판단이\s*바뀐\s*쪽/g,
  noun_action: /(\S+)\s+돌봄|(\S+)\s+지원(?!\s*(?:했|해|하|받|되))|(\S+)\s+처리(?!\s*(?:했|해|하|된|되))|(\S+)\s+회피(?!\s*(?:하|해|했))|(\S+)\s+은폐(?!\s*(?:하|해|했))/g,
  trans_style: /된\s*것으로\s*생각|인\s*측면이\s*있|부득이하게|미리\s*말씀드리지\s*못한|특정\s+\S+|을\s*통하여|에\s*대해서|만을\b/g,
  mechanical_observ: /태도에\s*변화가\s*감지|내용이\s*확인됩니다|흐름이\s*나타납니다|변화가\s*감지됩니다/g,
  direct_quote_combo: /'[^']{2,}'.*라고\s*하셨/g,
  honor_부인: /\b부인\b/g,
  particle_ending: /것는|것를|것와|것였|것로/g,
};

const allVariants = [];
for (const [chName, ch] of Object.entries(data.channels || {})) {
  for (const e of ch.entries || []) {
    for (const v of e.variants || []) {
      allVariants.push({
        channel: chName,
        cellKey: e.key,
        variantId: v.id,
        text: v.text || '',
      });
    }
  }
}

const detected = [];
const channelHits = {};
const patternHits = {};

for (const v of allVariants) {
  const hits = [];
  for (const [name, pat] of Object.entries(PATTERNS)) {
    pat.lastIndex = 0;
    const matches = [...v.text.matchAll(pat)];
    if (matches.length) {
      hits.push({ pattern: name, matches: matches.map(m => m[0]) });
      patternHits[name] = (patternHits[name] || 0) + matches.length;
    }
  }
  if (hits.length) {
    detected.push({ ...v, hits });
    channelHits[v.channel] = (channelHits[v.channel] || 0) + 1;
  }
}

console.log('=== friend-01 통합본 검출 결과 ===');
console.log(`총 variants: ${allVariants.length}`);
console.log(`검출: ${detected.length} (${((detected.length / allVariants.length) * 100).toFixed(1)}%)`);
console.log('');
console.log('## 패턴별 분포');
for (const [k, v] of Object.entries(patternHits).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}
console.log('');
console.log('## 채널별 검출 분포');
for (const [k, v] of Object.entries(channelHits).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}

fs.writeFileSync(OUT, JSON.stringify({ totalVariants: allVariants.length, detected, patternHits, channelHits }, null, 2));
console.log(`\n저장: ${OUT}`);
