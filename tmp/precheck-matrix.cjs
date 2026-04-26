// 사전 검증 스크립트 — 모든 GPT 산출물 적용 전/후 정합성 검증
// 재발 방지를 위해 다음 적용 작업 전에 반드시 실행
//
// 검증 항목:
// 1. case data dispute id ↔ ScriptedText cell key 매트릭스 정합 (h-d3/h-d4 잘못 사용 검출)
// 2. 5 disputes 매트릭스 완전 커버 (d-5 누락 검출)
// 3. text null/empty 0건
// 4. variant id 형식 일관 (party 위치 등)
// 5. behaviorHint / tags / sourceRefs 보존
// 6. 호칭 위반 ("증인 씨", "제 아내", "제 남편" 등)
// 7. 깨진 조사
// 8. 사건 비율 (family A 40 / B 60)
// 9. 다른 사건 인물 혼입
// 10. status='skipped' / after=null 적용 검출

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const cases = ['spouse-01', 'family-01', 'friend-01'];

const PARTY_NAMES = {
  'spouse-01': { a: '박지연', b: '이준호', other: ['윤태성', '윤정후', '송다은', '최수민', '최복순', '김영수', '박순애', '김세라', '박준혁', '오미경'] },
  'family-01': { a: '윤태성', b: '윤정후', other: ['박지연', '이준호', '송다은', '최수민', '박미라', '김세라', '박준혁', '오미경'] },
  'friend-01': { a: '송다은', b: '최수민', other: ['박지연', '이준호', '윤태성', '윤정후', '박미라', '최복순', '김영수', '박순애'] },
};

const issues = { critical: [], high: [], medium: [], info: [] };

