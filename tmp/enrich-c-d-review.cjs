// C/D 검토 파일에 컨텍스트 추가
// - cell key 의미 분해
// - 화자/대상/lieState/questionType/tone
// - 같은 cell의 다른 variants (비교)
// - channel 의미 설명
// - archetype voice / 사건 핵심 사실
// - 발동 맥락

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 사건별 메타
const CASE_META = {
  'spouse-01': {
    name: '새벽 통화기록',
    a: { name: '박지연', role: '학원 데스크 직원, 36세', archetype: 'victim_cosplay', tell: '강한 단정 + 수치심 핑계, 외도 의심' },
    b: { name: '이준호', role: '가전매장, 38세', archetype: 'avoidant', tell: '모호어 / 회피, 시댁 갈등 두려움' },
    facts: '5,000만원 증발 (3,000 적금 해지 + 2,000 사기) / 형 빚 / 조카 돌봄 / 시댁 갈등 / 위임장 조작 / 투자 사기',
    disputes: {
      'd-1': '외도 의심 (오피스텔/새벽 전화)',
      'd-2': '이준호 비밀 송금 (외도성 vs 가족성)',
      'h-d3': '박지연 위임장 조작 (피해자 vs 가해자)',
      'h-d4': '5,000만원 순서 (3,000 + 2,000 누가 먼저)',
    },
    dossierCards: {
      'dc-1': '오피스텔의 사람들 (e-2 GPS + e-4 형 문자)',
      'dc-2': '시댁 얘기만 나오면 싸움 (e-3 통화 + e-4 문자)',
      'dc-3': '3,000만원의 권한 (e-4 + e-5 적금)',
      'dc-4': '2,000만원의 수치 (e-6 투자방)',
      'dc-5': '5,000만원의 순서 (e-5 + e-6 + e-7)',
    },
  },
  'family-01': {
    name: '치매 어머니의 유서',
    a: { name: '윤태성', role: '주방가구 공장 대표, 48세', archetype: 'confrontational', tell: '강하고 단정적, 공격적' },
    b: { name: '윤정후', role: '자동차부품 가게, 44세', archetype: 'affect_flattening', tell: '침착, 평면, 감정 안 드러냄' },
    facts: '⚠ A 40 / B 60 (B가 자기 몫 90→60) / 출생 비밀 / 20년 지원 / 어머니 일기장 / 1억 막음',
    disputes: {
      'd-1': '유서 작성과 판단 능력',
      'd-2': '60:40 유서의 진짜 의도',
      'd-3': '20년 송금의 실체',
      'd-4': '출생 비밀과 침묵의 이유',
      'd-5': '어머니 이용의 진짜 주체',
    },
    dossierCards: {},
  },
  'friend-01': {
    name: '손절한 절친',
    a: { name: '송다은', role: '온라인 쇼핑몰 CS, 31세', archetype: 'premature_summary', tell: '빠른 결론, 확인 전 단정' },
    b: { name: '최수민', role: '필라테스 강사, 31세', archetype: 'affect_flattening', tell: '침착, 침묵, 악역 자처' },
    facts: '예비신랑이 먼저 B에게 찝적댐 / A 아버지가 B에게 과거 사기 + 현재 예비신랑에게 돈 갈취 접근 / 같은 패턴 반복',
    disputes: {
      'd-1': '9일간의 연락 의도',
      'd-2': '예비신랑의 선넘는 접근',
      'd-3': '아버지의 돈 접근 패턴',
      'd-4': '과거 손절과 아버지의 사기',
      'd-5': '단톡방 매도와 명예훼손',
    },
    dossierCards: {},
  },
};

