/**
 * Stage-1 Deep Audit Script
 * 7건 -01 사건 데이터 품질 + 프롬프트 로직 자동 검증
 */
const fs = require('fs');
const path = require('path');

// ─── Config ───
const CASE_IDS = ['spouse-01', 'family-01', 'friend-01', 'neighbor-01', 'partnership-01', 'tenant-01', 'workplace-01'];
const BASE = path.resolve(__dirname, '..');
const CASES_DIR = path.join(BASE, 'src/data/cases/generated');
const PHASE1_DIR = path.join(BASE, 'src/data/dialogues/phase1');
const PHASE2_DIR = path.join(BASE, 'src/data/dialogues/phase2');
const ATOMS_DIR = path.join(BASE, 'src/data/claimPolicies');

const VALID_ARCHETYPES = ['avoidant', 'confrontational', 'victim_cosplay', 'cold_logic', 'affect_flattening', 'premature_summary'];
const VALID_TELL_TYPES = ['over_precision', 'counter_question', 'timeline_padding', 'evidence_waving', 'motive_jump', 'selective_quote'];

const TRANSLATION_PATTERNS = [
  '된 것으로 생각됩니다',
  '인 측면이 있었습니다',
  '여러 가지.*얽혀',
  '간과하게 된',
  '하는 바입니다',
  '에 기인',
  '부득이하게',
  '해당 건에 대해서는',
  '인지하고 있습니다'
];

const PASSIVE_PATTERNS = [
  '의 존재를 알고 계셨습니까',
  '에 대해 알고 계셨습니까',
  '을 알고 계셨습니까',
  '를 알고 계셨습니까'
];

// ─── Helpers ───
let totalPass = 0;
let totalFail = 0;
let totalWarn = 0;
const failures = [];
const warnings = [];

function pass(section, msg) {
  totalPass++;
  console.log(`  [PASS] ${msg}`);
}

function fail(section, msg) {
  totalFail++;
  failures.push(`[${section}] ${msg}`);
  console.log(`  [FAIL] ${msg}`);
}

function warn(section, msg) {
  totalWarn++;
  warnings.push(`[${section}] ${msg}`);
  console.log(`  [WARN] ${msg}`);
}

function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (e) {
    return null;
  }
}

// Korean jongseong (받침) check for last character
function hasBatchim(char) {
  if (!char) return false;
  const code = char.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return false; // not Korean syllable
  return (code - 0xAC00) % 28 !== 0;
}

function getLastKoreanChar(str) {
  if (!str) return null;
  const trimmed = str.trim();
  for (let i = trimmed.length - 1; i >= 0; i--) {
    const code = trimmed.charCodeAt(i);
    if (code >= 0xAC00 && code <= 0xD7A3) return trimmed[i];
  }
  return null;
}

// 일반 어휘 허용 목록 — anchorTruth에서 추출되더라도 오탐으로 간주
const KEYWORD_ALLOWLIST = new Set([
  '사진', '기록', '환급', '보수', '범위', '누수', '월세', '보증금',
  '수리', '계약', '서류', '통화', '문자', '카드', '소음', '공사',
  '증거', '자료', '내역', '일정', '상담', '연락', '약속', '비용',
  '관리', '요청', '확인', '통보', '서명', '동의', '합의', '신고',
]);

function extractKeywords(anchorTruth) {
  // Extract person names (2-3 char Korean names), institution names, exact amounts
  const keywords = [];
  // Korean names: 2-3 syllable patterns that look like names
  const nameMatches = anchorTruth.match(/[가-힣]{2,3}(?=이|가|은|는|의|에게|한테|와|과|도|를|을)/g);
  if (nameMatches) keywords.push(...nameMatches);
  // Exact amounts with 만원
  const amountMatches = anchorTruth.match(/\d[\d,]*만\s*원/g);
  if (amountMatches) keywords.push(...amountMatches);
  // Specific institution names (3+ chars ending in 센터/원/소/사/국 etc)
  const instMatches = anchorTruth.match(/[가-힣]{2,}(?:센터|병원|사무소|은행|법원|회사|학원|기관)/g);
  if (instMatches) keywords.push(...instMatches);
  // Filter: 2글자 이하 일반 명사 제외 + 허용 목록 제외
  const filtered = [...new Set(keywords)].filter(kw => {
    if (KEYWORD_ALLOWLIST.has(kw)) return false;
    // 2글자 이하이면서 금액/기관명이 아닌 일반 단어 제외
    if (kw.length <= 2 && !/\d/.test(kw) && !/센터|병원|은행|법원|회사|학원|기관/.test(kw)) return false;
    return true;
  });
  return filtered;
}