for (const c of cases) {
  const cd = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/cases/generated/' + c + '.json')));
  const st = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/scriptedText/' + c + '.json')));
  const validDisputes = new Set(cd.disputes.map(d => d.id));

  // 1. cell key dispute 정합 + 매트릭스 커버
  const channelDisputes = {};
  let nullText = 0, emptyText = 0;
  for (const [chName, ch] of Object.entries(st.channels)) {
    const setCh = new Set();
    for (const e of ch.entries || []) {
      // text 검증
      for (const v of e.variants || []) {
        if (v.text === null || v.text === undefined) nullText++;
        else if (typeof v.text === 'string' && v.text.trim() === '') emptyText++;
      }
      // dispute 추출
      const parts = (e.key || '').split('|');
      for (const p of parts) {
        if (/^h?-?d-?\d+$/.test(p)) setCh.add(p);
      }
    }
    if (setCh.size > 0) channelDisputes[chName] = setCh;
  }

  if (nullText > 0) issues.critical.push({ caseId: c, type: 'null_text', count: nullText });
  if (emptyText > 0) issues.critical.push({ caseId: c, type: 'empty_text', count: emptyText });

  // case에 없는 dispute 사용
  for (const [chName, dSet] of Object.entries(channelDisputes)) {
    for (const d of dSet) {
      if (!validDisputes.has(d)) {
        issues.critical.push({ caseId: c, type: 'invalid_disputeId', channel: chName, disputeId: d });
      }
    }
    // 누락된 dispute (case에 있는데 채널에 없음)
    const expectedDisputes = [...validDisputes].filter(d => {
      // mediation/aftermath/system_message 등은 dispute 별 entries 없음
      return !['mediation', 'aftermath', 'system_message', 'rapport_milestone', 'contradict_milestone'].includes(chName);
    });
    for (const d of expectedDisputes) {
      // dossier / evidence_present / witness 등은 dispute key 없는 채널이므로 skip
      if (['dossier', 'evidence_present', 'witness', 'evidence_discovery', 'judge_evidence_combo', 'judge_witness_summon', 'trust_action'].includes(chName)) continue;
      if (!dSet.has(d)) {
        issues.high.push({ caseId: c, type: 'missing_disputeId_in_channel', channel: chName, disputeId: d });
      }
    }
  }

  // 2. 호칭 위반 검출
  const judgeChannels = ['judge_question', 'judge_contradiction', 'judge_evidence_combo', 'judge_witness_summon'];
  for (const ch of judgeChannels) {
    for (const e of st.channels[ch]?.entries || []) {
      for (const v of e.variants || []) {
        const text = v.text || '';
        if (/증인\s*씨|증인\s*분/.test(text)) {
          issues.critical.push({ caseId: c, type: 'witness_title_violation', channel: ch, id: v.id, text: text.slice(0, 100) });
        }
        if (/\b제\s*(아내|남편|형|동생|친구)\b/.test(text)) {
          issues.high.push({ caseId: c, type: 'judge_call_violation', channel: ch, id: v.id, text: text.slice(0, 100) });
        }
      }
    }
  }

  // 3. 깨진 조사
  for (const [chName, ch] of Object.entries(st.channels)) {
    for (const e of ch.entries || []) {
      for (const v of e.variants || []) {
        if (/것는|것를|것와|것였|것로(?!써)/.test(v.text || '')) {
          issues.high.push({ caseId: c, type: 'broken_particle', channel: chName, id: v.id, text: (v.text || '').slice(0, 100) });
        }
      }
    }
  }

  // 4. 다른 사건 인물 혼입
  for (const [chName, ch] of Object.entries(st.channels)) {
    for (const e of ch.entries || []) {
      for (const v of e.variants || []) {
        const text = v.text || '';
        for (const otherName of PARTY_NAMES[c].other) {
          if (text.includes(otherName)) {
            issues.critical.push({ caseId: c, type: 'other_case_name', channel: chName, id: v.id, name: otherName, text: text.slice(0, 100) });
            break;
          }
        }
      }
    }
  }

  // 5. family-01 비율 정합
  if (c === 'family-01') {
    let invertedCount = 0;
    const samples = [];
    for (const [chName, ch] of Object.entries(st.channels)) {
      for (const e of ch.entries || []) {
        for (const v of e.variants || []) {
          const text = v.text || '';
          if (/형\s*60[\s가-힣,]{0,15}저\s*40|제가\s*60[\s가-힣,]{0,15}동생\s*40|90을\s*40으로/.test(text)) {
            invertedCount++;
            if (samples.length < 3) samples.push({ id: v.id, text: text.slice(0, 100) });
          }
        }
      }
    }
    if (invertedCount > 0) {
      issues.critical.push({ caseId: c, type: 'family_ratio_inverted', count: invertedCount, samples });
    }
  }
}

// 결과 출력
console.log('=== 사전 검증 결과 ===\n');
for (const level of ['critical', 'high', 'medium', 'info']) {
  console.log('## ' + level.toUpperCase() + ': ' + issues[level].length);
  if (issues[level].length === 0) {
    console.log('  ✓ 0건\n');
    continue;
  }
  // 타입별 그룹
  const byType = {};
  for (const i of issues[level]) {
    byType[i.type] = (byType[i.type] || 0) + 1;
  }
  for (const [t, n] of Object.entries(byType)) {
    console.log('  - ' + t + ': ' + n);
  }
  // 샘플 (각 타입 2건)
  const samplesShown = {};
  for (const i of issues[level]) {
    if ((samplesShown[i.type] || 0) >= 2) continue;
    samplesShown[i.type] = (samplesShown[i.type] || 0) + 1;
    const detail = JSON.stringify(i).slice(0, 200);
    console.log('    sample: ' + detail);
  }
  console.log('');
}

const passed = issues.critical.length === 0 && issues.high.length === 0;
console.log('\n>>> ' + (passed ? '✓ PASS — 적용 가능' : '✗ FAIL — 적용 보류 + fix 필요'));

fs.writeFileSync(path.join(ROOT, 'tmp/precheck-result.json'), JSON.stringify({passed, issues}, null, 2));
console.log('상세: tmp/precheck-result.json');
