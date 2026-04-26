// 검출 결과 정밀 필터링 — false positive 제거
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'detected-issues.json'), 'utf8'));
const detected = data.detected;

// lexeme 적용 규칙:
// - 위임장/삼천만원/이천만원: S0/S1 NPC 발화에서만 위반
//   - lieState S2+ 는 OK
//   - 재판관 발화 (judge_*) 는 OK (재판관은 사실 알고 있음)
//   - aftermath 는 OK (판결 후 narrative)
//   - evidence_present의 lieBand: early ≈ S0/S1 / mid ≈ S2/S3 / late ≈ S4/S5
//   - investigationStage 1/2/3 은 lieState 무관 (정보 깊이 차원) — lexeme 적용 안 함

// noun_action 정밀 필터: 진짜 명사형만 (false positive 제거)
function isRealNounAction(matches, text) {
  return matches.filter(m => {
    // "X 처리한", "X 처리해", "X 처리하" 등은 동사형 — 제외
    // m은 "X 처리" 패턴 매칭
    const idx = text.indexOf(m);
    if (idx === -1) return false;
    const after = text.slice(idx + m.length, idx + m.length + 3);
    // 다음 글자가 한/된/할/하/해/했 면 동사형 — 제외
    if (/^[한된할하해했]/.test(after)) return false;
    // X 자체가 자연스러운 명사구일 경우 (예: "또 다른 회피", "그 회피", "사정 은폐") → 메인 검토 필요
    return true;
  });
}

// weak_쪽 정밀 필터
function isRealWeakSide(matches, text) {
  return matches.filter(m => {
    // "한쪽으로", "양쪽이", "~던 쪽이" 같은 자연 표현 제외
    if (/(?:양쪽|한쪽|반대쪽|어느\s*쪽이\s*더\s*컸)/.test(m)) return false;
    return true;
  });
}

function shouldApplyLexeme(entry) {
  // 채널별 적용 여부
  const channel = entry.channel;
  if (channel.startsWith('judge_')) return false; // 재판관 발화 OK
  if (channel === 'aftermath') return false; // 판결 후 narrative OK
  if (channel === 'system_message') return false; // 시스템 메시지 OK
  if (channel === 'mediation') return false; // Phase 6 중재 — 양측 인정 단계
  if (channel === 'rapport_milestone' || channel === 'contradict_milestone') return false; // milestone OK

  // lieState 체크
  const lieState = entry.meta?.lieState;
  if (lieState && !['S0', 'S1'].includes(lieState)) return false;

  // lieBand 체크 (evidence_present)
  const lieBand = entry.meta?.lieBand;
  if (lieBand) {
    if (!['early'].includes(lieBand)) return false;
  }

  return true;
}

// 정밀 필터 적용
const refined = [];
for (const e of detected) {
  const realHits = [];
  for (const h of e.hits) {
    if (h.pattern === 'noun_action') {
      const real = isRealNounAction(h.matches, e.text);
      if (real.length) realHits.push({ ...h, matches: real });
    } else if (h.pattern === 'weak_쪽') {
      const real = isRealWeakSide(h.matches, e.text);
      if (real.length) realHits.push({ ...h, matches: real });
    } else if (h.pattern.startsWith('s0_s2_lexeme')) {
      if (shouldApplyLexeme(e)) realHits.push(h);
    } else {
      realHits.push(h);
    }
  }
  if (realHits.length) {
    refined.push({ ...e, hits: realHits });
  }
}

// 결과 통계
const channelHits = {};
const patternHits = {};
for (const e of refined) {
  channelHits[e.channel] = (channelHits[e.channel] || 0) + 1;
  for (const h of e.hits) {
    patternHits[h.pattern] = (patternHits[h.pattern] || 0) + 1;
  }
}

console.log(`=== 정밀 필터링 후 ===`);
console.log(`정밀 검출: ${refined.length} entries (전 326 → ${refined.length})\n`);
console.log('## 패턴별 분포');
for (const [k, v] of Object.entries(patternHits).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}
console.log('');
console.log('## 채널별 분포');
for (const [k, v] of Object.entries(channelHits).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}

// 채널별로 그룹핑하여 sample 출력
console.log('\n## 채널별 첫 5 entries 샘플 (메인 검토용)');
const grouped = {};
for (const e of refined) {
  grouped[e.channel] ??= [];
  grouped[e.channel].push(e);
}
for (const [ch, arr] of Object.entries(grouped).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n### ${ch} (${arr.length}건, 첫 5건):`);
  for (const e of arr.slice(0, 5)) {
    console.log(`  [${e.variantId}] (${e.text.length}자)`);
    console.log(`    text: "${e.text}"`);
    console.log(`    hits: ${e.hits.map(h => `${h.pattern}=[${h.matches.join(',')}]`).join(' / ')}`);
  }
}

fs.writeFileSync(
  path.resolve(__dirname, 'refined-issues.json'),
  JSON.stringify({ count: refined.length, refined }, null, 2)
);
console.log(`\n저장: tmp/refined-issues.json`);