const CHANNEL_META = {
  judge_question: { desc: '재판관 정중 질문 (4 questionType × 4 depth)', speaker: '재판관', listener: '당사자', register: '합니다체' },
  judge_contradiction: { desc: '재판관 모순 추궁 (3 tone: soft/mid/hard)', speaker: '재판관', listener: '당사자', register: '합니다체 + 간접 인용' },
  judge_evidence_combo: { desc: '재판관 — dossier 카드(증거 조합) 발동 시 멘트', speaker: '재판관', listener: '당사자', register: '합니다체 + 두 증거 함의 본문 녹임' },
  judge_witness_summon: { desc: '재판관 — 증인 소환 멘트', speaker: '재판관', listener: '증인 (실명)', register: '합니다체 + 증인 실명' },
  interrogation: { desc: '심문 (party × dispute × lieState × questionType)', speaker: '당사자', listener: '재판관', register: '합니다체 + archetype voice' },
  contradiction_pursuit: { desc: '모순 추궁 응답 (party × dispute × lieState)', speaker: '당사자', listener: '재판관', register: '합니다체 + 인지 단계 변화' },
  dossier: { desc: '증거 조합 카드 응답 (dossierCard × question × lieBand)', speaker: '당사자', listener: '재판관', register: 'lieBand별 톤 다름' },
  evidence_present: { desc: '증거 제시 응답 (party × evidence × lieBand × stage/role)', speaker: '당사자', listener: '재판관', register: '합니다체' },
  witness: { desc: '증인 증언 (witness × depth)', speaker: '증인', listener: '재판관', register: '신분별 톤' },
  aftermath: { desc: '후일담 narrative', speaker: '시스템 narrator', listener: '플레이어', register: '평서체 narrative' },
  mediation: { desc: '중재 (mediation paths)', speaker: '재판관', listener: '양측', register: '중재 톤' },
  trust_action: { desc: '신뢰 행동', speaker: '당사자', listener: '재판관', register: 'trust 단계별' },
  system_message: { desc: '시스템 메시지', speaker: '시스템', listener: '플레이어', register: '평서체' },
  interjection: { desc: '끼어들기 (격앙 표현)', speaker: '당사자', listener: '상대 또는 재판관', register: '격앙 archetype voice' },
  emotional_overload: { desc: '감정 폭발', speaker: '당사자', listener: '시스템', register: '격앙 archetype voice' },
  rapport_milestone: { desc: '신뢰 마일스톤', speaker: '시스템', listener: '플레이어', register: '평서체' },
  contradict_milestone: { desc: '모순 마일스톤', speaker: '시스템', listener: '플레이어', register: '평서체' },
  evidence_discovery: { desc: '증거 발견', speaker: '시스템', listener: '플레이어', register: '평서체' },
};

function decomposeKey(channel, key) {
  const parts = (key || '').split('|');
  switch (channel) {
    case 'interrogation':
      return `party=${parts[0]} / dispute=${parts[1]} / lieState=${parts[2]} / questionType=${parts[3]}`;
    case 'contradiction_pursuit':
      return `party=${parts[0]} / dispute=${parts[1]} / lieState=${parts[2]}`;
    case 'judge_question':
      return `dispute=${parts[0]} / questionType=${parts[1]} / depth=${parts[2]}`;
    case 'judge_contradiction':
      return `dispute=${parts[0]} / tone=${parts[1]}`;
    case 'judge_evidence_combo':
      return `dossierCard=${parts[0]} / tone=${parts[1]}`;
    case 'judge_witness_summon':
      return `witness=${parts[0]} / tone=${parts[1]}`;
    case 'evidence_present': {
      const dim4Type = ['1','2','3'].includes(parts[3]) ? 'stage' : (['stage1','stage2','stage3'].includes(parts[3]) ? 'stage' : (['self','other','both'].includes(parts[3]) ? 'subjectRole' : 'action'));
      return `party=${parts[0]} / evidence=${parts[1]} / lieBand=${parts[2]} / ${dim4Type}=${parts[3]}`;
    }
    case 'dossier':
      return `dossierCard=${parts[0]} / lieBand=${parts[1]}`;
    case 'witness':
      return `witness=${parts[0]} / depth=${parts[1]}`;
    case 'interjection':
      return `party=${parts[0]} / dispute=${parts[1]} / intensity=${parts[2]}`;
    case 'emotional_overload':
      return `party=${parts[0]} / dispute=${parts[1]}`;
    default:
      return key;
  }
}

function getSiblingVariants(stData, channel, cellKey, currentId) {
  const ch = stData.channels[channel];
  if (!ch) return [];
  const entry = ch.entries.find(e => e.key === cellKey);
  if (!entry) return [];
  return entry.variants.filter(v => v.id !== currentId).slice(0, 4).map(v => ({id: v.id, text: v.text}));
}

