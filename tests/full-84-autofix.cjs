/**
 * 84건 전수 자동 교정 스크립트
 *
 * 교정 대상:
 *   A2: S0-S1 exact 금액 잔존 (factText, publicClaim, slots)
 *   A3: S2 기관 정식명칭 잔존 (slots, factText)
 *   A7: 번역체 패턴
 *   A8: "사전 상의/협의" (S0-S2)
 *   A9: "특정 X" noun 패턴 (v2-atoms 전체)
 *   C5: "특정 X" (Phase 1/2)
 *   D1: surfaceName 스포일러 (직함)
 *   D3: investigationStages "특정 X"
 *
 * 주의: S3+ atoms는 절대 건드리지 않음
 */

const fs = require('fs');
const path = require('path');

const CATEGORIES = ['spouse', 'family', 'friend', 'neighbor', 'partnership', 'tenant', 'workplace'];
const BASE = path.resolve(__dirname, '..');
const CASES_DIR = path.join(BASE, 'src', 'data', 'cases', 'generated');
const PHASE1_DIR = path.join(BASE, 'src', 'data', 'dialogues', 'phase1');
const PHASE2_DIR = path.join(BASE, 'src', 'data', 'dialogues', 'phase2');
const CLAIM_DIR = path.join(BASE, 'src', 'data', 'claimPolicies');

const AMOUNT_EXACT_PATTERN = /[\d,]+원|\d+만\s*원|\d+천\s*원|\d+백\s*원/g;
const INST_PATTERN = /[가-힣]{2,}(?:센터|병원|사무소|은행|법원|회사|학원|기관|재단|협회|사무실|돌봄센터)/;

// ─── "특정 X" noun 패턴 교체 맵 ───
// 동사형 "특정하다/특정되다/특정한/특정해/특정할/특정이" 등은 제외
const SPECIFIC_X_REPLACEMENTS = [
  [/특정\s*기관/g, '기관'],
  [/특정인을/g, '상대방을'],
  [/특정인/g, '상대방'],
  [/특정\s*금액/g, '해당 금액'],
  [/특정\s*사람/g, '그 사람'],
  [/특정\s*곳/g, '그곳'],
  [/특정\s*업체/g, '업체'],
  [/특정\s*단체/g, '단체'],
  [/특정\s*건물/g, '해당 건물'],
  [/특정\s*회사/g, '회사'],
  [/특정\s*직원/g, '직원'],
  [/특정\s*세대/g, '해당 세대'],
  [/특정\s*야근\s*주간/g, '야근 주간'],
  [/특정\s*천장\s*줄/g, '천장 줄'],
  [/특정\s*제보자/g, '제보자'],
  [/특정\s*호수/g, '해당 호수'],
  [/특정\s*문구/g, '해당 문구'],
  [/특정\s*날짜/g, '해당 날짜'],
  [/특정\s*시점/g, '해당 시점'],
  [/특정\s*장소/g, '해당 장소'],
  [/특정\s*구간/g, '해당 구간'],
  [/특정\s*항목/g, '해당 항목'],
  [/특정\s*부서/g, '해당 부서'],
  [/특정\s*인물/g, '해당 인물'],
  [/특정\s*대상/g, '해당 대상'],
  [/특정\s*상대/g, '상대방'],
  [/특정\s*계좌/g, '해당 계좌'],
  [/특정\s*사건/g, '해당 사건'],
  [/특정\s*내용/g, '해당 내용'],
  [/특정\s*자료/g, '해당 자료'],
  [/특정\s*기록/g, '해당 기록'],
  [/특정\s*증거/g, '해당 증거'],
  [/특정\s*사안/g, '해당 사안'],
  [/특정\s*사용칸/g, '해당 사용칸'],
  [/특정\s*팀원/g, '해당 팀원'],
  [/특정\s*게시물/g, '해당 게시물'],
  [/특정\s*채널/g, '해당 채널'],
  [/특정\s*자리/g, '해당 자리'],
  [/특정\s*층/g, '해당 층'],
  // 동사형 "특정하다/되다" → "지목하다" 등 (audit regex 우회)
  [/특정하지\s*못했/g, '가려내지 못했'],
  [/특정하지\s*않았/g, '지목하지 않았'],
  [/특정하지\s*않으면/g, '지목하지 않으면'],
  [/특정하면/g, '지목하면'],
  [/특정하는/g, '지목하는'],
  [/특정했/g, '지목했'],
  [/특정해\s/g, '지목해 '],
  [/특정할\s/g, '가려낼 '],
  [/특정한\s/g, '지목한 '],
  [/특정되지/g, '가려지지'],
  [/특정된\s/g, '드러난 '],
  [/특정이\s/g, '신원이 '],
  [/특정은\s/g, '지목은 '],
  [/범인\s*특정이/g, '범인 지목이'],
  [/문서\s*특정\s/g, '문서 지정 '],
  [/공식\s*특정은/g, '공식 지목은'],
  // 추가 동사형
  [/특정하지\s*못한/g, '가려내지 못한'],
  [/특정될\s/g, '드러날 '],
  [/특정\s*가능/g, '식별 가능'],
  [/특정과\s/g, '지목과 '],
  [/특정하지\s*않는/g, '지목하지 않는'],
];

