// family-01 null text 236건 복구
// 원인: S8 pattern6 patches 중 status='skipped' + after=null entries를
//       내 apply 스크립트가 status 체크 없이 적용 → text = null
// 복구: patch.before 또는 status='skipped' patches의 before를 다시 text로 복원
//       단, 일부는 S5 patches에 의해 변경됐을 수 있으므로 우선순위 결정 필요

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGET = path.join(ROOT, 'src/data/scriptedText/family-01.json');
const S8 = path.join(ROOT, 'gpt-pro-runs/script-redo-20260426/sessions/S8-pattern6-family-01/output/correction-pattern6-family-01.json');
const S5 = path.join(ROOT, 'gpt-pro-runs/script-redo-20260426/sessions/S5-family-01-s8-tonepatch/output/S08-family-01-aftermath-tone-patch-v2.json');

const data = JSON.parse(fs.readFileSync(TARGET));
const s8 = JSON.parse(fs.readFileSync(S8));
const s5 = JSON.parse(fs.readFileSync(S5));

// S5 patches map (id → after) — S5는 정상 적용됐으므로 S5 after를 우선
const s5Map = new Map();
for (const p of s5.tonePatch || []) {
  s5Map.set(p.id, p.after);
}

// S8 patches map (variantId → {before, after, status})
const s8Map = new Map();
for (const p of s8.patches || []) {
  const id = p.variantId || p.id;
  if (id) s8Map.set(id, p);
}

// id index in current data
const idMap = new Map();
for (const [chName, ch] of Object.entries(data.channels)) {
  for (const e of ch.entries || []) {
    for (const v of e.variants || []) {
      if (v.id) idMap.set(v.id, { variant: v, channel: chName });
    }
  }
}

// null text 모두 복구
let fixed = 0;
let s5Recovered = 0, s8BeforeRecovered = 0;
const failed = [];
for (const [id, info] of idMap) {
  if (info.variant.text === null || info.variant.text === undefined) {
    // 우선순위 1: S5에서 after가 있으면 (S5 patch도 적용 대상이었던 entry)
    if (s5Map.has(id) && s5Map.get(id) != null) {
      info.variant.text = s5Map.get(id);
      s5Recovered++;
      fixed++;
    } else {
      // 우선순위 2: S8 patch.before 사용 (skipped status — 원본 보존하라는 뜻)
      const s8p = s8Map.get(id);
      if (s8p && s8p.before) {
        info.variant.text = s8p.before;
        s8BeforeRecovered++;
        fixed++;
      } else {
        failed.push(id);
      }
    }
  }
}

console.log('null text 복구:');
console.log('  S5 after 우선:', s5Recovered);
console.log('  S8 before 복구:', s8BeforeRecovered);
console.log('  복구 실패:', failed.length);
if (failed.length) {
  for (const f of failed.slice(0, 5)) console.log('   ', f);
}

const apply = process.argv.includes('--apply');
if (apply && failed.length === 0) {
  fs.writeFileSync(TARGET, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('>>> 적용 완료');
} else if (failed.length > 0) {
  console.log('>>> 복구 실패 있음. 적용 보류.');
} else {
  console.log('>>> dry-run 모드. --apply 인자로 실제 적용.');
}
