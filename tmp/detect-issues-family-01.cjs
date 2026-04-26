// family-01 1차 통합본에서 잘못 패턴 #6 + 조사 오류 + 번역체 자동 검출
const fs = require('fs');
const path = require('path');

const TARGET = path.resolve(__dirname, 'family-01-merged.json');
const OUT = path.resolve(__dirname, 'detected-issues-family-01.json');

const data = JSON.parse(fs.readFileSync(TARGET, 'utf8'));

// 검출 패턴
const PATTERNS = {
  // 사용자 모범 #1: 약한 단어 "쪽" — NPC voice 보존 (자동 변환 X, 검출만)
  weak_쪽: /(\S+)\s*쪽으로(?!\s*(?:마음이|기울))|어느\s*쪽이(?!\s*더\s*컸)|쪽이었\b|쪽인\b|쪽은\b|쪽까지|쪽으로의|판단이\s*바뀐\s*쪽/g,
  // 사용자 모범 #4: 명사형 어색 ("X 돌봄/지원")
  noun_action: /(\S+)\s+돌봄|(\S+)\s+지원(?!\s*(?:했|해|하|받|되))|(\S+)\s+처리(?!\s*(?:했|해|하|된|되))|(\S+)\s+회피(?!\s*(?:하|해|했))|(\S+)\s+은폐(?!\s*(?:하|해|했))/g,
  // 번역체 9패턴
  trans_style: /된\s*것으로\s*생각|인\s*측면이\s*있|부득이하게|미리\s*말씀드리지\s*못한|특정\s+\S+|을\s*통하여|에\s*대해서|만을\b/g,
  // 재판관 기계적 관찰문
  mechanical_observ: /태도에\s*변화가\s*감지|내용이\s*확인됩니다|흐름이\s*나타납니다|변화가\s*감지됩니다/g,
  // 시스템 관찰 + 직접 인용 결합
  direct_quote_combo: /'[^']{2,}'.*라고\s*하셨/g,
  // 부인 동사 (부정으로 교체)
  honor_부인: /\b부인\b/g,
  // 조사 오류 (Codex P0 패턴)
  particle_error: /\S+(?:을|를|는|은|이|가)\s*(?:숨긴|처리한|피한|있었고|단순한|어떻게|진실보다|남편의|아내의|단순)\s*(?:것)/g,
  // 조사 + 종결 어미 오류 ("것는", "것를", "것와", "것였")
  particle_ending: /것는|것를|것와|것였|것로/g,
};

// 모든 variant 순회
const allVariants = [];
for (const [chName, ch] of Object.entries(data.channels || {})) {
  for (const e of ch.entries || []) {
    for (const v of e.variants || []) {
      allVariants.push({
        channel: chName,
        cellKey: e.key,
        variantId: v.id,
        text: v.text || '',
        meta: {
          party: e.party,
          disputeId: e.disputeId,
          lieState: e.lieState,
          evidenceId: e.evidenceId,
          lieBand: e.lieBand,
          stage: e.stage,
          questionType: e.questionType,
          tone: e.tone,
        },
      });
    }
  }
}

// 검출
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

console.log('=== family-01 통합본 검출 결과 ===');
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
console.log(`\n저장: ${OUT} (${detected.length} entries)`);
