// 진실 누설 광범위 검출
// 게임 핵심 원칙: "진실은 플레이어가 직접 밝혀낸다"
// 어떤 채널도 NPC 자백 전에 진실을 직접 노출하면 안 됨
//
// 검출 대상 채널: 재판관 4 채널 + 시스템 메시지 + dossier (조사 안내)
// (NPC 채널은 lieState 단계 따라 점진 노출이 정상)

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 사건별 진실 키워드 — surfaceName이 아닌 본질 콘텐츠
const TRUTH_KEYWORDS = {
  'spouse-01': {
    // 핵심 누설: e-4 진실 = "형 문자" / "조카 학교 알림" / "조카 관련 문자"
    e4_real: /형\s*(이?\s*보낸)?\s*문자|조카\s*(학교\s*)?(알림|문자)|조카\s*관련\s*문자|형의\s*문자|친형\s*문자/g,
    // 사건 진실 콘텐츠
    family_real: /형\b|조카\b|친형|돌봄|가족(을\s*)?(돌본|돌보는|돌)/g,
    // h-d3, h-d4 진실
    e7_real: /위임장\s*조작|적금\s*조작/g,
    investment_real: /투자\s*사기|투자방\s*사기/g,
    bro_debt_real: /형\s*빚|형의\s*빚/g,
  },
  'family-01': {
    // 핵심 누설: e-7 진실 = "출생 비밀"
    birth_secret: /출생\s*비밀|배다른\s*자식|아버지\s*피는?\s*아니|혈연(이|이\s*다른|관련)/g,
    // dossier 카드 (h-d4 출생 비밀 관련) 진실 노출
    diary_truth: /일기장의?\s*(말|문장|기록).*(아버지|형|혈연|출생)/g,
    twenty_year_truth: /20년\s*동안\s*B\s*돈|정후\s*돈으로\s*어머니|동생\s*돈으로\s*형/g,
  },
  'friend-01': {
    // 핵심 누설: A 아버지의 돈 갈취 / 사기 진실
    father_scam: /아버지\s*(의)?\s*(사기|투자\s*사기|돈\s*갈취|돈을?\s*가져|돈\s*떼)/g,
    father_real: /A\s*아버지|송다은\s*아버지\s*가\s*(예비\s*신랑|사위|돈\s*받|사기)/g,
    pattern_repeat: /같은\s*패턴이?\s*반복|이\s*패턴이\s*반복|아버지가?\s*예전에도/g,
    fiance_first: /예비\s*신랑(이?\s*먼저\s*B에게)?\s*(찝적|선\s*넘은\s*메시지)/g,
  },
};

const TARGET_CHANNELS = ['judge_question', 'judge_contradiction', 'judge_evidence_combo', 'judge_witness_summon', 'system_message'];

const results = {};

for (const c of Object.keys(TRUTH_KEYWORDS)) {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/scriptedText/' + c + '.json')));
  const cd = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/cases/generated/' + c + '.json')));
  const evMap = Object.fromEntries(cd.evidence.map(e => [e.id, {surface: e.surfaceName, real: e.name}]));

  const leaks = [];
  for (const ch of TARGET_CHANNELS) {
    for (const e of data.channels[ch]?.entries || []) {
      for (const v of e.variants || []) {
        const text = v.text || '';
        const hits = [];
        for (const [keyName, pat] of Object.entries(TRUTH_KEYWORDS[c])) {
          pat.lastIndex = 0;
          const matches = [...text.matchAll(pat)];
          if (matches.length > 0) {
            hits.push({pattern: keyName, matches: matches.map(m => m[0])});
          }
        }
        // 추가: e-4 surface name "발신자 미상 문자" 외에 "형 문자" 등 진실 호칭 검출
        // 이미 위 정규식에서 처리
        if (hits.length > 0) {
          leaks.push({
            channel: ch, key: e.key, id: v.id,
            text,
            hits,
          });
        }
      }
    }
  }
  results[c] = leaks;
}

// 출력
console.log('=== 진실 누설 검출 결과 (재판관 4채널 + system_message) ===\n');
let totalLeaks = 0;
for (const [c, leaks] of Object.entries(results)) {
  console.log('### ' + c + ' (' + leaks.length + '건)');
  if (leaks.length === 0) {
    console.log('  ✓ 0건');
    continue;
  }
  totalLeaks += leaks.length;
  // 채널별 분포
  const byCh = {};
  for (const l of leaks) byCh[l.channel] = (byCh[l.channel] || 0) + 1;
  console.log('  채널별:', JSON.stringify(byCh));
  // 패턴별
  const byPat = {};
  for (const l of leaks) for (const h of l.hits) byPat[h.pattern] = (byPat[h.pattern] || 0) + 1;
  console.log('  패턴별:', JSON.stringify(byPat));
  // sample 5건
  console.log('  sample 5건:');
  for (const l of leaks.slice(0, 5)) {
    console.log('   - ' + l.id + ' [' + l.channel + ']');
    console.log('     hits:', l.hits.map(h => h.matches.join('+')).join(' / '));
    console.log('     text:', l.text.slice(0, 200));
  }
  console.log('');
}

console.log('\n총 누설 의심 entries:', totalLeaks);

fs.writeFileSync(path.join(ROOT, 'tmp/truth-leak-detection.json'), JSON.stringify(results, null, 2));
console.log('상세: tmp/truth-leak-detection.json');
