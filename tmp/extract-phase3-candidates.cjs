// Phase 3 보정 후보 자동 검출
// 대상: interrogation S3/S4/S5 (360 entries) + interjection (24) + emotional_overload (8) = 392
const fs = require('fs');
const path = require('path');
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/scriptedText/spouse-01.json'), 'utf8'));

const out = [];
const log = (...a) => out.push(a.join(' '));

// 검출 패턴 (잘못 패턴 #6 모범)
const PATTERNS = {
  weak_word_쪽: /(\S+)\s*쪽으로(?!\s*마음이\s*기울)|어느\s*쪽이(?!\s*더\s*컸)|쪽이었\b|쪽인\b|쪽은\b|쪽까지/g, // "쪽" 약한 단어 (자연스러운 케이스 제외)
  noun_form_action: /\S+\s+돌봄|\S+\s+지원|\S+\s+처리|\S+\s+회피|\S+\s+은폐(?!해|하)/g, // 명사형 (X 돌봄 등)
  trans_style: /된\s*것으로\s*생각|인\s*측면이\s*있|부득이하게|사전\s*상의|사전\s*협의|미리\s*말씀드리지\s*못한|특정\s+\S+|을\s*통하여|에\s*대해서|만을\b/g,
  mechanical_observ: /태도에\s*변화가\s*감지|내용이\s*확인됩니다|흐름이\s*나타납니다/g,
  direct_quote: /'[^']{2,}'.*라고\s*하셨/g,
  honor_violation: /\b부인\b/g,
};

function detect(text) {
  const hits = [];
  for (const [name, pat] of Object.entries(PATTERNS)) {
    const m = text.match(pat);
    if (m) hits.push(`${name}:[${m.join(', ')}]`);
  }
  return hits;
}

function checkLength(text, channel) {
  const limits = {
    interrogation: { min: 35, max: 90 }, // NPC 40~80자 + ±10 편차
    interjection: { min: 30, max: 90 },
    emotional_overload: { min: 30, max: 100 },
  };
  const lim = limits[channel] || { min: 30, max: 90 };
  if (text.length < lim.min) return `짧음(${text.length}자)`;
  if (text.length > lim.max) return `김(${text.length}자)`;
  return null;
}

let total = 0, candidates = 0;

// 1. interrogation S3/S4/S5
log('=== Phase 3 보정 후보 검출 결과 ===\n');
log('## 1. interrogation S3/S4/S5 (자백/인지 변화 단계, 360 entries)');
const interr = data.channels.interrogation.entries.filter(e => ['S3', 'S4', 'S5'].includes(e.lieState));
log(`  실제 entries: ${interr.reduce((s,e)=>s+e.variants.length,0)}\n`);
for (const e of interr) {
  for (const v of e.variants) {
    total++;
    const hits = detect(v.text);
    const lenIssue = checkLength(v.text, 'interrogation');
    if (hits.length || lenIssue) {
      candidates++;
      log(`### [${v.id}] ${e.party}|${e.disputeId}|${e.lieState}|${e.questionType}`);
      log(`  text (${v.text.length}자): "${v.text}"`);
      if (hits.length) log(`  검출: ${hits.join(' / ')}`);
      if (lenIssue) log(`  길이: ${lenIssue}`);
      log('');
    }
  }
}

// 2. interjection 24 entries
log('## 2. interjection (24 entries — 발화 중간 끼어들기)');
const intj = data.channels.interjection.entries;
log(`  실제 entries: ${intj.reduce((s,e)=>s+e.variants.length,0)}\n`);
for (const e of intj) {
  for (const v of e.variants) {
    total++;
    const hits = detect(v.text);
    const lenIssue = checkLength(v.text, 'interjection');
    if (hits.length || lenIssue) {
      candidates++;
      log(`### [${v.id}] ${e.party}|${e.disputeId}|${e.severity}`);
      log(`  text (${v.text.length}자): "${v.text}"`);
      if (hits.length) log(`  검출: ${hits.join(' / ')}`);
      if (lenIssue) log(`  길이: ${lenIssue}`);
      log('');
    }
  }
}

// 3. emotional_overload 8 entries
log('## 3. emotional_overload (8 entries — 감정 과부하)');
const eo = data.channels.emotional_overload.entries;
log(`  실제 entries: ${eo.reduce((s,e)=>s+e.variants.length,0)}\n`);
for (const e of eo) {
  for (const v of e.variants) {
    total++;
    const hits = detect(v.text);
    const lenIssue = checkLength(v.text, 'emotional_overload');
    if (hits.length || lenIssue) {
      candidates++;
      log(`### [${v.id}] ${e.party}|${e.disputeId}`);
      log(`  text (${v.text.length}자): "${v.text}"`);
      if (hits.length) log(`  검출: ${hits.join(' / ')}`);
      if (lenIssue) log(`  길이: ${lenIssue}`);
      log('');
    }
  }
}

log(`\n=== 종합: 총 ${total} entries 중 ${candidates}건 검출 ===`);
console.log(out.join('\n'));
fs.writeFileSync(path.resolve(__dirname, 'phase3-candidates.txt'), out.join('\n'));
