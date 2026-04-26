#!/usr/bin/env node
// QW-Claude QA scanner — 14,931 variants 자동 검출
// 사용자 모범 patch 4 + 14차원 위반 후보 추출 (사람의 깊이 검토용)

const fs = require('fs');
const path = require('path');

const CASES = ['spouse-01', 'family-01', 'friend-01'];
const ROOT = process.cwd();

// ============================================================
// 검출 패턴 정의 (P0/P1/P2)
// ============================================================

// 변수 치환 패턴 — variant 본문에 남으면 안 됨 (P0)
const VAR_SUB_PATTERNS = [
  /\{[A-Z_]+\}/g,
  /\{npc\}/gi,
  /\{judge\}/gi,
  /\{evidence\}/gi,
  /\$\{[^}]+\}/g,
];

// 단순 기계식 패턴 (P1) — REQUEST에서 명시
const MECHANICAL_PATTERNS = [
  { re: /이 자료들을 함께 보겠습니다/g, label: '기계식: 자료들을 함께' },
  { re: /이 조합의 뜻은 분명합니다/g, label: '기계식: 조합의 뜻' },
  { re: /이 조합이 의미하는 바는 분명합니다/g, label: '기계식: 조합 의미' },
  { re: /더 미루지 마십시오/g, label: '기계식: 미루지 마' },
  { re: /태도에 변화가 감지됩니다/g, label: '기계식: 변화가 감지' },
  { re: /내용이 확인됩니다/g, label: '기계식: 내용이 확인' },
  { re: /흐름이 나타납니다/g, label: '기계식: 흐름이 나타' },
  { re: /진술이 흔들리는 모습이/g, label: '기계식: 진술 흔들' },
];

// 번역체 9패턴 (P1)
const TRANSLATIONESE = [
  { re: /된 것으로 (생각|보)입니다/g, label: '번역체: ~된 것으로' },
  { re: /(었|있)던 측면이/g, label: '번역체: ~측면' },
  { re: /부득이하게/g, label: '번역체: 부득이' },
  { re: /(었|이)다고 사료됩니다/g, label: '번역체: 사료됩니다' },
  { re: /필요성이 있다/g, label: '번역체: 필요성이' },
  { re: /(에 있어|에 있어서)/g, label: '번역체: ~에 있어' },
];

// 호칭 위반 (P0)
const HONORIFIC_VIOLATIONS = [
  { re: /제 아내(가|는|를|의|와|에게)?\b/g, label: '호칭: 재판관이 "제 아내" 사용 의심', speakerCheck: 'judge' },
  { re: /제 남편(이|은|을|의|과|에게)?\b/g, label: '호칭: 재판관이 "제 남편" 사용 의심', speakerCheck: 'judge' },
  { re: /증인 씨/g, label: '호칭: "증인 씨" (실명 사용 위반)' },
  { re: /증인님(?!들)/g, label: '호칭: "증인님" (실명/직책 권장)', priority: 'P2' },
];

// "쪽" 약화 표현 (P1) — judge_contradiction에서 인지단계 약화 패치 미적용 의심
const WEAKEN_PATTERN = [
  { re: /쪽(이었는데|입니다|이라고|이었다고)/g, label: '인지약화: "쪽" 표현 (patch 1: "주장/의견" 권장)' },
];

// 정보→동기 patch 미적용 (P1)
const INFO_VS_MOTIVE = [
  { re: /무엇을 알고 (무엇을 )?(밀어붙|확신)/g, label: '정보→동기 미적용 (patch 2)' },
];

// 추상→직접 patch 미적용 (P1)
const ABSTRACT_PATTERN = [
  { re: /(을|를) 흐리(면|시면|지|면서)/g, label: '추상→직접 미적용 (patch 3: "밝히지 않으면" 권장)' },
];

// 명사형 어색 (P1) — patch 4
const NOUN_FORM = [
  { re: /가족 돌봄(으|이|을|에)/g, label: '명사형: "가족 돌봄" (patch 4: "가족을 돌본 것" 권장)' },
  { re: /가족 지원(으|이|을|에|이었|이라)/g, label: '명사형: "가족 지원" (patch 4: "가족을 도운 것" 권장)' },
];

// family-01 비율 위반 (P0) — A 40 / B 60이 정답. 반대면 P0.
const FAMILY_RATIO_WRONG = [
  { re: /제가\s*60[^\d%]?(%|퍼센트|프로)/g, label: 'P0: family-01 비율 충돌 의심 — 화자 60% 주장' },
  { re: /동생(이|은|을)?\s*40[^\d%]?(%|퍼센트|프로)/g, label: 'P0: family-01 비율 충돌 — 동생 40%' },
];

