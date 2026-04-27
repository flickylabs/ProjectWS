#!/usr/bin/env node
/**
 * False-positive scan for the proposed paraphrase lexeme set in
 * docs/disclosure-policy.md §4.1 / 4.2 / 4.3.
 *
 * For each proposed lexeme, count hits in scriptedText stratified by
 *  (case × channel × lieState). High hit counts in "allowed" zones
 *  (aftermath, S4–S5 NPC, mediation, witness, dossier reveal late, etc.)
 *  signal blanket-block risk. The Tier 3 guard MUST gate by channel +
 *  lieState; this scan tells us where gating cannot be optional.
 *
 * READ-ONLY. No file modifications.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const STX = path.join(ROOT, 'src/data/scriptedText');

const CASES = ['spouse-01', 'family-01', 'friend-01'];

// Proposed paraphrase set (§4.1 / 4.2 / 4.3 of policy doc)
const PROPOSED = {
  'spouse-01': {
    '관계 우회':        ['어린 친척', '친 가족', '혈육', '친 혈육', '가족의 한 사람'],
    '돌봄 변형':        ['돌봐 드', '생필품을 사다', '챙겨 주', '가족을 돕는', '가족을 돌본'],
    '대납 우회':        ['빚 대신'],
    '비자금 우회':      ['따로 모은 돈', '몰래 마련한 돈'],
    'S2 NPC 누설':      ['가족을 돕는 일이 급'],
  },
  'family-01': {
    '유서 조작 우회':   ['유서를 손댄', '유서를 고친', '유서를 바꾼', '원본 유서를 고친', '문서를 손으로 고친'],
    '자기 몫 축소':     ['자기 몫을 줄'],
    '공장 자금 변형':   ['공장 자금'],
    '20년 송금 변형':   ['20년 동안 매달 보낸', '20년 간 송금', '어머니 통장으로 정기적으로 돈을 보낸',
                         '어머니 통장으로 꾸준히 돈을 넣었습니다', '정기적이라고 불러도 될 만큼 보낸', '장기 송금'],
    '출생 비밀 변형':   ['혈연', '친생자', '친자 관계', '출생에 관한 사실'],
    'S0 NPC 단정':      ['유서를 손댄', '문서를 손으로 고친'],  // (overlap with 유서 조작; gating context S0 NPC)
    'S2 NPC 누설':      ['어머니 통장으로 꾸준히', '정기적이라고 불러도 될 만큼', '제 형 쪽 생활이 그렇게 이어진 정황'],
  },
  'friend-01': {
    '접근 변형':        ['선을 넘는 메시지', '선 넘는', '선을 넘은 말', '선을 넘은', '선을 넘는'],
    '사기 우회':        ['다은이 아버지가 .{0,12}가져간', '가로', '뜯',
                         '다은이 아버지가 예비신랑에게 돈 이야기를 꺼낸',
                         '송다은 씨 아버지가 예비신랑에게 돈 이야기를 꺼낸'],
    '같은 패턴 변형':   ['같은 패턴', '같은 방식으로 돈 얘기'],
    'S2 NPC 자백 톤':   ['다은이 아버지가 제 돈을 가져간 게 맞습니다'],
    'evidence_discovery 누설': ['선을 넘는 메시지를 보고도'],
  },
};

// Channels considered "allowed" for various lexeme classes
const ALLOWED_GATES = {
  // aftermath: post-verdict, free
  // emotional_overload: S4+ only, allowed
  // mediation: late phase, partial allowed
  // witness w-? full: depth-gated reveal allowed
  // trust_action S3+: confession-style, allowed
  // dossier *late, NPC interrogation S5/S4: confession allowed
};

function loadAll() {
  const out = {};
  for (const c of CASES) {
    out[c] = JSON.parse(fs.readFileSync(path.join(STX, `${c}.json`), 'utf-8'));
  }
  return out;
}

function* iter(stxByCase) {
  for (const [caseId, stx] of Object.entries(stxByCase)) {
    for (const [channel, ch] of Object.entries(stx.channels)) {
      for (const ent of ch.entries || []) {
        for (const v of ent.variants || []) {
          yield {
            caseId, channel, party: ent.party || null,
            disputeId: ent.disputeId || null, lieState: ent.lieState || null,
            tone: ent.tone || null, variantId: v.id, text: v.text || ''
          };
        }
      }
    }
  }
}

function classifyZone(v) {
  // Returns 'allowed' | 'gated' | 'forbidden' relative to confessional-truth content
  // — the zone where the lexeme would be safely allowed (allowed) vs must-not-leak (forbidden).
  if (v.channel === 'aftermath') return 'allowed';
  if (v.channel === 'emotional_overload') return 'allowed';   // S4+ only
  if (v.channel === 'mediation') return 'allowed';            // late phase
  if (v.channel === 'witness' && /full/.test(v.variantId)) return 'allowed';
  if (v.channel === 'trust_action' && ['S3', 'S4', 'S5'].includes(v.lieState)) return 'allowed';
  if (v.channel === 'interrogation' && ['S4', 'S5'].includes(v.lieState)) return 'allowed';
  if (v.channel === 'contradiction_pursuit' && ['S4', 'S5'].includes(v.lieState)) return 'allowed';
  if (v.channel === 'interrogation' && v.lieState === 'S3') return 'gated';  // partial
  if (v.channel === 'contradiction_pursuit' && v.lieState === 'S3') return 'gated';
  if (v.channel === 'dossier' && /late|mid/.test(v.variantId)) return 'gated';
  if (v.channel === 'dossier' && /early/.test(v.variantId)) return 'forbidden';
  if (v.channel === 'evidence_present') {
    if (/late/.test(v.variantId)) return 'gated';
    return 'forbidden'; // early/mid → strict
  }
  if (v.channel === 'evidence_discovery') return 'forbidden';  // player discovery, no system assertion
  if (v.channel === 'system_message') return 'forbidden';
  // judge channels = always surface-only
  if (/^judge_/.test(v.channel)) return 'forbidden';
  if (v.channel === 'rapport_milestone' || v.channel === 'contradict_milestone') return 'gated';
  if (v.channel === 'interjection') return 'gated';
  if (['S0', 'S1', 'S2'].includes(v.lieState)) return 'forbidden';
  return 'gated';
}

function makeMatcher(needle) {
  // Treat as regex if it contains regex meta-chars, else literal
  if (/[.*+?^${}()|[\]\\]/.test(needle)) return new RegExp(needle);
  return new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
}

function main() {
  const data = loadAll();
  const report = {
    generatedAt: new Date().toISOString(),
    head: 'db0130e (working tree dirty: CLAUDE.md / docs/disclosure-policy.md / docs/qa-functional.md)',
    proposedLexemeCount: 0,
    perLexeme: [],
  };
  for (const [caseId, groups] of Object.entries(PROPOSED)) {
    for (const [groupName, lexemes] of Object.entries(groups)) {
      for (const needle of lexemes) {
        report.proposedLexemeCount++;
        const re = makeMatcher(needle);
        const buckets = { forbidden: [], gated: [], allowed: [] };
        let total = 0;
        for (const v of iter({ [caseId]: data[caseId] })) {
          if (!re.test(v.text)) continue;
          total++;
          const z = classifyZone(v);
          buckets[z].push({
            variantId: v.variantId, channel: v.channel,
            lieState: v.lieState, party: v.party,
            preview: v.text.length > 100 ? v.text.slice(0, 100) + '…' : v.text,
          });
        }
        report.perLexeme.push({
          caseId, group: groupName, lexeme: needle, total,
          forbidden: buckets.forbidden.length,
          gated: buckets.gated.length,
          allowed: buckets.allowed.length,
          fpRisk: buckets.allowed.length > 0
            ? (buckets.forbidden.length === 0 ? 'high (only allowed-zone hits)' : 'medium (some allowed-zone hits)')
            : (buckets.forbidden.length === 0 ? 'unused (0 hits anywhere)' : 'low'),
          samples: {
            forbidden: buckets.forbidden.slice(0, 3),
            gated: buckets.gated.slice(0, 3),
            allowed: buckets.allowed.slice(0, 3),
          },
        });
      }
    }
  }
  // Cross-case scan for spouse "친 가족" — could match "친한 가족"
  // Print summary table
  console.log('=== Proposed lexeme FP scan ===');
  console.log('case        | group               | lexeme                              | tot | forb | gate | allow | fpRisk');
  console.log('-'.repeat(140));
  for (const r of report.perLexeme) {
    console.log(
      r.caseId.padEnd(11), '|',
      r.group.padEnd(20), '|',
      r.lexeme.padEnd(36), '|',
      String(r.total).padStart(3), '|',
      String(r.forbidden).padStart(4), '|',
      String(r.gated).padStart(4), '|',
      String(r.allowed).padStart(5), '|',
      r.fpRisk
    );
  }
  fs.writeFileSync(path.join(ROOT, 'tmp/qa-ct-cross-results/20260427-policy-fp-scan.json'),
    JSON.stringify(report, null, 2));
  console.log('\nWritten tmp/qa-ct-cross-results/20260427-policy-fp-scan.json');
  console.log('Total proposed lexemes:', report.proposedLexemeCount);
}

main();