/**
 * B3 Phase 1/2 검증용 — 핵심 결론 키워드만 추출
 * (인물 실명 3글자+, 기관 정식명칭, 서비스명, 금액)
 */
function extractCoreKeywords(anchorTruth) {
  const keywords = [];
  // 3글자 이상 인물명
  const nameMatches = anchorTruth.match(/[가-힣]{3}(?=이|가|은|는|의|에게|한테|와|과|도|를|을)/g);
  if (nameMatches) keywords.push(...nameMatches);
  // 금액
  const amountMatches = anchorTruth.match(/\d[\d,]*만\s*원/g);
  if (amountMatches) keywords.push(...amountMatches);
  // 기관명 (3글자+ 접미)
  const instMatches = anchorTruth.match(/[가-힣]{3,}(?:센터|병원|사무소|은행|법원|회사|학원|기관)/g);
  if (instMatches) keywords.push(...instMatches);
  // 서비스명 (재가돌봄, 간병 등 — 4글자+)
  const serviceMatches = anchorTruth.match(/[가-힣]{4,}(?:서비스|프로그램|시스템)/g);
  if (serviceMatches) keywords.push(...serviceMatches);
  return [...new Set(keywords)].filter(kw => !KEYWORD_ALLOWLIST.has(kw));
}

function searchText(text, pattern) {
  try {
    return new RegExp(pattern).test(text);
  } catch {
    return text.includes(pattern);
  }
}

function deepStringSearch(obj, pattern) {
  const results = [];
  function walk(o, path) {
    if (typeof o === 'string') {
      if (searchText(o, pattern)) results.push({ path, text: o });
    } else if (Array.isArray(o)) {
      o.forEach((item, i) => walk(item, `${path}[${i}]`));
    } else if (o && typeof o === 'object') {
      Object.entries(o).forEach(([k, v]) => walk(v, `${path}.${k}`));
    }
  }
  walk(obj, '');
  return results;
}

// ─── Main Audit ───
console.log('='.repeat(70));
console.log('  Stage-1 Deep Audit: 7건 데이터 품질 + 프롬프트 로직 검증');
console.log('='.repeat(70));
console.log();

