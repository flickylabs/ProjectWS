// 169 정밀 검출 entries에 자동 보정 규칙 적용 + 패치 생성
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'refined-issues.json'), 'utf8'));
const refined = data.refined;

// 자동 보정 규칙 (사용자 모범 4 패턴 + Truth Throttle)
function autoCorrect(text, hits, entry) {
  let corrected = text;
  const applied = [];

  for (const h of hits) {
    if (h.pattern === 'noun_action') {
      for (const m of h.matches) {
        // "X 돌봄" → "X을 돌본 것" / "X 돌봄으로" → "X을 돌본 것으로" / "X 돌봄이" → "X을 돌본 것이"
        // m = "가족 돌봄" 같은 형태
        const parts = m.match(/^(\S+)\s+(돌봄|지원|처리|은폐|회피)$/);
        if (!parts) continue;
        const [_, x, action] = parts;
        // 한국어 조사 처리
        const lastChar = x[x.length - 1];
        const hasJongseong = (lastChar.charCodeAt(0) - 0xAC00) % 28 !== 0; // 받침 있음
        const eulRel = hasJongseong ? '을' : '를'; // 을/를
        // action별 동사형
        let verbForm;
        switch (action) {
          case '돌봄': verbForm = '돌본 것'; break;
          case '지원': verbForm = '도운 것'; break;
          case '처리': verbForm = '처리한 것'; break;
          case '은폐': verbForm = '숨긴 것'; break;
          case '회피': verbForm = '피한 것'; break;
        }
        const replacement = `${x}${eulRel} ${verbForm}`;

        // 원문에서 m 찾고 다음 글자에 따른 격조사 보존
        const idx = corrected.indexOf(m);
        if (idx === -1) continue;
        const after = corrected.slice(idx + m.length);
        // 다음이 으로/이/가/을/를/은/는/에/와 등의 조사면 그대로 붙이고, 의미 변경
        let suffix = '';
        const josaMatch = after.match(/^(으로의?|이|가|을|를|은|는|에서?|와|과|도|만|까지)/);
        if (josaMatch) {
          // 보정된 뒤에 동일 조사 붙이기 (단 "X을 돌본 것" 다음 조사가 자연스럽게 붙어야)
          // verbForm이 "X 것"이라 다음에 -이/가/을/를/도 자연
          suffix = josaMatch[0];
          // 받침 없는 "것"이라 이/가는 동일
        }
        const fullOld = m + suffix;
        const fullNew = replacement + suffix;
        if (corrected.includes(fullOld)) {
          corrected = corrected.replace(fullOld, fullNew);
          applied.push(`${m}${suffix} → ${fullNew}`);
        } else {
          // m만 단독으로 (suffix 없이) — m 자체 치환
          corrected = corrected.replace(m, replacement);
          applied.push(`${m} → ${replacement}`);
        }
      }
    } else if (h.pattern === 's0_s2_lexeme_위임장') {
      // "위임장" → "그 서류" or "절차" (lieState/lieBand에 따라)
      // S0/S1 / early lieBand에서 우회
      corrected = corrected.replace(/위임장/g, '그 서류');
      applied.push('위임장 → 그 서류');
    } else if (h.pattern === 's0_s2_lexeme_삼천' || h.pattern === 's0_s2_lexeme_이천') {
      // 삼천만원/이천만원 → 큰 금액 / 그 액수
      corrected = corrected.replace(/삼천만원|3,?000만원|3000만원/g, '큰 금액');
      corrected = corrected.replace(/이천만원|2,?000만원|2000만원/g, '큰 액수');
      applied.push('금액 우회');
    }
    // weak_쪽은 자동 변환 X (NPC voice 보존)
  }

  return { corrected, applied };
}

const patches = [];
const skipped = [];

for (const e of refined) {
  const { corrected, applied } = autoCorrect(e.text, e.hits, e);
  if (applied.length && corrected !== e.text) {
    patches.push({
      id: e.variantId,
      channel: e.channel,
      key: e.key,
      session: e.session,
      before: e.text,
      after: corrected,
      reasons: applied,
      hits: e.hits.map(h => h.pattern),
    });
  } else {
    skipped.push({
      id: e.variantId,
      channel: e.channel,
      text: e.text,
      reasonsSkipped: e.hits.map(h => h.pattern),
    });
  }
}

console.log(`=== 자동 보정 결과 ===`);
console.log(`총 169건 검토`);
console.log(`자동 patch: ${patches.length}`);
console.log(`스킵 (NPC voice 보존 또는 자동 규칙 미적용): ${skipped.length}`);

// 채널별 분포
const ptByCh = {};
for (const p of patches) ptByCh[p.channel] = (ptByCh[p.channel] || 0) + 1;
console.log('\n## patch 채널별 분포');
for (const [k, v] of Object.entries(ptByCh).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}

// 패턴별 분포
const ptByPat = {};
for (const p of patches) for (const r of p.reasons) {
  const pat = r.split(' → ')[0].trim();
  // 패턴 그룹화
  if (/돌봄$/.test(pat)) ptByPat['noun_돌봄'] = (ptByPat['noun_돌봄'] || 0) + 1;
  else if (/지원$/.test(pat)) ptByPat['noun_지원'] = (ptByPat['noun_지원'] || 0) + 1;
  else if (/처리$/.test(pat)) ptByPat['noun_처리'] = (ptByPat['noun_처리'] || 0) + 1;
  else if (/은폐$/.test(pat)) ptByPat['noun_은폐'] = (ptByPat['noun_은폐'] || 0) + 1;
  else if (/회피$/.test(pat)) ptByPat['noun_회피'] = (ptByPat['noun_회피'] || 0) + 1;
  else if (/위임장/.test(pat)) ptByPat['lexeme_위임장'] = (ptByPat['lexeme_위임장'] || 0) + 1;
  else if (/금액/.test(pat)) ptByPat['lexeme_금액'] = (ptByPat['lexeme_금액'] || 0) + 1;
}
console.log('\n## 보정 패턴별 분포');
for (const [k, v] of Object.entries(ptByPat).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}

console.log('\n## 첫 5 patches 샘플 (메인 검증용)');
for (const p of patches.slice(0, 5)) {
  console.log(`\n[${p.id}] ${p.channel}`);
  console.log(`  before: ${p.before}`);
  console.log(`  after:  ${p.after}`);
  console.log(`  reasons: ${p.reasons.join(' / ')}`);
}

console.log('\n## 마지막 5 patches');
for (const p of patches.slice(-5)) {
  console.log(`\n[${p.id}] ${p.channel}`);
  console.log(`  before: ${p.before}`);
  console.log(`  after:  ${p.after}`);
  console.log(`  reasons: ${p.reasons.join(' / ')}`);
}

console.log(`\n## 스킵 (대부분 weak_쪽 NPC voice — 보존) 첫 5건`);
for (const s of skipped.slice(0, 5)) {
  console.log(`  [${s.id}] (${s.reasonsSkipped.join(',')})`);
  console.log(`    "${s.text}"`);
}

fs.writeFileSync(
  path.resolve(__dirname, 'auto-corrections.json'),
  JSON.stringify({ patchCount: patches.length, skippedCount: skipped.length, patches, skipped }, null, 2)
);
console.log(`\n저장: tmp/auto-corrections.json`);
