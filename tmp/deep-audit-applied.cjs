// 9 세션 적용 후 통합본 광범위 심층 audit
// 메인 잘못 패턴 #1 회피: agent 보고 무비판 수용 X. 직접 read 검증.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const cases = ['spouse-01', 'family-01', 'friend-01'];

// 사건별 인물 매트릭스
const PARTY_NAMES = {
  'spouse-01': { a: '박지연', b: '이준호', otherCases: ['윤태성', '윤정후', '송다은', '최수민'] },
  'family-01': { a: '윤태성', b: '윤정후', otherCases: ['박지연', '이준호', '송다은', '최수민'] },
  'friend-01': { a: '송다은', b: '최수민', otherCases: ['박지연', '이준호', '윤태성', '윤정후'] },
};

// 사건별 lexeme (S0~S2 노출 금지 = Truth Throttle)
const TRUTH_LEXEMES = {
  'spouse-01': /3\s*,?000만\s*원|3000만원|위임장|박미라|투자\s*사기|2\s*,?000만\s*원/g,
  'family-01': /\b60\b|\b40\b|\b90\b|출생\s*비밀|일기장|20년/g,
  'friend-01': /\b9일\b|\b6번\b|\b11번\b|아버지\s*돈|사기/g,
};

const results = {};

for (const c of cases) {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/scriptedText/' + c + '.json')));
  const r = { caseId: c, variants: 0, issues: { critical: [], high: [], medium: [], low: [] } };

  // 모든 variants 추출
  const all = [];
  for (const [chName, ch] of Object.entries(data.channels || {})) {
    for (const e of ch.entries || []) {
      for (const v of e.variants || []) {
        if (v.text) {
          all.push({
            channel: chName,
            cellKey: e.key,
            id: v.id,
            text: v.text,
            party: e.party,
            lieState: e.lieState,
            speaker: e.speaker,
          });
        }
      }
    }
  }
  r.variants = all.length;

  const partyA = PARTY_NAMES[c].a;
  const partyB = PARTY_NAMES[c].b;
  const otherCases = PARTY_NAMES[c].otherCases;

  for (const v of all) {
    const isJudge = /^judge_/.test(v.channel);
    const isSystem = /^system|^evidence_discovery|^aftermath|^contradict_milestone|^rapport_milestone/.test(v.channel);

    // === CRITICAL ===
    // C1. 다른 사건 인물 혼입
    for (const otherName of otherCases) {
      if (v.text.includes(otherName)) {
        r.issues.critical.push({
          type: 'other_case_name',
          channel: v.channel, id: v.id,
          name: otherName,
          text: v.text.slice(0, 100),
        });
        break;
      }
    }
    // C2. 증인 씨 / 증인 분 호칭
    if (/증인\s*씨|증인\s*분/.test(v.text)) {
      r.issues.critical.push({ type: 'witness_title', channel: v.channel, id: v.id, text: v.text.slice(0, 100) });
    }
    // C3. family-01 비율 반대 패턴 (이전 GPT 잘못)
    if (c === 'family-01') {
      // A 60 / B 40 패턴 검출
      const badPatterns = [
        /형\s*60[\s가-힣,]*저\s*40/,
        /제가\s*60[\s가-힣,]*제?\s*동생\s*40/,
        /제\s*60[\s가-힣,]*형\s*40/,
        /\b90을\s*40으로\b/,
        /\b90에서\s*40으로\b/,
      ];
      for (const p of badPatterns) {
        if (p.test(v.text)) {
          r.issues.critical.push({
            type: 'family_ratio_inverted',
            pattern: p.source,
            channel: v.channel, id: v.id, party: v.party,
            text: v.text.slice(0, 200),
          });
          break;
        }
      }
    }

    // === HIGH ===
    // H1. 재판관 호칭 위반 ("제 아내" / "제 남편" 등)
    if (isJudge && /\b제\s*(아내|남편|형|동생|친구)\b/.test(v.text)) {
      r.issues.high.push({ type: 'judge_call_violation', channel: v.channel, id: v.id, text: v.text.slice(0, 120) });
    }
    // H2. 변수 치환 패턴 잔존 (judge_evidence_combo)
    if (v.channel === 'judge_evidence_combo') {
      const templPatterns = [
        /^이 자료들을 함께 보겠습니다\./,
        /이 조합의 뜻은 분명합니다/,
        /^.{1,30}이 같은 방향입니다\./,
        /.+ 카드가 열린 만큼/,
      ];
      for (const p of templPatterns) {
        if (p.test(v.text)) {
          r.issues.high.push({ type: 'template_pattern', pattern: p.source, channel: v.channel, id: v.id, text: v.text.slice(0, 120) });
          break;
        }
      }
    }
    // H3. 기계적 관찰문 (재판관/시스템)
    if ((isJudge || isSystem) && /태도에\s*변화가\s*감지|내용이\s*확인됩니다|흐름이\s*나타납니다|변화가\s*감지됩니다/.test(v.text)) {
      r.issues.high.push({ type: 'mechanical_observ', channel: v.channel, id: v.id, text: v.text.slice(0, 120) });
    }
    // H4. 직접 인용 + 시스템 관찰 결합
    if (/'[^']{2,}'.*라고\s*하셨/.test(v.text)) {
      r.issues.high.push({ type: 'direct_quote_combo', channel: v.channel, id: v.id, text: v.text.slice(0, 120) });
    }
    // H5. 깨진 조사
    if (/것는|것를|것와|것였|것로|을\s+것/.test(v.text)) {
      const m = v.text.match(/것는|것를|것와|것였|것로/);
      if (m) {
        r.issues.high.push({ type: 'broken_particle', match: m[0], channel: v.channel, id: v.id, text: v.text.slice(0, 120) });
      }
    }
    // H6. Truth Throttle 위반 (S0~S2)
    if (v.lieState && ['S0', 'S1', 'S2'].includes(v.lieState) && !isJudge && !isSystem) {
      const re = TRUTH_LEXEMES[c];
      const matches = v.text.match(re);
      if (matches) {
        r.issues.high.push({
          type: 'truth_throttle',
          lieState: v.lieState,
          matches: matches.slice(0, 3),
          channel: v.channel, id: v.id,
          text: v.text.slice(0, 150),
        });
      }
    }

    // === MEDIUM ===
    // M1. 부인 동사
    if (/\b부인하|\b부인\b/.test(v.text) && !v.text.includes('아내') && !v.text.includes('부인의')) {
      r.issues.medium.push({ type: 'buin_verb', channel: v.channel, id: v.id, text: v.text.slice(0, 100) });
    }
    // M2. 번역체 9패턴
    const transPatterns = [
      /된\s*것으로\s*생각/,
      /인\s*측면이\s*있/,
      /부득이하게/,
      /미리\s*말씀드리지\s*못한/,
      /을\s*통하여/,
    ];
    for (const p of transPatterns) {
      if (p.test(v.text)) {
        r.issues.medium.push({ type: 'translation_style', pattern: p.source, channel: v.channel, id: v.id, text: v.text.slice(0, 100) });
        break;
      }
    }

    // === LOW (참고만) ===
    // L1. weak_쪽 (NPC voice 보존 영역이라 정보용)
    // (skip — 너무 많아서 결과 보고만)
  }

  results[c] = r;
}

