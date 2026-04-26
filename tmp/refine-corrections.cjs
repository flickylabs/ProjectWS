// 자동 보정 결과 정밀 점검 + 오류 fix
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'auto-corrections.json'), 'utf8'));
const patches = data.patches;

const finalPatches = [];
const rejected = [];

for (const p of patches) {
  let after = p.after;
  let issues = [];

  // Issue 1: "것로" → "것으로"
  if (/것로/.test(after)) {
    after = after.replace(/것로/g, '것으로');
    issues.push('조사_fix:것로→것으로');
  }

  // Issue 2: "X 것" 다음에 명사 (조사 없이 한글 시작) → 부적절
  // 예: "가족을 도운 것 내역" / "가족을 도운 것 기준" / "가족을 도운 것 절차"
  // detect: " 것 " (공백+것+공백+한글 다음 글자)
  const namePhraseRegex = /([가-힣]+\s)것\s([가-힣])/g;
  if (namePhraseRegex.test(after)) {
    // 이 patch는 부적절 — 무수정 (원본 유지)
    rejected.push({ ...p, rejectReason: '명사구 일부 자동 변환 부적절' });
    continue;
  }

  // 추가 점검: aftermath의 "비자금을 숨긴 것" 같은 표현 — 자기 비판 narrative라 자연스러움 OK
  // 단 "비자금을 숨긴 것로" 같은 조사 오류만 fix → 위에서 이미 처리

  // 변경된 after 사용
  finalPatches.push({ ...p, after, additionalFixes: issues });
}

// 채널별 분포
const ptByCh = {};
for (const p of finalPatches) ptByCh[p.channel] = (ptByCh[p.channel] || 0) + 1;
const rjByCh = {};
for (const r of rejected) rjByCh[r.channel] = (rjByCh[r.channel] || 0) + 1;

console.log('=== 정밀 점검 결과 ===');
console.log(`자동 patch (102) → 적용 가능: ${finalPatches.length} / 거부: ${rejected.length}`);
console.log('');
console.log('## 적용 patch 채널별');
for (const [k, v] of Object.entries(ptByCh).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}
console.log('');
console.log('## 거부 patch 채널별');
for (const [k, v] of Object.entries(rjByCh).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}

console.log('\n## 거부 patches 전체 목록 (메인 결정: 무수정)');
for (const r of rejected) {
  console.log(`  [${r.id}] ${r.channel}`);
  console.log(`    "${r.before}"`);
  console.log(`    rejected: ${r.rejectReason}`);
}

console.log('\n## 추가 fix 적용된 patches (조사 등)');
for (const p of finalPatches.filter(p => p.additionalFixes?.length)) {
  console.log(`  [${p.id}] ${p.additionalFixes.join(', ')}`);
  console.log(`    after: ${p.after}`);
}

fs.writeFileSync(
  path.resolve(__dirname, 'final-patches.json'),
  JSON.stringify({ count: finalPatches.length, patches: finalPatches, rejected }, null, 2)
);
console.log(`\n저장: tmp/final-patches.json (${finalPatches.length} patches)`);