function describePartyContext(caseId, party, lieState) {
  const meta = CASE_META[caseId];
  if (!party || party === 'judge') return '재판관 (정중 합니다체)';
  if (party === 'system') return '시스템 narrator (평서체)';
  if (party === 'witness') return '증인 (신분별 톤)';
  const partyMeta = meta?.[party];
  if (!partyMeta) return party;
  const lieDescr = {
    S0: 'S0 완전 부정', S1: 'S1 일부 인정', S2: 'S2 핑계', S3: 'S3 책임 전가', S4: 'S4 감정적', S5: 'S5 자백',
  };
  const lie = lieState ? ' / ' + (lieDescr[lieState] || lieState) : '';
  return `${partyMeta.name} (${party}, ${partyMeta.archetype}${lie}) — ${partyMeta.tell}`;
}

function describeDispute(caseId, disputeId) {
  return CASE_META[caseId]?.disputes?.[disputeId] || disputeId || '(N/A)';
}

function describeDossierCard(caseId, key) {
  const dcId = (key || '').split('.')[0];
  return CASE_META[caseId]?.dossierCards?.[dcId] || dcId;
}

// ---------- C 작성 ----------
const shallow = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp/c-review-shallow-all.json')));
const ambiguous = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp/c-review-ambiguous-all.json')));
const stData = {};
for (const c of ['spouse-01', 'family-01', 'friend-01']) {
  stData[c] = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/scriptedText/' + c + '.json')));
}

let cMd = '# Thread-QW-Cross P1 — 사용자 검토용 (C) — 컨텍스트 강화\n\n';
cMd += '## 검토 가이드\n\n';
cMd += '각 entry는 다음 차원으로 검토:\n';
cMd += '1. **의미** — 발화의 본질이 정확히 전달되는가\n';
cMd += '2. **archetype voice** — 화자의 캐릭터 특성과 일치하는가\n';
cMd += '3. **lieState 단계** — S0~S5 단계 톤과 일치하는가\n';
cMd += '4. **사건 핵심 사실** — 본문에 사건 사실이 충분히 녹았는가\n';
cMd += '5. **표현** — 단순 기계식이 아니라 자연체인가\n\n';
cMd += '의견 표시 방법:\n';
cMd += '- ✓ OK / ⚠ 보정 필요 (메모) / 그냥 두기\n\n';
cMd += '---\n\n';

// 사건별 메타 박스
cMd += '## 사건별 컨텍스트 (참조)\n\n';
for (const [c, m] of Object.entries(CASE_META)) {
  cMd += `### ${c} — "${m.name}"\n`;
  cMd += `- **A ${m.a.name}** (${m.a.role}) — \`${m.a.archetype}\`: ${m.a.tell}\n`;
  cMd += `- **B ${m.b.name}** (${m.b.role}) — \`${m.b.archetype}\`: ${m.b.tell}\n`;
  cMd += `- **사건 사실**: ${m.facts}\n`;
  cMd += `- **disputes**:\n`;
  for (const [d, desc] of Object.entries(m.disputes)) {
    cMd += `  - \`${d}\`: ${desc}\n`;
  }
  cMd += '\n';
}
cMd += '---\n\n';

// C-1: judge_evidence_combo shallow
cMd += `## C-1: judge_evidence_combo 함의 얕은 문장 (${shallow.length}건)\n\n`;
cMd += '> **judge_evidence_combo** = dossier 카드(증거 조합) 발동 시 재판관이 두 증거의 함의를 본문에 녹여 추궁하는 채널.\n';
cMd += '> 사용자가 가장 강조한 영역. "{NPC}, {증거이름}이 같은 방향입니다. 더 미루지 마십시오." 류 변수 치환 패턴이 잔존하지 않아야 함.\n\n';
cMd += '**얕은 기준**: 60자 미만 또는 단문 (1 문장).\n\n';

const shallowByCase = { 'spouse-01': [], 'family-01': [], 'friend-01': [] };
for (const s of shallow) shallowByCase[s.caseId].push(s);

