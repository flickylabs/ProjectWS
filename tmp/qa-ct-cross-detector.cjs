#!/usr/bin/env node
/**
 * QA-CT-Cross 9-dimension semantic detector
 * READ-ONLY: scans src/data/scriptedText + disclosurePolicy
 * Emits JSON findings to tmp/qa-ct-cross-results/{date}-findings.json
 * Strategy: full population static scan + heuristic flagging.
 * Differs from Codex Plan S-1 by focusing on:
 *   - 우회 lexeme (synonym beyond strict lexeme list)
 *   - lieState flow tonal mismatch (D1)
 *   - register/honorific transgressions (D6 한국어 톤)
 *   - 명사형 부조화 (D9, per feedback_revision_meaning_over_form.md)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STX = path.join(ROOT, 'src/data/scriptedText');
const POL = path.join(ROOT, 'src/data/disclosurePolicy');
const OUT = path.join(ROOT, 'tmp/qa-ct-cross-results');

const CASES = ['spouse-01', 'family-01', 'friend-01'];

// ── Per-case archetype map (story_v2_confirmed_3cases) ───────
const ARCHETYPES = {
  'spouse-01': { a: { name: '박지연', archetype: 'victim_cosplay' }, b: { name: '이준호', archetype: 'avoidant' } },
  'family-01': { a: { name: '윤태성', archetype: 'confrontational' }, b: { name: '윤정후', archetype: 'affect_flattening' } },
  'friend-01': { a: { name: '송다은', archetype: 'premature_summary' }, b: { name: '최수민', archetype: 'affect_flattening' } },
};

// ── 우회 lexeme map (CT-Cross specific — beyond strict policy list) ──
const PARAPHRASE_LEX = {
  'spouse-01': [
    // Family relation paraphrase
    { p: /(어린|중학생인)\s*(친척|아이|조카뻘)/, label: '관계 우회 (조카 paraphrase)' },
    { p: /(친척\s*아이|친척\s*아이를\s*돌)/, label: '관계 우회 (친척 아이)' },
    { p: /(가족\s*중\s*한\s*명|가족의\s*한\s*사람|혈육)/, label: '가족 식별 우회' },
    { p: /(친\s*가족|친\s*혈육)/, label: '친 + 가족 노출' },
    { p: /(돌\s*보았|돌\s*보았던|돌\s*봐드)/, label: '돌봄 변형 (공백/형태)' },
    { p: /(생필품|생활\s*용품).*(사다\s*주|챙겨\s*주)/, label: '돌봄 우회 (생필품)' },
    { p: /(빚\s*대신|빚을\s*대신)/, label: '대납 우회 (빚 대신)' },
    { p: /(사기를?\s*당해|사기에\s*당)/, label: '투자 사기 변형' },
    { p: /(따로\s*모은\s*돈|몰래\s*마련한\s*돈)/, label: '비자금 우회' },
  ],
  'family-01': [
    { p: /(혈연|친생자|친자\s*관계)/, label: '출생 비밀 우회' },
    { p: /(아버지가\s*다른|어머니가\s*다른)/, label: '배다른 우회' },
    { p: /(유서를?\s*손\s*댄|유서를?\s*고친|유서를?\s*바꾼|유서\s*수정)/, label: '유서 조작 우회' },
    { p: /(자기\s*몫을?\s*줄|자기\s*몫\s*축소|본인\s*몫\s*축소)/, label: '자기 몫 축소 우회' },
    { p: /(20년\s*동안.*돈|20년\s*간.*송금|20년\s*동안.*보낸)/, label: '20년 송금 변형' },
    { p: /(공장\s*부도|공장\s*자금)/, label: '공장 부도 노출 (lexeme 변형)' },
    { p: /(경영권|회사\s*대표\s*자리)/, label: '경영권 위기 변형' },
  ],
  'friend-01': [
    { p: /(남자\s*쪽이?\s*먼저|남자\s*쪽에서\s*먼저|그쪽이?\s*먼저\s*연락)/, label: '예비신랑 먼저 우회' },
    { p: /(접근\s*해\s*온|접근\s*해\s*왔|찝쩍|선을?\s*넘는?\s*메시지)/, label: '접근/찝쩍 직접 변형' },
    { p: /(거절\s*했음|선을\s*그었음|차단\s*당했)/, label: 'B 거절 노출' },
    { p: /(아버지가\s*돈을?\s*가로|아버지가\s*돈을?\s*편취|돈을\s*뜯)/, label: '아버지 사기 우회' },
    { p: /(같은\s*패턴|반복되는\s*수법|똑같은\s*수법)/, label: '같은 패턴 반복 우회' },
    { p: /(또\s*당하|다시\s*당하|또\s*속)/, label: '또 당하게 우회' },
  ],
};

// ── D1 lieState flow patterns ─────────────────────
// Confession-tone phrases that should NOT appear in S0/S1/S2 NPC interrogation
const CONFESSION_TONE = [
  /솔직히\s*(말씀\s*드리면|말하면|말씀드리자면)/,
  /사실은\s*(제가|저는|모두|전부)/,
  /제가\s*(다|모두|전부)\s*(잘못|잘못했|책임)/,
  /숨\s*겨\s*온\s*(이야기|진실)|숨겨\s*왔던/,
  /이제\s*(다|모두)\s*말씀\s*드리/,
  /처음부터\s*다시\s*말씀\s*드리/,
  /진실은\s*(이렇|이러)/,
  /제가\s*거짓말을\s*(했|드렸)/,
];
// Avoidance/denial that should NOT appear at S5 (full confession state)
const DENIAL_TONE_S5 = [
  /(전혀\s*아닙니다|그런\s*적\s*없습니다|결코\s*아닙니다)/,
  /(말씀\s*드리기\s*어렵|드릴\s*말씀이\s*없)/,
  /(잘\s*기억\s*나지|기억이\s*잘\s*나지\s*않)/,
];

// ── D3 archetype voice patterns ───────────────────
const ASSERTION_PATTERNS = [/분명히/, /확실히/, /절대/, /틀림없/, /명백히/, /제가\s*봤/, /제가\s*들었/];
const HEDGE_PATTERNS = [/아마/, /것\s*같\s*습니다/, /일\s*수도/, /잘\s*모르겠/, /기억이\s*잘/, /확실하지\s*않/, /글쎄요/, /애매/];
const OUTBURST_PATTERNS = [/!{1,}/, /너무한/, /어떻게\s*그럴/, /참을\s*수\s*없/, /도저히/, /기가\s*막/];
const SUMMARY_JUMP_PATTERNS = [/결국\s*(이건|그건|그게)/, /한\s*마디로/, /정리하면/, /결론은/, /요약하면/];

// ── 한국어 번역체 ─────────────────────────────────
const TRANSLATION_PATTERNS = [
  /된\s*것으로\s*생각/,
  /인\s*측면이?\s*있/,
  /부득이하게/,
  /~에\s*다름\s*아니/,
  /바\s*있/,           // ~인 바 있다
  /~을\s*가지/,        // 영향력을 가지다
  /~에\s*의해\s*~된/,
  /사전\s*(상의|협의)/,
  /미리\s*말씀\s*드리지\s*못한/,
  /특정\s*[가-힣]/,    // "특정 X" 패턴
  /[가-힣]+만을\s/,    // "~만을" — must be preceded by Hangul stem (avoid "오만을" hit)
];

// ── 톤/register transgressions ────────────────────
// judge channels must be 합니다체. flag 해요체 + 반말 endings (excluding behaviorHint).
const HAEYO_PATTERNS = [/(해요|예요|에요|이에요|네요|아요|어요)(\.|$|\s*[?!])/];
const BANMAL_PATTERNS = [/(\b했어|\b했지|\b했네|이야\.|아니야\.|이지\.|거야\.)$/];

// ── 명사형 부조화 ──────────────────────────────────
const NOMINAL_AWKWARD = [
  /[가-힣]+\s*돌봄으로/,
  /[가-힣]+\s*돌봄이?\b/,
  /[가-힣]+\s*지원으로/,
  /[가-힣]+\s*관여로/,
  /[가-힣]+\s*참여로/,
];

// ── 호칭 위반 ─────────────────────────────────────
const APPELLATION_VIOLATIONS = [
  /(?:\b|^|[^a-zA-Z])(partyA|partyB|partner)(?:\b|$|[^a-zA-Z])/,
  /(?<![가-힣])당사자\s*[AB](?![a-zA-Z가-힣])/,
  /(?<![a-zA-Z가-힣])[AB]씨(?![a-zA-Z가-힣])/,
  /(?<![가-힣])(원고|피고)(?![가-힣])/,
  /(?<![a-zA-Z가-힣])(avoidant|victim_cosplay|confrontational|affect_flattening|cold_logic|premature_summary)(?![a-zA-Z])/i,
  /(?<![a-zA-Z가-힣])(over_precision|counter_question|timeline_padding|evidence_waving|motive_jump|selective_quote)(?![a-zA-Z])/i,
];

// ── 사건 fact mismatch ──────────────────────────
const FACT_MISMATCH = {
  'spouse-01': [
    { p: /[1-9]\s*[,.]?000\s*만\s*원/, allowedAmounts: ['3,000', '2,000', '5,000', '3000', '2000', '5000'], label: '금액 (3000/2000/5000 외)' },
  ],
  'family-01': [
    // 90:10 / 90대10 already in lexeme list; CT-Cross checks for "9 대 1" / "9:1" variants in non-aftermath
    { p: /\b9\s*[:대]\s*1\b/, label: '90:10 변형 노출' },
  ],
  'friend-01': [],
};

// ── helpers ───────────────────────────────────────

function loadAll() {
  const out = {};
  for (const c of CASES) {
    out[c] = {
      stx: JSON.parse(fs.readFileSync(path.join(STX, `${c}.json`), 'utf-8')),
      pol: JSON.parse(fs.readFileSync(path.join(POL, `${c}.json`), 'utf-8')),
    };
  }
  return out;
}

function* iterVariants(stxByCase) {
  for (const [caseId, { stx }] of Object.entries(stxByCase)) {
    for (const [channel, ch] of Object.entries(stx.channels)) {
      const entries = ch.entries || [];
      for (const ent of entries) {
        for (const v of ent.variants || []) {
          yield {
            caseId,
            channel,
            party: ent.party || null,
            disputeId: ent.disputeId || null,
            lieState: ent.lieState || null,
            questionType: ent.questionType || null,
            tone: ent.tone || null,
            stanceHint: ent.stanceHint || null,
            entryKey: ent.key,
            variantId: v.id,
            text: v.text || '',
            behaviorHint: v.behaviorHint || '',
            tags: v.tags || [],
          };
        }
      }
    }
  }
}

// ── Detectors ─────────────────────────────────────

function detect_truthLeak_paraphrase(v, byCase) {
  const list = PARAPHRASE_LEX[v.caseId] || [];
  const hits = [];
  // Skip aftermath (post-verdict free) and emotional_overload (S4+ allowed)
  if (v.channel === 'aftermath') return hits;
  // For NPC channels, gate by lieState (S3+ allowed per Truth Throttle table)
  const npcChannels = ['interrogation', 'contradiction_pursuit', 'emotional_overload'];
  const allowedNpcStates = ['S3', 'S4', 'S5'];
  if (npcChannels.includes(v.channel) && allowedNpcStates.includes(v.lieState)) return hits;
  // For evidence_present: late stage entries allow more disclosure
  if (v.channel === 'evidence_present') {
    if (/late/.test(v.variantId) || /stage[12]/.test(v.variantId)) return hits;
  }
  for (const { p, label } of list) {
    if (p.test(v.text)) hits.push(label);
  }
  return hits;
}

function detect_d1_lieStateFlow(v) {
  const hits = [];
  // Only NPC interrogation/contradiction_pursuit channels
  const npcChannels = ['interrogation', 'contradiction_pursuit'];
  if (!npcChannels.includes(v.channel)) return hits;
  if (!v.lieState) return hits;
  if (['S0', 'S1', 'S2'].includes(v.lieState)) {
    for (const p of CONFESSION_TONE) {
      if (p.test(v.text)) hits.push(`S0–S2에 자백 톤: ${p.source}`);
    }
  }
  if (v.lieState === 'S5') {
    for (const p of DENIAL_TONE_S5) {
      if (p.test(v.text)) hits.push(`S5에 부정/회피 톤: ${p.source}`);
    }
  }
  return hits;
}

function detect_d3_archetype(v, archMap) {
  // Per-variant single-text detection has too high false positive rate
  // (e.g., implicit assertion via narrative). D3 quant requires aggregated
  // counts across NPC entry population. Only flag CLEAR boundary violations:
  //   - affect_flattening NPC with explicit outburst (!! / 어떻게 그럴 / etc)
  const hits = [];
  if (!v.party || !['a', 'b'].includes(v.party)) return hits;
  if (!['interrogation', 'contradiction_pursuit'].includes(v.channel)) return hits;
  const arch = archMap[v.caseId][v.party].archetype;
  if (arch === 'affect_flattening' && !['S4', 'S5'].includes(v.lieState)) {
    // S4 emotional outburst allowed; flag only at S0~S3
    for (const p of OUTBURST_PATTERNS) {
      if (p.test(v.text)) hits.push(`affect_flattening NPC가 S0–S3에서 격앙 표현: ${p.source}`);
    }
  }
  return hits;
}

function detect_d5_translation(v) {
  const hits = [];
  for (const p of TRANSLATION_PATTERNS) {
    if (p.test(v.text)) hits.push(`번역체: ${p.source}`);
  }
  return hits;
}

function detect_d6_register(v) {
  const hits = [];
  // Judge channels & system_message must be formal 합니다체.
  const formalChannels = [
    'judge_question', 'judge_contradiction', 'judge_evidence_combo',
    'judge_witness_summon', 'system_message',
  ];
  if (formalChannels.includes(v.channel)) {
    for (const p of HAEYO_PATTERNS) if (p.test(v.text)) hits.push(`정식 채널에 해요체: ${p.source}`);
    for (const p of BANMAL_PATTERNS) if (p.test(v.text)) hits.push(`정식 채널에 반말 어미: ${p.source}`);
  }
  // Party→judge channels (NPC speaking to judge): also 합니다체.
  // Per CLAUDE.md: emotional/confession beat (S4 / S5) → 해요체 예외 OK.
  // Flag only explicit colloquial 잖아요 endings (always informal, not emotional exception).
  const partyToJudge = ['interrogation', 'contradiction_pursuit'];
  if (partyToJudge.includes(v.channel) && v.tags.includes('address:toJudge')) {
    if (/잖아요(\.|\s|$)/.test(v.text)) hits.push(`NPC→재판관에 콜로키얼 잖아요 어미`);
    // 해요체 endings only flagged outside S4/S5 emotional/confession exception
    if (!['S4', 'S5'].includes(v.lieState)) {
      // Strict: 네요/어요/해요 sentence-final at S0~S3 (less defensible)
      const sentences = v.text.split(/[.!?…](?:\s|$)/).filter(Boolean);
      for (const s of sentences) {
        if (/(네요|예요|에요|이에요)$/.test(s.trim())) {
          hits.push(`NPC→재판관 S0–S3 해요체 어미: "${s.trim().slice(-12)}"`);
          break;
        }
      }
    }
  }
  return hits;
}

function detect_d7_factMismatch(v) {
  const hits = [];
  // For spouse-01 amounts: extract 만원 amounts and check whitelist
  if (v.caseId === 'spouse-01') {
    const m = v.text.match(/(\d[\d,]*)\s*만\s*원/g) || [];
    for (const tok of m) {
      const num = tok.replace(/[^\d]/g, '');
      const allowed = ['3000', '2000', '5000', '50', '100', '200', '500', '1000', '3500'];
      // common harmless small denominations also allowed (학원비 류)
      if (!allowed.includes(num) && parseInt(num, 10) >= 1000) {
        hits.push(`사건 fact 미스매치: ${tok} (예상 3000/2000/5000)`);
      }
    }
  }
  // family-01: 9:1 variants in non-aftermath
  if (v.caseId === 'family-01' && v.channel !== 'aftermath') {
    if (/\b9\s*[:대]\s*1\b/.test(v.text)) hits.push(`family-01 비율 9:1 변형 노출 (aftermath 외)`);
    if (/\b90\s*%\s*(이|를|이상)/.test(v.text)) hits.push(`family-01 90% 직접 노출`);
  }
  return hits;
}

function detect_d8_appellation(v) {
  const hits = [];
  for (const p of APPELLATION_VIOLATIONS) {
    if (p.test(v.text)) hits.push(`호칭 위반: ${p.source}`);
  }
  return hits;
}

function detect_d9_nominalAwkward(v) {
  const hits = [];
  for (const p of NOMINAL_AWKWARD) {
    if (p.test(v.text)) hits.push(`명사형 부조화: ${p.source}`);
  }
  return hits;
}

function detect_d4_qaCoherence(v, allByCase) {
  // Light heuristic: detect judge_contradiction with direct quote pattern
  // (catches the prohibited '${prev}'라고 하셨는데, '${curr}'라는 내용이 확인됩니다 anti-pattern)
  const hits = [];
  if (v.channel === 'judge_contradiction' || v.channel === 'judge_question') {
    // Long direct-quote pattern
    if (/['"][^'"]{15,}['"]/.test(v.text) && /라고\s*(?:말씀)?하셨/.test(v.text)) {
      hits.push(`긴 직접 인용 의심 (Q-A 정합 anti-pattern)`);
    }
    // System observation phrase blacklist (CLAUDE.md 재판관 질문 품질 규칙)
    const sysPhrases = [
      /태도에\s*변화가\s*감지/,
      /내용이\s*확인됩니다/,
      /흐름이\s*나타납니다/,
      /진술이\s*달라지기\s*시작합니다/, // OK in system_message; flag only in judge_*
    ];
    for (const p of sysPhrases) {
      if (p.test(v.text)) hits.push(`기계적 관찰문: ${p.source}`);
    }
  }
  return hits;
}

// ── main ──────────────────────────────────────────

function main() {
  const data = loadAll();
  const results = {
    generatedAt: new Date().toISOString(),
    head: '5378700',
    scope: 'CT-Cross 9-dimension full population scan',
    cases: CASES,
    counts: {},
    findings: [],
  };
  let total = 0;
  for (const v of iterVariants(data)) {
    total++;
    const dims = {
      'D2_truthLeak_paraphrase': detect_truthLeak_paraphrase(v, data),
      'D1_lieStateFlow':         detect_d1_lieStateFlow(v),
      'D3_archetypeVoice':       detect_d3_archetype(v, ARCHETYPES),
      'D4_qaCoherence':          detect_d4_qaCoherence(v, data),
      'D5_translation':          detect_d5_translation(v),
      'D6_register':             detect_d6_register(v),
      'D7_factMismatch':         detect_d7_factMismatch(v),
      'D8_appellation':          detect_d8_appellation(v),
      'D9_nominalAwkward':       detect_d9_nominalAwkward(v),
    };
    for (const [dim, hits] of Object.entries(dims)) {
      if (hits.length === 0) continue;
      results.findings.push({
        dim, caseId: v.caseId, channel: v.channel, party: v.party,
        disputeId: v.disputeId, lieState: v.lieState,
        variantId: v.variantId, hits,
        textPreview: v.text.length > 140 ? v.text.slice(0, 140) + '…' : v.text,
      });
    }
  }
  results.counts.totalVariantsScanned = total;
  // Aggregate by dim
  const byDim = {};
  const byDimCase = {};
  for (const f of results.findings) {
    byDim[f.dim] = (byDim[f.dim] || 0) + 1;
    const k = `${f.dim}|${f.caseId}`;
    byDimCase[k] = (byDimCase[k] || 0) + 1;
  }
  results.counts.byDim = byDim;
  results.counts.byDimCase = byDimCase;

  // Write full + summary
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const outFile = path.join(OUT, `${stamp}-findings.json`);
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log('total variants scanned:', total);
  console.log('total findings:', results.findings.length);
  console.log('byDim:', JSON.stringify(byDim, null, 1));
  console.log('byDimCase:', JSON.stringify(byDimCase, null, 1));
  console.log('written:', outFile);
}

main();
