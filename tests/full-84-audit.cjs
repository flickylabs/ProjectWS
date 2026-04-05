/**
 * 84건 전수 정적 검증 스크립트
 *
 * master-plan-v3 Phase 1 기준 28개 항목 검증
 *
 * 항목 구분:
 *   A (9개): v2-atoms 품질
 *   B (7개): case JSON 완전성
 *   C (5개): Phase 1/2 스크립트
 *   D (4개): evidence 안전성
 *   E (3개): 교차 참조
 */
const fs = require('fs');
const path = require('path');

// ─── Config ───
const CATEGORIES = ['spouse', 'family', 'friend', 'neighbor', 'partnership', 'tenant', 'workplace'];
const BASE = path.resolve(__dirname, '..');
const CASES_DIR = path.join(BASE, 'src', 'data', 'cases', 'generated');
const PHASE1_DIR = path.join(BASE, 'src', 'data', 'dialogues', 'phase1');
const PHASE2_DIR = path.join(BASE, 'src', 'data', 'dialogues', 'phase2');
const CLAIM_DIR = path.join(BASE, 'src', 'data', 'claimPolicies');

const VALID_ARCHETYPES = ['avoidant', 'confrontational', 'victim_cosplay', 'cold_logic', 'affect_flattening', 'premature_summary'];

// ─── 한국 성씨 목록 ───
const KOREAN_SURNAMES = new Set([
  '김', '이', '박', '최', '정', '강', '조', '윤', '장', '임',
  '한', '오', '서', '신', '권', '황', '안', '송', '류', '전',
  '홍', '고', '문', '양', '손', '배', '백', '허', '유', '남',
  '심', '노', '하', '곽', '성', '차', '주', '우', '구', '민',
  '진', '나', '변', '제', '엄', '원', '천', '방', '공',
  '현', '함', '여', '추', '탁', '도', '소', '석', '선', '설',
  '마', '길', '연', '위', '표', '명', '기', '반', '왕', '금',
  '옥', '육', '인', '맹', '피', '감', '태', '봉', '사', '빈',
  '남궁', '제갈', '독고', '사공', '선우', '황보',
]);

// neutral로 인정되는 표현
const NEUTRAL_NAMES = new Set([
  '그 사람', '상대방', '상대', '당사자', '관계자', '그곳', '기관',
  '해당 금액', '적지 않은 돈', '큰돈', '그 돈', '그날', '그때',
  '가족', '배우자', '동생', '형', '누나', '언니', '오빠', '아버지', '어머니',
  '아들', '딸', '친구', '이웃', '동업자', '세입자', '집주인', '동료', '팀장',
  '윗집', '아랫집', '옆집', '가족 외 배우자',
]);

// 번역체 9패턴
const TRANSLATION_PATTERNS = [
  /된 것으로 생각됩니다/,
  /인 측면이 있었습니다/,
  /여러 가지.*얽혀/,
  /간과하게 된/,
  /하는 바입니다/,
  /에 기인/,
  /부득이하게/,
  /해당 건에 대해서는/,
  /인지하고 있습니다/,
];

// 수동 표현 패턴 (stage 0)
const PASSIVE_PATTERNS = [
  '의 존재를 알고 계셨습니까',
  '에 대해 알고 계셨습니까',
  '을 알고 계셨습니까',
  '를 알고 계셨습니까',
];

// 당사자 관점 호칭 (재판관 대사에서 금지)
const PARTY_PERSPECTIVE_TERMS = [
  /제 아내/, /제 남편/, /제 형/, /제 동생/, /제 누나/, /제 언니/, /제 오빠/,
  /내 아내/, /내 남편/, /내 형/, /내 동생/, /내 누나/, /내 언니/, /내 오빠/,
  /우리 아내/, /우리 남편/,
];

// 금액 패턴
const AMOUNT_EXACT_PATTERN = /[\d,]+원|\d+만\s*원|\d+천\s*원|\d+백\s*원/;

// anchorTruth 키워드 허용 목록
const KEYWORD_ALLOWLIST = new Set([
  '사진', '기록', '환급', '보수', '범위', '누수', '월세', '보증금',
  '수리', '계약', '서류', '통화', '문자', '카드', '소음', '공사',
  '증거', '자료', '내역', '일정', '상담', '연락', '약속', '비용',
  '관리', '요청', '확인', '통보', '서명', '동의', '합의', '신고',
  '주장', '사실', '문제', '상황', '사건', '결과', '이유', '원인',
]);

// ─── Helpers ───
function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