for (const [c, items] of Object.entries(shallowByCase)) {
  if (items.length === 0) continue;
  cMd += `### ${c} (${items.length}건)\n\n`;
  for (const s of items) {
    const ch = stData[c].channels[s.channel];
    const entry = ch.entries.find(e => e.key === s.key);
    const tone = (s.key.split('|')[1]) || '';
    const dossierCard = describeDossierCard(c, s.key);

    cMd += `#### ${s.id} (${s.len}자)\n`;
    cMd += `- **cell**: \`${s.key}\` — dossier 카드: **${dossierCard}** / tone: **${tone}**\n`;
    cMd += `- **화자**: 재판관 → ${s.key.includes('.b.') ? CASE_META[c].b.name + '(B)' : CASE_META[c].a.name + '(A)'}\n`;
    cMd += `\n**본문**:\n> ${s.text}\n\n`;
    cMd += `**같은 cell 다른 variants (비교용)**:\n`;
    const siblings = getSiblingVariants(stData[c], s.channel, s.key, s.id);
    for (const sib of siblings.slice(0, 3)) {
      cMd += `- \`${sib.id}\` (${(sib.text || '').length}자): ${sib.text}\n`;
    }
    cMd += '\n---\n\n';
  }
}

// C-2: 의미 모호 / 추상화
cMd += `## C-2: 의미 모호 / 추상화 후보 (${ambiguous.length}건)\n\n`;
cMd += '> **검출 기준**: "그 부분", "그 흐름", "그 점", "그 쪽" 등 추상 표현 빈도 ≥ 2 + 사건 핵심 명사 ≤ 1.\n';
cMd += '> 단, 추상 표현이 archetype voice (avoidant 이준호의 "그 쪽" 등)에 의도된 경우 보존 가능.\n\n';

const ambByCase = { 'spouse-01': [], 'family-01': [], 'friend-01': [] };
for (const a of ambiguous) ambByCase[a.caseId].push(a);

for (const [c, items] of Object.entries(ambByCase)) {
  if (items.length === 0) continue;
  cMd += `### ${c} (${items.length}건)\n\n`;
  for (const a of items) {
    const ch = stData[c].channels[a.channel];
    const entry = ch.entries.find(e => e.key === a.key);
    const party = entry?.party;
    const lieState = entry?.lieState;
    const disputeId = entry?.disputeId || a.key.split('|')[1];

    cMd += `#### ${a.id}\n`;
    cMd += `- **channel**: \`${a.channel}\` — ${CHANNEL_META[a.channel]?.desc || ''}\n`;
    cMd += `- **cell key 분해**: ${decomposeKey(a.channel, a.key)}\n`;
    cMd += `- **dispute**: \`${disputeId}\` — ${describeDispute(c, disputeId)}\n`;
    cMd += `- **화자**: ${describePartyContext(c, party, lieState)}\n`;
    cMd += `- **추상 빈도**: ${a.abstract_count} / **핵심 명사**: ${a.concrete_count}\n\n`;
    cMd += `**본문**:\n> ${a.text}\n\n`;
    cMd += `**같은 cell 다른 variants (비교용)**:\n`;
    const siblings = getSiblingVariants(stData[c], a.channel, a.key, a.id);
    for (const sib of siblings.slice(0, 3)) {
      cMd += `- \`${sib.id}\`: ${sib.text}\n`;
    }
    cMd += '\n---\n\n';
  }
}

fs.writeFileSync(path.join(ROOT, 'tmp/USER-REVIEW-C-thread-qw-cross-p1.md'), cMd);

// ---------- D 작성 ----------
const findings = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp/qa-redo-20260426/QA-QW-claude-findings.json')));
const p2 = findings.p2_patches || [];

let dMd = '# Thread-QW P2 6건 — 사용자 검토용 (D) — 컨텍스트 강화\n\n';
dMd += '## 검토 가이드\n\n';
dMd += 'Thread-QW (Claude) 보고: P2 6건 — 점진 보완 (낮은 우선순위).\n\n';
dMd += '각 항목 검토 방향:\n';
dMd += '1. **그대로 두기** — 게임 영향이 작다고 판단\n';
dMd += '2. **메인에게 직접 보정 요청** — 작은 영역 (단순 어휘 교체)\n';
dMd += '3. **GPT 추가 의뢰 작성** — 광범위 보정 필요 (예: 60v 영향)\n\n';
dMd += '---\n\n';

dMd += '## 사건별 컨텍스트 (참조)\n\n';
for (const [c, m] of Object.entries(CASE_META)) {
  dMd += `### ${c} — "${m.name}"\n`;
  dMd += `- A ${m.a.name} (${m.a.archetype}) / B ${m.b.name} (${m.b.archetype})\n\n`;
}
dMd += '---\n\n';

