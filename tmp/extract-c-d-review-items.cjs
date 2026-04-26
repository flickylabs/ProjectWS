// C: judge_evidence_combo shallow + 의미 모호 추출
// D: Thread-QW P2 6건 (이미 findings.json에 있음)
// 산출물: tmp/USER-REVIEW-C-*.md, tmp/USER-REVIEW-D-*.md

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const cases = ['spouse-01', 'family-01', 'friend-01'];

// ---------- C-1: judge_evidence_combo shallow ----------
const shallow = [];
for (const c of cases) {
  const d = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/scriptedText/' + c + '.json')));
  const combo = d.channels.judge_evidence_combo?.entries || [];
  for (const e of combo) {
    for (const v of e.variants) {
      const text = v.text || '';
      // shallow 기준: 60자 미만 또는 단문 (1 문장)
      const sentences = text.split(/[\.\?!]/).filter(s => s.trim().length > 5);
      if (text.length < 60 || sentences.length <= 1) {
        shallow.push({caseId: c, channel: 'judge_evidence_combo', key: e.key, id: v.id, len: text.length, text});
      }
    }
  }
}

// ---------- C-2: 의미 모호 / 추상화 ----------
// 사건 핵심 명사 없이 "그 부분", "그 흐름", "그 말", "그 점" 등 추상 표현 사용
const ambiguousPattern = /그\s*(부분|흐름|말|점|쪽|곳|일|것|순간|이야기|행동)/g;
const concreteKeywords = {
  'spouse-01': /오피스텔|위임장|적금|투자|형|조카|시댁|박지연|이준호|박미라|GPS|통화/g,
  'family-01': /유서|어머니|동생|형|일기|공증|요양|60|40|90|윤태성|윤정후|출생/g,
  'friend-01': /예비신랑|아버지|단톡|연락|투자|사기|송다은|최수민|돈|결혼/g,
};

const ambiguous = [];
for (const c of cases) {
  const d = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/scriptedText/' + c + '.json')));
  for (const [chName, ch] of Object.entries(d.channels)) {
    if (chName === 'system_message' || chName === 'evidence_discovery') continue;
    for (const e of ch.entries || []) {
      for (const v of e.variants || []) {
        const text = v.text || '';
        if (text.length < 30) continue;
        // 추상 표현 빈도
        const ambMatches = [...text.matchAll(ambiguousPattern)];
        if (ambMatches.length < 2) continue;
        // 사건 핵심 명사 카운트
        const concMatches = [...text.matchAll(concreteKeywords[c])];
        // 추상 빈도 ≥ 2 + 핵심 명사 ≤ 1 = 모호
        if (concMatches.length <= 1) {
          ambiguous.push({
            caseId: c, channel: chName, key: e.key, id: v.id,
            text,
            abstract_count: ambMatches.length,
            concrete_count: concMatches.length,
          });
        }
      }
    }
  }
}
ambiguous.sort((a, b) => b.abstract_count - a.abstract_count || a.concrete_count - b.concrete_count);

console.log('shallow:', shallow.length);
console.log('ambiguous:', ambiguous.length);

// ---------- 출력 파일 작성 ----------
let cMd = '# Thread-QW-Cross P1 — 사용자 검토용 (C)\n\n';
cMd += '## 개요\n';
cMd += '- judge_evidence_combo 함의 얕은 문장: ' + shallow.length + '건\n';
cMd += '- 의미 모호 / 추상화 후보: ' + ambiguous.length + '건\n\n';
cMd += '검토 가이드: 각 항목을 9차원 (의미/내용/맥락/archetype/lieState/추궁차원/...)에서 판단.\n';
cMd += '- 정상 (맥락상 OK) → 그대로 두기\n';
cMd += '- 보정 필요 → 메모 후 메인에게 전달 (또는 사용자가 직접 patch 작성)\n\n';
cMd += '---\n\n';

