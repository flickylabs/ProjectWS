// 8 산출물의 신규 entries 잘못 패턴 #6 자동 검출
const fs = require('fs');
const path = require('path');

const PKG = path.resolve(__dirname, '../gpt-pro-runs/judge-messages-v3/_master/assets-spouse-01/gpt-pro-package');

// 검출 패턴 (잘못 패턴 #6 모범 + 톤 8원칙)
const PATTERNS = {
  weak_쪽: /(\S+)\s*쪽으로(?!\s*(?:마음이|기울))|어느\s*쪽이(?!\s*더\s*컸)|쪽이었\b|쪽인\b|쪽은\b|쪽까지|쪽으로의|판단이\s*바뀐\s*쪽/g,
  noun_action: /\S+\s+돌봄|\S+\s+지원(?!\s*했|\s*해)|\S+\s+처리(?!\s*했|\s*해|\s*하|\s*된)|\S+\s+회피(?!\s*하|\s*해|\s*했)|\S+\s+은폐(?!\s*하|\s*해|\s*했)/g,
  trans_style: /된\s*것으로\s*생각|인\s*측면이\s*있|부득이하게|미리\s*말씀드리지\s*못한|특정\s+\S+|을\s*통하여|에\s*대해서|만을\b/g,
  mechanical_observ: /태도에\s*변화가\s*감지|내용이\s*확인됩니다|흐름이\s*나타납니다|변화가\s*감지됩니다/g,
  direct_quote_combo: /'[^']{2,}'.*라고\s*하셨/g,
  honor_부인: /\b부인\b/g,
  s0_s2_lexeme_삼천: /삼천만원|3,?000만원|3000만원/g,
  s0_s2_lexeme_이천: /이천만원|2,?000만원|2000만원/g,
  s0_s2_lexeme_위임장: /위임장/g,
};

// 각 산출물의 entries 추출
function extractEntries(filepath, sessionLabel) {
  const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  const all = [];
  function pushEntries(channel, entries) {
    for (const e of entries || []) {
      for (const v of e.variants || []) {
        all.push({
          session: sessionLabel,
          channel,
          key: e.key,
          variantId: v.id,
          text: v.text || '',
          // S2/S3에는 stage / lieState 등 다양 — 첫 차원 정보만
          meta: {
            party: e.party,
            disputeId: e.disputeId,
            lieState: e.lieState,
            evidenceId: e.evidenceId,
            lieBand: e.lieBand,
            investigationStage: e.investigationStage,
            stage: e.stage,
          },
        });
      }
    }
  }

  // 형식별 처리
  if (data?.channels) {
    for (const [ch, body] of Object.entries(data.channels)) {
      if (body?.entries) pushEntries(ch, body.entries);
    }
  } else if (Array.isArray(data?.entries)) {
    // S1 patch / S2 patch / S3
    const ch = data.channel || sessionLabel.toLowerCase();
    pushEntries(ch, data.entries);
  } else if (Array.isArray(data?.aftermath)) {
    // S8
    pushEntries('aftermath', data.aftermath);
  } else if (Array.isArray(data)) {
    // S1 entries (top-level array)
    pushEntries('interrogation', data);
  }
  return all;
}

const sources = [
  { label: 'S1', file: 'sessions/S1-interrogation-variants/output/s1-interrogation-v6-v10-patch.json' },
  { label: 'S2', file: 'sessions/S2-evidence-stage-d1-d2/output/s2-evidence-present-stage-patch.json' },
  { label: 'S3', file: 'sessions/S3-evidence-stage-hd3-hd4/output/s3_evidence_present_stage_entries.json' },
  { label: 'S4', file: 'sessions/S4-dossier-witness/output/S4-dossier-witness-expanded.json' },
  { label: 'S5', file: 'sessions/S5-h-d3-h-d4-channels/output/s5-channel-expansion-only.json' },
  { label: 'S6', file: 'sessions/S6-judge-channels/output/s6-judge-channels-patch.json' },
  { label: 'S7-trust', file: 'sessions/S7-trust-mediation-system-milestone/output/10-scripted-text-s7.json' }, // 단 trust/med/sys/milestone만
  { label: 'S8-aftermath', file: 'sessions/S8-aftermath-correction/output/S8_aftermath_expansion_and_tone_patch.json' },
];

const allEntries = [];
const stats = {};

for (const src of sources) {
  const filepath = path.join(PKG, src.file);
  const entries = extractEntries(filepath, src.label);
  // S7은 전체 ScriptedText 형식이라 변경 채널만 추출
  if (src.label === 'S7-trust') {
    const filtered = entries.filter(e =>
      ['trust_action', 'mediation', 'system_message', 'rapport_milestone', 'contradict_milestone'].includes(e.channel)
    );
    allEntries.push(...filtered);
    stats[src.label] = filtered.length;
  } else {
    allEntries.push(...entries);
    stats[src.label] = entries.length;
  }
}

console.log('=== 산출물별 신규 entries 카운트 ===');
let total = 0;
for (const [k, v] of Object.entries(stats)) { console.log(`  ${k}: ${v}`); total += v; }
console.log(`  총: ${total}\n`);

// 검출 + 그룹별 카운트
const detected = [];
const channelHits = {};
const patternHits = {};

for (const e of allEntries) {
  const hits = [];
  for (const [name, pat] of Object.entries(PATTERNS)) {
    pat.lastIndex = 0;
    const matches = [...e.text.matchAll(pat)];
    if (matches.length) {
      hits.push({ pattern: name, matches: matches.map(m => m[0]) });
      patternHits[name] = (patternHits[name] || 0) + matches.length;
    }
  }
  // S0/S1 lexeme은 lieState=S0/S1 일 때만 검출 의미 (S2 이후는 OK)
  // 여기서는 hits에 모두 들어감 — 보정 단계에서 lieState 체크
  if (hits.length) {
    detected.push({ ...e, hits });
    channelHits[e.channel] = (channelHits[e.channel] || 0) + 1;
  }
}

console.log('=== 검출 결과 ===');
console.log(`총 검출: ${detected.length} entries / ${allEntries.length} (${((detected.length / allEntries.length) * 100).toFixed(1)}%)`);
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

// 검출 entries 파일로 저장
fs.writeFileSync(
  path.resolve(__dirname, 'detected-issues.json'),
  JSON.stringify({ stats, total, detected }, null, 2)
);
console.log(`\n저장: tmp/detected-issues.json (${detected.length} entries)`);