// 결과 출력
console.log('=== 심층 audit 결과 ===\n');
for (const [c, r] of Object.entries(results)) {
  console.log('### ' + c + ' (' + r.variants + ' variants) ###');
  for (const level of ['critical', 'high', 'medium']) {
    const arr = r.issues[level];
    console.log('  ' + level.toUpperCase() + ': ' + arr.length);
    if (arr.length > 0) {
      // 타입별 그룹
      const byType = {};
      for (const issue of arr) {
        byType[issue.type] = (byType[issue.type] || 0) + 1;
      }
      for (const [t, n] of Object.entries(byType)) {
        console.log('    - ' + t + ': ' + n);
      }
      // 샘플 (각 타입 3건)
      const samplesShown = {};
      for (const issue of arr) {
        if ((samplesShown[issue.type] || 0) >= 2) continue;
        samplesShown[issue.type] = (samplesShown[issue.type] || 0) + 1;
        console.log('    sample [' + issue.type + ']: ' + issue.id + ' [' + issue.channel + ']');
        console.log('      ' + issue.text);
      }
    }
  }
  console.log('');
}

fs.writeFileSync(path.join(__dirname, 'deep-audit-result.json'), JSON.stringify(results, null, 2));
console.log('\n저장: tmp/deep-audit-result.json');