function hasBatchim(char) {
  if (!char) return false;
  const code = char.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return false;
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

// 실명이 아닌 일반 명사 (성씨+일반 음절 조합이 흔한 단어)
const COMMON_NOUNS_NOT_NAMES = new Set([
  // "이"로 시작
  '이미지', '이력서', '이력과', '이체확인', '이메일', '이사비', '이유서',
  // "기"로 시작
  '기록과', '기록물', '기관명', '기관지', '기억력',
  // "문"으로 시작
  '문서와', '문서철', '문자와', '문의서',
  // "안"으로 시작
  '안내문', '안내문과', '안내서',
  // "공"으로 시작
  '공유기록', '공동복도', '공동학습', '공동픽업', '공문과', '공사허가',
  // "인"으로 시작
  '인터넷', '인쇄물',
  // "변"으로 시작
  '변호사', '변경기록', '변경요청', '변경지시', '변경승인',
  // "사"로 시작
  '사진과', '사무실',
  // "진"으로 시작
  '진술서', '진술과',
  // "전"으로 시작
  '전송본',
  // "선"으로 시작
  '선물세트', '선급금',
  // "정"으로 시작
  '정산서와', '정산서',
  // "성"으로 시작
  '성과급',
  // "임"으로 시작
  '임대인', '임대료',
  // "금"으로 시작
  '금액표',
  // "오"로 시작
  '오래된',
  // "태"로 시작
  '태블릿',
  // "원"으로 시작
  '원장사본',
  // "서"로 시작
  '서비스',
  // "유"로 시작
  '유선전화',
  // 기타 흔한 합성어
  '공개범위', '가사앱',
]);

function isRealName(name) {
  if (!name || typeof name !== 'string') return false;
  if (NEUTRAL_NAMES.has(name)) return false;
  if (COMMON_NOUNS_NOT_NAMES.has(name)) return false;
  if (name.length === 1) return false;
  if (/^.{1,2}\s*씨$/.test(name)) return false;
  if (/^(제|내|우리)\s/.test(name)) return false;
  // 숫자 포함 시 이름 아님 (예: "제3자")
  if (/\d/.test(name)) return false;
  // ~와/과/의/용/본/서/표/부/문/건/금/비/료/물 등으로 끝나면 일반 명사 합성어 가능성
  if (/[와과의용본서표부문건금비료물]$/.test(name) && name.length >= 3) return false;
  // 일반 한자어 접미 패턴 (복합 명사)
  if (/(?:기록|문서|내역|이력|사진|메모|캡처|이미지|진술|안내|공문|확인|정산|통지|변경|설치|검토|출입|접수|요청|계약|영수|발주|거래|결정|승인|허가|요약|견적)/.test(name)) return false;
  const firstChar = name.charAt(0);
  const firstTwo = name.substring(0, 2);
  if ((KOREAN_SURNAMES.has(firstChar) || KOREAN_SURNAMES.has(firstTwo)) && name.length >= 2 && name.length <= 4) {
    return true;
  }
  return false;
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

/**
 * anchorTruth에서 핵심 키워드 추출.
 * - C1용: excludePartyNames=true → partyA/B 이름 제외 (대화에서 자연스러움)
 * - D2용: excludePartyNames=true → 마찬가지
 * - D1용: case 등장 인물 이름은 별도 로직
 */
function extractCoreKeywords(anchorTruth, caseData, excludePartyNames = true) {
  if (!anchorTruth) return [];
  const keywords = [];

  // partyA/B 이름 수집 (제외용)
  const partyNames = new Set();
  if (caseData && excludePartyNames) {
    for (const side of ['partyA', 'partyB']) {
      const name = caseData.duo?.[side]?.name;
      if (name) partyNames.add(name);
    }
  }

  // socialGraph 인물명 (partyA/B 제외) — anchorTruth에 등장하는 것만
  if (caseData) {
    const sg = caseData.duo?.socialGraph || [];
    for (const tp of sg) {
      if (tp.name) {
        const extracted = tp.name.match(/^([가-힣]{2,4})/);
        if (extracted && extracted[1].length >= 3 && !partyNames.has(extracted[1])) {
          if (anchorTruth.includes(extracted[1])) {
            keywords.push(extracted[1]);
          }
        }
      }
    }
  }

  // 기관명 (3글자+)
  const instMatches = anchorTruth.match(/[가-힣]{2,}(?:센터|병원|사무소|은행|법원|회사|학원|기관|재단|협회|사무실)/g);
  if (instMatches) keywords.push(...instMatches);
  // 서비스명 (4글자+)
  const serviceMatches = anchorTruth.match(/[가-힣]{4,}(?:서비스|프로그램|시스템)/g);
  if (serviceMatches) keywords.push(...serviceMatches);
  return [...new Set(keywords)].filter(kw => !KEYWORD_ALLOWLIST.has(kw));
}

/** 텍스트에서 패턴 검색 */
function testPattern(text, pattern) {
  if (!text) return false;
  if (pattern instanceof RegExp) return pattern.test(text);
  return text.includes(pattern);
}

/** 객체 내 모든 문자열에서 패턴 검색 */
function deepStringSearch(obj, pattern, pathPrefix) {
  const results = [];
  const pfx = pathPrefix || '';
  if (typeof obj === 'string') {
    if (testPattern(obj, pattern)) results.push({ path: pfx, text: obj });
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => results.push(...deepStringSearch(item, pattern, `${pfx}[${i}]`)));
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      results.push(...deepStringSearch(v, pattern, `${pfx}.${k}`));
    }
  }
  return results;
}

// ─── 결과 수집 ───
const allResults = []; // { caseId, checks: [{ id, severity, pass, msg }] }
const checkDistribution = {}; // { checkId: count }

function buildCaseId(cat, num) {
  return `${cat}-${String(num).padStart(2, '0')}`;
}

// ─── 84건 전수 검증 ───
console.log('='.repeat(70));
console.log('  84건 전수 정적 검증 (28개 항목)');
console.log('='.repeat(70));
console.log();