for (const caseId of CASE_IDS) {
  console.log('─'.repeat(60));
  console.log(`▶ ${caseId}`);
  console.log('─'.repeat(60));

  const caseFile = path.join(CASES_DIR, `${caseId}.json`);
  const caseData = loadJSON(caseFile);
  if (!caseData) {
    fail(caseId, `Case file not found: ${caseFile}`);
    continue;
  }

  const phase1File = path.join(PHASE1_DIR, `${caseId}.json`);
  const phase2File = path.join(PHASE2_DIR, `${caseId}.json`);
  const phase1 = loadJSON(phase1File);
  const phase2 = loadJSON(phase2File);

  // Check for v2-atoms file (could be in claimPolicies or gpt-batch)
  const atomsFile = path.join(ATOMS_DIR, `${caseId}-v2-atoms.json`);
  const atoms = loadJSON(atomsFile);

  // ═══ A. 데이터 완전성 ═══
  console.log('\n  [A] 데이터 완전성');

  // A1. 필수 필드
  const requiredTopLevel = ['caseId', 'meta', 'duo', 'context', 'disputes', 'evidence', 'solutions'];
  for (const field of requiredTopLevel) {
    if (caseData[field] !== undefined) {
      pass(caseId, `A1: 필수 필드 '${field}' 존재`);
    } else {
      fail(caseId, `A1: 필수 필드 '${field}' 누락`);
    }
  }

  // A2. duo.partyA/B 필수 필드
  const partyFields = ['name', 'age', 'occupation', 'archetype', 'speechStyle', 'callTerms', 'verbalTells'];
  for (const side of ['partyA', 'partyB']) {
    const party = caseData.duo?.[side];
    if (!party) {
      fail(caseId, `A2: duo.${side} 누락`);
      continue;
    }
    for (const field of partyFields) {
      if (party[field] !== undefined) {
        pass(caseId, `A2: duo.${side}.${field} 존재`);
      } else {
        fail(caseId, `A2: duo.${side}.${field} 누락`);
      }
    }
  }

  // A3. callTerms 필수
  const callTermsFields = ['toPartner', 'toJudge', 'angry'];
  for (const side of ['partyA', 'partyB']) {
    const ct = caseData.duo?.[side]?.callTerms;
    if (!ct) continue;
    for (const field of callTermsFields) {
      if (ct[field]) {
        pass(caseId, `A3: ${side}.callTerms.${field} = "${ct[field]}"`);
      } else {
        fail(caseId, `A3: ${side}.callTerms.${field} 누락`);
      }
    }
  }

  // A4. disputes 배열
  const disputes = caseData.disputes || [];
  const disputeFields = ['id', 'name', 'anchorTruth', 'category'];
  // anchorTruth is actually in meta, disputes have truthDescription; check id, name
  // Re-check: disputes have id, name. anchorTruth is in meta. Let's check id, name, truthDescription, quadrant
  for (const d of disputes) {
    for (const f of ['id', 'name']) {
      if (d[f]) {
        pass(caseId, `A4: dispute ${d.id} has '${f}'`);
      } else {
        fail(caseId, `A4: dispute missing '${f}'`);
      }
    }
    // anchorTruth is meta-level, disputes have truthDescription
    if (d.truthDescription || d.anchorTruth) {
      pass(caseId, `A4: dispute ${d.id} has truth description`);
    } else {
      warn(caseId, `A4: dispute ${d.id} — truthDescription / anchorTruth 모두 없음`);
    }
    // category = quadrant in this schema
    if (d.quadrant || d.category) {
      pass(caseId, `A4: dispute ${d.id} has category/quadrant`);
    } else {
      fail(caseId, `A4: dispute ${d.id} — category/quadrant 누락`);
    }
  }

  // A5. evidence 배열
  const evidence = caseData.evidence || [];
  for (const ev of evidence) {
    for (const f of ['id', 'name', 'description', 'surfaceName']) {
      if (ev[f]) {
        pass(caseId, `A5: evidence ${ev.id} has '${f}'`);
      } else {
        fail(caseId, `A5: evidence ${ev.id || '?'} missing '${f}'`);
      }
    }
  }

  // A6. archetype 검증
  for (const side of ['partyA', 'partyB']) {
    const arch = caseData.duo?.[side]?.archetype;
    if (VALID_ARCHETYPES.includes(arch)) {
      pass(caseId, `A6: ${side}.archetype = "${arch}" (유효)`);
    } else {
      fail(caseId, `A6: ${side}.archetype = "${arch}" — 6종 범위 밖. 허용: ${VALID_ARCHETYPES.join(', ')}`);
    }
  }

  // A7. verbalTells[0].type 검증
  for (const side of ['partyA', 'partyB']) {
    const tells = caseData.duo?.[side]?.verbalTells;
    if (!tells || tells.length === 0) {
      fail(caseId, `A7: ${side}.verbalTells 비어있음`);
      continue;
    }
    const firstType = tells[0].type;
    if (VALID_TELL_TYPES.includes(firstType)) {
      pass(caseId, `A7: ${side}.verbalTells[0].type = "${firstType}" (유효)`);
    } else {
      // Allow custom types but warn
      warn(caseId, `A7: ${side}.verbalTells[0].type = "${firstType}" — 표준 6종 밖 (사건별 커스텀일 수 있음)`);
    }
  }

  // ═══ B. 스포일러 안전성 ═══
  console.log('\n  [B] 스포일러 안전성');

  const anchorTruth = caseData.meta?.anchorTruth || '';
  const keywords = extractKeywords(anchorTruth);
  if (keywords.length === 0) {
    warn(caseId, `B: anchorTruth에서 키워드 추출 실패 — 수동 확인 필요. anchorTruth: "${anchorTruth.substring(0, 60)}..."`);
  }

  // B1. surfaceName spoiler check
  let spoilerClean = true;
  for (const ev of evidence) {
    for (const kw of keywords) {
      if (ev.surfaceName && ev.surfaceName.includes(kw)) {
        fail(caseId, `B1: evidence ${ev.id} surfaceName에 anchorTruth 키워드 "${kw}" 포함: "${ev.surfaceName}"`);
        spoilerClean = false;
      }
    }
  }
  if (spoilerClean && keywords.length > 0) {
    pass(caseId, `B1: surfaceName에 anchorTruth 키워드 미포함`);
  }

  // B2. surfaceDescription spoiler check
  spoilerClean = true;
  for (const ev of evidence) {
    for (const kw of keywords) {
      if (ev.surfaceDescription && ev.surfaceDescription.includes(kw)) {
        fail(caseId, `B2: evidence ${ev.id} surfaceDescription에 anchorTruth 키워드 "${kw}" 포함`);
        spoilerClean = false;
      }
    }
  }
  if (spoilerClean && keywords.length > 0) {
    pass(caseId, `B2: surfaceDescription에 anchorTruth 키워드 미포함`);
  }

  // B3. Phase 1/2 spoiler check — 핵심 결론 키워드만 검출 (오탐 방지)
  const coreKeywords = extractCoreKeywords(anchorTruth);
  for (const [label, data] of [['Phase1', phase1], ['Phase2', phase2]]) {
    if (!data) {
      warn(caseId, `B3: ${label} 파일 없음 — 스킵`);
      continue;
    }
    const dialogues = data.dialogues || [];
    let found = false;
    for (const kw of coreKeywords) {
      for (const dlg of dialogues) {
        if (dlg.text && dlg.text.includes(kw)) {
          fail(caseId, `B3: ${label} 대사에 anchorTruth 핵심 키워드 "${kw}" 포함: "${dlg.text.substring(0, 50)}..."`);
          found = true;
        }
      }
    }
    if (!found && coreKeywords.length > 0) {
      pass(caseId, `B3: ${label} 대사에 anchorTruth 핵심 키워드 미포함`);
    }
  }

  // ═══ C. 호칭/조사 정합성 ═══
  console.log('\n  [C] 호칭/조사 정합성');

  for (const side of ['partyA', 'partyB']) {
    const ct = caseData.duo?.[side]?.callTerms;
    if (!ct) continue;
    const partyName = caseData.duo?.[side]?.name || '';

    // C1. toJudge 받침 분석
    const toJudge = ct.toJudge || '';
    const lastChar = getLastKoreanChar(toJudge);
    if (lastChar) {
      const batchim = hasBatchim(lastChar);
      pass(caseId, `C1: ${side}.toJudge = "${toJudge}" — 끝글자 '${lastChar}' 받침${batchim ? '있음' : '없음'} → 예상 조사: ${batchim ? '이/은/을' : '가/는/를'}`);
    } else {
      warn(caseId, `C1: ${side}.toJudge = "${toJudge}" — 한글 끝글자 미감지`);
    }

    // C2. toPartner 아/야 접미사 정합성
    const toPartner = ct.toPartner || '';
    if (toPartner.endsWith('아') || toPartner.endsWith('야')) {
      const nameBase = toPartner.slice(0, -1);
      const lastNameChar = getLastKoreanChar(nameBase);
      if (lastNameChar) {
        const batchim = hasBatchim(lastNameChar);
        const expectedSuffix = batchim ? '아' : '야';
        const actualSuffix = toPartner.slice(-1);
        if (actualSuffix === expectedSuffix) {
          pass(caseId, `C2: ${side}.toPartner = "${toPartner}" — '${lastNameChar}' 받침${batchim ? '있음→아' : '없음→야'} 정합`);
        } else {
          fail(caseId, `C2: ${side}.toPartner = "${toPartner}" — '${lastNameChar}' 받침${batchim ? '있음' : '없음'}, 예상 '${expectedSuffix}' ≠ 실제 '${actualSuffix}'`);
        }
      }
    } else {
      // No 아/야 suffix — could be a term like "자기", "누나" etc. — just note it
      pass(caseId, `C2: ${side}.toPartner = "${toPartner}" — 아/야 접미사 아님 (별칭/호칭)`);
    }

    // C3. angry에 "씨" 또는 이름 포함
    const angry = ct.angry || '';
    if (angry.includes('씨') || angry.includes(partyName)) {
      pass(caseId, `C3: ${side}.angry = "${angry}" — 씨/이름 포함`);
    } else {
      // Could also contain partner's name
      const otherSide = side === 'partyA' ? 'partyB' : 'partyA';
      const otherName = caseData.duo?.[otherSide]?.name || '';
      if (angry.includes(otherName)) {
        pass(caseId, `C3: ${side}.angry = "${angry}" — 상대 이름 포함`);
      } else {
        warn(caseId, `C3: ${side}.angry = "${angry}" — 씨/이름 미포함 (감탄형일 수 있음)`);
      }
    }
  }

  // ═══ D. 텍스트 품질 ═══
  console.log('\n  [D] 텍스트 품질');

  // D1. 번역체 패턴 grep
  const textSources = [];
  // evidence texts
  for (const ev of evidence) {
    textSources.push({ label: `evidence.${ev.id}.description`, text: ev.description });
    textSources.push({ label: `evidence.${ev.id}.surfaceDescription`, text: ev.surfaceDescription || '' });
    if (ev.investigationResults) {
      for (const [k, v] of Object.entries(ev.investigationResults)) {
        if (typeof v === 'string') textSources.push({ label: `evidence.${ev.id}.investigation.${k}`, text: v });
      }
    }
    if (ev.investigationStages) {
      for (const stage of ev.investigationStages) {
        if (stage.question?.text) {
          textSources.push({ label: `evidence.${ev.id}.stage${stage.stage}.question`, text: stage.question.text });
        }
      }
    }
  }
  // Phase 1/2 texts
  for (const [label, data] of [['phase1', phase1], ['phase2', phase2]]) {
    if (!data) continue;
    const dialogues = data.dialogues || [];
    dialogues.forEach((d, i) => {
      if (d.text) textSources.push({ label: `${label}[${i}]`, text: d.text });
    });
  }
  // v2-atoms texts
  if (atoms) {
    const atomResults = deepStringSearch(atoms, '');
    // We'll search atoms via deepStringSearch per pattern below
  }

  let translationIssues = 0;
  for (const pattern of TRANSLATION_PATTERNS) {
    for (const src of textSources) {
      if (searchText(src.text, pattern)) {
        fail(caseId, `D1: 번역체 패턴 "${pattern}" in ${src.label}: "${src.text.substring(0, 60)}..."`);
        translationIssues++;
      }
    }
    // Also search atoms
    if (atoms) {
      const hits = deepStringSearch(atoms, pattern);
      for (const h of hits) {
        fail(caseId, `D1: 번역체 패턴 "${pattern}" in v2-atoms${h.path}: "${h.text.substring(0, 60)}..."`);
        translationIssues++;
      }
    }
  }
  if (translationIssues === 0) {
    pass(caseId, `D1: 번역체 9패턴 미검출`);
  }

  // D2. "사전 상의/협의" 패턴
  let d2Issues = 0;
  const d2pattern = '사전 (상의|협의)';
  for (const src of textSources) {
    if (searchText(src.text, d2pattern)) {
      fail(caseId, `D2: "사전 상의/협의" in ${src.label}: "${src.text.substring(0, 60)}..."`);
      d2Issues++;
    }
  }
  if (atoms) {
    const hits = deepStringSearch(atoms, d2pattern);
    for (const h of hits) {
      fail(caseId, `D2: "사전 상의/협의" in v2-atoms${h.path}`);
      d2Issues++;
    }
  }
  if (d2Issues === 0) pass(caseId, `D2: "사전 상의/협의" 미검출`);

  // D3. "특정 X" 패턴
  let d3Issues = 0;
  const d3pattern = '특정 [가-힣]';
  for (const src of textSources) {
    if (searchText(src.text, d3pattern)) {
      fail(caseId, `D3: "특정 X" in ${src.label}: "${src.text.substring(0, 60)}..."`);
      d3Issues++;
    }
  }
  if (atoms) {
    const hits = deepStringSearch(atoms, d3pattern);
    for (const h of hits) {
      fail(caseId, `D3: "특정 X" in v2-atoms${h.path}`);
      d3Issues++;
    }
  }
  if (d3Issues === 0) pass(caseId, `D3: "특정 X" 미검출`);

  // D4. v2-atoms S0-S1에서 구체적 금액 남아있는지
  if (atoms) {
    const amountPattern = /\d[\d,]*만\s*원|\d{1,3}(,\d{3})+원|\d+원/;
    let d4Issues = 0;
    const policies = atoms.claimPolicies;
    if (policies) {
      for (const side of ['a', 'b']) {
        if (!policies[side]) continue;
        for (const [disputeId, stateMap] of Object.entries(policies[side])) {
          for (const state of ['S0', 'S1']) {
            const stateData = stateMap[state];
            if (!stateData?.claimAtoms) continue;
            for (const atom of stateData.claimAtoms) {
              if (atom.factText && amountPattern.test(atom.factText)) {
                fail(caseId, `D4: v2-atoms ${side}.${disputeId}.${state} factText에 금액 잔존: "${atom.factText}"`);
                d4Issues++;
              }
              if (atom.publicClaim && amountPattern.test(atom.publicClaim)) {
                fail(caseId, `D4: v2-atoms ${side}.${disputeId}.${state} publicClaim에 금액 잔존: "${atom.publicClaim}"`);
                d4Issues++;
              }
            }
          }
        }
      }
    }
    if (d4Issues === 0) pass(caseId, `D4: v2-atoms S0-S1 구체적 금액 미검출`);
  } else {
    warn(caseId, `D4: v2-atoms 파일 없음 — 스킵 (${caseId})`);
  }

  // ═══ E. investigationStages 검증 ═══
  console.log('\n  [E] investigationStages 검증');

  // E1. investigationStages 존재 여부
  let hasStages = true;
  for (const ev of evidence) {
    if (!ev.investigationStages || !Array.isArray(ev.investigationStages)) {
      fail(caseId, `E1: evidence ${ev.id} — investigationStages 누락`);
      hasStages = false;
    } else {
      pass(caseId, `E1: evidence ${ev.id} — investigationStages 존재 (${ev.investigationStages.length}개)`);
    }
  }

  // E2. 각 증거에 stage 0/1/2 완전 존재
  for (const ev of evidence) {
    if (!ev.investigationStages) continue;
    const stageNums = ev.investigationStages.map(s => s.stage);
    for (const needed of [0, 1, 2]) {
      if (stageNums.includes(needed)) {
        pass(caseId, `E2: evidence ${ev.id} stage ${needed} 존재`);
      } else {
        fail(caseId, `E2: evidence ${ev.id} stage ${needed} 누락`);
      }
    }
  }

  // E3. stage 0 질문에 수동 표현 잔존
  let e3Issues = 0;
  for (const ev of evidence) {
    if (!ev.investigationStages) continue;
    const stage0 = ev.investigationStages.find(s => s.stage === 0);
    if (!stage0?.question?.text) continue;
    for (const pattern of PASSIVE_PATTERNS) {
      if (stage0.question.text.includes(pattern)) {
        fail(caseId, `E3: evidence ${ev.id} stage0 질문에 수동 표현: "${pattern}" → "${stage0.question.text}"`);
        e3Issues++;
      }
    }
  }
  if (e3Issues === 0) pass(caseId, `E3: stage 0 질문 수동 표현 미검출`);

  // E4. "특정 X" 패턴 잔존 (investigationStages 내)
  let e4Issues = 0;
  for (const ev of evidence) {
    if (!ev.investigationStages) continue;
    for (const stage of ev.investigationStages) {
      if (stage.question?.text && searchText(stage.question.text, '특정 [가-힣]')) {
        fail(caseId, `E4: evidence ${ev.id} stage ${stage.stage} 질문에 "특정 X": "${stage.question.text}"`);
        e4Issues++;
      }
    }
  }
  if (e4Issues === 0) pass(caseId, `E4: investigationStages "특정 X" 미검출`);

  // ═══ F. 교차 참조 ═══
  console.log('\n  [F] 교차 참조');

  // F1. evidence.id가 disputes에서 참조되는지
  const disputeEvidenceRefs = new Set();
  for (const d of disputes) {
    if (d.requiredEvidence) {
      d.requiredEvidence.forEach(eId => disputeEvidenceRefs.add(eId));
    }
  }
  for (const ev of evidence) {
    if (disputeEvidenceRefs.has(ev.id)) {
      pass(caseId, `F1: evidence ${ev.id} — disputes에서 참조됨`);
    } else {
      warn(caseId, `F1: evidence ${ev.id} — disputes.requiredEvidence에서 참조되지 않음 (보조 증거일 수 있음)`);
    }
  }

  // F2. v2-atoms disputeId가 case JSON disputes.id와 일치
  if (atoms) {
    const caseDisputeIds = new Set(disputes.map(d => d.id));
    const policies = atoms.claimPolicies;
    if (policies) {
      let f2Issues = 0;
      for (const side of ['a', 'b']) {
        if (!policies[side]) continue;
        for (const disputeId of Object.keys(policies[side])) {
          if (caseDisputeIds.has(disputeId)) {
            pass(caseId, `F2: v2-atoms ${side}.${disputeId} — case disputes에 존재`);
          } else {
            fail(caseId, `F2: v2-atoms ${side}.${disputeId} — case disputes에 없음!`);
            f2Issues++;
          }
        }
      }
      // Also check if atoms reference disputeId inside state objects
      for (const side of ['a', 'b']) {
        if (!policies[side]) continue;
        for (const [dId, stateMap] of Object.entries(policies[side])) {
          for (const [state, stateData] of Object.entries(stateMap)) {
            if (stateData.disputeId && stateData.disputeId !== dId) {
              fail(caseId, `F2: v2-atoms ${side}.${dId}.${state}.disputeId = "${stateData.disputeId}" ≠ key "${dId}"`);
              f2Issues++;
            }
          }
        }
      }
      if (f2Issues === 0) pass(caseId, `F2: v2-atoms disputeId 전체 일치`);
    }
  } else {
    warn(caseId, `F2: v2-atoms 파일 없음 — 교차 참조 스킵`);
  }

  console.log();
}

// ═══ 종합 리포트 ═══
console.log('='.repeat(70));
console.log('  종합 리포트');
console.log('='.repeat(70));
console.log(`  PASS: ${totalPass}`);
console.log(`  FAIL: ${totalFail}`);
console.log(`  WARN: ${totalWarn}`);
console.log();

if (failures.length > 0) {
  console.log('─── FAIL 상세 ───');
  failures.forEach(f => console.log(`  ${f}`));
  console.log();
}

if (warnings.length > 0) {
  console.log('─── WARN 상세 ───');
  warnings.forEach(w => console.log(`  ${w}`));
  console.log();
}

if (totalFail === 0) {
  console.log('  ★ 전체 PASS — 모든 검증 항목 통과');
} else {
  console.log(`  ✗ ${totalFail}건 FAIL — 위 항목 수정 필요`);
}

process.exit(totalFail > 0 ? 1 : 0);