cMd += '## C-1: judge_evidence_combo 함의 얕은 문장 (' + shallow.length + '건)\n\n';
cMd += '> 두 증거가 결합한 함의가 본문에 충분히 녹지 않은 후보. 단순 이름 나열 / 짧은 단정 / 의미 추상.\n\n';
for (const s of shallow) {
  cMd += '### ' + s.caseId + ' / ' + s.id + ' [' + s.key + '] (' + s.len + '자)\n';
  cMd += '```\n' + s.text + '\n```\n\n';
}

cMd += '---\n\n## C-2: 의미 모호 / 추상화 후보 (' + ambiguous.length + '건)\n\n';
cMd += '> "그 부분", "그 흐름", "그 점" 등 추상 표현 빈도가 높고 사건 핵심 명사가 부족한 후보.\n\n';
for (const a of ambiguous.slice(0, 60)) {
  cMd += '### ' + a.caseId + ' / ' + a.id + ' [' + a.channel + ' ' + a.key + ']\n';
  cMd += '- 추상 빈도: ' + a.abstract_count + ' / 핵심 명사: ' + a.concrete_count + '\n';
  cMd += '```\n' + a.text + '\n```\n\n';
}
if (ambiguous.length > 60) {
  cMd += '\n... 그 외 ' + (ambiguous.length - 60) + '건 (raw: tmp/c-review-ambiguous-all.json)\n';
}

fs.writeFileSync(path.join(ROOT, 'tmp/USER-REVIEW-C-thread-qw-cross-p1.md'), cMd);
fs.writeFileSync(path.join(ROOT, 'tmp/c-review-shallow-all.json'), JSON.stringify(shallow, null, 2));
fs.writeFileSync(path.join(ROOT, 'tmp/c-review-ambiguous-all.json'), JSON.stringify(ambiguous, null, 2));

// ---------- D: Thread-QW P2 ----------
const findings = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp/qa-redo-20260426/QA-QW-claude-findings.json')));
const p2 = findings.p2_patches || [];

let dMd = '# Thread-QW P2 6건 — 사용자 검토용 (D)\n\n';
dMd += '## 개요\n';
dMd += 'Thread-QW (Claude) 보고: P2 6건 — 점진 보완 (낮은 우선순위).\n';
dMd += '검토 가이드: 게임 플레이 시 영향이 작은 항목들. 사용자 결정에 따라:\n';
dMd += '- 그대로 두기 (낮은 우선순위)\n';
dMd += '- 메인에게 직접 보정 요청\n';
dMd += '- GPT 추가 의뢰 작성\n\n';
dMd += '---\n\n';

for (let i = 0; i < p2.length; i++) {
  const p = p2[i];
  dMd += '## D-' + (i+1) + ': ' + p.caseId + ' / ' + p.channel + '\n';
  dMd += '- **카테고리**: ' + p.category + '\n';
  dMd += '- **영향**: ' + (p.samples_affected || 'N/A') + ' samples\n';
  dMd += '- **설명**: ' + p.description + '\n\n';
}

dMd += '\n## 추가 통계 (Thread-QW report에서)\n\n';
dMd += '### user_pattern_application (사용자 모범 4 patch 적용도)\n';
dMd += '```json\n' + JSON.stringify(findings.user_pattern_application || {}, null, 2) + '\n```\n\n';
dMd += '### machine_pattern_detected (단순 기계식 표현)\n';
dMd += '검출 ' + (findings.machine_pattern_detected || []).length + '건\n\n';
for (const m of (findings.machine_pattern_detected || []).slice(0, 5)) {
  dMd += '- ' + (m.caseId || '?') + '/' + (m.channel || '?') + ': ' + (m.text || JSON.stringify(m)).slice(0, 150) + '\n';
}
dMd += '\n### ambiguous_meaning_detected (의미 모호)\n';
dMd += '검출 ' + (findings.ambiguous_meaning_detected || []).length + '건\n';

fs.writeFileSync(path.join(ROOT, 'tmp/USER-REVIEW-D-thread-qw-p2.md'), dMd);

console.log('');
console.log('저장:');
console.log('  tmp/USER-REVIEW-C-thread-qw-cross-p1.md');
console.log('  tmp/USER-REVIEW-D-thread-qw-p2.md');
console.log('  tmp/c-review-shallow-all.json');
console.log('  tmp/c-review-ambiguous-all.json');