for (const cat of CATEGORIES) {
  for (let num = 1; num <= 12; num++) {
    const caseId = buildCaseId(cat, num);
    const checks = [];

    function addCheck(id, severity, pass, msg) {
      checks.push({ id, severity, pass, msg });
    }

    // ── 파일 로드 ──
    const caseFile = path.join(CASES_DIR, `${caseId}.json`);
    const caseData = loadJSON(caseFile);

    const phase1File = path.join(PHASE1_DIR, `${caseId}.json`);
    const phase2File = path.join(PHASE2_DIR, `${caseId}.json`);
    const phase1 = loadJSON(phase1File);
    const phase2 = loadJSON(phase2File);

    const atomsPath = findAtomsPath(caseId);
    const atoms = atomsPath ? loadJSON(atomsPath) : null;

    const structFile = path.join(CLAIM_DIR, `${caseId}-structure-v2.json`);
    const structData = loadJSON(structFile);

    if (!caseData) {
      addCheck('B1', 'CRITICAL', false, 'case JSON 파일 없음');
      allResults.push({ caseId, checks });
      continue;
    }

    // ════════════════════════════════════════════
    // A. v2-atoms 품질 (9개)
    // ════════════════════════════════════════════
    if (atoms && atoms.claimPolicies) {
      const policies = atoms.claimPolicies;

      // A1: S0-S1 fullName(2~4자 한국 이름) 잔존
      let a1Hits = [];
      for (const side of ['a', 'b']) {
        if (!policies[side]) continue;
        for (const [dId, stateMap] of Object.entries(policies[side])) {
          for (const state of ['S0', 'S1']) {
            const sd = stateMap[state];
            if (!sd?.claimAtoms) continue;
            for (const atom of sd.claimAtoms) {
              if (!atom.slots) continue;
              for (const [sk, sv] of Object.entries(atom.slots)) {
                if (sv && sv.fullName && isRealName(sv.fullName)) {
                  a1Hits.push(`${side}.${dId}.${state} "${sv.fullName}"`);
                }
              }
            }
          }
        }
      }
      if (a1Hits.length > 0) {
        addCheck('A1', 'CRITICAL', false, `S0-S1 fullName 잔존: ${a1Hits.slice(0, 3).join(', ')}${a1Hits.length > 3 ? ` +${a1Hits.length - 3}건` : ''}`);
      } else {
        addCheck('A1', 'CRITICAL', true, '');
      }

      // A2: S0-S1 exact 금액 잔존
      let a2Hits = [];
      for (const side of ['a', 'b']) {
        if (!policies[side]) continue;
        for (const [dId, stateMap] of Object.entries(policies[side])) {
          for (const state of ['S0', 'S1']) {
            const sd = stateMap[state];
            if (!sd?.claimAtoms) continue;
            for (const atom of sd.claimAtoms) {
              if (!atom.slots) continue;
              for (const [sk, sv] of Object.entries(atom.slots)) {
                if (sv && sv.exact && AMOUNT_EXACT_PATTERN.test(sv.exact)) {
                  a2Hits.push(`${side}.${dId}.${state} slots.${sk}.exact="${sv.exact}"`);
                }
              }
              // also check factText and publicClaim for exact amounts
              if (atom.factText && AMOUNT_EXACT_PATTERN.test(atom.factText)) {
                a2Hits.push(`${side}.${dId}.${state} factText="${atom.factText.substring(0, 40)}"`);
              }
              if (atom.publicClaim && AMOUNT_EXACT_PATTERN.test(atom.publicClaim)) {
                a2Hits.push(`${side}.${dId}.${state} publicClaim="${atom.publicClaim.substring(0, 40)}"`);
              }
            }
          }
        }
      }
      if (a2Hits.length > 0) {
        addCheck('A2', 'CRITICAL', false, `S0-S1 exact 금액 잔존: ${a2Hits.slice(0, 3).join(', ')}${a2Hits.length > 3 ? ` +${a2Hits.length - 3}건` : ''}`);
      } else {
        addCheck('A2', 'CRITICAL', true, '');
      }

      // A3: S2 기관 정식명칭 잔존 (slots에서 기관명 패턴)
      const INST_PATTERN = /[가-힣]{2,}(?:센터|병원|사무소|은행|법원|회사|학원|기관|재단|협회|사무실|돌봄센터)/;
      let a3Hits = [];
      for (const side of ['a', 'b']) {
        if (!policies[side]) continue;
        for (const [dId, stateMap] of Object.entries(policies[side])) {
          const sd = stateMap['S2'];
          if (!sd?.claimAtoms) continue;
          for (const atom of sd.claimAtoms) {
            if (!atom.slots) continue;
            for (const [sk, sv] of Object.entries(atom.slots)) {
              if (!sv) continue;
              // Check fullName and exact for institution names
              for (const field of ['fullName', 'exact', 'neutral']) {
                const val = sv[field];
                if (val && INST_PATTERN.test(val)) {
                  a3Hits.push(`${side}.${dId}.S2 slots.${sk}.${field}="${val}"`);
                }
              }
            }
            // check factText too
            if (atom.factText && INST_PATTERN.test(atom.factText)) {
              a3Hits.push(`${side}.${dId}.S2 factText="${atom.factText.substring(0, 40)}"`);
            }
          }
        }
      }
      if (a3Hits.length > 0) {
        addCheck('A3', 'FAIL', false, `S2 기관 정식명칭 잔존: ${a3Hits.slice(0, 3).join(', ')}${a3Hits.length > 3 ? ` +${a3Hits.length - 3}건` : ''}`);
      } else {
        addCheck('A3', 'FAIL', true, '');
      }

      // A4: S3+ fullName/rounded/dateExact 보존 여부 (없으면 FAIL)
      let a4Missing = [];
      for (const side of ['a', 'b']) {
        if (!policies[side]) continue;
        for (const [dId, stateMap] of Object.entries(policies[side])) {
          for (const state of ['S3', 'S4', 'S5']) {
            const sd = stateMap[state];
            if (!sd?.claimAtoms) continue;
            let hasConcreteSlot = false;
            for (const atom of sd.claimAtoms) {
              if (!atom.slots) continue;
              for (const [sk, sv] of Object.entries(atom.slots)) {
                if (!sv) continue;
                if (sv.fullName || sv.rounded || sv.dateExact || sv.exact) {
                  hasConcreteSlot = true;
                }
              }
            }
            if (!hasConcreteSlot && sd.claimAtoms.length > 0) {
              a4Missing.push(`${side}.${dId}.${state}`);
            }
          }
        }
      }
      if (a4Missing.length > 0) {
        addCheck('A4', 'FAIL', false, `S3+ 구체 slots 미보존: ${a4Missing.slice(0, 3).join(', ')}${a4Missing.length > 3 ? ` +${a4Missing.length - 3}건` : ''}`);
      } else {
        addCheck('A4', 'FAIL', true, '');
      }

      // A5: fallbackPublicClaim이 해당 state slots 수준 초과
      // S0-S1 fallbackPublicClaim에 실명/금액이 포함되면 초과
      let a5Hits = [];
      for (const side of ['a', 'b']) {
        if (!policies[side]) continue;
        for (const [dId, stateMap] of Object.entries(policies[side])) {
          for (const state of ['S0', 'S1']) {
            const sd = stateMap[state];
            if (!sd?.claimAtoms) continue;
            for (const atom of sd.claimAtoms) {
              const fpc = atom.fallbackPublicClaim;
              if (!fpc) continue;
              if (AMOUNT_EXACT_PATTERN.test(fpc)) {
                a5Hits.push(`${side}.${dId}.${state} fallback에 금액: "${fpc.substring(0, 40)}"`);
              }
              // Check for real names in fallbackPublicClaim
              const nameMatch = fpc.match(/[가-힣]{2,4}/g);
              if (nameMatch) {
                for (const nm of nameMatch) {
                  if (isRealName(nm)) {
                    a5Hits.push(`${side}.${dId}.${state} fallback에 실명 "${nm}"`);
                  }
                }
              }
            }
          }
        }
      }
      if (a5Hits.length > 0) {
        addCheck('A5', 'FAIL', false, `fallbackPublicClaim slots 초과: ${a5Hits.slice(0, 3).join(', ')}${a5Hits.length > 3 ? ` +${a5Hits.length - 3}건` : ''}`);
      } else {
        addCheck('A5', 'FAIL', true, '');
      }

      // A6: amount.rounded가 자연어 형식("280만원")인지
      // S2+에서 rounded 값이 있을 때, "~만원" / "~백만원" 등 자연어 형식이어야 함
      let a6Hits = [];
      for (const side of ['a', 'b']) {
        if (!policies[side]) continue;
        for (const [dId, stateMap] of Object.entries(policies[side])) {
          for (const state of ['S2', 'S3', 'S4', 'S5']) {
            const sd = stateMap[state];
            if (!sd?.claimAtoms) continue;
            for (const atom of sd.claimAtoms) {
              if (!atom.slots) continue;
              for (const [sk, sv] of Object.entries(atom.slots)) {
                if (!sv || !sv.rounded) continue;
                // rounded가 있는데 숫자+만원/백만원 형식이 아닌 경우
                if (sk === 'amount' || sk.includes('mount') || sk.includes('금액')) {
                  const r = sv.rounded;
                  // 순수 숫자+원 형식은 자연어 아님 (예: "2,800,000원")
                  if (/^\d{1,3}(,\d{3})+원$/.test(r)) {
                    a6Hits.push(`${side}.${dId}.${state} slots.${sk}.rounded="${r}" (숫자원 형식)`);
                  }
                }
              }
            }
          }
        }
      }
      if (a6Hits.length > 0) {
        addCheck('A6', 'WARN', false, `amount.rounded 비자연어: ${a6Hits.slice(0, 3).join(', ')}${a6Hits.length > 3 ? ` +${a6Hits.length - 3}건` : ''}`);
      } else {
        addCheck('A6', 'WARN', true, '');
      }

      // A7: 번역체 9패턴 (factText, publicClaim에서)
      let a7Hits = [];
      for (const pat of TRANSLATION_PATTERNS) {
        const hits = deepStringSearch(policies, pat, 'claimPolicies');
        for (const h of hits) {
          a7Hits.push(`${h.path}: "${h.text.substring(0, 40)}"`);
        }
      }
      if (a7Hits.length > 0) {
        addCheck('A7', 'FAIL', false, `번역체 패턴: ${a7Hits.slice(0, 3).join(', ')}${a7Hits.length > 3 ? ` +${a7Hits.length - 3}건` : ''}`);
      } else {
        addCheck('A7', 'FAIL', true, '');
      }

      // A8: "사전 상의/협의" (S0-S2 범위)
      let a8Hits = [];
      const priorConsultPat = /사전.*(?:상의|협의)/;
      for (const side of ['a', 'b']) {
        if (!policies[side]) continue;
        for (const [dId, stateMap] of Object.entries(policies[side])) {
          for (const state of ['S0', 'S1', 'S2']) {
            const sd = stateMap[state];
            if (!sd) continue;
            const hits = deepStringSearch(sd, priorConsultPat, `${side}.${dId}.${state}`);
            for (const h of hits) {
              a8Hits.push(`${h.path}: "${h.text.substring(0, 40)}"`);
            }
          }
        }
      }
      if (a8Hits.length > 0) {
        addCheck('A8', 'FAIL', false, `사전 상의/협의 (S0-S2): ${a8Hits.slice(0, 3).join(', ')}${a8Hits.length > 3 ? ` +${a8Hits.length - 3}건` : ''}`);
      } else {
        addCheck('A8', 'FAIL', true, '');
      }

      // A9: "특정 X" 패턴
      let a9Hits = [];
      const specificXPat = /특정\s*[가-힣]/;
      const a9all = deepStringSearch(policies, specificXPat, 'claimPolicies');
      for (const h of a9all) {
        a9Hits.push(`${h.path}: "${h.text.substring(0, 40)}"`);
      }
      if (a9Hits.length > 0) {
        addCheck('A9', 'FAIL', false, `"특정 X" 패턴: ${a9Hits.slice(0, 3).join(', ')}${a9Hits.length > 3 ? ` +${a9Hits.length - 3}건` : ''}`);
      } else {
        addCheck('A9', 'FAIL', true, '');
      }
    } else {
      // v2-atoms 없음 — A1~A9 전체 WARN으로
      addCheck('A1', 'WARN', false, 'v2-atoms 파일 없음');
      addCheck('A2', 'WARN', false, 'v2-atoms 파일 없음');
      addCheck('A3', 'WARN', false, 'v2-atoms 파일 없음');
      addCheck('A4', 'WARN', false, 'v2-atoms 파일 없음');
      addCheck('A5', 'WARN', false, 'v2-atoms 파일 없음');
      addCheck('A6', 'WARN', false, 'v2-atoms 파일 없음');
      addCheck('A7', 'WARN', false, 'v2-atoms 파일 없음');
      addCheck('A8', 'WARN', false, 'v2-atoms 파일 없음');
      addCheck('A9', 'WARN', false, 'v2-atoms 파일 없음');
    }

    // ════════════════════════════════════════════
    // B. case JSON 완전성 (7개)
    // ════════════════════════════════════════════

    // B1: 필수 필드 존재
    const requiredFields = ['caseId', 'meta', 'duo', 'context', 'disputes', 'evidence'];
    const missingFields = requiredFields.filter(f => caseData[f] === undefined);
    if (missingFields.length > 0) {
      addCheck('B1', 'CRITICAL', false, `필수 필드 누락: ${missingFields.join(', ')}`);
    } else {
      addCheck('B1', 'CRITICAL', true, '');
    }

    // B2: duo.partyA/B에 name, archetype, callTerms 존재
    let b2Issues = [];
    for (const side of ['partyA', 'partyB']) {
      const party = caseData.duo?.[side];
      if (!party) {
        b2Issues.push(`${side} 누락`);
        continue;
      }
      for (const f of ['name', 'archetype', 'callTerms']) {
        if (party[f] === undefined) b2Issues.push(`${side}.${f} 누락`);
      }
    }
    if (b2Issues.length > 0) {
      addCheck('B2', 'CRITICAL', false, b2Issues.join(', '));
    } else {
      addCheck('B2', 'CRITICAL', true, '');
    }

    // B3: archetype이 6종 중 하나
    let b3Issues = [];
    for (const side of ['partyA', 'partyB']) {
      const arch = caseData.duo?.[side]?.archetype;
      if (arch && !VALID_ARCHETYPES.includes(arch)) {
        b3Issues.push(`${side}.archetype="${arch}"`);
      }
    }
    if (b3Issues.length > 0) {
      addCheck('B3', 'WARN', false, `비표준 archetype: ${b3Issues.join(', ')}`);
    } else {
      addCheck('B3', 'WARN', true, '');
    }

    // B4: callTerms.toPartner 아/야 접미사 정합성
    let b4Issues = [];
    for (const side of ['partyA', 'partyB']) {
      const ct = caseData.duo?.[side]?.callTerms;
      if (!ct || !ct.toPartner) continue;
      const tp = ct.toPartner;
      if (tp.endsWith('아') || tp.endsWith('야')) {
        const nameBase = tp.slice(0, -1);
        const lastChar = getLastKoreanChar(nameBase);
        if (lastChar) {
          const batchim = hasBatchim(lastChar);
          const expected = batchim ? '아' : '야';
          const actual = tp.slice(-1);
          if (actual !== expected) {
            b4Issues.push(`${side}.toPartner="${tp}" (${lastChar} 받침${batchim ? '있음' : '없음'} → 예상 '${expected}' != '${actual}')`);
          }
        }
      }
    }
    if (b4Issues.length > 0) {
      addCheck('B4', 'FAIL', false, b4Issues.join(', '));
    } else {
      addCheck('B4', 'FAIL', true, '');
    }

    // B5: evidence에 investigationStages stage 0/1/2 완전 존재
    const evidence = caseData.evidence || [];
    let b5Issues = [];
    for (const ev of evidence) {
      if (!ev.investigationStages || !Array.isArray(ev.investigationStages)) {
        b5Issues.push(`${ev.id}: investigationStages 없음`);
        continue;
      }
      const stageNums = ev.investigationStages.map(s => s.stage);
      for (const needed of [0, 1, 2]) {
        if (!stageNums.includes(needed)) {
          b5Issues.push(`${ev.id}: stage ${needed} 누락`);
        }
      }
    }
    if (b5Issues.length > 0) {
      addCheck('B5', 'FAIL', false, b5Issues.slice(0, 3).join(', ') + (b5Issues.length > 3 ? ` +${b5Issues.length - 3}건` : ''));
    } else {
      addCheck('B5', 'FAIL', true, '');
    }

    // B6: caseId와 파일명 일치
    // case JSON의 caseId는 "case-spouse-01" 또는 "spouse-01" 형식
    // 알려진 약어: partnership → partner, workplace → work
    const fileCaseId = caseId; // "spouse-01"
    const dataCaseId = caseData.caseId || '';
    const normalizedDataCaseId = dataCaseId
      .replace(/^case-/, '')
      .replace(/^partner-/, 'partnership-')
      .replace(/^work-/, 'workplace-');
    if (normalizedDataCaseId !== fileCaseId && dataCaseId !== fileCaseId) {
      addCheck('B6', 'CRITICAL', false, `caseId="${dataCaseId}" != 파일명 "${fileCaseId}"`);
    } else {
      addCheck('B6', 'CRITICAL', true, '');
    }

    // B7: disputes 배열에 id, name 존재
    const disputes = caseData.disputes || [];
    let b7Issues = [];
    for (const d of disputes) {
      if (!d.id) b7Issues.push(`dispute missing id`);
      if (!d.name) b7Issues.push(`dispute ${d.id || '?'} missing name`);
    }
    if (disputes.length === 0) b7Issues.push('disputes 배열 비어있음');
    if (b7Issues.length > 0) {
      addCheck('B7', 'FAIL', false, b7Issues.slice(0, 3).join(', '));
    } else {
      addCheck('B7', 'FAIL', true, '');
    }

    // ════════════════════════════════════════════
    // C. Phase 1/2 스크립트 (5개)
    // ════════════════════════════════════════════
    const anchorTruth = caseData.meta?.anchorTruth || '';
    const coreKeywords = extractCoreKeywords(anchorTruth, caseData);

    const phaseDialogues = [];
    const systemDialogues = [];
    if (phase1?.dialogues) {
      for (const d of phase1.dialogues) {
        phaseDialogues.push({ ...d, source: 'phase1' });
        if (d.speaker === 'system') systemDialogues.push({ ...d, source: 'phase1' });
      }
    }
    if (phase2?.dialogues) {
      for (const d of phase2.dialogues) {
        phaseDialogues.push({ ...d, source: 'phase2' });
        if (d.speaker === 'system') systemDialogues.push({ ...d, source: 'phase2' });
      }
    }

    // C1: anchorTruth 핵심 키워드(3글자+ 실명, 기관명) 포함
    let c1Hits = [];
    if (coreKeywords.length > 0 && phaseDialogues.length > 0) {
      for (const kw of coreKeywords) {
        for (const d of phaseDialogues) {
          if (d.text && d.text.includes(kw)) {
            c1Hits.push(`${d.source}.${d.speaker}: "${kw}" in "${d.text.substring(0, 40)}"`);
          }
        }
      }
    }
    if (c1Hits.length > 0) {
      addCheck('C1', 'FAIL', false, `anchorTruth 키워드 포함: ${c1Hits.slice(0, 3).join(', ')}${c1Hits.length > 3 ? ` +${c1Hits.length - 3}건` : ''}`);
    } else if (phaseDialogues.length === 0) {
      addCheck('C1', 'WARN', false, 'phase1/2 파일 없음');
    } else {
      addCheck('C1', 'FAIL', true, '');
    }

    // C2: 합니다체 위반 (재판관/시스템 대사에서 해요체)
    // 시스템 대사에서 "~해요", "~해주세요", "~이에요", "~인가요" 등 해요체 검출
    const haeyoPattern = /(?:해요|세요|에요|인가요|인데요|거든요|잖아요|할게요|볼게요|드릴게요|네요)[.?!]?\s*$/m;
    let c2Hits = [];
    for (const d of systemDialogues) {
      if (d.text && haeyoPattern.test(d.text)) {
        c2Hits.push(`${d.source}.system: "${d.text.substring(0, 40)}"`);
      }
    }
    if (c2Hits.length > 0) {
      addCheck('C2', 'FAIL', false, `시스템 대사 해요체: ${c2Hits.slice(0, 3).join(', ')}${c2Hits.length > 3 ? ` +${c2Hits.length - 3}건` : ''}`);
    } else if (systemDialogues.length === 0) {
      addCheck('C2', 'WARN', false, 'system 대사 없음');
    } else {
      addCheck('C2', 'FAIL', true, '');
    }

    // C3: 재판관 대사에 "제 아내/남편/형/동생" 등 당사자 관점 호칭
    let c3Hits = [];
    for (const d of systemDialogues) {
      if (!d.text) continue;
      for (const pat of PARTY_PERSPECTIVE_TERMS) {
        if (pat.test(d.text)) {
          c3Hits.push(`${d.source}.system: ${pat.source} in "${d.text.substring(0, 40)}"`);
        }
      }
    }
    if (c3Hits.length > 0) {
      addCheck('C3', 'CRITICAL', false, `재판관 대사에 당사자 호칭: ${c3Hits.slice(0, 3).join(', ')}${c3Hits.length > 3 ? ` +${c3Hits.length - 3}건` : ''}`);
    } else {
      addCheck('C3', 'CRITICAL', true, '');
    }

    // C4: "사전 상의/협의"
    let c4Hits = [];
    const priorConsultPat2 = /사전.*(?:상의|협의)/;
    for (const d of phaseDialogues) {
      if (d.text && priorConsultPat2.test(d.text)) {
        c4Hits.push(`${d.source}.${d.speaker}: "${d.text.substring(0, 40)}"`);
      }
    }
    if (c4Hits.length > 0) {
      addCheck('C4', 'FAIL', false, `사전 상의/협의: ${c4Hits.slice(0, 3).join(', ')}${c4Hits.length > 3 ? ` +${c4Hits.length - 3}건` : ''}`);
    } else {
      addCheck('C4', 'FAIL', true, '');
    }

    // C5: "특정 X" 패턴
    let c5Hits = [];
    for (const d of phaseDialogues) {
      if (d.text && /특정\s*[가-힣]/.test(d.text)) {
        c5Hits.push(`${d.source}.${d.speaker}: "${d.text.substring(0, 40)}"`);
      }
    }
    if (c5Hits.length > 0) {
      addCheck('C5', 'FAIL', false, `"특정 X" 패턴: ${c5Hits.slice(0, 3).join(', ')}${c5Hits.length > 3 ? ` +${c5Hits.length - 3}건` : ''}`);
    } else {
      addCheck('C5', 'FAIL', true, '');
    }

    // ════════════════════════════════════════════
    // D. evidence 안전성 (4개)
    // ════════════════════════════════════════════

    // D1: surfaceName에 3글자+ 기관명/서비스명/직함/실명
    // 실명 체크: case 내 실제 등장인물 이름(duo + socialGraph)이 surfaceName에 포함되는지 확인
    const caseCharNames = [];
    for (const side of ['partyA', 'partyB']) {
      const name = caseData.duo?.[side]?.name;
      if (name && name.length >= 2) caseCharNames.push(name);
    }
    const sg = caseData.duo?.socialGraph || [];
    for (const tp of sg) {
      if (tp.name) {
        // "오미숙 (세린의 어머니)" → "오미숙" 추출
        const extracted = tp.name.match(/^([가-힣]{2,4})/);
        if (extracted) caseCharNames.push(extracted[1]);
      }
    }
    let d1Hits = [];
    for (const ev of evidence) {
      if (!ev.surfaceName) continue;
      // 실명: case 내 인물 이름이 surfaceName에 포함
      for (const cn of caseCharNames) {
        if (cn.length >= 3 && ev.surfaceName.includes(cn)) {
          d1Hits.push(`${ev.id} surfaceName="${ev.surfaceName}" 실명 "${cn}"`);
        }
      }
      // 기관명 (복합어 형태)
      if (/[가-힣]{3,}(?:센터|병원|사무소|은행|법원|회사|학원|기관|재단|협회)/.test(ev.surfaceName)) {
        d1Hits.push(`${ev.id} surfaceName="${ev.surfaceName}" 기관명`);
      }
      // 서비스명 (4글자+)
      if (/[가-힣]{4,}(?:서비스|프로그램|시스템)/.test(ev.surfaceName)) {
        d1Hits.push(`${ev.id} surfaceName="${ev.surfaceName}" 서비스명`);
      }
      // 직함 (구체적 직급은 스포일러)
      if (/(?:팀장|부장|과장|대리|법무사|변호사|의사|교수|센터장|관장|실장|원장|컨설턴트)/.test(ev.surfaceName)) {
        d1Hits.push(`${ev.id} surfaceName="${ev.surfaceName}" 직함`);
      }
    }
    if (d1Hits.length > 0) {
      addCheck('D1', 'FAIL', false, `surfaceName 스포일러: ${d1Hits.slice(0, 3).join(', ')}${d1Hits.length > 3 ? ` +${d1Hits.length - 3}건` : ''}`);
    } else {
      addCheck('D1', 'FAIL', true, '');
    }

    // D2: surfaceDescription에 anchorTruth 핵심 키워드
    let d2Hits = [];
    if (coreKeywords.length > 0) {
      for (const ev of evidence) {
        if (!ev.surfaceDescription) continue;
        for (const kw of coreKeywords) {
          if (ev.surfaceDescription.includes(kw)) {
            d2Hits.push(`${ev.id} surfaceDescription에 "${kw}"`);
          }
        }
      }
    }
    if (d2Hits.length > 0) {
      addCheck('D2', 'FAIL', false, `surfaceDescription 키워드: ${d2Hits.slice(0, 3).join(', ')}${d2Hits.length > 3 ? ` +${d2Hits.length - 3}건` : ''}`);
    } else {
      addCheck('D2', 'FAIL', true, '');
    }

    // D3: investigationStages 질문에 "특정 X"
    let d3Hits = [];
    for (const ev of evidence) {
      if (!ev.investigationStages) continue;
      for (const stage of ev.investigationStages) {
        if (stage.question?.text && /특정\s*[가-힣]/.test(stage.question.text)) {
          d3Hits.push(`${ev.id} stage${stage.stage}: "${stage.question.text.substring(0, 40)}"`);
        }
      }
    }
    if (d3Hits.length > 0) {
      addCheck('D3', 'FAIL', false, `investigationStages "특정 X": ${d3Hits.slice(0, 3).join(', ')}${d3Hits.length > 3 ? ` +${d3Hits.length - 3}건` : ''}`);
    } else {
      addCheck('D3', 'FAIL', true, '');
    }

    // D4: investigationStages stage 0에 수동 표현
    let d4Hits = [];
    for (const ev of evidence) {
      if (!ev.investigationStages) continue;
      const stage0 = ev.investigationStages.find(s => s.stage === 0);
      if (!stage0?.question?.text) continue;
      for (const pat of PASSIVE_PATTERNS) {
        if (stage0.question.text.includes(pat)) {
          d4Hits.push(`${ev.id} stage0: "${pat}"`);
        }
      }
    }
    if (d4Hits.length > 0) {
      addCheck('D4', 'WARN', false, `stage0 수동 표현: ${d4Hits.slice(0, 3).join(', ')}${d4Hits.length > 3 ? ` +${d4Hits.length - 3}건` : ''}`);
    } else {
      addCheck('D4', 'WARN', true, '');
    }

    // ════════════════════════════════════════════
    // E. 교차 참조 (3개)
    // ════════════════════════════════════════════
    const disputeIds = new Set(disputes.map(d => d.id));
    const evidenceIds = new Set(evidence.map(e => e.id));

    // E1: v2-atoms disputeId가 case JSON disputes.id에 존재
    if (atoms && atoms.claimPolicies) {
      let e1Issues = [];
      for (const side of ['a', 'b']) {
        if (!atoms.claimPolicies[side]) continue;
        for (const dId of Object.keys(atoms.claimPolicies[side])) {
          if (!disputeIds.has(dId)) {
            e1Issues.push(`v2-atoms ${side}.${dId} → case disputes에 없음`);
          }
        }
      }
      if (e1Issues.length > 0) {
        addCheck('E1', 'FAIL', false, e1Issues.slice(0, 3).join(', ') + (e1Issues.length > 3 ? ` +${e1Issues.length - 3}건` : ''));
      } else {
        addCheck('E1', 'FAIL', true, '');
      }
    } else {
      addCheck('E1', 'WARN', false, 'v2-atoms 없음 — 교차 참조 스킵');
    }

    // E2: structure-v2 존재 여부
    if (structData) {
      addCheck('E2', 'WARN', true, '');
    } else {
      addCheck('E2', 'WARN', false, `structure-v2 파일 없음: ${caseId}-structure-v2.json`);
    }

    // E3: DossierCard evidenceIds가 case JSON evidence에 존재
    // DossierCard는 v3-game-loop-data 또는 structure-v2에 있을 수 있음
    let dossierCards = null;
    // structure-v2에서 찾기
    if (structData?.dossierCards) {
      dossierCards = structData.dossierCards;
    }
    // v3-game-loop-data에서 찾기
    if (!dossierCards) {
      const v3Paths = [
        path.join(BASE, 'docs', 'ref', '리뉴얼참고', 'gpt-batch', caseId, `${caseId}-v3-game-loop-data.json`),
        path.join(BASE, 'docs', 'ref', '리뉴얼참고', 'gpt-session2', 'output', `${caseId}-v3-game-loop-data.json`),
      ];
      for (const p of v3Paths) {
        if (fs.existsSync(p)) {
          const v3Data = loadJSON(p);
          if (v3Data?.dossierCards) {
            dossierCards = v3Data.dossierCards;
            break;
          }
        }
      }
    }
    if (dossierCards && Array.isArray(dossierCards)) {
      let e3Issues = [];
      for (const dc of dossierCards) {
        if (dc.evidenceIds) {
          for (const eId of dc.evidenceIds) {
            if (!evidenceIds.has(eId)) {
              e3Issues.push(`dossier "${dc.id}" → ${eId} 없음`);
            }
          }
        }
      }
      if (e3Issues.length > 0) {
        addCheck('E3', 'WARN', false, e3Issues.slice(0, 3).join(', ') + (e3Issues.length > 3 ? ` +${e3Issues.length - 3}건` : ''));
      } else {
        addCheck('E3', 'WARN', true, '');
      }
    } else {
      addCheck('E3', 'WARN', false, 'DossierCard 데이터 없음');
    }

    allResults.push({ caseId, checks });
  }
}

