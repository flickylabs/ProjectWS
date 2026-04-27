#!/usr/bin/env node
/**
 * Coverage check: do the proposed paraphrase lexemes catch every P1 finding
 * from CT-Cross S-2 §D2-A/B/C/D and §D1 (and explicitly note D6 register
 * out-of-scope routing)?
 *
 * READ-ONLY.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const PROPOSED = {
  'spouse-01': ['어린 친척','친 가족','혈육','친 혈육','가족의 한 사람','돌봐 드','생필품을 사다','챙겨 주','가족을 돕는','가족을 돌본','빚 대신','따로 모은 돈','몰래 마련한 돈','가족을 돕는 일이 급'],
  'family-01': ['유서를 손댄','유서를 고친','유서를 바꾼','원본 유서를 고친','문서를 손으로 고친','자기 몫을 줄','공장 자금','20년 동안 매달 보낸','20년 간 송금','어머니 통장으로 정기적으로 돈을 보낸','어머니 통장으로 꾸준히 돈을 넣었습니다','정기적이라고 불러도 될 만큼 보낸','장기 송금','혈연','친생자','친자 관계','출생에 관한 사실','어머니 통장으로 꾸준히','정기적이라고 불러도 될 만큼','제 형 쪽 생활이 그렇게 이어진 정황'],
  'friend-01': ['선을 넘는 메시지','선 넘는','선을 넘은 말','선을 넘은','선을 넘는','다은이 아버지가 .{0,12}가져간','가로','뜯','다은이 아버지가 예비신랑에게 돈 이야기를 꺼낸','송다은 씨 아버지가 예비신랑에게 돈 이야기를 꺼낸','같은 패턴','같은 방식으로 돈 얘기','다은이 아버지가 제 돈을 가져간 게 맞습니다','선을 넘는 메시지를 보고도'],
};

// CT-Cross S-2 P1 findings extracted from the prior report
const P1_FINDINGS = {
  // D2-A judge_* truth-leak paraphrases
  'D2-A-1':  { caseId: 'family-01', variantId: 'judgeq-d-2-fact-pursuit-4-v3', text: '윤정후 씨, 자기 몫을 줄였더라도 문서를 고친 책임은 인정하십니까.' },
  'D2-A-2':  { caseId: 'family-01', variantId: 'judgeq-d-2-motive-search-3-v3', text: '윤정후 씨, 자기 몫을 줄이면서도 왜 법적 위험을 감수하셨습니까.' },
  'D2-A-3':  { caseId: 'family-01', variantId: 'judgeq-d-2-empathy-approach-3-v3', text: '윤정후 씨, 자기 몫을 줄였다는 사실도 말하지 못한 이유가 두려움이었습니까.' },
  'D2-A-4':  { caseId: 'family-01', variantId: 'judgeq-d-3-fact-pursuit-1-v5', text: '두 분, 생활비와 공장 자금의 출처를 구분해 말씀해 주십시오.' },
  'D2-A-5':  { caseId: 'family-01', variantId: 'judgeq-d-3-fact-pursuit-2-v3', text: '윤정후 씨, 매달 보낸 돈과 공장 자금이 같은 흐름인지 설명해 주십시오.' },
  'D2-A-6':  { caseId: 'family-01', variantId: 'judgeq-d-4-motive-search-3-v1', text: '윤정후 씨, 출생에 관한 사실이 원본 유서를 고친 판단과 어떻게 연결됩니까.' },
  'D2-A-7':  { caseId: 'family-01', variantId: 'judgeq-d-4-empathy-approach-4-v1', text: '윤정후 씨, 지금 가장 후회되는 건 말하지 않은 일입니까, 유서를 고친 일입니까.' },
  'D2-A-8':  { caseId: 'family-01', variantId: 'judgec-d-2-soft-v5', text: '윤정후 씨, 자기 몫을 줄였다는 사실과 문서를 고친 책임을 함께 설명해 주십시오.' },
  'D2-A-9':  { caseId: 'family-01', variantId: 'judgec-d-2-mid-v5', text: '윤정후 씨, 자기 몫을 줄였다는 사정이 있어도 위조 책임은 남습니다. 그 판단을 답해 주십시오.' },
  'D2-A-10': { caseId: 'family-01', variantId: 'judgec-d-3-soft-v3', text: '윤정후 씨, 생활비와 공장 자금까지 이어진다면 처음 설명이 너무 작았습니다. 이유를 말씀해 주십시오.' },
  'D2-A-11': { caseId: 'friend-01', variantId: 'judgeq-d-2-fact_pursuit-2-v1', text: '최수민 씨, 선을 넘은 말에 어떻게 거절했는지 차분히 말씀하십시오.' },
  'D2-A-12': { caseId: 'friend-01', variantId: 'judgec-d-2-hard-v1', text: '최수민 씨, 거절했다는 기록을 숨긴 선택이 오해를 만들었습니다. 책임을 피하지 마십시오.' },

  // D2-B NPC accuser-side leak at S0
  'D2-B-1':  { caseId: 'family-01', variantId: 'a-d-5-S0-fact-pursuit-v1', text: '제 동생이 어머니를 이용한 겁니다. 유서를 손댄 것만 봐도 답이 나옵니다.' },
  'D2-B-2':  { caseId: 'family-01', variantId: 'a-d-5-S0-fact-pursuit-v2', text: '자기 몫을 줄였든 늘렸든 상관없습니다. 어머니가 정한 문서를 손으로 고쳤다면 이용한 겁니다.' },

  // D2-C NPC S2 near-confession
  'D2-C-1':  { caseId: 'friend-01', variantId: 'b-d-4-S2-fact-pursuit-v1', text: '다은이 아버지가 제 돈을 가져간 게 맞습니다.' },

  // D2-D evidence_discovery early-leak
  'D2-D-1':  { caseId: 'friend-01', variantId: 'discover-b-e-4-capture-v1', text: '지금 결혼이 깨질까 봐라고 하셨습니다. 먼저 선을 넘는 메시지를 보고도 송다은 씨에게 곧바로 알리지 않은 이유가 그것이었습니까.' },

  // D1 lieStateFlow P1 (the one solhi entry — tonal, not lexeme)
  'D1-P1':   { caseId: 'family-01', variantId: 'a-d-2-S2-motive-search-v5', text: '솔직히 말하면, 의도가 있었다고 인정하는 순간 제 기준이 무너져서 그렇게 생각하지 않으려 했습니다.' },
};

function makeMatcher(needle) {
  if (/[.*+?^${}()|[\]\\]/.test(needle)) return new RegExp(needle);
  return new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
}

function check() {
  console.log('=== Coverage check: do proposed paraphrase lexemes catch each P1 finding? ===');
  for (const [id, f] of Object.entries(P1_FINDINGS)) {
    const lex = PROPOSED[f.caseId] || [];
    const matches = lex.filter(l => makeMatcher(l).test(f.text));
    const status = matches.length > 0 ? 'CAUGHT' : 'MISSED';
    console.log(`[${status}] ${id} ${f.caseId}/${f.variantId}`);
    if (matches.length) console.log('  matched lex:', matches);
    else console.log('  text:', f.text);
  }
}

check();