// friend-01 family fact 혼입 (P0)
const FRIEND_CONTAMINATION = [
  { re: /(유서|유언장|치매|어머니의 일기|어머니 일기|출생\s*비밀)/g, label: 'P0: friend-01에 family-01 fact 혼입' },
  { re: /(60[:%]\s*40|40[:%]\s*60|60대\s*40)/g, label: 'P0: friend-01에 비율 60:40 혼입 의심' },
];

// spouse-01 family/friend 혼입 (P0)
const SPOUSE_CONTAMINATION = [
  { re: /(유서|유언장|치매|어머니의 일기|출생\s*비밀)/g, label: 'P0: spouse-01에 family-01 fact 혼입' },
  { re: /(예비신랑|예비\s*신랑|선\s*넘은\s*메시지)/g, label: 'P0: spouse-01에 friend-01 fact 혼입' },
];

// 직접 인용 + 시스템 관찰문 결합 (P0)
// e.g. '...라고 하셨는데, ...라는 내용이 확인됩니다'
const QUOTE_OBSERVATION_COMBO = [
  { re: /['"‘’“”][^'"]{20,}['"‘’“”][^.]{0,30}(라고|이라고)\s*(하셨|말씀)/g, label: '직접 긴 인용 (간접 인용 권장)' },
];

// ============================================================
// Variant 추출
// ============================================================

function extractVariants(node, channel, parents = [], out = []) {
  if (node === null || node === undefined) return out;
  if (Array.isArray(node)) {
    if (node.length && typeof node[0] === 'object' && node[0] !== null && (node[0].text !== undefined || node[0].body !== undefined || node[0].speech !== undefined)) {
      // variants array
      node.forEach((v, i) => {
        const text = v.text ?? v.body ?? v.speech ?? '';
        out.push({
          channel,
          path: parents.join('.') + '[' + i + ']',
          id: v.id ?? null,
          speaker: v.speaker ?? v.party ?? null,
          listener: v.listener ?? v.target ?? null,
          tone: v.tone ?? null,
          lieState: v.lieState ?? v.lie_state ?? null,
          lieBand: v.lieBand ?? v.lie_band ?? null,
          emotion: v.emotion ?? null,
          disputeId: v.disputeId ?? v.dispute ?? null,
          questionType: v.questionType ?? v.qType ?? null,
          text: typeof text === 'string' ? text : JSON.stringify(text),
          raw: v,
          parents: [...parents],
        });
      });
    } else {
      node.forEach((x, i) => extractVariants(x, channel, [...parents, i], out));
    }
    return out;
  }
  if (typeof node === 'object') {
    for (const k of Object.keys(node)) {
      extractVariants(node[k], channel, [...parents, k], out);
    }
  }
  return out;
}

// ============================================================
// 스캔
// ============================================================