// ─── 콘솔 출력 ───
console.log();
let totalPass = 0;
let totalCritical = 0;
let totalFail = 0;
let totalWarn = 0;
let casesPass = 0;
let casesFail = 0;

for (const result of allResults) {
  const failedChecks = result.checks.filter(c => !c.pass);
  const passCount = result.checks.filter(c => c.pass).length;
  const totalChecks = result.checks.length;

  if (failedChecks.length === 0) {
    casesPass++;
    console.log(`[PASS] ${result.caseId} (${passCount}/${totalChecks})`);
  } else {
    casesFail++;
    const summary = failedChecks
      .map(c => `${c.id}: ${c.msg}`)
      .slice(0, 5)
      .join(' | ');
    const extra = failedChecks.length > 5 ? ` | +${failedChecks.length - 5}건` : '';
    console.log(`[FAIL] ${result.caseId} — ${summary}${extra}`);
  }

  for (const c of result.checks) {
    if (c.pass) {
      totalPass++;
    } else {
      const key = c.id;
      checkDistribution[key] = (checkDistribution[key] || 0) + 1;
      if (c.severity === 'CRITICAL') totalCritical++;
      else if (c.severity === 'FAIL') totalFail++;
      else totalWarn++;
    }
  }
}

console.log();
console.log('='.repeat(70));
console.log('  종합');
console.log('='.repeat(70));
console.log(`  PASS: ${casesPass}건 / FAIL: ${casesFail}건 (총 ${allResults.length}건)`);
console.log(`  CRITICAL: ${totalCritical}건 | FAIL: ${totalFail}건 | WARN: ${totalWarn}건`);
console.log();