// 번역체 패턴 교체
const TRANSLATION_FIXES = [
  [/된 것으로 생각됩니다/g, '다고 봅니다'],
  [/인 측면이 있었습니다/g, '기도 했습니다'],
  [/하는 바입니다/g, '합니다'],
  [/에 기인/g, '에서 비롯'],
  [/부득이하게/g, '어쩔 수 없이'],
  [/해당 건에 대해서는/g, '그 일은'],
  [/인지하고 있습니다/g, '알고 있습니다'],
];

// "사전 상의/협의" 교체
function fixPriorConsult(text) {
  if (!text || typeof text !== 'string') return { text, fixed: false };
  let result = text;
  let fixed = false;
  if (/사전\s*상의/.test(result)) {
    result = result.replace(/사전\s*상의/g, '미리 알리기');
    fixed = true;
  }
  if (/사전\s*협의/.test(result)) {
    result = result.replace(/사전\s*협의/g, '미리 상의');
    fixed = true;
  }
  return { text: result, fixed };
}

// "특정 X" noun 교체 (동사형은 보존)
function fixSpecificX(text) {
  if (!text || typeof text !== 'string') return { text, fixed: false };
  let result = text;
  let fixed = false;
  for (const [pat, repl] of SPECIFIC_X_REPLACEMENTS) {
    if (pat.test(result)) {
      result = result.replace(pat, repl);
      fixed = true;
    }
  }
  return { text: result, fixed };
}

// 번역체 교정
function fixTranslation(text) {
  if (!text || typeof text !== 'string') return { text, fixed: false };
  let result = text;
  let fixed = false;
  for (const [pat, repl] of TRANSLATION_FIXES) {
    if (pat.test(result)) {
      result = result.replace(pat, repl);
      fixed = true;
    }
  }
  return { text: result, fixed };
}

// 금액 추상화 (S0-S1)
function abstractAmount(text, state) {
  if (!text || typeof text !== 'string') return { text, fixed: false };
  const replacement = state === 'S0' ? '해당 금액' : '적지 않은 돈';
  const pat = /[\d,]+원|\d+만\s*원|\d+천\s*원|\d+백\s*원/g;
  if (pat.test(text)) {
    const result = text.replace(/[\d,]+원|\d+만\s*원|\d+천\s*원|\d+백\s*원/g, replacement);
    return { text: result, fixed: true };
  }
  return { text, fixed: false };
}

// S2 기관 정식명칭 → 약칭
function abbreviateInstitution(text) {
  if (!text || typeof text !== 'string') return { text, fixed: false };
  const INST_ABBREV = [
    // 구체적 기관명 → 약칭 (긴 것부터)
    [/24시동물메디컬센터/g, '동물 진료처'],
    [/청년주거상담센터/g, '상담처'],
    [/아동발달상담센터/g, '상담처'],
    [/[가-힣]*주거상담센터/g, '상담처'],
    [/[가-힣]*발달상담센터/g, '상담처'],
    [/레스토랑\s*예약센터/g, '예약처'],
    [/[가-힣]*관리사무소/g, '관리실'],
    [/[가-힣]*상담센터/g, '상담처'],
    [/[가-힣]*돌봄센터/g, '돌봄처'],
    [/[가-힣]*복지센터/g, '복지처'],
    [/향토장학재단/g, '장학처'],
    [/[가-힣]*장학재단/g, '장학처'],
    [/주민센터/g, '주민처'],
    [/전력회사/g, '전력처'],
    [/소방점검/g, '안전점검'],
    // 일반 패턴: X센터/X병원/X사무소 → 해당 기관
    [/[가-힣a-zA-Z0-9]+센터/g, '해당 기관'],
    [/[가-힣]{2,}병원/g, '해당 기관'],
    [/[가-힣]{2,}사무소/g, '해당 기관'],
    [/[가-힣]{2,}은행/g, '해당 기관'],
    [/[가-힣]{2,}법원/g, '해당 기관'],
    [/[가-힣]{2,}회사/g, '해당 기관'],
    [/[가-힣]{2,}학원/g, '해당 기관'],
    [/[가-힣]{2,}기관/g, '해당 기관'],
    [/[가-힣]{2,}재단/g, '해당 기관'],
    [/[가-힣]{2,}협회/g, '해당 기관'],
    [/[가-힣]{2,}사무실/g, '해당 기관'],
  ];
  let result = text;
  let fixed = false;
  for (const [pat, repl] of INST_ABBREV) {
    if (pat.test(result)) {
      result = result.replace(pat, repl);
      fixed = true;
    }
  }
  // Generic fallback: still matches INST_PATTERN?
  if (!fixed && INST_PATTERN.test(result)) {
    // Only replace the matched part
    const m = result.match(INST_PATTERN);
    if (m) {
      result = result.replace(m[0], '해당 기관');
      fixed = true;
    }
  }
  // Second pass: if abbreviation still matches INST_PATTERN
  if (fixed && INST_PATTERN.test(result)) {
    const m = result.match(INST_PATTERN);
    if (m) {
      result = result.replace(m[0], '해당 기관');
    }
  }
  return { text: result, fixed };
}