for (let i = 0; i < p2.length; i++) {
  const p = p2[i];
  const c = p.caseId;
  const ch = p.channel;
  const chMeta = CHANNEL_META[ch];

  dMd += `## D-${i+1}: ${c} / ${ch}\n\n`;
  dMd += `- **카테고리**: ${p.category}\n`;
  dMd += `- **영향**: ${p.samples_affected} samples\n`;
  dMd += `- **채널 의미**: ${chMeta?.desc || ''}\n`;
  dMd += `- **화자**: ${chMeta?.speaker} → ${chMeta?.listener}\n`;
  dMd += `- **설명**: ${p.description}\n\n`;

  // 해당 채널의 sample entries (3건)
  const channelEntries = stData[c]?.channels[ch]?.entries || [];
  const samples = channelEntries.slice(0, 3);
  dMd += `**해당 채널 sample entries (참조용)**:\n\n`;
  for (const e of samples) {
    dMd += `- **\`${e.key}\`** (${decomposeKey(ch, e.key)})\n`;
    for (const v of (e.variants || []).slice(0, 2)) {
      dMd += `  - \`${v.id}\`: ${v.text}\n`;
    }
    dMd += '\n';
  }

  // patch 1 적용도 케이스
  if (p.category === 'patch1 application gap') {
    dMd += `**참고: 사용자 모범 patch 1**\n`;
    dMd += `> "쪽이었는데" → "주장이었는데" (인지 단계 약화: 강한 단정 → 한 발 물러선 의견)\n\n`;
    dMd += `**spouse-01 적용 예시 (참조)**:\n`;
    const spouseJC = stData['spouse-01'].channels.judge_contradiction.entries[0];
    if (spouseJC) {
      for (const v of spouseJC.variants.slice(0, 2)) {
        dMd += `- \`${v.id}\`: ${v.text}\n`;
      }
    }
    dMd += '\n';
  }

  if (p.category === 'monotone ending diversity') {
    dMd += `**단조 어미 sample**:\n`;
    let count = 0;
    for (const e of channelEntries) {
      for (const v of e.variants) {
        if (count >= 5) break;
        if (/설명해\s*주십시오\.$/.test(v.text || '')) {
          dMd += `- \`${v.id}\`: ${v.text}\n`;
          count++;
        }
      }
      if (count >= 5) break;
    }
    dMd += '\n';
  }

  if (p.category === 'boilerplate duplication across cells') {
    dMd += `**중복 sample 추출**:\n`;
    const textCounts = {};
    for (const e of channelEntries) {
      for (const v of e.variants) {
        if (!v.text) continue;
        textCounts[v.text] = (textCounts[v.text] || 0) + 1;
      }
    }
    const dups = Object.entries(textCounts).filter(([t, n]) => n > 1).sort((a, b) => b[1] - a[1]).slice(0, 3);
    for (const [text, n] of dups) {
      dMd += `- (${n}회 등장): ${text.slice(0, 150)}\n`;
    }
    dMd += '\n';
  }

  dMd += '---\n\n';
}

dMd += '\n## 추가 통계 (Thread-QW 보고에서)\n\n';
dMd += '### 사용자 모범 4 patch 적용도 (user_pattern_application)\n';
dMd += '```json\n' + JSON.stringify(findings.user_pattern_application || {}, null, 2) + '\n```\n\n';
dMd += '### machine_pattern_detected (단순 기계식)\n';
dMd += `- 검출 ${(findings.machine_pattern_detected || []).length}건\n\n`;
dMd += '### ambiguous_meaning_detected (의미 모호)\n';
dMd += `- 검출 ${(findings.ambiguous_meaning_detected || []).length}건\n`;

fs.writeFileSync(path.join(ROOT, 'tmp/USER-REVIEW-D-thread-qw-p2.md'), dMd);

console.log('저장:');
console.log('  tmp/USER-REVIEW-C-thread-qw-cross-p1.md');
console.log('  tmp/USER-REVIEW-D-thread-qw-p2.md');
console.log('shallow:', shallow.length, 'ambiguous:', ambiguous.length, 'p2:', p2.length);