// 항목별 분포
const sortedChecks = Object.entries(checkDistribution).sort((a, b) => b[1] - a[1]);
if (sortedChecks.length > 0) {
  console.log('='.repeat(70));
  console.log('  항목별 분포');
  console.log('='.repeat(70));
  const checkLabels = {
    A1: 'S0-S1 fullName 잔존',
    A2: 'S0-S1 exact 금액',
    A3: 'S2 기관 정식명칭',
    A4: 'S3+ 구체 slots 미보존',
    A5: 'fallbackPublicClaim 초과',
    A6: 'amount.rounded 비자연어',
    A7: '번역체 패턴',
    A8: '사전 상의/협의 (S0-S2)',
    A9: '"특정 X" 패턴',
    B1: '필수 필드 누락',
    B2: 'duo party 필수 필드',
    B3: '비표준 archetype',
    B4: 'toPartner 아/야 부정합',
    B5: 'investigationStages 불완전',
    B6: 'caseId 불일치',
    B7: 'disputes id/name 누락',
    C1: 'anchorTruth 키워드 노출',
    C2: '시스템 해요체',
    C3: '재판관 당사자 호칭',
    C4: '사전 상의/협의',
    C5: '"특정 X"',
    D1: 'surfaceName 스포일러',
    D2: 'surfaceDescription 키워드',
    D3: 'investigationStages "특정 X"',
    D4: 'stage0 수동 표현',
    E1: 'v2-atoms disputeId 불일치',
    E2: 'structure-v2 없음',
    E3: 'DossierCard evidenceId 불일치',
  };
  for (const [id, count] of sortedChecks) {
    const label = checkLabels[id] || id;
    console.log(`  ${id}(${label}): ${count}건`);
  }
}

console.log();

// ─── JSON 리포트 저장 ───
const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    totalCases: allResults.length,
    pass: casesPass,
    fail: casesFail,
    criticalCount: totalCritical,
    failCount: totalFail,
    warnCount: totalWarn,
    checksTotal: totalPass + totalCritical + totalFail + totalWarn,
    checksPass: totalPass,
  },
  distribution: sortedChecks.map(([id, count]) => ({ id, count })),
  cases: allResults.map(r => ({
    caseId: r.caseId,
    pass: r.checks.every(c => c.pass),
    passCount: r.checks.filter(c => c.pass).length,
    totalChecks: r.checks.length,
    failures: r.checks.filter(c => !c.pass).map(c => ({
      id: c.id,
      severity: c.severity,
      msg: c.msg,
    })),
  })),
};

const reportPath = path.join(__dirname, 'full-84-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
console.log(`JSON 리포트 저장: ${reportPath}`);

process.exit(totalCritical > 0 ? 2 : (totalFail > 0 ? 1 : 0));