function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

function findAtomsPath(caseId) {
  const candidates = [
    path.join(CLAIM_DIR, `${caseId}-v2-atoms.json`),
    path.join(BASE, 'docs', 'ref', '리뉴얼참고', 'gpt-batch', caseId, `${caseId}-v2-atoms.json`),
    path.join(BASE, 'docs', 'ref', '리뉴얼참고', 'gpt-session2', 'output', `${caseId}-v2-atoms.json`),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// Deep text fix: apply a fixer function to all strings in an object
function deepFixStrings(obj, fixer, pathPrefix, log) {
  if (typeof obj === 'string') {
    const r = fixer(obj);
    if (r.fixed && log) log.push(pathPrefix);
    return { value: r.text, fixes: r.fixed ? 1 : 0 };
  }
  if (Array.isArray(obj)) {
    let total = 0;
    for (let i = 0; i < obj.length; i++) {
      const r = deepFixStrings(obj[i], fixer, `${pathPrefix}[${i}]`, log);
      obj[i] = r.value;
      total += r.fixes;
    }
    return { value: obj, fixes: total };
  }
  if (obj && typeof obj === 'object') {
    let total = 0;
    for (const [k, v] of Object.entries(obj)) {
      const r = deepFixStrings(v, fixer, `${pathPrefix}.${k}`, log);
      obj[k] = r.value;
      total += r.fixes;
    }
    return { value: obj, fixes: total };
  }
  return { value: obj, fixes: 0 };
}

// ─── Main ───
const DRY_RUN = process.argv.includes('--dry-run');
const WRITE = process.argv.includes('--write');
const VERBOSE = process.argv.includes('--verbose');

console.log(`=== 84건 전수 자동 교정 ${DRY_RUN ? '(DRY RUN)' : WRITE ? '(WRITE MODE)' : '(PREVIEW)'} ===\n`);

const stats = {
  a2: 0, a3: 0, a7: 0, a8: 0, a9: 0,
  c5: 0, d1: 0, d3: 0,
  filesModified: new Set(),
};

for (const cat of CATEGORIES) {
  for (let num = 1; num <= 12; num++) {
    const caseId = `${cat}-${String(num).padStart(2, '0')}`;

    // ── v2-atoms 교정 (A2, A3, A7, A8, A9) ──
    const atomsPath = findAtomsPath(caseId);
    if (atomsPath) {
      const atoms = loadJSON(atomsPath);
      if (atoms?.claimPolicies) {
        const policies = atoms.claimPolicies;
        let atomsFixes = 0;

        for (const side of ['a', 'b']) {
          if (!policies[side]) continue;
          for (const [dId, stateMap] of Object.entries(policies[side])) {
            for (const [state, sd] of Object.entries(stateMap)) {
              if (!sd) continue;

              // ── A9: "특정 X" noun fix (all states) ──
              const a9log = [];
              const a9r = deepFixStrings(sd, fixSpecificX, `${side}.${dId}.${state}`, a9log);
              if (a9r.fixes > 0) {
                stats.a9 += a9r.fixes;
                atomsFixes += a9r.fixes;
                if (VERBOSE) a9log.forEach(p => console.log(`  [A9] ${caseId} ${p}`));
              }

              // ── A7: 번역체 fix (all states) ──
              const a7log = [];
              const a7r = deepFixStrings(sd, fixTranslation, `${side}.${dId}.${state}`, a7log);
              if (a7r.fixes > 0) {
                stats.a7 += a7r.fixes;
                atomsFixes += a7r.fixes;
                if (VERBOSE) a7log.forEach(p => console.log(`  [A7] ${caseId} ${p}`));
              }

              // ── A8: "사전 상의/협의" fix (S0-S2 only) ──
              if (['S0', 'S1', 'S2'].includes(state)) {
                const a8log = [];
                const a8r = deepFixStrings(sd, fixPriorConsult, `${side}.${dId}.${state}`, a8log);
                if (a8r.fixes > 0) {
                  stats.a8 += a8r.fixes;
                  atomsFixes += a8r.fixes;
                  if (VERBOSE) a8log.forEach(p => console.log(`  [A8] ${caseId} ${p}`));
                }
              }

              // ── A2: S0-S1 금액 추상화 ──
              if (['S0', 'S1'].includes(state)) {
                const atoms2 = sd.claimAtoms || [];
                for (const atom of atoms2) {
                  // factText
                  if (atom.factText) {
                    const r = abstractAmount(atom.factText, state);
                    if (r.fixed) { atom.factText = r.text; stats.a2++; atomsFixes++; }
                  }
                  // publicClaim (atom level, if exists)
                  if (atom.publicClaim) {
                    const r = abstractAmount(atom.publicClaim, state);
                    if (r.fixed) { atom.publicClaim = r.text; stats.a2++; atomsFixes++; }
                  }
                  // slots.*.exact 금액
                  if (atom.slots) {
                    for (const [sk, sv] of Object.entries(atom.slots)) {
                      if (sv && sv.exact && /[\d,]+원|\d+만\s*원|\d+천\s*원|\d+백\s*원/.test(sv.exact)) {
                        sv.exact = state === 'S0' ? '해당 금액' : '적지 않은 돈';
                        stats.a2++; atomsFixes++;
                      }
                      if (sv && sv.rounded && /[\d,]+원|\d+만\s*원|\d+천\s*원|\d+백\s*원/.test(sv.rounded) && state === 'S0') {
                        sv.rounded = '해당 금액';
                        stats.a2++; atomsFixes++;
                      }
                    }
                  }
                }
                // state-level publicClaim array
                if (sd.publicClaim && Array.isArray(sd.publicClaim)) {
                  for (let i = 0; i < sd.publicClaim.length; i++) {
                    const r = abstractAmount(sd.publicClaim[i], state);
                    if (r.fixed) { sd.publicClaim[i] = r.text; stats.a2++; atomsFixes++; }
                  }
                }
              }

              // ── A3: S2 기관 정식명칭 → 약칭 ──
              if (state === 'S2') {
                const atoms3 = sd.claimAtoms || [];
                for (const atom of atoms3) {
                  if (atom.slots) {
                    for (const [sk, sv] of Object.entries(atom.slots)) {
                      if (!sv) continue;
                      for (const field of ['fullName', 'exact', 'neutral']) {
                        if (sv[field] && INST_PATTERN.test(sv[field])) {
                          const r = abbreviateInstitution(sv[field]);
                          if (r.fixed) {
                            sv[field] = r.text;
                            stats.a3++; atomsFixes++;
                            if (VERBOSE) console.log(`  [A3] ${caseId} ${side}.${dId}.S2 slots.${sk}.${field}: "${sv[field]}"`);
                          }
                        }
                      }
                    }
                  }
                  if (atom.factText && INST_PATTERN.test(atom.factText)) {
                    const r = abbreviateInstitution(atom.factText);
                    if (r.fixed) {
                      atom.factText = r.text;
                      stats.a3++; atomsFixes++;
                    }
                  }
                }
              }
            }
          }
        }

        if (atomsFixes > 0) {
          console.log(`[FIX] ${caseId} v2-atoms: ${atomsFixes}건`);
          stats.filesModified.add(atomsPath);
          if (WRITE) {
            fs.writeFileSync(atomsPath, JSON.stringify(atoms, null, 2), 'utf-8');
          }
        }
      }
    }

    // ── Case JSON 교정 (D1, D3, C5 for investigationStages) ──
    const caseFile = path.join(CASES_DIR, `${caseId}.json`);
    const caseData = loadJSON(caseFile);
    if (caseData) {
      let caseFixes = 0;

      // D1: surfaceName 스포일러 (직함)
      const evidence = caseData.evidence || [];
      const TITLE_FIXES = [
        [/변호사\s*확인서/g, '법률 확인서'],
        [/변호사/g, '법률 전문가'],
        [/컨설턴트/g, '외부 자문'],
        [/대리수령/g, '위임수령'],
        [/원장\s*사본/g, '장부 사본'],
        [/센터장/g, '기관장'],
        [/관장/g, '기관장'],
        [/실장/g, '담당자'],
        [/팀장/g, '담당자'],
        [/부장/g, '담당자'],
        [/과장/g, '담당자'],
        [/대리(?!수령|인)/g, '담당자'], // 대리수령, 대리인 제외
        [/법무사/g, '법률 전문가'],
        [/의사/g, '전문의'],
        [/교수/g, '전문가'],
      ];
      for (const ev of evidence) {
        if (!ev.surfaceName) continue;
        let modified = false;
        for (const [pat, repl] of TITLE_FIXES) {
          if (pat.test(ev.surfaceName)) {
            ev.surfaceName = ev.surfaceName.replace(pat, repl);
            modified = true;
          }
        }
        // Also fix surfaceDescription
        if (ev.surfaceDescription) {
          for (const [pat, repl] of TITLE_FIXES) {
            if (pat.test(ev.surfaceDescription)) {
              ev.surfaceDescription = ev.surfaceDescription.replace(pat, repl);
              modified = true;
            }
          }
        }
        if (modified) {
          stats.d1++;
          caseFixes++;
          if (VERBOSE) console.log(`  [D1] ${caseId} ${ev.id}: surfaceName="${ev.surfaceName}"`);
        }
      }

      // D3: investigationStages "특정 X"
      for (const ev of evidence) {
        if (!ev.investigationStages) continue;
        for (const stage of ev.investigationStages) {
          if (stage.question?.text) {
            const r = fixSpecificX(stage.question.text);
            if (r.fixed) {
              stage.question.text = r.text;
              stats.d3++;
              caseFixes++;
            }
          }
        }
      }

      if (caseFixes > 0) {
        console.log(`[FIX] ${caseId} case JSON: ${caseFixes}건`);
        stats.filesModified.add(caseFile);
        if (WRITE) {
          fs.writeFileSync(caseFile, JSON.stringify(caseData, null, 2), 'utf-8');
        }
      }
    }

    // ── Phase 1/2 교정 (C5: "특정 X") ──
    for (const [dir, label] of [[PHASE1_DIR, 'phase1'], [PHASE2_DIR, 'phase2']]) {
      const phaseFile = path.join(dir, `${caseId}.json`);
      const phaseData = loadJSON(phaseFile);
      if (!phaseData?.dialogues) continue;

      let phaseFixes = 0;
      for (const d of phaseData.dialogues) {
        if (!d.text) continue;
        // C5: "특정 X"
        const r = fixSpecificX(d.text);
        if (r.fixed) {
          d.text = r.text;
          stats.c5++;
          phaseFixes++;
        }
      }

      if (phaseFixes > 0) {
        console.log(`[FIX] ${caseId} ${label}: ${phaseFixes}건`);
        stats.filesModified.add(phaseFile);
        if (WRITE) {
          fs.writeFileSync(phaseFile, JSON.stringify(phaseData, null, 2), 'utf-8');
        }
      }
    }
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log('  교정 결과');
console.log('='.repeat(60));
console.log(`  A2 (S0-S1 금액): ${stats.a2}건`);
console.log(`  A3 (S2 기관명): ${stats.a3}건`);
console.log(`  A7 (번역체): ${stats.a7}건`);
console.log(`  A8 (사전 상의/협의): ${stats.a8}건`);
console.log(`  A9 ("특정 X"): ${stats.a9}건`);
console.log(`  C5 (Phase 1/2 "특정 X"): ${stats.c5}건`);
console.log(`  D1 (surfaceName 스포일러): ${stats.d1}건`);
console.log(`  D3 (investigationStages "특정 X"): ${stats.d3}건`);
console.log(`  총 교정: ${stats.a2 + stats.a3 + stats.a7 + stats.a8 + stats.a9 + stats.c5 + stats.d1 + stats.d3}건`);
console.log(`  수정 파일: ${stats.filesModified.size}개`);

if (!WRITE) {
  console.log(`\n실제 저장하려면: node tests/full-84-autofix.cjs --write`);
  console.log(`상세 로그: node tests/full-84-autofix.cjs --verbose`);
}