function scanVariant(v, caseId) {
  const findings = [];
  const text = v.text || '';
  if (!text || typeof text !== 'string') return findings;

  // 1. 변수 치환 (P0)
  for (const re of VAR_SUB_PATTERNS) {
    const m = text.match(re);
    if (m) findings.push({ priority: 'P0', label: '변수 치환 잔존', match: m.join('/'), kind: 'var_sub' });
  }

  // 2. 단순 기계식 (P1)
  for (const p of MECHANICAL_PATTERNS) {
    if (p.re.test(text)) findings.push({ priority: 'P1', label: p.label, kind: 'mechanical' });
    p.re.lastIndex = 0;
  }

  // 3. 번역체 (P1)
  for (const p of TRANSLATIONESE) {
    if (p.re.test(text)) findings.push({ priority: 'P1', label: p.label, kind: 'translationese' });
    p.re.lastIndex = 0;
  }

  // 4. 호칭 위반 (P0/P2)
  // 재판관 발화: judge_* 채널만
  const isJudgeUtterance = String(v.channel).startsWith('judge_') ||
                            v.channel === 'system_message' ||
                            (v.speaker && /judge|재판관/i.test(String(v.speaker)));
  for (const p of HONORIFIC_VIOLATIONS) {
    if (p.re.test(text)) {
      const speakerOk = !p.speakerCheck || (p.speakerCheck === 'judge' && isJudgeUtterance);
      if (speakerOk) {
        findings.push({ priority: p.priority || 'P0', label: p.label, kind: 'honorific' });
      }
    }
    p.re.lastIndex = 0;
  }

  // 5. 사용자 모범 patch 4
  for (const p of WEAKEN_PATTERN) {
    if (p.re.test(text)) findings.push({ priority: 'P1', label: p.label, kind: 'patch1_weaken' });
    p.re.lastIndex = 0;
  }
  for (const p of INFO_VS_MOTIVE) {
    if (p.re.test(text)) findings.push({ priority: 'P1', label: p.label, kind: 'patch2_motive' });
    p.re.lastIndex = 0;
  }
  for (const p of ABSTRACT_PATTERN) {
    if (p.re.test(text)) findings.push({ priority: 'P1', label: p.label, kind: 'patch3_direct' });
    p.re.lastIndex = 0;
  }
  for (const p of NOUN_FORM) {
    if (p.re.test(text)) findings.push({ priority: 'P1', label: p.label, kind: 'patch4_verb' });
    p.re.lastIndex = 0;
  }

  // 6. family-01 비율
  if (caseId === 'family-01') {
    for (const p of FAMILY_RATIO_WRONG) {
      if (p.re.test(text)) findings.push({ priority: 'P0', label: p.label, kind: 'fact_ratio' });
      p.re.lastIndex = 0;
    }
  }

  // 7. friend-01 혼입
  if (caseId === 'friend-01') {
    for (const p of FRIEND_CONTAMINATION) {
      if (p.re.test(text)) findings.push({ priority: 'P0', label: p.label, kind: 'contamination' });
      p.re.lastIndex = 0;
    }
  }

  // 8. spouse-01 혼입
  if (caseId === 'spouse-01') {
    for (const p of SPOUSE_CONTAMINATION) {
      if (p.re.test(text)) findings.push({ priority: 'P0', label: p.label, kind: 'contamination' });
      p.re.lastIndex = 0;
    }
  }

  // 9. 직접 인용 + 관찰 결합 (judge_contradiction 위주)
  if (v.channel === 'judge_contradiction' || v.channel === 'judge_question') {
    for (const p of QUOTE_OBSERVATION_COMBO) {
      if (p.re.test(text)) findings.push({ priority: 'P1', label: p.label, kind: 'quote_combo' });
      p.re.lastIndex = 0;
    }
  }

  return findings;
}

// ============================================================
// 메인
// ============================================================

const all = {};
const allFlags = [];
const counts = {};

for (const caseId of CASES) {
  const data = JSON.parse(fs.readFileSync(`src/data/scriptedText/${caseId}.json`, 'utf8'));
  all[caseId] = {};
  counts[caseId] = { total: 0, p0: 0, p1: 0, p2: 0, byChannel: {}, byKind: {} };

  for (const ch of Object.keys(data.channels)) {
    const variants = extractVariants(data.channels[ch], ch, [ch]);
    counts[caseId].byChannel[ch] = { total: variants.length, flagged: 0 };
    counts[caseId].total += variants.length;
    all[caseId][ch] = variants;

    for (const v of variants) {
      v.channel = ch;
      v.caseId = caseId;
      const findings = scanVariant(v, caseId);
      if (findings.length) {
        counts[caseId].byChannel[ch].flagged++;
        for (const f of findings) {
          counts[caseId][f.priority.toLowerCase()]++;
          counts[caseId].byKind[f.kind] = (counts[caseId].byKind[f.kind] || 0) + 1;
          allFlags.push({
            caseId, channel: ch, path: v.path, id: v.id,
            speaker: v.speaker, listener: v.listener,
            lieState: v.lieState, lieBand: v.lieBand, tone: v.tone, disputeId: v.disputeId,
            text: v.text,
            priority: f.priority, label: f.label, kind: f.kind, match: f.match || null,
          });
        }
      }
    }
  }
}

const out = {
  generatedAt: new Date().toISOString(),
  summary: counts,
  flags: allFlags,
  totals: {
    variantsScanned: Object.values(counts).reduce((s, c) => s + c.total, 0),
    p0: Object.values(counts).reduce((s, c) => s + c.p0, 0),
    p1: Object.values(counts).reduce((s, c) => s + c.p1, 0),
    p2: Object.values(counts).reduce((s, c) => s + c.p2, 0),
  },
};

fs.writeFileSync('tmp/qa-redo-20260426/qw-claude-work/scan-result.json', JSON.stringify(out, null, 2));
fs.writeFileSync('tmp/qa-redo-20260426/qw-claude-work/all-variants.json', JSON.stringify(all, null, 0));

console.log(JSON.stringify({
  variantsScanned: out.totals.variantsScanned,
  p0: out.totals.p0,
  p1: out.totals.p1,
  p2: out.totals.p2,
  byCase: Object.fromEntries(Object.entries(counts).map(([k,v]) => [k, { total: v.total, p0: v.p0, p1: v.p1, p2: v.p2 }])),
}, null, 2));
